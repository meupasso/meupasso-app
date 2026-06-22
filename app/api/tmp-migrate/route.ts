import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: "Env vars not available" }, { status: 500 });
  }

  const projectRef = supabaseUrl.match(/https:\/\/([^.]+)/)?.[1] || "unknown";
  const region = "sa-east-1";
  const results: Record<string, any> = {};

  // Method: Try direct DB connection via pg with service_role JWT as password
  try {
    const { default: pg } = await import("pg");

    // Try session pooler (port 5432) with JWT as password
    const configs = [
      {
        name: "Session pooler (JWT as password)",
        config: {
          host: `aws-0-${region}.pooler.supabase.com`,
          port: 5432,
          database: "postgres",
          user: `postgres.${projectRef}`,
          password: supabaseKey,
          ssl: { rejectUnauthorized: false },
          connectionTimeoutMillis: 8000,
        },
      },
      {
        name: "Transaction pooler (JWT as password)",
        config: {
          host: `aws-0-${region}.pooler.supabase.com`,
          port: 6543,
          database: "postgres",
          user: `postgres.${projectRef}`,
          password: supabaseKey,
          ssl: { rejectUnauthorized: false },
          connectionTimeoutMillis: 8000,
        },
      },
      {
        name: "Direct (JWT as password)",
        config: {
          host: `db.${projectRef}.supabase.co`,
          port: 5432,
          database: "postgres",
          user: "postgres",
          password: supabaseKey,
          ssl: { rejectUnauthorized: false },
          connectionTimeoutMillis: 8000,
        },
      },
    ];

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

    for (const { name, config } of configs) {
      const client = new pg.Client(config);
      try {
        await client.connect();
        const dbResults: Record<string, any>[] = [];
        for (const sql of sqlStatements) {
          try {
            const label = sql.substring(0, 50) + "...";
            await client.query(sql);
            dbResults.push({ sql: label, success: true });
          } catch (e: any) {
            dbResults.push({ sql: sql.substring(0, 50) + "...", error: e.message });
          }
        }
        await client.end();
        results[name] = { connected: true, results: dbResults };
        // If we got here and all succeeded, great!
        const allOk = dbResults.every(r => r.success);
        if (allOk) {
          results.status = "MIGRATION_COMPLETE";
          break;
        }
      } catch (e: any) {
        results[name] = { connected: false, error: e.message };
        try { await client.end(); } catch {}
      }
    }
  } catch (e: any) {
    results.error = e.message;
  }

  return NextResponse.json(results);
}
