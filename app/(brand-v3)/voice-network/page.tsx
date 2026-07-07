// app/(brand-v3)/voice-network/page.tsx
//
// Claude Voice Network Pack v2 landing — async-worker pattern as hero.
//
// v1 (RELIEF framing) led with "stop typing on phone." Solid framing but
// it sold the bridge, not the differentiator. The real differentiator is
// the async-worker pattern: phone Claude dispatches tasks via vault →
// desktop Claude Code executes headless → voice reads result back.
//
// v2 reframes around: "Tell your phone Claude what to build. Your desktop
// builds it while you walk." Bridge becomes table-stakes; the worker
// pattern is the lead. Free pack distributes the workshop tier; SDS
// Operator Install ($2,500) is the revenue layer.
//
// Decision context:
//   AI Hub/Decisions/decision-2026-05-26-async-worker-pattern-shipped.md
//   AI Hub/Decisions/decision-2026-05-27-obsidian-keepalive-hardened.md
//   AI Hub/Decisions/decision-2026-05-26-skills-pivot-locked.md
//
// Lives under the brand-v3 route group, V3 Cursor register.

import type { Metadata } from "next";
import {
  STRIPE_PEER_OPERATOR_STACK_LINK,
  SITE_URL,
} from "@/lib/site-config";

export const metadata: Metadata = {
  title:
    "Claude Voice Network Pack — phone voice mode dispatches, desktop Claude Code builds | Synapse Dynamics Segmented",
  description:
    "Tell your phone Claude what to build. Desktop Claude Code executes it while you walk. The vault is the inbox. Bridge + worker + methodology + 5 starter Projects. Mac only. Free.",
  alternates: { canonical: `${SITE_URL}/voice-network` },
  openGraph: {
    title: "Claude Voice Network Pack — your phone dispatches, your desktop builds",
    description:
      "Voice-mode dispatcher + headless desktop worker. Built once, runs while you sleep. Free. Mac only.",
    url: `${SITE_URL}/voice-network`,
    type: "website",
  },
};

const HOW_IT_WORKS = [
  {
    n: "01",
    title: "You talk to phone Claude in voice mode",
    body: "Walking. Driving. At work. Voice conversation about what you're building. When the conversation reaches a doable next step, you say go.",
  },
  {
    n: "02",
    title: "Phone Claude writes a task to your vault",
    body: "Single markdown file dropped in AI Hub/Task Queue/pending/ via the bridge. Plain text. Versioned. You can read it from any device.",
  },
  {
    n: "03",
    title: "Your desktop picks it up automatically",
    body: "launchd watches the pending folder. New file fires the task-queue-worker. Task moves to in-progress/. Notification on your Mac.",
  },
  {
    n: "04",
    title: "Claude Code executes it headless",
    body: "Full agentic loop. Read files. Write code. Run commands. Test. Inside your vault context. No babysitting. Built-in budget cap.",
  },
  {
    n: "05",
    title: "Voice-friendly result lands in completed/",
    body: "Short sentences. No markdown. Phone Claude reads it to you on your next check-in. Conversation continues. More tasks queue. Loop.",
  },
];

const USE_CASES = [
  {
    title: "The walk that built the feature",
    body: "You leave the laptop, voice-mode through a build session, agree on the next ship. Phone Claude writes the task. Desktop builds it. You walk home to a passing test suite and a voice readback of what landed.",
  },
  {
    title: "Five specialist Projects, one vault",
    body: "Discovery Co-pilot knows your current thinking. Build Co-pilot defends your scope. Sales Co-pilot remembers Monday's call. Content Co-pilot has your voice fingerprint. Personal-Memory Co-pilot is the mirror. None of them ask 'what are you working on?'",
  },
  {
    title: "One tunnel, every tool",
    body: "Obsidian, Stripe, GitHub, Supabase, custom MCPs — exposed through one phone. Same launchd pattern, different ports. Your phone becomes the remote for your whole stack.",
  },
  {
    title: "Self-healing infrastructure",
    body: "launchd KeepAlive on every daemon. cloudflared auto-reconnect on network blips. Obsidian keepalive auto-relaunches if you closed it by habit. Worker concurrency lock prevents stacked invocations. 9 silent-failure modes documented + solved.",
  },
];

