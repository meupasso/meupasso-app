import fs from "fs";
import { createClient } from "@supabase/supabase-js";
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

function parseExercicios(mdPath) {
  const content = fs.readFileSync(mdPath, "utf-8");
  const lines = content.split("\n");
  const exercicios = [];

  let currentModule = "";
  let currentSubmodule = "";

  for (const line of lines) {
    const moduleMatch = line.match(/^## Módulo:\s*(.+)/);
    if (moduleMatch) {
      currentModule = moduleMatch[1].trim();
      continue;
    }

    const subMatch = line.match(/^###\s*(.+)/);
    if (subMatch) {
      currentSubmodule = subMatch[1].trim();
      continue;
    }

    const exMatch = line.match(/^-\s+\[([A-Z]{3}\d+)\]\s+(.+)/);
    if (exMatch) {
      const codigo = exMatch[1];
      const descricao = exMatch[2].trim();

      // Determine module based on code prefix
      let modulo = currentModule;
      if (codigo.startsWith("JAB")) modulo = "Sintaxe";
      else if (codigo.startsWith("JAI")) {
        const num = parseInt(codigo.replace("JAI", ""));
        modulo = num <= 7 ? "Condicionais" : "Repetição";
      }
      else if (codigo.startsWith("JAT")) {
        const num = parseInt(codigo.replace("JAT", ""));
        if (num <= 5) modulo = "Sintaxe";
        else if (num <= 10) modulo = "Condicionais";
        else modulo = "Repetição";
      }
      else if (codigo.startsWith("JAL")) modulo = "ArrayList";
      else if (codigo.startsWith("JAP") || codigo.startsWith("JAD")) modulo = "POO";

      // Determine level
      let nivel = "basico";
      if (codigo.startsWith("JAI") || codigo.startsWith("JAP")) nivel = "intermediario";
      else if (codigo.startsWith("JAD")) nivel = "avancado";

      // Generate short title from description
      const titulo = descricao.length > 60 ? descricao.slice(0, 57) + "…" : descricao;

      // Determine permitidos/proibidos based on module
      let permitidos = [];
      let proibidos = [];
      let erros_comuns = [];

      if (modulo === "Sintaxe") {
        permitidos = ["Scanner", "System.out", "variáveis", "tipos primitivos", "operadores"];
        proibidos = ["arrays", "loops", "condicionais aninhados", "classes"];
        erros_comuns = ["esquecer ponto e vírgula", "não importar Scanner", "digitar errado System.out", "variável não inicializada"];
      } else if (modulo === "Condicionais") {
        permitidos = ["Scanner", "if", "else", "switch", "operadores lógicos", "System.out"];
        proibidos = ["loops", "arrays", "classes"];
        erros_comuns = ["esquecer break no switch", "usar = em vez de ==", "else if sem espaço"];
      } else if (modulo === "Repetição") {
        permitidos = ["Scanner", "for", "while", "do-while", "break", "continue", "System.out"];
        proibidos = ["arrays", "classes", "listas"];
        erros_comuns = ["loop infinito", "esquecer incremento no while", "off-by-one no for"];
      } else if (modulo === "ArrayList") {
        permitidos = ["ArrayList", "for", "for-each", "add", "remove", "get", "Collections", "Scanner"];
        proibidos = ["arrays tradicionais", "herança", "POO avançado"];
        erros_comuns = ["IndexOutOfBoundsException", "esquecer tipo genérico", "usar tipo primitivo em vez de wrapper"];
      } else if (modulo === "POO") {
        permitidos = ["classes", "objetos", "herança", "interfaces", "construtores", "encapsulamento", "ArrayList"];
        proibidos = [];
        erros_comuns = ["NullPointerException", "esquecer super() no construtor", "confundir overload com override"];
      }

      exercicios.push({
        id_referencia: codigo,
        titulo,
        linguagem: "Java",
        modulo,
        nivel,
        descricao,
        objetivo: `Resolver o exercício ${codigo}: ${titulo}`,
        permitidos,
        proibidos,
        erros_comuns,
        exemplos: null,
      });
    }
  }

  return exercicios;
}

async function main() {
  const mdPath = path.join(__dirname, "..", "exercicios-java.md");
  const todos = parseExercicios(mdPath);
  console.log(`Extraídos ${todos.length} exercícios do arquivo.`);

  // Delete existing Java exercises
  const { error: delErr } = await supabase.from("exercicios").delete().eq("linguagem", "Java");
  if (delErr) {
    console.error("Erro ao limpar:", delErr.message);
    return;
  }
  console.log("Tabela limpa (linguagem = Java).");

  // Insert in batches of 20
  const lote = 20;
  let total = 0;
  for (let i = 0; i < todos.length; i += lote) {
    const batch = todos.slice(i, i + lote);
    const { data, error } = await supabase.from("exercicios").insert(batch).select("id");
    if (error) {
      console.error(`Erro no lote ${Math.floor(i / lote) + 1}:`, error.message);
      continue;
    }
    total += data?.length || 0;
    console.log(`Inserindo lote ${Math.floor(i / lote) + 1}... ✅ ${data?.length || 0} exercícios`);
  }

  console.log(`\n🎉 Total: ${total} exercícios de Java inseridos!`);

  // Distribution
  const dist = {};
  for (const ex of todos) {
    dist[ex.modulo] = (dist[ex.modulo] || 0) + 1;
  }
  console.log("\n📦 Distribuição por módulo:");
  for (const [mod, qtd] of Object.entries(dist)) {
    console.log(`  ${mod}: ${qtd}`);
  }
}

main().catch(console.error);
