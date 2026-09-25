"use client";

import { motion, useAnimate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  BEARERS,
  BRIDESMAIDS,
  COUPLE,
  DATE_SHORT,
  GROOMSMEN,
  HONOR,
  OFFICIANT,
  PARENTS,
  PRINCIPAL_SPONSORS,
  SECONDARY_SPONSORS,
  VENUES,
} from "../lib/wedding";
import { cloudinary } from "../lib/cloudinary";
import Petals from "./Petals";

const EASE = [0.22, 1, 0.36, 1] as const;

// The decorated paper (Cloudinary entourage-paper.webp, 864x2016, generated) drawn
// as a 9-slice. The top and bottom bands hold the flowers and keep their
// proportions at any width; only the plain middle stretches to the card's
// height. The left and right slices meet in the middle, so nothing is ever
// stretched sideways. `cqw` is the paper's own width (see data-paper).
const BACKDROP = {
  borderStyle: "solid",
  borderWidth: 0,
  borderImageSource: `url(${cloudinary("entourage-paper.webp", "f_auto,q_auto")})`,
  borderImageSlice: "524 432 565 432 fill",
  borderImageWidth: "calc(100cqw * 524 / 864) 50% calc(100cqw * 565 / 864) 50%",
};

// The card, the sheet it hands over to, and the finished paper all share one
// look so the swaps between them never show.
const SHEET = {
  backgroundColor: "#F7EFE6",
  boxShadow: "0 2px 10px rgba(66,12,26,0.25)",
  borderRadius: 2,
};

