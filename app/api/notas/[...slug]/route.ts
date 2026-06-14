import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

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

  // Deleta a nota e todas as subpáginas
  const { error } = await supabase
    .from("notas")
    .delete()
    .eq("usuario_id", user.id)
    .filter("slug", "eq", slug)
    .or(`slug.like.${slug}/%`);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
