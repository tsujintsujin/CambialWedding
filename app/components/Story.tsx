"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { STORY_IMAGES, blurProps } from "../lib/images";

// DO NOT WRITE COPY FOR THIS SECTION.
//
// Each label names the setting its photograph was taken in — the one thing
// the picture actually tells us. Nothing here asserts anything about
// Leisther and Cristine's history, because we don't know it. When they send
// their own words, add a `caption` and render it; don't invent one.
// One entry per frame, in strip order, paired positionally with
// STORY_IMAGES in lib/images.ts. Swap the photograph there; put the
// couple's own words here when they send them.
const MOMENTS: { label: string }[] = [
  { label: "" },
  { label: "" },
  { label: "" },
  { label: "" },
  { label: "" },
  { label: "" },
];

export default function Story() {
  const stripRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({
    dragging: false,
    startX: 0,
    startScrollLeft: 0,
    moved: false,
  });
  const [dragging, setDragging] = useState(false);

  const onPointerDown = (e: React.PointerEvent) => {
    const el = stripRef.current;
    if (!el) return;
    dragState.current = {
      dragging: true,
      startX: e.clientX,
      startScrollLeft: el.scrollLeft,
      moved: false,
    };
    setDragging(true);
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const el = stripRef.current;
    const state = dragState.current;
    if (!state.dragging || !el) return;
    const delta = e.clientX - state.startX;
    if (Math.abs(delta) > 3) state.moved = true;
    el.scrollLeft = state.startScrollLeft - delta;
  };

  const endDrag = (e: React.PointerEvent) => {
    const el = stripRef.current;
    if (dragState.current.dragging && el) el.releasePointerCapture(e.pointerId);
    dragState.current.dragging = false;
    setDragging(false);
  };

  return (
    <section
      id="story"
      className="flex min-h-screen w-full flex-col justify-center overflow-x-hidden bg-paper px-6 py-24 md:px-12"
    >
      <div className="mx-auto w-full max-w-shell">
       
        <h2 className="max-w-2xl font-display text-3xl italic leading-snug text-ink md:text-4xl">
          Gallery
        </h2>

        <div
          ref={stripRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          className={`no-scrollbar mt-8 flex select-none gap-6 overflow-x-auto pb-2 ${
            dragging ? "cursor-grabbing" : "cursor-grab"
          }`}
        >
          {MOMENTS.map((moment, i) => {
            const photo = STORY_IMAGES[i]!;
            return (
              <div key={photo.src} className="w-64 flex-shrink-0 md:w-72">
                <div className="pointer-events-none relative aspect-[3/4] w-full overflow-hidden bg-paper-dim">
                  <Image
                    src={photo.src}
                    alt={photo.alt || moment.label}
                    fill
                    sizes="(max-width: 768px) 70vw, 600px"
                    {...blurProps(photo)}
                    className="object-cover"
                  />
                </div>
                <p className="mt-3 font-display text-sm italic leading-tight text-ink/90">
                  {moment.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
