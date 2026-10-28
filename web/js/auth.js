// Sesi pengguna: akun yang masuk (orang tua, siswa, guru) dan profil belajar yang aktif.
// Sesi disimpan di perangkat agar aplikasi tetap bisa dibuka saat offline.
import * as api from './api.js';
import { store } from './store.js';
import { sync } from './sync.js';
import { FREE_SET } from './config.js';

const KEY = 'easymath.session.v1';
let session = null;
try {
  session = JSON.parse(localStorage.getItem(KEY) || 'null');
} catch {
  session = null;
}
const listeners = new Set();

function persist() {
  try {
    if (session) localStorage.setItem(KEY, JSON.stringify(session));
    else localStorage.removeItem(KEY);
  } catch {
    /* abaikan: sesi tetap ada di memori */
  }
  listeners.forEach((f) => f());
}

function activate(profile) {
  session.profile = profile || null;
  store.useProfile(profile ? profile.id : null);
  persist();
  if (profile) sync.pull(profile.id);
}

if (session && session.profile) store.useProfile(session.profile.id);

export const auth = {
  get loggedIn() {
    return !!session;
  },
  get account() {
    return session ? session.account : null;
  },
  get profile() {
    return session ? session.profile : null;
  },
  // 'anak' bila masuk dengan nama pengguna + PIN
  get role() {
    if (!session) return 'tamu';
    return session.kid ? 'anak' : session.account.role;
  },
  get hasAccess() {
    return !!session && api.planActive(session.account.plan);
  },
  canOpen(lessonId) {
    return FREE_SET.has(lessonId) || this.hasAccess;
  },
  onChange(f) {
    listeners.add(f);
    return () => listeners.delete(f);
  },

  async login(email, pass) {
    const account = await api.login(email, pass);
    session = { account, profile: null, kid: false };
    let profile = null;
    if (account.role === 'siswa' && account.profiles[0]) profile = await api.getProfile(account.profiles[0]);
    activate(profile);
    return account;
  },
  async loginKid(username, pin) {
    const { account, profile } = await api.loginKid(username, pin);
    session = { account, profile: null, kid: true };
    activate(profile);
    return profile;
  },
  async signup(fields) {
    const account = await api.signup(fields);
    session = { account, profile: null, kid: false };
    let profile = null;
    if (account.role === 'siswa' && account.profiles[0]) profile = await api.getProfile(account.profiles[0]);
    activate(profile);
    return account;
  },
  async selectProfile(pid) {
    if (!session) return;
    const p = pid ? await api.getProfile(pid) : null;
    if (p && p.ownerId !== session.account.id) return;
    activate(p);
  },
  // Ambil ulang data akun (misalnya setelah membayar)
  async refresh() {
    if (!session) return;
    try {
      const a = await api.getAccount(session.account.id);
      if (a) session.account = a;
      if (session.profile) {
        const p = await api.getProfile(session.profile.id);
        if (p) session.profile = p;
      }
      persist();
    } catch {
      /* offline: pakai salinan terakhir */
    }
  },
  setAccount(a) {
    if (!session || !a) return;
    session.account = a;
    persist();
  },
  setProfile(p) {
    if (!session || !p) return;
    session.profile = p;
    persist();
  },
  logout() {
    session = null;
    store.useProfile(null);
    persist();
  },
};
