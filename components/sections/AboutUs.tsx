import Image from "next/image";
import { contact, organisation } from "@/config/event";
import { Container, Eyebrow, SectionTitle } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { InstagramIcon } from "@/components/ui/icons";

/** Over ons: logo Hogeschool Leiden, ons verhaal en waarom we dit doen. */
export function AboutUs() {
  const instagram = contact.socials.find((s) => s.name === "Instagram");
  return (
    <section id="over-ons" className="py-16 sm:py-24">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
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

        <Reveal className="mx-auto mt-10 max-w-4xl">
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

        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {organisation.blocks.map((b, i) => (
            <Reveal as="li" key={b.title} delay={i * 90}>
              <div className="h-full border-t-[5px] border-ball pt-5">
                <h3 className="font-display text-2xl font-extrabold text-ink">{b.title}</h3>
                <p className="mt-3 text-lg leading-relaxed text-ink/70">{b.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>

        {instagram && (
          <Reveal className="mt-12 flex flex-col items-center gap-3 text-center">
            <p className="text-lg text-ink/70">Volg ons project op Instagram</p>
            <a
              href={instagram.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-ink px-7 py-3.5 text-lg font-bold text-white transition hover:bg-court"
            >
              <InstagramIcon className="h-5 w-5 text-ball" /> {instagram.handle}
            </a>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
