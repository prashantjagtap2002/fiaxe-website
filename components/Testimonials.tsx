"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { Reveal } from "./primitives";

type Testimonial = { quote: string; name: string; role: string; initials: string };

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "We used to lose leads every evening and weekend. Now our AI agent handles everything, and we wake up to booked appointments. It's changed how we operate.",
    name: "Vikram Rao",
    role: "Director, PropEdge Realty",
    initials: "VR",
  },
  {
    quote:
      "Patients love it. They call, get appointments booked instantly, and we don't need extra staff. Fiaxe understood exactly how our clinic works.",
    name: "Dr. Sneha Patil",
    role: "Founder, SureCare Clinics",
    initials: "SP",
  },
];

const MORE: Testimonial[] = [
  {
    quote:
      "Our follow-up rate went from patchy to 100%. The agent calls every lead within minutes, in their own language.",
    name: "Anil Kumar",
    role: "Sales Head, BrightLoans",
    initials: "AK",
  },
  {
    quote:
      "Setup took a weekend. By Monday we had an agent qualifying leads and pushing them straight into our CRM.",
    name: "Meera Iyer",
    role: "COO, Skillfront Academy",
    initials: "MI",
  },
  {
    quote:
      "We cut our cost per qualified lead by nearly half. The calls sound natural enough that customers don't realise it's AI.",
    name: "Rohit Desai",
    role: "Founder, UrbanWheels",
    initials: "RD",
  },
];

const ALL = [...TESTIMONIALS, ...MORE];

const POSITIONS: { col: string; row: string }[] = [
  { col: "1 / 9", row: "1" },
  { col: "9 / 13", row: "1" },
  { col: "1 / 5", row: "2" },
  { col: "5 / 9", row: "2" },
  { col: "9 / 13", row: "2" },
];

function getGridStyle(index: number, expandedIndex: number): React.CSSProperties {
  if (index === expandedIndex) {
    return { gridColumn: "1 / 9", gridRow: "1" };
  }
  if (index === 0 && expandedIndex !== 0) {
    return {
      gridColumn: POSITIONS[expandedIndex].col,
      gridRow: POSITIONS[expandedIndex].row,
    };
  }
  return {
    gridColumn: POSITIONS[index].col,
    gridRow: POSITIONS[index].row,
  };
}

const EASE: [number, number, number, number] = [0.22, 0.08, 0.16, 1];
const LAYOUT = { duration: 0.5, ease: EASE };

function TestimonialCard({
  t,
  isBig,
  onMouseEnter,
}: {
  t: Testimonial;
  isBig: boolean;
  onMouseEnter: () => void;
}) {
  return (
    <motion.figure
      layout
      transition={{ layout: LAYOUT }}
      onMouseEnter={onMouseEnter}
      className={`flex h-full flex-col rounded-3xl border ${
        isBig
          ? "border-line bg-ink p-8 shadow-sm md:p-12"
          : "border-line bg-ink-2 p-7"
      }`}
    >
      <div className="font-mono text-xs tracking-[0.3em] text-blue">★★★★★</div>
      <motion.blockquote
        layout
        transition={{ layout: LAYOUT }}
        className={`mt-4 flex-1 leading-relaxed ${
          isBig
            ? "font-display text-2xl font-medium tracking-tight text-balance md:text-[2rem] md:leading-[1.3]"
            : "text-[14px] text-muted"
        }`}
      >
        &ldquo;{t.quote}&rdquo;
      </motion.blockquote>
      <motion.figcaption
        layout
        transition={{ layout: LAYOUT }}
        className="mt-6 flex items-center gap-3"
      >
        <motion.span
          layout
          transition={{ layout: LAYOUT }}
          className={`grid shrink-0 place-items-center rounded-full font-mono font-medium ${
            isBig
              ? "size-11 bg-blue text-xs text-white"
              : "size-9 border border-line-bright text-[11px] text-cream"
          }`}
        >
          {t.initials}
        </motion.span>
        <span>
          <span className="block text-sm font-medium text-cream">{t.name}</span>
          <span className="block font-mono text-[10px] tracking-wider text-faint uppercase">
            {t.role}
          </span>
        </span>
      </motion.figcaption>
    </motion.figure>
  );
}

export function Testimonials() {
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [supportsHover, setSupportsHover] = useState(false);
  const busy = useRef(false);

  useEffect(() => {
    setSupportsHover(window.matchMedia("(hover: hover)").matches);
  }, []);

  const handleEnter = useCallback(
    (index: number) => {
      if (!supportsHover || busy.current || index === expandedIndex) return;
      busy.current = true;
      setExpandedIndex(index);
      setTimeout(() => {
        busy.current = false;
      }, 550);
    },
    [supportsHover, expandedIndex],
  );

  const handleGridLeave = useCallback(() => {
    if (!supportsHover || busy.current) return;
    busy.current = true;
    setExpandedIndex(0);
    setTimeout(() => {
      busy.current = false;
    }, 550);
  }, [supportsHover]);

  return (
    <section className="mx-auto max-w-7xl px-5 pt-24 pb-12 md:px-8 md:pt-32 md:pb-16">
      <div className="max-w-2xl">
        <Reveal delay={0.06}>
          <h2 className="font-display text-4xl font-medium tracking-tight text-balance md:text-5xl">
            What our customers <span className="underline-bar">tell us.</span>
          </h2>
        </Reveal>
      </div>

      <div
        className="mt-14 grid grid-cols-1 gap-4 md:mt-16 lg:grid-cols-12 lg:grid-rows-[auto_auto]"
        onMouseLeave={handleGridLeave}
      >
        {ALL.map((t, i) => (
          <motion.div
            key={t.name}
            layout
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              opacity: { duration: 0.5, delay: i * 0.06 },
              y: { duration: 0.5, delay: i * 0.06 },
              layout: LAYOUT,
            }}
            style={getGridStyle(i, expandedIndex)}
            className="h-full"
          >
            <TestimonialCard
              t={t}
              isBig={i === expandedIndex}
              onMouseEnter={() => handleEnter(i)}
            />
          </motion.div>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-10 flex md:mt-12">
          <Link
            href="/customer-stories"
            className="rounded-full border border-line-bright px-6 py-3 font-mono text-[11px] font-medium tracking-[0.14em] text-cream uppercase transition-colors hover:border-cream"
          >
            View more stories →
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
