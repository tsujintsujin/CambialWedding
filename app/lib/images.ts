// Every photograph on the site, one entry per slot on the page.
//
// ─── HOW TO SWAP A PHOTO ────────────────────────────────────────────────
// Drop your file over the matching path in `public/images/` — keep the
// filename and the .jpg extension — and that slot changes. Nothing else
// needs editing. Every slot has its own file: no image is shared between
// two places, so replacing one can never change another.
//
// Two follow-ups after you replace files:
//   1. `blurDataURL` below is a tiny thumbnail of the OLD photo, shown for
//      a beat while the real one loads. Leave it and you'll see a flash of
//      the wrong colour; delete the line and the slot simply fades in with
//      no blur, which is always safe. Regenerate them once you're done.
//   2. Next.js caches resized images under `.next/cache/images` keyed by
//      URL, so a same-path replacement keeps serving the old file. Run
//      `rm -rf .next` and restart `npm run dev`.
//
// Source files want to be ~2400px on the long edge, quality 85. Anything
// smaller than the box it fills will look soft on a good screen.
// ────────────────────────────────────────────────────────────────────────

export type SiteImage = {
  src: string;
  /** Empty string = decorative, screen readers skip it. That is correct for
   *  the collage, story strip and gallery, which repeat what the page says
   *  in words. Fill it in only where the photo carries its own meaning. */
  alt: string;
  /** Optional. Delete this line when you replace the file — see note above. */
  blurDataURL?: string;
  /** Optional per-image framing, used by the gallery slideshow.
   *  `object-[x%_y%]` pans inside the frame — 50%/50% is centred, a lower
   *  y shows more of the top. `scale-110` zooms in. Both are optional;
   *  leave "object-center scale-100" for the default full-bleed crop. */
  className?: string;
};

// ─── HERO ───────────────────────────────────────────────────────────────

/** The washed-out photograph behind the names, at every screen width. */
export const HERO_BACKDROP: SiteImage = {
  // Hero — full-bleed washed backdrop behind the names (every width)
  // Aspect: 16:9 landscape. Crops to fill, so the subject wants to be centred.
  src: "/images/hero/hero-backdrop.jpg",
  alt: "",
};

/** The scattered collage. Desktop only — below 1280px these are hidden,
 *  so the backdrop carries the section alone. Order matches the layout
 *  positions in Hero.tsx and is not interchangeable. */
export const HERO_COLLAGE: SiteImage[] = [
  {
    // Hero collage — far left, upper (desktop only)
    // Aspect: 3:4 portrait. Crops to fill, so the subject wants to be centred.
    src: "/images/hero/hero-collage-01.jpg",
    alt: "",
    blurDataURL: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAALABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDQ0zXbe6tY4GgVSowy/wAOPam3Gq2VhHJGkOTJknYRkVx9m7KTg4omZmLEk52g1BnzPY//2Q==",
  },
  {
    // Hero collage — left, large centre frame (desktop only)
    // Aspect: 3:4 portrait. Crops to fill, so the subject wants to be centred.
    src: "/images/hero/hero-collage-02.jpg",
    alt: "",
    blurDataURL: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAALABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDci1H5PmOCeAc8ZqVtRRBiXKn6isyA5syxCk8dhSXsrbUyFPblQaHNXISdj//Z",
  },
  {
    // Hero collage — left, lower small frame (desktop only)
    // Aspect: 3:4 portrait. Crops to fill, so the subject wants to be centred.
    src: "/images/hero/hero-collage-03.jpg",
    alt: "",
    blurDataURL: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAALABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDA0yyF9M0ZbbgcHPeiaxkRljWM79xUksOfw7Vp6E2+6cMAQq5AwODVTWXYXCkHacnkDHesuZ81jSy5bn//2Q==",
  },
  {
    // Hero collage — right, upper (desktop only)
    // Aspect: 3:4 portrait. Crops to fill, so the subject wants to be centred.
    src: "/images/hero/hero-collage-04.jpg",
    alt: "",
    blurDataURL: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAALABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDorncAEjbaWB5zyPpTowxjyWbIOM+tSMoLgkcgUdFpiP/Z",
  },
  {
    // Hero collage — right, tallest frame (desktop only)
    // Aspect: 3:4 portrait. Crops to fill, so the subject wants to be centred.
    src: "/images/hero/hero-collage-05.jpg",
    alt: "",
    blurDataURL: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAALABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDau9Ut7JwLiTDDsOv5VPaambm2EyRHYxwpJ61zN8BcX9u8w3M77W7ZH0rpfssCS2dukSiLax24pXKfLyq25//Z",
  },
  {
    // Hero collage — right, lower small frame (desktop only)
    // Aspect: 3:4 portrait. Crops to fill, so the subject wants to be centred.
    src: "/images/hero/hero-collage-06.jpg",
    alt: "",
    blurDataURL: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAALABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwB8U18QobK5PLDnFPuJ5liHlb2fJ3H27U6IYUYokJ24rn9q2WqWh//Z",
  },
];

