import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CopyButton } from '@/components/copy-button';
import { FAQJsonLd, BreadcrumbJsonLd } from '@/components/json-ld';
import {
  ArrowRight,
  ChevronRight,
  Bot,
  Search,
  MessageSquare,
  Zap,
  Filter,
  Send,
  Brain,
  Rocket,
  RefreshCw,
  Users,
  Shield,
  Workflow,
  CheckCircle2,
  Terminal,
  GitBranch,
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI SDR Agents in 2026: The Complete Guide | GTM Skills',
  description: 'What an AI SDR agent actually is, how the decide-act-adapt loop works, and a real multi-agent architecture (research, personalize, execute, qualify, handoff) you can build today.',
  keywords: 'ai sdr agent, ai sdr agents 2026, agentic sdr, ai sales development rep, autonomous sdr agent, ai bdr agent, sales agent architecture, agentic sales',
  openGraph: {
    title: 'AI SDR Agents in 2026: The Complete Guide',
    description: 'A grounded look at AI SDR agents - the decide/act/adapt loop, a real multi-agent architecture, and working config you can copy.',
  },
};

const faqs = [
  {
    question: 'Do I need to code to build an AI SDR agent?',
    answer:
      'No. The floor for building one has dropped to writing good prompts and wiring them to tools. A research-and-personalize agent can run entirely on prompt chains inside Claude, connected to real data through an MCP server like the GTM MCP Server. Coding only becomes necessary once you want scheduled execution (cron-driven agents that wake up on their own, like the OpenClaw fleet) or custom integrations beyond what an MCP server exposes.',
  },
  {
    question: "What's the difference between an AI SDR agent and RPA (robotic process automation)?",
    answer:
      "RPA scripts a fixed sequence of UI clicks or API calls: same steps, same order, every time, and it breaks the moment a screen or field changes. An AI SDR agent decides its next action from context - it reads the research it just gathered and chooses what to say, which channel to use, and whether to escalate to a human, rather than following a hardcoded path. RPA executes a process; an agent reasons about one.",
  },
  {
    question: "What's the difference between an AI SDR agent and a sequencing tool like Outreach or Salesloft?",
    answer:
      'Sequencing tools are excellent at reliably sending a predefined cadence of touches to everyone on a list - same template, same timing, personalization limited to merge fields. An AI SDR agent decides what to say per account based on research it did itself, and can change the plan mid-sequence (skip a step, switch channels, pause) based on how the prospect responds. Most teams end up using both: an agent to research and draft, a sequencer to reliably deliver.',
  },
  {
    question: 'How many agents do I need to build a working AI SDR system?',
    answer:
      "You can start with one agent doing everything, but decomposing by function tends to produce better results because each agent has a narrower job and clearer success criteria. The architecture on this page uses five specialized roles - research, personalization, execution, qualification, and handoff/routing. OpenClaw's production fleet runs five agents (Mission Control, Scout, Writer, Rep, Closer) with a coordinator on top. Three is a reasonable minimum: one to research, one to write, one to send and track.",
  },
  {
    question: 'Can an AI SDR agent replace a human BDR?',
    answer:
      "Not in any system we'd recommend running today. Every architecture described here keeps a human approval point before messages go out and before deals get created in the CRM - the agent proposes, a person approves. The value isn't replacing the rep, it's collapsing the 20-30 minutes of manual research and drafting per account into seconds, so the human spends their time on judgment calls and conversations instead of lookup work.",
  },
  {
    question: 'What tools do I need to run an AI SDR agent in production?',
    answer:
      'At minimum: an LLM (Claude, in the examples here), a way to give it real data access - an MCP server is the standard way to do this now - and somewhere for it to write results (a CRM, a shared file, a spreadsheet). For always-on agents that wake up on a schedule rather than waiting for a chat message, you also need a runtime that can trigger the agent on a cron and give it persistent memory between runs, which is what the OpenClaw fleet architecture provides.',
  },
  {
    question: 'How does an AI SDR agent qualify leads without human review?',
    answer:
      "It typically doesn't skip human review entirely - it filters before the human sees anything. A qualification agent scores inbound or researched leads against explicit ICP criteria (industry fit, company size, tech stack, timing signals) and buckets them into hot/warm/nurture/disqualify, so a rep only reviews the leads worth their time instead of triaging the full raw list. The scoring logic is a prompt you write and can inspect - it isn't a black box.",
  },
];

