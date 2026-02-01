"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const skills = [
  { emoji: "🎯", name: "Prompts" },
  { emoji: "📧", name: "Email" },
  { emoji: "💼", name: "LinkedIn" },
  { emoji: "🔍", name: "Discovery" },
  { emoji: "🛡️", name: "Objections" },
  { emoji: "📋", name: "Meeting Prep" },
  { emoji: "🔬", name: "Research" },
  { emoji: "📞", name: "Voice" },
  { emoji: "⚔️", name: "Battlecards" },
  { emoji: "🔄", name: "Sequences" },
];

export function OpenClawPromo() {
  return (
    <section className="relative border-y border-orange-500/30 bg-gradient-to-r from-orange-500/10 via-red-500/5 to-orange-500/10 py-8 md:py-10 overflow-hidden">
      {/* Animated background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-500/20 via-transparent to-transparent opacity-50" />

      {/* Lobster emoji floating animation */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 text-6xl opacity-20 hidden lg:block animate-pulse">
        🦞
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Left: Text content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-3">
              <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 animate-pulse">
                <Sparkles className="h-3 w-3 mr-1" />
                NEW
              </Badge>
              <span className="text-2xl">🦞</span>
              <span className="font-bold text-white">OpenClaw Integration</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Turn Your{" "}
              <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                OpenClaw
              </span>{" "}
              Into a Sales Machine
            </h2>
            <p className="text-zinc-400 max-w-xl">
              10 GTM skills, 2,500+ prompts. Cold emails, discovery questions,
              objection handling, and more — all inside your OpenClaw.
            </p>
          </div>

          {/* Middle: Skills preview */}
          <div className="flex flex-wrap justify-center gap-2 max-w-md">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="flex items-center gap-1.5 bg-zinc-900/80 border border-zinc-800 rounded-full px-3 py-1.5 text-sm hover:border-orange-500/50 transition-colors"
              >
                <span>{skill.emoji}</span>
                <span className="text-zinc-300">{skill.name}</span>
              </div>
            ))}
          </div>

          {/* Right: CTA */}
          <div className="flex-shrink-0">
            <Link href="/openclaw">
              <Button
                size="lg"
                className="gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg shadow-orange-500/25"
              >
                Get the Skills
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Quick install command */}
        <div className="mt-6 flex justify-center lg:justify-start">
          <div className="inline-flex items-center gap-2 bg-zinc-900/80 border border-zinc-800 rounded-lg px-4 py-2 font-mono text-sm">
            <span className="text-zinc-500">$</span>
            <span className="text-orange-400">
              npx clawdhub install gtm-skills/gtm-prompts
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
