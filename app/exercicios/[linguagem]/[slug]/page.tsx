import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ExercicioClient from "./ExercicioClient";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { linguagem: string; slug: string };
}): Promise<Metadata> {
  const supabase = createClient();
  const slug = params.slug;

  const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slug);

  const { data: exercicio } = await supabase
    .from("exercicios")
    .select("titulo, descricao, id_referencia, modulo, nivel, linguagem")
    .eq(isUUID ? "id" : "slug", slug)
    .single();

  if (!exercicio) {
    return { title: "Exercício não encontrado | MeuPasso" };
  }

  const nivelLabels: Record<string, string> = {
    basico: "Básico",
    intermediario: "Intermediário",
    avancado: "Avançado",
    desafio: "Desafio",
  };
  const nivelLabel = nivelLabels[exercicio.nivel] || exercicio.nivel;

  const title = `${exercicio.titulo} — ${exercicio.linguagem} ${nivelLabel} | MeuPasso`;
  const description = exercicio.descricao
    ? exercicio.descricao.substring(0, 155).replace(/\n/g, " ").trim()
    : `Exercício ${nivelLabel.toLowerCase()} de ${exercicio.linguagem} — módulo ${exercicio.modulo}. Pratique programação com exercícios progressivos no MeuPasso.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.meupasso.com.br/exercicios/${exercicio.linguagem.toLowerCase()}/${params.slug}`,
      siteName: "MeuPasso",
      locale: "pt_BR",
      type: "article",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
    alternates: {
      canonical: `https://www.meupasso.com.br/exercicios/${exercicio.linguagem.toLowerCase()}/${params.slug}`,
    },
  };
}

export default async function ExercicioPage({
  params,
}: {
  params: { linguagem: string; slug: string };
}) {
  const supabase = createClient();
  const slug = params.slug;
  const linguagem = params.linguagem;

  // Detectar se é UUID antigo e redirecionar para slug
  const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slug);

  if (isUUID) {
    const { data } = await supabase
      .from("exercicios")
      .select("slug, linguagem")
      .eq("id", slug)
      .single();

    if (data?.slug) {
      const langPath = data.linguagem.toLowerCase();
      redirect(`/exercicios/${langPath}/${data.slug}`);
    }
  }

  // Buscar pelo slug
  const { data: exercicio } = await supabase
    .from("exercicios")
    .select("*")
    .eq("slug", slug)
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
