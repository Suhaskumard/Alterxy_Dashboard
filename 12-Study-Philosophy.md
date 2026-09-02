# 🧠 Study Philosophy

## This is not a passive plan

A topic is **not "mastered" because you watched a video or read a doc.** For every important topic,
run the full loop and only then tick it:

```
        LEARN  ──────────────►  read the concept, know what problem the tool solves
          │
   READ DOCUMENTATION  ──────►  help.alteryx.com "<Tool> Tool" + Tool Mastery article
          │
 WATCH / COMPLETE ACADEMY  ──►  the relevant Learning Pathway section / Interactive Lesson
          │
     BUILD WORKFLOW  ────────►  make it work on sample data in Designer
          │
    MODIFY WORKFLOW  ────────►  change one config option; form a hypothesis about the effect
          │
     PREDICT OUTPUT  ────────►  WRITE DOWN the expected result BEFORE running
          │
       RUN WORKFLOW  ────────►  compare to your prediction; explain every difference
          │
     SOLVE CHALLENGE  ───────►  a Weekly Challenge that uses this tool (see 06-...)
          │
     TEST YOURSELF  ─────────►  Practice Questions for this domain; recall it cold next day
          │
    RECORD MISTAKES  ───────►  in Practice Questions DB with a Mistake Type
          │
   UPDATE CONFIDENCE  ──────►  honest 1–5 on the Master Topic Tracker row
          │
      MARK COMPLETE  ───────►  only when Theory+Hands-on+Practice done AND Confidence ≥ 4
                               AND you can predict the output without running it
```

**The single most important step is PREDICT OUTPUT.** The Advanced exam is full of "given this
input and this configuration, what is the output?" questions (and 4-point practical items). If you
can't predict it on paper, you don't know the tool yet.

### Completion rule (matches the Master Topic Tracker checkboxes)

| Checkbox | Means |
|----------|-------|
| `Theory Complete` | I read the doc + Academy section and can explain what the tool does and why |
| `Hands-on Complete` | I built and modified a workflow with it on real data |
| `Practice Complete` | I answered questions on it and got them right after review |
| `Revision Complete` | I recalled it cold at least one day later |
| `Challenge Complete` | (where applicable) I finished the linked Weekly Challenge |
| `Status = 🟢 Completed` | all of the above **and** `Confidence ≥ 4` **and** I can predict its output |

If you can't predict the output, set `Status = 🔵 Needs Revision` — never `🟢`.

---

## Keep the four tiers separate (never blur them)

The official Exam Prep Guide is the **only** authority on what's in scope. Everything in this system
is tagged into exactly one tier:

### 1. OFFICIAL EXAM REQUIREMENTS
Written in the guide's Content Outline. **77 atomic topics.** These are the *only* things the exam
can test. `Type = Official` in the Master Topic Tracker; all of `05-Domain-Checklists.md`; the
Coverage Audit. **Nothing else is ever labelled "official."**

### 2. PREREQUISITE KNOWLEDGE
Core-level skills the Advanced topics assume (Input/Output/Select/Filter/Formula/Join/Union/
Summarize, data types, expressions). **Not on the exam outline.** `Type = Prerequisite`;
`04-Prerequisite-Basics-Check.md`. Purpose: find gaps that would block understanding — not to
re-learn Core.

### 3. RECOMMENDED PRACTICE
Extra drills and Weekly Challenges I added to reinforce official topics. Not named in the guide.
`Type = Recommended`; the `(verify on Index)` rows in the Weekly Challenge Tracker; the "recommended
challenge" column in the Resource map. Do them if time allows and they target a weak area.

### 4. OPTIONAL ADVANCED PRACTICE
Deeper exploration beyond exam scope (e.g. spatial drive-time optimisation, complex In-DB SQL,
API pagination patterns). `Type = Optional`. Only after everything above is green.

**Rule of thumb:** if you're short on time, do **all of tier 1**, close the gaps in **tier 2**, and
treat **tiers 3–4 as optional**. Never spend tier-1 time on tier-3/4 work.

---

## Passing bar vs personal target

| | Value | Source |
|---|---|---|
| **Official passing score** | **73%** | the Exam Prep Guide — this is the real minimum |
| **Personal preparation target** | **80–85%** | *mine, not official* — the buffer I want in mocks before booking |

Don't book the real exam until practice/mock scores are **consistently ≥ 80%** and no single domain
is below ~70%.

---

## Time discipline (2 h/day)

- Timebox: 40 theory / 60 hands-on / 20 recall (hard days: 30 / 75 / 15).
- If theory overruns, **stop and build anyway** — hands-on is where retention happens.
- End every session by updating: `Actual Hours`, `Completed Tasks`, `Main Weakness`, `Next Action`,
  day `Status`, and Confidence on each topic touched.
- Start every session in the **TODAY'S STUDY** view; end it glancing at **WHAT IS PENDING?** and
  **WEAK AREAS**.
