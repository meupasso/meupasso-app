import type { Metadata } from "next";
import Link from "next/link";
import { createServiceClient } from "@/lib/supabase/service";

export const metadata: Metadata = {
  title: "MeuPasso — Aprenda Python, Java e JavaScript com Exercícios e Tutor IA",
  description:
    "Resolva exercícios, receba ajuda quando travar, construa projetos e monte um portfólio para conquistar sua primeira vaga em TI. Gratuito para começar.",
  openGraph: {
    title: "MeuPasso — Aprenda Programação do Jeito Certo",
    description:
      "Resolva exercícios, receba ajuda quando travar, construa projetos e monte um portfólio para conquistar sua primeira vaga em TI.",
    url: "https://www.meupasso.com.br",
    siteName: "MeuPasso",
    locale: "pt_BR",
    type: "website",
  },
  alternates: {
    canonical: "https://www.meupasso.com.br",
  },
};

const secaoStyle: React.CSSProperties = { padding: "5rem 2rem", maxWidth: "900px", margin: "0 auto" };

const tituloSecao: React.CSSProperties = {
  fontSize: "2rem", fontWeight: 700, color: "var(--text-primary)", textAlign: "center" as const,
  marginBottom: "0.5rem",
};

const subtituloSecao: React.CSSProperties = {
  fontSize: "1.05rem", color: "var(--text-secondary)", textAlign: "center" as const,
  marginBottom: "3rem", lineHeight: 1.5,
};

function formatarData(data: string | null): string {
  if (!data) return "";
  const d = new Date(data);
  if (isNaN(d.getTime())) return "";
  const agora = new Date();
  const diffMs = agora.getTime() - d.getTime();
  const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDias === 0) return "hoje";
  if (diffDias === 1) return "ontem";
  if (diffDias < 7) return `há ${diffDias} dias`;
  if (diffDias < 30) return `há ${Math.floor(diffDias / 7)} semana(s)`;
  return `há ${Math.floor(diffDias / 30)} mês(es)`;
}

type Vaga = {
  id: string;
  titulo: string;
  empresa: string | null;
  cidade: string | null;
  remoto: boolean;
  tipo: string | null;
  tecnologias: string[];
  url: string;
  publicada_em: string | null;
};

async function getTotalExercicios(): Promise<number> {
  try {
    const supabase = createServiceClient();
    const { count } = await supabase
      .from("exercicios")
      .select("*", { count: "exact", head: true });
    return count || 0;
  } catch {
    return 0;
  }
}

async function getVagasRecentes(): Promise<Vaga[]> {
  try {
    const supabase = createServiceClient();
    const { data } = await supabase
      .from("vagas")
      .select("*")
      .eq("ativa", true)
      .order("publicada_em", { ascending: false, nullsFirst: false })
      .limit(8);
    return (data || []) as Vaga[];
  } catch {
    return [];
  }
}

