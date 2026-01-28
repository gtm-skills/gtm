import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  BookOpen,
  Bot,
  Wrench,
  Zap,
  Clock,
  Star,
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tutorials | Build Agentic Sales Workflows | GTM Skills',
  description: 'Step-by-step tutorials for building agentic SDRs, MCP servers, and automated sales workflows. Learn to build your own AI-powered sales tools.',
  keywords: 'moltbot tutorial, agentic sdr tutorial, mcp server tutorial, ai sales automation, build ai sdr, sales bot tutorial',
};

const tutorials = [
  {
    slug: 'moltbot-agentic-sdr',
    title: 'Build an Agentic SDR with Moltbot',
    description: 'Turn the open-source Moltbot into your personal sales assistant. Research companies, draft emails, and automate follow-ups—all from WhatsApp or Slack.',
    icon: Bot,
    difficulty: 'Beginner',
    time: '30 min',
    tags: ['Moltbot', 'Agentic', 'Open Source'],
    featured: true,
  },
  {
    slug: 'mcp-server-sales',
    title: 'Build a Sales MCP Server for Claude',
    description: 'Create a Model Context Protocol server that gives Claude access to your sales tools, CRM data, and custom prompts.',
    icon: Wrench,
    difficulty: 'Intermediate',
    time: '45 min',
    tags: ['MCP', 'Claude', 'Developer'],
    featured: false,
    comingSoon: true,
  },
  {
    slug: 'clay-research-agent',
    title: 'Automate Account Research with Clay',
    description: 'Build an automated research pipeline that enriches leads with company data, news, and buying signals.',
    icon: Zap,
    difficulty: 'Beginner',
    time: '20 min',
    tags: ['Clay', 'Research', 'Enrichment'],
    featured: false,
    comingSoon: true,
  },
];

export default function TutorialsPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4 border-green-500/30 text-green-400">
            <BookOpen className="h-3 w-3 mr-1" />
            Learn by Building
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Tutorials
          </h1>
          <p className="text-lg text-muted-foreground">
            Step-by-step guides for building agentic sales workflows.
            From DIY bots to production-ready automation.
          </p>
        </div>

        {/* Featured Tutorial */}
        {tutorials.filter(t => t.featured).map((tutorial) => (
          <Link
            key={tutorial.slug}
            href={`/tutorials/${tutorial.slug}`}
            className="block mb-12"
          >
            <div className="relative p-8 rounded-2xl bg-gradient-to-br from-green-500/10 via-cyan-500/5 to-transparent border border-green-500/20 hover:border-green-500/40 transition-colors">
              <Badge className="absolute top-4 right-4 bg-green-500/20 text-green-400 border-green-500/30">
                <Star className="h-3 w-3 mr-1" />
                Featured
              </Badge>
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-16 h-16 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <tutorial.icon className="h-8 w-8 text-green-400" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">{tutorial.title}</h2>
                  <p className="text-muted-foreground mb-4">{tutorial.description}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <span className="flex items-center gap-1 text-green-400">
                      <Clock className="h-4 w-4" />
                      {tutorial.time}
                    </span>
                    <Badge variant="outline">{tutorial.difficulty}</Badge>
                    {tutorial.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <ArrowRight className="h-6 w-6 text-muted-foreground hidden md:block" />
              </div>
            </div>
          </Link>
        ))}

        {/* All Tutorials */}
        <div className="grid md:grid-cols-2 gap-6">
          {tutorials.filter(t => !t.featured).map((tutorial) => (
            <div
              key={tutorial.slug}
              className={`relative p-6 rounded-xl border bg-card ${
                tutorial.comingSoon
                  ? 'border-border opacity-60'
                  : 'border-border hover:border-green-500/30'
              } transition-colors`}
            >
              {tutorial.comingSoon && (
                <Badge className="absolute top-4 right-4 bg-zinc-500/20 text-zinc-400">
                  Coming Soon
                </Badge>
              )}
              <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center mb-4">
                <tutorial.icon className="h-6 w-6 text-zinc-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{tutorial.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{tutorial.description}</p>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {tutorial.time}
                </span>
                <Badge variant="outline" className="text-xs">{tutorial.difficulty}</Badge>
              </div>
              {!tutorial.comingSoon && (
                <Link href={`/tutorials/${tutorial.slug}`}>
                  <Button className="mt-4 w-full" variant="outline">
                    Start Tutorial
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Want a Done-For-You Solution?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            These tutorials show you the DIY approach. Prospeda handles everything—
            research, personalization, and outbound—so you can focus on closing.
          </p>
          <a href="https://prospeda.com" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="gap-2">
              Explore Prospeda
              <ArrowRight className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
