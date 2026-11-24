import { ING } from './ingredients.js';
import { BOOK_RECIPES } from './recipes-books.js';
import { TRAD_RECIPES } from './recipes-trad.js';
import { SWEET_RECIPES } from './recipes-sweet.js';
import { MEAL_RECIPES } from './recipes-meals.js';

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
    bs: 'Kućni recept u duhu vojničke kuhinje, napisan za Sofru (nije iz JNA knjige).',
    en: 'Home recipe in the spirit of army cooking, written for Sofra (not from the JNA book).',
  },
  trad: {
    bs: 'Tradicionalno jelo — recept i tekst napisani za Sofru.',
    en: 'Traditional dish — recipe and text written for Sofra.',
  },
};

// Derived flags so filters never drift from the ingredient list.
function derive(r) {
  const real = r.ing.filter((i) => !(i[3] && i[3].opt)).map((i) => ING[i[0]]);
  const missing = r.ing.filter((i) => !ING[i[0]]).map((i) => i[0]);
  if (missing.length) console.warn('Unknown ingredient(s) in', r.id, missing);
  const hasMeat = real.some((g) => g && g.sec === 'meat' && g.kind !== 'fish');
  const hasFish = real.some((g) => g && g.kind === 'fish');
  const dairyOrEgg = real.some((g) => g && g.sec === 'dairy');
  r.noPork = !r.ing.some((i) => ING[i[0]] && ING[i[0]].pork && !(i[3] && i[3].opt));
  r.veg = !hasMeat && !hasFish && r.ing.every((i) => !ING[i[0]] || ING[i[0]].sec !== 'meat');
  r.posno = r.veg && !dairyOrEgg;
  r.posnoFish = !hasMeat && !dairyOrEgg;
  r.eq = r.eq || [];
  r.eqOpt = r.eqOpt || [];
  r.occ = r.occ || [];
  if (r.posno && !r.occ.includes('posno')) r.occ.push('posno');
  // meal times
  const meal = new Set(r.meal || []);
  if (!r.meal) {
    if (r.type === 'pie') ['breakfast', 'lunch', 'dinner'].forEach((m) => meal.add(m));
    else if (r.type === 'breakfast') meal.add('breakfast');
    else if (r.type === 'dessert') meal.add('dessert');
    else if (r.type === 'snack') meal.add('snack');
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
  return r;
}

export const RECIPES = [...BOOK_RECIPES, ...TRAD_RECIPES, ...SWEET_RECIPES, ...MEAL_RECIPES].map(derive);
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
];
