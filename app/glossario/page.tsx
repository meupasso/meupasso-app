import { createClient } from "@/lib/supabase/server";
import GlossarioListClient from "./GlossarioListClient";

export const dynamic = "force-dynamic";

export default async function GlossarioPage() {
  const supabase = createClient();
  const { data: termos } = await supabase
    .from("glossario")
    .select("*")
    .order("termo", { ascending: true });

  return <GlossarioListClient termos={termos || []} />;
}
