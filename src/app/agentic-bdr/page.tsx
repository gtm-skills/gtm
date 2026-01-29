import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Bot,
  Target,
  MessageSquare,
  BarChart3,
  CheckCircle2,
  Zap,
  Shield,
  Users,
  TrendingUp,
  Clock,
  Brain,
  GitBranch,
  Play,
  Building2,
  Workflow,
} from 'lucide-react';
import type { Metadata } from 'next';
import { agentTypes, industryAgents, workflowAgents } from '@/data/agentic';

export const metadata: Metadata = {
  title: 'Agentic BDR Guide | What is an AI Sales Agent? | GTM Skills',
  description: 'Learn about Agentic BDRs - autonomous AI agents that research accounts, personalize messaging, and execute outbound sequences. The future of B2B sales development.',
  keywords: 'agentic bdr, ai sdr, agentic sales, ai sales agent, automated bdr, autonomous sales, ai outbound, sales automation',
  openGraph: {
    title: 'Agentic BDR Guide | The Future of Sales Development',
    description: 'Autonomous AI agents that research, personalize, and execute outbound sequences with human oversight.',
  },
};

const heroAgentTypes = [
  {
    name: 'Research Agents',
    description: 'Autonomously gather account intelligence, identify buying signals, and build prospect profiles.',
    icon: Target,
    color: 'cyan',
    capabilities: [
      'Pull data from 10-K filings, news, LinkedIn',
      'Identify trigger events (funding, hiring, product launches)',
      'Map org charts and buying committees',
      'Score accounts by fit and timing',
    ],
  },
  {
    name: 'Personalization Agents',
    description: 'Transform research into compelling, 1:1 messaging that resonates with each prospect.',
    icon: MessageSquare,
    color: 'purple',
    capabilities: [
      'Reference specific company context',
      'Match tone to persona and industry',
      'Generate multiple variations to test',
      'Adapt based on engagement signals',
    ],
  },
  {
    name: 'Execution Agents',
    description: 'Orchestrate multi-channel sequences with human approval at key decision points.',
    icon: BarChart3,
    color: 'green',
    capabilities: [
      'Queue messages for human review',
      'Optimize send times per prospect',
      'Handle replies and book meetings',
      'Track engagement and iterate',
    ],
  },
];

const benefits = [
  {
    icon: TrendingUp,
    title: '10x More Personalized Outreach',
    description: 'Every email references real context—no more generic templates that get ignored.',
  },
  {
    icon: Clock,
    title: 'Hours Saved Per Rep Per Day',
    description: 'Research that took 30 minutes per account now happens in seconds.',
  },
  {
    icon: Users,
    title: 'Human-in-the-Loop Control',
    description: 'AI proposes, humans approve. You stay in control of your brand voice.',
  },
  {
    icon: Shield,
    title: 'Consistent Quality at Scale',
    description: 'Your best messaging patterns applied to every prospect, every time.',
  },
];

const buildingBlocks = [
  {
    step: 1,
    title: 'Define Your ICP & Signals',
    description: 'Start by codifying what makes a great prospect. Which trigger events matter? What firmographic data predicts success?',
  },
  {
    step: 2,
    title: 'Build Your Research Pipeline',
    description: 'Connect data sources (LinkedIn, news APIs, 10-K filings) and create prompts that extract relevant insights.',
  },
  {
    step: 3,
    title: 'Create Personalization Templates',
    description: 'Design prompt frameworks that turn research into messaging. Include your best-performing angles and proof points.',
  },
  {
    step: 4,
    title: 'Set Up Human Checkpoints',
    description: 'Decide where humans review: every message? First touch only? Replies? Build approval workflows.',
  },
  {
    step: 5,
    title: 'Measure & Iterate',
    description: 'Track what works. Which research points drive replies? What tone converts? Feed learnings back into your agents.',
  },
];

