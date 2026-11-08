import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleAlert,
  Clock3,
  ExternalLink,
  FileText,
  Filter,
  GitBranch,
  Info,
  Link2,
  MoreHorizontal,
  Plus,
  Printer,
  RefreshCcw,
  Search,
  SlidersHorizontal,
  Sparkles,
  Tag,
  Target,
  TrendingUp,
  UploadCloud,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import {
  activity,
  caseFiles,
  chartData,
  compareRows,
  signals as seedSignals,
  sources,
  type CaseFile,
  type SectionId,
  type Signal,
} from "@/lib/demoData";
import { cn } from "@/lib/utils";

const sectionMeta: Record<SectionId, { eyebrow: string; title: string; description: string }> = {
  overview: { eyebrow: "Monday · 08 Nov 2026", title: "Good morning, Amira.", description: "Here's what changed while you were away." },
  cases: { eyebrow: "Workspace / dossiers", title: "Keep the thesis moving.", description: "The active questions your team is carrying forward." },
  signals: { eyebrow: "Workspace / inbox", title: "The signal inbox.", description: "Qualify noise before it becomes a blind spot." },
  sources: { eyebrow: "Workspace / library", title: "A trail worth following.", description: "The sources behind the work, in one searchable place." },
  canvas: { eyebrow: "Workspace / reasoning", title: "Make the logic visible.", description: "Trace a point of view from evidence to conclusion." },
  compare: { eyebrow: "Workspace / decision support", title: "Put the options on the table.", description: "Compare scenarios against the criteria that matter." },
  brief: { eyebrow: "Workspace / output", title: "A brief people can act on.", description: "Turn the live dossier into a clear next call." },
};

function PageHeading({ section, action }: { section: SectionId; action?: React.ReactNode }) {
  const meta = sectionMeta[section];
  return <div className="page-heading"><div><div className="workspace-eyebrow">{meta.eyebrow}</div><h1>{meta.title}</h1><p>{meta.description}</p></div>{action && <div className="page-heading-action">{action}</div>}</div>;
}

function StatusBadge({ status }: { status: CaseFile["status"] }) {
  return <span className={cn("status-badge", `status-${status.toLowerCase()}`)}><span />{status}</span>;
}

function Confidence({ value }: { value: number }) {
  return <div className="confidence-bar"><span style={{ width: `${value}%` }} /><b>{value}%</b></div>;
}

function MetricCard({ label, value, delta, tone = "default", note }: { label: string; value: string; delta: string; tone?: "default" | "accent" | "warning"; note?: string }) {
  return <div className={cn("metric-card", `metric-${tone}`)}><div className="metric-card-top"><span>{label}</span><MoreHorizontal size={15} /></div><strong>{value}</strong><div className="metric-delta"><span className={cn(delta.startsWith("+") ? "delta-up" : "delta-down")}><TrendingUp size={13} /> {delta}</span>{note && <span className="metric-note">{note}</span>}</div></div>;
}

function TinyChart() {
  const points = chartData.map((point, index) => `${(index / (chartData.length - 1)) * 100},${100 - point.value}`).join(" ");
  const secondary = chartData.map((point, index) => `${(index / (chartData.length - 1)) * 100},${100 - point.secondary}`).join(" ");
  return <div className="chart-wrap"><div className="chart-legend"><span><i className="legend-dot lime" /> evidence volume</span><span><i className="legend-dot muted" /> resolved</span><span className="chart-period">Last 30 days <ChevronDown size={13} /></span></div><svg className="activity-chart" viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-label="Evidence volume over the last 30 days"><defs><linearGradient id="areaFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#d8f36b" stopOpacity=".24" /><stop offset="1" stopColor="#d8f36b" stopOpacity="0" /></linearGradient></defs><path d={`M ${points} L 100 100 L 0 100 Z`} fill="url(#areaFill)" /><polyline points={secondary} fill="none" stroke="#6d7772" strokeWidth="1.4" strokeDasharray="2 2" vectorEffect="non-scaling-stroke" /><polyline points={points} fill="none" stroke="#d8f36b" strokeWidth="2.3" vectorEffect="non-scaling-stroke" /></svg><div className="chart-axis"><span>09 Oct</span><span>16 Oct</span><span>23 Oct</span><span>30 Oct</span><span>08 Nov</span></div></div>;
}

