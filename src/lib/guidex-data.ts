export type TopicStatus = "done" | "next" | "queued";

export type Topic = {
  id: string;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  minutes: number;
  status: TopicStatus;
  prerequisites: string[];
  next: string[];
  concepts: string[];
};

export type Domain = {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  topicCount: number;
  progress: number;
  signal: "acid" | "flame" | "sky" | "plum";
  icon: string;
  phases: string[];
};

export const domains: Domain[] = [
  { slug: "dsa", name: "DSA & Problem Solving", shortName: "DSA", description: "Build the mental models behind efficient programs, from arrays to advanced graphs.", difficulty: "Beginner", topicCount: 64, progress: 42, signal: "acid", icon: "⌘", phases: ["Programming foundations", "Core data structures", "Algorithmic thinking", "Advanced algorithms", "Problem solving patterns"] },
  { slug: "web", name: "Web Development", shortName: "Web", description: "Understand the browser, the network, and the layers that make the web work.", difficulty: "Beginner", topicCount: 58, progress: 18, signal: "sky", icon: "◫", phases: ["Internet fundamentals", "HTML & CSS", "JavaScript", "Frontend architecture", "Production web"] },
  { slug: "backend", name: "Backend Development", shortName: "Backend", description: "Design reliable services, APIs, authentication, and the systems behind products.", difficulty: "Intermediate", topicCount: 46, progress: 24, signal: "flame", icon: "⇄", phases: ["HTTP foundations", "API design", "Persistence", "Reliability", "Service architecture"] },
  { slug: "databases", name: "Databases", shortName: "Data", description: "Learn how data is modeled, stored, queried, indexed, and kept consistent.", difficulty: "Intermediate", topicCount: 39, progress: 9, signal: "plum", icon: "▦", phases: ["Data modeling", "SQL", "Indexes", "Transactions", "Distributed data"] },
  { slug: "os", name: "Operating Systems", shortName: "Systems", description: "See the substrate: processes, memory, filesystems, concurrency, and the kernel.", difficulty: "Advanced", topicCount: 41, progress: 8, signal: "flame", icon: "▣", phases: ["Processes", "Memory", "Concurrency", "Filesystems", "Kernel interfaces"] },
  { slug: "networks", name: "Computer Networks", shortName: "Networks", description: "Trace a packet from a browser to a service and back through every layer.", difficulty: "Intermediate", topicCount: 35, progress: 0, signal: "sky", icon: "⌁", phases: ["Network foundations", "Transport", "Routing", "Security", "Distributed networking"] },
  { slug: "cloud", name: "Cloud Computing", shortName: "Cloud", description: "Move from infrastructure primitives to resilient, observable cloud architecture.", difficulty: "Advanced", topicCount: 44, progress: 0, signal: "sky", icon: "☁", phases: ["Cloud concepts", "Compute & storage", "Networking", "Security", "Architecture"] },
  { slug: "devops", name: "DevOps", shortName: "DevOps", description: "Ship software with repeatable automation, containers, CI/CD, and feedback loops.", difficulty: "Intermediate", topicCount: 37, progress: 0, signal: "acid", icon: "↯", phases: ["Linux", "Containers", "CI/CD", "Infrastructure as code", "Observability"] },
  { slug: "system-design", name: "System Design", shortName: "Systems design", description: "Reason about scale, tradeoffs, failure modes, and interfaces between services.", difficulty: "Advanced", topicCount: 52, progress: 0, signal: "plum", icon: "◇", phases: ["Design fundamentals", "Scalability", "Distributed systems", "Reliability", "Case studies"] },
  { slug: "security", name: "Cybersecurity", shortName: "Security", description: "Build a practical threat model for software, infrastructure, and people.", difficulty: "Advanced", topicCount: 48, progress: 0, signal: "flame", icon: "◇", phases: ["Security foundations", "Application security", "Identity", "Cryptography", "Defense"] },
  { slug: "ai-ml", name: "AI / Machine Learning", shortName: "AI / ML", description: "Learn the math, models, and production patterns behind intelligent systems.", difficulty: "Advanced", topicCount: 57, progress: 0, signal: "plum", icon: "✦", phases: ["Math foundations", "Machine learning", "Deep learning", "Evaluation", "ML systems"] },
  { slug: "git", name: "Git & GitHub", shortName: "Git", description: "Make collaboration, history, and delivery predictable with version control.", difficulty: "Beginner", topicCount: 18, progress: 0, signal: "acid", icon: "⑂", phases: ["Version control", "Collaboration", "Automation"] },
  { slug: "programming", name: "Programming Fundamentals", shortName: "Programming", description: "Build fluency with the small ideas every language and roadmap assumes.", difficulty: "Beginner", topicCount: 28, progress: 64, signal: "acid", icon: "<>" , phases: ["Syntax & values", "Control flow", "Functions", "Memory", "Practice"] },
  { slug: "software-engineering", name: "Software Engineering", shortName: "Engineering", description: "Turn working code into software that teams can evolve with confidence.", difficulty: "Intermediate", topicCount: 34, progress: 0, signal: "sky", icon: "⚙", phases: ["Code quality", "Testing", "Architecture", "Team practices"] },
];

