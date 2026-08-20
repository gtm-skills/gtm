'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Send, Eye, Lightbulb } from 'lucide-react';

const categories = [
  { value: 'sdr', label: 'SDR/BDR', description: 'Cold outreach, prospecting' },
  { value: 'ae', label: 'Account Executive', description: 'Demos, proposals, closing' },
  { value: 'discovery', label: 'Discovery', description: 'Qualification, pain points' },
  { value: 'objections', label: 'Objection Handling', description: 'Common objections' },
  { value: 'outreach', label: 'Outreach', description: 'Email, LinkedIn, cold call' },
  { value: 'saas', label: 'SaaS', description: 'Software sales specific' },
  { value: 'fintech', label: 'FinTech', description: 'Financial services' },
  { value: 'healthcare', label: 'Healthcare', description: 'Medical/health tech' },
  { value: 'other', label: 'Other', description: 'Everything else' },
];

// Extract variables from content
function extractVariables(content: string): string[] {
  const matches = content.match(/\[([A-Z_\s]+)\]/g);
  if (!matches) return [];
  return [...new Set(matches.map(m => m.slice(1, -1)))];
}

export default function SubmitPromptPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [tags, setTags] = useState('');
  const [useCase, setUseCase] = useState('');
  const [isPreview, setIsPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const variables = extractVariables(content);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/v1/prompts/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content,
          category,
          author_name: authorName || undefined,
          author_email: authorEmail || undefined,
          tags: tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : [],
          use_cases: useCase ? [useCase] : [],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit prompt');
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Send className="w-8 h-8 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Prompt Submitted!</h1>
          <p className="text-muted-foreground mb-8">
            Thanks for contributing! Your prompt will appear on the leaderboard after a quick review.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/leaderboard">
              <Button>Back to Leaderboard</Button>
            </Link>
            <Button
              variant="outline"
              onClick={() => {
                setSuccess(false);
                setTitle('');
                setContent('');
                setCategory('');
                setTags('');
                setUseCase('');
              }}
            >
              Submit Another
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/leaderboard"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Leaderboard
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Submit a Prompt</h1>
          <p className="text-muted-foreground">
            Share your best GTM prompts with the community. All submissions are reviewed before appearing on the leaderboard.
          </p>
        </div>

        {/* Tips */}
        <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 mb-8">
          <div className="flex gap-3">
            <Lightbulb className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-orange-400 mb-1">Tips for a great prompt</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Use [BRACKETS] for variables (e.g., [COMPANY NAME], [PROSPECT ROLE])</li>
                <li>• Be specific about the context and desired output</li>
                <li>• Include constraints and formatting instructions</li>
                <li>• Test it first - only submit prompts that actually work well</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Prompt Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Cold Email for Technical Founders"
              className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-orange-500 focus:outline-none"
              required
              minLength={5}
              maxLength={255}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {title.length}/255 characters
            </p>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setCategory(cat.value)}
                  className={`p-3 rounded-lg border text-left transition-colors ${
                    category === cat.value
                      ? 'border-orange-500 bg-orange-500/10'
                      : 'border-border hover:border-orange-500/50'
                  }`}
                >
                  <div className="font-medium text-sm">{cat.label}</div>
                  <div className="text-xs text-muted-foreground">{cat.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">
                Prompt Content <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                onClick={() => setIsPreview(!isPreview)}
                className="text-sm text-orange-400 hover:text-orange-300 flex items-center gap-1"
              >
                <Eye className="w-4 h-4" />
                {isPreview ? 'Edit' : 'Preview'}
              </button>
            </div>

            {isPreview ? (
              <div className="bg-card rounded-lg p-4 font-mono text-sm min-h-[200px]">
                <pre className="text-foreground whitespace-pre-wrap">{content}</pre>
              </div>
            ) : (
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your prompt here...

Use [BRACKETS] for variables that users should replace.

Example:
Write a cold email to [PROSPECT NAME], [ROLE] at [COMPANY].

Context:
- Industry: [INDUSTRY]
- Pain point: [PAIN POINT]

The email should be under 100 words and focus on..."
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-orange-500 focus:outline-none font-mono text-sm min-h-[200px] resize-y"
                required
                minLength={20}
                maxLength={10000}
              />
            )}
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>{content.length}/10,000 characters</span>
              {variables.length > 0 && (
                <span>Variables detected: {variables.join(', ')}</span>
              )}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Tags
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="cold-email, saas, founder (comma-separated)"
              className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-orange-500 focus:outline-none"
            />
          </div>

          {/* Use Case */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Use Case / When to Use
            </label>
            <input
              type="text"
              value={useCase}
              onChange={(e) => setUseCase(e.target.value)}
              placeholder="e.g., When reaching out to technical founders after they raise a seed round"
              className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-orange-500 focus:outline-none"
            />
          </div>

          {/* Author Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Your Name (optional)
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="How you want to be credited"
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-orange-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Email (optional)
              </label>
              <input
                type="email"
                value={authorEmail}
                onChange={(e) => setAuthorEmail(e.target.value)}
                placeholder="For updates on your submission"
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-orange-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400">
              {error}
            </div>
          )}

          {/* Submit */}
          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting || !title || !content || !category}
              className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Submit Prompt
                </>
              )}
            </Button>
            <Link href="/leaderboard">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
