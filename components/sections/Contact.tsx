import { contact } from "@/config/event";
import { Container } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { MailIcon, PhoneIcon, SocialIcon } from "@/components/ui/icons";
import { ShareButton } from "@/components/ShareButton";

/** Contactblok in de stijl van de onderkant van de flyer. */
export function Contact() {
  const socials = contact.socials.filter((s) => (s.href as string) !== "#");
  return (
    <section id="contact" className="bg-ink py-16 text-white sm:py-20">
      <Container>
        <Reveal>
          <h2 className="font-display text-4xl font-extrabold leading-tight sm:text-5xl">
            Inschrijven of <span className="text-ball">meer info?</span>
          </h2>
          <p className="mt-2 text-lg text-white/75">Neem contact met ons op, we helpen je graag.</p>
          <div className="mt-8 border-t border-white/15 pt-8">
            <ul className="flex flex-col gap-5 text-xl font-bold sm:flex-row sm:flex-wrap sm:gap-x-12 sm:text-2xl">
              <li>
                <a href={contact.phoneHref} className="inline-flex items-center gap-3 hover:text-ball">
                  <PhoneIcon className="h-6 w-6 text-ball" /> {contact.phone}
                </a>
              </li>
              <li className="min-w-0">
                <a href={`mailto:${contact.email}`} className="inline-flex max-w-full items-center gap-3 hover:text-ball">
                  <MailIcon className="h-6 w-6 shrink-0 text-ball" />
                  <span className="break-all">{contact.email}</span>
                </a>
              </li>
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ShareButton variant="light" />
            </div>
            {socials.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-3">
                {socials.map((s) => (
                  <li key={s.name}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 rounded-full bg-white/10 px-5 py-3 font-semibold ring-1 ring-white/20 transition hover:bg-white/20"
                    >
                      <SocialIcon name={s.name} className="h-5 w-5" />
                      {s.name} <span className="font-normal text-white/70">{s.handle}</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
