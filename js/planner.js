import { RECIPES, R } from './data/index.js';
import { ING, SUBSTITUTES, SECTIONS } from './data/ingredients.js';
import { S, save } from './store.js';

const DAY = 86400000;
export const iso = (d) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
export const parseISO = (s) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const weekday = (d) => (d.getDay() + 6) % 7; // 0 = Monday

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
  return true;
}

function score(r, ctx) {
  const st = S();
  const w = st.cuisines[r.cu] || 0;
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
  if (ctx.weekday < 5 && r.time > st.weekdayMax) s *= 0.15;
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
    if (relax < 2 && !st.cuisines[r.cu]) return false;
    if (relax < 1 && ctx.recent.has(r.id)) return false;
    if (relax < 1 && r.type === 'pie' && ctx.pies >= 2) return false;
    const k = kindOf(r);
    if (k && relax < 2 && st.rules[k] != null && (kindCount[k] || 0) >= st.rules[k]) return false;
    return true;
  });
  if (!cands.length) return relax < 2 ? pick(pool, ctx, usedIds, kindCount, relax + 1) : null;
  let best = null, bs = -1;
  for (const r of cands) { const sc = score(r, ctx); if (sc > bs) { bs = sc; best = r; } }
  return best;
}

const MAINS = () => RECIPES.filter((r) => r.type === 'main' || r.type === 'pie');
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
  days.forEach((d, i) => { if (!d || i === skip) return; d.dishes.forEach((x) => { if (x.role !== 'main') return; const k = kindOf(R[x.id]); if (k) c[k] = (c[k] || 0) + 1; }); });
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
    weekIngs: weekIngredients(days), recent: recentIds(planId), ...weekShape(days, i),
  };
}

function fillDay(days, i, start, planId, opts = {}) {
  const st = S();
  const ctx = ctxFor(start, i, days, planId);
  const used = usedSet(days, i);
  const kc = kindCounts(days, i);
  const hh = st.household;
  const day = { dishes: [], cooked: false };
  const ramazan = st.mode === 'ramazan';
  if (ramazan || st.soupDaily) {
    const soup = pick(SOUPS(), ctx, used, {}, 0);
    if (soup) { day.dishes.push({ id: soup.id, role: 'soup', serv: hh }); used.add(soup.id); }
  }
  const main = pick(MAINS(), ctx, used, kc);
  if (main) {
    const makeLeft = st.leftovers && main.left && opts.allowLeft && i < 6;
    day.dishes.push({ id: main.id, role: 'main', serv: makeLeft ? hh * 2 : hh });
    day.makesLeft = !!makeLeft;
  }
  return day;
}

function addDesserts(days, start) {
  const st = S();
  const n = Math.min(7, st.dessertsPerWeek);
  if (!n) return;
  // weekend first, then spread
  const order = [6, 5, 3, 1, 4, 2, 0];
  const idx = [];
  for (const wd of order) {
    const i = days.findIndex((_, k) => weekday(new Date(start.getTime() + k * DAY)) === wd);
    if (i >= 0) idx.push(i);
    if (idx.length >= n) break;
  }
  const used = usedSet(days);
  idx.forEach((i) => {
    const ctx = ctxFor(start, i, days, null);
    const d = pick(DESSERTS(), ctx, used, {}, 0);
    if (d) { days[i].dishes.push({ id: d.id, role: 'dessert', serv: d.serves, fixed: 1 }); used.add(d.id); }
  });
}

