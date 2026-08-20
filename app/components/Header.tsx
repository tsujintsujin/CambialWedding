"use client";

import { useState } from "react";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "Collection", href: "#collection" },
  { label: "Artists", href: "#artists" },
  { label: "About", href: "#about" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-6 md:px-12">
        <a href="#home" className="font-display italic text-xl tracking-wide text-paper">
          GalleryType
        </a>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-9 text-[13px] uppercase tracking-widest2 text-paper/80">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition-colors hover:text-paper">
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
              <li key={link.href}>
                <a href={link.href} onClick={() => setOpen(false)}>
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
