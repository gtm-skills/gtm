import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  Bot,
  GitCompare,
  Terminal,
  Scale,
  Link2,
  Users,
  Target,
  Layers,
} from 'lucide-react';
import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/json-ld';

export const metadata: Metadata = {
  title: 'Guides | Agentic GTM Playbooks | GTM Skills',
  description:
    'In-depth guides on building agentic GTM workflows: AI SDR agents, Claude + MCP setup, prompt chains, sales methodology for agents, and honest comparisons against the AI SDR platform category.',
  openGraph: {
    title: 'Guides | Agentic GTM Playbooks | GTM Skills',
    description:
      'In-depth guides on building agentic GTM workflows, grounded in real, working, open-source tools.',
  },
};

interface Guide {
  slug: string;
  name: string;
  description: string;
  icon: React.ElementType;
  badge: string;
  featured?: boolean;
}

const guides: Guide[] = [
  {
    slug: 'ai-sdr-agents-guide',
    name: 'AI SDR Agents in 2026: The Complete Guide',
    description:
      'What an AI SDR agent actually is, the decide-act-adapt loop, and a real multi-agent architecture you can build today.',
    icon: Bot,
    badge: 'Start Here',
    featured: true,
  },
  {
    slug: 'agentic-gtm-stack-2026',
    name: 'The Agentic GTM Stack in 2026',
    description:
      'A field guide to research, personalization, outreach, qualification, and orchestration agents — plus where human judgment still matters most.',
    icon: Layers,
    badge: 'Field Guide',
  },
  {
    slug: 'build-ai-sdr-with-claude-mcp',
    name: 'How to Build an AI SDR with Claude + MCP',
    description:
      'Turn Claude into an AI SDR using the real, open-source GTM MCP server. Step-by-step setup, zero programming.',
    icon: Terminal,
    badge: 'Tutorial',
  },
  {
    slug: 'ai-sdr-agent-vs-traditional-sdr',
    name: 'AI SDR Agent vs. Traditional SDR',
    description:
      'A grounded comparison: research approach, personalization depth, speed, cost, and where humans still matter.',
    icon: GitCompare,
    badge: 'Comparison',
  },
  {
    slug: 'clay-vs-claude-mcp',
    name: 'Clay vs. Claude + GTM Skills MCP',
    description:
      'A fair comparison of the two approaches to AI-powered sales research — and when to use each, or both.',
    icon: Scale,
    badge: 'Comparison',
  },
  {
    slug: 'openclaw-vs-ai-sdr-platforms',
    name: 'OpenClaw vs. AI SDR Platforms',
    description:
      'Four Claude-powered agents you host and own, versus paid AI SDR SaaS. An honest look at the tradeoffs.',
    icon: Scale,
    badge: 'Comparison',
  },
  {
    slug: 'agentic-gtm-prompt-chains',
    name: '10 Prompt Chains That Replace Manual SDR Work',
    description:
      '10 real, copy-paste prompt chains from the GTM Skills prompt library — each one a sequence where every output feeds the next.',
    icon: Link2,
    badge: '10 Chains',
  },
  {
    slug: 'sales-methodology-for-ai-agents',
    name: 'MEDDPICC, Challenger & SPIN for AI Agents',
    description:
      'How to encode classic sales methodology into agent system prompts and qualification logic — not generic advice.',
    icon: Target,
    badge: 'Methodology',
  },
];

export default function GuidesPage() {
  const featured = guides.find((g) => g.featured);
  const rest = guides.filter((g) => !g.featured);

  return (
    <div className="py-12 md:py-20">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://gtm-skills.com' },
          { name: 'Guides', url: 'https://gtm-skills.com/guides' },
        ]}
      />
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-brand-primary/30 text-brand-primary">
            <Users className="h-3 w-3 mr-1" />
            Guides
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Agentic GTM Guides
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Deep, grounded guides on building agentic GTM workflows — written against
            real, working, open-source tools, not abstract claims.
          </p>
        </div>

        {/* Featured guide */}
        {featured && (
          <Link
            href={`/guides/${featured.slug}`}
            className="group block p-8 rounded-2xl border border-border bg-card hover:border-brand-primary/50 transition-all mb-8 max-w-5xl mx-auto"
          >
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 rounded-lg flex items-center justify-center shrink-0 bg-brand-primary/10 text-brand-primary group-hover:bg-brand-primary/20 transition-colors">
                <featured.icon className="h-7 w-7" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-xl font-semibold text-foreground group-hover:text-brand-primary transition-colors">
                    {featured.name}
                  </h2>
                  <Badge variant="secondary" className="text-xs">{featured.badge}</Badge>
                </div>
                <p className="text-muted-foreground mb-4">{featured.description}</p>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-brand-primary">
                  Read the guide
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* Guides grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {rest.map((guide) => {
            const Icon = guide.icon;
            return (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group p-6 rounded-xl border border-border bg-card hover:border-brand-primary/50 transition-all"
              >
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-brand-primary/10 text-brand-primary group-hover:bg-brand-primary/20 transition-colors">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="font-semibold text-foreground group-hover:text-brand-primary transition-colors">
                    {guide.name}
                  </h2>
                  <Badge variant="secondary" className="text-xs shrink-0">{guide.badge}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{guide.description}</p>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-brand-primary group-hover:translate-x-1 transition-all" />
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            Want the hands-on version? Browse the full prompt library or start with the tutorials.
          </p>
          <div className="flex items-center justify-center gap-6">
            <Link href="/prompts" className="text-brand-primary hover:text-brand-secondary font-medium inline-flex items-center gap-2">
              Browse Prompts
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/tutorials" className="text-brand-primary hover:text-brand-secondary font-medium inline-flex items-center gap-2">
              View Tutorials
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
