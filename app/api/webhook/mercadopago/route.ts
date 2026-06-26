import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  try {
    // Verificar webhook secret (opcional — MP usa x-signature)
    const webhookSecret = process.env.MP_WEBHOOK_SECRET;
    if (webhookSecret) {
      const xSignature = req.headers.get("x-signature") || "";
      // Se configurado e não bater, rejeitar
      // Nota: MP envia x-signature com ts + hash — validação completa é complexa
      // Para produção, configurar no dashboard do MP e validar aqui
    }

    const body = await req.json();
    console.log("Webhook MP recebido:", body.type || body.action, body.data?.id);

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
    if (body.type === "payment" || body.action === "payment.created" || body.action === "payment.updated") {
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
        // Marcar como pago
        const { error } = await supabase
          .from("analises_empregabilidade")
          .update({ pago: true })
          .eq("id", analiseId);

        if (error) {
          console.error("Erro ao marcar análise como paga:", error);
        } else {
          console.log(`✅ Análise ${analiseId} paga — R$ 19,90 aprovado`);
        }

        // Disparar email de notificação
        try {
          // Buscar dados do usuário dono da análise
          const { data: analise } = await supabase
            .from("analises_empregabilidade")
            .select("user_id")
            .eq("id", analiseId)
            .single();

          if (analise?.user_id) {
            const { data: user } = await supabase.auth.admin.getUserById(analise.user_id);
            const userEmail = user?.user?.email;
            const userName = user?.user?.user_metadata?.nome || user?.user?.email?.split("@")[0] || "dev";

            if (userEmail) {
              fetch(`${process.env.NEXT_PUBLIC_SITE_URL || "https://meupasso.vercel.app"}/api/analise/notificar`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  analise_id: analiseId,
                  email: userEmail,
                  nome: userName,
                }),
              }).catch((e) => console.error("Erro ao chamar notificação:", e));
            }
          }
        } catch (emailErr) {
          console.error("Erro ao disparar email:", emailErr);
        }
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Erro no webhook MP:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
