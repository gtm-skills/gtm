import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Handle old URL patterns that might be indexed
      // Tonality redirects - in case anyone linked to /tonalities/X instead of /free-tools/tonalities/X
      {
        source: '/tonalities/:slug',
        destination: '/free-tools/tonalities/:slug',
        permanent: true,
      },
      {
        source: '/tonalities',
        destination: '/free-tools/tonalities',
        permanent: true,
      },
      // Old tools page patterns
      {
        source: '/tools',
        destination: '/free-tools',
        permanent: true,
      },
      {
        source: '/tools/:path*',
        destination: '/free-tools/:path*',
        permanent: true,
      },
      // MCP redirect variations
      {
        source: '/mcp',
        destination: '/free-tools/mcp-server',
        permanent: true,
      },
      {
        source: '/mcp-server',
        destination: '/free-tools/mcp-server',
        permanent: true,
      },
      // ClawdBot variations
      {
        source: '/clawdbot',
        destination: '/free-tools/clawdbot',
        permanent: true,
      },
      // Industry/Role/Methodology redirects to prompts
      {
        source: '/industry/:industry/:role',
        destination: '/prompts/:industry/:role',
        permanent: true,
      },
      // API docs redirect
      {
        source: '/api-docs',
        destination: '/developers',
        permanent: true,
      },
      {
        source: '/docs',
        destination: '/developers',
        permanent: true,
      },
      // Voice templates redirect
      {
        source: '/voice',
        destination: '/voice-templates',
        permanent: true,
      },
      // Relaunch: downloads became priced kits; agent team page became a skills category
      {
        source: '/download',
        destination: '/pricing',
        permanent: true,
      },
      {
        source: '/agents',
        destination: '/skills/category/agents',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
