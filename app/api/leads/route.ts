import { NextResponse } from 'next/server';
import { createHmac } from 'crypto';
import { leadSchema } from '@/lib/schema';
import { getSupabase } from '@/lib/supabase';
import { clientIp, hashIp, rateLimit } from '@/lib/rate-limit';
import { sendWaitlistEmail } from '@/lib/email';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return NextResponse.json({ ok: false, error: 'Please check the form.', fieldErrors }, { status: 400 });
  }
  const lead = parsed.data;

  // 2. Honeypot — return 200 and drop, so the bot logs a success and moves on.
  if (lead.company_website) {
    return NextResponse.json({ ok: true });
  }

  // 3. Rate limit
  const ipHash = hashIp(clientIp(request.headers));
  const limit = rateLimit(ipHash);
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, error: 'Too many submissions. Try again shortly.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } },
    );
  }

  const record = {
    form_type: lead.form_type,
    name: 'name' in lead ? lead.name : null,
    email: lead.email,
    phone: 'phone' in lead ? lead.phone : null,
    company: 'company' in lead ? lead.company : null,
    vertical: 'vertical' in lead ? (lead.vertical ?? null) : null,
    call_volume: 'call_volume' in lead ? (lead.call_volume ?? null) : null,
    message: 'message' in lead ? (lead.message ?? null) : null,
    source_page: lead.source_page ?? null,
    referrer: lead.referrer ?? null,
    utm_source: lead.utm_source ?? null,
    utm_medium: lead.utm_medium ?? null,
    utm_campaign: lead.utm_campaign ?? null,
    utm_term: lead.utm_term ?? null,
    utm_content: lead.utm_content ?? null,
    ip_hash: ipHash,
    user_agent: request.headers.get('user-agent')?.slice(0, 500) ?? null,
  };

  // 4. Insert
  const supabase = getSupabase();
  if (!supabase) {
    console.error('[leads] Supabase is not configured — SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY missing');
    return NextResponse.json(
      { ok: false, error: 'We could not save that. Please email us instead.' },
      { status: 503 },
    );
  }

  const { data, error } = await supabase.from('leads').insert(record).select('id').single();

  if (error) {
    // Waitlist has a unique index on email — a repeat signup is a success.
    if (error.code === '23505') {
      return NextResponse.json({ ok: true, duplicate: true });
    }
    console.error('[leads] insert failed:', error.message);
    return NextResponse.json(
      { ok: false, error: 'We could not save that. Please email us instead.' },
      { status: 500 },
    );
  }

  // 5. Fire the n8n webhook. Never fail the request on a webhook error — the
  //    lead is already saved, and speed-to-lead beats delivery guarantees here.
  await notifyN8n({ id: data?.id, ...record });

  // 6. Waitlist gets an immediate confirmation email with the booking link,
  //    so anyone who doesn't want to wait can skip straight to a demo.
  //    Same rule as above: a failed send must not fail the request.
  if (lead.form_type === 'waitlist') {
    await sendWaitlistEmail(lead.email);
  }

  return NextResponse.json({ ok: true });
}

async function notifyN8n(payload: Record<string, unknown>) {
  const url = process.env.N8N_LEAD_WEBHOOK_URL;
  if (!url) return;

  const secret = process.env.N8N_WEBHOOK_SECRET;
  const bodyText = JSON.stringify(payload);
  const headers: Record<string, string> = { 'content-type': 'application/json' };
  if (secret) {
    headers['x-decibyl-signature'] = createHmac('sha256', secret).update(bodyText).digest('hex');
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);
    const res = await fetch(url, {
      method: 'POST',
      headers,
      body: bodyText,
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!res.ok) console.error('[leads] n8n webhook returned', res.status);
  } catch (err) {
    console.error('[leads] n8n webhook failed:', err instanceof Error ? err.message : 'unknown');
  }
}
