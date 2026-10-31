// Progres belajar disimpan di perangkat (localStorage), terpisah untuk setiap profil.
// Tamu (belum masuk) memakai kunci lama supaya progres sebelum ada akun tidak hilang.
// Pengaturan (tema, bahasa, suara, kecepatan) berlaku untuk perangkat, bukan per profil.
// Semua akses dibungkus try/catch: mode privat atau penyimpanan diblokir tidak boleh merusak aplikasi.

const GUEST_KEY = 'easymath.k7.v1';
const SETTINGS_KEY = 'easymath.settings.v1';
const progKey = (pid) => (pid ? `easymath.progress.${pid}` : GUEST_KEY);

// recent: 0/1 per jawaban terakhir per materi · seen: kapan soal bank terakhir muncul
// items: [dijawab, salah] per jenis soal · days: banyak jawaban per tanggal (runtutan dan target)
const empty = () => ({ watched: {}, scores: {}, recent: {}, seen: {}, items: {}, days: {}, last: null, updatedAt: 0 });
export const dayKey = (ms = Date.now()) => {
  const d = new Date(ms);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

let persistent = true;
const read = (k) => {
  try {
    const raw = localStorage.getItem(k);
    return raw ? JSON.parse(raw) : null;
  } catch {
    persistent = false;
    return null;
  }
};
const write = (k, v) => {
  try {
    localStorage.setItem(k, JSON.stringify(v));
    persistent = true;
  } catch {
    persistent = false;
  }
};

// Pengaturan: pindahkan dari format lama bila perlu
let settings = read(SETTINGS_KEY);
if (!settings) {
  settings = (read(GUEST_KEY) || {}).settings || {};
  write(SETTINGS_KEY, settings);
}

let profileId = null;
let data = { ...empty(), ...(read(GUEST_KEY) || {}) };
delete data.settings;
const listeners = new Set();

function bumpDay() {
  data.days = data.days || {};
  const k = dayKey();
  data.days[k] = (data.days[k] || 0) + 1;
}

function save() {
  data.updatedAt = Date.now();
  const key = progKey(profileId);
  if (!profileId) {
    // kunci tamu juga menyimpan pengaturan lama agar versi sebelumnya tetap terbaca
    write(key, { ...data, settings });
  } else write(key, data);
  listeners.forEach((f) => f(profileId));
}

export const store = {
  get persistent() {
    return persistent;
  },
  get settings() {
    return settings;
  },
  setSetting(k, v) {
    settings[k] = v;
    write(SETTINGS_KEY, settings);
  },
  get profileId() {
    return profileId;
  },
  // Ganti profil aktif (null = tamu). Data diambil dari salinan lokal profil itu.
  useProfile(pid) {
    profileId = pid || null;
    data = { ...empty(), ...(read(progKey(profileId)) || {}) };
    delete data.settings;
  },
  snapshot() {
    return JSON.parse(JSON.stringify(data));
  },
  // Dipakai sinkronisasi: ganti isi dengan hasil gabungan dari server tanpa memicu kirim ulang.
  replace(next, pid = profileId) {
    if (pid !== profileId) {
      write(progKey(pid), next);
      return;
    }
    data = { ...empty(), ...next };
    write(progKey(profileId), data);
  },
  onChange(f) {
    listeners.add(f);
    return () => listeners.delete(f);
  },
  isWatched(id) {
    return !!data.watched[id];
  },
  markWatched(id) {
    if (!data.watched[id]) {
      data.watched[id] = Date.now();
      bumpDay();
      save();
    }
  },
  recent(id) {
    return (data.recent || {})[id] || [];
  },
  seenAt(id) {
    return (data.seen || {})[id] || {};
  },
  get items() {
    return data.items || {};
  },
  get days() {
    return data.days || {};
  },
  // Satu jawaban latihan: id materi (atau bab untuk uji), kunci soal, benar/salah
  recordAnswer(id, key, ok) {
    data.recent = data.recent || {};
    data.seen = data.seen || {};
    data.items = data.items || {};
    data.recent[id] = [...(data.recent[id] || []), ok ? 1 : 0].slice(-20);
    if (key && key.includes('#')) (data.seen[id] = data.seen[id] || {})[key] = Date.now();
    if (key) {
      const it = (data.items[key] = data.items[key] || [0, 0]);
      it[0]++;
      if (!ok) it[1]++;
    }
    bumpDay();
    save();
  },
  score(id) {
    return data.scores[id] || null;
  },
  saveScore(id, correct, total) {
    const prev = data.scores[id];
    const best = prev ? Math.max(prev.best, correct) : correct;
    data.scores[id] = { best, total, last: correct, at: Date.now() };
    save();
  },
  setLast(id) {
    data.last = id;
    save();
  },
  get last() {
    return data.last;
  },
  reset() {
    data = empty();
    save();
  },
};
