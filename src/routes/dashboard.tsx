import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, Clock3 } from "lucide-react";
import { GuideXShell } from "@/components/guidex-shell";
import { domains, findTopicReference, topics } from "@/lib/guidex-data";

export const Route = createFileRoute("/dashboard")({
  validateSearch: (search: Record<string, unknown>) => ({
    goal: typeof search.goal === "string" ? search.goal : "",
    level: typeof search.level === "string" ? search.level : "",
  }),
  head: () => ({ meta: [
    { title: "Dashboard — GuideX" },
    { name: "description", content: "Continue your personalized Computer Science learning path with GuideX." },
    { property: "og:title", content: "Dashboard — GuideX" },
    { property: "og:description", content: "Continue your personalized Computer Science learning path with GuideX." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }), component: DashboardPage });

function DashboardPage() {
  const { goal, level } = Route.useSearch();
  const doneTopics = topics.filter((topic) => topic.status === "done");
  const nextTopic = topics.find((topic) => topic.status === "next") ?? topics[0];
  const upNext = nextTopic.next.map((reference) => findTopicReference(reference, nextTopic.domainSlug)).filter((entry) => entry !== undefined)[0];
  const queued = topics.filter((topic) => topic.status === "queued");
  const queuedMinutes = queued.slice(0, 3).reduce((sum, topic) => sum + topic.minutes, 0);
  const rankedDomains = [...domains].sort((a, b) => b.progress - a.progress);

  return <GuideXShell><main className="mx-auto max-w-6xl px-6 py-12">
    <div className="flex flex-col justify-between gap-4 border-b border-line pb-8 md:flex-row md:items-end">
      <div><p className="font-mono text-[11px] uppercase tracking-[0.18em] text-acid">Your workspace</p><h1 className="mt-3 font-display text-5xl leading-none md:text-7xl">Welcome back.</h1></div>
      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-dim">{goal ? `${goal} · ${level}` : "local session"}</span>
    </div>
    <div className="mt-8 grid gap-4 lg:grid-cols-[1.4fr_0.6fr]">
      <Link to="/topic/$topicId" params={{ topicId: nextTopic.id }} className="group gx-lift border border-flame bg-surface p-6">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.15em] text-dim"><span className="text-flame">Continue learning</span><span>next topic</span></div>
        <h2 className="mt-10 font-display text-4xl">{nextTopic.title}</h2>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-dim">{nextTopic.description}</p>
        <div className="mt-8 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.12em] text-dim"><Clock3 className="size-3" /> {nextTopic.minutes} min lesson · not started yet</div>
        <div className="mt-5 flex items-center gap-2 font-mono text-xs text-paper">Open lesson <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" /></div>
      </Link>
      <div className="border border-line bg-surface p-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-acid">Up next</p>
        <div className="mt-8 flex items-center gap-3">
          <span className="grid size-9 place-items-center border border-acid text-acid">→</span>
          <div><p className="font-medium">{upNext?.title ?? "End of sequence"}</p><p className="mt-1 font-mono text-[10px] text-dim">{upNext ? `${upNext.minutes} min · queued` : "all caught up"}</p></div>
        </div>
        {upNext ? <Link to="/topic/$topicId" params={{ topicId: upNext.id }} className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-dim hover:text-paper">Preview <ArrowRight className="size-3" /></Link> : null}
        <div className="mt-8 border-t border-line pt-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-dim">Queued from here</p>
          <p className="mt-2 font-display text-3xl">~{queuedMinutes}m</p>
          <p className="mt-1 font-mono text-[10px] text-dim">next 3 topics · {queued.length} total queued</p>
        </div>
      </div>
    </div>
    <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1fr]">
      <section>
        <div className="flex items-center justify-between"><h2 className="font-display text-3xl">Progress by domain</h2><Link to="/explore" className="font-mono text-[11px] text-dim hover:text-paper">view all →</Link></div>
        <div className="mt-6 space-y-5">{rankedDomains.map((domain) => <div key={domain.slug}><div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.12em] text-dim"><span>{domain.shortName}</span><span>{domain.progress}%</span></div><div className="mt-2 h-1.5 bg-line"><div className="h-full bg-acid" style={{ width: `${domain.progress}%` }} /></div></div>)}</div>
      </section>
      <section>
        <h2 className="font-display text-3xl">Completed topics</h2>
        {doneTopics.length ? <div className="mt-6 space-y-2">{doneTopics.map((topic) => <Link key={topic.id} to="/topic/$topicId" params={{ topicId: topic.id }} className="flex items-center justify-between border border-line bg-surface px-4 py-4 transition-colors hover:border-acid"><span className="flex items-center gap-3 text-sm"><span className="grid size-6 place-items-center border border-acid text-acid"><Check className="size-3" /></span>{topic.title}</span><span className="flex items-center gap-1 font-mono text-[10px] text-dim"><Clock3 className="size-3" /> {topic.minutes} min</span></Link>)}</div> : <div className="mt-6 border border-line bg-surface px-6 py-10 text-center font-mono text-xs text-dim">Nothing completed yet — open a topic and mark it done.</div>}
        <div className="mt-8 border border-line bg-surface p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-acid">Keep going</p>
          <p className="mt-3 text-sm leading-relaxed text-dim">Mark topics complete from any lesson and this dashboard updates with your next step.</p>
          <Link to="/roadmaps/$domain" params={{ domain: nextTopic.domainSlug }} className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-paper hover:text-acid">Back to roadmap <ArrowRight className="size-3" /></Link>
        </div>
      </section>
    </div>
  </main></GuideXShell>;
}
