import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET() {
  const results: Record<string, any> = {};

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  // Check if env vars are available
  results.envVars = {
    urlAvailable: !!supabaseUrl,
    keyAvailable: !!supabaseKey,
    urlPrefix: supabaseUrl?.substring(0, 35),
    keyPrefix: supabaseKey?.substring(0, 20),
  };

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: "Env vars not available", results });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const projectRef = supabaseUrl.match(/https:\/\/([^.]+)/)?.[1] || "unknown";

  const sqlStatements = [
    `CREATE TABLE IF NOT EXISTS historico_tutor (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      usuario_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
      exercicio_id TEXT NOT NULL,
      linguagem TEXT,
      mensagens JSONB NOT NULL DEFAULT '[]',
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW(),
      UNIQUE(usuario_id, exercicio_id)
    );`,
    `CREATE INDEX IF NOT EXISTS idx_historico_usuario ON historico_tutor(usuario_id);`,
    `CREATE INDEX IF NOT EXISTS idx_historico_exercicio ON historico_tutor(exercicio_id);`,
    `ALTER TABLE users ADD COLUMN IF NOT EXISTS streak_atual INT DEFAULT 0;`,
    `ALTER TABLE users ADD COLUMN IF NOT EXISTS streak_maximo INT DEFAULT 0;`,
    `ALTER TABLE users ADD COLUMN IF NOT EXISTS ultimo_estudo DATE;`,
  ];

  const migrationResults: Record<string, any>[] = [];

  // Method 1: Try calling exec_sql via RPC (if function exists)
  for (const sql of sqlStatements) {
    const label = sql.substring(0, 60) + "...";
    const rpcResult: Record<string, any> = { sql: label, method: "rpc(exec_sql)" };

    try {
      const { data, error } = await supabase.rpc("exec_sql", { sql_text: sql });
      rpcResult.data = data;
      rpcResult.error = error?.message || null;
    } catch (e: any) {
      rpcResult.error = e.message;
    }
    migrationResults.push(rpcResult);
  }

  // Method 2: Try raw REST API call as fallback (auth admin endpoint)
  results.migration = migrationResults;

  // Method 3: Try the management API directly
  try {
    const response = await fetch(`https://api.supabase.com/v1/projects/${projectRef}/database/query`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: "SELECT 1 AS test" }),
    });
    const mgmtData = await response.text();
    results.managementApi = { status: response.status, body: mgmtData.substring(0, 200) };
  } catch (e: any) {
    results.managementApi = { error: e.message };
  }

  // Method 4: Try to use the sql endpoint
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": supabaseKey,
        "Authorization": `Bearer ${supabaseKey}`,
      },
      body: JSON.stringify({ sql_text: "SELECT 1" }),
    });
    const sqlData = await response.text();
    results.rpcEndpoint = { status: response.status, body: sqlData.substring(0, 200) };
  } catch (e: any) {
    results.rpcEndpoint = { error: e.message };
  }

  // Method 5: Try creating the function first via rest
  try {
    const createFuncSql = `
      CREATE OR REPLACE FUNCTION exec_sql(sql_text text) RETURNS void AS $$
      BEGIN
        EXECUTE sql_text;
      END;
      $$ LANGUAGE plpgsql SECURITY DEFINER;
    `;

    // This won't work via REST, but let's try anyway with a direct approach
    const response = await fetch(`${supabaseUrl}/rest/v1/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": supabaseKey,
        "Authorization": `Bearer ${supabaseKey}`,
        "Prefer": "params=single-object",
      },
      body: JSON.stringify({ query: createFuncSql }),
    });
    results.directRest = { status: response.status, text: (await response.text()).substring(0, 200) };
  } catch (e: any) {
    results.directRest = { error: e.message };
  }

  return NextResponse.json(results);
}
