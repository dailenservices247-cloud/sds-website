// components/brand-v3/DiagnosticForm.tsx
//
// 5-question agent-stack diagnostic. Single component, two states: form + result.
// Brand v3 register: matte-gray ground, petrol/gold accents, Bricolage display,
// Geist body. Mobile-responsive single column.
//
// Posts to /api/diagnostic and renders the scored result inline.
// Tracks events via @vercel/analytics for funnel measurement.

"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";
import {
  QUESTIONS,
  BUCKET_COPY,
  DIMENSION_LABELS,
  type DiagnosticAnswer,
  type DiagnosticAnswers,
  type DiagnosticBucket,
} from "@/lib/diagnostic/scoring";

type ResultData = {
  score: number;
  bucket: DiagnosticBucket;
  perDimension: DiagnosticAnswers;
  weakest: keyof DiagnosticAnswers;
  strongest: keyof DiagnosticAnswers;
};

const DIM_KEYS: (keyof DiagnosticAnswers)[] = [
  "memory",
  "verify",
  "workflow",
  "voice",
  "artifact",
];

export function DiagnosticForm() {
  const [answers, setAnswers] = useState<Partial<DiagnosticAnswers>>({});
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ResultData | null>(null);

  const allAnswered = DIM_KEYS.every((k) => answers[k] !== undefined);
  const answeredCount = DIM_KEYS.filter((k) => answers[k] !== undefined).length;

  function setAnswer(key: keyof DiagnosticAnswers, value: DiagnosticAnswer) {
    if (!answers[key] && Object.keys(answers).length === 0) {
      track("diagnostic_started");
    }
    setAnswers((prev) => ({ ...prev, [key]: value }));
    track("diagnostic_answer", { question: key, value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!allAnswered) return;

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/diagnostic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers: answers as DiagnosticAnswers,
          email: email.trim() || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || `Submission failed (HTTP ${res.status}).`);
        track("diagnostic_error", { status: res.status });
        return;
      }

      const data = (await res.json()) as ResultData;
      setResult(data);
      track("diagnostic_scored", { score: data.score, bucket: data.bucket });
      // Scroll result into view on smaller screens
      requestAnimationFrame(() => {
        document.getElementById("diagnostic-result")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    } catch {
      setError("Network error. Try again.");
      track("diagnostic_error", { status: "network" });
    } finally {
      setSubmitting(false);
    }
  }

  if (result) {
    return <DiagnosticResult result={result} />;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-3xl"
      aria-label="Agent stack diagnostic, 5 questions"
    >
      <ProgressBar answered={answeredCount} total={QUESTIONS.length} />

      <div className="mt-8 flex flex-col gap-12">
        {QUESTIONS.map((q, idx) => (
          <fieldset key={q.key} className="flex flex-col gap-4">
            <legend className="flex flex-col gap-2">
              <span
                className="bv3-mono"
                style={{ color: "var(--bv3-gold)", letterSpacing: "0.12em" }}
              >
                QUESTION {idx + 1} / {QUESTIONS.length}
              </span>
              <span
                className="bv3-display text-2xl md:text-3xl"
                style={{ color: "var(--bv3-ink-strong)" }}
              >
                {q.prompt}
              </span>
              <span style={{ color: "var(--bv3-ink-muted)" }} className="text-sm">
                {q.context}
              </span>
            </legend>

            <div className="flex flex-col gap-2">
              {q.scale.map((option) => {
                const selected = answers[q.key] === option.value;
                return (
                  <label
                    key={option.value}
                    className="flex cursor-pointer items-start gap-3 rounded-md px-4 py-3 transition-colors"
                    style={{
                      backgroundColor: selected
                        ? "var(--bv3-spine)"
                        : "var(--bv3-shell-deep)",
                      border: `1px solid ${
                        selected ? "var(--bv3-spine-bright)" : "var(--bv3-border-subtle)"
                      }`,
                      color: selected
                        ? "var(--bv3-ink-strong)"
                        : "var(--bv3-ink)",
                    }}
                  >
                    <input
                      type="radio"
                      name={q.key}
                      value={option.value}
                      checked={selected}
                      onChange={() => setAnswer(q.key, option.value)}
                      className="mt-1"
                      style={{ accentColor: "var(--bv3-gold)" }}
                    />
                    <span className="flex flex-col gap-1">
                      <span
                        className="bv3-mono text-xs"
                        style={{
                          color: selected ? "var(--bv3-gold-bright)" : "var(--bv3-ink-muted)",
                        }}
                      >
                        {option.value} / 5
                      </span>
                      <span className="text-base">{option.label}</span>
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        ))}

        <div className="flex flex-col gap-3">
          <label
            htmlFor="diagnostic-email"
            className="bv3-mono"
            style={{ color: "var(--bv3-ink-muted)", letterSpacing: "0.12em" }}
          >
            EMAIL (OPTIONAL)
          </label>
          <input
            id="diagnostic-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="rounded-md px-4 py-3 text-base"
            style={{
              backgroundColor: "var(--bv3-shell-deep)",
              border: "1px solid var(--bv3-border-subtle)",
              color: "var(--bv3-ink)",
            }}
            autoComplete="email"
          />
          <span style={{ color: "var(--bv3-ink-dim)" }} className="text-xs">
            Get the result without typing your email. Add it only if you want a follow-up from us.
          </span>
        </div>

        {error ? (
          <p
            role="alert"
            className="rounded-md px-4 py-3"
            style={{
              backgroundColor: "var(--bv3-wine)",
              color: "var(--bv3-cream)",
            }}
          >
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={!allAnswered || submitting}
          className="rounded-md px-6 py-4 text-base font-medium transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
          style={{
            backgroundColor: "var(--bv3-gold)",
            color: "var(--bv3-shell)",
          }}
        >
          {submitting
            ? "Scoring…"
            : allAnswered
              ? "See my score"
              : `${answeredCount} of ${QUESTIONS.length} answered`}
        </button>
      </div>
    </form>
  );
}

function ProgressBar({ answered, total }: { answered: number; total: number }) {
  const pct = Math.round((answered / total) * 100);
  return (
    <div
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      className="h-1 w-full overflow-hidden rounded-full"
      style={{ backgroundColor: "var(--bv3-border-subtle)" }}
    >
      <div
        className="h-full transition-all duration-300"
        style={{
          width: `${pct}%`,
          backgroundColor: "var(--bv3-gold)",
        }}
      />
    </div>
  );
}

function DiagnosticResult({ result }: { result: ResultData }) {
  const copy = BUCKET_COPY[result.bucket];

  return (
    <section
      id="diagnostic-result"
      className="mx-auto w-full max-w-3xl"
      aria-label="Diagnostic result"
    >
      <div
        className="bv3-mono"
        style={{ color: "var(--bv3-gold)", letterSpacing: "0.18em" }}
      >
        YOUR RESULT
      </div>

      <h2
        className="bv3-display mt-2 text-5xl md:text-6xl"
        style={{ color: "var(--bv3-ink-strong)", lineHeight: 0.95 }}
      >
        {copy.title}
      </h2>

      <p
        className="bv3-mono mt-4 text-lg"
        style={{ color: "var(--bv3-cream)" }}
      >
        {result.score} / 25
      </p>

      <p
        className="mt-8 text-lg leading-relaxed"
        style={{ color: "var(--bv3-ink)" }}
      >
        {copy.thesis}
      </p>

      <div className="mt-10 flex flex-col gap-2">
        <div
          className="bv3-mono mb-2"
          style={{ color: "var(--bv3-gold)", letterSpacing: "0.12em" }}
        >
          PER-DIMENSION
        </div>
        {DIM_KEYS.map((key) => {
          const value = result.perDimension[key];
          const isWeakest = key === result.weakest;
          const isStrongest = key === result.strongest;
          return (
            <div
              key={key}
              className="flex items-center gap-4 rounded-md px-4 py-3"
              style={{
                backgroundColor: "var(--bv3-shell-deep)",
                border: `1px solid ${
                  isWeakest
                    ? "var(--bv3-wine)"
                    : isStrongest
                      ? "var(--bv3-spine-bright)"
                      : "var(--bv3-border-subtle)"
                }`,
              }}
            >
              <span
                className="bv3-mono w-12 shrink-0"
                style={{
                  color: isStrongest
                    ? "var(--bv3-gold-bright)"
                    : isWeakest
                      ? "var(--bv3-cream)"
                      : "var(--bv3-ink-muted)",
                }}
              >
                {value} / 5
              </span>
              <span style={{ color: "var(--bv3-ink)" }}>
                {DIMENSION_LABELS[key]}
              </span>
              {isWeakest ? (
                <span
                  className="bv3-mono ml-auto text-xs"
                  style={{ color: "var(--bv3-cream)" }}
                >
                  WEAKEST
                </span>
              ) : null}
              {isStrongest ? (
                <span
                  className="bv3-mono ml-auto text-xs"
                  style={{ color: "var(--bv3-gold-bright)" }}
                >
                  STRONGEST
                </span>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
        <a
          href={copy.primaryCta.href}
          className="rounded-md px-6 py-4 text-base font-medium transition-opacity hover:opacity-90"
          style={{
            backgroundColor: "var(--bv3-gold)",
            color: "var(--bv3-shell)",
          }}
          onClick={() => track("diagnostic_cta_primary", { bucket: result.bucket })}
        >
          {copy.primaryCta.label}
        </a>
        {copy.secondaryCta ? (
          <a
            href={copy.secondaryCta.href}
            className="rounded-md px-6 py-4 text-base"
            style={{
              border: "1px solid var(--bv3-border-strong)",
              color: "var(--bv3-ink)",
            }}
            onClick={() =>
              track("diagnostic_cta_secondary", { bucket: result.bucket })
            }
          >
            {copy.secondaryCta.label}
          </a>
        ) : null}
      </div>
    </section>
  );
}
