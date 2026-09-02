# 📚 Official Syllabus — Alteryx Designer Advanced Certification

> **Source of truth:** *Alteryx Designer Advanced Certification — Exam Prep Guide*
> (`Alteryx_advanced_exam_prep_guide_2026.pdf`). This page reproduces the guide's structure and
> wording. Anything not in the guide is labelled **[SUPPORTING]**, **[PREREQUISITE]**, or
> **[RECOMMENDED]** and is *not* an official exam requirement.

---

## About the certification

The Alteryx Designer Advanced Certification exam demonstrates high-level ability with Alteryx
Designer. It **builds on the Designer Core exam** and requires a wider breadth of tool functionality
plus applying knowledge to more complex applications.

## Exam details (from the guide)

| Item | Value |
|------|-------|
| Exam type | Online, at **Alteryx Academy – Certification** |
| Content | **51 multiple-choice and multiple-select questions** |
| Scoring | 1 point per item · partial credit on multiple-select items · **4 points per practical-application item** |
| Time limit | **2.5 hours** |
| **Passing score** | **73%** |
| Attempts | One attempt every 24 hours |
| Prerequisite | **None** — passing Designer Core first is no longer required |
| Recertification | Expires after **2 years**; passing Advanced no longer renews Core |
| Credential | Credly digital badge |
| Registration | Full legal first + last name, and the email tied to any existing Credly badges |
| Policy | See the *Alteryx Certification Agreement* |

## Allowed resources (open book)

Alteryx Academy and Community · Alteryx Help Documentation · public websites · sample workflows and
in-Designer resources.

---

## Exam Content Outline — 6 domains (weights total 100%)

| # | Domain | Weight |
|---|--------|:------:|
| 1 | Advanced Data Preparation and Transformation | **27%** |
| 2 | Reporting Tools | **10%** |
| 3 | Spatial Analytics Basics | **10%** |
| 4 | Data Sources | **15%** |
| 5 | Macros | **18%** |
| 6 | Analytical Applications and Productionizing | **20%** |

Priority order by weight: **D1 (27) → D6 (20) → D5 (18) → D4 (15) → D2 (10) = D3 (10)**.

---

## Domain 1 — Advanced Data Preparation and Transformation · 27%

*Objectives, verbatim from the guide:*

1. Correctly **configure the Multi-Row Formula tool** and identify output from expressions.
2. Configure the **Multi-Row Formula tool for values for rows that do not exist**.
3. Configure the **Multi-Field Formula tool** for overwriting fields and changing data types.
4. Configure the **Formula tool** to use the following functions:
   `DateTime()` · `ToNumber()` · `Round()` · `REGEX_Match()` · `REGEX_Replace()` · `GetWord()` ·
   `FindString()` · `Trim()`.
5. Configure the **Filter tool** using compound **AND/OR** expressions.
6. **DateTime functions across multiple tools.**
7. Use the **Generate Rows tool**.
8. **Parse and join data** — configure the **Find Replace tool** to replace multiple items;
   configure the **Join Multiple tool** and the **RegEx tool**; **differentiate between the parse
   and match methods**; **identify the regular expression that results in a given output**.
9. **Investigate data** — identify, configure, and interpret the output of: **Association
   Analysis**, **Field Summary**, **Frequency Table**, **Pearson Correlation**, **Spearman
   Correlation**; **differentiate between Pearson and Spearman Correlation tools**.

---

## Domain 2 — Reporting Tools · 10%

1. **Configure tables and charts.**
2. Configure the **Layout**, **Render**, and **Email** tools.

*[SUPPORTING] tools you will touch:* Report Text, Report Map, Report Header/Footer, Visual Layout.
Not named in the guide but they feed Table/Chart → Layout → Render.

---

## Domain 3 — Spatial Analytics Basics · 10%

1. **Create spatial objects using the Create Points tool** and identify the **spatial functionality
   within the Formula and Summarize tools**.
