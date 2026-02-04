/**
 * Developers Hub Page
 * API documentation, llms.txt, and resources for building with GTM Skills
 */

import Link from 'next/link';
import { Code, FileCode, Bot, Github, ArrowRight, Copy, ExternalLink, Zap, Users, Workflow } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const metadata = {
  title: 'Developers | GTM Skills API',
  description: 'Build with GTM Skills. REST API, llms.txt for agentic discovery, OpenAPI spec, and SDKs coming soon.',
};

const endpoints = [
  // Prompts
  {
    method: 'GET',
    path: '/api/v1/prompts',
    description: 'List all prompts with filtering',
    params: 'category, role, industry, search, limit',
    category: 'Prompts',
  },
  {
    method: 'GET',
    path: '/api/v1/prompts/:id',
    description: 'Get a specific prompt by ID',
    params: 'id',
    category: 'Prompts',
  },
  {
    method: 'GET',
    path: '/api/v1/prompts/recommend',
    description: 'Get context-aware prompt recommendations',
    params: 'role, industry, stage, limit',
    category: 'Prompts',
  },
  // Agents
  {
    method: 'GET',
    path: '/api/v1/agents',
    description: 'List all agents (Scout, Writer, Rep, Closer)',
    params: 'none',
    category: 'Agents',
    isNew: true,
  },
  {
    method: 'GET',
    path: '/api/v1/agents/:id/skill',
    description: 'Get SKILL.md for a specific agent',
    params: 'id (scout, writer, rep, closer)',
    category: 'Agents',
    isNew: true,
  },
  {
    method: 'POST',
    path: '/api/v1/agents/orchestrate',
    description: 'Route a message to the right agent(s)',
    params: 'message, include_skills',
    category: 'Agents',
    isNew: true,
  },
  // OpenClaw
  {
    method: 'GET',
    path: '/api/v1/openclaw/skills',
    description: 'List all OpenClaw GTM skills with commands and setup',
    params: 'none',
    category: 'OpenClaw',
  },
  // Agentic BDR
  {
    method: 'GET',
    path: '/api/v1/agentic-bdr',
    description: 'Get agentic workflows and agent configurations',
    params: 'none',
    category: 'Agentic BDR',
    isNew: true,
  },
  // MCP
  {
    method: 'GET',
    path: '/api/v1/mcp',
    description: 'Get MCP tools, config examples, and setup instructions',
    params: 'none',
    category: 'MCP Server',
    isNew: true,
  },
  // Voice
  {
    method: 'GET',
    path: '/api/v1/voice/templates',
    description: 'List voice call templates for agentic SDR',
    params: 'category',
    category: 'Voice',
  },
];

const resources = [
  {
    title: 'OpenAPI Spec',
    description: 'Full API specification in OpenAPI 3.0 format',
    href: '/openapi.json',
    icon: FileCode,
    badge: 'JSON',
  },
  {
    title: 'llms.txt',
    description: 'Machine-readable file for AI agent discovery',
    href: '/llms.txt',
    icon: Bot,
    badge: 'TXT',
  },
  {
    title: 'prompts.json',
    description: 'Full prompt catalog as JSON',
    href: '/prompts.json',
    icon: Code,
    badge: 'JSON',
  },
  {
    title: 'GitHub Repository',
    description: 'Source code, examples, and contributions',
    href: 'https://github.com/gtm-skills/gtm',
    icon: Github,
    badge: 'MIT',
  },
];

const codeExamples = {
  curl: `curl "https://gtm-skills.com/api/v1/prompts/recommend" \\
  -H "Content-Type: application/json" \\
  -d '{
    "role": "sdr",
    "industry": "saas",
    "stage": "prospecting"
  }'`,
  response: `{
  "prompts": [
    {
      "id": "cold-email-series-b",
      "title": "Executive Cold Email (Series B)",
      "category": "outreach",
      "votes": 847,
      "copies": 2341
    },
    ...
  ]
}`,
};

