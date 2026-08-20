"use client";

import Placeholder from "./Placeholder";
import { useSectionNav } from "./SectionNavContext";

export default function FeaturedArtwork() {
  const { goToId } = useSectionNav();

  return (
    <section className="flex h-full w-full items-center overflow-y-auto bg-ink-soft px-6 md:px-12">
      <div className="mx-auto grid w-full max-w-[1400px] gap-12 md:grid-cols-2 md:items-center md:gap-20">
        <Placeholder label="Untitled" className="aspect-[3/4] w-full" />
        <div>
          <p className="mb-4 text-[12px] uppercase tracking-widest2 text-muted">Recent artworks</p>
          <h3 className="font-display text-4xl italic text-paper md:text-5xl">Untitled</h3>
          <p className="mt-3 text-sm text-paper/50">by Vladimir Migachev</p>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-paper/60">
            Oil on canvas, part of a series exploring memory and landscape
            through fragmented, layered brushwork.
          </p>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              goToId("collection");
            }}
            className="mt-8 inline-block border-b border-accent-bright pb-1 text-[12px] uppercase tracking-widest2 text-paper/80 transition-colors hover:text-paper"
          >
            See this artwork
          </a>
        </div>
      </div>
    </section>
  );
}
