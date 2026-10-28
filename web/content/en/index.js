// Terjemahan bahasa Inggris. Dimuat hanya saat bahasa Inggris dipilih.
// - catalog.js: judul dan deskripsi semua kelas, bab, dan materi.
// - k?b?.js: terjemahan penuh per bab (narasi, pertanyaan, pembahasan). Materi tanpa
//   terjemahan penuh tetap diputar dalam bahasa Indonesia dengan catatan.
import { KELAS_EN, BAB_EN, LESSON_EN } from './catalog.js';
import * as k1b6 from './k1b6.js';

const FULL = [k1b6];

const lesson = {};
for (const [id, v] of Object.entries(LESSON_EN)) lesson[id] = { ...v };
const bab = {};
for (const [id, v] of Object.entries(BAB_EN)) bab[id] = { ...v };
for (const m of FULL) {
  for (const [id, v] of Object.entries(m.LESSONS || {})) lesson[id] = { ...(lesson[id] || {}), ...v };
  for (const [id, extra] of Object.entries(m.BAB_EXTRA || {})) bab[id] = { ...(bab[id] || {}), extra };
}

export const EN = { kelas: KELAS_EN, bab, lesson };
