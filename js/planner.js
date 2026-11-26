import { nutrition } from './nutrition.js';
import { RECIPES, R } from './data/index.js';
import { ING, SUBSTITUTES, SECTIONS, dislikedIn } from './data/ingredients.js';
import { S, save } from './store.js';

const DAY = 86400000;
export const iso = (d) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
export const parseISO = (s) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const weekday = (d) => (d.getDay() + 6) % 7; // 0 = Monday

// "Zdravije" slider 0–3: grade weights (Nutri-Score style A–E). Level 3 nearly skips D/E.
const HEALTH = [null, { A: 1.4, B: 1.2, C: 1, D: 0.8, E: 0.6 }, { A: 1.8, B: 1.4, C: 1, D: 0.55, E: 0.35 }, { A: 2.4, B: 1.7, C: 1, D: 0.2, E: 0.08 }];
const healthMul = (r) => { const h = HEALTH[S().health || 0]; return h ? h[nutrition(r).grade] || 1 : 1; };
// "Bez mesa" slider 0–3: meatless days per 7 (3 = every day, no meat or fish at all)
const VEG_PER_WEEK = [0, 2, 4, 7];
let pendingVeg = new Set(); // days of the plan being built that should be meatless
/** Pick which days of each 7-day block are meatless (spread at random). */
function vegDaysFor(n) {
  const k = VEG_PER_WEEK[S().meatless || 0] || 0;
  const out = new Set();
  if (!k) return out;
  for (let a = 0; a < n; a += 7) {
    const len = Math.min(7, n - a);
    const cnt = Math.min(len, Math.floor(len * k / 7 + Math.random()));
    const idx = Array.from({ length: len }, (_, j) => a + j).sort(() => Math.random() - 0.5);
    idx.slice(0, cnt).forEach((i) => out.add(i));
  }
  return out;
}

const haveOrSub = (id) => {
  const p = S().pantry;
  if (p[id]) return id;
  return (SUBSTITUTES[id] || []).find((s) => p[s]) || null;
};

/** Main ingredient "kind" (beef/chicken/…) used for the weekly rules. */
export function kindOf(r) {
  for (const [id] of r.ing) { const g = ING[id]; if (g && g.kind) return g.kind; }
  return null;
}

function eligible(r, ctx) {
  const st = S();
  if (st.noPork || st.mode === 'ramazan') { if (!r.noPork) return false; }
  const req = r.eq || [];
  if (req.some((e) => !st.equipment[e])) return false;
  if (dislikedIn(r, st.dislikes).length) return false; // "Ne volimo"
  if (ctx.posno && !posnoOk(r)) return false;
  if (ctx.vegDay && !r.veg) return false;
  return true;
}

function score(r, ctx) {
  const st = S();
  const w = st.styles[r.style] || 0;
  if (!w) return 0;
  let s = w;
  // pantry & zimnica
  const real = r.ing.filter((i) => ING[i[0]] && !ING[i[0]].st && !(i[3] && i[3].opt));
  if (real.length) {
    const have = real.filter((i) => haveOrSub(i[0])).length;
    s += 2 * (have / real.length);
    s += 0.6 * real.filter((i) => { const h = haveOrSub(i[0]); return h && ING[h].z; }).length;
  }
  // reuse perishable ingredients already bought for this week
  const reuse = real.filter((i) => ING[i[0]].p && ctx.weekIngs.has(i[0])).length;
  s += Math.min(1, reuse * 0.35);
  // variety: same main ingredient or dish type again this week is less attractive
  s *= 0.45 ** (ctx.mains[r.main] || 0);
  if (r.type === 'pie') s *= 0.6 ** (ctx.pies || 0);
  // season
  const m = ctx.month;
  if (r.months) { if (r.months.includes(m)) s += 1; else s *= 0.3; }
  if (st.favs.includes(r.id)) s += 0.8;
  if (st.preferKid && r.kid) s += 1;
  if (r.grill && st.equipment.grill) s *= 1.25; // a real grill at home: grill dishes a bit more often than in a pan
  s *= healthMul(r);
  if (ctx.weekday < 5 && r.time > (ctx.maxTime ?? st.weekdayMax)) s *= 0.15;
  return Math.max(0.01, s) * (0.55 + Math.random() * 0.9);
}

function recentIds(exceptPlanId) {
  const st = S();
  const cutoff = Date.now() - st.noRepeatWeeks * 7 * DAY;
  return new Set(st.history.filter((h) => h.plan !== exceptPlanId && parseISO(h.date).getTime() >= cutoff).map((h) => h.id));
}

/** Grill days: mostly at the weekend and in the warm months, rarely on a winter weekday. */
export function grillMul(ctx) {
  const m = ctx.month;
  const season = m >= 5 && m <= 9 ? 1.6 : m === 4 || m === 10 ? 1 : 0.45;
  return season * (ctx.weekday >= 5 ? 2.2 : 0.7);
}

