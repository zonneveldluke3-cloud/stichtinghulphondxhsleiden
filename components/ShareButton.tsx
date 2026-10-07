"use client";

import { useState } from "react";
import { event } from "@/config/event";

const shareText = `Doe mee met ${event.name}: een padeltoernooi voor het goede doel op ${event.date} bij ${event.location}.`;

/** Knop om de website te delen. Gebruikt het deelmenu van de telefoon, anders kopieert hij de link. */
export function ShareButton({ variant = "light", url }: { variant?: "light" | "dark" | "outline"; url?: string }) {
  const [copied, setCopied] = useState(false);

  async function onShare() {
    const link = url ?? event.siteUrl;
    if (navigator.share) {
      try {
        await navigator.share({ title: event.name, text: shareText, url: link });
        return;
      } catch {
        // Gebruiker annuleerde het deelmenu; niets doen.
        return;
      }
    }
    try {
      await navigator.clipboard.writeText(link);
    } catch {
      window.prompt("Kopieer deze link:", link);
      return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  const styles = {
    light: "bg-white text-ink hover:bg-ball",
    dark: "bg-ink text-white hover:bg-court",
    outline: "bg-white/10 text-white ring-1 ring-white/30 hover:bg-white/20",
  }[variant];

  return (
    <div className="inline-flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={onShare}
        className={`inline-flex items-center gap-2.5 rounded-full px-5 py-3 font-bold transition ${styles}`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" />
        </svg>
        {copied ? "Link gekopieerd!" : "Deel de website"}
      </button>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(`${shareText} ${url ?? event.siteUrl}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 rounded-full px-5 py-3 font-bold transition ${styles}`}
      >
        WhatsApp
      </a>
    </div>
  );
}
