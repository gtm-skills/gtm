import { STATS, kits, formatPrice } from '@/data/skills';

const pro = kits.find((k) => k.id === 'pro')!;
const kit = kits.find((k) => k.kind === 'kit')!;

export const homeFaqs = [
  ['What is GTM Skills?', `Installable sales skills for AI agents. ${STATS.skills} skills across prospecting, outreach, discovery, closing and RevOps, each a folder your agent reads. Works with Claude Code, Cursor, Codex, Gemini CLI, OpenClaw and, through our plugin, ChatGPT.`],
  ['What is free?', `The open-source core, MIT licensed: ${STATS.prompts} prompts, ${STATS.freeSkills} complete skills, the MCP server with ${STATS.mcpTools} tools, 24 tonalities and the base agent personas.`],
  ['What is paid?', `Premium skill kits — the finished playbooks with references, worked examples, per-agent wiring and an eval checklist. ${formatPrice(kit.priceCents)} per kit once, or everything in the Full Bundle. Pro at ${formatPrice(pro.priceCents)}/month includes all of it plus unlimited use in ChatGPT.`],
  ['How does install work?', 'Copy one install prompt from the skill page into your agent. It fetches the files and writes them to the right folder. Premium skills need the API key from your account.'],
  ['Refunds?', '14 days, no questions asked.'],
  ['Who makes this?', 'Prospeda, a GTM team in Cincinnati that sells with these skills every week. Not affiliated with OpenAI, Anthropic, Cursor or Google.'],
] as const;

export function Faq() {
  return (
    <section className="border-t border-border">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-8">Questions people ask.</h2>
        <dl className="divide-y divide-border border-y border-border">
          {homeFaqs.map(([q, a]) => (
            <div key={q} className="py-5">
              <dt className="font-medium">{q}</dt>
              <dd className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
