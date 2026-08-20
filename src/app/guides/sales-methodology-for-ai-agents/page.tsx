import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CopyButton } from '@/components/copy-button';
import { FAQJsonLd, BreadcrumbJsonLd } from '@/components/json-ld';
import { ChevronRight, Target, GitBranch, Lightbulb, Layers } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MEDDPICC, Challenger & SPIN for AI Agents | GTM Skills',
  description:
    'How to encode classic sales methodology — MEDDPICC, SPIN, Challenger — into AI agent system prompts and qualification logic. Real prompts, not generic "use MEDDPICC" advice.',
  openGraph: {
    title: 'MEDDPICC, Challenger & SPIN for AI Agents: Teaching LLMs Sales Methodology',
    description:
      'Turn classic sales frameworks into structured agent decision logic — with real, copy-paste prompts grounded in the GTM Skills prompt library.',
  },
};

const methodologyTable = [
  { name: 'MEDDPICC', stages: 7, use: 'Enterprise deal qualification', href: '/methodology/meddpicc' },
  { name: 'SPIN Selling', stages: 4, use: 'Conversational discovery', href: '/methodology/spin' },
  { name: 'Challenger Sale', stages: 3, use: 'Insight-led positioning', href: '/methodology/challenger' },
  { name: 'Sandler', stages: 7, use: 'Pain funnel + disqualification', href: '/methodology/sandler' },
  { name: 'Gap Selling', stages: 4, use: 'Current vs. future state', href: '/methodology/gap-selling' },
  { name: 'Value Selling', stages: 4, use: 'ROI and business case', href: '/methodology/value-selling' },
];

const faqs = [
  {
    question: 'Can I just tell ChatGPT or Claude to "use MEDDPICC" during a call?',
    answer:
      'You can, and it will produce plausible-sounding output. But a bare instruction like "use MEDDPICC" gives the model no fixed vocabulary, no output schema, and no memory across turns — so two calls with the same prospect can get scored differently, and nothing downstream (your CRM, your forecast) can parse the result. Encoding the methodology as structured extraction logic — fixed field names, a defined confidence scale, explicit "insufficient evidence" handling — is what makes the output usable by other systems, not just readable by a human.',
  },
  {
    question: 'Which methodology is easiest to encode into an agent first?',
    answer:
      'MEDDPICC and Gap Selling are the easiest starting points because their stages map directly onto structured fields (Metrics, Economic Buyer, Champion, etc. or Current State / Future State / Gap / Impact) that an LLM can extract and score consistently. SPIN and Sandler are harder because they are sequential questioning logic — the agent has to decide which stage to advance to next, not just extract data — so they need branching instructions, not just an extraction schema.',
  },
  {
    question: 'Does this replace human reps doing discovery calls?',
    answer:
      'No. The strongest pattern in production today is agents handling the first pass — inbound qualification, initial discovery threads, deal scoring between calls — using the methodology as guardrails, then handing structured, methodology-tagged context to a human rep for the calls that matter. See the agentic BDR breakdown for how that handoff works in practice.',
  },
  {
    question: 'How do I stop the agent from hallucinating a Champion or Economic Buyer that does not exist?',
    answer:
      'Force an explicit "insufficient evidence" state for every field instead of letting the model guess. The prompt examples on this page require the agent to output "unconfirmed" or "no evidence" rather than inferring a title from context. Pair that with a rule that any field marked unconfirmed after N touches triggers a specific next-step (e.g., a targeted question to ask), not a stage advance.',
  },
  {
    question: 'Where do these prompts come from?',
    answer:
      'They are adapted from the MEDDPICC, SPIN, and Challenger prompt templates in the GTM Skills prompt library, restructured for autonomous agent use (structured output, explicit stage logic) instead of single-turn human prompting. You can browse the full, unmodified library at /prompts and the methodology-specific collections at /methodology.',
  },
];

