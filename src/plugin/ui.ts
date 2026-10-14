/**
 * Inline cards for the ChatGPT plugin (MCP Apps spec). Constraints: no custom
 * fonts, no gradients/backgrounds, fits a mobile viewport, no internal scroll,
 * at most two primary actions. Styling uses host CSS variables where available.
 */

const base = `
<style>
  :root { color-scheme: light dark; }
  * { box-sizing: border-box; margin: 0; }
  body { font: 14px/1.45 system-ui, -apple-system, sans-serif; color: var(--color-text-primary, inherit); padding: 4px 2px; }
  .card { border: 1px solid var(--color-border-primary, rgba(128,128,128,.3)); border-radius: 12px; padding: 14px 16px; }
  .eyebrow { font-size: 11px; letter-spacing: .06em; text-transform: uppercase; opacity: .6; margin-bottom: 4px; }
  h1 { font-size: 16px; font-weight: 600; margin-bottom: 10px; }
  h2 { font-size: 12px; font-weight: 600; opacity: .7; margin: 12px 0 6px; text-transform: uppercase; letter-spacing: .04em; }
  ul { padding-left: 18px; } li { margin: 3px 0; }
  .row { display: flex; gap: 10px; align-items: baseline; padding: 6px 0; border-top: 1px solid var(--color-border-primary, rgba(128,128,128,.2)); }
  .row:first-of-type { border-top: 0; }
  .k { width: 28px; font-weight: 700; opacity: .7; }
  .n { flex: 1; }
  .s { width: 26px; height: 26px; border-radius: 6px; display: grid; place-items: center; font-weight: 700; font-size: 12px; }
  .s0 { background: rgba(224,86,76,.18); } .s1 { background: rgba(230,170,40,.2); } .s2 { background: rgba(30,168,114,.22); }
  .ev { font-size: 12px; opacity: .75; flex-basis: 100%; margin-left: 38px; }
  .foot { display: flex; justify-content: space-between; align-items: center; margin-top: 12px; font-size: 12px; opacity: .75; }
  .total { font-size: 22px; font-weight: 700; }
  .pill { display: inline-block; padding: 2px 8px; border-radius: 999px; border: 1px solid currentColor; font-size: 11px; }
  .actions { display: flex; gap: 8px; margin-top: 12px; }
  button { font: inherit; padding: 8px 12px; border-radius: 8px; border: 1px solid var(--color-border-primary, rgba(128,128,128,.4)); background: transparent; color: inherit; cursor: pointer; }
  button.primary { background: var(--color-text-primary, #111); color: var(--color-background-primary, #fff); border-color: transparent; }
  table { width: 100%; border-collapse: collapse; font-size: 13px; }
  td, th { text-align: left; padding: 6px 4px; border-top: 1px solid var(--color-border-primary, rgba(128,128,128,.2)); vertical-align: top; }
  th { font-size: 11px; text-transform: uppercase; letter-spacing: .04em; opacity: .6; border-top: 0; }
  .lock { font-size: 12px; opacity: .7; margin-top: 10px; }
</style>
<script>
  const $ = (s) => document.querySelector(s);
  const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const out = () => (window.openai && window.openai.toolOutput) || {};
  function followUp(text) { try { window.openai.sendFollowUpMessage({ prompt: text }); } catch (e) {} }
  function open(url) { try { window.openai.openExternal({ href: url }); } catch (e) { window.open(url, '_blank'); } }
</script>`;

