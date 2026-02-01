/**
 * GTM Skills Contributor System
 *
 * Handles contributor profiles, earnings, and attribution tracking.
 */

import { createClient } from '@supabase/supabase-js';

// Types
export interface Contributor {
  id: string;
  email: string;
  name: string;
  slug: string;
  avatar_url?: string;
  bio?: string;
  twitter_handle?: string;
  linkedin_url?: string;
  github_handle?: string;
  website_url?: string;
  total_prompts: number;
  total_copies: number;
  total_outcomes: number;
  total_revenue_influenced: number;
  total_earnings: number;
  pending_payout: number;
  status: 'pending' | 'approved' | 'suspended';
  verified: boolean;
  featured: boolean;
  created_at: string;
}

export interface ContributorStats {
  total_prompts: number;
  total_copies: number;
  total_outcomes: number;
  total_revenue_influenced: number;
  total_earnings: number;
  pending_payout: number;
  this_month_earnings: number;
  top_prompt?: {
    id: string;
    title: string;
    copies: number;
    revenue: number;
  };
}

export interface Attribution {
  contributor_id: string;
  prompt_id?: string;
  visitor_fingerprint: string;
  event_type: 'visit' | 'prompt_view' | 'prompt_copy' | 'outcome_logged' | 'signup' | 'upgrade';
  event_value?: number;
  referrer_url?: string;
  landing_page?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

export interface Earning {
  id: string;
  contributor_id: string;
  prompt_id?: string;
  earning_type: 'outcome_share' | 'referral_bonus' | 'featured_bonus' | 'manual_adjustment';
  gross_amount: number;
  net_amount: number;
  status: 'pending' | 'approved' | 'paid' | 'reversed';
  description?: string;
  created_at: string;
}

// Helper to get Supabase client
function getSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseKey);
}

/**
 * Get all contributors (public profiles)
 */
export async function getContributors(options: {
  limit?: number;
  offset?: number;
  featured?: boolean;
  sort?: 'earnings' | 'prompts' | 'revenue' | 'recent';
}): Promise<{ data: Contributor[]; total: number }> {
  const supabase = getSupabase();

  if (!supabase) {
    // Return mock data
    return {
      data: [
        {
          id: '1',
          email: 'sarah@example.com',
          name: 'Sarah Chen',
          slug: 'sarah-chen',
          avatar_url: undefined,
          bio: 'Enterprise AE | MEDDPICC enthusiast | 10+ years in B2B SaaS',
          twitter_handle: 'sarahsells',
          total_prompts: 12,
          total_copies: 4523,
          total_outcomes: 47,
          total_revenue_influenced: 892000,
          total_earnings: 8920,
          pending_payout: 450,
          status: 'approved',
          verified: true,
          featured: true,
          created_at: '2026-01-15',
        },
        {
          id: '2',
          email: 'marcus@example.com',
          name: 'Marcus Johnson',
          slug: 'marcus-johnson',
          bio: 'SDR Manager @ Series B startup | Cold email specialist',
          total_prompts: 8,
          total_copies: 3201,
          total_outcomes: 89,
          total_revenue_influenced: 654000,
          total_earnings: 6540,
          pending_payout: 320,
          status: 'approved',
          verified: true,
          featured: true,
          created_at: '2026-01-18',
        },
        {
          id: '3',
          email: 'alex@example.com',
          name: 'Alex Rivera',
          slug: 'alex-rivera',
          bio: 'Sales enablement leader | Challenger Sale certified',
          total_prompts: 6,
          total_copies: 2156,
          total_outcomes: 34,
          total_revenue_influenced: 445000,
          total_earnings: 4450,
          pending_payout: 0,
          status: 'approved',
          verified: true,
          featured: false,
          created_at: '2026-01-20',
        },
      ],
      total: 3,
    };
  }

  const { limit = 20, offset = 0, featured, sort = 'earnings' } = options;

  let query = supabase
    .from('contributors')
    .select('*', { count: 'exact' })
    .eq('status', 'approved');

  if (featured !== undefined) {
    query = query.eq('featured', featured);
  }

  // Sort
  switch (sort) {
    case 'earnings':
      query = query.order('total_earnings', { ascending: false });
      break;
    case 'prompts':
      query = query.order('total_prompts', { ascending: false });
      break;
    case 'revenue':
      query = query.order('total_revenue_influenced', { ascending: false });
      break;
    case 'recent':
      query = query.order('created_at', { ascending: false });
      break;
  }

  query = query.range(offset, offset + limit - 1);

  const { data, error, count } = await query;

  if (error) {
    console.error('Error fetching contributors:', error);
    return { data: [], total: 0 };
  }

  return { data: data || [], total: count || 0 };
}

/**
 * Get a single contributor by slug
 */
export async function getContributorBySlug(slug: string): Promise<Contributor | null> {
  const supabase = getSupabase();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from('contributors')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'approved')
    .single();

  if (error) {
    console.error('Error fetching contributor:', error);
    return null;
  }

  return data;
}

/**
 * Get contributor stats
 */
