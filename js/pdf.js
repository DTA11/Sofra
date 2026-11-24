// Tiny PDF writer for Sofra — real PDF files (no print dialog), embedded DejaVu subsets
// so č ć đ š ž and the rest always render. Layout is a simple flow of blocks.
import { PDF_FONTS } from './pdf-fonts.js';

const PW = 595.28, PH = 841.89;           // A4 in points
const ML = 48, MR = 48, MT = 54, MB = 58; // margins
const CW = PW - ML - MR;
const RED = [0.549, 0.11, 0.075], INK = [0.12, 0.11, 0.1], MUTED = [0.42, 0.39, 0.36], INDIGO = [0.12, 0.165, 0.267], SAFFRON = [0.91, 0.64, 0.24];

const fontCache = {};
async function loadFont(k) {
  if (!fontCache[k]) {
    fontCache[k] = fetch(PDF_FONTS[k].file).then((r) => { if (!r.ok) throw new Error('font'); return r.arrayBuffer(); }).then((b) => new Uint8Array(b));
  }
  return fontCache[k];
}
/** Warm the font cache (e.g. when a PDF sheet opens). */
export function preloadPdfFonts() { Object.keys(PDF_FONTS).forEach((k) => loadFont(k).catch(() => { delete fontCache[k]; })); }

// ───────── glyphs & measuring ─────────
const SUBST = { ' ': ' ', ' ': ' ', ' ': ' ', '‑': '-', '­': '' };
function gidOf(F, ch) {
  const cp = ch.codePointAt(0);
  let g = F.map[cp];
  if (g != null) return g;
  if (SUBST[ch] != null) return SUBST[ch] ? F.map[SUBST[ch].codePointAt(0)] : -1;
  if (cp > 0xffff || (cp >= 0x2600 && cp <= 0x27bf && cp !== 0x2610 && cp !== 0x2713) || cp === 0xfe0f || cp === 0x200d) return -1; // emoji etc. → drop
  const base = ch.normalize('NFD')[0];
  g = F.map[base.codePointAt(0)];
  return g != null ? g : F.map[63]; // '?'
}
function glyphs(k, s) {
  const F = PDF_FONTS[k];
  const out = [];
  for (const ch of s) { const g = gidOf(F, ch); if (g >= 0) out.push(g); }
  return out;
}
const widthG = (k, gs, size) => gs.reduce((a, g) => a + PDF_FONTS[k].w[g], 0) * size / 1000;
export const textWidth = (k, s, size) => widthG(k, glyphs(k, s), size);

// ───────── document state ─────────
function newDoc() {
  return { pages: [], cur: null, y: 0, used: { R: new Set(), B: new Set(), I: new Set(), H: new Set() } };
}
function addPage(d) {
  d.cur = []; d.pages.push(d.cur); d.y = PH - MT;
}
const num = (v) => (Math.round(v * 100) / 100).toString();
const rgb = (c) => `${num(c[0])} ${num(c[1])} ${num(c[2])}`;
function drawText(d, k, size, x, y, s, color = INK) {
  const gs = glyphs(k, s);
  if (!gs.length) return 0;
  gs.forEach((g) => d.used[k].add(g));
  const hex = gs.map((g) => g.toString(16).padStart(4, '0')).join('');
  d.cur.push(`BT /F${k} ${num(size)} Tf ${rgb(color)} rg ${num(x)} ${num(y)} Td <${hex}> Tj ET`);
  return widthG(k, gs, size);
}
function rect(d, x, y, w, h, color) { d.cur.push(`${rgb(color)} rg ${num(x)} ${num(y)} ${num(w)} ${num(h)} re f`); }
function line(d, x1, y1, x2, y2, color = MUTED, wdt = 0.5) { d.cur.push(`${rgb(color)} RG ${num(wdt)} w ${num(x1)} ${num(y1)} m ${num(x2)} ${num(y2)} l S`); }
function diamond(d, cx, cy, r, color) { d.cur.push(`${rgb(color)} rg ${num(cx)} ${num(cy + r)} m ${num(cx + r)} ${num(cy)} l ${num(cx)} ${num(cy - r)} l ${num(cx - r)} ${num(cy)} l h f`); }
function kilim(d, y, h = 12) {
  rect(d, 0, y, PW, h, RED);
  const step = h * 1.5;
  for (let x = step / 2, i = 0; x < PW; x += step, i++) {
    diamond(d, x, y + h / 2, h * 0.38, i % 2 ? INDIGO : SAFFRON);
    diamond(d, x, y + h / 2, h * 0.16, [0.98, 0.96, 0.93]);
  }
}
function ensure(d, h) { if (d.y - h < MB) addPage(d); }

