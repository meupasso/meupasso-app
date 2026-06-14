import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import ExercicioListClient from "./ExercicioListClient";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { linguagem: string } }): Promise<Metadata> {
  const nome = params.linguagem === "javascript" ? "JavaScript" : params.linguagem === "java" ? "Java" : params.linguagem.charAt(0).toUpperCase() + params.linguagem.slice(1);
  return {
    title: `Exercícios de ${nome}`,
    description: `Pratique ${nome} com exercícios organizados por módulo e dificuldade.`,
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