function Overview({ onNavigate }: { onNavigate: (section: SectionId) => void }) {
  const prioritySignals = seedSignals.filter(signal => signal.urgency === "Now");
  return <div className="section-stack">
    <PageHeading section="overview" action={<><button className="button button-ghost" onClick={() => toast.success("Workspace refreshed", { description: "All demo signals are up to date." })}><RefreshCcw size={15} /> Refresh</button><button className="button button-accent" onClick={() => onNavigate("signals")}><Plus size={16} /> Capture signal</button></>} />
    <div className="metric-grid"><MetricCard label="Active case files" value={String(caseFiles.filter(file => file.status !== "Archived").length)} delta="+1" note="active in demo" tone="accent" /><MetricCard label="Open signals" value={String(seedSignals.length)} delta="+2" note="2 need triage" tone="warning" /><MetricCard label="Evidence score" value="86%" delta="+8.4 pts" note="vs last review" /><MetricCard label="Briefs shipped" value="09" delta="+2" note="this month" /></div>
    <div className="overview-grid">
      <section className="surface-card activity-surface"><div className="surface-card-header"><div><span className="card-kicker">Workspace pulse</span><h2>Signal velocity</h2></div><span className="subtle-status"><span /> Healthy</span></div><TinyChart /><div className="chart-insight"><div className="insight-icon"><Sparkles size={16} /></div><p><strong>Evidence volume is up 24%.</strong> Your team is collecting faster than it is resolving — a good moment to protect review time.</p><button className="icon-button" onClick={() => onNavigate("signals")}><ArrowUpRight size={16} /></button></div></section>
      <section className="surface-card queue-surface"><div className="surface-card-header"><div><span className="card-kicker">Needs attention</span><h2>Priority queue <span className="count-pill">{prioritySignals.length.toString().padStart(2, "0")}</span></h2></div><button className="text-button" onClick={() => onNavigate("signals")}>View inbox <ChevronRight size={14} /></button></div><div className="priority-list">{prioritySignals.map(signal => <button className="priority-row" key={signal.id} onClick={() => onNavigate("signals")}><span className={cn("severity-mark", signal.impact.toLowerCase())} /><span className="priority-copy"><strong>{signal.title}</strong><small>{signal.source} · {signal.age}</small></span><span className="urgency-label">{signal.urgency}</span><ChevronRight size={15} /></button>)}</div><button className="queue-footer" onClick={() => onNavigate("signals")}><span>All priority signals are shown</span><ArrowUpRight size={14} /></button></section>
    </div>
    <div className="overview-lower-grid"><section className="surface-card dossier-surface"><div className="surface-card-header"><div><span className="card-kicker">In motion</span><h2>Active case files</h2></div><button className="text-button" onClick={() => onNavigate("cases")}>All dossiers <ChevronRight size={14} /></button></div><div className="case-table"><div className="case-table-head"><span>Case file</span><span>Status</span><span>Confidence</span><span>Owner</span><span>Updated</span></div>{caseFiles.slice(0, 3).map(file => <button className="case-row" key={file.id} onClick={() => onNavigate("cases")}><span className="case-name-cell"><span className={cn("case-color", file.accent)} /><span><strong>{file.title}</strong><small>{file.sourceCount} sources · {file.signalCount} signals</small></span></span><StatusBadge status={file.status} /><Confidence value={file.confidence} /><span className="owner-cell"><span className="mini-avatar">{file.initials}</span>{file.owner}</span><span className="updated-cell">{file.updated}</span></button>)}</div></section><section className="surface-card activity-feed"><div className="surface-card-header"><div><span className="card-kicker">Live trail</span><h2>Recent activity</h2></div><button className="icon-button"><MoreHorizontal size={17} /></button></div><div className="activity-list">{activity.map(item => <div className="activity-item" key={item.text}><span className={cn("mini-avatar", item.tone)}>{item.initials}</span><div><p>{item.text}</p><small>{item.time}</small></div></div>)}</div></section></div>
  </div>;
}

