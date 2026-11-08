export type SectionId =
  | "overview"
  | "cases"
  | "signals"
  | "sources"
  | "canvas"
  | "compare"
  | "brief";

export type CaseStatus = "Monitoring" | "Draft" | "Deciding" | "Archived";
export type SignalStatus = "New" | "Triaged" | "Linked";

export type CaseFile = {
  id: string;
  title: string;
  hypothesis: string;
  owner: string;
  initials: string;
  status: CaseStatus;
  confidence: number;
  tags: string[];
  updated: string;
  due: string;
  sourceCount: number;
  signalCount: number;
  accent: string;
};

export type Source = {
  id: string;
  title: string;
  publisher: string;
  kind: "Report" | "Filing" | "News" | "Dataset" | "Note";
  freshness: string;
  reliability: "High" | "Medium" | "Low";
  date: string;
  caseId?: string;
};

export type Signal = {
  id: string;
  title: string;
  excerpt: string;
  source: string;
  impact: "High" | "Medium" | "Low";
  urgency: "Now" | "Soon" | "Watch";
  status: SignalStatus;
  age: string;
  caseId?: string;
};

export const caseFiles: CaseFile[] = [
  {
    id: "atlas",
    title: "Atlas — European grid resilience",
    hypothesis: "Capacity bottlenecks will become a strategic constraint before 2028.",
    owner: "Amira R.",
    initials: "AR",
    status: "Deciding",
    confidence: 78,
    tags: ["energy", "europe", "infrastructure"],
    updated: "18 min ago",
    due: "Today",
    sourceCount: 18,
    signalCount: 7,
    accent: "lime",
  },
  {
    id: "saffron",
    title: "Saffron — AI inference economics",
    hypothesis: "Inference cost curves are creating a new moat below the model layer.",
    owner: "Louis M.",
    initials: "LM",
    status: "Monitoring",
    confidence: 64,
    tags: ["ai", "semis", "unit economics"],
    updated: "2 hr ago",
    due: "Tomorrow",
    sourceCount: 24,
    signalCount: 11,
    accent: "orange",
  },
  {
    id: "northstar",
    title: "Northstar — Logistics normalization",
    hypothesis: "Freight normalization will expose structural winners, not a broad rebound.",
    owner: "Noah T.",
    initials: "NT",
    status: "Draft",
    confidence: 51,
    tags: ["logistics", "macro", "public markets"],
    updated: "Yesterday",
    due: "14 Nov",
    sourceCount: 11,
    signalCount: 4,
    accent: "blue",
  },
  {
    id: "cobalt",
    title: "Cobalt — Battery recycling capacity",
    hypothesis: "Recycling economics turn attractive as the first dense wave of end-of-life packs arrives.",
    owner: "Maya K.",
    initials: "MK",
    status: "Archived",
    confidence: 86,
    tags: ["climate", "materials"],
    updated: "12 Oct",
    due: "Closed",
    sourceCount: 32,
    signalCount: 15,
    accent: "violet",
  },
];

export const sources: Source[] = [
  {
    id: "src-01",
    title: "European power grid action plan",
    publisher: "European Commission",
    kind: "Report",
    freshness: "Fresh",
    reliability: "High",
    date: "08 Nov 2026",
    caseId: "atlas",
  },
  {
    id: "src-02",
    title: "Hyperscaler capex tracker — Q3",
    publisher: "SignalDesk Research",
    kind: "Dataset",
    freshness: "Fresh",
    reliability: "High",
    date: "07 Nov 2026",
    caseId: "saffron",
  },
  {
    id: "src-03",
    title: "Transmission queues are the new bottleneck",
    publisher: "Gridline Journal",
    kind: "News",
    freshness: "3 days",
    reliability: "Medium",
    date: "05 Nov 2026",
    caseId: "atlas",
  },
  {
    id: "src-04",
    title: "Semiconductor supply chain — field notes",
    publisher: "L. Martin",
    kind: "Note",
    freshness: "1 week",
    reliability: "Medium",
    date: "01 Nov 2026",
    caseId: "saffron",
  },
  {
    id: "src-05",
    title: "10-K: fleet utilization and pricing",
    publisher: "FreightWorks",
    kind: "Filing",
    freshness: "2 weeks",
    reliability: "High",
    date: "24 Oct 2026",
    caseId: "northstar",
  },
  {
    id: "src-06",
    title: "Recycling yields — 2025 cohort",
    publisher: "Circular Materials Lab",
    kind: "Dataset",
    freshness: "1 month",
    reliability: "High",
    date: "04 Oct 2026",
    caseId: "cobalt",
  },
];