export const topics: Topic[] = [
  { id: "programming-fundamentals", title: "Programming Fundamentals", description: "The smallest set of ideas that makes every later concept easier to place.", difficulty: "Beginner", minutes: 35, status: "done", prerequisites: [], next: ["variables", "data-types"], concepts: ["Values and expressions", "Control flow", "Functions", "Memory"] },
  { id: "variables", title: "Variables", description: "Names are handles for values. Understanding that distinction makes scope, mutation, and memory click.", difficulty: "Beginner", minutes: 24, status: "done", prerequisites: ["Programming Fundamentals"], next: ["data-types", "operators"], concepts: ["Bindings", "Mutation", "Lifetime", "Naming"] },
  { id: "data-types", title: "Data Types", description: "Values carry shape and behavior. Types tell you what operations are safe and what representation is underneath.", difficulty: "Beginner", minutes: 28, status: "done", prerequisites: ["Variables"], next: ["operators", "arrays"], concepts: ["Primitive types", "References", "Type conversion", "Nullability"] },
  { id: "arrays", title: "Arrays", description: "A contiguous sequence is the first data structure that connects abstract operations to memory layout.", difficulty: "Beginner", minutes: 42, status: "next", prerequisites: ["Variables", "Data Types"], next: ["strings", "dynamic-arrays", "linked-lists"], concepts: ["Indexing", "Traversal", "Insertion", "Deletion", "Searching", "Contiguous memory"] },
  { id: "linked-lists", title: "Linked Lists", description: "Nodes and references trade contiguous access for flexible structure — a useful contrast to arrays.", difficulty: "Beginner", minutes: 48, status: "queued", prerequisites: ["Arrays", "Pointers / References"], next: ["stacks", "queues", "trees"], concepts: ["Nodes", "References", "Singly linked", "Doubly linked"] },
  { id: "trees", title: "Trees", description: "Hierarchies become navigable when you can reason about recursive structure and traversal.", difficulty: "Intermediate", minutes: 55, status: "queued", prerequisites: ["Recursion", "Linked Lists"], next: ["binary-search-trees", "heaps", "graphs"], concepts: ["Root and leaves", "Traversal", "Binary trees", "Balance"] },
];

export const dsaPhases = [
  { name: "Programming Foundations", topics: ["Programming Fundamentals", "Variables", "Data Types", "Operators", "Conditions", "Loops", "Functions", "Scope"] },
  { name: "Core Data Structures", topics: ["Arrays", "Strings", "Linked Lists", "Stack", "Queue", "Deque", "Hashing", "Trees"] },
  { name: "Algorithmic Thinking", topics: ["Time Complexity", "Space Complexity", "Searching", "Sorting", "Binary Search", "Two Pointers", "Sliding Window"] },
  { name: "Advanced Data Structures", topics: ["Heaps", "Priority Queue", "Trie", "Graphs", "Union Find"] },
  { name: "Problem Solving Patterns", topics: ["Greedy", "Backtracking", "Divide and Conquer", "Dynamic Programming", "Bit Manipulation"] },
];

export function getDomain(slug: string) {
  const domain = domains.find((entry) => entry.slug === slug);
  if (!domain) throw new Error(`Unknown GuideX domain: ${slug}`);
  return domain;
}

export function getTopic(id: string) {
  const topic = topics.find((entry) => entry.id === id) ?? topics.find((entry) => entry.id === "arrays");
  if (!topic) throw new Error(`Unknown GuideX topic: ${id}`);
  return topic;
}