# ✅ Domain Checklists — every official exam item

**Tier: OFFICIAL.** Every checkbox below is drawn from the official Exam Prep Guide's Content
Outline. 77 items total. Each maps 1:1 to a row in the **Master Topic Tracker** and to a study day.
Tick an item only when: Theory ✔ **and** Hands-on ✔ **and** you can **predict its output without
running the workflow** **and** Confidence ≥ 4.

Legend for the mini-tags: `[fn]` = a Formula function · `[tool]` = a tool · `[concept]` = a
concept/skill you must be able to reason about.

---

## Domain 1 — Advanced Data Preparation and Transformation · 27% · (25 items) · Days 1–7

### Multi-Row Formula
- [ ] `[tool]` Configure the **Multi-Row Formula tool** and **identify output from expressions** *(Day 1)*
- [ ] `[concept]` Previous / current / next row references `[Row-1:F]`, `[Row+1:F]`, `[Row-2:F]` *(Day 1)*
- [ ] `[concept]` **Group By** behaviour (calculation resets at each group boundary) *(Day 1)*
- [ ] `[concept]` **Num Rows** setting and new-field **type & size** *(Day 1)*
- [ ] `[concept]` **Values for rows that do not exist** — `0` / `Null()` / specific value / `""` *(Day 2)*
- [ ] `[concept]` Behaviour on the **first row (no previous)** and the **last row (no next)** *(Day 2)*

### Multi-Field Formula
- [ ] `[tool]` Configure the **Multi-Field Formula tool** for **overwriting fields** *(Day 3)*
- [ ] `[concept]` **Changing data type / size** of the output; `[_CurrentField_]`, `[_CurrentFieldName_]`; "Copy Output Fields and Add" *(Day 3)*

### Formula tool functions (the 8 named in the guide)
- [ ] `[fn]` **`DateTime()`** — string ↔ date conversion & formatting *(Day 4)*
- [ ] `[fn]` **`ToNumber()`** — string → numeric; `ignoreErrors`, `decimalSeparator` *(Day 3)*
- [ ] `[fn]` **`Round()`** — rounds to the nearest **multiple** (not decimal places) *(Day 3)*
- [ ] `[fn]` **`REGEX_Match()`** — returns Boolean; **whole value must match** *(Day 5)*
- [ ] `[fn]` **`REGEX_Replace()`** — replace with `\1 \2` back-references *(Day 5)*
- [ ] `[fn]` **`GetWord()`** — zero-based word index *(Day 4)*
- [ ] `[fn]` **`FindString()`** — zero-based position; `-1` if not found; case-sensitive *(Day 4)*
- [ ] `[fn]` **`Trim()`** — `Trim` / `TrimLeft` / `TrimRight`; optional character set *(Day 3)*

### Filter, DateTime, Generate Rows
- [ ] `[tool]` Configure the **Filter tool** with **compound AND/OR** expressions (precedence + parentheses) *(Day 4)*
- [ ] `[concept]` **DateTime functions across multiple tools** (Formula, Filter, Generate Rows, Multi-Row Formula) *(Day 4)*
- [ ] `[tool]` Use the **Generate Rows tool** (numeric / date / loop; Init / Condition / Loop expressions) *(Day 6)*

### Parse and join data
- [ ] `[tool]` Configure the **Find Replace tool** to **replace multiple items** *(Day 6)*
- [ ] `[tool]` Configure the **Join Multiple tool** *(Day 6)*
- [ ] `[tool]` Configure the **RegEx tool** (output methods; marked groups) *(Day 5)*
- [ ] `[concept]` **Differentiate the parse and match methods** *(Day 5)*
- [ ] `[concept]` **Identify the regular expression that results in a given output** *(Day 5)*

### Investigate data
- [ ] `[tool]` **Association Analysis** — identify, configure, interpret output *(Day 7)*
- [ ] `[tool]` **Field Summary** — identify, configure, interpret output *(Day 7)*
- [ ] `[tool]` **Frequency Table** — identify, configure, interpret output *(Day 7)*
- [ ] `[tool]` **Pearson Correlation** — identify, configure, interpret output *(Day 7)*
- [ ] `[tool]` **Spearman Correlation** — identify, configure, interpret output *(Day 7)*
- [ ] `[concept]` **Differentiate Pearson vs Spearman Correlation** *(Day 7)*

