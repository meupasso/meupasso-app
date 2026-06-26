import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";

export async function GET() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.email !== "caiomvital@gmail.com") {
    return NextResponse.json({ error: "Não autorizado" }, { status: 403 });
  }

  const svc = createServiceClient();
  const hoje = new Date().toISOString().split("T")[0];

  const [
    { count: totalUsuarios },
    { count: exerciciosConcluidos },
    { count: totalExercicios },
    { count: totalProjetos },
    { count: conversasTutor },
    { count: vagasAtivas },
  ] = await Promise.all([
    svc.from("perfis").select("*", { count: "exact", head: true }),
    svc.from("progresso").select("*", { count: "exact", head: true }).eq("tipo", "exercicio").eq("status", "concluido"),
    svc.from("exercicios").select("*", { count: "exact", head: true }),
    svc.from("projetos").select("*", { count: "exact", head: true }),
    svc.from("conversas").select("*", { count: "exact", head: true }),
    svc.from("vagas").select("*", { count: "exact", head: true }).eq("ativa", true),
  ]);

  // Contar assinantes Pro pagantes (sem pro_expiracao = veio do Mercado Pago)
  // Pro concedido pelo admin SEMPRE tem pro_expiracao
  const { data: todosPerfis } = await svc.from("perfis").select("plano, pro_expiracao");
  const assinantesProPagantes = (todosPerfis || []).filter((p: any) =>
    p.plano?.toLowerCase() === "pro" && !p.pro_expiracao
  ).length;
  const assinantesProTotais = (todosPerfis || []).filter((p: any) =>
    p.plano?.toLowerCase() === "pro" && (!p.pro_expiracao || p.pro_expiracao >= hoje)
  ).length;

  const { data: ultimosCadastros } = await svc
    .from("perfis")
    .select("id, nome, email, plano, pro_expiracao, created_at, streak_atual")
    .order("created_at", { ascending: false })
    .limit(10);

  // Totais por linguagem
  const { data: exPorLinguagem } = await svc
    .from("exercicios")
    .select("linguagem");

  const linguagens: Record<string, number> = {};
  if (exPorLinguagem) {
    for (const e of exPorLinguagem) {
      linguagens[e.linguagem] = (linguagens[e.linguagem] || 0) + 1;
    }
  }

  // Progresso por linguagem
  const { data: progPorLinguagem } = await svc
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
    assinantesPro: assinantesProPagantes || 0,
    assinantesProTotal: assinantesProTotais || 0,
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
