import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import { COUPLE, DATE_SHORT } from "../lib/wedding";

// UNCONFIRMED WITH THE COUPLE. These four carried over from the earlier draft
// and read as sensible defaults, but nobody has signed off on the RSVP date or
// the gift wording. Confirm before this goes anywhere near a guest. Do not add
// new entries — a policy invented here (no children, unplugged ceremony, etc.)
// is one guests would actually act on.
const DETAILS = [
  {
    title: "Dress Code",
    body: "Formal. Gentlemen in a suit or polo, ladies in a long or midi dress within the motif color range. Please, no white dresses",
  },
  {
    title: "Gifts",
    body: "Your presence is genuinely the gift. Should you wish to give more, a small envelope toward our first home together would be received with love.",
  },
  {
    title: "Entourage",
    body: "Our thanks to the principal sponsors, bridesmaids, and groomsmen standing with us. Full details will follow closer to the day.",
  },
] as const;

export default function Details() {
  return (
    <section id="details" className="bg-paper px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-shell">
        <Reveal>
          <SectionLabel>The Details</SectionLabel>
          <h2 className="mt-6 max-w-2xl font-display text-3xl font-light leading-[1.15] text-ink md:text-5xl">
            A few notes to help you celebrate with us,{" "}
            <em className="italic text-accent-bright">comfortably and well.</em>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-x-16 gap-y-12 md:mt-20 md:grid-cols-2 lg:grid-cols-3">
          {DETAILS.map((detail, i) => (
            <Reveal key={detail.title} delay={(i % 3) * 0.06}>
              <div className="border-t border-line-dark pt-6">
                <h3 className="font-display text-xl italic text-ink">
                  {detail.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">
                  {detail.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-20 border-t border-line-dark pt-10 text-center font-display text-xl italic leading-relaxed text-accent-bright md:text-2xl">
            {COUPLE.groom.first} {COUPLE.groom.last} &amp; {COUPLE.bride.first}{" "}
            {COUPLE.bride.last}
            <span className="mt-2 block text-[11px] uppercase not-italic tracking-widest3 text-muted">
              {DATE_SHORT} · Tagum City
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
