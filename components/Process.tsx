"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal, Waveform } from "./primitives";

type Step = { label: string; title: string; desc: string; tag?: string };

const STEPS: Step[] = [
  {
    label: "Discovery",
    title: "Start with a real conversation",
    desc: "A quick 30-minute chat to learn how your business handles calls today — and exactly where leads slip through the cracks.",
    tag: "30 min · Free",
  },
  {
    label: "Call mapping",
    title: "Map every call you get",
    desc: "We lay out each kind of call that comes in and decide precisely what should happen on each one, before a single line is built.",
  },
  {
    label: "Build",
    title: "Build your agent from scratch",
    desc: "A voice agent trained around how you actually work — your scripts, your tone, your edge cases. Never a generic template.",
  },
  {
    label: "Testing",
    title: "Test it together, line by line",
    desc: "We run real practice calls and fine-tune the agent until it sounds natural and you're fully confident to go live.",
  },
  {
    label: "Go live",
    title: "Connect your number, switch it on",
    desc: "We wire your agent to your phone number, calendar, and tools — then flip it live and it starts answering for you.",
    tag: "Live in ~7 days",
  },
  {
    label: "Optimize",
    title: "Keep making it sharper",
    desc: "We watch how calls go and keep improving your agent as your business grows. You're never left on your own.",
  },
];

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={dir === "left" ? "rotate-180" : ""}
      aria-hidden
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function Process() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  function updateScrollState() {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft >= max - 1);
  }

  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, []);

  function scrollByCard(dir: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const amount = card ? card.clientWidth + 20 : 360; // +gap-5
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  }

  return (
    <section
      id="how-it-works"
      className="mx-auto max-w-7xl px-5 pt-12 pb-20 md:px-8 md:pt-16 md:pb-28"
    >
      {/* heading + controls */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <Reveal>
            <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-blue uppercase">
              <span className="h-px w-6 bg-blue/50" />
              How it works
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-display text-4xl font-medium tracking-tight text-balance md:text-5xl">
              We do it all for you. <span className="underline-bar">Live in days.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              You don&apos;t get handed a tool and left to figure it out. We do the whole thing —
              learn your business, build your agent, launch it, and keep it sharp over time.
            </p>
          </Reveal>
        </div>

        {/* prev / next — desktop only, touch users swipe */}
        <Reveal delay={0.12} className="hidden shrink-0 gap-2 md:flex">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            disabled={atStart}
            aria-label="Previous step"
            className="grid size-11 place-items-center rounded-full border border-line-bright text-cream transition-colors hover:border-cream disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-line-bright"
          >
            <Arrow dir="left" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            disabled={atEnd}
            aria-label="Next step"
            className="grid size-11 place-items-center rounded-full border border-line-bright text-cream transition-colors hover:border-cream disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-line-bright"
          >
            <Arrow dir="right" />
          </button>
        </Reveal>
      </div>

      {/* carousel */}
      <Reveal delay={0.1} className="mt-12 md:mt-14">
        <div
          ref={trackRef}
          onScroll={updateScrollState}
          className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-5 px-5 pb-2 md:mx-0 md:scroll-px-0 md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {STEPS.map((s, i) => (
            <article
              key={s.title}
              data-card
              className="group relative flex h-[340px] w-[300px] shrink-0 snap-start flex-col overflow-hidden rounded-3xl border border-line bg-ink p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue/40 hover:shadow-md sm:w-[340px]"
            >
              {/* faint ghost number fills the card */}
              <span
                aria-hidden
                className="pointer-events-none absolute -right-3 top-8 font-display text-[8rem] leading-none font-semibold text-cream/[0.035] select-none"
              >
                {i + 1}
              </span>

              {/* top row */}
              <div className="relative flex items-center justify-between">
                <span className="grid size-11 place-items-center rounded-full border border-line-bright bg-surface-2 font-mono text-sm font-semibold text-blue transition-colors duration-300 group-hover:border-blue group-hover:bg-blue group-hover:text-white">
                  0{i + 1}
                </span>
                {s.tag && (
                  <span className="rounded-full border border-line bg-surface px-3 py-1 font-mono text-[9px] tracking-[0.12em] whitespace-nowrap text-faint uppercase">
                    {s.tag}
                  </span>
                )}
              </div>

              {/* body, anchored to the bottom */}
              <div className="relative mt-auto">
                <span className="font-mono text-[11px] tracking-[0.18em] text-blue uppercase">
                  {s.label}
                </span>
                <h3 className="mt-2.5 font-display text-xl font-medium tracking-tight text-balance">
                  {s.title}
                </h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">{s.desc}</p>
                {s.tag && <Waveform className="mt-5 h-3" barClassName="bg-blue/60" />}
              </div>
            </article>
          ))}
        </div>
      </Reveal>

      {/* progress bar */}
      <div className="mt-6 h-px w-full bg-line">
        <div
          className="h-px rounded-full bg-blue transition-[width] duration-150 ease-out"
          style={{ width: `${12 + progress * 88}%` }}
        />
      </div>
    </section>
  );
}
