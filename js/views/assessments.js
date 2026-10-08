// ASSESSMENTS — checkpoints, mocks, targeted practice, history.
import { ASSESSMENTS, DAYS } from '../data/curriculum.js';
import { DOMAINS, EXAM } from '../data/domains.js';
import * as E from '../engine.js';
import { esc, fmtWhen, sparkline } from '../ui.js';

function card(S, a, extra = '') {
  const best = E.bestAttempt(S, a.id), last = E.latestAttempt(S, a.id), draft = S.drafts[a.id];
  const n = S.attempts.filter(x => x.quiz === a.id).length;
  return `<div class="card pad stack">
    <div class="row between"><span class="eyebrow">${a.kind === 'mock' ? 'Mock exam' : 'Weekly checkpoint'} · Day ${a.day}</span>
      ${best ? `<span class="chip ${best.score >= (a.kind === 'mock' ? EXAM.passMark : 70) ? 'ok' : 'crit'} tnum">Best ${best.score}%</span>` : '<span class="chip">Not taken</span>'}</div>
    <h3>${esc(a.title)}</h3>
    <div class="small dim">${a.questions.length} questions · ${a.minutes} min${extra}${n ? ` · ${n} attempt${n > 1 ? 's' : ''}, last ${fmtWhen(last.at)}` : ''}</div>
    <div><a class="btn ${best ? '' : 'primary'} sm" href="#/quiz/${a.id}">${draft && !draft.pending ? 'Resume' : best ? 'View result / retake' : 'Start'} →</a></div>
  </div>`;
}

const linkFor = id => (id.startsWith('day-') ? `#/day/${id.slice(4)}/assess` : `#/quiz/${id}`);

export function render(ctx) {
  const S = ctx.S;
  const daily = DAYS.filter(d => d.quiz.length);
  const dailyDone = daily.filter(d => E.latestAttempt(S, `day-${d.n}`));
  const hist = [...S.attempts].reverse();
  const weak = E.weakAreas(S, ctx.now());
  const html = `
  <div class="page-head"><div><div class="eyebrow">Prove it</div><h1>Assessments</h1>
    <p>Daily quizzes check each day's topics. Weekly checkpoints check whole weeks. The two mocks are certification-style practice weighted like the exam blueprint. Every answer updates topic mastery, weak areas and readiness.</p></div></div>

  <h2 style="margin-bottom:10px">Final mocks</h2>
  <div class="grid g2">${card(S, ASSESSMENTS.mockA, ' · all 6 domains')}${card(S, ASSESSMENTS.mockB, ' · fresh questions')}</div>
  <p class="xs dim" style="margin-top:8px">The mocks test concepts, tool selection, configuration, output interpretation, troubleshooting and workflow reasoning. They are practice material written for this program, not a replica of the official exam (51 questions, ${EXAM.minutes / 60} hours, ${EXAM.passMark}% to pass).</p>

  <h2 style="margin:24px 0 10px">Weekly checkpoints</h2>
  <div class="grid g3">${['w1', 'w2', 'w3'].map(id => card(S, ASSESSMENTS[id])).join('')}</div>

  <h2 style="margin:24px 0 10px">Targeted practice</h2>
  <div class="grid g2">
    <div class="card pad stack"><span class="eyebrow">Adaptive</span><h3>Weak-topic quiz</h3>
      <div class="small dim">12 questions from ${weak.length ? 'your top weak topics: ' + weak.slice(0, 3).map(w => esc(w.topic.name)).join(', ') : 'the whole course (no weak areas flagged yet)'}. Questions you missed come first, then ones you haven't seen.</div>
      <div><a class="btn primary sm" href="#/quiz/weak">${S.drafts.weak ? 'Resume' : 'Start'} →</a></div></div>
    <div class="card pad stack"><span class="eyebrow">By domain</span><h3>Domain practice sets</h3>
      <div class="small dim">10 questions from one domain, again starting with ones you missed.</div>
      <div class="row">${DOMAINS.map(d => `<a class="btn sm" href="#/quiz/domain-${d.id}"><span class="dot" style="background:var(--${d.id})"></span>${d.id} ${esc(d.short)}</a>`).join('')}</div></div>
  </div>

  <div class="split" style="margin-top:24px">
    <div class="card"><div class="hd"><h2>History</h2><span class="chip">${hist.length} attempts</span></div>
      <div class="bd">${hist.length ? `<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Assessment</th><th>When</th><th>Score</th></tr></thead><tbody>
        ${hist.slice(0, 40).map(a => `<tr><td><a href="${linkFor(a.quiz)}">${esc(a.title)}</a></td>
        <td class="small dim">${fmtWhen(a.at)}</td><td><span class="chip ${a.score >= 85 ? 'ok' : a.score >= 70 ? 'acc' : 'crit'} tnum">${a.score}%</span></td></tr>`).join('')}</tbody></table></div>` : '<div class="empty">No attempts yet.</div>'}</div></div>
    <div class="card"><div class="hd"><h2>Daily quizzes</h2><span class="chip">${dailyDone.length}/${daily.length}</span></div>
      <div class="bd"><div class="eyebrow" style="margin-bottom:6px">Score trend (all attempts)</div>${sparkline(S.attempts.map(a => a.score), { ref: 70 })}
        <div class="qnav" style="margin-top:12px">${daily.map(d => { const a = E.latestAttempt(S, `day-${d.n}`); return `<a href="#/day/${d.n}/assess" class="${a ? (a.score >= 70 ? 'right' : 'wrong') : ''}" title="Day ${d.n}${a ? ': ' + a.score + '%' : ''}">${d.n}</a>`; }).join('')}</div>
        <p class="xs dim" style="margin-top:8px">Green means 70% or more on the latest attempt; red means below 70%. Click a day to open its assessment.</p></div></div>
  </div>`;
  return { title: 'Assessments', html };
}
