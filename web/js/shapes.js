// Pustaka bentuk SVG untuk panggung animasi.
// Semua bentuk digambar di sekitar titik (0,0); posisi diatur pembungkusnya.
// Panggung memakai viewBox 0 0 400 300.

export const VIEW = { w: 400, h: 300 };

const esc = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

// Markup warna sederhana: "{p:3} − ({n:−2})"
// p = positif (biru), n = negatif (merah), a = aksen, g = benar (hijau), m = redup, k = tinta
export function parseMarkup(str) {
  const out = [];
  const re = /\{(\w+):([^{}]*)\}/g;
  let last = 0;
  let m;
  const s = String(str);
  while ((m = re.exec(s))) {
    if (m.index > last) out.push([s.slice(last, m.index), null]);
    out.push([m[2], m[1]]);
    last = re.lastIndex;
  }
  if (last < s.length) out.push([s.slice(last), null]);
  return out;
}

export const stripMarkup = (s) => parseMarkup(s).map((p) => p[0]).join('');

const KEY = { p: 'pos', n: 'neg', a: 'acc', g: 'ok', m: 'mut', k: 'ink' };

export function spansHTML(str) {
  return parseMarkup(str)
    .map(([t, k]) => (k ? `<span class="mk mk-${KEY[k] || k}">${esc(t)}</span>` : esc(t)))
    .join('');
}

function tspans(str) {
  return parseMarkup(str)
    .map(([t, k]) => (k ? `<tspan class="c-${KEY[k] || k}">${esc(t)}</tspan>` : esc(t)))
    .join('');
}

// Warna teks yang terbaca di atas isian tertentu
export const onCls = (fill) =>
  !fill || fill === 'paper' || fill === 'none' || fill.startsWith('acc') || fill.endsWith('-soft') ? 'c-ink' : 'c-onfill';

const n = (v, d = 0) => (v === undefined || v === null ? d : v);
const r2 = (v) => Math.round(v * 100) / 100;

function textBlock(p, size, cls = '') {
  const lines = String(p.text ?? '').split('\n');
  const lh = size * (p.lh || 1.25);
  const y0 = -((lines.length - 1) * lh) / 2;
  const anchor = p.a === 'start' ? 'start' : p.a === 'end' ? 'end' : 'middle';
  const font = p.font === 'serif' ? ' serif' : '';
  const body = lines
    .map((ln, i) => `<tspan x="0" y="${r2(y0 + i * lh)}">${tspans(ln)}</tspan>`)
    .join('');
  return `<text class="t${font} ${cls}" font-size="${size}" font-weight="${n(p.w, 700)}" text-anchor="${anchor}" dominant-baseline="central">${body}</text>`;
}

function arrowHead(x1, y1, x2, y2, size) {
  const ang = Math.atan2(y2 - y1, x2 - x1);
  const a1 = ang + Math.PI * 0.85;
  const a2 = ang - Math.PI * 0.85;
  const p = [
    [x2, y2],
    [x2 + size * Math.cos(a1), y2 + size * Math.sin(a1)],
    [x2 + size * Math.cos(a2), y2 + size * Math.sin(a2)],
  ];
  return `<polygon points="${p.map((q) => q.map(r2).join(',')).join(' ')}" fill="currentColor"/>`;
}

// ---------- Garis bilangan ----------
export const NL_PAD = 16;
export function nlX(cfg, v) {
  const { x, w, min, max } = cfg;
  const left = x - w / 2 + NL_PAD;
  return r2(left + ((v - min) / (max - min)) * (w - 2 * NL_PAD));
}

// ---------- Timbangan ----------
// Mengembalikan posisi piring kiri/kanan untuk kemiringan tertentu (derajat, + = kanan turun)
export function panPos(cx, cy, len, tilt) {
  const a = (tilt * Math.PI) / 180;
  const dx = Math.cos(a) * len;
  const dy = Math.sin(a) * len;
  return {
    left: { x: r2(cx - dx), y: r2(cy - dy) },
    right: { x: r2(cx + dx), y: r2(cy + dy) },
  };
}

