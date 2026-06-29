"use client";

import { useState, useRef, useCallback } from "react";
import MinimalHeader from "@/components/MinimalHeader";
import HorizontalScroll, {
  type HorizontalScrollHandle,
} from "@/components/HorizontalScroll";
import VerticalFeed from "@/components/VerticalFeed";
import ProgressBar from "@/components/ProgressBar";
import HeroReveal from "@/components/HeroReveal";
import Credits from "@/components/Credits";

export default function HomePage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HorizontalScrollHandle>(null);

  const handleProgressClick = useCallback((index: number) => {
    scrollRef.current?.scrollToIndex(index);

    const mobileSlide = document.getElementById(`mobile-slide-${index}`);
    mobileSlide?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  return (
    <HeroReveal>
      <MinimalHeader />
      <ProgressBar
        activeIndex={activeIndex}
        onIndexClick={handleProgressClick}
      />

      <div className="hidden md:block">
        <main className="h-screen overflow-hidden">
          <HorizontalScroll
            ref={scrollRef}
            onActiveIndexChange={setActiveIndex}
            enableScrollZoom
          />
        </main>
      </div>

      <VerticalFeed onActiveIndexChange={setActiveIndex} />

      <Credits />
    </HeroReveal>
  );
}
