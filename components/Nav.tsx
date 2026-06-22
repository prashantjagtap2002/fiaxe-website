"use client";

import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

// In-page sections on the home route.
const SCROLL_LINKS = [
  { label: "What We Build", href: "/#what-we-build" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "FAQ", href: "/#faq" },
];

// Dedicated routes.
const PAGE_LINKS = [
  { label: "Pricing", href: "/pricing" },
  { label: "Agents", href: "/agents" },
  { label: "Careers", href: "/careers" },
];

export function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  const linkBase =
    "px-2 py-2 font-mono text-[11px] tracking-[0.02em] transition-colors hover:text-cream";

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.21, 0.5, 0.2, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-line bg-ink/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-5 md:px-8">
        <Link href="/" aria-label="Fiaxe home" className="shrink-0">
          <Logo />
        </Link>

        {/* full nav, only on very wide screens given the link count */}
        <div className="hidden items-center xl:flex">
          {SCROLL_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={`${linkBase} text-muted`}>
              {l.label}
            </Link>
          ))}
          <span className="mx-1 h-3 w-px bg-line-bright" />
          {PAGE_LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`${linkBase} ${active ? "font-medium text-blue" : "text-muted"}`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <ThemeToggle />
          <Link
            href="/book-demo"
            className="hidden rounded-full bg-blue px-4 py-2.5 font-mono text-[11px] tracking-[0.12em] text-white uppercase shadow-sm transition-colors hover:bg-blue-bright sm:block"
          >
            Book Demo
          </Link>

          <button
            className="flex flex-col gap-1.5 p-2 xl:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className={`h-0.5 w-6 bg-cream transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-0.5 w-6 bg-cream transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-6 bg-cream transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      {open && (
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-line bg-ink px-5 py-4 xl:hidden">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="block px-2 py-2.5 font-mono text-sm text-cream"
          >
            Home
          </Link>
          <p className="mt-3 px-2 font-mono text-[10px] tracking-[0.2em] text-faint uppercase">On this page</p>
          {SCROLL_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block px-2 py-2.5 font-mono text-sm text-muted hover:text-cream"
            >
              {l.label}
            </Link>
          ))}
          <p className="mt-3 px-2 font-mono text-[10px] tracking-[0.2em] text-faint uppercase">More</p>
          {PAGE_LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`block px-2 py-2.5 font-mono text-sm ${
                  active ? "font-medium text-blue" : "text-muted hover:text-cream"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <Link
            href="/book-demo"
            onClick={() => setOpen(false)}
            className="mt-3 block rounded-full bg-blue px-5 py-3 text-center font-mono text-xs tracking-[0.15em] text-white uppercase"
          >
            Book Demo
          </Link>
        </div>
      )}
    </motion.header>
  );
}
