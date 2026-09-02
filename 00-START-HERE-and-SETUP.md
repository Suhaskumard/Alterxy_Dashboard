# 00 · START HERE — Alteryx Designer Advanced Certification · Notion Study System

This bundle builds a complete Notion workspace for the **Alteryx Designer Advanced Certification**
from the **official Exam Prep Guide** (`Alteryx_advanced_exam_prep_guide_2026.pdf`). Every exam
topic in the guide is tracked as an individual, checkable item.

---

## ⚠️ The 4-tier rule (read this first)

Everything in this system is tagged into exactly one tier. Nothing outside the guide is ever
presented as an exam requirement.

| Tier | Meaning | Where it appears |
|------|---------|------------------|
| **OFFICIAL** | Written in the official Exam Prep Guide's Content Outline | 77 rows in the Master Topic Tracker (`Type = Official`), all Domain Checklists, the Syllabus, the Audit |
| **PREREQUISITE** | Core-level knowledge you need *before* Advanced topics make sense. **Not on the exam outline.** | `04-Prerequisite-Basics-Check.md`, Master Topic Tracker rows with `Type = Prerequisite` |
| **RECOMMENDED PRACTICE** | Useful drills / extra Weekly Challenges I added. Not named in the guide. | Weekly Challenge Tracker rows marked `(verify on Index)`, some hands-on tasks |
| **OPTIONAL ADVANCED** | Deeper practice beyond exam scope | Clearly labelled inside the study-plan notes |

The official passing score is **73%** (from the guide). **80–85% is only *your* personal
preparation target** — it is not an official number.

---

## What's in the folder

| File | Becomes (in Notion) |
|------|---------------------|
| `00-START-HERE-and-SETUP.md` | This setup guide (import as a page, or just keep it open) |
| `01-Master-Dashboard.md` | The **🎯 Master Dashboard** page |
| `02-Official-Syllabus.md` | **📚 Official Syllabus** page |
| `03-28-Day-Study-Plan.md` | **📅 28-Day Study Plan** page (per-day checklists) |
| `04-Prerequisite-Basics-Check.md` | **🧩 Prerequisite / Basics** page |
| `05-Domain-Checklists.md` | **✅ Domain Checklists** page (6 checklists) |
| `06-Weekly-Challenge-Guide.md` | **🏆 Weekly Challenges** guide page |
| `07-Learning-Resources-Map.md` | **📖 Learning Resources** guide page |
| `08-Tool-Mastery-Guide.md` | **🛠️ Tool Mastery** notes page |
| `09-Weekly-Reviews.md` | **🔄 Weekly Reviews** page (4 templates) |
| `10-Final-Exam-Readiness.md` | **🚀 Final Exam Readiness** page |
| `11-Official-Syllabus-Coverage-Audit.md` | **🔍 Official Syllabus Audit** page |
| `12-Study-Philosophy.md` | **🧠 Study Philosophy** page |
| `13-Practice-Mock-Exam-1.md` | **📝 Practice Mock Exam 1** page (25 Qs + key) |
| `db-Master-Topic-Tracker.csv` | **✅ Master Topic Tracker** database (90 rows: 77 official + 13 prerequisite) |
| `db-Daily-Study-Tracker.csv` | **🗓️ Daily Study Tracker** database (28 rows) |
| `db-Weekly-Challenge-Tracker.csv` | **🏆 Weekly Challenge Tracker** database (12 rows) |
| `db-Tool-Mastery.csv` | **🛠️ Tool Mastery** database (60 rows) |
| `db-Practice-Questions.csv` | **📝 Practice Questions** database (25 seeded, with answers + explanations) |
| `db-Mock-Exam-Tracker.csv` | **📊 Mock Exam Tracker** database (4 rows) |
| `db-Learning-Resources.csv` | **📖 Learning Resources** database (25 rows) |
| `alteryx-advanced-tracker.html` | **Visual dashboard** — open in any browser. Works offline; saves progress in that browser. Mirrors the 28-day plan with tickable checklists, a progress ring, domain bars, challenge + mock trackers. Published copy: <https://claude.ai/code/artifact/34776c15-e956-4cdb-afd9-bae9db271dbe> |
| `regenerate-databases.py` | Rebuilds the 7 `db-*.csv` files **and** `11-...Audit.md` from one 77-topic table. Run `python regenerate-databases.py` after editing that table. |
| `rebuild-dashboard.py` | Rebuilds `alteryx-advanced-tracker.html` (reads `artifact_data.json` — regenerate that from the plan if you change Day content). |

