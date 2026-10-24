// Daftar bab kelas 7. Urutan di sini = urutan di peta belajar.
import b1 from './b1.js';
import b2 from './b2.js';
import b3 from './b3.js';

export const BAB = [b1, b2, b3];

export const LESSONS = new Map();
BAB.forEach((bab) => bab.lessons.forEach((lesson, i) => LESSONS.set(lesson.id, { lesson, bab, i })));

export const ORDER = BAB.flatMap((b) => b.lessons.map((l) => l.id));