function pick(pool, ctx, usedIds, kindCount, relax = 0) {
  const st = S();
  const cands = pool.filter((r) => {
    if (!eligible(r, ctx)) return false;
    if (usedIds.has(r.id)) return false;
    if (relax < 2 && !st.styles[r.style]) return false;
    if (relax < 1 && ctx.recent.has(r.id)) return false;
    if (relax < 1 && r.type === 'pie' && ctx.pies >= 2) return false;
    const k = kindOf(r);
    if (k && relax < 2 && st.rules[k] != null && (kindCount[k] || 0) >= st.rules[k]) return false;
    return true;
  });
  if (!cands.length) {
    if (relax < 2) return pick(pool, ctx, usedIds, kindCount, relax + 1);
    // a meatless day with no meatless dish left: better a normal dish than an empty day
    if (ctx.vegDay && (st.meatless || 0) < 3) return pick(pool, { ...ctx, vegDay: false }, usedIds, kindCount, 0);
    return null;
  }
  // First pick a style (domaća / tjestenina / evropska / vojnička) by its weight, so a small
  // kitchen still shows up as often as asked; then the best-scoring dish of that style.
  const W = [0, 1, 3, 8];
  const styles = [...new Set(cands.map((r) => r.style))];
  const sw = styles.map((x) => (W[st.styles[x] || 0] || (relax >= 2 ? 0.2 : 0)) * (x === 'rostilj' ? grillMul(ctx) : 1));
  let roll = Math.random() * sw.reduce((a, b) => a + b, 0);
  let style = styles[0];
  for (let i = 0; i < styles.length; i++) { roll -= sw[i]; if (roll <= 0) { style = styles[i]; break; } }
  let best = null, bs = -1;
  for (const r of cands) { if (r.style !== style) continue; const sc = score(r, ctx); if (sc > bs) { bs = sc; best = r; } }
  return best;
}

// čorbe (thick soups) are a main or a light main; only a clear supa is ever a starter
const MAINS = () => RECIPES.filter((r) => r.type === 'main' || r.type === 'pie' || (r.type === 'salad' && r.full) || (r.type === 'soup' && !r.supa));
const BREAKFASTS = () => RECIPES.filter((r) => r.meal.includes('breakfast') && r.type !== 'combo');
const COMBOS = () => RECIPES.filter((r) => r.type === 'combo');
const DINNERS = () => RECIPES.filter((r) => r.meal.includes('dinner') && r.type !== 'dessert' && !r.side && !r.supa && (r.light || ['pie', 'salad', 'soup'].includes(r.type)));
const SNACKS = () => RECIPES.filter((r) => r.type === 'snack');
const PACKS = () => RECIPES.filter((r) => r.type === 'snack' && r.pack);
// Yesterday's dish that is good cold in a lunch box: pies, breaded and roast or grilled meat, patties.
const PACK_LEFT = new Set(['pecena-piletina', 'pljeskavica', 'cevapi', 'cufte-nana-jogurt', 'popeci', 'pileci-batci-zar', 'raznjici-pileci', 'musaka-krompir']);
export const packLeftOk = (r) => !!r && (r.type === 'pie' || groupOf(r) === 'breaded' || PACK_LEFT.has(r.id));
export const ROLE_ORDER = { breakfast: 0, soup: 1, main: 2, side: 3, dinner: 4, snack: 5, dessert: 6 };
// Plan length: one dish, one day, one week or a month (4 weeks).
export const RANGES = { dish: 1, day: 1, week: 7, month: 28 };
/** Days outside the 7-day block of day i become null, so weekly rules work inside a month. */
const wk = (days, i) => { const a = Math.floor(i / 7) * 7; return days.map((d, k) => (k >= a && k < a + 7 ? d : null)); };
/** Fresh food that goes off within a week: bought weekly in a month plan. Everything else is the big shop. */
export const isFresh = (g) => !!g && (!!g.p || (!!g.prod && ['veg', 'bakery', 'dairy', 'deli'].includes(g.sec)));
const sortDishes = (d) => d.dishes.sort((a, b) => (ROLE_ORDER[a.role] ?? 9) - (ROLE_ORDER[b.role] ?? 9));
// starters: a clear supa; Ramazan keeps its iftar čorba too
const SOUPS = () => RECIPES.filter((r) => r.type === 'soup' && (r.supa || S().mode === 'ramazan'));

