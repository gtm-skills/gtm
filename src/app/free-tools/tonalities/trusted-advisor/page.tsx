import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CopyButton } from '@/components/copy-button';
import { ArrowRight, Users } from 'lucide-react';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Trusted Advisor Selling | Relationship-First Sales Writing | Free GTM Prompts',
  description: 'Master the Trusted Advisor methodology. Build trust through credibility, reliability, intimacy, and low self-orientation. Free prompts for Claude & ChatGPT.',
  keywords: 'trusted advisor selling, relationship selling, consultative sales, trust equation sales, david maister trusted advisor',
  openGraph: {
    title: 'Trusted Advisor Selling | Relationship-First Sales Writing',
    description: 'Master the Trusted Advisor methodology. Build trust first. Free prompts for Claude & ChatGPT.',
    type: 'website',
  },
};

const coldEmailPrompt = `Write a cold email using the Trusted Advisor methodology.

Context:
- Prospect: [NAME], [TITLE] at [COMPANY]
- Their situation: [WHAT YOU KNOW ABOUT THEIR CHALLENGES]
- My expertise: [Your relevant experience]
- My product: [What you sell]
- A genuine way to help: [VALUE YOU CAN PROVIDE REGARDLESS OF SALE]

Trusted Advisor Style Rules:
- Lead with genuine curiosity about their situation
- Offer something helpful without expectation of return
- Show credibility through specific experience, not claims
- Demonstrate you've done your homework
- Low self-orientation—focus on them, not you
- No manipulation, just authentic helpfulness
- Under 100 words. Warmth without wasting time.

Tone: Helpful. Curious. Genuinely interested in their success.`;

const discoveryCallPrompt = `Generate Trusted Advisor discovery questions.

Context:
- Prospect company: [COMPANY]
- Their situation: [WHAT YOU KNOW]
- My expertise: [YOUR RELEVANT EXPERIENCE]
- My solution: [WHAT YOU OFFER]

Trusted Advisor Discovery Approach:
- Start by understanding their world, not qualifying
- Ask questions you're genuinely curious about
- Listen more than you talk
- Share relevant experience when it helps them think
- Focus on their success, not your sale
- Build intimacy through appropriate vulnerability

Generate 6 questions that:
1. Show genuine curiosity about their priorities
2. Explore how they think about the problem
3. Understand what success looks like to them personally
4. Surface unstated concerns or fears
5. Invite them to share challenges openly
6. Position you as a thinking partner, not a vendor`;

const objectionPrompt = `Handle this objection using the Trusted Advisor methodology.

The objection: [PASTE OBJECTION HERE]

Context:
- My product: [WHAT YOU SELL]
- Our relationship so far: [CONTEXT]
- Their real concern might be: [YOUR HYPOTHESIS]

Trusted Advisor Response Framework:
- Acknowledge and validate the concern genuinely
- Don't defend—explore their thinking
- Ask what would need to be true for them to feel confident
- Share honest perspective, even if it means losing the deal
- Prioritize long-term relationship over short-term win
- If you're not the right fit, say so

Generate a response that prioritizes trust over persuasion.`;

const linkedinPrompt = `Write a LinkedIn message using the Trusted Advisor methodology.

Context:
- Recipient: [NAME], [TITLE]
- Something you genuinely appreciate: [THEIR WORK/POST/COMPANY]
- A way you could help: [VALUE OFFER]
- What you want: [Meeting, intro, feedback, etc.]

Trusted Advisor LinkedIn Rules:
- Lead with genuine appreciation or curiosity
- Offer value without expectation
- Be specific about why you reached out
- Keep self-promotion minimal
- Make it easy to say no
- Under 60 words.`;

const followUpPrompt = `Write a relationship-building follow-up using the Trusted Advisor methodology.

Context:
- Prospect: [NAME] at [COMPANY]
- Last interaction: [WHAT YOU DISCUSSED]
- Something relevant: [NEWS, ARTICLE, RESOURCE]
- Your genuine thought: [WHY THIS MATTERS TO THEM]

Trusted Advisor Follow-up Rules:
- Share something valuable with no ask attached
- Reference your previous conversation specifically
- Show you remembered what matters to them
- Build the relationship, not the pipeline
- Don't ask for a meeting—earn the next conversation
- Under 75 words.`;

const exampleOutput = `Subject: Thought of you when I saw this

Sarah —

Our conversation about scaling CS without adding headcount stuck with me. Just came across Gainsight's research on leading indicators of churn—thought it might be useful as you think through your approach.

[Link]

No agenda here. Just remembered you mentioned this was top of mind.

Let me know if it sparks any questions. Happy to think through it with you.

— Marcus`;

