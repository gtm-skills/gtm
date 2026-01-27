import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CopyButton } from '@/components/copy-button';
import { ArrowRight, TrendingUp } from 'lucide-react';
import type { Metadata } from 'next';
import { TonalityGate } from '@/components/gtm/tonality-gate';

export const metadata: Metadata = {
  title: 'Alex Hormozi Tonality | No-BS Value Stack Sales Writing | Premium GTM Prompts',
  description: 'Write like Alex Hormozi. Direct, math-driven, value stacking that makes the price feel irrelevant. Premium prompts for Claude/ChatGPT.',
  keywords: 'alex hormozi sales style, $100M offers, value stacking, grand slam offer, no brainer offer, hormozi copywriting, acquisition.com style',
  openGraph: {
    title: 'Alex Hormozi Tonality | No-BS Value Stack Sales Writing',
    description: 'Write like Alex Hormozi. Direct, math-driven, value stacking. Premium prompts for Claude & ChatGPT.',
    type: 'website',
  },
};

const coldEmailPrompt = `Write a cold email in the Alex Hormozi tonality.

Context:
- Prospect: [NAME], [TITLE] at [COMPANY]
- Signal: [What triggered this outreach - funding, hire, product launch, etc.]
- My product: [What you sell]
- Key differentiator: [Why you're superior to alternatives]
- Specific result we deliver: [Concrete outcome with numbers]

Alex Hormozi Style Rules:
- Lead with a specific, bold claim. No vague promises.
- Use exact numbers, not ranges. "$47,382" not "tens of thousands."
- Stack value—list everything they get, one line at a time.
- Make the math obvious. Show the ROI calculation explicitly.
- Speak directly to their pain. Don't soften it.
- Create a "no-brainer" frame—the value so exceeds the cost that saying no seems irrational.
- No fluff. Every sentence must earn its place.
- End with a clear, low-friction CTA.
- Under 150 words but dense with value.

Tone: Confident, direct, math-obsessed. Like talking to someone who's already 10 steps ahead.`;

const discoveryCallPrompt = `Generate Alex Hormozi-style discovery questions.

Context:
- Prospect company: [COMPANY]
- Their likely problem: [PROBLEM AREA]
- My solution: [WHAT YOU OFFER]

Alex Hormozi Approach to Discovery:
- Quantify the pain immediately. "How much is this costing you?"
- Get specific numbers. Revenue lost, time wasted, opportunities missed.
- Expose the gap between where they are and where they should be.
- Calculate the cost of inaction in dollars, not feelings.
- Find their "hair on fire" problem—the one they'd pay anything to solve.
- Don't ask permission to be direct. Just be direct.

Generate 5 questions that:
1. Force them to quantify their current problem in dollars
2. Reveal what they've already tried and why it failed
3. Expose the true cost of doing nothing for another 6 months
4. Identify their specific success metric (not a vague goal)
5. Determine if they're actually ready to invest to solve it`;

const objectionPrompt = `Handle this objection in the Alex Hormozi tonality.

The objection: [PASTE OBJECTION HERE]

Context:
- My product: [WHAT YOU SELL]
- Why we're better: [KEY DIFFERENTIATOR]
- Specific result we deliver: [Concrete outcome with numbers]

Alex Hormozi Response Framework:
- Don't dodge the objection. Address it head-on.
- Reframe with math. Make the numbers do the convincing.
- Stack the value again—remind them what they're getting.
- Isolate: "So if [objection] wasn't an issue, you'd move forward?"
- Create contrast: Show the cost of NOT solving this problem.
- Use specific proof—case study with exact numbers.
- Make saying no feel like leaving money on the table.

Generate a response that uses logic and math to dismantle the objection.`;

const linkedinPrompt = `Write a LinkedIn message in the Alex Hormozi tonality.

Context:
- Recipient: [NAME], [TITLE]
- Connection point: [How you're connected or what triggered this]
- What I want: [Meeting, intro, feedback, etc.]
- Specific value I can offer: [Concrete outcome]

Alex Hormozi LinkedIn Rules:
- Open with a bold, specific claim relevant to them.
- No "hope you're doing well." Get to the point.
- Reference something specific about their business.
- Show you've done the math on their situation.
- Make a clear offer with a specific outcome.
- Remove friction—make responding effortless.
- Under 75 words. Dense, not long.

Tone: Direct, valuable, zero small talk. Like a text from someone who's too busy to waste words.`;

