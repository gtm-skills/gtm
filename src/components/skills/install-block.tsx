'use client';

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Check, Copy } from 'lucide-react';
import { AGENTS, type Agent, type Skill } from '@/data/skills';
import { trackEvent } from '@/lib/analytics';

const SITE = 'https://gtm-skills.com';

/**
 * Agent-first install: the user copies a prompt, their agent fetches the files.
 * For premium skills the prompt includes the user's API key placeholder.
 */
export function InstallBlock({ skill, apiKeyHint }: { skill: Skill; apiKeyHint?: string | null }) {
  const [copied, setCopied] = useState<string | null>(null);
  const agents = skill.agents.filter((a) => a !== 'claude-desktop');

  const promptFor = (agent: Agent) => {
    const dir = AGENTS[agent].installDir.replace('<slug>', skill.slug);
    const auth = skill.tier === 'premium'
      ? ` with header "Authorization: Bearer ${apiKeyHint ?? 'YOUR_GTM_SKILLS_KEY'}"`
      : '';
    return `Install the "${skill.name}" skill from GTM Skills.
Fetch ${SITE}/api/skills/${skill.slug}/install?agent=${agent}${auth}.
The JSON has "files": [{path, content}]. Write each file to ${dir}<path>.
Then confirm the SKILL.md loaded and summarize what the skill does in one line.`;
  };

  const copy = async (agent: Agent) => {
    await navigator.clipboard.writeText(promptFor(agent));
    setCopied(agent);
    trackEvent('install_copied', { slug: skill.slug, method: 'prompt', agent });
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="px-5 pt-4 pb-3 border-b border-border flex items-center justify-between">
        <span className="label-mono text-xs text-muted-foreground">Install</span>
        <span className="text-xs text-muted-foreground">v{skill.version} · tested {skill.lastTested}</span>
      </div>
      <Tabs defaultValue={agents[0]} className="p-5">
        <TabsList className="flex-wrap h-auto">
          {agents.map((a) => <TabsTrigger key={a} value={a} className="text-xs">{AGENTS[a].name}</TabsTrigger>)}
        </TabsList>
        {agents.map((a) => (
          <TabsContent key={a} value={a} className="mt-4">
            <p className="text-sm text-muted-foreground mb-3">
              Paste this into {AGENTS[a].name}. It fetches the files and writes them to <code className="text-xs bg-secondary px-1 py-0.5 rounded">{AGENTS[a].installDir.replace('<slug>', skill.slug)}</code>.
            </p>
            <pre className="text-xs bg-background border border-border rounded-lg p-4 overflow-x-auto whitespace-pre-wrap leading-relaxed">{promptFor(a)}</pre>
            <Button size="sm" className="mt-3 gap-2" onClick={() => copy(a)}>
              {copied === a ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied === a ? 'Copied' : 'Copy install prompt'}
            </Button>
          </TabsContent>
        ))}
      </Tabs>
      {skill.tier === 'premium' && !apiKeyHint && (
        <p className="px-5 pb-4 text-xs text-muted-foreground">
          Create an API key on your <a href="/account" className="text-primary underline">account page</a> and replace <code>YOUR_GTM_SKILLS_KEY</code>.
        </p>
      )}
    </div>
  );
}
