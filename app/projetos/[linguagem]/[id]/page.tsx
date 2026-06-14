import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import GitHubRepo from "@/components/GitHubRepo";
import EtapaConcluir from "@/components/EtapaConcluir";

export const dynamic = "force-dynamic";

export default async function ProjetoPage({ params }: { params: { linguagem: string; id: string } }) {
  const supabase = createClient();
  const { data: projeto } = await supabase.from("projetos").select("*").eq("id", params.id).single();
  if (!projeto) notFound();

  const { data: etapas } = await supabase.from("etapas_projeto").select("*").eq("projeto_id", params.id).order("ordem");

  const nomeLinguagem = params.linguagem.charAt(0).toUpperCase() + params.linguagem.slice(1);

  // Mapa projetos → repositórios GitHub Codespaces
  const CODESPACES_REPOS: Record<string, string> = {
    "Calculadora Financeira_Python": "meupasso/projeto-calculadora-python",
    "Sistema de Cadastro de Clientes_Python": "meupasso/projeto-cadastro-python",
    "Jogo de Adivinhação Avançado_Python": "meupasso/projeto-jogo-python",
    "Gerenciador de Tarefas_Python": "meupasso/projeto-tarefas-python",
    "Sistema de Notas Escolares_Python": "meupasso/projeto-escola-python",
    "Calculadora Financeira_Java": "meupasso/projeto-calculadora-java",
    "Sistema de Cadastro de Clientes_Java": "meupasso/projeto-cadastro-java",
    "Jogo de Adivinhação_Java": "meupasso/projeto-jogo-java",
    "Sistema de Biblioteca_Java": "meupasso/projeto-biblioteca-java",
    "Gerenciador de Tarefas_Java": "meupasso/projeto-tarefas-java",
    "Calculadora Financeira_JavaScript": "meupasso/projeto-calculadora-javascript",
    "Sistema de Cadastro de Clientes_JavaScript": "meupasso/projeto-cadastro-javascript",
    "Jogo de Adivinhação Avançado_JavaScript": "meupasso/projeto-jogo-javascript",
    "Gerenciador de Tarefas_JavaScript": "meupasso/projeto-tarefas-javascript",
    "Sistema de Notas Escolares_JavaScript": "meupasso/projeto-escola-javascript",
  };

  const chave = `${projeto.titulo}_${projeto.linguagem}`;
  const repo = CODESPACES_REPOS[chave];
  const codespaceUrl = repo ? `https://codespaces.new/${repo}` : null;

  // Verificar se usuário é Pro
  let isPro = false;
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: perfil } = await supabase
        .from("perfis")
        .select("plano")
        .eq("id", user.id)
        .single();
      isPro = perfil?.plano?.toLowerCase() === "pro";
    }
  } catch {}

  // Buscar progresso das etapas
  let etapasConcluidas = new Set<string>();
  try {
    const { data: progresso } = await supabase.from("progresso").select("referencia_id").eq("usuario_id", (await supabase.auth.getUser()).data.user?.id || "").eq("tipo", "etapa_projeto");
    if (progresso) etapasConcluidas = new Set(progresso.map((p) => p.referencia_id));
  } catch {}

  if (!isPro) {
    return (
      <main style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto", marginTop: "5rem", textAlign: "center" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔒</div>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.75rem" }}>
          Conteúdo exclusivo para assinantes Pro
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.9375rem", marginBottom: "1.5rem", lineHeight: 1.6 }}>
          Projetos práticos com etapas guiadas estão disponíveis apenas no plano Pro.
        </p>
        <Link href="/assinatura" style={{
          display: "inline-block", padding: "0.75rem 2rem",
          background: "var(--accent)", color: "#fff",
          borderRadius: "0.5rem", fontWeight: 600, fontSize: "1rem",
          textDecoration: "none",
        }}>
          Assinar Pro por R$27,90/mês
        </Link>
      </main>
    );
  }

  return (
    <main style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      {/* Breadcrumb */}
      <div style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", marginBottom: "1.5rem", display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
        <Link href="/projetos" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>Projetos</Link>
        <span>/</span>
        <Link href={`/projetos/${params.linguagem}`} style={{ color: "var(--text-secondary)", textDecoration: "none" }}>{nomeLinguagem}</Link>
        <span>/</span>
        <span style={{ color: "var(--text-primary)" }}>{projeto.titulo}</span>
      </div>

      {/* Badges */}
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
        <span style={{
          fontSize: "0.65rem", fontWeight: 600, padding: "0.125rem 0.5rem", borderRadius: "0.25rem",
          background: "var(--badge-bg)", color: "var(--badge-text)",
        }}>
          {projeto.linguagem}
        </span>
        <span style={{
          fontSize: "0.65rem", fontWeight: 600, padding: "0.125rem 0.45rem", borderRadius: "9999px",
          background: projeto.nivel === "avancado" ? "#7f1d1d" : "#92400e",
          color: projeto.nivel === "avancado" ? "#fee2e2" : "#fef3c7",
        }}>
          {projeto.nivel === "intermediario" ? "Intermediário" : "Avançado"}
        </span>
        <span style={{
          fontSize: "0.65rem", fontWeight: 600, padding: "0.125rem 0.5rem", borderRadius: "0.25rem",
          background: "#1e3a5f", color: "#93c5fd",
        }}>
          🔒 Pro
        </span>
        <span style={{
          fontSize: "0.65rem", fontWeight: 600, padding: "0.125rem 0.5rem", borderRadius: "0.25rem",
          background: "var(--bg-card)", color: "var(--text-secondary)", border: "1px solid var(--border)",
        }}>
          {etapas?.length || 0} etapas
        </span>
      </div>

      {/* Título */}
      <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.75rem", lineHeight: 1.2 }}>
        {projeto.titulo}
      </h1>

      {/* Descrição */}
      <p style={{ color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "2rem", fontSize: "0.9375rem" }}>
        {projeto.descricao}
      </p>

      {/* GitHub Codespaces */}
      {codespaceUrl && (
        <div style={{ marginBottom: "1.5rem" }}>
          <a
            href={codespaceUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem 1rem",
              background: "#238636",
              color: "white",
              borderRadius: "0.375rem",
              textDecoration: "none",
              fontSize: "0.875rem",
              fontWeight: 500,
              marginBottom: "0.5rem",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"/>
            </svg>
            Abrir no GitHub Codespaces
          </a>
          <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", margin: 0 }}>
            Abre um VS Code completo no navegador com o ambiente já configurado.
            Requer conta gratuita no GitHub.
          </p>
        </div>
      )}

      {/* GitHub Repo */}
      <GitHubRepo projetoId={projeto.id} linguagem={projeto.linguagem} />

      {/* Separador */}
      <hr style={{ border: "none", borderTop: "1px solid var(--border)", marginBottom: "2rem" }} />

      <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1rem" }}>
        Etapas do Projeto
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {etapas?.map((etapa) => (
          <details
            key={etapa.id}
            style={{
              border: "1px solid var(--border)",
              borderRadius: "0.5rem",
              background: "var(--bg-card)",
              overflow: "hidden",
            }}
          >
            <summary
              style={{
                padding: "1rem 1.25rem",
                cursor: "pointer",
                fontWeight: 600,
                color: "var(--text-primary)",
                fontSize: "0.9375rem",
              }}
            >
              {etapa.titulo}
            </summary>
            <div style={{ padding: "0 1.25rem 1.25rem" }}>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: 1.6, marginBottom: "1rem", whiteSpace: "pre-wrap" }}>
                {etapa.descricao}
              </p>
              {etapa.dica_tutor && (
                <div style={{
                  background: "var(--code-bg)",
                  border: "1px solid var(--border)",
                  borderRadius: "0.375rem",
                  padding: "0.75rem",
                  marginBottom: "0.75rem",
                }}>
                  <p style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--accent)", marginBottom: "0.25rem", textTransform: "uppercase" }}>
                    💡 Dica do tutor
                  </p>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.8125rem", lineHeight: 1.5, margin: 0, whiteSpace: "pre-wrap" }}>
                    {etapa.dica_tutor}
                  </p>
                </div>
              )}
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                <a href={`/exercicios/${params.linguagem}`} style={{
                  padding: "0.5rem 1rem", background: "var(--bg-secondary)", color: "var(--text-primary)",
                  border: "1px solid var(--border)", borderRadius: "0.375rem", fontSize: "0.8125rem",
                  fontWeight: 500, cursor: "pointer", textDecoration: "none", display: "inline-block",
                }}>
                  💡 Pratique no tutor
                </a>
                <EtapaConcluir etapaId={etapa.id} linguagem={projeto.linguagem} inicial={etapasConcluidas.has(etapa.id)} />
              </div>
            </div>
          </details>
        ))}
      </div>

      {(!etapas || etapas.length === 0) && (
        <p style={{ color: "var(--text-secondary)", textAlign: "center", padding: "3rem" }}>
          Nenhuma etapa encontrada para este projeto.
        </p>
      )}
    </main>
  );
}
