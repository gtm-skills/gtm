// API utilities for GTM Skills API v1

import {
  Prompt,
  industries,
  saasPrompts,
  financialServicesPrompts,
  healthcarePrompts,
  manufacturingPrompts,
  professionalServicesPrompts,
  ecommercePrompts,
  realEstatePrompts,
  educationPrompts,
  logisticsPrompts,
  energyPrompts,
  governmentPrompts,
  telecomPrompts,
  mediaPrompts,
  hospitalityPrompts,
  constructionPrompts,
  insurancePrompts,
  universalPrompts,
  sdrPrompts,
  aePrompts,
  salesManagerPrompts,
  founderPrompts,
  revopsPrompts,
  csmPrompts,
  prospectingPrompts,
  outreachPrompts,
  discoveryPrompts,
  negotiationPrompts,
  meddpiccPrompts,
  spinPrompts,
  challengerPrompts,
  workflows,
} from './prompts';

// Aggregate all prompts into a single array
export function getAllPrompts(): Prompt[] {
  return [
    // Industry prompts
    ...saasPrompts,
    ...financialServicesPrompts,
    ...healthcarePrompts,
    ...manufacturingPrompts,
    ...professionalServicesPrompts,
    ...ecommercePrompts,
    ...realEstatePrompts,
    ...educationPrompts,
    ...logisticsPrompts,
    ...energyPrompts,
    ...governmentPrompts,
    ...telecomPrompts,
    ...mediaPrompts,
    ...hospitalityPrompts,
    ...constructionPrompts,
    ...insurancePrompts,
    ...universalPrompts,
    // Role prompts
    ...sdrPrompts,
    ...aePrompts,
    ...salesManagerPrompts,
    ...founderPrompts,
    ...revopsPrompts,
    ...csmPrompts,
    // Workflow prompts
    ...prospectingPrompts,
    ...outreachPrompts,
    ...discoveryPrompts,
    ...negotiationPrompts,
    // Methodology prompts
    ...meddpiccPrompts,
    ...spinPrompts,
    ...challengerPrompts,
  ];
}

// Get all categories
export function getAllCategories() {
  return {
    industries: industries.map((i) => ({
      slug: i.slug,
      name: i.name,
      description: i.description,
      count: i.count,
    })),
    roles: [
      { slug: 'sdr', name: 'SDR/BDR', description: 'Sales Development Representative', count: sdrPrompts.length },
      { slug: 'ae', name: 'Account Executive', description: 'Closing and deal management', count: aePrompts.length },
      { slug: 'sales-manager', name: 'Sales Manager', description: 'Team leadership and coaching', count: salesManagerPrompts.length },
      { slug: 'founder', name: 'Founder', description: 'Founder-led sales', count: founderPrompts.length },
      { slug: 'revops', name: 'RevOps', description: 'Revenue Operations', count: revopsPrompts.length },
      { slug: 'csm', name: 'CSM', description: 'Customer Success Manager', count: csmPrompts.length },
    ],
    workflows: workflows.map((w) => ({
      slug: w.slug,
      name: w.name,
      description: w.description,
      count: w.count,
    })),
    methodologies: [
      { slug: 'meddpicc', name: 'MEDDPICC', description: 'Enterprise deal qualification', count: meddpiccPrompts.length },
      { slug: 'spin', name: 'SPIN Selling', description: 'Situation, Problem, Implication, Need-Payoff', count: spinPrompts.length },
      { slug: 'challenger', name: 'Challenger Sale', description: 'Teach, Tailor, Take Control', count: challengerPrompts.length },
    ],
  };
}

// Filter prompts with various criteria
export interface PromptFilters {
  category?: string;
  subcategory?: string;
  industry?: string;
  role?: string;
  methodology?: string;
  workflow?: string;
  tags?: string[];
  difficulty?: string;
  search?: string;
  limit?: number;
  offset?: number;
  sort?: 'popular' | 'recent' | 'alphabetical';
}

export function filterPrompts(filters: PromptFilters): { prompts: Prompt[]; total: number } {
  let prompts = getAllPrompts();

  // Filter by category (generic)
  if (filters.category) {
    prompts = prompts.filter((p) => p.category === filters.category);
  }

  // Filter by subcategory
  if (filters.subcategory) {
    prompts = prompts.filter((p) => p.subcategory === filters.subcategory);
  }

  // Filter by industry
  if (filters.industry) {
    prompts = prompts.filter((p) => p.category === filters.industry);
  }

  // Filter by tags
  if (filters.tags && filters.tags.length > 0) {
    prompts = prompts.filter((p) => filters.tags!.some((tag) => p.tags.includes(tag)));
  }

  // Filter by difficulty
  if (filters.difficulty) {
    prompts = prompts.filter((p) => p.difficulty === filters.difficulty);
  }

  // Search in title, description, and prompt content
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    prompts = prompts.filter(
      (p) =>
        p.title.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower) ||
        p.prompt.toLowerCase().includes(searchLower)
    );
  }

  // Sort
  if (filters.sort === 'alphabetical') {
    prompts = prompts.sort((a, b) => a.title.localeCompare(b.title));
  }
  // Note: 'popular' and 'recent' would need additional data (view counts, timestamps)
  // For now, default order is maintained

  const total = prompts.length;

  // Pagination
  const offset = filters.offset || 0;
  const limit = filters.limit || 20;
  prompts = prompts.slice(offset, offset + limit);

  return { prompts, total };
}

