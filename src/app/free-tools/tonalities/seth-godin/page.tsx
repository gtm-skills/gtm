import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CopyButton } from '@/components/copy-button';
import { ArrowRight, Lightbulb } from 'lucide-react';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Seth Godin Tonality | Remarkable & Purple Sales Writing | Free GTM Prompts',
  description: 'Write like Seth Godin. Be remarkable or be invisible. Permission marketing, ideas that spread, purple cow positioning. Copy these Claude/ChatGPT prompts.',
  keywords: 'seth godin writing style, purple cow marketing, permission marketing, remarkable marketing, ideas that spread, seth godin sales, tribe building',
  openGraph: {
    title: 'Seth Godin Tonality | Remarkable & Purple Sales Writing',
    description: 'Write like Seth Godin. Be remarkable or be invisible. Free prompts for Claude & ChatGPT.',
    type: 'website',
  },
};

const coldEmailPrompt = `Write a cold email in the Seth Godin tonality.

Context:
- Prospect: [NAME], [TITLE] at [COMPANY]
- Signal: [What triggered this outreach - funding, hire, product launch, etc.]
- My product: [What you sell]
- What makes us remarkable: [Why we're worth talking about]

Seth Godin Style Rules:
- Be remarkable or be invisible. Say something worth repeating.
- Short paragraphs. Often just one sentence.
- Ask a question that makes them think.
- Focus on the change you create, not features.
- Use "you" more than "we" or "I."
- Make them feel part of something, not sold to.
- Be generous—give value before asking for anything.
- Under 100 words. But make every word count.

Tone: Warm but provocative. Like a smart friend who sees something you don't.`;

const discoveryCallPrompt = `Generate Seth Godin-style discovery questions.

Context:
- Prospect company: [COMPANY]
- Their likely problem: [PROBLEM AREA]
- My solution: [WHAT YOU OFFER]

Seth Godin Approach to Discovery:
- Ask about the change they want to make in the world
- Understand who they're trying to serve
- Find out what's keeping them average
- Discover what remarkable thing they're afraid to do
- Understand their tribe and who they lead

Generate 5 questions that:
1. Reveal what would make them remarkable in their market
2. Uncover the status quo they're afraid to challenge
3. Find the smallest viable audience they should obsess over
4. Expose the tension between safe and remarkable
5. Help them articulate the change they want to make`;

const objectionPrompt = `Handle this objection in the Seth Godin tonality.

The objection: [PASTE OBJECTION HERE]

Context:
- My product: [WHAT YOU SELL]
- What makes us remarkable: [WHY WE'RE WORTH TALKING ABOUT]

Seth Godin Response Framework:
- Acknowledge their fear—it's the fear of being different
- Reframe safe as actually risky (invisible = irrelevant)
- Show them the cost of being average
- Make it about the change, not the product
- Use a small story or metaphor
- End with permission to be remarkable

Generate a response that makes "safe" feel scarier than "different."`;

const linkedinPrompt = `Write a LinkedIn message in the Seth Godin tonality.

Context:
- Recipient: [NAME], [TITLE]
- Connection point: [How you're connected or what triggered this]
- What I want: [Meeting, intro, feedback, etc.]

Seth Godin LinkedIn Rules:
- Lead with generosity—offer something valuable first
- Ask a question that's worth answering
- Make it about them, not you
- Create tension between where they are and where they could be
- No corporate speak. Write like a human.
- Under 75 words. Make it worth their time.`;

const exampleOutput = `Subject: The risky thing

Here's a question:

What's the thing you know you should do—the remarkable thing—but you keep putting off because it feels too risky?

Usually, that's the exact thing that would change everything.

I noticed you're scaling fast. Most companies in your position optimize for "more of the same."

The ones that win do something different.

Worth 15 minutes to explore what that could be?`;

const realExample = `"In a crowded marketplace, fitting in is failing. In a busy marketplace, not standing out is the same as being invisible."

— Seth Godin, Purple Cow`;

const relatedTonalities = [
  { slug: 'steve-jobs', name: 'Steve Jobs', tagline: 'Brutally Direct' },
  { slug: 'challenger', name: 'Challenger Sale', tagline: 'Teach & Reframe' },
  { slug: 'hemingway', name: 'Hemingway', tagline: 'Radically Brief' },
  { slug: 'trusted-advisor', name: 'Trusted Advisor', tagline: 'Relationship-First' },
];

export default function SethGodinTonalityPage() {
  return (
    <div className="min-h-screen bg-background">

      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="text-center mb-12">
          <Badge variant="accent" className="mb-4">GTM Tonality</Badge>
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-orange-400">
              <Lightbulb className="h-6 w-6" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Seth Godin
            </h1>
          </div>
          <p className="text-xl text-orange-600 dark:text-orange-400 font-medium mb-4">
            Remarkable & Purple. Ideas That Spread.
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Based on Purple Cow, Permission Marketing, and decades of Seth's daily blog.
            Be remarkable or be invisible. Make people want to talk about you.
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
              Seth Godin changed how we think about marketing. His core insight: in a world of infinite
              choices, being safe is the riskiest thing you can do. Average is invisible. Remarkable gets
              talked about.
            </p>
            <p>
              This tonality works because it reframes fear. Your prospect is afraid to be different. You
              show them that being the same is actually more dangerous. You give them <strong>permission
              to be remarkable</strong>.
            </p>
          </div>

          <h3 className="text-lg font-semibold text-foreground mt-8 mb-4">Key Characteristics</h3>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Be remarkable or be invisible.</strong> If you're not worth talking about, you don't exist.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Permission over interruption.</strong> Earn attention, don't steal it.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Ideas that spread win.</strong> Make your message easy to pass along.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Smallest viable audience.</strong> Don't try to please everyone. Delight someone.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Tension creates change.</strong> Point out the gap between safe and great.</span>
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mt-8 mb-4">When to Use</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
              <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">Best For</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Thought leadership content that gets shared</li>
                <li>• Differentiating in crowded markets</li>
                <li>• Startups challenging industry norms</li>
                <li>• Building community around a vision</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
              <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">Avoid When</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Enterprise procurement processes</li>
                <li>• Risk-averse industries (healthcare, finance)</li>
                <li>• Prospects who need detailed specs</li>
                <li>• Late-stage deal negotiations</li>
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
