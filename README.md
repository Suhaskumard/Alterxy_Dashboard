# Alteryx Advanced — 28-Day Mastery Platform

A self-contained study platform for the **Alteryx Designer Advanced Certification**. It needs no accounts, no build step and no external tools.

- **28-day curriculum** covering all six exam domains, with time weighted by the official blueprint (D1 27% · D6 20% · D5 18% · D4 15% · D2 10% · D3 10%).
- **Every day** has an objective, why it matters, a lesson, a guided Designer build, recall drills, a challenge, an assessment, common mistakes and exam tips, and mastery criteria.
- **15 official Alteryx Weekly Challenges**, each linked to its own Community thread, plus 14 internal challenges for gaps in the official catalogue.
- **Assessments**: 25 daily quizzes, 3 weekly checkpoints, a blueprint-weighted 51-question Mock A and a 25-question Mock B, plus targeted weak-topic and per-domain practice sets.
- **Mastery tracking** is evidence-based (Not Started → Learning → Practicing → Competent → Mastered) and kept separate from day completion. Weak areas are detected automatically.
- **Preparation readiness** is built from mastery, accuracy, challenges, mocks and weak-area control. It is explicitly *not* an official pass prediction.

## Run locally

ES modules need an HTTP server:

```sh
python -m http.server 8000   # then open http://localhost:8000
```

## Structure

```
index.html            app shell
css/app.css           design tokens (light/dark) and components
js/app.js             router + theme
js/state.js           localStorage persistence, migration, export/import
js/engine.js          calendar, mastery, weak areas, readiness, next action
js/data/              domains, topics, week1–4 lessons, challenges, assessments
js/views/             one module per page
scripts/validate.mjs  content + engine checks: node scripts/validate.mjs
```

## Deploy

This is a static site; Vercel serves it as-is (`vercel.json`). Progress is stored per browser under the key `alteryx-adv-mastery-v2`.

Independent study tool. It is not affiliated with Alteryx, and its practice questions are not official exam content.
