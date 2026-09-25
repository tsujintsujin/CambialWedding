"use client";

import { useEffect, useState } from "react";
import { WEDDING_DATE } from "../lib/wedding";

const UNITS = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
] as const;

type Remaining = Record<(typeof UNITS)[number]["key"], number>;

function remainingFrom(target: Date): Remaining {
  const ms = Math.max(0, target.getTime() - Date.now());
  const total = Math.floor(ms / 1000);
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

export default function Countdown() {
  // Left null on the server so the markup the client hydrates against never
  // disagrees with a clock that has already moved on.
  const [left, setLeft] = useState<Remaining | null>(null);

  useEffect(() => {
    setLeft(remainingFrom(WEDDING_DATE));
    const id = setInterval(() => setLeft(remainingFrom(WEDDING_DATE)), 1000);
    return () => clearInterval(id);
  }, []);

  const passed = left !== null && Object.values(left).every((v) => v === 0);

  return (
    <section className="border-y border-line-dark bg-paper-dim">
      <div className="mx-auto max-w-shell px-6 py-14 md:px-10 md:py-16">
        {passed ? (
          <p className="text-center font-display text-2xl italic text-ink md:text-3xl">
            Today we say I do. Thank you for celebrating with us.
          </p>
        ) : (
          <>
            <p className="text-center text-[11px] uppercase tracking-widest3 text-accent-bright">
              Counting down to the ceremony
            </p>
            <div className="mt-8 grid grid-cols-2 gap-x-1.5 gap-y-6 xs:grid-cols-4 sm:gap-3 md:gap-8">
              {UNITS.map((unit) => (
                <div
                  key={unit.key}
                  className="border-l border-line-dark pl-1 text-center sm:pl-3 md:pl-6 md:text-left"
                >
                  <p
                    className="font-display text-3xl font-light tabular-nums leading-none text-ink sm:text-5xl md:text-6xl"
                    suppressHydrationWarning
                  >
                    {left === null
                      ? "—"
                      : String(left[unit.key]).padStart(2, "0")}
                  </p>
                  <p className="mt-2 text-[9px] uppercase tracking-normal text-muted sm:text-[10px] sm:tracking-widest2 md:mt-3">
                    {unit.label}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
