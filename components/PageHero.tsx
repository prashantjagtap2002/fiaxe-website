import type { ReactNode } from "react";
import { Reveal, Kicker } from "./primitives";

/* Top-of-page header for the dedicated routes, clears the fixed nav. */
export function PageHero({
  label,
  title,
  copy,
}: {
  index?: string;
  label: string;
  title: ReactNode;
  copy?: string;
}) {
  return (
    <section className="relative pt-32 pb-4 md:pt-40">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <Kicker label={label} />
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-7 max-w-4xl font-display text-5xl font-medium leading-[1.05] tracking-tight text-balance md:mt-9 md:text-[4rem]">
            {title}
          </h1>
        </Reveal>
        {copy && (
          <Reveal delay={0.14}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted text-pretty">{copy}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
