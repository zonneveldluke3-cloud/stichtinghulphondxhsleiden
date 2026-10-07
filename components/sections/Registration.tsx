import { event } from "@/config/event";
import { Container, Eyebrow, SectionTitle } from "@/components/ui/Section";
import { RegistrationForm } from "@/components/form/RegistrationForm";

export function Registration() {
  return (
    <section id="inschrijven" className="relative py-20 sm:py-28">
      <Container>
        <div className="mb-12 max-w-2xl">
          <Eyebrow>Inschrijven</Eyebrow>
          <SectionTitle>Schrijf je team in</SectionTitle>
          <p className="mt-5 text-lg text-ink/65">
            Binnen twee minuten geregeld. Inschrijven kan tot en met {event.registrationDeadline}, zolang er plek is.
          </p>
        </div>
        <RegistrationForm />
      </Container>
    </section>
  );
}
