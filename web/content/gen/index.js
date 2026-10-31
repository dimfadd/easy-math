// Daftar generator soal per materi: { 'id-materi': [generator, ...] }.
// Materi tanpa generator tetap memakai soal tulisan tangan saja.
import { K1 } from './k1.js';
import { SD } from './sd.js';
import { SMP } from './smp.js';
import { SMA } from './sma.js';

export const GEN = { ...K1, ...SD, ...SMP, ...SMA };
