// HOME / OVERVIEW
import { DAYS } from '../data/curriculum.js';
import { DOMAINS, EXAM } from '../data/domains.js';
import * as E from '../engine.js';
import { esc, md, fmtMin, fmtDate, fmtWhen, domainChip, ring, bar, pct, toast } from '../ui.js';

function onboarding(ctx) {
  const today = new Date(); const ymd = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  return {
    html: `
    <section class="hero">
      <div class="hero-grid">
        <div>
          <div class="eyebrow">Alteryx Designer Advanced Certification</div>
          <h1>28 days from "I know Designer" to certification-ready.</h1>
          <p>Each day gives you one clear objective and six steps: <b style="color:#fff">Learn → Guided Build → Practice → Challenge → Assessment → Review</b>.
          It covers all six exam domains, weighted like the official blueprint, with 15 real Alteryx Weekly Challenges, 3 weekly checkpoints, 2 certification-style mocks
          and a readiness score based on how you actually perform, not on boxes you've ticked.</p>
          <div class="row" style="margin-top:16px">
            <label class="small" for="startIn" style="color:var(--hero-dim)">Day 1 is</label>
            <input type="date" id="startIn" value="${ymd}">
            <button type="button" class="btn light" data-act="start">Start the program →</button>
          </div>
        </div>
        <div class="grid g2" style="gap:10px">
          ${DOMAINS.map(d => `<div class="hstat"><b>${d.weight}%</b><span>${d.id} · ${esc(d.short)}</span></div>`).join('')}
        </div>
      </div>
    </section>
    <div class="grid g3" style="margin-top:16px">
      <div class="card pad"><div class="eyebrow">Week 1</div><h3 style="margin:4px 0 6px">Advanced Data Prep</h3><p class="small dim">Multi-Row and Multi-Field Formula, DateTime, Generate Rows, RegEx, Find Replace, Join Multiple, investigation tools.</p></div>
      <div class="card pad"><div class="eyebrow">Week 2</div><h3 style="margin:4px 0 6px">Data Sources & Reporting</h3><p class="small dim">Dynamic Input and Rename, Directory, Blob, Download, DCM, In-DB, then Table, Chart, Layout, Render and Email.</p></div>
      <div class="card pad"><div class="eyebrow">Weeks 3–4</div><h3 style="margin:4px 0 6px">Spatial, Macros, Apps & Mocks</h3><p class="small dim">Spatial tools, standard, batch and iterative macros, interface tools, Action and Condition, productionizing, a capstone and the final mocks.</p></div>
    </div>`,
    mount(el) {
      el.querySelector('[data-act="start"]').addEventListener('click', () => {
        const v = el.querySelector('#startIn').value;
        if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) { toast('Pick a valid date'); return; }
        ctx.S.start = v; ctx.save(); toast('Program started. Here is Day 1.'); location.hash = '#/today';
      });
    },
  };
}