// ───────── what goes with lunch: supa before it, a salad or yoghurt beside it ─────────
const GUSTO = ['bosanski-lonac', 'gulas', 'vojnicki-gulas-krompir', 'bograc', 'pileci-paprikas', 'krompir-paprikas', 'boeuf-bourguignon', 'pasticada', 'brodet', 'slanutak-meso', 'kalja', 'kljukusa', 'kacamak'];
const STUFFED = ['sarma-junetina', 'punjene-paprike', 'sogan-dolma', 'klepe', 'japrak-rastan', 'posna-sarma'];
const PIE_LIKE = ['kacamak', 'sirovi-struklji', 'zagorski-strukli', 'idrijski-zlikrofi', 'kompir-mandza'];
/** Kind of main for pairing: pie · beans · grill · pasta · breaded · fish · light · stuffed · corba · none · meat */
export function groupOf(r) {
  if (!r) return 'none';
  if (r.type === 'salad' || r.type === 'breakfast' || r.main === 'eggs' || r.id === 'tost-sir') return 'none';
  if (r.type === 'soup') return 'corba';
  if (r.type === 'pie' || PIE_LIKE.includes(r.id)) return 'pie';
  if (r.main === 'beans' || ['kranjska-zelje'].includes(r.id)) return 'beans';
  if (r.grill) return r.main === 'fish' ? 'fish' : 'grill'; // grilled fish takes the fish salads, not onion and kajmak
  if (r.id.startsWith('pohovan') || r.id === 'popeci') return 'breaded';
  if (r.style === 'tjestenina' || ['pasta', 'rice'].includes(r.main) || ['makaronovo-meso', 'lasagne', 'tjestenina-sir-slanina'].includes(r.id)) return 'pasta';
  if (STUFFED.includes(r.id)) return 'stuffed';
  if (r.main === 'fish') return 'fish';
  if (['veg', 'potato', 'spinach', 'broccoli', 'cheese'].includes(r.main)) return 'light';
  return 'meat';
}
// [side id, weight] per group — the planner picks one, by season, what is in the pantry and variety
const SIDES = {
  pie: [['uz-jogurt', 5], ['uz-kiselo-mlijeko', 4], ['paradajz-salata', 1], ['mijesana-salata', 1], ['satrica', 1.5], ['paradajz-kajmak', 1], ['kupus-salata', 0.6], ['salata-cvekla', 0.5]],
  beans: [['kupus-salata', 4], ['uz-kiseli-kupus', 3], ['salata-luk', 3], ['uz-tursija', 2], ['paradajz-salata', 1.5], ['mijesana-salata', 1], ['salata-kupus-mrkva', 1.5]],
  grill: [['salata-luk', 3], ['uz-kajmak-ajvar', 3], ['paradajz-salata', 2], ['sopska', 2], ['urnebes', 2.5], ['umak-jogurt-luk', 1.5], ['mijesana-salata', 1.5], ['kupus-salata', 1], ['pecene-paprike-salata', 1]],
  pasta: [['zelena-salata', 4], ['paradajz-salata', 2], ['mijesana-salata', 2], ['krastavac-salata', 2], ['kupus-salata', 1.5], ['salata-kupus-mrkva', 1]],
  breaded: [['zelena-salata', 3], ['mijesana-salata', 2], ['krastavac-salata', 2], ['paradajz-salata', 2], ['kupus-salata', 1.5], ['salata-cvekla', 1]],
  fish: [['zelena-salata', 3], ['paradajz-salata', 2], ['mijesana-salata', 2], ['kupus-salata', 1.5], ['krastavac-salata', 1], ['umak-jogurt-luk', 0.7]],
  light: [['uz-kiselo-mlijeko', 3], ['uz-jogurt', 3], ['zelena-salata', 2], ['paradajz-kajmak', 1.5], ['mijesana-salata', 1], ['satrica', 1], ['kupus-salata', 1], ['salata-cvekla', 1], ['uz-tursija', 0.7]],
  stuffed: [['uz-kiselo-mlijeko', 3], ['uz-jogurt', 2], ['zelena-salata', 1.5], ['mijesana-salata', 1], ['kupus-salata', 1]],
  corba: [['zelena-salata', 2], ['mijesana-salata', 2], ['kupus-salata', 2], ['uz-tursija', 1.5], ['paradajz-salata', 1.5], ['uz-kiseli-kupus', 1]],
  meat: [['zelena-salata', 3], ['mijesana-salata', 2.5], ['kupus-salata', 2.5], ['paradajz-salata', 2], ['uz-kiseli-kupus', 2], ['uz-tursija', 1.5], ['krastavac-salata', 1.5], ['sopska', 1.5], ['salata-cvekla', 1.5], ['salata-kupus-mrkva', 1], ['pecene-paprike-salata', 1]],
  none: [],
};
/** Is a supa a good starter before this main? Never before a čorba, beans, a thick stew or a salad meal. */
export function supaFits(r) {
  const g = groupOf(r);
  return !!r && !['corba', 'beans', 'none'].includes(g) && !GUSTO.includes(r.id);
}
/** "Supa uz ručak": 0 never · 1 sometimes (weekend, pies, roasts, breaded, stuffed) · 2 with every lunch where it fits */
function wantSupa(r, ctx) {
  const st = S();
  if (st.mode === 'ramazan') return !!r && r.type !== 'soup';
  const lvl = st.soup ?? 1;
  if (!lvl || !supaFits(r)) return false;
  if (lvl >= 2) return true;
  const g = groupOf(r);
  return ctx.weekday >= 5 || ['pie', 'breaded', 'stuffed'].includes(g) || (g === 'meat' && r.eq.includes('oven'));
}
function pickSide(r, ctx, days, i, exclude) {
  const st = S();
  const list = SIDES[groupOf(r)] || [];
  const mainIngs = new Set(r.ing.map((x) => x[0]));
  const near = (k) => (days[k] ? days[k].dishes.filter((x) => x.role === 'side').map((x) => x.id) : []);
  const yday = new Set([...(i > 0 ? near(i - 1) : []), ...(exclude ? [exclude] : [])]);
  const week = wk(days, i).flatMap((d, k) => (d && k !== i ? d.dishes.filter((x) => x.role === 'side').map((x) => x.id) : []));
  const ok = list.filter(([id]) => { const s = R[id]; return s && eligible(s, ctx) && !yday.has(id) && !s.key.some((k) => mainIngs.has(k)); }); // no kiseli kupus with sarma, no yoghurt with a yoghurt sauce
  const inSeason = ok.filter(([id]) => !R[id].months || R[id].months.includes(ctx.month));
  let best = null, bs = 0;
  for (const [id, w] of inSeason) { // nothing in season fits → no side rather than lettuce in November
    const s = R[id];
    let sc = w;
    const jars = s.ing.filter((x) => ING[x[0]] && ING[x[0]].z && !(x[3] && x[3].opt)); // an optional spoon of ajvar is no reason to skip a side
    if (jars.length) sc *= jars.every((x) => haveOrSub(x[0])) ? 2.2 : 0.7; // zimnica first
    else if (s.ing.some((x) => ING[x[0]] && ING[x[0]].p && haveOrSub(x[0]))) sc *= 1.3;
    sc *= 0.5 ** week.filter((x) => x === id).length;
    if (st.favs.includes(id)) sc *= 1.3;
    sc *= 0.55 + Math.random() * 0.9;
    if (sc > bs) { bs = sc; best = s; }
  }
  return best;
}
/** Add the supa and the side to every lunch (role 'main') of the plan. */
function addStarters(days, start, planId, only) {
  const st = S();
  days.forEach((d, i) => {
    if (!d || (only != null && i !== only)) return;
    d.dishes = d.dishes.filter((x) => x.role !== 'soup' && x.role !== 'side');
    const m = d.dishes.find((x) => x.role === 'main');
    if (!m) return;
    const r = R[m.id];
    const ctx = ctxFor(start, i, days, planId);
    if (wantSupa(r, ctx)) {
      const used = usedSet(wk(days, i), i);
      const soup = pick(SOUPS(), ctx, used, {}, 0) || pick(SOUPS(), ctx, new Set([r.id]), {}, 0);
      if (soup && soup.id !== r.id) d.dishes.push({ id: soup.id, role: 'soup', serv: st.household });
    }
    if (st.sides !== false) {
      const s = pickSide(r, ctx, days, i);
      if (s) d.dishes.push({ id: s.id, role: 'side', serv: st.household });
    }
    sortDishes(d);
  });
}
const DESSERTS = () => RECIPES.filter((r) => r.type === 'dessert' && r.serves >= 4 && r.serves <= 16);

