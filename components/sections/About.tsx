import { about, event } from "@/config/event";
import { MAX_TEAMS } from "@/config/registration";
import { Container, Eyebrow, SectionTitle } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  const stats = [
    {
      n: String(MAX_TEAMS),
      unit: "teams",
      text: `Je kunt tot ${MAX_TEAMS === 3 ? "drie" : MAX_TEAMS} teams tegelijk inschrijven, handig als je met een groep komt.`,
    },
    { n: "2", unit: "per team", text: "Speel samen met een vriend, collega, partner of familielid." },
    { n: String(event.maxPlayers), unit: "spelers", text: "Beperkt aantal plekken, dus vol is vol. Schrijf je op tijd in." },
  ];

  return (
    <section id="over" className="py-16 sm:py-24">
      <Container>
        <Reveal className="max-w-3xl">
          <Eyebrow>Over het evenement</Eyebrow>
          <SectionTitle className="text-ink">{about.title}</SectionTitle>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink/75">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-16">
          <h3 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">
            Zo doe je <span className="text-sky">mee</span>
          </h3>
        </Reveal>
        <ul className="mt-8 grid gap-8 md:grid-cols-3">
          {stats.map((s, i) => (
            <Reveal as="li" key={s.unit} delay={i * 90}>
              <div className="border-t-[5px] border-ball pt-5">
                <p className="flex items-baseline gap-3">
                  <span className="font-display text-6xl font-extrabold leading-none text-sky">{s.n}</span>
                  <span className="font-display text-2xl font-extrabold text-ink">{s.unit}</span>
                </p>
                <p className="mt-3 text-lg text-ink/65">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
