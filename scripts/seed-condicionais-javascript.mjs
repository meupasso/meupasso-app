import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";

// Load .env.local manually
const envFile = readFileSync(".env.local", "utf-8");
const env = {};
for (const line of envFile.split("\n")) {
  const [k, ...v] = line.split("=");
  if (k && k.trim()) env[k.trim()] = v.join("=").trim();
}

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY
);

const exercicios = [
  // ========== BÁSICO (10) ==========
  {
    id_referencia: "JSC001",
    titulo: "Par ou ímpar",
    nivel: "basico",
    modulo: "Condicionais",
    linguagem: "JavaScript",
    descricao:
      "Declare um número e use if/else para dizer se é par ou ímpar.",
    objetivo: "Usar if/else com operador módulo",
    permitidos: ["const", "console.log", "if", "else", "%", "==="],
    proibidos: ["loops", "funções", "switch"],
    erros_comuns: ["usar = em vez de ===", "usar == em vez de ==="],
    exemplos: "const n = 4;\nSaída: 4 é par\n\nconst n = 7;\nSaída: 7 é ímpar",
  },
  {
    id_referencia: "JSC002",
    titulo: "Maior de idade",
    nivel: "basico",
    modulo: "Condicionais",
    linguagem: "JavaScript",
    descricao:
      "Declare uma idade e diga se a pessoa é maior ou menor de idade.",
    objetivo: "Usar if/else com >=",
    permitidos: ["const", "console.log", "if", "else", ">="],
    proibidos: ["loops", "funções", "switch", "else if"],
    erros_comuns: ["usar > em vez de >=", "usar == em vez de ==="],
    exemplos: "const idade = 18;\nSaída: Maior de idade",
  },
  {
    id_referencia: "JSC003",
    titulo: "Positivo negativo ou zero",
    nivel: "basico",
    modulo: "Condicionais",
    linguagem: "JavaScript",
    descricao:
      "Declare um número e diga se é positivo, negativo ou zero.",
    objetivo: "Usar if/else if/else",
    permitidos: [
      "const",
      "console.log",
      "if",
      "else if",
      "else",
      ">",
      "<",
      "===",
    ],
    proibidos: ["loops", "funções", "switch"],
    erros_comuns: [
      "esquecer o caso zero",
      "ordem errada das condições",
    ],
    exemplos:
      "const n = 5; → Positivo\nconst n = -3; → Negativo\nconst n = 0; → Zero",
  },
  {
    id_referencia: "JSC004",
    titulo: "Aprovado ou reprovado",
    nivel: "basico",
    modulo: "Condicionais",
    linguagem: "JavaScript",
    descricao:
      "Declare uma nota e diga se o aluno está aprovado (>= 7) ou reprovado.",
    objetivo: "Usar if/else com >= e número decimal",
    permitidos: ["const", "console.log", "if", "else", ">="],
    proibidos: ["loops", "funções", "switch", "else if"],
    erros_comuns: [
      "usar > em vez de >=",
      "comparar string com número",
    ],
    exemplos:
      "const nota = 7.0; → Aprovado\nconst nota = 6.9; → Reprovado",
  },
  {
    id_referencia: "JSC005",
    titulo: "Maior entre dois",
    nivel: "basico",
    modulo: "Condicionais",
    linguagem: "JavaScript",
    descricao:
      "Declare dois números e diga qual é o maior ou se são iguais.",
    objetivo: "Usar if/else if/else com comparadores",
    permitidos: [
      "const",
      "console.log",
      "if",
      "else if",
      "else",
      ">",
      "<",
      "===",
    ],
    proibidos: ["loops", "funções", "Math.max"],
    erros_comuns: [
      "usar = em vez de ===",
      "esquecer caso igualdade",
    ],
    exemplos:
      "const a=5, b=3; → 5 é maior\nconst a=4, b=4; → São iguais",
  },
  {
    id_referencia: "JSC006",
    titulo: "Desconto simples",
    nivel: "basico",
    modulo: "Condicionais",
    linguagem: "JavaScript",
    descricao:
      "Declare o valor de uma compra. Se for maior que R$100, aplique 10% de desconto.",
    objetivo: "Usar if simples sem else",
    permitidos: ["let", "const", "console.log", "if", "*", "-", "toFixed"],
    proibidos: ["loops", "funções", "else"],
    erros_comuns: [
      "usar else desnecessário",
      "desconto calculado errado",
    ],
    exemplos:
      "const valor = 150; → Desconto! Final: R$135.00\nconst valor = 80; → R$80.00",
  },
  {
    id_referencia: "JSC007",
    titulo: "Vogal ou consoante",
    nivel: "basico",
    modulo: "Condicionais",
    linguagem: "JavaScript",
    descricao:
      "Declare uma letra e diga se é vogal ou consoante usando includes().",
    objetivo: "Usar if/else com includes() e toLowerCase()",
    permitidos: [
      "const",
      "console.log",
      "if",
      "else",
      "includes",
      "toLowerCase",
    ],
    proibidos: ["loops", "funções", "switch"],
    erros_comuns: [
      "não usar toLowerCase()",
      "usar == em vez de includes()",
    ],
    exemplos:
      'const letra = "A"; → Vogal\nconst letra = "b"; → Consoante',
  },
  {
    id_referencia: "JSC008",
    titulo: "Calculadora com switch",
    nivel: "basico",
    modulo: "Condicionais",
    linguagem: "JavaScript",
    descricao:
      'Declare dois números e um operador (+,-,*,/). Use switch para realizar a operação.',
    objetivo: "Usar switch/case com break e default",
    permitidos: [
      "const",
      "console.log",
      "switch",
      "case",
      "break",
      "default",
      "+",
      "-",
      "*",
      "/",
    ],
    proibidos: ["loops", "funções", "if"],
    erros_comuns: [
      "esquecer break",
      "não tratar divisão por zero",
      "esquecer default",
    ],
    exemplos: 'const a=10, b=2, op="*"; → Resultado: 20',
  },
  {
    id_referencia: "JSC009",
    titulo: "Pode votar",
    nivel: "basico",
    modulo: "Condicionais",
    linguagem: "JavaScript",
    descricao:
      "Declare uma idade e diga se o voto é proibido (< 16), facultativo (16-17 ou >= 70) ou obrigatório (18-69).",
    objetivo: "Usar if/else if com && e ||",
    permitidos: [
      "const",
      "console.log",
      "if",
      "else if",
      "else",
      "&&",
      "||",
      ">=",
      "<=",
      "<",
    ],
    proibidos: ["loops", "funções", "switch"],
    erros_comuns: [
      "intervalos sobrepostos",
      "usar & em vez de &&",
    ],
    exemplos:
      "const idade = 17; → Facultativo\nconst idade = 14; → Proibido",
  },
  {
    id_referencia: "JSC010",
    titulo: "Triângulo válido",
    nivel: "basico",
    modulo: "Condicionais",
    linguagem: "JavaScript",
    descricao:
      "Declare três lados e diga se formam um triângulo válido.",
    objetivo: "Usar if/else com condição composta &&",
    permitidos: ["const", "console.log", "if", "else", "&&", "<", "+"],
    proibidos: ["loops", "funções", "switch"],
    erros_comuns: [
      "verificar só uma condição",
      "confundir && com ||",
    ],
    exemplos:
      "const a=3,b=4,c=5; → Válido\nconst a=1,b=2,c=10; → Inválido",
  },

  // ========== INTERMEDIÁRIO (10) ==========
  {
    id_referencia: "JSC011",
    titulo: "Situação do aluno",
    nivel: "intermediario",
    modulo: "Condicionais",
    linguagem: "JavaScript",
    descricao:
      "Declare três notas, calcule a média e diga: Aprovado (>= 7), Recuperação (>= 4) ou Reprovado.",
    objetivo: "Calcular média e usar if/else if",
    permitidos: [
      "const",
      "console.log",
      "if",
      "else if",
      "else",
      "+",
      "/",
      ">=",
      "<",
      "toFixed",
    ],
    proibidos: ["loops", "funções", "switch"],
    erros_comuns: [
      "erro de precedência na média",
      "condições fora de ordem",
    ],
    exemplos:
      "notas: 8, 6, 7 → Média: 7.00 — Aprovado",
  },
  {
    id_referencia: "JSC012",
    titulo: "Classificação do IMC",
    nivel: "intermediario",
    modulo: "Condicionais",
    linguagem: "JavaScript",
    descricao:
      "Declare peso e altura, calcule IMC e classifique: Abaixo do peso, Normal, Sobrepeso, Obesidade.",
    objetivo: "Usar if/else if com múltiplas faixas",
    permitidos: [
      "const",
      "console.log",
      "if",
      "else if",
      "else",
      "/",
      "**",
      ">=",
      "<",
      "toFixed",
    ],
    proibidos: ["loops", "funções", "switch"],
    erros_comuns: [
      "não elevar altura ao quadrado",
      "faixas fora de ordem",
    ],
    exemplos:
      "peso=70, altura=1.75 → IMC: 22.86 — Normal",
  },
  {
    id_referencia: "JSC013",
    titulo: "Desconto progressivo",
    nivel: "intermediario",
    modulo: "Condicionais",
    linguagem: "JavaScript",
    descricao:
      "Declare valor de compra. Até R$100 sem desconto, R$100-R$500 desconto 10%, acima R$500 desconto 20%.",
    objetivo: "Usar if/else if para regras de negócio",
    permitidos: [
      "const",
      "let",
      "console.log",
      "if",
      "else if",
      "else",
      ">=",
      "<",
      "*",
      "-",
      "toFixed",
    ],
    proibidos: ["loops", "funções", "switch"],
    erros_comuns: [
      "intervalos sobrepostos",
      "desconto errado por faixa",
    ],
    exemplos:
      "valor=300 → Desconto 10%, Final: R$270.00",
  },
  {
    id_referencia: "JSC014",
    titulo: "Ano bissexto",
    nivel: "intermediario",
    modulo: "Condicionais",
    linguagem: "JavaScript",
    descricao:
      "Declare um ano e diga se é bissexto. Divisível por 4, exceto por 100, a menos que por 400.",
    objetivo: "Usar condição composta com && e ||",
    permitidos: [
      "const",
      "console.log",
      "if",
      "else",
      "&&",
      "||",
      "%",
      "===",
    ],
    proibidos: ["loops", "funções", "switch"],
    erros_comuns: [
      "não tratar exceção 100/400",
      "ordem errada",
    ],
    exemplos:
      "ano=2000 → Bissexto\nano=1900 → Não bissexto",
  },
  {
    id_referencia: "JSC015",
    titulo: "Saudação por horário",
    nivel: "intermediario",
    modulo: "Condicionais",
    linguagem: "JavaScript",
    descricao:
      "Declare hora (0-23) e exiba: Bom dia (0-11), Boa tarde (12-17), Boa noite (18-23). Se inválida, erro.",
    objetivo: "Usar if/else if com intervalos e validação",
    permitidos: [
      "const",
      "console.log",
      "if",
      "else if",
      "else",
      ">=",
      "<=",
      "&&",
    ],
    proibidos: ["loops", "funções", "switch"],
    erros_comuns: [
      "não validar hora inválida",
      "intervalos sobrepostos",
    ],
    exemplos:
      "hora=14 → Boa tarde\nhora=25 → Hora inválida",
  },
  {
    id_referencia: "JSC016",
    titulo: "Aumento salarial",
    nivel: "intermediario",
    modulo: "Condicionais",
    linguagem: "JavaScript",
    descricao:
      "Declare salário e aplique: até R$1500 → 15%, R$1500-R$2500 → 10%, acima → 5%.",
    objetivo: "Usar if/else if para regras de negócio",
    permitidos: [
      "const",
      "let",
      "console.log",
      "if",
      "else if",
      "else",
      "<=",
      ">",
      "*",
      "+",
      "toFixed",
    ],
    proibidos: ["loops", "funções", "switch"],
    erros_comuns: [
      "intervalos sobrepostos",
      "percentual errado",
    ],
    exemplos:
      "salario=1200 → Aumento 15%, Novo: R$1380.00",
  },
  {
    id_referencia: "JSC017",
    titulo: "Tipo de triângulo",
    nivel: "intermediario",
    modulo: "Condicionais",
    linguagem: "JavaScript",
    descricao:
      "Declare três lados, valide e classifique: Equilátero, Isósceles ou Escaleno.",
    objetivo: "Usar condicionais aninhadas com &&",
    permitidos: [
      "const",
      "console.log",
      "if",
      "else if",
      "else",
      "&&",
      "||",
      "===",
      "!==",
      "<",
      "+",
    ],
    proibidos: ["loops", "funções", "switch"],
    erros_comuns: [
      "não validar triângulo antes",
      "confundir isósceles com equilátero",
    ],
    exemplos:
      "a=3,b=3,c=3 → Equilátero\na=3,b=3,c=4 → Isósceles",
  },
  {
    id_referencia: "JSC018",
    titulo: "Sistema de login",
    nivel: "intermediario",
    modulo: "Condicionais",
    linguagem: "JavaScript",
    descricao:
      "Declare usuário e senha fixos. Compare com valores informados e diga se login foi bem-sucedido.",
    objetivo: "Usar if com === e &&",
    permitidos: ["const", "console.log", "if", "else", "===", "&&"],
    proibidos: ["loops", "funções", "switch"],
    erros_comuns: [
      "usar == em vez de ===",
      "usar & em vez de &&",
    ],
    exemplos:
      'usuario="admin", senha="1234" → Login bem-sucedido!\nusuario="admin", senha="0000" → Incorreto.',
  },
  {
    id_referencia: "JSC019",
    titulo: "Calculadora de frete",
    nivel: "intermediario",
    modulo: "Condicionais",
    linguagem: "JavaScript",
    descricao:
      "Declare peso e estado (SP/RJ/outros). SP: R$5/kg, RJ: R$8/kg, outros: R$12/kg. Frete grátis acima de R$100.",
    objetivo: "Combinar if/else if com === e regras de negócio",
    permitidos: [
      "const",
      "let",
      "console.log",
      "if",
      "else if",
      "else",
      "===",
      "*",
      ">=",
      "toUpperCase",
      "toFixed",
    ],
    proibidos: ["loops", "funções", "switch"],
    erros_comuns: [
      "usar == em vez de ===",
      "não tratar frete grátis",
    ],
    exemplos:
      'peso=5, estado="SP" → R$25.00\npeso=15, estado="RJ" → Frete grátis!',
  },
  {
    id_referencia: "JSC020",
    titulo: "Operador ternário",
    nivel: "intermediario",
    modulo: "Condicionais",
    linguagem: "JavaScript",
    descricao:
      'Reescreva 3 condicionais simples usando operador ternário: par/ímpar, maior de idade, aprovado/reprovado.',
    objetivo: "Usar operador ternário ? :",
    permitidos: ["const", "console.log", "?", ":", "%", "===", ">="],
    proibidos: ["if", "else", "loops", "funções", "switch"],
    erros_comuns: [
      "esquecer o : na parte else",
      "aninhar ternários sem parênteses",
    ],
    exemplos:
      'const resultado = n % 2 === 0 ? "par" : "ímpar";\nconst voto = idade >= 18 ? "pode votar" : "não pode";',
  },

  // ========== AVANÇADO (5) ==========
  {
    id_referencia: "JSC021",
    titulo: "Empréstimo bancário",
    nivel: "avancado",
    modulo: "Condicionais",
    linguagem: "JavaScript",
    descricao:
      "Declare salário, valor do empréstimo e prazo. A parcela não pode exceder 30% do salário. Calcule e diga se aprovado.",
    objetivo:
      "Combinar cálculo com validação condicional",
    permitidos: ["const", "console.log", "if", "else", "*", "/", "toFixed"],
    proibidos: ["loops", "funções", "switch"],
    erros_comuns: [
      "30% do empréstimo em vez do salário",
      "divisão por zero",
    ],
    exemplos:
      "salario=3000, emprestimo=5000, prazo=12 → Parcela: R$416.67 — Aprovado!",
  },
  {
    id_referencia: "JSC022",
    titulo: "Validador de senha",
    nivel: "avancado",
    modulo: "Condicionais",
    linguagem: "JavaScript",
    descricao:
      "Declare uma senha e valide: mínimo 8 chars, pelo menos um número, pelo menos uma maiúscula. Exiba mensagem para cada falha.",
    objetivo:
      "Usar múltiplos ifs independentes com métodos de string",
    permitidos: [
      "const",
      "console.log",
      "if",
      "length",
      "/[0-9]/.test",
      "/[A-Z]/.test",
    ],
    proibidos: ["loops", "funções", "switch"],
    erros_comuns: [
      "usar if/else if quando devem ser ifs independentes",
      "regex incorreta",
    ],
    exemplos:
      'senha="abc123" → Fraca: mínimo 8 chars, sem maiúscula',
  },
  {
    id_referencia: "JSC023",
    titulo: "Tabela do IR",
    nivel: "avancado",
    modulo: "Condicionais",
    linguagem: "JavaScript",
    descricao:
      "Calcule IR conforme tabela progressiva: até R$1903.98 isento, até R$2826.65 7.5%, até R$3751.05 15%, até R$4664.68 22.5%, acima 27.5%.",
    objetivo: "Implementar tabela progressiva com if/else if",
    permitidos: [
      "const",
      "let",
      "console.log",
      "if",
      "else if",
      "else",
      "<=",
      ">",
      "*",
      "-",
      "toFixed",
    ],
    proibidos: ["loops", "funções", "switch"],
    erros_comuns: [
      "aplicar alíquota sobre salário inteiro",
      "faixas erradas",
    ],
    exemplos: "salario=3000 → IR: R$116.40",
  },
  {
    id_referencia: "JSC024",
    titulo: "Classificador de produto",
    nivel: "avancado",
    modulo: "Condicionais",
    linguagem: "JavaScript",
    descricao:
      "Declare nome, preço e estoque. Classifique: Crítico (< 5), Alerta (5-20), Normal (> 20). Se preço > R$1000 e estoque < 10, marque como Prioritário.",
    objetivo: "Combinar múltiplas condições com && e ||",
    permitidos: [
      "const",
      "console.log",
      "if",
      "else if",
      "else",
      "&&",
      "||",
      ">",
      "<",
    ],
    proibidos: ["loops", "funções", "switch"],
    erros_comuns: [
      "não verificar Prioritário antes",
      "confundir && com ||",
    ],
    exemplos:
      'nome="Notebook", preco=2500, estoque=8 → Prioritário',
  },
  {
    id_referencia: "JSC025",
    titulo: "Pedra papel tesoura",
    nivel: "avancado",
    modulo: "Condicionais",
    linguagem: "JavaScript",
    descricao:
      "Declare jogada do usuário e gere uma aleatória para o computador usando Math.random(). Determine o vencedor.",
    objetivo: "Usar Math.random() com if/else e ===",
    permitidos: [
      "const",
      "console.log",
      "if",
      "else if",
      "else",
      "&&",
      "||",
      "===",
      "Math.random",
      "Math.floor",
    ],
    proibidos: ["loops", "funções", "switch"],
    erros_comuns: [
      "não cobrir todos os casos",
      "Math.random() gerando índice errado",
    ],
    exemplos:
      'jogada="pedra", computador="tesoura" → Você venceu!',
  },

  // ========== DESAFIO (5) ==========
  {
    id_referencia: "JSC026",
    titulo: "Simulador de caixa eletrônico",
    nivel: "desafio",
    modulo: "Condicionais",
    linguagem: "JavaScript",
    descricao:
      "Declare saldo e valor do saque. Valide: saldo suficiente, múltiplo de 50, máximo R$1000. Mensagem específica para cada erro.",
    objetivo:
      "Múltiplas validações condicionais em sequência",
    permitidos: [
      "const",
      "let",
      "console.log",
      "if",
      "else if",
      "else",
      "&&",
      "%",
      "<=",
      ">=",
      "-",
      "toFixed",
    ],
    proibidos: ["loops", "funções", "switch"],
    erros_comuns: [
      "não validar todas condições",
      "ordem errada das validações",
    ],
    exemplos:
      "saldo=500, saque=200 → Saque realizado! Saldo: R$300.00",
  },
  {
    id_referencia: "JSC027",
    titulo: "Sistema de pontuação",
    nivel: "desafio",
    modulo: "Condicionais",
    linguagem: "JavaScript",
    descricao:
      "Declare 5 respostas (s=acerto/n=erro/p=pulou). Acerto +10, erro -5, pulou 0. Classifique: Ouro(>=40), Prata(>=20), Bronze(>=0), Eliminado(<0).",
    objetivo:
      "Acumular pontos com if/else sem loops",
    permitidos: [
      "const",
      "let",
      "console.log",
      "if",
      "else if",
      "else",
      "===",
      "+",
      "-",
      ">=",
      "<",
    ],
    proibidos: ["loops", "funções", "switch", "for", "while"],
    erros_comuns: [
      "usar loop em vez de condicionais",
      "classificação fora de ordem",
    ],
    exemplos:
      "respostas: s,s,n,p,s → Pontuação: 25 — Prata",
  },
  {
    id_referencia: "JSC028",
    titulo: "Aprovação de crédito",
    nivel: "desafio",
    modulo: "Condicionais",
    linguagem: "JavaScript",
    descricao:
      "Declare renda, score (0-1000) e valor solicitado. Aprovado se: score >= 700 e parcela <= 30% renda, OU score >= 500 e parcela <= 20% renda e valor <= R$10000.",
    objetivo:
      "Implementar regras de negócio complexas com && e ||",
    permitidos: [
      "const",
      "console.log",
      "if",
      "else",
      "&&",
      "||",
      ">=",
      "<=",
      "/",
      "*",
      "toFixed",
    ],
    proibidos: ["loops", "funções", "switch"],
    erros_comuns: [
      "precedência errada de && e ||",
      "parcela calculada errada",
    ],
    exemplos:
      "renda=5000, score=650, valor=8000, prazo=24 → Parcela: R$333.33 — Aprovado (regra 2)",
  },
  {
    id_referencia: "JSC029",
    titulo: "Aluguel de temporada",
    nivel: "desafio",
    modulo: "Condicionais",
    linguagem: "JavaScript",
    descricao:
      "Declare tipo (casa/apto), quartos e temporada (alta/baixa). Casa alta: R$300+R$50/quarto, baixa: R$200+R$30/quarto. Apto alta: R$200+R$40/quarto, baixa: R$150+R$25/quarto. Desconto 15% para mais de 7 dias.",
    objetivo:
      "Múltiplas condições combinadas com &&",
    permitidos: [
      "const",
      "let",
      "console.log",
      "if",
      "else if",
      "else",
      "&&",
      "===",
      "toLowerCase",
      "*",
      "+",
      "toFixed",
    ],
    proibidos: ["loops", "funções", "switch"],
    erros_comuns: [
      "não combinar tipo+temporada",
      "esquecer desconto longa estadia",
    ],
    exemplos:
      'tipo="casa", quartos=3, temporada="alta", dias=10 → Diária: R$450.00, Desconto 15%, Total: R$3825.00',
  },
  {
    id_referencia: "JSC030",
    titulo: "Diagnóstico de saúde",
    nivel: "desafio",
    modulo: "Condicionais",
    linguagem: "JavaScript",
    descricao:
      "Declare pressão sistólica e diastólica. Classifique: Normal (<120 e <80), Elevada (120-129 e <80), Hipertensão 1 (130-139 ou 80-89), Hipertensão 2 (>=140 ou >=90), Crise (>180 ou >120).",
    objetivo:
      "Diagnóstico com condições compostas",
    permitidos: [
      "const",
      "console.log",
      "if",
      "else if",
      "else",
      "&&",
      "||",
      ">",
      "<",
      ">=",
      "<=",
    ],
    proibidos: ["loops", "funções", "switch"],
    erros_comuns: [
      "verificar crise por último",
      "confundir && com ||",
    ],
    exemplos:
      "sistolica=135, diastolica=85 → Hipertensão Estágio 1\nsistolica=185, diastolica=100 → Crise!",
  },
];

