/**
 * GTM Skills Contributor System
 *
 * Recognition-based contributor profiles and attribution tracking.
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
  total_votes: number;
  rank?: number;
  badge?: 'top10' | 'top50' | 'rising' | 'verified';
  status: 'pending' | 'approved' | 'suspended';
  verified: boolean;
  featured: boolean;
  created_at: string;
}

export interface ContributorStats {
  total_prompts: number;
  total_copies: number;
  total_outcomes: number;
  total_votes: number;
  rank?: number;
  top_prompt?: {
    id: string;
    title: string;
    copies: number;
    votes: number;
  };
}

export interface Attribution {
  contributor_id: string;
  prompt_id?: string;
  visitor_fingerprint: string;
  event_type: 'visit' | 'prompt_view' | 'prompt_copy' | 'outcome_logged';
  referrer_url?: string;
  landing_page?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
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
  sort?: 'votes' | 'prompts' | 'copies' | 'recent';
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
          total_votes: 892,
          rank: 1,
          badge: 'top10',
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
          total_votes: 654,
          rank: 2,
          badge: 'top10',
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
          total_votes: 445,
          rank: 3,
          badge: 'top50',
          status: 'approved',
          verified: true,
          featured: false,
          created_at: '2026-01-20',
        },
      ],
      total: 3,
    };
  }

  const { limit = 20, offset = 0, featured, sort = 'votes' } = options;

  let query = supabase
    .from('contributors')
    .select('*', { count: 'exact' })
    .eq('status', 'approved');

  if (featured !== undefined) {
    query = query.eq('featured', featured);
  }

  // Sort
  switch (sort) {
    case 'votes':
      query = query.order('total_votes', { ascending: false });
      break;
    case 'prompts':
      query = query.order('total_prompts', { ascending: false });
      break;
    case 'copies':
      query = query.order('total_copies', { ascending: false });
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
    // Return mock for known slugs
    const mockContributors: Record<string, Contributor> = {
      'sarah-chen': {
        id: '1',
        email: 'sarah@example.com',
        name: 'Sarah Chen',
        slug: 'sarah-chen',
        bio: 'Enterprise AE | MEDDPICC enthusiast | 10+ years in B2B SaaS',
        twitter_handle: 'sarahsells',
        total_prompts: 12,
        total_copies: 4523,
        total_outcomes: 47,
        total_votes: 892,
        rank: 1,
        badge: 'top10',
        status: 'approved',
        verified: true,
        featured: true,
        created_at: '2026-01-15',
      },
    };
    return mockContributors[slug] || null;
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
      total_votes: 892,
      rank: 1,
      top_prompt: {
        id: '1',
        title: 'MEDDPICC Discovery Framework',
        copies: 1847,
        votes: 324,
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

  // Get top prompt
  const { data: topPrompt } = await supabase
    .from('leaderboard_prompts')
    .select('id, title, copy_count, vote_count')
    .eq('contributor_id', contributorId)
    .order('vote_count', { ascending: false })
    .limit(1)
    .single();

  return {
    total_prompts: contributor.total_prompts,
    total_copies: contributor.total_copies,
    total_outcomes: contributor.total_outcomes,
    total_votes: contributor.total_votes,
    rank: contributor.rank,
    top_prompt: topPrompt ? {
      id: topPrompt.id,
      title: topPrompt.title,
      copies: topPrompt.copy_count,
      votes: topPrompt.vote_count,
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
 * Get leaderboard stats for contributors
 */
export async function getContributorLeaderboard(): Promise<{
  topByVotes: Contributor[];
  topByCopies: Contributor[];
  topByPrompts: Contributor[];
}> {
  const supabase = getSupabase();

  const defaultData = {
    topByVotes: [],
    topByCopies: [],
    topByPrompts: [],
  };

  if (!supabase) {
    return defaultData;
  }

  const [byVotes, byCopies, byPrompts] = await Promise.all([
    supabase
      .from('contributors')
      .select('*')
      .eq('status', 'approved')
      .order('total_votes', { ascending: false })
      .limit(5),
    supabase
      .from('contributors')
      .select('*')
      .eq('status', 'approved')
      .order('total_copies', { ascending: false })
      .limit(5),
    supabase
      .from('contributors')
      .select('*')
      .eq('status', 'approved')
      .order('total_prompts', { ascending: false })
      .limit(5),
  ]);

  return {
    topByVotes: byVotes.data || [],
    topByCopies: byCopies.data || [],
    topByPrompts: byPrompts.data || [],
  };
}