export function generatePlan(startDate = new Date()) {
  const st = S();
  const start = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  const planId = 'p' + Date.now();
  const days = new Array(7).fill(null);
  for (let i = 0; i < 7; i++) {
    if (days[i]) continue;
    const d = fillDay(days, i, start, planId, { allowLeft: true });
    days[i] = d;
    if (d.makesLeft && i + 1 < 7) {
      const m = d.dishes.find((x) => x.role === 'main');
      const next = { dishes: [{ id: m.id, role: 'main', serv: st.household, left: true }], cooked: false };
      const ctxN = ctxFor(start, i + 1, days, planId);
      const r = R[m.id];
      if (!ctxN.posno || (st.posnoFish ? r.posnoFish : r.posno)) {
        if (st.mode === 'ramazan' || st.soupDaily) {
          const soup = pick(SOUPS(), ctxN, usedSet(days), {}, 0);
          if (soup) next.dishes.unshift({ id: soup.id, role: 'soup', serv: st.household });
        }
        days[i + 1] = next;
      } else { m.serv = st.household; d.makesLeft = false; }
    }
  }
  addDesserts(days, start);
  days.forEach((d) => delete d.makesLeft);
  st.plan = { id: planId, start: iso(start), days };
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
  if (oldMain && !oldMain.left && i + 1 < 7) {
    const nx = days[i + 1].dishes.find((x) => x.role === 'main' && x.left && x.id === oldMain.id);
    if (nx) { days[i + 1].dishes = days[i + 1].dishes.filter((x) => x !== nx); }
  }
  const ctx = ctxFor(start, i, days, plan.id);
  const used = usedSet(days, i);
  if (oldMain) used.add(oldMain.id);
  const kc = kindCounts(days, i);
  const pickR = pick(MAINS(), ctx, used, kc);
  old.dishes = old.dishes.filter((x) => x.role !== 'main');
  if (pickR) {
    const left = st.leftovers && pickR.left && i + 1 < 7 && !days[i + 1].dishes.some((x) => x.role === 'main');
    old.dishes.splice(old.dishes.findIndex((x) => x.role === 'dessert') >= 0 ? old.dishes.findIndex((x) => x.role === 'dessert') : old.dishes.length, 0,
      { id: pickR.id, role: 'main', serv: left ? st.household * 2 : st.household });
    if (left) days[i + 1].dishes.unshift({ id: pickR.id, role: 'main', serv: st.household, left: true });
  }
  // a day that lost its leftover main gets a fresh dish
  if (i + 1 < 7 && !days[i + 1].dishes.some((x) => x.role === 'main')) {
    const ctxN = ctxFor(start, i + 1, days, plan.id);
    const r2 = pick(MAINS(), ctxN, usedSet(days), kindCounts(days));
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

/** Mark a day cooked: remove perishable fresh ingredients from pantry, use one jar of each zimnica. */
export function markCooked(i) {
  const st = S();
  const d = st.plan.days[i];
  d.cooked = !d.cooked;
  if (d.cooked) {
    d.dishes.filter((x) => !x.left).forEach((x) => R[x.id].ing.forEach(([id]) => {
      const h = haveOrSub(id);
      if (!h) return;
      const g = ING[h];
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

export function shoppingList() {
  const st = S();
  if (!st.plan) return { sections: [], have: [] };
  const map = new Map();
  const add = (id, q, unit, opt, max) => {
    const [bu, mul] = TO_BASE[unit] || [unit, 1];
    const key = id + '|' + bu;
    const cur = map.get(key) || { id, unit: bu, q: 0, qmax: 0, unknown: false, opt: true };
    if (q == null) cur.unknown = true; else { cur.q += q * mul; cur.qmax += (max ?? q) * mul; }
    cur.opt = cur.opt && !!opt;
    map.set(key, cur);
  };
  st.plan.days.forEach((d) => d.dishes.forEach((x) => {
    if (x.left) return;
    const r = R[x.id];
    if (!r) return;
    const f = x.fixed ? 1 : x.serv / r.serves;
    r.ing.forEach(([id, q, unit, ex]) => add(id, q == null ? null : q * f, unit, ex && ex.opt, ex && ex.max != null ? ex.max * f : null));
  }));
  if (st.mode === 'ramazan') add('dates', 25 * st.household * 7, 'g'); // ~3 hurme po osobi dnevno
  const items = [...map.values()].map((it) => ({ ...it, key: it.id + '|' + it.unit, haveId: haveOrSub(it.id) }));
  const need = items.filter((it) => !it.haveId);
  const have = items.filter((it) => it.haveId);
  const sections = SECTIONS.map((sec) => ({ sec, items: need.filter((it) => ING[it.id].sec === sec).sort((a, b) => ING[a.id].bs.localeCompare(ING[b.id].bs)) }))
    .filter((s) => s.items.length);
  return { sections, have };
}

export function seasonalNow(month = new Date().getMonth() + 1) {
  return Object.values(ING).filter((g) => g.m && g.m.includes(month) && g.m.length < 9);
}
