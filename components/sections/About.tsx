import { about } from "@/config/event";
import { Container, Eyebrow, SectionTitle } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  return (
    <section id="over" className="py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <Reveal>
          <Eyebrow>Over het evenement</Eyebrow>
          <SectionTitle>{about.title}</SectionTitle>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink/70">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Reveal>

        <ul className="grid gap-4 self-center">
          {about.highlights.map((h, i) => (
            <Reveal as="li" key={h.title} delay={i * 90}>
              <div className="flex gap-5 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-ink/5">
                <span className="w-11 shrink-0 font-display text-3xl font-extrabold text-court">0{i + 1}</span>
                <div>
                  <h3 className="font-display text-xl font-bold">{h.title}</h3>
                  <p className="mt-1 text-ink/65">{h.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
