"use client";

import { useEffect, useRef, useState } from "react";
import { assetPath } from "../lib/basePath";

const START_DELAY = 1000;
const VOLUME = 0.35;

/**
 * Background music, started a second after the page opens.
 *
 * Every current browser blocks audible autoplay until the visitor has
 * interacted with the page — `play()` rejects with NotAllowedError and there
 * is no way to opt out of that. So the one-second attempt is the happy path
 * (it succeeds when the visitor has already been on the site, which Chrome
 * remembers per-origin), and the first gesture afterwards is the fallback.
 * Muting it to force autoplay through would mean silent "music", so it isn't
 * worth doing.
 *
 * The toggle is not decoration: a guest may well open this on a commute, and
 * sound that starts on its own needs a visible way to stop it.
 */
export default function Music() {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.volume = VOLUME;

    // Only these events grant user activation, which is what the autoplay
    // policy actually gates on. `scroll` and `wheel` grant nothing, and
    // neither does `touchstart` — on a phone the activation arrives at
    // `touchend`, so listening to the start of the tap fails and costs the
    // guest a second one. `pointerdown` counts for a mouse but not for touch,
    // and `pointerup` is the reverse, so both are here.
    // https://developer.mozilla.org/en-US/docs/Web/Security/User_activation
    const events = [
      "keydown",
      "mousedown",
      "pointerdown",
      "pointerup",
      "touchend",
      "click",
    ] as const;
    let onGesture: ((e: Event) => void) | null = null;

    const unlisten = () => {
      if (!onGesture) return;
      events.forEach((e) => window.removeEventListener(e, onGesture!));
      onGesture = null;
    };

    const timer = setTimeout(() => {
      el.play().catch(() => {
        onGesture = (e) => {
          // The toggle below is not a "first gesture" — its own onClick owns
          // that tap. Without this, pointerdown starts playback (paused flips
          // to false synchronously) and the click that follows reads it as
          // playing and pauses it again, so the first press looks dead.
          const target = e.target as Element | null;
          if (target?.closest?.("[data-music-toggle]")) return;
          // Activation is sticky, so the listeners stay armed until a play()
          // actually resolves — an early event that grants nothing simply
          // fails and the next one tries again.
          el.play().then(unlisten, () => {});
        };
        events.forEach((e) =>
          window.addEventListener(e, onGesture!, { passive: true }),
        );
      });
    }, START_DELAY);

    // Mirror the element rather than assuming — the fallback above can start
    // playback at any moment, well after this component last rendered.
    const sync = () => setPlaying(!el.paused);
    el.addEventListener("play", sync);
    el.addEventListener("pause", sync);

    return () => {
      clearTimeout(timer);
      unlisten();
      el.removeEventListener("play", sync);
      el.removeEventListener("pause", sync);
    };
  }, []);

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) el.play().catch(() => {});
    else el.pause();
  };

  return (
    <>
      {/* preload="none" keeps 4 MB of audio from competing with the Hero
          photographs at first paint; play() fetches it when it is wanted. */}
      <audio ref={ref} src={assetPath("/audio/music.mp3")} loop preload="none" />
      <button
        type="button"
        onClick={toggle}
        data-music-toggle
        aria-label={playing ? "Pause the music" : "Play the music"}
        aria-pressed={playing}
        className="fixed bottom-5 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-paper/30 bg-accent/80 text-paper shadow-lg shadow-black/25 backdrop-blur-sm transition-colors duration-300 hover:bg-accent"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
          aria-hidden
        >
          <path d="M4 9.5h3.2L11.5 6v12L7.2 14.5H4z" />
          {playing ? (
            <>
              <path d="M15.2 9.3a3.6 3.6 0 0 1 0 5.4" />
              <path d="M17.8 6.9a7 7 0 0 1 0 10.2" />
            </>
          ) : (
            <path d="M16 10l4 4m0-4l-4 4" />
          )}
        </svg>
      </button>
    </>
  );
}
