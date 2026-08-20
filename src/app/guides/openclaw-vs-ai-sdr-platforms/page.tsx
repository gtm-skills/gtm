import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  ChevronRight,
  Search,
  MessageSquare,
  Target,
  Zap,
  CheckCircle2,
  XCircle,
  Github,
  DollarSign,
} from 'lucide-react';
import type { Metadata } from 'next';
import { CopyButton } from '@/components/copy-button';
import { FAQJsonLd, BreadcrumbJsonLd } from '@/components/json-ld';

export const metadata: Metadata = {
  title: 'OpenClaw vs. AI SDR Platforms | Open-Source Alternative Guide',
  description:
    'OpenClaw is an open-source, self-hosted multi-agent sales system (Scout, Writer, Rep, Closer). See how it compares to closed-source AI SDR platforms on cost, control, and customization.',
  openGraph: {
    title: 'OpenClaw vs. AI SDR Platforms: An Open-Source Alternative',
    description:
      'Four Claude-powered agents you host and own, versus paid AI SDR SaaS. An honest comparison of tradeoffs.',
    url: 'https://gtm-skills.com/guides/openclaw-vs-ai-sdr-platforms',
  },
};

const agents = [
  {
    id: 'scout',
    name: 'Scout',
    role: 'Research & Intelligence',
    icon: Search,
    color: 'text-blue-400',
    does: 'Finds prospects, researches companies, and flags buying signals - funding events, hiring surges, leadership changes - before handing a briefing to Writer or Rep.',
  },
  {
    id: 'writer',
    name: 'Writer',
    role: 'Sales Copy & Content',
    icon: Zap,
    color: 'text-yellow-400',
    does: 'Drafts cold emails, LinkedIn posts, and multi-touch follow-up sequences using a library of 24 tonalities, from Direct to Challenger to Chris Voss-style negotiation language.',
  },
  {
    id: 'rep',
    name: 'Rep',
    role: 'Outreach & Engagement',
    icon: MessageSquare,
    color: 'text-green-400',
    does: 'Sends outreach, handles objections, and writes call and voicemail scripts. Manages the follow-up cadence and hands qualified interest to Closer.',
  },
  {
    id: 'closer',
    name: 'Closer',
    role: 'Deals & Revenue',
    icon: Target,
    color: 'text-purple-400',
    does: 'Builds proposals, diagnoses stalled deals, handles price objections, and runs a MEDDPICC check before pushing for commitment.',
  },
];

const openClawTradeoffs = [
  { label: 'Cost', detail: 'Infrastructure only - the README puts a 24/7 four-agent deployment at roughly $15-30/month, plus your own Anthropic API usage. No per-seat or per-contact fee.' },
  { label: 'Control', detail: 'Every agent’s personality, playbook, and response format lives in a plain-text SKILL.md file you can read and edit directly.' },
  { label: 'Data', detail: 'Runs on your own server. Prospect data, email drafts, and pipeline state stay in files you control, not a third-party SaaS database.' },
  { label: 'Setup', detail: 'You clone the repo, run the deployment script, and configure your own ANTHROPIC_API_KEY and CRM credentials. There is no onboarding call.' },
  { label: 'Support', detail: 'Community and documentation, not a vendor support line or SLA. If something breaks, you’re the one debugging it.' },
  { label: 'Interface', detail: 'A chat interface (Telegram or Claude Code) plus markdown files as the system of record - not a dashboard with charts and click-to-configure settings.' },
];

const managedPlatformTradeoffs = [
  { label: 'Cost', detail: 'Most AI SDR platforms are closed-source SaaS products with per-seat or usage-based pricing that scales with your team and volume.' },
  { label: 'Control', detail: 'The prompts, scoring logic, and agent behavior are proprietary. You configure within the options the vendor exposes, not the underlying logic itself.' },
  { label: 'Data', detail: 'Prospect and pipeline data lives in the vendor’s hosted infrastructure, governed by their security posture and data retention terms.' },
  { label: 'Setup', detail: 'Typically a guided onboarding with a dedicated CSM, pre-built CRM and data-provider integrations, and a working setup in hours rather than requiring server administration.' },
  { label: 'Support', detail: 'Dedicated support channels, SLAs, and a roadmap you can influence but don’t control - the tradeoff for giving up source-level access.' },
  { label: 'Interface', detail: 'A polished web dashboard built for non-technical revenue teams, with reporting and admin controls out of the box.' },
];

const goodFitFor = [
  'Technical or founder-led teams comfortable running a server and reading a config file',
  'Teams already using Claude Code or similar agent tooling day-to-day',
  'Anyone who wants to read, edit, or fork the actual agent prompts and logic',
  'Cost-sensitive teams where a flat infrastructure bill beats per-seat SaaS pricing',
  'Teams that want prospect and pipeline data to stay on infrastructure they own',
];

