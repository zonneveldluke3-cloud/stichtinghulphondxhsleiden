import { LEVELS } from "@/config/registration";
import { Container, Eyebrow, SectionTitle } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

/** Uitleg over de niveaus. Bij het inschrijven kies je per team een niveau. */
export function Levels() {
  return (
    <section id="niveaus" className="py-16 sm:py-24">
      <Container>
        <Reveal className="max-w-3xl">
          <Eyebrow>Niveaus</Eyebrow>
          <SectionTitle className="text-ink">Speel tegen teams van jouw niveau</SectionTitle>
          <p className="mt-5 text-lg leading-relaxed text-ink/75">
            Bij het inschrijven kies je per team een niveau. Wij delen de poules daarna in op niveau, zodat je tegen
            teams speelt die ongeveer even goed zijn. Zo is het voor iedereen leuk en spannend. Elk niveau heeft
            een eigen winnaar.
          </p>
        </Reveal>

        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {LEVELS.map((level, i) => (
            <Reveal as="li" key={level.value} delay={i * 90}>
              <div className="flex h-full flex-col rounded-3xl bg-sand p-7">
                <div className="flex items-center gap-1.5" aria-hidden>
                  {LEVELS.map((_, dot) => (
                    <span
                      key={dot}
                      className={`h-3 w-8 rounded-full ${dot <= i ? "bg-sky" : "bg-white"}`}
                    />
                  ))}
                </div>
                <h3 className="mt-5 font-display text-2xl font-extrabold text-ink">{level.label}</h3>
                <p className="mt-2 text-lg leading-relaxed text-ink/70">{level.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-8">
          <p className="text-ink/60">
            Twijfel je? Kies dan het lagere niveau. Zijn jullie niet even goed? Kies dan het niveau van de beste
            speler.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