// Contextual recommendation scoring
export interface RecommendContext {
  dealStage?: string;
  persona?: string;
  industry?: string;
  companySize?: string;
  context?: string; // free-form context
}

export interface RecommendedPrompt extends Prompt {
  relevanceScore: number;
  relevanceReason: string;
}

export function recommendPrompts(ctx: RecommendContext, limit: number = 5): RecommendedPrompt[] {
  const allPrompts = getAllPrompts();
  const scored: RecommendedPrompt[] = [];

  for (const prompt of allPrompts) {
    let score = 0;
    const reasons: string[] = [];

    // Industry match (high weight)
    if (ctx.industry && prompt.category === ctx.industry) {
      score += 30;
      reasons.push(`Matches ${ctx.industry} industry`);
    }

    // Deal stage inference from tags
    if (ctx.dealStage) {
      const stageMapping: Record<string, string[]> = {
        prospecting: ['cold-email', 'outreach', 'prospecting', 'research'],
        discovery: ['discovery', 'questions', 'qualification'],
        demo: ['demo', 'presentation', 'technical'],
        proposal: ['proposal', 'pricing', 'negotiation'],
        negotiation: ['negotiation', 'objection', 'closing'],
        closing: ['closing', 'contract', 'deal'],
      };
      const relevantTags = stageMapping[ctx.dealStage.toLowerCase()] || [];
      const matchingTags = prompt.tags.filter((t) => relevantTags.includes(t));
      if (matchingTags.length > 0) {
        score += 25 * matchingTags.length;
        reasons.push(`Relevant to ${ctx.dealStage} stage`);
      }
    }

    // Persona match
    if (ctx.persona) {
      const personaLower = ctx.persona.toLowerCase();
      if (prompt.description.toLowerCase().includes(personaLower) || prompt.prompt.toLowerCase().includes(personaLower)) {
        score += 20;
        reasons.push(`Matches ${ctx.persona} persona`);
      }
      // Check for role-based keywords
      const roleKeywords: Record<string, string[]> = {
        sdr: ['sdr', 'bdr', 'prospecting', 'cold'],
        ae: ['account executive', 'closing', 'deal', 'negotiation'],
        vp: ['executive', 'leadership', 'strategic'],
        cto: ['technical', 'engineering', 'architecture'],
        cfo: ['financial', 'roi', 'budget', 'cost'],
      };
      for (const [role, keywords] of Object.entries(roleKeywords)) {
        if (personaLower.includes(role)) {
          const matches = keywords.filter(
            (k) => prompt.prompt.toLowerCase().includes(k) || prompt.tags.includes(k)
          );
          if (matches.length > 0) {
            score += 15;
            reasons.push(`Tailored for ${role.toUpperCase()} conversations`);
          }
        }
      }
    }

    // Free-form context matching
    if (ctx.context) {
      const contextWords = ctx.context.toLowerCase().split(/\s+/);
      const matchingWords = contextWords.filter(
        (word) =>
          word.length > 3 &&
          (prompt.title.toLowerCase().includes(word) ||
            prompt.description.toLowerCase().includes(word) ||
            prompt.tags.some((t) => t.includes(word)))
      );
      if (matchingWords.length > 0) {
        score += 10 * matchingWords.length;
        reasons.push(`Matches context: ${matchingWords.slice(0, 3).join(', ')}`);
      }
    }

    if (score > 0) {
      scored.push({
        ...prompt,
        relevanceScore: Math.min(score, 100), // Cap at 100
        relevanceReason: reasons.join('; '),
      });
    }
  }

  // Sort by relevance and return top N
  return scored.sort((a, b) => b.relevanceScore - a.relevanceScore).slice(0, limit);
}

// Get a single prompt by ID
export function getPromptById(id: string): Prompt | null {
  const allPrompts = getAllPrompts();
  return allPrompts.find((p) => p.id === id) || null;
}

// Generate prompts.json for LLM discoverability
export function generatePromptsJson() {
  const allPrompts = getAllPrompts();
  const categories = getAllCategories();

  return {
    version: '1.0.0',
    updated_at: new Date().toISOString(),
    total_prompts: allPrompts.length,
    source: 'https://gtm-skills.com',
    repository: 'https://github.com/Prospeda/gtm-skills',
    license: 'MIT',
    categories: {
      industries: categories.industries.map((i) => i.slug),
      roles: categories.roles.map((r) => r.slug),
      workflows: categories.workflows.map((w) => w.slug),
      methodologies: categories.methodologies.map((m) => m.slug),
    },
    prompts: allPrompts.map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      category: p.category,
      subcategory: p.subcategory,
      tags: p.tags,
      difficulty: p.difficulty,
      url: `https://gtm-skills.com/prompts/${p.id}`,
      api_url: `https://api.gtm-skills.com/v1/prompts/${p.id}`,
    })),
  };
}
