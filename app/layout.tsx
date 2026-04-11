import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const siteUrl = "https://synapsedynamics.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Synapse Dynamics — Ship AI that actually works.",
    template: "%s · Synapse Dynamics",
  },
  description:
    "Synapse Dynamics is an AI agency building custom apps, automations, and strategy for founders who need results, not decks.",
  keywords: [
    "AI agency",
    "custom software development",
    "workflow automation",
    "n8n",
    "AI consulting",
    "Next.js development",
    "AI strategy",
  ],
  authors: [{ name: "Synapse Dynamics Segmented" }],
  creator: "Synapse Dynamics Segmented",
  publisher: "Black Sheep 247 LLC",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Synapse Dynamics",
    title: "Synapse Dynamics — Ship AI that actually works.",
    description:
      "An AI agency building custom apps, automations, and strategy for founders who need results, not decks.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Synapse Dynamics — Ship AI that actually works.",
    description:
      "An AI agency building custom apps, automations, and strategy for founders who need results, not decks.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-bg-primary text-ink-primary font-sans antialiased">
        <Nav />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
