import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CopyButton } from '@/components/copy-button';
import { ArrowRight, RotateCw } from 'lucide-react';
import type { Metadata } from 'next';
import { TonalityGate } from '@/components/gtm/tonality-gate';

export const metadata: Metadata = {
  title: 'Win-Back Campaign Tonality | Re-Engagement Sales | Premium GTM Prompts',
  description: 'Master win-back campaigns. Re-engage churned accounts and dormant opportunities with grace. Premium prompts for Claude/ChatGPT.',
  keywords: 'win back campaign, customer re-engagement, churned customer outreach, lost deal recovery, dormant opportunity, reactivation campaign',
  openGraph: {
    title: 'Win-Back Campaign | Re-Engagement Sales',
    description: 'Master win-back campaigns. Re-engage churned accounts with grace. Premium prompts for Claude & ChatGPT.',
    type: 'website',
  },
};

const coldEmailPrompt = `Write a win-back email for a churned customer.

Context:
- Former customer: [NAME], [TITLE] at [COMPANY]
- Why they churned: [REASON IF KNOWN - budget, competitor, need changed, etc.]
- How long since they left: [TIME PERIOD]
- What's changed since: [NEW FEATURES, APPROACH, OR THEIR SITUATION]
- Signal for re-engagement: [What triggered this outreach]

Win-Back Email Rules:
- Acknowledge the relationship. Don't pretend it didn't happen.
- No guilt-tripping. They had reasons. Respect that.
- Show what's changed—either in your product or their situation.
- Make coming back feel low-friction, not awkward.
- Don't assume they remember everything about you.
- Fresh start framing > "we want you back" desperation.
- Low-pressure ask: conversation, not commitment.
- Under 100 words. Warm, not needy.

Tone: Warm, humble, genuinely curious about their situation. Like reaching out to an old colleague.`;

const discoveryCallPrompt = `Generate win-back discovery questions.

Context:
- Former customer: [COMPANY]
- Why they left: [REASON IF KNOWN]
- Time since churn: [PERIOD]
- What's changed: [YOUR IMPROVEMENTS OR THEIR SITUATION]

Win-Back Discovery Approach:

UNDERSTANDING THE DEPARTURE
- Help me understand what led to the decision to move on?
- What were you hoping to find that we didn't provide?
- Was there a specific moment or issue that tipped the decision?

CURRENT STATE
- How has [their solution area] evolved since we last spoke?
- What are you using now? How's it working?
- What's different about your needs today vs. then?

OPENNESS TO CHANGE
- What would need to be true for you to consider a change?
- Is this something you're actively thinking about, or is timing bad?
- Who else would need to be involved in a conversation like this?

WHAT'S CHANGED (on your side)
- Here's what we've improved since you left... [be specific]
- Does any of that address what drove the original decision?

Listen more than you pitch. They chose to leave for a reason.`;

const objectionPrompt = `Handle this objection in a win-back conversation.

The objection: [PASTE OBJECTION HERE]

Context:
- Why they churned originally: [REASON]
- What's changed since: [IMPROVEMENTS]
- Their current situation: [WHAT YOU KNOW]

Win-Back Objection Framework:
- "We're happy now" = Respect it, but stay in touch
- "It didn't work for us" = Acknowledge, share what's changed, don't defend the past
- "We've invested in [competitor]" = Understand the commitment, find the wedge
- "Timing isn't right" = Agree, establish future touchpoint

Generate:
1. Acknowledgment without defensiveness
2. Question to understand current state
3. What's changed (brief, relevant)
4. Low-pressure next step or permission to stay in touch`;

const linkedinPrompt = `Write a LinkedIn message to a former customer.

Context:
- Former contact: [NAME], [TITLE]
- Their company: [COMPANY]
- How long since you worked together: [TIME]
- Trigger for outreach: [WHAT PROMPTED THIS]

Win-Back LinkedIn Approach:
- Acknowledge the history. Personal > professional.
- Don't immediately pitch. Re-establish the relationship.
- Show genuine curiosity about their current situation.
- If appropriate, share something valuable (not salesy).
- Only ask for a conversation if there's a genuine reason.
- Under 50 words. Warm, not transactional.

Tone: Like catching up with someone you used to work with. Human first.`;

const winBackSequencePrompt = `Create a win-back email sequence for churned accounts.

Context:
- Target segment: [WHO ARE THESE CHURNED CUSTOMERS]
- Primary churn reason: [WHY THEY LEFT]
- What's changed: [PRODUCT IMPROVEMENTS OR MARKET CHANGES]
- Goal: [RE-ENGAGEMENT MEETING / TRIAL / DEMO]

Generate a 4-email sequence:

EMAIL 1: The Acknowledgment
- Acknowledge the relationship
- Show you remember them (personalization)
- No pitch—just genuine check-in
- Ask about their current situation

EMAIL 2: The Update (2-3 days later)
- Share what's changed since they left
- Be specific and relevant to their churn reason
- Make it about them, not you
- Soft ask: "Worth a fresh look?"

EMAIL 3: The Value Add (1 week later)
- Share something useful (no strings attached)
- Industry insight, benchmark data, or resource
- Show you're thinking about their success, not just the sale
- "Thought of you when I saw this..."

EMAIL 4: The Graceful Close (1 week later)
- Last touch for now
- Clear permission to re-engage later
- Leave the door open
- "I'll leave you alone unless you say otherwise..."

Each email should be under 100 words. Warm, not desperate.`;

