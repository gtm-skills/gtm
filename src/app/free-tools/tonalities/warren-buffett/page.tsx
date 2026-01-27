import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CopyButton } from '@/components/copy-button';
import { ArrowRight, Scale } from 'lucide-react';
import type { Metadata } from 'next';
import { TonalityGate } from '@/components/gtm/tonality-gate';

export const metadata: Metadata = {
  title: 'Warren Buffett Tonality | Folksy Authority Sales Writing | Premium GTM Prompts',
  description: 'Write like Warren Buffett. Simple language, Midwestern humility, long-term thinking. Premium prompts for Claude/ChatGPT to build trust with skeptical buyers.',
  keywords: 'warren buffett communication style, berkshire hathaway letters, simple business writing, trust building sales, long-term relationship selling, folksy sales approach',
  openGraph: {
    title: 'Warren Buffett Tonality | Folksy Authority Sales Writing',
    description: 'Write like Warren Buffett. Simple language, Midwestern humility, long-term thinking. Premium prompts for Claude & ChatGPT.',
    type: 'website',
  },
};

const coldEmailPrompt = `Write a cold email in the Warren Buffett tonality.

Context:
- Prospect: [NAME], [TITLE] at [COMPANY]
- Signal: [What triggered this outreach - funding, hire, product launch, etc.]
- My product: [What you sell]
- Key differentiator: [Why you're superior to alternatives]

Warren Buffett Style Rules:
- Simple, plain language. If a sixth grader can't understand it, rewrite it.
- No jargon, no buzzwords, no "synergize" or "leverage."
- Be honest about what you don't know. Admit limitations upfront.
- Focus on long-term value, not quick wins.
- Use folksy analogies from everyday life (not finance).
- Self-deprecating where appropriate—don't take yourself too seriously.
- Show you've done your homework on their business.
- Make the case for partnership, not a transaction.
- Under 100 words. Clear beats clever.

Tone: Warm, honest, patient. Like a letter from a trusted uncle who happens to be brilliant.`;

const discoveryCallPrompt = `Generate Warren Buffett-style discovery questions.

Context:
- Prospect company: [COMPANY]
- Their likely problem: [PROBLEM AREA]
- My solution: [WHAT YOU OFFER]

Warren Buffett Approach to Discovery:
- Ask simple questions that get to the heart of the matter
- Focus on the business fundamentals, not the symptoms
- Be genuinely curious, not interrogating
- Look for "moats"—what makes their business durable
- Understand what they worry about at night
- Don't pretend to know more than you do

Generate 5 questions that:
1. Reveal the true economics of their business
2. Uncover what they'd do if they had unlimited time/resources
3. Explore what's worked in the past and why
4. Identify their biggest long-term concerns
5. Build rapport through genuine curiosity, not technique`;

const objectionPrompt = `Handle this objection in the Warren Buffett tonality.

The objection: [PASTE OBJECTION HERE]

Context:
- My product: [WHAT YOU SELL]
- Why we're better: [KEY DIFFERENTIATOR]

Warren Buffett Response Framework:
- Acknowledge the concern directly. Don't dismiss it.
- Be honest—if the concern is valid, say so.
- Reframe around long-term value, not short-term pressure.
- Use a simple analogy to make the point clear.
- Admit what you don't know or can't promise.
- Let them make the decision without pressure.
- If it's not a fit, say so clearly.

Generate a response that builds trust through honesty, not persuasion techniques.`;

const linkedinPrompt = `Write a LinkedIn message in the Warren Buffett tonality.

Context:
- Recipient: [NAME], [TITLE]
- Connection point: [How you're connected or what triggered this]
- What I want: [Meeting, intro, feedback, etc.]

Warren Buffett LinkedIn Rules:
- Be direct about why you're reaching out.
- No flattery that sounds hollow.
- Show you've actually looked at their business.
- Explain why you think there's mutual benefit—be specific.
- Keep it simple. Short sentences.
- Make it easy to say no—removes pressure.
- Under 60 words. Respect their time.

Tone: Friendly, genuine, no-pressure. Like a note from someone who'd be perfectly fine if they said no.`;

