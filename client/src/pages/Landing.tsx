import {
  ArrowUpRight,
  Check,
  ChevronRight,
  GitBranch,
  GitPullRequest,
  Layers3,
  LockKeyhole,
  Radar,
  Search,
  Sparkles,
  Workflow,
} from "lucide-react";
import { SignalMark, } from "@/components/SignalMark";
import { PublicHeader } from "@/components/AppShell";

export default function Landing({ onDemo }: { onDemo: () => void }) {
  return (
    <div className="landing-page">
      <PublicHeader onDemo={onDemo} />
      <main>
        <section className="hero-section">
          <div className="hero-copy">
            <div className="eyebrow eyebrow-dark"><span className="eyebrow-line" /> Open-source intelligence workspace <span className="eyebrow-status">v0.1</span></div>
            <h1>Make the next call<br /><em>with the evidence in view.</em></h1>
            <p className="hero-lede">SignalDesk turns scattered sources, weak signals and competing hypotheses into a clear, defensible point of view — without locking your thinking inside a black box.</p>
            <div className="hero-actions">
              <button className="button button-accent" onClick={onDemo}>Explore the workspace <ArrowUpRight size={16} /></button>
              <a className="text-link dark-link" href="#method">See how it works <ChevronRight size={16} /></a>
            </div>
            <div className="hero-footnote"><span className="tiny-check"><Check size={11} /></span> MIT-licensed · built in public · no vendor lock-in</div>
          </div>
          <div className="hero-visual" aria-label="SignalDesk workspace preview">
            <div className="visual-grid" />
            <div className="hero-window">
              <div className="window-bar"><div className="window-dots"><i /><i /><i /></div><span>signaldesk / open-signals</span><span className="window-live"><span /> live demo</span></div>
              <div className="window-body">
                <div className="mini-rail"><SignalMark compact light /><span className="mini-rail-active"><Radar size={14} /></span><span><Layers3 size={14} /></span><span><Workflow size={14} /></span><span><Search size={14} /></span></div>
                <div className="mini-content">
                  <div className="mini-top"><div><span className="mini-kicker">MONDAY · 08 NOV 2026</span><h3>Good morning, Amira.</h3></div><span className="mini-avatar">AR</span></div>
                  <div className="mini-kpis"><div><small>Active cases</small><strong>12</strong><span className="mini-up">+3 this week</span></div><div><small>Open signals</small><strong>28</strong><span className="mini-warn">6 need triage</span></div><div><small>Evidence score</small><strong>86<span>%</span></strong><span className="mini-up">+8.4 pts</span></div></div>
                  <div className="mini-grid">
                    <div className="mini-card chart-card"><div className="mini-card-head"><span>Signal velocity</span><span>30D <ChevronRight size={10} /></span></div><svg viewBox="0 0 360 115" preserveAspectRatio="none" className="mini-chart"><path d="M0,92 C28,83 38,88 57,72 S92,85 113,60 S152,70 177,44 S214,62 236,38 S280,50 299,23 S334,35 360,10" fill="none" stroke="#d8f36b" strokeWidth="3" /><path d="M0,92 C28,83 38,88 57,72 S92,85 113,60 S152,70 177,44 S214,62 236,38 S280,50 299,23 S334,35 360,10 L360,115 L0,115 Z" fill="url(#miniFill)" opacity=".25" /><defs><linearGradient id="miniFill" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#d8f36b" /><stop offset="1" stopColor="#d8f36b" stopOpacity="0" /></linearGradient></defs></svg><div className="mini-axis"><span>09 OCT</span><span>08 NOV</span></div></div>
                    <div className="mini-card radar-card"><div className="mini-card-head"><span>Priority queue</span><span className="mini-count">06</span></div><div className="mini-signal"><span className="signal-severity high" /><div><strong>Grid queue reform</strong><small>Atlas · 18 min</small></div><ChevronRight size={13} /></div><div className="mini-signal"><span className="signal-severity medium" /><div><strong>Inference spend split</strong><small>Saffron · 2 hr</small></div><ChevronRight size={13} /></div><div className="mini-signal"><span className="signal-severity high" /><div><strong>Connection requests</strong><small>Atlas · yesterday</small></div><ChevronRight size={13} /></div></div>
                  </div>
                  <div className="mini-bottom"><div className="mini-bottom-label"><span>Active dossier</span><strong>Atlas / European grid resilience</strong></div><div className="mini-progress"><span style={{ width: "78%" }} /></div><span className="mini-percent">78%</span></div>
                </div>
              </div>
            </div>
            <div className="hero-float hero-float-left"><span className="float-icon"><GitBranch size={14} /></span><span><strong>Evidence trail</strong><small>18 linked sources</small></span></div>
            <div className="hero-float hero-float-right"><span className="float-icon float-icon-accent"><Sparkles size={14} /></span><span><strong>Point of view updated</strong><small>2 min ago · Atlas</small></span></div>
          </div>
        </section>

        <section className="logo-strip"><span>Built for people who look around corners</span><div><b>STRATEGY</b><b>RESEARCH</b><b>PRODUCT</b><b>INVESTING</b><b>OPERATIONS</b></div></section>

        <section className="story-section" id="method">
          <div className="section-intro"><div className="eyebrow"><span className="eyebrow-line" /> The method</div><h2>Every claim<br /><em>needs a trail.</em></h2></div>
          <div className="story-aside"><p>Most teams don't have a shortage of information. They have a shortage of shared context — the why behind a number, the source behind a claim, the counterpoint that keeps a thesis honest.</p><a className="text-link" href="#product">Meet the evidence graph <ChevronRight size={16} /></a></div>
          <div className="method-cards">
            <article className="method-card method-card-dark"><div className="method-card-number">01 / COLLECT</div><Radar size={27} /><h3>Catch the weak signal.</h3><p>Bring links, filings, field notes and fragments into one inbox before they disappear into tabs.</p><div className="method-card-line" /></article>
            <article className="method-card method-card-lime"><div className="method-card-number">02 / CONNECT</div><GitBranch size={27} /><h3>Make the reasoning visible.</h3><p>Link evidence to hypotheses, counter-arguments and conclusions so the logic can be challenged.</p><div className="method-card-line" /></article>
            <article className="method-card method-card-paper"><div className="method-card-number">03 / DECIDE</div><GitPullRequest size={27} /><h3>Move with conviction.</h3><p>Turn a live dossier into a brief that makes the decision, the uncertainty and the next watchpoint clear.</p><div className="method-card-line" /></article>
          </div>
        </section>

        <section className="product-section" id="product">
          <div className="product-section-head"><div><div className="eyebrow"><span className="eyebrow-line" /> The workspace</div><h2>One place for<br /><em>the full picture.</em></h2></div><p>Designed for the messy middle between a first signal and a final call. SignalDesk gives every piece of context a home — and every decision a memory.</p></div>
          <div className="product-showcase"><div className="showcase-rail"><span className="showcase-rail-label">Surfaces</span><span className="showcase-rail-item active">01 <strong>Dossiers</strong></span><span className="showcase-rail-item">02 <strong>Sources</strong></span><span className="showcase-rail-item">03 <strong>Canvas</strong></span><span className="showcase-rail-item">04 <strong>Briefs</strong></span><div className="showcase-rail-bottom"><LockKeyhole size={16} /><small>Your data,<br />your graph.</small></div></div><div className="showcase-panel"><div className="showcase-top"><span>CASE FILE / ATLAS</span><span className="showcase-tag">DECIDING</span></div><div className="showcase-main"><div className="showcase-hypothesis"><small>WORKING HYPOTHESIS</small><h3>Capacity bottlenecks will become a strategic constraint before 2028.</h3><div className="confidence"><div className="confidence-ring"><span>78<small>%</small></span></div><div><strong>Confidence</strong><p>+12 pts since last review</p></div></div></div><div className="showcase-evidence"><div className="evidence-head"><span>Evidence trail</span><span>18 sources <ChevronRight size={13} /></span></div><div className="evidence-line"><span className="evidence-node node-lime" /><div><strong>Queue reform moves to milestones</strong><small>European Commission · 08 Nov 2026</small></div><span className="evidence-arrow">→</span></div><div className="evidence-line"><span className="evidence-node node-orange" /><div><strong>Transformer requests at 5Y high</strong><small>Gridline Journal · 07 Nov 2026</small></div><span className="evidence-arrow">→</span></div><div className="evidence-line"><span className="evidence-node node-blue" /><div><strong>Counterpoint added by Noah T.</strong><small>Internal note · 06 Nov 2026</small></div><span className="evidence-arrow">→</span></div><div className="evidence-more">+ 15 more connections <ArrowUpRight size={13} /></div></div></div><div className="showcase-footer"><span><span className="avatar-stack"><i>AR</i><i>NT</i><i>LM</i></span> 3 collaborators</span><span><Workflow size={14} /> Last reviewed 18 min ago</span></div></div></div>
        </section>

        <section className="open-section" id="open-source"><div className="open-copy"><div className="eyebrow"><span className="eyebrow-line" /> Built in public</div><h2>Good analysis<br /><em>should be inspectable.</em></h2><p>SignalDesk is an open-source foundation for teams who want better decisions without giving up ownership of their tools or their thinking.</p><div className="open-points"><div><Check size={15} /><span>MIT licensed and self-hostable</span></div><div><Check size={15} /><span>Plain data model, no black-box lock-in</span></div><div><Check size={15} /><span>Contributions welcome from day one</span></div></div><a href="https://github.com/Thomasclo10" target="_blank" rel="noreferrer" className="button button-dark">View the repository <ArrowUpRight size={15} /></a></div><div className="open-card"><div className="open-card-top"><span className="repo-dot" /><span>Thomasclo10 / signaldesk</span><span className="repo-star">★ 0</span></div><div className="open-card-title"><SignalMark compact light /><div><h3>SignalDesk</h3><p>Open-source analyst workspace for defensible decisions.</p></div></div><div className="open-card-meta"><span>TypeScript</span><span>MIT License</span><span>Built in public</span></div><div className="open-card-graph"><div className="graph-label">COMMITS / 30 DAYS <span>+24%</span></div><div className="commit-bars">{[3,6,4,8,5,9,7,12,10,13,16,14,19,17,22,20,26,24,28,31].map((height, index) => <i key={index} style={{ height: `${height * 3}px` }} />)}</div></div><div className="open-card-footer"><span><span className="green-dot" /> main · passing</span><span>Updated just now <ArrowUpRight size={13} /></span></div></div></section>

        <section className="cta-section"><div className="cta-mark"><SignalMark light /></div><div><div className="eyebrow eyebrow-dark"><span className="eyebrow-line" /> Start with a signal</div><h2>Make your thinking<br /><em>easier to trust.</em></h2></div><button className="button button-accent" onClick={onDemo}>Open the live demo <ArrowUpRight size={16} /></button></section>
      </main>
      <footer className="public-footer"><SignalMark light compact /><span>SignalDesk is an open-source project for better decisions.</span><span>© 2026 · MIT License</span></footer>
    </div>
  );
}