export async function getContributorStats(contributorId: string): Promise<ContributorStats | null> {
  const supabase = getSupabase();

  if (!supabase) {
    return {
      total_prompts: 12,
      total_copies: 4523,
      total_outcomes: 47,
      total_revenue_influenced: 892000,
      total_earnings: 8920,
      pending_payout: 450,
      this_month_earnings: 1250,
      top_prompt: {
        id: '1',
        title: 'MEDDPICC Discovery Framework',
        copies: 1847,
        revenue: 324000,
      },
    };
  }

  // Get contributor
  const { data: contributor } = await supabase
    .from('contributors')
    .select('*')
    .eq('id', contributorId)
    .single();

  if (!contributor) return null;

  // Get this month's earnings
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const { data: monthEarnings } = await supabase
    .from('contributor_earnings')
    .select('net_amount')
    .eq('contributor_id', contributorId)
    .gte('created_at', startOfMonth.toISOString());

  const thisMonthEarnings = monthEarnings?.reduce((sum, e) => sum + (e.net_amount || 0), 0) || 0;

  // Get top prompt
  const { data: topPrompt } = await supabase
    .from('leaderboard_prompts')
    .select('id, title, copy_count')
    .eq('contributor_id', contributorId)
    .order('copy_count', { ascending: false })
    .limit(1)
    .single();

  return {
    total_prompts: contributor.total_prompts,
    total_copies: contributor.total_copies,
    total_outcomes: contributor.total_outcomes,
    total_revenue_influenced: contributor.total_revenue_influenced,
    total_earnings: contributor.total_earnings,
    pending_payout: contributor.pending_payout,
    this_month_earnings: thisMonthEarnings,
    top_prompt: topPrompt ? {
      id: topPrompt.id,
      title: topPrompt.title,
      copies: topPrompt.copy_count,
      revenue: 0, // Would need to calculate from outcomes
    } : undefined,
  };
}

/**
 * Register a new contributor
 */
export async function registerContributor(data: {
  email: string;
  name: string;
  bio?: string;
  twitter_handle?: string;
  linkedin_url?: string;
}): Promise<{ success: boolean; contributor?: Contributor; error?: string }> {
  const supabase = getSupabase();

  if (!supabase) {
    return { success: false, error: 'Database not configured' };
  }

  // Generate slug from name
  const slug = data.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  // Check if slug exists
  const { data: existing } = await supabase
    .from('contributors')
    .select('id')
    .eq('slug', slug)
    .single();

  const finalSlug = existing ? `${slug}-${Date.now().toString(36)}` : slug;

  const { data: contributor, error } = await supabase
    .from('contributors')
    .insert({
      email: data.email,
      name: data.name,
      slug: finalSlug,
      bio: data.bio,
      twitter_handle: data.twitter_handle,
      linkedin_url: data.linkedin_url,
      status: 'pending',
    })
    .select()
    .single();

  if (error) {
    console.error('Error registering contributor:', error);
    return { success: false, error: error.message };
  }

  return { success: true, contributor };
}

/**
 * Track an attribution event
 */
export async function trackAttribution(data: Attribution): Promise<{ success: boolean }> {
  const supabase = getSupabase();

  if (!supabase) {
    return { success: true }; // Silently succeed if no DB
  }

  const { error } = await supabase.from('attributions').insert({
    contributor_id: data.contributor_id,
    prompt_id: data.prompt_id,
    visitor_fingerprint: data.visitor_fingerprint,
    event_type: data.event_type,
    event_value: data.event_value,
    referrer_url: data.referrer_url,
    landing_page: data.landing_page,
    utm_source: data.utm_source,
    utm_medium: data.utm_medium,
    utm_campaign: data.utm_campaign,
  });

  if (error) {
    console.error('Error tracking attribution:', error);
    return { success: false };
  }

  return { success: true };
}

/**
 * Get earnings for a contributor
 */
export async function getContributorEarnings(
  contributorId: string,
  options: { limit?: number; offset?: number; status?: string }
): Promise<{ data: Earning[]; total: number }> {
  const supabase = getSupabase();

  if (!supabase) {
    return {
      data: [
        {
          id: '1',
          contributor_id: contributorId,
          prompt_id: '1',
          earning_type: 'outcome_share',
          gross_amount: 125,
          net_amount: 125,
          status: 'approved',
          description: 'Revenue share from outcome: deal_won',
          created_at: '2026-01-28',
        },
      ],
      total: 1,
    };
  }

  const { limit = 20, offset = 0, status } = options;

  let query = supabase
    .from('contributor_earnings')
    .select('*', { count: 'exact' })
    .eq('contributor_id', contributorId)
    .order('created_at', { ascending: false });

  if (status) {
    query = query.eq('status', status);
  }

  query = query.range(offset, offset + limit - 1);

  const { data, error, count } = await query;

  if (error) {
    console.error('Error fetching earnings:', error);
    return { data: [], total: 0 };
  }

  return { data: data || [], total: count || 0 };
}

/**
 * Get leaderboard stats for contributors
 */
export async function getContributorLeaderboard(): Promise<{
  topByEarnings: Contributor[];
  topByRevenue: Contributor[];
  topByPrompts: Contributor[];
}> {
  const supabase = getSupabase();

  const defaultData = {
    topByEarnings: [],
    topByRevenue: [],
    topByPrompts: [],
  };

  if (!supabase) {
    return defaultData;
  }

  const [byEarnings, byRevenue, byPrompts] = await Promise.all([
    supabase
      .from('contributors')
      .select('*')
      .eq('status', 'approved')
      .order('total_earnings', { ascending: false })
      .limit(5),
    supabase
      .from('contributors')
      .select('*')
      .eq('status', 'approved')
      .order('total_revenue_influenced', { ascending: false })
      .limit(5),
    supabase
      .from('contributors')
      .select('*')
      .eq('status', 'approved')
      .order('total_prompts', { ascending: false })
      .limit(5),
  ]);

  return {
    topByEarnings: byEarnings.data || [],
    topByRevenue: byRevenue.data || [],
    topByPrompts: byPrompts.data || [],
  };
}
