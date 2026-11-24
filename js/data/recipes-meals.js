// Breakfasts, light dinners and snacks — written fresh for Sofra, classic home amounts.
const n = (bs, en) => ({ note: [bs, en] });
const T = { b: 'trad' };

export const MEAL_RECIPES = [
  // ───────── Doručak ─────────
  {
    id: 'kajgana', cu: 'svakodnevno', type: 'breakfast', main: 'eggs', time: 10, serves: 4, kid: 1, light: 1, meal: ['breakfast', 'dinner'],
    bs: 'Kajgana s mladim lukom', en: 'Scrambled eggs with spring onion',
    ing: [['eggs', 8, 'kom'], ['spring_onion', 1, 'sop', { opt: 1 }], ['butter', 30, 'g'], ['milk', 3, 'kasika'], ['salt', null, ''], ['pepper_black', null, ''], ['bread', 4, 'kriska']],
    st: [
      ['Jaja umuti s mlijekom, solju i biberom.', 'Beat the eggs with the milk, salt and pepper.'],
      ['Na maslacu kratko propirjaj sitno isječen mladi luk.', 'Soften the chopped spring onion briefly in the butter.'],
      ['Ulij jaja i na tihoj vatri polako miješaj dok ne stegnu, ali ostanu mekana — oko 4 minute.', 'Pour in the eggs and stir gently over low heat until just set and still soft — about 4 minutes.', 4],
    ],
    story: ['Najbrži topli doručak u svakoj kući — uz svjež hljeb i šolju čaja ili kafe.', 'The quickest hot breakfast in any home — with fresh bread and a cup of tea or coffee.'],
    src: T,
  },
  {
    id: 'jaja-sudzuk', cu: 'bosanska', type: 'breakfast', main: 'eggs', time: 15, serves: 4, meal: ['breakfast', 'dinner'], light: 1,
    bs: 'Jaja na oko sa sudžukom', en: 'Fried eggs with sujuk',
    ing: [['sudzuk', 200, 'g'], ['eggs', 8, 'kom'], ['salt', null, ''], ['bread', 4, 'kom', n('somuni ili kriške hljeba', 'flatbreads or slices of bread')]],
    st: [
      ['Sudžuk isijeci na tanke kolutove i ispeci u tavi bez masnoće dok ne pusti mast, oko 3 minute.', 'Slice the sujuk thinly and fry in a dry pan until it releases its fat, about 3 minutes.', 3],
      ['Razbij jaja preko sudžuka, lagano posoli i peci poklopljeno dok bjelanjak ne stegne, 3–4 minute.', 'Crack the eggs over the sujuk, salt lightly and cook covered until the whites set, 3–4 minutes.', 4],
      ['Služi u tavi, uz topli somun.', 'Serve straight from the pan with warm bread.'],
    ],
    story: ['Bosanski nedjeljni doručak: sudžuk i jaja iz bakrene tavice, uz somun i kafu.', 'A Bosnian Sunday breakfast: sujuk and eggs from a small copper pan, with flatbread and coffee.'],
    src: T,
  },
  {
    id: 'popara', cu: 'bosanska', type: 'breakfast', main: 'cheese', time: 10, serves: 4, kid: 1, light: 1, meal: ['breakfast', 'dinner'],
    bs: 'Popara sa sirom', en: 'Popara (bread porridge with cheese)',
    ing: [['bread', 400, 'g', n('stariji, od juče', 'day-old')], ['milk', 500, 'ml', n('ili voda', 'or water')], ['butter', 40, 'g'], ['feta', 150, 'g'], ['salt', 1, 'prst']],
    st: [
      ['Hljeb isijeci na kocke.', 'Cut the bread into cubes.'],
      ['U loncu zagrij mlijeko s maslacem i prstohvatom soli dok ne proključa.', 'Bring the milk to the boil with the butter and a pinch of salt.'],
      ['Ubaci hljeb, promiješaj, skloni s vatre i ostavi poklopljeno 3 minute.', 'Add the bread, stir, take off the heat and leave covered for 3 minutes.', 3],
      ['Izmrvi sir odozgo i služi toplo.', 'Crumble the cheese over and serve warm.'],
    ],
    story: ['Jelo od jučerašnjeg hljeba koje je odgojilo generacije — nikad se ništa nije bacalo.', 'A dish of yesterday’s bread that raised generations — nothing was ever thrown away.'],
    src: T,
  },
  {
    id: 'ustipci', cu: 'svakodnevno', type: 'breakfast', main: 'dessert', time: 75, serves: 6, kid: 1,
    bs: 'Uštipci', en: 'Uštipci (fried dough puffs)',
    ing: [['flour', 500, 'g'], ['yeast', 1, 'kesica', n('suhi, 7 g', 'dried, 7 g')], ['milk', 300, 'ml', n('mlako', 'lukewarm')], ['eggs', 1, 'kom'], ['sugar', 1, 'kasicica'], ['salt', 1, 'kasicica'], ['oil', 500, 'ml', n('za prženje', 'for frying')], ['kajmak', 150, 'g', { opt: 1 }], ['pekmez', 200, 'g', { opt: 1 }]],
    st: [
      ['Kvasac razmuti u mlakom mlijeku sa šećerom i ostavi 10 minuta da se zapjeni.', 'Dissolve the yeast in the warm milk with the sugar and leave for 10 minutes to foam.', 10],
      ['Dodaj jaje, so i brašno i umuti mekano, ljepljivo tijesto. Pokrij i ostavi da naraste 45 minuta.', 'Add the egg, salt and flour and beat into a soft, sticky dough. Cover and leave to rise for 45 minutes.', 45],
      ['Kašikom umočenom u ulje vadi komade tijesta i prži u vrelom ulju dok ne porumene sa svih strana.', 'Scoop pieces of dough with an oiled spoon and fry in hot oil until golden all over.'],
      ['Služi tople s kajmakom i sirom ili s pekmezom.', 'Serve warm with kajmak and cheese, or with plum butter.'],
    ],
    story: ['Vikend-doručak koji miriše cijela zgrada. Slani s kajmakom, slatki s pekmezom — svako ima svoju stranu stola.', 'A weekend breakfast the whole building can smell. Savoury with kajmak, sweet with plum butter — everyone has their side of the table.'],
    src: T,
  },
  {
    id: 'pura-kiselo', cu: 'bosanska', type: 'breakfast', main: 'veg', time: 25, serves: 4, kid: 1, light: 1, meal: ['breakfast', 'dinner'],
    bs: 'Pura s kiselim mlijekom', en: 'Pura (polenta) with yoghurt',
    ing: [['cornmeal', 250, 'g'], ['salt', 1, 'kasicica'], ['butter', 40, 'g'], ['feta', 100, 'g', { opt: 1 }], ['yogurt', 1, 'l', n('kiselo mlijeko', 'plain yoghurt / kefir')]],
    st: [
      ['U 1 l slane kipuće vode postepeno sipaj kukuruzno brašno, stalno miješajući.', 'Pour the cornmeal gradually into 1 l of boiling salted water, stirring all the time.'],
      ['Kuhaj na tihoj vatri 20 minuta, povremeno miješajući drvenom kašikom.', 'Cook over low heat for 20 minutes, stirring now and then with a wooden spoon.', 20],
      ['Umiješaj maslac (i sir po želji) i služi uz hladno kiselo mlijeko.', 'Stir in the butter (and cheese if you like) and serve with cold yoghurt.'],
    ],
    story: ['Pura, palenta, kačamak — isto jelo pod mnogo imena. U bosanskim selima jela se ujutro i navečer, uvijek uz kiselo mlijeko.', 'Pura, polenta, kačamak — one dish, many names. In Bosnian villages it was eaten morning and evening, always with yoghurt.'],
    src: T,
  },
  {
    id: 'cicvara', cu: 'bosanska', type: 'breakfast', main: 'cheese', time: 20, serves: 4,
    bs: 'Cicvara', en: 'Cicvara (cheese and cornmeal)',
    ing: [['kajmak', 200, 'g', n('mladi kajmak', 'young kajmak')], ['cottage', 200, 'g'], ['cornmeal', 4, 'kasika'], ['butter', 30, 'g'], ['salt', 1, 'prst'], ['bread', 4, 'kriska']],
    st: [
      ['U šerpi na tihoj vatri otopi maslac, kajmak i sir, miješajući.', 'Melt the butter, kajmak and cheese in a pan over low heat, stirring.'],
      ['Kad sir pusti masnoću, postepeno umiješaj kukuruzno brašno.', 'When the cheese releases its fat, stir in the cornmeal little by little.'],
      ['Miješaj 10 minuta dok se masa ne počne odvajati od posude i dok masnoća ne izađe na površinu.', 'Keep stirring for 10 minutes until the mixture pulls away from the pan and the fat rises to the top.', 10],
      ['Služi vruće, uz hljeb ili kiselo mlijeko.', 'Serve hot with bread or yoghurt.'],
    ],
    story: ['Planinsko jelo pastira — malo sastojaka, puno snage za cijeli dan.', 'A shepherds’ mountain dish — few ingredients, energy for the whole day.'],
    src: T,
  },
  {
    id: 'zobena-kasa', cu: 'svakodnevno', type: 'breakfast', main: 'veg', time: 10, serves: 4, kid: 1, light: 1,
    bs: 'Zobena kaša s jabukom i orasima', en: 'Porridge with apple and walnuts',
    ing: [['oats', 200, 'g'], ['milk', 800, 'ml'], ['apple', 2, 'kom'], ['walnuts', 60, 'g'], ['honey', 3, 'kasika'], ['cinnamon', 1, 'prst']],
    st: [
      ['Pahuljice kuhaj u mlijeku na tihoj vatri 5 minuta, miješajući.', 'Simmer the oats in the milk for 5 minutes, stirring.', 5],
      ['Dodaj izrendanu jabuku i cimet i kuhaj još 2 minute.', 'Add the grated apple and cinnamon and cook 2 more minutes.', 2],
      ['Razlij u zdjelice, pospi orasima i prelij medom.', 'Spoon into bowls, scatter with walnuts and drizzle with honey.'],
    ],
    story: ['Moderni klasik koji se lijepo slaže s domaćim — jabuke iz podruma, orasi s tavana.', 'A modern classic that fits right in at home — apples from the cellar, walnuts from the attic.'],
    src: T,
  },
  {
    id: 'hljeb-kajmak-ajvar', cu: 'srpska', type: 'breakfast', main: 'veg', time: 5, serves: 4, light: 1, meal: ['breakfast', 'dinner'],
    bs: 'Hljeb s kajmakom i ajvarom', en: 'Bread with kajmak and ajvar',
    ing: [['bread', 8, 'kriska'], ['kajmak', 150, 'g'], ['ajvar', 200, 'g'], ['feta', 100, 'g', { opt: 1 }], ['tomato', 2, 'kom', { opt: 1 }]],
    st: [
      ['Kriške hljeba lagano prepeci ili ugrij.', 'Lightly toast or warm the slices of bread.'],
      ['Namaži kajmak, odozgo ajvar, po želji izmrvi sir i dodaj kriške paradajza.', 'Spread with kajmak, then ajvar; crumble over cheese and add tomato slices if you like.'],
    ],
    story: ['Dokaz da je zimnica najbolji doručak: tegla ajvara i malo kajmaka — i dan je počeo kako treba.', 'Proof that preserves make the best breakfast: a jar of ajvar and a little kajmak — and the day starts right.'],
    src: T,
  },
  {
    id: 'griz-mlijeko', cu: 'svakodnevno', type: 'breakfast', main: 'dessert', time: 15, serves: 4, kid: 1, light: 1,
    bs: 'Griz na mlijeku', en: 'Semolina pudding',
    ing: [['semolina', 120, 'g'], ['milk', 1, 'l'], ['sugar', 80, 'g'], ['butter', 20, 'g'], ['cocoa', 2, 'kasika', { opt: 1 }], ['salt', 1, 'prst']],
    st: [
      ['Mlijeko sa šećerom i prstohvatom soli zagrij do vrenja.', 'Bring the milk to the boil with the sugar and a pinch of salt.'],
      ['Sipaj griz u tankom mlazu, stalno miješajući, i kuhaj 5 minuta dok se ne zgusne.', 'Pour in the semolina in a thin stream, stirring, and cook for 5 minutes until thick.', 5],
      ['Umiješaj maslac. Služi posuto kakaom ili s malo džema.', 'Stir in the butter. Serve dusted with cocoa or with a little jam.'],
    ],
    story: ['Doručak iz djetinjstva — i iz vojske, gdje je griz s kakaom bio rijetka radost.', 'A childhood breakfast — and an army one, where semolina with cocoa was a rare treat.'],
    src: T,
  },
  {
    id: 'pain-perdu', cu: 'french', type: 'breakfast', main: 'dessert', time: 15, serves: 4, kid: 1,
    bs: 'Pain perdu (prženi hljeb u jajima)', en: 'Pain perdu (French toast)',
    ing: [['bread', 8, 'kriska', n('stariji', 'day-old')], ['eggs', 3, 'kom'], ['milk', 250, 'ml'], ['sugar', 2, 'kasika'], ['vanilla_sugar', 1, 'kesica'], ['butter', 40, 'g'], ['pekmez', 150, 'g', n('ili džem', 'or jam')]],
    st: [
      ['Umuti jaja, mlijeko, šećer i vanilin šećer.', 'Whisk the eggs, milk, sugar and vanilla sugar.'],
      ['Kriške hljeba kratko umači s obje strane.', 'Dip the slices briefly on both sides.'],
      ['Peci na maslacu 2 minute sa svake strane dok ne porumene. Služi s pekmezom.', 'Fry in butter for 2 minutes per side until golden. Serve with plum butter.', 4],
    ],
    story: ['„Izgubljeni hljeb“ — Francuzi su, kao i naše bake, znali spasiti jučerašnji hljeb.', '“Lost bread” — the French, like our grandmothers, knew how to save yesterday’s loaf.'],
    src: T,
  },
  {
    id: 'frittata', cu: 'italian', type: 'breakfast', main: 'eggs', time: 20, serves: 4, kid: 1, light: 1, meal: ['breakfast', 'dinner'],
    bs: 'Frittata s tikvicama', en: 'Courgette frittata',
    ing: [['eggs', 8, 'kom'], ['zucchini', 2, 'kom'], ['onion', 1, 'glavica'], ['parmesan', 40, 'g'], ['olive_oil', 2, 'kasika'], ['basil', null, ''], ['salt', null, ''], ['pepper_black', null, '']],
    st: [
      ['Na ulju ispirjaj luk i tanke kolutove tikvica 6 minuta.', 'Soften the onion and thin courgette slices in the oil for 6 minutes.', 6],
      ['Umuti jaja s parmezanom, solju i biberom i prelij povrće.', 'Beat the eggs with the parmesan, salt and pepper and pour over the vegetables.'],
      ['Peci na tihoj vatri poklopljeno 8 minuta dok ne stegne. Pospi bosiljkom.', 'Cook covered over low heat for 8 minutes until set. Scatter with basil.', 8],
    ],
    story: ['Italijanski omlet koji se ne savija — dobar topao, a još bolji hladan sutradan.', 'Italy’s open omelette — good warm, even better cold the next day.'],
    src: T,
  },
  {
    id: 'omlet-sir', cu: 'french', type: 'breakfast', main: 'eggs', time: 10, serves: 2, light: 1, meal: ['breakfast', 'dinner'],
    bs: 'Omlet sa sirom i začinskim biljem', en: 'Cheese and herb omelette',
    ing: [['eggs', 4, 'kom'], ['gruyere', 50, 'g'], ['butter', 20, 'g'], ['parsley', null, ''], ['salt', null, ''], ['pepper_black', null, '']],
    st: [
      ['Jaja umuti sa solju, biberom i sitnim peršunom.', 'Beat the eggs with salt, pepper and chopped parsley.'],
      ['Na pjenušavom maslacu ulij jaja i vilicom pomjeraj rubove ka sredini.', 'Pour into foaming butter and draw the edges to the middle with a fork.'],
      ['Dok je sredina još mekana, pospi sir, preklopi i služi — sve za oko 3 minute.', 'While the middle is still soft, add the cheese, fold and serve — about 3 minutes in all.', 3],
    ],
    story: ['Francuski kuhari kažu da se kuhar prepoznaje po omletu: blijed izvana, kremast unutra.', 'French chefs say you can judge a cook by their omelette: pale outside, creamy inside.'],
    src: T,
  },

  // ───────── Lagana večera ─────────
  {
    id: 'satras', cu: 'srpska', reg: 'vojvodina', type: 'main', main: 'veg', time: 35, serves: 4, light: 1, meal: ['lunch', 'dinner'],
    bs: 'Sataraš s jajima', en: 'Sataraš with eggs',
    ing: [['pepper', 6, 'kom'], ['tomato', 4, 'kom'], ['onion', 2, 'glavica'], ['oil', 80, 'ml'], ['eggs', 4, 'kom', { opt: 1 }], ['paprika_sweet', 1, 'kasicica'], ['salt', null, ''], ['pepper_black', null, '']],
    st: [
      ['Luk na rebarca pirjaj na ulju 5 minuta, dodaj papriku na trakice i dinstaj 10 minuta.', 'Cook the sliced onion in the oil for 5 minutes, add the pepper strips and cook 10 minutes.', 15],
      ['Dodaj paradajz na kocke i alevu papriku, kuhaj 10 minuta.', 'Add the diced tomatoes and paprika and cook 10 minutes.', 10],
      ['Po želji razbij jaja odozgo i kuhaj poklopljeno dok ne stegnu. Služi s hljebom.', 'If you like, crack the eggs on top and cook covered until set. Serve with bread.', 4],
    ],
    story: ['Ljetna večera iz bašte — bez jaja je i posna.', 'A summer supper from the garden — without eggs it is fasting-friendly too.'],
    src: T,
  },
  {
    id: 'pohovane-tikvice', cu: 'svakodnevno', type: 'main', main: 'veg', time: 35, serves: 4, kid: 1, light: 1, meal: ['dinner'],
    bs: 'Pohovane tikvice s umakom od jogurta', en: 'Breaded courgettes with yoghurt dip',
    ing: [['zucchini', 3, 'kom'], ['eggs', 2, 'kom'], ['flour', 80, 'g'], ['breadcrumbs', 100, 'g'], ['oil', 200, 'ml'], ['yogurt', 250, 'g'], ['garlic', 2, 'cen'], ['dill', null, ''], ['salt', null, '']],
    st: [
      ['Tikvice isijeci na kolutove, posoli i ostavi 10 minuta pa obriši.', 'Slice the courgettes, salt and leave for 10 minutes, then pat dry.', 10],
      ['Uvaljaj u brašno, jaja pa prezle i prži na ulju 2 minute sa svake strane.', 'Coat in flour, egg and breadcrumbs and fry for 2 minutes per side.'],
      ['Jogurt izmiješaj s bijelim lukom, mirođijom i solju. Služi uz tikvice.', 'Mix the yoghurt with garlic, dill and salt. Serve with the courgettes.'],
    ],
    story: ['Kad bašta da previše tikvica, ovo je jelo koje djeca ne odbijaju.', 'When the garden gives too many courgettes, this is the one children never refuse.'],
    src: T,
  },
  {
    id: 'grah-salata', cu: 'svakodnevno', type: 'salad', main: 'beans', time: 15, serves: 4, light: 1, meal: ['dinner'],
    bs: 'Salata od graha', en: 'Bean salad',
    ing: [['beans', 250, 'g', n('kuhan ili 2 konzerve', 'cooked, or 2 tins')], ['onion', 1, 'glavica', n('crveni', 'red')], ['oil', 4, 'kasika'], ['vinegar', 2, 'kasika'], ['parsley', null, ''], ['paprika_sweet', 1, 'prst'], ['salt', null, ''], ['pepper_black', null, '']],
    st: [
      ['Kuhan grah ocijedi i ohladi.', 'Drain and cool the cooked beans.'],
      ['Dodaj luk na tanke polukrugove, ulje, sirće, so, biber i peršun.', 'Add thinly sliced onion, oil, vinegar, salt, pepper and parsley.'],
      ['Ostavi 10 minuta da se okusi prožmu, pospi alevom paprikom.', 'Leave for 10 minutes for the flavours to mingle; dust with paprika.', 10],
    ],
    story: ['Posna večera koja se pravi od graha skuhanog za ručak — pametna kuhinja.', 'A lenten supper made from beans cooked for lunch — clever cooking.'],
    src: T,
  },
  {
    id: 'tuna-salata', cu: 'svakodnevno', type: 'salad', main: 'fish', time: 25, serves: 4, light: 1, meal: ['dinner'],
    bs: 'Salata s tunjevinom i krompirom', en: 'Tuna and potato salad',
    ing: [['tuna', 2, 'kom', n('konzerve od 160 g', '160 g tins')], ['potato', 600, 'g'], ['onion', 1, 'glavica'], ['eggs', 2, 'kom'], ['olive_oil', 4, 'kasika'], ['vinegar', 1, 'kasika'], ['parsley', null, ''], ['salt', null, '']],
    st: [
      ['Krompir skuhaj u ljusci (20 min), jaja 10 minuta. Ohladi i isijeci.', 'Boil the potatoes in their skins (20 min) and the eggs for 10 minutes. Cool and slice.', 20],
      ['Dodaj ocijeđenu tunu, luk, peršun, ulje, sirće i so. Lagano izmiješaj.', 'Add the drained tuna, onion, parsley, oil, vinegar and salt. Toss gently.'],
    ],
    story: ['Brza večera iz ostave — konzerva tune uvijek spasi dan.', 'A quick supper from the cupboard — a tin of tuna always saves the day.'],
    src: T,
  },
  {
    id: 'krompir-ljuska', cu: 'bosanska', type: 'main', main: 'potato', time: 50, serves: 4, kid: 1, light: 1, meal: ['dinner'], eq: ['oven'],
    bs: 'Pečeni krompir s kiselim mlijekom', en: 'Baked potatoes with garlic yoghurt',
    ing: [['potato', 1.2, 'kg'], ['oil', 3, 'kasika'], ['salt', null, ''], ['yogurt', 500, 'g', n('kiselo mlijeko', 'plain yoghurt')], ['garlic', 2, 'cen'], ['feta', 150, 'g', { opt: 1 }]],
    st: [
      ['Krompir dobro operi, prepolovi, natrljaj uljem i solju.', 'Scrub the potatoes, halve them and rub with oil and salt.'],
      ['Peci na 200 °C oko 40 minuta dok ne bude mekan i hrskav.', 'Roast at 200 °C for about 40 minutes until soft and crisp.', 40],
      ['Služi s hladnim kiselim mlijekom s bijelim lukom i sirom.', 'Serve with cold garlic yoghurt and cheese.'],
    ],
    story: ['Skromna večera koja se jede u cijeloj Bosni — ništa više ne treba.', 'A humble supper eaten all over Bosnia — nothing else needed.'],
    src: T,
  },
  {
    id: 'tost-sir', cu: 'svakodnevno', type: 'main', main: 'cheese', time: 10, serves: 4, kid: 1, light: 1, meal: ['dinner', 'breakfast'],
    bs: 'Topli sendvič sa sirom i paradajzom', en: 'Toasted cheese and tomato sandwich',
    ing: [['bread', 8, 'kriska'], ['gruyere', 160, 'g', n('ili gauda', 'or gouda')], ['tomato', 2, 'kom'], ['butter', 30, 'g'], ['oregano', 1, 'prst']],
    st: [
      ['Na pola kriški stavi sir i kolutove paradajza, pospi origanom i pokrij drugom kriškom.', 'Top half the slices with cheese and tomato, sprinkle with oregano and cover with the other slices.'],
      ['Spolja namaži maslacem i peci u tavi 3 minute sa svake strane dok se sir ne otopi.', 'Butter the outsides and toast in a pan for 3 minutes per side until the cheese melts.', 6],
    ],
    story: ['Večera za dane kad niko nema snage kuhati — i djeca je obožavaju.', 'Supper for days when nobody has the energy to cook — and children love it.'],
    src: T,
  },
  {
    id: 'caprese', cu: 'italian', reg: 'kampanija', type: 'salad', main: 'cheese', time: 10, serves: 4, light: 1, meal: ['dinner'],
    bs: 'Caprese salata', en: 'Caprese salad',
    ing: [['tomato', 4, 'kom'], ['mozzarella', 250, 'g'], ['basil', 1, 'sop'], ['olive_oil', 4, 'kasika'], ['salt', null, ''], ['pepper_black', null, ''], ['bread', 4, 'kriska']],
    st: [
      ['Paradajz i mozzarellu isijeci na kriške i slaži naizmjenično.', 'Slice the tomatoes and mozzarella and arrange them alternately.'],
      ['Dodaj listove bosiljka, posoli, pobiberi i prelij maslinovim uljem. Služi s hljebom.', 'Add basil leaves, season and drizzle with olive oil. Serve with bread.'],
    ],
    story: ['Sa Capri — u bojama italijanske zastave. Najbolja je u avgustu, kad je paradajz najslađi.', 'From Capri — in the colours of the Italian flag. Best in August, when tomatoes are sweetest.'],
    src: T,
  },

  // ───────── Užina ─────────
  {
    id: 'jogurt-med', cu: 'svakodnevno', type: 'snack', main: 'dessert', time: 5, serves: 4, kid: 1,
    bs: 'Jogurt s medom i orasima', en: 'Yoghurt with honey and walnuts',
    ing: [['yogurt', 500, 'g'], ['honey', 4, 'kasika'], ['walnuts', 60, 'g']],
    st: [['Jogurt razlij u čaše, prelij medom i pospi grubo sjeckanim orasima.', 'Spoon the yoghurt into glasses, drizzle with honey and scatter with chopped walnuts.']],
    story: ['Užina koja se pravi za minutu, a drži do večere.', 'A snack made in a minute that keeps you going till supper.'],
    src: T,
  },
  {
    id: 'pecene-jabuke', cu: 'svakodnevno', type: 'snack', main: 'dessert', time: 35, serves: 4, kid: 1, eq: ['oven'],
    bs: 'Pečene jabuke s orasima', en: 'Baked apples with walnuts',
    ing: [['apple', 4, 'kom'], ['walnuts', 60, 'g'], ['honey', 3, 'kasika'], ['cinnamon', 1, 'kasicica'], ['butter', 20, 'g']],
    st: [
      ['Jabukama izvadi sredinu, napuni orasima izmiješanim s medom i cimetom, odozgo komadić maslaca.', 'Core the apples and fill with walnuts mixed with honey and cinnamon; top with a knob of butter.'],
      ['Peci na 180 °C 25 minuta.', 'Bake at 180 °C for 25 minutes.', 25],
    ],
    story: ['Miris jeseni i zime u kući — kao tufahije, samo jednostavnije.', 'The smell of autumn and winter at home — like tufahije, only simpler.'],
    src: T,
  },
  {
    id: 'hljeb-pekmez', cu: 'svakodnevno', type: 'snack', main: 'dessert', time: 5, serves: 4, kid: 1,
    bs: 'Hljeb s maslacem i pekmezom', en: 'Bread with butter and plum butter',
    ing: [['bread', 4, 'kriska'], ['butter', 40, 'g'], ['pekmez', 120, 'g', n('ili džem', 'or jam')]],
    st: [['Namaži kriške maslacem, pa debelo pekmezom.', 'Spread the slices with butter, then thickly with plum butter.']],
    story: ['Užina generacija — tegla pekmeza iz zimnice i kriška hljeba.', 'The snack of generations — a jar of plum butter from the preserves and a slice of bread.'],
    src: T,
  },
];
