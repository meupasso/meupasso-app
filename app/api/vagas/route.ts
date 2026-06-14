import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const tecnologia = searchParams.get("tecnologia");
  const tipo = searchParams.get("tipo");
  const remoto = searchParams.get("remoto");
  const pagina = Math.max(1, parseInt(searchParams.get("pagina") || "1", 10));
  const porPagina = 12;

  const supabase = createServiceClient();

  // Count query
  let countQuery = supabase
    .from("vagas")
    .select("*", { count: "exact", head: true })
    .eq("ativa", true);

  if (tecnologia) countQuery = countQuery.contains("tecnologias", [tecnologia]);
  if (tipo) countQuery = countQuery.eq("tipo", tipo);
  if (remoto === "true") countQuery = countQuery.eq("remoto", true);

  const { count, error: countError } = await countQuery;

  if (countError) {
    return NextResponse.json({ error: countError.message }, { status: 500 });
  }

  // Data query with pagination
  let dataQuery = supabase
    .from("vagas")
    .select("*")
    .eq("ativa", true);

  if (tecnologia) dataQuery = dataQuery.contains("tecnologias", [tecnologia]);
  if (tipo) dataQuery = dataQuery.eq("tipo", tipo);
  if (remoto === "true") dataQuery = dataQuery.eq("remoto", true);

  const from = (pagina - 1) * porPagina;
  const to = pagina * porPagina - 1;

  const { data: vagas, error: dataError } = await dataQuery
    .order("publicada_em", { ascending: false, nullsFirst: false })
    .range(from, to);

  if (dataError) {
    return NextResponse.json({ error: dataError.message }, { status: 500 });
  }

  const body = JSON.stringify({
    vagas: vagas || [],
    total: count || 0,
    paginas: Math.ceil((count || 0) / porPagina),
  });

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store, max-age=0, must-revalidate",
      "CDN-Cache-Control": "no-store",
      "Vercel-CDN-Cache-Control": "no-store",
      "Pragma": "no-cache",
      "Expires": "0",
    },
  });
}
