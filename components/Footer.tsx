import Link from "next/link";
import { event } from "@/config/event";
import { Container } from "@/components/ui/Section";

export function Footer() {
  return (
    <footer className="bg-ink text-white/70">
      <Container className="flex flex-col gap-8 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-xl font-extrabold text-white">{event.shortName}</p>
          <p className="mt-1 text-sm">
            {event.dateShort} · {event.location} · ten bate van {event.goodCause}
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-7 gap-y-3 text-sm font-medium">
          <Link href="/privacy" className="hover:text-ball">Privacyverklaring</Link>
          <Link href="/voorwaarden" className="hover:text-ball">Deelnamevoorwaarden</Link>
          <Link href="/#contact" className="hover:text-ball">Contact</Link>
        </nav>
      </Container>
      <Container className="border-t border-white/10 py-6 text-xs text-white/45">
        © {new Date().getFullYear()} {event.name}.
      </Container>
    </footer>
  );
}
