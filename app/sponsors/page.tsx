import type { Metadata } from "next";
import { contact, event, sponsorPackages, sponsors, type Sponsor } from "@/config/event";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SponsorLogo } from "@/components/SponsorLogo";
import { Container, Eyebrow, SectionTitle } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { MailIcon, PhoneIcon } from "@/components/ui/icons";

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
        <section className="bg-ink py-16 text-white sm:py-24">
          <Container>
            <Eyebrow light>Sponsors</Eyebrow>
            <h1 className="max-w-3xl font-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl">
              Samen maken we het <span className="text-ball">verschil</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/75">
              Deze bedrijven steunen {event.name} en daarmee {event.goodCause}. Dankzij hen gaat 100% van de opbrengst
              naar het goede doel.
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

        {/* Sponsor worden */}
        <section className="bg-sand py-16 sm:py-24">
          <Container>
            <Reveal className="max-w-2xl">
              <Eyebrow>Sponsor worden</Eyebrow>
              <SectionTitle>Steun het toernooi met jouw bedrijf</SectionTitle>
              <p className="mt-5 text-lg text-ink/65">
                Laat je bedrijf zien aan ondernemers uit de regio én steun {event.goodCause}. Kies een pakket of neem
                contact op voor een sponsoring op maat.
              </p>
            </Reveal>

            <ul className="mt-12 grid gap-4 md:grid-cols-3">
              {sponsorPackages.map((p, i) => (
                <Reveal as="li" key={p.name} delay={i * 90}>
                  <div
                    className={`flex h-full flex-col rounded-3xl p-7 shadow-sm ring-1 ${
                      i === 2 ? "bg-ink text-white ring-ink" : "bg-white ring-ink/5"
                    }`}
                  >
                    <h3 className="font-display text-2xl font-bold">{p.name}</h3>
                    <p className={`mt-2 font-display text-4xl font-extrabold ${i === 2 ? "text-ball" : "text-court"}`}>
                      {p.price}
                    </p>
                    <p className={`mt-4 flex-1 ${i === 2 ? "text-white/75" : "text-ink/65"}`}>{p.text}</p>
                  </div>
                </Reveal>
              ))}
            </ul>

            <Reveal className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href={`mailto:${contact.email}?subject=${encodeURIComponent(`Sponsoring ${event.shortName}`)}`}
                className="inline-flex max-w-full items-center justify-center gap-3 rounded-full bg-ink px-7 py-4 font-bold text-white transition hover:bg-court"
              >
                <MailIcon className="h-5 w-5 shrink-0" /> Mail ons over sponsoring
              </a>
              <a
                href={contact.phoneHref}
                className="inline-flex items-center justify-center gap-3 rounded-full px-7 py-4 font-bold text-ink ring-1 ring-ink/15 transition hover:bg-white"
              >
                <PhoneIcon className="h-5 w-5" /> Bel {contact.phone}
              </a>
            </Reveal>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
