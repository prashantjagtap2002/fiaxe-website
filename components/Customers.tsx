"use client";

import { Reveal, Kicker } from "./primitives";

export const CLIENTS = [
  "Volkswagen",
  "Tata Consumer Products",
  "Pfizer",
  "JioHotstar",
  "Publicis Media",
  "Schbang",
  "Gozoop",
  "SoCheers",
  "Tonic Worldwide",
  "MX Player",
  "The Belgian Waffle Co",
  "Aquant",
  "indē wild",
  "IIDE",
  "Deepak Group",
];

export function Customers() {
  return (
    <section className="mx-auto max-w-7xl px-5 pt-16 pb-4 md:px-8 md:pt-24">
      <Reveal>
        <div className="flex items-center justify-between gap-4">
          <Kicker label="Customers" />
          <span className="hidden font-mono text-[10px] tracking-[0.16em] text-faint uppercase md:block">
            Trusted by teams at
          </span>
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="relative mt-10 flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex shrink-0 animate-marquee items-center gap-14 pr-14">
            {[...CLIENTS, ...CLIENTS].map((name, i) => (
              <span key={`${name}-${i}`} className="flex items-center gap-14 whitespace-nowrap">
                <span className="font-display text-xl font-medium tracking-tight text-faint transition-colors hover:text-cream">
                  {name}
                </span>
                <span className="size-1 rounded-full bg-line-bright" />
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
