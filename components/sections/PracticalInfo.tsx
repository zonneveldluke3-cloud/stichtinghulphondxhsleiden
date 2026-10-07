import { event } from "@/config/event";
import { PRICE_PER_PERSON_CENTS, PRICE_PER_TEAM_CENTS } from "@/config/registration";
import { formatEuroShort } from "@/lib/format";
import { Container, Eyebrow, SectionTitle } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PawTrail } from "@/components/ui/Decor";
import { CalendarIcon, ClockIcon, EuroIcon, FlagIcon, PinIcon, UsersIcon } from "@/components/ui/icons";

export function PracticalInfo() {
  const items = [
    { icon: CalendarIcon, label: "Datum", value: event.date, sub: "Regent het? Dan kijken we samen met de club wat we doen" },
    { icon: PinIcon, label: "Locatie", value: event.location, sub: event.address, href: event.mapsUrl },
    { icon: ClockIcon, label: "Tijd", value: event.startTime, sub: `${event.afterParty} (eten en drinken via sponsors, nog niet rond)` },
    { icon: EuroIcon, label: "Prijs", value: `${formatEuroShort(PRICE_PER_PERSON_CENTS)} per persoon`, sub: `Dus ${formatEuroShort(PRICE_PER_TEAM_CENTS)} per team van 2` },
    { icon: UsersIcon, label: "Spelers per team", value: event.playersPerTeam },
    { icon: FlagIcon, label: "Inschrijven kan tot", value: event.registrationDeadline, sub: "Zolang er plek is" },
  ];

  return (
    <section id="info" className="relative isolate overflow-hidden bg-sky py-20 text-white sm:py-28">
      <PawTrail className="absolute -right-10 bottom-0 -z-10 w-80 text-white/10 sm:w-[30rem]" />
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow light>Praktische informatie</Eyebrow>
          <SectionTitle>Alles op een rij</SectionTitle>
        </Reveal>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, label, value, sub, href }, i) => (
            <Reveal as="li" key={label} delay={(i % 3) * 80}>
              <div className="flex h-full items-start gap-4 rounded-3xl bg-white p-6 text-ink shadow-[0_18px_40px_-24px_rgba(41,35,93,0.6)]">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-court/10 text-court">
                  <Icon className="h-6 w-6" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold uppercase tracking-wider text-ink/50">{label}</p>
                  <p className="mt-0.5 font-display text-xl font-bold leading-snug">{value}</p>
                  {sub && <p className="mt-0.5 text-sm text-ink/60">{sub}</p>}
                  {href && (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-sm font-semibold text-court underline underline-offset-2 hover:text-ink"
                    >
                      Route plannen
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
