import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const slug = params.slug.join("/");
  if (!slug) {
    return NextResponse.json({ error: "Slug é obrigatório" }, { status: 400 });
  }

  // Usa service client (bypassa RLS); restringe às notas do próprio usuário
  const service = createServiceClient();
  const { error } = await service
    .from("notas")
    .delete()
    .eq("usuario_id", user.id)
    .or(`slug.eq.${slug},slug.like.${slug}/%`);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
