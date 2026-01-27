import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CopyButton } from '@/components/copy-button';
import { ArrowRight, HelpCircle } from 'lucide-react';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Socratic Selling | Question-Led Discovery | Free GTM Prompts',
  description: 'Master Socratic selling. Lead with questions, not pitches. Guide prospects to their own conclusions. Free prompts for Claude & ChatGPT.',
  keywords: 'socratic selling, question based selling, discovery questions sales, consultative selling questions, sales questioning techniques',
  openGraph: {
    title: 'Socratic Selling | Question-Led Discovery',
    description: 'Master Socratic selling. Lead with questions, not pitches. Free prompts for Claude & ChatGPT.',
    type: 'website',
  },
};

const coldEmailPrompt = `Write a cold email using Socratic selling methodology.

Context:
- Prospect: [NAME], [TITLE] at [COMPANY]
- Their likely challenge: [HYPOTHESIS ABOUT THEIR SITUATION]
- My product: [What you sell]
- The insight: [WHAT YOU KNOW ABOUT THEIR SITUATION]

Socratic Cold Email Rules:
- Lead with a question, not a statement
- The question should make them think about their situation
- Don't pitch—prompt reflection
- Show you've thought about their world
- Create curiosity about the answer
- End with one question, not a CTA
- Under 75 words.

Tone: Curious. Thoughtful. Non-threatening.`;

const discoveryCallPrompt = `Generate Socratic discovery questions that lead to insight.

Context:
- Prospect company: [COMPANY]
- Their likely situation: [WHAT YOU HYPOTHESIZE]
- The insight you want them to reach: [CONCLUSION]
- My solution: [WHAT YOU OFFER]

Socratic Discovery Principles:
- Never tell them something you can ask them
- Each question builds on the previous answer
- Lead them to discover the problem themselves
- Make them feel smart for reaching the conclusion
- Use silence after questions—let them think
- The best questions have no "right" answer

Generate a question sequence that guides them to insight:
1. Opening question (establishes topic)
2. Situation question (understand current state)
3. Problem question (surface the challenge)
4. Implication question (explore consequences)
5. Need-payoff question (imagine the solution)
6. Commitment question (what would they do differently)`;

const objectionPrompt = `Handle this objection using Socratic questioning.

The objection: [PASTE OBJECTION HERE]

Context:
- My product: [WHAT YOU SELL]
- The insight I want them to reach: [WHAT SHOULD THEY REALIZE]

Socratic Response Framework:
- Never argue with the objection directly
- Ask a question that makes them examine their assumption
- Guide them to see the flaw in their own thinking
- Let them convince themselves
- Use "What if..." and "How do you think about..." formats
- End with a question, not a statement

Generate 3 Socratic questions that could reframe this objection.`;

const linkedinPrompt = `Write a LinkedIn message using Socratic methodology.

Context:
- Recipient: [NAME], [TITLE]
- Their likely challenge: [HYPOTHESIS]
- What I want: [Meeting, intro, feedback, etc.]

Socratic LinkedIn Rules:
- Open with a genuine question about their world
- Make it a question you're actually curious about
- The question should prompt self-reflection
- No pitch, no features, no "I help companies like yours"
- Under 40 words.`;

const spinPrompt = `Generate SPIN questions for this prospect.

Context:
- Prospect: [NAME] at [COMPANY]
- Their role: [TITLE]
- Suspected pain area: [HYPOTHESIS]
- My solution: [WHAT YOU OFFER]

SPIN Framework (Socratic Applied to Sales):

S - Situation Questions:
Understand their current state (use sparingly—research first)

P - Problem Questions:
Surface difficulties, dissatisfaction, challenges

I - Implication Questions:
Explore consequences and ripple effects of the problem

N - Need-Payoff Questions:
Guide them to articulate the value of solving it

Generate 2 questions for each category that lead to your solution.`;

const exampleOutput = `Subject: Quick question

Sarah —

When Acme's pipeline slowed last quarter, how did your team diagnose why?

I've been thinking about this challenge lately—the gap between "we need more pipeline" and actually knowing which lever to pull.

Curious how you approach it.

— Marcus`;

