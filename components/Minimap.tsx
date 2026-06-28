"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/data";

interface MinimapProps {
  activeIndex: number;
}

export default function Minimap({ activeIndex }: MinimapProps) {
  return (
    <div className="fixed bottom-8 right-6 z-40 flex flex-col gap-2 md:right-10">
      {projects.map((project, i) => (
        <motion.div
          key={project.id}
          className="h-1.5 w-1.5 rounded-full"
          animate={{
            backgroundColor: i === activeIndex ? "#FFFF02" : "rgba(255,255,255,0.2)",
            scale: i === activeIndex ? 1.4 : 1,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}
