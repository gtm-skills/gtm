import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js';
import { createPluginServer } from '@/plugin/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

/**
 * Streamable HTTP MCP endpoint for the ChatGPT plugin (and any MCP client).
 * Stateless: a fresh server + transport per request, which suits serverless.
 */
async function handle(req: Request) {
  const server = await createPluginServer(req);
  const transport = new WebStandardStreamableHTTPServerTransport({ sessionIdGenerator: undefined, enableJsonResponse: true });
  await server.connect(transport);
  try {
    return await transport.handleRequest(req);
  } finally {
    void Promise.resolve().then(() => server.close().catch(() => {}));
  }
}

export const POST = handle;
export const GET = handle;
export const DELETE = handle;

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, Mcp-Session-Id, Mcp-Protocol-Version',
    },
  });
}
