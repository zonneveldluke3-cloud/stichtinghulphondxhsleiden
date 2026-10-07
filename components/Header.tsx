import Link from "next/link";
import { event } from "@/config/event";
import { Container } from "@/components/ui/Section";

const nav = [
  { href: "/#over", label: "Over" },
  { href: "/#hoe-werkt-het", label: "Hoe werkt het" },
  { href: "/#niveaus", label: "Niveaus" },
  { href: "/#info", label: "Info" },
  { href: "/#faq", label: "FAQ" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/#doneren", label: "Doneren" },
  { href: "/#contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/5 bg-paper/85 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 font-display text-lg font-extrabold tracking-tight text-ink">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-ball shadow-[inset_-3px_-3px_0_rgba(0,0,0,0.12)]" aria-hidden>
            <span className="h-5 w-5 rounded-full border-2 border-white/80 border-l-transparent border-b-transparent rotate-45" />
          </span>
          <span className="truncate">{event.shortName}</span>
        </Link>

        <nav aria-label="Hoofdmenu" className="hidden items-center gap-7 text-[15px] font-medium text-ink/70 lg:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/#inschrijven"
          className="shrink-0 rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white transition hover:bg-court focus-visible:outline-offset-2"
        >
          Inschrijven
        </Link>
      </Container>
    </header>
  );
}