// ───────── rich text wrapping ─────────
// runs: string or [[font, text], ...]
function toRuns(r, def = 'R') { return typeof r === 'string' ? [[def, r]] : r; }
function wrapRuns(runs, size, width) {
  const toks = [];
  runs.forEach(([k, s]) => {
    String(s).split(/(\s+)/).forEach((p) => { if (p) toks.push({ k, s: p, sp: /^\s+$/.test(p) }); });
  });
  const lines = []; let cur = []; let w = 0;
  const push = () => { while (cur.length && cur[cur.length - 1].sp) cur.pop(); lines.push(cur); cur = []; w = 0; };
  for (const t of toks) {
    if (t.sp && t.s.includes('\n')) { push(); continue; }
    const tw = textWidth(t.k, t.sp ? ' ' : t.s, size);
    if (t.sp) { if (cur.length) { cur.push({ ...t, s: ' ' }); w += tw; } continue; }
    if (w + tw > width && cur.length) push();
    if (tw > width) { // very long word: break by characters
      let part = '';
      for (const ch of t.s) {
        if (textWidth(t.k, part + ch, size) > width - w && part) { cur.push({ k: t.k, s: part }); push(); part = ''; }
        part += ch;
      }
      cur.push({ k: t.k, s: part }); w += textWidth(t.k, part, size); continue;
    }
    cur.push(t); w += tw;
  }
  if (cur.length) push();
  return lines;
}
function drawLine(d, toks, x, y, size, color, align = 'left', width = 0) {
  if (align === 'right') {
    const tw = toks.reduce((a, t) => a + textWidth(t.k, t.s, size), 0);
    x += width - tw;
  }
  // merge consecutive tokens of the same font
  const segs = [];
  toks.forEach((t) => { const l = segs[segs.length - 1]; if (l && l.k === t.k) l.s += t.s; else segs.push({ k: t.k, s: t.s }); });
  segs.forEach((s) => { x += drawText(d, s.k, size, x, y, s.s, s.c || color); });
}
function para(d, runs, { size = 10.5, lh = 1.38, x = ML, width = CW, color = INK, font = 'R', before = 0, after = 5, align } = {}) {
  const lines = wrapRuns(toRuns(runs, font), size, width);
  d.y -= before;
  lines.forEach((ln) => {
    ensure(d, size * lh);
    d.y -= size * lh;
    drawLine(d, ln, x, d.y + size * 0.28, size, color, align, width);
  });
  d.y -= after;
}
const measure = (runs, size, width, lh = 1.38, font = 'R') => wrapRuns(toRuns(runs, font), size, width).length * size * lh;

