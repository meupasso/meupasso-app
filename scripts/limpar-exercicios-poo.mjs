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

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY
);

const deletar = [
  // Métodos especiais
  "PYCOMP01", "PYCOMP02", "PYCOMP03", "PYCOMP04", "PYCOMP05",
  "PYCOMP06", "PYCOMP07", "PYCOMP08", "PYCOMP09", "PYCOMP10",
  // Composição
  "PYCOMP21", "PYCOMP22", "PYCOMP23", "PYCOMP24", "PYCOMP25",
  "PYCOMP26", "PYCOMP27", "PYCOMP28", "PYCOMP29", "PYCOMP30",
  // POO dependentes
  "POO002", "POO004", "POO006", "POO007", "POO010",
  "POOM02", "POOM04", "POOM06", "POOM08",
  "POOE02", "POOE04",
  "POOH04", "POOH05",
  "POOP02", "POOP04", "POOP06", "POOP10",
];

async function main() {
  console.log(`Total para deletar: ${deletar.length} exercícios`);

  let deletados = 0;
  for (const codigo of deletar) {
    const { data, error } = await supabase
      .from("exercicios")
      .delete()
      .eq("id_referencia", codigo)
      .eq("linguagem", "Python")
      .select("id");

    if (error) {
      console.error(`  ❌ ${codigo}: ${error.message}`);
    } else if (data && data.length > 0) {
      deletados++;
      console.log(`  ✅ ${codigo} deletado`);
    } else {
      console.log(`  ⚠️  ${codigo} não encontrado`);
    }
  }

  console.log(`\n🗑️  Total deletados: ${deletados}`);

  // Contagem final
  const { count, error: countErr } = await supabase
    .from("exercicios")
    .select("*", { count: "exact", head: true })
    .eq("linguagem", "Python");

  if (!countErr) {
    console.log(`📊 Total restantes: ${count}`);
  }

  // Distribuição por módulo
  const { data: distribuicao } = await supabase
    .from("exercicios")
    .select("modulo")
    .eq("linguagem", "Python");

  if (distribuicao) {
    const modulos = {};
    for (const ex of distribuicao) {
      modulos[ex.modulo] = (modulos[ex.modulo] || 0) + 1;
    }
    console.log("\n📦 Distribuição por módulo:");
    for (const [modulo, qtd] of Object.entries(modulos).sort((a, b) => a[0].localeCompare(b[0]))) {
      console.log(`  ${modulo}: ${qtd}`);
    }
  }
}

main().catch(console.error);
