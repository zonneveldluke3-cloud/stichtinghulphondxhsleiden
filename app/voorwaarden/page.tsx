import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { contact, event } from "@/config/event";
import { PRICE_PER_TEAM_CENTS } from "@/config/registration";
import { formatEuro } from "@/lib/format";

export const metadata: Metadata = { title: "Deelnamevoorwaarden" };

export default function TermsPage() {
  return (
    <LegalPage title="Deelnamevoorwaarden">
      <section>
        <h2>1. Inschrijving</h2>
        <ul>
          <li>Je schrijft één of meerdere teams in via het formulier op deze website.</li>
          <li>Een team bestaat uit {event.playersPerTeam}.</li>
          <li>Een inschrijving is definitief zodra de betaling is ontvangen.</li>
          <li>Inschrijven kan tot {event.registrationDeadline} of zolang er plekken beschikbaar zijn.</li>
        </ul>
      </section>

      <section>
        <h2>2. Kosten en betaling</h2>
        <ul>
          <li>Deelname kost {formatEuro(PRICE_PER_TEAM_CENTS)} per team, inclusief eventuele btw.</li>
          <li>Na het inschrijven betaal je via de betaallink op de bevestigingspagina (bijvoorbeeld een Tikkie).</li>
          <li>Je inschrijving is pas definitief nadat wij je betaling hebben ontvangen en bevestigd.</li>
          <li>De opbrengst komt ten goede aan {event.goodCause}.</li>
        </ul>
      </section>

      <section>
        <h2>3. Annuleren</h2>
        <ul>
          <li>[Placeholder] Annuleren kan tot [datum] via {contact.email}.</li>
          <li>[Placeholder] Omdat de opbrengst naar het goede doel gaat, vindt er geen restitutie plaats.</li>
          <li>Je mag je plek overdragen aan een ander team; geef dit wel aan ons door.</li>
          <li>
            Gaat het evenement door omstandigheden niet door, dan [placeholder: ontvang je je geld terug / wordt het
            bedrag gedoneerd].
          </li>
        </ul>
      </section>

      <section>
        <h2>4. Tijdens het evenement</h2>
        <ul>
          <li>Deelname is op eigen risico. De organisatie is niet aansprakelijk voor letsel, verlies of schade.</li>
          <li>Volg de aanwijzingen van de organisatie en de huisregels van {event.location}.</li>
          <li>
            Tijdens het evenement kunnen foto&apos;s en video&apos;s worden gemaakt voor promotie. [Placeholder: hoe
            kun je hiertegen bezwaar maken?]
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
