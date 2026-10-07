import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { contact, event, legal } from "@/config/event";
import { PRICE_PER_PERSON_CENTS, PRICE_PER_TEAM_CENTS } from "@/config/registration";
import { formatEuro } from "@/lib/format";

export const metadata: Metadata = { title: "Deelnamevoorwaarden" };

export default function TermsPage() {
  return (
    <LegalPage title="Deelnamevoorwaarden">
      <section>
        <h2>1. Inschrijving</h2>
        <p className="mb-3">Het toernooi wordt georganiseerd door {legal.organiserName} uit {legal.organiserCity}.</p>
        <ul>
          <li>Je schrijft één of meerdere teams in via het formulier op deze website.</li>
          <li>Een team bestaat uit {event.playersPerTeam}.</li>
          <li>Een inschrijving is definitief zodra de betaling is ontvangen.</li>
          <li>Inschrijven kan tot en met {event.registrationDeadline}, zolang er plekken beschikbaar zijn.</li>
          <li>Per team kies je een niveau. De organisatie deelt de poules in op niveau en mag een team zo nodig in een andere poule plaatsen.</li>
        </ul>
      </section>

      <section>
        <h2>2. Kosten en betaling</h2>
        <ul>
          <li>
            Deelname kost {formatEuro(PRICE_PER_PERSON_CENTS)} per persoon, dus {formatEuro(PRICE_PER_TEAM_CENTS)} per team van
            twee spelers.
          </li>
          <li>Na het inschrijven betaal je via de betaallink op de bevestigingspagina (bijvoorbeeld een Tikkie).</li>
          <li>Je inschrijving is pas definitief nadat wij je betaling hebben ontvangen en bevestigd.</li>
          <li>De opbrengst komt ten goede aan {event.goodCause}.</li>
        </ul>
      </section>

      <section>
        <h2>3. Annuleren</h2>
        <ul>
          <li>Kun je niet meer meedoen? Laat het ons zo snel mogelijk weten via {contact.email}.</li>
          <li>Alle betalingen zijn definitief. Omdat de opbrengst naar het goede doel gaat, betalen we het inschrijfgeld niet terug.</li>
          <li>Je mag je plek overdragen aan een ander team; geef dit wel aan ons door.</li>
          <li>
            Gaat het toernooi door omstandigheden niet door, dan gaat het inschrijfgeld als donatie naar{" "}
            {event.goodCause}.
          </li>
        </ul>
      </section>

      <section>
        <h2>4. Tijdens het evenement</h2>
        <ul>
          <li>Deelname is op eigen risico. De organisatie is niet aansprakelijk voor letsel, verlies of schade.</li>
          <li>Volg de aanwijzingen van de organisatie en de huisregels van {event.location}.</li>
          <li>Bij regen kijken we samen met {event.location} wat we doen. We laten het je dan zo snel mogelijk weten.</li>
          <li>
            Tijdens het evenement kunnen foto&apos;s en video&apos;s worden gemaakt voor promotie. Wil je niet in
            beeld? Zeg het tegen de organisatie op de dag zelf of mail naar {contact.email}, dan houden we daar rekening
            mee.
          </li>
        </ul>
      </section>

      <section>
        <h2>5. Wijzigingen</h2>
        <p>
          De organisatie mag het programma, de indeling of de aanvangstijden wijzigen. Deelnemers worden hierover per
          e-mail geïnformeerd.
        </p>
      </section>

      <section>
        <h2>6. Contact</h2>
        <p>Vragen over deze voorwaarden? Mail naar {contact.email}.</p>
      </section>
    </LegalPage>
  );
}
