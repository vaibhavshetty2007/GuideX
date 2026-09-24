import { Link, createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { GuideXShell } from "@/components/guidex-shell";
import { domains } from "@/lib/guidex-data";

export const Route = createFileRoute("/explore")({
  head: () => ({ meta: [
    { title: "Explore Roadmaps — GuideX" },
    { name: "description", content: "Browse dependency-aware Computer Science roadmaps across fourteen domains." },
    { property: "og:title", content: "Explore Roadmaps — GuideX" },
    { property: "og:description", content: "Browse dependency-aware Computer Science roadmaps across fourteen domains." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: ExplorePage,
});

function ExplorePage() {
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState<"All" | "Beginner" | "Intermediate" | "Advanced">("All");
  const visible = useMemo(() => domains.filter((domain) => (level === "All" || domain.difficulty === level) && `${domain.name} ${domain.description}`.toLowerCase().includes(query.toLowerCase())), [level, query]);
  return <GuideXShell><main className="mx-auto max-w-6xl px-6 py-16"><div className="flex flex-col justify-between gap-8 border-b border-line pb-10 md:flex-row md:items-end"><div><p className="font-mono text-[11px] uppercase tracking-[0.18em] text-acid">01 / Explore</p><h1 className="mt-3 font-display text-5xl leading-none md:text-7xl">Find your path.</h1><p className="mt-5 max-w-xl text-sm leading-relaxed text-dim">Every domain is split into phases, topics, and prerequisites. Start broad, then drill down until the next step is obvious.</p></div><div className="relative w-full md:max-w-xs"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-dim" /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search domains..." className="h-11 rounded-none border-line bg-surface pl-10 font-mono text-xs text-paper placeholder:text-dim" /></div></div><div className="flex flex-wrap gap-2 py-6">{(["All", "Beginner", "Intermediate", "Advanced"] as const).map((item) => <button key={item} onClick={() => setLevel(item)} className={`border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors ${level === item ? "border-acid bg-acid text-ink" : "border-line text-dim hover:border-paper hover:text-paper"}`}>{item}</button>)}</div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{visible.map((domain) => <DomainCard key={domain.slug} domain={domain} />)}</div>{visible.length === 0 ? <div className="border border-line bg-surface px-6 py-16 text-center font-mono text-sm text-dim">No roadmaps match that search.</div> : null}</main></GuideXShell>;
}

function DomainCard({ domain }: { domain: (typeof domains)[number] }) { const tone = { acid: "text-acid", flame: "text-flame", sky: "text-sky", plum: "text-plum" }[domain.signal]; const bar = { acid: "bg-acid", flame: "bg-flame", sky: "bg-sky", plum: "bg-plum" }[domain.signal]; return <Link to="/roadmaps/$domain" params={{ domain: domain.slug }} className="group border border-line bg-surface p-5 transition-colors hover:border-acid"><div className="flex items-start justify-between"><span className={`grid size-9 place-items-center border border-line font-mono text-sm ${tone}`}>{domain.icon}</span><span className="font-mono text-[10px] uppercase tracking-[0.12em] text-dim">{domain.difficulty}</span></div><h2 className="mt-8 font-display text-2xl leading-none">{domain.name}</h2><p className="mt-3 min-h-12 text-sm leading-relaxed text-dim">{domain.description}</p><div className="mt-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.12em] text-dim"><span>{domain.topicCount} topics</span><span className={tone}>{domain.progress}% mapped</span></div><div className="mt-2 h-1.5 bg-line"><div className={`h-full ${bar}`} style={{ width: `${domain.progress}%` }} /></div><div className="mt-5 flex items-center justify-between font-mono text-[11px] text-paper"><span>View roadmap</span><span className="transition-transform group-hover:translate-x-1">→</span></div></Link>; }