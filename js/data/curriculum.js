// Assembles the 28-day course and a single question index.
import { WEEK1 } from './week1.js';
import { WEEK2 } from './week2.js';
import { WEEK3 } from './week3.js';
import { WEEK4 } from './week4.js';
import { ASSESSMENTS } from './assessments.js';
import { topicById } from './topics.js';

export const STEPS = [
  { key: 'learn', label: 'Learn', verb: 'Study the concepts' },
  { key: 'build', label: 'Guided Build', verb: 'Build it in Designer' },
  { key: 'practice', label: 'Practice', verb: 'Recall drills' },
  { key: 'challenge', label: 'Challenge', verb: 'Solve the challenge' },
  { key: 'assess', label: 'Assessment', verb: 'Prove it' },
  { key: 'review', label: 'Review', verb: 'Rate & reflect' },
];

export const DAYS = [...WEEK1, ...WEEK2, ...WEEK3, ...WEEK4].map(d => ({
  ...d,
  quiz: d.quiz.map((q, i) => ({ ...q, id: `d${d.n}-q${i + 1}`, src: 'daily', day: d.n })),
  assessment: d.assessment || { kind: 'daily', id: `day-${d.n}` },
  totalMinutes: Object.values(d.minutes).reduce((a, b) => a + b, 0),
}));

export const dayByN = n => DAYS[n - 1];

for (const a of Object.values(ASSESSMENTS)) {
  a.questions = a.questions.map((q, i) => ({ ...q, id: `${a.id}-q${i + 1}`, src: a.kind }));
}
export { ASSESSMENTS };

export const QUESTIONS = {};
for (const d of DAYS) for (const q of d.quiz) QUESTIONS[q.id] = q;
for (const a of Object.values(ASSESSMENTS)) for (const q of a.questions) QUESTIONS[q.id] = q;

export const domainOfQuestion = q => topicById[q.t[0]].domain;

// Days on which a topic is taught or practised (primary day first).
export function daysForTopic(topicId) {
  const primary = topicById[topicId].day;
  const extra = DAYS.filter(d => d.n !== primary && d.topics.includes(topicId)).map(d => d.n);
  return [primary, ...extra];
}

// The practice pool (daily + weekly) — mocks stay unseen until mock day.
export const PRACTICE_POOL = Object.values(QUESTIONS).filter(q => q.src === 'daily' || q.src === 'weekly');
