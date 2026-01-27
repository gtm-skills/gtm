import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CopyButton } from '@/components/copy-button';
import { ArrowRight, Crosshair } from 'lucide-react';
import type { Metadata } from 'next';
import { TonalityGate } from '@/components/gtm/tonality-gate';

export const metadata: Metadata = {
  title: 'Command of the Message Tonality | Value Framework Sales | Premium GTM Prompts',
  description: 'Master Command of the Message. Required Capabilities, Positive Business Outcomes, and Value Frameworks for enterprise sales. Premium prompts for Claude/ChatGPT.',
  keywords: 'command of the message, force management, value framework, required capabilities, positive business outcomes, enterprise sales methodology',
  openGraph: {
    title: 'Command of the Message | Value Framework Sales',
    description: 'Master Command of the Message. Structured value articulation for enterprise deals. Premium prompts for Claude & ChatGPT.',
    type: 'website',
  },
};

const coldEmailPrompt = `Write a cold email using Command of the Message principles.

Context:
- Prospect: [NAME], [TITLE] at [COMPANY]
- Signal: [What triggered this outreach - funding, hire, product launch, etc.]
- My product: [What you sell]
- Required Capability I enable: [A capability they must have to succeed]
- Positive Business Outcome: [The measurable result they want]

Command of the Message Email Approach:
- Connect to a Positive Business Outcome (PBO) they care about
- Hint at a Required Capability they may be missing
- Be specific about the business impact (metrics, outcomes)
- Differentiate: Why you vs. alternatives?
- Don't pitch features. Pitch outcomes tied to capabilities.
- Use their language—the outcomes they measure and care about.
- Under 100 words. Outcome-focused, not feature-focused.

Tone: Business-focused, outcome-driven, credible. Like a strategic advisor, not a vendor.`;

const discoveryCallPrompt = `Generate Command of the Message discovery questions.

Context:
- Prospect company: [COMPANY]
- Their industry: [INDUSTRY]
- Their likely challenges: [PROBLEM AREA]
- My solution: [WHAT YOU OFFER]

Command of the Message Discovery Structure:

NEGATIVE CONSEQUENCES (current state problems)
- What challenges are you facing with [problem area]?
- What happens if these challenges continue?
- How is this affecting [revenue/cost/risk/time]?

POSITIVE BUSINESS OUTCOMES (desired future state)
- What does success look like for you?
- What metrics would improve if you solved this?
- How would solving this affect your [specific business goal]?

REQUIRED CAPABILITIES (what they need)
- What capabilities do you need to achieve [PBO]?
- What's missing from your current approach?
- What would you need to see in a solution?

METRICS (how they measure success)
- How do you measure success in this area?
- What KPIs matter most to your leadership?
- What would move the needle?

Generate 3 questions for each category. The goal is to build a Value Framework you can use throughout the deal.`;

const objectionPrompt = `Handle this objection using Command of the Message principles.

The objection: [PASTE OBJECTION HERE]

Context:
- My product: [WHAT YOU SELL]
- Our differentiation: [KEY DIFFERENTIATOR]
- Required Capability I enable: [CAPABILITY]
- Positive Business Outcome: [PBO]

Command of the Message Objection Framework:
- Reframe around the Positive Business Outcome, not the feature
- Tie back to the Required Capability—do they still need it?
- Use proof points: who else achieved the PBO?
- Differentiate: why can we deliver this and others can't?
- If price is the objection, the PBO isn't big enough or clear enough

Generate:
1. Acknowledgment of the objection
2. Reframe to the Positive Business Outcome
3. Proof point (who else achieved this)
4. Differentiation statement`;

const linkedinPrompt = `Write a LinkedIn message using Command of the Message principles.

Context:
- Recipient: [NAME], [TITLE]
- Connection point: [How you're connected or what triggered this]
- Required Capability: [CAPABILITY THEY MIGHT NEED]
- Positive Business Outcome: [PBO THEY CARE ABOUT]

Command of the Message LinkedIn Approach:
- Lead with a Positive Business Outcome relevant to their role
- Hint at a Required Capability that drives that outcome
- Reference a proof point if possible
- Keep it outcome-focused, not feature-focused
- Under 60 words. Strategic, not salesy.

Tone: Business peer, outcome-focused, credible.`;

const valueFrameworkPrompt = `Build a Command of the Message Value Framework for this deal.

Context:
- Prospect company: [COMPANY]
- Their role: [TITLE/FUNCTION]
- Industry: [INDUSTRY]
- Your product: [WHAT YOU SELL]
- Key differentiators: [WHAT MAKES YOU DIFFERENT]

Generate a complete Value Framework:

NEGATIVE CONSEQUENCES (Problems/Current State)
- What challenges exist today?
- What's the business impact?
- What happens if nothing changes?

POSITIVE BUSINESS OUTCOMES (Desired Future State)
- What outcomes do they want?
- How do they measure success?
- What metrics matter?

REQUIRED CAPABILITIES (What They Need)
- What capabilities must they have to achieve PBOs?
- Map each capability to a specific PBO
- Which capabilities do you uniquely provide?

METRICS (Quantifiable Measures)
- Before/after metrics
- Time to value
- ROI calculation

DIFFERENTIATION (Why You)
- What do you do that competitors don't?
- Unique approach or technology?
- Proof points from similar customers

This framework becomes the foundation for all conversations throughout the deal.`;

