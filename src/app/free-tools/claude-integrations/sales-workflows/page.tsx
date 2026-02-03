import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CopyButton } from '@/components/copy-button';
import {
  ArrowRight,
  ChevronRight,
  Search,
  Mail,
  Database,
  MessageSquare,
  BarChart3,
  Workflow,
  CheckCircle2,
  Zap,
  Users,
  Target,
  TrendingUp,
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Claude Sales Workflows | AI Sales Stack Guide',
  description: 'Build your AI-powered sales stack with Claude integrations. Complete workflows for prospecting, deal management, team collaboration, and analytics.',
  openGraph: {
    title: 'Build Your AI Sales Stack with Claude',
    description: 'Step-by-step workflows combining Claude with Salesforce, Clay, Slack, and more.',
  },
};

const workflows = [
  {
    id: 'prospecting',
    title: 'Prospecting Workflow',
    description: 'Research → Enrich → Outreach → Follow-up',
    icon: Target,
    color: 'green',
    tools: ['GTM MCP Server', 'Clay', 'Slack'],
    steps: [
      {
        step: 1,
        title: 'Define Your ICP',
        description: 'Start by telling Claude your ideal customer profile',
        tool: 'Claude',
        prompt: `"My ICP is:
- Series B-C SaaS companies
- 100-500 employees
- VP of Sales or CRO as target persona
- Currently using Salesforce
- Based in US

Help me build a prospecting workflow for this ICP."`,
      },
      {
        step: 2,
        title: 'Research Target Accounts',
        description: 'Use Clay to find companies matching your criteria',
        tool: 'Clay',
        prompt: `"Use Clay to find 20 companies matching my ICP criteria. For each company, get:
- Company overview and funding stage
- Employee count and growth rate
- Tech stack (looking for Salesforce users)
- Recent news or trigger events"`,
      },
      {
        step: 3,
        title: 'Enrich Contacts',
        description: 'Find decision-makers and get contact data',
        tool: 'Clay',
        prompt: `"For the top 10 companies from that list, find:
- VP of Sales or CRO contact
- Verified email address
- LinkedIn profile
- Recent activity or posts

Prioritize by company fit and contact engagement level."`,
      },
      {
        step: 4,
        title: 'Draft Personalized Outreach',
        description: 'Generate emails tailored to each prospect',
        tool: 'GTM MCP Server',
        prompt: `"Using the research on [COMPANY], draft a cold email to [CONTACT]:
- Reference their [TRIGGER EVENT]
- Address the pain point of [SPECIFIC CHALLENGE]
- Use Hemingway tonality (direct, concise)
- Include a clear CTA for a 15-min call"`,
      },
      {
        step: 5,
        title: 'Create Follow-up Sequence',
        description: 'Build a multi-touch sequence for non-responders',
        tool: 'GTM MCP Server',
        prompt: `"Create a 4-email follow-up sequence for prospects who don't respond:
- Email 2 (Day 3): New angle, value-add resource
- Email 3 (Day 7): Social proof or case study
- Email 4 (Day 10): Break-up email with soft close

Match the tone of the original email."`,
      },
      {
        step: 6,
        title: 'Execute via Slack',
        description: 'Use ClawdBot to manage outreach from Slack',
        tool: 'Slack (ClawdBot)',
        prompt: `"@ClawdBot send the cold email to [EMAIL].
Then create a follow-up task for Day 3 if no response.
Log this outreach to the Acme Corp prospect record."`,
      },
    ],
  },
  {
    id: 'deal-management',
    title: 'Deal Management Workflow',
    description: 'Pre-call prep → Meeting → CRM updates → Coaching',
    icon: TrendingUp,
    color: 'blue',
    tools: ['Salesforce', 'GTM MCP Server', 'Slack'],
    steps: [
      {
        step: 1,
        title: 'Pre-Call Briefing',
        description: 'Get context before every meeting',
        tool: 'Salesforce',
        prompt: `"I have a call with Sarah Chen at Acme Corp in 30 minutes. Pull from Salesforce:
- Account history and relationship summary
- Open opportunities and stage
- Recent activities and last touchpoint
- Key stakeholders and their roles
- Any notes from previous calls"`,
      },
      {
        step: 2,
        title: 'Generate Discovery Questions',
        description: 'Prepare targeted questions based on deal context',
        tool: 'GTM MCP Server',
        prompt: `"Based on the Acme Corp deal context:
- Stage: Discovery
- Pain point: manual reporting
- Stakeholders: VP Sales (champion), CFO (economic buyer)

Generate discovery questions for this call. Focus on:
1. Quantifying the pain
2. Understanding the buying process
3. Identifying potential blockers"`,
      },
      {
        step: 3,
        title: 'Post-Call Update',
        description: 'Update CRM with call outcomes',
        tool: 'Salesforce',
        prompt: `"Just finished the Acme call. Update Salesforce:
- Log the call with these notes: [SUMMARY]
- Update opportunity stage to 'Proposal'
- Update close date to end of Q1
- Add task: Send pricing proposal by Friday
- Update deal amount to $75,000"`,
      },
      {
        step: 4,
        title: 'Handle Objections',
        description: 'Get strategic responses to blockers',
        tool: 'GTM MCP Server',
        prompt: `"The CFO at Acme said: 'We need to see a 3x ROI to justify this investment.'

Help me respond. Context:
- Deal size: $75k
- Current manual process costs ~$50k/year in labor
- We typically deliver 40% efficiency gains

Give me a response framework and talking points."`,
      },
      {
        step: 5,
        title: 'Deal Coaching',
        description: 'Get strategic advice on stuck deals',
        tool: 'GTM MCP Server + Salesforce',
        prompt: `"The Acme deal has been stuck at Proposal for 2 weeks. Pull the deal history from Salesforce and help me:
1. Diagnose why it's stuck
2. Identify what's missing (champion, urgency, authority)
3. Recommend next actions to unstick it
4. Draft a re-engagement message"`,
      },
    ],
  },
  {
    id: 'team-collaboration',
    title: 'Team Collaboration Workflow',
    description: 'Research sharing → Deal rooms → Handoffs → Coaching',
    icon: Users,
    color: 'purple',
    tools: ['Slack (ClawdBot)', 'monday.com', 'GTM MCP Server'],
    steps: [
      {
        step: 1,
        title: 'Share Research in Slack',
        description: 'Distribute account research to the team',
        tool: 'Slack (ClawdBot)',
        prompt: `"@ClawdBot research Acme Corp and post a summary to #enterprise-deals. Include:
- Company overview
- Key contacts we should know
- Potential pain points
- Recommended approach"`,
      },
      {
        step: 2,
        title: 'Create Deal Room',
        description: 'Set up a monday.com board for complex deals',
        tool: 'monday.com',
        prompt: `"Create a deal board for Acme Corp ($75k opp):
- Add stakeholder tracking column
- Add decision criteria checklist
- Create tasks for: proposal, security review, legal review
- Set up timeline view with close date target"`,
      },
      {
        step: 3,
        title: 'SDR to AE Handoff',
        description: 'Structured handoff with full context',
        tool: 'GTM MCP Server',
        prompt: `"Create an SDR-to-AE handoff document for the Acme Corp lead:
- How we got the meeting (trigger event)
- Initial conversation summary
- Confirmed pain points
- Stakeholders identified
- Recommended discovery approach"`,
      },
      {
        step: 4,
        title: 'Manager Deal Review',
        description: 'AI-assisted pipeline review',
        tool: 'Slack (ClawdBot)',
        prompt: `"@ClawdBot analyze my team's pipeline for our weekly review:
- Deals at risk (no activity in 7+ days)
- Deals with missing next steps
- Forecast accuracy check
- Top 3 deals that need attention"`,
      },
    ],
  },
  {
    id: 'analytics',
    title: 'Analytics Workflow',
    description: 'Pipeline metrics → Conversion analysis → Forecasting',
    icon: BarChart3,
    color: 'orange',
    tools: ['Amplitude', 'Salesforce'],
    steps: [
      {
        step: 1,
        title: 'Pipeline Health Check',
        description: 'Get instant pipeline analytics',
        tool: 'Salesforce',
        prompt: `"Analyze my pipeline:
- Total pipeline value by stage
- Deals closing this month vs quota
- Average deal velocity by stage
- Win rate by lead source"`,
      },
      {
        step: 2,
        title: 'Conversion Analysis',
        description: 'Understand where deals are getting stuck',
        tool: 'Amplitude + Salesforce',
        prompt: `"Show me stage-to-stage conversion rates for the last 90 days:
- Discovery → Demo: %
- Demo → Proposal: %
- Proposal → Negotiation: %
- Negotiation → Closed Won: %

Highlight any stages below benchmark."`,
      },
      {
        step: 3,
        title: 'Forecast Accuracy',
        description: 'Compare forecast to actuals',
        tool: 'Salesforce',
        prompt: `"Compare my Q4 forecast to actuals:
- What I forecasted vs what closed
- Which deals slipped and why
- Accuracy by deal size segment
- Recommendations for improving forecast"`,
      },
      {
        step: 4,
        title: 'Product Usage Insights',
        description: 'Connect product data to sales outcomes',
        tool: 'Amplitude',
        prompt: `"For my active trials:
- Which prospects are most engaged (by product usage)?
- What features correlate with conversion?
- Which trials are at risk of churning?
- Recommend which trials to prioritize for outreach"`,
      },
    ],
  },
];

