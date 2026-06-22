import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type Vaga = {
  id: string;
  titulo: string;
  empresa: string | null;
  cidade: string | null;
  remoto: boolean;
  tipo: string | null;
  tecnologias: string[];
  descricao: string | null;
  url: string;
  publicada_em: string | null;
};

type Exercicio = {
  id: string;
  slug: string;
  titulo: string;
  modulo: string;
  nivel: string;
  linguagem: string;
  id_referencia: string;
};

type Projeto = {
  id: string;
  titulo: string;
  descricao: string;
  nivel: string;
  linguagem: string;
};

type Trilha = {
  slug: string;
  titulo: string;
  descricao: string;
  tempo_estimado: string | null;
};

const LINGUAGENS_MAP: Record<string, string> = {
  Python: "Python",
  JavaScript: "JavaScript",
  Java: "Java",
  React: "JavaScript",
  "Node.js": "JavaScript",
  TypeScript: "JavaScript",
  PHP: "PHP",
  C: "C",
  "C++": "C++",
  "C#": "C#",
  Ruby: "Ruby",
  Go: "Go",
  Rust: "Rust",
  SQL: "SQL",
};

const NIVEL_LABELS: Record<string, string> = {
  basico: "Básico",
  intermediario: "Intermediário",
  avancado: "Avançado",
  desafio: "Desafio",
};

function formatarData(data: string | null): string {
  if (!data) return "";
  const d = new Date(data);
  if (isNaN(d.getTime())) return "";
  const agora = new Date();
  const diffMs = agora.getTime() - d.getTime();
  const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDias === 0) return "Publicada hoje";
  if (diffDias === 1) return "Publicada ontem";
  if (diffDias < 7) return `Publicada há ${diffDias} dias`;
  if (diffDias < 30) return `Publicada há ${Math.floor(diffDias / 7)} semana(s)`;
  return `Publicada há ${Math.floor(diffDias / 30)} mês(es)`;
}

function badgeTipo(tipo: string | null): { label: string; cor: string } {
  const map: Record<string, { label: string; cor: string }> = {
    junior: { label: "Júnior", cor: "#22c55e" },
    estagio: { label: "Estágio", cor: "#3b82f6" },
    trainee: { label: "Trainee", cor: "#a855f7" },
    pleno: { label: "Pleno", cor: "#f59e0b" },
  };
  return map[tipo || ""] || { label: tipo || "Geral", cor: "#6b7280" };
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const supabase = createClient();
  const { data: vaga } = await supabase
    .from("vagas")
    .select("titulo, empresa, tipo, tecnologias")
    .eq("id", params.id)
    .single();

  if (!vaga) {
    return { title: "Vaga | MeuPasso" };
  }

  const title = `${vaga.titulo} — ${vaga.empresa || "Vaga"} para Iniciantes | MeuPasso`;
  const description = vaga.tecnologias?.length
    ? `Vaga de ${vaga.tipo || "TI"} em ${vaga.empresa || "empresa"}. Tecnologias: ${vaga.tecnologias.join(", ")}. Veja exercícios e projetos para se preparar no MeuPasso.`
    : `Vaga de ${vaga.tipo || "TI"} em ${vaga.empresa || "empresa"}. Prepare-se com exercícios e projetos no MeuPasso.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.meupasso.com.br/vagas/${params.id}`,
      siteName: "MeuPasso",
      locale: "pt_BR",
      type: "article",
    },
    alternates: {
      canonical: `https://www.meupasso.com.br/vagas/${params.id}`,
    },
  };
}