const PACK_CONTENTS = [
  {
    section: "01 / BRIDGE",
    files: [
      "bridge/INSTALL.md — 5-step Mac install (~20 min)",
      "bridge/wrapper-template.sh — generic wrapper for any stdio MCP",
      "bridge/mcp-obsidian-wrapper.example.sh — worked Obsidian example",
      "bridge/plists/com.YOURNAME.mcp-proxy.plist + cloudflared-mcp.plist",
      "bridge/smoke-test.sh — 5-layer health check (auto-detects URL)",
      "bridge/troubleshooting.md — 9 silent-failure modes documented",
      "bridge/named-tunnel-setup.md — permanent URL via your subdomain",
    ],
  },
  {
    section: "02 / ASYNC WORKER",
    files: [
      "worker/task-queue-worker.sh — headless Claude Code execution",
      "worker/com.YOURNAME.task-queue-watcher.plist — launchd WatchPaths",
      "worker/obsidian-keepalive-check.sh — 4-layer disconnect prevention",
      "worker/com.YOURNAME.obsidian-keepalive.plist — 30-sec interval",
      "worker/voice-friendly-system-prompt.md — output format enforcement",
    ],
  },
  {
    section: "03 / PLAYBOOK",
    files: [
      "playbook/Project-Design-Playbook.md — full methodology (13 sections, 2200 words)",
    ],
  },
  {
    section: "04 / VAULT TEMPLATE",
    files: [
      "vault-template/README.md — install + why this structure works",
      "vault-template/Atomic-Node-Spec.md — decision/inference/context/test schema",
      "vault-template/Relay-Protocol.md — session activity feed rules",
      "vault-template/Handoff-Pattern.md — per-project handoff format",
      "vault-template/AI Hub/Task Queue/ — pending/in-progress/completed folders",
      "vault-template/AI Hub/ — 8 starter folders + Active-Work-Log stub + atomic-node-template",
    ],
  },
  {
    section: "05 / STARTER PROJECTS",
    files: [
      "templates/01-discovery — voice-driven discovery + ideation",
      "templates/02-build — sprint planning + scope-defending",
      "templates/03-sales — outreach + reply triage",
      "templates/04-content — long-form + social fanout",
      "templates/05-personal-memory — personal-knowledge mirror",
      "(each = 4 files following canonical pattern: system-instructions / context-bundle / questions-bank / session-end-template)",
    ],
  },
];

const SILENT_FAILURES = [
  {
    name: "Self-signed TLS cert rejection",
    fix: "NODE_TLS_REJECT_UNAUTHORIZED=0 in wrapper",
  },
  {
    name: "Transport mismatch (/sse vs /mcp)",
    fix: "Claude.ai connectors expect StreamableHTTP at /mcp",
  },
  {
    name: "launchd-spawned env stripped of PATH",
    fix: "Absolute paths + explicit PATH in plist EnvironmentVariables",
  },
  {
    name: "Keychain miss under launchd context",
    fix: "Match -a $USER in add + lookup; unlock keychain at boot",
  },
  {
    name: "Tunnel URL rotation on restart",
    fix: "Named tunnel + DNS CNAME (free Cloudflare tier)",
  },
  {
    name: "Claude.ai client cached old tool schema",
    fix: "Delete + recreate connector (toggle doesn't clear cache)",
  },
  {
    name: "Wrong-package endpoint paths (404 on every tool)",
    fix: "Pick MCP server actively maintained in last 60 days",
  },
  {
    name: "macOS TCC blocks launchd from Desktop folder",
    fix: "Grant Full Disk Access to worker script + /bin/bash",
  },
  {
    name: "Obsidian closes mid-session — phone Co-pilot tools vanish",
    fix: "4-layer keepalive stack: login items + launchd interval + URI scheme launch + 3-strike escalation",
  },
];

