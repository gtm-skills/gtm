'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Search,
  MessageSquare,
  Target,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Terminal,
  ArrowRight,
  Mail,
  Zap,
  PenTool,
} from 'lucide-react';

const agents = [
  {
    id: 'scout',
    name: 'Scout',
    role: 'Research & Intelligence',
    email: 'scout@gtm-skills.com',
    icon: Search,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    description: 'Finds prospects, researches companies, spots opportunities others miss.',
    personality: ['Curious', 'Proactive', 'Sharp', 'Opinionated', 'Relentless'],
    capabilities: [
      'Find qualified prospects 24/7',
      'Deep company research',
      'Contact enrichment (Apollo, Clay)',
      'Buying signal detection',
      'ICP scoring & prioritization',
    ],
    resources: [
      { name: 'Industry Prompts', url: '/industry' },
      { name: 'Role Prompts', url: '/role' },
      { name: 'Agentic BDR', url: '/agentic-bdr' },
    ],
    install: 'npx clawdhub install gtm-skills/scout',
    example: `You: "Find me SaaS companies hiring SDRs"
Scout: "On it. What size? What stage? VP level or Director?"

You: "Series B, VP of Sales"
Scout: "Found 10. Top pick is Sarah Chen at Acme - just raised $25M,
       hiring 5 SDRs. Want me to get her email and brief Writer?"`,
  },
  {
    id: 'writer',
    name: 'Writer',
    role: 'Sales Copy & Content',
    email: 'writer@gtm-skills.com',
    icon: PenTool,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/30',
    description: 'Writes elite sales copy. Cold emails that get replies. LinkedIn posts that drive engagement. Follow-ups that convert.',
    personality: ['Sharp', 'Creative', 'Concise', 'Persuasive', 'Proactive'],
    capabilities: [
      'Elite cold email copy',
      'LinkedIn posts & DMs',
      'Follow-up sequences',
      'Subject line optimization',
      'Value prop messaging',
    ],
    resources: [
      { name: '24 Tonalities', url: '/free-tools/tonalities' },
      { name: 'Alex Hormozi Style', url: '/free-tools/tonalities/alex-hormozi' },
      { name: 'Hemingway Style', url: '/free-tools/tonalities/hemingway' },
    ],
    install: 'npx clawdhub install gtm-skills/writer',
    example: `You: "Write a cold email to Sarah - she's hiring SDRs"
Writer: "Got it. What's the angle - ramp time, quota attainment, or turnover?
        And what's your one sentence value prop?"

You: "Ramp time. We cut it in half."
Writer: [Writes email] "Done. Subject line A/B options:
        A: 'SDR ramp time'
        B: '47 days'
        Which one, or want me to try edgier?"`,
  },
  {
    id: 'rep',
    name: 'Rep',
    role: 'Outreach & Engagement',
    email: 'rep@gtm-skills.com',
    icon: MessageSquare,
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
    description: 'Writes emails, voicemails, LinkedIn messages. Handles objections. Never misses a follow-up.',
    personality: ['Direct', 'Creative', 'Persistent', 'Empathetic', 'Proactive'],
    capabilities: [
      'Hyper-personalized cold emails',
      'Elite voicemail scripts (12-18 sec)',
      'LinkedIn connection requests',
      'Objection handling',
      'Multi-touch sequences',
    ],
    resources: [
      { name: '24 Tonalities', url: '/free-tools/tonalities' },
      { name: 'Voice Templates', url: '/voice-templates' },
      { name: 'Voicemail Scripts', url: '/voice-templates?category=voicemail' },
    ],
    install: 'npx clawdhub install gtm-skills/rep',
    example: `You: "Email Sarah - she's hiring SDRs"
Rep: "Got it from Scout. What tone - direct, challenger, blunt?"

You: "Challenger"
Rep: [Writes email] "Ready. Want a voicemail to drop same day?
     Combo gets 2x responses."`,
  },
  {
    id: 'closer',
    name: 'Closer',
    role: 'Deals & Revenue',
    email: 'closer@gtm-skills.com',
    icon: Target,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    description: 'Writes proposals, handles negotiations, revives stalled deals, closes revenue.',
    personality: ['Strategic', 'Direct', 'Perceptive', 'Patient', 'Proactive'],
    capabilities: [
      'Proposal generation',
      'Price objection handling',
      'Competitive positioning',
      'Stalled deal recovery',
      'MEDDPICC qualification',
    ],
    resources: [
      { name: 'Methodologies', url: '/methodology' },
      { name: 'Workflows', url: '/workflow' },
      { name: 'Chris Voss Tonality', url: '/free-tools/tonalities/chris-voss' },
    ],
    install: 'npx clawdhub install gtm-skills/closer',
    example: `You: "She wants a proposal"
Closer: "Great. Before I write this - who else needs to approve?
        And what did she say the main pain is?"

You: "She's the decision maker. Pain is SDR ramp time"
Closer: [Writes proposal] "Done. But before you send - do we know
        the timeline? That affects how I'd position the pricing."`,
  },
];

