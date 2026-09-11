import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { COUPLE, DATE_SHORT } from "./lib/wedding";
import { OG_IMAGE } from "./lib/images";
import { BASE_PATH } from "./lib/basePath";

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
//
// Only the ORIGIN is taken from the environment. metadataBase has to carry
// the basePath as well — unlike next/link and next/image, metadata does not
// apply it — but reading that prefix from code rather than from the env var
// is what keeps the two from drifting apart. They drifted once already: the
// route was renamed on 2026-09-11 and NEXT_PUBLIC_SITE_URL kept the old
// spelling, so every shared link previewed a 404 image.
const origin = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3020")
).origin;

const siteUrl = `${origin}${BASE_PATH}`;

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

// Framer Motion server-renders its initial state as real inline styles, so
// the HTML ships with `opacity:0` on the hero and on every Reveal block. When
// the bundle runs, that is the first frame of an animation. When it does not,
// it is a blank page — which is how "the site can't be opened" was reported.
//
// Next 16 compiles for Safari 16.4 and up (see Next's modern-browserslist-
// target). An iPhone 6s, 7 or SE stops at iOS 15.8 and can never reach that,
// and a chunk can always fail to load on a bad connection. Either way the
// markup is all there — it is just invisible.
//
// So: watch the hero title, which animates on mount rather than on scroll. If
// it is still transparent after four seconds, nothing hydrated, and every
// element still holding its initial state is revealed. On a browser that
// works, the hero is opaque within a second and this never fires, which is
// what keeps the scroll reveals further down the page intact — they are
// legitimately still at opacity 0 while they wait to be scrolled to. A
// backgrounded tab throttles timers hard enough that the hero may genuinely
// not have animated yet, so that case waits rather than guessing.
//
// Deliberately ES5, with no optional chaining, arrow functions or const: it
// has to run in the browsers the main bundle could not parse.
const HYDRATION_WATCHDOG = `(function(){try{
var p=document.querySelector('[data-hydration-probe]');
if(!p){return}
var check=function(){try{
if(document.hidden){setTimeout(check,4000);return}
if(parseFloat(getComputedStyle(p).opacity)>0.5){return}
var n=document.querySelectorAll('[style*="opacity:0"],[style*="opacity: 0"]');
for(var i=0;i<n.length;i++){n[i].style.setProperty('opacity','1','important');
n[i].style.setProperty('transform','none','important')}
}catch(e){}};
setTimeout(check,4000)}catch(e){}})()`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${body.variable} bg-paper font-body text-ink antialiased`}
      >
        <noscript>
          {/* Same problem, simpler cause: with scripting off the initial
              state is all there ever is. */}
          <style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {children}
        <script dangerouslySetInnerHTML={{ __html: HYDRATION_WATCHDOG }} />
      </body>
    </html>
  );
}
