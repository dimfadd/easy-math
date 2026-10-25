// Kelas 6 · Bab 4: Peluang
import { T, box, ln } from '../helpers.js';

// ---------- 4.1 Menyusun dan memilih ----------
const SHIRTS = [['merah', 'neg'], ['biru', 'pos'], ['kuning', 'acc']];
const PANTS = [['hitam', 'ink'], ['putih', 'paper']];
// Diagram pohon: 3 baju (kiri) → 2 celana tiap baju
const tree = (upto = 3, withPants = true) => {
  const els = [];
  SHIRTS.slice(0, upto).forEach(([n, c], i) => {
    const y = 60 + i * 90;
    els.push(box(`s${i}`, 90, y, 80, 30, { fill: c, label: n, lsize: 14, lc: 'onfill' }));
    if (withPants)
      PANTS.forEach(([pn, pc], j) => {
        const yy = y - 20 + j * 40;
        els.push(ln(`l${i}${j}`, 130, y, 210, yy, { sw: 2, c: 'mut' }), box(`p${i}${j}`, 250, yy, 80, 28, { fill: pc, label: pn, lsize: 13, lc: pc === 'ink' ? 'onfill' : 'ink' }));
      });
  });
  return els;
};

const l1 = {
  id: 'k6b4-1',
  title: 'Menyusun dan Memilih',
  hook: 'Diagram pohon membantu mendaftar semua kemungkinan tanpa ada yang terlewat. 3 baju dan 2 celana menghasilkan 3 × 2 = 6 pasangan.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Rani punya 3 baju dan 2 celana. Berapa banyak pasangan baju dan celana yang bisa dipakai?',
          add: tree(3, false),
          ask: {
            options: [
              { t: '6', ok: true, why: 'Setiap baju bisa dipasangkan dengan 2 celana. 3 × 2 = 6.' },
              { t: '5', why: '3 + 2 = 5. Setiap baju punya 2 pilihan celana, jadi dikali.' },
              { t: '3', why: 'Setiap baju bisa dipakai dengan celana hitam atau putih.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Diagram pohon',
      steps: [
        {
          say: 'Baju merah bisa dipasangkan dengan celana hitam atau putih. Itu 2 pasangan.',
          clear: true,
          add: tree(1),
        },
        {
          say: 'Baju biru juga 2 pasangan, baju kuning juga 2 pasangan.',
          add: tree(3).filter((e) => !/^(s0|l0|p0)/.test(e.id)),
        },
        {
          say: 'Hitung ujung cabangnya: 6 pasangan. Ini sama dengan 3 kali 2.',
          add: [T('a', '3 × 2 = {g:6}', 352, 150, { size: 22 })],
        },
      ],
    },
    {
      title: 'Menyusun urutan',
      steps: [
        {
          say: 'Tiga anak, A, B, dan C, berbaris. Ada berapa urutan? Tempat pertama 3 pilihan, tempat kedua 2, tempat ketiga 1.',
          clear: true,
          add: [T('q', '3 × 2 × 1 = {g:6}', 200, 70, { size: 30 })],
        },
        {
          say: 'Keenam urutannya: ABC, ACB, BAC, BCA, CAB, CBA.',
          add: ['ABC', 'ACB', 'BAC', 'BCA', 'CAB', 'CBA'].map((w, i) => box(`o${i}`, 75 + (i % 3) * 125, 150 + Math.floor(i / 3) * 55, 90, 38, { label: w, lsize: 18, fill: 'pos-soft' })),
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Kantin menjual 4 jenis makanan dan 3 jenis minuman. Ada berapa pasangan satu makanan dan satu minuman?',
          clear: true,
          add: [T('q', '4 makanan, 3 minuman', 200, 110, { size: 26, c: 'pos' })],
          ask: {
            options: [
              { t: '12', ok: true, why: 'Setiap makanan punya 3 pilihan minuman. 4 × 3 = 12.' },
              { t: '7', why: '4 + 3 = 7. Pasangan dihitung dengan perkalian.' },
              { t: '4', why: 'Setiap makanan bisa dipasangkan dengan 3 minuman.' },
            ],
          },
        },
        {
          say: '4 kali 3 sama dengan 12 pasangan.',
          add: [T('a', '4 × 3 = {g:12}', 200, 180, { size: 30 })],
        },
      ],
    },
  ],
  quiz: [
    { type: 'num', q: '2 topi dan 5 kaus. Banyak pasangan topi dan kaus …', ans: ['10'], wrong: { '7': 'Pasangan dihitung dengan perkalian.' }, steps: ['2 × 5 = 10.'] },
    { type: 'num', q: 'Banyak cara 4 anak berbaris …', ans: ['24'], wrong: { '4': '4 × 3 × 2 × 1.', '10': 'Kalikan, jangan jumlahkan.' }, steps: ['4 × 3 × 2 × 1 = 24.'] },
    { type: 'num', q: 'Bilangan dua angka berbeda yang disusun dari angka 1, 2, 3. Banyaknya …', ans: ['6'], steps: ['Puluhan 3 pilihan, satuan 2 pilihan.', '3 × 2 = 6.'] },
    { type: 'num', q: '3 jalan dari A ke B dan 2 jalan dari B ke C. Banyak rute dari A ke C lewat B …', ans: ['6'], wrong: { '5': 'Setiap jalan A–B bisa disambung 2 jalan B–C.' }, steps: ['3 × 2 = 6.'] },
    { type: 'num', q: '2 jenis roti dan 2 jenis selai. Banyak pasangan …', ans: ['4'], steps: ['2 × 2 = 4.'] },
  ],
};

// ---------- 4.2 Peluang sederhana ----------
const SP = (p, k, colors) => colors.map((c, i) => ({ id: `${p}${i}`, t: 'circle', x: 110 + (i % 5) * 45, y: 80 + Math.floor(i / 5) * 48, r: 17, fill: c, stroke: 'ink', sw: 1.5 }));
const BAG = ['neg', 'neg', 'neg', 'pos', 'pos', 'pos', 'pos', 'pos', 'ok', 'ok'];

const l2 = {
  id: 'k6b4-2',
  title: 'Peluang',
  hook: 'Peluang = banyak hasil yang diharapkan dibagi banyak semua hasil. Nilainya dari 0 (mustahil) sampai 1 (pasti).',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Dalam kantong ada 10 kelereng: 3 merah, 5 biru, 2 hijau. Diambil satu tanpa melihat. Warna apa yang paling mungkin terambil?',
          add: SP('k', 10, BAG),
          ask: {
            options: [
              { t: 'biru', ok: true, why: 'Biru paling banyak, 5 dari 10.' },
              { t: 'merah', why: 'Merah 3, lebih sedikit dari biru.' },
              { t: 'sama saja', why: 'Banyaknya berbeda, jadi peluangnya berbeda.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Menghitung peluang',
      steps: [
        {
          say: 'Semua hasil ada 10. Hasil yang diharapkan, biru, ada 5. Peluang biru 5/10, yaitu 1/2.',
          clear: true,
          add: [...SP('k', 10, BAG), T('a', 'P(biru) = 5/10 = {g:1/2}', 200, 210, { size: 24 })],
          hl: ['k3', 'k4', 'k5', 'k6', 'k7'],
        },
        {
          say: 'Peluang merah: 3 dari 10, yaitu 3/10. Peluang hijau: 2/10, yaitu 1/5.',
          add: [T('b', 'P(merah) = 3/10   P(hijau) = 2/10', 200, 255, { size: 17, c: 'mut' })],
          hl: ['k0', 'k1', 'k2'],
        },
      ],
    },
    {
      title: 'Mustahil dan pasti',
      steps: [
        {
          say: 'Peluang terambil kelereng kuning? Tidak ada kuning: 0/10 = 0. Mustahil.',
          clear: true,
          add: [ln('nl', 50, 150, 350, 150, { sw: 3, c: 'ink' }), T('z', '0', 50, 180, { size: 18 }), T('h', '1/2', 200, 180, { size: 18 }), T('o', '1', 350, 180, { size: 18 }), T('zl', 'mustahil', 60, 120, { size: 15, c: 'neg' })],
        },
        {
          say: 'Peluang terambil kelereng, apa pun warnanya: 10/10 = 1. Pasti. Peluang biru 1/2 ada di tengah.',
          add: [T('ol', 'pasti', 340, 120, { size: 15, c: 'ok' }), T('hb', 'biru', 200, 120, { size: 15, c: 'pos' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Sebuah dadu dilempar. Berapa peluang muncul angka 6?',
          clear: true,
          add: [1, 2, 3, 4, 5, 6].map((v, i) => box(`d${i}`, 70 + i * 52, 110, 42, 42, { label: String(v), lsize: 20, fill: v === 6 ? 'ok-soft' : 'paper' })),
          ask: {
            options: [
              { t: '1/6', ok: true, why: 'Ada 6 hasil, satu di antaranya angka 6.' },
              { t: '6', why: 'Peluang tidak lebih dari 1.' },
              { t: '1/2', why: 'Hanya 1 dari 6 sisi yang bertuliskan 6.' },
            ],
          },
        },
        {
          say: 'Semua hasil 6, yang diharapkan 1. Peluangnya 1/6.',
          add: [T('a', 'P(6) = {g:1/6}', 200, 190, { size: 28 })],
        },
      ],
    },
  ],
  quiz: [
    { type: 'num', q: 'Koin dilempar. Peluang muncul gambar …', ans: ['1/2', '0.5'], wrong: { '2': 'Peluang tidak lebih dari 1.' }, steps: ['1 dari 2 sisi.', '= 1/2.'] },
    { type: 'num', q: 'Dadu dilempar. Peluang muncul angka genap …', ans: ['1/2', '3/6'], wrong: { '1/6': 'Angka genap ada 3: 2, 4, 6.' }, steps: ['Genap: 2, 4, 6 → 3.', '3/6 = 1/2.'] },
    { type: 'num', q: '4 merah dan 6 putih. Peluang terambil merah …', ans: ['2/5', '4/10'], wrong: { '4/6': 'Bagi dengan semua bola, 10.' }, steps: ['4/10 = 2/5.'] },
    { q: 'Peluang matahari terbit dari timur besok adalah …', options: [{ t: '1', ok: true }, { t: '0', why: '0 berarti mustahil.' }, { t: '1/2', why: 'Ini kejadian pasti.' }], steps: ['Pasti → 1.'] },
    { type: 'num', q: 'Dadu dilempar. Peluang muncul angka 7 …', ans: ['0'], wrong: { '1/6': 'Dadu tidak punya angka 7.' }, steps: ['Mustahil → 0.'] },
  ],
};

export default {
  id: 'k6b4',
  no: 4,
  title: 'Peluang',
  desc: 'Mendaftar kemungkinan dengan diagram pohon, menghitung banyak susunan, serta peluang sebagai bilangan dari 0 sampai 1.',
  lessons: [l1, l2],
  extra: [
    { type: 'num', q: '3 baju dan 4 celana. Banyak pasangan …', ans: ['12'], steps: ['3 × 4 = 12.'] },
    { type: 'num', q: 'Dadu dilempar. Peluang muncul angka kurang dari 3 …', ans: ['1/3', '2/6'], steps: ['Angka 1, 2 → 2/6.', '= 1/3.'] },
    { type: 'num', q: 'Huruf pada kata BUKU. Peluang terambil huruf U …', ans: ['1/2', '2/4'], steps: ['U ada 2 dari 4 huruf.', '= 1/2.'] },
  ],
};