// ───────── blocks ─────────
function block(d, b) {
  switch (b.t) {
    case 'title': {
      if (d.pages.length === 1 && d.y === PH - MT) { kilim(d, PH - 16, 16); d.y = PH - MT - 6; }
      para(d, b.text, { size: 24, font: 'H', color: RED, lh: 1.15, after: 4 });
      if (b.sub) para(d, b.sub, { size: 10.5, color: MUTED, after: 10 });
      break;
    }
    case 'h2': {
      if (b.page) addPage(d); else ensure(d, 90);
      if (!b.page) d.y -= 10;
      para(d, b.text, { size: 17, font: 'H', color: RED, lh: 1.2, after: 2 });
      line(d, ML, d.y, ML + CW, d.y, SAFFRON, 1.2);
      d.y -= 10;
      if (b.sub) para(d, b.sub, { size: 9.5, color: MUTED, font: 'I', after: 6 });
      break;
    }
    case 'h3': {
      ensure(d, 50); d.y -= 6;
      para(d, b.text, { size: 12, font: 'B', color: INDIGO, lh: 1.25, after: 3 });
      break;
    }
    case 'p': para(d, b.text, { size: b.size || 10.5, font: b.font || 'R', color: b.muted ? MUTED : INK, after: b.after ?? 5 }); break;
    case 'kv': { // label column + wrapped value (menu rows)
      const lw = 112, size = 10.5, lh = 1.4;
      const vals = b.v;
      const h = Math.max(measure(b.k, size, lw - 8, lh, 'B') + (b.k2 ? size * lh : 0), vals.reduce((a, v) => a + measure(v, size, CW - lw, lh), 0)) + 8;
      ensure(d, h);
      const top = d.y;
      let yl = top;
      wrapRuns(toRuns(b.k, 'B'), size, lw - 8).forEach((ln) => { yl -= size * lh; drawLine(d, ln, ML, yl + size * 0.28, size, INDIGO); });
      if (b.k2) { yl -= size * lh; drawText(d, 'R', 9, ML, yl + size * 0.28, b.k2, MUTED); }
      let yv = top;
      vals.forEach((v) => wrapRuns(toRuns(v), size, CW - lw).forEach((ln) => { yv -= size * lh; drawLine(d, ln, ML + lw, yv + size * 0.28, size, INK); }));
      d.y = Math.min(yl, yv) - 4;
      line(d, ML, d.y, ML + CW, d.y, [0.85, 0.82, 0.78], 0.5);
      d.y -= 4;
      break;
    }
    case 'grid': { // two columns of items, each item = [qty, runs] or runs
      const gap = 18, colW = (CW - gap) / 2, size = b.size || 10, lh = 1.35;
      const qw = b.qw ? Math.min(118, Math.max(...b.items.map((it) => textWidth('B', it[0] || '', size))) + 10) : 0;
      for (let i = 0; i < b.items.length; i += 2) {
        const pair = [b.items[i], b.items[i + 1]].filter(Boolean);
        const hs = pair.map((it) => measure(it[1], size, colW - qw - (b.box ? 14 : 0), lh));
        const h = Math.max(...hs) + 3;
        ensure(d, h);
        const top = d.y;
        pair.forEach((it, c) => {
          const x0 = ML + c * (colW + gap);
          let x = x0;
          if (b.box) { d.cur.push(`${rgb(MUTED)} RG 0.7 w ${num(x)} ${num(top - size * lh + 0.5)} ${num(size * 0.8)} ${num(size * 0.8)} re S`); x += 14; }
          if (qw) { drawLine(d, [{ k: 'B', s: it[0] || '' }], x, top - size * lh + size * 0.28, size, INDIGO, 'right', qw - 8); x += qw; }
          let yy = top;
          wrapRuns(toRuns(it[1]), size, colW - (x - x0)).forEach((ln) => { yy -= size * lh; drawLine(d, ln, x, yy + size * 0.28, size, INK); });
        });
        d.y = top - h;
      }
      d.y -= 6;
      break;
    }
    case 'ol': {
      const size = 10.5, lh = 1.4, ind = 20;
      b.items.forEach((it, i) => {
        const lines = wrapRuns(toRuns(it), size, CW - ind);
        ensure(d, Math.min(lines.length, 2) * size * lh);
        lines.forEach((ln, j) => {
          ensure(d, size * lh);
          d.y -= size * lh;
          if (j === 0) drawText(d, 'B', size, ML, d.y + size * 0.28, `${i + 1}.`, RED);
          drawLine(d, ln, ML + ind, d.y + size * 0.28, size, INK);
        });
        d.y -= 3;
      });
      d.y -= 4;
      break;
    }
    case 'space': d.y -= b.h || 8; break;
    case 'rule': ensure(d, 12); d.y -= 6; line(d, ML, d.y, ML + CW, d.y, [0.85, 0.82, 0.78], 0.6); d.y -= 6; break;
    default: break;
  }
}

