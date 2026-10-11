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

// The four tones from the couple's motif card, lightest use to darkest.
export const MOTIF = [
  { hex: "#641428", name: "Burgundy", role: "" },
  { hex: "#8C2B3A", name: "Wine", role: "" },
  { hex: "#B55B4C", name: "Terracotta", role: "" },
  { hex: "#D8A98B", name: "Sand", role: "" },
] as const;

export const NAV_LINKS = [
  { href: "#when", label: "When & Where" },
  { href: "#motif", label: "Colour Motif" },
  { href: "#details", label: "Details" },
  { href: "#gallery", label: "Gallery" },
  { href: "#guestbook", label: "Guestbook" },
] as const;

// The entourage card, as the couple sent it. Where two names share a role they
// are kept as a pair so the card can set them side by side.
export const PARENTS = {
  groom: ["Loreta C. Cambial", "Lolito H. Cambial"],
  bride: ["Evelyn C. Celada", "Nestor Celada"],
} as const;

export const OFFICIANT = "Rev. Father Marlon Pates";

// Ninong & Ninang. Single entries were sent without a partner.
export const PRINCIPAL_SPONSORS: readonly (readonly string[])[] = [
  ["Hon. Mayor Margarita Y. Rubinos"],
  ["Dr. Amber Marie Malaya"],
  ["Lida Bonita"],
  ["Hon. Atty. Jasmin V. Campion", "Joel Campion"],
  ["Ruby Jean L. Claveria", "Julmer S. Claveria"],
  ["Hon. Anna Cagulada", "Gregorio Holgado"],
  ["Leny C. Lopez", "Arnel J. Lopez"],
  ["Marievin Pedrosa", "John Rey Pedrosa"],
  ["Socorro L. Neri", "Apollo Fortunato B. Neri, IV"],
  ["Engr. Amadeus Palomata RCE", "Shery Joy A. Palomata"],
  ["Elizabeth Eladia P. Araza", "Francisco A. Araza"],
  ["Mitzi Dagaang", "Henry Dagaang"],
  ["Annabelle L. Fidelis", "Lauro L. Fidelis"],
  ["Vina T. Li", "Datian C. Li"],
  ["Norie T. Miranda", "Jaime P. Miranda"],
  ["Rosenie P. Guanzon", "Edwin M. Guanzon"],
  ["Mary Grace S. Baldonado", "Edson L. Baldonado"],
  ["Irma G. Tubalado", "Fructuso A. Tubalado Jr."],
];

export const SECONDARY_SPONSORS = [
  { role: "Rope", names: ["Mary Grace Belleza", "Elmer Belleza"] },
  { role: "Candle", names: ["Juvilene M. Carmona", "Roberto P. Carmona"] },
  { role: "Veil", names: ["Elaine C. Basan", "Crisanto C. Basan"] },
] as const;

export const HONOR = { bestMan: "Leonel Cambial", maidOfHonor: "Rizalyn Cogtong" } as const;

export const GROOMSMEN = [
  "Cris Eniale C. Basan",
  "Rommel A. Gonzaga",
  "Rayven C. Cogtong",
  "Andy C. Belleza",
  "Aries C. Belleza",
  "Christian M. Carmona",
  "Jason C. Peticaros",
  "Lawrence D. Carmona",
  "Noah C. Molina",
] as const;

export const BRIDESMAIDS = [
  "Nede Jean E. Cañete",
  "Ethel A. Gonzaga",
  "Emie Grace P. Mesolis",
  "Allysa Janine M. Carmona",
  "Lyka C. Belleza",
  "Nikki Joy E. Cañete",
  "Mitch Erysh C. Oplenaria",
  "Katrina D. Carmona",
  "Savannah P. Heso",
] as const;

export const BEARERS = [
  { role: "Ring Bearer", names: ["Edmer C. Belleza"] },
  { role: "Aras Bearer", names: ["Gabriel C. Molina"] },
  { role: "Bible Bearer", names: ["Xiendrick M. Carmona"] },
  { role: "Little Bride", names: ["Kassandra Rae Cambial"] },
  { role: "Flower Girls", names: ["Crisella Mae C. Basan", "Charmaine D. Cañete"] },
  { role: "Flower Couple", names: ["Breza C. Belleza", "Juancho C. Padpad"] },
] as const;
