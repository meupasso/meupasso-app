import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";

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
    id_referencia: "JSR001",
    titulo: "Contagem crescente",
    nivel: "basico",
    modulo: "Repetição",
    linguagem: "JavaScript",
    descricao: "Exiba os números de 1 a 10 usando for.",
    objetivo: "Usar for clássico do JavaScript",
    permitidos: ["console.log", "for", "let"],
    proibidos: ["while", "funções", "arrays", "forEach"],
    erros_comuns: ["começar em 0", "condição <= vs <", "esquecer incremento"],
    exemplos: "Saída: 1 2 3 4 5 6 7 8 9 10",
  },
  {
    id_referencia: "JSR002",
    titulo: "Contagem regressiva",
    nivel: "basico",
    modulo: "Repetição",
    linguagem: "JavaScript",
    descricao: "Exiba contagem regressiva de 10 até 1 usando for.",
    objetivo: "Usar for com decremento",
    permitidos: ["console.log", "for", "let", "--"],
    proibidos: ["while", "funções", "arrays"],
    erros_comuns: ["condição errada", "incrementar em vez de decrementar"],
    exemplos: "Saída: 10 9 8 7 6 5 4 3 2 1",
  },
  {
    id_referencia: "JSR003",
    titulo: "Tabuada",
    nivel: "basico",
    modulo: "Repetição",
    linguagem: "JavaScript",
    descricao: "Declare um número e exiba sua tabuada de 1 a 10 usando for.",
    objetivo: "Usar for com template literal",
    permitidos: ["const", "console.log", "for", "let", "*", "template literal"],
    proibidos: ["while", "funções", "arrays"],
    erros_comuns: ["começar em 0", "não usar variável do loop"],
    exemplos: "const n = 5;\n5 x 1 = 5\n5 x 2 = 10\n...\n5 x 10 = 50",
  },
  {
    id_referencia: "JSR004",
    titulo: "Soma de 1 a N",
    nivel: "basico",
    modulo: "Repetição",
    linguagem: "JavaScript",
    descricao: "Declare N e calcule a soma de 1 até N usando for.",
    objetivo: "Usar for com acumulador",
    permitidos: ["const", "console.log", "for", "let", "+"],
    proibidos: ["while", "funções", "arrays", "fórmula direta"],
    erros_comuns: ["acumulador não inicializado em 0", "loop não chegando em N"],
    exemplos: "const n = 5;\nSoma: 15",
  },
  {
    id_referencia: "JSR005",
    titulo: "Números pares com while",
    nivel: "basico",
    modulo: "Repetição",
    linguagem: "JavaScript",
    descricao: "Exiba números pares de 2 a 20 usando while.",
    objetivo: "Usar while com incremento",
    permitidos: ["console.log", "while", "let", "+=", "<="],
    proibidos: ["for", "funções", "arrays"],
    erros_comuns: ["loop infinito por esquecer incremento", "começar em 0"],
    exemplos: "Saída: 2 4 6 8 10 12 14 16 18 20",
  },
  {
    id_referencia: "JSR006",
    titulo: "Fatorial",
    nivel: "basico",
    modulo: "Repetição",
    linguagem: "JavaScript",
    descricao: "Declare N e calcule o fatorial usando for.",
    objetivo: "Usar for com acumulador multiplicativo",
    permitidos: ["const", "console.log", "for", "let", "*"],
    proibidos: ["while", "funções", "arrays", "recursão"],
    erros_comuns: ["inicializar com 0 em vez de 1", "range errado"],
    exemplos: "const n = 5;\n5! = 120",
  },
  {
    id_referencia: "JSR007",
    titulo: "Somar até zero",
    nivel: "basico",
    modulo: "Repetição",
    linguagem: "JavaScript",
    descricao: "Use um array de números pré-definido e some todos até encontrar o 0.",
    objetivo: "Usar for com break e acumulador",
    permitidos: ["const", "console.log", "for", "let", "+", "break", "===", "array"],
    proibidos: ["while", "funções", "forEach"],
    erros_comuns: ["incluir 0 na soma", "não usar break"],
    exemplos: "const nums = [5, 3, 2, 0, 8];\nSoma: 10",
  },
  {
    id_referencia: "JSR008",
    titulo: "Maior número",
    nivel: "basico",
    modulo: "Repetição",
    linguagem: "JavaScript",
    descricao: "Declare um array com 5 números e encontre o maior usando for sem Math.max().",
    objetivo: "Usar for com variável de controle",
    permitidos: ["const", "console.log", "for", "let", "if", ">", "array"],
    proibidos: ["while", "funções", "Math.max", "forEach"],
    erros_comuns: ["inicializar maior com 0", "não atualizar maior"],
    exemplos: "const nums = [3,7,1,9,4];\nMaior: 9",
  },
  {
    id_referencia: "JSR009",
    titulo: "Contar pares e ímpares",
    nivel: "basico",
    modulo: "Repetição",
    linguagem: "JavaScript",
    descricao: "Declare um array com 10 números e conte quantos são pares e ímpares usando for.",
    objetivo: "Usar for com contadores e if",
    permitidos: ["const", "console.log", "for", "let", "if", "else", "%", "===", "array"],
    proibidos: ["while", "funções", "forEach", "filter"],
    erros_comuns: ["esquecer de inicializar contadores", "módulo errado"],
    exemplos: "const nums = [1,2,3,4,5,6,7,8,9,10];\nPares: 5, Ímpares: 5",
  },
  {
    id_referencia: "JSR010",
    titulo: "Do...while menu",
    nivel: "basico",
    modulo: "Repetição",
    linguagem: "JavaScript",
    descricao: "Simule um menu com do...while que executa pelo menos uma vez. Use um array de opções pré-definidas.",
    objetivo: "Entender do...while vs while",
    permitidos: ["const", "console.log", "do", "while", "let", "if", "else if", "!==", "array"],
    proibidos: ["for", "funções", "readline"],
    erros_comuns: ["condição do while errada", "confundir com while normal"],
    exemplos: 'const opcoes = ["1","2","0"];\nMenu executa pelo menos uma vez',
  },

  // ========== INTERMEDIÁRIO (10) ==========
  {
    id_referencia: "JSR011",
    titulo: "Fibonacci",
    nivel: "intermediario",
    modulo: "Repetição",
    linguagem: "JavaScript",
    descricao: "Declare N e exiba os N primeiros termos da sequência de Fibonacci usando for.",
    objetivo: "Usar for com duas variáveis de controle",
    permitidos: ["const", "console.log", "for", "let"],
    proibidos: ["while", "funções", "arrays", "recursão"],
    erros_comuns: ["ordem de atualização errada", "não tratar N=1"],
    exemplos: "const n = 8;\n0 1 1 2 3 5 8 13",
  },
  {
    id_referencia: "JSR012",
    titulo: "Número primo",
    nivel: "intermediario",
    modulo: "Repetição",
    linguagem: "JavaScript",
    descricao: "Declare um número e diga se é primo usando for.",
    objetivo: "Usar for com break e flag booleano",
    permitidos: ["const", "console.log", "for", "let", "if", "break", "%", "==="],
    proibidos: ["while", "funções", "arrays"],
    erros_comuns: ["não tratar casos 0, 1, 2", "range errado"],
    exemplos: "const n = 7; → Primo\nconst n = 9; → Não primo",
  },
  {
    id_referencia: "JSR013",
    titulo: "Média e estatísticas",
    nivel: "intermediario",
    modulo: "Repetição",
    linguagem: "JavaScript",
    descricao: "Declare um array com 5 notas. Calcule média, maior e menor usando for sem métodos de array.",
    objetivo: "Usar for com múltiplos acumuladores",
    permitidos: ["const", "console.log", "for", "let", "if", "+", "/", ">", "<", "array"],
    proibidos: ["while", "funções", "Math.max", "Math.min", "reduce", "forEach"],
    erros_comuns: ["não inicializar maior/menor", "dividir antes de terminar loop"],
    exemplos: "notas: [8,6.5,9,7,5]\nMédia: 7.10, Maior: 9, Menor: 5",
  },
  {
    id_referencia: "JSR014",
    titulo: "Tabuada completa",
    nivel: "intermediario",
    modulo: "Repetição",
    linguagem: "JavaScript",
    descricao: "Exiba tabuada de 1 a 5 completa usando loops aninhados.",
    objetivo: "Usar for aninhado",
    permitidos: ["console.log", "for", "let", "*", "template literal"],
    proibidos: ["while", "funções", "arrays"],
    erros_comuns: ["confundir variáveis dos loops", "range errado no loop interno"],
    exemplos: "1 x 1 = 1\n...\n5 x 10 = 50",
  },
  {
    id_referencia: "JSR015",
    titulo: "Pirâmide de asteriscos",
    nivel: "intermediario",
    modulo: "Repetição",
    linguagem: "JavaScript",
    descricao: "Declare N e exiba pirâmide centralizada de asteriscos com N linhas usando loops aninhados.",
    objetivo: "Usar loops aninhados para formatação visual",
    permitidos: ["const", "console.log", "for", "let", "repeat", "template literal"],
    proibidos: ["while", "funções", "arrays"],
    erros_comuns: ["não centralizar", "número errado de asteriscos"],
    exemplos: "const n = 4;\n   *\n  ***\n *****\n*******",
  },
  {
    id_referencia: "JSR016",
    titulo: "Soma dos dígitos",
    nivel: "intermediario",
    modulo: "Repetição",
    linguagem: "JavaScript",
    descricao: "Declare um número inteiro e calcule a soma dos seus dígitos usando for...of e String().",
    objetivo: "Iterar sobre string com for...of",
    permitidos: ["const", "console.log", "for...of", "let", "String", "Number", "+"],
    proibidos: ["while", "funções", "arrays", "split"],
    erros_comuns: ["não converter dígito para Number", "não converter número para String"],
    exemplos: "const n = 1234;\nSoma dos dígitos: 10",
  },
  {
    id_referencia: "JSR017",
    titulo: "Progressão aritmética",
    nivel: "intermediario",
    modulo: "Repetição",
    linguagem: "JavaScript",
    descricao: "Declare primeiro termo, razão e número de termos de uma PA. Exiba todos os termos e a soma.",
    objetivo: "Usar for para gerar sequência matemática",
    permitidos: ["const", "console.log", "for", "let", "+", "template literal"],
    proibidos: ["while", "funções", "arrays"],
    erros_comuns: ["não acumular soma", "gerar termo errado"],
    exemplos: "a1=2, r=3, n=5\n2 5 8 11 14 — Soma: 40",
  },
  {
    id_referencia: "JSR018",
    titulo: "Jogo de adivinhação",
    nivel: "intermediario",
    modulo: "Repetição",
    linguagem: "JavaScript",
    descricao: "Simule um jogo de adivinhação. Use array de tentativas pré-definidas e while para verificar cada uma.",
    objetivo: "Usar while com break e contador",
    permitidos: ["const", "console.log", "while", "let", "if", "else if", "break", "Math.floor", "Math.random", "array"],
    proibidos: ["for", "funções"],
    erros_comuns: ["loop infinito", "não contar tentativas"],
    exemplos: "secreto=42, tentativas=[70,25,42]\nAlto!\nBaixo!\nAcertou em 3!",
  },
  {
    id_referencia: "JSR019",
    titulo: "Estatísticas de vendas",
    nivel: "intermediario",
    modulo: "Repetição",
    linguagem: "JavaScript",
    descricao: "Declare array de vendas mensais (12 meses). Calcule total, média, melhor e pior mês usando for.",
    objetivo: "Usar for com múltiplos acumuladores e índice",
    permitidos: ["const", "console.log", "for", "let", "if", "+", "/", ">", "<", "array", "toFixed"],
    proibidos: ["while", "funções", "Math.max", "Math.min", "reduce"],
    erros_comuns: ["não rastrear índice do melhor/pior mês"],
    exemplos: "vendas=[5000,6200,...]\nTotal: R$X, Média: R$Y\nMelhor: Mês 3, Pior: Mês 1",
  },
  {
    id_referencia: "JSR020",
    titulo: "Contador de vogais",
    nivel: "intermediario",
    modulo: "Repetição",
    linguagem: "JavaScript",
    descricao: "Declare uma string e conte as vogais usando for...of e includes().",
    objetivo: "Usar for...of com string e includes()",
    permitidos: ["const", "console.log", "for...of", "let", "includes", "toLowerCase", "+"],
    proibidos: ["while", "funções", "split", "filter", "regex"],
    erros_comuns: ["não usar toLowerCase()", "contar espaços como vogais"],
    exemplos: 'const texto = "JavaScript é incrível";\nVogais: 7',
  },

  // ========== AVANÇADO (5) ==========
  {
    id_referencia: "JSR021",
    titulo: "Primos até N",
    nivel: "avancado",
    modulo: "Repetição",
    linguagem: "JavaScript",
    descricao: "Declare N e liste todos os primos de 2 até N usando loops aninhados.",
    objetivo: "Usar loops aninhados com break e flag",
    permitidos: ["const", "console.log", "for", "let", "if", "break", "%", "==="],
    proibidos: ["while", "funções", "filter"],
    erros_comuns: ["incluir 1 como primo", "loop interno com range errado"],
    exemplos: "const n = 20;\n2 3 5 7 11 13 17 19",
  },
  {
    id_referencia: "JSR022",
    titulo: "Ordenação bubble sort",
    nivel: "avancado",
    modulo: "Repetição",
    linguagem: "JavaScript",
    descricao: "Declare array com 7 números. Ordene com bubble sort sem usar sort().",
    objetivo: "Implementar bubble sort com loops aninhados",
    permitidos: ["const", "console.log", "for", "let", "if", ">", "array"],
    proibidos: ["while", "funções", "sort()"],
    erros_comuns: ["troca incorreta", "range do loop interno errado"],
    exemplos: "[64,34,25,12,22,11,90]\nFinal: [11,12,22,25,34,64,90]",
  },
  {
    id_referencia: "JSR023",
    titulo: "Calculadora de parcelas",
    nivel: "avancado",
    modulo: "Repetição",
    linguagem: "JavaScript",
    descricao: "Declare valor financiado, taxa mensal e parcelas. Exiba mês a mês usando for.",
    objetivo: "Usar for para simular amortização",
    permitidos: ["const", "console.log", "for", "let", "*", "-", "+", "/", "toFixed", "template literal"],
    proibidos: ["while", "funções", "arrays"],
    erros_comuns: ["não atualizar saldo", "fórmula de juros errada"],
    exemplos: "R$1000, 2%/mês, 3x\nMês 1: parcela R$346.75, juros R$20.00, saldo R$673.25",
  },
  {
    id_referencia: "JSR024",
    titulo: "Matriz 3x3",
    nivel: "avancado",
    modulo: "Repetição",
    linguagem: "JavaScript",
    descricao: "Declare array de arrays representando matriz 3x3. Exiba formatada e calcule soma da diagonal principal.",
    objetivo: "Usar arrays aninhados com loops",
    permitidos: ["const", "console.log", "for", "let", "array aninhado", "+"],
    proibidos: ["while", "funções", "forEach", "map"],
    erros_comuns: ["índice i,j trocado", "diagonal calculada errada"],
    exemplos: "[[1,2,3],[4,5,6],[7,8,9]]\n1 2 3\n4 5 6\n7 8 9\nDiagonal: 15",
  },
  {
    id_referencia: "JSR025",
    titulo: "Palíndromo",
    nivel: "avancado",
    modulo: "Repetição",
    linguagem: "JavaScript",
    descricao: "Declare uma palavra e verifique se é palíndromo usando for sem reverse().",
    objetivo: "Usar for para comparar caracteres da string",
    permitidos: ["const", "console.log", "for", "let", "if", "!==", "toLowerCase", "length"],
    proibidos: ["while", "funções", "reverse()", "split"],
    erros_comuns: ["não usar toLowerCase()", "índice errado na comparação"],
    exemplos: '"arara" → É palíndromo!\n"python" → Não é palíndromo',
  },

  // ========== DESAFIO (5) ==========
  {
    id_referencia: "JSR026",
    titulo: "Relatório de temperatura",
    nivel: "desafio",
    modulo: "Repetição",
    linguagem: "JavaScript",
    descricao: "Declare array com temperaturas de 7 dias. Calcule média, dias acima da média, maior, menor e variação usando dois for.",
    objetivo: "Usar dois for: um para média, outro para análise",
    permitidos: ["const", "console.log", "for", "let", "if", "+", "/", ">", "<", "array", "toFixed"],
    proibidos: ["while", "funções", "Math.max", "Math.min", "filter"],
    erros_comuns: ["calcular média antes de ter todos os dados"],
    exemplos: "[25,28,22,30,27,24,29]\nMédia: 26.43, Acima: 4, Maior: 30, Menor: 22",
  },
  {
    id_referencia: "JSR027",
    titulo: "Simulador de eleição",
    nivel: "desafio",
    modulo: "Repetição",
    linguagem: "JavaScript",
    descricao: "Declare array de votos (1,2,3,0=nulo,9=branco). Contabilize usando for. Exiba resultado e vencedor.",
    objetivo: "Usar for com múltiplos contadores",
    permitidos: ["const", "console.log", "for", "let", "if", "else if", "===", "+", "array"],
    proibidos: ["while", "funções", "filter", "reduce"],
    erros_comuns: ["não separar nulos de brancos", "não determinar vencedor"],
    exemplos: "votos=[1,2,1,0,9,1,2]\nCandidato 1: 3, Candidato 2: 2, Nulos: 1, Brancos: 1\nVencedor: 1",
  },
  {
    id_referencia: "JSR028",
    titulo: "Caixa registradora",
    nivel: "desafio",
    modulo: "Repetição",
    linguagem: "JavaScript",
    descricao: "Declare array de objetos {produto, preco}. Use for...of para calcular total, itens e produto mais caro.",
    objetivo: "Usar for...of com array de objetos",
    permitidos: ["const", "console.log", "for...of", "let", "if", ">", "+", "array de objetos", "toFixed"],
    proibidos: ["while", "funções", "reduce", "Math.max"],
    erros_comuns: ["não rastrear produto mais caro", "acessar propriedade errada"],
    exemplos: '[{produto:"arroz",preco:8.50},...]\n3 itens, Total: R$49.50, Mais caro: carne',
  },
  {
    id_referencia: "JSR029",
    titulo: "Conversor de moedas múltiplo",
    nivel: "desafio",
    modulo: "Repetição",
    linguagem: "JavaScript",
    descricao: "Declare array de valores em reais e cotações. Use for para converter cada valor para USD, EUR e GBP.",
    objetivo: "Usar for aninhado com arrays",
    permitidos: ["const", "console.log", "for", "let", "/", "array", "toFixed", "template literal"],
    proibidos: ["while", "funções", "forEach", "map"],
    erros_comuns: ["divisão em vez de multiplicação", "formatação incorreta"],
    exemplos: "valores=[100,200,500]\nR$100 → US$19.23, €17.24, £15.38",
  },
  {
    id_referencia: "JSR030",
    titulo: "Jogo da senha",
    nivel: "desafio",
    modulo: "Repetição",
    linguagem: "JavaScript",
    descricao: "Gere senha de 4 dígitos aleatória. Declare array de tentativas. Use while para verificar cada tentativa.",
    objetivo: "Usar while com análise posicional de string",
    permitidos: ["const", "console.log", "while", "let", "for", "if", "Math.floor", "Math.random", "String", "includes", "array", "==="],
    proibidos: ["funções", "filter"],
    erros_comuns: ["não distinguir posição certa de dígito existente"],
    exemplos: 'senha="4821"\ntentativa="1234" → 1 certo, 2 no lugar errado\ntentativa="4821" → Acertou!',
  },
];

async function main() {
  const { error: delErr } = await supabase
    .from("exercicios")
    .delete()
    .eq("linguagem", "JavaScript")
    .eq("modulo", "Repetição");

  if (delErr) {
    console.error("Erro ao deletar:", delErr.message);
    process.exit(1);
  }
  console.log("✅ Exercícios antigos deletados");

  const { error: insErr } = await supabase.from("exercicios").insert(exercicios);
  if (insErr) {
    console.error("Erro ao inserir:", insErr.message);
    process.exit(1);
  }
  console.log(`✅ ${exercicios.length} exercícios inseridos!`);

  const { count } = await supabase
    .from("exercicios")
    .select("*", { count: "exact", head: true })
    .eq("linguagem", "JavaScript")
    .eq("modulo", "Repetição");

  console.log(`📊 Verificação: ${count} exercícios no banco`);
  for (const nivel of ["basico", "intermediario", "avancado", "desafio"]) {
    const { count: n } = await supabase
      .from("exercicios")
      .select("*", { count: "exact", head: true })
      .eq("linguagem", "JavaScript")
      .eq("modulo", "Repetição")
      .eq("nivel", nivel);
    console.log(`  ${nivel}: ${n}`);
  }
}

main().catch(console.error);