// ─── VENUES ─────────────────────────────────────────────────────────────

/** Order matches VENUES in wedding.ts: ceremony first, then reception. */
export const VENUE_IMAGES: SiteImage[] = [
  {
    // Venues — left card, the ceremony church
    // Aspect: 4:3 landscape. Crops to fill, so the subject wants to be centred.
    src: "/images/venues/venue-ceremony.jpg",
    alt: "Inahan sa Kanunay'ng Panabang Parish",
    blurDataURL: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAALABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABQME/8QAIBAAAQQCAgMBAAAAAAAAAAAAAQIDBBEAMRIhBSIzkf/EABUBAQEAAAAAAAAAAAAAAAAAAAEC/8QAGBEBAQADAAAAAAAAAAAAAAAAAQACEiH/2gAMAwEAAhEDEQA/AGJXkER/mkq5aNdZNmaJQ90kFIo0MJkRGHQorRfVbNfmZFR2mWyG08RrZx2TtLiX/9k=",
  },
  {
    // Venues — right card, the reception hall
    // Aspect: 4:3 landscape. Crops to fill, so the subject wants to be centred.
    src: "/images/venues/venue-reception.jpg",
    alt: "VJR Auditorium",
    blurDataURL: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAALABADASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAABf/EACQQAAICAQMCBwAAAAAAAAAAAAEDAhEFAAQhBhITFBUiQWFx/8QAFAEBAAAAAAAAAAAAAAAAAAAAAv/EABcRAAMBAAAAAAAAAAAAAAAAAAACEQH/2gAMAwEAAhEDEQA/AFMG0emDy6VBdXGp93ur5+9H5vdzeoJdjnMks8sULiRXNH90L03uXIm7w5mN1pnJ77cDHM7WdtzI4iBxROizTYNVuU//2Q==",
  },
];

// ─── STORY ──────────────────────────────────────────────────────────────

/** The horizontal drag strip. Six portrait frames, left to right. */
export const STORY_IMAGES: SiteImage[] = [
  {
    // Story drag strip — frame 1 of 6
    // Aspect: 3:4 portrait. Crops to fill, so the subject wants to be centred.
    src: "/images/story/story-01.jpg",
    alt: "",
    blurDataURL: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAALABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDQ0zXbe6tY4GgVSowy/wAOPam3Gq2VhHJGkOTJknYRkVx9m7KTg4omZmLEk52g1BnzPY//2Q==",
  },
  {
    // Story drag strip — frame 2 of 6
    // Aspect: 3:4 portrait. Crops to fill, so the subject wants to be centred.
    src: "/images/story/story-02.jpg",
    alt: "",
    blurDataURL: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAALABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCc38FrZI0Xz4UHAPA+tVprm6nQt8yDBI28delNZRLAVkAIznFWNxMRBPAHFTJyexMYrqf/2Q==",
  },
  {
    // Story drag strip — frame 3 of 6
    // Aspect: 3:4 portrait. Crops to fill, so the subject wants to be centred.
    src: "/images/story/story-03.jpg",
    alt: "",
    blurDataURL: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAALABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDci1H5PmOCeAc8ZqVtRRBiXKn6isyA5syxCk8dhSXsrbUyFPblQaHNXISdj//Z",
  },
  {
    // Story drag strip — frame 4 of 6
    // Aspect: 3:4 portrait. Crops to fill, so the subject wants to be centred.
    src: "/images/story/story-04.jpg",
    alt: "",
    blurDataURL: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAALABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDA0yyF9M0ZbbgcHPeiaxkRljWM79xUksOfw7Vp6E2+6cMAQq5AwODVTWXYXCkHacnkDHesuZ81jSy5bn//2Q==",
  },
  {
    // Story drag strip — frame 5 of 6
    // Aspect: 3:4 portrait. Crops to fill, so the subject wants to be centred.
    src: "/images/story/story-05.jpg",
    alt: "",
    blurDataURL: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAALABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDau9Ut7JwLiTDDsOv5VPaambm2EyRHYxwpJ61zN8BcX9u8w3M77W7ZH0rpfssCS2dukSiLax24pXKfLyq25//Z",
  },
  {
    // Story drag strip — frame 6 of 6
    // Aspect: 3:4 portrait. Crops to fill, so the subject wants to be centred.
    src: "/images/story/story-06.jpg",
    alt: "",
    blurDataURL: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAALABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwB8U18QobK5PLDnFPuJ5liHlb2fJ3H27U6IYUYokJ24rn9q2WqWh//Z",
  },
];