const trustBuildingPrompt = `Write a trust-building follow-up email in the Warren Buffett tonality.

Context:
- Prospect: [NAME], [TITLE] at [COMPANY]
- Previous conversation: [What you discussed]
- Something valuable to share: [Insight, article, introduction]

Warren Buffett Trust-Building Approach:
- Give before you ask. Share something useful with no strings attached.
- Reference something specific from your conversation—show you listened.
- Don't mention your product or the deal.
- Be genuinely helpful, not strategically helpful.
- Keep it brief—valuable doesn't mean long.
- Make no asks. Just give.

Generate an email that builds relationship through generosity, not obligation.`;

const exampleOutput = `Subject: Thoughts on your pricing model

Hi Sarah,

I've been reading about Acme's expansion into enterprise. Congratulations—that's not easy to do.

I noticed you're using consumption-based pricing. We've seen a few companies at your stage hit a wall with that model around $20M ARR. The sales motion changes in ways that surprise people.

I'm not sure if you're seeing that yet. If you are, I'd be happy to share what we learned helping Stripe and Notion navigate the same transition.

No pressure either way. Just thought it might be useful.

— Tom`;

const realExample = `"I try to buy stock in businesses that are so wonderful that an idiot can run them. Because sooner or later, one will."

— Warren Buffett, on investing in durable businesses`;

const relatedTonalities = [
  { slug: 'trusted-advisor', name: 'Trusted Advisor', tagline: 'Relationship-First' },
  { slug: 'value-based', name: 'Value-Based', tagline: 'ROI-Focused' },
  { slug: 'jeff-bezos', name: 'Jeff Bezos', tagline: 'Customer-Obsessed' },
  { slug: 'naval-ravikant', name: 'Naval Ravikant', tagline: 'First Principles' },
];

export default function WarrenBuffettTonalityPage() {
  return (
    <div className="min-h-screen bg-background">

      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="text-center mb-12">
          <Badge variant="accent" className="mb-4">Premium GTM Tonality</Badge>
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-orange-400">
              <Scale className="h-6 w-6" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Warren Buffett
            </h1>
          </div>
          <p className="text-xl text-orange-600 dark:text-orange-400 font-medium mb-4">
            Folksy Authority. Simple Language. Long-Term Trust.
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Based on 50+ years of Berkshire Hathaway shareholder letters. No jargon. No pressure.
            Build trust through honesty, simplicity, and genuine long-term thinking.
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
              Buffett doesn't sell. He explains. His shareholder letters are masterclasses in making
              complex ideas simple, admitting mistakes openly, and building trust through consistency
              over decades.
            </p>
            <p>
              This tonality works because it signals <strong>trustworthiness</strong>. In a world of
              hype and pressure tactics, someone who speaks plainly and admits what they don't know
              stands out. You become the person buyers <em>want</em> to do business with.
            </p>
          </div>

          <h3 className="text-lg font-semibold text-foreground mt-8 mb-4">Key Characteristics</h3>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Simple language.</strong> If a sixth grader can't understand it, rewrite it.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Honest about limitations.</strong> Admit what you don't know. It builds more trust than pretending.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Long-term framing.</strong> Think in decades, not quarters. Partnerships, not transactions.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Folksy analogies.</strong> Explain business through everyday metaphors—farming, baseball, cooking.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">No pressure.</strong> Let prospects decide. Make it easy to say no.</span>
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mt-8 mb-4">When to Use</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
              <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">Best For</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Skeptical buyers burned by overselling</li>
                <li>• CFO and finance-oriented conversations</li>
                <li>• Long sales cycles requiring trust</li>
                <li>• Competing against flashy, hype-driven competitors</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
              <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">Avoid When</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Urgency is genuinely needed (real deadlines)</li>
                <li>• Buyers expect bold, visionary pitches</li>
                <li>• Startup founders wanting to "move fast"</li>
                <li>• Highly technical audiences wanting specs</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Prompts Section - Gated */}
        <TonalityGate tonalityName="Warren Buffett">
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

            {/* Trust Building Follow-up */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-foreground">Trust-Building Follow-up</h3>
                <CopyButton text={trustBuildingPrompt} />
              </div>
              <div className="bg-zinc-950 rounded-xl p-6 overflow-x-auto">
                <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-mono">{trustBuildingPrompt}</pre>
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
