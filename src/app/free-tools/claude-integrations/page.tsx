import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  ChevronRight,
  Plug,
  Terminal,
  MessageSquare,
  Database,
  BarChart3,
  KanbanSquare,
  Search,
  Zap,
  CheckCircle2,
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Claude Integrations for Sales | AI Sales Stack',
  description: 'Connect Claude to Salesforce, Slack, Clay, and more. Build an AI-powered sales stack with native integrations and MCP tools.',
  openGraph: {
    title: 'Claude + Your Sales Stack',
    description: 'Native integrations and MCP tools to supercharge your sales workflow with AI.',
  },
};

const integrations = [
  {
    slug: 'salesforce',
    name: 'Salesforce',
    description: 'AI-powered CRM automation. Update records, log activities, and get deal insights.',
    icon: Database,
    status: 'Coming Soon',
    statusColor: 'bg-yellow-500/10 text-yellow-400',
    available: true,
  },
  {
    slug: '/free-tools/mcp-server',
    name: 'GTM MCP Server',
    description: '10 sales tools for Claude Code. Research, outreach, objections, and full workflows.',
    icon: Terminal,
    status: 'Available',
    statusColor: 'bg-green-500/10 text-green-400',
    available: true,
    external: false,
  },
  {
    slug: '/free-tools/clawdbot',
    name: 'Slack (ClawdBot)',
    description: 'AI sales assistant in Slack. Research, write emails, handle objections in your workspace.',
    icon: MessageSquare,
    status: 'Tutorial',
    statusColor: 'bg-purple-500/10 text-purple-400',
    available: true,
    external: false,
  },
  {
    slug: 'clay',
    name: 'Clay',
    description: 'Lead enrichment and research. Pull company data, find contacts, enrich your pipeline.',
    icon: Search,
    status: 'Available',
    statusColor: 'bg-green-500/10 text-green-400',
    available: true,
  },
  {
    slug: 'https://amplitude.com',
    name: 'Amplitude',
    description: 'Product analytics integration. Query user behavior, build reports, track conversions.',
    icon: BarChart3,
    status: 'Native',
    statusColor: 'bg-blue-500/10 text-blue-400',
    available: false,
    external: true,
  },
  {
    slug: 'https://monday.com',
    name: 'monday.com',
    description: 'Project management. Create tasks, update boards, track deal progress.',
    icon: KanbanSquare,
    status: 'Native',
    statusColor: 'bg-blue-500/10 text-blue-400',
    available: false,
    external: true,
  },
];

const useCases = [
  {
    title: 'Prospecting',
    description: 'Research companies and leads, draft personalized outreach, multi-channel sequences',
    tools: ['MCP Server', 'Clay', 'Slack'],
  },
  {
    title: 'Deal Management',
    description: 'Update CRM records, log activities, get AI coaching on stuck deals',
    tools: ['Salesforce', 'Slack'],
  },
  {
    title: 'Analytics',
    description: 'Track pipeline metrics, analyze conversion rates, forecast revenue',
    tools: ['Amplitude', 'Salesforce'],
  },
  {
    title: 'Team Collaboration',
    description: 'Share research, coordinate outreach, get instant AI assistance',
    tools: ['Slack', 'monday.com'],
  },
];