export default function AgenticBDRPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4 border-cyan-500/30 text-cyan-400">
            <Bot className="h-3 w-3 mr-1" />
            The Future of Outbound
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            What is an{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Agentic BDR
            </span>
            ?
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Autonomous AI agents that research accounts, personalize messaging, and execute
            outbound sequences—with human oversight at every step. Not replacement. Augmentation.
          </p>
        </div>

        {/* Key Distinction */}
        <div className="mb-20">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-6 rounded-xl bg-red-500/5 border border-red-500/20">
              <h3 className="font-semibold text-red-400 mb-3">Traditional Automation</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Static sequences with mail merge</li>
                <li>• Same message to everyone</li>
                <li>• Manual research (or none)</li>
                <li>• Spray and pray mentality</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl bg-green-500/5 border border-green-500/20">
              <h3 className="font-semibold text-green-400 mb-3">Agentic BDR</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Dynamic, context-aware outreach</li>
                <li>• 1:1 personalization at scale</li>
                <li>• Autonomous research per account</li>
                <li>• Quality-first, human-approved</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Agent Types */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The Three Agent Types
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Agentic BDR systems are built from specialized agents, each handling a distinct part of the outbound workflow.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {heroAgentTypes.map((agent) => (
              <div
                key={agent.name}
                className="p-6 rounded-xl bg-card border border-border hover:border-cyan-500/30 transition-colors"
              >
                <div className={`w-12 h-12 rounded-lg bg-${agent.color}-500/10 flex items-center justify-center mb-4`}>
                  <agent.icon className={`h-6 w-6 text-${agent.color}-400`} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{agent.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{agent.description}</p>
                <ul className="space-y-2">
                  {agent.capabilities.map((cap, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-20 py-16 -mx-6 px-6 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 border-y border-border">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Teams Are Adopting Agentic BDRs
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="text-center">
                <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="h-6 w-6 text-cyan-400" />
                </div>
                <h3 className="font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Building Blocks */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-zinc-700 text-zinc-400">
              <GitBranch className="h-3 w-3 mr-1" />
              Implementation Guide
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How to Build Your First Agentic BDR
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              You don't need a massive engineering team. Start with prompts, add tools, and iterate.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {buildingBlocks.map((block) => (
              <div
                key={block.step}
                className="flex gap-6 p-6 rounded-xl bg-card border border-border hover:border-cyan-500/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold flex-shrink-0">
                  {block.step}
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{block.title}</h3>
                  <p className="text-sm text-muted-foreground">{block.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prompts CTA */}
        <div className="mb-20">
          <div className="bg-zinc-900 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

            <div className="relative">
              <Badge className="mb-4 bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                <Zap className="h-3 w-3 mr-1" />
                Ready-to-Use Prompts
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Start Building Your Agentic BDR Today
              </h2>
              <p className="text-zinc-400 max-w-xl mx-auto mb-8">
                Our prompt library includes 100+ prompts specifically designed for agentic workflows—
                research, personalization, and execution.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/workflow">
                  <Button size="lg" className="h-12 px-8 gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                    <Play className="h-4 w-4" />
                    Browse Workflow Prompts
                  </Button>
                </Link>
                <Link href="/free-tools/mcp-server">
                  <Button size="lg" variant="outline" className="h-12 px-8 gap-2">
                    <Brain className="h-4 w-4" />
                    Explore MCP Tools
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Deep Dive: Agent Types */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-cyan-500/30 text-cyan-400">
              <Bot className="h-3 w-3 mr-1" />
              Agent Guides
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Learn to Build Each Agent Type
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Deep-dive guides with ready-to-use prompts for every type of sales agent.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {agentTypes.slice(0, 6).map((agent) => (
              <Link
                key={agent.slug}
                href={`/agentic-bdr/${agent.slug}`}
                className="p-4 rounded-xl border border-border bg-card hover:border-cyan-500/30 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">{agent.shortName}</div>
                    <div className="text-xs text-muted-foreground line-clamp-2">
                      {agent.description.substring(0, 80)}...
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <details className="inline-block text-left">
              <summary className="cursor-pointer text-sm text-cyan-400 hover:text-cyan-300">
                View all {agentTypes.length} agent type guides →
              </summary>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
                {agentTypes.slice(6).map((agent) => (
                  <Link
                    key={agent.slug}
                    href={`/agentic-bdr/${agent.slug}`}
                    className="p-2 text-sm rounded border border-border hover:border-cyan-500/30 transition-colors text-center"
                  >
                    {agent.shortName}
                  </Link>
                ))}
              </div>
            </details>
          </div>
        </div>

        {/* Industry-Specific Agents */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <Building2 className="h-6 w-6 text-blue-400" />
            <h2 className="text-2xl font-bold">Industry-Specific Agents</h2>
            <Badge variant="secondary">{industryAgents.length} Industries</Badge>
          </div>
          <p className="text-muted-foreground mb-6">
            Agents pre-configured with industry knowledge, compliance requirements, and buying patterns.
          </p>
          <div className="grid md:grid-cols-4 gap-3">
            {industryAgents.map((agent) => (
              <Link
                key={agent.slug}
                href={`/agentic-bdr/${agent.slug}`}
                className="p-4 rounded-lg border border-border bg-card hover:border-blue-500/30 transition-colors text-center"
              >
                <div className="font-semibold mb-1">{agent.industry}</div>
                <div className="text-xs text-muted-foreground">{agent.prompts.length} prompts</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Workflow Agents */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <Workflow className="h-6 w-6 text-purple-400" />
            <h2 className="text-2xl font-bold">Workflow-Specific Agents</h2>
            <Badge variant="secondary">{workflowAgents.length} Workflows</Badge>
          </div>
          <p className="text-muted-foreground mb-6">
            Agents optimized for each stage of the sales process.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {workflowAgents.map((agent) => (
              <Link
                key={agent.slug}
                href={`/agentic-bdr/${agent.slug}`}
                className="p-4 rounded-xl border border-border bg-card hover:border-purple-500/30 transition-colors"
              >
                <div className="font-semibold mb-2">{agent.name}</div>
                <div className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {agent.description}
                </div>
                <div className="flex items-center gap-2 text-xs text-purple-400">
                  <span>{agent.prompts.length} prompts</span>
                  <span>•</span>
                  <span>{agent.steps.length} steps</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* See It In Action */}
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Want to See Agentic BDR in Production?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Prospeda is building the infrastructure for agentic sales teams.
            See how these concepts work at scale.
          </p>
          <a href="https://prospeda.com" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="gap-2">
              Visit Prospeda
              <ArrowRight className="h-4 w-4" />
            </Button>
          </a>
          <p className="text-xs text-muted-foreground mt-4">
            Maintained by the team behind GTM Skills
          </p>
        </div>
      </div>
    </div>
  );
}
