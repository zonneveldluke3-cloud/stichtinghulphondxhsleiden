import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { event, legal } from "@/config/event";

export const metadata: Metadata = { title: "Privacyverklaring" };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacyverklaring">
      <section>
        <h2>Wie zijn wij?</h2>
        <p>
          {legal.organiserName} organiseert {event.name}. Wij zijn verantwoordelijk voor de verwerking van de
          persoonsgegevens die je via deze website aan ons geeft.
        </p>
        <ul className="mt-3">
          <li>Adres: {legal.organiserAddress}</li>
          <li>KvK: {legal.kvk}</li>
          <li>E-mail: {legal.privacyEmail}</li>
        </ul>
      </section>

      <section>
        <h2>Welke gegevens verzamelen we?</h2>
        <p>We vragen alleen gegevens die nodig zijn voor je inschrijving:</p>
        <ul className="mt-3">
          <li>Naam, e-mailadres en telefoonnummer van degene die inschrijft;</li>
          <li>Per team: teamnaam, naam en e-mailadres van de contactpersoon;</li>
          <li>Of je hebt betaald en wanneer. Betalingen ontvangen we op onze bankrekening; daarbij zien we de naam en het rekeningnummer van de betaler, zoals bij iedere bankoverschrijving.</li>
        </ul>
      </section>

      <section>
        <h2>Waarom gebruiken we deze gegevens?</h2>
        <ul>
          <li>Om je inschrijving te verwerken en te bevestigen;</li>
          <li>Om contact met je op te nemen over het evenement (speelschema, wijzigingen);</li>
          <li>Om de betaling te controleren.</li>
        </ul>
        <p className="mt-3">
          De grondslag is de uitvoering van de overeenkomst (je deelname). We gebruiken je gegevens niet voor
          marketing zonder je aparte toestemming en verkopen ze nooit aan derden.
        </p>
      </section>

      <section>
        <h2>Met wie delen we gegevens?</h2>
        <ul>
          <li>
            <strong>[Tikkie / naam van je bank]</strong> verwerkt je betaling via de betaallink. Zij zijn zelf verantwoordelijk voor de betaalgegevens
            die je bij hen invoert.
          </li>
          <li>
            <strong>Supabase</strong> (database) en <strong>Vercel</strong> (hosting) slaan de inschrijfgegevens
            namens ons op. [Controleer en vermeld de serverregio, bijv. EU (Frankfurt).]
          </li>
          <li>[Eventueel: {event.goodCause} / de locatie, alleen indien nodig en vermeld wat er gedeeld wordt.]</li>
        </ul>
      </section>

      <section>
        <h2>Hoe lang bewaren we je gegevens?</h2>
        <p>
          We bewaren je gegevens niet langer dan nodig: {legal.retentionPeriod}. Gegevens die we wettelijk langer
          moeten bewaren (bijv. voor de administratie) bewaren we zolang dat verplicht is.
        </p>
      </section>

      <section>
        <h2>Beveiliging</h2>
        <p>
          Persoonsgegevens zijn niet publiek toegankelijk. Ze worden alleen via beveiligde serververbindingen
          opgeslagen en zijn uitsluitend in te zien door de organisatie.
        </p>
      </section>

      <section>
        <h2>Jouw rechten</h2>
        <p>
          Je hebt het recht om je gegevens in te zien, te laten corrigeren of te laten verwijderen, en om bezwaar te
          maken tegen het gebruik ervan. Stuur hiervoor een e-mail naar {legal.privacyEmail}. Ben je niet tevreden
          over hoe we met je gegevens omgaan? Dan kun je een klacht indienen bij de Autoriteit Persoonsgegevens.
        </p>
      </section>

      <section>
        <h2>Cookies</h2>
        <p>Deze website gebruikt geen tracking- of advertentiecookies.</p>
      </section>
    </LegalPage>
  );
}
