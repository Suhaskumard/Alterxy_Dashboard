// Content + engine validator. Run: node scripts/validate.mjs
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DOMAINS } from '../js/data/domains.js';
import { TOPICS, topicById } from '../js/data/topics.js';
import { CHALLENGES, challengeById } from '../js/data/challenges.js';
import { DAYS, ASSESSMENTS, QUESTIONS, STEPS } from '../js/data/curriculum.js';
import * as E from '../js/engine.js';
import { blankState } from '../js/state.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];
const err = m => errors.push(m);
const nonEmpty = v => (Array.isArray(v) ? v.length > 0 : typeof v === 'string' ? v.trim().length > 0 : v != null);

/* ---- days ---- */
if (DAYS.length !== 28) err(`Expected 28 days, got ${DAYS.length}`);
DAYS.forEach((d, i) => {
  if (d.n !== i + 1) err(`Day index mismatch at ${i + 1}`);
  for (const f of ['title', 'objective', 'whyItMatters', 'learn', 'keyConcepts', 'pitfalls', 'examTips', 'masteryCriteria', 'practice', 'prerequisites'])
    if (!nonEmpty(d[f])) err(`Day ${d.n}: missing ${f}`);
  for (const k of STEPS.map(s => s.key)) if (!(d.minutes[k] > 0)) err(`Day ${d.n}: minutes.${k} missing`);
  if (!d.guidedBuild || !nonEmpty(d.guidedBuild.steps) || !nonEmpty(d.guidedBuild.goal) || !nonEmpty(d.guidedBuild.expectedResult) || !nonEmpty(d.guidedBuild.data)) err(`Day ${d.n}: incomplete guidedBuild`);
  d.learn.forEach((l, j) => { if (!nonEmpty(l.heading) || !nonEmpty(l.body)) err(`Day ${d.n}: learn[${j}] incomplete`); });
  d.practice.forEach((p, j) => { if (!nonEmpty(p.prompt) || !nonEmpty(p.answer)) err(`Day ${d.n}: practice[${j}] incomplete`); });
  d.topics.forEach(t => { if (!topicById[t]) err(`Day ${d.n}: unknown topic ${t}`); });
  if (!d.challengeIds.length && !d.dynamicChallenge) err(`Day ${d.n}: no challenge`);
  d.challengeIds.forEach(c => { if (!challengeById[c]) err(`Day ${d.n}: unknown challenge ${c}`); });
  const k = d.assessment.kind;
  if (k === 'daily' || k === 'weekly') { if (d.quiz.length < 5) err(`Day ${d.n}: only ${d.quiz.length} quiz questions`); }
  if (k === 'weekly' || k === 'mock') { if (!ASSESSMENTS[d.assessment.id]) err(`Day ${d.n}: unknown assessment ${d.assessment.id}`); }
});

/* ---- questions ---- */
for (const q of Object.values(QUESTIONS)) {
  if (!nonEmpty(q.q) || !nonEmpty(q.x) || !Array.isArray(q.o) || q.o.length < 2) err(`${q.id}: incomplete question`);
  q.t.forEach(t => { if (!topicById[t]) err(`${q.id}: unknown topic ${t}`); });
  if (q.type === 'single') { if (!Number.isInteger(q.a) || q.a < 0 || q.a >= q.o.length) err(`${q.id}: bad answer index`); }
  else if (q.type === 'multi') { if (!Array.isArray(q.a) || !q.a.length || q.a.some(i => i < 0 || i >= q.o.length)) err(`${q.id}: bad multi answer`); }
  else err(`${q.id}: unknown type ${q.type}`);
  if (new Set(q.o).size !== q.o.length) err(`${q.id}: duplicate options`);
}

/* ---- coverage: every topic taught, assessed; every objective mapped ---- */
for (const t of TOPICS) {
  if (!DAYS.some(d => d.n === t.day)) err(`Topic ${t.id}: day ${t.day} invalid`);
  const qs = Object.values(QUESTIONS).filter(q => q.t.includes(t.id));
  if (qs.filter(q => q.src === 'daily').length < 1) err(`Topic ${t.id}: no daily question`);
  if (qs.length < 3) err(`Topic ${t.id}: only ${qs.length} questions overall`);
}
for (const d of DOMAINS) d.objectives.forEach((o, i) => {
  if (!TOPICS.some(t => t.domain === d.id && t.obj.includes(i))) err(`${d.id} objective ${i} not mapped to a topic`);
});
if (DOMAINS.reduce((a, d) => a + d.weight, 0) !== 100) err('Domain weights do not sum to 100');

/* ---- mocks match blueprint ---- */
const expectA = { D1: 14, D6: 10, D5: 9, D4: 8, D2: 5, D3: 5 };
const cnt = qs => qs.reduce((m, q) => { const dm = topicById[q.t[0]].domain; m[dm] = (m[dm] || 0) + 1; return m; }, {});
const ca = cnt(ASSESSMENTS.mockA.questions);
if (ASSESSMENTS.mockA.questions.length !== 51) err(`Mock A has ${ASSESSMENTS.mockA.questions.length} questions`);
for (const k in expectA) if (ca[k] !== expectA[k]) err(`Mock A ${k}: ${ca[k]} (expected ${expectA[k]})`);
if (ASSESSMENTS.mockB.questions.length !== 25) err('Mock B must have 25 questions');
const cats = new Set(ASSESSMENTS.mockA.questions.map(q => q.cat));
for (const c of ['concept', 'tool', 'config', 'output', 'troubleshoot', 'reasoning']) if (!cats.has(c)) err(`Mock A lacks category ${c}`);
const stems = new Map();
for (const q of Object.values(QUESTIONS)) { if (stems.has(q.q)) err(`Duplicate stem: ${q.id} = ${stems.get(q.q)}`); stems.set(q.q, q.id); }

