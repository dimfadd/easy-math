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
import { K8 } from './k8/index.js';

export const KELAS = [
  {
    no: 7,
    desc: 'Bilangan bulat dan pecahan, aljabar, rasio, sudut, bangun datar, data, dan aritmetika sosial.',
    foot: 'Materi mengacu pada capaian pembelajaran matematika Fase D Kurikulum Merdeka, ditambah topik kelas 7 yang masih umum diajarkan seperti aritmetika sosial.',
    babs: [b1, b2, b3, b4, b5, b6, b7, b8, b9],
  },
  {
    no: 8,
    desc: 'Pangkat dan akar, Pythagoras, fungsi, garis lurus, SPLDV, bangun ruang, statistika, dan peluang.',
    foot: 'Materi mengacu pada capaian pembelajaran matematika Fase D Kurikulum Merdeka, ditambah topik kelas 8 yang masih umum diajarkan seperti SPLDV dan bangun ruang sisi datar.',
    babs: K8,
  },
].filter((k) => k.babs.length);

KELAS.forEach((k) => k.babs.forEach((b) => (b.kelas = k.no)));

// Semua bab dari semua kelas (dipakai juga oleh skrip uji)
export const BAB = KELAS.flatMap((k) => k.babs);

export const LESSONS = new Map();
BAB.forEach((bab) => bab.lessons.forEach((lesson, i) => LESSONS.set(lesson.id, { lesson, bab, i, kelas: bab.kelas })));

export const ORDER = BAB.flatMap((b) => b.lessons.map((l) => l.id));

export const kelasOf = (no) => KELAS.find((k) => k.no === Number(no));
