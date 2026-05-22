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
  STRIPE_VOICE_NETWORK_PACK_LINK,
  STRIPE_ANTI_SLOP_SKILL_PACK_LINK,
  STRIPE_PEER_OPERATOR_STACK_LINK,
  SITE_URL,
} from "@/lib/site-config";

export const metadata: Metadata = {
  title:
    "Claude Voice Network Pack v1 — persistent AI specialists that travel with you | Synapse Dynamics Segmented",
  description:
    "Expose any local stdio MCP server (Obsidian, Stripe, GitHub, Supabase, custom) to Claude.ai mobile via launchd + cloudflared. Ships the bridge installer + Project Design Playbook + vault structure + 5 starter Project templates. $79 once. Mac-only. Lifetime v1.x updates.",
  alternates: { canonical: `${SITE_URL}/voice-network` },
  openGraph: {
    title: "Claude Voice Network Pack v1",
    description:
      "Build a team of persistent AI specialists that travel with you. Bridge + methodology + vault template + 5 starter Projects. $79.",
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
    title: "Voice-drive your Obsidian vault from anywhere",
    body: "Walking, driving, at work without your laptop. Voice mode + persistent Project = ongoing conversation with your own second brain. Your sessions write back as atomic-node decisions. Vault compounds.",
  },
  {
    title: "Multiple specialists, one vault",
    body: "Discovery Co-pilot for live thinking. Build Co-pilot for scope-defending. Sales Co-pilot for reply triage. Each Project specializes. All share the same vault MCP. Cross-context flows through your decisions graph without bleeding.",
  },
  {
    title: "Cross-MCP through one phone",
    body: "Expose your Stripe MCP, GitHub MCP, Supabase MCP, custom MCPs — all to your phone via separate bridges. Same launchd pattern, different ports. Claude.ai sees them as separate connectors.",
  },
  {
    title: "Survives reboot. Self-heals on crash.",
    body: "launchd KeepAlive + ThrottleInterval. cloudflared auto-reconnect. Your bridge stays up while you're away. No babysitting.",
  },
];

const FAQ = [
  {
    q: "Why $79? The components are free open source.",
    a: "The components are free; the bundle isn't anywhere. mcp-proxy + cloudflared + launchd plists + Keychain wrappers + Project methodology + vault structure + 5 starter Projects + 7-failure troubleshooting library — each component is documented somewhere, but not in one tested package. The pack saves you the integration tax. Tonight's build session was three hours of debugging silent failures. You skip that.",
  },
  {
    q: "Mac only. What about Linux / Windows?",
    a: "v1 is Mac only because launchd is Mac-specific. Linux (systemd) and Windows (scheduled tasks) are banked for v2. Buy v1 now if you're on a Mac; v2 includes free upgrade.",
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
    a: "Yes, until you add auth. The pack covers two hardening paths: named subdomain (eliminates URL rotation pain) + bearer-token middleware (forces Authorization header on every request). Both shipped in v1. Until you wire them, you have URL-secrecy only (random 4-word subdomain, ~30 bits entropy). Fine for low-risk vaults; harden before exposing financial / health / customer data.",
  },
  {
    q: "Refund policy?",
    a: "14-day refund. If the bridge doesn't install cleanly on your Mac (Monterey+) or the 5-layer smoke test won't pass after troubleshooting, full refund. Reply to your purchase email.",
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
            Persistent AI specialists that travel with you.
          </h1>
          <p
            className="text-lg leading-relaxed"
            style={{ color: "var(--bv3-ink-muted)", maxWidth: "62ch" }}
          >
            Expose any local stdio MCP server (Obsidian, Stripe, GitHub, Supabase, custom) to Claude.ai mobile via launchd + cloudflared. Bridge + Project Design Playbook + vault structure + 5 starter Project templates. One pack, four layers, lifetime v1.x updates.
          </p>
          <div className="mt-8 flex items-center gap-4 flex-wrap">
            <a
              href={STRIPE_VOICE_NETWORK_PACK_LINK}
              className="inline-block px-6 py-3 font-semibold text-sm"
              style={{
                backgroundColor: "var(--bv3-gold)",
                color: "var(--bv3-bg)",
                borderRadius: "0.25rem",
              }}
            >
              Get the pack — $79 once
            </a>
            <p
              className="bv3-mono text-xs"
              style={{ color: "var(--bv3-ink-dim)", letterSpacing: "0.14em" }}
            >
              VERSION 1.0 / 32 FILES / 172K / MAC ONLY
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
            Anthropic shipped MCP Tunnels for enterprise. The methodology layer is the missing piece.
          </h2>
          <div
            className="leading-relaxed space-y-3"
            style={{ color: "var(--bv3-ink-muted)", maxWidth: "64ch" }}
          >
            <p>
              MCP Tunnels (Anthropic, 2026-05-19) extends Claude&apos;s reach to local servers — for Managed Agents enterprise customers. Doesn&apos;t reach consumer Claude.ai. Doesn&apos;t structure your vault. Doesn&apos;t define what a persistent Project looks like or how its sessions compound.
            </p>
            <p>
              This pack is that missing layer. Bridge stack tested end-to-end (3 hours of silent-failure debugging documented in the troubleshooting library). Project Design Playbook formalizes the 4-file pattern. Vault structure template gives you the atomic-node decisions graph your Projects write into. Five starter Projects ready to upload.
            </p>
          </div>
        </section>

        {/* Use cases */}
        <section className="mb-16">
          <p
            className="bv3-mono mb-3 text-xs"
            style={{ letterSpacing: "0.14em", color: "var(--bv3-gold)" }}
          >
            02 / WHAT YOU UNLOCK
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
            $79 once. Lifetime v1.x updates.
          </h2>
          <p
            className="mb-6 leading-relaxed"
            style={{ color: "var(--bv3-ink-muted)", maxWidth: "62ch" }}
          >
            14-day refund. Mac only (Monterey+). Includes the 32-file pack + access to v1.1 (full starter Projects authored) + v1.2 (bearer-auth middleware) when they land.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={STRIPE_VOICE_NETWORK_PACK_LINK}
              className="inline-block px-6 py-3 font-semibold text-sm"
              style={{
                backgroundColor: "var(--bv3-gold)",
                color: "var(--bv3-bg)",
                borderRadius: "0.25rem",
              }}
            >
              Buy now — $79
            </a>
            <a
              href={STRIPE_ANTI_SLOP_SKILL_PACK_LINK}
              className="inline-block px-6 py-3 font-semibold text-sm border"
              style={{
                borderColor: "var(--bv3-border)",
                color: "var(--bv3-ink)",
                borderRadius: "0.25rem",
              }}
            >
              Bundle with Anti-Slop — $49
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
              + Stack v1 — $149
            </a>
          </div>
          <p
            className="mt-6 text-xs leading-relaxed"
            style={{ color: "var(--bv3-ink-muted)", maxWidth: "60ch" }}
          >
            If you operate multiple AI tools daily and want the persistent-Project pattern: Voice Network Pack. If you also publish content / DMs / proposals: add Anti-Slop. If you&apos;re building serious agentic software: add Stack v1.
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
