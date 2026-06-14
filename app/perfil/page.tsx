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
      const [progRes, etapasRes] = await Promise.all([
        fetch("/api/progresso"),
        fetch("/api/progresso?tipo=etapa_projeto"),
      ]);

      const prog = await progRes.json();
      const etapas = await etapasRes.json();
      setProgresso(prog.progresso || []);

      // Buscar projetos com etapas e progresso
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
      <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.25rem" }}>
        📊 Meu Progresso
      </h1>
      <p style={{ color: "var(--text-secondary)", fontSize: "0.9375rem", marginBottom: "2rem" }}>
        Acompanhe seu desempenho nos exercícios e projetos.
      </p>

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
