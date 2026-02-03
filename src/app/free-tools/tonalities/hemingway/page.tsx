import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CopyButton } from '@/components/copy-button';
import { ArrowRight, Target } from 'lucide-react';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Hemingway Tonality | Radically Brief Sales Writing | Free GTM Prompts',
  description: 'Write like Hemingway. Short sentences, strong verbs, extreme clarity. Copy these Claude/ChatGPT prompts for technical audiences and busy executives.',
  keywords: 'hemingway writing style business, concise sales copy, brevity in business communication, short sentence copywriting, minimalist sales writing',
  openGraph: {
    title: 'Hemingway Tonality | Radically Brief Sales Writing',
    description: 'Write like Hemingway. Short sentences, strong verbs, extreme clarity. Free prompts for Claude & ChatGPT.',
    type: 'website',
  },
};

const coldEmailPrompt = `Write a cold email in the Hemingway tonality.

Context:
- Prospect: [NAME], [TITLE] at [COMPANY]
- Their problem: [WHAT THEY'RE STRUGGLING WITH]
- My product: [What you sell]
- Result we deliver: [SPECIFIC OUTCOME]

Hemingway Style Rules:
- Short sentences. One idea per sentence.
- Strong, simple verbs. No adverbs.
- Show, don't tell. Facts over adjectives.
- The Iceberg Theory: 90% below the surface. Trust the reader.
- No filler words. No "just," "really," "very," "actually."
- Confidence through simplicity. Superior products need no fancy language.
- Under 50 words. Every word must fight for its place.

Tone: Clear. Confident. Spare.`;

const discoveryCallPrompt = `Generate Hemingway-style discovery questions.

Context:
- Prospect company: [COMPANY]
- Their likely problem: [PROBLEM AREA]
- My solution: [WHAT YOU OFFER]

Hemingway Approach to Discovery:
- Short questions. Direct questions.
- No setup. No preamble.
- One question. One answer. Move on.
- Let silence do the work.
- Facts matter more than feelings in this style.

Generate 5 questions that:
1. Get to the core problem fast
2. Use 10 words or fewer each
3. Reveal data, not opinions
4. Cut through complexity
5. Show you respect their time`;

const objectionPrompt = `Handle this objection in the Hemingway tonality.

The objection: [PASTE OBJECTION HERE]

Context:
- My product: [WHAT YOU SELL]
- The result we deliver: [KEY OUTCOME]

Hemingway Response Framework:
- Acknowledge. Don't argue.
- State facts. Not opinions.
- One short sentence per point.
- End with a clear next step.
- No "I understand" or "I hear you." Just respond.
- Under 40 words total.

Generate a response that's short, clear, and confident.`;

const linkedinPrompt = `Write a LinkedIn message in the Hemingway tonality.

Context:
- Recipient: [NAME], [TITLE]
- The problem: [WHAT YOU CAN HELP WITH]
- What I want: [Meeting, intro, feedback, etc.]

Hemingway LinkedIn Rules:
- No greeting beyond their name.
- State the point in the first sentence.
- One fact that proves you can help.
- One clear ask.
- Under 30 words total. Yes, 30.`;

const technicalEmailPrompt = `Write a technical email in the Hemingway tonality.

Context:
- Recipient: [NAME], [ROLE - ENGINEER/CTO/etc.]
- Technical problem: [WHAT THEY'RE SOLVING]
- Our technical solution: [HOW IT WORKS]
- Key specs: [NUMBERS THAT MATTER]

Hemingway Technical Rules:
- Lead with the spec, not the pitch.
- Numbers speak. Let them.
- No marketing language. Engineers smell it.
- Architecture > adjectives.
- One technical fact per sentence.
- Under 60 words. Dense with signal.

Tone: Precise. Confident. No fluff.`;

const exampleBefore = `We will quickly and efficiently streamline your inefficient workflow processes and help your team become significantly more productive through our innovative solution that leverages cutting-edge technology.`;

const exampleAfter = `Our software simplifies your workflow.

Your team ships faster. 40% faster, based on our data.

Here's how it works. [Link]

Worth a look?`;

