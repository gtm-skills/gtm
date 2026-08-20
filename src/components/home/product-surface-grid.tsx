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
import { Badge } from '@/components/ui/badge';

const productSurfaces = [
  {
    name: 'Prompts Library',
    description: '1,000+ battle-tested GTM prompts for every role, industry, and deal stage.',
    href: '/prompts',
    icon: FileText,
    badge: '1,000+',
  },
  {
    name: 'Agentic BDR Agents',
    description: 'AI agents that autonomously research accounts, personalize outreach, and book meetings.',
    href: '/agentic-bdr',
    icon: Bot,
    badge: 'New',
  },
  {
    name: 'MCP Server',
    description: '10 AI tools and 6 interactive UIs that plug GTM Skills straight into Claude.',
    href: '/free-tools/mcp-server',
    icon: Zap,
    badge: 'MCP',
  },
  {
    name: 'Browser Extension',
    description: 'Get prompts directly in LinkedIn and Gmail. One click to copy, customize, and send.',
    href: '/download',
    icon: Globe,
    badge: 'Chrome',
  },
  {
    name: 'Industry Packs',
    description: '8 industries, 800+ prompts tailored to your buyers and their language.',
    href: '/industry',
    icon: Building2,
    badge: '800+',
  },
  {
    name: 'Role Playbooks',
    description: 'Complete workflows for SDR, AE, CSM, and every other GTM role.',
    href: '/role',
    icon: Users,
    badge: '200+',
  },
  {
    name: 'Methodologies',
    description: 'MEDDPICC, SPIN, Challenger, and Sandler prompts built into every framework.',
    href: '/methodology',
    icon: BookOpen,
    badge: '50+',
  },
  {
    name: 'Voice Templates',
    description: 'Deploy agentic voice calls with pre-built scripts for cold calls and discovery.',
    href: '/voice-templates',
    icon: Mic,
    badge: 'Vapi',
  },
];

export function ProductSurfaceGrid() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-border text-muted-foreground">
            The Platform
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            One Platform, Every GTM Surface
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Prompts, agents, and integrations that meet your team where they already work —
            in the browser, in your CRM, and inside Claude itself.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {productSurfaces.map((surface) => (
            <Link
              key={surface.name}
              href={surface.href}
              className="group relative p-6 rounded-xl border border-border bg-card/50 hover:border-primary/50 transition-all duration-300"
            >
              <Badge className="absolute top-4 right-4 text-[10px] bg-muted text-muted-foreground border-border">
                {surface.badge}
              </Badge>

              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 group-hover:scale-110 transition-all">
                <surface.icon className="h-6 w-6 text-primary" />
              </div>

              <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {surface.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {surface.description}
              </p>

              <div className="flex items-center gap-1 text-sm text-muted-foreground group-hover:text-primary transition-colors">
                <span>Explore</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
