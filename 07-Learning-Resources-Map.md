# 📖 Learning Resources Map

Uses **only** the resources the official guide names, plus the Alteryx **Tool Mastery** KB and
**Interactive Lessons** (both are official Community resources). No invented URLs — where a deep
link isn't stable, the instruction is "search the exact title on the site".

## The guide's named resources (with stable entry URLs)

| Resource | URL | Use it for |
|----------|-----|-----------|
| **Alteryx Academy** (hub) | <https://community.alteryx.com/t5/Alteryx-Academy/ct-p/alteryx-academy> | Learning Pathways + Instructor-Led courses |
| Academy learning app | <https://academy.alteryx.com/> | the interactive courses themselves |
| **Learning Pathway: Preparing and Blending Data** | Academy → search the title | D4 Data Sources foundations |
| **Learning Pathway: Parsing Data** | Academy → search the title | D1 RegEx / parse / GetWord / FindString |
| **Learning Pathway: Advanced Data Preparation** | Academy → search the title | D1 Multi-Row / Multi-Field / Generate Rows / Investigation |
| **Learning Pathway: Getting Started with Macros** | Academy → search the title | D5 Macros (all 3 types + Interface Designer) |
| **Learning Pathway: From Data Prep to Insightful Reports** | Academy → search the title | D2 Reporting (Table/Chart/Layout/Render/Email) |
| **Instructor-Led: Alteryx Designer Advanced Certification Exam Preparation** | Academy → Courses → search the title | question types, tips, sample questions — do this in Week 4 |
| **Alteryx Community — Weekly Challenges** | <https://community.alteryx.com/t5/Weekly-Challenge/bd-p/weekly-challenge> | all hands-on challenges (see `06-...`) |
| **Alteryx Help Documentation** | <https://help.alteryx.com/> | every tool's reference page — search "`<Tool> Tool`" |
| **Alteryx One Platform — Documentation** | <https://help.alteryx.com/> | platform-level docs |
| **Alteryx Designer — Documentation** | <https://help.alteryx.com/> | Designer desktop docs |
| **Alteryx Designer Cloud — Documentation** | <https://help.alteryx.com/> | Cloud docs (exam is desktop-focused) |
| **Tool Mastery** knowledge base *(Community, not in the guide but official)* | <https://community.alteryx.com/t5/Tool-Mastery/tkb-p/tool-mastery> | one deep article per tool — best "exam traps" source |
| **Interactive Lessons** *(Community, official)* | <https://community.alteryx.com/t5/Interactive-Lessons/ct-p/interactive-lessons> | in-browser guided practice (Spatial, Analytic Apps) |

> **Open book:** the exam permits Academy, Community, Help Docs, public sites, sample workflows and
> in-Designer resources. Practise *using* Help search during mocks so it's fast on exam day.

---

## Per-topic map

Format: **Topic → What to learn · Primary · Secondary · Hands-on · Related challenge**
(The **📖 Learning Resources** database holds this same table, sortable/filterable.)

### Domain 1 — Advanced Data Prep & Transformation (27%)

| Topic | What to learn | Primary | Secondary | Hands-on | Challenge |
|-------|---------------|---------|-----------|----------|-----------|
| Multi-Row Formula | row offsets, Group By, rows-that-don't-exist, running calcs | Academy: *Advanced Data Preparation* | Tool Mastery: Multi-Row Formula | running total + prev-row delta + % change on sample sales | **#3** |
| Multi-Field Formula | one expression over many fields; overwrite vs add; type change | Academy: *Advanced Data Preparation* | Help: Multi-Field Formula Tool | Trim+upper 5 text fields; retype 3 numeric fields | (verify) MFF |
| Formula fns: DateTime/ToNumber/Round/GetWord/FindString/Trim | exact syntax & return value of each | Help: Functions (by category) | Academy: *Parsing Data* | one Formula, one field per fn, predict each output | (verify) DateTime |
| REGEX_Match / REGEX_Replace | whole-string match; back-references | Academy: *Parsing Data* | Tool Mastery: RegEx | email validation; digit masking; phone reformat | **#56** |
| RegEx tool (Parse/Match/Tokenize/Replace) | which method → columns vs rows vs flags; marked groups | Academy: *Parsing Data* | Help: RegEx Tool | one pattern through all 4 methods, diff outputs | **#56** |
| Filter compound AND/OR | custom filter, precedence, parentheses, nulls | Help: Filter Tool | Tool Mastery: Filter | 5 compound conditions; predict T/F for 10 rows | — |
| DateTime across tools | same fns in Formula/Filter/Generate Rows/Multi-Row | Help: DateTime functions | Academy: *Advanced Data Preparation* | filter by date; generate date rows; diff in Multi-Row | (verify) DateTime |
| Generate Rows | numeric/date/loop; init/condition/loop expressions | Academy: *Advanced Data Preparation* | Help: Generate Rows Tool | date row per day of last month; 1..N per group | #86 (uses it) |
| Find Replace | whole vs any-part; replace vs append; multiple items | Help: Find Replace Tool | Tool Mastery: Find Replace | expand 15 abbreviations inside free text | — |
| Join Multiple | N inputs; Cartesian; only-matching; collisions | Help: Join Multiple Tool | Tool Mastery: Join Multiple | join 3 lookups to a fact table; compare to Join chain | — |
| Investigation (Field Summary / Frequency Table / Association Analysis) | what each output means; where correlation shows | Help: Data Investigation tools | Academy content on Data Investigation | profile a messy dataset; read both report outputs | — |
| Pearson vs Spearman | linear vs monotonic; assumptions; when each is higher | Help: Pearson / Spearman Correlation | Community articles on correlation | run both on a monotonic-curved pair; explain the gap | — |

