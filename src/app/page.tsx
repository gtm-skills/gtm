import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FeedbackWidget } from '@/components/feedback-widget';
import { GitHubStars } from '@/components/github-stars';
import { AnimatedChatDemo } from '@/components/animated-chat-demo';

// New homepage sections
import { EcosystemBar } from '@/components/home/ecosystem-bar';
import { ToolsGrid } from '@/components/home/tools-grid';
import { VoiceShowcase } from '@/components/home/voice-showcase';
import { DevelopersSection } from '@/components/home/developers-section';

import {
  ArrowRight,
  Building2,
  Users,
  Workflow,
  BookOpen,
  FileText,
  FolderOpen,
  Zap,
  Radio,
  Download,
  Github,
  Star,
  Copy,
  Clock,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Shield,
  HelpCircle,
  Bot,
  Target,
  MessageSquare,
  BarChart3,
} from 'lucide-react';

// FAQ data for SEO and LLM optimization
const faqs = [
  {
    question: 'What is GTM Skills?',
    answer: 'GTM Skills is a free, open-source library of 2,500+ AI prompts for B2B sales and marketing. It includes prompts organized by industry (SaaS, FinTech, Healthcare), role (SDR, AE, CSM), workflow (prospecting, discovery, closing), and methodology (MEDDPICC, SPIN, Challenger). All prompts work with Claude, ChatGPT, Gemini, and any LLM.',
  },
  {
    question: 'How do I use GTM Skills with Claude or ChatGPT?',
    answer: 'Simply browse the library, find a prompt that fits your use case, click the Copy button, and paste it into Claude, ChatGPT, or any AI assistant. Replace the bracketed placeholders [LIKE THIS] with your specific context. For power users, install our MCP Server to access prompts directly inside Claude Desktop.',
  },
  {
    question: 'Is GTM Skills really free?',
    answer: 'Yes, GTM Skills is 100% free and open source under the MIT license. There are no paywalls, no signup required to copy prompts, and no usage limits. You can use it commercially or personally. The project is maintained by Prospeda.',
  },
  {
    question: 'What makes these prompts different from generic AI prompts?',
    answer: 'Every prompt in GTM Skills is specifically designed for B2B sales and marketing workflows. They include proper context-setting, output formatting, and sales-specific terminology. The prompts are battle-tested by sales professionals and optimized for real scenarios like cold outreach, discovery calls, objection handling, and proposal writing.',
  },
  {
    question: 'Can I contribute my own prompts?',
    answer: 'Yes! Fork the GitHub repository, add your prompts following our template, and submit a pull request. We review contributions within 48 hours. Check our CONTRIBUTING.md guide for detailed instructions.',
  },
  {
    question: 'What is the MCP Server?',
    answer: 'The MCP (Model Context Protocol) Server is a tool that integrates GTM Skills directly into Claude Desktop. It provides 10 AI-powered tools and 6 interactive UIs for tasks like company research, email drafting, objection handling, and more—all accessible without leaving your Claude conversation.',
  },
];

// JSON-LD for FAQ structured data
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

const categories = [
  {
    name: 'Industry Packs',
    description: '8 industries, 800+ prompts tailored to your buyers',
    href: '/industry',
    icon: Building2,
    count: '800+',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Role Playbooks',
    description: 'Complete workflows for SDR, AE, CSM, and more',
    href: '/role',
    icon: Users,
    count: '200+',
    color: 'from-purple-500 to-pink-500',
  },
  {
    name: 'Workflows',
    description: 'End-to-end sequences from cold to close',
    href: '/workflow',
    icon: Workflow,
    count: '100+',
    color: 'from-orange-500 to-red-500',
  },
  {
    name: 'Methodologies',
    description: 'MEDDPICC, SPIN, Challenger, Sandler prompts',
    href: '/methodology',
    icon: BookOpen,
    count: '50+',
    color: 'from-green-500 to-emerald-500',
  },
  {
    name: 'Templates',
    description: '200+ email templates for every scenario',
    href: '/templates',
    icon: FileText,
    count: '200+',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    name: 'Claude Projects',
    description: '10 ready-to-use system prompts',
    href: '/projects',
    icon: FolderOpen,
    count: '10',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    name: 'Signal-Based',
    description: 'Turn buying signals into conversations',
    href: '/signals',
    icon: Radio,
    count: '50+',
    color: 'from-rose-500 to-pink-500',
  },
  {
    name: 'MCP Server',
    description: '10 AI tools + 6 interactive UIs for Claude',
    href: '/free-tools/mcp-server',
    icon: Zap,
    count: 'New',
    color: 'from-amber-500 to-yellow-500',
    badge: 'MCP Apps',
  },
];

