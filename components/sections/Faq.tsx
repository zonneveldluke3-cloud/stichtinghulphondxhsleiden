import { faq } from "@/config/event";
import { Container, Eyebrow, SectionTitle } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PlusIcon } from "@/components/ui/icons";

export function Faq() {
  return (
    <section id="faq" className="bg-sand py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <Reveal>
          <Eyebrow>Veelgestelde vragen</Eyebrow>
          <SectionTitle>Nog vragen?</SectionTitle>
          <p className="mt-5 text-lg text-ink/65">
            Staat je vraag er niet tussen? <a href="#contact" className="font-semibold text-court underline underline-offset-4">Neem contact op</a>.
          </p>
        </Reveal>

        <Reveal className="divide-y divide-ink/10 border-y border-ink/10">
          {faq.map((item) => (
            <details key={item.q} className="group py-1">
              <summary className="flex cursor-pointer items-center justify-between gap-6 py-5 text-left font-display text-lg font-bold sm:text-xl">
                {item.q}
                <span className="faq-icon grid h-9 w-9 shrink-0 place-items-center rounded-full bg-sand transition-transform duration-300 group-hover:bg-ball">
                  <PlusIcon className="h-5 w-5" />
                </span>
              </summary>
              <p className="faq-body pb-6 pr-12 text-lg leading-relaxed text-ink/70">{item.a}</p>
            </details>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
