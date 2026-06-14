import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Termos de Uso do MeuPasso — condições gerais de uso da plataforma.",
};

export default function TermosPage() {
  return (
    <main style={{ padding: "2rem", maxWidth: "720px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
        Termos de Uso
      </h1>
      <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginBottom: "2rem" }}>
        Vigência: 08 de junho de 2026
      </p>

      <div style={{ color: "var(--text-primary)", lineHeight: 1.8, fontSize: "0.9375rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <section>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.75rem" }}>
            1. Aceitação dos termos
          </h2>
          <p style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
            Ao criar uma conta e utilizar o MeuPasso, você concorda integralmente com estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não utilize a plataforma. Estes termos podem ser atualizados periodicamente; o uso continuado após alterações constitui aceitação das novas condições.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.75rem" }}>
            2. Descrição do serviço
          </h2>
          <p style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
            O MeuPasso é uma plataforma de aprendizado de programação que oferece:
          </p>
          <ul style={{ color: "var(--text-secondary)", lineHeight: 1.7, paddingLeft: "1.25rem", marginTop: "0.5rem" }}>
            <li>Exercícios práticos de Python, Java e JavaScript organizados por módulo e nível de dificuldade;</li>
            <li>Tutor com inteligência artificial que guia o aluno com perguntas socráticas;</li>
            <li>Projetos práticos divididos em etapas;</li>
            <li>Trilhas de estudo personalizadas;</li>
            <li>Revisão de código automatizada por IA;</li>
            <li>Gerador de exercícios personalizados.</li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.75rem" }}>
            3. Cadastro e conta
          </h2>
          <p style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
            Para usar a plataforma, você deve criar uma conta com nome e e-mail válido. Você é responsável por:
          </p>
          <ul style={{ color: "var(--text-secondary)", lineHeight: 1.7, paddingLeft: "1.25rem", marginTop: "0.5rem" }}>
            <li>Manter a confidencialidade da sua senha;</li>
            <li>Todas as atividades realizadas na sua conta;</li>
            <li>Fornecer informações precisas e atualizadas;</li>
            <li>Não compartilhar sua conta com terceiros.</li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.75rem" }}>
            4. Plano gratuito vs Pro
          </h2>
          <p style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
            <strong>Plano Gratuito:</strong> acesso ilimitado a exercícios de Python, Java e JavaScript, guias de estudo, blog e 3 sessões do tutor IA por mês.
          </p>
          <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, marginTop: "0.5rem" }}>
            <strong>Plano Pro (R$27,90/mês):</strong> tudo do plano gratuito, mais sessões ilimitadas do tutor IA, projetos práticos com etapas guiadas, revisão de código por IA, trilhas de empregabilidade.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.75rem" }}>
            5. Pagamentos
          </h2>
          <p style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
            As assinaturas do plano Pro são processadas exclusivamente pelo Mercado Pago. O pagamento é mensal e renovado automaticamente até o cancelamento. Você pode cancelar a qualquer momento, e o acesso ao plano Pro permanece até o final do período já pago. Não oferecemos reembolso por meses parciais.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.75rem" }}>
            6. Conteúdo gerado por IA
          </h2>
          <p style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
            O MeuPasso utiliza inteligência artificial (DeepSeek) para gerar respostas do tutor e realizar revisões de código. O conteúdo gerado por IA tem caráter educacional e pode conter imprecisões. Recomendamos sempre verificar e testar o código sugerido. O MeuPasso não se responsabiliza por decisões tomadas com base exclusivamente no conteúdo gerado pela IA.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.75rem" }}>
            7. Uso aceitável
          </h2>
          <p style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
            Você concorda em não utilizar a plataforma para:
          </p>
          <ul style={{ color: "var(--text-secondary)", lineHeight: 1.7, paddingLeft: "1.25rem", marginTop: "0.5rem" }}>
            <li>Fins ilegais ou não autorizados;</li>
            <li>Violar direitos de propriedade intelectual;</li>
            <li>Enviar conteúdo malicioso ou spam;</li>
            <li>Tentar acessar dados de outros usuários;</li>
            <li>Usar a plataforma para treinar modelos de IA concorrentes.</li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.75rem" }}>
            8. Propriedade intelectual
          </h2>
          <p style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
            Todo o conteúdo do MeuPasso — incluindo exercícios, textos, ilustrações, código e layout — é propriedade exclusiva do MeuPasso e está protegido por leis de direitos autorais. Você não pode reproduzir, distribuir ou criar obras derivadas sem autorização expressa.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.75rem" }}>
            9. Limitação de responsabilidade
          </h2>
          <p style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
            O MeuPasso é fornecido "como está", sem garantias de disponibilidade ininterrupta ou livre de erros. Não nos responsabilizamos por danos diretos ou indiretos decorrentes do uso da plataforma, incluindo perda de dados ou interrupção do serviço. Em nenhuma circunstância nossa responsabilidade excederá o valor pago pelo serviço nos últimos 12 meses.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.75rem" }}>
            10. Contato
          </h2>
          <p style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
            Para questões sobre estes termos, entre em contato:
          </p>
          <p style={{ color: "var(--accent)", fontWeight: 500, marginTop: "0.25rem" }}>
            caiomvital@gmail.com
          </p>
        </section>
      </div>
    </main>
  );
}
