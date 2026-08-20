'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CopyButton } from '@/components/copy-button';
import {
  ArrowUp,
  ArrowDown,
  Copy,
  Trophy,
  Flame,
  Clock,
  TrendingUp,
  Filter,
  Plus,
  ExternalLink,
  Share2,
  DollarSign,
  BarChart3,
} from 'lucide-react';
import { OutcomeModal } from '@/components/outcome-modal';

interface LeaderboardPrompt {
  rank: number;
  id: string;
  title: string;
  content: string;
  category: string;
  subcategory?: string;
  author_name?: string;
  upvotes: number;
  downvotes: number;
  score: number;
  copy_count: number;
  hot_score: number;
  tags: string[];
  variables: string[];
  created_at: string;
}

interface LeaderboardStats {
  totalPrompts: number;
  totalVotes: number;
  totalCopies: number;
  totalOutcomes: number;
  totalPipelineValue: number;
}

type SortOption = 'hot' | 'top' | 'new' | 'copies';
type TimeFrame = 'all' | 'week' | 'month';

const sortOptions: { value: SortOption; label: string; icon: React.ReactNode }[] = [
  { value: 'hot', label: 'Hot', icon: <Flame className="w-4 h-4" /> },
  { value: 'top', label: 'Top', icon: <Trophy className="w-4 h-4" /> },
  { value: 'new', label: 'New', icon: <Clock className="w-4 h-4" /> },
  { value: 'copies', label: 'Most Copied', icon: <Copy className="w-4 h-4" /> },
];

const timeFrameOptions: { value: TimeFrame; label: string }[] = [
  { value: 'all', label: 'All Time' },
  { value: 'month', label: 'This Month' },
  { value: 'week', label: 'This Week' },
];

const categories = [
  { value: '', label: 'All Categories' },
  { value: 'saas', label: 'SaaS' },
  { value: 'sdr', label: 'SDR' },
  { value: 'ae', label: 'Account Executive' },
  { value: 'outreach', label: 'Outreach' },
  { value: 'discovery', label: 'Discovery' },
  { value: 'objections', label: 'Objections' },
];

// Generate fingerprint for voting
function generateFingerprint(): string {
  if (typeof window === 'undefined') return '';
  const components = [
    navigator.userAgent,
    navigator.language,
    screen.width,
    screen.height,
    new Date().getTimezoneOffset(),
  ];
  const str = components.join('|');
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return `fp-${Math.abs(hash).toString(36)}`;
}