function weekIngredients(days) {
  const set = new Set();
  days.forEach((d) => d && d.dishes.forEach((x) => R[x.id] && R[x.id].ing.forEach((i) => set.add(i[0]))));
  return set;
}
function weekShape(days, skip) {
  const mains = {}; let pies = 0;
  days.forEach((d, k) => { if (!d || k === skip) return; d.dishes.forEach((x) => { if (x.role !== 'main' || x.left) return; const r = R[x.id]; mains[r.main] = (mains[r.main] || 0) + 1; if (r.type === 'pie') pies++; }); });
  return { mains, pies };
}
function kindCounts(days, skip = -1) {
  const c = {};
  days.forEach((d, i) => { if (!d || i === skip) return; d.dishes.forEach((x) => { if (x.role !== 'main' && x.role !== 'dinner') return; if (x.role === 'dinner' && x.left) return; const k = kindOf(R[x.id]); if (k) c[k] = (c[k] || 0) + 1; }); });
  return c;
}
const usedSet = (days, skip = -1) => new Set(days.flatMap((d, i) => (d && i !== skip ? d.dishes.filter((x) => !x.left).map((x) => x.id) : [])));

/** Fasting modes: Catholic = no meat (fish, eggs, dairy fine); Orthodox = no meat, dairy or eggs (fish if allowed). */
export const FAST_MODES = ['katolicki', 'pravoslavni'];
function posnoOk(r) {
  const st = S();
  if (st.mode === 'katolicki') return r.noMeat;
  return st.posnoFish ? r.posnoFish : r.posno;
}

function ctxFor(start, i, days, planId) {
  const st = S();
  const date = new Date(start.getTime() + i * DAY);
  const wd = weekday(date);
  return {
    date, weekday: wd, month: date.getMonth() + 1,
    posno: FAST_MODES.includes(st.mode) && st.posnoDays.includes(wd),
    vegDay: (st.meatless || 0) >= 3 || pendingVeg.has(i) || !!(days[i] && days[i].veg),
    weekIngs: weekIngredients(wk(days, i)), recent: recentIds(planId), ...weekShape(wk(days, i), i),
  };
}

function fillDay(days, i, start, planId, opts = {}) {
  const st = S();
  const ctx = ctxFor(start, i, days, planId);
  const used = usedSet(days, i);
  const kc = kindCounts(wk(days, i), i);
  const hh = st.household;
  const day = { dishes: [], cooked: false };
  const n = days.length;
  // a month has more days than some kitchens have dishes: then repeat dishes from other weeks
  const main = pick(MAINS(), ctx, used, kc) || pick(MAINS(), ctx, usedSet(wk(days, i), i), kc);
  if (main) {
    const makeLeft = st.leftovers && main.left && opts.allowLeft && i < n - 1 && (main.veg || !pendingVeg.has(i + 1));
    day.dishes.push({ id: main.id, role: 'main', serv: makeLeft ? hh * 2 : hh });
    day.makesLeft = !!makeLeft;
  }
  if (ctx.vegDay && (st.meatless || 0) < 3) day.veg = true;
  return day;
}

