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
    ];
  },
};

export default nextConfig;
