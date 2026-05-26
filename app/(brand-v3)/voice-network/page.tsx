// app/(brand-v3)/voice-network/page.tsx
//
// Pre-purchase product page for Claude Voice Network Pack v1.
// $79 productized bundle: bridge installer + Project Design Playbook +
// vault structure template + 5 starter Project templates.
//
// Lives under the brand-v3 route group, V3 Cursor register.
//
// Decision: AI Hub/Decisions/decision-2026-05-21-claude-voice-network-pack.md
// (positioning shift mid-build: bridge installer -> methodology + tooling at $79).

import type { Metadata } from "next";
import {
  STRIPE_PEER_OPERATOR_STACK_LINK,
  SITE_URL,
} from "@/lib/site-config";

export const metadata: Metadata = {
  title:
    "Claude Voice Network Pack — your phone Claude finally reads your vault | Synapse Dynamics Segmented",
  description:
    "Phone Claude.ai voice mode can't see your local files. This bridge fixes it. Bridge + Project Design Playbook + vault structure + 5 starter Project templates. Mac only. Free.",
  alternates: { canonical: `${SITE_URL}/voice-network` },
  openGraph: {
    title: "Claude Voice Network Pack — phone Claude reads your vault",
    description:
      "Phone Claude.ai voice mode can't see your local files. This bridge fixes it. Free. Mac only.",
    url: `${SITE_URL}/voice-network`,
    type: "website",
  },
};

