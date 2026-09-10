// Server-only. Reads the gallery folder at build time so the slideshow is
// whatever is actually sitting in public/images/gallery — drop a file in,
// it shows up. This cannot live in lib/images.ts: that module is imported by
// "use client" components, and node:fs has no place in a browser bundle.
import fs from "node:fs";
import path from "node:path";
import type { SiteImage } from "./images";

const DIR = path.join(process.cwd(), "public", "images", "gallery");

/** Every gallery-*.jpg in the folder, in natural filename order, so
 *  gallery-2 sorts before gallery-10 rather than after it. */
export function galleryImages(): SiteImage[] {
  return fs
    .readdirSync(DIR)
    .filter((name) => /^gallery-.*\.(jpe?g|png|webp|avif)$/i.test(name))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((name) => ({ src: `/images/gallery/${name}`, alt: "" }));
}