function addDesserts(days, start) {
  const st = S();
  const n = Math.min((st.health || 0) >= 3 ? 1 : 7, st.dessertsPerWeek);
  if (!n) return;
  // weekend first, then spread — counted per 7-day block
  const order = [6, 5, 3, 1, 4, 2, 0];
  const idx = [];
  for (let a = 0; a < days.length; a += 7) {
    const block = [];
    for (const wd of order.slice(0, n)) {
      const i = days.findIndex((_, k) => k >= a && k < a + 7 && weekday(new Date(start.getTime() + k * DAY)) === wd);
      if (i >= 0) block.push(i);
    }
    idx.push(...block);
  }
  const used = usedSet(days);
  idx.forEach((i) => {
    const ctx = ctxFor(start, i, days, null);
    const d = pick(DESSERTS(), ctx, used, {}, 0);
    if (d) { days[i].dishes.push({ id: d.id, role: 'dessert', serv: d.serves, fixed: 1 }); used.add(d.id); }
  });
}


/** Breakfast, light dinner and snack for every day (lunch = role 'main'). */
function pickMeal(role, days, i, start, planId, exclude) {
  const st = S();
  const ctx = ctxFor(start, i, days, planId);
  const wd = ctx.weekday;
  const roleIds = (k) => new Set((days[k] ? days[k].dishes : []).filter((x) => x.role === role).map((x) => x.id));
  const weekUsed = new Set(wk(days, i).flatMap((d, k) => (d && k !== i ? d.dishes.filter((x) => x.role === role).map((x) => x.id) : [])));
  const yesterday = i > 0 ? roleIds(i - 1) : new Set();
  if (exclude) { weekUsed.add(exclude); yesterday.add(exclude); }
  const lunchR = days[i].dishes.find((x) => x.role === 'main');
  const lunchPie = lunchR && R[lunchR.id].type === 'pie';
  if (role === 'breakfast') {
    // "Doručak bez kuhanja radnim danom": Mon–Fri an assembled breakfast, weekends a cooked one
    if (st.noCookBreakfast && wd < 5) { const c = pickCombo(ctx, weekUsed, yesterday); if (c) return c; }
    Object.assign(ctx, { recent: new Set(), mains: {}, pies: lunchPie ? 2 : 0, maxTime: st.breakfastMax });
    return pick(BREAKFASTS(), ctx, weekUsed, {}) || pick(BREAKFASTS(), ctx, yesterday, {});
  }
  if (role === 'snack') {
    Object.assign(ctx, { recent: new Set(), mains: {}, pies: 0, maxTime: 30 });
    // Užina za ponijeti on weekdays (school, work): cold, nothing new to cook
    if (st.packSnack !== false && wd < 5) return pick(PACKS(), ctx, weekUsed, {}) || pick(PACKS(), ctx, yesterday, {}) || pick(SNACKS(), ctx, yesterday, {});
    return pick(SNACKS(), ctx, yesterday, {});
  }
  // light dinner: differs from today's lunch, follows the weekly meat rules
  const lunch = days[i].dishes.find((x) => x.role === 'main');
  const mains = {}; if (lunch) mains[R[lunch.id].main] = 2;
  Object.assign(ctx, { mains, pies: 0, maxTime: st.dinnerMax });
  const used = usedSet(wk(days, i)); weekUsed.forEach((x) => used.add(x));
  const kc = kindCounts(wk(days, i));
  return pick(DINNERS(), ctx, used, kc) || pick(DINNERS(), ctx, yesterday, kc);
}

/** Assembled (no-cook) breakfast: no repeats this week if possible, never two days running. */
function pickCombo(ctx, weekUsed, yesterday) {
  const st = S();
  const pool = COMBOS().filter((r) => eligible(r, ctx));
  const fresh = pool.filter((r) => !weekUsed.has(r.id));
  const notYday = pool.filter((r) => !yesterday.has(r.id));
  const cands = fresh.length ? fresh : notYday.length ? notYday : pool;
  let best = null, bs = -1;
  for (const r of cands) {
    let s = 1;
    const real = r.ing.filter((i) => ING[i[0]] && !ING[i[0]].st && !(i[3] && i[3].opt));
    if (real.length) s += 2 * (real.filter((i) => haveOrSub(i[0])).length / real.length);
    if (r.months) { if (r.months.includes(ctx.month)) s += 0.5; else s *= 0.35; }
    if (st.favs.includes(r.id)) s += 0.8;
    if (st.preferKid && r.kid) s += 1;
    s *= healthMul(r);
    s *= 0.55 + Math.random() * 0.9;
    if (s > bs) { bs = s; best = r; }
  }
  return best;
}

