import type { Metadata } from "next";
import { contact, event, sponsors, type Sponsor } from "@/config/event";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SponsorLogo } from "@/components/SponsorLogo";
import { Container, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { MailIcon } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Sponsors",
  description: `De bedrijven die ${event.name} mogelijk maken.`,
};

const tiers: { key: Sponsor["tier"]; title: string }[] = [
  { key: "hoofdsponsor", title: "Hoofdsponsor" },
  { key: "partner", title: "Event partners" },
  { key: "sponsor", title: "Sponsors" },
];

export default function SponsorsPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Intro */}
        <section className="bg-sky py-16 text-white sm:py-24">
          <Container>
            <Eyebrow light>Sponsors</Eyebrow>
            <h1 className="max-w-3xl font-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl">
              Samen maken we het <span className="text-ball">verschil</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/90">
              Deze bedrijven steunen {event.name} en daarmee {event.goodCause}. Bedankt voor jullie steun!
            </p>
          </Container>
        </section>

        {/* Sponsors per niveau */}
        <section className="py-16 sm:py-20">
          <Container className="space-y-14">
            {sponsors.length === 0 && (
              <p className="rounded-3xl border-2 border-dashed border-ink/15 p-10 text-center text-lg text-ink/55">
                De sponsors worden binnenkort bekendgemaakt.
              </p>
            )}
            {tiers.map((tier) => {
              const list = sponsors.filter((s) => s.tier === tier.key);
              if (list.length === 0) return null;
              const large = tier.key === "hoofdsponsor";
              return (
                <Reveal key={tier.key}>
                  <h2 className="font-display text-2xl font-extrabold sm:text-3xl">{tier.title}</h2>
                  <ul
                    className={`mt-6 grid gap-4 ${
                      large ? "sm:grid-cols-2" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
                    }`}
                  >
                    {list.map((s) => (
                      <li key={s.name}>
                        <SponsorLogo sponsor={s} large={large} />
                      </li>
                    ))}
                  </ul>
                </Reveal>
              );
            })}
          </Container>
        </section>

        <section className="bg-sand py-14 sm:py-20">
          <Container>
            <Reveal className="flex flex-col items-start gap-6 rounded-[2rem] bg-ink p-8 text-white sm:p-12 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
                  Ook <span className="text-ball">sponsoren?</span>
                </h2>
                <p className="mt-2 max-w-xl text-lg text-white/80">
                  Met geld, een prijs voor de veiling of iets anders. Stuur ons een mailtje, dan denken we graag met je mee.
                </p>
              </div>
              <a
                href={`mailto:${contact.email}?subject=${encodeURIComponent(`Sponsoren van ${event.name}`)}`}
                className="inline-flex shrink-0 items-center gap-3 rounded-full bg-ball px-7 py-4 text-lg font-extrabold text-ink transition hover:bg-white"
              >
                <MailIcon className="h-5 w-5" /> Mail ons
              </a>
            </Reveal>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
