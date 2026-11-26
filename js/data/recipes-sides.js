// Things that go WITH lunch: clear soups (supa = the only starter the planner adds), simple side salads
// and plain accompaniments (type 'side': a glass of yoghurt, sauerkraut, turšija…).
// Čorbe are not starters: they count as a main or a light main (planner.js).
// key = ingredients that make the side; it is skipped when the main dish already has them.
// cu is hidden data only — names and stories never say where a dish is from.
const n = (bs, en) => ({ note: [bs, en] });
const T = { b: 'trad' };
const O = { opt: 1 };

export const SIDE_RECIPES = [
  // ───────── supe (clear soups) ─────────
  {
    id: 'pileca-supa-rezanci', cu: 'svakodnevno', type: 'soup', supa: 1, main: 'chicken', time: 75, serves: 4, kid: 1,
    bs: 'Pileća supa s rezancima', en: 'Chicken noodle soup',
    ing: [['chicken_legs', 600, 'g'], ['root_mix', 300, 'g'], ['onion', 1, 'glavica'], ['soup_pasta', 100, 'g', n('tanki rezanci', 'thin noodles')], ['salt', 1.5, 'kasicica'], ['pepper_black', 5, 'zrno'], ['parsley', null, '']],
    st: [
      ['Piletinu stavi u 2 litre hladne vode, posoli i polako zagrij. Kad počne kuhati, skini pjenu.', 'Put the chicken in 2 litres of cold water, salt it and heat slowly. When it comes to the boil, skim off the foam.'],
      ['Dodaj očišćeno korjenasto povrće, cijeli luk i biber u zrnu. Kuhaj lagano, poluotkriveno, 50 minuta.', 'Add the cleaned root veg, the whole onion and the peppercorns. Simmer gently, half covered, for 50 minutes.', 50],
      ['Procijedi supu. Meso otkosti i vrati malo u supu, mrkvu isijeci na kolutove.', 'Strain the soup. Take the meat off the bones and return some to the soup; slice the carrot into rounds.'],
      ['U supu koja kuha ubaci rezance i kuhaj 5 minuta. Pospi peršunom.', 'Drop the noodles into the boiling soup and cook for 5 minutes. Scatter with parsley.', 5],
    ],
    story: ['Bistra pileća supa — prvo što se stavi na sto u nedjelju i prvo što se skuha kad je neko bolestan.', 'Clear chicken soup — the first thing on the table on Sunday and the first thing cooked when someone is ill.'],
    src: T,
  },
  {
    id: 'goveda-supa-rezanci', cu: 'svakodnevno', type: 'soup', supa: 1, main: 'beef', time: 150, serves: 6,
    bs: 'Goveđa supa s rezancima', en: 'Beef noodle soup',
    ing: [['beef', 400, 'g', n('rebra ili plećka', 'short rib or shoulder')], ['bones_beef', 500, 'g'], ['root_mix', 400, 'g'], ['onion', 1, 'glavica'], ['soup_pasta', 120, 'g', n('tanki rezanci', 'thin noodles')], ['salt', 2, 'kasicica'], ['pepper_black', 6, 'zrno'], ['parsley', null, '']],
    st: [
      ['Meso i kosti operi, stavi u 3 litre hladne vode i polako zagrij. Skidaj pjenu dok se ne prestane skupljati.', 'Rinse the meat and bones, put them in 3 litres of cold water and heat slowly. Keep skimming until no more foam rises.'],
      ['Dodaj so, biber u zrnu i luk prepolovljen pa zapečen na suhoj tavi (daje boju). Kuhaj jedva da ključa 1 sat.', 'Add the salt, peppercorns and the onion, halved and charred in a dry pan (for colour). Barely simmer for 1 hour.', 60],
      ['Dodaj korjenasto povrće i kuhaj još sat vremena. Supa se ne miješa i ne smije jako kuhati, da ostane bistra.', 'Add the root veg and cook for another hour. Do not stir and do not let it boil hard, so it stays clear.', 60],
      ['Procijedi supu kroz sito. U nju ubaci rezance i kuhaj 5 minuta. Meso i povrće posluži odvojeno ili isjeckano u supi.', 'Strain the soup through a sieve. Add the noodles and cook for 5 minutes. Serve the meat and veg separately or chopped into the soup.', 5],
    ],
    story: ['Supa koja se kuha polako, na jedva čujnoj vatri. Kuhano meso iz nje je često drugo jelo istog ručka.', 'A soup cooked slowly over the lowest flame. The boiled meat from it is often the second course of the same lunch.'],
    src: T,
  },
  {
    id: 'supa-povrce', cu: 'svakodnevno', type: 'soup', supa: 1, main: 'veg', time: 40, serves: 4, kid: 1,
    bs: 'Bistra supa od povrća', en: 'Clear vegetable soup',
    ing: [['root_mix', 400, 'g'], ['onion', 1, 'glavica'], ['potato', 1, 'kom'], ['oil', 1, 'kasika'], ['soup_pasta', 80, 'g'], ['salt', 1.5, 'kasicica'], ['pepper_black', null, ''], ['parsley', null, '']],
    st: [
      ['Povrće očisti i isijeci na sitne kocke ili tanke štapiće, luk sitno.', 'Clean the veg and cut into small dice or thin sticks; chop the onion finely.'],
      ['Na ulju kratko propirjaj luk i povrće, nalij 1,5 litara vode i posoli. Kuhaj 20 minuta.', 'Soften the onion and veg briefly in the oil, pour in 1.5 litres of water and salt it. Cook for 20 minutes.', 20],
      ['Ubaci uložak (rezance, rižu ili griz) i kuhaj još 5–10 minuta. Pobiberi i pospi peršunom.', 'Add the soup pasta (noodles, rice or semolina) and cook 5–10 minutes more. Season with pepper and scatter with parsley.', 8],
    ],
    story: ['Brza supa za radni dan — od onoga što ima u frižideru, gotova za pola sata.', 'A quick weekday soup — made from what is in the fridge, ready in half an hour.'],
    src: T,
  },
  {
    id: 'supa-griz-knedle', cu: 'svakodnevno', type: 'soup', supa: 1, main: 'veg', time: 35, serves: 4, kid: 1,
    bs: 'Supa s knedlicama od griza', en: 'Soup with semolina dumplings',
    ing: [['stock_cube', 1.5, 'l', n('pileći ili goveđi temeljac', 'chicken or beef stock')], ['semolina', 100, 'g'], ['eggs', 1, 'kom'], ['butter', 30, 'g', n('omekšali', 'softened')], ['salt', 0.5, 'kasicica'], ['parsley', null, '']],
    st: [
      ['Maslac umuti s jajem i solju, umiješaj griz. Ostavi smjesu 10 minuta da griz nabubri.', 'Beat the butter with the egg and salt, stir in the semolina. Leave for 10 minutes for the semolina to swell.', 10],
      ['Zakuhaj temeljac. Kašičicom umočenom u supu vadi male knedlice i spuštaj ih u supu.', 'Bring the stock to the boil. With a teaspoon dipped in the soup, scoop small dumplings and drop them in.'],
      ['Kuhaj poklopljeno na laganoj vatri 15 minuta, dok knedlice ne narastu. Pospi peršunom.', 'Cover and simmer gently for 15 minutes until the dumplings swell. Scatter with parsley.', 15],
    ],
    story: ['Mekane knedlice od griza koje djeca prva pojedu iz tanjira.', 'Soft semolina dumplings — the first thing children fish out of the bowl.'],
    src: T,
  },

  // ───────── simple side salads ─────────
  {
    id: 'paradajz-salata', cu: 'svakodnevno', type: 'salad', side: 1, main: 'veg', time: 10, serves: 4, kid: 1, key: ['tomato'],
    bs: 'Paradajz salata', en: 'Tomato salad',
    ing: [['tomato', 4, 'kom'], ['onion', 0.5, 'glavica'], ['oil', 2, 'kasika'], ['vinegar', 1, 'kasika'], ['salt', null, ''], ['parsley', null, '', O]],
    st: [
      ['Paradajz isijeci na kriške ili osmine, luk na tanke polumjesece.', 'Cut the tomatoes into slices or wedges and the onion into thin half-moons.'],
      ['Posoli, prelij uljem i sirćetom, lagano izmiješaj i ostavi 5 minuta da pusti sok.', 'Salt, dress with oil and vinegar, toss gently and leave for 5 minutes to release the juices.'],
    ],
    story: ['Ljetna salata uz svako jelo — dobar paradajz, malo luka i sirćeta, i hljeb za umakanje soka.', 'The summer salad for every meal — good tomatoes, a little onion and vinegar, and bread to mop up the juice.'],
    src: T,
  },
  {
    id: 'mijesana-salata', cu: 'svakodnevno', type: 'salad', side: 1, main: 'veg', time: 10, serves: 4, kid: 1, key: ['cucumber'],
    bs: 'Miješana salata (krastavac, paradajz, luk)', en: 'Mixed salad (cucumber, tomato, onion)',
    ing: [['cucumber', 1, 'kom'], ['tomato', 3, 'kom'], ['onion', 0.5, 'glavica'], ['oil', 2, 'kasika'], ['vinegar', 1.5, 'kasika'], ['salt', null, '']],
    st: [
      ['Krastavac isijeci na tanke kolutove, paradajz na kriške, luk na tanke polumjesece.', 'Slice the cucumber thinly, the tomatoes into wedges and the onion into thin half-moons.'],
      ['Posoli, prelij uljem i sirćetom i izmiješaj neposredno prije služenja.', 'Salt, dress with oil and vinegar and toss just before serving.'],
    ],
    story: ['Najobičnija salata na stolu — ide uz meso, grah, pitu i sve između.', 'The most ordinary salad on the table — it goes with meat, beans, pie and everything in between.'],
    src: T,
  },
  {
    id: 'paradajz-kajmak', cu: 'svakodnevno', type: 'salad', side: 1, main: 'veg', time: 5, serves: 4, kid: 1, key: ['kajmak', 'tomato'],
    bs: 'Paradajz s kajmakom', en: 'Tomatoes with kajmak',
    ing: [['tomato', 4, 'kom'], ['kajmak', 150, 'g'], ['salt', null, ''], ['onion', 0.5, 'glavica', O]],
    st: [
      ['Paradajz isijeci na deblje kriške i složi na tanjir, lagano posoli.', 'Cut the tomatoes into thick slices, lay them on a plate and salt lightly.'],
      ['Uz njih stavi kajmak (i po želji malo luka). Svako uzima kajmak na paradajz ili na hljeb.', 'Put the kajmak alongside (and a little onion if you like). Everyone spreads kajmak on the tomato or on bread.'],
    ],
    story: ['Ništa se ne kuha: zreo paradajz i svjež kajmak — uz ćevape, pitu ili kao lagana večera.', 'Nothing to cook: ripe tomatoes and fresh kajmak — with ćevapi, with pie or as a light supper.'],
    src: T,
  },
  {
    id: 'satrica', cu: 'svakodnevno', type: 'salad', side: 1, main: 'cheese', time: 10, serves: 4, kid: 1, key: ['cottage', 'kajmak'],
    bs: 'Satrica (mladi luk, mladi sir i kajmak)', en: 'Satrica (spring onion, fresh cheese and kajmak)',
    ing: [['spring_onion', 2, 'sop'], ['cottage', 250, 'g'], ['kajmak', 100, 'g'], ['salt', null, '']],
    st: [
      ['Mladi luk očisti i isijeci na tanke kolutiće, i bijeli i zeleni dio.', 'Trim the spring onions and slice thinly, white and green parts.'],
      ['Izmiješaj ga s mladim sirom i kajmakom, malo posoli. Služi uz hljeb ili pitu.', 'Mix with the fresh cheese and kajmak and salt a little. Serve with bread or pie.'],
    ],
    story: ['Proljetni prilog kad stigne prvi mladi luk — miješa se, ne kuha.', 'A spring side for when the first spring onions arrive — mixed, never cooked.'],
    src: T,
  },
  {
    id: 'zelena-salata', cu: 'svakodnevno', type: 'salad', side: 1, main: 'veg', time: 10, serves: 4, kid: 1, key: ['lettuce'],
    bs: 'Zelena salata', en: 'Green salad',
    ing: [['lettuce', 1, 'glavica'], ['oil', 2, 'kasika'], ['vinegar', 1, 'kasika'], ['salt', null, ''], ['garlic', 1, 'cen', O]],
    st: [
      ['Listove operi u hladnoj vodi, dobro ocijedi i natrgaj na komade.', 'Wash the leaves in cold water, drain well and tear into pieces.'],
      ['Tek pred služenje posoli i prelij uljem i sirćetom (po želji s malo zgnječenog bijelog luka).', 'Salt and dress with oil and vinegar just before serving (with a little crushed garlic if you like).'],
    ],
    story: ['Salata iz bašte uz pečenje i pohovano — začini se tek na stolu da ne uvene.', 'Garden lettuce for roasts and fried dishes — dressed only at the table so it doesn’t wilt.'],
    src: T,
  },
  {
    id: 'kupus-salata', cu: 'svakodnevno', type: 'salad', side: 1, main: 'veg', time: 15, serves: 4, key: ['cabbage', 'sauerkraut', 'sauerkraut_shred'],
    bs: 'Kupus salata', en: 'Cabbage salad',
    ing: [['cabbage', 600, 'g'], ['salt', 1, 'kasicica'], ['oil', 3, 'kasika'], ['vinegar', 2, 'kasika'], ['pepper_black', null, ''], ['paprika_sweet', null, '', O]],
    st: [
      ['Kupus izrendaj ili isijeci na vrlo tanke rezance. Posoli i dobro ga izgnječi rukama, da omekša.', 'Grate the cabbage or slice it very thinly. Salt it and squeeze it well with your hands to soften.'],
      ['Ostavi 10 minuta, pa prelij uljem i sirćetom, pobiberi i po želji pospi slatkom alevom paprikom.', 'Leave for 10 minutes, then dress with oil and vinegar, add pepper and a little sweet paprika if you like.', 10],
    ],
    story: ['Zimska salata uz grah, sarmu i pečenje — što duže stoji, to je bolja.', 'The winter salad for beans, sarma and roasts — the longer it stands, the better it gets.'],
    src: T,
  },
  {
    id: 'krastavac-salata', cu: 'svakodnevno', type: 'salad', side: 1, main: 'veg', time: 10, serves: 4, kid: 1, key: ['cucumber'],
    bs: 'Krastavac salata', en: 'Cucumber salad',
    ing: [['cucumber', 2, 'kom'], ['garlic', 1, 'cen'], ['oil', 2, 'kasika'], ['vinegar', 1, 'kasika'], ['salt', null, ''], ['dill', null, '', O]],
    st: [
      ['Krastavce isijeci na tanke kolutove, posoli i ostavi 5 minuta, pa ocijedi vodu.', 'Slice the cucumbers thinly, salt them, leave for 5 minutes and pour off the water.'],
      ['Dodaj zgnječen bijeli luk, ulje i sirće i izmiješaj. Po želji pospi mirođijom.', 'Add the crushed garlic, oil and vinegar and toss. Scatter with dill if you like.'],
    ],
    story: ['Hladna i hrskava — uz tjesteninu, pohovano i sve što je toplo i masnije.', 'Cool and crunchy — with pasta, fried dishes and anything warm and rich.'],
    src: T,
  },
  {
    id: 'salata-luk', cu: 'svakodnevno', type: 'salad', side: 1, main: 'veg', time: 10, serves: 4, key: [],
    bs: 'Salata od luka', en: 'Onion salad',
    ing: [['onion', 2, 'glavica'], ['vinegar', 2, 'kasika'], ['oil', 1, 'kasika'], ['salt', 0.5, 'kasicica'], ['paprika_sweet', null, '', O], ['parsley', null, '', O]],
    st: [
      ['Luk isijeci na tanke kolutove ili polumjesece, posoli i izgnječi rukama da pusti sok i ublaži se.', 'Slice the onion into thin rings or half-moons, salt and squeeze with your hands so it softens and mellows.'],
      ['Prelij sirćetom i uljem, ostavi 10 minuta. Po želji pospi slatkom alevom paprikom i peršunom.', 'Dress with vinegar and oil and leave for 10 minutes. Sprinkle with sweet paprika and parsley if you like.', 10],
    ],
    story: ['Uz grah, ćevape i sve s roštilja — mali tanjir koji se uvijek isprazni.', 'With beans, ćevapi and anything off the grill — the small plate that always gets emptied.'],
    src: T,
  },

  // ───────── accompaniments (type 'side': nothing to cook) ─────────
  {
    id: 'uz-jogurt', cu: 'svakodnevno', type: 'side', main: 'cheese', time: 1, serves: 4, kid: 1, key: ['yogurt', 'sour_milk'],
    bs: 'Jogurt', en: 'Yoghurt',
    ing: [['yogurt', 800, 'ml', n('čaša po osobi', 'a glass each')]],
    st: [['Jogurt dobro ohladi i posluži u čašama, uz jelo.', 'Chill the yoghurt well and serve in glasses with the meal.']],
    story: ['Čaša hladnog jogurta — uz pitu se podrazumijeva.', 'A glass of cold yoghurt — with pie it goes without saying.'],
    src: T,
  },
  {
    id: 'uz-kiselo-mlijeko', cu: 'svakodnevno', type: 'side', main: 'cheese', time: 1, serves: 4, kid: 1, key: ['yogurt', 'sour_milk'],
    bs: 'Kiselo mlijeko', en: 'Soured milk',
    ing: [['sour_milk', 800, 'ml', n('čaša po osobi', 'a glass each')]],
    st: [['Kiselo mlijeko dobro ohladi i posluži u čašama, uz jelo.', 'Chill the soured milk well and serve in glasses with the meal.']],
    story: ['Gušće i kiselije od jogurta — uz pitu, sarmu i punjene paprike.', 'Thicker and sourer than yoghurt — with pie, sarma and stuffed peppers.'],
    src: T,
  },
  {
    id: 'uz-kiseli-kupus', cu: 'svakodnevno', type: 'side', main: 'veg', time: 5, serves: 4, key: ['sauerkraut', 'sauerkraut_shred', 'cabbage'],
    bs: 'Kiseli kupus kao salata', en: 'Sauerkraut salad',
    ing: [['sauerkraut_shred', 400, 'g'], ['oil', 1, 'kasika'], ['paprika_sweet', null, '', O]],
    st: [['Kiseli kupus ocijedi (ako je preslan, kratko ga isperi), prelij uljem i po želji pospi slatkom alevom paprikom.', 'Drain the sauerkraut (rinse briefly if very salty), drizzle with oil and sprinkle with sweet paprika if you like.']],
    story: ['Iz tegle ili bureta, zimi uz grah i pečenje.', 'Straight from the jar or the barrel — in winter, with beans and roasts.'],
    src: T,
  },
  {
    id: 'uz-tursija', cu: 'svakodnevno', type: 'side', main: 'veg', time: 1, serves: 4, key: ['tursija'],
    bs: 'Turšija', en: 'Turšija (mixed pickles)',
    ing: [['tursija', 300, 'g']],
    st: [['Turšiju izvadi iz tegle, ocijedi i posluži u zdjelici.', 'Take the pickles out of the jar, drain and serve in a small bowl.']],
    story: ['Zimnica na stolu — uz grah, meso i sve što je teže.', 'The winter store on the table — with beans, meat and anything heavy.'],
    src: T,
  },
  {
    id: 'uz-kajmak-ajvar', cu: 'svakodnevno', type: 'side', main: 'cheese', time: 2, serves: 4, key: ['kajmak', 'ajvar'],
    bs: 'Kajmak i ajvar', en: 'Kajmak and ajvar',
    ing: [['kajmak', 150, 'g'], ['ajvar', 150, 'g']],
    st: [['Kajmak i ajvar stavi u dvije zdjelice na sto, uz hljeb ili somun.', 'Put the kajmak and ajvar in two small bowls on the table, with bread or flatbread.']],
    story: ['Uz ćevape i sve s roštilja.', 'With ćevapi and anything off the grill.'],
    src: T,
  },
];
