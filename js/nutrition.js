// Estimated nutrition per serving and an A–E grade computed with the Nutri-Score (2023) rules.
// Everything is an estimate from the ingredient list — not an official label.
import { ING } from './data/ingredients.js';
import { NUT, STOCK, PIECE, UNIT_G, SPOON, TEASPOON, PACKET, BUNCH, HEAD, YIELD, EDIBLE } from './data/nutrition.js';

const KEYS = ['kcal', 'protein', 'fat', 'sat', 'carbs', 'sugar', 'fibre', 'salt'];

function grams(id, q, unit) {
  if (unit === 'kom' || unit === '') return q * (PIECE[id] ?? 100);
  if (unit === 'kasika') return q * (SPOON[id] ?? 12);
  if (unit === 'kasicica') return q * (TEASPOON[id] ?? 4);
  if (unit === 'kesica') return q * (PACKET[id] ?? 10);
  if (unit === 'sop') return q * (BUNCH[id] ?? 50);
  if (unit === 'glavica') return q * (HEAD[id] ?? 120);
  const ml = ['ml', 'l', 'dl'].includes(unit);
  const dens = ml && ['oil', 'olive_oil', 'lard_or_oil', 'pumpkin_oil'].includes(id) ? 0.92 : 1;
  return q * (UNIT_G[unit] ?? 1) * dens;
}

// A–E grade (Nutri-Score 2023, general foods) from values per 100 g.
const steps = (v, th) => th.filter((t) => v > t).length;
export function gradeOf(p100, fvlPct) {
  const kj = p100.kcal * 4.184;
  const N = steps(kj, [335, 670, 1005, 1340, 1675, 2010, 2345, 2680, 3015, 3350])
    + steps(p100.sugar, [3.4, 6.8, 10, 14, 17, 20, 24, 27, 31, 34, 37, 41, 44, 48, 51])
    + steps(p100.sat, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    + steps(p100.salt, [0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.6, 1.8, 2, 2.2, 2.4, 2.6, 2.8, 3, 3.2, 3.4, 3.6, 3.8, 4]);
  const fvl = fvlPct > 80 ? 5 : fvlPct > 60 ? 2 : fvlPct > 40 ? 1 : 0;
  const fib = steps(p100.fibre, [3, 4.1, 5.2, 6.3, 7.4]);
  const prot = steps(p100.protein, [2.4, 4.8, 7.2, 9.6, 12, 14, 17]);
  const score = N - (fib + fvl + (N >= 11 ? 0 : prot));
  const grade = score <= 0 ? 'A' : score <= 2 ? 'B' : score <= 10 ? 'C' : score <= 18 ? 'D' : 'E';
  return { score, grade };
}

const cache = new Map();
/** Nutrition of a recipe: { serv: {kcal…}, p100: {…}, grade, score, servG, fvlPct } */
export function nutrition(r) {
  if (cache.has(r.id)) return cache.get(r.id);
  const tot = Object.fromEntries(KEYS.map((k) => [k, 0]));
  let mass = 0, fvlMass = 0;
  for (const [id, q, unit, ex = {}] of r.ing) {
    if (ex.opt) continue;
    let g;
    if (q == null) {
      if (id === 'salt') g = 0.8 * r.serves; // "to taste"
      else if (['parsley', 'dill', 'basil'].includes(id)) g = 3 * r.serves;
      else continue;
    } else g = grams(id, q, unit);
    const note = ex.note ? ex.note.join(' ') : '';
    if (/prženje|frying/i.test(note)) g *= 0.15; // most of the frying oil stays in the pan
    if (/korica|zest/i.test(note) && id === 'lemon') g = 5 * q;
    const isStock = id === 'stock_cube' && ['l', 'ml', 'dl'].includes(unit);
    const v = isStock ? STOCK : NUT[id];
    if (!v) continue;
    const eat = g * (EDIBLE[id] ?? 1);
    KEYS.forEach((k, i) => { tot[k] += (v[i] * eat) / 100; });
    const g0 = ING[id] || {};
    let cooked = eat;
    if (r.type !== 'combo') { // assembled breakfasts are eaten as bought — nothing cooks down
      cooked *= YIELD[id] ?? 1;
      if (g0.sec === 'meat' || g0.mt) cooked *= 0.75;
      else if (v[8] && id !== 'beans') cooked *= 0.85;
    }
    if (id === 'salt' || id === 'bones_beef' || g0.drink) cooked = 0; // tea/coffee: the water does not count for the grade
    mass += cooked;
    if (v[8]) fvlMass += cooked;
  }
  // soups: the bowl is mostly broth
  if (r.type === 'soup') mass = Math.max(mass, r.serves * (r.cu === 'jna' ? 300 : 350));
  mass = Math.max(mass, 1);
  const serv = Object.fromEntries(KEYS.map((k) => [k, tot[k] / r.serves]));
  const p100 = Object.fromEntries(KEYS.map((k) => [k, (tot[k] / mass) * 100]));
  const fvlPct = Math.min(100, (fvlMass / mass) * 100);
  const res = { serv, p100, fvlPct, servG: mass / r.serves, ...gradeOf(p100, fvlPct) };
  cache.set(r.id, res);
  return res;
}

export const GRADE_COLORS = { A: '#038141', B: '#85bb2f', C: '#fecb02', D: '#ee8100', E: '#e63e11' };
