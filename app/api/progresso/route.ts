import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

async function atualizarStreak(userId: string, supabase: ReturnType<typeof createClient>) {
  const hoje = new Date().toISOString().split("T")[0];
  const ontem = new Date(Date.now() - 86400000).toISOString().split("T")[0];

  const { data: user } = await supabase
    .from("users")
    .select("streak_atual, streak_maximo, ultimo_estudo")
    .eq("id", userId)
    .single();

  if (!user) return null;

  const ultimoEstudo = user.ultimo_estudo;
  let novoStreak = user.streak_atual || 0;

  if (ultimoEstudo === hoje) {
    // Já estudou hoje — não muda streak
    return { streak_atual: novoStreak, streak_maximo: Math.max(novoStreak, user.streak_maximo || 0) };
  } else if (ultimoEstudo === ontem) {
    // Estudou ontem — incrementa
    novoStreak += 1;
  } else {
    // Quebrou o streak — começa do 1
    novoStreak = 1;
  }

  const novoMaximo = Math.max(novoStreak, user.streak_maximo || 0);

  await supabase
    .from("users")
    .update({
      streak_atual: novoStreak,
      streak_maximo: novoMaximo,
      ultimo_estudo: hoje,
    })
    .eq("id", userId);

  return { streak_atual: novoStreak, streak_maximo: novoMaximo };
}

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

  // Atualizar streak de estudos
  const streak = await atualizarStreak(user.id, supabase);

  return NextResponse.json({ success: true, streak });
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

  // Se tipo=streak, retorna dados de streak do usuário
  if (tipo === "streak") {
    const { data: streakData } = await supabase
      .from("users")
      .select("streak_atual, streak_maximo, ultimo_estudo")
      .eq("id", user.id)
      .single();

    return NextResponse.json({
      streak_atual: streakData?.streak_atual || 0,
      streak_maximo: streakData?.streak_maximo || 0,
      ultimo_estudo: streakData?.ultimo_estudo || null,
    });
  }

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
