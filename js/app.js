import { RECIPES, R, MENUS, JUF } from './data/index.js';
import { ING, SECTIONS, MEAT_ALT } from './data/ingredients.js';
import { t, L, keys, regionCountry, tx, setLang, getLang, unitLabel, DAYS, MONTHS } from './i18n.js';
import * as store from './store.js';
import { liveGuides, GUIDE_INDEX } from './data/guides.js';
import { dishArt, ICON, KILIM } from './art.js';
import { nutrition, GRADE_COLORS } from './nutrition.js';
import { generatePlan, swapDay, swapDish, markCooked, setDayDishes, shoppingList, shopParts, niceQ, panArea, parseISO, seasonalNow, kindOf } from './planner.js';

const $ = (s, el = document) => el.querySelector(s);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const S = () => store.S();
const name = (r) => (getLang() === 'bs' ? r.bs : r.en);
const iname = (id) => { const g = ING[id]; return g ? (getLang() === 'bs' ? g.bs : g.en) : id; };
const DAYMS = 86400000;
const nf = (v, d = 0) => (Math.round(v * 10 ** d) / 10 ** d).toLocaleString(getLang() === 'bs' ? 'hr-HR' : 'en-GB', { minimumFractionDigits: d, maximumFractionDigits: d });
const gradeChip = (r) => { const g = nutrition(r).grade; return `<span class="ns ns-${g}" title="${t('nutGrade')}">${g}</span>`; };
const perPortion = (r) => r.serves > 1 || r.type === 'soup' || r.type === 'combo';
function nutTags(n, pp) {
  // per serving where a serving exists, otherwise per 100 g (trays of sweets)
  const s = n.serv, h = n.p100, out = [];
  const protein = pp ? s.protein >= 20 && s.protein * 4 >= s.kcal * 0.2 : h.protein >= 10;
  if (protein) out.push(['good', t('tProtein')]);
  if (pp ? s.fibre >= 6 : h.fibre >= 6) out.push(['good', t('tFibre')]);
  if (n.fvlPct >= 50) out.push(['good', t('tVeg')]);
  if (h.kcal < 100 && (!pp || s.kcal < 400)) out.push(['good', t('tLight')]);
  if (pp ? s.salt >= 2.5 : h.salt >= 1.5) out.push(['warn', t('tSalt')]);
  if (pp ? s.sat >= 10 : h.sat >= 5) out.push(['warn', t('tSat')]);
  if (pp ? s.sugar >= 25 : h.sugar >= 22.5) out.push(['warn', t('tSugar')]);
  return out;
}
function nutBox(r) {
  const n = nutrition(r), pp = perPortion(r);
  const dens = n.p100.kcal < 150 ? t('densLow') : n.p100.kcal <= 250 ? t('densMid') : t('densHigh');
  const row = (lbl, k, d, sub) => `<tr class="${sub ? 'sub' : ''}"><th>${lbl}</th>${pp ? `<td>${nf(n.serv[k], d)} g</td>` : ''}<td>${nf(n.p100[k], d)} g</td></tr>`;
  return `<section class="nut">
    <h3>${t('nutTitle')}</h3>
    <div class="nut-top">
      <div class="nscale" aria-label="${t('nutGrade')} ${n.grade}">${'ABCDE'.split('').map((g) => `<span class="ns ns-${g} ${g === n.grade ? 'on' : ''}">${g}</span>`).join('')}</div>
      <small class="muted">${t('nutGrade')} · ${t('nutGradeNote')}</small>
    </div>
    <div class="nut-kcal">${pp ? `<b>${nf(n.serv.kcal)}</b> ${t('kcal')} / ${t('nutServ').toLowerCase()} <small class="muted">(≈ ${nf(Math.round(n.servG / 10) * 10)} g · ${nf((n.serv.kcal / 2000) * 100)} % ${t('ofDaily')})</small><br>` : ''}
      <span class="muted">${t('energyDens')}: <b>${nf(n.p100.kcal)} ${t('kcal')}/100 g</b> — ${dens}</span></div>
    <div class="tags">${nutTags(n, pp).map(([c, l]) => `<span class="tag nt-${c}">${esc(l)}</span>`).join('')}</div>
    <table class="nutt"><thead><tr><th></th>${pp ? `<th>${t('nutServ')}</th>` : ''}<th>${t('nutPer100')}</th></tr></thead><tbody>
      ${row(t('nProtein'), 'protein', 0)}${row(t('nFat'), 'fat', 0)}${row(t('nSat'), 'sat', 1, 1)}${row(t('nCarbs'), 'carbs', 0)}${row(t('nSugar'), 'sugar', 1, 1)}${row(t('nFibre'), 'fibre', 1)}${row(t('nSalt'), 'salt', 1)}
    </tbody></table>
    <p class="small muted">${t('nutNote')}</p>
  </section>`;
}

// ───────── UI state (not persisted) ─────────
const ui = {
  filters: { q: '', cu: new Set(), type: '', main: '', meal: '', time: '', eq: '', diet: new Set(), occ: '', season: false, fav: false, sub: '', reg: '', grade: new Set() },
  showFilters: false,
  serv: {},      // recipe id -> servings
  pan: {},       // recipe id -> {shape,w,h,d}
  pantryQ: '',
  shopPart: null, // month plan: 'big' or 'w0'…'w3'
  installEvt: null,
};

// ───────── helpers ─────────
function toast(msg) {
  const el = $('#toast');
  el.textContent = msg; el.classList.add('show');
  clearTimeout(toast._t); toast._t = setTimeout(() => el.classList.remove('show'), 2600);
}
function fmtTime(r) { return (r.tApprox ? '≈ ' : '') + (r.time >= 60 ? `${Math.floor(r.time / 60)} h${r.time % 60 ? ' ' + (r.time % 60) + ' min' : ''}` : `${r.time} min`); }
function dayLabel(start, i) {
  const d = new Date(start.getTime() + i * DAYMS);
  const wd = (d.getDay() + 6) % 7;
  const today = new Date(); const isToday = d.toDateString() === today.toDateString();
  return { name: DAYS[getLang()][wd], date: `${d.getDate()}. ${MONTHS[getLang()][d.getMonth()].slice(0, 3)}${getLang() === 'bs' ? '' : ''}`, isToday, wd };
}
function badges(r) {
  const b = [];
  if (r.posno) b.push(`<span class="tag tag-posno">${t('posno')}</span>`);
  else if (r.veg) b.push(`<span class="tag">${t('veg')}</span>`);
  if (r.kid) b.push(`<span class="tag">${t('kid')}</span>`);
  if (!r.noPork) b.push(`<span class="tag tag-pork">🐖</span>`);
  return b.join('');
}

/** One formatted ingredient line. f = scale factor. */
function ingLine(ing, f) {
  const { qty, nm, alt, tail } = ingParts(ing, f);
  return `<li><span class="q">${esc(qty)}</span><span class="n">${esc(nm)}${alt ? `<span class="alt">${esc(alt)}</span>` : ''}${tail ? ` <small>(${esc(tail)})</small>` : ''}</span></li>`;
}

function scaleFor(r) {
  if (r.pan) {
    const mine = ui.pan[r.id];
    return mine ? panArea(mine) / panArea(r.pan) : 1;
  }
  const s = ui.serv[r.id] ?? defaultServ(r);
  return s / r.serves;
}
function defaultServ(r) {
  if (r.type === 'dessert') return r.serves;
  return S().household;
}

