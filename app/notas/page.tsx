"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export default function NotasPage() {
  const [slug, setSlug] = useState("");
  const [expandido, setExpandido] = useState(false);
  const [raizes, setRaizes] = useState<{ slug: string; slug_display: string }[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    async function carregar() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data } = await supabase
          .from("notas")
          .select("slug")
          .or(`usuario_id.eq.${user.id},usuario_id.is.null`)
          .not("slug", "like", "%/%")
          .order("slug");
        if (data) setRaizes(data.map((n) => ({ slug: n.slug, slug_display: n.slug })));
      }

      setCarregando(false);
    }
    carregar();
  }, []);

  function ir() {
    const nome = slug.trim().toLowerCase().replace(/\s+/g, "-");
    if (!nome) return;
    router.push(`/notas/${encodeURIComponent(nome)}`);
  }

  async function deletarNota(slugNota: string) {
    const ok = window.confirm(`Deletar "${slugNota}" e todas as subpáginas?`);
    if (!ok) return;
    try {
      const res = await fetch(`/api/notas/${encodeURIComponent(slugNota)}`, { method: "DELETE" });
      if (res.ok) {
        setRaizes((prev) => prev.filter((r) => r.slug !== slugNota));
      }
    } catch {}
  }

  return (
    <main style={{ padding: "2rem", maxWidth: "700px", margin: "0 auto", marginTop: "8vh" }}>
      <h1 style={{ fontSize: "2.5rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.75rem", textAlign: "center" }}>
        📝 Notas
      </h1>
      <p style={{ color: "var(--text-secondary)", textAlign: "center", fontSize: "1.05rem", marginBottom: "1.5rem", lineHeight: 1.5 }}>
        Notas hierárquicas com texto. Acesse pelo nome.
      </p>

      {/* Campo de busca/criação */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "0.75rem", padding: "0.5rem 1rem", marginBottom: "2rem" }}>
        <span style={{ color: "var(--text-secondary)", fontSize: "0.8125rem", whiteSpace: "nowrap" }}>
          meupasso.com.br/notas/
        </span>
        <input value={slug} onChange={(e) => setSlug(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && ir()}
          placeholder="nome-da-nota" style={{
            flex: 1, padding: "0.5rem 0.75rem", background: "var(--code-bg)", color: "var(--text-primary)",
            border: "1px solid var(--border)", borderRadius: "0.375rem", fontSize: "0.9375rem", outline: "none",
            fontFamily: "monospace",
          }} />
        <button onClick={ir} disabled={!slug.trim()} style={{
          padding: "0.5rem 1.25rem", background: !slug.trim() ? "var(--text-secondary)" : "var(--accent)",
          color: "#fff", border: "none", borderRadius: "0.375rem", fontSize: "0.9375rem", fontWeight: 600,
          cursor: !slug.trim() ? "not-allowed" : "pointer",
        }}>
          Ir
        </button>
      </div>

      {/* Seção Suas Notas — só para logados */}
      {!user && !carregando && (
        <p style={{ textAlign: "center", color: "var(--text-secondary)", fontSize: "0.8125rem", marginBottom: "1rem" }}>
          <Link href="/entrar" style={{ color: "var(--accent)", textDecoration: "none" }}>Faça login</Link> para ver suas notas salvas.
        </p>
      )}

      {user && !carregando && raizes.length === 0 && (
        <p style={{ textAlign: "center", color: "var(--text-secondary)", fontSize: "0.875rem" }}>
          Nenhuma nota ainda. Digite um nome acima para criar.
        </p>
      )}

      {carregando && <p style={{ textAlign: "center", color: "var(--text-secondary)", fontSize: "0.875rem" }}>Carregando...</p>}

      {user && raizes.length > 0 && (
        <div>
          <button
            onClick={() => setExpandido(!expandido)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "none",
              border: "none",
              color: "var(--text-primary)",
              cursor: "pointer",
              fontSize: "0.875rem",
              fontWeight: 500,
              padding: "0.5rem 0",
              width: "100%",
              textAlign: "left",
            }}
          >
            {expandido ? "▾" : "▸"} Minhas notas ({raizes.length})
          </button>

          {expandido && (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem", marginTop: "0.5rem" }}>
              {raizes.map((r) => (
                <div key={r.slug} style={{
                  display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 0.75rem",
                  background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "0.375rem",
                  fontSize: "0.875rem", color: "var(--text-primary)",
                }}>
                  <Link href={`/notas/${encodeURIComponent(r.slug)}`} style={{
                    flex: 1, textDecoration: "none", color: "var(--text-primary)", display: "flex",
                    alignItems: "center", gap: "0.5rem",
                  }}>
                    📄 {r.slug_display}
                  </Link>
                  <button onClick={() => deletarNota(r.slug)} title="Deletar nota"
                    style={{
                      background: "none", border: "none", cursor: "pointer", padding: "0.25rem",
                      fontSize: "0.875rem", lineHeight: 1, color: "var(--text-secondary)",
                      transition: "color 0.15s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#ef4444"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-secondary)"; }}
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </main>
  );
}
