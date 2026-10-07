import { NextResponse } from 'next/server';

/**
 * RFC 9728 protected-resource metadata. Points MCP clients (ChatGPT) at
 * Supabase Auth, which acts as our OAuth 2.1 authorization server.
 */
export async function GET() {
  const site = process.env.NEXT_PUBLIC_SITE_URL || 'https://gtm-skills.com';
  const supabase = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabase) return NextResponse.json({ error: 'not configured' }, { status: 503 });
  return NextResponse.json(
    {
      resource: `${site}/api/mcp`,
      authorization_servers: [`${supabase}/auth/v1`],
      scopes_supported: ['openid', 'email', 'profile'],
      bearer_methods_supported: ['header'],
      resource_name: 'GTM Skills',
      resource_documentation: `${site}/plugin`,
    },
    { headers: { 'Cache-Control': 'public, max-age=3600', 'Access-Control-Allow-Origin': '*' } },
  );
}
