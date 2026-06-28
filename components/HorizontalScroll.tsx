"use client";

import {
  useEffect,
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import { slides } from "@/lib/data";
import ScrollCard from "@/components/ScrollCard";

export interface HorizontalScrollHandle {
  scrollToIndex: (index: number) => void;
}

interface HorizontalScrollProps {
  onActiveIndexChange?: (index: number) => void;
  onScrollProgressChange?: (progress: number) => void;
}

const LERP = 0.075;
const WHEEL_SENSITIVITY = 1.1;
const MOMENTUM_DECAY = 0.94;
const MOMENTUM_THRESHOLD = 0.15;

const HorizontalScroll = forwardRef<
  HorizontalScrollHandle,
  HorizontalScrollProps
>(function HorizontalScroll(
  { onActiveIndexChange, onScrollProgressChange },
  ref
) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const targetX = useRef(0);
  const currentX = useRef(0);
  const velocity = useRef(0);
  const rafRef = useRef(0);
  const maxScrollRef = useRef(0);
  const isAnimatingToIndex = useRef(false);

  const getCardOffsets = useCallback(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return [];

    const cards = track.querySelectorAll<HTMLElement>("[data-scroll-card]");
    const viewportLeft = viewport.getBoundingClientRect().left;

    return Array.from(cards).map((card) => {
      const cardLeft = card.getBoundingClientRect().left - viewportLeft;
      const centered =
        card.offsetLeft - (viewport.clientWidth - card.offsetWidth) / 2;
      return Math.max(0, centered);
    });
  }, []);

  const getMetrics = useCallback(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return { maxScroll: 0, step: 1 };

    const maxScroll = Math.max(0, track.scrollWidth - viewport.clientWidth);
    maxScrollRef.current = maxScroll;

    const cards = track.querySelectorAll<HTMLElement>("[data-scroll-card]");
    const step =
      cards.length > 1
        ? cards[1].offsetLeft - cards[0].offsetLeft
        : cards[0]?.offsetWidth ?? 800;

    return { maxScroll, step };
  }, []);

  const clampTarget = useCallback((value: number) => {
    return Math.max(0, Math.min(maxScrollRef.current, value));
  }, []);

  const updateScrollState = useCallback(() => {
    const { step, maxScroll } = getMetrics();
    if (step <= 0) return;

    const index = Math.round(currentX.current / step);
    const clamped = Math.max(0, Math.min(slides.length - 1, index));
    onActiveIndexChange?.(clamped);

    const progress = maxScroll > 0 ? currentX.current / maxScroll : 0;
    onScrollProgressChange?.(progress);
  }, [getMetrics, onActiveIndexChange, onScrollProgressChange]);

  const applyTransform = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transform = `translate3d(-${currentX.current}px, 0, 0)`;
  }, []);

  useImperativeHandle(ref, () => ({
    scrollToIndex: (index: number) => {
      const offsets = getCardOffsets();
      const target = offsets[index];
      if (target === undefined) return;

      isAnimatingToIndex.current = true;
      targetX.current = clampTarget(target);
      velocity.current = 0;
    },
  }));

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const tick = () => {
      if (!isAnimatingToIndex.current && Math.abs(velocity.current) > MOMENTUM_THRESHOLD) {
        targetX.current = clampTarget(targetX.current + velocity.current);
        velocity.current *= MOMENTUM_DECAY;
      }

      const delta = targetX.current - currentX.current;

      if (Math.abs(delta) > 0.05) {
        currentX.current += delta * LERP;
        applyTransform();
        updateScrollState();
      } else if (Math.abs(delta) > 0) {
        currentX.current = targetX.current;
        applyTransform();
        updateScrollState();
        isAnimatingToIndex.current = false;
      } else {
        isAnimatingToIndex.current = false;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;

      e.preventDefault();
      isAnimatingToIndex.current = false;
      velocity.current += e.deltaY * WHEEL_SENSITIVITY * 0.12;
      targetX.current = clampTarget(targetX.current + e.deltaY * WHEEL_SENSITIVITY * 0.35);
    };

    const handleResize = () => {
      getMetrics();
      targetX.current = clampTarget(targetX.current);
      currentX.current = clampTarget(currentX.current);
      applyTransform();
      updateScrollState();
    };

    rafRef.current = requestAnimationFrame(tick);
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("resize", handleResize);
    getMetrics();
    updateScrollState();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", handleResize);
    };
  }, [
    applyTransform,
    clampTarget,
    getCardOffsets,
    getMetrics,
    updateScrollState,
  ]);

  return (
    <div
      ref={viewportRef}
      className="flex h-screen w-full items-center overflow-hidden pt-12"
    >
      <div
        ref={trackRef}
        className="flex items-center gap-5 px-[6vw] pb-8 will-change-transform"
        style={{ transition: "none" }}
      >
        {slides.map((slide, index) => (
          <ScrollCard key={slide.id} slide={slide} index={index} />
        ))}
      </div>
    </div>
  );
});

export default HorizontalScroll;