// A sealed envelope in the motif tones, half the viewport wide, lying on the
// ground. When it scrolls into view it stands up, the flap opens and the card
// slides out and comes forward. The envelope then tilts away off the right
// edge while the card grows into the entourage paper, whose details fade in.
//
// The paper is laid out in flow from the start (invisible), so the section is
// already its final height and nothing below moves while this plays.
//
// Envelope layers, back to front: inside, card, pocket (side and bottom flaps),
// top flap. The flap drops behind the card once it has flipped open, and the
// card moves in front of the pocket once it has cleared it. The card lives
// inside the envelope's stacking context, so to outlive the envelope it hands
// over to `data-sheet`, a twin positioned on the section, which then grows to
// the paper's box.
export default function Envelope() {
  const [scope, animate] = useAnimate();
  const envelope = useRef<HTMLDivElement>(null);
  const inView = useInView(envelope, { once: true, amount: 0.8 });
  const reduce = useReducedMotion();
  const [envelopeGone, setEnvelopeGone] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const t = (s: number) => (reduce ? 0 : s);
    const root = scope.current as HTMLElement;
    const q = (s: string) => root.querySelector<HTMLElement>(s)!;
    const box = (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      const s = root.getBoundingClientRect();
      return { left: r.left - s.left, top: r.top - s.top, width: r.width, height: r.height };
    };

    (async () => {
      await animate("[data-env]", { rotateX: 0, rotateZ: 0 }, { duration: t(1.2), ease: EASE });
      await animate("[data-flap]", { rotateX: 90 }, { duration: t(0.35), ease: "easeIn" });
      q("[data-flap]").style.zIndex = "5";
      q("[data-seal]").style.opacity = "0";
      await animate("[data-flap]", { rotateX: 180 }, { duration: t(0.35), ease: "easeOut" });
      await animate("[data-card]", { y: "-94%" }, { duration: t(1), ease: EASE });
      q("[data-card]").style.zIndex = "30";
      await animate("[data-card]", { y: "-50%", scale: 1.04 }, { duration: t(0.9), ease: EASE });

      const sheet = q("[data-sheet]");
      const from = box(q("[data-card]"));
      Object.assign(sheet.style, {
        display: "block",
        left: `${from.left}px`,
        top: `${from.top}px`,
        width: `${from.width}px`,
        height: `${from.height}px`,
      });
      q("[data-card]").style.visibility = "hidden";
      await Promise.all([
        animate(
          "[data-env]",
          { x: "85vw", rotateZ: 16, rotateX: 20 },
          { duration: t(1.1), ease: [0.5, 0, 0.75, 0] }
        ),
        animate(sheet, box(q("[data-paper]")), { duration: t(1.3), ease: EASE }),
      ]);

      setEnvelopeGone(true);
      Object.assign(q("[data-paper]").style, SHEET);
      sheet.style.display = "none";
      await animate("[data-reveal]", { opacity: 1 }, { duration: t(1.1), ease: "easeOut" });
    })();
  }, [inView, animate, reduce, scope]);

  return (
    <section
      ref={scope}
      id="entourage"
      // `clip`, not `hidden`: a hidden overflow is a scroll container, which
      // would stop the petal field below from sticking to the viewport.
      className="relative flex justify-center overflow-clip bg-paper px-4 py-24 md:py-28"
    >
      {/* The section is taller than a screen and the petals fall one screen,
          so the field sticks to the viewport while the section scrolls by. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Petals className="sticky top-0 h-screen" />
      </div>

      {!envelopeGone && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 flex justify-center"
          // Low enough that the card clears the section top at the peak of its rise.
          style={{ top: "calc(22vw + 40px)" }}
        >
          <motion.div
            ref={envelope}
            data-env
            style={{ rotateX: 52, rotateZ: -5, transformPerspective: 1800 }}
            className="relative aspect-[600/340] w-[50vw] drop-shadow-[0_14px_14px_rgba(66,12,26,0.45)]"
          >
            <svg viewBox="0 0 600 340" className="absolute inset-0 h-full w-full">
              <rect width="600" height="340" rx="6" fill="#420C1A" />
            </svg>

            <motion.div
              data-card
              style={SHEET}
              className="absolute left-[5%] top-[5%] z-10 h-[90%] w-[90%]"
            />

            <svg viewBox="0 0 600 340" className="absolute inset-0 z-20 h-full w-full">
              <path d="M0 0 L300 183 L0 340 Z M600 0 L300 183 L600 340 Z" fill="#8C2B3A" />
              <path
                d="M0 0 L300 183 L0 340 Z M600 0 L300 183 L600 340 Z"
                fill="#000"
                fillOpacity="0.08"
              />
              <path d="M0 340 L300 162 L600 340 Z" fill="#641428" />
            </svg>

            <motion.div
              data-flap
              style={{ transformPerspective: 1200, originY: 0 }}
              className="absolute inset-x-0 top-0 z-40 h-[57.65%]"
            >
              <svg viewBox="0 0 600 196" overflow="visible" className="h-full w-full">
                <path
                  d="M0 0 H600 L300 196 Z"
                  fill="#420C1A"
                  stroke="#D8A98B"
                  strokeOpacity="0.35"
                  strokeWidth="1.5"
                />
                <g data-seal>
                  <circle cx="300" cy="194" r="38" fill="#B55B4C" />
                  <circle cx="300" cy="194" r="28" fill="none" stroke="#D8A98B" strokeWidth="2" />
                  <circle cx="300" cy="194" r="6" fill="#D8A98B" />
                </g>
              </svg>
            </motion.div>
          </motion.div>
        </div>
      )}

      <div aria-hidden data-sheet style={SHEET} className="absolute z-10 hidden" />

      <article
        data-paper
        style={{ containerType: "inline-size" }}
        className="relative z-20 w-full max-w-[880px]"
      >
        <motion.div
          data-reveal
          aria-hidden
          style={{ opacity: 0, ...BACKDROP }}
          className="pointer-events-none absolute inset-0"
        />
        {/* Padding in cqw keeps the text inside the frame and clear of the
            corner flowers, which scale with the paper's width. */}
        <motion.div
          data-reveal
          style={{ opacity: 0, padding: "40cqw 11cqw 50cqw" }}
          className="relative text-center font-display text-[12px] leading-relaxed text-ink md:text-[15px]"
        >
          <h2 className="text-4xl italic leading-tight text-burgundy md:text-6xl">
            {COUPLE.groom.last} – {COUPLE.bride.last}
          </h2>
          <p className="mt-2 font-body text-[10px] uppercase tracking-widest3 text-muted md:text-xs">
            Nuptials
          </p>

          <div className="mt-8 grid grid-cols-2 divide-x divide-line-dark">
            <Role
              className="px-3"
              nameClassName="mt-1 text-xl leading-tight sm:text-2xl md:text-4xl"
              label="Groom"
              names={[`${COUPLE.groom.first} ${COUPLE.groom.last}`]}
            />
            <Role
              className="px-3"
              nameClassName="mt-1 text-xl leading-tight sm:text-2xl md:text-4xl"
              label="Bride"
              names={[`${COUPLE.bride.first} ${COUPLE.bride.last}`]}
            />
          </div>

          <p className="mt-7 font-body text-[11px] uppercase tracking-widest2 md:text-[13px]">
            {DATE_SHORT}
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 sm:gap-x-10">
            {VENUES.map((venue) => (
              <Role
                key={venue.kind}
                label={venue.kind.replace("The ", "")}
                names={[venue.name, venue.time]}
              />
            ))}
          </div>

          <div className="mt-8 grid grid-cols-2 divide-x divide-line-dark">
            <Role className="px-3" label="Groom's Parents" names={PARENTS.groom} />
            <Role className="px-3" label="Bride's Parents" names={PARENTS.bride} />
          </div>
          <Role className="mt-6" label="Officiating Priest" names={[OFFICIANT]} />

          <Heading sub="Ninong & Ninang">Principal Sponsors</Heading>
          <ul className="mt-4 space-y-2 sm:space-y-0">
            {PRINCIPAL_SPONSORS.map((pair) => (
              <li key={pair.join()} className="grid sm:grid-cols-2 sm:gap-x-10">
                {pair.map((name) => (
                  <span key={name} className={pair.length === 1 ? "sm:col-span-2" : ""}>
                    {name}
                  </span>
                ))}
              </li>
            ))}
          </ul>

          <div className="mt-8 grid grid-cols-2 gap-x-6 md:gap-x-10">
            <Role label="Best Man" names={[HONOR.bestMan]} />
            <Role label="Maid of Honor" names={[HONOR.maidOfHonor]} />
          </div>

          <Heading>Secondary Sponsors</Heading>
          <div className="mt-4 grid gap-4 sm:grid-cols-3 sm:gap-x-6">
            {SECONDARY_SPONSORS.map((s) => (
              <Role key={s.role} label={s.role} names={s.names} />
            ))}
          </div>

          <Heading>Entourage</Heading>
          <div className="mt-4 grid grid-cols-2 gap-x-6 md:gap-x-10">
            <Role label="Groomsmen" names={GROOMSMEN} />
            <Role label="Bridesmaids" names={BRIDESMAIDS} />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-x-6">
            {BEARERS.map((b) => (
              <Role key={b.role} label={b.role} names={b.names} />
            ))}
          </div>
        </motion.div>
      </article>
    </section>
  );
}

function Role({
  label,
  names,
  className = "",
  nameClassName = "",
}: {
  label: string;
  names: readonly string[];
  className?: string;
  nameClassName?: string;
}) {
  return (
    <div className={className}>
      <p className="font-semibold text-burgundy">{label}</p>
      {names.map((name) => (
        <p key={name} className={nameClassName}>
          {name}
        </p>
      ))}
    </div>
  );
}

function Heading({ children, sub }: { children: string; sub?: string }) {
  return (
    <div className="mt-10">
      <h3 className="text-2xl italic text-burgundy md:text-[2rem]">{children}</h3>
      {sub && (
        <p className="mt-1 font-body text-[10px] uppercase tracking-widest2 text-muted md:text-[11px]">
          {sub}
        </p>
      )}
    </div>
  );
}
