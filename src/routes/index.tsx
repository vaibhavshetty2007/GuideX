import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Circle, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GuideXShell } from "@/components/guidex-shell";
import { domains } from "@/lib/guidex-data";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "GuideX — Stop guessing what to learn" },
    { name: "description", content: "GuideX maps Computer Science in dependency order, from small fundamentals to advanced engineering." },
    { property: "og:title", content: "GuideX — Stop guessing what to learn" },
    { property: "og:description", content: "Learn Computer Science in dependency order." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

function Index() {
  const pathDomains = domains.filter((domain) => ["web", "backend", "devops", "system-design", "security", "ai-ml"].includes(domain.slug));
  return <GuideXShell>
    <main>
      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-16 md:grid-cols-[1.1fr_0.9fr] md:gap-16 md:py-24">
        <div className="flex flex-col justify-center">
          <div className="gx-rise mb-5 inline-flex w-fit items-center gap-2 border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-dim"><span className="size-1.5 rounded-full bg-acid" /> Dependency-aware CS roadmaps</div>
          <h1 className="gx-rise gx-delay-1 font-display text-[clamp(3.6rem,9vw,7rem)] leading-[0.85] tracking-tight text-balance">Stop guessing<br />what to<br />learn<span className="text-acid">.</span></h1>
          <p className="gx-rise gx-delay-2 mt-6 max-w-[46ch] text-[15px] leading-relaxed text-dim">Every topic has a next stop and every path has a reason. GuideX maps what you must know first, so you learn in dependency order instead of random order.</p>
          <div className="gx-rise gx-delay-3 mt-8 flex flex-wrap gap-3">
            <Button asChild className="h-auto rounded-none bg-acid px-6 py-3 font-mono text-[12px] font-medium uppercase tracking-[0.12em] text-ink hover:bg-paper"><Link to="/explore">Explore roadmaps <ArrowRight className="size-3.5" /></Link></Button>
            <Button asChild variant="outline" className="h-auto rounded-none border-line bg-transparent px-6 py-3 font-mono text-[12px] uppercase tracking-[0.12em] text-paper hover:border-flame hover:bg-transparent hover:text-flame"><Link to="/onboarding">Build my learning path</Link></Button>
          </div>
          <div className="gx-rise gx-delay-4 mt-10 grid max-w-md grid-cols-3 gap-4 font-mono"><Stat value="214" label="topics mapped" tone="text-acid" /><Stat value="38" label="paths" tone="text-flame" /><Stat value="1.9k" label="edges" tone="text-sky" /></div>
        </div>
        <DependencyRail />
      </section>
      <section className="border-y border-line bg-surface/40"><div className="mx-auto flex max-w-6xl flex-wrap gap-3 px-6 py-6">{["Frontend", "Backend", "DevOps", "Systems", "Security", "AI / ML"].map((label) => <Link key={label} to="/explore" className="border border-line px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-paper transition-colors hover:border-acid hover:text-acid">{label}</Link>)}</div></section>
      <section className="mx-auto max-w-6xl px-6 py-16"><div className="mb-8 flex items-end justify-between"><h2 className="font-display text-3xl tracking-tight md:text-4xl">Learning paths</h2><Link to="/explore" className="font-mono text-[11px] uppercase tracking-[0.14em] text-dim hover:text-paper">all 14 domains →</Link></div><div className="grid grid-cols-1 gap-4 md:grid-cols-3">{pathDomains.slice(0, 3).map((domain) => <PathCard key={domain.slug} domain={domain} />)}</div></section>
      <section className="border-t border-line bg-surface/25"><div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 md:grid-cols-[1fr_1.4fr]"><div><p className="font-mono text-[11px] uppercase tracking-[0.18em] text-acid">Why GuideX?</p><h2 className="mt-3 max-w-sm font-display text-4xl leading-none">Most roadmaps skip the small concepts.</h2></div><div className="grid gap-4 sm:grid-cols-2">{[["01", "Complete learning paths", "From variables to distributed systems, without the missing links."], ["02", "Dependency-aware topics", "Prerequisites are explicit, so a locked topic tells you what to learn first."], ["03", "Practice that connects", "Projects and exercises sit beside the ideas they make real."], ["04", "Progress you can trust", "Mark topics complete and always see the next useful step."]].map(([number, title, copy]) => <div key={number} className="border border-line bg-surface p-5"><span className="font-mono text-[11px] text-acid">{number}</span><h3 className="mt-8 font-medium text-paper">{title}</h3><p className="mt-2 text-sm leading-relaxed text-dim">{copy}</p></div>)}</div></div></section>
    </main>
  </GuideXShell>;
}

function Stat({ value, label, tone }: { value: string; label: string; tone: string }) { return <div><div className={`text-2xl ${tone}`}>{value}</div><div className="text-[10px] uppercase tracking-[0.14em] text-dim">{label}</div></div>; }
function DependencyRail() { const nodes = [["Programming", "done", "border-acid"], ["Data Structures", "next", "border-flame"], ["Algorithms", "queued", "border-sky"], ["Databases", "queued", "border-plum"], ["System Design", "queued", "border-line"]]; return <div className="gx-rise gx-delay-2 border border-line bg-surface p-6"><div className="mb-5 flex items-center justify-between border-b border-line pb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-dim"><span>Dependency rail</span><span className="text-acid">● live</span></div><ol className="relative space-y-1.5"><span className="gx-draw absolute left-[7px] top-4 bottom-4 w-px origin-top bg-line" />{nodes.map(([title, state, color], index) => <li key={title} className="relative flex items-center gap-3 py-2 pl-6"><span className={`absolute left-0 size-3.5 rounded-full border-2 ${color} bg-ink ${index === 0 ? "gx-pulse" : ""}`} /> <span className={`font-mono text-[12px] uppercase tracking-[0.12em] ${index === 0 ? "text-acid" : index === 1 ? "text-paper" : "text-dim"}`}>{title}</span><span className="ml-auto font-mono text-[10px] text-dim">{state}</span></li>)}</ol></div>; }
function PathCard({ domain }: { domain: (typeof domains)[number] }) { const tone = domain.signal === "acid" ? "text-acid" : domain.signal === "flame" ? "text-flame" : "text-sky"; const bg = domain.signal === "acid" ? "bg-acid" : domain.signal === "flame" ? "bg-flame" : "bg-sky"; return <Link to="/roadmaps/$domain" params={{ domain: domain.slug }} className="block border border-line bg-surface p-5 transition-colors hover:border-acid"><div className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-dim"><span className={tone}>● {domain.shortName}</span><span>{domain.topicCount} topics</span></div><h3 className="font-display text-xl leading-tight tracking-tight">{domain.name}</h3><p className="mt-2 text-[13px] leading-relaxed text-dim">{domain.description}</p><div className="mt-4 h-1.5 w-full bg-line"><div className={`h-full ${bg}`} style={{ width: `${domain.progress}%` }} /></div><div className="mt-2 font-mono text-[10px] text-dim">{domain.progress}% complete</div></Link>; }