> **Two ways to use this bundle:** (a) the **HTML dashboard** works immediately, no setup — open
> `alteryx-advanced-tracker.html`; or (b) build the full **Notion** system below for relational
> views, rollups, and filtering. They cover the same plan; use either or both.

---

## Import procedure (15–20 min)

### 1. Create the parent page
In Notion: **New page** → title it **`📁 ALTERYX ADVANCED CERTIFICATION`**. Everything below is
nested inside it.

### 2. Import the databases (CSV)
For **each** `db-*.csv`:
1. Inside the parent page, type `/import` → **CSV** (or drag the file onto the page).
2. Notion creates a **new database** with every column as **Text**. Rename it per the table above.
3. Open the new database → **•••** → **Merge with CSV** is *not* needed; just fix the column types
   (next section).

> Notion CSV import always lands columns as plain text. Converting a column type keeps the cell
> values. Multi-value cells (comma-separated) split automatically **after** you switch the column to
> *Multi-select*.

### 3. Import the pages (Markdown)
For each `.md` file: `/import` → **Text & Markdown** → pick the file. Notion renders headings,
tables, and `- [ ]` checkboxes as native blocks. Rename each page with the emoji title above.

### 4. Build the linked views on the Dashboard
Follow `01-Master-Dashboard.md` — it lists every linked view with its exact filter and sort.

---

## ⚙️ Start Date (make the plan calendar-aware — optional)

The plan is written in **relative days (Day 1–28)** so you can start whenever you like.
To get real dates:

1. Create a one-row database **`⚙️ Config`** with a **Date** property `Start Date`. Set it to the
   day you begin.
2. In **🗓️ Daily Study Tracker**, the `Day Offset` column already holds 0–27. Add a **Formula**
   property `Date` =
   ```
   dateAdd(prop("Start Date (from Config)"), prop("Day Offset"), "days")
   ```
   To reference Config, add a **Relation** to `⚙️ Config` on every row (or simpler: just set the
   `Date` column type to **Date** and fill 28 dates by hand — 2 minutes).
3. Leave every other file day-relative. When a "Weekly Review" says *end of Week 1*, that's after
   Day 7.

Booking the exam: schedule it for **1–2 days after Day 28**, and only once your mock scores are
consistently **≥ 80%** (see `10-Final-Exam-Readiness.md`).

---

## Database schemas — property types & options

Set these **after** CSV import. `→` shows what to change each text column into.

### ✅ Master Topic Tracker  (title column = **Topic**)

