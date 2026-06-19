import Link from "next/link";
import { Reveal, Kicker } from "./primitives";

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

export function Testimonials() {
  const [lead, second] = TESTIMONIALS;
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <div className="max-w-2xl">
        <Reveal>
          <Kicker label="In Their Words" />
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-6 font-display text-4xl font-medium tracking-tight text-balance md:text-5xl">
            What our customers <span className="underline-bar">tell us.</span>
          </h2>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-4 md:mt-16 lg:grid-cols-12">
        {/* featured */}
        <Reveal className="lg:col-span-7">
          <figure className="flex h-full flex-col rounded-3xl border border-line bg-ink p-8 shadow-sm md:p-12">
            <div className="font-mono text-xs tracking-[0.3em] text-blue">★★★★★</div>
            <blockquote className="mt-6 flex-1 font-display text-2xl font-medium leading-snug tracking-tight text-balance md:text-[2rem] md:leading-[1.3]">
              “{lead.quote}”
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-full bg-blue font-mono text-xs font-medium text-white">
                {lead.initials}
              </span>
              <span>
                <span className="block text-sm font-medium text-cream">{lead.name}</span>
                <span className="block font-mono text-[10px] tracking-wider text-faint uppercase">
                  {lead.role}
                </span>
              </span>
            </figcaption>
          </figure>
        </Reveal>

        {/* secondary */}
        <Reveal className="lg:col-span-5" delay={0.08}>
          <figure className="flex h-full flex-col rounded-3xl border border-line bg-ink-2 p-8">
            <div className="font-mono text-xs tracking-[0.3em] text-blue">★★★★★</div>
            <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-muted italic">
              “{second.quote}”
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-full border border-line-bright font-mono text-[11px] font-medium text-cream">
                {second.initials}
              </span>
              <span>
                <span className="block text-sm font-medium text-cream">{second.name}</span>
                <span className="block font-mono text-[10px] tracking-wider text-faint uppercase">
                  {second.role}
                </span>
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {MORE.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.06}>
            <figure className="flex h-full flex-col rounded-3xl border border-line bg-ink-2 p-7">
              <div className="font-mono text-xs tracking-[0.3em] text-blue">★★★★★</div>
              <blockquote className="mt-4 flex-1 text-[14px] leading-relaxed text-muted">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-full border border-line-bright font-mono text-[11px] font-medium text-cream">
                  {t.initials}
                </span>
                <span>
                  <span className="block text-sm font-medium text-cream">{t.name}</span>
                  <span className="block font-mono text-[10px] tracking-wider text-faint uppercase">
                    {t.role}
                  </span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
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