function addMeals(days, start, planId) {
  const st = S();
  const ram = st.mode === 'ramazan';
  const want = ram ? { breakfast: true, lunch: true, dinner: false, snack: false } : st.meals;
  days.forEach((d, i) => {
    const main = d.dishes.find((x) => x.role === 'main');
    if (want.breakfast) { const r = pickMeal('breakfast', days, i, start, planId); if (r) d.dishes.push({ id: r.id, role: 'breakfast', serv: st.household }); }
    if (want.lunch && want.dinner) {
      if (st.dinnerLeft && main && !main.left) { main.serv += st.household; d.dishes.push({ id: main.id, role: 'dinner', serv: st.household, left: true }); }
      else { const r = pickMeal('dinner', days, i, start, planId); if (r) d.dishes.push({ id: r.id, role: 'dinner', serv: st.household }); }
    }
    if (want.snack) { const x = packLeftover(days, i, start, planId) || snackFor(days, i, start, planId); if (x) d.dishes.push(x); }
    sortDishes(d);
  });
}
const snackFor = (days, i, start, planId, exclude) => { const r = pickMeal('snack', days, i, start, planId, exclude); return r ? { id: r.id, role: 'snack', serv: S().household } : null; };
/** Weekday užina from yesterday's lunch or dinner (a piece of pie, cold schnitzel…): cook a bit more the day before. */
function packLeftover(days, i, start, planId) {
  const st = S();
  if (st.packSnack === false || i === 0 || !days[i - 1]) return null;
  const ctx = ctxFor(start, i, days, planId);
  if (ctx.weekday >= 5 || Math.random() < 0.3) return null;
  const src = days[i - 1].dishes.find((x) => !x.left && ['main', 'dinner'].includes(x.role) && packLeftOk(R[x.id]) && eligible(R[x.id], ctx));
  if (!src || days[i].dishes.some((x) => x.id === src.id)) return null;
  src.serv += st.household;
  return { id: src.id, role: 'snack', serv: st.household, left: true };
}
/** A leftover užina whose dish is no longer cooked the day before gets a fresh snack instead. */
function relinkSnacks(days, start, planId) {
  days.forEach((d, k) => d.dishes.forEach((x, j) => {
    if (x.role !== 'snack' || !x.left) return;
    const src = k > 0 && days[k - 1].dishes.find((y) => !y.left && y.id === x.id && ['main', 'dinner'].includes(y.role));
    if (!src) { const nx = snackFor(days, k, start, planId); if (nx) d.dishes[j] = nx; else d.dishes.splice(j, 1); }
  }));
}

/** One-tap swap of any dish in the plan. */
export function swapDish(i, k) {
  const st = S();
  const d = st.plan.days[i];
  const x = d.dishes[k];
  if (!x) return;
  if (x.role === 'main') { swapDay(i); return; }
  const start = parseISO(st.plan.start);
  let r = null;
  if (['breakfast', 'dinner', 'snack'].includes(x.role)) {
    const keep = d.dishes.splice(k, 1)[0];
    r = pickMeal(x.role, st.plan.days, i, start, st.plan.id, keep.id);
    d.dishes.splice(k, 0, r ? { id: r.id, role: x.role, serv: st.household } : keep);
    if (keep.left && r) {
      // the dish was cooked bigger for these leftovers: back to normal size
      const m = x.role === 'snack' ? (i > 0 && st.plan.days[i - 1].dishes.find((y) => !y.left && y.id === keep.id && ['main', 'dinner'].includes(y.role))) : d.dishes.find((y) => y.role === 'main');
      if (m && m.serv > st.household) m.serv -= st.household;
    }
  } else if (x.role === 'side') {
    const m = d.dishes.find((y) => y.role === 'main');
    const ctx = ctxFor(start, i, st.plan.days, st.plan.id);
    r = m ? pickSide(R[m.id], ctx, st.plan.days, i, x.id) : null;
    if (r) d.dishes[k] = { ...x, id: r.id };
  } else {
    const pool = x.role === 'soup' ? SOUPS() : x.role === 'dessert' ? DESSERTS() : RECIPES.filter((q) => q.type === R[x.id].type);
    const ctx = ctxFor(start, i, st.plan.days, st.plan.id);
    const used = usedSet(st.plan.days); used.add(x.id);
    r = pick(pool, ctx, used, {}) || pick(pool, ctx, new Set([...usedSet(wk(st.plan.days, i)), x.id]), {});
    if (r) d.dishes[k] = { ...x, id: r.id, serv: x.fixed ? r.serves : x.serv };
  }
  d.cooked = false;
  relinkSnacks(st.plan.days, start, st.plan.id);
  recordHistory();
  save();
}

export function generatePlan(startDate = new Date(), range = S().range || 'week') {
  const st = S();
  if (!RANGES[range]) range = 'week';
  st.range = range;
  const start = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  const planId = 'p' + Date.now();
  const n = RANGES[range];
  const days = new Array(n).fill(null);
  pendingVeg = range === 'dish' ? new Set(Math.random() < (VEG_PER_WEEK[st.meatless || 0] || 0) / 7 ? [0] : []) : vegDaysFor(n);
  try { return buildPlan(st, start, planId, range, n, days); } finally { pendingVeg = new Set(); }
}
function buildPlan(st, start, planId, range, n, days) {
  if (range === 'dish') {
    // just one dish: today's main, nothing else
    days[0] = fillDay(days, 0, start, planId, { only: true });
    delete days[0].makesLeft;
    days[0].dishes.forEach((x) => { x.serv = st.household; });
    st.plan = { id: planId, start: iso(start), range, days };
    recordHistory();
    st.shop.checked = {};
    save();
    return st.plan;
  }
  for (let i = 0; i < n; i++) {
    if (days[i]) continue;
    const d = fillDay(days, i, start, planId, { allowLeft: true });
    days[i] = d;
    if (d.makesLeft && i + 1 < n) {
      const m = d.dishes.find((x) => x.role === 'main');
      const next = { dishes: [{ id: m.id, role: 'main', serv: st.household, left: true }], cooked: false };
      if (pendingVeg.has(i + 1) && (st.meatless || 0) < 3) next.veg = true;
      const ctxN = ctxFor(start, i + 1, days, planId);
      const r = R[m.id];
      if (!ctxN.posno || posnoOk(r)) {
        days[i + 1] = next;
      } else { m.serv = st.household; d.makesLeft = false; }
    }
  }
  addDesserts(days, start);
  addStarters(days, start, planId);
  days.forEach((d) => delete d.makesLeft);
  addMeals(days, start, planId);
  st.plan = { id: planId, start: iso(start), range, days };
  recordHistory();
  st.shop.checked = {};
  save();
  return st.plan;
}