// ───────── PDF serialisation ─────────
const enc = new TextEncoder();
async function deflate(bytes) {
  if (typeof CompressionStream === 'undefined') return null;
  try {
    const cs = new CompressionStream('deflate');
    const out = new Response(new Blob([bytes]).stream().pipeThrough(cs));
    return new Uint8Array(await out.arrayBuffer());
  } catch { return null; }
}
function utf16hex(s) {
  let h = 'FEFF';
  for (let i = 0; i < s.length; i++) h += s.charCodeAt(i).toString(16).padStart(4, '0');
  return `<${h}>`;
}
function toUnicode(k, gids) {
  const F = PDF_FONTS[k];
  const rev = {};
  Object.entries(F.map).forEach(([cp, g]) => { if (rev[g] == null) rev[g] = Number(cp); });
  const pairs = [...gids].sort((a, b) => a - b).filter((g) => rev[g] != null).map((g) => `<${g.toString(16).padStart(4, '0')}> <${rev[g].toString(16).padStart(4, '0')}>`);
  let body = '';
  for (let i = 0; i < pairs.length; i += 100) { const c = pairs.slice(i, i + 100); body += `${c.length} beginbfchar\n${c.join('\n')}\nendbfchar\n`; }
  return `/CIDInit /ProcSet findresource begin\n12 dict begin\nbegincmap\n/CIDSystemInfo << /Registry (Adobe) /Ordering (UCS) /Supplement 0 >> def\n/CMapName /Adobe-Identity-UCS def\n/CMapType 2 def\n1 begincodespacerange\n<0000> <FFFF>\nendcodespacerange\n${body}endcmap\nCMapName currentdict /CMap defineresource pop\nend\nend`;
}

