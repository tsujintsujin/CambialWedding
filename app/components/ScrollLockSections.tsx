"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSectionNav } from "./SectionNavContext";

export default function ScrollLockSections({ sections }: { sections: ReactNode[] }) {
  const { index, count, next, prev } = useSectionNav();
  const lockedRef = useRef(false);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (lockedRef.current || Math.abs(e.deltaY) < 10) return;
      lockedRef.current = true;
      if (e.deltaY > 0) next();
      else prev();
      setTimeout(() => {
        lockedRef.current = false;
      }, 700);
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [next, prev]);

  return (
    <>
      <div className="fixed inset-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="h-full w-full"
          >
            {sections[index]}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="fixed left-6 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-3 md:left-10">
        <button
          onClick={prev}
          disabled={index === 0}
          aria-label="Previous section"
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-line text-paper/60 transition-colors duration-200 hover:border-accent-bright hover:text-paper disabled:cursor-not-allowed disabled:opacity-30"
        >
          ↑
        </button>
        <button
          onClick={next}
          disabled={index === count - 1}
          aria-label="Next section"
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-line text-paper/60 transition-colors duration-200 hover:border-accent-bright hover:text-paper disabled:cursor-not-allowed disabled:opacity-30"
        >
          ↓
        </button>
      </div>
    </>
  );
}