| Property | Type | Options / notes |
|----------|------|-----------------|
| Topic | Title | — |
| Subtopic | Text | granular points to understand |
| Domain | Select | `D1 · Advanced Data Prep & Transformation`, `D2 · Reporting Tools`, `D3 · Spatial Analytics Basics`, `D4 · Data Sources`, `D5 · Macros`, `D6 · Analytical Apps & Productionizing`, `Prerequisite (not on exam outline)` |
| Exam Weight | Select | `27%`, `15%`, `20%`, `18%`, `10%`, `—` |
| Priority | Select | `High` 🔴, `Medium` 🟠, `Low` ⚪ |
| Week | Select | `1`, `2`, `3`, `4` |
| Day | Number | 1–28 |
| Status | **Status** | To-do group: `🔴 Not Started` · In-progress: `🟡 In Progress` · Complete: `🟢 Completed`, `🔵 Needs Revision` |
| Difficulty | Select | `Easy`, `Medium`, `Hard` |
| Theory Complete | Checkbox | |
| Hands-on Complete | Checkbox | |
| Practice Complete | Checkbox | |
| Revision Complete | Checkbox | |
| Challenge Complete | Checkbox | |
| Confidence | Select | `1 — Don't understand`, `2 — Basic understanding`, `3 — Can use with help`, `4 — Comfortable`, `5 — Exam ready` (CSV holds the number; relabel the options) |
| Weak Area | Checkbox | |
| Notes | Text | |
| Mistakes | Text | |
| Resource | Text | |
| Resource URL | URL | |
| Last Reviewed | Date | |
| Next Review | Date | |
| Completion % | **Formula** | see below |
| Type | Select | `Official`, `Prerequisite`, `Recommended`, `Optional` |

**`Completion %` formula:**
```
round(((if(prop("Theory Complete"),1,0) + if(prop("Hands-on Complete"),1,0)
     + if(prop("Practice Complete"),1,0) + if(prop("Revision Complete"),1,0)
     + if(prop("Challenge Complete"),1,0)) / 5) * 100)
```
Optional **`Done?`** formula (drives rollups): `prop("Completion %") == 100 or prop("Status") == "🟢 Completed"`

### 🗓️ Daily Study Tracker  (title column = **Day**)

| Property | Type | Notes |
|----------|------|-------|
| Day | Title | `Day 01` … `Day 28` |
| Date | Date | fill from Start Date + Day Offset |
| Day Offset | Number | 0–27 (already populated) |
| Week | Select | `1`–`4` |
| Domain | Select | same domain options as above + `Setup + Prerequisites + D1`, `Revision + Mock` |
| Topics | Text | today's focus |
| Planned Hours | Number | 2 |
| Actual Hours | Number | you fill in |
| Planned Tasks | Number | count of checkbox tasks that day (see `03-...`) |
| Completed Tasks | Number | you update as you go |
| Remaining Tasks | Formula | `prop("Planned Tasks") - prop("Completed Tasks")` |
| Daily Completion % | Formula | `if(prop("Planned Tasks") == 0, 0, round(prop("Completed Tasks") / prop("Planned Tasks") * 100))` |
| Status | Status | `🔴 Not Started`, `🟡 In Progress`, `🟢 Completed`, `🔵 Needs Revision` |
| Notes | Text | |
| Main Weakness | Text | the one thing you were worst at today |
| Next Action | Text | what to fix tomorrow |

### 🏆 Weekly Challenge Tracker  (title column = **Challenge Number**)

| Property | Type | Notes |
|----------|------|-------|
| Challenge Number | Title | `#3`, `#56`, `#6`, `#86`, `(verify on Index)` |
| Challenge Name | Text | |
| Topic | Text | |
| Domain | Select | domain options |
| Difficulty | Select | `Beginner`, `Beginner–Intermediate`, `Intermediate`, `Intermediate–Advanced`, `Advanced`, `Advanced–Expert`, `Advanced (target)` |
| Certification Relevance | Text | `CONFIRMED` vs `RECOMMENDED PRACTICE` |
| Date Started / Date Completed | Date | |
| Attempt Number | Number | |
| Status | Status | `Not Started`, `Attempted`, `Completed`, `Reattempt Required` |
| Time Taken | Text | e.g. `35 min` |
| Hint Used | Checkbox | |
| Solution Viewed | Checkbox | |
| Confidence | Select | 1–5 (as above) |
| Mistakes | Text | |
| What I Learned | Text | |
| Notes | Text | |
| Resource URL | URL | |

### 🛠️ Tool Mastery  (title column = **Tool**)