const realExample = `"Poor Faulkner. Does he really think big emotions come from big words? He thinks I don't know the ten-dollar words. I know them all right. But there are older and simpler and better words, and those are the ones I use."

— Ernest Hemingway`;

const relatedTonalities = [
  { slug: 'steve-jobs', name: 'Steve Jobs', tagline: 'Brutally Direct' },
  { slug: 'jeff-bezos', name: 'Jeff Bezos', tagline: 'Customer-Obsessed' },
  { slug: 'chris-voss', name: 'Chris Voss', tagline: 'Tactical Empathy' },
  { slug: 'cormac-mccarthy', name: 'Cormac McCarthy', tagline: 'Sparse & Powerful' },
];

export default function HemingwayTonalityPage() {
  return (
    <div className="min-h-screen bg-background">

      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="text-center mb-12">
          <Badge variant="accent" className="mb-4">GTM Tonality</Badge>
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-orange-400">
              <Target className="h-6 w-6" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Hemingway
            </h1>
          </div>
          <p className="text-xl text-orange-600 dark:text-orange-400 font-medium mb-4">
            Radically Brief. Clear. Confident.
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Based on Ernest Hemingway's writing principles. Short sentences. Strong verbs.
            The Iceberg Theory—90% below the surface. Trust the reader.
          </p>
        </div>

        {/* Real Example Quote */}
        <div className="bg-zinc-950 rounded-xl p-6 mb-12 border-l-4 border-orange-500">
          <blockquote className="text-zinc-300 italic mb-4">
            {realExample.split('\n\n')[0].replace(/"/g, '')}
          </blockquote>
          <p className="text-sm text-zinc-500">{realExample.split('\n\n')[1]}</p>
        </div>

        {/* The Philosophy */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">The Philosophy</h2>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <p>
              Hemingway wrote about war, loss, and the human condition using the simplest words
              he could find. He believed <strong>clarity is the ultimate sophistication</strong>.
            </p>
            <p>
              In sales, this translates to emails that busy people actually read. Engineers and
              executives share one thing: zero patience for fluff. Hemingway's style respects their
              time and intelligence.
            </p>
          </div>

          <h3 className="text-lg font-semibold text-foreground mt-8 mb-4">Key Characteristics</h3>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Short sentences.</strong> One idea. Period. Next idea. Period.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Strong verbs.</strong> "Ship" not "facilitate." "Cut" not "streamline."</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Show, don't tell.</strong> "40% faster" not "significantly improved."</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">The Iceberg Theory.</strong> Say 10%. Imply the other 90%. Trust the reader.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">No adverbs.</strong> If the verb needs help, pick a better verb.</span>
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mt-8 mb-4">When to Use</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
              <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">Best For</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Technical audiences (engineers, developers)</li>
                <li>• Busy, no-nonsense C-level executives</li>
                <li>• Cutting through complexity with clarity</li>
                <li>• Projecting confidence (superior product)</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
              <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">Avoid When</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Building emotional connection matters more</li>
                <li>• Complex proposals needing narrative</li>
                <li>• Relationship-first buyers who want warmth</li>
                <li>• Situations requiring detailed explanation</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Before/After Example */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Before & After</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-6 rounded-xl bg-red-500/5 border border-red-500/20">
              <h3 className="font-semibold text-red-600 dark:text-red-400 mb-3">Before (Corporate)</h3>
              <p className="text-sm text-muted-foreground">{exampleBefore}</p>
            </div>
            <div className="p-6 rounded-xl bg-green-500/5 border border-green-500/20">
              <h3 className="font-semibold text-green-600 dark:text-green-400 mb-3">After (Hemingway)</h3>
              <p className="text-sm text-muted-foreground whitespace-pre-line">{exampleAfter}</p>
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

          {/* Technical Email */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-foreground">Technical Email</h3>
              <CopyButton text={technicalEmailPrompt} />
            </div>
            <div className="bg-zinc-950 rounded-xl p-6 overflow-x-auto">
              <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-mono">{technicalEmailPrompt}</pre>
            </div>
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
