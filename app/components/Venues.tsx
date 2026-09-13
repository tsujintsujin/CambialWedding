import Image from "next/image";
import { VENUE_IMAGES, blurProps } from "../lib/images";
import { VENUES } from "../lib/wedding";

// Order matches VENUES: the parish, then the auditorium.
const CARD_IMAGES = VENUE_IMAGES;

export default function Venues() {
  return (
    <section
      id="when"
      className="flex min-h-screen w-full items-center bg-paper-dim px-6 py-24 md:px-12"
    >
      <div className="mx-auto w-full max-w-shell">
        <p className="mb-10 text-[12px] uppercase tracking-widest2 text-muted">
          Ceremony &amp; Reception
        </p>

        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          {VENUES.map((venue, i) => (
            <div key={venue.kind}>
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-paper">
                <Image
                  src={CARD_IMAGES[i]!.src}
                  alt={CARD_IMAGES[i]!.alt || venue.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  {...blurProps(CARD_IMAGES[i]!)}
                  className="object-cover"
                />
              </div>
              <p className="mt-6 text-[12px] uppercase tracking-widest2 text-accent-bright">
                {venue.kind}
              </p>
              <h3 className="mt-2 font-display text-3xl italic text-ink md:text-4xl">
                {venue.name}
              </h3>
              <address className="mt-3 not-italic text-sm leading-relaxed text-ink/50">
                {venue.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
              <p className="mt-1 text-sm text-ink/50">{venue.time}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
