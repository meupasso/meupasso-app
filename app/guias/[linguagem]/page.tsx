import type { Metadata } from "next";
import Link from "next/link";
import { getTopicos } from "@/lib/guias";

export async function generateMetadata({ params }: { params: { linguagem: string } }): Promise<Metadata> {
  const linguagem = params.linguagem.charAt(0).toUpperCase() + params.linguagem.slice(1);
  return {
    title: `Guia de ${linguagem} para Iniciantes`,
    description: `Aprenda ${linguagem} do zero com exemplos práticos. Variáveis, condicionais, loops, funções e mais.`,
  };
}

export default function LinguagemPage({
  params,
}: {
  params: { linguagem: string };
}) {
  const topicos = getTopicos(params.linguagem);
  if (topicos.length === 0) {
    return (
      <main style={{ padding: "2rem" }}>
        <p style={{ color: "var(--text-secondary)" }}>
          Guia não disponível.
        </p>
      </main>
    );
  }

  const lista = topicos.filter((t) => t.slug !== params.linguagem);

  const nomeLinguagem =
    params.linguagem.charAt(0).toUpperCase() + params.linguagem.slice(1);

  return (
    <main style={{ padding: "2rem", maxWidth: "700px" }}>
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: 700,
          color: "var(--text-primary)",
          marginBottom: "0.5rem",
        }}
      >
        Guia {nomeLinguagem}
      </h1>
      <p
        style={{
          color: "var(--text-secondary)",
          fontSize: "1rem",
          marginBottom: "2rem",
        }}
      >
        {lista.length} tópicos disponíveis.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {lista.map((topico) => (
          <Link
            key={topico.slug}
            href={`/guias/${params.linguagem}/${topico.slug}`}
            className="guia-link"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              padding: "0.875rem 1.25rem",
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "0.5rem",
              textDecoration: "none",
            }}
          >
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "var(--text-secondary)",
                minWidth: "1.5rem",
              }}
            >
              {topico.ordem}
            </span>
            <span
              style={{
                fontSize: "1rem",
                fontWeight: 500,
                color: "var(--text-primary)",
              }}
            >
              {topico.titulo}
            </span>
          </Link>
        ))}
      </div>

      <style>{`
        .guia-link:hover {
          border-color: var(--accent) !important;
        }
      `}</style>
    </main>
  );
}
