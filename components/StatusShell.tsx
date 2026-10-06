import Link from "next/link";
import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Section";

export function StatusShell({
  tone,
  icon,
  title,
  children,
}: {
  tone: "success" | "danger" | "pending";
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  const toneClass =
    tone === "success" ? "bg-ball text-ink" : tone === "danger" ? "bg-danger/10 text-danger" : "bg-court/10 text-court";

  return (
    <>
      <Header />
      <main className="flex-1 py-16 sm:py-24">
        <Container className="max-w-2xl">
          <div className="animate-pop rounded-[2rem] bg-white p-8 text-center shadow-sm ring-1 ring-ink/5 sm:p-12">
            <span className={`mx-auto grid h-20 w-20 place-items-center rounded-full ${toneClass}`}>{icon}</span>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">{title}</h1>
            <div className="mt-5 text-lg leading-relaxed text-ink/70">{children}</div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export function ButtonLink({ href, children, variant = "primary" }: { href: string; children: ReactNode; variant?: "primary" | "ghost" }) {
  return (
    <Link
      href={href}
      className={
        variant === "primary"
          ? "inline-flex items-center justify-center rounded-full bg-ink px-7 py-3.5 font-bold text-white transition hover:bg-court"
          : "inline-flex items-center justify-center rounded-full px-7 py-3.5 font-bold text-ink ring-1 ring-ink/15 transition hover:bg-sand"
      }
    >
      {children}
    </Link>
  );
}
