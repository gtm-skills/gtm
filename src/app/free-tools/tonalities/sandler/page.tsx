import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CopyButton } from '@/components/copy-button';
import { ArrowRight, ShieldOff } from 'lucide-react';
import type { Metadata } from 'next';
import { TonalityGate } from '@/components/gtm/tonality-gate';

export const metadata: Metadata = {
  title: 'Sandler Selling Tonality | Reverse Psychology Sales | Premium GTM Prompts',
  description: 'Master Sandler Selling. Reverse selling, negative reverse, and pattern interrupts that let prospects convince themselves. Premium prompts for Claude/ChatGPT.',
  keywords: 'sandler selling, sandler training, reverse selling, negative reverse selling, pattern interrupt, anti-sales approach, upfront contracts',
  openGraph: {
    title: 'Sandler Selling Tonality | Reverse Psychology Sales',
    description: 'Master Sandler Selling. Reverse psychology that lets prospects sell themselves. Premium prompts for Claude & ChatGPT.',
    type: 'website',
  },
};

const coldEmailPrompt = `Write a cold email using Sandler Selling principles.

Context:
- Prospect: [NAME], [TITLE] at [COMPANY]
- Signal: [What triggered this outreach - funding, hire, product launch, etc.]
- My product: [What you sell]
- Problem I solve: [Core issue my product addresses]

Sandler Email Approach:
- Use a pattern interrupt—don't sound like every other sales email.
- Be okay with "no." Make it easy for them to decline (reduces resistance).
- Use negative reverse: "I'm not sure if this applies to you, but..."
- Don't oversell. Undersell if anything. Create curiosity, not pressure.
- Ask for permission rather than assuming interest.
- Keep it human—casual tone, no corporate speak.
- Let them feel in control of the conversation.
- Under 80 words. Low pressure, high curiosity.

Tone: Relaxed, slightly self-deprecating, genuinely okay with hearing "no."`;

const discoveryCallPrompt = `Generate Sandler-style discovery questions.

Context:
- Prospect company: [COMPANY]
- Their industry: [INDUSTRY]
- Their likely problem: [PROBLEM AREA]
- My solution: [WHAT YOU OFFER]

Sandler Discovery Approach:

PAIN QUESTIONS (uncover the real problem)
- What's not working?
- How long has this been an issue?
- What have you tried? Why didn't it work?
- What's this costing you?

BUDGET QUESTIONS (qualify early)
- Have you set aside resources to solve this?
- What would it be worth to fix?
- What happens if it doesn't fit your budget?

DECISION QUESTIONS (understand the process)
- Besides yourself, who else is involved?
- What's your timeline?
- What happens if you decide to do nothing?

NEGATIVE REVERSE QUESTIONS (let them convince themselves)
- "I'm not sure we can help, but tell me more about..."
- "Most companies don't actually fix this—why are you different?"
- "What makes you think now is the right time?"

Sandler's mantra: "No selling, just sorting." Qualify or disqualify quickly.`;

const objectionPrompt = `Handle this objection using Sandler techniques.

The objection: [PASTE OBJECTION HERE]

Context:
- My product: [WHAT YOU SELL]
- Why we're better: [KEY DIFFERENTIATOR]

Sandler Objection Handling Framework:
- Don't fight the objection. Agree with it, then explore.
- Use negative reverse: "You're probably right. Most people don't..."
- Let them talk themselves out of the objection (or into it).
- If the objection is real, acknowledge it and move on. Don't push.
- Strip lining: pull back your enthusiasm. "Maybe this isn't for you."
- Be okay losing the deal. That's what makes you credible.

Generate:
1. An agreement/acknowledgment (not defensive)
2. A negative reverse question
3. A strip line (pulling back)
4. A re-engagement if they push back on the pull-back`;

const linkedinPrompt = `Write a LinkedIn message using Sandler principles.

Context:
- Recipient: [NAME], [TITLE]
- Connection point: [How you're connected or what triggered this]
- What I want: [Meeting, intro, feedback, etc.]

Sandler LinkedIn Approach:
- Pattern interrupt: Don't open like everyone else.
- Be upfront about your intent (but low-pressure about it).
- Use negative reverse: "Not sure if this is relevant to you..."
- Make saying "no" easy—it removes resistance.
- Casual, human tone. No corporate speak.
- Under 50 words. Be the anti-sales message.

Tone: Casual, honest about intent, genuinely okay with rejection.`;

const upfrontContractPrompt = `Create a Sandler-style upfront contract for this meeting.

Context:
- Meeting purpose: [WHAT THIS CALL IS FOR]
- What I want to learn: [YOUR DISCOVERY GOALS]
- What they might want: [THEIR LIKELY GOALS]
- Possible outcomes: [YES / NO / NEXT STEP]

Sandler Upfront Contract Components:
1. Purpose: Why are we meeting?
2. Time: How long do we have?
3. Agenda: What will we cover?
4. Outcome: What are the possible endings?

Generate a conversational upfront contract that:
- Sets clear expectations for both sides
- Makes "no" an acceptable outcome
- Establishes mutual respect for time
- Removes pressure by naming what might happen

Example opening: "Before we dive in, let me make sure we're on the same page about what happens today..."`;

