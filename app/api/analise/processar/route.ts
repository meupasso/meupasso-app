import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";

export const dynamic = "force-dynamic";
export const maxDuration = 300; // 5 min timeout for the 10-prompt chain

const DEEPSEEK_URL = "https://api.deepseek.com/chat/completions";
const MAX_RETRIES = 1;
const SYSTEM_CONTEXT =
  "Você é um assistente especializado em raio-x de carreira para desenvolvedores no Brasil. Responda sempre em português brasileiro. Retorne APENAS JSON válido, sem markdown, sem explicações, sem backticks.";

/* ---------- types ---------- */

interface PromptResult {
  success: boolean;
  data?: any;
  error?: string;
}

/* ---------- LLM call ---------- */

async function callDeepSeek(
  prompt: string,
  temperature = 0.3,
  maxTokens = 4096
): Promise<string> {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) throw new Error("DEEPSEEK_API_KEY não configurada");

  const res = await fetch(DEEPSEEK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: SYSTEM_CONTEXT },
        { role: "user", content: prompt },
      ],
      stream: false,
      max_tokens: maxTokens,
      temperature,
    }),
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`DeepSeek API ${res.status}: ${errBody.slice(0, 500)}`);
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content ?? "";
  if (!content) throw new Error("Resposta vazia da DeepSeek");

  return content;
}

/* ---------- JSON parsing with retry ---------- */

async function callAndParse(
  prompt: string,
  temperature = 0.3,
  maxTokens = 4096
): Promise<PromptResult> {
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const raw = await callDeepSeek(prompt, temperature, maxTokens);
      // Strip any markdown code fences the model might add despite instructions
      const cleaned = raw
        .replace(/^```(?:json)?\s*/i, "")
        .replace(/\s*```$/i, "")
        .trim();
      const parsed = JSON.parse(cleaned);
      return { success: true, data: parsed };
    } catch (err: any) {
      const isLast = attempt === MAX_RETRIES;
      console.error(
        `Tentativa ${attempt + 1}/${MAX_RETRIES + 1} falhou:`,
        err.message
      );
      if (isLast) {
        return {
          success: false,
          error: err.message,
        };
      }
    }
  }
  return { success: false, error: "Falha inesperada no parse" };
}

/* ---------- DB helpers ---------- */

function formatContentMap(
  exercicios: any[],
  projetos: any[],
  trilhas: any[]
): string {
  // Group exercises by language → module
  const byLang: Record<string, any> = {};
  for (const ex of exercicios) {
    const lang = ex.linguagem;
    if (!byLang[lang]) byLang[lang] = { exercicios: {}, total: 0 };
    byLang[lang].total++;
    const mod = ex.modulo || "Geral";
    if (!byLang[lang].exercicios[mod]) byLang[lang].exercicios[mod] = [];
    byLang[lang].exercicios[mod].push({
      t: ex.titulo,
      n: ex.nivel,
    });
  }

  let output = "=== MAPA DE CONTEÚDOS DO MeuPasso ===\n\n";

  for (const [lang, data] of Object.entries(byLang)) {
    output += `--- ${lang} (${data.total} exercícios) ---\n`;
    for (const [mod, items] of Object.entries(data.exercicios)) {
      const levels = items as any[];
      output += `  Módulo "${mod}": ${levels.length} exercícios\n`;
      const byNivel: Record<string, number> = {};
      for (const item of levels) {
        byNivel[item.n] = (byNivel[item.n] || 0) + 1;
      }
      output += `    Níveis: ${Object.entries(byNivel)
        .map(([k, v]) => `${k}=${v}`)
        .join(", ")}\n`;
    }
  }

  // Add projects
  if (projetos.length > 0) {
    output += `\n--- Projetos (${projetos.length}) ---\n`;
    for (const p of projetos) {
      output += `  - ${p.linguagem}: ${p.titulo}\n`;
    }
  }

  // Add trilhas
  if (trilhas.length > 0) {
    output += `\n--- Trilhas de Aprendizado ---\n`;
    for (const t of trilhas) {
      output += `  - ${t.titulo}: ${t.descricao_curta || ""}\n`;
    }
  }

  return output;
}

