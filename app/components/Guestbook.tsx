"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import { supabase, supabaseConfigured } from "../lib/supabase";
import { COUPLE } from "../lib/wedding";

type GuestMessage = {
  id: string;
  name: string;
  message: string;
  created_at: string;
};

const INITIAL_VISIBLE = 9;
const AUTOPLAY_MS = 4000;
const SWIPE_DISTANCE = 50;

// Direction-aware: the incoming note enters from the side it was swiped from.
const SLIDE: Variants = {
  enter: (d: number) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
  center: { opacity: 1, x: 0 },
  exit: (d: number) => ({ opacity: 0, x: d > 0 ? -60 : 60 }),
};

// Deterministic tone per guest so the same name always gets the same swatch.
const AVATAR_TONES = ["#641428", "#8C2B3A", "#B55B4C", "#D8A98B"];

function toneFor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  return AVATAR_TONES[hash % AVATAR_TONES.length]!;
}

function initialsFor(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return `${parts[0]![0]}${parts[parts.length - 1]![0]}`.toUpperCase();
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function Note({
  message,
  className = "",
}: {
  message: GuestMessage;
  className?: string;
}) {
  const tone = toneFor(message.name);
  return (
    <figure
      className={`flex break-inside-avoid flex-col border border-line-dark bg-paper p-6 ${className}`}
    >
      <blockquote className="font-display text-[17px] italic leading-relaxed text-ink">
        &ldquo;{message.message}&rdquo;
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-line-dark pt-4">
        <span
          aria-hidden
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] tracking-wide text-ink"
          style={{ backgroundColor: tone }}
        >
          {initialsFor(message.name)}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[11px] uppercase tracking-widest2 text-ink">
            {message.name}
          </span>
          <span className="block text-[11px] text-muted">
            {formatDate(message.created_at)}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

function NoteCarousel({ messages }: { messages: GuestMessage[] }) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  // Autoplay stops for good once the guest takes control, rather than yanking
  // the card away from whoever is mid-read.
  const [taken, setTaken] = useState(false);

  const count = messages.length;
  const safeIndex = count === 0 ? 0 : Math.min(index, count - 1);

  const step = useCallback(
    (delta: number) => {
      setDir(delta);
      setIndex((current) => (current + delta + count) % count);
    },
    [count]
  );

  useEffect(() => {
    if (taken || count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      setDir(1);
      setIndex((current) => (current + 1) % count);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(id);
  }, [taken, count]);

  const current = messages[safeIndex];
  if (!current) return null;

  return (
    <div>
      <div className="grid grid-cols-1 overflow-hidden">
        {messages.map((m) => (
          <div
            key={`sizer-${m.id}`}
            aria-hidden
            className="invisible col-start-1 row-start-1"
          >
            <Note message={m} />
          </div>
        ))}

        <AnimatePresence mode="wait" initial={false} custom={dir}>
          <motion.div
            key={current.id}
            custom={dir}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragStart={() => setTaken(true)}
            onDragEnd={(_event, info) => {
              if (info.offset.x < -SWIPE_DISTANCE) step(1);
              else if (info.offset.x > SWIPE_DISTANCE) step(-1);
            }}
            variants={SLIDE}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="col-start-1 row-start-1 cursor-grab active:cursor-grabbing"
          >
            {/* h-full so every card fills the frame the sizers establish;
                mt-auto drops the attribution to the bottom instead of
                leaving it stranded under a short note. */}
            <Note
              message={current}
              className="h-full [&>figcaption]:mt-auto"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {count > 1 && (
        <div className="mt-2 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => {
              setTaken(true);
              step(-1);
            }}
            aria-label="Previous note"
            className="px-3 py-2 font-display text-3xl leading-none text-accent transition-opacity duration-300 hover:opacity-70"
          >
            &#8249;
          </button>
          {/* A counter, not dots: there are too many notes for a dot each
              to fit a phone's width. */}
          <span
            aria-live="polite"
            className="min-w-[4.5rem] text-center text-[11px] uppercase tracking-widest2 tabular-nums text-muted"
          >
            {safeIndex + 1} / {count}
          </span>
          <button
            type="button"
            onClick={() => {
              setTaken(true);
              step(1);
            }}
            aria-label="Next note"
            className="px-3 py-2 font-display text-3xl leading-none text-accent transition-opacity duration-300 hover:opacity-70"
          >
            &#8250;
          </button>
        </div>
      )}
    </div>
  );
}

export default function Guestbook() {
  const [messages, setMessages] = useState<GuestMessage[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!supabase) return;
    const client = supabase;

    client
      .from("messages")
      .select("id, name, message, created_at")
      .eq("approved", true)
      .order("created_at", { ascending: false })
      .then(({ data, error: selectError }) => {
        if (selectError) setLoadError(selectError.message);
        else if (data) setMessages(data as GuestMessage[]);
        setLoaded(true);
      });

    // Notes are only published once the couple approves them, so the feed
    // listens for UPDATEs and drops anything that gets un-approved again.
    const channel = client
      .channel("messages-feed")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "messages" },
        (payload) => {
          const updated = payload.new as GuestMessage & { approved: boolean };
          if (!updated.approved) {
            setMessages((prev) => prev.filter((m) => m.id !== updated.id));
            return;
          }
          setMessages((prev) =>
            prev.some((m) => m.id === updated.id)
              ? prev.map((m) => (m.id === updated.id ? updated : m))
              : [updated, ...prev]
          );
        }
      )
      .subscribe();

    return () => {
      client.removeChannel(channel);
    };
  }, []);

  const visible = expanded ? messages : messages.slice(0, INITIAL_VISIBLE);

  return (
    <section id="guestbook" className="bg-paper-dim px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-shell">
        <Reveal>
          <SectionLabel>Guestbook</SectionLabel>
          <h2 className="mt-6 max-w-2xl font-display text-3xl font-light leading-[1.15] text-ink md:text-5xl">
            Notes for{" "}
            <em className="italic text-accent-bright">
              {COUPLE.groom.first} &amp; {COUPLE.bride.first}
            </em>
          </h2>
        </Reveal>

        <div className="mt-14">
          <div>
            {!supabaseConfigured && (
              <p className="max-w-sm text-[15px] leading-relaxed text-muted">
                The guestbook isn&apos;t connected yet.
              </p>
            )}
            {loadError ? (
              <p className="text-sm text-accent-bright">
                Couldn&apos;t load the guestbook: {loadError}
              </p>
            ) : !supabaseConfigured || !loaded ? null : messages.length === 0 ? (
              <p className="font-display text-xl italic text-muted">
                No notes yet.
              </p>
            ) : (
              <>
                {/* Phones get one note at a time, swipeable and self-advancing;
                    there is no room for two columns. */}
                <div className="md:hidden">
                  <NoteCarousel messages={messages} />
                </div>

                <div className="hidden md:block">
                  <div className="columns-2 gap-4 lg:columns-3">
                    <AnimatePresence initial={false}>
                      {visible.map((m) => (
                        <motion.div
                          key={m.id}
                          className="mb-4"
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.45 }}
                        >
                          <Note message={m} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {messages.length > INITIAL_VISIBLE && (
                    <button
                      type="button"
                      onClick={() => setExpanded((v) => !v)}
                      className="mt-4 border border-line-dark px-5 py-3 text-[11px] uppercase tracking-widest2 text-muted transition-colors duration-300 hover:border-accent-bright hover:text-accent-bright"
                    >
                      {expanded
                        ? "Show fewer notes"
                        : `Read all ${messages.length} notes`}
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