const realExample = `The Trust Equation (David Maister):

Trust = (Credibility + Reliability + Intimacy) / Self-Orientation

The denominator matters most. High self-orientation—focusing on your needs over theirs—destroys trust faster than anything else.

Trusted Advisors aren't trying to close. They're trying to help. The sales follow naturally when the relationship is genuine.`;

const relatedTonalities = [
  { slug: 'chris-voss', name: 'Chris Voss', tagline: 'Tactical Empathy' },
  { slug: 'socratic', name: 'Socratic', tagline: 'Question-Led' },
  { slug: 'value-based', name: 'Value-Based', tagline: 'ROI-Focused' },
  { slug: 'challenger', name: 'Challenger', tagline: 'Teach & Reframe' },
];

export default function TrustedAdvisorTonalityPage() {
  return (
    <div className="min-h-screen bg-background">

      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="text-center mb-12">
          <Badge variant="accent" className="mb-4">GTM Methodology</Badge>
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-orange-400">
              <Users className="h-6 w-6" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Trusted Advisor
            </h1>
          </div>
          <p className="text-xl text-orange-600 dark:text-orange-400 font-medium mb-4">
            Relationship-First. Long-Term Thinking. Authentic Helpfulness.
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Based on David Maister's Trust Equation. Build trust through credibility, reliability,
            and intimacy—while keeping self-orientation low.
          </p>
        </div>

        {/* Real Example Quote */}
        <div className="bg-zinc-950 rounded-xl p-6 mb-12 border-l-4 border-orange-500">
          <div className="text-zinc-300 space-y-4">
            {realExample.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>

        {/* The Philosophy */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">The Philosophy</h2>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <p>
              The Trusted Advisor approach prioritizes <strong>long-term relationship over short-term
              transaction</strong>. Instead of optimizing for the close, you optimize for trust.
            </p>
            <p>
              This works because business is built on relationships. When prospects trust you—really
              trust you—they bring you opportunities, introduce you to colleagues, and become
              advocates. The math favors patience.
            </p>
          </div>

          <h3 className="text-lg font-semibold text-foreground mt-8 mb-4">The Trust Equation</h3>
          <div className="bg-zinc-100 dark:bg-zinc-900 rounded-xl p-6 mb-6">
            <p className="text-lg font-mono text-foreground text-center">
              Trust = (Credibility + Reliability + Intimacy) / Self-Orientation
            </p>
          </div>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Credibility.</strong> Your words are believed. Expertise + track record.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Reliability.</strong> Your actions are predictable. You do what you say.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Intimacy.</strong> They feel safe sharing real concerns with you.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Self-Orientation.</strong> How much you focus on yourself vs. them. (Lower is better.)</span>
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mt-8 mb-4">When to Use</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
              <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">Best For</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Long sales cycles with multiple touchpoints</li>
                <li>• Strategic accounts you want to grow</li>
                <li>• Relationship-driven buyers</li>
                <li>• Complex, consultative sales</li>
                <li>• Building referral networks</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
              <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">Avoid When</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Fast transactional sales</li>
                <li>• Prospects who just want the pitch</li>
                <li>• Time-pressured closing situations</li>
                <li>• You need results this quarter at all costs</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Prompts Section */}
        <div className="space-y-8 mb-12">
          <h2 className="text-2xl font-bold text-foreground">The Prompts</h2>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-foreground">Cold Email</h3>
              <CopyButton text={coldEmailPrompt} />
            </div>
            <div className="bg-zinc-950 rounded-xl p-6 overflow-x-auto">
              <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-mono">{coldEmailPrompt}</pre>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-foreground">Discovery Call Questions</h3>
              <CopyButton text={discoveryCallPrompt} />
            </div>
            <div className="bg-zinc-950 rounded-xl p-6 overflow-x-auto">
              <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-mono">{discoveryCallPrompt}</pre>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-foreground">Objection Handling</h3>
              <CopyButton text={objectionPrompt} />
            </div>
            <div className="bg-zinc-950 rounded-xl p-6 overflow-x-auto">
              <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-mono">{objectionPrompt}</pre>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-foreground">LinkedIn Message</h3>
              <CopyButton text={linkedinPrompt} />
            </div>
            <div className="bg-zinc-950 rounded-xl p-6 overflow-x-auto">
              <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-mono">{linkedinPrompt}</pre>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-foreground">Relationship Follow-Up</h3>
              <CopyButton text={followUpPrompt} />
            </div>
            <div className="bg-zinc-950 rounded-xl p-6 overflow-x-auto">
              <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-mono">{followUpPrompt}</pre>
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
          <h2 className="text-2xl font-bold text-foreground mb-6">Related Methodologies</h2>
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
