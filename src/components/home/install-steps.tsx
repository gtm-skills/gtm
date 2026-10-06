const steps = [
  { title: 'Pick a skill', body: 'Read what it produces, who it fits, and the SKILL.md before you install anything.' },
  { title: 'Copy the install prompt', body: 'One paragraph, specific to your agent. Paste it into Claude Code, Cursor, Codex or Gemini CLI.' },
  { title: 'Your agent does the rest', body: 'It fetches the files, writes them to the right folder, and confirms the skill loaded.' },
];

export function InstallSteps() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-10">Agent-first install.</h2>
      <ol className="grid md:grid-cols-3 gap-6">
        {steps.map((s, i) => (
          <li key={s.title} className="rounded-xl border border-border bg-card p-6">
            <div className="text-sm text-muted-foreground tabular-nums mb-3">{i + 1}</div>
            <h3 className="font-medium text-lg">{s.title}</h3>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{s.body}</p>
          </li>
        ))}
      </ol>
      <p className="text-sm text-muted-foreground mt-6">In ChatGPT there is nothing to install: add the GTM Skills plugin and the call loop runs in the conversation.</p>
    </section>
  );
}
