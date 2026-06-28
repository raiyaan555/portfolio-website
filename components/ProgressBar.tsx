"use client";

import { slides } from "@/lib/data";

interface ProgressBarProps {
  activeIndex: number;
  onIndexClick?: (index: number) => void;
}

const TICK_GAP = 6;
const TICK_WIDTH = 2;
const INDICATOR_WIDTH = 20;
const INDICATOR_HEIGHT = 24;
const TICK_HEIGHT = 22;

export default function ProgressBar({
  activeIndex,
  onIndexClick,
}: ProgressBarProps) {
  const indicatorLeft =
    activeIndex * (TICK_WIDTH + TICK_GAP) -
    (INDICATOR_WIDTH - TICK_WIDTH) / 2;

  return (
    <div className="fixed top-[56px] left-1/2 z-[60] -translate-x-1/2">
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
