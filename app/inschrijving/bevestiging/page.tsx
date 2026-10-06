import type { Metadata } from "next";
import { redirect, unstable_rethrow } from "next/navigation";
import { contact, event } from "@/config/event";
import { ButtonLink, StatusShell } from "@/components/StatusShell";
import { AlertIcon, ArrowRightIcon, CheckIcon, ClockIcon } from "@/components/ui/icons";
import { getPaymentUrl } from "@/lib/env";
import { formatEuro } from "@/lib/format";
import { getRegistration, paymentReference } from "@/lib/payments";
import { getSupabaseAdmin, type RegistrationRow } from "@/lib/supabase/admin";
import { UUID_RE } from "@/lib/validation";

export const metadata: Metadata = {
  title: "Inschrijving ontvangen",
  robots: { index: false, follow: false },
};

/**
 * Bevestigingspagina na het inschrijven.
 * Let op: deze pagina zet NOOIT iets op "betaald". Alleen de beheerder kan
 * dat doen via /admin, nadat de betaling echt is binnengekomen.
 */
export default async function ConfirmationPage(props: PageProps<"/inschrijving/bevestiging">) {
  const { rid } = await props.searchParams;
  const registrationId = typeof rid === "string" && UUID_RE.test(rid) ? rid : null;
  if (!registrationId) redirect("/");

  let registration: RegistrationRow | null = null;
  let teamNames: string[] = [];
  try {
    registration = await getRegistration(registrationId);
    if (registration) {
      const { data } = await getSupabaseAdmin()
        .from("teams")
        .select("team_name")
        .eq("registration_id", registrationId)
        .order("created_at");
      teamNames = (data ?? []).map((t: { team_name: string }) => t.team_name);
    }
  } catch (err) {
    unstable_rethrow(err);
    console.error("[inschrijving/bevestiging]", err);
  }

  if (!registration) {
    return (
      <StatusShell tone="danger" icon={<AlertIcon className="h-10 w-10" />} title="Inschrijving niet gevonden">
        <p>We konden deze inschrijving niet vinden. Neem contact met ons op via {contact.email}.</p>
        <div className="mt-8 flex justify-center">
          <ButtonLink href="/">Naar de homepage</ButtonLink>
        </div>
      </StatusShell>
    );
  }

  const totalCents = Math.round(Number(registration.total_amount) * 100);
  const isPaid = registration.payment_status === "paid";
  const reference = paymentReference(registration.id);
  const paymentUrl = getPaymentUrl();

  if (isPaid) {
    return (
      <StatusShell tone="success" icon={<CheckIcon className="h-10 w-10" />} title="Je inschrijving is definitief!">
        <p>
          We hebben je betaling van <strong className="text-ink">{formatEuro(totalCents)}</strong> ontvangen. Tot{" "}
          {event.date} bij {event.location}!
        </p>
        <TeamList names={teamNames} />
        <div className="mt-8 flex justify-center">
          <ButtonLink href="/">Terug naar de homepage</ButtonLink>
        </div>
      </StatusShell>
    );
  }

  return (
    <StatusShell tone="success" icon={<CheckIcon className="h-10 w-10" />} title="Je inschrijving is ontvangen!">
      <p>
        Bedankt! We hebben je inschrijving voor {event.name} ontvangen. Rond nu je betaling af.
      </p>

      <TeamList names={teamNames} />

      {/* Te betalen */}
      <div className="mx-auto mt-6 max-w-sm rounded-2xl bg-ink p-6 text-left text-white">
        <div className="flex items-end justify-between gap-4">
          <span className="text-white/70">Te betalen</span>
          <span className="font-display text-4xl font-extrabold text-ball">{formatEuro(totalCents)}</span>
        </div>
        <p className="mt-1 text-sm text-white/60">
          {registration.number_of_teams} team{registration.number_of_teams === 1 ? "" : "s"} ×{" "}
          {formatEuro(totalCents / registration.number_of_teams)}
        </p>
        <div className="mt-4 rounded-xl bg-white/10 px-4 py-3 text-sm">
          Zet in de omschrijving van je betaling:
          <span className="mt-1 block font-mono text-lg font-bold tracking-wider text-white">
            {reference} – {teamNames[0] ?? registration.contact_name}
          </span>
        </div>
      </div>

      {paymentUrl ? (
        <div className="mt-8 flex flex-col items-center gap-3">
          <a
            href={paymentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full bg-ball px-10 py-4 text-lg font-extrabold text-ink shadow-[0_10px_40px_-10px_rgba(215,242,75,0.9)] transition hover:-translate-y-0.5 hover:bg-court hover:text-white"
          >
            Betaal nu
            <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
          <p className="text-sm text-ink/55">De betaallink opent in een nieuw tabblad.</p>
        </div>
      ) : (
        <p className="mx-auto mt-8 max-w-md rounded-xl bg-sand px-4 py-3 text-base">
          De betaallink is nog niet beschikbaar. We sturen je deze zo snel mogelijk per e-mail.
        </p>
      )}

      <div className="mx-auto mt-8 flex max-w-md items-start gap-3 rounded-2xl border border-ink/10 bg-paper p-4 text-left text-base">
        <ClockIcon className="mt-0.5 h-5 w-5 shrink-0 text-court" />
        <p>
          <strong className="text-ink">Let op:</strong> je inschrijving is pas definitief zodra wij je betaling hebben
          ontvangen. We controleren betalingen handmatig; dat kan een paar dagen duren. Vragen? Mail{" "}
          {contact.email}.
        </p>
      </div>
    </StatusShell>
  );
}

function TeamList({ names }: { names: string[] }) {
  if (names.length === 0) return null;
  return (
    <div className="mx-auto mt-8 max-w-sm rounded-2xl bg-sand p-5 text-left">
      <p className="text-sm font-semibold uppercase tracking-wider text-ink/50">Ingeschreven teams</p>
      <ul className="mt-2 space-y-1.5">
        {names.map((name, i) => (
          <li key={`${name}-${i}`} className="flex items-center gap-2 font-semibold text-ink">
            <CheckIcon className="h-4 w-4 text-success" /> {name}
          </li>
        ))}
      </ul>
    </div>
  );
}