// ───────── routing ─────────
const routes = {
  home: viewHome, plan: viewPlan, recipes: viewRecipes, recipe: viewRecipe, sweets: viewSweets, jna: viewJNA, vojnicka: viewJNA, holidays: viewHolidays, dorucci: viewCombos,
  pantry: viewPantry, shop: viewShop, settings: viewSettings, cook: viewCook,
};
function route() {
  const [name, arg] = (location.hash.replace(/^#\/?/, '') || (isStandalone() ? 'plan' : 'home')).split('/');
  const fn = routes[name] || (isStandalone() ? viewPlan : viewHome);
  stopWake();
  JUF.home = S().jufka !== 'shop';
  document.body.classList.toggle('cooking', name === 'cook');
  $('#main').innerHTML = fn(decodeURIComponent(arg || ''));
  document.querySelectorAll('.tabbar a').forEach((a) => a.classList.toggle('on', a.dataset.tab === (['recipe', 'jna', 'vojnicka', 'dorucci', 'holidays'].includes(name) ? (name === 'holidays' ? 'plan' : 'recipes') : name)));
  const navKey = ['recipe', 'jna', 'vojnicka', 'dorucci'].includes(name) ? 'recipes' : name === 'holidays' ? 'plan' : (routes[name] ? name : (isStandalone() ? 'plan' : 'home'));
  document.querySelectorAll('[data-nav]').forEach((a) => a.classList.toggle('on', a.dataset.nav === navKey));
  syncInstallButtons();
  { const gk = { settings: 'settings', pantry: 'pantry' }[name]; if (gk && !(S().guide || {})[gk]) { S().guide = { ...S().guide, [gk]: true }; store.save(); } } // quick guide: page visited = step done
  if (name === 'cook') startCook(arg);
  window.scrollTo(0, 0);
  renderChrome();
}
/** Re-render the current page after an in-page change, keeping the scroll position. */
function rerender() { const y = window.scrollY; route(); window.scrollTo(0, y); }
const go = (h) => { if (location.hash === h) route(); else location.hash = h; };

// ───────── plan length & first-steps guide ─────────
const RANGE_KEYS = [['dish', 'rDish'], ['day', 'rDay'], ['week', 'rWeek'], ['month', 'rMonth']];
const planRange = () => (S().plan && S().plan.range) || 'week';
/** "Za koliko?" sheet: one dish, one day, a week or a month. */
function askRange(after) {
  const cur = S().range || 'week';
  const m = $('#modal');
  m.innerHTML = `<div class="sheet"><h3>${t('rangeQ')}</h3><div class="rangepick">${RANGE_KEYS.map(([k, l]) => `<button class="rbtn ${k === cur ? 'on' : ''}" data-range="${k}"><b>${t(l)}</b><small>${t(l + 'D')}</small></button>`).join('')}</div>
    <button class="btn" data-range="x">${t('cancel')}</button></div>`;
  m.classList.add('open');
  m.onclick = (e) => {
    const b = e.target.closest('[data-range]');
    if (!b && e.target !== m) return;
    m.classList.remove('open'); m.onclick = null;
    if (!b || b.dataset.range === 'x') return;
    generatePlan(new Date(), b.dataset.range);
    ui.shopPart = null;
    if (after) after(); else route();
  };
}
function guideCard() {
  const st = S(); const g = st.guide || {};
  if (g.done) return '';
  const steps = [
    { ok: g.pantry, n: 1, tt: 'g1t', d: 'g1d', btn: `<a class="btn sm {P}" href="#/pantry">${ICON.pantry} ${t('g1b')}</a>` },
    { ok: !!st.plan, n: 2, tt: 'g2t', d: 'g2d', btn: `<button class="btn sm {P}" data-act="newplan">${ICON.plan} ${t('g2b')}</button>` },
    { ok: g.shop, n: 3, tt: 'g3t', d: 'g3d', btn: `<a class="btn sm {P}" href="#/shop">${ICON.shop} ${t('g3b')}</a>` },
  ];
  const all = steps.every((x) => x.ok);
  const next = steps.findIndex((x) => !x.ok); // only the next step to do is highlighted
  steps.forEach((x, k) => { x.btn = x.btn.replace('{P}', k === next ? 'primary' : ''); });
  return `<section class="guide"><h2>${t('guideTitle')}</h2><p class="muted small">${t('guideLede')}</p>
    <ol class="gsteps">${steps.map((x) => `<li class="${x.ok ? 'ok' : ''}"><span class="gno">${x.ok ? ICON.check : x.n}</span><div><b>${t(x.tt)}</b><p>${t(x.d)}</p>${x.btn}</div></li>`).join('')}</ol>
    <button class="btn ${all ? 'primary' : 'ghost'} sm" data-act="guidedone">${all ? t('guideDone') : t('guideSkip')}</button></section>`;
}
/** Quick-guide window: opens on every app load until "Don't show again" is ticked or all four steps are done. */
function welcome() {
  const st = S(); const g = st.guide || {};
  const name = location.hash.replace(/^#\/?/, '').split('/')[0];
  if (g.welcomeOff || name === 'cook') return;
  const steps = [
    [g.settings, 'w1', `<a class="btn sm {P}" href="#/settings" data-w>${ICON.gear} ${t('w1b')}</a>`],
    [g.pantry, 'w2', `<a class="btn sm {P}" href="#/pantry" data-w>${ICON.pantry} ${t('w2b')}</a>`],
    [!!st.plan, 'w3', `<button class="btn sm {P}" data-w="plan">${ICON.plan} ${t('w3b')}</button>`],
    [g.shop, 'w4', `<a class="btn sm {P}" href="#/shop" data-w>${ICON.shop} ${t('w4b')}</a>`],
  ];
  if (steps.every((x) => x[0])) return;
  const next = steps.findIndex((x) => !x[0]);
  const m = $('#modal');
  m.innerHTML = `<div class="sheet welcome"><h3>${t('wTitle')}</h3><p class="muted small">${t('wLede')}</p>
    <ol class="gsteps">${steps.map(([ok, k, b], i) => `${i === 0 ? `<li class="wlabel">${t('wFirst')}</li>` : i === 2 ? `<li class="wlabel">${t('wThen')}</li>` : ''}<li class="${ok ? 'ok' : ''}"><span class="gno">${ok ? ICON.check : i + 1}</span><div><b>${t(k + 't')}</b><p>${t(k + 'd')}</p>${ok ? '' : b.replace('{P}', i === next ? 'primary' : '')}</div></li>`).join('')}</ol>
    <div class="wfoot"><label class="check"><input type="checkbox" data-wnever> ${t('wNever')}</label><button class="btn" data-w="x">${t('wClose')}</button></div></div>`;
  m.classList.add('open');
  m.onclick = (e) => {
    const b = e.target.closest('[data-w]');
    if (!b && e.target !== m) return;
    if (m.querySelector('[data-wnever]').checked) { st.guide = { ...st.guide, welcomeOff: true }; store.save(); }
    m.classList.remove('open'); m.onclick = null;
    if (b && b.dataset.w === 'plan') askRange(() => go('#/plan'));
  };
}
// Quick-start pantry list: what most kitchens have
const STARTER = ['onion', 'garlic', 'potato', 'carrot', 'flour', 'rice', 'sugar', 'salt', 'pepper_black', 'paprika_sweet', 'bay_leaf', 'vegeta', 'oil', 'olive_oil', 'vinegar', 'tomato_paste',
  'eggs', 'milk', 'butter', 'yogurt', 'sour_cream', 'feta', 'bread', 'lemon', 'pasta_short', 'spaghetti', 'beans', 'lentils', 'semolina', 'cornmeal', 'breadcrumbs', 'yeast', 'baking_powder',
  'vanilla_sugar', 'stock_cube', 'tomato_can', 'cinnamon', 'oregano', 'paprika_hot', 'walnuts', 'mustard', 'mayonnaise', 'pickles', 'honey', 'tea', 'coffee_ground'].filter((id) => ING[id]);

function renderChrome() {
  $('#langBtn').textContent = getLang() === 'bs' ? 'EN' : 'BS';
  document.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll('[data-guides]').forEach((el) => { el.href = GUIDE_INDEX[getLang()]; });
}

// ───────── HOME (website landing) ─────────
const isStandalone = () => (window.matchMedia && matchMedia('(display-mode: standalone)').matches) || navigator.standalone === true;
function viewHome() {
  const st = S();
  const picks = ['begova-corba', 'bosanski-lonac', 'cevapi', 'zeljanica', 'tufahije', 'sac-janjetina', 'pasta-brokula', 'jna-pileca-supa'].map((id) => R[id]).filter(Boolean);
  return `<section class="band home-hero">
      <div class="hh-txt">
        <p class="eyebrow">${getLang() === 'bs' ? 'Domaća kuhinja · Sedmični jelovnik' : 'Home cooking · Weekly menu'}</p>
        <h1 class="display xl">${t('homeTitle')}</h1>
        <p class="lede">${t('homeLede')}</p>
        <div class="row gap wrap cta">
          ${st.plan ? `<a class="btn light" href="#/plan">${ICON.plan} ${t('homeOpen')}</a>` : `<button class="btn light" data-act="homeplan">${ICON.plan} ${t('homeCta')}</button>`}
          <button class="btn ghost hh-install" data-act="install" data-install-cta hidden>${ICON.share} ${t('homeInstall')}</button>
        </div>
        <div class="trust"><span>${ICON.check}${RECIPES.length} ${t('dishes')}</span><span>${ICON.check}${getLang() === 'bs' ? 'Bez registracije' : 'No sign-up'}</span><span>${ICON.check}${getLang() === 'bs' ? 'Radi i bez interneta' : 'Works offline'}</span></div>
      </div>
      ${todayPick()}
    </section>
    <section class="home-sec">
      <div class="sec-head"><h2>${t('fromKitchen')}</h2><a href="#/recipes">${t('allRecipes')} →</a></div>
      <div class="hscroll">${picks.map(card).join('')}</div>
    </section>
    <section class="home-sec how">
      <h2>${t('howTitle')}</h2>
      <ol class="howlist"><li>${t('how1')}</li><li>${t('how2')}</li><li>${t('how3')}</li></ol>
      <button class="btn primary" data-act="install" data-install-cta hidden>${ICON.share} ${t('homeInstall')}</button>
    </section>
    <section class="home-sec privacy"><h3>${ICON.check} ${t('privacyTitle')}</h3><p>${t('privacyText')}</p></section>
    <footer class="sitefoot"><p><b>Sofra</b> — ${t('footer').replace(/^Sofra — /, '')}</p>
      <p class="small"><a href="#/recipes">${t('tabRecipes')}</a> · <a href="#/sweets">${t('tabSweets')}</a> · <a href="#/vojnicka">${t('jnaTitle')}</a> · <a href="#/holidays">${t('holidays')}</a> · <a href="${GUIDE_INDEX[getLang()]}">${t('guides')}</a> · <a href="#/settings">${t('settings')}</a></p></footer>`;
}

// "Prijedlog za danas": a random dish, the same all day, new one on tap
function pickPool() {
  const st = S(); const m = new Date().getMonth() + 1;
  const all = RECIPES.filter((r) => (r.type === 'main' || r.type === 'pie' || (r.type === 'salad' && r.full)) && (st.styles[r.style] || 0) > 0
    && (!st.noPork && st.mode !== 'ramazan' || r.noPork) && (!r.months || r.months.includes(m)) && !(r.eq || []).some((e) => !st.equipment[e])
    && ((st.meatless || 0) < 3 || r.veg));
  // "Zdravije" 2–3: today's idea skips grade D/E (if anything is left)
  const lite = (st.health || 0) >= 2 ? all.filter((r) => !'DE'.includes(nutrition(r).grade)) : all;
  return lite.length ? lite : all;
}
function todayPick() {
  const pool = pickPool(); if (!pool.length) return '';
  if (ui.pickIdx == null) { const d = new Date(); const seed = d.getFullYear() * 400 + d.getMonth() * 32 + d.getDate(); ui.pickIdx = (seed * 7919) % pool.length; }
  const r = pool[ui.pickIdx % pool.length];
  const st = S();
  return `<div class="pick">
      <a class="pick-art" href="#/recipe/${r.id}">${dishArt(r, 'big')}</a>
      <div class="pick-txt">
        <span class="label">${getLang() === 'bs' ? 'Prijedlog za danas' : 'Today’s idea'}</span>
        <a class="pick-name" href="#/recipe/${r.id}">${esc(name(r))}</a>
        <p class="meta-row">${ICON.clock}${fmtTime(r)} <span class="dot"></span>${esc(L('type', r.type))}</p>
        <div class="row gap wrap">
          <a class="btn light sm" href="#/cook/${r.id}?s=${st.household}">${ICON.play} ${t('cook')}</a>
          <button class="btn ghost sm" data-act="repick">${ICON.refresh} ${getLang() === 'bs' ? 'Drugi prijedlog' : 'Another idea'}</button>
        </div>
      </div>
    </div>`;
}

// ───────── install button (same behaviour as Baby Card Printables) ─────────
const install = { ask: window.__bip || null, ios: /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1),
  // in-app browsers (Messenger, Facebook, Instagram, Viber…) can't install a web app — send the user to the real browser
  inapp: /FBAN|FBAV|FB_IAB|FBIOS|Messenger|Instagram|MicroMessenger|Line\/|Snapchat|musical_ly|TikTok|Viber|; wv\)/i.test(navigator.userAgent),
  android: /Android/i.test(navigator.userAgent) };
function installAvailable() { return !isStandalone() && (install.ask || install.ios || install.inapp); }
function openInBrowser() {
  const url = location.href;
  if (install.android) location.href = `intent://${location.host}${location.pathname}${location.search}${location.hash}#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=${encodeURIComponent(url)};end`;
  else if (install.ios) location.href = 'x-safari-' + url; // opens Safari on iOS 17+
}
function syncInstallButtons() {
  document.querySelectorAll('[data-install-btn],[data-install-cta]').forEach((b) => { b.hidden = !installAvailable(); });
}
function doInstall() {
  const steps0 = $('[data-install-steps]');
  if (install.inapp && steps0) {
    steps0.querySelector('[data-steps-inapp]').hidden = false;
    ['[data-steps-title]', '[data-steps-safari]', '[data-steps-other]'].forEach((q) => { steps0.querySelector(q).hidden = true; });
    steps0.querySelector('[data-inapp-open]').onclick = (e) => { e.preventDefault(); openInBrowser(); };
    if (steps0.showModal) steps0.showModal(); else steps0.setAttribute('open', '');
    return;
  }
  if (install.ask) { install.ask.prompt(); install.ask.userChoice.finally(() => { install.ask = null; syncInstallButtons(); }); return; }
  const steps = $('[data-install-steps]');
  if (install.ios && steps) {
    if (/FxiOS|CriOS|EdgiOS|OPiOS/.test(navigator.userAgent)) { steps.querySelector('[data-steps-safari]').hidden = true; steps.querySelector('[data-steps-other]').hidden = false; }
    if (steps.showModal) steps.showModal(); else steps.setAttribute('open', '');
  }
}
window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); install.ask = e; ui.installEvt = e; syncInstallButtons(); });
window.addEventListener('appinstalled', () => { install.ask = null; syncInstallButtons(); });

