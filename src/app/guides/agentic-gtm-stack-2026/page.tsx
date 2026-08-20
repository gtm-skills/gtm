import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { CopyButton } from '@/components/copy-button';
import { FAQJsonLd, BreadcrumbJsonLd } from '@/components/json-ld';
import {
  ArrowRight,
  ChevronRight,
  Search,
  PenTool,
  Send,
  MessageCircle,
  Workflow,
  UserCheck,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Agentic GTM Stack in 2026 | GTM Skills',
  description:
    'A field guide to the 2026 agentic GTM stack: research, personalization, outreach, qualification, and orchestration agents - plus where human judgment still matters most.',
  openGraph: {
    title: 'The Agentic GTM Stack in 2026: Tools, Agents, and Where Humans Still Matter',
    description:
      'How to categorize, evaluate, and start building an agentic GTM stack - honestly, without the hype.',
  },
};

const layers = [
  {
    id: 'research',
    icon: Search,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    name: 'Research & Enrichment Agents',
    role: 'Layer 1 - Intelligence',
    does: 'Pull firmographic and technographic data, watch for trigger events (funding, hiring, product launches, leadership changes), build account and contact profiles, and score fit against your ICP. This is the layer that answers "who should we talk to, and why now?"',
    good: [
      'Cites where a claim came from, so a rep can verify it in ten seconds instead of trusting it blindly',
      'Distinguishes confirmed facts ("raised a Series B on March 3") from inferred signals ("likely hiring for this role based on job posts")',
      'Updates existing CRM records instead of creating duplicate ones',
      'Refreshes on a schedule rather than going stale after a single one-time pull',
    ],
    fit: 'On this site: the research_company and research_lead tools in the MCP server, the Scout agent in OpenClaw, and the research-agent prompt patterns under /role and /industry. In the broader category: tools like Clay, Apollo, ZoomInfo, Clearbit, and Crunchbase do the same job with deeper native data access.',
  },
  {
    id: 'personalization',
    icon: PenTool,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    name: 'Personalization & Writing Agents',
    role: 'Layer 2 - Message Creation',
    does: 'Turn raw research into a draft - a cold email, a LinkedIn message, a follow-up, a proposal paragraph - tailored to the recipient\'s role, industry, and situation. This layer is where "agentic" GTM diverges most sharply from mail-merge automation.',
    good: [
      'Personalization is tied to something true and specific about the recipient, not a mail-merged fact ("I saw {{company}} raised funding" is not personalization, it\'s a variable)',
      'Produces multiple angles so a rep can pick the one that fits their voice, instead of one "final" draft the rep just approves blindly',
      'Matches tone to context without drifting into generic AI voice (em dashes, "I hope this finds you well," triple-adjective openers)',
      "Doesn't overclaim what your product does - the fastest way to lose a prospect's trust is a first message that already oversells",
    ],
    fit: 'On this site: draft_cold_email and draft_linkedin_message in the MCP server, the Writer agent in OpenClaw, and the personalization-agent prompt set. In the broader category: Lavender, Copy.ai, Regie.ai, and the native AI drafting features now built into most sales engagement platforms.',
  },
  {
    id: 'execution',
    icon: Send,
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
    name: 'Outreach Execution Agents',
    role: 'Layer 3 - Delivery',
    does: 'Sequence sends across channels, time touches around a prospect\'s likely availability, watch for opens and replies, and decide the next action - follow up, wait, or stop. This is the layer that actually pushes messages out into the world.',
    good: [
      'Queues the first message to any net-new prospect for human approval before it sends - autonomy should be earned touch by touch, not assumed on day one',
      'Respects suppression lists, unsubscribes, and channel rules (CAN-SPAM, GDPR, LinkedIn\'s connection limits) without needing to be told twice',
      "Stops or de-escalates when a sequence isn't working instead of grinding through all five touches on autopilot",
      'Keeps a visible log of what it sent and when, so a manager can audit a sequence after the fact',
    ],
    fit: 'On this site: the Rep agent in OpenClaw and the execution-agent, scheduling-agent, and follow-up-agent prompt sets. In the broader category: Outreach, Salesloft, Apollo sequences, and HubSpot workflows all sit in this layer.',
  },
  {
    id: 'qualification',
    icon: MessageCircle,
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
    name: 'Qualification & Conversation Agents',
    role: 'Layer 4 - Filtering',
    does: 'Score inbound and outbound leads, classify replies (interested, objection, referral, not now, hard no), and in some stacks run a first conversational pass - a chat widget, a voice agent, a qualifying DM thread - before a human ever joins.',
    good: [
      'Is conservative about calling something "qualified" - a false positive burns a rep\'s time, a false negative kills a deal before it starts, and the second mistake is usually more expensive',
      'Surfaces its confidence level rather than presenting every classification as certain',
      'Hands off to a human at a natural decision point instead of trying to run the whole qualifying conversation end-to-end',
      "Treats silence and short replies as ambiguous, not as a data point to score aggressively",
    ],
    fit: 'On this site: the qualification-agent and routing-agent prompt sets, and the voice-call templates under /voice-templates for discovery-style scripts. In the broader category: intent platforms (6sense, Bombora), lead scoring in HubSpot/Salesforce, and conversational qualification bots.',
  },
  {
    id: 'orchestration',
    icon: Workflow,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    name: 'RevOps / Orchestration Layer',
    role: 'Layer 5 - The Glue',
    does: 'Connects every layer above to the CRM and to each other - syncing data, triggering workflows on events, keeping the system of record accurate, and producing analytics on what the agents are actually doing. Without this layer, the other four are four disconnected tools.',
    good: [
      'One system of record, not five tools quietly disagreeing about a contact\'s job title',
      'An audit trail on every automated write, so a bad sync is traceable instead of a mystery',
      'Fails loudly - a broken integration that silently drops records is worse than one that visibly errors out',
      'Reports on agent-driven activity as its own category, so a team can see how much pipeline came from automation versus manual work',
    ],
    fit: 'On this site: the integration-agent and analytics-agent prompt sets, and the HubSpot integration described under /tools. In the broader category: Zapier, Workato, n8n, Clay, and native CRM automation (Salesforce Flow, HubSpot Workflows) all live here.',
  },
];

