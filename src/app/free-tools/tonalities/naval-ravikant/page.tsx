import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CopyButton } from '@/components/copy-button';
import { ArrowRight, Compass } from 'lucide-react';
import type { Metadata } from 'next';
import { TonalityGate } from '@/components/gtm/tonality-gate';

export const metadata: Metadata = {
  title: 'Naval Ravikant Tonality | First Principles Sales Writing | Premium GTM Prompts',
  description: 'Write like Naval Ravikant. Philosophical depth in few words. First principles thinking that reframes problems at their root. Premium prompts for Claude/ChatGPT.',
  keywords: 'naval ravikant communication style, first principles thinking, specific knowledge, leverage thinking, navalmanack style, twitter wisdom sales',
  openGraph: {
    title: 'Naval Ravikant Tonality | First Principles Sales Writing',
    description: 'Write like Naval Ravikant. Philosophical depth in few words. First principles clarity. Premium prompts for Claude & ChatGPT.',
    type: 'website',
  },
};

const coldEmailPrompt = `Write a cold email in the Naval Ravikant tonality.

Context:
- Prospect: [NAME], [TITLE] at [COMPANY]
- Signal: [What triggered this outreach - funding, hire, product launch, etc.]
- My product: [What you sell]
- Key differentiator: [Why you're superior to alternatives]

Naval Ravikant Style Rules:
- Strip away everything non-essential. Each sentence should be complete on its own.
- Think in first principles—what's the root truth here?
- Use leverage language: what compounds? What scales without you?
- Avoid status games. Don't name-drop or flex.
- Aphoristic where possible—wisdom compressed into a line.
- Be specific about mechanisms, not just outcomes.
- No corporate speak. Write like you're thinking out loud.
- Make them see something they couldn't see before.
- Under 80 words. Density over length.

Tone: Calm, clear, slightly detached. Like talking to someone who's already figured it out.`;

const discoveryCallPrompt = `Generate Naval Ravikant-style discovery questions.

Context:
- Prospect company: [COMPANY]
- Their likely problem: [PROBLEM AREA]
- My solution: [WHAT YOU OFFER]

Naval Ravikant Approach to Discovery:
- Go to the root. Don't ask about symptoms.
- Challenge conventional wisdom gently.
- Look for leverage points—where does small input create large output?
- Identify what compounds over time vs. what's linear.
- Find the specific knowledge they've built (unique insight).
- Understand what game they're actually playing.

Generate 5 questions that:
1. Reveal the first principles of their business (not the surface metrics)
2. Expose where they're trading time for money instead of building leverage
3. Uncover what they know that competitors don't (specific knowledge)
4. Identify what would compound if they solved this problem
5. Challenge an assumption they haven't questioned`;

const objectionPrompt = `Handle this objection in the Naval Ravikant tonality.

The objection: [PASTE OBJECTION HERE]

Context:
- My product: [WHAT YOU SELL]
- Why we're better: [KEY DIFFERENTIATOR]

Naval Ravikant Response Framework:
- Don't argue. Reframe at a deeper level.
- Go to first principles—why does this objection exist?
- Use leverage thinking—show the compounding effect of solving vs. not solving.
- Stay calm. Detachment signals confidence.
- Offer a mental model, not a rebuttal.
- Make them see the objection differently, not just overcome it.
- If the objection is valid, acknowledge it clearly.

Generate a response that elevates the conversation, not wins the argument.`;

const linkedinPrompt = `Write a LinkedIn message in the Naval Ravikant tonality.

Context:
- Recipient: [NAME], [TITLE]
- Connection point: [How you're connected or what triggered this]
- What I want: [Meeting, intro, feedback, etc.]

Naval Ravikant LinkedIn Rules:
- One clear idea. No padding.
- Share an insight that shifts their thinking.
- Avoid social scripts ("Hope you're well").
- Be specific about the value—what lever moves what outcome.
- No status signaling. Let the idea speak.
- Make the ask clear but low-pressure.
- Under 50 words. Compress the wisdom.

Tone: Thoughtful, calm, clear. Like a note from someone who values your time because they value their own.`;

