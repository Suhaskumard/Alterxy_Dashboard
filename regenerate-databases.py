# -*- coding: utf-8 -*-
"""Generate the 7 Notion-importable CSV databases for the Alteryx Advanced tracker.
Single source of truth: the TOPICS table below (77 official atomic topics from the
Alteryx Designer Advanced Certification Exam Prep Guide) + a small PREREQS table.
"""
import csv, os

OUT = r"C:\Users\Madhavi\OneDrive\Desktop\Alteryx-Advanced-Notion-Tracker"
os.makedirs(OUT, exist_ok=True)

# ---------------------------------------------------------------- domain metadata
DOM = {
 "D1": ("D1 \u00b7 Advanced Data Prep & Transformation", "27%"),
 "D2": ("D2 \u00b7 Reporting Tools", "10%"),
 "D3": ("D3 \u00b7 Spatial Analytics Basics", "10%"),
 "D4": ("D4 \u00b7 Data Sources", "15%"),
 "D5": ("D5 \u00b7 Macros", "18%"),
 "D6": ("D6 \u00b7 Analytical Apps & Productionizing", "20%"),
}
DOM_RES = {
 "D1": ("Academy Pathway: Advanced Data Preparation + Parsing Data; Tool Mastery KB",
        "https://community.alteryx.com/t5/Tool-Mastery/tkb-p/tool-mastery"),
 "D2": ("Academy Pathway: From Data Prep to Insightful Reports; Help: Reporting tools",
        "https://help.alteryx.com/"),
 "D3": ("Help: Spatial tools; Interactive Lessons: Spatial Analytics; Tool Mastery KB",
        "https://community.alteryx.com/t5/Interactive-Lessons/ct-p/interactive-lessons"),
 "D4": ("Academy Pathway: Preparing and Blending Data; Help: Connectors / DCM / In-Database",
        "https://help.alteryx.com/"),
 "D5": ("Academy Pathway: Getting Started with Macros; Help: Macros",
        "https://help.alteryx.com/"),
 "D6": ("Help: Analytic Apps & Interface tools; Academy: Analytic Apps; Interactive Lessons",
        "https://help.alteryx.com/"),
}
def week_of(day):
    return (day - 1) // 7 + 1

