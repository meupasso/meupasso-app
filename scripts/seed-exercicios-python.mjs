import fs from "fs";
import { createClient } from "@supabase/supabase-js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Read .env.local
const envRaw = fs.readFileSync(path.join(__dirname, "..", ".env.local"), "utf-8");
const env = {};
envRaw.split("\n").forEach((line) => {
  const t = line.trim();
  if (!t || t.startsWith("#")) return;
  const idx = t.indexOf("=");
  if (idx === -1) return;
  env[t.slice(0, idx).trim()] = t.slice(idx + 1).trim();
});

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY
);

// Seções e módulos
const secoes = [
  // Sintaxe básica
  { inicio: "PYB001", fim: "PYB010", modulo: "Sintaxe", nivel: "basico" },
  // Controle de fluxo
  { inicio: "PYI001", fim: "PYI015", modulo: "Condicionais", nivel: "intermediario" },
  // Laços de repetição
  { inicio: "PYI016", fim: "PYI028", modulo: "Repetição", nivel: "intermediario" },
  // Desafios
  { inicio: "PYD001", fim: "PYD005", modulo: "Repetição", nivel: "avancado" },
  // Temáticos - Variáveis
  { inicio: "PYT001", fim: "PYT005", modulo: "Sintaxe", nivel: "basico" },
  // Temáticos - Condicionais
  { inicio: "PYT006", fim: "PYT010", modulo: "Condicionais", nivel: "basico" },
  // Temáticos - Repetição
  { inicio: "PYT011", fim: "PYT015", modulo: "Repetição", nivel: "basico" },
  // Temáticos - Listas
  { inicio: "PYT016", fim: "PYT020", modulo: "Listas", nivel: "basico" },
  // Listas - Básicos
  { inicio: "PYL001", fim: "PYL011", modulo: "Listas", nivel: "basico" },
  // Funções - Básicos
  { inicio: "PYF001", fim: "PYF010", modulo: "Funções", nivel: "basico" },
  // Funções - Avançados
  { inicio: "PYF011", fim: "PYF020", modulo: "Funções", nivel: "avancado" },
  // Coleções - Dicionários
  { inicio: "PYC001", fim: "PYC010", modulo: "Coleções", nivel: "basico" },
  // Coleções - Tuplas
  { inicio: "PYC011", fim: "PYC020", modulo: "Coleções", nivel: "basico" },
  // Coleções - Sets
  { inicio: "PYC021", fim: "PYC030", modulo: "Coleções", nivel: "basico" },
  // Arquivos
  { inicio: "PYA001", fim: "PYA015", modulo: "Arquivos", nivel: "intermediario" },
  // POO - Básicos
  { inicio: "POO001", fim: "POO010", modulo: "POO", nivel: "basico" },
  // POO - Métodos
  { inicio: "POOM01", fim: "POOM10", modulo: "POO", nivel: "intermediario" },
  // POO - Encapsulamento
  { inicio: "POOE01", fim: "POOE10", modulo: "POO", nivel: "intermediario" },
  // POO - Herança
  { inicio: "POOH01", fim: "POOH10", modulo: "POO", nivel: "intermediario" },
  // POO - Polimorfismo
  { inicio: "POOP01", fim: "POOP10", modulo: "POO", nivel: "intermediario" },
  // Complementos
  { inicio: "PYCOMP01", fim: "PYCOMP30", modulo: "POO", nivel: "avancado" },
];

// Mapa: prefixo do código -> módulo e nível
function getModuloNivel(codigo) {
  for (const secao of secoes) {
    if (codigo >= secao.inicio && codigo <= secao.fim) {
      return { modulo: secao.modulo, nivel: secao.nivel };
    }
  }
  return null;
}

function extrairExercicios(md) {
  const linhas = md.split("\n");
  const exercicios = [];
  let i = 0;

  // Ignorar até encontrar o primeiro exercício
  while (i < linhas.length) {
    const linha = linhas[i];
    // Procura por padrão [CODIGO]
    const match = linha.match(/-\s+\[([A-Z]{2,6}\d{2,3})\]\s+(.+)/);
    if (match) {
      const codigo = match[1];
      const titulo = match[2].trim();
      const secao = getModuloNivel(codigo);
      if (!secao) {
        i++;
        continue;
      }

      let descricao = "";
      let descLines = [];
      let j = i + 1;
      // Pular linhas de notas tipo <aside>, Dica:, etc.
      // A descrição é o texto do enunciado antes do <aside> ou solução
      while (j < linhas.length) {
        const l = linhas[j].trim();
        if (l.startsWith("<aside") || l.startsWith("```") || l.match(/^[-*]\s+\[/)) break;
        if (l && !l.startsWith("*Dica") && !l.startsWith("- **")) {
          descLines.push(linhas[j]);
        }
        j++;
      }
      descricao = descLines.join(" ").trim();

      // Pegar exemplos do bloco de código (se houver)
      let exemplos = "";
      let inCode = false;
      let codeLines = [];
      for (let k = i; k < Math.min(i + 50, linhas.length); k++) {
        const l = linhas[k].trim();
        if (l.startsWith("```python")) {
          inCode = true;
          continue;
        }
        if (inCode && l.startsWith("```")) {
          inCode = false;
          codeLines.push(""); // separator
          continue;
        }
        if (inCode) {
          codeLines.push(l);
        }
      }

      // Filtrar linhas de código vazias no início/fim
      const codigoLimpo = codeLines.join("\n").trim();
      if (codigoLimpo) {
        exemplos = codigoLimpo;
      }

      exercicios.push({
        id_referencia: codigo,
        titulo,
        linguagem: "Python",
        modulo: secao.modulo,
        nivel: secao.nivel,
        descricao: descricao || titulo,
        objetivo: `Resolver o exercício ${codigo}: ${titulo}`,
        permitidos: [],
        proibidos: [],
        erros_comuns: [],
        exemplos: exemplos || null,
      });
    }
    i++;
  }

  return exercicios;
}

async function main() {
  const mdPath = path.join(__dirname, "..", "exercicios-python.md");
  const md = fs.readFileSync(mdPath, "utf-8");

  console.log("Extraindo exercícios...");
  const todos = extrairExercicios(md);
  console.log(`Total extraídos: ${todos.length}`);

  // Limpar exercícios Python existentes
  const { error: delErr } = await supabase
    .from("exercicios")
    .delete()
    .eq("linguagem", "Python");

  if (delErr) {
    console.error("Erro ao limpar:", delErr.message);
    return;
  }
  console.log("Tabela limpa (linguagem = Python).");

  // Inserir em lotes de 20
  const lote = 20;
  let total = 0;
  for (let i = 0; i < todos.length; i += lote) {
    const batch = todos.slice(i, i + lote);
    const { data, error } = await supabase
      .from("exercicios")
      .insert(batch)
      .select("id");

    if (error) {
      console.error(`Erro no lote ${Math.floor(i / lote) + 1}:`, error.message);
      continue;
    }
    total += data?.length || 0;
    console.log(`Inserindo lote ${Math.floor(i / lote) + 1}... ✅ ${data?.length || 0} exercícios inseridos`);
  }

  console.log(`\n🎉 Total: ${total} exercícios inseridos!`);
}

main().catch(console.error);