export default function ClaudeIntegrationsPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/free-tools" className="hover:text-foreground transition-colors">
            Free Tools
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">Claude Integrations</span>
        </div>

        {/* Hero */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-blue-500/30 text-blue-400">
            New: Interactive Tools
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Claude + Your Sales Stack
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Connect Claude to your favorite sales tools. Research leads, update your CRM,
            draft outreach, and analyze deals - all through natural conversation.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Plug className="h-5 w-5" />
              <span>Native integrations</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              <span>MCP protocol</span>
            </div>
          </div>
        </div>

        {/* Integrations Grid */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold mb-6">Available Integrations</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {integrations.map((integration) => {
              const isExternal = integration.external;
              const href = integration.slug.startsWith('/') || integration.slug.startsWith('http')
                ? integration.slug
                : `/free-tools/claude-integrations/${integration.slug}`;

              const CardContent = (
                <>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <integration.icon className="h-6 w-6 text-blue-400" />
                    </div>
                    <Badge className={`text-xs ${integration.statusColor}`}>
                      {integration.status}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-400 transition-colors">
                    {integration.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {integration.description}
                  </p>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                </>
              );

              if (isExternal) {
                return (
                  <a
                    key={integration.name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-6 rounded-xl border border-border bg-card hover:border-blue-500/50 transition-all opacity-60"
                  >
                    {CardContent}
                  </a>
                );
              }

              return (
                <Link
                  key={integration.name}
                  href={href}
                  className="group p-6 rounded-xl border border-border bg-card hover:border-blue-500/50 transition-all"
                >
                  {CardContent}
                </Link>
              );
            })}
          </div>
        </div>

        {/* What is MCP */}
        <div className="mb-20 p-8 rounded-xl bg-zinc-900">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">What is MCP?</h2>
            <p className="text-zinc-400 mb-6">
              <strong className="text-white">Model Context Protocol (MCP)</strong> is an open standard
              that allows AI models like Claude to connect to external tools and data sources. It&apos;s
              how Claude can now interact with Salesforce, Slack, and other platforms directly.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-lg bg-zinc-800">
                <h4 className="font-semibold mb-2">Native Integrations</h4>
                <p className="text-sm text-zinc-400">
                  Built-in support for popular tools like Salesforce, Slack, and Amplitude
                </p>
              </div>
              <div className="p-4 rounded-lg bg-zinc-800">
                <h4 className="font-semibold mb-2">Custom MCP Servers</h4>
                <p className="text-sm text-zinc-400">
                  Build your own integrations with the open MCP protocol
                </p>
              </div>
              <div className="p-4 rounded-lg bg-zinc-800">
                <h4 className="font-semibold mb-2">Interactive UIs</h4>
                <p className="text-sm text-zinc-400">
                  MCP Apps enable rich, interactive interfaces inside Claude
                </p>
              </div>
            </div>
            <a
              href="https://modelcontextprotocol.io"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300"
            >
              Learn more about MCP
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Use Cases */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold mb-6">Sales Workflows</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {useCases.map((useCase) => (
              <div
                key={useCase.title}
                className="p-6 rounded-xl border border-border bg-card"
              >
                <h3 className="font-semibold text-lg mb-2">{useCase.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{useCase.description}</p>
                <div className="flex flex-wrap gap-2">
                  {useCase.tools.map((tool) => (
                    <Badge key={tool} variant="secondary" className="text-xs">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link
              href="/free-tools/claude-integrations/sales-workflows"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300"
            >
              View detailed workflow guides
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Getting Started */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold mb-6">Getting Started</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-6 rounded-xl border border-border bg-card">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                <span className="text-blue-400 font-bold">1</span>
              </div>
              <h3 className="font-semibold mb-2">Choose Your Tools</h3>
              <p className="text-sm text-muted-foreground">
                Pick the integrations that match your sales workflow. Start with MCP Server for
                the most flexibility.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                <span className="text-blue-400 font-bold">2</span>
              </div>
              <h3 className="font-semibold mb-2">Configure in Claude</h3>
              <p className="text-sm text-muted-foreground">
                Enable integrations in Claude Desktop or Claude Code. Follow our setup guides
                for each tool.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                <span className="text-blue-400 font-bold">3</span>
              </div>
              <h3 className="font-semibold mb-2">Start Selling</h3>
              <p className="text-sm text-muted-foreground">
                Use natural language to research, write, and manage deals. Claude handles the
                tool orchestration.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center p-8 rounded-xl bg-zinc-900">
          <h2 className="text-2xl font-bold text-white mb-4">
            Want All Integrations Pre-Built?
          </h2>
          <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
            Prospeda combines all these integrations into one platform. CRM sync, lead enrichment,
            AI outreach, and analytics - ready to use.
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
