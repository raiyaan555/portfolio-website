"use client";

import { useState } from "react";
import AppLink from "@/components/AppLink";
import type { Slide } from "@/lib/data";
import { personal, liveProjects } from "@/lib/data";

const CARD =
  "h-[calc(100vh-3.75rem)] min-h-[420px] w-[94vw] max-w-[1280px] flex-shrink-0 sm:h-[calc(100vh-4rem)] sm:min-h-[480px] md:h-[78vh] md:min-h-[560px] md:w-[86vw]";

const connectLayout = [
  { key: "linkedin", label: "LinkedIn", position: "top-left" as const },
  { key: "leetcode", label: "LeetCode", position: "top-right" as const },
  { key: "github", label: "GitHub", position: "bottom-left" as const },
  { key: "codeforces", label: "Codeforces", position: "bottom-right" as const },
];

const connectTextClass =
  "text-[clamp(1rem,2.4vw,2.75rem)] font-bold tracking-tighter transition-opacity hover:opacity-50";

const mantraTextClass =
  "text-[clamp(1.35rem,calc(0.5rem+2.2vw),3.25rem)] font-bold leading-[1.08] tracking-tighter text-black";

const heroTextClass =
  "hero-text-animate text-[clamp(2.75rem,calc(1rem+3.5vw),5rem)] font-bold leading-[1.1] tracking-tighter text-foreground";

function CardLabel({ label }: { label?: string }) {
  return (
    <div className="mb-2 flex h-6 items-end sm:mb-3 sm:h-7">
      {label && (
        <p className="text-xs font-bold tracking-tight text-muted sm:text-sm">
          {label}
        </p>
      )}
    </div>
  );
}

function CardInner({
  slide,
  children,
  className,
}: {
  slide: Slide;
  children: React.ReactNode;
  className: string;
}) {
  const article = (
    <article
      data-scroll-card
      data-cursor-hover
      className={className}
      style={{ scrollSnapAlign: "center" }}
    >
      {children}
    </article>
  );

  if (slide.href) {
    return (
      <AppLink
        href={slide.href}
        className="block transition-opacity hover:opacity-90"
        data-cursor-hover
      >
        {article}
      </AppLink>
    );
  }

  return article;
}

function BoldCircleText({
  text,
  circleColor,
  textClassName = "text-foreground",
}: {
  text: string;
  circleColor: "yellow" | "red";
  textClassName?: string;
}) {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <div className="relative flex items-center justify-center">
        <span
          className={`slide-heavy-text relative z-0 select-none whitespace-nowrap text-[clamp(3rem,18vw,22rem)] leading-[0.8] tracking-tighter ${textClassName}`}
        >
          {text}
        </span>
        <div
          className={`relative z-10 -ml-[6vw] h-[clamp(4.5rem,26vw,28rem)] w-[clamp(4.5rem,26vw,28rem)] flex-shrink-0 rounded-full ${
            circleColor === "yellow" ? "bg-accent" : "bg-accent-red"
          }`}
          aria-hidden
        />
      </div>
    </div>
  );
}

export default function ScrollCard({ slide }: { slide: Slide }) {
  const [copied, setCopied] = useState(false);

  const isHero = slide.type === "hero";
  const isPhilosophy = slide.type === "philosophy";
  const isContact = slide.type === "contact";
  const featuredProject = liveProjects[0];

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard unavailable
    }
  };

  return (
    <div className="flex flex-shrink-0 flex-col">
      <CardLabel label={isHero ? undefined : slide.label} />

      <CardInner
        slide={slide}
        className={`group relative flex flex-col overflow-hidden theme-transition ${CARD} ${
          isPhilosophy
            ? "bg-accent"
            : slide.type === "resume"
              ? "bg-accent"
              : "card-shadow bg-surface"
        } ${isHero ? "" : ""}`}
      >
        {isPhilosophy && (
          <div className="flex h-full w-full flex-col justify-center gap-0.5 overflow-y-auto p-5 sm:gap-1 sm:p-8 md:p-12 lg:p-16">
            {slide.items?.map((mantra) => (
              <p key={mantra} className={mantraTextClass}>
                {mantra}
              </p>
            ))}
          </div>
        )}

        {isContact && (
          <div className="relative h-full min-h-0 w-full p-5 sm:p-8 md:p-12 lg:p-16">
            {connectLayout.map(({ key, label, position }) => (
              <a
                key={key}
                href={personal.links[key as keyof typeof personal.links]}
                target="_blank"
                rel="noopener noreferrer"
                className={`absolute ${connectTextClass} ${
                  position === "top-left"
                    ? "top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 lg:top-12 lg:left-12"
                    : position === "top-right"
                      ? "top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 lg:top-12 lg:right-12"
                      : position === "bottom-left"
                        ? "bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8 lg:bottom-12 lg:left-12"
                        : "right-4 bottom-4 sm:right-6 sm:bottom-6 md:right-8 md:bottom-8 lg:right-12 lg:bottom-12"
                }`}
                data-cursor-hover
              >
                {label}
              </a>
            ))}

            <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="text-[clamp(1.5rem,5vw,4.5rem)] font-bold tracking-tighter transition-opacity hover:opacity-50"
                data-cursor-hover
              >
                Email
              </button>
              {copied && (
                <span className="copied-toast mt-2 text-xs font-bold text-muted sm:mt-3 sm:text-sm">
                  Copied
                </span>
              )}
            </div>
          </div>
        )}

        {slide.type === "live-projects" && (
          <BoldCircleText
            text={featuredProject.title}
            circleColor="yellow"
          />
        )}

        {slide.type === "work" && (
          <BoldCircleText text="Work" circleColor="red" />
        )}

        {slide.type === "resume" && (
          <BoldCircleText
            text="Resume"
            circleColor="red"
            textClassName="text-black"
          />
        )}

        {isHero && (
          <div className="relative flex h-full w-full flex-row">
            <div className="relative z-10 flex w-[58%] flex-col justify-center p-5 sm:w-[60%] sm:p-6 md:w-[62%] md:p-12 lg:p-16">
              <p className={heroTextClass}>{slide.body}</p>
            </div>

            <div
              className="pointer-events-none absolute top-1/2 -right-[12%] z-0 -translate-y-1/2 translate-x-[10%] sm:-right-[10%] sm:translate-x-[12%] md:translate-x-[14%]"
              aria-hidden
            >
              <div className="h-[clamp(9rem,44vw,40rem)] w-[clamp(9rem,44vw,40rem)] rounded-full bg-accent" />
            </div>
          </div>
        )}
      </CardInner>
    </div>
  );
}
