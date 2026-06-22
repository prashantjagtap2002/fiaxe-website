"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CountUp } from "./primitives";
import { CLIENTS } from "./Customers";

const SAMPLE_CALL_SRC = "/sample-call.mp3";

const TRANSCRIPT: { who: "agent" | "user"; text: string }[] = [
  { who: "agent", text: "Hi, thanks for calling! I'm here to help. Could I get your name, please?" },
  { who: "user", text: "Yes, I'm Rahul. Calling about the 3BHK in Andheri." },
  { who: "agent", text: "Great choice, Rahul, that one's still available. Shall I book you a site visit this week?" },
  { who: "user", text: "Sure, Saturday afternoon works for me." },
  { who: "agent", text: "Done, booked for Saturday at 3 PM. You'll get a confirmation on WhatsApp shortly." },
];

// Deterministic bar heights (no Math.random, keeps SSR and client markup identical).
const WAVE_BARS = [
  0.4, 0.7, 0.5, 0.85, 0.6, 1, 0.55, 0.35, 0.75, 0.9, 0.5, 0.65, 0.95, 0.45, 0.8,
  0.6, 0.3, 0.7, 1, 0.55, 0.85, 0.4, 0.75, 0.5, 0.9, 0.6, 0.35, 0.8, 0.65, 0.95,
  0.45, 0.7, 0.55, 1, 0.5, 0.85, 0.4, 0.6, 0.75, 0.35,
];

function FloatingPill({
  label,
  delay,
  className,
  dotClass = "bg-blue",
}: {
  label: string;
  delay: number;
  className: string;
  dotClass?: string;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1, y: [0, -5, 0] }}
      transition={{
        opacity: { delay, duration: 0.5 },
        scale: { delay, duration: 0.5 },
        y: { delay: delay + 0.5, duration: 4, repeat: Infinity, ease: "easeInOut" },
      }}
      className={`absolute z-10 flex items-center gap-1.5 rounded-full border border-line bg-ink px-3 py-1.5 shadow-md shadow-black/10 ${className}`}
    >
      <span className={`size-1.5 rounded-full ${dotClass}`} />
      <span className="font-mono text-[10px] tracking-[0.08em] text-cream uppercase">{label}</span>
    </motion.span>
  );
}

