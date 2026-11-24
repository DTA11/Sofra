// Approximate nutrition per 100 g (raw, edible part), from general food-composition tables.
// [kcal, protein, fat, saturated fat, carbs, sugars, fibre, salt, fvl]
// fvl = 1 when it counts as fruit / vegetable / legume for the A–E grade.
const SPICE = [300, 10, 8, 1, 50, 5, 30, 0.1, 0];
const OIL = (sat) => [884, 0, 100, sat, 0, 0, 0, 0, 0];
const PASTA = [360, 13, 1.5, 0.3, 72, 3, 3, 0, 0];

export const NUT = {
  // meat & fish
  beef: [190, 20, 12, 5, 0, 0, 0, 0.15, 0], beef_mince: [250, 17, 20, 8, 0, 0, 0, 0.17, 0], veal: [140, 20, 6, 2.5, 0, 0, 0, 0.2, 0],
  lamb: [280, 17, 23, 10, 0, 0, 0, 0.17, 0], chicken: [215, 18, 15, 4.3, 0, 0, 0, 0.2, 0], chicken_legs: [215, 18, 15, 4.2, 0, 0, 0, 0.2, 0],
  chicken_breast: [120, 23, 2.6, 0.6, 0, 0, 0, 0.15, 0], turkey: [150, 21, 7, 2, 0, 0, 0, 0.15, 0], smoked_beef: [250, 35, 12, 5, 0, 0, 0, 4.5, 0],
  pork: [240, 17, 19, 7, 0, 0, 0, 0.15, 0], pork_shoulder: [230, 17, 18, 6.5, 0, 0, 0, 0.15, 0], bacon: [450, 12, 45, 16, 0, 0, 0, 3, 0],
  guanciale: [650, 7, 69, 24, 0, 0, 0, 3, 0], trout: [140, 20, 6, 1.5, 0, 0, 0, 0.15, 0], cod_dried: [290, 62, 2.4, 0.5, 0, 0, 0, 3, 0],
  fish_white: [90, 19, 1.2, 0.3, 0, 0, 0, 0.2, 0], sudzuk: [450, 22, 40, 16, 1, 0, 0, 3.5, 0], tuna: [190, 26, 9, 1.5, 0, 0, 0, 0.9, 0],
  bones_beef: [60, 5, 4, 1.7, 0, 0, 0, 0.1, 0], chicken_giblets: [200, 17, 14, 4, 0, 0, 0, 0.2, 0], lamb_offal: [160, 17, 9, 3.5, 1, 0, 0, 0.2, 0],
  mixed_mince: [240, 18, 18, 7.5, 0, 0, 0, 0.17, 0], kranjska: [300, 14, 27, 10, 1, 0, 0, 2.2, 0], smoked_ribs: [380, 18, 34, 12, 0, 0, 0, 2.5, 0],
  cracklings: [600, 30, 52, 20, 0, 0, 0, 1.5, 0], ham: [250, 28, 15, 5, 0, 0, 0, 4, 0], venison_or_beef: [150, 22, 6, 2.5, 0, 0, 0, 0.15, 0],
  // vegetables & fruit
  onion: [40, 1.1, 0.1, 0, 9, 4.2, 1.7, 0, 1], garlic: [150, 6.4, 0.5, 0.1, 33, 1, 2.1, 0, 1], spring_onion: [32, 1.8, 0.2, 0, 7.3, 2.3, 2.6, 0, 1],
  potato: [77, 2, 0.1, 0, 17, 0.8, 2.2, 0, 0], carrot: [41, 0.9, 0.2, 0, 9.6, 4.7, 2.8, 0.1, 1], parsnip: [75, 1.2, 0.3, 0, 18, 4.8, 4.9, 0, 1],
  celery: [42, 1.5, 0.3, 0, 9.2, 1.6, 1.8, 0.2, 1], celery_stalk: [16, 0.7, 0.2, 0, 3, 1.3, 1.6, 0.2, 1], leek: [61, 1.5, 0.3, 0, 14, 3.9, 1.8, 0, 1],
  pepper: [26, 1, 0.3, 0, 6, 4.2, 2.1, 0, 1], tomato: [18, 0.9, 0.2, 0, 3.9, 2.6, 1.2, 0, 1], zucchini: [17, 1.2, 0.3, 0.1, 3.1, 2.5, 1, 0, 1],
  eggplant: [25, 1, 0.2, 0, 6, 3.5, 3, 0, 1], cucumber: [15, 0.7, 0.1, 0, 3.6, 1.7, 0.5, 0, 1], green_beans: [31, 1.8, 0.2, 0, 7, 3.3, 2.7, 0, 1],
  okra: [33, 1.9, 0.2, 0, 7.5, 1.5, 3.2, 0, 1], cabbage: [25, 1.3, 0.1, 0, 5.8, 3.2, 2.5, 0, 1], spinach: [23, 2.9, 0.4, 0.1, 3.6, 0.4, 2.2, 0.2, 1],
  chard: [19, 1.8, 0.2, 0, 3.7, 1.1, 1.6, 0.5, 1], broccoli: [34, 2.8, 0.4, 0.1, 6.6, 1.7, 2.6, 0.1, 1], mushrooms: [22, 3.1, 0.3, 0.1, 3.3, 2, 1, 0, 1],
  parsley: [36, 3, 0.8, 0.1, 6.3, 0.9, 3.3, 0.1, 1], root_mix: [38, 1.1, 0.2, 0, 8.5, 4, 2.6, 0.1, 1], parsley_root: [55, 2.3, 0.6, 0, 12, 3, 4.3, 0, 1],
  peas_fresh: [81, 5.4, 0.4, 0.1, 14, 5.7, 5.1, 0, 1], dill: [43, 3.5, 1.1, 0, 7, 0, 2.1, 0.2, 1], lettuce: [15, 1.4, 0.2, 0, 2.9, 0.8, 1.3, 0, 1],
  vine_leaves: [93, 5.6, 2.1, 0.3, 17, 6, 11, 0, 1], chives: [30, 3.3, 0.7, 0.1, 4.4, 1.9, 2.5, 0, 1], kale: [32, 3, 0.6, 0.1, 5.4, 0.5, 4, 0, 1],
  prunes: [240, 2.2, 0.4, 0, 64, 38, 7.1, 0, 1], lemon: [29, 1.1, 0.3, 0, 9, 2.5, 2.8, 0, 1], apple: [52, 0.3, 0.2, 0, 14, 10, 2.4, 0, 1],
  walnuts: [654, 15, 65, 6, 14, 2.6, 6.7, 0, 0], almonds: [579, 21, 50, 3.8, 22, 4.4, 12.5, 0, 0], dates: [282, 2.5, 0.4, 0, 75, 63, 8, 0, 1],
  // dairy & eggs
  eggs: [143, 12.6, 9.5, 3.1, 0.7, 0.4, 0, 0.36, 0], milk: [64, 3.3, 3.6, 2.3, 4.8, 4.8, 0, 0.1, 0], butter: [717, 0.9, 81, 51, 0.1, 0.1, 0, 0.02, 0],
  kajmak: [500, 4, 52, 33, 2, 2, 0, 1.2, 0], sour_cream: [205, 2.8, 20, 12.5, 3.5, 3.5, 0, 0.1, 0], yogurt: [61, 3.5, 3.3, 2.1, 4.7, 4.7, 0, 0.12, 0],
  cream: [320, 2.2, 33, 21, 3, 3, 0, 0.08, 0], feta: [265, 14, 21, 14.5, 4, 4, 0, 2.5, 0], cottage: [120, 12, 5, 3.2, 3.4, 3, 0, 0.6, 0],
  parmesan: [392, 36, 26, 16, 3, 0.8, 0, 1.6, 0], gruyere: [413, 30, 32, 18.6, 0.4, 0.4, 0, 0.8, 0], mozzarella: [254, 18, 19, 12, 2, 1, 0, 0.5, 0],
  mascarpone: [430, 4.6, 44, 30, 4, 4, 0, 0.1, 0],
  // bakery
  bread: [265, 9, 3.2, 0.7, 49, 5, 2.7, 1.2, 0], phyllo: [300, 7, 6, 0.7, 52, 1, 1.8, 0.9, 0], ladyfingers: [365, 8, 4, 1.3, 74, 40, 1, 0.3, 0],
  puff_pastry: [550, 7, 38, 18, 45, 1.5, 1.5, 1, 0],
  // dry goods
  flour: [364, 10, 1, 0.2, 76, 0.3, 2.7, 0, 0], semolina: [360, 12.7, 1, 0.2, 73, 0.3, 3.9, 0, 0], cornmeal: [362, 8.1, 3.6, 0.5, 77, 0.6, 7.3, 0, 0],
  oats: [389, 13, 6.9, 1.2, 66, 1, 10.6, 0, 0], rice: [360, 6.6, 0.6, 0.2, 80, 0.1, 1.3, 0, 0], arborio: [360, 6.6, 0.6, 0.2, 80, 0.1, 1.3, 0, 0],
  soup_pasta: PASTA, spaghetti: PASTA, pasta_short: PASTA, tagliatelle: PASTA, lasagne: PASTA,
  gnocchi: [150, 3.5, 0.3, 0.1, 33, 0.5, 1.5, 1, 0], beans: [333, 23, 0.8, 0.2, 60, 2.2, 15, 0, 1], barley: [352, 9.9, 1.2, 0.3, 78, 0.8, 15.6, 0, 0],
  buckwheat: [343, 13, 3.4, 0.7, 72, 0, 10, 0, 0], buckwheat_flour: [335, 12.6, 3.1, 0.7, 70, 2.6, 10, 0, 0], porcini: [330, 30, 3, 0.5, 40, 5, 20, 0, 1],
  poppy: [525, 18, 42, 4.5, 28, 3, 20, 0, 0], raisins: [299, 3.1, 0.5, 0, 79, 59, 3.7, 0, 1], pumpkin_oil: OIL(18),
  sugar: [400, 0, 0, 0, 100, 100, 0, 0, 0], powder_sugar: [400, 0, 0, 0, 100, 100, 0, 0, 0], vanilla_sugar: [400, 0, 0, 0, 100, 100, 0, 0, 0],
  baking_powder: [50, 0, 0, 0, 12, 0, 0, 25, 0], yeast: [325, 40, 7, 1, 41, 0, 27, 0.1, 0], honey: [304, 0.3, 0, 0, 82, 82, 0.2, 0, 0],
  cocoa: [228, 19.6, 13.7, 8, 58, 1.8, 37, 0.05, 0], chocolate: [500, 5, 30, 18, 55, 48, 7, 0, 0], coffee: [2, 0.1, 0, 0, 0, 0, 0, 0, 0],
  breadcrumbs: [395, 13, 5.3, 1.2, 72, 6, 4.5, 1.2, 0], starch: [381, 0.3, 0.1, 0, 91, 0, 0.9, 0, 0], pudding: [380, 0.5, 0.5, 0, 92, 10, 0, 1, 0],
  condensed_milk: [321, 7.9, 8.7, 5.5, 54, 54, 0, 0.3, 0], oil: OIL(10), olive_oil: OIL(14), lard_or_oil: OIL(25),
  wine_red: [40, 0.1, 0, 0, 2.6, 0.6, 0, 0, 0], wine_white: [40, 0.1, 0, 0, 2.6, 1, 0, 0, 0], vinegar: [20, 0, 0, 0, 0.6, 0.4, 0, 0, 0],
  stock_cube: [250, 10, 20, 10, 15, 5, 0, 50, 0], // per 100 g of cube; as ready stock see STOCK
  // spices
  salt: [0, 0, 0, 0, 0, 0, 0, 100, 0], pepper_black: SPICE, paprika_sweet: [282, 14, 13, 2, 54, 10, 35, 0.1, 0], paprika_hot: SPICE,
  bay_leaf: SPICE, vegeta: [200, 5, 1, 0.2, 30, 10, 2, 55, 0], cinnamon: SPICE, cloves: SPICE, nutmeg: SPICE, oregano: SPICE, thyme: SPICE,
  basil: [23, 3.2, 0.6, 0, 2.7, 0.3, 1.6, 0, 1], rosemary: SPICE, saffron: SPICE, chili: SPICE, mint_dry: SPICE, caraway: SPICE, marjoram: SPICE,
  // jars & tins
  tomato_can: [21, 1.2, 0.2, 0, 3.5, 3, 1, 0.1, 1], tomato_paste: [82, 4.3, 0.5, 0.1, 19, 12, 4.1, 0.1, 1], mayonnaise: [680, 1, 75, 6, 1.5, 1.3, 0, 1.3, 0],
  peas: [77, 5.2, 0.4, 0.1, 13, 4.5, 5.5, 0, 1], corn: [86, 3.3, 1.4, 0.2, 19, 6, 2, 0, 1], pickles: [15, 0.5, 0.1, 0, 3, 2, 1, 2, 1],
  olives: [145, 1, 15, 2, 4, 0, 3.3, 3.5, 1], mustard: [66, 4.4, 4, 0.2, 5.8, 3, 3, 5.7, 0], horseradish: [48, 1.2, 0.7, 0.1, 11, 8, 3.3, 1.2, 1],
  // zimnica
  ajvar: [90, 1.5, 6, 0.8, 8, 7, 2.5, 1.2, 1], tursija: [20, 0.8, 0.1, 0, 4, 2, 1.5, 2, 1], pekmez: [250, 0.8, 0.2, 0, 62, 55, 3, 0, 0],
  dzem: [250, 0.4, 0.1, 0, 62, 55, 1, 0, 0], sauerkraut: [19, 0.9, 0.1, 0, 4.3, 1.8, 2.9, 0.8, 1], sauerkraut_shred: [19, 0.9, 0.1, 0, 4.3, 1.8, 2.9, 1.2, 1],
  kisela_paprika: [25, 1, 0.2, 0, 5, 3, 2, 2, 1], domaci_sos: [30, 1.4, 0.2, 0, 6, 4, 1.5, 0.1, 1], kompot: [70, 0.2, 0, 0, 17, 16, 1, 0, 0],
  ljutenica: [90, 1.5, 6, 0.8, 8, 7, 2.5, 1.2, 1], pindjur: [80, 1.5, 5, 0.7, 8, 6, 2.5, 1.2, 1], sok_sipak: [250, 0, 0, 0, 62, 60, 0, 0, 0],
  // store-bought products (typical label values for the generic product)
  // spreads
  marmalade: [250, 0.4, 0.1, 0, 61, 58, 1, 0.03, 0], maslo: [895, 0.3, 99.5, 62, 0, 0, 0, 0, 0], margarine: [540, 0.2, 60, 17, 0.5, 0.5, 0, 0.8, 0],
  peanut_butter: [600, 25, 50, 9, 14, 6, 7, 0.9, 0], speculoos_spread: [585, 1.5, 38, 7.5, 57, 37, 1, 0.7, 0], choc_spread: [540, 6.3, 31, 10.6, 57, 56, 3.4, 0.1, 0],
  pate: [300, 12, 27, 9, 3, 0.5, 0, 1.6, 0], cheese_spread: [250, 11, 20, 13, 5, 5, 0, 2.5, 0],
  // deli
  kulen: [450, 25, 38, 14, 1, 0.5, 0, 4.5, 0], chicken_salami: [230, 13, 19, 5.5, 2, 1, 0, 2.3, 0], parizer: [250, 11, 22, 7, 3, 1, 0, 2.2, 0],
  mortadela: [290, 13, 25, 9, 2, 1, 0, 2.3, 0], tea_sausage: [480, 24, 42, 16, 1, 0.5, 0, 4.5, 0], hot_dogs: [250, 12, 22, 7, 2, 1, 0, 2.2, 0],
  // tins
  sardines: [210, 24, 12, 3, 0, 0, 0, 1, 0], luncheon: [270, 13, 23, 8.5, 3, 0.5, 0, 2.2, 0], beans_can: [95, 6, 0.5, 0.1, 13, 1, 6, 0.6, 1],
  // dairy, bakery
  cheese_semi: [356, 25, 27, 17, 1, 0.5, 0, 1.8, 0], sour_milk: [62, 3.3, 3.2, 2.1, 4.5, 4.5, 0, 0.1, 0], bread_whole: [245, 9.5, 3.5, 0.7, 41, 4, 7, 1.1, 0],
  // fruit
  banana: [89, 1.1, 0.3, 0.1, 23, 12, 2.6, 0, 1], orange: [47, 0.9, 0.1, 0, 12, 9, 2.4, 0, 1], mandarin: [53, 0.8, 0.3, 0, 13, 10.6, 1.8, 0, 1],
  pear: [57, 0.4, 0.1, 0, 15, 10, 3.1, 0, 1], grapes: [69, 0.7, 0.2, 0.1, 18, 16, 0.9, 0, 1],
  // tea & coffee: what ends up in the cup per 100 g of bags / ground coffee is close to nothing
  tea: [0, 0, 0, 0, 0, 0, 0, 0, 0], coffee_ground: [30, 1.5, 0.5, 0.2, 4, 0, 0, 0, 0],
};
// ready stock (when a recipe gives stock_cube in l/ml/dl)
export const STOCK = [7, 0.5, 0.3, 0.1, 0.5, 0.3, 0, 0.6, 0];

