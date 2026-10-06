-- ════════════════════════════════════════════════════════════════
--  Inschrijvingen + teams voor het evenement
--  Uitvoeren in Supabase: SQL Editor → plak dit bestand → Run
--  (of met de Supabase CLI: `supabase db push`)
-- ════════════════════════════════════════════════════════════════

-- ─── Tabel: registrations ────────────────────────────────────────
create table if not exists public.registrations (
  id                uuid primary key default gen_random_uuid(),
  contact_name      text not null check (char_length(contact_name) between 1 and 100),
  email             text not null check (char_length(email) between 3 and 254),
  phone             text not null check (char_length(phone) between 8 and 20),
  number_of_teams   integer not null check (number_of_teams between 1 and 50),
  total_amount      numeric(10, 2) not null check (total_amount > 0),
  currency          text not null default 'EUR',
  payment_status    text not null default 'pending'
                    check (payment_status in ('pending', 'paid', 'failed', 'canceled', 'expired')),
  mollie_payment_id text unique,
  idempotency_key   uuid unique,       -- voorkomt dubbele inschrijvingen bij dubbel verzenden
  paid_at           timestamptz,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

comment on table public.registrations is 'Eén inschrijving = één betaling (kan meerdere teams bevatten).';

create index if not exists registrations_payment_status_idx on public.registrations (payment_status);
create index if not exists registrations_created_at_idx     on public.registrations (created_at desc);

-- ─── Tabel: teams ────────────────────────────────────────────────
create table if not exists public.teams (
  id              uuid primary key default gen_random_uuid(),
  registration_id uuid not null references public.registrations (id) on delete cascade,
  team_name       text not null check (char_length(team_name) between 1 and 60),
  contact_name    text not null check (char_length(contact_name) between 1 and 100),
  email           text not null check (char_length(email) between 3 and 254),
  extra_fields    jsonb not null default '{}'::jsonb,  -- voor velden die je later toevoegt
  created_at      timestamptz not null default now()
);

create index if not exists teams_registration_id_idx on public.teams (registration_id);

-- ─── updated_at automatisch bijwerken ────────────────────────────
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists registrations_set_updated_at on public.registrations;
create trigger registrations_set_updated_at
  before update on public.registrations
  for each row execute function public.set_updated_at();

-- ─── Beveiliging: persoonsgegevens NIET publiek toegankelijk ─────
-- Row Level Security aan, ZONDER policies: de publishable/anon key
-- kan hierdoor niets lezen of schrijven. Alleen de server (secret key
-- = service_role) heeft toegang.
alter table public.registrations enable row level security;
alter table public.teams         enable row level security;

revoke all on table public.registrations from anon, authenticated;
revoke all on table public.teams         from anon, authenticated;
grant  all on table public.registrations to service_role;
grant  all on table public.teams         to service_role;

-- ─── Functie: inschrijving + teams in één transactie opslaan ─────
create or replace function public.create_registration(
  p_contact_name    text,
  p_email           text,
  p_phone           text,
  p_total_amount    numeric,
  p_idempotency_key uuid,
  p_teams           jsonb
)
returns table (out_registration_id uuid, out_created boolean)
language plpgsql
set search_path = ''
as $$
#variable_conflict use_column
declare
  v_id    uuid;
  v_count integer;
begin
  -- Zelfde verzoek nogmaals verstuurd? Geef de bestaande inschrijving terug.
  select r.id into v_id
  from public.registrations r
  where r.idempotency_key = p_idempotency_key;

  if v_id is not null then
    return query select v_id, false;
    return;
  end if;

  if jsonb_typeof(p_teams) <> 'array' then
    raise exception 'p_teams moet een array zijn';
  end if;

  v_count := jsonb_array_length(p_teams);
  if v_count < 1 then
    raise exception 'Minimaal één team vereist';
  end if;

  begin
    insert into public.registrations
      (contact_name, email, phone, number_of_teams, total_amount, idempotency_key)
    values
      (p_contact_name, p_email, p_phone, v_count, p_total_amount, p_idempotency_key)
    returning id into v_id;
  exception when unique_violation then
    -- Twee gelijktijdige verzoeken met dezelfde sleutel
    select r.id into v_id
    from public.registrations r
    where r.idempotency_key = p_idempotency_key;
    return query select v_id, false;
    return;
  end;

  insert into public.teams (registration_id, team_name, contact_name, email, extra_fields)
  select
    v_id,
    t ->> 'team_name',
    t ->> 'contact_name',
    t ->> 'email',
    coalesce(t -> 'extra_fields', '{}'::jsonb)
  from jsonb_array_elements(p_teams) as t;

  return query select v_id, true;
end;
$$;

revoke execute on function public.create_registration(text, text, text, numeric, uuid, jsonb)
  from public, anon, authenticated;
grant execute on function public.create_registration(text, text, text, numeric, uuid, jsonb)
  to service_role;

revoke execute on function public.set_updated_at() from public, anon, authenticated;

-- ─── Handig overzicht voor de organisatie (alleen via dashboard) ─
create or replace view public.paid_teams
with (security_invoker = true) as
select
  t.team_name,
  t.contact_name  as team_contact,
  t.email         as team_email,
  r.contact_name  as registered_by,
  r.email         as registration_email,
  r.phone,
  r.paid_at
from public.teams t
join public.registrations r on r.id = t.registration_id
where r.payment_status = 'paid'
order by r.paid_at;

revoke all on public.paid_teams from anon, authenticated;
grant select on public.paid_teams to service_role;
