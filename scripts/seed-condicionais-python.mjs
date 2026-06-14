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
    id_referencia: "PYC001B", titulo: "Par ou ímpar",
    nivel: "basico", modulo: "Condicionais", linguagem: "Python",
    descricao: "Peça um número inteiro e diga se ele é par ou ímpar.",
    objetivo: "Usar if/else com operador módulo",
    permitidos: ["input", "print", "int", "if", "else", "%", "=="],
    proibidos: ["loops", "funções", "listas"],
    erros_comuns: ["usar = em vez de ==", "esquecer int() no input"],
    exemplos: "Entrada: 4\nSaída: 4 é par\n\nEntrada: 7\nSaída: 7 é ímpar"
  },
  {
    id_referencia: "PYC002B", titulo: "Maior de idade",
    nivel: "basico", modulo: "Condicionais", linguagem: "Python",
    descricao: "Peça a idade de uma pessoa e diga se ela é maior ou menor de idade.",
    objetivo: "Usar if/else com comparador >=",
    permitidos: ["input", "print", "int", "if", "else", ">="],
    proibidos: ["loops", "funções", "listas", "elif"],
    erros_comuns: ["usar > em vez de >=", "esquecer de converter input"],
    exemplos: "Entrada: 18\nSaída: Maior de idade\n\nEntrada: 17\nSaída: Menor de idade"
  },
  {
    id_referencia: "PYC003B", titulo: "Positivo ou negativo",
    nivel: "basico", modulo: "Condicionais", linguagem: "Python",
    descricao: "Peça um número e diga se ele é positivo, negativo ou zero.",
    objetivo: "Usar if/elif/else",
    permitidos: ["input", "print", "float", "if", "elif", "else", ">", "<", "=="],
    proibidos: ["loops", "funções", "listas"],
    erros_comuns: ["esquecer o caso zero", "ordem errada das condições"],
    exemplos: "Entrada: 5\nSaída: Positivo\n\nEntrada: -3\nSaída: Negativo\n\nEntrada: 0\nSaída: Zero"
  },
  {
    id_referencia: "PYC004B", titulo: "Aprovado ou reprovado",
    nivel: "basico", modulo: "Condicionais", linguagem: "Python",
    descricao: "Peça a nota de um aluno e diga se está aprovado (nota >= 7) ou reprovado.",
    objetivo: "Usar if/else com float e comparador >=",
    permitidos: ["input", "print", "float", "if", "else", ">="],
    proibidos: ["loops", "funções", "listas", "elif"],
    erros_comuns: ["usar > em vez de >=", "esquecer de converter input para float"],
    exemplos: "Entrada: 7.0\nSaída: Aprovado\n\nEntrada: 6.9\nSaída: Reprovado"
  },
  {
    id_referencia: "PYC005B", titulo: "Maior entre dois",
    nivel: "basico", modulo: "Condicionais", linguagem: "Python",
    descricao: "Peça dois números e diga qual é o maior ou se são iguais.",
    objetivo: "Usar if/elif/else com comparadores",
    permitidos: ["input", "print", "float", "if", "elif", "else", ">", "<", "=="],
    proibidos: ["loops", "funções", "listas", "max()"],
    erros_comuns: ["usar = em vez de ==", "esquecer o caso de igualdade"],
    exemplos: "Entrada: 5 e 3\nSaída: 5 é maior\n\nEntrada: 4 e 4\nSaída: São iguais"
  },
  {
    id_referencia: "PYC006B", titulo: "Pode votar?",
    nivel: "basico", modulo: "Condicionais", linguagem: "Python",
    descricao: "Peça a idade e diga se o voto é proibido (< 16), facultativo (16-17 ou >= 70) ou obrigatório (18-69).",
    objetivo: "Usar if/elif/else com intervalos",
    permitidos: ["input", "print", "int", "if", "elif", "else", "and", "or", ">=", "<=", "<"],
    proibidos: ["loops", "funções", "listas"],
    erros_comuns: ["intervalos sobrepostos", "usar and quando deveria usar or"],
    exemplos: "Entrada: 17\nSaída: Voto facultativo\n\nEntrada: 14\nSaída: Voto proibido"
  },
  {
    id_referencia: "PYC007B", titulo: "Vogal ou consoante",
    nivel: "basico", modulo: "Condicionais", linguagem: "Python",
    descricao: "Peça uma letra e diga se é vogal ou consoante.",
    objetivo: "Usar if/else com operador in",
    permitidos: ["input", "print", "if", "else", "in", "lower()"],
    proibidos: ["loops", "funções", "listas", "elif"],
    erros_comuns: ["não usar lower() para case insensitive", "listar vogais com or em vez de in"],
    exemplos: "Entrada: A\nSaída: Vogal\n\nEntrada: b\nSaída: Consoante"
  },
  {
    id_referencia: "PYC008B", titulo: "Desconto simples",
    nivel: "basico", modulo: "Condicionais", linguagem: "Python",
    descricao: "Peça o valor de uma compra. Se for maior que R$100, aplique 10% de desconto. Exiba o valor final.",
    objetivo: "Usar if simples para aplicar desconto condicional",
    permitidos: ["input", "print", "float", "if", "*", "-"],
    proibidos: ["loops", "funções", "listas", "else"],
    erros_comuns: ["usar else desnecessário", "calcular desconto errado"],
    exemplos: "Entrada: R$150.00\nSaída: Desconto aplicado! Valor final: R$135.00\n\nEntrada: R$80.00\nSaída: Valor final: R$80.00"
  },
  {
    id_referencia: "PYC009B", titulo: "Calculadora simples",
    nivel: "basico", modulo: "Condicionais", linguagem: "Python",
    descricao: "Peça dois números e um operador (+, -, *, /). Realize a operação e exiba o resultado.",
    objetivo: "Usar if/elif/else para selecionar operação",
    permitidos: ["input", "print", "float", "if", "elif", "else", "+", "-", "*", "/"],
    proibidos: ["loops", "funções", "listas"],
    erros_comuns: ["não tratar divisão por zero", "operador inválido sem mensagem de erro"],
    exemplos: "Entrada: 10, 2, *\nSaída: Resultado: 20.0"
  },
  {
    id_referencia: "PYC010B", titulo: "Triângulo válido",
    nivel: "basico", modulo: "Condicionais", linguagem: "Python",
    descricao: "Peça três lados e diga se formam um triângulo válido. Um triângulo é válido se cada lado é menor que a soma dos outros dois.",
    objetivo: "Usar if/else com condição composta com and",
    permitidos: ["input", "print", "float", "if", "else", "and", "<"],
    proibidos: ["loops", "funções", "listas", "elif"],
    erros_comuns: ["verificar só uma condição em vez das três", "confundir and com or"],
    exemplos: "Entrada: 3, 4, 5\nSaída: Triângulo válido\n\nEntrada: 1, 2, 10\nSaída: Triângulo inválido"
  },

  // === INTERMEDIÁRIO (10) ===
  {
    id_referencia: "PYC011I", titulo: "Situação do aluno",
    nivel: "intermediario", modulo: "Condicionais", linguagem: "Python",
    descricao: "Peça três notas, calcule a média e diga: Aprovado (>= 7), Recuperação (>= 4) ou Reprovado (< 4).",
    objetivo: "Calcular média e usar if/elif/else com float",
    permitidos: ["input", "print", "float", "if", "elif", "else", ">=", "<", "+", "/"],
    proibidos: ["loops", "funções", "listas"],
    erros_comuns: ["erro de precedência na média", "condições fora de ordem"],
    exemplos: "Entrada: 8, 6, 7\nSaída: Média: 7.00 — Aprovado"
  },
  {
    id_referencia: "PYC012I", titulo: "Classificação do IMC",
    nivel: "intermediario", modulo: "Condicionais", linguagem: "Python",
    descricao: "Peça peso e altura, calcule o IMC e exiba a classificação: Abaixo do peso (< 18.5), Normal (18.5-24.9), Sobrepeso (25-29.9), Obesidade (>= 30).",
    objetivo: "Usar if/elif/else com múltiplas faixas de valores",
    permitidos: ["input", "print", "float", "if", "elif", "else", "/", "**", ">=", "<"],
    proibidos: ["loops", "funções", "listas"],
    erros_comuns: ["não elevar altura ao quadrado", "faixas fora de ordem"],
    exemplos: "Entrada: 70kg, 1.75m\nSaída: IMC: 22.86 — Peso normal"
  },
  {
    id_referencia: "PYC013I", titulo: "Desconto progressivo",
    nivel: "intermediario", modulo: "Condicionais", linguagem: "Python",
    descricao: "Peça o valor de uma compra e aplique desconto progressivo: até R$100 sem desconto, R$100-R$500 desconto de 10%, acima de R$500 desconto de 20%.",
    objetivo: "Usar if/elif/else para aplicar regras de negócio",
    permitidos: ["input", "print", "float", "if", "elif", "else", ">=", "<", "*", "-"],
    proibidos: ["loops", "funções", "listas"],
    erros_comuns: ["intervalos sobrepostos", "aplicar desconto errado em cada faixa"],
    exemplos: "Entrada: R$300.00\nSaída: Desconto: 10% — Valor final: R$270.00"
  },
  {
    id_referencia: "PYC014I", titulo: "Ano bissexto",
    nivel: "intermediario", modulo: "Condicionais", linguagem: "Python",
    descricao: "Peça um ano e diga se é bissexto. Regra: divisível por 4, exceto se divisível por 100, a menos que também seja divisível por 400.",
    objetivo: "Usar condição composta com and/or/not",
    permitidos: ["input", "print", "int", "if", "else", "and", "or", "not", "%", "=="],
    proibidos: ["loops", "funções", "listas", "elif"],
    erros_comuns: ["não tratar a exceção do 100 e 400", "ordem errada das condições"],
    exemplos: "Entrada: 2000\nSaída: 2000 é bissexto\n\nEntrada: 1900\nSaída: 1900 não é bissexto"
  },
  {
    id_referencia: "PYC015I", titulo: "Saudação por horário",
    nivel: "intermediario", modulo: "Condicionais", linguagem: "Python",
    descricao: "Peça a hora atual (0-23) e exiba a saudação correta: Bom dia (0-11), Boa tarde (12-17), Boa noite (18-23). Se inválida, mostre erro.",
    objetivo: "Usar if/elif/else com intervalos e validação",
    permitidos: ["input", "print", "int", "if", "elif", "else", ">=", "<=", "and"],
    proibidos: ["loops", "funções", "listas"],
    erros_comuns: ["não validar hora inválida", "intervalos sobrepostos"],
    exemplos: "Entrada: 14\nSaída: Boa tarde\n\nEntrada: 25\nSaída: Hora inválida"
  },
  {
    id_referencia: "PYC016I", titulo: "Conversor de temperatura",
    nivel: "intermediario", modulo: "Condicionais", linguagem: "Python",
    descricao: "Peça uma temperatura e a unidade de origem (C, F ou K). Peça a unidade destino e converta. Trate unidade inválida.",
    objetivo: "Usar if/elif aninhados para múltiplas conversões",
    permitidos: ["input", "print", "float", "if", "elif", "else", "upper()", "operadores aritméticos"],
    proibidos: ["loops", "funções", "listas"],
    erros_comuns: ["fórmula de conversão errada", "não tratar unidade inválida"],
    exemplos: "Entrada: 100, C, F\nSaída: 100°C = 212.0°F"
  },
  {
    id_referencia: "PYC017I", titulo: "Aumento salarial",
    nivel: "intermediario", modulo: "Condicionais", linguagem: "Python",
    descricao: "Peça o salário e aplique aumento conforme a faixa: até R$1500 → 15%, R$1500-R$2500 → 10%, acima → 5%. Exiba o novo salário.",
    objetivo: "Usar if/elif/else para regras de negócio com float",
    permitidos: ["input", "print", "float", "if", "elif", "else", "<=", ">", "*", "+"],
    proibidos: ["loops", "funções", "listas"],
    erros_comuns: ["intervalos sobrepostos", "calcular percentual errado"],
    exemplos: "Entrada: R$1200.00\nSaída: Aumento: 15% — Novo salário: R$1380.00"
  },
  {
    id_referencia: "PYC018I", titulo: "Tipo de triângulo",
    nivel: "intermediario", modulo: "Condicionais", linguagem: "Python",
    descricao: "Peça três lados, valide se formam triângulo e classifique: Equilátero (3 lados iguais), Isósceles (2 iguais) ou Escaleno (todos diferentes).",
    objetivo: "Usar condicionais aninhadas com and/or",
    permitidos: ["input", "print", "float", "if", "elif", "else", "and", "or", "==", "!="],
    proibidos: ["loops", "funções", "listas"],
    erros_comuns: ["não validar triângulo antes de classificar", "confundir isósceles com equilátero"],
    exemplos: "Entrada: 3, 3, 3\nSaída: Equilátero\n\nEntrada: 3, 3, 4\nSaída: Isósceles"
  },
  {
    id_referencia: "PYC019I", titulo: "Sistema de login simples",
    nivel: "intermediario", modulo: "Condicionais", linguagem: "Python",
    descricao: "Defina um usuário e senha fixos no código. Peça usuário e senha ao usuário e diga se o login foi bem-sucedido.",
    objetivo: "Usar if com condição composta and e comparação de strings",
    permitidos: ["input", "print", "if", "else", "and", "=="],
    proibidos: ["loops", "funções", "listas"],
    erros_comuns: ["usar or em vez de and", "comparar com is em vez de =="],
    exemplos: "Entrada: admin, 1234\nSaída: Login bem-sucedido!\n\nEntrada: admin, 0000\nSaída: Usuário ou senha incorretos."
  },
  {
    id_referencia: "PYC020I", titulo: "Calculadora de frete",
    nivel: "intermediario", modulo: "Condicionais", linguagem: "Python",
    descricao: "Peça o peso do pacote (kg) e o estado de destino (SP, RJ, outros). Calcule o frete: SP R$5/kg, RJ R$8/kg, outros R$12/kg. Frete grátis acima de R$100.",
    objetivo: "Combinar condicionais com cálculo e regra de negócio",
    permitidos: ["input", "print", "float", "if", "elif", "else", "upper()", "*", ">="],
    proibidos: ["loops", "funções", "listas"],
    erros_comuns: ["não usar upper() para comparar estado", "não aplicar regra do frete grátis"],
    exemplos: "Entrada: 5kg, SP\nSaída: Frete: R$25.00\n\nEntrada: 15kg, RJ\nSaída: Frete grátis!"
  },

  // === AVANÇADO (5) ===
  {
    id_referencia: "PYC021A", titulo: "Empréstimo bancário",
    nivel: "avancado", modulo: "Condicionais", linguagem: "Python",
    descricao: "Peça salário, valor do empréstimo e prazo em meses. A parcela não pode exceder 30% do salário. Calcule a parcela e diga se foi aprovado.",
    objetivo: "Combinar cálculo de parcela com validação condicional",
    permitidos: ["input", "print", "float", "int", "if", "else", "operadores aritméticos"],
    proibidos: ["loops", "funções", "listas"],
    erros_comuns: ["calcular 30% do empréstimo em vez do salário", "divisão por zero se prazo = 0"],
    exemplos: "Entrada: salário R$3000, empréstimo R$5000, 12 meses\nSaída: Parcela: R$416.67 — Aprovado!"
  },
  {
    id_referencia: "PYC022A", titulo: "Pedra papel tesoura",
    nivel: "avancado", modulo: "Condicionais", linguagem: "Python",
    descricao: "Peça a jogada do usuário e gere uma jogada aleatória para o computador. Determine o vencedor usando condicionais.",
    objetivo: "Usar import random com if/elif/else aninhados",
    permitidos: ["input", "print", "import random", "random.choice", "if", "elif", "else", "and", "or", "=="],
    proibidos: ["loops", "funções", "listas"],
    erros_comuns: ["não cobrir todos os casos de empate e vitória", "lógica de vencedor invertida"],
    exemplos: "Entrada: pedra\nComputador: tesoura\nSaída: Você venceu!"
  },
  {
    id_referencia: "PYC023A", titulo: "Validador de senha",
    nivel: "avancado", modulo: "Condicionais", linguagem: "Python",
    descricao: "Peça uma senha e valide: mínimo 8 caracteres, pelo menos um número, pelo menos uma letra maiúscula. Exiba mensagem específica para cada falha.",
    objetivo: "Usar múltiplos ifs independentes com métodos de string",
    permitidos: ["input", "print", "if", "len()", "any()", "isdigit()", "isupper()", "str métodos"],
    proibidos: ["loops", "funções", "listas", "regex"],
    erros_comuns: ["usar if/elif quando deveria ser ifs independentes", "não checar cada condição separadamente"],
    exemplos: "Entrada: abc123\nSaída: Senha fraca: mínimo 8 caracteres, sem letra maiúscula"
  },
  {
    id_referencia: "PYC024A", titulo: "Tabela de IR",
    nivel: "avancado", modulo: "Condicionais", linguagem: "Python",
    descricao: "Peça o salário bruto e calcule o IR conforme a tabela progressiva: isento até R$1903.98, 7.5% até R$2826.65, 15% até R$3751.05, 22.5% até R$4664.68, 27.5% acima.",
    objetivo: "Implementar tabela progressiva de imposto com if/elif",
    permitidos: ["input", "print", "float", "if", "elif", "else", "operadores aritméticos"],
    proibidos: ["loops", "funções", "listas"],
    erros_comuns: ["aplicar alíquota sobre salário inteiro em vez de parcela excedente", "faixas erradas"],
    exemplos: "Entrada: R$3000.00\nSaída: IR: R$116.40 — Alíquota efetiva: 3.88%"
  },
  {
    id_referencia: "PYC025A", titulo: "Jogo de adivinhação sem loop",
    nivel: "avancado", modulo: "Condicionais", linguagem: "Python",
    descricao: "Gere um número aleatório entre 1 e 10. Dê ao usuário 3 tentativas sequenciais usando apenas condicionais aninhadas. Informe se acertou ou errou em cada tentativa.",
    objetivo: "Usar condicionais aninhadas para simular múltiplas tentativas",
    permitidos: ["input", "print", "int", "import random", "random.randint", "if", "elif", "else"],
    proibidos: ["loops", "funções", "listas", "while", "for"],
    erros_comuns: ["tentar usar loop", "não analisar as 3 tentativas separadamente"],
    exemplos: "Tentativa 1: 3 — Errou\nTentativa 2: 7 — Acertou na 2ª tentativa!"
  },

  // === DESAFIO (5) ===
  {
    id_referencia: "PYC026D", titulo: "Simulador de caixa eletrônico",
    nivel: "desafio", modulo: "Condicionais", linguagem: "Python",
    descricao: "Peça saldo e valor do saque. Valide: saldo suficiente, valor múltiplo de 50, valor máximo de R$1000 por saque. Exiba mensagem para cada erro.",
    objetivo: "Combinar múltiplas validações condicionais em sequência",
    permitidos: ["input", "print", "float", "if", "elif", "else", "and", "%", "<=", ">="],
    proibidos: ["loops", "funções", "listas"],
    erros_comuns: ["não validar todas as condições", "ordem errada das validações"],
    exemplos: "Entrada: saldo R$500, saque R$200\nSaída: Saque realizado! Saldo restante: R$300.00"
  },
  {
    id_referencia: "PYC027D", titulo: "Classificador de produto",
    nivel: "desafio", modulo: "Condicionais", linguagem: "Python",
    descricao: "Peça nome, preço e quantidade. Classifique como Crítico (< 5), Alerta (5-20), Normal (> 20). Se preço > R$1000 e estoque < 10, marque Prioritário.",
    objetivo: "Combinar múltiplas condições com and/or para classificação",
    permitidos: ["input", "print", "float", "int", "if", "elif", "else", "and", "or", ">", "<"],
    proibidos: ["loops", "funções", "listas"],
    erros_comuns: ["não verificar condição prioritária antes", "confundir and com or"],
    exemplos: "Entrada: Notebook, R$2500, 8\nSaída: Status: Prioritário"
  },
  {
    id_referencia: "PYC028D", titulo: "Sistema de pontuação",
    nivel: "desafio", modulo: "Condicionais", linguagem: "Python",
    descricao: "Acerto vale 10 pts, erro desconta 5 pts, passar vale 0. Peça 5 respostas (s/n/p) e calcule pontuação. Classifique: Ouro (>=40), Prata (>=20), Bronze (>=0), Eliminado (<0).",
    objetivo: "Usar múltiplos if/elif para acumular pontos e classificar",
    permitidos: ["input", "print", "int", "if", "elif", "else", "+", "-", ">=", "<"],
    proibidos: ["loops", "funções", "listas", "for", "while"],
    erros_comuns: ["usar loop em vez de condicionais", "classificação fora de ordem"],
    exemplos: "Entrada: s, s, n, p, s\nSaída: Pontuação: 25 — Prata"
  },
  {
    id_referencia: "PYC029D", titulo: "Aluguel de temporada",
    nivel: "desafio", modulo: "Condicionais", linguagem: "Python",
    descricao: "Peça tipo (casa/apto), quartos e temporada (alta/baixa). Calcule diária com regras combinadas. Desconto de 15% para 7+ dias.",
    objetivo: "Resolver problema real com múltiplas condições combinadas",
    permitidos: ["input", "print", "float", "int", "if", "elif", "else", "and", "lower()", "operadores aritméticos"],
    proibidos: ["loops", "funções", "listas"],
    erros_comuns: ["não combinar tipo+temporada corretamente", "esquecer desconto"],
    exemplos: "Entrada: casa, 3 quartos, alta, 10 dias\nSaída: Diária: R$450.00, Total: R$3825.00"
  },
  {
    id_referencia: "PYC030D", titulo: "Verificador de CPF",
    nivel: "desafio", modulo: "Condicionais", linguagem: "Python",
    descricao: "Peça um CPF (11 dígitos). Verifique o tamanho, se não são todos iguais e calcule os dígitos verificadores. Diga se é válido ou inválido.",
    objetivo: "Implementar algoritmo de validação real usando condicionais",
    permitidos: ["input", "print", "int", "str", "len()", "if", "elif", "else", "%", "replace()", "isdigit()"],
    proibidos: ["loops", "funções", "listas", "for", "while"],
    erros_comuns: ["não verificar dígitos todos iguais", "algoritmo de verificação errado"],
    exemplos: "Entrada: 52998224725\nSaída: CPF válido\n\nEntrada: 11111111111\nSaída: CPF inválido"
  },
];

async function main() {
  // Delete existing Condicionais Python
  const { error: delErr } = await supabase
    .from("exercicios")
    .delete()
    .eq("linguagem", "Python")
    .eq("modulo", "Condicionais");
  if (delErr) { console.error("Erro ao limpar:", delErr.message); return; }
  console.log("🗑️  Condicionais Python limpa.");

  // Insert all 30
  const { data, error } = await supabase.from("exercicios").insert(exercicios).select("id_referencia");
  if (error) { console.error("Erro ao inserir:", error.message); return; }

  console.log(`\n✅ ${data.length} exercícios inseridos!`);

  const dist = {};
  for (const ex of exercicios) dist[ex.nivel] = (dist[ex.nivel] || 0) + 1;
  console.log("\n📊 Distribuição:");
  for (const [n, q] of Object.entries(dist)) console.log(`  ${n}: ${q}`);
}

main().catch(console.error);
