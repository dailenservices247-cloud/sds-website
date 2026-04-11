import type { Metadata } from "next";
import { Mail, Clock, MessageSquare } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with Synapse Dynamics. Tell us what you're trying to build and we'll respond within one business day.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us what you're trying to build."
        description="The more specific, the better. We read every message. If we're not a fit we'll say so — and point you somewhere that might be."
      />

      <section className="section-y">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            <div className="order-2 lg:order-1">
              <ContactForm />
            </div>

            <aside className="order-1 space-y-6 lg:order-2">
              <div className="rounded-2xl border border-[color:var(--border-subtle)] bg-bg-surface p-6">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[color:var(--border-subtle)] bg-bg-primary text-accent">
                    <Clock className="h-4 w-4" />
                  </span>
                  <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-accent">
                    Response time
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                  We reply within one business day. Most inquiries get a same-day
                  response during working hours (Eastern Time).
                </p>
              </div>

              <div className="rounded-2xl border border-[color:var(--border-subtle)] bg-bg-surface p-6">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[color:var(--border-subtle)] bg-bg-primary text-accent">
                    <MessageSquare className="h-4 w-4" />
                  </span>
                  <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-accent">
                    What to include
                  </h3>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-ink-muted">
                  <li>• What you&apos;re trying to ship or fix</li>
                  <li>• What you&apos;ve already tried</li>
                  <li>• Your timeline and budget if you have them</li>
                  <li>• Anything we shouldn&apos;t touch</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-[color:var(--border-subtle)] bg-bg-surface p-6">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[color:var(--border-subtle)] bg-bg-primary text-accent">
                    <Mail className="h-4 w-4" />
                  </span>
                  <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-accent">
                    Direct
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                  Prefer email? Reach us at{" "}
                  <a
                    href="mailto:hello@synapsedynamics.com"
                    className="text-ink-primary underline decoration-accent/40 underline-offset-2 transition-colors hover:text-accent"
                  >
                    hello@synapsedynamics.com
                  </a>
                  .
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
