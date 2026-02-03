import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CopyButton } from '@/components/copy-button';
import { ArrowRight, Building2 } from 'lucide-react';
import type { Metadata } from 'next';
import { TonalityGate } from '@/components/gtm/tonality-gate';

export const metadata: Metadata = {
  title: 'Executive Briefing Tonality | C-Suite Communication | Premium GTM Prompts',
  description: 'Master executive communication. Top-down structure, strategic framing, and boardroom-ready messaging for C-suite conversations. Premium prompts for Claude/ChatGPT.',
  keywords: 'executive communication, c-suite sales, board presentation, executive briefing, strategic selling, enterprise executive engagement',
  openGraph: {
    title: 'Executive Briefing | C-Suite Communication',
    description: 'Master executive communication. Boardroom-ready messaging for C-suite. Premium prompts for Claude & ChatGPT.',
    type: 'website',
  },
};

const coldEmailPrompt = `Write a cold email for a C-suite executive.

Context:
- Executive: [NAME], [TITLE] at [COMPANY]
- Signal: [What triggered this outreach - strategic move, earnings, announcement]
- My product: [What you sell]
- Strategic impact: [How this affects their business strategy]

Executive Email Rules:
- Lead with the strategic point. They don't have time for build-up.
- Connect to their priorities: growth, efficiency, risk, competitive position.
- One idea. Not three things that might be interesting.
- Respect their time—under 75 words.
- No features. Business outcomes only.
- If possible, reference something public they've said or done.
- Make the ask clear and easy to say yes to.
- Write like a peer, not a vendor.

Tone: Strategic, concise, peer-level. Like a note from someone whose time is also valuable.`;

const discoveryCallPrompt = `Generate executive-level discovery questions.

Context:
- Executive: [TITLE] at [COMPANY]
- Company situation: [What you know about their business]
- Strategic area: [WHERE YOUR SOLUTION FITS]
- Your hypothesis: [What you think they care about]

Executive Discovery Approach:

STRATEGIC CONTEXT
- What are your top 3 priorities for the next 12 months?
- How does [your area] fit into that strategy?
- What's changed since you took this role / since last year?

BUSINESS IMPACT
- How do you measure success in [relevant area]?
- What would moving this metric mean for the business?
- What's the cost of not solving this?

DECISION DYNAMICS
- Who else is involved in decisions like this?
- What would need to be true for this to become a priority?
- What's your timeline for making changes in this area?

EXECUTIVE INSIGHT
- What do you see that others in your industry don't?
- What's the biggest risk to your strategy?
- What would your board want to see before approving this?

Keep questions strategic. Don't drill into tactical details they've delegated.`;

const objectionPrompt = `Handle this objection from a C-suite executive.

The objection: [PASTE OBJECTION HERE]

Context:
- Their role: [TITLE]
- My product: [WHAT YOU SELL]
- Strategic value: [HOW THIS HELPS THEIR STRATEGY]

Executive Objection Framework:
- Never argue. Executives hate being challenged on tactical points.
- Reframe to strategic level—connect to their priorities.
- Use peer company examples (they care about what peers are doing).
- If timing is wrong, establish future touchpoint.
- Respect their decision-making authority.
- Make it easy to delegate to someone else if appropriate.

Generate:
1. Strategic acknowledgment (not defensive)
2. Reframe to business outcome
3. Peer company reference (if applicable)
4. Clear, easy next step`;

const linkedinPrompt = `Write a LinkedIn message to a C-suite executive.

Context:
- Executive: [NAME], [TITLE]
- Company: [COMPANY]
- Trigger: [What prompted this outreach]
- Strategic relevance: [Why this matters to their role]

Executive LinkedIn Rules:
- Lead with the strategic point. No warm-up.
- Reference something specific to them (not generic).
- Keep it to 3-4 sentences maximum.
- Make the ask easy—meeting, intro, or quick question.
- Write as a peer. No fawning or over-formality.
- Under 50 words. Executives skim.

Tone: Confident, strategic, respectful of time.`;

const executiveBriefPrompt = `Create an executive brief for this meeting.

Context:
- Executive: [NAME], [TITLE] at [COMPANY]
- Meeting purpose: [WHAT YOU'RE DISCUSSING]
- Their likely priorities: [WHAT THEY CARE ABOUT]
- Your recommendation: [WHAT YOU WANT THEM TO DO]
- Supporting data: [KEY PROOF POINTS]

Executive Brief Structure:

BLUF (Bottom Line Up Front)
- What's the recommendation?
- What's the strategic impact?
- What do you need from them?

STRATEGIC CONTEXT
- Why does this matter now?
- How does it connect to their priorities?
- What's the competitive landscape?

KEY INSIGHTS (3 maximum)
- Insight 1: [Data point + implication]
- Insight 2: [Data point + implication]
- Insight 3: [Data point + implication]

RISK ASSESSMENT
- What happens if they act?
- What happens if they don't?

THE ASK
- What do you need from them specifically?
- What's the timeline?
- What's the next step?

This should fit on one page. Executives don't read, they scan.`;

