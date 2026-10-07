import type { Metadata } from "next";
import Link from "next/link";
import { event } from "@/config/event";
import { LoginForm, MarkPaidButton, UndoPaidButton } from "@/components/admin/AdminClient";
import { Container } from "@/components/ui/Section";
import { isAdmin } from "@/lib/admin-auth";
import { getAdminPassword, ADMIN_PASSWORD_MIN_LENGTH } from "@/lib/env";
import { formatEuro } from "@/lib/format";
import { LEVELS } from "@/config/registration";
import { paymentReference } from "@/lib/payments";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { logout } from "./actions";

export const metadata: Metadata = {
  title: "Beheer",
  robots: { index: false, follow: false },
};

interface AdminRow {
  id: string;
  contact_name: string;
  email: string;
  phone: string;
  number_of_teams: number;
  total_amount: number | string;
  payment_status: string;
  paid_at: string | null;
  created_at: string;
  teams: { team_name: string; contact_name: string; email: string; extra_fields: Record<string, string> | null }[] | null;
}

const dateFmt = new Intl.DateTimeFormat("nl-NL", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Europe/Amsterdam",
});
const fmtDate = (iso: string | null) => (iso ? dateFmt.format(new Date(iso)) : "—");
const cents = (amount: number | string) => Math.round(Number(amount) * 100);

type Filter = "all" | "pending" | "paid";

