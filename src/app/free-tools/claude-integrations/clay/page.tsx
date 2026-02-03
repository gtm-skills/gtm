import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CopyButton } from '@/components/copy-button';
import {
  ArrowRight,
  ChevronRight,
  Search,
  Users,
  Building2,
  Mail,
  Zap,
  Database,
  CheckCircle2,
  Terminal,
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Claude + Clay Integration | AI Lead Research',
  description: 'Connect Claude to Clay for AI-powered lead research and enrichment. Find contacts, enrich company data, and build targeted prospect lists.',
  openGraph: {
    title: 'Claude + Clay: AI Lead Research',
    description: 'Combine Claude AI with Clay data enrichment for powerful prospecting workflows.',
  },
};

const capabilities = [
  {
    icon: Search,
    title: 'Lead Research',
    description: 'Ask Claude to research companies and find the right contacts using Clay data',
  },
  {
    icon: Building2,
    title: 'Company Enrichment',
    description: 'Pull technographics, funding data, employee count, and more from Clay',
  },
  {
    icon: Users,
    title: 'Contact Discovery',
    description: 'Find decision-makers, get verified emails, and see job changes',
  },
  {
    icon: Database,
    title: 'List Building',
    description: 'Build targeted prospect lists based on ICP criteria',
  },
];

const workflows = [
  {
    title: 'Account Research Workflow',
    description: 'Research a target account before outreach',
    steps: [
      'Ask Claude to research the company using Clay',
      'Get firmographic data (size, funding, industry)',
      'Find key decision-makers and their backgrounds',
      'Identify trigger events and outreach hooks',
      'Draft personalized outreach using insights',
    ],
    prompt: `"Research Stripe using Clay. I need:
1. Company overview (size, funding, tech stack)
2. Key contacts in engineering leadership
3. Recent news or trigger events
4. Pain points I can use for outreach

I'm selling developer tools."`,
  },
  {
    title: 'Contact Enrichment Workflow',
    description: 'Enrich a list of prospects with Clay data',
    steps: [
      'Provide Claude with basic contact info',
      'Clay enriches with verified emails, titles, LinkedIn',
      'Add company context to each contact',
      'Score and prioritize the list',
      'Generate personalized first lines',
    ],
    prompt: `"I have these prospects from a conference:
- John Smith, Acme Corp
- Sarah Chen, TechStartup Inc
- Mike Johnson, Enterprise Co

Use Clay to enrich these contacts. Get their emails, current titles, and company info. Then draft a personalized follow-up for each."`,
  },
  {
    title: 'ICP List Building Workflow',
    description: 'Build a targeted prospect list from scratch',
    steps: [
      'Define your ICP criteria',
      'Clay searches and filters companies',
      'Find contacts at matching companies',
      'Enrich with emails and context',
      'Export prioritized list',
    ],
    prompt: `"Build a prospect list using Clay:

ICP: Series B-C SaaS companies, 100-500 employees, using AWS
Target persona: VP of Engineering or CTO
Location: San Francisco Bay Area

Find 25 companies matching this criteria, then get the best contact at each."`,
  },
];

const comparison = [
  {
    feature: 'Company Research',
    clay: 'Live data from 100+ sources',
    mcpServer: 'Research frameworks and checklists',
  },
  {
    feature: 'Contact Data',
    clay: 'Verified emails, phone numbers',
    mcpServer: 'Research templates for manual lookup',
  },
  {
    feature: 'Data Freshness',
    clay: 'Real-time enrichment',
    mcpServer: 'Prompt-based guidance',
  },
  {
    feature: 'List Building',
    clay: 'Automated prospecting',
    mcpServer: 'Manual with AI assistance',
  },
  {
    feature: 'Cost',
    clay: 'Clay subscription required',
    mcpServer: 'Free with Claude',
  },
  {
    feature: 'Best For',
    clay: 'High-volume prospecting',
    mcpServer: 'Strategic research + outreach',
  },
];

