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
  // The song is the one exception: it stays in Cloudinary, but guests fetch
  // it from our own origin. <audio> is far more fragile cross-origin than
  // <img> — a blocker, a privacy setting or a media-src rule kills playback
  // outright and silently, and moving it off /public is what broke it. The
  // rewrite keeps the 4 MB out of the deployment while restoring the
  // same-origin URL the player had before. Rewrites are basePath-aware, so
  // this matches /leisthercristine/audio/music.mp3.
  async rewrites() {
    return [
      {
        source: "/audio/music.mp3",
        destination:
          "https://res.cloudinary.com/dopunn7eb/video/upload/leisthercristine/music.mp3",
      },
    ];
  },
};

export default nextConfig;
