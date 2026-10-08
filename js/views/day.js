// TODAY / Day N — the guided 6-step learning flow.
import { DAYS, STEPS } from '../data/curriculum.js';
import { topicById } from '../data/topics.js';
import { CHALLENGES, challengeById } from '../data/challenges.js';
import { domainById } from '../data/domains.js';
import * as E from '../engine.js';
import { esc, md, fmtMin, fmtDate, domainChip, levelBadge, toast, pct } from '../ui.js';
import { quizBlock } from './quiz.js';
import { challengeCard, wireChallengeStatus } from './components.js';

function dayChallenges(ctx, d) {
  if (!d.dynamicChallenge) return d.challengeIds.map(id => challengeById[id]);
  // Remediation days: challenges linked to your weakest topics, not yet solved.
  const weak = E.weakAreas(ctx.S, ctx.now()).map(w => w.topic.id);
  const pick = CHALLENGES.filter(c => ctx.S.challenges[c.id] !== 'solved' && c.topics.some(t => weak.includes(t)));
  const fallback = CHALLENGES.filter(c => ctx.S.challenges[c.id] !== 'solved' && c.day <= 25);
  return (pick.length ? pick : fallback).slice(0, 3);
}

function stepContent(ctx, d, key) {
  const S = ctx.S;
  switch (key) {
    case 'learn': return `
      <div class="lesson">
        ${d.learn.map(l => `<div class="sec">
          <h3>${esc(l.heading)}</h3>
          ${l.tools && l.tools.length ? `<div class="tools">${l.tools.map(t => `<span class="chip">${esc(t)}</span>`).join('')}</div>` : ''}
          <div class="body">${md(l.body)}</div>
          ${l.example ? `<pre>${esc(l.example)}</pre>` : ''}
        </div>`).join('')}
      </div>
      <h3 style="margin:22px 0 10px">Key concepts</h3>
      <div class="gloss">${d.keyConcepts.map(k => `<div class="tile"><b>${md(k.term)}</b><span class="small dim">${md(k.definition)}</span></div>`).join('')}</div>`;
    case 'build': return `
      <div class="callout"><b>Goal:</b> ${md(d.guidedBuild.goal)}</div>
      <h3 style="margin:16px 0 8px">Data to create</h3><pre>${esc(d.guidedBuild.data)}</pre>
      <h3 style="margin:16px 0 4px">Build it step by step in Designer</h3>
      <ol class="steps-ol">${d.guidedBuild.steps.map(s => `<li>${md(s)}</li>`).join('')}</ol>
      <div class="callout ok" style="margin-top:14px"><b>Expected result:</b> ${md(d.guidedBuild.expectedResult)}</div>`;
    case 'practice': return `
      <p class="dim">Answer each one in your head (or in Designer) <b>before</b> opening it. Retrieval practice is what makes it stick.</p>
      ${d.practice.map((p, i) => `<details class="drill"><summary>${i + 1}. ${md(p.prompt)}</summary>
        <div class="ans">${p.hint ? `<div class="small dim">Hint: ${md(p.hint)}</div>` : ''}<div><b>Answer:</b> ${md(p.answer)}</div></div></details>`).join('')}`;
    case 'challenge': {
      const cs = dayChallenges(ctx, d);
      return `${d.dynamicChallenge ? '<p class="dim">These challenges are chosen from your current weak areas.</p>' : ''}
        <div class="stack">${cs.map(c => challengeCard(c, S.challenges[c.id])).join('') || '<div class="empty">No open challenges. Everything relevant is solved.</div>'}</div>`;
    }
    case 'assess': {
      const a = d.assessment;
      const parts = [];
      if (a.kind === 'daily' || a.kind === 'weekly') parts.push(quizBlock(ctx, `day-${d.n}`, { inline: true }));
      if (a.kind === 'weekly') parts.push(quizBlock(ctx, a.id, { inline: true }));
      if (a.kind === 'mock') parts.push(quizBlock(ctx, a.id, { inline: true }));
      if (a.kind === 'targeted') parts.push(quizBlock(ctx, 'weak', { inline: true }));
      const intro = a.kind === 'weekly' ? '<p class="dim">Two parts: today\'s short quiz, then the 15-question weekly checkpoint. Aim for 70% or more on each.</p>'
        : a.kind === 'targeted' ? '<p class="dim">This quiz is built from your weakest topics, starting with the questions you missed before.</p>'
        : a.kind === 'daily' ? '<p class="dim">Answer without notes first. Your score updates topic mastery and weak areas immediately.</p>' : '';
      return { html: intro + parts.map(p => p.html).join('<div style="height:26px;border-top:1px dashed var(--line);margin-top:26px"></div>'), mounts: parts.map(p => p.mount).filter(Boolean) };
    }
    case 'review': {
      const topicRows = d.topics.map(tid => {
        const t = topicById[tid], m = E.topicMastery(S, tid), c = S.conf[tid] || 0;
        return `<div class="topic-row">
          <div><b>${esc(t.name)}</b><div class="row small" style="margin-top:3px">${levelBadge(m.level)}
            <span class="dim">· accuracy ${pct(m.ev.acc)} (${m.ev.answered} answered)</span></div>
            ${m.next.length ? `<div class="xs dim" style="margin-top:3px">Next level: ${m.next.map(esc).join(' · ')}</div>` : ''}</div>
          <div><div class="xs dim" style="text-align:right;margin-bottom:3px">Confidence</div>
            <div class="conf" role="group" aria-label="Confidence for ${esc(t.name)}">${[1, 2, 3, 4, 5].map(v => `<button type="button" data-conf="${tid}" data-v="${v}" class="${c === v ? 'on' : ''}" title="${['', 'Lost', 'Shaky', 'OK with notes', 'Confident', 'Could teach it'][v]}">${v}</button>`).join('')}</div></div>
        </div>`;
      }).join('');
      let mockPanel = '';
      if (['mock', 'targeted'].includes(d.assessment.kind)) {
        const att = E.latestAttempt(S, d.assessment.id);
        const weak = E.weakAreas(S, ctx.now()).slice(0, 6);
        mockPanel = `<div class="tile"><div class="eyebrow" style="margin-bottom:8px">${att ? `Latest result: ${att.score}%` : 'No result yet. Complete the Assessment step first.'}</div>
          ${weak.length ? `<b>Top weak areas now</b><ul class="list-plain">${weak.map(w => `<li><a href="#/day/${w.topic.day}/learn">${esc(w.topic.name)}</a> <span class="dim small">(${esc(w.reasons[0])})</span></li>`).join('')}</ul>` : '<span class="small dim">No weak areas flagged.</span>'}
          <div style="margin-top:8px"><a href="#/readiness" class="small">Open the full readiness breakdown →</a></div></div>`;
      }
      return `
        <div class="grid g2">
          <div class="tile"><div class="eyebrow" style="margin-bottom:6px">Common mistakes</div><ul class="list-plain">${d.pitfalls.map(x => `<li>${md(x)}</li>`).join('')}</ul></div>
          <div class="tile"><div class="eyebrow" style="margin-bottom:6px">Exam tips</div><ul class="list-plain">${d.examTips.map(x => `<li>${md(x)}</li>`).join('')}</ul></div>
        </div>
        <h3 style="margin:18px 0 6px">You've mastered today when…</h3>
        <ul class="list-plain">${d.masteryCriteria.map(x => `<li>${md(x)}</li>`).join('')}</ul>
        ${mockPanel ? `<div style="margin-top:16px">${mockPanel}</div>` : ''}
        ${d.topics.length ? `<h3 style="margin:20px 0 2px">Rate your confidence honestly (1–5)</h3>
        <p class="small dim">Mastery is based on evidence: your answers, your confidence rating and the challenges you've solved. A rating of 2 or less flags the topic as weak.</p>${topicRows}` : ''}`;
    }
  }
  return '';
}

