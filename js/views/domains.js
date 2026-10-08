// DOMAINS — weight vs mastery, topic drill-down.
import { DOMAINS, domainById } from '../data/domains.js';
import { TOPICS } from '../data/topics.js';
import { daysForTopic } from '../data/curriculum.js';
import * as E from '../engine.js';
import { esc, pct, bar, levelBadge } from '../ui.js';

export function render(ctx, focus) {
  const S = ctx.S, now = ctx.now();
  const M = E.allMastery(S), D = E.domainStats(S, M);
  const weakIds = new Set(E.weakAreas(S, now, M).map(w => w.topic.id));
  const html = `
  <div class="page-head"><div><div class="eyebrow">Exam blueprint</div><h1>Domains</h1>
    <p>All six official domains, ordered by exam weight. Mastery is the average evidence-based level of each domain's topics. Accuracy comes from every question you've answered.</p></div></div>
  <div class="grid g3" style="margin-bottom:20px">
    ${DOMAINS.map(d => { const s = D[d.id]; return `<a href="#/domains/${d.id}" class="card pad" style="color:inherit;text-decoration:none;border-top:4px solid var(--${d.id})">
      <div class="row between"><span class="eyebrow">${d.id} · ${d.weight}% of exam</span><span class="chip">${s.counts[3] + s.counts[4]}/${s.topics} competent+</span></div>
      <h3 style="margin:6px 0 10px">${esc(d.name)}</h3>
      <div class="row between xs"><span>Mastery</span><b class="tnum">${pct(s.mastery)}</b></div>${bar(s.mastery, `var(--${d.id})`)}
      <div class="row between xs" style="margin-top:8px"><span>Accuracy (${s.answered} answered)</span><b class="tnum">${pct(s.acc)}</b></div>${bar(s.acc || 0, `var(--${d.id})`, 0.7, 'thin')}
    </a>`; }).join('')}
  </div>
  ${DOMAINS.filter(d => !focus || d.id === focus).map(d => `
  <section class="card" id="dom-${d.id}" style="margin-bottom:16px">
    <div class="hd"><h2><span class="dot" style="background:var(--${d.id});width:12px;height:12px"></span> ${d.id} · ${esc(d.name)} <span class="dim" style="font-weight:500">· ${d.weight}%</span></h2>
      <a class="btn sm primary" href="#/quiz/domain-${d.id}">Practise this domain →</a></div>
    <div class="bd">
      <details><summary class="small" style="cursor:pointer;color:var(--accent)">Official objectives (${d.objectives.length})</summary>
        <ul class="list-plain small" style="margin-top:6px">${d.objectives.map(o => `<li>${esc(o)}</li>`).join('')}</ul></details>
      <div class="tbl-wrap" style="margin-top:10px"><table class="tbl">
        <thead><tr><th>Topic</th><th>Taught</th><th>Level</th><th>Confidence</th><th>Accuracy</th><th></th></tr></thead>
        <tbody>${TOPICS.filter(t => t.domain === d.id).map(t => { const m = M[t.id]; return `<tr>
          <td><b>${esc(t.name)}</b>${weakIds.has(t.id) ? ' <span class="chip crit">weak</span>' : ''}${m.next.length ? `<div class="xs dim">Next: ${esc(m.next[0])}</div>` : ''}</td>
          <td class="small">${daysForTopic(t.id).map(n => `<a href="#/day/${n}">D${n}</a>`).join(', ')}</td>
          <td>${levelBadge(m.level)}</td>
          <td class="tnum">${m.ev.conf ? m.ev.conf + '/5' : '<span class="dim">–</span>'}</td>
          <td class="tnum">${pct(m.ev.acc)} <span class="xs dim">(${m.ev.answered})</span></td>
          <td><a class="btn sm" href="#/day/${t.day}/learn">Study</a></td></tr>`; }).join('')}</tbody></table></div>
    </div>
  </section>`).join('')}
  ${focus ? '<a href="#/domains" class="btn">Show all domains</a>' : ''}`;
  return { title: focus && domainById[focus] ? domainById[focus].name : 'Domains', html };
}
