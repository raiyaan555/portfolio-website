"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { personal, achievements, education } from "@/lib/data";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard not available
    }
  };

  return (
    <footer className="px-6 pb-20 pt-16 md:px-10">
      <div className="mb-20">
        <button
          onClick={handleCopy}
          className="group relative text-4xl font-light tracking-tight transition-opacity hover:opacity-60 md:text-5xl"
          data-cursor-hover
        >
          Email
        </button>

        <AnimatePresence>
          {copied && (
            <motion.span
              className="ml-4 inline-block font-mono text-sm text-accent"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              Copied
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <section id="notes" className="mb-16 scroll-mt-28">
        <h3 className="mb-6 font-mono text-xs uppercase tracking-widest text-foreground/40">
          Achievements
        </h3>
        <ul className="flex flex-col gap-2">
          {achievements.map((item) => (
            <li
              key={item}
              className="text-sm text-foreground/60 md:text-base"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-16">
        <h3 className="mb-6 font-mono text-xs uppercase tracking-widest text-foreground/40">
          Education
        </h3>
        <p className="text-sm text-foreground/80 md:text-base">
          {education.degree}
        </p>
        <p className="text-sm text-foreground/50 md:text-base">
          {education.school} · {education.period} · CGPA: {education.cgpa}
        </p>
      </section>

      <div className="flex flex-wrap gap-6">
        {Object.entries(personal.links).map(([key, href]) => (
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs uppercase tracking-widest text-foreground/40 transition-colors hover:text-accent"
            data-cursor-hover
          >
            {key}
          </a>
        ))}
      </div>

      <p className="mt-12 font-mono text-xs text-foreground/20">
        {personal.location}
      </p>
    </footer>
  );
}
