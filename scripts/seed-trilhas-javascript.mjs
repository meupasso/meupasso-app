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

const trilhas = [
  {
    slug: "zero-ao-javascript",
    titulo: "Do Zero ao JavaScript",
    descricao:
      "Para quem nunca programou. Aprenda JavaScript do zero com exercícios progressivos.",
    linguagem: "JavaScript",
    perfil: "iniciante",
    tempo_estimado: "6 semanas, 1h por dia",
    ordem: 1,
  },
  {
    slug: "javascript-intermediario",
    titulo: "JavaScript Intermediário",
    descricao:
      "Arrays, funções avançadas, objetos e POO em JavaScript.",
    linguagem: "JavaScript",
    perfil: "intermediario",
    tempo_estimado: "5 semanas, 1h por dia",
    ordem: 2,
  },
  {
    slug: "empregabilidade-javascript",
    titulo: "Trilha Empregabilidade JavaScript",
    descricao:
      "Do zero ao portfólio com projetos reais prontos para o LinkedIn.",
    linguagem: "JavaScript",
    perfil: "objetivo",
    tempo_estimado: "10 semanas, 1h por dia",
    ordem: 3,
  },
];

async function main() {
  // Remover trilhas JS existentes com suas etapas
  const { data: existentes } = await supabase
    .from("trilhas")
    .select("id")
    .eq("linguagem", "JavaScript");

  if (existentes && existentes.length > 0) {
    const ids = existentes.map((t) => t.id);
    await supabase.from("etapas_trilha").delete().in("trilha_id", ids);
    await supabase.from("trilhas").delete().in("id", ids);
  }

  const { data: inseridas, error: insErr } = await supabase
    .from("trilhas")
    .insert(trilhas)
    .select();

  if (insErr) {
    console.error("Erro ao inserir trilhas:", insErr.message);
    process.exit(1);
  }
  console.log(`✅ ${inseridas.length} trilhas inseridas!`);

  const trilhaMap = {};
  for (const t of inseridas) {
    trilhaMap[t.slug] = t.id;
  }

  const etapas = [
    // zero-ao-javascript
    {
      trilha_id: trilhaMap["zero-ao-javascript"],
      tipo: "modulo",
      titulo: "Sintaxe",
      descricao: "Aprenda os fundamentos: variáveis, tipos, operadores, template literals e funções básicas.",
      modulo: "Sintaxe",
      linguagem: "JavaScript",
      ordem: 1,
    },
    {
      trilha_id: trilhaMap["zero-ao-javascript"],
      tipo: "modulo",
      titulo: "Condicionais",
      descricao: "Domine if/else, switch, operador ternário e lógica condicional.",
      modulo: "Condicionais",
      linguagem: "JavaScript",
      ordem: 2,
    },
    {
      trilha_id: trilhaMap["zero-ao-javascript"],
      tipo: "modulo",
      titulo: "Repetição",
      descricao: "Loops for, while e for...of. Controle de fluxo repetitivo.",
      modulo: "Repetição",
      linguagem: "JavaScript",
      ordem: 3,
    },
    {
      trilha_id: trilhaMap["zero-ao-javascript"],
      tipo: "modulo",
      titulo: "Arrays",
      descricao: "Criação, manipulação e métodos de array: push, map, filter, reduce.",
      modulo: "Arrays",
      linguagem: "JavaScript",
      ordem: 4,
    },
    {
      trilha_id: trilhaMap["zero-ao-javascript"],
      tipo: "modulo",
      titulo: "Funções",
      descricao: "Declaração, arrow functions, parâmetros, retorno e closures.",
      modulo: "Funções",
      linguagem: "JavaScript",
      ordem: 5,
    },
    {
      trilha_id: trilhaMap["zero-ao-javascript"],
      tipo: "projeto",
      titulo: "Projeto: Calculadora Financeira",
      descricao: "Aplique funções e lógica em uma calculadora financeira completa.",
      modulo: null,
      linguagem: "JavaScript",
      ordem: 6,
    },

    // javascript-intermediario
    {
      trilha_id: trilhaMap["javascript-intermediario"],
      tipo: "modulo",
      titulo: "Arrays",
      descricao: "Métodos avançados de array: map, filter, reduce, flat, sort.",
      modulo: "Arrays",
      linguagem: "JavaScript",
      ordem: 1,
    },
    {
      trilha_id: trilhaMap["javascript-intermediario"],
      tipo: "modulo",
      titulo: "Funções",
      descricao: "Callbacks, recursão, memoização, currying e composição de funções.",
      modulo: "Funções",
      linguagem: "JavaScript",
      ordem: 2,
    },
    {
      trilha_id: trilhaMap["javascript-intermediario"],
      tipo: "modulo",
      titulo: "Objetos",
      descricao: "Objetos literais, factory functions, destroy, spread, Proxy.",
      modulo: "Objetos",
      linguagem: "JavaScript",
      ordem: 3,
    },
    {
      trilha_id: trilhaMap["javascript-intermediario"],
      tipo: "modulo",
      titulo: "POO",
      descricao: "Classes, herança, encapsulamento, polimorfismo e design patterns.",
      modulo: "POO",
      linguagem: "JavaScript",
      ordem: 4,
    },
    {
      trilha_id: trilhaMap["javascript-intermediario"],
      tipo: "projeto",
      titulo: "Projeto: Gerenciador de Tarefas",
      descricao: "Use objetos e métodos de array em um sistema completo de tarefas.",
      modulo: null,
      linguagem: "JavaScript",
      ordem: 5,
    },
    {
      trilha_id: trilhaMap["javascript-intermediario"],
      tipo: "projeto",
      titulo: "Projeto: Sistema de Notas Escolares",
      descricao: "Aplique POO em um sistema escolar com classes, herança e boletim.",
      modulo: null,
      linguagem: "JavaScript",
      ordem: 6,
    },

    // empregabilidade-javascript
    {
      trilha_id: trilhaMap["empregabilidade-javascript"],
      tipo: "modulo",
      titulo: "Sintaxe",
      descricao: "Fundamentos sólidos de JavaScript moderno.",
      modulo: "Sintaxe",
      linguagem: "JavaScript",
      ordem: 1,
    },
    {
      trilha_id: trilhaMap["empregabilidade-javascript"],
      tipo: "modulo",
      titulo: "Condicionais",
      descricao: "Estruturas condicionais e lógica de tomada de decisão.",
      modulo: "Condicionais",
      linguagem: "JavaScript",
      ordem: 2,
    },
    {
      trilha_id: trilhaMap["empregabilidade-javascript"],
      tipo: "modulo",
      titulo: "Repetição",
      descricao: "Loops e iteração para processar coleções de dados.",
      modulo: "Repetição",
      linguagem: "JavaScript",
      ordem: 3,
    },
    {
      trilha_id: trilhaMap["empregabilidade-javascript"],
      tipo: "modulo",
      titulo: "Arrays",
      descricao: "Métodos funcionais de array para manipulação de dados.",
      modulo: "Arrays",
      linguagem: "JavaScript",
      ordem: 4,
    },
    {
      trilha_id: trilhaMap["empregabilidade-javascript"],
      tipo: "modulo",
      titulo: "Funções",
      descricao: "Funções como cidadãs de primeira classe e programação funcional.",
      modulo: "Funções",
      linguagem: "JavaScript",
      ordem: 5,
    },
    {
      trilha_id: trilhaMap["empregabilidade-javascript"],
      tipo: "modulo",
      titulo: "Objetos",
      descricao: "Programação orientada a objetos com JavaScript moderno.",
      modulo: "Objetos",
      linguagem: "JavaScript",
      ordem: 6,
    },
    {
      trilha_id: trilhaMap["empregabilidade-javascript"],
      tipo: "modulo",
      titulo: "POO",
      descricao: "Classes, herança, encapsulamento e design patterns.",
      modulo: "POO",
      linguagem: "JavaScript",
      ordem: 7,
    },
    {
      trilha_id: trilhaMap["empregabilidade-javascript"],
      tipo: "projeto",
      titulo: "Projeto: Sistema de Cadastro de Clientes",
      descricao: "Sistema CRUD completo com persistência em JSON.",
      modulo: null,
      linguagem: "JavaScript",
      ordem: 8,
    },
    {
      trilha_id: trilhaMap["empregabilidade-javascript"],
      tipo: "projeto",
      titulo: "Projeto: Sistema de Notas Escolares",
      descricao: "Sistema escolar completo com POO, boletim e ranking.",
      modulo: null,
      linguagem: "JavaScript",
      ordem: 9,
    },
  ];

  const { error: etapasErr } = await supabase
    .from("etapas_trilha")
    .insert(etapas);

  if (etapasErr) {
    console.error("Erro ao inserir etapas:", etapasErr.message);
    process.exit(1);
  }
  console.log(`✅ ${etapas.length} etapas de trilha inseridas!`);
  console.log("📊 Distribuição:");
  for (const t of inseridas) {
    const { data: e } = await supabase
      .from("etapas_trilha")
      .select("id")
      .eq("trilha_id", t.id);
    console.log(`  ${t.titulo}: ${e?.length || 0} etapas`);
  }
}

main().catch(console.error);
