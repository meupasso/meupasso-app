import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ erro: "Não autorizado" }, { status: 401 });
  }

  const svc = createServiceClient();
  const hoje = new Date().toISOString().split("T")[0];

  const { data, error } = await svc
    .from("perfis")
    .update({ plano: "gratis", pro_expiracao: null })
    .lt("pro_expiracao", hoje)
    .eq("plano", "pro")
    .select("id");

  if (error) {
    console.error("Erro ao expirar planos Pro:", error);
    return NextResponse.json({ erro: error.message }, { status: 500 });
  }

  return NextResponse.json({
    expirados: data?.length ?? 0,
    message: `${data?.length ?? 0} planos Pro expirados com sucesso.`,
  });
}
