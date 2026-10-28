// Sinkronisasi progres, offline-first:
// - Progres selalu ditulis ke perangkat dulu, jadi belajar tetap jalan tanpa internet.
// - Setiap perubahan dikirim ke server sesudah jeda singkat; gagal karena offline akan dicoba
//   lagi begitu koneksi kembali.
// - Saat masuk atau ganti profil, data perangkat dan server digabung (bukan ditimpa):
//   materi yang pernah ditonton di salah satu perangkat tetap tercatat, skor terbaik dipakai.
import * as api from './api.js';
import { store } from './store.js';

let status = 'idle'; // idle | pending | syncing | synced | offline
let lastSync = 0;
let timer = null;
const listeners = new Set();

function set(s) {
  status = s;
  if (s === 'synced') lastSync = Date.now();
  listeners.forEach((f) => f(status));
}

async function push() {
  const pid = store.profileId;
  if (!pid) return;
  set('syncing');
  try {
    const merged = await api.pushProgress(pid, store.snapshot());
    store.replace(merged, pid);
    set('synced');
  } catch (e) {
    set(e && e.code === 'offline' ? 'offline' : 'pending');
  }
}

export const sync = {
  get status() {
    return status;
  },
  get lastSync() {
    return lastSync;
  },
  onChange(f) {
    listeners.add(f);
    return () => listeners.delete(f);
  },
  // Gabungkan data perangkat dan server untuk satu profil
  async pull(pid) {
    if (!pid) return;
    set('syncing');
    try {
      const remote = await api.pullProgress(pid);
      const merged = api.mergeProgress(store.profileId === pid ? store.snapshot() : {}, remote);
      store.replace(merged, pid);
      await api.pushProgress(pid, merged);
      set('synced');
    } catch (e) {
      set(e && e.code === 'offline' ? 'offline' : 'pending');
    }
  },
  schedule() {
    if (!store.profileId) return;
    set(navigator.onLine === false ? 'offline' : 'pending');
    clearTimeout(timer);
    timer = setTimeout(push, 1200);
  },
  flush: push,
};

store.onChange((pid) => {
  if (pid) sync.schedule();
});
if (typeof window !== 'undefined') {
  window.addEventListener('online', () => {
    if (store.profileId && status !== 'synced') push();
  });
  window.addEventListener('offline', () => {
    if (store.profileId) set('offline');
  });
}
