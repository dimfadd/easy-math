// Lapisan API. Saat ini memanggil "server" tiruan di js/mockdb.js.
// Saat server sungguhan siap, ganti isi fungsi di sini dengan fetch() ke endpoint;
// tampilan dan logika lain tidak perlu diubah karena hanya memakai fungsi-fungsi ini.
import * as mock from './mockdb.js';
import { PLANS, TRIAL_DAYS, MAX_CHILDREN } from './config.js';

const DAY = 86400000;
const wait = (ms = 220) => new Promise((r) => setTimeout(r, ms));

export class ApiError extends Error {
  constructor(code) {
    super(code);
    this.code = code;
  }
}

function requireOnline() {
  if (typeof navigator !== 'undefined' && navigator.onLine === false) throw new ApiError('offline');
}

const clone = (x) => (x == null ? x : JSON.parse(JSON.stringify(x)));
const publicAccount = (a) => {
  if (!a) return null;
  const { pass, ...rest } = a; // kata sandi tidak pernah dikirim ke tampilan
  void pass;
  return clone(rest);
};

// ---------- Gabungan progres (dipakai juga oleh server sungguhan nanti) ----------
export function mergeProgress(a = {}, b = {}) {
  const out = { watched: { ...(a.watched || {}) }, scores: { ...(a.scores || {}) }, last: a.last ?? null, updatedAt: a.updatedAt || 0 };
  for (const [id, at] of Object.entries(b.watched || {})) out.watched[id] = Math.max(out.watched[id] || 0, at);
  for (const [id, s] of Object.entries(b.scores || {})) {
    const c = out.scores[id];
    if (!c) out.scores[id] = { ...s };
    else {
      const newer = (s.at || 0) > (c.at || 0) ? s : c;
      out.scores[id] = { best: Math.max(c.best, s.best), total: newer.total, last: newer.last, at: newer.at };
    }
  }
  const newerSide = (b.updatedAt || 0) > (a.updatedAt || 0) ? b : a;
  // riwayat jawaban: ambil versi perangkat yang lebih baru per materi
  out.recent = { ...(a.recent || {}) };
  for (const [id, r] of Object.entries(b.recent || {})) if (!out.recent[id] || newerSide === b) out.recent[id] = r;
  out.seen = { ...(a.seen || {}) };
  for (const [id, m] of Object.entries(b.seen || {})) {
    const c = (out.seen[id] = { ...(out.seen[id] || {}) });
    for (const [k, at] of Object.entries(m)) c[k] = Math.max(c[k] || 0, at);
  }
  out.items = { ...(a.items || {}) };
  for (const [k, v] of Object.entries(b.items || {})) {
    const c = out.items[k] || [0, 0];
    out.items[k] = [Math.max(c[0], v[0]), Math.max(c[1], v[1])];
  }
  out.days = { ...(a.days || {}) };
  for (const [k, n] of Object.entries(b.days || {})) out.days[k] = Math.max(out.days[k] || 0, n);
  if ((b.updatedAt || 0) > (a.updatedAt || 0)) out.last = b.last ?? out.last;
  out.updatedAt = Math.max(a.updatedAt || 0, b.updatedAt || 0);
  return out;
}

// ---------- Akun ----------
export async function login(email, pass) {
  await wait();
  requireOnline();
  const db = mock.load();
  const a = Object.values(db.accounts).find((x) => x.email.toLowerCase() === String(email).trim().toLowerCase());
  if (!a || a.pass !== pass) throw new ApiError('bad_credentials');
  return publicAccount(a);
}

export async function loginKid(username, pin) {
  await wait();
  requireOnline();
  const db = mock.load();
  const p = Object.values(db.profiles).find((x) => x.username === String(username).trim().toLowerCase());
  if (!p || p.pin !== String(pin).trim()) throw new ApiError('bad_credentials');
  return { account: publicAccount(db.accounts[p.ownerId]), profile: clone(p) };
}

export async function signup({ name, email, pass, role, kelas }) {
  await wait();
  requireOnline();
  const db = mock.load();
  email = String(email).trim().toLowerCase();
  if (!name || !email || !pass) throw new ApiError('missing');
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) throw new ApiError('bad_email');
  if (String(pass).length < 6) throw new ApiError('short_pass');
  if (Object.values(db.accounts).some((x) => x.email === email)) throw new ApiError('email_taken');
  const id = `a_${Date.now().toString(36)}`;
  const acc = { id, email, pass, role: role === 'siswa' ? 'siswa' : 'ortu', name: String(name).trim(), plan: { status: 'none' }, profiles: [], invoices: [] };
  db.accounts[id] = acc;
  if (acc.role === 'siswa') {
    const p = newProfile(db, id, acc.name.split(' ')[0], kelas || '7');
    acc.profiles.push(p.id);
  }
  mock.save();
  return publicAccount(acc);
}

export async function getAccount(id) {
  await wait(60);
  return publicAccount(mock.load().accounts[id]);
}

export async function listProfiles(accountId) {
  await wait(60);
  const db = mock.load();
  const a = db.accounts[accountId];
  return a ? a.profiles.map((pid) => clone(db.profiles[pid])).filter(Boolean) : [];
}