const TYPES = {
  text(p) {
    return textBlock(p, n(p.size, 20), `c-${p.c || 'ink'}`);
  },

  frac(p) {
    const s = n(p.size, 22);
    const num = String(p.n);
    const den = String(p.d);
    const wd = Math.max(num.length, den.length) * s * 0.6 + s * 0.35;
    const sign = p.sign ? `<text class="t" font-size="${s}" font-weight="800" x="${r2(-wd / 2 - s * 0.45)}" y="0" text-anchor="middle" dominant-baseline="central">${esc(p.sign)}</text>` : '';
    return `<g class="c-${p.c || 'ink'}">${sign}<text class="t" font-size="${s}" font-weight="${n(p.w, 800)}" text-anchor="middle" dominant-baseline="central" y="${r2(-s * 0.62)}">${esc(num)}</text><line x1="${r2(-wd / 2)}" x2="${r2(wd / 2)}" y1="0" y2="0" stroke="currentColor" stroke-width="${r2(Math.max(1.5, s / 11))}" stroke-linecap="round"/><text class="t" font-size="${s}" font-weight="${n(p.w, 800)}" text-anchor="middle" dominant-baseline="central" y="${r2(s * 0.66)}">${esc(den)}</text></g>`;
  },

  rect(p) {
    const w = n(p.w, 40);
    const h = n(p.h, 40);
    const dash = p.dash ? ` stroke-dasharray="${p.dash}"` : '';
    const label =
      p.label !== undefined
        ? textBlock({ text: p.label, w: n(p.lw, 800) }, n(p.lsize, Math.min(h * 0.55, 20)), `c-${p.lc || 'ink'}`)
        : '';
    return `<rect x="${r2(-w / 2)}" y="${r2(-h / 2)}" width="${w}" height="${h}" rx="${n(p.r, 6)}" class="f-${p.fill || 'paper'} s-${p.stroke || 'ink'}" stroke-width="${n(p.sw, 2)}"${dash}/>${label}`;
  },

  circle(p) {
    const r = n(p.r, 12);
    const dash = p.dash ? ` stroke-dasharray="${p.dash}"` : '';
    const label =
      p.label !== undefined
        ? textBlock({ text: p.label, w: 800 }, n(p.lsize, r * 1.1), `c-${p.lc || 'ink'}`)
        : '';
    return `<circle r="${r}" class="f-${p.fill || 'paper'} s-${p.stroke || 'ink'}" stroke-width="${n(p.sw, 2)}"${dash}/>${label}`;
  },

  line(p) {
    const dx = r2(n(p.x2, p.x) - p.x);
    const dy = r2(n(p.y2, p.y) - p.y);
    const wd = n(p.sw, 3);
    const dash = p.dash ? ` stroke-dasharray="${p.dash}"` : '';
    const draw = !p.dash && p.draw !== false ? ' draw' : '';
    let heads = '';
    const hs = wd * 3 + 3;
    if (p.arrow === 'end' || p.arrow === 'both') heads += arrowHead(0, 0, dx, dy, hs);
    if (p.arrow === 'start' || p.arrow === 'both') heads += arrowHead(dx, dy, 0, 0, hs);
    return `<g class="c-${p.c || 'ink'}"><line x1="0" y1="0" x2="${dx}" y2="${dy}" stroke="currentColor" stroke-width="${wd}" stroke-linecap="round" pathLength="1"${dash} class="ln${draw}"/>${heads}</g>`;
  },

  // Panah lengkung untuk lompatan di garis bilangan: dari (x,y) ke (x2,y)
  hop(p) {
    const dx = r2(n(p.x2, p.x) - p.x);
    const h = n(p.h, Math.min(46, Math.abs(dx) * 0.45 + 12));
    const up = p.below ? 1 : -1;
    const cx = dx / 2;
    const cy = up * h * 2 * 0.9;
    const d = `M0,0 Q${r2(cx)},${r2(cy)} ${dx},0`;
    const head = arrowHead(r2(cx + (dx - cx) * 0.7), r2(cy * 0.3), dx, 0, 9);
    const label =
      p.label !== undefined
        ? `<text class="t c-${p.c || 'acc'}" x="${r2(cx)}" y="${r2(up * h * 0.9 + up * 12)}" font-size="${n(p.lsize, 14)}" font-weight="800" text-anchor="middle" dominant-baseline="central">${tspans(p.label)}</text>`
        : '';
    const draw = p.draw !== false ? ' draw' : '';
    return `<g class="c-${p.c || 'acc'}"><path d="${d}" fill="none" stroke="currentColor" stroke-width="${n(p.sw, 3)}" stroke-linecap="round" pathLength="1" class="ln${draw}"/>${head}</g>${label}`;
  },

  path(p) {
    const dash = p.dash ? ` stroke-dasharray="${p.dash}"` : '';
    return `<path d="${p.d}" class="f-${p.fill || 'none'} s-${p.stroke || 'ink'}" stroke-width="${n(p.sw, 2.5)}" stroke-linecap="round" stroke-linejoin="round"${dash}/>`;
  },

  poly(p) {
    const pts = (p.pts || []).map((q) => q.map(r2).join(',')).join(' ');
    const dash = p.dash ? ` stroke-dasharray="${p.dash}"` : '';
    const tag = p.open ? 'polyline' : 'polygon';
    return `<${tag} points="${pts}" class="f-${p.fill || 'none'} s-${p.stroke || 'ink'}" stroke-width="${n(p.sw, 2.5)}" stroke-linejoin="round" stroke-linecap="round"${dash}/>`;
  },

  // Penanda sudut. a1, a2 dalam derajat (0 = kanan, berlawanan jarum jam positif)
  arc(p) {
    const r = n(p.r, 26);
    const a1 = n(p.a1, 0);
    const a2 = n(p.a2, 90);
    const c = p.c || 'acc';
    if (p.right) {
      const s = r * 0.55;
      const u1 = [Math.cos((a1 * Math.PI) / 180), -Math.sin((a1 * Math.PI) / 180)];
      const u2 = [Math.cos((a2 * Math.PI) / 180), -Math.sin((a2 * Math.PI) / 180)];
      const pA = [u1[0] * s, u1[1] * s];
      const pB = [(u1[0] + u2[0]) * s, (u1[1] + u2[1]) * s];
      const pC = [u2[0] * s, u2[1] * s];
      const lab = p.label !== undefined ? labelAt(p, r, (a1 + a2) / 2, c) : '';
      return `<g class="c-${c}"><polyline points="${[pA, pB, pC].map((q) => q.map(r2).join(',')).join(' ')}" fill="none" stroke="currentColor" stroke-width="2.5"/></g>${lab}`;
    }
    const pt = (a) => [r * Math.cos((a * Math.PI) / 180), -r * Math.sin((a * Math.PI) / 180)];
    const [sx, sy] = pt(a1);
    const [ex, ey] = pt(a2);
    let sweep = a2 - a1;
    while (sweep < 0) sweep += 360;
    const large = sweep > 180 ? 1 : 0;
    const d = `M0,0 L${r2(sx)},${r2(sy)} A${r},${r} 0 ${large} 0 ${r2(ex)},${r2(ey)} Z`;
    const d2 = `M${r2(sx)},${r2(sy)} A${r},${r} 0 ${large} 0 ${r2(ex)},${r2(ey)}`;
    const lab = p.label !== undefined ? labelAt(p, r, a1 + sweep / 2, c) : '';
    return `<path d="${d}" class="f-${c}-soft" stroke="none"/><g class="c-${c}"><path d="${d2}" fill="none" stroke="currentColor" stroke-width="2.5"/></g>${lab}`;
  },

  nline(p) {
    const w = n(p.w, 340);
    const min = n(p.min, -5);
    const max = n(p.max, 5);
    const step = n(p.step, 1);
    const every = n(p.every, 1);
    const cfg = { x: 0, w, min, max };
    let s = `<g class="c-ink"><line x1="${-w / 2}" x2="${w / 2}" y1="0" y2="0" stroke="currentColor" stroke-width="2.5"/>`;
    s += arrowHead(-w / 2 + 4, 0, -w / 2, 0, 8) + arrowHead(w / 2 - 4, 0, w / 2, 0, 8);
    const count = Math.round((max - min) / step);
    for (let i = 0; i <= count; i++) {
      const v = r2(min + i * step);
      const x = nlX(cfg, v);
      const big = Math.abs(v / every - Math.round(v / every)) < 1e-9;
      s += `<line x1="${x}" x2="${x}" y1="${big ? -7 : -4}" y2="${big ? 7 : 4}" stroke="currentColor" stroke-width="2"/>`;
      if (big && p.labels !== false) {
        const cls = v < 0 ? 'c-neg' : v > 0 ? 'c-pos' : 'c-ink';
        const lab = v < 0 ? `−${Math.abs(v)}` : String(v);
        s += `<text class="t ${p.mono ? 'c-ink' : cls}" x="${x}" y="22" font-size="${n(p.lsize, 13)}" font-weight="800" text-anchor="middle" dominant-baseline="central">${lab}</text>`;
      }
    }
    return s + '</g>';
  },

  grid(p) {
    const rows = n(p.rows, 10);
    const cols = n(p.cols, 10);
    const c = n(p.cell, 18);
    const filled = n(p.filled, 0);
    const W = cols * c;
    const H = rows * c;
    let s = '';
    for (let i = 0; i < rows * cols; i++) {
      const rr = Math.floor(i / cols);
      const cc = i % cols;
      const on = Array.isArray(p.filled) ? p.filled.includes(i) : i < filled;
      s += `<rect x="${r2(-W / 2 + cc * c)}" y="${r2(-H / 2 + rr * c)}" width="${c}" height="${c}" class="${on ? `f-${p.fc || 'pos'}` : 'f-paper'} s-mut" stroke-width="1"/>`;
    }
    return s + `<rect x="${-W / 2}" y="${-H / 2}" width="${W}" height="${H}" class="f-none s-ink" stroke-width="2"/>`;
  },

  // Batang pecahan
  bar(p) {
    const w = n(p.w, 240);
    const h = n(p.h, 36);
    const parts = n(p.parts, 1);
    const pw = w / parts;
    let s = '';
    for (let i = 0; i < parts; i++) {
      const on = Array.isArray(p.filled) ? p.filled.includes(i) : i < n(p.filled, 0);
      s += `<rect x="${r2(-w / 2 + i * pw)}" y="${-h / 2}" width="${r2(pw)}" height="${h}" class="${on ? `f-${p.fc || 'pos'}` : 'f-paper'} s-ink" stroke-width="2"/>`;
      if (p.lab) {
        const lab = typeof p.lab === 'string' ? p.lab : p.lab[i];
        if (lab) s += `<text class="t ${on ? onCls(p.fc || 'pos') : 'c-ink'}" x="${r2(-w / 2 + (i + 0.5) * pw)}" y="0" font-size="${n(p.lsize, Math.min(h * 0.45, 16))}" font-weight="800" text-anchor="middle" dominant-baseline="central">${esc(lab)}</text>`;
      }
    }
    return s + `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="3" class="f-none s-ink" stroke-width="2.5"/>`;
  },

  table(p) {
    const rows = p.rows || [];
    const cols = rows[0] ? rows[0].length : 0;
    const cw = Array.isArray(p.cw) ? p.cw : Array(cols).fill(n(p.cw, 70));
    const rh = n(p.rh, 28);
    const W = cw.reduce((a, b) => a + b, 0);
    const H = rows.length * rh;
    const size = n(p.size, 14);
    let s = '';
    rows.forEach((row, ri) => {
      let x = -W / 2;
      row.forEach((cell, ci) => {
        const head = p.head && ri === 0;
        const hlc = p.hl && p.hl.some(([a, b]) => a === ri && b === ci);
        s += `<rect x="${r2(x)}" y="${r2(-H / 2 + ri * rh)}" width="${cw[ci]}" height="${rh}" class="${hlc ? 'f-acc-soft' : head ? 'f-mut-soft' : 'f-paper'} s-ink" stroke-width="1.5"/>`;
        s += `<text class="t c-ink" x="${r2(x + cw[ci] / 2)}" y="${r2(-H / 2 + ri * rh + rh / 2)}" font-size="${size}" font-weight="${head ? 800 : 700}" text-anchor="middle" dominant-baseline="central">${tspans(cell)}</text>`;
        x += cw[ci];
      });
    });
    return s;
  },

  // Diagram batang. Titik (x,y) = pusat area grafik
  bars(p) {
    const data = p.data || [];
    const w = n(p.w, 300);
    const h = n(p.h, 180);
    const max = n(p.max, Math.max(1, ...data.map((d) => d.v)));
    const gap = w / Math.max(1, data.length);
    const bw = gap * n(p.bw, 0.6);
    const tick = n(p.tick, max <= 10 ? 1 : max <= 20 ? 2 : 5);
    let s = `<g class="c-ink"><line x1="${-w / 2}" y1="${h / 2}" x2="${w / 2}" y2="${h / 2}" stroke="currentColor" stroke-width="2"/><line x1="${-w / 2}" y1="${h / 2}" x2="${-w / 2}" y2="${-h / 2 - 6}" stroke="currentColor" stroke-width="2"/></g>`;
    for (let v = 0; v <= max + 1e-9; v += tick) {
      const y = r2(h / 2 - (v / max) * h);
      s += `<line x1="${-w / 2 - 4}" x2="${w / 2}" y1="${y}" y2="${y}" class="s-mut" stroke-width="${v === 0 ? 0 : 1}" stroke-dasharray="3 4"/><text class="t c-ink" x="${-w / 2 - 8}" y="${y}" font-size="11" font-weight="700" text-anchor="end" dominant-baseline="central">${r2(v)}</text>`;
    }
    data.forEach((d, i) => {
      const cx = -w / 2 + gap * (i + 0.5);
      const bh = (n(d.show, 1) ? d.v / max : 0) * h;
      const cls = d.c || p.fc || 'pos';
      s += `<rect class="barfill f-${cls}" x="${r2(cx - bw / 2)}" y="${r2(h / 2 - bh)}" width="${r2(bw)}" height="${r2(Math.max(0, bh))}" rx="2"/>`;
      s += `<text class="t c-ink" x="${r2(cx)}" y="${r2(h / 2 + 14)}" font-size="${n(p.lsize, 12)}" font-weight="700" text-anchor="middle" dominant-baseline="central">${esc(d.l)}</text>`;
      if (p.vals && n(d.show, 1)) s += `<text class="t c-ink" x="${r2(cx)}" y="${r2(h / 2 - bh - 10)}" font-size="12" font-weight="800" text-anchor="middle" dominant-baseline="central">${esc(d.v)}</text>`;
    });
    return s;
  },

  // Diagram garis
  lines(p) {
    const data = p.data || [];
    const w = n(p.w, 300);
    const h = n(p.h, 180);
    const max = n(p.max, Math.max(1, ...data.map((d) => d.v)));
    const gap = w / Math.max(1, data.length);
    const tick = n(p.tick, max <= 10 ? 1 : max <= 20 ? 2 : 5);
    let s = `<g class="c-ink"><line x1="${-w / 2}" y1="${h / 2}" x2="${w / 2}" y2="${h / 2}" stroke="currentColor" stroke-width="2"/><line x1="${-w / 2}" y1="${h / 2}" x2="${-w / 2}" y2="${-h / 2 - 6}" stroke="currentColor" stroke-width="2"/></g>`;
    for (let v = 0; v <= max + 1e-9; v += tick) {
      const y = r2(h / 2 - (v / max) * h);
      s += `<line x1="${-w / 2 - 4}" x2="${w / 2}" y1="${y}" y2="${y}" class="s-mut" stroke-width="${v === 0 ? 0 : 1}" stroke-dasharray="3 4"/><text class="t c-ink" x="${-w / 2 - 8}" y="${y}" font-size="11" font-weight="700" text-anchor="end" dominant-baseline="central">${r2(v)}</text>`;
    }
    const shown = data.filter((d) => n(d.show, 1));
    const pts = shown.map((d) => {
      const i = data.indexOf(d);
      return [r2(-w / 2 + gap * (i + 0.5)), r2(h / 2 - (d.v / max) * h)];
    });
    if (pts.length > 1) s += `<g class="c-${p.fc || 'pos'}"><polyline points="${pts.map((q) => q.join(',')).join(' ')}" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round" pathLength="1" class="ln draw"/></g>`;
    data.forEach((d, i) => {
      const cx = r2(-w / 2 + gap * (i + 0.5));
      s += `<text class="t c-ink" x="${cx}" y="${r2(h / 2 + 14)}" font-size="${n(p.lsize, 12)}" font-weight="700" text-anchor="middle" dominant-baseline="central">${esc(d.l)}</text>`;
      if (n(d.show, 1)) {
        const y = r2(h / 2 - (d.v / max) * h);
        s += `<circle cx="${cx}" cy="${y}" r="4.5" class="f-${p.fc || 'pos'} s-paper" stroke-width="2"/>`;
        if (p.vals) s += `<text class="t c-ink" x="${cx}" y="${r2(y - 13)}" font-size="12" font-weight="800" text-anchor="middle" dominant-baseline="central">${esc(d.v)}</text>`;
      }
    });
    return s;
  },

  // Diagram lingkaran: values + cls (kelas warna) + labels
  pie(p) {
    const r = n(p.r, 80);
    const vals = p.values || [];
    const total = vals.reduce((a, b) => a + b, 0) || 1;
    const cls = p.cls || [];
    let a = -90;
    let s = '';
    vals.forEach((v, i) => {
      const sweep = (v / total) * 360;
      const a2 = a + sweep;
      const p1 = [r * Math.cos((a * Math.PI) / 180), r * Math.sin((a * Math.PI) / 180)];
      const p2 = [r * Math.cos((a2 * Math.PI) / 180), r * Math.sin((a2 * Math.PI) / 180)];
      const large = sweep > 180 ? 1 : 0;
      if (sweep >= 359.99) s += `<circle r="${r}" class="f-${cls[i] || 'pos'} s-paper" stroke-width="2"/>`;
      else if (sweep > 0) s += `<path d="M0,0 L${r2(p1[0])},${r2(p1[1])} A${r},${r} 0 ${large} 1 ${r2(p2[0])},${r2(p2[1])} Z" class="f-${cls[i] || 'pos'} s-paper" stroke-width="2"/>`;
      if (p.labels && p.labels[i]) {
        const mid = ((a + sweep / 2) * Math.PI) / 180;
        const lr = r * n(p.lr, 0.62);
        s += `<text class="t ${p.lout ? 'c-ink' : onCls(cls[i] || 'pos')}" x="${r2(lr * Math.cos(mid))}" y="${r2(lr * Math.sin(mid))}" font-size="${n(p.lsize, 13)}" font-weight="800" text-anchor="middle" dominant-baseline="central">${tspans(p.labels[i])}</text>`;
      }
      a = a2;
    });
    return s;
  },

  // Busur derajat (setengah lingkaran), pusat di (0,0)
  prot(p) {
    const r = n(p.r, 120);
    let s = `<path d="M${-r},0 A${r},${r} 0 0 1 ${r},0 Z" class="f-acc-soft s-ink" stroke-width="2" fill-opacity="0.55"/>`;
    for (let d = 0; d <= 180; d += 5) {
      const big = d % 10 === 0;
      const a = (d * Math.PI) / 180;
      const r1 = r - (d % 30 === 0 ? 14 : big ? 9 : 5);
      s += `<line x1="${r2(r * Math.cos(a))}" y1="${r2(-r * Math.sin(a))}" x2="${r2(r1 * Math.cos(a))}" y2="${r2(-r1 * Math.sin(a))}" class="s-ink" stroke-width="${big ? 1.5 : 1}"/>`;
      if (d % 30 === 0) s += `<text class="t c-ink" x="${r2((r - 24) * Math.cos(a))}" y="${r2(-(r - 24) * Math.sin(a))}" font-size="11" font-weight="800" text-anchor="middle" dominant-baseline="central">${d}</text>`;
    }
    return s + `<circle r="3" class="f-ink s-ink" stroke-width="1"/>`;
  },

  // Ubin aljabar: kind = x | -x | 1 | -1 | x2 | -x2
  tile(p) {
    const u = n(p.u, 14);
    const L = u * 3.2;
    const k = p.kind || '1';
    const neg = k.startsWith('-');
    const base = neg ? k.slice(1) : k;
    const [w, h] = base === 'x' ? (p.vert ? [u, L] : [L, u]) : base === 'x2' ? [L, L] : [u, u];
    const lab = base === 'x' ? (neg ? '−x' : 'x') : base === 'x2' ? (neg ? '−x²' : 'x²') : neg ? '−' : '+';
    const fill = neg ? 'neg' : base === '1' ? 'acc' : 'pos';
    return `<rect x="${r2(-w / 2)}" y="${r2(-h / 2)}" width="${r2(w)}" height="${r2(h)}" rx="3" class="f-${fill} s-ink" stroke-width="1.5"/><text class="t ${onCls(fill)}" font-size="${r2(Math.min(u * 0.9, 13))}" font-weight="800" text-anchor="middle" dominant-baseline="central">${lab}</text>`;
  },

  icon(p) {
    const s = n(p.size, 28);
    const f = ICONS[p.name];
    return f ? f(s, p) : '';
  },
};

