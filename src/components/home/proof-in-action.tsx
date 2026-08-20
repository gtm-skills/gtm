/**
 * Proof In Action
 *
 * Single unified module telling one story — Prompt -> Copy -> Agent Runs It -> Result —
 * via tabs instead of four separate stacked sections. Content below is reused verbatim
 * from the previous "MCP Apps Feature Highlight", "How It Works", "Sample Prompt", and
 * "Agentic BDR Section" blocks on the homepage.
 */

'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CopyButton } from '@/components/copy-button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArrowRight,
  BarChart3,
  Bot,
  CheckCircle2,
  Copy,
  Download,
  MessageSquare,
  Sparkles,
  Target,
  Zap,
} from 'lucide-react';

// Verbatim from the former "How It Works" section
const howItWorksSteps = [
  { step: '1', title: 'Find Your Prompt', desc: 'Browse by industry, role, or workflow. Use search to find exactly what you need.' },
  { step: '2', title: 'Copy & Customize', desc: 'Click copy, replace [BRACKETS] with your context, paste into Claude or ChatGPT.' },
  { step: '3', title: 'Close More Deals', desc: 'Get instant, quality output. Research, emails, objection handling—done in seconds.' },
];

// Verbatim from the former "Sample Prompt" section
const samplePrompt = `Write a cold email to [PERSON], [TITLE] at [COMPANY].

Tone: Direct. No fluff. Respect their time.

Context:
- They [SIGNAL: raised funding / hired X / launched Y]
- We help [TYPE] companies with [PROBLEM]
- Our differentiator: [ONE THING]

Rules:
- Subject line under 5 words
- Body under 75 words
- One clear CTA
- No "I hope this finds you well"`;

const samplePromptFeatures = [
  { icon: Copy, title: 'One-click copy', desc: 'No signup required for any prompt' },
  { icon: Download, title: 'Download packs', desc: 'Get entire categories as markdown files' },
  { icon: Zap, title: 'MCP Integration', desc: 'Run prompts directly in Claude Code' },
];

// Verbatim from the former "MCP Apps Feature Highlight" section
const mcpFeatures = [
  'Email Composer with tone selection',
  'LinkedIn message builder with character count',
  'Company & lead research cards',
  'Objection handling framework',
  'Follow-up sequence timeline',
];

// Verbatim from the former "Agentic BDR Section"
const agenticBdrItems = [
  { icon: Target, title: 'Research Agents', desc: 'Gather 10-K data, news, and buying signals automatically' },
  { icon: MessageSquare, title: 'Personalization Agents', desc: 'Craft 1:1 messaging based on real context' },
  { icon: BarChart3, title: 'Execution Agents', desc: 'Orchestrate sequences across email, LinkedIn, and more' },
];

