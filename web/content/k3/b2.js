// Kelas 3 · Bab 2: Kalimat Matematika (termasuk perkalian dan pembagian sampai 100)
import { T, box } from '../helpers.js';
import { objs } from '../k1/kit.js';

// Diagram pita: total di atas, dua bagian di bawah
function tape(p, a, b, total, { x = 60, y = 110, W = 280, aLab, bLab, tLab, unknown } = {}) {
  const wa = (a / total) * W;
  return [
    box(`${p}t`, x + W / 2, y - 40, W, 30, { r: 4, fill: unknown === 't' ? 'paper' : 'mut-soft', stroke: 'ink', sw: 2, label: tLab ?? String(total), lsize: 18 }),
    box(`${p}a`, x + wa / 2, y, wa, 30, { r: 4, fill: unknown === 'a' ? 'paper' : 'pos-soft', stroke: 'pos', sw: 2, label: aLab ?? String(a), lsize: 18 }),
    box(`${p}b`, x + wa + (W - wa) / 2, y, W - wa, 30, { r: 4, fill: unknown === 'b' ? 'paper' : 'acc-soft', stroke: 'acc', sw: 2, label: bLab ?? String(b), lsize: 18 }),
  ];
}

// ---------- 2.1 Kalimat matematika ----------
const l1 = {
  id: 'k3b2-1',
  title: 'Kalimat Matematika',
  hook: 'Soal cerita bisa ditulis menjadi kalimat matematika. Kotak kosong adalah bilangan yang dicari.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Dina punya 45 kelereng. Setelah diberi kakak, kelerengnya menjadi 70. Berapa kelereng dari kakak?',
          add: [T('q', '45 + □ = 70', 200, 110, { size: 40, c: 'pos' })],
          ask: {
            options: [
              { t: '25', ok: true, why: 'Bilangan yang ditambahkan ke 45 supaya menjadi 70: 70 − 45 = 25.' },
              { t: '115', why: '115 adalah 45 + 70. Kita mencari bagian yang hilang.' },
              { t: '35', why: 'Cek: 45 + 35 = 80, bukan 70.' },
              { t: '70', why: '70 adalah jumlah akhirnya.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Cerita jadi kalimat',
      steps: [
        {
          say: 'Gambarkan dengan pita. Pita atas adalah semuanya: 70. Pita bawah terdiri dari kelereng awal, 45, dan kelereng dari kakak yang belum diketahui.',
          clear: true,
          add: tape('p', 45, 25, 70, { bLab: '□', unknown: 'b' }),
        },
        {
          say: 'Kalimat matematikanya: 45 tambah kotak sama dengan 70.',
          add: [T('a', '45 + □ = 70', 200, 180, { size: 30, c: 'pos' })],
        },
        {
          say: 'Bagian yang hilang dicari dengan pengurangan: 70 kurang 45 sama dengan 25.',
          add: [T('b', '□ = 70 − 45 = {g:25}', 200, 230, { size: 28 })],
          set: { pb: { label: '25', fill: 'acc-soft' } },
        },
      ],
    },
    {
      title: 'Mencari yang dikurangi',
      steps: [
        {
          say: 'Kotak juga bisa di depan. Kotak dikurangi 30 sama dengan 50. Kotak adalah semuanya, sebelum diambil 30.',
          clear: true,
          add: [...tape('p', 30, 50, 80, { tLab: '□', unknown: 't' }), T('a', '□ − 30 = 50', 200, 180, { size: 30, c: 'pos' })],
        },
        {
          say: 'Semuanya adalah 30 tambah 50, yaitu 80.',
          add: [T('b', '□ = 30 + 50 = {g:80}', 200, 230, { size: 28 })],
          set: { pt: { label: '80', fill: 'mut-soft' } },
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Kotak tambah 28 sama dengan 63. Berapa isi kotak?',
          clear: true,
          add: [T('q', '□ + 28 = 63', 200, 110, { size: 40, c: 'pos' })],
          ask: {
            options: [
              { t: '35', ok: true, why: '63 − 28 = 35. Cek: 35 + 28 = 63.' },
              { t: '91', why: '91 adalah 63 + 28.' },
              { t: '45', why: 'Cek: 45 + 28 = 73, bukan 63.' },
            ],
          },
        },
        {
          say: '63 kurang 28 sama dengan 35. Cek: 35 tambah 28 sama dengan 63. Benar.',
          add: [T('a', '□ = 63 − 28 = {g:35}', 200, 190, { size: 28 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: '36 + □ = 90. Nilai □ adalah …',
      ans: ['54'],
      wrong: { '126': 'Cari bagian yang hilang: 90 − 36.', '64': 'Cek: 36 + 64 = 100.' },
      steps: ['□ = 90 − 36.', '= 54.'],
    },
    {
      type: 'num',
      q: '□ − 25 = 40. Nilai □ adalah …',
      ans: ['65'],
      wrong: { '15': 'Kotak adalah semuanya sebelum diambil 25: 40 + 25.' },
      steps: ['□ = 40 + 25.', '= 65.'],
    },
    {
      type: 'num',
      q: '100 − □ = 37. Nilai □ adalah …',
      ans: ['63'],
      wrong: { '137': 'Cari yang diambil: 100 − 37.' },
      steps: ['□ = 100 − 37.', '= 63.'],
    },
    {
      q: 'Ibu membeli 24 telur, lalu membeli lagi sehingga telurnya menjadi 60. Kalimat matematika yang tepat adalah …',
      options: [
        { t: '24 + □ = 60', ok: true },
        { t: '24 + 60 = □', why: '60 adalah jumlah akhir, bukan yang ditambahkan.' },
        { t: '60 + □ = 24', why: 'Telurnya bertambah dari 24 menjadi 60.' },
      ],
      steps: ['Awal 24, ditambah □, menjadi 60.'],
    },
    {
      type: 'num',
      q: 'Rudi punya 85 kartu. Ia memberikan beberapa kartu kepada adik, dan sisanya 58 kartu. Berapa kartu yang diberikan?',
      ans: ['27'],
      wrong: { '143': 'Diberikan berarti berkurang: 85 − □ = 58.', '33': 'Cek: 85 − 33 = 52.' },
      steps: ['85 − □ = 58.', '□ = 85 − 58 = 27.'],
    },
  ],
};

// ---------- 2.2 Perkalian ----------
const AX = 110;
const AY = 70;
const grid = (p, r, c, name = 'apple', dx = 46, dy = 50) => objs(p, name, r * c, AX, AY, { dx, dy, cols: c, size: 36 });

const l2 = {
  id: 'k3b2-2',
  title: 'Perkalian',
  hook: 'Perkalian adalah penjumlahan berulang. 3 × 4 berarti 3 kelompok yang masing-masing berisi 4: 4 + 4 + 4 = 12.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Apel disusun 3 baris. Setiap baris berisi 4 apel. Berapa semua apel?',
          add: grid('a', 3, 4),
          ask: {
            options: [
              { t: '12', ok: true, why: '4 + 4 + 4 = 12. Ditulis 3 × 4 = 12.' },
              { t: '7', why: '3 + 4 = 7 hanya menjumlah banyak baris dan isi satu baris.' },
              { t: '16', why: 'Hanya ada 3 baris, bukan 4.' },
              { t: '34', why: 'Hitung apelnya: ada 12.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Penjumlahan berulang',
      steps: [
        {
          say: 'Baris pertama 4 apel. Baris kedua 4 apel. Baris ketiga 4 apel.',
          clear: true,
          add: [...grid('a', 3, 4), ...[0, 1, 2].map((r) => T(`r${r}`, '4', AX + 4 * 46 + 20, AY + r * 50, { size: 22, c: 'pos' }))],
        },
        {
          say: '4 tambah 4 tambah 4 sama dengan 12. Karena 4 dijumlahkan 3 kali, ditulis 3 kali 4.',
          add: [T('a', '4 + 4 + 4 = 12', 200, 220, { size: 26 }), T('b', '3 × 4 = 12', 200, 260, { size: 30, c: 'ok' })],
        },
      ],
    },
    {
      title: 'Ditukar, hasilnya sama',
      steps: [
        {
          say: 'Kalau dilihat per kolom, ada 4 kolom berisi 3 apel. 3 tambah 3 tambah 3 tambah 3 juga sama dengan 12. Jadi 4 kali 3 sama dengan 3 kali 4.',
          clear: true,
          add: [...grid('a', 3, 4), ...[0, 1, 2, 3].map((c) => T(`c${c}`, '3', AX + c * 46, AY + 136, { size: 20, c: 'acc' })), T('a', '3 + 3 + 3 + 3 = 12', 200, 245, { size: 22 }), T('b', '4 × 3 = 3 × 4', 200, 280, { size: 24, c: 'ok' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Ada 5 kotak pensil. Setiap kotak berisi 6 pensil. Berapa semua pensil?',
          clear: true,
          add: [T('q', '5 × 6 = ?', 200, 110, { size: 44, c: 'pos' })],
          ask: {
            options: [
              { t: '30', ok: true, why: '6 + 6 + 6 + 6 + 6 = 30.' },
              { t: '11', why: '5 + 6 = 11. Perkalian adalah penjumlahan berulang.' },
              { t: '56', why: 'Hitung 6 sebanyak 5 kali: 30.' },
              { t: '25', why: '25 adalah 5 × 5.' },
            ],
          },
        },
        {
          say: '6 dijumlahkan 5 kali: 6, 12, 18, 24, 30.',
          add: [T('a', '6, 12, 18, 24, {g:30}', 200, 190, { size: 30 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: '2 × 7 = …',
      ans: ['14'],
      wrong: { '9': '2 × 7 = 7 + 7.' },
      steps: ['7 + 7.', '= 14.'],
    },
    {
      type: 'num',
      q: 'Berapa semua bintang?',
      fig: objs('f', 'star', 15, 110, 100, { dx: 46, dy: 50, cols: 5, size: 34 }),
      ans: ['15'],
      wrong: { '8': '3 baris × 5 bintang = 15.', '5': 'Ada 3 baris.' },
      steps: ['3 baris, masing-masing 5.', '3 × 5 = 15.'],
    },
    {
      type: 'num',
      q: '4 + 4 + 4 + 4 + 4 = 5 × …',
      ans: ['4'],
      wrong: { '5': '4 dijumlahkan 5 kali: 5 × 4.', '20': '20 adalah hasilnya.' },
      steps: ['4 dijumlahkan 5 kali.', '= 5 × 4.'],
    },
    {
      type: 'num',
      q: 'Satu meja punya 4 kaki. 8 meja punya … kaki.',
      ans: ['32'],
      wrong: { '12': '8 × 4, bukan 8 + 4.' },
      steps: ['8 × 4.', '= 32 kaki.'],
    },
    {
      type: 'num',
      q: '9 × 3 = 3 × …',
      ans: ['9'],
      wrong: { '27': '27 adalah hasilnya.', '3': 'Urutan ditukar: 9 × 3 = 3 × 9.' },
      steps: ['Perkalian boleh ditukar.', '9 × 3 = 3 × 9.'],
    },
  ],
};

// ---------- 2.3 Pembagian ----------
const KX = [90, 200, 310];

const l3 = {
  id: 'k3b2-3',
  title: 'Pembagian',
  hook: 'Pembagian adalah membagi sama rata. 12 : 3 = 4 berarti 12 benda dibagi untuk 3 anak, setiap anak mendapat 4.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: '12 apel dibagi sama rata untuk 3 anak. Setiap anak mendapat berapa apel?',
          add: objs('a', 'apple', 12, 70, 80, { dx: 44, dy: 50, cols: 6, size: 34 }),
          ask: {
            options: [
              { t: '4', ok: true, why: 'Bagikan satu per satu ke 3 anak sampai habis: setiap anak 4. 12 : 3 = 4.' },
              { t: '9', why: '12 − 3 = 9. Membagi sama rata berbeda dengan mengurangi.' },
              { t: '36', why: '12 × 3 = 36. Membagi membuat bagiannya lebih kecil.' },
              { t: '3', why: '3 adalah banyak anak.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Bagikan sama rata',
      steps: [
        {
          say: 'Ada 3 anak. Bagikan apel satu per satu bergiliran.',
          clear: true,
          add: [...objs('a', 'apple', 12, 70, 70, { dx: 44, dy: 46, cols: 6, size: 32 }), ...KX.map((x, i) => ({ id: `k${i}`, t: 'icon', name: 'person', x, y: 200, size: 44, c: ['pos', 'acc', 'ok'][i] }))],
        },
        {
          say: 'Setelah habis, setiap anak mendapat 4 apel.',
          set: Object.fromEntries(Array.from({ length: 12 }, (_, i) => [`a${i}`, { x: KX[i % 3] - 17 + (Math.floor(i / 3) % 2) * 34, y: 242 + Math.floor(i / 6) * 34 }])),
          add: [T('a', '12 : 3 = {g:4}', 200, 130, { size: 32 })],
        },
      ],
    },
    {
      title: 'Pembagian dan perkalian',
      steps: [
        {
          say: '3 anak masing-masing mendapat 4. 3 kali 4 sama dengan 12. Jadi 12 bagi 3 sama dengan 4. Pembagian adalah kebalikan perkalian.',
          clear: true,
          add: [T('a', '3 × 4 = 12', 200, 80, { size: 34, c: 'pos' }), T('b', '12 : 3 = 4', 200, 140, { size: 34, c: 'acc' }), T('c', '12 : 4 = 3', 200, 200, { size: 34, c: 'acc' })],
        },
        {
          say: 'Untuk mencari 20 bagi 5, tanyakan: 5 kali berapa sama dengan 20? Jawabannya 4.',
          add: [T('d', '20 : 5 = ? → 5 × {g:4} = 20', 200, 260, { size: 22 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. 18 kue dibagi sama rata ke dalam 6 piring. Setiap piring berisi berapa kue?',
          clear: true,
          add: [T('q', '18 : 6 = ?', 200, 110, { size: 44, c: 'pos' })],
          ask: {
            options: [
              { t: '3', ok: true, why: '6 × 3 = 18, jadi 18 : 6 = 3.' },
              { t: '12', why: '18 − 6 = 12. Membagi berbeda dengan mengurangi.' },
              { t: '108', why: '18 × 6 = 108. Membagi membuat lebih kecil.' },
              { t: '4', why: 'Cek: 6 × 4 = 24, bukan 18.' },
            ],
          },
        },
        {
          say: '6 kali berapa sama dengan 18? 6 kali 3. Jadi setiap piring berisi 3 kue.',
          add: [T('a', '6 × {g:3} = 18', 200, 190, { size: 32 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: '15 : 3 = …',
      ans: ['5'],
      wrong: { '12': 'Itu 15 − 3.', '45': 'Itu 15 × 3.' },
      steps: ['3 × 5 = 15.', '15 : 3 = 5.'],
    },
    {
      type: 'num',
      q: '24 : 4 = …',
      ans: ['6'],
      wrong: { '20': 'Itu 24 − 4.', '8': 'Cek: 4 × 8 = 32.' },
      steps: ['4 × 6 = 24.', '24 : 4 = 6.'],
    },
    {
      type: 'num',
      q: '20 permen dibagi sama rata untuk 5 anak. Setiap anak mendapat …',
      ans: ['4'],
      wrong: { '15': 'Membagi sama rata, bukan mengurangi.', '100': 'Itu perkalian.' },
      steps: ['20 : 5.', '= 4 permen.'],
    },
    {
      type: 'num',
      q: '7 × 6 = 42, maka 42 : 7 = …',
      ans: ['6'],
      wrong: { '7': '42 : 6 = 7. Yang ditanya 42 : 7.', '35': 'Itu 42 − 7.' },
      steps: ['7 × 6 = 42.', '42 : 7 = 6.'],
    },
    {
      type: 'num',
      q: '30 siswa dibagi menjadi kelompok berisi 5 siswa. Banyak kelompok adalah …',
      ans: ['6'],
      wrong: { '25': 'Itu 30 − 5.', '150': 'Itu 30 × 5.' },
      steps: ['30 : 5.', '= 6 kelompok.'],
    },
  ],
};

export default {
  id: 'k3b2',
  no: 2,
  title: 'Kalimat Matematika',
  desc: 'Menulis soal cerita sebagai kalimat matematika dengan diagram pita, perkalian sebagai penjumlahan berulang, dan pembagian sama rata.',
  lessons: [l1, l2, l3],
  extra: [
    {
      type: 'num',
      q: '□ + 45 = 100. Nilai □ adalah …',
      ans: ['55'],
      wrong: { '145': 'Cari bagian yang hilang: 100 − 45.' },
      steps: ['□ = 100 − 45 = 55.'],
    },
    {
      type: 'num',
      q: '6 × 7 = …',
      ans: ['42'],
      wrong: { '13': 'Itu 6 + 7.', '48': 'Itu 6 × 8.' },
      steps: ['7 dijumlahkan 6 kali.', '= 42.'],
    },
    {
      type: 'num',
      q: '36 : 9 = …',
      ans: ['4'],
      wrong: { '27': 'Itu 36 − 9.', '5': 'Cek: 9 × 5 = 45.' },
      steps: ['9 × 4 = 36.', '36 : 9 = 4.'],
    },
  ],
};
