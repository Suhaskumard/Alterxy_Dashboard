# -*- coding: utf-8 -*-
"""Assemble the single-file Alteryx Advanced tracker artifact."""
import json, pathlib

data = json.loads(pathlib.Path("artifact_data.json").read_text(encoding="utf-8"))
data_js = json.dumps(data, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/")

HTML = r"""<title>Alteryx Advanced Countdown</title>
<meta name="description" content="A 28-day study tracker for the Alteryx Designer Advanced Certification.">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');

  /* ---- light palette (bare :root) ---- */
  :root{
    --bg:#eceff0; --surface:#fbfcfc; --surface-2:#e4eae9; --sunken:#e9edec;
    --line:#ccd6d4; --line-soft:#dae1e0;
    --ink:#132420; --ink-2:#3f524d; --ink-dim:#697b76;
    --accent:#0a7a6d; --accent-2:#0a6a5f; --accent-soft:rgba(10,122,109,.12);
    --ok:#3d8b4e; --warn:#a9700e; --crit:#b2433b;
    --d1:#0a7a6d; --d2:#7b52c9; --d3:#3f8f4f; --d4:#b07d17; --d5:#2f6fb0; --d6:#b1506a;
    --ring-track:#d7dedc;
    --shadow:0 1px 2px rgba(19,36,32,.05), 0 8px 24px -12px rgba(19,36,32,.14);
    --radius:14px;
    color-scheme:light;
  }
  /* ---- dark palette: OS dark, unless an explicit light choice ---- */
  @media (prefers-color-scheme:dark){
    :root:not([data-theme="light"]){
      --bg:#0c1513; --surface:#121e1c; --surface-2:#1a2a27; --sunken:#0f1a18;
      --line:#293c38; --line-soft:#20302d;
      --ink:#e9efec; --ink-2:#b9c7c2; --ink-dim:#879994;
      --accent:#35cdb8; --accent-2:#48d8c4; --accent-soft:rgba(53,205,184,.14);
      --ok:#57c46d; --warn:#dda343; --crit:#e4675c;
      --d1:#35cdb8; --d2:#a98be6; --d3:#66c47a; --d4:#d9a84a; --d5:#6aa6dd; --d6:#dd8298;
      --ring-track:#243532;
      --shadow:0 1px 2px rgba(0,0,0,.3), 0 10px 30px -14px rgba(0,0,0,.6);
      color-scheme:dark;
    }
  }
  /* ---- explicit dark choice wins in both directions ---- */
  :root[data-theme="dark"]{
    --bg:#0c1513; --surface:#121e1c; --surface-2:#1a2a27; --sunken:#0f1a18;
    --line:#293c38; --line-soft:#20302d;
    --ink:#e9efec; --ink-2:#b9c7c2; --ink-dim:#879994;
    --accent:#35cdb8; --accent-2:#48d8c4; --accent-soft:rgba(53,205,184,.14);
    --ok:#57c46d; --warn:#dda343; --crit:#e4675c;
    --d1:#35cdb8; --d2:#a98be6; --d3:#66c47a; --d4:#d9a84a; --d5:#6aa6dd; --d6:#dd8298;
    --ring-track:#243532;
    --shadow:0 1px 2px rgba(0,0,0,.3), 0 10px 30px -14px rgba(0,0,0,.6);
    color-scheme:dark;
  }

  *{box-sizing:border-box}
  html{-webkit-text-size-adjust:100%}
  body{
    margin:0; background:var(--bg); color:var(--ink);
    font:400 15px/1.6 "IBM Plex Sans", system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
    -webkit-font-smoothing:antialiased;
  }
  h1,h2,h3{font-family:"Archivo", system-ui, sans-serif; font-weight:700; margin:0; line-height:1.15; text-wrap:balance}
  a{color:var(--accent-2)}
  .mono{font-family:"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace}
  .eyebrow{font-family:"IBM Plex Mono", ui-monospace, monospace; font-size:11px; letter-spacing:.14em;
    text-transform:uppercase; color:var(--ink-dim); font-weight:500}
  .tnum{font-variant-numeric:tabular-nums}

  button{font-family:inherit; cursor:pointer; color:inherit}
  :focus-visible{outline:2px solid var(--accent); outline-offset:2px; border-radius:6px}
  @media (prefers-reduced-motion:reduce){*{animation-duration:.001ms!important; transition-duration:.001ms!important}}

  /* ---------- shell ---------- */
  .topbar{position:sticky; top:0; z-index:20; display:flex; align-items:center; justify-content:space-between;
    gap:16px; padding:12px clamp(16px,4vw,40px); background:color-mix(in srgb, var(--bg) 88%, transparent);
    backdrop-filter:blur(8px); border-bottom:1px solid var(--line-soft)}
  .brand{display:flex; align-items:baseline; gap:10px; min-width:0}
  .brand b{font-family:"Archivo",sans-serif; font-weight:800; font-size:15px; letter-spacing:-.01em}
  .brand span{font-size:11px}
  .tb-actions{display:flex; gap:8px; flex-shrink:0}
  .tb-actions button{background:var(--surface); border:1px solid var(--line); border-radius:9px;
    padding:7px 11px; font-size:12px; font-weight:500; display:inline-flex; align-items:center; gap:6px}
  .tb-actions button:hover{border-color:var(--accent); color:var(--accent-2)}

  main{max-width:1160px; margin:0 auto; padding:clamp(20px,4vw,44px) clamp(16px,4vw,40px) 80px}

  /* ---------- hero ---------- */
  .hero{display:grid; grid-template-columns:minmax(0,300px) 1fr; gap:clamp(20px,4vw,44px); align-items:center;
    padding-bottom:28px; border-bottom:1px solid var(--line-soft)}
  .ringwrap{display:flex; flex-direction:column; align-items:center; gap:12px; text-align:center}
  .ring{position:relative; width:200px; height:200px}
  .ring svg{transform:rotate(-90deg)}
  .ring .pct{position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center}
  .ring .pct b{font-family:"Archivo",sans-serif; font-weight:800; font-size:46px; letter-spacing:-.02em; line-height:1}
  .ring .pct small{font-size:11px; letter-spacing:.12em; text-transform:uppercase; color:var(--ink-dim); margin-top:4px}
  .hero h1{font-size:clamp(22px,3.2vw,30px); font-weight:800; letter-spacing:-.02em}
  .hero .lead{color:var(--ink-2); margin:8px 0 18px; font-size:14px; max-width:52ch}
  .startrow{display:flex; align-items:center; gap:10px; flex-wrap:wrap; font-size:13px; color:var(--ink-dim)}
  .startrow input[type=date]{font-family:"IBM Plex Mono",monospace; font-size:13px; background:var(--surface);
    border:1px solid var(--line); border-radius:8px; padding:6px 9px; color:var(--ink)}

  .stats{display:grid; grid-template-columns:repeat(4,1fr); gap:12px; margin-top:20px}
  .stat{background:var(--surface); border:1px solid var(--line); border-radius:12px; padding:13px 14px;
    display:flex; flex-direction:column; gap:3px}
  .stat .k{font-family:"IBM Plex Mono",monospace; font-size:10.5px; letter-spacing:.1em; text-transform:uppercase; color:var(--ink-dim)}
  .stat .v{font-family:"Archivo",sans-serif; font-weight:700; font-size:23px; letter-spacing:-.01em}
  .stat .v small{font-size:13px; font-weight:600; color:var(--ink-dim)}

  /* ---------- day strip ---------- */
  .strip{margin:22px 0 4px}
  .strip .cells{display:flex; flex-wrap:wrap; gap:5px; margin-top:9px}
  .cell{width:30px; height:30px; border-radius:7px; border:1px solid var(--line);
    background:var(--sunken); position:relative; display:flex; align-items:center; justify-content:center;
    font-family:"IBM Plex Mono",monospace; font-size:11px; color:var(--ink-dim); padding:0}
  .cell .fill{position:absolute; left:0; right:0; bottom:0; border-radius:0 0 6px 6px; background:var(--accent); opacity:.9}
  .cell span{position:relative; z-index:1; mix-blend-mode:normal}
  .cell.full{color:#fff}
  .cell.today{border-color:var(--accent); box-shadow:0 0 0 2px var(--accent-soft)}
  .cell.wk-start{margin-left:12px}
  .cell:hover{border-color:var(--accent-2)}

  /* ---------- layout grid ---------- */
  .grid{display:grid; grid-template-columns:1.55fr 1fr; gap:22px; margin-top:26px; align-items:start}
  .col{display:flex; flex-direction:column; gap:18px; min-width:0}
  .card{background:var(--surface); border:1px solid var(--line); border-radius:var(--radius); box-shadow:var(--shadow)}
  .card > .hd{display:flex; align-items:center; justify-content:space-between; gap:12px;
    padding:14px 16px; border-bottom:1px solid var(--line-soft)}
  .card > .hd h2{font-size:13px; letter-spacing:.02em; text-transform:uppercase; font-family:"IBM Plex Mono",monospace; font-weight:500; color:var(--ink-2)}
  .card > .bd{padding:16px}

  /* today card */
  .today .bd{padding:0}
  .today .now{padding:16px 18px; border-bottom:1px solid var(--line-soft)}
  .today .now .d{display:flex; align-items:baseline; gap:10px}
  .today .now .d b{font-family:"Archivo",sans-serif; font-weight:800; font-size:19px}
  .today .now .t{font-family:"Archivo",sans-serif; font-weight:700; font-size:17px; margin:6px 0 4px; letter-spacing:-.01em}
  .today .now .o{font-size:13px; color:var(--ink-2)}
  .chip{display:inline-flex; align-items:center; gap:5px; font-family:"IBM Plex Mono",monospace; font-size:11px;
    padding:2px 8px; border-radius:999px; border:1px solid var(--line); background:var(--surface-2); color:var(--ink-2); white-space:nowrap}
  .chip.hard{border-color:color-mix(in srgb,var(--warn) 45%,var(--line)); color:var(--warn)}
  .chip.chal{border-color:color-mix(in srgb,var(--accent) 40%,var(--line)); color:var(--accent-2)}
  .chip.dom{border:none; padding-left:6px}
  .dot{width:8px; height:8px; border-radius:3px; display:inline-block; flex-shrink:0; vertical-align:middle}

  /* task list */
  ul.tasks{list-style:none; margin:0; padding:8px 6px 10px}
  ul.tasks li{display:flex; gap:10px; padding:6px 10px; border-radius:9px; align-items:flex-start; font-size:13.5px; line-height:1.5}
  ul.tasks li:hover{background:var(--surface-2)}
  ul.tasks input{appearance:none; -webkit-appearance:none; width:17px; height:17px; margin:2px 0 0; flex-shrink:0;
    border:1.5px solid var(--line); border-radius:5px; background:var(--surface); position:relative; cursor:pointer}
  ul.tasks input:checked{background:var(--accent); border-color:var(--accent)}
  ul.tasks input:checked::after{content:""; position:absolute; left:4.5px; top:1px; width:4px; height:9px;
    border:solid #fff; border-width:0 2px 2px 0; transform:rotate(42deg)}
  ul.tasks li.done label{color:var(--ink-dim); text-decoration:line-through; text-decoration-color:var(--line)}
  ul.tasks label{cursor:pointer}
  ul.tasks code{font-family:"IBM Plex Mono",monospace; font-size:.86em; background:var(--surface-2);
    border:1px solid var(--line-soft); border-radius:5px; padding:.5px 4px}

  /* plan accordion */
  .plan{display:flex; flex-direction:column}
  .day{border-bottom:1px solid var(--line-soft)}
  .day:last-child{border-bottom:none}
  .day > .row{display:grid; grid-template-columns:auto 1fr auto; gap:12px; align-items:center;
    width:100%; text-align:left; background:none; border:0; padding:12px 16px}
  .day > .row:hover{background:var(--surface-2)}
  .day .num{font-family:"Archivo",sans-serif; font-weight:800; font-size:15px; width:34px; text-align:center;
    color:var(--ink-dim); display:flex; flex-direction:column; align-items:center; line-height:1}
  .day .num small{font-family:"IBM Plex Mono",monospace; font-weight:500; font-size:9px; color:var(--ink-dim); letter-spacing:.05em}
  .day .mid{min-width:0}
  .day .mid .tt{font-weight:600; font-size:13.5px; line-height:1.45; letter-spacing:-.005em}
  .day .mid .tt .dot{margin-right:7px}
  .day .mid .tt .chip.hard{margin-left:6px}
  .day .mid .sub{display:flex; gap:6px; margin-top:5px; flex-wrap:wrap}
  .day .mid .sub:empty{display:none}
  .day .bar{width:56px; height:6px; border-radius:999px; background:var(--sunken); overflow:hidden; flex-shrink:0}
  .day .bar i{display:block; height:100%; background:var(--accent); border-radius:999px}
  .day .caret{width:16px; color:var(--ink-dim); transition:transform .18s ease; flex-shrink:0}
  .day[open] .caret{transform:rotate(90deg)}
  .day summary{list-style:none; cursor:pointer}
  .day summary::-webkit-details-marker{display:none}
  .day summary::marker{content:""}
  .day .panel{padding:0 8px 8px 8px}
  .day[data-today="1"] > .row{background:var(--accent-soft)}
  .day[data-today="1"] .num{color:var(--accent-2)}

  /* right column widgets */
  .dom{display:flex; flex-direction:column; gap:13px}
  .dom .r{display:grid; grid-template-columns:1fr auto; gap:4px 10px; align-items:baseline}
  .dom .r .nm{font-size:12.5px; font-weight:600; display:flex; align-items:center; gap:7px}
  .dom .r .vv{font-family:"IBM Plex Mono",monospace; font-size:12px; color:var(--ink-dim)}
  .dom .r .track{grid-column:1/-1; height:7px; border-radius:999px; background:var(--sunken); overflow:hidden}
  .dom .r .track i{display:block; height:100%; border-radius:999px}
  .wt{font-family:"IBM Plex Mono",monospace; font-size:10px; color:var(--ink-dim)}

  .chal{display:flex; flex-direction:column; gap:9px}
  .chal .c{display:grid; grid-template-columns:auto 1fr auto; gap:10px; align-items:center; padding:9px 10px;
    border:1px solid var(--line); border-radius:10px; background:var(--surface)}
  .chal .c .id{font-family:"Archivo",sans-serif; font-weight:800; font-size:14px}
  .chal .c .nm{font-size:12px; font-weight:600; min-width:0}
  .chal .c .nm small{display:block; font-weight:400; color:var(--ink-dim); font-size:11px; margin-top:1px}
  .chal .c .st{font-family:"IBM Plex Mono",monospace; font-size:10.5px; padding:4px 8px; border-radius:999px;
    border:1px solid var(--line); background:var(--surface-2); white-space:nowrap}
  .chal .c .st.s1{color:var(--warn); border-color:color-mix(in srgb,var(--warn) 40%,var(--line))}
  .chal .c .st.s2{color:var(--ok); border-color:color-mix(in srgb,var(--ok) 45%,var(--line)); background:color-mix(in srgb,var(--ok) 12%,var(--surface))}

  .mock{display:flex; flex-direction:column; gap:12px}
  .mock .in{display:flex; align-items:center; justify-content:space-between; gap:10px; font-size:13px}
  .mock .in input{width:74px; font-family:"IBM Plex Mono",monospace; font-size:13px; text-align:right;
    background:var(--surface); border:1px solid var(--line); border-radius:8px; padding:6px 8px; color:var(--ink)}
  .verdict{display:flex; align-items:baseline; gap:8px; padding-top:10px; border-top:1px solid var(--line-soft)}
  .verdict b{font-family:"Archivo",sans-serif; font-weight:800; font-size:24px}
  .verdict .tag{font-family:"IBM Plex Mono",monospace; font-size:11px; padding:3px 8px; border-radius:999px; border:1px solid var(--line)}
  .verdict .tag.go{color:var(--ok); border-color:var(--ok)}
  .verdict .tag.no{color:var(--warn); border-color:var(--warn)}

  .weak{display:flex; flex-direction:column; gap:10px}
  .weak .tags{display:flex; flex-wrap:wrap; gap:6px}
  .weak .tag{display:inline-flex; align-items:center; gap:6px; font-size:12px; padding:4px 6px 4px 10px;
    border-radius:999px; border:1px solid color-mix(in srgb,var(--crit) 35%,var(--line));
    background:color-mix(in srgb,var(--crit) 9%,var(--surface)); color:var(--ink)}
  .weak .tag button{border:0; background:none; color:var(--ink-dim); font-size:14px; line-height:1; padding:0 2px}
  .weak .tag button:hover{color:var(--crit)}
  .weak form{display:flex; gap:8px}
  .weak input{flex:1; background:var(--surface); border:1px solid var(--line); border-radius:8px; padding:7px 10px;
    font:inherit; font-size:12.5px; color:var(--ink)}
  .weak button.add{background:var(--accent); border:1px solid var(--accent); color:#fff; border-radius:8px; padding:0 12px; font-size:12px; font-weight:600}
  .weak .empty{font-size:12px; color:var(--ink-dim); font-style:italic}

  .facts{display:flex; flex-direction:column; gap:8px; font-size:12.5px}
  .facts .f{display:flex; justify-content:space-between; gap:10px; padding-bottom:7px; border-bottom:1px dashed var(--line-soft)}
  .facts .f:last-child{border:none; padding-bottom:0}
  .facts .f b{font-family:"IBM Plex Mono",monospace; font-weight:500}

  footer{max-width:1160px; margin:0 auto; padding:0 clamp(16px,4vw,40px) 60px; color:var(--ink-dim); font-size:12px}
  footer p{margin:6px 0; max-width:70ch}

  @media (max-width:900px){
    .hero{grid-template-columns:1fr; text-align:center}
    .ringwrap{order:-1}
    .hero .lead{margin-left:auto; margin-right:auto}
    .startrow{justify-content:center}
    .stats{grid-template-columns:repeat(2,1fr)}
    .grid{grid-template-columns:1fr}
  }
  @media (max-width:440px){
    .stats{grid-template-columns:1fr 1fr}
    .cell{width:28px;height:28px}
  }
</style>

<div class="topbar">
  <div class="brand">
    <b>ALTERYX ADVANCED</b><span class="eyebrow">28-day countdown</span>
  </div>
  <div class="tb-actions">
    <button id="themeBtn" type="button" aria-label="Toggle colour theme"><span id="themeIcon">◑</span><span id="themeTxt">Auto</span></button>
    <button id="resetBtn" type="button">Reset progress</button>
  </div>
</div>

<main>
  <section class="hero">
    <div class="ringwrap">
      <div class="ring">
        <svg width="200" height="200" viewBox="0 0 200 200" aria-hidden="true">
          <circle cx="100" cy="100" r="86" fill="none" stroke="var(--ring-track)" stroke-width="16"/>
          <circle id="ringFg" cx="100" cy="100" r="86" fill="none" stroke="var(--accent)" stroke-width="16"
            stroke-linecap="round" stroke-dasharray="540.35" stroke-dashoffset="540.35"/>
        </svg>
        <div class="pct"><b id="ringPct">0%</b><small>plan complete</small></div>
      </div>
      <div class="eyebrow" id="taskCount">0 / 361 tasks</div>
    </div>

    <div>
      <p class="eyebrow">Alteryx Designer Advanced Certification</p>
      <h1>Understand every official topic, build it, predict its output — then sit the exam.</h1>
      <p class="lead">Six domains, 77 syllabus items, 4 target Weekly Challenges, 2 mock exams.
        Official pass mark <b class="mono">73%</b>; personal target <b class="mono">80–85%</b> before booking.
        Progress is saved in this browser.</p>
      <div class="startrow">
        <label for="startDate">Day&nbsp;1 =</label>
        <input type="date" id="startDate">
        <span id="dayNote">— set a start date to light up “today”.</span>
      </div>
      <div class="stats">
        <div class="stat"><span class="k">Day</span><span class="v tnum"><span id="stDay">–</span><small> / 28</small></span></div>
        <div class="stat"><span class="k">Topics est.</span><span class="v tnum"><span id="stTopics">0</span><small> / 77</small></span></div>
        <div class="stat"><span class="k">Study hrs est.</span><span class="v tnum"><span id="stHours">0</span><small> / 56</small></span></div>
        <div class="stat"><span class="k">Readiness</span><span class="v tnum"><span id="stReady">0</span><small>%</small></span></div>
      </div>
    </div>
  </section>

  <section class="strip">
    <p class="eyebrow">The 28 days — click a square to jump · fill = that day’s checklist done</p>
    <div class="cells" id="cells"></div>
  </section>

  <div class="grid">
    <div class="col">
      <div class="card today">
        <div class="hd"><h2>Today’s 2 hours</h2><span class="eyebrow" id="todayPct">0%</span></div>
        <div class="bd" id="todayBody"></div>
      </div>

      <div class="card">
        <div class="hd"><h2>28-day plan</h2><span class="eyebrow">theory 40 · hands-on 60 · recall 20 (min)</span></div>
        <div class="bd" style="padding:0"><div class="plan" id="plan"></div></div>
      </div>
    </div>

    <div class="col">
      <div class="card">
        <div class="hd"><h2>Domain progress</h2><span class="eyebrow">by exam weight</span></div>
        <div class="bd"><div class="dom" id="dom"></div></div>
      </div>

      <div class="card">
        <div class="hd"><h2>Weekly challenges</h2><span class="eyebrow">click status to cycle</span></div>
        <div class="bd"><div class="chal" id="chal"></div></div>
      </div>

      <div class="card">
        <div class="hd"><h2>Mock exams</h2><span class="eyebrow">pass 73 · target 82</span></div>
        <div class="bd"><div class="mock">
          <div class="in"><label for="m1">Practice Mock 1 (Day 27)</label><input type="number" id="m1" min="0" max="100" placeholder="–"><span>%</span></div>
          <div class="in"><label for="m2">Mock 2 (Day 28)</label><input type="number" id="m2" min="0" max="100" placeholder="–"><span>%</span></div>
          <div class="verdict"><b class="tnum" id="mockAvg">–</b><span>avg</span><span class="tag" id="mockTag">enter scores</span></div>
        </div></div>
      </div>

      <div class="card">
        <div class="hd"><h2>Weak areas</h2><span class="eyebrow">confidence ≤ 2</span></div>
        <div class="bd"><div class="weak">
          <div class="tags" id="weakTags"></div>
          <form id="weakForm"><input id="weakIn" placeholder="e.g. Spatial Match fan-out" maxlength="60"><button class="add" type="submit">Add</button></form>
        </div></div>
      </div>

      <div class="card">
        <div class="hd"><h2>Exam facts</h2><span class="eyebrow">from the official guide</span></div>
        <div class="bd"><div class="facts">
          <div class="f"><span>Questions</span><b>51 · multiple choice / select</b></div>
          <div class="f"><span>Time limit</span><b>2.5 hours</b></div>
          <div class="f"><span>Passing score</span><b>73%</b></div>
          <div class="f"><span>Practical items</span><b>4 points each</b></div>
          <div class="f"><span>Format</span><b>online · open book</b></div>
          <div class="f"><span>Retake</span><b>once every 24 h</b></div>
          <div class="f"><span>Valid for</span><b>2 years</b></div>
        </div></div>
      </div>
    </div>
  </div>
</main>

<footer>
  <p><b>How this relates to the Notion bundle.</b> This page mirrors the <span class="mono">Alteryx-Advanced-Notion-Tracker</span>
  folder (Master Topic Tracker, 28-Day Study Plan, Weekly Challenges, Mock Exams, Coverage Audit). Use whichever you prefer;
  the day-by-day checklists here are the same ones in <span class="mono">03-28-Day-Study-Plan.md</span>.</p>
  <p>“Topics est.”, “Study hrs est.” and “Readiness” are rough indicators derived from checklist completion + mock scores —
  the Notion trackers hold the authoritative per-topic status and confidence.</p>
  <p>Not affiliated with or endorsed by Alteryx. Syllabus content is quoted from the publicly published
  <em>Alteryx Designer Advanced Certification Exam Prep Guide</em> for personal study.</p>
</footer>

<script id="data" type="application/json">__DATA__</script>
<script>
(function(){
  "use strict";
  var DATA = JSON.parse(document.getElementById('data').textContent);
  var KEY = 'alteryx-adv-tracker-v1';
  var TOTAL_TASKS = DATA.plan.reduce(function(s,d){return s+d.tasks.length;},0);
  var CIRC = 2*Math.PI*86;

  var S = load();
  function load(){
    try{ var r = JSON.parse(localStorage.getItem(KEY)); if(r && typeof r==='object') return r; }catch(e){}
    return {};
  }
  function save(){ try{ localStorage.setItem(KEY, JSON.stringify(S)); }catch(e){} }
  S.done = S.done || {};            // "d3:5" -> true
  S.chal = S.chal || {};            // "#3" -> 0|1|2
  S.mocks = S.mocks || {};          // m1,m2
  S.weak = S.weak || [];
  S.theme = S.theme || 'auto';
  S.start = S.start || '';

  /* ---------- theme ---------- */
  var order = ['auto','light','dark'];
  var icons = {auto:'◑', light:'☀', dark:'☾'}, labels = {auto:'Auto', light:'Light', dark:'Dark'};
  function applyTheme(){
    if(S.theme==='auto') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', S.theme);
    document.getElementById('themeIcon').textContent = icons[S.theme];
    document.getElementById('themeTxt').textContent = labels[S.theme];
  }
  document.getElementById('themeBtn').addEventListener('click', function(){
    S.theme = order[(order.indexOf(S.theme)+1)%3]; applyTheme(); save();
  });
  applyTheme();

  /* ---------- helpers ---------- */
  function esc(s){ return s.replace(/[&<>"]/g, function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];}); }
  function md(s){ // tiny inline: `code` only, everything else escaped
    return esc(s).replace(/`([^`]+)`/g, '<code>$1</code>');
  }
  function domColor(k){ return k && k[0]==='D' ? 'var(--'+k.toLowerCase()+')' : 'var(--ink-dim)'; }
  function domName(k){ var d = DATA.domains.find(function(x){return x.key===k;}); return d?d.key+' · '+d.name:(k==='setup'?'Setup':'Revision & mocks'); }
  function dayDoneCount(n){ var d = DATA.plan[n-1], c=0; for(var i=0;i<d.tasks.length;i++) if(S.done['d'+n+':'+i]) c++; return c; }

  function currentDay(){
    if(!S.start) return 0;
    var ms = Date.now() - new Date(S.start+'T00:00:00').getTime();
    var d = Math.floor(ms/86400000)+1;
    return d<1?1:(d>28?28:d);
  }

  /* ---------- metrics ---------- */
  function domPct(key){
    var days = DATA.plan.filter(function(d){return d.domKey===key;});
    var t=0,c=0; days.forEach(function(d){ t+=d.tasks.length; c+=dayDoneCount(d.n); });
    return t? c/t : 0;
  }
  function render(){
    var doneTotal = 0;
    DATA.plan.forEach(function(d){ doneTotal += dayDoneCount(d.n); });
    var overall = TOTAL_TASKS? doneTotal/TOTAL_TASKS : 0;

    document.getElementById('ringPct').textContent = Math.round(overall*100)+'%';
    document.getElementById('ringFg').style.strokeDashoffset = (CIRC*(1-overall)).toFixed(1);
    document.getElementById('taskCount').textContent = doneTotal+' / '+TOTAL_TASKS+' tasks';

    // topics est = sum over domains of pct*topics
    var topics = 0;
    DATA.domains.forEach(function(dm){ topics += domPct(dm.key)*dm.topics; });
    topics = Math.round(topics);
    document.getElementById('stTopics').textContent = topics;
    document.getElementById('stHours').textContent = Math.round(overall*DATA.meta.totalHours);

    var cd = currentDay();
    document.getElementById('stDay').textContent = cd? cd : '–';

    var m1 = parseFloat(S.mocks.m1), m2 = parseFloat(S.mocks.m2);
    var mocksArr = [m1,m2].filter(function(x){return !isNaN(x);});
    var mockAvg = mocksArr.length? mocksArr.reduce(function(a,b){return a+b;},0)/mocksArr.length : 0;
    var challDone = DATA.challenges.filter(function(c){return S.chal[c.id]===2;}).length;
    var readiness = Math.round(
      0.55*(topics/DATA.meta.officialTopics*100) +
      0.35*(mockAvg) +
      0.10*(challDone/4*100)
    );
    readiness = Math.max(0, Math.min(100, readiness));
    document.getElementById('stReady').textContent = readiness;

    // mock verdict
    document.getElementById('mockAvg').textContent = mocksArr.length? Math.round(mockAvg)+'%' : '–';
    var mt = document.getElementById('mockTag');
    if(!mocksArr.length){ mt.textContent='enter scores'; mt.className='tag'; }
    else if(mockAvg>=DATA.meta.personalTarget){ mt.textContent='on target'; mt.className='tag go'; }
    else if(mockAvg>=DATA.meta.passScore){ mt.textContent='pass, below target'; mt.className='tag no'; }
    else { mt.textContent='below pass mark'; mt.className='tag no'; }

    renderCells(cd);
    renderToday(cd);
    renderPlanProgress();
    renderDom();
  }

  /* ---------- day strip ---------- */
  function renderCells(cd){
    var el = document.getElementById('cells'); el.innerHTML='';
    DATA.plan.forEach(function(d){
      var c = dayDoneCount(d.n), p = d.tasks.length? c/d.tasks.length : 0;
      var b = document.createElement('button');
      b.type='button';
      b.className = 'cell' + (p>=1?' full':'') + (d.n===cd?' today':'') + ((d.n-1)%7===0 && d.n!==1?' wk-start':'');
      b.title = 'Day '+d.n+' — '+d.title+' ('+c+'/'+d.tasks.length+')';
      b.innerHTML = '<span>'+d.n+'</span>' + (p>0 && p<1 ? '<i class="fill" style="height:'+(p*100)+'%"></i>' : (p>=1?'<i class="fill" style="height:100%"></i>':''));
      b.addEventListener('click', function(){
        var node = document.getElementById('day-'+d.n);
        node.open = true;
        node.scrollIntoView({behavior:'smooth', block:'center'});
      });
      el.appendChild(b);
    });
  }

  /* ---------- today card ---------- */
  function renderToday(cd){
    var host = document.getElementById('todayBody');
    if(!cd){
      host.innerHTML = '<div class="now"><p style="margin:0;color:var(--ink-dim);font-size:13px">Set your <b>Day&nbsp;1</b> start date above and this panel will show exactly what to do for today’s two hours.</p></div>';
      document.getElementById('todayPct').textContent = '–';
      return;
    }
    var d = DATA.plan[cd-1];
    var c = dayDoneCount(d.n);
    document.getElementById('todayPct').textContent = Math.round((c/d.tasks.length)*100)+'%';
    var chalChip = (d.challenge && d.challenge[0]==='#') ? '<span class="chip chal">🏆 '+esc(d.challenge)+'</span>' : '';
    var hardChip = d.hard ? '<span class="chip hard">⚡ heavier hands-on</span>' : '';
    host.innerHTML =
      '<div class="now">'+
        '<div class="d"><b>Day '+d.n+'</b>'+
          '<span class="chip dom"><span class="dot" style="background:'+domColor(d.domKey)+'"></span>'+esc(domName(d.domKey))+'</span>'+
          '<span class="chip">Week '+d.week+'</span></div>'+
        '<div class="t">'+esc(d.title)+'</div>'+
        '<div class="o">'+md(d.outcome)+'</div>'+
        '<div style="margin-top:9px;display:flex;gap:6px;flex-wrap:wrap">'+chalChip+hardChip+'</div>'+
      '</div>'+
      taskListHTML(d, 't');
    wireTasks(host, d);
  }

  function taskListHTML(d, ctx){
    var items = d.tasks.map(function(t,i){
      var on = !!S.done['d'+d.n+':'+i];
      var id = 't'+ctx+d.n+'_'+i;
      return '<li class="'+(on?'done':'')+'">'+
        '<input type="checkbox" id="'+id+'" data-d="'+d.n+'" data-i="'+i+'"'+(on?' checked':'')+'>'+
        '<label for="'+id+'">'+md(t)+'</label></li>';
    }).join('');
    return '<ul class="tasks">'+items+'</ul>';
  }
  function wireTasks(scope, d){
    scope.querySelectorAll('ul.tasks input').forEach(function(cb){
      cb.addEventListener('change', function(){
        var k = 'd'+cb.dataset.d+':'+cb.dataset.i;
        if(cb.checked) S.done[k]=true; else delete S.done[k];
        cb.closest('li').classList.toggle('done', cb.checked);
        save(); render();
      });
    });
  }

  /* ---------- plan accordion ---------- */
  function renderPlan(){
    var host = document.getElementById('plan'); host.innerHTML='';
    var lastWeek = 0;
    DATA.plan.forEach(function(d){
      var det = document.createElement('details');
      det.className='day'; det.id='day-'+d.n;
      var chal = (d.challenge && d.challenge[0]==='#') ? '<span class="chip chal">🏆 '+esc(d.challenge)+'</span>' : '';
      var hard = d.hard ? '<span class="chip hard" title="heavier hands-on">⚡</span>' : '';
      det.innerHTML =
        '<summary class="row">'+
          '<span class="num">'+d.n+'<small>WK'+d.week+'</small></span>'+
          '<span class="mid">'+
            '<span class="tt"><span class="dot" style="background:'+domColor(d.domKey)+'"></span>'+esc(d.title)+' '+hard+'</span>'+
            '<span class="sub">'+chal+'</span>'+
          '</span>'+
          '<span style="display:flex;align-items:center;gap:8px">'+
            '<span class="bar"><i data-bar="'+d.n+'"></i></span>'+
            '<svg class="caret" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M6 3l6 5-6 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'+
          '</span>'+
        '</summary>'+
        '<div class="panel">'+
          '<p style="margin:4px 10px 2px;font-size:12px;color:var(--ink-dim)">'+md(d.outcome)+'</p>'+
          taskListHTML(d, 'p')+
        '</div>';
      // native <summary> is a button; ensure it doesn't render default marker
      det.querySelector('summary').style.listStyle='none';
      host.appendChild(det);
      wireTasks(det, d);
    });
  }
  function renderPlanProgress(){
    var cd = currentDay();
    DATA.plan.forEach(function(d){
      var bar = document.querySelector('[data-bar="'+d.n+'"]');
      if(bar){ var c=dayDoneCount(d.n); bar.style.width = (d.tasks.length? (c/d.tasks.length*100):0)+'%'; }
      var det = document.getElementById('day-'+d.n);
      if(det){
        det.dataset.today = (cd===d.n) ? '1' : '0';
        // keep the accordion checkboxes in sync with state (they may be changed from the Today card)
        det.querySelectorAll('ul.tasks input').forEach(function(cb){
          var on = !!S.done['d'+cb.dataset.d+':'+cb.dataset.i];
          if(cb.checked !== on){ cb.checked = on; }
          cb.closest('li').classList.toggle('done', on);
        });
      }
    });
  }

  /* ---------- domain widget ---------- */
  function renderDom(){
    var host = document.getElementById('dom'); host.innerHTML='';
    DATA.domains.slice().sort(function(a,b){return b.weight-a.weight;}).forEach(function(dm){
      var p = domPct(dm.key);
      var row = document.createElement('div'); row.className='r';
      row.innerHTML =
        '<span class="nm"><span class="dot" style="background:var(--'+dm.key.toLowerCase()+')"></span>'+dm.key+' · '+esc(dm.name)+'</span>'+
        '<span class="vv tnum">'+Math.round(p*100)+'% <span class="wt">·&nbsp;'+dm.weight+'% wt</span></span>'+
        '<span class="track"><i style="width:'+(p*100)+'%;background:var(--'+dm.key.toLowerCase()+')"></i></span>';
      host.appendChild(row);
    });
  }

  /* ---------- challenges ---------- */
  var chalStates = ['Not started','Attempted','Completed'];
  function renderChal(){
    var host = document.getElementById('chal'); host.innerHTML='';
    DATA.challenges.forEach(function(c){
      var st = S.chal[c.id]||0;
      var row = document.createElement('div'); row.className='c';
      row.innerHTML =
        '<span class="id">'+c.id+'</span>'+
        '<span class="nm">'+esc(c.name)+'<small>'+esc(c.day)+' · '+esc(c.focus)+'</small></span>'+
        '<button type="button" class="st s'+st+'" data-id="'+c.id+'">'+chalStates[st]+'</button>';
      host.appendChild(row);
    });
    host.querySelectorAll('button[data-id]').forEach(function(b){
      b.addEventListener('click', function(){
        var id=b.dataset.id; S.chal[id]=((S.chal[id]||0)+1)%3; save(); renderChal(); render();
      });
    });
  }

  /* ---------- weak areas ---------- */
  function renderWeak(){
    var host = document.getElementById('weakTags'); host.innerHTML='';
    if(!S.weak.length){ host.innerHTML='<span class="empty">Nothing flagged — add topics you score ≤ 2 confidence on.</span>'; return; }
    S.weak.forEach(function(w,idx){
      var t=document.createElement('span'); t.className='tag';
      t.innerHTML = esc(w)+' <button type="button" aria-label="remove" data-x="'+idx+'">×</button>';
      host.appendChild(t);
    });
    host.querySelectorAll('button[data-x]').forEach(function(b){
      b.addEventListener('click', function(){ S.weak.splice(+b.dataset.x,1); save(); renderWeak(); });
    });
  }
  document.getElementById('weakForm').addEventListener('submit', function(e){
    e.preventDefault();
    var v = document.getElementById('weakIn').value.trim();
    if(v){ S.weak.push(v); document.getElementById('weakIn').value=''; save(); renderWeak(); }
  });

  /* ---------- mocks + start date ---------- */
  var sd = document.getElementById('startDate');
  sd.value = S.start || '';
  sd.addEventListener('change', function(){ S.start = sd.value; save(); updateDayNote(); render(); renderPlan(); renderPlanProgress(); });
  function updateDayNote(){
    var cd = currentDay();
    document.getElementById('dayNote').textContent = cd
      ? '— you are on Day '+cd+' of 28.'
      : '— set a start date to light up “today”.';
  }
  ['m1','m2'].forEach(function(id){
    var el=document.getElementById(id); el.value = S.mocks[id]!=null? S.mocks[id] : '';
    el.addEventListener('input', function(){
      var v=parseFloat(el.value);
      if(el.value===''){ delete S.mocks[id]; } else { S.mocks[id]=Math.max(0,Math.min(100,v)); }
      save(); render();
    });
  });

  /* ---------- reset ---------- */
  document.getElementById('resetBtn').addEventListener('click', function(){
    if(!confirm('Clear all saved progress (checklists, challenges, mocks, weak areas, start date) on this device?')) return;
    S = {done:{},chal:{},mocks:{},weak:[],theme:S.theme,start:''};
    save(); sd.value=''; document.getElementById('m1').value=''; document.getElementById('m2').value='';
    updateDayNote(); renderPlan(); renderChal(); renderWeak(); render();
  });

  /* ---------- boot ---------- */
  renderPlan();
  renderChal();
  renderWeak();
  updateDayNote();
  render();
})();
</script>
"""

out = HTML.replace("__DATA__", data_js)
dest = pathlib.Path(r"C:\Users\Madhavi\OneDrive\Desktop\Alteryx-Advanced-Notion-Tracker\alteryx-advanced-tracker.html")
dest.write_text(out, encoding="utf-8")
print("wrote", dest, len(out), "bytes")
