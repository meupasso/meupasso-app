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
  {
    id_referencia: "JSB001",
    titulo: "Olá, mundo!",
    nivel: "basico",
    modulo: "Sintaxe",
    linguagem: "JavaScript",
    descricao: 'Escreva um programa que exiba "Olá, mundo!" no console.',
    objetivo: "Usar console.log() pela primeira vez",
    permitidos: ["console.log"],
    proibidos: ["variáveis", "loops", "funções"],
    erros_comuns: ["esquecer aspas", "esquecer parênteses"],
    exemplos: "Saída: Olá, mundo!",
  },
  {
    id_referencia: "JSB002",
    titulo: "Saudação personalizada",
    nivel: "basico",
    modulo: "Sintaxe",
    linguagem: "JavaScript",
    descricao:
      'Declare uma constante com seu nome e exiba: "Olá, [nome]! Bem-vindo ao JavaScript!"',
    objetivo: "Usar const e template literal",
    permitidos: ["const", "console.log", "template literal"],
    proibidos: ["let", "var", "loops", "funções"],
    erros_comuns: ["usar aspas em vez de backtick", "esquecer $ antes de {}"],
    exemplos: "Saída: Olá, Ana! Bem-vindo ao JavaScript!",
  },
  {
    id_referencia: "JSB003",
    titulo: "Soma de dois números",
    nivel: "basico",
    modulo: "Sintaxe",
    linguagem: "JavaScript",
    descricao: "Declare duas constantes numéricas e exiba a soma delas.",
    objetivo: "Usar const com números e operador +",
    permitidos: ["const", "console.log", "+"],
    proibidos: ["let", "var", "loops", "funções"],
    erros_comuns: ["concatenar strings em vez de somar", "colocar números entre aspas"],
    exemplos: "const a = 5, b = 3;\nSaída: A soma é 8",
  },
  {
    id_referencia: "JSB004",
    titulo: "Tipos de dados",
    nivel: "basico",
    modulo: "Sintaxe",
    linguagem: "JavaScript",
    descricao:
      "Crie variáveis dos tipos number, string, boolean e exiba cada uma com typeof.",
    objetivo: "Conhecer tipos primitivos e typeof",
    permitidos: ["const", "console.log", "typeof"],
    proibidos: ["let", "var", "loops", "funções"],
    erros_comuns: ["confundir typeof com type", "esquecer que typeof retorna string"],
    exemplos: 'typeof 42 → number\ntypeof "Ana" → string\ntypeof true → boolean',
  },
  {
    id_referencia: "JSB005",
    titulo: "Operações matemáticas",
    nivel: "basico",
    modulo: "Sintaxe",
    linguagem: "JavaScript",
    descricao:
      "Declare dois números e exiba: soma, subtração, multiplicação, divisão, módulo e potência.",
    objetivo: "Usar operadores aritméticos do JavaScript",
    permitidos: ["const", "console.log", "+", "-", "*", "/", "%", "**"],
    proibidos: ["let", "var", "loops", "funções"],
    erros_comuns: ["confundir ** com ^ (XOR)", "divisão sempre retorna float em JS"],
    exemplos:
      "const a=10, b=3;\nSoma: 13, Subtração: 7, Multiplicação: 30\nDivisão: 3.3333, Módulo: 1, Potência: 1000",
  },
  {
    id_referencia: "JSB006",
    titulo: "Template literals",
    nivel: "basico",
    modulo: "Sintaxe",
    linguagem: "JavaScript",
    descricao:
      "Declare nome, idade e cidade. Exiba uma apresentação usando template literal.",
    objetivo: "Usar template literal com expressões",
    permitidos: ["const", "console.log", "template literal"],
    proibidos: ["let", "var", "loops", "funções", "concatenação com +"],
    erros_comuns: ["usar aspas normais em vez de backtick", "esquecer $ no ${variavel}"],
    exemplos: "Saída: Nome: Ana | Idade: 25 | Cidade: Recife",
  },
  {
    id_referencia: "JSB007",
    titulo: "Const vs Let",
    nivel: "basico",
    modulo: "Sintaxe",
    linguagem: "JavaScript",
    descricao:
      "Declare uma const e uma let. Tente reatribuir a const dentro de try/catch para ver o erro. Incremente a let.",
    objetivo: "Entender diferença entre const e let",
    permitidos: ["const", "let", "console.log", "++", "try", "catch"],
    proibidos: ["var", "loops", "funções"],
    erros_comuns: ["tentar reatribuir const sem try/catch", "confundir reatribuição com mutação"],
    exemplos:
      'let contador = 0;\ncontador++; // OK\nconst nome = "Ana";\nnome = "João"; // TypeError!',
  },
  {
    id_referencia: "JSB008",
    titulo: "Conversor de temperatura",
    nivel: "basico",
    modulo: "Sintaxe",
    linguagem: "JavaScript",
    descricao:
      "Declare uma temperatura em Celsius e converta para Fahrenheit. F = C * 9/5 + 32",
    objetivo: "Usar const e operações matemáticas",
    permitidos: ["const", "console.log", "template literal", "*", "/", "+"],
    proibidos: ["let", "var", "loops", "funções"],
    erros_comuns: ["precedência errada na fórmula", "resultado não formatado"],
    exemplos: "const celsius = 100;\nSaída: 100°C equivale a 212°F",
  },
  {
    id_referencia: "JSB009",
    titulo: "Área e perímetro",
    nivel: "basico",
    modulo: "Sintaxe",
    linguagem: "JavaScript",
    descricao:
      "Declare largura e altura de um retângulo. Calcule e exiba área e perímetro.",
    objetivo: "Usar múltiplas constantes e operações",
    permitidos: ["const", "console.log", "template literal", "*", "+"],
    proibidos: ["let", "var", "loops", "funções"],
    erros_comuns: ["confundir área com perímetro", "esquecer parênteses no perímetro"],
    exemplos: "const largura=5, altura=3;\nÁrea: 15\nPerímetro: 16",
  },
  {
    id_referencia: "JSB010",
    titulo: "Troco do caixa",
    nivel: "basico",
    modulo: "Sintaxe",
    linguagem: "JavaScript",
    descricao:
      "Declare preço e valor pago. Calcule e exiba o troco com 2 casas decimais usando toFixed(2).",
    objetivo: "Usar subtração e toFixed()",
    permitidos: ["const", "console.log", "template literal", "-", "toFixed"],
    proibidos: ["let", "var", "loops", "funções"],
    erros_comuns: ["esquecer toFixed()", "toFixed retorna string"],
    exemplos: "const preco=7.50, pago=10.00;\nSaída: Troco: R$ 2.50",
  },
  {
    id_referencia: "JSB011",
    titulo: "Conversor de moeda",
    nivel: "intermediario",
    modulo: "Sintaxe",
    linguagem: "JavaScript",
    descricao:
      "Declare cotação do dólar e valor em reais. Converta para dólar, euro (R$5.80) e libra (R$6.50).",
    objetivo: "Múltiplas conversões com template literal",
    permitidos: ["const", "console.log", "template literal", "/", "toFixed"],
    proibidos: ["let", "var", "loops", "funções"],
    erros_comuns: ["dividir em vez de multiplicar", "formatação errada"],
    exemplos: "cotacao=5.20, valor=100\nUS$19.23, €17.24, £15.38",
  },
  {
    id_referencia: "JSB012",
    titulo: "Salário com descontos",
    nivel: "intermediario",
    modulo: "Sintaxe",
    linguagem: "JavaScript",
    descricao:
      "Declare salário bruto. Calcule INSS (11%), IR (15%) e exiba salário líquido.",
    objetivo: "Calcular múltiplos percentuais",
    permitidos: ["const", "let", "console.log", "template literal", "*", "-", "toFixed"],
    proibidos: ["var", "loops", "funções"],
    erros_comuns: ["calcular IR sobre salário já descontado"],
    exemplos: "salario=3000\nINSS: R$330.00, IR: R$450.00\nLíquido: R$2220.00",
  },
  {
    id_referencia: "JSB013",
    titulo: "Operadores de comparação",
    nivel: "intermediario",
    modulo: "Sintaxe",
    linguagem: "JavaScript",
    descricao:
      "Demonstre a diferença entre == e === com exemplos de coerção de tipo.",
    objetivo: "Entender == (coerção) vs === (estrito)",
    permitidos: ["const", "console.log", "==", "===", "!=", "!=="],
    proibidos: ["let", "var", "loops", "funções"],
    erros_comuns: ["usar == quando deveria usar ==="],
    exemplos:
      "0 == false → true\n0 === false → false\nnull == undefined → true\nnull === undefined → false",
  },
  {
    id_referencia: "JSB014",
    titulo: "Velocidade média",
    nivel: "intermediario",
    modulo: "Sintaxe",
    linguagem: "JavaScript",
    descricao:
      "Declare distância (km) e tempo (horas). Calcule velocidade em km/h e m/s.",
    objetivo: "Converter unidades com operações",
    permitidos: ["const", "console.log", "template literal", "/", "*", "toFixed"],
    proibidos: ["let", "var", "loops", "funções"],
    erros_comuns: ["conversão de unidades errada"],
    exemplos: "distancia=120, tempo=2\n60.00 km/h = 16.67 m/s",
  },
  {
    id_referencia: "JSB015",
    titulo: "IMC simples",
    nivel: "intermediario",
    modulo: "Sintaxe",
    linguagem: "JavaScript",
    descricao:
      "Declare peso e altura. Calcule IMC usando ** e exiba com toFixed(2).",
    objetivo: "Usar ** para potência",
    permitidos: ["const", "console.log", "template literal", "/", "**", "toFixed"],
    proibidos: ["let", "var", "loops", "funções", "Math.pow"],
    erros_comuns: ["não elevar altura ao quadrado"],
    exemplos: "peso=70, altura=1.75\nIMC: 22.86",
  },
  {
    id_referencia: "JSB016",
    titulo: "Aluguel de carro",
    nivel: "intermediario",
    modulo: "Sintaxe",
    linguagem: "JavaScript",
    descricao:
      "Declare dias alugados e km rodados. Calcule total: R$90/dia + R$0.20/km.",
    objetivo: "Calcular total com múltiplas tarifas",
    permitidos: ["const", "console.log", "template literal", "*", "+", "toFixed"],
    proibidos: ["let", "var", "loops", "funções"],
    erros_comuns: ["tarifas trocadas"],
    exemplos:
      "dias=3, km=150\nDiárias: R$270.00, Km: R$30.00, Total: R$300.00",
  },
  {
    id_referencia: "JSB017",
    titulo: "Conversor de tempo",
    nivel: "intermediario",
    modulo: "Sintaxe",
    linguagem: "JavaScript",
    descricao:
      "Declare segundos. Converta para horas, minutos e segundos usando Math.floor() e %.",
    objetivo: "Usar Math.floor() e módulo",
    permitidos: ["const", "console.log", "template literal", "Math.floor", "%", "/"],
    proibidos: ["let", "var", "loops", "funções"],
    erros_comuns: ["não usar Math.floor()", "ordem de cálculo errada"],
    exemplos: "const segundos = 3661;\n1 hora(s), 1 minuto(s) e 1 segundo(s)",
  },
  {
    id_referencia: "JSB018",
    titulo: "Preço com desconto",
    nivel: "intermediario",
    modulo: "Sintaxe",
    linguagem: "JavaScript",
    descricao:
      "Declare preço e percentual. Calcule valor do desconto e preço final.",
    objetivo: "Calcular desconto percentual",
    permitidos: ["const", "console.log", "template literal", "*", "-", "/", "toFixed"],
    proibidos: ["let", "var", "loops", "funções"],
    erros_comuns: ["não dividir percentual por 100"],
    exemplos:
      "preco=200, desconto=15\nDesconto: R$30.00, Final: R$170.00",
  },
  {
    id_referencia: "JSB019",
    titulo: "Calculadora de viagem",
    nivel: "intermediario",
    modulo: "Sintaxe",
    linguagem: "JavaScript",
    descricao:
      "Declare distância, consumo (km/l) e preço do combustível. Calcule litros e custo.",
    objetivo: "Combinar múltiplas operações",
    permitidos: ["const", "console.log", "template literal", "/", "*", "toFixed"],
    proibidos: ["let", "var", "loops", "funções"],
    erros_comuns: ["inverter divisão e multiplicação"],
    exemplos:
      "dist=300, consumo=10, preco=5.50\nLitros: 30.00, Custo: R$165.00",
  },
  {
    id_referencia: "JSB020",
    titulo: "Folha de pagamento",
    nivel: "intermediario",
    modulo: "Sintaxe",
    linguagem: "JavaScript",
    descricao:
      "Declare nome, horas e valor/hora. Calcule e exiba salário formatado.",
    objetivo: "Combinar string, number e template literal",
    permitidos: ["const", "console.log", "template literal", "*", "toFixed"],
    proibidos: ["let", "var", "loops", "funções"],
    erros_comuns: ["multiplicar string por número"],
    exemplos:
      'nome="Maria", horas=160, valor=15\nFuncionária: Maria | Horas: 160 | Salário: R$2400.00',
  },
  {
    id_referencia: "JSB021",
    titulo: "Equação do segundo grau",
    nivel: "avancado",
    modulo: "Sintaxe",
    linguagem: "JavaScript",
    descricao:
      "Declare coeficientes a, b e c. Calcule o delta. Exiba apenas o delta.",
    objetivo: "Usar ** em fórmula matemática",
    permitidos: ["const", "console.log", "template literal", "**", "*", "-"],
    proibidos: ["let", "var", "loops", "funções", "Math.sqrt"],
    erros_comuns: ["fórmula delta errada: b²-4ac", "precedência errada"],
    exemplos: "a=1, b=-5, c=6\nDelta: 1",
  },
  {
    id_referencia: "JSB022",
    titulo: "Juros compostos",
    nivel: "avancado",
    modulo: "Sintaxe",
    linguagem: "JavaScript",
    descricao:
      "Declare capital, taxa mensal (%) e meses. Calcule montante com M = C * (1 + i)^n.",
    objetivo: "Usar ** para juros compostos",
    permitidos: ["const", "console.log", "template literal", "**", "*", "+", "/", "toFixed"],
    proibidos: ["let", "var", "loops", "funções"],
    erros_comuns: ["não converter taxa para decimal"],
    exemplos: "capital=1000, taxa=2, meses=12\nMontante: R$1268.24",
  },
  {
    id_referencia: "JSB023",
    titulo: "Índice de reajuste",
    nivel: "avancado",
    modulo: "Sintaxe",
    linguagem: "JavaScript",
    descricao:
      "Declare salário atual e novo. Calcule percentual e valor do reajuste.",
    objetivo: "Calcular variação percentual",
    permitidos: ["const", "console.log", "template literal", "-", "/", "*", "toFixed"],
    proibidos: ["let", "var", "loops", "funções"],
    erros_comuns: ["dividir pelo novo em vez do atual"],
    exemplos: "atual=2000, novo=2300\nReajuste: R$300.00 (15.00%)",
  },
  {
    id_referencia: "JSB024",
    titulo: "Divisão de conta",
    nivel: "avancado",
    modulo: "Sintaxe",
    linguagem: "JavaScript",
    descricao:
      "Declare valor, pessoas e gorjeta (%). Calcule total com gorjeta e valor por pessoa.",
    objetivo: "Resolver problema real com múltiplas operações",
    permitidos: ["const", "console.log", "template literal", "*", "+", "/", "toFixed"],
    proibidos: ["let", "var", "loops", "funções"],
    erros_comuns: ["gorjeta sobre valor dividido"],
    exemplos:
      "conta=150, pessoas=3, gorjeta=10\nTotal: R$165.00, Por pessoa: R$55.00",
  },
  {
    id_referencia: "JSB025",
    titulo: "Custo de pintura",
    nivel: "avancado",
    modulo: "Sintaxe",
    linguagem: "JavaScript",
    descricao:
      "Declare largura, altura, rendimento (m²/l) e preço/litro. Calcule custo com 2 demãos.",
    objetivo: "Resolver problema com múltiplas variáveis",
    permitidos: ["const", "console.log", "template literal", "*", "/", "toFixed"],
    proibidos: ["let", "var", "loops", "funções"],
    erros_comuns: ["esquecer 2 demãos", "inverter área e rendimento"],
    exemplos:
      "5x3m, 2m²/l, R$25/l\nÁrea: 15m², Litros: 15.00, Custo: R$375.00",
  },
  {
    id_referencia: "JSB026",
    titulo: "Parcelamento no cartão",
    nivel: "desafio",
    modulo: "Sintaxe",
    linguagem: "JavaScript",
    descricao:
      "Declare valor, parcelas e taxa mensal. Calcule total e parcela com juros simples.",
    objetivo: "Aplicar juros simples em parcelamento",
    permitidos: ["const", "console.log", "template literal", "*", "+", "/", "toFixed"],
    proibidos: ["let", "var", "loops", "funções"],
    erros_comuns: ["confundir juros simples e compostos"],
    exemplos:
      "valor=500, parcelas=6, taxa=2\nTotal: R$560.00, Parcela: R$93.33",
  },
  {
    id_referencia: "JSB027",
    titulo: "Redução de vida por cigarro",
    nivel: "desafio",
    modulo: "Sintaxe",
    linguagem: "JavaScript",
    descricao:
      "Declare cigarros/dia e anos fumando. Cada cigarro reduz 11 minutos. Calcule redução em dias.",
    objetivo: "Múltiplas conversões de unidade",
    permitidos: ["const", "console.log", "template literal", "*", "/", "Math.floor"],
    proibidos: ["let", "var", "loops", "funções"],
    erros_comuns: ["esquecer converter anos em dias"],
    exemplos:
      "cigarros=20, anos=10\nRedução: 1533 dias",
  },
  {
    id_referencia: "JSB028",
    titulo: "Viagem econômica",
    nivel: "desafio",
    modulo: "Sintaxe",
    linguagem: "JavaScript",
    descricao:
      "Declare distância, consumo urbano, consumo estrada, % urbano e preço. Calcule gasto ponderado.",
    objetivo: "Problema com ponderação de valores",
    permitidos: ["const", "console.log", "template literal", "*", "/", "+", "toFixed"],
    proibidos: ["let", "var", "loops", "funções"],
    erros_comuns: ["não ponderar trechos"],
    exemplos:
      "400km, 8km/l urbano, 12km/l estrada, 30% urbano, R$5.50\nGasto: R$211.33",
  },
  {
    id_referencia: "JSB029",
    titulo: "Financiamento imobiliário",
    nivel: "desafio",
    modulo: "Sintaxe",
    linguagem: "JavaScript",
    descricao:
      "Declare valor do imóvel, entrada (%), taxa anual e prazo (anos). Calcule: financiado, taxa mensal, parcela e total.",
    objetivo: "Cálculo financeiro complexo",
    permitidos: [
      "const",
      "console.log",
      "template literal",
      "**",
      "*",
      "/",
      "+",
      "-",
      "toFixed",
    ],
    proibidos: ["let", "var", "loops", "funções"],
    erros_comuns: ["não converter taxa anual para mensal"],
    exemplos:
      "R$300k, 20% entrada, 10% a.a., 30 anos\nFinanciado: R$240k, Parcela: R$2107.20",
  },
  {
    id_referencia: "JSB030",
    titulo: "Análise de investimento",
    nivel: "desafio",
    modulo: "Sintaxe",
    linguagem: "JavaScript",
    descricao:
      "Declare dois investimentos (capital e taxa anual). Compare montantes após 5 anos. Use Math.max() para indicar o melhor.",
    objetivo: "Comparar cenários com Math.max()",
    permitidos: [
      "const",
      "console.log",
      "template literal",
      "**",
      "Math.max",
      "*",
      "+",
      "/",
      "toFixed",
    ],
    proibidos: ["let", "var", "loops", "funções", "if"],
    erros_comuns: ["taxa não convertida para decimal"],
    exemplos:
      "Inv1: R$10k a 8% → R$14693\nInv2: R$10k a 10% → R$16105\nMelhor: Investimento 2",
  },
];

async function main() {
  const { error: delErr } = await supabase
    .from("exercicios")
    .delete()
    .eq("linguagem", "JavaScript")
    .eq("modulo", "Sintaxe");

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
    .eq("modulo", "Sintaxe");

  console.log(`📊 Verificação: ${count} exercícios no banco`);
  for (const nivel of ["basico", "intermediario", "avancado", "desafio"]) {
    const { count: n } = await supabase
      .from("exercicios")
      .select("*", { count: "exact", head: true })
      .eq("linguagem", "JavaScript")
      .eq("modulo", "Sintaxe")
      .eq("nivel", nivel);
    console.log(`  ${nivel}: ${n}`);
  }
}

main().catch(console.error);