const humanJudgment = [
  {
    title: 'Reading the room',
    detail:
      'An agent will happily send a "quick follow-up" the week a prospect\'s company announces layoffs. Knowing when efficiency is the wrong instinct - when to go quiet, soften the ask, or just check in as a person - is still a human call.',
  },
  {
    title: 'Verifying anything specific before it goes external',
    detail:
      "Agents are fluent, and fluency is not the same as accuracy. A wrong dollar figure, a misremembered exec name, or a fabricated stat in a cold email is worse than a generic message - it signals you didn't actually do the homework you're claiming to have done. Specific claims need a human check before they leave the building.",
  },
  {
    title: 'Negotiation and deal structuring',
    detail:
      "Pricing trade-offs, concession sequencing, and reading what a buyer's silence during a negotiation actually means are judgment calls built on context an agent doesn't have - internal budget politics, competitive pressure the prospect hasn't said out loud, relationship history from a previous deal.",
  },
  {
    title: 'Navigating buying-committee politics',
    detail:
      "Multi-threading a deal isn't just \"contact more people\" - it's knowing who to loop in, in what order, without making your champion feel bypassed. That's relationship strategy, not a workflow.",
  },
  {
    title: 'Knowing when to break the playbook',
    detail:
      'Every agentic system runs on a playbook - a scoring model, a sequence template, a qualification framework. The best reps and managers know when a specific account is the exception, and overriding the system is the right move, not a compliance failure.',
  },
  {
    title: 'Coaching and team development',
    detail:
      "An agent can flag that a rep's reply rate dropped. It can't run the 1:1 that figures out whether the rep is burned out, undertrained, or working bad territory - and it definitely can't build the trust that makes a rep receptive to hard feedback.",
  },
  {
    title: "Ethical judgment calls the rules don't cover",
    detail:
      'A technically-compliant pattern can still be sleazy - a fake "last chance" urgency line, a personalization hook that reads as surveillance rather than research. Agents optimize for what you told them to optimize for; someone has to keep asking whether the tactic is one you\'d be comfortable explaining to the prospect directly.',
  },
];