const breadcrumbItems = [
  { name: 'Home', url: 'https://gtm-skills.com' },
  { name: 'Guides', url: 'https://gtm-skills.com/guides' },
  { name: 'AI SDR Agents Guide', url: 'https://gtm-skills.com/guides/ai-sdr-agents-guide' },
];

const loopStages = [
  {
    icon: Brain,
    title: 'Decide',
    description:
      'The agent reads the current context - account research, prior touches, reply sentiment - and chooses the next action instead of following a fixed script. This is the step that separates an agent from a sequence.',
  },
  {
    icon: Rocket,
    title: 'Act',
    description:
      'It executes that decision through a tool: drafting an email, logging a CRM activity, creating a contact, or queuing a message for human approval. Actions are scoped to specific tools, not open-ended.',
  },
  {
    icon: RefreshCw,
    title: 'Adapt',
    description:
      'It observes the result - opened, replied, bounced, ignored - and feeds that back into the next decision. A prospect who replies with an objection gets a different next step than one who goes quiet.',
  },
];

const workflowStages = [
  {
    step: 1,
    title: 'Research',
    icon: Search,
    agent: 'Research Agent',
    slug: 'research-agent',
    description:
      'Gathers account and contact intelligence before any outreach exists: company overview, recent trigger events, tech stack, org chart, and an ICP fit score. This stage produces the raw material every later stage depends on.',
  },
  {
    step: 2,
    title: 'Personalize',
    icon: MessageSquare,
    agent: 'Personalization Agent',
    slug: 'personalization-agent',
    description:
      'Turns the research brief into 1:1 messaging - opening lines, value props, tone matched to persona and industry. It generates variations rather than a single output, so a human picks the strongest angle.',
  },
  {
    step: 3,
    title: 'Execute',
    icon: Zap,
    agent: 'Execution Agent',
    slug: 'execution-agent',
    description:
      'Decides the next channel and timing for a given prospect based on sequence status and engagement so far, queues the message for approval, and handles the mechanics of sending once approved.',
  },
  {
    step: 4,
    title: 'Qualify',
    icon: Filter,
    agent: 'Qualification Agent',
    slug: 'qualification-agent',
    description:
      'Scores replies and engagement against explicit criteria (BANT, ICP fit, intent signals) to classify a lead as hot, warm, nurture, or disqualify - so the human reviewing it already knows what they are looking at.',
  },
  {
    step: 5,
    title: 'Handoff',
    icon: Send,
    agent: 'Routing Agent',
    slug: 'routing-agent',
    description:
      'Routes the qualified lead to the right rep based on territory, expertise, and current load, writes the handoff summary, and logs everything to the CRM so the human picks up with full context instead of a cold record.',
  },
];

const architectureMapping = [
  { role: 'Mission Control', maps: 'Orchestration', detail: 'Coordinates the fleet, reviews security, decides what runs when.' },
  { role: 'Scout', maps: 'Research', detail: 'Finds accounts, checks signals, builds the research brief.' },
  { role: 'Writer', maps: 'Personalization', detail: 'Turns Scout\'s briefing into drafted copy, ready for review.' },
  { role: 'Rep', maps: 'Execution', detail: 'Sends outreach, tracks replies, works the sequence.' },
  { role: 'Closer', maps: 'Qualify + Handoff', detail: 'Handles proposals and routes won context back to the team.' },
];

