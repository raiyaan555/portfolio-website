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
  enableScrollZoom?: boolean;
}

const LERP = 0.075;
const WHEEL_SENSITIVITY = 1.1;
const MOMENTUM_DECAY = 0.94;
const MOMENTUM_THRESHOLD = 0.15;

const MIN_SCALE = 0.84;
const SCALE_SPRING_STIFFNESS = 88;
const SCALE_SPRING_DAMPING = 18.5;
const BOOST_SPRING_STIFFNESS = 175;
const BOOST_SPRING_DAMPING = 26;
const BOOST_VELOCITY_FACTOR = 0.00052;
const MAX_VELOCITY_BOOST = 0.048;

function integrateSpring(
  position: number,
  velocity: number,
  target: number,
  stiffness: number,
  damping: number,
  dt: number
) {
  const step = Math.min(Math.max(dt, 0.001), 0.032);
  const acceleration = stiffness * (target - position) - damping * velocity;
  const nextVelocity = velocity + acceleration * step;
  const nextPosition = position + nextVelocity * step;
  return { position: nextPosition, velocity: nextVelocity };
}

const HorizontalScroll = forwardRef<
  HorizontalScrollHandle,
  HorizontalScrollProps
>(function HorizontalScroll(
  { onActiveIndexChange, onScrollProgressChange, enableScrollZoom = false },
  ref
) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const scaleLayerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const targetX = useRef(0);
  const currentX = useRef(0);
  const scrollVelocity = useRef(0);
  const rafRef = useRef(0);
  const maxScrollRef = useRef(0);
  const isAnimatingToIndex = useRef(false);
  const enableScrollZoomRef = useRef(enableScrollZoom);
  const lastFrameTime = useRef(0);

  const scalePosition = useRef(1);
  const scaleVelocity = useRef(0);
  const boostPosition = useRef(0);
  const boostVelocity = useRef(0);
  const touchLastX = useRef(0);
  const touchActive = useRef(false);

  const getCardOffsets = useCallback(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return [];

    const cards = track.querySelectorAll<HTMLElement>("[data-scroll-card]");

    return Array.from(cards).map((card) => {
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

  const applyScale = useCallback(() => {
    const layer = scaleLayerRef.current;
    if (!layer) return;
    layer.style.transform = `scale3d(${scalePosition.current}, ${scalePosition.current}, 1)`;
  }, []);

  const updateScrollIndex = useCallback(() => {
    const { step, maxScroll } = getMetrics();
    if (step <= 0) return;

    const index = Math.round(currentX.current / step);
    const clamped = Math.max(0, Math.min(slides.length - 1, index));
    onActiveIndexChange?.(clamped);

    const progress = maxScroll > 0 ? currentX.current / maxScroll : 0;
    onScrollProgressChange?.(progress);
  }, [getMetrics, onActiveIndexChange, onScrollProgressChange]);

  const stepCameraZoom = useCallback(
    (dt: number) => {
      if (!enableScrollZoomRef.current) {
        const settle = integrateSpring(
          scalePosition.current,
          scaleVelocity.current,
          1,
          SCALE_SPRING_STIFFNESS,
          SCALE_SPRING_DAMPING,
          dt
        );
        scalePosition.current = settle.position;
        scaleVelocity.current = settle.velocity;

        const boostSettle = integrateSpring(
          boostPosition.current,
          boostVelocity.current,
          0,
          BOOST_SPRING_STIFFNESS,
          BOOST_SPRING_DAMPING,
          dt
        );
        boostPosition.current = boostSettle.position;
        boostVelocity.current = boostSettle.velocity;

        applyScale();
        return;
      }

      const { maxScroll } = getMetrics();
      const progress = maxScroll > 0 ? currentX.current / maxScroll : 0;
      const positionTarget = 1 + progress * (MIN_SCALE - 1);

      const speed = Math.abs(scrollVelocity.current);
      let boostTarget = 0;
      if (speed > MOMENTUM_THRESHOLD) {
        const magnitude = Math.min(
          speed * BOOST_VELOCITY_FACTOR,
          MAX_VELOCITY_BOOST
        );
        boostTarget =
          scrollVelocity.current > 0 ? magnitude : -magnitude * 0.58;
      }

      const boost = integrateSpring(
        boostPosition.current,
        boostVelocity.current,
        boostTarget,
        BOOST_SPRING_STIFFNESS,
        BOOST_SPRING_DAMPING,
        dt
      );
      boostPosition.current = boost.position;
      boostVelocity.current = boost.velocity;

      const scaleTarget = Math.max(
        MIN_SCALE - MAX_VELOCITY_BOOST,
        Math.min(1, positionTarget - boostPosition.current)
      );

      const scale = integrateSpring(
        scalePosition.current,
        scaleVelocity.current,
        scaleTarget,
        SCALE_SPRING_STIFFNESS,
        SCALE_SPRING_DAMPING,
        dt
      );
      scalePosition.current = scale.position;
      scaleVelocity.current = scale.velocity;

      applyScale();
    },
    [applyScale, getMetrics]
  );

  useEffect(() => {
    enableScrollZoomRef.current = enableScrollZoom;
  }, [enableScrollZoom]);

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
      scrollVelocity.current = 0;
    },
  }));

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    lastFrameTime.current = performance.now();

    const tick = (now: number) => {
      const dt = (now - lastFrameTime.current) / 1000;
      lastFrameTime.current = now;

      if (
        !isAnimatingToIndex.current &&
        Math.abs(scrollVelocity.current) > MOMENTUM_THRESHOLD
      ) {
        targetX.current = clampTarget(
          targetX.current + scrollVelocity.current
        );
        scrollVelocity.current *= MOMENTUM_DECAY;
      }

      const delta = targetX.current - currentX.current;

      if (Math.abs(delta) > 0.05) {
        currentX.current += delta * LERP;
        applyTransform();
        updateScrollIndex();
      } else if (Math.abs(delta) > 0) {
        currentX.current = targetX.current;
        applyTransform();
        updateScrollIndex();
        isAnimatingToIndex.current = false;
      } else {
        isAnimatingToIndex.current = false;
        updateScrollIndex();
      }

      stepCameraZoom(dt);

      rafRef.current = requestAnimationFrame(tick);
    };

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;

      e.preventDefault();
      isAnimatingToIndex.current = false;
      scrollVelocity.current += e.deltaY * WHEEL_SENSITIVITY * 0.12;
      targetX.current = clampTarget(
        targetX.current + e.deltaY * WHEEL_SENSITIVITY * 0.35
      );
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      touchActive.current = true;
      touchLastX.current = e.touches[0].clientX;
      isAnimatingToIndex.current = false;
      scrollVelocity.current = 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchActive.current || e.touches.length !== 1) return;

      e.preventDefault();
      const x = e.touches[0].clientX;
      const delta = touchLastX.current - x;
      touchLastX.current = x;
      targetX.current = clampTarget(targetX.current + delta * 1.15);
      scrollVelocity.current = delta * 0.9;
    };

    const handleTouchEnd = () => {
      touchActive.current = false;
    };

    const handleResize = () => {
      getMetrics();
      targetX.current = clampTarget(targetX.current);
      currentX.current = clampTarget(currentX.current);
      applyTransform();
      updateScrollIndex();
    };

    rafRef.current = requestAnimationFrame(tick);
    window.addEventListener("wheel", handleWheel, { passive: false });
    viewport.addEventListener("touchstart", handleTouchStart, { passive: true });
    viewport.addEventListener("touchmove", handleTouchMove, { passive: false });
    viewport.addEventListener("touchend", handleTouchEnd, { passive: true });
    viewport.addEventListener("touchcancel", handleTouchEnd, { passive: true });
    window.addEventListener("resize", handleResize);
    getMetrics();
    updateScrollIndex();
    applyScale();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("wheel", handleWheel);
      viewport.removeEventListener("touchstart", handleTouchStart);
      viewport.removeEventListener("touchmove", handleTouchMove);
      viewport.removeEventListener("touchend", handleTouchEnd);
      viewport.removeEventListener("touchcancel", handleTouchEnd);
      window.removeEventListener("resize", handleResize);
    };
  }, [
    applyScale,
    applyTransform,
    clampTarget,
    getCardOffsets,
    getMetrics,
    stepCameraZoom,
    updateScrollIndex,
  ]);

  return (
    <div
      ref={viewportRef}
      className="flex h-screen w-full touch-pan-x items-center overflow-hidden pt-11 sm:pt-12 md:pt-14"
      style={{ touchAction: "pan-x" }}
    >
      <div
        ref={scaleLayerRef}
        className="flex h-full w-full origin-center items-center will-change-transform"
        style={{ transform: "scale3d(1, 1, 1)" }}
      >
        <div
          ref={trackRef}
          className="flex items-center gap-6 px-[3vw] will-change-transform sm:gap-8 md:gap-10 md:px-[4vw] lg:gap-12"
          style={{ transition: "none" }}
        >
          {slides.map((slide) => (
            <ScrollCard key={slide.id} slide={slide} />
          ))}
        </div>
      </div>
    </div>
  );
});

export default HorizontalScroll;
