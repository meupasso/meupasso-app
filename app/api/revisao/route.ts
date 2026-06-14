import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  try {
    const { codigo, linguagem, contexto } = await req.json();

    if (!codigo || codigo.trim().length === 0) {
      return NextResponse.json({ erro: "Código não pode estar vazio." }, { status: 400 });
    }

    const linhas = codigo.split("\n").length;
    if (linhas > 200) {
      return NextResponse.json({ erro: `Código muito longo: ${linhas} linhas. Máximo: 200.` }, { status: 400 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ erro: "Usuário não autenticado." }, { status: 401 });
    }

    const userId = authHeader.slice(7);
    const { data: perfil } = await supabase
      .from("perfis")
      .select("plano")
      .eq("id", userId)
      .single();

    if (!perfil || perfil.plano?.toLowerCase() !== "pro") {
      return NextResponse.json({ erro: "Recurso exclusivo para assinantes Pro." }, { status: 403 });
    }

    // Verificar limite mensal (10 revisões/mês)
    const inicioMes = new Date();
    inicioMes.setDate(1);
    inicioMes.setHours(0, 0, 0, 0);

    const { count } = await supabase
      .from("conversas")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .is("exercicio_id", null)
      .gte("created_at", inicioMes.toISOString());

    const limite = 10;
    const usadas = count ?? 0;
    const restantes = Math.max(0, limite - usadas);

    if (usadas >= limite) {
      return NextResponse.json({
        erro: `Você usou todas as ${limite} revisões deste mês. O limite renova no dia 1 de cada mês.`,
        usadas,
        limite,
        restantes: 0,
      }, { status: 403 });
    }

    const linguagensSuportadas = ["python", "java", "javascript"];
    const lang = linguagensSuportadas.includes(linguagem?.toLowerCase()) ? linguagem : "javascript";

    const systemPrompt = `Você é um desenvolvedor sênior especializado em code review.
Analise o código abaixo e forneça feedback completo e construtivo.
Seja direto e específico. Aponte problemas reais e sugira melhorias concretas.

Linguagem: ${lang}
${contexto ? `Contexto: ${contexto}` : ""}

Formato obrigatório da resposta:
## 📋 Visão Geral
(breve resumo do que o código faz e impressão geral)

## ✅ Pontos Positivos
(destaques do que está bom no código)

## 🔧 Pontos de Melhoria
(para cada item: o problema, o porquê, como melhorar)

## 💡 Sugestões
(melhorias de performance, segurança ou boas práticas)

## 📝 Exemplo de Refatoração
(código melhorado, APENAS se houver problemas significativos)

Regras:
1. Seja construtivo — critique o código, não a pessoa
2. Priorize os problemas mais importantes primeiro
3. Se o código estiver excelente, reconheça isso
4. Use blocos de código para ilustrar sugestões
5. Máximo de 1500 palavras`;

    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `\`\`\`${lang}\n${codigo}\n\`\`\`` },
        ],
        stream: false,
        max_tokens: 4096,
        temperature: 0.5,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Erro DeepSeek:", err);
      return NextResponse.json({ erro: "Erro ao processar a revisão." }, { status: 500 });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content ?? "Erro ao obter resposta.";

    // Registrar a revisão na tabela conversas (exercicio_id = null marca como revisão)
    await supabase.from("conversas").insert({
      user_id: userId,
      exercicio_id: null,
    });

    return NextResponse.json({ content, usadas: usadas + 1, limite, restantes: restantes - 1 });
  } catch (error) {
    console.error("Erro na revisão:", error);
    return NextResponse.json({ erro: "Erro interno do servidor." }, { status: 500 });
  }
}
