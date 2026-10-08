// Derived metrics: calendar, completion, mastery, weak areas, readiness, next action.
// Pure functions of (state, now) so they can be unit-tested in Node.
import { DOMAINS, domainById, EXAM } from './data/domains.js';
import { TOPICS, topicById } from './data/topics.js';
import { CHALLENGES } from './data/challenges.js';
import { DAYS, STEPS, QUESTIONS, ASSESSMENTS, PRACTICE_POOL, daysForTopic, domainOfQuestion } from './data/curriculum.js';

export const LEVELS = ['Not Started', 'Learning', 'Practicing', 'Competent', 'Mastered'];
const DAY_MS = 86400000;

/* ---------------- calendar ---------------- */
function localMidnight(ymd) {
  const [y, m, d] = ymd.split('-').map(Number);
  return new Date(y, m - 1, d).getTime();
}
function todayMidnight(now) {
  const t = new Date(now); return new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime();
}
/** 0 = no start date / before start; 1..28 = program day; 29 = finished. */
export function calendarDay(s, now = Date.now()) {
  if (!s.start) return 0;
  const diff = Math.round((todayMidnight(now) - localMidnight(s.start)) / DAY_MS);
  if (diff < 0) return 0;
  return Math.min(diff + 1, 29);
}
/** Day the learner should be working on (clamped 1..28). */
export function currentDay(s, now = Date.now()) {
  const c = calendarDay(s, now);
  return c === 0 ? 1 : Math.min(c, 28);
}
export function daysRemaining(s, now = Date.now()) {
  const c = calendarDay(s, now);
  if (!s.start) return 28;
  if (c === 0) return 28;
  return Math.max(0, 28 - c);
}
export function startsIn(s, now = Date.now()) {
  if (!s.start) return null;
  const diff = Math.round((localMidnight(s.start) - todayMidnight(now)) / DAY_MS);
  return diff > 0 ? diff : 0;
}
export function dateOfDay(s, n) {
  if (!s.start) return null;
  const t = new Date(localMidnight(s.start)); t.setDate(t.getDate() + n - 1); return t;
}

/* ---------------- completion ---------------- */
export function stepsDone(s, n) { return (s.days[n] && s.days[n].steps) || {}; }
export function dayProgress(s, n) {
  const st = stepsDone(s, n); return STEPS.filter(x => st[x.key]).length / STEPS.length;
}
export function isDayComplete(s, n) { return dayProgress(s, n) === 1; }
export function completedDays(s) { return DAYS.filter(d => isDayComplete(s, d.n)).length; }
export function setStep(s, n, key, val = true) {
  const d = s.days[n] || (s.days[n] = { steps: {} });
  d.steps[key] = val;
  if (STEPS.every(x => d.steps[x.key])) d.completedAt = d.completedAt || Date.now(); else delete d.completedAt;
}

/* ---------------- scoring ---------------- */
export function scoreQuestion(q, sel) {
  if (q.type === 'multi') {
    const pick = Array.isArray(sel) ? sel : [];
    const right = pick.filter(i => q.a.includes(i)).length;
    const wrong = pick.filter(i => !q.a.includes(i)).length;
    return Math.max(0, (right - wrong) / q.a.length);
  }
  return sel === q.a ? 1 : 0;
}

/** Grade a quiz, record answers + attempt, return the attempt. */
export function recordAttempt(s, quiz, sel) {
  const at = Date.now();
  const byDomain = {}, byCat = {}, wrongTopics = new Set();
  let got = 0;
  for (const q of quiz.questions) {
    const sc = scoreQuestion(q, sel[q.id]);
    got += sc;
    s.answers[q.id] = { score: sc, at, src: quiz.kind };
    const dm = domainOfQuestion(q);
    (byDomain[dm] = byDomain[dm] || [0, 0]); byDomain[dm][0] += sc; byDomain[dm][1] += 1;
    if (q.cat) { (byCat[q.cat] = byCat[q.cat] || [0, 0]); byCat[q.cat][0] += sc; byCat[q.cat][1] += 1; }
    if (sc < 1) q.t.forEach(t => wrongTopics.add(t));
  }
  const total = quiz.questions.length;
  const attempt = {
    quiz: quiz.id, kind: quiz.kind, title: quiz.title, at,
    got: Math.round(got * 100) / 100, total, score: total ? Math.round((got / total) * 1000) / 10 : 0,
    byDomain, byCat, wrongTopics: [...wrongTopics],
    qids: quiz.questions.map(q => q.id), sel,
  };
  s.attempts.push(attempt);
  delete s.drafts[quiz.id];
  return attempt;
}

