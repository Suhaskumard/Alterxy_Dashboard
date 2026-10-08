// Small rendering helpers shared by views.
import { domainById } from './data/domains.js';
import { LEVELS } from './engine.js';

export function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
/** Tiny inline markup: `code`, **bold**, newlines. Everything else escaped. */
export function md(s) {
  return esc(s)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
    .replace(/\n/g, '<br>');
}
export const pct = v => (v == null ? '–' : Math.round(v * 100) + '%');
export const fmtMin = m => (m >= 60 ? `${Math.floor(m / 60)}h${m % 60 ? ' ' + (m % 60) + 'm' : ''}` : `${m}m`);
export const fmtDate = d => (d ? d.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' }) : '');
export const fmtWhen = ts => new Date(ts).toLocaleString(undefined, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });

export function domainChip(id, long = false) {
  if (id === 'ALL') return `<span class="chip"><span class="dot" style="background:var(--ALL)"></span>All domains</span>`;
  const d = domainById[id];
  return `<span class="chip"><span class="dot" style="background:var(--${id})"></span>${id} · ${esc(long ? d.name : d.short)} <span class="dim">${d.weight}%</span></span>`;
}

export function levelBadge(level) {
  const bars = [1, 2, 3, 4].map(i => `<b style="${i <= level ? `background:var(--L${level})` : ''}"></b>`).join('');
  return `<span class="lvl" style="color:var(--L${level})"><i>${bars}</i>${LEVELS[level]}</span>`;
}

export function bar(frac, color = 'var(--accent)', mark = null, cls = '') {
  const w = Math.max(0, Math.min(1, frac || 0)) * 100;
  return `<div class="bar ${cls}"><i style="width:${w}%;background:${color}"></i>${mark != null ? `<span class="mark" style="left:${mark * 100}%"></span>` : ''}</div>`;
}

export function ring(frac, { size = 120, stroke = 10, color = 'var(--accent)', track = 'var(--ring-track)', label = '', value = null } = {}) {
  const r = (size - stroke) / 2, c = 2 * Math.PI * r, f = Math.max(0, Math.min(1, frac || 0));
  return `<div class="ring-wrap" style="width:${size}px;height:${size}px">
    <svg class="ring" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" aria-hidden="true">
      <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${track}" stroke-width="${stroke}"/>
      <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"
        stroke-dasharray="${c.toFixed(1)}" stroke-dashoffset="${(c * (1 - f)).toFixed(1)}" transform="rotate(-90 ${size / 2} ${size / 2})"/>
    </svg>
    <div class="ring-lbl"><b class="tnum">${value ?? Math.round(f * 100) + '%'}</b><span>${esc(label)}</span></div>
  </div>`;
}

export function sparkline(values, { max = 100, ref = null } = {}) {
  if (!values.length) return '<div class="empty">No attempts yet.</div>';
  const W = 300, H = 70, pad = 6, n = values.length;
  const x = i => (n === 1 ? W / 2 : pad + (i * (W - 2 * pad)) / (n - 1));
  const y = v => H - pad - (v / max) * (H - 2 * pad);
  const pts = values.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  return `<svg class="spark" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" role="img" aria-label="Score trend">
    ${ref != null ? `<line x1="0" x2="${W}" y1="${y(ref)}" y2="${y(ref)}" stroke="var(--warn)" stroke-dasharray="4 4" stroke-width="1"/>` : ''}
    <polyline points="${pts}" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
    ${values.map((v, i) => `<circle cx="${x(i)}" cy="${y(v)}" r="3.5" fill="var(--accent)"/>`).join('')}
  </svg>`;
}

let toastTimer;
export function toast(msg) {
  let t = document.querySelector('.toast');
  if (!t) { t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
  t.textContent = msg; t.hidden = false;
  clearTimeout(toastTimer); toastTimer = setTimeout(() => { t.hidden = true; }, 2200);
}
