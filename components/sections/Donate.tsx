import { donation, event } from "@/config/event";
import { Container, Eyebrow, SectionTitle } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ExternalIcon, HeartIcon } from "@/components/ui/icons";

export function Donate() {
  return (
    <section id="doneren" className="py-10 sm:py-14">
      <Container>
        <Reveal className="relative overflow-hidden rounded-[2rem] bg-ball p-8 text-ink sm:p-14">
          <HeartIcon
            className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 text-ink/[0.07] sm:h-72 sm:w-72"
            aria-hidden
          />
          <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <Eyebrow className="!text-ink">Doneren</Eyebrow>
              <SectionTitle>{donation.title}</SectionTitle>
              <p className="mt-4 max-w-xl text-lg text-ink/75">{donation.text}</p>
            </div>
            <div className="flex flex-col items-start gap-3 lg:items-end">
              <a
                href={donation.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 text-lg font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-court"
              >
                <HeartIcon className="h-5 w-5 text-ball" />
                {donation.button}
                <ExternalIcon className="h-4 w-4 opacity-70" />
              </a>
              <p className="text-sm text-ink/60">100% gaat naar {event.goodCause}. Opent in een nieuw tabblad.</p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
