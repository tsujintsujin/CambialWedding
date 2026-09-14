@AGENTS.md

# Cambial – Cogtong Wedding

Wedding invitation site for **Leisther Cambial & Cristine Cogtong**,
10 October 2026, Tagum City, Davao del Norte.

- **Repo:** https://github.com/tsujintsujin/CambialWedding
- **Local:** `npm run dev` → http://localhost:3020
- **Stack:** Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS 3,
  Framer Motion, Supabase.

> History note: this repo began life as `GalleryType`, an art-gallery
> template, and was rewritten into this wedding site. The first two commits
> still carry the gallery name. The project folder was moved out of
> `Clients/GalleryType/` on 2026-09-07.

---

## Facts live in one file

Every date, name, venue and colour on the site comes from
[`app/lib/wedding.ts`](app/lib/wedding.ts). Change it there — the hero,
countdown, metadata, venue cards, motif list and footer all read from it.
Do not hard-code a date or address into a component.

**Date:** `2026-10-10T13:00:00+08:00` (Saturday, 1:00 PM, PST/UTC+8).

**Venues** (addresses confirmed by web search; neither is in OpenStreetMap,
so the "Open in Google Maps" buttons use a Maps *search* URL rather than
coordinates — that resolves correctly and won't drift):

| | |
|---|---|
| Ceremony | Inahan sa Kanunay'ng Panabang Parish — Manuel Suaybaguio Sr. Street, Purok B, Barangay Magugpo North, Tagum City 8100 |
| Reception | VJR Auditorium (VJR Arriesgado Auditorium) — National Highway, Visayan Village, Tagum City 8100 |

**Colour motif** — the client's palette card, exactly:
`#641428` `#8C2B3A` `#B55B4C` `#D8A98B` `#F7EFE6`
These are the `burgundy / wine / terracotta / sand / ivory` Tailwind colours
in [`tailwind.config.ts`](tailwind.config.ts). The site is ivory-ground with
burgundy ink; only the Venues section and footer invert to burgundy.

---

## The template is the design. Do not redesign it.

This site **is** the `GalleryType` template, filled in. An earlier pass threw
it away — replaced the collage hero with a full-bleed photo, the drag strip
with editorial chapters, the snap-scroll gallery with a masonry grid, and
flipped the whole palette from dark to light — none of which was asked for.
It has been restored. **Do not "improve" this layout.**

**Template, restored:** the collage hero, Venues pair, Story drag strip and
Gallery, with `accent #7A1F2B` and Fraunces + Inter. The template's own
tokens are used **inverted** — `paper` / `paper-dim` as the grounds and `ink`
as the type — because Justin asked to switch to the lighter theme. Same
palette, light side up; no new colours were invented for it. The footer keeps
`burgundy-deep` as a dark anchor, as signed off.

**Kept from the rewrite, by explicit request:** Countdown, Colour Motif,
The Details, the guestbook ("leave a note"), Footer, and the `/admin` route.
All restyled into the template's dark palette.

**Changed on request:** `PrenupGallery` → `Gallery` — slides with prev/next,
dot indicators and arrow keys instead of horizontal drag, and the per-photo
caption removed. RSVP dropped from The Details, and later added back as
its own section below the Colour Motif (see Guestbook & RSVP below).

### The Gallery transition has bitten twice — read before touching it

1. **Never cross-fade the frames.** The first attempt animated both slides
   through `opacity: 0` with a 60px offset, so mid-swipe the section ground
   showed through the whole frame *and* past the edges. A slideshow must be
   opaque at every instant: the incoming frame slides in over an outgoing
   frame that stays at full opacity until it is covered.
2. **Never mount all ten frames in one wide track.** The obvious fix — a
   19050px flex track — froze the renderer outright (ten full-bleed layers is
   roughly 100 MB of texture). Only the current frame, the one being covered,
   and the two neighbours are mounted.
3. `initial` must be `false` until the viewer has actually stepped, or the
   first frame slides in from off-screen on page load and drags the ground
   across the viewport.
4. Controls sit over photographs that are frequently near-white, so they
   carry a heavy `drop-shadow`; don't trade it for a lighter one.

Section order (`app/page.tsx`) follows the template's, with the retained
sections slotted in:
`Hero · Countdown · Venues · Story · Motif · RSVP · Guestbook · Details · Gallery · Footer`

---

## Media lives on Cloudinary, not in `public/`

Every photograph, the petal and the song are in **Cloudinary** — cloud
`dopunn7eb`, Media Library folder `leisthercristine` (the same account wedd.space
uses). Nothing is in `public/` any more; that took ~130 MB out of the Vercel
deployment. Moved on 2026-09-14.

- [`app/lib/cloudinary.ts`](app/lib/cloudinary.ts) builds the URLs. Files are
  addressed by bare filename: `leisthercristine/gallery-01.jpg`.
- `next/image` uses a custom loader
  ([`app/lib/cloudinaryLoader.ts`](app/lib/cloudinaryLoader.ts), wired in
  `next.config.ts`) that asks Cloudinary for `f_auto,q_auto,c_limit,w_<n>`.
  Vercel's image optimiser is not involved, and `src` gets no basePath.
- The song is a `video` resource (`video/upload/leisthercristine/music.mp3`).
- The gallery is `gallery-01` … `gallery-24`, counted in `GALLERY_IMAGES` in
  `lib/images.ts`. It is no longer read off disk.
- `leisthercristine/originals/` holds the 66 prenup exports that used to sit
  unreferenced in `public/gallery` and `public/hero` — kept so photos can be
  swapped without re-exporting.

**To swap a photo:** upload it into that folder under the same filename,
replacing the old asset, then delete that entry's `blurDataURL`. A Media
Library upload keeps the filename as the public ID, with no random suffix.

**Export from the originals.** The set is in a shared Google Drive folder:
fetch at `sz=w4000`, which returns the true originals (mostly 3504x2336).
`sz=w2400` is Drive's *downscaled* render; an earlier pass re-encoded that and
the full-bleed gallery looked visibly blurry. Upload the full-quality file;
Cloudinary does the resizing.

`sizes` still matters: setting it to the exact CSS box width makes `next/image`
request a 1x variant that looks soft on a better display. Give it about 2x.

---

## Do not write copy in the couple's voice

An earlier pass invented a relationship narrative — a seven-year story, a
lakeside proposal, captions about what they were thinking. None of it came
from Leisther or Cristine. It has been removed. **Do not put it back.**

- **`Story.tsx`** carries labels only — "The orchard", "The open road" — each
  naming the setting its photograph was taken in, the one thing the picture
  actually tells us. Add a caption field when the couple send words; don't
  invent one. An empty section is correct until then.
- **`Details.tsx`** — three entries carried from the earlier draft (dress
  code, gifts, entourage). The gift wording is unconfirmed. A no-children
  rule and an unplugged ceremony were invented outright and deleted; those
  are policies guests would act on. Don't add entries.
- Still in their first person and needing sign-off: the Hero's closing
  paragraph (template copy), the Motif dress guidance, the Details heading,
  the Countdown's day-of message, and the Footer sign-off.
- **`Rsvp.tsx`** copy is functional, not personal, and deliberately so: the
  heading addresses the guest in the third person ("Reply to Leisther &
  Cristine") the way the guestbook does, rather than speaking as the couple.
  The instruction line and the two confirmation lines still want sign-off. No
  deadline is shown — Justin confirmed on 2026-09-09 there isn't one yet, and
  a reply-by date is exactly the kind of thing guests act on, so don't invent
  one. It belongs in `wedding.ts` when it arrives.
- The Venues cards carry real venue photographs supplied by the couple —
  `venue-ceremony.jpg` and `venue-reception.jpg` on Cloudinary. Don't substitute stock venue images if they ever need replacing.

---

## Guestbook & RSVP (Supabase)

Guests post from `#guestbook`; nothing appears publicly until the couple
approves it. **The moderation login is at `/admin`** — a standalone noindex
page, Supabase Auth email + password. There is also a discreet "Admin" link
in the footer's bottom-right. Sign in there to approve, unpublish or delete
notes.

- `messages` table: `id, name, message, approved, created_at`.
- `rsvps` table: `id, name, attending, party_size, note, created_at`. Unlike
  the guestbook there is **no approval step and no public read** — the guest
  list is private. RLS grants `insert` to `anon` only; every read goes through
  `/api/admin/rsvps`, which uses the service role behind the same bearer-token
  guard as the messages route. A decline is stored with `party_size` 1 so a
  seat count never double-counts it.
- Public feed reads `approved = true` and subscribes to `postgres_changes`
  UPDATEs, so approving a note publishes it live and un-approving pulls it.
- `app/lib/supabaseAdmin.ts` uses the **service role key** and bypasses RLS.
  It is server-only — never import it from a `"use client"` component and
  never expose the key as `NEXT_PUBLIC_*`.
- Env vars: see `.env.local.example`.

---

## House rules

- **Browser testing goes through real Chrome** (`mcp__claude-in-chrome__*`),
  never the built-in Browser pane. `preview_start` may launch the dev server
  from `.claude/launch.json`; do the looking in Chrome.
- Tailwind is **v3**, not v4 — `@tailwind` directives, `tailwindcss` +
  `autoprefixer` in PostCSS. See the workspace `CLAUDE.md` for why.
- Check `D:\AIO Freelance\Notes\Workspace.md` before assuming anything about
  sibling projects or the `justin94.space` domain routing.

---

## Deployed at wedd.space/leisthercristine

Live at <https://wedd.space/leisthercristine> (the apex 301s to `www`).
Two deployments cooperate, and both must be redeployed for a routing change:

| | |
|---|---|
| This app | Vercel project `cambial-wedding`, **git-connected** — a push to `master` deploys it |
| wedd.space | Vercel project `wedd.space` (internally `wedd.pace`), repo `tsujintsujin/wedd-space` |

`next.config.ts` sets `basePath: "/leisthercristine"`, and the wedd.space app
proxies that path here with a `beforeFiles` rewrite. `beforeFiles` is load
bearing: wedd.space's public `[slug]` route would otherwise claim the path and
404, since no published `sites` row backs it. The slug is also in that app's
`RESERVED_SLUGS` so the publish flow can never mint a colliding site.

**The wedd.space project is not git-connected.** Its production deployments are
CLI deploys (`vercel --prod`), so pushing `wedd-space` master does *not* ship
it. Note also that its working copy sits on `test_server`, ahead of the
deployed `master` — deploy from a clean `master` worktree, never from that
dirty tree, or undeployed product work ships with your change.

**`basePath` does not reach `fetch`.** `next/link` and `next/image` prefix it
themselves; `window.fetch` does not. A bare `fetch("/api/rsvp")` leaves this
app and hits the wedd.space app instead, silently posting guest data to the
wrong origin. Every same-origin fetch goes through `apiPath()` in
[`app/lib/basePath.ts`](app/lib/basePath.ts). Keep it that way.

**Status:** Built and verified locally — desktop, and a true 375x812 render.
Deployed and verified live: pages, images, the `next/image` optimiser and the
API routes all resolve through the proxy.

**Outstanding:** the `cambial-wedding` Vercel project has no Supabase
environment variables, so RSVP and the guestbook render their "not connected
yet" placeholder copy to guests, and `/admin` cannot sign anyone in. Set the
vars from `.env.local.example` in the Vercel dashboard and redeploy. Do not
share the site with guests before that.

*Mobile testing note:* the attached Chrome window gets stuck maximised and
ignores `resize_window`, and `F12` / `Ctrl+Shift+M` don't reach browser chrome
through the MCP key channel. The way through is a temporary same-origin page
in `public/` holding a 375x812 `<iframe src="/">` — an iframe evaluates media
queries against its own box, so it is a faithful phone render in real Chrome.
Delete the harness afterwards.
