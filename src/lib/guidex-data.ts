export type TopicStatus = "done" | "next" | "queued";

export type Topic = {
  id: string;
  domainSlug: string;
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

const dsaPhases = [
  { name: "Programming Foundations", topics: ["Programming Fundamentals", "Variables", "Data Types", "Operators", "Conditions", "Loops", "Functions", "Scope"] },
  { name: "Core Data Structures", topics: ["Arrays", "Strings", "Linked Lists", "Stack", "Queue", "Deque", "Hashing", "Trees"] },
  { name: "Algorithmic Thinking", topics: ["Time Complexity", "Space Complexity", "Searching", "Sorting", "Binary Search", "Two Pointers", "Sliding Window"] },
  { name: "Advanced Data Structures", topics: ["Heaps", "Priority Queue", "Trie", "Graphs", "Union Find"] },
  { name: "Problem Solving Patterns", topics: ["Greedy", "Backtracking", "Divide and Conquer", "Dynamic Programming", "Bit Manipulation"] },
];

const roadmapTopics: Record<string, { name: string; topics: string[] }[]> = {
  web: [
    { name: "Internet Fundamentals", topics: ["How the Internet Works", "DNS", "HTTP and HTTPS", "Browsers and Servers"] },
    { name: "HTML & CSS", topics: ["HTML Structure", "Semantic HTML", "CSS Foundations", "Responsive Layout"] },
    { name: "JavaScript", topics: ["JavaScript Basics", "DOM and Events", "Async JavaScript", "Fetch and APIs"] },
    { name: "Frontend Architecture", topics: ["Components", "State Management", "TypeScript", "Frontend Routing"] },
    { name: "Production Web", topics: ["Testing", "Web Security", "Performance", "Deployment"] },
  ],
  backend: [
    { name: "HTTP Foundations", topics: ["HTTP Requests", "API Contracts", "REST Principles", "Input Validation"] },
    { name: "API Design", topics: ["Routing and Controllers", "Authentication", "Authorization", "Error Handling"] },
    { name: "Persistence", topics: ["Database Access", "Data Modeling", "Caching", "Migrations"] },
    { name: "Reliability", topics: ["Logging", "Testing Services", "Rate Limiting", "Background Jobs"] },
    { name: "Service Architecture", topics: ["Service Boundaries", "Messaging", "Scalability", "Deployment"] },
  ],
  databases: [
    { name: "Data Modeling", topics: ["Relational Data", "Tables and Keys", "Relationships", "Normalization"] },
    { name: "SQL", topics: ["SELECT Queries", "Filtering and Sorting", "Joins", "Aggregations"] },
    { name: "Indexes", topics: ["Index Fundamentals", "B-Trees", "Query Plans", "Index Tradeoffs"] },
    { name: "Transactions", topics: ["Transactions", "ACID Properties", "Isolation Levels", "Concurrency"] },
    { name: "Distributed Data", topics: ["Replication", "Partitioning", "Consistency", "Recovery"] },
  ],
  os: [
    { name: "Processes", topics: ["Programs and Processes", "Process States", "System Calls", "Threads"] },
    { name: "Memory", topics: ["Address Spaces", "Virtual Memory", "Paging", "Memory Allocation"] },
    { name: "Concurrency", topics: ["Race Conditions", "Locks", "Deadlocks", "Scheduling"] },
    { name: "Filesystems", topics: ["Files and Directories", "File Descriptors", "Storage Blocks", "Permissions"] },
    { name: "Kernel Interfaces", topics: ["Kernel Mode", "Device Drivers", "Networking Interfaces", "Resource Limits"] },
  ],
  networks: [
    { name: "Network Foundations", topics: ["Packets and Layers", "IP Addressing", "Subnetting", "Ethernet"] },
    { name: "Transport", topics: ["Ports and Sockets", "TCP", "UDP", "TLS"] },
    { name: "Routing", topics: ["Routing Tables", "DNS Resolution", "NAT", "Load Balancing"] },
    { name: "Security", topics: ["Firewalls", "Certificates", "Network Threats", "Secure Channels"] },
    { name: "Distributed Networking", topics: ["Proxies", "CDNs", "Service Discovery", "Network Resilience"] },
  ],
  cloud: [
    { name: "Cloud Concepts", topics: ["Cloud Service Models", "Regions and Zones", "Shared Responsibility", "Cloud Pricing"] },
    { name: "Compute & Storage", topics: ["Virtual Machines", "Object Storage", "Containers", "Serverless Compute"] },
    { name: "Networking", topics: ["Virtual Networks", "Subnets and Routing", "Load Balancers", "Private Connectivity"] },
    { name: "Security", topics: ["Identity and Access", "Secrets Management", "Encryption", "Cloud Security Posture"] },
    { name: "Architecture", topics: ["Autoscaling", "Monitoring and Logs", "High Availability", "Disaster Recovery"] },
  ],
  devops: [
    { name: "Linux", topics: ["Shell Basics", "Files and Permissions", "Processes", "SSH"] },
    { name: "Containers", topics: ["Container Concepts", "Docker Images", "Docker Networking", "Container Registries"] },
    { name: "CI/CD", topics: ["Build Pipelines", "Automated Tests", "GitHub Actions", "Release Strategies"] },
    { name: "Infrastructure as Code", topics: ["Infrastructure Concepts", "Terraform Basics", "State and Modules", "Configuration Management"] },
    { name: "Observability", topics: ["Metrics", "Logs and Traces", "Alerting", "Incident Response"] },
  ],
  "system-design": [
    { name: "Design Fundamentals", topics: ["Requirements", "Capacity Estimation", "API Design", "Data Modeling"] },
    { name: "Scalability", topics: ["Caching", "Load Balancing", "Database Scaling", "Queues"] },
    { name: "Distributed Systems", topics: ["Replication", "Consistency", "Partitioning", "Consensus Basics"] },
    { name: "Reliability", topics: ["Failure Modes", "Redundancy", "Observability", "Resilience Patterns"] },
    { name: "Case Studies", topics: ["URL Shortener", "News Feed", "File Storage", "Real-Time Messaging"] },
  ],
  security: [
    { name: "Security Foundations", topics: ["Threat Modeling", "Security Principles", "Risk Assessment", "Secure Defaults"] },
    { name: "Application Security", topics: ["Input Validation", "Injection Attacks", "Web Security", "Secure Development"] },
    { name: "Identity", topics: ["Authentication", "Authorization", "Sessions and Tokens", "Multifactor Security"] },
    { name: "Cryptography", topics: ["Hashing", "Symmetric Encryption", "Public-Key Encryption", "Certificates"] },
    { name: "Defense", topics: ["Network Defense", "Vulnerability Management", "Monitoring", "Incident Response"] },
  ],
  "ai-ml": [
    { name: "Math Foundations", topics: ["Linear Algebra", "Probability", "Statistics", "Gradient Intuition"] },
    { name: "Machine Learning", topics: ["Supervised Learning", "Model Evaluation", "Feature Engineering", "Unsupervised Learning"] },
    { name: "Deep Learning", topics: ["Neural Networks", "Backpropagation", "Convolutional Networks", "Transformers"] },
    { name: "Evaluation", topics: ["Training and Validation", "Metrics", "Overfitting", "Responsible Evaluation"] },
    { name: "ML Systems", topics: ["Data Pipelines", "Model Serving", "Monitoring Models", "ML Operations"] },
  ],
  git: [
    { name: "Version Control", topics: ["Repositories", "Commits", "Branches", "Merge Conflicts"] },
    { name: "Collaboration", topics: ["Remotes", "Pull Requests", "Code Review", "Release Tags"] },
    { name: "Automation", topics: ["Git Hooks", "GitHub Actions", "Issue Workflows", "Project Permissions"] },
  ],
  programming: [
    { name: "Syntax & Values", topics: ["Variables", "Data Types", "Operators", "Expressions"] },
    { name: "Control Flow", topics: ["Conditions", "Loops", "Iteration", "Error Handling"] },
    { name: "Functions", topics: ["Function Basics", "Parameters and Returns", "Scope", "Recursion"] },
    { name: "Memory", topics: ["References", "Value and Reference", "Stack and Heap", "Mutability"] },
    { name: "Practice", topics: ["Decomposition", "Debugging", "Testing Basics", "Small Programs"] },
  ],
  "software-engineering": [
    { name: "Code Quality", topics: ["Readable Code", "Refactoring", "Design Principles", "Code Reviews"] },
    { name: "Testing", topics: ["Unit Testing", "Integration Testing", "Test Doubles", "Continuous Testing"] },
    { name: "Architecture", topics: ["Module Boundaries", "Dependency Management", "Architecture Patterns", "Technical Debt"] },
    { name: "Team Practices", topics: ["Git Collaboration", "Planning Work", "Documentation", "Reliable Releases"] },
  ],
};

const curatedTopics: Topic[] = [
  { id: "programming-fundamentals", domainSlug: "dsa", title: "Programming Fundamentals", description: "The smallest set of ideas that makes every later concept easier to place.", difficulty: "Beginner", minutes: 35, status: "done", prerequisites: [], next: ["variables", "data-types"], concepts: ["Values and expressions", "Control flow", "Functions", "Memory"] },
  { id: "variables", domainSlug: "dsa", title: "Variables", description: "Names are handles for values. Understanding that distinction makes scope, mutation, and memory click.", difficulty: "Beginner", minutes: 24, status: "done", prerequisites: ["Programming Fundamentals"], next: ["data-types", "operators"], concepts: ["Bindings", "Mutation", "Lifetime", "Naming"] },
  { id: "data-types", domainSlug: "dsa", title: "Data Types", description: "Values carry shape and behavior. Types tell you what operations are safe and what representation is underneath.", difficulty: "Beginner", minutes: 28, status: "done", prerequisites: ["Variables"], next: ["operators", "arrays"], concepts: ["Primitive types", "References", "Type conversion", "Nullability"] },
  { id: "arrays", domainSlug: "dsa", title: "Arrays", description: "A contiguous sequence is the first data structure that connects abstract operations to memory layout.", difficulty: "Beginner", minutes: 42, status: "next", prerequisites: ["Variables", "Data Types"], next: ["strings", "dynamic-arrays", "linked-lists"], concepts: ["Indexing", "Traversal", "Insertion", "Deletion", "Searching", "Contiguous memory"] },
  { id: "linked-lists", domainSlug: "dsa", title: "Linked Lists", description: "Nodes and references trade contiguous access for flexible structure — a useful contrast to arrays.", difficulty: "Beginner", minutes: 48, status: "queued", prerequisites: ["Arrays", "Pointers / References"], next: ["stacks", "queues", "trees"], concepts: ["Nodes", "References", "Singly linked", "Doubly linked"] },
  { id: "trees", domainSlug: "dsa", title: "Trees", description: "Hierarchies become navigable when you can reason about recursive structure and traversal.", difficulty: "Intermediate", minutes: 55, status: "queued", prerequisites: ["Recursion", "Linked Lists"], next: ["binary-search-trees", "heaps", "graphs"], concepts: ["Root and leaves", "Traversal", "Binary trees", "Balance"] },
];

function slugifyTopic(title: string) {
  return title.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const topicCurriculums: Record<string, { name: string; topics: string[] }[]> = { ...roadmapTopics, dsa: dsaPhases };

function createRoadmapTopics(): Topic[] {
  return domains.flatMap((domain) => {
    const phases = topicCurriculums[domain.slug] ?? [];
    const titles = phases.flatMap((phase) => phase.topics);
    return titles.flatMap((title, index) => {
      const curated = curatedTopics.find((topic) => topic.domainSlug === domain.slug && topic.title === title);
      if (curated) return [];
      const id = domain.slug === "dsa" ? slugifyTopic(title) : `${domain.slug}-${slugifyTopic(title)}`;
      const previous = titles[index - 1];
      const next = titles[index + 1];
      return [{
        id,
        domainSlug: domain.slug,
        title,
        description: `${title} is part of ${domain.name}. Learn the core ideas, understand where it fits, and connect it to the concepts that come before and after it.`,
        difficulty: index > titles.length * 0.65 ? "Intermediate" as const : domain.difficulty === "Advanced" ? "Intermediate" as const : "Beginner" as const,
        minutes: 25,
        status: index === 0 ? "next" as const : "queued" as const,
        prerequisites: previous ? [previous] : [],
        next: next ? [`${domain.slug === "dsa" ? "" : `${domain.slug}-`}${slugifyTopic(next)}`] : [],
        concepts: [title, `${title} fundamentals`, `${title} in ${domain.name}`, "When to use it"],
      }];
    });
  });
}

export const topics: Topic[] = [...curatedTopics, ...createRoadmapTopics()];

export function getRoadmapPhases(domainSlug: string) {
  const phases = topicCurriculums[domainSlug] ?? [];
  return phases.map((phase) => ({
    name: phase.name,
    topics: phase.topics.map((title) => {
      const topic = topics.find((entry) => entry.domainSlug === domainSlug && entry.title === title);
      if (!topic) throw new Error(`Missing GuideX topic: ${domainSlug}/${title}`);
      return topic;
    }),
  }));
}

export function getTopic(id: string) {
  const topic = topics.find((entry) => entry.id === id);
  if (!topic) throw new Error(`Unknown GuideX topic: ${id}`);
  return topic;
}

export function findTopicReference(reference: string, domainSlug: string) {
  const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, "").replace(/s$/, "");
  const target = normalize(reference);
  return topics.find((topic) => topic.domainSlug === domainSlug && (normalize(topic.id) === target || normalize(topic.title) === target))
    ?? topics.find((topic) => normalize(topic.id) === target || normalize(topic.title) === target);
}

export function getTopicNeighbors(topicId: string) {
  const topic = getTopic(topicId);
  const sequence = getRoadmapPhases(topic.domainSlug).flatMap((phase) => phase.topics);
  const index = sequence.findIndex((entry) => entry.id === topic.id);
  return { previous: index > 0 ? sequence[index - 1] : undefined, next: index >= 0 ? sequence[index + 1] : undefined };
}

export function getDomain(slug: string) {
  const domain = domains.find((entry) => entry.slug === slug);
  if (!domain) throw new Error(`Unknown GuideX domain: ${slug}`);
  return domain;
}