// grams for one 'kom' (piece) etc. — only where it differs by ingredient
export const PIECE = {
  eggs: 55, tomato: 120, carrot: 80, pepper: 150, zucchini: 250, lemon: 40, eggplant: 300, celery_stalk: 40, celery: 300, potato: 150,
  trout: 300, chili: 1, prunes: 10, pickles: 50, kranjska: 180, cucumber: 300, cloves: 0.1, bread: 200, apple: 180, tuna: 130,
  vanilla_sugar: 3, onion: 120, garlic: 5, lettuce: 300, cabbage: 1000, dates: 8,
  banana: 120, orange: 150, mandarin: 70, pear: 170, hot_dogs: 50, cheese_spread: 17, // edible part; one processed-cheese portion
};
// grams for a spoon / bunch / packet etc.
export const UNIT_G = {
  g: 1, kg: 1000, ml: 1, l: 1000, dl: 100, kasika: 12, kasicica: 4, prst: 0.5, cen: 5, glavica: 120, sop: 50, list: 0.2, zrno: 0.05,
  saka: 30, kesica: 10, kriska: 35, jufka: 25,
};
export const SPOON = { flour: 10, cornmeal: 10, starch: 10, breadcrumbs: 8, powder_sugar: 8, cocoa: 7, paprika_sweet: 7, honey: 21, tomato_paste: 16, oil: 13, olive_oil: 13, lard_or_oil: 13, pumpkin_oil: 13, mustard: 15, horseradish: 15, milk: 15, vinegar: 15,
  dzem: 20, marmalade: 20, pekmez: 20, choc_spread: 15, speculoos_spread: 15, peanut_butter: 16, maslo: 12, butter: 12, margarine: 12, kajmak: 15, ajvar: 15, pate: 15 };
export const TEASPOON = { salt: 6, sugar: 4, honey: 7, paprika_sweet: 2.5, paprika_hot: 2.5, pepper_black: 2.5, cinnamon: 2.5 };
export const PACKET = { tea: 2, baking_powder: 12, yeast: 7, vanilla_sugar: 10, saffron: 0.1, pudding: 40 };
export const BUNCH = { spring_onion: 100, dill: 30, chives: 20, basil: 30, parsley: 50 };
export const HEAD = { lettuce: 300, cabbage: 1000, garlic: 40 };
// cooked weight / raw weight (water taken up or lost)
export const YIELD = {
  rice: 2.5, arborio: 3, spaghetti: 2.2, pasta_short: 2.2, tagliatelle: 2.2, lasagne: 2, soup_pasta: 2.5, beans: 2.4, barley: 2.8,
  buckwheat: 2.5, cornmeal: 4, buckwheat_flour: 4, flour: 1.3,
};
// edible share of what is bought (bones, heads, skin)
export const EDIBLE = { chicken: 0.7, chicken_legs: 0.75, smoked_ribs: 0.6, trout: 0.55, fish_white: 0.55, chicken_giblets: 0.5, lamb_offal: 0.7 };
