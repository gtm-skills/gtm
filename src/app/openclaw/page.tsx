import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Search, MessageSquare, Target, Terminal, Zap, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "OpenClaw Skills - Your Agentic Sales Team",
  description:
    "Install Scout, Writer, Rep, and Closer. Four agents that find prospects, craft copy, engage, and close deals 24/7.",
  openGraph: {
    title: "OpenClaw GTM Skills - Agentic Sales Team",
    description: "Scout finds. Rep engages. Closer closes.",
    url: "https://gtm-skills.com/openclaw",
  },
};

export default function OpenClawPage() {
  const agents = [
    {
      id: 'scout',
      name: 'Scout',
      role: 'Research & Intelligence',
      icon: Search,
      color: 'text-blue-400',
      install: 'gtm-skills/scout',
      does: ['Find prospects 24/7', 'Company research', 'Buying signals'],
    },
    {
      id: 'writer',
      name: 'Writer',
      role: 'Sales Copy & Content',
      icon: Zap,
      color: 'text-yellow-400',
      install: 'gtm-skills/writer',
      does: ['Elite cold emails', 'LinkedIn posts', 'Follow-up sequences'],
    },
    {
      id: 'rep',
      name: 'Rep',
      role: 'Outreach & Engagement',
      icon: MessageSquare,
      color: 'text-green-400',
      install: 'gtm-skills/rep',
      does: ['Cold emails', 'Elite voicemails', 'Objection handling'],
    },
    {
      id: 'closer',
      name: 'Closer',
      role: 'Deals & Revenue',
      icon: Target,
      color: 'text-purple-400',
      install: 'gtm-skills/closer',
      does: ['Proposals', 'Negotiations', 'Close deals'],
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-800">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-red-500/10" />
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-4 text-4xl">🦞</div>
            <h1 className="mb-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Your Agentic Sales Team
            </h1>
            <p className="mx-auto mb-8 max-w-xl text-lg text-zinc-400">
              Four agents. Find prospects. Craft copy. Engage. Close deals. 24/7.
            </p>

            <div className="mx-auto max-w-xl rounded-xl border border-orange-500/30 bg-zinc-900 p-5 mb-6">
              <div className="text-sm text-zinc-500 mb-2">Install the full team:</div>
              <code className="block text-lg text-orange-400 font-mono">
                npx clawdhub install gtm-skills/scout gtm-skills/writer gtm-skills/rep gtm-skills/closer
              </code>
            </div>

            <div className="flex items-center justify-center gap-2 text-sm text-zinc-500 flex-wrap">
              <span className="text-blue-400">Scout finds</span>
              <ArrowRight className="w-4 h-4" />
              <span className="text-yellow-400">Writer crafts</span>
              <ArrowRight className="w-4 h-4" />
              <span className="text-green-400">Rep engages</span>
              <ArrowRight className="w-4 h-4" />
              <span className="text-purple-400">Closer closes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Agents Grid */}
      <section className="py-12 border-b border-zinc-800">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {agents.map((agent) => {
              const Icon = agent.icon;
              return (
                <div
                  key={agent.id}
                  className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 hover:border-zinc-700 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-lg bg-zinc-800 ${agent.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{agent.name}</h3>
                      <p className="text-xs text-zinc-500">{agent.role}</p>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {agent.does.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-zinc-400">
                        <Check className={`w-4 h-4 ${agent.color}`} />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <code className="block text-xs text-orange-400 font-mono bg-black/50 rounded px-2 py-1">
                    npx clawdhub install {agent.install}
                  </code>
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/agents"
              className="inline-flex items-center gap-2 rounded-lg bg-orange-500 hover:bg-orange-600 px-6 py-3 text-sm font-medium text-white transition-colors"
            >
              View Full Agent Details
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 border-b border-zinc-800 bg-zinc-900/30">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-xl font-bold text-white text-center">How It Works</h2>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
            <div className="border-b border-zinc-800 bg-zinc-900 px-4 py-2 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-xs text-zinc-500 ml-2">OpenClaw</span>
            </div>
            <div className="p-4 font-mono text-sm space-y-4">
              <div>
                <span className="text-zinc-500">You:</span>{" "}
                <span className="text-white">&quot;Find me Series B SaaS companies hiring SDRs&quot;</span>
              </div>
              <div className="border-l-2 border-blue-500/50 pl-4">
                <div className="text-blue-400 text-xs mb-1">🔍 SCOUT</div>
                <div className="text-zinc-300">
                  Found 10. Top pick: Sarah Chen, VP Sales @ Acme - just raised $25M,
                  hiring 5 SDRs. <span className="text-zinc-500">Want me to brief Rep?</span>
                </div>
              </div>

              <div>
                <span className="text-zinc-500">You:</span>{" "}
                <span className="text-white">&quot;Yes, email her. Challenger tone.&quot;</span>
              </div>
              <div className="border-l-2 border-green-500/50 pl-4">
                <div className="text-green-400 text-xs mb-1">📧 REP</div>
                <div className="text-zinc-300 bg-black/50 rounded p-3 mb-2">
                  <div className="text-zinc-400 text-xs mb-2">Subject: SDR ramp time</div>
                  Sarah - saw you&apos;re hiring 5 SDRs. Quick question: how are you
                  thinking about ramp time as you scale from 80 to 150?
                </div>
                <div className="text-zinc-500 text-sm">
                  Want a voicemail too? Combo gets 2x responses.
                </div>
              </div>

              <div>
                <span className="text-zinc-500">You:</span>{" "}
                <span className="text-white">&quot;She replied - wants a proposal&quot;</span>
              </div>
              <div className="border-l-2 border-purple-500/50 pl-4">
                <div className="text-purple-400 text-xs mb-1">🎯 CLOSER</div>
                <div className="text-zinc-300">
                  Great. Before I write this - who else needs to approve?
                  And what did she say the main pain is?
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* API */}
      <section className="py-12 border-b border-zinc-800">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-xl font-bold text-white text-center">API Endpoints</h2>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
            <p className="text-sm text-zinc-400 mb-4">
              Point your OpenClaw instance or custom framework to:
            </p>
            <div className="space-y-2 font-mono text-sm">
              <div className="flex items-center gap-4 bg-black/50 rounded px-4 py-2">
                <span className="text-zinc-500 w-12">GET</span>
                <code className="text-orange-400">/api/v1/agents</code>
                <span className="text-zinc-600 text-xs ml-auto">All agents</span>
              </div>
              <div className="flex items-center gap-4 bg-black/50 rounded px-4 py-2">
                <span className="text-zinc-500 w-12">GET</span>
                <code className="text-orange-400">/api/v1/agents/scout/skill</code>
                <span className="text-zinc-600 text-xs ml-auto">Scout SKILL.md</span>
              </div>
              <div className="flex items-center gap-4 bg-black/50 rounded px-4 py-2">
                <span className="text-zinc-500 w-12">GET</span>
                <code className="text-orange-400">/api/v1/agents/writer/skill</code>
                <span className="text-zinc-600 text-xs ml-auto">Writer SKILL.md</span>
              </div>
              <div className="flex items-center gap-4 bg-black/50 rounded px-4 py-2">
                <span className="text-zinc-500 w-12">GET</span>
                <code className="text-orange-400">/api/v1/agents/rep/skill</code>
                <span className="text-zinc-600 text-xs ml-auto">Rep SKILL.md</span>
              </div>
              <div className="flex items-center gap-4 bg-black/50 rounded px-4 py-2">
                <span className="text-zinc-500 w-12">GET</span>
                <code className="text-orange-400">/api/v1/agents/closer/skill</code>
                <span className="text-zinc-600 text-xs ml-auto">Closer SKILL.md</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-12 border-b border-zinc-800 bg-zinc-900/30">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-xl font-bold text-white text-center">Agent Resources</h2>

          <div className="grid gap-4 md:grid-cols-3">
            <Link
              href="/voice-templates?category=voicemail"
              className="rounded-lg border border-zinc-800 bg-black p-4 hover:border-zinc-700 transition-colors"
            >
              <div className="text-green-400 text-sm font-semibold mb-1">Rep Uses</div>
              <div className="text-white font-medium">Elite Voicemail Scripts</div>
              <div className="text-zinc-500 text-xs mt-1">12 world-class templates</div>
            </Link>

            <Link
              href="/free-tools/tonalities"
              className="rounded-lg border border-zinc-800 bg-black p-4 hover:border-zinc-700 transition-colors"
            >
              <div className="text-green-400 text-sm font-semibold mb-1">Rep Uses</div>
              <div className="text-white font-medium">24 Tonalities</div>
              <div className="text-zinc-500 text-xs mt-1">From Chris Voss to Blunt</div>
            </Link>

            <Link
              href="/methodology"
              className="rounded-lg border border-zinc-800 bg-black p-4 hover:border-zinc-700 transition-colors"
            >
              <div className="text-purple-400 text-sm font-semibold mb-1">Closer Uses</div>
              <div className="text-white font-medium">Sales Methodologies</div>
              <div className="text-zinc-500 text-xs mt-1">MEDDPICC, Challenger, Gap</div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <div className="rounded-xl border border-orange-500/30 bg-zinc-900 p-6 mb-6">
            <code className="block text-lg text-orange-400 font-mono">
              npx clawdhub install gtm-skills/scout gtm-skills/writer gtm-skills/rep gtm-skills/closer
            </code>
          </div>

          <div className="flex items-center justify-center gap-4">
            <Link
              href="/agents"
              className="inline-flex items-center gap-2 rounded-lg bg-orange-500 hover:bg-orange-600 px-5 py-2.5 text-sm font-medium text-white transition-colors"
            >
              Full Agent Details
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="https://github.com/gtm-skills/gtm/tree/main/openclaw-skills"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-zinc-800 border border-zinc-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-700 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