export default function SalesMethodologyForAIAgentsPage() {
  return (
    <div className="py-12 md:py-20">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://gtm-skills.com' },
          { name: 'Guides', url: 'https://gtm-skills.com/guides' },
          {
            name: 'Sales Methodology for AI Agents',
            url: 'https://gtm-skills.com/guides/sales-methodology-for-ai-agents',
          },
        ]}
      />
      <FAQJsonLd questions={faqs} />

      <div className="max-w-4xl mx-auto px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/guides" className="hover:text-foreground transition-colors">
            Guides
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">Sales Methodology for AI Agents</span>
        </div>

        {/* Hero */}
        <div className="mb-12">
          <Badge variant="outline" className="mb-4 border-violet-500/30 text-violet-400">
            Guide
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            MEDDPICC, Challenger &amp; SPIN for AI Agents: Teaching LLMs Sales Methodology
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Every &ldquo;AI SDR&rdquo; pitch talks about automating outreach volume. Almost none of them
            talk about what happens to sales methodology once an agent, not a human, is running
            discovery and qualification. This guide shows how to encode MEDDPICC, SPIN, and
            Challenger directly into an agent&rsquo;s decision logic — with real prompts, not
            hand-waving.
          </p>
        </div>

        {/* Why it matters more, not less */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-4">
            Why methodology matters more, not less, when an agent is doing the work
          </h2>
          <div className="prose prose-invert max-w-none text-muted-foreground space-y-4">
            <p>
              The pitch for sales methodology has always been about human coaching: MEDDPICC
              stopped reps from chasing deals with no Economic Buyer, SPIN stopped reps from
              pitching before they understood the problem, Challenger stopped reps from being
              order-takers. In all three cases, the methodology was a framework a human internalized
              and applied inconsistently, call by call, mood by mood.
            </p>
            <p>
              An AI agent doesn&rsquo;t get tired, doesn&rsquo;t forget to ask the hard question, and
              doesn&rsquo;t skip qualification because the prospect seemed nice. But it also has no
              instinct for what &ldquo;good discovery&rdquo; looks like unless you give it one. Without an
              explicit framework, an agent running a discovery thread will default to generic,
              surface-level questions and call it done — because nothing in its prompt tells it that
              &ldquo;we&rsquo;re looking at a few options&rdquo; is not a Decision Process, or that a champion who
              can&rsquo;t name a budget owner isn&rsquo;t actually a champion.
            </p>
            <p>
              That&rsquo;s the shift: methodology used to be a coaching aid layered on top of a rep&rsquo;s
              judgment. For an agent, it <em>is</em> the judgment. The stages of MEDDPICC or SPIN
              become the literal schema the agent extracts data into, the literal logic it uses to
              decide whether to advance a conversation or ask another question, and the literal
              structure it hands off to a human rep or CRM. Get the encoding wrong and the agent
              doesn&rsquo;t coach itself out of it — it just confidently qualifies bad deals at scale.
            </p>
          </div>
        </div>

        {/* Quick reference table */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-4">The six methodologies, at a glance</h2>
          <p className="text-muted-foreground mb-6">
            All six have real prompt libraries on this site. The three below (MEDDPICC, SPIN,
            Challenger) are the ones that translate most directly into agent logic — Sandler, Gap
            Selling, and Value Selling follow the same pattern.
          </p>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-zinc-900 text-left">
                  <th className="px-4 py-3 font-semibold">Methodology</th>
                  <th className="px-4 py-3 font-semibold">Stages</th>
                  <th className="px-4 py-3 font-semibold">Best fit</th>
                </tr>
              </thead>
              <tbody>
                {methodologyTable.map((m) => (
                  <tr key={m.name} className="border-b border-border last:border-0">
                    <td className="px-4 py-3">
                      <Link href={m.href} className="hover:text-violet-400 transition-colors font-medium">
                        {m.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{m.stages}</td>
                    <td className="px-4 py-3 text-muted-foreground">{m.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* MEDDPICC */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Target className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">MEDDPICC: turn it into an extraction schema</h2>
              <p className="text-sm text-muted-foreground">
                Metrics, Economic Buyer, Decision Criteria, Decision Process, Identify Pain,
                Champion, Competition
              </p>
            </div>
          </div>
          <p className="text-muted-foreground mb-6">
            MEDDPICC is the easiest methodology to encode because its seven stages already map
            one-to-one onto structured fields. The job isn&rsquo;t to teach the agent what MEDDPICC
            means — Claude already knows the acronym — it&rsquo;s to force every field into a fixed
            shape (confirmed / unconfirmed / no evidence) so the output is consistent across every
            deal the agent touches, and so a human or CRM can act on it without re-reading the
            transcript.
          </p>
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">
                Agent qualification prompt — adapted from the MEDDPICC × SaaS prompt set
              </span>
              <CopyButton
                label="meddpicc-agent-prompt"
                text={`You are a deal qualification agent applying MEDDPICC. After every call transcript or email thread for a SaaS deal, update the deal record using this exact structure. Do not skip a field, and do not infer a field from tone — only mark a field "confirmed" if there is a direct quote or explicit statement supporting it.

For each element, output: status (confirmed / unconfirmed / no evidence), evidence (quote or "none"), and next_action if unconfirmed.

**Metrics:** What KPIs matter to the CTO or VP Engineering? What number are they trying to move?
**Economic Buyer:** Who has budget authority, and have we spoken to them directly (not through a proxy)?
**Decision Criteria:** What will they evaluate solutions against?
**Decision Process:** What is the SaaS company's actual procurement process and timeline?
**Identify Pain:** Is there evidence of pain tied to integration complexity, security concerns, adoption rates, or ROI justification — or is this a "nice to have"?
**Champion:** Do we have someone who will actively sell on our behalf internally, not just someone who likes the product?
**Competition:** Who else are they evaluating, and do we know why?

If 3+ fields are "no evidence" after two touches, flag this deal for human review instead of advancing it automatically.`}
              />
            </div>
            <div className="bg-zinc-900 rounded-lg p-4">
              <pre className="text-xs text-zinc-400 whitespace-pre-wrap font-mono">
{`You are a deal qualification agent applying MEDDPICC. After every call
transcript or email thread for a SaaS deal, update the deal record using
this exact structure. Do not skip a field, and do not infer a field from
tone — only mark a field "confirmed" if there is a direct quote or
explicit statement supporting it.

For each element, output: status (confirmed / unconfirmed / no evidence),
evidence (quote or "none"), and next_action if unconfirmed.

**Metrics:** What KPIs matter to the CTO or VP Engineering?
**Economic Buyer:** Who has budget authority — spoken to directly, not
  through a proxy?
**Decision Criteria:** What will they evaluate solutions against?
**Decision Process:** Actual procurement process and timeline?
**Identify Pain:** Evidence of pain tied to integration complexity,
  security concerns, adoption rates, or ROI justification?
**Champion:** Someone who will actively sell internally, not just
  someone who likes the product?
**Competition:** Who else are they evaluating, and why?

If 3+ fields are "no evidence" after two touches, flag for human
review instead of advancing automatically.`}
              </pre>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Compare this to the source prompt in the{' '}
            <Link href="/methodology/meddpicc" className="text-violet-400 hover:underline">
              MEDDPICC prompt collection
            </Link>{' '}
            — the questions are the same; what changed is the output contract and the escalation
            rule that gives the agent something to <em>do</em> when evidence is missing instead of
            guessing.
          </p>
        </div>

        {/* SPIN */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <GitBranch className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">SPIN: turn it into branching conversation logic</h2>
              <p className="text-sm text-muted-foreground">
                Situation, Problem, Implication, Need-Payoff
              </p>
            </div>
          </div>
          <p className="text-muted-foreground mb-6">
            SPIN is harder to encode than MEDDPICC because it isn&rsquo;t a static schema — it&rsquo;s a
            sequence. The methodology only works if the agent asks Situation questions before
            Problem questions, and doesn&rsquo;t jump to Need-Payoff before Implication has landed. An
            agent without explicit sequencing rules will ask a good SPIN question and a premature
            pitch in the same message.
          </p>
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">
                Agent discovery-routing prompt — adapted from the SPIN × SaaS prompt set
              </span>
              <CopyButton
                label="spin-agent-prompt"
                text={`You are running SPIN-based discovery in an ongoing chat or email thread with a SaaS prospect. Track which stage the conversation is in and only advance one stage at a time.

**Situation Questions:** Understand their current state with integration complexity. Do not move on until you have at least one concrete fact about their current setup.
**Problem Questions:** Uncover issues and challenges — do not ask these until Situation has at least one confirmed fact.
**Implication Questions:** Explore the cost or impact of the problem on their SaaS business. Only ask these once the prospect has named a specific problem, not a vague one.
**Need-Payoff Questions:** Get the CTO to articulate the value of solving it themselves. Only ask these after implication has surfaced a business cost — never lead with these.

Before every message, output your current stage and the one fact or quote that justifies advancing to it. If the prospect gives a one-word or evasive answer, stay in the current stage and rephrase — do not advance.

If the prospect states a Need-Payoff answer unprompted, skip ahead and log it, but do not skip stages for the agent's own convenience.`}
              />
            </div>
            <div className="bg-zinc-900 rounded-lg p-4">
              <pre className="text-xs text-zinc-400 whitespace-pre-wrap font-mono">
{`You are running SPIN-based discovery in an ongoing chat or email thread
with a SaaS prospect. Track which stage the conversation is in and only
advance one stage at a time.

**Situation Questions:** Understand their current state with integration
  complexity. Do not move on until you have one concrete fact.
**Problem Questions:** Uncover issues and challenges — do not ask until
  Situation has at least one confirmed fact.
**Implication Questions:** Explore cost/impact on their SaaS business.
  Only ask once the prospect has named a specific problem.
**Need-Payoff Questions:** Get the CTO to articulate the value of
  solving it themselves. Never lead with these.

Before every message, output your current stage and the fact that
justifies advancing. If the prospect gives an evasive answer, stay in
the current stage and rephrase — do not advance.

If the prospect states a Need-Payoff answer unprompted, skip ahead and
log it, but do not skip stages for the agent's own convenience.`}
              </pre>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            The underlying questions are pulled from the{' '}
            <Link href="/methodology/spin" className="text-violet-400 hover:underline">
              SPIN prompt collection
            </Link>
            . The addition is a state machine: a stage variable, an advance condition, and an
            explicit instruction not to skip ahead — none of which exists if you just ask an LLM
            to &ldquo;use SPIN.&rdquo;
          </p>
        </div>

        {/* Challenger */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
              <Lightbulb className="h-5 w-5 text-orange-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Challenger: turn it into an insight-delivery contract</h2>
              <p className="text-sm text-muted-foreground">Teach, Tailor, Take Control</p>
            </div>
          </div>
          <p className="text-muted-foreground mb-6">
            Challenger is the hardest of the three to encode well, because the whole methodology
            depends on the agent having a real, defensible insight to teach — not a generic
            &ldquo;did you know most companies struggle with X&rdquo; observation. The risk with an
            unconstrained agent is that it fakes Challenger&rsquo;s structure (Warmer → Reframe →
            Rational drowning → Emotional impact → New way) around a hollow insight, which reads as
            manipulative rather than credible.
          </p>
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">
                Agent teach-and-tailor prompt — adapted from the Challenger × SaaS prompt set
              </span>
              <CopyButton
                label="challenger-agent-prompt"
                text={`You are delivering a Challenger-style "Teach" moment to a SaaS buyer. You may only use insights supplied in your knowledge base — do not invent statistics or generalize from a single anecdote.

Structure every Teach moment as:
1. Warmer — connect to their world (reference something specific, not generic)
2. Reframe — challenge their current thinking with the supplied insight
3. Rational drowning — cite the specific data point backing the reframe, with its source
4. Emotional impact — what this means for them specifically, tied to a role-relevant priority
5. New way — how our approach addresses it

Then Tailor the same insight per stakeholder:
- If speaking to a CTO: emphasize integration complexity and technical risk
- If speaking to a VP Engineering: emphasize adoption rates and team impact
- If speaking to an IT Director: emphasize security concerns and operational load

If the prospect pushes back on the reframe, Take Control by: (1) acknowledging their view in one sentence, (2) bridging back to the original insight without repeating it verbatim, (3) asking a question that advances the conversation. Never concede the reframe just to reduce friction — if you cannot defend it with a cited data point, do not deploy it.`}
              />
            </div>
            <div className="bg-zinc-900 rounded-lg p-4">
              <pre className="text-xs text-zinc-400 whitespace-pre-wrap font-mono">
{`You are delivering a Challenger-style "Teach" moment to a SaaS buyer.
You may only use insights supplied in your knowledge base — do not
invent statistics or generalize from a single anecdote.

Structure every Teach moment as:
1. Warmer — connect to their world (specific, not generic)
2. Reframe — challenge their current thinking with the supplied insight
3. Rational drowning — cite the specific data point, with its source
4. Emotional impact — what this means for them, tied to their priority
5. New way — how our approach addresses it

Then Tailor the same insight per stakeholder:
- CTO: emphasize integration complexity and technical risk
- VP Engineering: emphasize adoption rates and team impact
- IT Director: emphasize security concerns and operational load

If the prospect pushes back, Take Control by: (1) acknowledging their
view in one sentence, (2) bridging back to the insight without
repeating it verbatim, (3) asking a question that advances the
conversation. Never concede the reframe just to reduce friction.`}
              </pre>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Source questions from the{' '}
            <Link href="/methodology/challenger" className="text-violet-400 hover:underline">
              Challenger prompt collection
            </Link>
            . The constraint that matters most here — &ldquo;only use insights supplied in your
            knowledge base&rdquo; — has no equivalent in a one-off human prompt, because a human rep
            already knows not to make up statistics on a call. An agent needs to be told.
          </p>
        </div>

        {/* Why this is different */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center">
              <Layers className="h-5 w-5 text-violet-400" />
            </div>
            <h2 className="text-2xl font-bold">
              Why this is different from &ldquo;just ask ChatGPT to use MEDDPICC&rdquo;
            </h2>
          </div>
          <div className="space-y-5">
            <div className="p-5 rounded-xl border border-border bg-card">
              <h3 className="font-semibold mb-2">Specificity beats the acronym</h3>
              <p className="text-sm text-muted-foreground">
                Every frontier LLM already knows what MEDDPICC, SPIN, and Challenger stand for —
                asking it to &ldquo;apply MEDDPICC&rdquo; will produce a plausible-looking answer every time.
                The gap isn&rsquo;t knowledge, it&rsquo;s specificity: which buyer titles count as an Economic
                Buyer for <em>this</em> industry, which pain points are real qualification signal for
                <em> this</em> ICP, what &ldquo;confirmed&rdquo; actually requires as evidence. Generic prompting
                skips all of that and lets the model fill the gaps with statistically average,
                context-free answers.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-border bg-card">
              <h3 className="font-semibold mb-2">Structured extraction, not prose</h3>
              <p className="text-sm text-muted-foreground">
                A human rep reading a MEDDPICC summary can tolerate prose. A CRM field, a forecast
                model, or a downstream agent cannot. Every prompt above forces a fixed output shape
                (status / evidence / next_action, or stage / justification) specifically so the
                result can be parsed and acted on programmatically — not just read.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-border bg-card">
              <h3 className="font-semibold mb-2">Consistency at scale</h3>
              <p className="text-sm text-muted-foreground">
                A human SDR applies MEDDPICC a little differently on their best day than their worst
                one. An agent applies whatever logic is in its system prompt identically on deal 1
                and deal 10,000. That&rsquo;s an advantage only if the logic is actually correct and
                explicit — otherwise you&rsquo;ve just industrialized the same mistake across your
                entire pipeline. The escalation rules in each prompt above (flag for human review,
                do not advance without evidence) exist specifically to cap the damage of that
                failure mode.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">FAQ</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="p-5 rounded-xl border border-border bg-card">
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Internal links */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Go deeper</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link
              href="/methodology"
              className="p-4 rounded-xl border border-border bg-card hover:border-violet-500/50 transition-all group"
            >
              <h3 className="font-semibold group-hover:text-violet-400 transition-colors">
                All Methodology Prompts
              </h3>
              <p className="text-sm text-muted-foreground">
                MEDDPICC, SPIN, Challenger, Sandler, Gap Selling, Value Selling
              </p>
            </Link>
            <Link
              href="/agentic-bdr"
              className="p-4 rounded-xl border border-border bg-card hover:border-violet-500/50 transition-all group"
            >
              <h3 className="font-semibold group-hover:text-violet-400 transition-colors">
                Agentic BDR
              </h3>
              <p className="text-sm text-muted-foreground">
                How agents hand off methodology-tagged context to human reps
              </p>
            </Link>
            <Link
              href="/prompts"
              className="p-4 rounded-xl border border-border bg-card hover:border-violet-500/50 transition-all group"
            >
              <h3 className="font-semibold group-hover:text-violet-400 transition-colors">
                Full Prompt Library
              </h3>
              <p className="text-sm text-muted-foreground">
                Browse every industry × methodology combination
              </p>
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center p-8 rounded-xl bg-zinc-900">
          <h2 className="text-2xl font-bold text-white mb-4">Want This Logic Running Automatically?</h2>
          <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
            Prospeda applies methodology-based qualification logic to every deal automatically —
            structured extraction, escalation rules, and human handoff built in.
          </p>
          <a href="https://github.com/gtm-skills/gtm" target="_blank" rel="noopener noreferrer">
            <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
              Try Prospeda Free
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
