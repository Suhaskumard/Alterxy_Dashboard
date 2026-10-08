// 28-DAY COURSE — four weeks of day cards.
import { DAYS } from '../data/curriculum.js';
import { topicById } from '../data/topics.js';
import * as E from '../engine.js';
import { esc, fmtMin, fmtDate, domainChip, bar, levelBadge } from '../ui.js';

const WEEKS = [
  [1, 'Advanced Data Preparation', 'Domain 1, the largest domain (27%). Formulas, dates, generated rows, RegEx, parsing, joining and investigation.'],
  [2, 'Data Sources & Reporting', 'Domains 4 (15%) and 2 (10%): dynamic inputs, blobs, APIs, DCM, In-DB, then the reporting chain. Ends with a checkpoint and Domain 1 spaced revision.'],
  [3, 'Spatial & Macros', 'Domains 3 (10%) and 5 (18%): spatial objects, matching and distances, then standard, batch and iterative macros, plus a boss build.'],
  [4, 'Apps, Productionizing & Mocks', 'Domain 6 (20%), then a five-domain capstone, Mock A, targeted remediation, and Mock B with final readiness.'],
];

export function render(ctx) {
  const S = ctx.S, cal = E.calendarDay(S, ctx.now());
  const html = `
  <div class="page-head"><div><div class="eyebrow">The program</div><h1>28-Day Course</h1>
    <p>Each day has one objective and six steps. Time is allocated by exam weight and difficulty, and every week ends with a checkpoint. Click any day to open it.</p></div>
    <a class="btn primary" href="#/today">Go to today →</a></div>
  ${WEEKS.map(([w, name, blurb]) => `
    <div class="week-h"><h2>Week ${w} · ${esc(name)}</h2></div>
    <p class="small dim" style="margin:-4px 0 12px">${esc(blurb)}</p>
    <div class="daycards">${DAYS.filter(d => d.week === w).map(d => {
      const p = E.dayProgress(S, d.n);
      const lv = d.topics.length ? Math.min(...d.topics.map(t => E.topicMastery(S, t).level)) : null;
      const kind = d.assessment.kind;
      const tag = kind === 'weekly' ? '<span class="chip warn">Checkpoint</span>' : kind === 'mock' ? '<span class="chip crit">Mock exam</span>' : kind === 'targeted' ? '<span class="chip acc">Remediation</span>' : '';
      const dt = E.dateOfDay(S, d.n);
      return `<a class="daycard ${d.n === cal ? 'today' : ''}" href="#/day/${d.n}" style="--dc:var(--${d.domain})">
        <div class="row between"><span class="eyebrow">Day ${d.n}${dt ? ' · ' + fmtDate(dt) : ''}</span>${d.n === cal ? '<span class="chip warn">Today</span>' : p === 1 ? '<span class="chip ok">✓ Done</span>' : ''}</div>
        <div class="t">${esc(d.title)}</div>
        <div class="row" style="gap:6px">${domainChip(d.domain)} ${tag}</div>
        <div class="xs dim">${d.topics.slice(0, 3).map(t => esc(topicById[t].name)).join(' · ') || 'All domains'}</div>
        <div class="foot"><span class="xs dim">⏱ ${fmtMin(d.totalMinutes)}</span>${lv != null ? levelBadge(lv) : ''}</div>
        ${bar(p, `var(--${d.domain})`, null, 'thin')}
      </a>`;
    }).join('')}</div>`).join('')}`;
  return { title: 'Course', html };
}
