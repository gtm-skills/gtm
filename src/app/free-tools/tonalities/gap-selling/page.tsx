import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CopyButton } from '@/components/copy-button';
import { ArrowRight, GitCompare } from 'lucide-react';
import type { Metadata } from 'next';
import { TonalityGate } from '@/components/gtm/tonality-gate';

export const metadata: Metadata = {
  title: 'Gap Selling Tonality | Current State to Future State | Premium GTM Prompts',
  description: 'Master Gap Selling. Quantify the delta between current state and desired future. Create urgency through the cost of inaction. Premium prompts for Claude/ChatGPT.',
  keywords: 'gap selling, keenan sales, current state future state, cost of inaction, problem-centric selling, b2b discovery framework',
  openGraph: {
    title: 'Gap Selling Tonality | Current State to Future State',
    description: 'Master Gap Selling. Quantify the gap between where they are and where they need to be. Premium prompts for Claude & ChatGPT.',
    type: 'website',
  },
};

const coldEmailPrompt = `Write a cold email using the Gap Selling framework.

Context:
- Prospect: [NAME], [TITLE] at [COMPANY]
- Signal: [What triggered this outreach - funding, hire, product launch, etc.]
- My product: [What you sell]
- The gap I help close: [Current state problem → Future state outcome]

Gap Selling Email Approach:
- Reference their current state with specificity (what you've observed).
- Hint at where they probably want to be (the future state).
- Quantify the gap if possible—the cost of staying where they are.
- Don't pitch your product. Pitch the conversation about the gap.
- Create urgency through the cost of inaction, not artificial scarcity.
- The goal: make them feel the distance between where they are and where they could be.
- Under 100 words. Make the gap tangible.

Tone: Direct, problem-focused, future-oriented. Like a consultant who's already diagnosed half the problem.`;

const discoveryCallPrompt = `Generate Gap Selling discovery questions.

Context:
- Prospect company: [COMPANY]
- Their industry: [INDUSTRY]
- Suspected current state problem: [WHAT'S LIKELY BROKEN]
- Future state my solution enables: [IDEAL OUTCOME]

Gap Selling Discovery Structure:

CURRENT STATE QUESTIONS (understand where they are)
- What does their world look like today?
- What's working? What's not?
- What are the metrics that matter?
- What have they already tried?
- What's the root cause, not just the symptom?

FUTURE STATE QUESTIONS (understand where they want to be)
- What does success look like?
- If this problem was solved, what changes?
- What metrics would improve?
- What would they do with recovered time/money/resources?

GAP QUANTIFICATION QUESTIONS (make the gap tangible)
- What's the cost of staying in the current state?
- How long can they afford to wait?
- What's at risk if nothing changes?
- What's the opportunity cost?

Generate 3-4 questions for each category. The gap IS the value. Make it impossible to ignore.`;

const objectionPrompt = `Handle this objection using Gap Selling principles.

The objection: [PASTE OBJECTION HERE]

Context:
- My product: [WHAT YOU SELL]
- Why we're better: [KEY DIFFERENTIATOR]
- The gap we close: [CURRENT STATE → FUTURE STATE]

Gap Selling Objection Framework:
- Objections usually mean the gap isn't big enough or clear enough.
- Go back to the current state. Did you fully understand it?
- Go back to the future state. Did they articulate what they want?
- Quantify the cost of staying in the current state.
- The bigger the gap, the smaller the objection.
- If price is the objection, the gap isn't big enough to justify it.

Generate:
1. A question to revisit the current state pain
2. A question to clarify the future state desire
3. A reframe that makes the gap feel larger
4. A cost-of-inaction statement`;

const linkedinPrompt = `Write a LinkedIn message using Gap Selling principles.

Context:
- Recipient: [NAME], [TITLE]
- Connection point: [How you're connected or what triggered this]
- What I want: [Discovery call or conversation]
- The gap I help close: [CURRENT STATE → FUTURE STATE]

Gap Selling LinkedIn Approach:
- Reference a current state challenge relevant to their role.
- Hint at the future state they probably want.
- Imply the gap without overselling.
- Ask if exploring the gap is worth a conversation.
- Under 60 words. Make the gap feel real in few words.

Tone: Problem-aware, forward-looking, low-pressure.`;

