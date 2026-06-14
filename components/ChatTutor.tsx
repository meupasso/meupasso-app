"use client";

import { useState, useRef, useEffect } from "react";

type Mensagem = {
  role: "user" | "assistant";
  conteudo: string;
};

type Exercicio = {
  id: string;
  titulo: string;
  linguagem: string;
  modulo: string;
  nivel: string;
  descricao: string;
  objetivo: string;
  permitidos?: string[];
  proibidos?: string[];
  erros_comuns?: string[];
  exemplos?: string;
};

export default function ChatTutor({
  exercicio,
}: {
  exercicio: Exercicio;
}) {
  const [mensagens, setMensagens] = useState<Mensagem[]>([
    {
      role: "assistant",
      conteudo: `Olá! Vou te ajudar com o exercício **${exercicio.titulo}**. ${exercicio.objetivo}\n\nMe mostre sua tentativa ou me faça perguntas sobre o exercício.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensagens]);

  async function enviar() {
    if (!input.trim() || loading) return;

    const msgUser: Mensagem = { role: "user", conteudo: input };
    setMensagens((prev) => [...prev, msgUser]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...mensagens, msgUser],
          exercicio,
        }),
      });

      if (!res.ok) throw new Error("Erro na resposta");

      const data = await res.json();
      setMensagens((prev) => [
        ...prev,
        { role: "assistant", conteudo: data.content },
      ]);
    } catch {
      setMensagens((prev) => [
        ...prev,
        {
          role: "assistant",
          conteudo: "Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        background: "var(--bg-card)",
        borderRadius: "0.75rem",
        border: "1px solid var(--border)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "32rem",
      }}
    >
      <div
        style={{
          padding: "1rem 1.5rem",
          borderBottom: "1px solid var(--border)",
          fontWeight: 600,
          fontSize: "0.875rem",
          color: "var(--text-secondary)",
        }}
      >
        Tutor IA — {exercicio.titulo}
      </div>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {mensagens.map((msg, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
            }}
          >
            <div
              style={{
                maxWidth: "80%",
                padding: "0.75rem 1rem",
                borderRadius: "0.75rem",
                background: msg.role === "user" ? "var(--accent)" : "var(--code-bg)",
                color: msg.role === "user" ? "#fff" : "var(--text-primary)",
                border: msg.role === "assistant" ? "1px solid var(--border)" : "none",
                lineHeight: 1.6,
                whiteSpace: "pre-wrap",
                fontSize: "0.9375rem",
              }}
            >
              {msg.conteudo}
            </div>
          </div>
        ))}
        {loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <div
              style={{
                padding: "0.75rem 1rem",
                borderRadius: "0.75rem",
                background: "var(--code-bg)",
                border: "1px solid var(--border)",
                color: "var(--text-secondary)",
                fontSize: "0.9375rem",
              }}
            >
              Pensando...
            </div>
          </div>
        )}
        <div ref={ref} />
      </div>

      <div
        style={{
          padding: "1rem 1.5rem",
          borderTop: "1px solid var(--border)",
          display: "flex",
          gap: "0.75rem",
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && enviar()}
          placeholder="Digite sua dúvida ou código..."
          disabled={loading}
          style={{
            flex: 1,
            padding: "0.75rem 1rem",
            borderRadius: "0.5rem",
            border: "1px solid var(--border)",
            background: "var(--code-bg)",
            color: "var(--text-primary)",
            fontSize: "0.9375rem",
            outline: "none",
          }}
        />
        <button
          onClick={enviar}
          disabled={loading || !input.trim()}
          style={{
            padding: "0.75rem 1.5rem",
            borderRadius: "0.5rem",
            border: "none",
            background: loading || !input.trim()
              ? "var(--text-secondary)"
              : "var(--accent)",
            color: "#fff",
            fontWeight: 600,
            cursor: loading || !input.trim() ? "not-allowed" : "pointer",
            fontSize: "0.9375rem",
          }}
        >
          {loading ? "..." : "Enviar"}
        </button>
      </div>
    </div>
  );
}