export default function DevelopersPage() {
  return (
    <main className="min-h-screen bg-black">
      {/* Hero */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 border-emerald-500/30 text-emerald-400">
              <Code className="h-3 w-3 mr-1" />
              For Developers
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Build With GTM Skills
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              REST API, llms.txt for agentic discovery, and everything you need to integrate
              GTM Skills into your workflows.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="/openapi.json" target="_blank">
                <Button className="gap-2 bg-emerald-500 hover:bg-emerald-600">
                  <FileCode className="h-4 w-4" />
                  Download OpenAPI Spec
                </Button>
              </a>
              <a href="https://github.com/gtm-skills/gtm" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="gap-2">
                  <Github className="h-4 w-4" />
                  View on GitHub
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-12 border-t border-zinc-800">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6">Quick Start</h2>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Request */}
            <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
                <span className="text-xs text-zinc-500">Request</span>
                <button className="text-xs text-zinc-500 hover:text-white flex items-center gap-1">
                  <Copy className="h-3 w-3" />
                  Copy
                </button>
              </div>
              <pre className="p-4 text-sm overflow-x-auto">
                <code className="text-emerald-400 font-mono">{codeExamples.curl}</code>
              </pre>
            </div>

            {/* Response */}
            <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
                <span className="text-xs text-zinc-500">Response</span>
              </div>
              <pre className="p-4 text-sm overflow-x-auto">
                <code className="text-zinc-300 font-mono">{codeExamples.response}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Agents API */}
      <section id="agents-api" className="py-12 border-t border-zinc-800 bg-zinc-900/30">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <Users className="h-6 w-6 text-orange-400" />
            <h2 className="text-2xl font-bold">Agents API</h2>
            <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">NEW</Badge>
          </div>

          <p className="text-zinc-400 mb-6">
            Four agents for your sales team: <strong className="text-blue-400">Scout</strong> (research),
            <strong className="text-yellow-400"> Writer</strong> (copy),
            <strong className="text-green-400"> Rep</strong> (outreach),
            <strong className="text-purple-400"> Closer</strong> (deals).
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {/* List Agents */}
            <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
              <div className="px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
                <span className="text-xs text-zinc-500">List all agents</span>
                <Badge className="font-mono text-xs bg-emerald-500/20 text-emerald-400 border-emerald-500/30">GET</Badge>
              </div>
              <pre className="p-4 text-sm overflow-x-auto">
                <code className="text-emerald-400 font-mono">curl https://gtm-skills.com/api/v1/agents</code>
              </pre>
            </div>

            {/* Get Skill */}
            <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
              <div className="px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
                <span className="text-xs text-zinc-500">Get agent SKILL.md</span>
                <Badge className="font-mono text-xs bg-emerald-500/20 text-emerald-400 border-emerald-500/30">GET</Badge>
              </div>
              <pre className="p-4 text-sm overflow-x-auto">
                <code className="text-emerald-400 font-mono">curl https://gtm-skills.com/api/v1/agents/writer/skill</code>
              </pre>
            </div>
          </div>

          {/* Orchestrator */}
          <div id="orchestrator" className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                <Workflow className="h-6 w-6 text-orange-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">Orchestrator API</h3>
                <p className="text-zinc-400 text-sm mb-4">
                  Route any message to the right agent automatically. The orchestrator analyzes intent
                  and returns the best agent(s) to handle the task.
                </p>
                <div className="bg-black/50 rounded-lg p-4 mb-4 overflow-x-auto">
                  <pre className="text-sm">
                    <code className="text-orange-400 font-mono">{`curl -X POST "https://gtm-skills.com/api/v1/agents/orchestrate" \\
  -H "Content-Type: application/json" \\
  -d '{"message": "Find SaaS companies and write cold emails"}'`}</code>
                  </pre>
                </div>
                <div className="bg-black/30 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm">
                    <code className="text-zinc-300 font-mono">{`{
  "routing": {
    "primary": { "name": "Writer", "skill_url": "..." },
    "secondary": { "name": "Scout", "skill_url": "..." },
    "confidence": "high"
  },
  "suggested_prompt": "@Writer: Find SaaS companies..."
}`}</code>
                  </pre>
                </div>
                <div className="flex gap-3 mt-4">
                  <Link href="/agents">
                    <Button size="sm" className="gap-2 bg-orange-500 hover:bg-orange-600">
                      <Users className="h-4 w-4" />
                      Meet the Agents
                    </Button>
                  </Link>
                  <Link href="/openclaw">
                    <Button variant="outline" size="sm" className="gap-2 border-orange-500/30 text-orange-400 hover:bg-orange-500/10">
                      OpenClaw Setup
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* API Endpoints */}
      <section className="py-12 border-t border-zinc-800">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6">API Endpoints</h2>

          <div className="space-y-3">
            {endpoints.map((endpoint) => (
              <div
                key={endpoint.path}
                className={`bg-zinc-900/50 border rounded-lg p-4 hover:border-zinc-700 transition-colors ${
                  endpoint.isNew ? 'border-orange-500/30' : 'border-zinc-800'
                }`}
              >
                <div className="flex items-start gap-4">
                  <Badge
                    className={`font-mono text-xs ${
                      endpoint.method === 'GET'
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                        : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                    }`}
                  >
                    {endpoint.method}
                  </Badge>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <code className="text-white font-mono text-sm">{endpoint.path}</code>
                      {endpoint.isNew && (
                        <Badge className="text-[10px] bg-orange-500/20 text-orange-400 border-orange-500/30">
                          NEW
                        </Badge>
                      )}
                    </div>
                    <p className="text-zinc-500 text-sm mt-1">{endpoint.description}</p>
                    <p className="text-zinc-600 text-xs mt-1">
                      <span className="text-zinc-700">{endpoint.category}</span>
                      {endpoint.params !== 'none' && (
                        <> • Params: <code className="text-zinc-500">{endpoint.params}</code></>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* llms.txt Section */}
      <section className="py-12 border-t border-zinc-800">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-violet-500/10 border border-violet-500/20 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                <Bot className="h-6 w-6 text-violet-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">llms.txt for Agentic Discovery</h3>
                <p className="text-zinc-400 text-sm mb-4">
                  GTM Skills includes an llms.txt file that allows AI agents to automatically discover
                  and use our API. This enables agentic workflows where AI can find the right prompts
                  without human intervention.
                </p>
                <div className="flex gap-3">
                  <a href="/llms.txt" target="_blank">
                    <Button variant="outline" size="sm" className="gap-2 border-violet-500/30 text-violet-400 hover:bg-violet-500/10">
                      View llms.txt
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </a>
                  <a href="https://llmstxt.org" target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="sm" className="gap-2 text-zinc-500">
                      Learn about llms.txt
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-12 border-t border-zinc-800 bg-zinc-900/30">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6">Resources</h2>

          <div className="grid md:grid-cols-2 gap-4">
            {resources.map((resource) => (
              <Link
                key={resource.title}
                href={resource.href}
                target={resource.href.startsWith('http') ? '_blank' : undefined}
                rel={resource.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex items-start gap-4 p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors group"
              >
                <resource.icon className="h-6 w-6 text-zinc-500 group-hover:text-emerald-400 transition-colors" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white group-hover:text-emerald-400 transition-colors">
                      {resource.title}
                    </span>
                    <Badge className="text-[10px] bg-zinc-800 text-zinc-400 border-zinc-700">
                      {resource.badge}
                    </Badge>
                  </div>
                  <p className="text-zinc-500 text-sm">{resource.description}</p>
                </div>
                <ExternalLink className="h-4 w-4 text-zinc-600 group-hover:text-emerald-400 transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SDKs Coming Soon */}
      <section className="py-12 border-t border-zinc-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Badge variant="outline" className="mb-4 border-zinc-700 text-zinc-400">
            <Zap className="h-3 w-3 mr-1" />
            Coming Soon
          </Badge>
          <h2 className="text-2xl font-bold mb-4">TypeScript & Python SDKs</h2>
          <p className="text-muted-foreground mb-6">
            Official SDKs for TypeScript and Python are in development. Star the repo to get notified.
          </p>
          <a href="https://github.com/gtm-skills/gtm" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="gap-2">
              <Github className="h-4 w-4" />
              Watch on GitHub
            </Button>
          </a>
        </div>
      </section>
    </main>
  );
}
