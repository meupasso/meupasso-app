"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";

/* ---------- helpers ---------- */

function classNames(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

function getStepKey(data: any, stepIndex: number): string {
  if (stepIndex === 0) {
    if (data.json_curriculo && !data.json_curriculo.texto && data.json_curriculo.nome) return "done";
    if (data.json_curriculo) return "current";
    return "pending";
  }
  if (stepIndex === 1) {
    if (data.json_linkedin && !data.json_linkedin.texto && data.json_linkedin.headline) return "done";
    if (data.json_linkedin && !data.json_linkedin.texto) return "current";
    if (data.json_curriculo && !data.json_curriculo.texto) return "current";
    return "pending";
  }
  if (stepIndex === 2) {
    if (data.json_github && data.json_github.linguagens_identificadas) return "done";
    if (data.json_cruzamento || data.json_o_que_falta) return "done";
    return "current";
  }
  if (stepIndex === 3) {
    if (data.json_cruzamento) return "done";
    if (data.json_o_que_falta || data.status === "concluido") return "done";
    return "current";
  }
  if (stepIndex === 4) {
    if (data.json_o_que_falta) return "done";
    if (data.status === "concluido") return "done";
    if (data.json_cruzamento) return "current";
    return "pending";
  }
  if (stepIndex === 5) {
    if (data.status === "concluido") return "done";
    if (data.json_o_que_falta) return "current";
    return "pending";
  }
  return "pending";
}

const PASSOS = [
  { label: "Lendo seu currículo..." },
  { label: "Lendo seu LinkedIn..." },
  { label: "Analisando seu GitHub..." },
  { label: "Cruzando as informações..." },
  { label: "Identificando o que falta..." },
  { label: "Montando seu relatório..." },
];

/* ---------- page ---------- */

export default function AnalisePage() {
  const supabase = createClient();

  /* --- state --- */
  const [etapa, setEtapa] = useState<"form" | "loading" | "preview" | "erro">("form");
  const [vaga, setVaga] = useState("");
  const [github, setGithub] = useState("");
  const [curriculoFile, setCurriculoFile] = useState<File | null>(null);
  const [linkedinFile, setLinkedinFile] = useState<File | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [analiseId, setAnaliseId] = useState<string | null>(null);
  const [analiseData, setAnaliseData] = useState<any>(null);
  const [stepStatuses, setStepStatuses] = useState<string[]>(["current", "pending", "pending", "pending", "pending", "pending"]);
  const [erroMsg, setErroMsg] = useState("");
  const [pagando, setPagando] = useState(false);
  const [popupInativo, setPopupInativo] = useState(false);
  const [pagamentoOk, setPagamentoOk] = useState(false);
  const pollRef = useRef<NodeJS.Timeout | null>(null);
  const inatividadeRef = useRef<NodeJS.Timeout | null>(null);
  const inatividadeTimerRef = useRef<number>(0);

  /* --- reset inatividade --- */
  const resetInatividade = useCallback(() => {
    setPopupInativo(false);
    if (inatividadeRef.current) clearTimeout(inatividadeRef.current);
    if (etapa !== "preview") return;
    const now = Date.now();
    if (now - inatividadeTimerRef.current < 5000) return; // debounce 5s
    inatividadeTimerRef.current = now;
    inatividadeRef.current = setTimeout(() => {
      setPopupInativo(true);
    }, 30000);
  }, [etapa]);

  useEffect(() => {
    if (etapa !== "preview") return;
    const handler = () => resetInatividade();
    resetInatividade();
    window.addEventListener("mousemove", handler);
    window.addEventListener("keydown", handler);
    window.addEventListener("touchstart", handler);
    window.addEventListener("scroll", handler);
    return () => {
      window.removeEventListener("mousemove", handler);
      window.removeEventListener("keydown", handler);
      window.removeEventListener("touchstart", handler);
      window.removeEventListener("scroll", handler);
      if (inatividadeRef.current) clearTimeout(inatividadeRef.current);
    };
  }, [etapa, resetInatividade]);

  /* --- polling --- */
  const startPolling = useCallback((id: string) => {
    pollRef.current = setInterval(async () => {
      const { data, error } = await supabase
        .from("analises_empregabilidade")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        console.error("Polling error:", error);
        return;
      }

      const statuses = PASSOS.map((_, i) => getStepKey(data, i));
      setStepStatuses(statuses);

      if (data.status === "concluido") {
        if (pollRef.current) clearInterval(pollRef.current);
        setAnaliseData(data);
        setEtapa("preview");
      } else if (data.status === "erro") {
        if (pollRef.current) clearInterval(pollRef.current);
        setErroMsg("Ocorreu um erro ao processar sua análise. Tente novamente.");
        setEtapa("erro");
      }
    }, 3000);
  }, [supabase]);

  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  /* --- extrair texto de PDF ou DOCX no client-side --- */
  async function extractFileText(file: File): Promise<string> {
    const name = file.name.toLowerCase();

    // DOCX: usar mammoth no browser
    if (name.endsWith(".docx")) {
      const mammoth = await import("mammoth");
      const buffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer: buffer });
      return result.value || "";
    }

    // PDF: usar pdfjs-dist
    if (name.endsWith(".pdf")) {
      const pdfjs = await import("pdfjs-dist/build/pdf.mjs");
      const buffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: buffer }).promise;
      const texts: string[] = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items.map((item: any) => item.str).join(" ");
        texts.push(pageText);
        page.cleanup();
      }
      pdf.destroy();
      return texts.join("\n");
    }

    throw new Error("Formato de arquivo não suportado. Use PDF ou DOCX.");
  }

  /* --- submit --- */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!curriculoFile || !linkedinFile) return;
    if (!vaga.trim()) return;

    setEnviando(true);
    setEtapa("loading");

    try {
      // 1. Extrair texto dos arquivos no próprio navegador
      const [curriculo_texto, linkedin_texto] = await Promise.all([
        extractFileText(curriculoFile),
        extractFileText(linkedinFile),
      ]);
      setStepStatuses(["done", "done", "current", "pending", "pending", "pending"]);

      // 2. Coletar dados + GitHub
      const coletarRes = await fetch("/api/analise/coletar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          objetivo_vaga: vaga,
          github_username: github.trim() || undefined,
          curriculo_texto,
          linkedin_texto,
        }),
      });

      if (!coletarRes.ok) {
        const err = await coletarRes.json();
        throw new Error(err.error || "Erro ao salvar dados");
      }

      const { id } = await coletarRes.json();
      setAnaliseId(id);

      // 3. Disparar processamento (fire-and-forget, usamos polling)
      fetch("/api/analise/processar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      }).catch(() => {});

      // 4. Iniciar polling
      startPolling(id);
    } catch (err: any) {
      console.error("Submit error:", err);
      setErroMsg(err.message || "Erro ao iniciar análise");
      setEtapa("erro");
      setEnviando(false);
    }
  }

  /* --- pagar --- */
  async function handlePagar() {
    if (!analiseId) return;
    setPagando(true);
    try {
      const res = await fetch("/api/analise/pagar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: analiseId }),
      });
      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Erro ao iniciar pagamento");
        return;
      }
      const { checkout_url } = await res.json();
      window.open(checkout_url, "_blank");
    } catch {
      alert("Erro ao conectar com Mercado Pago");
    } finally {
      setPagando(false);
    }
  }

  /* --- retry --- */
  function handleRetry() {
    setEtapa("form");
    setErroMsg("");
    setAnaliseData(null);
    setAnaliseId(null);
  }

  /* --- form validation --- */
  const formOk = vaga.trim().length > 0 && curriculoFile !== null && linkedinFile !== null;

  /* --- render --- */

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Logo/título */}
        <div style={styles.header}>
          <h1 style={styles.h1}>Análise de Empregabilidade</h1>
          <p style={styles.subtitle}>
            Descubra exatamente o que falta para conseguir aquela vaga dos sonhos
          </p>
        </div>

        {/* -------- ETAPA 1: FORMULÁRIO -------- */}
        {etapa === "form" && (
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.card}>
              <label style={styles.label}>Que vaga você quer conseguir?</label>
              <input
                style={styles.input}
                placeholder="Ex: Desenvolvedor Java Júnior"
                value={vaga}
                onChange={(e) => setVaga(e.target.value)}
                disabled={enviando}
              />
            </div>

            <div style={styles.card}>
              <label style={styles.label}>Seu usuário no GitHub <span style={{ color: "var(--text-secondary)", fontWeight: 400 }}>(opcional)</span></label>
              <input
                style={styles.input}
                placeholder="Ex: caiomvital"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                disabled={enviando}
              />
            </div>

            <div style={styles.card}>
              <label style={styles.label}>Currículo (PDF ou DOCX)</label>
              <div
                style={{
                  ...styles.dropzone,
                  borderColor: curriculoFile ? "var(--accent)" : "var(--border)",
                }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files[0];
                  if (file && (file.type === "application/pdf" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || file.name.toLowerCase().endsWith(".docx"))) setCurriculoFile(file);
                }}
              >
                {curriculoFile ? (
                  <div style={styles.fileInfo}>
                    <span style={{ color: "var(--accent)" }}>📄</span>
                    <span>{curriculoFile.name}</span>
                    <button
                      type="button"
                      style={styles.removeFile}
                      onClick={() => setCurriculoFile(null)}
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <label style={styles.dropzoneLabel}>
                    <span style={{ fontSize: "2rem", marginBottom: 8 }}>📄</span>
                    <span>Arraste o PDF ou DOCX aqui ou <span style={{ color: "var(--accent)", textDecoration: "underline", cursor: "pointer" }}>clique para selecionar</span></span>
                    <input
                      type="file"
                      accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setCurriculoFile(file);
                      }}
                    />
                  </label>
                )}
              </div>
            </div>

            <div style={styles.card}>
              <label style={styles.label}>LinkedIn (PDF da exportação)</label>
              <div
                style={{
                  ...styles.dropzone,
                  borderColor: linkedinFile ? "var(--accent)" : "var(--border)",
                }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files[0];
                  if (file && file.type === "application/pdf") setLinkedinFile(file);
                }}
              >
                {linkedinFile ? (
                  <div style={styles.fileInfo}>
                    <span style={{ color: "var(--accent)" }}>📄</span>
                    <span>{linkedinFile.name}</span>
                    <button
                      type="button"
                      style={styles.removeFile}
                      onClick={() => setLinkedinFile(null)}
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <label style={styles.dropzoneLabel}>
                    <span style={{ fontSize: "2rem", marginBottom: 8 }}>🔗</span>
                    <span>Arraste o PDF aqui ou <span style={{ color: "var(--accent)", textDecoration: "underline", cursor: "pointer" }}>clique para selecionar</span></span>
                    <input
                      type="file"
                      accept=".pdf,application/pdf"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setLinkedinFile(file);
                      }}
                    />
                  </label>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={!formOk || enviando}
              style={{
                ...styles.primaryBtn,
                opacity: !formOk || enviando ? 0.5 : 1,
                cursor: !formOk || enviando ? "not-allowed" : "pointer",
              }}
            >
              {enviando ? "Enviando..." : "Analisar agora"}
            </button>
          </form>
        )}

        {/* -------- ETAPA 2: LOADING -------- */}
        {etapa === "loading" && (
          <div style={styles.loadingContainer}>
            <div style={styles.loadingSteps}>
              {PASSOS.map((passo, i) => {
                const status = stepStatuses[i] || "pending";
                return (
                  <div
                    key={i}
                    style={{
                      ...styles.stepItem,
                      opacity: status === "pending" ? 0.35 : 1,
                      transform: status === "pending" ? "translateX(-8px)" : "translateX(0)",
                    }}
                  >
                    <div style={styles.stepIcon}>
                      {status === "done" ? (
                        <span style={{ color: "#4ade80", fontSize: 20 }}>✓</span>
                      ) : status === "current" ? (
                        <span className="step-spinner" style={{ color: "var(--accent)", fontSize: 16 }}>●</span>
                      ) : (
                        <span style={{ color: "var(--text-secondary)", fontSize: 14 }}>○</span>
                      )}
                    </div>
                    <span
                      style={{
                        color: status === "done" ? "#4ade80" : status === "current" ? "var(--accent)" : "var(--text-secondary)",
                        fontWeight: status !== "pending" ? 500 : 400,
                      }}
                    >
                      {passo.label}
                    </span>
                  </div>
                );
              })}
            </div>
            <p style={{ color: "var(--text-secondary)", fontSize: 14, marginTop: 32, textAlign: "center" as const }}>
              Isso pode levar alguns minutos...
            </p>
          </div>
        )}

        {/* -------- ETAPA 3: PREVIEW -------- */}
        {etapa === "preview" && analiseData && (
          <>
            {/* Score */}
            <div style={styles.scoreSection}>
              <div style={styles.scoreCircle}>
                <span style={styles.scoreNumber}>
                  {analiseData.json_o_que_falta?.score_empregabilidade ?? "?"}
                </span>
                <span style={styles.scoreLabel}>/100</span>
              </div>
              <div style={{ flex: 1 }}>
                <h2 style={styles.veredictoLabel}>Veredito</h2>
                <p style={styles.veredictoText}>
                  {analiseData.json_o_que_falta?.score_justificativa || "Analisando seu perfil..."}
                </p>
                <div style={styles.veredictoBadge}>
                  {formatVeredicto(analiseData.json_o_que_falta?.veredicto)}
                </div>
              </div>
            </div>

            {/* O que falta */}
            {analiseData.json_o_que_falta?.o_que_falta && (
              <div style={styles.card}>
                <h3 style={styles.cardTitle}>🎯 O que falta para a vaga</h3>
                <div style={styles.faltaList}>
                  {analiseData.json_o_que_falta.o_que_falta.map((item: any, i: number) => (
                    <div key={i} style={styles.faltaItem}>
                      <div style={styles.faltaHeader}>
                        <span
                          style={{
                            ...styles.prioridadeBadge,
                            background:
                              item.prioridade === "alta"
                                ? "rgba(239,68,68,0.2)"
                                : item.prioridade === "media"
                                ? "rgba(234,179,8,0.2)"
                                : "rgba(100,100,100,0.2)",
                            color:
                              item.prioridade === "alta"
                                ? "#f87171"
                                : item.prioridade === "media"
                                ? "#eab308"
                                : "#9d9d9d",
                          }}
                        >
                          {item.prioridade === "alta" ? "Alta" : item.prioridade === "media" ? "Média" : "Baixa"}
                        </span>
                        <span style={{ fontWeight: 500, color: "var(--text-primary)" }}>{item.item}</span>
                      </div>
                      <p style={styles.faltaDesc}>{item.por_que_importa || item.evidencia}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* O que já tem */}
            {analiseData.json_o_que_falta?.o_que_ja_tem?.length > 0 && (
              <div style={styles.card}>
                <h3 style={styles.cardTitle}>✅ O que você já tem de diferencial</h3>
                <div style={styles.faltaList}>
                  {analiseData.json_o_que_falta.o_que_ja_tem.map((item: any, i: number) => (
                    <div key={i} style={{ ...styles.faltaItem, borderLeft: "3px solid #4ade80" }}>
                      <p style={{ color: "var(--text-primary)", margin: 0 }}>
                        <strong>{item.item}</strong>
                        {item.diferencial && <> — <span style={{ color: "var(--text-secondary)" }}>{item.diferencial}</span></>}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Seções travadas */}
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>📦 Conteúdo completo da análise</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: 14, marginBottom: 16 }}>
                As seções abaixo estão disponíveis no relatório completo.
              </p>

              {[
                { icon: "✍️", label: "Currículo reescrito", desc: "Currículo otimizado para a vaga desejada" },
                { icon: "💼", label: "LinkedIn reescrito", desc: "Perfil profissional com headline e sobre otimizados" },
                { icon: "👀", label: "Visão do recrutador", desc: "Como um recrutador real avaliaria seu perfil" },
                { icon: "📚", label: "Plano de estudos", desc: "Roadmap semana a semana com conteúdos do MeuPasso" },
                { icon: "🏢", label: "Vagas compatíveis", desc: "Vagas reais que você pode aplicar agora e nos próximos meses" },
              ].map((sec, i) => (
                <div key={i} style={styles.blurredSection}>
                  <div style={styles.blurredContent}>
                    <span style={{ fontSize: 24 }}>{sec.icon}</span>
                    <div>
                      <div style={{ fontWeight: 600, color: "var(--text-primary)" }}>{sec.label}</div>
                      <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>{sec.desc}</div>
                    </div>
                  </div>
                  <div style={styles.trancadoBadge}>🔒</div>
                </div>
              ))}
            </div>

            {/* CTA Pagamento */}
            <div style={styles.ctaSection}>
              <h3 style={{ color: "var(--text-primary)", fontSize: 20, textAlign: "center", marginBottom: 8 }}>
                Desbloqueie seu relatório completo
              </h3>
              <p style={{ color: "var(--text-secondary)", textAlign: "center", marginBottom: 20, fontSize: 14 }}>
                Currículo reescrito, LinkedIn otimizado, visão do recrutador, plano de estudos e vagas compatíveis
              </p>
              <button
                onClick={handlePagar}
                disabled={pagando}
                style={{
                  ...styles.payBtn,
                  opacity: pagando ? 0.6 : 1,
                  cursor: pagando ? "not-allowed" : "pointer",
                }}
              >
                {pagando ? "Abrindo Mercado Pago..." : `Pagar R$ 19,90`}
              </button>
              <p style={{ color: "var(--text-secondary)", fontSize: 12, textAlign: "center", marginTop: 12 }}>
                Pagamento único via Mercado Pago. Acesso imediato após confirmação.
              </p>
            </div>
          </>
        )}

        {/* -------- ERRO -------- */}
        {etapa === "erro" && (
          <div style={styles.card}>
            <div style={{ textAlign: "center", padding: "2rem 0" }}>
              <span style={{ fontSize: 48 }}>⚠️</span>
              <h2 style={{ color: "var(--text-primary)", margin: "16px 0 8px" }}>
                Algo deu errado
              </h2>
              <p style={{ color: "var(--text-secondary)", marginBottom: 24 }}>{erroMsg}</p>
              <button onClick={handleRetry} style={styles.primaryBtn}>
                Tentar novamente
              </button>
            </div>
          </div>
        )}
      </div>

      {/* -------- POPUP INATIVIDADE -------- */}
      {popupInativo && (
        <div className="popup-overlay" onClick={() => setPopupInativo(false)}>
          <div className="popup-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="popup-close"
              onClick={() => setPopupInativo(false)}
            >
              ✕
            </button>
            <h2 style={{ fontSize: 22, color: "var(--text-primary)", marginBottom: 8 }}>
              Espera — você viu o que falta.
            </h2>
            <h3 style={{ fontSize: 16, color: "var(--accent)", marginBottom: 20, fontWeight: 500 }}>
              E agora, vai deixar pra depois?
            </h3>
            <div style={{ marginBottom: 24 }}>
              {[
                "Currículo reescrito por IA para a vaga desejada",
                "LinkedIn otimizado com headline e sobre profissional",
                "Visão realista de como um recrutador te enxerga",
                "Plano de estudos semana a semana com o MeuPasso",
                "Vagas compatíveis com seu perfil hoje e nos próximos meses",
              ].map((benefit, i) => (
                <div key={i} style={styles.benefitItem}>
                  <span style={{ color: "var(--accent)", marginRight: 12 }}>✓</span>
                  <span style={{ color: "var(--text-primary)", fontSize: 14 }}>{benefit}</span>
                </div>
              ))}
            </div>
            <button
              onClick={handlePagar}
              disabled={pagando}
              style={{
                ...styles.payBtn,
                width: "100%",
                opacity: pagando ? 0.6 : 1,
                cursor: pagando ? "not-allowed" : "pointer",
              }}
            >
              {pagando ? "Abrindo..." : `Quero meu relatório completo — R$ 19,90`}
            </button>
          </div>
        </div>
      )}

      <style>{`
        .step-spinner {
          animation: spin 1.2s ease-in-out infinite;
        }
        @keyframes spin {
          0% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
          100% { opacity: 0.3; transform: scale(0.8); }
        }
        .popup-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(4px);
          animation: fadeIn 0.3s ease;
        }
        .popup-modal {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 1rem;
          padding: 2rem;
          max-width: 480px;
          width: 90%;
          position: relative;
          animation: slideUp 0.3s ease;
        }
        .popup-close {
          position: absolute;
          top: 12px;
          right: 16px;
          background: none;
          border: none;
          color: var(--text-secondary);
          font-size: 20px;
          cursor: pointer;
        }
        .popup-close:hover { color: var(--text-primary); }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

/* ---------- helpers ---------- */

function formatVeredicto(veredicto?: string) {
  if (!veredicto) return null;
  const map: Record<string, { label: string; color: string; bg: string }> = {
    pronto: { label: "Pronto para aplicar 🎯", color: "#4ade80", bg: "rgba(74,222,128,0.15)" },
    quase_la: { label: "Quase lá 🔄", color: "#eab308", bg: "rgba(234,179,8,0.15)" },
    precisa_evoluir: { label: "Precisa evoluir 📈", color: "#f97316", bg: "rgba(249,115,22,0.15)" },
    recomecar: { label: "Hora de recomeçar 🔄", color: "#f87171", bg: "rgba(239,68,68,0.15)" },
  };
  const info = map[veredicto] || { label: veredicto, color: "var(--text-secondary)", bg: "rgba(100,100,100,0.15)" };
  return (
    <span
      style={{
        display: "inline-block",
        padding: "4px 12px",
        borderRadius: 999,
        fontSize: 13,
        fontWeight: 600,
        color: info.color,
        background: info.bg,
      }}
    >
      {info.label}
    </span>
  );
}

/* ---------- styles ---------- */

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "var(--bg-primary)",
    padding: "2rem 1rem",
  },
  container: {
    maxWidth: 680,
    margin: "0 auto",
  },
  header: {
    textAlign: "center",
    marginBottom: 32,
  },
  h1: {
    fontSize: 28,
    fontWeight: 700,
    color: "var(--text-primary)",
    margin: "0 0 8px",
  },
  subtitle: {
    fontSize: 15,
    color: "var(--text-secondary)",
    margin: 0,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  card: {
    background: "var(--bg-card)",
    border: "1px solid var(--border)",
    borderRadius: "0.75rem",
    padding: "1.5rem",
  },
  label: {
    display: "block",
    fontSize: 14,
    fontWeight: 600,
    color: "var(--text-primary)",
    marginBottom: 8,
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: 8,
    border: "1px solid var(--border)",
    background: "var(--bg-secondary)",
    color: "var(--text-primary)",
    fontSize: 15,
    outline: "none",
    boxSizing: "border-box" as const,
  },
  dropzone: {
    border: "2px dashed var(--border)",
    borderRadius: 8,
    padding: "1.5rem",
    textAlign: "center" as const,
    cursor: "pointer",
    transition: "border-color 0.2s ease",
  },
  dropzoneLabel: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    cursor: "pointer",
    color: "var(--text-secondary)",
    fontSize: 14,
  },
  fileInfo: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontSize: 14,
    color: "var(--text-primary)",
  },
  removeFile: {
    background: "none",
    border: "none",
    color: "var(--text-secondary)",
    cursor: "pointer",
    fontSize: 16,
    padding: "0 4px",
  },
  primaryBtn: {
    width: "100%",
    padding: "14px 32px",
    background: "var(--accent)",
    color: "#fff",
    border: "none",
    borderRadius: "0.5rem",
    fontSize: 16,
    fontWeight: 600,
    cursor: "pointer",
    transition: "opacity 0.2s",
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "3rem 1rem",
  },
  loadingSteps: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    width: "100%",
    maxWidth: 400,
  },
  stepItem: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    padding: "8px 0",
    transition: "all 0.4s ease",
  },
  stepIcon: {
    width: 32,
    height: 32,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  scoreSection: {
    display: "flex",
    gap: 24,
    background: "var(--bg-card)",
    border: "1px solid var(--border)",
    borderRadius: "0.75rem",
    padding: "1.5rem",
    marginBottom: 20,
    alignItems: "center",
  },
  scoreCircle: {
    width: 110,
    height: 110,
    borderRadius: "50%",
    background: "linear-gradient(135deg, var(--accent), #3b82f6)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  scoreNumber: {
    fontSize: 36,
    fontWeight: 700,
    color: "#fff",
    lineHeight: 1,
  },
  scoreLabel: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    fontWeight: 500,
  },
  veredictoLabel: {
    fontSize: 14,
    fontWeight: 600,
    color: "var(--text-secondary)",
    margin: "0 0 4px",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
  },
  veredictoText: {
    color: "var(--text-primary)",
    fontSize: 14,
    lineHeight: 1.5,
    margin: "0 0 8px",
  },
  veredictoBadge: {
    marginTop: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: "var(--text-primary)",
    margin: "0 0 16px",
  },
  faltaList: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  faltaItem: {
    padding: "12px 16px",
    borderLeft: "3px solid var(--accent)",
    background: "var(--bg-secondary)",
    borderRadius: "0 8px 8px 0",
  },
  faltaHeader: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 6,
  },
  prioridadeBadge: {
    display: "inline-block",
    padding: "2px 10px",
    borderRadius: 999,
    fontSize: 11,
    fontWeight: 700,
    textTransform: "uppercase" as const,
    letterSpacing: "0.04em",
    flexShrink: 0,
  },
  faltaDesc: {
    color: "var(--text-secondary)",
    fontSize: 13,
    lineHeight: 1.5,
    margin: 0,
  },
  blurredSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 16px",
    marginBottom: 8,
    borderRadius: 8,
    background: "var(--bg-secondary)",
    opacity: 0.6,
    filter: "blur(2px)",
    userSelect: "none",
    pointerEvents: "none",
  },
  blurredContent: {
    display: "flex",
    alignItems: "center",
    gap: 14,
  },
  trancadoBadge: {
    fontSize: 20,
  },
  ctaSection: {
    background: "var(--bg-card)",
    border: "2px solid var(--accent)",
    borderRadius: "0.75rem",
    padding: "2rem",
    marginTop: 24,
  },
  payBtn: {
    display: "block",
    margin: "0 auto",
    padding: "14px 48px",
    background: "linear-gradient(135deg, #569cd6, #3b82f6)",
    color: "#fff",
    border: "none",
    borderRadius: "0.5rem",
    fontSize: 18,
    fontWeight: 700,
    cursor: "pointer",
    transition: "opacity 0.2s",
  },
  benefitItem: {
    display: "flex",
    alignItems: "flex-start",
    marginBottom: 10,
  },
};
