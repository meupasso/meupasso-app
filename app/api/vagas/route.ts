import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const tecnologia = searchParams.get("tecnologia");
  const tipo = searchParams.get("tipo");
  const remoto = searchParams.get("remoto");
  const pagina = Math.max(1, parseInt(searchParams.get("pagina") || "1", 10));
  const porPagina = 12;

  const supabase = createServiceClient();

  let query = supabase
    .from("vagas")
    .select("*", { count: "exact" })
    .eq("ativa", true)
    .order("publicada_em", { ascending: false, nullsFirst: false });

  if (tecnologia) {
    query = query.contains("tecnologias", [tecnologia]);
  }

  if (tipo) {
    query = query.eq("tipo", tipo);
  }

  if (remoto === "true") {
    query = query.eq("remoto", true);
  }

  const from = (pagina - 1) * porPagina;
  const to = from + porPagina - 1;

  const { data: vagas, error, count } = await query.range(from, to);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    vagas: vagas || [],
    total: count || 0,
    paginas: Math.ceil((count || 0) / porPagina),
  });
}