const realExample = `Socrates never told anyone anything. He asked questions until they discovered the truth themselves.

In sales, this is powerful because:
1. People don't resist their own conclusions
2. Insights feel more valuable when self-discovered
3. Questions create engagement; statements create defensiveness
4. The prospect does the work of convincing themselves

"The only true wisdom is knowing you know nothing." Use questions to help them discover what they don't know.`;

const questionTypes = [
  {
    type: 'Clarifying',
    example: '"When you say \'slow\', what does that look like specifically?"',
    purpose: 'Get precise understanding',
  },
  {
    type: 'Probing',
    example: '"What do you think is causing that?"',
    purpose: 'Go deeper into reasoning',
  },
  {
    type: 'Assumption',
    example: '"What are you assuming has to be true for that to work?"',
    purpose: 'Examine underlying beliefs',
  },
  {
    type: 'Implication',
    example: '"If that continues, what happens in 6 months?"',
    purpose: 'Explore consequences',
  },
  {
    type: 'Perspective',
    example: '"How does your CEO see this situation?"',
    purpose: 'Expand viewpoint',
  },
  {
    type: 'Hypothetical',
    example: '"If you could solve this completely, what would change?"',
    purpose: 'Envision outcomes',
  },
];

const relatedTonalities = [
  { slug: 'challenger', name: 'Challenger', tagline: 'Teach & Reframe' },
  { slug: 'chris-voss', name: 'Chris Voss', tagline: 'Tactical Empathy' },
  { slug: 'pain-point-research', name: 'Pain Point Research', tagline: 'Deep Discovery' },
  { slug: 'trusted-advisor', name: 'Trusted Advisor', tagline: 'Relationship-First' },
];

export default function SocraticPage() {
  return (
    <div className="min-h-screen bg-background">

      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="text-center mb-12">
          <Badge variant="accent" className="mb-4">GTM Methodology</Badge>
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-orange-400">
              <HelpCircle className="h-6 w-6" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Socratic Selling
            </h1>
          </div>
          <p className="text-xl text-orange-600 dark:text-orange-400 font-medium mb-4">
            Lead With Questions. Guide to Insight. Let Them Convince Themselves.
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Based on the Socratic method of questioning. Never tell someone something you can ask
            them. Guide prospects to discover problems and solutions themselves.
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
              Socrates believed that <strong>knowledge is within—it just needs to be drawn out</strong>.
              His method was simple: ask questions that make people examine their own beliefs until
              they discover truth themselves.
            </p>
            <p>
              In sales, this is transformative. Prospects resist being told what to think. But when
              they reach a conclusion through their own reasoning, they own it. They don't need to
              be convinced—they've already convinced themselves.
            </p>
          </div>

          <h3 className="text-lg font-semibold text-foreground mt-8 mb-4">Question Types</h3>
          <div className="grid gap-4">
            {questionTypes.map((q) => (
              <div key={q.type} className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-900">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-orange-600 dark:text-orange-400">{q.type}</span>
                  <span className="text-xs text-muted-foreground">{q.purpose}</span>
                </div>
                <p className="text-sm text-muted-foreground italic">{q.example}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold text-foreground mt-8 mb-4">Core Principles</h3>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Never tell, always ask.</strong> If you can ask it, don't state it.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Build on answers.</strong> Each question should follow from what they said.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Use silence.</strong> After you ask, wait. Let them think.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Guide, don't push.</strong> You're a thinking partner, not an interrogator.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500">→</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Be genuinely curious.</strong> Fake curiosity is obvious. Real questions engage.</span>
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mt-8 mb-4">When to Use</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
              <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">Best For</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Complex problems requiring self-discovery</li>
                <li>• Prospects who resist being "sold to"</li>
                <li>• Building deep understanding in discovery</li>
                <li>• Handling objections without confrontation</li>
                <li>• C-level conversations</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
              <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">Avoid When</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• They just want information fast</li>
                <li>• Transactional sales with clear needs</li>
                <li>• Time-pressured situations</li>
                <li>• When you should be challenging, not exploring</li>
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
              <h3 className="text-lg font-semibold text-foreground">SPIN Questions Framework</h3>
              <CopyButton text={spinPrompt} />
            </div>
            <div className="bg-zinc-950 rounded-xl p-6 overflow-x-auto">
              <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-mono">{spinPrompt}</pre>
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
