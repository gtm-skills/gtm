import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new NextResponse(null, { headers: corsHeaders });
}

// Agent definitions with routing keywords
const agents = {
  scout: {
    id: 'scout',
    name: 'Scout',
    role: 'Research & Intelligence',
    email: 'scout@gtm-skills.com',
    triggers: [
      'find', 'search', 'research', 'prospect', 'look for', 'discover',
      'who', 'companies', 'leads', 'icp', 'target', 'identify',
      'buying signal', 'hiring', 'funding', 'raised', 'series',
      'enrich', 'apollo', 'clay', 'linkedin sales navigator',
    ],
    skill_url: 'https://gtm-skills.com/api/v1/agents/scout/skill',
  },
  writer: {
    id: 'writer',
    name: 'Writer',
    role: 'Sales Copy & Content',
    email: 'writer@gtm-skills.com',
    triggers: [
      'write', 'draft', 'compose', 'create', 'craft',
      'email', 'cold email', 'subject line', 'copy',
      'linkedin post', 'post', 'content',
      'follow-up', 'followup', 'sequence',
      'messaging', 'value prop',
    ],
    skill_url: 'https://gtm-skills.com/api/v1/agents/writer/skill',
  },
  rep: {
    id: 'rep',
    name: 'Rep',
    role: 'Outreach & Engagement',
    email: 'rep@gtm-skills.com',
    triggers: [
      'send', 'outreach', 'engage', 'reach out', 'contact',
      'voicemail', 'call', 'phone', 'cold call',
      'objection', 'handle', 'respond', 'reply',
      'linkedin message', 'dm', 'connection request',
      'sequence', 'cadence', 'touch',
    ],
    skill_url: 'https://gtm-skills.com/api/v1/agents/rep/skill',
  },
  closer: {
    id: 'closer',
    name: 'Closer',
    role: 'Deals & Revenue',
    email: 'closer@gtm-skills.com',
    triggers: [
      'close', 'deal', 'proposal', 'quote', 'pricing',
      'negotiate', 'negotiation', 'discount',
      'contract', 'sign', 'decision',
      'stalled', 'stuck', 'revive', 'ghost',
      'meddpicc', 'meddic', 'qualification',
      'champion', 'economic buyer', 'budget',
    ],
    skill_url: 'https://gtm-skills.com/api/v1/agents/closer/skill',
  },
};

// Workflow patterns - when multiple agents are needed
const workflows = [
  {
    id: 'full-pipeline',
    name: 'Full Pipeline',
    description: 'End-to-end: find prospects, write copy, engage, close',
    triggers: ['full pipeline', 'end to end', 'start to finish', 'entire process'],
    agents: ['scout', 'writer', 'rep', 'closer'],
  },
  {
    id: 'prospecting',
    name: 'Prospecting Flow',
    description: 'Find prospects and write initial outreach',
    triggers: ['prospect and email', 'find and write', 'research and outreach'],
    agents: ['scout', 'writer'],
  },
  {
    id: 'outreach-campaign',
    name: 'Outreach Campaign',
    description: 'Write copy and execute outreach',
    triggers: ['campaign', 'outreach campaign', 'email campaign'],
    agents: ['writer', 'rep'],
  },
  {
    id: 'deal-recovery',
    name: 'Deal Recovery',
    description: 'Revive stalled deals with fresh outreach',
    triggers: ['revive deal', 'stalled deal', 'ghost', 'went dark'],
    agents: ['writer', 'closer'],
  },
];

function scoreAgent(message: string, agent: typeof agents.scout): number {
  const lowerMessage = message.toLowerCase();
  let score = 0;

  for (const trigger of agent.triggers) {
    if (lowerMessage.includes(trigger.toLowerCase())) {
      // Longer phrases get higher scores (more specific)
      score += trigger.split(' ').length;
    }
  }

  return score;
}

function detectWorkflow(message: string): typeof workflows[0] | null {
  const lowerMessage = message.toLowerCase();

  for (const workflow of workflows) {
    for (const trigger of workflow.triggers) {
      if (lowerMessage.includes(trigger.toLowerCase())) {
        return workflow;
      }
    }
  }

  return null;
}