export const BRIEF_HTML = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">${base}</head>
<body><div class="card" id="c"></div>
<script>
(function(){ const d = out(); const b = d.brief || {};
  const li = (a) => (a||[]).map(x => '<li>' + esc(x) + '</li>').join('');
  $('#c').innerHTML =
    '<div class="eyebrow">Call prep · ' + esc(b.company || '') + '</div>' +
    '<h1>' + esc(b.person || b.company || 'Brief') + (b.role ? ' <span style="opacity:.6;font-weight:400">· ' + esc(b.role) + '</span>' : '') + '</h1>' +
    (b.signal ? '<div><span class="pill">Why now</span> ' + esc(b.signal) + '</div>' : '') +
    '<h2>Hypotheses</h2><ul>' + li(b.hypotheses) + '</ul>' +
    '<h2>Questions</h2><ul>' + li(b.questions) + '</ul>' +
    (b.objections && b.objections.length ? '<h2>Likely objections</h2><ul>' + li(b.objections) + '</ul>' : '') +
    (b.goal ? '<div class="foot"><span>Success = ' + esc(b.goal) + '</span></div>' : '') +
    '<div class="actions"><button class="primary" onclick="followUp(\\'Turn this brief into a one-page call script I can read from.\\')">Make a script</button>' +
    '<button onclick="followUp(\\'Write the follow-up email template for after this call.\\')">Draft follow-up</button></div>' +
    (d.premium === false ? '<div class="lock">Free brief. Pro adds the account research pass and 40 signal angles.</div>' : '');
})();
</script></body></html>`;

export const SCORECARD_HTML = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">${base}</head>
<body><div class="card" id="c"></div>
<script>
(function(){ const d = out(); const s = d.scorecard || {}; const el = s.elements || [];
  const rows = el.map(e => '<div class="row"><span class="k">' + esc(e.key) + '</span><span class="n">' + esc(e.name) + '</span><span class="s s' + (e.score ?? 0) + '">' + (e.score ?? 0) + '</span>' + (e.evidence ? '<span class="ev">' + esc(e.evidence) + '</span>' : '') + '</div>').join('');
  $('#c').innerHTML =
    '<div class="eyebrow">' + esc(s.framework || 'MEDDIC') + ' debrief · ' + esc(s.account || '') + '</div>' +
    '<h1>' + esc(s.verdict || '') + '</h1>' + rows +
    '<div class="foot"><span class="total">' + esc(s.total) + '<span style="font-size:13px;opacity:.6">/' + esc(s.max || 12) + '</span></span><span>' + esc(s.advice || '') + '</span></div>' +
    (s.next && s.next.length ? '<h2>Next call</h2><ul>' + s.next.map(x => '<li>' + esc(x) + '</li>').join('') + '</ul>' : '') +
    '<div class="actions"><button class="primary" onclick="followUp(\\'Draft the follow-up email and mutual action plan from this debrief.\\')">Draft follow-up</button>' +
    '<button onclick="followUp(\\'Give me the three questions that would close the biggest gaps in this scorecard.\\')">Close the gaps</button></div>' +
    (d.premium === false ? '<div class="lock">MEDDIC lite. Pro adds Paper process, Competition, red flags and CRM fields.</div>' : '');
})();
</script></body></html>`;

export const PLAN_HTML = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">${base}</head>
<body><div class="card" id="c"></div>
<script>
(function(){ const d = out(); const p = d.plan || {}; const steps = p.steps || [];
  const rows = steps.map(s => '<tr><td>' + esc(s.step) + '</td><td>' + esc(s.owner) + '</td><td>' + esc(s.date) + '</td></tr>').join('');
  $('#c').innerHTML =
    '<div class="eyebrow">Mutual action plan · ' + esc(p.account || '') + '</div>' +
    '<h1>' + esc(p.title || 'Next steps') + '</h1>' +
    (p.goLive ? '<div><span class="pill">Go-live</span> ' + esc(p.goLive) + '</div>' : '') +
    '<table><tr><th>Step</th><th>Owner</th><th>Date</th></tr>' + rows + '</table>' +
    (p.emailSubject ? '<h2>Follow-up email</h2><div style="font-size:13px"><strong>' + esc(p.emailSubject) + '</strong><br>' + esc(p.emailPreview || '') + '</div>' : '') +
    '<div class="actions"><button class="primary" onclick="followUp(\\'Give me the full follow-up email text to send.\\')">Full email</button>' +
    '<button onclick="followUp(\\'Export this action plan as a markdown table.\\')">Export</button></div>' +
    (d.premium === false ? '<div class="lock">Pro adds the Closer Pro close plan: stakeholder gaps, risks by stage, negotiation guardrails.</div>' : '');
})();
</script></body></html>`;

export const UI_RESOURCES = {
  brief: { uri: 'ui://gtm-skills/brief.html', html: BRIEF_HTML, title: 'Call Prep Brief' },
  scorecard: { uri: 'ui://gtm-skills/scorecard.html', html: SCORECARD_HTML, title: 'Debrief Scorecard' },
  plan: { uri: 'ui://gtm-skills/plan.html', html: PLAN_HTML, title: 'Action Plan' },
} as const;

export const UI_MIME = 'text/html;profile=mcp-app';
