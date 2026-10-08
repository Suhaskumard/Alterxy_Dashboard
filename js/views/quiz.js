// Quiz runner used inline (daily/weekly/targeted) and as a full page (mocks, practice sets).
import { getQuiz, recordAttempt, latestAttempt, scoreQuestion, syncAssessSteps } from '../engine.js';
import { QUESTIONS, domainOfQuestion } from '../data/curriculum.js';
import { DOMAINS, EXAM } from '../data/domains.js';
import { topicById } from '../data/topics.js';
import { esc, md, bar, pct, fmtWhen, toast } from '../ui.js';

const CAT = { concept: 'Concepts', tool: 'Tool selection', config: 'Configuration', output: 'Output interpretation', troubleshoot: 'Troubleshooting', reasoning: 'Workflow reasoning' };
const KEYS = 'ABCDEFGH';

function questionHTML(q, i, sel, { review = false, flagged = false, flaggable = false } = {}) {
  const multi = q.type === 'multi';
  const mine = sel === undefined ? (multi ? [] : null) : sel;
  const opts = q.o.map((o, k) => {
    const chosen = multi ? mine.includes(k) : mine === k;
    const correct = multi ? q.a.includes(k) : q.a === k;
    let cls = 'opt' + (multi ? ' multi' : '');
    if (review) { if (correct) cls += ' right'; else if (chosen) cls += ' wrong'; }
    else if (chosen) cls += ' sel';
    return `<button type="button" class="${cls}" data-q="${q.id}" data-k="${k}" ${review ? 'disabled' : ''} aria-pressed="${chosen}">
      <span class="k">${KEYS[k]}</span><span>${md(o)}</span></button>`;
  }).join('');
  const sc = review ? scoreQuestion(q, sel) : null;
  const topic = topicById[q.t[0]];
  return `<div class="q" id="q-${q.id}">
    <div class="qtop">
      <span class="eyebrow">Q${i + 1} · ${domainOfQuestion(q)} · ${esc(topic.name)}${q.cat ? ' · ' + CAT[q.cat] : ''}${multi ? ' · <span style="color:var(--accent)">Select all that apply</span>' : ''}</span>
      ${review ? `<span class="chip ${sc === 1 ? 'ok' : sc > 0 ? 'warn' : 'crit'}">${sc === 1 ? 'Correct' : sc > 0 ? `Partial ${Math.round(sc * 100)}%` : 'Incorrect'}</span>`
        : flaggable ? `<button type="button" class="flagbtn ${flagged ? 'on' : ''}" data-flag="${q.id}">⚑ ${flagged ? 'Flagged' : 'Flag'}</button>` : ''}
    </div>
    <div class="stem">${md(q.q)}</div>
    <div class="opts">${opts}</div>
    ${review ? `<div class="explain"><b>Why:</b> ${md(q.x)} <a href="#/day/${topic.day}/learn" class="small">Revise ${esc(topic.name)} →</a></div>` : ''}
  </div>`;
}

