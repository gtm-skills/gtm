// Legacy entry point. New code: import from '@/lib/supabase/server', '/client' or '/admin'.
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { createAdminClient } from '@/lib/supabase/admin';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseUrl.includes('supabase') ? createClient(supabaseUrl, supabaseAnonKey) : null;

/** @deprecated use createAdminClient from '@/lib/supabase/admin' */
export const createServerClient = createAdminClient;
