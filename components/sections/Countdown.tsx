"use client";

import { useEffect, useState } from "react";
import { event } from "@/config/event";
import { PadelBall } from "@/components/ui/PadelBall";
import { PawTrail } from "@/components/ui/Decor";

/** Starttijd van het toernooi (Nederlandse tijd). */
const START = new Date(event.startsAt).getTime();

function parts(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return {
    dagen: Math.floor(s / 86400),
    uur: Math.floor((s % 86400) / 3600),
    min: Math.floor((s % 3600) / 60),
    sec: s % 60,
  };
}

export function Countdown() {
  // Pas na het laden in de browser tellen, zodat server en browser hetzelfde tonen.
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setNow(Date.now());
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);

  const left = now === null ? null : START - now;
  const p = parts(left ?? 0);
  const started = left !== null && left <= 0;

  return (
    <section className="relative isolate overflow-hidden bg-ink py-16 text-white sm:py-20">
      <PawTrail className="absolute -left-6 bottom-4 -z-10 w-72 text-white/[0.06] sm:w-96" />
      <PadelBall className="absolute -right-16 -top-16 -z-10 h-56 w-56 opacity-90 sm:h-72 sm:w-72" />
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-ball">Aftellen</p>
        <h2 className="mt-3 max-w-2xl font-display text-4xl font-extrabold leading-tight sm:text-5xl">
          {started ? "Bedankt voor jullie steun!" : "Nog even en dan is het zover"}
        </h2>

        {!started && (
          <ul className="mt-10 grid max-w-3xl grid-cols-4 gap-3 sm:gap-5" aria-live="off">
            {(
              [
                ["dagen", p.dagen],
                ["uur", p.uur],
                ["min", p.min],
                ["sec", p.sec],
              ] as const
            ).map(([label, value]) => (
              <li key={label} className="rounded-2xl bg-white/10 px-2 py-5 text-center ring-1 ring-white/15 sm:py-7">
                <span className="block font-display text-4xl font-extrabold tabular-nums text-ball sm:text-6xl">
                  {left === null ? "–" : String(value).padStart(2, "0")}
                </span>
                <span className="mt-1 block text-sm font-semibold uppercase tracking-wider text-white/70">{label}</span>
              </li>
            ))}
          </ul>
        )}

        {started ? (
          <a
            href="#doneren"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-ball px-8 py-4 text-lg font-extrabold text-ink transition hover:-translate-y-0.5 hover:bg-white"
          >
            Doneer aan Stichting Hulphond
          </a>
        ) : (
          <a
            href="#inschrijven"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-ball px-8 py-4 text-lg font-extrabold text-ink transition hover:-translate-y-0.5 hover:bg-white"
          >
            Zorg dat je erbij bent
          </a>
        )}
      </div>
    </section>
  );
}
