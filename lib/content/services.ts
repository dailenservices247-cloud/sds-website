import type { LucideIcon } from "lucide-react";
import { Workflow, ShieldCheck, Code2 } from "lucide-react";

// ----------------------------------------------------------------------------
// Services — retracted to three, 2026-08-20.
// ----------------------------------------------------------------------------
//
// Supersedes the Architect / Automator / Strategist ladder (locked 2026-05-14).
// Dailen retracted the accreted offering to three lines; the redesign PRD
// (AI Hub/PRDs/sds-website-redesign-2026-08-20.md §10.1) is the approval and
// carries the pricing rationale.
//
// Pricing is anchored to the 2026-07-06 war-gamed client numbers, not to the
// abstract 2026-05-14 ladder:
//   Vertical Pipeline  inherits Andre's locked deal (1,500 / 7,500 / 750-mo)
//   Build              inherits the Architect ladder unchanged — same work
//   AI Security        new. No comparables; structurally consistent with the
//                      other two. Sanity-check the 2,500 against a real
//                      prospect conversation before leaning on it.
//
// Structural property: every service has a PAID FRONT DOOR. No free discovery
// calls, and each door qualifies the lead before it costs Dailen an hour.
//
// Copy register per PRODUCT.md: builder-to-builder, anti-overclaim, no
// agency-speak, no hype. Observation about the work beats adjectives.
// ----------------------------------------------------------------------------

export type ServiceSlug = "pipeline" | "security" | "build";

export interface EngagementModel {
  name: string;
  description: string;
  price: string;
  bestFor: string;
}

export interface Service {
  slug: ServiceSlug;
  numeral: string;
  name: string;
  tagline: string;
  shortDescription: string;
  longDescription: string;
  icon: LucideIcon;
  offerings: string[];
  useCases: {
    title: string;
    description: string;
  }[];
  engagementModels: EngagementModel[];
}

