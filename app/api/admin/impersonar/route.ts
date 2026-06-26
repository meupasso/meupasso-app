import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";

/**
 * POST /api/admin/impersonar
 * Gera um link mágico de login para o usuário alvo.
 * O admin clica no link retornado e acessa como o usuário.
 *
 * Body: { user_id: string }
 * Retorna: { link, email }
 */
export async function POST(req: NextRequest) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.email !== "caiomvital@gmail.com") {
    return NextResponse.json({ error: "Não autorizado" }, { status: 403 });
  }

  const { user_id } = await req.json();
  if (!user_id) {
    return NextResponse.json({ error: "user_id é obrigatório" }, { status: 400 });
  }

  try {
    const svc = createServiceClient();

    // Buscar email do usuário alvo
    const { data: userData, error: userError } = await svc.auth.admin.getUserById(user_id);
    if (userError || !userData?.user?.email) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }

    const email = userData.user.email;

    // Gerar link de acesso (magic link)
    const { data: linkData, error: linkError } = await svc.auth.admin.generateLink({
      type: "magiclink",
      email,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://meupasso.vercel.app"}`,
      },
    });

    if (linkError) {
      return NextResponse.json({ error: linkError.message }, { status: 500 });
    }

    // Extrair link do resultado
    const actionLink = (linkData as any)?.properties?.action_link || (linkData as any)?.action_link || "";

    return NextResponse.json({
      email,
      link: actionLink,
    });
  } catch (err: any) {
    console.error("Erro ao impersonar:", err);
    return NextResponse.json({ error: err.message || "Erro interno" }, { status: 500 });
  }
}
