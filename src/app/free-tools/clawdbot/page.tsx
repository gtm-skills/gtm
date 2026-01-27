import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CopyButton } from '@/components/copy-button';
import {
  ArrowRight,
  ChevronRight,
  Slack,
  Bot,
  Zap,
  MessageSquare,
  Users,
  Settings,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ClawdBot Setup Guide | AI Sales Assistant for Slack',
  description: 'Set up ClawdBot, an AI sales assistant powered by Claude, in your Slack workspace. Automate research, write emails, and handle objections.',
  openGraph: {
    title: 'ClawdBot: AI Sales Assistant for Slack',
    description: 'Turn Slack into your AI-powered sales command center with ClawdBot.',
  },
};

const features = [
  {
    icon: MessageSquare,
    title: 'Instant Research',
    description: 'Ask ClawdBot to research any company or prospect. Get summaries in seconds.',
  },
  {
    icon: Zap,
    title: 'Email Generation',
    description: 'Generate cold emails, follow-ups, and responses directly in Slack.',
  },
  {
    icon: Users,
    title: 'Objection Handling',
    description: 'Paste an objection, get a response using Chris Voss or other tonalities.',
  },
  {
    icon: Bot,
    title: 'Deal Coaching',
    description: 'Ask for advice on stuck deals, negotiation tactics, or next steps.',
  },
];

const steps = [
  {
    number: '01',
    title: 'Create a Slack App',
    content: `1. Go to api.slack.com/apps
2. Click "Create New App" → "From scratch"
3. Name it "ClawdBot" and select your workspace
4. Click "Create App"`,
  },
  {
    number: '02',
    title: 'Configure Bot Permissions',
    content: `1. Go to "OAuth & Permissions" in the sidebar
2. Scroll to "Scopes" → "Bot Token Scopes"
3. Add these scopes:
   • app_mentions:read
   • chat:write
   • channels:history
   • groups:history
   • im:history
   • users:read`,
  },
  {
    number: '03',
    title: 'Enable Event Subscriptions',
    content: `1. Go to "Event Subscriptions" in sidebar
2. Toggle "Enable Events" ON
3. Set Request URL to your server endpoint
4. Under "Subscribe to bot events" add:
   • app_mention
   • message.im`,
  },
  {
    number: '04',
    title: 'Install to Workspace',
    content: `1. Go to "Install App" in sidebar
2. Click "Install to Workspace"
3. Authorize the permissions
4. Copy the "Bot User OAuth Token" (starts with xoxb-)`,
  },
  {
    number: '05',
    title: 'Set Up Your Server',
    content: `Deploy the ClawdBot server code (below) to:
• Vercel (serverless)
• Railway
• Your own VPS

The server receives Slack events and calls Claude API.`,
  },
  {
    number: '06',
    title: 'Add Environment Variables',
    content: `SLACK_BOT_TOKEN=xoxb-your-token
SLACK_SIGNING_SECRET=your-signing-secret
ANTHROPIC_API_KEY=your-claude-api-key`,
  },
];

const serverCode = `// pages/api/slack/events.ts (Next.js example)
import { NextApiRequest, NextApiResponse } from 'next';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = \`You are ClawdBot, an AI sales assistant. You help sales teams with:
- Company and prospect research
- Writing cold emails and follow-ups
- Handling objections
- Deal strategy and coaching

Be concise. Use bullet points. Be actionable.
When writing emails, use the appropriate tonality (Hemingway for technical buyers, Chris Voss for negotiations, etc.).\`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Verify Slack request (implement signature verification)

  const { type, event } = req.body;

  // Handle URL verification
  if (type === 'url_verification') {
    return res.json({ challenge: req.body.challenge });
  }

  // Handle mentions
  if (event?.type === 'app_mention' || event?.type === 'message') {
    const userMessage = event.text.replace(/<@[A-Z0-9]+>/g, '').trim();

    // Call Claude
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userMessage }],
    });

    // Post response to Slack
    await fetch('https://slack.com/api/chat.postMessage', {
      method: 'POST',
      headers: {
        'Authorization': \`Bearer \${process.env.SLACK_BOT_TOKEN}\`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        channel: event.channel,
        text: response.content[0].text,
        thread_ts: event.ts,
      }),
    });
  }

  res.status(200).end();
}`;

