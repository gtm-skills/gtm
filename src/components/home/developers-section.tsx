/**
 * Developers Section Component
 * Code block with curl example, copy button, resource buttons
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Code, Copy, Check, ExternalLink, FileCode, Bot, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const codeExample = `curl -X GET "https://gtm-skills.com/api/v1/prompts/recommend" \\
  -H "Content-Type: application/json" \\
  -d '{
    "role": "sdr",
    "industry": "saas",
    "stage": "prospecting"
  }'`;

const resources = [
  { label: 'API Docs', href: '/developers', icon: Code },
  { label: 'OpenAPI Spec', href: '/openapi.json', icon: FileCode },
  { label: 'llms.txt', href: '/llms.txt', icon: Bot },
  { label: 'GitHub', href: 'https://github.com/gtm-skills/gtm', icon: Github, external: true },
];

export function DevelopersSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeExample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Badge variant="outline" className="mb-4 border-emerald-500/30 text-emerald-400">
            <Code className="h-3 w-3 mr-1" />
            For Developers
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Build With GTM Skills
          </h2>
          <p className="text-muted-foreground mb-8">
            Full REST API with llms.txt for agentic discovery. Build custom integrations,
            power your workflows, or let AI agents find the right prompts automatically.
          </p>

          {/* Code Block */}
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 text-left mb-8 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-xs text-zinc-500 ml-2">terminal</span>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-xs text-zinc-500 hover:text-white transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3 text-green-400" />
                    <span className="text-green-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 overflow-x-auto text-sm">
              <code className="text-zinc-300 font-mono whitespace-pre">{codeExample}</code>
            </pre>
          </div>

          {/* Resource Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {resources.map((resource) => (
              <Link
                key={resource.label}
                href={resource.href}
                target={resource.external ? '_blank' : undefined}
                rel={resource.external ? 'noopener noreferrer' : undefined}
              >
                <Button variant="outline" size="sm" className="gap-2 border-zinc-700 hover:border-emerald-500/50 hover:text-emerald-400">
                  <resource.icon className="h-4 w-4" />
                  {resource.label}
                  {resource.external && <ExternalLink className="h-3 w-3" />}
                </Button>
              </Link>
            ))}
          </div>

          <p className="text-sm text-zinc-500">
            TypeScript & Python SDKs coming soon
          </p>
        </div>
      </div>
    </section>
  );
}
