"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

function temCodigoPython(texto: string): boolean {
  const linhas = texto.split("\n");
  return linhas.some(
    (linha) =>
      linha.includes("input(") ||
      linha.includes("float(") ||
      linha.includes("int(") ||
      linha.includes("print(") ||
      /^\w+ = /.test(linha.trim())
  );
}

type Exercicio = {
  id: string;
  id_referencia?: string;
  titulo: string;
  linguagem: string;
  modulo: string;
  nivel: string;
  descricao: string;
  objetivo: string;
  permitidos?: string[] | null;
  proibidos?: string[] | null;
  erros_comuns?: string[] | null;
  exemplos?: string | null;
};

type Mensagem = {
  role: "user" | "assistant";
  content: string;
};

export default function ExercicioClient({
  exercicio,
}: {
  exercicio: Exercicio;
}) {
  const router = useRouter();
  const [chatAberto, setChatAberto] = useState(false);
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [input, setInput] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [bloqueado, setBloqueado] = useState(false);
  const [codigoContexto, setCodigoContexto] = useState<{ nome: string; conteudo: string }[]>([]);
  const [concluido, setConcluido] = useState(false);
  const [marcando, setMarcando] = useState(false);
  const [concluidoPorTutor, setConcluidoPorTutor] = useState(false);
  const [chatConcluido, setChatConcluido] = useState(false);
  const [mensagemConclusao, setMensagemConclusao] = useState("");

  // Reset ao trocar de exercício
  useEffect(() => {
    setChatAberto(false);
    setMensagens([]);
    setInput("");
    setBloqueado(false);
    setConcluido(false);
    setConcluidoPorTutor(false);
    setChatConcluido(false);
    setMensagemConclusao("");
    setMarcando(false);
    setCarregando(false);
  }, [exercicio.id]);

  // Ler arquivos do GitHub salvos em localStorage
  useEffect(() => {
    try {
      const arquivos: { nome: string; conteudo: string }[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const chave = localStorage.key(i);
        if (chave?.startsWith("github_repo_")) {
          const saved = JSON.parse(localStorage.getItem(chave) || "{}");
          if (saved.arquivos?.length > 0) {
            arquivos.push(...saved.arquivos);
          }
        }
      }
      if (arquivos.length > 0) setCodigoContexto(arquivos);
    } catch {}
  }, []);

  // Verificar se exercício já foi concluído
  useEffect(() => {
    const ref = exercicio.id_referencia || exercicio.id;
    fetch(`/api/progresso?tipo=exercicio&referencia_id=${encodeURIComponent(ref)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.concluido) {
          setConcluido(true);
          setChatConcluido(true);
          setMensagemConclusao("✅ Você já concluiu este exercício! Use o tutor para tirar dúvidas ou clique em \"Desmarcar\" para tentar novamente.");
        }
      })
      .catch(() => {});
  }, [exercicio.id, exercicio.id_referencia]);

  async function marcarConcluido() {
    setMarcando(true);
    try {
      const ref = exercicio.id_referencia || exercicio.id;
      await fetch("/api/progresso", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipo: "exercicio",
          referencia_id: ref,
          linguagem: exercicio.linguagem,
          modulo: exercicio.modulo,
        }),
      });
      setConcluido(true);
    } catch {}
    setMarcando(false);
  }

  async function desmarcarConcluido() {
    if (!window.confirm("Desmarcar este exercício como concluído?")) return;
    setMarcando(true);
    try {
      const ref = exercicio.id_referencia || exercicio.id;
      await fetch("/api/progresso", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipo: "exercicio",
          referencia_id: ref,
        }),
      });
      setConcluido(false);
      setConcluidoPorTutor(false);
      setChatConcluido(false);
      setMensagemConclusao("");
    } catch {}
    setMarcando(false);
  }

  async function abrirChat() {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      router.push(`/entrar?redirect=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    setBloqueado(false);
    setChatAberto(true);
  }

  async function enviarMensagem() {
    if (!input.trim() || carregando) return;
    const texto = input;
    setInput("");
    setCarregando(true);

    try {
      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...mensagens, { role: "user", content: texto }], exercicio, codigoContexto }),
      });

      if (res.status === 403) {
        const err = await res.json();
        if (err.error === "limite_mensal") {
          setBloqueado(true);
          setCarregando(false);
          return;
        }
      }

      // Só adiciona a mensagem após confirmação do servidor
      const novaMensagem: Mensagem = { role: "user", content: texto };
      const novaLista = [...mensagens, novaMensagem];
      setMensagens(novaLista);

      const data = await res.json();
      const rawContent = data.content || "";

      // Detectar token [CONCLUIDO]
      const temConclusao = rawContent.includes("[CONCLUIDO]");
      const conteudoLimpo = rawContent.replace("[CONCLUIDO]", "").trim();

      setMensagens((prev) => [
        ...prev,
        { role: "assistant", content: conteudoLimpo },
      ]);

      if (temConclusao) {
        setConcluidoPorTutor(true);
        setConcluido(true);
        // Registrar progresso automaticamente
        const ref = exercicio.id_referencia || exercicio.id;
        fetch("/api/progresso", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tipo: "exercicio",
            referencia_id: ref,
            linguagem: exercicio.linguagem,
            modulo: exercicio.modulo,
          }),
        }).catch(() => {});
      }
    } catch {
      setMensagens((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Erro ao conectar com o tutor. Tente novamente.",
        },
      ]);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main
      style={{
        padding: "2rem",
        maxWidth: "1100px",
        display: "flex",
        gap: "2rem",
        flexWrap: "wrap",
        alignItems: "flex-start",
      }}
    >
      {/* Coluna esquerda */}
      <div style={{ flex: "1", minWidth: "280px" }}>
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            marginBottom: "1rem",
            flexWrap: "wrap",
          }}
        >
          {[exercicio.linguagem, exercicio.modulo].map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: "0.75rem",
                fontWeight: 500,
                color: "var(--badge-text)",
                backgroundColor: "var(--badge-bg)",
                padding: "0.125rem 0.5rem",
                borderRadius: "0.25rem",
              }}
            >
              {tag}
            </span>
          ))}
          <span
            style={{
              fontSize: "0.75rem",
              color: "var(--text-secondary)",
              padding: "0.125rem 0.5rem",
            }}
          >
            {exercicio.nivel}
          </span>
        </div>

        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "var(--text-primary)",
            marginBottom: "0.75rem",
          }}
        >
          {exercicio.titulo}
        </h1>

        <p
          style={{
            color: "var(--text-secondary)",
            marginBottom: "1.5rem",
            lineHeight: 1.6,
          }}
        >
          {exercicio.descricao}
        </p>

        {exercicio.exemplos && !temCodigoPython(exercicio.exemplos) && (
          <div
            style={{
              backgroundColor: "var(--code-bg)",
              border: "1px solid var(--border)",
              borderRadius: "0.5rem",
              padding: "1rem",
              marginBottom: "2rem",
            }}
          >
            <p
              style={{
                fontSize: "0.75rem",
                color: "var(--text-secondary)",
                marginBottom: "0.5rem",
                fontWeight: 600,
              }}
            >
              EXEMPLO
            </p>
            <pre
              style={{
                color: "var(--text-primary)",
                fontSize: "0.875rem",
                whiteSpace: "pre-wrap",
                margin: 0,
              }}
            >
              {exercicio.exemplos}
            </pre>
          </div>
        )}

        {/* Botão concluir/desmarcar exercício */}
        <div style={{ marginBottom: "1rem" }}>
          {concluido ? (
            <button
              onClick={desmarcarConcluido}
              disabled={marcando}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.375rem",
                padding: "0.5rem 1rem",
                background: "#166534",
                color: "#dcfce7",
                border: "1px solid #22c55e",
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
                fontWeight: 600,
                cursor: marcando ? "not-allowed" : "pointer",
                opacity: marcando ? 0.6 : 1,
              }}
            >
              {marcando ? "Salvando..." : "✅ Concluído — clique para desmarcar"}
            </button>
          ) : (
            <button
              onClick={marcarConcluido}
              disabled={marcando}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.375rem",
                padding: "0.5rem 1rem",
                background: "transparent",
                color: "#22c55e",
                border: "1px solid #22c55e",
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
                fontWeight: 600,
                cursor: marcando ? "not-allowed" : "pointer",
                opacity: marcando ? 0.6 : 1,
              }}
            >
              {marcando ? "Salvando..." : "✅ Marcar como concluído"}
            </button>
          )}
        </div>

        {!chatAberto && (
          <button
            onClick={abrirChat}
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "var(--accent)",
              color: "#ffffff",
              border: "none",
              borderRadius: "0.5rem",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: "pointer",
              width: "100%",
            }}
          >
            Estou travado
          </button>
        )}
      </div>

      {/* Coluna direita — Chat */}
      {chatAberto && (
        <div
          style={{
            flex: "1.5",
            minWidth: "300px",
            display: "flex",
            flexDirection: "column",
            border: "1px solid var(--border)",
            borderRadius: "0.5rem",
            backgroundColor: "var(--bg-card)",
            overflow: "hidden",
            height: "520px",
          }}
        >
          <div
            style={{
              padding: "0.75rem 1rem",
              borderBottom: "1px solid var(--border)",
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "var(--text-primary)",
            }}
          >
            Tutor MeuPasso
          </div>

          {bloqueado ? (
            <div style={{ padding: "2rem", textAlign: "center" }}>
              <p
                style={{
                  color: "var(--text-primary)",
                  fontWeight: 600,
                  marginBottom: "0.5rem",
                }}
              >
                Você usou suas 3 sessões gratuitas deste mês.
              </p>
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "0.875rem",
                  marginBottom: "0.75rem",
                }}
              >
                O limite renova no dia 1 de cada mês.
              </p>
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "0.875rem",
                  marginBottom: "1.5rem",
                }}
              >
                Assine o Pro por R$27,90/mês para sessões ilimitadas.
              </p>
              <a
                href="https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=8652d48ca4954b059a5201fc2234973b"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  padding: "0.75rem 1.5rem",
                  backgroundColor: "var(--accent)",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "0.5rem",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Assinar agora — R$27,90/mês
              </a>
            </div>
          ) : (
            <>
              <div
                style={{
                  flex: 1,
                  overflowY: "auto",
                  padding: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                {mensagens.length === 0 && !chatConcluido && (
                  <p
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: "0.875rem",
                      textAlign: "center",
                      marginTop: "2rem",
                    }}
                  >
                    Descreva onde você travou ou cole seu código aqui.
                  </p>
                )}
                {chatConcluido && mensagens.length === 0 && (
                  <div style={{ textAlign: "center", padding: "0.75rem 0" }}>
                    <p style={{ color: "#22c55e", fontWeight: 600, fontSize: "0.9375rem" }}>
                      ✅ Você já concluiu este exercício!
                    </p>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.8125rem", marginTop: "0.5rem" }}>
                      Clique em "Desmarcar" acima para reabilitar o chat e tentar novamente.
                    </p>
                  </div>
                )}
                {mensagens.map((msg, i) => (
                  <div
                    key={i}
                    style={{
                      alignSelf:
                        msg.role === "user" ? "flex-end" : "flex-start",
                      backgroundColor:
                        msg.role === "user"
                          ? "var(--accent)"
                          : "var(--bg-secondary)",
                      color:
                        msg.role === "user"
                          ? "#ffffff"
                          : "var(--text-primary)",
                      padding: "0.625rem 0.875rem",
                      borderRadius: "0.5rem",
                      maxWidth: "80%",
                      fontSize: "0.875rem",
                      lineHeight: 1.5,
                    }}
                  >
                    {msg.role === "assistant" ? (
                      <ReactMarkdown
                        components={{
                          pre: ({ children }) => (
                            <pre
                              style={{
                                backgroundColor: "var(--code-bg)",
                                padding: "0.75rem",
                                borderRadius: "0.375rem",
                                overflowX: "auto",
                                fontSize: "0.8rem",
                                marginTop: "0.5rem",
                              }}
                            >
                              {children}
                            </pre>
                          ),
                          code: ({ children }) => (
                            <code
                              style={{
                                fontFamily: "monospace",
                                fontSize: "0.8rem",
                                color: "var(--text-primary)",
                              }}
                            >
                              {children}
                            </code>
                          ),
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    ) : (
                      msg.content
                    )}
                  </div>
                ))}
                {carregando && (
                  <div
                    style={{
                      alignSelf: "flex-start",
                      color: "var(--text-secondary)",
                      fontSize: "0.875rem",
                      padding: "0.5rem",
                    }}
                  >
                    Pensando...
                  </div>
                )}

                {concluidoPorTutor && (
                  <div style={{ textAlign: "center", padding: "0.75rem 0" }}>
                    <p style={{ color: "#22c55e", fontWeight: 600, fontSize: "0.9375rem", marginBottom: "0.75rem" }}>
                      ✅ Exercício concluído! Bom trabalho!
                    </p>
                    <a
                      href={`/exercicios/${exercicio.linguagem.toLowerCase()}`}
                      style={{
                        display: "inline-block",
                        padding: "0.5rem 1.25rem",
                        background: "var(--accent)",
                        color: "#ffffff",
                        borderRadius: "0.375rem",
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        textDecoration: "none",
                      }}
                    >
                      Próximo exercício →
                    </a>
                  </div>
                )}
              </div>

              <div
                style={{
                  padding: "0.75rem",
                  borderTop: "1px solid var(--border)",
                  display: "flex",
                  gap: "0.5rem",
                }}
              >
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      enviarMensagem();
                    }
                  }}
                  placeholder={(concluidoPorTutor || chatConcluido) ? "Exercício concluído!" : "Digite sua dúvida ou cole seu código... (Shift+Enter para nova linha)"}
                  rows={2}
                  disabled={concluidoPorTutor || chatConcluido}
                  style={{
                    flex: 1,
                    padding: "0.5rem 0.75rem",
                    backgroundColor: "var(--bg-secondary)",
                    color: "var(--text-primary)",
                    border: "1px solid var(--border)",
                    borderRadius: "0.375rem",
                    fontSize: "0.875rem",
                    resize: "none",
                    fontFamily: "inherit",
                    opacity: (concluidoPorTutor || chatConcluido) ? 0.5 : 1,
                    cursor: (concluidoPorTutor || chatConcluido) ? "not-allowed" : "text",
                  }}
                />
                <button
                  onClick={enviarMensagem}
                  disabled={carregando || !input.trim() || concluidoPorTutor || chatConcluido}
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "var(--accent)",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "0.375rem",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    cursor: carregando || concluidoPorTutor || chatConcluido ? "not-allowed" : "pointer",
                    opacity: carregando || !input.trim() || concluidoPorTutor || chatConcluido ? 0.6 : 1,
                  }}
                >
                  Enviar
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </main>
  );
}
