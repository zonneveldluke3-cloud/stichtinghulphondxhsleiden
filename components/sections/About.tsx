import { about, event } from "@/config/event";
import { MAX_TEAMS } from "@/config/registration";
import { Container, Eyebrow, SectionTitle } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CourtIllustration } from "@/components/ui/Decor";

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
    <section id="over" className="py-14 sm:py-20">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <Eyebrow>Over het evenement</Eyebrow>
            <SectionTitle className="text-ink">{about.title}</SectionTitle>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink/75">
              {about.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <ul className="mt-8 flex flex-wrap gap-2">
              {about.highlights.map((h) => (
                <li key={h.title} className="rounded-full bg-sand px-4 py-2 font-bold text-ink">
                  {h.title}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120} className="mx-auto w-full max-w-sm">
            <div className="relative">
              <CourtIllustration className="w-full -rotate-3 drop-shadow-[0_24px_40px_rgba(41,35,93,0.25)]" />
              <p className="absolute -bottom-5 -left-3 rotate-[-6deg] rounded-2xl bg-ball px-5 py-3 font-display text-lg font-extrabold text-ink shadow-lg">
                Poules van 4 · 15 min per potje
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-20">
          <h3 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">
            Zo doe je <span className="text-sky">mee</span>
          </h3>
        </Reveal>
        <ul className="mt-8 grid gap-5 md:grid-cols-3">
          {stats.map((s, i) => (
            <Reveal as="li" key={s.unit} delay={i * 90}>
              <div className="h-full rounded-3xl border-t-[6px] border-ball bg-white p-6 shadow-[0_12px_32px_-20px_rgba(41,35,93,0.45)] ring-1 ring-ink/5">
                <p className="flex items-baseline gap-3">
                  <span className="font-display text-7xl font-extrabold leading-none text-sky">{s.n}</span>
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
