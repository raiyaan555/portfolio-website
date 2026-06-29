"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import MinimalHeader from "@/components/MinimalHeader";
import HorizontalScroll, {
  type HorizontalScrollHandle,
} from "@/components/HorizontalScroll";
import HeroReveal from "@/components/HeroReveal";
import Credits from "@/components/Credits";

export default function HomePage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HorizontalScrollHandle>(null);

  const handleProgressClick = useCallback((index: number) => {
    scrollRef.current?.scrollToIndex(index);
  }, []);

  useEffect(() => {
    const { documentElement: html, body } = document;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
    };
  }, []);

  return (
    <HeroReveal>
      <MinimalHeader
        activeIndex={activeIndex}
        onIndexClick={handleProgressClick}
      />

      <main className="h-screen overflow-hidden">
        <HorizontalScroll
          ref={scrollRef}
          onActiveIndexChange={setActiveIndex}
          enableScrollZoom
        />
      </main>

      <Credits />
    </HeroReveal>
  );
}
