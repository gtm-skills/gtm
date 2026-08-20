import Link from 'next/link';
import { CopyButton } from '@/components/copy-button';
import { FAQJsonLd, BreadcrumbJsonLd } from '@/components/json-ld';
import {
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  Users,
  Bot,
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI SDR Agent vs. Traditional SDR: What Actually Changes | GTM Skills',
  description:
    'A grounded comparison of AI SDR agents and traditional human SDRs: research approach, personalization depth, speed, cost, and where humans still matter — with real prompts and workflows.',
  keywords:
    'ai sdr agent, ai sdr vs human sdr, agentic sdr, ai sales development rep, traditional sdr, ai bdr agent',
  openGraph: {
    title: 'AI SDR Agent vs. Traditional SDR: What Actually Changes',
    description:
      'A grounded, non-hyped comparison of AI SDR agents and human SDRs — with real prompts, real workflows, and honest limitations.',
  },
};

const faqs = [
  {
    question: 'Does an AI SDR agent replace a traditional SDR entirely?',
    answer:
      'Rarely, and not yet cleanly. AI SDR agents are strongest at the repeatable parts of the job — research, first-draft personalization, sequence logistics, CRM hygiene. Multi-threaded deals, live objection handling, and building trust with a skeptical VP still benefit from a human on the account. Most teams that adopt agentic workflows end up with fewer, more senior SDRs supervising agents rather than zero SDRs.',
  },
  {
    question: "What's the actual speed difference between an AI SDR agent and a human SDR?",
    answer:
      'The gap is largest in research and drafting, not in judgment. A human SDR might spend 15-30 minutes researching one account before writing an email. An agent running a structured research prompt can produce a comparable brief in under a minute, and can run that same prompt across hundreds of accounts in parallel. Reviewing, approving, and actually building the relationship still takes human time — the agent compresses the prep work, not the trust-building.',
  },
  {
    question: 'How much does an AI SDR agent cost compared to hiring an SDR?',
    answer:
      "It depends entirely on what you're comparing. A fully loaded human SDR in the US typically costs well into six figures a year including salary, tools, and management overhead. An agentic workflow built on a model API plus data sources costs a fraction of that in raw compute, but it isn't free — you still pay for the LLM calls, the enrichment/data APIs the agent depends on, and the engineering or ops time to build and maintain the pipeline. The honest comparison is cost-per-qualified-conversation, not headcount vs. subscription.",
  },
  {
    question: 'Can an AI SDR agent handle personalized outreach as well as a human?',
    answer:
      "For the first layer of personalization — referencing a real trigger event, a specific pain point, or something in a prospect's public activity — a well-prompted agent can match or beat an average human rep, mostly because it never gets lazy on account #40 of the day. Where it still falls short is reading nuance: sarcasm, internal politics, or a relationship history the CRM doesn't capture. That's why a human review step before send still matters.",
  },
  {
    question: 'What tasks should stay with a human SDR?',
    answer:
      'Live conversations (calls, video, in-person), navigating internal politics at a target account, negotiating next steps with a skeptical stakeholder, and any judgment call where being wrong is costly — like deciding whether to push on a signal that might actually be a false positive. Agents are good at surfacing options and drafts; humans are still better at deciding which one to act on when the stakes are high.',
  },
  {
    question: 'How do I start using AI SDR agents without replacing my whole team?',
    answer:
      'Start with one stage of the funnel, not the whole motion. Pick account research or first-draft personalization — the two places where agents save the most time with the least risk — and run it alongside your existing process for a few weeks. Keep a human review step before anything sends. GTM Skills\' prompt library has ready-to-use prompts for exactly this on the /role/sdr and /agentic-bdr pages, so you can test the workflow before building or buying anything.',
  },
];