function CaseFiles({ onNavigate }: { onNavigate: (section: SectionId) => void }) {
  const [filter, setFilter] = useState<CaseFile["status"] | "All">("All");
  const [selected, setSelected] = useState(caseFiles[0]);
  const visible = filter === "All" ? caseFiles : caseFiles.filter(file => file.status === filter);
  return <div className="section-stack"><PageHeading section="cases" action={<><button className="button button-ghost" onClick={() => toast.info("View customization", { description: "Column and density controls are coming next." })}><SlidersHorizontal size={15} /> Customize</button><button className="button button-accent" onClick={() => toast.success("New case file created", { description: "Start by writing a working hypothesis." })}><Plus size={16} /> New case file</button></>} /><div className="filter-row"><div className="segmented-control">{(["All", "Monitoring", "Deciding", "Draft", "Archived"] as const).map(item => <button key={item} className={cn(filter === item && "selected")} onClick={() => setFilter(item)}>{item}{item === "All" && <span>12</span>}</button>)}</div><button className="button button-ghost button-small" onClick={() => toast.info("Case filters", { description: "Use the status tabs to narrow this demo list." })}><Filter size={14} /> Filter <ChevronDown size={13} /></button></div><div className="cases-layout"><section className="surface-card case-list-card"><div className="list-card-header"><span>{visible.length} case files</span><span className="mono">SORTED BY ACTIVITY <ChevronDown size={12} /></span></div>{visible.map(file => <button key={file.id} className={cn("case-list-item", selected.id === file.id && "selected")} onClick={() => setSelected(file)}><span className={cn("case-color", file.accent)} /><span className="case-list-copy"><strong>{file.title}</strong><p>{file.hypothesis}</p><div><span>{file.owner}</span><span>·</span><span>{file.updated}</span><span>·</span><span>{file.sourceCount} sources</span></div></span><StatusBadge status={file.status} /><ChevronRight size={16} /></button>)}</section><CaseDetail file={selected} onNavigate={onNavigate} /></div></div>;
}

function CaseDetail({ file, onNavigate }: { file: CaseFile; onNavigate: (section: SectionId) => void }) {
  return <section className="surface-card case-detail"><div className="detail-topline"><span className={cn("case-color", file.accent)} /> <span className="mono">CASE / {file.id.toUpperCase()}</span><button className="icon-button"><MoreHorizontal size={17} /></button></div><div className="detail-title-row"><div><h2>{file.title}</h2><p>{file.hypothesis}</p></div><StatusBadge status={file.status} /></div><div className="detail-meta"><span><span className="mini-avatar">{file.initials}</span> {file.owner}</span><span><Clock3 size={14} /> Due {file.due}</span><span><Tag size={14} /> {file.tags.length} tags</span></div><div className="detail-confidence"><div><span className="card-kicker">Working confidence</span><strong>{file.confidence}%</strong></div><div className="big-confidence"><span style={{ width: `${file.confidence}%` }} /></div><small>Last calibration · 18 min ago</small></div><div className="detail-section"><div className="detail-section-title"><span>Decision trail</span><span className="mono">4 events</span></div><div className="timeline"><div><span className="timeline-node active" /><div><strong>Hypothesis moved to Deciding</strong><small>Amira Rahman · 18 min ago</small></div></div><div><span className="timeline-node" /><div><strong>2 new sources linked</strong><small>European Commission · 1 hr ago</small></div></div><div><span className="timeline-node" /><div><strong>Counter-argument added</strong><small>Noah Tran · Yesterday</small></div></div></div></div><div className="detail-actions"><button className="button button-dark" onClick={() => onNavigate("canvas")}><GitBranch size={15} /> Open canvas</button><button className="button button-ghost" onClick={() => onNavigate("brief")}><FileText size={15} /> Draft brief</button></div></section>;
}

