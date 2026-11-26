// Složeni doručci — assembled, no-cook breakfasts from shop products.
// Amounts are PER PERSON (serves: 1); the planner scales them to the household.
// Names say what is on the plate, never where it comes from.
const n = (bs, en) => ({ note: [bs, en] });
const O = { opt: 1 };
const C = { b: 'sofra' };
const base = { cu: 'svakodnevno', type: 'combo', serves: 1, time: 5, light: 1, meal: ['breakfast'], src: C };
const tea = ['tea', 1, 'kesica', n('šolja čaja', 'a cup of tea')];
const teaStep = ['Skuhaj čaj — vodu samo prokuhaj i prelij kesicu, 3 minute.', 'Make the tea — just boil the water and pour it over the bag, 3 minutes.'];
const coffee = ['coffee_ground', 7, 'g', { opt: 1, note: ['za odrasle, šolja kafe', 'for adults, a cup of coffee'] }];

const list = [
  {
    id: 'sd-hljeb-med-maslo', kid: 1, main: 'dessert',
    bs: 'Hljeb, med i maslo s jabukom i mlijekom', en: 'Bread, honey and clarified butter with an apple and milk',
    ing: [['bread', 2, 'kriska'], ['maslo', 10, 'g'], ['honey', 20, 'g'], ['apple', 1, 'kom'], ['milk', 250, 'ml']],
    st: [
      ['Hljeb tanko namaži maslom, pa medom.', 'Spread the bread thinly with clarified butter, then honey.'],
      ['Jabuku operi i isijeci na kriške.', 'Wash the apple and cut it into wedges.'],
      ['Mlijeko natoči hladno ili ga kratko ugrij.', 'Pour the milk cold or warm it briefly.'],
    ],
    story: ['Doručak kakav se pravi od onoga što je uvijek u kući.', 'A breakfast made from what is always in the house.'],
  },
  {
    id: 'sd-kajmak-suho-meso', main: 'beef',
    bs: 'Hljeb, kajmak i suho meso s krastavcem i čajem', en: 'Bread, kajmak and dried beef with cucumber and tea',
    ing: [['bread', 2, 'kriska'], ['kajmak', 25, 'g'], ['smoked_beef', 30, 'g', n('tanko narezano', 'thinly sliced')], ['cucumber', 100, 'g'], tea],
    st: [
      teaStep,
      ['Hljeb namaži kajmakom, suho meso složi pored.', 'Spread the bread with kajmak and lay the dried beef alongside.'],
      ['Krastavac isijeci na kolutove i lagano posoli.', 'Slice the cucumber and salt it lightly.'],
    ],
    story: ['Slano, masno i hrskavo — za dane kad do ručka ima dugo.', 'Salty, rich and crisp — for days when lunch is a long way off.'],
  },
  {
    id: 'sd-integralni-sir-paradajz', main: 'cheese',
    bs: 'Integralni hljeb, sir i paradajz s čajem', en: 'Wholegrain bread, cheese and tomato with tea',
    ing: [['bread_whole', 2, 'kriska'], ['cheese_semi', 40, 'g'], ['tomato', 1, 'kom'], tea, coffee],
    st: [
      teaStep,
      ['Na hljeb složi sir, a paradajz isijeci na kriške i lagano posoli.', 'Lay the cheese on the bread; slice the tomato and salt it lightly.'],
    ],
    story: ['Jednostavno i sito, s puno vlakana iz integralnog hljeba.', 'Simple and filling, with plenty of fibre from the wholegrain bread.'],
  },
  {
    id: 'sd-jogurt-zob-banana', kid: 1, main: 'dessert',
    bs: 'Jogurt sa zobenim pahuljicama, bananom i orasima', en: 'Yoghurt with oats, banana and walnuts',
    ing: [['yogurt', 200, 'g'], ['oats', 40, 'g'], ['banana', 1, 'kom'], ['walnuts', 15, 'g'], ['honey', 1, 'kasicica', O]],
    st: [
      ['Pahuljice umiješaj u jogurt i ostavi 5 minuta da omekšaju (ili preko noći u frižideru).', 'Stir the oats into the yoghurt and leave 5 minutes to soften (or overnight in the fridge).', 5],
      ['Odozgo isijeci bananu i izlomi orahe; po želji malo meda.', 'Top with sliced banana and broken walnuts; a little honey if you like.'],
    ],
    story: ['Zdjelica koja se složi za dvije minute, a drži do ručka.', 'A bowl put together in two minutes that keeps you going until lunch.'],
  },
  {
    id: 'sd-kiselo-mlijeko-sir', main: 'cheese',
    bs: 'Kiselo mlijeko, hljeb i bijeli sir s paprikom', en: 'Soured milk, bread and white cheese with pepper',
    ing: [['sour_milk', 250, 'ml'], ['bread', 2, 'kriska'], ['feta', 50, 'g'], ['pepper', 0.5, 'kom']],
    st: [
      ['Sir izmrvi ili isijeci na kocke, papriku na trake.', 'Crumble or cube the cheese; cut the pepper into strips.'],
      ['Služi uz hljeb i čašu hladnog kiselog mlijeka.', 'Serve with the bread and a glass of cold soured milk.'],
    ],
    story: ['Ljetni doručak — sve hladno, ništa ne treba paliti.', 'A summer breakfast — everything cold, nothing to switch on.'],
  },
  {
    id: 'sd-maslac-dzem-mandarine', kid: 1, main: 'dessert',
    bs: 'Hljeb s maslacem i džemom, mlijeko i mandarine', en: 'Bread with butter and jam, milk and mandarins',
    ing: [['bread', 2, 'kriska'], ['butter', 10, 'g'], ['dzem', 25, 'g', n('ili pekmez', 'or plum butter')], ['milk', 250, 'ml'], ['mandarin', 2, 'kom']],
    st: [
      ['Hljeb namaži maslacem, pa džemom.', 'Spread the bread with butter, then jam.'],
      ['Uz to čaša mlijeka i dvije oguljene mandarine.', 'Add a glass of milk and two peeled mandarins.'],
    ],
    story: ['Zimski klasik: džem iz tegle i mandarine iz kesice.', 'A winter classic: jam from the jar and mandarins from the bag.'],
  },
  {
    id: 'sd-kikiriki-banana', kid: 1, main: 'dessert',
    bs: 'Integralni hljeb s maslacem od kikirikija, banana i mlijeko', en: 'Wholegrain bread with peanut butter, banana and milk',
    ing: [['bread_whole', 2, 'kriska'], ['peanut_butter', 20, 'g'], ['banana', 1, 'kom'], ['milk', 200, 'ml']],
    st: [
      ['Hljeb namaži maslacem od kikirikija i složi kolutove banane odozgo.', 'Spread the bread with peanut butter and top with banana slices.'],
      ['Uz to čaša mlijeka.', 'Serve with a glass of milk.'],
    ],
    story: ['Puno bjelančevina i energije — dobro prije treninga ili škole.', 'Plenty of protein and energy — good before training or school.'],
  },
  {
    id: 'sd-cokoladni-narandza', kid: 1, main: 'dessert',
    bs: 'Hljeb s čokoladnim namazom, mlijeko i narandža', en: 'Bread with chocolate spread, milk and an orange',
    ing: [['bread', 2, 'kriska'], ['choc_spread', 20, 'g'], ['milk', 250, 'ml'], ['orange', 1, 'kom']],
    st: [
      ['Hljeb tanko namaži čokoladnim namazom.', 'Spread the bread thinly with chocolate spread.'],
      ['Narandžu oguli i podijeli na kriške; uz to čaša mlijeka.', 'Peel the orange and split it into segments; add a glass of milk.'],
    ],
    story: ['Slatki doručak za petak — voće i mlijeko ga malo izbalansiraju.', 'A sweet Friday breakfast — the fruit and milk balance it a little.'],
  },
  {
    id: 'sd-spekulatius-kruska', main: 'dessert',
    bs: 'Hljeb sa zimskim namazom sa spekulatiusom, jogurt i kruška', en: 'Bread with spiced biscuit spread, yoghurt and a pear',
    ing: [['bread', 2, 'kriska'], ['speculoos_spread', 20, 'g'], ['yogurt', 150, 'g'], ['pear', 1, 'kom']],
    st: [
      ['Hljeb namaži namazom sa spekulatiusom.', 'Spread the bread with the spiced biscuit spread.'],
      ['Krušku isijeci na kriške; jogurt služi u čaši ili zdjelici.', 'Slice the pear; serve the yoghurt in a glass or bowl.'],
    ],
    story: ['Miris cimeta i karamela — doručak za prve hladne dane.', 'Cinnamon and caramel — a breakfast for the first cold days.'],
  },
  {
    id: 'sd-pasteta-krastavci', main: 'beef',
    bs: 'Hljeb, pašteta i kiseli krastavci s čajem', en: 'Bread, pâté and pickled gherkins with tea',
    ing: [['bread', 2, 'kriska'], ['pate', 40, 'g'], ['pickles', 1, 'kom'], tea],
    st: [
      teaStep,
      ['Hljeb namaži paštetom, krastavac isijeci na kolutove i složi odozgo.', 'Spread the bread with pâté; slice the gherkin and lay it on top.'],
    ],
    story: ['Doručak iz ruksaka i radničke torbe — konzerva, hljeb i nešto kiselo.', 'A breakfast from the rucksack and the work bag — a tin, bread and something sour.'],
  },
  {
    id: 'sd-kulen-sir-paprika', main: 'pork',
    bs: 'Hljeb, kulen i sir s paprikom', en: 'Bread, kulen and cheese with pepper',
    ing: [['bread', 2, 'kriska'], ['kulen', 30, 'g', n('tanko narezan', 'thinly sliced')], ['cheese_semi', 30, 'g'], ['pepper', 0.5, 'kom'], tea],
    st: [
      teaStep,
      ['Kulen i sir složi na tanjir, papriku isijeci na trake.', 'Lay the kulen and cheese on a plate; cut the pepper into strips.'],
    ],
    story: ['Ljut, dimljen i jak — malo je dovoljno.', 'Spicy, smoky and strong — a little goes a long way.'],
  },
  {
    id: 'sd-prsut-masline-sir', main: 'pork',
    bs: 'Hljeb, pršut, sir i masline s paradajzom', en: 'Bread, prosciutto, cheese and olives with tomato',
    ing: [['bread', 2, 'kriska'], ['ham', 30, 'g'], ['cheese_semi', 30, 'g'], ['olives', 30, 'g'], ['tomato', 1, 'kom'], coffee],
    st: [
      ['Pršut, sir i masline složi na dasku.', 'Lay the prosciutto, cheese and olives on a board.'],
      ['Paradajz isijeci na kriške, pokapaj uljem po želji i služi uz hljeb.', 'Slice the tomato, drizzle with oil if you like and serve with the bread.'],
    ],
    story: ['Daska kakva se iznosi gostima — ovdje za običan dan.', 'The kind of board you put out for guests — here for an ordinary day.'],
  },
  {
    id: 'sd-salama-topljeni-krastavac', kid: 1, main: 'chicken',
    bs: 'Hljeb, pileća salama i topljeni sir s krastavcem', en: 'Bread, chicken salami and processed cheese with cucumber',
    ing: [['bread', 2, 'kriska'], ['cheese_spread', 2, 'kom', n('trouglića', 'portions')], ['chicken_salami', 40, 'g'], ['cucumber', 100, 'g'], tea],
    st: [
      teaStep,
      ['Hljeb namaži topljenim sirom i složi salamu odozgo.', 'Spread the bread with the processed cheese and lay the salami on top.'],
      ['Krastavac isijeci na štapiće.', 'Cut the cucumber into sticks.'],
    ],
    story: ['Sendvič koji djeca jedu bez pregovora.', 'The sandwich children eat without negotiations.'],
  },
  {
    id: 'sd-margarin-parizer', kid: 1, main: 'chicken',
    bs: 'Hljeb s margarinom, parizer i kiselo mlijeko', en: 'Bread with margarine, luncheon sausage and soured milk',
    ing: [['bread', 2, 'kriska'], ['margarine', 10, 'g'], ['parizer', 40, 'g'], ['sour_milk', 250, 'ml'], ['apple', 1, 'kom', O]],
    st: [
      ['Hljeb namaži margarinom i složi parizer.', 'Spread the bread with margarine and add the luncheon sausage.'],
      ['Uz to čaša kiselog mlijeka; jabuka za poslije, po želji.', 'Add a glass of soured milk; an apple for afterwards if you like.'],
    ],
    story: ['Školski sendvič iz djetinjstva, s čašom kiselog mlijeka.', 'The school sandwich from childhood, with a glass of soured milk.'],
  },
  {
    id: 'sd-mortadela-paradajz', main: 'beef',
    bs: 'Hljeb, mortadela i sir s paradajzom i čajem', en: 'Bread, mortadella and cheese with tomato and tea',
    ing: [['bread', 2, 'kriska'], ['mortadela', 40, 'g'], ['cheese_semi', 20, 'g'], ['tomato', 1, 'kom'], tea],
    st: [
      teaStep,
      ['Složi sendvič od hljeba, mortadele i sira; paradajz isijeci na kriške.', 'Build a sandwich of bread, mortadella and cheese; slice the tomato.'],
    ],
    story: ['Brzi sendvič za put, s toplim čajem kod kuće.', 'A quick sandwich for the road, with hot tea at home.'],
  },
  {
    id: 'sd-tuna-masline-paradajz', main: 'fish',
    bs: 'Tunjevina, hljeb i masline s paradajzom i limunom', en: 'Tuna, bread and olives with tomato and lemon',
    ing: [['tuna', 60, 'g', n('ocijeđena', 'drained')], ['bread', 2, 'kriska'], ['olives', 20, 'g'], ['tomato', 1, 'kom'], ['lemon', 0.25, 'kom'], tea],
    st: [
      teaStep,
      ['Tunjevinu ocijedi i pokapaj limunom.', 'Drain the tuna and squeeze over the lemon.'],
      ['Služi s maslinama, kriškama paradajza i hljebom.', 'Serve with the olives, tomato slices and bread.'],
    ],
    story: ['Posni doručak kad je riba dozvoljena — bez kuhanja, iz ostave.', 'A fasting breakfast when fish is allowed — no cooking, straight from the pantry.'],
  },
  {
    id: 'sd-sardine-luk-paradajz', main: 'fish',
    bs: 'Sardine, hljeb i crveni luk s paradajzom', en: 'Sardines, bread and onion with tomato',
    ing: [['sardines', 60, 'g', n('ocijeđene', 'drained')], ['bread', 2, 'kriska'], ['onion', 0.25, 'kom'], ['tomato', 1, 'kom'], ['lemon', 0.25, 'kom', O], tea],
    st: [
      teaStep,
      ['Luk isijeci na tanke kolutove, paradajz na kriške.', 'Slice the onion into thin rings and the tomato into slices.'],
      ['Sardine složi na hljeb i pospi lukom; limun po želji.', 'Lay the sardines on the bread and scatter with onion; lemon if you like.'],
    ],
    story: ['Mala konzerva, puno bjelančevina — stari doručak ribara i planinara.', 'A small tin full of protein — an old breakfast of fishermen and hikers.'],
  },
  {
    id: 'sd-mesni-dorucak-krastavci', main: 'pork',
    bs: 'Mesni doručak, hljeb i kiseli krastavci s čajem', en: 'Luncheon meat, bread and pickled gherkins with tea',
    ing: [['luncheon', 50, 'g'], ['bread', 2, 'kriska'], ['pickles', 1, 'kom'], tea],
    st: [
      teaStep,
      ['Mesni doručak isijeci na kriške, krastavac na kolutove i služi uz hljeb.', 'Slice the luncheon meat and the gherkin and serve with the bread.'],
    ],
    story: ['Konzerva koja je hranila čete i đačke ekskurzije.', 'The tin that fed whole companies and school trips.'],
  },
  {
    id: 'sd-grah-luk-hljeb', main: 'beans',
    bs: 'Grah iz konzerve s crvenim lukom, uljem i hljebom', en: 'Tinned beans with onion, oil and bread',
    ing: [['beans_can', 120, 'g', n('ocijeđen', 'drained')], ['onion', 0.25, 'kom'], ['salt', null, ''], ['oil', 1, 'kasika'], ['vinegar', 1, 'kasicica'], ['paprika_sweet', 1, 'prst'], ['bread', 2, 'kriska'], tea],
    st: [
      teaStep,
      ['Grah ocijedi i isperi, luk isijeci sitno.', 'Drain and rinse the beans; chop the onion finely.'],
      ['Pomiješaj s uljem, sirćetom, solju i prstohvatom aleve paprike; služi uz hljeb.', 'Mix with the oil, vinegar, salt and a pinch of paprika; serve with the bread.'],
    ],
    story: ['Posni i siti doručak — grah salata bez kuhanja.', 'A filling fasting breakfast — bean salad with no cooking.'],
  },
  {
    id: 'sd-ajvar-masline-paradajz', main: 'veg',
    bs: 'Hljeb s ajvarom i maslinama, paradajz i čaj', en: 'Bread with ajvar and olives, tomato and tea',
    ing: [['bread', 2, 'kriska'], ['ajvar', 40, 'g'], ['olives', 20, 'g'], ['tomato', 1, 'kom'], tea],
    st: [
      teaStep,
      ['Hljeb namaži ajvarom, masline i paradajz složi pored.', 'Spread the bread with ajvar; add the olives and tomato alongside.'],
    ],
    story: ['Potpuno posno, a puno okusa — tegla ajvara radi sav posao.', 'Completely fasting-friendly and full of flavour — the jar of ajvar does the work.'],
  },
  {
    id: 'sd-cajna-sir-paprika', main: 'pork',
    bs: 'Hljeb, čajna kobasica i sir s paprikom i čajem', en: 'Bread, dry sausage and cheese with pepper and tea',
    ing: [['bread', 2, 'kriska'], ['tea_sausage', 30, 'g', n('tanko narezana', 'thinly sliced')], ['cheese_semi', 30, 'g'], ['pepper', 0.5, 'kom'], tea],
    st: [
      teaStep,
      ['Kobasicu i sir složi na tanjir, papriku isijeci na trake; služi uz hljeb.', 'Lay the sausage and cheese on a plate, cut the pepper into strips; serve with the bread.'],
    ],
    story: ['Kobasica uz čaj — otud joj i ime.', 'Sausage with tea — hence its name.'],
  },
];

export const COMBO_RECIPES = list.map((r) => ({ ...base, ...r }));
