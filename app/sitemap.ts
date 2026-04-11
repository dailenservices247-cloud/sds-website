import type { MetadataRoute } from "next";

const siteUrl = "https://synapsedynamics.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/services",
    "/services/architect",
    "/services/automator",
    "/services/strategist",
    "/how-it-works",
    "/lab/scrlpets",
    "/contact",
  ];
  const lastModified = new Date();
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
