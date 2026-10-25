// Kelas 2 · Bab 8: Berbagai Diagram (turus, tabel, diagram batang)
import { T, table } from '../helpers.js';

// Turus: kelompok 4 garis tegak dicoret satu garis miring
function tally(id, n, x, y, { h = 26, dx = 7, gap = 14, c = 'ink' } = {}) {
  let d = '';
  let cx = x;
  for (let g = 0; g < Math.ceil(n / 5); g++) {
    const k = Math.min(5, n - g * 5);
    for (let i = 0; i < Math.min(4, k); i++) d += `M${cx + i * dx},${y - h / 2} V${y + h / 2} `;
    if (k === 5) d += `M${cx - 4},${y + h / 2 - 3} L${cx + 3 * dx + 4},${y - h / 2 + 3} `;
    cx += 4 * dx + gap;
  }
  return { id, t: 'path', x: 0, y: 0, d: d.trim() || 'M0,0', stroke: c, sw: 2.5 };
}
const FAV = [['apel', 7], ['jeruk', 4], ['pisang', 9], ['mangga', 5]];
const COLS = ['neg', 'acc', 'ok', 'pos'];
const bars = (id, data, o = {}) => ({ id, t: 'bars', x: 210, y: 140, w: 280, h: 170, max: 10, tick: 2, vals: true, data: data.map(([l, v], i) => ({ l, v, c: COLS[i % 4] })), ...o });

