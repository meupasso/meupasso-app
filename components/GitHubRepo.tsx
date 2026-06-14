"use client";

import { useState, useEffect, useCallback } from "react";

type GitFile = { nome: string; conteudo: string };

const STORAGE_PREFIX = "github_repo_";

function parseGitUrl(url: string): { usuario: string; repo: string } | null {
  try {
    const u = new URL(url);
    if (u.hostname !== "github.com") return null;
    const parts = u.pathname.replace(/^\//, "").replace(/\/$/, "").split("/");
    if (parts.length < 2) return null;
    return { usuario: parts[0], repo: parts[1].replace(".git", "") };
  } catch {
    return null;
  }
}

export default function GitHubRepo({ projetoId, linguagem }: { projetoId: string; linguagem: string }) {
  const storageKey = STORAGE_PREFIX + projetoId;
  const [url, setUrl] = useState("");
  const [arquivos, setArquivos] = useState<GitFile[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [expandido, setExpandido] = useState<string | null>(null);

  // Restaurar do localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.url) setUrl(parsed.url);
        if (parsed.arquivos) setArquivos(parsed.arquivos);
        if (parsed.arquivos?.length > 0) setSucesso(`${parsed.arquivos.length} arquivo(s) carregado(s)`);
      }
    } catch {}
  }, [storageKey]);

  // Salvar no localStorage
  useEffect(() => {
    if (arquivos.length > 0 || url) {
      localStorage.setItem(storageKey, JSON.stringify({ url, arquivos }));
    }
  }, [url, arquivos, storageKey]);

  const buscarArquivos = useCallback(async () => {
    setErro("");
    setSucesso("");

    const parsed = parseGitUrl(url);
    if (!parsed) {
      setErro("URL inválida. Use o formato: https://github.com/usuario/repositorio");
      return;
    }

    setCarregando(true);
    try {
      // Buscar lista de arquivos do repositório
      const res = await fetch(`https://api.github.com/repos/${parsed.usuario}/${parsed.repo}/contents/`);
      if (res.status === 404) {
        setErro("Repositório não encontrado ou privado.");
        setCarregando(false);
        return;
      }
      if (res.status === 403) {
        setErro("Limite da API do GitHub atingido. Tente novamente em alguns minutos.");
        setCarregando(false);
        return;
      }
      if (!res.ok) {
        setErro(`Erro ao acessar GitHub: ${res.status}`);
        setCarregando(false);
        return;
      }

      const items = await res.json();
      if (!Array.isArray(items)) {
        setErro("URL inválida. Certifique-se de que é a raiz do repositório.");
        setCarregando(false);
        return;
      }

      // Filtrar arquivos .py e .java (apenas raiz)
      const extensoes = linguagem === "Python" ? [".py"] : linguagem === "Java" ? [".java"] : [".py", ".java"];
      const codeFiles = items.filter((i: any) => i.type === "file" && extensoes.some((ext) => i.name.endsWith(ext))).slice(0, 10);

      if (codeFiles.length === 0) {
        setErro(`Nenhum arquivo ${extensoes.join(" ou ")} encontrado na raiz do repositório.`);
        setCarregando(false);
        return;
      }

      // Buscar conteúdo de cada arquivo
      const resultados: GitFile[] = [];
      for (const file of codeFiles) {
        try {
          const contentRes = await fetch(file.url);
          if (contentRes.ok) {
            const contentData = await contentRes.json();
            if (contentData.content) {
              const decoded = atob(contentData.content.replace(/\n/g, ""));
              resultados.push({ nome: file.name, conteudo: decoded });
            }
          }
        } catch {}
      }

      setArquivos(resultados);
      setSucesso(`✅ ${resultados.length} arquivo(s) encontrado(s): ${resultados.map((f) => f.nome).join(", ")}`);
    } catch {
      setErro("Erro ao conectar com GitHub. Verifique a URL.");
    } finally {
      setCarregando(false);
    }
  }, [url, linguagem]);

  return (
    <div style={{ background: "var(--code-bg)", border: "1px solid var(--border)", borderRadius: "0.5rem", padding: "1rem", marginBottom: "2rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ color: "var(--text-secondary)" }}>
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
        <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--text-secondary)" }}>
          Repositório GitHub (opcional)
        </span>
      </div>

      <div style={{ display: "flex", gap: "0.5rem" }}>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://github.com/usuario/repositorio"
          disabled={carregando}
          onKeyDown={(e) => e.key === "Enter" && buscarArquivos()}
          style={{
            flex: 1,
            padding: "0.5rem 0.75rem",
            background: "var(--bg-primary)",
            color: "var(--text-primary)",
            border: "1px solid var(--border)",
            borderRadius: "0.375rem",
            fontSize: "0.8125rem",
            outline: "none",
          }}
        />
        <button
          onClick={buscarArquivos}
          disabled={carregando || !url.trim()}
          style={{
            padding: "0.5rem 1rem",
            background: !url.trim() ? "var(--text-secondary)" : "var(--accent)",
            color: "#fff",
            border: "none",
            borderRadius: "0.375rem",
            fontSize: "0.8125rem",
            fontWeight: 600,
            cursor: !url.trim() ? "not-allowed" : "pointer",
            whiteSpace: "nowrap",
          }}
        >
          {carregando ? "Buscando..." : "Carregar código →"}
        </button>
      </div>

      {!url.trim() && (
        <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "0.5rem" }}>
          Não tem GitHub?{" "}
          <a href="https://github.com/signup" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)", textDecoration: "none" }}>
            Crie sua conta gratuita →
          </a>
        </p>
      )}

      {erro && <p style={{ color: "#ef4444", fontSize: "0.8125rem", marginTop: "0.5rem" }}>{erro}</p>}
      {sucesso && <p style={{ color: "#22c55e", fontSize: "0.8125rem", marginTop: "0.5rem" }}>{sucesso}</p>}

      {/* Arquivos carregados */}
      {arquivos.length > 0 && (
        <div style={{ marginTop: "1rem" }}>
          {arquivos.map((f) => (
            <div key={f.nome} style={{ marginBottom: "0.5rem" }}>
              <button
                onClick={() => setExpandido(expandido === f.nome ? null : f.nome)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.5rem 0.75rem",
                  background: "var(--bg-primary)",
                  border: "1px solid var(--border)",
                  borderRadius: "0.375rem",
                  cursor: "pointer",
                  fontSize: "0.8125rem",
                  color: "var(--text-primary)",
                  textAlign: "left",
                }}
              >
                <span>📄</span>
                <span style={{ fontWeight: 600 }}>{f.nome}</span>
                <span style={{ marginLeft: "auto", color: "var(--text-secondary)", fontSize: "0.75rem" }}>
                  {f.conteudo.split("\n").length} linhas
                </span>
              </button>
              {expandido === f.nome && (
                <pre style={{
                  margin: 0,
                  marginTop: "0.25rem",
                  padding: "0.75rem",
                  background: "var(--bg-primary)",
                  border: "1px solid var(--border)",
                  borderRadius: "0.375rem",
                  fontSize: "0.75rem",
                  lineHeight: 1.5,
                  fontFamily: "'SF Mono','Fira Code',monospace",
                  overflowX: "auto",
                  maxHeight: "400px",
                  overflowY: "auto",
                  color: "var(--text-primary)",
                }}>
                  {f.conteudo}
                </pre>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
