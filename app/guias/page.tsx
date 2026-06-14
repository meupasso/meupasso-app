import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Guias de Programação",
  description:
    "Guias completos de Python, Java e JavaScript para iniciantes. Aprenda variáveis, condicionais, loops, funções, POO e muito mais com exemplos práticos.",
};

const linguagens = [
  {
    nome: "Python",
    slug: "python",
    descricao: "Guia completo de Python do básico ao avançado.",
    disponivel: true,
  },
  {
    nome: "Java",
    slug: "java",
    descricao: "Guia completo de Java para iniciantes.",
    disponivel: true,
  },
  {
    nome: "JavaScript",
    slug: "javascript",
    descricao: "Guia completo de JavaScript para iniciantes. Node.js, variáveis, funções, promises e mais.",
    disponivel: true,
  },
];

export default function GuiasPage() {
  return (
    <main
      style={{
        padding: "2rem",
        maxWidth: "700px",
        margin: "0 auto",
        marginTop: "5vh",
      }}
    >
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: 700,
          color: "var(--text-primary)",
          marginBottom: "0.5rem",
        }}
      >
        📚 Guias
      </h1>
      <p
        style={{
          color: "var(--text-secondary)",
          fontSize: "1.05rem",
          marginBottom: "2rem",
        }}
      >
        Escolha uma linguagem para começar.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {linguagens.map((lang) => (
          <div
            key={lang.slug}
            style={{
              border: `1px solid var(--border)`,
              borderRadius: "0.75rem",
              padding: "1.5rem",
              background: "var(--bg-card)",
              opacity: lang.disponivel ? 1 : 0.5,
              cursor: lang.disponivel ? "pointer" : "not-allowed",
              transition: "border-color 0.15s",
            }}
          >
            {lang.disponivel ? (
              <Link
                href={`/guias/${lang.slug}`}
                style={{ textDecoration: "none", display: "block" }}
              >
                <h2
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    marginBottom: "0.25rem",
                  }}
                >
                  {lang.nome}
                </h2>
                <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                  {lang.descricao}
                </p>
              </Link>
            ) : (
              <>
                <h2
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    marginBottom: "0.25rem",
                  }}
                >
                  {lang.nome}
                </h2>
                <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                  {lang.descricao}
                </p>
              </>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