function Signals({ onNavigate }: { onNavigate: (section: SectionId) => void }) {
  const [signals, setSignals] = useState(seedSignals);
  const [view, setView] = useState<"All" | "New" | "Triaged" | "Linked">("All");
  const [query, setQuery] = useState("");
  const visible = useMemo(() => signals.filter(signal => (view === "All" || signal.status === view) && signal.title.toLowerCase().includes(query.toLowerCase())), [signals, view, query]);
  const advance = (signal: Signal) => { setSignals(current => current.map(item => item.id === signal.id ? { ...item, status: item.status === "New" ? "Triaged" : "Linked" } : item)); toast.success("Signal qualified", { description: `${signal.title} moved forward in the inbox.` }); };
  return <div className="section-stack"><PageHeading section="signals" action={<><button className="button button-ghost" onClick={() => toast.info("Import flow", { description: "CSV and webhook ingestion is planned for the persistence phase." })}><UploadCloud size={15} /> Import signal</button><button className="button button-accent" onClick={() => toast.success("Capture mode ready", { description: "Paste a link or write an observation to add a signal." })}><Plus size={16} /> Capture signal</button></>} /><div className="signal-toolbar"><div className="segmented-control">{(["All", "New", "Triaged", "Linked"] as const).map(item => <button key={item} className={cn(view === item && "selected")} onClick={() => setView(item)}>{item}<span>{item === "All" ? signals.length : signals.filter(signal => signal.status === item).length}</span></button>)}</div><label className="inline-search"><Search size={15} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Filter signals" /></label></div><section className="surface-card signal-inbox"><div className="inbox-head"><div><span className="card-kicker">{visible.length} visible signals</span><h2>What changed?</h2></div><span className="inbox-note"><CircleAlert size={14} /> High impact signals need a point of view</span></div><div className="signal-list">{visible.map(signal => <div className="signal-row" key={signal.id}><div className="signal-row-mark"><span className={cn("severity-mark", signal.impact.toLowerCase())} /><span className="signal-row-line" /></div><div className="signal-row-body"><div className="signal-row-title"><h3>{signal.title}</h3><span className={cn("signal-status", signal.status.toLowerCase())}>{signal.status}</span></div><p>{signal.excerpt}</p><div className="signal-row-meta"><span>{signal.source}</span><span>·</span><span>{signal.age}</span><span>·</span><span className={cn("impact-label", signal.impact.toLowerCase())}>{signal.impact} impact</span><span>·</span><span>{signal.urgency}</span></div></div><div className="signal-row-actions"><button className="icon-button"><MoreHorizontal size={17} /></button>{signal.status !== "Linked" ? <button className="button button-ghost button-small" onClick={() => advance(signal)}>Qualify <ChevronRight size={13} /></button> : <button className="button button-dark button-small" onClick={() => onNavigate("cases")}>Open case <ArrowUpRight size={13} /></button>}</div></div>)}</div></section></div>;
}

