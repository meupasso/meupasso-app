import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = createServiceClient();
  
  // Test direct query
  const { data, error, count } = await supabase
    .from("vagas")
    .select("*", { count: "exact", head: true });

  return NextResponse.json({
    env_url: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30),
    env_key_prefix: (process.env.SUPABASE_SERVICE_ROLE_KEY || "").substring(0, 20),
    count,
    error: error?.message || null,
  });
}
