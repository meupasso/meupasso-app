"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

const perfis = [
  { key: "iniciante", label: "🌱 Sou iniciante absoluto", desc: "Nunca programei antes" },
  { key: "intermediario", label: "📈 Já programei um pouco", desc: "Conheço o básico" },
  { key: "objetivo", label: "🎯 Tenho um objetivo específico", desc: "Quero migrar de área ou aprender POO" },
];

type Trilha = { id: string; slug: string; titulo: string; descricao: string; linguagem: string; perfil: string; tempo_estimado: string };

export default function TrilhasPage() {
  const [trilhas, setTrilhas] = useState<Trilha[]>([]);
  const [perfilAtivo, setPerfilAtivo] = useState<string | null>(null);
  const [linguagem, setLinguagem] = useState("Python");

  useEffect(() => {
    supabase.from("trilhas").select("*").order("ordem").then(({ data }) => setTrilhas(data || []));
  }, []);

  const filtradas = trilhas.filter(t => {
    const matchPerfil = perfilAtivo ? t.perfil === perfilAtivo : true;
    const matchLang = t.linguagem === linguagem;
    return matchPerfil && matchLang;
  });

  return (
    <main style={{ padding: "2rem", maxWidth: "720px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
        🗺️ Trilha Guiada
      </h1>
      <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", marginBottom: "2rem" }}>
        Escolha seu perfil e receba uma sequência personalizada de estudos.
      </p>

      {/* Perfis */}
      <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
        Qual é seu nível?
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" }}>
        {perfis.map((p) => (
          <button
            key={p.key}
            onClick={() => setPerfilAtivo(perfilAtivo === p.key ? null : p.key)}
            style={{
              textAlign: "left",
              padding: "1rem 1.25rem",
              borderRadius: "0.75rem",
              border: `2px solid ${perfilAtivo === p.key ? "var(--accent)" : "var(--border)"}`,
              background: perfilAtivo === p.key ? "var(--bg-card)" : "transparent",
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            <strong style={{ display: "block", color: "var(--text-primary)", fontSize: "1rem", marginBottom: "0.25rem" }}>{p.label}</strong>
            <span style={{ color: "var(--text-secondary)", fontSize: "0.8125rem" }}>{p.desc}</span>
          </button>
        ))}
      </div>

      {/* Select linguagem */}
      <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
        Linguagem
      </p>
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem" }}>
        {["Python", "Java", "JavaScript"].map((l) => (
          <button key={l} onClick={() => { setLinguagem(l); setPerfilAtivo(null); }}
            style={{
              padding: "0.375rem 1rem", borderRadius: "9999px", fontSize: "0.875rem", fontWeight: 500,
              border: "1px solid", cursor: "pointer",
              backgroundColor: linguagem === l ? "var(--accent)" : "transparent",
              color: linguagem === l ? "#fff" : "var(--text-secondary)",
              borderColor: linguagem === l ? "var(--accent)" : "var(--border)",
            }}
          >{l}</button>
        ))}
      </div>

      {filtradas.length === 0 && (
        <p style={{ color: "var(--text-secondary)", textAlign: "center", padding: "3rem" }}>
          {perfilAtivo ? "Nenhuma trilha encontrada para esse perfil." : "Selecione um perfil acima para ver as trilhas disponíveis."}
        </p>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {filtradas.map((tri) => (
          <Link key={tri.slug} href={`/trilhas/${tri.slug}`}
            style={{ textDecoration: "none", border: "1px solid var(--border)", borderRadius: "0.75rem", padding: "1.25rem 1.5rem", background: "var(--bg-card)", display: "block", transition: "border-color 0.15s" }}
            className="trilha-card"
          >
            <h2 style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.375rem" }}>{tri.titulo}</h2>
            <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: "0.75rem" }}>{tri.descricao}</p>
            <span style={{ fontSize: "0.75rem", color: "var(--accent)" }}>⏱ {tri.tempo_estimado}</span>
          </Link>
        ))}
      </div>
      <style>{`.trilha-card:hover { border-color: var(--accent) !important; }`}</style>
    </main>
  );
}
