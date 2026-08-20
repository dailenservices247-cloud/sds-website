import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Synapse Dynamics",
    short_name: "Synapse Dynamics",
    description:
      "An AI agency building websites, custom apps, automations, and strategy for founders who need results, not decks.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0f0c",
    theme_color: "#3a3b3d", // brand-v3 shell. Was #22c55e — banned brand-v2 emerald painting the mobile browser chrome.
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
