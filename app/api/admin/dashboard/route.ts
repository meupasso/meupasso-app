import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.email !== "caiomvital@gmail.com") {
    return NextResponse.json({ error: "Não autorizado" }, { status: 403 });
  }

  const [
    { count: totalUsuarios },
    { count: assinantesPro },
    { count: exerciciosConcluidos },
    { count: totalExercicios },
    { count: totalProjetos },
    { count: conversasTutor },
    { count: vagasAtivas },
  ] = await Promise.all([
    supabase.from("perfis").select("*", { count: "exact", head: true }),
    supabase.from("perfis").select("*", { count: "exact", head: true }).eq("plano", "pro"),
    supabase.from("progresso").select("*", { count: "exact", head: true }).eq("tipo", "exercicio").eq("status", "concluido"),
    supabase.from("exercicios").select("*", { count: "exact", head: true }),
    supabase.from("projetos").select("*", { count: "exact", head: true }),
    supabase.from("conversas").select("*", { count: "exact", head: true }),
    supabase.from("vagas").select("*", { count: "exact", head: true }).eq("ativa", true),
  ]);

  const { data: ultimosCadastros } = await supabase
    .from("perfis")
    .select("id, nome, email, plano, created_at, streak_atual")
    .order("created_at", { ascending: false })
    .limit(10);

  // Totais por linguagem
  const { data: exPorLinguagem } = await supabase
    .from("exercicios")
    .select("linguagem");

  const linguagens: Record<string, number> = {};
  if (exPorLinguagem) {
    for (const e of exPorLinguagem) {
      linguagens[e.linguagem] = (linguagens[e.linguagem] || 0) + 1;
    }
  }

  // Progresso por linguagem
  const { data: progPorLinguagem } = await supabase
    .from("progresso")
    .select("linguagem")
    .eq("tipo", "exercicio")
    .eq("status", "concluido");

  const progLinguagens: Record<string, number> = {};
  if (progPorLinguagem) {
    for (const p of progPorLinguagem) {
      if (p.linguagem) progLinguagens[p.linguagem] = (progLinguagens[p.linguagem] || 0) + 1;
    }
  }

  return NextResponse.json({
    totalUsuarios: totalUsuarios || 0,
    assinantesPro: assinantesPro || 0,
    exerciciosConcluidos: exerciciosConcluidos || 0,
    totalExercicios: totalExercicios || 0,
    totalProjetos: totalProjetos || 0,
    conversasTutor: conversasTutor || 0,
    vagasAtivas: vagasAtivas || 0,
    totalPorLinguagem: linguagens,
    progressoPorLinguagem: progLinguagens,
    ultimosCadastros: ultimosCadastros || [],
  });
}
