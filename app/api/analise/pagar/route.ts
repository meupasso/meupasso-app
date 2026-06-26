import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * Cria uma preferência de pagamento no Mercado Pago Checkout Pro
 * para a Análise de Empregabilidade (R$ 19,90 avulso).
 *
 * POST /api/analise/pagar
 * Body: { id: "uuid-da-analise" }
 * Retorna: { checkout_url: "https://mercadopago.com.br/checkout/..." }
 */
export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "ID da análise é obrigatório" }, { status: 400 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Verificar se a análise existe e já não foi paga
    const { data: analise } = await supabase
      .from("analises_empregabilidade")
      .select("id, pago, status")
      .eq("id", id)
      .single();

    if (!analise) {
      return NextResponse.json({ error: "Análise não encontrada" }, { status: 404 });
    }

    if (analise.pago) {
      return NextResponse.json({ error: "Análise já foi paga" }, { status: 400 });
    }

    if (analise.status !== "concluido") {
      return NextResponse.json(
        { error: "Análise ainda não foi concluída. Aguarde o processamento." },
        { status: 400 }
      );
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

    // Criar preferência no Mercado Pago
    const mpRes = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        items: [
          {
            title: "Análise de Empregabilidade — MeuPasso",
            description: "Relatório completo com diagnóstico, reescrita de currículo e LinkedIn, visão do recrutador, plano de estudos e vagas compatíveis.",
            quantity: 1,
            unit_price: 19.9,
            currency_id: "BRL",
          },
        ],
        back_urls: {
          success: `${baseUrl}/analise/${id}?status=success`,
          failure: `${baseUrl}/analise/${id}?status=failure`,
          pending: `${baseUrl}/analise/${id}?status=pending`,
        },
        auto_return: "approved",
        external_reference: id,
        notification_url: `${baseUrl}/api/webhook/mercadopago`,
      }),
    });

    if (!mpRes.ok) {
      const err = await mpRes.text();
      console.error("Erro ao criar preferência MP:", mpRes.status, err);
      return NextResponse.json({ error: "Erro ao criar pagamento no Mercado Pago" }, { status: 500 });
    }

    const mpData = await mpRes.json();

    return NextResponse.json({ checkout_url: mpData.init_point });
  } catch (error) {
    console.error("Erro no pagamento:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
