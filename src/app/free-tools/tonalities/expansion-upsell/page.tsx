import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CopyButton } from '@/components/copy-button';
import { ArrowRight, TrendingUp } from 'lucide-react';
import type { Metadata } from 'next';
import { TonalityGate } from '@/components/gtm/tonality-gate';

export const metadata: Metadata = {
  title: 'Expansion & Upsell Tonality | Land & Expand Sales | Premium GTM Prompts',
  description: 'Master expansion selling. Leverage existing success to grow accounts. Premium prompts for CSMs, AMs, and NRR-driven teams.',
  keywords: 'expansion selling, upsell strategy, land and expand, account growth, NRR strategy, customer expansion, account management',
  openGraph: {
    title: 'Expansion & Upsell | Land & Expand Sales',
    description: 'Master expansion selling. Grow accounts by leveraging existing success. Premium prompts for Claude & ChatGPT.',
    type: 'website',
  },
};

const expansionEmailPrompt = `Write an expansion/upsell email to an existing customer.

Context:
- Customer contact: [NAME], [TITLE] at [COMPANY]
- What they currently use: [CURRENT PRODUCT/TIER]
- Results they've achieved: [METRICS/OUTCOMES]
- Expansion opportunity: [ADDITIONAL PRODUCT, SEATS, TIER]
- Trigger: [Why now - team growth, initiative, results milestone]

Expansion Email Rules:
- Lead with THEIR success, not your product.
- Use their own data/results as the proof point.
- Frame expansion as the natural next step, not a new purchase.
- Connect to something that's changed (team size, goals, usage).
- Make it feel like you're helping them get more value, not selling more.
- Reference specific results they've seen.
- Position new capability as unlocking even better outcomes.
- Clear, low-friction next step.
- Under 100 words. Celebratory, not salesy.

Tone: Helpful, celebratory of their success, consultative. Like a trusted advisor seeing an opportunity.`;

const discoveryCallPrompt = `Generate expansion discovery questions for an existing customer.

Context:
- Customer: [COMPANY]
- Current usage: [WHAT THEY USE TODAY]
- Results achieved: [OUTCOMES/METRICS]
- Potential expansion: [WHAT YOU WANT TO SELL]

Expansion Discovery Approach:

SUCCESS VALIDATION
- What results have you seen since implementing?
- How has [your product] changed how your team works?
- What would you tell a peer about your experience?

EVOLUTION OF NEEDS
- What's changed in your business since we started working together?
- Are there new teams or use cases that have come up?
- What challenges have emerged as you've grown?

EXPANSION SIGNALS
- Are there other teams who could benefit from what you're seeing?
- What would you do with [expanded capability]?
- Where are you hitting limitations with your current setup?

TIMING & STAKEHOLDERS
- Is this something you'd want to explore this quarter?
- Who else should be part of this conversation?
- What would need to happen to make this a priority?

The best expansion conversations start with their success, not your pitch.`;

const objectionPrompt = `Handle this objection in an expansion conversation.

The objection: [PASTE OBJECTION HERE]

Context:
- What they currently use: [CURRENT PRODUCT/TIER]
- Their results so far: [SUCCESS METRICS]
- Expansion being proposed: [ADDITIONAL PRODUCT/SEATS/TIER]

Expansion Objection Framework:
- "Budget isn't approved" = Help them build the business case from current ROI
- "We're not using what we have" = Understand why, solve adoption first
- "Not the right time" = Establish future trigger, stay in touch
- "Need to involve others" = Offer to help make the case

Generate:
1. Acknowledgment that validates their concern
2. Reference to the success they've already seen
3. Question to understand the real blocker
4. Offer to help (not push)`;

const linkedinPrompt = `Write a LinkedIn message to expand within an existing account.

Context:
- Contact: [NAME], [TITLE] at [COMPANY] (existing customer)
- Relationship: [YOUR CURRENT ENGAGEMENT]
- Expansion angle: [WHAT YOU WANT TO DISCUSS]
- Their recent success: [SPECIFIC RESULT/MILESTONE]

Expansion LinkedIn Approach:
- Lead with genuine congratulations on their success.
- Reference something specific to their results.
- Introduce the expansion idea as a thought, not a pitch.
- Make the ask a conversation, not a commitment.
- Under 50 words. Warm, helpful, not salesy.

Tone: Trusted partner sharing an idea. Celebratory first.`;

const businessCasePrompt = `Build an expansion business case for this customer.

Context:
- Customer: [COMPANY]
- Current product/tier: [WHAT THEY HAVE]
- Results achieved: [CURRENT ROI/OUTCOMES]
- Proposed expansion: [ADDITIONAL PRODUCT/SEATS/TIER]
- Expansion cost: [PRICE OF EXPANSION]

Generate an Expansion Business Case:

CURRENT VALUE SUMMARY
- What they're paying today
- Results/ROI they've achieved
- Key metrics that have improved

EXPANSION OPPORTUNITY
- What the expansion includes
- What new capabilities it unlocks
- Which teams/use cases it serves

PROJECTED VALUE
- Expected additional ROI
- New metrics that would improve
- Time to value for expansion

THE MATH
- Current investment: $X
- Current ROI: Y%
- Expansion investment: $Z
- Projected additional ROI: W%
- Net value increase: $N

WHY NOW
- What's changed that makes this timely
- Cost of waiting
- Competitive/market considerations

NEXT STEPS
- Who needs to approve
- What information they need
- Proposed timeline

Make it easy for your champion to sell internally.`;

