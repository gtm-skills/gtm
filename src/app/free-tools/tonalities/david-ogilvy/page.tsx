import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CopyButton } from '@/components/copy-button';
import { ArrowRight, PenTool } from 'lucide-react';
import type { Metadata } from 'next';
import { TonalityGate } from '@/components/gtm/tonality-gate';

export const metadata: Metadata = {
  title: 'David Ogilvy Tonality | Classic Persuasion Sales Writing | Premium GTM Prompts',
  description: 'Write like David Ogilvy. Research-backed, headline-driven, benefit-focused. The father of advertising applied to B2B sales. Premium prompts for Claude/ChatGPT.',
  keywords: 'david ogilvy copywriting, ogilvy on advertising, headline writing, benefit focused selling, classic advertising style, direct response copywriting',
  openGraph: {
    title: 'David Ogilvy Tonality | Classic Persuasion Sales Writing',
    description: 'Write like David Ogilvy. Research-backed, headline-driven, benefit-focused. Premium prompts for Claude & ChatGPT.',
    type: 'website',
  },
};

const coldEmailPrompt = `Write a cold email in the David Ogilvy tonality.

Context:
- Prospect: [NAME], [TITLE] at [COMPANY]
- Signal: [What triggered this outreach - funding, hire, product launch, etc.]
- My product: [What you sell]
- Key differentiator: [Why you're superior to alternatives]
- Proof point: [Case study, statistic, or testimonial]

David Ogilvy Style Rules:
- The subject line is 80% of the value. Make it specific and benefit-driven.
- Lead with the benefit, not the feature. What do they GET?
- Use specific facts, not vague claims. "63%" beats "most."
- Include proof: testimonials, case studies, or third-party validation.
- Respect the reader's intelligence. Don't patronize.
- Write like a human, not a company. First person. Conversational.
- Every sentence must move them toward action.
- End with a clear, single call-to-action.
- Long copy sells, but only if every word earns its place.

Tone: Intelligent, research-backed, elegantly persuasive. Like a well-crafted advertisement that respects the reader.`;

const discoveryCallPrompt = `Generate David Ogilvy-style discovery questions.

Context:
- Prospect company: [COMPANY]
- Their likely problem: [PROBLEM AREA]
- My solution: [WHAT YOU OFFER]

David Ogilvy Approach to Discovery:
- Research before you ask. Know their world.
- Ask about benefits they want, not features they need.
- Uncover what would make them a hero to their boss.
- Find the emotional driver behind the rational need.
- Listen for the "big idea"—the insight that changes everything.
- Understand what they've seen that works (and doesn't).

Generate 5 questions that:
1. Reveal what success looks like in their words (not yours)
2. Uncover the emotional stakes beyond the business case
3. Find what competitors are promising (and failing to deliver)
4. Identify the "big idea" they're missing
5. Understand what proof they'd need to act`;

const objectionPrompt = `Handle this objection in the David Ogilvy tonality.

The objection: [PASTE OBJECTION HERE]

Context:
- My product: [WHAT YOU SELL]
- Why we're better: [KEY DIFFERENTIATOR]
- Proof point: [Case study, statistic, or testimonial]

David Ogilvy Response Framework:
- Never argue. Acknowledge, then reframe around benefits.
- Use facts. Specific numbers beat vague claims.
- Introduce proof: "One client said..." or "In a recent study..."
- Appeal to the benefit they care about most.
- Make it easy to believe by making it specific.
- Create a reason to act now without being pushy.
- Respect their intelligence. They can spot manipulation.

Generate a response that persuades through evidence and benefit, not pressure.`;

const linkedinPrompt = `Write a LinkedIn message in the David Ogilvy tonality.

Context:
- Recipient: [NAME], [TITLE]
- Connection point: [How you're connected or what triggered this]
- What I want: [Meeting, intro, feedback, etc.]
- Key benefit: [What they get from responding]

David Ogilvy LinkedIn Rules:
- The first line is your headline. Make it count.
- Lead with the benefit to them, not your introduction.
- Include one specific proof point if possible.
- Be conversational. "I" and "you" over "we" and "one."
- One clear ask. Don't split their attention.
- Under 75 words. Respect their time.

Tone: Warm, intelligent, evidence-based. Like a note from someone who's done their homework.`;

