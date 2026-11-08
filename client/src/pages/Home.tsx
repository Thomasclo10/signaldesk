import { Command, FileText, FolderKanban, Inbox, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import Landing from "@/pages/Landing";
import Workspace from "@/pages/Workspace";
import { navItems, type SectionId } from "@/lib/demoData";
import { cn } from "@/lib/utils";

const commandIcons = { overview: Search, cases: FolderKanban, signals: Inbox, brief: FileText } as const;

type CommandPaletteProps = { onClose: () => void; onNavigate: (section: SectionId) => void };

function CommandPalette({ onClose, onNavigate }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const commands = navItems.filter(item => item.label.toLowerCase().includes(query.toLowerCase()));
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);
  return <div className="command-backdrop" onMouseDown={onClose}><div className="command-dialog" onMouseDown={event => event.stopPropagation()}><div className="command-search"><Search size={17} /><input autoFocus value={query} onChange={event => setQuery(event.target.value)} placeholder="Search workspace or jump to…" /><kbd>ESC</kbd></div><div className="command-body"><div className="command-label">Jump to</div>{commands.map(item => { const Icon = commandIcons[item.id as keyof typeof commandIcons] ?? Command; return <button key={item.id} className="command-item" onClick={() => { onNavigate(item.id); onClose(); }}><span className="command-item-icon"><Icon size={16} /></span><span>{item.label}</span><span className="command-shortcut">⌘ {item.short}</span></button>; })}{commands.length === 0 && <div className="command-empty">No matching surfaces. Try “case” or “signal”.</div>}</div><div className="command-footer"><span><kbd>↑</kbd><kbd>↓</kbd> Navigate</span><span><kbd>↵</kbd> Open</span><span><kbd>esc</kbd> Close</span></div></div></div>;
}

export default function Home() {
  const [mode, setMode] = useState<"landing" | "workspace">("landing");
  const [activeSection, setActiveSection] = useState<SectionId>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen(true);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const openWorkspace = () => {
    setMode("workspace");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const navigate = (section: SectionId) => {
    setActiveSection(section);
    setMode("workspace");
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return <>
    {mode === "landing" ? <Landing onDemo={openWorkspace} /> : <Workspace activeSection={activeSection} onSectionChange={navigate} onSearch={() => setCommandOpen(true)} sidebarOpen={sidebarOpen} onSidebarToggle={() => setSidebarOpen(open => !open)} />}
    {commandOpen && <CommandPalette onClose={() => setCommandOpen(false)} onNavigate={navigate} />}
    {mode === "workspace" && <button className="back-to-site" onClick={() => setMode("landing")}><X size={13} /> Exit demo</button>}
  </>;
}
