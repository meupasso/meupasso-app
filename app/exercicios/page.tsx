import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Exercícios de Programação",
  description:
    "Pratique programação com exercícios de Python, Java e JavaScript organizados por módulo e dificuldade.",
};

export default async function ExerciciosPage() {
  const supabase = createClient();
  const { data } = await supabase.from("exercicios").select("linguagem");

  const contagem: Record<string, number> = {};
  if (data) {
    for (const ex of data) {
      contagem[ex.linguagem] = (contagem[ex.linguagem] || 0) + 1;
    }
  }

  const linguagens = [
    {
      nome: "Python",
      slug: "python",
      descricao: `${contagem["Python"] || 0} exercícios · Sintaxe, condicionais, repetição, listas, funções, coleções, arquivos e POO`,
      disponivel: true,
    },
    {
      nome: "Java",
      slug: "java",
      descricao: `${contagem["Java"] || 0} exercícios · Sintaxe, condicionais, repetição, ArrayList e POO`,
      disponivel: true,
    },
    {
      nome: "JavaScript",
      slug: "javascript",
      descricao: `${contagem["JavaScript"] || 0} exercícios · Sintaxe`,
      disponivel: true,
    },
  ];

  return (
    <main style={{ padding: "2rem", maxWidth: "700px", margin: "0 auto", marginTop: "5vh" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
        📝 Exercícios
      </h1>
      <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", marginBottom: "2rem" }}>
        Escolha a linguagem para praticar.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {linguagens.map((lang) => (
          <div
            key={lang.slug}
            style={{
              border: "1px solid var(--border)",
              borderRadius: "0.75rem",
              padding: "1.5rem",
              background: "var(--bg-card)",
              opacity: lang.disponivel ? 1 : 0.5,
              cursor: lang.disponivel ? "pointer" : "not-allowed",
            }}
          >
            {lang.disponivel ? (
              <Link href={`/exercicios/${lang.slug}`} style={{ textDecoration: "none", display: "block" }}>
                <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.25rem" }}>
                  {lang.nome}
                </h2>
                <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>{lang.descricao}</p>
              </Link>
            ) : (
              <>
                <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.25rem" }}>
                  {lang.nome}
                </h2>
                <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>{lang.descricao}</p>
              </>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