const exampleOutput = `Subject: Reducing SDR ramp from 90 to 45 days

Sarah,

Growing from 5 to 15 SDRs is exciting—until you realize the playbook that worked at 5 breaks at 15.

The outcome most revenue leaders want: SDRs at quota in 45 days, not 90. The capability that drives it: a research system that makes every rep as effective as your best rep.

We helped Ramp cut ramp time by 48% while improving meeting quality scores. Same hires, different enablement approach.

Worth exploring if the same capability could unlock similar outcomes for you?

— Marcus`;

const realExample = `"Reps who can articulate value—through Required Capabilities tied to Positive Business Outcomes—win at higher rates and command higher prices."

— Force Management, Command of the Message`;

const valueFramework = [
  { element: 'Negative Consequences', description: 'Problems in their current state', question: 'What happens if nothing changes?' },
  { element: 'Positive Business Outcomes', description: 'Desired results/future state', question: 'What does success look like?' },
  { element: 'Required Capabilities', description: 'What they need to get outcomes', question: 'What must you be able to do?' },
  { element: 'Metrics', description: 'How success is measured', question: 'How will you know it\'s working?' },
];

const relatedTonalities = [
  { slug: 'meddic', name: 'MEDDIC', tagline: 'Qualification Framework' },
  { slug: 'challenger', name: 'Challenger Sale', tagline: 'Teach & Reframe' },
  { slug: 'value-based', name: 'Value-Based', tagline: 'ROI-Focused' },
  { slug: 'gap-selling', name: 'Gap Selling', tagline: 'Future State Focus' },
];

export default function CommandOfMessageTonalityPage() {
  return (
    <div className="min-h-screen bg-background">

      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="text-center mb-12">
          <Badge variant="accent" className="mb-4">Premium GTM Methodology</Badge>
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-orange-400">
              <Crosshair className="h-6 w-6" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Command of the Message
            </h1>
          </div>
          <p className="text-xl text-orange-600 dark:text-orange-400 font-medium mb-4">
            Value Frameworks. Required Capabilities. Positive Business Outcomes.
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Based on Force Management's enterprise sales methodology. Structure your value
            articulation around capabilities that drive outcomes. Win deals at higher prices.
          </p>
        </div>

        {/* Real Example Quote */}
        <div className="bg-zinc-950 rounded-xl p-6 mb-12 border-l-4 border-orange-500">
          <blockquote className="text-zinc-300 italic mb-4">
            {realExample.split('\n\n')[0]}
          </blockquote>
          <p className="text-sm text-zinc-500">{realExample.split('\n\n')[1]}</p>
        </div>

        {/* Value Framework Table */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">The Value Framework</h2>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Element</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">What It Is</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Key Question</th>
                </tr>
              </thead>
              <tbody>
                {valueFramework.map((row, index) => (
                  <tr key={index} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 font-medium text-orange-600 dark:text-orange-400">{row.element}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.description}</td>
                    <td className="px-4 py-3 text-muted-foreground italic">{row.question}</td>
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
              Command of the Message is about <strong>value articulation</strong>. Too many salespeople
              pitch features. Winners articulate how their Required Capabilities drive Positive Business
              Outcomes that the buyer cares about.
            </p>
            <p>
              When you can connect what you do to what they want to achieve—and quantify it—you command
              higher prices and win more deals. The methodology gives you a structured way to have value
              conversations throughout the entire sales cycle, not just at the end.
            </p>
          </div>

          <h3 className="text-lg font-semibold text-foreground mt-8 mb-4">Key Characteristics</h3>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Outcomes over features.</strong> Never pitch what you do. Pitch what they get.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Required Capabilities.</strong> What must they be able to do to achieve their goals?</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Positive Business Outcomes.</strong> Measurable results they want to achieve.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Metrics matter.</strong> Quantify everything. Before/after. ROI. Time to value.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Differentiate.</strong> Why can you deliver outcomes that others can't?</span>
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mt-8 mb-4">When to Use</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
              <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">Best For</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Enterprise sales with multiple stakeholders</li>
                <li>• Deals where value articulation drives price</li>
                <li>• Complex solutions requiring business justification</li>
                <li>• Teams needing consistent messaging across reps</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
              <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">Avoid When</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Simple, transactional sales</li>
                <li>• PLG motions where users self-serve</li>
                <li>• Early-stage companies without proof points</li>
                <li>• Buyers who just want to see the product</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Prompts Section - Gated */}
        <TonalityGate tonalityName="Command of the Message">
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

            {/* Value Framework Builder */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-foreground">Value Framework Builder</h3>
                <CopyButton text={valueFrameworkPrompt} />
              </div>
              <div className="bg-zinc-950 rounded-xl p-6 overflow-x-auto">
                <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-mono">{valueFrameworkPrompt}</pre>
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
