"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";

const DEFAULT_SAMPLE_SRC = "/recordings/customer-support.wav";

// A single spoken phrase in the recording's own language. `t` is when that
// phrase begins (seconds into the clip). Add a `t` to every cue you have a
// timestamp for; cues without one are spaced out automatically.
export type Cue = { t?: number; text: string };

export type AgentTemplate = {
  name: string;
  languages: string;
  desc: string;
  industries: string[];
  sample?: string;
  transcript: Cue[];
};

export type TimedWord = { text: string; start: number; end: number };

// Turn a recording's timed cues into per-word timings so the on-screen script
// can highlight the exact word being spoken. A cue's `t` is when that phrase
// starts; its words are spread across the gap to the next cue (or the clip's
// end). Cues without a `t` are distributed across the clip by word count, so an
// untimed transcript still tracks playback — just less precisely than one with
// timestamps.
export function timedWords(cues: Cue[], duration: number): TimedWord[] {
  const dur = duration > 0 ? duration : 0;
  const counts = cues.map((c) => c.text.trim().split(/\s+/).filter(Boolean).length);
  const total = counts.reduce((a, b) => a + b, 0) || 1;

  // Resolve a start time for every cue: an explicit `t` wins, otherwise place
  // the cue proportionally to how many words come before it.
  let seen = 0;
  const starts = cues.map((c, i) => {
    const fallback = dur * (seen / total);
    seen += counts[i];
    return typeof c.t === "number" ? c.t : fallback;
  });
  // Keep starts non-decreasing so a stray timestamp can't rewind the highlight.
  for (let i = 1; i < starts.length; i++) {
    if (starts[i] < starts[i - 1]) starts[i] = starts[i - 1];
  }

  const words: TimedWord[] = [];
  cues.forEach((c, ci) => {
    const parts = c.text.trim().split(/\s+/).filter(Boolean);
    const segStart = starts[ci];
    const segEnd =
      ci + 1 < cues.length ? starts[ci + 1] : dur || segStart + parts.length * 0.4;
    const span = Math.max(0, segEnd - segStart);
    const n = parts.length;
    parts.forEach((w, wi) => {
      words.push({
        text: w,
        start: segStart + (n ? (span * wi) / n : 0),
        end: segStart + (n ? (span * (wi + 1)) / n : span),
      });
    });
  });
  return words;
}

// Index of the word being spoken at `time` (−1 before the first word starts).
export function activeWordIndex(words: TimedWord[], time: number): number {
  let idx = -1;
  for (let i = 0; i < words.length; i++) {
    if (words[i].start <= time) idx = i;
    else break;
  }
  return idx;
}

const INDUSTRIES = ["All", "Ecommerce", "EdTech", "HealthTech", "BFSI", "Hospitality", "Recruitment"];

