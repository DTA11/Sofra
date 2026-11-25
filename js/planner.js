import { nutrition } from './nutrition.js';
import { RECIPES, R } from './data/index.js';
import { ING, SUBSTITUTES, SECTIONS } from './data/ingredients.js';
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
  if (ctx.posno && !(st.posnoFish ? r.posnoFish : r.posno)) return false;
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
  s *= healthMul(r);
  if (ctx.weekday < 5 && r.time > (ctx.maxTime ?? st.weekdayMax)) s *= 0.15;
  return Math.max(0.01, s) * (0.55 + Math.random() * 0.9);
}

function recentIds(exceptPlanId) {
  const st = S();
  const cutoff = Date.now() - st.noRepeatWeeks * 7 * DAY;
  return new Set(st.history.filter((h) => h.plan !== exceptPlanId && parseISO(h.date).getTime() >= cutoff).map((h) => h.id));
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
  const sw = styles.map((x) => W[st.styles[x] || 0] || (relax >= 2 ? 0.2 : 0));
  let roll = Math.random() * sw.reduce((a, b) => a + b, 0);
  let style = styles[0];
  for (let i = 0; i < styles.length; i++) { roll -= sw[i]; if (roll <= 0) { style = styles[i]; break; } }
  let best = null, bs = -1;
  for (const r of cands) { if (r.style !== style) continue; const sc = score(r, ctx); if (sc > bs) { bs = sc; best = r; } }
  return best;
}

const MAINS = () => RECIPES.filter((r) => r.type === 'main' || r.type === 'pie' || (r.type === 'salad' && r.full));
const BREAKFASTS = () => RECIPES.filter((r) => r.meal.includes('breakfast') && r.type !== 'combo');
const COMBOS = () => RECIPES.filter((r) => r.type === 'combo');
const DINNERS = () => RECIPES.filter((r) => r.meal.includes('dinner') && r.type !== 'dessert' && (r.light || ['pie', 'salad', 'soup'].includes(r.type)));
const SNACKS = () => RECIPES.filter((r) => r.type === 'snack');
export const ROLE_ORDER = { breakfast: 0, soup: 1, main: 2, side: 3, dinner: 4, snack: 5, dessert: 6 };
// Plan length: one dish, one day, one week or a month (4 weeks).
export const RANGES = { dish: 1, day: 1, week: 7, month: 28 };
/** Days outside the 7-day block of day i become null, so weekly rules work inside a month. */
const wk = (days, i) => { const a = Math.floor(i / 7) * 7; return days.map((d, k) => (k >= a && k < a + 7 ? d : null)); };
/** Fresh food that goes off within a week: bought weekly in a month plan. Everything else is the big shop. */
export const isFresh = (g) => !!g && (!!g.p || (!!g.prod && ['veg', 'bakery', 'dairy', 'deli'].includes(g.sec)));
const sortDishes = (d) => d.dishes.sort((a, b) => (ROLE_ORDER[a.role] ?? 9) - (ROLE_ORDER[b.role] ?? 9));
const SOUPS = () => RECIPES.filter((r) => r.type === 'soup');
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

function ctxFor(start, i, days, planId) {
  const st = S();
  const date = new Date(start.getTime() + i * DAY);
  const wd = weekday(date);
  return {
    date, weekday: wd, month: date.getMonth() + 1,
    posno: st.mode !== 'ramazan' && st.posnoDays.includes(wd),
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
  const ramazan = st.mode === 'ramazan';
  if ((ramazan || st.soupDaily) && !opts.only) {
    const soup = pick(SOUPS(), ctx, used, {}, 0) || pick(SOUPS(), ctx, usedSet(wk(days, i), i), {}, 0);
    if (soup) { day.dishes.push({ id: soup.id, role: 'soup', serv: hh }); used.add(soup.id); }
  }
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
    if (want.snack) { const r = pickMeal('snack', days, i, start, planId); if (r) d.dishes.push({ id: r.id, role: 'snack', serv: st.household }); }
    sortDishes(d);
  });
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
    if (keep.left && r) { const m = d.dishes.find((y) => y.role === 'main'); if (m && m.serv > st.household) m.serv -= st.household; }
  } else {
    const pool = x.role === 'soup' ? SOUPS() : x.role === 'dessert' ? DESSERTS() : RECIPES.filter((q) => q.type === R[x.id].type);
    const ctx = ctxFor(start, i, st.plan.days, st.plan.id);
    const used = usedSet(st.plan.days); used.add(x.id);
    r = pick(pool, ctx, used, {}) || pick(pool, ctx, new Set([...usedSet(wk(st.plan.days, i)), x.id]), {});
    if (r) d.dishes[k] = { ...x, id: r.id, serv: x.fixed ? r.serves : x.serv };
  }
  d.cooked = false;
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
      if (!ctxN.posno || (st.posnoFish ? r.posnoFish : r.posno)) {
        if (st.mode === 'ramazan' || st.soupDaily) {
          const soup = pick(SOUPS(), ctxN, usedSet(days), {}, 0) || pick(SOUPS(), ctxN, usedSet(wk(days, i + 1)), {}, 0);
          if (soup) next.dishes.unshift({ id: soup.id, role: 'soup', serv: st.household });
        }
        days[i + 1] = next;
      } else { m.serv = st.household; d.makesLeft = false; }
    }
  }
  addDesserts(days, start);
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
  old.cooked = false;
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
      if (g.z && R[x.id].type === 'combo') return; // a spoon of ajvar or jam doesn't empty a jar
      if (g.z) { st.pantry[h] = Math.max(0, (Number(st.pantry[h]) || 1) - 1); if (!st.pantry[h]) delete st.pantry[h]; }
      else if (g.p) delete st.pantry[h];
    }));
  }
  save();
}

// ───────── quantities ─────────
export function scaleQ(q, f) { return q == null ? null : q * f; }
export function niceQ(q, unit) {
  if (q == null) return '';
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
