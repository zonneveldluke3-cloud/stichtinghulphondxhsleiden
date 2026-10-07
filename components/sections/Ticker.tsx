import { event } from "@/config/event";

/** Schuivende band met de belangrijkste info. */
export function Ticker() {
  const items = [
    event.date,
    event.location,
    event.startTime,
    "Voor iedereen",
    "Alle niveaus",
    `Voor ${event.goodCause}`,
    "Borrel & veiling",
  ];
  const row = (
    <ul className="flex shrink-0 items-center gap-8 pr-8">
      {items.map((t) => (
        <li key={t} className="flex items-center gap-8 whitespace-nowrap">
          <span>{t}</span>
          <span className="h-3 w-3 rounded-full bg-sky" aria-hidden />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="relative z-0 my-6 -rotate-1 overflow-hidden bg-ball py-4 sm:my-10">
      <div className="ticker flex w-max font-display text-xl font-extrabold uppercase tracking-wide text-ink sm:text-2xl">
        {row}
        <div aria-hidden className="flex">{row}</div>
      </div>
    </div>
  );
}
