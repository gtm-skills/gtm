/**
 * Contributors Page
 * Lists all approved contributors with recognition stats
 */

import Link from 'next/link';
import { Users, Trophy, ThumbsUp, Copy, BadgeCheck, Star, Award } from 'lucide-react';
import { getContributors, getContributorLeaderboard } from '@/lib/contributors';

export const metadata = {
  title: 'Contributors | GTM Skills',
  description: 'Meet the top contributors powering the GTM Skills community. Submit prompts, earn recognition, and climb the leaderboard.',
};

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
}

export default async function ContributorsPage() {
  const [{ data: contributors }, leaderboard] = await Promise.all([
    getContributors({ limit: 50, sort: 'votes' }),
    getContributorLeaderboard(),
  ]);

  const topVotes = leaderboard.topByVotes[0];
  const topCopies = leaderboard.topByCopies[0];
  const topPrompts = leaderboard.topByPrompts[0];

  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 via-transparent to-transparent" />
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm mb-6">
              <Users className="w-4 h-4" />
              <span>Community Contributors</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              The People Behind
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500"> GTM Skills</span>
            </h1>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              Our contributors share battle-tested prompts that help sales teams close more deals.
              Join the community and earn recognition.
            </p>
          </div>

          {/* Top Contributors Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Most Voted */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-amber-500/50 transition-colors">
              <div className="flex items-center gap-2 text-amber-400 mb-4">
                <Trophy className="w-5 h-5" />
                <span className="text-sm font-medium">Most Voted</span>
              </div>
              {topVotes ? (
                <Link href={`/contributors/${topVotes.slug}`} className="block group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-lg">
                      {topVotes.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-semibold group-hover:text-amber-400 transition-colors">{topVotes.name}</span>
                        {topVotes.verified && <BadgeCheck className="w-4 h-4 text-amber-400" />}
                      </div>
                      <span className="text-zinc-500 text-sm">{topVotes.total_prompts} prompts</span>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                    {formatNumber(topVotes.total_votes)} votes
                  </div>
                </Link>
              ) : (
                <div className="text-zinc-500">No contributors yet</div>
              )}
            </div>

            {/* Most Copied */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-emerald-500/50 transition-colors">
              <div className="flex items-center gap-2 text-emerald-400 mb-4">
                <Copy className="w-5 h-5" />
                <span className="text-sm font-medium">Most Copied</span>
              </div>
              {topCopies ? (
                <Link href={`/contributors/${topCopies.slug}`} className="block group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-lg">
                      {topCopies.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-semibold group-hover:text-emerald-400 transition-colors">{topCopies.name}</span>
                        {topCopies.verified && <BadgeCheck className="w-4 h-4 text-emerald-400" />}
                      </div>
                      <span className="text-zinc-500 text-sm">{topCopies.total_prompts} prompts</span>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">
                    {formatNumber(topCopies.total_copies)} copies
                  </div>
                </Link>
              ) : (
                <div className="text-zinc-500">No contributors yet</div>
              )}
            </div>

            {/* Most Prompts */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-violet-500/50 transition-colors">
              <div className="flex items-center gap-2 text-violet-400 mb-4">
                <Award className="w-5 h-5" />
                <span className="text-sm font-medium">Most Prolific</span>
              </div>
              {topPrompts ? (
                <Link href={`/contributors/${topPrompts.slug}`} className="block group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                      {topPrompts.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-semibold group-hover:text-violet-400 transition-colors">{topPrompts.name}</span>
                        {topPrompts.verified && <BadgeCheck className="w-4 h-4 text-violet-400" />}
                      </div>
                      <span className="text-zinc-500 text-sm">{formatNumber(topPrompts.total_copies)} copies</span>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-500">
                    {topPrompts.total_prompts} prompts
                  </div>
                </Link>
              ) : (
                <div className="text-zinc-500">No contributors yet</div>
              )}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              href="/leaderboard/submit"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-lg hover:from-amber-400 hover:to-orange-500 transition-colors"
            >
              <Star className="w-5 h-5" />
              Become a Contributor
            </Link>
          </div>
        </div>
      </section>

      {/* All Contributors Grid */}
      <section className="py-16 border-t border-zinc-800">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-white mb-8">All Contributors</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contributors.map((contributor, index) => (
              <Link
                key={contributor.id}
                href={`/contributors/${contributor.slug}`}
                className="group bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-amber-500/30 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center text-white font-bold text-xl">
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
                    {index < 3 && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-xs font-bold text-black">
                        {index + 1}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white font-semibold truncate group-hover:text-amber-400 transition-colors">
                        {contributor.name}
                      </span>
                      {contributor.verified && <BadgeCheck className="w-4 h-4 text-amber-400 flex-shrink-0" />}
                      {contributor.featured && <Star className="w-4 h-4 text-amber-400 flex-shrink-0" />}
                    </div>
                    {contributor.bio && (
                      <p className="text-zinc-500 text-sm line-clamp-2 mb-3">{contributor.bio}</p>
                    )}

                    <div className="flex items-center gap-4 text-sm">
                      <div>
                        <span className="text-zinc-500">Prompts</span>
                        <span className="text-white ml-1 font-medium">{contributor.total_prompts}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500">Votes</span>
                        <span className="text-amber-400 ml-1 font-medium">
                          {formatNumber(contributor.total_votes)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {contributors.length === 0 && (
            <div className="text-center py-16">
              <Users className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Contributors Yet</h3>
              <p className="text-zinc-400 mb-6">Be the first to contribute prompts and earn recognition.</p>
              <Link
                href="/leaderboard/submit"
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-black font-semibold rounded-lg hover:bg-amber-400 transition-colors"
              >
                Submit Your First Prompt
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 border-t border-zinc-800 bg-zinc-900/30">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">How Contributors Earn Recognition</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-amber-400">1</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Submit Prompts</h3>
              <p className="text-zinc-400 text-sm">
                Share your best GTM prompts. We review for quality and approve winning submissions.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-emerald-400">2</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Get Votes & Copies</h3>
              <p className="text-zinc-400 text-sm">
                The community votes on prompts. Popular prompts get copied and used by thousands.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-violet-400">3</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Earn Badges & Rank</h3>
              <p className="text-zinc-400 text-sm">
                Top contributors earn badges, get featured, and build their reputation in the GTM community.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
