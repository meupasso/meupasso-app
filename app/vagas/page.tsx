"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Vaga = {
  id: string;
  titulo: string;
  empresa: string | null;
  cidade: string | null;
  remoto: boolean;
  tipo: string | null;
  tecnologias: string[];
  descricao: string | null;
  url: string;
  publicada_em: string | null;
};

type Resposta = {
  vagas: Vaga[];
  total: number;
  paginas: number;
};

function formatarData(data: string | null): string {
  if (!data) return "";
  const d = new Date(data + "T12:00:00");
  const agora = new Date();
  const diffMs = agora.getTime() - d.getTime();
  const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDias === 0) return "hoje";
  if (diffDias === 1) return "há 1 dia";
  if (diffDias < 7) return `há ${diffDias} dias`;
  if (diffDias < 30) return `há ${Math.floor(diffDias / 7)} semanas`;
  return d.toLocaleDateString("pt-BR");
}

function badgeTipo(tipo: string | null): { label: string; cor: string } {
  const map: Record<string, { label: string; cor: string }> = {
    junior: { label: "Júnior", cor: "#22c55e" },
    estagio: { label: "Estágio", cor: "#3b82f6" },
    trainee: { label: "Trainee", cor: "#a855f7" },
    pleno: { label: "Pleno", cor: "#f59e0b" },
  };
  return map[tipo || ""] || { label: tipo || "Geral", cor: "#6b7280" };
}

export default function VagasPage() {
  const [vagas, setVagas] = useState<Vaga[]>([]);
  const [total, setTotal] = useState(0);
  const [paginas, setPaginas] = useState(0);
  const [pagina, setPagina] = useState(1);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const [filtroTech, setFiltroTech] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");
  const [filtroRemoto, setFiltroRemoto] = useState(false);

  useEffect(() => {
    setCarregando(true);
    setErro("");
    const params = new URLSearchParams();
    params.set("pagina", String(pagina));
    if (filtroTech) params.set("tecnologia", filtroTech);
    if (filtroTipo) params.set("tipo", filtroTipo);
    if (filtroRemoto) params.set("remoto", "true");

    fetch(`/api/vagas?${params.toString()}`)
      .then((r) => r.json())
      .then((data: Resposta) => {
        setVagas(data.vagas);
        setTotal(data.total);
        setPaginas(data.paginas);
      })
      .catch(() => setErro("Erro ao carregar vagas"))
      .finally(() => setCarregando(false));
  }, [pagina, filtroTech, filtroTipo, filtroRemoto]);

  const TECHS = ["Python", "JavaScript", "Java", "React", "Node.js", "TypeScript", "PHP"];

  return (
    <main style={{ padding: "2rem", maxWidth: "960px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2.5rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.25rem" }}>
        Vagas para Iniciantes em TI
      </h1>
      <p style={{ color: "var(--text-secondary)", fontSize: "1.125rem", marginBottom: "2rem" }}>
        {total > 0
          ? `${total} oportunidade${total !== 1 ? "s" : ""} encontrada${total !== 1 ? "s" : ""}`
          : "Oportunidades de Python, JavaScript e Java para quem está começando"}
      </p>

      {/* Filtros */}
      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "2rem", alignItems: "center" }}>
        <select
          value={filtroTech}
          onChange={(e) => { setFiltroTech(e.target.value); setPagina(1); }}
          style={{
            padding: "0.5rem 0.75rem", borderRadius: "0.5rem", border: "1px solid var(--border)",
            background: "var(--bg-card)", color: "var(--text-primary)", fontSize: "0.875rem",
          }}
        >
          <option value="">Todas as linguagens</option>
          {TECHS.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>

        <select
          value={filtroTipo}
          onChange={(e) => { setFiltroTipo(e.target.value); setPagina(1); }}
          style={{
            padding: "0.5rem 0.75rem", borderRadius: "0.5rem", border: "1px solid var(--border)",
            background: "var(--bg-card)", color: "var(--text-primary)", fontSize: "0.875rem",
          }}
        >
          <option value="">Todos os níveis</option>
          <option value="junior">Júnior</option>
          <option value="estagio">Estágio</option>
          <option value="trainee">Trainee</option>
        </select>

        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "var(--text-secondary)", cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={filtroRemoto}
            onChange={(e) => { setFiltroRemoto(e.target.checked); setPagina(1); }}
            style={{ accentColor: "var(--accent)" }}
          />
          Só remotas
        </label>
      </div>

      {/* Grid */}
      {carregando ? (
        <p style={{ color: "var(--text-secondary)", textAlign: "center", padding: "3rem" }}>Carregando...</p>
      ) : erro ? (
        <p style={{ color: "#ef4444", textAlign: "center", padding: "3rem" }}>{erro}</p>
      ) : vagas.length === 0 ? (
        <div style={{ textAlign: "center", padding: "3rem", color: "var(--text-secondary)" }}>
          <p style={{ fontSize: "1.125rem", marginBottom: "0.5rem" }}>Nenhuma vaga encontrada.</p>
          <p>Tente alterar os filtros.</p>
        </div>
      ) : (
        <>
          <div
            style={{
              display: "grid",
              gap: "1rem",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            }}
          >
            {vagas.map((vaga) => {
              const badge = badgeTipo(vaga.tipo);
              return (
                <a
                  key={vaga.id}
                  href={vaga.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vaga-card"
                  style={{
                    textDecoration: "none",
                    borderRadius: "0.75rem",
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    padding: "1.25rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                    transition: "border-color 0.15s, transform 0.15s",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.3, flex: 1 }}>
                      {vaga.titulo}
                    </h2>
                    <span style={{
                      fontSize: "0.65rem", fontWeight: 600, padding: "0.125rem 0.5rem",
                      borderRadius: "0.25rem", background: badge.cor, color: "#fff",
                      whiteSpace: "nowrap", marginLeft: "0.5rem",
                    }}>
                      {badge.label}
                    </span>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", fontSize: "0.8125rem", color: "var(--text-secondary)" }}>
                    <span>🏢 {vaga.empresa || "Empresa"}</span>
                    {vaga.remoto ? (
                      <span>🏠 Remoto</span>
                    ) : (
                      <span>📍 {vaga.cidade || "Brasil"}</span>
                    )}
                  </div>

                  {vaga.tecnologias && vaga.tecnologias.length > 0 && (
                    <div style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap" }}>
                      {vaga.tecnologias.map((tech) => (
                        <span key={tech} style={{
                          fontSize: "0.65rem", fontWeight: 600, padding: "0.125rem 0.5rem",
                          borderRadius: "0.25rem", background: "var(--accent)", color: "#fff", opacity: 0.85,
                        }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: "0.5rem", borderTop: "1px solid var(--border)" }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", opacity: 0.6 }}>
                      {formatarData(vaga.publicada_em)}
                    </span>
                    <span style={{ fontSize: "0.8125rem", color: "var(--accent)", fontWeight: 500 }}>
                      Ver vaga →
                    </span>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Paginação */}
          {paginas > 1 && (
            <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "2rem" }}>
              {Array.from({ length: paginas }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPagina(p)}
                  style={{
                    padding: "0.375rem 0.75rem", borderRadius: "0.375rem", border: "1px solid var(--border)",
                    background: p === pagina ? "var(--accent)" : "var(--bg-card)",
                    color: p === pagina ? "#fff" : "var(--text-primary)",
                    cursor: "pointer", fontSize: "0.875rem", fontWeight: p === pagina ? 600 : 400,
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </>
      )}

      <style>{`
        .vaga-card:hover {
          border-color: var(--accent) !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
      `}</style>
    </main>
  );
}
