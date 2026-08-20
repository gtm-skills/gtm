/**
 * Certifications Page
 * Overview of GTM Skills certification program
 */

import Link from 'next/link';
import { Award, CheckCircle, Star, Users, Trophy, ArrowRight } from 'lucide-react';
import { CERTIFICATION_LEVELS } from '@/lib/certifications';

export const metadata = {
  title: 'Certifications | GTM Skills',
  description: 'Earn your GTM Skills certification. Master agentic sales, get recognized, and stand out in your career.',
};

export default function CertificationsPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-500/10 via-transparent to-transparent" />
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm mb-6">
              <Award className="w-4 h-4" />
              <span>GTM Skills Certification Program</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Become a Certified
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-500"> Agentic Sales Pro</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Master AI-powered sales techniques. Earn credentials that prove your expertise.
              Stand out in a world where everyone claims to "use AI."
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground mb-1">5</div>
              <div className="text-muted-foreground text-sm">Modules</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground mb-1">Free</div>
              <div className="text-muted-foreground text-sm">Always</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground mb-1">1hr</div>
              <div className="text-muted-foreground text-sm">To Complete</div>
            </div>
          </div>
        </div>
      </section>

      {/* Certification Levels */}
      <section className="py-16 border-t border-border">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Certification Levels</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {CERTIFICATION_LEVELS.map((level) => (
              <div
                key={level.id}
                className="relative bg-card/50 border border-border rounded-xl p-6 hover:border-border transition-colors"
              >
                {/* Badge */}
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${level.badge_color}20`, border: `2px solid ${level.badge_color}` }}
                >
                  <span className="text-2xl font-bold" style={{ color: level.badge_color }}>
                    {level.level}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-2">{level.name}</h3>
                <p className="text-muted-foreground text-sm mb-6">{level.description}</p>

                {/* Requirements */}
                <div className="space-y-2 mb-6">
                  {level.modules_required > 0 && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-muted-foreground" />
                      <span>Complete {level.modules_required} modules</span>
                    </div>
                  )}
                  {level.assessment_pass_score > 0 && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-muted-foreground" />
                      <span>Pass assessment ({level.assessment_pass_score}%+)</span>
                    </div>
                  )}
                  {level.github_star_required && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Star className="w-4 h-4 text-muted-foreground" />
                      <span>Star the GitHub repo</span>
                    </div>
                  )}
                  {level.prompts_required > 0 && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>Submit {level.prompts_required}+ prompts</span>
                    </div>
                  )}
                  {level.votes_required > 0 && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Trophy className="w-4 h-4 text-muted-foreground" />
                      <span>Earn {level.votes_required}+ votes</span>
                    </div>
                  )}
                </div>

                {/* CTA */}
                {level.level === 1 ? (
                  <Link
                    href={`/certifications/${level.slug}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    style={{ backgroundColor: level.badge_color, color: '#000' }}
                  >
                    Start Level 1
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <div className="text-muted-foreground text-sm">
                    {level.level === 2 ? 'Complete Level 1 first' : 'Contribution-based'}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-16 border-t border-border bg-card/30">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">What You'll Learn</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card/50 border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">Prompt Engineering for Sales</h3>
              <p className="text-muted-foreground text-sm">
                Learn the RACE framework for writing prompts that actually convert. No more generic outputs.
              </p>
            </div>
            <div className="bg-card/50 border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">Cold Outreach Mastery</h3>
              <p className="text-muted-foreground text-sm">
                Write trigger-based emails and LinkedIn messages that get 10-15% response rates.
              </p>
            </div>
            <div className="bg-card/50 border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">Discovery & Qualification</h3>
              <p className="text-muted-foreground text-sm">
                Use AI for pre-call research, real-time support, and post-call summaries.
              </p>
            </div>
            <div className="bg-card/50 border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">Practical Application</h3>
              <p className="text-muted-foreground text-sm">
                Apply what you learn with real prospects. Theory backed by hands-on practice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-border">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Get Certified?</h2>
          <p className="text-muted-foreground mb-8">
            Level 1 takes about an hour. It's free forever.
          </p>
          <Link
            href="/certifications/practitioner"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-foreground font-semibold rounded-lg hover:from-violet-400 hover:to-purple-500 transition-colors"
          >
            <Award className="w-5 h-5" />
            Start Level 1 Certification
          </Link>
        </div>
      </section>
    </main>
  );
}
