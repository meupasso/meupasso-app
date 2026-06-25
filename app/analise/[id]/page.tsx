"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

/* ====================================================================
   Tipos
   ==================================================================== */

interface SecaoItem {
  prioridade: string;
  titulo: string;
  detalhe: string;
  acao: string;
  /** usado em inconsistencias e recrutador */
  fonte?: string;
  contradicao?: string;
  /** usado no recrutador para classificar items */
  tipo?: string;
}

interface Secao {
  id: string;
  titulo: string;
  tipo:
    | "pontos_fortes"
    | "pontos_cegos"
    | "inconsistencias"
    | "recrutador"
    | "curriculo"
    | "linkedin"
    | "plano"
    | "vagas"
    | "scores";
  desbloqueada: boolean;
  items: SecaoItem[];
}

interface ScoreDimensao {
  valor: number;
  criterios: { item: string; aprovado: boolean; observacao: string }[];
  label?: string;
}

interface RelatorioFinal {
  titulo: string;
  subtitulo: string;
  scores: {
    perfil_profissional: ScoreDimensao;
    portfolio_tecnico: ScoreDimensao;
    presenca_online: ScoreDimensao;
    consistencia: ScoreDimensao;
    preparacao_para_vaga: ScoreDimensao;
  };
  veredicto_texto: string;
  secoes: Secao[];
  proximos_passos: string[];
  mensagem_final: string;
}

/* ====================================================================
   Helpers
   ==================================================================== */

function prioridadeColor(p: string) {
  switch (p) {
    case "alto":
      return { bg: "rgba(239,68,68,0.18)", color: "#f87171", label: "🔴 Alta" };
    case "medio":
      return { bg: "rgba(234,179,8,0.18)", color: "#eab308", label: "🟡 Média" };
    default:
      return { bg: "rgba(100,100,100,0.18)", color: "#9d9d9d", label: "⚪ Baixa" };
  }
}

function calcScoreMedio(scores?: Record<string, {valor: number}>): number {
  if (!scores) return 0;
  const vals = Object.values(scores).filter((s): s is {valor: number} => typeof s.valor === "number");
  return vals.length ? Math.round(vals.reduce((a, s) => a + s.valor, 0) / vals.length) : 0;
}

function copyText(text: string, label: string) {
  navigator.clipboard.writeText(text).then(() => {
    alert(`${label} copiado!`);
  });
}

function formatCurriculoCompleto(curriculo: any): string {
  if (!curriculo) return "";
  const parts: string[] = [];
  if (curriculo.resumo_profissional) parts.push(`RESUMO PROFISSIONAL\n${curriculo.resumo_profissional}\n`);
  if (curriculo.experiencias?.length) {
    parts.push("EXPERIÊNCIA PROFISSIONAL");
    for (const e of curriculo.experiencias) {
      parts.push(`\n${e.cargo} | ${e.empresa} | ${e.periodo}`);
      if (e.bullets?.length) parts.push(e.bullets.map((b: string) => `  • ${b}`).join("\n"));
    }
    parts.push("");
  }
  if (curriculo.projetos?.length) {
    parts.push("PROJETOS");
    for (const p of curriculo.projetos) {
      parts.push(`\n${p.nome} — ${p.descricao}`);
      if (p.tecnologias?.length) parts.push(`  Tecnologias: ${p.tecnologias.join(", ")}`);
    }
  }
  return parts.join("\n");
}

function formatLinkedinCompleto(linkedin: any): string {
  if (!linkedin) return "";
  const parts: string[] = [];
  if (linkedin.headline) parts.push(`HEADLINE\n${linkedin.headline}\n`);
  if (linkedin.sobre) parts.push(`SOBRE\n${linkedin.sobre}\n`);
  if (linkedin.experiencias?.length) {
    parts.push("EXPERIÊNCIA");
    for (const e of linkedin.experiencias) {
      parts.push(`\n${e.cargo} | ${e.empresa} | ${e.periodo}`);
      if (e.descricao) parts.push(`  ${e.descricao}`);
    }
    parts.push("");
  }
  if (linkedin.competencias_sugeridas?.length) {
    parts.push(`Competências sugeridas: ${linkedin.competencias_sugeridas.join(", ")}`);
  }
  return parts.join("\n");
}

/* ====================================================================
   Componentes de seção
   ==================================================================== */

