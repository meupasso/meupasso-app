import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * POST /api/analise/notificar
 * Dispara e-mail de confirmação de pagamento para o usuário.
 *
 * Body: { analise_id: string, email: string, nome?: string }
 */
export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn("RESEND_API_KEY não configurada — email não enviado");
      return NextResponse.json({ ok: true, warning: "Email não configurado" });
    }

    const { analise_id, email, nome } = await req.json();
    if (!analise_id || !email) {
      return NextResponse.json({ error: "analise_id e email são obrigatórios" }, { status: 400 });
    }

    const resend = new Resend(apiKey);
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://meupasso.vercel.app";

    await resend.emails.send({
      from: "MeuPasso <contato@meupasso.com.br>",
      to: email,
      subject: "Seu relatório de empregabilidade está pronto",
      html: `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"></head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #1c1c1c; color: #d4d4d4; padding: 40px 20px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td align="center">
                <table width="560" cellpadding="0" cellspacing="0" style="background: #2d2d2d; border-radius: 12px; padding: 40px; border: 1px solid #3e3e3e;">
                  <tr>
                    <td align="center" style="font-size: 48px; padding-bottom: 20px;">📊</td>
                  </tr>
                  <tr>
                    <td align="center">
                      <h1 style="color: #569cd6; font-size: 24px; margin: 0 0 8px;">Olá, ${nome || "dev"}!</h1>
                      <p style="color: #d4d4d4; font-size: 16px; line-height: 1.6; margin: 0 0 24px;">
                        Seu <strong style="color: #fff;">Relatório de Empregabilidade</strong> já está disponível!
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="padding-bottom: 24px;">
                      <a href="${baseUrl}/analise/${analise_id}"
                         style="display: inline-block; background: #569cd6; color: #fff;
                                padding: 14px 32px; border-radius: 8px; font-size: 16px;
                                font-weight: 600; text-decoration: none;">
                        Ver meu relatório →
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td align="center">
                      <p style="color: #9d9d9d; font-size: 13px; line-height: 1.5; margin: 0;">
                        Seu relatório inclui: diagnóstico completo, currículo e LinkedIn reescritos,<br>
                        visão do recrutador, plano de estudos e vagas compatíveis.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    console.log(`📧 Email enviado para ${email} — análise ${analise_id}`);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    return NextResponse.json({ ok: false, error: "Erro ao enviar email" }, { status: 500 });
  }
}