export default async function AdminPage(props: PageProps<"/admin">) {
  // ── Niet ingelogd → inlogscherm ───────────────────────────────
  if (!(await isAdmin())) {
    const configured = Boolean(getAdminPassword());
    return (
      <main className="flex flex-1 items-center justify-center px-5 py-16">
        <div className="w-full max-w-sm rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-ink/5">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-court">Beheer</p>
          <h1 className="mt-2 font-display text-3xl font-extrabold">{event.shortName}</h1>
          <p className="mt-2 mb-6 text-ink/60">Alleen voor de organisatie.</p>
          {configured ? (
            <LoginForm />
          ) : (
            <p className="rounded-xl bg-danger/10 p-4 text-sm font-medium text-danger">
              De beheerpagina is uitgeschakeld. Stel in Vercel de environment variable <code>ADMIN_PASSWORD</code> in
              (minimaal {ADMIN_PASSWORD_MIN_LENGTH} tekens) en doe een Redeploy.
            </p>
          )}
        </div>
      </main>
    );
  }

  // ── Ingelogd → overzicht ──────────────────────────────────────
  const { filter: rawFilter } = await props.searchParams;
  const filter: Filter = rawFilter === "pending" || rawFilter === "paid" ? rawFilter : "all";

  const { data, error } = await getSupabaseAdmin()
    .from("registrations")
    .select(
      "id, contact_name, email, phone, number_of_teams, total_amount, payment_status, paid_at, created_at, teams(team_name, contact_name, email, extra_fields, created_at)",
    )
    .order("created_at", { ascending: false })
    .order("created_at", { referencedTable: "teams", ascending: true });

  const all = (data ?? []) as AdminRow[];
  const paid = all.filter((r) => r.payment_status === "paid");
  const pending = all.filter((r) => r.payment_status === "pending");
  const rows = filter === "all" ? all : filter === "paid" ? paid : pending;

  const stats = [
    { label: "Inschrijvingen", value: String(all.length) },
    { label: "Teams (betaald / totaal)", value: `${paid.reduce((n, r) => n + r.number_of_teams, 0)} / ${all.reduce((n, r) => n + r.number_of_teams, 0)}` },
    { label: "Ontvangen", value: formatEuro(paid.reduce((n, r) => n + cents(r.total_amount), 0)) },
    { label: "Nog te ontvangen", value: formatEuro(pending.reduce((n, r) => n + cents(r.total_amount), 0)) },
  ];

  const tabs: { key: Filter; label: string; count: number }[] = [
    { key: "all", label: "Alle", count: all.length },
    { key: "pending", label: "Pending", count: pending.length },
    { key: "paid", label: "Paid", count: paid.length },
  ];

  return (
    <>
      <header className="border-b border-ink/10 bg-white">
        <Container className="flex h-16 items-center justify-between gap-4">
          <p className="font-display text-lg font-extrabold">
            Beheer <span className="font-semibold text-ink/40">· {event.shortName}</span>
          </p>
          <div className="flex items-center gap-4 text-sm font-semibold">
            <a href="/admin/export" className="rounded-full bg-ball px-4 py-2 text-ink hover:bg-ink hover:text-white">
              Download teams (Excel)
            </a>
            <Link href="/" className="hidden text-ink/60 hover:text-ink sm:inline">Website</Link>
            <form action={logout}>
              <button type="submit" className="rounded-full bg-sand px-4 py-2 hover:bg-ink hover:text-white">
                Uitloggen
              </button>
            </form>
          </div>
        </Container>
      </header>

      <main className="flex-1 py-10">
        <Container>
          {error && (
            <p className="mb-6 rounded-xl bg-danger/10 p-4 font-semibold text-danger">
              Kon inschrijvingen niet laden: {error.message}
            </p>
          )}

          <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {stats.map((s) => (
              <li key={s.label} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-ink/5">
                <p className="text-sm text-ink/55">{s.label}</p>
                <p className="mt-1 font-display text-2xl font-extrabold tabular-nums">{s.value}</p>
              </li>
            ))}
          </ul>

          <nav className="mt-8 flex flex-wrap gap-2" aria-label="Filter">
            {tabs.map((t) => (
              <Link
                key={t.key}
                href={t.key === "all" ? "/admin" : `/admin?filter=${t.key}`}
                className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                  filter === t.key ? "bg-ink text-white" : "bg-white text-ink/70 ring-1 ring-ink/10 hover:bg-sand"
                }`}
              >
                {t.label} <span className="ml-1 opacity-60">{t.count}</span>
              </Link>
            ))}
          </nav>

          {rows.length === 0 ? (
            <p className="mt-8 rounded-2xl bg-white p-8 text-center text-ink/55 ring-1 ring-ink/5">
              Nog geen inschrijvingen{filter !== "all" ? ` met status "${filter}"` : ""}.
            </p>
          ) : (
            <ul className="mt-6 space-y-3">
              {rows.map((r) => {
                const isPaid = r.payment_status === "paid";
                const ref = paymentReference(r.id);
                const label = `${ref} · ${r.contact_name} · ${formatEuro(cents(r.total_amount))}`;
                return (
                  <li
                    key={r.id}
                    className={`grid gap-5 rounded-2xl bg-white p-5 shadow-sm ring-1 sm:p-6 lg:grid-cols-[1.2fr_1fr_auto] ${
                      isPaid ? "ring-success/30" : "ring-ink/5"
                    }`}
                  >
                    {/* Contact */}
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <StatusBadge status={r.payment_status} />
                        <span className="font-mono text-xs font-bold tracking-wider text-ink/45">#{ref}</span>
                      </div>
                      <p className="mt-2 font-display text-xl font-bold">{r.contact_name}</p>
                      <p className="mt-1 break-all text-sm">
                        <a href={`mailto:${r.email}`} className="text-court hover:underline">{r.email}</a>
                      </p>
                      <p className="text-sm">
                        <a href={`tel:${r.phone.replace(/[^\d+]/g, "")}`} className="text-ink/70 hover:underline">{r.phone}</a>
                      </p>
                      <p className="mt-2 text-xs text-ink/50">Ingeschreven: {fmtDate(r.created_at)}</p>
                    </div>

                    {/* Teams */}
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-ink/45">
                        {r.number_of_teams} team{r.number_of_teams === 1 ? "" : "s"}
                      </p>
                      <ul className="mt-1.5 space-y-1.5">
                        {(r.teams ?? []).map((t, i) => (
                          <li key={i} className="text-sm">
                            <span className="font-semibold">{t.team_name}</span>
                            {t.extra_fields?.level && (
                              <span className="ml-2 rounded-full bg-sand px-2 py-0.5 text-xs font-bold text-court">
                                {LEVELS.find((l) => l.value === t.extra_fields?.level)?.label ?? t.extra_fields.level}
                              </span>
                            )}
                            <span className="block text-xs text-ink/55">
                              {t.contact_name} · {t.email}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bedrag + actie */}
                    <div className="flex flex-col gap-2 border-t border-ink/10 pt-4 sm:items-end lg:border-0 lg:pt-0 lg:text-right">
                      <p className="font-display text-2xl font-extrabold tabular-nums">{formatEuro(cents(r.total_amount))}</p>
                      {isPaid ? (
                        <>
                          <p className="text-sm text-success">Betaald op {fmtDate(r.paid_at)}</p>
                          <UndoPaidButton id={r.id} label={label} />
                        </>
                      ) : (
                        <>
                          <p className="text-sm text-ink/50">paid_at: —</p>
                          <MarkPaidButton id={r.id} label={label} />
                        </>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </Container>
      </main>
    </>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles =
    status === "paid"
      ? "bg-success text-white"
      : status === "pending"
        ? "bg-amber-100 text-amber-900 ring-1 ring-amber-300"
        : "bg-ink/10 text-ink/60";
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-wider ${styles}`}>
      {status}
    </span>
  );
}