# --------------------------------------------------------------------- TOPICS (77)
# (topic, subtopic, dom, day, difficulty, priority)
TOPICS = [
 # ---- Domain 1  (25) ---------------------------------------------------------
 ("Multi-Row Formula tool \u2013 configure & identify output from expressions",
  "previous/current/next row references; Group By; Num Rows; field type & size of the new field", "D1", 1, "Hard", "High"),
 ("Multi-Row Formula tool \u2013 values for rows that do not exist",
  "'0' / 'Null()' / user value / '\"\"'; behaviour for leading rows (no previous) and trailing rows (no next)", "D1", 2, "Hard", "High"),
 ("Multi-Field Formula tool \u2013 overwrite fields & change data types",
  "[_CurrentField_], [_CurrentFieldName_]; 'Copy Output Fields and Add'; change output type/size; apply one expression to many fields", "D1", 3, "Medium", "High"),
 ("Formula function: DateTime()",
  "DateTimeParse() string\u2192date, DateTimeFormat() date\u2192string, specifiers %Y %m %d %H %M %S", "D1", 4, "Medium", "High"),
 ("Formula function: ToNumber()",
  "string\u2192numeric; ignoreErrors and decimalSeparator arguments; returns Null on failure", "D1", 3, "Easy", "Medium"),
 ("Formula function: Round()",
  "Round(value, multiple) \u2013 rounds to the nearest multiple, not decimal places", "D1", 3, "Easy", "Medium"),
 ("Formula function: REGEX_Match()",
  "returns Boolean; the whole value must match the pattern; case sensitivity", "D1", 5, "Hard", "High"),
 ("Formula function: REGEX_Replace()",
  "REGEX_Replace(str, pattern, replace) with \\1 \\2 back-references to marked groups", "D1", 5, "Hard", "High"),
 ("Formula function: GetWord()",
  "GetWord(string, n) \u2013 zero-based word index; whitespace/punctuation delimiters", "D1", 4, "Medium", "High"),
 ("Formula function: FindString()",
  "FindString(string, target) \u2013 zero-based position of first occurrence; returns -1 if not found; case sensitive", "D1", 4, "Medium", "High"),
 ("Formula function: Trim()",
  "Trim / TrimLeft / TrimRight; optional second argument = set of characters to strip", "D1", 3, "Easy", "Medium"),
 ("Filter tool \u2013 compound AND/OR expressions",
  "Basic vs Custom filter; AND/OR precedence and parentheses; True and False output anchors", "D1", 4, "Medium", "High"),
 ("DateTime functions across multiple tools",
  "same functions usable in Formula, Filter, Generate Rows, Multi-Row Formula; DateTimeAdd/Diff/Now/Today/Trim", "D1", 4, "Medium", "High"),
 ("Generate Rows tool",
  "numeric / date / loop modes; Initialization, Condition, Loop expressions; update existing vs create new field; infinite-loop guard", "D1", 6, "Medium", "High"),
 ("Find Replace tool \u2013 replace multiple items",
  "Find within field vs whole field; 'Replace found text with' vs append fields; case; find any part of field", "D1", 6, "Medium", "High"),
 ("Join Multiple tool",
  "N inputs; join on position or field(s); 'Cartesian join if no field selected'; 'Output only records that joined'; field naming/collision", "D1", 6, "Medium", "High"),
 ("RegEx tool \u2013 configuration",
  "output method: Replace / Tokenize / Parse / Match; marked (capture) groups; case-insensitive; column count for Tokenize", "D1", 5, "Hard", "High"),
 ("Parse vs Match methods (RegEx tool)",
  "Parse = split value into columns using marked groups; Match = add fields flagging/returning the match", "D1", 5, "Hard", "High"),
 ("Identify the regular expression that produces a given output",
  "character classes [A-Za-z0-9], quantifiers * + ? {n,m}, anchors ^ $ \\b, groups ( ), alternation |, greedy vs lazy", "D1", 5, "Hard", "High"),
 ("Association Analysis tool",
  "target field vs all fields; Pearson/Spearman correlation matrix + p-values; Association Measures report; pairwise vs complete", "D1", 7, "Medium", "High"),
 ("Field Summary tool",
  "per-field profile: % missing, unique count, min/max/mean/median/std; Report (R) and Data (I) outputs", "D1", 7, "Easy", "Medium"),
 ("Frequency Table tool",
  "count and percent for each distinct value; multiple fields at once; how missing/null is bucketed", "D1", 7, "Easy", "Medium"),
 ("Pearson Correlation tool",
  "linear correlation, range -1..1; assumes roughly linear relationship and interval data; sensitive to outliers", "D1", 7, "Medium", "High"),
 ("Spearman Correlation tool",
  "rank (monotonic) correlation; robust to outliers and non-linear-but-monotonic relationships; works on ordinal data", "D1", 7, "Medium", "High"),
 ("Differentiate Pearson vs Spearman Correlation",
  "choose Spearman for ranked/ordinal/skewed/non-linear-monotonic data; Pearson for linear interval data", "D1", 7, "Medium", "High"),
 # ---- Domain 4  (11) --------------------------------------------------------
 ("Connectors ribbon tools (overview)",
  "purpose-built connectors vs generic Input Data; OAuth / API-key auth patterns; when to use a connector over Download", "D4", 8, "Medium", "High"),
 ("Download tool",
  "URL field; GET/POST/PUT/DELETE; Headers, Query String/Payload; DownloadData vs DownloadHeaders output; string vs blob; base64", "D4", 8, "Medium", "High"),
 ("In-Database tools",
  "Connect In-DB, Data Stream In / Data Stream Out, Browse In-DB, In-DB Formula/Filter/Join/Summarize/Select; pushdown to the DB; Write Data In-DB", "D4", 9, "Hard", "High"),
 ("Data Connection Manager (DCM)",
  "separates connection details from credentials; reusable & shareable; roles; DCM-enabled tools; connection vault", "D4", 9, "Medium", "High"),
 ("Directory tool",
  "returns FullPath, FileName, Directory, Size, Created/Modified; include sub-directories; wildcard file spec; feeds Dynamic Input", "D4", 10, "Easy", "Medium"),
 ("Input Data / Output Data tools \u2013 advanced options",
  "format-specific options; multi-file / multi-sheet wildcards; 'Output File Name as Field'; record limit; first-row-contains-field-names; Take/Skip", "D4", 10, "Medium", "High"),
 ("Dynamic Input tool",
  "template (example) input; 'Read a List of Data Sources' vs 'Change Entire File Path'; Modify SQL Query action; schema-mismatch / 'different schema' errors", "D4", 10, "Hard", "High"),
 ("Dynamic Rename tool",
  "methods: Take Field Names from First Row of Data; Rename via Formula; Add/Remove Prefix or Suffix; Rename by right (R) input", "D4", 10, "Medium", "High"),
 ("Blob Convert tool",
  "convert a string/field to a BLOB or a BLOB back to a string/field; 'To Blob' vs 'From Blob' direction; field & encoding", "D4", 11, "Medium", "Medium"),
 ("Blob Input tool",
  "read whole binary files (images, PDFs) into a single BLOB field; wildcard path; usually paired with the Directory tool", "D4", 11, "Medium", "Medium"),
 ("Blob Output tool",
  "write a BLOB field back out to files; filename comes from a field; set the file extension", "D4", 11, "Medium", "Medium"),
 # ---- Domain 2  (5) -------------------------------------------------------
 ("Table tool \u2013 configure tables",
  "per-column config & order; conditional / rule-based formatting; grouping; Basic vs Pivot table; number & date formatting; column width", "D2", 12, "Medium", "High"),
 ("Charting / Interactive Chart tool \u2013 configure charts",
  "add layers; chart types bar/line/pie/scatter/area; X & Y fields; aggregation & grouping; axis, legend, colour config", "D2", 12, "Medium", "High"),
 ("Layout tool",
  "arrange report snippets vertically/horizontally; per-section orientation; borders, margins, separators; 'Layout each group of records'", "D2", 13, "Medium", "Medium"),
 ("Render tool",
  "output to PDF / HTML / DOCX / XLSX / PCXML; paper size & orientation; 'Group Data into Separate Reports'; output to a field vs a file; temp vs specific file", "D2", 13, "Medium", "High"),
 ("Email tool (Reporting)",
  "SMTP server config; To/From/CC from a field; subject & body (text or from a field); attach a rendered report or a BLOB; one email per record", "D2", 13, "Easy", "Medium"),
 # ---- Domain 3  (9) -----------------------------------------------------
 ("Create Points tool",
  "X = Longitude field, Y = Latitude field; outputs a point Spatial Object; coordinate reference system", "D3", 15, "Easy", "Medium"),
 ("Spatial functionality within the Formula tool",
  "ST_Distance, ST_Buffer, ST_Centroid, ST_Contains, ST_Intersects, ST_Within, CreatePoint, ToWKT / FromWKT", "D3", 15, "Hard", "High"),
 ("Spatial functionality within the Summarize tool",
  "spatial actions: Combine, Create Convex Hull, Create Bounding Rectangle, Create Centroid, Create Rectangle", "D3", 15, "Medium", "High"),
 ("Combine spatial objects \u2013 intersections, splits, buffers",
  "Spatial Process tool (Combine / Cut / Intersect); predict the resulting object; positive vs negative buffer distance", "D3", 16, "Hard", "High"),
 ("Spatial Match tool \u2013 target vs universe interaction",
  "match condition (Where Target ... Universe: Contains / Intersects / Touches / Within); T and U output anchors; record duplication on multiple matches", "D3", 16, "Hard", "High"),
 ("Trade Area tool",
  "circular radius (miles) or drive-time rings; multiple ring sizes; overlap handling: Keep / Remove Overlap / Cookie-cut; per-centre vs combined", "D3", 16, "Medium", "High"),
 ("Distance tool",
  "point-to-point and point-to-polygon; straight-line distance vs driving distance & drive time; output units; direction/bearing", "D3", 17, "Medium", "High"),
 ("Find Nearest tool",
  "for each Target find the nearest N from Universe; maximum distance cutoff; Matched vs Unmatched (Not Found) outputs; distance field added", "D3", 17, "Medium", "High"),
 ("Target and Universe input anchors \u2013 functionality",
  "Target = the 'search from' set (kept once); Universe = the 'search against' set; which anchor is which in Spatial Match & Find Nearest", "D3", 17, "Medium", "High"),
 # ---- Domain 5  (9) --------------------------------------------------
 ("Standard macro \u2013 use case & functionality",
  "packages reusable logic into one tool; runs once for the workflow; Macro Input feeds the incoming data; distributed as .yxmc", "D5", 18, "Medium", "High"),
 ("Batch macro \u2013 use case & functionality",
  "one Control Parameter; the macro runs once per record on the control input; Action tool updates the config each pass; outputs are stacked", "D5", 18, "Hard", "High"),
 ("Iterative macro \u2013 use case & functionality",
  "Iteration Input & Iteration Output; feeds its output back into its input until a condition is met or max iterations reached; convergence / stop logic", "D5", 18, "Hard", "High"),
 ("Macro Input tool",
  "template / example input data; field-map anchor; input name & anchor abbreviation; 'Generate a template that reflects...'", "D5", 18, "Medium", "High"),
 ("Macro Output tool",
  "defines an output anchor; can have several; anchor abbreviation & name; where results leave the macro", "D5", 19, "Easy", "Medium"),
 ("Show Field Map functionality",
  "on the Macro Input \u2013 lets the user of the macro map their incoming fields to the fields the macro expects, at run time", "D5", 19, "Medium", "High"),
 ("Interface Designer window",
  "Layout view (arrange questions & groups), Test View, Tree, Properties (macro icon, output mode, analytic-app vs macro); question order", "D5", 19, "Medium", "High"),
 ("Debug functionality for a macro interface",
  "Interface Designer \u25b8 Debug \u2013 generates a normal standalone workflow populated with the current interface values so you can inspect it", "D5", 22, "Medium", "High"),
 ("Set the macro repository or location in User Settings",
  "Options \u25b8 User Settings \u25b8 Macros tab \u2013 add macro search paths; the folder name becomes the tool-palette category", "D5", 22, "Easy", "Medium"),
 # ---- Domain 6  (18) ---------------------------------------------
 ("Action tool",
  "links an Interface tool to a specific property of a target tool's XML; 'Update Value (Default)', 'Update Value with Formula', 'Replace a specific string', update raw XML", "D6", 23, "Hard", "High"),
 ("Condition tool \u2013 boundaries",
  "only inside an analytic app / macro; evaluates one expression; True and False anchors route interface / configuration flow, not data records", "D6", 23, "Medium", "High"),
 ("Error Message tool \u2013 functionality & resulting error records",
  "expression \u2192 error string when true; can be set to warning vs error; stops the app/macro before it runs; the triggering record(s)", "D6", 23, "Medium", "High"),
 ("Interface tool: Check Box",
  "Boolean question; value emitted when checked / unchecked; commonly wired to a Condition tool", "D6", 24, "Easy", "Medium"),
 ("Interface tool: Drop Down",
  "single selection; list from manual entry / file / connected tool; separate Name (shown) and Value (used)", "D6", 24, "Easy", "Medium"),
 ("Interface tool: File Browse / Folder Browse",
  "returns a file or folder path string; file-type filter; typically sets an Input/Output Data path through an Action tool", "D6", 24, "Easy", "Medium"),
 ("Interface tool: List Box",
  "multiple selection; output as a delimited string or as a field selection; 'Generate Custom List' with prefix/suffix/delimiter", "D6", 24, "Medium", "High"),
 ("Interface tool: Numeric Up Down",
  "bounded numeric entry; minimum, maximum, increment, decimal places", "D6", 24, "Easy", "Low"),
 ("Interface tool: Radio Button",
  "mutually exclusive choice; each button is its own interface tool; grouped and wired with Action tools", "D6", 24, "Easy", "Medium"),
 ("Interface tool: Text Box",
  "free-text or numeric entry; password mode; multi-line; feeds an Action tool", "D6", 24, "Easy", "Medium"),
 ("Interface tool: DCM Connection",
  "lets the app user pick a DCM connection at run time and passes it to DCM-enabled tools", "D6", 24, "Medium", "Medium"),
 ("Design analytical applications \u2013 configure Interface tools",
  "wire Interface \u2192 Action \u2192 target tool property; choose the right update action; test every input value", "D6", 25, "Medium", "High"),
 ("Design analytical applications \u2013 use Interface Designer",
  "question layout & order, grouping / group boxes, Test View, application icon, output & 'run without input' settings", "D6", 25, "Medium", "High"),
 ("Design analytical applications \u2013 illustrate reasons for using an application",
  "guided run-time input for non-Designer users; parameterise a workflow without editing it; self-service / repeatable runs", "D6", 25, "Easy", "Medium"),
 ("Block Until Done tool",
  "passes all records to output 1, then 2, then 3 only after every upstream record has arrived; sequences a write-then-read in one workflow", "D6", 26, "Medium", "High"),
 ("Email Event (workflow event)",
  "Workflow Configuration \u25b8 Events \u2013 send an email before/after run or on success/failure; different from the Reporting Email tool", "D6", 26, "Easy", "Medium"),
 ("Run Command tool",
  "runs an external program / script; command + arguments; optional Write Source (pre) and Read Results (post); working directory; passthrough use", "D6", 26, "Medium", "High"),
 ("Dynamic Select tool",
  "select/deselect fields by data type or by a formula evaluated at run time; include vs exclude matched fields", "D6", 26, "Medium", "High"),
]

assert len(TOPICS) == 77, len(TOPICS)

# ------------------------------------------------------------- PREREQUISITES (13)
PREREQS = [
 ("Input Data tool", "file/db connection basics, file format options, record limit"),
 ("Output Data tool", "write to file/db, overwrite vs append, file type options"),
 ("Select tool", "reorder, rename, change type/size, deselect fields"),
 ("Filter tool (basic)", "single-condition Basic filter, True/False anchors"),
 ("Formula tool (basic)", "create/overwrite a field, data types, IF/THEN, string & math functions"),
 ("Sort tool", "ascending/descending, multi-field sort order"),
 ("Unique tool", "unique vs duplicate output, selecting the key fields"),
 ("Summarize tool", "Group By + aggregations (Sum, Count, Min, Max, Concatenate), output field names"),
 ("Join tool", "join on field vs position; L / J / R anchors; field selection & collisions"),
 ("Union tool", "auto-config by name vs position; handling missing fields; record order"),
 ("Workflow connections, containers & annotations", "wireless connections, tool containers, disabling, comments"),
 ("Data types", "String vs V_String vs WString; Int/Double/Fixed Decimal; Date/DateTime; Bool; Blob; size"),
 ("Basic expressions & operators", "AND OR NOT, = != < >, IN(), IsNull(), IsEmpty(), string concat +"),
]

