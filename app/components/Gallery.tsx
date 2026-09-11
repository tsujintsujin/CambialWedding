"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  GALLERY_IMAGES,
  GALLERY_MOBILE_EXCLUDE,
  GALLERY_DESKTOP_FRAMING,
  GALLERY_MOBILE_FRAMING,
  blurProps,
  type SiteImage,
} from "../lib/images";

/** The phone-only crop for one slide, keyed by filename. Everything not
 *  listed keeps the default top-anchored crop. */
function mobileFraming(photo: SiteImage) {
  const name = photo.src.split("/").pop() ?? "";
  return GALLERY_MOBILE_FRAMING[name] ?? "object-top";
}

/** The crop from 768px up, which overrides the phone one above. */
function desktopFraming(photo: SiteImage) {
  const name = photo.src.split("/").pop() ?? "";
  return GALLERY_DESKTOP_FRAMING[name] ?? "md:object-top";
}

function Frame({ photo, priority }: { photo: SiteImage; priority?: boolean }) {
  return (
    <Image
      src={photo.src}
      alt={photo.alt}
      fill
      sizes="100vw"
      {...blurProps(photo)}
      {...(priority ? { priority: true } : { loading: "eager" as const })}
      className={`object-cover ${mobileFraming(photo)} ${desktopFraming(photo)}`}
    />
  );
}

// The slides come from the server, which lists public/images/gallery at
// build time — see lib/galleryFiles.ts. GALLERY_IMAGES is only the fallback
// for a render that doesn't pass them.
export default function Gallery({
  images = GALLERY_IMAGES,
}: {
  images?: SiteImage[];
}) {
  // Server-rendered markup has to match the first client render, so the full
  // set is assumed until matchMedia has actually been read after mount.
  const [isPhone, setIsPhone] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsPhone(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const SLIDES = useMemo(
    () =>
      isPhone
        ? images.filter(
            (photo) =>
              !GALLERY_MOBILE_EXCLUDE.some((name) => photo.src.endsWith(name))
          )
        : images,
    [images, isPhone]
  );
  const COUNT = SLIDES.length;

  const [index, setIndex] = useState(0);
  // The frame being slid away from. It stays fully opaque underneath until
  // the incoming frame has covered it, so the ground is never visible.
  const [under, setUnder] = useState<number | null>(null);
  const [dir, setDir] = useState(1);
  const [stepped, setStepped] = useState(false);

  // Dropping slides shrinks the list, so a viewer already deep in the set can
  // be left pointing past the end when a phone rotates into range.
  useEffect(() => {
    setIndex((current) => (current < COUNT ? current : 0));
    setUnder((current) => (current !== null && current < COUNT ? current : null));
  }, [COUNT]);

  const goTo = useCallback(
    (next: number, delta: number) => {
      setIndex((current) => {
        if (next === current) return current;
        setStepped(true);
        setUnder(current);
        setDir(delta);
        return next;
      });
    },
    []
  );

  const step = useCallback(
    (delta: number) => {
      setIndex((current) => {
        setStepped(true);
        setUnder(current);
        setDir(delta);
        return (current + delta + COUNT) % COUNT;
      });
    },
    [COUNT]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step]);

  // Only the neighbours are kept mounted, hidden beneath the current frame,
  // so stepping never lands on an undecoded image — and the compositor never
  // has to hold all ten full-bleed layers at once.
  const neighbours = [
    (index - 1 + COUNT) % COUNT,
    (index + 1) % COUNT,
  ].filter((i) => i !== index && i !== under);

  return (
    <section
      id="gallery"
      className="relative min-h-screen w-full overflow-hidden bg-paper"
    >
      <div className="pointer-events-none absolute left-6 top-8 z-30 md:left-10 md:top-10">
        <p className="text-[12px] uppercase tracking-widest2 text-paper drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]">
          Gallery
        </p>
      </div>

      {neighbours.map((i) => (
        <div key={SLIDES[i]!.src} className="absolute inset-0 z-0">
          <Frame photo={SLIDES[i]!} />
        </div>
      ))}

      {under !== null && under !== index && (
        <div key={`under-${SLIDES[under]!.src}`} className="absolute inset-0 z-10">
          <Frame photo={SLIDES[under]!} />
        </div>
      )}

      <motion.div
        key={SLIDES[index]!.src}
        className="absolute inset-0 z-20"
        initial={stepped ? { x: dir > 0 ? "100%" : "-100%" } : false}
        animate={{ x: "0%" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        onAnimationComplete={() => setUnder(null)}
      >
        <Frame photo={SLIDES[index]!} priority={index === 0} />
      </motion.div>

      <button
        type="button"
        onClick={() => step(-1)}
        aria-label="Previous photograph"
        className="absolute left-2 top-1/2 z-30 -translate-y-1/2 px-4 py-8 font-display text-4xl text-paper drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)] transition-opacity duration-300 hover:opacity-70 md:left-6"
      >
        &#8249;
      </button>
      <button
        type="button"
        onClick={() => step(1)}
        aria-label="Next photograph"
        className="absolute right-2 top-1/2 z-30 -translate-y-1/2 px-4 py-8 font-display text-4xl text-paper drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)] transition-opacity duration-300 hover:opacity-70 md:right-6"
      >
        &#8250;
      </button>

      <div className="absolute bottom-8 left-0 right-0 z-30 flex items-center justify-center gap-2.5 md:bottom-10">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => goTo(i, i > index ? 1 : -1)}
            aria-label={`Go to photograph ${i + 1}`}
            aria-current={i === index}
            className={`h-1.5 rounded-full shadow-[0_1px_4px_rgba(0,0,0,0.7)] transition-all duration-300 ${
              i === index ? "w-7 bg-paper" : "w-1.5 bg-paper/50 hover:bg-paper/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
