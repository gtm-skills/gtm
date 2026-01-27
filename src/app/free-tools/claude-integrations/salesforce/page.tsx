import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  ChevronRight,
  Database,
  CheckCircle2,
  Clock,
  Zap,
  MessageSquare,
  BarChart3,
  Users,
  FileText,
  AlertCircle,
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Claude + Salesforce Integration | AI-Powered CRM',
  description: 'Connect Claude to Salesforce for AI-powered CRM automation. Update records, log activities, get deal insights, and automate sales workflows.',
  openGraph: {
    title: 'Claude + Salesforce: AI-Powered CRM',
    description: 'Native Salesforce integration for Claude. Automate CRM tasks with natural language.',
  },
};

const capabilities = [
  {
    icon: Database,
    title: 'Record Management',
    description: 'Create, update, and query Salesforce records using natural language',
    examples: ['Update opportunity stage to Negotiation', 'Find all deals closing this month', 'Create a new lead from this email'],
  },
  {
    icon: MessageSquare,
    title: 'Activity Logging',
    description: 'Automatically log calls, emails, and meetings to the right records',
    examples: ['Log this call to the Acme opportunity', 'Add meeting notes to contact record', 'Track email engagement'],
  },
  {
    icon: BarChart3,
    title: 'Pipeline Analytics',
    description: 'Get instant insights on your pipeline, forecasts, and deal health',
    examples: ['Show my pipeline by stage', 'Which deals are at risk?', 'Forecast for Q1'],
  },
  {
    icon: Users,
    title: 'Account Intelligence',
    description: 'Pull account history, contacts, and engagement data for context',
    examples: ['Summarize Acme account history', 'Who are the key contacts?', 'Last 5 interactions'],
  },
];

const useCases = [
  {
    title: 'Pre-Call Research',
    description: 'Ask Claude to pull all relevant Salesforce data before a call: account history, open opportunities, recent activities, and contact details.',
    prompt: '"Give me a briefing for my call with Sarah at Acme Corp. Pull their account history, open opps, and recent activities from Salesforce."',
  },
  {
    title: 'Post-Call Updates',
    description: 'After a call, tell Claude what happened and it will update the opportunity, log the activity, and create follow-up tasks.',
    prompt: '"Log my call with Sarah. She confirmed budget of $50k, wants to move forward. Update the opp to Proposal stage and create a task to send pricing."',
  },
  {
    title: 'Pipeline Review',
    description: 'Get instant pipeline analytics. Ask about deal health, forecast accuracy, or which opportunities need attention.',
    prompt: '"Which of my deals are most at risk? Show me opportunities with no activity in 14+ days."',
  },
  {
    title: 'Deal Coaching',
    description: 'Claude can analyze deal data and provide strategic advice based on your CRM history and patterns.',
    prompt: '"The Acme deal is stuck at $75k. Based on similar deals we\'ve won, what should I do to unstick it?"',
  },
];

const preparation = [
  {
    title: 'Audit Your Data Quality',
    description: 'Clean up duplicate records, ensure consistent field usage, and document your custom objects',
  },
  {
    title: 'Document Your Process',
    description: 'Map your sales stages, required fields, and workflows so Claude understands your process',
  },
  {
    title: 'Set Up API Access',
    description: 'Ensure you have API access enabled and understand your Salesforce edition limits',
  },
  {
    title: 'Train Your Team',
    description: 'Prepare documentation on how reps should interact with Claude for CRM tasks',
  },
];

export default function SalesforcePage() {
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
          <span className="text-foreground">Salesforce</span>
        </div>

        {/* Hero */}
        <div className="mb-12">
          <Badge variant="outline" className="mb-4 border-yellow-500/30 text-yellow-400">
            Coming Soon
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Claude + Salesforce
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            AI-powered CRM automation is coming to Claude. Update records, log activities,
            and get deal insights - all through natural conversation.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              <span>Native integration</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>Announced Jan 2026</span>
            </div>
          </div>
        </div>

        {/* Announcement Banner */}
        <div className="mb-12 p-6 rounded-xl bg-blue-500/10 border border-blue-500/20">
          <div className="flex items-start gap-4">
            <Zap className="h-6 w-6 text-blue-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-400 mb-2">What We Know</h3>
              <p className="text-sm text-muted-foreground">
                Anthropic announced Salesforce as a &quot;coming soon&quot; integration for Claude&apos;s
                interactive tools. This will allow Claude to read and write Salesforce data
                through the Model Context Protocol (MCP), enabling natural language CRM automation.
              </p>
            </div>
          </div>
        </div>

        {/* Expected Capabilities */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Expected Capabilities</h2>
          <div className="space-y-4">
            {capabilities.map((capability) => (
              <div
                key={capability.title}
                className="p-6 rounded-xl border border-border bg-card"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <capability.icon className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">{capability.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{capability.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {capability.examples.map((example) => (
                        <span
                          key={example}
                          className="text-xs bg-zinc-800 text-zinc-400 px-2 py-1 rounded"
                        >
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Use Cases */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Use Cases for Sales Teams</h2>
          <div className="space-y-4">
            {useCases.map((useCase) => (
              <div
                key={useCase.title}
                className="p-6 rounded-xl border border-border bg-card"
              >
                <h3 className="font-semibold mb-2">{useCase.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{useCase.description}</p>
                <div className="bg-zinc-900 rounded-lg p-4">
                  <p className="text-sm font-mono text-zinc-400">{useCase.prompt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Preparation Checklist */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Prepare Your Salesforce Instance</h2>
          <p className="text-muted-foreground mb-6">
            Get ready for Claude integration by preparing your Salesforce environment.
          </p>
          <div className="space-y-3">
            {preparation.map((item, index) => (
              <div
                key={item.title}
                className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border"
              >
                <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alternative - MCP Server */}
        <div className="mb-16 p-6 rounded-xl bg-zinc-900">
          <div className="flex items-start gap-4">
            <AlertCircle className="h-6 w-6 text-cyan-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-cyan-400 mb-2">Can&apos;t Wait?</h3>
              <p className="text-sm text-zinc-400 mb-4">
                Our GTM MCP Server provides similar sales automation capabilities today.
                While it doesn&apos;t directly integrate with Salesforce, it offers research,
                outreach drafting, objection handling, and deal strategy tools that work
                in Claude Code right now.
              </p>
              <Link
                href="/free-tools/mcp-server"
                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
              >
                Try the GTM MCP Server
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Stay Updated */}
        <div className="mb-16 p-6 rounded-xl border border-border bg-card">
          <h3 className="font-semibold mb-2">Stay Updated</h3>
          <p className="text-sm text-muted-foreground mb-4">
            We&apos;ll update this page when Salesforce integration launches. Follow our
            updates or check back for the full setup guide and best practices.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://claude.com/blog/interactive-tools-in-claude"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              Read the announcement
            </a>
            <span className="text-zinc-600">|</span>
            <a
              href="https://modelcontextprotocol.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              Learn about MCP
            </a>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center p-8 rounded-xl bg-zinc-900">
          <h2 className="text-2xl font-bold text-white mb-4">
            Need Salesforce Integration Now?
          </h2>
          <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
            Prospeda already integrates with Salesforce. Sync your CRM, enrich leads with AI,
            and automate outreach - all connected to your Salesforce instance.
          </p>
          <a href="https://github.com/Prospeda/gtm-skills" target="_blank" rel="noopener noreferrer">
            <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
              Try Prospeda Free
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
