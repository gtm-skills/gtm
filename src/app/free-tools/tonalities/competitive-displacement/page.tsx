import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CopyButton } from '@/components/copy-button';
import { ArrowRight, Repeat } from 'lucide-react';
import type { Metadata } from 'next';
import { TonalityGate } from '@/components/gtm/tonality-gate';

export const metadata: Metadata = {
  title: 'Competitive Displacement Tonality | Rip & Replace Sales | Premium GTM Prompts',
  description: 'Master competitive displacement. Respectful but surgical approaches to unseat incumbents. Premium prompts for rip-and-replace deals.',
  keywords: 'competitive displacement, rip and replace sales, unseat incumbent, competitive selling, vendor switch, competitive takeout',
  openGraph: {
    title: 'Competitive Displacement | Rip & Replace Sales',
    description: 'Master competitive displacement. Surgical approaches to unseat incumbents. Premium prompts for Claude & ChatGPT.',
    type: 'website',
  },
};

const coldEmailPrompt = `Write a competitive displacement cold email.

Context:
- Prospect: [NAME], [TITLE] at [COMPANY]
- Their current vendor: [COMPETITOR THEY USE]
- Signal: [What triggered this - growth, pain signal, contract timing, etc.]
- My product: [What you sell]
- Key wedge: [The one thing you do better than the incumbent]
- When their contract renews: [If known]

Competitive Displacement Email Rules:
- Respect the incumbent. They chose it for a reason. Don't trash-talk.
- Find the wedge—the ONE capability gap that matters most to them.
- Acknowledge what's working (shows you understand their world).
- Create curiosity about what they're missing, not fear about what they have.
- Timing matters—reference contract renewal or growth trigger if known.
- Make switching feel low-risk. Migration, implementation, learning curve.
- Ask for a comparison conversation, not a full replacement pitch.
- Under 100 words. Plant a seed, don't uproot the tree.

Tone: Respectful, surgical, confident. Like someone who's done this transition before.`;

const discoveryCallPrompt = `Generate competitive displacement discovery questions.

Context:
- Prospect company: [COMPANY]
- Their current vendor: [COMPETITOR]
- What competitor does well: [THEIR STRENGTHS]
- What competitor does poorly: [THEIR GAPS]
- My wedge: [WHERE I'M STRONGER]

Competitive Displacement Discovery Approach:

SATISFACTION QUESTIONS (understand what's working)
- What do you like about [competitor]?
- What made you choose them originally?
- What's working well that you'd want to keep?

GAP QUESTIONS (find the wedge)
- What would you change if you could?
- Where does [competitor] fall short of expectations?
- What's evolved in your needs since you chose them?

SWITCHING COST QUESTIONS (understand the friction)
- What would make you consider a change?
- What's the process for evaluating alternatives?
- What concerns would you have about switching?

TIMING QUESTIONS (find the window)
- When does your contract renew?
- What would need to happen before then?
- Who else would need to be involved?

Never attack the competitor. Let them discover the gaps themselves.`;

const objectionPrompt = `Handle this objection in a competitive displacement deal.

The objection: [PASTE OBJECTION HERE]

Context:
- Competitor they use: [COMPETITOR]
- My wedge: [WHERE I'M STRONGER]
- Their likely concern: [SWITCHING COST, RISK, EFFORT]

Competitive Displacement Objection Framework:
- "We're happy with [competitor]" = Find the 10% that's not perfect
- "Switching is too much work" = Show migration path, reduce perceived risk
- "We just renewed" = Plant seed for next cycle, stay in touch
- "We've invested a lot in [competitor]" = Sunk cost fallacy, focus on future value

Generate:
1. Acknowledgment that respects their current choice
2. A question to find the gap that matters
3. A low-risk next step (comparison, not commitment)`;

const linkedinPrompt = `Write a LinkedIn message for competitive displacement.

Context:
- Recipient: [NAME], [TITLE]
- Their current vendor: [COMPETITOR]
- Signal: [What triggered this outreach]
- My wedge: [THE ONE THING I DO BETTER]

Competitive Displacement LinkedIn Approach:
- Reference a specific gap you've observed in their current approach
- Don't mention the competitor by name (tacky)
- Focus on what they might be missing, not what's wrong
- Ask if a comparison would be valuable
- Under 50 words. Surgical, not aggressive.

Tone: Respectful, curious, confident without arrogance.`;

const wedgeAnalysisPrompt = `Create a competitive wedge analysis for this deal.

Context:
- Prospect: [COMPANY]
- Current vendor: [COMPETITOR]
- My product: [WHAT I SELL]
- What I know about their setup: [ANY INTEL]

Generate a Wedge Analysis:

COMPETITOR STRENGTHS
- What does [competitor] do well?
- Why did they originally choose [competitor]?
- What would they miss if they switched?

COMPETITOR GAPS
- Where does [competitor] fall short?
- What use cases don't they serve well?
- What's changed since they chose [competitor]?

YOUR WEDGE (pick ONE)
- The single biggest gap that matters to THIS prospect
- Why this gap matters to their specific situation
- Evidence/proof that you're better in this area

SWITCHING COST ANALYSIS
- Technical migration complexity
- Organizational change management
- Learning curve / adoption
- Contract/financial considerations

NEUTRALIZATION PLAN
- How to address their strengths (don't need to beat, just neutralize)
- How to make switching feel low-risk
- Timing strategy (when to push harder)

The best wedge is narrow but deep—one thing that matters a lot, not many things that matter a little.`;

