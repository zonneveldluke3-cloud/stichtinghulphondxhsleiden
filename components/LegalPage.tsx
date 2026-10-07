import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Section";
import { legal } from "@/config/event";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1 py-16 sm:py-24">
        <Container className="max-w-3xl">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">{title}</h1>
          <p className="mt-3 text-ink/55">Laatst bijgewerkt: {legal.lastUpdated}</p>
          <div className="legal mt-10 space-y-8 text-[17px] leading-relaxed text-ink/80 [&_h2]:mb-3 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-ink [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-1.5">
            {children}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
