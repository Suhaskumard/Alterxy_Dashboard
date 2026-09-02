# 📝 Practice Mock Exam 1

> ⚠️ **PRACTICE MATERIAL — NOT OFFICIAL EXAM QUESTIONS.** These are written by me to rehearse the
> *style* of the Alteryx Designer Advanced exam (config recall + output prediction + tool
> distinction). The real exam has 51 questions / 2.5 hours / 73% to pass. Use this on **Day 27**,
> closed-book, ~35–40 minutes, then mark it with the key and log the result in
> **📊 Mock Exam Tracker**.

Weighting of these 25 questions roughly follows the real domain weights:
D1 ×7 · D2 ×2 · D3 ×3 · D4 ×5 · D5 ×4 · D6 ×4.

---

### Q1 (D1 · Multi-Row Formula)
A Multi-Row Formula creates new field **`RunTot`**, Num Rows = 1, expression
`[Sales] + [Row-1:RunTot]`, "Values for rows that don't exist" = **`0`**, no Group By.
Input `Sales`: `50, 60, 70, 80`. What is `RunTot` for all four rows?

### Q2 (D1 · Multi-Row Formula)
Same as Q1 but "Values for rows that don't exist" = **`Null()`**. What is `RunTot` for row 1 and row 2?

### Q3 (D1 · Formula functions)
What does `Round(1749, 500)` return? And `Round(3.14159, 0.01)`?

### Q4 (D1 · Formula functions)
`FindString("data-analytics-platform", "-")` returns what? `GetWord("data-analytics-platform", 1)`
returns what (default delimiters)?

### Q5 (D1 · RegEx)
`REGEX_Match("AB-1234", "[A-Z]{2}-\d{4}")` returns ____.
`REGEX_Match("AB-1234 ", "[A-Z]{2}-\d{4}")` (note trailing space) returns ____.

### Q6 (D1 · RegEx tool — Parse vs Match)
You need to split `"2026-09-15"` into three separate fields `Year`, `Month`, `Day`. Which RegEx
tool **output method** and what pattern?

### Q7 (D1 · Filter compound)
Custom filter expression: `[Status] = "Active" OR [Status] = "Pending" AND [Balance] > 0`.
A record with `Status = "Active"`, `Balance = -5` goes to which output (True/False)? Why?

### Q8 (D2 · Render)
A Render tool has **"Group Data into Separate Reports"** enabled on `[Country]` (5 countries) and
outputs to `C:\out\report.pdf`. How many files are produced, and roughly how are they named?

### Q9 (D2 · Layout vs Render)
You have a Table snippet field and a Chart snippet field and want them **stacked in one PDF page**.
What tool goes between them and Render, and set to what orientation?

### Q10 (D3 · Create Points)
Create Points is set with **X = `[Latitude]`, Y = `[Longitude]`**. Describe the symptom you'd see
on the Browse map, and the fix.

### Q11 (D3 · Spatial Match)
Target = 4 territory polygons; Universe = 100 customer points. Match: "Where Target **Contains**
Universe". Territories hold 30 / 25 / 20 / 0 customers respectively, and 5 customers fall in **no**
territory. How many records come out of the **Matched** anchor? Out of **Unmatched**?

### Q12 (D3 · Find Nearest)
Find Nearest: Target = customers (200), Universe = stores (15), find **2 nearest**, max distance 10
miles. Every customer has at least 2 stores within 10 miles. How many rows leave the Matched output?

### Q13 (D4 · Download)
You must send a `POST` with a JSON body `{"id": 42}` and header `Content-Type: application/json`.
In the Download tool, which **tab** holds the JSON body, and which holds the header?

### Q14 (D4 · In-Database)
In an In-DB workflow: `Connect In-DB → In-DB Filter → In-DB Summarize → Data Stream Out → Browse`.
Where does the **Summarize aggregation** actually execute — in the database engine or the Alteryx
engine?

### Q15 (D4 · Dynamic Input)
A Dynamic Input reads 12 files via "Read a List of Data Sources". It errors:
*"…has a different schema than the template file."* Give the cause and two valid fixes.

### Q16 (D4 · Dynamic Rename)
Dynamic Rename method = **"Take Field Names from First Row of Data"**. Input has 4 data rows. How
many rows are downstream of the tool, and why?

### Q17 (D4 · Blob)
You have a folder of 8 PNG files. Which two tools, in what order, read them into a single stream
with one row per image?

### Q18 (D5 · Macro types)
For each task, name the macro type (standard / batch / iterative):
(a) apply the same 5-tool cleaning routine to whatever data is passed in;
(b) run a report once per Region value coming from a control list;
(c) repeatedly remove the top parent from a hierarchy until none remain.

### Q19 (D5 · Batch macro)
A batch macro has a Control Parameter fed 6 records and one Macro Output. Each internal run outputs
~10 rows. Roughly how many total rows on the macro's output anchor, and how many times does the
macro's inner logic run?

### Q20 (D5 · Iterative macro)
Name the **two** independent conditions that will stop an iterative macro.

### Q21 (D5 · Interface Designer / Debug)
Where in Designer do you generate a **standalone workflow populated with the current interface
values** so you can troubleshoot a macro?

### Q22 (D6 · Action tool)
An Action tool targets an Input Data tool. A **Text Box** interface passes `sales_2026.csv`. The
Action is set to **"Update Value (Default)"** on the file property. What is the Input Data tool
reading when the app runs?

### Q23 (D6 · Condition vs Filter)
An app needs to *only run the emailing branch* when a Check Box is ticked. Which interface tool
routes that — **Condition** or **Filter** — and why is the other one wrong here?

