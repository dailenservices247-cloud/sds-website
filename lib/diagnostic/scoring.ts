// lib/diagnostic/scoring.ts
//
// 5-question agent-stack diagnostic. Each question is a 1-5 Likert scale.
// Sum produces a 5-25 score, bucketed into three states.
//
// Question design source: the 8-layer SDS agent stack (org, tactical, vertical-loop,
// artifact, memory authoring, orchestration, goal/methodology, retrieval contract).
// Each question probes one structural dimension a Peer Operator's stack either has
// or doesn't.

export type DiagnosticAnswer = 1 | 2 | 3 | 4 | 5;

export type DiagnosticAnswers = {
  memory: DiagnosticAnswer;
  verify: DiagnosticAnswer;
  workflow: DiagnosticAnswer;
  voice: DiagnosticAnswer;
  artifact: DiagnosticAnswer;
};

export type DiagnosticBucket = "starting" | "building" | "compounding";

export type DiagnosticResult = {
  score: number;
  bucket: DiagnosticBucket;
  perDimension: DiagnosticAnswers;
  weakest: keyof DiagnosticAnswers;
  strongest: keyof DiagnosticAnswers;
};

export type DiagnosticQuestion = {
  key: keyof DiagnosticAnswers;
  prompt: string;
  context: string;
  scale: { value: DiagnosticAnswer; label: string }[];
};

export const QUESTIONS: DiagnosticQuestion[] = [
  {
    key: "memory",
    prompt: "How does your agent know what your business already decided?",
    context: "Memory + retrieval layer. The agent's awareness of locked decisions.",
    scale: [
      { value: 1, label: "It doesn't. Every session starts from scratch." },
      { value: 2, label: "I paste context into the prompt each time." },
      { value: 3, label: "I have a CLAUDE.md or similar that loads, but it drifts." },
      { value: 4, label: "Atomic decision notes the agent can scan and follow." },
      { value: 5, label: "Typed atomic nodes plus a retrieval contract per project." },
    ],
  },
  {
    key: "verify",
    prompt: "When your agent ships work, what verifies it before you see it?",
    context: "Self-verify loop. Closes the agent-write to bug-find gap.",
    scale: [
      { value: 1, label: "Nothing. I find bugs after the fact." },
      { value: 2, label: "I run a manual check after each delivery." },
      { value: 3, label: "Tests run, but the agent doesn't read the results." },
      { value: 4, label: "Agent runs tests and reports back, but no UI e2e." },
      { value: 5, label: "Chrome DevTools or iOS Simulator MCP runs the happy path before report." },
    ],
  },
  {
    key: "workflow",
    prompt: "How structured is your agent's workflow today?",
    context: "Goal + methodology layer. Whether the session has structure or just vibes.",
    scale: [
      { value: 1, label: "Pure vibes. I prompt, hope, ship." },
      { value: 2, label: "I have a rough sequence but nothing enforced." },
      { value: 3, label: "Plan-mode brief sometimes, mostly ad hoc." },
      { value: 4, label: "Gap analysis plus plan-mode brief before mutation, most sessions." },
      { value: 5, label: "Socratic spec, plan, subagent-driven dev, every significant session." },
    ],
  },
  {
    key: "voice",
    prompt: "How consistent is your AI output with your brand voice?",
    context: "Brand register layer. Whether output passes register check or sounds like everyone else's AI.",
    scale: [
      { value: 1, label: "AI-slop generic. Reads like ChatGPT default." },
      { value: 2, label: "Style guide exists, agent ignores it." },
      { value: 3, label: "Inline reminders sometimes catch register drift." },
      { value: 4, label: "Banned-words list and register enforced manually." },
      { value: 5, label: "Brand-voice linter gates every output. Doctrine Injection on craft tasks." },
    ],
  },
  {
    key: "artifact",
    prompt: "When your agent produces deliverables, what format do they ship in?",
    context: "Artifact layer. Right format for the audience.",
    scale: [
      { value: 1, label: "Whatever the chat dumped. No structure." },
      { value: 2, label: "Manually copy-pasted into a doc." },
      { value: 3, label: "Markdown files I move into project folders." },
      { value: 4, label: "Atomic notes in a vault, rendered to PDF when shared." },
      { value: 5, label: "Hybrid pipeline: markdown for agent ingestion, HTML for human review." },
    ],
  },
];

const BUCKET_THRESHOLDS = { starting: 10, building: 17 } as const;

export function bucketFromScore(score: number): DiagnosticBucket {
  if (score <= BUCKET_THRESHOLDS.starting) return "starting";
  if (score <= BUCKET_THRESHOLDS.building) return "building";
  return "compounding";
}

export function scoreAnswers(answers: DiagnosticAnswers): DiagnosticResult {
  const score =
    answers.memory + answers.verify + answers.workflow + answers.voice + answers.artifact;

  let weakest: keyof DiagnosticAnswers = "memory";
  let strongest: keyof DiagnosticAnswers = "memory";
  for (const key of Object.keys(answers) as (keyof DiagnosticAnswers)[]) {
    if (answers[key] < answers[weakest]) weakest = key;
    if (answers[key] > answers[strongest]) strongest = key;
  }

  return {
    score,
    bucket: bucketFromScore(score),
    perDimension: answers,
    weakest,
    strongest,
  };
}

export const BUCKET_COPY: Record<
  DiagnosticBucket,
  { title: string; thesis: string; primaryCta: { label: string; href: string }; secondaryCta?: { label: string; href: string } }
> = {
  starting: {
    title: "Starting",
    thesis:
      "Your agent runs one prompt at a time. Useful for tasks, but every session restarts the clock. The biggest near-term win is the Setup Session: one week, one configured stack, one set of governing decisions the agent loads automatically from then on.",
    primaryCta: {
      label: "Book the Setup Session",
      href: "/v1-garden#offers",
    },
  },
  building: {
    title: "Building",
    thesis:
      "You have pieces in place. The gap is consistency: decisions get made but not banked, output gets shipped but not gated, plans get written but not followed. Foundation Subscription closes those gaps incrementally each week without rebuilding everything.",
    primaryCta: {
      label: "See Foundation Subscription",
      href: "/v1-garden#offers",
    },
    secondaryCta: {
      label: "Or grab the Atomic Note Template Pack",
      href: "/atomic-note-pack",
    },
  },
  compounding: {
    title: "Compounding",
    thesis:
      "Your stack is the asset, not the bottleneck. The next leverage layer is Headless Architect: a 10-client capped cohort retainer with monthly architecture review, governance you can hand to your own clients, and a value-back guarantee if the month does not move the work forward. Pairs with the Operator community tier for peer pressure at the same maturity level.",
    primaryCta: {
      label: "Talk about Headless Architect",
      href: "/v1-garden#offers",
    },
    secondaryCta: {
      label: "Join the Operator community",
      href: "/v1-garden#offers",
    },
  },
};

export const DIMENSION_LABELS: Record<keyof DiagnosticAnswers, string> = {
  memory: "Memory and retrieval",
  verify: "Self-verification loop",
  workflow: "Workflow methodology",
  voice: "Brand voice register",
  artifact: "Deliverable artifact format",
};