const exampleOutput = `Subject: Quick question about Salesforce

Sarah,

Congrats on the Series B. Scaling from 10 to 30 reps usually exposes some interesting gaps in how CRM data flows to the rest of the stack.

I've been talking to a few companies your size who chose Salesforce early and now find themselves building custom integrations that break every quarter.

Curious: is that a thing you're dealing with, or has your team figured out a clean solution?

Either way, would be useful to hear how you've approached it.

— Marcus`;

const realExample = `"Don't attack the competitor. Attack the problem the competitor can't solve. Let the customer connect the dots."

— Enterprise Sales Wisdom`;

const displacementStages = [
  { stage: 'Plant the Seed', goal: 'Create awareness of the gap', timing: '6-12 months before renewal' },
  { stage: 'Build the Case', goal: 'Quantify cost of staying', timing: '3-6 months before renewal' },
  { stage: 'Create Urgency', goal: 'Make switching feel inevitable', timing: '1-3 months before renewal' },
  { stage: 'Execute Switch', goal: 'Remove all friction', timing: 'At renewal' },
];

const relatedTonalities = [
  { slug: 'challenger', name: 'Challenger Sale', tagline: 'Teach & Reframe' },
  { slug: 'gap-selling', name: 'Gap Selling', tagline: 'Future State Focus' },
  { slug: 'chris-voss', name: 'Chris Voss', tagline: 'Tactical Empathy' },
  { slug: 'value-based', name: 'Value-Based', tagline: 'ROI-Focused' },
];

export default function CompetitiveDisplacementTonalityPage() {
  return (
    <div className="min-h-screen bg-background">

      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="text-center mb-12">
          <Badge variant="accent" className="mb-4">Premium GTM Situation</Badge>
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-orange-400">
              <Repeat className="h-6 w-6" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Competitive Displacement
            </h1>
          </div>
          <p className="text-xl text-orange-600 dark:text-orange-400 font-medium mb-4">
            Wedge & Switch. Respectful But Surgical.
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Purpose-built for rip-and-replace deals. Unseat incumbents by finding the wedge,
            respecting what's working, and making the switch feel inevitable.
          </p>
        </div>

        {/* Real Example Quote */}
        <div className="bg-zinc-950 rounded-xl p-6 mb-12 border-l-4 border-orange-500">
          <blockquote className="text-zinc-300 italic mb-4">
            {realExample.split('\n\n')[0]}
          </blockquote>
          <p className="text-sm text-zinc-500">{realExample.split('\n\n')[1]}</p>
        </div>

        {/* Displacement Timeline */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">The Displacement Timeline</h2>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Stage</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Goal</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Timing</th>
                </tr>
              </thead>
              <tbody>
                {displacementStages.map((row, index) => (
                  <tr key={index} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 font-medium text-orange-600 dark:text-orange-400">{row.stage}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.goal}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.timing}</td>
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
              Competitive displacement is a long game. You're not just selling your product—you're
              helping them unsee the incumbent. The key is finding the <strong>wedge</strong>: the
              single capability gap that matters most to this specific prospect.
            </p>
            <p>
              Never attack the competitor. Prospects defend choices they've made. Instead, focus on
              what they're <em>missing</em>. Let them discover the gap. Let them do the math on the
              cost of staying. Your job is to make switching feel inevitable, not aggressive.
            </p>
          </div>

          <h3 className="text-lg font-semibold text-foreground mt-8 mb-4">Key Characteristics</h3>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Find the wedge.</strong> One gap that matters beats many features that don&apos;t.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Respect the incumbent.</strong> They chose it for a reason. Don't trash-talk.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Reduce switching friction.</strong> Migration, training, risk—address all of it.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Time to renewal matters.</strong> Plant seeds early, harvest at contract renewal.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Let them discover the gap.</strong> Questions over statements. Always.</span>
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mt-8 mb-4">When to Use</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
              <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">Best For</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Rip-and-replace enterprise deals</li>
                <li>• Prospects approaching contract renewal</li>
                <li>• Clear wedge where you outperform incumbent</li>
                <li>• Deals where switching cost is the main blocker</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
              <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">Avoid When</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Prospect just bought competitor (wait)</li>
                <li>• No clear wedge / parity product</li>
                <li>• Deep integration with competitor (high switch cost)</li>
                <li>• Champion is the one who chose incumbent</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Prompts Section - Gated */}
        <TonalityGate tonalityName="Competitive Displacement">
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

            {/* Wedge Analysis */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-foreground">Wedge Analysis Builder</h3>
                <CopyButton text={wedgeAnalysisPrompt} />
              </div>
              <div className="bg-zinc-950 rounded-xl p-6 overflow-x-auto">
                <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-mono">{wedgeAnalysisPrompt}</pre>
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
