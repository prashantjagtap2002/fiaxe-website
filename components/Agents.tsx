"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";

const DEFAULT_SAMPLE_SRC = "/recordings/customer-support.wav";

export type AgentTemplate = {
  name: string;
  languages: string;
  desc: string;
  industries: string[];
  sample?: string;
};

const INDUSTRIES = ["All", "Ecommerce", "EdTech", "HealthTech", "BFSI", "Hospitality", "Recruitment"];

export const AGENTS: AgentTemplate[] = [
  {
    name: "Customer Support Agent",
    languages: "en · hi",
    desc: "Answers every inbound call 24/7, FAQs, order status, triage and escalation, without hold music.",
    industries: ["Ecommerce", "BFSI", "Hospitality", "EdTech"],
    sample: "/recordings/customer-support.wav",
  },
  {
    name: "Cart Abandonment Agent",
    languages: "en · hinglish",
    desc: "Calls shoppers minutes after they abandon a cart, answers objections, applies coupons, and recovers the sale.",
    industries: ["Ecommerce"],
    sample: "/recordings/cart-recovery.wav",
  },
  {
    name: "COD Confirmation Agent",
    languages: "en · hi · ta",
    desc: "Confirms cash-on-delivery orders and handles last-mile logistics tasks, cutting RTO losses at scale.",
    industries: ["Ecommerce"],
    sample: "/recordings/cod.wav",
  },
  {
    name: "Recruitment Agent",
    languages: "en",
    desc: "Screens, interviews and shortlists candidates at scale, structured insights from every conversation.",
    industries: ["Recruitment", "EdTech"],
    sample: "/recordings/recruitment.wav",
  },
  {
    name: "Collections Agent",
    languages: "en · hi · te",
    desc: "Runs polite, compliant payment reminder campaigns with promise-to-pay capture synced to your CRM.",
    industries: ["BFSI", "Ecommerce"],
    sample: "/recordings/collections.wav",
  },
  {
    name: "Appointment Agent",
    languages: "en · hi",
    desc: "Books, confirms and reschedules appointments, reduces no-shows for clinics, salons and campuses.",
    industries: ["HealthTech", "Hospitality", "EdTech"],
    sample: "/recordings/wedding.wav",
  },
  {
    name: "Lead Qualification Agent",
    languages: "en · hi · hinglish",
    desc: "Calls new leads instantly, scores intent, captures budget and timeline, and routes hot prospects to your team.",
    industries: ["BFSI", "EdTech", "Ecommerce"],
    sample: "/recordings/lead-qualification.wav",
  },
  {
    name: "Outbound Sales Agent",
    languages: "en · hi · mr",
    desc: "Runs full outbound campaigns, pitches offers, handles objections and books demos straight into your calendar.",
    industries: ["Ecommerce", "BFSI", "EdTech"],
    sample: "/recordings/lead-qualification.wav",
  },
  {
    name: "Feedback & Survey Agent",
    languages: "en · hi · ta · te",
    desc: "Collects post-purchase feedback and CSAT surveys at scale, tagging sentiment and flagging detractors in real time.",
    industries: ["Ecommerce", "Hospitality", "HealthTech"],
    sample: "/recordings/customer-support.wav",
  },
];

// Animated equalizer that pulses while the sample is playing, and sits as a
// flat static waveform when idle (so the card height never shifts).
function SoundWave({ active }: { active: boolean }) {
  return (
    <div className="mt-3 flex h-4 items-end gap-[3px]" aria-hidden="true">
      {Array.from({ length: 11 }).map((_, i) => (
        <span
          key={i}
          className={`w-[3px] origin-bottom rounded-full ${
            active ? "animate-eq bg-blue" : "bg-line-bright"
          }`}
          style={
            active
              ? { height: "100%", animationDelay: `${(i % 5) * 0.11}s` }
              : { height: "100%", transform: "scaleY(0.16)" }
          }
        />
      ))}
    </div>
  );
}

function AgentCard({
  agent,
  index,
  activeName,
  setActiveName,
}: {
  agent: AgentTemplate;
  index: number;
  activeName: string | null;
  setActiveName: (name: string | null) => void;
}) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Only one agent plays at a time, pause this card when another takes over.
  useEffect(() => {
    const audio = audioRef.current;
    if (audio && activeName !== agent.name && !audio.paused) audio.pause();
  }, [activeName, agent.name]);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      setActiveName(agent.name);
      audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="group rounded-2xl border border-line bg-ink p-7 shadow-sm transition-colors hover:bg-ink-2"
    >
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-xs text-faint">/0{index + 1}</span>
        <span className="font-mono text-[10px] tracking-wider text-faint uppercase">
          {agent.languages}
        </span>
      </div>
      <div className="mt-6 flex items-center gap-3">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? `Pause ${agent.name} sample call` : `Play ${agent.name} sample call`}
          aria-pressed={playing}
          className="grid size-9 shrink-0 place-items-center rounded-xl bg-blue text-white transition-colors hover:bg-blue-bright"
        >
          <svg width="12" height="12" viewBox="0 0 14 14" fill="currentColor">
            {playing ? (
              <path d="M3 1.5h3v11H3v-11Zm5 0h3v11H8v-11Z" />
            ) : (
              <path d="M3 1.5v11l9-5.5-9-5.5Z" />
            )}
          </svg>
        </button>
        <h3 className="font-display text-xl font-medium tracking-tight">{agent.name}</h3>
      </div>
      <SoundWave active={playing} />
      <button
        type="button"
        onClick={togglePlay}
        aria-label={playing ? `Pause ${agent.name} sample call` : `Play ${agent.name} sample call`}
        className="mt-2 flex items-center gap-1.5 font-mono text-[10px] tracking-[0.12em] text-blue uppercase transition-colors hover:text-blue-bright"
      >
        <span aria-hidden="true">{playing ? "▶▶" : "♪"}</span>
        {playing ? "Playing, tap to pause" : "Listen to a sample call"}
      </button>
      <audio
        ref={audioRef}
        src={agent.sample ?? DEFAULT_SAMPLE_SRC}
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          setPlaying(false);
          setActiveName(null);
        }}
      />
      <p className="mt-2.5 text-sm leading-relaxed text-muted">{agent.desc}</p>
      <p className="mt-6 font-mono text-[10px] tracking-wider text-faint uppercase">
        {agent.industries.join(" · ")}
      </p>
    </motion.div>
  );
}

export function Agents() {
  const [active, setActive] = useState("All");
  const [activeName, setActiveName] = useState<string | null>(null);
  const visible = AGENTS.filter((a) => active === "All" || a.industries.includes(active));

  return (
    <section id="agents" className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
      {/* industry filter, flat mono tabs */}
      <div className="mb-8 flex flex-wrap gap-x-6 gap-y-3 border-b border-line pb-4">
        {INDUSTRIES.map((ind) => (
          <button
            key={ind}
            onClick={() => setActive(ind)}
            className={`relative pb-1 font-mono text-xs tracking-[0.12em] uppercase transition-colors ${
              active === ind ? "text-cream" : "text-faint hover:text-muted"
            }`}
          >
            {ind}
            {active === ind && (
              <motion.span
                layoutId="industry-underline"
                className="absolute right-0 -bottom-[17px] left-0 h-px bg-cream"
                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
              />
            )}
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((agent, i) => (
            <AgentCard
              key={agent.name}
              agent={agent}
              index={i}
              activeName={activeName}
              setActiveName={setActiveName}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
