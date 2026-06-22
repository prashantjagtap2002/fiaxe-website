"use client";

import { useRef, useSyncExternalStore } from "react";

type Theme = "light" | "dark";

// The DOM `data-theme` attribute is the source of truth (set before paint by
// the inline script in layout.tsx). We subscribe to it instead of holding our
// own state, so the icon always reflects the real theme without a flash.
function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  window.addEventListener("storage", callback);
  return () => {
    observer.disconnect();
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot(): Theme {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

function getServerSnapshot(): Theme {
  return "light";
}

export function ThemeToggle({
  className = "",
  light = false,
}: {
  className?: string;
  /* render light (for sitting over the dark hero image) */
  light?: boolean;
}) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const isDark = theme === "dark";

  function applyTheme(next: Theme) {
    // Mutating the attribute notifies the MutationObserver above, which
    // re-renders this component with the new theme.
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage unavailable, ignore */
    }
  }

  function toggle() {
    const next: Theme = isDark ? "light" : "dark";

    const prefersReduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // No View Transitions support (or reduced motion) → swap instantly.
    if (prefersReduced || typeof document.startViewTransition !== "function") {
      applyTheme(next);
      return;
    }

    // Circle origin = center of the toggle button.
    const rect = btnRef.current?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth - 40;
    const y = rect ? rect.top + rect.height / 2 : 40;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = document.startViewTransition(() => applyTheme(next));

    transition.ready
      .then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 500,
            easing: "ease-in-out",
            pseudoElement: "::view-transition-new(root)",
          },
        );
      })
      .catch(() => {
        /* transition aborted, theme already applied */
      });
  }

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={`grid size-9 place-items-center rounded-full border transition-colors ${
        light
          ? "border-white/40 text-white hover:border-white"
          : "border-line-bright text-cream hover:border-cream"
      } ${className}`}
    >
      {isDark ? (
        // sun
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      ) : (
        // moon
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
        </svg>
      )}
    </button>
  );
}