function Sources() {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState("All types");
  const visible = sources.filter(source => (kind === "All types" || source.kind === kind) && `${source.title} ${source.publisher}`.toLowerCase().includes(query.toLowerCase()));
  return <div className="section-stack"><PageHeading section="sources" action={<><button className="button button-ghost" onClick={() => toast.info("Tag manager", { description: "Create and apply shared taxonomy in the next release." })}><Filter size={15} /> Manage tags</button><button className="button button-accent" onClick={() => toast.success("Source capture ready", { description: "Drop a URL, upload a file, or write a note." })}><Plus size={16} /> Add source</button></>} /><div className="source-toolbar"><label className="inline-search wide"><Search size={15} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search sources, publishers or dossiers" /></label><button className="select-button" onClick={() => setKind(kind === "All types" ? "Report" : "All types")}>{kind}<ChevronDown size={14} /></button><span className="toolbar-count">{visible.length} of {sources.length} sources</span></div><section className="surface-card sources-card"><div className="source-table-head"><span>Source</span><span>Type</span><span>Freshness</span><span>Reliability</span><span>Linked case</span><span /></div>{visible.map(source => <div className="source-row" key={source.id}><div className="source-title"><span className={cn("source-icon", source.kind.toLowerCase())}><FileText size={15} /></span><span><strong>{source.title}</strong><small>{source.publisher} · {source.date}</small></span></div><span className="source-kind">{source.kind}</span><span className={cn("freshness", source.freshness === "Fresh" && "fresh")}>{source.freshness}</span><span className={cn("reliability", source.reliability.toLowerCase())}><span />{source.reliability}</span><span className="linked-case">{source.caseId ? <><span className="case-color lime" /> {source.caseId === "atlas" ? "Atlas" : source.caseId === "saffron" ? "Saffron" : source.caseId === "northstar" ? "Northstar" : "Cobalt"}</> : "Unlinked"}</span><button className="icon-button" onClick={() => toast.info("Source actions", { description: "Open, annotate and link actions are coming next." })}><MoreHorizontal size={16} /></button></div>)}</section><div className="storage-note"><Info size={15} /><span>Sources are demo records for this open-source preview. The persistence layer is ready to connect to managed storage and a relational index.</span><button className="text-button">Read architecture <ArrowUpRight size={13} /></button></div></div>;
}

function Canvas() {
  return <div className="section-stack"><PageHeading section="canvas" action={<><button className="button button-ghost" onClick={() => toast.info("Canvas actions", { description: "Export and duplicate actions are planned for the canvas." })}><MoreHorizontal size={15} /> More</button><button className="button button-accent" onClick={() => toast.success("Canvas saved", { description: "The current point of view is ready to share." })}><Check size={16} /> Save canvas</button></>} /><div className="canvas-toolbar"><div className="canvas-case-picker"><span className="case-color lime" /><span>Atlas — European grid resilience</span><ChevronDown size={14} /></div><div className="canvas-tools"><span className="mono">ZOOM 78%</span><button className="icon-button" onClick={() => toast.info("Canvas zoom", { description: "Zoom controls are available in the next canvas iteration." })}><Plus size={16} /></button><button className="icon-button" onClick={() => toast.info("Canvas search", { description: "Search across nodes is planned for the graph layer." })}><Search size={15} /></button><button className="icon-button" onClick={() => toast.info("Canvas filters", { description: "Filter evidence branches by type or confidence." })}><SlidersHorizontal size={15} /></button></div></div><section className="surface-card canvas-card"><div className="canvas-status"><span><span className="status-pulse" /> Live analysis canvas</span><span>Updated 18 min ago · 3 collaborators</span></div><div className="canvas-stage"><div className="canvas-grid" /><svg className="canvas-lines" viewBox="0 0 1000 580" preserveAspectRatio="none"><path d="M350 170 C450 170 490 120 575 120" /><path d="M350 210 C450 260 490 290 575 290" /><path d="M350 250 C450 360 490 455 575 455" /><path d="M765 120 C830 150 826 230 830 290" /><path d="M765 290 C820 300 820 300 830 290" /><path d="M765 455 C830 420 826 350 830 290" /></svg><div className="canvas-node hypothesis-node"><span className="node-type">HYPOTHESIS</span><h3>Grid bottlenecks become strategic before 2028.</h3><div className="node-footer"><span className="node-confidence"><span style={{ width: "78%" }} /> </span><span>78%</span></div></div><div className="canvas-node evidence-node evidence-one"><span className="node-type"><span className="severity-mark high" /> EVIDENCE</span><h3>Queue reform moves to enforceable milestones.</h3><small>European Commission · 08 Nov</small></div><div className="canvas-node evidence-node evidence-two"><span className="node-type"><span className="severity-mark medium" /> EVIDENCE</span><h3>Transformer requests hit a five-year high.</h3><small>Gridline Journal · 07 Nov</small></div><div className="canvas-node counter-node"><span className="node-type"><span className="severity-mark low" /> COUNTERPOINT</span><h3>Permitting reform could unlock spare capacity faster.</h3><small>Internal note · Noah T.</small></div><div className="canvas-node conclusion-node"><span className="node-type"><Sparkles size={12} /> CONCLUSION</span><h3>Watch equipment orders, not headline demand.</h3><small>Working conclusion · 18 min ago</small></div><button className="canvas-add add-left" onClick={() => toast.info("Add evidence", { description: "New evidence can be attached to this branch." })}><Plus size={14} /></button><button className="canvas-add add-right" onClick={() => toast.info("Add conclusion", { description: "Extend the decision trail with a next watchpoint." })}><Plus size={14} /></button></div></section></div>;
}

