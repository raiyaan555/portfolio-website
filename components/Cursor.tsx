"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const isTouch =
      window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;
    if (isTouch) {
      el.style.display = "none";
      return;
    }

    let raf = 0;

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.18;
      current.current.y += (target.current.y - current.current.y) * 0.18;
      el.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed top-0 left-0 z-[9999]"
      aria-hidden
    >
      <div className="relative h-4 w-4">
        <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-foreground" />
        <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-foreground" />
      </div>
    </div>
  );
}