export default async function Home() {
  const vagas = await getVagasRecentes();
  const totalExercicios = await getTotalExercicios();
  const badgeText = totalExercicios > 0
    ? `🚀 Mais de ${Math.floor(totalExercicios / 100) * 100} exercícios disponíveis`
    : "🚀 Centenas de exercícios disponíveis";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "MeuPasso",
    url: "https://www.meupasso.com.br",
    description:
      "Plataforma de exercícios de programação com tutor IA para iniciantes brasileiros.",
    inLanguage: "pt-BR",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.meupasso.com.br/exercicios/{search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main style={{ background: "var(--bg-primary)" }}>
      {/* Hero */}
      <section style={{ ...secaoStyle, paddingTop: "8rem", paddingBottom: "0", textAlign: "center" }}>
        <span style={{ display: "inline-block", fontSize: "0.75rem", fontWeight: 600, padding: "0.25rem 0.75rem", borderRadius: "9999px", background: "var(--accent)", color: "#fff", marginBottom: "1rem" }}>
          {badgeText}
        </span>
        <h1 style={{ fontSize: "3rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "1rem", lineHeight: 1.15 }}>
          Aprenda a programar e conquiste sua primeira vaga em TI.
        </h1>
        <p style={{ fontSize: "1rem", color: "var(--text-secondary)", maxWidth: "42rem", margin: "0 auto 2rem", lineHeight: 1.6 }}>
          {totalExercicios > 0 ? `${totalExercicios} exercícios de Python, Java e JavaScript` : "Centenas de exercícios de Python, Java e JavaScript"} — do básico ao avançado. Tutor IA que te guia sem dar a resposta, projetos práticos e vagas reais para iniciantes.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/exercicios" className="btn-primary" style={{ display: "inline-block", padding: "0.875rem 2rem", borderRadius: "0.5rem", fontWeight: 600, fontSize: "1.0625rem", textDecoration: "none", background: "var(--accent)", color: "#fff" }}>
            Começar agora — é grátis
          </Link>
          <Link href="/trilhas" className="btn-secondary" style={{ display: "inline-block", padding: "0.875rem 2rem", borderRadius: "0.5rem", fontWeight: 600, fontSize: "1.0625rem", textDecoration: "none", background: "transparent", color: "var(--text-primary)", border: "1px solid var(--border)" }}>
            Ver trilhas de estudo
          </Link>
        </div>
      </section>

      {/* Raio-X de Carreira */}
      <section style={{ ...secaoStyle, background: "rgba(86,156,214,0.04)", borderRadius: "2rem", marginTop: "3rem", marginBottom: "1rem", paddingBottom: "4rem", border: "1px solid rgba(86,156,214,0.08)" }}>
        <div style={{ textAlign: "center" as const }}>
          <span style={{ display: "inline-block", fontSize: "0.65rem", fontWeight: 700, padding: "0.25rem 0.75rem", borderRadius: "9999px", background: "linear-gradient(135deg, #f97316, #ef4444)", color: "#fff", marginBottom: "1rem", letterSpacing: "0.05em", textTransform: "uppercase" as const }}>
            🆕 Novo
          </span>
        </div>
        <h2 style={{ ...tituloSecao, fontSize: "2.2rem", maxWidth: "650px", margin: "0 auto 0.75rem" }}>
          Descubra o que falta para você conseguir seu primeiro emprego em TI
        </h2>
        <p style={{ ...subtituloSecao, maxWidth: "550px", marginLeft: "auto", marginRight: "auto" }}>
          Enviamos seu currículo, LinkedIn e GitHub para uma IA que cruza tudo e te diz exatamente o que está travando sua contratação.
        </p>

        <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "1fr 1fr", maxWidth: "680px", margin: "0 auto 2rem" }}>
          {[
            { icon: "🔍", text: "Diagnóstico cruzado: currículo + LinkedIn + GitHub" },
            { icon: "🎯", text: "O que falta para a vaga que você quer" },
            { icon: "✍️", text: "Currículo e LinkedIn reescritos, prontos para copiar" },
            { icon: "👀", text: "Como um recrutador real vê seu perfil" },
            { icon: "📚", text: "Plano de estudos semana a semana" },
            { icon: "💰", text: "Pagamento único — resultado em minutos" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem 1rem", borderRadius: "0.5rem", background: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <span style={{ fontSize: "1.25rem", flexShrink: 0 }}>{item.icon}</span>
              <span style={{ fontSize: "0.8125rem", color: "var(--text-primary)", lineHeight: 1.4 }}>{item.text}</span>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center" as const }}>
          <div style={{ display: "inline-block", background: "linear-gradient(135deg, rgba(86,156,214,0.1), rgba(59,130,246,0.1))", border: "1px solid rgba(86,156,214,0.2)", borderRadius: "1rem", padding: "1.25rem 2rem", marginBottom: "1.5rem" }}>
            <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase" as const, letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Preço único</div>
            <div style={{ fontSize: "2.2rem", fontWeight: 800, color: "var(--accent)", lineHeight: 1 }}>
              R$ 19,90
            </div>
          </div>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/analise" className="btn-primary" style={{ display: "inline-block", padding: "0.875rem 2rem", borderRadius: "0.5rem", fontWeight: 600, fontSize: "1.0625rem", textDecoration: "none", background: "var(--accent)", color: "#fff" }}>
              Fazer meu Raio-X agora →
            </Link>
          </div>
          <div style={{ marginTop: "0.75rem" }}>
            <Link href="/analise/exemplo" style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", opacity: 0.7, textDecoration: "underline" }}>
              Ver exemplo de relatório →
            </Link>
          </div>
        </div>
      </section>

      {/* Linguagens */}
      <section style={secaoStyle}>
        <h2 style={tituloSecao}>Python, Java e JavaScript</h2>
        <p style={subtituloSecao}>As linguagens mais pedidas nas vagas de desenvolvedor júnior no Brasil.</p>
        <div style={{ display: "grid", gap: "1.5rem", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}>
          {[
            { icone: "🐍", nome: "Python", desc: "A linguagem mais fácil para começar. Ideal para automação, dados e web.", ok: true },
            { icone: "☕", nome: "Java", desc: "A linguagem das grandes empresas brasileiras. Bancos, fintechs e sistemas corporativos.", ok: true },
            { icone: "🟨", nome: "JavaScript", desc: "A linguagem da web. Front-end, back-end e mobile.", ok: true },
          ].map((l) => (
            <div key={l.nome} style={{ border: "1px solid var(--border)", borderRadius: "0.75rem", padding: "1.5rem", background: "var(--bg-card)", opacity: l.ok ? 1 : 0.5 }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{l.icone}</div>
              <h3 style={{ fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.375rem", fontSize: "1.125rem" }}>{l.nome}</h3>
              <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: "0.75rem" }}>{l.desc}</p>
              <span style={{ fontSize: "0.65rem", fontWeight: 600, padding: "0.125rem 0.5rem", borderRadius: "0.25rem", background: l.ok ? "#166534" : "#374151", color: l.ok ? "#dcfce7" : "#9ca3af" }}>
                {l.ok ? "Disponível" : "Em breve"}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* O que você encontra */}
      <section style={secaoStyle}>
        <h2 style={tituloSecao}>O que você encontra aqui</h2>
        <p style={subtituloSecao}>Ferramentas pensadas para quem está começando.</p>
        <div style={{ display: "grid", gap: "1.5rem", gridTemplateColumns: "1fr 1fr" }}>
          {[
            { icone: "📝", tit: "Exercícios", desc: totalExercicios > 0 ? `${totalExercicios} exercícios de Python, Java e JavaScript organizados por nível.` : "Centenas de exercícios de Python, Java e JavaScript organizados por nível." },
            { icone: "🤖", tit: "Tutor IA", desc: "Travou? O tutor te guia com perguntas socráticas." },
            { icone: "🚀", tit: "Projetos Práticos", desc: "Projetos reais divididos em etapas para seu portfólio." },
            { icone: "🗺️", tit: "Trilhas Guiadas", desc: "Sequência personalizada do seu nível até o emprego." },
          ].map((c) => (
            <div key={c.tit} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "0.75rem", padding: "1.5rem" }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{c.icone}</div>
              <h3 style={{ fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.375rem", fontSize: "1rem" }}>{c.tit}</h3>
              <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Vagas — carrossel */}
      {vagas.length > 0 && (
        <section style={secaoStyle}>
          <h2 style={tituloSecao}>Vagas para quem está aprendendo 🚀</h2>
          <p style={subtituloSecao}>Oportunidades reais para iniciantes — atualizadas toda semana</p>
          <div
            className="vagas-carrossel"
            style={{
              display: "flex",
              gap: "1rem",
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              paddingBottom: "1rem",
              marginBottom: "1.5rem",
            }}
          >
            {vagas.map((vaga) => (
              <Link
                key={vaga.id}
                href={`/vagas/${vaga.id}`}
                className="vaga-card-carrossel"
                style={{
                  minWidth: "280px",
                  maxWidth: "300px",
                  scrollSnapAlign: "start",
                  textDecoration: "none",
                  borderRadius: "0.75rem",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  padding: "1.25rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  flexShrink: 0,
                }}
              >
                <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.3 }}>{vaga.titulo}</h3>
                <div style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}>
                  <span>🏢 {vaga.empresa || "Empresa"}</span>
                  <span style={{ marginLeft: "0.75rem" }}>{vaga.remoto ? "🏠 Remoto" : `📍 ${vaga.cidade || "Brasil"}`}</span>
                </div>
                {vaga.tecnologias && vaga.tecnologias.length > 0 && (
                  <div style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap", marginTop: "0.25rem" }}>
                    {vaga.tecnologias.map((tech) => (
                      <span key={tech} style={{ fontSize: "0.6rem", fontWeight: 600, padding: "0.125rem 0.4rem", borderRadius: "0.25rem", background: "var(--accent)", color: "#fff", opacity: 0.85 }}>{tech}</span>
                    ))}
                  </div>
                )}
                <div style={{ fontSize: "0.7rem", color: "var(--text-secondary)", opacity: 0.6, marginTop: "auto", paddingTop: "0.5rem" }}>
                  {formatarData(vaga.publicada_em)}
                </div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: "center" }}>
            <Link href="/vagas" className="btn-secondary" style={{ display: "inline-block", padding: "0.75rem 2rem", borderRadius: "0.5rem", fontWeight: 600, fontSize: "0.9375rem", textDecoration: "none", background: "transparent", color: "var(--text-primary)", border: "1px solid var(--border)" }}>
              Ver todas as vagas →
            </Link>
          </div>
        </section>
      )}

      {/* Para quem */}
      <section style={secaoStyle}>
        <h2 style={tituloSecao}>Para quem é o MeuPasso</h2>
        <p style={subtituloSecao}>Três perfis, um objetivo: te ajudar a programar.</p>
        <div style={{ display: "grid", gap: "1.5rem", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}>
          {[
            { icone: "🔄", tit: "Estou migrando de área", desc: "Sequência estruturada do zero ao portfólio — sem enrolação." },
            { icone: "🌱", tit: "Nunca programei", desc: "Comece pelo Olá Mundo e avance no seu ritmo. O tutor explica quando você travar." },
            { icone: "📈", tit: "Já sei o básico", desc: "Projetos reais para o portfólio, revisão de código por IA e exercícios avançados." },
          ].map((p) => (
            <div key={p.tit} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "0.75rem", padding: "1.5rem" }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{p.icone}</div>
              <h3 style={{ fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.375rem", fontSize: "1rem" }}>{p.tit}</h3>
              <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Plano Pro */}
      <section style={{ ...secaoStyle, maxWidth: "600px" }}>
        <div style={{ border: "2px solid var(--accent)", borderRadius: "1rem", padding: "2.5rem", background: "var(--bg-card)", textAlign: "center" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1.5rem" }}>
            Desbloqueie os projetos e o tutor ilimitado por <span style={{ color: "var(--accent)" }}>R$27,90/mês</span>
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: "1.5rem", textAlign: "center" }}>
            Por menos de R$1 por dia — cancele quando quiser.
          </p>
          <div style={{ textAlign: "left", maxWidth: "280px", margin: "0 auto 1.5rem" }}>
            {["Projetos Práticos com etapas guiadas", "Revisão de código por IA", "Sessões ilimitadas com o tutor", "Trilhas de empregabilidade"].map((item) => (
              <p key={item} style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ color: "#22c55e" }}>✅</span> {item}
              </p>
            ))}
          </div>
          <Link href="/assinatura" className="btn-primary" style={{ display: "inline-block", padding: "0.75rem 2rem", background: "var(--accent)", color: "#fff", borderRadius: "0.5rem", fontWeight: 600, fontSize: "1rem", textDecoration: "none" }}>
            Assinar Pro
          </Link>
        </div>
      </section>

      {/* Final */}
      <section style={{ padding: "5rem 2rem", textAlign: "center", background: "var(--bg-secondary)", borderTop: "1px solid var(--border)" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.75rem" }}>
          Seu primeiro passo começa aqui.
        </h2>
        <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", marginBottom: "2rem" }}>
          Sem cartão de crédito. Sem prazo. Comece agora.
        </p>
        <Link href="/entrar" className="btn-primary" style={{ display: "inline-block", padding: "0.875rem 2.5rem", background: "var(--accent)", color: "#fff", borderRadius: "0.5rem", fontWeight: 600, fontSize: "1.125rem", textDecoration: "none" }}>
          Criar conta grátis
        </Link>
        <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "1.5rem", maxWidth: "400px", marginLeft: "auto", marginRight: "auto", lineHeight: 1.5 }}>
          Ao criar sua conta, você concorda com nossos{" "}
          <Link href="/termos" style={{ color: "var(--accent)", textDecoration: "none" }}>Termos de Uso</Link>{" "}
          e{" "}
          <Link href="/privacidade" style={{ color: "var(--accent)", textDecoration: "none" }}>Política de Privacidade</Link>.
        </p>
      </section>

      <style>{`
        .btn-primary:hover { opacity: 0.85; }
        .btn-secondary:hover { border-color: var(--accent) !important; color: var(--accent) !important; }
        .vaga-card-carrossel:hover {
          border-color: var(--accent) !important;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .vagas-carrossel::-webkit-scrollbar { height: 6px; }
        .vagas-carrossel::-webkit-scrollbar-track { background: var(--bg-secondary); border-radius: 3px; }
        .vagas-carrossel::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
      `}</style>
    </main>
    </>
  );
}
