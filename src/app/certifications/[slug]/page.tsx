/**
 * Certification Course Page
 * Shows modules for a specific certification level
 */

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Clock, CheckCircle, Lock, BookOpen, HelpCircle } from 'lucide-react';
import { getCertificationLevel, getCertificationModules } from '@/lib/certifications';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const level = getCertificationLevel(slug);

  if (!level) {
    return { title: 'Certification Not Found | GTM Skills' };
  }

  return {
    title: `${level.name} | GTM Skills Certification`,
    description: level.description,
  };
}

export default async function CertificationCoursePage({ params }: PageProps) {
  const { slug } = await params;
  const level = getCertificationLevel(slug);

  if (!level) {
    notFound();
  }

  const modules = getCertificationModules(slug);
  const totalMinutes = modules.reduce((sum, m) => sum + m.estimated_minutes, 0);

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="relative py-12 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{ background: `linear-gradient(to bottom, ${level.badge_color}, transparent)` }}
        />
        <div className="relative max-w-4xl mx-auto px-6">
          <Link
            href="/certifications"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Certifications</span>
          </Link>

          <div className="flex items-start gap-6">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${level.badge_color}20`, border: `3px solid ${level.badge_color}` }}
            >
              <span className="text-3xl font-bold" style={{ color: level.badge_color }}>
                {level.level}
              </span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{level.name}</h1>
              <p className="text-muted-foreground mb-4">{level.description}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  {modules.length} modules
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  ~{totalMinutes} min
                </span>
                <span className="flex items-center gap-1">
                  <HelpCircle className="w-4 h-4" />
                  {level.assessment_pass_score}% to pass
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modules List */}
      <section className="py-12 border-t border-border">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-xl font-bold text-foreground mb-6">Course Modules</h2>

          <div className="space-y-4">
            {modules.map((module, index) => {
              const isLast = index === modules.length - 1;
              const isQuiz = module.content_type === 'quiz';

              return (
                <Link
                  key={module.id}
                  href={`/certifications/${slug}/${module.slug}`}
                  className="block bg-card/50 border border-border rounded-xl p-6 hover:border-border transition-colors group"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: isQuiz ? `${level.badge_color}20` : 'rgb(39 39 42 / 0.5)',
                        border: isQuiz ? `2px solid ${level.badge_color}` : '2px solid rgb(63 63 70)',
                      }}
                    >
                      {isQuiz ? (
                        <HelpCircle className="w-5 h-5" style={{ color: level.badge_color }} />
                      ) : (
                        <span className="text-sm font-medium text-muted-foreground">{module.module_number}</span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-amber-400 transition-colors">
                          {module.title}
                        </h3>
                        {isQuiz && (
                          <span
                            className="px-2 py-0.5 rounded text-xs font-medium"
                            style={{ backgroundColor: `${level.badge_color}20`, color: level.badge_color }}
                          >
                            Assessment
                          </span>
                        )}
                      </div>
                      <p className="text-muted-foreground text-sm mb-2">{module.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {module.estimated_minutes} min
                        </span>
                        <span className="capitalize">{module.content_type}</span>
                      </div>
                    </div>

                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-amber-400 transition-colors flex-shrink-0" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-12 border-t border-border bg-card/30">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-xl font-bold text-foreground mb-6">Requirements to Earn Badge</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 bg-card/50 border border-border rounded-lg p-4">
              <CheckCircle className="w-5 h-5 text-muted-foreground" />
              <span className="text-foreground">Complete all {level.modules_required} modules</span>
            </div>
            <div className="flex items-center gap-3 bg-card/50 border border-border rounded-lg p-4">
              <CheckCircle className="w-5 h-5 text-muted-foreground" />
              <span className="text-foreground">Pass assessment with {level.assessment_pass_score}%+</span>
            </div>
            {level.github_star_required && (
              <div className="flex items-center gap-3 bg-card/50 border border-border rounded-lg p-4">
                <CheckCircle className="w-5 h-5 text-muted-foreground" />
                <span className="text-foreground">Star the GTM Skills GitHub repo</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Start CTA */}
      <section className="py-12 border-t border-border">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Link
            href={`/certifications/${slug}/${modules[0]?.slug}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors"
            style={{ backgroundColor: level.badge_color, color: '#000' }}
          >
            Start Module 1
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
