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
            You don&apos;t get handed a tool and left to figure it out. We do the whole thing —
            learn your business, build your agent, launch it, and keep it sharp over time.
          </p>
        </Reveal>
      </div>

      {/* all six steps, no scrolling */}
      <div className="mt-12 grid gap-4 sm:grid-cols-2 md:mt-14 lg:grid-cols-3">
        {STEPS.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.05}>
            <article className="group relative flex h-full min-h-[256px] flex-col overflow-hidden rounded-3xl border border-line bg-ink p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue/40 hover:shadow-md">
              {/* faint ghost number, tucked into the upper-right corner */}
              <span
                aria-hidden
                className="pointer-events-none absolute -top-3 right-4 font-display text-[6.5rem] leading-none font-semibold text-cream/[0.045] select-none"
              >
                {i + 1}
              </span>

              {/* top row */}
              <div className="relative flex items-center justify-between">
                <span className="grid size-11 place-items-center rounded-full border border-line-bright bg-surface-2 font-mono text-sm font-semibold text-blue transition-colors duration-300 group-hover:border-blue group-hover:bg-blue group-hover:text-white">
                  0{i + 1}
                </span>
                {s.tag && (
                  <span className="relative rounded-full border border-line bg-surface px-3 py-1 font-mono text-[9px] tracking-[0.12em] whitespace-nowrap text-faint uppercase">
                    {s.tag}
                  </span>
                )}
              </div>

              {/* text, top-aligned so every card lines up */}
              <div className="relative mt-9">
                <span className="font-mono text-[11px] tracking-[0.18em] text-blue uppercase">
                  {s.label}
                </span>
                <h3 className="mt-2.5 font-display text-xl font-medium tracking-tight text-balance">
                  {s.title}
                </h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">{s.desc}</p>
              </div>

              {/* voice motif, pinned to the bottom on tagged steps */}
              {s.tag && (
                <Waveform className="relative mt-auto h-3" barClassName="bg-blue/60" />
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