const ICONS = {
  // Keping positif dan negatif
  chipP: (s) =>
    `<circle r="${s / 2}" class="f-pos s-ink" stroke-width="1.5"/><path d="M${-s * 0.22},0 H${s * 0.22} M0,${-s * 0.22} V${s * 0.22}" class="s-onfill" stroke-width="${r2(s / 9)}" stroke-linecap="round"/>`,
  chipN: (s) =>
    `<circle r="${s / 2}" class="f-neg s-ink" stroke-width="1.5"/><path d="M${-s * 0.22},0 H${s * 0.22}" class="s-onfill" stroke-width="${r2(s / 9)}" stroke-linecap="round"/>`,
  thermo: (s) => {
    const h = s * 3;
    return `<rect x="${-s * 0.22}" y="${-h / 2}" width="${s * 0.44}" height="${h}" rx="${s * 0.22}" class="f-paper s-ink" stroke-width="2"/><circle cy="${h / 2}" r="${s * 0.38}" class="f-neg s-ink" stroke-width="2"/>`;
  },
  // Kantong berisi jumlah tak diketahui
  bag: (s, p) =>
    `<path d="M${-s * 0.3},${-s * 0.42} Q0,${-s * 0.25} ${s * 0.3},${-s * 0.42} L${s * 0.16},${-s * 0.22} Q${s * 0.55},${s * 0.05} ${s * 0.42},${s * 0.42} Q0,${s * 0.56} ${-s * 0.42},${s * 0.42} Q${-s * 0.55},${s * 0.05} ${-s * 0.16},${-s * 0.22} Z" class="f-acc-soft s-ink" stroke-width="2" stroke-linejoin="round"/><text class="t c-ink" y="${s * 0.12}" font-size="${s * 0.42}" font-weight="800" text-anchor="middle" dominant-baseline="central">${esc(p.label ?? 'x')}</text>`,
  // Beban satuan
  unit: (s, p) =>
    `<rect x="${-s / 2}" y="${-s / 2}" width="${s}" height="${s}" rx="3" class="f-${p.fill || 'mut-soft'} s-ink" stroke-width="1.5"/>${p.label !== undefined ? `<text class="t c-ink" font-size="${s * 0.55}" font-weight="800" text-anchor="middle" dominant-baseline="central">${esc(p.label)}</text>` : ''}`,
  person: (s, p) =>
    `<g class="c-${p.c || 'ink'}"><circle cy="${-s * 0.32}" r="${s * 0.17}" fill="currentColor"/><path d="M${-s * 0.28},${s * 0.45} Q${-s * 0.28},${-s * 0.1} 0,${-s * 0.1} Q${s * 0.28},${-s * 0.1} ${s * 0.28},${s * 0.45} Z" fill="currentColor"/></g>`,
  pin: (s, p) =>
    `<g class="c-${p.c || 'neg'}"><path d="M0,${s * 0.5} C${-s * 0.1},${s * 0.2} ${-s * 0.34},${s * 0.02} ${-s * 0.34},${-s * 0.18} A${s * 0.34},${s * 0.34} 0 1 1 ${s * 0.34},${-s * 0.18} C${s * 0.34},${s * 0.02} ${s * 0.1},${s * 0.2} 0,${s * 0.5} Z" fill="currentColor"/><circle cy="${-s * 0.18}" r="${s * 0.13}" class="f-paper"/></g>`,
  check: (s) =>
    `<circle r="${s / 2}" class="f-ok s-ok" stroke-width="1"/><path d="M${-s * 0.22},0 L${-s * 0.05},${s * 0.18} L${s * 0.25},${-s * 0.18}" fill="none" class="s-onfill" stroke-width="${r2(s / 8)}" stroke-linecap="round" stroke-linejoin="round"/>`,
  cross: (s) =>
    `<circle r="${s / 2}" class="f-neg s-neg" stroke-width="1"/><path d="M${-s * 0.18},${-s * 0.18} L${s * 0.18},${s * 0.18} M${s * 0.18},${-s * 0.18} L${-s * 0.18},${s * 0.18}" class="s-onfill" stroke-width="${r2(s / 8)}" stroke-linecap="round"/>`,
};