function roleLabel(x) {
  const st = S(); const ram = st.mode === 'ramazan';
  if (x.left) return x.role === 'dinner' ? t('leftLunch') : t('leftover');
  if (x.role === 'main') return ram ? t('iftar') : st.meals.lunch === false ? t('dinner') : t('lunch');
  if (x.role === 'breakfast') return ram ? t('sehur') : t('breakfast');
  return t(x.role);
}

// ───────── PLAN ─────────
function viewPlan() {
  const st = S();
  const sez = seasonalNow().slice(0, 12).map((g) => `<span class="chip chip-static">${esc(iname(g.id))}</span>`).join('');
  const now = new Date();
  const dateTxt = `${DAYS[getLang()][(now.getDay() + 6) % 7]}, ${now.getDate()}. ${MONTHS[getLang()][now.getMonth()]}`;
  const actions = `<div class="quick">
      <button class="qbtn" data-act="newplan">${ICON.refresh}<span>${st.plan ? t('regen') : t('newPlan')}</span></button>
      <a class="qbtn" href="#/shop">${ICON.shop}<span>${t('tabShop')}</span></a>
      <button class="qbtn" data-act="print">${ICON.doc}<span>${t('pdf')}</span></button>
      <a class="qbtn" href="#/holidays">${ICON.party}<span>${t('holidays')}</span></a>
    </div>`;
  const season = `<section class="season"><h3>${ICON.leaf} ${t('seasonNow')} · ${MONTHS[getLang()][now.getMonth()]}</h3><div class="chips">${sez}</div></section>`;
  if (!st.plan) {
    return `<section class="band hero-band"><p class="eyebrow">${dateTxt}</p><h1 class="display">Sofra</h1><p class="lede">${t('appTagline')}</p>
      <div class="hero-plate">${dishArt(R['bosanski-lonac'], 'big')}</div></section>
      ${guideCard()}
      ${st.mode === 'ramazan' ? `<div class="banner">${ICON.moon} ${t('ramazanNote')}</div>` : ''}
      <div class="empty">${t('emptyPlan')}</div>${actions}
      <div class="row gap"><a class="btn" href="#/settings">${ICON.gear} ${t('planSettings')}</a></div>${season}`;
  }
  const start = parseISO(st.plan.start);
  const ti = Math.floor((new Date(now.getFullYear(), now.getMonth(), now.getDate()) - start) / DAYMS);
  const nDays = st.plan.days.length;
  const todayIdx = ti >= 0 && ti < nDays ? ti : 0;
  const rng = planRange();
  const wa = Math.floor(todayIdx / 7) * 7; // a month shows the strip of the current week
  const tMain = st.plan.days[todayIdx].dishes.find((x) => x.role === 'main') || st.plan.days[todayIdx].dishes[0];
  const tr = tMain && R[tMain.id];
  const others = st.plan.days[todayIdx].dishes.filter((x) => x !== tMain).map((x) => `<span class="also-i"><b>${esc(roleLabel(x))}:</b> ${esc(name(R[x.id]))}</span>`).join('');
  const hero = tr ? `<section class="band hero-band">
      <p class="eyebrow">${dateTxt}</p>
      <div class="today">
        <div class="today-art">${dishArt(tr, 'big')}</div>
        <div class="today-txt">
          <span class="label">${t('todayOnTable')} · ${esc(roleLabel(tMain))}</span>
          <h1 class="display">${esc(name(tr))}</h1>
          <p class="meta-row">${ICON.clock}${fmtTime(tr)} <span class="dot"></span>${ICON.people}${tMain.serv} ${t('persons')}</p>
          ${others ? `<p class="also">${others}</p>` : ''}
          <div class="row gap wrap">
            <a class="btn light" href="#/cook/${tr.id}?s=${tMain.serv}&f=${tMain.fixed ? 1 : 0}">${ICON.play} ${t('cook')}</a>
            <a class="btn ghost" href="#/recipe/${tr.id}">${t('recipe')}</a>
          </div>
        </div>
      </div>
      ${nDays > 1 ? `<div class="week">${st.plan.days.map((d, i) => {
        if (nDays > 7 && (i < wa || i >= wa + 7)) return '';
        const dl = dayLabel(start, i);
        const m = d.dishes.find((x) => x.role === 'main');
        const r = m && R[m.id];
        return `<button class="wday ${i === todayIdx ? 'on' : ''} ${d.cooked ? 'done' : ''}" data-act="jump" data-i="${i}">
          <small>${dl.name.slice(0, 3)}</small><b>${new Date(start.getTime() + i * DAYMS).getDate()}</b>
          ${r ? dishArt(r, 'mini') : ''}<span>${r ? esc(name(r)) : '—'}</span></button>`;
      }).join('')}</div>` : ''}
    </section>` : '';
  const days = st.plan.days.map((d, i) => {
    const dl = dayLabel(start, i);
    const dishes = d.dishes.map((x) => {
      const r = R[x.id]; if (!r) return '';
      const role = roleLabel(x);
      const serv = x.fixed ? (r.yieldNote ? tx(r.yieldNote) : '') : `${x.serv} ${t('persons')}`;
      return `<li class="dish ${x.left ? 'is-left' : ''} role-${x.role}">
        <a href="#/recipe/${r.id}" class="thumb">${dishArt(r, 'thumb')}</a>
        <div class="dtxt"><span class="role">${esc(role)}</span>
          <a href="#/recipe/${r.id}" class="dname">${esc(name(r))}</a>
          <span class="meta">${esc(serv)}${x.left ? '' : r.type === 'combo' ? ` · ≈ ${nf(Math.round(nutrition(r).serv.kcal / 10) * 10)} kcal` : ' · ' + fmtTime(r)}</span></div>
        <div class="dact">
          ${!x.left ? `<button class="icon" aria-label="${t('swap')}" data-act="swapdish" data-i="${i}" data-k="${d.dishes.indexOf(x)}">${ICON.swap}</button>` : ''}
          ${!x.left ? `<a class="icon play" aria-label="${t('cook')}" href="#/cook/${r.id}?s=${x.serv}&f=${x.fixed ? 1 : 0}">${ICON.play}</a>` : ''}
        </div>
      </li>`;
    }).join('');
    const kc = d.dishes.reduce((a, x) => { const r = R[x.id]; return r && perPortion(r) ? a + nutrition(r).serv.kcal : a; }, 0);
    const wh = nDays > 7 && i % 7 === 0 ? `<h3 class="weekhead">${i / 7 + 1}. ${t('weekN')}</h3>` : '';
    return `${wh}<article class="day ${i === todayIdx ? 'today' : ''} ${d.cooked ? 'cooked' : ''}" id="day-${i}">
      <header><div><b>${dl.name}</b><span class="muted"> ${dl.date}</span>${kc ? `<span class="daykcal">≈ ${nf(Math.round(kc / 10) * 10)} kcal ${t('dayKcal')}</span>` : ''}</div>
        <button class="cookbtn ${d.cooked ? 'on' : ''}" data-act="cooked" data-i="${i}">${ICON.check}<span>${t('cooked')}</span></button></header>
      <ul>${dishes || `<li class="muted">${t('noMatch')}</li>`}</ul>
    </article>`;
  }).join('');
  const secT = { dish: 'tDish', day: 'tDay', week: 'thisWeek', month: 'tMonth' }[rng];
  return `${guideCard()}${hero}${st.mode === 'ramazan' ? `<div class="banner">${ICON.moon} ${t('ramazanNote')}</div>` : ''}
    ${actions}
    <h2 class="sec-title">${t(secT)}</h2>
    <div class="days">${days}</div>${season}`;
}

