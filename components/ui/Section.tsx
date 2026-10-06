import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Eyebrow({
  children,
  className = "",
  light = false,
}: {
  children: ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <p
      className={`mb-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] ${light ? "text-white/80" : "text-court"} ${className}`}
    >
      <span className="h-2 w-2 rounded-full bg-ball ring-2 ring-court/20" aria-hidden />
      {children}
    </p>
  );
}

export function SectionTitle({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h2
      className={`font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl ${className}`}
    >
      {children}
    </h2>
  );
}
