// "Server" tiruan untuk tahap pengembangan: data akun, profil, langganan, dan progres
// disimpan di localStorage perangkat ini. Bentuk datanya sama dengan yang nanti disimpan
// di database sungguhan, jadi js/api.js cukup diganti isinya saat server siap.
//
// PERINGATAN: kata sandi disimpan apa adanya dan semua pemeriksaan terjadi di browser.
// Ini hanya untuk prototipe; jangan dipakai untuk data pengguna sungguhan.

const KEY = 'easymath.mockdb.v1';
const DAY = 86400000;

// Akun demo. Kata sandi semua akun dewasa: demo123. PIN semua anak: 1234.
export const DEMO_ACCOUNTS = [
  { email: 'ortu@demo.id', role: 'ortu', note: 'Orang tua, langganan Keluarga aktif, 2 anak' },
  { email: 'ortu.baru@demo.id', role: 'ortu', note: 'Orang tua tanpa langganan (untuk mencoba alur bayar)' },
  { email: 'siswa@demo.id', role: 'siswa', note: 'Siswa SMA mandiri, masa uji coba' },
  { email: 'guru@demo.id', role: 'guru', note: 'Guru dengan satu kelas berisi 3 siswa' },
];
export const DEMO_KIDS = [
  { username: 'raka', note: 'Anak dari ortu@demo.id, kelas 3' },
  { username: 'nadia', note: 'Anak dari ortu@demo.id, kelas 8' },
  { username: 'dimas', note: 'Anak dari ortu.baru@demo.id, kelas 5 (belum berlangganan)' },
];

function prog(now, list) {
  // list: [id, hariLalu, skorBenar?, total?]
  const watched = {};
  const scores = {};
  let last = null;
  let lastAt = 0;
  for (const [id, daysAgo, best, total] of list) {
    const at = now - daysAgo * DAY - Math.round(Math.random() * 6) * 3600000;
    watched[id] = at;
    if (best !== undefined) scores[id] = { best, total, last: best, at: at + 600000 };
    if (at > lastAt) {
      lastAt = at;
      last = id;
    }
  }
  return { watched, scores, last, updatedAt: now };
}

function seed() {
  const now = Date.now();
  const accounts = {
    a_sari: { id: 'a_sari', email: 'ortu@demo.id', pass: 'demo123', role: 'ortu', name: 'Sari Wulandari', plan: { status: 'active', planId: 'tahunan', until: now + 300 * DAY }, profiles: ['p_raka', 'p_nadia'], invoices: [{ id: 'INV-DEMO-1', planId: 'tahunan', amount: 699000, method: 'qris', paidAt: now - 65 * DAY }] },
    a_budi: { id: 'a_budi', email: 'ortu.baru@demo.id', pass: 'demo123', role: 'ortu', name: 'Budi Santoso', plan: { status: 'none' }, profiles: ['p_dimas'], invoices: [] },
    a_kevin: { id: 'a_kevin', email: 'siswa@demo.id', pass: 'demo123', role: 'siswa', name: 'Kevin Pratama', plan: { status: 'trial', planId: 'bulanan', until: now + 5 * DAY }, profiles: ['p_kevin'], invoices: [] },
    a_ratna: { id: 'a_ratna', email: 'guru@demo.id', pass: 'demo123', role: 'guru', name: 'Ratna Dewi', school: 'SMP Harapan · Kelas 7A', plan: { status: 'active', planId: 'sekolah', until: now + 200 * DAY }, profiles: ['p_ayu', 'p_bima', 'p_citra'], invoices: [] },
  };
  const P = (id, name, username, kelas, color, ownerId) => ({ id, name, username, pin: '1234', kelas, color, ownerId });
  const profiles = {
    p_raka: P('p_raka', 'Raka', 'raka', '3', '#FFC22E', 'a_sari'),
    p_nadia: P('p_nadia', 'Nadia', 'nadia', '8', '#7BD3A8', 'a_sari'),
    p_dimas: P('p_dimas', 'Dimas', 'dimas', '5', '#9DB6FF', 'a_budi'),
    p_kevin: P('p_kevin', 'Kevin', 'kevin', '11', '#FF9F87', 'a_kevin'),
    p_ayu: P('p_ayu', 'Ayu', 'ayu', '7', '#FFC22E', 'a_ratna'),
    p_bima: P('p_bima', 'Bima', 'bima', '7', '#9DB6FF', 'a_ratna'),
    p_citra: P('p_citra', 'Citra', 'citra', '7', '#7BD3A8', 'a_ratna'),
  };
  const progress = {
    p_raka: prog(now, [['k3b1-1', 9, 5, 5], ['k3b1-2', 8, 4, 5], ['k3b1-3', 6, 5, 5], ['k3b2-1', 4, 3, 5], ['k3b2-2', 2, 2, 5], ['k3b2-3', 1]]),
    p_nadia: prog(now, [['k8b1-1', 12, 5, 5], ['k8b1-2', 11, 4, 5], ['k8b1-3', 7, 4, 5], ['k8b1-4', 5, 3, 5], ['k8b2-1', 3, 5, 5], ['k8b2-2', 0, 2, 5]]),
    p_dimas: prog(now, [['k5b1-1', 3, 4, 5]]),
    p_kevin: prog(now, [['k11b1-1', 2, 4, 5], ['k11b1-2', 1, 3, 5]]),
    p_ayu: prog(now, [['b1-1', 6, 5, 5], ['b1-2', 5, 5, 5], ['b1-3', 3, 4, 5], ['b1-4', 1, 4, 5]]),
    p_bima: prog(now, [['b1-1', 6, 3, 5], ['b1-2', 4, 2, 5]]),
    p_citra: prog(now, [['b1-1', 2, 5, 5]]),
  };
  return { v: 1, accounts, profiles, progress };
}

let db = null;
export function load() {
  if (db) return db;
  try {
    const raw = localStorage.getItem(KEY);
    db = raw ? JSON.parse(raw) : null;
  } catch {
    db = null;
  }
  if (!db || db.v !== 1) {
    db = seed();
    save();
  }
  return db;
}
export function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(db));
  } catch {
    /* penyimpanan penuh atau diblokir: data tetap ada di memori selama halaman terbuka */
  }
}
export function reset() {
  db = seed();
  save();
  return db;
}