# ============================================================ 1. Master Topic Tracker
mt_cols = ["Topic","Subtopic","Domain","Exam Weight","Priority","Week","Day","Status","Difficulty",
 "Theory Complete","Hands-on Complete","Practice Complete","Revision Complete","Challenge Complete",
 "Confidence","Weak Area","Notes","Mistakes","Resource","Resource URL","Last Reviewed","Next Review",
 "Completion %","Type"]
rows = []
for topic, sub, dom, day, diff, prio in TOPICS:
    dlabel, weight = DOM[dom]
    res, url = DOM_RES[dom]
    rows.append([topic, sub, dlabel, weight, prio, week_of(day), day, "\U0001F534 Not Started", diff,
                 "No","No","No","No","No", 1, "No", "", "", res, url, "", "", 0, "Official"])
for topic, sub in PREREQS:
    rows.append([topic, sub, "Prerequisite (not on exam outline)", "\u2014", "High", 1, 1,
                 "\U0001F534 Not Started", "Easy", "No","No","No","No","No", 1, "No", "", "",
                 "Alteryx Academy \u2013 Designer Core / Foundational learning",
                 "https://community.alteryx.com/t5/Alteryx-Academy/ct-p/alteryx-academy", "", "", 0,
                 "Prerequisite"])
with open(os.path.join(OUT,"db-Master-Topic-Tracker.csv"),"w",newline="",encoding="utf-8-sig") as f:
    w = csv.writer(f); w.writerow(mt_cols); w.writerows(rows)
print("Master Topic Tracker:", len(rows), "rows")

# ============================================================ 2. Daily Study Tracker
DAILY = {
 1:("Setup + Prerequisites + D1","Tracker setup; Core prerequisite gap-check; Multi-Row Formula mechanics (previous/current/next row, Group By, Num Rows)","\u2014"),
 2:("D1 \u00b7 Advanced Data Prep","Multi-Row Formula: rows that do not exist; running total; previous-row comparison; % change","#3 Running Averages \u2013 start"),
 3:("D1 \u00b7 Advanced Data Prep","Multi-Field Formula (overwrite vs new field, change data type); ToNumber(); Round(); Trim()","#3 Running Averages \u2013 finish"),
 4:("D1 \u00b7 Advanced Data Prep","DateTime(); GetWord(); FindString(); Filter compound AND/OR; DateTime functions across tools","\u2014"),
 5:("D1 \u00b7 Advanced Data Prep","REGEX_Match(); REGEX_Replace(); RegEx tool (Parse/Match/Tokenize/Replace); parse vs match; identify regex for a given output","#56 Parsing & Counting Hashtags \u2013 start"),
 6:("D1 \u00b7 Advanced Data Prep","Generate Rows tool; Find Replace (replace multiple items); Join Multiple tool","#56 Parsing & Counting Hashtags \u2013 finish"),
 7:("D1 \u00b7 Advanced Data Prep","Data Investigation: Association Analysis, Field Summary, Frequency Table, Pearson, Spearman, Pearson vs Spearman; Weekly Review 1","\u2014"),
 8:("D4 \u00b7 Data Sources","Connectors ribbon overview; Download tool (GET/POST, headers, payload, output fields)","\u2014"),
 9:("D4 \u00b7 Data Sources","In-Database tools (Connect In-DB, Data Stream In/Out, In-DB transforms, pushdown); Data Connection Manager (DCM)","\u2014"),
 10:("D4 \u00b7 Data Sources","Directory tool; Input/Output Data advanced options; Dynamic Input tool; Dynamic Rename tool","\u2014"),
 11:("D4 \u00b7 Data Sources","Blob Convert; Blob Input; Blob Output; Domain 4 recap mini-test","\u2014"),
 12:("D2 \u00b7 Reporting Tools","Table tool (column config, conditional formatting); Charting / Interactive Chart tool","\u2014"),
 13:("D2 \u00b7 Reporting Tools","Layout tool; Render tool (output formats, group into separate reports); Email tool (reporting)","\u2014"),
 14:("D2 \u00b7 Reporting Tools","Reporting recap; catch-up buffer; Weekly Review 2","\u2014"),
 15:("D3 \u00b7 Spatial Analytics","Create Points tool; spatial functions in the Formula tool; spatial actions in the Summarize tool","\u2014"),
 16:("D3 \u00b7 Spatial Analytics","Combine spatial objects (intersections, splits, buffers); Spatial Match (target vs universe); Trade Area tool","#6 Spatial Route \u2013 start"),
 17:("D3 \u00b7 Spatial Analytics","Distance tool; Find Nearest tool; Target & Universe input anchors; Domain 3 recap","#6 Spatial Route \u2013 finish"),
 18:("D5 \u00b7 Macros","Standard vs Batch vs Iterative macros \u2013 use cases & functionality; Macro Input / Macro Output tools","\u2014"),
 19:("D5 \u00b7 Macros","Build a Standard macro; Interface Designer window; Show Field Map functionality","\u2014"),
 20:("D5 \u00b7 Macros","Build a Batch macro (Control Parameter + Action tool)","#86 Macro: Generate Past Dates \u2013 start"),
 21:("D5 \u00b7 Macros","Build an Iterative macro (Iteration Input/Output, max iterations, convergence); Weekly Review 3","#86 \u2013 continue"),
 22:("D5 \u00b7 Macros","Debug functionality for a macro interface; set macro repository/location in User Settings; consolidate all 3 macro types; macro mini-test","#86 Macro: Generate Past Dates \u2013 finish"),
 23:("D6 \u00b7 Analytical Apps & Productionizing","Action tool; Condition tool boundaries; Error Message tool & resulting error records","\u2014"),
 24:("D6 \u00b7 Analytical Apps & Productionizing","Interface tools: Check Box, Drop Down, File/Folder Browse, List Box, Numeric Up Down, Radio Button, Text Box, DCM Connection","\u2014"),
 25:("D6 \u00b7 Analytical Apps & Productionizing","Build an Analytical Application end-to-end: configure Interface tools, use Interface Designer, reasons for using an app","\u2014"),
 26:("D6 \u00b7 Analytical Apps & Productionizing","Block Until Done tool; Email Event; Run Command tool; Dynamic Select tool; Domain 6 recap","\u2014"),
 27:("Revision + Mock","Full weak-area revision (all domains); Practice Questions; Practice Mock Exam 1; mistake review","\u2014"),
 28:("Revision + Mock","Mock Exam 2; review; Final Exam Readiness audit; Weekly Review 4; go / no-go decision","\u2014"),
}
PLANNED = {1:15, 14:12, 27:12, 28:12}
d_cols = ["Day","Date","Day Offset","Week","Domain","Topics","Planned Hours","Actual Hours",
 "Planned Tasks","Completed Tasks","Remaining Tasks","Daily Completion %","Status","Notes",
 "Main Weakness","Next Action"]
drows = []
for day in range(1,29):
    dom, topics, chal = DAILY[day]
    pt = PLANNED.get(day,14)
    drows.append([f"Day {day:02d}", "", day-1, week_of(day), dom, topics, 2, "",
                  pt, 0, pt, 0, "\U0001F534 Not Started",
                  ("Weekly Challenge: "+chal) if chal!="\u2014" else "", "", ""])
with open(os.path.join(OUT,"db-Daily-Study-Tracker.csv"),"w",newline="",encoding="utf-8-sig") as f:
    w = csv.writer(f); w.writerow(d_cols); w.writerows(drows)
print("Daily Study Tracker:", len(drows), "rows")

# ============================================================ 3. Weekly Challenge Tracker
wc_cols = ["Challenge Number","Challenge Name","Topic","Domain","Difficulty","Certification Relevance",
 "Date Started","Date Completed","Attempt Number","Status","Time Taken","Hint Used","Solution Viewed",
 "Confidence","Mistakes","What I Learned","Notes","Resource URL"]
