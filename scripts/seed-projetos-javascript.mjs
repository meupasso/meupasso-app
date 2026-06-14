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

const projetos = [
  {
    titulo: "Calculadora Financeira",
    descricao:
      "Construa uma calculadora financeira completa com funções para calcular juros simples, juros compostos, parcelas e desconto. Cada operação em uma função separada com menu interativo no terminal.",
    linguagem: "JavaScript",
    nivel: "intermediario",
    ordem: 1,
  },
  {
    titulo: "Sistema de Cadastro de Clientes",
    descricao:
      "Construa um sistema completo de cadastro usando arrays e funções. Operações: cadastrar, buscar, listar, atualizar e remover clientes. Dados salvos em arquivo JSON.",
    linguagem: "JavaScript",
    nivel: "intermediario",
    ordem: 2,
  },
  {
    titulo: "Jogo de Adivinhação Avançado",
    descricao:
      "Construa um jogo completo com níveis de dificuldade, sistema de pontuação, ranking dos melhores jogadores e opção de jogar novamente.",
    linguagem: "JavaScript",
    nivel: "intermediario",
    ordem: 3,
  },
  {
    titulo: "Gerenciador de Tarefas",
    descricao:
      "Construa um gerenciador de tarefas com prioridades, categorias, status e filtros. Use objetos e arrays para estruturar os dados com persistência em JSON.",
    linguagem: "JavaScript",
    nivel: "avancado",
    ordem: 4,
  },
  {
    titulo: "Sistema de Notas Escolares",
    descricao:
      "Construa um sistema escolar completo com classes Aluno, Disciplina e Turma usando POO. Cadastro de alunos, lançamento de notas, boletim e ranking.",
    linguagem: "JavaScript",
    nivel: "avancado",
    ordem: 5,
  },
];