export const AGENTS: AgentTemplate[] = [
  {
    name: "Customer Support Agent",
    languages: "en · hi",
    desc: "Answers every inbound call 24/7, FAQs, order status, triage and escalation, without hold music.",
    industries: ["Ecommerce", "BFSI", "Hospitality", "EdTech"],
    sample: "/recordings/customer-support.wav",
    transcript: [
      { text: "Hello! Thank you for calling Fiaxe. How can I assist you today?" },
      { text: "I see you have a recent order with us." },
      { text: "The status is currently 'shipped' and should arrive by tomorrow." },
      { text: "Is there anything else I can help you with?" },
    ],
  },
  {
    name: "Cart Abandonment Agent",
    languages: "en · hinglish",
    desc: "Calls shoppers minutes after they abandon a cart, answers objections, applies coupons, and recovers the sale.",
    industries: ["Ecommerce"],
    sample: "/recordings/cart-recovery.wav",
    transcript: [
      { text: "Hi there! I noticed you left some items in your cart." },
      { text: "Was there any issue completing your purchase?" },
      { text: "I can offer you a 10% discount if you complete the order today." },
      { text: "Shall I apply the coupon for you?" },
    ],
  },
  {
    name: "COD Confirmation Agent",
    languages: "en · hi · ta",
    desc: "Confirms cash-on-delivery orders and handles last-mile logistics tasks, cutting RTO losses at scale.",
    industries: ["Ecommerce"],
    sample: "/recordings/cod.wav",
    transcript: [
      { text: "Hello, I am calling to confirm your Cash on Delivery order." },
      { text: "Your total is ₹1,200." },
      { text: "Will you be available to receive the package tomorrow?" },
      { text: "Great, I have confirmed your order for delivery." },
    ],
  },
  {
    name: "Recruitment Agent",
    languages: "en",
    desc: "Screens, interviews and shortlists candidates at scale, structured insights from every conversation.",
    industries: ["Recruitment", "EdTech"],
    sample: "/recordings/recruitment.wav",
    transcript: [
      { text: "Hi, this is the Fiaxe Recruitment AI." },
      { text: "We received your application for the Software Engineer role. Are you still interested?" },
      { text: "Let's start with a few quick screening questions about your experience with React." },
    ],
  },
  {
    name: "Collections Agent",
    languages: "en · hi · te",
    desc: "Runs polite, compliant payment reminder campaigns with promise-to-pay capture synced to your CRM.",
    industries: ["BFSI", "Ecommerce"],
    sample: "/recordings/collections.wav",
    transcript: [
      { text: "Hello, this is a courteous reminder regarding your recent pending invoice of ₹4,500." },
      { text: "Are you able to process the payment today?" },
      { text: "If you need more time, we can discuss a payment schedule." },
    ],
  },
  {
    name: "Appointment Agent",
    languages: "en · hi",
    desc: "Books, confirms and reschedules appointments, reduces no-shows for clinics, salons and campuses.",
    industries: ["HealthTech", "Hospitality", "EdTech"],
    sample: "/recordings/wedding.wav",
    transcript: [
      { text: "Hi! I am calling from City Dental to confirm your appointment for tomorrow at 10 AM." },
      { text: "Will you be able to make it?" },
      { text: "Excellent, we look forward to seeing you." },
    ],
  },
  {
    name: "Lead Qualification Agent",
    languages: "en · hi · hinglish",
    desc: "Calls new leads instantly, scores intent, captures budget and timeline, and routes hot prospects to your team.",
    industries: ["BFSI", "EdTech", "Ecommerce"],
    sample: "/recordings/lead-qualification.wav",
    transcript: [
      { text: "Hello! Thank you for downloading our recent report." },
      { text: "I'm calling to understand if you are currently evaluating any new software solutions." },
      { text: "What is your timeline for implementation?" },
    ],
  },
  {
    name: "Outbound Sales Agent",
    languages: "en · hi · mr",
    desc: "Runs full outbound campaigns, pitches offers, handles objections and books demos straight into your calendar.",
    industries: ["Ecommerce", "BFSI", "EdTech"],
    sample: "/recordings/weirdo.wav",
    transcript: [
      { text: "Hi, I'm reaching out from Fiaxe." },
      { text: "We help companies like yours automate customer calls with AI." },
      { text: "Do you have a few minutes to hear how we can reduce your support costs by 40%?" },
    ],
  },
  {
    name: "Feedback & Survey Agent",
    languages: "en · hi · ta · te",
    desc: "Collects post-purchase feedback and CSAT surveys at scale, tagging sentiment and flagging detractors in real time.",
    industries: ["Ecommerce", "Hospitality", "HealthTech"],
    sample: "/recordings/poker.wav",
    transcript: [
      { text: "Hello! Thank you for your recent visit. We would love to hear your feedback." },
      { text: "On a scale of 1 to 10, how would you rate your experience?" },
      { text: "We appreciate your time and valuable input." },
    ],
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
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const words = timedWords(agent.transcript, duration);
  const activeIndex = playing ? activeWordIndex(words, currentTime) : -1;

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
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
        onTimeUpdate={(e) => {
          setCurrentTime(e.currentTarget.currentTime);
          if (!duration && e.currentTarget.duration) setDuration(e.currentTarget.duration);
        }}
        onEnded={() => {
          setPlaying(false);
          setActiveName(null);
          setCurrentTime(0);
        }}
      />
      <p className="mt-2.5 text-sm leading-relaxed text-muted">{agent.desc}</p>
      
      <div className="mt-6 border-t border-line pt-4 relative">
        <p className="font-mono text-[11px] leading-relaxed">
          <span className="text-blue">agent &gt;</span>{" "}
          {words.map((word, i) => {
            const state =
              i === activeIndex
                ? "rounded bg-blue/15 text-cream"
                : i < activeIndex
                  ? "text-cream"
                  : "text-muted";
            return (
              <span key={i} className={`transition-colors duration-200 ${state}`}>
                {word.text}{" "}
              </span>
            );
          })}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between font-mono text-[10px] tracking-wider uppercase">
        <span className="text-faint">{agent.industries.join(" · ")}</span>
        <span className="text-blue font-medium transition-colors group-hover:text-blue-bright">LISTEN →</span>
      </div>
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
