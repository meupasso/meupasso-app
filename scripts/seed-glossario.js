const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

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

const termos = [
  { termo: "Variável", slug: "variavel", linguagem: "geral",
    definicao: "Um espaço na memória do computador usado para guardar um valor. Esse valor pode mudar durante a execução do programa.",
    exemplo: "nome = 'João'\nidade = 25\npreco = 9.99" },
  { termo: "String", slug: "string", linguagem: "geral",
    definicao: "Um tipo de dado que representa texto. Em Python, strings ficam entre aspas simples ou duplas.",
    exemplo: "mensagem = 'Olá, mundo!'\nnome = \"Maria\"" },
  { termo: "Inteiro (int)", slug: "inteiro", linguagem: "geral",
    definicao: "Um tipo de dado que representa números inteiros, sem casas decimais.",
    exemplo: "idade = 20\nqtd_alunos = 35" },
  { termo: "Float", slug: "float", linguagem: "geral",
    definicao: "Um tipo de dado que representa números com casas decimais (ponto flutuante).",
    exemplo: "preco = 9.99\naltura = 1.75" },
  { termo: "Boolean", slug: "boolean", linguagem: "geral",
    definicao: "Um tipo de dado que representa verdadeiro (True) ou falso (False). Usado em condições e comparações.",
    exemplo: "aprovado = True\nreprovado = False" },
  { termo: "input()", slug: "input", linguagem: "python",
    definicao: "Função do Python que pausa o programa e espera o usuário digitar algo. O valor digitado sempre vem como string.",
    exemplo: "nome = input('Digite seu nome: ')\nidade = int(input('Digite sua idade: '))" },
  { termo: "print()", slug: "print", linguagem: "python",
    definicao: "Função do Python que exibe um valor na tela.",
    exemplo: "print('Olá, mundo!')\nprint(f'Meu nome é {nome}')" },
  { termo: "if / else", slug: "if-else", linguagem: "geral",
    definicao: "Estrutura condicional que executa um bloco de código se uma condição for verdadeira, e outro bloco se for falsa.",
    exemplo: "if idade >= 18:\n    print('Maior de idade')\nelse:\n    print('Menor de idade')" },
  { termo: "elif", slug: "elif", linguagem: "python",
    definicao: "Abreviação de 'else if'. Usado para verificar múltiplas condições em sequência.",
    exemplo: "if nota >= 7:\n    print('Aprovado')\nelif nota >= 4:\n    print('Recuperação')\nelse:\n    print('Reprovado')" },
  { termo: "for", slug: "for", linguagem: "geral",
    definicao: "Estrutura de repetição que percorre uma sequência de valores um por um.",
    exemplo: "for i in range(1, 6):\n    print(i)" },
  { termo: "while", slug: "while", linguagem: "geral",
    definicao: "Estrutura de repetição que continua executando enquanto uma condição for verdadeira.",
    exemplo: "numero = 0\nwhile numero < 5:\n    print(numero)\n    numero += 1" },
  { termo: "range()", slug: "range", linguagem: "python",
    definicao: "Função do Python que gera uma sequência de números. Muito usada com o for.",
    exemplo: "range(5)        # 0, 1, 2, 3, 4\nrange(1, 6)     # 1, 2, 3, 4, 5\nrange(0, 10, 2) # 0, 2, 4, 6, 8" },
  { termo: "Lista", slug: "lista", linguagem: "geral",
    definicao: "Uma coleção ordenada de valores. Em Python, listas são criadas com colchetes e podem conter qualquer tipo de dado.",
    exemplo: "frutas = ['banana', 'maçã', 'laranja']\nnumeros = [1, 2, 3, 4, 5]" },
  { termo: "append()", slug: "append", linguagem: "python",
    definicao: "Método que adiciona um elemento ao final de uma lista.",
    exemplo: "frutas = ['banana', 'maçã']\nfrutas.append('laranja')\nprint(frutas) # ['banana', 'maçã', 'laranja']" },
  { termo: "len()", slug: "len", linguagem: "python",
    definicao: "Função que retorna o tamanho de uma lista, string ou outra coleção.",
    exemplo: "frutas = ['banana', 'maçã', 'laranja']\nprint(len(frutas)) # 3" },
  { termo: "Função", slug: "funcao", linguagem: "geral",
    definicao: "Um bloco de código com um nome, que pode ser chamado várias vezes. Pode receber parâmetros e retornar valores.",
    exemplo: "def saudar(nome):\n    print(f'Olá, {nome}!')\n\nsaudar('Maria')" },
  { termo: "def", slug: "def", linguagem: "python",
    definicao: "Palavra-chave do Python usada para definir uma função.",
    exemplo: "def calcular_media(n1, n2, n3):\n    return (n1 + n2 + n3) / 3" },
  { termo: "return", slug: "return", linguagem: "geral",
    definicao: "Palavra-chave que encerra uma função e devolve um valor para quem a chamou.",
    exemplo: "def dobrar(numero):\n    return numero * 2\n\nresultado = dobrar(5)\nprint(resultado) # 10" },
  { termo: "Operador módulo (%)", slug: "modulo", linguagem: "geral",
    definicao: "Operador aritmético que retorna o resto da divisão entre dois números. Muito usado para verificar se um número é par ou ímpar.",
    exemplo: "10 % 3  # resultado: 1\n8 % 2   # resultado: 0 (par)\n7 % 2   # resultado: 1 (ímpar)" },
  { termo: "f-string", slug: "f-string", linguagem: "python",
    definicao: "Forma moderna de inserir variáveis dentro de strings no Python. Basta colocar f antes das aspas e usar chaves {} para inserir variáveis.",
    exemplo: "nome = 'João'\nidade = 25\nprint(f'Meu nome é {nome} e tenho {idade} anos.')" },
];

async function main() {
  const { error: delErr } = await supabase
    .from("glossario")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000");
  if (delErr) {
    console.error("Erro ao limpar:", delErr.message);
    return;
  }
  console.log("Tabela limpa.");

  const { data, error } = await supabase
    .from("glossario")
    .insert(termos)
    .select();

  if (error) {
    console.error("Erro ao inserir:", error.message);
    return;
  }

  console.log(`✅ ${data.length} termos inseridos!`);
  data.forEach((t) => console.log(`   - ${t.slug}: ${t.termo} (${t.linguagem})`));
}

main().catch(console.error);
