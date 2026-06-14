import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const envRaw = fs.readFileSync(path.join(__dirname, "..", ".env.local"), "utf-8");
const env = {};
envRaw.split("\n").forEach((line) => {
  const t = line.trim();
  if (!t || t.startsWith("#")) return;
  const idx = t.indexOf("=");
  if (idx === -1) return;
  env[t.slice(0, idx).trim()] = t.slice(idx + 1).trim();
});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

const exercicios = [
  // === BÁSICO (10) ===
  {
    id_referencia: "PYB001", titulo: "Olá, mundo!",
    nivel: "basico", modulo: "Sintaxe", linguagem: "Python",
    descricao: "Escreva um programa que exiba a mensagem \"Olá, mundo!\" na tela.",
    objetivo: "Usar print() pela primeira vez",
    permitidos: ["print"], proibidos: ["input", "variáveis", "loops", "funções"],
    erros_comuns: ["esquecer as aspas", "esquecer os parênteses"],
    exemplos: "Saída: Olá, mundo!"
  },
  {
    id_referencia: "PYB002", titulo: "Saudação personalizada",
    nivel: "basico", modulo: "Sintaxe", linguagem: "Python",
    descricao: "Peça o nome do usuário e exiba: \"Olá, [nome]! Bem-vindo ao nosso programa!\"",
    objetivo: "Usar input() e print() com f-string",
    permitidos: ["input", "print", "f-string", "variável"],
    proibidos: ["loops", "funções", "listas"],
    erros_comuns: ["esquecer as aspas na f-string", "esquecer de guardar o input em variável"],
    exemplos: "Entrada: João\nSaída: Olá, João! Bem-vindo ao nosso programa!"
  },
  {
    id_referencia: "PYB003", titulo: "Soma de dois números",
    nivel: "basico", modulo: "Sintaxe", linguagem: "Python",
    descricao: "Peça dois números inteiros ao usuário e exiba a soma deles.",
    objetivo: "Usar input(), int() e operador de soma",
    permitidos: ["input", "print", "int", "variável", "+"],
    proibidos: ["loops", "funções", "listas", "float"],
    erros_comuns: ["esquecer de converter string para int", "concatenar strings em vez de somar"],
    exemplos: "Entrada: 5 e 3\nSaída: A soma é 8"
  },
  {
    id_referencia: "PYB004", titulo: "Tipos de dados",
    nivel: "basico", modulo: "Sintaxe", linguagem: "Python",
    descricao: "Crie variáveis dos tipos int, float, str e bool e exiba cada uma com seu tipo usando type().",
    objetivo: "Conhecer os tipos primitivos do Python",
    permitidos: ["print", "type", "variável", "int", "float", "str", "bool"],
    proibidos: ["input", "loops", "funções", "listas"],
    erros_comuns: ["confundir int com float", "esquecer aspas em strings"],
    exemplos: "Saída: 25 <class int>\n3.14 <class float>\nPython <class str>\nTrue <class bool>"
  },
  {
    id_referencia: "PYB005", titulo: "Operações matemáticas",
    nivel: "basico", modulo: "Sintaxe", linguagem: "Python",
    descricao: "Peça dois números e exiba: soma, subtração, multiplicação, divisão, divisão inteira, módulo e potência.",
    objetivo: "Usar os operadores aritméticos do Python",
    permitidos: ["input", "print", "float", "variável", "+", "-", "*", "/", "//", "%", "**"],
    proibidos: ["loops", "funções", "listas"],
    erros_comuns: ["confundir / com //", "esquecer de converter input"],
    exemplos: "Entrada: 10 e 3\nSaída: Soma: 13, Subtração: 7, Multiplicação: 30, Divisão: 3.33, Inteira: 3, Módulo: 1, Potência: 1000"
  },
  {
    id_referencia: "PYB006", titulo: "Conversor de temperatura",
    nivel: "basico", modulo: "Sintaxe", linguagem: "Python",
    descricao: "Peça uma temperatura em Celsius e converta para Fahrenheit. Fórmula: F = C * 9/5 + 32",
    objetivo: "Usar float() e operações matemáticas com fórmula",
    permitidos: ["input", "print", "float", "variável", "operadores aritméticos"],
    proibidos: ["loops", "funções", "listas", "if"],
    erros_comuns: ["erro de precedência na fórmula", "esquecer de converter input"],
    exemplos: "Entrada: 100\nSaída: 100°C equivale a 212.0°F"
  },
  {
    id_referencia: "PYB007", titulo: "Área do retângulo",
    nivel: "basico", modulo: "Sintaxe", linguagem: "Python",
    descricao: "Peça a largura e altura de um retângulo e calcule sua área e perímetro.",
    objetivo: "Usar múltiplas variáveis e operações matemáticas",
    permitidos: ["input", "print", "float", "variável", "*", "+"],
    proibidos: ["loops", "funções", "listas", "if"],
    erros_comuns: ["confundir área com perímetro", "esquecer de converter input"],
    exemplos: "Entrada: largura 5, altura 3\nSaída: Área: 15.0, Perímetro: 16.0"
  },
  {
    id_referencia: "PYB008", titulo: "Troco do caixa",
    nivel: "basico", modulo: "Sintaxe", linguagem: "Python",
    descricao: "Peça o valor de um produto e o valor pago pelo cliente. Calcule e exiba o troco.",
    objetivo: "Usar subtração com float e formatar saída monetária",
    permitidos: ["input", "print", "float", "variável", "-"],
    proibidos: ["loops", "funções", "listas", "if"],
    erros_comuns: ["esquecer de converter input", "erro de arredondamento com float"],
    exemplos: "Entrada: produto R$7.50, pagamento R$10.00\nSaída: Troco: R$ 2.50"
  },
  {
    id_referencia: "PYB009", titulo: "Média de três notas",
    nivel: "basico", modulo: "Sintaxe", linguagem: "Python",
    descricao: "Peça três notas de um aluno e calcule a média aritmética.",
    objetivo: "Usar float() e calcular média com parênteses corretos",
    permitidos: ["input", "print", "float", "variável", "+", "/"],
    proibidos: ["loops", "funções", "listas", "if"],
    erros_comuns: ["erro de precedência: nota1 + nota2 + nota3 / 3", "esquecer os parênteses"],
    exemplos: "Entrada: 8.0, 7.5, 9.0\nSaída: Média: 8.17"
  },
  {
    id_referencia: "PYB010", titulo: "Apresentação pessoal",
    nivel: "basico", modulo: "Sintaxe", linguagem: "Python",
    descricao: "Peça nome, idade e cidade do usuário e exiba uma apresentação formatada usando f-string.",
    objetivo: "Combinar múltiplos inputs com f-string",
    permitidos: ["input", "print", "int", "str", "variável", "f-string"],
    proibidos: ["loops", "funções", "listas", "if"],
    erros_comuns: ["misturar tipos na f-string", "esquecer de converter idade para int"],
    exemplos: "Entrada: Ana, 25, Recife\nSaída: Olá! Meu nome é Ana, tenho 25 anos e moro em Recife."
  },

  // === INTERMEDIÁRIO (10) ===
  {
    id_referencia: "PYB011", titulo: "Conversor de moeda",
    nivel: "intermediario", modulo: "Sintaxe", linguagem: "Python",
    descricao: "Peça a cotação do dólar e um valor em reais. Converta para dólar e exiba o resultado formatado.",
    objetivo: "Usar float e divisão com formatação de casas decimais",
    permitidos: ["input", "print", "float", "variável", "/", "f-string"],
    proibidos: ["loops", "funções", "listas", "if"],
    erros_comuns: ["dividir em vez de multiplicar ou vice-versa", "formatação incorreta"],
    exemplos: "Entrada: cotação 5.20, valor R$100.00\nSaída: US$ 19.23"
  },
  {
    id_referencia: "PYB012", titulo: "Salário com desconto",
    nivel: "intermediario", modulo: "Sintaxe", linguagem: "Python",
    descricao: "Peça o salário bruto de um funcionário. Calcule e exiba: INSS (11%), IR (15%) e salário líquido.",
    objetivo: "Calcular percentuais e múltiplos descontos",
    permitidos: ["input", "print", "float", "variável", "*", "-"],
    proibidos: ["loops", "funções", "listas", "if"],
    erros_comuns: ["calcular desconto sobre o valor já descontado", "erro de percentual"],
    exemplos: "Entrada: R$3000.00\nSaída: INSS: R$330.00, IR: R$450.00, Líquido: R$2220.00"
  },
  {
    id_referencia: "PYB013", titulo: "Conta de energia",
    nivel: "intermediario", modulo: "Sintaxe", linguagem: "Python",
    descricao: "Peça o consumo em kWh e o preço por kWh. Calcule o valor da conta com taxa de 12% de impostos.",
    objetivo: "Calcular valor com imposto percentual",
    permitidos: ["input", "print", "float", "variável", "*", "+"],
    proibidos: ["loops", "funções", "listas", "if"],
    erros_comuns: ["esquecer de somar o imposto ao valor base", "calcular imposto errado"],
    exemplos: "Entrada: 150 kWh, R$0.75/kWh\nSaída: Valor base: R$112.50, Imposto: R$13.50, Total: R$126.00"
  },
  {
    id_referencia: "PYB014", titulo: "Velocidade média",
    nivel: "intermediario", modulo: "Sintaxe", linguagem: "Python",
    descricao: "Peça a distância em km e o tempo em horas. Calcule a velocidade média em km/h e em m/s.",
    objetivo: "Converter unidades e calcular velocidade",
    permitidos: ["input", "print", "float", "variável", "*", "/", "f-string"],
    proibidos: ["loops", "funções", "listas", "if"],
    erros_comuns: ["esquecer de converter km para metros e horas para segundos", "usar nome de variável errado"],
    exemplos: "Entrada: 120km, 2h\nSaída: Velocidade: 60.0 km/h ou 16.67 m/s"
  },
  {
    id_referencia: "PYB015", titulo: "IMC simples",
    nivel: "intermediario", modulo: "Sintaxe", linguagem: "Python",
    descricao: "Peça peso (kg) e altura (m) e calcule o IMC. Apenas exiba o valor sem classificação.",
    objetivo: "Usar potência e divisão com float",
    permitidos: ["input", "print", "float", "variável", "/", "**"],
    proibidos: ["loops", "funções", "listas", "if"],
    erros_comuns: ["não elevar a altura ao quadrado", "usar altura em cm em vez de metros"],
    exemplos: "Entrada: 70kg, 1.75m\nSaída: IMC: 22.86"
  },
  {
    id_referencia: "PYB016", titulo: "Aluguel de carro",
    nivel: "intermediario", modulo: "Sintaxe", linguagem: "Python",
    descricao: "Peça a quantidade de dias alugados e os km rodados. Calcule o total: R$90/dia + R$0.20/km.",
    objetivo: "Calcular total com múltiplas tarifas",
    permitidos: ["input", "print", "float", "int", "variável", "*", "+"],
    proibidos: ["loops", "funções", "listas", "if"],
    erros_comuns: ["somar dias e km sem multiplicar pelas tarifas", "tipos errados"],
    exemplos: "Entrada: 3 dias, 150km\nSaída: Diárias: R$270.00, Km: R$30.00, Total: R$300.00"
  },
  {
    id_referencia: "PYB017", titulo: "Conversor de tempo",
    nivel: "intermediario", modulo: "Sintaxe", linguagem: "Python",
    descricao: "Peça uma quantidade de segundos e converta para horas, minutos e segundos restantes.",
    objetivo: "Usar divisão inteira e módulo para converter unidades",
    permitidos: ["input", "print", "int", "variável", "//", "%"],
    proibidos: ["loops", "funções", "listas", "if"],
    erros_comuns: ["não usar // e % corretamente", "ordem de cálculo errada"],
    exemplos: "Entrada: 3661 segundos\nSaída: 1 hora(s), 1 minuto(s) e 1 segundo(s)"
  },
  {
    id_referencia: "PYB018", titulo: "Preço com desconto",
    nivel: "intermediario", modulo: "Sintaxe", linguagem: "Python",
    descricao: "Peça o preço original e o percentual de desconto. Exiba o valor do desconto e o preço final.",
    objetivo: "Calcular desconto percentual",
    permitidos: ["input", "print", "float", "variável", "*", "-", "/"],
    proibidos: ["loops", "funções", "listas", "if"],
    erros_comuns: ["não dividir percentual por 100", "subtrair percentual diretamente do preço"],
    exemplos: "Entrada: R$200.00, 15%\nSaída: Desconto: R$30.00, Preço final: R$170.00"
  },
  {
    id_referencia: "PYB019", titulo: "Calculadora de viagem",
    nivel: "intermediario", modulo: "Sintaxe", linguagem: "Python",
    descricao: "Peça a distância da viagem (km), consumo do carro (km/l) e preço do combustível. Calcule o gasto total.",
    objetivo: "Combinar múltiplas operações em sequência",
    permitidos: ["input", "print", "float", "variável", "/", "*"],
    proibidos: ["loops", "funções", "listas", "if"],
    erros_comuns: ["inverter divisão e multiplicação", "esquecer de converter inputs"],
    exemplos: "Entrada: 300km, 10km/l, R$5.50/l\nSaída: Litros necessários: 30.0, Gasto total: R$165.00"
  },
  {
    id_referencia: "PYB020", titulo: "Folha de pagamento",
    nivel: "intermediario", modulo: "Sintaxe", linguagem: "Python",
    descricao: "Peça nome, horas trabalhadas e valor por hora. Calcule e exiba o salário bruto com uma apresentação formatada.",
    objetivo: "Combinar strings, int, float e f-string",
    permitidos: ["input", "print", "int", "float", "str", "variável", "*", "f-string"],
    proibidos: ["loops", "funções", "listas", "if"],
    erros_comuns: ["misturar tipos", "formatação incorreta do salário"],
    exemplos: "Entrada: Maria, 160h, R$15.00/h\nSaída: Funcionária: Maria | Horas: 160 | Salário: R$2400.00"
  },

  // === AVANÇADO (5) ===
  {
    id_referencia: "PYB021", titulo: "Equação do segundo grau",
    nivel: "avancado", modulo: "Sintaxe", linguagem: "Python",
    descricao: "Peça os coeficientes a, b e c de uma equação do 2º grau e calcule o delta. Exiba apenas o valor do delta.",
    objetivo: "Usar potência e raiz quadrada (** 0.5)",
    permitidos: ["input", "print", "float", "variável", "*", "-", "**"],
    proibidos: ["loops", "funções", "listas", "if", "import math"],
    erros_comuns: ["fórmula do delta errada", "não usar parênteses corretamente"],
    exemplos: "Entrada: a=1, b=-5, c=6\nSaída: Delta: 1.0"
  },
  {
    id_referencia: "PYB022", titulo: "Conversão de bases",
    nivel: "avancado", modulo: "Sintaxe", linguagem: "Python",
    descricao: "Peça um número inteiro e exiba sua representação em binário, octal e hexadecimal usando bin(), oct() e hex().",
    objetivo: "Usar funções de conversão de base numéricas do Python",
    permitidos: ["input", "print", "int", "variável", "bin", "oct", "hex"],
    proibidos: ["loops", "funções próprias", "listas", "if"],
    erros_comuns: ["não converter input para int antes", "confundir as funções"],
    exemplos: "Entrada: 42\nSaída: Binário: 0b101010, Octal: 0o52, Hexadecimal: 0x2a"
  },
  {
    id_referencia: "PYB023", titulo: "Índice de reajuste",
    nivel: "avancado", modulo: "Sintaxe", linguagem: "Python",
    descricao: "Peça o salário atual e o novo salário após reajuste. Calcule o percentual de aumento e o valor do reajuste.",
    objetivo: "Calcular variação percentual entre dois valores",
    permitidos: ["input", "print", "float", "variável", "-", "/", "*", "f-string"],
    proibidos: ["loops", "funções", "listas", "if"],
    erros_comuns: ["dividir pelo novo salário em vez do antigo", "não multiplicar por 100"],
    exemplos: "Entrada: R$2000.00 → R$2300.00\nSaída: Reajuste: R$300.00 (15.00%)"
  },
  {
    id_referencia: "PYB024", titulo: "Cálculo de combustível",
    nivel: "avancado", modulo: "Sintaxe", linguagem: "Python",
    descricao: "Peça preço do etanol e da gasolina. Calcule a relação etanol/gasolina e recomende o mais vantajoso (etanol vale a pena se a relação for menor que 0.7).",
    objetivo: "Calcular relação entre valores e interpretar sem if",
    permitidos: ["input", "print", "float", "variável", "/", "f-string"],
    proibidos: ["loops", "funções", "listas", "if"],
    erros_comuns: ["dividir gasolina por etanol em vez do contrário", "não entender a regra dos 70%"],
    exemplos: "Entrada: etanol R$3.50, gasolina R$5.50\nSaída: Relação: 0.636 — Use etanol!"
  },
  {
    id_referencia: "PYB025", titulo: "Juros compostos",
    nivel: "avancado", modulo: "Sintaxe", linguagem: "Python",
    descricao: "Peça o capital inicial, taxa de juros mensal (%) e número de meses. Calcule o montante final com juros compostos. Fórmula: M = C * (1 + i)^n",
    objetivo: "Usar fórmula de juros compostos com potência",
    permitidos: ["input", "print", "float", "int", "variável", "*", "+", "/", "**"],
    proibidos: ["loops", "funções", "listas", "if", "import math"],
    erros_comuns: ["usar juros simples em vez de compostos", "não converter taxa para decimal", "erro na fórmula"],
    exemplos: "Entrada: R$1000.00, 2% ao mês, 12 meses\nSaída: Montante: R$1268.24"
  },

  // === DESAFIO (5) ===
  {
    id_referencia: "PYB026", titulo: "Divisão de conta",
    nivel: "desafio", modulo: "Sintaxe", linguagem: "Python",
    descricao: "Peça o valor total de uma conta de restaurante, o número de pessoas e o percentual de gorjeta. Calcule o total com gorjeta e o valor por pessoa.",
    objetivo: "Resolver problema real combinando múltiplas operações",
    permitidos: ["input", "print", "float", "int", "variável", "operadores aritméticos", "f-string"],
    proibidos: ["loops", "funções", "listas", "if"],
    erros_comuns: ["calcular gorjeta sobre o valor já dividido", "dividir antes de adicionar a gorjeta"],
    exemplos: "Entrada: R$150.00, 3 pessoas, 10% gorjeta\nSaída: Total com gorjeta: R$165.00, Por pessoa: R$55.00"
  },
  {
    id_referencia: "PYB027", titulo: "Redução de vida por cigarro",
    nivel: "desafio", modulo: "Sintaxe", linguagem: "Python",
    descricao: "Peça quantos cigarros por dia a pessoa fuma e há quantos anos fuma. Cada cigarro reduz 11 minutos de vida. Calcule e exiba a redução total em dias.",
    objetivo: "Resolver problema com múltiplas conversões de unidade",
    permitidos: ["input", "print", "float", "int", "variável", "operadores aritméticos"],
    proibidos: ["loops", "funções", "listas", "if"],
    erros_comuns: ["esquecer de converter anos em dias", "confundir minutos com horas"],
    exemplos: "Entrada: 20 cigarros/dia, 10 anos\nSaída: Redução total: 1533 dias de vida"
  },
  {
    id_referencia: "PYB028", titulo: "Parcelamento no cartão",
    nivel: "desafio", modulo: "Sintaxe", linguagem: "Python",
    descricao: "Peça o valor de um produto, o número de parcelas e a taxa de juros mensal. Calcule o valor total pago e cada parcela usando juros simples.",
    objetivo: "Aplicar juros simples em contexto real de parcelamento",
    permitidos: ["input", "print", "float", "int", "variável", "operadores aritméticos", "f-string"],
    proibidos: ["loops", "funções", "listas", "if"],
    erros_comuns: ["confundir juros simples com compostos", "não multiplicar taxa pelo número de parcelas"],
    exemplos: "Entrada: R$500.00, 6 parcelas, 2% ao mês\nSaída: Total: R$560.00, Parcela: R$93.33"
  },
  {
    id_referencia: "PYB029", titulo: "Custo de pintura",
    nivel: "desafio", modulo: "Sintaxe", linguagem: "Python",
    descricao: "Peça largura e altura de uma parede, o rendimento da tinta (m²/litro) e o preço por litro. Calcule quantos litros e o custo total. Considere 2 demãos de tinta.",
    objetivo: "Resolver problema de engenharia simples com múltiplas variáveis",
    permitidos: ["input", "print", "float", "variável", "operadores aritméticos", "f-string"],
    proibidos: ["loops", "funções", "listas", "if"],
    erros_comuns: ["esquecer as 2 demãos", "calcular litros sem dividir pela área"],
    exemplos: "Entrada: 5m x 3m, rendimento 2m²/l, R$25.00/l\nSaída: Área: 15m², Litros: 15.0, Custo: R$375.00"
  },
  {
    id_referencia: "PYB030", titulo: "Viagem econômica",
    nivel: "desafio", modulo: "Sintaxe", linguagem: "Python",
    descricao: "Você vai viajar de carro. Peça: distância (km), consumo urbano (km/l), consumo estrada (km/l), percentual de trecho urbano e preço do combustível. Calcule o gasto total considerando os dois consumos.",
    objetivo: "Resolver problema complexo com múltiplas variáveis e ponderação",
    permitidos: ["input", "print", "float", "variável", "operadores aritméticos", "f-string"],
    proibidos: ["loops", "funções", "listas", "if"],
    erros_comuns: ["não ponderar os trechos", "usar apenas um consumo"],
    exemplos: "Entrada: 400km, urbano 8km/l, estrada 12km/l, 30% urbano, R$5.50/l\nSaída: Gasto estimado: R$211.33"
  },
];

async function main() {
  // Delete existing Sintaxe Python
  const { error: delErr } = await supabase
    .from("exercicios")
    .delete()
    .eq("linguagem", "Python")
    .eq("modulo", "Sintaxe");

  if (delErr) {
    console.error("Erro ao limpar:", delErr.message);
    return;
  }
  console.log("🗑️  Sintaxe Python limpa.");

  // Insert all 30
  const { data, error } = await supabase.from("exercicios").insert(exercicios).select("id_referencia");
  if (error) {
    console.error("Erro ao inserir:", error.message);
    return;
  }

  console.log(`\n✅ ${data.length} exercícios inseridos!`);

  const dist = {};
  for (const ex of exercicios) dist[ex.nivel] = (dist[ex.nivel] || 0) + 1;
  console.log("\n📊 Distribuição:");
  for (const [n, q] of Object.entries(dist)) console.log(`  ${n}: ${q}`);
}

main().catch(console.error);