function resultHTML(quiz, attempt, { inline }) {
  const qs = (attempt.qids || Object.keys(attempt.sel)).map(id => QUESTIONS[id]).filter(Boolean);
  const isExamLike = quiz.kind === 'mock' || quiz.kind === 'weekly';
  const target = quiz.kind === 'mock' ? EXAM.passMark : 70;
  const status = attempt.score >= 85 ? ['ok', 'Strong'] : attempt.score >= target ? ['ok', quiz.kind === 'mock' ? `At or above the ${EXAM.passMark}% reference` : 'Meets the 70% mastery bar'] : ['crit', quiz.kind === 'mock' ? `Below the ${EXAM.passMark}% reference` : 'Below the 70% mastery bar'];
  const domains = DOMAINS.filter(d => attempt.byDomain[d.id]).map(d => {
    const [g, t] = attempt.byDomain[d.id];
    return `<div class="kv small"><span><span class="dot" style="background:var(--${d.id})"></span> ${d.id} · ${esc(d.short)} <span class="dim">(${t} q)</span></span><b class="tnum">${Math.round((g / t) * 100)}%</b></div>${bar(g / t, `var(--${d.id})`, isExamLike ? target / 100 : null, 'thin')}`;
  }).join('<div style="height:8px"></div>');
  const cats = Object.keys(attempt.byCat || {}).length ? Object.entries(attempt.byCat).map(([c, [g, t]]) =>
    `<div class="kv small"><span>${CAT[c]} <span class="dim">(${t})</span></span><b class="tnum">${Math.round((g / t) * 100)}%</b></div>${bar(g / t, 'var(--accent)', null, 'thin')}`).join('<div style="height:8px"></div>') : '';
  const weak = attempt.wrongTopics.map(t => topicById[t]).filter(Boolean)
    .map(t => `<a class="chip crit" href="#/day/${t.day}/learn">${esc(t.name)}</a>`).join(' ');
  return `
  <div class="score-hero">
    <div><div class="num tnum">${attempt.score}%</div><div class="dim small">${attempt.got} / ${attempt.total} points · ${fmtWhen(attempt.at)}</div></div>
    <div class="stack" style="flex:1;min-width:220px">
      <span class="chip ${status[0]}">${status[1]}</span>
      ${quiz.kind === 'mock' ? `<p class="small dim" style="margin:0">Practice mock written for this program. It shows the exam's style and domain weighting but is not an official exam replica.</p>` : ''}
    </div>
    <div class="row">
      <button type="button" class="btn" data-act="retake">↻ Retake</button>
      ${inline ? '' : '<a class="btn" href="#/assessments">All assessments</a>'}
    </div>
  </div>
  <div class="grid ${cats ? 'g3' : 'g2'}" style="margin-top:16px">
    <div class="tile"><div class="eyebrow" style="margin-bottom:8px">By domain</div>${domains}</div>
    ${cats ? `<div class="tile"><div class="eyebrow" style="margin-bottom:8px">By skill type</div>${cats}</div>` : ''}
    <div class="tile"><div class="eyebrow" style="margin-bottom:8px">Topics to revise</div>${weak || '<span class="small dim">No mistakes. Every topic in this set was answered correctly.</span>'}</div>
  </div>
  <details style="margin-top:16px" ${inline ? '' : 'open'}>
    <summary class="btn sm ghost" style="list-style:none">Review all answers & explanations</summary>
    <div style="margin-top:6px">${qs.map((q, i) => questionHTML(q, i, attempt.sel[q.id], { review: true })).join('')}</div>
  </details>`;
}

/**
 * Renders a quiz block. opts.inline = embedded in a day page.
 * Returns { html, mount }.
 */
export function quizBlock(ctx, quizId, { inline = false } = {}) {
  const S = ctx.S;
  const quiz = getQuiz(S, quizId, ctx.now());
  if (!quiz) return { html: '<div class="callout crit">Unknown assessment.</div>' };
  const draft = S.drafts[quiz.id];
  const last = latestAttempt(S, quiz.id);
  const timedKind = quiz.kind === 'mock';
  let mode = draft ? (draft.pending ? 'start' : 'taking') : last ? 'result' : (timedKind ? 'start' : 'taking');
  if (timedKind && inline && mode !== 'result') mode = 'link';

  const wrapId = 'qz-' + quiz.id;
  let html = '';
  if (mode === 'link') {
    html = `<div class="callout"><b>${esc(quiz.title)}</b><br><span class="small">${quiz.questions.length} questions · ${quiz.minutes} min · open book. Take it on its own page with the timer.</span>
      <div style="margin-top:10px"><a class="btn primary" href="#/quiz/${quiz.id}">Open ${esc(quiz.title.split(' (')[0])} →</a></div></div>`;
  } else if (mode === 'start') {
    html = `<div class="card pad stack">
      <div><div class="eyebrow">Certification-style practice</div><h2 style="margin-top:4px">${esc(quiz.title)}</h2></div>
      <p class="dim">${quiz.questions.length} questions across all six domains, weighted like the official blueprint. Covers concepts, tool selection, configuration, output interpretation, troubleshooting and workflow reasoning.
        Multi-select items give partial credit. Open book: keep Designer and the Help docs open. Your answers are saved as you go, so a refresh won't lose them.</p>
      <div class="callout warn small">This is practice material written for this program, not an official exam or a replica of one. The ${EXAM.passMark}% line is shown only as a reference.</div>
      <div class="row"><button type="button" class="btn primary" data-act="start-timed">Start with ${quiz.minutes}-minute timer</button><button type="button" class="btn" data-act="start-untimed">Start untimed</button></div>
    </div>`;
  } else if (mode === 'result') {
    html = resultHTML(quiz, last, { inline });
  } else {
    const d = draft || { sel: {}, flags: {} };
    const answered = quiz.questions.filter(q => d.sel[q.id] !== undefined && !(Array.isArray(d.sel[q.id]) && !d.sel[q.id].length)).length;
    const flaggable = !inline || quiz.questions.length > 8;
    html = `
      <div class="quiz-head" style="margin-bottom:6px">
        <div><div class="eyebrow">${esc(quiz.kind === 'daily' ? 'Daily assessment' : quiz.kind === 'weekly' ? 'Weekly checkpoint' : quiz.kind === 'mock' ? 'Mock exam' : 'Practice set')}</div>
          <h3 style="margin-top:3px">${esc(quiz.title)}</h3></div>
        ${d.timed ? `<div class="timer tnum" data-timer>--:--</div>` : ''}
      </div>
      ${flaggable ? `<div class="qnav" style="margin:10px 0">${quiz.questions.map((q, i) => `<a href="#q-${q.id}" data-jump="${q.id}" class="${d.sel[q.id] !== undefined ? 'ans' : ''} ${d.flags && d.flags[q.id] ? 'flag' : ''}">${i + 1}</a>`).join('')}</div>` : ''}
      <div>${quiz.questions.map((q, i) => questionHTML(q, i, d.sel[q.id], { flaggable, flagged: d.flags && d.flags[q.id] })).join('')}</div>
      <div class="step-foot">
        <span class="small dim"><b data-answered>${answered}</b> of ${quiz.questions.length} answered</span>
        <button type="button" class="btn primary" data-act="submit">Submit answers</button>
      </div>`;
  }

  return {
    html: `<div id="${wrapId}">${html}</div>`,
    mount(rootEl) {
      const el = rootEl.querySelector('#' + CSS.escape(wrapId));
      if (!el) return;
      const ensureDraft = () => S.drafts[quiz.id] || (S.drafts[quiz.id] = { sel: {}, flags: {}, startedAt: Date.now(), qids: quiz.generated ? quiz.questions.map(q => q.id) : undefined, title: quiz.title });
      let armed = false, timerId = null;

      const submit = (auto = false) => {
        const dr = ensureDraft();
        const fresh = getQuiz(S, quiz.id, ctx.now()); // generated quizzes resolve from draft
        recordAttempt(S, fresh, dr.sel);
        syncAssessSteps(S);
        ctx.save();
        toast(auto ? 'Time is up. Answers submitted.' : 'Assessment submitted');
        ctx.rerender();
        const t = document.getElementById(wrapId); if (t) t.scrollIntoView({ block: 'start' });
      };

      if (mode === 'taking' && S.drafts[quiz.id] && S.drafts[quiz.id].timed) {
        const dr = S.drafts[quiz.id];
        const tEl = el.querySelector('[data-timer]');
        const tick = () => {
          const left = dr.startedAt + quiz.minutes * 60000 - Date.now();
          if (left <= 0) { clearInterval(timerId); submit(true); return; }
          const m = Math.floor(left / 60000), s = Math.floor((left % 60000) / 1000);
          tEl.textContent = `${m}:${String(s).padStart(2, '0')}`;
          tEl.classList.toggle('low', left < 5 * 60000);
        };
        tick(); timerId = setInterval(tick, 1000);
        ctx.onLeave(() => clearInterval(timerId));
      }

      el.addEventListener('click', e => {
        const opt = e.target.closest('.opt[data-q]');
        if (opt && !opt.disabled) {
          const q = QUESTIONS[opt.dataset.q], k = +opt.dataset.k, dr = ensureDraft();
          if (q.type === 'multi') {
            const cur = new Set(dr.sel[q.id] || []); cur.has(k) ? cur.delete(k) : cur.add(k);
            dr.sel[q.id] = [...cur].sort();
          } else dr.sel[q.id] = k;
          ctx.save();
          el.querySelectorAll(`.opt[data-q="${q.id}"]`).forEach(b => {
            const on = q.type === 'multi' ? dr.sel[q.id].includes(+b.dataset.k) : dr.sel[q.id] === +b.dataset.k;
            b.classList.toggle('sel', on); b.setAttribute('aria-pressed', on);
          });
          const nav = el.querySelector(`[data-jump="${q.id}"]`);
          if (nav) nav.classList.toggle('ans', !(Array.isArray(dr.sel[q.id]) && !dr.sel[q.id].length));
          const cnt = quiz.questions.filter(x => dr.sel[x.id] !== undefined && !(Array.isArray(dr.sel[x.id]) && !dr.sel[x.id].length)).length;
          const a = el.querySelector('[data-answered]'); if (a) a.textContent = cnt;
          armed = false; const sb = el.querySelector('[data-act="submit"]'); if (sb) sb.textContent = 'Submit answers';
          return;
        }
        const fl = e.target.closest('[data-flag]');
        if (fl) {
          const dr = ensureDraft(); dr.flags = dr.flags || {};
          dr.flags[fl.dataset.flag] = !dr.flags[fl.dataset.flag]; ctx.save();
          fl.classList.toggle('on', dr.flags[fl.dataset.flag]); fl.textContent = dr.flags[fl.dataset.flag] ? '⚑ Flagged' : '⚑ Flag';
          const nav = el.querySelector(`[data-jump="${fl.dataset.flag}"]`); if (nav) nav.classList.toggle('flag', dr.flags[fl.dataset.flag]);
          return;
        }
        const jump = e.target.closest('[data-jump]');
        if (jump) { e.preventDefault(); document.getElementById('q-' + jump.dataset.jump).scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
        const act = e.target.closest('[data-act]');
        if (!act) return;
        const a = act.dataset.act;
        if (a === 'start-timed' || a === 'start-untimed') {
          const dr = ensureDraft(); delete dr.pending; dr.timed = a === 'start-timed'; dr.startedAt = Date.now(); ctx.save(); ctx.rerender();
        } else if (a === 'retake') {
          delete S.drafts[quiz.id];
          if (timedKind) S.drafts[quiz.id] = { sel: {}, flags: {}, pending: true, title: quiz.title };
          else {
            const q2 = getQuiz(S, quiz.id, ctx.now()); // regenerates targeted/practice sets
            S.drafts[quiz.id] = { sel: {}, flags: {}, startedAt: Date.now(), title: q2.title, qids: q2.generated ? q2.questions.map(q => q.id) : undefined };
          }
          ctx.save(); ctx.rerender();
        } else if (a === 'submit') {
          const dr = S.drafts[quiz.id] || { sel: {} };
          const left = quiz.questions.filter(q => dr.sel[q.id] === undefined).length;
          if (left && !armed) { armed = true; act.textContent = `${left} unanswered. Click again to submit`; return; }
          submit(false);
        }
      });
    },
  };
}

export function renderPage(ctx, id) {
  const S = ctx.S;
  const quiz = getQuiz(S, id || '', ctx.now());
  if (!quiz) return { html: '<div class="callout crit">Unknown assessment. <a href="#/assessments">Back to assessments</a></div>', title: 'Assessment' };
  const blk = quizBlock(ctx, id, { inline: false });
  return {
    title: quiz.title,
    html: `<div class="page-head"><div><a href="#/assessments" class="small">← Assessments</a><h1 style="margin-top:6px">${esc(quiz.title)}</h1></div></div>
      <div class="card pad">${blk.html}</div>`,
    mount: blk.mount,
  };
}
