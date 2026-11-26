import { ING } from './ingredients.js';
import { BOOK_RECIPES } from './recipes-books.js';
import { TRAD_RECIPES } from './recipes-trad.js';
import { SWEET_RECIPES } from './recipes-sweet.js';
import { SWEET2_RECIPES } from './recipes-sweet2.js';
import { MEAL_RECIPES } from './recipes-meals.js';
import { SLO_RECIPES } from './recipes-slo.js';
import { MORE_RECIPES } from './recipes-more.js';
import { COMBO_RECIPES } from './recipes-combo.js';
import { EXTRA_RECIPES } from './recipes-extra.js';
import { SALAD_RECIPES } from './recipes-salads.js';
import { SIDE_RECIPES } from './recipes-sides.js';
import { GRILL_RECIPES } from './recipes-grill.js';

export const SOURCES = {
  lakisic: {
    bs: 'Alija Lakišić, Bosanski kuhar (6. izd., Svjetlost, Sarajevo 1999). Količine i vremena kao u knjizi, tekst pripreme napisan iznova.',
    en: 'Alija Lakišić, Bosanski kuhar (6th ed., Svjetlost, Sarajevo 1999). Amounts and times as printed; method rewritten in our own words.',
  },
  jna: {
    bs: 'Recepture za pripremanje jela u JNA (Ebesede, Ljubljana 2011). Količine po osobi i vremena kao u knjizi, tekst pripreme napisan iznova.',
    en: 'Recepture za pripremanje jela u JNA (Ebesede, Ljubljana 2011). Per-person amounts and times as printed; method rewritten.',
  },
  jnaStyle: {
    bs: 'Kućni recept u duhu vojničke kuhinje, napisan za Sofru (nije iz vojničke knjige).',
    en: 'Home recipe in the spirit of army cooking, written for Sofra (not from the army recipe book).',
  },
  trad: {
    bs: 'Tradicionalno jelo — recept i tekst napisani za Sofru.',
    en: 'Traditional dish — recipe and text written for Sofra.',
  },
  sofra: {
    bs: 'Složeni doručak od kupovnih proizvoda — sastavljeno za Sofru. Nutritivne vrijednosti po tipičnim deklaracijama.',
    en: 'Assembled breakfast from shop products — put together for Sofra. Nutrition from typical product labels.',
  },
};

// Planner styles: the plan mixes kitchens by style, not by country.
export const STYLES = ['domaca', 'tjestenina', 'evropska', 'vojnicka', 'rostilj'];
const PASTA = ['spaghetti', 'pasta_short', 'tagliatelle', 'lasagne', 'arborio', 'gnocchi'];
function styleOf(r) {
  if (r.grill && r.type !== 'side') return 'rostilj'; // dishes off the grill: their own slider in "Šta kuhamo"
  if (r.cu === 'jna') return 'vojnicka';
  if (r.cu === 'italian' || r.cu === 'french') return r.ing.some((i) => PASTA.includes(i[0])) ? 'tjestenina' : 'evropska';
  return 'domaca';
}

