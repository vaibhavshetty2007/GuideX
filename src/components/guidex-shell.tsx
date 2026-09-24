import { Link, useNavigate } from "@tanstack/react-router";
import { Command, Moon, Search, Sun, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

export function GuideXShell({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [light, setLight] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
      if (event.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("guidex-light", light);
  }, [light]);

  return (
    <div className="min-h-screen bg-ink text-paper font-body antialiased">
      <div className="h-2 w-[14%] bg-acid" />
      <header className="sticky top-0 z-40 border-b border-line bg-ink/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <Link to="/" className="flex items-center gap-3" aria-label="GuideX home">
            <span className="grid size-8 place-items-center bg-acid font-mono text-[15px] font-bold text-ink">G</span>
            <span className="font-display text-xl tracking-tight">GUIDEX</span>
          </Link>
          <nav className="hidden items-center gap-6 font-mono text-[11px] uppercase tracking-[0.16em] text-dim md:flex">
            <Link to="/explore" activeProps={{ className: "text-paper" }}>Explore</Link>
            <Link to="/onboarding" activeProps={{ className: "text-paper" }}>Build</Link>
            <Link to="/graph" activeProps={{ className: "text-paper" }}>Graph</Link>
            <Link to="/practice" activeProps={{ className: "text-paper" }}>Practice</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => setSearchOpen(true)} className="hidden h-8 border-line bg-transparent px-3 font-mono text-[11px] text-dim hover:bg-surface hover:text-paper sm:inline-flex">
              <Command className="size-3" /> K <span className="ml-1">search topics</span>
            </Button>
            <Button variant="outline" size="icon" onClick={() => setLight((value) => !value)} className="size-8 border-line bg-transparent text-paper hover:bg-surface" aria-label="Toggle theme">
              {light ? <Moon className="size-3.5" /> : <Sun className="size-3.5" />}
            </Button>
            <Button asChild size="sm" className="h-8 rounded-none bg-flame px-4 font-mono text-[11px] font-medium text-ink hover:bg-paper">
              <Link to="/dashboard">Sign in</Link>
            </Button>
          </div>
        </div>
      </header>
      {children}
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-10 md:flex-row md:items-center">
          <div className="font-display text-2xl tracking-tight">GUIDEX<span className="text-acid">.</span></div>
          <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-dim">Learn in dependency order · 2026</div>
        </div>
      </footer>
      {searchOpen ? <SearchOverlay onClose={() => setSearchOpen(false)} onNavigate={(id) => { setSearchOpen(false); void navigate({ to: "/topic/$topicId", params: { topicId: id } }); }} /> : null}
    </div>
  );
}

function SearchOverlay({ onClose, onNavigate }: { onClose: () => void; onNavigate: (id: string) => void }) {
  const [query, setQuery] = useState("");
  const results = [
    ["arrays", "Arrays", "DSA & Problem Solving"],
    ["linked-lists", "Linked Lists", "DSA & Problem Solving"],
    ["variables", "Variables", "Programming Fundamentals"],
    ["trees", "Trees", "DSA & Problem Solving"],
  ].filter(([, title, domain]) => `${title} ${domain}`.toLowerCase().includes(query.toLowerCase()));
  return <div className="fixed inset-0 z-50 flex items-start justify-center bg-ink/80 px-4 pt-[14vh] backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Search GuideX">
    <div className="w-full max-w-xl border border-line bg-surface shadow-2xl">
      <div className="flex items-center gap-3 border-b border-line px-4 py-3"><Search className="size-4 text-dim" /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search topics, domains, concepts..." className="flex-1 bg-transparent font-mono text-sm text-paper outline-none placeholder:text-dim" /><Button variant="ghost" size="icon" onClick={onClose} className="size-7 text-dim hover:bg-ink hover:text-paper" aria-label="Close search"><X className="size-4" /></Button></div>
      <div className="p-2">{results.map(([id, title, domain]) => <button key={id} onClick={() => onNavigate(id)} className="flex w-full items-center justify-between border border-transparent px-3 py-3 text-left transition-colors hover:border-line hover:bg-ink"><span><span className="block font-medium text-paper">{title}</span><span className="font-mono text-[10px] uppercase tracking-[0.12em] text-dim">{domain}</span></span><span className="font-mono text-[10px] text-dim">↵</span></button>)}{results.length === 0 ? <p className="px-3 py-6 font-mono text-xs text-dim">No topics found.</p> : null}</div>
    </div>
  </div>;
}