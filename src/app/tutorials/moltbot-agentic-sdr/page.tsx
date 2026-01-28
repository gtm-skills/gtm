import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Clock,
  CheckCircle2,
  Terminal,
  MessageSquare,
  Search,
  Mail,
  Bell,
  Copy,
  ExternalLink,
  Lightbulb,
  AlertCircle,
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Build an Agentic SDR with Moltbot | Tutorial | GTM Skills',
  description: 'Step-by-step guide to building your own agentic SDR using Moltbot. Automate company research, email drafting, and follow-ups from WhatsApp or Slack.',
  keywords: 'moltbot tutorial, agentic sdr, clawdbot sales, ai sales assistant, build ai sdr, moltbot sales automation, personal ai assistant sales',
};

const steps = [
  { id: 1, title: 'What is an Agentic SDR?' },
  { id: 2, title: 'Why Moltbot?' },
  { id: 3, title: 'Installation' },
  { id: 4, title: 'Connect Your Channels' },
  { id: 5, title: 'Build Sales Skills' },
  { id: 6, title: 'Sample Workflows' },
  { id: 7, title: 'Next Steps' },
];

export default function MoltbotTutorialPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/tutorials" className="hover:text-foreground transition-colors">
            Tutorials
          </Link>
          <span>/</span>
          <span className="text-foreground">Moltbot Agentic SDR</span>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="outline" className="border-green-500/30 text-green-400">
              <Bot className="h-3 w-3 mr-1" />
              Tutorial
            </Badge>
            <Badge variant="outline" className="text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              30 min
            </Badge>
            <Badge variant="secondary">Beginner</Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Build an Agentic SDR with Moltbot
          </h1>
          <p className="text-lg text-muted-foreground">
            Turn the open-source Moltbot into your personal sales development assistant.
            Research companies, draft personalized emails, and automate follow-ups—all from
            WhatsApp, Slack, or Telegram.
          </p>
        </div>

        {/* Table of Contents */}
        <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 mb-12">
          <h2 className="font-semibold mb-4">In this tutorial</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {steps.map((step) => (
              <a
                key={step.id}
                href={`#step-${step.id}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {step.id}. {step.title}
              </a>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          {/* Step 1 */}
          <section id="step-1" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h2 className="text-2xl font-bold m-0">What is an Agentic SDR?</h2>
            </div>
            <p className="text-muted-foreground">
              An Agentic SDR is an autonomous assistant that handles the repetitive parts of
              sales development—research, personalization, initial outreach, and follow-ups—while
              you focus on conversations that matter.
            </p>
            <p className="text-muted-foreground">
              Unlike traditional automation (static sequences, mail merge), an agentic approach:
            </p>
            <ul className="space-y-2 my-4">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong>Researches dynamically</strong> — pulls live data about companies and contacts</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong>Personalizes at scale</strong> — every message references real context</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong>Adapts to responses</strong> — handles replies, adjusts approach</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong>Keeps you in control</strong> — human approval at key decision points</span>
              </li>
            </ul>
          </section>

          {/* Step 2 */}
          <section id="step-2" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h2 className="text-2xl font-bold m-0">Why Moltbot?</h2>
            </div>
            <p className="text-muted-foreground">
              <a href="https://clawd.bot" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">
                Moltbot
              </a> (formerly Clawdbot) is an open-source personal assistant that's perfect for building an agentic SDR:
            </p>
            <div className="grid md:grid-cols-2 gap-4 my-6 not-prose">
              {[
                { icon: Terminal, title: 'Runs Locally', desc: 'Your data stays on your machine. No third-party servers.' },
                { icon: MessageSquare, title: 'Chat Anywhere', desc: 'WhatsApp, Slack, Telegram, Discord, iMessage.' },
                { icon: Search, title: '50+ Integrations', desc: 'Gmail, Calendar, GitHub, web browsing, and more.' },
                { icon: Bot, title: 'Self-Improving', desc: 'Can create and modify its own skills mid-conversation.' },
              ].map((item) => (
                <div key={item.title} className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
                  <item.icon className="h-5 w-5 text-green-400 mb-2" />
                  <div className="font-medium">{item.title}</div>
                  <div className="text-sm text-muted-foreground">{item.desc}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Step 3 */}
          <section id="step-3" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h2 className="text-2xl font-bold m-0">Installation</h2>
            </div>
            <p className="text-muted-foreground">
              Moltbot installs in one command. You'll need Node.js 18+ installed first.
            </p>

            <div className="my-6 not-prose">
              <div className="bg-zinc-900 rounded-lg overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 bg-zinc-800 border-b border-zinc-700">
                  <span className="text-sm text-zinc-400">Terminal</span>
                  <button className="text-xs text-zinc-500 hover:text-zinc-300 flex items-center gap-1">
                    <Copy className="h-3 w-3" />
                    Copy
                  </button>
                </div>
                <pre className="p-4 text-sm overflow-x-auto">
                  <code className="text-green-400">npx moltbot</code>
                </pre>
              </div>
            </div>

            <p className="text-muted-foreground">
              Or with the one-liner bash script:
            </p>

            <div className="my-6 not-prose">
              <div className="bg-zinc-900 rounded-lg overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 bg-zinc-800 border-b border-zinc-700">
                  <span className="text-sm text-zinc-400">Terminal</span>
                </div>
                <pre className="p-4 text-sm overflow-x-auto">
                  <code className="text-green-400">curl -fsSL https://clawd.bot/install.sh | bash</code>
                </pre>
              </div>
            </div>

            <p className="text-muted-foreground">
              Follow the setup wizard to:
            </p>
            <ol className="list-decimal list-inside space-y-1 text-muted-foreground my-4">
              <li>Choose your LLM provider (Anthropic recommended)</li>
              <li>Add your API key</li>
              <li>Select which chat apps to connect</li>
            </ol>
          </section>

          {/* Step 4 */}
          <section id="step-4" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center font-bold text-sm">
                4
              </div>
              <h2 className="text-2xl font-bold m-0">Connect Your Channels</h2>
            </div>
            <p className="text-muted-foreground">
              For sales workflows, we recommend connecting:
            </p>
            <ul className="space-y-3 my-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="h-4 w-4 text-green-400" />
                </div>
                <div>
                  <strong>WhatsApp</strong> — Quick messages to yourself, reminders, research results
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="h-4 w-4 text-blue-400" />
                </div>
                <div>
                  <strong>Slack</strong> — Team notifications, deal updates, research sharing
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-red-500/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-4 w-4 text-red-400" />
                </div>
                <div>
                  <strong>Gmail</strong> — Draft and send emails (with your approval)
                </div>
              </li>
            </ul>
            <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 my-6 not-prose">
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-amber-400">Pro tip</div>
                  <div className="text-sm text-muted-foreground">
                    Start with WhatsApp for testing. It's the fastest way to interact with Moltbot
                    while you're learning.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Step 5 */}
          <section id="step-5" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center font-bold text-sm">
                5
              </div>
              <h2 className="text-2xl font-bold m-0">Build Sales Skills</h2>
            </div>
            <p className="text-muted-foreground">
              Skills are reusable capabilities you teach Moltbot. Here are four essential skills
              for your agentic SDR:
            </p>

            {/* Skill 1 */}
            <div className="my-8 not-prose">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Search className="h-5 w-5 text-cyan-400" />
                Skill 1: Company Research
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Tell Moltbot how to research a company before outreach.
              </p>
              <div className="bg-zinc-900 rounded-lg overflow-hidden">
                <div className="px-4 py-2 bg-zinc-800 border-b border-zinc-700">
                  <span className="text-sm text-zinc-400">Message to Moltbot</span>
                </div>
                <pre className="p-4 text-sm overflow-x-auto whitespace-pre-wrap">
                  <code className="text-zinc-300">{`Create a skill called "research_company" that:

1. Takes a company name as input
2. Searches the web for:
   - What the company does
   - Recent news (funding, launches, hires)
   - Key executives and their backgrounds
   - Company size and growth signals
3. Returns a structured summary I can use for personalization

Format the output as:
**Company:** [name]
**What they do:** [1 sentence]
**Recent news:** [bullet points]
**Key contacts:** [names + titles]
**Personalization angles:** [3 suggestions]`}</code>
                </pre>
              </div>
            </div>

            {/* Skill 2 */}
            <div className="my-8 not-prose">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Mail className="h-5 w-5 text-purple-400" />
                Skill 2: Email Personalization
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Generate personalized cold emails using research data.
              </p>
              <div className="bg-zinc-900 rounded-lg overflow-hidden">
                <div className="px-4 py-2 bg-zinc-800 border-b border-zinc-700">
                  <span className="text-sm text-zinc-400">Message to Moltbot</span>
                </div>
                <pre className="p-4 text-sm overflow-x-auto whitespace-pre-wrap">
                  <code className="text-zinc-300">{`Create a skill called "draft_cold_email" that:

1. Takes company research + contact name + my product context
2. Writes a cold email that:
   - Subject line under 5 words
   - References something specific about them
   - States the problem I solve in their terms
   - Has one clear CTA
   - Under 100 words total
3. Provides 3 variations (direct, curious, value-first)

My product context: [describe what you sell]`}</code>
                </pre>
              </div>
            </div>

            {/* Skill 3 */}
            <div className="my-8 not-prose">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-blue-400" />
                Skill 3: LinkedIn Messages
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Craft connection requests and follow-up messages.
              </p>
              <div className="bg-zinc-900 rounded-lg overflow-hidden">
                <div className="px-4 py-2 bg-zinc-800 border-b border-zinc-700">
                  <span className="text-sm text-zinc-400">Message to Moltbot</span>
                </div>
                <pre className="p-4 text-sm overflow-x-auto whitespace-pre-wrap">
                  <code className="text-zinc-300">{`Create a skill called "linkedin_message" that:

1. Takes a person's name, title, company, and research
2. Writes a LinkedIn connection request (under 300 chars)
3. Writes a follow-up message for after they accept
4. Keeps it human, not salesy

Rules:
- No "I hope this message finds you well"
- Reference something specific
- Be genuinely curious, not pitchy`}</code>
                </pre>
              </div>
            </div>

            {/* Skill 4 */}
            <div className="my-8 not-prose">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Bell className="h-5 w-5 text-amber-400" />
                Skill 4: Follow-up Reminders
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Never let a lead go cold with automated follow-up tracking.
              </p>
              <div className="bg-zinc-900 rounded-lg overflow-hidden">
                <div className="px-4 py-2 bg-zinc-800 border-b border-zinc-700">
                  <span className="text-sm text-zinc-400">Message to Moltbot</span>
                </div>
                <pre className="p-4 text-sm overflow-x-auto whitespace-pre-wrap">
                  <code className="text-zinc-300">{`Create a skill called "follow_up_tracker" that:

1. Logs when I send an outreach (email or LinkedIn)
2. Sets a reminder for 3 days later
3. When reminded, checks if they replied
4. If no reply, drafts a follow-up message
5. After 3 follow-ups with no response, marks as "nurture"

Store this in a simple format I can review weekly.`}</code>
                </pre>
              </div>
            </div>
          </section>

          {/* Step 6 */}
          <section id="step-6" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center font-bold text-sm">
                6
              </div>
              <h2 className="text-2xl font-bold m-0">Sample Workflows</h2>
            </div>
            <p className="text-muted-foreground">
              Here's how a typical day looks with your Moltbot SDR:
            </p>

            <div className="my-6 space-y-4 not-prose">
              <div className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
                <div className="text-sm text-green-400 mb-2">Morning: Research Batch</div>
                <div className="bg-zinc-800 rounded p-3 text-sm">
                  <span className="text-blue-400">You:</span> Research these 5 companies for me: Acme Corp, Beta Inc, Gamma LLC, Delta Co, Epsilon Ltd
                </div>
                <div className="bg-zinc-900 rounded p-3 text-sm mt-2">
                  <span className="text-green-400">Moltbot:</span> Running research... Here are your 5 company profiles with personalization angles.
                </div>
              </div>

              <div className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
                <div className="text-sm text-purple-400 mb-2">Mid-morning: Draft Outreach</div>
                <div className="bg-zinc-800 rounded p-3 text-sm">
                  <span className="text-blue-400">You:</span> Draft cold emails for Sarah Chen at Acme (VP Sales) using that research
                </div>
                <div className="bg-zinc-900 rounded p-3 text-sm mt-2">
                  <span className="text-green-400">Moltbot:</span> Here are 3 email variations. Variation 1 references their Series B...
                </div>
              </div>

              <div className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
                <div className="text-sm text-amber-400 mb-2">Afternoon: Follow-up Check</div>
                <div className="bg-zinc-800 rounded p-3 text-sm">
                  <span className="text-green-400">Moltbot:</span> Reminder: No reply from 3 contacts sent Monday. Here are follow-up drafts for your approval.
                </div>
              </div>
            </div>
          </section>

          {/* Step 7 */}
          <section id="step-7" className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center font-bold text-sm">
                7
              </div>
              <h2 className="text-2xl font-bold m-0">Next Steps</h2>
            </div>

            <p className="text-muted-foreground">
              You now have a working agentic SDR. Here's how to level up:
            </p>

            <div className="my-6 space-y-4 not-prose">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5" />
                <div>
                  <strong>Use GTM Skills prompts</strong> — Our prompt library has 2,500+ templates that
                  work great with Moltbot.{' '}
                  <Link href="/industry" className="text-green-400 hover:underline">Browse by industry →</Link>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5" />
                <div>
                  <strong>Add more integrations</strong> — Connect your CRM, calendar, or other tools
                  from Moltbot's 50+ integrations.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5" />
                <div>
                  <strong>Join the community</strong> — Share your custom skills and learn from others
                  building agentic workflows.
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/20 my-6 not-prose">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-cyan-400">Limitations</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Moltbot is great for individual SDRs and small teams. For teams needing
                    shared workflows, CRM integration, analytics, and managed infrastructure,
                    you'll want a dedicated solution.
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* CTA */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-green-500/5 to-transparent border border-cyan-500/20 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Want Agentic SDR Without the Setup?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Prospeda runs these workflows at scale—research, personalization, and outbound
            with human oversight. No configuration required.
          </p>
          <a href="https://prospeda.com?utm_source=gtm-skills&utm_content=moltbot-tutorial" target="_blank" rel="noopener noreferrer">
            <Button className="gap-2 bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600">
              Explore Prospeda
              <ExternalLink className="h-4 w-4" />
            </Button>
          </a>
        </div>

        {/* Navigation */}
        <div className="mt-12 flex items-center justify-between">
          <Link href="/tutorials">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              All Tutorials
            </Button>
          </Link>
          <Link href="/agentic-bdr">
            <Button variant="outline" className="gap-2">
              Learn More About Agentic BDRs
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
