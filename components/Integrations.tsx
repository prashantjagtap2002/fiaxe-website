import { Reveal, SectionHeading } from "./primitives";

// Placeholder integration set. Swap names/logos for the real partner list.
const INTEGRATIONS = [
  "Zoho CRM",
  "n8n",
  "Exotel",
  "Salesforce",
  "HubSpot",
  "WhatsApp",
  "Google Calendar",
  "Slack",
  "Twilio",
  "Razorpay",
  "Google Sheets",
  "Webhooks",
];

export function Integrations() {
  return (
    <section id="integrations" className="border-y border-line bg-ink-2 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          index="04"
          label="Integrations"
          rightMeta="Plugs into your stack"
          title={
            <>
              Wired into the tools <span className="underline-bar">you already use.</span>
            </>
          }
          copy="Calls, outcomes, and data flow straight into your CRM, calendar, and messaging, no manual exports, no copy-paste."
        />

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3 lg:grid-cols-4">
          {INTEGRATIONS.map((name, i) => (
            <Reveal key={name} delay={(i % 4) * 0.05}>
              <div className="flex h-full min-h-[5.5rem] items-center justify-center bg-ink px-4 py-6 text-center transition-colors hover:bg-ink-2">
                <span className="font-display text-lg font-medium tracking-tight text-faint transition-colors hover:text-cream">
                  {name}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-6 font-mono text-[11px] tracking-[0.14em] text-faint uppercase">
            + Custom integrations on request via API & webhooks
          </p>
        </Reveal>
      </div>
    </section>
  );
}
