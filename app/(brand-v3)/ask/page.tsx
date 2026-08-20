// app/(brand-v3)/ask/page.tsx
//
// /ask — the zero-LLM half of the Helix concierge, shipped now.
//
// The concierge spec is locked; its build is banked until first paid close. This
// route is the part that costs nothing: a visitor asks a real question, a human
// answers it, and the accumulating log becomes the corpus backlog for the
// eventual agent — written against actual demand rather than guesses.
//
// /matchmaker redirects here. It was a placeholder for "interactive interview
// that recommends the AI business that fits you", which is this route built
// honestly rather than promised.
//
// NOT DONE YET, deliberately: the concierge spec says the creature itself is the
// button. Helix currently renders as the capsule placeholder, not the rigged
// model, and the canvas is pointer-events-none so clicks reach content. Wiring
// "click the worm" to a stand-in would be a worse affordance than a plain link.
// That lands with the rigged GLB.

import type { Metadata } from "next";
import { AskForm } from "@/components/brand-v3/AskForm";
import { SITE_URL } from "@/lib/site-config";

const DESCRIPTION =
  "Ask a real question about the work, the portfolio, the channels, or a project you are considering. A person answers.";

export const metadata: Metadata = {
  title: { absolute: "Ask · Synapse Dynamics" },
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/ask` },
  openGraph: {
    title: "Ask · Synapse Dynamics",
    description: DESCRIPTION,
    url: `${SITE_URL}/ask`,
    type: "website",
  },
};

export default function AskPage() {
  return (
    <section className="container-x max-w-3xl pt-24 pb-28 md:pt-36">
      <p className="bv3-mono mb-6">Ask</p>
      <h1
        className="bv3-display text-ink-primary text-balance"
        style={{ fontSize: "clamp(2.5rem, 6vw, 4.25rem)", maxWidth: "16ch" }}
      >
        Ask a real question.
      </h1>
      <p className="text-ink-muted mt-8 max-w-2xl text-lg leading-relaxed text-pretty md:text-xl">
        About the work, the portfolio, the channels, or something you are
        thinking about building. No form maze, no qualification quiz, no bot
        pretending to be helpful — a person reads it and answers.
      </p>

      <AskForm />

      <p className="bv3-mono text-ink-dim mt-16 max-w-2xl leading-relaxed">
        Answers usually go out within a day or two. If a question turns out to be
        one a lot of people are asking, it stops being an answer and becomes a
        page.
      </p>
    </section>
  );
}