const gapAnalysisPrompt = `Create a Gap Selling analysis for this prospect.

Context:
- Prospect company: [COMPANY]
- Their role: [TITLE/FUNCTION]
- Industry: [INDUSTRY]
- What I sell: [PRODUCT/SERVICE]

Generate a complete Gap Analysis:

CURRENT STATE
- Environment: What does their world look like?
- Problems: What's not working? (symptoms)
- Root Cause: Why isn't it working? (underlying issue)
- Impact: What's the business cost today?
- Emotions: What does this feel like for them?

FUTURE STATE
- Ideal Outcome: What do they want to achieve?
- Success Metrics: How would they measure it?
- Business Impact: What would change?
- Timeline: When do they need to get there?

THE GAP
- Gap Size: How far are they from the future state?
- Cost of Inaction: What happens if they stay in current state for 12 months?
- Urgency Drivers: What makes now the right time?
- Your Role: How do you close this gap?

The bigger and more tangible the gap, the more urgent the sale.`;

const exampleOutput = `Subject: The gap between 2% and 4.7%

Sarah,

Your job postings suggest you're scaling the SDR team from 4 to 10.

Here's the gap I keep seeing: most SDR teams at your stage run around 2% meeting rates. The best run 4-5%.

On 3,000 monthly emails, that's the difference between 60 meetings and 140 meetings. Same team, same effort, 80 extra at-bats per month.

The gap isn't the people. It's usually the research process before the send.

Worth exploring whether you're closer to 2% or 5%—and what's creating the difference?

— Marcus`;

const realExample = `"No gap, no sale. The gap is everything. If there's no gap between where someone is and where they want to be, there is no reason for them to buy anything."

— Keenan, Gap Selling`;

const gapFramework = [
  { element: 'Current State', purpose: 'Where they are today', focus: 'Problems, metrics, root causes, impact' },
  { element: 'Future State', purpose: 'Where they want to be', focus: 'Goals, desired outcomes, success metrics' },
  { element: 'The Gap', purpose: 'The distance between them', focus: 'This IS the value. Quantify it.' },
  { element: 'Cost of Inaction', purpose: 'Price of staying put', focus: 'Creates urgency without pressure tactics' },
];

const relatedTonalities = [
  { slug: 'spin-selling', name: 'SPIN Selling', tagline: 'Situation to Need' },
  { slug: 'challenger', name: 'Challenger Sale', tagline: 'Teach & Reframe' },
  { slug: 'value-based', name: 'Value-Based', tagline: 'ROI-Focused' },
  { slug: 'alex-hormozi', name: 'Alex Hormozi', tagline: 'No-BS Value Stack' },
];