async function main() {
  // Delete existing JavaScript projetos (cascade deleta etapas)
  const { error: delErr } = await supabase
    .from("projetos")
    .delete()
    .eq("linguagem", "JavaScript");

  if (delErr) {
    console.error("Erro ao deletar projetos:", delErr.message);
    process.exit(1);
  }
  console.log("✅ Projetos JavaScript antigos deletados");

  // Insert projetos
  const { data: projInseridos, error: insErr } = await supabase
    .from("projetos")
    .insert(projetos)
    .select();

  if (insErr) {
    console.error("Erro ao inserir projetos:", insErr.message);
    process.exit(1);
  }
  console.log(`✅ ${projInseridos.length} projetos inseridos!`);

  // Map projects by titulo for etapas
  const projMap = {};
  for (const p of projInseridos) {
    projMap[p.titulo] = p.id;
  }

  const etapas = [
    // ===== PROJETO 1 — Calculadora Financeira =====
    {
      projeto_id: projMap["Calculadora Financeira"],
      numero: 1,
      titulo: "Etapa 1 — Funções básicas",
      descricao: `Crie um arquivo calculadora.js com quatro funções usando arrow functions:

const somar = (a, b) => a + b;
const subtrair = (a, b) => a - b;
const multiplicar = (a, b) => a * b;
const dividir = (a, b) => {
  if (b === 0) return "Erro: divisão por zero";
  return a / b;
};

Teste cada função:
console.log(somar(10, 5));        // 15
console.log(subtrair(10, 5));     // 5
console.log(multiplicar(10, 5));  // 50
console.log(dividir(10, 5));      // 2
console.log(dividir(10, 0));      // Erro: divisão por zero`,
      dica_tutor:
        "Use arrow functions: const nomeFuncao = (params) => expressão. Para divisão por zero, use if (b === 0) antes de dividir. Arrow function com uma expressão pode omitir return e chaves: const somar = (a, b) => a + b.",
      ordem: 1,
    },
    {
      projeto_id: projMap["Calculadora Financeira"],
      numero: 2,
      titulo: "Etapa 2 — Juros simples e compostos",
      descricao: `Adicione duas funções financeiras:

const jurosSimples = (capital, taxa, tempo) => capital * (1 + (taxa/100) * tempo);
const jurosCompostos = (capital, taxa, tempo) => capital * ((1 + taxa/100) ** tempo);

Teste e compare:
const capital = 1000, taxa = 5, tempo = 3;
console.log(\`Juros simples: R$ \${jurosSimples(capital, taxa, tempo).toFixed(2)}\`);
// R$ 1150.00
console.log(\`Juros compostos: R$ \${jurosCompostos(capital, taxa, tempo).toFixed(2)}\`);
// R$ 1157.63
console.log(\`Diferença: R$ \${(jurosCompostos(capital, taxa, tempo) - jurosSimples(capital, taxa, tempo)).toFixed(2)}\`);
// R$ 7.63`,
      dica_tutor:
        "taxa/100 converte percentual para decimal. Use ** para potência: (1 + taxa/100) ** tempo. toFixed(2) formata para 2 casas decimais mas retorna string — use apenas na exibição, não em cálculos.",
      ordem: 2,
    },
    {
      projeto_id: projMap["Calculadora Financeira"],
      numero: 3,
      titulo: "Etapa 3 — Calculadora de parcelas",
      descricao: `Adicione a função:

const calcularParcela = (valor, nParcelas, taxaMensal) => {
  if (nParcelas <= 0) return "Erro: número de parcelas inválido";
  if (taxaMensal === 0) return valor / nParcelas;
  const total = valor * (1 + (taxaMensal/100) * nParcelas);
  return total / nParcelas;
};

Teste:
console.log(calcularParcela(1200, 12, 2).toFixed(2));  // 124.00
console.log(calcularParcela(600, 3, 0).toFixed(2));    // 200.00
console.log(calcularParcela(500, 0, 1));               // Erro: número de parcelas inválido`,
      dica_tutor:
        "Valide nParcelas com if (nParcelas <= 0) antes de qualquer cálculo. Para taxa zero, retorne valor / nParcelas diretamente. Calcule o total com juros primeiro, depois divida pelas parcelas.",
      ordem: 3,
    },
    {
      projeto_id: projMap["Calculadora Financeira"],
      numero: 4,
      titulo: "Etapa 4 — Calculadora de desconto",
      descricao: `Adicione:

const calcularDesconto = (preco, percentual) => {
  if (percentual < 0 || percentual > 100) return "Erro: percentual inválido";
  const desconto = preco * (percentual / 100);
  return { desconto, precoFinal: preco - desconto };
};

const precoParceladoComDesconto = (preco, parcelas, taxa, descontoPerc) => {
  const { precoFinal } = calcularDesconto(preco, descontoPerc);
  const parcela = calcularParcela(precoFinal, parcelas, taxa);
  return { precoComDesconto: precoFinal, parcela, total: parcela * parcelas };
};

Teste:
const { desconto, precoFinal } = calcularDesconto(500, 15);
console.log(\`Desconto: R$ \${desconto.toFixed(2)}\`);    // R$ 75.00
console.log(\`Final: R$ \${precoFinal.toFixed(2)}\`);     // R$ 425.00

const resultado = precoParceladoComDesconto(500, 6, 2, 10);
console.log(\`Parcela: R$ \${resultado.parcela.toFixed(2)}\`); // R$ 84.00`,
      dica_tutor:
        "Use desestruturação para extrair valores do objeto retornado: const { desconto, precoFinal } = calcularDesconto(500, 15). A função precoParceladoComDesconto reutiliza as funções já criadas — composição de funções.",
      ordem: 4,
    },
    {
      projeto_id: projMap["Calculadora Financeira"],
      numero: 5,
      titulo: "Etapa 5 — Menu interativo com readline",
      descricao: `Una tudo em menu interativo usando readline:

const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const pergunta = (q) => new Promise(resolve => rl.question(q, resolve));

async function menu() {
  console.log("\\n=== CALCULADORA FINANCEIRA ===");
  console.log("1. Juros Simples");
  console.log("2. Juros Compostos");
  console.log("3. Calculadora de Parcelas");
  console.log("4. Calcular Desconto");
  console.log("0. Sair");

  const opcao = await pergunta("Escolha: ");

  switch(opcao) {
    case "1":
      const capital = parseFloat(await pergunta("Capital: "));
      const taxa = parseFloat(await pergunta("Taxa (%): "));
      const tempo = parseFloat(await pergunta("Tempo: "));
      console.log(\`Montante: R$ \${jurosSimples(capital, taxa, tempo).toFixed(2)}\`);
      break;
    case "0":
      rl.close();
      return;
  }
  menu();
}

menu();`,
      dica_tutor:
        "Use const pergunta = (q) => new Promise(resolve => rl.question(q, resolve)) para transformar readline em Promise. Chame menu() recursivamente ao final de cada operação. Use parseFloat() para converter strings de input para números.",
      ordem: 5,
    },

    // ===== PROJETO 2 — Sistema de Cadastro de Clientes =====
    {
      projeto_id: projMap["Sistema de Cadastro de Clientes"],
      numero: 1,
      titulo: "Etapa 1 — Estrutura de dados",
      descricao: `Crie cadastro.js com array de clientes e funções básicas:

const clientes = [];

const cadastrar = (nome, email, telefone) => {
  clientes.push({ id: Date.now(), nome, email, telefone });
  console.log(\`✅ Cliente \${nome} cadastrado!\`);
};

const listarTodos = () => {
  if (clientes.length === 0) return console.log("Nenhum cliente.");
  clientes.forEach((c, i) =>
    console.log(\`[\${i}] \${c.nome} | \${c.email} | \${c.telefone}\`)
  );
};

cadastrar("Ana Silva", "ana@email.com", "81999999999");
cadastrar("João Costa", "joao@email.com", "81988888888");
listarTodos();`,
      dica_tutor:
        "Use Date.now() para gerar ID único baseado em timestamp. O array clientes é modificado com push() que é uma mutação. forEach com índice: clientes.forEach((cliente, indice) => ...).",
      ordem: 1,
    },
    {
      projeto_id: projMap["Sistema de Cadastro de Clientes"],
      numero: 2,
      titulo: "Etapa 2 — Busca e validação",
      descricao: `Adicione busca e validação:

const emailValido = (email) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);

const buscarPorNome = (nome) =>
  clientes.find(c => c.nome.toLowerCase().includes(nome.toLowerCase()));

const buscarPorId = (id) => clientes.find(c => c.id === id);

const cadastrar = (nome, email, telefone) => {
  if (!emailValido(email)) return console.log("❌ Email inválido.");
  const existe = buscarPorNome(nome);
  if (existe) return console.log("❌ Cliente já cadastrado.");
  clientes.push({ id: Date.now(), nome, email, telefone });
  console.log(\`✅ \${nome} cadastrado!\`);
};

cadastrar("Ana", "email-invalido", "81999999999"); // ❌ Email inválido
cadastrar("Ana", "ana@ok.com", "81999999999");     // ✅
cadastrar("Ana", "ana@ok.com", "81999999999");     // ❌ Já cadastrado`,
      dica_tutor:
        "A regex /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/ valida email básico. find() retorna o primeiro elemento que satisfaz a condição ou undefined. includes() com toLowerCase() faz busca case insensitive.",
      ordem: 2,
    },
    {
      projeto_id: projMap["Sistema de Cadastro de Clientes"],
      numero: 3,
      titulo: "Etapa 3 — Atualizar e remover",
      descricao: `Adicione operações de atualização e remoção:

const atualizarTelefone = (nome, novoTel) => {
  const cliente = buscarPorNome(nome);
  if (!cliente) return console.log("❌ Cliente não encontrado.");
  cliente.telefone = novoTel;
  console.log(\`✅ Telefone de \${nome} atualizado para \${novoTel}\`);
};

const removerCliente = (nome) => {
  const idx = clientes.findIndex(c =>
    c.nome.toLowerCase().includes(nome.toLowerCase())
  );
  if (idx === -1) return console.log("❌ Cliente não encontrado.");
  const removido = clientes.splice(idx, 1)[0];
  console.log(\`✅ \${removido.nome} removido.\`);
};

atualizarTelefone("Ana", "81911111111");
removerCliente("João");
listarTodos();`,
      dica_tutor:
        "find() retorna referência ao objeto — modificar cliente.telefone modifica o array diretamente. findIndex() retorna -1 se não encontrar. splice(idx, 1) remove 1 elemento na posição idx e retorna array com os removidos.",
      ordem: 3,
    },
    {
      projeto_id: projMap["Sistema de Cadastro de Clientes"],
      numero: 4,
      titulo: "Etapa 4 — Persistência em JSON",
      descricao: `Adicione persistência com fs:

const fs = require("fs");
const ARQUIVO = "clientes.json";

const salvar = () => {
  fs.writeFileSync(ARQUIVO, JSON.stringify(clientes, null, 2));
  console.log(\`💾 \${clientes.length} cliente(s) salvos.\`);
};

const carregar = () => {
  try {
    const dados = fs.readFileSync(ARQUIVO, "utf-8");
    const carregados = JSON.parse(dados);
    clientes.push(...carregados);
    console.log(\`📂 \${carregados.length} cliente(s) carregados.\`);
  } catch {
    console.log("📂 Nenhum dado anterior.");
  }
};

carregar();
cadastrar("Maria", "maria@ok.com", "81977777777");
salvar();`,
      dica_tutor:
        "writeFileSync é síncrono — espera terminar antes de continuar. JSON.stringify(clientes, null, 2) formata com indentação. clientes.push(...carregados) usa spread para adicionar todos os elementos. try/catch trata FileNotFoundError na primeira execução.",
      ordem: 4,
    },
    {
      projeto_id: projMap["Sistema de Cadastro de Clientes"],
      numero: 5,
      titulo: "Etapa 5 — Menu completo",
      descricao: `Une tudo com menu readline:

const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise(r => rl.question(q, r));

carregar();

async function menu() {
  console.log("\\n=== CADASTRO DE CLIENTES ===");
  console.log("1. Cadastrar | 2. Buscar | 3. Listar");
  console.log("4. Atualizar telefone | 5. Remover | 0. Sair");

  const op = await ask("Opção: ");

  switch(op.trim()) {
    case "1":
      const nome = await ask("Nome: ");
      const email = await ask("Email: ");
      const tel = await ask("Telefone: ");
      cadastrar(nome, email, tel);
      break;
    case "2":
      const busca = await ask("Nome para buscar: ");
      const encontrado = buscarPorNome(busca);
      console.log(encontrado ? JSON.stringify(encontrado, null, 2) : "Não encontrado.");
      break;
    case "3": listarTodos(); break;
    case "4":
      const n = await ask("Nome: ");
      const t = await ask("Novo telefone: ");
      atualizarTelefone(n, t);
      break;
    case "5":
      const rem = await ask("Nome para remover: ");
      removerCliente(rem);
      break;
    case "0":
      salvar();
      rl.close();
      return;
    default: console.log("Opção inválida.");
  }
  menu();
}

menu();`,
      dica_tutor:
        "Use op.trim() para remover espaços do input. Chame carregar() antes do menu e salvar() ao sair. A função menu() se chama recursivamente.",
      ordem: 5,
    },

    // ===== PROJETO 3 — Jogo de Adivinhação Avançado =====
    {
      projeto_id: projMap["Jogo de Adivinhação Avançado"],
      numero: 1,
      titulo: "Etapa 1 — Lógica básica",
      descricao: `Crie jogo.js com a lógica principal:

const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise(r => rl.question(q, r));

const sortearNumero = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

async function jogarRodada(min, max, maxTentativas) {
  const secreto = sortearNumero(min, max);
  let tentativas = 0;

  while (tentativas < maxTentativas) {
    const palpite = parseInt(await ask(\`Tentativa \${tentativas+1}/\${maxTentativas}: \`));
    tentativas++;

    if (palpite === secreto) {
      console.log(\`🎉 Acertou em \${tentativas} tentativa(s)!\`);
      return tentativas;
    }
    console.log(palpite > secreto ? "📈 Alto demais!" : "📉 Baixo demais!");
  }

  console.log(\`😞 Fim! O número era \${secreto}\`);
  return -1;
}

jogarRodada(1, 100, 7).then(r => { console.log("Resultado:", r); rl.close(); });`,
      dica_tutor:
        "Math.floor(Math.random() * (max - min + 1)) + min gera número aleatório inclusivo entre min e max. parseInt() converte string para inteiro. A função retorna tentativas usadas ou -1 se perdeu.",
      ordem: 1,
    },
    {
      projeto_id: projMap["Jogo de Adivinhação Avançado"],
      numero: 2,
      titulo: "Etapa 2 — Pontuação e dificuldades",
      descricao: `Adicione pontuação e níveis:

const calcularPontos = (tentativas, maxTentativas, dificuldade) => {
  if (tentativas === -1) return 0;
  const fatores = { facil: 1, medio: 2, dificil: 3 };
  return (maxTentativas - tentativas + 1) * 100 * (fatores[dificuldade] || 1);
};

async function definirDificuldade() {
  console.log("\\n1. Fácil (1-50, 10 tent.) | 2. Médio (1-100, 7 tent.) | 3. Difícil (1-200, 5 tent.)");
  const op = await ask("Dificuldade: ");
  const configs = {
    "1": { min:1, max:50, tent:10, nome:"facil" },
    "2": { min:1, max:100, tent:7, nome:"medio" },
    "3": { min:1, max:200, tent:5, nome:"dificil" }
  };
  return configs[op] || configs["2"];
}

const config = await definirDificuldade();
const tent = await jogarRodada(config.min, config.max, config.tent);
const pts = calcularPontos(tent, config.tent, config.nome);
console.log(\`⭐ Pontuação: \${pts} pontos\`);`,
      dica_tutor:
        "Use objeto como mapa de configurações em vez de if/else. calcularPontos com fator de dificuldade: mais difícil = mais pontos. fatores[dificuldade] || 1 usa 1 como fallback.",
      ordem: 2,
    },
    {
      projeto_id: projMap["Jogo de Adivinhação Avançado"],
      numero: 3,
      titulo: "Etapa 3 — Ranking",
      descricao: `Adicione sistema de ranking com persistência:

const fs = require("fs");
const RANKING_FILE = "ranking.json";

const carregarRanking = () => {
  try { return JSON.parse(fs.readFileSync(RANKING_FILE, "utf-8")); }
  catch { return {}; }
};

const salvarRanking = (ranking) =>
  fs.writeFileSync(RANKING_FILE, JSON.stringify(ranking, null, 2));

const atualizarRanking = (nome, pontos) => {
  const ranking = carregarRanking();
  ranking[nome] = (ranking[nome] || 0) + pontos;
  salvarRanking(ranking);
};

const exibirRanking = () => {
  const ranking = carregarRanking();
  const top5 = Object.entries(ranking)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  if (top5.length === 0) return console.log("Ranking vazio.");
  console.log("\\n🏆 TOP 5:");
  top5.forEach(([nome, pts], i) =>
    console.log(\`\${i+1}º \${nome.padEnd(20)} \${pts} pts\`)
  );
};`,
      dica_tutor:
        "Object.entries() converte objeto em array de [chave, valor]. sort(([,a], [,b]) => b - a) desestrutura ignorando a chave e ordena pelo valor decrescente. padEnd(20) alinha texto.",
      ordem: 3,
    },
    {
      projeto_id: projMap["Jogo de Adivinhação Avançado"],
      numero: 4,
      titulo: "Etapa 4 — Jogo completo com menu",
      descricao: `Une tudo:

async function jogoCompleto() {
  const nome = await ask("Seu nome: ");

  while (true) {
    console.log("\\n1. Jogar | 2. Ver ranking | 0. Sair");
    const op = await ask("Opção: ");

    if (op === "0") { rl.close(); break; }
    if (op === "2") { exibirRanking(); continue; }
    if (op !== "1") { console.log("Opção inválida."); continue; }

    const config = await definirDificuldade();
    const tentativas = await jogarRodada(config.min, config.max, config.tent);
    const pontos = calcularPontos(tentativas, config.tent, config.nome);

    if (pontos > 0) {
      atualizarRanking(nome, pontos);
      console.log(\`+\${pontos} pts adicionados ao seu ranking!\`);
    }
    exibirRanking();

    const jogarNovamente = await ask("Jogar novamente? (s/n): ");
    if (jogarNovamente.toLowerCase() !== "s") { rl.close(); break; }
  }
}

jogoCompleto();`,
      dica_tutor:
        "Use while(true) com break para o loop principal. continue pula para a próxima iteração. toLowerCase() normaliza a resposta s/n.",
      ordem: 4,
    },
    {
      projeto_id: projMap["Jogo de Adivinhação Avançado"],
      numero: 5,
      titulo: "Etapa 5 — Refatoração com módulos",
      descricao: `Separe o código em módulos:

// utils.js
export const sortear = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
export const ask = (rl, q) => new Promise(r => rl.question(q, r));

// pontuacao.js
export const calcularPontos = (tentativas, max, dificuldade) => { ... };
export const DIFICULDADES = { "1": {...}, "2": {...}, "3": {...} };

// ranking.js
export const carregarRanking = () => { ... };
export const salvarRanking = (r) => { ... };
export const atualizarRanking = (nome, pts) => { ... };
export const exibirRanking = () => { ... };

// jogo.js
export async function jogarRodada(rl, min, max, maxTent) { ... }

// index.js (principal)
import { ask } from "./utils.js";
import { DIFICULDADES, calcularPontos } from "./pontuacao.js";
import { atualizarRanking, exibirRanking } from "./ranking.js";
import { jogarRodada } from "./jogo.js";

Execute com: node --experimental-vm-modules index.js
Ou use package.json com "type": "module"`,
      dica_tutor:
        'Para usar ES Modules no Node.js, adicione "type": "module" no package.json. Cada módulo tem responsabilidade única: utils para helpers, pontuacao para cálculos, ranking para persistência, jogo para lógica.',
      ordem: 5,
    },

    // ===== PROJETO 4 — Gerenciador de Tarefas =====
    {
      projeto_id: projMap["Gerenciador de Tarefas"],
      numero: 1,
      titulo: "Etapa 1 — Estrutura da tarefa",
      descricao: `Crie tarefas.js com estrutura base:

let proximoId = 1;
const tarefas = [];

const criarTarefa = (titulo, descricao, prioridade, categoria) => {
  const prioridades = ["alta", "media", "baixa"];
  return {
    id: proximoId++,
    titulo,
    descricao,
    prioridade: prioridades.includes(prioridade) ? prioridade : "media",
    categoria,
    status: "pendente",
    dataCriacao: new Date().toLocaleDateString("pt-BR")
  };
};

const t1 = criarTarefa("Estudar JS", "Módulo de funções", "alta", "estudos");
const t2 = criarTarefa("Comprar leite", "Mercado", "baixa", "pessoal");
console.log(t1);
console.log(t2);`,
      dica_tutor:
        'let proximoId fora da função mantém estado entre chamadas. includes() verifica se prioridade é válida. new Date().toLocaleDateString("pt-BR") formata data no padrão brasileiro.',
      ordem: 1,
    },
    {
      projeto_id: projMap["Gerenciador de Tarefas"],
      numero: 2,
      titulo: "Etapa 2 — Operações CRUD",
      descricao: `Adicione operações básicas:

const adicionar = (titulo, desc, prior, cat) => {
  const tarefa = criarTarefa(titulo, desc, prior, cat);
  tarefas.push(tarefa);
  console.log(\`✅ Tarefa #\${tarefa.id}: \${titulo}\`);
  return tarefa;
};

const buscarPorId = (id) => tarefas.find(t => t.id === id);

const concluir = (id) => {
  const t = buscarPorId(id);
  if (!t) return console.log(\`❌ Tarefa #\${id} não encontrada.\`);
  t.status = "concluida";
  console.log(\`✅ Tarefa #\${id} concluída!\`);
};

const listar = () => {
  if (!tarefas.length) return console.log("Nenhuma tarefa.");
  const icones = { alta:"🔴", media:"🟡", baixa:"🟢" };
  tarefas.forEach(t =>
    console.log(\`[#\${t.id}] \${icones[t.prioridade]} \${t.titulo} | \${t.status}\`)
  );
};`,
      dica_tutor:
        'find() retorna referência ao objeto — t.status = "concluida" modifica a tarefa no array. Objeto icones como mapa evita if/else para cada prioridade.',
      ordem: 2,
    },
    {
      projeto_id: projMap["Gerenciador de Tarefas"],
      numero: 3,
      titulo: "Etapa 3 — Filtros e ordenação",
      descricao: `Adicione filtros funcionais:

const filtrarPorPrioridade = (p) => tarefas.filter(t => t.prioridade === p);
const filtrarPorCategoria = (c) => tarefas.filter(t => t.categoria.toLowerCase() === c.toLowerCase());
const filtrarPorStatus = (s) => tarefas.filter(t => t.status === s);

const ordenarPorPrioridade = () => {
  const ordem = { alta:0, media:1, baixa:2 };
  return [...tarefas].sort((a,b) => ordem[a.prioridade] - ordem[b.prioridade]);
};

const relatorio = () => {
  const total = tarefas.length;
  const concluidas = tarefas.filter(t => t.status === "concluida").length;
  const cats = tarefas.reduce((acc, t) => {
    acc[t.categoria] = (acc[t.categoria] || 0) + 1;
    return acc;
  }, {});

  console.log(\`\\n📊 Total: \${total} | ✅ \${concluidas} | ⏳ \${total-concluidas}\`);
  console.log("Categorias:", JSON.stringify(cats));
};`,
      dica_tutor:
        "[...tarefas] cria cópia antes de ordenar — sort() modifica o array original. reduce() com objeto acumulador conta por categoria.",
      ordem: 3,
    },
    {
      projeto_id: projMap["Gerenciador de Tarefas"],
      numero: 4,
      titulo: "Etapa 4 — Persistência JSON",
      descricao: `Adicione persistência:

const fs = require("fs");
const ARQUIVO = "tarefas.json";

const salvar = () => {
  const dados = { proximoId, tarefas };
  fs.writeFileSync(ARQUIVO, JSON.stringify(dados, null, 2));
  console.log(\`💾 \${tarefas.length} tarefa(s) salva(s).\`);
};

const carregar = () => {
  try {
    const dados = JSON.parse(fs.readFileSync(ARQUIVO, "utf-8"));
    proximoId = dados.proximoId;
    tarefas.push(...dados.tarefas);
    console.log(\`📂 \${tarefas.length} tarefa(s) carregada(s).\`);
  } catch {
    console.log("📂 Iniciando sem dados anteriores.");
  }
};`,
      dica_tutor:
        "Salve também proximoId para que os IDs continuem de onde pararam. push(...dados.tarefas) adiciona todos os itens.",
      ordem: 4,
    },
    {
      projeto_id: projMap["Gerenciador de Tarefas"],
      numero: 5,
      titulo: "Etapa 5 — Menu completo",
      descricao: `Menu interativo completo com readline:

async function menu() {
  carregar();
  const rl = readline.createInterface({ input:process.stdin, output:process.stdout });
  const ask = q => new Promise(r => rl.question(q, r));

  while (true) {
    console.log("\\n=== GERENCIADOR DE TAREFAS ===");
    console.log("1.Adicionar 2.Listar 3.Concluir 4.Filtrar 5.Relatório 0.Sair");
    const op = await ask("Opção: ");

    switch(op.trim()) {
      case "1":
        const titulo = await ask("Título: ");
        const desc = await ask("Descrição: ");
        const prior = await ask("Prioridade (alta/media/baixa): ");
        const cat = await ask("Categoria: ");
        adicionar(titulo, desc, prior, cat);
        break;
      case "2": listar(); break;
      case "3":
        const id = parseInt(await ask("ID da tarefa: "));
        concluir(id);
        break;
      case "4":
        console.log("1.Prioridade 2.Categoria 3.Status 4.Ordenar");
        const filtro = await ask("Filtro: ");
        break;
      case "5": relatorio(); break;
      case "0":
        salvar();
        rl.close();
        return;
    }
  }
}

menu();`,
      dica_tutor:
        "Chame carregar() antes do loop principal. Na opção 0, salve antes de fechar. O submenu de filtros pode ser implementado como função separada.",
      ordem: 5,
    },

    // ===== PROJETO 5 — Sistema de Notas Escolares =====
    {
      projeto_id: projMap["Sistema de Notas Escolares"],
      numero: 1,
      titulo: "Etapa 1 — Classe Aluno",
      descricao: `Crie escola.js com a classe Aluno:

class Aluno {
  static #contador = 0;

  constructor(nome) {
    Aluno.#contador++;
    this.nome = nome;
    this.matricula = \`2026\${String(Aluno.#contador).padStart(4, "0")}\`;
    this.notas = {};
  }

  adicionarNota(disciplina, nota) {
    if (nota < 0 || nota > 10) throw new Error("Nota deve ser entre 0 e 10");
    if (!this.notas[disciplina]) this.notas[disciplina] = [];
    this.notas[disciplina].push(nota);
  }

  mediaDisciplina(disciplina) {
    const notas = this.notas[disciplina];
    if (!notas || notas.length === 0) return 0;
    return notas.reduce((s, n) => s + n, 0) / notas.length;
  }

  mediaGeral() {
    const disciplinas = Object.keys(this.notas);
    if (!disciplinas.length) return 0;
    return disciplinas.reduce((s, d) => s + this.mediaDisciplina(d), 0) / disciplinas.length;
  }

  toString() { return \`[\${this.matricula}] \${this.nome}\`; }
}

const ana = new Aluno("Ana Silva");
ana.adicionarNota("Matematica", 8.0);
ana.adicionarNota("Matematica", 7.5);
console.log(ana.mediaDisciplina("Matematica")); // 7.75
console.log(ana.mediaGeral());                  // 7.75`,
      dica_tutor:
        'static #contador é privado e compartilhado entre instâncias. padStart(4, "0") preenche com zeros: 1 → "0001". this.notas[disciplina] = this.notas[disciplina] || [] cria array se não existir.',
      ordem: 1,
    },
    {
      projeto_id: projMap["Sistema de Notas Escolares"],
      numero: 2,
      titulo: "Etapa 2 — Classe Turma",
      descricao: `Adicione a classe Turma:

class Turma {
  constructor(nome, ano) {
    this.nome = nome;
    this.ano = ano;
    this.alunos = [];
  }

  matricular(aluno) {
    const jaMatriculado = this.alunos.some(a => a.matricula === aluno.matricula);
    if (jaMatriculado) return console.log(\`\${aluno.nome} já está matriculado.\`);
    this.alunos.push(aluno);
    console.log(\`✅ \${aluno.nome} matriculado em \${this.nome}\`);
  }

  buscarAluno(nome) {
    return this.alunos.find(a => a.nome.toLowerCase().includes(nome.toLowerCase()));
  }

  listarAlunos() {
    if (!this.alunos.length) return console.log("Turma vazia.");
    this.alunos.forEach(a => console.log(\`\${a} | Média: \${a.mediaGeral().toFixed(2)}\`));
  }

  mediaTurma() {
    if (!this.alunos.length) return 0;
    return this.alunos.reduce((s, a) => s + a.mediaGeral(), 0) / this.alunos.length;
  }

  toString() { return \`Turma \${this.nome} (\${this.ano}) — \${this.alunos.length} aluno(s)\`; }
}

const turma = new Turma("JS 101", 2026);
const ana = new Aluno("Ana");
turma.matricular(ana);
turma.matricular(ana); // já matriculado
console.log(turma.toString());`,
      dica_tutor:
        "some() retorna true se qualquer elemento satisfaz a condição. find() com includes() permite busca parcial case insensitive.",
      ordem: 2,
    },
    {
      projeto_id: projMap["Sistema de Notas Escolares"],
      numero: 3,
      titulo: "Etapa 3 — Boletim",
      descricao: `Adicione função de boletim:

const DISCIPLINAS = ["Matematica", "Portugues", "Ciencias", "Historia", "Ingles"];

function gerarBoletim(aluno) {
  const media = aluno.mediaGeral();
  const situacao = media >= 7 ? "✅ Aprovado" : media >= 4 ? "⚠️ Recuperação" : "❌ Reprovado";

  console.log("╔══════════════════════════════════╗");
  console.log("║         BOLETIM ESCOLAR          ║");
  console.log("╠══════════════════════════════════╣");
  console.log(\`║ Aluno:     \${aluno.nome.padEnd(22)}║\`);
  console.log(\`║ Matrícula: \${aluno.matricula.padEnd(22)}║\`);
  console.log("╠══════════════════════════════════╣");

  DISCIPLINAS.forEach(d => {
    const med = aluno.mediaDisciplina(d).toFixed(2);
    console.log(\`║ \${d.padEnd(14)} Média: \${med.padStart(5)}          ║\`);
  });

  console.log("╠══════════════════════════════════╣");
  console.log(\`║ Média Geral: \${media.toFixed(2).padStart(5)}                ║\`);
  console.log(\`║ Situação: \${situacao.padEnd(23)}║\`);
  console.log("╚══════════════════════════════════╝");
}

const ana = new Aluno("Ana Silva");
DISCIPLINAS.forEach(d => ana.adicionarNota(d, Math.random() * 4 + 6));
gerarBoletim(ana);`,
      dica_tutor:
        "padEnd(n) preenche com espaços à direita. padStart(n) preenche à esquerda. Ternário aninhado para situação: media >= 7 ? aprovado : media >= 4 ? recuperação : reprovado.",
      ordem: 3,
    },
    {
      projeto_id: projMap["Sistema de Notas Escolares"],
      numero: 4,
      titulo: "Etapa 4 — Ranking e estatísticas",
      descricao: `Adicione ranking e estatísticas da turma:

function ranking(turma) {
  const ordenados = [...turma.alunos]
    .sort((a, b) => b.mediaGeral() - a.mediaGeral());

  console.log(\`\\n🏆 RANKING — \${turma.nome}\`);
  ordenados.forEach((a, i) => {
    const medalha = ["🥇","🥈","🥉"][i] || \`\${i+1}º\`;
    console.log(\`\${medalha} \${a.nome.padEnd(20)} \${a.mediaGeral().toFixed(2)}\`);
  });
}

function estatisticasTurma(turma) {
  const medias = turma.alunos.map(a => a.mediaGeral());
  const aprovados = medias.filter(m => m >= 7).length;
  const reprovados = medias.filter(m => m < 4).length;
  const recuperacao = medias.length - aprovados - reprovados;

  console.log(\`\\n📊 ESTATÍSTICAS — \${turma.nome}\`);
  console.log(\`Total: \${turma.alunos.length}\`);
  console.log(\`✅ Aprovados: \${aprovados}\`);
  console.log(\`⚠️  Recuperação: \${recuperacao}\`);
  console.log(\`❌ Reprovados: \${reprovados}\`);
  console.log(\`📈 Média da turma: \${turma.mediaTurma().toFixed(2)}\`);
}

ranking(turma);
estatisticasTurma(turma);`,
      dica_tutor:
        "[...turma.alunos] cria cópia do array antes de ordenar. ['🥇','🥈','🥉'][i] || fallback usa array de medalhas. filter().length conta elementos que satisfazem a condição.",
      ordem: 4,
    },
    {
      projeto_id: projMap["Sistema de Notas Escolares"],
      numero: 5,
      titulo: "Etapa 5 — Sistema completo",
      descricao: `Menu interativo completo:

const turma = new Turma("JavaScript 101", 2026);
["Ana Silva", "João Costa", "Maria Souza"].forEach(nome => {
  const aluno = new Aluno(nome);
  DISCIPLINAS.forEach(d => aluno.adicionarNota(d, Math.random() * 5 + 5));
  turma.matricular(aluno);
});

async function menu() {
  while (true) {
    console.log("\\n=== SISTEMA ESCOLAR ===");
    console.log("1.Matricular | 2.Lançar nota | 3.Boletim");
    console.log("4.Listar turma | 5.Ranking | 6.Estatísticas | 0.Sair");

    const op = await ask("Opção: ");
    switch(op.trim()) {
      case "1":
        const nome = await ask("Nome do aluno: ");
        turma.matricular(new Aluno(nome));
        break;
      case "2":
        const nomeAluno = await ask("Nome do aluno: ");
        const aluno = turma.buscarAluno(nomeAluno);
        if (!aluno) { console.log("Não encontrado."); break; }
        console.log(\`Disciplinas: \${DISCIPLINAS.join(", ")}\`);
        const disc = await ask("Disciplina: ");
        const nota = parseFloat(await ask("Nota (0-10): "));
        try { aluno.adicionarNota(disc, nota); console.log("✅ Nota lançada!"); }
        catch(e) { console.log("❌", e.message); }
        break;
      case "3":
        const nomeBol = await ask("Nome do aluno: ");
        const alunoBol = turma.buscarAluno(nomeBol);
        alunoBol ? gerarBoletim(alunoBol) : console.log("Não encontrado.");
        break;
      case "4": turma.listarAlunos(); break;
      case "5": ranking(turma); break;
      case "6": estatisticasTurma(turma); break;
      case "0": rl.close(); return;
    }
  }
}

menu();`,
      dica_tutor:
        "try/catch ao lançar nota captura o Error de nota inválida. Math.random() * 5 + 5 gera nota entre 5 e 10 para demonstração. buscarAluno() com includes() permite busca parcial.",
      ordem: 5,
    },
  ];

  const { error: etapasErr } = await supabase.from("etapas_projeto").insert(etapas);
  if (etapasErr) {
    console.error("Erro ao inserir etapas:", etapasErr.message);
    process.exit(1);
  }
  console.log(`✅ ${etapas.length} etapas inseridas!`);

  // Confirm
  const { data: confirm } = await supabase
    .from("projetos")
    .select("titulo, linguagem, ordem")
    .eq("linguagem", "JavaScript")
    .order("ordem");

  console.log("\n📋 Projetos JavaScript:");
  for (const p of confirm) {
    console.log(`  ${p.ordem}. ${p.titulo} (${p.linguagem})`);
  }

  const { data: confirmEtapas } = await supabase
    .from("etapas_projeto")
    .select("id, projeto_id")
    .in(
      "projeto_id",
      confirm.map((p) => p.id)
    );

  console.log(`\n📊 Total de etapas: ${confirmEtapas.length}`);
}

main().catch(console.error);
