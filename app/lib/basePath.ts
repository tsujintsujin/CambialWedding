// The site is served under a basePath (see next.config.ts). next/link and
// next/image prefix it automatically; window.fetch does not. A bare
// fetch("/api/rsvp") would leave this app entirely and hit the wedd.space
// app that proxies us, so every same-origin fetch goes through apiPath().
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function apiPath(path: string): string {
  return `${BASE_PATH}${path}`;
}
