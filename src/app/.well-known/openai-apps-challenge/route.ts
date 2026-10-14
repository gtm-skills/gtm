/** Domain verification for the ChatGPT plugin directory. Token comes from platform.openai.com. */
export async function GET() {
  const token = process.env.OPENAI_APPS_CHALLENGE_TOKEN;
  if (!token) return new Response('not configured', { status: 404 });
  return new Response(token, { headers: { 'Content-Type': 'text/plain', 'Cache-Control': 'public, max-age=3600' } });
}
