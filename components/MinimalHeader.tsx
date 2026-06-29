"use client";

import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import { personal } from "@/lib/data";

export default function MinimalHeader() {
  return (
    <header className="fixed top-0 left-0 z-50 flex items-center gap-4 px-6 py-5 md:gap-5 md:px-10">
      <Link
        href="/"
        className="flex items-center gap-3 text-base font-bold tracking-tight transition-opacity hover:opacity-50"
        data-cursor-hover
      >
        <span
          className="h-3 w-3 flex-shrink-0 rounded-full bg-[#FF6B00]"
          aria-hidden
        />
        {personal.name}
      </Link>
      <ThemeToggle />
    </header>
  );
}
