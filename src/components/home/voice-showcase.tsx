/**
 * Voice Showcase Component
 * Animated waveform, script preview, feature checklist with violet styling
 */

import Link from 'next/link';
import { ArrowRight, Mic, CheckCircle2, Phone, MessageSquare, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const features = [
  'MEDDPICC discovery calls',
  'Executive cold call scripts',
  'Objection handling flows',
  'Voicemail frameworks',
  'Follow-up sequences',
];

export function VoiceShowcase() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-violet-500/5 via-transparent to-transparent">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Waveform Animation */}
          <div className="relative">
            <div className="bg-card rounded-xl border border-violet-500/20 p-8">
              {/* Waveform */}
              <div className="flex items-center justify-center gap-1 h-32 mb-6">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 bg-violet-500 rounded-full animate-pulse"
                    style={{
                      height: `${20 + Math.sin(i * 0.5) * 30 + Math.random() * 20}%`,
                      animationDelay: `${i * 0.1}s`,
                      animationDuration: `${0.8 + Math.random() * 0.4}s`,
                    }}
                  />
                ))}
              </div>

              {/* Script Preview */}
              <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm">
                <div className="text-violet-400 text-xs mb-2">// discovery_call.vapi</div>
                <div className="text-foreground">
                  <span className="text-muted-foreground">"Hi [NAME], this is [REP] from [COMPANY].</span>
                  <br />
                  <span className="text-violet-400">I noticed you recently [TRIGGER]...</span>
                  <br />
                  <span className="text-muted-foreground">Quick question about your [PROCESS]..."</span>
                </div>
              </div>

              {/* Stats row */}
              <div className="flex items-center justify-center gap-6 mt-6 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Phone className="h-3 w-3 text-violet-400" />
                  10 templates
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquare className="h-3 w-3 text-violet-400" />
                  Vapi-ready
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-violet-400" />
                  1-click deploy
                </span>
              </div>
            </div>

            {/* Decorative glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-violet-500/10 rounded-xl blur-xl -z-10" />
          </div>

          {/* Right: Description + Checklist */}
          <div>
            <Badge variant="outline" className="mb-4 border-violet-500/30 text-violet-400">
              <Mic className="h-3 w-3 mr-1" />
              Voice Templates
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Agentic Voice Calls
            </h2>
            <p className="text-muted-foreground mb-6">
              Deploy conversational voice agents with battle-tested scripts.
              Built for Vapi, ready to customize, designed for real sales conversations.
            </p>

            <div className="space-y-3 mb-8">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-violet-400 flex-shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>

            <Link href="/voice-templates">
              <Button className="gap-2 bg-violet-500 hover:bg-violet-600">
                Explore Voice Templates
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