function SampleCallPanel({ playing, onToggle }: { playing: boolean; onToggle: () => void }) {
  const [step, setStep] = useState(1);
  const [seconds, setSeconds] = useState(267); // starts at 04:27

  useEffect(() => {
    const id = setInterval(
      () => setStep((s) => (s >= TRANSCRIPT.length ? 1 : s + 1)),
      2600,
    );
    const clock = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => {
      clearInterval(id);
      clearInterval(clock);
    };
  }, []);

  const mmss = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(
    seconds % 60,
  ).padStart(2, "0")}`;

  return (
    <div className="relative">
      <FloatingPill label="CRM updated" delay={1.1} className="-top-3 right-4" />
      <FloatingPill
        label="Appointment confirmed"
        delay={1.5}
        dotClass="bg-emerald-500"
        className="-bottom-3 left-4"
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.21, 0.5, 0.2, 1] }}
        className="w-full overflow-hidden rounded-[1.5rem] border border-line bg-ink shadow-lg shadow-black/5"
      >
        {/* live-call header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3.5">
          <span className="flex items-center gap-2">
            <span className="size-2 animate-pulse rounded-full bg-emerald-500" />
            <span className="font-mono text-xs font-medium tracking-[0.08em] text-cream uppercase">
              Live call active
            </span>
          </span>
          <span className="font-mono text-xs text-faint tabular-nums">{mmss}</span>
        </div>

        {/* caller card */}
        <div className="mx-6 flex items-center gap-3 rounded-2xl border border-line bg-ink-2 px-4 py-3.5">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-blue/10 text-blue">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
            </svg>
          </span>
          <div className="flex-1 leading-tight">
            <p className="text-sm font-medium text-cream">Rahul Sharma</p>
            <p className="font-mono text-[11px] text-faint">+91 98765 43210 · Inbound</p>
          </div>
          <span className="rounded-full border border-blue/40 px-2.5 py-1 font-mono text-[9px] tracking-[0.1em] text-blue uppercase">
            Qualified
          </span>
        </div>

        {/* animated waveform, click to play the real sample */}
        <button
          type="button"
          onClick={onToggle}
          aria-label={playing ? "Pause sample call" : "Play sample call"}
          aria-pressed={playing}
          className="flex h-16 w-full items-center justify-center gap-[3px] px-6 py-2"
        >
          {WAVE_BARS.map((h, i) => (
            <span
              key={i}
              className="w-[3px] rounded-full bg-blue/80 animate-eq"
              style={{
                height: `${h * 100}%`,
                animationDelay: `${(i % 9) * 0.07}s`,
                animationDuration: `${0.7 + (i % 5) * 0.12}s`,
              }}
            />
          ))}
        </button>

        {/* transcript */}
        <div className="px-6 pb-1">
          <p className="mono-label mb-3 !text-[10px]">Live transcript</p>
          <div className="flex h-48 flex-col justify-end gap-2.5 overflow-hidden">
            <AnimatePresence initial={false}>
              {TRANSCRIPT.slice(0, step).map((line, i) => {
                const isAgent = line.who === "agent";
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className={`flex items-end gap-2 ${isAgent ? "" : "flex-row-reverse"}`}
                  >
                    <span
                      className={`grid size-7 shrink-0 place-items-center rounded-full font-mono text-[9px] font-medium ${
                        isAgent ? "bg-blue text-white" : "border border-line bg-surface-2 text-muted"
                      }`}
                    >
                      {isAgent ? "AI" : "R"}
                    </span>
                    <span
                      className={`max-w-[78%] px-3.5 py-2 text-[13px] leading-snug ${
                        isAgent
                          ? "rounded-2xl rounded-bl-md border border-blue/15 bg-blue/[0.07] text-cream"
                          : "rounded-2xl rounded-br-md border border-line bg-surface-2 text-muted"
                      }`}
                    >
                      {line.text}
                    </span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* outcome tiles */}
        <div className="grid grid-cols-2 gap-3 px-6 pt-3 pb-6">
          <div className="rounded-xl border border-line bg-ink-2 px-4 py-3">
            <p className="font-mono text-[9px] tracking-[0.12em] text-faint uppercase">Intent score</p>
            <p className="mt-1 font-display text-xl font-medium tracking-tight text-emerald-500">High</p>
          </div>
          <div className="rounded-xl border border-line bg-ink-2 px-4 py-3">
            <p className="font-mono text-[9px] tracking-[0.12em] text-faint uppercase">Next action</p>
            <p className="mt-1 font-display text-xl font-medium tracking-tight text-blue">Book visit</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const STATS: { label: string; value: number; suffix?: string; prefix?: string; decimals?: number }[] = [
  { label: "Latency", value: 300, prefix: "<", suffix: "ms" },
  { label: "Always on", value: 24, suffix: "/7" },
  { label: "Vernacular languages", value: 28, suffix: "+" },
  { label: "Clients onboarded", value: 10, suffix: "+" },
];

export function Hero() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  }

  return (
    <section className="relative isolate pt-32 md:pt-40">
      {/* themed scenic backdrop, pinned to the top and faded into the page */}
      <div
        aria-hidden="true"
        className="hero-bg pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] md:h-[720px]"
      />
      <audio
        ref={audioRef}
        src={SAMPLE_CALL_SRC}
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-center gap-12 py-12 md:py-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 0.61, 0.24, 1] }}
              className="max-w-2xl font-display text-[2.9rem] font-medium leading-[1.03] tracking-tight text-balance sm:text-6xl md:text-[4.5rem]"
            >
              Your business deserves{" "}
              <span className="underline-bar">better than a bot.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-7 max-w-lg text-lg leading-relaxed text-muted"
            >
              Fiaxe builds fully custom AI voice agents for your business, not
              templates, not DIY tools. Every agent is built from scratch around
              how your business actually runs. Calls, leads, bookings, support:
              all handled.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Link
                href="/book-demo"
                className="group rounded-full bg-blue px-6 py-3.5 font-mono text-xs font-medium tracking-[0.14em] text-white uppercase shadow-sm transition-colors hover:bg-blue-bright"
              >
                <span className="flex items-center gap-2.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
                  </svg>
                  Book a Discovery Call
                </span>
              </Link>
              <Link
                href="/agents"
                className="group rounded-full border border-line-bright px-6 py-3.5 font-mono text-xs font-medium tracking-[0.14em] text-cream uppercase transition-colors hover:border-cream"
              >
                <span className="flex items-center gap-2.5">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
                    <path d="M3 1.5v11l9-5.5-9-5.5Z" />
                  </svg>
                  Hear the AI in Action
                </span>
              </Link>
            </motion.div>

            {/* metrics, moved up beneath the CTAs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.75 }}
              className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-8 sm:grid-cols-4 sm:gap-x-0"
            >
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="sm:border-l sm:border-line sm:pl-6 sm:first:border-l-0 sm:first:pl-0"
                >
                  <p className="font-display text-[1.75rem] leading-none font-medium tracking-tight md:text-4xl">
                    <CountUp
                      value={s.value}
                      prefix={s.prefix ?? ""}
                      suffix={s.suffix ?? ""}
                      decimals={s.decimals ?? 0}
                    />
                  </p>
                  <p className="mt-3 font-mono text-[10px] leading-[1.5] tracking-[0.16em] text-faint uppercase">
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* call panel */}
          <div className="lg:col-span-6">
            <SampleCallPanel playing={playing} onToggle={togglePlay} />
          </div>
        </div>

        {/* brand marquee, integrated full-width strip where the metrics used to be */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="border-t border-line py-8"
        >
          <p className="mb-6 font-mono text-[10px] tracking-[0.16em] text-faint uppercase">
            Trusted by teams at
          </p>
          <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
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
        </motion.div>
      </div>
    </section>
  );
}
