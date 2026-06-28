"use client";

import { motion } from "framer-motion";
import { mantras } from "@/lib/data";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export default function Philosophy() {
  return (
    <section className="px-6 py-32 md:px-10">
      <motion.div
        className="flex flex-col gap-2"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {mantras.map((mantra) => (
          <motion.p
            key={mantra}
            variants={itemVariants}
            className="text-3xl font-light tracking-tight text-foreground/80 md:text-4xl lg:text-5xl"
          >
            {mantra}
          </motion.p>
        ))}
      </motion.div>
    </section>
  );
}