async function fetchContentMap(supabase: ReturnType<typeof createServiceClient>) {
  const [exercicios, projetos, trilhas] = await Promise.all([
    supabase.from("exercicios").select("linguagem, modulo, titulo, nivel"),
    supabase.from("projetos").select("linguagem, titulo, slug"),
    supabase.from("trilhas").select("slug, titulo, descricao_curta"),
  ]);

  return formatContentMap(
    exercicios.data || [],
    projetos.data || [],
    trilhas.data || []
  );
}

/* ---------- prompt templates ---------- */

const PROMPT_1 = `Você é um extrator de dados profissionais.
Sua única tarefa é estruturar as informações do currículo abaixo em JSON.
Não analise, não opine, não sugira. Apenas extraia exatamente o que está escrito.
Se um campo não existir no currículo, retorne null.

Currículo:
{{curriculo_texto}}

Retorne APENAS o JSON, sem explicações, sem markdown, sem backticks.

{
  "nome": "",
  "objetivo_declarado": "",
  "formacao": [
    { "curso": "", "instituicao": "", "ano_conclusao": "" }
  ],
  "experiencias": [
    { "cargo": "", "empresa": "", "periodo": "", "descricao": "" }
  ],
  "tecnologias": [],
  "projetos": [
    { "nome": "", "descricao": "", "tecnologias": [] }
  ],
  "idiomas": [],
  "certificacoes": []
}`;

const PROMPT_2 = `Você é um extrator de dados profissionais.
Sua única tarefa é estruturar as informações do perfil LinkedIn abaixo em JSON.
Não analise, não opine, não sugira. Apenas extraia exatamente o que está escrito.
Se um campo não existir no perfil, retorne null.

LinkedIn:
{{linkedin_texto}}

Retorne APENAS o JSON, sem explicações, sem markdown, sem backticks.

{
  "headline": "",
  "sobre": "",
  "posicionamento_declarado": "",
  "experiencias": [
    { "cargo": "", "empresa": "", "periodo": "", "descricao": "" }
  ],
  "competencias": [],
  "recomendacoes": [],
  "certificacoes": [],
  "formacao": []
}`;

const PROMPT_3 = `Você é um engenheiro sênior revisando o portfólio técnico de um candidato.
Analise os repositórios e amostras de código abaixo com olhar técnico real.
Não seja condescendente. Aponte o que existe e o que está faltando com precisão.

Repositórios:
{{repos_json}}

Amostras de código (máximo 3 arquivos por repo, 300 linhas cada):
{{codigo_amostras}}

Retorne APENAS o JSON, sem explicações, sem markdown, sem backticks.

{
  "linguagens_identificadas": [],
  "nivel_atividade": "alto|medio|baixo",
  "ultimo_commit_dias": 0,
  "total_repos_publicos": 0,
  "repos_com_readme": 0,
  "conceitos_identificados": {
    "confirmados": [],
    "ausentes": []
  },
  "qualidade_codigo": {
    "organizacao": "boa|regular|ruim",
    "nomenclatura": "boa|regular|ruim",
    "documentacao": "boa|regular|ruim",
    "observacoes": ""
  },
  "projetos_relevantes": [
    {
      "nome": "",
      "tecnologias": [],
      "complexidade": "alta|media|baixa",
      "observacao": ""
    }
  ]
}`;

const PROMPT_4 = `Você é um recrutador técnico sênior com 10 anos de experiência contratando desenvolvedores júnior no Brasil.

Analise as três fontes abaixo. Identifique o que bate, o que contradiz e o que está completamente ausente.
Seja específico — cite exemplos reais encontrados nos dados.
Evite generalidades como "o candidato precisa melhorar sua comunicação".

Ao analisar formação acadêmica, verifique se as datas de experiência profissional são compatíveis com o período de formação declarado. Se um estágio ocorreu antes da conclusão do curso, isso é normal. Se as datas se sobrepõem de forma inconsistente, sinalize como inconsistência.

Objetivo de vaga: {{objetivo_vaga}}

Currículo:
{{json_curriculo}}

LinkedIn:
{{json_linkedin}}

GitHub:
{{json_github}}

Retorne APENAS o JSON, sem explicações, sem markdown, sem backticks.

{
  "consistencias": [
    { "item": "", "fontes": [], "observacao": "" }
  ],
  "inconsistencias": [
    { "item": "", "declarado_em": "", "contradito_por": "", "detalhe": "" }
  ],
  "pontos_cegos": [
    { "item": "", "por_que_importa_para_vaga": "", "evidencia_encontrada": false }
  ],
  "pontos_fortes": [
    { "item": "", "evidencia": "" }
  ],
  "resumo_honesto": ""
}`;

