# Sofra 🍲

Sedmični jelovnik iz domaće kuhinje — instalabilna web-aplikacija (PWA).
Bosanski (ijekavica) prvo, engleski kao prekidač.

**Bez računa, bez servera, bez app storea.** Svi podaci (plan, ostava, zimnica, omiljena jela) ostaju u
pregledniku na telefonu (`localStorage`). Sigurnosna kopija: *Postavke → Izvezi (JSON)* / *Uvezi*.

## Šta radi
- Sedmični plan: u postavkama „Šta kuhamo“ biraš koliko često dolaze domaća jela, tjestenina i rižoto, evropska klasika, vojnička kuhinja i roštilj. Porijeklo jela (država/regija) postoji samo u podacima i nigdje se ne prikazuje.
- Klizači „Bez mesa“ (ne / bar 2 dana / bar 4 dana / uvijek — tada ni ribe) i „Zdravije“ (0–3; češće ocjene A–B, na najvišem nivou rijetko D/E i najviše 1 desert sedmično). Stari prekidač „Prednost zdravijim jelima“ se prevodi u Zdravije = 2.
- **Pohovano** (js/data/recipes-meals.js): Bečka šnicla, svinjska šnicla, pileća prsa, riblji file, lignje s tartar umakom; bez mesa: patlidžan, karfiol, šampinjoni, sir (uz postojeće tikvice i popeke). Ulje „za prženje“ se u nutrijentima računa samo 15 %.
- **Uz ručak** (js/data/recipes-sides.js, pravila u planner.js `SIDES`, `groupOf`, `supaFits`): predjelo je samo **bistra supa** (`supa: 1` — pileća, goveđa, od povrća, s knedlicama od griza, vojnička pileća); **čorbe** su glavno jelo ili lagana večera. Postavka „Supa prije ručka“: nikad / ponekad (vikend, pite, pečenja, pohovano, punjena jela) / uvijek; nikad uz grah, gulaše i čorbe. **Prilog** (salata, jogurt, kiselo mlijeko, kiseli kupus, turšija, kajmak i ajvar) bira se po vrsti jela, samo u sezoni, prvo iz zimnice; ne ponavlja namirnicu iz glavnog jela (`key`). Prilozi tipa `side` se ne prikazuju u listi recepata i ne troše cijelu teglu. Ramazan zadržava čorbu za iftar.
- Salate kao obrok (`full: 1`, js/data/recipes-salads.js, 17 komada): planer ih koristi za ručak i laganu večeru, ne samo kao prilog.
- Pravila: npr. junetina najviše 2× sedmično, bez ponavljanja 2–3 sedmice, sezonsko povrće, planirani ostaci,
  zamjena dana jednim dodirom, porcije za broj ukućana, posni dani, „bez svinjetine“, prednost dječijim jelima
