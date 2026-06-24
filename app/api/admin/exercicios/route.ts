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
  const linguagem = searchParams.get("linguagem");
  const modulo = searchParams.get("modulo");
  const nivel = searchParams.get("nivel");
  const busca = searchParams.get("busca");

  const svc = createServiceClient();
  let query = svc.from("exercicios").select("*").order("linguagem").order("modulo").order("id_referencia");

  if (linguagem) query = query.eq("linguagem", linguagem);
  if (modulo) query = query.eq("modulo", modulo);
  if (nivel) query = query.eq("nivel", nivel);
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
  if (!body.titulo || !body.linguagem || !body.modulo || !body.nivel) {
    return NextResponse.json({ error: "Campos obrigatórios: titulo, linguagem, modulo, nivel" }, { status: 400 });
  }

  const svc = createServiceClient();
  const { data, error } = await svc.from("exercicios").insert({
    id_referencia: body.id_referencia || null,
    titulo: body.titulo,
    linguagem: body.linguagem,
    modulo: body.modulo,
    nivel: body.nivel,
    descricao: body.descricao || "",
    objetivo: body.objetivo || "",
    exemplos: body.exemplos || null,
    permitidos: body.permitidos || null,
    proibidos: body.proibidos || null,
    erros_comuns: body.erros_comuns || null,
    slug: body.slug || null,
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
  const allowed = ["id_referencia", "titulo", "linguagem", "modulo", "nivel", "descricao", "objetivo", "exemplos", "slug", "permitidos", "proibidos", "erros_comuns"];
  const updates: Record<string, any> = {};
  for (const key of allowed) {
    if (body[key] !== undefined) updates[key] = body[key];
  }

  const { data, error } = await svc.from("exercicios").update(updates).eq("id", body.id).select().single();
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
  const { error } = await svc.from("exercicios").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