const PROMPT_5 = `Você é um especialista em empregabilidade tech no Brasil.

Com base na análise cruzada abaixo, avalie o candidato em cinco dimensões e identifique o que falta para a vaga desejada.

Fale como um mentor direto, sem jargão de RH.

Ao calcular os scores, considere o contexto completo do candidato:
- Experiência como professor de programação conta como evidência técnica sólida
- Projetos próprios publicados (startups, produtos) contam mais que exercícios acadêmicos
- Diversidade de linguagens no GitHub é positiva, não negativa
- Um score abaixo de 30 só é válido se o candidato não tiver nenhuma experiência técnica comprovada

Escala de referência:
- 0-30: sem experiência técnica comprovada em nenhuma fonte
- 31-50: base técnica presente mas portfólio fraco
- 51-70: perfil em desenvolvimento, gaps claros
- 71-85: perfil sólido com pontos de melhoria
- 86-100: pronto para aplicar com alta chance de retorno

Para cada item em o_que_falta, o campo por_que_importa deve ser específico para este candidato — cite uma evidência real encontrada nos dados (ex: "Seu GitHub tem X repos mas nenhum usa Y"). Nunca escreva definições genéricas do tipo "X é importante para desenvolvedores Java". O usuário já sabe o que é X. Ele precisa saber por que X está travando ele especificamente.

Objetivo de vaga: {{objetivo_vaga}}
Análise cruzada: {{json_cruzamento}}

Retorne APENAS o JSON, sem explicações, sem markdown, sem backticks.

{
  "scores": {
    "perfil_profissional": {
      "valor": 0,
      "criterios": [
        { "item": "", "aprovado": true, "observacao": "" }
      ]
    },
    "portfolio_tecnico": {
      "valor": 0,
      "criterios": [
        { "item": "", "aprovado": true, "observacao": "" }
      ]
    },
    "presenca_online": {
      "valor": 0,
      "criterios": [
        { "item": "", "aprovado": true, "observacao": "" }
      ]
    },
    "consistencia": {
      "valor": 0,
      "criterios": [
        { "item": "", "aprovado": true, "observacao": "" }
      ]
    },
    "preparacao_para_vaga": {
      "valor": 0,
      "label": "Preparação para {{objetivo_vaga}}",
      "criterios": [
        { "item": "", "aprovado": true, "observacao": "" }
      ]
    }
  },
  "o_que_falta": [
    {
      "categoria": "tecnico|portfolio|posicionamento|comportamental",
      "item": "",
      "prioridade": "alta|media|baixa",
      "evidencia": "",
      "por_que_importa": "",
      "impacto_na_vaga": ""
    }
  ],
  "o_que_ja_tem": [
    { "item": "", "diferencial": "" }
  ],
  "tempo_estimado_preparo": "",
  "veredicto": "pronto|quase_la|precisa_evoluir|recomecar"
}`;

