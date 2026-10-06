# Padeltoernooi voor Hulphond – inschrijfwebsite

Landingspagina waarop bezoekers één of meerdere teams inschrijven (€60 per team) en daarna betalen via een **externe betaallink** (bijv. een Tikkie of betaalverzoek van je bank). De organisator bevestigt betalingen handmatig op een beveiligde beheerpagina (`/admin`).

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Supabase · Vercel

---

## Hoe het werkt

```
1. Bezoeker vult het formulier in (1–3 teams)
2. Server controleert alles en rekent zelf het bedrag uit (aantal teams × €60)
3. Inschrijving + teams worden opgeslagen in Supabase  → payment_status = "pending"
4. Bezoeker ziet de bevestigingspagina:
     - inschrijving ontvangen
     - totaalbedrag + betaalkenmerk
     - knop "Betaal nu" (opent PAYMENT_URL in een nieuw tabblad)
     - "pas definitief nadat de betaling is ontvangen"
5. Jij ziet de betaling binnenkomen op je rekening
6. Jij logt in op /admin en klikt "Markeer als betaald"
     → payment_status = "paid", paid_at = nu
```

De website zet een inschrijving **nooit zelf** op "paid". Klikken op "Betaal nu", terugkomen of de bevestigingspagina openen verandert niets aan de status.

---

## Environment variables

| Naam | Waar te vinden | Geheim? |
| ---- | -------------- | ------- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → knop **Connect** bovenaan je project → *Project URL* (begint met `https://` en eindigt op `.supabase.co`) | nee |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase → **Project Settings** → **API Keys** → *Publishable key* (`sb_publishable_…`) | nee |
| `SUPABASE_SECRET_KEY` | Supabase → **Project Settings** → **API Keys** → *Secret keys* (`sb_secret_…`) | **ja** |
| `PAYMENT_URL` | Je eigen betaallink (Tikkie / bank-app), begint met `https://` | nee |
| `ADMIN_PASSWORD` | Zelf verzinnen, minimaal 12 tekens | **ja** |

Zie ook `.env.example`. Echte waarden horen **alleen** in Vercel (of lokaal in `.env.local`, dat niet naar GitHub gaat).

> Oudere Supabase-projecten tonen soms nog "anon" en "service_role" keys. Die werken ook: anon → publishable, service_role → secret.

Na het wijzigen van een environment variable in Vercel: **Deployments → ⋯ → Redeploy**.

---

## Database (Supabase)

Gebruik `supabase/migrations/20261005000000_create_registrations.sql` (eenmalig uitvoeren in **SQL Editor**). Heb je die al uitgevoerd? Dan hoef je **niets** opnieuw te doen.

- Tabellen `registrations` en `teams` (gekoppeld via `registration_id`).
- Row Level Security staat aan zonder policies, en rechten voor `anon`/`authenticated` zijn ingetrokken → met de publishable key kan niemand iets lezen of wijzigen.
- Alleen de server (secret key) mag lezen/schrijven.
- De kolommen `mollie_payment_id` en `idempotency_key`: de eerste wordt niet meer gebruikt (mag blijven staan), de tweede voorkomt dubbele inschrijvingen bij dubbel klikken.

---

## Beheerpagina `/admin`

- Open `https://<jouw-site>/admin` en log in met `ADMIN_PASSWORD`.
- Beveiliging: wachtwoord-check op de server, ondertekend sessie-cookie (httpOnly, secure, sameSite=strict, 8 uur geldig), max. 5 inlogpogingen per 15 minuten, en **iedere** beheeractie controleert de sessie opnieuw op de server.
- "Markeer als betaald" vraagt eerst om bevestiging. Per ongeluk geklikt? Gebruik "Ongedaan maken".
- Wachtwoord veranderen = in Vercel `ADMIN_PASSWORD` aanpassen + Redeploy. Iedereen die ingelogd was, is dan direct uitgelogd.

---

## Mappenstructuur (belangrijkste)

```
app/
  page.tsx                         Landingspagina
  api/registrations/route.ts       Inschrijving opslaan (server)
  inschrijving/bevestiging/        Bevestigingspagina met "Betaal nu"
  admin/page.tsx + actions.ts      Beheerpagina + server-acties
  privacy/, voorwaarden/           Juridische pagina's (sjabloon)
components/                        Secties, formulier, admin-knoppen
config/event.ts                    ★ Alle teksten (datum, locatie, FAQ, contact…)
config/registration.ts             ★ Prijs per team, min/max teams, formuliervelden
lib/admin-auth.ts                  Beveiliging van /admin
lib/env.ts                         Environment variables
supabase/migrations/               SQL
```

## Lokaal draaien (optioneel)

```bash
npm install
cp .env.example .env.local   # vul je waarden in
npm run dev                  # http://localhost:3000
npm run build                # controleren of alles bouwt
```
