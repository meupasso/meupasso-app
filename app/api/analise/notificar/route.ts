import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * POST /api/analise/notificar
 *
 * Dispara e-mails relacionados ao Raio-X de Carreira.
 *
 * Body:
 *   { tipo: "pronto", analise_id, email, nome?, score?, veredicto? }
 *   { tipo: "pagamento", analise_id, email, nome? }
 *   { tipo: "recuperacao", analise_id, email, nome?, itens_prioridade?: string[] }
 */
export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn("RESEND_API_KEY não configurada — email não enviado");
      return NextResponse.json({ ok: true, warning: "Email não configurado" });
    }

    const body = await req.json();
    const { tipo = "pagamento", analise_id, email, nome, score, veredicto, itens_prioridade } = body;

    if (!analise_id || !email) {
      return NextResponse.json({ error: "analise_id e email são obrigatórios" }, { status: 400 });
    }

    const resend = new Resend(apiKey);
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://meupasso.vercel.app";
    const saudacao = nome ? `Olá, ${nome}!` : "Olá!";

    let subject = "";
    let html = "";

    /* ─── TEMPLATE: PRONTO ───────────────────────────── */
    if (tipo === "pronto") {
      subject = "Seu Raio-X de Carreira está pronto";
      html = `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"></head>
        <body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#1c1c1c;color:#d4d4d4;padding:40px 20px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td align="center">
              <table width="560" cellpadding="0" cellspacing="0" style="background:#2d2d2d;border-radius:12px;padding:40px;border:1px solid #3e3e3e;">
                <tr><td align="center" style="font-size:48px;padding-bottom:16px;">📊</td></tr>
                <tr><td align="center">
                  <h1 style="color:#569cd6;font-size:24px;margin:0 0 6px;">${saudacao}</h1>
                  <p style="color:#d4d4d4;font-size:15px;line-height:1.6;margin:0 0 8px;">
                    Analisamos seu currículo, LinkedIn e GitHub.
                  </p>
                  ${score ? `<div style="margin:16px 0;text-align:center;">
                    <div style="display:inline-block;width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg,#569cd6,#3b82f6);display:flex;align-items:center;justify-content:center;line-height:80px;font-size:28px;font-weight:700;color:#fff;">${score}</div>
                    <div style="font-size:13px;color:#9d9d9d;margin-top:4px;">score geral</div>
                  </div>` : ""}
                  ${veredicto ? `<p style="color:#d4d4d4;font-size:14px;margin:0 0 20px;font-style:italic;">${veredicto}</p>` : ""}
                </td></tr>
                <tr><td align="center" style="padding-bottom:20px;">
                  <a href="${baseUrl}/analise/${analise_id}" style="display:inline-block;background:#569cd6;color:#fff;padding:14px 32px;border-radius:8px;font-size:16px;font-weight:600;text-decoration:none;">
                    Ver meu Raio-X →
                  </a>
                </td></tr>
                <tr><td align="center">
                  <p style="color:#9d9d9d;font-size:13px;line-height:1.5;margin:0;">
                    O relatório completo com currículo reescrito, visão do recrutador e plano de estudos está disponível por R$ 19,90.
                  </p>
                </td></tr>
              </table>
            </td></tr>
          </table>
        </body>
        </html>`;
    }

    /* ─── TEMPLATE: PAGAMENTO ─────────────────────────── */
    else if (tipo === "pagamento") {
      subject = "Seu Raio-X de Carreira está pronto";
      html = `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"></head>
        <body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#1c1c1c;color:#d4d4d4;padding:40px 20px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td align="center">
              <table width="560" cellpadding="0" cellspacing="0" style="background:#2d2d2d;border-radius:12px;padding:40px;border:1px solid #3e3e3e;">
                <tr><td align="center" style="font-size:48px;padding-bottom:20px;">🎉</td></tr>
                <tr><td align="center">
                  <h1 style="color:#569cd6;font-size:24px;margin:0 0 8px;">${saudacao}</h1>
                  <p style="color:#d4d4d4;font-size:16px;line-height:1.6;margin:0 0 24px;">
                    Seu <strong style="color:#fff;">Raio-X de Carreira</strong> completo já está disponível!
                  </p>
                </td></tr>
                <tr><td align="center" style="padding-bottom:24px;">
                  <a href="${baseUrl}/analise/${analise_id}" style="display:inline-block;background:#569cd6;color:#fff;padding:14px 32px;border-radius:8px;font-size:16px;font-weight:600;text-decoration:none;">
                    Ver meu relatório →
                  </a>
                </td></tr>
                <tr><td align="center">
                  <p style="color:#9d9d9d;font-size:13px;line-height:1.5;margin:0;">
                    Seu relatório inclui: diagnóstico completo, currículo e LinkedIn reescritos,<br>
                    visão do recrutador, plano de estudos e vagas compatíveis.
                  </p>
                </td></tr>
              </table>
            </td></tr>
          </table>
        </body>
        </html>`;
    }

    /* ─── TEMPLATE: RECUPERAÇÃO ───────────────────────── */
    else if (tipo === "recuperacao") {
      const itens = itens_prioridade?.slice(0, 2) || [];
      subject = "Você viu o que está te travando. E agora?";
      html = `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"></head>
        <body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#1c1c1c;color:#d4d4d4;padding:40px 20px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td align="center">
              <table width="560" cellpadding="0" cellspacing="0" style="background:#2d2d2d;border-radius:12px;padding:40px;border:1px solid #3e3e3e;">
                <tr><td align="center" style="font-size:48px;padding-bottom:16px;">🔍</td></tr>
                <tr><td align="center">
                  <h1 style="color:#569cd6;font-size:24px;margin:0 0 8px;">${saudacao}</h1>
                  <p style="color:#d4d4d4;font-size:15px;line-height:1.6;margin:0 0 16px;">
                    Seu Raio-X mostrou <strong style="color:#fff;">${itens.length} ponto(s) crítico(s)</strong> que estão travando sua contratação.
                  </p>
                  ${itens.length > 0 ? `<div style="text-align:left;background:#1c1c1c;border-radius:8px;padding:12px 16px;margin-bottom:16px;">
                    ${itens.map((item: string) => `<p style="color:#f87171;font-size:13px;margin:4px 0;">🔴 ${item}</p>`).join("")}
                  </div>` : ""}
                </td></tr>
                <tr><td align="center" style="padding-bottom:16px;">
                  <a href="${baseUrl}/analise/${analise_id}" style="display:inline-block;background:linear-gradient(135deg,#569cd6,#3b82f6);color:#fff;padding:14px 32px;border-radius:8px;font-size:16px;font-weight:700;text-decoration:none;">
                    Desbloquear relatório completo — R$ 19,90
                  </a>
                </td></tr>
                <tr><td align="center">
                  <p style="color:#9d9d9d;font-size:13px;line-height:1.5;margin:0;">
                    Currículo reescrito, LinkedIn otimizado, visão do recrutador e plano de estudos.
                  </p>
                </td></tr>
              </table>
            </td></tr>
          </table>
        </body>
        </html>`;
    }

    if (!subject) {
      return NextResponse.json({ error: "Tipo de email inválido" }, { status: 400 });
    }

    await resend.emails.send({ from: "MeuPasso <contato@meupasso.com.br>", to: email, subject, html });

    console.log(`📧 Email "${tipo}" enviado para ${email} — análise ${analise_id}`);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    return NextResponse.json({ ok: false, error: "Erro ao enviar email" }, { status: 500 });
  }
}