const PROMPT_6 = `Você é um especialista em posicionamento profissional para desenvolvedores no mercado brasileiro.

Reescreva o currículo e o perfil LinkedIn dessa pessoa com base nos dados abaixo.
O objetivo é que ela consiga uma vaga como {{objetivo_vaga}}.

Regras:
- Escreva em primeira pessoa no LinkedIn, terceira no currículo
- Use verbos de ação e números sempre que os dados permitirem
- Não invente informações que não estão nos dados
- Se não houver números reais, use linguagem de impacto sem inventar métricas
- A headline do LinkedIn deve ser específica para o cargo desejado
- O "Sobre" do LinkedIn deve ter entre 1.200 e 1.800 caracteres
- Cada experiência deve ter no mínimo 2 bullets com impacto

Currículo atual:
{{json_curriculo}}

LinkedIn atual:
{{json_linkedin}}

O que falta para a vaga:
{{json_o_que_falta}}

Retorne APENAS o JSON, sem explicações, sem markdown, sem backticks.

{
  "curriculo_reescrito": {
    "objetivo": "",
    "resumo_profissional": "",
    "experiencias": [
      { "cargo": "", "empresa": "", "periodo": "", "bullets": [] }
    ],
    "projetos": [
      { "nome": "", "descricao": "", "tecnologias": [] }
    ]
  },
  "linkedin_reescrito": {
    "headline": "",
    "sobre": "",
    "experiencias": [
      { "cargo": "", "empresa": "", "periodo": "", "descricao": "" }
    ],
    "competencias_sugeridas": []
  }
}`;

const PROMPT_7 = `Você é um recrutador técnico de uma empresa brasileira de tecnologia.
Você acabou de receber o perfil abaixo para uma vaga de {{objetivo_vaga}}.

Simule sua análise real: o que chamaria atenção positivamente, o que faria você hesitar, o que faria você descartar imediatamente.
Fale na primeira pessoa como recrutador. Seja honesto como você seria internamente — não como você seria em um feedback formal para o candidato.

Cruzamento:
{{json_cruzamento}}

O que falta:
{{json_o_que_falta}}

Retorne APENAS o JSON, sem explicações, sem markdown, sem backticks.

{
  "primeira_impressao": "",
  "o_que_chamou_atencao_positivo": [],
  "o_que_causou_hesitacao": [],
  "o_que_descartaria_imediatamente": [],
  "passaria_para_proxima_fase": true,
  "justificativa_decisao": "",
  "conselho_direto": ""
}`;

const PROMPT_8 = `Você é um orientador de carreira especializado em programação para iniciantes brasileiros.

Com base no que falta abaixo, monte um plano de estudos priorizado semana a semana.

Regras importantes:
- Use APENAS os conteúdos listados em {{mapa_conteudo_meupasso}}
- Não invente conteúdo que não está na lista
- Se não houver conteúdo do MeuPasso para um item, indique recursos externos gratuitos
- O plano deve ser realista: máximo 1 hora por dia
- Comece sempre pelo que tem maior impacto na empregabilidade, não pelo mais fácil
- Explique em linguagem simples por que cada item está naquela semana

O que falta:
{{json_o_que_falta}}

Conteúdos disponíveis no MeuPasso:
{{mapa_conteudo_meupasso}}

Retorne APENAS o JSON, sem explicações, sem markdown, sem backticks.

{
  "plano": [
    {
      "semana": 1,
      "foco": "",
      "por_que_essa_semana": "",
      "items": [
        {
          "tipo": "modulo|exercicio|projeto|externo",
          "titulo": "",
          "slug": "",
          "url_externa": "",
          "tempo_estimado_horas": 0,
          "motivo": "",
          "resolve": ""
        }
      ]
    }
  ],
  "duracao_total_semanas": 0,
  "dedicacao_diaria_minutos": 0,
  "mensagem_motivacional": ""
}`;

const PROMPT_9 = `Você é um especialista no mercado de trabalho tech brasileiro.

Com base no perfil abaixo, identifique que tipos de vagas essa pessoa já tem condições de aplicar agora — não as vagas dos sonhos, mas as vagas reais onde ela tem chance real de passar.

Seja honesto. Se o perfil ainda não está pronto para nenhuma vaga, diga isso claramente e explique o que falta para a primeira aplicação real.

Objetivo desejado: {{objetivo_vaga}}

Cruzamento:
{{json_cruzamento}}

O que falta:
{{json_o_que_falta}}

Retorne APENAS o JSON, sem explicações, sem markdown, sem backticks.

{
  "pronto_para_aplicar": true,
  "vagas_compativeis_agora": [
    {
      "titulo": "",
      "nivel": "estagio|junior|pleno",
      "por_que_compativel": "",
      "tecnologias_que_batem": [],
      "o_que_ainda_falta": ""
    }
  ],
  "vagas_em_30_dias": [
    { "titulo": "", "o_que_precisa_fazer_antes": "" }
  ],
  "vagas_em_90_dias": [
    { "titulo": "", "o_que_precisa_fazer_antes": "" }
  ],
  "mensagem": ""
}`;