export function recordHistory() {
  const st = S();
  if (!st.plan) return;
  const start = parseISO(st.plan.start);
  st.history = st.history.filter((h) => h.plan !== st.plan.id);
  st.plan.days.forEach((d, i) => d.dishes.forEach((x) => {
    if (!x.left) st.history.push({ id: x.id, date: iso(new Date(start.getTime() + i * DAY)), plan: st.plan.id });
  }));
  const cutoff = Date.now() - 120 * DAY;
  st.history = st.history.filter((h) => parseISO(h.date).getTime() > cutoff);
}

/** Swap the main dish of a day (one tap). Keeps soup/dessert, fixes leftover links. */
export function swapDay(i) {
  const st = S();
  const plan = st.plan;
  const start = parseISO(plan.start);
  const days = plan.days;
  const old = days[i];
  const oldMain = old.dishes.find((x) => x.role === 'main');
  // if this day was the source of leftovers, the next day becomes free too
  const n = days.length;
  if (oldMain && !oldMain.left && i + 1 < n) {
    const nx = days[i + 1].dishes.find((x) => x.role === 'main' && x.left && x.id === oldMain.id);
    if (nx) { days[i + 1].dishes = days[i + 1].dishes.filter((x) => x !== nx); }
  }
  const nextMain = () => (i + 1 < n ? (days[i + 1].dishes.find((x) => x.role === 'main') || {}).id : null);
  const nextBefore = nextMain();
  const ctx = ctxFor(start, i, days, plan.id);
  const used = usedSet(days, i);
  if (oldMain) used.add(oldMain.id);
  const kc = kindCounts(wk(days, i), i);
  const pickR = pick(MAINS(), ctx, used, kc) || pick(MAINS(), ctx, new Set([...usedSet(wk(days, i), i), ...(oldMain ? [oldMain.id] : [])]), kc);
  old.dishes = old.dishes.filter((x) => x.role !== 'main');
  if (pickR) {
    const left = plan.range !== 'dish' && st.leftovers && pickR.left && i + 1 < n && !days[i + 1].dishes.some((x) => x.role === 'main') && (pickR.veg || !days[i + 1].veg);
    old.dishes.splice(old.dishes.findIndex((x) => x.role === 'dessert') >= 0 ? old.dishes.findIndex((x) => x.role === 'dessert') : old.dishes.length, 0,
      { id: pickR.id, role: 'main', serv: left ? st.household * 2 : st.household });
    if (left) days[i + 1].dishes.unshift({ id: pickR.id, role: 'main', serv: st.household, left: true });
  }
  // a day that lost its leftover main gets a fresh dish
  if (i + 1 < n && !days[i + 1].dishes.some((x) => x.role === 'main')) {
    const ctxN = ctxFor(start, i + 1, days, plan.id);
    const r2 = pick(MAINS(), ctxN, usedSet(days), kindCounts(wk(days, i + 1))) || pick(MAINS(), ctxN, usedSet(wk(days, i + 1)), kindCounts(wk(days, i + 1)));
    if (r2) days[i + 1].dishes.splice(days[i + 1].dishes.some((x) => x.role === 'soup') ? 1 : 0, 0, { id: r2.id, role: 'main', serv: st.household });
  }
  // the supa and the side follow the new main
  if (plan.range !== 'dish') {
    addStarters(days, start, plan.id, i);
    if (i + 1 < n && nextMain() !== nextBefore) addStarters(days, start, plan.id, i + 1);
  }
  old.cooked = false;
  relinkSnacks(days, start, plan.id);
  recordHistory();
  save();
}

export function setDayDishes(i, dishes) {
  const st = S();
  st.plan.days[i].dishes = dishes;
  st.plan.days[i].cooked = false;
  recordHistory();
  save();
}

/** Mark a day cooked: remove perishable fresh ingredients from pantry, use one jar of each zimnica.
 *  Store products (prod) are long-life stock and stay. */
export function markCooked(i) {
  const st = S();
  const d = st.plan.days[i];
  d.cooked = !d.cooked;
  if (d.cooked) {
    d.dishes.filter((x) => !x.left).forEach((x) => R[x.id].ing.forEach(([id]) => {
      const h = haveOrSub(id);
      if (!h) return;
      const g = ING[h];
      if (g.prod) return; // store products are long-life stock: they stay until you untick them
      if (g.z && (['combo', 'side'].includes(R[x.id].type) || R[x.id].pack)) return; // a spoon of ajvar or a bowl of turšija doesn't empty a jar
      if (g.z) { st.pantry[h] = Math.max(0, (Number(st.pantry[h]) || 1) - 1); if (!st.pantry[h]) delete st.pantry[h]; }
      else if (g.p) delete st.pantry[h];
    }));
  }
  save();
}