const subjectLinePrompt = `Generate David Ogilvy-style subject lines for this email.

Context:
- What I'm selling: [PRODUCT/SERVICE]
- Main benefit: [PRIMARY OUTCOME]
- Target audience: [WHO THIS IS FOR]
- Proof point: [STATISTIC OR RESULT]

David Ogilvy Subject Line Rules:
- Include the benefit. What do they get?
- Be specific. Numbers outperform vague claims.
- Avoid "clever" wordplay that sacrifices clarity.
- News angles work: "New," "Now," "Announcing."
- Questions can work if they're genuinely interesting.
- Promise something valuable. Then deliver in the body.
- Test: Would you open this yourself?

Generate 5 subject lines:
1. Benefit-driven (what they get)
2. Specific number-driven (the result)
3. Question-driven (curiosity hook)
4. News-driven (something new/changed)
5. Testimonial-driven (proof from others)`;

const exampleOutput = `Subject: 63% of your pipeline may be stuck in "maybe"

Sarah,

I noticed Acme just hit 100 employees. Congratulations—that's a milestone most startups never reach.

At this stage, something interesting happens: deals start stalling. Not losing—stalling. Our research across 2,400 B2B companies shows that 63% of "active" pipeline sits in "maybe" for over 90 days.

The culprit isn't your product. It's how decisions get made at the companies you're selling to.

We helped Ramp reduce their 90-day stall rate from 58% to 23%. Same product, same market—different approach to navigating buying committees.

Worth 20 minutes to see if the same applies to your pipeline?

— Marcus

P.S. Happy to share the research even if we never speak. Just reply "send it."`;

const realExample = `"The consumer isn't a moron; she is your wife. You insult her intelligence if you assume that a mere slogan and a few vapid adjectives will persuade her to buy anything."

— David Ogilvy, Confessions of an Advertising Man`;

const relatedTonalities = [
  { slug: 'seth-godin', name: 'Seth Godin', tagline: 'Remarkable & Purple' },
  { slug: 'challenger', name: 'Challenger Sale', tagline: 'Teach & Reframe' },
  { slug: 'value-based', name: 'Value-Based', tagline: 'ROI-Focused' },
  { slug: 'alex-hormozi', name: 'Alex Hormozi', tagline: 'No-BS Value Stack' },
];

export default function DavidOgilvyTonalityPage() {
  return (
    <div className="min-h-screen bg-background">

      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="text-center mb-12">
          <Badge variant="accent" className="mb-4">Premium GTM Tonality</Badge>
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-orange-400">
              <PenTool className="h-6 w-6" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              David Ogilvy
            </h1>
          </div>
          <p className="text-xl text-orange-600 dark:text-orange-400 font-medium mb-4">
            Classic Persuasion. Research-Backed. Benefit-Focused.
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Based on Ogilvy on Advertising and 60 years of direct response wisdom.
            The father of modern advertising, applied to B2B sales. Headlines that hook. Copy that converts.
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
              Ogilvy believed in research, testing, and respecting the audience. He never wrote
              an ad without first understanding the product deeply and the customer even more deeply.
            </p>
            <p>
              This tonality works because it <strong>treats buyers as intelligent adults</strong>.
              Instead of hype and pressure, you offer evidence and benefits. You don't manipulate—you
              inform and persuade. That respect builds trust and credibility.
            </p>
          </div>

          <h3 className="text-lg font-semibold text-foreground mt-8 mb-4">Key Characteristics</h3>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Headlines carry 80% of the weight.</strong> Five times as many people read the headline as the body.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Benefits over features.</strong> Don't tell them what it is. Tell them what they get.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Specific facts.</strong> "63% improvement" beats "significant improvement" every time.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Proof and testimonials.</strong> Let others validate your claims. Third-party credibility.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Respect the reader.</strong> They're not a moron. Write for intelligent adults.</span>
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mt-8 mb-4">When to Use</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
              <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">Best For</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Email sequences that need to convert</li>
                <li>• Landing pages and product marketing</li>
                <li>• Buyers who respond to evidence</li>
                <li>• Competitive markets where trust matters</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
              <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">Avoid When</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Highly technical audiences wanting specs</li>
                <li>• Startups without proof points yet</li>
                <li>• Contexts where brevity is essential (cold DMs)</li>
                <li>• Buyers who prefer direct, minimal communication</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Prompts Section - Gated */}
        <TonalityGate tonalityName="David Ogilvy">
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

            {/* Subject Lines */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-foreground">Subject Line Generator</h3>
                <CopyButton text={subjectLinePrompt} />
              </div>
              <div className="bg-zinc-950 rounded-xl p-6 overflow-x-auto">
                <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-mono">{subjectLinePrompt}</pre>
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
