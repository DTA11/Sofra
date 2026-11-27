# Sofra — plan razvoja

Redoslijed je prijedlog (stanje 27. 11. 2026, sofra-v105). Urađeno: 1 (Ne volimo), 11 (Roštilj), 12 (Zimnica), 13 (Užina), 14 (Način kuhanja), 15 (Lektura), 16 (Pretraga).

## Sljedeće (preporuka: 1 i 2 prvo)
1. ✅ **„Ne volimo“** (urađeno 26. 11. 2026, sofra-v93) — Postavke → „Ne volimo“: 22 grupe (gljive, riba, iznutrice, kupus, grah/leća/slanutak…) + bilo koja namirnica preko polja „Dodaj drugu namirnicu“ (st.dislikes, ID-jevi iz ingredients.js, DISLIKE_GROUPS). Planer (eligible), prilozi i „Prijedlog za danas“ preskaču jela koja ih trebaju (opcionalni sastojci se ne broje); recept ostaje u listi, na njemu piše „Ne volite: …“.
2. **Ocjena nakon kuhanja** — na kraju načina kuhanja 👍 / 👎. Ocjena se čuva u store-u; planer češće bira jela s 👍, a jela s 👎 ne nudi (ili rijetko). Pregled ocijenjenih u Omiljenim.
3. **„Šta mogu skuhati od ovoga?“** — odabereš 2–3 namirnice koje imaš (+ ostava), dobiješ jela sortirana po tome koliko toga fali.
4. **Procjena cijene sedmice** — okvirna cijena po namirnici (nova polja u ingredients.js), cijena jela i spiska za kupovinu; opcija „Jeftinija sedmica“ u planeru.
5. **Ideje za ostatke** — iz jučerašnjeg jela predloži nešto novo (riža → salata, meso → pita, hljeb → popara); veza s „planiranim ostacima“ u planeru.
6. **„Ekran ostaje upaljen“ na iPhoneu** — Wake Lock u Safariju ponekad ne radi („Ekran se može ugasiti“); dodati rezervno rješenje (npr. nevidljivi video u petlji) i provjeriti na iPhoneu.

## Već planirano
7. **Vodič #2 „Mjere i porcije“** — isti oblik kao vodič za rižu (kratki odgovor, tabela, porcije po osobi, koraci, greške, ostaci, linkovi na recepte), bs + en.
8. **Objavljivanje vodiča po rasporedu** — datum objave u js/data/guides.js + zakazani Netlify rebuild (build hook).
9. **Fotografije jela** — 31 od 276 gotovo (17 salata dodano 26. 11.). Promptovi: /foto-prompts/ (meni → „Foto promptovi“). Pite: jedan zatvoren komad na tanjiru, puna čaša jogurta na stolu, jedna viljuška, bez začina — tako izgledaju dobro. Kad su sve slike gotove: obrisati foto-prompts/, link u index.html, ključ photoPrompts u i18n.js i blok u netlify.toml.
10. **Opcije planera na stranici Plan** — „Šta kuhamo“, Bez mesa, Zdravije, obroci, ukućani… kao panel na Planu umjesto zasebne stranice. Vlasnik je rekao „čekaj“ — prvo pitati.

## Nove ideje
11. ✅ **Roštilj** (urađeno 26. 11. 2026, sofra-v91) — oblik B + C:
    - **7 vodiča** (/vodici/ + /guides/): izbor mesa i količine, ćevapi/pljeskavice/ražnjići (mljevenje, oblikovanje), marinade, salamurenje i sušenje, vatra i žar, dimljenje, prilozi i umaci. Tekstovi u tools/grill-guides/bs.mjs + en.mjs, stranice pravi `node tools/grill-guides/build.mjs`.
    - **14 jela sa žara + 2 umaka** (js/data/recipes-grill.js; ćevapi i pljeskavica dobili `grill: 1`), filter „🔥 Roštilj“ u Receptima i stranica #/rostilj (vodiči, jela, prilozi). Roštilj je opcionalna oprema — sve ide i u grill-tavi.
    - **„Roštilj“ u Šta kuhamo** (stil `rostilj`, zadano „rijetko“): dani s roštiljem češće vikendom i maj–septembar, zimi radnim danom rijetko; s opremom „Roštilj“ malo češće. Prilog uz roštilj: luk, kajmak i ajvar, urnebes, šopska…; riba sa žara dobija riblje priloge.

12. ✅ **Zimnica** (urađeno 26. 11. 2026, sofra-v94) — stranica #/zimnica (pločica u Receptima, link iz Ostave i s Jelovnika): kalendar po mjesecima, 10 recepata s prinosom u teglama (tegle idu pravo u Ostavu), dugme „Na spisak“, 5 vodiča (/vodici/ + /guides/): tegle i sterilizacija, omjeri, kiseli kupus, čuvanje, pokvarena tegla.
13. ✅ **Užina za ponijeti** (urađeno 26. 11. 2026, sofra-v95) — #/uzina (pločica u Receptima): 10 hladnih užina; radnim danom planer prvo pakuje jučerašnju pitu, pohovano ili pečeno meso (jelo se kuha za porciju više), postavka „Užina za ponijeti radnim danom“.
14. ✅ **Način kuhanja** (urađeno 26. 11. 2026, sofra-v96) — više tajmera odjednom (lista s korakom, +1 min), dodir bilo gdje = dalje (lijevo = nazad), glasovne komande „dalje“ / „nazad“ / „tajmer“ (Web Speech, samo gdje preglednik podržava — provjeriti na telefonu).

15. ✅ **Lektura bosanskog teksta** (urađeno 26. 11. 2026, sofra-v100–v104) — svi recepti, sastojci, UI, vodiči za roštilj, zimnicu i rižu: ijekavica, dosljedni izrazi, imena sastojaka bez zagrada, „Roštilj (po želji)“, dugi naslovi se lome u načinu kuhanja. Ocjene svih jela iste. Promjene po ukusu: LEKTURA.md — **čeka pregled izvornog govornika**. Otvoreno: praznični meniji „Slovenska nedjelja“ i „Slovenski Božić“ imaju ime države u UI (pravilo) — preimenovati?; sastojci bez količine (npr. paprika, bijeli luk, mrkva, celer u Saču) se ne računaju u nutrijente.
16. ✅ **Pretraga koja prašta** (urađeno 27. 11. 2026, sofra-v105) — js/search.js: bez kvačica (cufte → ćufte), padeži i množina (salate → salata), jedna greška po riječi kad nema tačnog pogotka (srama → sarma, s napomenom „ovo su slična“), poruka kad nema ničega; broj rezultata se sad osvježava dok kucaš. Recepti, Slatko, Ostava, „Ne volimo“.

Odbačeno (vlasnik): dijeljenje jelovnika između telefona, „Kuhaj jednom, jedi tri puta“, izvoz u kalendar.

## Pravila (podsjetnik)
Bez država/regija u UI, „Vojnička kuhinja“ (nikad JNA), bez izvora i brendova, nove namirnice u ingredients.js I nutrition.js, ćilim boje, bs (ijekavica) + en, povećati VERSION u sw.js, testirati (Node + Playwright) prije pusha.