async function serialise(d, title) {
  const objs = []; // index = obj number - 1 ; each { dict, stream? }
  const reserve = () => { objs.push(null); return objs.length; };
  const set = (n, dict, stream) => { objs[n - 1] = { dict, stream }; };
  const catalogN = reserve(), pagesN = reserve();
  const fontRefs = {};
  for (const k of Object.keys(d.used)) {
    if (!d.used[k].size) continue;
    const F = PDF_FONTS[k];
    const bytes = await loadFont(k);
    const base = `SOFRA${'ABCD'['RBIH'.indexOf(k)]}+${F.name.replace(/[^A-Za-z0-9-]/g, '')}`;
    const ffN = reserve(), fdN = reserve(), cidN = reserve(), tuN = reserve(), t0N = reserve();
    set(ffN, `<< /Length1 ${bytes.length} >>`, bytes);
    set(fdN, `<< /Type /FontDescriptor /FontName /${base} /Flags ${F.flags} /FontBBox [${F.bbox.join(' ')}] /ItalicAngle ${F.italic} /Ascent ${F.asc} /Descent ${F.desc} /CapHeight ${F.cap} /StemV 80 /FontFile2 ${ffN} 0 R >>`);
    const gids = [...d.used[k]].sort((a, b) => a - b);
    const W = gids.map((g) => `${g} [${F.w[g]}]`).join(' ');
    set(cidN, `<< /Type /Font /Subtype /CIDFontType2 /BaseFont /${base} /CIDSystemInfo << /Registry (Adobe) /Ordering (Identity) /Supplement 0 >> /FontDescriptor ${fdN} 0 R /DW 600 /W [${W}] /CIDToGIDMap /Identity >>`);
    set(tuN, '<< >>', enc.encode(toUnicode(k, gids)));
    set(t0N, `<< /Type /Font /Subtype /Type0 /BaseFont /${base} /Encoding /Identity-H /DescendantFonts [${cidN} 0 R] /ToUnicode ${tuN} 0 R >>`);
    fontRefs[k] = t0N;
  }
  const fontDict = `<< ${Object.entries(fontRefs).map(([k, n]) => `/F${k} ${n} 0 R`).join(' ')} >>`;
  const pageNs = [];
  for (const ops of d.pages) {
    const cN = reserve(), pN = reserve();
    set(cN, '<< >>', enc.encode(ops.join('\n')));
    set(pN, `<< /Type /Page /Parent ${pagesN} 0 R /MediaBox [0 0 ${PW} ${PH}] /Resources << /Font ${fontDict} >> /Contents ${cN} 0 R >>`);
    pageNs.push(pN);
  }
  set(pagesN, `<< /Type /Pages /Kids [${pageNs.map((n) => `${n} 0 R`).join(' ')}] /Count ${pageNs.length} >>`);
  set(catalogN, `<< /Type /Catalog /Pages ${pagesN} 0 R >>`);
  const infoN = reserve();
  const now = new Date(); const p2 = (v) => String(v).padStart(2, '0');
  set(infoN, `<< /Title ${utf16hex(title)} /Producer (Sofra) /Creator (moja-sofra.netlify.app) /CreationDate (D:${now.getFullYear()}${p2(now.getMonth() + 1)}${p2(now.getDate())}${p2(now.getHours())}${p2(now.getMinutes())}) >>`);

  // write
  const parts = []; let off = 0; const offsets = [];
  const put = (x) => { const b = typeof x === 'string' ? enc.encode(x) : x; parts.push(b); off += b.length; };
  put('%PDF-1.5\n%Sofra\n');
  for (let i = 0; i < objs.length; i++) {
    offsets.push(off);
    const o = objs[i];
    if (o.stream) {
      let data = o.stream; let dict = o.dict.slice(0, -2).trim();
      const z = await deflate(data);
      if (z && z.length < data.length) { data = z; dict += ' /Filter /FlateDecode'; }
      put(`${i + 1} 0 obj\n${dict} /Length ${data.length} >>\nstream\n`); put(data); put('\nendstream\nendobj\n');
    } else put(`${i + 1} 0 obj\n${o.dict}\nendobj\n`);
  }
  const xref = off;
  put(`xref\n0 ${objs.length + 1}\n0000000000 65535 f \n${offsets.map((o) => `${String(o).padStart(10, '0')} 00000 n \n`).join('')}`);
  put(`trailer\n<< /Size ${objs.length + 1} /Root ${catalogN} 0 R /Info ${infoN} 0 R >>\nstartxref\n${xref}\n%%EOF\n`);
  return new Blob(parts, { type: 'application/pdf' });
}

/**
 * Build a PDF from blocks. Returns a Blob (application/pdf).
 * opts: { title, footer }
 */
export async function buildPDF(blocks, { title = 'Sofra', footer = 'Sofra' } = {}) {
  await Promise.all(Object.keys(PDF_FONTS).map(loadFont));
  const d = newDoc();
  addPage(d);
  blocks.forEach((b) => block(d, b));
  const total = d.pages.length;
  d.pages.forEach((ops, i) => {
    d.cur = ops;
    line(d, ML, MB - 22, ML + CW, MB - 22, [0.85, 0.82, 0.78], 0.5);
    drawText(d, 'R', 8.5, ML, MB - 34, footer, MUTED);
    const pn = `${i + 1} / ${total}`;
    drawText(d, 'R', 8.5, ML + CW - textWidth('R', pn, 8.5), MB - 34, pn, MUTED);
  });
  return serialise(d, title);
}