/* ---- challenges ---- */
for (const c of CHALLENGES) {
  for (const f of ['title', 'skill', 'problem', 'outcome', 'difficulty']) if (!nonEmpty(c[f])) err(`Challenge ${c.id}: missing ${f}`);
  c.topics.forEach(t => { if (!topicById[t]) err(`Challenge ${c.id}: unknown topic ${t}`); });
  if (c.kind === 'official') {
    if (!/^https:\/\/community\.alteryx\.com\/t5\/Weekly-Challenges?\/Challenge-\d+-[^/]+\/td-p\/\d+$/.test(c.url || '')) err(`Challenge ${c.id}: URL is not a specific challenge thread`);
    if (!c.url.includes(`Challenge-${c.number}-`)) err(`Challenge ${c.id}: URL number mismatch`);
  } else if (c.url) err(`Internal challenge ${c.id} should not have a URL`);
}

/* ---- forbidden content ---- */
const bad = /\b(TODO|TBD|lorem|placeholder|notion)\b|bd-p\/weekly-?challenge/i;
function walk(dir) {
  for (const f of readdirSync(dir)) {
    if (['.git', 'node_modules', 'scripts'].includes(f)) continue;
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(js|html|css|json|md)$/.test(f)) {
      const txt = readFileSync(p, 'utf8');
      const m = txt.match(bad);
      if (m && !(f === 'index.html' && /placeholder=/.test(m[0]))) {
        // allow HTML placeholder="" attributes
        const lines = txt.split('\n').filter(l => bad.test(l) && !/placeholder="/.test(l));
        if (lines.length) err(`${p}: forbidden text "${m[0]}"`);
      }
    }
  }
}
walk(root);

/* ---- engine smoke tests ---- */
const s = blankState();
const D = (y, m, d) => new Date(y, m - 1, d, 10).getTime();
s.start = '2026-10-01';
const eq = (a, b, m) => { if (a !== b) err(`Engine: ${m}: got ${a}, expected ${b}`); };
eq(E.calendarDay(s, D(2026, 9, 30)), 0, 'before start');
eq(E.calendarDay(s, D(2026, 10, 1)), 1, 'day 1');
eq(E.calendarDay(s, D(2026, 10, 6)), 6, 'day 6');
eq(E.calendarDay(s, D(2026, 10, 28)), 28, 'day 28');
eq(E.calendarDay(s, D(2026, 11, 5)), 29, 'finished');
eq(E.daysRemaining(s, D(2026, 10, 6)), 22, 'remaining day 6');
eq(E.calendarDay(s, D(2026, 11, 1) + 3600e3 * 13), 29, 'DST-safe');
eq(E.scoreQuestion({ type: 'multi', a: [0, 1] }, [0]), 0.5, 'partial credit');
eq(E.scoreQuestion({ type: 'multi', a: [0, 1] }, [0, 2]), 0, 'wrong pick cancels');
eq(E.topicMastery(s, 'd1-mrf').level, 0, 'not started');
for (const k of ['learn']) E.setStep(s, 1, k);
eq(E.topicMastery(s, 'd1-mrf').level, 1, 'learning');
E.setStep(s, 1, 'build'); E.setStep(s, 1, 'practice');
eq(E.topicMastery(s, 'd1-mrf').level, 2, 'practicing');
const q1 = E.quizForDay(1); const perfect = {}; q1.questions.forEach(q => perfect[q.id] = q.a);
E.recordAttempt(s, q1, perfect); s.conf['d1-mrf'] = 3;
eq(E.topicMastery(s, 'd1-mrf').level, 3, 'competent');
const w = {}; q1.questions.forEach(q => w[q.id] = q.type === 'multi' ? [] : (q.a + 1) % q.o.length);
E.recordAttempt(s, q1, w);
eq(E.topicMastery(s, 'd1-mrf').level, 2, 'drops after wrong answers');
eq(E.weakAreas(s, D(2026, 10, 2)).some(x => x.topic.id === 'd1-mrf'), true, 'weak detected');
const r = E.readiness(s, D(2026, 10, 2));
if (!(r.score >= 0 && r.score <= 100)) err('readiness out of range');
['learn', 'challenge', 'assess', 'review'].forEach(k => E.setStep(s, 1, k));
eq(E.isDayComplete(s, 1), true, 'day complete');
eq(E.nextAction(s, D(2026, 10, 1)).href.startsWith('#/'), true, 'next action');

const qCount = Object.keys(QUESTIONS).length;
if (errors.length) { console.error(errors.map(e => ' ✗ ' + e).join('\n')); console.error(`\n${errors.length} problem(s).`); process.exit(1); }
console.log(`✓ 28 days, ${TOPICS.length} topics, ${CHALLENGES.length} challenges (${CHALLENGES.filter(c => c.kind === 'official').length} official), ${qCount} questions. All checks passed.`);
