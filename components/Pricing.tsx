"use client";

import { Reveal, SectionHeading } from "./primitives";

const TIERS = [
  { name: "Starter", rate: "₹7", minutes: "5,000", desc: "For teams validating their first voice agent." },
  { name: "Grow", rate: "₹6.5", minutes: "10,000", desc: "For growing teams running steady call volumes." },
  { name: "Pro", rate: "₹6", minutes: "30,000", desc: "For businesses scaling campaigns in production." },
  { name: "Enterprise", rate: "₹5.5", minutes: "50,000", desc: "For enterprise-scale calling operations." },
];

const INCLUDED = [
  {
    title: "Custom CRM access",
    desc: "Manage all your customers in your own CRM.",
  },
  {
    title: "Auto call launch",
    desc: "Launch calls automatically from your apps.",
  },
  {
    title: "Simultaneous calls",
    desc: "Run multiple calls at the same time.",
  },
  {
    title: "Custom AI voice bot",
    desc: "Built custom for your business, your goals, your audience.",
  },
  {
    title: "Every use case",
    desc: "Sales, follow-ups, reminders, surveys & more.",
  },
  {
    title: "Integrations",
    desc: "We help integrate the bot with your tools and systems.",
  },
  {
    title: "Setup & support",
    desc: "Onboarding, integration help & ongoing support.",
  },
  {
    title: "Reliable & secure",
    desc: "Built with reliability, security and performance at the core.",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
      <SectionHeading
        index="01"
        label="Pricing"
        rightMeta="Per-minute · No seat licenses"
        title={
          <>
            Pricing that scales <span className="underline-bar">with your calls.</span>
          </>
        }
        copy="Transparent per-minute pricing on bundled minutes. No platform fees, no seat licenses, pay for conversations, not software."
      />

      <Reveal>
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {TIERS.map((t) => (
            <div key={t.name} className="flex flex-col rounded-2xl border border-line bg-ink p-5 shadow-sm sm:p-7">
              <p className="mono-label !text-cream">{t.name}</p>
              <p className="mt-6 font-display text-[2.1rem] leading-none font-medium tracking-tight sm:text-[2.6rem]">
                {t.rate}
                <span className="ml-1 font-mono text-sm font-normal text-faint">/ min</span>
              </p>
              <p className="mt-4 border-t border-line pt-4 font-mono text-[11px] tracking-wider text-muted uppercase">
                {t.minutes} minutes included
              </p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{t.desc}</p>
              <a
                href="/book-demo"
                className="group mt-7 flex items-center justify-between border-t border-line pt-4 font-mono text-[11px] font-medium tracking-[0.14em] text-cream uppercase transition-colors hover:text-blue"
              >
                Get started
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>
          ))}
        </div>
      </Reveal>

      {/* everything included, on every plan */}
      <Reveal delay={0.1}>
        <div className="mt-12 flex items-center gap-4 rounded-2xl border border-line bg-ink-2 px-7 py-4 md:mt-16">
          <span className="mono-label !text-cream">All plans include</span>
          <span className="h-px flex-1 bg-line" />
          <span className="mono-label hidden md:block">No feature gates</span>
        </div>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {INCLUDED.map((f, i) => (
            <div key={f.title} className="rounded-2xl border border-line bg-ink p-6 shadow-sm">
              <span className="font-mono text-[10px] text-faint">0{i + 1}</span>
              <h3 className="mt-3 font-display text-[15px] font-medium tracking-tight">{f.title}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{f.desc}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <p className="mt-6 font-mono text-[11px] tracking-wider text-faint uppercase">
        Telephony charges billed at carrier cost · Custom volumes above 50,000 minutes, talk to us
      </p>
    </section>
  );
}
