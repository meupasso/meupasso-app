import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Webhook MP:", JSON.stringify(body));

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    /* --- Assinatura Pro (subscription_preapproval) --- */
    if (body.type === "subscription_preapproval") {
      const preapprovalId = body.data?.id;

      if (!preapprovalId) {
        return NextResponse.json({ ok: false, erro: "sem id" }, { status: 400 });
      }

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

    /* --- Pagamento único — Análise de Empregabilidade (payment) --- */
    if (body.type === "payment") {
      const paymentId = body.data?.id;

      if (!paymentId) {
        return NextResponse.json({ ok: false, erro: "sem payment id" }, { status: 400 });
      }

      // Buscar detalhes do pagamento na API do MP
      const mpRes = await fetch(
        `https://api.mercadopago.com/v1/payments/${paymentId}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
          },
        }
      );

      if (!mpRes.ok) {
        console.error("Erro ao buscar payment no MP:", mpRes.status);
        return NextResponse.json({ ok: false }, { status: 500 });
      }

      const mpData = await mpRes.json();
      const analiseId = mpData.external_reference;
      const status = mpData.status;

      if (!analiseId) {
        console.warn("Payment sem external_reference — ignorando");
        return NextResponse.json({ ok: false, erro: "sem external_reference" }, { status: 400 });
      }

      if (status === "approved") {
        const { error } = await supabase
          .from("analises_empregabilidade")
          .update({ pago: true })
          .eq("id", analiseId);

        if (error) {
          console.error("Erro ao marcar análise como paga:", error);
        } else {
          console.log(`✅ Análise ${analiseId} paga — R$ 19,90 aprovado`);
        }
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Erro no webhook MP:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
