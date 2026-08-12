import 'server-only';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Server-only Supabase client using the SERVICE ROLE key.
 *
 * The service role key bypasses RLS. It must never be imported by a client
 * component, never logged, and never given a NEXT_PUBLIC_ prefix. The
 * `server-only` import above makes a client-side import a build error rather
 * than a leak.
 */

let cached: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (cached) return cached;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // Missing config must not crash the build — lead capture degrades to the
  // webhook path and the route reports the failure without echoing secrets.
  if (!url || !key) return null;

  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
