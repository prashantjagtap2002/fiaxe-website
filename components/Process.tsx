import { Reveal, Kicker } from "./primitives";

type Step = { title: string; desc: string; tag?: string };

const STEPS: Step[] = [
  {
    title: "We get on a call",
    desc: "A quick chat to understand how your business handles calls today, and where you're losing time or missing leads.",
    tag: "30 min · Free",
  },
  {
    title: "We map your calls",
    desc: "We list out every kind of call you get and exactly what should happen on each one.",
  },
  {
    title: "We build your agent",
    desc: "We build and train your voice agent from scratch, around the way you actually work, never a generic template.",
  },
  {
    title: "We test it with you",
    desc: "We run practice calls and fine-tune everything until it sounds right and you're happy to go live.",
  },
  {
    title: "We go live",
    desc: "We connect your agent to your phone number, calendar, and tools, then switch it on.",
    tag: "Avg. 7 days from start",
  },
  {
    title: "We keep improving it",
    desc: "We watch how your calls go and keep making your agent better as your business grows.",
  },
];

export function Process() {
  return (
    <section id="how-it-works" className="mx-auto max-w-7xl px-5 pt-24 pb-12 md:px-8 md:pt-32 md:pb-16">
      <Reveal>
        <Kicker label="How It Works" />
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className="mt-6 max-w-xl font-display text-4xl font-medium tracking-tight text-balance md:text-5xl">
          We do it all for you. <span className="underline-bar">Live in days.</span>
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
          You don&apos;t get handed a tool and left to figure it out. We do the whole thing:
          learning your business, building your agent, launching it, and improving it over time.
        </p>
      </Reveal>

      {/* horizontal timeline */}
      <div className="relative mt-16">
        {/* one clean spine running between the first and last step numbers (desktop) */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-6 left-6 right-[calc(100%/6-44px)] hidden h-px bg-line-bright lg:block"
        />
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-6">
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <div className="group flex h-full flex-col">
                <span className="relative z-10 grid size-12 place-items-center rounded-full border border-line-bright bg-canvas font-mono text-sm font-medium text-blue shadow-sm transition-all duration-300 group-hover:border-blue group-hover:bg-blue group-hover:text-white">
                  0{i + 1}
                </span>
                <h3 className="mt-6 font-display text-base font-medium leading-snug tracking-tight lg:min-h-[2.75rem]">
                  {s.title}
                </h3>
                <p className="mt-2.5 text-[13px] leading-relaxed text-muted">{s.desc}</p>
                {s.tag && (
                  <span className="mt-4">
                    <span className="inline-block rounded-full border border-line px-3 py-1 font-mono text-[9px] tracking-[0.1em] whitespace-nowrap text-faint uppercase">
                      {s.tag}
                    </span>
                  </span>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
