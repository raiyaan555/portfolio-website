"use client";

import Link from "next/link";
import ProgressBar from "@/components/ProgressBar";
import ThemeToggle from "@/components/ThemeToggle";
import { personal } from "@/lib/data";
import { routes } from "@/lib/paths";

interface MinimalHeaderProps {
  activeIndex?: number;
  onIndexClick?: (index: number) => void;
}

export default function MinimalHeader({
  activeIndex,
  onIndexClick,
}: MinimalHeaderProps) {
  const showProgress =
    activeIndex !== undefined && onIndexClick !== undefined;

  return (
    <header className="fixed top-0 right-0 left-0 z-50 grid grid-cols-[auto_1fr_auto] items-center gap-1 px-3 py-2.5 sm:gap-2 sm:px-5 sm:py-3 md:gap-4 md:px-10 md:py-5">
      <Link
        href={routes.home}
        className="flex min-w-0 items-center gap-2 text-sm font-bold tracking-tight whitespace-nowrap transition-opacity hover:opacity-50 sm:gap-2.5 sm:text-base"
        data-cursor-hover
      >
        <span
          className="h-2.5 w-2.5 flex-shrink-0 rounded-full bg-[#FF6B00] sm:h-3 sm:w-3"
          aria-hidden
        />
        <span className="truncate">{personal.name}</span>
      </Link>

      {showProgress ? (
        <div className="flex min-w-0 justify-center overflow-hidden">
          <ProgressBar activeIndex={activeIndex} onIndexClick={onIndexClick} />
        </div>
      ) : (
        <div aria-hidden />
      )}

      <div className="flex justify-end">
        <ThemeToggle />
      </div>
    </header>
  );
}