// ───────── RECIPES ─────────
function matches(r, f) {
  if (f.q) { const q = f.q.toLowerCase(); if (!(`${r.bs} ${r.en} ${r.ing.map((i) => iname(i[0])).join(' ')}`.toLowerCase().includes(q))) return false; }
  if (f.cu.size && !f.cu.has(r.cu)) return false;
  if (f.reg && r.reg !== f.reg) return false;
  if (f.grade.size && !f.grade.has(nutrition(r).grade)) return false;
  if (f.type && r.type !== f.type) return false;
  if (f.sub && r.sub !== f.sub) return false;
  if (f.main && r.main !== f.main) return false;
  if (f.meal && !r.meal.includes(f.meal)) return false;
  if (f.time === 't30' && r.time > 30) return false;
  if (f.time === 't60' && r.time > 60) return false;
  if (f.time === 't60p' && r.time <= 60) return false;
  if (f.eq && !(r.eq.includes(f.eq) || r.eqOpt.includes(f.eq))) return false;
  if (f.diet.has('noPork') && !r.noPork) return false;
  if (f.diet.has('posno') && !r.posno) return false;
  if (f.diet.has('kid') && !r.kid) return false;
  if (f.diet.has('veg') && !r.veg) return false;
  if (f.occ && !r.occ.includes(f.occ)) return false;
  if (f.season && r.months && !r.months.includes(new Date().getMonth() + 1)) return false;
  if (f.fav && !S().favs.includes(r.id)) return false;
  return true;
}
function chipGroup(label, key, opts, multi = false) {
  const f = ui.filters;
  return `<div class="fgroup"><span class="flabel">${label}</span><div class="chips">${opts.map(([v, txt]) => {
    const on = multi ? f[key].has(v) : f[key] === v;
    return `<button class="chip ${on ? 'on' : ''}" data-act="filter" data-k="${key}" data-v="${v}" data-m="${multi ? 1 : 0}">${esc(txt)}</button>`;
  }).join('')}</div></div>`;
}
function card(r) {
  const fav = S().favs.includes(r.id);
  return `<a class="card" href="#/recipe/${r.id}">
    ${dishArt(r, 'cardart')}
    <div class="card-body">
      <div class="card-top"><span class="cu cu-${r.cu}">${esc(r.type === 'dessert' && r.sub ? L('sub', r.sub) : L('type', r.type))}</span><span class="time">${gradeChip(r)}${r.type === 'combo' ? `${nf(Math.round(nutrition(r).serv.kcal / 10) * 10)} kcal` : ICON.clock + fmtTime(r)}</span></div>
      <b>${esc(name(r))}</b>
      <div class="tags">${badges(r)}${fav ? `<span class="tag fav">★</span>` : ''}</div>
    </div>
  </a>`;
}
function filterPanel(extra = '') {
  const f = ui.filters;
  return `<div class="filters ${ui.showFilters ? 'open' : ''}">
    ${extra || chipGroup(t('fType'), 'type', ['breakfast', 'combo', 'main', 'soup', 'pie', 'salad', 'snack'].map((k) => [k, L('type', k)]))}
    ${chipGroup(t('fMain'), 'main', ['beef', 'chicken', 'lamb', 'fish', 'eggs', 'cheese', 'beans', 'potato', 'broccoli', 'spinach', 'veg', 'pasta', 'rice', 'pork'].map((k) => [k, L('main', k)]))}
    ${chipGroup(t('fMeal'), 'meal', ['breakfast', 'lunch', 'dinner', 'snack', 'iftar'].map((k) => [k, L('meal', k)]))}
    ${chipGroup(t('fTime'), 'time', [['t30', t('t30')], ['t60', t('t60')], ['t60p', t('t60p')]])}
    ${chipGroup(t('fEquip'), 'eq', keys('eq').map((k) => [k, L('eq', k)]))}
    ${chipGroup(t('fDiet'), 'diet', [['noPork', t('noPork')], ['posno', t('posno')], ['veg', t('veg')], ['kid', t('kid')]], true)}
    ${chipGroup(t('fGrade'), 'grade', 'ABCDE'.split('').map((g) => [g, g]), true)}
    ${chipGroup(t('fOcc'), 'occ', keys('occ').map((k) => [k, L('occ', k)]))}
    <div class="fgroup"><div class="chips">
      <button class="chip ${f.season ? 'on' : ''}" data-act="ftoggle" data-k="season">🌱 ${t('fSeason')}</button>
      <button class="chip ${f.fav ? 'on' : ''}" data-act="ftoggle" data-k="fav">★ ${t('favs')}</button>
      <button class="chip" data-act="fclear">✕ ${t('clear')}</button>
    </div></div>
  </div>`;
}
function searchBar() {
  const n = activeFilterCount();
  return `<div class="searchbar"><input type="search" id="q" placeholder="${t('search')}" value="${esc(ui.filters.q)}">
    <button class="btn ${n ? 'primary' : ''}" data-act="togglefilters">${ICON.filter} ${t('filters')}${n ? ` (${n})` : ''}</button></div>`;
}
function activeFilterCount() {
  const f = ui.filters;
  return f.cu.size + f.diet.size + f.grade.size + ['type', 'main', 'meal', 'time', 'eq', 'occ', 'sub', 'reg'].filter((k) => f[k]).length + (f.season ? 1 : 0) + (f.fav ? 1 : 0);
}
function viewRecipes() {
  const list = RECIPES.filter((r) => r.type !== 'dessert').filter((r) => matches(r, ui.filters));
  return `<section class="band page-band"><h1 class="display">${t('tabRecipes')}</h1><p class="lede">${RECIPES.filter((r) => r.type !== 'dessert').length} ${t('dishes')}</p></section>
    <div class="feature-row">
      <a class="feature jna" href="#/vojnicka">${ICON.medal}<b>${t('jnaTitle')}</b><small>${RECIPES.filter((r) => r.cu === 'jna').length} ${t('dishes')}</small></a>
      <a class="feature hol" href="#/holidays">${ICON.party}<b>${t('holidays')}</b><small>Bajram · Božić · Nova godina</small></a>
      <a class="feature nocook" href="#/dorucci">${ICON.pantry}<b>${t('combosTitle')}</b><small>${RECIPES.filter((r) => r.type === 'combo').length} ${t('combos')}</small></a>
    </div>
    ${searchBar()}${filterPanel()}
    <p class="muted small">${list.length} ${t('results')}</p>
    <div class="grid" id="results">${list.map(card).join('')}</div>`;
}
function viewSweets() {
  const list = RECIPES.filter((r) => r.type === 'dessert').filter((r) => matches(r, ui.filters));
  const subs = chipGroup(t('fType'), 'sub', keys('sub').map((k) => [k, L('sub', k)]));
  return `<section class="band page-band sweet"><h1 class="display">${t('tabSweets')}</h1><p class="lede">${t('sweetsIntro')}</p></section>
    ${searchBar()}${filterPanel(subs)}
    <p class="muted small">${list.length} ${t('results')}</p>
    <div class="grid" id="results">${list.map(card).join('')}</div>`;
}
function viewJNA() {
  const list = RECIPES.filter((r) => r.cu === 'jna');
  return `<section class="band page-band"><a class="backlink" href="#/recipes">${ICON.back} ${t('tabRecipes')}</a><h1 class="display">${t('jnaTitle')}</h1><p class="lede">${t('jnaIntro')}</p></section>
    <div class="grid">${list.map(card).join('')}</div>`;
}
function viewCombos() {
  const list = RECIPES.filter((r) => r.type === 'combo');
  return `<section class="band page-band"><a class="backlink" href="#/recipes">${ICON.back} ${t('tabRecipes')}</a><h1 class="display">${t('combosTitle')}</h1><p class="lede">${t('combosIntro')}</p></section>
    <div class="banner"><span>${t('noCookHint')}</span> <a href="#/settings">${t('settings')} →</a></div>
    <div class="grid">${list.map(card).join('')}</div>`;
}

// ───────── RECIPE DETAIL ─────────
function guideLinks(r) {
  const ids = r.ing.map((i) => i[0]);
  const gs = liveGuides().filter((g) => g.ing.some((x) => ids.includes(x)));
  return gs.map((g) => { const [title, href] = g[getLang()]; return `<p class="hint">📖 ${t('guideHint')}: <a href="${href}">${esc(title)}</a></p>`; }).join('');
}

function viewRecipe(id) {
  const r = R[id];
  if (!r) return `<p>404</p>`;
  const st = S();
  const f = scaleFor(r);
  const fav = st.favs.includes(r.id);
  let scaler;
  if (r.pan) {
    const mine = ui.pan[r.id] || { ...r.pan };
    const origTxt = r.pan.shape === 'round' ? `Ø ${r.pan.d} cm` : `${r.pan.w} × ${r.pan.h} cm`;
    scaler = `<div class="scaler pan">
      <div><span class="muted">${t('panOrig')}:</span> <b>${origTxt}</b></div>
      <div class="row gap wrap"><span class="muted">${t('panMine')}:</span>
        <select data-act="panshape" data-id="${r.id}"><option value="rect" ${mine.shape === 'rect' ? 'selected' : ''}>${t('rect')}</option><option value="round" ${mine.shape === 'round' ? 'selected' : ''}>${t('round')}</option></select>
        ${mine.shape === 'round'
          ? `Ø <input type="number" inputmode="numeric" class="num" data-act="pandim" data-id="${r.id}" data-k="d" value="${mine.d || 26}"> cm`
          : `<input type="number" inputmode="numeric" class="num" data-act="pandim" data-id="${r.id}" data-k="w" value="${mine.w || 30}"> × <input type="number" inputmode="numeric" class="num" data-act="pandim" data-id="${r.id}" data-k="h" value="${mine.h || 20}"> cm`}
      </div>
      <div class="factor">${t('factor')} <b>${f.toFixed(2).replace('.', ',')}</b></div>
    </div>`;
  } else {
    const s = ui.serv[r.id] ?? defaultServ(r);
    scaler = `<div class="scaler">
      <span>${r.type === 'dessert' && r.yieldNote ? esc(tx(r.yieldNote)) + ' · ' : ''}${t('servings')}</span>
      <button class="round" data-act="serv" data-id="${r.id}" data-d="-1">−</button><b class="sv">${s}</b><button class="round" data-act="serv" data-id="${r.id}" data-d="1">+</button>
      ${r.sApprox ? `<small class="muted">(${t('estimate')})</small>` : ''}
    </div>
    ${r.big ? `<div class="row gap wrap jna-btns">
      <button class="btn" data-act="setserv" data-id="${r.id}" data-v="${st.household}">🏠 ${t('homeSize')}</button>
      <button class="btn primary" data-act="setserv" data-id="${r.id}" data-v="100">🎖 ${t('forCompany')} (100)</button></div>
      ${s >= 30 ? `<p class="hint">🍲 ${t('kazanHint')} ${Math.ceil((s * (r.type === 'soup' ? 0.3 : 0.45) * 1.25) / 10) * 10} ${t('liters')}.</p>` : ''}` : ''}`;
  }
  const occ = r.occ.filter((o) => o !== 'posno').map((o) => `<span class="tag">${esc(L('occ', o))}</span>`).join('');
  const eq = [...r.eq, ...r.eqOpt].map((e) => `<span class="tag">${esc(L('eq', e))}${r.eq.includes(e) ? '' : '?'}</span>`).join('');
  const servParam = r.pan ? '' : `?s=${ui.serv[r.id] ?? defaultServ(r)}`;
  return `<article class="recipe">
      <div class="rhero">${dishArt(r, 'big')}<a class="backfab" href="javascript:history.back()" aria-label="${t('back')}">${ICON.back}</a></div>
      <div class="card-top"><span class="cu cu-${r.cu}">${esc(L('type', r.type))}</span><span class="muted">${gradeChip(r)} ${fmtTime(r)}</span></div>
      <h1 class="rtitle">${esc(name(r))}</h1>
      <div class="tags">${badges(r)}${occ}${eq}</div>
      <div class="row gap wrap actions">
        <a class="btn primary" href="#/cook/${r.id}${servParam}${r.pan ? '?p=1' : ''}">${ICON.play} ${r.type === 'combo' ? t('assemble') : t('cook')}</a>
        <button class="btn ${fav ? 'faved' : ''}" data-act="fav" data-id="${r.id}">${fav ? ICON.starFill : ICON.star} ${t('fav')}</button>
        <button class="btn" data-act="addplan" data-id="${r.id}">${ICON.plus} ${t('addToPlan')}</button>
        <button class="btn" data-act="print" data-kind="recipe" data-id="${r.id}">${ICON.doc} ${t('pdf')}</button>
      </div>
      <blockquote class="story">${esc(tx(r.story))}</blockquote>
      ${scaler}
      ${r.juf ? jufSwitch() : ''}
      <h3>${t('ingredients')}</h3>
      <ul class="ings">${r.ing.map((i) => ingLine(i, f)).join('')}</ul>
      ${guideLinks(r)}
      <h3>${t('steps')}</h3>
      <ol class="steps">${r.st.map((s) => `<li>${esc(tx(s))}${s[2] ? ` <span class="tmr">⏱ ${s[2] >= 60 && s[2] % 60 === 0 ? s[2] / 60 + ' h' : s[2] + ' min'}</span>` : ''}</li>`).join('')}</ol>
      ${nutBox(r)}
    </article>`;
}

