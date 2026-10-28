// Contoh animasi bergantian di beranda: SD → SMP → SMP → SMA.
// Setiap contoh adalah materi mini (format sama dengan isi materi) plus keterangan.

// ---------- SD: 8 + 5 dengan membuat 10 ----------
const cellX = (i) => 110 + (i % 5) * 45;
const cellY = (i) => 120 + Math.floor(i / 5) * 45;
const SD = {
  badge: 'SD · Kelas 1',
  title: 'Membuat 10',
  cap: 'Dua dari lima bulatan biru melengkapi bingkai menjadi 10, sisanya 3.',
  href: '#/materi/k1b6-1',
  en: { badge: 'Primary · Grade 1', title: 'Making 10', cap: 'Two of the five blue dots fill the frame to make 10, leaving 3.' },
  lesson: {
    id: 'demo-sd',
    chapters: [
      {
        title: 'Contoh',
        steps: [
          {
            add: [
              { id: 'q', t: 'text', x: 200, y: 48, text: '{n:8} + {p:5} = ?', size: 34, w: 800 },
              ...Array.from({ length: 10 }, (_, i) => ({ id: `f${i}`, t: 'rect', x: cellX(i), y: cellY(i), w: 45, h: 45, r: 0, fill: 'paper', stroke: 'ink', sw: 2 })),
              ...Array.from({ length: 8 }, (_, i) => ({ id: `a${i}`, t: 'circle', x: cellX(i), y: cellY(i), r: 15, fill: 'neg', stroke: 'ink', sw: 1.5 })),
            ],
          },
          { add: Array.from({ length: 5 }, (_, i) => ({ id: `b${i}`, t: 'circle', x: 110 + i * 45, y: 245, r: 15, fill: 'pos', stroke: 'ink', sw: 1.5 })) },
          { set: { b0: { x: cellX(8), y: cellY(8) }, b1: { x: cellX(9), y: cellY(9) }, b2: { x: 155 }, b3: { x: 200 }, b4: { x: 245 } } },
          { set: { q: { text: '{n:8} + {p:5} = 10 + 3 = {g:13}' } } },
        ],
      },
    ],
  },
};

// ---------- SMP: 5 + (−3) dengan keping ----------
const chip = (id, kind, x, y) => ({ id, t: 'icon', name: kind === '+' ? 'chipP' : 'chipN', size: 34, x, y });
const INT = {
  badge: 'SMP · Kelas 7',
  title: 'Bilangan bulat',
  cap: 'Sepasang keping biru (+1) dan merah (−1) bernilai nol. Yang tersisa adalah jawabannya.',
  href: '#/materi/b1-2',
  en: { badge: 'Junior High · Grade 7', title: 'Integers', cap: 'A blue (+1) and a red (−1) counter make zero. What is left is the answer.' },
  lesson: {
    id: 'demo-int',
    chapters: [
      {
        title: 'Contoh',
        steps: [
          { add: [{ id: 'q', t: 'text', x: 200, y: 48, text: '{p:5} + ({n:−3}) = ?', size: 34, w: 800 }] },
          { add: [0, 1, 2, 3, 4].map((i) => chip(`p${i}`, '+', 80 + i * 60, 140)) },
          { add: [0, 1, 2].map((i) => chip(`n${i}`, '−', 80 + i * 60, 205)) },
          { set: { n0: { y: 172 }, n1: { y: 172 }, n2: { y: 172 }, p0: { y: 172 }, p1: { y: 172 }, p2: { y: 172 } } },
          { set: { p0: { o: 0 }, p1: { o: 0 }, p2: { o: 0 }, n0: { o: 0 }, n1: { o: 0 }, n2: { o: 0 } } },
          { set: { p3: { x: 170 }, p4: { x: 230 }, q: { text: '{p:5} + ({n:−3}) = {g:2}' } } },
        ],
      },
    ],
  },
};

