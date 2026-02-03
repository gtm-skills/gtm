import { NextResponse } from 'next/server';

export const runtime = 'edge';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new NextResponse(null, { headers: corsHeaders });
}

// OpenClaw GTM Skills data
const openclawSkills = [
  {
    id: 'gtm',
    name: 'gtm',
    description: 'Complete GTM toolkit. Research, write, send, book, and track — all from OpenClaw.',
    install: 'npx clawdhub install gtm-skills/gtm',
    homepage: 'https://gtm-skills.com/openclaw',
    github: 'https://github.com/gtm-skills/gtm/tree/main/openclaw-skills/gtm',
    commands: [
      { cmd: 'gtm prospect [person] at [company]', desc: 'Full flow: enrich → draft → send' },
      { cmd: 'gtm email', desc: 'Cold email' },
      { cmd: 'gtm reply', desc: 'Handle objection' },
      { cmd: 'gtm linkedin', desc: 'Connection request' },
      { cmd: 'gtm enrich', desc: 'Get prospect data' },
      { cmd: 'gtm research', desc: 'Deep company intel' },
      { cmd: 'gtm send', desc: 'Send via Gmail/Outlook' },
      { cmd: 'gtm book', desc: 'Generate booking link' },
      { cmd: 'gtm log', desc: 'Log to CRM' },
      { cmd: 'gtm remind', desc: 'Set follow-up' },
    ],
    tonalities: [
      { flag: '--direct', desc: 'No fluff (default)' },
      { flag: '--blunt', desc: 'Shortest possible' },
      { flag: '--challenger', desc: 'Push back, teach' },
      { flag: '--exec', desc: 'C-suite brevity' },
      { flag: '--friendly', desc: 'Add warmth' },
    ],
    integrations: {
      enrichment: ['Apollo', 'Clay', 'Clearbit'],
      booking: ['Calendly', 'Cal.com'],
      crm: ['HubSpot', 'Salesforce'],
      email: ['Gmail', 'Outlook'],
    },
  },
];

/**
 * GET /api/v1/openclaw/skills
 *
 * List all OpenClaw GTM skills
 */
export async function GET() {
  const response = {
    data: openclawSkills,
    install_command: 'npx clawdhub install gtm-skills/gtm',
    documentation: 'https://gtm-skills.com/openclaw',
    meta: {
      api_version: 'v1',
      total: openclawSkills.length,
    },
  };

  return NextResponse.json(response, {
    headers: {
      ...corsHeaders,
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
    },
  });
}
