import { ING } from './data/ingredients.js';

const KEY = 'sofra.v1';

export function defaults() {
  const pantry = {};
  Object.values(ING).forEach((g) => { if (g.st) pantry[g.id] = 1; });
  return {
    v: 1,
    lang: (navigator.language || 'bs').toLowerCase().startsWith('en') ? 'en' : 'bs',
    household: 4,
    cuisines: { bosanska: 3, balkan: 2, italian: 1, french: 1, jna: 0 },
    rules: { beef: 2, chicken: 3, lamb: 1, pork: 1, fish: 2 },
    noRepeatWeeks: 2,
    weekdayMax: 90,
    leftovers: true,
    soupDaily: false,
    dessertsPerWeek: 2,
    posnoDays: [],
    posnoFish: true,
    noPork: false,
    preferKid: false,
    equipment: { oven: 1, pressure: 1, sac: 0, kazan: 0, grill: 0 },
    mode: 'normal',
    pantry,            // id -> 1 (have) ; zimnica: number of jars
    favs: [],
    plan: null,        // { id, start: 'YYYY-MM-DD', days: [{ dishes:[{id, role, serv, left}], cooked }] }
    history: [],       // [{ id, date }]
    shop: { checked: {}, extra: [] },
  };
}

let state;
export function load() {
  try {
    const raw = localStorage.getItem(KEY);
    state = raw ? { ...defaults(), ...JSON.parse(raw) } : defaults();
  } catch { state = defaults(); }
  return state;
}
export const S = () => state;
export function save() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { console.warn('save failed', e); }
}
export function replace(next) { state = { ...defaults(), ...next }; save(); }
export function exportJSON() { return JSON.stringify({ app: 'sofra', exported: new Date().toISOString(), data: state }, null, 1); }
export function importJSON(text) {
  const obj = JSON.parse(text);
  const data = obj && obj.app === 'sofra' ? obj.data : obj;
  if (!data || typeof data !== 'object' || !('pantry' in data)) throw new Error('bad');
  replace(data);
}
export function resetAll() { localStorage.removeItem(KEY); state = defaults(); save(); }

export const has = (id) => !!(state.pantry[id]);
export function setHave(id, on) {
  const g = ING[id];
  if (on) state.pantry[id] = g && g.z ? Math.max(1, Number(state.pantry[id]) || 0) : 1;
  else delete state.pantry[id];
}
export function toggleFav(id) {
  const i = state.favs.indexOf(id);
  if (i >= 0) state.favs.splice(i, 1); else state.favs.push(id);
  save();
}
