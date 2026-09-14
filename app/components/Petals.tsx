import { cloudinary } from "../lib/cloudinary";

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

// The fall runs 100vh, so the field must be at most a viewport tall; the
// caller positions it (`className`).
export default function Petals({ className }: { className: string }) {
  return (
    <div
      aria-hidden
      className={`petal-field pointer-events-none overflow-hidden ${className}`}
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
              // Read by .petal, which halves it under 768px.
              ["--petal-size" as string]: `${p.size}px`,
              ["--petal-spin" as string]: `${p.spin}deg`,
              backgroundImage: `url(${cloudinary("petal.png", "f_auto,q_auto")})`,
              animation: `petal-sway ${p.sway}s ease-in-out -5s infinite alternate`,
            }}
          />
        </div>
      ))}
    </div>
  );
}
