/**
 * ─────────────────────────────────────────────────────────────
 *  EVENEMENTGEGEVENS — pas hier alle teksten en details aan.
 * ─────────────────────────────────────────────────────────────
 * Alles tussen [vierkante haken] is een placeholder die je nog
 * moet invullen. Je hoeft voor tekstwijzigingen géén componenten
 * aan te passen.
 */

export const event = {
  name: "Padeltoernooi voor Hulphond",
  shortName: "Padel voor Hulphond",
  tagline:
    "Een middag vol padel, fanatieke potjes en een gezellige borrel — en alles voor het goede doel.",
  date: "Vrijdag 30 oktober 2026",
  dateShort: "30 okt 2026",
  location: "Padel Club Laren",
  address: "Schuilkerkpad 2, 1251 SC Laren",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Padel+Club+Laren+Schuilkerkpad+2+1251+SC+Laren",
  startTime: "[Aanvangstijd, bijv. 16:00]",
  playersPerTeam: "2 spelers",
  registrationDeadline: "[Inschrijfdeadline, bijv. 23 oktober 2026]",
  goodCause: "Stichting Hulphond",
} as const;

export const about = {
  title: "Padel met een missie",
  paragraphs: [
    "[Voorbeeldtekst] Op 30 oktober verandert Padel Club Laren in hét speelveld voor ondernemers, collega's en vrienden uit de regio. In korte, snelle wedstrijden strijden teams van twee om de eer — en om een mooi bedrag voor Stichting Hulphond.",
    "[Voorbeeldtekst] Je speelt in poules, waardoor iedereen meerdere wedstrijden speelt. Geen ervaring? Geen probleem: plezier staat voorop. Na het toernooi sluiten we af met een borrel, de prijsuitreiking en een veiling.",
  ],
  highlights: [
    { title: "Poulefase", text: "Iedereen speelt meerdere wedstrijden — niemand ligt er na één potje uit." },
    { title: "Borrel & prijzen", text: "Afsluiten met een drankje, prijsuitreiking en veiling." },
    { title: "100% goed doel", text: "De volledige opbrengst gaat naar Stichting Hulphond." },
  ],
} as const;

export const organisation = {
  title: "Wie zijn wij?",
  /** Vervang door een echte foto: zet bijv. /public/organisatie.jpg neer en vul het pad hieronder in. */
  photo: null as null | { src: string; alt: string },
  whoWeAre:
    "[Voorbeeldtekst] Wij zijn een team van vijf eerstejaars studenten Commerciële Economie aan Hogeschool Leiden. Samen met Stichting Hulphond organiseren we dit toernooi.",
  why:
    "[Voorbeeldtekst] Hulphonden maken een enorm verschil in het leven van mensen met een beperking. De opleiding van één hulphond kost veel tijd en geld — daar willen we aan bijdragen.",
  goal:
    "[Voorbeeldtekst] Ons doel is om een zo hoog mogelijk bedrag op te halen voor Stichting Hulphond én om ondernemers uit de regio op een sportieve manier met elkaar te verbinden.",
} as const;

export const contact = {
  email: "hulphond.studenthsleiden@outlook.com",
  phone: "06 30131167",
  phoneHref: "tel:+31630131167",
  socials: [
    { name: "Instagram", href: "#", handle: "[@jouwaccount]" },
    { name: "LinkedIn", href: "#", handle: "[Jouw pagina]" },
    { name: "TikTok", href: "#", handle: "[@jouwaccount]" },
  ],
} as const;

/** Doneren zonder mee te doen. */
export const donation = {
  url: "https://tikkie.me/pay/k3va51u9kcooii8h66u7",
  title: "Niet meespelen, wel steunen?",
  text: "Ook zonder racket kun je Stichting Hulphond helpen. Elke euro gaat naar de opleiding van hulphonden.",
  button: "Doneer nu",
} as const;

/**
 * Sponsors. Voeg een bedrijf toe als { name, logo, url }.
 * logo: zet het logobestand in /public/sponsors/ en vul bijv. "/sponsors/bedrijf.png" in (of null).
 * tier: "hoofdsponsor" | "partner" | "sponsor"
 */
export type Sponsor = {
  name: string;
  tier: "hoofdsponsor" | "partner" | "sponsor";
  logo: string | null;
  url: string | null;
};

export const sponsors: Sponsor[] = [
  // { name: "Voorbeeld B.V.", tier: "hoofdsponsor", logo: "/sponsors/voorbeeld.png", url: "https://voorbeeld.nl" },
];

export const sponsorPackages = [
  { name: "Baansponsor", price: "€250", text: "Jouw naam en logo bij een van de banen en op deze website." },
  { name: "Event partner", price: "€750", text: "Zichtbaar tijdens het hele toernooi, op de website en in onze communicatie." },
  { name: "Hoofdsponsor", price: "€1.000", text: "De grootste zichtbaarheid: overal als hoofdsponsor vermeld, inclusief kaarten voor het event." },
] as const;

/** Gegevens voor de privacyverklaring en deelnamevoorwaarden. */
export const legal = {
  organiserName: "[Naam organisatie / projectgroep]",
  organiserAddress: "[Adres]",
  kvk: "[KvK-nummer, indien van toepassing]",
  privacyEmail: "hulphond.studenthsleiden@outlook.com",
  retentionPeriod: "[bijv. 3 maanden na afloop van het evenement]",
  lastUpdated: "[datum]",
} as const;

export const faq = [
  {
    q: "Hoeveel kost deelname?",
    a: "Deelname kost €60 per team. Na het inschrijven krijg je direct een betaallink (bijvoorbeeld een Tikkie) om het bedrag te betalen.",
  },
  {
    q: "Hoeveel spelers mogen in een team?",
    a: "Een team bestaat uit 2 spelers. Je hoeft geen collega's te zijn: vrienden, familie of zakenpartners mag ook.",
  },
  {
    q: "Kan ik meerdere teams inschrijven?",
    a: "Ja! Kies in het inschrijfformulier het aantal teams. Voor elk team vul je een teamnaam en een contactpersoon in. Je betaalt alles in één keer.",
  },
  {
    q: "Hoe werkt de betaling?",
    a: "Na het inschrijven zie je het totaalbedrag en een knop „Betaal nu”. Die opent een betaallink (bijvoorbeeld een Tikkie) waarmee je via je eigen bank betaalt. Zet de code die je op de bevestigingspagina ziet in de omschrijving, zodat wij je betaling kunnen koppelen.",
  },
  {
    q: "Wat gebeurt er nadat ik betaald heb?",
    a: "Wij controleren de betalingen zelf. Zodra we jouw betaling hebben ontvangen, is je inschrijving definitief. Vlak voor het toernooi ontvang je per e-mail het speelschema en de laatste praktische informatie.",
  },
  {
    q: "Kan ik mijn inschrijving annuleren?",
    a: "[Placeholder] Annuleren kan tot [datum] via een e-mail naar ons. Omdat de opbrengst naar het goede doel gaat, wordt het inschrijfgeld in principe niet terugbetaald. Je mag je plek wel overdragen aan een ander team. Zie ook de deelnamevoorwaarden.",
  },
] as const;
