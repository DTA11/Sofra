// Ingredient catalogue.
// sec: store section · st: staple (pre-ticked in pantry) · z: zimnica · p: perishable (planner tries to reuse it)
// kind: meat/protein group used by planner rules · m: months in season (1–12)
// prod: store-bought product (long-life stock) · mt: meat product outside 'meat' · dy: contains dairy · drink: tea/coffee
const SUMMER = [6, 7, 8, 9];
const LATE = [7, 8, 9, 10];
const WINTER = [10, 11, 12, 1, 2, 3];
const ALL = null;

const list = [
  // Meso i riba
  ['beef', 'Junetina', 'Beef', 'meat', { p: 1, kind: 'beef' }],
  ['beef_mince', 'Mljevena junetina', 'Minced beef', 'meat', { p: 1, kind: 'beef' }],
  ['veal', 'Teletina', 'Veal', 'meat', { p: 1, kind: 'beef' }],
  ['lamb', 'Janjetina', 'Lamb', 'meat', { p: 1, kind: 'lamb' }],
  ['chicken', 'Piletina (cijelo pile)', 'Whole chicken', 'meat', { p: 1, kind: 'chicken' }],
  ['chicken_legs', 'Pileći batci', 'Chicken legs', 'meat', { p: 1, kind: 'chicken' }],
  ['chicken_breast', 'Pileća prsa', 'Chicken breast', 'meat', { p: 1, kind: 'chicken' }],
  ['chicken_wings', 'Pileća krilca', 'Chicken wings', 'meat', { p: 1, kind: 'chicken' }],
  ['turkey', 'Puretina', 'Turkey', 'meat', { p: 1, kind: 'chicken' }],
  ['smoked_beef', 'Suho goveđe meso', 'Smoked dried beef', 'deli', { kind: 'beef', mt: 1, prod: 1 }],
  ['pork', 'Svinjetina', 'Pork', 'meat', { p: 1, kind: 'pork', pork: 1 }],
  ['pork_shoulder', 'Svinjska plećka', 'Pork shoulder', 'meat', { p: 1, kind: 'pork', pork: 1 }],
  ['pork_neck', 'Svinjski vrat', 'Pork neck (collar)', 'meat', { p: 1, kind: 'pork', pork: 1 }],
  ['pork_loin', 'Svinjska slabina (kare)', 'Pork loin', 'meat', { p: 1, kind: 'pork', pork: 1 }],
  ['bacon', 'Slanina', 'Bacon / lardons', 'meat', { kind: 'pork', pork: 1 }],
  ['guanciale', 'Guanciale ili pančeta', 'Guanciale or pancetta', 'meat', { kind: 'pork', pork: 1 }],
  ['trout', 'Pastrmka', 'Trout', 'meat', { p: 1, kind: 'fish' }],
  ['cod_dried', 'Bakalar (sušeni)', 'Salt cod', 'meat', { kind: 'fish' }],
  ['fish_white', 'Bijela riba', 'White fish', 'meat', { p: 1, kind: 'fish' }],
  ['squid', 'Lignje', 'Squid', 'meat', { p: 1, kind: 'fish' }],
  ['mackerel', 'Skuša', 'Mackerel', 'meat', { p: 1, kind: 'fish' }],
  ['sudzuk', 'Goveđi sudžuk', 'Beef sujuk sausage', 'deli', { kind: 'beef', mt: 1, prod: 1 }],
  ['tuna', 'Tunjevina (konzerva)', 'Tinned tuna', 'cans', { kind: 'fish', prod: 1 }],
  ['bones_beef', 'Goveđe kosti', 'Beef bones', 'meat', { p: 1 }],
  ['chicken_giblets', 'Pileća sitnež (vratovi, krilca)', 'Chicken necks & wings', 'meat', { p: 1, kind: 'chicken' }],
  ['lamb_offal', 'Janjeća glava i iznutrice', 'Lamb head & offal', 'meat', { p: 1, kind: 'lamb' }],
  ['mixed_mince', 'Mljeveno miješano meso (bez svinjetine)', 'Mixed minced meat (no pork)', 'meat', { p: 1, kind: 'beef' }],
  ['kranjska', 'Kranjska kobasica', 'Carniolan sausage (kranjska)', 'meat', { kind: 'pork', pork: 1 }],
  ['smoked_ribs', 'Suha svinjska rebra', 'Smoked pork ribs', 'meat', { kind: 'pork', pork: 1 }],
  ['cracklings', 'Čvarci', 'Pork cracklings', 'meat', { pork: 1 }],
  ['ham', 'Pršut ili šunka', 'Prosciutto or ham', 'deli', { kind: 'pork', pork: 1, mt: 1, prod: 1 }],
  ['venison_or_beef', 'Divljač (srnetina) ili junetina', 'Venison or beef', 'meat', { p: 1, kind: 'beef' }],

  // Voće i povrće
  ['onion', 'Crveni luk', 'Onion', 'veg', { st: 1 }],
  ['garlic', 'Bijeli luk', 'Garlic', 'veg', { st: 1 }],
  ['spring_onion', 'Mladi luk', 'Spring onion', 'veg', { p: 1, m: [3, 4, 5, 6] }],
  ['potato', 'Krompir', 'Potatoes', 'veg', { st: 1 }],
  ['carrot', 'Mrkva', 'Carrot', 'veg', { p: 1 }],
  ['parsnip', 'Paškanat', 'Parsnip', 'veg', { p: 1, m: WINTER }],
  ['celery', 'Celer (korijen)', 'Celeriac', 'veg', { p: 1, m: WINTER }],
  ['celery_stalk', 'Celer (stabljika)', 'Celery stalk', 'veg', { p: 1 }],
  ['leek', 'Praziluk', 'Leek', 'veg', { p: 1, m: WINTER }],
  ['pepper', 'Paprika (svježa)', 'Bell pepper', 'veg', { p: 1, m: SUMMER }],
  ['tomato', 'Paradajz', 'Tomatoes', 'veg', { p: 1, m: SUMMER }],
  ['zucchini', 'Tikvica', 'Courgette', 'veg', { p: 1, m: SUMMER }],
  ['eggplant', 'Patlidžan', 'Aubergine', 'veg', { p: 1, m: LATE }],
  ['cucumber', 'Krastavac', 'Cucumber', 'veg', { p: 1, m: SUMMER }],
  ['green_beans', 'Mahune (boranija)', 'Green beans', 'veg', { p: 1, m: SUMMER }],
  ['okra', 'Bamija', 'Okra', 'veg', { p: 1, m: LATE }],
  ['cabbage', 'Kupus (svježi)', 'Cabbage', 'veg', { p: 1, m: [8, 9, 10, 11, 12, 1, 2] }],
  ['spinach', 'Špinat', 'Spinach', 'veg', { p: 1, m: [3, 4, 5, 9, 10] }],
  ['chard', 'Blitva', 'Swiss chard', 'veg', { p: 1, m: [4, 5, 6, 9, 10] }],
  ['broccoli', 'Brokula', 'Broccoli', 'veg', { p: 1, m: [9, 10, 11, 12, 3, 4] }],
  ['cauliflower', 'Karfiol', 'Cauliflower', 'veg', { p: 1, m: [9, 10, 11, 12, 1, 3, 4] }],
  ['mushrooms', 'Šampinjoni', 'Mushrooms', 'veg', { p: 1 }],
  ['parsley', 'Peršun (list)', 'Parsley', 'veg', { p: 1 }],
  ['root_mix', 'Korjenasto povrće (mrkva, celer, peršun)', 'Root veg (carrot, celeriac, parsley root)', 'veg', { p: 1 }],
  ['parsley_root', 'Peršun (korijen i list)', 'Parsley root & leaves', 'veg', { p: 1 }],
  ['peas_fresh', 'Mladi grašak (svježi)', 'Fresh peas', 'veg', { p: 1, m: [5, 6] }],
  ['dill', 'Mirođija', 'Dill', 'veg', { p: 1 }],
  ['lettuce', 'Zelena salata', 'Lettuce', 'veg', { p: 1, m: [4, 5, 6, 9, 10] }],
  ['vine_leaves', 'Listovi vinove loze', 'Vine leaves', 'veg', { p: 1, m: [5, 6] }],
  ['chives', 'Vlasac', 'Chives', 'veg', { p: 1 }],
  ['kale', 'Raštan / raštika', 'Collard greens', 'veg', { p: 1, m: [10, 11, 12, 1, 2, 3] }],
  ['prunes', 'Suhe šljive', 'Prunes', 'dry', {}],
  ['lemon', 'Limun', 'Lemon', 'veg', { p: 1 }],
  ['apple', 'Jabuke', 'Apples', 'veg', { p: 1, m: [8, 9, 10, 11, 12, 1, 2] }],
  ['walnuts', 'Orasi', 'Walnuts', 'dry', {}],
  ['almonds', 'Bademi', 'Almonds', 'dry', {}],
  ['dates', 'Hurme', 'Dates', 'dry', {}],

  // Mliječni proizvodi i jaja
  ['eggs', 'Jaja', 'Eggs', 'dairy', { p: 1 }],
  ['milk', 'Mlijeko', 'Milk', 'dairy', { p: 1 }],
  ['butter', 'Maslac', 'Butter', 'dairy', { p: 1 }],
  ['kajmak', 'Kajmak', 'Kajmak', 'dairy', { p: 1 }],
  ['sour_cream', 'Pavlaka', 'Sour cream', 'dairy', { p: 1 }],
  ['yogurt', 'Jogurt', 'Yoghurt', 'dairy', { p: 1 }],
  ['cream', 'Slatko vrhnje', 'Cream', 'dairy', { p: 1 }],
  ['feta', 'Bijeli sir (feta)', 'White cheese (feta)', 'dairy', { p: 1 }],
  ['cottage', 'Mladi sir', 'Fresh cottage cheese', 'dairy', { p: 1 }],
  ['parmesan', 'Parmezan', 'Parmesan', 'dairy', {}],
  ['gruyere', 'Gruyère / tvrdi sir', 'Gruyère / hard cheese', 'dairy', {}],
  ['cheese_block', 'Polutvrdi sir (u komadu)', 'Semi-hard cheese (block)', 'dairy', { p: 1 }],
  ['mozzarella', 'Mozzarella', 'Mozzarella', 'dairy', { p: 1 }],
  ['mascarpone', 'Mascarpone', 'Mascarpone', 'dairy', { p: 1 }],

  // Pekara
  ['bread', 'Hljeb', 'Bread', 'bakery', { p: 1 }],
  ['phyllo', 'Jufke (kore za pitu)', 'Phyllo sheets', 'bakery', { p: 1 }],
  ['ladyfingers', 'Piškote', 'Ladyfingers', 'bakery', {}],
  ['puff_pastry', 'Lisnato tijesto', 'Puff pastry', 'frozen', {}],
  ['kadaif', 'Kadaif (tijesto u nitima)', 'Kataifi pastry', 'frozen', {}],

  // Suha roba
  ['flour', 'Brašno (meko)', 'Plain flour', 'dry', { st: 1 }],
  ['semolina', 'Griz', 'Semolina', 'dry', {}],
  ['cornmeal', 'Kukuruzno brašno', 'Cornmeal', 'dry', {}],
  ['oats', 'Zobene pahuljice', 'Rolled oats', 'dry', {}],
  ['rice', 'Riža', 'Rice', 'dry', { st: 1 }],
  ['soup_pasta', 'Uložak za supu (rezanci, riža, griz)', 'Soup pasta / rice / semolina', 'dry', {}],
  ['arborio', 'Riža za rižoto', 'Risotto rice', 'dry', {}],
  ['spaghetti', 'Špageti', 'Spaghetti', 'dry', {}],
  ['pasta_short', 'Kratka tjestenina', 'Short pasta', 'dry', {}],
  ['tagliatelle', 'Tagliatelle / široki rezanci', 'Tagliatelle', 'dry', {}],
  ['lasagne', 'Kore za lazanje', 'Lasagne sheets', 'dry', {}],
  ['gnocchi', 'Njoki (kupovni)', 'Gnocchi (shop-bought)', 'frozen', {}],
  ['beans', 'Grah (suhi, tetovac ili zrno)', 'Dried white beans', 'dry', {}],
  ['barley', 'Ječam (oljušteni)', 'Pearl barley', 'dry', {}],
  ['buckwheat', 'Heljda (zrno)', 'Buckwheat groats', 'dry', {}],
  ['buckwheat_flour', 'Heljdino brašno', 'Buckwheat flour', 'dry', {}],
  ['porcini', 'Vrganji (suhi)', 'Dried porcini', 'dry', {}],
  ['poppy', 'Mak (mljeveni)', 'Ground poppy seed', 'dry', {}],
  ['raisins', 'Grožđice', 'Raisins', 'dry', {}],
  ['coconut', 'Kokos (rendani)', 'Desiccated coconut', 'dry', {}],
  ['wafers', 'Kore za oblatne', 'Wafer sheets', 'dry', { prod: 1 }],
  ['biscuits', 'Obični keks (čajni)', 'Plain tea biscuits', 'dry', { prod: 1 }],
  ['pumpkin_oil', 'Bučino ulje', 'Pumpkin seed oil', 'dry', {}],
  ['sugar', 'Šećer', 'Sugar', 'dry', { st: 1 }],
  ['powder_sugar', 'Šećer u prahu', 'Icing sugar', 'dry', {}],
  ['vanilla_sugar', 'Vanilin šećer', 'Vanilla sugar', 'dry', {}],
  ['baking_powder', 'Prašak za pecivo', 'Baking powder', 'dry', {}],
  ['yeast', 'Kvasac', 'Yeast', 'dry', {}],
  ['honey', 'Med', 'Honey', 'spreads', { prod: 1 }],
  ['cocoa', 'Kakao', 'Cocoa', 'dry', {}],
  ['chocolate', 'Čokolada za kuhanje', 'Dark chocolate', 'dry', {}],
  ['coffee', 'Kafa (espresso)', 'Espresso', 'dry', {}],
  ['breadcrumbs', 'Prezle', 'Breadcrumbs', 'dry', {}],
  ['starch', 'Kukuruzni škrob', 'Cornflour', 'dry', {}],
  ['pudding', 'Puding od vanilije', 'Vanilla pudding powder', 'dry', {}],
  ['condensed_milk', 'Kondenzovano mlijeko (zaslađeno)', 'Sweetened condensed milk', 'dry', {}],
  ['oil', 'Ulje', 'Oil', 'dry', { st: 1 }],
  ['olive_oil', 'Maslinovo ulje', 'Olive oil', 'dry', { st: 1 }],
  ['lard_or_oil', 'Mast ili ulje', 'Lard or oil', 'dry', { st: 1 }],
  ['wine_red', 'Crno vino', 'Red wine', 'other', {}],
  ['wine_white', 'Bijelo vino', 'White wine', 'other', {}],
  ['vinegar', 'Sirće', 'Vinegar', 'dry', { st: 1 }],
  ['stock_cube', 'Domaći temeljac ili kocka', 'Stock (or cube)', 'dry', {}],

  // Začini
  ['salt', 'So', 'Salt', 'spice', { st: 1 }],
  ['pepper_black', 'Biber', 'Black pepper', 'spice', { st: 1 }],
  ['paprika_sweet', 'Aleva paprika (slatka)', 'Sweet paprika', 'spice', { st: 1 }],
  ['paprika_hot', 'Ljuta paprika (mljevena)', 'Hot paprika', 'spice', {}],
  ['bay_leaf', 'Lovorov list', 'Bay leaf', 'spice', { st: 1 }],
  ['vegeta', 'Začin za jela', 'All-purpose seasoning', 'spice', { st: 1 }],
  ['cinnamon', 'Cimet', 'Cinnamon', 'spice', {}],
  ['cloves', 'Klinčići', 'Cloves', 'spice', {}],
  ['nutmeg', 'Muškatni oraščić', 'Nutmeg', 'spice', {}],
  ['oregano', 'Origano', 'Oregano', 'spice', {}],
  ['thyme', 'Majčina dušica', 'Thyme', 'spice', {}],
  ['basil', 'Bosiljak', 'Basil', 'spice', {}],
  ['rosemary', 'Ruzmarin', 'Rosemary', 'spice', {}],
  ['saffron', 'Šafran', 'Saffron', 'spice', {}],
  ['chili', 'Čili (sušeni)', 'Dried chilli', 'spice', {}],
  ['mint_dry', 'Nana (sušena)', 'Dried mint', 'spice', {}],
  ['caraway', 'Kim', 'Caraway', 'spice', {}],
  ['marjoram', 'Mažuran', 'Marjoram', 'spice', {}],

  // Konzerve i tegle
  ['tomato_can', 'Pelat / paradajz u konzervi', 'Tinned tomatoes', 'cans', {}],
  ['tomato_paste', 'Paradajz pire (koncentrat)', 'Tomato paste', 'jar', { st: 1 }],
  ['mayonnaise', 'Majoneza', 'Mayonnaise', 'jar', {}],
  ['peas', 'Grašak', 'Peas', 'frozen', {}],
  ['corn', 'Kukuruz šećerac (konzerva)', 'Sweetcorn (tinned)', 'cans', { prod: 1 }],
  ['pickles', 'Kiseli krastavci', 'Pickled gherkins', 'jar', {}],
  ['olives', 'Masline', 'Olives', 'cans', { prod: 1 }],
  ['mustard', 'Senf', 'Mustard', 'jar', {}],
  ['horseradish', 'Ren (rendani)', 'Grated horseradish', 'jar', {}],

  // Zimnica
  ['ajvar', 'Ajvar', 'Ajvar', 'spreads', { z: 1 }],
  ['tursija', 'Turšija (miješana)', 'Turšija (mixed pickles)', 'jar', { z: 1 }],
  ['pekmez', 'Pekmez od šljiva', 'Plum butter (pekmez)', 'spreads', { z: 1 }],
  ['dzem', 'Džem / slatko', 'Jam', 'spreads', { z: 1 }],
  ['sauerkraut', 'Kiseli kupus (glavice)', 'Sauerkraut (whole heads)', 'jar', { z: 1 }],
  ['sauerkraut_shred', 'Kiseli kupus (ribani)', 'Shredded sauerkraut', 'jar', { z: 1 }],
  ['kisela_paprika', 'Kisela paprika', 'Pickled peppers', 'jar', { z: 1 }],
  ['domaci_sos', 'Domaći paradajz sos', 'Home-made tomato passata', 'jar', { z: 1 }],
  ['kompot', 'Kompot', 'Compote', 'jar', { z: 1 }],
  ['ljutenica', 'Ljutenica', 'Ljutenica', 'jar', { z: 1 }],
  ['pindjur', 'Pinđur', 'Pinđur', 'jar', { z: 1 }],
  ['sok_sipak', 'Sok od šipka / zove', 'Rosehip or elderflower syrup', 'jar', { z: 1 }],
  // Za zimnicu (sezonsko voće i povrće, krupna so, gorušica)
  ['pepper_red', 'Crvena paprika (babura, za pečenje)', 'Red peppers (for roasting)', 'veg', { p: 1, m: [8, 9, 10] }],
  ['plums', 'Šljive (svježe)', 'Plums (fresh)', 'veg', { p: 1, m: [8, 9, 10] }],
  ['apricots', 'Kajsije', 'Apricots', 'veg', { p: 1, m: [6, 7] }],
  ['strawberries', 'Jagode', 'Strawberries', 'veg', { p: 1, m: [5, 6] }],
  ['salt_coarse', 'Krupna so bez joda (za kiseljenje)', 'Coarse non-iodised salt (for pickling)', 'spice', {}],
  ['mustard_seed', 'Gorušica (zrno)', 'Mustard seed', 'spice', {}],
  // Mahunarke i povrće za nove recepte
  ['lentils', 'Leća (crvena ili smeđa)', 'Lentils (red or brown)', 'dry', {}],
  ['chickpeas', 'Slanutak (leblebija)', 'Chickpeas', 'dry', {}],
  ['pumpkin', 'Bundeva', 'Pumpkin', 'veg', { p: 1, m: [9, 10, 11, 12, 1] }],
  ['beetroot', 'Cvekla', 'Beetroot', 'veg', { p: 1 }],
  ['sour_cherries', 'Višnje (bez koštica, smrznute ili iz tegle)', 'Sour cherries (pitted, frozen or jarred)', 'frozen', {}],
  // Kupovni proizvodi — prod: dugotrajna zaliha (ostaje u ostavi dok je ne skineš)
  // mt: mesni proizvod izvan odjeljka mesa · dy: sadrži mlijeko (za posno)
  // Namazi
  ['marmalade', 'Marmelada', 'Marmalade', 'spreads', { prod: 1 }],
  ['maslo', 'Maslo (pročišćeni maslac)', 'Clarified butter', 'spreads', { prod: 1, dy: 1 }],
  ['margarine', 'Margarin', 'Margarine', 'spreads', { prod: 1 }],
  ['peanut_butter', 'Maslac od kikirikija', 'Peanut butter', 'spreads', { prod: 1 }],
  ['speculoos_spread', 'Zimski namaz sa spekulatiusom', 'Spiced biscuit spread', 'spreads', { prod: 1 }],
  ['choc_spread', 'Čokoladni namaz s lješnjacima', 'Chocolate hazelnut spread', 'spreads', { prod: 1, dy: 1 }],
  ['pate', 'Pašteta (jetrena ili pileća)', 'Pâté (liver or chicken)', 'spreads', { prod: 1, mt: 1 }],
  ['cheese_spread', 'Topljeni sir', 'Processed cheese', 'dairy', { prod: 1 }],
  // Delikatesa
  ['kulen', 'Kulen', 'Kulen (spicy cured sausage)', 'deli', { prod: 1, mt: 1, kind: 'pork', pork: 1 }],
  ['chicken_salami', 'Pileća salama (tanka)', 'Chicken salami', 'deli', { prod: 1, mt: 1, kind: 'chicken' }],
  ['parizer', 'Parizer (pileći)', 'Chicken luncheon sausage', 'deli', { prod: 1, mt: 1, kind: 'chicken' }],
  ['mortadela', 'Mortadela (goveđa ili pileća)', 'Mortadella (beef or chicken)', 'deli', { prod: 1, mt: 1, kind: 'beef' }],
  ['tea_sausage', 'Čajna kobasica', 'Dry tea sausage', 'deli', { prod: 1, mt: 1, kind: 'pork', pork: 1 }],
  ['hot_dogs', 'Hrenovke (pileće)', 'Chicken frankfurters', 'deli', { prod: 1, mt: 1, kind: 'chicken' }],
  // Konzerve
  ['sardines', 'Sardine (konzerva)', 'Tinned sardines', 'cans', { prod: 1, kind: 'fish' }],
  ['luncheon', 'Mesni doručak (konzerva)', 'Tinned luncheon meat', 'cans', { prod: 1, mt: 1, kind: 'pork', pork: 1 }],
  ['beans_can', 'Grah (konzerva, kuhani)', 'Tinned cooked beans', 'cans', { prod: 1 }],
  // Mliječno
  ['cheese_semi', 'Polutvrdi sir (narezani)', 'Sliced semi-hard cheese', 'dairy', { prod: 1 }],
  ['sour_milk', 'Kiselo mlijeko', 'Soured milk (kefir-style)', 'dairy', { prod: 1 }],
  // Pekara
  ['bread_whole', 'Integralni hljeb', 'Wholegrain bread', 'bakery', { prod: 1 }],
  // Voće
  ['banana', 'Banane', 'Bananas', 'veg', { prod: 1 }],
  ['orange', 'Narandže', 'Oranges', 'veg', { prod: 1 }],
  ['mandarin', 'Mandarine', 'Mandarins', 'veg', { prod: 1, m: [11, 12, 1, 2] }],
  ['pear', 'Kruške', 'Pears', 'veg', { prod: 1, m: [8, 9, 10, 11, 12, 1] }],
  ['grapes', 'Grožđe', 'Grapes', 'veg', { prod: 1, m: [8, 9, 10] }],
  // Čaj i kafa
  ['tea', 'Čaj (u kesicama)', 'Tea (bags)', 'dry', { prod: 1, drink: 1 }],
  ['coffee_ground', 'Mljevena kafa', 'Ground coffee', 'dry', { prod: 1, drink: 1 }],
];

