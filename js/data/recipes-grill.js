// Roštilj: dishes off the grill (grill: 1 → planner style 'rostilj', "Roštilj" filter and page) and the
// sauces that go with them (type 'side', picked as Prilog by planner SIDES.grill).
// Every dish also works in a ridged grill pan, so the grill is optional equipment (eqOpt), not required.
// Guides: /vodici/ (meat, shaping, marinades, curing, fire, smoking, sides) — linked from js/data/guides.js.
// cu is hidden data only — names and stories never say where a dish is from.
const n = (bs, en) => ({ note: [bs, en] });
const T = { b: 'trad' };
const O = { opt: 1 };
const G = { grill: 1, eqOpt: ['grill'] };

export const GRILL_RECIPES = [
  // ───────── meso ─────────
  {
    id: 'raznjici-svinjski', cu: 'srpska', type: 'main', main: 'pork', time: 45, serves: 4, ...G,
    bs: 'Svinjski ražnjići s lukom i paprikom', en: 'Pork skewers with onion and pepper',
    ing: [['pork_neck', 800, 'g'], ['onion', 2, 'glavica'], ['pepper', 2, 'kom', n('crvena i zelena', 'red and green')], ['oil', 4, 'kasika'], ['garlic', 2, 'cen'], ['paprika_sweet', 1, 'kasicica'], ['salt', 1.5, 'kasicica'], ['pepper_black', 0.5, 'kasicica'], ['bread', 4, 'kom', n('lepinje ili somuni', 'flatbreads')]],
    st: [
      ['Vrat isijeci na kocke od 3 cm, uz masnoću — ona čuva meso sočnim. Izmiješaj s uljem, zgnječenim bijelim lukom, slatkom paprikom i biberom. Ne soli još.', 'Cut the neck into 3 cm cubes, keeping the fat on — it keeps the meat juicy. Mix with the oil, crushed garlic, sweet paprika and pepper. Do not salt yet.'],
      ['Pokrij i ostavi u frižideru bar 2 sata, najbolje preko noći. Ako koristiš drvene štapiće, potopi ih u vodu.', 'Cover and chill for at least 2 hours, ideally overnight. If you use wooden skewers, soak them in water.', 120],
      ['Na štapiće nabadaj meso naizmjenično s komadima luka i paprike, gusto ali ne nabijeno. Posoli neposredno prije pečenja.', 'Thread the meat onto the skewers, alternating with pieces of onion and pepper, close together but not packed. Salt just before grilling.'],
      ['Peci na jakom žaru 12–15 minuta, okrećući svake 3 minute, dok meso ne porumeni sa svih strana i ne bude pečeno do sredine.', 'Grill over hot coals for 12–15 minutes, turning every 3 minutes, until browned on all sides and cooked through.', 14],
      ['Ostavi ih 3 minute da odmore, pa služi s lepinjom, sirovim lukom i ajvarom.', 'Let them rest for 3 minutes, then serve with flatbread, raw onion and ajvar.', 3],
    ],
    story: ['Kocke vrata s malo masnoće, luk i paprika na štapiću — ražnjići se okreću dok se ćevapi tek slažu na žar.', 'Cubes of pork neck with a bit of fat, onion and pepper on a stick — the skewers get turned while the ćevapi are still being laid on the grill.'],
    src: T,
  },
  {
    id: 'raznjici-pileci', cu: 'svakodnevno', type: 'main', main: 'chicken', time: 40, serves: 4, kid: 1, ...G,
    bs: 'Pileći ražnjići u jogurtu', en: 'Chicken skewers in yoghurt marinade',
    ing: [['chicken_breast', 700, 'g', n('ili otkošteni batci', 'or boned thighs')], ['yogurt', 150, 'ml'], ['lemon', 0.5, 'kom'], ['garlic', 2, 'cen'], ['paprika_sweet', 1, 'kasicica'], ['oil', 2, 'kasika'], ['pepper', 2, 'kom'], ['onion', 1, 'glavica'], ['salt', 1, 'kasicica'], ['pepper_black', null, '']],
    st: [
      ['Piletinu isijeci na kocke od 3 cm. Pomiješaj jogurt, sok od pola limuna, zgnječen bijeli luk, papriku, ulje, so i biber, pa u tome uvaljaj meso.', 'Cut the chicken into 3 cm cubes. Mix the yoghurt, the juice of half a lemon, crushed garlic, paprika, oil, salt and pepper, and toss the meat in it.'],
      ['Pokrij i ostavi u frižideru 2–4 sata (ne duže od jednog dana — kiselina omekša meso previše).', 'Cover and chill for 2–4 hours (no longer than a day — the acid makes the meat mushy).', 120],
      ['Nabadaj na štapiće s komadima paprike i luka. Višak marinade obriši da ne gori.', 'Thread onto skewers with pieces of pepper and onion. Wipe off the excess marinade so it does not burn.'],
      ['Peci na srednje jakom žaru 10–12 minuta, okrećući, dok meso nije bijelo i sočno u sredini (74 °C).', 'Grill over medium-hot coals for 10–12 minutes, turning, until the meat is white and juicy in the middle (74 °C).', 11],
    ],
    story: ['Jogurt i limun omekšaju pileća prsa, pa ostanu sočna i na jakom žaru. Djeca ih jedu prva.', 'Yoghurt and lemon tenderise the chicken breast, so it stays juicy even over a hot fire. The children eat these first.'],
    src: T,
  },
  {
    id: 'vjesalica-punjena', cu: 'srpska', type: 'main', main: 'pork', time: 40, serves: 4, ...G,
    bs: 'Punjena vješalica', en: 'Stuffed pork loin steaks (vješalica)',
    ing: [['pork_loin', 800, 'g', n('4 odreska od 2 cm', '4 steaks 2 cm thick')], ['bacon', 100, 'g', n('tanke kriške', 'thin slices')], ['cheese_block', 120, 'g'], ['kajmak', 60, 'g', O], ['garlic', 1, 'cen'], ['oil', 2, 'kasika'], ['salt', 1, 'kasicica'], ['pepper_black', 0.5, 'kasicica']],
    st: [
      ['Svaki odrezak oštrim nožem zasijeci sa strane u džep, ne do kraja. Lagano ga istuci da bude ravnomjerne debljine.', 'With a sharp knife, cut a pocket into the side of each steak, not right through. Pound it lightly to an even thickness.'],
      ['U džep stavi krišku slanine, komad sira i po želji kašičicu kajmaka. Zatvori ga čačkalicom.', 'Fill each pocket with a slice of bacon, a piece of cheese and, if you like, a teaspoon of kajmak. Close with a cocktail stick.'],
      ['Meso premaži uljem s bijelim lukom, posoli i pobiberi.', 'Brush the meat with the garlic oil and season with salt and pepper.'],
      ['Peci na srednje jakom žaru po 6–7 minuta sa svake strane. Ako vani brzo tamni, prebaci ga na rub roštilja da se dopeče.', 'Grill over medium-hot coals for 6–7 minutes on each side. If it browns too fast outside, move it to the edge of the grill to finish.', 13],
      ['Ostavi 5 minuta da odmori pa izvadi čačkalice.', 'Rest for 5 minutes, then take out the sticks.', 5],
    ],
    story: ['Ime je dobila po tome što se slabina nekad sušila obješena. Na roštilju se puni slaninom i sirom.', 'Named after the loin that used to be hung up to dry. On the grill it is filled with bacon and cheese.'],
    src: T,
  },
  {
    id: 'punjena-pljeskavica', cu: 'srpska', type: 'main', main: 'beef', time: 45, serves: 4, ...G,
    bs: 'Punjena pljeskavica sa sirom i kajmakom', en: 'Pljeskavica stuffed with cheese and kajmak',
    ing: [['beef_mince', 800, 'g', n('masnije, oko 20 % masti', 'with about 20 % fat')], ['onion', 1, 'glavica'], ['garlic', 2, 'cen'], ['feta', 100, 'g'], ['kajmak', 80, 'g'], ['paprika_hot', 1, 'prst'], ['salt', 1.5, 'kasicica'], ['pepper_black', 0.5, 'kasicica'], ['bread', 4, 'kom', n('lepinje', 'flatbreads')]],
    st: [
      ['Meso izmiješaj sa sitno sjeckanim lukom, bijelim lukom, solju, biberom, ljutom paprikom i 50 ml hladne vode. Mijesi 3–4 minute dok se ne poveže.', 'Mix the mince with the finely chopped onion, garlic, salt, pepper, hot paprika and 50 ml cold water. Knead for 3–4 minutes until it binds.'],
      ['Ostavi u frižideru bar 30 minuta. Sir izmrvi i pomiješaj s kajmakom.', 'Chill for at least 30 minutes. Crumble the cheese and mix it with the kajmak.', 30],
      ['Meso podijeli na 8 dijelova i od svakog napravi tanak krug. Na 4 kruga stavi fil, ostavi 2 cm ruba, pokrij drugim krugom i dobro stisni rubove.', 'Divide the meat into 8 and press each into a thin round. Put the filling on 4 of them, leaving a 2 cm border, cover with the other rounds and press the edges well.'],
      ['Peci na jakom žaru po 5–6 minuta sa svake strane, okreni samo jednom.', 'Grill over hot coals for 5–6 minutes on each side, turning only once.', 11],
      ['Služi u lepinji sa sitnim lukom.', 'Serve in a flatbread with chopped onion.'],
    ],
    story: ['Kad se prereže, iz sredine poteče sir s kajmakom — zato je stisni dobro po rubu.', 'Cut it and the cheese and kajmak run out of the middle — that is why the edges must be pressed well.'],
    src: T,
  },
  {
    id: 'pileca-krilca-zar', cu: 'svakodnevno', type: 'main', main: 'chicken', time: 50, serves: 4, kid: 1, ...G,
    bs: 'Pileća krilca na žaru', en: 'Grilled chicken wings',
    ing: [['chicken_wings', 1200, 'g'], ['oil', 3, 'kasika'], ['honey', 1, 'kasika'], ['garlic', 3, 'cen'], ['paprika_sweet', 2, 'kasicica'], ['lemon', 0.5, 'kom'], ['salt', 1.5, 'kasicica'], ['pepper_black', 0.5, 'kasicica']],
    st: [
      ['Krilca prereži u zglobu na dva dijela, vrh odbaci ili sačuvaj za supu. Osuši ih papirnim ubrusom.', 'Cut the wings at the joint into two pieces; discard the tips or keep them for stock. Pat dry with kitchen paper.'],
      ['Pomiješaj ulje, med, zgnječen bijeli luk, papriku, sok od pola limuna, so i biber. Uvaljaj krilca i ostavi u frižideru bar 1 sat.', 'Mix the oil, honey, crushed garlic, paprika, juice of half a lemon, salt and pepper. Toss the wings and chill for at least 1 hour.', 60],
      ['Ugalj složi samo na jednu stranu roštilja. Krilca peci prvo na drugoj, hladnijoj strani, poklopljeno, 20 minuta, okrećući jednom.', 'Bank the coals on one side of the grill. Cook the wings on the other, cooler side first, lid on, for 20 minutes, turning once.', 20],
      ['Prebaci ih iznad žara i peci još 5–8 minuta, okrećući, dok koža ne postane hrskava i tamna. Med brzo zagori, zato ne odlazi od roštilja.', 'Move them over the coals and cook 5–8 minutes more, turning, until the skin is crisp and dark. Honey burns fast, so stay by the grill.', 7],
    ],
    story: ['Prvo polako sa strane, pa kratko nad žarom — tako je koža hrskava, a meso se odvaja od kosti.', 'First slowly to the side, then briefly over the coals — that is how the skin crisps and the meat falls off the bone.'],
    src: T,
  },
  {
    id: 'pileci-batci-zar', cu: 'svakodnevno', type: 'main', main: 'chicken', time: 60, serves: 4, kid: 1, ...G,
    bs: 'Pileći batci na žaru s limunom i ruzmarinom', en: 'Grilled chicken legs with lemon and rosemary',
    ing: [['chicken_legs', 1200, 'g', n('karabataci', 'whole legs or thighs')], ['lemon', 1, 'kom'], ['garlic', 4, 'cen'], ['rosemary', 1, 'kasicica'], ['olive_oil', 4, 'kasika'], ['paprika_sweet', 1, 'kasicica'], ['salt', 1.5, 'kasicica'], ['pepper_black', 0.5, 'kasicica']],
    st: [
      ['Batke zasijeci do kosti na dva-tri mjesta. Natrljaj ih solju, biberom, paprikom, zgnječenim bijelim lukom, ruzmarinom, maslinovim uljem i sokom od limuna.', 'Slash the legs to the bone in two or three places. Rub with salt, pepper, paprika, crushed garlic, rosemary, olive oil and the lemon juice.'],
      ['Ostavi u frižideru bar 2 sata. Pola sata prije pečenja izvadi ih da se zagriju na sobnu temperaturu.', 'Chill for at least 2 hours. Take them out half an hour before grilling to come to room temperature.', 120],
      ['Peci na indirektnoj toplini (ugalj na jednoj strani, meso na drugoj), poklopljeno, 35 minuta, okrećući jednom.', 'Cook over indirect heat (coals on one side, meat on the other), lid on, for 35 minutes, turning once.', 35],
      ['Prebaci kožom prema žaru i peci još 5 minuta dok ne porumeni. Gotovo je kad sok iz najdebljeg dijela izlazi bistar (74 °C).', 'Move skin-side down over the coals and cook 5 minutes more until browned. It is done when the juice from the thickest part runs clear (74 °C).', 5],
    ],
    story: ['Batak oprašta više od prsa: ako se peče polako sa strane žara, ne može se osušiti.', 'A leg forgives more than a breast: cooked slowly beside the coals, it cannot dry out.'],
    src: T,
  },
  {
    id: 'junetina-odrezak-zar', cu: 'svakodnevno', type: 'main', main: 'beef', time: 30, serves: 4, ...G,
    bs: 'Juneći odrezak na žaru s maslacem i bijelim lukom', en: 'Grilled beef steak with garlic butter',
    ing: [['beef', 800, 'g', n('ramstek ili vrat, odresci od 2–3 cm', 'sirloin or chuck, steaks 2–3 cm thick')], ['oil', 1, 'kasika'], ['butter', 40, 'g'], ['garlic', 2, 'cen'], ['parsley', null, ''], ['salt', 1.5, 'kasicica'], ['pepper_black', 1, 'kasicica']],
    st: [
      ['Meso izvadi iz frižidera 30 minuta prije pečenja. Osuši ga ubrusom, premaži tankim slojem ulja i dobro posoli.', 'Take the meat out of the fridge 30 minutes before grilling. Pat it dry, brush with a thin layer of oil and salt well.', 30],
      ['Maslac izmiješaj sa sitnim bijelim lukom i peršunom.', 'Mash the butter with finely chopped garlic and parsley.'],
      ['Peci na najjačem žaru 3–4 minute sa svake strane za srednje pečeno (57 °C u sredini), 5–6 minuta za dobro pečeno.', 'Grill over the hottest coals for 3–4 minutes a side for medium (57 °C in the middle), 5–6 minutes for well done.', 8],
      ['Stavi meso na dasku, odozgo kašiku maslaca s lukom, pobiberi i ostavi 5 minuta da odmori. Reži poprijeko na vlakna.', 'Put the steaks on a board with a spoon of the garlic butter on top, season with pepper and rest for 5 minutes. Slice across the grain.', 5],
    ],
    story: ['Najvažnije se desi kad je meso već s vatre: pet minuta odmora i sok ostane u odresku, a ne na dasci.', 'The most important part happens off the fire: five minutes of rest and the juice stays in the steak, not on the board.'],
    src: T,
  },
  {
    id: 'janjeci-kotleti-zar', cu: 'svakodnevno', type: 'main', main: 'lamb', time: 35, serves: 4, ...G,
    bs: 'Janjeći kotleti na žaru', en: 'Grilled lamb chops',
    ing: [['lamb', 1000, 'g', n('kotleti, 8–12 komada', 'chops, 8–12 pieces')], ['garlic', 3, 'cen'], ['rosemary', 1, 'kasicica'], ['olive_oil', 3, 'kasika'], ['lemon', 1, 'kom'], ['salt', 1.5, 'kasicica'], ['pepper_black', 0.5, 'kasicica']],
    st: [
      ['Kotlete natrljaj maslinovim uljem, zgnječenim bijelim lukom, ruzmarinom i biberom. Ostavi u frižideru bar 1 sat.', 'Rub the chops with olive oil, crushed garlic, rosemary and pepper. Chill for at least 1 hour.', 60],
      ['Posoli ih neposredno prije pečenja. Masni rub zasijeci na dva mjesta da se kotlet ne savija.', 'Salt just before grilling. Nick the fatty edge in two places so the chops do not curl.'],
      ['Peci na jakom žaru 3–4 minute sa svake strane. Ako mast kaplje i plamti, pomjeri ih na trenutak u stranu.', 'Grill over hot coals for 3–4 minutes on each side. If the fat drips and flares, move them aside for a moment.', 7],
      ['Ostavi 3 minute da odmore i služi s kriškama limuna.', 'Rest for 3 minutes and serve with lemon wedges.', 3],
    ],
    story: ['Malo ruzmarina, bijelog luka i limuna — janjetini ne treba više od toga.', 'A little rosemary, garlic and lemon — lamb needs nothing more.'],
    src: T,
  },
  {
    id: 'mijesano-meso', cu: 'srpska', type: 'main', main: 'beef', time: 90, serves: 6, ...G,
    bs: 'Miješano meso s roštilja', en: 'Mixed grill',
    ing: [['beef_mince', 700, 'g', n('za ćevape i pljeskavice', 'for ćevapi and patties')], ['pork_neck', 500, 'g', n('za ražnjiće', 'for skewers')], ['chicken_breast', 400, 'g'], ['sudzuk', 300, 'g'], ['onion', 3, 'glavica'], ['pepper', 2, 'kom'], ['garlic', 3, 'cen'], ['oil', 4, 'kasika'], ['paprika_sweet', 1, 'kasicica'], ['salt', 2, 'kasicica'], ['pepper_black', 1, 'kasicica'], ['bread', 6, 'kom', n('lepinje', 'flatbreads')]],
    st: [
      ['Mljeveno meso izmiješaj s dva češnja bijelog luka, kašičicom soli, biberom i 70 ml hladne vode, mijesi 5 minuta. Vrat i piletinu isijeci na kocke i pomiješaj s uljem, paprikom i jednim češnjem bijelog luka.', 'Mix the mince with two garlic cloves, a teaspoon of salt, pepper and 70 ml cold water and knead for 5 minutes. Cube the pork neck and chicken and mix with the oil, paprika and one garlic clove.'],
      ['Sve pokrij i ostavi u frižideru bar 2 sata.', 'Cover everything and chill for at least 2 hours.', 120],
      ['Od pola mljevenog mesa oblikuj ćevape, od druge polovine tanke pljeskavice. Vrat i piletinu nabadaj na štapiće s lukom i paprikom, svako na svoje. Sudžuk isijeci koso na komade.', 'Shape half the mince into ćevapi and the other half into thin patties. Thread the pork and the chicken onto separate skewers with onion and pepper. Slice the sujuk at an angle.'],
      ['Peci redom kako dugo traje: prvo ražnjiće (12–15 min), pa pljeskavice i ćevape (8–10 min), na kraju sudžuk (3–4 min). Posoli ražnjiće dok se peku.', 'Grill in order of how long they take: skewers first (12–15 min), then patties and ćevapi (8–10 min), sujuk last (3–4 min). Salt the skewers as they cook.', 25],
      ['Sve složi na veliki pladanj s lepinjama, sitnim lukom i prilozima.', 'Pile everything on a big platter with flatbreads, chopped onion and the sides.'],
    ],
    story: ['Velika tacna na sredini stola i svako uzme šta voli — za nedjelju i goste.', 'A big platter in the middle of the table and everyone takes what they like — for Sundays and guests.'],
    src: T,
  },
  // ───────── riba ─────────
  {
    id: 'riba-zar-blitva', cu: 'hrvatska', type: 'main', main: 'fish', time: 50, serves: 4, ...G,
    bs: 'Riba na žaru s blitvom i krompirom', en: 'Grilled whole fish with chard and potato',
    ing: [['fish_white', 1400, 'g', n('4 cijele ribe (orada, brancin), očišćene', '4 whole fish (bream, sea bass), gutted')], ['chard', 800, 'g'], ['potato', 600, 'g'], ['garlic', 4, 'cen'], ['olive_oil', 6, 'kasika'], ['lemon', 1, 'kom'], ['parsley', null, ''], ['salt', 2, 'kasicica'], ['pepper_black', null, '']],
    st: [
      ['Ribu operi, osuši i zasijeci koso na dva mjesta sa svake strane. Posoli je izvana i iznutra, u trbuh stavi krišku limuna i grančicu peršuna, premaži uljem.', 'Rinse and dry the fish and slash it twice on each side. Salt inside and out, put a lemon slice and a sprig of parsley in the belly and brush with oil.'],
      ['Krompir oguli, isijeci na kocke i kuhaj u slanoj vodi 10 minuta. Dodaj isjeckanu blitvu i kuhaj još 8 minuta, pa ocijedi.', 'Peel and cube the potato and boil in salted water for 10 minutes. Add the chopped chard and cook 8 minutes more, then drain.', 18],
      ['Rešetku dobro zagrij, očisti i natrljaj uljem. Ribu peci na srednjem žaru 6–8 minuta sa svake strane; okreni je tek kad se sama odvaja od rešetke.', 'Heat the grate well, clean it and rub with oil. Grill the fish over medium coals for 6–8 minutes a side; turn it only when it lets go of the grate by itself.', 14],
      ['Blitvu i krompir prelij s pola ulja i sitnim bijelim lukom, posoli i lagano izgnječi viljuškom.', 'Dress the chard and potato with half the oil and the chopped garlic, salt and crush lightly with a fork.'],
      ['Ribu služi uz blitvu, prelivenu ostatkom ulja i limunom.', 'Serve the fish with the chard, drizzled with the rest of the oil and lemon.'],
    ],
    story: ['Cijela riba, malo soli, ulje i limun. Uz nju blitva s krompirom koja upije sve što kapne s tanjira.', 'A whole fish, a little salt, oil and lemon. Beside it chard and potato that soak up everything left on the plate.'],
    src: T,
  },
  {
    id: 'skusa-zar', cu: 'svakodnevno', type: 'main', main: 'fish', time: 30, serves: 4, light: 1, ...G,
    bs: 'Skuša na žaru s bijelim lukom i peršunom', en: 'Grilled mackerel with garlic and parsley',
    ing: [['mackerel', 4, 'kom', n('očišćene', 'gutted')], ['garlic', 3, 'cen'], ['parsley', 1, 'sop'], ['olive_oil', 4, 'kasika'], ['lemon', 1, 'kom'], ['salt', 1.5, 'kasicica'], ['pepper_black', null, '']],
    st: [
      ['Skuše operi, dobro osuši i zasijeci koso tri puta sa svake strane. Posoli ih i ostavi 15 minuta.', 'Rinse the mackerel, dry well and slash three times on each side. Salt and leave for 15 minutes.', 15],
      ['Pomiješaj ulje, sitno sjeckan bijeli luk i peršun.', 'Mix the oil with the finely chopped garlic and parsley.'],
      ['Ribu premaži uljem i peci na jakom žaru 4–5 minuta sa svake strane, dok koža ne postane hrskava.', 'Brush the fish with oil and grill over hot coals for 4–5 minutes on each side, until the skin is crisp.', 9],
      ['Prelij uljem s lukom i peršunom i služi s limunom.', 'Spoon over the garlic and parsley oil and serve with lemon.'],
    ],
    story: ['Jeftina, masna i puna ukusa — skuša je riba koja se najbolje osjeća baš na žaru.', 'Cheap, oily and full of flavour — mackerel is the fish that is happiest on the grill.'],
    src: T,
  },
  {
    id: 'lignje-zar', cu: 'hrvatska', type: 'main', main: 'fish', time: 30, serves: 4, light: 1, ...G,
    bs: 'Lignje na žaru', en: 'Grilled squid',
    ing: [['squid', 1000, 'g', n('očišćene', 'cleaned')], ['garlic', 3, 'cen'], ['parsley', 1, 'sop'], ['olive_oil', 5, 'kasika'], ['lemon', 1, 'kom'], ['salt', 1, 'kasicica'], ['pepper_black', null, '']],
    st: [
      ['Lignje operi i dobro osuši. Tijela ostavi cijela, a krakove nabodi na štapić da ne propadaju kroz rešetku.', 'Rinse the squid and dry well. Leave the bodies whole and put the tentacles on a skewer so they do not fall through the grate.'],
      ['Premaži ih s 2 kašike ulja i posoli. Ostatak ulja izmiješaj sa sitnim bijelim lukom i peršunom.', 'Brush with 2 tablespoons of the oil and salt them. Mix the rest of the oil with the chopped garlic and parsley.'],
      ['Peci na najjačem žaru samo 2–3 minute sa svake strane. Duže pečenje ih učini gumenim.', 'Grill over the hottest coals for just 2–3 minutes on each side. Any longer and they turn rubbery.', 5],
      ['Isijeci na kolutove, prelij uljem s lukom i peršunom i služi s limunom.', 'Slice into rings, pour over the garlic and parsley oil and serve with lemon.'],
    ],
    story: ['Na žaru se lignje peku kraće nego što treba za sjeckanje peršuna — zato prvo pripremi preljev.', 'On the grill squid cook in less time than it takes to chop the parsley — so make the dressing first.'],
    src: T,
  },
  // ───────── povrće ─────────
  {
    id: 'povrce-zar', cu: 'svakodnevno', type: 'main', main: 'veg', time: 40, serves: 4, light: 1, ...G,
    bs: 'Povrće na žaru', en: 'Grilled vegetables',
    ing: [['eggplant', 2, 'kom'], ['zucchini', 2, 'kom'], ['pepper', 3, 'kom'], ['onion', 2, 'glavica', n('crveni', 'red')], ['mushrooms', 300, 'g'], ['olive_oil', 6, 'kasika'], ['garlic', 3, 'cen'], ['parsley', null, ''], ['vinegar', 1, 'kasika'], ['salt', 1.5, 'kasicica'], ['pepper_black', null, ''], ['bread', 4, 'kom', { opt: 1, note: ['lepinje ili hljeb', 'flatbreads or bread'] }]],
    st: [
      ['Patlidžan i tikvice isijeci po dužini na ploške od 1 cm. Patlidžan posoli i ostavi 15 minuta, pa ga obriši. Papriku očisti i razreži na četvrtine, luk na kolutove, šampinjone ostavi cijele.', 'Slice the aubergine and courgettes lengthways 1 cm thick. Salt the aubergine, leave 15 minutes, then pat dry. Seed the peppers and quarter them, slice the onion into rings, leave the mushrooms whole.', 15],
      ['Pomiješaj ulje, sitni bijeli luk, peršun, sirće, so i biber. Povrće premaži s pola preljeva.', 'Mix the oil, chopped garlic, parsley, vinegar, salt and pepper. Brush the vegetables with half of it.'],
      ['Peci na srednjem žaru: tikvice i luk 3–4 minute sa svake strane, patlidžan i paprike 5–6, šampinjone 6–8 minuta, okrećući.', 'Grill over medium coals: courgette and onion 3–4 minutes a side, aubergine and peppers 5–6, mushrooms 6–8 minutes, turning.', 15],
      ['Složi na pladanj, prelij ostatkom preljeva i ostavi 10 minuta da se okusi povežu. Dobro je toplo i hladno.', 'Arrange on a platter, pour over the rest of the dressing and leave for 10 minutes so the flavours come together. Good warm or cold.', 10],
    ],
    story: ['Ljetni tanjir bez mesa — a kad se uz njega stavi bijeli sir, niko ne pita gdje su ćevapi.', 'A meat-free summer platter — put white cheese beside it and nobody asks where the ćevapi are.'],
    src: T,
  },
  {
    id: 'punjeni-sampinjoni-zar', cu: 'svakodnevno', type: 'main', main: 'veg', time: 30, serves: 4, light: 1, kid: 1, ...G,
    bs: 'Punjeni šampinjoni na žaru', en: 'Stuffed mushrooms on the grill',
    ing: [['mushrooms', 600, 'g', n('veliki, 16–20 komada', 'large, 16–20')], ['kajmak', 100, 'g'], ['cheese_block', 100, 'g'], ['garlic', 2, 'cen'], ['parsley', null, ''], ['oil', 2, 'kasika'], ['salt', 0.5, 'kasicica'], ['pepper_black', null, '']],
    st: [
      ['Šampinjonima izvadi drške, sitno ih isjeckaj i pomiješaj s kajmakom, rendanim sirom, bijelim lukom, peršunom, solju i biberom.', 'Pull out the mushroom stalks, chop them finely and mix with the kajmak, grated cheese, garlic, parsley, salt and pepper.'],
      ['Klobuke izvana premaži uljem i napuni filom.', 'Brush the caps with oil on the outside and fill them.'],
      ['Peci ih na rešetki, filom prema gore, na srednjem žaru i poklopljeno 10–12 minuta, dok sir ne omekša a šampinjoni ne puste sok.', 'Grill them filling side up over medium coals, lid on, for 10–12 minutes, until the cheese melts and the mushrooms give up their juice.', 11],
    ],
    story: ['Mala zdjelica od šampinjona, a u njoj kajmak i sir — topi se dok se meso još peče.', 'A little mushroom bowl with kajmak and cheese inside — it melts while the meat is still on the grill.'],
    src: T,
  },

  // ───────── umaci (type 'side': hidden from the recipe list, shown on the Roštilj page, picked as Prilog) ─────────
  {
    id: 'urnebes', cu: 'srpska', type: 'side', main: 'cheese', time: 10, serves: 4, key: ['feta'], grill: 1,
    bs: 'Urnebes (ljuti namaz od sira)', en: 'Urnebes (spicy cheese spread)',
    ing: [['feta', 250, 'g'], ['kajmak', 50, 'g', O], ['garlic', 1, 'cen'], ['paprika_hot', 1, 'kasicica'], ['paprika_sweet', 1, 'kasicica'], ['oil', 2, 'kasika'], ['ajvar', 2, 'kasika', O]],
    st: [
      ['Sir izmrvi viljuškom i izmiješaj s kajmakom, zgnječenim bijelim lukom, objema paprikama i uljem dok ne bude glatko, ali ne potpuno kremasto.', 'Crumble the cheese with a fork and mix with the kajmak, crushed garlic, both paprikas and the oil until smooth but not completely creamy.'],
      ['Ako je preljuto, umiješaj dvije kašike ajvara. Ostavi u frižideru 15 minuta da se okusi povežu.', 'If it is too hot, stir in two tablespoons of ajvar. Chill for 15 minutes so the flavours come together.', 15],
    ],
    story: ['Ljut namaz od bijelog sira — ime znači „ludnica“, i tako i peče.', 'A fiery white-cheese spread — the name means “uproar”, and it burns like one.'],
    src: T,
  },
  {
    id: 'umak-jogurt-luk', cu: 'svakodnevno', type: 'side', main: 'cheese', time: 10, serves: 4, key: ['yogurt'], grill: 1, kid: 1,
    bs: 'Umak od jogurta i bijelog luka', en: 'Garlic yoghurt sauce',
    ing: [['yogurt', 400, 'ml', n('gusti', 'thick')], ['cucumber', 0.5, 'kom', O], ['garlic', 2, 'cen'], ['olive_oil', 1, 'kasika'], ['dill', null, '', O], ['salt', 0.5, 'kasicica']],
    st: [
      ['Krastavac (po želji) izrendaj, posoli i ocijedi rukama.', 'Grate the cucumber (if using), salt it and squeeze out the water by hand.'],
      ['Jogurt izmiješaj sa zgnječenim bijelim lukom, krastavcem, solju i uljem, pospi mirođijom. Služi hladno uz piletinu, ribu i povrće sa žara.', 'Mix the yoghurt with the crushed garlic, cucumber, salt and oil and scatter with dill. Serve cold with grilled chicken, fish and vegetables.'],
    ],
    story: ['Hladan, kiselkast i s bijelim lukom — gasi vatru ljutih paprika i ide uz sve sa žara.', 'Cold, tangy and garlicky — it puts out the fire of hot peppers and goes with anything off the grill.'],
    src: T,
  },
];
