"use client";

import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <footer id="contact" className="bg-ink px-6 py-20 md:px-12">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-14 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <p className="font-display italic text-2xl text-paper">GalleryType</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/50">
              A contemporary art collection featuring works, exhibitions, and
              stories from artists around the world.
            </p>
            <a
              href="mailto:hello@gallerytype.com"
              className="mt-6 inline-block text-sm text-accent-bright transition-colors hover:text-paper"
            >
              hello@gallerytype.com
            </a>
          </div>

          <div>
            <p className="mb-4 text-[12px] uppercase tracking-widest2 text-muted">Navigate</p>
            <ul className="space-y-2 text-sm text-paper/60">
              {["Home", "Collection", "Artists", "About", "Blog"].map((l) => (
                <li key={l}>
                  <a href={`#${l.toLowerCase()}`} className="transition-colors hover:text-paper">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-[12px] uppercase tracking-widest2 text-muted">Stay up to date</p>
            {sent ? (
              <p className="text-sm text-accent-bright">Thanks — you&apos;re subscribed.</p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email) setSent(true);
                }}
                className="flex border-b border-line pb-2"
              >
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your e-mail"
                  className="w-full bg-transparent text-sm text-paper placeholder:text-paper/30 focus:outline-none"
                />
                <button
                  type="submit"
                  className="shrink-0 text-[12px] uppercase tracking-widest2 text-accent-bright transition-colors hover:text-paper"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 text-xs text-paper/30 md:flex-row md:items-center">
          <p>Contemporary art</p>
          <p>© {new Date().getFullYear()} GalleryType. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