### Domain 2 — Reporting Tools (10%)

| Topic | What to learn | Primary | Secondary | Hands-on | Challenge |
|-------|---------------|---------|-----------|----------|-----------|
| Tables & Charts | Table column config & rule formatting; chart layers/types/aggregation | Academy: *From Data Prep to Insightful Reports* | Help: Table Tool / Interactive Chart Tool | formatted summary table + grouped bar + line chart | (verify) Reporting |
| Layout / Render / Email | compose snippets; output formats; group-into-separate-reports; email reports | Academy: *From Data Prep to Insightful Reports* | Help: Layout / Render / Email Tools | one PDF (title+table+chart) → one PDF per region → email it | (verify) Reporting |

### Domain 3 — Spatial Analytics Basics (10%)

| Topic | What to learn | Primary | Secondary | Hands-on | Challenge |
|-------|---------------|---------|-----------|----------|-----------|
| Create Points + spatial in Formula/Summarize | point creation; `ST_` functions; Summarize spatial actions | Help: Spatial tools | Interactive Lessons: Spatial Analytics | points from lat/long; buffer in Formula; Combine in Summarize | **#6** |
| Combine / Spatial Match / Trade Area | intersect/cut/buffer results; target vs universe; rings & overlap | Help: Spatial Process / Spatial Match / Trade Area | Interactive Lessons: Spatial Analytics | trade areas → Spatial Match customers → count per store | **#6** |
| Distance / Find Nearest / Target & Universe | straight-line vs drive; nearest N; which anchor is which | Help: Distance Tool / Find Nearest Tool | Tool Mastery: Find Nearest | nearest depot per customer, 25-mi cap; inspect both outputs | **#6** |

### Domain 4 — Data Sources (15%)

| Topic | What to learn | Primary | Secondary | Hands-on | Challenge |
|-------|---------------|---------|-----------|----------|-----------|
| Download & Connectors | REST GET/POST; headers/payload; connectors vs Download | Help: Download Tool / Connectors | Academy: *Preparing and Blending Data* | call a public JSON API; parse the response | (verify) Data Sources |
| In-Database & DCM | Connect In-DB; Data Stream In/Out; pushdown; DCM connections | Help: In-Database / Data Connection Manager | Academy In-Database content | In-DB filter+summarize on SQLite; stream out only at the end | — |
| Dynamic Input / Directory / Dynamic Rename | template reads; list-of-sources; rename methods | Help: Dynamic Input / Directory / Dynamic Rename | Tool Mastery articles | Directory → Dynamic Input over 5 files; Dynamic Rename via formula | (verify) Data Sources |
| Blob tools | Blob Input/Output/Convert; binary files | Help: Blob Input / Blob Output / Blob Convert | Tool Mastery: Blob | read an image folder to blobs; write them back renamed | — |

### Domain 5 — Macros (18%)

| Topic | What to learn | Primary | Secondary | Hands-on | Challenge |
|-------|---------------|---------|-----------|----------|-----------|
| Standard / Batch / Iterative + Macro Input/Output | use cases; Control Parameter; Iteration anchors | Academy: *Getting Started with Macros* | Help: Macros | build one of each type doing the same trivial task; compare runs | **#86** |
| Interface Designer / Show Field Map / Debug / repository | Layout & Test View; field mapping; Debug workflow; User Settings → Macros | Academy: *Getting Started with Macros* | Help: Interface Designer / User Settings | add an interface question; Debug it; register a macro folder | **#86** |

### Domain 6 — Analytical Apps & Productionizing (20%)

| Topic | What to learn | Primary | Secondary | Hands-on | Challenge |
|-------|---------------|---------|-----------|----------|-----------|
| Action / Condition / Error Message | XML update actions; interface-flow branching; run-time errors | Help: Action / Condition / Error Message Tools | Interactive Lessons: Analytic Apps | app updates an Input path via Action; Condition toggles a branch; Error Message guard | (verify) Analytical App |
| The 8 Interface tools | each tool's capability + output format | Help: Interface Tools | Academy Analytic Apps content | one app exercising all 8, each wired through an Action | (verify) Analytical App |
| Block Until Done / Email Event / Run Command / Dynamic Select | ordering; workflow events; external scripts; run-time field selection | Help: Block Until Done / Events / Run Command / Dynamic Select | Community articles | write-then-read with Block Until Done; success Email Event; a Run Command step | — |
