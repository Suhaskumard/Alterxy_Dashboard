# 🧩 Prerequisite / Basics Check

**Tier: PREREQUISITE — NOT on the exam outline.**
The Advanced exam has *no prerequisite* (Core is no longer required), but the Advanced topics
*assume* you can already do the things below without thinking. This page is a **gap-finder**, not a
curriculum. Spend **Day 1, ~30–45 min** here. If everything is a confident ✔, move on. Anything you
can't do blindfolded → book a 15-minute fix into a Week-1 recall slot.

> This is intentionally minimal. Do **not** expand it into a full Core-certification study plan —
> that would eat time you need for the 77 official Advanced topics.

## How to use it
For each item, tick only if you can **build it from memory and predict its output**. Mirror these
into the **Master Topic Tracker** rows with `Type = Prerequisite` and set a Confidence 1–5.

---

## Core tools

- [ ] **Input Data** — file & database connections; file-format options; record limit; first-row-has-field-names
- [ ] **Output Data** — write to file/db; overwrite vs append; file-type options; take file/sheet name from field
- [ ] **Select** — reorder, rename, change **type & size**, deselect; the "Unknown" catch-all row
- [ ] **Filter** (basic) — single condition; **True** and **False** output anchors
- [ ] **Formula** (basic) — create vs overwrite a field; pick the right data type; `IF … THEN … ELSE … ENDIF`; `IIF()`
- [ ] **Sort** — ascending/descending; multi-field sort priority
- [ ] **Unique** — which anchor is unique vs duplicate; choosing the key field(s)
- [ ] **Summarize** — Group By + Sum / Count / Min / Max / Average / Concatenate / First / Last; renaming outputs
- [ ] **Join** — join on **field vs position**; **L / J / R** anchors; field selection & name collisions; fan-out on duplicate keys
- [ ] **Union** — auto-config **by name vs by position**; handling missing fields; resulting record order

## Core concepts

- [ ] **Workflow connections** — standard vs wireless; tool containers; disabling containers/tools; comment & annotation
- [ ] **Data types** — `String` vs `V_String` vs `WString`/`V_WString`; `Int16/32/64`, `Double`, `Fixed Decimal`; `Date`, `Time`, `DateTime`; `Bool`; `Blob`; **field size** and silent truncation
- [ ] **Basic expressions & operators** — `AND` `OR` `NOT`; `=` `!=` `<` `>` `<=` `>=`; `IN(...)`; `IsNull()`, `IsEmpty()`; string concatenation with `+`; `Null()`
- [ ] **Reading the Results grid & metadata** — cell type icons, field metadata pane, record count, errors vs warnings in the log
- [ ] **Browse tool** — profiling a stream; the map view for spatial objects

## Quick self-test (answer in your head, then verify in Designer)

1. In a **Join**, table L has 2 rows with key `A`, table R has 3 rows with key `A`. How many rows on the **J** anchor? → *6 (Cartesian fan-out)*
2. **Union** by position when input 2 has an extra column — what happens? → *columns misalign / extra column dropped or shifted; use "by name"*
3. `Left("Alteryx", 3)` → `"Alt"`. `Length(Trim("  hi "))` → `2`.
4. **Summarize** Group By `Region`, Sum `Sales`: output columns? → `Region`, `Sum_Sales` (rename as needed)
5. A `String(5)` field receives `"Designer"` via Formula — result? → truncated to `"Desig"` (watch field size)

## If you find a gap
Primary fix resource: **Alteryx Academy** foundational / Designer Core learning
(<https://community.alteryx.com/t5/Alteryx-Academy/ct-p/alteryx-academy>) and the **Tool Mastery**
knowledge base (<https://community.alteryx.com/t5/Tool-Mastery/tkb-p/tool-mastery>). 15 minutes per
gap, then return to the Advanced plan.