export default function LeaderboardPage() {
  const [prompts, setPrompts] = useState<LeaderboardPrompt[]>([]);
  const [stats, setStats] = useState<LeaderboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState<SortOption>('hot');
  const [timeframe, setTimeframe] = useState<TimeFrame>('all');
  const [category, setCategory] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [userVotes, setUserVotes] = useState<Record<string, 'up' | 'down' | null>>({});
  const [fingerprint, setFingerprint] = useState('');
  const [outcomePrompt, setOutcomePrompt] = useState<{ id: string; title: string } | null>(null);

  // Generate fingerprint on mount
  useEffect(() => {
    setFingerprint(generateFingerprint());
  }, []);

  // Fetch leaderboard data
  const fetchLeaderboard = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        sort,
        timeframe,
        stats: 'true',
        limit: '20',
      });
      if (category) params.set('category', category);

      const response = await fetch(`/api/v1/leaderboard?${params}`);
      const data = await response.json();

      setPrompts(data.data || []);
      setStats(data.stats || null);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  }, [sort, timeframe, category]);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  // Handle vote
  const handleVote = async (promptId: string, voteType: 'up' | 'down') => {
    if (!fingerprint) return;

    // Optimistic update
    const currentVote = userVotes[promptId];
    const newVote = currentVote === voteType ? null : voteType;

    setUserVotes((prev) => ({ ...prev, [promptId]: newVote }));

    // Update prompt scores optimistically
    setPrompts((prev) =>
      prev.map((p) => {
        if (p.id !== promptId) return p;

        let upvotes = p.upvotes;
        let downvotes = p.downvotes;

        // Remove previous vote
        if (currentVote === 'up') upvotes--;
        if (currentVote === 'down') downvotes--;

        // Add new vote
        if (newVote === 'up') upvotes++;
        if (newVote === 'down') downvotes++;

        return {
          ...p,
          upvotes,
          downvotes,
          score: upvotes - downvotes,
        };
      })
    );

    // Send to API
    try {
      await fetch(`/api/v1/prompts/${promptId}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Fingerprint': fingerprint,
        },
        body: JSON.stringify({ vote_type: voteType }),
      });
    } catch (error) {
      console.error('Vote error:', error);
      // Revert on error
      setUserVotes((prev) => ({ ...prev, [promptId]: currentVote }));
      fetchLeaderboard();
    }
  };

  // Handle copy with tracking
  const handleCopy = async (prompt: LeaderboardPrompt) => {
    await navigator.clipboard.writeText(prompt.content);

    // Track copy
    fetch(`/api/v1/prompts/${prompt.id}/copy`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ source: 'leaderboard' }),
    }).catch(console.error);

    // Update count optimistically
    setPrompts((prev) =>
      prev.map((p) =>
        p.id === prompt.id ? { ...p, copy_count: p.copy_count + 1 } : p
      )
    );
  };

  // Share prompt
  const handleShare = (prompt: LeaderboardPrompt) => {
    const url = `https://gtm-skills.com/leaderboard?prompt=${prompt.id}`;
    const text = `Check out this GTM prompt: "${prompt.title}" - ${prompt.score} points on GTM Skills`;

    if (navigator.share) {
      navigator.share({ title: prompt.title, text, url });
    } else {
      navigator.clipboard.writeText(url);
    }
  };

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-orange-500/30 text-orange-400">
            Community Ranked
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Prompt Leaderboard
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The best GTM prompts, ranked by the community. Upvote the prompts that work, submit your own.
          </p>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-card border border-border text-center">
              <div className="text-2xl font-bold text-orange-400">{stats.totalPrompts}</div>
              <div className="text-sm text-muted-foreground">Prompts</div>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border text-center">
              <div className="text-2xl font-bold text-orange-400">{stats.totalVotes}</div>
              <div className="text-sm text-muted-foreground">Votes</div>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border text-center">
              <div className="text-2xl font-bold text-orange-400">{stats.totalCopies}</div>
              <div className="text-sm text-muted-foreground">Copies</div>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border text-center">
              <div className="text-2xl font-bold text-orange-400">
                ${(stats.totalPipelineValue / 1000000).toFixed(1)}M
              </div>
              <div className="text-sm text-muted-foreground">Pipeline Influenced</div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex gap-2">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSort(option.value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  sort === option.value
                    ? 'bg-orange-500 text-foreground'
                    : 'bg-secondary text-muted-foreground hover:text-foreground'
                }`}
              >
                {option.icon}
                {option.label}
              </button>
            ))}
          </div>

          <div className="flex gap-2 md:ml-auto">
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value as TimeFrame)}
              className="px-4 py-2 rounded-lg bg-secondary border-none text-sm"
            >
              {timeFrameOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-2 rounded-lg bg-secondary border-none text-sm"
            >
              {categories.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <Link href="/leaderboard/impact">
              <Button variant="outline" className="gap-2">
                <BarChart3 className="w-4 h-4" />
                Impact
              </Button>
            </Link>
            <Link href="/leaderboard/submit">
              <Button className="gap-2 bg-orange-500 hover:bg-orange-600">
                <Plus className="w-4 h-4" />
                Submit
              </Button>
            </Link>
          </div>
        </div>

        {/* Prompts List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
            <p className="mt-4 text-muted-foreground">Loading leaderboard...</p>
          </div>
        ) : prompts.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-xl border border-border">
            <Trophy className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No prompts yet</h3>
            <p className="text-muted-foreground mb-4">Be the first to submit a prompt!</p>
            <Link href="/leaderboard/submit">
              <Button className="bg-orange-500 hover:bg-orange-600">Submit a Prompt</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {prompts.map((prompt) => (
              <div
                key={prompt.id}
                className={`p-4 md:p-6 rounded-xl border bg-card transition-all ${
                  expandedId === prompt.id
                    ? 'border-orange-500'
                    : 'border-border hover:border-orange-500/50'
                }`}
              >
                <div className="flex gap-4">
                  {/* Voting */}
                  <div className="flex flex-col items-center gap-1">
                    <button
                      onClick={() => handleVote(prompt.id, 'up')}
                      className={`p-1 rounded transition-colors ${
                        userVotes[prompt.id] === 'up'
                          ? 'text-orange-500'
                          : 'text-muted-foreground hover:text-orange-500'
                      }`}
                    >
                      <ArrowUp className="w-6 h-6" />
                    </button>
                    <span className={`font-bold text-lg ${
                      prompt.score > 0 ? 'text-orange-400' : prompt.score < 0 ? 'text-red-400' : ''
                    }`}>
                      {prompt.score}
                    </span>
                    <button
                      onClick={() => handleVote(prompt.id, 'down')}
                      className={`p-1 rounded transition-colors ${
                        userVotes[prompt.id] === 'down'
                          ? 'text-red-500'
                          : 'text-muted-foreground hover:text-red-500'
                      }`}
                    >
                      <ArrowDown className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-bold text-orange-400">#{prompt.rank}</span>
                          <h3
                            className="font-semibold text-lg cursor-pointer hover:text-orange-400"
                            onClick={() => setExpandedId(expandedId === prompt.id ? null : prompt.id)}
                          >
                            {prompt.title}
                          </h3>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                          <span className="px-2 py-0.5 bg-secondary rounded">{prompt.category}</span>
                          {prompt.author_name && <span>by {prompt.author_name}</span>}
                          <span>•</span>
                          <span>{prompt.copy_count} copies</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleCopy(prompt)}
                          className="p-2 rounded-lg bg-secondary hover:bg-orange-500 hover:text-foreground transition-colors"
                          title="Copy prompt"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleShare(prompt)}
                          className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                          title="Share"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Expanded content */}
                    {expandedId === prompt.id && (
                      <div className="mt-4">
                        <div className="bg-card rounded-lg p-4 font-mono text-sm">
                          <pre className="text-foreground whitespace-pre-wrap overflow-x-auto">
                            {prompt.content}
                          </pre>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-4">
                          {prompt.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs bg-secondary px-2 py-1 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-3 mt-4">
                          <Button
                            onClick={() => handleCopy(prompt)}
                            className="bg-orange-500 hover:bg-orange-600"
                          >
                            <Copy className="w-4 h-4 mr-2" />
                            Copy Prompt
                          </Button>
                          <a
                            href={`https://claude.ai/new?q=${encodeURIComponent(prompt.content)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button variant="outline">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Open in Claude
                            </Button>
                          </a>
                          <Button
                            variant="outline"
                            onClick={() => setOutcomePrompt({ id: prompt.id, title: prompt.title })}
                            className="border-green-500/50 text-green-400 hover:bg-green-500/10"
                          >
                            <Trophy className="w-4 h-4 mr-2" />
                            Report Win
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 p-8 rounded-xl bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 text-center">
          <h2 className="text-2xl font-bold mb-4">Have a prompt that works?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Submit your best GTM prompts to the leaderboard. Get recognized by the community.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/leaderboard/submit">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                <Plus className="w-4 h-4 mr-2" />
                Submit Your Prompt
              </Button>
            </Link>
            <Link href="/leaderboard/impact">
              <Button size="lg" variant="outline">
                <DollarSign className="w-4 h-4 mr-2" />
                View Impact
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Outcome Modal */}
      {outcomePrompt && (
        <OutcomeModal
          promptId={outcomePrompt.id}
          promptTitle={outcomePrompt.title}
          isOpen={!!outcomePrompt}
          onClose={() => setOutcomePrompt(null)}
          onSuccess={() => fetchLeaderboard()}
        />
      )}
    </div>
  );
}