function routeMessage(message: string): {
  primary: typeof agents.scout;
  secondary: typeof agents.scout | null;
  workflow: typeof workflows[0] | null;
  confidence: 'high' | 'medium' | 'low';
  reasoning: string;
} {
  // Check for workflow patterns first
  const workflow = detectWorkflow(message);
  if (workflow) {
    const primaryAgent = agents[workflow.agents[0] as keyof typeof agents];
    const secondaryAgent = workflow.agents[1]
      ? agents[workflow.agents[1] as keyof typeof agents]
      : null;

    return {
      primary: primaryAgent,
      secondary: secondaryAgent,
      workflow,
      confidence: 'high',
      reasoning: `Detected workflow: ${workflow.name}`,
    };
  }

  // Score each agent
  const scores = Object.entries(agents).map(([id, agent]) => ({
    id,
    agent,
    score: scoreAgent(message, agent),
  }));

  // Sort by score descending
  scores.sort((a, b) => b.score - a.score);

  const topScore = scores[0];
  const secondScore = scores[1];

  // Determine confidence
  let confidence: 'high' | 'medium' | 'low' = 'low';
  let reasoning = '';

  if (topScore.score >= 3) {
    confidence = 'high';
    reasoning = `Strong match for ${topScore.agent.name} based on multiple triggers`;
  } else if (topScore.score >= 1) {
    confidence = 'medium';
    reasoning = `Moderate match for ${topScore.agent.name}`;
  } else {
    // Default to Scout for research/discovery
    reasoning = 'No strong signals detected. Defaulting to Scout for initial research.';
    return {
      primary: agents.scout,
      secondary: null,
      workflow: null,
      confidence: 'low',
      reasoning,
    };
  }

  // Check if secondary agent is also relevant
  const secondary = secondScore.score >= 1 ? secondScore.agent : null;
  if (secondary) {
    reasoning += `. ${secondary.name} may also be helpful.`;
  }

  return {
    primary: topScore.agent,
    secondary,
    workflow: null,
    confidence,
    reasoning,
  };
}

/**
 * POST /api/v1/agents/orchestrate
 *
 * Routes a message to the appropriate agent(s)
 *
 * Body: { message: string, include_skills?: boolean }
 *
 * Returns: {
 *   primary: Agent,
 *   secondary?: Agent,
 *   workflow?: Workflow,
 *   confidence: 'high' | 'medium' | 'low',
 *   reasoning: string,
 *   suggested_prompt?: string
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, include_skills = false } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required', example: { message: 'Find me SaaS companies hiring SDRs' } },
        { status: 400, headers: corsHeaders }
      );
    }

    const result = routeMessage(message);

    // Build response
    const response: Record<string, unknown> = {
      message,
      routing: {
        primary: {
          id: result.primary.id,
          name: result.primary.name,
          role: result.primary.role,
          email: result.primary.email,
          skill_url: result.primary.skill_url,
        },
        secondary: result.secondary ? {
          id: result.secondary.id,
          name: result.secondary.name,
          role: result.secondary.role,
          email: result.secondary.email,
          skill_url: result.secondary.skill_url,
        } : null,
        workflow: result.workflow ? {
          id: result.workflow.id,
          name: result.workflow.name,
          description: result.workflow.description,
          agents: result.workflow.agents,
        } : null,
        confidence: result.confidence,
        reasoning: result.reasoning,
      },
      suggested_prompt: `@${result.primary.name}: ${message}`,
    };

    // Optionally include skill content
    if (include_skills) {
      try {
        const skillResponse = await fetch(result.primary.skill_url);
        const skillContent = await skillResponse.text();
        (response.routing as Record<string, unknown>).primary_skill = skillContent;

        if (result.secondary) {
          const secondarySkillResponse = await fetch(result.secondary.skill_url);
          const secondarySkillContent = await secondarySkillResponse.text();
          (response.routing as Record<string, unknown>).secondary_skill = secondarySkillContent;
        }
      } catch {
        // Skills fetch failed, continue without them
      }
    }

    return NextResponse.json(response, {
      headers: {
        ...corsHeaders,
        'Cache-Control': 'no-cache',
      },
    });
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400, headers: corsHeaders }
    );
  }
}

/**
 * GET /api/v1/agents/orchestrate
 *
 * Returns documentation for the orchestrator
 */
export async function GET() {
  const response = {
    endpoint: '/api/v1/agents/orchestrate',
    method: 'POST',
    description: 'Routes a message to the appropriate agent(s) based on intent',
    body: {
      message: 'string (required) - The task or message to route',
      include_skills: 'boolean (optional) - Include full SKILL.md content in response',
    },
    example_request: {
      message: 'Find me SaaS companies hiring SDRs and write a cold email',
      include_skills: false,
    },
    example_response: {
      message: 'Find me SaaS companies hiring SDRs and write a cold email',
      routing: {
        primary: {
          id: 'scout',
          name: 'Scout',
          role: 'Research & Intelligence',
          email: 'scout@gtm-skills.com',
          skill_url: 'https://gtm-skills.com/api/v1/agents/scout/skill',
        },
        secondary: {
          id: 'writer',
          name: 'Writer',
          role: 'Sales Copy & Content',
          email: 'writer@gtm-skills.com',
          skill_url: 'https://gtm-skills.com/api/v1/agents/writer/skill',
        },
        workflow: null,
        confidence: 'high',
        reasoning: 'Strong match for Scout based on multiple triggers. Writer may also be helpful.',
      },
      suggested_prompt: '@Scout: Find me SaaS companies hiring SDRs and write a cold email',
    },
    agents: Object.values(agents).map(a => ({
      id: a.id,
      name: a.name,
      role: a.role,
      triggers_sample: a.triggers.slice(0, 5),
    })),
    workflows: workflows.map(w => ({
      id: w.id,
      name: w.name,
      description: w.description,
      agents: w.agents,
    })),
  };

  return NextResponse.json(response, {
    headers: {
      ...corsHeaders,
      'Cache-Control': 'public, s-maxage=3600',
    },
  });
}
