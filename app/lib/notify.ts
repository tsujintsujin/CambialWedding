import { Resend } from "resend";

// SERVER-ONLY. Reads RESEND_API_KEY and ADMIN_NOTIFY_EMAIL. Never import this
// from a "use client" component.

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

// Resend will only deliver from a domain you have verified. Until one is set
// up, its shared sandbox sender works but reaches the Resend account owner
// only. Override with RESEND_FROM once the domain is verified.
const FROM = process.env.RESEND_FROM ?? "Wedding <onboarding@resend.dev>";

export const notifyConfigured = Boolean(resend);

/**
 * Who gets the notification: ADMIN_NOTIFY_EMAIL, and nothing else.
 *
 * This used to resolve the most recently signed-in Supabase Auth account, on
 * the idea that notifications should follow "whichever email is set up for
 * login". Two things killed that. This Supabase project is shared with another
 * app, so a sign-in belonging to that app would silently capture the wedding
 * notifications. And the couple's login is an identity, not an inbox — it can
 * be a placeholder on wedd.space with no mailbox behind it.
 *
 * The address that receives mail is now set explicitly and is unrelated to who
 * signs in.
 */
function resolveRecipient(): string | null {
  return process.env.ADMIN_NOTIFY_EMAIL?.trim() || null;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function template({
  headline,
  rows,
  body,
}: {
  headline: string;
  rows: { label: string; value: string }[];
  body?: string;
}) {
  const rowHtml = rows
    .map(
      (r) =>
        `<tr>
           <td style="padding:6px 16px 6px 0;color:#9C8E8B;font-size:11px;letter-spacing:.16em;text-transform:uppercase;vertical-align:top;">${escapeHtml(r.label)}</td>
           <td style="padding:6px 0;color:#151212;font-size:15px;">${escapeHtml(r.value)}</td>
         </tr>`
    )
    .join("");

  const bodyHtml = body
    ? `<p style="margin:22px 0 0;padding:18px 20px;background:#F7F4F1;border-left:3px solid #7A1F2B;color:#151212;font-size:15px;line-height:1.6;font-style:italic;">${escapeHtml(
        body
      ).replace(/\n/g, "<br>")}</p>`
    : "";

  return `<div style="margin:0;padding:32px 20px;background:#EDE6E1;font-family:Georgia,'Times New Roman',serif;">
  <div style="max-width:560px;margin:0 auto;background:#F7F4F1;padding:36px 32px;">
    <p style="margin:0;color:#7A1F2B;font-size:11px;letter-spacing:.28em;text-transform:uppercase;">Leisther &amp; Cristine</p>
    <h1 style="margin:18px 0 26px;color:#151212;font-size:24px;font-weight:400;font-style:italic;line-height:1.3;">${escapeHtml(headline)}</h1>
    <table style="border-collapse:collapse;width:100%;">${rowHtml}</table>
    ${bodyHtml}
    <p style="margin:30px 0 0;padding-top:18px;border-top:1px solid rgba(21,18,18,.12);color:#9C8E8B;font-size:12px;">
      Manage this in the admin page of the invitation site.
    </p>
  </div>
</div>`;
}

async function send(subject: string, html: string) {
  if (!resend) return { sent: false, reason: "RESEND_API_KEY is not set" };

  const to = resolveRecipient();
  if (!to) return { sent: false, reason: "ADMIN_NOTIFY_EMAIL is not set" };

  const { error } = await resend.emails.send({ from: FROM, to, subject, html });
  if (error) return { sent: false, reason: error.message };

  return { sent: true, reason: null };
}

export function notifyGuestbook(name: string, message: string) {
  return send(
    `${name} left a message for your wedding`,
    template({
      headline: `${name} left a message for your wedding.`,
      rows: [{ label: "From", value: name }],
      body: message,
    })
  );
}

export function notifyRsvp({
  name,
  attending,
  partySize,
  note,
}: {
  name: string;
  attending: boolean;
  partySize: number;
  note: string | null;
}) {
  return send(
    `${name} sent an RSVP`,
    template({
      headline: `${name} sent an RSVP.`,
      rows: [
        { label: "From", value: name },
        { label: "Reply", value: attending ? "Joyfully accepts" : "Regretfully declines" },
        ...(attending
          ? [
              {
                label: "People",
                value: `${partySize} ${partySize === 1 ? "person" : "people"}`,
              },
            ]
          : []),
      ],
      body: note ?? undefined,
    })
  );
}