export function innerSVG(p) {
  const f = TYPES[p.t || 'text'];
  if (!f) return '';
  return f(p);
}

// Kunci bentuk: semua properti kecuali yang dianimasikan pembungkus.
const MOTION_KEYS = new Set(['x', 'y', 's', 'o', 'rot', 'hl', 'pulse', 'from', 'z', 'id']);
export function shapeKey(p) {
  const o = {};
  for (const k of Object.keys(p).sort()) {
    if (MOTION_KEYS.has(k)) continue;
    // garis memakai x,y absolut untuk titik ujung, jadi masuk kunci bentuk
    o[k] = p[k];
  }
  if (p.t === 'line' || p.t === 'hop') {
    o.__dx = n(p.x2, p.x) - p.x;
    o.__dy = n(p.y2, p.y) - p.y;
  }
  return JSON.stringify(o);
}

// Render statis (untuk gambar soal)
export function staticSVG(els, opts = {}) {
  const vb = opts.viewBox || `0 0 ${VIEW.w} ${VIEW.h}`;
  const body = (els || [])
    .slice()
    .sort((a, b) => n(a.z, 0) - n(b.z, 0))
    .map(
      (p) =>
        `<g transform="translate(${n(p.x, 0)},${n(p.y, 0)})" opacity="${n(p.o, 1)}"><g transform="rotate(${n(p.rot, 0)}) scale(${n(p.s, 1)})">${innerSVG({ ...p, draw: false })}</g></g>`,
    )
    .join('');
  return `<svg class="fig" viewBox="${vb}" role="img" aria-label="${esc(opts.label || 'Gambar soal')}">${body}</svg>`;
}
