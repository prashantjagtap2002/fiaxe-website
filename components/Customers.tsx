"use client";

import { Reveal, Kicker } from "./primitives";

export const CLIENTS = [
  { name: "Mahindra", domain: "mahindra.com" },
  { name: "MG", domain: "mgmotor.co.in" },
  { name: "Audi", domain: "audi.com" },
  { name: "Thinkarz", domain: "thinkarz.com" },
  { name: "Hyundai", domain: "hyundai.com" },
  { name: "Volkswagen", domain: "volkswagen.com" },
  { name: "Tata Consumer Products", domain: "tataconsumer.com" },
  { name: "Pfizer", domain: "pfizer.com" },
  { name: "JioHotstar", domain: "hotstar.com" },
  { name: "Publicis Media", domain: "publicismedia.com" },
  { name: "Schbang", domain: "schbang.com" },
  { name: "Gozoop", domain: "gozoop.com" },
  { name: "SoCheers", domain: "socheers.net" },
  { name: "Tonic Worldwide", domain: "tonicworldwide.com" },
  { name: "MX Player", domain: "mxplayer.in" },
  { name: "The Belgian Waffle Co", domain: "thebelgianwaffle.co" },
  { name: "Aquant", domain: "aquantindia.com" },
  { name: "indē wild", domain: "indewild.com" },
  { name: "IIDE", domain: "iide.co" },
  { name: "Deepak Group", domain: "deepakgroup.com" },
];

export function Customers() {
  return (
    <section className="mx-auto max-w-7xl px-5 pt-16 pb-4 md:px-8 md:pt-24">
      <Reveal>
        <div className="flex items-center justify-between gap-4">
          <Kicker label="Customers" />
          <span className="hidden font-mono text-[10px] font-semibold tracking-[0.16em] text-cream/70 uppercase md:block">
            Trusted by teams at
          </span>
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="relative mt-10 flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex shrink-0 animate-marquee items-center gap-14 pr-14">
            {[...CLIENTS, ...CLIENTS].map((client, i) => (
              <span key={`${client.name}-${i}`} className="flex items-center gap-14 whitespace-nowrap">
                <span className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`https://www.google.com/s2/favicons?domain=${client.domain}&sz=128`} alt={client.name} className="h-6 w-6 rounded-md object-contain grayscale transition-all hover:grayscale-0 opacity-85 hover:opacity-100" />
                  <span className="font-display text-xl font-semibold tracking-tight text-cream/85 transition-colors hover:text-cream">
                    {client.name}
                  </span>
                </span>
                <span className="size-1 rounded-full bg-cream/40" />
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
