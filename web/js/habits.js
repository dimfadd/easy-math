// Kebiasaan belajar dan status tugas, dihitung dari data progres (dipakai siswa, orang tua, dan guru).
import { LESSONS, BAB } from '../content/index.js';
import { dayKey } from './store.js';
import { lessonTitle, babTitle } from './l10n.js';
import { t } from './i18n.js';

const DAY = 86400000;

// Runtutan: berapa hari berturut-turut ada kegiatan belajar, sampai hari ini (atau kemarin bila hari ini belum).
export function streak(days = {}, now = Date.now()) {
  let n = 0;
  let d = now;
  if (!days[dayKey(d)]) d -= DAY;
  while (days[dayKey(d)]) {
    n++;
    d -= DAY;
  }
  return n;
}

// Hari belajar pada minggu berjalan (Senin sampai Minggu)
export function weekDays(days = {}, now = Date.now()) {
  const d = new Date(now);
  const dow = (d.getDay() + 6) % 7; // Senin = 0
  let n = 0;
  for (let k = 0; k <= dow; k++) if (days[dayKey(now - k * DAY)]) n++;
  return n;
}

// Status tugas untuk satu siswa. Selesai bila dikerjakan setelah tugas dibuat (materi: kapan pun ditonton).
export function taskStatus(task, progress = {}, now = Date.now()) {
  const w = progress.watched || {};
  const s = progress.scores || {};
  let at = 0;
  let score = null;
  if (task.kind === 'materi') at = w[task.target] || 0;
  else {
    const x = s[task.target];
    if (x && (x.at || 0) >= task.createdAt) {
      at = x.at;
      score = { ok: x.last ?? x.best, total: x.total };
    }
  }
  const done = !!at;
  return { done, at, score, late: done && at > task.due, overdue: !done && now > task.due };
}

export function taskTitle(task) {
  if (task.kind === 'uji') {
    const b = BAB.find((x) => x.id === task.target);
    return t('task.uji', { title: b ? babTitle(b) : task.target });
  }
  const e = LESSONS.get(task.target);
  const title = e ? lessonTitle(e.lesson) : task.target;
  return t(task.kind === 'materi' ? 'task.materi' : 'task.latihan', { title });
}

export const taskHref = (task) => (task.kind === 'uji' ? `#/uji/${task.target}` : task.kind === 'materi' ? `#/materi/${task.target}` : `#/latihan/${task.target}`);
