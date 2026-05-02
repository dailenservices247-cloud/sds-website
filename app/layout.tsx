import type { Metadata } from "next";
import {
  Inter,
  JetBrains_Mono,
  Bricolage_Grotesque,
} from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { SITE_URL } from "@/lib/site-config";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}#synapse-dynamics-org`,
  name: "Synapse Dynamics Segmented",
  alternateName: "Synapse Dynamics",
  url: SITE_URL,
  logo: `${SITE_URL}/icon-512.png`,
  parentOrganization: {
    "@type": "Organization",
    name: "Black Sheep 247 LLC",
  },
  founder: {
    "@type": "Person",
    name: "Dailen Huntley",
    url: `${SITE_URL}/about`,
  },
  sameAs: [
    "https://www.linkedin.com/company/synapse-dynamics-segmented",
    "https://x.com/synapse_dynamic",
    "https://github.com/dailenservices247-cloud",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}#synapse-dynamics-website`,
  name: "Synapse Dynamics",
  url: SITE_URL,
  publisher: { "@id": `${SITE_URL}#synapse-dynamics-org` },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

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

// Bricolage Grotesque — display font for v3 loud-register headlines.
// Replaces rb-freigeist-neue conceptually. Free, modern, heavy display.
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

// v3 mono = same JetBrains Mono already loaded for brand v2.
// Keeping a single mono family across v2 and v3 saves font payload.
// (Originally planned Geist Mono but it's not in next/font/google catalog —
// it's at the standalone `geist` package, not worth the extra dep tonight.)

const siteUrl = SITE_URL;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Synapse Dynamics — Ship AI that actually works.",
    template: "%s · Synapse Dynamics",
  },
  description:
    "Synapse Dynamics is an AI agency building websites, custom apps, automations, and strategy for founders who need results, not decks.",
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
      "An AI agency building websites, custom apps, automations, and strategy for founders who need results, not decks.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Synapse Dynamics — Ship AI that actually works.",
    description:
      "An AI agency building websites, custom apps, automations, and strategy for founders who need results, not decks.",
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
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${bricolage.variable}`}
    >
      <body className="bg-bg-primary text-ink-primary font-sans antialiased">
        <Script
          id="synapse-dynamics-org"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Script
          id="synapse-dynamics-website"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Nav />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
