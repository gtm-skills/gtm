/**
 * Product Surface Grid Component
 * Single, consistently-styled grid replacing the old EcosystemBar + ToolsGrid +
 * inline Categories Grid (3 sections that each pitched "everything GTM Skills
 * offers" with 3 different visual treatments). One card style, one brand accent.
 */

import Link from 'next/link';
import {
  ArrowRight,
  Bot,
  Building2,
  FileText,
  Globe,
  Mic,
  Users,
  BookOpen,
  Zap,
} from 'lucide-react';

const productSurfaces = [
  {
    name: 'Prompts Library',
    description: '1,000+ battle-tested GTM prompts for every role, industry, and deal stage.',
    href: '/prompts',
    icon: FileText,
    spec: '1,000+',
  },
  {
    name: 'Agentic BDR Agents',
    description: 'AI agents that autonomously research accounts, personalize outreach, and book meetings.',
    href: '/agentic-bdr',
    icon: Bot,
    spec: 'New',
  },
  {
    name: 'MCP Server',
    description: '10 AI tools and 6 interactive UIs that plug GTM Skills straight into Claude.',
    href: '/free-tools/mcp-server',
    icon: Zap,
    spec: 'MCP',
  },
  {
    name: 'Browser Extension',
    description: 'Get prompts directly in LinkedIn and Gmail. One click to copy, customize, and send.',
    href: '/pricing',
    icon: Globe,
    spec: 'Chrome',
  },
  {
    name: 'Industry Packs',
    description: '8 industries, 800+ prompts tailored to your buyers and their language.',
    href: '/industry',
    icon: Building2,
    spec: '800+',
  },
  {
    name: 'Role Playbooks',
    description: 'Complete workflows for SDR, AE, CSM, and every other GTM role.',
    href: '/role',
    icon: Users,
    spec: '200+',
  },
  {
    name: 'Methodologies',
    description: 'MEDDPICC, SPIN, Challenger, and Sandler prompts built into every framework.',
    href: '/methodology',
    icon: BookOpen,
    spec: '50+',
  },
  {
    name: 'Voice Templates',
    description: 'Deploy agentic voice calls with pre-built scripts for cold calls and discovery.',
    href: '/voice-templates',
    icon: Mic,
    spec: 'Vapi',
  },
];

export function ProductSurfaceGrid() {
  return (
    <section className="py-16 md:py-24 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between gap-6 mb-10 flex-wrap">
          <div>
            <p className="label-mono text-xs text-muted-foreground mb-2">§ Index</p>
            <h2 className="text-2xl md:text-3xl font-bold" style={{ textWrap: 'balance' }}>
              One platform, every GTM surface
            </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm">
            Prompts, agents, and integrations that meet your team where they already work.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 border-t border-l border-border">
          {productSurfaces.map((surface, index) => (
            <Link
              key={surface.name}
              href={surface.href}
              className="group relative p-6 border-r border-b border-border hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="label-mono text-[11px] text-primary">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <surface.icon className="h-4 w-4 text-muted-foreground" />
              </div>

              <h3 className="font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors">
                {surface.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {surface.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="label-mono text-[10px] text-muted-foreground">{surface.spec}</span>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
