import Image from "next/image";
import { organisation } from "@/config/event";
import { Container, Eyebrow, SectionTitle } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CameraIcon } from "@/components/ui/icons";

export function AboutUs() {
  const blocks = [
    { title: "Wie we zijn", text: organisation.whoWeAre },
    { title: "Waarom we dit organiseren", text: organisation.why },
    { title: "Wat we willen bereiken", text: organisation.goal },
  ];

  return (
    <section id="over-ons" className="py-20 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal className="order-2 lg:order-1">
          {organisation.photo ? (
            <Image
              src={organisation.photo.src}
              alt={organisation.photo.alt}
              width={1200}
              height={900}
              className="aspect-[4/3] w-full rounded-[2rem] object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          ) : (
            // Placeholder — zet een foto in /public en vul organisation.photo in config/event.ts
            <div className="grid aspect-[4/3] w-full place-items-center rounded-[2rem] border-2 border-dashed border-ink/15 bg-sand text-center text-ink/45">
              <div>
                <CameraIcon className="mx-auto h-10 w-10" />
                <p className="mt-3 font-semibold">Foto van de organisatie</p>
                <p className="text-sm">Plaats hier jullie teamfoto</p>
              </div>
            </div>
          )}
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <Eyebrow>Over ons</Eyebrow>
            <SectionTitle>{organisation.title}</SectionTitle>
          </Reveal>
          <div className="mt-8 space-y-7">
            {blocks.map((b, i) => (
              <Reveal key={b.title} delay={i * 80}>
                <h3 className="font-display text-xl font-bold">{b.title}</h3>
                <p className="mt-1.5 text-lg leading-relaxed text-ink/70">{b.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