const implementationRoadmap = [
  {
    week: 'Week 1',
    title: 'Foundation',
    tasks: [
      'Install GTM MCP Server in Claude Code',
      'Set up ClawdBot in Slack',
      'Connect Clay account',
    ],
  },
  {
    week: 'Week 2',
    title: 'Prospecting',
    tasks: [
      'Define ICP in Claude',
      'Build first prospect list with Clay',
      'Draft and send first AI-assisted sequence',
    ],
  },
  {
    week: 'Week 3',
    title: 'Deal Management',
    tasks: [
      'Implement pre-call briefing workflow',
      'Set up post-call CRM updates',
      'Train on objection handling tools',
    ],
  },
  {
    week: 'Week 4',
    title: 'Team Rollout',
    tasks: [
      'Onboard team to ClawdBot',
      'Establish deal room process',
      'Set up manager review cadence',
    ],
  },
];

export default function SalesWorkflowsPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/free-tools" className="hover:text-foreground transition-colors">
            Free Tools
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/free-tools/claude-integrations" className="hover:text-foreground transition-colors">
            Claude Integrations
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">Sales Workflows</span>
        </div>

        {/* Hero */}
        <div className="mb-12">
          <Badge variant="outline" className="mb-4 border-orange-500/30 text-orange-400">
            Complete Guide
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Build Your AI Sales Stack
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Step-by-step workflows combining Claude with your sales tools.
            From prospecting to close, orchestrate your entire sales process with AI.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Workflow className="h-5 w-5" />
              <span>4 workflows</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              <span>Copy-paste prompts</span>
            </div>
          </div>
        </div>

        {/* Workflow Navigation */}
        <div className="mb-12 p-4 rounded-xl bg-zinc-900">
          <h3 className="font-semibold mb-3">Jump to Workflow:</h3>
          <div className="flex flex-wrap gap-2">
            {workflows.map((workflow) => (
              <a
                key={workflow.id}
                href={`#${workflow.id}`}
                className="px-3 py-1.5 rounded-lg bg-zinc-800 text-sm hover:bg-zinc-700 transition-colors"
              >
                {workflow.title}
              </a>
            ))}
          </div>
        </div>

        {/* Workflows */}
        <div className="space-y-16 mb-16">
          {workflows.map((workflow) => (
            <div key={workflow.id} id={workflow.id}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-lg bg-${workflow.color}-500/10 flex items-center justify-center`}>
                  <workflow.icon className={`h-5 w-5 text-${workflow.color}-400`} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{workflow.title}</h2>
                  <p className="text-sm text-muted-foreground">{workflow.description}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {workflow.tools.map((tool) => (
                  <Badge key={tool} variant="secondary" className="text-xs">
                    {tool}
                  </Badge>
                ))}
              </div>

              <div className="space-y-4">
                {workflow.steps.map((step) => (
                  <div
                    key={step.step}
                    className="p-5 rounded-xl border border-border bg-card"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-400 font-bold text-sm">{step.step}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{step.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            {step.tool}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-muted-foreground">Example prompt:</span>
                            <CopyButton text={step.prompt} />
                          </div>
                          <div className="bg-zinc-900 rounded-lg p-3">
                            <pre className="text-xs text-zinc-400 whitespace-pre-wrap font-mono">
                              {step.prompt}
                            </pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Implementation Roadmap */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">4-Week Implementation Roadmap</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {implementationRoadmap.map((week) => (
              <div
                key={week.week}
                className="p-5 rounded-xl border border-border bg-card"
              >
                <Badge variant="secondary" className="mb-3">{week.week}</Badge>
                <h3 className="font-semibold mb-3">{week.title}</h3>
                <div className="space-y-2">
                  {week.tasks.map((task, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{task}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tools Quick Links */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Set Up Your Tools</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/free-tools/mcp-server"
              className="p-4 rounded-xl border border-border bg-card hover:border-cyan-500/50 transition-all group"
            >
              <h3 className="font-semibold group-hover:text-cyan-400 transition-colors">GTM MCP Server</h3>
              <p className="text-sm text-muted-foreground">10 sales tools for Claude Code</p>
            </Link>
            <Link
              href="/free-tools/clawdbot"
              className="p-4 rounded-xl border border-border bg-card hover:border-purple-500/50 transition-all group"
            >
              <h3 className="font-semibold group-hover:text-purple-400 transition-colors">ClawdBot for Slack</h3>
              <p className="text-sm text-muted-foreground">AI assistant in your workspace</p>
            </Link>
            <Link
              href="/free-tools/claude-integrations/clay"
              className="p-4 rounded-xl border border-border bg-card hover:border-green-500/50 transition-all group"
            >
              <h3 className="font-semibold group-hover:text-green-400 transition-colors">Clay Integration</h3>
              <p className="text-sm text-muted-foreground">Lead enrichment and research</p>
            </Link>
            <Link
              href="/free-tools/claude-integrations/salesforce"
              className="p-4 rounded-xl border border-border bg-card hover:border-yellow-500/50 transition-all group"
            >
              <h3 className="font-semibold group-hover:text-yellow-400 transition-colors">Salesforce (Coming)</h3>
              <p className="text-sm text-muted-foreground">AI-powered CRM automation</p>
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center p-8 rounded-xl bg-zinc-900">
          <h2 className="text-2xl font-bold text-white mb-4">
            Want This All Pre-Built?
          </h2>
          <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
            Prospeda combines all these workflows into one platform. No setup required -
            just connect your tools and start selling with AI.
          </p>
          <a href="https://github.com/gtm-skills/gtm" target="_blank" rel="noopener noreferrer">
            <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
              Try Prospeda Free
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