const exampleOutput = `Subject: Congrats on the 47% improvement

Sarah,

Just saw your Q3 numbers come through—47% improvement in meeting rate since you started with us in June. That's legitimately impressive.

Quick thought: your SDR team has grown from 5 to 12 since then. The research workflows that worked at 5 often need tuning at 12+ (different ramp challenges, coverage gaps, etc.).

We have a few things that help larger teams keep that quality bar high as they scale. Would it be useful to explore whether any of them fit where you're headed?

— Marcus`;

const realExample = `"The best expansion doesn't feel like upselling. It feels like helping them get more of what's already working."

— Account Management Wisdom`;

const expansionSignals = [
  { signal: 'Team Growth', indicator: 'Hiring in departments using your product', action: 'Proactive reach-out about scaling' },
  { signal: 'Usage Milestone', indicator: 'Hit a limit or achieved strong results', action: 'Celebrate and explore next level' },
  { signal: 'New Initiative', indicator: 'Announced strategy that aligns with your expansion', action: 'Connect initiative to expanded capability' },
  { signal: 'Renewal Approaching', indicator: '60-90 days before contract renewal', action: 'Bundle expansion into renewal conversation' },
];

const relatedTonalities = [
  { slug: 'trusted-advisor', name: 'Trusted Advisor', tagline: 'Relationship-First' },
  { slug: 'value-based', name: 'Value-Based', tagline: 'ROI-Focused' },
  { slug: 'command-of-message', name: 'Command of Message', tagline: 'Value Framework' },
  { slug: 'executive-briefing', name: 'Executive Briefing', tagline: 'Boardroom Ready' },
];

export default function ExpansionUpsellTonalityPage() {
  return (
    <div className="min-h-screen bg-background">

      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="text-center mb-12">
          <Badge variant="accent" className="mb-4">Premium GTM Situation</Badge>
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-orange-400">
              <TrendingUp className="h-6 w-6" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Expansion & Upsell
            </h1>
          </div>
          <p className="text-xl text-orange-600 dark:text-orange-400 font-medium mb-4">
            Land & Expand. Leverage Success. Grow Naturally.
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Purpose-built for CSMs, AMs, and anyone driving NRR. Turn existing success into expansion
            opportunities. Make growth feel like the natural next step, not a new sale.
          </p>
        </div>

        {/* Real Example Quote */}
        <div className="bg-zinc-950 rounded-xl p-6 mb-12 border-l-4 border-orange-500">
          <blockquote className="text-zinc-300 italic mb-4">
            {realExample.split('\n\n')[0]}
          </blockquote>
          <p className="text-sm text-zinc-500">{realExample.split('\n\n')[1]}</p>
        </div>

        {/* Expansion Signals Table */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Expansion Signals to Watch</h2>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Signal</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">What to Look For</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Your Action</th>
                </tr>
              </thead>
              <tbody>
                {expansionSignals.map((row, index) => (
                  <tr key={index} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 font-medium text-orange-600 dark:text-orange-400">{row.signal}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.indicator}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.action}</td>
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
              Expansion selling is fundamentally different from new business. You're not convincing
              someone to trust you—they already do. The question is whether they're getting all the
              value they could from the relationship.
            </p>
            <p>
              The key insight: <strong>lead with their success, not your product</strong>. When you
              celebrate what they've achieved and connect expansion to getting even more of that,
              it doesn't feel like an upsell. It feels like the obvious next step.
            </p>
          </div>

          <h3 className="text-lg font-semibold text-foreground mt-8 mb-4">Key Characteristics</h3>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Lead with their success.</strong> Use their data, their results, their story as the foundation.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Natural next step framing.</strong> Expansion should feel like continuation, not new purchase.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Watch for signals.</strong> Team growth, usage milestones, new initiatives, renewals.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Help them build the case.</strong> Give champions the ammo to sell internally.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Trusted advisor tone.</strong> You're helping them get more value, not selling more stuff.</span>
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mt-8 mb-4">When to Use</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
              <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">Best For</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Happy customers seeing strong results</li>
                <li>• Accounts approaching usage limits or milestones</li>
                <li>• Teams that have grown since initial purchase</li>
                <li>• Renewal conversations with expansion potential</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
              <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">Avoid When</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Customer isn't seeing value from current product</li>
                <li>• Relationship is rocky or trust is damaged</li>
                <li>• They're not fully using what they have</li>
                <li>• No clear trigger or need for expansion</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Prompts Section - Gated */}
        <TonalityGate tonalityName="Expansion & Upsell">
          <div className="space-y-8 mb-12">
            <h2 className="text-2xl font-bold text-foreground">The Prompts</h2>

            {/* Expansion Email */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-foreground">Expansion Email</h3>
                <CopyButton text={expansionEmailPrompt} />
              </div>
              <div className="bg-zinc-950 rounded-xl p-6 overflow-x-auto">
                <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-mono">{expansionEmailPrompt}</pre>
              </div>
            </div>

            {/* Discovery Call */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-foreground">Expansion Discovery Questions</h3>
                <CopyButton text={discoveryCallPrompt} />
              </div>
              <div className="bg-zinc-950 rounded-xl p-6 overflow-x-auto">
                <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-mono">{discoveryCallPrompt}</pre>
              </div>
            </div>

            {/* Objection Handling */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-foreground">Expansion Objection Handling</h3>
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

            {/* Business Case Builder */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-foreground">Expansion Business Case Builder</h3>
                <CopyButton text={businessCasePrompt} />
              </div>
              <div className="bg-zinc-950 rounded-xl p-6 overflow-x-auto">
                <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-mono">{businessCasePrompt}</pre>
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
