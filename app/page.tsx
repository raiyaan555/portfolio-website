"use client";

import { useState, useRef } from "react";
import Nav from "@/components/Nav";
import HorizontalScroll, {
  type HorizontalScrollHandle,
} from "@/components/HorizontalScroll";
import ProgressBar from "@/components/ProgressBar";
import HeroReveal from "@/components/HeroReveal";
import Credits from "@/components/Credits";

export default function HomePage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HorizontalScrollHandle>(null);

  return (
    <HeroReveal>
      <Nav />
      <ProgressBar
        activeIndex={activeIndex}
        onIndexClick={(index) => scrollRef.current?.scrollToIndex(index)}
      />
      <main className="h-screen overflow-hidden">
        <HorizontalScroll
          ref={scrollRef}
          onActiveIndexChange={setActiveIndex}
        />
      </main>
      <Credits />
    </HeroReveal>
  );
}
