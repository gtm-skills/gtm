import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://gtm-skills.com';

  // Core pages
  const corePages = [
    '',
    '/agentic-bdr',
    '/tutorials',
    '/tutorials/moltbot-agentic-sdr',
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

  const allPages = [...corePages, ...tonalityPages];

  return allPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'daily' : 'weekly',
    priority: path === '' ? 1 : path.includes('tonalities') ? 0.7 : 0.8,
  }));
}
