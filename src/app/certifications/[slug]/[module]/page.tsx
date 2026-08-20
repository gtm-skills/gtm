/**
 * Certification Module Page
 * Individual lesson/quiz content
 */

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Clock, BookOpen, ExternalLink } from 'lucide-react';
import { getCertificationLevel, getCertificationModules, getModule } from '@/lib/certifications';

interface PageProps {
  params: Promise<{ slug: string; module: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug, module: moduleSlug } = await params;
  const level = getCertificationLevel(slug);
  const certModule = getModule(slug, moduleSlug);

  if (!level || !certModule) {
    return { title: 'Module Not Found | GTM Skills' };
  }

  return {
    title: `${certModule.title} | ${level.name}`,
    description: certModule.description,
  };
}

export default async function ModulePage({ params }: PageProps) {
  const { slug, module: moduleSlug } = await params;
  const level = getCertificationLevel(slug);
  const certModule = getModule(slug, moduleSlug);

  if (!level || !certModule) {
    notFound();
  }

  const allModules = getCertificationModules(slug);
  const currentIndex = allModules.findIndex((m) => m.slug === moduleSlug);
  const prevModule = currentIndex > 0 ? allModules[currentIndex - 1] : null;
  const nextModule = currentIndex < allModules.length - 1 ? allModules[currentIndex + 1] : null;

  const isQuiz = certModule.content_type === 'quiz';

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b border-border bg-card/30">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href={`/certifications/${slug}`}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{level.name}</span>
            </Link>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Module {certModule.module_number} of {allModules.length}</span>
              <span className="text-muted-foreground">•</span>
              <Clock className="w-4 h-4" />
              <span>{certModule.estimated_minutes} min</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          {/* Title */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: isQuiz ? `${level.badge_color}20` : 'rgb(39 39 42 / 0.5)',
                  border: isQuiz ? `2px solid ${level.badge_color}` : '2px solid rgb(63 63 70)',
                }}
              >
                <span className="text-sm font-medium" style={{ color: isQuiz ? level.badge_color : '#a1a1aa' }}>
                  {certModule.module_number}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-foreground">{certModule.title}</h1>
            </div>
            <p className="text-muted-foreground">{certModule.description}</p>
          </div>

          {/* Lesson Content */}
          {certModule.content_type === 'lesson' && certModule.content.markdown && (
            <div className="prose prose-invert prose-zinc max-w-none mb-12">
              <div
                className="[&>h1]:text-2xl [&>h1]:font-bold [&>h1]:text-foreground [&>h1]:mb-4 [&>h1]:mt-8
                           [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:text-foreground [&>h2]:mb-3 [&>h2]:mt-6
                           [&>h3]:text-lg [&>h3]:font-semibold [&>h3]:text-foreground [&>h3]:mb-2 [&>h3]:mt-4
                           [&>p]:text-foreground [&>p]:mb-4 [&>p]:leading-relaxed
                           [&>ul]:text-foreground [&>ul]:mb-4 [&>ul]:ml-4
                           [&>ol]:text-foreground [&>ol]:mb-4 [&>ol]:ml-4
                           [&>li]:mb-1
                           [&>pre]:bg-card [&>pre]:border [&>pre]:border-border [&>pre]:rounded-lg [&>pre]:p-4 [&>pre]:mb-4 [&>pre]:overflow-x-auto
                           [&>code]:text-amber-400 [&>code]:bg-card [&>code]:px-1 [&>code]:rounded
                           [&>table]:w-full [&>table]:mb-4
                           [&>table>thead>tr>th]:text-left [&>table>thead>tr>th]:text-foreground [&>table>thead>tr>th]:pb-2 [&>table>thead>tr>th]:border-b [&>table>thead>tr>th]:border-border
                           [&>table>tbody>tr>td]:py-2 [&>table>tbody>tr>td]:text-muted-foreground [&>table>tbody>tr>td]:border-b [&>table>tbody>tr>td]:border-border"
                dangerouslySetInnerHTML={{
                  __html: certModule.content.markdown
                    .replace(/^# /gm, '<h1>')
                    .replace(/^## /gm, '<h2>')
                    .replace(/^### /gm, '<h3>')
                    .replace(/\n\n/g, '</p><p>')
                    .replace(/```[\s\S]*?```/g, (match) => {
                      const code = match.slice(3, -3).replace(/^\w+\n/, '');
                      return `<pre><code>${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`;
                    })
                    .replace(/\|.*\|/g, (match) => {
                      // Simple table parsing
                      return match;
                    }),
                }}
              />
            </div>
          )}

          {/* Quiz Content */}
          {certModule.content_type === 'quiz' && certModule.content.quiz && (
            <div className="mb-12">
              <div className="bg-violet-500/10 border border-violet-500/20 rounded-xl p-6 mb-8">
                <h2 className="text-lg font-semibold text-foreground mb-2">Assessment Instructions</h2>
                <p className="text-muted-foreground text-sm">
                  Answer all {certModule.content.quiz.length} questions below. You need {level.assessment_pass_score}% to pass.
                  You can retake the assessment if needed.
                </p>
              </div>

              <div className="space-y-8">
                {certModule.content.quiz.map((question, qIndex) => (
                  <div key={question.id} className="bg-card/50 border border-border rounded-xl p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-medium text-muted-foreground">{qIndex + 1}</span>
                      </div>
                      <p className="text-foreground font-medium">{question.question}</p>
                    </div>

                    <div className="space-y-2 ml-11">
                      {question.options.map((option, oIndex) => (
                        <label
                          key={oIndex}
                          className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-border cursor-pointer transition-colors"
                        >
                          <input
                            type="radio"
                            name={`question-${question.id}`}
                            className="w-4 h-4 text-violet-500"
                          />
                          <span className="text-foreground">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <button
                  className="px-6 py-3 rounded-lg font-semibold transition-colors"
                  style={{ backgroundColor: level.badge_color, color: '#000' }}
                >
                  Submit Assessment
                </button>
                <p className="text-muted-foreground text-sm mt-2">
                  Note: Assessment submission requires sign-in (coming soon)
                </p>
              </div>
            </div>
          )}

          {/* Resources */}
          {certModule.resources && certModule.resources.length > 0 && (
            <div className="mb-12">
              <h3 className="text-lg font-semibold text-foreground mb-4">Resources</h3>
              <div className="grid gap-3">
                {certModule.resources.map((resource, index) => (
                  <Link
                    key={index}
                    href={resource.url}
                    className="flex items-center justify-between p-4 bg-card/50 border border-border rounded-lg hover:border-border transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5 text-muted-foreground" />
                      <span className="text-foreground group-hover:text-foreground transition-colors">
                        {resource.title}
                      </span>
                      <span className="text-xs text-muted-foreground capitalize">{resource.type}</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-muted-foreground transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-8 border-t border-border">
            {prevModule ? (
              <Link
                href={`/certifications/${slug}/${prevModule.slug}`}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Previous: {prevModule.title}</span>
              </Link>
            ) : (
              <div />
            )}

            {nextModule ? (
              <Link
                href={`/certifications/${slug}/${nextModule.slug}`}
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors"
                style={{ backgroundColor: level.badge_color, color: '#000' }}
              >
                <span>Next: {nextModule.title}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <Link
                href="/certifications"
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-emerald-500 text-black"
              >
                <span>Complete Course</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
