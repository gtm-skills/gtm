/**
 * Individual Contributor Profile Page
 */

import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Users, Trophy, Copy, Target, BadgeCheck,
  Twitter, Linkedin, Github, Globe, ArrowLeft, ThumbsUp, Award
} from 'lucide-react';
import { getContributorBySlug, getContributorStats } from '@/lib/contributors';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const contributor = await getContributorBySlug(slug);

  if (!contributor) {
    return { title: 'Contributor Not Found | GTM Skills' };
  }

  return {
    title: `${contributor.name} | GTM Skills Contributor`,
    description: contributor.bio || `View ${contributor.name}'s GTM Skills contributions and community impact.`,
  };
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
}

function getBadgeInfo(badge?: string): { label: string; color: string } | null {
  switch (badge) {
    case 'top10':
      return { label: 'Top 10', color: 'amber' };
    case 'top50':
      return { label: 'Top 50', color: 'violet' };
    case 'rising':
      return { label: 'Rising Star', color: 'emerald' };
    case 'verified':
      return { label: 'Verified', color: 'blue' };
    default:
      return null;
  }
}

export default async function ContributorProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const contributor = await getContributorBySlug(slug);

  if (!contributor) {
    notFound();
  }

  const stats = await getContributorStats(contributor.id);
  const badgeInfo = getBadgeInfo(contributor.badge);

  return (
    <main className="min-h-screen bg-black">
      {/* Header */}
      <section className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto px-6">
          <Link
            href="/contributors"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Contributors</span>
          </Link>

          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-3xl">
                {contributor.avatar_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={contributor.avatar_url}
                    alt={contributor.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  contributor.name.charAt(0)
                )}
              </div>
              {contributor.featured && (
                <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center">
                  <Trophy className="w-4 h-4 text-black" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h1 className="text-3xl font-bold text-white">{contributor.name}</h1>
                {contributor.verified && (
                  <BadgeCheck className="w-6 h-6 text-amber-400" />
                )}
                {badgeInfo && (
                  <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${badgeInfo.color}-500/10 text-${badgeInfo.color}-400 border border-${badgeInfo.color}-500/20`}>
                    {badgeInfo.label}
                  </span>
                )}
              </div>

              {contributor.bio && (
                <p className="text-zinc-400 mb-4 max-w-xl">{contributor.bio}</p>
              )}

              {/* Social Links */}
              <div className="flex items-center gap-4">
                {contributor.twitter_handle && (
                  <a
                    href={`https://twitter.com/${contributor.twitter_handle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-500 hover:text-blue-400 transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
                {contributor.linkedin_url && (
                  <a
                    href={contributor.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-500 hover:text-blue-500 transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {contributor.github_handle && (
                  <a
                    href={`https://github.com/${contributor.github_handle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-500 hover:text-white transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {contributor.website_url && (
                  <a
                    href={contributor.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-500 hover:text-emerald-400 transition-colors"
                  >
                    <Globe className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-8 border-t border-zinc-800">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
              <div className="flex items-center gap-2 text-zinc-500 mb-2">
                <Users className="w-4 h-4" />
                <span className="text-sm">Prompts</span>
              </div>
              <div className="text-2xl font-bold text-white">
                {stats?.total_prompts || contributor.total_prompts}
              </div>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
              <div className="flex items-center gap-2 text-zinc-500 mb-2">
                <ThumbsUp className="w-4 h-4" />
                <span className="text-sm">Votes</span>
              </div>
              <div className="text-2xl font-bold text-amber-400">
                {formatNumber(stats?.total_votes || contributor.total_votes)}
              </div>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
              <div className="flex items-center gap-2 text-zinc-500 mb-2">
                <Copy className="w-4 h-4" />
                <span className="text-sm">Copies</span>
              </div>
              <div className="text-2xl font-bold text-white">
                {formatNumber(stats?.total_copies || contributor.total_copies)}
              </div>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
              <div className="flex items-center gap-2 text-zinc-500 mb-2">
                <Target className="w-4 h-4" />
                <span className="text-sm">Outcomes</span>
              </div>
              <div className="text-2xl font-bold text-white">
                {stats?.total_outcomes || contributor.total_outcomes}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rank & Recognition */}
      {(stats?.rank || contributor.rank) && (
        <section className="py-8 border-t border-zinc-800">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              Recognition
            </h2>

            <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl p-6">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">#{stats?.rank || contributor.rank}</span>
                </div>
                <div>
                  <div className="text-lg font-semibold text-white">Contributor Rank</div>
                  <div className="text-zinc-400">
                    {(stats?.rank || contributor.rank || 0) <= 10 && 'Top 10 contributor - Elite status'}
                    {(stats?.rank || contributor.rank || 0) > 10 && (stats?.rank || contributor.rank || 0) <= 50 && 'Top 50 contributor - Rising star'}
                    {(stats?.rank || contributor.rank || 0) > 50 && 'Active community contributor'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Top Prompt */}
      {stats?.top_prompt && (
        <section className="py-8 border-t border-zinc-800">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              Top Performing Prompt
            </h2>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
              <Link
                href={`/leaderboard?prompt=${stats.top_prompt.id}`}
                className="text-lg font-semibold text-white hover:text-amber-400 transition-colors"
              >
                {stats.top_prompt.title}
              </Link>
              <div className="flex items-center gap-6 mt-3 text-sm">
                <span className="flex items-center gap-1 text-zinc-400">
                  <ThumbsUp className="w-4 h-4" />
                  {formatNumber(stats.top_prompt.votes)} votes
                </span>
                <span className="flex items-center gap-1 text-zinc-400">
                  <Copy className="w-4 h-4" />
                  {formatNumber(stats.top_prompt.copies)} copies
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Member Since */}
      <section className="py-8 border-t border-zinc-800">
        <div className="max-w-4xl mx-auto px-6 text-center text-zinc-500 text-sm">
          Member since {new Date(contributor.created_at).toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
          })}
        </div>
      </section>
    </main>
  );
}
