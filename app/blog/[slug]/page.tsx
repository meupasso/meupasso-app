import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPost, getPosts } from "@/lib/blog";
import AdSlot from "@/components/AdSlot";

export const dynamic = "force-dynamic";

function formatarData(data: string): string {
  const d = new Date(data + "T12:00:00");
  return d.toLocaleDateString("pt-BR", { day: "numeric", month: "short", year: "numeric" });
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPost(params.slug);
  if (!post) return {};
  return {
    title: `${post.titulo} | MeuPasso Blog`,
    description: post.descricao,
    openGraph: {
      title: post.titulo,
      description: post.descricao,
      images: [{ url: post.imagem || "/og-image.png", width: 800, height: 450 }],
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const outros = getPosts().filter((p) => p.slug !== params.slug).slice(0, 2);

  return (
    <main style={{ maxWidth: "720px", margin: "0 auto" }}>
      {/* Cover image */}
      {post.imagem && (
        <img
          src={post.imagem}
          alt=""
          style={{
            width: "100%",
            height: "300px",
            objectFit: "cover",
            display: "block",
          }}
        />
      )}

      <div style={{ padding: "2rem 2rem 0" }}>
        <Link
          href="/blog"
          style={{ color: "var(--text-secondary)", fontSize: "0.875rem", textDecoration: "none", display: "inline-block", marginBottom: "1.5rem" }}
        >
          ← Blog
        </Link>

        <h1
          style={{
            fontSize: "2rem",
            fontWeight: 700,
            color: "var(--text-primary)",
            marginBottom: "0.75rem",
            lineHeight: 1.3,
          }}
        >
          {post.titulo}
        </h1>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
          <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)", opacity: 0.6 }}>
            {formatarData(post.data)}
          </span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: "0.65rem",
                fontWeight: 600,
                padding: "0.125rem 0.5rem",
                borderRadius: "0.25rem",
                background: "var(--badge-bg)",
                color: "var(--badge-text)",
                textTransform: "uppercase",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <hr style={{ border: "none", borderTop: "1px solid var(--border)", marginBottom: "2rem" }} />
      </div>

      <AdSlot slot="blog-top" />

      <div
        style={{
          padding: "0 2rem 2rem",
          maxWidth: "680px",
        }}
        className="blog-content"
      >
        <div style={{ color: "var(--text-primary)", lineHeight: 1.8, fontSize: "1rem" }}>
          <MDXRemote source={post.content} />
        </div>

        <AdSlot slot="blog-bottom" />

        {outros.length > 0 && (
          <div style={{ borderTop: "1px solid var(--border)", marginTop: "3rem", paddingTop: "2rem" }}>
            <h2 style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "1rem" }}>
              Continue lendo
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {outros.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="blog-related-link"
                  style={{
                    textDecoration: "none",
                    padding: "0.875rem 1.25rem",
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    borderRadius: "0.5rem",
                    transition: "border-color 0.15s",
                  }}
                >
                  <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.25rem" }}>
                    {p.titulo}
                  </h3>
                  <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {p.descricao}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .blog-content h2 { margin-top: 2rem; margin-bottom: 0.75rem; color: var(--text-primary); }
        .blog-content p { margin-bottom: 1rem; }
        .blog-content a { color: var(--accent); }
        .blog-related-link:hover {
          border-color: var(--accent) !important;
        }
      `}</style>
    </main>
  );
}