export function latestAttempt(s, quizId) {
  for (let i = s.attempts.length - 1; i >= 0; i--) if (s.attempts[i].quiz === quizId) return s.attempts[i];
  return null;
}
export function bestAttempt(s, quizId) {
  return s.attempts.filter(a => a.quiz === quizId).reduce((b, a) => (!b || a.score > b.score ? a : b), null);
}

/* ---------------- topic evidence & mastery ---------------- */
const QUESTIONS_BY_TOPIC = {};
for (const q of Object.values(QUESTIONS)) for (const t of q.t) (QUESTIONS_BY_TOPIC[t] = QUESTIONS_BY_TOPIC[t] || []).push(q);
const CHALLENGES_BY_TOPIC = {};
for (const c of CHALLENGES) for (const t of c.topics) (CHALLENGES_BY_TOPIC[t] = CHALLENGES_BY_TOPIC[t] || []).push(c);

export function topicEvidence(s, topicId) {
  const qs = QUESTIONS_BY_TOPIC[topicId] || [];
  let n = 0, sum = 0; const srcs = new Set();
  for (const q of qs) { const a = s.answers[q.id]; if (a) { n++; sum += a.score; srcs.add(a.src === 'weekly' || a.src === 'mock' ? a.src : 'practice'); } }
  const days = daysForTopic(topicId);
  const learned = days.some(n2 => stepsDone(s, n2).learn);
  const practiced = days.some(n2 => { const st = stepsDone(s, n2); return st.build && st.practice; });
  const chals = CHALLENGES_BY_TOPIC[topicId] || [];
  const solved = chals.some(c => s.challenges[c.id] === 'solved');
  return {
    answered: n, acc: n ? sum / n : null, sources: srcs.size, conf: s.conf[topicId] || 0,
    learned, practiced, hasChallenge: chals.length > 0, solved, total: qs.length,
  };
}

/** Returns { level 0..4, ev, next: [unmet criteria for the next level] } */
export function topicMastery(s, topicId) {
  const ev = topicEvidence(s, topicId);
  const pct = ev.acc == null ? null : Math.round(ev.acc * 100);
  const crit = [
    // level 1
    [[ev.learned || ev.answered > 0, 'Complete the Learn step on its day']],
    // level 2
    [[ev.practiced || ev.answered >= 3, 'Complete Guided Build + Practice (or answer 3+ questions)']],
    // level 3
    [[ev.answered >= 3, `Answer at least 3 questions (now ${ev.answered})`],
     [ev.acc != null && ev.acc >= 0.7, `Reach 70% accuracy (now ${pct ?? '–'}%)`],
     [ev.conf >= 3, `Rate confidence 3+ (now ${ev.conf || 'unrated'})`]],
    // level 4
    [[ev.answered >= 5, `Answer at least 5 questions (now ${ev.answered})`],
     [ev.acc != null && ev.acc >= 0.85, `Reach 85% accuracy (now ${pct ?? '–'}%)`],
     [ev.sources >= 2, 'Get it right in 2 different assessments (daily, weekly or mock)'],
     [ev.conf >= 4, `Rate confidence 4+ (now ${ev.conf || 'unrated'})`],
     [!ev.hasChallenge || ev.solved, 'Solve a linked challenge']],
  ];
  let level = 0;
  for (let i = 0; i < crit.length; i++) { if (crit[i].every(c => c[0])) level = i + 1; else break; }
  const next = level < 4 ? crit[level].filter(c => !c[0]).map(c => c[1]) : [];
  return { level, ev, next };
}

export function allMastery(s) {
  const out = {}; for (const t of TOPICS) out[t.id] = topicMastery(s, t.id); return out;
}

