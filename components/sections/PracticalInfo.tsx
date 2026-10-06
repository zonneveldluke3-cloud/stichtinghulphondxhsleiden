import { event } from "@/config/event";
import { PRICE_PER_TEAM_CENTS } from "@/config/registration";
import { formatEuroShort } from "@/lib/format";
import { Container, Eyebrow, SectionTitle } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CalendarIcon, ClockIcon, EuroIcon, FlagIcon, PinIcon, UsersIcon } from "@/components/ui/icons";

export function PracticalInfo() {
  const items = [
    { icon: CalendarIcon, label: "Datum", value: event.date },
    { icon: PinIcon, label: "Locatie", value: event.location, sub: event.address },
    { icon: ClockIcon, label: "Aanvang", value: event.startTime },
    { icon: EuroIcon, label: "Prijs", value: `${formatEuroShort(PRICE_PER_TEAM_CENTS)} per team` },
    { icon: UsersIcon, label: "Spelers per team", value: event.playersPerTeam },
    { icon: FlagIcon, label: "Inschrijfdeadline", value: event.registrationDeadline },
  ];

  return (
    <section id="info" className="bg-sand py-20 sm:py-28">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>Praktische informatie</Eyebrow>
          <SectionTitle>Alles op een rij</SectionTitle>
        </Reveal>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, label, value, sub }, i) => (
            <Reveal as="li" key={label} delay={(i % 3) * 80}>
              <div className="flex h-full items-start gap-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-ink/5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-court/10 text-court">
                  <Icon className="h-6 w-6" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold uppercase tracking-wider text-ink/50">{label}</p>
                  <p className="mt-0.5 font-display text-xl font-bold leading-snug">{value}</p>
                  {sub && <p className="mt-0.5 text-sm text-ink/60">{sub}</p>}
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
