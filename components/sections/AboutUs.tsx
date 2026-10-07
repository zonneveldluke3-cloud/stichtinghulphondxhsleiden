import Image from "next/image";
import { organisation } from "@/config/event";
import { Container, Eyebrow, SectionTitle } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

/** Over ons: logo van Hogeschool Leiden met daaronder ons verhaal (zoals op de flyer). */
export function AboutUs() {
  return (
    <section id="over-ons" className="py-16 sm:py-24">
      <Container className="max-w-4xl">
        <Reveal className="text-center">
          <Eyebrow>Over ons</Eyebrow>
          <SectionTitle className="text-ink">{organisation.title}</SectionTitle>
        </Reveal>

        <Reveal className="mt-10 flex justify-center">
          {organisation.schoolLogo ? (
            <Image
              src={organisation.schoolLogo.src}
              alt={organisation.schoolLogo.alt}
              width={organisation.schoolLogo.width}
              height={organisation.schoolLogo.height}
              className="h-20 w-auto sm:h-24"
            />
          ) : (
            // Tijdelijk tot het echte logo in /public/logos staat (zie config/event.ts)
            <div className="rounded-2xl border-2 border-dashed border-ink/15 px-8 py-6 text-center">
              <p className="font-display text-2xl font-extrabold text-ink">Hogeschool Leiden</p>
              <p className="text-sm text-ink/50">Logo volgt</p>
            </div>
          )}
        </Reveal>

        <Reveal className="mt-10">
          <blockquote className="rounded-r-3xl border-l-[6px] border-sky bg-sand px-7 py-7 text-lg leading-relaxed text-ink/85 sm:px-10 sm:text-xl">
            {organisation.story.map((part, i) =>
              typeof part === "string" ? (
                <span key={i}>{part}</span>
              ) : (
                <strong key={i} className="font-extrabold text-ink">
                  {part.bold}
                </strong>
              ),
            )}
          </blockquote>
        </Reveal>
      </Container>
    </section>
  );
}
