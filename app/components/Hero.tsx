"use client";

import { motion } from "framer-motion";
import Placeholder from "./Placeholder";

const SCATTER = [
  { label: "It's You", className: "left-[4%] top-[18%] h-40 w-32 rotate-[-4deg]" },
  { label: "Clouds and Trees", className: "left-[16%] top-[54%] h-32 w-40 rotate-[3deg]" },
  { label: "Virgin Hodegetria", className: "left-[2%] top-[70%] h-28 w-24 rotate-[6deg]" },
  { label: "Greek Stairs II", className: "right-[4%] top-[14%] h-36 w-28 rotate-[5deg]" },
  { label: "Bridge in Putrajaya", className: "right-[14%] top-[46%] h-44 w-36 rotate-[-3deg]" },
  { label: "The Gypsy Kiss", className: "right-[2%] top-[74%] h-28 w-24 rotate-[-6deg]" },
];

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-ink px-6">
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        {SCATTER.map((art, i) => (
          <motion.div
            key={art.label}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 * i, ease: "easeOut" }}
            className={`absolute shadow-2xl shadow-black/40 ${art.className}`}
          >
            <Placeholder label={art.label} className="h-full w-full" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-5 text-[12px] uppercase tracking-widest2 text-muted"
        >
          Contemporary Art Collection
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-5xl font-light leading-tight text-paper md:text-7xl"
        >
          Gallery<em className="italic text-accent">Type</em>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-paper/60"
        >
          Each painting in this collection has a story behind it, and we
          cannot and would not pick out any single one as a favorite.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="text-[11px] uppercase tracking-widest2 text-muted">Please Scroll</span>
        <span className="h-10 w-px animate-pulse bg-paper/30" />
      </motion.div>
    </section>
  );
}