const exampleOutput = `Subject: Quick thought on Acme's enterprise push

Sarah,

Your investor letter mentioned doubling enterprise revenue by Q4. That usually requires changing how deals get qualified, not just how many get sourced.

We helped Ramp accelerate their enterprise shift by 40% by changing one thing: how they prioritize which deals to pursue.

Worth 15 minutes to see if the same applies to Acme?

— Marcus`;

const realExample = `"If you can't explain it in one page, you don't understand it well enough to present it to an executive."

— Enterprise Sales Wisdom`;

const executiveFramework = [
  { element: 'BLUF', description: 'Bottom Line Up Front', rule: 'Lead with your recommendation, not the journey to get there.' },
  { element: 'So What?', description: 'Strategic Impact', rule: 'Connect everything to their business priorities.' },
  { element: '3 Max', description: 'Three points maximum', rule: 'More than 3 insights = none remembered.' },
  { element: 'Clear Ask', description: 'Specific request', rule: 'What do you need from them? Make it easy to say yes.' },
];

const relatedTonalities = [
  { slug: 'hemingway', name: 'Hemingway', tagline: 'Radically Brief' },
  { slug: 'jeff-bezos', name: 'Jeff Bezos', tagline: 'Customer-Obsessed' },
  { slug: 'command-of-message', name: 'Command of Message', tagline: 'Value Framework' },
  { slug: 'value-based', name: 'Value-Based', tagline: 'ROI-Focused' },
];

export default function ExecutiveBriefingTonalityPage() {
  return (
    <div className="min-h-screen bg-background">

      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="text-center mb-12">
          <Badge variant="accent" className="mb-4">Premium GTM Situation</Badge>
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-orange-400">
              <Building2 className="h-6 w-6" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Executive Briefing
            </h1>
          </div>
          <p className="text-xl text-orange-600 dark:text-orange-400 font-medium mb-4">
            Boardroom Ready. Strategic Framing. Respect Their Time.
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Purpose-built for C-suite conversations. Top-down structure, strategic framing,
            and the discipline to say more with less. Make every word count.
          </p>
        </div>

        {/* Real Example Quote */}
        <div className="bg-zinc-950 rounded-xl p-6 mb-12 border-l-4 border-orange-500">
          <blockquote className="text-zinc-300 italic mb-4">
            {realExample.split('\n\n')[0]}
          </blockquote>
          <p className="text-sm text-zinc-500">{realExample.split('\n\n')[1]}</p>
        </div>

        {/* Executive Framework Table */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">The Executive Communication Framework</h2>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Element</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">What It Means</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">The Rule</th>
                </tr>
              </thead>
              <tbody>
                {executiveFramework.map((row, index) => (
                  <tr key={index} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 font-medium text-orange-600 dark:text-orange-400">{row.element}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.description}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.rule}</td>
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
              Executives think in strategy, not features. They measure in business impact, not product
              capabilities. And they have approximately zero patience for people who waste their time.
            </p>
            <p>
              The discipline here is <strong>ruthless prioritization</strong>. One page max. Three points
              max. Lead with the conclusion. Connect everything to their priorities. If they want details,
              they'll ask. Your job is to earn the right to give them.
            </p>
          </div>

          <h3 className="text-lg font-semibold text-foreground mt-8 mb-4">Key Characteristics</h3>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">BLUF (Bottom Line Up Front).</strong> Lead with the recommendation. They can ask for the story later.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Strategic framing.</strong> Growth, efficiency, risk, competitive position. Not features.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Three points max.</strong> More than three = none remembered.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Clear ask.</strong> What do you need from them? Make it specific and easy.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Peer-level tone.</strong> Respectful but not deferential. Confident but not arrogant.</span>
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mt-8 mb-4">When to Use</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
              <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">Best For</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• C-suite and VP-level conversations</li>
                <li>• Board presentations and QBRs</li>
                <li>• Executive sponsor engagement</li>
                <li>• High-stakes proposals needing sign-off</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
              <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">Avoid When</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Technical evaluation with practitioners</li>
                <li>• Early discovery where detail matters</li>
                <li>• Relationship-building conversations</li>
                <li>• Audiences who want the full story first</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Prompts Section - Gated */}
        <TonalityGate tonalityName="Executive Briefing">
          <div className="space-y-8 mb-12">
            <h2 className="text-2xl font-bold text-foreground">The Prompts</h2>

            {/* Cold Email */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-foreground">Cold Email to Executive</h3>
                <CopyButton text={coldEmailPrompt} />
              </div>
              <div className="bg-zinc-950 rounded-xl p-6 overflow-x-auto">
                <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-mono">{coldEmailPrompt}</pre>
              </div>
            </div>

            {/* Discovery Call */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-foreground">Executive Discovery Questions</h3>
                <CopyButton text={discoveryCallPrompt} />
              </div>
              <div className="bg-zinc-950 rounded-xl p-6 overflow-x-auto">
                <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-mono">{discoveryCallPrompt}</pre>
              </div>
            </div>

            {/* Objection Handling */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-foreground">Executive Objection Handling</h3>
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

            {/* Executive Brief Builder */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-foreground">Executive Brief Builder</h3>
                <CopyButton text={executiveBriefPrompt} />
              </div>
              <div className="bg-zinc-950 rounded-xl p-6 overflow-x-auto">
                <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-mono">{executiveBriefPrompt}</pre>
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