export const signals: Signal[] = [
  {
    id: "sig-01",
    title: "Two German TSOs move queue reform forward",
    excerpt: "Consultation language shifts from voluntary coordination to enforceable milestones.",
    source: "European Commission",
    impact: "High",
    urgency: "Now",
    status: "New",
    age: "18 min",
    caseId: "atlas",
  },
  {
    id: "sig-02",
    title: "Inference spend is decoupling from training spend",
    excerpt: "New capacity guidance points to a flatter training curve and a steeper serving curve.",
    source: "SignalDesk Research",
    impact: "High",
    urgency: "Soon",
    status: "Triaged",
    age: "2 hr",
    caseId: "saffron",
  },
  {
    id: "sig-03",
    title: "Port dwell time normalizes unevenly across lanes",
    excerpt: "Headline normalization hides a widening gap between contract and spot freight.",
    source: "FreightWorks",
    impact: "Medium",
    urgency: "Watch",
    status: "Linked",
    age: "Yesterday",
    caseId: "northstar",
  },
  {
    id: "sig-04",
    title: "Transformer connection requests hit a five-year high",
    excerpt: "The queue is now a leading indicator for substation equipment orders.",
    source: "Gridline Journal",
    impact: "High",
    urgency: "Now",
    status: "New",
    age: "Yesterday",
    caseId: "atlas",
  },
  {
    id: "sig-05",
    title: "Black mass pricing settles above internal hurdle",
    excerpt: "Early contracts support the recycled feedstock case, but collection density remains open.",
    source: "Circular Materials Lab",
    impact: "Low",
    urgency: "Watch",
    status: "Triaged",
    age: "3 days",
    caseId: "cobalt",
  },
];

export const navItems: { id: SectionId; label: string; short: string }[] = [
  { id: "overview", label: "Overview", short: "01" },
  { id: "cases", label: "Case files", short: "02" },
  { id: "signals", label: "Signal inbox", short: "03" },
  { id: "sources", label: "Sources", short: "04" },
  { id: "canvas", label: "Analysis canvas", short: "05" },
  { id: "compare", label: "Compare", short: "06" },
  { id: "brief", label: "Decision brief", short: "07" },
];

export const chartData = [
  { label: "01", value: 42, secondary: 24 },
  { label: "02", value: 56, secondary: 32 },
  { label: "03", value: 48, secondary: 38 },
  { label: "04", value: 67, secondary: 41 },
  { label: "05", value: 61, secondary: 55 },
  { label: "06", value: 78, secondary: 59 },
  { label: "07", value: 74, secondary: 66 },
  { label: "08", value: 86, secondary: 72 },
  { label: "09", value: 81, secondary: 78 },
  { label: "10", value: 92, secondary: 84 },
  { label: "11", value: 88, secondary: 80 },
  { label: "12", value: 96, secondary: 91 },
];

export const activity = [
  { initials: "AR", text: "Amira linked 2 sources to Atlas", time: "18 min ago", tone: "lime" },
  { initials: "LM", text: "Louis moved Saffron to Monitoring", time: "2 hr ago", tone: "orange" },
  { initials: "NT", text: "Noah added a counter-argument", time: "Yesterday", tone: "blue" },
  { initials: "MK", text: "Maya exported the Cobalt brief", time: "12 Oct", tone: "violet" },
];

export const compareRows = [
  { criterion: "Execution speed", weight: 30, atlas: 82, saffron: 66, northstar: 58 },
  { criterion: "Evidence quality", weight: 25, atlas: 91, saffron: 78, northstar: 63 },
  { criterion: "Downside visibility", weight: 20, atlas: 74, saffron: 69, northstar: 48 },
  { criterion: "Optionality", weight: 15, atlas: 68, saffron: 88, northstar: 76 },
  { criterion: "Near-term signal", weight: 10, atlas: 86, saffron: 71, northstar: 54 },
];
