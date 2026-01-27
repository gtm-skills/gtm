import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CopyButton } from '@/components/copy-button';
import { ArrowRight, Swords } from 'lucide-react';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Challenger Sale Tonality | Teach-Tailor-Take Control | Free GTM Prompts',
  description: 'Master the Challenger Sale methodology. Teach prospects something new, tailor your message, take control of the conversation. Free prompts for Claude & ChatGPT.',
  keywords: 'challenger sale methodology, challenger selling, teach tailor take control, commercial insight selling, challenger sales approach',
  openGraph: {
    title: 'Challenger Sale Tonality | Teach-Tailor-Take Control',
    description: 'Master the Challenger Sale methodology. Free prompts for Claude & ChatGPT.',
    type: 'website',
  },
};

const coldEmailPrompt = `Write a cold email using the Challenger Sale methodology.

Context:
- Prospect: [NAME], [TITLE] at [COMPANY]
- Their industry: [INDUSTRY]
- Common assumption in their space: [WHAT MOST COMPANIES BELIEVE]
- The reframe: [THE INSIGHT THAT CHALLENGES THIS]
- My product: [What you sell]

Challenger Sale Rules:
- Lead with a commercial insight—teach them something they don't know
- Challenge their current thinking, don't validate it
- Reframe the problem before presenting the solution
- Create constructive tension (they should feel slightly uncomfortable)
- Tailor the insight to their specific situation
- Take control by defining the problem and the path forward
- Under 100 words. Insight-dense.

Tone: Confident. Educational. Slightly provocative.`;

const discoveryCallPrompt = `Generate Challenger Sale discovery questions.

Context:
- Prospect company: [COMPANY]
- Their industry assumption: [COMMON BELIEF]
- The reframe: [YOUR COUNTER-PERSPECTIVE]
- My solution: [WHAT YOU OFFER]

Challenger Approach to Discovery:
- Don't ask what their problems are—tell them what their problems should be
- Use questions to guide them to the insight, not to gather info
- Challenge assumptions they didn't know they had
- Make them question their current approach
- Build toward the "aha moment"

Generate 6 questions that:
1. Surface an assumption they hold
2. Challenge that assumption with data
3. Introduce the reframe
4. Quantify the cost of the old thinking
5. Test their openness to change
6. Transition to your solution as the logical answer`;

const objectionPrompt = `Handle this objection using the Challenger Sale methodology.

The objection: [PASTE OBJECTION HERE]

Context:
- My product: [WHAT YOU SELL]
- The insight I taught: [THE REFRAME]
- Why the old way fails: [COMMERCIAL INSIGHT]

Challenger Response Framework:
- Don't back down. The objection means they haven't fully grasped the insight.
- Acknowledge their concern, then return to the reframe
- Add new data or perspective that deepens the challenge
- Make the cost of their current thinking even clearer
- Take control by restating what should matter to them
- End by defining the next step, don't ask for it

Generate a response that teaches through the objection.`;

const linkedinPrompt = `Write a LinkedIn message using the Challenger Sale methodology.

Context:
- Recipient: [NAME], [TITLE]
- Their industry: [INDUSTRY]
- The common mistake: [WHAT MOST DO WRONG]
- The insight: [WHAT THEY SHOULD DO INSTEAD]

Challenger LinkedIn Rules:
- Open with a provocative insight, not a compliment
- Challenge something they likely believe
- Keep it short—intrigue, don't lecture
- End with a question that makes them want to learn more
- Under 50 words.`;

const insightEmailPrompt = `Write a commercial insight email using the Challenger Sale methodology.

Context:
- Prospect: [NAME] at [COMPANY]
- Their industry challenge: [BROAD PROBLEM]
- What most companies do: [COMMON APPROACH]
- Why that fails: [THE DATA/EVIDENCE]
- The better approach: [YOUR REFRAME]
- How we enable it: [YOUR SOLUTION]

Commercial Insight Framework:
1. Lead with the counterintuitive insight
2. Back it up with data or research
3. Show why the common approach fails
4. Introduce the better path
5. Position your solution as enabling the new approach
6. 150-200 words. Dense with value.

Tone: Like a trusted industry analyst, not a salesperson.`;

