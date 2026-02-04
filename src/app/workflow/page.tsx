import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { workflows } from '@/lib/prompts';
import {
  ArrowRight,
  Search,
  Send,
  MessageCircle,
  Presentation,
  FileText,
  Handshake,
  TrendingUp,
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sales Workflows | GTM Skills',
  description: '125+ prompts organized by sales workflow stage. From prospecting to close to expansion.',
};

const iconMap: Record<string, React.ElementType> = {
  search: Search,
  send: Send,
  'message-circle': MessageCircle,
  presentation: Presentation,
  'file-text': FileText,
  handshake: Handshake,
  'trending-up': TrendingUp,
};

const workflowStages = [
  { stage: 'Prospecting', description: 'Identify and research target accounts', color: 'blue' },
  { stage: 'Outreach', description: 'Make first contact across channels', color: 'purple' },
  { stage: 'Discovery', description: 'Understand pain and qualify opportunity', color: 'green' },
  { stage: 'Demo', description: 'Show value tailored to their needs', color: 'yellow' },
  { stage: 'Proposal', description: 'Build the business case', color: 'orange' },
  { stage: 'Negotiation', description: 'Navigate terms and close', color: 'red' },
  { stage: 'Expansion', description: 'Grow and retain the account', color: 'pink' },
];

export default function WorkflowPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-purple-500/30 text-purple-400">
            125+ Prompts
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Sales Workflows
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Prompts organized by where you are in the sales process.
            Follow the flow or jump to what you need now.
          </p>
        </div>

        {/* Visual Workflow */}
        <div className="mb-16">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {workflowStages.map((stage, i) => (
              <div key={stage.stage} className="flex items-center">
                <div className="text-center">
                  <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full bg-${stage.color}-500/10 flex items-center justify-center mb-2`}>
                    <span className="text-sm md:text-lg font-bold text-muted-foreground">{i + 1}</span>
                  </div>
                  <p className="text-xs md:text-sm font-medium">{stage.stage}</p>
                </div>
                {i < workflowStages.length - 1 && (
                  <ArrowRight className="h-4 w-4 text-muted-foreground mx-1 md:mx-2 hidden sm:block" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Workflow Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {workflows.map((workflow) => {
            const Icon = iconMap[workflow.icon] || Search;
            return (
              <Link
                key={workflow.slug}
                href={`/workflow/${workflow.slug}`}
                className="group p-6 rounded-xl border border-border bg-card hover:border-purple-500/50 transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
                  <Icon className="h-6 w-6 text-purple-400" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="font-semibold text-foreground group-hover:text-purple-400 transition-colors">
                    {workflow.name}
                  </h2>
                  <Badge variant="secondary" className="text-xs">
                    {workflow.count}+
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {workflow.description}
                </p>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
              </Link>
            );
          })}
        </div>

        {/* Use Cases */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Common Workflow Scenarios</h2>
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            <div className="p-4 rounded-lg border border-border bg-card">
              <h3 className="font-semibold mb-2">New Outbound Campaign</h3>
              <p className="text-sm text-muted-foreground">
                Prospecting → Outreach → Discovery
              </p>
              <p className="text-xs text-purple-400 mt-2">
                Start with account research, build sequences, prep discovery questions
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-card">
              <h3 className="font-semibold mb-2">Inbound Demo Request</h3>
              <p className="text-sm text-muted-foreground">
                Discovery → Demo → Proposal
              </p>
              <p className="text-xs text-purple-400 mt-2">
                Qualify the lead, customize demo, build business case
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-card">
              <h3 className="font-semibold mb-2">Stuck Deal</h3>
              <p className="text-sm text-muted-foreground">
                Negotiation prompts
              </p>
              <p className="text-xs text-purple-400 mt-2">
                Unstick procurement, handle objections, get to close
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-card">
              <h3 className="font-semibold mb-2">Renewal Coming Up</h3>
              <p className="text-sm text-muted-foreground">
                Expansion → Negotiation
              </p>
              <p className="text-xs text-purple-400 mt-2">
                QBR prep, upsell opportunity, renewal negotiation
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            Want the complete workflow library?
          </p>
          <Link
            href="/download"
            className="text-purple-400 hover:text-purple-300 font-medium inline-flex items-center gap-2"
          >
            Download all workflows
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
