import { event } from "@/config/event";
import { PRICE_PER_TEAM_CENTS } from "@/config/registration";
import { formatEuroShort } from "@/lib/format";
import { Container } from "@/components/ui/Section";
import { ArrowRightIcon, CalendarIcon, HeartIcon, PinIcon } from "@/components/ui/icons";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      {/* Padelbaan-lijnen als achtergrond */}
      <svg
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-[0.13]"
        viewBox="0 0 1200 700"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <g fill="none" stroke="white" strokeWidth="3">
          <rect x="80" y="60" width="1040" height="580" rx="6" />
          <line x1="600" y1="60" x2="600" y2="640" strokeDasharray="10 10" />
          <line x1="340" y1="60" x2="340" y2="640" />
          <line x1="860" y1="60" x2="860" y2="640" />
          <line x1="340" y1="350" x2="860" y2="350" />
        </g>
      </svg>
      <div className="absolute -right-40 -top-40 -z-10 h-[520px] w-[520px] rounded-full bg-court/40 blur-3xl" aria-hidden />

      {/* Zwevende padelbal */}
      <div
        className="animate-float absolute right-[6%] top-24 -z-10 hidden h-40 w-40 rounded-full bg-ball shadow-[inset_-14px_-14px_0_rgba(0,0,0,0.12)] md:block lg:h-56 lg:w-56"
        aria-hidden
      >
        <div className="absolute inset-4 rotate-45 rounded-full border-[6px] border-white/70 border-b-transparent border-l-transparent" />
      </div>

      <Container className="pb-20 pt-16 sm:pb-28 sm:pt-24 lg:pb-32 lg:pt-28">
        <div className="max-w-3xl">
          <p className="animate-pop mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white/90 ring-1 ring-white/15">
            <HeartIcon className="h-4 w-4 text-ball" />
            Ten bate van {event.goodCause}
          </p>

          <h1 className="animate-pop font-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-7xl lg:text-[5.5rem]">
            {event.name.split(" ").slice(0, -2).join(" ")}{" "}
            <span className="text-ball">{event.name.split(" ").slice(-2).join(" ")}</span>
          </h1>

          <p className="animate-pop mt-6 max-w-xl text-lg leading-relaxed text-white/75 sm:text-xl" style={{ animationDelay: "80ms" }}>
            {event.tagline}
          </p>

          <ul className="animate-pop mt-8 flex flex-wrap gap-3 text-[15px] font-semibold" style={{ animationDelay: "140ms" }}>
            <li className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 ring-1 ring-white/10">
              <CalendarIcon className="h-5 w-5 text-ball" /> {event.date}
            </li>
            <li className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 ring-1 ring-white/10">
              <PinIcon className="h-5 w-5 text-ball" /> {event.location}
            </li>
          </ul>

          <div className="animate-pop mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center" style={{ animationDelay: "200ms" }}>
            <a
              href="#inschrijven"
              className="group inline-flex items-center gap-3 rounded-full bg-ball px-8 py-4 text-lg font-extrabold text-ink shadow-[0_10px_40px_-10px_rgba(215,242,75,0.7)] transition hover:-translate-y-0.5 hover:bg-white"
            >
              Schrijf je team in
              <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
            <p className="font-display text-2xl font-extrabold">
              {formatEuroShort(PRICE_PER_TEAM_CENTS)} <span className="text-base font-semibold text-white/60">per team</span>
            </p>
          </div>
          <p className="animate-pop mt-6 text-white/70" style={{ animationDelay: "260ms" }}>
            Niet meespelen, wel steunen?{" "}
            <a href="#doneren" className="font-semibold text-white underline underline-offset-4 hover:text-ball">
              Doneer aan {event.goodCause}
            </a>
          </p>
        </div>
      </Container>
    </section>
  );
}
