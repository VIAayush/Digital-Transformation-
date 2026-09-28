import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";

const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const display = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

const TITLE = "Viral Inbound | Digital Transformation Company — Software, Automation, AI & Data";
const DESCRIPTION =
  "Viral Inbound is a digital transformation company. We design, build and optimize the digital systems businesses run on — custom software, automation, AI solutions, data and system integration.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: TITLE, template: "%s | Viral Inbound" },
  description: DESCRIPTION,
  keywords: [
    "digital transformation company",
    "business technology",
    "custom software development",
    "business process automation",
    "AI solutions for business",
    "data and analytics",
    "system integration",
    "CRM and internal business systems",
    "Viral Inbound",
  ],
  alternates: { canonical: "/" },
  icons: { icon: "/brand/favicon.png" },
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    title: "Viral Inbound — Transform the way your business works, operates and grows",
    description: DESCRIPTION,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    site: "@viralinbound",
    title: "Viral Inbound — Transform the way your business works, operates and grows",
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0c",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE.url}/#organization`,
      name: SITE.name,
      url: SITE.url,
      logo: `${SITE.url}/brand/vi-logo.png`,
      description: DESCRIPTION,
      email: SITE.email,
      telephone: SITE.phone,
      sameAs: SITE.social.map((s) => s.href),
      address: [
        {
          "@type": "PostalAddress",
          streetAddress: "Koramangala",
          addressLocality: "Bengaluru",
          postalCode: "560047",
          addressCountry: "IN",
        },
        {
          "@type": "PostalAddress",
          streetAddress: "Thane West",
          addressLocality: "Thane",
          addressRegion: "Maharashtra",
          postalCode: "400607",
          addressCountry: "IN",
        },
      ],
      knowsAbout: [
        "Digital transformation",
        "Custom software development",
        "Business process automation",
        "Artificial intelligence",
        "Data and analytics",
        "System integration",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      publisher: { "@id": `${SITE.url}/#organization` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable} ${mono.variable}`}>
      <body>
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${SITE.analytics.gtm}');`}
        </Script>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${SITE.analytics.ga}`}
          strategy="afterInteractive"
        />
        <Script id="ga" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${SITE.analytics.ga}');`}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-white"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
