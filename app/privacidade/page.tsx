import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Política de Privacidade do MeuPasso — saiba como tratamos seus dados pessoais.",
};

export default function PrivacidadePage() {
  return (
    <main style={{ padding: "2rem", maxWidth: "720px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
        Política de Privacidade
      </h1>
      <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginBottom: "2rem" }}>
        Vigência: 08 de junho de 2026
      </p>

      <div style={{ color: "var(--text-primary)", lineHeight: 1.8, fontSize: "0.9375rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <section>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.75rem" }}>
            1. Quem somos
          </h2>
          <p style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
            O MeuPasso é uma plataforma de aprendizado de programação que oferece exercícios práticos, tutor com inteligência artificial, projetos guiados e trilhas de estudo para iniciantes brasileiros. Nosso compromisso é com a transparência e a proteção dos seus dados pessoais.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.75rem" }}>
            2. Dados coletados
          </h2>
          <p style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
            Coletamos os seguintes dados pessoais:
          </p>
          <ul style={{ color: "var(--text-secondary)", lineHeight: 1.7, paddingLeft: "1.25rem", marginTop: "0.5rem" }}>
            <li><strong>Identificação:</strong> nome e endereço de e-mail (fornecidos no cadastro);</li>
            <li><strong>Uso da plataforma:</strong> exercícios concluídos, respostas enviadas ao tutor, sessões do tutor, projetos realizados, notas e revisões de código;</li>
            <li><strong>Pagamentos:</strong> dados de transação processados pelo Mercado Pago (não armazenamos dados de cartão de crédito);</li>
            <li><strong>Navegação:</strong> endereço IP, tipo de navegador, páginas acessadas e tempo de sessão.</li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.75rem" }}>
            3. Como usamos seus dados
          </h2>
          <p style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
            Utilizamos seus dados para:
          </p>
          <ul style={{ color: "var(--text-secondary)", lineHeight: 1.7, paddingLeft: "1.25rem", marginTop: "0.5rem" }}>
            <li>Personalizar sua experiência de aprendizado;</li>
            <li>Melhorar a plataforma com base no uso real;</li>
            <li>Processar assinaturas e renovação do plano Pro;</li>
            <li>Enviar comunicações ocasionais relacionadas ao serviço;</li>
            <li>Gerar estatísticas anônimas de progresso e engajamento.</li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.75rem" }}>
            4. Cookies
          </h2>
          <p style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
            Utilizamos cookies de sessão para manter você logado e cookies de analytics (Google Analytics) para entender como a plataforma é usada. Você pode desabilitar os cookies nas configurações do seu navegador, mas algumas funcionalidades podem ser afetadas.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.75rem" }}>
            5. Terceiros
          </h2>
          <p style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
            Compartilhamos dados apenas com serviços essenciais para o funcionamento da plataforma:
          </p>
          <ul style={{ color: "var(--text-secondary)", lineHeight: 1.7, paddingLeft: "1.25rem", marginTop: "0.5rem" }}>
            <li><strong>Supabase</strong> — banco de dados e autenticação;</li>
            <li><strong>Mercado Pago</strong> — processamento de pagamentos do plano Pro;</li>
            <li><strong>Google Analytics e AdSense</strong> — análise de audiência e anúncios;</li>
            <li><strong>DeepSeek</strong> — API de inteligência artificial para o tutor.</li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.75rem" }}>
            6. Seus direitos (LGPD)
          </h2>
          <p style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
            Você pode, a qualquer momento:
          </p>
          <ul style={{ color: "var(--text-secondary)", lineHeight: 1.7, paddingLeft: "1.25rem", marginTop: "0.5rem" }}>
            <li>Solicitar acesso aos seus dados pessoais;</li>
            <li>Solicitar correção de dados incompletos ou desatualizados;</li>
            <li>Solicitar exclusão dos seus dados (respeitando prazos legais de retenção);</li>
            <li>Revogar o consentimento para uso de dados;</li>
            <li>Solicitar portabilidade dos dados para outro serviço.</li>
          </ul>
          <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, marginTop: "0.5rem" }}>
            Para exercer seus direitos, entre em contato pelo e-mail abaixo.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.75rem" }}>
            7. Contato
          </h2>
          <p style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
            Qualquer dúvida sobre esta política ou sobre seus dados, fale conosco:
          </p>
          <p style={{ color: "var(--accent)", fontWeight: 500, marginTop: "0.25rem" }}>
            caiomvital@gmail.com
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.75rem" }}>
            8. LGPD
          </h2>
          <p style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
            O MeuPasso está em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018). Todos os dados pessoais são tratados com confidencialidade e segurança, respeitando os princípios de finalidade, adequação, necessidade, livre acesso, qualidade dos dados, transparência, segurança, prevenção, não discriminação e responsabilização.
          </p>
        </section>
      </div>
    </main>
  );
}