export function render(ctx) {
  const S = ctx.S, now = ctx.now();
  if (!S.start) return { title: 'Welcome', ...onboarding(ctx) };
  const cal = E.calendarDay(S, now), cd = E.currentDay(S, now), d = DAYS[cd - 1];
  const R = E.readiness(S, now);
  const weak = E.weakAreas(S, now);
  const next = E.nextAction(S, now);
  const done = E.completedDays(S);
  const masteryAvg = Object.values(R.mastery).reduce((a, m) => a + m.level / 4, 0) / Object.keys(R.mastery).length;
  const recent = [...S.attempts].reverse().slice(0, 5);
  const startsIn = E.startsIn(S, now);
  const finish = E.dateOfDay(S, 28);
  const status = cal === 0 ? `Starts in ${startsIn} day${startsIn === 1 ? '' : 's'}` : cal > 28 ? 'Program complete' : `Day ${cal} of 28`;

  const html = `
  <section class="hero">
    <div class="hero-grid">
      <div>
        <div class="eyebrow">${esc(status)} · ${E.daysRemaining(S, now)} days remaining · finish ${fmtDate(finish)}</div>
        <h1>${cal === 0 ? 'Get ready: Day 1 is ' + fmtDate(E.dateOfDay(S, 1)) : cal > 28 ? 'All 28 days are behind you.' : `Today: ${esc(d.title)}`}</h1>
        <p style="max-width:62ch">${cal > 28 ? 'Use targeted quizzes and mocks to keep your weakest domains sharp until exam day.' : md(d.objective)}</p>
        <div class="row" style="margin-top:12px">
          ${domainChip(d.domain)} <span class="chip">⏱ ${fmtMin(d.totalMinutes)} today</span> <span class="chip">Week ${d.week}</span>
        </div>
        <div class="row" style="margin-top:18px">
          <a class="btn light" href="${next.href}">▶ ${esc(next.label)}</a>
          <span class="small" style="color:var(--hero-dim)">${esc(next.why)}</span>
        </div>
      </div>
      <div class="row" style="justify-content:center;gap:18px">
        ${ring(done / 28, { size: 128, color: '#ffffff', track: 'rgba(255,255,255,.18)', label: 'Days done', value: `${done}/28` })}
        ${ring(masteryAvg, { size: 128, color: '#7ef0c8', track: 'rgba(255,255,255,.18)', label: 'Mastery' })}
        ${ring(R.score / 100, { size: 128, color: '#ffd27a', track: 'rgba(255,255,255,.18)', label: 'Readiness', value: Math.round(R.score) })}
      </div>
    </div>
  </section>

  <section class="card pad" style="margin-top:16px">
    <div class="row between" style="margin-bottom:10px"><span class="eyebrow">28-day progress · click any day</span><span class="xs dim">filled = all 6 steps done · outlined = today</span></div>
    <div class="strip">${DAYS.map(x => { const p = E.dayProgress(S, x.n); return `<a href="#/day/${x.n}" class="${p === 1 ? 'done' : ''} ${x.n === cal ? 'today' : ''}" title="Day ${x.n}: ${esc(x.title)}">${p > 0 && p < 1 ? `<i style="height:${p * 100}%"></i>` : ''}<span>${x.n}</span></a>`; }).join('')}</div>
  </section>

  <div class="split" style="margin-top:16px">
    <div class="stack">
      <div class="card">
        <div class="hd"><h2>Domain mastery vs exam weight</h2><a href="#/domains" class="small">Details →</a></div>
        <div class="bd">${DOMAINS.map(dm => { const s = R.domains[dm.id]; return `
          <div style="margin-bottom:12px"><div class="row between small"><span><span class="dot" style="background:var(--${dm.id})"></span> <b>${dm.id}</b> ${esc(dm.name)}</span>
          <span class="tnum"><b>${pct(s.mastery)}</b> mastery · ${pct(s.acc)} accuracy · <span class="dim">${dm.weight}% of exam</span></span></div>
          ${bar(s.mastery, `var(--${dm.id})`)}</div>`; }).join('')}</div>
      </div>
      <div class="card">
        <div class="hd"><h2>Recent performance</h2><a href="#/assessments" class="small">All assessments →</a></div>
        <div class="bd">${recent.length ? `<table class="tbl"><tbody>${recent.map(a => `<tr><td>${esc(a.title)}<div class="xs dim">${fmtWhen(a.at)}</div></td>
          <td style="text-align:right"><span class="chip ${a.score >= 85 ? 'ok' : a.score >= 70 ? 'acc' : 'crit'} tnum">${a.score}%</span></td></tr>`).join('')}</tbody></table>`
          : '<div class="empty">No assessments yet. Your first one is in today\'s Assessment step.</div>'}</div>
      </div>
    </div>
    <div class="stack">
      <div class="card">
        <div class="hd"><h2>Weak areas</h2><span class="chip ${weak.length ? 'crit' : 'ok'}">${weak.length}</span></div>
        <div class="bd">${weak.length ? weak.slice(0, 4).map(w => `
          <div style="padding:8px 0;border-bottom:1px solid var(--line-soft)">
            <div class="row between"><b class="small">${esc(w.topic.name)}</b><a class="btn sm" href="#/day/${w.day}/learn">Revise</a></div>
            <div class="xs dim">${w.topic.domain} · ${esc(w.reasons.join(' · '))}</div></div>`).join('') + `<div style="margin-top:10px"><a class="btn sm primary" href="#/quiz/weak">Targeted weak-topic quiz →</a></div>`
          : '<div class="empty">No weak areas flagged yet. They appear automatically from low scores, low confidence or topics that fall behind schedule.</div>'}</div>
      </div>
      <div class="card">
        <div class="hd"><h2>Preparation readiness</h2><a href="#/readiness" class="small">Breakdown →</a></div>
        <div class="bd">
          <div class="row between"><b style="font:800 30px Sora" class="tnum">${Math.round(R.score)}<span class="dim" style="font-size:16px">/100</span></b><span class="chip acc">${esc(R.band)}</span></div>
          ${R.parts.map(p => `<div class="row between xs" style="margin-top:8px"><span>${esc(p.label)} <span class="dim">(${p.weight}%)</span></span><span class="tnum">${Math.round(p.value)}</span></div>${bar(p.value / 100, 'var(--accent)', null, 'thin')}`).join('')}
          <p class="xs dim" style="margin-top:10px">Based on your performance in this program. It is not an official prediction of passing. Exam pass mark: ${EXAM.passMark}%.</p>
        </div>
      </div>
    </div>
  </div>`;
  return { title: 'Home', html };
}
