// Round of 31 more home dishes. cu is hidden data only — names and stories never say where a dish is from.
const n = (bs, en) => ({ note: [bs, en] });
const T = { b: 'trad' };
const O = { opt: 1 };

export const EXTRA_RECIPES = [
  // ───────── crnogorska ─────────
  {
    id: 'japrak-rastan', cu: 'crnogorska', type: 'main', main: 'beef', time: 120, serves: 6, left: 1,
    bs: 'Japrak (sarma u listovima raštana)', en: 'Japrak (collard leaves stuffed with meat and rice)',
    ing: [['kale', 1, 'kg', n('krupni listovi', 'large leaves')], ['beef_mince', 600, 'g'], ['rice', 150, 'g'], ['onion', 2, 'glavica'], ['smoked_ribs', 300, 'g', O], ['paprika_sweet', 1, 'kasicica'], ['tomato_paste', 1, 'kasika'], ['oil', 4, 'kasika'], ['salt', null, ''], ['pepper_black', null, '']],
    st: [
      ['Listove raštana operi, odreži tvrde žile i prelij ih ključalom vodom da omekšaju.', 'Wash the collard leaves, trim the tough ribs and pour boiling water over them to soften.', 3],
      ['Pola luka sitno isijeci i izmiješaj s mesom, rižom, alevom paprikom, solju i biberom.', 'Finely chop half the onion and mix it with the mince, rice, paprika, salt and pepper.'],
      ['Na svaki list stavi kašiku nadjeva i zamotaj čvrsto, uvlačeći krajeve.', 'Put a spoonful of filling on each leaf and roll tightly, tucking in the sides.'],
      ['Na dno lonca stavi ostatak luka i suho meso, poslaži japrake, dodaj ulje, paradajz-pire i toliko vode da budu pokriveni.', 'Lay the remaining onion and smoked meat in the pot, pack in the rolls, add the oil, tomato paste and water to cover.'],
      ['Pritisni tanjirom i kuhaj poklopljeno na tihoj vatri 90 minuta.', 'Weigh down with a plate and simmer covered on low heat for 90 minutes.', 90],
    ],
    story: ['Zimska sarma od raštana — listovi su najbolji poslije prvog mraza.', 'A winter roll made with collard leaves — they taste best after the first frost.'],
    src: T,
  },
  {
    id: 'priganice', cu: 'crnogorska', type: 'breakfast', main: 'dessert', time: 70, serves: 4, kid: 1, meal: ['breakfast', 'snack'],
    bs: 'Priganice s medom i sirom', en: 'Fried dough puffs with honey and cheese',
    ing: [['flour', 500, 'g'], ['yeast', 1, 'kesica'], ['sugar', 1, 'kasicica'], ['salt', 1, 'kasicica'], ['oil', 500, 'ml', n('za prženje', 'for frying')], ['honey', 100, 'g'], ['feta', 200, 'g']],
    st: [
      ['Kvasac razmuti u 500 ml mlake vode sa šećerom, dodaj brašno i so i umuti rijetko tijesto. Ostavi pokriveno 45 minuta da naraste.', 'Dissolve the yeast in 500 ml lukewarm water with the sugar, add flour and salt and beat to a soft batter. Leave covered 45 minutes to rise.', 45],
      ['Ulje zagrij. Kašikom umočenom u hladnu vodu vadi tijesto i prži priganice dok ne porumene sa svih strana.', 'Heat the oil. Scoop the batter with a spoon dipped in cold water and fry the puffs until golden all over.', 10],
      ['Ocijedi na papiru i služi tople s medom i sirom.', 'Drain on paper and serve warm with honey and cheese.'],
    ],
    story: ['Doručak za goste i praznična jutra — tijesto se pravi dok se kuha kafa.', 'A breakfast for guests and holiday mornings — the batter is made while the coffee brews.'],
    src: T,
  },
  // ───────── makedonska ─────────
  {
    id: 'kompir-mandza', cu: 'makedonska', type: 'main', main: 'potato', time: 50, serves: 4, light: 1,
    bs: 'Krompir u crvenom sosu (krompir-manča)', en: 'Potatoes in red paprika sauce',
    ing: [['potato', 1, 'kg'], ['onion', 2, 'glavica'], ['garlic', 2, 'cen'], ['paprika_sweet', 2, 'kasicica'], ['tomato_paste', 1, 'kasika'], ['flour', 1, 'kasika'], ['oil', 5, 'kasika'], ['bay_leaf', 1, 'list'], ['parsley', null, ''], ['salt', null, ''], ['pepper_black', null, '']],
    st: [
      ['Luk sitno isijeci i pirjaj na ulju 10 minuta, dodaj bijeli luk i brašno i kratko prži.', 'Chop the onion finely and cook it in the oil for 10 minutes, add the garlic and flour and fry briefly.', 10],
      ['Skloni s vatre, umiješaj alevu papriku i paradajz-pire, pa nalij 1 l vode.', 'Take off the heat, stir in the paprika and tomato paste, then pour in 1 l water.'],
      ['Dodaj krompir na kocke i lovor, posoli i kuhaj 25 minuta dok sos ne postane gust.', 'Add the diced potatoes and bay leaf, season and cook for 25 minutes until the sauce thickens.', 25],
      ['Pospi peršunom.', 'Sprinkle with parsley.'],
    ],
    story: ['Posno, jeftino i sito — jelo koje se kuha kad u kući nema mesa.', 'Fasting-friendly, cheap and filling — the dish for days with no meat in the house.'],
    src: T,
  },
  {
    id: 'posna-sarma', cu: 'makedonska', type: 'main', main: 'rice', time: 120, serves: 6, occ: ['bozic'],
    bs: 'Posna sarma s rižom i lukom', en: 'Meatless sauerkraut rolls with rice and onion',
    ing: [['sauerkraut', 1, 'glavica', n('ili 20 listova', 'or 20 leaves')], ['rice', 300, 'g'], ['onion', 3, 'glavica'], ['carrot', 1, 'kom'], ['paprika_sweet', 2, 'kasicica'], ['mint_dry', 1, 'kasicica'], ['oil', 100, 'ml'], ['tomato_paste', 1, 'kasika'], ['salt', null, ''], ['pepper_black', null, '']],
    st: [
      ['Luk i mrkvu sitno isijeci i pirjaj na pola ulja 10 minuta. Dodaj rižu, papriku, nanu i biber i prži još 2 minute.', 'Chop the onion and carrot finely and cook in half the oil for 10 minutes. Add the rice, paprika, mint and pepper and fry 2 more minutes.', 10],
      ['Listove kupusa po potrebi isperi; u svaki zamotaj kašiku nadjeva.', 'Rinse the cabbage leaves if very salty and roll a spoonful of filling in each.'],
      ['Sarme gusto poslaži u lonac, prelij ostatkom ulja i paradajz-pireom razmućenim u vodi da budu pokrivene.', 'Pack the rolls tightly in a pot, pour over the rest of the oil and the tomato paste mixed with water to cover.'],
      ['Kuhaj poklopljeno na tihoj vatri 90 minuta.', 'Simmer covered on low heat for 90 minutes.', 90],
    ],
    story: ['Sarma za posne dane pred Božić — umjesto mesa luk, riža i malo nane.', 'The roll for the fasting days before Christmas — onion, rice and a little mint instead of meat.'],
    src: T,
  },
  // ───────── albanska ─────────
  {
    id: 'cufte-nana-jogurt', cu: 'albanska', type: 'main', main: 'beef', time: 40, serves: 4, kid: 1,
    bs: 'Pržene ćufte s nanom i jogurt-sosom', en: 'Fried meatballs with mint and yoghurt sauce',
    ing: [['beef_mince', 600, 'g'], ['bread', 2, 'kriska', n('namočen u vodi i iscijeđen', 'soaked and squeezed')], ['onion', 1, 'glavica'], ['garlic', 3, 'cen'], ['mint_dry', 2, 'kasicica'], ['eggs', 1, 'kom'], ['flour', 3, 'kasika'], ['oil', 150, 'ml'], ['yogurt', 300, 'g'], ['salt', null, ''], ['pepper_black', null, '']],
    st: [
      ['Meso izmiješaj s hljebom, rendanim lukom, jednim češnjem bijelog luka, nanom, jajem, solju i biberom.', 'Mix the mince with the bread, grated onion, one garlic clove, mint, egg, salt and pepper.'],
      ['Oblikuj ćufte veličine oraha, uvaljaj u brašno i prži na ulju 8–10 minuta.', 'Shape walnut-sized balls, roll in flour and fry in the oil for 8–10 minutes.', 10],
      ['Jogurt izmiješaj s ostatkom zgnječenog bijelog luka i prstohvatom soli i služi uz ćufte.', 'Stir the remaining crushed garlic and a pinch of salt into the yoghurt and serve with the meatballs.'],
    ],
    story: ['Nana daje ćuftama svjež miris, a hladan jogurt sve zaokruži.', 'Mint gives the meatballs a fresh scent, and cold yoghurt rounds everything off.'],
    src: T,
  },
  {
    id: 'praziluk-riza-tava', cu: 'albanska', type: 'main', main: 'veg', time: 60, serves: 4, eq: ['oven'], light: 1,
    bs: 'Praziluk s rižom u tepsiji', en: 'Baked leeks with rice',
    ing: [['leek', 1, 'kg'], ['rice', 200, 'g'], ['tomato_paste', 1, 'kasika'], ['paprika_sweet', 1, 'kasicica'], ['olive_oil', 6, 'kasika'], ['lemon', 0.5, 'kom'], ['salt', null, ''], ['pepper_black', null, '']],
    st: [
      ['Praziluk isijeci na kolutove od 2 cm i pirjaj na ulju 10 minuta.', 'Cut the leeks into 2 cm rounds and cook them in the oil for 10 minutes.', 10],
      ['Dodaj rižu, papriku i paradajz-pire, posoli i pobiberi, pa sve prebaci u tepsiju.', 'Add the rice, paprika and tomato paste, season and tip everything into a baking dish.'],
      ['Nalij 600 ml vruće vode i peci na 190 °C 35 minuta, dok riža ne upije tečnost.', 'Pour in 600 ml hot water and bake at 190 °C for 35 minutes, until the rice has absorbed the liquid.', 35],
      ['Pokapaj limunom prije služenja.', 'Squeeze over the lemon before serving.'],
    ],
    story: ['Zimsko posno jelo — praziluk postane sladak i mekan kao maslac.', 'A winter fasting dish — the leeks turn sweet and soft as butter.'],
    src: T,
  },
  // ───────── bugarska ─────────
  {
    id: 'tarator', cu: 'bugarska', type: 'soup', main: 'veg', time: 15, serves: 4, light: 1,
    bs: 'Hladna čorba od kiselog mlijeka i krastavca', en: 'Cold yoghurt and cucumber soup',
    ing: [['yogurt', 800, 'g'], ['cucumber', 2, 'kom'], ['walnuts', 60, 'g'], ['garlic', 2, 'cen'], ['dill', 1, 'sop'], ['oil', 2, 'kasika'], ['salt', null, '']],
    st: [
      ['Krastavce sitno isijeci ili krupno izrendaj, bijeli luk zgnječi, orahe sitno isjeckaj.', 'Finely dice or coarsely grate the cucumbers, crush the garlic, chop the walnuts.'],
      ['Jogurt razrijedi s 300 ml hladne vode, umiješaj sve ostalo i posoli.', 'Thin the yoghurt with 300 ml cold water, stir in everything else and season.'],
      ['Ohladi u frižideru najmanje 30 minuta.', 'Chill in the fridge for at least 30 minutes.', 30],
    ],
    story: ['Ljetna čorba koja se ne kuha — služi se ledena, uz ručak u najvećoj vrućini.', 'A summer soup that is never cooked — served ice-cold with lunch on the hottest days.'],
    src: T,
  },
  {
    id: 'kupus-riza-svinjetina', cu: 'bugarska', type: 'main', main: 'pork', time: 120, serves: 6, eq: ['oven'], left: 1,
    bs: 'Kiseli kupus s rižom i svinjetinom u tepsiji', en: 'Baked sauerkraut with rice and pork',
    ing: [['pork_shoulder', 800, 'g'], ['sauerkraut_shred', 1, 'kg'], ['rice', 200, 'g'], ['onion', 1, 'glavica'], ['paprika_sweet', 2, 'kasicica'], ['oil', 4, 'kasika'], ['bay_leaf', 2, 'list'], ['pepper_black', null, '']],
    st: [
      ['Meso isijeci na kocke i zapeci na ulju, dodaj luk i papriku.', 'Cut the meat into cubes and brown it in the oil, then add the onion and paprika.', 10],
      ['U tepsiji izmiješaj kupus, rižu, meso i lovor. Nalij 700 ml vode.', 'Mix the sauerkraut, rice, meat and bay leaves in a baking dish. Pour in 700 ml water.'],
      ['Pokrij folijom i peci na 180 °C 75 minuta, pa otkrij i peci još 20 minuta.', 'Cover with foil and bake at 180 °C for 75 minutes, then uncover and bake 20 minutes more.', 95],
    ],
    story: ['Zimska tepsija od onoga što je u buretu i u frižideru — sutra je još bolja.', 'A winter bake from the sauerkraut barrel and the fridge — even better the next day.'],
    src: T,
  },
  {
    id: 'gusta-salata-jogurt', cu: 'bugarska', type: 'salad', main: 'veg', time: 15, serves: 4, light: 1,
    bs: 'Gusta salata od jogurta, krastavca i oraha', en: 'Thick yoghurt salad with cucumber and walnuts',
    ing: [['yogurt', 500, 'g', n('ocijeđen preko noći kroz gazu', 'strained overnight through muslin')], ['cucumber', 2, 'kom'], ['walnuts', 50, 'g'], ['garlic', 2, 'cen'], ['dill', 0.5, 'sop'], ['olive_oil', 1, 'kasika'], ['salt', null, '']],
    st: [
      ['Krastavce sitno isijeci i lagano posoli, pa ocijedi tečnost.', 'Dice the cucumbers finely, salt lightly and squeeze out the liquid.'],
      ['Umiješaj u gusti jogurt sa zgnječenim bijelim lukom, mirođijom i orasima.', 'Fold into the thick yoghurt with the crushed garlic, dill and walnuts.'],
      ['Pokapaj uljem i služi hladno, uz meso s roštilja ili hljeb.', 'Drizzle with oil and serve cold, with grilled meat or bread.'],
    ],
    story: ['Bijela salata kojom se počinje svaki ljetni ručak.', 'The white salad every summer lunch starts with.'],
    src: T,
  },
  // ───────── hrvatska ─────────
  {
    id: 'fritule', cu: 'hrvatska', type: 'dessert', sub: 'sitni', main: 'dessert', time: 60, serves: 6, kid: 1, occ: ['bozic', 'novagodina'],
    bs: 'Fritule s grožđicama', en: 'Fritule (small doughnuts with raisins)',
    ing: [['flour', 400, 'g'], ['eggs', 2, 'kom'], ['yogurt', 200, 'g'], ['milk', 150, 'ml'], ['sugar', 50, 'g'], ['yeast', 1, 'kesica'], ['raisins', 80, 'g'], ['lemon', 1, 'kom', n('rendana korica', 'grated zest')], ['oil', 600, 'ml', n('za prženje', 'for frying')], ['powder_sugar', 50, 'g'], ['salt', 1, 'prst']],
    st: [
      ['Kvasac razmuti u mlakom mlijeku sa šećerom. Dodaj jaja, jogurt, koricu limuna, so i brašno i umuti gusto tijesto.', 'Dissolve the yeast in the warm milk with the sugar. Add the eggs, yoghurt, lemon zest, salt and flour and beat to a thick batter.'],
      ['Umiješaj grožđice i ostavi pokriveno 40 minuta da naraste.', 'Stir in the raisins and leave covered for 40 minutes to rise.', 40],
      ['Kašičicom vadi tijesto u vruće ulje i prži fritule dok ne porumene. Ocijedi i pospi šećerom u prahu.', 'Drop teaspoons of batter into the hot oil and fry until golden. Drain and dust with icing sugar.', 15],
    ],
    story: ['Male mirisne kuglice koje se prže za praznike — nestanu prije nego se ohlade.', 'Small fragrant balls fried for the holidays — they vanish before they cool down.'],
    src: T,
  },
  // ───────── bosanska ─────────
  {
    id: 'bamija-janjetina', cu: 'bosanska', type: 'main', main: 'lamb', time: 100, serves: 4,
    bs: 'Bamija s janjetinom', en: 'Okra with lamb',
    ing: [['lamb', 600, 'g'], ['okra', 500, 'g'], ['onion', 2, 'glavica'], ['tomato', 2, 'kom'], ['vinegar', 3, 'kasika'], ['oil', 4, 'kasika'], ['paprika_sweet', 1, 'kasicica'], ['parsley', null, ''], ['salt', null, ''], ['pepper_black', null, '']],
    st: [
      ['Bamiji odreži peteljke, prelij sirćetom i ostavi 30 minuta da ne bude ljigava, pa isperi.', 'Trim the okra, cover with the vinegar and leave 30 minutes so it won’t be slimy, then rinse.', 30],
      ['Meso isijeci na komade i dinstaj s lukom na ulju 15 minuta, dodaj papriku i 500 ml vode i kuhaj 40 minuta.', 'Cut the lamb into pieces and cook with the onion in the oil for 15 minutes, add the paprika and 500 ml water and cook 40 minutes.', 55],
      ['Dodaj bamiju i paradajz na kocke i kuhaj još 25 minuta bez miješanja — samo protresi lonac.', 'Add the okra and diced tomatoes and cook 25 minutes more without stirring — just shake the pot.', 25],
      ['Pospi peršunom.', 'Sprinkle with parsley.'],
    ],
    story: ['Kasnoljetno jelo za goste — bamija se nekad nizala na konac i sušila za zimu.', 'A late-summer dish for guests — okra used to be strung on thread and dried for winter.'],
    src: T,
  },
  {
    id: 'sirnica', cu: 'bosanska', type: 'pie', main: 'cheese', time: 70, serves: 6, eq: ['oven'], kid: 1,
    bs: 'Sirnica (savijena)', en: 'Sirnica (rolled cheese pie)',
    ing: [['phyllo', 500, 'g'], ['cottage', 500, 'g'], ['feta', 200, 'g'], ['eggs', 3, 'kom'], ['sour_cream', 200, 'g'], ['oil', 150, 'ml'], ['salt', null, '']],
    st: [
      ['Mladi i bijeli sir izmiješaj s jajima i pavlakom. Posoli po ukusu.', 'Mix the cottage cheese and white cheese with the eggs and sour cream. Salt to taste.'],
      ['Svaku jufku poprskaj uljem, nanesi traku nadjeva uz rub i savij u rolu, pa je zavij u puž u nauljenoj tepsiji.', 'Sprinkle each sheet with oil, spread a line of filling along the edge, roll it up and coil it into a spiral in an oiled tin.'],
      ['Odozgo pokapaj uljem i peci na 200 °C oko 40 minuta.', 'Drizzle with oil and bake at 200 °C for about 40 minutes.', 40],
      ['Kad izvadiš, poprskaj s malo vode i pokrij krpom 10 minuta da omekša.', 'When it comes out, sprinkle with a little water and cover with a cloth for 10 minutes to soften.', 10],
    ],
    story: ['Pita koju djeca biraju prvu — mekana iznutra, hrskava odozgo.', 'The pie children pick first — soft inside, crisp on top.'],
    src: T,
  },
  {
    id: 'kalja', cu: 'bosanska', type: 'main', main: 'lamb', time: 120, serves: 6, left: 1, eqOpt: ['pressure'],
    bs: 'Kalja (kupus s janjetinom i krompirom)', en: 'Kalja (cabbage with lamb and potatoes)',
    ing: [['lamb', 700, 'g'], ['cabbage', 1, 'kg'], ['potato', 500, 'g'], ['onion', 2, 'glavica'], ['garlic', 2, 'cen'], ['paprika_sweet', 2, 'kasicica'], ['oil', 4, 'kasika'], ['bay_leaf', 2, 'list'], ['salt', null, ''], ['pepper_black', null, '']],
    st: [
      ['Janjetinu isijeci na komade i dinstaj s lukom na ulju 15 minuta.', 'Cut the lamb into pieces and cook it with the onion in the oil for 15 minutes.', 15],
      ['Dodaj papriku, lovor i 1 l vode i kuhaj 45 minuta.', 'Add the paprika, bay leaves and 1 l water and cook for 45 minutes.', 45],
      ['Ubaci kupus isječen na krupne komade i krompir na kocke, posoli i kuhaj još 40 minuta.', 'Add the cabbage in large chunks and the diced potatoes, season and cook 40 minutes more.', 40],
      ['Pred kraj dodaj zgnječeni bijeli luk.', 'Stir in the crushed garlic near the end.'],
    ],
    story: ['Jesenji lonac od svježeg kupusa — kuha se dugo i jede s kiselim mlijekom.', 'An autumn pot of fresh cabbage — slow-cooked and eaten with soured milk.'],
    src: T,
  },
  {
    id: 'pita-visnje', cu: 'bosanska', type: 'dessert', sub: 'kolac', main: 'dessert', time: 60, serves: 8, eq: ['oven'], kid: 1,
    bs: 'Pita s višnjama', en: 'Sour cherry pie (with phyllo)',
    ing: [['phyllo', 500, 'g'], ['sour_cherries', 700, 'g', n('ocijeđene', 'drained')], ['sugar', 200, 'g'], ['breadcrumbs', 4, 'kasika'], ['oil', 120, 'ml'], ['powder_sugar', 30, 'g'], ['vanilla_sugar', 1, 'kesica']],
    st: [
      ['Višnje izmiješaj sa šećerom i vanilin šećerom.', 'Mix the cherries with the sugar and vanilla sugar.'],
      ['Svaku jufku poprskaj uljem, pospi prezlama, nanesi višnje uz rub i savij u rolu. Role složi u nauljenu tepsiju.', 'Sprinkle each sheet with oil and breadcrumbs, lay cherries along the edge and roll up. Arrange the rolls in an oiled tin.'],
      ['Peci na 200 °C oko 35 minuta. Ohlađenu pospi šećerom u prahu.', 'Bake at 200 °C for about 35 minutes. Dust with icing sugar once cool.', 35],
    ],
    story: ['Kiselo-slatka pita za ljetne poslijepodneve — višnje iz zamrzivača rade isto.', 'A sweet-and-sour pie for summer afternoons — cherries from the freezer do the job just as well.'],
    src: T,
  },
  // ───────── srpska ─────────
  {
    id: 'podvarak-piletina', cu: 'srpska', type: 'main', main: 'chicken', time: 120, serves: 4, eq: ['oven'],
    bs: 'Podvarak s piletinom', en: 'Baked sauerkraut with chicken',
    ing: [['chicken_legs', 1.2, 'kg'], ['sauerkraut_shred', 1, 'kg'], ['onion', 2, 'glavica'], ['paprika_sweet', 2, 'kasicica'], ['oil', 4, 'kasika'], ['bay_leaf', 2, 'list'], ['pepper_black', null, ''], ['salt', null, '']],
    st: [
      ['Luk pirjaj na ulju 10 minuta, dodaj papriku i kupus i dinstaj još 10 minuta.', 'Cook the onion in the oil for 10 minutes, add the paprika and sauerkraut and cook 10 minutes more.', 20],
      ['Kupus prebaci u tepsiju, dodaj lovor i 300 ml vode, a odozgo poslaži posoljene pileće batke.', 'Tip the sauerkraut into a baking dish with the bay leaves and 300 ml water; lay the salted chicken legs on top.'],
      ['Peci na 190 °C oko 80 minuta, dok piletina ne porumeni a kupus ne upije sok.', 'Bake at 190 °C for about 80 minutes, until the chicken is golden and the sauerkraut has soaked up the juices.', 80],
    ],
    story: ['Zimsko jelo iz rerne — kupus upije sav sok od mesa.', 'A winter oven dish — the sauerkraut soaks up all the juices from the meat.'],
    src: T,
  },
  {
    id: 'pljeskavica', cu: 'srpska', type: 'main', main: 'beef', time: 40, serves: 4, grill: 1, eqOpt: ['grill'], kid: 1,
    bs: 'Pljeskavica s lukom i hljebom', en: 'Pljeskavica (grilled meat patty) with onion and bread',
    ing: [['mixed_mince', 800, 'g', n('ili samo junetina', 'or beef only')], ['onion', 2, 'glavica'], ['garlic', 2, 'cen'], ['paprika_hot', 1, 'prst'], ['bread', 4, 'kom', n('lepinje ili zemičke', 'flatbreads or rolls')], ['kajmak', 100, 'g', O], ['salt', null, ''], ['pepper_black', null, '']],
    st: [
      ['Meso izmiješaj s jednim sitno sjeckanim lukom, bijelim lukom, solju, biberom i ljutom paprikom. Ostavi u frižideru 30 minuta.', 'Mix the mince with one finely chopped onion, the garlic, salt, pepper and hot paprika. Rest in the fridge 30 minutes.', 30],
      ['Oblikuj 4 tanke, široke pljeskavice.', 'Shape 4 thin, wide patties.'],
      ['Peci na roštilju ili u jako vreloj tavi po 4 minute sa svake strane.', 'Grill or cook in a very hot pan for 4 minutes on each side.', 8],
      ['Služi u hljebu sa sirovim lukom i po želji kajmakom.', 'Serve in the bread with raw onion and kajmak if you like.'],
    ],
    story: ['Velika, tanka i sočna — glavno jelo svakog roštilja.', 'Big, thin and juicy — the star of every barbecue.'],
    src: T,
  },
  {
    id: 'proja-sir', cu: 'srpska', type: 'pie', main: 'cheese', time: 50, serves: 6, eq: ['oven'], kid: 1,
    bs: 'Proja sa sirom', en: 'Cornbread with white cheese',
    ing: [['cornmeal', 300, 'g'], ['flour', 100, 'g'], ['eggs', 3, 'kom'], ['yogurt', 300, 'g'], ['oil', 100, 'ml'], ['feta', 200, 'g'], ['baking_powder', 1, 'kesica'], ['salt', 1, 'kasicica']],
    st: [
      ['Jaja umuti s jogurtom, uljem i 200 ml vode.', 'Whisk the eggs with the yoghurt, oil and 200 ml water.'],
      ['Dodaj kukuruzno brašno, brašno, prašak za pecivo i so, pa umiješaj izmrvljeni sir.', 'Add the cornmeal, flour, baking powder and salt, then fold in the crumbled cheese.'],
      ['Izlij u nauljenu tepsiju i peci na 200 °C oko 35 minuta.', 'Pour into an oiled tin and bake at 200 °C for about 35 minutes.', 35],
    ],
    story: ['Brza pita od kukuruznog brašna — uz kiselo mlijeko je cijeli obrok.', 'A quick cornmeal bake — with soured milk it is a whole meal.'],
    src: T,
  },
  {
    id: 'tikvenik', cu: 'srpska', type: 'dessert', sub: 'kolac', main: 'dessert', time: 75, serves: 8, eq: ['oven'], kid: 1,
    bs: 'Pita od bundeve (tikvenik)', en: 'Pumpkin pie with phyllo (tikvenik)',
    ing: [['pumpkin', 1, 'kg', n('očišćena', 'peeled and seeded')], ['phyllo', 500, 'g'], ['sugar', 200, 'g'], ['walnuts', 100, 'g'], ['cinnamon', 2, 'kasicica'], ['oil', 120, 'ml'], ['powder_sugar', 30, 'g']],
    st: [
      ['Bundevu krupno izrendaj i izmiješaj sa šećerom, cimetom i sjeckanim orasima.', 'Coarsely grate the pumpkin and mix with the sugar, cinnamon and chopped walnuts.'],
      ['Svaku jufku poprskaj uljem, nanesi nadjev i savij u rolu. Role složi u nauljenu tepsiju.', 'Sprinkle each sheet with oil, spread with filling and roll up. Arrange the rolls in an oiled tin.'],
      ['Peci na 200 °C oko 40 minuta, ohladi i pospi šećerom u prahu.', 'Bake at 200 °C for about 40 minutes, cool and dust with icing sugar.', 40],
    ],
    story: ['Jesenja slatka pita — miris cimeta i bundeve po cijeloj kući.', 'A sweet autumn pie — cinnamon and pumpkin filling the whole house.'],
    src: T,
  },
  // ───────── madjarska ─────────
  {
    id: 'krompir-paprikas', cu: 'madjarska', type: 'main', main: 'potato', time: 50, serves: 4, kid: 1,
    bs: 'Krompir-paprikaš s kobasicom', en: 'Potato paprikash with sausage',
    ing: [['potato', 1.2, 'kg'], ['kranjska', 300, 'g', n('ili druga kobasica', 'or another sausage')], ['onion', 2, 'glavica'], ['pepper', 1, 'kom'], ['tomato', 1, 'kom'], ['paprika_sweet', 1, 'kasika'], ['oil', 4, 'kasika'], ['salt', null, ''], ['pepper_black', null, '']],
    st: [
      ['Luk sitno isijeci i pirjaj na ulju 10 minuta, dodaj papriku i paradajz na kocke.', 'Chop the onion finely and cook in the oil for 10 minutes, then add the diced pepper and tomato.', 10],
      ['Skloni s vatre, umiješaj alevu papriku, dodaj krompir na kocke i 800 ml vode.', 'Off the heat, stir in the paprika, add the diced potatoes and 800 ml water.'],
      ['Kuhaj 20 minuta, dodaj kobasicu na kolutove i kuhaj još 10 minuta dok krompir ne zgusne sos.', 'Cook for 20 minutes, add the sliced sausage and cook 10 minutes more until the potatoes thicken the sauce.', 30],
    ],
    story: ['Brzo radno jelo iz jednog lonca — puno aleve paprike, malo posla.', 'A quick one-pot weekday dish — plenty of paprika, little work.'],
    src: T,
  },
  {
    id: 'slojeviti-krompir', cu: 'madjarska', type: 'main', main: 'potato', time: 80, serves: 6, eq: ['oven'], left: 1,
    bs: 'Slojeviti krompir s jajima, kobasicom i pavlakom', en: 'Layered potato bake with eggs, sausage and sour cream',
    ing: [['potato', 1.2, 'kg'], ['eggs', 6, 'kom'], ['kranjska', 250, 'g'], ['sour_cream', 400, 'g'], ['butter', 40, 'g'], ['paprika_sweet', 1, 'kasicica'], ['salt', null, ''], ['pepper_black', null, '']],
    st: [
      ['Krompir u ljusci skuhaj 25 minuta, a jaja 10 minuta. Oguli i isijeci na kolutove.', 'Boil the potatoes in their skins for 25 minutes and the eggs for 10. Peel and slice both.', 25],
      ['U namašćenu tepsiju slaži redom krompir, jaja i kobasicu, svaki red posoli i premaži pavlakom.', 'Layer potatoes, eggs and sausage in a buttered dish, salting each layer and spreading it with sour cream.'],
      ['Završi krompirom i pavlakom, pospi alevom paprikom i listićima maslaca. Peci na 200 °C 30 minuta.', 'Finish with potatoes and sour cream, sprinkle with paprika and dot with butter. Bake at 200 °C for 30 minutes.', 30],
    ],
    story: ['Nedjeljna tepsija koju je lako napraviti dan ranije.', 'A Sunday bake that is easy to make a day ahead.'],
    src: T,
  },
  {
    id: 'tjestenina-sir-slanina', cu: 'madjarska', type: 'main', main: 'pasta', time: 25, serves: 4, kid: 1,
    bs: 'Tjestenina sa svježim sirom, pavlakom i slaninom', en: 'Pasta with fresh curd cheese, sour cream and bacon',
    ing: [['pasta_short', 400, 'g', n('široki rezanci ili kockice', 'wide noodles or squares')], ['cottage', 400, 'g'], ['sour_cream', 250, 'g'], ['bacon', 150, 'g'], ['salt', null, '']],
    st: [
      ['Tjesteninu skuhaj u slanoj vodi.', 'Cook the pasta in salted water.', 10],
      ['Slaninu isijeci na kockice i prži dok ne postane hrskava.', 'Dice the bacon and fry until crisp.', 8],
      ['Vruću tjesteninu izmiješaj s malo masnoće od slanine, pa odozgo stavi sir, pavlaku i slaninu.', 'Toss the hot pasta with a little bacon fat, then top with the curd cheese, sour cream and bacon.'],
    ],
    story: ['Jelo od tri sastojka koje se pravi za 20 minuta — omiljeno studentima i djeci.', 'A three-ingredient dish made in 20 minutes — a favourite of students and children.'],
    src: T,
  },
  // ───────── grcka ─────────
  {
    id: 'cobra-grah-paradajz', cu: 'grcka', type: 'soup', main: 'beans', time: 120, serves: 6, left: 1, eqOpt: ['pressure'],
    bs: 'Čorba od graha s paradajzom i maslinovim uljem', en: 'Bean soup with tomato and olive oil',
    ing: [['beans', 400, 'g', n('namočen preko noći', 'soaked overnight')], ['onion', 2, 'glavica'], ['carrot', 2, 'kom'], ['celery_stalk', 2, 'kom'], ['tomato_can', 400, 'g'], ['olive_oil', 100, 'ml'], ['bay_leaf', 2, 'list'], ['oregano', 1, 'kasicica'], ['salt', null, ''], ['pepper_black', null, '']],
    st: [
      ['Grah kuhaj u svježoj vodi 30 minuta, pa ocijedi.', 'Boil the beans in fresh water for 30 minutes, then drain.', 30],
      ['Na maslinovom ulju pirjaj luk, mrkvu i celer na kockice 10 minuta, dodaj paradajz.', 'Cook the diced onion, carrot and celery in the olive oil for 10 minutes, then add the tomatoes.', 10],
      ['Dodaj grah, lovor i 2 l vode i kuhaj na tihoj vatri 60 minuta, dok grah ne omekša.', 'Add the beans, bay leaves and 2 l water and simmer for 60 minutes, until the beans are tender.', 60],
      ['Posoli tek na kraju, začini origanom i biberom.', 'Salt only at the end; season with oregano and pepper.'],
    ],
    story: ['Posna čorba koja se nekad kuhala svake sedmice — gusta, crvena i mirisna.', 'A fasting soup once cooked every week — thick, red and fragrant.'],
    src: T,
  },
  {
    id: 'spinat-riza-kopar', cu: 'grcka', type: 'main', main: 'spinach', time: 40, serves: 4, light: 1,
    bs: 'Špinat s rižom, mirođijom i limunom', en: 'Spinach with rice, dill and lemon',
    ing: [['spinach', 1, 'kg'], ['rice', 200, 'g'], ['spring_onion', 1, 'sop'], ['dill', 1, 'sop'], ['olive_oil', 80, 'ml'], ['lemon', 1, 'kom'], ['feta', 150, 'g', O], ['salt', null, ''], ['pepper_black', null, '']],
    st: [
      ['Mladi luk pirjaj na ulju 5 minuta, dodaj rižu i prži još 2 minute.', 'Cook the spring onions in the oil for 5 minutes, add the rice and fry 2 minutes more.', 5],
      ['Dodaj krupno sjeckan špinat i mirođiju, 500 ml vruće vode i so.', 'Add the roughly chopped spinach and dill, 500 ml hot water and salt.'],
      ['Kuhaj poklopljeno 20 minuta dok riža ne omekša. Prelij limunovim sokom; po želji služi s bijelim sirom.', 'Cook covered for 20 minutes until the rice is tender. Squeeze over the lemon; serve with white cheese if you like.', 20],
    ],
    story: ['Proljetno posno jelo — zeleno, kiselkasto i lagano.', 'A spring fasting dish — green, tangy and light.'],
    src: T,
  },
  {
    id: 'salata-paradajz-masline-sir', cu: 'grcka', type: 'salad', main: 'veg', time: 10, serves: 4, light: 1,
    bs: 'Salata od paradajza, krastavca, maslina i sira', en: 'Tomato, cucumber, olive and cheese salad',
    ing: [['tomato', 4, 'kom'], ['cucumber', 1, 'kom'], ['pepper', 1, 'kom'], ['onion', 1, 'glavica', n('crveni', 'red')], ['olives', 80, 'g'], ['feta', 200, 'g', n('u jednom komadu', 'in one piece')], ['olive_oil', 4, 'kasika'], ['oregano', 1, 'kasicica'], ['salt', null, '']],
    st: [
      ['Paradajz i krastavac isijeci na krupne komade, papriku i luk na kolutove.', 'Cut the tomatoes and cucumber into chunks, the pepper and onion into rings.'],
      ['Posoli, dodaj masline, a odozgo stavi komad sira.', 'Salt, add the olives and lay the piece of cheese on top.'],
      ['Prelij maslinovim uljem i pospi origanom.', 'Pour over the olive oil and sprinkle with oregano.'],
    ],
    story: ['Ljetna salata bez zelene salate — sir se ne mrvi, nego ide u komadu.', 'A summer salad without lettuce — the cheese is not crumbled but goes on in one piece.'],
    src: T,
  },
  // ───────── turska ─────────
  {
    id: 'corba-crvena-leca', cu: 'turska', type: 'soup', main: 'veg', time: 40, serves: 4, light: 1, kid: 1,
    bs: 'Čorba od crvene leće', en: 'Red lentil soup',
    ing: [['lentils', 250, 'g', n('crvena', 'red')], ['onion', 1, 'glavica'], ['carrot', 1, 'kom'], ['potato', 1, 'kom'], ['tomato_paste', 1, 'kasika'], ['oil', 3, 'kasika'], ['paprika_sweet', 1, 'kasicica'], ['mint_dry', 1, 'kasicica'], ['lemon', 1, 'kom'], ['salt', null, '']],
    st: [
      ['Luk, mrkvu i krompir isijeci na kockice i pirjaj na ulju 5 minuta. Dodaj paradajz-pire.', 'Dice the onion, carrot and potato and cook in the oil for 5 minutes. Add the tomato paste.', 5],
      ['Dodaj opranu leću i 1,5 l vode, kuhaj 25 minuta.', 'Add the rinsed lentils and 1.5 l water and cook for 25 minutes.', 25],
      ['Izmiksaj u glatku čorbu i posoli.', 'Blend until smooth and season.'],
      ['Na malo ulja kratko zagrij papriku i nanu i prelij preko tanjira. Služi s kriškom limuna.', 'Briefly warm the paprika and mint in a little oil and drizzle over each bowl. Serve with a lemon wedge.'],
    ],
    story: ['Čorba za hladna jutra i iftar — gotova za pola sata.', 'A soup for cold mornings and iftar — ready in half an hour.'],
    src: T,
  },
  {
    id: 'slanutak-meso', cu: 'turska', type: 'main', main: 'beef', time: 120, serves: 6, left: 1, eqOpt: ['pressure'],
    bs: 'Slanutak s junetinom i paradajzom', en: 'Chickpeas with beef and tomato',
    ing: [['chickpeas', 400, 'g', n('namočen preko noći', 'soaked overnight')], ['beef', 500, 'g'], ['onion', 2, 'glavica'], ['pepper', 1, 'kom'], ['tomato_paste', 2, 'kasika'], ['butter', 30, 'g'], ['oil', 3, 'kasika'], ['paprika_sweet', 1, 'kasicica'], ['salt', null, ''], ['pepper_black', null, '']],
    st: [
      ['Slanutak kuhaj u svježoj vodi 60 minuta, ocijedi.', 'Boil the chickpeas in fresh water for 60 minutes and drain.', 60],
      ['Meso na kockice zapeci na ulju i maslacu, dodaj luk i papriku i pirjaj 10 minuta.', 'Brown the diced beef in the oil and butter, add the onion and pepper and cook 10 minutes.', 10],
      ['Dodaj paradajz-pire, alevu papriku, slanutak i 800 ml vode. Kuhaj na tihoj vatri 45 minuta.', 'Add the tomato paste, paprika, chickpeas and 800 ml water. Simmer for 45 minutes.', 45],
      ['Služi s rižom ili hljebom.', 'Serve with rice or bread.'],
    ],
    story: ['Gusto varivo koje se kuha u velikim loncima — za cijelu porodicu i još za sutra.', 'A thick stew cooked in big pots — for the whole family and tomorrow too.'],
    src: T,
  },
  {
    id: 'ravanija', cu: 'turska', type: 'dessert', sub: 'orijentalni', main: 'dessert', time: 70, serves: 10, eq: ['oven'], occ: ['bajram', 'iftar'],
    bs: 'Ravanija (griz kolač u sirupu)', en: 'Ravanija (semolina cake in syrup)',
    ing: [['semolina', 250, 'g'], ['flour', 100, 'g'], ['eggs', 4, 'kom'], ['sugar', 500, 'g', n('150 g za tijesto, ostalo za sirup', '150 g for the cake, the rest for the syrup')], ['yogurt', 200, 'g'], ['oil', 100, 'ml'], ['baking_powder', 1, 'kesica'], ['lemon', 1, 'kom']],
    st: [
      ['Za sirup skuhaj 350 g šećera, 500 ml vode i nekoliko kriški limuna 10 minuta pa ohladi.', 'For the syrup boil 350 g sugar, 500 ml water and a few lemon slices for 10 minutes, then cool.', 10],
      ['Jaja umuti s 150 g šećera, dodaj jogurt, ulje, griz, brašno, prašak i koricu limuna.', 'Beat the eggs with 150 g sugar, add the yoghurt, oil, semolina, flour, baking powder and lemon zest.'],
      ['Peci u nauljenoj tepsiji na 180 °C oko 35 minuta.', 'Bake in an oiled tin at 180 °C for about 35 minutes.', 35],
      ['Vruć kolač isijeci na kocke i prelij hladnim sirupom. Ostavi da upije bar 2 sata.', 'Cut the hot cake into squares and pour over the cold syrup. Leave to soak for at least 2 hours.', 120],
    ],
    story: ['Sočan kolač za Bajram i iftar — hladan sirup na vruć kolač.', 'A juicy cake for Bajram and iftar — cold syrup on a hot cake.'],
    src: T,
  },
  // ───────── svakodnevno: salate i slatko ─────────
  {
    id: 'salata-cvekla', cu: 'svakodnevno', type: 'salad', main: 'veg', time: 70, serves: 4, light: 1,
    bs: 'Salata od cvekle s bijelim lukom', en: 'Beetroot salad with garlic',
    ing: [['beetroot', 4, 'kom'], ['garlic', 2, 'cen'], ['vinegar', 3, 'kasika'], ['oil', 2, 'kasika'], ['caraway', 1, 'prst', O], ['salt', null, '']],
    st: [
      ['Cveklu skuhaj u ljusci oko 50 minuta dok ne omekša.', 'Boil the beetroot in their skins for about 50 minutes until tender.', 50],
      ['Oguli je, isijeci na tanke kriške ili izrendaj.', 'Peel and slice thinly or grate.'],
      ['Začini sirćetom, uljem, zgnječenim bijelim lukom i solju. Ostavi bar sat u frižideru.', 'Dress with the vinegar, oil, crushed garlic and salt. Leave for at least an hour in the fridge.', 60],
    ],
    story: ['Zimska salata uz pečenje i grah — sutradan je još ukusnija.', 'A winter salad for roasts and beans — even tastier the next day.'],
    src: T,
  },
  {
    id: 'salata-kupus-mrkva', cu: 'svakodnevno', type: 'salad', main: 'veg', time: 15, serves: 4, light: 1, kid: 1,
    bs: 'Salata od kupusa i mrkve', en: 'Cabbage and carrot slaw',
    ing: [['cabbage', 500, 'g'], ['carrot', 2, 'kom'], ['vinegar', 3, 'kasika'], ['oil', 3, 'kasika'], ['sugar', 1, 'kasicica'], ['salt', 1, 'kasicica'], ['pepper_black', null, '']],
    st: [
      ['Kupus tanko isijeci, posoli i dobro izgnječi rukama da pusti sok.', 'Shred the cabbage finely, salt it and squeeze it well with your hands until it releases its juice.'],
      ['Dodaj izrendanu mrkvu, sirće, ulje, šećer i biber i promiješaj.', 'Add the grated carrot, vinegar, oil, sugar and pepper and toss.'],
      ['Ostavi 10 minuta prije služenja.', 'Leave for 10 minutes before serving.', 10],
    ],
    story: ['Hrskava salata za svaki dan i svako godišnje doba.', 'A crunchy salad for every day and every season.'],
    src: T,
  },
  {
    id: 'pecene-paprike-salata', cu: 'svakodnevno', type: 'salad', main: 'veg', time: 45, serves: 4, light: 1, eq: ['oven'],
    bs: 'Pečene paprike s bijelim lukom', en: 'Roasted peppers with garlic',
    ing: [['pepper', 8, 'kom'], ['garlic', 3, 'cen'], ['vinegar', 2, 'kasika'], ['oil', 4, 'kasika'], ['parsley', null, ''], ['salt', null, '']],
    st: [
      ['Paprike peci na 220 °C oko 30 minuta, okrećući ih, dok kožica ne pocrni.', 'Roast the peppers at 220 °C for about 30 minutes, turning, until the skins blacken.', 30],
      ['Stavi ih u posudu pokrivenu tanjirom 10 minuta, pa im skini kožicu i sjemenke.', 'Put them in a covered bowl for 10 minutes, then peel and seed them.', 10],
      ['Prelij uljem, sirćetom, sjeckanim bijelim lukom, solju i peršunom.', 'Dress with the oil, vinegar, chopped garlic, salt and parsley.'],
    ],
    story: ['Kasnoljetna salata kad paprike pune pijacu — miris pečenja po cijeloj ulici.', 'A late-summer salad when peppers fill the market — the smell of roasting all down the street.'],
    src: T,
  },
  {
    id: 'medenjaci', cu: 'svakodnevno', type: 'dessert', sub: 'sitni', main: 'dessert', time: 50, serves: 10, eq: ['oven'], kid: 1, occ: ['bozic', 'novagodina'],
    bs: 'Medenjaci', en: 'Honey biscuits',
    ing: [['flour', 500, 'g'], ['honey', 200, 'g'], ['sugar', 100, 'g'], ['butter', 80, 'g'], ['eggs', 2, 'kom'], ['cinnamon', 2, 'kasicica'], ['cloves', 0.5, 'kasicica', n('mljeveni', 'ground')], ['baking_powder', 1, 'kesica'], ['powder_sugar', 50, 'g', O]],
    st: [
      ['Med, šećer i maslac zagrij dok se ne otope, pa ohladi da bude mlako.', 'Warm the honey, sugar and butter until melted, then cool until lukewarm.'],
      ['Dodaj jaja, začine, prašak i brašno i zamijesi glatko tijesto. Ostavi pokriveno 30 minuta.', 'Add the eggs, spices, baking powder and flour and knead a smooth dough. Leave covered for 30 minutes.', 30],
      ['Razvij na 5 mm, vadi oblike i peci na 180 °C 10–12 minuta.', 'Roll to 5 mm, cut out shapes and bake at 180 °C for 10–12 minutes.', 12],
      ['Po želji ukrasi glazurom od šećera u prahu i par kapi vode.', 'Decorate with icing made from icing sugar and a few drops of water if you like.'],
    ],
    story: ['Mirisni kolačići koji traju sedmicama — a djeca ih ukrašavaju.', 'Spiced biscuits that keep for weeks — and children love decorating them.'],
    src: T,
  },
];
