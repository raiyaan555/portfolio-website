"use client";

import { useEffect, useState } from "react";

export default function HeroReveal({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    setShowOverlay(true);
    const timer = setTimeout(() => setShowOverlay(false), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {children}
      {showOverlay && (
        <div
          className="hero-reveal-overlay pointer-events-none fixed inset-0 z-[100] bg-background"
          aria-hidden
        />
      )}
    </>
  );
}
