import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EmailSignup } from '@/components/email-signup';
import { FeedbackWidget } from '@/components/feedback-widget';
import { GitHubStars } from '@/components/github-stars';
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
} from 'lucide-react';

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
    href: '/mcp',
    icon: Zap,
    count: 'New',
    color: 'from-amber-500 to-yellow-500',
    badge: 'MCP Apps',
  },
];

const stats = [
  { label: 'AI Prompts', value: '2,000+', icon: FileText },
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
      {/* Hero */}
      <section className="relative py-20 md:py-32 overflow-hidden">
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
              2,000+ GTM Prompts for
              <span className="block bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                B2B Sales & Marketing
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
              The most comprehensive GTM prompt library for Claude, ChatGPT, and any LLM.
              Industry packs, role playbooks, workflows, and methodologies.
            </p>

            {/* Value prop callout */}
            <p className="text-sm text-orange-400/80 mb-6 flex items-center justify-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Save 5+ hours per week on research, emails, and call prep
            </p>

            {/* Command snippet */}
            <div className="relative max-w-2xl mx-auto mb-12">
              <div className="bg-zinc-900/80 rounded-2xl border border-zinc-700/50 p-6 md:p-8 font-mono text-sm md:text-base backdrop-blur-sm shadow-2xl shadow-black/40">
                {/* Terminal header */}
                <div className="flex items-center justify-between mb-5 pb-4 border-b border-zinc-700/50">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-2">
                      <div className="w-3.5 h-3.5 rounded-full bg-red-500" />
                      <div className="w-3.5 h-3.5 rounded-full bg-yellow-500" />
                      <div className="w-3.5 h-3.5 rounded-full bg-green-500" />
                    </div>
                    <span className="text-sm text-zinc-400 font-sans">Claude Code</span>
                  </div>
                  <span className="text-xs text-zinc-500 font-sans">gtm-skills</span>
                </div>

                {/* Command lines */}
                <div className="space-y-4">
                  {/* Line 1 - Comment */}
                  <div className="text-zinc-500 text-sm">
                    <span className="text-zinc-600"># Research any company instantly</span>
                  </div>

                  {/* Line 2 - Main command */}
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-400 select-none">$</span>
                    <div className="flex-1">
                      <span className="text-orange-400 font-bold">/gtm</span>
                      <span className="text-zinc-100"> research </span>
                      <span className="text-cyan-400">Acme Corp</span>
                      <span className="text-zinc-100"> for </span>
                      <span className="text-purple-400">enterprise sales</span>
                      <span className="animate-pulse text-orange-400 ml-1">|</span>
                    </div>
                  </div>

                  {/* Line 3 - Output preview */}
                  <div className="mt-4 pt-4 border-t border-zinc-800/50 space-y-2">
                    <div className="flex items-center gap-2 text-zinc-400 text-sm">
                      <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                      <span className="text-zinc-300">Generating research brief...</span>
                    </div>
                    <div className="pl-5 space-y-1.5 text-sm">
                      <div className="text-zinc-500">
                        <span className="text-green-400">✓</span> Company overview & recent news
                      </div>
                      <div className="text-zinc-500">
                        <span className="text-green-400">✓</span> Key stakeholders & org structure
                      </div>
                      <div className="text-zinc-500">
                        <span className="text-green-400">✓</span> Pain points & buying triggers
                      </div>
                      <div className="text-zinc-500">
                        <span className="text-green-400">✓</span> Personalized outreach angles
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom tagline */}
              <div className="mt-4 text-center">
                <p className="text-sm text-zinc-500">
                  One command. Full GTM power.
                  <span className="text-zinc-400 ml-2">Works in Claude Code, Projects & Chat.</span>
                </p>
              </div>
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
              <Link href="/mcp">
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

      {/* Newsletter CTA */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <Badge variant="outline" className="mb-4 border-zinc-700 text-zinc-400">
              Weekly Updates
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get New Prompts Weekly
            </h2>
            <p className="text-muted-foreground mb-8">
              Join 1,000+ GTM professionals. New prompts, templates, and workflows delivered every week.
            </p>
            <EmailSignup
              variant="hero"
              source="homepage"
              placeholder="you@company.com"
              buttonText="Subscribe Free"
            />
            <p className="text-xs text-muted-foreground mt-4">
              No spam. Unsubscribe anytime. We respect your inbox.
            </p>
          </div>
        </div>
      </section>

      {/* Prospeda CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-orange-500/10 via-red-500/10 to-transparent border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-zinc-900 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

            <div className="relative">
              <Badge className="mb-4 bg-orange-500/20 text-orange-400 border-orange-500/30">
                Done-For-You
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Want AI That Runs These Prompts For You?
              </h2>
              <p className="text-zinc-400 max-w-xl mx-auto mb-8">
                Prospeda is an AI sales team that finds leads, runs research, and writes personalized outreach—automatically.
              </p>
              <a href="https://prospeda.com" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="h-12 px-8 gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                  Learn About Prospeda
                  <ArrowRight className="h-4 w-4" />
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
