"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import AppLink from "@/components/AppLink";

const TICK_COUNT = 52;

export interface ScrollNavCta {
  label: string;
  href: string;
  download?: string;
  external?: boolean;
}

interface PageScrollNavProps {
  sectionSelector?: string;
  sectionCount: number;
  ctas: ScrollNavCta[];
}

export default function PageScrollNav({
  sectionSelector = "[data-scroll-section]",
  sectionCount,
  ctas,
}: PageScrollNavProps) {
  const [lineY, setLineY] = useState(0);
  const [rulerY, setRulerY] = useState(0);
  const [fillRatio, setFillRatio] = useState(0);
  const rulerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);

  const updatePositions = useCallback(() => {
    const sections = document.querySelectorAll<HTMLElement>(sectionSelector);

    const scrollTop = window.scrollY;
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? scrollTop / maxScroll : 0;
    setFillRatio(progress);

    let nextLineY = window.innerHeight * 0.42;

    if (sections.length) {
      const viewportCenter = window.innerHeight * 0.42;
      let closest = 0;
      let closestDistance = Infinity;

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const center = rect.top + rect.height * 0.35;
        const distance = Math.abs(center - viewportCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closest = index;
        }
      });

      const active = sections[closest];
      const activeRect = active.getBoundingClientRect();
      nextLineY = activeRect.top + activeRect.height * 0.32;
    }

    const ruler = rulerRef.current;
    if (ruler) {
      const rulerRect = ruler.getBoundingClientRect();
      const relativeY = nextLineY - rulerRect.top;
      setRulerY(Math.max(0, Math.min(rulerRect.height, relativeY)));
    }

    setLineY(nextLineY);
  }, [sectionSelector]);

  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updatePositions);
    };

    updatePositions();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [updatePositions, sectionCount]);

  return (
    <>
      <div
        className="page-scroll-line pointer-events-none fixed left-0 right-0 z-40 h-[2px] bg-accent-red"
        style={{
          top: lineY,
          opacity: lineY > 0 ? 1 : 0,
        }}
      />

      <div
        className="page-scroll-cta-group fixed right-6 z-50 hidden flex-col gap-2 md:flex lg:right-10"
        style={{ top: lineY - (ctas.length > 1 ? 22 : 14) }}
      >
        {ctas.map((cta) => (
          <AppLink
            key={cta.label}
            href={cta.href}
            download={cta.download}
            target={cta.external ? "_blank" : undefined}
            rel={cta.external ? "noopener noreferrer" : undefined}
            className="page-scroll-cta whitespace-nowrap bg-accent-red px-4 py-2 text-[11px] font-bold tracking-wide text-white transition-opacity hover:opacity-80"
            data-cursor-hover
          >
            {cta.label}
          </AppLink>
        ))}
      </div>

      <aside className="fixed left-4 top-0 z-40 hidden h-screen w-10 md:left-8 md:block lg:left-12">
        <div ref={rulerRef} className="relative h-full py-32" aria-hidden>
          <div className="absolute bottom-0 left-[3px] top-0 w-px bg-foreground/12">
            <div
              className="absolute inset-x-0 top-0 bg-accent-red"
              style={{ height: `${fillRatio * 100}%` }}
            />
          </div>

          {Array.from({ length: TICK_COUNT }).map((_, i) => {
            const top = (i / (TICK_COUNT - 1)) * 100;
            const isMajor = i % 8 === 0;
            const isMid = i % 4 === 0;
            const width = isMajor ? 18 : isMid ? 12 : 7;

            return (
              <div
                key={i}
                className="absolute left-0 h-px bg-foreground/22 dark:bg-foreground/30"
                style={{
                  top: `${top}%`,
                  width,
                }}
              />
            );
          })}

          <div
            className="absolute left-0 transition-[top] duration-500 ease-out"
            style={{ top: rulerY }}
          >
            <div className="h-0 w-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-accent-red" />
          </div>
        </div>
      </aside>
    </>
  );
}
