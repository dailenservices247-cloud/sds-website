import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  // v3 IA — public, indexable routes only.
  // Excludes /preview, /preview/brand-check (internal), and
  // /foundation/success, /foundation/cancel (post-checkout).
  const routes = [
    "",
    "/foundation",
    "/about",
    "/portfolio",
    "/channels",
    "/portfolio",
    "/ask",
    "/contact",
    "/services",
    "/services/pipeline",
    "/services/security",
    "/services/build",
    "/legal/privacy",
    "/legal/terms",
  ];
  const lastModified = new Date();
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
