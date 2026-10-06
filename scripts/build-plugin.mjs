// Assemble the ChatGPT plugin ZIP: manifest + free skills + assets.
import { mkdirSync, cpSync, rmSync, existsSync, writeFileSync, readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { join } from 'node:path';

const root = process.cwd();
const out = join(root, 'dist', 'plugin');
rmSync(out, { recursive: true, force: true });
mkdirSync(join(out, 'skills'), { recursive: true });

cpSync(join(root, 'plugin', 'plugin.json'), join(out, 'plugin.json'));
cpSync(join(root, 'plugin', 'mcp.json'), join(out, 'mcp.json'));
if (existsSync(join(root, 'plugin', 'assets'))) cpSync(join(root, 'plugin', 'assets'), join(out, 'assets'), { recursive: true });

// Free skills: new ones live in skills/, scout is an OpenClaw persona, the MCP server is documented by its README.
const freeSkills = [
  ['skills/cold-email-fundamentals', 'cold-email-fundamentals'],
  ['skills/hemingway-tonality', 'hemingway-tonality'],
  ['skills/meddic-discovery-lite', 'meddic-discovery-lite'],
];
for (const [src, name] of freeSkills) cpSync(join(root, src), join(out, 'skills', name), { recursive: true });

// Scout: wrap the persona with the frontmatter plugins expect.
const scout = readFileSync(join(root, 'openclaw-skills/scout/SKILL.md'), 'utf8');
mkdirSync(join(out, 'skills', 'scout'), { recursive: true });
writeFileSync(
  join(out, 'skills', 'scout', 'SKILL.md'),
  `---\nname: scout\ndescription: Research a company or prospect and return an account brief with buyers, recent changes and timing signals. Use when the user asks to research an account, find who to contact, or asks "why now" for a prospect. Not for writing outreach copy.\nversion: 1.2.0\nlicense: MIT\nsource: https://gtm-skills.com/skills/scout\n---\n\n${scout}`,
);

const zip = join(root, 'dist', 'gtm-skills-plugin.zip');
rmSync(zip, { force: true });
execSync(`cd "${out}" && zip -qr "${zip}" .`, { stdio: 'inherit' });
console.log('built', zip);