const FAQ = [
  {
    q: "What does the async-worker pattern actually do?",
    a: "Phone Claude voice mode can already talk. With the bridge, it can read your vault. With the worker, it can dispatch real work. Conversation hits a doable next step → phone Claude writes a markdown task file into your vault → desktop launchd watcher fires → Claude Code executes headless inside your vault context using all its tools (Read, Write, Edit, Bash) → voice-friendly result lands in completed/. Your phone reads it back on your next check-in. The vault is the inbox. The worker is the hands. The bridge is the wire.",
  },
  {
    q: "Why is this free? You used to charge $79.",
    a: "Distribution matters more than price for a niche operator product. Free unlocks GitHub stars + Reddit + Hacker News + awesome-lists distribution that the $79 SKU blocked. The pack stands on its own. If you want it installed for you with custom Project setup, the SDS Operator Install ($2,500) is the revenue tier.",
  },
  {
    q: "Mac only. What about Linux / Windows?",
    a: "v1 is Mac only because launchd is Mac-specific. Linux (systemd) and Windows (scheduled tasks) are banked for v2. If you're on a Mac, install today.",
  },
  {
    q: "Anthropic just announced MCP Tunnels. Why not wait?",
    a: "Anthropic shipped MCP Tunnels for Managed Agents enterprise customers on 2026-05-19. Doesn't extend to consumer Claude.ai yet. Likely will in 6-12 months. When it does, the bridge piece sunsets cleanly — point your Claude.ai connector at Anthropic's hosted endpoint instead. The Playbook, the vault structure, the async-worker pattern, the 5 starter Projects don't go away. The methodology + worker pattern are the durable assets.",
  },
  {
    q: "What stops the worker from running away with my time or money?",
    a: "Three guardrails ship in the worker script. (1) Concurrency lock — only one worker runs at a time, max 30-min lock age before stale clear. (2) Per-task budget cap — --max-budget-usd 2 by default, configurable. (3) Voice-friendly output system prompt forces final response to be the readback, no work logs or technical traces. Worker failures get logged to completed/ as a failure note so phone Claude can report it; the task file stays in in-progress/ so you can retry.",
  },
  {
    q: "What about disconnects? Obsidian closes and the pack breaks?",
    a: "Solved. v2 ships a 4-layer keepalive stack: macOS Login Items (auto-boot on startup) + launchd agent firing every 30 sec + URI scheme launch (`obsidian://open?vault=NAME` forces vault to open, not just app process) + 3-strike escalation (kill + force-relaunch after 3 consecutive REST failures). Verified: kill Obsidian, REST API back to 200 in 20 sec. Documented as silent failure #9 in bridge/troubleshooting.md.",
  },
  {
    q: "What stdio MCPs does the bridge work with?",
    a: "Any of them. The wrapper template is generic — swap the MCP_SERVER_BINARY path + Keychain service name and you're done. Worked Obsidian example included. The async-worker pattern depends on the vault being writable from phone Claude, so Obsidian is the canonical case, but the bridge itself is service-agnostic.",
  },
  {
    q: "Security — anyone with the tunnel URL can read my data?",
    a: "Yes, until you add auth. The pack covers two hardening paths: named subdomain (eliminates URL rotation pain) + bearer-token middleware + OAuth 2.1 gateway (forces auth on every request). All shipped. Until you wire them, you have URL-secrecy only (random 4-word subdomain, ~30 bits entropy). Fine for low-risk vaults; harden before exposing financial / health / customer data.",
  },
  {
    q: "Want this installed for you?",
    a: "$2,500 Starter — SDS Operator Install. One-on-one install call, bridge + worker + keepalive stack provisioned, Full Disk Access verified, custom Project setup, vault structure migration, 30-day support. Two-week engagement, end to end. Reply to dailenhuntley@gmail.com with 'Operator Install' in the subject if interested.",
  },
];

