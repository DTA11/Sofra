# Sofra — plan razvoja

Redoslijed je prijedlog; ništa od ovoga još nije započeto (stanje 25. 11. 2026, sofra-v67).

## Sljedeće (preporuka: 1 i 2 prvo)
1. **„Ne volimo“ lista** — u Postavkama označiš namirnice koje ne želiš (npr. gljive, džigerica, riba); planer i „Prijedlog za danas“ nikad ne biraju jela s njima. Recepti s njima ostaju vidljivi u listi, samo ih planer preskače.
2. **Ocjena nakon kuhanja** — na kraju načina kuhanja 👍 / 👎. Ocjena se čuva u store-u; planer češće bira jela s 👍, a jela s 👎 ne nudi (ili rijetko). Pregled ocijenjenih u Omiljenim.
3. **„Šta mogu skuhati od ovoga?“** — odabereš 2–3 namirnice koje imaš (+ ostava), dobiješ jela sortirana po tome koliko toga fali.
4. **Procjena cijene sedmice** — okvirna cijena po namirnici (nova polja u ingredients.js), cijena jela i spiska za kupovinu; opcija „Jeftinija sedmica“ u planeru.
5. **Ideje za ostatke** — iz jučerašnjeg jela predloži nešto novo (riža → salata, meso → pita, hljeb → popara); veza s „planiranim ostacima“ u planeru.
6. **„Ekran ostaje upaljen“ na iPhoneu** — Wake Lock u Safariju ponekad ne radi („Ekran se može ugasiti“); dodati rezervno rješenje (npr. nevidljivi video u petlji) i provjeriti na iPhoneu.

## Već planirano
7. **Vodič #2 „Mjere i porcije“** — isti oblik kao vodič za rižu (kratki odgovor, tabela, porcije po osobi, koraci, greške, ostaci, linkovi na recepte), bs + en.
8. **Objavljivanje vodiča po rasporedu** — datum objave u js/data/guides.js + zakazani Netlify rebuild (build hook).
9. **Fotografije jela** — 14 od 223 gotovo. Promptovi: /foto-prompts/ (meni → „Foto promptovi“). Pite: jedan zatvoren komad na tanjiru, puna čaša jogurta na stolu, jedna viljuška, bez začina — tako izgledaju dobro. Kad su sve slike gotove: obrisati foto-prompts/, link u index.html, ključ photoPrompts u i18n.js i blok u netlify.toml.
10. **Opcije planera na stranici Plan** — „Šta kuhamo“, Bez mesa, Zdravije, obroci, ukućani… kao panel na Planu umjesto zasebne stranice. Vlasnik je rekao „čekaj“ — prvo pitati.

## Pravila (podsjetnik)
Bez država/regija u UI, „Vojnička kuhinja“ (nikad JNA), bez izvora i brendova, nove namirnice u ingredients.js I nutrition.js, ćilim boje, bs (ijekavica) + en, povećati VERSION u sw.js, testirati (Node + Playwright) prije pusha.
