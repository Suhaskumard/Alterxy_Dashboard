// READINESS — performance-based preparation readiness (not a pass prediction).
import { DOMAINS, EXAM } from '../data/domains.js';
import * as E from '../engine.js';
import { esc, pct, bar, ring, sparkline } from '../ui.js';

export function render(ctx) {
  const S = ctx.S, now = ctx.now();
  const R = E.readiness(S, now);
  const weak = E.weakAreas(S, now, R.mastery);
  const mocks = S.attempts.filter(a => a.kind === 'mock');
  const lastMock = mocks[mocks.length - 1];
  const html = `
  <div class="page-head"><div><div class="eyebrow">Based on how you perform</div><h1>Preparation Readiness</h1>
    <p>Readiness comes from what you have shown you can do (mastery, assessment accuracy, challenges and mocks), not from how many pages you've opened.</p></div></div>

  <div class="callout warn" style="margin-bottom:16px"><b>This is a preparation measure, not an official pass prediction.</b>
    It summarises your performance inside this program. The real exam is set and scored by Alteryx (${EXAM.questions} questions, ${EXAM.passMark}% to pass), and no score here guarantees a result.</div>

  <div class="split">
    <div class="card pad">
      <div class="row" style="gap:24px;align-items:center">
        ${ring(R.score / 100, { size: 150, stroke: 12, label: 'of 100', value: Math.round(R.score) })}
        <div style="flex:1;min-width:200px">
          <span class="chip acc">${esc(R.band)}</span>
          <p class="small dim" style="margin-top:8px">Bands: 0–49 building foundations · 50–69 developing · 70–84 approaching ready · 85+ exam-ready preparation. Aim for 85+ with every domain at 70%+ before booking.</p>
        </div>
      </div>
      <h3 style="margin:18px 0 8px">How the score is built</h3>
      ${R.parts.map(p => `<div style="margin-bottom:12px">
        <div class="row between small"><span><b>${esc(p.label)}</b> <span class="dim">· weight ${p.weight}%</span></span><span class="tnum"><b>${Math.round(p.value)}</b>/100 → <b>${(p.weight * p.value / 100).toFixed(1)}</b> pts</span></div>
        ${bar(p.value / 100)}<div class="xs dim" style="margin-top:3px">${esc(p.note)}</div></div>`).join('')}
    </div>
    <div class="stack">
      <div class="card"><div class="hd"><h2>Score trend</h2></div><div class="bd">${sparkline(S.attempts.map(a => a.score), { ref: EXAM.passMark })}
        <div class="xs dim">Every assessment attempt, in order. Dashed line: ${EXAM.passMark}% reference.</div></div></div>
      <div class="card"><div class="hd"><h2>Mocks</h2></div><div class="bd">${lastMock
        ? `<div class="row between"><span>Latest: ${esc(lastMock.title)}</span><b class="tnum">${lastMock.score}%</b></div>${bar(lastMock.score / 100, 'var(--accent)', EXAM.passMark / 100)}
           <div class="xs dim" style="margin-top:6px">Best mock: ${R.bestMock}%.</div>`
        : `<div class="empty">No mock taken yet. Mock performance is 30% of readiness. <a href="#/quiz/mockA">Mock A</a> is scheduled for Day 26.</div>`}</div></div>
    </div>
  </div>

  <section class="card" style="margin-top:16px">
    <div class="hd"><h2>By domain</h2><span class="xs dim">target: mastery and accuracy ≥ 70% in every domain</span></div>
    <div class="bd tbl-wrap"><table class="tbl">
      <thead><tr><th>Domain</th><th>Exam weight</th><th>Mastery</th><th>Accuracy</th><th>Latest mock</th><th>Status</th></tr></thead>
      <tbody>${DOMAINS.map(d => { const s = R.domains[d.id]; const mk = lastMock && lastMock.byDomain[d.id];
        const mkp = mk ? mk[0] / mk[1] : null;
        const ok = s.mastery >= 0.7 && (s.acc ?? 0) >= 0.7;
        const mid = s.mastery >= 0.4 || (s.acc ?? 0) >= 0.6;
        return `<tr><td><span class="dot" style="background:var(--${d.id})"></span> <b>${d.id}</b> ${esc(d.name)}</td><td class="tnum">${d.weight}%</td>
        <td style="min-width:120px"><span class="tnum">${pct(s.mastery)}</span>${bar(s.mastery, `var(--${d.id})`, 0.7, 'thin')}</td>
        <td class="tnum">${pct(s.acc)}</td><td class="tnum">${mkp == null ? '–' : pct(mkp)}</td>
        <td><span class="chip ${ok ? 'ok' : mid ? 'warn' : 'crit'}">${ok ? 'On track' : mid ? 'Developing' : 'Needs work'}</span></td></tr>`; }).join('')}</tbody></table></div>
  </section>

  <section class="card" style="margin-top:16px">
    <div class="hd"><h2>Weak areas & recommended revision</h2><span class="chip ${weak.length ? 'crit' : 'ok'}">${weak.length} flagged</span></div>
    <div class="bd">${weak.length ? `<p class="small dim">Ranked by exam weight × size of the gap. For each topic: re-read its Learn step, rebuild its Guided Build from memory, then take the targeted quiz.</p>
      <div class="tbl-wrap"><table class="tbl"><thead><tr><th>#</th><th>Topic</th><th>Why it's flagged</th><th>Revise</th></tr></thead><tbody>
      ${weak.map((w, i) => `<tr><td class="tnum">${i + 1}</td><td><b>${esc(w.topic.name)}</b><div class="xs dim">${w.topic.domain} · taught Day ${w.day}</div></td>
        <td class="small">${w.reasons.map(esc).join('<br>')}</td>
        <td><div class="row"><a class="btn sm" href="#/day/${w.day}/learn">Lesson</a><a class="btn sm" href="#/day/${w.day}/build">Rebuild</a></div></td></tr>`).join('')}
      </tbody></table></div><div style="margin-top:12px"><a class="btn primary" href="#/quiz/weak">Start targeted weak-topic quiz →</a></div>`
      : '<div class="empty">No weak areas right now. Weak areas are flagged automatically when accuracy drops below 70%, confidence is 2 or less, a topic falls behind schedule, or you miss it in a mock.</div>'}</div>
  </section>`;
  return { title: 'Readiness', html };
}
