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

const MANTER_JAVA = [
  'JAB001','JAB002','JAB003','JAB004','JAB005','JAB006','JAB007','JAB008','JAB009','JAB010',
  'JAI001','JAI002','JAI003','JAI004','JAI005','JAI006','JAI007',
  'JAB011','JAB012','JAB013',
  'JAI008','JAI009','JAI010','JAI011','JAI012','JAI013','JAI014','JAI015','JAI016','JAI017',
  'JAL001','JAL002','JAL003','JAL004','JAL005','JAL006','JAL007','JAL008','JAL009','JAL010',
  'JAP001','JAP002','JAP003','JAP004','JAP005','JAP006','JAP007','JAP008','JAP009','JAP010',
];

const MANTER_PYTHON = [
  'PYB001','PYB002','PYB003','PYB004','PYB005','PYB006','PYB007','PYB008','PYB009','PYB010',
  'PYI001','PYI002','PYI003','PYI004','PYI005','PYI006','PYI007','PYI009','PYI010','PYI011',
  'PYI016','PYI017','PYI018','PYI019','PYI020','PYI021','PYI022','PYI023','PYI024','PYI025',
  'PYL001','PYL002','PYL003','PYL004','PYL005','PYL006','PYL007','PYL008','PYL009','PYL010',
  'PYF001','PYF002','PYF003','PYF004','PYF005','PYF006','PYF007','PYF008','PYF009','PYF010',
  'PYC001','PYC002','PYC003','PYC004','PYC005','PYC006','PYC007','PYC008','PYC009','PYC010',
  'PYA001','PYA002','PYA003','PYA004','PYA005','PYA006','PYA007','PYA008','PYA009','PYA010',
  'POO001','POO003','POO005','POO008','POO009','POOM01','POOM03','POOM05','POOM07','POOM09',
];

async function deletarExceto(linguagem, manter) {
  console.log(`\n🗑️  Limpando ${linguagem}...`);
  const { data: todos } = await supabase
    .from("exercicios")
    .select("id_referencia")
    .eq("linguagem", linguagem);

  if (!todos) return;

  const manterSet = new Set(manter);
  const deletar = todos.filter((ex) => !manterSet.has(ex.id_referencia)).map((ex) => ex.id_referencia);

  console.log(`  Total ${linguagem}: ${todos.length}, para deletar: ${deletar.length}`);

  // Delete in batches
  const lote = 20;
  let deletados = 0;
  for (let i = 0; i < deletar.length; i += lote) {
    const batch = deletar.slice(i, i + lote);
    const { error } = await supabase.from("exercicios").delete().in("id_referencia", batch).eq("linguagem", linguagem);
    if (!error) deletados += batch.length;
    else console.error(`  Erro no lote ${Math.floor(i / lote) + 1}:`, error.message);
  }
  console.log(`  ✅ ${deletados} deletados`);
  return deletados;
}

async function contar(linguagem) {
  const { data } = await supabase.from("exercicios").select("id_referencia, modulo").eq("linguagem", linguagem);
  if (!data) return {};
  const mods = {};
  for (const ex of data) {
    mods[ex.modulo] = (mods[ex.modulo] || 0) + 1;
  }
  console.log(`\n📊 ${linguagem} — ${data.length} total:`);
  for (const [m, q] of Object.entries(mods).sort()) {
    console.log(`  ${m}: ${q}`);
  }
  return mods;
}

async function main() {
  // 1 & 2: Limpar Java
  await deletarExceto("Java", MANTER_JAVA);

  // 3: Atualizar módulo de JAB011-013 para Condicionais
  console.log("\n🔄 Atualizando JAB011-013 para módulo Condicionais...");
  const { error: updateErr } = await supabase
    .from("exercicios")
    .update({ modulo: "Condicionais" })
    .in("id_referencia", ["JAB011", "JAB012", "JAB013"])
    .eq("linguagem", "Java");
  if (updateErr) console.error("  ❌ Erro:", updateErr.message);
  else console.log("  ✅ OK");

  // 4: Limpar Python
  await deletarExceto("Python", MANTER_PYTHON);

  // Contagem final
  await contar("Java");
  await contar("Python");
}

main().catch(console.error);
