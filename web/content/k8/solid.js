// Gambar bangun ruang dengan proyeksi miring (kedalaman digambar ke kanan-atas).
// Koordinat ruang (x ke kanan, y ke atas, z ke belakang) dalam piksel panggung.
const DX = 0.5;
const DY = -0.42;
const r1 = (v) => Math.round(v * 10) / 10;

export const proj = (o, [x, y, z]) => [r1(o[0] + x + z * DX), r1(o[1] - y + z * DY)];
const pts = (o, list) => list.map((p) => proj(o, p));
const poly = (id, o, list, fill, extra = {}) => ({ id, t: 'poly', x: 0, y: 0, pts: pts(o, list), fill, stroke: 'ink', sw: 2, ...extra });
const dashed = (id, o, segs, extra = {}) => ({
  id,
  t: 'path',
  x: 0,
  y: 0,
  d: segs.map(([a, b]) => `M${proj(o, a).join(',')} L${proj(o, b).join(',')}`).join(' '),
  stroke: 'mut',
  sw: 1.5,
  dash: '5 4',
  ...extra,
});

// Balok: o = pojok kiri-bawah-depan, ukuran w (lebar), h (tinggi), d (kedalaman)
export function cuboid(id, o, w, h, d, { front = 'pos-soft', top = 'pos-soft', side = 'pos-soft', z = 0, hidden = true } = {}) {
  const els = [
    poly(`${id}T`, o, [[0, h, 0], [w, h, 0], [w, h, d], [0, h, d]], top, { z }),
    poly(`${id}S`, o, [[w, 0, 0], [w, 0, d], [w, h, d], [w, h, 0]], side, { z }),
    poly(`${id}F`, o, [[0, 0, 0], [w, 0, 0], [w, h, 0], [0, h, 0]], front, { z }),
  ];
  if (hidden) els.unshift(dashed(`${id}H`, o, [[[0, 0, d], [w, 0, d]], [[0, 0, d], [0, h, d]], [[0, 0, d], [0, 0, 0]]], { z: z - 1 }));
  return els;
}

// Titik-titik sudut balok (untuk ditandai)
export const cuboidCorners = (o, w, h, d) =>
  [[0, 0, 0], [w, 0, 0], [w, h, 0], [0, h, 0], [0, 0, d], [w, 0, d], [w, h, d], [0, h, d]].map((p) => proj(o, p));

// Satu kubus satuan (tiga sisi tampak dalam satu path)
export function unitCube(id, o, i, j, k, u, fill = 'pos-soft') {
  const x = i * u;
  const y = j * u;
  const z = k * u;
  const f = [[x, y, z], [x + u, y, z], [x + u, y + u, z], [x, y + u, z]];
  const t = [[x, y + u, z], [x + u, y + u, z], [x + u, y + u, z + u], [x, y + u, z + u]];
  const s = [[x + u, y, z], [x + u, y, z + u], [x + u, y + u, z + u], [x + u, y + u, z]];
  const d = [t, s, f].map((face) => 'M' + face.map((p) => proj(o, p).join(',')).join(' L') + ' Z').join(' ');
  // urutan gambar: belakang dulu, bawah dulu, kiri dulu
  return { id, t: 'path', x: 0, y: 0, d, fill, stroke: 'ink', sw: 1.2, z: -k * 100 + j * 10 + i };
}

// Prisma segitiga (seperti tenda): alas segitiga di depan, memanjang ke belakang sejauh d
export function triPrism(id, o, w, h, d, { fill = 'acc-soft', front = 'acc', z = 0 } = {}) {
  const P = [0, 0, 0];
  const Q = [w, 0, 0];
  const T = [w / 2, h, 0];
  const P2 = [0, 0, d];
  const Q2 = [w, 0, d];
  const T2 = [w / 2, h, d];
  return [
    dashed(`${id}H`, o, [[P2, Q2], [P2, P]], { z: z - 1 }),
    poly(`${id}L`, o, [P, T, T2, P2], fill, { z }),
    poly(`${id}R`, o, [Q, Q2, T2, T], fill, { z }),
    poly(`${id}F`, o, [P, Q, T], front, { z }),
  ];
}

// Limas segi empat: alas w × d, puncak setinggi h di atas pusat alas
export function pyramid(id, o, w, h, d, { fill = 'ok-soft', z = 0 } = {}) {
  const P = [0, 0, 0];
  const Q = [w, 0, 0];
  const R = [w, 0, d];
  const S = [0, 0, d];
  const A = [w / 2, h, d / 2];
  return [
    dashed(`${id}H`, o, [[S, P], [S, R], [S, A]], { z: z - 1 }),
    poly(`${id}R`, o, [Q, R, A], fill, { z }),
    poly(`${id}F`, o, [P, Q, A], fill, { z }),
  ];
}