const examplePrompts = [
  {
    title: 'Company Research',
    prompt: '@ClawdBot research Stripe. Give me 5 pain points I can use in outreach to their engineering team.',
  },
  {
    title: 'Cold Email',
    prompt: '@ClawdBot write a cold email to the VP of Engineering at Datadog. Use Hemingway style. Hook: they just raised Series E.',
  },
  {
    title: 'Objection Response',
    prompt: '@ClawdBot the prospect said "we built something in-house already." Help me respond using Chris Voss techniques.',
  },
  {
    title: 'Deal Strategy',
    prompt: '@ClawdBot I have a $50k deal stuck at procurement for 3 weeks. Champion is VP Sales, blocker is CFO. What should I do?',
  },
  {
    title: 'Discovery Questions',
    prompt: '@ClawdBot generate 5 SPIN questions for a discovery call with a fintech startup evaluating our payment API.',
  },
];

export default function ClawdBotPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/free-tools" className="hover:text-foreground transition-colors">
            Free Tools
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">ClawdBot</span>
        </div>

        {/* Hero */}
        <div className="mb-12">
          <Badge variant="outline" className="mb-4 border-purple-500/30 text-purple-400">
            Slack Integration
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            ClawdBot: AI Sales Assistant for Slack
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Turn Slack into your AI-powered sales command center. Research prospects,
            write emails, handle objections - all without leaving your workspace.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Slack className="h-5 w-5" />
              <span>Works with any Slack workspace</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Bot className="h-5 w-5" />
              <span>Powered by Claude</span>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-4 mb-16">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-4 rounded-xl border border-border bg-card"
            >
              <feature.icon className="h-6 w-6 text-purple-400 mb-3" />
              <h3 className="font-semibold mb-1">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Setup Guide */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Setup Guide</h2>
          <div className="space-y-6">
            {steps.map((step) => (
              <div
                key={step.number}
                className="flex gap-4 p-6 rounded-xl border border-border bg-card"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <span className="text-purple-400 font-bold">{step.number}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                  <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-mono bg-zinc-900 rounded-lg p-4">
                    {step.content}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Server Code */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Server Code</h2>
            <CopyButton text={serverCode} />
          </div>
          <div className="bg-zinc-900 rounded-xl p-6 overflow-x-auto">
            <pre className="text-sm text-zinc-300 font-mono whitespace-pre">
              {serverCode}
            </pre>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            This is a minimal example. For production, add proper error handling,
            rate limiting, and Slack signature verification.
          </p>
        </div>

        {/* Example Prompts */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Example Prompts</h2>
          <div className="space-y-4">
            {examplePrompts.map((example) => (
              <div
                key={example.title}
                className="p-4 rounded-xl border border-border bg-card"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-purple-400">{example.title}</h3>
                  <CopyButton text={example.prompt} />
                </div>
                <p className="text-sm text-muted-foreground font-mono">
                  {example.prompt}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Pro Tips */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Pro Tips</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-green-400 mb-1">Do</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Give context (company, role, deal stage)</li>
                    <li>• Specify the tonality you want</li>
                    <li>• Ask for specific output formats</li>
                    <li>• Create a #sales-ai channel for ClawdBot</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-red-400 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-red-400 mb-1">Don't</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Share sensitive customer data</li>
                    <li>• Use for final customer communications</li>
                    <li>• Forget to review before sending</li>
                    <li>• Expect it to replace human judgment</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced: Custom System Prompt */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-4">Customize the System Prompt</h2>
          <p className="text-muted-foreground mb-4">
            Make ClawdBot smarter by customizing the system prompt with your company context:
          </p>
          <div className="bg-zinc-900 rounded-xl p-6">
            <pre className="text-sm text-zinc-300 font-mono whitespace-pre-wrap">{`const SYSTEM_PROMPT = \`You are ClawdBot, the AI sales assistant for [YOUR COMPANY].

Our product: [DESCRIBE YOUR PRODUCT]
Our ICP: [IDEAL CUSTOMER PROFILE]
Our competitors: [LIST COMPETITORS]
Our key differentiators: [WHAT MAKES YOU DIFFERENT]

Tonalities available:
- Hemingway: For technical buyers. Short sentences. Strong verbs.
- Chris Voss: For negotiations. Tactical empathy. Calibrated questions.
- Steve Jobs: For premium positioning. Brutally direct.
- Jeff Bezos: For complex deals. Customer-obsessed narratives.

When writing emails, always ask which tonality to use if not specified.
When researching, focus on pain points relevant to our product.
When coaching, consider our specific sales methodology.\`;`}</pre>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center p-8 rounded-xl bg-zinc-900">
          <h2 className="text-2xl font-bold text-white mb-4">
            Want ClawdBot Without the Setup?
          </h2>
          <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
            Prospeda includes a pre-built AI assistant that integrates with your CRM,
            enriches leads automatically, and writes outreach at scale.
          </p>
          <a href="https://github.com/Prospeda/gtm-skills" target="_blank" rel="noopener noreferrer">
            <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
              Try Prospeda Free
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
