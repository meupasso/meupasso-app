import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const supabase = createClient();
  const { data: tri } = await supabase.from("trilhas").select("titulo, descricao").eq("slug", params.slug).single();
  if (!tri) return {};
  return { title: `${tri.titulo} | MeuPasso Trilhas`, description: tri.descricao };
}

export default async function TrilhaPage({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  const { data: tri } = await supabase.from("trilhas").select("*").eq("slug", params.slug).single();
  if (!tri) notFound();

  const { data: etapas } = await supabase.from("etapas_trilha").select("*").eq("trilha_id", tri.id).order("ordem");

  const langSlug = tri.linguagem.toLowerCase();

  const labelMap: Record<string, string> = { iniciante: "Iniciante", intermediario: "Intermediário", objetivo: "Foco em resultado" };
  const perfilLabel = labelMap[tri.perfil] || tri.perfil;

  return (
    <main style={{ padding: "2rem", maxWidth: "720px", margin: "0 auto" }}>
      <Link href="/trilhas" style={{ color: "var(--text-secondary)", fontSize: "0.875rem", textDecoration: "none", display: "inline-block", marginBottom: "1.5rem" }}>
        ← Todas as trilhas
      </Link>

      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
        <span style={{ fontSize: "0.65rem", fontWeight: 600, padding: "0.125rem 0.5rem", borderRadius: "0.25rem", background: "var(--badge-bg)", color: "var(--badge-text)" }}>
          {tri.linguagem}
        </span>
        <span style={{ fontSize: "0.65rem", fontWeight: 600, padding: "0.125rem 0.5rem", borderRadius: "0.25rem", background: "#1e3a5f", color: "#93c5fd" }}>
          {perfilLabel}
        </span>
      </div>

      <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.75rem", lineHeight: 1.2 }}>
        🗺️ {tri.titulo}
      </h1>
      <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.6, marginBottom: "1rem" }}>
        {tri.descricao}
      </p>
      <p style={{ fontSize: "0.875rem", color: "var(--accent)", marginBottom: "2rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
        ⏱ {tri.tempo_estimado}
      </p>

      {etapas && etapas.length > 0 && (
        <div style={{ position: "relative" }}>
          {/* Linha do tempo vertical */}
          <div style={{ position: "absolute", left: "1rem", top: "0.5rem", bottom: "0.5rem", width: "2px", background: "var(--border)" }} />

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {etapas.map((etapa, i) => {
              const isModulo = etapa.tipo === "modulo";
              const href = isModulo
                ? `/exercicios/${langSlug}`
                : `/projetos/${langSlug}`;

              return (
                <div key={etapa.id} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", position: "relative" }}>
                  {/* Círculo na linha */}
                  <div style={{
                    width: "2rem", height: "2rem", borderRadius: "50%",
                    background: isModulo ? "var(--accent)" : "#6b21a8",
                    color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.75rem", fontWeight: 700, flexShrink: 0, zIndex: 1,
                  }}>
                    {i + 1}
                  </div>

                  {/* Conteúdo */}
                  <div style={{ flex: 1, background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "0.5rem", padding: "1rem 1.25rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.375rem" }}>
                      <span style={{
                        fontSize: "0.65rem", fontWeight: 600, padding: "0.125rem 0.45rem", borderRadius: "0.25rem",
                        background: isModulo ? "var(--badge-bg)" : "#6b21a8",
                        color: isModulo ? "var(--badge-text)" : "#f3e8ff",
                      }}>
                        {isModulo ? "📚 Módulo" : "🚀 Projeto"}
                      </span>
                    </div>
                    <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.25rem" }}>
                      {etapa.titulo}
                    </h3>
                    <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: "0.75rem" }}>
                      {etapa.descricao}
                    </p>
                    <Link href={href}
                      style={{
                        display: "inline-block", padding: "0.375rem 0.875rem",
                        background: isModulo ? "var(--accent)" : "#6b21a8",
                        color: "#fff", borderRadius: "0.375rem",
                        fontSize: "0.75rem", fontWeight: 600, textDecoration: "none",
                      }}
                    >
                      {isModulo ? "Ir para exercícios →" : "Ir para projeto →"}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {(!etapas || etapas.length === 0) && (
        <p style={{ color: "var(--text-secondary)", textAlign: "center", padding: "3rem" }}>Etapas não encontradas.</p>
      )}
    </main>
  );
}