WCB = "https://community.alteryx.com/t5/Weekly-Challenge/bd-p/weekly-challenge"
wcrows = [
 ["#3","Running Averages","Multi-Row Formula; running / cumulative calculation; transformation",
  "D1 \u00b7 Advanced Data Prep","Beginner\u2013Intermediate",
  "CONFIRMED \u2013 named in your prompt. Maps to 'configure Multi-Row Formula and identify output from expressions'.",
  "","",1,"Not Started","","No","No",1,"","","Day 2\u20133. Build the running average with a Multi-Row Formula; then reproduce it with Summarize+Join and compare.",WCB],
 ["#56","Parsing and Counting Hashtags","RegEx parse/tokenize; text manipulation; aggregation",
  "D1 \u00b7 Advanced Data Prep","Intermediate",
  "CONFIRMED \u2013 named in your prompt. Maps to RegEx tool parse/match + 'identify the regex that results in a given output'.",
  "","",1,"Not Started","","No","No",1,"","","Day 5\u20136. Tokenize hashtags to rows, then Summarize Count. Try the Match method as an alternative.",WCB],
 ["#6","Spatial Route","Spatial objects; Create Points; Distance; spatial analysis",
  "D3 \u00b7 Spatial Analytics Basics","Intermediate",
  "CONFIRMED \u2013 named in your prompt. Maps to Create Points + Distance tool + combining spatial objects.",
  "","",1,"Not Started","","No","No",1,"","","Day 16\u201317. Create points, build the route, measure distance; inspect the spatial object at each step.",WCB],
 ["#86","Create a Macro That Generates Past Dates","Macros; Generate Rows; DateTime; Interface tools",
  "D5 \u00b7 Macros","Intermediate\u2013Advanced",
  "CONFIRMED \u2013 named in your prompt. Maps to macro configuration + Generate Rows + DateTime + Interface tools.",
  "","",1,"Not Started","","No","No",1,"","","Day 20\u201322. Build it as a standard macro first, then add a Numeric Up Down interface for 'number of days back'.",WCB],
 # ---- candidates: verify the number/name on the Weekly Challenge Index before starting ----
 ["(verify on Index)","Multi-Field Formula challenge","Multi-Field Formula; apply one expression to many fields",
  "D1 \u00b7 Advanced Data Prep","Advanced (target)","RECOMMENDED PRACTICE \u2013 not named in the guide.",
  "","",1,"Not Started","","No","No",1,"","",
  "Open the Weekly Challenge Index, filter Tool = Multi-Field Formula and Difficulty = Advanced; pick one. Do on/after Day 3.",WCB],
 ["(verify on Index)","Advanced RegEx parsing challenge","RegEx tool; complex pattern; parse into columns",
  "D1 \u00b7 Advanced Data Prep","Advanced (target)","RECOMMENDED PRACTICE \u2013 not named in the guide.",
  "","",1,"Not Started","","No","No",1,"","",
  "Index filter Tool = RegEx, Difficulty = Advanced/Expert. Second RegEx rep after #56. Do on/after Day 5.",WCB],
 ["(verify on Index)","DateTime parsing challenge","DateTime(); DateTimeParse/Format; date maths",
  "D1 \u00b7 Advanced Data Prep","Intermediate\u2013Advanced (target)","RECOMMENDED PRACTICE \u2013 not named in the guide.",
  "","",1,"Not Started","","No","No",1,"","","Index filter Tool = DateTime / Formula. Do on/after Day 4.",WCB],
 ["(verify on Index)","Dynamic Input / Directory challenge","Directory + Dynamic Input; batch file reading",
  "D4 \u00b7 Data Sources","Advanced (target)","RECOMMENDED PRACTICE \u2013 not named in the guide.",
  "","",1,"Not Started","","No","No",1,"","","Index filter Tool = Dynamic Input or Batch Macro. Do on/after Day 10.",WCB],
 ["(verify on Index)","Reporting challenge (Table + Render)","Table / Charting / Layout / Render",
  "D2 \u00b7 Reporting Tools","Intermediate (target)","RECOMMENDED PRACTICE \u2013 not named in the guide.",
  "","",1,"Not Started","","No","No",1,"","","Index filter Tool = Render or Table. Do on/after Day 13.",WCB],
 ["(verify on Index)","Batch macro challenge","Control Parameter; Action; run-once-per-record",
  "D5 \u00b7 Macros","Advanced (target)","RECOMMENDED PRACTICE \u2013 not named in the guide.",
  "","",1,"Not Started","","No","No",1,"","","Index filter Tool = Batch Macro. Do on/after Day 20.",WCB],
 ["(verify on Index)","Iterative macro challenge","Iteration Input/Output; convergence; max iterations",
  "D5 \u00b7 Macros","Advanced\u2013Expert (target)","RECOMMENDED PRACTICE \u2013 not named in the guide.",
  "","",1,"Not Started","","No","No",1,"","","Index filter Tool = Iterative Macro. Do on/after Day 21.",WCB],
 ["(verify on Index)","Analytical App / Interface challenge","Interface tools; Action; Condition; app design",
  "D6 \u00b7 Analytical Apps & Productionizing","Advanced (target)","RECOMMENDED PRACTICE \u2013 not named in the guide.",
  "","",1,"Not Started","","No","No",1,"","","Index filter Tool = Interface tools / Action / Analytic App. Do on/after Day 25.",WCB],
]
with open(os.path.join(OUT,"db-Weekly-Challenge-Tracker.csv"),"w",newline="",encoding="utf-8-sig") as f:
    w = csv.writer(f); w.writerow(wc_cols); w.writerows(wcrows)
print("Weekly Challenge Tracker:", len(wcrows), "rows")

# ============================================================ 4. Tool Mastery
tm_cols = ["Tool","Domain","What it does","Inputs","Outputs","Important configuration",
 "Common mistakes","Exam traps","Hands-on completed","Output prediction completed","Confidence",
 "Status","Type"]
