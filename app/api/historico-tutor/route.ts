import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const exercicioId = searchParams.get("exercicio_id");
  if (!exercicioId) {
    return NextResponse.json({ error: "exercicio_id é obrigatório" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("historico_tutor")
    .select("mensagens")
    .eq("usuario_id", user.id)
    .eq("exercicio_id", exercicioId)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ mensagens: data?.mensagens || [] });
}

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  const { exercicio_id, linguagem, mensagens } = await req.json();
  if (!exercicio_id || !mensagens) {
    return NextResponse.json({ error: "exercicio_id e mensagens são obrigatórios" }, { status: 400 });
  }

  const { error } = await supabase.from("historico_tutor").upsert(
    {
      usuario_id: user.id,
      exercicio_id,
      linguagem: linguagem || null,
      mensagens,
      updated_at: new Date().toISOString(),
    },
    {
      onConflict: "usuario_id, exercicio_id",
      ignoreDuplicates: false,
    }
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

  const { searchParams } = new URL(req.url);
  const exercicioId = searchParams.get("exercicio_id");
  if (!exercicioId) {
    return NextResponse.json({ error: "exercicio_id é obrigatório" }, { status: 400 });
  }

  const { error } = await supabase
    .from("historico_tutor")
    .delete()
    .eq("usuario_id", user.id)
    .eq("exercicio_id", exercicioId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
