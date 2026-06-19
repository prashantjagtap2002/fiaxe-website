"use client";

import { useState } from "react";
import { Reveal } from "./primitives";

const ROLES = [
  "AI Voice Engineer",
  "Conversation Designer",
  "Solutions Engineer",
  "Implementation Specialist",
  "Customer Success Manager",
  "Sales Development Representative",
  "Operations Associate",
  "Open / Other",
];

const EMPLOYMENT_TYPES = ["Full-time", "Contract", "Internship", "Part-time", "Freelance"];

const fieldCls =
  "rounded-xl border border-line bg-surface-2 px-3.5 py-2.5 text-sm text-cream outline-none transition-colors placeholder:text-faint focus:border-blue";
const labelCls = "font-mono text-[10px] tracking-[0.12em] text-faint uppercase";

export function CareersForm() {
  const [sent, setSent] = useState(false);
  const [fileName, setFileName] = useState<string>("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const body = [
      `Role: ${d.get("role")}`,
      `Employment type: ${d.get("employmentType")}`,
      `Name: ${d.get("name")}`,
      `Email: ${d.get("email")}`,
      `Phone: ${d.get("phone")}`,
      `Current role: ${d.get("currentRole") || "N/A"}`,
      `Current company: ${d.get("currentCompany") || "N/A"}`,
      `Current CTC: ${d.get("currentCtc") || "N/A"}`,
      `Expected CTC: ${d.get("expectedCtc") || "N/A"}`,
      `Notice period: ${d.get("noticePeriod") || "N/A"}`,
      "",
      `Notes: ${d.get("notes") || "N/A"}`,
      "",
      fileName
        ? `Resume to attach: ${fileName} (please attach the file to this email).`
        : "Please attach your resume to this email.",
    ].join("\n");
    window.location.href = `mailto:careers@fiaxe.com?subject=${encodeURIComponent(
      `Application, ${d.get("role")}, ${d.get("name")}`,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <Reveal>
      <form
        onSubmit={handleSubmit}
        className="grid gap-5 border border-line rounded-2xl border border-line bg-ink p-8 shadow-sm md:p-10"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className={labelCls}>
              Role you&apos;re applying for <span className="text-blue">*</span>
            </span>
            <select name="role" required defaultValue="" className={`${fieldCls} select-field`}>
              <option value="" disabled>
                Select a role…
              </option>
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2">
            <span className={labelCls}>
              Employment type <span className="text-blue">*</span>
            </span>
            <select name="employmentType" required defaultValue="" className={`${fieldCls} select-field`}>
              <option value="" disabled>
                Select type…
              </option>
              {EMPLOYMENT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className={labelCls}>Full name <span className="text-blue">*</span></span>
            <input name="name" required placeholder="Priya Sharma" className={fieldCls} />
          </label>
          <label className="flex flex-col gap-2">
            <span className={labelCls}>Email <span className="text-blue">*</span></span>
            <input name="email" type="email" required placeholder="you@email.com" className={fieldCls} />
          </label>
          <label className="flex flex-col gap-2">
            <span className={labelCls}>Phone <span className="text-blue">*</span></span>
            <input name="phone" type="tel" required placeholder="+91 98765 43210" className={fieldCls} />
          </label>
          <label className="flex flex-col gap-2">
            <span className={labelCls}>Notice period</span>
            <input name="noticePeriod" placeholder="e.g. 30 days" className={fieldCls} />
          </label>
          <label className="flex flex-col gap-2">
            <span className={labelCls}>Current role</span>
            <input name="currentRole" placeholder="e.g. Conversation Designer" className={fieldCls} />
          </label>
          <label className="flex flex-col gap-2">
            <span className={labelCls}>Current company</span>
            <input name="currentCompany" placeholder="e.g. Acme Inc." className={fieldCls} />
          </label>
          <label className="flex flex-col gap-2">
            <span className={labelCls}>Current CTC</span>
            <input name="currentCtc" placeholder="e.g. ₹12 LPA" className={fieldCls} />
          </label>
          <label className="flex flex-col gap-2">
            <span className={labelCls}>Expected CTC</span>
            <input name="expectedCtc" placeholder="e.g. ₹18 LPA" className={fieldCls} />
          </label>
        </div>

        <label className="flex flex-col gap-2">
          <span className={labelCls}>Resume (PDF)</span>
          <span className="group flex cursor-pointer items-center gap-3 rounded-xl border border-line bg-surface-2 px-3.5 py-2.5 transition-colors focus-within:border-blue">
            <span className="rounded-lg border border-line-bright px-3 py-1.5 font-mono text-[10px] tracking-[0.12em] text-cream uppercase transition-colors group-hover:border-cream">
              Choose file
            </span>
            <span className="truncate text-sm text-muted">
              {fileName || "No file chosen"}
            </span>
            <input
              name="resume"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
              className="sr-only"
            />
          </span>
        </label>

        <label className="flex flex-col gap-2">
          <span className={labelCls}>Anything else?</span>
          <textarea
            name="notes"
            rows={4}
            placeholder="Links, portfolio, a note about why Fiaxe…"
            className={`resize-none ${fieldCls}`}
          />
        </label>

        <button
          type="submit"
          className="mt-1 rounded-xl bg-blue px-6 py-3.5 font-mono text-xs font-medium tracking-[0.14em] text-white uppercase transition-colors hover:bg-blue-bright"
        >
          Submit application →
        </button>

        {sent && (
          <p className="text-center text-sm text-muted" role="status">
            Opening your email client to send the application. Don&apos;t forget to{" "}
            <span className="text-cream">attach your resume</span> before sending, or email it to{" "}
            <a href="mailto:careers@fiaxe.com" className="text-cream underline underline-offset-4">
              careers@fiaxe.com
            </a>
            .
          </p>
        )}
      </form>
    </Reveal>
  );
}