// Derived flags so filters never drift from the ingredient list.
function derive(r) {
  const real = r.ing.filter((i) => !(i[3] && i[3].opt)).map((i) => ING[i[0]]);
  const missing = r.ing.filter((i) => !ING[i[0]]).map((i) => i[0]);
  if (missing.length) console.warn('Unknown ingredient(s) in', r.id, missing);
  const isMeat = (g) => g && (g.sec === 'meat' || g.mt);
  const hasMeat = real.some((g) => isMeat(g) && g.kind !== 'fish');
  const hasFish = real.some((g) => g && g.kind === 'fish');
  const dairyOrEgg = real.some((g) => g && (g.sec === 'dairy' || g.dy));
  r.noPork = !r.ing.some((i) => ING[i[0]] && ING[i[0]].pork && !(i[3] && i[3].opt));
  r.veg = !hasMeat && !hasFish && r.ing.every((i) => !isMeat(ING[i[0]]));
  r.posno = r.veg && !dairyOrEgg;
  r.posnoFish = !hasMeat && !dairyOrEgg;
  r.noMeat = !hasMeat; // Catholic fast: fish, eggs and dairy allowed
  r.eq = r.eq || [];
  r.supa = !!r.supa;
  r.grill = !!r.grill; // off the grill (or a grill pan): Roštilj filter, page and planner style // clear soup: the only starter; other soups (čorbe) count as a main
  r.key = r.key || [];
  r.eqOpt = r.eqOpt || [];
  r.occ = r.occ || [];
  if (r.posno && !r.occ.includes('posno')) r.occ.push('posno');
  // meal times
  const meal = new Set(r.meal || []);
  if (!r.meal) {
    if (r.type === 'pie') ['breakfast', 'lunch', 'dinner'].forEach((m) => meal.add(m));
    else if (r.type === 'breakfast' || r.type === 'combo') meal.add('breakfast');
    else if (r.type === 'dessert') meal.add('dessert');
    else if (r.type === 'snack') meal.add('snack');
    else if (r.type === 'side') meal.add('lunch');
    else ['lunch', 'dinner'].forEach((m) => meal.add(m));
  }
  if (r.noPork && !['breakfast', 'snack'].includes(r.type) && (meal.has('lunch') || meal.has('dinner') || r.type === 'soup' || r.type === 'dessert')) meal.add('iftar');
  r.meal = [...meal];
  // seasonal: months when all perishable seasonal ingredients are in season
  const seasonal = real.filter((g) => g && g.m);
  r.months = seasonal.length
    ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].filter((m) => seasonal.filter((g) => g.m.includes(m)).length >= Math.ceil(seasonal.length * 0.6))
    : null;
  r.source = r.src.b;
  r.style = styleOf(r);
  return r;
}