export async function getProfile(id) {
  await wait(40);
  return clone(mock.load().profiles[id]);
}

function newProfile(db, ownerId, name, kelas) {
  const base = String(name).toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 10) || 'anak';
  let username = base;
  let n = 2;
  while (Object.values(db.profiles).some((p) => p.username === username)) username = `${base}${n++}`;
  const colors = ['#FFC22E', '#7BD3A8', '#9DB6FF', '#FF9F87', '#C9A7FF'];
  const id = `p_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 5)}`;
  const p = { id, name: String(name).trim(), username, pin: String(Math.floor(1000 + Math.random() * 9000)), kelas: String(kelas), color: colors[Object.keys(db.profiles).length % colors.length], ownerId };
  db.profiles[id] = p;
  db.progress[id] = { watched: {}, scores: {}, last: null, updatedAt: Date.now() };
  return p;
}

export async function addChild(accountId, { name, kelas }) {
  await wait();
  requireOnline();
  const db = mock.load();
  const a = db.accounts[accountId];
  if (!a) throw new ApiError('no_account');
  if (!String(name || '').trim()) throw new ApiError('missing');
  if (a.profiles.length >= MAX_CHILDREN) throw new ApiError('too_many');
  const p = newProfile(db, accountId, name, kelas);
  a.profiles.push(p.id);
  mock.save();
  return clone(p);
}

export async function updateProfile(pid, patch) {
  await wait(120);
  requireOnline();
  const db = mock.load();
  const p = db.profiles[pid];
  if (!p) throw new ApiError('no_profile');
  if (patch.kelas) p.kelas = String(patch.kelas);
  if (patch.name) p.name = String(patch.name).trim();
  mock.save();
  return clone(p);
}

// ---------- Progres (sinkronisasi) ----------
export async function pullProgress(pid) {
  await wait(160);
  requireOnline();
  return clone(mock.load().progress[pid]) || { watched: {}, scores: {}, last: null, updatedAt: 0 };
}

export async function pushProgress(pid, data) {
  await wait(160);
  requireOnline();
  const db = mock.load();
  db.progress[pid] = mergeProgress(db.progress[pid], data);
  mock.save();
  return clone(db.progress[pid]);
}

// ---------- Langganan dan pembayaran ----------
export function planActive(plan, now = Date.now()) {
  return !!plan && (plan.status === 'active' || plan.status === 'trial') && (plan.until || 0) > now;
}

export async function startTrial(accountId) {
  await wait();
  requireOnline();
  const db = mock.load();
  const a = db.accounts[accountId];
  if (!a) throw new ApiError('no_account');
  if (a.trialUsed) throw new ApiError('trial_used');
  a.trialUsed = true;
  a.plan = { status: 'trial', planId: 'bulanan', until: Date.now() + TRIAL_DAYS * DAY };
  mock.save();
  return publicAccount(a);
}

export async function createInvoice(accountId, planId, method) {
  await wait();
  requireOnline();
  const db = mock.load();
  const a = db.accounts[accountId];
  const plan = PLANS.find((p) => p.id === planId);
  if (!a || !plan) throw new ApiError('bad_request');
  const inv = {
    id: `INV-${Date.now().toString(36).toUpperCase()}`,
    planId,
    amount: plan.price,
    method,
    status: 'pending',
    createdAt: Date.now(),
    expiresAt: Date.now() + DAY,
    // nomor VA tiruan
    payCode: method === 'va' ? `8808${String(Date.now()).slice(-10)}` : null,
  };
  a.invoices = [inv, ...(a.invoices || [])];
  mock.save();
  return clone(inv);
}

// Di server sungguhan, langkah ini dipicu webhook gerbang pembayaran, bukan oleh tombol.
export async function simulatePaid(accountId, invoiceId) {
  await wait(500);
  requireOnline();
  const db = mock.load();
  const a = db.accounts[accountId];
  const inv = a && a.invoices.find((x) => x.id === invoiceId);
  if (!inv) throw new ApiError('no_invoice');
  inv.status = 'paid';
  inv.paidAt = Date.now();
  const plan = PLANS.find((p) => p.id === inv.planId);
  const from = planActive(a.plan) && a.plan.status === 'active' ? a.plan.until : Date.now();
  a.plan = { status: 'active', planId: inv.planId, until: from + plan.months * 30 * DAY, autoRenew: true };
  mock.save();
  return publicAccount(a);
}

export async function cancelRenewal(accountId) {
  await wait();
  requireOnline();
  const db = mock.load();
  const a = db.accounts[accountId];
  if (a && a.plan) a.plan.autoRenew = false;
  mock.save();
  return publicAccount(a);
}

// Data dasbor orang tua/guru: profil + progres masing-masing.
export async function familyReport(accountId) {
  await wait(160);
  requireOnline();
  const db = mock.load();
  const a = db.accounts[accountId];
  if (!a) return [];
  return a.profiles.map((pid) => ({ profile: clone(db.profiles[pid]), progress: clone(db.progress[pid]) || { watched: {}, scores: {} } }));
}

export function resetDemo() {
  mock.reset();
}
