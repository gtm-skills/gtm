import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CopyButton } from '@/components/copy-button';
import { ArrowRight, Flame } from 'lucide-react';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Cormac McCarthy Tonality | Powerful Sales Writing | Free GTM Prompts',
  description: 'Write like Cormac McCarthy. Sparse, powerful, biblical cadence. Copy these Claude/ChatGPT prompts for transformational deals and visionary founders.',
  keywords: 'powerful sales writing, visceral copywriting, literary sales techniques, biblical cadence business writing, cormac mccarthy style',
  openGraph: {
    title: 'Cormac McCarthy Tonality | Powerful Sales Writing',
    description: 'Write like Cormac McCarthy. Sparse, powerful, biblical cadence. Free prompts for Claude & ChatGPT.',
    type: 'website',
  },
};

const coldEmailPrompt = `Write a cold email in the Cormac McCarthy tonality.

Context:
- Prospect: [NAME], [TITLE] at [COMPANY]
- The market shift: [WHAT'S CHANGING IN THEIR INDUSTRY]
- My product: [What you sell]
- The transformation: [WHAT CHANGES WHEN THEY USE YOU]

Cormac McCarthy Style Rules:
- Sparse punctuation. No quotation marks. Minimal commas.
- Use polysyndeton: connect ideas with "and" to create rhythm.
- Stark, concrete imagery: blood, bone, steel, data, capital.
- Biblical rhythm and cadence. Inevitable. Prophetic.
- Frame as truth, not opinion. This is what's coming.
- The old world is dying. Name what's dying.
- Short paragraphs. White space as punctuation.
- Under 80 words. Density creates gravity.

Tone: Prophetic. Inevitable. Unforgettable.`;

const discoveryCallPrompt = `Generate Cormac McCarthy-style discovery questions.

Context:
- Prospect company: [COMPANY]
- The change coming to their market: [DISRUPTION]
- My solution: [WHAT YOU OFFER]

Cormac McCarthy Approach to Discovery:
- Questions that feel like prophecy
- Frame their situation as a turning point in history
- Use stark imagery to describe their current state
- Make the question feel inevitable, not optional
- Let silence hang after each question

Generate 5 questions that:
1. Name what's dying in their industry
2. Ask about the world they're trying to build
3. Surface the cost of staying still
4. Frame the choice as binary: transform or fade
5. Use concrete imagery (markets, competitors, time)`;

const objectionPrompt = `Handle this objection in the Cormac McCarthy tonality.

The objection: [PASTE OBJECTION HERE]

Context:
- My product: [WHAT YOU SELL]
- The transformation we enable: [KEY CHANGE]

Cormac McCarthy Response Framework:
- Acknowledge what they said. Do not argue.
- Reframe the objection as part of a larger truth.
- Name what's coming whether they act or not.
- Use stark imagery. Markets shift. Companies fall.
- End with a statement of what is, not what could be.
- This isn't persuasion. It's witness.

Generate a response that feels like prophecy, not pitch.`;

const linkedinPrompt = `Write a LinkedIn message in the Cormac McCarthy tonality.

Context:
- Recipient: [NAME], [TITLE]
- The change in their world: [WHAT'S SHIFTING]
- What I want: [Meeting, intro, feedback, etc.]

Cormac McCarthy LinkedIn Rules:
- No greeting. Begin with truth.
- One sentence about what's ending.
- One sentence about what's beginning.
- One question or statement about their role in it.
- Under 40 words. Weight, not length.`;

const narrativePrompt = `Write a market disruption narrative in the Cormac McCarthy tonality.

Context:
- Industry: [THE MARKET]
- The old way: [WHAT'S DYING]
- The new way: [WHAT'S EMERGING]
- Our role: [HOW WE FIT IN]

Cormac McCarthy Narrative Rules:
- Start in medias res. The change has already begun.
- Name the old world without nostalgia.
- Name the new world without hype.
- Use polysyndeton for rhythm: "And the markets shifted and the old ways fell..."
- Concrete images: maps that no longer match the terrain.
- Position your company as witness and guide, not savior.
- 100-150 words. Epic compression.

Tone: Biblical. Inevitable. True.`;

