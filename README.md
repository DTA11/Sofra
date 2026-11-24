# Sofra 🍲

Sedmični jelovnik iz domaće kuhinje — instalabilna web-aplikacija (PWA).
Bosanski (ijekavica) prvo, engleski kao prekidač.

**Bez računa, bez servera, bez app storea.** Svi podaci (plan, ostava, zimnica, omiljena jela) ostaju u
pregledniku na telefonu (`localStorage`). Sigurnosna kopija: *Postavke → Izvezi (JSON)* / *Uvezi*.

## Šta radi
- Sedmični plan iz odabrane mješavine kuhinja (stara bosanska, balkanska, italijanska, francuska, JNA)
- Pravila: npr. junetina najviše 2× sedmično, bez ponavljanja 2–3 sedmice, sezonsko povrće, planirani ostaci,
  zamjena dana jednim dodirom, porcije za broj ukućana, posni dani, „bez svinjetine“, prednost dječijim jelima
- Ostava + zimnica (tegle); plan koristi ono što imaš i ponovo koristi iste svježe namirnice kroz sedmicu
- Jedan spisak za kupovinu po odjeljcima prodavnice → WhatsApp / Viber / dijeljenje; kupljeno ide u ostavu
- PDF (plan + spisak + recepti) preko prozora za štampu → „Sačuvaj kao PDF“
- Filteri: kuhinja, glavni sastojak, vrsta jela, obrok, vrijeme, oprema (sač/peka, ekspres lonac, rerna, kazan, roštilj), posno, za djecu…
- Ramazanski / iftar način, praznični meniji (Bajram, iftar, Badnji dan, Božić, Nova godina)
- Način kuhanja: veliki koraci, tajmeri, ekran ostaje upaljen (Wake Lock)
- Omiljena jela, kratka priča svakog jela
- **Slatko**: kolači, torte, sitni kolači, orijentalni slatkiši, preračunavanje kalupa
- **JNA kuhinja**: kućna mjera i dugme „Za četu“ (100 porcija) s procjenom kazana

## Struktura
```
index.html            app shell
css/app.css           stil (svijetla + tamna tema, print/PDF)
js/app.js             UI i rute (#/plan, #/recipes, #/recipe/:id, #/cook/:id, #/sweets, #/jna, #/holidays, #/pantry, #/shop, #/settings)
js/planner.js         planer, zamjena dana, spisak za kupovinu, skaliranje
js/store.js           localStorage, backup/uvoz
js/i18n.js            bs / en tekstovi
js/data/ingredients.js  katalog namirnica (odjeljak, sezona, zimnica, kvarljivo)
js/data/recipes-books.js  recepti po Lakišiću i JNA recepturama (količine i vremena kao u knjizi, tekst nov)
js/data/recipes-trad.js   ostala jela (tekst i količine napisani za Sofru)
js/data/recipes-sweet.js  slatko
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