// ---------- 8.1 Turus dan tabel ----------
const l1 = {
  id: 'k2b8-1',
  title: 'Turus dan Tabel',
  hook: 'Turus mencatat data dengan garis. Setiap 5 garis diikat satu garis miring supaya mudah dihitung.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Ini catatan turus. Empat garis tegak dicoret satu garis miring, lalu ada 2 garis lagi. Berapa banyaknya?',
          add: [tally('t', 7, 150, 110, { h: 50, dx: 14, gap: 26 })],
          ask: {
            options: [
              { t: '7', ok: true, why: 'Satu ikatan berisi 5, ditambah 2 garis: 7.' },
              { t: '6', why: 'Garis miring juga dihitung. Satu ikatan berisi 5.' },
              { t: '2', why: 'Ikatan berisi 5 juga dihitung.' },
              { t: '4', why: 'Ikatan berisi 5 garis, termasuk garis miring.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Mencatat dengan turus',
      steps: [
        {
          say: 'Kita bertanya buah kesukaan teman sekelas. Setiap jawaban dicatat satu garis.',
          clear: true,
          add: [T('h', 'buah kesukaan', 200, 35, { size: 18, c: 'pos' }), ...FAV.map(([n], i) => T(`l${i}`, n, 90, 80 + i * 50, { size: 18 }))],
        },
        {
          say: 'Garis kelima selalu dibuat miring, mengikat empat garis sebelumnya. Satu ikatan berarti 5.',
          add: FAV.map(([, v], i) => tally(`t${i}`, v, 160, 80 + i * 50)),
        },
        {
          say: 'Hitung ikatannya dulu, lalu sisanya. Apel: 5 dan 2, jadi 7. Pisang: 5 dan 4, jadi 9.',
          add: FAV.map(([, v], i) => T(`v${i}`, String(v), 340, 80 + i * 50, { size: 22, c: 'ok' })),
        },
      ],
    },
    {
      title: 'Tabel',
      steps: [
        {
          say: 'Hasilnya bisa ditulis dalam tabel. Tabel lebih rapi untuk dibaca.',
          clear: true,
          add: [table('tb', 200, 130, [['buah', 'banyak anak'], ...FAV.map(([n, v]) => [n, String(v)])], { cw: [120, 120], rh: 34, size: 18, head: true })],
        },
        {
          say: 'Dari tabel: pisang paling banyak disukai, 9 anak. Jeruk paling sedikit, 4 anak.',
          add: [T('k', 'paling banyak: {g:pisang}   paling sedikit: {n:jeruk}', 200, 245, { size: 16 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Berapa banyak yang dicatat dengan turus ini?',
          clear: true,
          add: [tally('t', 12, 110, 110, { h: 50, dx: 12, gap: 24 })],
          ask: {
            options: [
              { t: '12', ok: true, why: 'Dua ikatan: 5 + 5 = 10, ditambah 2: 12.' },
              { t: '10', why: 'Masih ada 2 garis setelah dua ikatan.' },
              { t: '2', why: 'Dua ikatan juga dihitung, masing-masing 5.' },
              { t: '14', why: 'Setiap ikatan berisi 5, bukan 6.' },
            ],
          },
        },
        {
          say: 'Dua ikatan, masing-masing 5: 10. Ditambah 2 garis: 12.',
          add: [T('a', '5 + 5 + 2 = {g:12}', 200, 200, { size: 30 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Berapa banyak yang dicatat?',
      fig: [tally('f', 8, 130, 150, { h: 50, dx: 14, gap: 26 })],
      ans: ['8'],
      wrong: { '7': 'Satu ikatan berisi 5, ditambah 3: 8.', '3': 'Ikatan berisi 5 juga dihitung.' },
      steps: ['Ikatan 5, ditambah 3.', '= 8.'],
    },
    {
      type: 'num',
      q: 'Berapa banyak yang dicatat?',
      fig: [tally('f', 5, 170, 150, { h: 50, dx: 14 })],
      ans: ['5'],
      wrong: { '4': 'Garis miring juga dihitung.', '1': 'Satu ikatan berisi 5 garis.' },
      steps: ['Satu ikatan = 5.'],
    },
    {
      q: 'Pada turus, garis miring dibuat pada garis ke- …',
      options: [
        { t: '5', ok: true },
        { t: '4', why: 'Empat garis tegak dulu, garis kelima miring.' },
        { t: '10', why: 'Setiap 5 garis diikat.' },
      ],
      steps: ['Empat tegak, kelima miring.'],
    },
    {
      type: 'num',
      q: 'Tabel: apel 7, jeruk 4, pisang 9, mangga 5. Berapa anak yang menyukai mangga?',
      ans: ['5'],
      wrong: { '9': '9 adalah pisang.' },
      steps: ['Baris mangga: 5.'],
    },
    {
      type: 'num',
      q: 'Tabel: apel 7, jeruk 4, pisang 9, mangga 5. Berapa anak semuanya?',
      ans: ['25'],
      wrong: { '24': '7 + 4 + 9 + 5 = 25.', '9': 'Jumlahkan semua baris.' },
      steps: ['7 + 4 + 9 + 5.', '= 25.'],
    },
  ],
};

// ---------- 8.2 Diagram batang ----------
const l2 = {
  id: 'k2b8-2',
  title: 'Diagram Batang',
  hook: 'Diagram batang menggambar data sebagai batang. Batang yang lebih tinggi berarti lebih banyak.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Ini diagram batang buah kesukaan. Buah apa yang paling banyak disukai?',
          add: [bars('g', FAV)],
          ask: {
            options: [
              { t: 'pisang', ok: true, why: 'Batang pisang paling tinggi, sampai angka 9.' },
              { t: 'apel', why: 'Batang apel sampai 7, lebih pendek dari pisang.' },
              { t: 'jeruk', why: 'Batang jeruk justru paling pendek.' },
              { t: 'mangga', why: 'Batang mangga sampai 5.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Membaca batang',
      steps: [
        {
          say: 'Setiap batang mewakili satu buah. Tinggi batang dibaca pada angka di kiri.',
          clear: true,
          add: [bars('g', FAV, { vals: false })],
        },
        {
          say: 'Batang apel berhenti di angka 7. Jadi 7 anak menyukai apel.',
          set: { g: bars('g', FAV.map(([l, v]) => [l, v]), { vals: true }) },
        },
      ],
    },
    {
      title: 'Membandingkan',
      steps: [
        {
          say: 'Pisang 9, jeruk 4. Pisang lebih banyak 5 dari jeruk, karena 9 kurang 4 sama dengan 5.',
          clear: true,
          add: [bars('g', FAV), T('a', '9 − 4 = 5', 200, 275, { size: 20, c: 'ok' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Apel lebih banyak berapa dari mangga?',
          clear: true,
          add: [bars('g', FAV)],
          ask: {
            options: [
              { t: '2', ok: true, why: 'Apel 7, mangga 5. 7 − 5 = 2.' },
              { t: '12', why: 'Selisih memakai pengurangan.' },
              { t: '7', why: '7 adalah banyak apel.' },
              { t: '5', why: '5 adalah banyak mangga.' },
            ],
          },
        },
        {
          say: 'Apel 7, mangga 5. 7 kurang 5 sama dengan 2.',
          add: [T('a', '7 − 5 = {g:2}', 200, 275, { size: 24 })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Buah apa yang paling sedikit disukai?',
      fig: [bars('f', FAV)],
      options: [
        { t: 'jeruk', ok: true },
        { t: 'mangga', why: 'Mangga 5, jeruk 4.' },
        { t: 'pisang', why: 'Pisang paling banyak.' },
      ],
      steps: ['Batang terpendek: jeruk.'],
    },
    {
      type: 'num',
      q: 'Berapa anak yang menyukai pisang?',
      fig: [bars('f', FAV)],
      ans: ['9'],
      wrong: { '7': '7 adalah apel.' },
      steps: ['Batang pisang sampai 9.'],
    },
    {
      type: 'num',
      q: 'Pisang lebih banyak berapa dari apel?',
      fig: [bars('f', FAV)],
      ans: ['2'],
      wrong: { '16': 'Selisih memakai pengurangan.' },
      steps: ['9 − 7.', '= 2.'],
    },
    {
      type: 'num',
      q: 'Berapa anak yang menyukai jeruk atau mangga?',
      fig: [bars('f', FAV)],
      ans: ['9'],
      wrong: { '1': 'Atau berarti dijumlah: 4 + 5.', '4': 'Mangga juga dihitung.' },
      steps: ['4 + 5.', '= 9.'],
    },
    {
      q: 'Pada diagram batang, batang yang lebih tinggi menunjukkan …',
      options: [
        { t: 'lebih banyak', ok: true },
        { t: 'lebih sedikit', why: 'Batang tinggi berarti banyak.' },
        { t: 'warna kesukaan', why: 'Tinggi batang menunjukkan banyaknya.' },
      ],
      steps: ['Tinggi → banyak.'],
    },
  ],
};

export default {
  id: 'k2b8',
  no: 8,
  title: 'Berbagai Diagram',
  desc: 'Mencatat data dengan turus, menyusun tabel, serta membaca dan membandingkan diagram batang.',
  lessons: [l1, l2],
  extra: [
    {
      type: 'num',
      q: 'Berapa banyak yang dicatat?',
      fig: [tally('f', 10, 120, 150, { h: 50, dx: 14, gap: 26 })],
      ans: ['10'],
      wrong: { '8': 'Dua ikatan, masing-masing 5.', '2': 'Setiap ikatan bernilai 5.' },
      steps: ['5 + 5 = 10.'],
    },
    {
      type: 'num',
      q: 'Berapa anak yang menyukai apel?',
      fig: [bars('f', FAV)],
      ans: ['7'],
      wrong: { '9': '9 adalah pisang.' },
      steps: ['Batang apel sampai 7.'],
    },
    {
      q: 'Urutan buah dari yang paling banyak disukai adalah …',
      fig: [bars('f', FAV)],
      options: [
        { t: 'pisang, apel, mangga, jeruk', ok: true },
        { t: 'jeruk, mangga, apel, pisang', why: 'Itu dari yang paling sedikit.' },
        { t: 'apel, pisang, mangga, jeruk', why: 'Pisang 9 lebih banyak dari apel 7.' },
      ],
      steps: ['9, 7, 5, 4.'],
    },
  ],
};