| Property | Type | Notes |
|----------|------|-------|
| Tool | Title | |
| Domain | Select | `D1`…`D6`, `Supporting (…)`, `Prerequisite` |
| What it does / Inputs / Outputs / Important configuration / Common mistakes / Exam traps | Text | |
| Hands-on completed | Checkbox | |
| Output prediction completed | Checkbox | ("can I predict the output without running it?") |
| Confidence | Select | 1–5 |
| Status | Status | `🔴 Not Started`, `🟡 In Progress`, `🟢 Completed`, `🔵 Needs Revision` |
| Type | Select | `Official`, `Supporting`, `Prerequisite` |

### 📝 Practice Questions  (title column = **Question**)

| Property | Type | Notes |
|----------|------|-------|
| Question | Title | |
| Domain | Select | domain options |
| Topic | Text | |
| Difficulty | Select | `Easy`, `Medium`, `Hard` |
| My Answer | Text | fill during study |
| Correct Answer | Text | pre-filled |
| Correct/Incorrect | Select | `Correct`, `Incorrect`, `Partial` |
| Explanation | Text | pre-filled |
| Mistake Type | Select | `Concept misunderstanding`, `Configuration mistake`, `Output prediction mistake`, `Tool confusion`, `Formula mistake`, `Careless mistake`, `Question interpretation mistake` |
| Revision Required | Checkbox | |
| Confidence | Select | 1–5 |

### 📊 Mock Exam Tracker  (title column = **Test Number**)

| Property | Type | Notes |
|----------|------|-------|
| Test Number | Title | |
| Date | Date | |
| Total Questions | Number | 51 real exam / 25 practice mock 1 |
| Correct / Incorrect | Number | |
| Score % | Formula | `if(prop("Total Questions") == 0, 0, round(prop("Correct") / prop("Total Questions") * 100))` |
| Passing Score | Number | 73 |
| Personal Target | Number | 82 |
| Time Taken | Text | e.g. `1h 55m` (limit 2.5h) |
| Weak Domain | Select | domain options |
| Weak Topics | Text | |
| Revision Required | Checkbox | |
| Retest Date | Date | |
| Pass? | Formula | `prop("Score %") >= prop("Passing Score")` |
| Target hit? | Formula | `prop("Score %") >= prop("Personal Target")` |

### 📖 Learning Resources  (title column = **Topic**)
All Text except `Resource URL` → URL.

### ⚙️ Config  (create manually)
One row. `Start Date` (Date). Optional: `Personal Target %` (Number = 82), `Exam Date` (Date).

---

## Recommended views (build on the Dashboard or each database)

> In every filter, "not Completed" means `Status is not 🟢 Completed` **and** `Status is not`
> (empty). Notion's Status "Complete" group makes this easy: filter `Status` → *is not* → `🟢 Completed`.

### On **✅ Master Topic Tracker**

| View | Type | Filter | Sort |
|------|------|--------|------|
| **All Topics** | Table | `Type is Official` | Day ↑ |
| **TODAY'S STUDY** | Table | `Day` = *(today's day number)* · `Type is Official` | Priority ↓ |
| **WHAT IS PENDING?** | Table | `Status` is not `🟢 Completed` **OR** `Confidence` is `1…` / `2…` **OR** `Weak Area` is checked | Exam Weight ↓, then Priority ↓, then Status, then Day ↑ |
| **WEAK AREAS** | Table/Board | `Confidence` is `1 — Don't understand` OR `2 — Basic understanding` OR `Status` is `🔵 Needs Revision` | Exam Weight ↓ |
| **By Domain** | Board | group by `Domain`; filter `Type is Official` | — |
| **By Status** | Board | group by `Status` | Day ↑ |
| **Prerequisites** | Table | `Type is Prerequisite` | — |
| **Week 1 / 2 / 3 / 4** | Table (one each) | `Week is 1` (etc.) | Day ↑ |
| **Calendar** | Calendar | date = `Next Review` (revision planning) | — |