// Which zimnica jar can stand in for which shop ingredient.
export const SUBSTITUTES = {
  tomato_can: ['domaci_sos'],
  tomato_paste: ['domaci_sos'],
  pickles: ['tursija'],
  dzem: ['pekmez', 'marmalade'],
  marmalade: ['dzem'],
  maslo: ['butter'],
  bread_whole: ['bread'],
  sour_milk: ['yogurt'],
  cheese_semi: ['gruyere', 'cheese_block'],
  cheese_block: ['cheese_semi'],
  sauerkraut_shred: ['sauerkraut'],
  ajvar: ['ljutenica', 'pindjur'],
};

// Order = a walk through the shop.
export const SECTIONS = ['veg', 'bakery', 'dairy', 'deli', 'meat', 'spreads', 'cans', 'jar', 'dry', 'spice', 'frozen', 'other'];

export const ING = Object.fromEntries(
  list.map(([id, bs, en, sec, f]) => [id, { id, bs, en, sec, ...f }])
);

// Other meats that work in the same dish — shown only in a recipe's ingredient list, "(ili …)".
// Recipes, nutrition and shopping stay as written.
export const MEAT_ALT = {
  beef: ['teletina, janjetina', 'veal, lamb'],
  beef_mince: ['mljevena teletina, miješano meso', 'minced veal, mixed mince'],
  veal: ['junetina', 'beef'],
  lamb: ['junetina, teletina', 'beef, veal'],
  chicken: ['pileći batci, karabataci', 'chicken legs, thighs'],
  chicken_legs: ['karabataci, cijelo pile', 'thighs, whole chicken'],
  chicken_breast: ['puretina', 'turkey'],
  turkey: ['pileća prsa', 'chicken breast'],
  pork: ['junetina, piletina', 'beef, chicken'],
  pork_shoulder: ['juneći vrat, pileći batci', 'beef chuck, chicken legs'],
  pork_neck: ['svinjska plećka, pileći batci', 'pork shoulder, chicken thighs'],
  pork_loin: ['svinjski vrat, teleći odresci', 'pork neck, veal steaks'],
  chicken_wings: ['pileći batci', 'chicken drumsticks'],
  bacon: ['suho goveđe meso', 'smoked dried beef'],
  smoked_ribs: ['suho goveđe meso', 'smoked dried beef'],
  kranjska: ['druga dimljena kobasica', 'another smoked sausage'],
};