export default function VoiceNetworkPackPage() {
  return (
    <main
      style={{
        backgroundColor: "var(--bv3-bg)",
        color: "var(--bv3-ink)",
        minHeight: "100vh",
        fontFamily: "var(--bv3-font-sans)",
      }}
    >
      <div style={{ maxWidth: "880px", margin: "0 auto", padding: "4rem 1.5rem 6rem" }}>
        {/* Terminal prompt header */}
        <header className="mb-12">
          <p
            className="bv3-mono mb-2 text-xs"
            style={{ letterSpacing: "0.14em", color: "var(--bv3-ink-dim)" }}
          >
            $ ./claude-voice-network-pack --init
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
            style={{ color: "var(--bv3-ink)" }}
          >
            Tell your phone Claude what to build.<br />
            Your desktop builds it while you walk.<br />
            The vault is the inbox.
          </h1>
          <p
            className="text-lg leading-relaxed"
            style={{ color: "var(--bv3-ink-muted)", maxWidth: "62ch" }}
          >
            Voice-mode dispatcher on your phone. Headless Claude Code worker on your desktop. Connected by a markdown task queue in your vault. Built once, runs while you sleep.
          </p>
          <div className="mt-8 flex items-center gap-4 flex-wrap">
            <a
              href="https://github.com/dailenservices247-cloud/voice-network-pack"
              className="inline-block px-6 py-3 font-semibold text-sm"
              style={{
                backgroundColor: "var(--bv3-wine)",
                color: "var(--bv3-bg)",
                borderRadius: "0.25rem",
              }}
            >
              Get the pack — FREE
            </a>
            <p
              className="bv3-mono text-xs"
              style={{ color: "var(--bv3-ink-dim)", letterSpacing: "0.14em" }}
            >
              VERSION 2.0 / MAC ONLY / NO CREDIT CARD
            </p>
          </div>
        </header>

        {/* How it works */}
        <section className="mb-16">
          <p
            className="bv3-mono mb-3 text-xs"
            style={{ letterSpacing: "0.14em", color: "var(--bv3-wine-text)" }}
          >
            01 / HOW IT WORKS
          </p>
          <h2
            className="text-2xl font-bold mb-6"
            style={{ color: "var(--bv3-ink)" }}
          >
            Voice conversation in. Real work out.
          </h2>
          <div className="space-y-4">
            {HOW_IT_WORKS.map((step) => (
              <div
                key={step.n}
                className="flex gap-4 p-4 border"
                style={{
                  borderColor: "var(--bv3-border-subtle)",
                  borderRadius: "0.25rem",
                }}
              >
                <p
                  className="bv3-mono text-xs flex-shrink-0"
                  style={{
                    letterSpacing: "0.14em",
                    color: "var(--bv3-wine-text)",
                    minWidth: "2rem",
                  }}
                >
                  {step.n}
                </p>
                <div>
                  <p
                    className="text-base font-semibold mb-1"
                    style={{ color: "var(--bv3-ink)" }}
                  >
                    {step.title}
                  </p>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--bv3-ink-muted)" }}
                  >
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* The wall (kept from v1 as why-this-exists) */}
        <section className="mb-16">
          <p
            className="bv3-mono mb-3 text-xs"
            style={{ letterSpacing: "0.14em", color: "var(--bv3-wine-text)" }}
          >
            02 / WHY THIS EXISTS
          </p>
          <h2
            className="text-2xl font-bold mb-4"
            style={{ color: "var(--bv3-ink)" }}
          >
            The gap nothing else closes.
          </h2>
          <div
            className="leading-relaxed space-y-3"
            style={{ color: "var(--bv3-ink-muted)", maxWidth: "64ch" }}
          >
            <p>
              Phone Claude voice mode can already think with you. It can&apos;t reach your vault. It can&apos;t fire your desktop. It can&apos;t run a build while you walk.
            </p>
            <p>
              Anthropic&apos;s enterprise MCP Tunnels solves the bridge piece for Managed Agents customers. Doesn&apos;t reach consumer Claude.ai. Doesn&apos;t ship a worker. Doesn&apos;t ship the Playbook that makes the worker useful. This pack is the consumer-Claude version plus the methodology plus the async-worker pattern.
            </p>
            <p>
              Built once. Used daily. Survives reboot, network blips, and the user habit of closing apps. Ships with 9 silent failures already solved — so you don&apos;t lose the 3 hours.
            </p>
          </div>
        </section>

        {/* Use cases */}
        <section className="mb-16">
          <p
            className="bv3-mono mb-3 text-xs"
            style={{ letterSpacing: "0.14em", color: "var(--bv3-wine-text)" }}
          >
            03 / WHAT YOU GET BACK
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {USE_CASES.map((c) => (
              <div
                key={c.title}
                className="p-5 border"
                style={{
                  borderColor: "var(--bv3-border)",
                  backgroundColor: "var(--bv3-bg-elevated)",
                  borderRadius: "0.25rem",
                }}
              >
                <h3
                  className="text-base font-semibold mb-2"
                  style={{ color: "var(--bv3-ink)" }}
                >
                  {c.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--bv3-ink-muted)" }}
                >
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Pack contents */}
        <section className="mb-16">
          <p
            className="bv3-mono mb-3 text-xs"
            style={{ letterSpacing: "0.14em", color: "var(--bv3-wine-text)" }}
          >
            04 / WHAT&apos;S IN THE PACK
          </p>
          <h2
            className="text-2xl font-bold mb-6"
            style={{ color: "var(--bv3-ink)" }}
          >
            Five layers. Bridge + worker + playbook + vault + Projects.
          </h2>
          <div className="space-y-6">
            {PACK_CONTENTS.map((section) => (
              <div key={section.section}>
                <p
                  className="bv3-mono mb-2 text-xs"
                  style={{ letterSpacing: "0.14em", color: "var(--bv3-wine-text)" }}
                >
                  {section.section}
                </p>
                <ul className="space-y-1 ml-4">
                  {section.files.map((f) => (
                    <li
                      key={f}
                      className="bv3-mono text-xs leading-relaxed"
                      style={{ color: "var(--bv3-ink-muted)" }}
                    >
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Silent failures library */}
        <section className="mb-16">
          <p
            className="bv3-mono mb-3 text-xs"
            style={{ letterSpacing: "0.14em", color: "var(--bv3-wine-text)" }}
          >
            05 / THE 9-FAILURE LIBRARY
          </p>
          <h2
            className="text-2xl font-bold mb-4"
            style={{ color: "var(--bv3-ink)" }}
          >
            Nine silent failures. Documented nowhere else in one place.
          </h2>
          <p
            className="mb-6 leading-relaxed"
            style={{ color: "var(--bv3-ink-muted)", maxWidth: "62ch" }}
          >
            Building this stack hit each of these. Generic error messages, no stack traces, no path forward. The troubleshooting library lists symptom, root cause, and fix for all nine — including the two that emerged from the async-worker pattern (TCC + Obsidian disconnect).
          </p>
          <div className="space-y-3">
            {SILENT_FAILURES.map((f, i) => (
              <div
                key={f.name}
                className="p-4 border"
                style={{
                  borderColor: "var(--bv3-border-subtle)",
                  borderRadius: "0.25rem",
                }}
              >
                <p
                  className="bv3-mono text-xs mb-1"
                  style={{ letterSpacing: "0.14em", color: "var(--bv3-wine-text)" }}
                >
                  #{i + 1}
                </p>
                <p
                  className="text-sm font-semibold mb-1"
                  style={{ color: "var(--bv3-ink)" }}
                >
                  {f.name}
                </p>
                <p
                  className="text-xs"
                  style={{ color: "var(--bv3-ink-muted)" }}
                >
                  Fix: {f.fix}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <p
            className="bv3-mono mb-3 text-xs"
            style={{ letterSpacing: "0.14em", color: "var(--bv3-wine-text)" }}
          >
            06 / FAQ
          </p>
          <div className="space-y-6">
            {FAQ.map((f) => (
              <div key={f.q}>
                <p
                  className="font-semibold mb-2"
                  style={{ color: "var(--bv3-ink)" }}
                >
                  {f.q}
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--bv3-ink-muted)", maxWidth: "62ch" }}
                >
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA + cross-sell */}
        <section
          className="mb-16 p-8 border"
          style={{
            borderColor: "var(--bv3-border)",
            backgroundColor: "var(--bv3-bg-elevated)",
            borderRadius: "0.25rem",
          }}
        >
          <p
            className="bv3-mono mb-3 text-xs"
            style={{ letterSpacing: "0.14em", color: "var(--bv3-wine-text)" }}
          >
            07 / GET THE PACK
          </p>
          <h2
            className="text-2xl font-bold mb-3"
            style={{ color: "var(--bv3-ink)" }}
          >
            FREE. No credit card. Install today.
          </h2>
          <p
            className="mb-6 leading-relaxed"
            style={{ color: "var(--bv3-ink-muted)", maxWidth: "62ch" }}
          >
            Mac only (Monterey+). Full pack on GitHub. Workshop tier of the SDS Operator System. If you want it installed for you, the SDS Operator Install ($2,500) is the next tier — but the pack stands on its own.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://github.com/dailenservices247-cloud/voice-network-pack"
              className="inline-block px-6 py-3 font-semibold text-sm"
              style={{
                backgroundColor: "var(--bv3-wine)",
                color: "var(--bv3-bg)",
                borderRadius: "0.25rem",
              }}
            >
              Get the pack — FREE
            </a>
            <a
              href="mailto:dailenhuntley@gmail.com?subject=Operator%20Install"
              className="inline-block px-6 py-3 font-semibold text-sm border"
              style={{
                borderColor: "var(--bv3-border)",
                color: "var(--bv3-ink)",
                borderRadius: "0.25rem",
              }}
            >
              Install service — $2,500
            </a>
            <a
              href={STRIPE_PEER_OPERATOR_STACK_LINK}
              className="inline-block px-6 py-3 font-semibold text-sm border"
              style={{
                borderColor: "var(--bv3-border)",
                color: "var(--bv3-ink)",
                borderRadius: "0.25rem",
              }}
            >
              + Stack (advanced) — $497
            </a>
          </div>
          <p
            className="mt-6 text-xs leading-relaxed"
            style={{ color: "var(--bv3-ink-muted)", maxWidth: "60ch" }}
          >
            If you operate multiple AI tools daily and want the voice-dispatcher pattern: the pack is free, install when you&apos;re ready. If you want it set up for you: Operator Install. If you&apos;re building serious agentic software: add the Stack.
          </p>
        </section>

        {/* Status bar footer */}
        <footer
          className="mt-24 flex flex-wrap items-center justify-between gap-2 border-t pt-6 text-xs"
          style={{
            borderColor: "var(--bv3-border-subtle)",
            color: "var(--bv3-ink-dim)",
          }}
        >
          <p className="bv3-mono" style={{ letterSpacing: "0.14em" }}>
            VNP / V2.0 / DAILEN HUNTLEY / SYNAPSE DYNAMICS SEGMENTED
          </p>
          <p>
            <a
              href="/"
              style={{ color: "var(--bv3-wine-text)", textDecoration: "underline" }}
            >
              ← Synapse Dynamics
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
