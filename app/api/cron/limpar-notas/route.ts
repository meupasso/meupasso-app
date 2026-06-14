import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ erro: "Não autorizado" }, { status: 401 });
  }

  const supabase = createServiceClient();
  const dataLimite = new Date();
  dataLimite.setDate(dataLimite.getDate() - 60);

  const { data, error } = await supabase
    .from("notas")
    .delete()
    .lt("last_accessed_at", dataLimite.toISOString())
    .select("id");

  if (error) {
    console.error("Erro ao limpar notas:", error);
    return NextResponse.json({ erro: error.message }, { status: 500 });
  }

  return NextResponse.json({
    deletadas: data?.length ?? 0,
    message: `${data?.length ?? 0} notas deletadas`,
  });
}
