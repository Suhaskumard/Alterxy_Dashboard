# 🎯 ALTERYX ADVANCED CERTIFICATION — MASTER DASHBOARD

> Build this as the top page inside **📁 ALTERYX ADVANCED CERTIFICATION**. Everything below is a
> section to recreate — headings, callouts, and **linked database views** (Notion: type `/linked`
> → pick the database → apply the filter/sort shown). The interactive HTML dashboard in this
> bundle mirrors this layout and works before Notion is set up.

---

## 🎯 OVERALL PROGRESS  *(callout block, updated at each Weekly Review + Day 28)*

| Metric | Value | How to get it |
|--------|:-----:|---------------|
| Overall completion | ___ % | ✅ Master Topic Tracker → *All Topics* view → footer *Calculate → Percent* on `Done?` (or Domain Progress avg) |
| Topics completed | ___ / 77 | Master Topic Tracker → filter `Type is Official` + `Status is 🟢 Completed` → count |
| Study hours | ___ / 56 | 🗓️ Daily Study Tracker → `sum(Actual Hours)` |
| Remaining planned hours | ___ | `56 − sum(Actual Hours)` |
| Challenges | ___ / 4 confirmed (+___ recommended) | 🏆 Weekly Challenge Tracker → `Status is Completed` |
| Mock exam average | ___ % | 📊 Mock Exam Tracker → `mean(Score %)` |
| Topics needing revision | ___ | Master Topic Tracker → `Status is 🔵 Needs Revision` |
| **Exam readiness** | ___ % | see 🚦 section below |

Also show: **Completed / Pending / Needs-Revision** counts and **Challenges Completed / Pending**.

---

## 📅 TODAY  *(the "what do I do for my 2 hours?" block)*

- **Today's date:** ___  ·  **Day #:** ___  ·  **Week:** ___
- **Linked view — 🗓️ Daily Study Tracker · "TODAY"**
  Filter: `Date is Today` *(or, if you didn't set dates: `Day is "Day NN"`)*. Shows Topics,
  Planned Tasks, Completed Tasks, Daily Completion %, Main Weakness, Next Action.
- **Linked view — ✅ Master Topic Tracker · "TODAY'S STUDY"**
  Filter: `Day equals <today's number>` AND `Type is Official`. Sort: Priority ↓.
- **Today's checklist:** open `03-28-Day-Study-Plan.md` at Day ___ (the detailed checkboxes).
- **Today's Weekly Challenge:** ___ (from the Daily Study Tracker `Notes`, if any).
- **Today's revision:** any row where `Next Review ≤ today` OR `Status is 🔵 Needs Revision`.

---

## 📊 DOMAIN PROGRESS  *(from the 📈 Domain Progress database — see 00-SETUP)*

| Domain | Weight | Progress |
|--------|:------:|:--------:|
| D1 · Advanced Data Prep & Transformation | 27% | ▓▓▓▓▓░░░░░ ___ % |
| D2 · Reporting Tools | 10% | ___ % |
| D3 · Spatial Analytics Basics | 10% | ___ % |
| D4 · Data Sources | 15% | ___ % |
| D5 · Macros | 18% | ___ % |
| D6 · Analytical Apps & Productionizing | 20% | ___ % |
| **Overall syllabus completion** | 100% | **___ %** |

*Recreate as a linked view of **📈 Domain Progress** (table, showing `Domain %` as a bar/number),
or a **Board** view of ✅ Master Topic Tracker grouped by `Domain` with the "Percent checked"
calculation on `Done?` shown per group.*

---

## 🔴 WEAK AREAS

**Linked view — ✅ Master Topic Tracker · "WEAK AREAS"**
Filter: `Confidence is 1 — Don't understand` **OR** `Confidence is 2 — Basic understanding`
**OR** `Status is 🔵 Needs Revision`.
Sort: Exam Weight ↓ (use the hidden `Weight #` number), then Priority ↓.
Show: Topic, Domain, Day, Confidence, Mistakes, Next Review.

> If this view is empty (or only `Confidence 4` items remain), that's a GO signal for the exam.

---

## ⏳ PENDING

**Linked view — ✅ Master Topic Tracker · "WHAT IS PENDING?"**
Filter (match **any**): `Status is not 🟢 Completed` · `Confidence ≤ 2` · `Weak Area is checked`.
Sort: **Exam Weight ↓ → Priority ↓ → Status → Day ↑**.
Show: Topic, Domain, Exam Weight, Priority, Day, Status, Theory/Hands-on/Practice/Revision/Challenge.

**Companion linked views:**
- 🗓️ Daily Study Tracker · *"Behind schedule"* — `Status is not 🟢 Completed` AND `Date ≤ today`.
- 🏆 Weekly Challenge Tracker · *"Pending"* — `Status is not Completed`.
- 🛠️ Tool Mastery · *"Not mastered"* — `Status is not 🟢 Completed`, sorted by Domain.

---

## 🏆 CHALLENGES

**Linked view — 🏆 Weekly Challenge Tracker**, split two ways:
- **Done** — `Status is Completed` — show Challenge Number, Name, Date Completed, Confidence, What I Learned.
- **Pending** — `Status is not Completed` — show Challenge Number, Name, Domain, Certification Relevance, Notes.

Confirmed target: **#3, #56, #6, #86** all Completed before booking the exam.

---

## 📝 MOCK TESTS

**Linked view — 📊 Mock Exam Tracker** (table, sorted `Date ↑`): Test Number, Date, Score %,
Passing Score (73), Personal Target (82), Pass?, Target hit?, Weak Domain.

- **Latest score:** ___ %  ·  **Average:** ___ %  ·  **Trend:** ___ → ___
- Target: **≥ 80%** on ≥ 2 mocks, **no domain < 70%**.

---

## 🚦 EXAM READINESS  *(callout — fill on Day 27–28)*

| | |
|---|---|
| **Strongest domain** | __________ |
| **Weakest domain** | __________ |
| **Overall confidence** (avg of `Confidence`) | ___ / 5 |
| **Mock average** | ___ % |
| **Topics remaining** | ___ / 77 |
| **Challenges remaining** | ___ |
| **Readiness %** *(see formula)* | ___ % |
| **Recommended next step** | __________ |

**Readiness % (rough composite):**
```
0.50 × (official topics 🟢 Completed / 77 × 100)
+ 0.30 × (latest mock Score %)
+ 0.10 × (min(confidence avg,5)/5 × 100)
+ 0.10 × (confirmed challenges completed / 4 × 100)
```
**GO** when Readiness ≥ 90, both mocks ≥ 80%, every domain ≥ 70%, and `10-Final-Exam-Readiness.md`
is fully ticked.

---

## Sub-pages (link these under the dashboard)

📚 Official Syllabus · 📅 28-Day Study Plan · ✅ Master Topic Tracker · 🗓️ Daily Study Tracker ·
⏳ What Is Pending? *(view)* · 📖 Learning Resources · 🧩 Prerequisite / Basics · 🛠️ Tool Mastery ·
🏆 Weekly Challenges · 📝 Practice Questions · 📝 Practice Mock Exam 1 · 📊 Mock Exams ·
📈 Domain Progress · 🔄 Weekly Reviews · 🔴 Weak Areas *(view)* · 🚀 Final Exam Readiness ·
🔍 Official Syllabus Audit · 🧠 Study Philosophy · ⚙️ Config