// ───────── Jufke: homemade (default) or shop-bought ─────────
// Recipes are written with shop phyllo. In "home" mode the phyllo line becomes a simple
// dough (flour, salt, oil, lukewarm water), dough steps are added and the steps that handle
// the sheets are rewritten for big hand-stretched jufke. Nutrition and grades always use the
// shop version (r.ingShop) so they never change with the switch.
export const JUF = { home: true };
const ROLL = (what, en) => [
  `Razvučenu jufku poprskaj uljem i po njoj u tankim trakama rasporedi ${what}, s razmakom od dva prsta. Podigni stolnjak s jedne strane da se jufka sama zarola u dugu rolu, pa je isijeci na komade dužine tepsije. Isto ponovi s ostalim jufkama.`,
  `Sprinkle the stretched sheet with oil and lay ${en} over it in thin lines, two fingers apart. Lift the tablecloth on one side so the sheet rolls itself into a long roll, then cut it into tin-length pieces. Repeat with the other sheets.`,
];
const JUFKA = {
  krompirusa: { a: 2,
    home: { 0: null, 2: ['Razvučene jufke ostavi 10 minuta da se malo prosuše. Prepolovi ih, premaži masnoćom i po dužini malo podvij rub. Poredaj krompir, pomasti, pobiberi i zarolaj u gužve.', 'Let the stretched sheets dry for 10 minutes. Halve them, brush with fat and fold the long edge in a little. Lay on the potato, brush with fat, season with pepper and roll into coils.'] },
    shop: { 0: null, 2: ['Uzmi po dvije kupovne jufke, svaku premaži masnoćom i stavi jednu na drugu. Po dužini malo podvij rub, poredaj krompir, pomasti, pobiberi i zarolaj u gužve.', 'Take two shop sheets at a time, brush each with fat and lay one on the other. Fold the long edge in a little, lay on the potato, brush with fat, season with pepper and roll into coils.'] } },
  burek: { a: 1, home: { 1: ROLL('nadjev', 'the filling') } },
  'burek-piletina': { a: 2, home: { 2: ROLL('nadjev', 'the filling') } },
  'burek-meso-krompir': { a: 2, home: { 2: ROLL('nadjev', 'the filling') } },
  'krompirusa-obicna': { a: 2, home: { 2: ROLL('krompir', 'the potato') } },
  sirnica: { a: 1, home: { 1: [
    'Razvučenu jufku poprskaj uljem i nadjev rasporedi u trakama, s razmakom od dva prsta. Uz pomoć stolnjaka je zarolaj u dugu rolu, isijeci na komade i zavij u puž u nauljenoj tepsiji. Isto ponovi s drugom jufkom.',
    'Sprinkle the stretched sheet with oil and spread the filling in lines, two fingers apart. Use the tablecloth to roll it into a long roll, cut into pieces and coil them in an oiled tin. Repeat with the second sheet.'] } },
  'pita-visnje': { a: 1, home: { 1: [
    'Razvučenu jufku poprskaj uljem i pospi prezlama, višnje rasporedi u trakama pa je uz pomoć stolnjaka zarolaj. Rolu isijeci na dužinu tepsije i složi u nauljenu tepsiju. Isto ponovi s drugom jufkom.',
    'Sprinkle the stretched sheet with oil and breadcrumbs, lay the cherries in lines and roll it up with the help of the tablecloth. Cut the roll to the length of the tin and lay in an oiled tin. Repeat with the second sheet.'] } },
  tikvenik: { a: 1, home: { 1: [
    'Razvučenu jufku poprskaj uljem, po cijeloj rasporedi nadjev pa je uz pomoć stolnjaka zarolaj. Rolu isijeci na dužinu tepsije i složi u nauljenu tepsiju. Isto ponovi s drugom jufkom.',
    'Sprinkle the stretched sheet with oil, spread the filling all over and roll it up with the help of the tablecloth. Cut the roll to the length of the tin and lay in an oiled tin. Repeat with the second sheet.'] } },
  jabukovaca: { a: 1, home: { 1: [
    'Razvučenu jufku poprskaj uljem, pospi jabukama i orasima pa je uz pomoć stolnjaka zarolaj u dugu rolu i isijeci na komade. Isto ponovi s drugom jufkom.',
    'Sprinkle the stretched sheet with oil, scatter over apple and walnuts, roll it into a long roll with the help of the tablecloth and cut into pieces. Repeat with the second sheet.'] } },
  gibanica: { a: 1, home: { 1: [
    'Jednu razvučenu jufku stavi u nauljenu tepsiju tako da rubovi vise preko. Drugu ostavi 10 minuta da se malo prosuši, natrgaj je na komade, gužvaj ih, umači u fil i slaži. Rubove donje jufke prebaci preko.',
    'Lay one stretched sheet in an oiled tin with the edges hanging over. Let the second dry for 10 minutes, tear it into pieces, scrunch them, dip in the filling and pack them in. Fold the overhanging edges over the top.'] } },
  'byrek-spinaq': { a: 2, home: { 2: [
    'Prvu jufku pokapaj uljem i presavij je u nekoliko slojeva veličine tepsije, pokapavajući svaki sloj. Stavi je u nauljenu tepsiju, rasporedi nadjev i pokrij drugom jufkom presavijenom na isti način.',
    'Drizzle the first sheet with oil and fold it into several tin-sized layers, oiling each one. Lay it in an oiled tin, spread the filling and cover with the second sheet folded the same way.'] } },
  ruzice: { a: 1, home: { 1: [
    'Razvučenu jufku premaži otopljenim maslacem, pospi orasima i isijeci na trake široke oko 30 cm. Svaku traku zarolaj u tanak rolat.',
    'Brush the stretched sheet with melted butter, scatter over walnuts and cut into strips about 30 cm wide. Roll each strip into a thin roll.'] } },
  'prekmurska-gibanica': { a: 3, home: { 3: [
    'Razvučene jufke isijeci na 9 komada veličine kalupa. Na podlogu stavi komad jufke, pokapaj maslacem, rasporedi mak i prelij kašikom pavlake. Ponovi redom: jufka, sir, jufka, orasi, jufka, jabuke — pa sve još jednom. Završi jufkom i ostatkom pavlake.',
    'Cut the stretched sheets into 9 tin-sized pieces. On the base lay a piece, drizzle with butter, spread the poppy seed and spoon over some sour cream. Repeat in order: sheet, cheese, sheet, walnut, sheet, apple — then the whole sequence once more. Finish with a sheet and the rest of the cream.'] } },
};
const JUF_EXTRA_MIN = 45; // kneading, resting (overlaps the filling) and stretching
const balls = (n) => `${n} ${n >= 2 && n <= 4 ? 'loptice' : n === 1 ? 'lopticu' : 'loptica'}`;
function withJufka(r) {
  const spec = JUFKA[r.id];
  if (!spec) return r;
  const shopIng = r.ing, shopSt = r.st, shopTime = r.time;
  const ph = shopIng.find((i) => i[0] === 'phyllo');
  const f = ph[2] === 'g' ? ph[1] / 500 : ph[1] / 2; // a 500 g pack ≈ 2 big home sheets from 500 g flour
  const n = Math.max(1, Math.round(2 * f));
  const flour = Math.round(500 * f);
  const shopIngs = shopIng.map((i) => (i[0] === 'phyllo' && i[2] !== 'g' ? ['phyllo', 250 * i[1], 'g'] : i));
  const homeIng = shopIng.flatMap((i) => (i[0] !== 'phyllo' ? [i] : [
    ['flour', flour, 'g', { note: ['za jufke + malo za stol', 'for the sheets + a little for the table'] }],
    ['salt', f, 'kasicica', { note: ['za tijesto', 'for the dough'] }],
    ['oil', Math.round(60 * f), 'ml', { note: ['za tijesto i loptice', 'for the dough and the balls'] }],
  ]));
  // amounts in the text are ratios, so they stay right when the servings are scaled
  const H = [
    ['Jufke: u brašno (količina je u sastojcima) dodaj so, kašiku ulja i mlaku vodu — oko 60 ml vode na svakih 100 g brašna. Mijesi 10 minuta, dok tijesto ne bude glatko i mekano i dok se ne prestane lijepiti za ruke.',
      'Pastry: mix the flour (amount in the ingredients) with the salt, a tablespoon of oil and lukewarm water — about 60 ml water for every 100 g flour. Knead for 10 minutes until the dough is smooth, soft and no longer sticks to your hands.'],
    [`Podijeli tijesto na loptice od oko 400 g (jedna loptica = jedna velika jufka; za ovu količinu ${balls(n)}). Dobro ih nauli, pokrij i ostavi da odmaraju 30 minuta. Za to vrijeme pripremi nadjev.`,
      `Divide the dough into balls of about 400 g (one ball = one big sheet; ${n} for this amount). Oil them well, cover and leave to rest for 30 minutes. Meanwhile prepare the filling.`, 30],
    ['Sto prekrij čistim stolnjakom i pospi brašnom. Lopticu oklagijom razvij u krug, premaži uljem i ostavi 5 minuta. Onda je nadlanicama razvlači od sredine prema rubovima dok ne bude tanka kao papir — rupica-dvije ne smetaju. Debeli rub otkini. Ostale loptice razvlači jednu po jednu, kad dođu na red.',
      'Cover the table with a clean cloth and dust with flour. Roll a ball into a circle with a rolling pin, brush with oil and leave 5 minutes. Then stretch it over the backs of your hands from the middle outwards until it is paper-thin — a hole or two does not matter. Tear off the thick edge. Stretch the other balls one at a time, as you need them.'],
  ];
  const pick = (over) => (s, i) => (over && i in over ? over[i] && [...over[i], ...(s[2] ? [s[2]] : [])] : s);
  const homeSt = [...H.slice(0, 2), ...shopSt.slice(0, spec.a).map(pick(spec.home)), H[2], ...shopSt.slice(spec.a).map((s, i) => pick(spec.home)(s, i + spec.a))].filter(Boolean);
  const shopStx = shopSt.map(pick(spec.shop)).filter(Boolean);
  r.ingShop = shopIngs;
  r.juf = true;
  Object.defineProperty(r, 'ing', { get: () => (JUF.home ? homeIng : shopIngs), enumerable: true, configurable: true });
  Object.defineProperty(r, 'st', { get: () => (JUF.home ? homeSt : shopStx), enumerable: true, configurable: true });
  Object.defineProperty(r, 'time', { get: () => (JUF.home ? shopTime + JUF_EXTRA_MIN : shopTime), enumerable: true, configurable: true });
  return r;
}