// ─── COLOUR MOTIF ───────────────────────────────────────────────────────

/** The one photograph beside the palette swatches. This alt text is real
 *  content, not decoration — rewrite it to match whatever you put here. */
export const MOTIF_IMAGE: SiteImage = {
  // Colour Motif — the single photograph beside the swatch strip
  // Aspect: 4:3 landscape. Crops to fill, so the subject wants to be centred.
  src: "/images/motif/motif-feature.jpg",
  alt: "The colour motif, worn",
  blurDataURL: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAALABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDau9Ut7JwLiTDDsOv5VPaambm2EyRHYxwpJ61zN8BcX9u8w3M77W7ZH0rpfssCS2dukSiLax24pXKfLyq25//Z",
};

// ─── GALLERY ────────────────────────────────────────────────────────────

/** The full-bleed slideshow, one entry per slide, in order. Add or
 *  remove entries freely — the dots, arrows and keyboard steps all count
 *  off this array. Each slide carries its own framing in `className`:
 *  pan with `object-[x%_y%]`, zoom with `scale-*`. Nothing is shared
 *  between slides, so adjusting one never moves another. */
/** Slides to drop on phones. Some photographs simply don't survive a
 *  portrait crop — a wide group shot, anything with the subject far left or
 *  right. List the bare filename, e.g. "gallery-07.jpg"; matching is on the
 *  end of the src, so the folder path doesn't matter. Empty = show all. */
export const GALLERY_MOBILE_EXCLUDE: string[] = [
  "gallery-15.jpg",
  "gallery-21.jpg",
];

/** Slides to drop from 768px up — the mirror of GALLERY_MOBILE_EXCLUDE, for
 *  photographs that only work in a portrait crop. Bare filenames. */
export const GALLERY_DESKTOP_EXCLUDE: string[] = [
  "gallery-14.jpg",
];

/** Per-photo framing on phones only — above 768px every slide goes back to
 *  `object-top`. The value is the horizontal crop: 50% is centred, and
 *  because the photo is wider than the frame, a HIGHER number slides the
 *  photo left (showing more of its right side) and a lower number slides it
 *  right. Keep these as whole literal class names — Tailwind scans this file
 *  for them, so a string it has to assemble at runtime won't be generated. */
export const GALLERY_MOBILE_FRAMING: Record<string, string> = {
  "gallery-02.jpg": "object-[55%_top]", // left a little
  "gallery-03.jpg": "object-[45%_top]", // right a little
  "gallery-05.jpg": "object-[45%_top]", // right a little
  "gallery-07.jpg": "object-[40%_top]", // right
  "gallery-10.jpg": "object-[60%_top]", // left
  "gallery-12.jpg": "object-[40%_top]", // right
  "gallery-13.jpg": "object-[70%_top]", // left
  "gallery-24.jpg": "object-[60%_top]", // left
};

