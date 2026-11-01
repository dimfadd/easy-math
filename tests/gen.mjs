// Uji generator soal: setiap generator dijalankan ratusan kali (dua bahasa) dan hasilnya diperiksa.
// Pakai: node tests/gen.mjs   (hanya sebagian: GEN_ONLY=k2,k3 node tests/gen.mjs)
//
// Uji kunci jawaban: setiap generator (selain Kelas 1) wajib punya fungsi g.solve(meta) yang menghitung
// jawaban dari angka mentah soal (q.meta) dengan cara terpisah dari kode pembuat soal.
// Isian: hasil solve harus bernilai sama dengan q.ans[0]. Pilihan ganda: hasil solve = teks pilihan yang benar.
import { GEN } from '../web/content/gen/index.js';
import { LESSONS } from '../web/content/index.js';
import { toNumber } from '../web/js/quiz.js';

const ONLY = (process.env.GEN_ONLY || '').split(',').filter(Boolean);
const NO_ORACLE = /^k1b/; // Kelas 1 (pilot) dicek manual

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

const same = (a, b) => {
  const x = toNumber(a);
  const y = toNumber(b);
  return x !== null && y !== null ? Math.abs(x - y) < 1e-6 : norm(a) === norm(b);
};
let solved = 0;

for (const [id, gens] of Object.entries(GEN)) {
  if (ONLY.length && !ONLY.some((p) => id.startsWith(p + 'b') || id.startsWith(p + '-'))) continue;
  if (!LESSONS.get(id)) fail(id, '-', 'materi tidak ada di katalog', {});
  gens.forEach((g, k) => {
    const oracle = !NO_ORACLE.test(id);
    if (oracle && typeof g.solve !== 'function') fail(id, k, 'tanpa g.solve (uji kunci jawaban)', {});
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
          if (NO_ORACLE.test(id) ? !Number.isFinite(a) || a < 0 : toNumber(q.ans[0]) === null) fail(id, k, 'kunci tidak terbaca sebagai bilangan', q);
          if (/\./.test(q.ans[0])) fail(id, k, 'kunci memakai titik; pakai D() agar desimal ditulis dengan koma', q);
          for (const w of Object.keys(q.wrong || {})) if (same(w, q.ans[0])) fail(id, k, 'jawaban keliru sama nilainya dengan kunci', q);
        } else {
          const ok = (q.options || []).filter((o) => o.ok);
          if (ok.length !== 1) fail(id, k, `pilihan benar = ${ok.length}`, q);
          const ts = q.options.map((o) => o.t);
          if (new Set(ts).size !== ts.length) fail(id, k, 'pilihan kembar', q);
          const okT = ok[0]?.t;
          if (okT !== undefined && q.options.some((o) => !o.ok && toNumber(o.t) !== null && same(o.t, okT))) fail(id, k, 'pengecoh bernilai sama dengan kunci', q);
          if (q.options.some((o) => !o.ok && !o.why)) fail(id, k, 'pilihan keliru tanpa penjelasan', q);
        }
        if (!q.steps || !q.steps.length) fail(id, k, 'tanpa pembahasan', q);
        if (oracle && typeof g.solve === 'function') {
          if (!q.meta) fail(id, k, 'tanpa q.meta untuk g.solve', q);
          else {
            let want;
            try {
              want = g.solve(q.meta, lang);
            } catch (e) {
              fail(id, k, 'g.solve error: ' + e.message, q);
            }
            if (want !== undefined) {
              solved++;
              const got = q.type === 'num' ? q.ans[0] : (q.options || []).find((o) => o.ok)?.t;
              if (!(q.type === 'num' ? same(want, got) : norm(want) === norm(got))) fail(id, k, `kunci ${got} tidak cocok dengan hitungan solve ${want}`, q);
            }
          }
        }
        sigs.add(q.q + JSON.stringify(q.ans || q.options?.map((o) => o.t)) + JSON.stringify(q.fig || ''));
      }
    }
    if (sigs.size < 6) fail(id, k, `variasi terlalu sedikit (${sigs.size})`, {});
  });
}
console.log(`${Object.keys(GEN).length} materi bergenerator, ${made} soal dibuat dan diperiksa, ${solved} kunci dicocokkan dengan solve.`);
if (fails) {
  console.log(`${fails} masalah.`);
  process.exitCode = 1;
} else console.log('Semua generator lolos.');