export function domainStats(s, M = allMastery(s)) {
  const res = {};
  for (const d of DOMAINS) {
    const ts = TOPICS.filter(t => t.domain === d.id);
    const mastery = ts.reduce((a, t) => a + M[t.id].level / 4, 0) / ts.length;
    let n = 0, sum = 0;
    for (const t of ts) { const e = M[t.id].ev; if (e.answered) { n += e.answered; sum += e.acc * e.answered; } }
    res[d.id] = { mastery, acc: n ? sum / n : null, answered: n, topics: ts.length,
      counts: [0, 1, 2, 3, 4].map(l => ts.filter(t => M[t.id].level === l).length) };
  }
  return res;
}

/* ---------------- weak areas ---------------- */
export function weakAreas(s, now = Date.now(), M = allMastery(s)) {
  const cd = calendarDay(s, now);
  const lastMock = [...s.attempts].reverse().find(a => a.kind === 'mock');
  const mockWrong = new Set(lastMock ? lastMock.wrongTopics : []);
  const out = [];
  for (const t of TOPICS) {
    const { level, ev } = M[t.id];
    const reasons = [];
    if (ev.answered >= 2 && ev.acc < 0.7) reasons.push(`Accuracy ${Math.round(ev.acc * 100)}% (below 70%)`);
    if (ev.conf && ev.conf <= 2) reasons.push(`Confidence ${ev.conf}/5`);
    if (cd > t.day && level <= 1) reasons.push(`Scheduled Day ${t.day} has passed, but the topic is still at ${LEVELS[level]}`);
    if (mockWrong.has(t.id)) reasons.push('Missed in your latest mock');
    if (!reasons.length) continue;
    const gap = ev.acc != null ? 1 - ev.acc : 1 - level / 4;
    const priority = domainById[t.domain].weight * (0.3 + gap) * (1 + 0.25 * (reasons.length - 1));
    out.push({ topic: t, level, ev, reasons, priority, day: t.day });
  }
  return out.sort((a, b) => b.priority - a.priority);
}

/* ---------------- readiness ---------------- */
export function readiness(s, now = Date.now()) {
  const M = allMastery(s);
  const D = domainStats(s, M);
  const mastery = DOMAINS.reduce((a, d) => a + d.weight * D[d.id].mastery, 0); // 0..100

  let n = 0, sum = 0;
  for (const q of PRACTICE_POOL) { const a = s.answers[q.id]; if (a) { n++; sum += a.score; } }
  const accuracy = n ? sum / n : 0;
  const coverage = n / PRACTICE_POOL.length;
  const assessment = accuracy * coverage * 100;

  const chalScore = CHALLENGES.reduce((a, c) => a + (s.challenges[c.id] === 'solved' ? 1 : s.challenges[c.id] === 'attempted' ? 0.4 : 0), 0);
  const challenges = (chalScore / CHALLENGES.length) * 100;

  const mocks = s.attempts.filter(a => a.kind === 'mock');
  const bestMock = mocks.reduce((b, a) => Math.max(b, a.score), 0);
  const mock = mocks.length ? Math.min(100, bestMock) : 0;

  const cd = calendarDay(s, now);
  const due = TOPICS.filter(t => cd > t.day || (cd >= 29));
  const weakIds = new Set(weakAreas(s, now, M).map(w => w.topic.id));
  const control = due.length ? (due.filter(t => !weakIds.has(t.id)).length / due.length) * 100 : 0;

  const parts = [
    { key: 'mastery', label: 'Domain mastery', weight: 35, value: mastery, note: 'Topic mastery levels, weighted by exam domain weight.' },
    { key: 'assessment', label: 'Assessment performance', weight: 20, value: assessment, note: `Daily + weekly accuracy ${Math.round(accuracy * 100)}% × bank coverage ${Math.round(coverage * 100)}%.` },
    { key: 'challenges', label: 'Challenge performance', weight: 10, value: challenges, note: 'Solved = full credit, attempted = partial.' },
    { key: 'mock', label: 'Mock performance', weight: 30, value: mock, note: mocks.length ? `Best mock ${bestMock}% (reference pass mark ${EXAM.passMark}%).` : 'No mock taken yet.' },
    { key: 'control', label: 'Weak-area control', weight: 5, value: control, note: due.length ? 'Share of already-scheduled topics that are not currently weak.' : 'Starts once topics fall due.' },
  ];
  const score = parts.reduce((a, p) => a + (p.weight * p.value) / 100, 0);
  const band = score >= 85 ? 'Exam-ready preparation' : score >= 70 ? 'Approaching ready' : score >= 50 ? 'Developing' : 'Building foundations';
  return { score, band, parts, domains: D, mastery: M, accuracy, coverage, bestMock: mocks.length ? bestMock : null };
}

