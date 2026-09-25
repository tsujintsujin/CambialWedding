import Image from "next/image";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import { MOTIF_IMAGE, blurProps } from "../lib/images";
import { MOTIF } from "../lib/wedding";

const feature = MOTIF_IMAGE;

export default function Motif() {
  return (
    <section id="motif" className="bg-paper px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-shell grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <SectionLabel>Colour Motif</SectionLabel>
          <h2 className="mt-6 font-display text-3xl font-light leading-[1.15] text-ink md:text-[2.75rem]">
            Burgundy, warmed
            <br />
            <em className="italic text-terracotta">all the way to sand.</em>
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted">
            We would love for our guests to dress within these four tones. It
            is a guide rather than a rule — wear the shade you feel best in.
          </p>

          <ul className="mt-10 divide-y divide-line-dark border-y border-line-dark">
            {MOTIF.map((tone) => (
              <li key={tone.hex} className="flex items-center gap-4 py-4">
                <span
                  aria-hidden
                  className="h-11 w-11 shrink-0 rounded-full ring-1 ring-inset ring-black/10"
                  style={{ backgroundColor: tone.hex }}
                />
                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] uppercase tracking-widest text-ink sm:tracking-widest2">
                    {tone.name}
                  </span>
                  <span className="block text-xs text-muted">{tone.role}</span>
                  {/* On phones the hex drops under the role, so the name
                      has the row's full width. */}
                  <span className="mt-1 block font-body text-[11px] uppercase tracking-widest2 text-muted sm:hidden">
                    {tone.hex}
                  </span>
                </span>
                <span className="hidden font-body text-[11px] uppercase tracking-widest2 text-muted sm:inline">
                  {tone.hex}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-paper-dim">
            <Image
              src={feature.src}
              alt={feature.alt}
              fill
              sizes="(max-width: 768px) 100vw, 56vw"
              {...blurProps(feature)}
              className="object-cover"
            />
          </div>

          {/* The palette card itself, rendered as a live swatch strip. */}
          <div className="mt-3 flex h-16 w-full overflow-hidden md:h-20">
            {MOTIF.map((tone) => (
              <div
                key={tone.hex}
                className="flex-1 transition-[flex-grow] duration-500 ease-soft hover:flex-[1.6]"
                style={{ backgroundColor: tone.hex }}
                title={`${tone.name} ${tone.hex}`}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
