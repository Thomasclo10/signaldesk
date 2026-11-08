import {
  BarChart3,
  Bell,
  BookOpen,
  BrainCircuit,
  BriefcaseBusiness,
  ChevronRight,
  CircleDot,
  Command,
  FileText,
  FolderKanban,
  Globe2,
  Inbox,
  LayoutDashboard,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Settings2,
  Sparkles,
  Target,
  X,
} from "lucide-react";
import type { ReactNode } from "react";
import { SignalMark } from "@/components/SignalMark";
import { navItems, type SectionId } from "@/lib/demoData";
import { cn } from "@/lib/utils";

const iconBySection: Record<SectionId, typeof LayoutDashboard> = {
  overview: LayoutDashboard,
  cases: FolderKanban,
  signals: Inbox,
  sources: BookOpen,
  canvas: BrainCircuit,
  compare: BarChart3,
  brief: FileText,
};

export function SectionIcon({ id }: { id: SectionId }) {
  const Icon = iconBySection[id];
  return <Icon size={16} strokeWidth={1.7} />;
}

type AppShellProps = {
  activeSection: SectionId;
  onSectionChange: (section: SectionId) => void;
  children: ReactNode;
  onSearch: () => void;
  sidebarOpen: boolean;
  onSidebarToggle: () => void;
};

export function AppShell({
  activeSection,
  onSectionChange,
  children,
  onSearch,
  sidebarOpen,
  onSidebarToggle,
}: AppShellProps) {
  return (
    <div className={cn("app-shell", sidebarOpen && "sidebar-is-open")}>
      <aside className="workspace-sidebar">
        <div className="sidebar-topline">
          <SignalMark />
          <button className="icon-button sidebar-close" onClick={onSidebarToggle} aria-label="Close navigation">
            <X size={17} />
          </button>
        </div>

        <button className="workspace-switcher">
          <span className="workspace-avatar">OP</span>
          <span className="workspace-switcher-copy">
            <strong>Open Signals</strong>
            <small>Personal workspace</small>
          </span>
          <ChevronRight size={15} className="rotate-90" />
        </button>

        <div className="sidebar-section-label">Workspace</div>
        <nav className="workspace-nav" aria-label="Workspace navigation">
          {navItems.map(item => (
            <button
              key={item.id}
              className={cn("nav-item", activeSection === item.id && "nav-item-active")}
              onClick={() => onSectionChange(item.id)}
            >
              <span className="nav-item-icon"><SectionIcon id={item.id} /></span>
              <span>{item.label}</span>
              <span className="nav-item-short">{item.short}</span>
              {item.id === "signals" && <span className="unread-dot" />}
            </button>
          ))}
        </nav>

        <div className="sidebar-section-label sidebar-section-label-spaced">Library</div>
        <div className="library-links">
          <button className="subnav-item"><Target size={15} /> Watchlist <span>8</span></button>
          <button className="subnav-item"><Globe2 size={15} /> Shared sources <span>24</span></button>
          <button className="subnav-item"><BriefcaseBusiness size={15} /> Team notes <span>12</span></button>
        </div>

        <div className="sidebar-footer">
          <div className="sync-status"><span className="status-pulse" /> Demo data synced <span className="mono">2m</span></div>
          <button className="sidebar-settings"><Settings2 size={15} /> Workspace settings</button>
          <div className="user-chip">
            <span className="user-avatar">AR</span>
            <span><strong>Amira Rahman</strong><small>Analyst · Admin</small></span>
            <CircleDot size={13} className="user-online" />
          </div>
        </div>
      </aside>

      <div className="workspace-main">
        <header className="workspace-topbar">
          <button className="icon-button mobile-menu" onClick={onSidebarToggle} aria-label="Open navigation">
            {sidebarOpen ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
          </button>
          <div className="breadcrumbs"><span>Open Signals</span><ChevronRight size={14} /><strong>{navItems.find(item => item.id === activeSection)?.label}</strong></div>
          <div className="topbar-actions">
            <button className="search-trigger" onClick={onSearch}><Search size={15} /><span>Search workspace</span><kbd><Command size={11} /> K</kbd></button>
            <button className="icon-button has-notification" aria-label="Notifications"><Bell size={17} /><span /></button>
            <button className="avatar-button" aria-label="Open account menu">AR</button>
          </div>
        </header>
        <main className="workspace-content">{children}</main>
      </div>
    </div>
  );
}

export function PublicHeader({ onDemo }: { onDemo: () => void }) {
  return (
    <header className="public-header">
      <SignalMark light />
      <nav className="public-nav">
        <a href="#product">Product</a>
        <a href="#method">Method</a>
        <a href="#open-source">Open source</a>
      </nav>
      <div className="public-actions">
        <a href="https://github.com/Thomasclo10" target="_blank" rel="noreferrer" className="header-github">GitHub <ChevronRight size={15} /></a>
        <button className="button button-dark button-small" onClick={onDemo}>Open demo <ChevronRight size={14} /></button>
      </div>
    </header>
  );
}
