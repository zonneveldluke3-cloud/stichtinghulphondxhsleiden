import { contact, event } from "@/config/event";
import { Container, Eyebrow, SectionTitle } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { MailIcon, TrophyIcon, HeartIcon, UsersIcon } from "@/components/ui/icons";

function mailto(subject: string, body: string) {
  return `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

const ways = [
  {
    icon: TrophyIcon,
    title: "Een prijs voor de veiling",
    text: "Heb je een leuke prijs, cadeaubon of ervaring die we kunnen veilen? Alles wat de veiling oplevert gaat naar het goede doel.",
    subject: `Prijs voor de veiling van ${event.name}`,
    body: "Hoi,\n\nIk wil graag iets geven voor de veiling:\n\n[wat wil je geven?]\n\nMijn naam:\nTelefoonnummer:\n\nGroet,",
    button: "Mail ons over een prijs",
  },
  {
    icon: UsersIcon,
    title: "Sponsor met je bedrijf",
    text: "Wil je met je bedrijf meedoen als sponsor? Dan zetten we je op onze sponsorpagina. We denken graag met je mee over wat bij jullie past.",
    subject: `Sponsoren van ${event.name}`,
    body: "Hoi,\n\nWij willen graag sponsor worden van het toernooi.\n\nBedrijf:\nContactpersoon:\nTelefoonnummer:\n\nGroet,",
    button: "Mail ons over sponsoren",
  },
  {
    icon: HeartIcon,
    title: "Borrel, eten of hulp",
    text: "We doen ons best om via sponsors een borrel en eten te regelen, maar dat is nog niet rond. Kun jij drinken of hapjes regelen, of helpen op de dag zelf? Mail ons!",
    subject: `Ik wil helpen bij ${event.name}`,
    body: "Hoi,\n\nIk wil graag helpen met:\n\n[waarmee wil je helpen?]\n\nMijn naam:\nTelefoonnummer:\n\nGroet,",
    button: "Mail ons wat je wilt doen",
  },
];

/** Help ons op een andere manier dan met geld. */
export function HelpUs() {
  return (
    <section id="help-ons" className="py-14 sm:py-20">
      <Container>
        <Reveal className="max-w-3xl">
          <Eyebrow>Help ons</Eyebrow>
          <SectionTitle className="text-ink">
            Op een andere manier <span className="text-sky">helpen?</span>
          </SectionTitle>
          <p className="mt-5 text-lg leading-relaxed text-ink/75">
            Je kunt ons ook steunen zonder geld over te maken. Stuur ons een mailtje, dan nemen we snel contact met je op.
          </p>
        </Reveal>

        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {ways.map(({ icon: Icon, ...w }, i) => (
            <Reveal as="li" key={w.title} delay={i * 90}>
              <div className="flex h-full flex-col rounded-3xl bg-white p-7 shadow-[0_18px_40px_-26px_rgba(41,35,93,0.55)] ring-1 ring-ink/5 transition hover:-translate-y-1">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-ball text-ink">
                  <Icon className="h-7 w-7" />
                </span>
                <h3 className="mt-5 font-display text-2xl font-extrabold text-ink">{w.title}</h3>
                <p className="mt-2 flex-1 text-lg leading-relaxed text-ink/70">{w.text}</p>
                <a
                  href={mailto(w.subject, w.body)}
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 font-bold text-white transition hover:bg-court"
                >
                  <MailIcon className="h-5 w-5" /> {w.button}
                </a>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