const PACK_CONTENTS = [
  {
    section: "01 / BRIDGE",
    files: [
      "bridge/INSTALL.md — 5-step Mac install (~20 min)",
      "bridge/wrapper-template.sh — generic wrapper for any stdio MCP",
      "bridge/mcp-obsidian-wrapper.example.sh — worked Obsidian example",
      "bridge/plists/com.YOURNAME.mcp-proxy.plist + cloudflared-mcp.plist",
      "bridge/smoke-test.sh — 5-layer health check (auto-detects URL)",
      "bridge/troubleshooting.md — 7 silent-failure modes documented",
      "bridge/named-tunnel-setup.md — permanent URL via your subdomain",
    ],
  },
  {
    section: "02 / PLAYBOOK",
    files: [
      "playbook/Project-Design-Playbook.md — full methodology (13 sections, 2200 words)",
    ],
  },
  {
    section: "03 / VAULT TEMPLATE",
    files: [
      "vault-template/README.md — install + why this structure works",
      "vault-template/Atomic-Node-Spec.md — decision/inference/context/test schema",
      "vault-template/Relay-Protocol.md — session activity feed rules",
      "vault-template/Handoff-Pattern.md — per-project handoff format",
      "vault-template/AI Hub/ — 8 starter folders + Active-Work-Log stub + atomic-node-template",
    ],
  },
  {
    section: "04 / STARTER PROJECTS",
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
];

const USE_CASES = [
  {
    title: "The walk that didn't happen",
    body: "Walking, driving, work-without-laptop — your voice can already drive Claude. With this, voice can drive your vault too. The idea you had at the gym makes it into your decisions folder before you forget it.",
  },
  {
    title: "Stop re-explaining yourself",
    body: "Five specialist Projects, each with its own system instructions. All reading your vault. Discovery Co-pilot knows your current thinking. Build Co-pilot defends your scope. Sales Co-pilot remembers who you called Monday. None of them ask 'what are you working on?'",
  },
  {
    title: "One tunnel, every tool",
    body: "Obsidian, Stripe, GitHub, Supabase, custom — exposed through one phone. Same launchd pattern, different ports. Your phone becomes the remote for your whole stack.",
  },
  {
    title: "Set up once. Forget it.",
    body: "launchd KeepAlive. cloudflared auto-reconnect. Your bridge stays up while you're away. No babysitting. No 3am restarts.",
  },
];

const FAQ = [
  {
    q: "Why is this free? You used to charge $79.",
    a: "Distribution matters more than price for a niche operator product. The pack itself is solid — the pricing was the wrong shape for discovery. Free unlocks GitHub stars + Reddit + Hacker News distribution that the $79 SKU blocked. If it's useful, the SDS Operator Install ($2,500) is the next tier — but the pack stands on its own.",
  },
  {
    q: "Mac only. What about Linux / Windows?",
    a: "v1 is Mac only because launchd is Mac-specific. Linux (systemd) and Windows (scheduled tasks) are banked for v2. If you're on a Mac, install today.",
  },
  {
    q: "Anthropic just announced MCP Tunnels. Why not wait?",
    a: "Anthropic shipped MCP Tunnels for Managed Agents enterprise customers on 2026-05-19. Doesn't extend to consumer Claude.ai yet. Likely will in 6-12 months. When it does, the bridge piece of this pack sunsets cleanly — point your Claude.ai connector at Anthropic's hosted endpoint instead of your tunnel URL. The Playbook, the vault structure, the 5 starter Projects don't go away. The methodology is the durable asset.",
  },
  {
    q: "What stdio MCPs does the bridge work with?",
    a: "Any of them. The wrapper template is generic — swap the MCP_SERVER_BINARY path + Keychain service name and you're done. Worked Obsidian example included. The pack ships starter Projects for Obsidian as the canonical case (because the vault structure pattern depends on it) but the bridge itself is service-agnostic.",
  },
  {
    q: "Security — anyone with the tunnel URL can read my data?",
    a: "Yes, until you add auth. The pack covers two hardening paths: named subdomain (eliminates URL rotation pain) + bearer-token middleware + OAuth 2.1 gateway (forces auth on every request). All shipped. Until you wire them, you have URL-secrecy only (random 4-word subdomain, ~30 bits entropy). Fine for low-risk vaults; harden before exposing financial / health / customer data.",
  },
  {
    q: "Want this installed for you?",
    a: "$2,500 Starter — SDS Operator Install. One-on-one install call, custom Project setup, vault structure migration, 30-day support. Two-week engagement, end to end. Reply to dailenhuntley@gmail.com with 'Operator Install' in the subject if interested.",
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
            Stop typing on your phone.<br />
            Stop the back-and-forth with Claude.<br />
            Start the conversation.
          </h1>
          <p
            className="text-lg leading-relaxed"
            style={{ color: "var(--bv3-ink-muted)", maxWidth: "62ch" }}
          >
            Voice mode on phone Claude.ai. Voice mode in Claude Code. Both reading your actual vault. Both talking to your real tools. The bridge makes both work.
          </p>
          <div className="mt-8 flex items-center gap-4 flex-wrap">
            <a
              href="https://github.com/dailenservices247-cloud/voice-network-pack"
              className="inline-block px-6 py-3 font-semibold text-sm"
              style={{
                backgroundColor: "var(--bv3-gold)",
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
              VERSION 1.0.2 / 32 FILES / MAC ONLY / NO CREDIT CARD
            </p>
          </div>
        </header>

        {/* Why this exists */}
        <section className="mb-16">
          <p
            className="bv3-mono mb-3 text-xs"
            style={{ letterSpacing: "0.14em", color: "var(--bv3-gold)" }}
          >
            01 / WHY THIS EXISTS
          </p>
          <h2
            className="text-2xl font-bold mb-4"
            style={{ color: "var(--bv3-ink)" }}
          >
            The wall.
          </h2>
          <div
            className="leading-relaxed space-y-3"
            style={{ color: "var(--bv3-ink-muted)", maxWidth: "64ch" }}
          >
            <p>
              Your vault has six months of decisions, two months of project notes, and tomorrow&apos;s plan written down. Voice mode on phone Claude.ai can&apos;t touch any of it. You can ask voice mode to be a poet. You can&apos;t ask it to fetch what you wrote yesterday.
            </p>
            <p>
              The bridge fixes that. Anthropic&apos;s enterprise MCP Tunnels does this for Managed Agents customers — doesn&apos;t reach consumer Claude.ai. This pack is the consumer-Claude version, plus the methodology layer so the bridge actually does something useful when wired up.
            </p>
            <p>
              Built once. Used daily. Survives reboot. Ships with the 7 silent failures that ate the original build session — so you don&apos;t lose the 3 hours.
            </p>
          </div>
        </section>

        {/* Use cases */}
        <section className="mb-16">
          <p
            className="bv3-mono mb-3 text-xs"
            style={{ letterSpacing: "0.14em", color: "var(--bv3-gold)" }}
          >
            02 / WHAT YOU GET BACK
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
            style={{ letterSpacing: "0.14em", color: "var(--bv3-gold)" }}
          >
            03 / WHAT&apos;S IN THE PACK
          </p>
          <h2
            className="text-2xl font-bold mb-6"
            style={{ color: "var(--bv3-ink)" }}
          >
            32 files. Four layers.
          </h2>
          <div className="space-y-6">
            {PACK_CONTENTS.map((section) => (
              <div key={section.section}>
                <p
                  className="bv3-mono mb-2 text-xs"
                  style={{ letterSpacing: "0.14em", color: "var(--bv3-gold)" }}
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
            style={{ letterSpacing: "0.14em", color: "var(--bv3-gold)" }}
          >
            04 / THE 7-FAILURE LIBRARY
          </p>
          <h2
            className="text-2xl font-bold mb-4"
            style={{ color: "var(--bv3-ink)" }}
          >
            Seven silent failures. Documented nowhere else in one place.
          </h2>
          <p
            className="mb-6 leading-relaxed"
            style={{ color: "var(--bv3-ink-muted)", maxWidth: "62ch" }}
          >
            Tonight&apos;s build hit each of these. Generic error messages, no stack traces, no path forward. The troubleshooting library lists symptom, root cause, and fix for all seven.
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
                  style={{ letterSpacing: "0.14em", color: "var(--bv3-gold)" }}
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
            style={{ letterSpacing: "0.14em", color: "var(--bv3-gold)" }}
          >
            05 / FAQ
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
            style={{ letterSpacing: "0.14em", color: "var(--bv3-gold)" }}
          >
            06 / GET THE PACK
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
            Mac only (Monterey+). The 32-file pack on GitHub. Workshop tier of the SDS Operator System. If you want it installed for you, the SDS Operator Install ($2,500) is the next tier — but the pack stands on its own.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://github.com/dailenservices247-cloud/voice-network-pack"
              className="inline-block px-6 py-3 font-semibold text-sm"
              style={{
                backgroundColor: "var(--bv3-gold)",
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
            If you operate multiple AI tools daily and want the persistent-Project pattern: the pack is free, install when you&apos;re ready. If you want it set up for you: Operator Install. If you&apos;re building serious agentic software: add the Stack.
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
            VNP / V1.0 / DAILEN HUNTLEY / SYNAPSE DYNAMICS SEGMENTED
          </p>
          <p>
            <a
              href="/"
              style={{ color: "var(--bv3-gold)", textDecoration: "underline" }}
            >
              ← Synapse Dynamics
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
