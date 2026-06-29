"use client";

import { useState } from "react";
import AppLink from "@/components/AppLink";
import type { Slide } from "@/lib/data";
import { personal, liveProjects } from "@/lib/data";

const CARD =
  "flex-shrink-0 max-md:h-[calc(100dvh-5rem)] max-md:w-[92vw] max-md:max-w-none md:h-[78vh] md:min-h-[560px] md:w-[86vw] md:max-w-[1280px]";

const connectLayout = [
  { key: "linkedin", label: "LinkedIn", position: "top-left" as const },
  { key: "leetcode", label: "LeetCode", position: "top-right" as const },
  { key: "github", label: "GitHub", position: "bottom-left" as const },
  { key: "codeforces", label: "Codeforces", position: "bottom-right" as const },
];

const connectTextClass =
  "font-bold tracking-tighter transition-opacity hover:opacity-50 text-[clamp(1.75rem,7.5vw,3.5rem)]";

const connectEmailClass =
  "font-bold tracking-tighter transition-opacity hover:opacity-50 text-[clamp(2.25rem,11vw,5.5rem)]";

const mantraTextClass =
  "font-bold leading-[1.02] tracking-tighter text-black text-[clamp(1.75rem,min(9.2vh,8vw),4.25rem)]";

const heroTextClass =
  "hero-text-animate font-bold leading-[1.12] tracking-tighter text-foreground max-md:text-[clamp(1.2rem,4.2vw,1.65rem)] md:text-[clamp(1.5rem,4vw,3.25rem)]";

function CardLabel({ label }: { label?: string }) {
  return (
    <div className="mb-1 flex h-5 items-end md:mb-3 md:h-7">
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
          className={`slide-heavy-text relative z-0 select-none whitespace-nowrap leading-[0.8] tracking-tighter max-md:text-[clamp(2.25rem,14vw,4.5rem)] md:text-[clamp(3rem,18vw,22rem)] ${textClassName}`}
        >
          {text}
        </span>
        <div
          className={`relative z-10 flex-shrink-0 rounded-full max-md:-ml-[5vw] max-md:h-[clamp(3.5rem,20vw,6rem)] max-md:w-[clamp(3.5rem,20vw,6rem)] md:-ml-[6vw] md:h-[clamp(4.5rem,26vw,28rem)] md:w-[clamp(4.5rem,26vw,28rem)] ${
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
    <div className="flex flex-shrink-0 flex-col max-md:px-[4vw] md:px-0">
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
          <div className="flex h-full w-full flex-col justify-center gap-[0.08em] overflow-hidden px-5 py-6 md:gap-[0.1em] md:px-10 md:py-10 lg:px-14 lg:py-14">
            {slide.items?.map((mantra) => (
              <p key={mantra} className={mantraTextClass}>
                {mantra}
              </p>
            ))}
          </div>
        )}

        {isContact && (
          <div className="relative h-full min-h-0 w-full px-4 py-5 md:px-10 md:py-10 lg:px-14 lg:py-14">
            {connectLayout.map(({ key, label, position }) => (
              <a
                key={key}
                href={personal.links[key as keyof typeof personal.links]}
                target="_blank"
                rel="noopener noreferrer"
                className={`absolute ${connectTextClass} ${
                  position === "top-left"
                    ? "top-4 left-4 md:top-8 md:left-8 lg:top-12 lg:left-12"
                    : position === "top-right"
                      ? "top-4 right-4 md:top-8 md:right-8 lg:top-12 lg:right-12"
                      : position === "bottom-left"
                        ? "bottom-4 left-4 md:bottom-8 md:left-8 lg:bottom-12 lg:left-12"
                        : "right-4 bottom-4 md:right-8 md:bottom-8 lg:right-12 lg:bottom-12"
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
                className={connectEmailClass}
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
          <div className="relative flex h-full w-full flex-row overflow-hidden">
            <div className="relative z-10 flex w-[62%] flex-col justify-center max-md:p-4 md:p-12 lg:p-16">
              <p className={heroTextClass}>{slide.body}</p>
            </div>

            <div
              className="pointer-events-none absolute top-1/2 -right-[10%] z-0 -translate-y-1/2 translate-x-[14%]"
              aria-hidden
            >
              <div className="rounded-full bg-accent max-md:h-[clamp(7rem,38vw,10rem)] max-md:w-[clamp(7rem,38vw,10rem)] md:h-[clamp(300px,52vw,640px)] md:w-[clamp(300px,52vw,640px)]" />
            </div>
          </div>
        )}
      </CardInner>
    </div>
  );
}
