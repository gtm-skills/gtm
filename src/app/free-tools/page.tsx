import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import {
  Mic,
  FileText,
  Calculator,
  Sparkles,
  ArrowRight,
  Bot,
  Terminal,
  Plug,
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free GTM Tools | GTM Skills',
  description: 'Free sales tools, templates, and prompts. Tonality guides, ROI calculators, email templates, and more.',
};

const tools = [
  {
    slug: 'tonalities',
    name: 'GTM Tonalities',
    description: '5 battle-tested writing styles from Jobs, Bezos, Voss, Hemingway & McCarthy',
    icon: 'mic',
    badge: '5 Styles',
    color: 'orange',
  },
  {
    slug: 'claude-integrations',
    name: 'Claude Integrations',
    description: 'Connect Claude to Salesforce, Clay, Slack & more. Build your AI sales stack.',
    icon: 'plug',
    badge: 'New',
    color: 'blue',
  },
  {
    slug: 'mcp-server',
    name: 'GTM MCP Server',
    description: 'Add 10 AI sales tools to Claude Code. Research, outreach, objection handling & more.',
    icon: 'terminal',
    badge: '10 Tools',
    color: 'cyan',
  },
  {
    slug: 'clawdbot',
    name: 'ClawdBot for Slack',
    description: 'Build an AI sales assistant for your Slack workspace powered by Claude',
    icon: 'bot',
    badge: 'Tutorial',
    color: 'purple',
  },
  {
    slug: 'email-templates',
    name: 'Email Templates',
    description: 'Copy-paste cold email templates for every situation',
    icon: 'file-text',
    badge: 'Coming Soon',
    color: 'green',
  },
  {
    slug: 'roi-calculator',
    name: 'ROI Calculator',
    description: 'Calculate the ROI of your sales initiatives',
    icon: 'calculator',
    badge: 'Coming Soon',
    color: 'yellow',
  },
];

const iconMap: Record<string, React.ElementType> = {
  mic: Mic,
  'file-text': FileText,
  calculator: Calculator,
  sparkles: Sparkles,
  bot: Bot,
  terminal: Terminal,
  plug: Plug,
};

const colorMap: Record<string, string> = {
  orange: 'bg-orange-500/10 text-orange-400 group-hover:bg-orange-500/20',
  blue: 'bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20',
  green: 'bg-green-500/10 text-green-400 group-hover:bg-green-500/20',
  purple: 'bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20',
  cyan: 'bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20',
  yellow: 'bg-yellow-500/10 text-yellow-400 group-hover:bg-yellow-500/20',
};

export default function FreeToolsPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-orange-500/30 text-orange-400">
            Free Tools
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            GTM Tools & Resources
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Battle-tested tools to level up your sales game.
            No signup required. Just use them.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {tools.map((tool) => {
            const Icon = iconMap[tool.icon] || Mic;
            const isComingSoon = tool.badge === 'Coming Soon';

            const CardContent = (
              <>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors ${colorMap[tool.color]}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="font-semibold text-foreground group-hover:text-orange-400 transition-colors">
                    {tool.name}
                  </h2>
                  <Badge
                    variant="secondary"
                    className={`text-xs ${isComingSoon ? 'bg-zinc-800 text-zinc-400' : ''}`}
                  >
                    {tool.badge}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {tool.description}
                </p>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
              </>
            );

            if (isComingSoon) {
              return (
                <div
                  key={tool.slug}
                  className="group p-6 rounded-xl border border-border bg-card opacity-60 cursor-not-allowed"
                >
                  {CardContent}
                </div>
              );
            }

            return (
              <Link
                key={tool.slug}
                href={`/free-tools/${tool.slug}`}
                className="group p-6 rounded-xl border border-border bg-card hover:border-orange-500/50 transition-all"
              >
                {CardContent}
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            Love these free tools? Help others discover them.
          </p>
          <a
            href="https://github.com/gtm-skills/gtm"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-400 hover:text-orange-300 font-medium inline-flex items-center gap-2"
          >
            Star on GitHub
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
