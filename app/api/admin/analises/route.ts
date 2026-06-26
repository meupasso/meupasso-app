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

  const { data } = await svc
    .from("analises_empregabilidade")
    .select("*")
    .order("criado_em", { ascending: false });

  return NextResponse.json(data || []);
}

/**
 * PATCH /api/admin/analises
 * Body: { id: string, pago: boolean }
 * Libera acesso sem pagamento
 */
export async function PATCH(req: Request) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.email !== "caiomvital@gmail.com") {
    return NextResponse.json({ error: "Não autorizado" }, { status: 403 });
  }

  const { id, pago } = await req.json();
  if (!id) {
    return NextResponse.json({ error: "id é obrigatório" }, { status: 400 });
  }

  const svc = createServiceClient();
  const { error } = await svc
    .from("analises_empregabilidade")
    .update({ pago: pago ?? true })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
