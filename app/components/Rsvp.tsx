"use client";

import { useState, type FormEvent } from "react";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import { supabase, supabaseConfigured } from "../lib/supabase";
import { COUPLE } from "../lib/wedding";

const NOTE_MAX_LENGTH = 200;
const PARTY_MAX = 12;

const CHOICES = [
  { value: true, label: "Joyfully accepts" },
  { value: false, label: "Regretfully declines" },
];

export default function Rsvp() {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<boolean | null>(null);
  const [partySize, setPartySize] = useState(1);
  const [note, setNote] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!supabase || !name.trim() || attending === null) return;

    setSending(true);
    setError(null);

    // Posted to the server rather than inserted from here, so the couple can
    // be emailed on submit without the Resend key reaching the browser.
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          attending,
          partySize,
          note: note.trim() || null,
        }),
      });
      const body = await res.json();

      if (!res.ok) {
        setError("Your reply did not send: " + (body.error ?? "please try again"));
        return;
      }

      setSent(true);
    } catch (err) {
      setError(
        "Your reply did not send: " +
          (err instanceof Error ? err.message : "please try again")
      );
    } finally {
      setSending(false);
    }
  };

  const reset = () => {
    setName("");
    setAttending(null);
    setPartySize(1);
    setNote("");
    setSent(false);
  };

  return (
    <section
      id="rsvp"
      className="border-b border-line-dark bg-paper-dim px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto grid max-w-shell items-start gap-14 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <SectionLabel>RSVP</SectionLabel>
          <h2 className="mt-6 font-display text-3xl font-light leading-[1.15] text-ink md:text-[2.75rem]">
            Reply to{" "}
            <em className="italic text-accent-bright">
              {COUPLE.groom.first} &amp; {COUPLE.bride.first}
            </em>
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted">
            One reply per invitation. Please count everyone in your party,
            including yourself.
          </p>
        </Reveal>

        <Reveal className="lg:col-span-7" delay={0.1}>
          {!supabaseConfigured ? (
            <p className="max-w-sm text-[15px] leading-relaxed text-muted">
              The RSVP form is not connected yet. Once it is wired up to
              Supabase, replies will arrive in the admin page.
            </p>
          ) : sent ? (
            <div className="border border-line-dark bg-paper p-7">
              <p className="font-display text-xl italic leading-relaxed text-ink">
                {attending
                  ? "Thank you — your reply is in."
                  : "Thank you for letting us know."}
              </p>
              <button
                type="button"
                onClick={reset}
                className="mt-6 border border-line-dark px-5 py-3 text-[11px] uppercase tracking-widest2 text-muted transition-colors duration-300 hover:border-accent-bright hover:text-accent-bright"
              >
                Send another reply
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 border border-line-dark bg-paper p-7"
            >
              <label className="block">
                <span className="text-[10px] uppercase tracking-widest2 text-muted">
                  Your name
                </span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  maxLength={60}
                  className="mt-2 w-full border-b border-line-dark bg-transparent pb-2 font-display text-lg italic text-ink outline-none transition-colors duration-300 placeholder:text-ink/35 focus:border-accent-bright"
                  placeholder="Maria Santos"
                />
              </label>

              <fieldset>
                <legend className="text-[10px] uppercase tracking-widest2 text-muted">
                  Will you be there?
                </legend>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {CHOICES.map((choice) => (
                    <label key={choice.label} className="block cursor-pointer">
                      <input
                        type="radio"
                        name="attending"
                        required
                        checked={attending === choice.value}
                        onChange={() => setAttending(choice.value)}
                        className="peer sr-only"
                      />
                      <span className="block border border-line-dark px-4 py-3 text-center text-[11px] uppercase tracking-widest2 text-ink/70 transition-colors duration-300 peer-checked:border-accent peer-checked:bg-accent peer-checked:text-paper peer-focus-visible:border-accent-bright">
                        {choice.label}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {attending === true && (
                <label className="block">
                  {/* Explicitly block: the other fields only break onto a new
                      line because their input is w-full. This one is not. */}
                  <span className="block text-[10px] uppercase tracking-widest2 text-muted">
                    How many of you?
                  </span>
                  <input
                    type="number"
                    value={partySize}
                    onChange={(e) =>
                      setPartySize(
                        Math.min(PARTY_MAX, Math.max(1, Number(e.target.value) || 1))
                      )
                    }
                    min={1}
                    max={PARTY_MAX}
                    className="mt-2 w-20 border-b border-line-dark bg-transparent pb-2 font-display text-lg italic tabular-nums text-ink outline-none transition-colors duration-300 focus:border-accent-bright"
                  />
                </label>
              )}

              <label className="block">
                <span className="text-[10px] uppercase tracking-widest2 text-muted">
                  Anything to add? (optional)
                </span>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  maxLength={NOTE_MAX_LENGTH}
                  className="mt-2 w-full resize-none border-b border-line-dark bg-transparent pb-2 text-[15px] leading-relaxed text-ink outline-none transition-colors duration-300 placeholder:text-ink/35 focus:border-accent-bright"
                  placeholder="Dietary needs, travelling from out of town..."
                />
                <span className="mt-1 block text-right text-[10px] tabular-nums text-ink/45">
                  {note.length} / {NOTE_MAX_LENGTH}
                </span>
              </label>

              <button
                type="submit"
                disabled={sending}
                className="mt-1 w-full border border-accent bg-accent px-5 py-3 text-[11px] uppercase tracking-widest2 text-paper transition-colors duration-300 hover:bg-transparent hover:text-ink disabled:opacity-40"
              >
                {sending ? "Sending..." : "Send your reply"}
              </button>

              {error && <p className="text-xs text-accent-bright">{error}</p>}
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
