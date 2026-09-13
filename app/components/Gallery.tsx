"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  GALLERY_IMAGES,
  GALLERY_MOBILE_EXCLUDE,
  GALLERY_DESKTOP_EXCLUDE,
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

// Every frame is lazy, and none is priority. The gallery is the LAST section
// on the page, so nothing here is ever on screen at first paint — but three
// of these mount at once (current plus both neighbours) and each decodes to
// roughly 9 MB at the 1920px variant a 3x phone picks for a full-bleed box.
// Loading them eagerly spent ~28 MB of bitmap memory on pictures nobody could
// see yet, which is what pushed Messenger's in-app WebView over its limit and
// produced "This page couldn't load" — iOS killing the web content process.
//
// Laziness costs nothing here: all three frames are `absolute inset-0` in the
// same section, so scrolling the gallery into view brings every one of them
// into range at the same moment. Stepping still lands on a decoded image.
function Frame({ photo }: { photo: SiteImage }) {
  return (
    <Image
      src={photo.src}
      alt={photo.alt}
      fill
      sizes="100vw"
      {...blurProps(photo)}
      loading="lazy"
      className={`object-cover ${mobileFraming(photo)} ${desktopFraming(photo)}`}
    />
  );
}

// The slides are GALLERY_IMAGES in lib/images.ts unless a render passes others.
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

  const SLIDES = useMemo(() => {
    const dropped = isPhone ? GALLERY_MOBILE_EXCLUDE : GALLERY_DESKTOP_EXCLUDE;
    return images.filter(
      (photo) => !dropped.some((name) => photo.src.endsWith(name))
    );
  }, [images, isPhone]);
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
        <Frame photo={SLIDES[index]!} />
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
