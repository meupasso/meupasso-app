"use client";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)", padding: "2rem 1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", maxWidth: 500, background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "0.75rem", padding: "2rem" }}>
        <span style={{ fontSize: 48 }}>⚠️</span>
        <h2 style={{ color: "var(--text-primary)", margin: "16px 0 8px" }}>Erro ao carregar</h2>
        <p style={{ color: "var(--text-secondary)", fontSize: 13, wordBreak: "break-word", marginBottom: 8, lineHeight: 1.5 }}>
          {error.message}
        </p>
        {error.digest && (
          <p style={{ color: "var(--text-secondary)", fontSize: 11, fontFamily: "monospace", marginBottom: 16 }}>
            ID: {error.digest}
          </p>
        )}
        <button onClick={reset} style={{ padding: "0.5rem 1.5rem", background: "var(--accent)", color: "#fff", border: "none", borderRadius: "0.375rem", fontWeight: 600, cursor: "pointer", fontSize: "0.875rem" }}>
          Tentar novamente
        </button>
      </div>
    </div>
  );
}
