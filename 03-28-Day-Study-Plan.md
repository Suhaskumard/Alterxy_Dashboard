# 📅 28-Day Study Plan — Alteryx Designer Advanced Certification

**2 hours/day · 7 days/week · 28 days ≈ 56 hours.** Days are **relative** (Day 1 = the day you
start). Fill the `Date` beside each day from your Start Date.

**Default time split:** ~40 min theory · ~60 min hands-on in Designer · ~20 min recall/questions.
Hard days (marked ⚡) shift to ~30 / ~75 / ~15.

### How the 4 weeks are allocated (and why it deviates slightly from a naive split)

| Week | Days | Focus | Rationale |
|------|------|-------|-----------|
| **1** | 1–7 | **Domain 1** (27%) in full | Biggest, hardest domain — it earns a whole week, not a shared one |
| **2** | 8–14 | **Domain 4** (15%, Days 8–11) + **Domain 2** (10%, Days 12–14) | |
| **3** | 15–21 | **Domain 3** (10%, Days 15–17) + **Domain 5 Macros** (18%, Days 18–21) | Macros keep ~a full week — technically the hardest 18% |
| **4** | 22–28 | **Macros finish** (Day 22) + **Domain 6** (20%, Days 23–26) + **revision & 2 mock exams** (Days 27–28) | |

Every one of the 77 official topics is taught on Days 1–26; Days 27–28 are revision + mocks.
*This is a defensible reallocation of the "Week 2 = D4+D2+D3 / Week 3 = Macros" idea, driven by the
official weights and by tool count. Adjust freely if your weak areas say otherwise.*

**Status values for each day:** `🔴 Not Started` · `🟡 In Progress` · `🟢 Completed` · `🔵 Needs Revision`

---
# WEEK 1 — Domain 1: Advanced Data Preparation & Transformation (27%)
---

## Day 1 — Setup + Prerequisite gap-check + Multi-Row Formula (mechanics) ⚡
- **Domain:** Setup / Prerequisite / D1 · **Exam Weight:** 27% (D1) · **Priority:** High
- **Date:** ______ · **Split:** 45 setup+prereq / 55 hands-on / 20 recall

**Topics:** Build the tracker; confirm Core prerequisites; Multi-Row Formula tool core mechanics.
**Subtopics:** previous/current/next row references, Group By, Num Rows, new-field type & size.
**Tools:** Multi-Row Formula (+ Input Data, Select, Sort, Summarize, Join, Union for the prereq check).
**Functions:** row references `[Row-1:Field]`, `[Row+1:Field]`, `[Row-2:Field]`.
**Theory:** Read Help → *Multi-Row Formula Tool*. Skim `04-Prerequisite-Basics-Check.md`.
**Hands-on:** On a small sales table (date, region, sales) add `[Row-1:Sales]` and `[Row+1:Sales]`
as fields; try Group By = Region; change Num Rows to 2.
**Practice / Recall:** Predict the first & last row values *before* running. Do 3 Practice Questions (D1).
**Revision:** none (Day 1).
**Weekly Challenge:** none.
**Expected outcome:** Notion system is live; you can explain what every row offset returns and when
it is empty.

### Checklist
- [ ] Import all 7 CSVs + 14 markdown pages into Notion (per `00-START-HERE`)
- [ ] Set property types, Status options, Confidence labels, and the 3 formulas
- [ ] Build the **TODAY'S STUDY**, **WHAT IS PENDING?**, **WEAK AREAS** views
- [ ] Create the **⚙️ Config** row and set your Start Date
- [ ] Skim the Prerequisite Basics list — tick every tool you can already use blindfolded
- [ ] Flag any prerequisite at Confidence ≤ 2 and schedule 15 min to fix it this week
- [ ] Read the Multi-Row Formula Help page
- [ ] Build: add `[Row-1:Sales]` and `[Row+1:Sales]` as new fields on sample data
- [ ] Modify: set Group By = Region; observe the reset at each group boundary
- [ ] Modify: Num Rows = 2, reference `[Row-2:Sales]`
- [ ] Predict the first/last row output, then run and compare
- [ ] Answer 3 D1 Practice Questions; log mistakes
- [ ] Update Confidence on the 2 Multi-Row Formula topic rows
- [ ] Fill Day 1 row in Daily Study Tracker (Actual Hours, Completed Tasks, Next Action)
- [ ] Mark Day 1 Status

---

## Day 2 — Multi-Row Formula: rows that don't exist + running calculations ⚡
- **Domain:** D1 · **Weight:** 27% · **Priority:** High
- **Date:** ______ · **Split:** 35 theory / 70 hands-on / 15 recall

**Topics:** "Values for rows that don't exist"; running total; previous-row comparison; % change.
**Subtopics:** the 4 options (`0`, `Null()`, a specific value, `""`); leading rows (no previous) vs
trailing rows (no next); interaction with Group By.
**Tools:** Multi-Row Formula.
**Functions:** `[Row-1:Total]`, `IIF()/IF`, arithmetic with `Null()`.
**Theory:** Help section on "values for rows that don't exist"; note that arithmetic on `Null()` = `Null`.
**Hands-on:** (a) running total; (b) `[Sales] - [Row-1:Sales]` delta; (c) % change
`([Sales]-[Row-1:Sales]) / [Row-1:Sales]`. Toggle the "rows that don't exist" value between `0`
and `Null()` and watch row 1.
**Practice / Recall:** Predict row 1 for each of the 3 builds under both settings.
**Revision:** re-do Day 1's Group By example from memory.
**Weekly Challenge:** **#3 Running Averages — START** (Multi-Row Formula). Community Weekly Challenge board.
**Expected outcome:** You can state exactly what row 1 outputs for any Multi-Row expression and any
"rows that don't exist" setting.

### Checklist
- [ ] Read the "rows that do not exist" Help subsection
- [ ] Build a running total; verify row 1 = first value when setting = `0`
- [ ] Switch setting to `Null()`; confirm row 1 = Null and explain why
- [ ] Build a previous-row delta (`[Sales] - [Row-1:Sales]`)
- [ ] Build a % change field; format as a Double
- [ ] Add Group By = Region to all three; predict the group's first row, then run
- [ ] Predict full output of one build before running; diff against actual
- [ ] Start Weekly Challenge **#3**; download the input; sketch the approach before building
- [ ] Build the #3 solution with a Multi-Row Formula
- [ ] Log #3 in Weekly Challenge Tracker (Date Started, Attempt 1, Status = Attempted)
- [ ] Answer 3 D1 Practice Questions on Multi-Row Formula
- [ ] Record mistakes + Mistake Type in Practice Questions DB
- [ ] Update Confidence on both Multi-Row Formula topic rows
- [ ] Fill Day 2 row + mark Status

---

## Day 3 — Multi-Field Formula + ToNumber() / Round() / Trim()
- **Domain:** D1 · **Weight:** 27% · **Priority:** High
- **Date:** ______ · **Split:** 40 / 60 / 20

**Topics:** Multi-Field Formula (overwrite vs add; change data type/size); the number/clean-up functions.
**Subtopics:** `[_CurrentField_]`, `[_CurrentFieldName_]`, "Copy Output Fields and Add", output
type & size; `ToNumber(str, ignoreErrors, decimalSeparator)`; `Round(value, multiple)` (nearest
multiple, **not** decimal places); `Trim/TrimLeft/TrimRight(str, chars)`.
**Tools:** Multi-Field Formula, Formula.
**Functions:** `ToNumber()`, `Round()`, `Trim()`.
**Theory:** Help → Multi-Field Formula Tool; Functions reference for the 3 functions.
**Hands-on:** (a) Trim + UpperCase 5 text fields in one Multi-Field Formula; (b) change 3 string
"amount" fields to Fixed Decimal via `ToNumber()`; (c) `Round(2347,100)`, `Round(2.71828,0.01)`.
**Practice / Recall:** Predict `Round(x, multiple)` for 4 inputs; predict overwrite vs new-field
schema.
**Revision:** finish **Weekly Challenge #3**; compare your Multi-Row answer to a Summarize+Join version.
**Weekly Challenge:** **#3 — FINISH** and log (Date Completed, Confidence, What I Learned).
**Expected outcome:** You never confuse `Round()` with decimal rounding again; you can predict a
Multi-Field Formula's output schema.

