// Builds the generated guides as plain static pages (same shell and css/guide.css as the rice guide):
//   Roštilj (tools/grill-guides/bs.mjs + en.mjs) and Zimnica (tools/zimnica-guides/bs.mjs + en.mjs)
//   vodici/<slug>/index.html (bs) · guides/<slug>/index.html (en), paired by position in bs.mjs / en.mjs
//   vodici/index.html · guides/index.html — index pages with the basics (rice), the grill and the zimnica guides
// Run from the repo root after editing the texts:  node tools/grill-guides/build.mjs
// The app side (links on recipe pages, the #/rostilj and #/zimnica pages) is in js/data/guides.js.
import { writeFileSync, mkdirSync } from 'node:fs';
import { BS } from './bs.mjs';
import { EN } from './en.mjs';
import { BS as ZBS } from '../zimnica-guides/bs.mjs';
import { EN as ZEN } from '../zimnica-guides/en.mjs';

const SITE = 'https://moja-sofra.netlify.app';
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const BASICS = {
  bs: [['/vodici/kako-skuhati-rizu/', 'Kako skuhati rižu da bude rastresita', 'Omjer vode, koliko riže po osobi, vremena kuhanja i česte greške.']],
  en: [['/guides/how-to-cook-rice/', 'How to cook rice so it comes out fluffy', 'Water ratio, rice per person, cooking times and common mistakes.']],
};
// a guide set: its texts per language, the section icon and the app page it links back to
const SETS = [
  { bs: BS, en: EN, icon: '🔥', title: (L) => L.grill, lede: (L) => L.grillLede, eyebrow: (L) => L.eyebrow, more: (L) => L.more, app: '/#/rostilj' },
  { bs: ZBS, en: ZEN, icon: '🫙', title: (L) => L.section, lede: (L) => L.sectionLede, eyebrow: (L) => L.eyebrow, more: (L) => L.more, app: '/#/zimnica' },
];
for (const x of SETS) if (x.bs.guides.length !== x.en.guides.length) throw new Error('bs and en guide lists differ in length');

const head = (L, title, desc, path, otherPath) => `<!doctype html>
<html lang="${L.lang}" translate="no">
<head>
  <meta charset="utf-8">
  <meta name="google" content="notranslate">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}">
  <link rel="canonical" href="${SITE}${path}">
  <link rel="alternate" hreflang="${L.lang}" href="${SITE}${path}">
  <link rel="alternate" hreflang="${L.lang === 'bs' ? 'en' : 'bs'}" href="${SITE}${otherPath}">
  <meta name="theme-color" content="#8c1c13">
  <link rel="icon" href="/icons/icon.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,700&family=Figtree:wght@400;600;700&display=swap">
  <link rel="stylesheet" href="/css/guide.css">
</head>
<body>`;
const top = (L, otherPath, withIndex = true) => `
  <header class="g-top"><div class="g-top-in">
    <a class="g-brand" href="/"><img src="/icons/icon.svg" alt="" width="30" height="30">Sofra</a>
    <nav>${withIndex ? `<a href="/${L.dir}/">${L.guidesNav}</a>` : ''}<a href="/#/recipes">${L.recipes}</a><a class="lang" href="${otherPath}" hreflang="${L.lang === 'bs' ? 'en' : 'bs'}">${L.lang === 'bs' ? 'EN' : 'BS'}</a></nav>
  </div></header>
  <div class="kilim"></div>`;

// L, O = shell texts (grill bs/en: nav, index); G, GO = the guide set in this / the other language
function guidePage(L, O, set, i) {
  const G = set[L.lang], GO = set[O.lang];
  const g = G.guides[i], path = `/${L.dir}/${g.slug}/`, otherPath = `/${O.dir}/${GO.guides[i].slug}/`;
  const more = G.guides.filter((x) => x !== g).map((x) => `<li><a href="/${L.dir}/${x.slug}/">${esc(x.title)}</a></li>`).join('');
  return `${head(L, g.metaTitle, g.desc, path, otherPath)}${top(L, otherPath)}
  <main>
    <article>
      <p class="eyebrow">${set.eyebrow(G)}</p>
      <h1>${esc(g.title)}</h1>
      <p class="lede">${esc(g.lede)}</p>
${g.body}

      <h2>${set.more(G)}</h2>
      <ul class="related">${more}<li><a href="${set.app}">${set.icon} ${set.title(G).replace(/ \(.*\)$/, '')} · Sofra</a></li></ul>

      <p class="g-foot">Sofra · <a href="/${L.dir}/">${L.all}</a> · <a href="/">${L.menu}</a></p>
    </article>
  </main>
</body>
</html>
`;
}

function indexPage(L, O) {
  const cards = (list) => list.map(([href, title, sub]) => `      <li><a href="${href}"><b>${esc(title)}</b><span>${esc(sub)}</span></a></li>`).join('\n');
  const sections = SETS.map((set) => { const G = set[L.lang]; return `
    <h2>${set.icon} ${set.title(G)}</h2>
    <p>${set.lede(G)}</p>
    <ul class="cards">
${cards(G.guides.map((g) => [`/${L.dir}/${g.slug}/`, g.title, g.card]))}
    </ul>`; }).join('');
  return `${head(L, `${L.indexTitle} | Sofra`, L.indexLede, `/${L.dir}/`, `/${O.dir}/`)}${top(L, `/${O.dir}/`, false)}
  <main>
    <p class="eyebrow">Sofra</p>
    <h1>${L.indexTitle}</h1>
    <p class="lede">${L.indexLede}</p>
    <h2>${L.basics}</h2>
    <ul class="cards">
${cards(BASICS[L.lang])}
    </ul>${sections}
    <p class="g-foot">Sofra · <a href="/">${L.menu}</a></p>
  </main>
</body>
</html>
`;
}

let count = 0;
for (const [L, O] of [[BS, EN], [EN, BS]]) {
  for (const set of SETS) {
    set[L.lang].guides.forEach((g, i) => {
      mkdirSync(`${L.dir}/${g.slug}`, { recursive: true });
      writeFileSync(`${L.dir}/${g.slug}/index.html`, guidePage(L, O, set, i));
      count++;
    });
  }
  writeFileSync(`${L.dir}/index.html`, indexPage(L, O));
}
console.log(`${count} guide pages (${SETS.map((x) => x.bs.guides.length).join(' + ')} × 2 languages) + 2 index pages written`);
