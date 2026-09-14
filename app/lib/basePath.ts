// The site is served under a basePath (see next.config.ts). next/link and
// next/image apply it automatically; a raw URL in `src` or a window.fetch does
// NOT. A bare fetch("/api/rsvp") would leave this app entirely and hit the
// wedd.space app that proxies us, so every same-origin fetch goes through
// apiPath(). Photographs come straight from Cloudinary and need none of this,
// but the song is served from our own origin by a rewrite — see next.config.ts
// for why — so it needs the prefix too.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function apiPath(path: string): string {
  return `${BASE_PATH}${path}`;
}

/** Same as apiPath, named for the other caller: a media URL in an element's
 *  `src`, which Next does not prefix for you. */
export const assetPath = apiPath;