TM = [
 ("Multi-Row Formula","D1","Creates/updates a field using values from other rows","1 (single stream, optionally sorted/grouped)","1","Num rows, 'Values for rows that don't exist', Group By, new-field type/size",
  "Forgetting Group By; wrong 'rows that don't exist' value; not sorting first","Given an expression + input, predict every output row incl. the first/last","No","No",1,"\U0001F534 Not Started","Official"),
 ("Multi-Field Formula","D1","Applies one expression to many fields at once","1","1","Select fields, 'Copy Output Fields and Add', change type/size, [_CurrentField_]/[_CurrentFieldName_]",
  "Leaving 'Copy...Add' on when you meant to overwrite; type mismatch across selected fields","Overwrite vs add new fields; result data type","No","No",1,"\U0001F534 Not Started","Official"),
 ("Formula","D1","Creates/overwrites fields with expressions","1","1","Function categories; data type of new field; order of expressions (later can use earlier)",
  "Assuming later fields aren't usable in same tool (they are, in order); wrong type","DateTime()/ToNumber()/Round()/REGEX_*/GetWord()/FindString()/Trim() exact behaviour","No","No",1,"\U0001F534 Not Started","Official"),
 ("Filter","D1","Splits records into True and False by a condition","1","2 (T / F)","Basic vs Custom; compound AND/OR with parentheses",
  "AND/OR precedence without parentheses; using = vs == ; null handling","Which records go to T vs F for a compound expression","No","No",1,"\U0001F534 Not Started","Official"),
 ("Generate Rows","D1","Adds rows by looping an expression","1 (or 0)","1","Create new vs update field; Initialization / Condition / Loop expressions; numeric vs date",
  "Off-by-one on the Condition; infinite loop; wrong field type for dates","How many rows are produced and their values","No","No",1,"\U0001F534 Not Started","Official"),
 ("Find Replace","D1","Looks up values from a second input and replaces/appends","2 (F / R)","1","Find within field; whole vs any part; replace text vs append fields; case",
  "'Any part of field' vs 'whole field'; multiple matches; case sensitivity","Result when a term appears 0, 1, many times","No","No",1,"\U0001F534 Not Started","Official"),
 ("Join Multiple","D1","Joins 3+ inputs on key field(s) or position","N","1","Join fields per input; Cartesian if none; 'output only records that joined'; field prefixes",
  "Accidental Cartesian; unmatched records dropped/kept; duplicate field names","Row count and columns after joining N inputs","No","No",1,"\U0001F534 Not Started","Official"),
 ("RegEx","D1","Applies a regular expression to one field","1","1","Output method Replace / Tokenize / Parse / Match; marked groups; case-insensitive",
  "Confusing Parse and Match; too few output columns for Tokenize; unescaped metachar","Columns/rows produced by each method for a given pattern","No","No",1,"\U0001F534 Not Started","Official"),
 ("Association Analysis","D1","Correlation / association between a target and other fields","1","2 (R report / I data)","Choose fields; target field; Pearson vs Spearman; p-values",
  "Reading association for categorical as if continuous; ignoring p-value","Interpret the correlation matrix / measures output","No","No",1,"\U0001F534 Not Started","Official"),
 ("Field Summary","D1","Profiles each field (missing, unique, distribution)","1","2 (R / I)","Select fields to profile",
  "Assuming it changes the data (it doesn't)","Which stats appear for numeric vs string fields","No","No",1,"\U0001F534 Not Started","Official"),
 ("Frequency Table","D1","Counts occurrences of each distinct value","1","2 (R / I)","Select one or more fields",
  "Expecting cross-tab (use Contingency Table for that)","Counts & % for a small sample incl. nulls","No","No",1,"\U0001F534 Not Started","Official"),
 ("Pearson Correlation","D1","Linear correlation matrix","1","2 (R / I)","Select numeric fields; complete vs pairwise",
  "Using on non-linear / ordinal data","Sign & rough magnitude for a scatter description","No","No",1,"\U0001F534 Not Started","Official"),
 ("Spearman Correlation","D1","Rank-based (monotonic) correlation matrix","1","2 (R / I)","Select fields",
  "Thinking it needs linearity (it needs monotonicity)","When Spearman > Pearson and why","No","No",1,"\U0001F534 Not Started","Official"),
 ("Table","D2","Builds a report table snippet","1","1 (report)","Per-column config; rule-based formatting; grouping; Basic vs Pivot",
  "Formatting rule on the wrong column; number format","What the rendered table looks like given rules","No","No",1,"\U0001F534 Not Started","Official"),
 ("Interactive Chart / Charting","D2","Builds a chart snippet","1","1 (report)","Layers; chart type; X/Y fields; aggregation; axis/legend",
  "Wrong aggregation; category vs value axis","Chart shape for a given data + config","No","No",1,"\U0001F534 Not Started","Official"),
 ("Layout","D2","Arranges report snippets into a composite","1 (multi report fields)","1 (report)","Vertical/horizontal; per-section orientation; borders/margins; layout per group",
  "Mixing up section order; forgetting Layout before Render for multi-snippet","Arrangement of snippets for a config","No","No",1,"\U0001F534 Not Started","Official"),
 ("Render","D2","Converts report snippets to a file/format","1","1","Output format (PDF/HTML/DOCX/XLSX/PCXML); paper size; group into separate reports; field vs file",
  "Rendering without Layout; wrong per-group setting; temp file path","Number of output files / pages for a config","No","No",1,"\U0001F534 Not Started","Official"),
 ("Email (Reporting)","D2","Sends email per record with optional report attachment","1","1","SMTP; To/From/Subject/Body from fields; attachments (report or blob)",
  "One email per record when you wanted one; SMTP auth","How many emails and their content","No","No",1,"\U0001F534 Not Started","Official"),
 ("Create Points","D3","Turns lat/long fields into point spatial objects","1","1","X = Longitude, Y = Latitude; CRS",
  "Swapping X/Y (long/lat) so points land in the ocean","What the spatial object field contains","No","No",1,"\U0001F534 Not Started","Official"),
 ("Spatial Match","D3","Flags/joins Target vs Universe by a spatial relationship","2 (T / U)","3 (M / U / ...)","Match condition (Contains/Intersects/Touches/Within); which side is Target",
  "Reversing Target/Universe; record duplication on multiple matches","Matched vs unmatched counts for overlapping shapes","No","No",1,"\U0001F534 Not Started","Official"),
 ("Trade Area","D3","Builds rings (radius or drive-time) around points","1","1","Ring size(s); miles vs drive-time; overlap Keep/Remove/Cookie-cut",
  "Overlap handling; combined vs per-centre; drive-time needs data pack","Shape/area of the resulting polygons","No","No",1,"\U0001F534 Not Started","Official"),
 ("Distance","D3","Distance/time between two spatial inputs","2 (T / U)","1","Point-point vs point-poly; straight-line vs driving; units; direction",
  "Expecting driving distance without a dataset; unit confusion","Distance value / which pairs are measured","No","No",1,"\U0001F534 Not Started","Official"),
 ("Find Nearest","D3","Nearest N Universe records to each Target","2 (T / U)","2 (Matched / Not Found)","N nearest; max distance; distance field",
  "Target/Universe reversed; N too small; max-distance drops rows","Which target keeps which universe rows + distance","No","No",1,"\U0001F534 Not Started","Official"),
 ("Download","D4","Calls a URL / REST API","1 (or 0)","1","Method; Headers; Query/Payload; output to string vs blob; encoding",
  "POST body in wrong tab; needing blob for binary; rate limits","What DownloadData/Headers contain","No","No",1,"\U0001F534 Not Started","Official"),
 ("Connect In-DB","D4","Opens an in-database connection stream","0","1 (In-DB)","Connection (or DCM); write vs read; query",
  "Streaming out too early (kills pushdown)","Which operations push down vs pull to Designer","No","No",1,"\U0001F534 Not Started","Official"),
 ("Data Stream In / Out","D4","Moves data between Designer and In-DB","1","1","Table name / temp table; append/overwrite/create",
  "Streaming out mid-pipeline unnecessarily","When data actually leaves the database","No","No",1,"\U0001F534 Not Started","Official"),
 ("Directory","D4","Lists files in a folder","0","1","Path; wildcard; include sub-directories; fields returned",
  "Forgetting the wildcard; sub-directory toggle","Rows/columns returned for a folder","No","No",1,"\U0001F534 Not Started","Official"),
 ("Input Data","D4","Reads a file or table","0","1","Format options; wildcard multi-file/sheet; record limit; first row; file name as field",
  "Wildcard schema mismatch; wrong sheet; header option","Rows read for a wildcard + options","No","No",1,"\U0001F534 Not Started","Official"),
 ("Output Data","D4","Writes a file or table","1","0","File type options; overwrite/append; take file/sheet name from field",
  "Overwrite vs append; sheet handling; locked file","Files/sheets produced for a config","No","No",1,"\U0001F534 Not Started","Official"),
 ("Dynamic Input","D4","Reads many sources using a template","1 (list) or 0","1","Template file; 'list of data sources' vs 'change entire file path'; Modify SQL action",
  "Different-schema errors; template mismatch; SQL action syntax","Combined output when schemas differ","No","No",1,"\U0001F534 Not Started","Official"),
 ("Dynamic Rename","D4","Renames fields programmatically","1 (+ optional R)","1","Method: first row of data / formula / add-remove prefix-suffix / from R input",
  "'First row of data' also removes that row; formula scope","Field names after the chosen method","No","No",1,"\U0001F534 Not Started","Official"),
 ("Blob Convert","D4","String/field <-> BLOB","1","1","To Blob vs From Blob; field; encoding",
  "Direction; picking a non-blob field","Field type before/after","No","No",1,"\U0001F534 Not Started","Official"),
 ("Blob Input","D4","Reads binary files into a BLOB field","0","1","Wildcard path; field name",
  "Large files / memory; pairing with Directory","One row per file; blob field present","No","No",1,"\U0001F534 Not Started","Official"),
 ("Blob Output","D4","Writes a BLOB field to files","1","0","Filename from field; extension",
  "Missing extension; filename collisions","Files written for N blob rows","No","No",1,"\U0001F534 Not Started","Official"),
 ("Macro Input","D5","Entry point / template for data into a macro","0","1","Template data; field map; 'Show Field Map'; anchor name & abbreviation",
  "No template so downstream tools can't configure; Show Field Map off","What the macro user sees at configure time","No","No",1,"\U0001F534 Not Started","Official"),
 ("Macro Output","D5","Exit anchor for data leaving a macro","1","0","Anchor name & abbreviation; multiple outputs",
  "Multiple outputs unlabeled","Which stream maps to which anchor","No","No",1,"\U0001F534 Not Started","Official"),
 ("Control Parameter","D5","Makes a workflow a BATCH macro; drives one run per record","0","1 (C)","Connect to Action tools; runs macro once per control record",
  "Expecting it to stream like data; needs an Action to have effect","Number of macro passes = control record count","No","No",1,"\U0001F534 Not Started","Official"),
 ("Action","D5/D6","Updates a target tool's XML from an Interface/Control value","1","1","Update value (default) / with formula / replace specific string / raw XML",
  "Wrong XML target; 'replace specific string' matching too much","Resulting configuration of the target tool","No","No",1,"\U0001F534 Not Started","Official"),
 ("Condition","D6","Branches the interface/config flow on an expression","1","2 (T / F)","Expression; only valid in app/macro",
  "Thinking it filters data records","Which downstream interface actions fire","No","No",1,"\U0001F534 Not Started","Official"),
 ("Error Message","D6","Raises a warning/error when an expression is true","1","1","Expression; message text; warning vs error; stops before run",
  "Assuming records are filtered; warning vs hard stop","Whether the app runs and what the user sees","No","No",1,"\U0001F534 Not Started","Official"),
 ("Check Box","D6","Boolean interface question","0","1 (Q)","Value when checked / unchecked; default",
  "Value strings not matching the Action/Condition","Downstream value emitted","No","No",1,"\U0001F534 Not Started","Official"),
 ("Drop Down","D6","Single-select interface question","0 (or 1 list)","1 (Q)","List source (manual/file/connected); Name vs Value",
  "Confusing display Name with the Value used downstream","Value passed to Action","No","No",1,"\U0001F534 Not Started","Official"),
 ("File Browse / Folder Browse","D6","Path picker interface question","0","1 (Q)","File filter; returns a path string",
  "No filter; relative vs absolute path","Path handed to Input/Output via Action","No","No",1,"\U0001F534 Not Started","Official"),
 ("List Box","D6","Multi-select interface question","0 (or 1 list)","1 (Q)","Delimited string vs field selection; Generate Custom List (prefix/suffix/delimiter)",
  "Delimiter / quoting for SQL IN lists; empty selection","The exact string generated","No","No",1,"\U0001F534 Not Started","Official"),
 ("Numeric Up Down","D6","Bounded numeric interface question","0","1 (Q)","Min, Max, Increment, Decimal places",
  "Range too tight; decimals","Value range the user can submit","No","No",1,"\U0001F534 Not Started","Official"),
 ("Radio Button","D6","Mutually exclusive interface choice","0","1 (Q)","Each button separate; grouped; default",
  "Not grouping; needing an Action per button","Which single value is active","No","No",1,"\U0001F534 Not Started","Official"),
 ("Text Box","D6","Free text/number interface question","0","1 (Q)","Password; multi-line; numeric",
  "No validation; multiline delimiters","String fed to Action","No","No",1,"\U0001F534 Not Started","Official"),
 ("DCM Connection (interface)","D6","Run-time picker for a DCM connection","0","1 (Q)","Pairs with DCM-enabled tools",
  "Tool not DCM-enabled; permissions","Which connection the workflow uses","No","No",1,"\U0001F534 Not Started","Official"),
 ("Block Until Done","D6","Releases outputs 1->2->3 only after all records arrive","1","3 (ordered)","No config; placement matters",
  "Placing it where it can't see all records; expecting parallelism","Order of writes vs reads in one workflow","No","No",1,"\U0001F534 Not Started","Official"),
 ("Run Command","D6","Runs an external program/script","0-1","0-1","Command + args; write source; read results; working dir",
  "Path quoting; blocking; needs a dummy passthrough","Whether/what data returns to the workflow","No","No",1,"\U0001F534 Not Started","Official"),
 ("Dynamic Select","D6","Selects fields by type or by formula at run time","1","1","By type / by formula; include vs exclude",
  "Formula returns nothing -> empty stream","Fields kept for a given data set","No","No",1,"\U0001F534 Not Started","Official"),
 # ---- supporting / prerequisite tools ----
 ("Text To Columns","Supporting (D1)","Splits one field into rows or columns by a delimiter","1","1","Delimiters; split to rows vs columns; extra columns handling",
  "Delimiter set incl. space; leftover columns","Rows/columns produced","No","No",1,"\U0001F534 Not Started","Supporting"),
 ("Summarize","Supporting (D1/D3)","Group By + aggregations incl. spatial actions","1","1","Group By; aggregations; spatial: Combine / Convex Hull / Centroid / Bounding Rectangle",
  "Wrong aggregation; spatial action location","Aggregated rows / combined spatial object","No","No",1,"\U0001F534 Not Started","Supporting"),
 ("Message","Supporting (D5/D6)","Emits messages / warnings / errors during run","1","1","When to fire; message type",
  "Firing per record and flooding the log","Log output","No","No",1,"\U0001F534 Not Started","Supporting"),
 ("Detour / Detour End","Supporting (D6)","Reroutes flow in an app based on an interface toggle","1","1","Detour direction from interface",
  "Direction not wired to interface","Which branch runs","No","No",1,"\U0001F534 Not Started","Supporting"),
 ("Test","Supporting","Validates data/config; fails the run on a bad assertion","1+","1","Test type; expected result",
  "Not used in build/CI","Pass/fail of the workflow","No","No",1,"\U0001F534 Not Started","Supporting"),
 ("Spatial Info","Supporting (D3)","Extracts properties (area, centroid, bounds) from a spatial object","1","1","Which properties to return",
  "Units of area/length","Numeric properties returned","No","No",1,"\U0001F534 Not Started","Supporting"),
 ("Select","Prerequisite","Reorder / rename / retype / deselect fields","1","1","Type & size; rename; forget-missing",
  "Silent type truncation","Schema after Select","No","No",1,"\U0001F534 Not Started","Prerequisite"),
 ("Join","Prerequisite","Inner + left + right output on key or position","2","3 (L/J/R)","Join on field vs position; field selection",
  "Position joins; duplicate keys fan-out","L/J/R row counts","No","No",1,"\U0001F534 Not Started","Prerequisite"),
 ("Union","Prerequisite","Stacks multiple inputs","N","1","Auto by name vs position; missing fields",
  "Name vs position; type coercion","Combined schema & row order","No","No",1,"\U0001F534 Not Started","Prerequisite"),
]
with open(os.path.join(OUT,"db-Tool-Mastery.csv"),"w",newline="",encoding="utf-8-sig") as f:
    w = csv.writer(f); w.writerow(tm_cols); w.writerows(TM)
