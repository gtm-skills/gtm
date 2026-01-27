import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CopyButton } from '@/components/copy-button';
import { ArrowRight, ClipboardCheck } from 'lucide-react';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'MEDDIC/MEDDPICC Sales Framework | Qualification Prompts | Free GTM',
  description: 'Master MEDDIC and MEDDPICC qualification. Metrics, Economic Buyer, Decision Criteria, Decision Process, Identify Pain, Champion, Competition. Free prompts.',
  keywords: 'meddic sales, meddpicc framework, sales qualification framework, enterprise sales qualification, meddic questions, champion sales',
  openGraph: {
    title: 'MEDDIC/MEDDPICC Sales Framework | Qualification Prompts',
    description: 'Master MEDDIC and MEDDPICC qualification. Free prompts for Claude & ChatGPT.',
    type: 'website',
  },
};

const qualificationPrompt = `Analyze this deal using the MEDDPICC framework.

Deal Context:
- Company: [COMPANY]
- Opportunity: [WHAT THEY'RE EVALUATING]
- Stage: [CURRENT SALES STAGE]
- What we know: [PASTE NOTES FROM CALLS/EMAILS]

MEDDPICC Analysis - Score each 1-5 and explain gaps:

M - Metrics: What quantified business outcomes are they trying to achieve?
E - Economic Buyer: Who can sign off on budget? Have we engaged them?
D - Decision Criteria: What will they evaluate solutions against?
D - Decision Process: What's the timeline and approval workflow?
P - Paper Process: What's required for procurement/legal?
I - Identify Pain: What's the core pain driving this initiative?
C - Champion: Who is advocating for us internally? How strong are they?
C - Competition: Who else are they evaluating? Where do we win/lose?

For each element:
1. What we know (with evidence)
2. What we don't know (gaps)
3. Questions to fill the gaps
4. Risk level (Red/Yellow/Green)

Generate a complete MEDDPICC scorecard.`;

const metricsPrompt = `Generate questions to uncover Metrics (the M in MEDDIC).

Context:
- Prospect company: [COMPANY]
- Their initiative: [WHAT THEY'RE TRYING TO SOLVE]
- My solution: [WHAT WE OFFER]
- Typical outcomes: [RESULTS WE DELIVER]

Metrics Discovery Goals:
- Quantify the current state (baseline)
- Understand their target state (goals)
- Identify how they'll measure success
- Connect your value to their KPIs
- Get specific numbers they care about

Generate 6 questions that:
1. Establish baseline metrics for the problem
2. Understand their success criteria
3. Quantify the gap between current and target
4. Tie outcomes to their business metrics
5. Identify who cares about these metrics
6. Set up ROI conversation later`;

const economicBuyerPrompt = `Generate strategy to engage the Economic Buyer (the E in MEDDIC).

Context:
- Company: [COMPANY]
- Suspected Economic Buyer: [NAME/TITLE]
- Champion contact: [WHO YOU'RE WORKING WITH]
- Deal size: [APPROXIMATE VALUE]
- Their initiative: [WHAT THEY'RE SOLVING]

Economic Buyer Engagement Goals:
- Confirm who can actually sign off
- Understand their priorities vs. the team's
- Get direct access or executive sponsorship
- Align your value to what they care about
- Avoid getting stuck in the committee

Generate:
1. Questions to ask your champion about the EB
2. How to position an intro to the EB
3. Key messages for the EB (different from champion)
4. Risks if we don't engage the EB directly
5. Alternative paths if EB access is blocked`;

const championPrompt = `Evaluate and strengthen your Champion (the C in MEDDIC).

Context:
- Champion name: [NAME]
- Champion title: [TITLE]
- Company: [COMPANY]
- How engaged they are: [HIGH/MEDIUM/LOW]
- What they've done so far: [ACTIONS TAKEN]

Champion Evaluation Criteria:
- Access: Can they get you to power?
- Influence: Does their opinion matter internally?
- Motivation: Do they personally win if you win?
- Capability: Can they sell internally when you're not there?
- Trust: Do they share real information with you?

Generate:
1. Champion strength score (1-5) with justification
2. Questions to test if they're a real champion
3. How to arm them for internal selling
4. Content/materials they need to advocate
5. Warning signs if they're not actually a champion
6. Plan B if champion is weak`;

const competitionPrompt = `Analyze competitive positioning (the C in MEDDPICC).

Context:
- Company: [COMPANY]
- Our solution: [WHAT WE OFFER]
- Known competitors: [WHO ELSE THEY'RE EVALUATING]
- Our strengths: [WHERE WE WIN]
- Our weaknesses: [WHERE WE LOSE]

Competitive Analysis Goals:
- Understand where we stand in evaluation
- Identify land mines competitors may have set
- Prepare champion with competitive talking points
- Reframe decision criteria to favor us
- Neutralize competitor strengths

Generate:
1. Questions to uncover competitive dynamics
2. Land mines each competitor likely sets
3. How to reframe criteria in our favor
4. Trap questions for competitors
5. Proof points that neutralize their strengths
6. What to do if we're behind`;

