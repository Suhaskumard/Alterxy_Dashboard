# 🛠️ Tool Mastery Guide

Companion notes to the **🛠️ Tool Mastery** database (60 rows). For every tool you must be able to
answer the **5 mastery questions**:

1. **What does it do?**  2. **What goes in?**  3. **What comes out?**
4. **What changes when the configuration changes?**  5. **Can I predict its output *without running* it?**

Only tick `Output prediction completed` when the honest answer to #5 is *yes*.

Below: the exam-critical tools with **config essentials · common mistakes · exam traps ·
predict-this drills**. Lower-risk tools are in the database only.

---

## Domain 1

### Multi-Row Formula  ⚡ (highest-value D1 tool)
- **Config:** new/replace field · field **type & size** · **Num Rows** (how far back/forward you can
  reference) · **Values for rows that don't exist** (`0` / `Null()` / a value / `""`) · **Group By**.
- **Common mistakes:** not sorting first; forgetting Group By so the calc bleeds across groups;
  leaving "rows that don't exist" on `Null()` then doing arithmetic (→ all `Null`).
- **Exam traps:** given an expression + a small input table, produce **every** output row —
  especially row 1 and the first row of each group. `[Row-1:X]` on row 1 = the "rows that don't
  exist" value, **not** blank-by-default.