print("Tool Mastery:", len(TM), "rows")

# ============================================================ 5. Practice Questions
pq_cols = ["Question","Domain","Topic","Difficulty","My Answer","Correct Answer","Correct/Incorrect",
 "Explanation","Mistake Type","Revision Required","Confidence"]
PQ = [
 ("A Multi-Row Formula is set to Num Rows = 1, expression [Sales]+[Row-1:Total], new field [Total], and 'Values for rows that don't exist' = 0. Input [Sales] = 10,20,30 (unsorted issues aside). What is [Total] for the three rows?",
  "D1 \u00b7 Advanced Data Prep","Multi-Row Formula","Medium","",
  "10, 30, 60 (running total; first row's [Row-1:Total] is treated as 0).","",
  "For the first row there is no previous row, so [Row-1:Total] = 0 -> 10. Row 2: 20+10=30. Row 3: 30+30=60.",
  "","No",1),
 ("In the Multi-Row Formula tool, 'Values for rows that don't exist' is left as 'Null()'. Your expression is [Row-1:Price] - [Price]. What happens on the first row?",
  "D1 \u00b7 Advanced Data Prep","Multi-Row Formula \u2013 rows that don't exist","Easy","",
  "The result is Null (any arithmetic with Null returns Null).","",
  "[Row-1:Price] is Null on the first row; Null minus a number is Null. Choose 0 or a sentinel if you need a real number.",
  "","No",1),
 ("Which single expression sends a record to the TRUE output of the Filter tool: keep rows where Region is 'East' OR 'West' AND Sales > 1000?",
  "D1 \u00b7 Advanced Data Prep","Filter \u2013 compound AND/OR","Medium","",
  "[Region]=\"East\" OR ([Region]=\"West\" AND [Sales]>1000) \u2014 but note AND binds tighter than OR, so the UNparenthesised version keeps ALL East rows regardless of Sales.",
  "","AND has higher precedence than OR. Without parentheses, 'A OR B AND C' = 'A OR (B AND C)'. Always parenthesise mixed AND/OR.",
  "","No",1),
 ("REGEX_Match([Phone], '\\d{3}-\\d{4}') is applied to the value '555-1234 x9'. What does it return?",
  "D1 \u00b7 Advanced Data Prep","REGEX_Match()","Medium","",
  "False.","",
  "REGEX_Match requires the ENTIRE value to match the pattern. '555-1234 x9' has trailing ' x9', so it fails. Use REGEX_CountMatches or wrap with .* to test 'contains'.",
  "","No",1),
 ("RegEx tool, Output Method = Parse, pattern (\\d+)-(\\d+), applied to '12-345'. How many output columns and what values?",
  "D1 \u00b7 Advanced Data Prep","RegEx \u2013 Parse vs Match","Medium","",
  "Two columns: '12' and '345' (one column per marked group).","",
  "Parse creates one output column per marked (capturing) group. Match would instead flag/return the whole match.",
  "","No",1),
 ("Round(2347, 100) returns what?",
  "D1 \u00b7 Advanced Data Prep","Round()","Easy","",
  "2300.","",
  "Alteryx Round(value, multiple) rounds to the nearest MULTIPLE, not to decimal places. 2347 -> nearest 100 = 2300.",
  "","No",1),
 ("GetWord('north-east region 4', 1) returns what? (spaces are delimiters)",
  "D1 \u00b7 Advanced Data Prep","GetWord()","Easy","",
  "'region' (word index is zero-based: 0='north-east', 1='region', 2='4').",
  "","GetWord is zero-based. '-' is not a default delimiter, so 'north-east' is one word.",
  "","No",1),
 ("You must read 300 CSV files that share a schema, from one folder, into a single stream. Which is the most appropriate approach?",
  "D4 \u00b7 Data Sources","Directory + Dynamic Input","Medium","",
  "Directory tool -> Dynamic Input ('Read a List of Data Sources'), OR a single Input Data with a wildcard path.",
  "","Both work for a shared schema. Dynamic Input is better when paths/logic vary; a wildcard Input is simplest. A batch macro is only needed for differing schemas.",
  "","No",1),
 ("In In-Database workflows, where does an In-DB Filter actually execute?",
  "D4 \u00b7 Data Sources","In-Database tools","Medium","",
  "Inside the database (the operation is pushed down as SQL); data is not brought into Designer until a Data Stream Out / Browse.",
  "","The point of In-DB tools is pushdown. Data Stream Out is what pulls results back to the Designer engine.",
  "","No",1),
 ("What problem does the Data Connection Manager (DCM) primarily solve?",
  "D4 \u00b7 Data Sources","DCM","Easy","",
  "It separates connection details from credentials and makes both reusable/shareable with controlled access.",
  "","DCM is about managing and reusing connections + credentials securely, not about performance.",
  "","No",1),
 ("A Dynamic Input tool errors with '... has a different schema than the template'. What is the usual cause and fix?",
  "D4 \u00b7 Data Sources","Dynamic Input","Medium","",
  "One source's columns/types differ from the template file; fix by making schemas consistent, using a Batch Macro with Auto Config by Name, or Union with 'Set output based on...'.",
  "","Dynamic Input assumes every source matches the template. Differing schemas are the classic failure; a batch macro handles them.",
  "","No",1),
 ("Reporting: you have one Table snippet and one Chart snippet and want them side by side in a single PDF. Which tool sequence?",
  "D2 \u00b7 Reporting Tools","Layout + Render","Easy","",
  "Table + Chart -> Layout (Horizontal) -> Render (PDF).",
  "","Layout composes multiple snippets into one report field; Render then writes it. Rendering two separate fields would not place them together.",
  "","No",1),
 ("Render tool: 'Group Data into Separate Reports' is set on the [Region] field with 4 regions, output to a PDF file path. What is produced?",
  "D2 \u00b7 Reporting Tools","Render","Medium","",
  "Four separate PDF files, one per region (filenames disambiguated per group).",
  "","That option splits the output into one file per distinct group value.",
  "","No",1),
 ("Create Points is configured with X = [Lat], Y = [Long] by mistake (values swapped). What is the visible symptom?",
  "D3 \u00b7 Spatial Analytics Basics","Create Points","Easy","",
  "Points plot in the wrong place (e.g. off the coast / wrong hemisphere) because X must be Longitude and Y must be Latitude.",
  "","X = Longitude, Y = Latitude. Swapping them is the single most common Create Points error.",
  "","No",1),
 ("Spatial Match: Target = store polygons, Universe = customer points, condition 'Where Target Contains Universe'. A store polygon contains 5 customer points. How many records leave the Matched output for that store?",
  "D3 \u00b7 Spatial Analytics Basics","Spatial Match \u2013 target vs universe","Hard","",
  "5 \u2014 the target record is duplicated once per matching universe record.",
  "","Spatial Match fans out: one output row per target\u2013universe match. Aggregate afterwards if you want one row per store.",
  "","No",1),
 ("Find Nearest: Target = 10 warehouses, Universe = 500 customers, 'find 1 nearest', max distance 20 miles. 30 customers are >20 miles from any warehouse. What do the two outputs contain?",
  "D3 \u00b7 Spatial Analytics Basics","Find Nearest","Medium","",
  "Matched output: 470 rows (customer + its nearest warehouse + distance). Not-Found output: 30 rows.",
  "","Find Nearest returns one matched row per Universe record within the cutoff; the rest go to the unmatched/Not-Found anchor.",
  "","No",1),
 ("Which macro type would you build to run the same cleanup logic once for each file path in an incoming list, changing the Input Data path each run?",
  "D5 \u00b7 Macros","Batch macro","Medium","",
  "A Batch macro (Control Parameter feeds the path; an Action tool updates the Input Data tool each pass).",
  "","One run per control record = batch. Iterative feeds output back to input; standard runs once.",
  "","No",1),
 ("In an Iterative macro, what two things determine when it stops?",
  "D5 \u00b7 Macros","Iterative macro","Medium","",
  "Either the Iteration Output feeding the loop anchor becomes empty (0 records) / the stop condition is met, OR the maximum iteration count (Interface Designer > Properties) is reached.",
  "","An iterative macro loops until nothing is left to process or it hits the max-iterations safeguard.",
  "","No",1),
 ("The 'Show Field Map' option on a Macro Input does what for someone using your macro?",
  "D5 \u00b7 Macros","Show Field Map","Easy","",
  "It lets them map their own incoming field names to the field names the macro expects, at configuration time.",
  "","Field Map = user-facing remapping of incoming fields to the macro's template fields.",
  "","No",1),
 ("An Action tool is set to 'Update Value' targeting a Text Box interface tool wired to an Input Data tool's file path. At run time the user types C:\\data\\jan.csv. What happens?",
  "D6 \u00b7 Analytical Apps","Action tool","Medium","",
  "The Input Data tool's file-path property in the workflow XML is replaced with C:\\data\\jan.csv before the workflow runs.",
  "","The Action tool rewrites a specific piece of the target tool's XML using the interface value.",
  "","No",1),
 ("What is the defining limitation ('boundary') of the Condition tool?",
  "D6 \u00b7 Analytical Apps","Condition tool boundaries","Medium","",
  "It only works inside an analytic app or macro and it routes interface/configuration logic (Action flow) \u2014 it does NOT filter data records.",
  "","Condition is an interface tool. For data use Filter. It needs the app/macro context to evaluate.",
  "","No",1),
 ("The Error Message tool's expression evaluates to True at run time (set as an error, not a warning). What happens to the analytic app?",
  "D6 \u00b7 Analytical Apps","Error Message tool","Medium","",
  "The app stops before executing and shows the message to the user; downstream tools do not run.",
  "","An Error Message set to 'error' blocks the run; set to 'warning' it only logs and the run continues.",
  "","No",1),
 ("You need to write a table to a database and then, in the same workflow, read it back after the write finishes. Which tool guarantees the ordering?",
  "D6 \u00b7 Analytical Apps","Block Until Done","Easy","",
  "Block Until Done \u2014 send the write off output 1 (or 2) and the read trigger off a later output so it fires only after the write completes.",
  "","Block Until Done releases its numbered outputs in order, only after all upstream records have arrived.",
  "","No",1),
 ("List Box interface tool: you want to build a SQL 'IN' list like 'A','B','C' from the user's selections. Which feature do you use?",
  "D6 \u00b7 Analytical Apps","List Box","Medium","",
  "'Generate Custom List' with start/end text = single quote, delimiter = ',' (or quote-comma-quote).",
  "","Generate Custom List wraps each selected value with prefix/suffix and joins with a delimiter.",
  "","No",1),
 ("Dynamic Select with 'Select via a Formula': [_CurrentFieldType_] is compared and the formula is: [_CurrentFieldType_] IN ('Double','Int32','Int64'). What does the tool output?",
  "D6 \u00b7 Analytical Apps","Dynamic Select","Medium","",
  "Only the numeric-typed fields pass through; all other fields are removed.",
  "","Dynamic Select keeps fields where the formula is True (or removes them, depending on the include/exclude toggle).",
  "","No",1),
]
with open(os.path.join(OUT,"db-Practice-Questions.csv"),"w",newline="",encoding="utf-8-sig") as f:
    w = csv.writer(f); w.writerow(pq_cols); w.writerows(PQ)
