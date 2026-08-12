import 'server-only';
import { Resend } from 'resend';
import { site, siteUrl } from '@/lib/site';

/**
 * Waitlist confirmation email — sent once, right after a successful
 * (non-duplicate) waitlist signup. Points the lead at the demo booking page
 * so anyone who doesn't want to wait can skip the line.
 *
 * Missing config must not fail the request — same rule as lib/supabase.ts.
 * The lead is already saved by the time this runs; a missing/broken Resend
 * key should degrade to "no email sent", not a 500 to the visitor.
 */

let cached: Resend | null = null;

function getResend(): Resend | null {
  if (cached) return cached;
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  cached = new Resend(key);
  return cached;
}

export async function sendWaitlistEmail(toEmail: string): Promise<void> {
  const resend = getResend();
  if (!resend) {
    console.error('[email] Resend is not configured — RESEND_API_KEY missing');
    return;
  }

  const from = process.env.RESEND_FROM_EMAIL ?? `${site.name} <${site.supportEmail}>`;
  const bookingUrl = `${siteUrl}/book-a-demo`;

  try {
    const { error } = await resend.emails.send({
      from,
      to: toEmail,
      subject: "You're on the Decibyl waitlist",
      html: waitlistEmailHtml(bookingUrl),
      text: waitlistEmailText(bookingUrl),
    });
    if (error) console.error('[email] Resend send failed:', error.message);
  } catch (err) {
    console.error('[email] Resend send threw:', err instanceof Error ? err.message : 'unknown');
  }
}

function waitlistEmailHtml(bookingUrl: string): string {
  return `
    <div style="font-family: -apple-system, Helvetica, Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; color: #1a1a1a;">
      <p style="font-size: 16px; line-height: 1.6;">You're on the list.</p>
      <p style="font-size: 16px; line-height: 1.6;">
        We'll email you the moment a seat opens up. If you'd rather not wait, you can
        book a live demo now and we'll walk you through it directly.
      </p>
      <p style="margin: 28px 0;">
        <a href="${bookingUrl}"
           style="background: #E24313; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;">
          Book a demo call
        </a>
      </p>
      <p style="font-size: 14px; line-height: 1.6; color: #666;">
        ${bookingUrl}
      </p>
      <p style="font-size: 14px; line-height: 1.6; color: #666; margin-top: 32px;">
        — The ${site.name} team
      </p>
    </div>
  `.trim();
}

function waitlistEmailText(bookingUrl: string): string {
  return [
    "You're on the list.",
    '',
    "We'll email you the moment a seat opens up. If you'd rather not wait, you can book a live demo now:",
    bookingUrl,
    '',
    `— The ${site.name} team`,
  ].join('\n');
}
