// Progres belajar disimpan di perangkat (localStorage).
// Semua akses dibungkus try/catch: mode privat atau penyimpanan diblokir tidak boleh merusak aplikasi.

const KEY = 'easymath.k7.v1';

const empty = () => ({ watched: {}, scores: {}, settings: {}, last: null });

let data = empty();
let persistent = true;

try {
  const raw = localStorage.getItem(KEY);
  if (raw) data = { ...empty(), ...JSON.parse(raw) };
} catch {
  persistent = false;
}

function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
    persistent = true;
  } catch {
    persistent = false;
  }
}

export const store = {
  get persistent() {
    return persistent;
  },
  get settings() {
    return data.settings;
  },
  setSetting(k, v) {
    data.settings[k] = v;
    save();
  },
  isWatched(id) {
    return !!data.watched[id];
  },
  markWatched(id) {
    if (!data.watched[id]) {
      data.watched[id] = Date.now();
      save();
    }
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
    const settings = data.settings;
    data = empty();
    data.settings = settings;
    save();
  },
};