const exampleOutput = `Subject: The maps dont match the terrain

Sarah —

The market turned. You know this.

And the old playbooks and the consultants and the software that promised scale are promises of a world that was. Your competitors move faster now. They learned what you have not.

We work with founders who see the turn. Who know the maps they were given are maps of a place that no longer exists.

There is a call this week. Wednesday. You come or you dont.

— Marcus`;

const realExample = `And the market had turned. And the old ways were no longer true. The maps they had were maps of a world that was gone and the competitors were at the gates and there was a darkness on the horizon.

This style is unforgettable because it treats business as what it is: survival. Life and death of companies. The rise and fall of empires.`;

const relatedTonalities = [
  { slug: 'steve-jobs', name: 'Steve Jobs', tagline: 'Brutally Direct' },
  { slug: 'jeff-bezos', name: 'Jeff Bezos', tagline: 'Customer-Obsessed' },
  { slug: 'chris-voss', name: 'Chris Voss', tagline: 'Tactical Empathy' },
  { slug: 'hemingway', name: 'Hemingway', tagline: 'Radically Brief' },
];

export default function CormacMcCarthyTonalityPage() {
  return (
    <div className="min-h-screen bg-background">

      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="text-center mb-12">
          <Badge variant="accent" className="mb-4">GTM Tonality</Badge>
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-orange-400">
              <Flame className="h-6 w-6" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Cormac McCarthy
            </h1>
          </div>
          <p className="text-xl text-orange-600 dark:text-orange-400 font-medium mb-4">
            Sparse. Powerful. Biblical Cadence.
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Based on the novelist's distinctive prose style. Polysyndeton rhythm. Stark imagery.
            Frame as inevitable truth. Unforgettable.
          </p>
        </div>

        {/* Real Example Quote */}
        <div className="bg-zinc-950 rounded-xl p-6 mb-12 border-l-4 border-orange-500">
          <div className="text-zinc-300 space-y-4">
            <p className="italic">{realExample.split('\n\n')[0]}</p>
            <p className="text-zinc-500">{realExample.split('\n\n')[1]}</p>
          </div>
        </div>

        {/* The Philosophy */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">The Philosophy</h2>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <p>
              McCarthy writes about violence and survival and the indifference of the world to human
              plans. His prose has the weight of scripture because he treats his subjects as <strong>matters
              of life and death</strong>. Because they are.
            </p>
            <p>
              In business, this tonality works for moments of transformation. When markets shift.
              When the old ways die. When a founder must decide whether to adapt or fade into
              irrelevance. These are not small moments. They deserve language that matches their weight.
            </p>
          </div>

          <h3 className="text-lg font-semibold text-foreground mt-8 mb-4">Key Characteristics</h3>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Sparse punctuation.</strong> No quotation marks. Minimal commas. Let rhythm guide.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Polysyndeton.</strong> "And the market shifted and the old ways fell and the new order rose."</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Stark imagery.</strong> Blood, bone, steel, data, capital. Concrete, visceral words.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Biblical rhythm.</strong> The cadence of inevitability. Truth, not opinion.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">The dying world.</strong> Always name what's ending. Maps that no longer match terrain.</span>
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mt-8 mb-4">When to Use</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
              <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">Best For</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• High-stakes, transformational deals</li>
                <li>• Market disruption narratives</li>
                <li>• Communicating with visionary founders/CEOs</li>
                <li>• When you need to be remembered</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
              <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">Avoid When</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Routine transactions or small deals</li>
                <li>• Technical buyers who want specs, not poetry</li>
                <li>• Risk-averse corporate environments</li>
                <li>• Prospects who don't see themselves as visionaries</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Prompts Section */}
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

          {/* Market Disruption Narrative */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-foreground">Market Disruption Narrative</h3>
              <CopyButton text={narrativePrompt} />
            </div>
            <div className="bg-zinc-950 rounded-xl p-6 overflow-x-auto">
              <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-mono">{narrativePrompt}</pre>
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
