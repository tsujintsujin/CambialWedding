// Single source of truth for every fact that appears on the invitation.
// Change it here and it changes everywhere — hero, countdown, venues, metadata.

export const COUPLE = {
  bride: { first: "Cristine", last: "Cogtong" },
  groom: { first: "Leisther", last: "Cambial" },
} as const;

// 1:00 PM, Philippine Standard Time (UTC+8).
export const CEREMONY_ISO = "2026-10-10T13:00:00+08:00";
export const WEDDING_DATE = new Date(CEREMONY_ISO);

export const DATE_LONG = "Saturday, the tenth of October";
export const DATE_YEAR = "Two thousand twenty‑six";
export const DATE_NUMERIC = "10 . 10 . 2026";
export const DATE_SHORT = "October 10, 2026";
export const CEREMONY_TIME = "1:00 in the afternoon";

function mapsHref(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export const VENUES = [
  {
    kind: "The Ceremony",
    time: "1:00 PM",
    name: "Inahan sa Kanunay'ng Panabang Parish",
    lines: [
      "Manuel Suaybaguio Sr. Street, Purok B",
      "Barangay Magugpo North, Tagum City",
      "Davao del Norte 8100",
    ],
    note: "Please be seated by 12:40 PM so the processional can begin on time.",
    maps: mapsHref(
      "Inahan sa Kanunay'ng Panabang Parish, Magugpo North, Tagum City, Davao del Norte"
    ),
  },
  {
    kind: "The Reception",
    time: "Immediately after",
    name: "VJR Auditorium",
    lines: [
      "National Highway, Visayan Village",
      "Tagum City, Davao del Norte 8100",
    ],
    note: "Dinner, toasts, and dancing — a short drive from the parish.",
    maps: mapsHref("VJR Auditorium, Visayan Village, Tagum City, Davao del Norte"),
  },
] as const;

// The five tones from the couple's motif card, lightest use to darkest.
export const MOTIF = [
  { hex: "#641428", name: "Burgundy", role: "" },
  { hex: "#8C2B3A", name: "Wine", role: "" },
  { hex: "#B55B4C", name: "Terracotta", role: "" },
  { hex: "#D8A98B", name: "Sand", role: "" },
  { hex: "#F7EFE6", name: "Ivory", role: "" },
] as const;

export const NAV_LINKS = [
  { href: "#story", label: "Our Story" },
  { href: "#when", label: "When & Where" },
  { href: "#motif", label: "Colour Motif" },
  { href: "#rsvp", label: "RSVP" },
  { href: "#details", label: "Details" },
  { href: "#gallery", label: "Gallery" },
  { href: "#guestbook", label: "Guestbook" },
] as const;
