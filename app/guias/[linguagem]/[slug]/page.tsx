import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getTopico, getTopicos } from "@/lib/guias";
import AdSlot from "@/components/AdSlot";

export async function generateMetadata({ params }: { params: { linguagem: string; slug: string } }): Promise<Metadata> {
  const topico = getTopico(params.linguagem, params.slug);
  if (!topico) return {};
  return {
    title: `${topico.meta.titulo} em ${params.linguagem.charAt(0).toUpperCase() + params.linguagem.slice(1)}`,
    description: `Aprenda ${topico.meta.titulo} em ${params.linguagem.charAt(0).toUpperCase() + params.linguagem.slice(1)} com exemplos práticos para iniciantes.`,
  };
}

export default async function TopicoPage({
  params,
}: {
  params: { linguagem: string; slug: string };
}) {
  const topicos = getTopicos(params.linguagem);
  if (topicos.length === 0) notFound();

  const topico = getTopico(params.linguagem, params.slug);
  if (!topico) notFound();

  const indexAtual = topicos.findIndex((t) => t.slug === params.slug);
  const anterior = indexAtual > 0 ? topicos[indexAtual - 1] : null;
  const proximo = indexAtual < topicos.length - 1 ? topicos[indexAtual + 1] : null;

  const nomeLinguagem =
    params.linguagem.charAt(0).toUpperCase() + params.linguagem.slice(1);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "var(--bg-primary)",
      }}
    >
      <nav
        style={{
          width: "250px",
          flexShrink: 0,
          borderRight: "1px solid var(--border)",
          background: "var(--bg-secondary)",
          padding: "1rem 0",
          overflowY: "auto",
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
        className="guia-sidebar"
      >
        <Link
          href={`/guias/${params.linguagem}`}
          style={{
            display: "block",
            padding: "0.5rem 1rem",
            fontWeight: 700,
            fontSize: "0.9375rem",
            color: "var(--accent)",
            textDecoration: "none",
            marginBottom: "0.5rem",
          }}
        >
          ← {nomeLinguagem}
        </Link>
        {topicos
          .filter((t) => t.slug !== params.linguagem)
          .map((t) => (
            <Link
              key={t.slug}
              href={`/guias/${params.linguagem}/${t.slug}`}
              className="guia-sidebar-link"
              style={{
                display: "block",
                padding: "0.5rem 1rem",
                fontSize: "0.875rem",
                color:
                  t.slug === params.slug
                    ? "var(--accent)"
                    : "var(--text-secondary)",
                background:
                  t.slug === params.slug ? "var(--bg-card)" : "transparent",
                fontWeight: t.slug === params.slug ? 600 : 400,
                borderLeft:
                  t.slug === params.slug
                    ? "2px solid var(--accent)"
                    : "2px solid transparent",
                textDecoration: "none",
              }}
            >
              {t.titulo}
            </Link>
          ))}
      </nav>

      <main
        style={{
          flex: 1,
          padding: "2rem 3rem",
          maxWidth: "800px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "0.5rem",
          }}
        >
          <Link
            href={`/guias/${params.linguagem}`}
            style={{
              fontSize: "0.8rem",
              color: "var(--text-secondary)",
              textDecoration: "none",
            }}
          >
            {nomeLinguagem}
          </Link>
          <span style={{ color: "var(--text-secondary)", fontSize: "0.8rem" }}>
            →
          </span>
          <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
            {topico.meta.titulo}
          </span>
        </div>

        <h1
          style={{
            fontSize: "1.75rem",
            fontWeight: 700,
            color: "var(--text-primary)",
            marginBottom: "2rem",
          }}
        >
          {topico.meta.titulo}
        </h1>

        <div
          className="mdx-content"
          style={{
            color: "var(--text-primary)",
            lineHeight: 1.7,
            fontSize: "0.9375rem",
          }}
        >
          <MDXRemote source={topico.content} />
        </div>

        <AdSlot slot="guia-bottom" />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "3rem",
            paddingTop: "1.5rem",
            borderTop: "1px solid var(--border)",
          }}
        >
          {anterior ? (
            <Link
              href={`/guias/${params.linguagem}/${anterior.slug}`}
              style={{
                padding: "0.625rem 1.25rem",
                background: "var(--bg-card)",
                color: "var(--text-primary)",
                border: "1px solid var(--border)",
                borderRadius: "0.375rem",
                fontSize: "0.875rem",
                textDecoration: "none",
              }}
            >
              ← {anterior.titulo}
            </Link>
          ) : (
            <div />
          )}
          {proximo && (
            <Link
              href={`/guias/${params.linguagem}/${proximo.slug}`}
              style={{
                padding: "0.625rem 1.25rem",
                background: "var(--accent)",
                color: "#ffffff",
                border: "none",
                borderRadius: "0.375rem",
                fontSize: "0.875rem",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              {proximo.titulo} →
            </Link>
          )}
        </div>
      </main>

      <style>{`
        @media (max-width: 1023px) {
          .guia-sidebar {
            display: none !important;
          }
        }
        .guia-sidebar-link:hover {
          background: var(--bg-card) !important;
        }
      `}</style>
    </div>
  );
}
