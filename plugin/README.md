# GTM Skills — ChatGPT plugin package

Built by `node scripts/build-plugin.mjs` → `dist/gtm-skills-plugin.zip`.

Contents:
- `plugin.json` — manifest (OpenAI interface settings under `extensions.com.openai.interface`)
- `mcp.json` — Streamable HTTP MCP server at https://gtm-skills.com/api/mcp (auth optional; free tools work anonymously, OAuth via Supabase Auth unlocks plans)
- `skills/` — the five free skills, copied from the repo at build time so the plugin is useful even without the server
- `assets/` — logo, composer icon, screenshots (capture from the dev server before submission)

Submission checklist: see `docs/plugin-submission.md`.
