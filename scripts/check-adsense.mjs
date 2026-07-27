// Verifica status de revisao do site no Google AdSense.
// Requer: secrets/adsense-tokens.json (client_id, client_secret, refresh_token da service account OAuth)
//
// Uso: node scripts/check-adsense.mjs

import { google } from "googleapis";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const tokensPath = process.env.GOOGLE_ADSENSE_TOKENS_PATH || "./secrets/adsense-tokens.json";
const resolvedPath = path.isAbsolute(tokensPath) ? tokensPath : path.join(__dirname, "..", tokensPath);

const SITE_DOMAIN = "meupasso.com.br";

const tokens = JSON.parse(readFileSync(resolvedPath, "utf-8"));

const oauth2Client = new google.auth.OAuth2(tokens.client_id, tokens.client_secret);
oauth2Client.setCredentials({ refresh_token: tokens.refresh_token });

const adsense = google.adsense({ version: "v2", auth: oauth2Client });

async function main() {
  const accountsRes = await adsense.accounts.list();
  const account = (accountsRes.data.accounts || [])[0];
  if (!account) throw new Error("Nenhuma conta AdSense encontrada.");

  console.log(`=== Conta: ${account.displayName} (${account.name}) ===`);
  console.log(`Status geral: ${account.state}`);
  if (account.pendingTasks?.length) {
    console.log(`Tarefas pendentes: ${account.pendingTasks.join(", ")}`);
  }

  const sitesRes = await adsense.accounts.sites.list({ parent: account.name });
  const site = (sitesRes.data.sites || []).find((s) => s.domain === SITE_DOMAIN);

  console.log(`\n=== Site: ${SITE_DOMAIN} ===`);
  if (!site) {
    console.log("Site nao encontrado na conta AdSense.");
  } else {
    console.log(`Status: ${site.state}`);
    console.log(`Auto ads: ${site.autoAdsEnabled ? "ativado" : "desativado"}`);
  }

  const alertsRes = await adsense.accounts.alerts.list({ parent: account.name });
  const alerts = alertsRes.data.alerts || [];
  const relevantAlerts = alerts.filter((a) => a.severity !== "INFO");
  console.log(`\n=== Alertas relevantes (${relevantAlerts.length}) ===`);
  for (const a of relevantAlerts) {
    console.log(`[${a.severity}] ${a.message}`);
  }
}

main().catch((e) => {
  console.error("ERRO:", e.message);
  if (e.response?.data) console.error(JSON.stringify(e.response.data, null, 2));
  process.exit(1);
});
