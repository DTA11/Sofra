# Sofra 🍲

Sedmični jelovnik iz domaće kuhinje — instalabilna web-aplikacija (PWA).
Bosanski (ijekavica) prvo, engleski kao prekidač.

**Bez računa, bez servera, bez app storea.** Svi podaci (plan, ostava, zimnica, omiljena jela) ostaju u
pregledniku na telefonu (`localStorage`). Sigurnosna kopija: *Postavke → Izvezi (JSON)* / *Uvezi*.

## Šta radi
- Sedmični plan: u postavkama „Šta kuhamo“ biraš koliko često dolaze domaća jela, tjestenina i rižoto, evropska klasika i vojnička kuhinja. Porijeklo jela (država/regija) postoji samo u podacima i nigdje se ne prikazuje.
- Klizači „Bez mesa“ (ne / bar 2 dana / bar 4 dana / uvijek — tada ni ribe) i „Zdravije“ (0–3; češće ocjene A–B, na najvišem nivou rijetko D/E i najviše 1 desert sedmično). Stari prekidač „Prednost zdravijim jelima“ se prevodi u Zdravije = 2.
- Salate kao obrok (`full: 1`, js/data/recipes-salads.js, 17 komada): planer ih koristi za ručak i laganu večeru, ne samo kao prilog.
- Pravila: npr. junetina najviše 2× sedmično, bez ponavljanja 2–3 sedmice, sezonsko povrće, planirani ostaci,
  zamjena dana jednim dodirom, porcije za broj ukućana, posni dani, „bez svinjetine“, prednost dječijim jelima
- Ostava + zimnica (tegle); plan koristi ono što imaš i ponovo koristi iste svježe namirnice kroz sedmicu
- Jedan spisak za kupovinu po odjeljcima prodavnice → WhatsApp / Viber / dijeljenje; kupljeno ide u ostavu
- Pravi PDF fajl (sedmica: plan + spisak + recepti; samo spisak; jedan recept) — preuzmi, podijeli ili otvori; štampa samo na zahtjev. PDF se pravi u pregledniku (js/pdf.js) s ugrađenim DejaVu fontovima (fonts/, licenca u fonts/LICENSE.txt)
- Zdravlje: procjena kcal, bjelančevina, masti, ugljikohidrata, vlakana i soli po porciji i na 100 g (js/data/nutrition.js + js/nutrition.js), ocjena A–E po pravilima Nutri-Score 2023, oznake (puno povrća, puno soli…), filter po ocjeni, kcal po danu u planu, opcija „Prednost zdravijim jelima“
- Filteri: kuhinja, glavni sastojak, vrsta jela, obrok, vrijeme, oprema (sač/peka, ekspres lonac, rerna, kazan, roštilj), posno, za djecu…
- Ramazanski / iftar način, praznični meniji (Bajram, iftar, Badnji dan, Božić, Nova godina)
- Način kuhanja: veliki koraci, tajmeri, ekran ostaje upaljen (Wake Lock)
- **Doručak bez kuhanja** (#/dorucci): 20 složenih doručaka od kupovnih proizvoda (js/data/recipes-combo.js, vrsta `combo`, količine po osobi); postavka „Doručak bez kuhanja radnim danom“ (pon–pet složeni, vikendom kuhani)
- Kupovni proizvodi (`prod` u ingredients.js): namazi, delikatesa, konzerve, mliječno, pekara, voće, čaj i kafa — dugotrajna zaliha u ostavi; spisak po odjeljcima prodavnice
- Omiljena jela, kratka priča svakog jela
- **Vodiči** (/vodici/ bs, /guides/ en): statične stranice s osnovama kuhanja (prvi: riža — omjer, porcije, greške); recepti s tom namirnicom linkuju vodič. Plan i teme: GUIDES.md
- **Slatko**: kolači, torte, sitni kolači, orijentalni slatkiši, preračunavanje kalupa
- **Vojnička kuhinja** (#/vojnicka): kućna mjera i dugme „Za četu“ (100 porcija) s procjenom kazana

## Struktura
```
index.html            app shell
css/app.css           stil (svijetla + tamna tema, print/PDF)
js/app.js             UI i rute (#/plan, #/recipes, #/recipe/:id, #/cook/:id, #/sweets, #/vojnicka, #/holidays, #/pantry, #/shop, #/settings)
js/planner.js         planer, zamjena dana, spisak za kupovinu, skaliranje
js/store.js           localStorage, backup/uvoz
js/i18n.js            bs / en tekstovi
js/data/ingredients.js  katalog namirnica (odjeljak, sezona, zimnica, kvarljivo)
js/data/recipes-books.js  recepti po Lakišiću i JNA recepturama (količine i vremena kao u knjizi, tekst nov)
js/data/recipes-trad.js   ostala jela (tekst i količine napisani za Sofru)
js/data/recipes-sweet.js  slatko
js/data/recipes-slo.js    slovenska kuhinja (tekst i količine napisani za Sofru)
js/data/recipes-more.js   Hrvatska, Crna Gora, Sjeverna Makedonija, Albanija i Kosovo
js/data/recipes-combo.js  složeni doručci bez kuhanja (po osobi)
js/data/index.js      izvedeni filteri (posno, bez svinjetine…), izvori, praznični meniji
sw.js                 offline keš (povećaj VERSION pri svakoj promjeni)
manifest.webmanifest  PWA manifest
```

## Deploy (GitHub + Netlify)
1. Ubaci sve fajlove u korijen repozitorija i pushaj na `main`.
2. Netlify → *Add new site → Import from Git* → odaberi repo. Build command: prazno, publish directory: `.`
3. Svaki push na `main` = automatski deploy. Nakon promjene fajlova povećaj `VERSION` u `sw.js`.

Lokalno: `python3 -m http.server` u ovom folderu → http://localhost:8000

## Dodavanje recepta
Dodaj objekat u odgovarajući fajl u `js/data/`. Sastojci koriste ID-eve iz `ingredients.js`:
`['beef', 500, 'g', { note: ['bs napomena', 'en note'], opt: 1, max: 600 }]`.
Koraci: `['bs tekst', 'en text', minuteTajmera]`. Posno / bez svinjetine / vegetarijansko se računa samo.

## Izvori i autorska prava
Vidi `SOURCES.md`.
