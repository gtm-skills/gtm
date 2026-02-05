'use client';

import { useState, useEffect } from 'react';
import { Star, Quote, Users, GitFork, ExternalLink } from 'lucide-react';

const testimonials = [
  {
    quote: 'GTM Skills saved our SDR team hours every week. The prompts are battle-tested and actually work.',
    author: 'Head of Sales Development',
    company: 'Series B SaaS',
  },
  {
    quote: 'Finally, a GTM resource that understands agentic workflows. This is the future of sales ops.',
    author: 'VP Revenue Operations',
    company: 'Enterprise Software',
  },
  {
    quote: 'We replaced our entire prompt library with GTM Skills. The quality difference is night and day.',
    author: 'Founder & CEO',
    company: 'B2B Marketplace',
  },
];

const usedByTeams = [
  'SaaS Startups',
  'Enterprise Sales',
  'FinTech',
  'Healthcare Tech',
  'Professional Services',
  'E-commerce',
];

export function SocialProof() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [stars, setStars] = useState<number | null>(null);
  const [forks, setForks] = useState<number | null>(null);

  useEffect(() => {
    fetch('https://api.github.com/repos/gtm-skills/gtm', { next: { revalidate: 300 } })
      .then((res) => res.json())
      .then((data) => {
        if (data.stargazers_count) setStars(data.stargazers_count);
        if (data.forks_count) setForks(data.forks_count);
      })
      .catch(() => {});
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 md:py-16 border-y border-border bg-card/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* GitHub Stats */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Open Source</p>
            <div className="flex items-center gap-6">
              <a
                href="https://github.com/gtm-skills/gtm"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-foreground hover:text-orange-400 transition-colors group"
              >
                <Star className="h-5 w-5 text-yellow-400 group-hover:scale-110 transition-transform" />
                <span className="text-2xl font-bold">{stars ?? '...'}</span>
                <span className="text-sm text-muted-foreground">stars</span>
                <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <div className="flex items-center gap-2 text-muted-foreground">
                <GitFork className="h-4 w-4" />
                <span className="text-lg font-semibold text-foreground">{forks ?? '...'}</span>
                <span className="text-sm">forks</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>Used by sales teams worldwide</span>
            </div>
          </div>

          {/* Teams using it */}
          <div className="flex flex-col items-center gap-4">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Trusted Across Industries</p>
            <div className="flex flex-wrap justify-center gap-2">
              {usedByTeams.map((team) => (
                <span
                  key={team}
                  className="px-3 py-1.5 rounded-full text-xs font-medium bg-zinc-800/50 text-zinc-300 border border-zinc-700/50"
                >
                  {team}
                </span>
              ))}
            </div>
          </div>

          {/* Testimonial */}
          <div className="relative">
            <Quote className="h-6 w-6 text-orange-500/30 mb-2" />
            <div className="min-h-[100px]">
              <p className="text-sm text-foreground leading-relaxed italic mb-3">
                &ldquo;{testimonials[activeTestimonial].quote}&rdquo;
              </p>
              <div className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">{testimonials[activeTestimonial].author}</span>
                <span className="mx-1">&middot;</span>
                <span>{testimonials[activeTestimonial].company}</span>
              </div>
            </div>
            {/* Dots */}
            <div className="flex gap-1.5 mt-3">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    i === activeTestimonial ? 'bg-orange-400' : 'bg-zinc-600 hover:bg-zinc-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
