// Uji fungsi pemeriksa jawaban isian. Jalankan: node tests/answers.mjs
import { checkNum, toNumber } from '../web/js/quiz.js';
let fail = 0;
const eq = (name, got, want) => {
  if (got !== want) {
    fail++;
    console.log(`GAGAL ${name}: dapat ${got}, harusnya ${want}`);
  }
};
eq('ribuan', toNumber('112.000'), 112000);
eq('jutaan', toNumber('1.250.000'), 1250000);
eq('desimal koma', toNumber('0,6'), 0.6);
eq('desimal titik', toNumber('0.6'), 0.6);
eq('desimal koma ribuan', toNumber('1.250,5'), 1250.5);
eq('pecahan', toNumber('3/4'), 0.75);
eq('pecahan negatif', toNumber('−1/4'), -0.25);
eq('campuran', toNumber('4 1/4'), 4.25);
eq('minus unicode', toNumber('−16'), -16);
eq('bukan angka', toNumber('abc'), null);
eq('cek senilai', checkNum({ ans: ['4/8'] }, '1/2').ok, true);
eq('cek exact', checkNum({ ans: ['2/3'], exact: true }, '4/6').ok, false);
eq('cek exact benar', checkNum({ ans: ['2/3'], exact: true }, '2/3').ok, true);
eq('cek salah umum', checkNum({ ans: ['-3'], wrong: { 3: 'x' } }, '3').why, 'x');
eq('cek uang', checkNum({ ans: ['112000'] }, '112.000').ok, true);
eq('rupiah', toNumber('Rp60.000'), 60000);
eq('rupiah spasi', toNumber('Rp 1.260.000'), 1260000);
eq('persen', toNumber('25%'), 25);
eq('kilogram', toNumber('49 kg'), 49);
eq('cek kosong', checkNum({ ans: ['1'] }, '  ').empty, true);
console.log(fail ? `${fail} uji gagal` : 'Semua uji jawaban lolos.');
process.exitCode = fail ? 1 : 0;