const reframingPrompt = `Create a Naval Ravikant-style reframing for this problem.

Context:
- The conventional view: [How most people see this problem]
- The prospect's current approach: [What they're doing now]
- What I want them to see: [The insight I want to convey]

Naval Ravikant Reframing Approach:
- Start from first principles. What's actually true here?
- Identify the hidden assumption everyone accepts.
- Flip it. Show the opposite might be true.
- Use leverage thinking—where's the 80/20?
- Make it aphoristic—compressible into a single sentence.
- Don't argue the old view. Make the new view obvious.

Generate:
1. The first-principles reframe (1-2 sentences)
2. The hidden assumption exposed
3. The new mental model
4. An aphorism that captures it`;

const exampleOutput = `Subject: Specific knowledge in outbound

Sarah,

Most companies hire SDRs to do research. That's backwards.

Research is the leverage. Sending is the commodity.

The best outbound teams don't have better senders. They have better systems for knowing who to send to and why.

You've built something in payments that few understand. Worth exploring whether that specific knowledge can compound in your pipeline, not just your product.

15 minutes?

— Marcus`;

const realExample = `"Escape competition through authenticity. Nobody can compete with you on being you."

— Naval Ravikant`;

const relatedTonalities = [
  { slug: 'seth-godin', name: 'Seth Godin', tagline: 'Remarkable & Purple' },
  { slug: 'warren-buffett', name: 'Warren Buffett', tagline: 'Folksy Authority' },
  { slug: 'hemingway', name: 'Hemingway', tagline: 'Radically Brief' },
  { slug: 'challenger', name: 'Challenger Sale', tagline: 'Teach & Reframe' },
];

export default function NavalRavikantTonalityPage() {
  return (
    <div className="min-h-screen bg-background">

      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="text-center mb-12">
          <Badge variant="accent" className="mb-4">Premium GTM Tonality</Badge>
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-orange-400">
              <Compass className="h-6 w-6" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Naval Ravikant
            </h1>
          </div>
          <p className="text-xl text-orange-600 dark:text-orange-400 font-medium mb-4">
            First Principles. Specific Knowledge. Leverage Thinking.
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Based on the Navalmanack and his Twitter philosophy. Reframe problems at their root.
            Philosophical depth compressed into few words. For founders and technical buyers.
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
              Naval thinks in leverage: code, media, capital, and labor—in that order of preference.
              He values specific knowledge (things that can't be trained) over generic skills.
            </p>
            <p>
              This tonality works because it <strong>signals intellectual depth</strong>. When you
              communicate in first principles, you show that you've thought harder about their
              problem than anyone else. You become the person who sees what others miss.
            </p>
          </div>

          <h3 className="text-lg font-semibold text-foreground mt-8 mb-4">Key Characteristics</h3>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">First principles.</strong> Strip away assumptions. What's actually true here?</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Leverage thinking.</strong> What compounds? What scales without you?</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Aphoristic compression.</strong> Wisdom that fits in a tweet. Dense, not long.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Calm detachment.</strong> No urgency. No status games. Just clarity.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Specific knowledge.</strong> What do you uniquely understand that others don't?</span>
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mt-8 mb-4">When to Use</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
              <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">Best For</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Technical founders who value intellectual depth</li>
                <li>• Buyers tired of corporate-speak and sales theater</li>
                <li>• Complex problems requiring reframing</li>
                <li>• Long-term strategic conversations</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
              <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">Avoid When</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Buyers need concrete, immediate action</li>
                <li>• Relationship-warmth matters more than insight</li>
                <li>• Simple, tactical problems with obvious solutions</li>
                <li>• Audiences unfamiliar with tech/startup culture</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Prompts Section - Gated */}
        <TonalityGate tonalityName="Naval Ravikant">
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

            {/* Reframing */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-foreground">Problem Reframing</h3>
                <CopyButton text={reframingPrompt} />
              </div>
              <div className="bg-zinc-950 rounded-xl p-6 overflow-x-auto">
                <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-mono">{reframingPrompt}</pre>
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