const startSteps = [
  {
    step: '01',
    title: 'Map your funnel and pick one layer',
    detail:
      "Don't try to automate research, writing, outreach, and qualification simultaneously. Pick the layer with the highest leverage and lowest downside if it's wrong - usually research or personalization, since a bad draft gets caught by a human before it sends, while a bad autonomous send does not.",
  },
  {
    step: '02',
    title: 'Keep a human checkpoint at the first external touch',
    detail:
      'Whatever you automate, keep a human in the loop before anything reaches a real prospect for the first several weeks. Loosen it only after you can point to a track record, not a hunch.',
  },
  {
    step: '03',
    title: 'Try one implementation path, not five',
    detail:
      "There's no single right on-ramp. You could wire up Claude with the GTM MCP server for research and drafting tools inside Claude Code or Claude Desktop, install the OpenClaw agents (Scout, Writer, Rep, Closer) as a starting agent team, pull role-specific prompts from the free library and run them manually first, or extend whatever sales engagement platform you already pay for with its native AI features. Pick one, run it for a real sprint, and judge it on output - not on how impressive the demo looked.",
  },
  {
    step: '04',
    title: 'Instrument before you scale',
    detail:
      "Track what the agent actually produces - reply rates on agent-drafted emails versus human-drafted ones, how often research gets corrected, how many qualified leads were actually qualified. Vanity metrics like \"messages sent\" hide whether the layer is working.",
  },
  {
    step: '05',
    title: 'Expand layer by layer',
    detail:
      'Once one layer is boring - reliable enough that nobody talks about it in standup anymore - move to the next. Stacks built all at once tend to fail in ways that are hard to debug, because you can\'t tell which layer introduced the problem.',
  },
];

const faqs = [
  {
    question: 'What is agentic GTM?',
    answer:
      'Agentic GTM refers to using AI agents - systems that can take multi-step actions with some autonomy, not just generate a single response - across go-to-market functions like research, personalization, outreach, and qualification. The key difference from earlier "AI-powered" sales tools is that agentic systems chain steps together and make intermediate decisions (what to research next, which angle to draft, when to follow up) rather than executing one fixed workflow.',
  },
  {
    question: 'Is agentic GTM the same as sales automation?',
    answer:
      "No, though they overlap. Traditional sales automation runs fixed, predetermined workflows - if a form is submitted, send this exact email, then wait three days, then send this other exact email. Agentic GTM introduces judgment into individual steps: what to research, how to phrase something, whether to send now or wait. The line between the two blurs in practice - most 2026 stacks are automation with agentic components layered on top, not a wholesale replacement.",
  },
  {
    question: 'Will agentic GTM replace SDRs and AEs?',
    answer:
      "The layers that get automated first are the mechanical ones - research aggregation, first-draft writing, sequence logistics. The layers that resist automation - negotiation, relationship judgment, reading a buying committee's internal politics, knowing when to break the playbook - are exactly the parts of the job that make an SDR or AE valuable rather than replaceable. The realistic shift is toward fewer people doing more of the judgment-heavy work, with agents handling the volume work that used to eat their day.",
  },
  {
    question: "What's the difference between an \"AI SDR\" tool and an agentic GTM stack?",
    answer:
      'An "AI SDR" product is usually a single vendor bundling several of these layers - research, personalization, and execution - behind one interface, often with a subscription price attached. An agentic GTM stack is the broader architecture: the layers themselves, whichever tools fill them, and how they hand off to each other. You can build a stack from one AI SDR product, from several point tools wired together, or from a mix of off-the-shelf agents and your own prompts - the stack is the pattern, not any single product.',
  },
  {
    question: 'How much of the GTM funnel can realistically be automated today?',
    answer:
      "It varies enormously by motion, so any single percentage claim should be treated skeptically. What's consistently true: research and first-draft writing automate well because the output is reviewed before it matters. Execution automates well once trust is established. Qualification automates partially - enough to triage, not enough to replace a human decision on anything ambiguous. Negotiation, complex multi-stakeholder deals, and anything requiring genuine relationship judgment remain largely human, and there's no credible evidence that's changing soon.",
  },
  {
    question: 'Is it safe to let an agent send outreach without a human reviewing it first?',
    answer:
      "It's safe once you've built a track record with that specific agent, on that specific type of message, at that specific volume - not before. The risk isn't usually catastrophic failure, it's small, compounding errors: a wrong fact, an off-tone message, a sequence that doesn't stop when it should. Most teams that run fully autonomous outreach earned that autonomy gradually, starting with heavy review and loosening it as error rates proved low.",
  },
  {
    question: 'What skills does a GTM team need to manage an agentic stack?',
    answer:
      "Prompt and workflow literacy matters less than most vendors suggest. What matters more: the judgment to evaluate agent output critically instead of rubber-stamping it, enough process discipline to define clear checkpoints, and enough data hygiene to keep the orchestration layer (the CRM and its sync rules) from becoming a mess that undermines everything built on top of it.",
  },
  {
    question: 'How do I start if my team already has an established tech stack?',
    answer:
      "Layer in, don't rip out. Most agentic capability today gets added on top of an existing CRM and sales engagement platform rather than replacing them - through native AI features many platforms have shipped, through MCP-based tools that connect an assistant like Claude to your existing systems, or through point tools for a single layer (research or personalization) that write back into the CRM you already use. Wholesale stack replacement is rarely the fastest path and usually the riskiest one.",
  },
];

