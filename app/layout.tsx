import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { COUPLE, DATE_SHORT } from "./lib/wedding";
import { OG_IMAGE } from "./lib/images";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500"],
  display: "swap",
});

const title = `${COUPLE.groom.first} & ${COUPLE.bride.first} — ${DATE_SHORT}`;
const description = `${COUPLE.groom.first} ${COUPLE.groom.last} and ${COUPLE.bride.first} ${COUPLE.bride.last} invite you to their wedding in Tagum City on ${DATE_SHORT}.`;

// Vercel injects VERCEL_PROJECT_PRODUCTION_URL on deploy; falls back to the
// dev origin so Open Graph image URLs always resolve to something absolute.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3020";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    images: [
      {
        url: OG_IMAGE.src,
        width: OG_IMAGE.width,
        height: OG_IMAGE.height,
        alt: title,
      },
    ],
  },
  twitter: { card: "summary_large_image", title, description },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${body.variable} bg-paper font-body text-ink antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