const exampleOutput = `MEDDPICC Scorecard: Acme Corp CRM Evaluation

M - METRICS: 3/5 (Yellow)
Known: They want to increase pipeline by 40% this year
Gap: Don't know current conversion rates or baseline
Next: Ask Sarah about current funnel metrics in next call

E - ECONOMIC BUYER: 2/5 (Red)
Known: CFO (James) must approve >$50K
Gap: No direct engagement, unclear what he cares about
Next: Ask Sarah to intro us, position around cost savings

D - DECISION CRITERIA: 4/5 (Green)
Known: Integration with Salesforce, ease of use, reporting
Gap: Weighting of criteria, who defined them
Next: Confirm if these are the official criteria

D - DECISION PROCESS: 3/5 (Yellow)
Known: Decision by Q1, committee of 4
Gap: Who's on committee, what each cares about
Next: Map the full buying committee

P - PAPER PROCESS: 2/5 (Red)
Known: Legal review required
Gap: Timeline, who in legal, standard terms or custom
Next: Ask about typical procurement timeline

I - IDENTIFY PAIN: 5/5 (Green)
Known: Lost 3 deals last quarter due to slow response times
Personal: Sarah's bonus tied to conversion improvement
Evidence: Shared internal dashboard showing problem

C - CHAMPION: 4/5 (Green)
Known: Sarah has VP ear, motivated by promotion potential
Gap: Hasn't sold internally for us yet
Next: Arm her with ROI deck for VP meeting

C - COMPETITION: 3/5 (Yellow)
Known: Also looking at Competitor X
Gap: Don't know their positioning or who they know
Next: Ask Sarah where we stand vs. competition

OVERALL SCORE: 26/40 - QUALIFIED WITH GAPS
Priority actions: 1) EB engagement 2) Paper process clarity`;

const realExample = `MEDDIC was developed at PTC in the 1990s to create predictable enterprise revenue.

The insight: Most deals stall or lose not because of product—but because of qualification gaps. The champion wasn't real. The economic buyer wasn't engaged. The pain wasn't urgent enough.

MEDDPICC adds Paper Process (procurement complexity) and Competition tracking.

The framework forces honesty. When you can't fill in an element, you know exactly where your deal is weak.`;

const relatedTonalities = [
  { slug: 'challenger', name: 'Challenger', tagline: 'Teach & Reframe' },
  { slug: 'value-based', name: 'Value-Based', tagline: 'ROI-Focused' },
  { slug: 'pain-point-research', name: 'Pain Point Research', tagline: 'Deep Discovery' },
  { slug: 'socratic', name: 'Socratic', tagline: 'Question-Led' },
];

