import { COUPLE, DATE_SHORT, NAV_LINKS } from "../lib/wedding";
import { BASE_PATH } from "../lib/basePath";

export default function Footer() {
  return (
    <footer className="bg-burgundy-deep px-6 py-16 text-ivory md:px-10 md:py-20">
      <div className="mx-auto max-w-shell">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-3xl font-light leading-tight md:text-4xl">
              {COUPLE.groom.first}{" "}
              <span className="mx-1 italic text-sand">&amp;</span>{" "}
              {COUPLE.bride.first}
            </p>
            <p className="mt-4 text-[11px] uppercase tracking-widest2 text-ivory/50">
              {DATE_SHORT} · Tagum City, Davao del Norte
            </p>
          </div>

          {/* Six labels wrap raggedly in a flex row at phone widths, so they
              sit in two aligned columns until there is room for one line. */}
          <nav className="grid grid-cols-2 gap-x-7 gap-y-3 sm:flex sm:flex-wrap">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[11px] uppercase tracking-widest2 text-ivory/55 transition-colors duration-300 hover:text-sand"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] uppercase tracking-widest2 text-ivory/35">
            With love and gratitude, from both our families.
          </p>
          <a
            // A plain anchor, so basePath does not reach it the way it
            // reaches next/link. Without the prefix this leaves the site and
            // lands on wedd.space/admin, which 404s.
            href={`${BASE_PATH}/admin`}
            className="text-[10px] uppercase tracking-widest2 text-ivory/20 transition-colors duration-300 hover:text-ivory/60"
          >
            Admin
          </a>
        </div>
      </div>
    </footer>
  );
}
