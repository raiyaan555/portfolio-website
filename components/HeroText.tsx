"use client";

import { motion } from "framer-motion";
import { heroWords } from "@/lib/data";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.6,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export default function HeroText() {
  return (
    <motion.p
      className="max-w-3xl text-2xl font-light leading-snug tracking-tight md:text-3xl lg:text-4xl"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {heroWords.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          variants={wordVariants}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
}
