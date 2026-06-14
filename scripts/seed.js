const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

// Read .env.local
const envPath = path.join(__dirname, "..", ".env.local");
const envRaw = fs.readFileSync(envPath, "utf-8");
const env = {};
envRaw.split("\n").forEach((line) => {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) return;
  const idx = trimmed.indexOf("=");
  if (idx === -1) return;
  const key = trimmed.slice(0, idx).trim();
  const val = trimmed.slice(idx + 1).trim();
  env[key] = val;
});

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY
);

const exercicios = [
  // === Módulo: Variáveis — Básico
  {
    titulo: "Saudação personalizada",
    linguagem: "Python",
    modulo: "Variáveis",
    nivel: "basico",
    descricao: "Peça o nome do usuário e exiba uma saudação personalizada.",
    objetivo: "Usar input() e print() com f-string",
    permitidos: ["input", "print", "variável", "f-string"],
    proibidos: ["funções", "listas", "loops"],
    erros_comuns: ["esquecer de converter tipo", "erro de aspas na f-string"],
    exemplos: "Entrada: João\nSaída: Olá, João! Bem-vindo ao nosso programa!",
  },
  {
    titulo: "Soma de dois produtos",
    linguagem: "Python",
    modulo: "Variáveis",
    nivel: "basico",
    descricao:
      "Peça o preço de dois produtos e calcule o valor total da compra.",
    objetivo: "Usar input(), float() e operador de soma",
    permitidos: ["input", "print", "float", "variável", "+"],
    proibidos: ["funções", "listas", "loops"],
    erros_comuns: [
      "esquecer de converter string para float",
      "usar vírgula em vez de ponto no número",
    ],
    exemplos:
      "Entrada: 10.00 e 25.50\nSaída: O valor total da compra foi de R$ 35.50",
  },
  {
    titulo: "Velocidade média",
    linguagem: "Python",
    modulo: "Variáveis",
    nivel: "basico",
    descricao:
      "Peça a distância percorrida (em km) e o tempo gasto (em horas) e calcule a velocidade média em m/s.",
    objetivo: "Converter unidades e calcular velocidade média",
    permitidos: ["input", "print", "float", "variável", "operadores aritméticos"],
    proibidos: ["funções", "listas", "loops"],
    erros_comuns: [
      "esquecer de converter km para metros",
      "esquecer de converter horas para segundos",
      "usar variável com nome errado",
    ],
    exemplos:
      "Entrada: 10km, 2h\nSaída: A velocidade média foi de 1.39 m/s",
  },
  {
    titulo: "Salário bruto",
    linguagem: "Python",
    modulo: "Variáveis",
    nivel: "basico",
    descricao:
      "Peça o número de horas trabalhadas e o valor da hora para calcular o salário bruto.",
    objetivo: "Usar int(), float() e multiplicação",
    permitidos: ["input", "print", "int", "float", "variável", "*"],
    proibidos: ["funções", "listas", "loops"],
    erros_comuns: [
      "misturar int e float",
      "esquecer de converter o input",
    ],
    exemplos:
      "Entrada: 160 horas, R$15.00/hora\nSaída: O salário bruto é de R$ 2400.00",
  },
  {
    titulo: "Conta de água",
    linguagem: "Python",
    modulo: "Variáveis",
    nivel: "basico",
    descricao:
      "Peça o consumo mensal de água em litros e calcule o valor da conta, considerando R$0,02 por litro.",
    objetivo: "Multiplicar valor de entrada por constante",
    permitidos: ["input", "print", "float", "variável", "*"],
    proibidos: ["funções", "listas", "loops"],
    erros_comuns: [
      "usar vírgula em vez de ponto no valor da constante",
      "esquecer de converter o input",
    ],
    exemplos: "Entrada: 500 litros\nSaída: O valor da conta é R$ 10.00",
  },

  // === Módulo: Condicionais — Básico
  {
    titulo: "Par ou ímpar",
    linguagem: "Python",
    modulo: "Condicionais",
    nivel: "basico",
    descricao: "Peça um número inteiro e diga se ele é par ou ímpar.",
    objetivo: "Usar if/else e operador módulo",
    permitidos: ["input", "print", "int", "if", "else", "operador %"],
    proibidos: ["funções", "listas", "loops"],
    erros_comuns: [
      "usar = em vez de ==",
      "esquecer int() no input",
      "lógica invertida do módulo",
    ],
    exemplos:
      "Entrada: 4\nSaída: 4 é par\n\nEntrada: 7\nSaída: 7 é ímpar",
  },
  {
    titulo: "Maior entre dois números",
    linguagem: "Python",
    modulo: "Condicionais",
    nivel: "basico",
    descricao:
      "Peça dois números inteiros e diga qual é o maior, o menor ou se são iguais.",
    objetivo: "Usar if/elif/else com comparadores",
    permitidos: ["input", "print", "int", "if", "elif", "else", ">", "<", "=="],
    proibidos: ["funções", "listas", "loops", "max()", "min()"],
    erros_comuns: [
      "usar = em vez de ==",
      "esquecer o elif",
      "lógica de comparação invertida",
    ],
    exemplos:
      "Entrada: 5 e 3\nSaída: 5 é maior que 3\n\nEntrada: 4 e 4\nSaída: Os dois números são iguais",
  },
  {
    titulo: "Situação do aluno",
    linguagem: "Python",
    modulo: "Condicionais",
    nivel: "basico",
    descricao:
      "Receba três notas, calcule a média e diga se o aluno está aprovado (média ≥ 7), reprovado (média < 4) ou em prova final.",
    objetivo: "Calcular média e usar if/elif/else",
    permitidos: [
      "input",
      "print",
      "float",
      "if",
      "elif",
      "else",
      "operadores aritméticos",
      "comparadores",
    ],
    proibidos: ["funções", "listas", "loops"],
    erros_comuns: [
      "erro de precedência na média",
      "condições fora de ordem",
      "usar < em vez de <=",
    ],
    exemplos:
      "Entrada: 8, 7, 9\nSaída: Média: 8.00 — Aprovado\n\nEntrada: 3, 2, 4\nSaída: Média: 3.00 — Reprovado",
  },
  {
    titulo: "Pode votar?",
    linguagem: "Python",
    modulo: "Condicionais",
    nivel: "basico",
    descricao:
      "Receba a idade de uma pessoa e diga se o voto é proibido, facultativo ou obrigatório conforme as regras brasileiras.",
    objetivo: "Usar if/elif/else com intervalos de valores",
    permitidos: [
      "input",
      "print",
      "int",
      "if",
      "elif",
      "else",
      "comparadores",
      "and",
      "or",
    ],
    proibidos: ["funções", "listas", "loops"],
    erros_comuns: [
      "intervalos sobrepostos",
      "usar and quando deveria usar or",
      "esquecer a faixa dos 70+",
    ],
    exemplos:
      "Entrada: 17\nSaída: Voto facultativo\n\nEntrada: 25\nSaída: Voto obrigatório\n\nEntrada: 14\nSaída: Não pode votar",
  },
  {
    titulo: "Classificação do IMC",
    linguagem: "Python",
    modulo: "Condicionais",
    nivel: "basico",
    descricao:
      "Receba peso e altura, calcule o IMC e exiba a classificação.",
    objetivo: "Calcular IMC e usar if/elif/else com múltiplas faixas",
    permitidos: [
      "input",
      "print",
      "float",
      "if",
      "elif",
      "else",
      "**",
      "/",
      "comparadores",
    ],
    proibidos: ["funções", "listas", "loops"],
    erros_comuns: [
      "usar altura sem elevar ao quadrado",
      "faixas fora de ordem",
      "esquecer de converter input",
    ],
    exemplos: "Entrada: 70kg, 1.75m\nSaída: IMC: 22.86 — Peso normal",
  },

  // === Módulo: Repetição — Básico
  {
    titulo: "Contagem regressiva",
    linguagem: "Python",
    modulo: "Repetição",
    nivel: "basico",
    descricao: "Imprima uma contagem regressiva de 10 até 1.",
    objetivo: "Usar for com range decrescente",
    permitidos: ["for", "range", "print"],
    proibidos: ["funções", "while", "listas"],
    erros_comuns: [
      "range não inclusivo no fim",
      "step negativo errado",
      "começar do 0 em vez de 10",
    ],
    exemplos: "Saída: 10, 9, 8, 7, 6, 5, 4, 3, 2, 1",
  },
  {
    titulo: "Tabuada",
    linguagem: "Python",
    modulo: "Repetição",
    nivel: "basico",
    descricao: "Peça um número e imprima sua tabuada de 1 a 10.",
    objetivo: "Usar for com range e multiplicação",
    permitidos: ["input", "print", "int", "for", "range", "*"],
    proibidos: ["funções", "while", "listas"],
    erros_comuns: [
      "range começando em 0",
      "range terminando em 10 sem incluir",
      "não usar variável do loop",
    ],
    exemplos:
      "Entrada: 5\nSaída: 5 x 1 = 5\n5 x 2 = 10\n...\n5 x 10 = 50",
  },
  {
    titulo: "Soma de 1 a N",
    linguagem: "Python",
    modulo: "Repetição",
    nivel: "basico",
    descricao:
      "Peça um número N e calcule a soma de todos os números de 1 até N.",
    objetivo: "Usar for com acumulador",
    permitidos: [
      "input",
      "print",
      "int",
      "for",
      "range",
      "+",
      "variável acumuladora",
    ],
    proibidos: ["funções", "while", "listas", "sum()"],
    erros_comuns: [
      "esquecer de inicializar acumulador",
      "range não chegar até N",
      "não acumular dentro do loop",
    ],
    exemplos: "Entrada: 5\nSaída: A soma de 1 até 5 é: 15",
  },
  {
    titulo: "Números pares até 20",
    linguagem: "Python",
    modulo: "Repetição",
    nivel: "basico",
    descricao:
      "Use um loop while para imprimir todos os números pares de 2 até 20.",
    objetivo: "Usar while com incremento",
    permitidos: ["while", "print", "variável", "<=", "+="],
    proibidos: ["funções", "for", "listas", "range"],
    erros_comuns: [
      "loop infinito por esquecer incremento",
      "começar em 0 em vez de 2",
      "condição errada",
    ],
    exemplos: "Saída: 2, 4, 6, 8, 10, 12, 14, 16, 18, 20",
  },
  {
    titulo: "Adivinhe o número",
    linguagem: "Python",
    modulo: "Repetição",
    nivel: "intermediario",
    descricao:
      "O computador escolhe um número aleatório entre 1 e 100. O jogador tenta adivinhar até acertar.",
    objetivo: "Usar while, random.randint e if/elif/else",
    permitidos: [
      "import random",
      "random.randint",
      "while",
      "if",
      "elif",
      "else",
      "input",
      "print",
      "int",
      "variável",
    ],
    proibidos: ["funções", "listas", "for"],
    erros_comuns: [
      "loop infinito",
      "não converter input para int",
      "condição de parada errada",
    ],
    exemplos:
      "Saída: Muito baixo! / Muito alto! / Parabéns, acertou em X tentativas!",
  },

  // === Módulo: Listas — Básico
  {
    titulo: "Lista de cores",
    linguagem: "Python",
    modulo: "Listas",
    nivel: "basico",
    descricao:
      "Crie uma lista com três cores, adicione uma nova cor ao final e exiba a lista.",
    objetivo: "Criar lista e usar append()",
    permitidos: ["lista", "append", "print"],
    proibidos: ["funções", "loops", "dicionários"],
    erros_comuns: [
      "usar parênteses em vez de colchetes",
      "esquecer aspas nas strings",
      "confundir append com add",
    ],
    exemplos: "Lista: ['vermelho', 'azul', 'verde', 'amarelo']",
  },
  {
    titulo: "Verificar elemento na lista",
    linguagem: "Python",
    modulo: "Listas",
    nivel: "basico",
    descricao:
      "Crie uma lista com cinco frutas e verifique se uma fruta digitada pelo usuário está na lista.",
    objetivo: "Usar operador in com lista",
    permitidos: ["lista", "input", "print", "if", "else", "in"],
    proibidos: ["funções", "loops", "dicionários"],
    erros_comuns: [
      "usar == em vez de in",
      "comparação case-sensitive",
      "esquecer de criar a lista",
    ],
    exemplos:
      "Entrada: banana\nSaída: banana está na lista\n\nEntrada: abacaxi\nSaída: abacaxi não está na lista",
  },
  {
    titulo: "Maior e menor da lista",
    linguagem: "Python",
    modulo: "Listas",
    nivel: "basico",
    descricao:
      "Dada uma lista com cinco números, exiba o maior e o menor.",
    objetivo: "Usar max() e min() em lista",
    permitidos: ["lista", "print", "max", "min"],
    proibidos: ["funções próprias", "loops", "dicionários", "sort"],
    erros_comuns: [
      "passar argumento errado para max/min",
      "confundir max com sort",
    ],
    exemplos:
      "Lista: [3, 7, 1, 9, 4]\nMaior: 9\nMenor: 1",
  },

  // === Módulo: Funções — Básico
  {
    titulo: "Função de saudação",
    linguagem: "Python",
    modulo: "Funções",
    nivel: "basico",
    descricao:
      "Crie uma função que receba um nome e imprima uma saudação personalizada.",
    objetivo: "Definir função com parâmetro e chamá-la",
    permitidos: ["def", "print", "parâmetro", "chamada de função"],
    proibidos: ["classes", "lambda", "map", "filter"],
    erros_comuns: [
      "esquecer os parênteses na chamada",
      "não passar argumento",
      "confundir parâmetro com variável global",
    ],
    exemplos: "Entrada: saudar('Maria')\nSaída: Olá, Maria!",
  },
  {
    titulo: "Função que retorna o maior",
    linguagem: "Python",
    modulo: "Funções",
    nivel: "basico",
    descricao:
      "Crie uma função que receba dois números e retorne o maior deles.",
    objetivo: "Usar return em função com if/else",
    permitidos: [
      "def",
      "return",
      "if",
      "else",
      "parâmetros",
      "chamada de função",
    ],
    proibidos: ["classes", "lambda", "max()", "map", "filter"],
    erros_comuns: [
      "usar print em vez de return",
      "esquecer de capturar o retorno",
      "não chamar a função",
    ],
    exemplos: "Entrada: maior(3, 7)\nSaída: 7",
  },
];

async function main() {
  // Delete all existing exercises
  const { error: delErr } = await supabase
    .from("exercicios")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000");

  if (delErr) {
    console.error("Erro ao limpar tabela:", delErr.message);
    return;
  }
  console.log("Tabela limpa.");

  // Insert all exercises
  const { data, error } = await supabase
    .from("exercicios")
    .insert(exercicios)
    .select();

  if (error) {
    console.error("Erro ao inserir:", error.message);
    console.error(JSON.stringify(error, null, 2));
    return;
  }

  console.log(`✅ ${data.length} exercícios inseridos com sucesso!`);
  data.forEach((ex) => {
    console.log(`   - ${ex.id}: ${ex.titulo} (${ex.modulo}/${ex.nivel})`);
  });
}

main().catch(console.error);