*(Count check: 6 + 2 + 8 + 3 + 5 + 6 = 30 checkboxes covering 25 tracked atomic topics — the extra
boxes are sub-points of items 1–2.)*

---

## Domain 2 — Reporting Tools · 10% · (5 items) · Days 12–14

- [ ] `[concept]` **Configure tables** — Table tool: column config, rule-based/conditional formatting, grouping, Basic vs Pivot, number/date format *(Day 12)*
- [ ] `[concept]` **Configure charts** — Charting / Interactive Chart tool: layers, chart types, X/Y, aggregation, axis/legend *(Day 12)*
- [ ] `[tool]` Configure the **Layout tool** — arrange snippets, orientation, borders/margins, layout per group *(Day 13)*
- [ ] `[tool]` Configure the **Render tool** — output formats (PDF/HTML/DOCX/XLSX/PCXML), paper size, "Group Data into Separate Reports", field vs file *(Day 13)*
- [ ] `[tool]` Configure the **Email tool** (Reporting) — SMTP, To/From/Body from fields, attach report/blob, one email per record *(Day 13)*

---

## Domain 3 — Spatial Analytics Basics · 10% · (9 items) · Days 15–17

- [ ] `[tool]` **Create Points tool** — X = Longitude, Y = Latitude → point spatial object *(Day 15)*
- [ ] `[concept]` **Spatial functionality within the Formula tool** — `ST_Distance`, `ST_Buffer`, `ST_Centroid`, `ST_Contains`, `ST_Intersects`, `CreatePoint`, `ToWKT` *(Day 15)*
- [ ] `[concept]` **Spatial functionality within the Summarize tool** — Combine, Convex Hull, Bounding Rectangle, Centroid *(Day 15)*
- [ ] `[concept]` **Combine spatial objects** — identify results of **intersections, splits, and buffers** of two objects *(Day 16)*
- [ ] `[tool]` **Spatial Match tool** — interpret the interaction between **target and universe** objects; match conditions; record fan-out *(Day 16)*
- [ ] `[tool]` Configure the **Trade Area tool** — radius / drive-time rings; overlap Keep / Remove / Cookie-cut *(Day 16)*
- [ ] `[tool]` Configure the **Distance tool** — point-to-point / point-to-poly; straight-line vs driving; units; direction *(Day 17)*
- [ ] `[tool]` Configure the **Find Nearest tool** — nearest N; max distance; Matched vs Not-Found outputs *(Day 17)*
- [ ] `[concept]` Explain the functionality of the **Target and Universe input anchors** *(Day 17)*

---

## Domain 4 — Data Sources · 15% · (11 items) · Days 8–11

### Connect & configure to external data sources
- [ ] `[concept]` Tools within the **Connectors ribbon** — purpose-built connectors vs generic Input; auth patterns *(Day 8)*
- [ ] `[tool]` **Download tool** — method, headers, query/payload, DownloadData vs DownloadHeaders, string vs blob *(Day 8)*
- [ ] `[tool]` **In-Database tools** — Connect In-DB, Data Stream In/Out, In-DB transforms, pushdown *(Day 9)*
- [ ] `[concept]` **Data Connection Manager (DCM)** — separates connection from credential; reusable; roles; DCM-enabled tools *(Day 9)*

### Advanced methods to input files
- [ ] `[tool]` **Directory tool** — file list fields; sub-directories; wildcard; feeds Dynamic Input *(Day 10)*
- [ ] `[tool]` **Input / Output Data tools** — advanced options: format options, multi-file/sheet wildcards, "Output File Name as Field", record limit *(Day 10)*
- [ ] `[tool]` **Dynamic Input tool** — template input; "list of data sources" vs "change entire file path"; Modify SQL; schema-mismatch errors *(Day 10)*
- [ ] `[tool]` **Dynamic Rename tool** — first row of data / formula / add-remove prefix-suffix / from R input *(Day 10)*
- [ ] `[tool]` **Blob Convert tool** — string/field ↔ BLOB; direction; encoding *(Day 11)*
- [ ] `[tool]` **Blob Input tool** — read binary files into a BLOB field; wildcard; pair with Directory *(Day 11)*
- [ ] `[tool]` **Blob Output tool** — write a BLOB field to files; filename from field; extension *(Day 11)*

