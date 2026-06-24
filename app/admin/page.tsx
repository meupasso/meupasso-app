"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

type Secao = "dashboard" | "exercicios" | "projetos" | "vagas" | "blog" | "usuarios";

const MODULOS_POR_LINGUAGEM: Record<string, string[]> = {
  Python: ["Sintaxe", "Condicionais", "Repetição", "Listas", "Funções", "Coleções", "Arquivos", "POO"],
  Java: ["Sintaxe", "Condicionais", "Repetição", "ArrayList", "POO"],
  JavaScript: ["Sintaxe", "Condicionais", "Repetição", "Arrays", "Funções", "Objetos", "POO", "Módulos e Erros"],
};

const NAV: { key: Secao; label: string; icon: string }[] = [
  { key: "dashboard", label: "Dashboard", icon: "📊" },
  { key: "exercicios", label: "Exercícios", icon: "📝" },
  { key: "projetos", label: "Projetos", icon: "🚀" },
  { key: "vagas", label: "Vagas", icon: "💼" },
  { key: "blog", label: "Blog", icon: "📰" },
  { key: "usuarios", label: "Usuários", icon: "👥" },
];

function formatarData(data: string | null): string {
  if (!data) return "-";
  try {
    return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(new Date(data));
  } catch { return data; }
}

