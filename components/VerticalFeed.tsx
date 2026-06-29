"use client";

import { useEffect, useRef } from "react";
import { slides } from "@/lib/data";
import ScrollCard from "@/components/ScrollCard";

interface VerticalFeedProps {
  onActiveIndexChange?: (index: number) => void;
}

export default function VerticalFeed({
  onActiveIndexChange,
}: VerticalFeedProps) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>(
      "[data-mobile-slide]"
    );
    if (!sections.length) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          const index = Number(visible[0].target.getAttribute("data-index"));
          if (!Number.isNaN(index)) {
            onActiveIndexChange?.(index);
          }
        }
      },
      { rootMargin: "-35% 0px -35% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((section) => observerRef.current?.observe(section));

    return () => observerRef.current?.disconnect();
  }, [onActiveIndexChange]);

  return (
    <main className="min-h-screen overflow-x-hidden overflow-y-auto px-4 pb-28 pt-24 md:hidden">
      <div className="mx-auto flex max-w-lg flex-col gap-12">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            id={`mobile-slide-${index}`}
            data-mobile-slide
            data-index={index}
            className="scroll-mt-28"
          >
            <ScrollCard slide={slide} layout="vertical" />
          </div>
        ))}
      </div>
    </main>
  );
}