### Checklist
- [ ] Read Multi-Field Formula Help; note `[_CurrentField_]` / `[_CurrentFieldName_]`
- [ ] Build: one Multi-Field Formula that `Trim()`s + uppercases 5 fields at once
- [ ] Toggle "Copy Output Fields and Add" on/off; record the schema difference
- [ ] Build: `ToNumber()` 3 string fields → Fixed Decimal; test a bad value (→ Null)
- [ ] Test `Round(2347, 100)` and `Round(2.71828, 0.01)`; write the rule in your own words
- [ ] Predict 4 `Round()` results before running
- [ ] `Trim([x], "$,")` to strip currency symbols — predict, then run
- [ ] Finish Weekly Challenge #3; rebuild it a second way (Summarize + Join)
- [ ] Log #3 as Completed with What-I-Learned
- [ ] Answer 3 D1 Practice Questions (Round / Multi-Field)
- [ ] Update Confidence: Multi-Field Formula, ToNumber, Round, Trim rows
- [ ] Mark those 4 topic rows `Hands-on Complete`
- [ ] Fill Day 3 row + Status

---

## Day 4 — DateTime() / GetWord() / FindString() + Filter AND/OR + DateTime across tools
- **Domain:** D1 · **Weight:** 27% · **Priority:** High
- **Date:** ______ · **Split:** 45 / 55 / 20