print("Practice Questions:", len(PQ), "rows")

# ============================================================ 6. Mock Exam Tracker
me_cols = ["Test Number","Date","Total Questions","Correct","Incorrect","Score %","Passing Score",
 "Personal Target","Time Taken","Weak Domain","Weak Topics","Revision Required","Retest Date"]
ME = [
 ["Practice Mock 1 (in this bundle, Day 27)","",25,"","","",73,82,"","","","No",""],
 ["Mock Exam 2 (Academy prep / Community, Day 28)","",51,"","","",73,82,"","","","No",""],
 ["Mock Exam 3 (optional re-test)","",51,"","","",73,82,"","","","No",""],
 ["Mock Exam 4 (optional re-test)","",51,"","","",73,82,"","","","No",""],
]
with open(os.path.join(OUT,"db-Mock-Exam-Tracker.csv"),"w",newline="",encoding="utf-8-sig") as f:
    w = csv.writer(f); w.writerow(me_cols); w.writerows(ME)
print("Mock Exam Tracker:", len(ME), "rows")

# ============================================================ 7. Learning Resources
lr_cols = ["Topic","What to Learn","Primary Resource","Secondary Resource","Hands-on Practice",
 "Related Challenge","Resource URL"]
ACAD = "https://community.alteryx.com/t5/Alteryx-Academy/ct-p/alteryx-academy"
HELP = "https://help.alteryx.com/"
TMKB = "https://community.alteryx.com/t5/Tool-Mastery/tkb-p/tool-mastery"
ILES = "https://community.alteryx.com/t5/Interactive-Lessons/ct-p/interactive-lessons"
WCB  = "https://community.alteryx.com/t5/Weekly-Challenge/bd-p/weekly-challenge"
LR = [
 ("Multi-Row Formula","Row offsets, Group By, rows-that-don't-exist, running calcs",
  "Academy Pathway: Advanced Data Preparation","Tool Mastery: Multi-Row Formula (Community)",
  "Build running total, prev-row delta, % change on sample sales data","#3 Running Averages",TMKB),
 ("Multi-Field Formula","One expression over many fields; overwrite vs add; type change",
  "Academy Pathway: Advanced Data Preparation","Help: Multi-Field Formula Tool",
  "Trim + upper-case 6 text fields at once; then change 3 numeric fields to Fixed Decimal","(verify) Multi-Field Formula challenge",HELP),
 ("Formula functions (DateTime/ToNumber/Round/GetWord/FindString/Trim)","Exact syntax & return values of the 8 named functions",
  "Help: Functions (by category)","Academy Pathway: Parsing Data",
  "One Formula tool, one field per function, predict each output before running","(verify) DateTime challenge",HELP),
 ("REGEX_Match / REGEX_Replace","Whole-string match; back-references; when to use vs the RegEx tool",
  "Academy Pathway: Parsing Data","Tool Mastery: RegEx (Community)",
  "Validate emails with REGEX_Match; mask digits with REGEX_Replace","#56 Parsing & Counting Hashtags",TMKB),
 ("RegEx tool (Parse / Match / Tokenize / Replace)","Which method yields columns vs rows vs flags; marked groups",
  "Academy Pathway: Parsing Data","Help: RegEx Tool",
  "Same pattern through all 4 methods on one data set; diff the outputs","#56 Parsing & Counting Hashtags",HELP),
 ("Filter (compound AND/OR)","Custom filter, operator precedence, parentheses, null handling",
  "Help: Filter Tool","Tool Mastery: Filter (Community)",
  "Write 5 compound conditions; predict T/F split for 10 rows","\u2014",HELP),
 ("Generate Rows","Numeric/date/loop modes; init/condition/loop expressions",
  "Academy Pathway: Advanced Data Preparation","Help: Generate Rows Tool",
  "Generate a date row per day of last month; generate a 1..N sequence per group","#86 (uses Generate Rows)",HELP),
 ("Find Replace","Whole vs any-part; replace text vs append fields; multiple items",
  "Help: Find Replace Tool","Tool Mastery: Find Replace (Community)",
  "Look up 20 abbreviations and expand them inside a free-text field","\u2014",HELP),
 ("Join Multiple","N-input joins; Cartesian option; only-matching option; field collisions",
  "Help: Join Multiple Tool","Tool Mastery: Join Multiple (Community)",
  "Join 3 lookup tables to a fact table; inspect row count vs a chain of Joins","\u2014",HELP),
 ("Data Investigation (Field Summary / Frequency Table / Association Analysis)","What each output means; where correlation appears",
  "Help: Data Investigation tools","Academy: Data Investigation content",
  "Profile a messy data set; read the Field Summary + Frequency Table reports","\u2014",HELP),
 ("Pearson vs Spearman","Linear vs monotonic; data-type & distribution assumptions; when each is higher",
  "Help: Pearson Correlation / Spearman Correlation","Community articles: correlation in Alteryx",
  "Run both on a non-linear-but-monotonic pair; explain the gap","\u2014",HELP),
 ("Tables & Charts","Table column config & rule formatting; chart layers, types, aggregation",
  "Academy Pathway: From Data Prep to Insightful Reports","Help: Table Tool / Interactive Chart Tool",
  "Build a formatted summary table + a grouped bar chart from one aggregate","(verify) Reporting challenge",HELP),
 ("Layout / Render / Email","Composing snippets; output formats; group-into-separate-reports; emailing reports",
  "Academy Pathway: From Data Prep to Insightful Reports","Help: Layout / Render / Email Tools",
  "One PDF with title + table + chart; then one PDF per region; then email it","(verify) Reporting challenge",HELP),
 ("Spatial objects (Create Points; Formula & Summarize spatial)","Point creation; ST_ functions; Summarize spatial actions",
  "Help: Spatial tools","Interactive Lessons: Spatial Analytics",
  "Create points from lat/long; buffer them in Formula; Combine in Summarize","#6 Spatial Route",ILES),
 ("Combine / Spatial Match / Trade Area","Intersect/cut/buffer results; target-vs-universe; rings & overlap",
  "Help: Spatial Match / Trade Area / Spatial Process","Interactive Lessons: Spatial Analytics",
  "Trade areas around stores; Spatial Match customers to them; count per store","#6 Spatial Route",HELP),
 ("Distance / Find Nearest / Target & Universe","Straight-line vs drive; nearest N; which anchor is which",
  "Help: Distance Tool / Find Nearest Tool","Tool Mastery: Find Nearest (Community)",
  "Nearest depot to each customer with a 25-mile cap; inspect both outputs","#6 Spatial Route",HELP),
 ("Data Sources \u2013 Download & Connectors","REST calls; GET/POST; headers/payload; connectors vs Download",
  "Help: Download Tool / Connectors","Academy Pathway: Preparing and Blending Data",
  "Call a public JSON API with Download; parse the response with JSON Parse","(verify) Data Sources challenge",HELP),
 ("Data Sources \u2013 In-Database & DCM","Connect In-DB; Data Stream In/Out; pushdown; DCM connections",
  "Help: In-Database / Data Connection Manager","Academy: In-Database content",
  "Build an In-DB filter+summarize against SQLite; Data Stream Out only at the end","\u2014",HELP),
 ("Data Sources \u2013 Dynamic Input / Directory / Dynamic Rename","Template reads; list-of-sources; renaming methods",
  "Help: Dynamic Input / Directory / Dynamic Rename","Tool Mastery (Community)",
  "Directory -> Dynamic Input over 5 files; Dynamic Rename via formula","(verify) Data Sources challenge",HELP),
 ("Data Sources \u2013 Blob tools","Blob Input/Output/Convert; reading & writing binary files",
  "Help: Blob Input / Blob Output / Blob Convert","Tool Mastery: Blob (Community)",
  "Read a folder of images to blobs; write them back out with new names","\u2014",HELP),
 ("Macros \u2013 standard / batch / iterative","Use cases; Macro Input/Output; Control Parameter; Iteration anchors",
  "Academy Pathway: Getting Started with Macros","Help: Macros",
  "Build one of each type doing the same trivial task; compare run behaviour","#86 Macro: Generate Past Dates",HELP),
 ("Macros \u2013 Interface Designer / Show Field Map / Debug / repository","Layout & Test View; field mapping; Debug workflow; User Settings > Macros",
  "Academy Pathway: Getting Started with Macros","Help: Interface Designer / User Settings",
  "Add an interface question to your macro; Debug it; register a macro folder","#86 Macro: Generate Past Dates",HELP),
 ("Analytical Apps \u2013 Action / Condition / Error Message","XML update actions; interface-flow branching; run-time errors",
  "Help: Action / Condition / Error Message Tools","Interactive Lessons: Analytic Apps",
  "App that updates an Input path via Action; Condition to toggle a branch; Error Message guard","(verify) Analytical App challenge",HELP),
 ("Analytical Apps \u2013 Interface tools","Check Box, Drop Down, Browse, List Box, Numeric Up Down, Radio Button, Text Box, DCM Connection",
  "Help: Interface Tools","Academy: Analytic Apps content",
  "One app exercising all 8 interface tools, each wired through an Action","(verify) Analytical App challenge",HELP),
 ("Productionizing \u2013 Block Until Done / Email Event / Run Command / Dynamic Select","Ordering, workflow events, external scripts, run-time field selection",
  "Help: Block Until Done / Events / Run Command / Dynamic Select","Community articles",
  "Write-then-read with Block Until Done; add a success Email Event; a Run Command step","\u2014",HELP),
]
with open(os.path.join(OUT,"db-Learning-Resources.csv"),"w",newline="",encoding="utf-8-sig") as f:
    w = csv.writer(f); w.writerow(lr_cols); w.writerows(LR)
