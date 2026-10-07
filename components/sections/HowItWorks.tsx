import { Container, Eyebrow, SectionTitle } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const steps = [
  { title: "Kies je teams", text: "Schrijf één team in of meerdere tegelijk. Je ziet de totaalprijs meteen." },
  { title: "Vul de gegevens in", text: "Per team een teamnaam, een niveau en een contactpersoon. Meer is het niet." },
  { title: "Betaal en klaar", text: "Betaal via de betaallink, bijvoorbeeld een Tikkie. Zodra wij je betaling zien, sta je erbij." },
];

export function HowItWorks() {
  return (
    <section id="hoe-werkt-het" className="py-14 sm:py-20">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>Hoe werkt het</Eyebrow>
          <SectionTitle className="text-ink">In drie stappen op de baan</SectionTitle>
        </Reveal>

        <ol className="relative mt-12 grid gap-8 md:grid-cols-3 md:gap-6">
          <span
            className="absolute left-8 right-8 top-10 hidden border-t-4 border-dashed border-ball md:block"
            aria-hidden
          />
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 110} className="relative">
              <span className="relative grid h-20 w-20 place-items-center rounded-full bg-ink font-display text-4xl font-extrabold text-ball ring-8 ring-white">
                {i + 1}
              </span>
              <h3 className="mt-6 font-display text-2xl font-extrabold leading-tight text-ink">{s.title}</h3>
              <p className="mt-2 text-lg text-ink/65">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
