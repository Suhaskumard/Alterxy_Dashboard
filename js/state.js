// Persistence: one JSON document in localStorage. Every read/write is guarded.
const KEY = 'alteryx-adv-mastery-v2';
const LEGACY_KEY = 'alteryx-adv-tracker-v1';

export function blankState() {
  return {
    v: 2,
    start: '',            // yyyy-mm-dd, Day 1
    theme: 'auto',        // auto | light | dark
    days: {},             // n -> { steps: {learn:true,...}, completedAt }
    conf: {},             // topicId -> 1..5
    answers: {},          // questionId -> { score 0..1, at, src }
    attempts: [],         // { quiz, kind, title, at, score, got, total, byDomain, byCat, wrongTopics }
    challenges: {},       // id -> 'attempted' | 'solved'
    drafts: {},           // quizId -> { sel: {qid: idx|[idx]}, startedAt, qids?, flags }
  };
}

function migrate(raw) {
  const s = Object.assign(blankState(), raw || {});
  for (const k of ['days', 'conf', 'answers', 'challenges', 'drafts']) if (!s[k] || typeof s[k] !== 'object') s[k] = {};
  if (!Array.isArray(s.attempts)) s.attempts = [];
  return s;
}

export function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return migrate(JSON.parse(raw));
  } catch (e) { /* fall through */ }
  const s = blankState();
  // One-time carry-over from the previous checklist tracker: start date + theme only.
  try {
    const old = JSON.parse(localStorage.getItem(LEGACY_KEY));
    if (old && typeof old === 'object') {
      if (/^\d{4}-\d{2}-\d{2}$/.test(old.start || '')) s.start = old.start;
      if (['auto', 'light', 'dark'].includes(old.theme)) s.theme = old.theme;
    }
  } catch (e) { /* ignore */ }
  return s;
}

export function save(s) {
  try { localStorage.setItem(KEY, JSON.stringify(s)); return true; } catch (e) { return false; }
}

export function resetState(s) {
  const fresh = blankState();
  fresh.theme = s.theme;
  return fresh;
}

export function exportJSON(s) {
  return JSON.stringify({ app: 'alteryx-advanced-28', exportedAt: new Date().toISOString(), state: s }, null, 2);
}

export function importJSON(text) {
  const obj = JSON.parse(text);
  const st = obj && obj.state ? obj.state : obj;
  if (!st || st.v !== 2) throw new Error('This file is not an Alteryx 28-day progress export.');
  return migrate(st);
}
