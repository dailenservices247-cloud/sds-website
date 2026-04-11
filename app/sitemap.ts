import type { MetadataRoute } from "next";

const siteUrl = "https://synapsedynamics.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/services",
    "/services/architect",
    "/services/automator",
    "/services/strategist",
    "/how-it-works",
    "/lab/scrlpets",
    "/contact",
    "/legal/privacy",
    "/legal/terms",
  ];
  const lastModified = new Date();
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
