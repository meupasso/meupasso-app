"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

const MODULOS_PYTHON = ["Sintaxe", "Condicionais", "Repetição", "Listas", "Funções", "Coleções", "Arquivos", "POO"];
const MODULOS_JAVA = ["Sintaxe", "Condicionais", "Repetição", "ArrayList", "POO"];
const MODULOS_JAVASCRIPT = ["Sintaxe", "Condicionais", "Repetição", "Arrays", "Funções", "Objetos", "POO", "Módulos e Erros"];

const CONTAGENS_PYTHON: Record<string, number> = {
  Sintaxe: 30, Condicionais: 30, Repetição: 30, Listas: 30,
  Funções: 30, Coleções: 30, Arquivos: 30, POO: 20,
};
const CONTAGENS_JAVA: Record<string, number> = {
  Sintaxe: 30, Condicionais: 30, Repetição: 30, ArrayList: 30, POO: 20,
};
const CONTAGENS_JAVASCRIPT: Record<string, number> = {
  Sintaxe: 30, Condicionais: 30, Repetição: 30, Arrays: 30,
  Funções: 30, Objetos: 30, POO: 30, "Módulos e Erros": 30,
};

const CORES_AVATAR = ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981", "#06b6d4", "#ef4444", "#84cc16"];

function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function corDoNome(nome: string): string {
  let hash = 0;
  for (let i = 0; i < nome.length; i++) hash = nome.charCodeAt(i) + ((hash << 5) - hash);
  return CORES_AVATAR[Math.abs(hash) % CORES_AVATAR.length];
}

function iniciais(nome: string): string {
  const partes = nome.trim().split(/\s+/);
  if (partes.length >= 2) return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
  return nome.trim().slice(0, 2).toUpperCase() || "?";
}

function BarraProgresso({ atual, total }: { atual: number; total: number }) {
  const pct = total > 0 ? Math.round((atual / total) * 100) : 0;
  return (
    <div style={{ marginBottom: "0.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8125rem", color: "var(--text-secondary)", marginBottom: "0.25rem" }}>
        <span>{atual}/{total}</span>
        <span>{pct}%</span>
      </div>
      <div style={{ height: "0.5rem", background: "var(--bg-primary)", borderRadius: "9999px", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: "var(--accent)", borderRadius: "9999px", transition: "width 0.3s ease" }} />
      </div>
    </div>
  );
}