// "Ne volimo" (Postavke): groups of things families commonly skip. st.dislikes holds ingredient ids;
// the planner and "Prijedlog za danas" never pick a dish that needs one of them (optional ingredients don't count).
// Recipes stay in the list. Pork is not here — it has its own switch ("Bez svinjetine").
export const DISLIKE_GROUPS = [
  ['gljive', 'Gljive', 'Mushrooms', ['mushrooms', 'porcini']],
  ['iznutrice', 'Iznutrice i pašteta', 'Offal and pâté', ['lamb_offal', 'chicken_giblets', 'pate']],
  ['riba', 'Riba', 'Fish', ['trout', 'cod_dried', 'fish_white', 'mackerel', 'tuna', 'sardines']],
  ['morski', 'Lignje', 'Squid', ['squid']],
  ['janjetina', 'Janjetina', 'Lamb', ['lamb', 'lamb_offal']],
  ['teletina', 'Teletina', 'Veal', ['veal']],
  ['patlidzan', 'Patlidžan', 'Aubergine', ['eggplant']],
  ['tikvice', 'Tikvice', 'Courgette', ['zucchini']],
  ['bamija', 'Bamija', 'Okra', ['okra']],
  ['kupus', 'Kupus i kiseli kupus', 'Cabbage and sauerkraut', ['cabbage', 'sauerkraut', 'sauerkraut_shred', 'kale']],
  ['spinat', 'Špinat i blitva', 'Spinach and chard', ['spinach', 'chard']],
  ['mahunarke', 'Grah, leća, slanutak', 'Beans, lentils, chickpeas', ['beans', 'beans_can', 'lentils', 'chickpeas']],
  ['grasak', 'Grašak', 'Peas', ['peas', 'peas_fresh']],
  ['mahune', 'Mahune', 'Green beans', ['green_beans']],
  ['celer', 'Celer', 'Celery', ['celery', 'celery_stalk']],
  ['cvekla', 'Cvekla', 'Beetroot', ['beetroot']],
  ['bundeva', 'Bundeva', 'Pumpkin', ['pumpkin']],
  ['ljuto', 'Ljuto', 'Hot spice', ['paprika_hot', 'chili']],
  ['masline', 'Masline', 'Olives', ['olives']],
  ['orasi', 'Orasi i bademi', 'Walnuts and almonds', ['walnuts', 'almonds']],
  ['suhovoce', 'Suhe šljive i grožđice', 'Prunes and raisins', ['prunes', 'raisins']],
  ['kim', 'Kim', 'Caraway', ['caraway']],
];
/** Ingredient ids of recipe r that are on the "Ne volimo" list (optional ingredients don't count). */
export function dislikedIn(r, list) {
  if (!list || !list.length) return [];
  return [...new Set(r.ing.filter((i) => list.includes(i[0]) && !(i[3] && i[3].opt)).map((i) => i[0]))];
}
