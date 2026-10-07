import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { event } from "@/config/event";
import "./globals.css";

// Lettertype zoals op de flyer (Open Sans), lokaal meegeleverd: sneller en privacyvriendelijker.
const openSans = localFont({
  src: "./fonts/OpenSans-Variable.woff2",
  variable: "--font-open-sans",
  weight: "300 800",
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
  description: `${event.tagline} ${event.date} bij ${event.location}. Schrijf je team in voor €30 per persoon.`,
  openGraph: {
    title: event.name,
    description: event.tagline,
    type: "website",
    locale: "nl_NL",
  },
};

export const viewport: Viewport = {
  themeColor: "#4b96d2",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="nl" className={`${openSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