/** Homemade or shop-bought pastry sheets — one switch for every pita that uses jufke. */
function jufSwitch() {
  return `<div class="jufsw"><span class="flabel">${t('jufka')}</span><div class="chips">
    <button class="chip ${JUF.home ? 'on' : ''}" data-act="jufka" data-v="home">${t('jufHome')}</button>
    <button class="chip ${JUF.home ? '' : 'on'}" data-act="jufka" data-v="shop">${t('jufShop')}</button></div>
    <small class="muted">${t(JUF.home ? 'jufHomeHint' : 'jufShopHint')}</small></div>`;
}

// ───────── COOK MODE ─────────
let cook = null;
let wakeLock = null;
async function startWake() {
  try { if ('wakeLock' in navigator) { wakeLock = await navigator.wakeLock.request('screen'); updWake(true); wakeLock.addEventListener?.('release', () => updWake(false)); } else updWake(false); }
  catch { updWake(false); }
}
function stopWake() { try { wakeLock && wakeLock.release(); } catch { /* ignore */ } wakeLock = null; }
function updWake(on) { const el = $('#wake'); if (el) el.textContent = on ? '💡 ' + t('wakeOn') : '🌙 ' + t('wakeOff'); }
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible' && cook) startWake(); });

function viewCook(arg) {
  const id = arg.split('?')[0];
  const r = R[id];
  if (!r) return '';
  const params = new URLSearchParams(location.hash.split('?')[1] || '');
  let f = 1;
  if (r.pan && params.get('p')) f = scaleFor(r);
  else if (params.get('f') === '1') f = 1;
  else if (params.get('s')) f = Number(params.get('s')) / r.serves;
  else f = scaleFor(r);
  cook = cook && cook.id === id ? cook : { id, i: 0, timers: cook ? cook.timers : [] };
  cook.f = f;
  return `<div class="cook">
    <header><a class="icon" href="javascript:history.back()" aria-label="${t('close')}">${ICON.close}</a><b>${esc(name(r))}</b><span id="wake" class="small"></span></header>
    <div id="timers" class="timers"></div>
    <div class="cook-body" id="cookBody"></div>
    <details class="cook-ings"><summary>${t('ingredients')}</summary><ul class="ings">${r.ing.map((i) => ingLine(i, f)).join('')}</ul></details>
    <footer><button class="btn big" data-act="cprev">← ${t('prev')}</button><button class="btn big primary" data-act="cnext">${t('next')} →</button></footer>
  </div>`;
}
function startCook() { renderCookStep(); startWake(); tickTimers(); }
function renderCookStep() {
  if (!cook) return;
  const r = R[cook.id];
  const s = r.st[cook.i];
  const body = $('#cookBody'); if (!body) return;
  body.innerHTML = `${r.juf && cook.i === 0 ? jufSwitch() : ''}<div class="stepno">${t('step')} ${cook.i + 1} ${t('of')} ${r.st.length}</div>
    <p class="bigstep">${esc(tx(s))}</p>
    ${s[2] ? `<button class="btn primary big steptimer" data-act="timer" data-m="${s[2]}" data-label="${esc(t('step'))} ${cook.i + 1}">${ICON.timer} ${t('timer')} ${s[2]} min</button>` : ''}`;
  markStepTimer();
  const nx = $('[data-act="cnext"]');
  if (nx) nx.textContent = cook.i === r.st.length - 1 ? `✓ ${t('done')}` : `${t('next')} →`;
}
/** Step timer button: shows "running" while this step's timer is on, so a second tap doesn't start a duplicate. */
function markStepTimer() {
  const b = $('.steptimer'); if (!b || !cook) return;
  const on = cook.timers.some((tm) => tm.label === b.dataset.label && tm.end > Date.now());
  b.classList.toggle('running', on);
  b.innerHTML = on ? `${ICON.timer} ${t('timerRunning')}` : `${ICON.timer} ${t('timer')} ${b.dataset.m} min`;
}
function tickTimers() {
  clearInterval(tickTimers._h);
  const draw = () => {
    const el = $('#timers'); if (!el || !cook) return;
    const now = Date.now();
    el.innerHTML = cook.timers.map((tm, k) => {
      const left = Math.max(0, Math.round((tm.end - now) / 1000));
      if (left === 0 && !tm.rang) { tm.rang = true; ring(); toast(`⏱ ${tm.label}: ${t('timerDone')}`); }
      const mm = String(Math.floor(left / 60)).padStart(2, '0'), ss = String(left % 60).padStart(2, '0');
      return `<button class="timer ${left === 0 ? 'done' : ''}" data-act="tdel" data-k="${k}">${esc(tm.label)} · ${mm}:${ss} ✕</button>`;
    }).join('');
    markStepTimer();
  };
  draw(); tickTimers._h = setInterval(draw, 1000);
}
function ring() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    [0, 0.35, 0.7].forEach((d) => { const o = ctx.createOscillator(); const g = ctx.createGain(); o.frequency.value = 880; o.connect(g); g.connect(ctx.destination); g.gain.setValueAtTime(0.25, ctx.currentTime + d); o.start(ctx.currentTime + d); o.stop(ctx.currentTime + d + 0.25); });
  } catch { /* no audio */ }
  navigator.vibrate?.([300, 150, 300, 150, 300]);
}

// ───────── HOLIDAYS ─────────
function menuItems(m) {
  const noPork = S().noPork || S().mode === 'ramazan';
  return m.items.map(([id, role, alt]) => [noPork && alt && !R[id].noPork ? alt : id, role]);
}
function viewHolidays() {
  return `<section class="band page-band"><a class="backlink" href="#/plan">${ICON.back} ${t('tabPlan')}</a><h1 class="display">${t('holidays')}</h1></section>
    ${MENUS.map((m) => `<article class="menu">
      <h3>${esc(getLang() === 'bs' ? m.bs : m.en)}</h3>
      <ul>${menuItems(m).map(([id, role]) => `<li><span class="role">${t(role)}</span> <a href="#/recipe/${id}">${esc(name(R[id]))}</a></li>`).join('')}</ul>
      <button class="btn primary" data-act="menuday" data-m="${m.id}">${ICON.plan} ${t('setOnDay')}</button>
    </article>`).join('')}`;
}

// ───────── PANTRY ─────────
function viewPantry() {
  const st = S();
  const q = ui.pantryQ.toLowerCase();
  const all = Object.values(ING).filter((g) => !q || `${g.bs} ${g.en}`.toLowerCase().includes(q));
  const zim = all.filter((g) => g.z);
  const secs = keys('sec').map((sec) => ({ sec, items: all.filter((g) => g.sec === sec && !g.z && !g.prod) })).filter((s) => s.items.length);
  // store products: long-life stock, grouped by shop section
  const prod = SECTIONS.map((sec) => ({ sec, items: all.filter((g) => g.sec === sec && g.prod && !g.z) })).filter((s) => s.items.length);
  const row = (g) => `<label class="pitem ${st.pantry[g.id] ? 'on' : ''}"><input type="checkbox" data-act="have" data-id="${g.id}" ${st.pantry[g.id] ? 'checked' : ''}><span>${esc(iname(g.id))}</span></label>`;
  const zrow = (g) => {
    const n = Number(st.pantry[g.id]) || 0;
    return `<div class="zitem ${n ? 'on' : ''}"><span>🫙 ${esc(iname(g.id))}</span>
      <span class="jar"><button class="round sm" data-act="jar" data-id="${g.id}" data-d="-1">−</button><b>${n}</b><button class="round sm" data-act="jar" data-id="${g.id}" data-d="1">+</button></span></div>`;
  };
  const g = st.guide || {};
  const starter = q ? '' : `<details class="psec starter" ${g.pantry ? '' : 'open'}><summary><h3>${t('starterTitle')}</h3></summary>
      <p class="small muted">${t('starterLede')}</p>
      <div class="pgrid">${STARTER.map((id) => row(ING[id])).join('')}</div>
      <div class="row gap wrap"><button class="btn" data-act="starterall">${ICON.check} ${t('starterAll')}</button><button class="btn primary" data-act="starterdone">${t('starterDone')} →</button></div></details>`;
  return `<section class="band page-band"><h1 class="display">${t('tabPantry')}</h1><p class="lede">${t('pantryIntro')}</p></section>
    ${starter}
    <div class="searchbar"><input type="search" id="pq" placeholder="${t('search')}" value="${esc(ui.pantryQ)}"></div>
    ${zim.length ? `<section class="psec zim"><h3>${t('zimnica')} <small class="muted">(${t('jars')})</small></h3>${zim.map(zrow).join('')}</section>` : ''}
    ${prod.length ? `<section class="psec prod"><h3>${t('prodTitle')} <small class="muted">(${t('prodHint')})</small></h3>
      ${prod.map((s) => `<h4>${esc(L('sec', s.sec))}</h4><div class="pgrid">${s.items.map(row).join('')}</div>`).join('')}</section>` : ''}
    ${secs.map((s) => `<section class="psec"><h3>${esc(L('sec', s.sec))}</h3><div class="pgrid">${s.items.map(row).join('')}</div></section>`).join('')}`;
}

