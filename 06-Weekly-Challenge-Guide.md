# 🏆 Weekly Challenge Guide

The official guide names the **Alteryx Community Weekly Challenges** as a learning resource but does
**not** list specific challenge numbers. So this page separates two things:

- **CONFIRMED (4)** — the exact challenges *you* specified: **#3, #56, #6, #86**. Scheduled into the plan.
- **RECOMMENDED PRACTICE** — extra challenges by *skill*. Because I can't verify individual
  challenge numbers/titles/URLs from the guide, these are given as a **selection recipe** against
  the real Weekly Challenge Index plus clearly-labelled *candidates to verify*.

**Reliable entry points (these URLs are stable):**
- Weekly Challenge board → <https://community.alteryx.com/t5/Weekly-Challenge/bd-p/weekly-challenge>
- Search "**Weekly Challenge Index**" from that board — the Index post groups every challenge by
  **difficulty** (Beginner / Intermediate / Advanced / Expert) and usually lists the **tools used**.
- If a specific link 404s, search the challenge title on <https://community.alteryx.com>.

**Logging:** every challenge = one row in **🏆 Weekly Challenge Tracker**. Record Date Started/
Completed, Attempt #, Time Taken, Hint Used, Solution Viewed, Confidence, Mistakes, What I Learned.
Rule: **build your own solution first, download the official solution only after you've finished (or
are truly stuck for 20+ min), then rebuild it a second way.**

---

## CONFIRMED CHALLENGES

### ⭐ Challenge #3 — Running Averages  · Day 2–3 · Domain 1
**Why I'm doing it:** it's the canonical Multi-Row Formula exercise and D1 is 27% of the exam.
**Topics it reinforces:** Multi-Row Formula tool; running / cumulative calculation; "identify output
from expressions"; the "values for rows that don't exist" setting.
**What to learn from it:**
- Exactly what `[Row-1:Field]` returns on the first row and how the "rows that don't exist" value
  changes it.
- How Group By scopes a running calculation.
- A second way to get the same answer (Summarize + Join, or Multi-Row with a counter) so you can
  recognise equivalent approaches in exam questions.

### ⭐ Challenge #56 — Parsing and Counting Hashtags  · Day 5–6 · Domain 1
**Why I'm doing it:** the exam explicitly tests "identify the regular expression that results in a
given output" and "parse vs match".
**Topics it reinforces:** RegEx tool (Tokenize / Parse / Match); regex character classes &
quantifiers; Text To Columns; Summarize for counts; aggregation.
**What to learn from it:**
- When **Tokenize** (→ rows) beats **Parse** (→ columns) and vice-versa.
- A hashtag pattern (`#\w+`) and how to make it stricter/looser.
- Do it a second time with the **Match** method and compare the output shape.

### ⭐ Challenge #6 — Spatial Route  · Day 16–17 · Domain 3
**Why I'm doing it:** spatial is 10% and needs hands-on repetition to feel natural.
**Topics it reinforces:** Create Points; building/inspecting spatial objects; Distance;
combining objects; the Browse map.
**What to learn from it:**
- Turning coordinates into points and a route line.
- Measuring distance along the route and reading the units.
- Inspecting the spatial object (WKT) at each step so you can *predict* what a spatial tool emits.

### ⭐ Challenge #86 — Create a Macro That Generates Past Dates  · Day 20–22 · Domain 5 (+ D1, D6)
**Why I'm doing it:** it combines *four* exam areas at once — macro construction, Generate Rows,
DateTime functions, and Interface tools.
**Topics it reinforces:** standard/batch macro build; Macro Input/Output; Generate Rows (date mode);
`DateTimeAdd` / `DateTimeToday`; a Numeric Up Down (or Text Box) interface + Action.
**What to learn from it:**
- Wrapping working logic into a macro with a clean interface question.
- Generating a date series backwards from today with Generate Rows.
- Wiring the interface value to the logic with an Action tool, and testing it in Interface Designer.

---

## RECOMMENDED PRACTICE — selection recipe (not named in the guide)

For each row below: open the **Weekly Challenge Index**, filter by the **Tool** and by
**Difficulty = Advanced** (fall back to Intermediate if there's nothing suitable), pick one, and
put its real number/title into the tracker row (replace `"(verify on Index)"`).

| Skill to drill | Do it on/after | Index filter (Tool) | Why |
|----------------|:--------------:|---------------------|-----|
| **Multi-Field Formula** | Day 3 | Multi-Field Formula | D1 is 27%; MFF is under-practised vs Multi-Row |
| **Advanced RegEx parsing** (2nd rep) | Day 5 | RegEx | "identify the regex for a given output" needs volume |
| **DateTime parsing / date maths** | Day 4 | DateTime / Formula | DateTime "across multiple tools" is its own objective |
| **Dynamic Input + Directory** (batch file reading) | Day 10 | Dynamic Input / Batch Macro | classic D4 scenario + schema-mismatch handling |
| **Reporting** (Table → Layout → Render) | Day 13 | Render / Table | D2's 10% is fastest to lock in with one good challenge |
| **Batch macro** | Day 20 | Batch Macro / Control Parameter | build a 2nd batch macro from a different angle |
| **Iterative macro** | Day 21 | Iterative Macro | iterative is the hardest macro type — needs a real rep |
| **Analytical App / Interface** | Day 25 | Interface Tools / Action / Analytic App | D6 is 20%; wiring Action→XML is best learned by doing |

**Candidate numbers to check (verify title & tool on the Index before trusting):**
- Iterative macro: **#24** is frequently cited in the community as an iterative-macro challenge —
  confirm on the Index.
- Batch macro / Dynamic Input: look in the Index's **Advanced** section under "Batch Macro".
- Do **not** treat any unverified number as correct — the Index is the authority.

---

## Suggested pacing (fits the 28-day plan)

| Week | Confirmed | Optional recommended |
|------|-----------|----------------------|
| 1 | #3 (Day 2–3), #56 (Day 5–6) | Multi-Field Formula, DateTime, RegEx #2 |
| 2 | — | Dynamic Input + Directory (Day 10), Reporting (Day 13) |
| 3 | #6 (Day 16–17), #86 start (Day 20–21) | Batch macro (Day 20), Iterative macro (Day 21) |
| 4 | #86 finish (Day 22) | Analytical App / Interface (Day 25) |

**Minimum before you book the exam:** all **4 confirmed** challenges `Completed` with a filled-in
"What I Learned", plus at least **2** recommended challenges covering your weakest domains.
