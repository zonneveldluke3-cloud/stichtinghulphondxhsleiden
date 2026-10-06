import { Container, Eyebrow, SectionTitle } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const steps = [
  { title: "Kies het aantal teams", text: "Schrijf één team in of meerdere tegelijk. De totaalprijs zie je meteen." },
  { title: "Vul de gegevens in", text: "Per team een teamnaam en een contactpersoon. Dat is alles." },
  { title: "Betaal en je inschrijving is rond", text: "Betaal via de betaallink (bijv. Tikkie). Zodra wij je betaling hebben ontvangen, is je inschrijving definitief." },
];

export function HowItWorks() {
  return (
    <section id="hoe-werkt-het" className="bg-sand py-20 sm:py-28">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>Hoe werkt het</Eyebrow>
          <SectionTitle>In drie stappen op de baan</SectionTitle>
        </Reveal>

        <ol className="mt-12 grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 110}>
              <div className="relative h-full rounded-3xl bg-white p-7 shadow-sm ring-1 ring-ink/5">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-ink font-display text-2xl font-extrabold text-ball">
                  {i + 1}
                </span>
                <h3 className="mt-6 font-display text-2xl font-bold leading-tight">{s.title}</h3>
                <p className="mt-2 text-ink/65">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
