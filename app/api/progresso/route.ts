import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  const { tipo, referencia_id, linguagem, modulo } = await req.json();
  if (!tipo || !referencia_id) {
    return NextResponse.json({ error: "tipo e referencia_id são obrigatórios" }, { status: 400 });
  }

  const { error } = await supabase.from("progresso").upsert(
    {
      usuario_id: user.id,
      tipo,
      referencia_id,
      linguagem,
      modulo,
      status: "concluido",
    },
    { onConflict: "usuario_id, tipo, referencia_id", ignoreDuplicates: true }
  );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  const { tipo, referencia_id } = await req.json();
  if (!tipo || !referencia_id) {
    return NextResponse.json({ error: "tipo e referencia_id são obrigatórios" }, { status: 400 });
  }

  const { error } = await supabase
    .from("progresso")
    .delete()
    .eq("usuario_id", user.id)
    .eq("tipo", tipo)
    .eq("referencia_id", referencia_id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function GET(req: NextRequest) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const tipo = searchParams.get("tipo");
  const linguagem = searchParams.get("linguagem");
  const referencia_id = searchParams.get("referencia_id");

  // Se referencia_id foi passado, retorna se está concluído ou não
  if (referencia_id) {
    const { data, error } = await supabase
      .from("progresso")
      .select("id")
      .eq("usuario_id", user.id)
      .eq("tipo", tipo || "")
      .eq("referencia_id", referencia_id)
      .maybeSingle();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ concluido: !!data });
  }

  let query = supabase.from("progresso").select("tipo, referencia_id, linguagem, modulo").eq("usuario_id", user.id);

  if (tipo) query = query.eq("tipo", tipo);
  if (linguagem) query = query.eq("linguagem", linguagem);

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ progresso: data || [] });
}
