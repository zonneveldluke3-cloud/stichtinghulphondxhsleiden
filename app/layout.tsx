import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { event } from "@/config/event";
import "./globals.css";

// Fonts worden lokaal meegeleverd (geen verzoeken naar Google = sneller én privacyvriendelijker).
const inter = localFont({
  src: "./fonts/Inter-Variable.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});
const display = localFont({
  src: "./fonts/BricolageGrotesque-Variable.woff2",
  variable: "--font-bricolage",
  weight: "200 800",
  display: "swap",
});

// Vercel vult VERCEL_PROJECT_PRODUCTION_URL automatisch in; lokaal is het localhost.
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${event.name} · ${event.dateShort}`,
    template: `%s · ${event.shortName}`,
  },
  description: `${event.tagline} ${event.date} bij ${event.location}. Schrijf je team in voor €60 per team.`,
  openGraph: {
    title: event.name,
    description: event.tagline,
    type: "website",
    locale: "nl_NL",
  },
};

export const viewport: Viewport = {
  themeColor: "#0c1a2b",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="nl" className={`${inter.variable} ${display.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
