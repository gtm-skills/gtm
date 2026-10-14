import { AGENTS, type Agent } from '@/data/skills';

const ORDER: Agent[] = ['claude-code', 'cursor', 'codex', 'gemini-cli', 'openclaw', 'windsurf'];

export function WorksWith() {
  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-xs text-muted-foreground">Works with</p>
      <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm">
        {ORDER.map((a) => (
          <li key={a} className="font-medium text-foreground/80">{AGENTS[a].name}</li>
        ))}
        <li className="font-medium text-foreground/80">ChatGPT</li>
      </ul>
    </div>
  );
}
