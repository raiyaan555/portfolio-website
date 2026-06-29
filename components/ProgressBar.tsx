"use client";

import { slides } from "@/lib/data";

interface ProgressBarProps {
  activeIndex: number;
  onIndexClick?: (index: number) => void;
}

const TICK_GAP = 8;
const TICK_WIDTH = 2.5;
const INDICATOR_WIDTH = 26;
const INDICATOR_HEIGHT = 34;
const TICK_HEIGHT = 32;

export default function ProgressBar({
  activeIndex,
  onIndexClick,
}: ProgressBarProps) {
  const indicatorLeft =
    activeIndex * (TICK_WIDTH + TICK_GAP) -
    (INDICATOR_WIDTH - TICK_WIDTH) / 2;

  return (
    <div className="fixed top-[52px] left-1/2 z-[60] -translate-x-1/2 scale-[0.85] md:top-[56px] md:scale-100">
      <div
        className="relative flex items-end"
        style={{ gap: TICK_GAP, height: INDICATOR_HEIGHT }}
      >
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`Go to ${slide.label ?? slide.title ?? slide.id}`}
            onClick={() => onIndexClick?.(i)}
            className="progress-tick transition-colors duration-300"
            style={{ width: TICK_WIDTH, height: TICK_HEIGHT }}
            data-cursor-hover
          />
        ))}

        <div
          className="progress-indicator pointer-events-none absolute bottom-0"
          style={{
            width: INDICATOR_WIDTH,
            height: INDICATOR_HEIGHT,
            left: indicatorLeft,
          }}
        />
      </div>
    </div>
  );
}
