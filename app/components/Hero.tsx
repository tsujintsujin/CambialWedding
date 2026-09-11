"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { HERO_BACKDROP, HERO_COLLAGE, blurProps } from "../lib/images";
import { COUPLE, DATE_SHORT } from "../lib/wedding";
import { assetPath } from "../lib/basePath";

// The template's scattered collage — same six positions, rotations and
// z-indexes. The photographs live in lib/images.ts as HERO_COLLAGE; these
// are only the boxes they sit in, in the same order.
const SCATTER_POSITIONS = [
  "left-[4%] top-[6%] h-[22rem] w-64 rotate-[-6deg] z-[3]",
  "left-[15%] top-[26%] h-[30rem] w-80 rotate-[4deg] z-[2]",
  "left-[6%] top-[64%] h-64 w-48 rotate-[7deg] z-[1]",
  "right-[5%] top-[0%] h-72 w-56 rotate-[6deg] z-[3]",
  "right-[13%] top-[20%] h-[34rem] w-80 rotate-[-4deg] z-[2]",
  "right-[7%] top-[58%] h-[21rem] w-52 rotate-[-7deg] z-[1]",
];

// How far the collage frames sit back before a cursor reaches them.
const COLLAGE_REST_OPACITY = 0.4;

const SCATTER = HERO_COLLAGE.map((photo, i) => ({
  photo,
  className: SCATTER_POSITIONS[i]!,
}));

// The backdrop photograph sits behind every width at full strength. On
// desktop the collage scatters over the top of it, each frame faded back until
// it is hovered; below desktop there is no room to scatter six frames without
// colliding with the text, so the backdrop carries the section on its own.
const BACKDROP = HERO_BACKDROP;

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden bg-paper px-6 py-24"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="pointer-events-none absolute inset-0"
      >
        <Image
          src={assetPath(BACKDROP.src)}
          alt={BACKDROP.alt}
          fill
          priority
          sizes="100vw"
          {...blurProps(BACKDROP)}
          className="object-cover object-[calc(50%_+_100px)_center] md:scale-125 desktop:object-center desktop:-translate-x-50 desktop:translate-y-60 desktop:scale-150"
        />
      </motion.div>

      <Petals />
{/* 
      <div className="pointer-events-none absolute inset-0 hidden desktop:block">
        {SCATTER.map((item, i) => (
          <motion.div
            key={item.photo.src}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: COLLAGE_REST_OPACITY, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 * i, ease: "easeOut" }}
            whileHover={{
              opacity: 1,
              transition: { duration: 0.5, ease: "easeOut" },
            }}
            className={`pointer-events-auto absolute overflow-hidden shadow-2xl shadow-black/15 ${item.className}`}
          >
            <Image
              src={assetPath(item.photo.src)}
              alt={item.photo.alt}
              fill
              priority
              sizes="(min-width: 1280px) and (pointer: fine) 640px, 0px"
              {...blurProps(item.photo)}
              className="object-cover"
            />
          </motion.div>
        ))}
      </div> */}

      <div className=" relative z-10 mx-auto max-w-2xl text-center [text-shadow:0_2px_6px_rgba(0,0,0,0.45)] desktop:[text-shadow:none] desktop:mb-auto desktop:ml-auto desktop:mr-10 desktop:mt-20 desktop:text-right">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-5 text-[12px] uppercase tracking-widest2 text-white desktop:text-muted"
        >
          
          We&apos;re getting married
        </motion.p>
        <motion.h1
          // The hydration watchdog in layout.tsx watches this element. It
          // animates on mount rather than on scroll, so if it is still
          // transparent seconds after load, the bundle never ran.
          data-hydration-probe
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-5xl font-light leading-tight text-white md:text-7xl desktop:text-ink"
        >
          {COUPLE.groom.first}{" "}
          <em className="italic text-white desktop:text-accent">&amp;</em> {COUPLE.bride.first}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-sm uppercase tracking-widest2 text-white desktop:text-accent"
        >
          {DATE_SHORT}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-white desktop:ml-auto desktop:mr-0 desktop:text-ink/60"
        >
          Two hearts, one promise. We would be so grateful to have you beside
          us as we begin this new chapter, surrounded by the people we love
          most.
        </motion.p>
        <motion.a
          href="#rsvp"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 inline-block border border-accent bg-accent px-8 py-4 text-[11px] uppercase tracking-widest2 text-paper transition-colors duration-300 hover:bg-transparent hover:text-accent"
        >
          RSVP
        </motion.a>
      </div>
    </section>
  );
}

// The GSAP pen Justin supplied, as CSS. Three groups of six (the pen's `dot`,
// `dot2`, `dot3`), offset from each other so they never fall in lockstep.
// R() is deterministic here rather than Math.random(), so the server and the
// client agree; a random layout would be a hydration mismatch.
//
// The pen's delays were negative (-15s, -25s, -5s), which starts every petal
// mid-flight — the sky is full the instant the page paints. Justin wants them
// to begin after the Hero has settled, so the delays are positive and the
// first fall starts above the viewport. `backwards` fill is what makes that
// work: without it a petal sits parked at the top of the section, visible and
// motionless, until its delay elapses.
const HERO_SETTLE = 1.4; // the Hero's own copy finishes animating at ~1.1s
const GROUP_OFFSETS = [0, 1.5, 3];
const PER_GROUP = 6;

// Integer LCG. Exact in every engine, unlike a Math.sin() hash.
let seed = 20261010;
const R = (min: number, max: number) => {
  seed = (seed * 9301 + 49297) % 233280;
  return min + (seed / 233280) * (max - min);
};

const PETALS = GROUP_OFFSETS.flatMap((offset) =>
  Array.from({ length: PER_GROUP }, () => ({
    // x: R(0, w) in the pen. A percentage keeps it right at every width.
    left: `${R(0, 100)}%`,
    z: R(-200, 200),
    // The pen fixed every petal at 35px. Randomised around that, and the
    // z-depth above still scales it on top (0.75x at -200, 1.35x at +200).
    size: R(22, 48),
    fall: R(6, 15),
    sway: R(4, 8),
    spin: R(0, 180),
    // Spread within the group as well, so a group does not arrive as a row.
    delay: HERO_SETTLE + offset + R(0, 5),
  })),
);

// Sits between the backdrop photograph and the text block.
function Petals() {
  return (
    <div
      aria-hidden
      className="petal-field pointer-events-none absolute inset-0 z-[5] overflow-hidden"
    >
      {PETALS.map((p, i) => (
        <div
          key={i}
          className="absolute left-0 top-0 will-change-transform"
          style={{
            left: p.left,
            // Read by the shared petal-fall keyframes.
            ["--petal-z" as string]: `${p.z}px`,
            animation: `petal-fall ${p.fall}s linear ${p.delay}s infinite backwards`,
          }}
        >
          <div
            className="petal will-change-transform"
            style={{
              width: p.size,
              height: p.size,
              ["--petal-spin" as string]: `${p.spin}deg`,
              backgroundImage: `url(${assetPath("/petal.png")})`,
              animation: `petal-sway ${p.sway}s ease-in-out -5s infinite alternate`,
            }}
          />
        </div>
      ))}
    </div>
  );
}
