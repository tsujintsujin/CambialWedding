// The site is served under a basePath (see next.config.ts). next/link applies
// it automatically; window.fetch does NOT, which is what the helper below is
// for. Media is on Cloudinary (lib/cloudinary.ts), so no asset needs it. A
// bare fetch("/api/rsvp") would leave this app entirely and hit the wedd.space
// app that proxies us, so every same-origin fetch goes through apiPath().
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function apiPath(path: string): string {
  return `${BASE_PATH}${path}`;
}