function Compare() {
  const [activeScenario, setActiveScenario] = useState("atlas");
  const scenarios = [{ id: "atlas", label: "Atlas", color: "lime", total: 81 }, { id: "saffron", label: "Saffron", color: "orange", total: 73 }, { id: "northstar", label: "Northstar", color: "blue", total: 61 }];
  return <div className="section-stack"><PageHeading section="compare" action={<><button className="button button-ghost" onClick={() => toast.info("Criteria editor", { description: "Weights are intentionally fixed in this demo matrix." })}><SlidersHorizontal size={15} /> Edit criteria</button><button className="button button-accent" onClick={() => toast.success("Comparison copied", { description: "A decision matrix has been copied to your clipboard." })}><Plus size={16} /> New comparison</button></>} /><div className="compare-intro"><div><span className="card-kicker">Decision matrix / Q4 strategic themes</span><h2>Which thesis deserves the next hour?</h2><p>Five criteria, weighted by the team. Scores are a conversation starter, not a verdict.</p></div><div className="scenario-pills">{scenarios.map(scenario => <button key={scenario.id} className={cn("scenario-pill", activeScenario === scenario.id && "active")} onClick={() => setActiveScenario(scenario.id)}><span className={cn("case-color", scenario.color)} />{scenario.label}<strong>{scenario.total}</strong></button>)}</div></div><section className="surface-card comparison-card"><div className="comparison-head"><div><span className="card-kicker">Weighted score</span><h2>Scenario comparison</h2></div><span className="mono">Last calibrated today</span></div><div className="comparison-table"><div className="comparison-table-row comparison-header"><span>Criterion</span><span>Weight</span><span>Atlas</span><span>Saffron</span><span>Northstar</span></div>{compareRows.map(row => <div className="comparison-table-row" key={row.criterion}><span className="criterion"><strong>{row.criterion}</strong><small>Team input</small></span><span className="weight">{row.weight}%</span><span><ScoreBar value={row.atlas} active={activeScenario === "atlas"} color="lime" /></span><span><ScoreBar value={row.saffron} active={activeScenario === "saffron"} color="orange" /></span><span><ScoreBar value={row.northstar} active={activeScenario === "northstar"} color="blue" /></span></div>)}<div className="comparison-table-row comparison-total"><span><strong>Weighted total</strong></span><span>100%</span><span><strong className="total-score lime-text">81</strong> / 100</span><span><strong className="total-score orange-text">73</strong> / 100</span><span><strong className="total-score blue-text">61</strong> / 100</span></div></div></section><div className="compare-insight"><div className="insight-icon"><Sparkles size={16} /></div><div><span className="card-kicker">Reading the matrix</span><p><strong>Atlas leads on evidence quality and near-term signal.</strong> Saffron remains the option with the most optionality if the time horizon moves out.</p></div><button className="button button-dark" onClick={() => toast.success("Added to brief", { description: "The Atlas reading is ready in the decision brief." })}>Add to brief <ArrowUpRight size={14} /></button></div></div>;
}

function ScoreBar({ value, active, color }: { value: number; active: boolean; color: string }) {
  return <div className={cn("score-cell", active && "score-active")}><span className="score-track"><i className={color} style={{ width: `${value}%` }} /></span><b>{value}</b></div>;
}

