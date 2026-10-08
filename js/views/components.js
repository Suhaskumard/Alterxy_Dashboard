// Shared view components.
import { topicById } from '../data/topics.js';
import { esc, md, domainChip } from '../ui.js';

const STATUS = [['not', 'Not started'], ['attempted', 'Attempted'], ['solved', 'Solved']];

export function challengeCard(c, status, { compact = false } = {}) {
  const st = status || 'not';
  const dom = topicById[c.topics[0]].domain;
  const diffCls = { Beginner: 'ok', Intermediate: 'acc', Advanced: 'warn', Expert: 'crit' }[c.difficulty] || '';
  return `<div class="card pad chal">
    <div class="row between">
      <div class="meta">
        <span class="chip ${c.kind === 'official' ? 'acc' : ''}">${c.kind === 'official' ? `Official Weekly Challenge #${c.number}` : 'Internal challenge'}</span>
        <span class="chip ${diffCls}">${esc(c.difficulty)}</span>
        ${domainChip(dom)}
        <span class="chip">Day ${c.day}</span>
      </div>
      <div class="seg" role="group" aria-label="Challenge status">
        ${STATUS.map(([k, l]) => `<button type="button" data-chal="${c.id}" data-status="${k}" class="${st === k ? 'on' + (k === 'solved' ? ' ok' : '') : ''}">${l}</button>`).join('')}
      </div>
    </div>
    <h3>${esc(c.title)}</h3>
    <dl>
      <dt>Skill tested</dt><dd>${md(c.skill)}</dd>
      <dt>Problem</dt><dd>${md(c.problem)}</dd>
      <dt>Expected outcome</dt><dd>${md(c.outcome)}</dd>
      ${!compact && c.selfCheck ? `<dt>Self-check</dt><dd><ul class="list-plain">${c.selfCheck.map(x => `<li>${md(x)}</li>`).join('')}</ul></dd>` : ''}
    </dl>
    ${c.kind === 'official'
      ? `<div class="row"><a class="btn primary sm" href="${esc(c.url)}" target="_blank" rel="noopener">Open challenge #${c.number} on Alteryx Community ↗</a><span class="xs dim">The thread has the start file and the solution. Try it before you look.</span></div>`
      : `<div class="xs dim">Self-contained brief: build it in Designer using your own or sample data, then check it against the expected outcome and self-check.</div>`}
  </div>`;
}

/** Delegated handler for challenge status buttons. */
export function wireChallengeStatus(el, ctx, after) {
  el.addEventListener('click', e => {
    const b = e.target.closest('[data-chal][data-status]');
    if (!b) return;
    const id = b.dataset.chal, st = b.dataset.status;
    if (st === 'not') delete ctx.S.challenges[id]; else ctx.S.challenges[id] = st;
    ctx.save();
    el.querySelectorAll(`[data-chal="${id}"]`).forEach(x => { x.className = x.dataset.status === st ? 'on' + (st === 'solved' ? ' ok' : '') : ''; });
    if (after) after();
  });
}