const PROMPT_10 = `Você é um copywriter especializado em feedback profissional para desenvolvedores iniciantes.

Monte o relatório final com base em todos os dados abaixo.
Esse relatório será renderizado visualmente — cada seção vira um bloco na interface.

Tom: direto, humano, encorajador — mas sem mentir ou suavizar problemas reais.
Fale como um mentor que se importa, não como um sistema automatizado.
Use linguagem próxima, sem jargão corporativo.

Scores (cinco dimensões): {{scores_json}}
Veredicto: {{veredicto}}
O que falta: {{json_o_que_falta}}
Cruzamento: {{json_cruzamento}}
Visão do recrutador: {{json_recrutador}}
Plano de estudos: {{json_plano}}
Vagas compatíveis: {{json_vagas}}
Currículo reescrito: {{json_curriculo_reescrito}}
LinkedIn reescrito: {{json_linkedin_reescrito}}

Retorne APENAS o JSON, sem explicações, sem markdown, sem backticks.

{
  "titulo": "",
  "subtitulo": "",
  "scores": {
    "perfil_profissional": { "valor": 0, "criterios": [] },
    "portfolio_tecnico": { "valor": 0, "criterios": [] },
    "presenca_online": { "valor": 0, "criterios": [] },
    "consistencia": { "valor": 0, "criterios": [] },
    "preparacao_para_vaga": { "valor": 0, "criterios": [], "label": "" }
  },
  "veredicto_texto": "",
  "secoes": [
    {
      "id": "scores-geral",
      "titulo": "Sua pontuação geral",
      "tipo": "scores",
      "desbloqueada": true,
      "items": []
    },
    {
      "id": "",
      "titulo": "",
      "tipo": "pontos_fortes|pontos_cegos|inconsistencias|recrutador|plano|vagas|curriculo|linkedin",
      "desbloqueada": true,
      "items": [
        {
          "prioridade": "alto|medio|baixo",
          "titulo": "",
          "detalhe": "",
          "acao": ""
        }
      ]
    }
  ],
  "proximos_passos": [],
  "mensagem_final": ""
}`;

/* ---------- route ---------- */

/**
 * POST /api/analise/processar
 *
 * Executa a cadeia completa de 10 prompts do Raio-X de Carreira.
 *
 * Body: { id: "uuid-da-analise" }
 *
 * Fluxo:
 *   1-3: Extração/estruturação dos dados brutos
 *   4:   Cruzamento das fontes
 *   5:   O que falta para a vaga
 *   6:   Reescreve currículo e LinkedIn
 *   7:   Visão do recrutador
 *   8:   Plano de estudos (com mapa de conteúdos do MeuPasso)
 *   9:   Vagas compatíveis
 *   10:  Relatório final
 *
 * Cada etapa salva no banco antes de prosseguir.
 * Se qualquer etapa falhar após retry, status vira "erro".
 */
