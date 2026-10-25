// Kelas 11 · Bab 1: Komposisi Fungsi dan Fungsi Invers
import { T, ln, dot } from '../helpers.js';
import { plane, lineOn } from '../k8/plot.js';
import { tag } from '../k10/kit.js';
import { arrows, machine, token } from './kit.js';

// ---------- 1.1 Domain, kodomain, dan jenis fungsi ----------
const D1 = arrows('d', [1, 2, 3], ['a', 'b', 'c', 'd'], [[0, 0], [1, 1], [2, 1]]);
const INJ = arrows('i', [1, 2, 3], ['a', 'b', 'c', 'd'], [[0, 0], [1, 1], [2, 3]]);
const SUR = arrows('s', [1, 2, 3, 4], ['a', 'b', 'c'], [[0, 0], [1, 1], [2, 2], [3, 2]]);
const BIJ = arrows('b', [1, 2, 3], ['a', 'b', 'c'], [[0, 1], [1, 0], [2, 2]]);

const l1 = {
  id: 'k11b1-1',
  title: 'Domain, Kodomain, dan Jenis Fungsi',
  hook: 'Fungsi memasangkan setiap anggota daerah asal dengan tepat satu anggota daerah kawan. Cara memasangkannya menentukan jenis fungsinya.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Panah-panah ini memasangkan himpunan A dengan B. Apakah ini fungsi?',
          add: [...D1.els, ...D1.arr],
          ask: {
            options: [
              { t: 'ya, karena setiap anggota A punya tepat satu pasangan', ok: true, why: '1, 2, dan 3 masing-masing punya tepat satu panah. Dua panah ke b tetap boleh.' },
              { t: 'tidak, karena dua panah menuju b', why: 'Boleh ada dua anggota A yang menuju anggota B yang sama.' },
              { t: 'tidak, karena c dan d tidak punya pasangan', why: 'Anggota B tidak wajib punya pasangan. Yang wajib adalah setiap anggota A.' },
              { t: 'tidak bisa ditentukan', why: 'Cukup periksa: setiap anggota A punya tepat satu panah.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Tiga himpunan penting',
      steps: [
        {
          say: 'Himpunan A, asal panah, disebut domain atau daerah asal.',
          pulse: ['doL'],
          add: [tag('k1', 'domain = {1, 2, 3}', 200, 268, 'pos', 15)],
        },
        {
          say: 'Himpunan B, tujuan panah, disebut kodomain atau daerah kawan.',
          pulse: ['doR'],
          set: { k1: tag('k1', 'kodomain = {a, b, c, d}', 200, 268, 'acc', 15) },
        },
        {
          say: 'Anggota B yang benar-benar terkena panah disebut range atau daerah hasil. Di sini hanya a dan b.',
          hl: ['dr0', 'dr1'],
          set: { k1: tag('k1', 'range = {a, b}', 200, 268, 'ok', 15) },
        },
      ],
    },
    {
      title: 'Injektif',
      steps: [
        {
          say: 'Fungsi disebut injektif, atau satu-satu, kalau tidak ada dua anggota domain yang menuju anggota yang sama.',
          clear: true,
          add: [...INJ.els, ...INJ.arr, tag('k', 'injektif: tujuan tidak ada yang dobel', 200, 272, 'pos', 14)],
        },
        {
          say: 'Di sini 1 ke a, 2 ke b, 3 ke d. Semua tujuannya berbeda. Tetapi c tidak terkena panah, jadi bukan surjektif.',
          pulse: ['ir2'],
        },
      ],
    },
    {
      title: 'Surjektif',
      steps: [
        {
          say: 'Fungsi disebut surjektif, atau onto, kalau setiap anggota kodomain terkena panah. Range-nya sama dengan kodomain.',
          clear: true,
          add: [...SUR.els, ...SUR.arr, tag('k', 'surjektif: semua anggota B terkena', 200, 272, 'acc', 14)],
        },
        {
          say: 'a, b, dan c semuanya terkena. Tetapi 3 dan 4 sama-sama ke c, jadi bukan injektif.',
          pulse: ['sr2'],
        },
      ],
    },
    {
      title: 'Bijektif',
      steps: [
        {
          say: 'Kalau injektif sekaligus surjektif, fungsinya disebut bijektif atau korespondensi satu-satu. Setiap anggota A berpasangan dengan tepat satu anggota B, dan sebaliknya.',
          clear: true,
          add: [...BIJ.els, ...BIJ.arr, tag('k', 'bijektif = injektif + surjektif', 200, 272, 'ok', 14)],
        },
        {
          say: 'Fungsi bijektif penting, karena hanya fungsi seperti ini yang bisa dibalik. Kita akan memakainya di materi fungsi invers.',
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Fungsi f dari {1, 2, 3} ke {2, 4, 6} dengan f(x) sama dengan 2x. Jenisnya apa?',
          clear: true,
          add: [T('q', 'f(x) = 2x', 200, 80, { size: 32 }), T('q2', 'dari {1, 2, 3} ke {2, 4, 6}', 200, 135, { size: 22, c: 'mut' })],
          ask: {
            options: [
              { t: 'bijektif', ok: true, why: '1→2, 2→4, 3→6. Tidak ada tujuan dobel, dan semua anggota kodomain terkena.' },
              { t: 'injektif saja', why: 'Semua anggota {2, 4, 6} juga terkena, jadi juga surjektif.' },
              { t: 'surjektif saja', why: 'Tujuannya juga tidak ada yang dobel, jadi juga injektif.' },
              { t: 'bukan fungsi', why: 'Setiap anggota domain punya tepat satu pasangan.' },
            ],
          },
        },
        {
          say: '1 ke 2, 2 ke 4, 3 ke 6. Satu-satu dan semua kena. Jadi bijektif.',
          clear: true,
          add: [...(() => { const a = arrows('g', [1, 2, 3], [2, 4, 6], [[0, 0], [1, 1], [2, 2]]); return [...a.els, ...a.arr]; })(), tag('k', 'bijektif', 200, 272, 'ok', 16)],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Fungsi f(x) = 2x + 1 dengan domain {0, 1, 2}. Range-nya adalah …',
      options: [
        { t: '{1, 3, 5}', ok: true },
        { t: '{0, 1, 2}', why: 'Itu domainnya. Range adalah hasil f(x).' },
        { t: '{1, 2, 3}', why: 'f(1) = 3 dan f(2) = 5.' },
        { t: '{2, 4, 6}', why: 'Jangan lupa + 1.' },
      ],
      steps: ['f(0) = 1, f(1) = 3, f(2) = 5.', 'Range = {1, 3, 5}.'],
    },
    {
      q: 'Fungsi g(x) = x² dengan domain {−1, 0, 1} ke kodomain {0, 1}. Fungsi ini …',
      options: [
        { t: 'surjektif tetapi tidak injektif', ok: true },
        { t: 'bijektif', why: '−1 dan 1 sama-sama menuju 1, jadi tidak injektif.' },
        { t: 'injektif tetapi tidak surjektif', why: '−1 dan 1 menuju anggota yang sama.' },
        { t: 'bukan fungsi', why: 'Setiap anggota domain punya tepat satu pasangan.' },
      ],
      steps: ['g(−1) = 1, g(0) = 0, g(1) = 1.', '0 dan 1 terkena semua (surjektif), tetapi 1 dobel (tidak injektif).'],
    },
    {
      q: 'Relasi dari A = {1, 2} ke B = {p, q} manakah yang bukan fungsi?',
      options: [
        { t: '{(1, p), (1, q)}', ok: true },
        { t: '{(1, p), (2, p)}', why: 'Setiap anggota A punya tepat satu pasangan. Ini fungsi.' },
        { t: '{(1, q), (2, p)}', why: 'Ini fungsi, bahkan bijektif.' },
        { t: '{(1, p), (2, q)}', why: 'Ini fungsi.' },
      ],
      steps: ['Pada {(1, p), (1, q)}, angka 1 punya dua pasangan dan 2 tidak punya pasangan.', 'Jadi bukan fungsi.'],
    },
    {
      type: 'num',
      q: 'Banyak fungsi bijektif dari A = {1, 2, 3} ke B = {a, b, c} adalah …',
      ans: ['6'],
      wrong: { '9': '9 adalah 3 × 3. Pasangan anggota B tidak boleh dipakai dua kali: 3 × 2 × 1.', '27': '27 adalah banyak semua fungsi. Yang bijektif 3 × 2 × 1.' },
      steps: ['1 punya 3 pilihan, 2 punya 2 pilihan sisa, 3 punya 1 pilihan.', '3 × 2 × 1 = 6.'],
    },
    {
      q: 'Fungsi f: bilangan real → bilangan real dengan f(x) = 3x − 2 bersifat …',
      options: [
        { t: 'bijektif', ok: true },
        { t: 'injektif saja', why: 'Setiap bilangan real y bisa dicapai dengan x = (y + 2)/3, jadi juga surjektif.' },
        { t: 'surjektif saja', why: 'Nilai x berbeda selalu memberi hasil berbeda, jadi juga injektif.' },
        { t: 'tidak injektif dan tidak surjektif', why: 'Fungsi linear dengan gradien bukan nol bersifat bijektif.' },
      ],
      steps: ['x berbeda → 3x − 2 berbeda: injektif.', 'Setiap y dicapai oleh x = (y + 2)/3: surjektif.'],
    },
  ],
};

// ---------- 1.2 Komposisi fungsi ----------
const MY = 130;
const pipe = () => [ln('p1', 60, MY, 94, MY, { sw: 3, c: 'mut', draw: false, z: -1 }), ln('p2', 186, MY, 214, MY, { sw: 3, c: 'mut', draw: false, z: -1 }), ln('p3', 306, MY, 340, MY, { sw: 3, c: 'mut', draw: false, z: -1 })];

const l2 = {
  id: 'k11b1-2',
  title: 'Komposisi Fungsi',
  hook: 'Komposisi fungsi seperti dua mesin yang disambung: keluaran mesin pertama menjadi masukan mesin kedua.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Mesin f mengalikan 2. Mesin g menambah 3. Angka 4 masuk ke f dulu, lalu hasilnya masuk ke g. Berapa yang keluar?',
          add: [pipe(), machine('f', 140, MY, 'f\n× 2'), machine('g', 260, MY, 'g\n+ 3'), token('tk', 36, MY, 4)],
          ask: {
            options: [
              { t: '11', ok: true, why: '4 × 2 = 8, lalu 8 + 3 = 11.' },
              { t: '14', why: 'Itu kalau ditambah 3 dulu: (4 + 3) × 2. Urutannya f dulu, lalu g.' },
              { t: '9', why: '4 + 2 + 3 = 9. Mesin f mengalikan, bukan menambah.' },
              { t: '7', why: 'Itu baru mesin g saja: 4 + 3.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Dua mesin disambung',
      steps: [
        {
          say: '4 masuk ke mesin f dan keluar sebagai 8.',
          set: { tk: token('tk', 200, MY - 40, 8) },
        },
        {
          say: '8 masuk ke mesin g dan keluar sebagai 11.',
          set: { tk: token('tk', 360, MY, 11, 'ok') },
        },
        {
          say: 'Ditulis g bundaran f dari 4, artinya g dari f dari 4. Perhatikan: f dikerjakan lebih dulu, padahal ditulis di kanan.',
          add: [T('a', '(g ∘ f)(4) = g(f(4)) = g(8) = {g:11}', 200, 220, { size: 22 })],
        },
      ],
    },
    {
      title: 'Urutan berpengaruh',
      steps: [
        {
          say: 'Tukar urutannya: mesin g dulu, baru f. 4 tambah 3 sama dengan 7, lalu 7 kali 2 sama dengan 14.',
          clear: true,
          add: [pipe(), machine('g', 140, MY, 'g\n+ 3'), machine('f', 260, MY, 'f\n× 2'), token('tk', 36, MY, 4)],
        },
        {
          say: 'Masuk g: menjadi 7.',
          set: { tk: token('tk', 200, MY - 40, 7) },
        },
        {
          say: 'Masuk f: menjadi 14. Hasilnya berbeda dari 11. Jadi f bundaran g biasanya tidak sama dengan g bundaran f.',
          set: { tk: token('tk', 360, MY, 14, 'neg') },
          add: [T('a', '(f ∘ g)(4) = f(g(4)) = f(7) = {n:14}', 200, 220, { size: 22 }), T('b', '(f ∘ g) ≠ (g ∘ f)', 200, 262, { size: 20, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Rumus komposisi',
      steps: [
        {
          say: 'Dengan rumus: f dari x sama dengan 2x, g dari x sama dengan x tambah 3.',
          clear: true,
          add: [T('a', 'f(x) = 2x,   g(x) = x + 3', 200, 50, { size: 24 })],
        },
        {
          say: 'g bundaran f dari x: masukkan f dari x, yaitu 2x, ke dalam g. Hasilnya 2x tambah 3.',
          add: [T('b', '(g ∘ f)(x) = g(2x) = 2x + 3', 200, 110, { size: 22, c: 'pos' })],
        },
        {
          say: 'f bundaran g dari x: masukkan x tambah 3 ke dalam f. Hasilnya 2 kali x tambah 3, yaitu 2x tambah 6.',
          add: [T('c', '(f ∘ g)(x) = f(x + 3) = 2(x + 3) = 2x + 6', 200, 160, { size: 20, c: 'acc' })],
        },
        {
          say: 'Cek dengan x sama dengan 4: 2 kali 4 tambah 3 sama dengan 11, dan 2 kali 4 tambah 6 sama dengan 14. Cocok dengan mesin tadi.',
          add: [T('d', 'x = 4:  11 dan 14 ✓', 200, 220, { size: 20, c: 'ok' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. f dari x sama dengan x kuadrat, g dari x sama dengan x dikurangi 1. Berapa f bundaran g dari 3?',
          clear: true,
          add: [T('q', 'f(x) = x²,   g(x) = x − 1', 200, 80, { size: 26 }), T('q2', '(f ∘ g)(3) = ?', 200, 140, { size: 30, c: 'acc' })],
          ask: {
            options: [
              { t: '4', ok: true, why: 'g(3) = 2 dulu, lalu f(2) = 4.' },
              { t: '8', why: 'Itu g(f(3)) = 9 − 1. Pada f ∘ g, g dikerjakan dulu.' },
              { t: '9', why: '9 adalah f(3). Kerjakan g(3) dulu.' },
              { t: '2', why: '2 adalah g(3). Masih harus dimasukkan ke f.' },
            ],
          },
        },
        {
          say: 'Kerjakan yang kanan dulu: g dari 3 sama dengan 2. Lalu f dari 2 sama dengan 4.',
          add: [T('a', 'g(3) = 2  →  f(2) = {g:4}', 200, 210, { size: 28 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Jika f(x) = 3x dan g(x) = x + 2, nilai (g ∘ f)(5) adalah …',
      ans: ['17'],
      wrong: { '21': 'Itu f(g(5)) = 3 × 7. Pada g ∘ f, f dikerjakan dulu.', '15': '15 adalah f(5). Masih harus dimasukkan ke g.' },
      steps: ['f(5) = 15.', 'g(15) = 17.'],
    },
    {
      q: 'Jika f(x) = x + 1 dan g(x) = 2x, maka (f ∘ g)(x) = …',
      options: [
        { t: '2x + 1', ok: true },
        { t: '2x + 2', why: 'Itu (g ∘ f)(x) = 2(x + 1).' },
        { t: '3x + 1', why: 'Komposisi bukan penjumlahan fungsi.' },
        { t: '2x² + 2x', why: 'Itu f(x) × g(x).' },
      ],
      steps: ['(f ∘ g)(x) = f(g(x)) = f(2x).', '= 2x + 1.'],
    },
    {
      q: 'Jika f(x) = x² dan g(x) = x − 3, maka (f ∘ g)(x) = …',
      options: [
        { t: 'x² − 6x + 9', ok: true },
        { t: 'x² − 3', why: 'Itu (g ∘ f)(x).' },
        { t: 'x² − 9', why: '(x − 3)² = x² − 6x + 9, bukan x² − 9.' },
        { t: 'x² + 9', why: '(x − 3)² punya suku −6x.' },
      ],
      steps: ['f(g(x)) = (x − 3)².', '= x² − 6x + 9.'],
    },
    {
      type: 'num',
      q: 'Jika f(x) = 2x − 1 dan (f ∘ g)(x) = 6x + 3, maka g(1) = …',
      ans: ['5'],
      wrong: { '9': '9 adalah (f ∘ g)(1). Cari g(x) dulu: 2g(x) − 1 = 6x + 3 → g(x) = 3x + 2.', '4': 'g(x) = 3x + 2, jadi g(1) = 5.' },
      steps: ['2g(x) − 1 = 6x + 3 → g(x) = 3x + 2.', 'g(1) = 5.'],
    },
    {
      type: 'num',
      q: 'Jika f(x) = x + 4 dan g(x) = x², nilai (f ∘ g)(−2) − (g ∘ f)(−2) adalah …',
      ans: ['4'],
      wrong: { '0': '(f ∘ g)(−2) = 4 + 4 = 8, (g ∘ f)(−2) = 2² = 4. Selisihnya 4.', '-4': 'Urutannya: 8 − 4.' },
      steps: ['(f ∘ g)(−2) = f(4) = 8.', '(g ∘ f)(−2) = g(2) = 4. Selisih = 4.'],
    },
  ],
};

// ---------- 1.3 Fungsi invers ----------
const CI = { x: 60, y: 25, w: 260, h: 240, xmin: -2, xmax: 7, ymin: -2, ymax: 7 };
const PI = plane('pl', CI);

const l3 = {
  id: 'k11b1-3',
  title: 'Fungsi Invers',
  hook: 'Fungsi invers menjalankan mesin secara terbalik: dari hasil kembali ke asal.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Mesin f mengalikan 2 lalu menambah 3. Yang keluar 13. Berapa angka yang dimasukkan?',
          add: [machine('f', 200, MY, 'f\n× 2, lalu + 3', 'acc-soft', 140), ln('p1', 60, MY, 130, MY, { sw: 3, c: 'mut', draw: false, z: -1 }), ln('p2', 270, MY, 340, MY, { sw: 3, c: 'mut', draw: false, z: -1 }), token('tk', 360, MY, 13, 'ok'), token('q', 36, MY, '?', 'acc')],
          ask: {
            options: [
              { t: '5', ok: true, why: 'Balik langkahnya: 13 − 3 = 10, lalu 10 ÷ 2 = 5.' },
              { t: '8', why: 'Kalau dibalik, urutannya juga dibalik: kurangi 3 dulu, baru bagi 2.' },
              { t: '6,5', why: '13 ÷ 2 = 6,5 lupa membatalkan + 3.' },
              { t: '29', why: 'Itu menjalankan mesin lagi, bukan membaliknya.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Mesin dibalik',
      steps: [
        {
          say: 'Untuk membalik, batalkan langkah terakhir lebih dulu. Tambah 3 dibatalkan dengan kurang 3: 13 menjadi 10.',
          set: { tk: token('tk', 300, MY - 42, 10, 'ok') },
        },
        {
          say: 'Kali 2 dibatalkan dengan bagi 2: 10 menjadi 5. Angka asalnya 5.',
          set: { tk: token('tk', 36, MY, 5, 'ok') },
          del: ['q'],
        },
        {
          say: 'Mesin terbalik ini disebut fungsi invers, ditulis f pangkat minus 1. Kalau f dari 5 sama dengan 13, maka f invers dari 13 sama dengan 5.',
          add: [T('a', 'f(5) = 13  ⟺  f⁻¹(13) = 5', 200, 220, { size: 24, c: 'pos' })],
        },
      ],
    },
    {
      title: 'Mencari rumus invers',
      steps: [
        {
          say: 'Rumusnya dicari dengan menukar peran: tulis y sama dengan 2x tambah 3, lalu nyatakan x dalam y.',
          clear: true,
          add: [T('a', 'y = 2x + 3', 200, 50, { size: 26 })],
        },
        {
          say: 'Kurangi 3: y dikurangi 3 sama dengan 2x. Bagi 2: x sama dengan y dikurangi 3, per 2.',
          add: [T('b', 'y − 3 = 2x', 200, 95, { size: 24 }), T('c', 'x = (y − 3) ÷ 2', 200, 140, { size: 24 })],
        },
        {
          say: 'Ganti y dengan x. Jadi f invers dari x sama dengan x dikurangi 3, per 2.',
          add: [T('d', 'f⁻¹(x) = (x − 3) ÷ 2', 200, 195, { size: 28, c: 'ok' })],
        },
        {
          say: 'Cek: f invers dari 13 sama dengan 10 dibagi 2, yaitu 5. Cocok.',
          add: [T('e', 'f⁻¹(13) = 10 ÷ 2 = 5 ✓', 200, 250, { size: 20, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Cermin garis y = x',
      steps: [
        {
          say: 'Gambar f dari x sama dengan 2x tambah 3, dan garis y sama dengan x yang putus-putus.',
          clear: true,
          add: [...PI.els, lineOn('f', PI, 2, 3, CI), lineOn('m', PI, 1, 0, CI, { c: 'mut', sw: 2, dash: '6 5' }), tag('lf', 'f', ...PI.at(1.2, 6.2), 'pos', 16), tag('lm', 'y = x', ...PI.at(6.2, 5.2), 'mut', 13)],
        },
        {
          say: 'Titik 0 koma 3 ada di grafik f. Tukar koordinatnya: 3 koma 0. Titik ini ada di grafik invers.',
          add: [dot('A', ...PI.at(0, 3), 'pos'), dot('B', ...PI.at(3, 0), 'ok'), ln('AB', ...PI.at(0, 3), ...PI.at(3, 0), { sw: 1.5, dash: '3 3', c: 'mut' })],
        },
        {
          say: 'Grafik invers adalah pencerminan grafik f terhadap garis y sama dengan x.',
          add: [lineOn('g', PI, 0.5, -1.5, CI, { c: 'ok' }), tag('lg', 'f⁻¹', ...PI.at(6, 1.9), 'ok', 16)],
        },
        {
          say: 'Ingat, hanya fungsi bijektif yang punya invers. Kalau dua masukan memberi hasil yang sama, mesin terbalik tidak tahu harus kembali ke yang mana.',
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. f dari x sama dengan 3x dikurangi 6. Berapa f invers dari 9?',
          clear: true,
          add: [T('q', 'f(x) = 3x − 6', 200, 90, { size: 32 }), T('q2', 'f⁻¹(9) = ?', 200, 150, { size: 30, c: 'acc' })],
          ask: {
            options: [
              { t: '5', ok: true, why: 'f⁻¹(x) = (x + 6)/3, jadi f⁻¹(9) = 15/3 = 5. Cek: f(5) = 9.' },
              { t: '21', why: '21 adalah f(9). Invers berarti mencari x supaya f(x) = 9.' },
              { t: '1', why: '(9 − 6)/3 = 1 membalik tanda yang salah. Batalkan − 6 dengan + 6.' },
              { t: '3', why: '9 ÷ 3 = 3 lupa membatalkan − 6.' },
            ],
          },
        },
        {
          say: 'Balik langkahnya: tambah 6, lalu bagi 3. 9 tambah 6 sama dengan 15, dibagi 3 sama dengan 5.',
          add: [T('a', 'f⁻¹(x) = (x + 6) ÷ 3', 200, 210, { size: 24 }), T('b', 'f⁻¹(9) = 15 ÷ 3 = {g:5}', 200, 255, { size: 26 })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Invers dari f(x) = x + 7 adalah …',
      options: [
        { t: 'f⁻¹(x) = x − 7', ok: true },
        { t: 'f⁻¹(x) = 7 − x', why: 'Cek x = 10: f(10) = 17, tetapi 7 − 17 = −10, bukan 10.' },
        { t: 'f⁻¹(x) = 1/(x + 7)', why: 'Invers bukan kebalikan pecahan.' },
        { t: 'f⁻¹(x) = −x − 7', why: 'Cukup batalkan + 7 dengan − 7.' },
      ],
      steps: ['y = x + 7 → x = y − 7.', 'f⁻¹(x) = x − 7.'],
    },
    {
      q: 'Invers dari f(x) = (2x − 1)/3 adalah …',
      options: [
        { t: 'f⁻¹(x) = (3x + 1)/2', ok: true },
        { t: 'f⁻¹(x) = (3x − 1)/2', why: 'Batalkan − 1 dengan + 1: 3y + 1 = 2x.' },
        { t: 'f⁻¹(x) = 3/(2x − 1)', why: 'Invers bukan kebalikan pecahan.' },
        { t: 'f⁻¹(x) = (2x + 1)/3', why: 'Kalikan 3 dulu, lalu tambah 1, lalu bagi 2.' },
      ],
      steps: ['3y = 2x − 1 → 2x = 3y + 1 → x = (3y + 1)/2.', 'f⁻¹(x) = (3x + 1)/2.'],
    },
    {
      type: 'num',
      q: 'Jika f(x) = 4x + 2, nilai f⁻¹(14) adalah …',
      ans: ['3'],
      wrong: { '58': '58 adalah f(14). Cari x dengan 4x + 2 = 14.', '4': '(14 − 2) ÷ 4 = 3.' },
      steps: ['4x + 2 = 14 → 4x = 12.', 'x = 3.'],
    },
    {
      q: 'Titik (2, 7) terletak pada grafik f. Titik yang pasti terletak pada grafik f⁻¹ adalah …',
      options: [
        { t: '(7, 2)', ok: true },
        { t: '(−2, −7)', why: 'Itu pencerminan terhadap titik asal, bukan garis y = x.' },
        { t: '(2, −7)', why: 'Itu pencerminan terhadap sumbu x.' },
        { t: '(2, 7)', why: 'Koordinatnya harus ditukar.' },
      ],
      steps: ['f(2) = 7 → f⁻¹(7) = 2.', 'Titik (7, 2).'],
    },
    {
      type: 'num',
      q: 'Jika f(x) = 2x + 1 dan g(x) = x − 4, nilai (f ∘ g)⁻¹(9) adalah …',
      ans: ['8'],
      wrong: { '11': '(f ∘ g)(x) = 2(x − 4) + 1 = 2x − 7. Cari x dengan 2x − 7 = 9.', '1': '2x − 7 = 9 → x = 8.' },
      steps: ['(f ∘ g)(x) = 2(x − 4) + 1 = 2x − 7.', '2x − 7 = 9 → x = 8.'],
    },
  ],
};

export default {
  id: 'k11b1',
  no: 1,
  title: 'Komposisi Fungsi dan Fungsi Invers',
  desc: 'Domain, kodomain, range, fungsi injektif-surjektif-bijektif, komposisi fungsi, dan fungsi invers.',
  lessons: [l1, l2, l3],
  extra: [
    {
      type: 'num',
      q: 'Jika f(x) = x² + 1 dan g(x) = 2x, nilai (g ∘ f)(3) adalah …',
      ans: ['20'],
      wrong: { '37': 'Itu f(g(3)) = 36 + 1. Pada g ∘ f, f dikerjakan dulu.', '10': '10 adalah f(3). Masih dikali 2.' },
      steps: ['f(3) = 10.', 'g(10) = 20.'],
    },
    {
      q: 'Jika f(x) = 5x − 3, maka f⁻¹(x) = …',
      options: [
        { t: '(x + 3)/5', ok: true },
        { t: '(x − 3)/5', why: 'Batalkan − 3 dengan + 3.' },
        { t: '5x + 3', why: 'Bagi 5, bukan kali 5.' },
        { t: '1/(5x − 3)', why: 'Invers bukan kebalikan pecahan.' },
      ],
      steps: ['y = 5x − 3 → x = (y + 3)/5.', 'f⁻¹(x) = (x + 3)/5.'],
    },
    {
      type: 'num',
      q: 'Harga tiket (rupiah) untuk x orang adalah f(x) = 25.000x + 10.000. Jika rombongan membayar Rp160.000, banyak orangnya adalah …',
      ans: ['6'],
      wrong: { '7': '160.000 − 10.000 = 150.000, lalu ÷ 25.000 = 6.', '6,4': 'Kurangi biaya tetap 10.000 dulu.' },
      steps: ['f⁻¹(160.000) = (160.000 − 10.000) ÷ 25.000.', '= 6 orang.'],
    },
  ],
};
