'use client';

import { useEffect, useState } from 'react';
import { Star, GitFork, ExternalLink, Terminal } from 'lucide-react';
import { STATS } from '@/data/skills';

/**
 * Real numbers only. Testimonials return when we have named, consented quotes.
 */
export function SocialProof() {
  const [stars, setStars] = useState<number | null>(null);
  const [forks, setForks] = useState<number | null>(null);

  useEffect(() => {
    fetch('https://api.github.com/repos/gtm-skills/gtm')
      .then((res) => res.json())
      .then((data) => {
        if (data.stargazers_count) setStars(data.stargazers_count);
        if (data.forks_count) setForks(data.forks_count);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-12 md:py-16 border-y border-border bg-card/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div className="flex flex-col items-center md:items-start gap-4">
            <p className="label-mono text-xs text-muted-foreground">Open Source Core</p>
            <div className="flex items-center gap-6">
              <a
                href="https://github.com/gtm-skills/gtm"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-foreground hover:text-primary transition-colors group"
              >
                <Star className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold tabular-nums">{stars ?? '—'}</span>
                <span className="text-sm text-muted-foreground">stars</span>
                <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <div className="flex items-center gap-2 text-muted-foreground">
                <GitFork className="h-4 w-4" />
                <span className="text-lg font-semibold text-foreground tabular-nums">{forks ?? '—'}</span>
                <span className="text-sm">forks</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <p className="label-mono text-xs text-muted-foreground">In the box</p>
            <div className="flex flex-wrap justify-center gap-2 text-xs">
              {[
                `${STATS.prompts} prompts`,
                `${STATS.skills} skills`,
                `${STATS.tonalities} tonalities`,
                `${STATS.mcpTools} MCP tools`,
                `${STATS.industries} industries`,
              ].map((t) => (
                <span key={t} className="px-3 py-1.5 rounded-full font-medium bg-secondary text-secondary-foreground border border-border">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-3">
            <p className="label-mono text-xs text-muted-foreground">Install anywhere</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Terminal className="h-4 w-4" />
              <span>Claude Code · Cursor · Codex · Gemini CLI · OpenClaw · ChatGPT</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
