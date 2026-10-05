import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GuideXShell } from "@/components/guidex-shell";
import { getDomain, getRoadmapPhases } from "@/lib/guidex-data";

export const Route = createFileRoute("/roadmaps/$domain")({
  head: ({ params }) => {
    const domain = getDomain(params.domain);
    return { meta: [
      { title: `${domain.name} Roadmap — GuideX` },
      { name: "description", content: `${domain.description} Learn ${domain.name} in dependency order with GuideX.` },
      { property: "og:title", content: `${domain.name} Roadmap — GuideX` },
      { property: "og:description", content: domain.description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ] };
  },
  component: RoadmapPage,
});

function RoadmapPage() {
  const { domain: slug } = Route.useParams();
  const domain = getDomain(slug);
  const phases = getRoadmapPhases(slug);
  const firstNextTopic = phases.flatMap((phase) => phase.topics).find((topic) => topic.status === "next") ?? phases[0]?.topics[0];

  return <GuideXShell>
    <main className="mx-auto max-w-6xl px-6 py-12">
      <Link to="/explore" className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-dim hover:text-paper"><ArrowLeft className="size-3" /> All roadmaps</Link>
      <section className="mt-10 border-b border-line pb-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-acid"><span className="grid size-7 place-items-center border border-acid">{domain.icon}</span>{domain.shortName} / roadmap</div>
            <h1 className="mt-5 max-w-3xl font-display text-5xl leading-[0.9] md:text-7xl">{domain.name}</h1>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-dim">{domain.description} This path is ordered so each phase gives you the mental model needed for the next.</p>
          </div>
          <div className="w-full max-w-xs border border-line bg-surface p-5">
            <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-dim"><span>Progress</span><span className="text-acid">{domain.progress}%</span></div>
            <div className="mt-3 h-2 bg-line"><div className="h-full bg-acid" style={{ width: `${domain.progress}%` }} /></div>
            <div className="mt-4 grid grid-cols-2 gap-4 font-mono text-[10px] uppercase tracking-[0.12em] text-dim"><span>{domain.topicCount} topics</span><span>{Math.round(domain.topicCount * 0.6)} hrs estimated</span></div>
          </div>
        </div>
      </section>
      <section className="py-12">
        {phases.map((phase, phaseIndex) => <div key={phase.name} className="grid gap-6 border-b border-line py-10 first:pt-0 md:grid-cols-[180px_1fr]">
          <div><p className="font-mono text-[11px] uppercase tracking-[0.16em] text-acid">Phase {String(phaseIndex).padStart(2, "0")}</p><h2 className="mt-2 font-display text-2xl leading-none">{phase.name}</h2><p className="mt-3 text-xs leading-relaxed text-dim">{phase.topics.length} concepts in sequence</p></div>
          <div className="grid gap-2 sm:grid-cols-2">
            {phase.topics.map((topic, topicIndex) => {
              const done = topic.status === "done";
              const next = topic.status === "next";
              const card = <div className={`group flex items-center gap-3 border bg-surface px-4 py-4 transition-colors ${next ? "border-flame" : "border-line hover:border-acid"}`}>
                <span className={`grid size-7 shrink-0 place-items-center border font-mono text-[10px] ${done ? "border-acid text-acid" : next ? "border-flame text-flame" : "border-line text-dim"}`}>{done ? <Check className="size-3" /> : next ? <Circle className="size-2.5 fill-current" /> : String(topicIndex + 1).padStart(2, "0")}</span>
                <span className="min-w-0"><span className={`block truncate text-sm ${done || next ? "text-paper" : "text-paper"}`}>{topic.title}</span><span className="font-mono text-[10px] uppercase tracking-[0.12em] text-dim">{done ? "completed" : next ? "next up" : "ready to learn"} · {topic.minutes} min</span></span>
                <ArrowRight className="ml-auto size-3 shrink-0 text-dim transition-transform group-hover:translate-x-1" />
              </div>;
              return <Link key={topic.id} to="/topic/$topicId" params={{ topicId: topic.id }} aria-label={`Open ${topic.title} lesson`}>{card}</Link>;
            })}
          </div>
        </div>)}
      </section>
      {firstNextTopic ? <div className="border border-acid/40 bg-acid/5 p-6"><p className="font-mono text-[11px] uppercase tracking-[0.16em] text-acid">Ready for the next concept?</p><div className="mt-2 flex flex-col justify-between gap-4 md:flex-row md:items-center"><div><h2 className="font-display text-2xl">Continue with {firstNextTopic.title}</h2><p className="mt-1 text-sm text-dim">Pick up the learning sequence where it makes sense for this roadmap.</p></div><Button asChild className="rounded-none bg-acid font-mono text-xs uppercase tracking-[0.12em] text-ink hover:bg-paper"><Link to="/topic/$topicId" params={{ topicId: firstNextTopic.id }}>Open topic <ArrowRight className="size-3.5" /></Link></Button></div></div> : null}
    </main>
  </GuideXShell>;
}