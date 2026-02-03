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

// MCP Server tools and configuration
const mcpData = {
  server: {
    name: 'gtm-mcp-server',
    version: '1.0.0',
    description: 'GTM MCP Server with real API integrations for sales workflows',
    github: 'https://github.com/gtm-skills/gtm/tree/main/mcp-server',
    install: {
      clone: 'git clone https://github.com/gtm-skills/gtm.git && cd gtm-skills/mcp-server && npm install && npm run build',
      npm: 'npm install -g gtm-mcp-server (coming soon)',
    },
  },
  tools: {
    content_generation: [
      { name: 'research_company', description: 'Research a company for sales outreach', hasUI: true },
      { name: 'research_lead', description: 'Research a specific person/lead', hasUI: true },
      { name: 'draft_cold_email', description: 'Draft personalized cold emails', hasUI: true },
      { name: 'draft_linkedin_message', description: 'Draft LinkedIn messages', hasUI: true },
      { name: 'handle_objection', description: 'Get strategic objection responses', hasUI: true },
      { name: 'generate_cold_call_script', description: 'Generate cold call scripts' },
      { name: 'generate_discovery_questions', description: 'Generate discovery questions' },
      { name: 'create_follow_up_sequence', description: 'Create follow-up sequences', hasUI: true },
      { name: 'build_value_proposition', description: 'Build tailored value props' },
      { name: 'analyze_competitor', description: 'Generate competitive positioning' },
    ],
    hubspot_crm: [
      { name: 'hubspot_create_contact', description: 'Create a new contact in HubSpot', requiresApiKey: true },
      { name: 'hubspot_update_contact', description: 'Update an existing contact', requiresApiKey: true },
      { name: 'hubspot_get_contact', description: 'Get contact by ID or email', requiresApiKey: true },
      { name: 'hubspot_search_contacts', description: 'Search for contacts', requiresApiKey: true },
      { name: 'hubspot_create_deal', description: 'Create a new deal', requiresApiKey: true },
      { name: 'hubspot_update_deal', description: 'Update deal stage, amount, etc.', requiresApiKey: true },
      { name: 'hubspot_log_activity', description: 'Log email, call, meeting, or note', requiresApiKey: true },
      { name: 'hubspot_get_pipelines', description: 'Get deal pipelines and stages', requiresApiKey: true },
    ],
  },
  workflows: [
    { name: 'prospecting_workflow', description: 'Complete prospecting package' },
    { name: 'account_strategy', description: 'Full account strategy with stakeholder mapping' },
    { name: 'competitive_deal_workflow', description: 'Competitive intelligence and win plan' },
    { name: 'full_sales_cycle', description: 'End-to-end orchestration from cold to close' },
    { name: 'reengagement_workflow', description: 'Re-engage stalled deals' },
    { name: 'objection_battlecard', description: 'Comprehensive objection handling' },
  ],
  config: {
    claude_desktop: {
      path: '~/Library/Application Support/Claude/claude_desktop_config.json',
      example: {
        mcpServers: {
          gtm: {
            command: 'node',
            args: ['/path/to/gtm-skills/mcp-server/dist/index.js'],
          },
        },
      },
    },
    claude_code: {
      path: '.claude/settings.json',
      example: {
        mcpServers: {
          gtm: {
            command: 'node',
            args: ['./mcp-server/dist/index.js'],
          },
        },
      },
    },
    environment: {
      HUBSPOT_API_KEY: {
        description: 'HubSpot Private App API key for CRM integration',
        required: false,
        howToGet: 'HubSpot Settings → Integrations → Private Apps → Create app',
      },
    },
  },
  roadmap: [
    { name: 'HubSpot CRM', status: 'live' },
    { name: 'Apollo Enrichment', status: 'next' },
    { name: 'Gmail/Outlook Send', status: 'planned' },
    { name: 'Calendly/Cal.com', status: 'planned' },
    { name: 'OpenClaw Integration', status: 'planned' },
  ],
};

/**
 * GET /api/v1/mcp
 *
 * Get MCP Server tools, configuration, and setup instructions
 */
export async function GET() {
  const response = {
    data: mcpData,
    documentation: 'https://gtm-skills.com/free-tools/mcp-server',
    meta: {
      api_version: 'v1',
      tool_count: mcpData.tools.content_generation.length + mcpData.tools.hubspot_crm.length,
      workflow_count: mcpData.workflows.length,
    },
  };

  return NextResponse.json(response, {
    headers: {
      ...corsHeaders,
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
    },
  });
}
