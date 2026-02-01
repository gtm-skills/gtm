/**
 * Individual Contributor Profile Page
 */

import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Users, Trophy, DollarSign, Copy, Target, BadgeCheck,
  Twitter, Linkedin, Github, Globe, ArrowLeft, TrendingUp
} from 'lucide-react';
import { getContributorBySlug, getContributorStats, getContributorEarnings } from '@/lib/contributors';

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
    description: contributor.bio || `View ${contributor.name}'s GTM Skills contributions, earnings, and impact.`,
  };
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
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

export default async function ContributorProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const contributor = await getContributorBySlug(slug);

  if (!contributor) {
    notFound();
  }

  const [stats, { data: earnings }] = await Promise.all([
    getContributorStats(contributor.id),
    getContributorEarnings(contributor.id, { limit: 5 }),
  ]);

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
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-white">{contributor.name}</h1>
                {contributor.verified && (
                  <BadgeCheck className="w-6 h-6 text-amber-400" />
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

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
              <div className="flex items-center gap-2 text-emerald-500 mb-2">
                <DollarSign className="w-4 h-4" />
                <span className="text-sm">Revenue Influenced</span>
              </div>
              <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">
                {formatCurrency(stats?.total_revenue_influenced || contributor.total_revenue_influenced)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Earnings Section */}
      {stats && (
        <section className="py-8 border-t border-zinc-800">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-amber-400" />
              Earnings Summary
            </h2>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl p-6">
                <div className="text-zinc-400 text-sm mb-1">Total Earnings</div>
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                  {formatCurrency(stats.total_earnings)}
                </div>
              </div>

              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                <div className="text-zinc-400 text-sm mb-1">This Month</div>
                <div className="text-3xl font-bold text-white">
                  {formatCurrency(stats.this_month_earnings)}
                </div>
              </div>

              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                <div className="text-zinc-400 text-sm mb-1">Pending Payout</div>
                <div className="text-3xl font-bold text-white">
                  {formatCurrency(stats.pending_payout)}
                </div>
              </div>
            </div>

            {/* Top Prompt */}
            {stats.top_prompt && (
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 mb-8">
                <div className="text-zinc-400 text-sm mb-2">Top Performing Prompt</div>
                <Link
                  href={`/leaderboard?prompt=${stats.top_prompt.id}`}
                  className="text-lg font-semibold text-white hover:text-amber-400 transition-colors"
                >
                  {stats.top_prompt.title}
                </Link>
                <div className="flex items-center gap-4 mt-2 text-sm">
                  <span className="text-zinc-500">
                    <Copy className="w-4 h-4 inline mr-1" />
                    {formatNumber(stats.top_prompt.copies)} copies
                  </span>
                  {stats.top_prompt.revenue > 0 && (
                    <span className="text-emerald-400">
                      <DollarSign className="w-4 h-4 inline mr-1" />
                      {formatCurrency(stats.top_prompt.revenue)} influenced
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Recent Earnings */}
            {earnings.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Recent Earnings</h3>
                <div className="space-y-3">
                  {earnings.map((earning) => (
                    <div
                      key={earning.id}
                      className="flex items-center justify-between bg-zinc-900/30 border border-zinc-800 rounded-lg p-4"
                    >
                      <div>
                        <div className="text-white font-medium">
                          {earning.earning_type === 'outcome_share' && 'Revenue Share'}
                          {earning.earning_type === 'referral_bonus' && 'Referral Bonus'}
                          {earning.earning_type === 'featured_bonus' && 'Featured Bonus'}
                          {earning.earning_type === 'manual_adjustment' && 'Adjustment'}
                        </div>
                        {earning.description && (
                          <div className="text-zinc-500 text-sm">{earning.description}</div>
                        )}
                      </div>
                      <div className="text-right">
                        <div className={`font-semibold ${earning.net_amount >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {earning.net_amount >= 0 ? '+' : ''}{formatCurrency(earning.net_amount)}
                        </div>
                        <div className="text-zinc-500 text-xs">
                          {earning.status === 'pending' && '⏳ Pending'}
                          {earning.status === 'approved' && '✓ Approved'}
                          {earning.status === 'paid' && '💰 Paid'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
