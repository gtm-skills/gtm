import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Service-role client. Server only. Bypasses RLS — never import from a client component.
 * Returns null when env is missing so the site still builds/serves without Supabase.
 */
export function createAdminClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  if (!url.includes('supabase') || !key) return null;
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}
