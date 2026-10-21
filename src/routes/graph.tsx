import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Minus, Plus, RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { GuideXShell } from "@/components/guidex-shell";
import { findTopicReference, getRoadmapPhases, getTopic } from "@/lib/guidex-data";

export const Route = createFileRoute("/graph")({ head: () => ({ meta: [
  { title: "Knowledge Graph — GuideX" },
  { name: "description", content: "Navigate the concepts and prerequisites that connect Computer Science." },
  { property: "og:title", content: "Knowledge Graph — GuideX" },
  { property: "og:description", content: "Navigate the concepts and prerequisites that connect Computer Science." },
  { property: "og:type", content: "website" },
  { name: "twitter:card", content: "summary_large_image" },
] }), component: GraphPage });

type GraphNode = { id: string; title: string; x: number; y: number };

function buildDsaGraph() {
  const phases = getRoadmapPhases("dsa");
  const nodes: GraphNode[] = [];
  phases.forEach((phase, phaseIndex) => {
    const count = phase.topics.length;
    phase.topics.forEach((topic, index) => {
      nodes.push({ id: topic.id, title: topic.title, x: ((phaseIndex + 0.5) / phases.length) * 100, y: count === 1 ? 50 : 9 + (index / (count - 1)) * 82 });
    });
  });
  const positions = new Map(nodes.map((node) => [node.id, node]));
  const edges: Array<[GraphNode, GraphNode]> = [];
  for (const topic of phases.flatMap((phase) => phase.topics)) {
    const to = positions.get(topic.id);
    if (!to) continue;
    for (const reference of topic.prerequisites) {
      const resolved = findTopicReference(reference, "dsa");
      const from = resolved ? positions.get(resolved.id) : undefined;
      if (from && from !== to) edges.push([from, to]);
    }
  }
  return { phases, nodes, edges };
}

function GraphPage() {
  const [scale, setScale] = useState(1);
  const [selectedId, setSelectedId] = useState("arrays");
  const { phases, nodes, edges } = useMemo(buildDsaGraph, []);
  const selected = nodes.find((node) => node.id === selectedId) ?? nodes[0];
  const selectedTopic = getTopic(selected.id);
  const toneClasses = ["border-acid text-acid", "border-sky text-sky", "border-flame text-flame", "border-plum text-plum"];
  const phaseIndex = phases.findIndex((phase) => phase.topics.some((topic) => topic.id === selected.id));

  return <GuideXShell><main className="mx-auto max-w-6xl px-6 py-12">
    <div className="flex flex-col justify-between gap-6 border-b border-line pb-8 md:flex-row md:items-end">
      <div><p className="font-mono text-[11px] uppercase tracking-[0.18em] text-acid">03 / Graph</p><h1 className="mt-3 font-display text-5xl leading-none md:text-7xl">Learn the graph.</h1><p className="mt-4 max-w-xl text-sm leading-relaxed text-dim">Every DSA topic and its prerequisites, drawn from the roadmap data. Click a node to trace what it builds on and what it unlocks.</p></div>
      <div className="flex gap-2">
        <Button variant="outline" size="icon" onClick={() => setScale((value) => Math.max(0.75, value - 0.1))} className="rounded-none border-line bg-transparent text-paper hover:bg-surface" aria-label="Zoom out"><Minus className="size-4" /></Button>
        <Button variant="outline" size="icon" onClick={() => setScale(1)} className="rounded-none border-line bg-transparent text-paper hover:bg-surface" aria-label="Reset graph zoom"><RotateCcw className="size-3.5" /></Button>
        <Button variant="outline" size="icon" onClick={() => setScale((value) => Math.min(1.3, value + 0.1))} className="rounded-none border-line bg-transparent text-paper hover:bg-surface" aria-label="Zoom in"><Plus className="size-4" /></Button>
      </div>
    </div>
    <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_300px]">
      <div className="relative min-h-[560px] overflow-hidden border border-line bg-surface">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(to right, var(--color-line) 1px, transparent 1px), linear-gradient(to bottom, var(--color-line) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ transform: `scale(${scale})`, transition: "transform 200ms ease" }} aria-hidden="true">
          {edges.map(([from, to]) => <line key={`${from.id}->${to.id}`} x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke={from.id === selected.id || to.id === selected.id ? "var(--color-acid)" : "var(--color-line)"} strokeWidth={from.id === selected.id || to.id === selected.id ? "0.4" : "0.3"} strokeDasharray="1 1" />)}
        </svg>
        {phases.map((phase, index) => <span key={phase.name} className="absolute -translate-x-1/2 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.14em] text-dim" style={{ left: `${((index + 0.5) / phases.length) * 100}%`, top: "2%" }}>{phase.name}</span>)}
        {nodes.map((node) => {
          const phaseIdx = phases.findIndex((phase) => phase.topics.some((topic) => topic.id === node.id));
          return <button key={node.id} onClick={() => setSelectedId(node.id)} aria-label={`Select ${node.title}`} className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap border bg-ink px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.08em] transition-transform hover:scale-105 ${toneClasses[phaseIdx % toneClasses.length]} ${selected.id === node.id ? "ring-2 ring-acid/50" : ""}`} style={{ left: `${node.x}%`, top: `${node.y}%`, transform: `translate(-50%, -50%) scale(${scale})` }}>{node.title}</button>;
        })}
      </div>
      <aside className="border border-line bg-surface p-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-acid">Selected node</p>
        <h2 className="mt-3 font-display text-3xl leading-none">{selectedTopic.title}</h2>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-dim">{selectedTopic.difficulty} · {selectedTopic.minutes} min · phase {String(phaseIndex + 1).padStart(2, "0")}</p>
        <p className="mt-3 text-sm leading-relaxed text-dim">{selectedTopic.description}</p>
        <div className="mt-6 space-y-2">
          <div className="border border-line p-3"><span className="font-mono text-[10px] uppercase tracking-[0.12em] text-dim">Builds on</span><div className="mt-2 space-y-1">{selectedTopic.prerequisites.map((reference) => { const resolved = findTopicReference(reference, selectedTopic.domainSlug); return resolved ? <button key={reference} onClick={() => setSelectedId(resolved.id)} className="block text-sm text-paper hover:text-acid">{resolved.title}</button> : <span key={reference} className="block text-sm text-dim">{reference}</span>; })}{selectedTopic.prerequisites.length === 0 ? <span className="text-sm text-dim">Nothing — starting point.</span> : null}</div></div>
          <div className="border border-acid/40 bg-acid/5 p-3"><span className="font-mono text-[10px] uppercase tracking-[0.12em] text-acid">Leads to</span><div className="mt-2 space-y-1">{(() => { const nextTopics = selectedTopic.next.map((reference) => findTopicReference(reference, selectedTopic.domainSlug)).filter((entry) => entry !== undefined); return nextTopics.length ? nextTopics.map((nextTopic) => <button key={nextTopic.id} onClick={() => setSelectedId(nextTopic.id)} className="block text-sm text-paper hover:text-acid">{nextTopic.title}</button>) : <span className="text-sm text-dim">End of the current sequence.</span>; })()}</div></div>
        </div>
        <Link to="/topic/$topicId" params={{ topicId: selected.id }} className="mt-6 flex items-center justify-between border border-line px-3 py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-paper transition-colors hover:border-acid hover:text-acid">Open topic <ArrowRight className="size-3" /></Link>
      </aside>
    </div>
  </main></GuideXShell>;
}