// ───────── quantities ─────────
export function scaleQ(q, f) { return q == null ? null : q * f; }
// Countable things: eggs, leaves, slices… only whole; onions, lemons, tomatoes… whole or half. Never ¾ of an egg.
const WHOLE_U = new Set(['list', 'zrno', 'kriska', 'jufka']);
const HALF_U = new Set(['glavica', 'sop', 'kesica']);
const HALF_KOM = new Set(['lemon', 'tomato', 'pepper', 'carrot', 'cucumber', 'zucchini', 'eggplant', 'potato', 'apple', 'beetroot', 'onion', 'celery_stalk', 'banana', 'lettuce']);
export function niceQ(q, unit, id, buy = false) {
  if (q == null) return '';
  const rnd = buy ? (x) => Math.ceil(x - 0.05) : Math.round;
  if (WHOLE_U.has(unit) || (unit === 'kom' && id && !HALF_KOM.has(id))) q = Math.max(1, rnd(q));
  else if (HALF_U.has(unit) || unit === 'kom') q = Math.max(0.5, rnd(q * 2) / 2);
  let u = unit;
  if (u === 'g' && q >= 1000) { q /= 1000; u = 'kg'; }
  if (u === 'ml' && q >= 1000) { q /= 1000; u = 'l'; }
  if (u === 'dl' && q >= 10) { q /= 10; u = 'l'; }
  if (u === 'cen') q = Math.max(1, Math.ceil(q - 0.05)); // garlic: whole cloves only, never 0
  let s;
  if (q >= 100) s = String(Math.round(q / 5) * 5);
  else if (q >= 10) s = String(Math.round(q));
  else if (q >= 1) {
    const r = Math.round(q * 4) / 4;
    const whole = Math.floor(r), frac = r - whole;
    s = frac === 0 ? String(whole) : (whole ? whole + ' ' : '') + ({ 0.25: '¼', 0.5: '½', 0.75: '¾' }[frac]);
  } else if (q >= 0.2) { const r = Math.round(q * 4) / 4; s = r === 0.25 ? '¼' : r === 0.5 ? '½' : r === 0.75 ? '¾' : String(Math.round(q * 10) / 10); }
  else s = String(Math.round(q * 100) / 100).replace('.', ',');
  return { s: s.replace('.', ','), u, n: q };
}

/** Pan area helpers for the sweets converter. */
export const panArea = (p) => (p.shape === 'round' ? Math.PI * ((p.d || 26) / 2) ** 2 : (p.w || 30) * (p.h || 20));

// ───────── shopping list ─────────
const TO_BASE = { kg: ['g', 1000], g: ['g', 1], l: ['ml', 1000], dl: ['ml', 100], ml: ['ml', 1] };

/** Shopping parts of the current plan: a month has a big shop (long-life) and one fresh list per week. */
export function shopParts() {
  const st = S();
  if (!st.plan || st.plan.range !== 'month') return ['all'];
  return ['big', ...Array.from({ length: Math.ceil(st.plan.days.length / 7) }, (_, w) => 'w' + w)];
}

export function shoppingList(part = 'all') {
  const st = S();
  if (!st.plan) return { sections: [], have: [] };
  if (!shopParts().includes(part)) part = shopParts()[0];
  const w = part[0] === 'w' ? Number(part.slice(1)) : -1;
  const keep = (id) => (part === 'all' ? true : part === 'big' ? !isFresh(ING[id]) : isFresh(ING[id]));
  const map = new Map();
  const add = (id, q, unit, opt, max) => {
    const [bu, mul] = TO_BASE[unit] || [unit, 1];
    const key = id + '|' + bu;
    const cur = map.get(key) || { id, unit: bu, q: 0, qmax: 0, unknown: false, opt: true };
    if (q == null) cur.unknown = true; else { cur.q += q * mul; cur.qmax += (max ?? q) * mul; }
    cur.opt = cur.opt && !!opt;
    map.set(key, cur);
  };
  st.plan.days.forEach((d, di) => d.dishes.forEach((x) => {
    if (x.left) return;
    if (w >= 0 && Math.floor(di / 7) !== w) return;
    const r = R[x.id];
    if (!r) return;
    const f = x.fixed ? 1 : x.serv / r.serves;
    r.ing.forEach(([id, q, unit, ex]) => keep(id) && add(id, q == null ? null : q * f, unit, ex && ex.opt, ex && ex.max != null ? ex.max * f : null));
  }));
  if (st.mode === 'ramazan' && keep('dates')) add('dates', 25 * st.household * st.plan.days.length, 'g'); // ~3 hurme po osobi dnevno
  const pre = part === 'all' ? '' : part + ':';
  const items = [...map.values()].map((it) => ({ ...it, key: pre + it.id + '|' + it.unit, haveId: haveOrSub(it.id) }));
  const need = items.filter((it) => !it.haveId);
  const have = items.filter((it) => it.haveId);
  const sections = SECTIONS.map((sec) => ({ sec, items: need.filter((it) => ING[it.id].sec === sec).sort((a, b) => ING[a.id].bs.localeCompare(ING[b.id].bs)) }))
    .filter((s) => s.items.length);
  return { sections, have };
}

export function seasonalNow(month = new Date().getMonth() + 1) {
  return Object.values(ING).filter((g) => g.m && g.m.includes(month) && g.m.length < 9);
}
