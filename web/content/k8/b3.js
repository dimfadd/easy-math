// Kelas 8 · Bab 3: Relasi dan Fungsi
import { T, box, ln, dot, range, table } from '../helpers.js';
import { plane } from './plot.js';

// Diagram panah: dua oval dan anggota-anggotanya
const AX = 105;
const BX = 295;
const oval = (id, x, o = {}) => ({ id, t: 'path', x, y: 160, d: 'M-62,0 A62,108 0 1 0 62,0 A62,108 0 1 0 -62,0 Z', fill: 'paper', stroke: 'ink', sw: 2, z: -2, ...o });
const ys = (n) => range(0, n).map((i) => 160 + (i - (n - 1) / 2) * 42);
function arrowDiagram(A, B, { la = 'A', lb = 'B', mid = '' } = {}) {
  const ya = ys(A.length);
  const yb = ys(B.length);
  return {
    els: [
      oval('ovA', AX),
      oval('ovB', BX),
      T('hA', la, AX, 36, { size: 20, font: 'serif', w: 600 }),
      T('hB', lb, BX, 36, { size: 20, font: 'serif', w: 600 }),
      ...(mid ? [T('hM', mid, 200, 36, { size: 15, c: 'acc' })] : []),
      ...A.map((a, i) => T(`a${i}`, a, AX, ya[i], { size: 16 })),
      ...B.map((b, i) => T(`b${i}`, b, BX, yb[i], { size: 16 })),
    ],
    arrow: (i, j, o = {}) => ln(`r${i}_${j}`, AX + 38, ya[i], BX - 38, yb[j], { arrow: 'end', sw: 2, c: 'acc', ...o }),
  };
}

// ---------- 3.1 Relasi ----------
const KIDS = ['Ani', 'Budi', 'Cici', 'Dodi'];
const FOOD = ['bakso', 'mie', 'sate'];
const LIKES = [
  [0, 0],
  [0, 2],
  [1, 1],
  [2, 0],
  [3, 2],
];
const D1 = arrowDiagram(KIDS, FOOD, { la: 'anak', lb: 'makanan', mid: 'suka makan' });