// ---------- SMP: suku sejenis dengan ubin aljabar ----------
const xTile = (id, x, y) => ({ id, t: 'rect', x, y, w: 26, h: 78, r: 4, fill: 'pos', stroke: 'ink', sw: 1.5, label: 'x', lsize: 15, lc: 'onfill' });
const uTile = (id, x, y) => ({ id, t: 'rect', x, y, w: 26, h: 26, r: 4, fill: 'acc', stroke: 'ink', sw: 1.5, label: '1', lsize: 13 });
const ALG = {
  badge: 'SMP · Kelas 7',
  title: 'Suku sejenis',
  cap: 'Ubin x hanya bisa digabung dengan ubin x, ubin satuan dengan satuan.',
  href: '#/materi/b3-2',
  en: { badge: 'Junior High · Grade 7', title: 'Like terms', cap: 'x tiles combine only with x tiles, unit tiles only with unit tiles.' },
  lesson: {
    id: 'demo-alg',
    chapters: [
      {
        title: 'Contoh',
        steps: [
          {
            add: [
              { id: 'q', t: 'text', x: 200, y: 48, text: '({p:2x} + {a:3}) + ({p:x} + {a:1}) = ?', size: 28, w: 800 },
              xTile('x0', 60, 160), xTile('x1', 92, 160), uTile('u0', 128, 186), uTile('u1', 158, 186), uTile('u2', 188, 186),
              xTile('x2', 262, 160), uTile('u3', 300, 186),
            ],
          },
          { set: { x2: { x: 124 }, x0: { x: 60 }, x1: { x: 92 }, u0: { x: 230 }, u1: { x: 262 }, u2: { x: 294 }, u3: { x: 326 } } },
          { add: [{ id: 'l1', t: 'text', x: 92, y: 230, text: '{p:3x}', size: 22, w: 800 }, { id: 'l2', t: 'text', x: 278, y: 230, text: '{a:4}', size: 22, w: 800 }] },
          { set: { q: { text: '({p:2x} + {a:3}) + ({p:x} + {a:1}) = {g:3x + 4}' } } },
        ],
      },
    ],
  },
};

// ---------- SMA: menggeser parabola ----------
const OX = 170;
const OY = 200;
const U = 28;
const para = () => {
  const pts = [];
  for (let k = -22; k <= 22; k++) {
    const x = k / 10;
    pts.push(`${(OX + U * x).toFixed(1)},${(OY - U * x * x).toFixed(1)}`);
  }
  return `M${pts.join(' L')}`;
};
const QUAD = {
  badge: 'SMA · Kelas 10',
  title: 'Menggeser grafik',
  cap: 'Mengganti x dengan x − 2 menggeser parabola 2 ke kanan; dikurangi 1 menurunkannya 1.',
  href: '#/materi/k10b6-1',
  en: { badge: 'Senior High · Grade 10', title: 'Shifting a graph', cap: 'Replacing x with x − 2 shifts the parabola 2 to the right; subtracting 1 moves it down 1.' },
  lesson: {
    id: 'demo-quad',
    chapters: [
      {
        title: 'Contoh',
        steps: [
          {
            add: [
              { id: 'q', t: 'text', x: 200, y: 36, text: 'y = {p:x²}', size: 28, w: 800 },
              { id: 'ax', t: 'line', x: 30, y: OY, x2: 370, y2: OY, c: 'mut', sw: 2, draw: false },
              { id: 'ay', t: 'line', x: OX, y: 60, x2: OX, y2: 285, c: 'mut', sw: 2, draw: false },
              { id: 'pb', t: 'path', x: 0, y: 0, d: para(), stroke: 'pos', sw: 4 },
              { id: 'v', t: 'circle', x: OX, y: OY, r: 7, fill: 'acc', stroke: 'ink', sw: 1.5 },
            ],
          },
          { set: { pb: { x: 2 * U }, v: { x: OX + 2 * U }, q: { text: 'y = (x {n:− 2})²' } } },
          { set: { pb: { x: 2 * U, y: U }, v: { x: OX + 2 * U, y: OY + U }, q: { text: 'y = (x {n:− 2})² {n:− 1}' } } },
          { add: [{ id: 'vl', t: 'text', x: OX + 2 * U + 48, y: OY + U + 20, text: '{g:(2, −1)}', size: 18, w: 800 }] },
        ],
      },
    ],
  },
};

export const DEMOS = [SD, INT, ALG, QUAD];