const valueStackPrompt = `Create an Alex Hormozi-style value stack for this offer.

Context:
- Product/service: [WHAT YOU SELL]
- Core promise: [Main outcome delivered]
- Price point: [What it costs]
- Target customer: [Who this is for]

Alex Hormozi Value Stack Framework:
For each component, provide:
1. What it is (name the thing)
2. What it does (the outcome)
3. What it's worth (anchor value higher than total price)

Structure:
- Core offer (the main thing they're buying)
- Bonus 1: Tool/resource that accelerates results
- Bonus 2: Access/community that provides ongoing support
- Bonus 3: Guarantee that eliminates risk

Then calculate:
- Total value of everything
- Actual price
- Savings/difference
- "No-brainer" framing statement

Make the math so obvious that the price feels almost unfair.`;

const exampleOutput = `Subject: Quick math on your outbound

Hey Sarah,

Your SDR team sends 2,000 emails/month. Industry average: 1% meeting rate = 20 meetings.

We got Ramp to 4.7%. Same volume = 94 meetings.

74 extra meetings × $15K ACV × 20% close rate = $222K in new pipeline. Monthly.

We charge $8K/month.

That's a 27x return if we only hit half what we did for Ramp.

Worth a 15-minute call to see if the math works for you?

— Marcus

P.S. If I'm wrong about your numbers, I'll send you the framework we used anyway. No pitch.`;

const realExample = `"Make people an offer so good they would feel stupid saying no."

— Alex Hormozi, $100M Offers`;

const relatedTonalities = [
  { slug: 'steve-jobs', name: 'Steve Jobs', tagline: 'Brutally Direct' },
  { slug: 'value-based', name: 'Value-Based', tagline: 'ROI-Focused' },
  { slug: 'challenger', name: 'Challenger Sale', tagline: 'Teach & Reframe' },
  { slug: 'gap-selling', name: 'Gap Selling', tagline: 'Future State Focus' },
];

export default function AlexHormoziTonalityPage() {
  return (
    <div className="min-h-screen bg-background">

      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="text-center mb-12">
          <Badge variant="accent" className="mb-4">Premium GTM Tonality</Badge>
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-orange-400">
              <TrendingUp className="h-6 w-6" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Alex Hormozi
            </h1>
          </div>
          <p className="text-xl text-orange-600 dark:text-orange-400 font-medium mb-4">
            No-BS Value Stack. Math-Driven. Make Saying No Feel Stupid.
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Based on $100M Offers and Acquisition.com playbooks. Stack so much value that
            price becomes irrelevant. Let the math do the selling.
          </p>
        </div>

        {/* Real Example Quote */}
        <div className="bg-zinc-950 rounded-xl p-6 mb-12 border-l-4 border-orange-500">
          <blockquote className="text-zinc-300 italic mb-4">
            {realExample.split('\n\n')[0]}
          </blockquote>
          <p className="text-sm text-zinc-500">{realExample.split('\n\n')[1]}</p>
        </div>

        {/* The Philosophy */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">The Philosophy</h2>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <p>
              Hormozi doesn't persuade. He calculates. Every offer is engineered so the ROI is
              undeniable. When the math is obvious, objections disappear.
            </p>
            <p>
              This tonality works because it <strong>removes emotion from the decision</strong>.
              You're not asking them to trust you. You're asking them to trust arithmetic.
              When the value clearly exceeds the price, buying becomes the rational choice.
            </p>
          </div>

          <h3 className="text-lg font-semibold text-foreground mt-8 mb-4">Key Characteristics</h3>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Specific numbers.</strong> "$47,382" not "tens of thousands." Precision signals competence.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Value stacking.</strong> List every component. Make the total value dwarf the price.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Explicit ROI math.</strong> Show the calculation. Don't make them figure it out.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Direct pain acknowledgment.</strong> Name their problem clearly. Don't soften it.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">No-brainer framing.</strong> Make saying no feel irrational, not pressured.</span>
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mt-8 mb-4">When to Use</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
              <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">Best For</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• ROI-focused buyers who think in spreadsheets</li>
                <li>• Competitive deals where value must be obvious</li>
                <li>• Pricing conversations and budget objections</li>
                <li>• Offers with quantifiable outcomes</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
              <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">Avoid When</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Relationship-first buyers who find directness abrasive</li>
                <li>• Early discovery where listening matters more</li>
                <li>• Products without clear, quantifiable ROI</li>
                <li>• Regulated industries requiring softer touch</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Prompts Section - Gated */}
        <TonalityGate tonalityName="Alex Hormozi">
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

            {/* Value Stack Builder */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-foreground">Value Stack Builder</h3>
                <CopyButton text={valueStackPrompt} />
              </div>
              <div className="bg-zinc-950 rounded-xl p-6 overflow-x-auto">
                <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-mono">{valueStackPrompt}</pre>
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