// ───────── SHOPPING ─────────
function qtyText(it) {
  if (it.unknown && !it.q) return '';
  const COUNT = ['kom', 'glavica', 'cen', 'kesica', 'jufka', 'kriska', 'sop', 'list', 'zrno'];
  if (COUNT.includes(it.unit)) { it = { ...it, q: Math.ceil(it.q - 0.05), qmax: Math.ceil(it.qmax - 0.05) }; }
  const a = niceQ(it.q, it.unit);
  let s = a.s;
  if (it.qmax > it.q + 1e-6) s += '–' + niceQ(it.qmax, it.unit).s;
  const u = unitLabel(a.u, a.n);
  return `${s}${u ? ' ' + u : ''}${it.unknown ? ' +' : ''}`;
}
function curPart() { const ps = shopParts(); return ps.includes(ui.shopPart) ? ui.shopPart : ps[0]; }
function partLabel(p) { return p === 'big' ? t('bigShop') : p[0] === 'w' ? `${Number(p.slice(1)) + 1}. ${t('weekN')}` : ''; }
function shopText() {
  const { sections } = shoppingList(curPart());
  const st = S();
  const lines = [`🛒 Sofra — ${t('printShop')}${partLabel(curPart()) ? ' · ' + partLabel(curPart()) : ''}`];
  sections.forEach((s) => {
    const items = s.items.filter((it) => !st.shop.checked[it.key]);
    if (!items.length) return;
    lines.push('', `*${L('sec', s.sec)}*`);
    items.forEach((it) => lines.push(`• ${iname(it.id)}${qtyText(it) ? ' — ' + qtyText(it) : ''}${it.opt ? ` (${t('optional')})` : ''}`));
  });
  const extra = st.shop.extra.filter((e) => !e.done);
  if (extra.length) { lines.push('', `*${L('sec', 'other')}*`); extra.forEach((e) => lines.push('• ' + e.text)); }
  return lines.join('\n');
}
function viewShop() {
  const st = S();
  if (!st.plan) return `<section class="band page-band"><h1 class="display">${t('tabShop')}</h1></section><div class="empty">${t('emptyPlan')}</div>`;
  const part = curPart();
  const { sections, have } = shoppingList(part);
  const rng = planRange();
  if (!(st.guide || {}).shop) { st.guide = { ...st.guide, shop: true }; store.save(); }
  const tabs = part === 'all' ? '' : `<div class="chips parts">${shopParts().map((p) => `<button class="chip ${p === part ? 'on' : ''}" data-act="shoppart" data-v="${p}">${esc(partLabel(p))}</button>`).join('')}</div>`;
  const intro = { dish: 'shopIntroDish', day: 'shopIntroDay', week: 'shopIntro', month: 'shopIntroMonth' }[rng];
  const item = (it) => {
    const on = !!st.shop.checked[it.key];
    return `<label class="sitem ${on ? 'on' : ''}"><input type="checkbox" data-act="buy" data-key="${esc(it.key)}" data-id="${it.id}" ${on ? 'checked' : ''}>
      <span class="n">${esc(iname(it.id))}${it.opt ? ` <small>(${t('optional')})</small>` : ''}</span><span class="q">${esc(qtyText(it))}</span></label>`;
  };
  return `<section class="band page-band"><h1 class="display">${t('tabShop')}</h1><p class="lede">${t(intro)}</p></section>
    ${tabs}
    <div class="row gap wrap share">
      <button class="btn wa" data-act="wa">WhatsApp</button>
      <button class="btn vb" data-act="viber">Viber</button>
      ${navigator.share ? `<button class="btn" data-act="nshare">${ICON.share} ${t('share')}</button>` : ''}
      <button class="btn" data-act="copy">${ICON.copy} ${t('copy')}</button>
      <button class="btn" data-act="print" data-kind="shop">${ICON.doc} ${t('pdf')}</button>
    </div>
    ${!sections.length ? `<div class="empty">✓ ${t('youHave')}</div>` : ''}
    ${sections.map((s) => `<section class="ssec"><h3>${esc(L('sec', s.sec))}</h3>${s.items.map(item).join('')}</section>`).join('')}
    <section class="ssec"><h3>${esc(L('sec', 'other'))}</h3>
      ${st.shop.extra.map((e, k) => `<label class="sitem ${e.done ? 'on' : ''}"><input type="checkbox" data-act="xdone" data-k="${k}" ${e.done ? 'checked' : ''}><span class="n">${esc(e.text)}</span><button class="icon" data-act="xdel" data-k="${k}">✕</button></label>`).join('')}
      <form class="row gap" data-act="xadd"><input id="xtext" placeholder="${t('extra')}"><button class="btn">＋</button></form>
    </section>
    <button class="btn" data-act="clearbought">${t('clearBought')}</button>
    ${have.length ? `<details class="have"><summary>✓ ${t('youHave')} (${have.length})</summary><ul>${have.map((it) => `<li>${esc(iname(it.haveId))}${it.haveId !== it.id ? ` <small>(${esc(iname(it.id))})</small>` : ''} <span class="muted">${esc(qtyText(it))}</span></li>`).join('')}</ul></details>` : ''}`;
}

// ───────── SETTINGS ─────────
function viewSettings() {
  const st = S();
  const lvl = [t('never'), t('rarely'), t('often'), t('mostly')];
  const daysChips = DAYS[getLang()].map((d, i) => `<button class="chip ${st.posnoDays.includes(i) ? 'on' : ''}" data-act="posnoday" data-i="${i}">${d.slice(0, 3)}</button>`).join('');
  const num = (k, v, min, max, step = 1) => `<input type="number" class="num" inputmode="numeric" data-act="setnum" data-k="${k}" min="${min}" max="${max}" step="${step}" value="${v}">`;
  const tog = (k, label) => `<label class="toggle"><input type="checkbox" data-act="settog" data-k="${k}" ${st[k] ? 'checked' : ''}><span>${label}</span></label>`;
  return `<section class="band page-band"><h1 class="display">${t('settings')}</h1><p class="lede">${t('planSettings')}</p></section>
    <section class="set"><h3>${t('language')}</h3><div class="chips">
      <button class="chip ${getLang() === 'bs' ? 'on' : ''}" data-act="lang" data-v="bs">Bosanski</button>
      <button class="chip ${getLang() === 'en' ? 'on' : ''}" data-act="lang" data-v="en">English</button></div></section>
    <section class="set"><h3>${t('mode')}</h3><div class="chips">
      <button class="chip ${st.mode === 'normal' ? 'on' : ''}" data-act="mode" data-v="normal">${t('modeNormal')}</button>
      <button class="chip ${st.mode === 'ramazan' ? 'on' : ''}" data-act="mode" data-v="ramazan">🌙 ${t('modeRamazan')}</button></div></section>
    <section class="set"><h3>${t('meals')}</h3><div class="chips">${['breakfast', 'lunch', 'dinner', 'snack'].map((m) => `<button class="chip ${st.meals[m] ? 'on' : ''}" data-act="meal" data-k="${m}">${t(m)}</button>`).join('')}</div>
      ${tog('dinnerLeft', t('dinnerLeft'))}
      ${tog('noCookBreakfast', t('noCookBreakfast'))}<p class="small muted">${t('noCookHint')} <a href="#/dorucci">${t('combosTitle')} →</a></p>
      <div class="mix"><span>${t('breakfastMax')}</span>${num('breakfastMax', st.breakfastMax, 5, 120, 5)}<small>min</small></div>
      <div class="mix"><span>${t('dinnerMax')}</span>${num('dinnerMax', st.dinnerMax, 5, 180, 5)}<small>min</small></div></section>
    <section class="set"><h3>${t('household')}</h3>${num('household', st.household, 1, 20)}</section>
    <section class="set"><h3>${t('cuisineMix')}</h3>
      ${keys('style').map((c) => `<div class="mix"><span>${esc(L('style', c))}</span><span class="rng"><input type="range" min="0" max="3" step="1" value="${st.styles[c] || 0}" data-act="mix" data-k="${c}"><span class="ticks" aria-hidden="true"><i></i><i></i><i></i><i></i></span></span><small>${lvl[st.styles[c] || 0]}</small></div>`).join('')}
      ${['meatless', 'health'].map((k) => `<div class="mix"><span>${t(k)}</span><span class="rng"><input type="range" min="0" max="3" step="1" value="${st[k] || 0}" data-act="mixs" data-k="${k}"><span class="ticks" aria-hidden="true"><i></i><i></i><i></i><i></i></span></span><small>${t(k + 'Lvl').split('|')[st[k] || 0]}</small></div>`).join('')}
      <p class="small muted">${t('dietHint')}</p>
      ${jufSwitch()}
    </section>
    <section class="set"><h3>${t('rules')}</h3>
      ${keys('kind').map((k) => `<div class="mix"><span>${esc(L('kind', k))}</span><input type="number" class="num" min="0" max="7" data-act="rule" data-k="${k}" value="${st.rules[k] ?? 7}"><small>× / 7</small></div>`).join('')}
    </section>
    <section class="set">
      <div class="mix"><span>${t('noRepeat')}</span>${num('noRepeatWeeks', st.noRepeatWeeks, 0, 6)}<small>${t('weeks')}</small></div>
      <div class="mix"><span>${t('weekdayMax')}</span>${num('weekdayMax', st.weekdayMax, 15, 300, 15)}<small>min</small></div>
      <div class="mix"><span>${t('dessertsWeek')}</span>${num('dessertsPerWeek', st.dessertsPerWeek, 0, 7)}</div>
      ${tog('leftovers', t('leftovers'))}${tog('soupDaily', t('soupDaily'))}${tog('noPork', t('noPork'))}${tog('preferKid', t('preferKid'))}${tog('posnoFish', t('posnoFish'))}
    </section>
    <section class="set"><h3>${t('posnoDays')}</h3><div class="chips">${daysChips}</div></section>
    <section class="set"><h3>${t('equipOwned')}</h3><div class="chips">${keys('eq').map((e) => `<button class="chip ${st.equipment[e] ? 'on' : ''}" data-act="equip" data-k="${e}">${esc(L('eq', e))}</button>`).join('')}</div></section>
    <section class="set"><button class="btn" data-act="guideshow">${ICON.check} ${t('guideShow')}</button></section>
    <section class="set"><h3>${t('backup')}</h3><div class="row gap wrap">
      <button class="btn" data-act="export">⬇ ${t('exportData')}</button>
      <label class="btn">⬆ ${t('importData')}<input type="file" accept="application/json,.json" data-act="import" hidden></label>
      <button class="btn danger" data-act="reset">${t('reset')}</button></div></section>
    <section class="set"><h3>${t('install')}</h3>
      ${installAvailable() ? `<button class="btn primary" data-act="install">${ICON.share} ${t('install')}</button>` : `<p class="muted small">${t('installHint')}</p>`}</section>
    <section class="set"><h3>${t('about')}</h3><p class="muted small">${t('aboutText')}</p>
</section>`;
}