export function render(ctx, n, stepKey) {
  const S = ctx.S, now = ctx.now();
  const d = DAYS[n - 1];
  const cd = E.currentDay(S, now), cal = E.calendarDay(S, now);
  const st = E.stepsDone(S, n);
  const active = STEPS.find(s => s.key === stepKey) ? stepKey : (STEPS.find(s => !st[s.key]) || STEPS[0]).key;
  const ai = STEPS.findIndex(s => s.key === active);
  const content = stepContent(ctx, d, active);
  const contentHTML = typeof content === 'string' ? content : content.html;
  const mounts = typeof content === 'string' ? [] : content.mounts;
  const date = E.dateOfDay(S, n);
  const prog = E.dayProgress(S, n);
  const unrated = active === 'review' && d.topics.some(t => !S.conf[t]);
  const step = STEPS[ai];
  const isAssess = active === 'assess';
  const notToday = S.start && n !== cd;

  const html = `
  ${!S.start ? `<div class="callout warn" style="margin-bottom:14px">You haven't set a start date, so this shows Day 1. <a href="#/settings">Set your Day 1 date →</a></div>` : ''}
  ${notToday ? `<div class="callout" style="margin-bottom:14px">You're viewing <b>Day ${n}</b>. ${cal === 0 ? 'Your program hasn\'t started yet.' : `Today is <b>Day ${cd}</b>.`} <a href="#/today">Go to today →</a></div>` : ''}
  <section class="hero">
    <div class="dayhead">
      <div style="min-width:0;flex:1">
        <div class="daynum">Day ${n} of 28 · Week ${d.week}${date ? ' · ' + fmtDate(date) : ''}</div>
        <h1>${esc(d.title)}</h1>
        <p class="objective"><b>Today's objective:</b> ${md(d.objective)}</p>
      </div>
      <div class="row">
        <a class="btn light sm" href="#/day/${Math.max(1, n - 1)}" ${n === 1 ? 'aria-disabled="true" style="opacity:.5;pointer-events:none"' : ''}>← Day ${Math.max(1, n - 1)}</a>
        <a class="btn light sm" href="#/day/${Math.min(28, n + 1)}" ${n === 28 ? 'aria-disabled="true" style="opacity:.5;pointer-events:none"' : ''}>Day ${Math.min(28, n + 1)} →</a>
      </div>
    </div>
    <div class="hero-stats" style="margin-top:16px">
      <div class="hstat"><b class="tnum">${fmtMin(d.totalMinutes)}</b><span>Study time</span></div>
      <div class="hstat"><b class="tnum">${Math.round(prog * 6)}/6</b><span>Steps done</span></div>
      <div class="hstat"><b>${d.domain === 'ALL' ? 'All' : d.domain}</b><span>${d.domain === 'ALL' ? 'Domains' : esc(domainById[d.domain].short) + ' · ' + domainById[d.domain].weight + '%'}</span></div>
    </div>
  </section>

  <div class="split" style="margin-top:16px">
    <div class="card pad">
      <div class="eyebrow">Why it matters for the exam</div>
      <p style="margin:6px 0 0">${md(d.whyItMatters)}</p>
    </div>
    <div class="card pad">
      <div class="eyebrow" style="margin-bottom:6px">Topics today</div>
      ${d.topics.length ? d.topics.map(t => `<div class="row between small" style="padding:3px 0"><span>${esc(topicById[t].name)}</span>${levelBadge(E.topicMastery(S, t).level)}</div>`).join('') : '<span class="small dim">All domains (exam simulation & remediation)</span>'}
      <div class="xs dim" style="margin-top:8px">Prerequisites: ${d.prerequisites.map(esc).join(' · ')}</div>
    </div>
  </div>

  <nav class="stepper" aria-label="Today's steps">
    ${STEPS.map((s, i) => `<a href="#/day/${n}/${s.key}" class="${s.key === active ? 'on' : ''} ${st[s.key] ? 'done' : ''}">
      <span class="n"><span>${st[s.key] ? '✓ ' : ''}${i + 1}. ${esc(s.verb)}</span><span>${d.minutes[s.key]}m</span></span><b>${esc(s.label)}</b></a>`).join('')}
  </nav>

  <section class="card">
    <div class="hd"><h2>${ai + 1}. ${esc(step.label)}</h2><span class="chip">${d.minutes[active]} min</span></div>
    <div class="bd" id="stepBody">
      ${contentHTML}
      <div class="step-foot">
        ${ai > 0 ? `<a class="btn ghost" href="#/day/${n}/${STEPS[ai - 1].key}">← ${esc(STEPS[ai - 1].label)}</a>` : '<span></span>'}
        <div class="row">
          ${isAssess
            ? (st.assess ? `<span class="chip ok">✓ Assessment complete</span>` : `<span class="small dim">This step completes automatically when you submit.</span>`)
            : st[active] ? `<span class="chip ok">✓ Done</span><button type="button" class="btn sm ghost" data-undo="${active}">Undo</button>`
            : `<button type="button" class="btn primary" data-done="${active}" ${unrated ? 'disabled title="Rate every topic first"' : ''}>${active === 'review' ? 'Complete Day ' + n : 'Mark ' + esc(step.label) + ' done'} ✓</button>`}
          ${ai < 5 ? `<a class="btn" href="#/day/${n}/${STEPS[ai + 1].key}">${esc(STEPS[ai + 1].label)} →</a>` : ''}
        </div>
      </div>
      ${unrated ? '<div class="xs dim" style="text-align:right;margin-top:6px">Rate your confidence for every topic above to complete the day.</div>' : ''}
    </div>
  </section>`;

  return {
    title: `Day ${n}`,
    html,
    mount(el) {
      mounts.forEach(m => m(el));
      wireChallengeStatus(el, ctx);
      el.addEventListener('click', e => {
        const done = e.target.closest('[data-done]');
        if (done && !done.disabled) {
          E.setStep(S, n, done.dataset.done); ctx.save();
          const next = STEPS.find(s => !E.stepsDone(S, n)[s.key]);
          if (E.isDayComplete(S, n)) toast(`Day ${n} complete 🎉`);
          location.hash = next ? `#/day/${n}/${next.key}` : `#/day/${n}/review`;
          if (!next) ctx.rerender();
          return;
        }
        const undo = e.target.closest('[data-undo]');
        if (undo) { E.setStep(S, n, undo.dataset.undo, false); ctx.save(); ctx.rerender(); return; }
        const cf = e.target.closest('[data-conf]');
        if (cf) { S.conf[cf.dataset.conf] = +cf.dataset.v; ctx.save(); ctx.rerender(); }
      });
    },
  };
}
