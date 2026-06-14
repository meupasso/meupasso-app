import type { Metadata } from "next";
import Link from "next/link";
import { getPosts } from "@/lib/blog";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog — Dicas para Programadores Iniciantes",
  description:
    "Artigos curtos para quem está começando em programação. Carreira, prática, tecnologia e dicas para iniciantes brasileiros.",
};

function formatarData(data: string): string {
  const d = new Date(data + "T12:00:00");
  return d.toLocaleDateString("pt-BR", { day: "numeric", month: "short", year: "numeric" });
}

export default function BlogPage() {
  const posts = getPosts();

  return (
    <main style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2.5rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
        Blog
      </h1>
      <p style={{ color: "var(--text-secondary)", fontSize: "1.125rem", marginBottom: "2.5rem" }}>
        Artigos curtos para quem está começando em programação.
      </p>

      <div
        style={{
          display: "grid",
          gap: "1.5rem",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
        }}
      >
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="blog-card"
            style={{
              textDecoration: "none",
              borderRadius: "0.75rem",
              background: "var(--bg-card)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              transition: "box-shadow 0.2s ease, transform 0.2s ease",
            }}
          >
            {post.imagem && (
              <img
                src={post.imagem}
                alt=""
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            )}
            <div style={{ padding: "1.25rem", flex: 1, display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: "0.65rem",
                      fontWeight: 600,
                      padding: "0.125rem 0.5rem",
                      borderRadius: "0.25rem",
                      background: "var(--accent)",
                      color: "#ffffff",
                      opacity: 0.85,
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2
                style={{
                  fontSize: "1.125rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  marginBottom: "0.5rem",
                  lineHeight: 1.3,
                }}
              >
                {post.titulo}
              </h2>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.5,
                  marginBottom: "0.75rem",
                  flex: 1,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {post.descricao}
              </p>
              <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", opacity: 0.6 }}>
                {formatarData(post.data)}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <style>{`
        .blog-card:hover {
          box-shadow: 0 4px 12px rgba(0,0,0,0.3) !important;
          transform: translateY(-2px);
        }
      `}</style>
    </main>
  );
}