async function main() {
  // 1. Remove existing exercícios for JavaScript Condicionais
  const { error: delErr } = await supabase
    .from("exercicios")
    .delete()
    .eq("linguagem", "JavaScript")
    .eq("modulo", "Condicionais");

  if (delErr) {
    console.error("Erro ao deletar exercícios existentes:", delErr.message);
    process.exit(1);
  }
  console.log("✅ Exercícios antigos deletados");

  // 2. Insert new exercícios
  const { error: insErr } = await supabase
    .from("exercicios")
    .insert(exercicios);

  if (insErr) {
    console.error("Erro ao inserir:", insErr.message);
    process.exit(1);
  }
  console.log(`✅ ${exercicios.length} exercícios inseridos com sucesso!`);

  // 3. Verify total count
  const { count, error: countErr } = await supabase
    .from("exercicios")
    .select("*", { count: "exact", head: true })
    .eq("linguagem", "JavaScript")
    .eq("modulo", "Condicionais");

  if (countErr) {
    console.error("Erro ao verificar:", countErr.message);
    process.exit(1);
  }

  console.log(`📊 Verificação: ${count} exercícios no banco`);
  console.log("Distribuição:");

  for (const nivel of ["basico", "intermediario", "avancado", "desafio"]) {
    const { count: n } = await supabase
      .from("exercicios")
      .select("*", { count: "exact", head: true })
      .eq("linguagem", "JavaScript")
      .eq("modulo", "Condicionais")
      .eq("nivel", nivel);
    console.log(`  ${nivel}: ${n}`);
  }
}

main().catch(console.error);