const managedFitFor = [
  'Teams without engineering or DevOps capacity to self-host and maintain a system',
  'Revenue orgs that need a dashboard, reporting, and admin controls for non-technical users',
  'Teams that need built-in data enrichment, dialer, or deliverability infrastructure without building it themselves',
  'Organizations that require a vendor SLA, dedicated support, or compliance guarantees (e.g. SOC 2)',
  'Teams that want a working setup in hours, with onboarding support, rather than owning the deployment',
];

const faqs = [
  {
    question: 'What is OpenClaw?',
    answer:
      'OpenClaw is an open-source, self-hosted multi-agent sales system built on Claude. It runs four specialized agents - Scout (research), Writer (copy), Rep (outreach), and Closer (deals) - coordinated by a Mission Control process, each waking on a schedule to do its part of the sales workflow.',
  },
  {
    question: 'Is OpenClaw free?',
    answer:
      'The code is free and MIT-licensed. You pay for the infrastructure you run it on and your own Anthropic API usage - the project README estimates roughly $15-30/month for a 24/7 four-agent deployment, which is materially different from the per-seat or usage-based pricing common at closed-source AI SDR platforms.',
  },
  {
    question: 'How is OpenClaw different from AI SDR platforms like Warmly, Artisan, or 11x?',
    answer:
      'The biggest difference is where the code and data live. OpenClaw is open source and self-hosted, so you can read and edit every agent’s prompt and logic and your data stays on your own infrastructure. Most AI SDR platforms in that category are closed-source SaaS products - you get a managed dashboard, vendor support, and pre-built integrations, but you configure within their product rather than the underlying system.',
  },
  {
    question: 'Do I need to know how to code to run OpenClaw?',
    answer:
      'You don’t need to write code, but you do need to be comfortable with a terminal - cloning a repo, running a deployment script, and setting environment variables like your Anthropic and CRM API keys. There’s no guided web onboarding the way there is with a managed SaaS platform.',
  },
  {
    question: 'What powers OpenClaw’s agents?',
    answer:
      'Each agent is a Claude-powered persona defined in a SKILL.md file - a system prompt that sets its personality, response format, and playbook. Memory and pipeline state are kept in plain markdown files (MEMORY.md, WORKING.md, PROGRESS.md) rather than a database, which keeps the whole system inspectable.',
  },
  {
    question: 'Can I customize how the agents behave?',
    answer:
      'Yes - that’s the core tradeoff OpenClaw makes. Because each agent’s behavior is a readable text file, you can change its tone, response format, or golden rules directly, without waiting on a vendor roadmap or a configuration option that may not exist.',
  },
];

