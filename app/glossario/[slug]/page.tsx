"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

type Termo = {
  id: string;
  termo: string;
  slug: string;
  definicao: string;
  exemplo: string | null;
  linguagem: string;
};

export default function TermoPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const [termo, setTermo] = useState<Termo | null>(null);
  const [vejaTambem, setVejaTambem] = useState<{ slug: string; termo: string }[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregar() {
      const { data: t } = await supabase
        .from("glossario")
        .select("*")
        .eq("slug", slug)
        .single();

      if (!t) {
        setCarregando(false);
        return;
      }

      setTermo(t);

      // Veja também — 3 aleatórios
      const { data: todos } = await supabase
        .from("glossario")
        .select("slug, termo")
        .neq("id", t.id);

      if (todos) {
        setVejaTambem(todos.sort(() => Math.random() - 0.5).slice(0, 3));
      }

      setCarregando(false);
    }
    carregar();
  }, [slug]);

  if (carregando) {
    return (
      <main
        style={{
          padding: "2rem",
          display: "flex",
          justifyContent: "center",
          paddingTop: "4rem",
          color: "var(--text-secondary)",
        }}
      >
        Carregando...
      </main>
    );
  }

  if (!termo) {
    return (
      <main style={{ padding: "2rem" }}>
        <p style={{ color: "var(--text-secondary)" }}>
          Termo não encontrado.
        </p>
        <Link
          href="/glossario"
          style={{ color: "var(--accent)", fontSize: "0.875rem", textDecoration: "none" }}
        >
          ← Voltar ao glossário
        </Link>
      </main>
    );
  }

  return (
    <main style={{ padding: "2rem", maxWidth: "700px" }}>
      {/* Breadcrumb */}
      <Link
        href="/glossario"
        style={{
          color: "var(--text-secondary)",
          fontSize: "0.875rem",
          textDecoration: "none",
          marginBottom: "1.5rem",
          display: "inline-block",
        }}
      >
        ← Voltar ao glossário
      </Link>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          marginBottom: "0.5rem",
          flexWrap: "wrap",
        }}
      >
        <h1
          style={{
            fontSize: "1.75rem",
            fontWeight: 700,
            color: "var(--text-primary)",
          }}
        >
          {termo.termo}
        </h1>
        <span
          style={{
            fontSize: "0.75rem",
            fontWeight: 500,
            color: "var(--badge-text)",
            backgroundColor: "var(--badge-bg)",
            padding: "0.125rem 0.5rem",
            borderRadius: "0.25rem",
          }}
        >
          {termo.linguagem === "python" ? "Python" : "Geral"}
        </span>
      </div>

      <p
        style={{
          fontSize: "0.875rem",
          color: "var(--text-secondary)",
          marginBottom: "2rem",
          lineHeight: 1.6,
        }}
      >
        Glossário → {termo.termo}
      </p>

      {/* Definição */}
      <div
        style={{
          backgroundColor: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "0.5rem",
          padding: "1.25rem",
          marginBottom: "1.5rem",
        }}
      >
        <p style={{ color: "var(--text-primary)", lineHeight: 1.7, fontSize: "0.9375rem" }}>
          {termo.definicao}
        </p>
      </div>

      {/* Exemplo */}
      {termo.exemplo && (
        <div
          style={{
            backgroundColor: "var(--code-bg)",
            border: "1px solid var(--border)",
            borderRadius: "0.5rem",
            padding: "1.25rem",
            marginBottom: "2rem",
          }}
        >
          <p
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "var(--text-secondary)",
              marginBottom: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Exemplo
          </p>
          <pre
            style={{
              color: "var(--text-primary)",
              fontSize: "0.875rem",
              lineHeight: 1.6,
              whiteSpace: "pre-wrap",
              margin: 0,
              fontFamily: "'SF Mono', 'Fira Code', 'Fira Mono', Menlo, Consolas, monospace",
            }}
          >
            {termo.exemplo}
          </pre>
        </div>
      )}

      {/* AD */}

      {/* Veja também */}
      {vejaTambem.length > 0 && (
        <div
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: "1.5rem",
            marginTop: "2rem",
          }}
        >
          <p
            style={{
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "var(--text-secondary)",
              marginBottom: "0.75rem",
            }}
          >
            Veja também
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {vejaTambem.map((t) => (
              <Link
                key={t.slug}
                href={`/glossario/${t.slug}`}
                style={{
                  padding: "0.375rem 0.875rem",
                  background: "var(--bg-card)",
                  color: "var(--accent)",
                  border: "1px solid var(--border)",
                  borderRadius: "0.375rem",
                  fontSize: "0.875rem",
                  textDecoration: "none",
                  transition: "border-color 0.15s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = "var(--accent)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "var(--border)")
                }
              >
                {t.termo}
              </Link>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