- Ostava + zimnica (tegle); plan koristi ono što imaš i ponovo koristi iste svježe namirnice kroz sedmicu
- Jedan spisak za kupovinu po odjeljcima prodavnice → WhatsApp / Viber / dijeljenje; kupljeno ide u ostavu
- Pravi PDF fajl (sedmica: plan + spisak + recepti; samo spisak; jedan recept) — preuzmi, podijeli ili otvori; štampa samo na zahtjev. PDF se pravi u pregledniku (js/pdf.js) s ugrađenim DejaVu fontovima (fonts/, licenca u fonts/LICENSE.txt)
- Zdravlje: procjena kcal, bjelančevina, masti, ugljikohidrata, vlakana i soli po porciji i na 100 g (js/data/nutrition.js + js/nutrition.js), ocjena A–E po pravilima Nutri-Score 2023, oznake (puno povrća, puno soli…), filter po ocjeni, kcal po danu u planu, opcija „Prednost zdravijim jelima“
- **Pretraga** (js/search.js) oprašta greške u pisanju: bez kvačica (cufte → ćufte, djuvec/duvec → đuveč), drugi padež ili množina (salate → salata, ćevape → ćevapi, salads → salad), više riječi (sve moraju postojati), a kad nema tačnog pogotka, dozvoljava jedno slovo pogrešno po riječi (srama → sarma) i piše „nema tačnog pogotka, ovo su slična“. Isto u Ostavi i u „Ne volimo“.
- Filteri: kuhinja, glavni sastojak, vrsta jela, obrok, vrijeme, oprema (sač/peka, ekspres lonac, rerna, kazan, roštilj), posno, za djecu…
- Ramazanski / iftar način, praznični meniji (Bajram, iftar, Badnji dan, Božić, Nova godina)
- **Jufke za pite** (13 pita): zadano domaće jufke — mijesi, odmara, razvlači (koraci se dodaju u recept, količine u tekstu su omjeri pa važe za svaki broj porcija); zamjena „Kupovne“ za one bez vremena. Prekidač na receptu, u načinu kuhanja (1. korak) i u postavkama; vrijedi za sve pite. Ocjena i nutrijenti se uvijek računaju po kupovnoj verziji (`ingShop`), pa se ne mijenjaju s prekidačem.
- **„Prije nego počneš“**: prozor s kratkim vodičem pri svakom otvaranju aplikacije (prvo Postavke i Ostava, onda Plan i Kupovina; urađeni koraci označeni), dok se ne označi „Ne prikazuj više“ ili dok svi koraci nisu urađeni. Postavke → „Prikaži vodič“ ga vraća. Ne otvara se u načinu kuhanja.
- Način kuhanja: veliki koraci, ekran ostaje upaljen (Wake Lock). Više tajmera odjednom (lista, najkraći prvi, svaki s korakom i prvim riječima koraka, +1 min, ✕; završeni trepću dok se ne sklone). Sljedeći korak: dodir bilo gdje na ekranu (lijeva trećina = nazad), strelice/razmak na tastaturi, i glasom gdje preglednik to podržava (🎤 u zaglavlju: „dalje“, „nazad“, „tajmer“ / „next“, „back“, „timer“).
- **Doručak bez kuhanja** (#/dorucci): 20 složenih doručaka od kupovnih proizvoda (js/data/recipes-combo.js, vrsta `combo`, količine po osobi); postavka „Doručak bez kuhanja radnim danom“ (pon–pet složeni, vikendom kuhani)
- Kupovni proizvodi (`prod` u ingredients.js): namazi, delikatesa, konzerve, mliječno, pekara, voće, čaj i kafa — dugotrajna zaliha u ostavi; spisak po odjeljcima prodavnice
- Omiljena jela, kratka priča svakog jela
- **Roštilj** (#/rostilj, js/data/recipes-grill.js): 7 vodiča (meso, oblikovanje, marinade, salamurenje, žar, dimljenje, prilozi), 16 jela sa žara (`grill: 1`) i umaci (urnebes, jogurt s bijelim lukom), filter „Roštilj“ u Receptima. U „Šta kuhamo“ klizač „Roštilj“ (stil `rostilj`): češće vikendom i ljeti. Roštilj je opcionalna oprema — sve ide i u grill-tavi.
- **Užina za ponijeti** (#/uzina, js/data/recipes-uzina.js): 10 hladnih užina za školu i posao (vrsta `snack`, `pack: 1`) od onoga što jelovnik ionako kupuje (hljeb, sir, jaja, voće, ajvar, pašteta…). Kad je uključen obrok Užina i „Užina za ponijeti radnim danom“ (`st.packSnack`, zadano da), planer pon–pet prvo pakuje jučerašnje ostatke (pita, pohovano, pečena piletina, pljeskavica… — `packLeftOk` u planner.js; jučerašnje jelo dobije porciju više po osobi, u jelovniku piše „Užina od jučer“), inače jednu od hladnih užina; vikendom bilo koju užinu. Kad se jučerašnje jelo zamijeni, ostatak-užina dobije novu užinu.
- **Zimnica** (#/zimnica, js/data/recipes-zimnica.js): kalendar (šta i kad u tegle, po mjesecima), 10 recepata (ajvar, miješana turšija, kisela paprika, pekmez od šljiva, džem od kajsija, slatko od jagoda, domaći paradajz sos, kompot od šljiva, kiseli kupus u glavicama i ribani u teglama) — vrsta `zimnica`, ne ide u planer. Svaki recept ima prinos u teglama (`serves`, `jar` = stavka zimnice u ostavi, `jarMl`, `jarG`); „Napravljeno — u ostavu“ (ili kraj načina kuhanja) dodaje tegle u Ostavu, „Na spisak“ stavlja sastojke na spisak. 5 vodiča (tegle i sterilizacija, omjeri sirćeta/soli/šećera, kiseli kupus, čuvanje, pokvarena tegla) u tools/zimnica-guides/, iste skripte kao roštilj. Na Jelovniku pod „Sada je sezona“ red „Sada je vrijeme za zimnicu“.
- **Vodiči** (/vodici/ bs, /guides/ en): statične stranice s osnovama kuhanja (prvi: riža — omjer, porcije, greške); recepti s tom namirnicom linkuju vodič. Plan i teme: GUIDES.md
- **Slatko**: kolači, torte, sitni kolači, orijentalni slatkiši, preračunavanje kalupa
- **Vojnička kuhinja** (#/vojnicka): kućna mjera i dugme „Za četu“ (100 porcija) s procjenom kazana

## Lektura
Bosanski tekst je lektorisan (26. 11. 2026, sofra-v100–v104): ijekavica, isti izrazi svuda (češanj/češnjevi, isijeci/isjeckaj, kašika/kašičica, šaka, prstohvat, luk na rebarca, tava, rerna, tečnost, preljev), jedno ime za svaku namirnicu, bez dvostrukih zagrada u sastojcima, aplikacija se obraća s „ti“. Promjene koje su stvar ukusa su u `LEKTURA.md` (staro → novo, fajl, zašto) za pregled. Opcionalna oprema na receptu: „Roštilj (po želji)“.

## Privremeno
- `/foto-prompts/` — pomoćna stranica s Gemini promptovima za fotografije jela (dugme Kopiraj). Link u hamburger meniju ("Foto promptovi"), noindex. Obrisati folder `foto-prompts/`, link u index.html, ključ photoPrompts u i18n.js i blok u netlify.toml kad su fotografije gotove.

## Slanje recepta (Pošalji)
Dugme „Pošalji“ na receptu šalje link `/r/<id>/`. Ta mala stranica ima og: oznake (ime, priča, slika 1200×630 iz `share/<id>.jpg`) da Messenger/Viber/WhatsApp pokažu sliku, pa odmah otvara `/#/recipe/<id>`.
**Nakon novog recepta ili nove fotografije** ponovo napravi stranice i slike: `python3 -m http.server 8765` pa `node tools/share-pages.mjs` (Playwright + Chrome; `PW=` i `CHROME=` za putanje), ili bez servera `ROUTE=1 LOCAL=http://sofra.test node tools/share-pages.mjs`. Recept bez stranice se i dalje otvara (preusmjerenje u netlify.toml), samo bez slike.

## Struktura
```
index.html            app shell
css/app.css           stil (svijetla + tamna tema, print/PDF)
js/app.js             UI i rute (#/plan, #/recipes, #/recipe/:id, #/cook/:id, #/sweets, #/vojnicka, #/holidays, #/pantry, #/shop, #/settings)
js/planner.js         planer, zamjena dana, spisak za kupovinu, skaliranje
js/store.js           localStorage, backup/uvoz
js/i18n.js            bs / en tekstovi
js/search.js          pretraga bez kvačica, padeža i s jednom greškom
js/data/ingredients.js  katalog namirnica (odjeljak, sezona, zimnica, kvarljivo)
js/data/recipes-books.js  recepti po Lakišiću i JNA recepturama (količine i vremena kao u knjizi, tekst nov)
js/data/recipes-trad.js   ostala jela (tekst i količine napisani za Sofru)
js/data/recipes-sweet.js  slatko
js/data/recipes-slo.js    slovenska kuhinja (tekst i količine napisani za Sofru)
js/data/recipes-more.js   Hrvatska, Crna Gora, Sjeverna Makedonija, Albanija i Kosovo
js/data/recipes-combo.js  složeni doručci bez kuhanja (po osobi)
js/data/recipes-grill.js  jela sa žara i umaci (Roštilj)
tools/grill-guides/       tekstovi vodiča za roštilj (bs, en) + build.mjs (pravi sve vodiče: roštilj + zimnica)
tools/zimnica-guides/     tekstovi vodiča za zimnicu (bs, en)
js/data/recipes-uzina.js    užina za ponijeti (hladno, za školu i posao)
js/data/recipes-zimnica.js  zimnica: recepti s prinosom u teglama + bilješke za kalendar
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
