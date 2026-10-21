import { Link, useNavigate } from "@tanstack/react-router";
import { Command, Menu, Moon, Search, Sun, X } from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { domains, topics } from "@/lib/guidex-data";

const navLinks = [
  { to: "/explore", label: "Explore" },
  { to: "/onboarding", label: "Build" },
  { to: "/graph", label: "Graph" },
  { to: "/practice", label: "Practice" },
] as const;

export function GuideXShell({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [light, setLight] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
      if (event.key === "Escape") {
        setSearchOpen(false);
        setMenuOpen(false);
      }
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
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} activeProps={{ className: "text-paper" }}>{link.label}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => setSearchOpen(true)} className="hidden h-8 border-line bg-transparent px-3 font-mono text-[11px] text-dim hover:bg-surface hover:text-paper sm:inline-flex">
              <Command className="size-3" /> K <span className="ml-1">search topics</span>
            </Button>
            <Button variant="outline" size="icon" onClick={() => setLight((value) => !value)} className="size-8 border-line bg-transparent text-paper hover:bg-surface" aria-label="Toggle theme">
              {light ? <Moon className="size-3.5" /> : <Sun className="size-3.5" />}
            </Button>
            <Button asChild size="sm" className="hidden h-8 rounded-none bg-flame px-4 font-mono text-[11px] font-medium text-ink hover:bg-paper sm:inline-flex">
              <Link to="/dashboard">My dashboard</Link>
            </Button>
            <Button variant="outline" size="icon" onClick={() => setMenuOpen((value) => !value)} className="size-8 border-line bg-transparent text-paper hover:bg-surface md:hidden" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
              {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </Button>
          </div>
        </div>
        {menuOpen ? (
          <nav className="border-t border-line bg-ink md:hidden" aria-label="Mobile navigation">
            <div className="mx-auto flex max-w-6xl flex-col px-6 py-2">
              {navLinks.map((link) => (
                <Link key={link.to} to={link.to} onClick={() => setMenuOpen(false)} className="border-b border-line/60 py-3 font-mono text-[12px] uppercase tracking-[0.16em] text-dim last:border-b-0 hover:text-paper">
                  {link.label}
                </Link>
              ))}
              <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="py-3 font-mono text-[12px] uppercase tracking-[0.16em] text-flame">
                My dashboard
              </Link>
            </div>
          </nav>
        ) : null}
      </header>
      {children}
      <footer className="border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <div className="font-display text-2xl tracking-tight">GUIDEX<span className="text-acid">.</span></div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-dim">Dependency-aware roadmaps that show what to learn first, what comes next, and why.</p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-dim">Platform</p>
            <div className="mt-4 flex flex-col gap-2 text-sm">
              {navLinks.map((link) => (
                <Link key={link.to} to={link.to} className="text-dim transition-colors hover:text-paper">{link.label}</Link>
              ))}
              <Link to="/dashboard" className="text-dim transition-colors hover:text-paper">Dashboard</Link>
            </div>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-dim">Popular roadmaps</p>
            <div className="mt-4 flex flex-col gap-2 text-sm">
              {domains.slice(0, 5).map((domain) => (
                <Link key={domain.slug} to="/roadmaps/$domain" params={{ domain: domain.slug }} className="text-dim transition-colors hover:text-paper">{domain.name}</Link>
              ))}
              <Link to="/explore" className="text-dim transition-colors hover:text-paper">All {domains.length} domains</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-line">
          <div className="mx-auto max-w-6xl px-6 py-4 font-mono text-[10px] uppercase tracking-[0.14em] text-dim">Learn in dependency order · 2026</div>
        </div>
      </footer>
      {searchOpen ? <SearchOverlay onClose={() => setSearchOpen(false)} onNavigate={(id) => { setSearchOpen(false); void navigate({ to: "/topic/$topicId", params: { topicId: id } }); }} /> : null}
    </div>
  );
}

function SearchOverlay({ onClose, onNavigate }: { onClose: () => void; onNavigate: (id: string) => void }) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => topics
    .map((topic) => ({ id: topic.id, title: topic.title, domain: domains.find((domain) => domain.slug === topic.domainSlug)?.shortName ?? "GuideX" }))
    .filter((entry) => `${entry.title} ${entry.domain}`.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 8), [query]);
  return <div className="fixed inset-0 z-50 flex items-start justify-center bg-ink/80 px-4 pt-[14vh] backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Search GuideX">
    <div className="w-full max-w-xl border border-line bg-surface shadow-2xl">
      <div className="flex items-center gap-3 border-b border-line px-4 py-3"><Search className="size-4 text-dim" /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search topics, domains, concepts..." className="flex-1 bg-transparent font-mono text-sm text-paper outline-none placeholder:text-dim" /><Button variant="ghost" size="icon" onClick={onClose} className="size-7 text-dim hover:bg-ink hover:text-paper" aria-label="Close search"><X className="size-4" /></Button></div>
      <div className="p-2">{results.map((entry) => <button key={entry.id} onClick={() => onNavigate(entry.id)} className="flex w-full items-center justify-between border border-transparent px-3 py-3 text-left transition-colors hover:border-line hover:bg-ink"><span><span className="block font-medium text-paper">{entry.title}</span><span className="font-mono text-[10px] uppercase tracking-[0.12em] text-dim">{entry.domain}</span></span><span className="font-mono text-[10px] text-dim">↵</span></button>)}{results.length === 0 ? <p className="px-3 py-6 font-mono text-xs text-dim">No topics found. Try “arrays” or “http”.</p> : null}</div>
    </div>
  </div>;
}