export const services: Service[] = [
  {
    slug: "pipeline",
    numeral: "01",
    name: "Vertical Pipeline",
    tagline: "The workflow one industry actually runs on, built once and proven.",
    shortDescription:
      "We built the intake-to-outcome pipeline for veterinary practices. The same shape fits other trades that run on appointments, records, and follow-through.",
    longDescription:
      "Most automation projects fail because they automate a process nobody mapped. This starts the other way around: we sit inside one vertical until the real workflow is visible — including the parts that live in someone's head — and then build the pipeline that carries it. Scrlpets is the worked example. The architecture underneath it is not species-specific and not industry-specific; what makes it work is that somebody did the mapping first.",
    icon: Workflow,
    offerings: [
      "Process mapping, including the undocumented steps",
      "Intake, scheduling, and record pipelines",
      "Automated follow-through with human checkpoints",
      "Integration with the tools the business already pays for",
      "Data model and source-of-truth cleanup before any automation runs",
      "Runbook the team can read at 2am",
    ],
    useCases: [
      {
        title: "You are the pipeline",
        description:
          "Every booking, reminder, and record passes through one person. That works until they take a week off.",
      },
      {
        title: "The tools do not talk",
        description:
          "Scheduling in one system, records in another, billing in a third, and a person retyping between them.",
      },
      {
        title: "Someone else's vertical, same shape",
        description:
          "We built it for veterinary. If your trade runs on appointments, records, and follow-through, the shape transfers.",
      },
    ],
    engagementModels: [
      {
        name: "Pipeline Blueprint",
        description:
          "We map your actual process — including the workarounds — and hand you the architecture. Yours to keep whether or not we build it.",
        price: "$1,500",
        bestFor: "Deciding whether this is worth doing at all.",
      },
      {
        name: "Pipeline Build",
        description:
          "The blueprint, built and shipped, with the data model cleaned up first and a runbook at the end.",
        price: "$7,500",
        bestFor: "You know the process and want it to stop depending on one person.",
      },
      {
        name: "Managed Pipeline",
        description:
          "Ongoing operation, monitoring, and change requests as the business moves.",
        price: "$750/mo",
        bestFor: "The pipeline is live and needs to keep working without you watching it.",
      },
    ],
  },
  {
    slug: "security",
    numeral: "02",
    name: "AI Security",
    tagline: "Proactive and reactive. Before something gets through, and after.",
    shortDescription:
      "Most AI security advice is written for enterprises with a security team. This is for operators who shipped an agent and now have questions they cannot answer.",
    longDescription:
      "An agent with tool access is a new attack surface, and the interesting failures are not the ones the frameworks warn about. Prompt injection arrives inside data you trusted. Credentials end up in a context window. An agent takes an action nobody authorised because nobody wrote down what it was allowed to do. The proactive half is finding those before someone else does. The reactive half is what happens the week after something got through — containment, then repair, then the change that stops the repeat.",
    icon: ShieldCheck,
    offerings: [
      "Prompt-injection and tool-abuse review of live agents",
      "Authority-boundary audit — what each agent can and cannot do, written down",
      "Secret and credential exposure across prompts, logs, and context",
      "Data-boundary review for regulated or sensitive material",
      "Incident containment and post-incident repair",
      "Ongoing monitoring with findings you can act on",
    ],
    useCases: [
      {
        title: "You shipped an agent with tool access",
        description:
          "It can read, write, and act. Nobody has written down what it is not allowed to do.",
      },
      {
        title: "Something already got through",
        description:
          "Contain it, repair it, and change the thing that let it happen. In that order.",
      },
      {
        title: "A client is asking questions you cannot answer",
        description:
          "Procurement wants to know how the agent is bounded. You need a real answer, not a policy document.",
      },
    ],
    engagementModels: [
      {
        name: "Security Audit",
        description:
          "A review of what you have running, with findings ranked by what an attacker would reach first.",
        price: "$2,500",
        bestFor: "Something is live and you have not looked at it this way yet.",
      },
      {
        name: "Remediation",
        description:
          "Fixing what the audit found. Deliberately not fixed-price — remediation cannot be scoped before the audit, and a number quoted blind is a guess.",
        price: "From $7,500, scoped from audit",
        bestFor: "The audit found things and you want them closed.",
      },
      {
        name: "Monitoring",
        description:
          "Ongoing watch with findings surfaced when they matter, not a dashboard nobody opens.",
        price: "$750/mo",
        bestFor: "The surface keeps changing because you keep shipping.",
      },
    ],
  },
  {
    slug: "build",
    numeral: "03",
    name: "Build",
    tagline: "Sites, apps, and landing pages, built the way the business works.",
    shortDescription:
      "When off-the-shelf does not fit and you need software shaped around your actual process rather than someone else's.",
    longDescription:
      "This is where SDS designs and ships production software. Web apps, internal tools, customer-facing platforms, landing pages — modern stacks, typed end to end, deployed on infrastructure you could hand to an engineer six months from now without an apology. The work is deliberate rather than fast, and the reason is that fast software is usually someone else's problem later.",
    icon: Code2,
    offerings: [
      "Full-stack web applications (Next.js, Supabase, Vercel)",
      "Internal tools and admin dashboards",
      "Marketing sites and landing pages",
      "Ecommerce and marketplace platforms",
      "API design and backend services",
      "Legacy rebuilds and migrations",
    ],
    useCases: [
      {
        title: "Replace a spreadsheet with an app",
        description:
          "Operations run on Excel and one person understands the formulas. Turn it into software that outlives them.",
      },
      {
        title: "Ship the smallest version that proves it",
        description:
          "You have a product idea and a deadline. Build the version that answers the question, then iterate.",
      },
      {
        title: "The landing page is the product right now",
        description:
          "Nothing is built yet and the page has to carry the whole pitch on its own.",
      },
    ],
    engagementModels: [
      {
        name: "Lean Build",
        description:
          "A focused build with a narrow scope, shipped and handed over.",
        price: "Starting at $4,500",
        bestFor: "One clear thing, well made.",
      },
      {
        name: "Standard Platform",
        description:
          "A multi-surface build with real data, auth, and the operational pieces behind it.",
        price: "Starting at $9,500",
        bestFor: "A product rather than a page.",
      },
      {
        name: "Custom Ecosystem",
        description:
          "Multiple connected surfaces, shared infrastructure, and a migration path off whatever you are on now.",
        price: "Starting at $20,000",
        bestFor: "Several systems that need to become one.",
      },
    ],
  },
];

export function getService(slug: ServiceSlug): Service {
  const service = services.find((s) => s.slug === slug);
  if (!service) throw new Error(`Unknown service slug: ${slug}`);
  return service;
}
