"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import { personal } from "@/lib/data";
import { routes } from "@/lib/paths";

const navLinks = [
  { href: routes.work, label: "Work" },
  { href: routes.projects, label: "Projects" },
  { href: routes.resume, label: "Resume" },
  { href: routes.home, label: "Notes" },
];

function playClickSound() {
  try {
    const ctx = new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 800;
    osc.type = "sine";
    gain.gain.setValueAtTime(0.03, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.08);
  } catch {
    // Audio not available
  }
}

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-10">
      <div className="flex items-center gap-4 md:gap-5">
        <Link
          href={routes.home}
          className="text-base font-bold tracking-tight transition-opacity hover:opacity-50"
          data-cursor-hover
          onClick={playClickSound}
        >
          {personal.name}
        </Link>
        <ThemeToggle />
      </div>

      <div className="flex items-center gap-6 md:gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-base font-bold tracking-tight transition-opacity hover:opacity-50 ${
              pathname === link.href ? "text-foreground" : "text-muted"
            }`}
            data-cursor-hover
            onClick={playClickSound}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
