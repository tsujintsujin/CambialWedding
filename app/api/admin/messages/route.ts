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
    .from("messages")
    .select("id, name, message, approved, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ messages: data });
}

export async function PATCH(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  if (!supabaseAdminConfigured || !supabaseAdmin) {
    return NextResponse.json({ error: "Admin client is not configured" }, { status: 500 });
  }

  let body: { id?: string; approved?: boolean };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.id || typeof body.approved !== "boolean") {
    return NextResponse.json({ error: "Expected { id, approved }" }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("messages")
    .update({ approved: body.approved })
    .eq("id", body.id)
    .select("id, name, message, approved, created_at")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: data });
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

  const { error } = await supabaseAdmin.from("messages").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
