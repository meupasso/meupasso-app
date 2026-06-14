"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

const linguagens = ["Todos", "Python", "Java", "JavaScript"];
const modulos = ["Todos", "Variáveis", "Condicionais", "Repetição", "Listas", "Funções", "POO", "Objetos", "Módulos e Erros"];
const niveis = ["Todos", "basico", "intermediario", "avancado"];

export default function GeradorPage() {
  const router = useRouter();
  const [linguagem, setLinguagem] = useState("Todos");
  const [modulo, setModulo] = useState("Todos");
  const [nivel, setNivel] = useState("Todos");
  const [sorteando, setSorteando] = useState(false);
  const [semResultados, setSemResultados] = useState(false);

  async function sortear() {
    setSorteando(true);
    setSemResultados(false);

    let query = supabase.from("exercicios").select("id, linguagem");

    if (linguagem !== "Todos") {
      query = query.eq("linguagem", linguagem);
    }
    if (modulo !== "Todos") {
      query = query.eq("modulo", modulo);
    }
    if (nivel !== "Todos") {
      query = query.eq("nivel", nivel);
    }

    const { data, error } = await query;

    if (error || !data || data.length === 0) {
      setSemResultados(true);
      setSorteando(false);
      return;
    }

    const sorteado = data[Math.floor(Math.random() * data.length)];
    const langSlug = sorteado.linguagem?.toLowerCase() || "python";
    router.push(`/exercicios/${langSlug}/${sorteado.id}`);
  }

  function FiltroGrupo({
    label,
    opcoes,
    valor,
    onChange,
  }: {
    label: string;
    opcoes: string[];
    valor: string;
    onChange: (v: string) => void;
  }) {
    return (
      <div
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "0.75rem",
          padding: "1.25rem",
        }}
      >
        <p
          style={{
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "var(--text-secondary)",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            marginBottom: "0.75rem",
          }}
        >
          {label}
        </p>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {opcoes.map((op) => (
            <button
              key={op}
              onClick={() => onChange(op)}
              style={{
                padding: "0.375rem 1rem",
                borderRadius: "9999px",
                fontSize: "0.875rem",
                fontWeight: 500,
                border: "1px solid",
                cursor: "pointer",
                backgroundColor:
                  valor === op ? "var(--accent)" : "transparent",
                color: valor === op ? "#ffffff" : "var(--text-secondary)",
                borderColor:
                  valor === op ? "var(--accent)" : "var(--border)",
                transition: "all 0.15s",
              }}
            >
              {op === "basico"
                ? "Básico"
                : op === "intermediario"
                  ? "Intermediário"
                  : op === "avancado"
                    ? "Avançado"
                    : op}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <main
      style={{
        padding: "2rem",
        maxWidth: "36rem",
        margin: "0 auto",
        marginTop: "5vh",
      }}
    >
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: 700,
          color: "var(--text-primary)",
          marginBottom: "0.5rem",
        }}
      >
        🎲 Gerador de Exercícios
      </h1>
      <p
        style={{
          color: "var(--text-secondary)",
          fontSize: "1.05rem",
          marginBottom: "2rem",
          lineHeight: 1.5,
        }}
      >
        Escolha os filtros e sorteie um exercício aleatório.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
        <FiltroGrupo
          label="Linguagem"
          opcoes={linguagens}
          valor={linguagem}
          onChange={setLinguagem}
        />
        <FiltroGrupo
          label="Módulo"
          opcoes={modulos}
          valor={modulo}
          onChange={setModulo}
        />
        <FiltroGrupo
          label="Nível"
          opcoes={niveis}
          valor={nivel}
          onChange={setNivel}
        />
      </div>

      <button
        onClick={sortear}
        disabled={sorteando}
        style={{
          width: "100%",
          padding: "1rem",
          backgroundColor: "var(--accent)",
          color: "#ffffff",
          border: "none",
          borderRadius: "0.75rem",
          fontSize: "1.125rem",
          fontWeight: 700,
          cursor: sorteando ? "not-allowed" : "pointer",
          opacity: sorteando ? 0.7 : 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.75rem",
          transition: "opacity 0.2s",
        }}
      >
        {sorteando ? (
          <>
            <span
              style={{
                display: "inline-block",
                width: "1.25rem",
                height: "1.25rem",
                border: "2px solid rgba(255,255,255,0.3)",
                borderTopColor: "#fff",
                borderRadius: "50%",
                animation: "spin 0.6s linear infinite",
              }}
            />
            Sorteando...
          </>
        ) : (
          "Sortear exercício 🎲"
        )}
      </button>

      {semResultados && (
        <p
          style={{
            textAlign: "center",
            marginTop: "1.5rem",
            color: "var(--text-secondary)",
            fontSize: "0.9375rem",
          }}
        >
          Nenhum exercício encontrado com esses filtros.
        </p>
      )}

      {/* AD */}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
}
