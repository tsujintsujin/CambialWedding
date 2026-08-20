"use client";

import { useState } from "react";
import { useSectionNav } from "./SectionNavContext";

const LINKS = [
  { label: "Home", id: "home" },
  { label: "Collection", id: "collection" },
  { label: "Artists", id: "artists" },
  { label: "About", id: "about" },
  { label: "Blog", id: "blog" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { goToId } = useSectionNav();

  const handleClick = (id: string) => {
    goToId(id);
    setOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-6 md:px-12">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleClick("home");
          }}
          className="font-display italic text-xl tracking-wide text-paper"
        >
          GalleryType
        </a>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-9 text-[13px] uppercase tracking-widest2 text-paper/80">
            {LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(link.id);
                  }}
                  className="transition-colors hover:text-paper"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span className={`h-px w-6 bg-paper transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
          <span className={`h-px w-6 bg-paper transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
        </button>
      </div>

      {open && (
        <nav className="border-t border-line bg-ink/95 px-6 py-6 backdrop-blur md:hidden">
          <ul className="flex flex-col gap-5 text-sm uppercase tracking-widest2 text-paper/80">
            {LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(link.id);
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
