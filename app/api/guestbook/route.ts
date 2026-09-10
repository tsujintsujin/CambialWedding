import { NextResponse, type NextRequest } from "next/server";
import { supabase } from "../../lib/supabase";
import { notifyGuestbook } from "../../lib/notify";

const MESSAGE_MAX = 280;

// Public endpoint, same shape as the RSVP one: anon insert so RLS still
// applies, on the server so the Resend key is never shipped to the browser.
// Notes still land unapproved and stay invisible until the couple publish them.
export async function POST(request: NextRequest) {
  if (!supabase) {
    return NextResponse.json({ error: "Supabase is not configured" }, { status: 500 });
  }

  let body: { name?: unknown; message?: unknown };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || name.length > 60) {
    return NextResponse.json({ error: "A name is required" }, { status: 400 });
  }

  if (!message || message.length > MESSAGE_MAX) {
    return NextResponse.json({ error: "A message is required" }, { status: 400 });
  }

  const { error } = await supabase.from("messages").insert({ name, message });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // The note is saved. A mail failure must not read as a failed submission.
  const mail = await notifyGuestbook(name, message).catch((err: unknown) => ({
    sent: false,
    reason: err instanceof Error ? err.message : "Notification failed",
  }));

  if (!mail.sent) {
    console.error("Guestbook notification not sent:", mail.reason);
  }

  return NextResponse.json({ success: true, notified: mail.sent });
}