const exampleOutput = `Subject: Your SDR team is optimizing the wrong metric

James —

Most sales leaders measure SDRs on meetings booked. That made sense in 2015.

Here's the problem: Gartner data shows 67% of those meetings never convert to pipeline. Your team is being rewarded for activity that doesn't create revenue.

The companies outperforming right now measure SDRs on pipeline generated, not meetings set. The behavior change is dramatic.

We help teams make this shift without killing morale. Interested in seeing how Stripe did it?

— Rachel`;

const realExample = `The Challenger Sale methodology emerged from CEB research showing that 53% of customer loyalty is driven by the sales experience itself—not product, price, or service.

Top performers don't adapt to the customer's needs. They teach customers new ways to think about their business. They create "constructive tension" that motivates change.

The Challenger doesn't ask "What keeps you up at night?" They say "Here's what should keep you up at night."`;

const relatedTonalities = [
  { slug: 'socratic', name: 'Socratic', tagline: 'Question-Led' },
  { slug: 'value-based', name: 'Value-Based', tagline: 'ROI-Focused' },
  { slug: 'trusted-advisor', name: 'Trusted Advisor', tagline: 'Relationship-First' },
  { slug: 'meddic', name: 'MEDDIC', tagline: 'Qualification Framework' },
];

export default function ChallengerTonalityPage() {
  return (
    <div className="min-h-screen bg-background">

      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="text-center mb-12">
          <Badge variant="accent" className="mb-4">GTM Methodology</Badge>
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-orange-400">
              <Swords className="h-6 w-6" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Challenger Sale
            </h1>
          </div>
          <p className="text-xl text-orange-600 dark:text-orange-400 font-medium mb-4">
            Teach. Tailor. Take Control.
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Based on CEB research showing top performers challenge assumptions, not validate them.
            Lead with insight. Create constructive tension. Define the problem.
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
              The Challenger Sale flipped traditional sales wisdom. Instead of discovering needs and
              adapting, <strong>Challengers teach prospects something new about their business</strong>
              that makes them rethink their approach.
            </p>
            <p>
              The "commercial insight" is the core tool—a perspective that reframes how they see their
              problem. When done right, the prospect feels smarter for having talked to you, and your
              solution becomes the obvious path forward.
            </p>
          </div>

          <h3 className="text-lg font-semibold text-foreground mt-8 mb-4">The Three T's</h3>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Teach.</strong> Lead with insight that challenges their current thinking.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Tailor.</strong> Connect the insight to their specific business context.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Take Control.</strong> Define the problem, the solution, and the next step.</span>
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mt-8 mb-4">Key Characteristics</h3>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Commercial insight.</strong> Data or perspective they haven't considered.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Constructive tension.</strong> Healthy discomfort that motivates change.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Reframing.</strong> Change how they define the problem before solving it.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Assertive confidence.</strong> You know their business. Act like it.</span>
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mt-8 mb-4">When to Use</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
              <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">Best For</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Complex B2B sales with multiple stakeholders</li>
                <li>• Prospects stuck in status quo</li>
                <li>• Differentiated products needing new framing</li>
                <li>• Markets with educated but complacent buyers</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
              <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">Avoid When</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Prospect already knows they have the problem</li>
                <li>• Transactional sales with clear needs</li>
                <li>• You lack genuine insight for their industry</li>
                <li>• Relationship trust hasn't been established</li>
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
              <h3 className="text-lg font-semibold text-foreground">Commercial Insight Email</h3>
              <CopyButton text={insightEmailPrompt} />
            </div>
            <div className="bg-zinc-950 rounded-xl p-6 overflow-x-auto">
              <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-mono">{insightEmailPrompt}</pre>
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
