import { contact } from "@/config/event";
import { Container, Eyebrow, SectionTitle } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { MailIcon, PhoneIcon, SocialIcon } from "@/components/ui/icons";

export function Contact() {
  return (
    <section id="contact" className="pb-20 sm:pb-28">
      <Container>
        <Reveal className="overflow-hidden rounded-[2rem] bg-court p-8 text-white sm:p-14">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
            <div>
              <Eyebrow light>Contact</Eyebrow>
              <SectionTitle>Vragen? Stuur ons een berichtje.</SectionTitle>
              <div className="mt-8 flex flex-col items-start gap-3">
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex max-w-full items-center gap-3 rounded-full bg-white px-6 py-3.5 font-bold text-ink transition hover:bg-ball sm:text-lg"
                >
                  <MailIcon className="h-5 w-5 shrink-0" /> <span className="break-all">{contact.email}</span>
                </a>
                <a
                  href={contact.phoneHref}
                  className="inline-flex items-center gap-3 rounded-full bg-white/10 px-6 py-3.5 font-bold text-white ring-1 ring-white/25 transition hover:bg-white/20 sm:text-lg"
                >
                  <PhoneIcon className="h-5 w-5" /> {contact.phone}
                </a>
              </div>
            </div>
            <ul className="flex flex-wrap gap-3 lg:justify-end">
              {contact.socials.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 rounded-full bg-white/10 px-5 py-3 font-semibold ring-1 ring-white/20 transition hover:bg-white/20"
                  >
                    <SocialIcon name={s.name} className="h-5 w-5" />
                    <span>{s.name}</span>
                    <span className="sr-only">: {s.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
