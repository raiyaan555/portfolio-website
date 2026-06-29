"use client";

import { useState } from "react";
import AppLink from "@/components/AppLink";
import type { Slide } from "@/lib/data";
import { personal, liveProjects } from "@/lib/data";

interface ScrollCardProps {
  slide: Slide;
  layout?: "horizontal" | "vertical";
}

const CARD_HORIZONTAL =
  "h-[80vh] min-h-[560px] w-[92vw] max-w-[1280px] md:h-[78vh] md:w-[86vw]";

const CARD_VERTICAL =
  "h-auto min-h-[380px] w-full max-w-none";

const connectLayout = [
  { key: "linkedin", label: "LinkedIn", position: "top-left" as const },
  { key: "leetcode", label: "LeetCode", position: "top-right" as const },
  { key: "github", label: "GitHub", position: "bottom-left" as const },
  { key: "codeforces", label: "Codeforces", position: "bottom-right" as const },
];

const connectTextClass =
  "text-[clamp(1.25rem,2.8vw,2.75rem)] font-bold tracking-tighter transition-opacity hover:opacity-50";

const connectTextMobile =
  "text-2xl font-bold tracking-tighter transition-opacity hover:opacity-50";

function CardLabel({ label }: { label?: string }) {
  return (
    <div className="mb-3 flex h-7 items-end">
      {label && (
        <p className="text-sm font-bold tracking-tight text-muted">{label}</p>
      )}
    </div>
  );
}

function CardInner({
  slide,
  children,
  className,
  isVertical,
}: {
  slide: Slide;
  children: React.ReactNode;
  className: string;
  isVertical: boolean;
}) {
  const article = (
    <article
      data-scroll-card={isVertical ? undefined : true}
      data-cursor-hover
      className={className}
      style={isVertical ? undefined : { scrollSnapAlign: "center" }}
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
  compact = false,
}: {
  text: string;
  circleColor: "yellow" | "red";
  textClassName?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={`relative flex w-full items-center justify-center overflow-hidden ${
        compact ? "min-h-[280px] py-8" : "h-full"
      }`}
    >
      <div className="relative flex items-center justify-center">
        <span
          className={`slide-heavy-text relative z-0 select-none whitespace-nowrap leading-[0.8] tracking-tighter ${
            compact
              ? "text-[clamp(3rem,16vw,5rem)]"
              : "text-[clamp(6rem,28vw,22rem)]"
          } ${textClassName}`}
        >
          {text}
        </span>
        <div
          className={`relative z-10 flex-shrink-0 rounded-full ${
            compact
              ? "-ml-[5vw] h-[clamp(4rem,22vw,7rem)] w-[clamp(4rem,22vw,7rem)]"
              : "-ml-[7vw] h-[clamp(8rem,32vw,28rem)] w-[clamp(8rem,32vw,28rem)]"
          } ${circleColor === "yellow" ? "bg-accent" : "bg-accent-red"}`}
          aria-hidden
        />
      </div>
    </div>
  );
}

export default function ScrollCard({
  slide,
  layout = "horizontal",
}: ScrollCardProps) {
  const [copied, setCopied] = useState(false);
  const isVertical = layout === "vertical";

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
    <div className={`flex flex-col ${isVertical ? "w-full" : "flex-shrink-0"}`}>
      <CardLabel label={isHero ? undefined : slide.label} />

      <CardInner
        slide={slide}
        isVertical={isVertical}
        className={`group relative flex flex-col theme-transition ${
          isVertical ? CARD_VERTICAL : CARD_HORIZONTAL
        } ${
          isPhilosophy
            ? "overflow-hidden bg-accent"
            : slide.type === "resume"
              ? "overflow-hidden bg-accent"
              : "card-shadow bg-surface overflow-hidden"
        } ${isHero ? "overflow-hidden" : ""}`}
      >
        {isPhilosophy && (
          <div
            className={`flex w-full flex-col justify-center gap-1 overflow-y-auto p-6 md:p-12 lg:p-16 ${
              isVertical ? "min-h-[380px] py-10" : "h-full"
            }`}
          >
            {slide.items?.map((mantra) => (
              <p
                key={mantra}
                className={`font-bold leading-[1.08] tracking-tighter text-black ${
                  isVertical
                    ? "text-[clamp(1.35rem,5vw,2rem)]"
                    : "text-[clamp(1.75rem,3.8vw,3.25rem)]"
                }`}
              >
                {mantra}
              </p>
            ))}
          </div>
        )}

        {isContact && (
          <>
            <div className="relative hidden h-full min-h-[480px] w-full p-8 md:block md:p-12 lg:p-16">
              {connectLayout.map(({ key, label, position }) => (
                <a
                  key={key}
                  href={personal.links[key as keyof typeof personal.links]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`absolute ${connectTextClass} ${
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

            <div className="flex min-h-[380px] flex-col justify-center gap-8 p-6 md:hidden">
              <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                {connectLayout.map(({ key, label }) => (
                  <a
                    key={key}
                    href={personal.links[key as keyof typeof personal.links]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={connectTextMobile}
                    data-cursor-hover
                  >
                    {label}
                  </a>
                ))}
              </div>
              <div className="flex flex-col items-center pt-2">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="text-4xl font-bold tracking-tighter transition-opacity hover:opacity-50"
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
          </>
        )}

        {slide.type === "live-projects" && (
          <BoldCircleText
            text={featuredProject.title}
            circleColor="yellow"
            compact={isVertical}
          />
        )}

        {slide.type === "work" && (
          <BoldCircleText
            text="Work"
            circleColor="red"
            compact={isVertical}
          />
        )}

        {slide.type === "resume" && (
          <BoldCircleText
            text="Resume"
            circleColor="red"
            textClassName="text-black"
            compact={isVertical}
          />
        )}

        {isHero && (
          <div
            className={`relative flex w-full flex-col ${
              isVertical ? "min-h-[420px]" : "h-full md:flex-row"
            }`}
          >
            <div
              className={`pointer-events-none z-0 flex justify-center ${
                isVertical
                  ? "order-2 px-6 pb-8 pt-4"
                  : "absolute -right-[10%] bottom-0 md:bottom-auto md:right-0 md:top-1/2 md:-translate-y-1/2 md:translate-x-[14%]"
              }`}
              aria-hidden
            >
              <div
                className={`rounded-full bg-accent ${
                  isVertical
                    ? "h-44 w-44"
                    : "h-[clamp(300px,52vw,640px)] w-[clamp(300px,52vw,640px)]"
                }`}
              />
            </div>

            <div
              className={`relative z-10 flex w-full flex-col justify-center p-6 md:w-[62%] md:p-12 lg:p-16 ${
                isVertical ? "order-1 pt-8" : ""
              }`}
            >
              <p
                className={`hero-text-animate font-bold leading-[1.12] tracking-tighter text-foreground ${
                  isVertical
                    ? "text-[clamp(1.5rem,6vw,2rem)]"
                    : "text-[clamp(1.75rem,4vw,3.25rem)]"
                }`}
              >
                {slide.body}
              </p>
            </div>
          </div>
        )}
      </CardInner>
    </div>
  );
}