/* ---------------- next action ---------------- */
export function nextAction(s, now = Date.now()) {
  if (!s.start) return { label: 'Set your Day 1 start date', href: '#/settings', why: 'The 28-day calendar starts from this date.' };
  const cd = currentDay(s, now);
  // earliest incomplete day up to today (catch up first)
  const behind = DAYS.find(d => d.n <= cd && !isDayComplete(s, d.n));
  if (behind) {
    const st = stepsDone(s, behind.n);
    const step = STEPS.find(x => !st[x.key]);
    const catchUp = behind.n < cd;
    return {
      label: `${catchUp ? 'Catch up: ' : ''}Day ${behind.n} · ${step.label}`,
      href: `#/day/${behind.n}/${step.key}`,
      why: catchUp ? `Day ${behind.n} isn't complete yet. Finish it before moving on.` : step.verb + ' for today.',
    };
  }
  const weak = weakAreas(s, now)[0];
  if (weak) return { label: `Revise: ${weak.topic.name}`, href: `#/day/${weak.topic.day}/learn`, why: weak.reasons[0] };
  if (cd < 28) return { label: `Preview Day ${cd + 1}`, href: `#/day/${cd + 1}`, why: 'Today is done and no weak areas are flagged.' };
  return { label: 'Review your readiness', href: '#/readiness', why: 'All 28 days are complete.' };
}

/** Quiz ids a day's Assessment step requires. */
export function requiredQuizzes(n) {
  const d = DAYS[n - 1], a = d.assessment;
  if (a.kind === 'daily') return [`day-${n}`];
  if (a.kind === 'weekly') return [`day-${n}`, a.id];
  return [a.id]; // mock / targeted
}
/** Marks Assessment steps done for every day whose required quizzes have been attempted. */
export function syncAssessSteps(s) {
  const taken = new Set(s.attempts.map(a => a.quiz));
  for (const d of DAYS) if (requiredQuizzes(d.n).every(id => taken.has(id)) && !stepsDone(s, d.n).assess) setStep(s, d.n, 'assess');
}

/* ---------------- quiz builders ---------------- */
export function quizForDay(n) {
  const d = DAYS[n - 1];
  return { id: `day-${n}`, kind: 'daily', title: `Day ${n} assessment: ${d.title}`, questions: d.quiz, minutes: 15 };
}

function pickPractice(s, pool, max) {
  const rank = q => { const a = s.answers[q.id]; return a ? (a.score < 1 ? 0 : 2) : 1; }; // wrong → unseen → right
  return [...pool].sort((a, b) => rank(a) - rank(b) || a.id.localeCompare(b.id)).slice(0, max);
}

/** Resolves any quiz id. Generated quizzes (weak/domain) freeze their question list in drafts. */
export function getQuiz(s, id, now = Date.now()) {
  if (id.startsWith('day-')) return quizForDay(+id.slice(4));
  if (ASSESSMENTS[id]) return ASSESSMENTS[id];
  const draft = s.drafts[id];
  if (draft && draft.qids) {
    const qs = draft.qids.map(q => QUESTIONS[q]).filter(Boolean);
    return { id, kind: id === 'weak' ? 'targeted' : 'practice', title: draft.title, questions: qs, minutes: Math.ceil(qs.length * 1.5) };
  }
  let qs = [], title = '';
  if (id === 'weak') {
    const weak = weakAreas(s, now).slice(0, 6).map(w => w.topic.id);
    const topics = weak.length ? weak : TOPICS.map(t => t.id);
    qs = pickPractice(s, PRACTICE_POOL.filter(q => q.t.some(t => topics.includes(t))), 12);
    title = weak.length ? 'Targeted quiz: your weak topics' : 'Targeted quiz: mixed review';
  } else if (id.startsWith('domain-')) {
    const dm = id.slice(7);
    qs = pickPractice(s, PRACTICE_POOL.filter(q => domainOfQuestion(q) === dm), 10);
    title = `Domain practice: ${domainById[dm].name}`;
  } else return null;
  return { id, kind: id === 'weak' ? 'targeted' : 'practice', title, questions: qs, minutes: Math.ceil(qs.length * 1.5), generated: true };
}
