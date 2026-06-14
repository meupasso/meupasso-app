"use client";

import { useState } from "react";
import Link from "next/link";

type Termo = {
  id: string;
  termo: string;
  slug: string;
  definicao: string;
  exemplo: string | null;
  linguagem: string;
};

export default function GlossarioListClient({
  termos,
}: {
  termos: Termo[];
}) {
  const [busca, setBusca] = useState("");
  const [filtroLinguagem, setFiltroLinguagem] = useState("Todos");

  const linguagens = ["Todos", "geral", "python"];

  const filtrados = termos.filter((t) => {
    const matchBusca =
      !busca ||
      t.termo.toLowerCase().includes(busca.toLowerCase()) ||
      t.definicao.toLowerCase().includes(busca.toLowerCase());
    const matchLingua =
      filtroLinguagem === "Todos" || t.linguagem === filtroLinguagem;
    return matchBusca && matchLingua;
  });

  return (
    <main style={{ padding: "2rem", maxWidth: "800px" }}>
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: 700,
          color: "var(--text-primary)",
          marginBottom: "0.5rem",
        }}
      >
        📖 Glossário de Programação
      </h1>
      <p
        style={{
          color: "var(--text-secondary)",
          fontSize: "1.05rem",
          marginBottom: "2rem",
          lineHeight: 1.5,
        }}
      >
        Termos essenciais para quem está começando.
      </p>

      {/* Busca */}
      <input
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        placeholder="Buscar termo..."
        style={{
          width: "100%",
          padding: "0.75rem 1rem",
          background: "var(--bg-card)",
          color: "var(--text-primary)",
          border: "1px solid var(--border)",
          borderRadius: "0.5rem",
          fontSize: "0.9375rem",
          outline: "none",
          marginBottom: "1rem",
        }}
      />

      {/* Filtro linguagem */}
      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          marginBottom: "2rem",
          flexWrap: "wrap",
        }}
      >
        {linguagens.map((l) => (
          <button
            key={l}
            onClick={() => setFiltroLinguagem(l)}
            style={{
              padding: "0.375rem 1rem",
              borderRadius: "9999px",
              fontSize: "0.875rem",
              fontWeight: 500,
              border: "1px solid",
              cursor: "pointer",
              backgroundColor:
                filtroLinguagem === l ? "var(--accent)" : "transparent",
              color:
                filtroLinguagem === l ? "#ffffff" : "var(--text-secondary)",
              borderColor:
                filtroLinguagem === l ? "var(--accent)" : "var(--border)",
            }}
          >
            {l === "geral" ? "Geral" : l === "python" ? "Python" : "Todos"}
          </button>
        ))}
      </div>

      {/* Lista */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {filtrados.length === 0 && (
          <p style={{ color: "var(--text-secondary)", textAlign: "center" }}>
            Nenhum termo encontrado.
          </p>
        )}
        {filtrados.map((t) => (
          <Link
            key={t.id}
            href={`/glossario/${t.slug}`}
            style={{
              textDecoration: "none",
              border: "1px solid var(--border)",
              borderRadius: "0.5rem",
              padding: "1rem 1.25rem",
              backgroundColor: "var(--bg-card)",
              transition: "border-color 0.15s",
              display: "block",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = "var(--accent)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = "var(--border)")
            }
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "0.375rem",
              }}
            >
              <strong
                style={{
                  fontSize: "1.05rem",
                  color: "var(--text-primary)",
                }}
              >
                {t.termo}
              </strong>
              <span
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 500,
                  color: "var(--badge-text)",
                  backgroundColor: "var(--badge-bg)",
                  padding: "0.125rem 0.5rem",
                  borderRadius: "0.25rem",
                }}
              >
                {t.linguagem === "python" ? "Python" : "Geral"}
              </span>
            </div>
            <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
              {t.definicao.length > 100
                ? t.definicao.slice(0, 100) + "…"
                : t.definicao}
            </p>
          </Link>
        ))}
      </div>

      {/* AD */}
    </main>
  );
}
