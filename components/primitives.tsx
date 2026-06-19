"use client";

import { motion, useInView, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  y = 14,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 0.61, 0.24, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function CountUp({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  className,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: 1600, bounce: 0 });

  useEffect(() => {
    if (inView) mv.set(value);
  }, [inView, value, mv]);

  useEffect(() => {
    return spring.on("change", (v) => {
      if (ref.current) {
        ref.current.textContent =
          prefix +
          v.toLocaleString("en-IN", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          }) +
          suffix;
      }
    });
  }, [spring, prefix, suffix, decimals]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}

/* Soft section header: pill kicker, optional right meta, then title */
export function SectionHeading({
  label,
  title,
  copy,
  rightMeta,
}: {
  index?: string;
  label: string;
  title: ReactNode;
  copy?: string;
  rightMeta?: string;
  align?: "left" | "center";
}) {
  return (
    <div className="mb-12 md:mb-16">
      <Reveal>
        <div className="flex items-center justify-between gap-4">
          <Kicker label={label} />
          {rightMeta && (
            <span className="hidden font-mono text-[10px] tracking-[0.16em] text-faint uppercase md:block">
              {rightMeta}
            </span>
          )}
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-7 max-w-3xl font-display text-4xl font-medium tracking-tight text-balance md:mt-9 md:text-5xl lg:text-[3.3rem] lg:leading-[1.07]">
          {title}
        </h2>
      </Reveal>
      {copy && (
        <Reveal delay={0.14}>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted text-pretty">{copy}</p>
        </Reveal>
      )}
    </div>
  );
}

/* Pill-shaped eyebrow label with an accent dot */
export function Kicker({ label, className = "" }: { label: string; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-line bg-ink px-3.5 py-1.5 shadow-sm ${className}`}
    >
      <span className="size-1.5 rounded-full bg-blue" />
      <span className="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">{label}</span>
    </span>
  );
}

/* Animated equalizer bars, the voice motif */
export function Waveform({
  bars = 5,
  className = "",
  barClassName = "bg-blue",
}: {
  bars?: number;
  className?: string;
  barClassName?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-[3px] h-4 ${className}`} aria-hidden>
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className={`w-[3px] rounded-full animate-eq ${barClassName}`}
          style={{
            height: "100%",
            animationDelay: `${i * 0.13}s`,
            animationDuration: `${0.9 + (i % 3) * 0.25}s`,
          }}
        />
      ))}
    </span>
  );
}
