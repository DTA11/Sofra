// Builds the link previews for "Pošalji" on a recipe:
//   r/<id>/index.html  – tiny page with og: tags (name, story, picture) that sends the visitor on to /#/recipe/<id>
//   share/<id>.jpg     – 1200×630 preview picture: the dish photo if there is one, otherwise the dish illustration
//   share/sofra.jpg    – preview picture for the app itself (index.html)
// Chat apps (Messenger, Viber, WhatsApp) read og: tags but never the part after #, so every recipe needs its own page.
//
// Run after adding or renaming recipes or adding photos, from the repo root:
//   python3 -m http.server 8765 &   then   node tools/share-pages.mjs
// Needs Playwright + Chrome (PW = path to the playwright module, CHROME = path to Chrome, both optional).
import { writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';

const SITE = 'https://moja-sofra.netlify.app';
const LOCAL = process.env.LOCAL || 'http://localhost:8765';
const { chromium } = await import(process.env.PW || 'playwright');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const b = await chromium.launch(process.env.CHROME ? { executablePath: process.env.CHROME } : {});
const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
await p.goto(LOCAL + '/tools/blank.html');
const list = await p.evaluate(async () => {
  const { RECIPES } = await import('/js/data/index.js');
  return RECIPES.map((r) => ({ id: r.id, bs: r.bs, story: Array.isArray(r.story) ? r.story[0] : '' }));
});

const card = (id, title) => `
  const { RECIPES } = await import('/js/data/index.js');
  const { dishArt, KILIM } = await import('/js/art.js');
  const r = RECIPES.find((x) => x.id === ${JSON.stringify(id)});
  document.body.innerHTML = \`<div class="pic">\${r ? dishArt(r, 'big') : '<img class="art photo" src="/icons/icon-512.png" style="object-fit:contain;padding:90px 0;box-sizing:border-box">'}</div>
    <div class="band">\${KILIM}<div class="name">${esc(title)}</div><div class="brand">Sofra</div></div>\`;
  const svg = document.querySelector('.pic svg'); if (svg) svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
  await Promise.all([...document.images].map((i) => i.decode().catch(() => {})));
  await document.fonts.ready;`;

mkdirSync('share', { recursive: true });
if (existsSync('r')) rmSync('r', { recursive: true });
for (const r of [...list, { id: 'sofra', bs: 'Sofra — sedmični jelovnik', app: 1 }]) {
  await p.evaluate(`(async () => { ${card(r.app ? '' : r.id, r.bs)} })()`);
  await p.screenshot({ path: `share/${r.id}.jpg`, type: 'jpeg', quality: 78 });
  if (r.app) continue;
  const url = `${SITE}/r/${r.id}/`, go = `/#/recipe/${r.id}`;
  mkdirSync(`r/${r.id}`, { recursive: true });
  writeFileSync(`r/${r.id}/index.html`, `<!DOCTYPE html>
<html lang="bs"><head><meta charset="utf-8">
<title>${esc(r.bs)} — Sofra</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="${esc(r.story)}">
<meta property="og:type" content="article"><meta property="og:site_name" content="Sofra">
<meta property="og:title" content="${esc(r.bs)}"><meta property="og:description" content="${esc(r.story)}">
<meta property="og:image" content="${SITE}/share/${r.id}.jpg"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta property="og:url" content="${url}"><meta name="twitter:card" content="summary_large_image">
<script>location.replace(${JSON.stringify(go)});</script>
</head><body><a href="${go}">${esc(r.bs)}</a></body></html>
`);
}
await b.close();
console.log(`${list.length} recipe pages + previews written`);