export default async function VagaPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient();

  const { data: vaga } = await supabase
    .from("vagas")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!vaga) notFound();

  const vagaData = vaga as Vaga;

  // Detectar linguagens da vaga
  const linguagens = Array.from(
    new Set(
      (vagaData.tecnologias || [])
        .map((t: string) => LINGUAGENS_MAP[t])
        .filter(Boolean)
    )
  ) as string[];

  const linguagem = linguagens[0] || "";

  // Buscar conteúdo relacionado
  let exercicios: Exercicio[] = [];
  let projetos: Projeto[] = [];
  let trilha: Trilha | null = null;

  if (linguagem) {
    const { data: exData } = await supabase
      .from("exercicios")
      .select("id, slug, titulo, modulo, nivel, linguagem, id_referencia")
      .eq("linguagem", linguagem)
      .in("modulo", ["Funções", "POO", "Arrays", "ArrayList", "Objetos"])
      .eq("nivel", "intermediario")
      .limit(4);
    exercicios = (exData || []) as Exercicio[];

    const { data: projData } = await supabase
      .from("projetos")
      .select("id, titulo, descricao, nivel, linguagem")
      .eq("linguagem", linguagem)
      .limit(3);
    projetos = (projData || []) as Projeto[];

    const { data: triData } = await supabase
      .from("trilhas")
      .select("slug, titulo, descricao, tempo_estimado")
      .eq("linguagem", linguagem)
      .ilike("slug", "%empregabilidade%")
      .limit(1);
    if (triData && triData.length > 0) {
      trilha = triData[0] as Trilha;
    }
  }

  const badge = badgeTipo(vagaData.tipo);
  const nomeLinguagem = linguagem;

  return (
    <main style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      {/* Breadcrumb */}
      <div
        style={{
          fontSize: "0.8125rem",
          color: "var(--text-secondary)",
          marginBottom: "1.5rem",
          display: "flex",
          gap: "0.5rem",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Link
          href="/vagas"
          style={{ color: "var(--text-secondary)", textDecoration: "none" }}
        >
          Vagas
        </Link>
        <span>/</span>
        <span style={{ color: "var(--text-primary)" }}>
          {vagaData.titulo}
        </span>
      </div>

      {/* Título */}
      <h1
        style={{
          fontSize: "1.75rem",
          fontWeight: 700,
          color: "var(--text-primary)",
          marginBottom: "0.75rem",
          lineHeight: 1.2,
        }}
      >
        {vagaData.titulo}
      </h1>

      {/* Badges */}
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          flexWrap: "wrap",
          marginBottom: "1rem",
        }}
      >
        <span
          style={{
            fontSize: "0.65rem",
            fontWeight: 600,
            padding: "0.125rem 0.5rem",
            borderRadius: "0.25rem",
            background: badge.cor,
            color: "#fff",
          }}
        >
          {badge.label}
        </span>
        <span
          style={{
            fontSize: "0.65rem",
            fontWeight: 600,
            padding: "0.125rem 0.5rem",
            borderRadius: "0.25rem",
            background: "var(--bg-card)",
            color: "var(--text-secondary)",
            border: "1px solid var(--border)",
          }}
        >
          🏢 {vagaData.empresa || "Empresa"}
        </span>
        <span
          style={{
            fontSize: "0.65rem",
            fontWeight: 600,
            padding: "0.125rem 0.5rem",
            borderRadius: "0.25rem",
            background: "var(--bg-card)",
            color: "var(--text-secondary)",
            border: "1px solid var(--border)",
          }}
        >
          {vagaData.remoto ? "🏠 Remoto" : `📍 ${vagaData.cidade || "Brasil"}`}
        </span>
      </div>

      {/* Tecnologias */}
      {vagaData.tecnologias && vagaData.tecnologias.length > 0 && (
        <div
          style={{
            display: "flex",
            gap: "0.375rem",
            flexWrap: "wrap",
            marginBottom: "1.5rem",
          }}
        >
          {vagaData.tecnologias.map((tech: string) => (
            <span
              key={tech}
              style={{
                fontSize: "0.7rem",
                fontWeight: 600,
                padding: "0.2rem 0.5rem",
                borderRadius: "0.25rem",
                background: "var(--accent)",
                color: "#fff",
                opacity: 0.85,
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      {/* Botão externo + data */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2.5rem",
          flexWrap: "wrap",
          gap: "0.75rem",
        }}
      >
        <a
          href={vagaData.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            padding: "0.75rem 2rem",
            background: "var(--accent)",
            color: "#fff",
            borderRadius: "0.5rem",
            fontWeight: 600,
            fontSize: "1rem",
            textDecoration: "none",
          }}
        >
          Ver vaga original →
        </a>
        <span
          style={{
            fontSize: "0.8125rem",
            color: "var(--text-secondary)",
            opacity: 0.7,
          }}
        >
          {formatarData(vagaData.publicada_em)}
        </span>
      </div>

      {/* Prepare-se para essa vaga */}
      {linguagem && (
        <section
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: "2.5rem",
          }}
        >
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "0.5rem",
            }}
          >
            Prepare-se para essa vaga
          </h2>
          <p
            style={{
              fontSize: "0.9375rem",
              color: "var(--text-secondary)",
              marginBottom: "2rem",
              lineHeight: 1.5,
            }}
          >
            O MeuPasso tem tudo que você precisa para se candidatar com
            confiança.
          </p>

          <div
            style={{
              display: "grid",
              gap: "1.25rem",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            }}
          >
            {/* Card Exercícios */}
            <div
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "0.75rem",
                padding: "1.5rem",
              }}
            >
              <div
                style={{ fontSize: "2rem", marginBottom: "0.5rem" }}
              >
                📝
              </div>
              <h3
                style={{
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  marginBottom: "0.25rem",
                  fontSize: "1rem",
                }}
              >
                Pratique os conceitos cobrados
              </h3>
              <p
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--text-secondary)",
                  marginBottom: "1rem",
                  lineHeight: 1.4,
                }}
              >
                Exercícios de {linguagem} nível intermediário para dominar
                os tópicos mais pedidos em entrevistas.
              </p>

              {exercicios.length > 0 ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  {exercicios.map((ex) => (
                    <a
                      key={ex.id}
                      href={`/exercicios/${ex.linguagem.toLowerCase()}/${ex.slug}`}
                      style={{
                        fontSize: "0.8125rem",
                        color: "var(--text-primary)",
                        textDecoration: "none",
                        padding: "0.5rem 0.75rem",
                        background: "var(--bg-secondary)",
                        borderRadius: "0.375rem",
                        border: "1px solid var(--border)",
                        transition: "border-color 0.2s",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.65rem",
                          color: "var(--text-secondary)",
                          display: "block",
                          marginBottom: "0.125rem",
                        }}
                      >
                        {ex.id_referencia} ·{" "}
                        {NIVEL_LABELS[ex.nivel] || ex.nivel} · {ex.modulo}
                      </span>
                      {ex.titulo}
                    </a>
                  ))}
                </div>
              ) : (
                <p
                  style={{
                    fontSize: "0.8125rem",
                    color: "var(--text-secondary)",
                    fontStyle: "italic",
                  }}
                >
                  Nenhum exercício encontrado para esta linguagem.
                </p>
              )}

              <Link
                href={`/exercicios/${linguagem.toLowerCase()}`}
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--accent)",
                  fontWeight: 500,
                  display: "inline-block",
                  marginTop: "0.75rem",
                }}
              >
                Ver mais exercícios de {linguagem} →
              </Link>
            </div>

            {/* Card Projetos */}
            <div
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "0.75rem",
                padding: "1.5rem",
              }}
            >
              <div
                style={{ fontSize: "2rem", marginBottom: "0.5rem" }}
              >
                🚀
              </div>
              <h3
                style={{
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  marginBottom: "0.25rem",
                  fontSize: "1rem",
                }}
              >
                Construa projetos para o portfólio
              </h3>
              <p
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--text-secondary)",
                  marginBottom: "1rem",
                  lineHeight: 1.4,
                }}
              >
                Projetos práticos de {linguagem} com etapas guiadas para
                você mostrar no currículo.
              </p>

              {projetos.length > 0 ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  {projetos.map((proj) => (
                    <a
                      key={proj.id}
                      href={`/projetos/${proj.linguagem.toLowerCase()}/${proj.id}`}
                      style={{
                        fontSize: "0.8125rem",
                        color: "var(--text-primary)",
                        textDecoration: "none",
                        padding: "0.5rem 0.75rem",
                        background: "var(--bg-secondary)",
                        borderRadius: "0.375rem",
                        border: "1px solid var(--border)",
                        transition: "border-color 0.2s",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.65rem",
                          color: "var(--text-secondary)",
                          display: "block",
                          marginBottom: "0.125rem",
                        }}
                      >
                        {proj.nivel === "intermediario"
                          ? "Intermediário"
                          : "Avançado"}{" "}
                        · 🔒 Pro
                      </span>
                      {proj.titulo}
                    </a>
                  ))}
                </div>
              ) : (
                <p
                  style={{
                    fontSize: "0.8125rem",
                    color: "var(--text-secondary)",
                    fontStyle: "italic",
                  }}
                >
                  Nenhum projeto encontrado para esta linguagem.
                </p>
              )}

              <Link
                href={`/projetos/${linguagem.toLowerCase()}`}
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--accent)",
                  fontWeight: 500,
                  display: "inline-block",
                  marginTop: "0.75rem",
                }}
              >
                Ver mais projetos de {linguagem} →
              </Link>
            </div>

            {/* Card Trilha */}
            <div
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "0.75rem",
                padding: "1.5rem",
              }}
            >
              <div
                style={{ fontSize: "2rem", marginBottom: "0.5rem" }}
              >
                🗺️
              </div>
              <h3
                style={{
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  marginBottom: "0.25rem",
                  fontSize: "1rem",
                }}
              >
                Siga a trilha de empregabilidade
              </h3>
              <p
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--text-secondary)",
                  marginBottom: "1rem",
                  lineHeight: 1.4,
                }}
              >
                Uma sequência guiada de exercícios e projetos para sair do
                zero e conseguir sua primeira vaga.
              </p>

              {trilha ? (
                <div
                  style={{
                    background: "var(--bg-secondary)",
                    border: "1px solid var(--border)",
                    borderRadius: "0.5rem",
                    padding: "1rem",
                  }}
                >
                  <h4
                    style={{
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      fontSize: "0.875rem",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {trilha.titulo}
                  </h4>
                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.4,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {trilha.descricao}
                  </p>
                  {trilha.tempo_estimado && (
                    <p
                      style={{
                        fontSize: "0.7rem",
                        color: "var(--text-secondary)",
                        opacity: 0.7,
                        marginBottom: "0.75rem",
                      }}
                    >
                      ⏱ {trilha.tempo_estimado}
                    </p>
                  )}
                  <Link
                    href={`/trilhas/${trilha.slug}`}
                    style={{
                      display: "inline-block",
                      padding: "0.5rem 1rem",
                      background: "var(--accent)",
                      color: "#fff",
                      borderRadius: "0.375rem",
                      fontWeight: 600,
                      fontSize: "0.8125rem",
                      textDecoration: "none",
                    }}
                  >
                    Iniciar trilha →
                  </Link>
                </div>
              ) : (
                <p
                  style={{
                    fontSize: "0.8125rem",
                    color: "var(--text-secondary)",
                    fontStyle: "italic",
                  }}
                >
                  Nenhuma trilha de empregabilidade encontrada para{" "}
                  {linguagem}.
                </p>
              )}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
