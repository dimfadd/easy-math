// Uji generator soal: setiap generator dijalankan ratusan kali (dua bahasa) dan hasilnya diperiksa.
// Pakai: node tests/gen.mjs
import { GEN } from '../web/content/gen/index.js';
import { LESSONS } from '../web/content/index.js';

const N = 400;
let fails = 0;
let made = 0;
const fail = (id, k, msg, q) => {
  fails++;
  if (fails < 40) console.log(`GAGAL ${id} gen${k}: ${msg}\n   ${JSON.stringify(q).slice(0, 300)}`);
};
let seed = 12345;
const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const norm = (s) => String(s).replace(/\s+/g, '');

for (const [id, gens] of Object.entries(GEN)) {
  if (!LESSONS.get(id)) fail(id, '-', 'materi tidak ada di katalog', {});
  gens.forEach((g, k) => {
    const sigs = new Set();
    for (const lang of ['id', 'en']) {
      for (let i = 0; i < N; i++) {
        const q = g(rnd, lang);
        made++;
        if (!q.q || /undefined|NaN|null/.test(JSON.stringify(q))) fail(id, k, 'teks kosong / undefined / NaN', q);
        if (lang === 'id' && /—/.test(JSON.stringify(q))) fail(id, k, 'ada em dash', q);
        if (q.fig) {
          const ids = q.fig.map((e) => e.id);
          if (new Set(ids).size !== ids.length) fail(id, k, 'id gambar ganda', q);
          for (const e of q.fig) if ([e.x, e.y].some((v) => typeof v === 'number' && (v < -20 || v > 420))) fail(id, k, 'gambar keluar panggung', e);
        }
        if (q.type === 'num') {
          if (!q.ans || !q.ans.length) fail(id, k, 'tanpa kunci', q);
          const a = Number(q.ans[0]);
          if (!Number.isFinite(a) || a < 0) fail(id, k, 'kunci bukan bilangan cacah', q);
          for (const w of Object.keys(q.wrong || {})) if (norm(w) === norm(q.ans[0])) fail(id, k, 'jawaban keliru sama dengan kunci', q);
        } else {
          const ok = (q.options || []).filter((o) => o.ok);
          if (ok.length !== 1) fail(id, k, `pilihan benar = ${ok.length}`, q);
          const ts = q.options.map((o) => o.t);
          if (new Set(ts).size !== ts.length) fail(id, k, 'pilihan kembar', q);
          if (q.options.some((o) => !o.ok && !o.why)) fail(id, k, 'pilihan keliru tanpa penjelasan', q);
        }
        if (!q.steps || !q.steps.length) fail(id, k, 'tanpa pembahasan', q);
        sigs.add(q.q + JSON.stringify(q.ans || q.options?.map((o) => o.t)) + JSON.stringify(q.fig || ''));
      }
    }
    if (sigs.size < 6) fail(id, k, `variasi terlalu sedikit (${sigs.size})`, {});
  });
}
console.log(`${Object.keys(GEN).length} materi bergenerator, ${made} soal dibuat dan diperiksa.`);
if (fails) {
  console.log(`${fails} masalah.`);
  process.exitCode = 1;
} else console.log('Semua generator lolos.');
