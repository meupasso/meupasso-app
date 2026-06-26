"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

type Secao = "dashboard" | "exercicios" | "projetos" | "vagas" | "analises" | "blog" | "usuarios";

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
  { key: "analises", label: "Raio-X", icon: "📡" },
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
        {secao === "analises" && <SecaoAnalises />}
        {secao === "blog" && <SecaoBlog />}
        {secao === "usuarios" && <SecaoUsuarios />}
      </div>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────
function Dashboard() {
  const [dados, setDados] = useState<any>(null);
  const [analises, setAnalises] = useState<any>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/dashboard").then(r => r.json()),
      supabase.from("analises_empregabilidade").select("id, pago, criado_em"),
    ]).then(([d, { data: a }]) => {
      setDados(d);
      setAnalises(a || []);
      setCarregando(false);
    }).catch(() => setCarregando(false));
  }, []);

  if (carregando) return <p style={{ color: "var(--text-secondary)" }}>Carregando...</p>;
  if (!dados) return <p style={{ color: "#ef4444" }}>Erro ao carregar dados.</p>;

  // Calcular receita do mês
  const hoje = new Date();
  const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1).toISOString();
  const analisesMes = (analises || []).filter((a: any) => a.criado_em >= inicioMes);
  const pagasMes = analisesMes.filter((a: any) => a.pago).length;
  const receitaRaioX = pagasMes * 19.90;
  const receitaPro = (dados.assinantesPro || 0) * 27.90;
  const receitaTotal = receitaRaioX + receitaPro;
  const totalAnalises = analises?.length || 0;
  const totalPagas = analises?.filter((a: any) => a.pago).length || 0;
  const taxaConversao = totalAnalises > 0 ? ((totalPagas / totalAnalises) * 100).toFixed(1) : "0";

  const cards = [
    { icon: "👥", label: "Usuários", value: dados.totalUsuarios },
    { icon: "⭐", label: "Assinantes Pro", value: dados.assinantesPro },
    { icon: "💰", label: "Receita do mês", value: `R$ ${receitaTotal.toFixed(0)}` },
    { icon: "📈", label: "MRR", value: `R$ ${receitaPro.toFixed(0)}` },
    { icon: "✅", label: "Exerc. Concluídos", value: dados.exerciciosConcluidos },
    { icon: "📡", label: "Raio-X feitos", value: totalAnalises },
    { icon: "🎯", label: "Conv. Raio-X", value: `${taxaConversao}%` },
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
  const [editando, setEditando] = useState<any | null>(null);
  const [criando, setCriando] = useState(false);
  const [busca, setBusca] = useState("");

  function carregar() {
    setCarregando(true);
    const params = new URLSearchParams();
    if (busca) params.set("busca", busca);
    fetch(`/api/admin/vagas?${params}`)
      .then(r => r.json()).then(d => { setVagas(d); setCarregando(false); })
      .catch(() => setCarregando(false));
  }

  useEffect(() => { carregar(); }, [busca]);

  async function deletar(id: string) {
    if (!confirm("Deletar esta vaga?")) return;
    await fetch(`/api/admin/vagas?id=${id}`, { method: "DELETE" });
    carregar();
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
        <div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.25rem" }}>💼 Vagas</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>{vagas.length} vagas.</p>
        </div>
        <button onClick={() => { setCriando(true); setEditando(null); }}
          style={{ padding: "0.5rem 1rem", background: "var(--accent)", color: "#fff", border: "none", borderRadius: "0.375rem", fontWeight: 600, fontSize: "0.875rem", cursor: "pointer" }}>
          + Nova vaga
        </button>
      </div>

      <input value={busca} onChange={e => setBusca(e.target.value)} placeholder="Buscar por título..."
        style={{ width: "100%", padding: "0.5rem 0.75rem", marginBottom: "1rem", background: "var(--bg-card)", color: "var(--text-primary)", border: "1px solid var(--border)", borderRadius: "0.375rem", fontSize: "0.8125rem", outline: "none" }} />

      {carregando ? <p style={{ color: "var(--text-secondary)" }}>Carregando...</p> : (
        <div style={{ overflowX: "auto", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "0.75rem" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8125rem" }}>
            <thead>
              <tr style={{ color: "var(--text-secondary)", borderBottom: "1px solid var(--border)" }}>
                <th style={{ textAlign: "left", padding: "0.625rem 0.75rem", fontWeight: 600 }}>Título</th>
                <th style={{ textAlign: "left", padding: "0.625rem 0.75rem", fontWeight: 600 }}>Empresa</th>
                <th style={{ textAlign: "left", padding: "0.625rem 0.75rem", fontWeight: 600 }}>Tipo</th>
                <th style={{ textAlign: "left", padding: "0.625rem 0.75rem", fontWeight: 600 }}>Remoto</th>
                <th style={{ textAlign: "left", padding: "0.625rem 0.75rem", fontWeight: 600 }}>Ativa</th>
                <th style={{ textAlign: "right", padding: "0.625rem 0.75rem", fontWeight: 600 }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {vagas.map((v: any) => (
                <tr key={v.id} style={{ borderBottom: "1px solid var(--border)", color: "var(--text-primary)" }}>
                  <td style={{ padding: "0.5rem 0.75rem", fontWeight: 500 }}>{v.titulo}</td>
                  <td style={{ padding: "0.5rem 0.75rem", color: "var(--text-secondary)" }}>{v.empresa || "-"}</td>
                  <td style={{ padding: "0.5rem 0.75rem" }}>{v.tipo || "-"}</td>
                  <td style={{ padding: "0.5rem 0.75rem" }}>{v.remoto ? "✅" : "❌"}</td>
                  <td style={{ padding: "0.5rem 0.75rem" }}>{v.ativa ? "✅" : "❌"}</td>
                  <td style={{ padding: "0.5rem 0.75rem", textAlign: "right" }}>
                    <button onClick={() => { setEditando(v); setCriando(false); }}
                      style={{ background: "none", border: "none", color: "var(--accent)", cursor: "pointer", fontSize: "0.8125rem", marginRight: "0.5rem" }}>
                      Editar
                    </button>
                    <button onClick={() => deletar(v.id)}
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

      {(criando || editando) && <FormVaga vaga={editando} onClose={() => { setCriando(false); setEditando(null); }} onSaved={() => { setCriando(false); setEditando(null); carregar(); }} />}
    </div>
  );
}

function FormVaga({ vaga, onClose, onSaved }: { vaga: any; onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState({
    titulo: vaga?.titulo || "",
    empresa: vaga?.empresa || "",
    cidade: vaga?.cidade || "",
    remoto: vaga?.remoto ?? true,
    tipo: vaga?.tipo || "",
    tecnologias: vaga?.tecnologias?.join(", ") || "",
    descricao: vaga?.descricao || "",
    url: vaga?.url || "",
    ativa: vaga?.ativa ?? true,
  });
  const [salvando, setSalvando] = useState(false);

  async function salvar(e: React.FormEvent) {
    e.preventDefault();
    setSalvando(true);
    const body = {
      ...form,
      tecnologias: form.tecnologias.split(",").map((t: string) => t.trim()).filter(Boolean),
    };
    try {
      if (vaga) {
        await fetch("/api/admin/vagas", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...body, id: vaga.id }) });
      } else {
        await fetch("/api/admin/vagas", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
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
          {vaga ? "Editar vaga" : "Nova vaga"}
        </h3>
        <form onSubmit={salvar} style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
          <div>
            <label style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>Título *</label>
            <input value={form.titulo} onChange={e => setForm({ ...form, titulo: e.target.value })} required placeholder="Desenvolvedor Python Júnior"
              style={{ width: "100%", padding: "0.5rem 0.625rem", fontSize: "0.8125rem", background: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid var(--border)", borderRadius: "0.375rem", outline: "none" }} />
          </div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>Empresa</label>
              <input value={form.empresa} onChange={e => setForm({ ...form, empresa: e.target.value })} placeholder="Nome da empresa"
                style={{ width: "100%", padding: "0.5rem 0.625rem", fontSize: "0.8125rem", background: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid var(--border)", borderRadius: "0.375rem", outline: "none" }} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>Cidade</label>
              <input value={form.cidade} onChange={e => setForm({ ...form, cidade: e.target.value })} placeholder="São Paulo, SP"
                style={{ width: "100%", padding: "0.5rem 0.625rem", fontSize: "0.8125rem", background: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid var(--border)", borderRadius: "0.375rem", outline: "none" }} />
            </div>
          </div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>Tipo</label>
              <input value={form.tipo} onChange={e => setForm({ ...form, tipo: e.target.value })} placeholder="CLT, PJ, Estágio"
                style={{ width: "100%", padding: "0.5rem 0.625rem", fontSize: "0.8125rem", background: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid var(--border)", borderRadius: "0.375rem", outline: "none" }} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>URL da vaga *</label>
              <input value={form.url} onChange={e => setForm({ ...form, url: e.target.value })} required placeholder="https://..."
                style={{ width: "100%", padding: "0.5rem 0.625rem", fontSize: "0.8125rem", background: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid var(--border)", borderRadius: "0.375rem", outline: "none" }} />
            </div>
          </div>
          <div>
            <label style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>Tecnologias (separadas por vírgula)</label>
            <input value={form.tecnologias} onChange={e => setForm({ ...form, tecnologias: e.target.value })} placeholder="Python, Django, PostgreSQL"
              style={{ width: "100%", padding: "0.5rem 0.625rem", fontSize: "0.8125rem", background: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid var(--border)", borderRadius: "0.375rem", outline: "none" }} />
          </div>
          <div>
            <label style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>Descrição</label>
            <textarea value={form.descricao} onChange={e => setForm({ ...form, descricao: e.target.value })} rows={4} placeholder="Descrição da vaga"
              style={{ width: "100%", padding: "0.5rem 0.625rem", fontSize: "0.8125rem", background: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid var(--border)", borderRadius: "0.375rem", outline: "none", resize: "vertical", fontFamily: "inherit" }} />
          </div>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.8125rem", color: "var(--text-primary)", cursor: "pointer" }}>
              <input type="checkbox" checked={form.remoto} onChange={e => setForm({ ...form, remoto: e.target.checked })}
                style={{ accentColor: "var(--accent)" }} />
              Remoto
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.8125rem", color: "var(--text-primary)", cursor: "pointer" }}>
              <input type="checkbox" checked={form.ativa} onChange={e => setForm({ ...form, ativa: e.target.checked })}
                style={{ accentColor: "var(--accent)" }} />
              Ativa
            </label>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end", marginTop: "0.5rem" }}>
            <button type="button" onClick={onClose}
              style={{ padding: "0.5rem 1.25rem", fontSize: "0.8125rem", fontWeight: 600, background: "transparent", color: "var(--text-secondary)", border: "1px solid var(--border)", borderRadius: "0.375rem", cursor: "pointer" }}>
              Cancelar
            </button>
            <button type="submit" disabled={salvando}
              style={{ padding: "0.5rem 1.25rem", fontSize: "0.8125rem", fontWeight: 600, background: "var(--accent)", color: "#fff", border: "none", borderRadius: "0.375rem", cursor: salvando ? "not-allowed" : "pointer", opacity: salvando ? 0.6 : 1 }}>
              {salvando ? "Salvando..." : vaga ? "Salvar alterações" : "Criar vaga"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── RAIO-X DE CARREIRA ─────────────────────────────
function SecaoAnalises() {
  const [analises, setAnalises] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [filtroStatus, setFiltroStatus] = useState("");
  const [filtroPago, setFiltroPago] = useState("");
  const [analiseModal, setAnaliseModal] = useState<any | null>(null);
  const [abaJSON, setAbaJSON] = useState("json_curriculo");

  const JSON_KEYS = [
   { key: "json_curriculo", label: "Currículo" },
   { key: "json_linkedin", label: "LinkedIn" },
   { key: "json_github", label: "GitHub" },
   { key: "json_cruzamento", label: "Cruzamento" },
   { key: "json_o_que_falta", label: "O que falta" },
   { key: "json_recrutador", label: "Recrutador" },
   { key: "json_plano", label: "Plano" },
   { key: "json_vagas", label: "Vagas" },
   { key: "json_relatorio_final", label: "Relatório Final" },
  ];

  function carregar() {
    setCarregando(true);
    const svc = createClient();
    svc.from("analises_empregabilidade")
      .select("*, users:user_id(email, nome)")
      .order("criado_em", { ascending: false })
      .then(({ data }: any) => {
        if (data) setAnalises(data);
        setCarregando(false);
      });
  }

  useEffect(() => { carregar(); }, []);

  const filtradas = analises.filter((a) => {
    if (filtroStatus && a.status !== filtroStatus) return false;
    if (filtroPago === "sim" && !a.pago) return false;
    if (filtroPago === "nao" && a.pago) return false;
    return true;
  });

  const totalAnalises = analises.length;
  const totalPagas = analises.filter((a) => a.pago).length;
  const totalErro = analises.filter((a) => a.status === "erro").length;
  const taxaConversao = totalAnalises > 0 ? ((totalPagas / totalAnalises) * 100).toFixed(1) : "0";
  const tempos = analises
    .filter((a: any) => a.status === "concluido" && a.criado_em)
    .map((a: any) => (new Date(a.criado_em).getTime() - new Date(a.criado_em).getTime()) / 1000);

  async function reprocessar(id: string, aPartirDe?: number) {
    if (!confirm("Reprocessar esta análise?")) return;
    try {
      const body: any = { id };
      if (aPartirDe) body.a_partir_de = aPartirDe;
      const res = await fetch("/api/analise/processar", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
      });
      if (res.ok) { alert("Reprocessamento iniciado!"); carregar(); }
      else { alert("Erro ao reprocessar."); }
    } catch { alert("Erro de rede."); }
  }

  if (carregando) return <p style={{ color: "var(--text-secondary)" }}>Carregando...</p>;

  return (
    <div>
      <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.25rem" }}>📡 Raio-X de Carreira</h2>
      <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: "1.5rem" }}>
        {totalAnalises} análises · {totalPagas} pagas · {totalErro} com erro · {taxaConversao}% conversão
      </p>

      {/* Métricas */}
      <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", marginBottom: "1.5rem" }}>
        {[
          { icon: "📡", label: "Total", value: totalAnalises, cor: "var(--text-primary)" },
          { icon: "💰", label: "Pagas", value: totalPagas, cor: "#4ade80" },
          { icon: "🆓", label: "Gratuitas", value: totalAnalises - totalPagas, cor: "var(--text-secondary)" },
          { icon: "📈", label: "Conversão", value: `${taxaConversao}%`, cor: "var(--accent)" },
          { icon: "❌", label: "Com erro", value: totalErro, cor: totalErro > 0 ? "#f87171" : "var(--text-secondary)" },
        ].map((c) => (
          <div key={c.label} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "0.75rem", padding: "1rem", textAlign: "center" }}>
            <div style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}>{c.icon}</div>
            <div style={{ fontSize: "1.5rem", fontWeight: 700, color: c.cor }}>{c.value}</div>
            <div style={{ fontSize: "0.7rem", color: "var(--text-secondary)" }}>{c.label}</div>
          </div>
        ))}
      </div>

      {/* Filtros */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" }}>
        <select value={filtroStatus} onChange={e => setFiltroStatus(e.target.value)}
          style={{ padding: "0.375rem 0.75rem", background: "var(--bg-card)", color: "var(--text-primary)", border: "1px solid var(--border)", borderRadius: "0.375rem", fontSize: "0.8125rem" }}>
          <option value="">Todos status</option>
          <option value="processando">Processando</option>
          <option value="concluido">Concluído</option>
          <option value="erro">Erro</option>
        </select>
        <select value={filtroPago} onChange={e => setFiltroPago(e.target.value)}
          style={{ padding: "0.375rem 0.75rem", background: "var(--bg-card)", color: "var(--text-primary)", border: "1px solid var(--border)", borderRadius: "0.375rem", fontSize: "0.8125rem" }}>
          <option value="">Todos pagamentos</option>
          <option value="sim">Pago</option>
          <option value="nao">Não pago</option>
        </select>
        <span style={{ padding: "0.375rem 0.75rem", color: "var(--text-secondary)", fontSize: "0.8125rem" }}>
          {filtradas.length} de {totalAnalises}
        </span>
      </div>

      {/* Tabela */}
      <div style={{ overflowX: "auto", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "0.75rem" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8125rem" }}>
          <thead>
            <tr style={{ color: "var(--text-secondary)", borderBottom: "1px solid var(--border)" }}>
              <th style={{ textAlign: "left", padding: "0.5rem 0.75rem", fontWeight: 600 }}>Usuário</th>
              <th style={{ textAlign: "left", padding: "0.5rem 0.75rem", fontWeight: 600 }}>Vaga</th>
              <th style={{ textAlign: "left", padding: "0.5rem 0.75rem", fontWeight: 600 }}>GitHub</th>
              <th style={{ textAlign: "left", padding: "0.5rem 0.75rem", fontWeight: 600 }}>Repos</th>
              <th style={{ textAlign: "left", padding: "0.5rem 0.75rem", fontWeight: 600 }}>Status</th>
              <th style={{ textAlign: "left", padding: "0.5rem 0.75rem", fontWeight: 600 }}>Pago</th>
              <th style={{ textAlign: "left", padding: "0.5rem 0.75rem", fontWeight: 600 }}>Data</th>
              <th style={{ textAlign: "center", padding: "0.5rem 0.75rem", fontWeight: 600 }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filtradas.map((a: any) => (
              <tr key={a.id} style={{ borderBottom: "1px solid var(--border)", color: "var(--text-primary)" }}>
                <td style={{ padding: "0.5rem 0.75rem", maxWidth: 140, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {a.users?.nome || a.users?.email || a.user_id?.slice(0, 8) || "-"}
                </td>
                <td style={{ padding: "0.5rem 0.75rem", maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: "0.75rem" }}>
                  {a.objetivo_vaga || "-"}
                </td>
                <td style={{ padding: "0.5rem 0.75rem", fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                  {a.github_username || "-"}
                </td>
                <td style={{ padding: "0.5rem 0.75rem", fontSize: "0.7rem", color: "var(--text-secondary)", maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {a.repos_selecionados?.length ? a.repos_selecionados.join(", ") : "-"}
                </td>
                <td style={{ padding: "0.5rem 0.75rem" }}>
                  <span style={{ fontSize: "0.65rem", fontWeight: 600, padding: "0.125rem 0.375rem", borderRadius: "0.25rem",
                    background: a.status === "concluido" ? "#166534" : a.status === "erro" ? "#7f1d1d" : "#374151",
                    color: a.status === "concluido" ? "#dcfce7" : a.status === "erro" ? "#fecaca" : "#9ca3af" }}>
                    {a.status}
                  </span>
                </td>
                <td style={{ padding: "0.5rem 0.75rem" }}>
                  <span style={{ fontSize: "0.65rem", fontWeight: 600, padding: "0.125rem 0.375rem", borderRadius: "0.25rem",
                    background: a.pago ? "#166534" : "#374151", color: a.pago ? "#dcfce7" : "#9ca3af" }}>
                    {a.pago ? "Sim" : "Não"}
                  </span>
                </td>
                <td style={{ padding: "0.5rem 0.75rem", fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                  {formatarData(a.criado_em)}
                </td>
                <td style={{ padding: "0.5rem 0.75rem", textAlign: "center", whiteSpace: "nowrap" }}>
                  <div style={{ display: "flex", gap: "0.25rem", alignItems: "center", justifyContent: "center" }}>
                    <button onClick={() => window.open(`/analise/${a.id}`, "_blank")}
                      style={{ background: "none", border: "none", color: "var(--accent)", cursor: "pointer", fontSize: "0.75rem", textDecoration: "underline" }}>
                      Ver
                    </button>
                    <button onClick={() => setAnaliseModal(a)}
                      style={{ background: "none", border: "none", color: "var(--accent)", cursor: "pointer", fontSize: "0.75rem", textDecoration: "underline" }}>
                      JSONs
                    </button>
                    {a.status === "erro" && (
                      <button onClick={() => reprocessar(a.id)}
                        style={{ background: "none", border: "none", color: "#fbbf24", cursor: "pointer", fontSize: "0.75rem" }}>
                        ↻
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal JSON Viewer */}
      {analiseModal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.6)", padding: "1rem" }}
          onClick={(e) => { if (e.target === e.currentTarget) setAnaliseModal(null); }}>
          <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "0.75rem", padding: "1.5rem", width: "100%", maxWidth: "700px", maxHeight: "90vh", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>
                📄 {analiseModal.objetivo_vaga || "Análise"}
              </h3>
              <button onClick={() => setAnaliseModal(null)}
                style={{ background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer", fontSize: "1.25rem" }}>
                ✕
              </button>
            </div>

            {/* Abas JSON */}
            <div style={{ display: "flex", gap: "0.25rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
              {JSON_KEYS.map(({ key, label }) => (
                <button key={key} onClick={() => setAbaJSON(key)}
                  style={{
                    padding: "0.25rem 0.625rem", fontSize: "0.7rem", fontWeight: 600, cursor: "pointer",
                    background: abaJSON === key ? "var(--accent)" : "transparent",
                    color: abaJSON === key ? "#fff" : "var(--text-secondary)",
                    border: "1px solid", borderColor: abaJSON === key ? "var(--accent)" : "var(--border)",
                    borderRadius: "0.25rem",
                  }}>
                  {label}
                </button>
              ))}
            </div>

            {/* Conteúdo JSON */}
            <div style={{ overflow: "auto", maxHeight: "60vh", background: "var(--bg-secondary)", borderRadius: "0.5rem", padding: "0.75rem", fontFamily: "monospace", fontSize: "0.7rem", whiteSpace: "pre-wrap", color: "var(--text-primary)", lineHeight: 1.5 }}>
              {analiseModal[abaJSON] ? JSON.stringify(analiseModal[abaJSON], null, 2) : "(vazio)"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── BLOG ────────────────────────────────────────────
function SecaoBlog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [aprovando, setAprovando] = useState<string | null>(null);

  function carregar() {
    setCarregando(true);
    supabase.from("blog_historico").select("*").order("created_at", { ascending: false }).limit(20).then(({ data }) => {
      if (data) setPosts(data);
      setCarregando(false);
    });
  }

  useEffect(() => { carregar(); }, []);

  async function aprovar(id: string) {
    setAprovando(id);
    await supabase.from("blog_historico").update({ status: "publicado" }).eq("id", id);
    setAprovando(null);
    carregar();
  }

  if (carregando) return <p style={{ color: "var(--text-secondary)" }}>Carregando...</p>;

  const pendentes = posts.filter(p => p.status !== "publicado");
  const publicados = posts.filter(p => p.status === "publicado");

  return (
    <div>
      <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1.5rem" }}>📰 Blog</h2>

      {/* Pendentes */}
      {pendentes.length > 0 && (
        <div style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#eab308", marginBottom: "0.75rem" }}>
            ⏳ Pendentes de aprovação ({pendentes.length})
          </h3>
          <div style={{ overflowX: "auto", background: "var(--bg-card)", border: "1px solid #eab30840", borderRadius: "0.75rem" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8125rem" }}>
              <thead>
                <tr style={{ color: "var(--text-secondary)", borderBottom: "1px solid var(--border)" }}>
                  <th style={{ textAlign: "left", padding: "0.5rem 0.75rem", fontWeight: 600 }}>Tema</th>
                  <th style={{ textAlign: "left", padding: "0.5rem 0.75rem", fontWeight: 600 }}>Status</th>
                  <th style={{ textAlign: "left", padding: "0.5rem 0.75rem", fontWeight: 600 }}>Slug</th>
                  <th style={{ textAlign: "left", padding: "0.5rem 0.75rem", fontWeight: 600 }}>Criado</th>
                  <th style={{ textAlign: "center", padding: "0.5rem 0.75rem", fontWeight: 600 }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {pendentes.map((p: any) => (
                  <tr key={p.id} style={{ borderBottom: "1px solid var(--border)", color: "var(--text-primary)" }}>
                    <td style={{ padding: "0.5rem 0.75rem", fontWeight: 500 }}>{p.tema || p.slug || "-"}</td>
                    <td style={{ padding: "0.5rem 0.75rem" }}>
                      <span style={{ fontSize: "0.7rem", fontWeight: 600, padding: "0.125rem 0.375rem", borderRadius: "0.25rem", background: "#374151", color: "#9ca3af" }}>
                        {p.status || "rascunho"}
                      </span>
                    </td>
                    <td style={{ padding: "0.5rem 0.75rem", fontFamily: "monospace", fontSize: "0.75rem", color: "var(--text-secondary)" }}>{p.slug}</td>
                    <td style={{ padding: "0.5rem 0.75rem", color: "var(--text-secondary)" }}>{formatarData(p.created_at)}</td>
                    <td style={{ padding: "0.5rem 0.75rem", textAlign: "center" }}>
                      <button onClick={() => aprovar(p.id)} disabled={aprovando === p.id}
                        style={{ padding: "0.25rem 0.75rem", background: "#166534", color: "#dcfce7", border: "none", borderRadius: "0.25rem", fontSize: "0.7rem", fontWeight: 600, cursor: aprovando === p.id ? "not-allowed" : "pointer", opacity: aprovando === p.id ? 0.5 : 1 }}>
                        {aprovando === p.id ? "..." : "Aprovar"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Publicados */}
      <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.75rem" }}>
        ✅ Publicados ({publicados.length})
      </h3>
      <div style={{ overflowX: "auto", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "0.75rem" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8125rem" }}>
          <thead>
            <tr style={{ color: "var(--text-secondary)", borderBottom: "1px solid var(--border)" }}>
              <th style={{ textAlign: "left", padding: "0.5rem 0.75rem", fontWeight: 600 }}>Tema</th>
              <th style={{ textAlign: "left", padding: "0.5rem 0.75rem", fontWeight: 600 }}>Status</th>
              <th style={{ textAlign: "left", padding: "0.5rem 0.75rem", fontWeight: 600 }}>Slug</th>
              <th style={{ textAlign: "left", padding: "0.5rem 0.75rem", fontWeight: 600 }}>Criado</th>
            </tr>
          </thead>
          <tbody>
            {publicados.map((p: any) => (
              <tr key={p.id} style={{ borderBottom: "1px solid var(--border)", color: "var(--text-primary)" }}>
                <td style={{ padding: "0.5rem 0.75rem", fontWeight: 500 }}>{p.tema || p.slug || "-"}</td>
                <td style={{ padding: "0.5rem 0.75rem" }}>
                  <span style={{ fontSize: "0.7rem", fontWeight: 600, padding: "0.125rem 0.375rem", borderRadius: "0.25rem", background: "#166534", color: "#dcfce7" }}>
                    publicado
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
  const [usuarios, setUsuarios] = useState<any[] | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [promovendo, setPromovendo] = useState<string | null>(null);
  const [impersonando, setImpersonando] = useState(false);

  function carregar() {
    setCarregando(true);
    // Buscar usuarios + contagem de analises + exercicios concluidos
    Promise.all([
      fetch("/api/admin/usuarios").then(r => r.json()),
      supabase.from("analises_empregabilidade").select("user_id, pago"),
      supabase.from("progresso").select("usuario_id"),
    ]).then(([users, { data: analises }, { data: progresso }]) => {
      const analiseCount: Record<string, { total: number; paga: boolean }> = {};
      (analises || []).forEach((a: any) => {
        if (!analiseCount[a.user_id]) analiseCount[a.user_id] = { total: 0, paga: false };
        analiseCount[a.user_id].total++;
        if (a.pago) analiseCount[a.user_id].paga = true;
      });
      const exercCount: Record<string, number> = {};
      (progresso || []).forEach((p: any) => {
        exercCount[p.usuario_id] = (exercCount[p.usuario_id] || 0) + 1;
      });
      const usersData = (users || []).map((u: any) => ({
        ...u,
        _analises: analiseCount[u.id]?.total || 0,
        _analisePaga: analiseCount[u.id]?.paga || false,
        _exercicios: exercCount[u.id] || 0,
      }));
      setUsuarios(usersData);
      setCarregando(false);
    }).catch(() => setCarregando(false));
  }

  useEffect(() => { carregar(); }, []);

  async function impersonar(email: string) {
    setImpersonando(true);
    try {
      // Magic link com redirect
      const { error } = await supabase.auth.signInWithOtp({ email, options: { shouldCreateUser: false } });
      if (error) alert("Erro: " + error.message);
      else alert(`Link de acesso enviado para ${email}. Verifique o email.`);
    } catch { alert("Erro ao impersonar."); }
    setImpersonando(false);
  }

  async function tornarPro(userId: string, dias: number) {
    setPromovendo(userId);
    await fetch("/api/admin/usuarios", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: userId, tornar_pro_por_dias: dias }),
    });
    setPromovendo(null);
    carregar();
  }

  async function removerPro(userId: string) {
    if (!confirm("Remover acesso Pro deste usuário?")) return;
    await fetch("/api/admin/usuarios", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: userId, remover_pro: true }),
    });
    carregar();
  }

  function isProValido(u: any): boolean {
    if (u.plano !== "pro") return false;
    if (!u.pro_expiracao) return true; // pro permanente (veio do pagamento)
    return new Date(u.pro_expiracao) >= new Date(new Date().toDateString());
  }

  if (carregando || !usuarios) return <p style={{ color: "var(--text-secondary)" }}>Carregando...</p>;

  const proCount = usuarios.filter(isProValido).length;

  return (
    <div>
      <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.25rem" }}>👥 Usuários</h2>
      <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: "1.5rem" }}>
        {usuarios.length} cadastrados · {proCount} Pro
        {usuarios.filter(u => u.pro_expiracao && new Date(u.pro_expiracao) < new Date(new Date().toDateString())).length > 0 &&
          ` · ${usuarios.filter(u => u.pro_expiracao && new Date(u.pro_expiracao) < new Date(new Date().toDateString())).length} expirados`}
      </p>

      <div style={{ overflowX: "auto", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "0.75rem" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8125rem" }}>
          <thead>
            <tr style={{ color: "var(--text-secondary)", borderBottom: "1px solid var(--border)" }}>
              <th style={{ textAlign: "left", padding: "0.5rem 0.75rem", fontWeight: 600 }}>Nome</th>
              <th style={{ textAlign: "left", padding: "0.5rem 0.75rem", fontWeight: 600 }}>Email</th>
              <th style={{ textAlign: "left", padding: "0.5rem 0.75rem", fontWeight: 600 }}>Plano</th>
              <th style={{ textAlign: "left", padding: "0.5rem 0.75rem", fontWeight: 600 }}>Exercícios</th>
              <th style={{ textAlign: "left", padding: "0.5rem 0.75rem", fontWeight: 600 }}>Raio-X</th>
              <th style={{ textAlign: "left", padding: "0.5rem 0.75rem", fontWeight: 600 }}>Streak</th>
              <th style={{ textAlign: "left", padding: "0.5rem 0.75rem", fontWeight: 600 }}>Criado</th>
              <th style={{ textAlign: "center", padding: "0.5rem 0.75rem", fontWeight: 600 }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u: any) => {
              const proValido = isProValido(u);
              const expirado = u.pro_expiracao && new Date(u.pro_expiracao) < new Date(new Date().toDateString());
              return (
                <tr key={u.id} style={{ borderBottom: "1px solid var(--border)", color: "var(--text-primary)", opacity: expirado ? 0.5 : 1 }}>
                  <td style={{ padding: "0.5rem 0.75rem", fontWeight: 500 }}>{u.nome || "-"}</td>
                  <td style={{ padding: "0.5rem 0.75rem", color: "var(--text-secondary)", fontSize: "0.75rem" }}>{u.email}</td>
                  <td style={{ padding: "0.5rem 0.75rem" }}>
                    <span style={{ fontSize: "0.65rem", fontWeight: 600, padding: "0.125rem 0.375rem", borderRadius: "0.25rem",
                      background: !proValido ? "#374151" : expirado ? "#7f1d1d" : "#166534",
                      color: !proValido ? "#9ca3af" : expirado ? "#fecaca" : "#dcfce7" }}>
                      {!proValido ? "gratis" : expirado ? "expirado" : "pro"}
                    </span>
                    {proValido && !u.pro_expiracao && <span style={{ fontSize: "0.6rem", color: "#4ade80", marginLeft: "0.25rem" }}>🔄</span>}
                  </td>
                  <td style={{ padding: "0.5rem 0.75rem", fontSize: "0.75rem" }}>
                    {u._exercicios || 0}
                  </td>
                  <td style={{ padding: "0.5rem 0.75rem", fontSize: "0.75rem" }}>
                    {u._analises || 0}
                    {u._analisePaga && <span style={{ marginLeft: "0.25rem", fontSize: "0.7rem" }}>💰</span>}
                  </td>
                  <td style={{ padding: "0.5rem 0.75rem", fontSize: "0.75rem" }}>{u.streak_atual || 0} 🔥</td>
                  <td style={{ padding: "0.5rem 0.75rem", fontSize: "0.75rem", color: "var(--text-secondary)" }}>{formatarData(u.created_at)}</td>
                  <td style={{ padding: "0.5rem 0.75rem", textAlign: "center", whiteSpace: "nowrap" }}>
                    <div style={{ display: "flex", gap: "0.25rem", alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
                      {proValido && u.pro_expiracao ? (
                        <button onClick={() => removerPro(u.id)}
                          style={{ padding: "0.2rem 0.4rem", fontSize: "0.65rem", background: "transparent", color: "#ef4444", border: "1px solid #ef4444", borderRadius: "0.25rem", cursor: "pointer" }}>
                          Remover Pro
                        </button>
                      ) : proValido && !u.pro_expiracao ? (
                        <span style={{ fontSize: "0.7rem", color: "var(--text-secondary)" }}>Pagante</span>
                      ) : (
                        <div style={{ display: "flex", gap: "0.2rem" }}>
                          {[7, 15, 30].map(d => (
                            <button key={d} onClick={() => tornarPro(u.id, d)} disabled={promovendo === u.id}
                              style={{ padding: "0.2rem 0.4rem", fontSize: "0.6rem", fontWeight: 600,
                                background: "var(--accent)", color: "#fff", border: "none", borderRadius: "0.25rem",
                                cursor: promovendo === u.id ? "not-allowed" : "pointer", opacity: promovendo === u.id ? 0.5 : 1 }}>
                              {d}d
                            </button>
                          ))}
                        </div>
                      )}
                      <button onClick={() => impersonar(u.email)} disabled={impersonando}
                        style={{ padding: "0.2rem 0.4rem", fontSize: "0.65rem", background: "transparent", color: "var(--accent)", border: "1px solid var(--accent)", borderRadius: "0.25rem", cursor: impersonando ? "not-allowed" : "pointer", opacity: impersonando ? 0.5 : 1, marginLeft: "0.25rem" }}>
                        🔍
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
