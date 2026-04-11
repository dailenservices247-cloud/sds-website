import type { LucideIcon } from "lucide-react";
import { Code2, Workflow, Compass } from "lucide-react";

export type ServiceSlug = "architect" | "automator" | "strategist";

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
    slug: "architect",
    numeral: "01",
    name: "Architect",
    tagline: "Custom apps, web platforms, and the systems they run on.",
    shortDescription:
      "When off-the-shelf doesn't fit and you need software built the way your business actually works.",
    longDescription:
      "Architect is where SDS designs and ships production software. Web apps, internal tools, customer-facing platforms, ecosystems — all built with modern stacks, typed end-to-end, and deployed on infrastructure you can hand to an engineer six months from now without an apology.",
    icon: Code2,
    offerings: [
      "Full-stack web applications (Next.js, Supabase, Vercel)",
      "Internal tools and admin dashboards",
      "Ecommerce and marketplace platforms",
      "Mobile PWAs and native wrappers",
      "API design and backend services",
      "Legacy system rebuilds and migrations",
    ],
    useCases: [
      {
        title: "Replace a spreadsheet with an app",
        description:
          "Your ops run on Excel. One person understands the formulas. Turn it into software that scales without that person.",
      },
      {
        title: "Ship a SaaS MVP",
        description:
          "You have a product idea and 8 weeks. We build the smallest version that proves it works, then iterate with you.",
      },
      {
        title: "Rebuild a legacy tool",
        description:
          "Your old system is holding the business back. We migrate it piece by piece without taking you offline.",
      },
      {
        title: "Internal platform for operators",
        description:
          "Your team is drowning in manual work. We build the tool they should have had two years ago.",
      },
    ],
    engagementModels: [
      {
        name: "Project",
        description:
          "Fixed scope, fixed timeline. Best for discrete builds with clear requirements.",
        price: "Starting at $___",
        bestFor: "MVPs, internal tools, clear-scope rebuilds",
      },
      {
        name: "Retainer",
        description:
          "Dedicated capacity, month-to-month. For ongoing product development and feature work.",
        price: "Starting at $___/mo",
        bestFor: "Active products needing continuous delivery",
      },
      {
        name: "Equity partnership",
        description:
          "Reduced cash, meaningful equity. Reserved for founders we want to build the future with.",
        price: "Custom",
        bestFor: "Pre-seed founders with strong product instincts",
      },
    ],
  },
  {
    slug: "automator",
    numeral: "02",
    name: "Automator",
    tagline: "Business workflows that run themselves, without the glue-code tax.",
    shortDescription:
      "Every business has tasks a human shouldn't be doing. Automator finds them and ships the system that handles them.",
    longDescription:
      "Automator builds workflow automations that actually hold up under load. n8n, Zapier, custom scripts, AI-in-the-loop pipelines — whatever fits. The deliverable isn't a diagram; it's a system running in production with monitoring, error alerts, and a runbook your team can read at 2am.",
    icon: Workflow,
    offerings: [
      "n8n workflow design and deployment",
      "AI-powered document processing pipelines",
      "CRM and marketing automation",
      "Scheduled reports and data syncs",
      "Webhook integrations between SaaS tools",
      "Custom scraping and data collection",
    ],
    useCases: [
      {
        title: "Kill a recurring weekly task",
        description:
          "Someone spends 4 hours every Friday copying data between systems. We make it zero.",
      },
      {
        title: "Route leads while you sleep",
        description:
          "Form fills, CRM updates, enrichment, assignment, alerting — all running on autopilot.",
      },
      {
        title: "AI triage for inboxes and tickets",
        description:
          "Classify, label, and route incoming messages with a model that respects your categories.",
      },
      {
        title: "Sync two SaaS tools that hate each other",
        description:
          "Your CRM and your billing tool need to talk. We build the bridge and keep it maintained.",
      },
    ],
    engagementModels: [
      {
        name: "Single workflow",
        description:
          "One automation, built and deployed. Includes documentation and 30 days of bug support.",
        price: "Starting at $___",
        bestFor: "Teams with one specific pain point",
      },
      {
        name: "Automation retainer",
        description:
          "We operate as your part-time automation team. Design, build, maintain, and extend.",
        price: "Starting at $___/mo",
        bestFor: "Businesses with ongoing process change",
      },
      {
        name: "Audit + roadmap",
        description:
          "One-time engagement. We map every repetitive task in your org and rank them by ROI.",
        price: "Starting at $___",
        bestFor: "Operators who know there's waste but can't see it",
      },
    ],
  },
  {
    slug: "strategist",
    numeral: "03",
    name: "Strategist",
    tagline: "AI strategy, positioning, and the work that comes before the work.",
    shortDescription:
      "Before you build, you need to know what to build. Strategist is the consulting tier — opinionated, specific, actionable.",
    longDescription:
      "Strategist is where SDS helps leadership teams decide what to do with AI. Not vague roadmaps. Not 60-slide decks. Specific decisions: build vs. buy, which workflows to automate first, where AI will actually move the metric vs. where it's a shiny distraction. Comes out of every engagement with a written plan and the hit list to execute it.",
    icon: Compass,
    offerings: [
      "AI readiness audits and opportunity mapping",
      "Build-vs-buy decisions for AI tooling",
      "Vendor evaluation and RFP support",
      "Workflow prioritization and ROI modeling",
      "Positioning and go-to-market for AI products",
      "Technical due diligence for investors",
    ],
    useCases: [
      {
        title: "Your team wants to add AI somewhere",
        description:
          "Everyone is talking about it. Nobody knows where to start. We show you the three highest-ROI places and build the first one.",
      },
      {
        title: "You're evaluating 5 vendors and drowning",
        description:
          "We run a structured evaluation, test each one against your actual data, and recommend the one that fits.",
      },
      {
        title: "Your AI product isn't landing",
        description:
          "Great tech, weak positioning. We diagnose the message, rewrite the pitch, and pressure-test it.",
      },
    ],
    engagementModels: [
      {
        name: "Consultation",
        description:
          "A 90-minute strategic session. You leave with a written summary and three next actions.",
        price: "Starting at $___",
        bestFor: "Specific, bounded questions — fast answers",
      },
      {
        name: "Sprint",
        description:
          "Two focused weeks. Discovery, analysis, and a delivered plan with prioritized hit list.",
        price: "Starting at $___",
        bestFor: "Teams ready to decide and act",
      },
      {
        name: "Partnership",
        description:
          "Monthly retainer. Ongoing strategic advisor access, quarterly reviews, and roadmap input.",
        price: "Starting at $___/mo",
        bestFor: "Founders who want SDS in the room",
      },
    ],
  },
];

export function getService(slug: ServiceSlug): Service {
  const s = services.find((svc) => svc.slug === slug);
  if (!s) throw new Error(`Unknown service slug: ${slug}`);
  return s;
}
