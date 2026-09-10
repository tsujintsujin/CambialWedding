import type { NextRequest } from "next/server";
import { supabase } from "./supabase";

// SERVER-ONLY.
//
// Being signed in is not the same as being an admin. This Supabase project is
// shared with another app and its sign-up endpoint is reachable with the anon
// key, so "any authenticated user" would let a stranger — or an account made
// for the other app — read the guest list and delete replies.
//
// Row Level Security does not help here: the admin routes read through the
// service role, which bypasses RLS by design. This allowlist is the control.
//
// ADMIN_EMAILS is a comma-separated list. Unset means nobody gets in — failing
// closed is the right way round for a page that exposes guest data.
function allowlist(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean);
}

export type AdminCheck =
  | { ok: true; email: string }
  | { ok: false; status: 401 | 403; error: string };

export async function requireAdmin(request: NextRequest): Promise<AdminCheck> {
  const authHeader = request.headers.get("authorization") ?? "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token || !supabase) {
    return { ok: false, status: 401, error: "Unauthorized" };
  }

  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user?.email) {
    return { ok: false, status: 401, error: "Unauthorized" };
  }

  const email = data.user.email.toLowerCase();
  const allowed = allowlist();

  if (allowed.length === 0) {
    return {
      ok: false,
      status: 403,
      error: "No admins are configured. Set ADMIN_EMAILS.",
    };
  }

  if (!allowed.includes(email)) {
    return {
      ok: false,
      status: 403,
      error: "This account is not allowed to open the admin page.",
    };
  }

  return { ok: true, email };
}
