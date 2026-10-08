// Atomic topics. Every blueprint objective maps to one or more topics.
// `day` is the day the topic is first taught; `obj` indexes DOMAINS[].objectives.
export const TOPICS = [
  // D1 — Advanced Data Preparation & Transformation (27%)
  { id: 'd1-mrf',         domain: 'D1', day: 1,  obj: [0],    name: 'Multi-Row Formula: row references & Group By' },
  { id: 'd1-mrf-missing', domain: 'D1', day: 1,  obj: [1],    name: 'Multi-Row Formula: rows that do not exist' },
  { id: 'd1-mff',         domain: 'D1', day: 2,  obj: [2],    name: 'Multi-Field Formula: overwrite & change type' },
  { id: 'd1-fx-text',     domain: 'D1', day: 2,  obj: [3],    name: 'String functions: Trim, GetWord, FindString' },
  { id: 'd1-fx-num',      domain: 'D1', day: 2,  obj: [3],    name: 'Conversion & math: ToNumber, Round' },
  { id: 'd1-datetime',    domain: 'D1', day: 3,  obj: [3, 5], name: 'DateTime functions & DateTime tool' },
  { id: 'd1-filter',      domain: 'D1', day: 3,  obj: [4],    name: 'Filter: compound AND/OR expressions' },
  { id: 'd1-genrows',     domain: 'D1', day: 4,  obj: [6],    name: 'Generate Rows' },
  { id: 'd1-regex-fx',    domain: 'D1', day: 5,  obj: [3, 7], name: 'REGEX_Match & REGEX_Replace' },
  { id: 'd1-regex-tool',  domain: 'D1', day: 5,  obj: [7],    name: 'RegEx tool: Replace / Tokenize / Parse / Match' },
  { id: 'd1-findreplace', domain: 'D1', day: 6,  obj: [7],    name: 'Find Replace (multiple items)' },
  { id: 'd1-joinmulti',   domain: 'D1', day: 6,  obj: [7],    name: 'Join Multiple' },
  { id: 'd1-investigate', domain: 'D1', day: 7,  obj: [8],    name: 'Field Summary & Frequency Table' },
  { id: 'd1-correlation', domain: 'D1', day: 7,  obj: [8],    name: 'Association Analysis, Pearson vs Spearman' },

  // D4 — Data Sources (15%)
  { id: 'd4-io',          domain: 'D4', day: 8,  obj: [1],    name: 'Input/Output Data advanced options' },
  { id: 'd4-directory',   domain: 'D4', day: 8,  obj: [1],    name: 'Directory tool' },
  { id: 'd4-dyninput',    domain: 'D4', day: 9,  obj: [1],    name: 'Dynamic Input' },
  { id: 'd4-dynrename',   domain: 'D4', day: 9,  obj: [1],    name: 'Dynamic Rename' },
  { id: 'd4-blob',        domain: 'D4', day: 10, obj: [1],    name: 'Blob Input / Convert / Output' },
  { id: 'd4-download',    domain: 'D4', day: 10, obj: [0],    name: 'Download tool (HTTP / APIs)' },
  { id: 'd4-dcm',         domain: 'D4', day: 11, obj: [0],    name: 'Connectors ribbon & DCM' },
  { id: 'd4-indb',        domain: 'D4', day: 11, obj: [0],    name: 'In-Database tools' },

  // D2 — Reporting (10%)
  { id: 'd2-table',       domain: 'D2', day: 12, obj: [0],    name: 'Table tool' },
  { id: 'd2-chart',       domain: 'D2', day: 12, obj: [0],    name: 'Interactive Chart & Report Text' },
  { id: 'd2-layout',      domain: 'D2', day: 13, obj: [1],    name: 'Layout tool' },
  { id: 'd2-render',      domain: 'D2', day: 13, obj: [1],    name: 'Render tool' },
  { id: 'd2-email',       domain: 'D2', day: 13, obj: [1],    name: 'Email tool' },

  // D3 — Spatial (10%)
  { id: 'd3-points',      domain: 'D3', day: 15, obj: [0],    name: 'Create Points & spatial Formula/Summarize' },
  { id: 'd3-process',     domain: 'D3', day: 16, obj: [1],    name: 'Intersect, split, buffer (Spatial Process, Buffer)' },
  { id: 'd3-match',       domain: 'D3', day: 16, obj: [1],    name: 'Spatial Match: target vs universe' },
  { id: 'd3-tradearea',   domain: 'D3', day: 16, obj: [1],    name: 'Trade Area' },
  { id: 'd3-distance',    domain: 'D3', day: 17, obj: [2],    name: 'Distance tool' },
  { id: 'd3-nearest',     domain: 'D3', day: 17, obj: [2],    name: 'Find Nearest' },

  // D5 — Macros (18%)
  { id: 'd5-standard',    domain: 'D5', day: 18, obj: [0, 1], name: 'Standard macros' },
  { id: 'd5-macroio',     domain: 'D5', day: 18, obj: [1],    name: 'Macro Input/Output & Show Field Map' },
  { id: 'd5-designer',    domain: 'D5', day: 18, obj: [1],    name: 'Interface Designer, debug & macro repository' },
  { id: 'd5-batch',       domain: 'D5', day: 19, obj: [0, 1], name: 'Batch macros & Control Parameter' },
  { id: 'd5-iterative',   domain: 'D5', day: 20, obj: [0, 1], name: 'Iterative macros' },
  { id: 'd5-choose',      domain: 'D5', day: 20, obj: [0],    name: 'Choosing standard vs batch vs iterative' },

  // D6 — Apps & Productionizing (20%)
  { id: 'd6-interface',   domain: 'D6', day: 22, obj: [3],    name: 'Interface tools (UI controls)' },
  { id: 'd6-appdesign',   domain: 'D6', day: 22, obj: [4],    name: 'App design & Interface Designer' },
  { id: 'd6-action',      domain: 'D6', day: 23, obj: [0],    name: 'Action tool' },
  { id: 'd6-condition',   domain: 'D6', day: 23, obj: [1],    name: 'Condition tool boundaries' },
  { id: 'd6-error',       domain: 'D6', day: 23, obj: [2],    name: 'Error Message & error records' },
  { id: 'd6-block',       domain: 'D6', day: 24, obj: [5],    name: 'Block Until Done' },
  { id: 'd6-runcmd',      domain: 'D6', day: 24, obj: [5],    name: 'Run Command & Email Event' },
  { id: 'd6-dynselect',   domain: 'D6', day: 24, obj: [5],    name: 'Dynamic Select' },
];

export const topicById = Object.fromEntries(TOPICS.map(t => [t.id, t]));
