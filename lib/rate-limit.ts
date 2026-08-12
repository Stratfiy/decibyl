import { createHash } from 'crypto';

/**
 * In-memory fixed-window rate limiter: 5 requests / 10 min / IP hash.
 *
 * Scope note: this is per serverless instance, so a burst spread across cold
 * instances can exceed the limit. It stops the scripted-form-spam case, which
 * is what it is for. If lead volume ever justifies it, move the counter to
 * Upstash Redis or a Supabase table — the interface below stays the same.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

const hits = new Map<string, { count: number; resetAt: number }>();

export function hashIp(ip: string): string {
  const salt = process.env.N8N_WEBHOOK_SECRET ?? 'decibyl';
  return createHash('sha256').update(`${salt}:${ip}`).digest('hex').slice(0, 32);
}

export function rateLimit(key: string): { ok: boolean; retryAfter: number } {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || entry.resetAt <= now) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    if (hits.size > 5000) {
      for (const [k, v] of hits) if (v.resetAt <= now) hits.delete(k);
    }
    return { ok: true, retryAfter: 0 };
  }

  entry.count += 1;
  if (entry.count > MAX_REQUESTS) {
    return { ok: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }
  return { ok: true, retryAfter: 0 };
}

export function clientIp(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return headers.get('x-real-ip') ?? '0.0.0.0';
}