---

## Domain 5 — Macros · 18% · (9 items) · Days 18–22

### Use case & functionality
- [ ] `[concept]` **Standard macro** — appropriate use case & functionality *(Day 18)*
- [ ] `[concept]` **Batch macro** — appropriate use case & functionality (Control Parameter; once per control record) *(Day 18)*
- [ ] `[concept]` **Iterative macro** — appropriate use case & functionality (Iteration Input/Output; loop until condition / max iterations) *(Day 18)*

### Configure macros
- [ ] `[tool]` **Macro Input tool** — template data; field-map anchor; name & abbreviation *(Day 18)*
- [ ] `[tool]` **Macro Output tool** — defines an output anchor; multiple outputs *(Day 19)*
- [ ] `[concept]` Recognize **Show Field Map** functionality (map incoming fields to the macro's expected fields) *(Day 19)*
- [ ] `[concept]` Use the **Interface Designer window** (Layout, Test View, Tree, Properties) *(Day 19)*
- [ ] `[concept]` Identify **debug functionality for a macro interface** (Interface Designer → Debug → standalone workflow) *(Day 22)*
- [ ] `[concept]` Set the **macro repository or location in User Settings** (Options → User Settings → Macros) *(Day 22)*

---

## Domain 6 — Analytical Applications and Productionizing · 20% · (18 items) · Days 23–26

### Core app/macro tools
- [ ] `[tool]` Configure the **Action tool** — update value (default) / with formula / replace specific string / raw XML *(Day 23)*
- [ ] `[concept]` Determine the **boundaries of the Condition tool** (app/macro only; routes config flow, not data) *(Day 23)*
- [ ] `[tool]` Identify functionality of the **Error Message tool** and the resulting records with an error (warning vs error; stops the run) *(Day 23)*

### User Interface tools — capabilities & functionality
- [ ] `[tool]` **Check Box** *(Day 24)*
- [ ] `[tool]` **Drop Down** (Name vs Value; list sources) *(Day 24)*
- [ ] `[tool]` **File / Folder Browse** (returns a path; file filter) *(Day 24)*
- [ ] `[tool]` **List Box** (multi-select; Generate Custom List) *(Day 24)*
- [ ] `[tool]` **Numeric Up Down** (min/max/increment/decimals) *(Day 24)*
- [ ] `[tool]` **Radio Button** (mutually exclusive; grouped) *(Day 24)*
- [ ] `[tool]` **Text Box** (free text/number; password; multi-line) *(Day 24)*
- [ ] `[tool]` **DCM Connection** (run-time DCM connection picker) *(Day 24)*

### Design analytical applications
- [ ] `[concept]` **Configure Interface tools** (wire Interface → Action → target property) *(Day 25)*
- [ ] `[concept]` **Use Interface Designer** (question layout & order, grouping, Test View, icon, output settings) *(Day 25)*
- [ ] `[concept]` **Illustrate reasons for using an application** (guided input, parameterise without editing, self-service) *(Day 25)*

### Productionizing features
- [ ] `[tool]` **Block Until Done tool** — releases outputs 1→2→3 after all records arrive *(Day 26)*
- [ ] `[concept]` **Email Event** — Workflow Configuration → Events (≠ Reporting Email tool) *(Day 26)*
- [ ] `[tool]` **Run Command tool** — external program/script; command + args; write source / read results *(Day 26)*
- [ ] `[tool]` **Dynamic Select tool** — select fields by type or by formula at run time *(Day 26)*

---

## Roll-up

| Domain | Weight | Official items | Days | Done (fill in) |
|--------|:------:|:--------------:|------|:--------------:|
| D1 Advanced Data Prep & Transformation | 27% | 25 | 1–7 | ___ / 25 |
| D2 Reporting Tools | 10% | 5 | 12–14 | ___ / 5 |
| D3 Spatial Analytics Basics | 10% | 9 | 15–17 | ___ / 9 |
| D4 Data Sources | 15% | 11 | 8–11 | ___ / 11 |
| D5 Macros | 18% | 9 | 18–22 | ___ / 9 |
| D6 Analytical Apps & Productionizing | 20% | 18 | 23–26 | ___ / 18 |
| **Total** | **100%** | **77** | 1–26 | **___ / 77** |
