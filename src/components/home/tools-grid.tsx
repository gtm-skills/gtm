/**
 * Tools & Integrations Grid Component
 * 4-card grid showcasing Extension, Voice, HubSpot, API
 */

import Link from 'next/link';
import { ArrowRight, Globe, Mic, Link2, Code } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const tools = [
  {
    title: 'Browser Extension',
    description: 'Get prompts directly in LinkedIn and Gmail. One click to copy, customize, and send.',
    href: '/download',
    icon: Globe,
    gradient: 'from-blue-500 to-cyan-500',
    badge: 'Chrome',
  },
  {
    title: 'Voice Templates',
    description: 'Deploy agentic voice calls with pre-built scripts for cold calls, discovery, and follow-ups.',
    href: '/voice-templates',
    icon: Mic,
    gradient: 'from-violet-500 to-purple-500',
    badge: 'Vapi',
  },
  {
    title: 'HubSpot Integration',
    description: 'Get context-aware prompts based on deal stage, contact role, and pipeline data.',
    href: '/integrations/hubspot',
    icon: Link2,
    gradient: 'from-teal-500 to-cyan-500',
    badge: 'CRM',
  },
  {
    title: 'REST API',
    description: 'Build your own integrations. Full API access with llms.txt for agentic discovery.',
    href: '/developers',
    icon: Code,
    gradient: 'from-emerald-500 to-teal-500',
    badge: 'v1',
  },
];

export function ToolsGrid() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-border text-muted-foreground">
            Tools & Integrations
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            GTM Skills Everywhere You Work
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Access prompts in your browser, CRM, or build custom integrations with our API.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {tools.map((tool) => (
            <Link
              key={tool.title}
              href={tool.href}
              className="group relative p-6 rounded-xl border border-border bg-card/50 hover:border-border transition-all duration-300"
            >
              <Badge className="absolute top-4 right-4 text-[10px] bg-muted text-muted-foreground border-border">
                {tool.badge}
              </Badge>

              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-br ${tool.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <tool.icon className="h-6 w-6 text-white" />
              </div>

              <h3 className="font-semibold text-foreground mb-2 group-hover:text-orange-400 transition-colors">
                {tool.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {tool.description}
              </p>

              <div className="flex items-center gap-1 text-sm text-muted-foreground group-hover:text-orange-400 transition-colors">
                <span>Learn more</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