- **Predict this:** input `Sales = 100, 200, 300`; expr `[Sales] + [Row-1:RunTot]`; new field
  `RunTot`; rows-that-don't-exist = `0`. → `100, 300, 600`. Change setting to `Null()` → `Null,
  Null, Null`.

### Multi-Field Formula
- **Config:** pick the fields · one expression using `[_CurrentField_]` (value) and
  `[_CurrentFieldName_]` (name) · **"Copy Output Fields and Add"** (adds new fields vs overwrites) ·
  change output **type/size** for all selected.
- **Common mistakes:** leaving "Copy…Add" on when you wanted to overwrite; selecting fields of
  mixed types for a type-specific expression.
- **Exam trap:** overwrite vs new-field **schema** after the tool.
- **Predict this:** 3 string fields, expr `Trim([_CurrentField_])`, "Copy…Add" **on** → 6 fields
  (`Field`, `Field2`…). "Copy…Add" **off** → same 3 fields, trimmed.

### Formula — the 8 named functions
| Function | The one thing people get wrong |
|----------|-------------------------------|
| `DateTime()` / `DateTimeParse(str,fmt)` / `DateTimeFormat(dt,fmt)` | the format string uses `%Y %m %d %H %M %S`; Parse needs the **input's** format, not the output's |
| `ToNumber(str, ignoreErrors, decimalSep)` | bad text → **`Null`**, not `0`; European decimals need the 3rd arg |
| `Round(value, multiple)` | rounds to the nearest **multiple** — `Round(2347,100)=2300`, `Round(x,0.01)` for 2 dp |
| `REGEX_Match(str, pattern)` | the **entire** value must match; add `.*` to test "contains" |
| `REGEX_Replace(str, pattern, replace)` | `\1`, `\2` reference **marked groups** `( )` in the pattern |
| `GetWord(str, n)` | **zero-based**; default delimiters are whitespace + common punctuation (not `-`) |
| `FindString(str, target)` | **zero-based** position; `-1` if not found; **case-sensitive** |
| `Trim(str, chars)` | with a 2nd arg it strips **any of those characters** from both ends, not a substring |

### RegEx tool
- **Config:** the field · the pattern · **output method**:
  - **Replace** — substitute matches (like `REGEX_Replace`).
  - **Tokenize** — split the value into **rows or columns** by the pattern; you set the number of
    columns.
  - **Parse** — one **output column per marked group**.
  - **Match** — add fields that **flag** whether it matched / return the matched text.
  - **Case Insensitive** checkbox.
- **Exam traps:** Parse vs Match ("split into columns" = Parse; "flag/return the match" = Match);
  too few Tokenize columns silently drops tokens; unescaped `. ( ) [ ] { } + * ? | \ ^ $`.
- **Predict this:** pattern `(\d{4})-(\d{2})` on `"2026-09"` → **Parse**: 2 cols `2026`, `09`;
  **Match**: a match flag = `1` + matched string `2026-09`; **Tokenize (2 cols)**: `2026`, `09`.

### Filter (compound)
- **Config:** Basic (field/operator/value) or **Custom** expression.
- **Exam trap:** **`AND` binds tighter than `OR`.** `A OR B AND C` = `A OR (B AND C)`. Parenthesise.
- **Predict this:** `[R]="East" OR [R]="West" AND [S]>1000` — a `West` row with `S=500` → **False**;
  an `East` row with `S=1` → **True** (all East rows pass regardless of S).

### Generate Rows
- **Config:** update an existing field **or** create a new one · type (numeric/date/string) ·
  **Initialization**, **Condition** (loop while true), **Loop** (next value) expressions.
- **Common mistakes:** off-by-one in the Condition (`<` vs `<=`); wrong type for date loops
  (`DateTimeAdd`); accidental non-terminating condition.
- **Predict this:** Init `1`, Condition `[N] <= 5`, Loop `[N] + 1` → **5** extra rows (1..5) per
  input row. Condition `[N] < 5` → 4 rows.

### Find Replace
- **Config:** Find field (in the F input) · target field (in the main input) · **find within a
  field** vs whole value · **replace found text** vs **append fields from the Find input** ·
  case sensitivity · "find **any part** of field".
- **Predict this:** replace multiple abbreviations in a comment: if a comment contains 2 known
  abbreviations and "any part of field" + "replace found text" is set → **both** are replaced in
  that one row.

### Join Multiple
- **Config:** ≥ 2 (usually 3+) inputs · join **by field(s)** or **by record position** ·
  **"Cartesian join if no join fields"** · **"output only records that joined"** · field naming
  (input number prefix on collisions).
- **Exam trap:** no join field selected → **Cartesian** (row explosion). Unmatched records are
  **kept** with nulls unless "only records that joined" is ticked.

### Data Investigation
- **Field Summary / Frequency Table** don't change the data — two outputs: **R** (report) + **I**
  (interactive/data). Field Summary = per-field profile (% missing, unique, min/max/mean/median/
  std). Frequency Table = count + % per distinct value.
- **Association Analysis** — pick a **target** field; get a correlation matrix (**Pearson or
  Spearman**) + p-values + an association-measures report.
- **Pearson** = linear correlation, −1..1, assumes linear + interval data, outlier-sensitive.
- **Spearman** = rank/monotonic correlation, robust to outliers and non-linear-**monotonic** data,
  works on ordinal.
- **Choose:** ranked/skewed/ordinal/curved-but-monotonic → **Spearman**; clean linear interval →
  **Pearson**.

---

## Domain 2

### Table
- **Config:** per-column: include/order, header, **number/date format**, width · **rule-based
  formatting** (background/text colour by condition) · grouping · **Basic vs Pivot**.
- **Exam trap:** a formatting rule attached to the wrong column; forgetting the field must be in
  the table to format on it.

### Interactive Chart / Charting
- **Config:** **layers** · chart type · X & Y fields · **aggregation** (sum/avg/count) · series/
  grouping field · axis, legend, colours.
- **Exam trap:** the aggregation setting on a value field changes the whole chart; category vs
  value axis.

### Layout → Render → Email (the reporting pipeline)
- **Layout:** combines multiple report snippets into **one** report field; Vertical/Horizontal;
  per-section orientation; borders/margins; **"Layout each group of records"** (one layout per
  group).
- **Render:** turns report field(s) into an output — **PDF / HTML / DOCX / XLSX / PCXML** · paper
  size & orientation · **"Group Data into Separate Reports"** (→ one file per group) · output to a
  **field** (for Email) or a **file**.
- **Email (Reporting):** SMTP · To/From/CC from fields · subject/body text or field · **attach** a
  rendered report or a BLOB · **one email per incoming record** (aggregate first to control count).
- **Predict this:** Render, "Group Data into Separate Reports" on `Region` (4 regions), output to a
  `.pdf` path → **4 PDF files**. Without a Layout upstream, two separate snippet fields render as
  **two separate reports**, not side-by-side.

---

## Domain 3

### Create Points
- **X = Longitude, Y = Latitude.** Swapping them is the #1 spatial error → points in the wrong
  hemisphere.

### Spatial functions in Formula / Summarize
- Formula: `ST_Distance`, `ST_Buffer(obj, dist, units)`, `ST_Centroid`, `ST_Contains(a,b)`,
  `ST_Intersects(a,b)`, `ST_Within(a,b)`, `CreatePoint(lon,lat)`, `ToWKT`/`FromWKT`.
- Summarize spatial actions: **Combine** (merge objects), **Create Convex Hull**, **Create
  Bounding Rectangle**, **Create Centroid**.

### Combine spatial objects (Spatial Process tool)
- **Combine** (union), **Cut** (erase B from A), **Intersect** (overlap only). **Buffer**: positive
  grows the object; **negative** shrinks it (can vanish).
- **Predict this:** two overlapping circles — **Intersect** → the lens-shaped overlap; **Cut A−B**
  → A with a bite taken out; **Combine** → one blob.

### Spatial Match  ⚡
- **Two inputs: Target (T) and Universe (U).** Match condition = "Where **Target** `<relationship>`
  **Universe**" (Contains / Intersects / Touches / Within / …).
- Outputs: **Matched** (T fields + U fields, **one row per T–U match** → fan-out) and **Unmatched**.
- **Predict this:** T = 3 store polygons, U = 12 customer points, "Target Contains Universe", store
  A holds 5, B holds 4, C holds 0 → **Matched = 9 rows**, C goes to **Unmatched**.

### Trade Area
- Rings by **radius (miles)** or **drive-time** (needs a dataset) · multiple sizes at once ·
  **overlap**: Keep / **Remove Overlap** (concentric donuts) / **Cookie-cut** (nearest centre
  wins).

### Distance & Find Nearest
- **Distance:** T vs U → distance (and optionally **drive time** + **direction**) for the paired
  objects; point-to-point or point-to-polygon; set **units**.
- **Find Nearest:** for each **Target**, the nearest **N** **Universe** objects within a **max
  distance**; adds a **distance** field; outputs **Matched** + **Not Found**.
- **Target = "search from" (kept once). Universe = "search against".** Reversing them is a classic
  trap.
- **Predict this:** Find Nearest, T = 10 warehouses, U = 500 customers, N = 1, max = 20 mi, 30
  customers beyond 20 mi… careful: matched rows = **one per Universe record within range** = 470;
  Not Found = 30.

---

## Domain 4

### Download
- Tabs: **Basic** (URL, output to field/blob), **Connection** (method, timeout), **Headers**,
  **Payload** (query string / POST body). Outputs `DownloadData`, `DownloadHeaders`, status.
- **Trap:** POST body belongs in **Payload**, not Headers; binary responses need **blob** output.

### In-Database
- `Connect In-DB` opens a stream; In-DB Formula/Filter/Join/Summarize/Select **push down as SQL**;
  data returns to Designer only at **Data Stream Out** or **Browse In-DB**; `Data Stream In` pushes
  Designer data into a (temp) table; **Write Data In-DB** for create/append/overwrite.
- **Trap:** streaming out mid-pipeline kills the pushdown advantage.

### DCM (Data Connection Manager)
- Separates **connection** (host/db/options) from **credential** (user/secret); both are **reusable
  and shareable** with role-based access; many input/output/In-DB tools are **DCM-enabled**.
- **It's about management & security, not speed.**

### Directory / Dynamic Input / Dynamic Rename
- **Directory:** 0 inputs → rows of `FullPath, FileName, Directory, Size, Created, Modified`;
  wildcard + include-subdirectories.
- **Dynamic Input:** a **template** (example file/query) defines the schema; **"Read a List of Data
  Sources"** (paths from an incoming field) vs **"Change Entire File Path"**; **"Modify SQL
  Query"** action to alter WHERE/SELECT per source. **Error: "…has a different schema than the
  template"** → the source's columns/types differ; fix with consistent schemas, a **batch macro**,
  or Union "set based on all inputs".
- **Dynamic Rename:** methods = *Take Field Names from First Row of Data* (⚠ consumes that row) /
  *Formula* (on `[_CurrentFieldName_]`) / *Add-Remove Prefix or Suffix* / *Rename from Right input*.

### Blob tools
- **Blob Input:** 0 inputs, wildcard path → **one row per file**, a single `Blob` field. Pair with
  **Directory** for control over the list.
- **Blob Convert:** `Field` ↔ `Blob` — pick **To Blob** or **From Blob**; string encoding.
- **Blob Output:** writes each `Blob` row to a file; **filename from a field**; set the extension.

---

## Domain 5

### The three macro types
| Type | What makes it that type | Runs | Typical job |
|------|-------------------------|------|-------------|
| **Standard** | Macro Input + Macro Output, no Control/Iteration | once | reusable logic packaged as a tool |
| **Batch** | a **Control Parameter** | **once per control record** | apply logic per file/region/parameter; an **Action** updates config each pass |
| **Iterative** | **Iteration Input + Iteration Output** | loops output→input | until the loop output is empty / condition met, **or max iterations** (Interface Designer → Properties) |

### Macro Input / Output
- **Macro Input:** provide **template data** (so downstream tools configure) · anchor **name +
  abbreviation** · **Show Field Map** = the macro's user maps *their* fields to the macro's expected
  fields at configure time.
- **Macro Output:** one per output anchor; name + abbreviation.

### Interface Designer window
- **Layout** (drag questions & group boxes, set order) · **Test View** (run with sample values) ·
  **Tree** (question hierarchy) · **Properties** (macro **icon**; **output mode**: macro vs
  analytic app; **Maximum Number of Iterations** for iterative macros).

### Debug
- **Interface Designer → Debug** builds a **normal standalone workflow** with the current interface
  values baked in — open it, run it, find the bug, then fix the macro.

### Macro repository / location
- **Options → User Settings → Macros tab** → add search paths. The **folder name** becomes the
  **tool-palette category** where your macro appears.

---

## Domain 6

### Action
- Binds an **Interface tool value** (or Control Parameter) to a **specific property in the target
  tool's XML**. Update modes:
  - **Update Value (Default)** — replace the whole property value.
  - **Update Value with Formula** — compute the new value.
  - **Replace a specific string** — find/replace inside the property (⚠ can over-match).
  - **Update raw XML / specific attribute** — for advanced tools.
- **Predict this:** Text Box value `C:\data\jan.csv` → Action "Update Value" on an Input Data
  `File` property → the workflow runs with that path.

### Condition
- **Only inside an app/macro.** Evaluates **one expression**; **True/False anchors route
  interface/configuration flow** (which Actions fire), **not data records**. For data → Filter.

### Error Message
- Expression → an error string when **true**. Set as **warning** (logs, run continues) or **error**
  (**app stops before running**, message shown to the user). Use it to block invalid inputs.

### The 8 Interface tools (output & format)
| Tool | Hands downstream | Notes |
|------|-----------------|-------|
| Check Box | a value for checked / a value for unchecked | often → Condition |
| Drop Down | the selected **Value** (≠ the displayed **Name**) | list: manual / file / connected |
| File Browse / Folder Browse | a **path string** | file-type filter |
| List Box | a **delimited string** or a **field selection** | **Generate Custom List** = prefix + value + suffix, joined by a delimiter (e.g. `'A','B','C'`) |
| Numeric Up Down | a **number** within min/max | increment, decimals |
| Radio Button | the active button's value (group is mutually exclusive) | one tool **per** button; group them |
| Text Box | a **string** (free text/number; password; multi-line) | feeds Action |
| DCM Connection | a **DCM connection reference** | for DCM-enabled tools |

### Productionizing
- **Block Until Done:** 1 input → outputs **1, then 2, then 3**, each released only after **all**
  upstream records arrive. Use to sequence *write table → then read it back* in one workflow.
- **Email Event:** Workflow Configuration → **Events** → send on Before/After Run or Success/Error.
  **Not** the Reporting Email tool (that's per-record with attachments).
- **Run Command:** run an external `.exe`/`.bat`/script — **Command** + **Command Arguments** +
  **working directory**; optional **Write Source** (write a file first) and **Read Results** (read
  the script's output back). Common "passthrough" trick: feed it dummy data so it runs at the
  right time.
- **Dynamic Select:** keep/drop fields **by type** or **by a formula** evaluated at run time
  (`[_CurrentFieldType_]`, `[_CurrentFieldName_]`); include vs exclude the matches.
