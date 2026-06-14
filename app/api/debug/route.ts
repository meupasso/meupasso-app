import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = createServiceClient();
  
  // Count all
  const { count, error } = await supabase
    .from("vagas")
    .select("*", { count: "exact", head: true });

  // Fetch actual data  
  const { data } = await supabase
    .from("vagas")
    .select("*")
    .order("publicada_em", { ascending: false, nullsFirst: false })
    .limit(5);

  return NextResponse.json({
    env_url: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 35),
    env_key_20: (process.env.SUPABASE_SERVICE_ROLE_KEY || "").substring(0, 25),
    count,
    vagas_count: data?.length || 0,
    vagas_tipos: (data || []).map((v: any) => v.tipo),
    keys_match: (process.env.SUPABASE_SERVICE_ROLE_KEY || "").substring(0, 20) === "eyJhbGciOiJIUzI1NiIs",
    error: error?.message || null,
  });
}