const chainPrompt = `You are running an AI SDR chain for a single target account. Work through each stage in order and show your output at each step before moving to the next.

Target: [COMPANY NAME], [DOMAIN]
Persona: [TARGET TITLE, e.g. "VP of Engineering"]
We sell: [YOUR PRODUCT / ONE-LINE PITCH]

STAGE 1 - RESEARCH (use research_company)
Compile: company overview, tech stack signals, most recent trigger event (funding, hiring, product launch), and 2-3 likely pain points for [TARGET TITLE].

STAGE 2 - PERSONALIZE (use draft_cold_email)
Using the research brief, draft 3 cold email variations. Each must reference something specific from Stage 1 - no generic industry language. Under 90 words each.

STAGE 3 - QUALIFY
Score this account 1-100 against our ICP: industry fit, company size, tech stack compatibility, timing signal strength. State the score and the single biggest reason to prioritize or deprioritize this account.

STAGE 4 - HANDOFF (use hubspot_create_contact, then hubspot_log_activity)
If the score is 70+, create the contact in HubSpot and log a note summarizing the research brief and chosen email variation, so a rep can pick this up with full context.

Stop and wait for my approval before sending anything.`;

const mcpConfig = `{
  "mcpServers": {
    "gtm": {
      "command": "node",
      "args": ["./mcp-server/dist/index.js"]
    }
  }
}`;