2. **Combine spatial objects** — identify spatial objects created from **intersections, splits, and
   buffers** of two existing spatial objects; interpret the results of the interaction between
   **target and universe objects** from the **Spatial Match tool**; **configure the Trade Area
   tool**.
3. **Calculate distances** — configure the **Distance tool**; configure the **Find Nearest tool**;
   explain the functionality of the **Target and Universe input anchors**.

*[SUPPORTING]:* Spatial Process tool, Poly-Build, Poly-Split, Spatial Info — these are the tools
that actually perform intersect / split / buffer / combine operations.

---

## Domain 4 — Data Sources · 15%

1. Recognize advanced methods to **connect and configure to external data sources** — tools within
   the **Connectors ribbon**, the **Download tool**, the **In-Database tool**, the **Data
   Connection Manager (DCM)**.
2. Recognize advanced methods to **input files** — the **Directory tool**; **Input/Output Data
   tools**; the **Dynamic Input tool**; the **Dynamic Rename tool**; **Blob Convert, Blob Input,
   and Blob Output tools**.

---

## Domain 5 — Macros · 18%

1. Determine the appropriate **use case and functionality of batch, iterative, and standard
   macros**.
2. **Configure macros** — **Macro Input/Output tools**; recognize **Show Field Map** functionality;
   use the **Interface Designer window**; identify **debug functionality for a macro interface**;
   set the **macro repository or location in User Settings**.

*[SUPPORTING]:* Control Parameter tool (creates the batch macro), Action tool (updates config
inside batch/iterative macros).

---

## Domain 6 — Analytical Applications and Productionizing · 20%

1. Configure the **Action tool**.
2. Determine the **boundaries of the Condition tool**.
3. Identify functionality of the **Error Message tool** and the resulting records with an error.
4. Identify different capabilities and functionality of the following **User Interface tools**:
   **Check Box · Drop Down · File/Folder Browse · List Box · Numeric Up Down · Radio Button ·
   Text Box · DCM Connection**.
5. **Design analytical applications** — configure **Interface tools**, use **Interface Designer**,
   illustrate **reasons for using an application**.
6. Recognize the functionality of the following features: **Block Until Done tool · Email Event ·
   Run Command tool · Dynamic Select tool**.

---

## Suggested Learning Resources (named in the guide)

### Alteryx Academy — Self-Paced Learning Pathways
- **Preparing and Blending Data** — clean, combine, and prepare data from multiple sources.
- **Parsing Data** — parse data into useful values using patterns in an input's text or structure.
- **Advanced Data Preparation** — enrich and standardize data with advanced tools.
- **Getting Started with Macros** — build your own tools and share them.
- **From Data Prep to Insightful Reports** — turn data into clear visual stories.

### Alteryx Academy — Instructor-Led Courses
- **Alteryx Designer Core Certification Exam Preparation**.
- **Alteryx Designer Advanced Certification Exam Preparation** — what to expect, tools covered,
  question types, tips & tricks, sample questions.

### Alteryx Community
- **Weekly Challenges** — solve the challenge and share your solution.

### Alteryx Product Resources
- Alteryx One Platform — Documentation.
- Alteryx Designer — Documentation.
- Alteryx Designer Cloud — Documentation.

---

## Official atomic-topic count → **77** (used by the Coverage Audit)

| Domain | Weight | Atomic topics tracked |
|--------|:------:|:---------------------:|
| D1 Advanced Data Prep & Transformation | 27% | 25 |
| D2 Reporting Tools | 10% | 5 |
| D3 Spatial Analytics Basics | 10% | 9 |
| D4 Data Sources | 15% | 11 |
| D5 Macros | 18% | 9 |
| D6 Analytical Apps & Productionizing | 20% | 18 |
| **Total** | **100%** | **77** |

See `11-Official-Syllabus-Coverage-Audit.md` for the item-by-item mapping to study days.