// ───────── EXPORT: real PDF file (download / share), print only on request ─────────
function ingParts(ing, f) {
  const [id, q, unit, ex = {}] = ing;
  const note = ex.note ? tx(ex.note) : '';
  let qty = '';
  if (q != null) {
    const a = niceQ(q * f, unit);
    let txt = a.s;
    if (ex.max != null) txt = `${a.s}–${niceQ(ex.max * f, unit).s}`;
    const ul = unitLabel(a.u, a.n);
    qty = `${txt}${ul ? ' ' + ul : ''}`;
  }
  const tail = [note, ex.opt ? t('optional') : '', q == null && !note ? t('toTaste') : ''].filter(Boolean).join(', ');
  // other meats that work too — skipped when the recipe note already offers an alternative
  const alt = MEAT_ALT[id] && !/^(ili|or) /i.test(note) ? ` (${t('or')} ${tx(MEAT_ALT[id])})` : '';
  return { qty, nm: iname(id), alt, tail };
}
const stepTime = (s) => (s[2] ? ` (${s[2] >= 60 && s[2] % 60 === 0 ? s[2] / 60 + ' h' : s[2] + ' min'})` : '');
function recipeBlocks(r, f, servTxt, page = false) {
  return [
    { t: 'h2', text: name(r), page, sub: `${L('type', r.type)} · ${fmtTime(r)}${servTxt ? ' · ' + servTxt : ''} · ${t('fGrade')} ${nutrition(r).grade}${perPortion(r) ? ` · ≈ ${nf(nutrition(r).serv.kcal)} kcal / ${t('nutServ').toLowerCase()}` : ''}` },
    { t: 'p', text: tx(r.story), font: 'I', muted: 1, after: 6 },
    { t: 'h3', text: t('ingredients') },
    { t: 'grid', qw: 1, items: r.ing.map((i) => { const p = ingParts(i, f); return [p.qty, [['R', p.nm + p.alt], ...(p.tail ? [['I', ` (${p.tail})`]] : [])]]; }) },
    { t: 'h3', text: t('steps') },
    { t: 'ol', items: r.st.map((s) => [['R', tx(s)], ['B', stepTime(s)]]) },
  ];
}
function shopBlocks(part = curPart(), withExtra = true) {
  const st = S();
  const { sections } = shoppingList(part);
  const out = [];
  sections.forEach((sec) => {
    const items = sec.items.filter((it) => !st.shop.checked[it.key]);
    if (!items.length) return;
    out.push({ t: 'h3', text: L('sec', sec.sec) });
    out.push({ t: 'grid', box: 1, items: items.map((it) => [null, [['R', iname(it.id) + '  '], ['B', qtyText(it)], ...(it.opt ? [['I', ` (${t('optional')})`]] : [])]]) });
  });
  const extra = withExtra ? st.shop.extra.filter((e) => !e.done) : [];
  if (extra.length) { out.push({ t: 'h3', text: L('sec', 'other') }); out.push({ t: 'grid', box: 1, items: extra.map((e) => [null, e.text]) }); }
  return out;
}
function exportDoc(kind, id) {
  const st = S();
  const day = new Date().toISOString().slice(0, 10);
  if (kind === 'recipe') {
    const r = R[id];
    const f = scaleFor(r);
    const servTxt = r.pan ? '' : `${ui.serv[r.id] ?? defaultServ(r)} ${t('persons')}`;
    const blocks = recipeBlocks(r, f, servTxt);
    blocks[0] = { t: 'title', text: name(r), sub: blocks[0].sub };
    return { blocks, title: name(r), file: `sofra-${r.id}.pdf` };
  }
  if (!st.plan) return null;
  const start = parseISO(st.plan.start);
  const n = st.plan.days.length, rng = planRange();
  const week = n === 1 ? `${dayLabel(start, 0).name}, ${dayLabel(start, 0).date}` : `${dayLabel(start, 0).date} – ${dayLabel(start, n - 1).date}`;
  if (kind === 'shop') {
    const pl = partLabel(curPart());
    return { blocks: [{ t: 'title', text: t('printShop') + (pl ? ' · ' + pl : ''), sub: `Sofra · ${week}` }, ...shopBlocks()], title: `${t('printShop')} — ${week}`, file: `sofra-kupovina-${day}${pl ? '-' + curPart() : ''}.pdf` };
  }
  const blocks = [{ t: 'title', text: `Sofra — ${week}`, sub: t('appTagline') }, { t: 'h2', text: t('printPlan') }];
  st.plan.days.forEach((d, i) => {
    const dl = dayLabel(start, i);
    if (n > 7 && i % 7 === 0) blocks.push({ t: 'h3', text: `${i / 7 + 1}. ${t('weekN')}` });
    blocks.push({ t: 'kv', k: dl.name, k2: dl.date, v: d.dishes.map((x) => [['B', roleLabel(x) + ': '], ['R', name(R[x.id])], ...(x.left || x.fixed ? [] : [['I', ` (${x.serv} ${t('persons')})`]])]) });
  });
  blocks.push({ t: 'h2', text: t('printShop'), page: true });
  if (rng === 'month') shopParts().forEach((p, k) => { const b = shopBlocks(p, k === 0); if (b.length) blocks.push({ t: 'h2', text: partLabel(p), page: k > 0 }, ...b); });
  else blocks.push(...shopBlocks('all'));
  // a month would be a book: its PDF has the menu and lists; each recipe has its own PDF
  if (rng === 'month') return { blocks, title: `Sofra — ${week}`, file: `sofra-jelovnik-${st.plan.start}.pdf` };
  const seen = new Set();
  st.plan.days.flatMap((d) => d.dishes.filter((x) => !x.left)).filter((x) => (seen.has(x.id) ? false : seen.add(x.id))).forEach((x, k) => {
    const r = R[x.id]; const f = x.fixed ? 1 : x.serv / r.serves;
    if (k === 0) blocks.push({ t: 'h2', text: t('printRecipes'), page: true });
    blocks.push(...recipeBlocks(r, f, x.fixed ? (r.yieldNote ? tx(r.yieldNote) : '') : `${x.serv} ${t('persons')}`));
    blocks.push({ t: 'rule' });
  });
  return { blocks, title: `Sofra — ${week}`, file: `sofra-jelovnik-${st.plan.start}.pdf` };
}
// Same blocks as HTML, for the browser print dialog.
function runsHTML(r) { return typeof r === 'string' ? esc(r) : r.map(([k, s]) => (k === 'B' ? `<b>${esc(s)}</b>` : k === 'I' ? `<i>${esc(s)}</i>` : esc(s))).join(''); }
function blocksHTML(blocks) {
  return blocks.map((b) => {
    switch (b.t) {
      case 'title': return `<h1>${esc(b.text)}</h1>${b.sub ? `<p>${esc(b.sub)}</p>` : ''}`;
      case 'h2': return `<h2 class="${b.page ? 'pb' : ''}">${esc(b.text)}</h2>${b.sub ? `<p><small>${esc(b.sub)}</small></p>` : ''}`;
      case 'h3': return `<h3>${esc(b.text)}</h3>`;
      case 'p': return `<p class="${b.muted ? 'small' : ''}">${b.font === 'I' ? `<i>${runsHTML(b.text)}</i>` : runsHTML(b.text)}</p>`;
      case 'kv': return `<table class="ptable"><tr><th>${esc(b.k)}${b.k2 ? `<br><small>${esc(b.k2)}</small>` : ''}</th><td>${b.v.map(runsHTML).join('<br>')}</td></tr></table>`;
      case 'grid': return `<ul class="cols">${b.items.map((it) => `<li>${b.box ? '☐ ' : ''}${it[0] ? `<b>${esc(it[0])}</b> ` : ''}${runsHTML(it[1])}</li>`).join('')}</ul>`;
      case 'ol': return `<ol>${b.items.map((it) => `<li>${runsHTML(it)}</li>`).join('')}</ol>`;
      case 'rule': return '<hr>';
      default: return '';
    }
  }).join('');
}
function saveBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.rel = 'noopener';
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 60000);
}
const isIOS = () => install.ios;
function canShareFile(file) { try { return !!(navigator.canShare && navigator.canShare({ files: [file] })); } catch { return false; } }
/** Save a file: on an installed iPhone app downloads don't work, so use the share sheet there. */
function saveFile(blob, filename) {
  const file = new File([blob], filename, { type: blob.type });
  if (isIOS() && isStandalone() && canShareFile(file)) { navigator.share({ files: [file], title: filename }).catch(() => {}); return; }
  saveBlob(blob, filename);
}
function openExport(kind, id) {
  const doc = exportDoc(kind, id);
  if (!doc) { toast(t('emptyPlan')); return; }
  const m = $('#modal');
  const head = kind === 'recipe' ? name(R[id]) : kind === 'shop' ? t('printShop') : planRange() === 'month' ? `${t('printPlan')} · ${t('printShop')}` : t('pdfWeek');
  m.innerHTML = `<div class="sheet exp"><h3>${ICON.doc} ${esc(head)}</h3><p class="muted small" data-exp-status>${t('pdfMaking')}</p>
    <div class="exp-btns">
      <button class="btn primary" data-exp="share" hidden>${ICON.share} ${t('pdfShare')}</button>
      <button class="btn" data-exp="dl" disabled>⬇ ${t('pdfDownload')}</button>
      <button class="btn" data-exp="open" disabled>${ICON.doc} ${t('pdfOpen')}</button>
      <button class="btn" data-exp="print">🖨 ${t('print')}</button>
      <button class="btn ghost" data-exp="x">${t('close')}</button>
    </div></div>`;
  m.classList.add('open');
  let file = null;
  const close = () => { m.classList.remove('open'); m.onclick = null; };
  import('./pdf.js').then(({ buildPDF }) => buildPDF(doc.blocks, { title: doc.title, footer: 'Sofra · moja-sofra.netlify.app' })).then((blob) => {
    file = new File([blob], doc.file, { type: 'application/pdf' });
    const stEl = m.querySelector('[data-exp-status]'); if (!stEl) return;
    stEl.textContent = `${doc.file} · ${Math.max(1, Math.round(blob.size / 1024))} KB`;
    m.querySelectorAll('[data-exp]').forEach((b) => { b.disabled = false; });
    const sh = m.querySelector('[data-exp="share"]');
    if (canShareFile(file)) sh.hidden = false;
    if (isIOS() && isStandalone() && !sh.hidden) m.querySelector('[data-exp="dl"]').hidden = true;
  }).catch((err) => {
    console.warn(err);
    const stEl = m.querySelector('[data-exp-status]'); if (stEl) stEl.textContent = t('pdfFail');
  });
  m.onclick = (e) => {
    const b = e.target.closest('[data-exp]');
    if (!b && e.target !== m) return;
    const a = b ? b.dataset.exp : 'x';
    if (a === 'x') return close();
    if (a === 'print') { close(); $('#print').innerHTML = blocksHTML(doc.blocks); setTimeout(() => window.print(), 200); return; }
    if (!file) return;
    if (a === 'share') navigator.share({ files: [file], title: doc.title }).then(close).catch(() => {});
    if (a === 'dl') { saveBlob(file, doc.file); toast(t('pdfSaved')); close(); }
    if (a === 'open') { const url = URL.createObjectURL(file); window.open(url, '_blank') || (location.href = url); setTimeout(() => URL.revokeObjectURL(url), 120000); close(); }
  };
}

// ───────── day picker modal ─────────
function pickDay(cb) {
  const st = S();
  if (!st.plan) generatePlan();
  const start = parseISO(S().plan.start);
  const m = $('#modal');
  m.innerHTML = `<div class="sheet"><h3>${t('pickDay')}</h3><div class="daypick">${S().plan.days.map((_, i) => { const dl = dayLabel(start, i); return `<button class="btn" data-pick="${i}">${dl.name}<br><small>${dl.date}</small></button>`; }).join('')}</div><button class="btn" data-pick="x">${t('cancel')}</button></div>`;
  m.classList.add('open');
  m.onclick = (e) => {
    const b = e.target.closest('[data-pick]');
    if (!b && e.target !== m) return;
    m.classList.remove('open'); m.onclick = null;
    if (b && b.dataset.pick !== 'x') cb(Number(b.dataset.pick));
  };
}