/** The same idea for the wide frame, where the default `md:object-top` can
 *  cut a subject standing in the middle of a tall photograph. The value is
 *  the vertical crop: `top` is the default, and a HIGHER number slides the
 *  photo up (showing more of its lower half), with `center` = 50%. */
export const GALLERY_DESKTOP_FRAMING: Record<string, string> = {
  "gallery-09.jpg": "md:object-[center_15%]", // down a little
  "gallery-10.jpg": "md:object-top", // pinned to the top edge — lowering clips the head
  "gallery-11.jpg": "md:object-[center_25%]", // up a little
  "gallery-19.jpg": "md:object-[center_42%]", // up
};

export const GALLERY_IMAGES: SiteImage[] = [
  {
    // Slide 1 of 15. Reposition with the class below.
    src: "/images/gallery/gallery-01.jpg",
    alt: "",
    className: "object-center scale-100",
  },
  {
    // Slide 2 of 15. Reposition with the class below.
    src: "/images/gallery/gallery-02.jpg",
    alt: "",
    className: "object-center scale-100",
  },
  {
    // Slide 3 of 15. Reposition with the class below.
    src: "/images/gallery/gallery-03.jpg",
    alt: "",
    className: "object-center scale-100",
  },
  {
    // Slide 4 of 15. Reposition with the class below.
    src: "/images/gallery/gallery-04.jpg",
    alt: "",
    className: "object-center scale-100",
  },
  {
    // Slide 5 of 15. Reposition with the class below.
    src: "/images/gallery/gallery-05.jpg",
    alt: "",
    className: "object-center scale-100",
  },
  {
    // Slide 6 of 15. Reposition with the class below.
    src: "/images/gallery/gallery-06.jpg",
    alt: "",
    className: "object-center scale-100",
  },
  {
    // Slide 7 of 15. Reposition with the class below.
    src: "/images/gallery/gallery-07.jpg",
    alt: "",
    className: "object-center scale-100",
  },
  {
    // Slide 8 of 15. Reposition with the class below.
    src: "/images/gallery/gallery-08.jpg",
    alt: "",
    className: "object-center scale-100",
  },
  {
    // Slide 9 of 15. Reposition with the class below.
    src: "/images/gallery/gallery-09.jpg",
    alt: "",
    className: "object-center scale-100",
  },
  {
    // Slide 10 of 15. Reposition with the class below.
    src: "/images/gallery/gallery-10.jpg",
    alt: "",
    className: "object-center scale-100",
  },
  {
    // Slide 11 of 15. Reposition with the class below.
    src: "/images/gallery/gallery-11.jpg",
    alt: "",
    className: "object-center scale-100",
  },
  {
    // Slide 12 of 15. Reposition with the class below.
    src: "/images/gallery/gallery-12.jpg",
    alt: "",
    className: "object-center scale-100",
  },
  {
    // Slide 13 of 15. Reposition with the class below.
    src: "/images/gallery/gallery-13.jpg",
    alt: "",
    className: "object-center scale-100",
  },
  {
    // Slide 14 of 15. Reposition with the class below.
    src: "/images/gallery/gallery-14.jpg",
    alt: "",
    className: "object-center scale-100",
  },
  {
    // Slide 15 of 15. Reposition with the class below.
    src: "/images/gallery/gallery-15.jpg",
    alt: "",
    className: "object-center scale-100",
  },
];

// ─── LINK PREVIEW ───────────────────────────────────────────────────────

/** Shown when the link is pasted into Messenger, Viber, iMessage etc.
 *  Facebook wants at least 1200x630; anything smaller renders as a thumb.
 *  The declared size below is metadata only — update it if your
 *  replacement is not 3:2. */
export const OG_IMAGE = {
  src: "/images/social/og-image.jpg",
  width: 2880,
  height: 1920,
} as const;
// ─── HELPER ─────────────────────────────────────────────────────────────

/**
 * Spread onto a `next/image` to get the blur-up placeholder when the entry
 * still has one, and nothing at all when it doesn't. This is what lets you
 * delete a `blurDataURL` line above without touching any component.
 */
export function blurProps(image: SiteImage) {
  return image.blurDataURL
    ? ({ placeholder: "blur" as const, blurDataURL: image.blurDataURL })
    : {};
}
