import Link from "next/link";
import { sponsors } from "@/config/event";
import { Container, Eyebrow, SectionTitle } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon } from "@/components/ui/icons";
import { SponsorLogo } from "@/components/SponsorLogo";

/** Korte sponsorstrook op de homepage, met link naar /sponsors. */
export function SponsorStrip() {
  return (
    <section id="sponsors" className="py-16 sm:py-20">
      <Container>
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow>Sponsors</Eyebrow>
            <SectionTitle>Mogelijk gemaakt door</SectionTitle>
          </div>
          <Link href="/sponsors" className="inline-flex items-center gap-2 font-bold text-court hover:text-ink">
            Bekijk alle sponsors <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </Reveal>

        {sponsors.length > 0 ? (
          <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {sponsors.map((s) => (
              <li key={s.name}>
                <SponsorLogo sponsor={s} />
              </li>
            ))}
          </ul>
        ) : (
          <Reveal className="mt-10 rounded-3xl border-2 border-dashed border-ink/15 p-8 text-center text-ink/55">
            Sponsors worden binnenkort bekendgemaakt.
          </Reveal>
        )}
      </Container>
    </section>
  );
}
