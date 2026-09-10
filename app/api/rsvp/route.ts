import { NextResponse, type NextRequest } from "next/server";
import { supabase } from "../../lib/supabase";
import { notifyRsvp } from "../../lib/notify";

const PARTY_MAX = 12;
const NOTE_MAX = 200;

// Public endpoint. The insert goes through the anon client so the table's RLS
// policy still governs it — the service role is never used on a guest path.
// It lives on the server only so the Resend key stays out of the browser.
export async function POST(request: NextRequest) {
  if (!supabase) {
    return NextResponse.json({ error: "Supabase is not configured" }, { status: 500 });
  }

  let body: {
    name?: unknown;
    attending?: unknown;
    partySize?: unknown;
    note?: unknown;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const attending = body.attending;
  const rawNote = typeof body.note === "string" ? body.note.trim() : "";
  const note = rawNote.length > 0 ? rawNote.slice(0, NOTE_MAX) : null;

  if (!name || name.length > 60) {
    return NextResponse.json({ error: "A name is required" }, { status: 400 });
  }

  if (typeof attending !== "boolean") {
    return NextResponse.json({ error: "Choose whether you can attend" }, { status: 400 });
  }

  // A decline never occupies more than one seat, whatever the client sent.
  const partySize = attending
    ? Math.min(PARTY_MAX, Math.max(1, Number(body.partySize) || 1))
    : 1;

  const { error } = await supabase
    .from("rsvps")
    .insert({ name, attending, party_size: partySize, note });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // The reply is already saved. A mail failure must never look like a failed
  // RSVP to the guest, so it is reported separately and never thrown.
  const mail = await notifyRsvp({ name, attending, partySize, note }).catch(
    (err: unknown) => ({
      sent: false,
      reason: err instanceof Error ? err.message : "Notification failed",
    })
  );

  if (!mail.sent) {
    console.error("RSVP notification not sent:", mail.reason);
  }

  return NextResponse.json({ success: true, notified: mail.sent });
}