function Brief() {
  return <div className="section-stack"><PageHeading section="brief" action={<><button className="button button-ghost" onClick={() => window.print()}><Printer size={15} /> Print / export</button><button className="button button-accent" onClick={() => toast.success("Brief shared", { description: "A shareable preview link is ready in the next release." })}><Users size={15} /> Share brief</button></>} /><div className="brief-layout"><aside className="brief-outline surface-card"><div className="brief-outline-head"><span className="card-kicker">Brief structure</span><button className="icon-button" onClick={() => toast.info("Brief outline", { description: "Add a section in the next editor release." })}><Plus size={15} /></button></div><div className="outline-item active"><span>01</span><strong>Executive read</strong><ChevronRight size={14} /></div><div className="outline-item"><span>02</span><strong>What changed</strong><ChevronRight size={14} /></div><div className="outline-item"><span>03</span><strong>Evidence</strong><ChevronRight size={14} /></div><div className="outline-item"><span>04</span><strong>Decision & watchpoints</strong><ChevronRight size={14} /></div><div className="brief-outline-footer"><span className="status-pulse" /> Autosaved 18 min ago</div></aside><article className="brief-document surface-card"><div className="brief-document-meta"><span>OPEN SIGNALS / DECISION BRIEF</span><span>08 NOV 2026 · v0.8</span></div><div className="brief-document-title"><span className="case-color lime" /><h2>European grid resilience:<br /><em>the queue is the story.</em></h2><span className="brief-confidence">78% confidence</span></div><div className="brief-document-byline"><span><span className="mini-avatar">AR</span> Amira Rahman</span><span>For: Strategy council</span><span>Status: <strong>Working draft</strong></span></div><div className="brief-document-body"><p className="brief-lead">The evidence is converging on a constraint that is easy to miss in aggregate demand numbers: <strong>the bottleneck is moving upstream into connection queues and transformer availability.</strong> The next decision should be paced to equipment lead times, not headline power demand.</p><div className="brief-rule" /><h3>Executive read</h3><p>Two developments changed the shape of the thesis this week. European transmission operators are moving queue reform from a coordination exercise toward enforceable milestones, while transformer connection requests reached a five-year high. Together, they suggest the constraint is becoming legible before it becomes visible in generation data.</p><div className="brief-pullquote"><Sparkles size={17} /><span>"Watch equipment orders, not headline demand."</span></div><h3>Decision & watchpoints</h3><div className="brief-watchpoints"><div><span className="watch-number">01</span><span><strong>Prioritize the equipment trail.</strong><small>Track transformer orders, lead times and supplier backlog as leading indicators.</small></span></div><div><span className="watch-number">02</span><span><strong>Keep permitting as the counterpoint.</strong><small>A faster reform cycle could release spare capacity sooner than the base case implies.</small></span></div></div></div><div className="brief-document-footer"><span><Link2 size={13} /> 18 linked sources</span><span><GitBranch size={13} /> Evidence trail intact</span><span>SignalDesk · Open Signals</span></div></article></div></div>;
}

export default function Workspace({ activeSection, onSectionChange, onSearch, sidebarOpen, onSidebarToggle }: { activeSection: SectionId; onSectionChange: (section: SectionId) => void; onSearch: () => void; sidebarOpen: boolean; onSidebarToggle: () => void }) {
  const content = {
    overview: <Overview onNavigate={onSectionChange} />,
    cases: <CaseFiles onNavigate={onSectionChange} />,
    signals: <Signals onNavigate={onSectionChange} />,
    sources: <Sources />,
    canvas: <Canvas />,
    compare: <Compare />,
    brief: <Brief />,
  }[activeSection];
  return <AppShell activeSection={activeSection} onSectionChange={onSectionChange} onSearch={onSearch} sidebarOpen={sidebarOpen} onSidebarToggle={onSidebarToggle}>{content}</AppShell>;
}
