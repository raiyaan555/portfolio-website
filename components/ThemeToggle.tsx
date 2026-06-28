"use client";

import { useTheme } from "@/components/ThemeProvider";

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M21 14.5A8.5 8.5 0 1 1 11.5 5a6.5 6.5 0 1 0 9.5 9.5z" />
    </svg>
  );
}

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-checked={isDark}
      onClick={toggleTheme}
      className="relative inline-flex h-7 w-[3.25rem] flex-shrink-0 items-center rounded-full toggle-track transition-all duration-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.16)] dark:hover:shadow-[0_4px_18px_rgba(0,0,0,0.65)]"
      data-cursor-hover
    >
      <SunIcon
        className={`pointer-events-none absolute left-2 text-foreground/35 transition-opacity duration-300 ${
          isDark ? "opacity-30" : "opacity-90"
        }`}
      />
      <MoonIcon
        className={`pointer-events-none absolute right-2 text-foreground/35 transition-opacity duration-300 ${
          isDark ? "opacity-90" : "opacity-30"
        }`}
      />

      <span
        className={`absolute top-0.5 flex h-6 w-6 items-center justify-center rounded-full toggle-thumb text-foreground transition-transform duration-300 ease-out ${
          isDark ? "translate-x-[26px]" : "translate-x-0.5"
        }`}
      >
        {isDark ? (
          <MoonIcon className="text-foreground" />
        ) : (
          <SunIcon className="text-foreground" />
        )}
      </span>
    </button>
  );
}
