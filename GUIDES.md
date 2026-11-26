# Vodiči (cooking guides) — goal and plan

**Goal:** a library of cooking guides on Sofra (how to cook rice, bread, sourdough, sauces, roasting, baking techniques,
portions …). They help at home (recipes link to them) and, as real web pages, can bring visitors from search later,
if Sofra is ever opened up or monetised. Guides are written ahead and published one at a time.

## How guides are built
- Each guide is a plain static page, one per language: `vodici/<slug>/index.html` (bs, ijekavica) and
  `guides/<slug>/index.html` (en), linked with `hreflang`. Style: `css/guide.css` (same palette and fonts as the app).
- Index pages: `vodici/index.html`, `guides/index.html` — add a card for every published guide.
- Grill and zimnica guides are generated: texts in `tools/grill-guides/` and `tools/zimnica-guides/` (`bs.mjs` + `en.mjs`), run `node tools/grill-guides/build.mjs` (builds both sets and rewrites both index pages).
- `js/data/guides.js` lists guides with `date`, the ingredient ids they cover and/or recipe ids (`rec`); recipe pages show
  "📖 Vodič: …" under the ingredients when a live guide matches.
- Same rules as the app: no countries/regions, no brands, no sources; recipes linked as `/#/recipe/<id>`.
- Every guide has: short answer box first, a ratio/time table, **portions per person**, step by step,
  "when something goes wrong", storage/leftovers, links to Sofra recipes.

## Publishing one by one (to do when there are more guides)
- Write several guides ahead, each with a future `date` in `guides.js`.
- Add a small build step (Node script, Netlify build command) that copies only guides whose date has passed
  into the published site and rebuilds the index pages and a `sitemap.xml`.
- Trigger a daily rebuild: GitHub Actions `schedule` (cron) calling a Netlify build hook.
- Before opening the site to others: robots.txt, sitemap, check all links.

## Topics
| # | Guide | Status |
|---|---|---|
| 1 | Kako skuhati rižu (omjer, porcije, greške) | ✅ published 2026-11-25 |
| R1–R7 | Roštilj: izbor mesa, oblikovanje, marinade, salamurenje i sušenje, vatra i žar, dimljenje, prilozi i umaci (tools/grill-guides/, `grill: 1` u guides.js → stranica #/rostilj) | ✅ published 2026-11-26 |
| Z1–Z5 | Zimnica: tegle i sterilizacija, omjeri sirćeta/soli/šećera, kiseli kupus, čuvanje, pokvarena tegla (tools/zimnica-guides/, `zim: 1` u guides.js → stranica #/zimnica) | ✅ published 2026-11-26 |
| 2 | Mjere i porcije: koliko čega po osobi (meso, tjestenina, krompir, povrće, supa; šolja/kašika u grame) | next |
| 3 | Tjestenina: koliko vode i soli, al dente, porcije | planned |
| 4 | Krompir: kuhani, pire, pečeni, pomfrit | planned |
| 5 | Grah i mahunarke: namakanje, kuhanje, ekspres lonac | planned |
| 6 | Jaja: kuhana, na oko, kajgana, poširana | planned |
| 7 | Hljeb s kvascem (osnovni) | planned |
| 8 | Kiselo tijesto (sourdough): starter i prvi hljeb | planned |
| 9 | Jufke i pita: savijanje, pečenje, čuvanje | planned |
| 10 | Zaprška i bešamel | planned |
| 11 | Paradajz sos | planned |
| 12 | Pečenje mesa: temperature, odmor, sočno meso | planned |
| 13 | Dinstanje i gulaši: koje meso, koliko dugo | planned |
| 14 | Biskvit i tijesta za kolače | planned |
| 15 | Šerbet (agda) za orijentalne kolače | planned |
| 16 | Otapanje čokolade i glazure | planned |
| 17 | Rezanje: luk, bijeli luk, povrće | planned |
| 18 | Prženje luka, deglaziranje, začinjavanje | planned |
