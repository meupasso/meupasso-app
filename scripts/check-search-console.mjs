// Verifica status de indexacao do sitemap e performance de busca (Search Console API).
// Requer: GOOGLE_SEARCH_CONSOLE_KEY_PATH no .env.local apontando pro JSON da service account
// (ver secrets/google-search-console-key.json, gitignored).
//
// Uso: node scripts/check-search-console.mjs

import { google } from "googleapis";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const keyPath = process.env.GOOGLE_SEARCH_CONSOLE_KEY_PATH || "./secrets/google-search-console-key.json";
const resolvedKeyPath = path.isAbsolute(keyPath) ? keyPath : path.join(__dirname, "..", keyPath);

const SITE_URL = "https://www.meupasso.com.br/";

const key = JSON.parse(readFileSync(resolvedKeyPath, "utf-8"));

const auth = new google.auth.JWT({
  email: key.client_email,
  key: key.private_key,
  scopes: ["https://www.googleapis.com/auth/webmasters"],
});

const webmasters = google.webmasters({ version: "v3", auth });

function fmtDate(d) {
  return d.toISOString().split("T")[0];
}

async function main() {
  console.log(`=== Status do sitemap (${SITE_URL}) ===`);
  const sitemaps = await webmasters.sitemaps.list({ siteUrl: SITE_URL });
  for (const sm of sitemaps.data.sitemap || []) {
    console.log(`\n${sm.path}`);
    console.log(`  ultimo download: ${sm.lastDownloaded || "nunca"}`);
    console.log(`  erros: ${sm.errors ?? "?"}  avisos: ${sm.warnings ?? "?"}`);
    for (const c of sm.contents || []) {
      console.log(`  tipo=${c.type} submetidas=${c.submitted} indexadas=${c.indexed ?? "?"}`);
    }
  }

  const end = new Date();
  const start = new Date(end.getTime() - 28 * 24 * 60 * 60 * 1000);

  console.log(`\n=== Performance de busca — paginas /exercicios/ (${fmtDate(start)} a ${fmtDate(end)}) ===`);
  const analytics = await webmasters.searchanalytics.query({
    siteUrl: SITE_URL,
    requestBody: {
      startDate: fmtDate(start),
      endDate: fmtDate(end),
      dimensions: ["page"],
      dimensionFilterGroups: [
        { filters: [{ dimension: "page", operator: "contains", expression: "/exercicios/" }] },
      ],
      rowLimit: 25,
    },
  });

  const rows = analytics.data.rows || [];
  if (rows.length === 0) {
    console.log("Nenhuma pagina de exercicio apareceu em resultados de busca nesse periodo ainda.");
  } else {
    console.log(`${rows.length} paginas com impressoes/cliques (mostrando ate 25):`);
    for (const r of rows) {
      console.log(`  cliques=${r.clicks} impressoes=${r.impressions} pos.media=${r.position?.toFixed(1)} — ${r.keys[0]}`);
    }
  }

  const totalImpressoes = rows.reduce((s, r) => s + r.impressions, 0);
  const totalCliques = rows.reduce((s, r) => s + r.clicks, 0);
  console.log(`\nTotal: ${rows.length} paginas de exercicio com presenca em busca, ${totalImpressoes} impressoes, ${totalCliques} cliques (ultimos 28 dias).`);
}

main().catch((e) => {
  console.error("ERRO:", e.message);
  if (e.response?.data) console.error(JSON.stringify(e.response.data, null, 2));
  process.exit(1);
});
