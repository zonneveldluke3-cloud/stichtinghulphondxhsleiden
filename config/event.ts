/**
 * ─────────────────────────────────────────────────────────────
 *  EVENEMENTGEGEVENS: pas hier alle teksten en details aan.
 * ─────────────────────────────────────────────────────────────
 * Alles tussen [vierkante haken] is een placeholder die je nog
 * moet invullen. Je hoeft voor tekstwijzigingen géén componenten
 * aan te passen.
 */

export const event = {
  name: "Smash voor Hulphond",
  shortName: "Smash voor Hulphond",
  /** Het label in het gele balkje bovenaan */
  label: "Padeltoernooi · Laren",
  tagline:
    "Sport, gezelligheid en een goed doel. Speel mee met een vriend, collega of familielid en sluit af met een borrel en veiling.",
  date: "Vrijdag 30 oktober 2026",
  dateShort: "30 okt 2026",
  location: "Padel Club Laren",
  address: "Schuilkerkpad 2, 1251 SC Laren",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Padel+Club+Laren+Schuilkerkpad+2+1251+SC+Laren",
  startTime: "Namiddag & avond",
  /** Maximaal aantal spelers (op de flyer: 48) */
  maxPlayers: 48,
  playersPerTeam: "2 spelers",
  registrationDeadline: "[Inschrijfdeadline, bijv. 23 oktober 2026]",
  goodCause: "Stichting Hulphond",
  /** Adres van de website (wordt gebruikt bij delen) */
  siteUrl: "https://stichtinghulphondxhsleiden.vercel.app",
} as const;

export const about = {
  title: "Sport, gezelligheid en een goed doel",
  paragraphs: [
    "Op vrijdag 30 oktober is Padel Club Laren het speelveld voor iedereen in de regio die van sport houdt. Doe mee met een vriend, je partner, een collega of je buurman. Ervaren of net begonnen, iedereen is welkom. Teams van twee spelen om de eer en om een mooi bedrag voor Stichting Hulphond.",
    "Je speelt in poules van vier teams: iedereen speelt tegen iedereen, in korte wedstrijden van 15 minuten. Niemand ligt er dus na één potje uit. Na afloop sluiten we af met een borrel, de prijsuitreiking en een veiling met leuke prijzen.",
  ],
  highlights: [
    { title: "Poulefase", text: "Iedereen speelt meerdere wedstrijden. Niemand ligt er na één potje uit." },
    { title: "Borrel & prijzen", text: "Afsluiten met een drankje, prijsuitreiking en veiling." },
    { title: "100% goed doel", text: "De volledige opbrengst gaat naar Stichting Hulphond." },
  ],
} as const;

export const organisation = {
  title: "Wie zijn wij?",
  /**
   * Logo van Hogeschool Leiden. Zet het bestand in /public/logos/ (bijv. hsleiden.png)
   * en vul hieronder de afmetingen in pixels in. Zolang dit null is, staat er een tijdelijk blok.
   */
  schoolLogo: null as null | { src: string; alt: string; width: number; height: number },
  /** Korte intro zoals op de flyer. { bold: "..." } wordt dikgedrukt. */
  story: [
    "Wij zijn vijf eerstejaarsstudenten ",
    { bold: "Commerciële Economie aan de Hogeschool Leiden" },
    " en organiseren dit toernooi samen met ",
    { bold: "Stichting Hulphond" },
    ". De opbrengst gaat naar de stichting, die hulphonden opleidt voor mensen met een beperking.",
  ] as (string | { bold: string })[],
  /** De blokken onder de intro. */
  blocks: [
    {
      title: "Ons salesproject",
      text: "Voor school zetten we een paar weken lang ons eigen kleine bedrijf op. We beginnen zonder startkapitaal en proberen in korte tijd zoveel mogelijk geld op te halen voor een goed doel. Dit padeltoernooi is daar een belangrijk onderdeel van.",
    },
    {
      title: "Waarom Stichting Hulphond?",
      text: "Een hulphond maakt een enorm verschil voor iemand met een beperking. Zo'n hond helpt bij dagelijkse dingen en geeft een stuk zelfstandigheid terug. Het opleiden van een hulphond kost veel tijd en geld. Daar willen wij aan bijdragen.",
    },
    {
      title: "Ons doel",
      text: "We willen minimaal €3.000 ophalen voor Stichting Hulphond. Alles wat dit toernooi oplevert gaat naar de stichting. Ook met een donatie of door de website te delen help je ons al een stuk verder.",
    },
  ],
} as const;

export const contact = {
  email: "hulphond.studenthsleiden@outlook.com",
  phone: "06 30131167",
  phoneHref: "tel:+31630131167",
  socials: [
    { name: "Instagram", href: "https://www.instagram.com/krachtop4poten", handle: "@krachtop4poten" },
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
  { name: "Padel Club Laren", tier: "partner", logo: null, url: "https://padelclublaren.nl" },
  { name: "Printpunt Huizen", tier: "sponsor", logo: "/sponsors/printpunt-huizen.png", url: "https://www.printpunthuizen.nl" },
  // { name: "Voorbeeld B.V.", tier: "hoofdsponsor", logo: "/sponsors/voorbeeld.png", url: "https://voorbeeld.nl" },
];


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
    a: "Een team bestaat uit 2 spelers. Met wie je speelt kies je zelf: een vriend, familielid, partner of collega.",
  },
  {
    q: "Kan ik meerdere teams inschrijven?",
    a: "Ja. Kies in het inschrijfformulier het aantal teams (maximaal drie per inschrijving). Voor elk team vul je een teamnaam en een contactpersoon in. Je betaalt alles in één keer.",
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
