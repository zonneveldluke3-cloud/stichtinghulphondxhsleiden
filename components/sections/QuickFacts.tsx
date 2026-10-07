import { event } from "@/config/event";
import { Container } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CalendarIcon, PinIcon, TrophyIcon } from "@/components/ui/icons";

/** De drie kaarten onder de hero (Wanneer / Waar / Afsluiting), zoals op de flyer. */
export function QuickFacts() {
  const facts = [
    { icon: CalendarIcon, label: "Wanneer", title: event.date, sub: event.startTime },
    { icon: PinIcon, label: "Waar", title: event.location, sub: "Banen & borrel" },
    { icon: TrophyIcon, label: "Na afloop", title: "Borrel & veiling", sub: "Met prijsuitreiking per niveau" },
  ];
  return (
    <section className="relative z-10 -mt-6 pb-6 sm:-mt-16 lg:-mt-24">
      <Container>
        <ul className="grid gap-4 md:grid-cols-3">
          {facts.map(({ icon: Icon, label, title, sub }, i) => (
            <Reveal as="li" key={label} delay={i * 90}>
              <div className="h-full rounded-3xl bg-sand p-7 shadow-[0_10px_30px_-18px_rgba(41,35,93,0.45)]">
                <Icon className="h-9 w-9 text-sky" />
                <p className="mt-5 text-sm font-bold uppercase tracking-[0.14em] text-court">{label}</p>
                <p className="mt-1 font-display text-2xl font-extrabold leading-tight text-ink">{title}</p>
                <p className="mt-2 text-ink/60">{sub}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
