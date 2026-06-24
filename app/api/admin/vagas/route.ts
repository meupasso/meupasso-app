import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";

export async function GET(req: NextRequest) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.email !== "caiomvital@gmail.com") {
    return NextResponse.json({ error: "Não autorizado" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const busca = searchParams.get("busca");

  const svc = createServiceClient();
  let query = svc.from("vagas").select("*").order("created_at", { ascending: false });

  if (busca) query = query.ilike("titulo", `%${busca}%`);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.email !== "caiomvital@gmail.com") {
    return NextResponse.json({ error: "Não autorizado" }, { status: 403 });
  }

  const body = await req.json();
  if (!body.titulo || !body.url) {
    return NextResponse.json({ error: "Campos obrigatórios: titulo, url" }, { status: 400 });
  }

  const svc = createServiceClient();
  const { data, error } = await svc.from("vagas").insert({
    titulo: body.titulo,
    empresa: body.empresa || null,
    cidade: body.cidade || null,
    remoto: body.remoto ?? true,
    tipo: body.tipo || null,
    tecnologias: body.tecnologias || [],
    descricao: body.descricao || "",
    url: body.url,
    fonte: body.fonte || "admin",
    ativa: body.ativa ?? true,
  }).select().single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function PATCH(req: NextRequest) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.email !== "caiomvital@gmail.com") {
    return NextResponse.json({ error: "Não autorizado" }, { status: 403 });
  }

  const body = await req.json();
  if (!body.id) return NextResponse.json({ error: "id é obrigatório" }, { status: 400 });

  const svc = createServiceClient();
  const allowed = ["titulo", "empresa", "cidade", "remoto", "tipo", "tecnologias", "descricao", "url", "fonte", "ativa"];
  const updates: Record<string, any> = {};
  for (const key of allowed) {
    if (body[key] !== undefined) updates[key] = body[key];
  }

  const { data, error } = await svc.from("vagas").update(updates).eq("id", body.id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(req: NextRequest) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.email !== "caiomvital@gmail.com") {
    return NextResponse.json({ error: "Não autorizado" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id é obrigatório" }, { status: 400 });

  const svc = createServiceClient();
  const { error } = await svc.from("vagas").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
