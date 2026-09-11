// The site is served under a basePath (see next.config.ts). next/link applies
// it automatically. next/image and window.fetch do NOT — both need it added
// by hand, which is what the two helpers below are for. A bare
// fetch("/api/rsvp") would leave this app entirely and hit the wedd.space
// app that proxies us, so every same-origin fetch goes through apiPath().
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function apiPath(path: string): string {
  return `${BASE_PATH}${path}`;
}

/**
 * Prefixes a file in `public/` with the basePath, for `next/image`.
 *
 * Contrary to a long-standing note in this project's CLAUDE.md, next/image
 * does NOT apply basePath to `src` — Next's own docs are explicit that you
 * have to add it yourself (node_modules/next/dist/docs/01-app/03-api-reference
 * /05-config/01-next-config-js/basePath.md). The dev optimiser fetches `src`
 * back off this server, where `public/` only exists under the prefix, so an
 * unprefixed path 404s and every photo renders as "isn't a valid image".
 * Production hid the bug: Vercel's optimiser resolves against the deployment
 * root, so both spellings happen to work there.
 *
 * Not for metadata. `metadataBase` in layout.tsx already carries the prefix,
 * so OG image paths must stay bare or they end up doubled.
 */
export function assetPath(path: string): string {
  return `${BASE_PATH}${path}`;
}
