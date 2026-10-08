// Six domains of the Alteryx Designer Advanced Certification exam blueprint.
// Weights and objectives follow the public "Designer Advanced Certification Exam Prep Guide".
export const EXAM = {
  questions: 51,
  minutes: 150,
  passMark: 73,
  format: 'Online, open book. Multiple choice and multiple select; partial credit on multi-select; practical items worth more.',
};

export const DOMAINS = [
  {
    id: 'D1', short: 'Data Prep', name: 'Advanced Data Preparation & Transformation', weight: 27, color: 'd1',
    objectives: [
      'Configure the Multi-Row Formula tool and identify output from expressions',
      'Configure the Multi-Row Formula tool for values for rows that do not exist',
      'Configure the Multi-Field Formula tool for overwriting fields and changing data types',
      'Formula functions: DateTime(), ToNumber(), Round(), REGEX_Match(), REGEX_Replace(), GetWord(), FindString(), Trim()',
      'Configure the Filter tool using compound AND/OR expressions',
      'DateTime functions across multiple tools',
      'Use the Generate Rows tool',
      'Parse and join: Find Replace (multiple items), Join Multiple, RegEx tool, parse vs. match, identify the regex for a given output',
      'Investigate data: Association Analysis, Field Summary, Frequency Table, Pearson and Spearman Correlation',
    ],
  },
  {
    id: 'D6', short: 'Apps & Prod', name: 'Analytical Applications & Productionizing', weight: 20, color: 'd6',
    objectives: [
      'Configure the Action tool',
      'Determine the boundaries of the Condition tool',
      'Identify functionality of the Error Message tool and the resulting records with an error',
      'User Interface tools: Check Box, Drop Down, File/Folder Browse, List Box, Numeric Up Down, Radio Button, Text Box, DCM Connection',
      'Design analytical applications: Interface tools, Interface Designer, reasons for using an app',
      'Block Until Done, Email Event, Run Command, Dynamic Select',
    ],
  },
  {
    id: 'D5', short: 'Macros', name: 'Macros', weight: 18, color: 'd5',
    objectives: [
      'Determine the use case and functionality of batch, iterative, and standard macros',
      'Configure macros: Macro Input/Output, Show Field Map, Interface Designer, macro debug, macro repository in User Settings',
    ],
  },
  {
    id: 'D4', short: 'Data Sources', name: 'Data Sources', weight: 15, color: 'd4',
    objectives: [
      'Connect to external sources: Connectors ribbon, Download tool, In-Database tools, Data Connection Manager (DCM)',
      'Advanced inputs: Directory, Input/Output Data, Dynamic Input, Dynamic Rename, Blob Convert/Input/Output',
    ],
  },
  {
    id: 'D2', short: 'Reporting', name: 'Reporting Tools', weight: 10, color: 'd2',
    objectives: [
      'Configure tables and charts',
      'Configure the Layout, Render, and Email tools',
    ],
  },
  {
    id: 'D3', short: 'Spatial', name: 'Spatial Analytics Basics', weight: 10, color: 'd3',
    objectives: [
      'Create spatial objects with Create Points; spatial functionality in Formula and Summarize',
      'Combine spatial objects: intersections, splits, buffers; Spatial Match target/universe; Trade Area',
      'Calculate distances: Distance tool, Find Nearest tool, Target and Universe anchors',
    ],
  },
];

export const domainById = Object.fromEntries(DOMAINS.map(d => [d.id, d]));
