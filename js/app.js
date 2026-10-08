// Boot, theme, router.
import { load, save as persist } from './state.js';
import { calendarDay, currentDay } from './engine.js';
import * as home from './views/home.js';
import * as day from './views/day.js';
import * as course from './views/course.js';
import * as domains from './views/domains.js';
import * as challenges from './views/challenges.js';
import * as assessments from './views/assessments.js';
import * as quiz from './views/quiz.js';
import * as readiness from './views/readiness.js';
import * as settings from './views/settings.js';
import { esc } from './ui.js';

const root = document.getElementById('view');
const cleanups = [];

export const ctx = {
  S: load(),
  now: () => Date.now(),
  save() { persist(ctx.S); updateChrome(); },
  rerender() { route(false); },
  onLeave(fn) { cleanups.push(fn); },
};

const ROUTES = {
  home: () => home.render(ctx),
  today: () => day.render(ctx, currentDay(ctx.S, ctx.now())),
  day: p => day.render(ctx, +p[0], p[1]),
  course: () => course.render(ctx),
  domains: p => domains.render(ctx, p[0]),
  challenges: () => challenges.render(ctx),
  assessments: () => assessments.render(ctx),
  quiz: p => quiz.renderPage(ctx, p[0]),
  readiness: () => readiness.render(ctx),
  settings: () => settings.render(ctx),
};

function applyTheme() {
  const t = ctx.S.theme;
  if (t === 'auto') document.documentElement.removeAttribute('data-theme');
  else document.documentElement.setAttribute('data-theme', t);
  const b = document.getElementById('themeBtn');
  b.textContent = { auto: '◐', light: '☀', dark: '☾' }[t];
  b.title = `Theme: ${t} (click to change)`;
}

function updateChrome() {
  const cd = calendarDay(ctx.S, ctx.now());
  document.getElementById('daypill').textContent = !ctx.S.start ? 'Not started' : cd === 0 ? 'Starts soon' : cd > 28 ? 'Complete' : `Day ${cd} / 28`;
}

function route(scrollTop = true) {
  while (cleanups.length) { try { cleanups.pop()(); } catch (e) { /* ignore */ } }
  const parts = (location.hash.replace(/^#\/?/, '') || 'home').split('/').filter(Boolean);
  let name = parts[0];
  if (!ROUTES[name]) name = 'home';
  if (name === 'day' && !(+parts[1] >= 1 && +parts[1] <= 28)) name = 'today';
  let out;
  try { out = ROUTES[name](parts.slice(1)); }
  catch (e) { console.error(e); out = { html: `<div class="callout crit">Something went wrong rendering this page: ${esc(e.message)}</div>` }; }
  // Fresh container per render so listeners attached by views never accumulate.
  const host = document.createElement('div');
  host.innerHTML = out.html;
  root.replaceChildren(host);
  if (out.mount) out.mount(host);
  const navKey = name === 'day' ? (+parts[1] === currentDay(ctx.S, ctx.now()) ? 'today' : 'course') : name === 'quiz' ? 'assessments' : name;
  document.querySelectorAll('[data-nav]').forEach(a => a.classList.toggle('on', a.dataset.nav === navKey));
  document.title = `${out.title ? out.title + ' · ' : ''}Alteryx Advanced Mastery`;
  updateChrome();
  if (scrollTop) window.scrollTo(0, 0);
}

document.getElementById('themeBtn').addEventListener('click', () => {
  const order = ['auto', 'light', 'dark'];
  ctx.S.theme = order[(order.indexOf(ctx.S.theme) + 1) % 3];
  applyTheme(); ctx.save();
});

window.addEventListener('hashchange', () => route(true));
window.addEventListener('themechange', applyTheme);
// Re-render at midnight / when returning to the tab so "today" stays correct.
let lastDay = calendarDay(ctx.S, ctx.now());
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && calendarDay(ctx.S, ctx.now()) !== lastDay) { lastDay = calendarDay(ctx.S, ctx.now()); route(false); }
});

applyTheme();
ctx.save(); // persist any one-time migration
route(false);
