import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CopyButton } from '@/components/copy-button';
import { ArrowRight, Zap } from 'lucide-react';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Steve Jobs Tonality | Brutally Direct Sales Writing | Free GTM Prompts',
  description: 'Write like Steve Jobs. Brutally direct, product-obsessed, emotionally intense. Copy these Claude/ChatGPT prompts for high-stakes deals and premium positioning.',
  keywords: 'steve jobs communication style, reality distortion field sales, product launch messaging, apple email style, steve jobs writing, direct sales communication',
  openGraph: {
    title: 'Steve Jobs Tonality | Brutally Direct Sales Writing',
    description: 'Write like Steve Jobs. Brutally direct, product-obsessed, emotionally intense. Free prompts for Claude & ChatGPT.',
    type: 'website',
  },
};

const coldEmailPrompt = `Write a cold email in the Steve Jobs tonality.

Context:
- Prospect: [NAME], [TITLE] at [COMPANY]
- Signal: [What triggered this outreach - funding, hire, product launch, etc.]
- My product: [What you sell]
- Key differentiator: [Why you're superior to alternatives]

Steve Jobs Style Rules:
- Short, declarative sentences. One idea per sentence.
- No corporate jargon. No filler words. No "hope this finds you well."
- High emotional intensity—passion, urgency, even controlled frustration.
- The product is the hero. Speak about it with conviction.
- Create urgency through clarity, not manipulation.
- Reference asymmetry when relevant (you have something they need).
- Under 75 words. Every word must earn its place.

Tone: Confident. Direct. A little dangerous.`;

const discoveryCallPrompt = `Generate Steve Jobs-style discovery questions.

Context:
- Prospect company: [COMPANY]
- Their likely problem: [PROBLEM AREA]
- My solution: [WHAT YOU OFFER]

Steve Jobs Approach to Discovery:
- Ask questions that reveal whether they understand the problem
- Challenge mediocre thinking directly
- Cut through corporate-speak to find the real issue
- Show impatience with complexity (simplify or die)
- Make them feel the cost of inaction

Generate 5 questions that:
1. Expose the gap between where they are and where they should be
2. Challenge assumptions about their current approach
3. Create urgency through clarity
4. Position you as someone who sees what others miss`;

const objectionPrompt = `Handle this objection in the Steve Jobs tonality.

The objection: [PASTE OBJECTION HERE]

Context:
- My product: [WHAT YOU SELL]
- Why we're better: [KEY DIFFERENTIATOR]

Steve Jobs Response Framework:
- Don't be defensive. Be direct.
- Acknowledge reality, then reframe it.
- Use asymmetry: you have leverage they don't see yet.
- Make the cost of NOT choosing you crystal clear.
- Short sentences. Conviction over explanation.
- End with a clear, binary choice.

Generate a response that commands the conversation.`;

const linkedinPrompt = `Write a LinkedIn message in the Steve Jobs tonality.

Context:
- Recipient: [NAME], [TITLE]
- Connection point: [How you're connected or what triggered this]
- What I want: [Meeting, intro, feedback, etc.]

Steve Jobs LinkedIn Rules:
- No pleasantries. Get to it.
- One clear idea. One clear ask.
- Show you've thought deeply about something they care about
- Create intrigue through confidence, not desperation
- Under 50 words. Respect their time by being brief.
- Make it feel like an opportunity, not a pitch.`;

const exampleOutput = `Subject: Quick question

Sarah —

Your product is good. It could be great.

The difference is distribution. You're building features. Your competitors are building channels.

We solved this for Stripe, Notion, and Linear. Same stage you're at now.

I have 15 minutes Tuesday. Let's see if it fits.

— Marcus`;

const realExample = `"I'm sure you realize the asymmetry in the financial resources of our respective companies when you say: 'We will both just end up paying a lot of lawyers a lot of money.'"

— Steve Jobs to Palm CEO, when Palm threatened litigation`;

const relatedTonalities = [
  { slug: 'jeff-bezos', name: 'Jeff Bezos', tagline: 'Customer-Obsessed' },
  { slug: 'chris-voss', name: 'Chris Voss', tagline: 'Tactical Empathy' },
  { slug: 'hemingway', name: 'Hemingway', tagline: 'Radically Brief' },
  { slug: 'cormac-mccarthy', name: 'Cormac McCarthy', tagline: 'Sparse & Powerful' },
];

export default function SteveJobsTonalityPage() {
  return (
    <div className="min-h-screen bg-background">

      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="text-center mb-12">
          <Badge variant="accent" className="mb-4">GTM Tonality</Badge>
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-orange-400">
              <Zap className="h-6 w-6" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Steve Jobs
            </h1>
          </div>
          <p className="text-xl text-orange-600 dark:text-orange-400 font-medium mb-4">
            Brutally Direct. Product-Obsessed. Emotionally Intense.
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Based on internal Apple emails revealed through litigation. Short sentences. No jargon.
            High intensity. The product is the hero.
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
              Jobs didn't write emails. He wrote declarations. Every sentence was a stake in the ground.
              No hedging. No corporate cushioning. Just raw conviction about what matters.
            </p>
            <p>
              This tonality works because it signals <strong>supreme confidence</strong>. When you write
              like someone who doesn't need the deal, you become someone worth dealing with.
            </p>
          </div>

          <h3 className="text-lg font-semibold text-foreground mt-8 mb-4">Key Characteristics</h3>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Short, declarative sentences.</strong> One idea. One sentence. Period.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">No corporate jargon.</strong> No "synergy." No "leverage." No "circle back."</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">High emotional intensity.</strong> Passion, urgency, even controlled frustration.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Product as hero.</strong> You're not selling. You're revealing something superior.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Asymmetric leverage.</strong> Make them feel what they'll miss.</span>
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mt-8 mb-4">When to Use</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
              <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">Best For</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• High-stakes deals needing command presence</li>
                <li>• Cutting through bureaucracy with urgency</li>
                <li>• Premium positioning (superior product)</li>
                <li>• Product-focused buyers who value craft</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
              <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">Avoid When</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Building rapport with relationship-first buyers</li>
                <li>• Early discovery where listening matters more</li>
                <li>• Regulated industries needing soft touch</li>
                <li>• Prospects who need hand-holding</li>
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
