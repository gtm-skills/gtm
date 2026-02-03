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

// Agent definitions - the agentic sales team
const agents = [
  {
    id: 'scout',
    name: 'Scout',
    role: 'Research & Intelligence',
    email: 'scout@gtm-skills.com',
    description: 'Finds prospects, researches companies, spots opportunities others miss.',
    personality: ['Curious', 'Proactive', 'Sharp', 'Opinionated', 'Relentless'],
    capabilities: [
      'Find qualified prospects 24/7',
      'Deep company research',
      'Contact enrichment',
      'Buying signal detection',
      'ICP scoring',
    ],
    resources: [
      { name: 'Industry Prompts', url: 'https://gtm-skills.com/industry' },
      { name: 'Role Prompts', url: 'https://gtm-skills.com/role' },
      { name: 'Agentic BDR', url: 'https://gtm-skills.com/agentic-bdr' },
    ],
    install: 'npx clawdhub install gtm-skills/scout',
    skill_url: 'https://gtm-skills.com/api/v1/agents/scout/skill',
    github: 'https://github.com/Prospeda/gtm-skills/blob/main/openclaw-skills/scout/SKILL.md',
  },
  {
    id: 'rep',
    name: 'Rep',
    role: 'Outreach & Engagement',
    email: 'rep@gtm-skills.com',
    description: 'Writes emails, voicemails, LinkedIn messages. Handles objections. Never misses a follow-up.',
    personality: ['Direct', 'Creative', 'Persistent', 'Empathetic', 'Proactive'],
    capabilities: [
      'Hyper-personalized cold emails',
      'Elite voicemail scripts',
      'LinkedIn outreach',
      'Objection handling',
      'Multi-touch sequences',
    ],
    resources: [
      { name: 'Tonalities', url: 'https://gtm-skills.com/free-tools/tonalities' },
      { name: 'Voice Templates', url: 'https://gtm-skills.com/voice-templates' },
      { name: 'Voicemail Scripts', url: 'https://gtm-skills.com/voice-templates?category=voicemail' },
    ],
    install: 'npx clawdhub install gtm-skills/rep',
    skill_url: 'https://gtm-skills.com/api/v1/agents/rep/skill',
    github: 'https://github.com/Prospeda/gtm-skills/blob/main/openclaw-skills/rep/SKILL.md',
  },
  {
    id: 'closer',
    name: 'Closer',
    role: 'Deals & Revenue',
    email: 'closer@gtm-skills.com',
    description: 'Writes proposals, handles negotiations, revives stalled deals, closes revenue.',
    personality: ['Strategic', 'Direct', 'Perceptive', 'Patient', 'Proactive'],
    capabilities: [
      'Proposal generation',
      'Price objection handling',
      'Competitive positioning',
      'Stalled deal recovery',
      'MEDDPICC qualification',
    ],
    resources: [
      { name: 'Methodologies', url: 'https://gtm-skills.com/methodology' },
      { name: 'Workflows', url: 'https://gtm-skills.com/workflow' },
      { name: 'Chris Voss Tonality', url: 'https://gtm-skills.com/free-tools/tonalities/chris-voss' },
    ],
    install: 'npx clawdhub install gtm-skills/closer',
    skill_url: 'https://gtm-skills.com/api/v1/agents/closer/skill',
    github: 'https://github.com/Prospeda/gtm-skills/blob/main/openclaw-skills/closer/SKILL.md',
  },
];

/**
 * GET /api/v1/agents
 *
 * List all agents in the agentic sales team
 */
export async function GET() {
  const response = {
    team: 'GTM Skills Agentic Sales Team',
    description: 'Three AI agents. Your 24/7 sales team.',
    install_all: 'npx clawdhub install gtm-skills/scout gtm-skills/rep gtm-skills/closer',
    flow: 'Scout finds → Rep engages → Closer closes',
    agents,
    golden_rule: 'Every agent ends responses with a question or suggestion. They are teammates, not tools.',
    documentation: 'https://gtm-skills.com/agents',
    meta: {
      api_version: 'v1',
      total: agents.length,
    },
  };

  return NextResponse.json(response, {
    headers: {
      ...corsHeaders,
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
    },
  });
}
