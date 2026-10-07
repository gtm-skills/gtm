import { cookies } from 'next/headers';
import { createServerClient as createSSRClient } from '@supabase/ssr';
import type { User } from '@supabase/supabase-js';

export function supabaseConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('supabase') && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

/** Cookie-backed client for server components, route handlers and server actions. */
export async function createClient() {
  const cookieStore = await cookies();
  return createSSRClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (toSet) => {
          try {
            toSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
          } catch {
            // Server components can't set cookies; proxy.ts refreshes the session instead.
          }
        },
      },
    },
  );
}

/** Verified user (hits Supabase Auth; do not trust getSession() on the server). */
export async function getUser(): Promise<User | null> {
  if (!supabaseConfigured()) return null;
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  return data.user ?? null;
}