const comparisonRows = [
  {
    dimension: 'Research approach',
    traditional: 'Manual: LinkedIn, company site, Google News, maybe Crunchbase — one tab at a time, ~15-30 min per account.',
    agentic: 'Structured prompt run against the same sources, producing a consistent brief in under a minute — but only as good as the data fed into it.',
  },
  {
    dimension: 'Personalization depth',
    traditional: 'Deep when the rep is engaged and has time; inconsistent under quota pressure — the first 10 accounts of the day often get more care than the last 10.',
    agentic: 'Consistent depth across every account since it doesn\'t fatigue, but pattern-matches on the inputs it\'s given rather than genuinely understanding context.',
  },
  {
    dimension: 'Speed & volume',
    traditional: 'A strong SDR might meaningfully research and personalize outreach for 20-40 accounts a day.',
    agentic: 'Can draft research briefs and first-pass messaging for hundreds of accounts in the same window — the bottleneck shifts to review and sending capacity.',
  },
  {
    dimension: 'Cost model',
    traditional: 'Fixed cost: salary, commission, benefits, management time — regardless of pipeline generated that week.',
    agentic: 'Variable cost: API calls, data enrichment, and infrastructure — scales with usage, but requires upfront build or tooling investment.',
  },
  {
    dimension: 'Where humans still matter',
    traditional: 'Everything — calls, objection handling, reading the room, building the relationship.',
    agentic: 'Live conversation, judgment calls on ambiguous signals, final review before anything goes out, and any account where the political stakes are high.',
  },
];

const traditionalSteps = [
  {
    title: 'Build or receive a target list',
    detail: 'Pull accounts from a CRM view, marketing MQLs, or a manually built list based on ICP notes shared in a team meeting.',
  },
  {
    title: 'Research each account by hand',
    detail: 'Open LinkedIn, the company website, and a news search. Skim for anything recent — funding, hiring, leadership changes. Takes 15-30 minutes per account if done properly, less if the rep is behind on activity metrics.',
  },
  {
    title: 'Draft outreach from memory or a template',
    detail: 'Start from a sequence template in Outreach or Salesloft, then hand-edit the first line or two with whatever was found in research. Quality depends heavily on time available and how many accounts are left in the queue that day.',
  },
  {
    title: 'Load into a sequence and monitor',
    detail: 'Queue the email/call/LinkedIn steps in the sales engagement platform, then manually track replies, update the CRM, and decide what to do with each response as it comes in.',
  },
  {
    title: 'Follow up and re-prioritize',
    detail: 'Revisit cold accounts, adjust messaging that isn\'t landing, and re-rank the list based on gut feel and whatever CRM activity is visible.',
  },
];

const agenticSteps = [
  {
    title: 'An agent scores and ranks accounts against ICP criteria',
    detail: 'Instead of a rep eyeballing a list, a Research Agent prompt applies a defined scoring model (industry fit, size, tech stack, timing signals) consistently across every account, so prioritization isn\'t left to whoever has time that morning.',
  },
  {
    title: 'A Research Agent compiles a structured brief per account',
    detail: 'The same research a human would do by hand — company overview, recent news, tech stack, key people, trigger events — gets compiled into a consistent format the agent (or a rep) can act on immediately.',
  },
  {
    title: 'A Personalization Agent drafts the first line and message',
    detail: 'The research brief feeds directly into message drafting, so the opening line references something real about the account rather than a generic industry observation.',
  },
  {
    title: 'An Outreach Agent assembles the multi-channel sequence',
    detail: 'Email, LinkedIn, and call touches get sequenced with channel-appropriate messaging, drafted in one pass rather than pieced together manually across tools.',
  },
  {
    title: 'A human reviews and approves before anything sends',
    detail: 'This is the step teams skip at their own risk. The agent produces drafts, not final copy — a rep or manager still checks tone, accuracy, and whether the trigger the agent found is actually real before it goes to a prospect.',
  },
];

