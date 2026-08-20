"use client";

import Placeholder from "./Placeholder";
import { useSectionNav } from "./SectionNavContext";

export default function Articles() {
  const { goToId } = useSectionNav();

  return (
    <section className="flex h-full w-full items-center overflow-y-auto bg-ink px-6 md:px-12">
      <div className="mx-auto w-full max-w-[1400px]">
        <p className="mb-10 text-[12px] uppercase tracking-widest2 text-muted">Articles</p>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              label: "Past and Future Indefinite",
              title: "Past and Future Indefinite",
              sub: "Exhibition in Liepaja",
            },
            {
              label: "Printed Catalog",
              title: "Printed catalog 2005–2015",
              sub: "Collection archive",
            },
            {
              label: "Art and Business",
              title: "Art and business",
              sub: "Notes from the field",
            },
          ].map((a) => (
            <a
              href="#"
              key={a.title}
              onClick={(e) => {
                e.preventDefault();
                goToId("blog");
              }}
              className="group block"
            >
              <Placeholder label={a.label} className="aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-[1.02]" />
              <h3 className="mt-5 font-display text-xl italic text-paper">{a.title}</h3>
              <p className="mt-1 text-sm text-paper/50">{a.sub}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