export const RECIPES = [...BOOK_RECIPES, ...TRAD_RECIPES, ...SWEET_RECIPES, ...SWEET2_RECIPES, ...MEAL_RECIPES, ...SLO_RECIPES, ...MORE_RECIPES, ...EXTRA_RECIPES, ...SALAD_RECIPES, ...SIDE_RECIPES, ...GRILL_RECIPES, ...COMBO_RECIPES].map(derive).map(withJufka);
export const R = Object.fromEntries(RECIPES.map((r) => [r.id, r]));

// Holiday menus. alt = used instead when "bez svinjetine" is on.
export const MENUS = [
  {
    id: 'bajram', bs: 'Bajramski ručak', en: 'Bajram lunch',
    items: [['begova-corba', 'soup'], ['sogan-dolma', 'main'], ['sarma-junetina', 'main'], ['zeljanica', 'side'], ['baklava-sarajevska', 'dessert'], ['tufahije', 'dessert'], ['hurmasice', 'dessert']],
  },
  {
    id: 'iftar', bs: 'Svečani iftar', en: 'Festive iftar',
    items: [['begova-corba', 'soup'], ['klepe', 'main'], ['krompirusa', 'side'], ['tufahije', 'dessert'], ['sutlijas', 'dessert']],
  },
  {
    id: 'badnjak', bs: 'Badnji dan (posno)', en: 'Christmas Eve (fasting)',
    items: [['prebranac', 'main'], ['bakalar-bijelo', 'main'], ['posna-pita-jabuke', 'dessert']],
  },
  {
    id: 'bozic', bs: 'Božićni ručak', en: 'Christmas lunch',
    items: [['sarma-junetina', 'main'], ['svinjsko-pecenje', 'main', 'pecena-piletina'], ['gibanica', 'side'], ['vanilice', 'dessert'], ['reform-torta', 'dessert']],
  },
  {
    id: 'novagodina', bs: 'Doček Nove godine', en: 'New Year’s Eve',
    items: [['ruska-salata', 'side'], ['sarma-junetina', 'main'], ['svinjsko-pecenje', 'main', 'pecena-piletina'], ['sampita', 'dessert'], ['tiramisu', 'dessert']],
  },
  {
    id: 'slonedjelja', bs: 'Slovenska nedjelja', en: 'Slovenian Sunday lunch',
    items: [['gobova-juha', 'soup'], ['kranjska-zelje', 'main', 'sirovi-struklji'], ['solata-bucno-olje', 'side'], ['prekmurska-gibanica', 'dessert']],
  },
  {
    id: 'slobozic', bs: 'Slovenski Božić', en: 'Slovenian Christmas',
    items: [['prezganka', 'soup'], ['bograc', 'main'], ['matevz', 'side'], ['orehova-potica', 'dessert'], ['blejska-kremsnita', 'dessert']],
  },
];
