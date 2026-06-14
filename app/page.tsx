import type { Metadata } from "next";
import Link from "next/link";
import { createServiceClient } from "@/lib/supabase/service";

export const metadata: Metadata = {
  title: "MeuPasso — Aprenda Programação com Exercícios e Tutor IA",
  description:
    "Exercícios gratuitos de Python, Java e JavaScript para iniciantes. Travou? O tutor IA te guia passo a passo sem dar a resposta.",
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

  return (
    <main style={{ background: "var(--bg-primary)" }}>
      {/* Hero */}
      <section style={{ ...secaoStyle, paddingTop: "8rem", paddingBottom: "3rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "3rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "1rem", lineHeight: 1.15 }}>
          Aprenda a programar<br />do jeito certo.
        </h1>
        <p style={{ fontSize: "1.125rem", color: "var(--text-secondary)", maxWidth: "36rem", margin: "0 auto 2rem", lineHeight: 1.6 }}>
          Exercícios práticos, tutor IA, projetos reais e trilhas guiadas para quem quer migrar de área para TI.
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

      {/* Linguagens */}
      <section style={secaoStyle}>
        <h2 style={tituloSecao}>Python, Java e JavaScript</h2>
        <p style={subtituloSecao}>Três das linguagens mais demandadas no mercado brasileiro.</p>
        <div style={{ display: "grid", gap: "1.5rem", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}>
          {[
            { icone: "🐍", nome: "Python", desc: "A linguagem mais fácil para começar. Ideal para automação, dados e web.", ok: true },
            { icone: "☕", nome: "Java", desc: "A linguagem das grandes empresas brasileiras. Bancos, fintechs e sistemas corporativos.", ok: true },
            { icone: "🟨", nome: "JavaScript", desc: "A linguagem da web. Front-end, back-end e mobile.", ok: false },
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
            { icone: "📝", tit: "Exercícios", desc: "370+ exercícios de Python e Java organizados por nível." },
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
              <a
                key={vaga.id}
                href={vaga.url}
                target="_blank"
                rel="noopener noreferrer"
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
              </a>
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
            { icone: "🔄", tit: "Estou migrando de área", desc: "Trilha completa do zero ao primeiro emprego em TI." },
            { icone: "🌱", tit: "Nunca programei", desc: "Exercícios do absoluto básico com tutor IA disponível." },
            { icone: "📈", tit: "Já sei o básico", desc: "Exercícios avançados, projetos práticos e revisão de código." },
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
            Desbloqueie tudo por <span style={{ color: "var(--accent)" }}>R$27,90/mês</span>
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: "1.5rem", textAlign: "center" }}>
            Por menos de R$1 por dia você tem acesso a tudo.
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
  );
}
