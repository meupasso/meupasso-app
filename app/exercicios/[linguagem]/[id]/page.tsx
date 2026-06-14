import { createClient } from "@/lib/supabase/server";
import ExercicioClient from "./ExercicioClient";

export const dynamic = "force-dynamic";

export default async function ExercicioPage({
  params,
}: {
  params: { linguagem: string; id: string };
}) {
  const supabase = createClient();
  const { data: exercicio } = await supabase
    .from("exercicios")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!exercicio) {
    return (
      <main style={{ padding: "2rem" }}>
        <p style={{ color: "var(--text-secondary)" }}>
          Exercício não encontrado.
        </p>
      </main>
    );
  }

  return <ExercicioClient exercicio={exercicio} />;
}