function SecaoPontosFortes({ items }: { items: SecaoItem[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            gap: 14,
            padding: "14px 16px",
            borderRadius: 10,
            background: "rgba(74,222,128,0.08)",
            border: "1px solid rgba(74,222,128,0.2)",
            alignItems: "flex-start",
          }}
        >
          <span style={{ fontSize: 20, flexShrink: 0, marginTop: 2 }}>✅</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, color: "#4ade80", fontSize: 14, marginBottom: 4 }}>{item.titulo}</div>
            {item.detalhe && (
              <p style={{ color: "var(--text-secondary)", fontSize: 13, margin: 0, lineHeight: 1.5 }}>{item.detalhe}</p>
            )}
            {item.acao && (
              <p style={{ color: "#4ade80", fontSize: 13, margin: "6px 0 0", opacity: 0.8 }}>→ {item.acao}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function SecaoPontosCegos({ items }: { items: SecaoItem[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {items.map((item, i) => {
        const pc = prioridadeColor(item.prioridade);
        return (
          <div
            key={i}
            style={{
              padding: "14px 16px",
              borderRadius: 10,
              background: pc.bg,
              border: `1px solid ${pc.color}20`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <span style={{ padding: "2px 10px", borderRadius: 999, fontSize: 11, fontWeight: 700, background: pc.bg, color: pc.color }}>
                {pc.label}
              </span>
              <span style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: 14 }}>{item.titulo}</span>
            </div>
            {item.detalhe && (
              <p style={{ color: "var(--text-secondary)", fontSize: 13, margin: "0 0 6px", lineHeight: 1.5 }}>{item.detalhe}</p>
            )}
            {item.acao && (
              <p style={{ color: pc.color, fontSize: 13, margin: 0, fontWeight: 500 }}>→ {item.acao}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

function SecaoInconsistencias({ items }: { items: SecaoItem[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            padding: "14px 16px",
            borderRadius: 10,
            background: "rgba(234,179,8,0.06)",
            border: "1px solid rgba(234,179,8,0.15)",
          }}
        >
          <div style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: 14, marginBottom: 6 }}>{item.titulo}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>
            {item.fonte && !item.contradicao && (
              <p style={{ margin: 0 }}>
                <span style={{ color: "#4ade80" }}>📌 Declarado em:</span> {item.fonte}
              </p>
            )}
            {item.fonte && item.contradicao && (
              <>
                <p style={{ margin: 0 }}>
                  <span style={{ color: "#eab308" }}>📌 Declarado em:</span> {item.fonte}
                </p>
                <p style={{ margin: 0 }}>
                  <span style={{ color: "#f87171" }}>⚠️ Contradito por:</span> {item.contradicao}
                </p>
              </>
            )}
            {item.detalhe && <p style={{ margin: "6px 0 0", fontStyle: "italic" }}>"{item.detalhe}"</p>}
          </div>
        </div>
      ))}
    </div>
  );
}

function SecaoRecrutador({ items }: { items: SecaoItem[] }) {
  // Items do recrutador: o primeiro é primeira impressão, os demais são listas
  const primeiraImp = items.find((i) => i.tipo === "primeira_impressao" || (!i.prioridade && !i.tipo))?.detalhe || "";
  const positivos = items.filter((i) => i.tipo === "positivo").map((i) => i.detalhe).filter(Boolean);
  const hesitacoes = items.filter((i) => i.tipo === "hesitacao").map((i) => i.detalhe).filter(Boolean);
  const descartes = items.filter((i) => i.tipo === "descarte").map((i) => i.detalhe).filter(Boolean);
  const conselho = items.find((i) => i.tipo === "conselho")?.acao || "";

  // Se os items seguem a estrutura padrão sem tipo, tentamos renderizar por posição
  const renderPorPosicao = !positivos.length && items.length > 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {/* Primeira impressão */}
      <div
        style={{
          padding: "16px 20px",
          borderRadius: 10,
          background: "var(--bg-secondary)",
          border: "1px solid var(--border)",
          textAlign: "center" as const,
        }}
      >
        <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
          Primeira Impressão
        </div>
        <p style={{ color: "var(--text-primary)", fontSize: 15, lineHeight: 1.6, margin: 0, fontStyle: "italic" }}>
          {(renderPorPosicao && items[0]?.detalhe) || primeiraImp || "—"}
        </p>
      </div>

      {renderPorPosicao ? (
        <>
          {/* O que chamou atenção */}
          {items[1]?.detalhe && (
            <div style={cardRecrutador("positivo")}>
              <div style={{ ...cardRecrutadorTitulo("positivo") }}>
                <span>👍</span> O que chamou atenção positivamente
              </div>
              <ListItem texto={items[1].detalhe} cor="#4ade80" />
            </div>
          )}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {items[2]?.detalhe && (
              <div style={cardRecrutador("hesitacao")}>
                <div style={{ ...cardRecrutadorTitulo("hesitacao") }}>🤔 Causou hesitação</div>
                <ListItem texto={items[2].detalhe} cor="#eab308" />
              </div>
            )}
            {items[3]?.detalhe && (
              <div style={cardRecrutador("descarte")}>
                <div style={{ ...cardRecrutadorTitulo("descarte") }}>❌ Descartaria</div>
                <ListItem texto={items[3].detalhe} cor="#f87171" />
              </div>
            )}
          </div>
          {/* Veredito */}
          {items[4] && (
            <div style={{ padding: "14px 16px", borderRadius: 10, background: items[4].detalhe?.includes("sim") || items[4].detalhe?.includes("Sim") ? "rgba(74,222,128,0.08)" : "rgba(239,68,68,0.08)", border: "1px solid var(--border)", textAlign: "center" as const }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>
                {items[4].detalhe?.includes("sim") || items[4].detalhe?.includes("Sim") ? "✅ Passaria para próxima fase" : "⛔ Não passaria"}
              </div>
              {items[4].acao && <p style={{ color: "var(--text-secondary)", fontSize: 13, margin: 0 }}>{items[4].acao}</p>}
            </div>
          )}
          {items[5]?.acao && (
            <div style={{ padding: "14px 16px", borderRadius: 10, background: "rgba(86,156,214,0.1)", border: "1px solid rgba(86,156,214,0.2)" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>🎯 Conselho direto</div>
              <p style={{ color: "var(--accent)", fontSize: 14, lineHeight: 1.5, margin: 0 }}>{items[5].acao}</p>
            </div>
          )}
        </>
      ) : (
        <>
          {positivos.length > 0 && (
            <div style={cardRecrutador("positivo")}>
              <div style={{ ...cardRecrutadorTitulo("positivo") }}>👍 O que chamou atenção</div>
              {positivos.map((p, i) => <ListItem key={i} texto={p} cor="#4ade80" />)}
            </div>
          )}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {hesitacoes.length > 0 && (
              <div style={cardRecrutador("hesitacao")}>
                <div style={{ ...cardRecrutadorTitulo("hesitacao") }}>🤔 Causou hesitação</div>
                {hesitacoes.map((h, i) => <ListItem key={i} texto={h} cor="#eab308" />)}
              </div>
            )}
            {descartes.length > 0 && (
              <div style={cardRecrutador("descarte")}>
                <div style={{ ...cardRecrutadorTitulo("descarte") }}>❌ Descartaria</div>
                {descartes.map((d, i) => <ListItem key={i} texto={d} cor="#f87171" />)}
              </div>
            )}
          </div>
          {conselho && (
            <div style={{ padding: "14px 16px", borderRadius: 10, background: "rgba(86,156,214,0.1)", border: "1px solid rgba(86,156,214,0.2)" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>🎯 Conselho direto</div>
              <p style={{ color: "var(--accent)", fontSize: 14, lineHeight: 1.5, margin: 0 }}>{conselho}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

/* ====================================================================
   Componente de Scores (5 cards de dimensão)
   ==================================================================== */

const DIMENSOES_LABELS: Record<string, { label: string; icon: string; desc: string }> = {
  perfil_profissional: { label: "Perfil Profissional", icon: "👤", desc: "Curriculo, formacao e experiencias" },
  portfolio_tecnico: { label: "Portfolio Tecnico", icon: "💻", desc: "Projetos, GitHub e codigo" },
  presenca_online: { label: "Presenca Online", icon: "🌐", desc: "LinkedIn e posicionamento digital" },
  consistencia: { label: "Consistencia", icon: "🎯", desc: "Alinhamento entre as fontes de informacao" },
  preparacao_para_vaga: { label: "Preparacao para a Vaga", icon: "🚀", desc: "Compatibilidade com o cargo desejado" },
};

function SecaoScores({ scores, objetivoVaga }: { scores: any; objetivoVaga?: string }) {
  if (!scores) return null;
  const dims = Object.entries(scores) as [string, any][];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
      {dims.map(([key, dim]) => {
        const info = DIMENSOES_LABELS[key];
        const isPreparacao = key === "preparacao_para_vaga";
        const displayLabel = key === "preparacao_para_vaga"
          ? (dim.label || info?.label || "Preparacao para a Vaga")
          : (info?.label || key);

        return (
          <div key={key} style={{
            padding: "1.25rem",
            borderRadius: 12,
            background: isPreparacao ? "linear-gradient(135deg, rgba(86,156,214,0.12), rgba(59,130,246,0.08))" : "var(--bg-secondary)",
            border: isPreparacao ? "2px solid rgba(86,156,214,0.3)" : "1px solid var(--border)",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <span style={{ fontSize: 20, marginRight: 6 }}>{info?.icon || "📊"}</span>
                <span style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: 13 }}>{displayLabel}</span>
              </div>
              <div style={{ textAlign: "right" as const }}>
                <span style={{ fontSize: 24, fontWeight: 700, color: dim.valor >= 70 ? "#4ade80" : dim.valor >= 40 ? "#eab308" : "#f87171", lineHeight: 1 }}>{dim.valor}</span>
                <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>/100</span>
              </div>
            </div>
            {dim.criterios?.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 4 }}>
                {dim.criterios.map((c: any, i: number) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 6, fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.4 }}>
                    <span style={{ flexShrink: 0, marginTop: 1, fontSize: 13 }}>
                      {c.aprovado ? <span style={{ color: "#4ade80" }}>✓</span> : <span style={{ color: "#f87171" }}>✗</span>}
                    </span>
                    <span>{c.item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ---------- subcomponentes do recrutador ---------- */

function ListItem({ texto, cor }: { texto: string; cor: string }) {
  return (
    <p style={{ color: "var(--text-primary)", fontSize: 13, lineHeight: 1.5, margin: "4px 0", paddingLeft: 8, borderLeft: `2px solid ${cor}` }}>
      {texto}
    </p>
  );
}

function cardRecrutador(tipo: string): React.CSSProperties {
  const cores: Record<string, { bg: string; border: string }> = {
    positivo: { bg: "rgba(74,222,128,0.06)", border: "rgba(74,222,128,0.15)" },
    hesitacao: { bg: "rgba(234,179,8,0.06)", border: "rgba(234,179,8,0.15)" },
    descarte: { bg: "rgba(239,68,68,0.06)", border: "rgba(239,68,68,0.15)" },
  };
  const c = cores[tipo] || cores.hesitacao;
  return {
    padding: "14px 16px",
    borderRadius: 10,
    background: c.bg,
    border: `1px solid ${c.border}`,
  };
}

function cardRecrutadorTitulo(tipo: string): React.CSSProperties {
  const colors: Record<string, string> = {
    positivo: "#4ade80",
    hesitacao: "#eab308",
    descarte: "#f87171",
  };
  return {
    fontSize: 12,
    fontWeight: 700,
    color: colors[tipo] || "var(--text-secondary)",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
    marginBottom: 8,
  };
}

/* ---------- Seção Currículo ---------- */

function SecaoCurriculo({ curriculo }: { curriculo: any }) {
  if (!curriculo) {
    return <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>Conteúdo não disponível.</p>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ textAlign: "right" as const }}>
        <button style={btnCopiar} onClick={() => copyText(formatCurriculoCompleto(curriculo), "Currículo reescrito")}>
          📋 Copiar tudo
        </button>
      </div>

      {curriculo.resumo_profissional && (
        <div style={curriculoBloco}>
          <div style={curriculoBlocoLabel}>Resumo Profissional</div>
          <p style={{ color: "var(--text-primary)", fontSize: 14, lineHeight: 1.6, margin: 0 }}>{curriculo.resumo_profissional}</p>
        </div>
      )}

      {curriculo.experiencias?.length > 0 && (
        <div style={curriculoBloco}>
          <div style={curriculoBlocoLabel}>Experiência Profissional</div>
          {curriculo.experiencias.map((exp: any, i: number) => (
            <div key={i} style={{ marginBottom: i < curriculo.experiencias.length - 1 ? 14 : 0, paddingBottom: i < curriculo.experiencias.length - 1 ? 14 : 0, borderBottom: i < curriculo.experiencias.length - 1 ? "1px solid var(--border)" : "none" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <div>
                  <span style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: 14 }}>{exp.cargo}</span>
                  <span style={{ color: "var(--text-secondary)", fontSize: 13 }}> — {exp.empresa}</span>
                </div>
                <span style={{ color: "var(--text-secondary)", fontSize: 12 }}>{exp.periodo}</span>
              </div>
              {exp.bullets?.length > 0 && (
                <ul style={{ margin: "6px 0 0", paddingLeft: 18, color: "var(--text-secondary)", fontSize: 13, lineHeight: 1.6 }}>
                  {exp.bullets.map((b: string, j: number) => (
                    <li key={j} style={{ marginBottom: 4 }}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {curriculo.projetos?.length > 0 && (
        <div style={curriculoBloco}>
          <div style={curriculoBlocoLabel}>Projetos</div>
          {curriculo.projetos.map((proj: any, i: number) => (
            <div key={i} style={{ marginBottom: 10, padding: "10px 12px", background: "var(--bg-secondary)", borderRadius: 8 }}>
              <div style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: 14 }}>{proj.nome}</div>
              {proj.descricao && <p style={{ color: "var(--text-secondary)", fontSize: 13, margin: "4px 0" }}>{proj.descricao}</p>}
              {proj.tecnologias?.length > 0 && (
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 6 }}>
                  {proj.tecnologias.map((t: string, j: number) => (
                    <span key={j} style={{ padding: "2px 8px", borderRadius: 999, background: "rgba(86,156,214,0.15)", color: "var(--accent)", fontSize: 11, fontWeight: 600 }}>{t}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- Seção LinkedIn ---------- */

function SecaoLinkedin({ linkedin }: { linkedin: any }) {
  if (!linkedin) {
    return <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>Conteúdo não disponível.</p>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ textAlign: "right" as const }}>
        <button style={btnCopiar} onClick={() => copyText(formatLinkedinCompleto(linkedin), "LinkedIn reescrito")}>
          📋 Copiar tudo
        </button>
      </div>

      {linkedin.headline && (
        <div style={curriculoBloco}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={curriculoBlocoLabel}>Headline</div>
            <button style={btnCopiarPq} onClick={() => copyText(linkedin.headline, "Headline")}>📋</button>
          </div>
          <p style={{ color: "var(--accent)", fontSize: 15, fontWeight: 500, margin: 0 }}>{linkedin.headline}</p>
        </div>
      )}

      {linkedin.sobre && (
        <div style={curriculoBloco}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={curriculoBlocoLabel}>Sobre</div>
            <button style={btnCopiarPq} onClick={() => copyText(linkedin.sobre, "Sobre do LinkedIn")}>📋</button>
          </div>
          <p style={{ color: "var(--text-primary)", fontSize: 14, lineHeight: 1.7, margin: 0, whiteSpace: "pre-wrap" }}>{linkedin.sobre}</p>
        </div>
      )}

      {linkedin.experiencias?.length > 0 && (
        <div style={curriculoBloco}>
          <div style={curriculoBlocoLabel}>Experiência</div>
          {linkedin.experiencias.map((exp: any, i: number) => (
            <div key={i} style={{ marginBottom: i < linkedin.experiencias.length - 1 ? 14 : 0, paddingBottom: i < linkedin.experiencias.length - 1 ? 14 : 0, borderBottom: i < linkedin.experiencias.length - 1 ? "1px solid var(--border)" : "none" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <div>
                  <span style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: 14 }}>{exp.cargo}</span>
                  <span style={{ color: "var(--text-secondary)", fontSize: 13 }}> — {exp.empresa}</span>
                </div>
                <span style={{ color: "var(--text-secondary)", fontSize: 12 }}>{exp.periodo}</span>
              </div>
              {exp.descricao && <p style={{ color: "var(--text-secondary)", fontSize: 13, lineHeight: 1.5, margin: "4px 0 0" }}>{exp.descricao}</p>}
            </div>
          ))}
        </div>
      )}

      {linkedin.competencias_sugeridas?.length > 0 && (
        <div style={curriculoBloco}>
          <div style={curriculoBlocoLabel}>Competências sugeridas</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {linkedin.competencias_sugeridas.map((c: string, i: number) => (
              <span key={i} style={{ padding: "4px 12px", borderRadius: 999, background: "rgba(86,156,214,0.12)", color: "var(--accent)", fontSize: 12, fontWeight: 500 }}>{c}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const curriculoBloco: React.CSSProperties = {
  padding: "14px 16px",
  borderRadius: 10,
  background: "var(--bg-secondary)",
  border: "1px solid var(--border)",
};

const curriculoBlocoLabel: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  color: "var(--text-secondary)",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  marginBottom: 8,
};

const btnCopiar: React.CSSProperties = {
  background: "rgba(86,156,214,0.15)",
  color: "var(--accent)",
  border: "1px solid rgba(86,156,214,0.3)",
  borderRadius: 8,
  padding: "8px 16px",
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
};

const btnCopiarPq: React.CSSProperties = {
  background: "transparent",
  color: "var(--text-secondary)",
  border: "1px solid var(--border)",
  borderRadius: 6,
  padding: "4px 8px",
  fontSize: 13,
  cursor: "pointer",
};

/* ---------- Seção Plano ---------- */

function SecaoPlano({ plano }: { plano: any }) {
  if (!plano?.plano?.length) {
    return <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>Plano não disponível.</p>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {/* Resumo */}
      <div style={{ display: "flex", gap: 16, marginBottom: 20, flexWrap: "wrap" }}>
        {plano.duracao_total_semanas > 0 && (
          <div style={resumoBolha}>
            <span style={{ fontSize: 20 }}>📅</span>
            <span style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: 14 }}>{plano.duracao_total_semanas} semanas</span>
          </div>
        )}
        {plano.dedicacao_diaria_minutos > 0 && (
          <div style={resumoBolha}>
            <span style={{ fontSize: 20 }}>⏱️</span>
            <span style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: 14 }}>{plano.dedicacao_diaria_minutos} min/dia</span>
          </div>
        )}
      </div>

      {/* Timeline */}
      <div style={{ position: "relative", paddingLeft: 32 }}>
        {/* Linha vertical de timeline */}
        <div style={{ position: "absolute", left: 14, top: 0, bottom: 0, width: 2, background: "var(--border)" }} />

        {plano.plano.map((semana: any, i: number) => (
          <div key={i} style={{ position: "relative", marginBottom: 24 }}>
            {/* Bolinha na timeline */}
            <div
              style={{
                position: "absolute",
                left: -26,
                top: 6,
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: "var(--accent)",
                border: "3px solid var(--bg-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1,
              }}
            >
              <span style={{ color: "#fff", fontSize: 10, fontWeight: 700 }}>{semana.semana}</span>
            </div>

            {/* Card da semana */}
            <div style={{ padding: "14px 16px", borderRadius: 10, background: "var(--bg-secondary)", border: "1px solid var(--border)", marginLeft: 8 }}>
              <div style={{ fontWeight: 700, color: "var(--accent)", fontSize: 14, marginBottom: 4 }}>
                Semana {semana.semana} — {semana.foco}
              </div>
              {semana.por_que_essa_semana && (
                <p style={{ color: "var(--text-secondary)", fontSize: 12, lineHeight: 1.5, margin: "0 0 10px", fontStyle: "italic" }}>
                  {semana.por_que_essa_semana}
                </p>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {semana.items?.map((item: any, j: number) => (
                  <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 10px", borderRadius: 8, background: "rgba(0,0,0,0.15)" }}>
                    <span style={{ fontSize: 16, flexShrink: 0 }}>
                      {item.tipo === "externo" ? "🔗" : item.tipo === "projeto" ? "🚀" : "📖"}
                    </span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontWeight: 500, color: "var(--text-primary)", fontSize: 13 }}>
                          {item.tipo === "externo" && item.url_externa && item.url_externa !== "#" && !item.url_externa.includes("meupasso.com.br") ? (
                            <a href={item.url_externa} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)", textDecoration: "underline" }}>
                              {item.titulo}
                            </a>
                          ) : item.slug ? (
                            <Link href={`/exercicios/${item.slug}`} style={{ color: "var(--accent)", textDecoration: "underline" }}>
                              {item.titulo}
                            </Link>
                          ) : (
                            item.titulo
                          )}
                        </span>
                        <span style={{ color: "var(--text-secondary)", fontSize: 11, flexShrink: 0 }}>
                          {item.tempo_estimado_horas}h
                        </span>
                      </div>
                      {item.motivo && <p style={{ color: "var(--text-secondary)", fontSize: 12, margin: "2px 0 0", lineHeight: 1.4 }}>{item.motivo}</p>}
                      {item.resolve && <p style={{ color: "rgba(74,222,128,0.8)", fontSize: 11, margin: "2px 0 0", fontWeight: 500 }}>Resolve: {item.resolve}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {plano.mensagem_motivacional && (
        <p style={{ color: "var(--accent)", fontSize: 14, textAlign: "center", margin: "8px 0 0", fontStyle: "italic" }}>
          "{plano.mensagem_motivacional}"
        </p>
      )}
    </div>
  );
}

const resumoBolha: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  padding: "10px 16px",
  borderRadius: 999,
  background: "rgba(86,156,214,0.1)",
  border: "1px solid rgba(86,156,214,0.2)",
};

/* ---------- Seção Vagas ---------- */

function SecaoVagas({ vagas }: { vagas: any }) {
  if (!vagas) {
    return <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>Vagas não disponíveis.</p>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Status geral */}
      {vagas.pronto_para_aplicar !== undefined && (
        <div
          style={{
            textAlign: "center" as const,
            padding: "14px 20px",
            borderRadius: 10,
            background: vagas.pronto_para_aplicar ? "rgba(74,222,128,0.1)" : "rgba(239,68,68,0.1)",
            border: `1px solid ${vagas.pronto_para_aplicar ? "rgba(74,222,128,0.2)" : "rgba(239,68,68,0.2)"}`,
          }}
        >
          <span style={{ fontSize: 24, marginRight: 8 }}>
            {vagas.pronto_para_aplicar ? "✅" : "⏳"}
          </span>
          <span style={{ fontWeight: 700, color: vagas.pronto_para_aplicar ? "#4ade80" : "#f87171", fontSize: 15 }}>
            {vagas.pronto_para_aplicar ? "Você já pode aplicar para vagas!" : "Ainda não está pronto para aplicar"}
          </span>
        </div>
      )}

      {/* Três colunas */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
        <ColunaVaga
          titulo="Agora"
          cor="#4ade80"
          icon="🚀"
          items={vagas.vagas_compativeis_agora}
          renderItem={(v: any) => (
            <>
              <div style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: 13 }}>{v.titulo}</div>
              <div style={{ color: "#4ade80", fontSize: 11, fontWeight: 600, margin: "2px 0" }}>{v.nivel}</div>
              <p style={{ color: "var(--text-secondary)", fontSize: 12, lineHeight: 1.4, margin: "4px 0" }}>{v.por_que_compativel}</p>
              {v.tecnologias_que_batem?.length > 0 && (
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginTop: 4 }}>
                  {v.tecnologias_que_batem.map((t: string, i: number) => (
                    <span key={i} style={{ padding: "1px 6px", borderRadius: 999, background: "rgba(74,222,128,0.1)", color: "#4ade80", fontSize: 10 }}>{t}</span>
                  ))}
                </div>
              )}
              {v.o_que_ainda_falta && (
                <p style={{ color: "#f87171", fontSize: 11, margin: "4px 0 0", fontStyle: "italic" }}>⚠️ {v.o_que_ainda_falta}</p>
              )}
            </>
          )}
        />
        <ColunaVaga
          titulo="Em 30 dias"
          cor="#eab308"
          icon="📅"
          items={vagas.vagas_em_30_dias}
          renderItem={(v: any) => (
            <>
              <div style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: 13 }}>{v.titulo}</div>
              {v.o_que_precisa_fazer_antes && (
                <p style={{ color: "var(--text-secondary)", fontSize: 12, lineHeight: 1.4, margin: "4px 0 0" }}>
                  <span style={{ color: "#eab308" }}>🎯</span> {v.o_que_precisa_fazer_antes}
                </p>
              )}
            </>
          )}
        />
        <ColunaVaga
          titulo="Em 90 dias"
          cor="#9d9d9d"
          icon="🎯"
          items={vagas.vagas_em_90_dias}
          renderItem={(v: any) => (
            <>
              <div style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: 13 }}>{v.titulo}</div>
              {v.o_que_precisa_fazer_antes && (
                <p style={{ color: "var(--text-secondary)", fontSize: 12, lineHeight: 1.4, margin: "4px 0 0" }}>
                  <span style={{ color: "#9d9d9d" }}>🎯</span> {v.o_que_precisa_fazer_antes}
                </p>
              )}
            </>
          )}
        />
      </div>

      {vagas.mensagem && (
        <p style={{ color: "var(--text-secondary)", fontSize: 13, textAlign: "center", margin: 0, fontStyle: "italic" }}>
          {vagas.mensagem}
        </p>
      )}
    </div>
  );
}

function ColunaVaga({
  titulo,
  cor,
  icon,
  items,
  renderItem,
}: {
  titulo: string;
  cor: string;
  icon: string;
  items: any[];
  renderItem: (item: any) => React.ReactNode;
}) {
  return (
    <div
      style={{
        padding: "14px",
        borderRadius: 10,
        background: "var(--bg-secondary)",
        border: `1px solid ${cor}25`,
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <div style={{ textAlign: "center" as const, paddingBottom: 10, borderBottom: `1px solid ${cor}25`, marginBottom: 4 }}>
        <span style={{ fontSize: 20 }}>{icon}</span>
        <div style={{ fontWeight: 700, color: cor, fontSize: 14, marginTop: 2 }}>{titulo}</div>
      </div>
      {items?.length > 0 ? (
        items.map((v: any, i: number) => (
          <div key={i} style={{ padding: "10px", borderRadius: 8, background: "rgba(0,0,0,0.15)", border: "1px solid var(--border)" }}>
            {renderItem(v)}
          </div>
        ))
      ) : (
        <p style={{ color: "var(--text-secondary)", fontSize: 12, textAlign: "center", padding: "16px 0" }}>
          Nenhuma vaga listada
        </p>
      )}
    </div>
  );
}

/* ====================================================================
   Renderizador de seção — dispatches pelo tipo
   ==================================================================== */

function renderSecao(secao: Secao, analise: any) {
  const common = { key: secao.id, style: secaoStyle };

  switch (secao.tipo) {
    case "pontos_fortes":
      return (
        <div key={secao.id} style={secaoStyle}>
          <h3 style={secaoTitle}>
            <span style={{ marginRight: 8 }}>💪</span>
            {secao.titulo}
          </h3>
          <SecaoPontosFortes items={secao.items} />
        </div>
      );

    case "pontos_cegos":
      return (
        <div key={secao.id} style={secaoStyle}>
          <h3 style={secaoTitle}>
            <span style={{ marginRight: 8 }}>🔍</span>
            {secao.titulo}
          </h3>
          <SecaoPontosCegos items={secao.items} />
        </div>
      );

    case "inconsistencias":
      return (
        <div key={secao.id} style={secaoStyle}>
          <h3 style={secaoTitle}>
            <span style={{ marginRight: 8 }}>⚡</span>
            {secao.titulo}
          </h3>
          <SecaoInconsistencias items={secao.items} />
        </div>
      );

    case "recrutador":
      return (
        <div key={secao.id} style={secaoStyle}>
          <h3 style={secaoTitle}>
            <span style={{ marginRight: 8 }}>👀</span>
            {secao.titulo}
          </h3>
          <SecaoRecrutador items={secao.items} />
        </div>
      );

    case "curriculo":
      return (
        <div key={secao.id} style={{ ...secaoStyle, borderColor: "rgba(86,156,214,0.3)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ ...secaoTitle, margin: 0 }}>
              <span style={{ marginRight: 8 }}>✍️</span>
              {secao.titulo}
            </h3>
          </div>
          <SecaoCurriculo curriculo={analise?.json_curriculo_reescrito} />
        </div>
      );

    case "linkedin":
      return (
        <div key={secao.id} style={{ ...secaoStyle, borderColor: "rgba(86,156,214,0.3)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ ...secaoTitle, margin: 0 }}>
              <span style={{ marginRight: 8 }}>💼</span>
              {secao.titulo}
            </h3>
          </div>
          <SecaoLinkedin linkedin={analise?.json_linkedin_reescrito} />
        </div>
      );

    case "plano":
      return (
        <div key={secao.id} style={{ ...secaoStyle, borderColor: "rgba(86,156,214,0.3)" }}>
          <h3 style={secaoTitle}>
            <span style={{ marginRight: 8 }}>📚</span>
            {secao.titulo}
          </h3>
          <SecaoPlano plano={analise?.json_plano} />
        </div>
      );

    case "vagas":
      return (
        <div key={secao.id} style={{ ...secaoStyle, borderColor: "rgba(86,156,214,0.3)" }}>
          <h3 style={secaoTitle}>
            <span style={{ marginRight: 8 }}>🏢</span>
            {secao.titulo}
          </h3>
          <SecaoVagas vagas={analise?.json_vagas} />
        </div>
      );

    case "scores":
      const scores = analise?.json_relatorio_final?.scores || analise?.json_o_que_falta?.scores;
      return (
        <div key={secao.id} style={{ ...secaoStyle, borderColor: "rgba(86,156,214,0.3)" }}>
          <h3 style={secaoTitle}>
            <span style={{ marginRight: 8 }}>📊</span>
            {secao.titulo}
          </h3>
          <SecaoScores scores={scores} objetivoVaga={analise?.objetivo_vaga} />
        </div>
      );

    default:
      return (
        <div key={secao.id} style={secaoStyle}>
          <h3 style={secaoTitle}>{secao.titulo}</h3>
          <SecaoPontosCegos items={secao.items} />
        </div>
      );
  }
}

/* ====================================================================
   Página principal
   ==================================================================== */

export default function RelatorioPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params?.id as string;
  const statusParam = searchParams?.get("status");

  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [autenticado, setAutenticado] = useState<boolean | null>(null);
  const [relatorio, setRelatorio] = useState<RelatorioFinal | null>(null);
  const [analise, setAnalise] = useState<any>(null);
  const [pagamentoOk, setPagamentoOk] = useState(statusParam === "success");
  const [erro, setErro] = useState("");
  const [mostrarSecao, setMostrarSecao] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!id) return;

    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setAutenticado(false);
        setLoading(false);
        return;
      }
      setAutenticado(true);

      const { data, error } = await supabase
        .from("analises_empregabilidade")
        .select("*")
        .eq("id", id)
        .eq("user_id", user.id)
        .single();

      if (error || !data) {
        setErro("Análise não encontrada");
        setLoading(false);
        return;
      }

      setAnalise(data);

      if (statusParam === "success" && !data.pago) {
        let tentativas = 0;
        const pollPago = setInterval(async () => {
          tentativas++;
          const { data: updated } = await supabase
            .from("analises_empregabilidade")
            .select("pago, json_relatorio_final")
            .eq("id", id)
            .single();

          if (updated?.pago) {
            setPagamentoOk(true);
            setAnalise((prev: any) => ({ ...prev, pago: true, json_relatorio_final: updated.json_relatorio_final }));
            if (updated.json_relatorio_final) {
              setRelatorio(updated.json_relatorio_final as RelatorioFinal);
            }
            clearInterval(pollPago);
            setLoading(false);
          } else if (tentativas >= 5) {
            clearInterval(pollPago);
            setLoading(false);
          }
        }, 3000);
        return;
      }

      if (data.pago && data.json_relatorio_final) {
        setRelatorio(data.json_relatorio_final as RelatorioFinal);
      }

      setLoading(false);
    })();
  }, [id, supabase, statusParam]);

  /* --- toggle seções (accordion mobile) --- */
  const toggleSecao = (id: string) => {
    setMostrarSecao((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  /* --- loading --- */
  if (loading) {
    return (
      <div style={pageStyle}>
        <div style={centerBox}>
          <div style={{ color: "var(--accent)", fontSize: 32, marginBottom: 16 }} className="spin">●</div>
          <p style={{ color: "var(--text-secondary)" }}>Carregando relatório...</p>
          <style>{`.spin { animation: spin 1s ease-in-out infinite; } @keyframes spin { 0%,100% { opacity: 0.3; } 50% { opacity: 1; } }`}</style>
        </div>
      </div>
    );
  }

  /* --- não autenticado --- */
  if (autenticado === false) {
    return (
      <div style={pageStyle}>
        <div style={centerBox}>
          <span style={{ fontSize: 48, marginBottom: 16 }}>🔒</span>
          <h2 style={{ color: "var(--text-primary)", margin: "0 0 8px" }}>Faça login</h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: 24 }}>Você precisa estar logado para ver este relatório.</p>
          <Link href="/entrar" style={primaryBtn}>Entrar</Link>
        </div>
      </div>
    );
  }

  /* --- erro --- */
  if (erro) {
    return (
      <div style={pageStyle}>
        <div style={centerBox}>
          <span style={{ fontSize: 48, marginBottom: 16 }}>⚠️</span>
          <h2 style={{ color: "var(--text-primary)", margin: "0 0 8px" }}>{erro}</h2>
          <Link href="/analise" style={linkStyle}>← Voltar</Link>
        </div>
      </div>
    );
  }

  /* --- não pago --- */
  if (!pagamentoOk && analise && !analise.pago) {
    return (
      <div style={pageStyle}>
        <div style={centerBox}>
          <span style={{ fontSize: 48, marginBottom: 16 }}>🔒</span>
          <h2 style={{ color: "var(--text-primary)", margin: "0 0 8px" }}>Relatório bloqueado</h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: 8 }}>
            {statusParam === "success" ? "Seu pagamento está sendo processado." : "Você ainda não desbloqueou o relatório completo."}
          </p>
          {statusParam === "success" ? (
            <button onClick={() => window.location.reload()} style={primaryBtn}>Tentar novamente</button>
          ) : (
            <Link href="/analise" style={primaryBtn}>Voltar</Link>
          )}
        </div>
      </div>
    );
  }

  /* ========== RELATÓRIO ========== */
  const r = relatorio;

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        {statusParam === "success" && (
          <div style={successBannerStyle}>
            <span style={{ fontSize: 24 }}>🎉</span>
            <span style={{ fontWeight: 600 }}>Pagamento confirmado!</span>
            <span style={{ fontSize: 14, opacity: 0.85 }}>Seu relatório está liberado.</span>
          </div>
        )}

        {r && (
          <>
            {/* Header com score */}
            <div style={headerStyle}>
              <h1 style={tituloStyle}>{r.titulo || "Relatório de Empregabilidade"}</h1>
              {r.subtitulo && <p style={subtituloStyle}>{r.subtitulo}</p>}

              <div style={scoreRowStyle}>
                <div style={scoreCircleStyle}>
                  <span style={{ fontSize: 34, fontWeight: 700, color: "#fff", lineHeight: 1 }}>{calcScoreMedio(r.scores)}</span>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>/100</span>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: "var(--text-primary)", fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                    {r.veredicto_texto}
                  </p>
                </div>
              </div>

              {/* Mini índice */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 16 }}>
                {r.secoes?.map((s) => (
                  <a
                    key={s.id}
                    href={`#secao-${s.id}`}
                    style={{
                      padding: "4px 12px",
                      borderRadius: 999,
                      background: "var(--bg-secondary)",
                      border: "1px solid var(--border)",
                      color: "var(--text-secondary)",
                      fontSize: 12,
                      textDecoration: "none",
                      cursor: "pointer",
                    }}
                  >
                    {s.tipo === "pontos_fortes" && "💪 "}
                    {s.tipo === "pontos_cegos" && "🔍 "}
                    {s.tipo === "inconsistencias" && "⚡ "}
                    {s.tipo === "recrutador" && "👀 "}
                    {s.tipo === "curriculo" && "✍️ "}
                    {s.tipo === "linkedin" && "💼 "}
                    {s.tipo === "plano" && "📚 "}
                    {s.tipo === "vagas" && "🏢 "}
                    {s.tipo === "scores" && "📊 "}
                    {s.titulo}
                  </a>
                ))}
              </div>
            </div>

            {/* Seções */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 24 }}>
              {r.secoes?.map((secao) => (
                <div key={secao.id} id={`secao-${secao.id}`}>
                  {renderSecao(secao, analise)}
                </div>
              ))}
            </div>

            {/* Próximos passos */}
            {r.proximos_passos?.length > 0 && (
              <div style={cardStyle}>
                <h3 style={{ ...secaoTitle, margin: "0 0 16px" }}>
                  <span style={{ marginRight: 8 }}>👣</span>Próximos passos
                </h3>
                <ol style={{ margin: 0, paddingLeft: 20 }}>
                  {r.proximos_passos.map((passo, i) => (
                    <li key={i} style={{ color: "var(--text-primary)", fontSize: 14, marginBottom: 8, lineHeight: 1.6 }}>{passo}</li>
                  ))}
                </ol>
              </div>
            )}

            {/* Mensagem final */}
            {r.mensagem_final && (
              <div style={{ ...cardStyle, background: "var(--bg-secondary)", borderColor: "transparent" }}>
                <p style={{ color: "var(--text-secondary)", fontStyle: "italic", lineHeight: 1.7, margin: 0, textAlign: "center", fontSize: 14 }}>
                  {r.mensagem_final}
                </p>
              </div>
            )}
          </>
        )}

        {!r && (
          <div style={centerBox}>
            <span style={{ fontSize: 48, marginBottom: 16 }}>📄</span>
            <h2 style={{ color: "var(--text-primary)", margin: "0 0 8px" }}>Relatório não disponível</h2>
            <p style={{ color: "var(--text-secondary)", marginBottom: 24 }}>O relatório final ainda não foi gerado para esta análise.</p>
            <Link href="/analise" style={primaryBtn}>Fazer nova análise</Link>
          </div>
        )}
      </div>
    </div>
  );
}

/* ====================================================================
   Estilos
   ==================================================================== */

const pageStyle: React.CSSProperties = {
  minHeight: "100vh",
  background: "var(--bg-primary)",
  padding: "2rem 1rem",
};

const containerStyle: React.CSSProperties = {
  maxWidth: 760,
  margin: "0 auto",
};

const centerBox: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "60vh",
  textAlign: "center",
};

const successBannerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  background: "linear-gradient(135deg, #22c55e, #16a34a)",
  color: "#fff",
  padding: "12px 20px",
  borderRadius: 12,
  marginBottom: 24,
  fontSize: 15,
};

const headerStyle: React.CSSProperties = {
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: "0.75rem",
  padding: "1.5rem",
  marginBottom: 20,
};

const tituloStyle: React.CSSProperties = {
  fontSize: 24,
  fontWeight: 700,
  color: "var(--text-primary)",
  margin: "0 0 4px",
};

const subtituloStyle: React.CSSProperties = {
  color: "var(--text-secondary)",
  fontSize: 14,
  margin: "0 0 20px",
};

const scoreRowStyle: React.CSSProperties = {
  display: "flex",
  gap: 20,
  alignItems: "center",
};

const scoreCircleStyle: React.CSSProperties = {
  width: 85,
  height: 85,
  borderRadius: "50%",
  background: "linear-gradient(135deg, var(--accent), #3b82f6)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
};

const opsPerdidasStyle: React.CSSProperties = {
  marginTop: 12,
  padding: "10px 14px",
  background: "rgba(239,68,68,0.1)",
  border: "1px solid rgba(239,68,68,0.2)",
  borderRadius: 8,
  color: "#f87171",
  fontSize: 13,
  lineHeight: 1.5,
};

const secaoStyle: React.CSSProperties = {
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: "0.75rem",
  padding: "1.5rem",
};

const secaoTitle: React.CSSProperties = {
  fontSize: 16,
  fontWeight: 700,
  color: "var(--text-primary)",
  margin: "0 0 16px",
};

const cardStyle: React.CSSProperties = {
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: "0.75rem",
  padding: "1.5rem",
  marginBottom: 20,
};

const primaryBtn: React.CSSProperties = {
  display: "inline-block",
  padding: "12px 32px",
  background: "var(--accent)",
  color: "#fff",
  border: "none",
  borderRadius: "0.5rem",
  fontSize: 15,
  fontWeight: 600,
  cursor: "pointer",
  textDecoration: "none",
};

const linkStyle: React.CSSProperties = {
  color: "var(--accent)",
  textDecoration: "none",
  fontSize: 14,
  marginTop: 16,
};
