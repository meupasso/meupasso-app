import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * GET /api/analise/recuperar
 *
 * Busca análises com status='concluido', pago=false,
 * criadas há mais de 2 horas, que ainda não receberam
 * email de recuperação.
 *
 * Para cada uma, dispara email via notificar com tipo="recuperacao"
 * e marca email_recuperacao_enviado = true.
 *
 * Pode ser chamado por cron job da Vercel ou n8n a cada hora.
 * Protegido por CRON_SECRET.
 */
export async function GET(req: NextRequest) {
  try {
    const auth = req.headers.get("authorization");
    if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ erro: "Não autorizado" }, { status: 401 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Buscar análises elegíveis
    const duasHorasAtras = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://meupasso.vercel.app";

    const { data: analises, error } = await supabase
      .from("analises_empregabilidade")
      .select("id, email_contato, json_o_que_falta, objetivo_vaga")
      .eq("status", "concluido")
      .eq("pago", false)
      .eq("email_recuperacao_enviado", false)
      .lt("criado_em", duasHorasAtras)
      .not("email_contato", "is", null)
      .limit(20);

    if (error) {
      console.error("Erro ao buscar análises para recuperação:", error);
      return NextResponse.json({ erro: error.message }, { status: 500 });
    }

    if (!analises || analises.length === 0) {
      return NextResponse.json({ enviados: 0, message: "Nenhuma análise elegível" });
    }

    let enviados = 0;

    for (const analise of analises) {
      const itensPrioridade: string[] = [];

      // Extrair itens de alta prioridade do json_o_que_falta
      if (analise.json_o_que_falta?.o_que_falta) {
        for (const item of analise.json_o_que_falta.o_que_falta) {
          if (item.prioridade === "alta") {
            itensPrioridade.push(item.item || item.evidencia || "");
          }
        }
      }

      try {
        await fetch(`${baseUrl}/api/analise/notificar`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tipo: "recuperacao",
            analise_id: analise.id,
            email: analise.email_contato,
            itens_prioridade: itensPrioridade,
          }),
        });

        await supabase
          .from("analises_empregabilidade")
          .update({ email_recuperacao_enviado: true })
          .eq("id", analise.id);

        enviados++;
        console.log(`📧 Email de recuperação enviado para ${analise.email_contato} — análise ${analise.id}`);
      } catch (err) {
        console.error(`Erro ao processar recuperação para ${analise.id}:`, err);
      }
    }

    return NextResponse.json({ enviados, total: analises.length });
  } catch (error) {
    console.error("Erro no recuperar:", error);
    return NextResponse.json({ erro: "Erro interno" }, { status: 500 });
  }
}