export async function POST(req: NextRequest) {
  const supabase = createClient();
  const serviceDb = createServiceClient();
  let analiseId: string | null = null;

  try {
    /* --- body (extrair ID antes de qualquer operação para uso no catch) --- */
    const body = await req.json();
    analiseId = body?.id;

    if (!analiseId) {
      return NextResponse.json(
        { error: "ID da análise é obrigatório" },
        { status: 400 }
      );
    }

    /* --- autenticação --- */
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    /* --- buscar análise --- */
    const { data: analise, error: buscaErr } = await supabase
      .from("analises_empregabilidade")
      .select("*")
      .eq("id", analiseId)
      .eq("user_id", user.id)
      .single();

    if (buscaErr || !analise) {
      return NextResponse.json(
        { error: "Análise não encontrada" },
        { status: 404 }
      );
    }

    if (analise.status === "concluido") {
      return NextResponse.json({
        id: analiseId,
        status: "concluido",
        json_relatorio_final: analise.json_relatorio_final,
      });
    }

    /* --- helpers internos --- */

    const saveStep = async (column: string, value: any) => {
      await supabase
        .from("analises_empregabilidade")
        .update({ [column]: value })
        .eq("id", analiseId);
    };

    const setStatus = async (status: string) => {
      await supabase
        .from("analises_empregabilidade")
        .update({ status })
        .eq("id", analiseId);
    };

    const abortChain = async (step: number, reason: string) => {
      console.error(`Chain abortada no passo ${step}: ${reason}`);
      await setStatus("erro");
      return NextResponse.json(
        {
          error: `Erro no passo ${step}: ${reason}`,
          passo: step,
        },
        { status: 500 }
      );
    };

    /* ==================================================================
       EXTRAIR dados brutos dos campos atuais do banco
       ================================================================== */

    const curriculoRawText =
      analise.json_curriculo?.texto ||
      (typeof analise.json_curriculo === "string"
        ? analise.json_curriculo
        : JSON.stringify(analise.json_curriculo || ""));

    const linkedinRawText =
      analise.json_linkedin?.texto ||
      (typeof analise.json_linkedin === "string"
        ? analise.json_linkedin
        : JSON.stringify(analise.json_linkedin || ""));

    const githubReposRaw = analise.json_github || [];
    const githubReposStr =
      typeof githubReposRaw === "string"
        ? githubReposRaw
        : JSON.stringify(githubReposRaw, null, 2);

    // Extrair amostras de código do GitHub para o prompt 3
    let codigoAmostras = "Nenhuma amostra de código disponível.";
    if (Array.isArray(githubReposRaw)) {
      const samples: string[] = [];
      for (const repo of githubReposRaw) {
        if (repo.arquivos && Array.isArray(repo.arquivos)) {
          for (const arq of repo.arquivos) {
            samples.push(`--- ${arq.nome} (repo: ${repo.repo}) ---\n${arq.conteudo}\n`);
          }
        }
      }
      if (samples.length > 0) codigoAmostras = samples.join("\n");
    }

    const objetivoVaga = analise.objetivo_vaga || "desenvolvedor(a) júnior";

    /* ==================================================================
       EXECUTAR CADEIA
       ================================================================== */

    // --- PASSO 1: Extrair currículo ---
    let jsonCurriculo: any = analise.json_curriculo;
    if (!jsonCurriculo || jsonCurriculo.texto) {
      // Só extrai se ainda está no formato raw (contém campo "texto")
      const r1 = await callAndParse(
        PROMPT_1.replace("{{curriculo_texto}}", curriculoRawText),
        0.2,
        4096
      );
      if (!r1.success) return await abortChain(1, r1.error!);
      jsonCurriculo = r1.data;
      await saveStep("json_curriculo", jsonCurriculo);
      console.log("✅ Passo 1 — Currículo extraído");
    }

    // --- PASSO 2: Extrair LinkedIn ---
    let jsonLinkedin: any = analise.json_linkedin;
    if (!jsonLinkedin || jsonLinkedin.texto) {
      const r2 = await callAndParse(
        PROMPT_2.replace("{{linkedin_texto}}", linkedinRawText),
        0.2,
        4096
      );
      if (!r2.success) return await abortChain(2, r2.error!);
      jsonLinkedin = r2.data;
      await saveStep("json_linkedin", jsonLinkedin);
      console.log("✅ Passo 2 — LinkedIn extraído");
    }

    // --- PASSO 3: Analisar GitHub ---
    let jsonGithub: any = analise.json_github;
    if (Array.isArray(jsonGithub) && jsonGithub.length > 0 && !jsonGithub[0]?.linguagens_identificadas) {
      // Só processa se ainda não foi analisado (não tem campo de análise)
      const r3 = await callAndParse(
        PROMPT_3.replace("{{repos_json}}", githubReposStr).replace(
          "{{codigo_amostras}}",
          codigoAmostras
        ),
        0.3,
        4096
      );
      if (!r3.success) return await abortChain(3, r3.error!);
      jsonGithub = r3.data;
      await saveStep("json_github", jsonGithub);
      console.log("✅ Passo 3 — GitHub analisado");
    }

    const jsonCurriculoStr = JSON.stringify(jsonCurriculo, null, 2);
    const jsonLinkedinStr = JSON.stringify(jsonLinkedin, null, 2);
    const jsonGithubStr = JSON.stringify(jsonGithub, null, 2);

    // --- PASSO 4: Cruzamento ---
    let jsonCruzamento: any = analise.json_cruzamento;
    if (!jsonCruzamento) {
      const r4 = await callAndParse(
        PROMPT_4.replace("{{objetivo_vaga}}", objetivoVaga)
          .replace("{{json_curriculo}}", jsonCurriculoStr)
          .replace("{{json_linkedin}}", jsonLinkedinStr)
          .replace("{{json_github}}", jsonGithubStr),
        0.4,
        4096
      );
      if (!r4.success) return await abortChain(4, r4.error!);
      jsonCruzamento = r4.data;
      await saveStep("json_cruzamento", jsonCruzamento);
      console.log("✅ Passo 4 — Cruzamento concluído");
    }

    const jsonCruzamentoStr = JSON.stringify(jsonCruzamento, null, 2);

    // --- PASSO 5: O que falta para a vaga ---
    let jsonOFalta: any = analise.json_o_que_falta;
    if (!jsonOFalta) {
      const r5 = await callAndParse(
        PROMPT_5.replace("{{objetivo_vaga}}", objetivoVaga).replace(
          "{{json_cruzamento}}",
          jsonCruzamentoStr
        ),
        0.4,
        4096
      );
      if (!r5.success) return await abortChain(5, r5.error!);
      jsonOFalta = r5.data;
      console.log("PROMPT 5 OUTPUT:", JSON.stringify(jsonOFalta, null, 2));
      // Verificar se scores está presente com as 5 dimensões
      const dims = ["perfil_profissional", "portfolio_tecnico", "presenca_online", "consistencia", "preparacao_para_vaga"];
      const hasScores = jsonOFalta.scores && dims.every((d) => jsonOFalta.scores[d] !== undefined);
      if (!hasScores) {
        console.error("PROMPT 5 ERRO: objeto scores incompleto. Dimensões esperadas:", dims);
      }
      await saveStep("json_o_que_falta", jsonOFalta);
      console.log("✅ Passo 5 — O que falta concluído");
    }

    const jsonOFaltaStr = JSON.stringify(jsonOFalta, null, 2);
    const scores =
      jsonOFalta.scores ?? {};
    const veredicto = jsonOFalta.veredicto ?? "precisa_evoluir";

    // --- PASSO 6: Reescrever currículo e LinkedIn ---
    let jsonCurriculoReescrito: any = analise.json_curriculo_reescrito;
    let jsonLinkedinReescrito: any = analise.json_linkedin_reescrito;
    if (!jsonCurriculoReescrito) {
      const r6 = await callAndParse(
        PROMPT_6.replace("{{objetivo_vaga}}", objetivoVaga)
          .replace("{{json_curriculo}}", jsonCurriculoStr)
          .replace("{{json_linkedin}}", jsonLinkedinStr)
          .replace("{{json_o_que_falta}}", jsonOFaltaStr),
        0.4,
        8192
      );
      if (!r6.success) return await abortChain(6, r6.error!);
      jsonCurriculoReescrito = r6.data.curriculo_reescrito || null;
      jsonLinkedinReescrito = r6.data.linkedin_reescrito || null;
      await saveStep("json_curriculo_reescrito", jsonCurriculoReescrito);
      await saveStep("json_linkedin_reescrito", jsonLinkedinReescrito);
      console.log("✅ Passo 6 — Currículo e LinkedIn reescritos");
    }

    // --- PASSO 7: Visão do recrutador ---
    let jsonRecrutador: any = analise.json_recrutador;
    if (!jsonRecrutador) {
      const r7 = await callAndParse(
        PROMPT_7.replace("{{objetivo_vaga}}", objetivoVaga)
          .replace("{{json_cruzamento}}", jsonCruzamentoStr)
          .replace("{{json_o_que_falta}}", jsonOFaltaStr),
        0.5,
        4096
      );
      if (!r7.success) return await abortChain(7, r7.error!);
      jsonRecrutador = r7.data;
      await saveStep("json_recrutador", jsonRecrutador);
      console.log("✅ Passo 7 — Visão do recrutador concluída");
    }

    const jsonRecrutadorStr = JSON.stringify(jsonRecrutador, null, 2);

    // --- PASSO 8: Plano de estudos ---
    let jsonPlano: any = analise.json_plano;
    if (!jsonPlano) {
      const mapaConteudo = await fetchContentMap(serviceDb);
      const r8 = await callAndParse(
        PROMPT_8.replace("{{json_o_que_falta}}", jsonOFaltaStr).replace(
          "{{mapa_conteudo_meupasso}}",
          mapaConteudo
        ),
        0.4,
        8192
      );
      if (!r8.success) return await abortChain(8, r8.error!);
      jsonPlano = r8.data;
      await saveStep("json_plano", jsonPlano);
      console.log("✅ Passo 8 — Plano de estudos concluído");
    }

    const jsonPlanoStr = JSON.stringify(jsonPlano, null, 2);

    // --- PASSO 9: Vagas compatíveis ---
    let jsonVagas: any = analise.json_vagas;
    if (!jsonVagas) {
      const r9 = await callAndParse(
        PROMPT_9.replace("{{objetivo_vaga}}", objetivoVaga)
          .replace("{{json_cruzamento}}", jsonCruzamentoStr)
          .replace("{{json_o_que_falta}}", jsonOFaltaStr),
        0.4,
        4096
      );
      if (!r9.success) return await abortChain(9, r9.error!);
      jsonVagas = r9.data;
      await saveStep("json_vagas", jsonVagas);
      console.log("✅ Passo 9 — Vagas compatíveis concluído");
    }

    const jsonVagasStr = JSON.stringify(jsonVagas, null, 2);
    const jsonCurriculoReescritoStr = JSON.stringify(jsonCurriculoReescrito, null, 2);
    const jsonLinkedinReescritoStr = JSON.stringify(jsonLinkedinReescrito, null, 2);

    // --- PASSO 10: Relatório final ---
    let jsonRelatorio: any = analise.json_relatorio_final;
    if (!jsonRelatorio) {
      const r10 = await callAndParse(
        PROMPT_10.replace("{{scores_json}}", JSON.stringify(scores, null, 2))
          .replace("{{veredicto}}", veredicto)
          .replace("{{json_o_que_falta}}", jsonOFaltaStr)
          .replace("{{json_cruzamento}}", jsonCruzamentoStr)
          .replace("{{json_recrutador}}", jsonRecrutadorStr)
          .replace("{{json_plano}}", jsonPlanoStr)
          .replace("{{json_vagas}}", jsonVagasStr)
          .replace("{{json_curriculo_reescrito}}", jsonCurriculoReescritoStr)
          .replace("{{json_linkedin_reescrito}}", jsonLinkedinReescritoStr),
        0.5,
        8192
      );
      if (!r10.success) return await abortChain(10, r10.error!);
      jsonRelatorio = r10.data;
      await saveStep("json_relatorio_final", jsonRelatorio);
      console.log("✅ Passo 10 — Relatório final concluído");
    }

    /* --- finalizar --- */
    await setStatus("concluido");
    console.log("🎉 Raio-X de Carreira concluído:", analiseId);

    return NextResponse.json({
      id: analiseId,
      status: "concluido",
      json_relatorio_final: jsonRelatorio,
    });
  } catch (error) {
    console.error("Erro geral no processamento:", error);
    if (analiseId) {
      try {
        const db = createClient();
        await db
          .from("analises_empregabilidade")
          .update({ status: "erro" })
          .eq("id", analiseId);
      } catch {}
    }
    return NextResponse.json(
      { error: "Erro interno ao processar a análise" },
      { status: 500 }
    );
  }
}
