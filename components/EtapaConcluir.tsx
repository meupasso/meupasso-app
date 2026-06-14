"use client";

import { useState } from "react";

export default function EtapaConcluir({
  etapaId,
  linguagem,
  inicial,
}: {
  etapaId: string;
  linguagem: string;
  inicial: boolean;
}) {
  const [concluido, setConcluido] = useState(inicial);
  const [marcando, setMarcando] = useState(false);

  async function handleConcluir() {
    setMarcando(true);
    try {
      await fetch("/api/progresso", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipo: "etapa_projeto",
          referencia_id: etapaId,
          linguagem,
        }),
      });
      setConcluido(true);
    } catch {}
    setMarcando(false);
  }

  async function handleDesmarcar() {
    if (!window.confirm("Desmarcar esta etapa como concluída?")) return;
    setMarcando(true);
    try {
      await fetch("/api/progresso", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipo: "etapa_projeto",
          referencia_id: etapaId,
        }),
      });
      setConcluido(false);
    } catch {}
    setMarcando(false);
  }

  if (concluido) {
    return (
      <button
        onClick={handleDesmarcar}
        disabled={marcando}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.375rem",
          padding: "0.4rem 0.75rem",
          background: "#166534",
          color: "#dcfce7",
          border: "1px solid #22c55e",
          borderRadius: "0.375rem",
          fontSize: "0.8125rem",
          fontWeight: 600,
          cursor: marcando ? "not-allowed" : "pointer",
          opacity: marcando ? 0.6 : 1,
        }}
      >
        {marcando ? "Salvando..." : "✅ Concluída — clique para desmarcar"}
      </button>
    );
  }

  return (
    <button
      onClick={handleConcluir}
      disabled={marcando}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.375rem",
        padding: "0.4rem 0.75rem",
        background: "transparent",
        color: "#22c55e",
        border: "1px solid #22c55e",
        borderRadius: "0.375rem",
        fontSize: "0.8125rem",
        fontWeight: 600,
        cursor: marcando ? "not-allowed" : "pointer",
        opacity: marcando ? 0.6 : 1,
      }}
    >
      {marcando ? "Salvando..." : "✅ Marcar como concluída"}
    </button>
  );
}
