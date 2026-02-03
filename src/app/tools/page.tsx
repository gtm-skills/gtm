/**
 * Tools Hub Page
 * Central page for all GTM Skills tools and integrations
 */

import Link from 'next/link';
import { ArrowRight, Globe, Mic, Link2, Code, Bot, Zap, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const metadata = {
  title: 'Tools & Integrations | GTM Skills',
  description: 'Browser extension, voice templates, CRM integrations, and API access. GTM Skills everywhere you work.',
};

const tools = [
  {
    title: 'Browser Extension',
    description: 'Get contextual prompts directly in LinkedIn and Gmail. One click to copy, customize, and send personalized messages.',
    href: '/download',
    icon: Globe,
    gradient: 'from-blue-500 to-cyan-500',
    badge: 'Chrome',
    features: ['LinkedIn profile context', 'Gmail compose integration', 'One-click copy', 'Customizable templates'],
  },
  {
    title: 'Voice Templates',
    description: 'Deploy agentic voice calls with pre-built scripts. MEDDPICC discovery, cold calls, objection handling, and more.',
    href: '/voice-templates',
    icon: Mic,
    gradient: 'from-violet-500 to-purple-500',
    badge: 'Vapi',
    features: ['10 battle-tested scripts', 'Vapi-ready deployment', 'Customizable variables', 'Follow-up sequences'],
  },
  {
    title: 'HubSpot Integration',
    description: 'Get context-aware prompts based on deal stage, contact role, and pipeline data. Prompts that match your workflow.',
    href: '/integrations/hubspot',
    icon: Link2,
    gradient: 'from-teal-500 to-cyan-500',
    badge: 'CRM',
    features: ['Deal stage awareness', 'Contact role detection', 'Pipeline integration', 'One-click install'],
  },
  {
    title: 'REST API',
    description: 'Build custom integrations with full API access. llms.txt for agentic discovery, OpenAPI spec included.',
    href: '/developers',
    icon: Code,
    gradient: 'from-emerald-500 to-teal-500',
    badge: 'v1',
    features: ['Full prompt access', 'Recommendation engine', 'llms.txt for agents', 'OpenAPI spec'],
  },
];

const comingSoon = [
  { name: 'Salesforce Plugin', icon: Link2, description: 'Native AppExchange integration' },
  { name: 'Slack Bot', icon: Bot, description: 'Team prompt sharing' },
  { name: 'Pipedrive', icon: Link2, description: 'CRM integration' },
  { name: 'Apollo.io', icon: Zap, description: 'Prospecting integration' },
];

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-black">
      {/* Hero */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 border-blue-500/30 text-blue-400">
              <Zap className="h-3 w-3 mr-1" />
              Tools & Integrations
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              GTM Skills Everywhere You Work
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Access prompts in your browser, CRM, voice calls, or build custom integrations with our API.
            </p>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-12 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-6">
            {tools.map((tool) => (
              <div
                key={tool.title}
                className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${tool.gradient} flex items-center justify-center`}
                  >
                    <tool.icon className="h-6 w-6 text-white" />
                  </div>
                  <Badge className="bg-zinc-800 text-zinc-400 border-zinc-700">
                    {tool.badge}
                  </Badge>
                </div>

                <h2 className="text-xl font-semibold text-white mb-2">{tool.title}</h2>
                <p className="text-zinc-400 text-sm mb-4">{tool.description}</p>

                <div className="grid grid-cols-2 gap-2 mb-6">
                  {tool.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-xs text-zinc-500">
                      <div className="w-1 h-1 rounded-full bg-zinc-600" />
                      {feature}
                    </div>
                  ))}
                </div>

                <Link href={tool.href}>
                  <Button className="w-full gap-2">
                    Learn More
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-16 border-t border-zinc-800 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <Badge variant="outline" className="mb-4 border-zinc-700 text-zinc-400">
              <Clock className="h-3 w-3 mr-1" />
              Coming Soon
            </Badge>
            <h2 className="text-2xl font-bold">More Integrations on the Way</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {comingSoon.map((item) => (
              <div
                key={item.name}
                className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 text-center"
              >
                <item.icon className="h-6 w-6 text-zinc-600 mx-auto mb-2" />
                <div className="text-sm font-medium text-zinc-400">{item.name}</div>
                <div className="text-xs text-zinc-600">{item.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Can't Find What You Need?</h2>
          <p className="text-muted-foreground mb-6">
            Build your own integration with our REST API, or request a new tool.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/developers">
              <Button variant="outline" className="gap-2">
                <Code className="h-4 w-4" />
                View API Docs
              </Button>
            </Link>
            <a href="https://github.com/gtm-skills/gtm/issues" target="_blank" rel="noopener noreferrer">
              <Button className="gap-2">
                Request Integration
                <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
