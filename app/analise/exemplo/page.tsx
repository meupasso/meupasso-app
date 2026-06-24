import Link from "next/link";

/* ====================================================================
   Página de exemplo — mostra como é o relatório completo sem pagar
   ==================================================================== */

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

const cardDark: React.CSSProperties = {
  padding: "14px 16px",
  borderRadius: 10,
  background: "var(--bg-secondary)",
  border: "1px solid var(--border)",
};

export default function ExemploPage() {
  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        {/* Breadcrumb */}
        <Link href="/analise" style={breadcrumbStyle}>
          ← Voltar para Análise de Empregabilidade
        </Link>

        <div style={avisoStyle}>
          <span style={{ fontSize: 20 }}>👁️</span>
          <div>
            <strong style={{ color: "var(--text-primary)" }}>Relatório de exemplo</strong>
            <p style={{ color: "var(--text-secondary)", fontSize: 13, margin: "2px 0 0" }}>
              Este é um relatório ilustrativo baseado em um perfil fictício. O seu será gerado com seus dados reais.
            </p>
          </div>
        </div>

        {/* ============ HEADER ============ */}
        <div style={headerStyle}>
          <h1 style={tituloStyle}>Relatório de Empregabilidade</h1>
          <p style={subtituloStyle}>
            Análise completa para <strong>Desenvolvedor Java Júnior</strong>
          </p>

          <div style={scoreRowStyle}>
            <div style={scoreCircleStyle}>
              <span style={{ fontSize: 34, fontWeight: 700, color: "#fff", lineHeight: 1 }}>42</span>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>/100</span>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: "var(--text-primary)", fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                João tem uma base sólida em lógica de programação, mas ainda faltam projetos no portfólio,
                experiência com frameworks do ecossistema Java e um posicionamento mais claro no LinkedIn.
                Com algumas semanas de preparo focada, consegue começar a aplicar.
              </p>
            </div>
          </div>

          <div style={opsPerdidasStyle}>
            <strong>65%</strong> das vagas de Java Júnior estão sendo descartadas automaticamente
            porque o perfil não mostra os requisitos mínimos que os recrutadores buscam
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 16 }}>
            {[
              { href: "#fortes", label: "💪 Pontos fortes" },
              { href: "#cegos", label: "🔍 Pontos cegos" },
              { href: "#inconsistencias", label: "⚡ Inconsistências" },
              { href: "#recrutador", label: "👀 Visão do recrutador" },
              { href: "#curriculo", label: "✍️ Currículo reescrito" },
              { href: "#linkedin", label: "💼 LinkedIn reescrito" },
              { href: "#plano", label: "📚 Plano de estudos" },
              { href: "#vagas", label: "🏢 Vagas compatíveis" },
            ].map((item) => (
              <a key={item.href} href={item.href} style={indiceItemStyle}>{item.label}</a>
            ))}
          </div>
        </div>

        {/* ============ PONTOS FORTES ============ */}
        <div id="fortes" style={secaoStyle}>
          <h3 style={secaoTitle}>💪 Pontos fortes</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              {
                tit: "Lógica de programação sólida",
                det: "Os exercícios resolvidos no GitHub mostram domínio de estrutura de dados básicas (listas, matrizes, dicionários) e algoritmos de ordenação. É a base que muitos candidatos não têm.",
              },
              {
                tit: "Conhecimento de sintaxe Java confirmado",
                det: "Tanto no currículo quanto no GitHub, João demonstra experiência com Java 11+ incluindo POO, exceptions e coleções. A consistência entre as fontes é um bom sinal.",
              },
              {
                tit: "Interesse genuíno por tecnologia",
                det: "O LinkedIn mostra acompanhamento de empresas de tecnologia e compartilhamento de conteúdos da área. Isso conta pontos com recrutadores que buscam engajamento.",
              },
            ].map((item, i) => (
              <div key={i} style={{
                display: "flex", gap: 14, padding: "14px 16px", borderRadius: 10,
                background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)", alignItems: "flex-start",
              }}>
                <span style={{ fontSize: 20, flexShrink: 0, marginTop: 2 }}>✅</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, color: "#4ade80", fontSize: 14, marginBottom: 4 }}>{item.tit}</div>
                  <p style={{ color: "var(--text-secondary)", fontSize: 13, margin: 0, lineHeight: 1.5 }}>{item.det}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ height: 20 }} />

        {/* ============ PONTOS CEGOS ============ */}
        <div id="cegos" style={secaoStyle}>
          <h3 style={secaoTitle}>🔍 Pontos cegos</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { prio: "alta", tit: "Nenhum framework Java no portfólio", det: "Spring Boot é pré-requisito em 9 de cada 10 vagas Java Júnior. Seu GitHub tem apenas projetos console e um CRUD simples sem Spring. Recrutadores podem interpretar como 'ainda não está pronto para o mercado'.", acao: "Criar uma API REST com Spring Boot e publicar no GitHub este mês" },
              { prio: "alta", tit: "LinkedIn desatualizado e genérico", det: "A headline é 'Estudante de TI' — isso te coloca na pilha com milhares de outros estudantes. Recrutadores não têm tempo para adivinhar o que você sabe. O 'Sobre' tem 3 linhas genéricas.", acao: "Atualizar headline com a vaga desejada e reescrever o Sobre com suas habilidades e objetivos reais" },
              { prio: "alta", tit: "Banco de dados relacional ausente", det: "SQL é mandatório para qualquer vaga Java. Você não menciona experiência com bancos relacionais em nenhuma fonte. Mesmo que saiba o básico, precisa demonstrar.", acao: "Adicionar um projeto com PostgreSQL ou MySQL ao portfólio" },
              { prio: "media", tit: "GitHub sem README nos repositórios", det: "Dos 8 repositórios públicos, apenas 2 têm README. Isso passa a impressão de projetos 'jogados' — incompletos ou feitos só para cumprir tarefa.", acao: "Adicionar README com descrição, tecnologias e como rodar em todos os repositórios" },
              { prio: "media", tit: "Sem contribuições para projetos open source", det: "Não é obrigatório, mas contribuições (mesmo que pequenas) contam bastante em processos seletivos para iniciantes porque mostram trabalho em equipe.", acao: "Resolver uma issue de documentação ou um bug simples em um projeto open source Java" },
              { prio: "baixa", tit: "Currículo com formatação confusa", det: "O currículo atual mistura experiências acadêmicas com projetos pessoais sem separação clara. Um recrutador leva 7 segundos para decidir se continua lendo.", acao: "Reorganizar o currículo seguindo a estrutura sugerida" },
            ].map((item: any, i) => {
              const cores: Record<string, { bg: string; color: string; label: string }> = {
                alta: { bg: "rgba(239,68,68,0.18)", color: "#f87171", label: "🔴 Alta" },
                media: { bg: "rgba(234,179,8,0.18)", color: "#eab308", label: "🟡 Média" },
                baixa: { bg: "rgba(100,100,100,0.18)", color: "#9d9d9d", label: "⚪ Baixa" },
              };
              const c = cores[item.prio];
              return (
                <div key={i} style={{ padding: "14px 16px", borderRadius: 10, background: c.bg, border: `1px solid ${c.color}20` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                    <span style={{ padding: "2px 10px", borderRadius: 999, fontSize: 11, fontWeight: 700, background: c.bg, color: c.color }}>{c.label}</span>
                    <span style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: 14 }}>{item.tit}</span>
                  </div>
                  <p style={{ color: "var(--text-secondary)", fontSize: 13, margin: "0 0 6px", lineHeight: 1.5 }}>{item.det}</p>
                  <p style={{ color: c.color, fontSize: 13, margin: 0, fontWeight: 500 }}>→ {item.acao}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ height: 20 }} />

        {/* ============ INCONSISTÊNCIAS ============ */}
        <div id="inconsistencias" style={secaoStyle}>
          <h3 style={secaoTitle}>⚡ Inconsistências encontradas</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { tit: "Nível de inglês diferente entre as fontes", dec: "Declarado no currículo", con: "LinkedIn mostra nível básico", det: "No currículo consta 'inglês intermediário', mas no LinkedIn as experiências não mencionam uso do idioma. Isso pode levantar suspeita em entrevista se o recrutador testar." },
              { tit: "Períodos de experiência sobrepostos", dec: "Currículo e LinkedIn", con: "Datas inconsistentes", det: "O estágio na empresa X aparece com períodos diferentes no currículo (jan/2024-jun/2024) e no LinkedIn (fev/2024-ago/2024). Pode parecer descuido ou tentativa de inflar tempo." },
              { tit: "Tecnologias citadas mas sem evidência", dec: "LinkedIn lista React", con: "GitHub não tem projeto React", det: "React aparece listado como competência no LinkedIn, mas não há nenhum repositório, projeto ou exercício com React no GitHub. Se for mencionado em entrevista, o recrutador pode perguntar sobre." },
            ].map((item, i) => (
              <div key={i} style={{ padding: "14px 16px", borderRadius: 10, background: "rgba(234,179,8,0.06)", border: "1px solid rgba(234,179,8,0.15)" }}>
                <div style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: 14, marginBottom: 6 }}>{item.tit}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 3, fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>
                  <p style={{ margin: 0 }}><span style={{ color: "#eab308" }}>📌 Declarado em:</span> {item.dec}</p>
                  <p style={{ margin: 0 }}><span style={{ color: "#f87171" }}>⚠️ Contradito por:</span> {item.con}</p>
                  <p style={{ margin: "6px 0 0", fontStyle: "italic" }}>"{item.det}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ height: 20 }} />

        {/* ============ VISÃO DO RECRUTADOR ============ */}
        <div id="recrutador" style={secaoStyle}>
          <h3 style={secaoTitle}>👀 Visão do recrutador</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ padding: "16px 20px", borderRadius: 10, background: "var(--bg-secondary)", border: "1px solid var(--border)", textAlign: "center" as const }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Primeira Impressão</div>
              <p style={{ color: "var(--text-primary)", fontSize: 15, lineHeight: 1.6, margin: 0, fontStyle: "italic" }}>
                "Olhando por cima, parece mais um candidato que fez um curso de Java e está tentando entrar no mercado. O currículo é ok, mas nada me faz pensar 'preciso entrevistar essa pessoa'. O LinkedIn me preocupa — se está desatualizado, será que ele ainda está buscando ativamente?"
              </p>
            </div>

            <div style={{ padding: "14px 16px", borderRadius: 10, background: "rgba(74,222,128,0.06)", border: "1px solid rgba(74,222,128,0.15)" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#4ade80", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>👍 O que chamou atenção</div>
              <p style={{ color: "var(--text-primary)", fontSize: 13, lineHeight: 1.5, margin: "4px 0", paddingLeft: 8, borderLeft: "2px solid #4ade80" }}>
                "Ele tem projetos no GitHub — nem todo candidato iniciante tem. A faculdade de ADS é um ponto positivo, e o fato de ter feito estágio (mesmo curto) mostra que já passou por um ambiente profissional."
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={{ padding: "14px 16px", borderRadius: 10, background: "rgba(234,179,8,0.06)", border: "1px solid rgba(234,179,8,0.15)" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#eab308", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>🤔 Causou hesitação</div>
                <p style={{ color: "var(--text-primary)", fontSize: 13, lineHeight: 1.5, margin: "4px 0", paddingLeft: 8, borderLeft: "2px solid #eab308" }}>
                  "A falta de Spring Boot é o maior problema. 90% das vagas Java Júnior pedem Spring. Também não vi menção a banco de dados, que é obrigatório. O LinkedIn me preocupa — está muito genérico."
                </p>
              </div>
              <div style={{ padding: "14px 16px", borderRadius: 10, background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#f87171", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>❌ Descartaria imediatamente</div>
                <p style={{ color: "var(--text-primary)", fontSize: 13, lineHeight: 1.5, margin: "4px 0", paddingLeft: 8, borderLeft: "2px solid #f87171" }}>
                  "Se a vaga tiver mais de 50 candidatos (que é o normal), a falta de Spring Boot e projetos mais completos faria eu filtrar esse perfil. Não pelo potencial, mas porque outros candidatos já chegam com isso pronto."
                </p>
              </div>
            </div>

            <div style={{ padding: "14px 16px", borderRadius: 10, background: "rgba(74,222,128,0.08)", border: "1px solid var(--border)", textAlign: "center" as const }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>
                ⚠️ Passaria com ressalvas
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: 13, margin: 0 }}>
                "Se a vaga for para início imediato e tiver poucos candidatos, chamaria para entrevista para conhecer. Mas não é um perfil que me faria ligar correndo. O candidato precisa urgentemente de projetos mais sólidos."
              </p>
            </div>

            <div style={{ padding: "14px 16px", borderRadius: 10, background: "rgba(86,156,214,0.1)", border: "1px solid rgba(86,156,214,0.2)" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>🎯 Conselho direto</div>
              <p style={{ color: "var(--accent)", fontSize: 14, lineHeight: 1.5, margin: 0 }}>
                "João, para de perder tempo com projetinhos de console. Seu próximo mês precisa ser: uma API REST com Spring Boot + PostgreSQL publicada no GitHub, e um LinkedIn que mostre claramente 'sou dev Java buscando primeira vaga'. Sem isso, seu currículo vai continuar sendo filtrado."
              </p>
            </div>
          </div>
        </div>

        <div style={{ height: 20 }} />

        {/* ============ CURRÍCULO REESCRITO ============ */}
        <div id="curriculo" style={{ ...secaoStyle, borderColor: "rgba(86,156,214,0.3)" }}>
          <h3 style={secaoTitle}>✍️ Currículo reescrito</h3>

          <div style={{ textAlign: "right" as const, marginBottom: 16 }}>
            <button style={btnCopiar} onClick={() => copiarTexto(curriculoExemplo, "Currículo reescrito")}>📋 Copiar tudo</button>
          </div>

          <div style={cardDark}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
              Resumo Profissional
            </div>
            <p style={{ color: "var(--text-primary)", fontSize: 14, lineHeight: 1.6, margin: 0 }}>
              Desenvolvedor Java em formação com conhecimento em programação orientada a objetos, estrutura de dados e desenvolvimento de aplicações console. Busco oportunidade como Desenvolvedor Java Júnior para aplicar meus conhecimentos em Spring Boot, bancos relacionais e construção de APIs REST em projetos reais.
            </p>
          </div>

          <div style={{ marginTop: 12 }}>
            <div style={{ ...cardDark, marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <div>
                  <span style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: 14 }}>Estágio em Desenvolvimento</span>
                  <span style={{ color: "var(--text-secondary)", fontSize: 13 }}> — Empresa Tech</span>
                </div>
                <span style={{ color: "var(--text-secondary)", fontSize: 12 }}>jan/2024 - jun/2024</span>
              </div>
              <ul style={{ margin: "6px 0 0", paddingLeft: 18, color: "var(--text-secondary)", fontSize: 13, lineHeight: 1.6 }}>
                <li style={{ marginBottom: 4 }}>Desenvolvi e mantive 3 aplicações internas em Java, reduzindo o tempo de processos manuais em 40%</li>
                <li style={{ marginBottom: 4 }}>Colaborei com a equipe de suporte na correção de 15+ bugs em sistemas legados</li>
                <li>Participei de code reviews semanais com a equipe de desenvolvimento</li>
              </ul>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: 12 }}>
            <p style={{ color: "var(--text-secondary)", fontSize: 13, fontStyle: "italic" }}>
              Na análise completa, todas as experiências e projetos são reescritos com este nível de detalhe.
            </p>
          </div>
        </div>

        <div style={{ height: 20 }} />

        {/* ============ LINKEDIN REESCRITO ============ */}
        <div id="linkedin" style={{ ...secaoStyle, borderColor: "rgba(86,156,214,0.3)" }}>
          <h3 style={secaoTitle}>💼 LinkedIn reescrito</h3>

          <div style={{ textAlign: "right" as const, marginBottom: 16 }}>
            <button style={btnCopiar} onClick={() => copiarTexto(linkedinExemplo, "LinkedIn reescrito")}>📋 Copiar tudo</button>
          </div>

          <div style={cardDark}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Headline</div>
              <button style={btnCopiarPq} onClick={() => copiarTexto("Desenvolvedor Java | Spring Boot | PostgreSQL | Buscando primeira oportunidade em TI", "Headline")}>📋</button>
            </div>
            <p style={{ color: "var(--accent)", fontSize: 15, fontWeight: 500, margin: 0 }}>
              Desenvolvedor Java | Spring Boot | PostgreSQL | Buscando primeira oportunidade em TI
            </p>
          </div>

          <div style={{ marginTop: 12 }}>
            <div style={cardDark}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Sobre</div>
                <button style={btnCopiarPq} onClick={() => copiarTexto(sobreLinkedinExemplo, "Sobre do LinkedIn")}>📋</button>
              </div>
              <p style={{ color: "var(--text-primary)", fontSize: 14, lineHeight: 1.7, margin: 0, whiteSpace: "pre-wrap" }}>
                {sobreLinkedinExemplo}
              </p>
            </div>
          </div>

          <div style={{ marginTop: 12 }}>
            <div style={cardDark}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
                Competências sugeridas
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {["Java", "Spring Boot", "PostgreSQL", "MySQL", "REST APIs", "Git", "Estrutura de Dados", "POO", "SQL", "JPA/Hibernate"].map((c) => (
                  <span key={c} style={{ padding: "4px 12px", borderRadius: 999, background: "rgba(86,156,214,0.12)", color: "var(--accent)", fontSize: 12, fontWeight: 500 }}>{c}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={{ height: 20 }} />

        {/* ============ PLANO DE ESTUDOS ============ */}
        <div id="plano" style={{ ...secaoStyle, borderColor: "rgba(86,156,214,0.3)" }}>
          <h3 style={secaoTitle}>📚 Plano de estudos</h3>

          <div style={{ display: "flex", gap: 16, marginBottom: 20, flexWrap: "wrap" }}>
            {[
              { icon: "📅", text: "8 semanas" },
              { icon: "⏱️", text: "45 min/dia" },
            ].map((item) => (
              <div key={item.text} style={{
                display: "flex", alignItems: "center", gap: 8, padding: "10px 16px",
                borderRadius: 999, background: "rgba(86,156,214,0.1)", border: "1px solid rgba(86,156,214,0.2)",
              }}>
                <span style={{ fontSize: 20 }}>{item.icon}</span>
                <span style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: 14 }}>{item.text}</span>
              </div>
            ))}
          </div>

          <div style={{ position: "relative", paddingLeft: 32 }}>
            <div style={{ position: "absolute", left: 14, top: 0, bottom: 0, width: 2, background: "var(--border)" }} />

            {planoExemplo.map((semana: any, i: number) => (
              <div key={i} style={{ position: "relative", marginBottom: 24 }}>
                <div style={{
                  position: "absolute", left: -26, top: 6, width: 18, height: 18,
                  borderRadius: "50%", background: "var(--accent)", border: "3px solid var(--bg-primary)",
                  display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1,
                }}>
                  <span style={{ color: "#fff", fontSize: 10, fontWeight: 700 }}>{semana.semana}</span>
                </div>
                <div style={{ padding: "14px 16px", borderRadius: 10, background: "var(--bg-secondary)", border: "1px solid var(--border)", marginLeft: 8 }}>
                  <div style={{ fontWeight: 700, color: "var(--accent)", fontSize: 14, marginBottom: 4 }}>
                    Semana {semana.semana} — {semana.foco}
                  </div>
                  <p style={{ color: "var(--text-secondary)", fontSize: 12, lineHeight: 1.5, margin: "0 0 10px", fontStyle: "italic" }}>
                    {semana.porque}
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {semana.items.map((item: any, j: number) => (
                      <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 10px", borderRadius: 8, background: "rgba(0,0,0,0.15)" }}>
                        <span style={{ fontSize: 16, flexShrink: 0 }}>{item.tipo === "externo" ? "🔗" : item.tipo === "projeto" ? "🚀" : "📖"}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontWeight: 500, color: "var(--text-primary)", fontSize: 13 }}>
                              {item.tipo === "externo" ? (
                                <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)", textDecoration: "underline" }}>{item.titulo}</a>
                              ) : (
                                <span>{item.titulo}</span>
                              )}
                            </span>
                            <span style={{ color: "var(--text-secondary)", fontSize: 11, flexShrink: 0 }}>{item.tempo}h</span>
                          </div>
                          <p style={{ color: "var(--text-secondary)", fontSize: 12, margin: "2px 0 0", lineHeight: 1.4 }}>{item.motivo}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p style={{ color: "var(--accent)", fontSize: 14, textAlign: "center", margin: "8px 0 0", fontStyle: "italic" }}>
            "Foco é mais importante que velocidade. 45 minutos consistentes todo dia vencem 4 horas num sábado."
          </p>
        </div>

        <div style={{ height: 20 }} />

        {/* ============ VAGAS ============ */}
        <div id="vagas" style={{ ...secaoStyle, borderColor: "rgba(86,156,214,0.3)" }}>
          <h3 style={secaoTitle}>🏢 Vagas compatíveis</h3>

          <div style={{ textAlign: "center" as const, padding: "14px 20px", borderRadius: 10, background: "rgba(234,179,8,0.1)", border: "1px solid rgba(234,179,8,0.2)", marginBottom: 16 }}>
            <span style={{ fontSize: 24, marginRight: 8 }}>⏳</span>
            <span style={{ fontWeight: 700, color: "#eab308", fontSize: 15 }}>
              Ainda não está pronto — mas com 8 semanas de preparo, você chega lá
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            {[
              { tit: "Agora", cor: "#f87171", icon: "⛔", items: vagasAgora },
              { tit: "Em 30 dias", cor: "#eab308", icon: "📅", items: vagas30 },
              { tit: "Em 90 dias", cor: "#4ade80", icon: "🚀", items: vagas90 },
            ].map((col: any) => (
              <div key={col.tit} style={{ padding: "14px", borderRadius: 10, background: "var(--bg-secondary)", border: `1px solid ${col.cor}25`, display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ textAlign: "center" as const, paddingBottom: 10, borderBottom: `1px solid ${col.cor}25`, marginBottom: 4 }}>
                  <span style={{ fontSize: 20 }}>{col.icon}</span>
                  <div style={{ fontWeight: 700, color: col.cor, fontSize: 14, marginTop: 2 }}>{col.tit}</div>
                </div>
                {col.items.map((v: any, i: number) => (
                  <div key={i} style={{ padding: "10px", borderRadius: 8, background: "rgba(0,0,0,0.15)", border: "1px solid var(--border)" }}>
                    <div style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: 13 }}>{v.titulo}</div>
                    <p style={{ color: "var(--text-secondary)", fontSize: 12, lineHeight: 1.4, margin: "4px 0 0" }}>{v.desc}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <p style={{ color: "var(--text-secondary)", fontSize: 13, textAlign: "center", margin: "16px 0 0", fontStyle: "italic" }}>
            As vagas são identificadas com base no seu perfil real e no mercado brasileiro atual.
          </p>
        </div>

        <div style={{ height: 20 }} />

        {/* ============ PRÓXIMOS PASSOS ============ */}
        <div style={secaoStyle}>
          <h3 style={secaoTitle}>👣 Próximos passos</h3>
          <ol style={{ margin: 0, paddingLeft: 20 }}>
            {[
              "Prioridade máxima: criar uma API REST com Spring Boot + PostgreSQL e publicar no GitHub esta semana",
              "Atualizar o LinkedIn com headline e Sobre focados em Java Júnior ainda hoje (leva 30 minutos)",
              "Reorganizar o currículo seguindo a estrutura do currículo reescrito acima",
              "Adicionar README.md em todos os repositórios do GitHub com descrição e instruções",
              "Resolver 2 exercícios de SQL por dia no MeuPasso para fechar a lacuna de banco de dados",
              "Depois de 4 semanas de preparo, começar a aplicar para vagas de estágio e trainee",
            ].map((passo, i) => (
              <li key={i} style={{ color: "var(--text-primary)", fontSize: 14, marginBottom: 8, lineHeight: 1.6 }}>{passo}</li>
            ))}
          </ol>
        </div>

        <div style={{ height: 20 }} />

        {/* Mensagem final */}
        <div style={{ ...secaoStyle, background: "var(--bg-secondary)", borderColor: "transparent" }}>
          <p style={{ color: "var(--text-secondary)", fontStyle: "italic", lineHeight: 1.7, margin: 0, textAlign: "center", fontSize: 14 }}>
            "João, você não está longe. O que falta é direção — e agora você tem. O plano está na sua mão.
            A diferença entre quem consegue a vaga e quem fica tentando não é talento, é consistência.
            Foco nas prioridades certas e em 60 dias você entra no mercado. Vai."
          </p>
        </div>

        {/* CTA final */}
        <div style={{ textAlign: "center", margin: "32px 0 48px" }}>
          <Link href="/analise" style={ctaStyle}>
            Quero meu relatório completo — R$ 19,90
          </Link>
          <p style={{ color: "var(--text-secondary)", fontSize: 12, marginTop: 12 }}>
            Seu relatório será gerado com seus dados reais em minutos
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------- helpers ---------- */

function copiarTexto(texto: string, label: string) {
  if (typeof window !== "undefined") {
    navigator.clipboard.writeText(texto).then(() => alert(`${label} copiado!`));
  }
}

/* ---------- dados mockados ---------- */

const curriculoExemplo = `RESUMO PROFISSIONAL
Desenvolvedor Java em formação com conhecimento em programação orientada a objetos, estrutura de dados e desenvolvimento de aplicações console. Busco oportunidade como Desenvolvedor Java Júnior para aplicar meus conhecimentos em Spring Boot, bancos relacionais e construção de APIs REST em projetos reais.

EXPERIÊNCIA PROFISSIONAL

Estágio em Desenvolvimento | Empresa Tech | jan/2024 - jun/2024
  • Desenvolvi e mantive 3 aplicações internas em Java, reduzindo o tempo de processos manuais em 40%
  • Colaborei com a equipe de suporte na correção de 15+ bugs em sistemas legados
  • Participei de code reviews semanais com a equipe de desenvolvimento`;

const sobreLinkedinExemplo = `Sou desenvolvedor Java em formação, apaixonado por tecnologia e em busca da minha primeira oportunidade oficial na área.

Durante meu estágio em desenvolvimento, atuei na manutenção de sistemas internos e corrigi dezenas de bugs em aplicações Java legadas — experiência que me ensinou na prática como funciona o dia a dia de um time de desenvolvimento.

Atualmente estou focado em:
🔹 Aprofundar meus conhecimentos em Spring Boot e construção de APIs REST
🔹 Desenvolver projetos completos com banco de dados PostgreSQL
🔹 Criar um portfólio sólido no GitHub que mostre minha evolução técnica

Acredito que código bem escrito é código que resolve problemas reais. Busco um ambiente onde eu possa aprender com desenvolvedores mais experientes enquanto entrego valor desde o primeiro dia.`;

const planoExemplo = [
  {
    semana: 1,
    foco: "Fundamentos de Spring Boot",
    porque: "Spring Boot é pré-requisito em 90% das vagas Java Júnior. Sem ele, seu currículo é filtrado antes mesmo de um recrutador ler.",
    items: [
      { tipo: "modulo", titulo: "Introdução ao Spring Boot", tempo: "3h", motivo: "Entender o ecossistema Spring e como criar um projeto do zero" },
      { tipo: "modulo", titulo: "Injeção de Dependência e Beans", tempo: "2h", motivo: "Conceito fundamental do Spring — vai cair em toda entrevista" },
      { tipo: "exercicio", titulo: "CRUD simples com Spring Boot", tempo: "3h", motivo: "Primeiro projeto prático para fixar os conceitos" },
    ],
  },
  {
    semana: 2,
    foco: "API REST + Banco de Dados",
    porque: "Recrutadores querem ver que você sabe conectar uma aplicação a um banco real. Projetos console não contam.",
    items: [
      { tipo: "modulo", titulo: "JPA e Hibernate na prática", tempo: "3h", motivo: "Mapeamento objeto-relacional — essencial para qualquer vaga" },
      { tipo: "modulo", titulo: "SQL com PostgreSQL", tempo: "2h", motivo: "SQL é mandatório. Você precisa saber consultar, inserir e modelar" },
      { tipo: "projeto", titulo: "API de gerenciamento de tarefas com Spring Boot + PostgreSQL", tempo: "5h", motivo: "Projeto completo para o portfólio — o mínimo esperado de um candidato a Java Júnior" },
    ],
  },
  {
    semana: 3,
    foco: "Portfólio e GitHub profissional",
    porque: "Seu GitHub é seu currículo técnico. Recrutadores olham ele antes do currículo em PDF.",
    items: [
      { tipo: "externo", titulo: "Boas práticas de README no GitHub", tempo: "1h", url: "https://docs.github.com/pt/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/quickstart-for-writing-on-github", motivo: "Aprender a documentar seus projetos profissionalmente" },
      { tipo: "projeto", titulo: "Adicionar README, licença e descrição em todos os repositórios", tempo: "2h", motivo: "Projetos sem README parecem abandonados ou incompletos" },
      { tipo: "projeto", titulo: "Criar página GitHub Pages com portfólio", tempo: "3h", motivo: "Um link para seu portfólio no currículo vale mais que mil palavras" },
    ],
  },
  {
    semana: 4,
    foco: "LinkedIn e posicionamento profissional",
    porque: "Seu LinkedIn atual está te atrapalhando. Headline genérica = invisível para recrutadores.",
    items: [
      { tipo: "externo", titulo: "Guia de LinkedIn para devs iniciantes", tempo: "1h", url: "#", motivo: "Entender o que recrutadores buscam no perfil" },
      { tipo: "modulo", titulo: "Atualizar headline, sobre e experiências", tempo: "1h", motivo: "Seguir a estrutura do LinkedIn reescrito na análise" },
      { tipo: "modulo", titulo: "Produzir conteúdo técnico básico", tempo: "2h", motivo: "Compartilhar aprendizado aumenta visibilidade com recrutadores" },
    ],
  },
  {
    semana: 5,
    foco: "Projeto avançado + Testes",
    porque: "Saber testar código é diferencial competitivo — a maioria dos candidatos iniciantes não sabe.",
    items: [
      { tipo: "modulo", titulo: "Testes unitários com JUnit 5", tempo: "3h", motivo: "Testes são cobrados em 60% dos processos seletivos" },
      { tipo: "modulo", titulo: "Mockito para testes com dependências", tempo: "2h", motivo: "Complemento essencial do JUnit para testar APIs" },
      { tipo: "projeto", titulo: "Adicionar testes ao projeto da semana 2", tempo: "3h", motivo: "Seu portfólio com testes mostra maturidade técnica" },
    ],
  },
  {
    semana: 6,
    foco: "Autenticação e segurança básica",
    porque: "Segurança é um tema que aparece em toda entrevista técnica, mesmo para júnior.",
    items: [
      { tipo: "modulo", titulo: "Spring Security básico", tempo: "3h", motivo: "Entender autenticação e autorização em APIs" },
      { tipo: "modulo", titulo: "JWT na prática", tempo: "2h", motivo: "Token JWT é padrão de mercado para APIs REST" },
      { tipo: "projeto", titulo: "Adicionar autenticação JWT ao projeto", tempo: "4h", motivo: "Projeto completo com autenticação = destaque no portfólio" },
    ],
  },
  {
    semana: 7,
    foco: "Preparação para entrevistas",
    porque: "Saber programar não é suficiente — você precisa passar pelas entrevistas técnicas.",
    items: [
      { tipo: "exercicio", titulo: "Algoritmos e estrutura de dados", tempo: "3h", motivo: "Revisar os tópicos que mais caem em entrevistas" },
      { tipo: "modulo", titulo: "Desafios de código simulados", tempo: "2h", motivo: "Praticar com tempo limitado igual ao processo seletivo" },
      { tipo: "externo", titulo: "Perguntas comuns de entrevistas Java Júnior", tempo: "2h", url: "#", motivo: "Se preparar para as perguntas comportamentais e técnicas" },
    ],
  },
  {
    semana: 8,
    foco: "Finalização e aplicação para vagas",
    porque: "Chegou a hora de colocar tudo em prática e começar a aplicar.",
    items: [
      { tipo: "modulo", titulo: "Revisão geral do portfólio", tempo: "2h", motivo: "Garantir que tudo está funcionando e bem documentado" },
      { tipo: "modulo", titulo: "Cadastro em plataformas de vagas", tempo: "1h", motivo: "Ativar perfil no LinkedIn, Gupy, Programathor e GeekHunter" },
      { tipo: "externo", titulo: "Aplicar para 10 vagas por semana", tempo: "3h", url: "#", motivo: "Número consistente de aplicações aumenta exponencialmente as chances" },
    ],
  },
];

const vagasAgora = [
  { titulo: "Estágio em TI", desc: "Empresas menores aceitam estagiários com conhecimento básico de Java e pouca experiência prática." },
  { titulo: "Trainee Java", desc: "Alguns programas de trainee não exigem Spring Boot — apenas lógica e Java básico." },
];

const vagas30 = [
  { titulo: "Estágio Desenvolvimento Java", desc: "Com Spring Boot básico e um CRUD no GitHub, você já se destaca da maioria." },
  { titulo: "Dev Java Júnior (empresa pequena)", desc: "Empresas menores têm processos mais flexíveis e olham mais o potencial." },
];

const vagas90 = [
  { titulo: "Dev Java Júnior", desc: "Com portfólio completo + testes + autenticação, você compete de igual com outros juniors." },
  { titulo: "Dev Back-end Júnior", desc: "Sua base em Java + Spring Boot + SQL abre portas para vagas back-end em geral." },
  { titulo: "Analista de Sistemas Júnior", desc: "Perfil com conhecimento técnico e estágio é bem avaliado para análise." },
];

/* ---------- styles ---------- */

const pageStyle: React.CSSProperties = {
  minHeight: "100vh",
  background: "var(--bg-primary)",
  padding: "2rem 1rem",
};

const containerStyle: React.CSSProperties = {
  maxWidth: 760,
  margin: "0 auto",
};

const breadcrumbStyle: React.CSSProperties = {
  color: "var(--accent)",
  textDecoration: "none",
  fontSize: 14,
  display: "inline-block",
  marginBottom: 16,
};

const avisoStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  padding: "12px 16px",
  borderRadius: 10,
  background: "rgba(86,156,214,0.08)",
  border: "1px solid rgba(86,156,214,0.2)",
  marginBottom: 20,
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

const indiceItemStyle: React.CSSProperties = {
  padding: "4px 12px",
  borderRadius: 999,
  background: "var(--bg-secondary)",
  border: "1px solid var(--border)",
  color: "var(--text-secondary)",
  fontSize: 12,
  textDecoration: "none",
  cursor: "pointer",
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

const ctaStyle: React.CSSProperties = {
  display: "inline-block",
  padding: "14px 48px",
  background: "linear-gradient(135deg, #569cd6, #3b82f6)",
  color: "#fff",
  border: "none",
  borderRadius: "0.5rem",
  fontSize: 18,
  fontWeight: 700,
  cursor: "pointer",
  textDecoration: "none",
};
