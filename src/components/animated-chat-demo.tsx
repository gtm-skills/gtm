'use client';

import { useState, useEffect } from 'react';
import { Sparkles, Copy, Check } from 'lucide-react';

const demos = [
  {
    command: '/gtm research',
    args: 'Acme Corp for enterprise outreach',
    outputs: [
      'Company overview & funding history',
      'Key decision makers identified',
      'Recent news & buying signals',
      '3 personalized outreach angles',
    ],
  },
  {
    command: '/gtm email',
    args: 'cold intro to VP of Sales',
    outputs: [
      'Subject line variations (3)',
      'Personalized opening hook',
      'Value proposition tied to their pain',
      'Soft CTA with calendar link',
    ],
  },
  {
    command: '/gtm objection',
    args: '"We already have a solution"',
    outputs: [
      'Acknowledge their investment',
      'Reframe the conversation',
      'Strategic questions to ask',
      'Success story to share',
    ],
  },
  {
    command: '/gtm discovery',
    args: 'MEDDPICC qualification call',
    outputs: [
      'Pain & impact questions',
      'Decision process mapping',
      'Champion identification',
      'Metrics to quantify value',
    ],
  },
];

export function AnimatedChatDemo() {
  const [currentDemo, setCurrentDemo] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [showOutput, setShowOutput] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setIsTyping(false);
      setShowOutput(true);
    }, 2000);

    const timer2 = setTimeout(() => {
      setShowOutput(false);
      setIsTyping(true);
      setCurrentDemo((prev) => (prev + 1) % demos.length);
    }, 6000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [currentDemo]);

  const demo = demos[currentDemo];

  const handleCopy = () => {
    navigator.clipboard.writeText(`${demo.command} ${demo.args}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="bg-card/80 rounded-2xl border border-border p-6 md:p-8 font-mono text-sm md:text-base backdrop-blur-sm shadow-2xl shadow-black/40">
        {/* Terminal header */}
        <div className="flex items-center justify-between mb-5 pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <div className="w-3.5 h-3.5 rounded-full bg-red-500" />
              <div className="w-3.5 h-3.5 rounded-full bg-yellow-500" />
              <div className="w-3.5 h-3.5 rounded-full bg-green-500" />
            </div>
            <span className="text-sm text-muted-foreground font-sans">Claude Code</span>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors font-sans"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-green-400" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                Copy command
              </>
            )}
          </button>
        </div>

        {/* Command line */}
        <div className="space-y-4">
          <div className="text-muted-foreground text-sm">
            <span className="text-muted-foreground"># Try any GTM workflow</span>
          </div>

          <div className="flex items-start gap-2">
            <span className="text-emerald-400 select-none">$</span>
            <div className="flex-1">
              <span className="text-orange-400 font-bold">{demo.command}</span>
              <span className="text-foreground"> {demo.args}</span>
              {isTyping && <span className="animate-pulse text-orange-400 ml-1">|</span>}
            </div>
          </div>

          {/* Output */}
          <div
            className={`mt-4 pt-4 border-t border-border space-y-2 transition-all duration-500 ${
              showOutput ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
            }`}
          >
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
              <span className="text-foreground">Generating...</span>
            </div>
            <div className="pl-5 space-y-1.5 text-sm">
              {demo.outputs.map((output, i) => (
                <div
                  key={output}
                  className="text-muted-foreground transition-all duration-300"
                  style={{
                    opacity: showOutput ? 1 : 0,
                    transform: showOutput ? 'translateX(0)' : 'translateX(-10px)',
                    transitionDelay: `${i * 150}ms`,
                  }}
                >
                  <span className="text-green-400">✓</span> {output}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Demo indicator */}
        <div className="flex justify-center gap-2 mt-6 pt-4 border-t border-border">
          {demos.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrentDemo(i);
                setIsTyping(true);
                setShowOutput(false);
              }}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === currentDemo ? 'bg-orange-500' : 'bg-muted hover:bg-accent'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Bottom tagline */}
      <div className="mt-4 text-center">
        <p className="text-sm text-muted-foreground">
          One command. Full GTM power.
          <span className="text-muted-foreground ml-2">Works in Claude Code, Projects & Chat.</span>
        </p>
      </div>
    </div>
  );
}
