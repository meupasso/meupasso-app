import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";

export async function GET() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.email !== "caiomvital@gmail.com") {
    return NextResponse.json({ error: "Não autorizado" }, { status: 403 });
  }

  const svc = createServiceClient();
  const { data, error } = await svc
    .from("perfis")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data || []);
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

  // Se for uma ação de tornar pro por tempo determinado
  if (body.tornar_pro_por_dias) {
    const dias = parseInt(body.tornar_pro_por_dias);
    if (isNaN(dias) || dias <= 0) {
      return NextResponse.json({ error: "dias inválido" }, { status: 400 });
    }

    const expiracao = new Date();
    expiracao.setDate(expiracao.getDate() + dias);

    const { data, error } = await svc
      .from("perfis")
      .update({
        plano: "pro",
        pro_expiracao: expiracao.toISOString().split("T")[0],
      })
      .eq("id", body.id)
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  }

  // Remover pro (voltar a gratis)
  if (body.remover_pro) {
    const { data, error } = await svc
      .from("perfis")
      .update({ plano: "gratis", pro_expiracao: null })
      .eq("id", body.id)
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  }

  return NextResponse.json({ error: "Nenhuma ação especificada" }, { status: 400 });
}
