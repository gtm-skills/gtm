import 'server-only';
import { getSkill } from '@/data/skills';

export interface SkillFile {
  path: string;
  content: string;
}

const PUBLIC_REPO = 'gtm-skills/gtm';

/**
 * Fetch a skill's files. Free skills come from the public repo; premium from the
 * private content repo via a fine-grained PAT. Caller must have checked access.
 */
export async function getSkillFiles(slug: string, opts: { watermarkEmail?: string } = {}): Promise<SkillFile[]> {
  const skill = getSkill(slug);
  if (!skill) throw new Error(`unknown skill ${slug}`);

  const isPremium = skill.tier === 'premium';
  const repo = isPremium ? process.env.GITHUB_PREMIUM_REPO || 'gtm-skills/premium' : PUBLIC_REPO;
  const token = isPremium ? process.env.GITHUB_PREMIUM_TOKEN : undefined;
  if (isPremium && !token) throw new Error('premium content not configured');

  const files = await Promise.all(
    skill.files.map(async (rel) => {
      const path = `${skill.contentPath}/${rel}`;
      const res = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
        headers: {
          Accept: 'application/vnd.github.raw+json',
          'X-GitHub-Api-Version': '2022-11-28',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        next: { revalidate: 3600, tags: [`skill:${slug}`] },
      });
      if (!res.ok) throw new Error(`fetch ${path}: ${res.status}`);
      let content = await res.text();
      if (rel === 'SKILL.md' && opts.watermarkEmail) {
        content = `<!-- licensed to ${opts.watermarkEmail} · gtm-skills.com · v${skill.version} -->\n${content}`;
      }
      return { path: rel, content };
    }),
  );
  return files;
}

/** First N lines of SKILL.md for the blurred paywall preview. Never the whole file. */
export async function getSkillPreview(slug: string, lines = 40): Promise<string | null> {
  try {
    const [skillMd] = await getSkillFiles(slug);
    return skillMd.content.split('\n').slice(0, lines).join('\n');
  } catch {
    return null;
  }
}