const exampleOutput = `Subject: Probably not for you

Sarah,

Quick question—and feel free to say no if this doesn't fit.

I noticed you've grown the sales team 3x this year. That usually creates a problem most companies don't talk about: the playbook that worked at 5 reps breaks at 15.

I'm not sure if that's happening to you. If it is, might be worth a quick conversation. If not, no worries—I'll leave you alone.

Either way, curious to hear.

— Marcus`;

const realExample = `"The Sandler Submarine: You can't skip steps. You can't go backward. And you can't come up for air until you've qualified or disqualified."

— David Sandler`;

const sandlerPrinciples = [
  { principle: 'Negative Reverse', description: 'Suggest the opposite of what you want to reduce resistance', example: '"I\'m not sure we can help..."' },
  { principle: 'Strip Lining', description: 'Pull back when they push back—makes them chase', example: '"Maybe this isn\'t for you..."' },
  { principle: 'Upfront Contract', description: 'Set expectations at the start, including "no" as an outcome', example: '"At the end of this, it\'s okay to say no..."' },
  { principle: 'Pain Funnel', description: 'Dig into the pain with progressively deeper questions', example: '"Tell me more... How long? What does that cost you?"' },
];

const relatedTonalities = [
  { slug: 'chris-voss', name: 'Chris Voss', tagline: 'Tactical Empathy' },
  { slug: 'socratic', name: 'Socratic Selling', tagline: 'Question-Led' },
  { slug: 'trusted-advisor', name: 'Trusted Advisor', tagline: 'Relationship-First' },
  { slug: 'spin-selling', name: 'SPIN Selling', tagline: 'Situation to Need' },
];

export default function SandlerTonalityPage() {
  return (
    <div className="min-h-screen bg-background">

      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="text-center mb-12">
          <Badge variant="accent" className="mb-4">Premium GTM Methodology</Badge>
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-orange-400">
              <ShieldOff className="h-6 w-6" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Sandler Selling
            </h1>
          </div>
          <p className="text-xl text-orange-600 dark:text-orange-400 font-medium mb-4">
            Reverse Selling. Pattern Interrupts. Be Okay With "No."
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Based on David Sandler's reverse psychology approach. Don't chase. Don't push.
            Let prospects convince themselves by being genuinely okay with losing the deal.
          </p>
        </div>

        {/* Real Example Quote */}
        <div className="bg-zinc-950 rounded-xl p-6 mb-12 border-l-4 border-orange-500">
          <blockquote className="text-zinc-300 italic mb-4">
            {realExample.split('\n\n')[0]}
          </blockquote>
          <p className="text-sm text-zinc-500">{realExample.split('\n\n')[1]}</p>
        </div>

        {/* Sandler Principles Table */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Core Sandler Techniques</h2>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Technique</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">What It Does</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Example</th>
                </tr>
              </thead>
              <tbody>
                {sandlerPrinciples.map((row, index) => (
                  <tr key={index} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 font-medium text-orange-600 dark:text-orange-400">{row.principle}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.description}</td>
                    <td className="px-4 py-3 text-muted-foreground italic">{row.example}</td>
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
              Sandler flips traditional sales dynamics. Instead of chasing, you pull back. Instead of
              convincing, you let them convince themselves. Instead of fearing "no," you make it an
              acceptable outcome. This creates psychological safety that paradoxically makes "yes" more likely.
            </p>
            <p>
              The core insight: <strong>people hate being sold to, but they love to buy</strong>. When you
              remove the pressure, when you're genuinely okay walking away, prospects stop resisting and
              start engaging authentically. The best Sandler practitioners often seem like they don't need
              the sale—and that's exactly why they get it.
            </p>
          </div>

          <h3 className="text-lg font-semibold text-foreground mt-8 mb-4">Key Characteristics</h3>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Be okay with "no."</strong> When rejection is acceptable, pressure disappears.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Negative reverse selling.</strong> Suggest the opposite to lower defenses.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Pattern interrupt.</strong> Don't sound like every other salesperson.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Upfront contracts.</strong> Set expectations, including that "no" is fine.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Qualify ruthlessly.</strong> "No selling, just sorting." Find fits, release non-fits.</span>
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mt-8 mb-4">When to Use</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
              <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">Best For</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Skeptical buyers who've been burned by salespeople</li>
                <li>• High-volume outreach where quick qualification matters</li>
                <li>• Consultative sales needing trust upfront</li>
                <li>• Prospects who resist traditional sales approaches</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
              <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">Avoid When</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Buyers expect confidence and conviction (visionary founders)</li>
                <li>• RFP processes with formal evaluation criteria</li>
                <li>• Situations requiring bold claims and proof points</li>
                <li>• Short transactional sales with clear needs</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Prompts Section - Gated */}
        <TonalityGate tonalityName="Sandler Selling">
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

            {/* Upfront Contract */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-foreground">Upfront Contract Builder</h3>
                <CopyButton text={upfrontContractPrompt} />
              </div>
              <div className="bg-zinc-950 rounded-xl p-6 overflow-x-auto">
                <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-mono">{upfrontContractPrompt}</pre>
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
