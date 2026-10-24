// Narasi suara memakai Web Speech API bawaan perangkat (tanpa server).
// Hanya aktif jika perangkat punya suara Bahasa Indonesia.

let voice = null;
let listeners = [];
const supported = typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;

function pickVoice() {
  if (!supported) return;
  const vs = window.speechSynthesis.getVoices() || [];
  const id = vs.filter((v) => /^(id|in)([-_]|$)/i.test(v.lang));
  voice = id.find((v) => v.localService) || id[0] || null;
  listeners.forEach((f) => f());
}

if (supported) {
  pickVoice();
  window.speechSynthesis.addEventListener?.('voiceschanged', pickVoice);
}

export const speech = {
  get supported() {
    return supported;
  },
  get available() {
    return supported && !!voice;
  },
  onChange(f) {
    listeners.push(f);
  },
  speak(text, rate, { onboundary, onend } = {}) {
    if (!this.available) return null;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = voice.lang || 'id-ID';
    u.voice = voice;
    u.rate = rate;
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      onend && onend();
    };
    u.onend = finish;
    u.onerror = finish;
    if (onboundary) u.onboundary = (e) => onboundary(e.charIndex);
    window.speechSynthesis.speak(u);
    return { cancel: () => { done = true; window.speechSynthesis.cancel(); } };
  },
  cancel() {
    if (supported) window.speechSynthesis.cancel();
  },
};
