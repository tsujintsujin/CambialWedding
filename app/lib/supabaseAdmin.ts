import { createClient } from "@supabase/supabase-js";

// SERVER-ONLY. Uses the Supabase service role key, which bypasses Row Level
// Security. Never import this file from a "use client" component, and never
// expose SUPABASE_SERVICE_ROLE_KEY as a NEXT_PUBLIC_* variable.

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabaseAdminConfigured = Boolean(url && serviceRoleKey);

export const supabaseAdmin = supabaseAdminConfigured
  ? createClient(url!, serviceRoleKey!, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : null;