### Q24 (D6 · List Box)
A List Box feeds a Dynamic Input's SQL as an `IN (...)` list. The user selects `North` and `South`.
Using **Generate Custom List** with start text `'`, end text `'`, delimiter `,` — what exact string
is produced?

### Q25 (D6 · Block Until Done)
In one workflow you must (1) write a summary table to a database, then (2) read that table back and
email it. Which tool guarantees step 2 starts only after step 1 finishes, and how do you wire it?

---
---

## Answer key

**Q1.** `50, 110, 180, 260` (running total; row 1's `[Row-1:RunTot]` = 0).
**Q2.** Row 1 = **Null** (`[Sales] + Null()` = Null). Row 2 = **Null** as well (`60 + Null` = Null) —
the Null propagates forever. This is *why* you normally use `0` for a running total.
**Q3.** `Round(1749, 500)` = **`2000`** (nearest multiple of 500 — 1749 is closer to 2000 than 1500).
`Round(3.14159, 0.01)` = **`3.14`** (nearest multiple of 0.01 → 2-dp rounding).
**Q4.** `FindString(...)` = **`4`** (zero-based position of the first `-`). `GetWord(..., 1)` =
**`analytics`** (`-` *is* a default word delimiter; index 0 = `data`, 1 = `analytics`).
**Q5.** First = **`True`**. Second = **`False`** — `REGEX_Match` requires the *entire* string to
match; the trailing space breaks it.
**Q6.** **Parse** method, pattern `(\d{4})-(\d{2})-(\d{2})` → 3 output columns (one per marked
group). (Tokenize into 3 columns also works; Parse is the intended "split into fields" answer.)
**Q7.** **True.** `AND` binds tighter than `OR`, so the expression is
`[Status]="Active" OR ([Status]="Pending" AND [Balance]>0)`. `Status="Active"` alone satisfies the
first `OR` operand regardless of Balance.
**Q8.** **5 PDF files**, one per country, with the country value appended/embedded in the file name
(e.g. `report_France.pdf`, …). One combined file is *not* produced.
**Q9.** A **Layout** tool set to **Vertical** (stacked). Then Render. Without Layout, the two
snippet fields render as two separate reports.
**Q10.** Points plot in the **wrong location** (X/Y swapped → longitude/latitude reversed, e.g.
points off the coast of Africa / in the ocean, or mirrored across the map). Fix: **X = Longitude,
Y = Latitude**.
**Q11.** Matched = **75** (30 + 25 + 20; the polygon record is duplicated once per contained point).
Unmatched = **5** (the customers in no territory) — plus, depending on config, the empty 4th
territory reports on the unmatched/target side. Key point: **Spatial Match fans out.**
**Q12.** **400 rows** (200 customers × 2 nearest stores each). Find Nearest returns one row per
Target–Universe pair within N and the max distance.
**Q13.** JSON body → the **Payload** tab (as the POST body / "Take Query String/Body from field" or
composed there). Header → the **Headers** tab. Method `POST` is set on the **Connection** tab.
**Q14.** **In the database engine.** All In-DB transform tools push down as SQL; data returns to the
Alteryx engine only at **Data Stream Out** / **Browse In-DB**.
**Q15.** Cause: at least one of the 12 files has different columns/types/order than the **template**
file the Dynamic Input was configured against. Fixes (any two): make all sources share one schema;
use a **Batch Macro** with an Input Data + Auto Config by Name, driven by the file list; read them
with a wildcard **Input Data** instead; standardise names with **Dynamic Rename** then **Union**
("set output based on all inputs"); use "Output File Name as Field" + manual align.
**Q16.** **3 rows.** "Take Field Names from First Row of Data" **consumes** the first data row to
use as headers, leaving 4 − 1 = 3.
**Q17.** **Directory** → **Blob Input** (Directory lists the 8 files; Blob Input reads each file's
bytes into a Blob field, one row per file). (Blob Input alone with a wildcard also works; Directory
first gives you control + metadata.)
**Q18.** (a) **Standard**; (b) **Batch** (Control Parameter = the Region list); (c) **Iterative**
(loop until the hierarchy stream is empty).
**Q19.** Inner logic runs **6 times** (once per control record); output anchor ≈ **60 rows**
(6 × ~10, stacked/unioned).
**Q20.** (1) The output feeding the **Iteration Output / loop anchor** returns **0 records** (or the
stop condition is satisfied); (2) the **Maximum Number of Iterations** (set in Interface Designer →
Properties) is reached.
**Q21.** **Interface Designer → Debug** (creates a normal standalone workflow with the current
interface answers baked in).
**Q22.** It reads **`sales_2026.csv`** — the Action replaces the Input Data tool's file-path
property in the workflow XML with the Text Box value before the run.
**Q23.** **Condition.** It's an interface tool that routes *configuration/interface flow* (which
Action/branch executes) based on the Check Box value, inside an app. **Filter** only splits *data
records* — it can't stop a branch of the workflow from running.
**Q24.** **`'North','South'`** (each value wrapped in single quotes, joined by a comma).
**Q25.** **Block Until Done.** Wire the write (Output Data) off output anchor **1**, and the
read-back + email chain off a **later** anchor (2 or 3). Block Until Done releases anchor 2 only
after every record has passed through anchor 1, guaranteeing the write completes first.

---

## Score & log

| | |
|---|---|
| Raw score | ___ / 25 |
| Percent | ___ % |
| Passing bar (official) | 73% |
| My target | 80–85% |
| Weakest domain(s) | __________ |
| Every wrong answer added to 📝 Practice Questions with a Mistake Type? | ☐ |
| Logged in 📊 Mock Exam Tracker (row "Practice Mock 1")? | ☐ |

If < 80%: the Day 28 focus is your weakest domain here. If ≥ 85%: spend Day 28 on breadth
(re-scan every Domain Checklist) + a fresh, harder second mock.