> Notion can't sort a Select like `27%` numerically. Either (a) add a hidden **Number** property
> `Weight #` (27/20/18/15/10/0) and sort on that, or (b) rename options `A · 27%`, `B · 20%`,
> `C · 18%`, `D · 15%`, `E · 10%`, `F · —` so alphabetical = weight order. Recommended: option (a).

### On **🗓️ Daily Study Tracker**

| View | Filter | Sort |
|------|--------|------|
| **TODAY** | `Date is today` (or `Day is Day NN`) | — |
| **This Week** | `Week is` *(current)* | Day ↑ |
| **Behind schedule** | `Status` is not `🟢 Completed` AND `Date` is *on or before today* | Day ↑ |
| **Calendar** | date = `Date` | — |
| **All 28** | none | Day ↑ |

### On **🏆 Weekly Challenge Tracker**

| View | Filter | Sort |
|------|--------|------|
| **Confirmed 4** | `Challenge Number` is `#3`/`#56`/`#6`/`#86` | Domain |
| **Pending** | `Status` is not `Completed` | Domain |
| **Done** | `Status` is `Completed` | Date Completed ↓ |

### On **📊 Mock Exam Tracker**
- **All attempts** sorted Date ↑ · a **Board** grouped by `Pass?` · show `Score %` big.

---

## 📈 Domain Progress (Step 17)

Create a small database **📈 Domain Progress** with 6 rows (D1–D6) and:
- `Domain` (Title), `Exam Weight` (Number), `Weight # for sort`.
- `Topics` = **Relation** → ✅ Master Topic Tracker (link each domain's official rows; use the
  *By Domain* board to multi-select fast).
- `Topics Done` = **Rollup** on the relation → `Done?` → *Checked count* (or *Percent checked*).
- `Topic Count` = **Rollup** → *Count*.
- `Domain %` = **Formula** `if(prop("Topic Count")==0,0,round(prop("Topics Done")/prop("Topic Count")*100))`.

**Overall syllabus completion** (put on the Dashboard as a callout):
- Easiest: a **Rollup**-free approach — on ✅ Master Topic Tracker filtered `Type is Official`,
  Notion shows *Calculate → Percent checked* on the `Done?` column at the bottom of the view.
- Or a formula DB "📊 Stats" with one row pulling rollups from Domain Progress.

Metrics to surface (all available as view *Calculate* footers or Domain Progress rollups):
Completed Topics · Pending Topics · Topics Needing Revision (`Status = 🔵`) · Challenges Completed /
Pending · Total Study Hours (`sum(Actual Hours)` on Daily Study Tracker) · Remaining Planned Hours
(`56 − sum(Actual Hours)`).

---

## Daily routine (2 hours)

1. Open **🗓️ Daily Study Tracker → TODAY**. Read `Topics` + open `03-28-Day-Study-Plan.md` at that day.
2. **~40 min** — Theory: the resource(s) for today (see `07` / Learning Resources DB). Tick
   `Theory Complete` on each topic row.
3. **~60 min** — Hands-on in Designer: build the day's workflows. **Predict every tool's output
   before you run it.** Tick `Hands-on Complete`.
4. **~20 min** — Recall: answer that domain's Practice Questions, note mistakes, update
   `Confidence` (1–5) and `Weak Area` on each topic row.
5. If a Weekly Challenge is scheduled, log it in **🏆 Weekly Challenge Tracker**.
6. Fill `Actual Hours`, `Completed Tasks`, `Main Weakness`, `Next Action`, set the day's `Status`.
7. Glance at **WHAT IS PENDING?** and **WEAK AREAS** before closing.

Difficult domains (Macros, Analytical Apps, Multi-Row Formula, RegEx, In-Database, spatial-in-
Formula) — shift the split to ~30 theory / ~75 hands-on / ~15 recall.