export default function AiSdrAgentVsTraditionalSdrPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://gtm-skills.com' },
          { name: 'Guides', url: 'https://gtm-skills.com/guides' },
          {
            name: 'AI SDR Agent vs. Traditional SDR',
            url: 'https://gtm-skills.com/guides/ai-sdr-agent-vs-traditional-sdr',
          },
        ]}
      />
      <FAQJsonLd questions={faqs} />

      <div className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/guides" className="hover:text-foreground transition-colors">
              Guides
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">AI SDR Agent vs. Traditional SDR</span>
          </div>

          {/* Hero */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              AI SDR Agent vs. Traditional SDR: What Actually Changes
            </h1>
            <p className="text-xl text-muted-foreground">
              &quot;AI SDR&quot; has become a catch-all marketing term. This guide skips the hype and
              compares the two models on the dimensions that actually matter — research approach,
              personalization depth, speed, cost, and where a human is still required — using real
              prompts and workflows instead of abstract claims.
            </p>
          </div>

          {/* Intro */}
          <div className="mb-16 space-y-4 text-muted-foreground leading-relaxed">
            <p>
              A traditional SDR (sales development rep) is a human who researches accounts, writes
              outreach, runs sequences, and books meetings — one account, one email, one call at a
              time. An AI SDR agent does a version of the same job using large language model
              prompts, often chained together: one prompt researches an account, another drafts
              personalized messaging, another sequences the outreach. The work is conceptually
              similar. What changes is consistency, speed, and cost structure — not judgment.
            </p>
            <p>
              This isn&apos;t a &quot;AI is replacing SDRs&quot; piece. It&apos;s a breakdown of which parts of the
              SDR job an agent handles well today, which parts it doesn&apos;t, and what a real
              agentic workflow looks like using the prompt library and agent patterns in{' '}
              <Link href="/agentic-bdr" className="text-yellow-400 hover:text-yellow-300">
                GTM Skills&apos; Agentic BDR guide
              </Link>{' '}
              and the{' '}
              <Link href="/role/sdr" className="text-yellow-400 hover:text-yellow-300">
                SDR role prompt pack
              </Link>
              .
            </p>
          </div>

          {/* Comparison table */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">The Comparison at a Glance</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground w-1/6">
                      Dimension
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground w-5/12">
                      Traditional SDR
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground w-5/12">
                      AI SDR Agent
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.dimension} className="border-b border-border/50 align-top">
                      <td className="py-4 px-4 font-medium">{row.dimension}</td>
                      <td className="py-4 px-4 text-muted-foreground">{row.traditional}</td>
                      <td className="py-4 px-4 text-muted-foreground">{row.agentic}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Workflow walkthrough */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-2">Two Workflows, Side by Side</h2>
            <p className="text-muted-foreground mb-8">
              The clearest way to see the difference isn&apos;t a feature list — it&apos;s watching the
              same job get done two different ways.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Traditional */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold text-lg">Traditional SDR Workflow</h3>
                </div>
                <div className="space-y-4">
                  {traditionalSteps.map((step, i) => (
                    <div key={step.title} className="p-4 rounded-lg border border-border bg-card">
                      <p className="text-xs text-muted-foreground mb-1">Step {i + 1}</p>
                      <h4 className="font-medium mb-1">{step.title}</h4>
                      <p className="text-sm text-muted-foreground">{step.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Agentic */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Bot className="h-5 w-5 text-yellow-400" />
                  <h3 className="font-semibold text-lg">Agentic SDR Workflow</h3>
                </div>
                <div className="space-y-4">
                  {agenticSteps.map((step, i) => (
                    <div key={step.title} className="p-4 rounded-lg border border-border bg-card">
                      <p className="text-xs text-muted-foreground mb-1">Step {i + 1}</p>
                      <h4 className="font-medium mb-1">{step.title}</h4>
                      <p className="text-sm text-muted-foreground">{step.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Real prompts */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-2">What the Agentic Steps Actually Look Like</h2>
            <p className="text-muted-foreground mb-8">
              These are real prompts from GTM Skills&apos; own{' '}
              <Link href="/agentic-bdr" className="text-yellow-400 hover:text-yellow-300">
                agentic BDR library
              </Link>{' '}
              — not illustrative examples. Each maps to a step in the agentic workflow above and
              can be run directly in Claude or chained together with tool use.
            </p>

            <div className="space-y-6">
              <div className="p-6 rounded-xl border border-border bg-card">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-semibold mb-1">Research Agent — Account Brief</h3>
                    <p className="text-sm text-muted-foreground">
                      Replaces the manual LinkedIn/news/site research step with a structured prompt.
                    </p>
                  </div>
                  <CopyButton
                    text={`You are a Research Agent for B2B sales. Given a company name and domain, compile a research brief.

Company: [COMPANY NAME]
Domain: [DOMAIN]

Research the following:
1. **Company Overview**: What they do, market position, company size
2. **Recent News**: Last 90 days - funding, product launches, executive changes, press
3. **Technology Stack**: Tools they use (check job postings, BuiltWith, etc.)
4. **Key People**: Decision makers in [TARGET DEPARTMENT]
5. **Trigger Events**: Any signals indicating buying intent

Output a structured research brief I can use for personalized outreach.`}
                    label="research-agent-brief"
                  />
                </div>
                <div className="bg-card rounded-lg p-4 font-mono text-xs overflow-x-auto">
                  <pre className="text-muted-foreground whitespace-pre-wrap">
{`You are a Research Agent for B2B sales. Given a company name
and domain, compile a research brief.

1. Company Overview  2. Recent News (last 90 days)
3. Technology Stack   4. Key People  5. Trigger Events

Output a structured research brief for personalized outreach.`}
                  </pre>
                </div>
              </div>

              <div className="p-6 rounded-xl border border-border bg-card">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-semibold mb-1">Personalization Agent — Opening Line</h3>
                    <p className="text-sm text-muted-foreground">
                      Turns the research brief above into a specific, non-generic first line.
                    </p>
                  </div>
                  <CopyButton
                    text={`You are a Personalization Agent. Transform this research into a cold email opening line.

Research:
- Company: [NAME]
- Prospect: [NAME], [TITLE]
- Recent trigger: [TRIGGER EVENT]
- Their challenge: [PAIN POINT]

Rules:
- Reference something specific about THEM (not generic industry stuff)
- Under 20 words
- No flattery or "I noticed..."
- Create curiosity or resonate with their situation

Generate 3 variations with different angles.`}
                    label="personalization-agent-opening"
                  />
                </div>
                <div className="bg-card rounded-lg p-4 font-mono text-xs overflow-x-auto">
                  <pre className="text-muted-foreground whitespace-pre-wrap">
{`You are a Personalization Agent. Transform this research into
a cold email opening line.

Rules: reference something specific about THEM, under 20 words,
no flattery, create curiosity. Generate 3 variations.`}
                  </pre>
                </div>
              </div>

              <div className="p-6 rounded-xl border border-border bg-card">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-semibold mb-1">Outreach Agent — Multi-Channel Sequence</h3>
                    <p className="text-sm text-muted-foreground">
                      Sequences email, LinkedIn, and call touches into a single plan.
                    </p>
                  </div>
                  <CopyButton
                    text={`Design a multi-channel sequence for this prospect:

Prospect: [NAME], [TITLE] at [COMPANY]
Channel preferences: [WHAT WE KNOW]
Urgency: [HIGH/MEDIUM/LOW]

Create a 2-week sequence:
- Day 1: [CHANNEL + MESSAGE BRIEF]
- Day 3: [CHANNEL + MESSAGE BRIEF]
- Day 5: [CHANNEL + MESSAGE BRIEF]
- Day 8: [CHANNEL + MESSAGE BRIEF]
- Day 12: [CHANNEL + MESSAGE BRIEF]

Include subject lines for emails and connection note for LinkedIn.`}
                    label="outreach-agent-sequence"
                  />
                </div>
                <div className="bg-card rounded-lg p-4 font-mono text-xs overflow-x-auto">
                  <pre className="text-muted-foreground whitespace-pre-wrap">
{`Design a multi-channel sequence for this prospect across a
2-week window: Day 1, 3, 5, 8, 12 - channel + message brief
for each, with subject lines and a LinkedIn connection note.`}
                  </pre>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mt-6">
              The full set — including Qualification, Enrichment, Routing, and Follow-up agents —
              is in the{' '}
              <Link href="/prompts" className="text-yellow-400 hover:text-yellow-300">
                GTM Skills prompt library
              </Link>
              .
            </p>
          </div>

          {/* Limitations */}
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
              <h2 className="text-2xl font-bold">Where AI SDR Agents Still Fall Short</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              Credibility matters more than enthusiasm here, so it&apos;s worth being direct about
              what these prompts and workflows don&apos;t solve on their own.
            </p>
            <div className="space-y-4">
              <div className="p-5 rounded-lg border border-border bg-card">
                <h3 className="font-semibold mb-1">The agent doesn&apos;t have data unless you give it data</h3>
                <p className="text-sm text-muted-foreground">
                  A Research Agent prompt describes what to look for — it doesn&apos;t browse LinkedIn
                  or pull a live news feed by itself unless it&apos;s wired to real tools (search, an
                  MCP server, Clearbit/Apollo-style enrichment APIs). Run the prompt with no data
                  behind it and you get a plausible-sounding brief that may not be accurate. The
                  agent is only as good as the pipeline feeding it.
                </p>
              </div>
              <div className="p-5 rounded-lg border border-border bg-card">
                <h3 className="font-semibold mb-1">Confident-sounding output isn&apos;t the same as correct output</h3>
                <p className="text-sm text-muted-foreground">
                  A model can describe a &quot;trigger event&quot; with total confidence even when the
                  underlying signal is thin or stale. Sending a personalized email that references
                  something inaccurate about a prospect is worse than sending something generic —
                  it damages trust. This is the strongest argument for a human review step before
                  anything goes out, not an optional nice-to-have.
                </p>
              </div>
              <div className="p-5 rounded-lg border border-border bg-card">
                <h3 className="font-semibold mb-1">Volume without judgment just produces spam faster</h3>
                <p className="text-sm text-muted-foreground">
                  The speed advantage of agentic outreach cuts both ways. A team that removes human
                  review to maximize send volume will damage domain reputation and prospect
                  goodwill faster than a slower, more careful human process would. Deliverability
                  infrastructure and sending discipline still matter as much as they ever did — AI
                  doesn&apos;t change email physics.
                </p>
              </div>
              <div className="p-5 rounded-lg border border-border bg-card">
                <h3 className="font-semibold mb-1">Complex, political, or high-stakes deals still need a human</h3>
                <p className="text-sm text-muted-foreground">
                  Multi-threaded enterprise accounts with internal champions, blockers, and
                  competing priorities require reading a room that doesn&apos;t exist in a CRM field.
                  Agents can surface who the likely stakeholders are; they can&apos;t navigate the
                  internal politics between them.
                </p>
              </div>
              <div className="p-5 rounded-lg border border-border bg-card">
                <h3 className="font-semibold mb-1">Live conversation is still a human skill</h3>
                <p className="text-sm text-muted-foreground">
                  Cold calling, discovery calls, and objection handling in real time remain squarely
                  human territory today. Voice AI is improving, but for anything beyond scheduling
                  and basic qualification, prospects can generally tell — and many actively prefer
                  a human on a live call.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.question} className="p-6 rounded-xl border border-border bg-card">
                  <h3 className="font-semibold mb-2 flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    {faq.question}
                  </h3>
                  <p className="text-sm text-muted-foreground pl-7">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related resources / internal links */}
          <div className="p-8 rounded-xl border border-border bg-card">
            <h2 className="text-xl font-bold mb-4">Related Resources</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <Link
                href="/role/sdr"
                className="flex items-center justify-between p-4 rounded-lg bg-muted hover:bg-accent transition-colors group"
              >
                <div>
                  <p className="font-medium text-sm mb-1">SDR / BDR Prompt Pack</p>
                  <p className="text-xs text-muted-foreground">50+ prompts for prospecting and outreach</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-yellow-400 flex-shrink-0" />
              </Link>
              <Link
                href="/agentic-bdr"
                className="flex items-center justify-between p-4 rounded-lg bg-muted hover:bg-accent transition-colors group"
              >
                <div>
                  <p className="font-medium text-sm mb-1">Agentic BDR Guide</p>
                  <p className="text-xs text-muted-foreground">Full breakdown of AI sales agent types</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-yellow-400 flex-shrink-0" />
              </Link>
              <Link
                href="/prompts"
                className="flex items-center justify-between p-4 rounded-lg bg-muted hover:bg-accent transition-colors group"
              >
                <div>
                  <p className="font-medium text-sm mb-1">Full Prompt Library</p>
                  <p className="text-xs text-muted-foreground">Every prompt, browsable by role and use case</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-yellow-400 flex-shrink-0" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
