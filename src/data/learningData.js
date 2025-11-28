// data/learningData.js

export const skills = [
  // Phase 0 / foundational
  {
    id: "linux-basics",
    label: "Linux basics (ls, cd, tail, grep)",
    category: "scripting",
  },
  {
    id: "http-basics",
    label: "HTTP basics (methods, status codes)",
    category: "observability",
  },

  // SQL
  {
    id: "sql-select",
    label: "SQL: SELECT, WHERE, ORDER BY",
    category: "sql",
  },
  {
    id: "sql-joins",
    label: "SQL: INNER / LEFT JOIN",
    category: "sql",
  },
  {
    id: "sql-group-by",
    label: "SQL: GROUP BY & aggregates",
    category: "sql",
  },

  // AWS
  {
    id: "aws-overview",
    label: "AWS overview & core concepts",
    category: "aws",
  },
  {
    id: "aws-lambda",
    label: "AWS Lambda basics",
    category: "aws",
  },
  {
    id: "aws-rds",
    label: "Aurora RDS (MySQL) basics",
    category: "aws",
  },
  {
    id: "aws-cloudwatch",
    label: "CloudWatch logs & metrics",
    category: "observability",
  },

  // Scripting
  {
    id: "python-basics",
    label: "Python basics for scripting",
    category: "scripting",
  },
  {
    id: "rest-apis",
    label: "REST APIs & JSON",
    category: "scripting",
  },
  {
    id: "postman",
    label: "Using Postman to test APIs",
    category: "observability",
  },

  // Soft skills / incident
  {
    id: "incident-comm",
    label: "Incident communication & ticket notes",
    category: "soft",
  },
  {
    id: "root-cause",
    label: "Root cause analysis mindset",
    category: "soft",
  },
];

export const resources = [
  {
    id: "sql-w3",
    title: "W3Schools SQL Tutorial",
    url: "https://www.w3schools.com/sql/",
    type: "doc",
  },
  {
    id: "aws-skillbuilder",
    title: "AWS Skill Builder (free training)",
    url: "https://explore.skillbuilder.aws/",
    type: "course",
  },
  {
    id: "aws-cloud-practitioner",
    title: "AWS Cloud Practitioner Essentials",
    url: "https://www.aws.training/Details/Curriculum?id=27076",
    type: "course",
  },
  {
    id: "python-beginners",
    title: "Python for Beginners (official)",
    url: "https://www.python.org/about/gettingstarted/",
    type: "doc",
  },
  {
    id: "postman-learn",
    title: "Postman Learning Center",
    url: "https://learning.postman.com/",
    type: "doc",
  },

  // ✅ New Linux resources for Phase 0
  {
    id: "linux-journey",
    title: "Linux Journey (beginner-friendly lessons)",
    url: "https://linuxjourney.com/",
    type: "course",
  },
  {
    id: "overthewire-bandit",
    title: "OverTheWire: Bandit (hands-on Linux wargame)",
    url: "https://overthewire.org/wargames/bandit/",
    type: "practice",
  },
  {
    id: "linux-command-handbook",
    title: "Linux Command Line Handbook",
    url: "https://www.freecodecamp.org/news/the-linux-commands-handbook/",
    type: "doc",
  },

  // ✅ New incident / ticket / RCA resources for Phase 4
  {
    id: "atlassian-incident-handbook",
    title: "Atlassian Incident Management Handbook",
    url: "https://www.atlassian.com/incident-management/handbook",
    type: "doc",
  },
  {
    id: "atlassian-major-incident",
    title: "Major Incident Management (Atlassian)",
    url: "https://www.atlassian.com/incident-management/itsm/major-incident-management",
    type: "doc",
  },
  {
    id: "bmc-incident-overview",
    title: "ITIL Incident Management Overview (BMC)",
    url: "https://docs.bmc.com/xwiki/bin/view/Service-Management/IT-Service-Management/BMC-Helix-ITSM-Service-Desk/servicedesk251/Getting-started/Key-concepts/Incident-Management-overview/",
    type: "doc",
  },
  {
    id: "smartsheet-rca",
    title: "Smartsheet Root Cause Analysis Templates",
    url: "https://www.smartsheet.com/free-root-cause-analysis-templates-complete-collection",
    type: "doc",
  },
];


export const phases = [
    {
    id: "phase-0",
    title: "Phase 0 — Foundations",
    timeframe: "2–4 weeks",
    goal: "Get comfortable with basic Linux, terminals, and HTTP fundamentals.",
    description:
      "Quick pass to make sure you're comfortable in a terminal and understand how the web works at a basic level.",
    skillIds: ["linux-basics", "http-basics"],
    resourceIds: ["linux-journey", "overthewire-bandit", "linux-command-handbook"],
  },

  {
    id: "phase-1",
    title: "Phase 1 — SQL for Production Support",
    timeframe: "4–6 weeks",
    goal: "Be able to write queries to debug data issues and validate changes.",
    description:
      "Focus on SELECTs, joins, and aggregates. You should feel comfortable reading and writing queries against real tables.",
    skillIds: ["sql-select", "sql-joins", "sql-group-by"],
    resourceIds: ["sql-w3"],
  },
  {
    id: "phase-2",
    title: "Phase 2 — AWS & Cloud Basics",
    timeframe: "6–8 weeks",
    goal:
      "Understand the main AWS services used in production support and how they fit together.",
    description:
      "Get a mental map of Lambda, RDS, S3, DynamoDB, and CloudWatch. You don't have to be an expert yet—just understand what they are and when they're used.",
    skillIds: ["aws-overview", "aws-lambda", "aws-rds", "aws-cloudwatch"],
    resourceIds: ["aws-skillbuilder", "aws-cloud-practitioner"],
  },
  {
    id: "phase-3",
    title: "Phase 3 — Scripting & APIs",
    timeframe: "6–8 weeks",
    goal: "Write small scripts to call APIs, parse data, and automate checks.",
    description:
      "Use Python or Node/TypeScript to talk to APIs, work with JSON, and build small utilities that support debugging.",
    skillIds: ["python-basics", "rest-apis", "postman"],
    resourceIds: ["python-beginners", "postman-learn"],
  },
  {
    id: "phase-4",
    title: "Phase 4 — Observability & Incidents",
    timeframe: "4–8 weeks",
    goal:
      "Think like someone who owns production behavior and can communicate clearly during incidents.",
    description:
      "Learn how to read logs, correlate metrics to issues, and write clear notes. This is where soft skills and technical skills meet.",
    skillIds: ["incident-comm", "root-cause"],
    resourceIds: [
      "atlassian-incident-handbook",
      "atlassian-major-incident",
      "bmc-incident-overview",
      "smartsheet-rca",
    ],
  },
];
