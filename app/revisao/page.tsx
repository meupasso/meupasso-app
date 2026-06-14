"use client";

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const supabase = createClient();

const linguagens = [
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "javascript", label: "JavaScript" },
];

export default function RevisaoPage() {
  const router = useRouter();
  const [isPro, setIsPro] = useState<boolean | null>(null);
  const [linguagem, setLinguagem] = useState("python");
  const [codigo, setCodigo] = useState("");
  const [contexto, setContexto] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [resultado, setResultado] = useState("");
  const [erro, setErro] = useState("");
  const [usadas, setUsadas] = useState(0);
  const [limite] = useState(10);
  const [carregandoContador, setCarregandoContador] = useState(true);

  useEffect(() => {
    async function checkPro() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsPro(false);
        return;
      }
      const { data: perfil } = await supabase
        .from("perfis")
        .select("plano")
        .eq("id", user.id)
        .single();
      setIsPro(perfil?.plano?.toLowerCase() === "pro");
    }
    checkPro();
  }, []);

  useEffect(() => {
    async function carregarContador() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setCarregandoContador(false); return; }
      const inicioMes = new Date();
      inicioMes.setDate(1);
      inicioMes.setHours(0, 0, 0, 0);
      const { count } = await supabase
        .from("conversas")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
        .is("exercicio_id", null)
        .gte("created_at", inicioMes.toISOString());
      setUsadas(count ?? 0);
      setCarregandoContador(false);
    }
    carregarContador();
  }, []);

  async function revisar() {
    if (!codigo.trim()) return;
    setCarregando(true);
    setErro("");
    setResultado("");

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setErro("Faça login para usar a revisão de código.");
      setCarregando(false);
      return;
    }

    try {
      const res = await fetch("/api/revisao", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.id}`,
        },
        body: JSON.stringify({ codigo, linguagem, contexto }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 403) {
          if (data.limite) {
            setUsadas(data.usadas || limite);
          } else {
            setIsPro(false);
          }
        }
        setErro(data.erro || "Erro ao processar revisão.");
      } else {
        setResultado(data.content);
        if (data.usadas !== undefined) setUsadas(data.usadas);
      }
    } catch {
      setErro("Erro de conexão. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  }

  if (isPro === null) {
    return (
      <main style={{ padding: "2rem", maxWidth: "720px", margin: "0 auto", textAlign: "center", paddingTop: "4rem" }}>
        <p style={{ color: "var(--text-secondary)" }}>Verificando acesso...</p>
      </main>
    );
  }

  if (!isPro) {
    return (
      <main style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto", marginTop: "10vh", textAlign: "center" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
          🔍 Revisão de Código
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", marginBottom: "2rem" }}>
          Receba feedback detalhado de um desenvolvedor sênior sobre seu código.
        </p>

        <div style={{
          border: "1px solid var(--border)",
          borderRadius: "0.75rem",
          padding: "2rem",
          background: "var(--bg-card)",
        }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔒</div>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
            Exclusivo do plano Pro
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: "1.5rem", lineHeight: 1.5 }}>
            A revisão de código com IA é um recurso para assinantes Pro.
            Assine agora e tenha acesso a feedback completo sobre seus códigos.
          </p>
          <button
            onClick={() => router.push("/assinatura")}
            style={{
              padding: "0.75rem 2rem",
              background: "var(--accent)",
              color: "#fff",
              border: "none",
              borderRadius: "0.5rem",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Assinar Pro por R$27,90/mês
          </button>
        </div>
      </main>
    );
  }

  const linhas = codigo.split("\n").length;

  return (
    <main style={{ padding: "2rem", maxWidth: "720px", margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.25rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>
          🔍 Revisão de Código
        </h1>
        <span style={{
          fontSize: "0.65rem", fontWeight: 600, padding: "0.125rem 0.5rem",
          borderRadius: "0.25rem", background: "var(--accent)", color: "#fff",
        }}>
          Pro
        </span>
      </div>
      <p style={{ color: "var(--text-secondary)", fontSize: "1rem", marginBottom: "1rem" }}>
        Cole seu código e receba feedback detalhado de um desenvolvedor sênior.
      </p>

      <div style={{
        background: "var(--bg-card)", border: "1px solid var(--border)",
        borderRadius: "0.5rem", padding: "0.75rem 1rem", marginBottom: "1.5rem",
        display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.875rem",
      }}>
        <span style={{ color: "var(--accent)", fontWeight: 600 }}>
          {carregandoContador ? "..." : `${limite - usadas}`}
        </span>
        <span style={{ color: "var(--text-secondary)" }}>
          de {limite} revisões disponíveis este mês
        </span>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.375rem" }}>
          Linguagem
        </label>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {linguagens.map((l) => (
            <button
              key={l.value}
              onClick={() => setLinguagem(l.value)}
              style={{
                padding: "0.375rem 1rem",
                borderRadius: "9999px",
                fontSize: "0.875rem",
                fontWeight: 500,
                border: "1px solid",
                cursor: "pointer",
                backgroundColor: linguagem === l.value ? "var(--accent)" : "transparent",
                color: linguagem === l.value ? "#fff" : "var(--text-secondary)",
                borderColor: linguagem === l.value ? "var(--accent)" : "var(--border)",
              }}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.375rem" }}>
          Código {linhas > 200 && <span style={{ color: "#ef4444" }}>({linhas}/200 linhas — muito longo!)</span>}
        </label>
        <textarea
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          placeholder="Cole seu código aqui..."
          rows={12}
          style={{
            width: "100%",
            padding: "1rem",
            background: "var(--code-bg)",
            color: "var(--text-primary)",
            border: "1px solid var(--border)",
            borderRadius: "0.5rem",
            fontSize: "0.875rem",
            fontFamily: "'SF Mono', 'Fira Code', 'Fira Mono', Menlo, Consolas, monospace",
            lineHeight: 1.5,
            resize: "vertical",
            outline: "none",
            minHeight: "300px",
          }}
        />
        <div style={{ textAlign: "right", fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
          {linhas} linha(s)
        </div>
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.375rem" }}>
          Contexto (opcional)
        </label>
        <textarea
          value={contexto}
          onChange={(e) => setContexto(e.target.value)}
          placeholder="Descreva brevemente o que seu código faz (opcional)..."
          rows={2}
          style={{
            width: "100%",
            padding: "0.75rem 1rem",
            background: "var(--bg-card)",
            color: "var(--text-primary)",
            border: "1px solid var(--border)",
            borderRadius: "0.5rem",
            fontSize: "0.875rem",
            resize: "none",
            outline: "none",
            fontFamily: "inherit",
          }}
        />
      </div>

      <button
        onClick={revisar}
        disabled={carregando || !codigo.trim() || linhas > 200}
        style={{
          width: "100%",
          padding: "0.875rem",
          backgroundColor: carregando || !codigo.trim() || linhas > 200 ? "var(--text-secondary)" : "var(--accent)",
          color: "#fff",
          border: "none",
          borderRadius: "0.5rem",
          fontSize: "1rem",
          fontWeight: 600,
          cursor: carregando || !codigo.trim() || linhas > 200 ? "not-allowed" : "pointer",
          marginBottom: "2rem",
        }}
      >
        {carregando ? "Revisando..." : "Revisar Código →"}
      </button>

      {erro && (
        <div style={{
          padding: "1rem",
          background: "#7f1d1d",
          color: "#fee2e2",
          borderRadius: "0.5rem",
          fontSize: "0.875rem",
          marginBottom: "1rem",
        }}>
          {erro}
        </div>
      )}

      {resultado && (
        <div style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "0.75rem",
          padding: "1.5rem",
          lineHeight: 1.7,
          fontSize: "0.9375rem",
        }}>
          <ReactMarkdown
            components={{
              pre: ({ children }) => (
                <pre style={{
                  backgroundColor: "var(--code-bg)",
                  padding: "0.75rem",
                  borderRadius: "0.375rem",
                  overflowX: "auto",
                  fontSize: "0.8rem",
                  marginTop: "0.5rem",
                  marginBottom: "0.5rem",
                }}>
                  {children}
                </pre>
              ),
              code: ({ children }) => (
                <code style={{
                  fontFamily: "monospace",
                  fontSize: "0.8rem",
                  color: "var(--text-primary)",
                }}>
                  {children}
                </code>
              ),
            }}
          >
            {resultado}
          </ReactMarkdown>
        </div>
      )}
    </main>
  );
}
