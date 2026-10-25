// Daftar kelas dan bab. Urutan di sini = urutan di peta belajar.
import b1 from './b1.js';
import b2 from './b2.js';
import b3 from './b3.js';
import b4 from './b4.js';
import b5 from './b5.js';
import b6 from './b6.js';
import b7 from './b7.js';
import b8 from './b8.js';
import b9 from './b9.js';
import { K1 } from './k1/index.js';
import { K2 } from './k2/index.js';
import { K3 } from './k3/index.js';
import { K4 } from './k4/index.js';
import { K8 } from './k8/index.js';
import { K9 } from './k9/index.js';
import { K10 } from './k10/index.js';
import { K11 } from './k11/index.js';
import { K11L } from './k11l/index.js';
import { K12 } from './k12/index.js';
import { K12L } from './k12l/index.js';

export const KELAS = [
  {
    no: 1,
    jenjang: 'SD',
    fase: 'A',
    desc: 'Membilang sampai 20, penjumlahan dan pengurangan, mengenal bentuk, mengukur panjang, dan diagram.',
    foot: 'Materi mengacu pada buku Matematika Kelas I Kurikulum Merdeka (Fase A). Narasi dibuat pendek; anak kelas 1 sebaiknya belajar ditemani orang tua atau guru.',
    babs: K1,
  },
  {
    no: 2,
    jenjang: 'SD',
    fase: 'A',
    desc: 'Puluhan dan satuan sampai 100, penjumlahan dan pengurangan, bentuk, posisi dan pola, pecahan, pengukuran, dan diagram.',
    foot: 'Materi mengacu pada buku Matematika Kelas II Kurikulum Merdeka (Fase A). Anak kelas 2 sebaiknya belajar ditemani orang tua atau guru.',
    babs: K2,
  },
  {
    no: 3,
    jenjang: 'SD',
    fase: 'B',
    desc: 'Bilangan sampai 1.000, kalimat matematika, perkalian dan pembagian, pengukuran panjang dan berat, unsur bangun datar, dan tabel.',
    foot: 'Materi mengacu pada buku Matematika Kelas III Kurikulum Merdeka (Fase B), ditambah perkalian dan pembagian sampai 100 dari capaian pembelajaran Fase B.',
    babs: K3,
  },
  {
    no: 4,
    jenjang: 'SD',
    fase: 'B',
    desc: 'Bilangan sampai 10.000, pecahan, pola gambar dan bilangan, luas dan volume, bangun datar, serta piktogram dan diagram batang.',
    foot: 'Materi mengacu pada buku Matematika Kelas IV Kurikulum Merdeka (Fase B).',
    babs: K4,
  },
  {
    no: 7,
    jenjang: 'SMP',
    fase: 'D',
    desc: 'Bilangan bulat dan pecahan, aljabar, rasio, sudut, bangun datar, data, dan aritmetika sosial.',
    foot: 'Materi mengacu pada capaian pembelajaran matematika Fase D Kurikulum Merdeka, ditambah topik kelas 7 yang masih umum diajarkan seperti aritmetika sosial.',
    babs: [b1, b2, b3, b4, b5, b6, b7, b8, b9],
  },
  {
    no: 8,
    jenjang: 'SMP',
    fase: 'D',
    desc: 'Pangkat dan akar, Pythagoras, fungsi, garis lurus, SPLDV, bangun ruang, statistika, dan peluang.',
    foot: 'Materi mengacu pada capaian pembelajaran matematika Fase D Kurikulum Merdeka, ditambah topik kelas 8 yang masih umum diajarkan seperti SPLDV dan bangun ruang sisi datar.',
    babs: K8,
  },
  {
    no: 9,
    jenjang: 'SMP',
    fase: 'D',
    desc: 'Persamaan dan fungsi kuadrat, transformasi, kesebangunan, lingkaran, dan bangun ruang sisi lengkung.',
    foot: 'Materi mengacu pada capaian pembelajaran matematika Fase D Kurikulum Merdeka, ditambah topik kelas 9 yang masih umum diajarkan dari Kurikulum 2013.',
    babs: K9,
  },
  {
    no: 10,
    jenjang: 'SMA',
    fase: 'E',
    desc: 'Eksponen dan logaritma, barisan dan deret, vektor, trigonometri, sistem persamaan dan pertidaksamaan linear, fungsi kuadrat, statistika, dan peluang.',
    foot: 'Materi mengacu pada capaian pembelajaran matematika Fase E Kurikulum Merdeka (kelas 10 SMA/SMK).',
    babs: K10,
  },
  {
    no: 11,
    jenjang: 'SMA',
    fase: 'F',
    desc: 'Komposisi dan invers fungsi, lingkaran, statistika data dua variabel, serta permutasi, kombinasi, dan peluang bersyarat.',
    foot: 'Materi mengacu pada capaian pembelajaran matematika umum Fase F Kurikulum Merdeka (kelas 11 SMA/SMK), belum termasuk Matematika Tingkat Lanjut.',
    babs: K11,
  },
  {
    no: 11,
    key: '11-lanjut',
    name: 'Kelas 11 Lanjut',
    jenjang: 'SMA',
    fase: 'F',
    desc: 'Matematika Tingkat Lanjut: bilangan kompleks, polinomial, matriks, transformasi dengan matriks, serta fungsi dan pemodelannya.',
    foot: 'Materi mengacu pada mata pelajaran pilihan Matematika Tingkat Lanjut Fase F Kurikulum Merdeka (kelas 11 SMA).',
    babs: K11L,
  },
  {
    no: 12,
    jenjang: 'SMA',
    fase: 'F',
    desc: 'Transformasi fungsi, busur dan juring lingkaran dengan radian, serta kombinatorik dan peluang.',
    foot: 'Materi mengacu pada buku Matematika Kelas XII Kurikulum Merdeka (Fase F). Topik yang sudah dibahas di kelas sebelumnya diperdalam, tidak diulang.',
    babs: K12,
  },
  {
    no: 12,
    key: '12-lanjut',
    name: 'Kelas 12 Lanjut',
    jenjang: 'SMA',
    fase: 'F',
    desc: 'Matematika Tingkat Lanjut: irisan kerucut, limit, turunan, integral, serta distribusi peluang.',
    foot: 'Materi mengacu pada buku Matematika Tingkat Lanjut Kelas XII Kurikulum Merdeka (Fase F). Persamaan lingkaran sudah dibahas di kelas 11, jadi bab geometri analitik berfokus pada parabola, elips, dan hiperbola.',
    babs: K12L,
  },
].filter((k) => k.babs.length);

// key: penanda unik di URL (#/kelas/<key>); name: label yang tampil
KELAS.forEach((k) => {
  k.key = k.key || String(k.no);
  k.name = k.name || `Kelas ${k.no}`;
  k.babs.forEach((b) => (b.kelas = k.key));
});

// Semua bab dari semua kelas (dipakai juga oleh skrip uji)
export const BAB = KELAS.flatMap((k) => k.babs);

export const LESSONS = new Map();
BAB.forEach((bab) => bab.lessons.forEach((lesson, i) => LESSONS.set(lesson.id, { lesson, bab, i, kelas: bab.kelas })));

export const ORDER = BAB.flatMap((b) => b.lessons.map((l) => l.id));

export const kelasOf = (key) => KELAS.find((k) => k.key === String(key));
