# Photograph slots

Every slot on the site has **its own file**. No image is shared between two
places, so replacing one can never change another.

To swap a photo: drop your file over the path below, keeping the filename and
the `.jpg` extension. Then open [`app/lib/images.ts`](../../app/lib/images.ts)
and delete that entry’s `blurDataURL` line — it is a thumbnail of the old
photo and will flash the wrong colour otherwise.

Next.js caches resized images by URL, so after replacing files run:

```bash
rm -rf .next && npm run dev
```

Source files want ~2400px on the long edge, JPEG quality 85. Every slot uses
`object-cover`, so the image is cropped to fill its box — keep the subject
near the centre.

## Hero

| File | Aspect | Where it appears |
|---|---|---|
| `hero/hero-backdrop.jpg` | 16:9 landscape | full-bleed washed backdrop behind the names (every width) |
| `hero/hero-collage-01.jpg` | 3:4 portrait | far left, upper (desktop only) |
| `hero/hero-collage-02.jpg` | 3:4 portrait | left, large centre frame (desktop only) |
| `hero/hero-collage-03.jpg` | 3:4 portrait | left, lower small frame (desktop only) |
| `hero/hero-collage-04.jpg` | 3:4 portrait | right, upper (desktop only) |
| `hero/hero-collage-05.jpg` | 3:4 portrait | right, tallest frame (desktop only) |
| `hero/hero-collage-06.jpg` | 3:4 portrait | right, lower small frame (desktop only) |

## Venues

| File | Aspect | Where it appears |
|---|---|---|
| `venues/venue-ceremony.jpg` | 4:3 landscape | left card, the ceremony church |
| `venues/venue-reception.jpg` | 4:3 landscape | right card, the reception hall |

## Story

| File | Aspect | Where it appears |
|---|---|---|
| `story/story-01.jpg` | 3:4 portrait | frame 1 of 6 |
| `story/story-02.jpg` | 3:4 portrait | frame 2 of 6 |
| `story/story-03.jpg` | 3:4 portrait | frame 3 of 6 |
| `story/story-04.jpg` | 3:4 portrait | frame 4 of 6 |
| `story/story-05.jpg` | 3:4 portrait | frame 5 of 6 |
| `story/story-06.jpg` | 3:4 portrait | frame 6 of 6 |

## Colour Motif

| File | Aspect | Where it appears |
|---|---|---|
| `motif/motif-feature.jpg` | 4:3 landscape | the single photograph beside the swatch strip |

## Gallery

| File | Aspect | Where it appears |
|---|---|---|
| `gallery/gallery-01.jpg` | 16:9 landscape | slide 1 of 10 |
| `gallery/gallery-02.jpg` | 16:9 landscape | slide 2 of 10 |
| `gallery/gallery-03.jpg` | 16:9 landscape | slide 3 of 10 |
| `gallery/gallery-04.jpg` | 16:9 landscape | slide 4 of 10 |
| `gallery/gallery-05.jpg` | 16:9 landscape | slide 5 of 10 |
| `gallery/gallery-06.jpg` | 16:9 landscape | slide 6 of 10 |
| `gallery/gallery-07.jpg` | 16:9 landscape | slide 7 of 10 |
| `gallery/gallery-08.jpg` | 16:9 landscape | slide 8 of 10 |
| `gallery/gallery-09.jpg` | 16:9 landscape | slide 9 of 10 |
| `gallery/gallery-10.jpg` | 16:9 landscape | slide 10 of 10 |

## Link preview

| File | Aspect | Where it appears |
|---|---|---|
| `social/og-image.jpg` | 1.91:1 landscape | Messenger, Viber, iMessage |

## Current contents

All 27 files are placeholders taken from the prenup set in `public/gallery/`
and `public/hero/`. Thirteen distinct photographs were duplicated to fill the
27 slots — `burgundy-03.jpg` alone was appearing in four places. Those two
original folders are no longer referenced by any component and can be deleted
once every slot here has been replaced.
