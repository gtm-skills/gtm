import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

/**
 * Next 16 proxy (formerly middleware). Refreshes the Supabase session cookie on
 * gated paths so server components see a live session. Does NOT block routes;
 * pages and route handlers gate with getUser().
 */
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url?.includes('supabase') || !anon) return response;

  const supabase = createServerClient(url, anon, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (toSet) => {
        toSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        toSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  // Touching getUser() refreshes an expired access token when a refresh token exists.
  await supabase.auth.getUser();
  return response;
}

export const config = {
  matcher: ['/account/:path*', '/login', '/auth/:path*', '/skills/:path*', '/pricing', '/api/skills/:path*', '/api/checkout', '/api/account/:path*'],
};
