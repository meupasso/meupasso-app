import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envRaw = fs.readFileSync(path.join(__dirname, "..", ".env.local"), "utf-8");
const env = {};
envRaw.split("\n").forEach((line) => {
  const t = line.trim(); if (!t || t.startsWith("#")) return;
  const idx = t.indexOf("="); if (idx === -1) return;
  env[t.slice(0, idx).trim()] = t.slice(idx + 1).trim();
});
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

const trilhas = [
  {
    slug: "zero-ao-python", titulo: "Do Zero ao Python",
    descricao: "Para quem nunca programou. Aprenda Python do absoluto zero com exercícios progressivos e projetos práticos.",
    linguagem: "Python", perfil: "iniciante", tempo_estimado: "6 semanas, 1h por dia", ordem: 1,
    etapas: [
      { ordem: 1, tipo: "modulo", titulo: "Sintaxe", descricao: "Aprenda variáveis, tipos de dados, entrada e saída. Os fundamentos de qualquer programa.", modulo: "Sintaxe" },
      { ordem: 2, tipo: "modulo", titulo: "Condicionais", descricao: "Aprenda a tomar decisões no código com if, elif e else.", modulo: "Condicionais" },
      { ordem: 3, tipo: "modulo", titulo: "Repetição", descricao: "Aprenda a repetir ações com for e while. Loops são a base da automação.", modulo: "Repetição" },
      { ordem: 4, tipo: "modulo", titulo: "Listas", descricao: "Aprenda a trabalhar com coleções de dados. Fundamental para qualquer aplicação.", modulo: "Listas" },
      { ordem: 5, tipo: "modulo", titulo: "Funções", descricao: "Aprenda a organizar o código em blocos reutilizáveis.", modulo: "Funções" },
      { ordem: 6, tipo: "projeto", titulo: "Projeto: Calculadora Financeira", descricao: "Coloque em prática tudo que aprendeu construindo uma calculadora financeira completa.", modulo: null },
    ]
  },
  {
    slug: "python-intermediario", titulo: "Python Intermediário",
    descricao: "Para quem já conhece o básico. Aprofunde seus conhecimentos com coleções, arquivos, POO e projetos complexos.",
    linguagem: "Python", perfil: "intermediario", tempo_estimado: "5 semanas, 1h por dia", ordem: 2,
    etapas: [
      { ordem: 1, tipo: "modulo", titulo: "Funções Avançadas", descricao: "Recursão, *args, **kwargs, closures e decoradores.", modulo: "Funções" },
      { ordem: 2, tipo: "modulo", titulo: "Coleções", descricao: "Dicionários, tuplas e sets. Estruturas de dados poderosas do Python.", modulo: "Coleções" },
      { ordem: 3, tipo: "modulo", titulo: "Arquivos", descricao: "Leia e escreva arquivos. Persista dados além da execução do programa.", modulo: "Arquivos" },
      { ordem: 4, tipo: "modulo", titulo: "POO", descricao: "Orientação a Objetos. Classes, herança e polimorfismo.", modulo: "POO" },
      { ordem: 5, tipo: "projeto", titulo: "Projeto: Gerenciador de Tarefas", descricao: "Construa um gerenciador completo aplicando coleções, arquivos e POO.", modulo: null },
      { ordem: 6, tipo: "projeto", titulo: "Projeto: Sistema de Notas Escolares", descricao: "Projeto final integrando todos os conceitos.", modulo: null },
    ]
  },
  {
    slug: "poo-python", titulo: "Foco em POO com Python",
    descricao: "Para quem quer dominar Orientação a Objetos. Do básico de funções até padrões de projeto.",
    linguagem: "Python", perfil: "objetivo", tempo_estimado: "4 semanas, 1h por dia", ordem: 3,
    etapas: [
      { ordem: 1, tipo: "modulo", titulo: "Funções", descricao: "Base para entender POO — funções, retorno e organização do código.", modulo: "Funções" },
      { ordem: 2, tipo: "modulo", titulo: "POO", descricao: "Classes, objetos, encapsulamento, herança e polimorfismo.", modulo: "POO" },
      { ordem: 3, tipo: "projeto", titulo: "Projeto: Sistema de Notas Escolares", descricao: "Aplique POO em um sistema real com múltiplas classes.", modulo: null },
      { ordem: 4, tipo: "projeto", titulo: "Projeto: Sistema de Cadastro de Clientes", descricao: "Projeto avançado com herança, encapsulamento e persistência.", modulo: null },
    ]
  },
  {
    slug: "empregabilidade-python", titulo: "Trilha Empregabilidade",
    descricao: "Para quem quer migrar de área para TI. Do zero ao portfólio com projetos reais prontos para o LinkedIn.",
    linguagem: "Python", perfil: "objetivo", tempo_estimado: "10 semanas, 1h por dia", ordem: 4,
    etapas: [
      { ordem: 1, tipo: "modulo", titulo: "Sintaxe", descricao: "Os fundamentos. Cada exercício é um tijolo da sua carreira.", modulo: "Sintaxe" },
      { ordem: 2, tipo: "modulo", titulo: "Condicionais", descricao: "Lógica de programação na prática.", modulo: "Condicionais" },
      { ordem: 3, tipo: "modulo", titulo: "Repetição", descricao: "Automação começa aqui.", modulo: "Repetição" },
      { ordem: 4, tipo: "modulo", titulo: "Listas", descricao: "Manipulação de dados — muito valorizada no mercado.", modulo: "Listas" },
      { ordem: 5, tipo: "modulo", titulo: "Funções", descricao: "Código organizado — o que separa iniciantes de juniores.", modulo: "Funções" },
      { ordem: 6, tipo: "modulo", titulo: "POO", descricao: "Orientação a Objetos é requisito em praticamente todas as vagas.", modulo: "POO" },
      { ordem: 7, tipo: "projeto", titulo: "Projeto: Calculadora Financeira", descricao: "Primeiro projeto para o portfólio.", modulo: null },
      { ordem: 8, tipo: "projeto", titulo: "Projeto: Sistema de Cadastro de Clientes", descricao: "Demonstra domínio de listas, funções e arquivos.", modulo: null },
      { ordem: 9, tipo: "projeto", titulo: "Projeto: Sistema de Notas Escolares", descricao: "Projeto final com POO — o mais impressionante para recrutadores.", modulo: null },
    ]
  },
  {
    slug: "zero-ao-java", titulo: "Do Zero ao Java",
    descricao: "Para quem nunca programou e quer aprender Java. Linguagem mais usada em empresas brasileiras.",
    linguagem: "Java", perfil: "iniciante", tempo_estimado: "6 semanas, 1h por dia", ordem: 1,
    etapas: [
      { ordem: 1, tipo: "modulo", titulo: "Sintaxe", descricao: "Estrutura do Java, variáveis, tipos e Scanner.", modulo: "Sintaxe" },
      { ordem: 2, tipo: "modulo", titulo: "Condicionais", descricao: "if/else e switch/case. Decisões no código.", modulo: "Condicionais" },
      { ordem: 3, tipo: "modulo", titulo: "Repetição", descricao: "for, while e do-while. Loops em Java.", modulo: "Repetição" },
      { ordem: 4, tipo: "modulo", titulo: "ArrayList", descricao: "Listas dinâmicas — a estrutura mais usada em Java.", modulo: "ArrayList" },
      { ordem: 5, tipo: "modulo", titulo: "POO", descricao: "Classes, objetos e encapsulamento. O coração do Java.", modulo: "POO" },
      { ordem: 6, tipo: "projeto", titulo: "Projeto: Calculadora Financeira", descricao: "Primeiro projeto integrando tudo que aprendeu.", modulo: null },
    ]
  },
  {
    slug: "empregabilidade-java", titulo: "Trilha Empregabilidade Java",
    descricao: "Para quem quer migrar de área usando Java. Linguagem dominante em bancos, fintechs e grandes empresas.",
    linguagem: "Java", perfil: "objetivo", tempo_estimado: "10 semanas, 1h por dia", ordem: 2,
    etapas: [
      { ordem: 1, tipo: "modulo", titulo: "Sintaxe", descricao: "Fundamentos do Java.", modulo: "Sintaxe" },
      { ordem: 2, tipo: "modulo", titulo: "Condicionais", descricao: "Lógica condicional com if/else e switch.", modulo: "Condicionais" },
      { ordem: 3, tipo: "modulo", titulo: "Repetição", descricao: "Loops em Java.", modulo: "Repetição" },
      { ordem: 4, tipo: "modulo", titulo: "ArrayList", descricao: "Coleções dinâmicas — essencial para qualquer app.", modulo: "ArrayList" },
      { ordem: 5, tipo: "modulo", titulo: "POO", descricao: "O DNA do Java. Requisito em todas as vagas.", modulo: "POO" },
      { ordem: 6, tipo: "projeto", titulo: "Projeto: Sistema de Cadastro de Clientes", descricao: "Projeto demonstrando POO e ArrayList.", modulo: null },
      { ordem: 7, tipo: "projeto", titulo: "Projeto: Sistema de Biblioteca", descricao: "Projeto final com herança, encapsulamento e coleções.", modulo: null },
    ]
  },
];

async function main() {
  await supabase.from("etapas_trilha").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("trilhas").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  console.log("🗑️  Tabelas limpas.");

  let total = 0;
  for (const t of trilhas) {
    const { slug, titulo, descricao, linguagem, perfil, tempo_estimado, ordem, etapas } = t;
    const { data: tri, error } = await supabase.from("trilhas").insert({
      slug, titulo, descricao, linguagem, perfil, tempo_estimado, ordem,
    }).select("id").single();
    if (error) { console.error("Erro:", error.message); continue; }
    const { error: e2 } = await supabase.from("etapas_trilha").insert(
      etapas.map(e => ({ ...e, trilha_id: tri.id, linguagem }))
    );
    if (e2) { console.error("Erro etapas:", e2.message); continue; }
    total++;
    console.log(`✅ ${slug} (${etapas.length} etapas)`);
  }
  console.log(`\n🎉 ${total} trilhas inseridas!`);
}
main().catch(console.error);
