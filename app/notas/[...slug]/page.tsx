"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";
import { createClient } from "@/lib/supabase/client";

const CodeEditor = dynamic(() => import("@/components/CodeEditor"), { ssr: false });

const supabase = createClient();
const DEBOUNCE_MS = 5000;
const MAX_CHARS = 200000;

type Status = "pronto" | "salvando" | "erro";

export default function NotaPage() {
  const params = useParams();
  const router = useRouter();
  const slugArray = Array.isArray(params.slug) ? params.slug : [params.slug];
  const slugAtual = slugArray.join("/");

  const [conteudo, setConteudo] = useState("");
  const [status, setStatus] = useState<Status>("pronto");
  const [carregando, setCarregando] = useState(true);
  const [notaId, setNotaId] = useState<string | null>(null);
  const [filhos, setFilhos] = useState<string[]>([]);
  const [novoNome, setNovoNome] = useState("");
  const [fontSize, setFontSize] = useState(1);
  const [modoPreview, setModoPreview] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Carregar/criar nota + buscar filhos
  useEffect(() => {
    async function init() {
      // Buscar nota atual
      const { data: existente } = await supabase
        .from("notas")
        .select("id, conteudo, usuario_id")
        .eq("slug", slugAtual)
        .single();

      if (existente) {
        setNotaId(existente.id);
        setConteudo(existente.conteudo || "");

        // Se a nota não tem usuario_id, associar ao usuário atual
        if (!existente.usuario_id) {
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            await supabase.from("notas").update({ usuario_id: user.id }).eq("id", existente.id);
          }
        }

        await supabase
          .from("notas")
          .update({ last_accessed_at: new Date().toISOString() })
          .eq("id", existente.id);
      } else {
        const { data: { user } } = await supabase.auth.getUser();
        const { data: nova } = await supabase
          .from("notas")
          .insert({ slug: slugAtual, conteudo: "", usuario_id: user?.id || null })
          .select("id")
          .single();
        if (nova) setNotaId(nova.id);
      }

      // Buscar filhos diretos
      const prefixo = slugAtual + "/";
      const { data: todas } = await supabase
        .from("notas")
        .select("slug")
        .like("slug", `${slugAtual}/%`)
        .order("slug");

      if (todas) {
        const diretos = todas
          .filter((n) => {
            const resto = n.slug.slice(prefixo.length);
            return !resto.includes("/");
          })
          .map((n) => n.slug.split("/").pop() || "");
        setFilhos(diretos);
      }

      setCarregando(false);
    }
    init();
  }, [slugAtual]);

  // Auto-save
  const salvar = useCallback(
    async (texto: string) => {
      if (!notaId) return;
      setStatus("salvando");
      const { error } = await supabase
        .from("notas")
        .update({ conteudo: texto, last_accessed_at: new Date().toISOString() })
        .eq("id", notaId);
      setStatus(error ? "erro" : "pronto");
    },
    [notaId]
  );

  function onChange(valor: string) {
    if (valor.length > MAX_CHARS) return;
    setConteudo(valor);
    if (timerRef.current) clearTimeout(timerRef.current);
    setStatus("salvando");
    timerRef.current = setTimeout(() => salvar(valor), DEBOUNCE_MS);
  }

  // Criar subpágina
  function criarSub(nome: string) {
    if (!nome.trim()) return;
    router.push(`/notas/${slugAtual}/${nome.trim().toLowerCase().replace(/\s+/g, "-")}`);
  }

  // Pai
  const paiSlug = slugArray.length > 1 ? slugArray.slice(0, -1).join("/") : null;
  const paiNome = paiSlug ? slugArray[slugArray.length - 2] : null;

  if (carregando) {
    return (
      <main style={{ padding: "2rem", display: "flex", justifyContent: "center", height: "100vh", alignItems: "center", background: "var(--bg-primary)", color: "var(--text-secondary)" }}>
        Carregando...
      </main>
    );
  }

  const temSidebar = paiSlug || filhos.length > 0;

  return (
    <div style={{ display: "flex", height: "100vh", background: "var(--bg-primary)" }}>
      {/* Sidebar hierárquica */}
      {temSidebar && (
        <aside style={{
          width: "220px", flexShrink: 0, borderRight: "1px solid var(--border)",
          background: "var(--bg-secondary)", display: "flex", flexDirection: "column",
          overflow: "hidden",
        }}>
          <div style={{ padding: "1rem", borderBottom: "1px solid var(--border)" }}>
            <Link href="/notas" style={{ color: "var(--accent)", fontSize: "0.8125rem", fontWeight: 500, textDecoration: "none" }}>
              ← Notas
            </Link>
            {paiSlug && (
              <Link href={`/notas/${encodeURIComponent(paiSlug)}`}
                style={{ display: "block", marginTop: "0.5rem", color: "var(--text-secondary)", fontSize: "0.8125rem", textDecoration: "none" }}>
                ← {paiNome}
              </Link>
            )}
          </div>

          {filhos.length > 0 && (
            <div style={{ flex: 1, overflowY: "auto", padding: "0.5rem 0" }}>
              <p style={{ fontSize: "0.65rem", fontWeight: 600, color: "var(--text-secondary)", padding: "0 1rem", marginBottom: "0.25rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Subpáginas
              </p>
              {filhos.map((f) => (
                <Link key={f} href={`/notas/${slugAtual}/${encodeURIComponent(f)}`}
                  style={{
                    display: "block", padding: "0.375rem 1rem", fontSize: "0.8125rem",
                    color: "var(--text-secondary)", textDecoration: "none",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bg-card)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                >
                  📄 {f}
                </Link>
              ))}
            </div>
          )}

          {/* Criar subpágina */}
          <div style={{ padding: "0.75rem 1rem", borderTop: "1px solid var(--border)", display: "flex", gap: "0.375rem" }}>
            <input value={novoNome} onChange={(e) => setNovoNome(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { criarSub(novoNome); setNovoNome(""); } }}
              placeholder="+ nova página" style={{
                flex: 1, padding: "0.25rem 0.5rem", background: "var(--code-bg)", color: "var(--text-primary)",
                border: "1px solid var(--border)", borderRadius: "0.25rem", fontSize: "0.75rem", outline: "none",
              }} />
            <button onClick={() => { criarSub(novoNome); setNovoNome(""); }}
              style={{
                padding: "0.25rem 0.5rem", background: "var(--accent)", color: "#fff",
                border: "none", borderRadius: "0.25rem", fontSize: "0.75rem", cursor: "pointer",
              }}>
              +
            </button>
          </div>
        </aside>
      )}

      {/* Conteúdo principal */}
      <div className="notas-content" style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Toolbar */}
        <div style={{
          padding: "0.5rem 1rem", borderBottom: "1px solid var(--border)",
          background: "var(--bg-secondary)", fontSize: "0.8125rem", display: "flex",
          alignItems: "center", gap: "0.5rem", flexWrap: "wrap",
        }}>
          <Link href="/notas" style={{ color: "var(--accent)", textDecoration: "none", whiteSpace: "nowrap" }}>Notas</Link>
          {slugArray.map((segmento, i) => {
            const caminho = slugArray.slice(0, i + 1).join("/");
            const isLast = i === slugArray.length - 1;
            return (
              <span key={caminho} style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                <span style={{ color: "var(--text-secondary)", opacity: 0.4 }}>/</span>
                {isLast ? (
                  <span style={{ color: "var(--text-primary)" }}>{decodeURIComponent(segmento)}</span>
                ) : (
                  <Link href={`/notas/${encodeURIComponent(caminho)}`} style={{ color: "var(--text-secondary)", textDecoration: "none" }}>
                    {decodeURIComponent(segmento)}
                  </Link>
                )}
              </span>
            );
          })}

          <span style={{ flex: 1 }} />

          {/* Controles de fonte */}
          <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
            <button onClick={() => setFontSize((s) => Math.max(0.75, s - 0.125))} title="Diminuir fonte"
              style={{ background: "none", border: "1px solid var(--border)", borderRadius: "0.25rem", cursor: "pointer", padding: "0.125rem 0.375rem", fontSize: "0.7rem", color: "var(--text-secondary)", lineHeight: 1 }}>
              A−
            </button>
            <span style={{ fontSize: "0.65rem", color: "var(--text-secondary)", minWidth: "2rem", textAlign: "center" }}>
              {Math.round(fontSize * 100)}%
            </span>
            <button onClick={() => setFontSize((s) => Math.min(3.5, s + 0.125))} title="Aumentar fonte"
              style={{ background: "none", border: "1px solid var(--border)", borderRadius: "0.25rem", cursor: "pointer", padding: "0.125rem 0.375rem", fontSize: "0.7rem", color: "var(--text-secondary)", lineHeight: 1 }}>
              A+
            </button>
          </span>

          {/* Preview toggle */}
          <button onClick={() => setModoPreview((p) => !p)}
            style={{
              padding: "0.25rem 0.5rem", fontSize: "0.7rem", fontWeight: 600, whiteSpace: "nowrap",
              background: modoPreview ? "var(--accent)" : "transparent",
              color: modoPreview ? "#fff" : "var(--text-secondary)",
              border: "1px solid", borderColor: modoPreview ? "var(--accent)" : "var(--border)",
              borderRadius: "0.25rem", cursor: "pointer",
            }}>
            {modoPreview ? "Editar" : "Preview"}
          </button>

          <span style={{ fontSize: "0.7rem", color: status === "erro" ? "#ef4444" : status === "salvando" ? "var(--text-secondary)" : "#22c55e" }}>
            {status === "salvando" ? "Salvando..." : status === "erro" ? "Erro ao salvar" : "Salvo"}
          </span>
        </div>

        {/* Editor ou Preview */}
        {modoPreview ? (
          <div className="notas-preview" style={{
            flex: 1, overflow: "auto", padding: "1.5rem 2rem",
            background: "var(--bg-primary)", color: "var(--text-primary)",
            fontSize: `${fontSize}rem`, lineHeight: 1.7,
          }}>
            {conteudo.trim() ? (
              <ReactMarkdown
                components={{
                  pre: ({ children }) => (
                    <pre style={{
                      backgroundColor: "var(--code-bg)", padding: "0.75rem",
                      borderRadius: "0.375rem", overflowX: "auto", fontSize: "0.85em",
                      margin: "0.5rem 0",
                    }}>{children}</pre>
                  ),
                  code: ({ children }) => (
                    <code style={{ fontFamily: "'SF Mono', 'Fira Code', monospace", fontSize: "0.85em" }}>
                      {children}
                    </code>
                  ),
                  a: ({ children, href }) => (
                    <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)" }}>
                      {children}
                    </a>
                  ),
                }}
              >
                {conteudo}
              </ReactMarkdown>
            ) : (
              <p style={{ color: "var(--text-secondary)", fontStyle: "italic" }}>Nota vazia. Alterne para "Editar" e escreva.</p>
            )}
          </div>
        ) : (
          <CodeEditor value={conteudo} onChange={onChange} fontSize={fontSize} />
        )}

        {/* Contador — só no modo edição */}
        {!modoPreview && (
          <div style={{
            padding: "0.25rem 1.5rem", borderTop: "1px solid var(--border)",
            fontSize: "0.75rem", color: conteudo.length >= MAX_CHARS ? "#ef4444" : "var(--text-secondary)",
            textAlign: "right", background: "var(--bg-secondary)",
          }}>
            {conteudo.length.toLocaleString()} / {MAX_CHARS.toLocaleString()} caracteres
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 1023px) {
          .notas-content {
            padding-left: 3rem !important;
          }
        }
        .notas-preview h1 { font-size: 2rem; font-weight: 700; margin: 1.5rem 0 0.75rem; }
        .notas-preview h2 { font-size: 1.5rem; font-weight: 600; margin: 1.25rem 0 0.5rem; }
        .notas-preview h3 { font-size: 1.25rem; font-weight: 600; margin: 1rem 0 0.5rem; }
        .notas-preview p { margin-bottom: 0.75rem; }
        .notas-preview ul, .notas-preview ol { padding-left: 1.5rem; margin-bottom: 0.75rem; }
        .notas-preview li { margin-bottom: 0.25rem; }
        .notas-preview blockquote {
          border-left: 3px solid var(--accent); padding-left: 1rem;
          color: var(--text-secondary); margin: 0.75rem 0;
        }
        .notas-preview hr { border: none; border-top: 1px solid var(--border); margin: 1.5rem 0; }
      `}</style>
    </div>
  );
}
