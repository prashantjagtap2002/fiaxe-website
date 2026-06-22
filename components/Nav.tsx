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

  // The home route has a dark photographic hero behind the (transparent) nav.
  // While we're over it, the nav contents render white; once scrolled into the
  // solid panel they return to the theme colour.
  const overHero = pathname === "/" && !scrolled;

  const linkBase = "px-3.5 py-2 text-[15px] font-medium transition-colors";
  const linkColor = overHero
    ? "text-white/80 hover:text-white"
    : "text-cream hover:text-blue";
  const barColor = overHero ? "bg-white" : "bg-cream";

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
      <nav className="relative mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-5 md:px-8">
        <Link
          href="/"
          aria-label="Fiaxe home"
          className={`shrink-0 ${overHero ? "text-white" : "text-cream"}`}
        >
          <Logo />
        </Link>

        {/* full nav, only on very wide screens given the link count */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center xl:flex">
          {[...SCROLL_LINKS, ...PAGE_LINKS].map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`${linkBase} ${active ? "text-blue" : linkColor}`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <ThemeToggle light={overHero} />
          <Link
            href="/book-demo"
            className="hidden rounded-full bg-blue px-5 py-2 text-[14px] font-medium text-white shadow-sm transition-colors hover:bg-blue-bright sm:block"
          >
            Book Demo
          </Link>

          <button
            className="flex flex-col gap-1.5 p-2 xl:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className={`h-0.5 w-6 ${barColor} transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-0.5 w-6 ${barColor} transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-6 ${barColor} transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      {open && (
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-line bg-ink px-5 py-4 xl:hidden">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="block px-2 py-2.5 text-[15px] font-medium text-cream"
          >
            Home
          </Link>
          <p className="mt-3 px-2 font-mono text-[10px] tracking-[0.2em] text-faint uppercase">On this page</p>
          {SCROLL_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block px-2 py-2.5 text-[15px] text-muted hover:text-cream"
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
                className={`block px-2 py-2.5 text-[15px] ${
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
            className="mt-3 block rounded-full bg-blue px-5 py-3 text-center text-[15px] font-medium text-white"
          >
            Book Demo
          </Link>
        </div>
      )}
    </motion.header>
  );
}
