"use client";

import { cloudinary } from "./cloudinary";

// next/image loader (see next.config.ts). Cloudinary resizes and picks the
// format, so Vercel's optimiser never touches these files. `src` is the bare
// filename from lib/images.ts. c_limit never upscales past the original.
export default function cloudinaryLoader({
  src,
  width,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  return cloudinary(src, `f_auto,q_auto,c_limit,w_${width}`);
}
