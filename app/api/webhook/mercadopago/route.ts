import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Webhook MP:", JSON.stringify(body));

    if (body.type === "subscription_preapproval") {
      const preapprovalId = body.data?.id;

      if (!preapprovalId) {
        return NextResponse.json({ ok: false, erro: "sem id" }, { status: 400 });
      }

      // Buscar dados da assinatura na API do MP
      const mpRes = await fetch(
        `https://api.mercadopago.com/preapproval/${preapprovalId}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
          },
        }
      );

      if (!mpRes.ok) {
        console.error("Erro ao buscar preapproval no MP:", mpRes.status);
        return NextResponse.json({ ok: false }, { status: 500 });
      }

      const mpData = await mpRes.json();
      const payerEmail = mpData.payer_email;
      const status = mpData.status;

      if (!payerEmail) {
        return NextResponse.json({ ok: false, erro: "sem email" }, { status: 400 });
      }

      // Conectar no Supabase com service role (sem auth)
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );

      if (status === "authorized") {
        const { error } = await supabase
          .from("perfis")
          .update({ plano: "pro" })
          .eq("email", payerEmail);

        if (error) {
          console.error("Erro ao ativar plano pro:", error);
        } else {
          console.log(`✅ Plano ativado para ${payerEmail}`);
        }
      } else if (status === "cancelled" || status === "paused") {
        const { error } = await supabase
          .from("perfis")
          .update({ plano: "gratis" })
          .eq("email", payerEmail);

        if (error) {
          console.error("Erro ao desativar plano:", error);
        } else {
          console.log(`⏹️  Plano desativado para ${payerEmail}`);
        }
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Erro no webhook MP:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