export default function MeddicPage() {
  return (
    <div className="min-h-screen bg-background">

      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="text-center mb-12">
          <Badge variant="accent" className="mb-4">GTM Framework</Badge>
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-orange-400">
              <ClipboardCheck className="h-6 w-6" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              MEDDIC / MEDDPICC
            </h1>
          </div>
          <p className="text-xl text-orange-600 dark:text-orange-400 font-medium mb-4">
            Metrics. Economic Buyer. Decision Criteria. Champion. Competition.
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The enterprise sales qualification framework that creates pipeline predictability.
            Know exactly where each deal is strong—and where it's at risk.
          </p>
        </div>

        {/* Real Example Quote */}
        <div className="bg-zinc-950 rounded-xl p-6 mb-12 border-l-4 border-orange-500">
          <div className="text-zinc-300 space-y-4">
            {realExample.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>

        {/* The Philosophy */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">The Framework</h2>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <p>
              MEDDIC isn't a sales methodology—it's a <strong>qualification framework</strong>. It tells
              you whether a deal is real and what's missing. Without it, you're guessing which deals
              will close.
            </p>
          </div>

          <h3 className="text-lg font-semibold text-foreground mt-8 mb-4">MEDDPICC Elements</h3>
          <div className="grid gap-4">
            <div className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-900">
              <span className="font-bold text-orange-600 dark:text-orange-400">M - Metrics:</span>
              <span className="text-muted-foreground ml-2">What quantified outcomes are they trying to achieve?</span>
            </div>
            <div className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-900">
              <span className="font-bold text-orange-600 dark:text-orange-400">E - Economic Buyer:</span>
              <span className="text-muted-foreground ml-2">Who has the authority and budget to sign off?</span>
            </div>
            <div className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-900">
              <span className="font-bold text-orange-600 dark:text-orange-400">D - Decision Criteria:</span>
              <span className="text-muted-foreground ml-2">What will they evaluate vendors against?</span>
            </div>
            <div className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-900">
              <span className="font-bold text-orange-600 dark:text-orange-400">D - Decision Process:</span>
              <span className="text-muted-foreground ml-2">What's the timeline and approval workflow?</span>
            </div>
            <div className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-900">
              <span className="font-bold text-orange-600 dark:text-orange-400">P - Paper Process:</span>
              <span className="text-muted-foreground ml-2">What's required for procurement and legal?</span>
            </div>
            <div className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-900">
              <span className="font-bold text-orange-600 dark:text-orange-400">I - Identify Pain:</span>
              <span className="text-muted-foreground ml-2">What's the core problem driving this initiative?</span>
            </div>
            <div className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-900">
              <span className="font-bold text-orange-600 dark:text-orange-400">C - Champion:</span>
              <span className="text-muted-foreground ml-2">Who is selling for you when you're not there?</span>
            </div>
            <div className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-900">
              <span className="font-bold text-orange-600 dark:text-orange-400">C - Competition:</span>
              <span className="text-muted-foreground ml-2">Who else are they evaluating? Where do you stand?</span>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-foreground mt-8 mb-4">When to Use</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
              <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">Best For</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Enterprise sales with long cycles</li>
                <li>• Complex deals with multiple stakeholders</li>
                <li>• Pipeline reviews and forecasting</li>
                <li>• Identifying deal risks early</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
              <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">Avoid When</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Transactional, short-cycle sales</li>
                <li>• SMB with single decision maker</li>
                <li>• Inbound leads with clear intent</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Prompts Section */}
        <div className="space-y-8 mb-12">
          <h2 className="text-2xl font-bold text-foreground">The Prompts</h2>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-foreground">Full MEDDPICC Deal Analysis</h3>
              <CopyButton text={qualificationPrompt} />
            </div>
            <div className="bg-zinc-950 rounded-xl p-6 overflow-x-auto">
              <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-mono">{qualificationPrompt}</pre>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-foreground">Metrics Discovery (M)</h3>
              <CopyButton text={metricsPrompt} />
            </div>
            <div className="bg-zinc-950 rounded-xl p-6 overflow-x-auto">
              <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-mono">{metricsPrompt}</pre>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-foreground">Economic Buyer Strategy (E)</h3>
              <CopyButton text={economicBuyerPrompt} />
            </div>
            <div className="bg-zinc-950 rounded-xl p-6 overflow-x-auto">
              <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-mono">{economicBuyerPrompt}</pre>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-foreground">Champion Evaluation (C)</h3>
              <CopyButton text={championPrompt} />
            </div>
            <div className="bg-zinc-950 rounded-xl p-6 overflow-x-auto">
              <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-mono">{championPrompt}</pre>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-foreground">Competition Analysis (C)</h3>
              <CopyButton text={competitionPrompt} />
            </div>
            <div className="bg-zinc-950 rounded-xl p-6 overflow-x-auto">
              <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-mono">{competitionPrompt}</pre>
            </div>
          </div>
        </div>

        {/* Example Output */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Example Output</h2>
          <div className="bg-card border border-border rounded-xl p-6">
            <pre className="text-sm text-foreground whitespace-pre-wrap">{exampleOutput}</pre>
          </div>
        </div>

        {/* Related Tonalities */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Related Methodologies</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedTonalities.map((t) => (
              <Link
                key={t.slug}
                href={`/free-tools/tonalities/${t.slug}`}
                className="p-4 rounded-lg border border-border hover:border-orange-500/50 transition-colors text-center"
              >
                <p className="font-medium text-foreground">{t.name}</p>
                <p className="text-sm text-orange-600 dark:text-orange-400">{t.tagline}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Love this tonality?
          </h2>
          <p className="text-orange-100 mb-6 max-w-xl mx-auto">
            Star the repo to help others discover GTM Skills and save it for later.
          </p>
          <a href="https://github.com/Prospeda/gtm-skills" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-white text-teal-700 hover:bg-zinc-100">
              Star on GitHub
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </div>
      </main>

      <footer className="border-t border-border mt-16">
        <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-muted-foreground text-sm">© {new Date().getFullYear()} Prospeda</div>
          <div className="flex gap-6 text-sm">
            <Link href="/free-tools/tonalities" className="text-muted-foreground hover:text-foreground">All Tonalities</Link>
            <Link href="/free-tools" className="text-muted-foreground hover:text-foreground">Free Tools</Link>
            <a href="https://github.com/Prospeda/claude-gtm-skills" className="text-muted-foreground hover:text-foreground">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
