import { NextResponse, type NextRequest } from "next/server";
import { requireAdmin } from "../../../lib/adminAuth";
import { supabaseAdmin, supabaseAdminConfigured } from "../../../lib/supabaseAdmin";


export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  if (!supabaseAdminConfigured || !supabaseAdmin) {
    return NextResponse.json({ error: "Admin client is not configured" }, { status: 500 });
  }

  const { data, error } = await supabaseAdmin
    .from("rsvps")
    .select("id, name, attending, party_size, note, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ rsvps: data });
}

export async function DELETE(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  if (!supabaseAdminConfigured || !supabaseAdmin) {
    return NextResponse.json({ error: "Admin client is not configured" }, { status: 500 });
  }

  let id = request.nextUrl.searchParams.get("id");
  if (!id) {
    try {
      const body = await request.json();
      id = body?.id ?? null;
    } catch {
      id = null;
    }
  }

  if (!id) {
    return NextResponse.json({ error: "Expected { id }" }, { status: 400 });
  }

  const { error } = await supabaseAdmin.from("rsvps").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