export default function PerfilPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [carregando, setCarregando] = useState(true);
  const [progresso, setProgresso] = useState<any[]>([]);
  const [projetosEtapas, setProjetosEtapas] = useState<{ projeto_id: string; titulo: string; linguagem: string; total: number; concluidas: number }[]>([]);
  const [streakAtual, setStreakAtual] = useState(0);
  const [streakMaximo, setStreakMaximo] = useState(0);

  // Perfil
  const [perfil, setPerfil] = useState<{ nome: string; email: string; avatar_url: string | null; bio: string; github_url: string; linkedin_url: string; plano: string } | null>(null);
  const [editando, setEditando] = useState(false);
  const [editForm, setEditForm] = useState({ nome: "", bio: "", github_url: "", linkedin_url: "" });
  const [salvandoPerfil, setSalvandoPerfil] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push("/entrar?redirect=/perfil");
        return;
      }
      setUser(user);
      carregarDados();
    });
  }, []);

  async function carregarDados() {
    try {
      const [progRes, etapasRes, streakRes, perfilRes] = await Promise.all([
        fetch("/api/progresso"),
        fetch("/api/progresso?tipo=etapa_projeto"),
        fetch("/api/progresso?tipo=streak"),
        fetch("/api/perfil"),
      ]);

      const streakData = await streakRes.json();
      if (streakData.streak_atual > 0) setStreakAtual(streakData.streak_atual);
      if (streakData.streak_maximo > 0) setStreakMaximo(streakData.streak_maximo);

      const perfilData = await perfilRes.json();
      if (perfilData && !perfilData.error) {
        setPerfil(perfilData);
        setEditForm({
          nome: perfilData.nome || "",
          bio: perfilData.bio || "",
          github_url: perfilData.github_url || "",
          linkedin_url: perfilData.linkedin_url || "",
        });
      }

      const prog = await progRes.json();
      const etapas = await etapasRes.json();
      setProgresso(prog.progresso || []);

      const { data: projetos } = await supabase
        .from("projetos")
        .select("id, titulo, linguagem");
      const { data: etapasList } = await supabase.from("etapas_projeto").select("id, projeto_id");

      const etapasConcluidas = (etapas.progresso || []) as any[];
      const porEtapa = new Set<string>();
      for (const e of etapasConcluidas) {
        porEtapa.add(e.referencia_id);
      }

      if (projetos && etapasList) {
        const res: { projeto_id: string; titulo: string; linguagem: string; total: number; concluidas: number }[] = [];
        for (const p of projetos) {
          const etapasDoProjeto = etapasList.filter((ep) => ep.projeto_id === p.id);
          const total = etapasDoProjeto.length;
          const concluidas = etapasDoProjeto.filter((ep) => porEtapa.has(ep.id)).length;
          if (total > 0) res.push({ projeto_id: p.id, titulo: p.titulo, linguagem: p.linguagem, total, concluidas });
        }
        setProjetosEtapas(res);
      }
    } catch {}
    setCarregando(false);
  }

  async function salvarPerfil() {
    setSalvandoPerfil(true);
    try {
      const res = await fetch("/api/perfil", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      if (res.ok) {
        setPerfil((prev) => prev ? { ...prev, ...editForm } : prev);
        setEditando(false);
      }
    } catch {}
    setSalvandoPerfil(false);
  }

  function contarModuloPython(modulo: string): number {
    const total = CONTAGENS_PYTHON[modulo] || 0;
    const concluidos = progresso.filter(
      (p: any) => p.linguagem === "Python" && p.modulo === modulo
    ).length;
    return concluidos;
  }

  function contarModuloJava(modulo: string): number {
    const total = CONTAGENS_JAVA[modulo] || 0;
    const concluidos = progresso.filter(
      (p: any) => p.linguagem === "Java" && p.modulo === modulo
    ).length;
    return concluidos;
  }

  function contarModuloJavaScript(modulo: string): number {
    const concluidos = progresso.filter(
      (p: any) => p.linguagem === "JavaScript" && p.modulo === modulo
    ).length;
    return concluidos;
  }

  const totalPython = Object.values(CONTAGENS_PYTHON).reduce((a, b) => a + b, 0);
  const concluidosPython = progresso.filter((p: any) => p.linguagem === "Python").length;
  const totalJava = Object.values(CONTAGENS_JAVA).reduce((a, b) => a + b, 0);
  const concluidosJava = progresso.filter((p: any) => p.linguagem === "Java").length;
  const totalJS = Object.values(CONTAGENS_JAVASCRIPT).reduce((a, b) => a + b, 0);
  const concluidosJS = progresso.filter((p: any) => p.linguagem === "JavaScript").length;

  const displayName = perfil?.nome || user?.email?.split("@")[0] || "";
  const corAvatar = corDoNome(displayName);

  if (carregando) {
    return (
      <main style={{ padding: "2rem", maxWidth: "700px", margin: "0 auto" }}>
        <p style={{ color: "var(--text-secondary)", textAlign: "center", padding: "3rem" }}>Carregando...</p>
      </main>
    );
  }

  if (!user) return null;

  return (
    <main style={{ padding: "2rem", maxWidth: "700px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1.5rem" }}>
        📊 Meu Perfil
      </h1>

      {/* Card de Perfil */}
      <div style={{
        background: "var(--bg-card)", border: "1px solid var(--border)",
        borderRadius: "0.75rem", padding: "1.5rem", marginBottom: "2rem",
        display: "flex", gap: "1.25rem", alignItems: "flex-start", flexWrap: "wrap",
      }}>
        {/* Avatar */}
        {perfil?.avatar_url ? (
          <img src={perfil.avatar_url} alt=""
            style={{ width: "80px", height: "80px", borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
          />
        ) : (
          <div style={{
            width: "80px", height: "80px", borderRadius: "50%",
            background: corAvatar, color: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1.75rem", fontWeight: 700, flexShrink: 0,
          }}>
            {iniciais(displayName)}
          </div>
        )}

        {/* Informações */}
        <div style={{ flex: 1, minWidth: "200px" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.125rem" }}>
            {displayName}
          </h2>
          <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>
            {perfil?.email || user?.email}
          </p>
          {perfil?.bio && (
            <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: "0.5rem" }}>
              {perfil.bio}
            </p>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", fontSize: "0.8125rem" }}>
            {perfil?.github_url && (
              <span>
                <span style={{ color: "var(--text-secondary)" }}>GitHub: </span>
                <a href={perfil.github_url.startsWith("http") ? perfil.github_url : `https://${perfil.github_url}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{ color: "var(--accent)", textDecoration: "none" }}>
                  {perfil.github_url.replace(/^https?:\/\//, "")}
                </a>
              </span>
            )}
            {perfil?.linkedin_url && (
              <span>
                <span style={{ color: "var(--text-secondary)" }}>LinkedIn: </span>
                <a href={perfil.linkedin_url.startsWith("http") ? perfil.linkedin_url : `https://${perfil.linkedin_url}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{ color: "var(--accent)", textDecoration: "none" }}>
                  {perfil.linkedin_url.replace(/^https?:\/\//, "")}
                </a>
              </span>
            )}
          </div>

          {/* Botão editar */}
          <div style={{ marginTop: "0.75rem" }}>
            <button onClick={() => setEditando(true)}
              style={{
                padding: "0.375rem 1rem", fontSize: "0.8125rem", fontWeight: 600,
                background: "transparent", color: "var(--accent)",
                border: "1px solid var(--accent)", borderRadius: "0.375rem",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = hexToRgba("#3b82f6", 0.1); }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
            >
              Editar perfil
            </button>
          </div>
        </div>
      </div>

      {/* Modal de edição */}
      {editando && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 100,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(0,0,0,0.6)", padding: "1rem",
        }}
          onClick={(e) => { if (e.target === e.currentTarget) setEditando(false); }}
        >
          <div style={{
            background: "var(--bg-card)", border: "1px solid var(--border)",
            borderRadius: "0.75rem", padding: "2rem", width: "100%", maxWidth: "440px",
          }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1.25rem" }}>
              Editar perfil
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {/* Nome */}
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>
                  Nome
                </label>
                <input value={editForm.nome} onChange={(e) => setEditForm({ ...editForm, nome: e.target.value })}
                  placeholder="Seu nome"
                  style={{
                    width: "100%", padding: "0.5rem 0.75rem", fontSize: "0.875rem",
                    background: "var(--bg-secondary)", color: "var(--text-primary)",
                    border: "1px solid var(--border)", borderRadius: "0.375rem", outline: "none",
                  }}
                />
              </div>

              {/* Bio */}
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>
                  Bio
                </label>
                <textarea value={editForm.bio} onChange={(e) => e.target.value.length <= 160 && setEditForm({ ...editForm, bio: e.target.value })}
                  placeholder="Fale um pouco sobre você (máx. 160 caracteres)"
                  rows={3}
                  style={{
                    width: "100%", padding: "0.5rem 0.75rem", fontSize: "0.875rem", resize: "vertical",
                    background: "var(--bg-secondary)", color: "var(--text-primary)",
                    border: "1px solid var(--border)", borderRadius: "0.375rem", outline: "none", fontFamily: "inherit",
                  }}
                />
                <span style={{ fontSize: "0.7rem", color: editForm.bio.length >= 160 ? "#ef4444" : "var(--text-secondary)", float: "right" }}>
                  {editForm.bio.length}/160
                </span>
              </div>

              {/* GitHub */}
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>
                  GitHub
                </label>
                <input value={editForm.github_url} onChange={(e) => setEditForm({ ...editForm, github_url: e.target.value })}
                  placeholder="github.com/usuario"
                  style={{
                    width: "100%", padding: "0.5rem 0.75rem", fontSize: "0.875rem",
                    background: "var(--bg-secondary)", color: "var(--text-primary)",
                    border: "1px solid var(--border)", borderRadius: "0.375rem", outline: "none",
                  }}
                />
              </div>

              {/* LinkedIn */}
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>
                  LinkedIn
                </label>
                <input value={editForm.linkedin_url} onChange={(e) => setEditForm({ ...editForm, linkedin_url: e.target.value })}
                  placeholder="linkedin.com/in/usuario"
                  style={{
                    width: "100%", padding: "0.5rem 0.75rem", fontSize: "0.875rem",
                    background: "var(--bg-secondary)", color: "var(--text-primary)",
                    border: "1px solid var(--border)", borderRadius: "0.375rem", outline: "none",
                  }}
                />
              </div>
            </div>

            {/* Botões */}
            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end", marginTop: "1.5rem" }}>
              <button onClick={() => setEditando(false)}
                style={{
                  padding: "0.5rem 1.25rem", fontSize: "0.875rem", fontWeight: 600,
                  background: "transparent", color: "var(--text-secondary)",
                  border: "1px solid var(--border)", borderRadius: "0.375rem", cursor: "pointer",
                }}>
                Cancelar
              </button>
              <button onClick={salvarPerfil} disabled={salvandoPerfil}
                style={{
                  padding: "0.5rem 1.25rem", fontSize: "0.875rem", fontWeight: 600,
                  background: "var(--accent)", color: "#fff",
                  border: "none", borderRadius: "0.375rem", cursor: salvandoPerfil ? "not-allowed" : "pointer",
                  opacity: salvandoPerfil ? 0.6 : 1,
                }}>
                {salvandoPerfil ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Streak cards */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", flexWrap: "wrap" }}>
        <div style={{
          flex: 1, minWidth: "180px",
          background: "var(--bg-card)", border: "1px solid var(--border)",
          borderRadius: "0.75rem", padding: "1.25rem", textAlign: "center",
        }}>
          <div style={{ fontSize: "2rem", marginBottom: "0.25rem" }}>🔥</div>
          <div style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--text-primary)" }}>
            {streakAtual}
          </div>
          <div style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}>
            {streakAtual === 1 ? "dia" : "dias"} seguidos
          </div>
        </div>
        <div style={{
          flex: 1, minWidth: "180px",
          background: "var(--bg-card)", border: "1px solid var(--border)",
          borderRadius: "0.75rem", padding: "1.25rem", textAlign: "center",
        }}>
          <div style={{ fontSize: "2rem", marginBottom: "0.25rem" }}>🏆</div>
          <div style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--text-primary)" }}>
            {streakMaximo}
          </div>
          <div style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}>
            recorde de {streakMaximo === 1 ? "dia" : "dias"}
          </div>
        </div>
      </div>

      {/* Python */}
      <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "0.75rem", padding: "1.5rem", marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1rem" }}>
          Python
        </h2>
        <BarraProgresso atual={concluidosPython} total={totalPython} />
        <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {MODULOS_PYTHON.map((mod) => (
            <div key={mod} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", color: "var(--text-secondary)", padding: "0.25rem 0", borderBottom: "1px solid var(--border)" }}>
              <span>{mod}</span>
              <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{contarModuloPython(mod)}/{CONTAGENS_PYTHON[mod]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Java */}
      <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "0.75rem", padding: "1.5rem", marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1rem" }}>
          Java
        </h2>
        <BarraProgresso atual={concluidosJava} total={totalJava} />
        <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {MODULOS_JAVA.map((mod) => (
            <div key={mod} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", color: "var(--text-secondary)", padding: "0.25rem 0", borderBottom: "1px solid var(--border)" }}>
              <span>{mod}</span>
              <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{contarModuloJava(mod)}/{CONTAGENS_JAVA[mod]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* JavaScript */}
      <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "0.75rem", padding: "1.5rem", marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1rem" }}>
          JavaScript
        </h2>
        <BarraProgresso atual={concluidosJS} total={totalJS} />
        <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {MODULOS_JAVASCRIPT.map((mod) => (
            <div key={mod} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", color: "var(--text-secondary)", padding: "0.25rem 0", borderBottom: "1px solid var(--border)" }}>
              <span>{mod === "Módulos e Erros" ? "Módulos e Erros" : mod}</span>
              <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{contarModuloJavaScript(mod)}/{CONTAGENS_JAVASCRIPT[mod]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Projetos */}
      {projetosEtapas.length > 0 && (
        <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "0.75rem", padding: "1.5rem" }}>
          <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1rem" }}>
            Projetos
          </h2>
          {projetosEtapas.map((p) => (
            <div key={p.projeto_id} style={{ marginBottom: "0.75rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", color: "var(--text-secondary)", marginBottom: "0.25rem" }}>
                <span style={{ fontWeight: 500, color: "var(--text-primary)" }}>{p.titulo}</span>
                <span style={{ color: "var(--text-primary)" }}>{p.concluidas}/{p.total} etapas</span>
              </div>
              <BarraProgresso atual={p.concluidas} total={p.total} />
            </div>
          ))}
        </div>
      )}

      {progresso.length === 0 && projetosEtapas.length === 0 && (
        <p style={{ color: "var(--text-secondary)", textAlign: "center", padding: "3rem", fontSize: "0.9375rem" }}>
          Nenhum progresso registrado ainda. Resolva exercícios e complete projetos para ver seu progresso aqui.
        </p>
      )}
    </main>
  );
}
