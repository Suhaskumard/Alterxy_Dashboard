// CHALLENGES — official Weekly Challenges + internal briefs, filterable.
import { CHALLENGES } from '../data/challenges.js';
import { DOMAINS } from '../data/domains.js';
import { topicById } from '../data/topics.js';
import { esc } from '../ui.js';
import { challengeCard, wireChallengeStatus } from './components.js';

const filt = { dom: 'all', status: 'all', kind: 'all' };

export function render(ctx) {
  const S = ctx.S;
  const st = c => S.challenges[c.id] || 'not';
  const list = CHALLENGES.filter(c =>
    (filt.dom === 'all' || topicById[c.topics[0]].domain === filt.dom) &&
    (filt.status === 'all' || st(c) === filt.status) &&
    (filt.kind === 'all' || c.kind === filt.kind)).sort((a, b) => a.day - b.day);
  const solved = CHALLENGES.filter(c => st(c) === 'solved').length;
  const att = CHALLENGES.filter(c => st(c) === 'attempted').length;
  const sel = (name, label, opts) => `<select data-f="${name}" aria-label="${label}">${opts.map(([v, l]) => `<option value="${v}" ${filt[name] === v ? 'selected' : ''}>${esc(l)}</option>`).join('')}</select>`;
  const html = `
  <div class="page-head"><div><div class="eyebrow">Hands-on</div><h1>Challenges</h1>
    <p>${CHALLENGES.filter(c => c.kind === 'official').length} official Alteryx Weekly Challenges, each linking to its own Community thread with start files and solutions, plus ${CHALLENGES.filter(c => c.kind === 'internal').length} internal challenges for skills the official catalogue covers poorly (DCM, In-DB, Blob, Render/Email, Condition/Error).</p></div>
    <div class="row"><span class="chip ok">${solved} solved</span><span class="chip warn">${att} attempted</span><span class="chip">${CHALLENGES.length} total</span></div></div>
  <div class="filters">
    ${sel('dom', 'Domain', [['all', 'All domains'], ...DOMAINS.map(d => [d.id, `${d.id} · ${d.short}`])])}
    ${sel('status', 'Status', [['all', 'Any status'], ['not', 'Not started'], ['attempted', 'Attempted'], ['solved', 'Solved']])}
    ${sel('kind', 'Type', [['all', 'Official + internal'], ['official', 'Official only'], ['internal', 'Internal only']])}
  </div>
  <div class="grid g2">${list.map(c => challengeCard(c, S.challenges[c.id])).join('') || '<div class="empty">No challenges match these filters.</div>'}</div>`;
  return {
    title: 'Challenges', html,
    mount(el) {
      wireChallengeStatus(el, ctx, () => { if (filt.status !== 'all') ctx.rerender(); });
      el.querySelectorAll('[data-f]').forEach(s => s.addEventListener('change', () => { filt[s.dataset.f] = s.value; ctx.rerender(); }));
    },
  };
}
