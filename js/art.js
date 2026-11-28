// Hand-drawn style SVG illustrations, generated per dish (no image files, works offline).
export const CU_COLORS = {
  bosanska: ['#9b2318', '#f2d9c4'],
  srpska: ['#24366b', '#d8def0'],
  hrvatska: ['#1d5a80', '#d6e6f0'],
  bugarska: ['#7a3e14', '#f0dcc8'],
  svakodnevno: ['#8a6416', '#f3e6c4'],
  italian: ['#4f6b1f', '#e1e9cc'],
  french: ['#6d2f5c', '#eedbe7'],
  jna: ['#4d5530', '#e3e4cf'],
  slovenska: ['#2f5d4a', '#dbe8df'],
};
const COPPER = ['#b8642f', '#d88b4f', '#7c3d1a'];

function steam(x, y, c = '#fff') {
  return `<g fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round" opacity=".75">
    <path d="M${x - 12} ${y}c-6-8 6-12 0-20"/><path d="M${x} ${y - 4}c-6-8 6-12 0-20"/><path d="M${x + 12} ${y}c-6-8 6-12 0-20"/></g>`;
}
const shadow = (cx, cy, rx) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${rx * 0.16}" fill="#000" opacity=".14"/>`;

const SHAPES = {
  // copper pot (lonac / sahan)
  main: (c) => `${shadow(80, 88, 46)}
    <path d="M38 50h84l-6 30a10 10 0 0 1-10 8H54a10 10 0 0 1-10-8z" fill="${COPPER[0]}"/>
    <path d="M38 50h84l-2 10H40z" fill="${COPPER[2]}" opacity=".35"/>
    <path d="M46 56c2 14 6 24 14 26" stroke="${COPPER[1]}" stroke-width="4" fill="none" stroke-linecap="round" opacity=".8"/>
    <rect x="28" y="52" width="12" height="6" rx="3" fill="${COPPER[2]}"/><rect x="120" y="52" width="12" height="6" rx="3" fill="${COPPER[2]}"/>
    <path d="M36 50c0-14 20-22 44-22s44 8 44 22z" fill="${COPPER[1]}"/>
    <path d="M44 46c6-8 20-12 36-12" stroke="#fff" stroke-width="3" fill="none" opacity=".45" stroke-linecap="round"/>
    <circle cx="80" cy="26" r="6" fill="${COPPER[2]}"/>${steam(80, 16, c)}`,
  // bowl of čorba
  soup: (c) => `${shadow(80, 86, 48)}
    <path d="M30 48h100a50 34 0 0 1-100 0z" fill="#fffaf2"/>
    <path d="M30 48h100a50 34 0 0 1-3 12H33a50 34 0 0 1-3-12z" fill="${c}" opacity=".18"/>
    <ellipse cx="80" cy="48" rx="50" ry="9" fill="#e7a43c"/>
    <ellipse cx="80" cy="47" rx="46" ry="6.5" fill="#f0bb57"/>
    <circle cx="66" cy="46" r="2.6" fill="#7c9a3a"/><circle cx="90" cy="48" r="2.2" fill="#7c9a3a"/><circle cx="100" cy="45" r="1.8" fill="#c0392b"/>
    <path d="M108 44l26-28" stroke="${COPPER[2]}" stroke-width="5" stroke-linecap="round"/>
    <path d="M30 60c6 16 26 24 50 24s44-8 50-24" stroke="${c}" stroke-width="4" fill="none"/>
    ${steam(72, 30, c)}`,
  // round tepsija with pita coils
  pie: (c) => `${shadow(80, 88, 52)}
    <ellipse cx="80" cy="62" rx="58" ry="26" fill="${COPPER[2]}"/>
    <ellipse cx="80" cy="58" rx="56" ry="24" fill="${COPPER[0]}"/>
    <ellipse cx="80" cy="57" rx="48" ry="19" fill="#e6b265"/>
    <g fill="none" stroke="#b97a2e" stroke-width="3.2" stroke-linecap="round">
      <path d="M80 57m-6 0a6 3 0 1 1 12 0a12 6 0 1 1-24 0a18 9 0 1 1 36 0a26 12 0 1 1-52 0a34 15 0 1 1 68 0"/></g>
    <path d="M44 50c8-6 20-9 34-9" stroke="#fff" stroke-width="3" opacity=".4" fill="none" stroke-linecap="round"/>`,
  grill: (c) => `${shadow(80, 88, 50)}
    <ellipse cx="80" cy="66" rx="54" ry="18" fill="#f3e2c3"/><ellipse cx="80" cy="63" rx="50" ry="15" fill="#e9cf9f"/>
    ${[[52, 58], [64, 66], [76, 58], [88, 66], [100, 58]].map(([x, y]) => `<rect x="${x - 4}" y="${y - 14}" width="11" height="30" rx="5.5" transform="rotate(62 ${x} ${y})" fill="#7a3b1c"/><path d="M${x - 8} ${y - 2}l12 -6" stroke="#4a210d" stroke-width="2" transform="rotate(0)"/>`).join('')}
    <path d="M96 74c6-4 14-4 20 0" stroke="#fff" stroke-width="5" stroke-linecap="round"/><path d="M98 78c6-3 12-3 16 0" stroke="#b33a2a" stroke-width="3" stroke-linecap="round"/>`,
  // grilled vegetables: striped slices on a plate
  grillveg: (c) => `${shadow(80, 88, 52)}
    <ellipse cx="80" cy="66" rx="56" ry="19" fill="#fffaf2"/><ellipse cx="80" cy="66" rx="56" ry="19" fill="none" stroke="${c}" stroke-width="3"/>
    ${[[56, 62, '#6b3f73'], [72, 66, '#7da33f'], [88, 62, '#d8432f'], [104, 66, '#e8a33d'], [64, 72, '#7da33f'], [96, 72, '#6b3f73']].map(([x, y, f]) => `<g transform="rotate(-24 ${x} ${y})"><rect x="${x - 7}" y="${y - 11}" width="14" height="22" rx="6" fill="${f}"/><path d="M${x - 6} ${y - 4}h12M${x - 6} ${y + 3}h12" stroke="#3a2416" stroke-width="2" opacity=".7"/></g>`).join('')}`,
  fish: (c) => `${shadow(80, 88, 52)}
    <ellipse cx="80" cy="64" rx="58" ry="20" fill="#fffaf2"/><ellipse cx="80" cy="64" rx="58" ry="20" fill="none" stroke="${c}" stroke-width="3"/>
    <path d="M40 60c14-16 46-18 66-2l16-10v24l-16-10c-20 16-52 14-66-2z" fill="#9aa9b4"/>
    <path d="M48 60c12-10 36-12 54-2" stroke="#d9e1e7" stroke-width="3" fill="none" stroke-linecap="round"/>
    <circle cx="52" cy="58" r="2.6" fill="#1f2a44"/><circle cx="70" cy="74" r="5" fill="#f2d33b"/><path d="M66 74h8" stroke="#c9a51c" stroke-width="1.5"/>
    <path d="M100 74c4-3 8-3 12 0" stroke="#6e8f2e" stroke-width="4" stroke-linecap="round"/>`,
  pasta: (c) => `${shadow(80, 88, 50)}
    <ellipse cx="80" cy="64" rx="56" ry="20" fill="#fffaf2"/><ellipse cx="80" cy="64" rx="56" ry="20" fill="none" stroke="${c}" stroke-width="3"/>
    <ellipse cx="80" cy="60" rx="34" ry="13" fill="#f0cf73"/>
    <g fill="none" stroke="#d9a93c" stroke-width="2.4" stroke-linecap="round"><path d="M52 60c10-10 46-10 56 0M56 64c10-6 38-6 48 0M60 56c8-6 32-6 40 0"/></g>
    <ellipse cx="80" cy="56" rx="14" ry="6" fill="#b8361f"/><circle cx="76" cy="54" r="2" fill="#6e8f2e"/><circle cx="85" cy="55" r="1.8" fill="#6e8f2e"/>
    <path d="M118 30l-22 30M124 32l-22 30" stroke="#8a8f99" stroke-width="3" stroke-linecap="round"/>`,
  oven: (c) => `${shadow(80, 90, 54)}
    <rect x="28" y="44" width="104" height="38" rx="10" fill="#fffaf2"/><rect x="28" y="44" width="104" height="38" rx="10" fill="none" stroke="${c}" stroke-width="3"/>
    <rect x="18" y="54" width="12" height="8" rx="4" fill="${c}"/><rect x="130" y="54" width="12" height="8" rx="4" fill="${c}"/>
    <rect x="36" y="48" width="88" height="26" rx="6" fill="#e0a54a"/>
    <g fill="#b9732a" opacity=".75">${[[48, 56], [66, 60], [84, 54], [102, 59], [114, 66], [56, 68], [92, 68]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="6" ry="3"/>`).join('')}</g>
    <path d="M40 52c10-3 30-4 46-3" stroke="#fff" stroke-width="2.5" opacity=".5" fill="none" stroke-linecap="round"/>${steam(80, 36, c)}`,
  sac: (c) => `${shadow(80, 90, 56)}
    <ellipse cx="80" cy="80" rx="58" ry="10" fill="#d36b2a"/><ellipse cx="80" cy="80" rx="50" ry="6" fill="#f2a24a"/>
    <path d="M30 78c0-30 22-46 50-46s50 16 50 46z" fill="#3b3330"/>
    <path d="M42 72c2-20 18-32 38-32" stroke="#6d625c" stroke-width="4" fill="none" stroke-linecap="round"/>
    <rect x="74" y="22" width="12" height="12" rx="4" fill="#2a2421"/>
    <g fill="#f08a2c">${[44, 60, 100, 116].map((x) => `<circle cx="${x}" cy="${76 - Math.abs(80 - x) / 6}" r="3"/>`).join('')}</g>`,
  eggs: (c) => `${shadow(80, 88, 50)}
    <circle cx="74" cy="60" r="34" fill="#3b3330"/><circle cx="74" cy="60" r="29" fill="#4a413d"/>
    <rect x="104" y="56" width="42" height="9" rx="4.5" fill="#2a2421"/>
    <path d="M56 50c8-10 22-10 26 0s-2 22-14 20-18-10-12-20z" fill="#fffaf2"/><circle cx="66" cy="58" r="7" fill="#f2b632"/>
    <path d="M78 64c6-8 18-8 20 0s-2 16-12 15-13-8-8-15z" fill="#fffaf2"/><circle cx="86" cy="68" r="6" fill="#f2b632"/>
    <circle cx="64" cy="56" r="2" fill="#fff" opacity=".7"/>`,
  bread: (c) => `${shadow(80, 88, 52)}
    <rect x="30" y="58" width="100" height="22" rx="8" fill="#b46b2a"/>
    <path d="M38 62c0-14 12-22 26-22s24 8 24 22v16H38z" fill="#e9b868"/><path d="M42 62c0-11 10-18 22-18" stroke="#c98a3d" stroke-width="3" fill="none"/>
    <path d="M74 64c0-13 11-20 24-20s24 7 24 20v14H74z" fill="#f0c67b"/>
    <rect x="80" y="58" width="34" height="8" rx="4" fill="#fbf3e1"/><rect x="82" y="64" width="30" height="6" rx="3" fill="${c}"/>`,
  salad: (c) => `${shadow(80, 86, 46)}
    <path d="M34 52h92a46 30 0 0 1-92 0z" fill="#fffaf2"/>
    <path d="M34 52c4 18 22 30 46 30s42-12 46-30" stroke="${c}" stroke-width="4" fill="none"/>
    <circle cx="58" cy="46" r="10" fill="#d8432f"/><circle cx="80" cy="42" r="11" fill="#7da33f"/><circle cx="102" cy="46" r="10" fill="#d8432f"/>
    <circle cx="70" cy="50" r="8" fill="#f4f1ea"/><circle cx="92" cy="50" r="7" fill="#f4f1ea"/><circle cx="80" cy="54" r="6" fill="#9cc25a"/>`,
  // baklava rhombs on a tray
  orijentalni: (c) => `${shadow(80, 88, 54)}
    <ellipse cx="80" cy="64" rx="60" ry="24" fill="${COPPER[2]}"/><ellipse cx="80" cy="60" rx="58" ry="22" fill="${COPPER[1]}"/>
    <g stroke="#9b5a1c" stroke-width="1.5">${[[60, 52], [80, 52], [100, 52], [70, 62], [90, 62], [50, 62], [110, 62], [80, 70]]
      .map(([x, y]) => `<path d="M${x} ${y - 7}l10 7-10 7-10-7z" fill="#e3a94a"/><circle cx="${x}" cy="${y}" r="1.8" fill="#6f8f2a" stroke="none"/>`).join('')}</g>`,
  torta: (c) => `${shadow(80, 88, 44)}
    <ellipse cx="80" cy="78" rx="46" ry="10" fill="#fffaf2"/>
    <path d="M44 44h72v30a36 8 0 0 1-72 0z" fill="#5a2e1b"/>
    <path d="M44 54h72M44 64h72" stroke="#e9c79a" stroke-width="4"/>
    <ellipse cx="80" cy="44" rx="36" ry="8" fill="#6b3a24"/>
    <circle cx="68" cy="42" r="3" fill="${c}"/><circle cx="80" cy="40" r="3" fill="${c}"/><circle cx="92" cy="42" r="3" fill="${c}"/>`,
  sitni: (c) => `${shadow(80, 88, 48)}
    <ellipse cx="80" cy="70" rx="52" ry="14" fill="#fffaf2"/>
    ${[[56, 62], [80, 58], [104, 62], [68, 70], [92, 70]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="11" fill="#f1d9a8"/><circle cx="${x}" cy="${y}" r="11" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="2 3"/><circle cx="${x}" cy="${y}" r="3.5" fill="${c}"/>`).join('')}`,
  kolac: (c) => `${shadow(80, 88, 48)}
    <rect x="34" y="50" width="92" height="28" rx="4" fill="#fffaf2"/>
    <rect x="34" y="50" width="92" height="10" rx="3" fill="#f3e5c9"/>
    <rect x="34" y="60" width="92" height="12" fill="#e2b25e"/><rect x="34" y="72" width="92" height="6" fill="#c98b3d"/>
    <path d="M65 50v28M96 50v28" stroke="#fff" stroke-width="3"/>
    <circle cx="50" cy="55" r="2" fill="${c}"/><circle cx="80" cy="55" r="2" fill="${c}"/><circle cx="110" cy="55" r="2" fill="${c}"/>`,
  // užina za ponijeti: a lunch box with a sandwich and an apple
  pack: (c) => `${shadow(80, 90, 52)}
    <rect x="30" y="44" width="100" height="42" rx="10" fill="${c}"/><rect x="30" y="44" width="100" height="10" rx="5" fill="#000" opacity=".12"/>
    <rect x="36" y="50" width="88" height="32" rx="7" fill="#fffaf2"/>
    <path d="M44 74l18-20 18 20z" fill="#e9b868"/><path d="M47 72l15-16 15 16" stroke="#7da33f" stroke-width="3" fill="none"/><path d="M48 75l14-15 14 15" stroke="#f2d33b" stroke-width="2" fill="none"/>
    <circle cx="100" cy="66" r="11" fill="#c8392b"/><path d="M100 55c1-4 3-6 6-7" stroke="#5a3a1c" stroke-width="2" fill="none"/><path d="M103 54c4-2 7-1 9 1-3 2-6 2-9-1z" fill="#7da33f"/>
    <circle cx="96" cy="62" r="2.5" fill="#fff" opacity=".5"/>`,
  // zimnica: two jars with a cloth lid; r.color = what is inside
  jar: (c, r = {}) => { const f = r.color || '#c9a43a';
    const one = (x, w, h, y0) => `<rect x="${x}" y="${y0}" width="${w}" height="${h}" rx="9" fill="#fffaf2" opacity=".95"/>
      <rect x="${x + 4}" y="${y0 + 10}" width="${w - 8}" height="${h - 14}" rx="6" fill="${f}"/>
      <path d="M${x + 9} ${y0 + 16}v${h - 28}" stroke="#fff" stroke-width="3" opacity=".35" stroke-linecap="round"/>
      <rect x="${x + 2}" y="${y0 - 6}" width="${w - 4}" height="9" rx="3" fill="${c}"/>
      <path d="M${x - 2} ${y0 + 1}q${w / 2 + 2} -12 ${w + 4} 0l-4 6q${-(w / 2) + 2} -8 ${-w + 4} 0z" fill="#e9d6b0"/>
      <rect x="${x + 8}" y="${y0 + h / 2}" width="${w - 16}" height="12" rx="2" fill="#fffaf2" opacity=".9"/>`;
    return `${shadow(80, 90, 50)}${one(42, 36, 50, 38)}${one(82, 40, 58, 30)}`; },
  kasika: (c) => `${shadow(80, 86, 40)}
    <path d="M44 48h72a36 28 0 0 1-72 0z" fill="#fffaf2"/>
    <ellipse cx="80" cy="48" rx="36" ry="8" fill="#fbf1de"/>
    <g fill="#9b5a1c">${[64, 72, 80, 88, 96, 76, 84].map((x, i) => `<circle cx="${x}" cy="${47 + (i % 3) - 1}" r="1.4"/>`).join('')}</g>
    <path d="M44 60c4 12 18 18 36 18s32-6 36-18" stroke="${c}" stroke-width="4" fill="none"/>`,
};

/** Illustration for a recipe. size: 'card' | 'hero' */
// Recipes with a real photo (photos/<id>-s.webp 480 px, photos/<id>-l.webp 1200 px, 16:10).
// Not pre-cached: the service worker keeps each photo once it has been seen, so the app stays small.
export const PHOTOS = new Set(['pasta-fagioli', 'begova-corba', 'cevapi', 'sarma-junetina', 'burek', 'bosanski-lonac', 'krompirusa-obicna', 'sirnica', 'punjene-paprike', 'musaka-krompir', 'grah-suho-meso', 'cufte-sos', 'pohovana-teleca-snicla', 'pecena-piletina', 'salata-riza-tuna', 'salata-paradajz-masline-sir', 'caprese', 'salata-cvekla', 'pileca-salata-jogurt', 'ruska-salata', 'sopska', 'krompir-salata-jaja', 'grah-salata', 'tuna-salata', 'solata-bucno-olje', 'gusta-salata-jogurt', 'seljacka-salata-feta', 'salata-kupus-mrkva', 'pecene-paprike-salata', 'cezar-salata', 'salata-tuna-tjestenina', 'tagliatelle-ragu', 'satras', 'prebranac', 'klepe', 'jna-pileca-supa', 'sac-janjetina', 'sogan-dolma', 'djuvec', 'burek-meso-krompir', 'pohovana-piletina', 'pljeskavica', 'gulas', 'pileci-paprikas', 'hachis-parmentier', 'krompir-ljuska', 'lasagne', 'pohovane-tikvice', 'ratatouille', 'boeuf-bourguignon', 'aglio-olio', 'sutlijas', 'baklava-sarajevska', 'vojnicki-grah', 'pohovani-riblji-file']);

export function dishArt(r, cls = '') {
  if (PHOTOS.has(r.id)) {
    const big = cls === 'big';
    return `<img class="art photo ${cls}" src="photos/${r.id}-${big ? 'l' : 's'}.webp" alt="" loading="${big ? 'eager' : 'lazy'}" decoding="async">`;
  }
  const [c, bg] = CU_COLORS[r.cu] || CU_COLORS.svakodnevno;
  const has = (id) => r.ing.some((i) => i[0] === id);
  let key = r.type === 'dessert' ? (r.sub || 'kolac') : r.type === 'pie' ? 'pie' : r.type === 'soup' ? 'soup' : r.type === 'salad' ? 'salad' : r.type === 'side' ? 'kasika' : r.type === 'zimnica' ? 'jar' : 'main';
  if (r.type === 'combo') {
    key = r.main === 'fish' ? 'fish' : !r.ing.some((i) => ['bread', 'bread_whole'].includes(i[0])) ? 'kasika' : 'bread';
  } else if (r.pack) {
    key = 'pack';
  } else if (r.type === 'breakfast' || r.type === 'snack') {
    key = r.main === 'eggs' ? 'eggs' : ['popara', 'pura-kiselo', 'zobena-kasa', 'griz-mlijeko', 'jogurt-med'].includes(r.id) ? 'kasika'
      : ['hljeb-kajmak-ajvar', 'pain-perdu', 'tost-sir', 'hljeb-pekmez'].includes(r.id) ? 'bread' : r.id === 'pecene-jabuke' ? 'kasika' : r.id === 'cicvara' ? 'eggs' : 'sitni';
  } else if (key === 'main') {
    if (r.main === 'eggs') key = 'eggs';
    else if (r.id === 'tost-sir') key = 'bread';
    else if (r.eq.includes('sac')) key = 'sac';
    else if (r.grill && r.main === 'veg') key = 'grillveg';
    else if (r.grill && r.main !== 'fish') key = 'grill';
    else if (r.main === 'fish') key = 'fish';
    else if (['spaghetti', 'pasta_short', 'tagliatelle', 'arborio'].some(has)) key = 'pasta';
    else if (r.eq.includes('oven')) key = 'oven';
  }
  const motif = `<g opacity=".22" fill="${c}">${[[14, 14], [146, 14], [14, 86], [146, 86]].map(([x, y]) => `<path d="M${x} ${y - 7}l7 7-7 7-7-7z"/>`).join('')}</g>`;
  return `<svg class="art ${cls}" viewBox="0 0 160 100" role="img" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
    <rect width="160" height="100" fill="${bg}"/>${motif}${SHAPES[key](c, r)}</svg>`;
}

/** Ćilim (kilim) border strip used in header and section dividers. */
export const KILIM = `<svg class="kilim" width="100%" height="20" aria-hidden="true"><defs><pattern id="kp" width="48" height="20" patternUnits="userSpaceOnUse"><rect width="48" height="20" fill="#6f150e"/><rect y="2" width="48" height="1" fill="#e8a33d" opacity=".55"/><rect y="17" width="48" height="1" fill="#e8a33d" opacity=".55"/><rect width="48" height="2" fill="#1f2a44"/><rect y="18" width="48" height="2" fill="#1f2a44"/><rect x="12" y="2" width="4" height="2" fill="#e8a33d"/><rect x="10" y="4" width="8" height="2" fill="#e8a33d"/><rect x="8" y="6" width="12" height="2" fill="#e8a33d"/><rect x="6" y="8" width="16" height="2" fill="#e8a33d"/><rect x="6" y="10" width="16" height="2" fill="#e8a33d"/><rect x="8" y="12" width="12" height="2" fill="#e8a33d"/><rect x="10" y="14" width="8" height="2" fill="#e8a33d"/><rect x="12" y="16" width="4" height="2" fill="#e8a33d"/><rect x="12" y="4" width="4" height="2" fill="#1f2a44"/><rect x="10" y="6" width="8" height="2" fill="#1f2a44"/><rect x="8" y="8" width="12" height="2" fill="#1f2a44"/><rect x="8" y="10" width="12" height="2" fill="#1f2a44"/><rect x="10" y="12" width="8" height="2" fill="#1f2a44"/><rect x="12" y="14" width="4" height="2" fill="#1f2a44"/><rect x="12" y="6" width="4" height="2" fill="#8c1c13"/><rect x="10" y="8" width="8" height="2" fill="#8c1c13"/><rect x="10" y="10" width="8" height="2" fill="#8c1c13"/><rect x="12" y="12" width="4" height="2" fill="#8c1c13"/><rect x="12" y="8" width="4" height="2" fill="#fbf6ee"/><rect x="12" y="10" width="4" height="2" fill="#fbf6ee"/><rect x="36" y="6" width="4" height="2" fill="#fbf6ee"/><rect x="34" y="8" width="8" height="2" fill="#fbf6ee"/><rect x="34" y="10" width="8" height="2" fill="#fbf6ee"/><rect x="36" y="12" width="4" height="2" fill="#fbf6ee"/><rect x="36" y="8" width="4" height="2" fill="#1f2a44"/><rect x="36" y="10" width="4" height="2" fill="#1f2a44"/><rect x="25" y="9" width="2" height="2" fill="#e8a33d"/><rect x="47" y="9" width="1" height="2" fill="#e8a33d"/><rect x="0" y="9" width="1" height="2" fill="#e8a33d"/><rect x="36" y="3" width="4" height="1" fill="#e8a33d"/><rect x="36" y="16" width="4" height="1" fill="#e8a33d"/></pattern><pattern id="kw" width="2" height="2" patternUnits="userSpaceOnUse"><rect width="2" height=".6" fill="#000" opacity=".14"/></pattern></defs><rect width="100%" height="20" fill="url(#kp)"/><rect width="100%" height="20" fill="url(#kw)"/></svg>`;

const I = (d) => `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
export const ICON = {
  plan: I('<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/><circle cx="8" cy="15" r="1.2" fill="currentColor"/><circle cx="12" cy="15" r="1.2" fill="currentColor"/>'),
  recipes: I('<path d="M4 11h16l-1.5 7a3 3 0 0 1-3 2.5h-7a3 3 0 0 1-3-2.5z"/><path d="M5 11c0-3.5 3-6 7-6s7 2.5 7 6"/><path d="M12 5V3"/>'),
  sweets: I('<path d="M12 3l7 7-7 7-7-7z"/><path d="M12 7l3 3-3 3-3-3z"/><path d="M5 20h14"/>'),
  pantry: I('<rect x="6" y="7" width="12" height="14" rx="3"/><path d="M8 3h8v4H8zM6 12h12"/>'),
  shop: I('<path d="M5 8h14l-1.5 11a2 2 0 0 1-2 1.8h-7a2 2 0 0 1-2-1.8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>'),
  swap: I('<path d="M4 8h13l-3-3M20 16H7l3 3"/>'),
  play: I('<path d="M8 5l11 7-11 7z" fill="currentColor"/>'),
  check: I('<path d="M5 12l5 5 9-10"/>'),
  gear: I('<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>'),
  clock: I('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
  people: I('<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.5 3.4-5.5 6.5-5.5s5.7 2 6.5 5.5"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14.8c2 .7 3.2 2.5 3.5 5.2"/>'),
  star: I('<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>'),
  starFill: I('<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" fill="currentColor"/>'),
  plus: I('<path d="M12 5v14M5 12h14"/>'),
  doc: I('<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/>'),
  party: I('<path d="M4 20l5-14 9 9z"/><path d="M14 4l1 2M19 5l-2 2M20 10l-2 0"/>'),
  medal: I('<circle cx="12" cy="15" r="5"/><path d="M8 3l4 7 4-7"/>'),
  share: I('<circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.2 11l7.6-3.8M8.2 13l7.6 3.8"/>'),
  copy: I('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/>'),
  back: I('<path d="M15 5l-7 7 7 7"/>'),
  close: I('<path d="M6 6l12 12M18 6L6 18"/>'),
  leaf: I('<path d="M5 19c0-9 6-14 15-14 0 9-5 15-14 15"/><path d="M5 19l8-8"/>'),
  moon: I('<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>'),
  refresh: I('<path d="M20 11a8 8 0 1 0-2.3 5.7M20 5v6h-6"/>'),
  search: I('<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>'),
  filter: I('<path d="M4 6h16M7 12h10M10 18h4"/>'),
  book: I('<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19V5"/>'),
  flame: I('<path d="M12 3c1 4 5 6 5 11a5 5 0 0 1-10 0c0-2.5 1.5-4 2.5-5.5.3 2 1.2 3 2.2 3.5C11 9 11 6 12 3z"/><path d="M4 21h16"/>'),
  box: I('<rect x="3" y="8" width="18" height="12" rx="3"/><path d="M3 12h18M9 8V6a3 3 0 0 1 6 0v2"/>'),
  jar: I('<path d="M8 3h8v3H8z"/><path d="M7 6h10a1 1 0 0 1 1 1v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7a1 1 0 0 1 1-1z"/><path d="M6 11h12M9 15h6"/>'),
  timer: I('<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5M10 2h4"/>'),
};