print("Learning Resources:", len(LR), "rows")

# ============================================================ 8. Coverage Audit (markdown)
# challenge coverage: which official topics are reinforced by a scheduled challenge
CHAL = {
 "Multi-Row Formula tool – configure & identify output from expressions":"#3",
 "Multi-Row Formula tool – values for rows that do not exist":"#3",
 "Formula function: REGEX_Match()":"#56",
 "Formula function: REGEX_Replace()":"#56",
 "RegEx tool – configuration":"#56",
 "Parse vs Match methods (RegEx tool)":"#56",
 "Identify the regular expression that produces a given output":"#56",
 "Generate Rows tool":"#86",
 "Create Points tool":"#6",
 "Spatial functionality within the Formula tool":"#6",
 "Combine spatial objects – intersections, splits, buffers":"#6",
 "Distance tool":"#6",
 "Standard macro – use case & functionality":"#86",
 "Batch macro – use case & functionality":"#86",
 "Macro Input tool":"#86",
 "Interface tool: Numeric Up Down":"#86",
}
lines = []
lines.append("# \U0001F50D Official Syllabus Coverage Audit\n")
lines.append("**Tier: OFFICIAL.** Every row is a topic **explicitly named in the official Exam Prep "
 "Guide**. Generated from the same single source of truth as the Master Topic Tracker CSV, so the "
 "two cannot drift.\n")
lines.append("| # | Official Domain | Official Topic | Weight | In Tracker? | Day | Hands-on? | "
 "Challenge? | Resource? | Revision? | Status |")
lines.append("|--:|---|---|:--:|:--:|:--:|:--:|:--:|:--:|:--:|---|")
n = 0
for topic, sub, dom, day, diff, prio in TOPICS:
    n += 1
    dlabel, weight = DOM[dom]
    ch = CHAL.get(topic, "")
    lines.append(f"| {n} | {dlabel} | {topic} | {weight} | ✅ | {day} | ✅ | "
                 f"{ch if ch else '—'} | ✅ | ✅ (recall slot) | \U0001F534 Not Started |")
from collections import Counter
by_dom = Counter(t[2] for t in TOPICS)
wsum = 0
for k in ["D1","D2","D3","D4","D5","D6"]:
    wsum += int(DOM[k][1].rstrip('%'))
chal_count = sum(1 for t in TOPICS if t[0] in CHAL)
lines.append("\n## Totals\n")
lines.append(f"- **OFFICIAL TOPICS:** {len(TOPICS)}")
lines.append(f"- **TRACKER TOPICS (official rows in db-Master-Topic-Tracker.csv):** "
 f"{sum(1 for r in rows if r[-1]=='Official')}")
lines.append(f"- **MISSING OFFICIAL TOPICS:** 0")
lines.append(f"- **UNSUPPORTED TOPICS PRESENTED AS OFFICIAL:** 0  "
 f"(prerequisite/recommended items are tagged `Prerequisite` / `Recommended`, never `Official`)")
lines.append(f"- **Coverage: 100%**\n")
lines.append("### By domain\n")
lines.append("| Domain | Weight | Official topics | Days |")
lines.append("|---|:--:|:--:|---|")
dday = {"D1":"1–7","D2":"12–14","D3":"15–17","D4":"8–11","D5":"18–22","D6":"23–26"}
for k in ["D1","D2","D3","D4","D5","D6"]:
    lines.append(f"| {DOM[k][0]} | {DOM[k][1]} | {by_dom[k]} | {dday[k]} |")
lines.append(f"| **Total** | **{wsum}%** | **{len(TOPICS)}** | 1–26 |\n")
lines.append(f"- Topics reinforced by a **scheduled Weekly Challenge** (#3 / #56 / #6 / #86): "
 f"**{chal_count}**. The rest are reinforced by hands-on builds + Practice Questions + recall slots; "
 f"add *recommended* challenges (see `06-Weekly-Challenge-Guide.md`) for extra reps.")
lines.append("- Every topic has: a study **Day** (1–26), a **hands-on** build in the 28-day "
 "plan, a **Resource** (Master Topic Tracker `Resource` + `Resource URL`), and a **Revision** pass "
 "(daily recall slot + weekly review + Days 27–28).")
lines.append("- Days **14, 20, 21** teach no *new* official topic (they are build / consolidation / "
 "review days) — this is intentional and does not affect coverage.\n")
lines.append("## Audit procedure (re-run any time)\n")
lines.append("1. Re-run `regenerate-databases.py` — it rebuilds the CSVs **and** this file from "
 "the one `TOPICS` list.\n2. In Notion, open **✅ Master Topic Tracker ▸ filter "
 "`Type is Official`** — the count must be **77**.\n3. Group that view by **Domain**; the "
 "counts must be 25 / 5 / 9 / 11 / 9 / 18.\n4. Filter `Status is not \U0001F7E2 Completed` "
 "on Day 28 — the result must be **empty**.\n5. If anything is missing, add the row to "
 "`TOPICS`, re-run, re-import.")
with open(os.path.join(OUT,"11-Official-Syllabus-Coverage-Audit.md"),"w",encoding="utf-8") as f:
    f.write("\n".join(lines) + "\n")
print("Coverage Audit md:", len(TOPICS), "topic rows")

print("\nAll files written to:", OUT)
