import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import ExercicioListClient from "./ExercicioListClient";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { linguagem: string } }): Promise<Metadata> {
  const linguagem = params.linguagem === "javascript" ? "JavaScript" : params.linguagem === "java" ? "Java" : params.linguagem.charAt(0).toUpperCase() + params.linguagem.slice(1);

  const descricoes: Record<string, string> = {
    Python: "Aprenda Python com 230+ exercícios progressivos — do básico ao avançado. Sintaxe, condicionais, loops, listas, funções, POO e mais.",
    Java: "Aprenda Java com 140+ exercícios práticos. Sintaxe, condicionais, repetição, ArrayList e orientação a objetos.",
    JavaScript: "Aprenda JavaScript com 240+ exercícios. Sintaxe, arrays, funções, objetos, POO e módulos.",
  };

  const title = `Exercícios de ${linguagem} para Iniciantes`;
  const description = descricoes[linguagem] || `Exercícios práticos de ${linguagem} para quem está começando a programar.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.meupasso.com.br/exercicios/${params.linguagem}`,
      siteName: "MeuPasso",
      locale: "pt_BR",
      type: "website",
    },
    alternates: {
      canonical: `https://www.meupasso.com.br/exercicios/${params.linguagem}`,
    },
  };
}

export default async function LinguagemExerciciosPage({
  params,
}: {
  params: { linguagem: string };
}) {
  const linguagem = params.linguagem === "javascript" ? "JavaScript" : params.linguagem === "java" ? "Java" : params.linguagem.charAt(0).toUpperCase() + params.linguagem.slice(1);
  const supabase = createClient();
  const { data: exercicios } = await supabase
    .from("exercicios")
    .select("*")
    .eq("linguagem", linguagem);

  return <ExercicioListClient exercicios={exercicios || []} linguagem={params.linguagem} />;
}
