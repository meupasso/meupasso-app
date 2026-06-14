import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 })
  }

  const { messages, exercicio, codigoContexto } = await req.json()

  // Verificar plano e limite mensal
  const { data: perfil } = await supabase
    .from("perfis")
    .select("plano")
    .eq("id", user.id)
    .single()

  const isPro = perfil?.plano?.toLowerCase() === "pro"

  if (!isPro) {
    const inicioMes = new Date()
    inicioMes.setDate(1)
    inicioMes.setHours(0, 0, 0, 0)

    const { count } = await supabase
      .from("conversas")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .gte("created_at", inicioMes.toISOString())

    if (count !== null && count >= 3) {
      return NextResponse.json({ error: "limite_mensal" }, { status: 403 })
    }
  }

  let codigoSection = "";
  if (codigoContexto && Array.isArray(codigoContexto) && codigoContexto.length > 0) {
    codigoSection = `\n\nO aluno compartilhou código do GitHub:\n${codigoContexto
      .map((f: { nome: string; conteudo: string }) => `${f.nome}:\n${f.conteudo}`)
      .join("\n\n")}\n\nUse esse código como referência para ajudar o aluno, mas siga as regras socráticas: nunca resolva por ele.`;
  }

  const systemPrompt = `Você é um tutor socrático de programação chamado MeuPasso.${codigoSection}
Seu papel é guiar o aluno, nunca resolver por ele.

Contexto do exercício:
- Título: ${exercicio?.titulo ?? 'não informado'}
- Linguagem: ${exercicio?.linguagem ?? 'não informada'}
- Módulo: ${exercicio?.modulo ?? 'não informado'}
- Nível: ${exercicio?.nivel ?? 'não informado'}
- Objetivo: ${exercicio?.objetivo ?? 'não informado'}
- Conteúdos permitidos: ${exercicio?.permitidos?.join(', ') ?? 'não informado'}
- Conteúdos proibidos: ${exercicio?.proibidos?.join(', ') ?? 'não informado'}
- Erros comuns: ${exercicio?.erros_comuns?.join(', ') ?? 'não informado'}

Regras obrigatórias:
1. NUNCA entregue a solução pronta
2. NUNCA use conteúdos da lista de proibidos
3. Faça perguntas que guiem o raciocínio do aluno
4. Responda sempre de forma curta e direta
5. Foque no próximo passo, não no problema inteiro
6. Use linguagem simples, sem jargão técnico excessivo
7. Se o aluno colar um erro, traduza e aponte a causa provável
8. Se o aluno colar código, responda com checklist curto sem reescrever o código
9. Nunca humilhe ou desencoraje o aluno
10. Quando o aluno apresentar a solução correta e completa:
    - Parabenize de forma curta e genuína
    - Encerre a conversa com uma frase de encorajamento
    - NÃO sugira continuar, testar mais casos ou fazer outro exercício
    - NÃO faça mais perguntas após validar a resposta correta
11. IMPORTANTE: Quando o aluno resolver o exercício corretamente, parabenize brevemente e inclua exatamente o token [CONCLUIDO] no final da sua mensagem. Exemplo: 'Perfeito! Você resolveu o exercício! 🎉 [CONCLUIDO]'
${exercicio?.linguagem === 'Java' ? `
INSTRUÇÃO ESPECÍFICA PARA JAVA:
Assuma que o código do aluno já está dentro de uma classe e método main adequados, exceto quando o módulo for 'POO' onde classes são o tema central. Não peça para o aluno "colocar dentro de uma classe" ou "criar o método main" — foque apenas na lógica do exercício. Se o aluno colar apenas o corpo do código sem a estrutura da classe, interprete como se estivesse dentro de um main().` : ''}`

  const response = await fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ],
      stream: false,
      max_tokens: 300
    })
  })

  const data = await response.json()
  const content = data.choices?.[0]?.message?.content ?? 'Erro ao obter resposta.'

  // Registrar a sessão na tabela conversas (exceto se for plano pro)
  if (!isPro && exercicio?.id) {
    await supabase.from("conversas").insert({
      user_id: user.id,
      exercicio_id: exercicio.id,
    })
  }

  return NextResponse.json({ content })
}