export default function AdminPage() {
  const router = useRouter();
  const [autorizado, setAutorizado] = useState(false);
  const [carregandoAuth, setCarregandoAuth] = useState(true);
  const [secao, setSecao] = useState<Secao>("dashboard");

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user || user.email !== "caiomvital@gmail.com") {
        router.push("/");
        return;
      }
      setAutorizado(true);
      setCarregandoAuth(false);
    });
  }, []);

  if (carregandoAuth) {
    return (
      <div style={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center", background: "var(--bg-primary)", color: "var(--text-secondary)" }}>
        Carregando...
      </div>
    );
  }

  if (!autorizado) return null;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-primary)" }}>
      {/* Sidebar */}
      <aside style={{
        width: "220px", flexShrink: 0, borderRight: "1px solid var(--border)",
        background: "var(--bg-secondary)", display: "flex", flexDirection: "column",
      }}>
        <div style={{ padding: "1.25rem 1rem", borderBottom: "1px solid var(--border)" }}>
          <h1 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)" }}>⚙️ Admin</h1>
          <p style={{ fontSize: "0.7rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>MeuPasso</p>
        </div>
        <nav style={{ flex: 1, padding: "0.5rem", display: "flex", flexDirection: "column", gap: "0.125rem" }}>
          {NAV.map((item) => (
            <button key={item.key} onClick={() => setSecao(item.key)}
              style={{
                display: "flex", alignItems: "center", gap: "0.625rem", width: "100%",
                padding: "0.625rem 0.75rem", borderRadius: "0.375rem",
                background: secao === item.key ? "var(--bg-card)" : "transparent",
                color: secao === item.key ? "var(--accent)" : "var(--text-secondary)",
                border: "none", fontSize: "0.875rem", fontWeight: secao === item.key ? 600 : 400,
                cursor: "pointer", textAlign: "left", transition: "background 0.15s",
              }}
              onMouseEnter={(e) => { if (secao !== item.key) e.currentTarget.style.background = "var(--bg-card)"; }}
              onMouseLeave={(e) => { if (secao !== item.key) e.currentTarget.style.background = "transparent"; }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div style={{ padding: "0.75rem 1rem", borderTop: "1px solid var(--border)" }}>
          <button onClick={() => router.push("/")}
            style={{ background: "none", border: "none", color: "var(--text-secondary)", fontSize: "0.8125rem", cursor: "pointer", padding: 0 }}
            onMouseEnter={(e) => e.currentTarget.style.color = "var(--text-primary)"}
            onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-secondary)"}
          >
            ← Voltar ao site
          </button>
        </div>
      </aside>

      {/* Conteúdo */}
      <div style={{ flex: 1, padding: "2rem", overflow: "auto" }}>
        {secao === "dashboard" && <Dashboard />}
        {secao === "exercicios" && <SecaoExercicios />}
        {secao === "projetos" && <SecaoProjetos />}
        {secao === "vagas" && <SecaoVagas />}
        {secao === "blog" && <SecaoBlog />}
        {secao === "usuarios" && <SecaoUsuarios />}
      </div>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────
function Dashboard() {
  const [dados, setDados] = useState<any>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => { fetch("/api/admin/dashboard").then(r => r.json()).then(d => { setDados(d); setCarregando(false); }).catch(() => setCarregando(false)); }, []);

  if (carregando) return <p style={{ color: "var(--text-secondary)" }}>Carregando...</p>;
  if (!dados) return <p style={{ color: "#ef4444" }}>Erro ao carregar dados.</p>;

  const cards = [
    { icon: "👥", label: "Usuários", value: dados.totalUsuarios },
    { icon: "⭐", label: "Assinantes Pro", value: dados.assinantesPro },
    { icon: "✅", label: "Exerc. Concluídos", value: dados.exerciciosConcluidos },
    { icon: "📝", label: "Total Exercícios", value: dados.totalExercicios },
    { icon: "🚀", label: "Projetos", value: dados.totalProjetos },
    { icon: "💬", label: "Sessões Tutor", value: dados.conversasTutor },
    { icon: "💼", label: "Vagas Ativas", value: dados.vagasAtivas },
  ];

  return (
    <div>
      <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem" }}>📊 Dashboard</h2>
      <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: "2rem" }}>Visão geral da plataforma.</p>

      <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", marginBottom: "2rem" }}>
        {cards.map((c) => (
          <div key={c.label} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "0.75rem", padding: "1.25rem", textAlign: "center" }}>
            <div style={{ fontSize: "2rem", marginBottom: "0.25rem" }}>{c.icon}</div>
            <div style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--text-primary)" }}>{c.value}</div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>{c.label}</div>
          </div>
        ))}
      </div>

      {/* Total por linguagem */}
      <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "0.75rem", padding: "1.5rem", marginBottom: "1.5rem" }}>
        <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "1rem" }}>📚 Exercícios por linguagem</h3>
        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
          {Object.entries(dados.totalPorLinguagem || {}).map(([lang, total]) => (
            <div key={lang} style={{ flex: 1, minWidth: "120px" }}>
              <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginBottom: "0.25rem" }}>{lang}</div>
              <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-primary)" }}>{total as number}</div>
              <div style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}>
                {(dados.progressoPorLinguagem?.[lang] || 0)} concluídos
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Últimos cadastros */}
      <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "0.75rem", padding: "1.5rem" }}>
        <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "1rem" }}>🆕 Últimos cadastros</h3>
        {dados.ultimosCadastros?.length > 0 ? (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8125rem" }}>
              <thead>
                <tr style={{ color: "var(--text-secondary)", borderBottom: "1px solid var(--border)" }}>
                  <th style={{ textAlign: "left", padding: "0.5rem 0.75rem", fontWeight: 600 }}>Nome</th>
                  <th style={{ textAlign: "left", padding: "0.5rem 0.75rem", fontWeight: 600 }}>Email</th>
                  <th style={{ textAlign: "left", padding: "0.5rem 0.75rem", fontWeight: 600 }}>Plano</th>
                  <th style={{ textAlign: "left", padding: "0.5rem 0.75rem", fontWeight: 600 }}>Streak</th>
                  <th style={{ textAlign: "left", padding: "0.5rem 0.75rem", fontWeight: 600 }}>Criado em</th>
                </tr>
              </thead>
              <tbody>
                {dados.ultimosCadastros.map((u: any) => (
                  <tr key={u.id} style={{ borderBottom: "1px solid var(--border)", color: "var(--text-primary)" }}>
                    <td style={{ padding: "0.5rem 0.75rem" }}>{u.nome || "-"}</td>
                    <td style={{ padding: "0.5rem 0.75rem", color: "var(--text-secondary)" }}>{u.email}</td>
                    <td style={{ padding: "0.5rem 0.75rem" }}>
                      <span style={{ fontSize: "0.7rem", fontWeight: 600, padding: "0.125rem 0.375rem", borderRadius: "0.25rem", background: u.plano === "pro" ? "#166534" : "#374151", color: u.plano === "pro" ? "#dcfce7" : "#9ca3af" }}>
                        {u.plano}
                      </span>
                    </td>
                    <td style={{ padding: "0.5rem 0.75rem" }}>{u.streak_atual || 0} 🔥</td>
                    <td style={{ padding: "0.5rem 0.75rem", color: "var(--text-secondary)" }}>{formatarData(u.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>Nenhum cadastro encontrado.</p>}
      </div>
    </div>
  );
}

// ─── EXERCÍCIOS ──────────────────────────────────────
function SecaoExercicios() {
  const [exercicios, setExercicios] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [filtroLing, setFiltroLing] = useState("");
  const [filtroMod, setFiltroMod] = useState("");
  const [filtroNivel, setFiltroNivel] = useState("");
  const [busca, setBusca] = useState("");
  const [editando, setEditando] = useState<any | null>(null);
  const [criando, setCriando] = useState(false);

  function carregar() {
    setCarregando(true);
    const params = new URLSearchParams();
    if (filtroLing) params.set("linguagem", filtroLing);
    if (filtroMod) params.set("modulo", filtroMod);
    if (filtroNivel) params.set("nivel", filtroNivel);
    if (busca) params.set("busca", busca);
    fetch(`/api/admin/exercicios?${params}`)
      .then(r => r.json()).then(d => { setExercicios(d); setCarregando(false); })
      .catch(() => setCarregando(false));
  }

  useEffect(() => { carregar(); }, [filtroLing, filtroMod, filtroNivel, busca]);

  async function deletar(id: string) {
    if (!confirm("Deletar este exercício?")) return;
    await fetch(`/api/admin/exercicios?id=${id}`, { method: "DELETE" });
    carregar();
  }

  const modulosDisponiveis = filtroLing ? MODULOS_POR_LINGUAGEM[filtroLing] || [] : [];

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
        <div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.25rem" }}>📝 Exercícios</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>{exercicios.length} exercícios encontrados.</p>
        </div>
        <button onClick={() => { setCriando(true); setEditando(null); }}
          style={{ padding: "0.5rem 1rem", background: "var(--accent)", color: "#fff", border: "none", borderRadius: "0.375rem", fontWeight: 600, fontSize: "0.875rem", cursor: "pointer" }}>
          + Novo exercício
        </button>
      </div>

      {/* Filtros */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" }}>
        <select value={filtroLing} onChange={e => { setFiltroLing(e.target.value); setFiltroMod(""); }}
          style={{ padding: "0.375rem 0.75rem", background: "var(--bg-card)", color: "var(--text-primary)", border: "1px solid var(--border)", borderRadius: "0.375rem", fontSize: "0.8125rem" }}>
          <option value="">Todas linguagens</option>
          <option value="Python">Python</option>
          <option value="Java">Java</option>
          <option value="JavaScript">JavaScript</option>
        </select>
        <select value={filtroMod} onChange={e => setFiltroMod(e.target.value)}
          style={{ padding: "0.375rem 0.75rem", background: "var(--bg-card)", color: "var(--text-primary)", border: "1px solid var(--border)", borderRadius: "0.375rem", fontSize: "0.8125rem" }}>
          <option value="">Todos módulos</option>
          {modulosDisponiveis.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
        <select value={filtroNivel} onChange={e => setFiltroNivel(e.target.value)}
          style={{ padding: "0.375rem 0.75rem", background: "var(--bg-card)", color: "var(--text-primary)", border: "1px solid var(--border)", borderRadius: "0.375rem", fontSize: "0.8125rem" }}>
          <option value="">Todos níveis</option>
          <option value="basico">Básico</option>
          <option value="intermediario">Intermediário</option>
          <option value="avancado">Avançado</option>
          <option value="desafio">Desafio</option>
        </select>
        <input value={busca} onChange={e => setBusca(e.target.value)} placeholder="Buscar por título..."
          style={{ padding: "0.375rem 0.75rem", flex: 1, minWidth: "160px", background: "var(--bg-card)", color: "var(--text-primary)", border: "1px solid var(--border)", borderRadius: "0.375rem", fontSize: "0.8125rem", outline: "none" }} />
      </div>

      {/* Tabela */}
      {carregando ? <p style={{ color: "var(--text-secondary)" }}>Carregando...</p> : (
        <div style={{ overflowX: "auto", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "0.75rem" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8125rem" }}>
            <thead>
              <tr style={{ color: "var(--text-secondary)", borderBottom: "1px solid var(--border)" }}>
                <th style={{ textAlign: "left", padding: "0.625rem 0.75rem", fontWeight: 600 }}>ID</th>
                <th style={{ textAlign: "left", padding: "0.625rem 0.75rem", fontWeight: 600 }}>Título</th>
                <th style={{ textAlign: "left", padding: "0.625rem 0.75rem", fontWeight: 600 }}>Ling</th>
                <th style={{ textAlign: "left", padding: "0.625rem 0.75rem", fontWeight: 600 }}>Módulo</th>
                <th style={{ textAlign: "left", padding: "0.625rem 0.75rem", fontWeight: 600 }}>Nível</th>
                <th style={{ textAlign: "right", padding: "0.625rem 0.75rem", fontWeight: 600 }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {exercicios.map((ex: any) => (
                <tr key={ex.id} style={{ borderBottom: "1px solid var(--border)", color: "var(--text-primary)" }}>
                  <td style={{ padding: "0.5rem 0.75rem", fontFamily: "monospace", fontSize: "0.75rem", color: "var(--text-secondary)" }}>{ex.id_referencia || "-"}</td>
                  <td style={{ padding: "0.5rem 0.75rem", fontWeight: 500 }}>{ex.titulo}</td>
                  <td style={{ padding: "0.5rem 0.75rem" }}>{ex.linguagem}</td>
                  <td style={{ padding: "0.5rem 0.75rem", color: "var(--text-secondary)" }}>{ex.modulo}</td>
                  <td style={{ padding: "0.5rem 0.75rem" }}>
                    <span style={{ fontSize: "0.7rem", fontWeight: 600, padding: "0.125rem 0.375rem", borderRadius: "0.25rem", background: "var(--badge-bg)", color: "var(--badge-text)" }}>
                      {ex.nivel}
                    </span>
                  </td>
                  <td style={{ padding: "0.5rem 0.75rem", textAlign: "right" }}>
                    <button onClick={() => { setEditando(ex); setCriando(false); }}
                      style={{ background: "none", border: "none", color: "var(--accent)", cursor: "pointer", fontSize: "0.8125rem", marginRight: "0.5rem" }}>
                      Editar
                    </button>
                    <button onClick={() => deletar(ex.id)}
                      style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: "0.8125rem" }}>
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Criar/Editar */}
      {(criando || editando) && <FormExercicio exercicio={editando} onClose={() => { setCriando(false); setEditando(null); }} onSaved={() => { setCriando(false); setEditando(null); carregar(); }} />}
    </div>
  );
}

function FormExercicio({ exercicio, onClose, onSaved }: { exercicio: any; onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState({
    id_referencia: exercicio?.id_referencia || "",
    titulo: exercicio?.titulo || "",
    linguagem: exercicio?.linguagem || "Python",
    modulo: exercicio?.modulo || "Sintaxe",
    nivel: exercicio?.nivel || "basico",
    descricao: exercicio?.descricao || "",
    objetivo: exercicio?.objetivo || "",
    exemplos: exercicio?.exemplos || "",
    slug: exercicio?.slug || "",
  });
  const [salvando, setSalvando] = useState(false);

  const modulos = MODULOS_POR_LINGUAGEM[form.linguagem] || [];
  if (!modulos.includes(form.modulo)) setForm(f => ({ ...f, modulo: modulos[0] }));

  async function salvar(e: React.FormEvent) {
    e.preventDefault();
    setSalvando(true);
    try {
      if (exercicio) {
        await fetch("/api/admin/exercicios", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: exercicio.id }) });
      } else {
        await fetch("/api/admin/exercicios", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      }
      onSaved();
    } catch {}
    setSalvando(false);
  }

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.6)", padding: "1rem" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "0.75rem", padding: "2rem", width: "100%", maxWidth: "520px", maxHeight: "90vh", overflow: "auto" }}>
        <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1.25rem" }}>
          {exercicio ? "Editar exercício" : "Novo exercício"}
        </h3>
        <form onSubmit={salvar} style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>ID Referência</label>
              <input value={form.id_referencia} onChange={e => setForm({ ...form, id_referencia: e.target.value })} placeholder="PYB001"
                style={{ width: "100%", padding: "0.5rem 0.625rem", fontSize: "0.8125rem", background: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid var(--border)", borderRadius: "0.375rem", outline: "none", fontFamily: "monospace" }} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>Slug</label>
              <input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} placeholder="exercicio-slug"
                style={{ width: "100%", padding: "0.5rem 0.625rem", fontSize: "0.8125rem", background: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid var(--border)", borderRadius: "0.375rem", outline: "none", fontFamily: "monospace" }} />
            </div>
          </div>
          <div>
            <label style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>Título *</label>
            <input value={form.titulo} onChange={e => setForm({ ...form, titulo: e.target.value })} required placeholder="Título do exercício"
              style={{ width: "100%", padding: "0.5rem 0.625rem", fontSize: "0.8125rem", background: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid var(--border)", borderRadius: "0.375rem", outline: "none" }} />
          </div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>Linguagem</label>
              <select value={form.linguagem} onChange={e => setForm({ ...form, linguagem: e.target.value, modulo: MODULOS_POR_LINGUAGEM[e.target.value]?.[0] || "" })}
                style={{ width: "100%", padding: "0.5rem 0.625rem", fontSize: "0.8125rem", background: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid var(--border)", borderRadius: "0.375rem" }}>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
                <option value="JavaScript">JavaScript</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>Módulo</label>
              <select value={form.modulo} onChange={e => setForm({ ...form, modulo: e.target.value })}
                style={{ width: "100%", padding: "0.5rem 0.625rem", fontSize: "0.8125rem", background: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid var(--border)", borderRadius: "0.375rem" }}>
                {MODULOS_POR_LINGUAGEM[form.linguagem]?.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>Nível</label>
              <select value={form.nivel} onChange={e => setForm({ ...form, nivel: e.target.value })}
                style={{ width: "100%", padding: "0.5rem 0.625rem", fontSize: "0.8125rem", background: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid var(--border)", borderRadius: "0.375rem" }}>
                <option value="basico">Básico</option>
                <option value="intermediario">Intermediário</option>
                <option value="avancado">Avançado</option>
                <option value="desafio">Desafio</option>
              </select>
            </div>
          </div>
          <div>
            <label style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>Descrição</label>
            <textarea value={form.descricao} onChange={e => setForm({ ...form, descricao: e.target.value })} rows={3} placeholder="Descrição do exercício"
              style={{ width: "100%", padding: "0.5rem 0.625rem", fontSize: "0.8125rem", background: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid var(--border)", borderRadius: "0.375rem", outline: "none", resize: "vertical", fontFamily: "inherit" }} />
          </div>
          <div>
            <label style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>Objetivo</label>
            <input value={form.objetivo} onChange={e => setForm({ ...form, objetivo: e.target.value })} placeholder="Objetivo do exercício"
              style={{ width: "100%", padding: "0.5rem 0.625rem", fontSize: "0.8125rem", background: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid var(--border)", borderRadius: "0.375rem", outline: "none" }} />
          </div>
          <div>
            <label style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>Exemplos (opcional)</label>
            <textarea value={form.exemplos} onChange={e => setForm({ ...form, exemplos: e.target.value })} rows={3} placeholder="Código de exemplo"
              style={{ width: "100%", padding: "0.5rem 0.625rem", fontSize: "0.8125rem", background: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid var(--border)", borderRadius: "0.375rem", outline: "none", resize: "vertical", fontFamily: "monospace" }} />
          </div>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end", marginTop: "0.5rem" }}>
            <button type="button" onClick={onClose}
              style={{ padding: "0.5rem 1.25rem", fontSize: "0.8125rem", fontWeight: 600, background: "transparent", color: "var(--text-secondary)", border: "1px solid var(--border)", borderRadius: "0.375rem", cursor: "pointer" }}>
              Cancelar
            </button>
            <button type="submit" disabled={salvando}
              style={{ padding: "0.5rem 1.25rem", fontSize: "0.8125rem", fontWeight: 600, background: "var(--accent)", color: "#fff", border: "none", borderRadius: "0.375rem", cursor: salvando ? "not-allowed" : "pointer", opacity: salvando ? 0.6 : 1 }}>
              {salvando ? "Salvando..." : exercicio ? "Salvar alterações" : "Criar exercício"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── PROJETOS ────────────────────────────────────────
function SecaoProjetos() {
  const [projetos, setProjetos] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    supabase.from("projetos").select("*").order("linguagem").order("ordem").then(({ data }) => {
      if (data) setProjetos(data);
      setCarregando(false);
    });
  }, []);

  if (carregando) return <p style={{ color: "var(--text-secondary)" }}>Carregando...</p>;

  return (
    <div>
      <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1.5rem" }}>🚀 Projetos</h2>
      <div style={{ display: "grid", gap: "0.75rem" }}>
        {projetos.map((p: any) => (
          <div key={p.id} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "0.75rem", padding: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: "0.9375rem" }}>{p.titulo}</div>
              <div style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", marginTop: "0.125rem" }}>{p.linguagem} · {p.nivel} · ordem {p.ordem}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── VAGAS ───────────────────────────────────────────
function SecaoVagas() {
  const [vagas, setVagas] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    supabase.from("vagas").select("*").order("created_at", { ascending: false }).limit(20).then(({ data }) => {
      if (data) setVagas(data);
      setCarregando(false);
    });
  }, []);

  if (carregando) return <p style={{ color: "var(--text-secondary)" }}>Carregando...</p>;

  return (
    <div>
      <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1.5rem" }}>💼 Vagas ({vagas.length})</h2>
      <div style={{ overflowX: "auto", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "0.75rem" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8125rem" }}>
          <thead>
            <tr style={{ color: "var(--text-secondary)", borderBottom: "1px solid var(--border)" }}>
              <th style={{ textAlign: "left", padding: "0.625rem 0.75rem", fontWeight: 600 }}>Título</th>
              <th style={{ textAlign: "left", padding: "0.625rem 0.75rem", fontWeight: 600 }}>Empresa</th>
              <th style={{ textAlign: "left", padding: "0.625rem 0.75rem", fontWeight: 600 }}>Tipo</th>
              <th style={{ textAlign: "left", padding: "0.625rem 0.75rem", fontWeight: 600 }}>Ativa</th>
              <th style={{ textAlign: "left", padding: "0.625rem 0.75rem", fontWeight: 600 }}>Criada</th>
            </tr>
          </thead>
          <tbody>
            {vagas.map((v: any) => (
              <tr key={v.id} style={{ borderBottom: "1px solid var(--border)", color: "var(--text-primary)" }}>
                <td style={{ padding: "0.5rem 0.75rem", fontWeight: 500 }}>{v.titulo}</td>
                <td style={{ padding: "0.5rem 0.75rem", color: "var(--text-secondary)" }}>{v.empresa || "-"}</td>
                <td style={{ padding: "0.5rem 0.75rem" }}>{v.tipo || "-"}</td>
                <td style={{ padding: "0.5rem 0.75rem" }}>{v.ativa ? "✅" : "❌"}</td>
                <td style={{ padding: "0.5rem 0.75rem", color: "var(--text-secondary)" }}>{formatarData(v.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── BLOG ────────────────────────────────────────────
function SecaoBlog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    supabase.from("blog_historico").select("*").order("created_at", { ascending: false }).limit(20).then(({ data }) => {
      if (data) setPosts(data);
      setCarregando(false);
    });
  }, []);

  if (carregando) return <p style={{ color: "var(--text-secondary)" }}>Carregando...</p>;

  return (
    <div>
      <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1.5rem" }}>📰 Blog</h2>
      <div style={{ overflowX: "auto", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "0.75rem" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8125rem" }}>
          <thead>
            <tr style={{ color: "var(--text-secondary)", borderBottom: "1px solid var(--border)" }}>
              <th style={{ textAlign: "left", padding: "0.625rem 0.75rem", fontWeight: 600 }}>Tema</th>
              <th style={{ textAlign: "left", padding: "0.625rem 0.75rem", fontWeight: 600 }}>Status</th>
              <th style={{ textAlign: "left", padding: "0.625rem 0.75rem", fontWeight: 600 }}>Slug</th>
              <th style={{ textAlign: "left", padding: "0.625rem 0.75rem", fontWeight: 600 }}>Criado</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p: any) => (
              <tr key={p.id} style={{ borderBottom: "1px solid var(--border)", color: "var(--text-primary)" }}>
                <td style={{ padding: "0.5rem 0.75rem", fontWeight: 500 }}>{p.tema || p.slug || "-"}</td>
                <td style={{ padding: "0.5rem 0.75rem" }}>
                  <span style={{ fontSize: "0.7rem", fontWeight: 600, padding: "0.125rem 0.375rem", borderRadius: "0.25rem", background: p.status === "publicado" ? "#166534" : "#374151", color: p.status === "publicado" ? "#dcfce7" : "#9ca3af" }}>
                    {p.status || "rascunho"}
                  </span>
                </td>
                <td style={{ padding: "0.5rem 0.75rem", fontFamily: "monospace", fontSize: "0.75rem", color: "var(--text-secondary)" }}>{p.slug}</td>
                <td style={{ padding: "0.5rem 0.75rem", color: "var(--text-secondary)" }}>{formatarData(p.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── USUÁRIOS ────────────────────────────────────────
function SecaoUsuarios() {
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    supabase.from("perfis").select("*").order("created_at", { ascending: false }).limit(50).then(({ data }) => {
      if (data) setUsuarios(data);
      setCarregando(false);
    });
  }, []);

  if (carregando) return <p style={{ color: "var(--text-secondary)" }}>Carregando...</p>;

  return (
    <div>
      <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1.5rem" }}>👥 Usuários ({usuarios.length} mostrados)</h2>
      <div style={{ overflowX: "auto", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "0.75rem" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8125rem" }}>
          <thead>
            <tr style={{ color: "var(--text-secondary)", borderBottom: "1px solid var(--border)" }}>
              <th style={{ textAlign: "left", padding: "0.625rem 0.75rem", fontWeight: 600 }}>Nome</th>
              <th style={{ textAlign: "left", padding: "0.625rem 0.75rem", fontWeight: 600 }}>Email</th>
              <th style={{ textAlign: "left", padding: "0.625rem 0.75rem", fontWeight: 600 }}>Plano</th>
              <th style={{ textAlign: "left", padding: "0.625rem 0.75rem", fontWeight: 600 }}>Sessões</th>
              <th style={{ textAlign: "left", padding: "0.625rem 0.75rem", fontWeight: 600 }}>Streak</th>
              <th style={{ textAlign: "left", padding: "0.625rem 0.75rem", fontWeight: 600 }}>Criado</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u: any) => (
              <tr key={u.id} style={{ borderBottom: "1px solid var(--border)", color: "var(--text-primary)" }}>
                <td style={{ padding: "0.5rem 0.75rem", fontWeight: 500 }}>{u.nome || "-"}</td>
                <td style={{ padding: "0.5rem 0.75rem", color: "var(--text-secondary)" }}>{u.email}</td>
                <td style={{ padding: "0.5rem 0.75rem" }}>
                  <span style={{ fontSize: "0.7rem", fontWeight: 600, padding: "0.125rem 0.375rem", borderRadius: "0.25rem", background: u.plano === "pro" ? "#166534" : "#374151", color: u.plano === "pro" ? "#dcfce7" : "#9ca3af" }}>
                    {u.plano}
                  </span>
                </td>
                <td style={{ padding: "0.5rem 0.75rem" }}>{u.sessoes_usadas}/3</td>
                <td style={{ padding: "0.5rem 0.75rem" }}>{u.streak_atual || 0} 🔥</td>
                <td style={{ padding: "0.5rem 0.75rem", color: "var(--text-secondary)" }}>{formatarData(u.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
