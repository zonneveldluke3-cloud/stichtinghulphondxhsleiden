import { LEVELS } from "@/config/registration";
import { Container } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PawTrail, Wave } from "@/components/ui/Decor";

/** Uitleg over de niveaus. Bij het inschrijven kies je per team een niveau. */
export function Levels() {
  return (
    <section id="niveaus" className="relative isolate text-white">
      <Wave className="text-sky" />
      <div className="relative bg-sky py-14 sm:py-20">
        <PawTrail className="absolute right-0 top-6 -z-10 w-72 text-white/10 sm:w-[28rem]" />
        <Container>
          <Reveal className="max-w-3xl">
            <p className="mb-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-ball">
              <span className="h-2 w-2 rounded-full bg-ball" aria-hidden />
              Niveaus
            </p>
            <h2 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
              Speel tegen teams van <span className="text-ball">jouw niveau</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/90">
              Bij het inschrijven kies je per team een niveau. Wij delen de poules daarna in op niveau, zodat je tegen
              teams speelt die ongeveer even goed zijn. Zo is het voor iedereen leuk en spannend. Elk niveau heeft
              een eigen winnaar.
            </p>
          </Reveal>

          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {LEVELS.map((level, i) => (
              <Reveal as="li" key={level.value} delay={i * 90}>
                <div className="flex h-full flex-col rounded-3xl bg-white p-7 text-ink shadow-[0_18px_40px_-24px_rgba(41,35,93,0.6)] transition hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5" aria-hidden>
                      {LEVELS.map((_, dot) => (
                        <span key={dot} className={`h-3 w-8 rounded-full ${dot <= i ? "bg-sky" : "bg-sand"}`} />
                      ))}
                    </div>
                    <span className="font-display text-4xl font-extrabold text-sand">0{i + 1}</span>
                  </div>
                  <h3 className="mt-4 font-display text-3xl font-extrabold">{level.label}</h3>
                  <p className="mt-2 text-lg leading-relaxed text-ink/70">{level.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-8">
            <p className="inline-block rounded-2xl bg-ink/20 px-5 py-3 text-white">
              Twijfel je? Kies dan het lagere niveau. Zijn jullie niet even goed? Kies het niveau van de beste speler.
            </p>
          </Reveal>
        </Container>
      </div>
      <Wave flip className="text-sky" />
    </section>
  );
}