export default function AgentsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null);

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-orange-500/30 text-orange-400">
            <Zap className="w-3 h-3 mr-1" />
            Agentic Sales Team
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Meet the Team
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Four agents. Your 24/7 sales team. They find prospects, write copy, engage, and close deals.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>The Golden Rule:</strong> Every agent ends responses with a question or suggestion.
            <br />They are teammates, not tools.
          </p>
        </div>

        {/* Install All */}
        <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-6 mb-12">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 text-center md:text-left">
              <h2 className="font-semibold text-lg mb-2">Install the Full Team</h2>
              <p className="text-sm text-muted-foreground">
                Point your OpenClaw instance to GTM Skills and get a complete agentic sales team.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <code className="bg-background/50 rounded-lg px-4 py-2 text-orange-400 font-mono text-sm">
                npx clawdhub install gtm-skills/scout gtm-skills/writer gtm-skills/rep gtm-skills/closer
              </code>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => handleCopy('npx clawdhub install gtm-skills/scout gtm-skills/writer gtm-skills/rep gtm-skills/closer', 'all')}
              >
                {copiedId === 'all' ? (
                  <>
                    <Check className="w-4 h-4 mr-2 text-green-500" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Command
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Flow Diagram */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-4 text-sm flex-wrap justify-center">
            <span className="text-blue-400 font-semibold">Scout finds</span>
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-yellow-400 font-semibold">Writer crafts</span>
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-green-400 font-semibold">Rep engages</span>
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-purple-400 font-semibold">Closer closes</span>
          </div>
        </div>

        {/* Agent Cards */}
        <div className="space-y-6">
          {agents.map((agent) => {
            const Icon = agent.icon;
            const isExpanded = expandedAgent === agent.id;

            return (
              <div
                key={agent.id}
                className={`rounded-xl border ${agent.borderColor} ${agent.bgColor} overflow-hidden`}
              >
                {/* Agent Header */}
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg bg-background/30 ${agent.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h2 className="text-2xl font-bold">{agent.name}</h2>
                        <Badge variant="secondary" className="text-xs">
                          {agent.role}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <Mail className="w-3 h-3" />
                        {agent.email}
                      </div>
                      <p className="text-muted-foreground mb-4">{agent.description}</p>

                      {/* Personality */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {agent.personality.map((trait) => (
                          <span
                            key={trait}
                            className="text-xs bg-background/30 px-2 py-1 rounded"
                          >
                            {trait}
                          </span>
                        ))}
                      </div>

                      {/* Capabilities */}
                      <div className="grid md:grid-cols-2 gap-2 mb-4">
                        {agent.capabilities.map((cap) => (
                          <div key={cap} className="flex items-center gap-2 text-sm">
                            <Check className={`w-4 h-4 ${agent.color}`} />
                            {cap}
                          </div>
                        ))}
                      </div>

                      {/* Install Command */}
                      <div className="flex items-center gap-2 mb-4">
                        <code className="bg-background/50 rounded px-3 py-1.5 text-sm font-mono">
                          {agent.install}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopy(agent.install, agent.id)}
                        >
                          {copiedId === agent.id ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>

                      {/* Resources */}
                      <div className="flex flex-wrap gap-2">
                        {agent.resources.map((res) => (
                          <Link key={res.name} href={res.url}>
                            <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                              {res.name}
                            </Badge>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expand/Collapse Button */}
                <button
                  onClick={() => setExpandedAgent(isExpanded ? null : agent.id)}
                  className="w-full px-6 py-3 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground border-t border-background/20 hover:bg-accent transition-colors"
                >
                  {isExpanded ? (
                    <>
                      <ChevronUp className="w-4 h-4" />
                      Hide Example
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4" />
                      See Example Conversation
                    </>
                  )}
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="px-6 pb-6 border-t border-background/20">
                    <div className="bg-background/30 rounded-lg p-4 mt-4 font-mono text-sm">
                      <pre className="whitespace-pre-wrap text-foreground">{agent.example}</pre>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* API Section */}
        <div className="mt-12 bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Terminal className="w-5 h-5 text-orange-400" />
            <h2 className="text-lg font-semibold">API Access</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Point your OpenClaw instance or custom agent framework to these endpoints:
          </p>
          <div className="space-y-2 font-mono text-sm">
            <div className="flex items-center justify-between bg-secondary/50 rounded px-3 py-2">
              <span className="text-muted-foreground">GET</span>
              <code className="text-orange-400">/api/v1/agents</code>
              <span className="text-muted-foreground text-xs">List all agents</span>
            </div>
            <div className="flex items-center justify-between bg-secondary/50 rounded px-3 py-2">
              <span className="text-muted-foreground">GET</span>
              <code className="text-orange-400">/api/v1/agents/scout/skill</code>
              <span className="text-muted-foreground text-xs">Scout SKILL.md</span>
            </div>
            <div className="flex items-center justify-between bg-secondary/50 rounded px-3 py-2">
              <span className="text-muted-foreground">GET</span>
              <code className="text-orange-400">/api/v1/agents/writer/skill</code>
              <span className="text-muted-foreground text-xs">Writer SKILL.md</span>
            </div>
            <div className="flex items-center justify-between bg-secondary/50 rounded px-3 py-2">
              <span className="text-muted-foreground">GET</span>
              <code className="text-orange-400">/api/v1/agents/rep/skill</code>
              <span className="text-muted-foreground text-xs">Rep SKILL.md</span>
            </div>
            <div className="flex items-center justify-between bg-secondary/50 rounded px-3 py-2">
              <span className="text-muted-foreground">GET</span>
              <code className="text-orange-400">/api/v1/agents/closer/skill</code>
              <span className="text-muted-foreground text-xs">Closer SKILL.md</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link href="/openclaw">
            <Button className="bg-orange-500 hover:bg-orange-600">
              <Terminal className="w-4 h-4 mr-2" />
              OpenClaw Setup Guide
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
