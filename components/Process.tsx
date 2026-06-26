"use client";

import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { Reveal, Waveform } from "./primitives";

type Step = { label: string; title: string; desc: string; tag?: string };

const STEPS: Step[] = [
  {
    label: "Discovery",
    title: "Start with a real conversation",
    desc: "A quick 30-minute chat to learn how your business handles calls today, and exactly where leads slip through the cracks.",
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
    desc: "A voice agent trained around how you actually work: your scripts, your tone, your edge cases. Never a generic template.",
  },
  {
    label: "Testing",
    title: "Test it together, line by line",
    desc: "We run real practice calls and fine-tune the agent until it sounds natural and you're fully confident to go live.",
  },
  {
    label: "Go live",
    title: "Connect your number, switch it on",
    desc: "We wire your agent to your phone number, calendar, and tools, then flip it live and it starts answering for you.",
    tag: "Live in ~7 days",
  },
  {
    label: "Optimize",
    title: "Keep making it sharper",
    desc: "We watch how calls go and keep improving your agent as your business grows. You're never left on your own.",
  },
];

/* A process card with a soft accent glow that tracks the cursor, layered
   under the existing hover-lift. Pure decoration — invisible without hover,
   so touch devices simply never see it. */
function StepCard({ step, index }: { step: Step; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const glow = useMotionTemplate`radial-gradient(280px circle at ${x}px ${y}px, color-mix(in oklab, var(--blue) 14%, transparent), transparent 72%)`;

  function onMove(e: React.MouseEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  }

  return (
    <article
      onMouseMove={onMove}
      className="relative flex flex-1 flex-col overflow-hidden rounded-3xl border border-line bg-ink p-6 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-blue/40 group-hover:shadow-md"
    >
      {/* cursor-tracking spotlight, faded in only while hovering */}
      <motion.span
        aria-hidden
        style={{ background: glow }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* faint ghost number, tucked into the upper-right corner */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-4 right-3 font-display text-[5.5rem] leading-none font-semibold text-cream/[0.045] transition-colors duration-300 select-none group-hover:text-blue/10"
      >
        {index + 1}
      </span>

      <span className="relative font-mono text-[11px] tracking-[0.18em] text-blue uppercase">
        {step.label}
      </span>

      <h3 className="relative mt-3 font-display text-lg font-medium tracking-tight text-balance">
        {step.title}
      </h3>
      <p className="relative mt-2.5 text-[13px] leading-relaxed text-muted">{step.desc}</p>

      {/* voice motif, pinned to the bottom on tagged steps */}
      {step.tag && (
        <Waveform className="relative mt-auto h-3 pt-4" barClassName="bg-blue/60" />
      )}
    </article>
  );
}

export function Process() {
  return (
    <section
      id="how-it-works"
      className="mx-auto max-w-7xl px-5 pt-12 pb-20 md:px-8 md:pt-16 md:pb-28"
    >
      {/* heading */}
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
            You don&apos;t get handed a tool and left to figure it out. We do the whole thing:
            learn your business, build your agent, launch it, and keep it sharp over time.
          </p>
        </Reveal>
      </div>

      {/* scroll hint, only meaningful while the row overflows (below lg) */}
      <Reveal delay={0.12}>
        <span className="mt-10 mb-5 hidden font-mono text-[10px] tracking-[0.16em] text-faint uppercase max-lg:inline-flex md:mt-12">
          ← Swipe through the steps →
        </span>
      </Reveal>

      {/* one horizontal row of step cards: all six sit in a single row on lg;
          below that the row scrolls horizontally (snap), so it never folds
          back into a grid. */}
      <ol className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pt-2 pb-3 max-lg:mt-0 md:-mx-8 md:px-8 lg:mx-0 lg:mt-14 lg:grid lg:grid-cols-6 lg:overflow-visible lg:px-0">
        {STEPS.map((s, i) => (
          <Reveal
            key={s.title}
            delay={i * 0.05}
            className="flex w-[80%] shrink-0 snap-start flex-col sm:w-[46%] md:w-[31.5%] lg:w-auto"
          >
            <li className="group relative flex flex-1 list-none flex-col">
              {/* the card, kept in the format you liked */}
              <StepCard step={s} index={i} />
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
