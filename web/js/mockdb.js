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
  { email: 'guru@demo.id', role: 'guru', note: 'Guru Kelas 7A: 3 siswa, 4 tugas, kode kelas HRP7A2' },
];
export const DEMO_KIDS = [
  { username: 'raka', note: 'Anak dari ortu@demo.id, kelas 3' },
  { username: 'nadia', note: 'Anak dari ortu@demo.id, kelas 8' },
  { username: 'dimas', note: 'Anak dari ortu.baru@demo.id, kelas 5 (belum berlangganan)' },
];

const dk = (ms) => {
  const d = new Date(ms);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};
function prog(now, list, items = {}) {
  // list: [id, hariLalu, skorBenar?, total?]
  const watched = {};
  const scores = {};
  const days = {};
  const recent = {};
  let last = null;
  let lastAt = 0;
  for (const [id, daysAgo, best, total] of list) {
    const at = now - daysAgo * DAY - Math.round(Math.random() * 6) * 3600000;
    watched[id] = at;
    days[dk(at)] = (days[dk(at)] || 0) + 1 + (best ?? 0);
    if (best !== undefined) {
      scores[id] = { best, total, last: best, at: at + 600000 };
      recent[id] = Array.from({ length: total }, (_, i) => (i < best ? 1 : 0));
    }
    if (at > lastAt) {
      lastAt = at;
      last = id;
    }
  }
  return { watched, scores, recent, seen: {}, items, days, last, updatedAt: now };
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
    p_ayu: prog(now, [['b1-1', 6, 5, 5], ['b1-2', 5, 5, 5], ['b1-3', 3, 4, 5], ['b1-4', 1, 4, 5]], { 'b1-1#0': [1, 0], 'b1-2#1': [1, 0], 'b1-2#3': [1, 0], 'b1-3#2': [1, 1], 'b1-4#4': [1, 1] }),
    p_bima: prog(now, [['b1-1', 6, 3, 5], ['b1-2', 4, 2, 5]], { 'b1-1#0': [1, 1], 'b1-1#3': [1, 1], 'b1-2#1': [1, 1], 'b1-2#3': [1, 1], 'b1-2#0': [1, 0] }),
    p_citra: prog(now, [['b1-1', 2, 5, 5]], { 'b1-1#0': [1, 0], 'b1-1#3': [1, 1], 'b1-1#2': [1, 0] }),
  };
  profiles.p_raka.goal = 4;
  profiles.p_nadia.goal = 3;
  for (const pid of ['p_ayu', 'p_bima', 'p_citra']) profiles[pid].classes = ['c_7a'];
  // Kelas guru dan tugasnya. Tugas dianggap selesai bila dikerjakan setelah tugas dibuat.
  const classes = { c_7a: { id: 'c_7a', ownerId: 'a_ratna', name: 'Kelas 7A', kelas: '7', code: 'HRP7A2', students: ['p_ayu', 'p_bima', 'p_citra'] } };
  const assignments = {
    t_1: { id: 't_1', classId: 'c_7a', kind: 'materi', target: 'b1-1', createdAt: now - 8 * DAY, due: now - 4 * DAY },
    t_2: { id: 't_2', classId: 'c_7a', kind: 'latihan', target: 'b1-2', createdAt: now - 7 * DAY, due: now - 1 * DAY },
    t_3: { id: 't_3', classId: 'c_7a', kind: 'latihan', target: 'b1-3', createdAt: now - 4 * DAY, due: now + 2 * DAY },
    t_4: { id: 't_4', classId: 'c_7a', kind: 'uji', target: 'b1', createdAt: now - 1 * DAY, due: now + 5 * DAY },
  };
  return { v: 2, accounts, profiles, progress, classes, assignments };
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
  if (!db || db.v !== 2) {
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