const stats = [
  { label: 'AI Prompts', value: '2,500+', icon: FileText },
  { label: 'MCP Tools', value: '10', icon: Zap },
  { label: 'Interactive UIs', value: '6', icon: Sparkles },
  { label: 'Industries', value: '8', icon: Building2 },
];

const trustLogos = [
  'SaaS Teams',
  'Sales Agencies',
  'RevOps Teams',
  'Founders',
  'SDRs & AEs',
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* FAQ JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* OpenClaw Announcement Banner - Above the fold */}
      <Link href="/openclaw" className="block">
        <div className="bg-gradient-to-r from-orange-500/20 via-red-500/10 to-orange-500/20 border-b border-orange-500/30 py-3 px-4 hover:from-orange-500/30 hover:via-red-500/20 hover:to-orange-500/30 transition-all cursor-pointer">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-sm">
            <span className="text-xl">🦞</span>
            <span className="text-white font-medium">
              <span className="hidden sm:inline">NEW: </span>OpenClaw GTM Skills
            </span>
            <span className="text-orange-400 hidden sm:inline">Research → Write → Send → Book → Track</span>
            <ArrowRight className="h-4 w-4 text-orange-400" />
          </div>
        </div>
      </Link>

      {/* Hero */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 via-transparent to-transparent" />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            {/* Top badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              <Badge variant="outline" className="border-orange-500/30 text-orange-400">
                <Star className="h-3 w-3 mr-1 fill-orange-400" />
                Free & Open Source
              </Badge>
              <Badge variant="outline" className="border-green-500/30 text-green-400">
                <Clock className="h-3 w-3 mr-1" />
                Updated Jan 2026
              </Badge>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              The GTM Operating System
              <br className="hidden sm:block" />
              <span className="sm:inline"> for </span>
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Agentic Sales
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
              2,500+ prompts, voice templates, browser extension, API, certifications, and more.
              Everything you need to build agentic sales workflows.
            </p>

            {/* Value prop callout */}
            <p className="text-sm text-orange-400/80 mb-6 flex items-center justify-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Save 5+ hours per week on research, emails, and call prep
            </p>

            {/* Animated Command Demo */}
            <div className="mb-12">
              <AnimatedChatDemo />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/industry">
                <Button size="lg" className="h-12 px-6 gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                  Browse Prompts
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <a
                href="https://github.com/Prospeda/gtm-skills"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="lg" className="h-12 px-6 gap-2">
                  <Github className="h-4 w-4" />
                  Star on GitHub
                  <GitHubStars repo="Prospeda/gtm-skills" className="text-xs text-muted-foreground ml-1" />
                </Button>
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-12">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="relative p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors"
                >
                  <stat.icon className="h-5 w-5 text-orange-500 mb-2 mx-auto" />
                  <div className="text-2xl md:text-3xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Trust indicators */}
            <div className="flex flex-col items-center gap-3">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Used by</p>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-zinc-500">
                {trustLogos.map((name) => (
                  <span key={name} className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-500/70" />
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem Bar - Shows all features */}
      <EcosystemBar />

      {/* Tonalities Showcase - Hero Follow */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-transparent border-y border-purple-500/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4 border-purple-500/30 text-purple-400">
              <Sparkles className="h-3 w-3 mr-1" />
              24 Writing Styles
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Write Like the Masters
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Adopt the voice of legendary communicators. One prompt transforms your sales copy instantly.
            </p>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-3 max-w-5xl mx-auto mb-8">
            {[
              { name: 'Jobs', emoji: '🍎', style: 'Vision' },
              { name: 'Bezos', emoji: '📦', style: 'Customer' },
              { name: 'Voss', emoji: '🎯', style: 'Empathy' },
              { name: 'Hormozi', emoji: '💰', style: 'Value' },
              { name: 'Hemingway', emoji: '✍️', style: 'Sparse' },
              { name: 'Ogilvy', emoji: '📰', style: 'Direct' },
              { name: 'Buffett', emoji: '📈', style: 'Folksy' },
              { name: 'Naval', emoji: '🧠', style: 'Principles' },
              { name: 'Godin', emoji: '🟣', style: 'Remarkable' },
            ].map((tonality) => (
              <Link
                key={tonality.name}
                href="/free-tools/tonalities"
                className="bg-zinc-900/70 border border-zinc-800 rounded-xl p-3 hover:border-purple-500/50 hover:bg-purple-500/5 transition-all group text-center"
              >
                <div className="text-2xl mb-1">{tonality.emoji}</div>
                <div className="font-semibold text-sm text-zinc-200 group-hover:text-purple-400 transition-colors">
                  {tonality.name}
                </div>
                <div className="text-[10px] text-zinc-500">{tonality.style}</div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link href="/free-tools/tonalities">
              <Button className="gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                Explore All 24 Styles
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <p className="text-xs text-zinc-500 mt-3">
              + MEDDIC, SPIN, Challenger, Sandler & 15 more methodologies
            </p>
          </div>
        </div>
      </section>

      {/* Social Proof Banner */}
      <section className="py-4 bg-zinc-900/50 border-y border-zinc-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-2 text-sm text-zinc-500">
            <span className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-500" />
              MIT Licensed
            </span>
            <span className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-amber-500" />
              No signup required
            </span>
            <span className="flex items-center gap-2">
              <Download className="h-4 w-4 text-blue-500" />
              Instant copy & download
            </span>
            <span className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-purple-500" />
              Works with any LLM
            </span>
          </div>
        </div>
      </section>

      {/* Tools & Integrations Grid - NEW */}
      <ToolsGrid />

      {/* Categories Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-zinc-700 text-zinc-400">
              8 Categories
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Sell Smarter
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Organized by industry, role, workflow, and methodology. Copy any prompt and paste into your favorite AI.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="group relative p-6 rounded-xl border border-border bg-card hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/5"
              >
                {category.badge && (
                  <Badge className="absolute top-4 right-4 text-[10px] bg-amber-500/20 text-amber-400 border-amber-500/30">
                    {category.badge}
                  </Badge>
                )}
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-foreground">{category.name}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {category.count}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {category.description}
                </p>
                <ArrowRight className="absolute top-6 right-6 h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NEW: MCP Apps Feature Highlight */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-amber-500/5 via-transparent to-purple-500/5 border-y border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-4 border-amber-500/30 text-amber-400">
                <Sparkles className="h-3 w-3 mr-1" />
                New: MCP Apps Support
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Interactive AI Tools Inside Claude
              </h2>
              <p className="text-muted-foreground mb-6">
                Our GTM MCP Server now includes 6 interactive UIs that render directly in Claude Desktop.
                Write emails with live preview, handle objections with step-by-step frameworks,
                and more—all without leaving your conversation.
              </p>
              <div className="space-y-3 mb-6">
                {[
                  'Email Composer with tone selection',
                  'LinkedIn message builder with character count',
                  'Company & lead research cards',
                  'Objection handling framework',
                  'Follow-up sequence timeline',
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <Link href="/free-tools/mcp-server">
                <Button className="gap-2">
                  Explore MCP Server
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="relative">
              <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-zinc-800">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-xs text-zinc-500 ml-2">Claude Desktop</span>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="bg-zinc-800/50 rounded-lg p-3">
                    <span className="text-zinc-500">You:</span> Draft a cold email to Sarah Chen, VP Sales at Acme
                  </div>
                  <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-lg p-3 border border-amber-500/20">
                    <div className="flex items-center gap-2 text-amber-400 text-xs mb-2">
                      <Sparkles className="h-3 w-3" />
                      Interactive UI
                    </div>
                    <div className="text-zinc-300">Email Composer loaded with 3 variations...</div>
                  </div>
                </div>
              </div>
              {/* Decorative glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-purple-500/20 rounded-xl blur-xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground">
              Three steps to better sales conversations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="font-semibold mb-2">Find Your Prompt</h3>
              <p className="text-sm text-muted-foreground">
                Browse by industry, role, or workflow. Use search to find exactly what you need.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="font-semibold mb-2">Copy & Customize</h3>
              <p className="text-sm text-muted-foreground">
                Click copy, replace [BRACKETS] with your context, paste into Claude or ChatGPT.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="font-semibold mb-2">Close More Deals</h3>
              <p className="text-sm text-muted-foreground">
                Get instant, quality output. Research, emails, objection handling—done in seconds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Prompt */}
      <section className="py-16 md:py-24 bg-card/50 border-y border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-4 border-orange-500/30 text-orange-400">
                Sample Prompt
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                See What You Get
              </h2>
              <p className="text-muted-foreground mb-6">
                Every prompt is designed to be copy-paste ready. Just fill in the brackets and go.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Copy className="h-5 w-5 text-orange-500 mt-0.5" />
                  <div>
                    <div className="font-medium">One-click copy</div>
                    <div className="text-sm text-muted-foreground">
                      No signup required for any prompt
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Download className="h-5 w-5 text-orange-500 mt-0.5" />
                  <div>
                    <div className="font-medium">Download packs</div>
                    <div className="text-sm text-muted-foreground">
                      Get entire categories as markdown files
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-orange-500 mt-0.5" />
                  <div>
                    <div className="font-medium">MCP Integration</div>
                    <div className="text-sm text-muted-foreground">
                      Run prompts directly in Claude Code
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900 rounded-xl p-6 font-mono text-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-zinc-400">Cold Email — Direct Tone</span>
                <Button variant="outline" size="sm" className="h-7 text-xs">
                  <Copy className="h-3 w-3 mr-1" />
                  Copy
                </Button>
              </div>
              <pre className="text-zinc-300 whitespace-pre-wrap overflow-x-auto">
{`Write a cold email to [PERSON], [TITLE] at [COMPANY].

Tone: Direct. No fluff. Respect their time.

Context:
- They [SIGNAL: raised funding / hired X / launched Y]
- We help [TYPE] companies with [PROBLEM]
- Our differentiator: [ONE THING]

Rules:
- Subject line under 5 words
- Body under 75 words
- One clear CTA
- No "I hope this finds you well"`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Agentic BDR Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5 border-y border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-4 border-cyan-500/30 text-cyan-400">
                <Bot className="h-3 w-3 mr-1" />
                The Future of Outbound
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What is an Agentic BDR?
              </h2>
              <p className="text-muted-foreground mb-6">
                Agentic BDRs are AI agents that autonomously research accounts, personalize messaging,
                and execute multi-step outbound sequences—with human oversight, not replacement.
              </p>
              <div className="space-y-4 mb-6">
                {[
                  { icon: Target, title: 'Research Agents', desc: 'Gather 10-K data, news, and buying signals automatically' },
                  { icon: MessageSquare, title: 'Personalization Agents', desc: 'Craft 1:1 messaging based on real context' },
                  { icon: BarChart3, title: 'Execution Agents', desc: 'Orchestrate sequences across email, LinkedIn, and more' },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-4 w-4 text-cyan-400" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{item.title}</div>
                      <div className="text-xs text-muted-foreground">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/agentic-bdr">
                  <Button className="gap-2">
                    Learn About Agentic BDRs
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <a href="https://prospeda.com" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="gap-2">
                    See It In Action
                  </Button>
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
                <div className="space-y-4 font-mono text-sm">
                  <div className="flex items-start gap-3">
                    <Bot className="h-5 w-5 text-cyan-400 mt-0.5" />
                    <div>
                      <div className="text-cyan-400 text-xs mb-1">Research Agent</div>
                      <div className="text-zinc-300">Found 3 buying signals for Acme Corp...</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Bot className="h-5 w-5 text-purple-400 mt-0.5" />
                    <div>
                      <div className="text-purple-400 text-xs mb-1">Personalization Agent</div>
                      <div className="text-zinc-300">Drafted email referencing their Series B...</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Bot className="h-5 w-5 text-green-400 mt-0.5" />
                    <div>
                      <div className="text-green-400 text-xs mb-1">Execution Agent</div>
                      <div className="text-zinc-300">Queued for review → Approved → Sent</div>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-zinc-800">
                    <div className="text-xs text-zinc-500">Human approved • 47 emails sent today • 12% reply rate</div>
                  </div>
                </div>
              </div>
              {/* Decorative glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-xl blur-xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Voice Showcase - NEW */}
      <VoiceShowcase />

      {/* Certification Promo - NEW */}
      {/* Developers Section */}
      <DevelopersSection />

      {/* Support the Project CTA */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <Badge variant="outline" className="mb-4 border-zinc-700 text-zinc-400">
              <Star className="h-3 w-3 mr-1 text-yellow-400" />
              Support Open Source
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Help Us Reach More Sales Teams
            </h2>
            <p className="text-muted-foreground mb-8">
              Star us on GitHub to help other sales professionals discover these resources.
            </p>
            <a href="https://github.com/Prospeda/gtm-skills" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="h-12 px-8 gap-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700">
                <Github className="h-5 w-5" />
                <Star className="h-4 w-4 text-yellow-400" />
                Star on GitHub
                <GitHubStars repo="Prospeda/gtm-skills" className="text-sm text-zinc-400 ml-1" />
              </Button>
            </a>
            <p className="text-xs text-muted-foreground mt-4">
              100% free • MIT licensed • Open source
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-card/50 border-y border-border">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-zinc-700 text-zinc-400">
              <HelpCircle className="h-3 w-3 mr-1" />
              FAQ
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Everything you need to know about GTM Skills
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-colors"
              >
                <h3 className="font-semibold text-lg mb-2 text-foreground">
                  {faq.question}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GitHub CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-orange-500/10 via-red-500/10 to-transparent border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-zinc-900 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

            <div className="relative">
              <Badge className="mb-4 bg-orange-500/20 text-orange-400 border-orange-500/30">
                Open Source
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Free Forever. Open Source.
              </h2>
              <p className="text-zinc-400 max-w-xl mx-auto mb-8">
                GTM Skills is 100% free and open source under the MIT license. Star the repo to help other sales teams discover it.
              </p>
              <a href="https://github.com/Prospeda/gtm-skills" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="h-12 px-8 gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                  <Github className="h-5 w-5" />
                  Star on GitHub
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback Widget */}
      <FeedbackWidget />
    </div>
  );
}
