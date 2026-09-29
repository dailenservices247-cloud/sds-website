/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // /products is the legacy brand-v2 portfolio surface; the v3
      // /portfolio route supersedes it. Permanent (301) redirect preserves
      // SEO + bookmark equity. Per redesign PRD acceptance criterion.
      {
        source: "/products",
        destination: "/portfolio",
        permanent: true,
      },
      // /work was a second services-overview surface selling the retired
      // Architect / Automator / Strategist ladder at its retired prices. The
      // services retraction (2026-08-20) makes /services the canonical answer
      // to "what is it like to work with SDS", so /work is removed rather than
      // merged into /portfolio — it was never portfolio content. It had zero
      // inbound links; the redirect exists for bookmarks and search equity.
      {
        source: "/work",
        destination: "/services",
        permanent: true,
      },
      // /lab and /lab/scrlpets duplicated /portfolio and /portfolio/scrlpets —
      // "live products + active builds + internal infrastructure" is the
      // portfolio's own description. Merged 2026-08-20; both had inbound links,
      // which were repointed before removal.
      {
        source: "/lab/scrlpets",
        destination: "/portfolio/scrlpets",
        permanent: true,
      },
      {
        source: "/lab",
        destination: "/portfolio",
        permanent: true,
      },
      // /matchmaker was a placeholder for "interactive interview that
      // recommends the AI business that fits you" — that is /ask, built
      // honestly rather than promised. Two conversational front doors is one
      // too many. Folded 2026-08-20 per the concierge spec.
      {
        source: "/matchmaker",
        destination: "/ask",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
