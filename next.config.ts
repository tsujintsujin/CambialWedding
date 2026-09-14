import type { NextConfig } from "next";

// Served at wedd.space/leisthercristine, proxied there by a rewrite in the
// wedd.space app (see its next.config.ts). basePath makes routes, assets and
// API handlers resolve under that prefix, so the site behaves identically
// whether it is reached through wedd.space or its own Vercel URL.
//
// Exported to the client too: next/link and next/image apply basePath on their
// own, but a raw fetch() does not. See app/lib/basePath.ts.
const basePath = "/leisthercristine";

const nextConfig: NextConfig = {
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  // All media is served by Cloudinary (lib/cloudinary.ts), which also does
  // the resizing — nothing goes through Vercel's image optimiser.
  images: { loader: "custom", loaderFile: "./app/lib/cloudinaryLoader.ts" },
  // The song is the one piece of media still in public/ — see CLAUDE.md.
  // It must be same-origin, and it must not be proxied.
};

export default nextConfig;