export default function AgenticGtmStack2026Page() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://gtm-skills.com' },
          { name: 'Guides', url: 'https://gtm-skills.com/guides' },
          {
            name: 'The Agentic GTM Stack in 2026',
            url: 'https://gtm-skills.com/guides/agentic-gtm-stack-2026',
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
            <span className="text-foreground">Agentic GTM Stack 2026</span>
          </div>

          {/* Hero */}
          <div className="mb-12">
            <Badge variant="outline" className="mb-4 border-blue-500/30 text-blue-400">
              Field Guide
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              The Agentic GTM Stack in 2026: Tools, Agents, and Where Humans Still Matter
            </h1>
            <p className="text-xl text-muted-foreground">
              A working map of what agentic go-to-market actually looks like right now - the
              layers doing real work, what separates a good implementation from a sloppy one,
              and the parts of the job no agent is close to touching.
            </p>
          </div>

          {/* Intro */}
          <div className="prose prose-invert max-w-none mb-16 text-muted-foreground space-y-4">
            <p>
              &quot;Agentic GTM&quot; gets used loosely enough in 2026 that it&apos;s worth being
              precise about what it means before categorizing the stack. An agent, in this
              context, is a system that chains multiple steps together and makes intermediate
              decisions along the way - what to research next, which personalization angle to
              use, when to follow up - rather than executing one fixed script. That&apos;s the
              line between agentic GTM and the sales automation that&apos;s existed for a
              decade: automation follows a predetermined path, agents make choices inside that
              path.
            </p>
            <p>
              In practice, almost no team runs a single unified &quot;agent&quot; that owns the
              whole funnel. What&apos;s actually out there is a stack of narrower agents, each
              responsible for one layer of the go-to-market motion, usually stitched together
              through a CRM and a set of handoff rules. Understanding those layers - what each
              one does well, what &quot;good&quot; looks like inside it, and where the honest
              limits are - is more useful than evaluating any single vendor&apos;s pitch.
            </p>
          </div>

          {/* Layers */}
          <div className="mb-20">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">The Six Layers of an Agentic GTM Stack</h2>
            <p className="text-muted-foreground mb-8">
              Five layers of agent activity, plus one layer that isn&apos;t an agent at all -
              the human checkpoints that keep the other five honest.
            </p>

            <div className="space-y-6">
              {layers.map((layer) => (
                <div
                  key={layer.id}
                  id={layer.id}
                  className={`p-6 md:p-8 rounded-xl border ${layer.border} bg-card`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-lg ${layer.bg} flex items-center justify-center flex-shrink-0`}>
                      <layer.icon className={`h-6 w-6 ${layer.color}`} />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                        {layer.role}
                      </div>
                      <h3 className="text-xl font-bold">{layer.name}</h3>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-5">{layer.does}</p>

                  <div className="mb-5">
                    <div className="text-sm font-semibold mb-2">What &quot;good&quot; looks like</div>
                    <ul className="space-y-2">
                      {layer.good.map((point) => (
                        <li key={point} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className={`h-4 w-4 mt-0.5 flex-shrink-0 ${layer.color}`} />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="text-sm text-muted-foreground border-t border-border pt-4">
                    <span className="font-semibold text-foreground">Where this lives: </span>
                    {layer.fit}
                  </div>
                </div>
              ))}

              {/* Layer 6: Human-in-the-loop review points */}
              <div className="p-6 md:p-8 rounded-xl border border-pink-500/20 bg-card">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-pink-500/10 flex items-center justify-center flex-shrink-0">
                    <UserCheck className="h-6 w-6 text-pink-400" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                      Layer 6 - Not An Agent
                    </div>
                    <h3 className="text-xl font-bold">Human-in-the-Loop Review Points</h3>
                  </div>
                </div>
                <p className="text-muted-foreground mb-5">
                  This layer is a design discipline, not a piece of software: the deliberate
                  places in the stack where a human looks at what an agent produced before it
                  goes further - before a message sends, before a record writes to the CRM,
                  before a lead gets marked qualified and handed to a rep.
                </p>
                <div className="mb-5">
                  <div className="text-sm font-semibold mb-2">What &quot;good&quot; looks like</div>
                  <ul className="space-y-2">
                    {[
                      'Checkpoints are explicit and documented, not "someone probably looks at this"',
                      'Low-confidence agent output routes to a person by default, not on request',
                      'Someone reviews the aggregate pattern of what agents are producing periodically, not just individual spot checks',
                      'Ownership is clear: when something goes out wrong, there is a specific person who was supposed to catch it',
                    ].map((point) => (
                      <li key={point} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0 text-pink-400" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-sm text-muted-foreground border-t border-border pt-4">
                  The teams that get burned by agentic GTM are rarely the ones with weak agents -
                  they&apos;re the ones that skipped this layer to move faster.
                </div>
              </div>
            </div>
          </div>

          {/* Where humans still matter */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="h-6 w-6 text-yellow-400" />
              <h2 className="text-2xl md:text-3xl font-bold">Where Human Judgment Still Matters Most</h2>
            </div>
            <p className="text-muted-foreground mb-8">
              Any honest field guide to agentic GTM has to be specific about this, not just wave
              at it. These are the judgment calls that don&apos;t show up as a missing feature in
              a product demo, because they&apos;re not features - they&apos;re the parts of the job
              that resist automation on principle, not just on current technical limits.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {humanJudgment.map((item) => (
                <div key={item.title} className="p-6 rounded-xl border border-border bg-card">
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* How to start */}
          <div className="mb-20">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">How to Start Building Your Own Agentic GTM Stack</h2>
            <p className="text-muted-foreground mb-8">
              None of this requires a rebuild. Most teams add agentic capability one layer at a
              time, on top of tools they already run.
            </p>
            <div className="space-y-4 mb-8">
              {startSteps.map((s) => (
                <div key={s.step} className="flex gap-4 p-6 rounded-xl border border-border bg-card">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <span className="text-blue-400 font-bold">{s.step}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{s.title}</h3>
                    <p className="text-sm text-muted-foreground">{s.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 md:p-8 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-lg mb-2">One on-ramp among many</h3>
              <p className="text-sm text-muted-foreground mb-4">
                GTM Skills is one place to start on the research, personalization, and execution
                layers - not the only one. The <Link href="/free-tools/mcp-server" className="text-blue-400 hover:text-blue-300">MCP server</Link> adds
                sales tools directly into Claude, the <Link href="/openclaw" className="text-blue-400 hover:text-blue-300">OpenClaw</Link> agents
                (Scout, Writer, Rep, Closer) give you a small pre-built agent team, and
                the <Link href="/role" className="text-blue-400 hover:text-blue-300">role</Link> and <Link href="/tools" className="text-blue-400 hover:text-blue-300">tools</Link> libraries
                are useful even if you run them manually before wiring up anything autonomous.
                Whether that&apos;s the right starting point depends on whether your team already
                lives in Claude - if you&apos;re standardized on a different assistant or a
                dedicated AI SDR platform, the same layer-by-layer approach applies there too.
              </p>
              <div className="flex items-center justify-between gap-4 p-4 rounded-lg bg-card">
                <code className="text-sm text-foreground font-mono overflow-x-auto">
                  npx clawdhub install gtm-skills/scout gtm-skills/writer gtm-skills/rep gtm-skills/closer
                </code>
                <CopyButton
                  text="npx clawdhub install gtm-skills/scout gtm-skills/writer gtm-skills/rep gtm-skills/closer"
                  label="agentic_gtm_stack_guide_install"
                  className="flex-shrink-0"
                />
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-20">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.question} className="p-6 rounded-xl border border-border bg-card">
                  <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related reading */}
          <div className="p-8 rounded-xl bg-card">
            <h2 className="text-xl font-bold text-foreground mb-4">Go Deeper</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <Link
                href="/agentic-bdr"
                className="flex items-center justify-between p-4 rounded-lg bg-muted hover:bg-accent transition-colors text-sm text-foreground"
              >
                Agentic BDR Guide
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Link>
              <Link
                href="/free-tools/mcp-server"
                className="flex items-center justify-between p-4 rounded-lg bg-muted hover:bg-accent transition-colors text-sm text-foreground"
              >
                GTM MCP Server
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Link>
              <Link
                href="/openclaw"
                className="flex items-center justify-between p-4 rounded-lg bg-muted hover:bg-accent transition-colors text-sm text-foreground"
              >
                OpenClaw Agent Team
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Link>
              <Link
                href="/role"
                className="flex items-center justify-between p-4 rounded-lg bg-muted hover:bg-accent transition-colors text-sm text-foreground"
              >
                Role Playbooks
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Link>
              <Link
                href="/tools"
                className="flex items-center justify-between p-4 rounded-lg bg-muted hover:bg-accent transition-colors text-sm text-foreground sm:col-span-2"
              >
                Tools & Integrations
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
