"use client";

import { useState } from "react";
import Placeholder from "./Placeholder";
import { useSectionNav } from "./SectionNavContext";

const EVENTS = [
  {
    date: "20 Feb, 2026 — 24 May, 2026",
    title: "Ways of Seeing",
    venue: "Exhibition in Rothko Museum",
    label: "Ways of Seeing",
  },
  {
    date: "01 Mar, 2026 — 15 Mar, 2026",
    title: "The Ripple Effect",
    venue: "Exhibition in Liepaja",
    label: "The Ripple Effect",
  },
];

export default function Events() {
  const [index, setIndex] = useState(0);
  const event = EVENTS[index];
  const { goToId } = useSectionNav();

  return (
    <section className="flex h-full w-full items-center overflow-y-auto bg-ink-soft px-6 md:px-12">
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="mb-10 flex items-center justify-between">
          <p className="text-[12px] uppercase tracking-widest2 text-muted">Events</p>
          <div className="flex gap-3">
            <button
              onClick={() => setIndex((i) => (i - 1 + EVENTS.length) % EVENTS.length)}
              aria-label="Previous event"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-paper/70 transition-colors hover:border-accent-bright hover:text-paper"
            >
              ←
            </button>
            <button
              onClick={() => setIndex((i) => (i + 1) % EVENTS.length)}
              aria-label="Next event"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-paper/70 transition-colors hover:border-accent-bright hover:text-paper"
            >
              →
            </button>
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
          <Placeholder label={event.label} className="aspect-[4/3] w-full" />
          <div>
            <p className="mb-4 text-sm text-accent-bright">{event.date}</p>
            <h3 className="font-display text-3xl italic text-paper md:text-4xl">{event.title}</h3>
            <p className="mt-2 text-sm text-paper/50">{event.venue}</p>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                goToId("collection");
              }}
              className="mt-8 inline-block border-b border-accent-bright pb-1 text-[12px] uppercase tracking-widest2 text-paper/80 transition-colors hover:text-paper"
            >
              Read more
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
