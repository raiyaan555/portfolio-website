"use client";

import Image from "next/image";
import { useState } from "react";
import type { Slide } from "@/lib/data";
import { personal } from "@/lib/data";

interface ScrollCardProps {
  slide: Slide;
  index: number;
}

const connectLayout = [
  { key: "linkedin", label: "LinkedIn", position: "top-left" as const },
  { key: "leetcode", label: "LeetCode", position: "top-right" as const },
  { key: "github", label: "GitHub", position: "bottom-left" as const },
  { key: "codeforces", label: "Codeforces", position: "bottom-right" as const },
];

const connectLinkClass =
  "text-[clamp(1.25rem,2.8vw,2.75rem)] font-bold tracking-tighter transition-opacity hover:opacity-50";

export default function ScrollCard({ slide }: ScrollCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard unavailable
    }
  };

  const isPhilosophy = slide.type === "philosophy";
  const isContact = slide.type === "contact";

  return (
    <article
      data-scroll-card
      data-cursor-hover
      className={`group relative flex h-[72vh] min-h-[480px] w-[88vw] max-w-[1100px] flex-shrink-0 flex-col theme-transition md:h-[68vh] md:w-[78vw] ${
        isPhilosophy
          ? "overflow-hidden bg-accent"
          : "card-shadow bg-surface overflow-y-auto overflow-x-hidden"
      } ${slide.type === "hero" ? "overflow-hidden" : ""}`}
      style={{ scrollSnapAlign: "center" }}
    >
      {slide.label && slide.type !== "hero" && (
        <p className="absolute -top-9 left-0 text-sm font-bold tracking-tight text-muted">
          {slide.label}
        </p>
      )}

      {isPhilosophy && (
        <div className="flex h-full w-full flex-col justify-center gap-1 p-8 md:p-12 lg:p-16">
          {slide.items?.map((mantra) => (
            <p
              key={mantra}
              className="text-[clamp(1.75rem,3.8vw,3.25rem)] font-bold leading-[1.08] tracking-tighter text-black"
            >
              {mantra}
            </p>
          ))}
        </div>
      )}

      {isContact && (
        <div className="relative h-full w-full min-h-[420px] p-8 md:p-12 lg:p-16">
          {connectLayout.map(({ key, label, position }) => (
            <a
              key={key}
              href={personal.links[key as keyof typeof personal.links]}
              target="_blank"
              rel="noopener noreferrer"
              className={`absolute ${connectLinkClass} ${
                position === "top-left"
                  ? "left-8 top-8 md:left-12 md:top-12"
                  : position === "top-right"
                    ? "right-8 top-8 md:right-12 md:top-12"
                    : position === "bottom-left"
                      ? "bottom-8 left-8 md:bottom-12 md:left-12"
                      : "bottom-8 right-8 md:bottom-12 md:right-12"
              }`}
              data-cursor-hover
            >
              {label}
            </a>
          ))}

          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="text-[clamp(2rem,5.5vw,4.5rem)] font-bold tracking-tighter transition-opacity hover:opacity-50"
              data-cursor-hover
            >
              Email
            </button>
            {copied && (
              <span className="copied-toast mt-3 text-sm font-bold text-muted">
                Copied
              </span>
            )}
          </div>
        </div>
      )}

      {!isPhilosophy && !isContact && (
        <div className="relative flex h-full w-full flex-col md:flex-row">
          {slide.type === "hero" && (
            <div
              className="pointer-events-none absolute -right-[10%] bottom-0 z-0 md:bottom-auto md:right-0 md:top-1/2 md:-translate-y-1/2 md:translate-x-[14%]"
              aria-hidden
            >
              <div className="h-[clamp(300px,52vw,640px)] w-[clamp(300px,52vw,640px)] rounded-full bg-accent" />
            </div>
          )}

          <div
            className={`relative z-10 flex flex-col justify-center p-8 md:p-12 lg:p-16 ${
              slide.type === "hero"
                ? "w-full md:w-[62%]"
                : slide.accent === "right"
                  ? "w-full md:w-[58%]"
                  : "w-full"
            }`}
          >
            {slide.type === "hero" && (
              <p className="hero-text-animate text-[clamp(1.75rem,4vw,3.25rem)] font-bold leading-[1.12] tracking-tighter text-foreground">
                {slide.body}
              </p>
            )}

            {slide.type === "project" && (
              <>
                {slide.tag && (
                  <p className="mb-4 text-xs font-bold uppercase tracking-widest text-muted">
                    {slide.tag}
                  </p>
                )}
                <h2 className="mb-4 text-[clamp(2.25rem,5.5vw,4.5rem)] font-bold leading-none tracking-tighter">
                  {slide.title}
                </h2>
                <p className="max-w-md text-lg leading-relaxed text-muted md:text-xl">
                  {slide.body}
                </p>
              </>
            )}

            {slide.type === "work" && (
              <>
                <h2 className="mb-6 text-[clamp(2rem,4.5vw,3.5rem)] font-bold tracking-tighter">
                  {slide.title}
                </h2>
                <ul className="flex flex-col gap-3">
                  {slide.items?.map((item) => (
                    <li
                      key={item}
                      className="text-base leading-relaxed text-muted md:text-lg"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          {slide.image && slide.accent === "right" && slide.type !== "hero" && (
            <div className="relative flex flex-shrink-0 items-center justify-center p-6 md:absolute md:right-0 md:top-1/2 md:z-0 md:-translate-y-1/2 md:p-0">
              {slide.type === "project" ? (
                <div className="preserve-media relative h-[200px] w-[200px] translate-x-4 md:h-[320px] md:w-[320px] md:translate-x-8 lg:h-[380px] lg:w-[380px]">
                  <Image
                    src={slide.image}
                    alt={slide.imageAlt ?? ""}
                    fill
                    className="object-contain transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                </div>
              ) : (
                <div className="preserve-media relative h-[240px] w-[240px] translate-x-4 opacity-60 lg:h-[280px] lg:w-[280px]">
                  <Image
                    src={slide.image}
                    alt={slide.imageAlt ?? ""}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </article>
  );
}
