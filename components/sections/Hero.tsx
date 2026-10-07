import Image from "next/image";
import { event } from "@/config/event";
import { PRICE_PER_TEAM_CENTS } from "@/config/registration";
import { formatEuroShort } from "@/lib/format";
import { Container } from "@/components/ui/Section";
import { PadelBall } from "@/components/ui/PadelBall";
import { ArrowRightIcon } from "@/components/ui/icons";

/** Bovenkant van de pagina, in de stijl van de flyer. */
export function Hero() {
  const [first, ...rest] = event.name.split(" voor ");
  return (
    <section className="relative isolate overflow-hidden bg-sky text-white">
      {/* Grote cirkel rechtsboven */}
      <div
        className="absolute -right-48 -top-56 -z-10 h-[620px] w-[620px] rounded-full bg-sky-deep sm:-right-32 sm:h-[760px] sm:w-[760px]"
        aria-hidden
      />

      <Container className="pb-32 pt-10 sm:pb-40 sm:pt-14">
        {/* Logo Hulphond */}
        <div className="animate-pop inline-flex rounded-full bg-white px-3 py-2 shadow-sm">
          <Image src="/logos/hulphond.png" alt="Stichting Hulphond" width={646} height={148} priority className="h-9 w-auto sm:h-11" />
        </div>

        <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <p className="animate-pop inline-block rounded-full bg-ball px-5 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-ink sm:text-sm">
              {event.label}
            </p>

            <h1 className="animate-pop mt-6 font-display text-6xl font-extrabold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
              {rest.length ? `${first} voor` : event.name}
              {rest.length > 0 && (
                <>
                  <br />
                  <span className="text-ball">{rest.join(" voor ")}</span>
                </>
              )}
            </h1>

            <p className="animate-pop mt-6 max-w-xl text-lg leading-relaxed text-white/95 sm:text-2xl sm:leading-snug" style={{ animationDelay: "80ms" }}>
              {event.tagline}
            </p>

            <div className="animate-pop mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center" style={{ animationDelay: "160ms" }}>
              <a
                href="#inschrijven"
                className="group inline-flex items-center gap-3 rounded-full bg-ball px-8 py-4 text-lg font-extrabold text-ink shadow-[0_12px_32px_-12px_rgba(41,35,93,0.6)] transition hover:-translate-y-0.5 hover:bg-white"
              >
                Schrijf je team in
                <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
              <p className="font-display text-2xl font-extrabold">
                {formatEuroShort(PRICE_PER_TEAM_CENTS)} <span className="text-base font-semibold text-white/80">per team</span>
              </p>
            </div>

            <p className="animate-pop mt-6 text-white/85" style={{ animationDelay: "220ms" }}>
              Niet meespelen, wel steunen?{" "}
              <a href="#doneren" className="font-bold text-white underline underline-offset-4 hover:text-ball">
                Doneer aan {event.goodCause}
              </a>
            </p>
          </div>

          <div className="hidden justify-center lg:flex">
            <PadelBall className="animate-float h-64 w-64 drop-shadow-[0_20px_30px_rgba(41,35,93,0.25)] xl:h-72 xl:w-72" />
          </div>
        </div>
      </Container>

      {/* Golvende overgang naar wit, zoals op de flyer */}
      <svg
        className="absolute inset-x-0 bottom-0 h-16 w-full text-paper sm:h-24"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path d="M0 100 L0 70 Q720 -30 1440 70 L1440 100 Z" fill="currentColor" />
      </svg>
    </section>
  );
}