export default function AISDRAgentsGuidePage() {
  return (
    <div className="py-12 md:py-20">
      <FAQJsonLd questions={faqs} />
      <BreadcrumbJsonLd items={breadcrumbItems} />

      <div className="max-w-4xl mx-auto px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/guides" className="hover:text-foreground transition-colors">
            Guides
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">AI SDR Agents Guide</span>
        </div>

        {/* Hero */}
        <div className="mb-12">
          <Badge variant="outline" className="mb-4 border-cyan-500/30 text-cyan-400">
            <Bot className="h-3 w-3 mr-1" />
            Updated for 2026
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            AI SDR Agents in 2026: The Complete Guide
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Most guides to AI SDR agents describe the concept in the abstract. This one is grounded
            in a system that actually runs: a five-stage agent architecture, a real multi-agent fleet
            with file-based memory, and an MCP server with live CRM tools - all things you can inspect,
            copy, and run today.
          </p>
        </div>

        {/* What is an AI SDR agent */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-4">What an AI SDR Agent Actually Is</h2>
          <div className="prose-content space-y-4 text-muted-foreground">
            <p>
              An AI SDR agent is software that researches a prospect, decides what to say to them, and
              takes action - drafting a message, logging a CRM record, routing a lead - without being told
              the exact steps in advance. The word doing the work in that sentence is <em>decides</em>.
              A traditional automation tool executes a script: step one, then step two, then step three, the
              same way for every prospect. An agent evaluates the situation in front of it and chooses what
              to do next, the same way a person would, just faster and at higher volume.
            </p>
            <p>
              That behavior comes from a loop that repeats for every prospect the agent touches: it{' '}
              <strong className="text-foreground">decides</strong> on a next action based on context, it{' '}
              <strong className="text-foreground">acts</strong> by calling a specific tool, and it{' '}
              <strong className="text-foreground">adapts</strong> based on what happens next. A prospect
              who opens an email three times but doesn&apos;t reply gets treated differently than one who
              replies with an objection, who gets treated differently than one who goes silent for two weeks.
              None of those three paths are hardcoded - they fall out of the agent re-evaluating context at
              each step.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-8">
            {loopStages.map((stage) => (
              <div key={stage.title} className="p-5 rounded-xl border border-border bg-card">
                <stage.icon className="h-6 w-6 text-cyan-400 mb-3" />
                <h3 className="font-semibold mb-2">{stage.title}</h3>
                <p className="text-sm text-muted-foreground">{stage.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Core workflow stages */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-2">The Five-Stage Workflow</h2>
          <p className="text-muted-foreground mb-8">
            In production, an AI SDR agent isn&apos;t one monolithic prompt - it&apos;s a chain of specialized
            stages, each with a narrower job than "do outbound." This is the same decomposition we use across
            the site&apos;s{' '}
            <Link href="/agentic-bdr" className="text-cyan-400 hover:text-cyan-300">
              agentic BDR agent type guides
            </Link>
            .
          </p>
          <div className="space-y-4">
            {workflowStages.map((stage) => (
              <div
                key={stage.step}
                className="flex gap-4 p-6 rounded-xl border border-border bg-card hover:border-cyan-500/30 transition-colors"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold">
                  {stage.step}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <stage.icon className="h-4 w-4 text-cyan-400" />
                    <h3 className="font-semibold">{stage.title}</h3>
                    <Link
                      href={`/agentic-bdr/${stage.slug}`}
                      className="text-xs text-cyan-400 hover:text-cyan-300 ml-auto"
                    >
                      {stage.agent} guide →
                    </Link>
                  </div>
                  <p className="text-sm text-muted-foreground">{stage.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Difference from automation */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">How This Differs From Automation and Sequencing Tools</h2>
          <p className="text-muted-foreground mb-6">
            "AI SDR" gets applied loosely to three different things, and they aren&apos;t interchangeable.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 rounded-xl bg-red-500/5 border border-red-500/20">
              <h3 className="font-semibold text-red-400 mb-3">Sequencing / RPA</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Fixed steps, same order, every prospect</li>
                <li>• Personalization limited to merge fields</li>
                <li>• Breaks when the situation changes</li>
                <li>• No judgment about what to do next</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl bg-green-500/5 border border-green-500/20">
              <h3 className="font-semibold text-green-400 mb-3">AI SDR Agent</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Chooses the next action from context</li>
                <li>• Messaging generated from real research, per account</li>
                <li>• Adapts when a reply, bounce, or delay changes the plan</li>
                <li>• Proposes; a human still approves</li>
              </ul>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            In practice, the two aren&apos;t rivals - most working setups use an agent to research and draft,
            then hand the approved output to a reliable sequencing tool to deliver it on schedule. The agent
            replaces the thinking, not necessarily the sending infrastructure.
          </p>
        </div>

        {/* Architecture example */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <Workflow className="h-6 w-6 text-purple-400" />
            <h2 className="text-2xl font-bold">A Real Architecture: The OpenClaw GTM Fleet</h2>
          </div>
          <p className="text-muted-foreground mb-6">
            The five-stage workflow above isn&apos;t theoretical - it&apos;s how{' '}
            <Link href="/openclaw" className="text-cyan-400 hover:text-cyan-300">
              OpenClaw
            </Link>
            , GTM Skills&apos; own multi-agent fleet, is built. Five agents run on staggered 15-minute
            heartbeats, each with a scoped workspace and a defined role, coordinating through a single
            shared <code className="text-cyan-400">WORKING.md</code> file instead of a database:
          </p>
          <div className="space-y-3 mb-6">
            {architectureMapping.map((row) => (
              <div
                key={row.role}
                className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-4 rounded-lg border border-border bg-card"
              >
                <div className="sm:w-40 flex-shrink-0">
                  <Badge variant="secondary" className="font-mono">{row.role}</Badge>
                </div>
                <div className="sm:w-48 flex-shrink-0 text-sm font-medium text-cyan-400">
                  {row.maps}
                </div>
                <div className="text-sm text-muted-foreground">{row.detail}</div>
              </div>
            ))}
          </div>
          <div className="p-5 rounded-xl border border-border bg-zinc-900">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-white text-sm mb-1">Why files instead of a database</h4>
                <p className="text-sm text-zinc-400">
                  Every agent&apos;s memory - who it is, what it has learned, what&apos;s in flight - lives in
                  plain Markdown files: <code className="text-cyan-400">SOUL.md</code> for personality,{' '}
                  <code className="text-cyan-400">MEMORY.md</code> for learned patterns,{' '}
                  <code className="text-cyan-400">WORKING.md</code> for pipeline state. That makes the whole
                  system human-readable and debuggable - you can open the file and see exactly why an agent
                  did what it did, which matters a lot more once agents are making autonomous decisions
                  about real prospects.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Config / prompt example */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <Terminal className="h-6 w-6 text-green-400" />
            <h2 className="text-2xl font-bold">A Working Example You Can Run</h2>
          </div>
          <p className="text-muted-foreground mb-6">
            You don&apos;t need the full OpenClaw fleet to get the decide/act/adapt loop working. The{' '}
            <Link href="/free-tools/mcp-server" className="text-cyan-400 hover:text-cyan-300">
              GTM MCP Server
            </Link>{' '}
            gives Claude real tools - company research, email drafting, and live HubSpot CRM actions - so a
            single chained prompt can run the research → personalize → qualify → handoff sequence end to end.
          </p>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium">Chained AI SDR Agent Prompt</h3>
              <CopyButton text={chainPrompt} label="ai-sdr-chain-prompt" />
            </div>
            <div className="bg-zinc-900 rounded-lg p-4">
              <pre className="text-sm text-zinc-400 whitespace-pre-wrap font-mono">{chainPrompt}</pre>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium">MCP Server Config (Claude Code)</h3>
              <CopyButton text={mcpConfig} label="ai-sdr-mcp-config" />
            </div>
            <div className="bg-zinc-900 rounded-lg p-4">
              <pre className="text-sm text-zinc-300 whitespace-pre font-mono">{mcpConfig}</pre>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Full install steps, the HubSpot API key setup, and the complete tool list are on the{' '}
              <Link href="/free-tools/mcp-server" className="text-cyan-400 hover:text-cyan-300">
                GTM MCP Server page
              </Link>
              .
            </p>
          </div>
        </div>

        {/* Getting started */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Getting Started</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border">
              <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                <span className="text-cyan-400 font-bold">1</span>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Pick one stage, not the whole system</h4>
                <p className="text-sm text-muted-foreground">
                  Start with the Research Agent alone - it has the clearest inputs and outputs and doesn&apos;t
                  require any send permissions. Get it producing briefs you&apos;d actually use before chaining
                  in personalization.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border">
              <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                <span className="text-cyan-400 font-bold">2</span>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Connect real tools</h4>
                <p className="text-sm text-muted-foreground">
                  Install the{' '}
                  <Link href="/free-tools/mcp-server" className="text-cyan-400 hover:text-cyan-300">
                    GTM MCP Server
                  </Link>{' '}
                  so the agent can actually pull company data and write to your CRM instead of just
                  producing text you copy-paste manually.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border">
              <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                <span className="text-cyan-400 font-bold">3</span>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Add a human checkpoint before anything sends</h4>
                <p className="text-sm text-muted-foreground">
                  Every stage above stops for approval before a message goes out or a CRM record gets
                  created. Keep that checkpoint - it&apos;s what makes the system safe to run before you
                  fully trust it.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border">
              <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                <span className="text-cyan-400 font-bold">4</span>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Move to scheduled agents once the prompts are solid</h4>
                <p className="text-sm text-muted-foreground">
                  Once a chained prompt reliably produces output you&apos;d ship, that&apos;s the point to
                  look at an always-on runtime like{' '}
                  <Link href="/openclaw" className="text-cyan-400 hover:text-cyan-300">
                    OpenClaw
                  </Link>{' '}
                  so the agent wakes up on its own instead of waiting for you to paste a prompt in.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Prompts CTA */}
        <div className="mb-16">
          <div className="bg-zinc-900 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
            <div className="relative">
              <Badge className="mb-4 bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                <GitBranch className="h-3 w-3 mr-1" />
                Ready-to-Use Prompts
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Build Every Stage With Ready-to-Use Prompts
              </h2>
              <p className="text-zinc-400 max-w-xl mx-auto mb-8">
                GTM Skills&apos; prompt library has ready-made prompts for every agent stage in this guide -
                research, personalization, qualification, and routing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/prompts">
                  <Button size="lg" className="h-12 px-8 gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                    <Search className="h-4 w-4" />
                    Browse the Prompt Library
                  </Button>
                </Link>
                <Link href="/agentic-bdr">
                  <Button size="lg" variant="outline" className="h-12 px-8 gap-2">
                    <Bot className="h-4 w-4" />
                    Explore Agent Type Guides
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="p-5 rounded-xl border border-border bg-card">
                <h3 className="font-semibold mb-2 flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>{faq.question}</span>
                </h3>
                <p className="text-sm text-muted-foreground pl-7">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* See it in action */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Users className="h-5 w-5 text-cyan-400" />
            <h2 className="text-2xl md:text-3xl font-bold">Want to See It Running in Production?</h2>
          </div>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Prospeda is built by the same team behind GTM Skills and OpenClaw, applying this
            architecture at scale.
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
