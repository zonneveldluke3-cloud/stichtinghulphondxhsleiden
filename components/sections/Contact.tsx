import { contact } from "@/config/event";
import { Container, Eyebrow, SectionTitle } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { MailIcon, SocialIcon } from "@/components/ui/icons";

export function Contact() {
  return (
    <section id="contact" className="pb-20 sm:pb-28">
      <Container>
        <Reveal className="overflow-hidden rounded-[2rem] bg-court p-8 text-white sm:p-14">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
            <div>
              <Eyebrow light>Contact</Eyebrow>
              <SectionTitle>Vragen? Stuur ons een berichtje.</SectionTitle>
              <a
                href={`mailto:${contact.email}`}
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-lg font-bold text-ink transition hover:bg-ball"
              >
                <MailIcon className="h-5 w-5" /> {contact.email}
              </a>
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
