// Pengaturan produk yang sering diubah: materi gratis, paket, metode bayar.

// Materi yang bisa dicoba tanpa akun dan tanpa langganan (3 per jenjang).
// Demo animasi di beranda membuka materi-materi ini.
export const FREE = {
  SD: ['k1b6-1', 'k3b2-2', 'k6b2-1'],
  SMP: ['b1-2', 'b3-2', 'k8b2-1'],
  SMA: ['k10b6-1', 'k10b4-1', 'k12lb3-1'],
};
export const FREE_SET = new Set(Object.values(FREE).flat());

// Harga Paket Keluarga (sampai 4 anak). Dasar penetapan ada di docs/arah-produk.md bagian 6.1:
// di bawah Ruangguru per anak, di atas Zenius, setara Astra AI per orang, tetapi untuk satu keluarga.
// Masih perlu divalidasi dengan survei harga ke orang tua sebelum peluncuran.
export const PLANS = [
  { id: 'bulanan', months: 1, price: 99000 },
  { id: 'semester', months: 6, price: 399000 },
  { id: 'tahunan', months: 12, price: 699000, best: true },
];
export const TRIAL_DAYS = 7;
export const MAX_CHILDREN = 4;

export const PAY_METHODS = [
  { id: 'qris', label: 'QRIS' },
  { id: 'ewallet', label: 'GoPay · OVO · DANA · ShopeePay' },
  { id: 'va', label: 'Virtual Account (BCA, BNI, BRI, Mandiri)' },
  { id: 'card', label: 'Kartu debit/kredit' },
];

export const rupiah = (n) => `Rp${Number(n).toLocaleString('id-ID')}`;
