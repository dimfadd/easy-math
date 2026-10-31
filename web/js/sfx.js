// Efek suara Capie: bunyi robot 8-bit saat Capie lepas landas dan mendarat.
// Disintesis langsung dengan Web Audio (tanpa berkas audio), mengikuti cara
// claude-animation-skill menyintesis suaranya: gelombang kotak/segitiga pendek dengan amplop cepat.
//
// Hanya berbunyi di halaman belajar (materi, latihan, uji bab) dan bisa dimatikan.
// Pilihan disimpan di pengaturan perangkat (store.settings.sfx).
import { store } from './store.js';
import { t } from './i18n.js';

let ac = null;
let master = null;

function ctx() {
  if (ac) return ac;
  const AC = typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext);
  if (!AC) return null;
  ac = new AC();
  master = ac.createGain();
  master.gain.value = 0.55;
  master.connect(ac.destination);
  return ac;
}

// satu nada pendek: tipe gelombang, frekuensi awal → akhir, mulai (detik dari sekarang), lama, volume
function tone(type, f0, f1, at, dur, vol = 0.12) {
  const c = ctx();
  if (!c || c.state !== 'running') return;
  const t0 = c.currentTime + at;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.setValueAtTime(f0, t0);
  if (f1 !== f0) o.frequency.exponentialRampToValueAtTime(f1, t0 + dur);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(vol, t0 + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  o.connect(g).connect(master);
  o.start(t0);
  o.stop(t0 + dur + 0.02);
}

const LEARN = /^#\/(materi|latihan|uji)\//;
const allowed = () => store.settings.sfx !== false && typeof location !== 'undefined' && LEARN.test(location.hash);

export const sfx = {
  get on() {
    return store.settings.sfx !== false;
  },
  set(on) {
    store.setSetting('sfx', !!on);
    syncButtons();
    if (on) this.blip();
  },
  // lepas landas: "bwiip" naik + dua bip robot
  takeoff() {
    if (!allowed()) return;
    tone('square', 330, 990, 0, 0.16, 0.07);
    tone('triangle', 660, 1320, 0.02, 0.14, 0.09);
    tone('square', 1568, 1568, 0.17, 0.045, 0.05);
    tone('square', 2093, 2093, 0.22, 0.05, 0.05);
  },
  // mendarat: "bip-bup" turun + dentum kecil
  land() {
    if (!allowed()) return;
    tone('sine', 150, 55, 0, 0.12, 0.22);
    tone('square', 988, 988, 0.02, 0.05, 0.05);
    tone('square', 659, 523, 0.08, 0.08, 0.05);
  },
  // konfirmasi saat efek suara dinyalakan
  blip() {
    tone('square', 1047, 1047, 0, 0.05, 0.05);
    tone('square', 1568, 1568, 0.06, 0.07, 0.05);
  },
};

// ---------- tombol nyala/mati ----------
const ICON_ON =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="7" width="14" height="11" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="9.5" cy="12.5" r="1.4" fill="currentColor"/><circle cx="14.5" cy="12.5" r="1.4" fill="currentColor"/><path d="M12 7V4M10 4h4M2.5 11v3M21.5 11v3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
const ICON_OFF =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="7" width="14" height="11" rx="3" fill="none" stroke="currentColor" stroke-width="2" opacity=".55"/><path d="M8.5 12.5h2M13.5 12.5h2M12 7V4M10 4h4" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M4 4l16 16" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>';

const label = (on) => (on ? t('sfx.turnOff') : t('sfx.turnOn'));

// cls: kelas tombol (mis. "ctl" di pemutar materi, "icon-btn" di latihan)
export function sfxButton(cls = 'ctl') {
  const on = sfx.on;
  return `<button type="button" class="${cls} sfx-btn" data-sfx-toggle aria-pressed="${on}" aria-label="${label(on)}" title="${label(on)}">${on ? ICON_ON : ICON_OFF}</button>`;
}

function syncButtons() {
  const on = sfx.on;
  document.querySelectorAll('[data-sfx-toggle]').forEach((b) => {
    b.setAttribute('aria-pressed', String(on));
    b.setAttribute('aria-label', label(on));
    b.title = label(on);
    b.innerHTML = on ? ICON_ON : ICON_OFF;
  });
}

if (typeof document !== 'undefined') {
  // Browser hanya mengizinkan suara setelah pengguna berinteraksi.
  const unlock = () => {
    const c = ctx();
    if (c && c.state === 'suspended') c.resume();
  };
  ['pointerdown', 'keydown', 'touchstart'].forEach((ev) => addEventListener(ev, unlock, { passive: true, capture: true }));
  document.addEventListener('click', (e) => {
    const b = e.target.closest?.('[data-sfx-toggle]');
    if (b) sfx.set(!sfx.on);
  });
}
