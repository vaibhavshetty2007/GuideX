import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Clock3, GitBranch, Circle } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { GuideXShell } from "@/components/guidex-shell";
import { findTopicReference, getDomain, getTopic, getTopicNeighbors } from "@/lib/guidex-data";

export const Route = createFileRoute("/topic/$topicId")({
  head: ({ params }) => { const topic = getTopic(params.topicId); return { meta: [
    { title: `${topic.title} — GuideX` },
    { name: "description", content: topic.description },
    { property: "og:title", content: `${topic.title} — GuideX` },
    { property: "og:description", content: topic.description },
    { property: "og:type", content: "article" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }; },
  component: TopicPage,
});

function TopicPage() {
  const { topicId } = Route.useParams();
  const topic = getTopic(topicId);
  const domain = getDomain(topic.domainSlug);
  const neighbors = getTopicNeighbors(topicId);
  const checklist = ["I can explain the core ideas", "I can apply it to a small example", "I can describe when it is useful", "I can connect it to the next topic"];
  const [complete, setComplete] = useState(topic.status === "done");
  const [checked, setChecked] = useState<string[]>([]);

  useEffect(() => {
    setComplete(topic.status === "done");
    setChecked([]);
  }, [topicId, topic.status]);

  const toggleChecklistItem = (item: string) => setChecked((items) => items.includes(item) ? items.filter((entry) => entry !== item) : [...items, item]);
  const nextTopics = topic.next.map((reference) => findTopicReference(reference, topic.domainSlug)).filter((entry) => entry !== undefined);

  return <GuideXShell><main className="mx-auto max-w-6xl px-6 py-12">
    <Link to="/roadmaps/$domain" params={{ domain: topic.domainSlug }} className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-dim hover:text-paper"><ArrowLeft className="size-3" /> {domain.shortName} roadmap</Link>
    <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_300px]">
      <article>
        <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-dim"><span className="border border-acid px-2 py-1 text-acid">{topic.difficulty}</span><span className="inline-flex items-center gap-1"><Clock3 className="size-3" /> {topic.minutes} min</span><span className="inline-flex items-center gap-1"><GitBranch className="size-3" /> {domain.shortName}</span></div>
        <h1 className="mt-6 font-display text-6xl leading-[0.88] md:text-8xl">{topic.title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-dim">{topic.description}</p>
        <LessonSection number="01" title="What is it?"><p>{topic.description}</p></LessonSection>
        <LessonSection number="02" title="Why does it matter?"><p>{topic.title} helps you build a stronger understanding of {domain.name}. It gives you a practical concept to recognize, apply, and connect to the topics that follow.</p></LessonSection>
        <LessonSection number="03" title="Prerequisites"><ReferenceList items={topic.prerequisites} domainSlug={topic.domainSlug} empty="No prerequisites — this is a starting point." /></LessonSection>
        <LessonSection number="04" title="Core concepts"><div className="grid gap-2 sm:grid-cols-2">{topic.concepts.map((concept) => <div key={concept} className="border border-line bg-surface px-4 py-3 font-mono text-xs text-paper"><span className="mr-2 text-acid">→</span>{concept}</div>)}</div></LessonSection>
        <LessonSection number="05" title="Mental model"><div className="border border-line bg-ink p-5 font-mono text-sm leading-7 text-dim"><span className="text-acid">{topic.title}</span><br />Understand the idea → recognize its use → connect it to the next concept</div></LessonSection>
        <LessonSection number="06" title="Example"><div className="border border-line bg-surface p-5 text-sm leading-7 text-dim"><p>When you encounter a problem involving <span className="text-paper">{topic.concepts[0]?.toLowerCase() ?? topic.title.toLowerCase()}</span>, identify which part of {topic.title} applies. Explain the choice, then check how it relates to {neighbors.next?.title ?? "the wider subject"}.</p></div></LessonSection>
        <LessonSection number="07" title="Common operations"><ul className="list-inside list-disc space-y-2 text-sm leading-7 text-dim">{topic.concepts.slice(0, 4).map((concept) => <li key={concept}>Recognize and explain {concept.toLowerCase()} in a simple example.</li>)}</ul></LessonSection>
        <LessonSection number="08" title="Complexity & tradeoffs"><p>There is no single complexity value for a concept in isolation. Compare the time, memory, reliability, and implementation tradeoffs for each operation you use, then explain which matters most for the problem.</p></LessonSection>
        <LessonSection number="09" title="Common mistakes"><ul className="list-inside list-disc space-y-2 text-sm leading-7 text-dim"><li>Memorizing the term without understanding the underlying idea.</li><li>Applying it without checking the prerequisites or tradeoffs.</li><li>Skipping practice and moving on before you can explain it clearly.</li></ul></LessonSection>
        <LessonSection number="10" title="Practice"><div className="border border-line bg-surface p-5 text-sm leading-7 text-dim"><p>Explain {topic.title} in your own words. Then give one example where it is useful, and name one limitation or tradeoff.</p></div></LessonSection>
        <LessonSection number="11" title="Mini project"><p>Build a small example that uses {topic.title}. Start with one clear goal, make the core idea visible, and write down what you learned while testing it.</p></LessonSection>
        <LessonSection number="12" title="Related topics"><ReferenceList items={topic.next} domainSlug={topic.domainSlug} empty="No related topics listed yet." /></LessonSection>
        <LessonSection number="13" title="What to learn next?"><div className="space-y-2">{nextTopics.length ? nextTopics.map((nextTopic) => <Link key={nextTopic.id} to="/topic/$topicId" params={{ topicId: nextTopic.id }} className="flex items-center justify-between border border-line bg-surface px-4 py-3 text-sm text-paper hover:border-acid"><span>{nextTopic.title}</span><ArrowRight className="size-4 text-acid" /></Link>) : <p>This is the end of the current roadmap sequence.</p>}</div></LessonSection>
        <LessonSection number="14" title="Completion checklist">
          <div className="space-y-2">{checklist.map((item) => <button key={item} onClick={() => toggleChecklistItem(item)} className="flex w-full items-center gap-3 border border-line bg-surface px-4 py-3 text-left text-sm text-paper transition-colors hover:border-acid"><span className={`grid size-5 place-items-center border ${checked.includes(item) ? "border-acid bg-acid text-ink" : "border-line text-dim"}`}>{checked.includes(item) ? <Check className="size-3" /> : null}</span>{item}</button>)}</div>
          <Button onClick={() => setComplete((value) => !value)} className={`mt-6 rounded-none px-5 font-mono text-xs uppercase tracking-[0.12em] ${complete ? "bg-acid text-ink hover:bg-paper" : "bg-flame text-ink hover:bg-paper"}`}>{complete ? <><Check className="size-3.5" /> Completed</> : "Mark as complete"}</Button>
        </LessonSection>
      </article>
      <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
        <div className="border border-line bg-surface p-5"><p className="font-mono text-[10px] uppercase tracking-[0.16em] text-acid">Status</p><div className="mt-4 flex items-center gap-3">{complete ? <Check className="size-4 text-acid" /> : <Circle className="size-4 text-flame" />}<span className="text-sm">{complete ? "Completed" : "In progress"}</span></div><div className="mt-4 h-1.5 bg-line"><div className="h-full bg-acid" style={{ width: complete ? "100%" : `${Math.round((checked.length / checklist.length) * 100)}%` }} /></div></div>
        <SideNavigation title="Prerequisites" references={topic.prerequisites} domainSlug={topic.domainSlug} />
        <SideNavigation title="Next topics" references={topic.next} domainSlug={topic.domainSlug} />
        <div className="flex gap-2">{neighbors.previous ? <Button asChild variant="outline" className="h-auto min-w-0 flex-1 rounded-none border-line px-3 py-3 text-left"><Link to="/topic/$topicId" params={{ topicId: neighbors.previous.id }}><span className="block font-mono text-[10px] uppercase text-dim">Previous</span><span className="mt-1 block truncate text-xs">{neighbors.previous.title}</span></Link></Button> : null}{neighbors.next ? <Button asChild className="h-auto min-w-0 flex-1 rounded-none bg-acid px-3 py-3 text-left text-ink hover:bg-paper"><Link to="/topic/$topicId" params={{ topicId: neighbors.next.id }}><span className="block font-mono text-[10px] uppercase">Next</span><span className="mt-1 block truncate text-xs">{neighbors.next.title}</span></Link></Button> : null}</div>
      </aside>
    </div>
  </main></GuideXShell>;
}

function LessonSection({ number, title, children }: { number: string; title: string; children: React.ReactNode }) { return <section className="border-b border-line py-8"><div className="flex items-center gap-4"><span className="font-mono text-[11px] text-acid">{number}</span><h2 className="font-display text-3xl leading-none">{title}</h2></div><div className="mt-5 max-w-2xl text-sm leading-7 text-dim">{children}</div></section>; }

function ReferenceList({ items, domainSlug, empty }: { items: string[]; domainSlug: string; empty: string }) { return items.length ? <ul className="space-y-2">{items.map((reference) => { const topic = findTopicReference(reference, domainSlug); return <li key={reference}>{topic ? <Link to="/topic/$topicId" params={{ topicId: topic.id }} className="text-paper hover:text-acid">{topic.title} <ArrowRight className="inline size-3" /></Link> : <span>{reference}</span>}</li>; })}</ul> : <p>{empty}</p>; }

function SideNavigation({ title, references, domainSlug }: { title: string; references: string[]; domainSlug: string }) { return <div className="border border-line bg-surface p-5"><p className="font-mono text-[10px] uppercase tracking-[0.16em] text-acid">{title}</p><div className="mt-4 space-y-2">{references.length ? references.map((reference) => { const topic = findTopicReference(reference, domainSlug); return topic ? <Link key={reference} to="/topic/$topicId" params={{ topicId: topic.id }} className="flex items-center justify-between border-b border-line/60 pb-2 text-sm text-paper hover:text-acid"><span>{topic.title}</span><ArrowRight className="size-3" /></Link> : <span key={reference} className="block border-b border-line/60 pb-2 text-sm text-dim">{reference}</span>; }) : <span className="text-sm text-dim">None — this is a starting point.</span>}</div></div>; }