// ───────── events ─────────
document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-act]');
  if (!el || el.tagName === 'INPUT' || el.tagName === 'SELECT' || el.tagName === 'FORM') return;
  const st = S();
  const a = el.dataset.act;
  const rer = rerender;
  switch (a) {
    case 'newplan': askRange(); break;
    case 'guidedone': st.guide = { ...st.guide, done: true }; store.save(); rer(); break;
    case 'guideshow': st.guide = { done: false, pantry: false, shop: false, settings: false, welcomeOff: false }; store.save(); toast(t('guideShown')); go('#/plan'); break;
    case 'starterall': STARTER.forEach((id) => store.setHave(id, true)); store.save(); rer(); break;
    case 'starterdone': st.guide = { ...st.guide, pantry: true }; store.save(); go('#/plan'); break;
    case 'shoppart': ui.shopPart = el.dataset.v; rer(); break;
    case 'jump': document.getElementById('day-' + el.dataset.i)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); break;
    case 'swapdish': swapDish(Number(el.dataset.i), Number(el.dataset.k)); rer(); break;
    case 'swap': swapDay(Number(el.dataset.i)); rer(); break;
    case 'cooked': markCooked(Number(el.dataset.i)); if (st.plan.days[el.dataset.i].cooked) toast(t('cookedQ')); rer(); break;
    case 'print': openExport(el.dataset.kind || 'week', el.dataset.id); break;
    case 'togglefilters': ui.showFilters = !ui.showFilters; rer(); break;
    case 'filter': {
      const k = el.dataset.k, v = el.dataset.v;
      if (el.dataset.m === '1') { const s = ui.filters[k]; s.has(v) ? s.delete(v) : s.add(v); } else ui.filters[k] = ui.filters[k] === v ? '' : v;
      if (ui.filters.reg && !ui.filters.cu.has(regionCountry(ui.filters.reg))) ui.filters.reg = '';
      rer(); break;
    }
    case 'ftoggle': ui.filters[el.dataset.k] = !ui.filters[el.dataset.k]; rer(); break;
    case 'fclear': ui.filters = { q: '', cu: new Set(), type: '', main: '', meal: '', time: '', eq: '', diet: new Set(), occ: '', season: false, fav: false, sub: '', reg: '', grade: new Set() }; rer(); break;
    case 'fav': store.toggleFav(el.dataset.id); rer(); break;
    case 'jufka': { st.jufka = el.dataset.v; store.save(); cook = null; rerender(); break; }
    case 'serv': { const r = R[el.dataset.id]; const cur = ui.serv[r.id] ?? defaultServ(r); ui.serv[r.id] = Math.max(1, cur + Number(el.dataset.d)); rer(); break; }
    case 'setserv': ui.serv[el.dataset.id] = Number(el.dataset.v); rer(); break;
    case 'addplan': {
      const r = R[el.dataset.id];
      pickDay((i) => {
        const d = S().plan.days[i];
        const role = r.type === 'soup' ? 'soup' : r.type === 'dessert' ? 'dessert' : r.type === 'salad' && !r.full ? 'side' : r.type === 'breakfast' || r.type === 'combo' ? 'breakfast' : r.type === 'snack' ? 'snack' : 'main';
        const keep = d.dishes.filter((x) => x.role !== role || role === 'side');
        const dish = { id: r.id, role, serv: role === 'dessert' ? r.serves : S().household, ...(role === 'dessert' ? { fixed: 1 } : {}) };
        const order = { breakfast: 0, soup: 1, main: 2, side: 3, dinner: 4, snack: 5, dessert: 6 };
        setDayDishes(i, [...keep, dish].sort((x, y) => order[x.role] - order[y.role]));
        go('#/plan');
      });
      break;
    }
    case 'menuday': {
      const m = MENUS.find((x) => x.id === el.dataset.m);
      pickDay((i) => {
        setDayDishes(i, menuItems(m).map(([id, role]) => (role === 'dessert' ? { id, role, serv: R[id].serves, fixed: 1 } : { id, role, serv: S().household })));
        go('#/plan');
      });
      break;
    }
    case 'cnext': { const r = R[cook.id]; if (cook.i < r.st.length - 1) { cook.i++; renderCookStep(); } else { history.back(); } break; }
    case 'cprev': if (cook.i > 0) { cook.i--; renderCookStep(); } break;
    case 'timer': if (cook.timers.some((tm) => tm.label === el.dataset.label && tm.end > Date.now())) break; cook.timers.push({ label: el.dataset.label, end: Date.now() + Number(el.dataset.m) * 60000 }); tickTimers(); break;
    case 'tdel': cook.timers.splice(Number(el.dataset.k), 1); tickTimers(); break;
    case 'jar': { const id = el.dataset.id; const n = Math.max(0, (Number(st.pantry[id]) || 0) + Number(el.dataset.d)); if (n) st.pantry[id] = n; else delete st.pantry[id]; store.save(); rer(); break; }
    case 'wa': window.open('https://wa.me/?text=' + encodeURIComponent(shopText()), '_blank'); break;
    case 'viber': location.href = 'viber://forward?text=' + encodeURIComponent(shopText()); break;
    case 'nshare': navigator.share({ title: 'Sofra', text: shopText() }).catch(() => {}); break;
    case 'copy': navigator.clipboard?.writeText(shopText()).then(() => toast(t('copied'))); break;
    case 'xdel': st.shop.extra.splice(Number(el.dataset.k), 1); store.save(); rer(); break;
    case 'clearbought': {
      const { sections } = shoppingList(curPart());
      sections.forEach((s) => s.items.forEach((it) => { if (st.shop.checked[it.key]) delete st.shop.checked[it.key]; }));
      st.shop.extra = st.shop.extra.filter((x) => !x.done); store.save(); rer(); break;
    }
    case 'lang': st.lang = el.dataset.v; setLang(st.lang); store.save(); rer(); break;
    case 'mode': st.mode = el.dataset.v; store.save(); rer(); break;
    case 'posnoday': { const i = Number(el.dataset.i); st.posnoDays = st.posnoDays.includes(i) ? st.posnoDays.filter((x) => x !== i) : [...st.posnoDays, i]; store.save(); rer(); break; }
    case 'meal': { st.meals[el.dataset.k] = !st.meals[el.dataset.k]; if (!st.meals.lunch && !st.meals.dinner) st.meals.lunch = true; store.save(); rer(); break; }
    case 'equip': st.equipment[el.dataset.k] = st.equipment[el.dataset.k] ? 0 : 1; store.save(); rer(); break;
    case 'export': {
      const blob = new Blob([store.exportJSON()], { type: 'application/json' });
      saveFile(blob, `sofra-backup-${new Date().toISOString().slice(0, 10)}.json`); break;
    }
    case 'reset': if (confirm(t('resetQ'))) { store.resetAll(); setLang(S().lang); go('#/plan'); } break;
    case 'install': doInstall(); break;
    case 'repick': { const n = pickPool().length; if (n > 1) { let k; do { k = Math.floor(Math.random() * n); } while (k === ui.pickIdx % n); ui.pickIdx = k; }
      const pk = document.querySelector('.pick'); if (pk) pk.outerHTML = todayPick(); else rer(); break; } // swap in place: no re-render, no jump to top
    case 'homeplan': if (!(st.guide || {}).done && !(st.guide || {}).pantry) go('#/plan'); else askRange(() => go('#/plan')); break;
    default: break;
  }
});

document.addEventListener('change', (e) => {
  const el = e.target; const a = el.dataset.act; if (!a) return;
  const st = S();
  switch (a) {
    case 'have': store.setHave(el.dataset.id, el.checked); store.save();
      // the same item can be in the quick-start list and further down: keep both in step
      document.querySelectorAll(`input[data-act="have"][data-id="${el.dataset.id}"]`).forEach((x) => { x.checked = el.checked; x.closest('.pitem')?.classList.toggle('on', el.checked); });
      break;
    case 'buy': {
      st.shop.checked[el.dataset.key] = el.checked ? 1 : 0;
      if (!el.checked) delete st.shop.checked[el.dataset.key];
      if (el.checked) store.setHave(el.dataset.id, true);
      store.save(); el.closest('.sitem')?.classList.toggle('on', el.checked); break;
    }
    case 'xdone': st.shop.extra[Number(el.dataset.k)].done = el.checked; store.save(); el.closest('.sitem')?.classList.toggle('on', el.checked); break;
    case 'setnum': { const v = Number(el.value); if (!Number.isNaN(v)) { st[el.dataset.k] = v; store.save(); } break; }
    case 'settog': st[el.dataset.k] = el.checked; store.save(); break;
    case 'mix': st.styles[el.dataset.k] = Number(el.value); store.save(); rerender(); break;
    case 'mixs': if (['meatless', 'health'].includes(el.dataset.k)) { st[el.dataset.k] = Number(el.value); store.save(); ui.pickIdx = null; rerender(); } break;
    case 'rule': st.rules[el.dataset.k] = Number(el.value); store.save(); break;
    case 'panshape': { const r = R[el.dataset.id]; const cur = ui.pan[r.id] || { ...r.pan }; ui.pan[r.id] = { ...cur, shape: el.value }; rerender(); break; }
    case 'pandim': { const r = R[el.dataset.id]; const cur = ui.pan[r.id] || { ...r.pan }; ui.pan[r.id] = { ...cur, [el.dataset.k]: Math.max(5, Number(el.value) || 0) }; rerender(); break; }
    case 'import': {
      const file = el.files[0]; if (!file) return;
      file.text().then((txt) => { try { store.importJSON(txt); setLang(S().lang); toast(t('importOk')); route(); } catch { toast(t('importBad')); } });
      break;
    }
    default: break;
  }
});

document.addEventListener('submit', (e) => {
  const f = e.target; if (f.dataset.act !== 'xadd') return;
  e.preventDefault();
  const v = $('#xtext').value.trim(); if (!v) return;
  S().shop.extra.push({ text: v, done: false }); store.save(); rerender();
});

document.addEventListener('input', (e) => {
  if (e.target.id === 'q') {
    ui.filters.q = e.target.value;
    const isSweet = location.hash.startsWith('#/sweets');
    const list = RECIPES.filter((r) => (isSweet ? r.type === 'dessert' : r.type !== 'dessert')).filter((r) => matches(r, ui.filters));
    $('#results').innerHTML = list.map(card).join('');
  }
  if (e.target.id === 'pq') {
    ui.pantryQ = e.target.value;
    const pos = e.target.selectionStart;
    route();
    const inp = $('#pq'); inp.focus(); inp.setSelectionRange(pos, pos);
  }
});

$('#langBtn').addEventListener('click', () => { const st = S(); st.lang = getLang() === 'bs' ? 'en' : 'bs'; setLang(st.lang); store.save(); route(); });
window.addEventListener('hashchange', route);

// ───────── boot ─────────
store.load();
setLang(S().lang);
document.querySelectorAll('.tabbar a').forEach((a) => { a.querySelector('span').innerHTML = ICON[a.dataset.tab] || ''; });
$('#gearBtn').innerHTML = ICON.gear;
$('#kilim').innerHTML = KILIM;
document.body.classList.toggle('standalone', isStandalone());
$('[data-install-btn]').addEventListener('click', doInstall);
// hamburger menu
const menu = $('#menu'), burger = $('#burger');
const setMenu = (open) => { menu.hidden = !open; burger.setAttribute('aria-expanded', String(open)); document.body.classList.toggle('menu-open', open); };
burger.addEventListener('click', () => setMenu(menu.hidden));
menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
window.addEventListener('hashchange', () => setMenu(false));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
route();
welcome();
if ('serviceWorker' in navigator && location.protocol !== 'file:') navigator.serviceWorker.register('./sw.js').catch(() => {});
window.__sofra = { R, RECIPES, kindOf, store };