export default function ClayPage() {
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
          <span className="text-foreground">Clay</span>
        </div>

        {/* Hero */}
        <div className="mb-12">
          <Badge variant="outline" className="mb-4 border-green-500/30 text-green-400">
            Available Now
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Claude + Clay
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Combine Claude&apos;s AI capabilities with Clay&apos;s lead enrichment.
            Research companies, find contacts, and build prospect lists through conversation.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              <span>Lead enrichment</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              <span>Native integration</span>
            </div>
          </div>
        </div>

        {/* Capabilities */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">What You Can Do</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {capabilities.map((capability) => (
              <div
                key={capability.title}
                className="p-5 rounded-xl border border-border bg-card"
              >
                <capability.icon className="h-6 w-6 text-green-400 mb-3" />
                <h3 className="font-semibold mb-2">{capability.title}</h3>
                <p className="text-sm text-muted-foreground">{capability.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Workflows */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Sales Workflows</h2>
          <div className="space-y-6">
            {workflows.map((workflow) => (
              <div
                key={workflow.title}
                className="p-6 rounded-xl border border-border bg-card"
              >
                <h3 className="font-semibold text-lg mb-2">{workflow.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{workflow.description}</p>

                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">Steps:</h4>
                  <div className="space-y-2">
                    {workflow.steps.map((step, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs text-green-400">{index + 1}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium">Example Prompt:</h4>
                    <CopyButton text={workflow.prompt} />
                  </div>
                  <div className="bg-zinc-900 rounded-lg p-4">
                    <pre className="text-sm text-zinc-400 whitespace-pre-wrap font-mono">
                      {workflow.prompt}
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Clay vs GTM MCP Server</h2>
          <p className="text-muted-foreground mb-6">
            Both tools help with sales research, but they serve different purposes.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold">Feature</th>
                  <th className="text-left py-3 px-4 font-semibold text-green-400">Clay Integration</th>
                  <th className="text-left py-3 px-4 font-semibold text-cyan-400">GTM MCP Server</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.feature} className="border-b border-border/50">
                    <td className="py-3 px-4 text-sm">{row.feature}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{row.clay}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{row.mcpServer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-4 rounded-lg bg-zinc-900">
            <p className="text-sm text-zinc-400">
              <strong className="text-white">Recommendation:</strong> Use Clay for high-volume
              prospecting and data enrichment. Use the GTM MCP Server for strategic research,
              outreach drafting, and deal strategy. They complement each other well.
            </p>
          </div>
        </div>

        {/* Getting Started */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Getting Started</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border">
              <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                <span className="text-green-400 font-bold">1</span>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Get a Clay Account</h4>
                <p className="text-sm text-muted-foreground">
                  Sign up for Clay at{' '}
                  <a href="https://clay.com" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300">
                    clay.com
                  </a>
                  . They offer a free tier to get started.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border">
              <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                <span className="text-green-400 font-bold">2</span>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Enable in Claude</h4>
                <p className="text-sm text-muted-foreground">
                  Claude&apos;s interactive tools are available for Pro, Max, Team, and Enterprise users.
                  Enable Clay in your connected apps.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border">
              <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                <span className="text-green-400 font-bold">3</span>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Start Researching</h4>
                <p className="text-sm text-muted-foreground">
                  Ask Claude to research companies or enrich contacts. It will use Clay
                  automatically when data enrichment is needed.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Also Try MCP Server */}
        <div className="mb-16 p-6 rounded-xl bg-cyan-500/5 border border-cyan-500/20">
          <div className="flex items-start gap-4">
            <Terminal className="h-6 w-6 text-cyan-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-cyan-400 mb-2">Complement with GTM MCP Server</h3>
              <p className="text-sm text-muted-foreground mb-4">
                While Clay excels at data enrichment, our GTM MCP Server adds outreach drafting,
                objection handling, discovery questions, and full sales workflows. Use them together
                for a complete prospecting toolkit.
              </p>
              <Link
                href="/free-tools/mcp-server"
                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
              >
                Install the GTM MCP Server
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center p-8 rounded-xl bg-zinc-900">
          <h2 className="text-2xl font-bold text-white mb-4">
            Want Automated Lead Enrichment?
          </h2>
          <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
            Prospeda combines Clay-style enrichment with AI outreach automation.
            Import leads, enrich automatically, and generate personalized sequences.
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