export default function GapSellingTonalityPage() {
  return (
    <div className="min-h-screen bg-background">

      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="text-center mb-12">
          <Badge variant="accent" className="mb-4">Premium GTM Methodology</Badge>
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-orange-400">
              <GitCompare className="h-6 w-6" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Gap Selling
            </h1>
          </div>
          <p className="text-xl text-orange-600 dark:text-orange-400 font-medium mb-4">
            Current State → Future State. The Gap IS the Value.
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Based on Keenan's Gap Selling methodology. The distance between where your prospect is
            and where they want to be is the only thing that matters. Make the gap tangible.
          </p>
        </div>

        {/* Real Example Quote */}
        <div className="bg-zinc-950 rounded-xl p-6 mb-12 border-l-4 border-orange-500">
          <blockquote className="text-zinc-300 italic mb-4">
            {realExample.split('\n\n')[0]}
          </blockquote>
          <p className="text-sm text-zinc-500">{realExample.split('\n\n')[1]}</p>
        </div>

        {/* Gap Framework Table */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">The Gap Framework</h2>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Element</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Purpose</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Focus On</th>
                </tr>
              </thead>
              <tbody>
                {gapFramework.map((row, index) => (
                  <tr key={index} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 font-medium text-orange-600 dark:text-orange-400">{row.element}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.purpose}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.focus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* The Philosophy */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">The Philosophy</h2>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <p>
              Gap Selling flips traditional sales on its head. Instead of focusing on your solution,
              you focus entirely on the prospect's problem. The gap between their current state and
              future state IS the value of your solution. No gap = no sale.
            </p>
            <p>
              This methodology creates urgency without pressure tactics. When a prospect truly understands
              the <strong>cost of inaction</strong>—what staying in their current state costs them over
              time—the decision to buy becomes obvious. You don't have to push; the gap pulls.
            </p>
          </div>

          <h3 className="text-lg font-semibold text-foreground mt-8 mb-4">Key Characteristics</h3>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Problem-centric, not solution-centric.</strong> Understand the problem before you ever mention your product.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Quantify the gap.</strong> Vague problems get ignored. Specific, quantified gaps demand action.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Cost of inaction creates urgency.</strong> What happens if they do nothing for 12 months?</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Future state is emotional.</strong> People buy the vision of where they want to be, not the features that get them there.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">No gap, no sale.</strong> If they're content with their current state, there's no deal to be made.</span>
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mt-8 mb-4">When to Use</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
              <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">Best For</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Complex B2B with long sales cycles</li>
                <li>• Prospects who don't know they have a problem</li>
                <li>• Creating urgency without manipulation</li>
                <li>• Deals stuck in "maybe" / no decision</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
              <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">Avoid When</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Prospect already knows exactly what they want</li>
                <li>• Simple, transactional sales</li>
                <li>• RFP responses where requirements are fixed</li>
                <li>• They're already at their desired future state</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Prompts Section - Gated */}
        <TonalityGate tonalityName="Gap Selling">
          <div className="space-y-8 mb-12">
            <h2 className="text-2xl font-bold text-foreground">The Prompts</h2>

            {/* Cold Email */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-foreground">Cold Email</h3>
                <CopyButton text={coldEmailPrompt} />
              </div>
              <div className="bg-zinc-950 rounded-xl p-6 overflow-x-auto">
                <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-mono">{coldEmailPrompt}</pre>
              </div>
            </div>

            {/* Discovery Call */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-foreground">Discovery Call Questions</h3>
                <CopyButton text={discoveryCallPrompt} />
              </div>
              <div className="bg-zinc-950 rounded-xl p-6 overflow-x-auto">
                <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-mono">{discoveryCallPrompt}</pre>
              </div>
            </div>

            {/* Objection Handling */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-foreground">Objection Handling</h3>
                <CopyButton text={objectionPrompt} />
              </div>
              <div className="bg-zinc-950 rounded-xl p-6 overflow-x-auto">
                <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-mono">{objectionPrompt}</pre>
              </div>
            </div>

            {/* LinkedIn Message */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-foreground">LinkedIn Message</h3>
                <CopyButton text={linkedinPrompt} />
              </div>
              <div className="bg-zinc-950 rounded-xl p-6 overflow-x-auto">
                <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-mono">{linkedinPrompt}</pre>
              </div>
            </div>

            {/* Gap Analysis */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-foreground">Gap Analysis Builder</h3>
                <CopyButton text={gapAnalysisPrompt} />
              </div>
              <div className="bg-zinc-950 rounded-xl p-6 overflow-x-auto">
                <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-mono">{gapAnalysisPrompt}</pre>
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
        </TonalityGate>

        {/* Related Tonalities */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Other Tonalities</h2>
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
          <a href="https://github.com/gtm-skills/gtm" target="_blank" rel="noopener noreferrer">
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
            <a href="https://github.com/gtm-skills/gtm" className="text-muted-foreground hover:text-foreground">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