export function ProofInAction() {
  return (
    <section className="py-16 md:py-24 bg-card/50 border-y border-border">
      <div className="max-w-7xl mx-auto px-6">
        {/* Intro — condensed "How It Works" */}
        <div className="text-center mb-10">
          <Badge variant="outline" className="label-mono mb-4 text-[11px] border-border text-muted-foreground">
            How It Works
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            From Prompt to Result
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            See exactly what happens when you use GTM Skills — pick a prompt yourself, or let an agent run it end to end.
          </p>

          <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto text-left">
            {howItWorksSteps.map((item) => (
              <div key={item.step} className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 text-sm font-bold">
                  {item.step}
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="text-foreground font-medium">{item.title}.</span> {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs: Prompt -> Copy -> Agent Runs It -> Result */}
        <Tabs defaultValue="prompt" className="items-center gap-8">
          <TabsList className="h-auto flex-wrap justify-center gap-1 p-1">
            <TabsTrigger value="prompt" className="gap-2 px-4 py-2">
              <Copy className="h-4 w-4 text-primary" />
              1. Pick a Prompt
            </TabsTrigger>
            <TabsTrigger value="mcp" className="gap-2 px-4 py-2">
              <Sparkles className="h-4 w-4 text-primary" />
              2. Or Let an Agent Run It
            </TabsTrigger>
            <TabsTrigger value="agent" className="gap-2 px-4 py-2">
              <Bot className="h-4 w-4 text-primary" />
              3. Agent Executes
            </TabsTrigger>
          </TabsList>

          {/* Tab 1: Sample Prompt (verbatim from "Sample Prompt" section) */}
          <TabsContent value="prompt" className="w-full">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="outline" className="label-mono mb-4 text-[11px] border-primary/30 text-primary">
                  Sample Prompt
                </Badge>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  See What You Get
                </h3>
                <p className="text-muted-foreground mb-6">
                  Every prompt is designed to be copy-paste ready. Just fill in the brackets and go.
                </p>
                <div className="space-y-4">
                  {samplePromptFeatures.map((feature) => (
                    <div key={feature.title} className="flex items-start gap-3">
                      <feature.icon className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <div className="font-medium">{feature.title}</div>
                        <div className="text-sm text-muted-foreground">{feature.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border font-mono text-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-muted-foreground">Cold Email — Direct Tone</span>
                  <CopyButton text={samplePrompt} label="proof-in-action-sample-prompt" className="h-7 text-xs" />
                </div>
                <pre className="text-foreground whitespace-pre-wrap overflow-x-auto">
{samplePrompt}
                </pre>
              </div>
            </div>
          </TabsContent>

          {/* Tab 2: MCP Apps (verbatim from "MCP Apps Feature Highlight" section) */}
          <TabsContent value="mcp" className="w-full">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="outline" className="label-mono mb-4 text-[11px] border-primary/30 text-primary">
                  <Sparkles className="h-3 w-3 mr-1" />
                  New: MCP Apps Support
                </Badge>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Interactive AI Tools Inside Claude
                </h3>
                <p className="text-muted-foreground mb-6">
                  Our GTM MCP Server now includes 6 interactive UIs that render directly in Claude Desktop.
                  Write emails with live preview, handle objections with step-by-step frameworks,
                  and more—all without leaving your conversation.
                </p>
                <div className="space-y-3 mb-6">
                  {mcpFeatures.map((feature) => (
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

              <div className="bg-card rounded-xl p-4 border border-border">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-xs text-muted-foreground ml-2">Claude Desktop</span>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="bg-muted/50 rounded-lg p-3">
                    <span className="text-muted-foreground">You:</span> Draft a cold email to Sarah Chen, VP Sales at Acme
                  </div>
                  <div className="bg-muted rounded-lg p-3 border border-border">
                    <div className="flex items-center gap-2 text-primary text-xs mb-2">
                      <Sparkles className="h-3 w-3" />
                      Interactive UI
                    </div>
                    <div className="text-foreground">Email Composer loaded with 3 variations...</div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Tab 3: Agentic BDR (verbatim from "Agentic BDR Section") */}
          <TabsContent value="agent" className="w-full">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="outline" className="label-mono mb-4 text-[11px] border-primary/30 text-primary">
                  <Bot className="h-3 w-3 mr-1" />
                  The Future of Outbound
                </Badge>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  What is an Agentic BDR?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Agentic BDRs are AI agents that autonomously research accounts, personalize messaging,
                  and execute multi-step outbound sequences—with human oversight, not replacement.
                </p>
                <div className="space-y-4 mb-6">
                  {agenticBdrItems.map((item) => (
                    <div key={item.title} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-4 w-4 text-primary" />
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

              <div className="bg-card rounded-xl p-6 border border-border">
                <div className="space-y-4 font-mono text-sm">
                  <div className="flex items-start gap-3">
                    <Bot className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <div className="text-primary text-xs mb-1">Research Agent</div>
                      <div className="text-foreground">Found 3 buying signals for Acme Corp...</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Bot className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <div className="text-primary text-xs mb-1">Personalization Agent</div>
                      <div className="text-foreground">Drafted email referencing their Series B...</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Bot className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <div className="text-green-500 text-xs mb-1">Execution Agent</div>
                      <div className="text-foreground">Queued for review → Approved → Sent</div>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-border">
                    <div className="text-xs text-muted-foreground">Human approved • 47 emails sent today • 12% reply rate</div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