**Topics:** string↔date conversion; word/character extraction; compound Filter logic; using DateTime
functions in Formula, Filter, Generate Rows, Multi-Row Formula.
**Subtopics:** `DateTimeParse(str, format)` and `DateTimeFormat(date, format)` with `%Y %m %d %H
%M %S`; `GetWord(str, n)` zero-based; `FindString(str, target)` zero-based, `-1` if absent,
case-sensitive; Filter Basic vs Custom; **AND binds tighter than OR** → always parenthesise;
`DateTimeAdd`, `DateTimeDiff`, `DateTimeNow`, `DateTimeToday`.
**Tools:** Formula, Filter.
**Functions:** `DateTime()` family, `GetWord()`, `FindString()`.
**Theory:** Functions reference (DateTime, String); Help → Filter Tool (custom expression).
**Hands-on:** (a) parse `"2026-03-01 14:05"` → DateTime, reformat to `"01 Mar 2026"`;
(b) `GetWord([FullName],1)`; `FindString([Email],"@")`; (c) Filter: `[Region]="East" OR
([Region]="West" AND [Sales]>1000)` — then remove the parentheses and see who moves.
**Practice / Recall:** Predict the True/False split for 3 compound expressions.
**Weekly Challenge:** none (prep for #56 tomorrow — skim the RegEx pathway).
**Expected outcome:** You can hand-trace any compound AND/OR Filter and any DateTimeParse format string.

### Checklist
- [ ] Read DateTime + String function references
- [ ] Build: `DateTimeParse()` a text timestamp → DateTime type
- [ ] Build: `DateTimeFormat()` back to a custom display string
- [ ] Build: `GetWord()` to pull the 2nd word; test on a 1-word value (→ empty)
- [ ] Build: `FindString()` for "@"; test a missing target (→ -1)
- [ ] Build the parenthesised compound Filter; note the T/F counts
- [ ] Remove the parentheses; explain which records moved and why (AND > OR)
- [ ] Use `DateTimeDiff(DateTimeNow(), [Date], "days")` in a Formula
- [ ] Predict 3 compound-expression splits before running
- [ ] Answer 4 D1 Practice Questions (Filter / GetWord / REGEX_Match preview)
- [ ] Update Confidence: DateTime(), GetWord(), FindString(), Filter, DateTime-across-tools rows
- [ ] Mark those rows `Theory Complete` + `Hands-on Complete`
- [ ] Skim the Academy **Parsing Data** pathway intro for tomorrow
- [ ] Fill Day 4 row + Status

---

## Day 5 — RegEx: REGEX_Match / REGEX_Replace + the RegEx tool + parse vs match ⚡
- **Domain:** D1 · **Weight:** 27% · **Priority:** High
- **Date:** ______ · **Split:** 35 / 70 / 15

**Topics:** regex in the Formula tool; the RegEx tool's 4 methods; Parse vs Match; reading a pattern
to predict output.
**Subtopics:** `REGEX_Match(str, pat)` = **whole value must match** → Boolean; `REGEX_Replace(str,
pat, rep)` with `\1 \2` back-refs; RegEx tool output methods **Replace / Tokenize / Parse / Match**;
**marked (capturing) groups**; case-insensitive checkbox; character classes `[A-Za-z0-9]`,
quantifiers `* + ? {n,m}`, anchors `^ $ \b`, alternation `|`, greedy vs lazy `?`.
**Tools:** Formula (REGEX_*), RegEx.
**Functions:** `REGEX_Match()`, `REGEX_Replace()`, `REGEX_CountMatches()` (supporting).
**Theory:** Academy **Parsing Data** pathway; Help → RegEx Tool; Tool Mastery: RegEx.
**Hands-on:** (a) validate emails with `REGEX_Match`; (b) mask digits with `REGEX_Replace([x],
"\d", "X")`; (c) same pattern `(\d+)-(\d+)` through **all four** RegEx-tool methods on `"12-345"`;
diff the outputs; (d) given 3 target outputs, write the pattern.
**Practice / Recall:** For 5 patterns, predict match / no-match on 3 strings each.
**Weekly Challenge:** **#56 Parsing and Counting Hashtags — START**.
**Expected outcome:** You can say what each RegEx method returns (columns vs rows vs flags) and
build a pattern from a required output.

### Checklist
- [ ] Work through the Academy Parsing Data pathway (RegEx sections)
- [ ] Read Help → RegEx Tool; list what Replace / Tokenize / Parse / Match each output
- [ ] Build: `REGEX_Match([Email], <email pattern>)`; test a trailing-space value (→ False)
- [ ] Build: `REGEX_Replace()` to mask all digits, then to reformat a phone number with `\1`/`\2`
- [ ] Build: RegEx tool **Parse** `(\d+)-(\d+)` on `"12-345"` → 2 columns
- [ ] Build: RegEx tool **Tokenize** the same → rows; set the column count
- [ ] Build: RegEx tool **Match** the same → match-flag / matched-substring fields
- [ ] Build: RegEx tool **Replace** the same
- [ ] Write the diff: which method gives columns, rows, flags
- [ ] Reverse-engineer 3 patterns from 3 required outputs
- [ ] Start Weekly Challenge **#56**; plan the tokenize→count approach; log Attempt 1
- [ ] Answer 4 D1 Practice Questions (RegEx / Parse vs Match)
- [ ] Update Confidence: REGEX_Match, REGEX_Replace, RegEx tool, Parse-vs-Match, "identify regex" rows
- [ ] Fill Day 5 row + Status

---

## Day 6 — Generate Rows + Find Replace + Join Multiple
- **Domain:** D1 · **Weight:** 27% · **Priority:** High
- **Date:** ______ · **Split:** 40 / 60 / 20

**Topics:** row generation; multi-item lookup replacement; N-input joins.
**Subtopics:** Generate Rows numeric/date/loop modes, Initialization/Condition/Loop expressions,
create-new vs update-existing field, infinite-loop guard; Find Replace "find within field" vs whole,
"replace found text" vs "append fields from Find", case, "any part of field"; Join Multiple —
N inputs, join fields or position, **Cartesian if no join field**, "output only records that
joined", field-name collisions/prefixes.
**Tools:** Generate Rows, Find Replace, Join Multiple.
**Theory:** Help pages for all three; Tool Mastery: Find Replace, Join Multiple.
**Hands-on:** (a) Generate one row per day of last month (`DateTimeAdd`); (b) Generate `1..N` per
group; (c) Find Replace: expand 15 abbreviations inside a free-text `[Comment]` field; (d) Join
Multiple 3 lookup tables to a fact table — compare row count to a chain of Join tools.
**Practice / Recall:** Predict the row count from Generate Rows for 3 configs; predict Find Replace
output when a term appears 0 / 1 / many times.
**Weekly Challenge:** **#56 — FINISH**; also attempt the Match method as an alternative; log Completed.
**Expected outcome:** You can predict exactly how many rows Generate Rows emits, and what Find
Replace does on multi-match text.

### Checklist
- [ ] Read Generate Rows Help; note the 3 expressions and the loop-limit safeguard
- [ ] Build: date rows for every day of the previous month
- [ ] Build: sequence `1..[Count]` per group (Generate Rows after a Summarize)
- [ ] Predict the row count for 3 Generate Rows configs before running
- [ ] Read Find Replace Help; note "any part of field" vs "whole field"
- [ ] Build: multi-abbreviation expansion in free text; test a comment with 2 hits
- [ ] Toggle "append fields" vs "replace found text"; record the difference
- [ ] Build: Join Multiple with 3 lookups; try it with NO join field (Cartesian) — observe blow-up
- [ ] Toggle "output only records that joined"; compare counts
- [ ] Finish Weekly Challenge #56; try the Match method variant; log Completed + What I Learned
- [ ] Answer 3 D1 Practice Questions (Generate Rows / Find Replace / Join Multiple)
- [ ] Update Confidence: Generate Rows, Find Replace, Join Multiple rows
- [ ] Mark those rows `Hands-on Complete` + `Challenge Complete` where relevant
- [ ] Fill Day 6 row + Status

---

## Day 7 — Data Investigation (Association Analysis, Field Summary, Frequency Table, Pearson, Spearman) + Weekly Review 1
- **Domain:** D1 · **Weight:** 27% · **Priority:** High
- **Date:** ______ · **Split:** 45 / 45 / 30 (+ review)

**Topics:** the 5 Investigation tools; interpreting their output; Pearson vs Spearman.
**Subtopics:** Association Analysis (target field vs all; correlation matrix + p-values; association
measures; complete vs pairwise); Field Summary (% missing, unique count, min/max/mean/median/std;
Report **R** + Data **I** outputs; it does **not** change the data); Frequency Table (count & % per
distinct value; multiple fields; how null is bucketed); Pearson (linear, −1..1, assumes linearity
+ interval data, outlier-sensitive); Spearman (rank/monotonic, robust to outliers & non-linear-
monotonic, works on ordinal); **choose Spearman for ranked/skewed/monotonic, Pearson for linear
interval**.
**Tools:** Association Analysis, Field Summary, Frequency Table, Pearson Correlation, Spearman
Correlation.
**Theory:** Help → Data Investigation category; a short read on Pearson vs Spearman.
**Hands-on:** Profile one messy dataset with Field Summary + Frequency Table; run Association
Analysis with a target; run Pearson and Spearman on a deliberately non-linear-but-monotonic pair
and explain the gap.
**Practice / Recall:** For 4 described relationships, pick Pearson or Spearman and justify.
**Weekly Challenge:** none — do **Weekly Review 1** instead (`09-Weekly-Reviews.md`).
**Expected outcome:** You can read each tool's output and choose the right correlation for a data description.

### Checklist
- [ ] Read the Data Investigation Help pages (all 5 tools)
- [ ] Build: Field Summary on a messy dataset; read every column of the Report output
- [ ] Build: Frequency Table on 2 fields; note how null/blank appears
- [ ] Build: Association Analysis with a chosen target field; read the matrix + p-values
- [ ] Build: Pearson and Spearman on the same numeric pair
- [ ] Construct a monotonic-but-curved pair; show Spearman ≈ 1 while Pearson < 1; explain
- [ ] For 4 relationship descriptions, choose Pearson vs Spearman (write the reason)
- [ ] Answer 4 D1 Practice Questions (Investigation / Pearson vs Spearman)
- [ ] Update Confidence on all 6 Investigation topic rows
- [ ] Mark D1 rows `Practice Complete` where done
- [ ] **Weekly Review 1**: fill the template (planned vs actual hours, topics done/pending, avg confidence)
- [ ] List Week 1 weak topics (Confidence ≤ 2) and schedule 15-min fixes into Week 2 recall slots
- [ ] Set any shaky D1 topic Status = `🔵 Needs Revision`
- [ ] Fill Day 7 row + Status

---
# WEEK 2 — Domain 4: Data Sources (15%) + Domain 2: Reporting Tools (10%)
---

## Day 8 — Connectors ribbon + Download tool
- **Domain:** D4 · **Weight:** 15% · **Priority:** High
- **Date:** ______ · **Split:** 40 / 60 / 20

**Topics:** purpose-built connectors vs generic input; REST calls with the Download tool.
**Subtopics:** Connectors ribbon categories; OAuth / API-key auth patterns; Download tool — URL
field, Method GET/POST/PUT/DELETE, **Headers** tab, **Query String/Payload** tab, output
`DownloadData` vs `DownloadHeaders`, string vs blob output, base64/encoding, HTTP status.
**Tools:** Download (+ any one Connectors-ribbon tool to inspect), JSON Parse / Text To Columns (supporting).
**Theory:** Help → Download Tool; Help → Connectors overview; Academy **Preparing and Blending Data**.
**Hands-on:** Call a public JSON API (e.g. a free "cat facts"/"public holidays" style endpoint) with
Download → GET; parse the response; then do a POST with a JSON payload to a request-bin style echo.
**Practice / Recall:** Predict what `DownloadData` vs `DownloadHeaders` contains; where a POST body goes.
**Weekly Challenge:** none.
**Expected outcome:** You can configure a GET and a POST, place headers/payload correctly, and parse
the result.

### Checklist
- [ ] Read Download Tool Help (all 4 config tabs)
- [ ] Skim the Connectors ribbon; open one connector's config to see the auth pattern
- [ ] Build: Download GET to a public JSON endpoint
- [ ] Parse the JSON response into fields
- [ ] Build: Download POST with a JSON payload in the Payload tab; add a `Content-Type` header
- [ ] Inspect `DownloadData`, `DownloadHeaders`, and the HTTP status field
- [ ] Switch output to blob; note when you'd need that (binary responses)
- [ ] Predict `DownloadData` vs `DownloadHeaders` contents before running
- [ ] Answer 3 D4 Practice Questions (Download / Connectors)
- [ ] Update Confidence: Connectors ribbon, Download tool rows
- [ ] Mark both rows `Theory Complete` + `Hands-on Complete`
- [ ] Fill Day 8 row + Status

---

## Day 9 — In-Database tools + Data Connection Manager (DCM) ⚡
- **Domain:** D4 · **Weight:** 15% · **Priority:** High
- **Date:** ______ · **Split:** 35 / 65 / 20

**Topics:** in-database processing & pushdown; managing connections/credentials with DCM.
**Subtopics:** Connect In-DB, **Data Stream In / Data Stream Out**, Browse In-DB, In-DB
Formula/Filter/Join/Summarize/Select; operations **push down to the database** as SQL; data only
returns to Designer at Data Stream Out / Browse; Write Data In-DB (create/append/overwrite/temp).
DCM — separates **connection** from **credential**, reusable & shareable, roles/permissions,
DCM-enabled tools, the connections list.
**Tools:** Connect In-DB, Data Stream In, Data Stream Out, In-DB Filter/Summarize; DCM (Data Connections window).
**Theory:** Help → In-Database category; Help → Data Connection Manager.
**Hands-on:** Point Connect In-DB at a local SQLite/Access file (or the practice DB you have); do an
In-DB Filter + In-DB Summarize; Data Stream Out only at the very end; compare to the same logic with
standard tools. Create a DCM connection and reuse it in a second Input.
**Practice / Recall:** For a given In-DB canvas, say which steps run in the DB vs in Designer.
**Weekly Challenge:** none.
**Expected outcome:** You can explain pushdown, place Data Stream Out correctly, and describe what DCM buys you.

### Checklist
- [ ] Read the In-Database category Help (Connect In-DB, Data Stream In/Out, In-DB transforms)
- [ ] Build: Connect In-DB → In-DB Filter → In-DB Summarize → Data Stream Out
- [ ] Move Data Stream Out earlier; observe you've lost the pushdown benefit; move it back
- [ ] Use Browse In-DB to preview without streaming out
- [ ] Rebuild the same logic with standard tools; note where each executes
- [ ] Read DCM Help; create a connection (connection + credential separately)
- [ ] Reuse the DCM connection in a second Input Data / Connect In-DB
- [ ] For a sample In-DB canvas, label each tool "runs in DB" or "runs in Designer"
- [ ] Answer 3 D4 Practice Questions (In-DB / DCM)
- [ ] Update Confidence: In-Database tools, DCM rows
- [ ] Mark both rows `Hands-on Complete`
- [ ] Fill Day 9 row + Status

---

## Day 10 — Directory + Input/Output Data (advanced) + Dynamic Input + Dynamic Rename ⚡
- **Domain:** D4 · **Weight:** 15% · **Priority:** High
- **Date:** ______ · **Split:** 35 / 70 / 15

**Topics:** listing files; advanced I/O options; template-driven multi-source reads; programmatic renames.
**Subtopics:** Directory (FullPath/FileName/Directory/Size/Created/Modified, sub-directories,
wildcard); Input Data advanced (format options, multi-file/multi-sheet wildcard, "Output File Name
as Field", record limit, first-row-has-field-names, Take/Skip); Output Data (file type options,
overwrite vs append, take sheet/file name from field); Dynamic Input (template/example file,
**"Read a List of Data Sources"** vs **"Change Entire File Path"**, **Modify SQL Query** action,
**"different schema" errors**); Dynamic Rename (first row of data / formula / add-remove
prefix-suffix / rename from R input).
**Tools:** Directory, Input Data, Output Data, Dynamic Input, Dynamic Rename.
**Theory:** Help pages for all five; Tool Mastery: Dynamic Input.
**Hands-on:** Directory → Dynamic Input across 5 same-schema CSVs; add "File Name as Field";
deliberately add a 6th file with an extra column and watch the schema error; fix with Dynamic Rename
+ Union. Dynamic Rename via formula (`Replace([_CurrentFieldName_]," ","_")`).
**Practice / Recall:** Predict Directory row/column output; predict the combined schema when sources differ.
**Weekly Challenge:** none.
**Expected outcome:** You can wire Directory → Dynamic Input and explain/fix the schema-mismatch error.

### Checklist
- [ ] Read Directory + Input Data + Output Data Help (advanced options)
- [ ] Build: Directory on a folder with a wildcard; toggle sub-directories
- [ ] Build: single Input Data with a `*.csv` wildcard + "Output File Name as Field"
- [ ] Build: Directory → Dynamic Input ("Read a List of Data Sources")
- [ ] Add a mismatched file; reproduce the "different schema" error; write down the message
- [ ] Fix it (Dynamic Rename to align names → Union with "set based on all inputs")
- [ ] Build: Dynamic Rename via formula on `[_CurrentFieldName_]`
- [ ] Build: Dynamic Rename "Take Field Names from First Row of Data"; note the row is consumed
- [ ] Predict Directory output columns/rows; predict combined schema for mismatched sources
- [ ] Answer 4 D4 Practice Questions (Directory / Dynamic Input / Dynamic Rename)
- [ ] Update Confidence: Directory, Input/Output advanced, Dynamic Input, Dynamic Rename rows
- [ ] Mark those rows `Hands-on Complete`
- [ ] Fill Day 10 row + Status

---

## Day 11 — Blob Convert / Blob Input / Blob Output + Domain 4 recap
- **Domain:** D4 · **Weight:** 15% · **Priority:** Medium
- **Date:** ______ · **Split:** 35 / 55 / 30

**Topics:** reading & writing binary files; the recap mini-test for D4.
**Subtopics:** Blob Input (read whole binary files — images/PDFs — into one BLOB field; wildcard;
pair with Directory); Blob Convert (string/field ↔ BLOB; "To Blob" vs "From Blob"; encoding);
Blob Output (write BLOB field to files; filename from a field; set extension).
**Tools:** Blob Input, Blob Convert, Blob Output (+ Directory).
**Theory:** Help pages for the 3 Blob tools; Tool Mastery: Blob.
**Hands-on:** Directory → Blob Input a folder of images → Blob Output them back out with new names
in a new folder; then Blob Convert an image to a base64 string and back.
**Practice / Recall:** D4 recap — 8-question self-quiz across Download, In-DB, DCM, Dynamic Input,
Blob (write them yourself from the checklists, then answer next day / same day).
**Weekly Challenge:** none.
**Expected outcome:** You can move binary files through a workflow and you've scored your own D4 recap.

### Checklist
- [ ] Read the 3 Blob tool Help pages
- [ ] Build: Directory → Blob Input on an image folder (one row per file)
- [ ] Build: Blob Output → write files out with names from a field + `.png` extension
- [ ] Build: Blob Convert image → base64 string; then string → blob (round-trip)
- [ ] Confirm the round-tripped file opens correctly
- [ ] Write 8 recap questions covering Download / In-DB / DCM / Dynamic Input / Blob
- [ ] Answer your 8 recap questions; mark score; log weak ones as `🔵 Needs Revision`
- [ ] Answer 3 D4 Practice Questions from the seeded DB
- [ ] Update Confidence: Blob Convert, Blob Input, Blob Output rows
- [ ] Mark all D4 topic rows `Theory Complete` + `Hands-on Complete`
- [ ] Set D4 topics with Confidence ≤ 2 to `🔵 Needs Revision`
- [ ] Fill Day 11 row + Status
- [ ] Skim the Academy **From Data Prep to Insightful Reports** pathway for tomorrow

---

## Day 12 — Reporting: Table tool + Charting / Interactive Chart tool
- **Domain:** D2 · **Weight:** 10% · **Priority:** High
- **Date:** ______ · **Split:** 40 / 60 / 20

**Topics:** building report tables and charts ("configure tables and charts").
**Subtopics:** Table tool — per-column config & order, **rule-based / conditional formatting**,
grouping, **Basic vs Pivot** table, number & date formatting, column width; Charting/Interactive
Chart — **layers**, chart types (bar/line/pie/scatter/area), X & Y fields, **aggregation**,
grouping/series, axis/legend/colour.
**Tools:** Table, Interactive Chart (or the classic Charting tool), plus a Summarize upstream.
**Theory:** Help → Table Tool; Help → Interactive Chart Tool; Academy reporting pathway.
**Hands-on:** From an aggregate (Summarize by Region), build a formatted summary Table with a
red/green rule on a variance column; build a grouped bar chart of Sales by Region and a line chart
of Sales over time.
**Practice / Recall:** Predict how a formatting rule renders; predict a chart's shape from its config.
**Weekly Challenge:** none (candidate reporting challenge — optional, on/after Day 13).
**Expected outcome:** You can configure a formatted Table and a multi-series chart from scratch.

### Checklist
- [ ] Read Table Tool + Interactive Chart Tool Help
- [ ] Build: Summarize → Table with column order + number formatting
- [ ] Add a conditional-format rule (e.g. negative variance → red text)
- [ ] Try a Pivot table layout; note when you'd use it
- [ ] Build: grouped bar chart (Sales by Region)
- [ ] Build: line chart (Sales over time); set a second layer/series
- [ ] Change the aggregation on a chart field; observe the effect
- [ ] Predict the rendered look of one Table + one chart before running/previewing
- [ ] Answer 2 D2 Practice Questions (Table / Chart)
- [ ] Update Confidence: Table tool, Charting tool rows
- [ ] Mark both rows `Theory Complete` + `Hands-on Complete`
- [ ] Fill Day 12 row + Status

---

## Day 13 — Reporting: Layout + Render + Email tools
- **Domain:** D2 · **Weight:** 10% · **Priority:** High
- **Date:** ______ · **Split:** 40 / 60 / 20

**Topics:** composing and outputting reports; emailing them.
**Subtopics:** Layout (arrange snippets vertical/horizontal, per-section orientation, borders/
margins/separators, **"Layout each group of records"**); Render (**output format** PDF/HTML/DOCX/
XLSX/PCXML, paper size & orientation, **"Group Data into Separate Reports"**, output to a field vs
a file, temp vs specific path); Email — SMTP config, To/From/CC from a field, subject & body (text
or field), **attach a rendered report or a BLOB**, **one email per record**.
**Tools:** Layout, Render, Email (Reporting).
**Theory:** Help → Layout / Render / Email Tools.
**Hands-on:** Table + Chart → Layout (Horizontal) → Render to one PDF; then set "Group Data into
Separate Reports" on Region → 4 PDFs; then Email one report as an attachment (use a test SMTP or
just configure and don't send).
**Practice / Recall:** Predict the number of output files/pages for 2 Render configs; predict the
email count.
**Weekly Challenge:** none.
**Expected outcome:** You can go snippets → Layout → Render → Email and predict how many
files/emails result.

### Checklist
- [ ] Read Layout + Render + Email Help
- [ ] Build: Table + Chart → Layout (Horizontal); try Vertical; try a border
- [ ] Build: Layout → Render to a single PDF
- [ ] Set "Group Data into Separate Reports" on Region; predict then confirm 4 files
- [ ] Change Render output to HTML and to XLSX; note the differences
- [ ] Build: Email tool — To/Subject/Body from fields; attach the rendered report
- [ ] Note "one email per record"; add a Summarize/Sample to control the count
- [ ] Predict file/page counts for 2 Render configs; predict the email count
- [ ] Answer 3 D2 Practice Questions (Layout / Render / Email)
- [ ] Update Confidence: Layout, Render, Email rows
- [ ] Mark all D2 topic rows `Hands-on Complete`
- [ ] Fill Day 13 row + Status

---

## Day 14 — Reporting recap + catch-up buffer + Weekly Review 2
- **Domain:** D2 / D4 catch-up · **Weight:** 10% / 15% · **Priority:** Medium
- **Date:** ______ · **Split:** 30 / 50 / 40 (+ review)

**Topics:** consolidate Weeks 1–2; clear any backlog; review.
**Subtopics:** re-run any workflow you were shaky on from D1/D2/D4; re-answer missed Practice Questions.
**Tools:** whatever you flagged `🔵 Needs Revision`.
**Theory:** re-read the Help page for your single weakest tool so far.
**Hands-on:** rebuild — from memory, no notes — the 2 workflows you found hardest this week.
**Practice / Recall:** re-take Day 11's D4 recap quiz; do 5 mixed D1/D2 Practice Questions.
**Weekly Challenge:** ensure **#3** and **#56** are logged Completed; optionally start a candidate
reporting challenge.
**Expected outcome:** Zero unfinished Week-1/2 topics; Weekly Review 2 done.

### Checklist
- [ ] Open **WHAT IS PENDING?** — list every D1/D2/D4 item not `🟢 Completed`
- [ ] Rebuild your hardest Week-1 workflow from memory
- [ ] Rebuild your hardest Week-2 workflow from memory
- [ ] Re-take the Day 11 D4 recap quiz; compare scores
- [ ] Re-answer every Practice Question currently marked Incorrect
- [ ] Re-read the Help page for your weakest tool
- [ ] Confirm Weekly Challenges #3 and #56 are `Completed` with What-I-Learned filled
- [ ] Update Confidence across all D1/D2/D4 rows honestly
- [ ] Clear `🔵 Needs Revision` on anything you've now fixed
- [ ] **Weekly Review 2**: planned vs actual hours, topics done/pending, avg confidence, weakest & strongest domain
- [ ] Plan Week 3 recall-slot fixes for any remaining weak topics
- [ ] Fill Day 14 row + Status

---
# WEEK 3 — Domain 3: Spatial (10%) + Domain 5: Macros (18%)
---

## Day 15 — Spatial: Create Points + spatial functions in Formula & Summarize ⚡
- **Domain:** D3 · **Weight:** 10% · **Priority:** High
- **Date:** ______ · **Split:** 35 / 65 / 20

**Topics:** making spatial objects; spatial functions in Formula; spatial actions in Summarize.
**Subtopics:** Create Points — **X = Longitude, Y = Latitude**, output SpatialObj, CRS; Formula
spatial functions — `ST_Distance`, `ST_Buffer`, `ST_Centroid`, `ST_Contains`, `ST_Intersects`,
`ST_Within`, `CreatePoint`, `ToWKT`/`FromWKT`; Summarize spatial actions — **Combine**, Create
Convex Hull, Create Bounding Rectangle, Create Centroid.
**Tools:** Create Points, Formula (spatial), Summarize (spatial), Browse (map).
**Theory:** Help → Create Points; Help → Spatial functions; Interactive Lessons: Spatial Analytics.
**Hands-on:** From a lat/long table → Create Points → view on the Browse map; in Formula build
`ST_Buffer([Centroid], 1, "miles")`; in Summarize use **Combine** to merge points into one
multipoint, and **Create Centroid**.
**Practice / Recall:** Predict what a swapped X/Y does; predict the result type of each spatial function.
**Weekly Challenge:** none (start **#6** tomorrow).
**Expected outcome:** You can create points, buffer/centroid in Formula, and combine in Summarize.

### Checklist
- [ ] Read Create Points Help + the Spatial functions reference
- [ ] Build: Create Points from lat/long; open the Browse map
- [ ] Deliberately swap X/Y; observe points land in the wrong place; fix
- [ ] Build (Formula): `ST_Buffer` a point by 1 mile; view it
- [ ] Build (Formula): `ST_Distance` between two point fields
- [ ] Build (Summarize): **Combine** points → one object
- [ ] Build (Summarize): **Create Centroid** and **Create Convex Hull**
- [ ] Inspect the SpatialObj field content (WKT) with `ToWKT`
- [ ] Predict the output type of `ST_Contains`, `ST_Buffer`, `ST_Centroid` before running
- [ ] Answer 2 D3 Practice Questions (Create Points / spatial functions)
- [ ] Update Confidence: Create Points, spatial-in-Formula, spatial-in-Summarize rows
- [ ] Mark those rows `Hands-on Complete`
- [ ] Fill Day 15 row + Status

---

## Day 16 — Spatial: combine objects (intersect/split/buffer) + Spatial Match + Trade Area ⚡
- **Domain:** D3 · **Weight:** 10% · **Priority:** High
- **Date:** ______ · **Split:** 35 / 70 / 15

**Topics:** combining objects; target↔universe matching; trade areas.
**Subtopics:** **Spatial Process tool** (Combine / Cut / Intersect) — predict the resulting object;
**positive vs negative buffer**; **Spatial Match** — match condition (Where Target
Contains/Intersects/Touches/Within Universe), T & U output anchors, **record fan-out on multiple
matches**; **Trade Area** — radius (miles) or drive-time rings, multiple ring sizes, overlap
handling **Keep / Remove Overlap / Cookie-cut**, per-centre vs combined.
**Tools:** Spatial Process, Spatial Match, Trade Area.
**Theory:** Help → Spatial Process / Spatial Match / Trade Area; Interactive Lessons.
**Hands-on:** Trade areas (1/3/5 mi) around store points; Spatial Match customer points to those
polygons ("Where Target Contains Universe"); count customers per store; use Spatial Process to
Intersect two trade areas and to Cut one from another.
**Practice / Recall:** Predict Matched vs Unmatched counts for overlapping shapes; predict what
Intersect vs Cut returns.
**Weekly Challenge:** **#6 Spatial Route — START**.
**Expected outcome:** You can predict a Spatial Match's fan-out and configure Trade Area overlap correctly.

### Checklist
- [ ] Read Spatial Process + Spatial Match + Trade Area Help
- [ ] Build: Trade Area with 3 ring sizes around store points
- [ ] Toggle overlap: Keep vs Remove Overlap vs Cookie-cut; view each
- [ ] Build: Spatial Match — stores (Target) contain customers (Universe)
- [ ] Confirm the fan-out: a store with 5 customers → 5 matched rows
- [ ] Aggregate matched output → customers per store
- [ ] Build: Spatial Process — Intersect two overlapping trade areas
- [ ] Build: Spatial Process — Cut one trade area out of another; also try a negative buffer
- [ ] Predict Matched/Unmatched counts before running; predict Intersect vs Cut output
- [ ] Start Weekly Challenge **#6**; plan the point→route→distance steps; log Attempt 1
- [ ] Answer 3 D3 Practice Questions (Spatial Match / Trade Area / combine)
- [ ] Update Confidence: combine-objects, Spatial Match, Trade Area rows
- [ ] Fill Day 16 row + Status

---

## Day 17 — Spatial: Distance + Find Nearest + Target/Universe anchors + D3 recap
- **Domain:** D3 · **Weight:** 10% · **Priority:** High
- **Date:** ______ · **Split:** 35 / 55 / 30

**Topics:** distance & nearest-neighbour; the meaning of the Target and Universe anchors.
**Subtopics:** Distance — point-to-point & point-to-polygon, **straight-line vs driving distance &
drive time**, output units, direction/bearing; Find Nearest — **nearest N** from Universe to each
Target, **max distance cutoff**, **Matched vs Not-Found** outputs, distance field added;
**Target = "search from" (kept once); Universe = "search against"** — which anchor is which in
Spatial Match and Find Nearest.
**Tools:** Distance, Find Nearest.
**Theory:** Help → Distance Tool / Find Nearest Tool; Tool Mastery: Find Nearest.
**Hands-on:** Find Nearest depot to each customer, N=1, max 25 miles; inspect both outputs; swap
Target/Universe and observe the change; Distance from each customer to a fixed store polygon (drive
distance if you have a dataset, else straight-line).
**Practice / Recall:** D3 recap — predict Find Nearest's two output row counts for a scenario;
state which anchor is Target.
**Weekly Challenge:** **#6 — FINISH**; log Completed + What I Learned.
**Expected outcome:** You can predict Find Nearest's Matched/Not-Found split and never reverse
Target/Universe.

### Checklist
- [ ] Read Distance + Find Nearest Help; note straight-line vs driving requirements
- [ ] Build: Find Nearest — customers (Target) to depots (Universe), N=1, max 25 mi
- [ ] Read both outputs: Matched (with distance field) and Not-Found
- [ ] Swap Target and Universe; explain how the result changes
- [ ] Build: Distance from customers to a store polygon; set output units
- [ ] Add the direction/bearing output; interpret it
- [ ] Write one sentence: "Target is ___, Universe is ___" for Spatial Match and for Find Nearest
- [ ] Predict Matched/Not-Found counts for a described scenario
- [ ] Finish Weekly Challenge #6; log Completed
- [ ] Answer 3 D3 Practice Questions (Distance / Find Nearest / anchors)
- [ ] D3 recap: re-answer any missed D3 question; set weak D3 topics `🔵 Needs Revision`
- [ ] Update Confidence on Distance, Find Nearest, Target/Universe rows; mark D3 rows `Practice Complete`
- [ ] Fill Day 17 row + Status

---

## Day 18 — Macros: standard vs batch vs iterative + Macro Input/Output ⚡
- **Domain:** D5 · **Weight:** 18% · **Priority:** High
- **Date:** ______ · **Split:** 45 / 55 / 20

**Topics:** the three macro types — when to use each; the Macro Input and Macro Output tools.
**Subtopics:** **Standard** — packages reusable logic, runs once for the workflow; **Batch** — one
**Control Parameter**, runs **once per control record**, an **Action** updates config each pass,
outputs stack; **Iterative** — **Iteration Input/Output**, feeds output back to input **until a
condition or max iterations**; Macro Input — template/example data, field-map anchor, name &
abbreviation; Macro Output — defines an output anchor, can have several.
**Tools:** Macro Input, Macro Output (Control Parameter + Action previewed for Days 20–21).
**Theory:** Academy **Getting Started with Macros** pathway; Help → Macros overview.
**Hands-on:** Convert a small 3-tool workflow into a **standard macro** (drop Macro Input + Macro
Output, save as `.yxmc`); run it from a new workflow. Read (don't build yet) the batch & iterative Help.
**Practice / Recall:** For 6 described tasks, pick standard / batch / iterative and justify.
**Weekly Challenge:** none (start **#86** on Day 20).
**Expected outcome:** You can pick the right macro type for a task and explain the run behaviour of each.

### Checklist
- [ ] Work through the Academy Getting Started with Macros pathway (types + Macro Input/Output)
- [ ] Read Help: what makes a workflow a standard vs batch vs iterative macro
- [ ] Build: turn a 3-tool workflow into a standard macro (Macro Input + Macro Output)
- [ ] Set the Macro Input template data + anchor abbreviation
- [ ] Save as `.yxmc`; insert it into a fresh workflow and run it
- [ ] Add a second Macro Output; connect a second stream; run again
- [ ] Write, for 6 tasks, which macro type fits and why
- [ ] Read the Batch macro Help (Control Parameter) — note it for Day 20
- [ ] Read the Iterative macro Help (Iteration Input/Output) — note it for Day 21
- [ ] Answer 3 D5 Practice Questions (macro types / Macro Input-Output)
- [ ] Update Confidence: standard/batch/iterative use-case rows, Macro Input, Macro Output
- [ ] Mark those rows `Theory Complete` (+ `Hands-on Complete` for standard/Macro I-O)
- [ ] Fill Day 18 row + Status

---

## Day 19 — Macros: build a Standard macro + Interface Designer + Show Field Map ⚡
- **Domain:** D5 · **Weight:** 18% · **Priority:** High
- **Date:** ______ · **Split:** 35 / 70 / 15

**Topics:** a real standard macro with an interface control; the Interface Designer window; Show Field Map.
**Subtopics:** add an Interface tool (e.g. Drop Down or Numeric Up Down) + **Action** to
parameterise a tool inside the macro; **Interface Designer** — Layout view, **Test View**, Tree,
**Properties** (macro icon, output mode); **Show Field Map** on the Macro Input — lets the macro's
user map their incoming fields to the macro's expected fields.
**Tools:** Macro Input (Show Field Map), Interface tool + Action, Interface Designer window.
**Theory:** Help → Interface Designer; Help → Macro Input (field map).
**Hands-on:** Extend yesterday's standard macro: add a Drop Down that picks which field to
summarise, wired via Action; enable **Show Field Map**; use **Interface Designer → Test View** to
run it with sample values; set a custom macro icon.
**Practice / Recall:** Explain what the macro's user sees at configure time with/without Show Field Map.
**Weekly Challenge:** none.
**Expected outcome:** You can add an interface control to a macro and test it in the Interface Designer.

### Checklist
- [ ] Read Interface Designer Help (Layout, Test View, Tree, Properties)
- [ ] Add a Drop Down (or List Box) interface tool to the standard macro
- [ ] Wire it to a tool inside the macro with an Action tool
- [ ] Enable **Show Field Map** on the Macro Input
- [ ] Open **Interface Designer → Test View**; run the macro with sample inputs
- [ ] Reorder the questions in the Layout view
- [ ] Set a custom macro icon in Properties
- [ ] Insert the macro into a workflow; configure it as an end user would; note the Field Map UI
- [ ] Write what changes for the user when Show Field Map is off
- [ ] Answer 3 D5 Practice Questions (Interface Designer / Show Field Map)
- [ ] Update Confidence: Show Field Map, Interface Designer window rows
- [ ] Mark those rows `Hands-on Complete`
- [ ] Fill Day 19 row + Status

---

## Day 20 — Macros: build a Batch macro (Control Parameter + Action) ⚡
- **Domain:** D5 · **Weight:** 18% · **Priority:** High
- **Date:** ______ · **Split:** 30 / 75 / 15

**Topics:** a working batch macro.
**Subtopics:** **Control Parameter** input; the **Action** tool updating a tool's config each pass;
**runs once per control record**; outputs stack; "Group by" style behaviour; configuring the
control-parameter question text.
**Tools:** Control Parameter, Action, Macro Input, Macro Output.
**Theory:** Help → Batch Macros; Tool Mastery: Control Parameter.
**Hands-on:** Build a batch macro that takes a list of file paths on the Control Parameter and
reads each file (Action updates the Input Data path), stacking results; run it from a Directory
feed. Alternative: a batch macro that filters the data input to one Region per control record.
**Practice / Recall:** Predict how many passes run for N control records; predict the stacked output.
**Weekly Challenge:** **#86 Create a Macro That Generates Past Dates — START** (build the core logic:
Generate Rows + DateTime).
**Expected outcome:** You have a batch macro that runs once per control record and you can predict
its pass count and output.

### Checklist
- [ ] Read Batch Macros Help; note Control Parameter + Action are both required
- [ ] Build: drop a Control Parameter; connect an Action to the target tool
- [ ] Configure the Action to "Update Value" from the control parameter
- [ ] Run it with 3 control records; confirm 3 passes and stacked output
- [ ] Set the control-parameter question text (what the user is asked)
- [ ] Feed the control input from a Directory tool
- [ ] Predict the pass count + output rows for 5 control records
- [ ] Start Weekly Challenge **#86**: build Generate Rows + DateTime core to produce past dates
- [ ] Log #86 Attempt 1 (Status = Attempted)
- [ ] Answer 3 D5 Practice Questions (batch macro / Control Parameter / Action)
- [ ] Update Confidence: batch macro row, Action tool row
- [ ] Mark batch-macro row `Hands-on Complete`
- [ ] Fill Day 20 row + Status

---

## Day 21 — Macros: build an Iterative macro + Weekly Review 3 ⚡
- **Domain:** D5 · **Weight:** 18% · **Priority:** High
- **Date:** ______ · **Split:** 35 / 60 / 25 (+ review)

**Topics:** a working iterative macro; end-of-week review.
**Subtopics:** **Iteration Input** and **Iteration Output**; the output that feeds the loop anchor;
**stops when that output is empty / a condition is met OR max iterations is hit** (Interface
Designer → Properties → *Maximum Number of Iterations*); a second output for "done" records;
convergence / avoiding infinite loops.
**Tools:** Iteration Input, Iteration Output, Macro Output, Interface Designer (max iterations).
**Theory:** Help → Iterative Macros.
**Hands-on:** Build an iterative macro that repeatedly does one step until a condition holds — e.g.
recursively split a delimited string one token per pass, or walk a parent→child hierarchy one level
per pass. Set max iterations = 100 as a safeguard.
**Practice / Recall:** Predict how many iterations a given input needs; what happens at the max.
**Weekly Challenge:** **#86 — CONTINUE** (add the interface: a Numeric Up Down for "days back").
**Expected outcome:** You can build an iterative macro with a stop condition and a max-iteration guard.

### Checklist
- [ ] Read Iterative Macros Help; note both stop mechanisms
- [ ] Build: swap Macro Input for **Iteration Input**; add **Iteration Output**
- [ ] Wire the "keep looping" stream to the Iteration Output; the "done" stream to a Macro Output
- [ ] Set **Maximum Number of Iterations** in Interface Designer → Properties
- [ ] Run on an input that needs ~4 iterations; watch the messages
- [ ] Force a non-converging input; confirm it stops at the max, not forever
- [ ] Predict the iteration count for 3 different inputs
- [ ] Continue Weekly Challenge #86: add a Numeric Up Down interface for "number of days back"
- [ ] Answer 3 D5 Practice Questions (iterative macro / convergence)
- [ ] Update Confidence: iterative macro row
- [ ] **Weekly Review 3**: hours, topics done/pending, avg confidence, weakest/strongest domain
- [ ] Plan Week 4 fixes for weak D3/D5 topics
- [ ] Fill Day 21 row + Status

---
# WEEK 4 — Macros finish + Domain 6 (20%) + Revision + Mock Exams
---

## Day 22 — Macros: debug + repository/User Settings + consolidate + finish #86
- **Domain:** D5 · **Weight:** 18% · **Priority:** High
- **Date:** ______ · **Split:** 35 / 55 / 30

**Topics:** debugging a macro interface; registering macro locations; a macro mini-test.
**Subtopics:** **Interface Designer → Debug** generates a normal standalone workflow populated with
the current interface values (inspect it, run it, find the bug); **Options → User Settings → Macros
tab** — add macro search paths; the folder becomes the **tool-palette category**; `.yxi` packaging (supporting).
**Tools:** Interface Designer (Debug), User Settings.
**Theory:** Help → Debugging macros; Help → User Settings (Macros).
**Hands-on:** Debug one of your macros via Interface Designer; introduce a bug and find it through
the Debug workflow; add a macro folder in User Settings and confirm your macro appears in a palette
category.
**Practice / Recall:** Macro mini-test — write & answer 8 questions across all 3 types + Interface
Designer + debug + repository.
**Weekly Challenge:** **#86 — FINISH**; log Completed + What I Learned.
**Expected outcome:** You can debug a macro and register a macro repository; #86 complete.

### Checklist
- [ ] Read Help on macro debugging + User Settings (Macros tab)
- [ ] Interface Designer → **Debug**; inspect the generated standalone workflow
- [ ] Introduce a deliberate bug; use the Debug workflow to locate it; fix it
- [ ] Options → User Settings → Macros → add a search path
- [ ] Confirm your macro shows up as its own tool-palette category
- [ ] Write 8 macro mini-test questions (standard/batch/iterative/Interface Designer/debug/repository)
- [ ] Answer them; score; flag weak ones `🔵 Needs Revision`
- [ ] Finish Weekly Challenge #86; log Completed
- [ ] Answer 3 D5 Practice Questions (debug / repository)
- [ ] Update Confidence: debug row, repository row; mark all D5 rows `Hands-on`/`Practice Complete`
- [ ] Set any shaky D5 topic `🔵 Needs Revision`
- [ ] Fill Day 22 row + Status

---

## Day 23 — Analytical Apps: Action tool + Condition tool boundaries + Error Message tool ⚡
- **Domain:** D6 · **Weight:** 20% · **Priority:** High
- **Date:** ______ · **Split:** 40 / 55 / 25

**Topics:** the three "plumbing" tools of apps/macros.
**Subtopics:** **Action** — links an Interface/Control value to a **specific property of a target
tool's XML**; update modes: **Update Value (Default)**, **Update Value with Formula**, **Replace a
specific string**, **update raw XML**; **Condition** — only inside an app/macro, evaluates one
expression, **True/False anchors route configuration flow, not data records**; **Error Message** —
expression → error string when true, **warning vs error**, **stops the app before it runs**, shows
the message to the user.
**Tools:** Action, Condition, Error Message.
**Theory:** Help → Action / Condition / Error Message Tools; Interactive Lessons: Analytic Apps.
**Hands-on:** App with a Text Box → Action ("Update Value") sets an Input Data file path; add a
Condition so a checkbox toggles a Filter branch; add an Error Message that blocks the run if the
Numeric Up Down is 0.
**Practice / Recall:** Given an Action config, state the target tool's resulting XML/config; predict
whether the app runs given an Error Message expression.
**Weekly Challenge:** none (candidate Analytical App challenge — optional after Day 25).
**Expected outcome:** You can wire Action/Condition/Error Message and predict their effect.

### Checklist
- [ ] Read Action + Condition + Error Message Help
- [ ] Build: Text Box → Action ("Update Value") → Input Data file path
- [ ] Try Action mode "Replace a specific string"; see how it can over-match
- [ ] Try Action mode "Update Value with Formula"
- [ ] Build: Check Box → Condition → routes to one of two Filter branches
- [ ] Build: Numeric Up Down → Error Message that blocks the run when value = 0
- [ ] Switch the Error Message from "error" to "warning"; note the run now continues
- [ ] For 2 Action configs, write the resulting target-tool configuration
- [ ] Predict: does the app run for 3 different Error Message expressions?
- [ ] Answer 3 D6 Practice Questions (Action / Condition / Error Message)
- [ ] Update Confidence: Action, Condition, Error Message rows
- [ ] Mark those rows `Theory Complete` + `Hands-on Complete`
- [ ] Fill Day 23 row + Status

---

## Day 24 — Analytical Apps: the 8 Interface / User Interface tools
- **Domain:** D6 · **Weight:** 20% · **Priority:** High
- **Date:** ______ · **Split:** 40 / 55 / 25

**Topics:** capabilities & functionality of every named Interface tool.
**Subtopics:** **Check Box** (Boolean; checked/unchecked values); **Drop Down** (single select;
list from manual/file/connected; **Name vs Value**); **File Browse / Folder Browse** (returns a
path; file filter); **List Box** (multi-select; delimited string or field selection; **Generate
Custom List** with prefix/suffix/delimiter); **Numeric Up Down** (min/max/increment/decimals);
**Radio Button** (mutually exclusive; each button its own tool; grouped); **Text Box** (free
text/number; password; multi-line); **DCM Connection** (run-time picker for a DCM connection →
DCM-enabled tools).
**Tools:** all 8 Interface tools + Action.
**Theory:** Help → Interface Tools (each of the 8).
**Hands-on:** One app that surfaces **all 8** controls, each wired through an Action to a real tool
property (path, field, filter value, SQL IN-list from List Box, row limit from Numeric Up Down…).
**Practice / Recall:** For each tool, write "what value does it hand downstream, in what format?"
**Weekly Challenge:** none.
**Expected outcome:** You can pick the right Interface tool for a requirement and know its output format.

### Checklist
- [ ] Read the Help page for each of the 8 Interface tools
- [ ] Build: Check Box → toggles a Filter via Condition
- [ ] Build: Drop Down (Name vs Value) → selects a field to summarise
- [ ] Build: File Browse → sets an Input Data path; Folder Browse → sets an Output path
- [ ] Build: List Box → **Generate Custom List** → SQL `IN ('A','B')` string into a Dynamic Input
- [ ] Build: Numeric Up Down (min 1, max 1000) → Input Data record limit
- [ ] Build: Radio Button group (3 options) → picks an output format
- [ ] Build: Text Box (password mode) → note where it's masked
- [ ] Build: DCM Connection control → feeds a DCM-enabled Input
- [ ] For each tool write its downstream value + format
- [ ] Answer 4 D6 Practice Questions (Interface tools / List Box custom list)
- [ ] Update Confidence on all 8 Interface-tool rows; mark them `Hands-on Complete`
- [ ] Fill Day 24 row + Status

---

## Day 25 — Analytical Apps: build one end-to-end (Interface tools + Interface Designer + reasons)
- **Domain:** D6 · **Weight:** 20% · **Priority:** High
- **Date:** ______ · **Split:** 35 / 65 / 20

**Topics:** designing a real analytic app; using Interface Designer; articulating why apps exist.
**Subtopics:** wire Interface → Action → target property; choose the right update action; **Interface
Designer** — question layout & order, **grouping / group boxes**, **Test View**, app **icon**,
**output & "run without input"** settings; **reasons for an app** — guided run-time input for
non-Designer users, parameterise a workflow without editing it, self-service / repeatable runs.
**Tools:** Interface tools, Action, Interface Designer.
**Theory:** Help → Analytic Apps; Interactive Lessons: Analytic Apps.
**Hands-on:** Take a real workflow (e.g. a monthly report) and make it an app: user picks the input
file (File Browse), the month (Drop Down), regions (List Box), and output folder (Folder Browse);
lay out & group the questions; set the icon; test in Interface Designer; save as `.yxwz` and run it.
**Practice / Recall:** Write 3 concrete scenarios where an app is the right answer (and 1 where it isn't).
**Weekly Challenge:** optional — start a candidate Analytical App / Interface challenge from the Index.
**Expected outcome:** A complete, tested analytic app and a clear statement of when to build one.

### Checklist
- [ ] Pick a workflow to convert into an app
- [ ] Add File Browse (input), Drop Down (month), List Box (regions), Folder Browse (output)
- [ ] Wire each through an Action to the correct tool property
- [ ] Interface Designer: order the questions logically; add group boxes with labels
- [ ] Set an app icon; set "run without input" / output options
- [ ] Interface Designer → Test View: run with 3 different input combinations
- [ ] Save as an analytic app; run it from the app window
- [ ] Write 3 scenarios where an app is right + 1 where a macro/plain workflow is better
- [ ] Answer 3 D6 Practice Questions (app design / Interface Designer / reasons)
- [ ] Update Confidence: configure-Interface-tools, use-Interface-Designer, reasons-for-app rows
- [ ] Mark those rows `Hands-on Complete`
- [ ] Fill Day 25 row + Status

---

## Day 26 — Productionizing: Block Until Done + Email Event + Run Command + Dynamic Select + D6 recap
- **Domain:** D6 · **Weight:** 20% · **Priority:** High
- **Date:** ______ · **Split:** 40 / 50 / 30

**Topics:** the 4 productionizing features; the D6 recap.
**Subtopics:** **Block Until Done** — passes all records to output 1, then 2, then 3 **only after
every upstream record has arrived**; sequences a write-then-read in one workflow; **Email Event** —
Workflow Configuration → **Events** → send before/after run or on success/failure (**not** the
Reporting Email tool); **Run Command** — runs an external program/script; **command + arguments**,
optional **Write Source** (pre) and **Read Results** (post), working directory, common "passthrough"
pattern; **Dynamic Select** — select fields **by type** or **by formula** at run time, include vs exclude.
**Tools:** Block Until Done, Run Command, Dynamic Select; Workflow Events (Email Event).
**Theory:** Help → Block Until Done / Events / Run Command / Dynamic Select.
**Hands-on:** Write a table then read it back in one workflow using Block Until Done; add a
success/failure Email Event; add a Run Command step that runs a `.bat`/`.py` and reads its output;
Dynamic Select "keep only numeric fields" by formula.
**Practice / Recall:** D6 recap — 10-question self-quiz across the whole domain.
**Weekly Challenge:** none.
**Expected outcome:** You can sequence I/O with Block Until Done and use the other 3 features; D6 recap scored.

### Checklist
- [ ] Read Block Until Done + Events + Run Command + Dynamic Select Help
- [ ] Build: Output Data → Block Until Done → Input Data (read-back) in one workflow; confirm ordering
- [ ] Add an **Email Event** on workflow success and one on failure
- [ ] Build: Run Command that runs a small script; capture its output via Read Results
- [ ] Note the "dummy passthrough" trick to force Run Command timing
- [ ] Build: Dynamic Select — keep fields where `[_CurrentFieldType_] IN ('Double','Int32','Int64')`
- [ ] Predict which fields survive the Dynamic Select before running
- [ ] Write & answer a 10-question D6 recap quiz; score it
- [ ] Answer 4 D6 Practice Questions (Block Until Done / Run Command / Dynamic Select / Email Event)
- [ ] Update Confidence on all 4 rows; mark all D6 rows `Practice Complete`
- [ ] Set weak D6 topics `🔵 Needs Revision`
- [ ] Fill Day 26 row + Status

---

## Day 27 — Full weak-area revision + Practice Questions + Practice Mock Exam 1
- **Domain:** All · **Priority:** High
- **Date:** ______ · **Split:** 50 revision / 45 mock / 25 review

**Topics:** consolidate everything; first timed mock.
**Subtopics:** work the **WEAK AREAS** view top to bottom; re-build the single hardest workflow per
domain; then sit **Practice Mock Exam 1** (`13-Practice-Mock-Exam-1.md`, 25 Qs) timed at ~35 min.
**Tools:** whatever is in your WEAK AREAS view.
**Theory:** for each `🔵 Needs Revision` topic, re-read its one best resource (max 5 min each).
**Hands-on:** rebuild one flagship workflow per domain from memory (Multi-Row running calc; a
Dynamic Input; a Layout→Render; a Spatial Match; a batch macro; an analytic app).
**Practice / Recall:** Practice Mock Exam 1, timed; then mark it and log in **📊 Mock Exam Tracker**.
**Weekly Challenge:** confirm all 4 confirmed challenges are `Completed`.
**Expected outcome:** A scored Mock 1, a ranked list of remaining weak topics, WEAK AREAS shrinking.

### Checklist
- [ ] Open **WEAK AREAS**; sort by Exam Weight; list every topic
- [ ] For each, re-read its best resource (≤ 5 min) and re-do a 5-min hands-on drill
- [ ] Rebuild 1 flagship workflow per domain from memory (6 total)
- [ ] Clear `🔵 Needs Revision` on everything you've genuinely fixed
- [ ] Sit **Practice Mock Exam 1** (25 Qs) timed ~35 min, closed-book first pass
- [ ] Mark it against the answer key; note every wrong answer's Mistake Type
- [ ] Log Mock 1 in 📊 Mock Exam Tracker (Score %, Weak Domain, Weak Topics)
- [ ] Add every missed question to 📝 Practice Questions with the correct explanation
- [ ] Answer 6 more seeded Practice Questions from your 2 weakest domains
- [ ] Update Confidence across all revised rows
- [ ] Decide the Day 28 focus = your weakest domain from Mock 1
- [ ] Fill Day 27 row + Status

---

## Day 28 — Mock Exam 2 + Final Readiness audit + Weekly Review 4 + go/no-go
- **Domain:** All · **Priority:** High
- **Date:** ______ · **Split:** 60 mock / 35 review / 25 readiness

**Topics:** second mock; final audit; decision.
**Subtopics:** sit a **second mock** — ideally the official **Academy "Advanced Certification Exam
Preparation"** sample questions, or re-sit Practice Mock 1 closed-book plus 26 fresh questions you
write from the Domain Checklists; then complete `10-Final-Exam-Readiness.md` and
`11-Official-Syllabus-Coverage-Audit.md`.
**Tools:** targeted drills on whatever Mock 2 exposes.
**Theory:** none new — only gap-plugging.
**Hands-on:** one drill per Mock 2 weak topic.
**Practice / Recall:** Mock 2 timed; log it; compare Mock 1 → Mock 2 trend.
**Weekly Challenge:** none.
**Expected outcome:** A go/no-go decision: **GO** if both mocks ≥ 80% and no domain < 70% and the
Final Readiness checklist is fully ticked; otherwise a 3–5 day targeted extension plan.

### Checklist
- [ ] Sit **Mock Exam 2** timed (aim 51 Qs / ≤ 2.5 h; or 25 + 26 self-written)
- [ ] Mark it; log in 📊 Mock Exam Tracker; fill Weak Domain / Weak Topics
- [ ] Compare Mock 1 vs Mock 2 score and per-domain trend
- [ ] Do 1 hands-on drill for each Mock 2 weak topic
- [ ] Complete every line of `10-Final-Exam-Readiness.md`
- [ ] Complete `11-Official-Syllabus-Coverage-Audit.md` — confirm 77/77 topics `🟢 Completed`
- [ ] Update the Master Dashboard numbers (completion %, mock average, weak/strong domain)
- [ ] **Weekly Review 4**: total hours vs 56, topics done/pending, challenges done, avg confidence
- [ ] **Go/No-Go**: GO only if both mocks ≥ 80%, every domain ≥ 70%, readiness fully ticked
- [ ] If GO → book the exam for 1–2 days out (register with full legal name + Credly email)
- [ ] If NO-GO → write a 3–5 day extension plan targeting the 2 weakest domains
- [ ] Fill Day 28 row + Status; celebrate finishing the plan 🎉
