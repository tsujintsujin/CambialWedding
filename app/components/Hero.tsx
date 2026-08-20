"use client";

import { motion } from "framer-motion";
import Placeholder from "./Placeholder";

const SCATTER = [
  { label: "It's You", className: "left-[4%] top-[6%] h-[22rem] w-64 rotate-[-6deg] z-[3]" },
  { label: "Clouds and Trees", className: "left-[15%] top-[26%] h-[30rem] w-80 rotate-[4deg] z-[2]" },
  { label: "Virgin Hodegetria", className: "left-[6%] top-[64%] h-64 w-48 rotate-[7deg] z-[1]" },
  { label: "Greek Stairs II", className: "right-[5%] top-[0%] h-72 w-56 rotate-[6deg] z-[3]" },
  { label: "Bridge in Putrajaya", className: "right-[13%] top-[20%] h-[34rem] w-80 rotate-[-4deg] z-[2]" },
  { label: "The Gypsy Kiss", className: "right-[7%] top-[58%] h-[21rem] w-52 rotate-[-7deg] z-[1]" },
];

export default function Hero() {
  return (
    <section className="relative flex h-full w-full flex-col justify-center overflow-hidden bg-ink px-6">
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
    </section>
  );
}
