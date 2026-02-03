import { MetadataRoute } from 'next';
import { getAllPromptSlugs } from '@/data/pseo';
import { getAllAgentSlugs } from '@/data/agentic';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://gtm-skills.com';

  // Core pages
  const corePages = [
    '',
    '/agentic-bdr',
    '/tutorials',
    '/prompts',
    '/industry',
    '/industry/saas',
    '/industry/financial-services',
    '/industry/healthcare',
    '/industry/manufacturing',
    '/industry/professional-services',
    '/industry/ecommerce',
    '/industry/real-estate',
    '/industry/education',
    '/role',
    '/role/sdr',
    '/role/ae',
    '/role/sales-manager',
    '/role/revops',
    '/role/csm',
    '/role/founder',
    '/workflow',
    '/workflow/cold-to-close',
    '/workflow/discovery',
    '/workflow/demo-proposal',
    '/workflow/competitive',
    '/workflow/expansion',
    '/workflow/qbr',
    '/methodology',
    '/methodology/meddpicc',
    '/methodology/spin',
    '/methodology/challenger',
    '/methodology/sandler',
    '/methodology/value-selling',
    '/methodology/gap-selling',
    '/free-tools',
    '/free-tools/clawdbot',
    '/free-tools/mcp-server',
    '/free-tools/claude-integrations',
    '/download',
    '/templates',
    '/projects',
    '/signals',
    '/openclaw',
    '/developers',
    '/voice-templates',
  ];

  // All 24 tonality pages
  const tonalities = [
    'alex-hormozi',
    'challenger',
    'chris-voss',
    'command-of-message',
    'competitive-displacement',
    'cormac-mccarthy',
    'david-ogilvy',
    'executive-briefing',
    'expansion-upsell',
    'gap-selling',
    'hemingway',
    'jeff-bezos',
    'meddic',
    'naval-ravikant',
    'pain-point-research',
    'sandler',
    'seth-godin',
    'socratic',
    'spin-selling',
    'steve-jobs',
    'trusted-advisor',
    'value-based',
    'warren-buffett',
    'win-back',
  ];

  const tonalityPages = ['/free-tools/tonalities', ...tonalities.map((t) => `/free-tools/tonalities/${t}`)];

  // pSEO prompt pages (Industry×Role, Industry×Methodology, Role×Workflow)
  const promptSlugs = getAllPromptSlugs();
  const promptPages = promptSlugs.map((slug) => `/prompts/${slug.join('/')}`);

  // Agentic BDR pages (Tier 8)
  const agentSlugs = getAllAgentSlugs();
  const agentPages = agentSlugs.map((slug) => `/agentic-bdr/${slug}`);

  const allPages = [...corePages, ...tonalityPages, ...promptPages, ...agentPages];

  return allPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'daily' : 'weekly',
    priority: path === '' ? 1 : path.startsWith('/prompts/') ? 0.8 : path.startsWith('/agentic-bdr/') ? 0.85 : path.includes('tonalities') ? 0.7 : 0.8,
  }));
}