export default function OpenClawVsAiSdrPlatformsPage() {
  const installCommand =
    'npx clawdhub install gtm-skills/scout gtm-skills/writer gtm-skills/rep gtm-skills/closer';

  return (
    <div className="py-12 md:py-20">
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
          <span className="text-foreground">OpenClaw vs. AI SDR Platforms</span>
        </div>

        {/* Hero */}
        <div className="mb-12">
          <Badge variant="outline" className="mb-4 border-orange-500/30 text-orange-400">
            Guide
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            OpenClaw vs. AI SDR Platforms: An Open-Source Alternative
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            OpenClaw is a free, self-hosted multi-agent sales system built on Claude. Most AI SDR
            platforms on the market today are closed-source SaaS products. Here&apos;s an honest
            look at what each approach actually gets you.
          </p>
        </div>

        {/* TL;DR */}
        <div className="mb-16 p-6 rounded-xl bg-orange-500/10 border border-orange-500/20">
          <h3 className="font-semibold text-orange-400 mb-2">The short version</h3>
          <p className="text-sm text-muted-foreground">
            OpenClaw trades convenience for control: it&apos;s open source, runs on infrastructure
            you own, and costs roughly $15-30/month plus API usage - but you set it up and maintain
            it yourself. Most AI SDR platforms trade control for convenience: a managed dashboard,
            dedicated support, and pre-built integrations, paid for with a per-seat or usage-based
            subscription and less visibility into how the system actually works. Neither is
            objectively better - they fit different teams.
          </p>
        </div>

        {/* What OpenClaw Actually Is */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-4">What OpenClaw Actually Is</h2>
          <p className="text-muted-foreground mb-6">
            OpenClaw isn&apos;t a single AI assistant with a sales skin on it. It&apos;s a fleet of
            four specialized Claude-powered agents - Scout, Writer, Rep, and Closer - each with its
            own personality, playbook, and response format, coordinated by a Mission Control process.
            Agents wake on a staggered schedule (every 15 minutes in the reference deployment),
            check for work, hand off context through a shared file, and go back to sleep. There&apos;s
            no database - memory and pipeline state live in plain markdown files you can open and
            read yourself.
          </p>
          <div className="space-y-4 mb-6">
            {agents.map((agent) => (
              <div key={agent.id} className="p-6 rounded-xl border border-border bg-card">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                    <agent.icon className={`h-5 w-5 ${agent.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{agent.name}</h3>
                      <span className="text-xs text-muted-foreground">{agent.role}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{agent.does}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground mb-4">
            Each agent operates on one rule baked into its SKILL.md: never end a response without a
            question or a suggested next step. Scout doesn&apos;t just dump a prospect list - it asks
            which one to brief Rep on. Closer doesn&apos;t just draft a proposal - it asks who else
            needs to approve it. The agents are built to behave like proactive teammates handing work
            to each other, not like a form you fill out and a report that comes back.
          </p>
          <div className="p-4 rounded-lg bg-card flex flex-col sm:flex-row sm:items-center gap-4">
            <code className="text-sm text-orange-400 font-mono flex-1 break-all">
              {installCommand}
            </code>
            <CopyButton text={installCommand} label="openclaw_install_command" />
          </div>
        </div>

        {/* Open-source vs closed-source SaaS */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-4">The Open-Source vs. Closed-Source Tradeoff</h2>
          <p className="text-muted-foreground mb-6">
            The real difference between OpenClaw and the broader category of AI SDR platforms isn&apos;t
            which one &quot;works better&quot; in the abstract - it&apos;s where the code and the data
            live, and what you&apos;re responsible for as a result. Most AI SDR platforms are closed-source
            SaaS products with per-seat or usage-based pricing: you get a managed dashboard, vendor
            support, and integrations that work out of the box, in exchange for running your workflow
            inside a system you can configure but not see into. OpenClaw goes the other direction -
            everything is visible and editable, but everything is also your responsibility.
          </p>

          <div className="grid gap-6 md:grid-cols-2 mb-4">
            <div className="p-6 rounded-xl border border-border bg-card">
              <div className="flex items-center gap-2 mb-4">
                <Github className="h-5 w-5 text-orange-400" />
                <h3 className="font-semibold">OpenClaw (open source, self-hosted)</h3>
              </div>
              <ul className="space-y-3">
                {openClawTradeoffs.map((row) => (
                  <li key={row.label} className="text-sm">
                    <span className="font-medium text-foreground">{row.label}: </span>
                    <span className="text-muted-foreground">{row.detail}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="h-5 w-5 text-blue-400" />
                <h3 className="font-semibold">Managed AI SDR platforms (closed source, SaaS)</h3>
              </div>
              <ul className="space-y-3">
                {managedPlatformTradeoffs.map((row) => (
                  <li key={row.label} className="text-sm">
                    <span className="font-medium text-foreground">{row.label}: </span>
                    <span className="text-muted-foreground">{row.detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Neither list is a strike against the other approach. A closed-source dashboard with a
            support line is genuinely the right call for a lot of teams. Full source access with a
            terminal-based setup is the right call for others. The question is which set of tradeoffs
            matches how your team actually operates.
          </p>
        </div>

        {/* Who it's for */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Who Should Use Which</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="p-6 rounded-xl border border-border bg-card">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
                <h3 className="font-semibold">OpenClaw is a good fit for you if...</h3>
              </div>
              <ul className="space-y-2">
                {goodFitFor.map((item) => (
                  <li key={item} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <div className="flex items-center gap-2 mb-4">
                <XCircle className="h-5 w-5 text-muted-foreground" />
                <h3 className="font-semibold">A managed platform is a better fit if...</h3>
              </div>
              <ul className="space-y-2">
                {managedFitFor.map((item) => (
                  <li key={item} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-muted-foreground mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="p-6 rounded-xl border border-border bg-card">
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center p-8 rounded-xl bg-card">
          <h2 className="text-2xl font-bold text-foreground mb-4">See OpenClaw&apos;s Agent Roster</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Read the full SOUL and playbook for each agent, or explore how OpenClaw fits into a
            broader agentic BDR motion.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/openclaw">
              <Button className="brand-gradient">
                Explore OpenClaw
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link
              href="/agents"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Full Agent Details
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/agentic-bdr"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Agentic BDR Guide
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      <FAQJsonLd questions={faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://gtm-skills.com' },
          { name: 'Guides', url: 'https://gtm-skills.com/guides' },
          {
            name: 'OpenClaw vs. AI SDR Platforms',
            url: 'https://gtm-skills.com/guides/openclaw-vs-ai-sdr-platforms',
          },
        ]}
      />
    </div>
  );
}
