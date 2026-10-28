// Pengaturan produk yang sering diubah: materi gratis, paket, metode bayar.

// Materi yang bisa dicoba tanpa akun dan tanpa langganan (3 per jenjang).
// Demo animasi di beranda membuka materi-materi ini.
export const FREE = {
  SD: ['k1b6-1', 'k3b2-2', 'k6b2-1'],
  SMP: ['b1-2', 'b3-2', 'k8b2-1'],
  SMA: ['k10b6-1', 'k10b4-1', 'k12lb3-1'],
};
export const FREE_SET = new Set(Object.values(FREE).flat());

// HARGA CONTOH untuk prototipe. Ganti setelah uji harga dengan pengunjung sungguhan.
export const PLANS = [
  { id: 'bulanan', months: 1, price: 49000 },
  { id: 'tahunan', months: 12, price: 399000, best: true },
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