const exampleOutput = `Subject: Been a while

Sarah,

It's been about 18 months since Acme moved on from us. Totally get why—at the time, the integration gaps were a real blocker.

Quick update: we've rebuilt the entire data pipeline since then. Specifically solved the Salesforce sync issue that I remember being painful for your team.

Not sure if you're still dealing with pipeline data challenges, but if you are, might be worth a fresh conversation.

Either way, hope all is well with the team.

— Marcus`;

const realExample = `"The goal of a win-back campaign isn't to convince them they were wrong to leave. It's to show them that coming back is the right decision today."

— Re-Engagement Best Practices`;

const winBackPrinciples = [
  { principle: 'Acknowledge', description: 'Honor the relationship and their decision', avoid: 'Pretending nothing happened' },
  { principle: 'No Guilt', description: 'They had reasons. Respect them.', avoid: '"We miss you!" desperation' },
  { principle: 'Show Change', description: 'What\'s different now (you or them)', avoid: 'Same pitch that didn\'t work before' },
  { principle: 'Low Friction', description: 'Make coming back easy', avoid: 'Big commitments upfront' },
];

const relatedTonalities = [
  { slug: 'chris-voss', name: 'Chris Voss', tagline: 'Tactical Empathy' },
  { slug: 'trusted-advisor', name: 'Trusted Advisor', tagline: 'Relationship-First' },
  { slug: 'sandler', name: 'Sandler', tagline: 'Reverse Selling' },
  { slug: 'warren-buffett', name: 'Warren Buffett', tagline: 'Folksy Authority' },
];

export default function WinBackTonalityPage() {
  return (
    <div className="min-h-screen bg-background">

      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="text-center mb-12">
          <Badge variant="accent" className="mb-4">Premium GTM Situation</Badge>
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-orange-400">
              <RotateCw className="h-6 w-6" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Win-Back Campaign
            </h1>
          </div>
          <p className="text-xl text-orange-600 dark:text-orange-400 font-medium mb-4">
            Re-Engagement. Acknowledge Change. Low-Pressure Return.
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Purpose-built for churned accounts and dormant opportunities. Honor the past relationship,
            show what's changed, and make coming back feel like the right move—not an awkward one.
          </p>
        </div>

        {/* Real Example Quote */}
        <div className="bg-zinc-950 rounded-xl p-6 mb-12 border-l-4 border-orange-500">
          <blockquote className="text-zinc-300 italic mb-4">
            {realExample.split('\n\n')[0]}
          </blockquote>
          <p className="text-sm text-zinc-500">{realExample.split('\n\n')[1]}</p>
        </div>

        {/* Win-Back Principles Table */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Win-Back Principles</h2>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Principle</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">What It Means</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Avoid</th>
                </tr>
              </thead>
              <tbody>
                {winBackPrinciples.map((row, index) => (
                  <tr key={index} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 font-medium text-orange-600 dark:text-orange-400">{row.principle}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.description}</td>
                    <td className="px-4 py-3 text-muted-foreground text-red-400">{row.avoid}</td>
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
              Former customers aren't lost deals—they're people who trusted you once. The goal isn't
              to prove they were wrong to leave. It's to show them that <strong>coming back is the
              right decision today</strong>.
            </p>
            <p>
              This requires humility. Acknowledge the relationship. Respect their decision. Show what's
              changed—either in your product or in their world. And make the return path feel natural,
              not desperate. The best win-backs feel like reconnecting with an old friend, not a sales pitch.
            </p>
          </div>

          <h3 className="text-lg font-semibold text-foreground mt-8 mb-4">Key Characteristics</h3>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Acknowledge the history.</strong> Don't pretend it didn't happen. Honor the relationship.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">No guilt-tripping.</strong> "We miss you!" is desperate. Respect their decision.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Show what's changed.</strong> New features, new approach, or new situation. Something is different.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Low-friction return.</strong> Conversation, not commitment. Make saying yes easy.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Human first.</strong> Write like you're catching up with someone, not selling to them.</span>
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mt-8 mb-4">When to Use</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
              <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">Best For</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Churned customers (especially if you've improved)</li>
                <li>• Dormant opportunities that went cold</li>
                <li>• Lost deals approaching contract renewal</li>
                <li>• Customers whose situation has changed</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
              <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">Avoid When</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Churn was due to serious trust breach</li>
                <li>• Nothing has actually changed</li>
                <li>• They explicitly asked not to be contacted</li>
                <li>• Very recent churn (give it time)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Prompts Section - Gated */}
        <TonalityGate tonalityName="Win-Back Campaign">
          <div className="space-y-8 mb-12">
            <h2 className="text-2xl font-bold text-foreground">The Prompts</h2>

            {/* Cold Email */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-foreground">Win-Back Email</h3>
                <CopyButton text={coldEmailPrompt} />
              </div>
              <div className="bg-zinc-950 rounded-xl p-6 overflow-x-auto">
                <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-mono">{coldEmailPrompt}</pre>
              </div>
            </div>

            {/* Discovery Call */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-foreground">Win-Back Discovery Questions</h3>
                <CopyButton text={discoveryCallPrompt} />
              </div>
              <div className="bg-zinc-950 rounded-xl p-6 overflow-x-auto">
                <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-mono">{discoveryCallPrompt}</pre>
              </div>
            </div>

            {/* Objection Handling */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-foreground">Win-Back Objection Handling</h3>
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

            {/* Win-Back Sequence */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-foreground">Win-Back Sequence Builder</h3>
                <CopyButton text={winBackSequencePrompt} />
              </div>
              <div className="bg-zinc-950 rounded-xl p-6 overflow-x-auto">
                <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-mono">{winBackSequencePrompt}</pre>
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
