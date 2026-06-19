"use client";

import { CountUp, Reveal, SectionHeading } from "./primitives";

/* Outcome proof, moved here from the former homepage Results section so all
   customer proof lives on one page. (Generic market-size stats were dropped;
   these are the outcomes customers actually see.) */

const OUTCOMES: { value: number; prefix?: string; suffix: string; label: string; desc: string }[] = [
  {
    value: 340,
    prefix: "+",
    suffix: "%",
    label: "Lead response rate",
    desc: "Teams go from missing after-hours calls to answering within two rings, around the clock.",
  },
  {
    value: 92,
    suffix: "%",
    label: "Booking accuracy",
    desc: "Appointments booked by the agent with no double-bookings or scheduling conflicts.",
  },
  {
    value: 70,
    prefix: "−",
    suffix: "%",
    label: "Front-desk cost",
    desc: "Front-office overhead reduced while response times and customer experience improve.",
  },
];

const COMPARISON: { without: string; with: string }[] = [
  {
    without: "Calls missed after hours, on weekends, and when lines are busy",
    with: "Every call answered in under two rings, 24/7, no voicemail",
  },
  {
    without: "Leads going cold while no one follows up",
    with: "Instant qualification and follow-ups, synced straight to your CRM",
  },
  {
    without: "English-only scripts, no Hindi or regional support",
    with: "Hindi, English, and regional languages out of the box",
  },
  {
    without: "Call outcomes lost because reps forget to log them",
    with: "Every call auto-logged with recording, transcript, and summary",
  },
  {
    without: "Hiring more front-desk staff every time volume spikes",
    with: "Scale to thousands of calls without adding headcount",
  },
];

export function CustomerOutcomes() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
      <SectionHeading
        label="The Difference"
        rightMeta="Real outcomes"
        title={
          <>
            What changes once <span className="underline-bar">Fiaxe answers.</span>
          </>
        }
        copy="The stories above share a pattern. Here's what consistently changes for a business once a custom Fiaxe agent is handling its calls."
      />

      {/* outcome stats */}
      <Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {OUTCOMES.map((o) => (
            <div key={o.label} className="rounded-2xl border border-line bg-ink p-8 shadow-sm">
              <p className="font-display text-5xl font-medium tracking-tight text-blue">
                <CountUp value={o.value} prefix={o.prefix ?? ""} suffix={o.suffix} />
              </p>
              <p className="mt-3 font-display text-base font-medium tracking-tight">{o.label}</p>
              <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-muted">{o.desc}</p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* without / with comparison */}
      <Reveal delay={0.1}>
        <div className="mt-4 border border-line">
          <div className="grid grid-cols-2 gap-px bg-line">
            <div className="bg-ink-2 px-6 py-4">
              <p className="mono-label">Without Fiaxe</p>
            </div>
            <div className="bg-ink px-6 py-4">
              <p className="mono-label !text-blue">With Fiaxe</p>
            </div>
          </div>
          {COMPARISON.map((row) => (
            <div key={row.without} className="grid grid-cols-2 gap-px border-t border-line bg-line">
              <div className="flex items-start gap-3 bg-ink-2 px-6 py-5">
                <span className="mt-0.5 font-mono text-xs text-faint">×</span>
                <p className="text-sm leading-relaxed text-muted">{row.without}</p>
              </div>
              <div className="flex items-start gap-3 bg-ink px-6 py-5">
                <span className="mt-0.5 font-mono text-xs text-blue">✓</span>
                <p className="text-sm leading-relaxed text-cream">{row.with}</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
