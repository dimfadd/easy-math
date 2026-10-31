// Mesin latihan: menyusun satu sesi soal dari bank soal tulisan tangan + generator soal acak.
//
// Patokan jumlah soal (lihat docs/arah-produk.md bagian 11):
//   - satu sesi latihan: SD kelas 1–2 = 6 soal, SD kelas 3–6 = 8 soal, SMP/SMA = 10 soal (±5–12 menit);
//   - uji bab: SD = 15 soal, SMP/SMA = 20 soal;
//   - "Dikuasai": minimal 8 benar dari 10 jawaban terakhir di materi itu.
// Soal tulisan tangan yang paling lama tidak muncul didahulukan; sisanya diisi generator,
// jadi "Latihan lagi" selalu berisi soal baru.
import { kelasOf } from '../content/index.js';
import { GEN } from '../content/gen/index.js';
import { shuffle } from './quiz.js';
import { store } from './store.js';

export function sessionSize(kelas) {
  const k = kelasOf(kelas);
  if (!k) return 8;
  if (k.jenjang !== 'SD') return 10;
  return +k.no <= 2 ? 6 : 8;
}
export const ujiSize = (kelas) => (kelasOf(kelas)?.jenjang === 'SD' ? 15 : 20);

export const MASTERY = { window: 10, need: 8 };
export function mastery(id) {
  const r = store.recent(id);
  const last = r.slice(-MASTERY.window);
  const ok = last.filter(Boolean).length;
  return { n: last.length, ok, mastered: last.length >= MASTERY.need && ok >= MASTERY.need };
}

// Generator bisa memakai angka acak yang bisa diulang (untuk uji otomatis)
export function rng(seed = Math.random() * 1e9) {
  let s = Math.floor(seed) % 2147483647 || 1;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

export const hasGen = (id) => !!(GEN[id] && GEN[id].length);
export const genCount = (id) => (GEN[id] || []).length;

// Satu soal dari generator, dengan kunci jenis soal (dipakai analisis "soal yang sering salah")
export function genQuestion(id, k, rnd, lang) {
  const g = GEN[id][k];
  const q = g(rnd, lang);
  return { ...q, key: `${id}~g${k}`, gen: true };
}

// Susun satu sesi: handwritten = soal bank yang sudah dilokalkan (array), id = id materi
export function buildSession(id, handwritten, n, { lang = 'id', rnd = Math.random } = {}) {
  const hand = handwritten.map((q, i) => ({ ...q, key: `${id}#${i}` }));
  const gens = GEN[id] || [];
  if (!gens.length) return shuffle(hand, rnd).slice(0, n);
  // dahulukan soal tulisan tangan yang paling lama tidak muncul
  const seen = store.seenAt(id);
  const order = shuffle(hand, rnd).sort((a, b) => (seen[a.key] || 0) - (seen[b.key] || 0));
  const takeHand = Math.min(order.length, Math.ceil(n * 0.4));
  const out = order.slice(0, takeHand);
  const texts = new Set(out.map((q) => q.q));
  let k = Math.floor(rnd() * gens.length);
  let guard = 0;
  while (out.length < n && guard++ < n * 30) {
    const q = genQuestion(id, k % gens.length, rnd, lang);
    k++;
    const sig = q.q + JSON.stringify(q.ans || q.options?.map((o) => o.t) || '');
    if (texts.has(sig)) continue;
    texts.add(sig);
    out.push(q);
  }
  return shuffle(out, rnd);
}