const l1 = {
  id: 'k8b3-1',
  title: 'Relasi',
  hook: 'Relasi adalah aturan yang memasangkan anggota dua kelompok. Bisa digambar dengan panah, pasangan, atau titik.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Panah-panah ini menghubungkan bilangan di kiri dengan bilangan di kanan. Aturan apa yang cocok?',
          add: [...arrowDiagram(['1', '2', '3'], ['2', '4', '6'], {}).els, ...[0, 1, 2].map((i) => arrowDiagram(['1', '2', '3'], ['2', '4', '6']).arrow(i, i)), T('q', 'aturannya: … ?', 200, 285, { size: 18, c: 'mut' })],
          ask: {
            options: [
              { t: 'setengah dari', ok: true, why: '1 setengah dari 2, 2 setengah dari 4, 3 setengah dari 6.' },
              { t: 'dua kali dari', why: 'Arah panahnya dari kiri ke kanan: 1 adalah setengah dari 2, bukan dua kali 2.' },
              { t: 'kurang satu dari', why: '2 bukan kurang satu dari 4. Cek semua panah.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Diagram panah',
      steps: [
        {
          say: 'Empat anak dan tiga makanan. Kita pasangkan dengan aturan: suka makan.',
          clear: true,
          add: D1.els,
        },
        { say: 'Ani suka bakso dan juga sate.', add: [D1.arrow(0, 0), D1.arrow(0, 2)] },
        { say: 'Budi suka mie. Cici suka bakso. Dodi suka sate.', add: [D1.arrow(1, 1), D1.arrow(2, 0), D1.arrow(3, 2)] },
        {
          say: 'Aturan yang memasangkan anggota kelompok kiri dengan kelompok kanan disebut relasi. Gambar seperti ini disebut diagram panah.',
          add: [T('n', 'relasi "suka makan" dalam diagram panah', 200, 285, { size: 15, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Pasangan berurutan',
      steps: [
        {
          say: 'Relasi yang sama bisa ditulis sebagai pasangan berurutan. Setiap panah menjadi satu pasangan. Anggota kiri ditulis lebih dulu.',
          clear: true,
          add: LIKES.map(([i, j], k) => T(`p${k}`, `(${KIDS[i]}, ${FOOD[j]})`, 200, 60 + k * 36, { size: 20 })),
        },
        {
          say: 'Urutannya penting. Ani dulu, baru bakso. Kalau ditukar, artinya berubah.',
          add: [T('n', 'urutan: (anak, makanan)', 200, 260, { size: 16, c: 'acc' })],
          pulse: ['p0'],
        },
      ],
    },
    {
      title: 'Diagram Cartesius',
      steps: [
        {
          say: 'Cara ketiga: diagram Cartesius. Anak diletakkan di sumbu mendatar, makanan di sumbu tegak.',
          clear: true,
          add: [
            ln('ax', 110, 230, 360, 230, { sw: 2, draw: false }),
            ln('ay', 110, 230, 110, 40, { sw: 2, draw: false }),
            ...KIDS.map((k, i) => T(`kx${i}`, k, 160 + i * 55, 248, { size: 14 })),
            ...FOOD.map((f, j) => T(`fy${j}`, f, 75, 180 - j * 55, { size: 14 })),
            { id: 'gr', t: 'path', x: 0, y: 0, d: KIDS.map((_, i) => `M${160 + i * 55},230 V60`).join(' ') + ' ' + FOOD.map((_, j) => `M110,${180 - j * 55} H360`).join(' '), stroke: 'mut', sw: 0.6, dash: '3 4', z: -3 },
          ],
        },
        {
          say: 'Setiap pasangan menjadi satu titik. Ani dan bakso, Ani dan sate, dan seterusnya.',
          add: LIKES.map(([i, j], k) => dot(`d${k}`, 160 + i * 55, 180 - j * 55, 'acc')),
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. A berisi 2, 3, 4. B berisi 4, 6, 9, 12. Relasinya: faktor dari. Pasangan mana yang benar?',
          clear: true,
          add: [T('q', 'A = {2, 3, 4}, B = {4, 6, 9, 12}', 200, 100, { size: 22 }), T('q2', 'relasi: "faktor dari"', 200, 150, { size: 20, c: 'acc' })],
          ask: {
            options: [
              { t: '(3, 9)', ok: true, why: '3 adalah faktor dari 9.' },
              { t: '(9, 3)', why: 'Anggota A ditulis dulu. 9 tidak ada di A.' },
              { t: '(4, 6)', why: '4 bukan faktor dari 6 (6 ÷ 4 tidak habis).' },
              { t: '(2, 9)', why: '9 ÷ 2 tidak habis.' },
            ],
          },
        },
        {
          say: 'Semua pasangannya: 2 dengan 4, 6, dan 12. 3 dengan 6, 9, dan 12. 4 dengan 4 dan 12.',
          clear: true,
          add: (() => {
            const D = arrowDiagram(['2', '3', '4'], ['4', '6', '9', '12'], { mid: 'faktor dari' });
            return [...D.els, D.arrow(0, 0), D.arrow(0, 1), D.arrow(0, 3), D.arrow(1, 1), D.arrow(1, 2), D.arrow(1, 3), D.arrow(2, 0), D.arrow(2, 3)];
          })(),
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Relasi dari A = {1, 2, 3} ke B = {3, 4, 5} berupa {(1, 3), (2, 4), (3, 5)}. Relasi yang tepat adalah …',
      options: [
        { t: 'dua kurangnya dari', ok: true },
        { t: 'dua lebihnya dari', why: '1 adalah 2 kurangnya dari 3, bukan 2 lebihnya.' },
        { t: 'setengah dari', why: '1 bukan setengah dari 3.' },
        { t: 'faktor dari', why: '1 faktor dari 3 dan 2 faktor dari 4, tapi 3 bukan faktor dari 5.' },
      ],
      steps: ['1 + 2 = 3, 2 + 2 = 4, 3 + 2 = 5.', 'Anggota A selalu 2 kurangnya dari pasangannya.'],
    },
    {
      q: 'Relasi "kuadrat dari" dari A = {1, 2, 3} ke B = {1, 4, 6, 9}. Himpunan pasangan berurutannya adalah …',
      options: [
        { t: '{(1, 1), (2, 4), (3, 9)}', ok: true },
        { t: '{(1, 1), (4, 2), (9, 3)}', why: 'Anggota A ditulis lebih dulu.' },
        { t: '{(1, 1), (2, 4), (3, 6)}', why: '3² = 9, bukan 6.' },
        { t: '{(1, 1), (2, 4), (3, 9), (3, 6)}', why: '3² bukan 6.' },
      ],
      steps: ['Pasangkan x di A dengan x² di B.', '1 → 1, 2 → 4, 3 → 9.'],
    },
    {
      type: 'num',
      q: 'A = {2, 3, 5} dan B = {4, 6, 10, 15}. Relasi "faktor dari" dari A ke B. Banyak pasangan berurutannya adalah …',
      ans: ['7'],
      wrong: { '3': 'Satu anggota A bisa punya lebih dari satu pasangan. Misalnya 2 faktor dari 4, 6, dan 10.', '6': 'Hitung lagi: 2 → 4, 6, 10; 3 → 6, 15; 5 → 10, 15.' },
      steps: ['2 → 4, 6, 10 (3 pasang).', '3 → 6, 15 (2 pasang).', '5 → 10, 15 (2 pasang).', 'Total: 3 + 2 + 2 = 7.'],
    },
    {
      q: 'Pada diagram Cartesius sebuah relasi, titik-titiknya adalah (1, 2), (2, 4), (3, 6). Relasinya adalah …',
      options: [
        { t: 'setengah dari', ok: true },
        { t: 'dua kali dari', why: 'Anggota pertama (1) setengah dari anggota kedua (2).' },
        { t: 'satu kurangnya dari', why: '2 bukan satu kurangnya dari 4.' },
        { t: 'sama dengan', why: '1 tidak sama dengan 2.' },
      ],
      steps: ['1 = ½ × 2, 2 = ½ × 4, 3 = ½ × 6.', 'Relasinya "setengah dari".'],
    },
    {
      q: 'Cara menyatakan relasi yang menggunakan titik-titik pada bidang dengan dua sumbu disebut …',
      options: [
        { t: 'diagram Cartesius', ok: true },
        { t: 'diagram panah', why: 'Diagram panah memakai oval dan panah.' },
        { t: 'himpunan pasangan berurutan', why: 'Itu berupa daftar (a, b), bukan titik.' },
        { t: 'diagram batang', why: 'Diagram batang dipakai untuk data, bukan relasi.' },
      ],
      steps: ['Tiga cara: diagram panah, pasangan berurutan, diagram Cartesius.', 'Titik pada dua sumbu = diagram Cartesius.'],
    },
  ],
};

// ---------- 3.2 Fungsi ----------
const PEOPLE = ['Rina', 'Sari', 'Tono', 'Umar'];
const BLOOD = ['A', 'B', 'AB', 'O'];
const D2 = arrowDiagram(PEOPLE, BLOOD, { la: 'siswa', lb: 'golongan darah' });

const l2 = {
  id: 'k8b3-2',
  title: 'Fungsi',
  hook: 'Fungsi adalah relasi yang istimewa: setiap anggota di kiri punya tepat satu pasangan di kanan.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Setiap siswa dipasangkan dengan golongan darahnya. Apakah ada siswa yang bisa punya dua golongan darah?',
          add: [...D2.els, D2.arrow(0, 0), D2.arrow(1, 3), D2.arrow(2, 0), D2.arrow(3, 1)],
          ask: {
            options: [
              { t: 'Tidak, setiap orang tepat satu', ok: true, why: 'Benar. Relasi seperti ini disebut fungsi.' },
              { t: 'Ya, bisa dua', why: 'Setiap orang hanya punya satu golongan darah.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Syarat fungsi',
      steps: [
        {
          say: 'Perhatikan anggota kiri. Rina, Sari, Tono, dan Umar masing-masing punya tepat satu panah keluar.',
          pulse: ['a0', 'a1', 'a2', 'a3'],
        },
        {
          say: 'Relasi seperti ini disebut fungsi atau pemetaan. Syaratnya: setiap anggota kiri punya tepat satu pasangan.',
          add: [box('rule', 200, 282, 340, 32, { fill: 'acc-soft', r: 8, label: 'setiap anggota kiri: tepat satu panah', lsize: 15 })],
        },
        {
          say: 'Boleh ada dua orang yang menunjuk golongan yang sama, seperti Rina dan Tono. Boleh juga ada golongan yang tidak ditunjuk, seperti AB.',
          hl: ['r0_0', 'r2_0', 'b2'],
        },
      ],
    },
    {
      title: 'Bukan fungsi',
      steps: [
        {
          say: 'Sekarang relasi suka makan tadi. Ani punya dua panah. Jadi ini bukan fungsi.',
          clear: true,
          add: [...D1.els, ...LIKES.map(([i, j]) => D1.arrow(i, j)), T('x', 'Ani: 2 panah → {n:bukan fungsi}', 200, 285, { size: 16 })],
          hl: ['r0_0', 'r0_2'],
        },
        {
          say: 'Kalau ada anggota kiri yang tidak punya panah sama sekali, juga bukan fungsi. Semua anggota kiri harus punya pasangan.',
          set: { r3_2: { o: 0 }, x: { text: 'Dodi: 0 panah → {n:bukan fungsi}' } },
          hl: ['a3'],
        },
      ],
    },
    {
      title: 'Domain, kodomain, range',
      steps: [
        {
          say: 'Kembali ke golongan darah. Kelompok kiri disebut domain atau daerah asal.',
          clear: true,
          add: [...D2.els, D2.arrow(0, 0), D2.arrow(1, 3), D2.arrow(2, 0), D2.arrow(3, 1), T('dn', 'domain', AX, 285, { size: 16, c: 'pos' })],
          set: { ovA: { fill: 'pos-soft' } },
        },
        {
          say: 'Kelompok kanan disebut kodomain atau daerah kawan.',
          set: { ovB: { fill: 'acc-soft' } },
          add: [T('kn', 'kodomain', BX, 285, { size: 16, c: 'acc' })],
        },
        {
          say: 'Anggota kodomain yang benar-benar ditunjuk panah disebut range atau daerah hasil. Di sini rangenya A, B, dan O. AB tidak termasuk.',
          hl: ['b0', 'b1', 'b3'],
          add: [T('rn', 'range = {A, B, O}', 200, 36, { size: 16, c: 'ok' })],
          del: ['hA', 'hB'],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Manakah yang merupakan fungsi?',
          clear: true,
          add: [T('o1', 'P: {(1, a), (2, a), (3, b)}', 200, 90, { size: 20 }), T('o2', 'Q: {(1, a), (1, b), (2, c)}', 200, 140, { size: 20 }), T('o3', 'R: {(1, a), (2, b)}, dengan domain {1, 2, 3}', 200, 190, { size: 17 })],
          ask: {
            options: [
              { t: 'P', ok: true, why: '1, 2, dan 3 masing-masing punya tepat satu pasangan.' },
              { t: 'Q', why: '1 punya dua pasangan (a dan b), jadi bukan fungsi.' },
              { t: 'R', why: '3 tidak punya pasangan, jadi bukan fungsi.' },
            ],
          },
        },
        {
          say: 'Di P, setiap anggota domain muncul tepat satu kali di depan. Boleh 1 dan 2 sama-sama ke a.',
          clear: true,
          add: (() => {
            const D = arrowDiagram(['1', '2', '3'], ['a', 'b'], { mid: 'P' });
            return [...D.els, D.arrow(0, 0), D.arrow(1, 0), D.arrow(2, 1), T('ok', 'P adalah {g:fungsi}', 200, 285, { size: 18 })];
          })(),
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Relasi dari himpunan siswa ke himpunan tanggal lahir merupakan fungsi karena …',
      options: [
        { t: 'setiap siswa lahir pada tepat satu tanggal', ok: true },
        { t: 'setiap tanggal punya satu siswa', why: 'Syarat fungsi dilihat dari anggota domain (siswa), bukan kodomain.' },
        { t: 'banyak siswa sama dengan banyak tanggal', why: 'Banyaknya tidak harus sama.' },
        { t: 'ada siswa yang lahir di tanggal yang sama', why: 'Itu boleh, tapi bukan alasan sebuah relasi disebut fungsi.' },
      ],
      steps: ['Fungsi: setiap anggota domain punya tepat satu pasangan.', 'Setiap siswa punya tepat satu tanggal lahir.'],
    },
    {
      q: 'Manakah himpunan pasangan berurutan yang merupakan fungsi dari A = {1, 2, 3} ke B = {p, q}?',
      options: [
        { t: '{(1, p), (2, p), (3, p)}', ok: true },
        { t: '{(1, p), (2, q)}', why: '3 tidak punya pasangan.' },
        { t: '{(1, p), (1, q), (2, p), (3, q)}', why: '1 punya dua pasangan.' },
        { t: '{(p, 1), (q, 2), (p, 3)}', why: 'Urutannya terbalik: anggota A harus di depan.' },
      ],
      steps: ['Cek setiap anggota A: 1, 2, 3 masing-masing muncul tepat sekali.', 'Semua boleh menunjuk p yang sama.'],
    },
    {
      q: 'Fungsi f dari A = {1, 2, 3, 4} ke B = {2, 4, 6, 8, 10} dengan aturan "setengah dari". Range fungsi tersebut adalah …',
      options: [
        { t: '{2, 4, 6, 8}', ok: true },
        { t: '{2, 4, 6, 8, 10}', why: 'Itu kodomain. 10 tidak ditunjuk panah mana pun.' },
        { t: '{1, 2, 3, 4}', why: 'Itu domain.' },
        { t: '{1, 2}', why: 'Range adalah anggota B yang ditunjuk.' },
      ],
      steps: ['1 → 2, 2 → 4, 3 → 6, 4 → 8.', 'Range = {2, 4, 6, 8}. 10 tidak ditunjuk.'],
    },
    {
      q: 'Pada sebuah fungsi, himpunan yang anggotanya semua punya tepat satu pasangan disebut …',
      options: [
        { t: 'domain', ok: true },
        { t: 'kodomain', why: 'Anggota kodomain boleh tidak punya pasangan atau punya banyak.' },
        { t: 'range', why: 'Range adalah bagian kodomain yang ditunjuk.' },
        { t: 'relasi', why: 'Relasi adalah aturannya.' },
      ],
      steps: ['Domain = daerah asal.', 'Setiap anggota domain harus punya tepat satu pasangan.'],
    },
    {
      type: 'num',
      q: 'Fungsi dari A = {a, b, c} ke B = {1, 2, 3, 4} berupa {(a, 2), (b, 2), (c, 4)}. Banyak anggota range-nya adalah …',
      ans: ['2'],
      wrong: { '3': '2 muncul dua kali, tapi dihitung sekali. Range = {2, 4}.', '4': 'Itu banyak anggota kodomain. Range hanya yang ditunjuk.' },
      steps: ['Anggota B yang ditunjuk: 2 dan 4.', 'Range = {2, 4}, ada 2 anggota.'],
    },
  ],
};

// ---------- 3.3 Rumus fungsi ----------
const MX = 200;
const ball = (id, x, v, o = {}) => ({ id, t: 'circle', x, y: 120, r: 20, fill: 'pos-soft', stroke: 'ink', sw: 2, label: String(v), lsize: 17, ...o });
const PL = { x: 70, y: 40, w: 280, h: 210, xmin: 0, xmax: 4, ymin: 0, ymax: 10, step: 1, every: 1 };

const l3 = {
  id: 'k8b3-3',
  title: 'Rumus Fungsi dan Grafiknya',
  hook: 'Fungsi seperti mesin: masukkan x, mesin mengolahnya dengan rumus, keluarlah f(x).',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Mesin ini mengubah 1 menjadi 3, 2 menjadi 5, dan 3 menjadi 7. Kalau dimasukkan 10, keluar berapa?',
          add: [box('m', MX, 120, 120, 80, { fill: 'mut-soft', r: 14, label: '?', lsize: 30 }), T('ex', '1 → 3,  2 → 5,  3 → 7', 200, 210, { size: 20 }), T('q', '10 → … ?', 200, 250, { size: 22, c: 'mut' })],
          ask: {
            options: [
              { t: '21', ok: true, why: 'Aturannya: kalikan 2, lalu tambah 1. 2 × 10 + 1 = 21.' },
              { t: '12', why: '10 + 2 = 12 hanya cocok kalau aturannya tambah 2. Cek: 1 + 2 = 3 cocok, tapi 2 + 2 = 4, bukan 5.' },
              { t: '19', why: '19 = 2 × 10 − 1. Cek dengan 1: 2 × 1 − 1 = 1, bukan 3.' },
              { t: '30', why: '3 × 10. Cek: 3 × 1 = 3 cocok, tapi 3 × 2 = 6, bukan 5.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Mesin fungsi',
      steps: [
        {
          say: 'Mesin ini memakai rumus f x sama dengan 2 x tambah 1. Masukkan 3.',
          clear: true,
          add: [box('m', MX, 120, 130, 80, { fill: 'acc-soft', r: 14, label: 'f(x) = 2x + 1', lsize: 17 }), ln('in', 60, 120, 130, 120, { arrow: 'end', sw: 2, c: 'mut', draw: false }), ln('out', 270, 120, 340, 120, { arrow: 'end', sw: 2, c: 'mut', draw: false }), ball('b', 45, 3)],
        },
        {
          say: 'Di dalam mesin: 2 kali 3 sama dengan 6, tambah 1 sama dengan 7.',
          set: { b: { x: MX, o: 0 } },
          add: [T('calc', '2 × 3 + 1 = 7', 200, 200, { size: 22 })],
        },
        {
          say: 'Keluar 7. Ditulis: f dari 3 sama dengan 7.',
          set: { b: { x: 355, o: 1, label: '7', fill: 'ok-soft' } },
          add: [T('r', 'f(3) = 7', 200, 245, { size: 28, c: 'ok' })],
        },
      ],
    },
    {
      title: 'Tabel fungsi',
      steps: [
        {
          say: 'Kita masukkan beberapa nilai x sekaligus, lalu catat hasilnya dalam tabel.',
          clear: true,
          add: [table('tb', 200, 90, [['x', '0', '1', '2', '3', '4'], ['f(x)', '', '', '', '', '']], { cw: [70, 50, 50, 50, 50, 50], rh: 40, size: 18, head: true })],
        },
        {
          say: 'f 0 sama dengan 1. f 1 sama dengan 3. f 2 sama dengan 5. f 3 sama dengan 7. f 4 sama dengan 9.',
          set: { tb: { rows: [['x', '0', '1', '2', '3', '4'], ['f(x)', '1', '3', '5', '7', '9']] } },
          add: [T('n', 'setiap x naik 1, f(x) naik 2', 200, 175, { size: 17, c: 'acc' })],
        },
      ],
    },
    {
      title: 'Grafik fungsi',
      steps: [
        {
          say: 'Setiap pasangan x dan f x bisa digambar sebagai titik pada bidang koordinat.',
          clear: true,
          add: plane('pl', PL).els,
        },
        ...[0, 1, 2, 3, 4].map((x) => ({
          say: x === 0 ? 'Titik 0 koma 1.' : x === 4 ? 'Dan 4 koma 9.' : `Titik ${x} koma ${2 * x + 1}.`,
          add: [dot(`p${x}`, ...plane('pl', PL).at(x, 2 * x + 1), 'acc')],
        })),
        {
          say: 'Titik-titiknya berada pada satu garis lurus. Fungsi seperti ini disebut fungsi linear.',
          add: [ln('gl', ...plane('pl', PL).at(0, 1), ...plane('pl', PL).at(4, 9), { sw: 2.5, c: 'pos', z: -1 }), T('lab', 'f(x) = 2x + 1', 150, 60, { size: 17, c: 'pos' })],
        },
      ],
    },
    {
      title: 'Mencari x dari hasilnya',
      steps: [
        {
          say: 'Kebalikannya: f a sama dengan 11. Berapa a? Tulis persamaannya: 2 a tambah 1 sama dengan 11.',
          clear: true,
          add: [T('a', 'f(a) = 11', 200, 60, { size: 28 }), T('b', '2a + 1 = 11', 200, 115, { size: 28 })],
        },
        {
          say: 'Kurangi 1: 2 a sama dengan 10. Bagi 2: a sama dengan 5.',
          add: [T('c', '2a = 10', 200, 165, { size: 26 }), T('d', 'a = {a:5}', 200, 215, { size: 30 })],
        },
      ],
    },
    {
      title: 'Mencari rumus',
      steps: [
        {
          say: 'Fungsi linear berbentuk f x sama dengan a x tambah b. Diketahui f 1 sama dengan 5 dan f 3 sama dengan 9. Bagaimana mencari rumusnya?',
          clear: true,
          add: [T('f', 'f(x) = ax + b', 200, 45, { size: 24 }), table('tb', 200, 115, [['x', '1', '2', '3'], ['f(x)', '5', '', '9']], { cw: [70, 60, 60, 60], rh: 40, size: 18, head: true })],
        },
        {
          say: 'Dari x sama dengan 1 ke 3, x naik 2. f x naik dari 5 ke 9, naik 4. Jadi setiap x naik 1, f x naik 2. Itulah a: a sama dengan 2.',
          add: [T('a', 'x naik 2, f(x) naik 4 → a = 4 ÷ 2 = {a:2}', 200, 190, { size: 18 })],
        },
        {
          say: 'Masukkan ke f 1 sama dengan 5: 2 kali 1 tambah b sama dengan 5, jadi b sama dengan 3. Rumusnya f x sama dengan 2 x tambah 3.',
          add: [T('b', '2 × 1 + b = 5 → b = {a:3}', 200, 225, { size: 18 }), T('r', 'f(x) = 2x + 3', 200, 265, { size: 26, c: 'ok' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Fungsi g x sama dengan 3 x dikurangi 4. Berapa g dari 5?',
          clear: true,
          add: [box('m', MX, 110, 140, 80, { fill: 'acc-soft', r: 14, label: 'g(x) = 3x − 4', lsize: 17 }), T('q', 'g(5) = ?', 200, 210, { size: 28 })],
          ask: {
            options: [
              { t: '11', ok: true, why: '3 × 5 − 4 = 15 − 4 = 11.' },
              { t: '19', why: '3 × 5 + 4 = 19. Rumusnya dikurangi 4.' },
              { t: '−1', why: 'Kalikan dulu: 3 × 5 = 15, baru dikurangi 4.' },
              { t: '4', why: 'Ganti x dengan 5: 3 × 5 − 4.' },
            ],
          },
        },
        {
          say: 'Ganti x dengan 5: 3 kali 5 sama dengan 15, dikurangi 4 sama dengan 11.',
          clear: true,
          add: [T('a', 'g(5) = 3 × 5 − 4', 200, 90, { size: 28 }), T('b', '= 15 − 4 = {a:11}', 200, 150, { size: 28 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Diketahui f(x) = 4x − 3. Nilai f(5) adalah …',
      ans: ['17'],
      wrong: { '23': 'Rumusnya dikurangi 3: 20 − 3 = 17.', '5': 'Ganti x dengan 5: 4 × 5 − 3.' },
      steps: ['f(5) = 4 × 5 − 3.', '= 20 − 3 = 17.'],
    },
    {
      type: 'num',
      q: 'Diketahui f(x) = 2x + 7. Jika f(a) = 19, nilai a adalah …',
      ans: ['6'],
      wrong: { '45': '19 adalah hasilnya, bukan x. Selesaikan 2a + 7 = 19.', '13': '2a = 12, jadi a = 6.', '12': '2a = 12, lalu bagi 2.' },
      steps: ['2a + 7 = 19.', '2a = 12, a = 6.'],
    },
    {
      q: 'Fungsi linear f memenuhi f(0) = 4 dan f(2) = 10. Rumus fungsinya adalah …',
      options: [
        { t: 'f(x) = 3x + 4', ok: true },
        { t: 'f(x) = 4x + 3', why: 'Cek f(0): 4 × 0 + 3 = 3, bukan 4.' },
        { t: 'f(x) = 6x + 4', why: 'x naik 2, f(x) naik 6. Jadi setiap x naik 1, f(x) naik 3.' },
        { t: 'f(x) = 5x', why: 'f(0) = 0, bukan 4.' },
      ],
      steps: ['f(0) = 4, jadi b = 4.', 'x naik 2, f(x) naik 6 → a = 3.', 'f(x) = 3x + 4.'],
    },
    {
      q: 'Tabel fungsi: x = 1, 2, 3 menghasilkan f(x) = 2, 5, 8. Rumus fungsinya adalah …',
      options: [
        { t: 'f(x) = 3x − 1', ok: true },
        { t: 'f(x) = x + 1', why: 'f(2) = 3, bukan 5.' },
        { t: 'f(x) = 3x + 1', why: 'f(1) = 4, bukan 2.' },
        { t: 'f(x) = 2x', why: 'f(2) = 4, bukan 5.' },
      ],
      steps: ['Setiap x naik 1, f(x) naik 3 → a = 3.', 'f(1) = 3 × 1 + b = 2 → b = −1.', 'f(x) = 3x − 1.'],
    },
    {
      q: 'Titik manakah yang terletak pada grafik f(x) = 2x + 1?',
      options: [
        { t: '(3, 7)', ok: true },
        { t: '(7, 3)', why: 'Bilangan pertama adalah x. f(7) = 15, bukan 3.' },
        { t: '(2, 4)', why: 'f(2) = 5, bukan 4.' },
        { t: '(0, 0)', why: 'f(0) = 1, bukan 0.' },
      ],
      steps: ['Titik (x, f(x)).', 'f(3) = 2 × 3 + 1 = 7, jadi (3, 7).'],
    },
  ],
};

export default {
  id: 'k8b3',
  no: 3,
  title: 'Relasi dan Fungsi',
  desc: 'Relasi dalam diagram panah, pasangan berurutan, dan diagram Cartesius; fungsi, domain, range; rumus dan grafik fungsi.',
  lessons: [l1, l2, l3],
  extra: [
    {
      q: 'Suatu fungsi dinyatakan dengan f(x) = 5 − 2x. Nilai f(−3) adalah …',
      options: [
        { t: '11', ok: true },
        { t: '−1', why: '−2 × (−3) = +6, jadi 5 + 6 = 11.' },
        { t: '9', why: '−2 × (−3) = 6, bukan 4.' },
        { t: '−11', why: 'Negatif kali negatif hasilnya positif.' },
      ],
      steps: ['f(−3) = 5 − 2 × (−3).', '= 5 + 6 = 11.'],
    },
    {
      type: 'num',
      q: 'Tarif taksi: Rp7.000 saat naik, ditambah Rp4.000 per km. Rumusnya f(x) = 4.000x + 7.000. Tarif untuk perjalanan 8 km adalah Rp …',
      ans: ['39000'],
      wrong: { '32000': 'Jangan lupa biaya naik Rp7.000.', '88000': 'Kalikan per km saja: 4.000 × 8, lalu tambah 7.000.' },
      steps: ['f(8) = 4.000 × 8 + 7.000.', '= 32.000 + 7.000 = Rp39.000.'],
    },
    {
      q: 'Fungsi f(x) = ax + b memiliki f(1) = 1 dan f(4) = 10. Nilai a + b adalah …',
      options: [
        { t: '1', ok: true },
        { t: '5', why: 'a = 3 dan b = −2, jadi a + b = 1.' },
        { t: '3', why: '3 adalah a. Hitung juga b.' },
        { t: '−2', why: '−2 adalah b. Hitung a + b.' },
      ],
      steps: ['x naik 3, f(x) naik 9 → a = 3.', 'f(1) = 3 + b = 1 → b = −2.', 'a + b = 1.'],
    },
  ],
};
