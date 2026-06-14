import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { linguagem: string } }): Promise<Metadata> {
  const nome = params.linguagem === "javascript" ? "JavaScript" : params.linguagem === "java" ? "Java" : params.linguagem.charAt(0).toUpperCase() + params.linguagem.slice(1);
  return { title: `Projetos Práticos de ${nome}`, description: `Projetos integradores de ${nome} para praticar programação.` };
}

export default async function LinguagemProjetosPage({ params }: { params: { linguagem: string } }) {
  const supabase = createClient();
  const linguagem = params.linguagem === "javascript" ? "JavaScript" : params.linguagem === "java" ? "Java" : params.linguagem.charAt(0).toUpperCase() + params.linguagem.slice(1);
  const { data: projetos } = await supabase.from("projetos").select("*").eq("linguagem", linguagem).order("ordem");

  const nomeLinguagem = params.linguagem.charAt(0).toUpperCase() + params.linguagem.slice(1);

  return (
    <main style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
        🚀 Projetos Práticos de {nomeLinguagem}
      </h1>
      <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>
        Projetos integradores que combinam tudo que você aprendeu.
      </p>

      {!projetos || projetos.length === 0 ? (
        <p style={{ color: "var(--text-secondary)", textAlign: "center", padding: "3rem" }}>Nenhum projeto disponível ainda.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {projetos.map((proj) => (
            <Link
              key={proj.id}
              href={`/projetos/${params.linguagem}/${proj.id}`}
              style={{
                textDecoration: "none",
                border: "1px solid var(--border)",
                borderRadius: "0.75rem",
                padding: "1.5rem",
                background: "var(--bg-card)",
                transition: "border-color 0.15s",
                display: "block",
              }}
              className="projeto-card"
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--text-primary)", margin: 0 }}>{proj.titulo}</h2>
                <span style={{
                  fontSize: "0.65rem", fontWeight: 600, padding: "0.125rem 0.45rem", borderRadius: "9999px",
                  background: proj.nivel === "avancado" ? "#7f1d1d" : proj.nivel === "intermediario" ? "#92400e" : "#166534",
                  color: proj.nivel === "avancado" ? "#fee2e2" : proj.nivel === "intermediario" ? "#fef3c7" : "#dcfce7",
                  textTransform: "uppercase", whiteSpace: "nowrap",
                }}>
                  {proj.nivel === "intermediario" ? "Intermediário" : proj.nivel === "avancado" ? "Avançado" : "Básico"}
                </span>
              </div>
              <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>{proj.descricao}</p>
              <span style={{ fontSize: "0.75rem", color: "var(--accent)", marginTop: "0.75rem", display: "inline-block" }}>
                🔒 Pro — Acessar projeto →
              </span>
            </Link>
          ))}
        </div>
      )}
      <style>{`.projeto-card:hover { border-color: var(--accent) !important; }`}</style>
    </main>
  );
}
