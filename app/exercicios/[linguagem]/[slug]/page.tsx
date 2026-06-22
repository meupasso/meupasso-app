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

  const title = `${exercicio.titulo} — ${exercicio.linguagem} ${nivelLabel}`;
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

  // Buscar exercícios relacionados (mesmo módulo, mesma linguagem)
  const { data: relacionados } = await supabase
    .from("exercicios")
    .select("id, slug, titulo, nivel, modulo, linguagem, id_referencia")
    .eq("linguagem", exercicio.linguagem)
    .eq("modulo", exercicio.modulo)
    .neq("id", exercicio.id)
    .limit(4);

  const nivelLabels: Record<string, string> = {
    basico: "Básico",
    intermediario: "Intermediário",
    avancado: "Avançado",
    desafio: "Desafio",
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: exercicio.titulo,
    description: exercicio.descricao?.substring(0, 200),
    educationalLevel: (
      {
        basico: "Beginner",
        intermediario: "Intermediate",
        avancado: "Advanced",
        desafio: "Advanced",
      } as Record<string, string>
    )[exercicio.nivel] || "Beginner",
    learningResourceType: "Exercise",
    teaches: exercicio.modulo,
    inLanguage: "pt-BR",
    isAccessibleForFree: true,
    provider: {
      "@type": "Organization",
      name: "MeuPasso",
      url: "https://www.meupasso.com.br",
    },
    url: `https://www.meupasso.com.br/exercicios/${exercicio.linguagem.toLowerCase()}/${exercicio.slug}`,
    about: {
      "@type": "ComputerLanguage",
      name: exercicio.linguagem,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ExercicioClient exercicio={exercicio} />
      {relacionados && relacionados.length > 0 && (
        <section
          style={{
            maxWidth: "780px",
            margin: "3rem auto 0",
            padding: "2rem 2rem 0",
            borderTop: "1px solid var(--border)",
          }}
        >
          <h3
            style={{
              fontSize: "1rem",
              fontWeight: 600,
              marginBottom: "1rem",
              color: "var(--text-secondary)",
            }}
          >
            Mais exercícios de {exercicio.modulo}
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "0.75rem",
            }}
          >
            {relacionados.map((ex) => (
              <a
                key={ex.id}
                href={`/exercicios/${ex.linguagem.toLowerCase()}/${ex.slug}`}
                style={{
                  display: "block",
                  padding: "0.75rem 1rem",
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border)",
                  borderRadius: "0.5rem",
                  textDecoration: "none",
                  color: "var(--text-primary)",
                  fontSize: "0.875rem",
                  transition: "border-color 0.2s",
                }}
              >
                <span
                  style={{
                    fontSize: "0.7rem",
                    color: "var(--text-secondary)",
                    display: "block",
                    marginBottom: "0.25rem",
                  }}
                >
                  {ex.id_referencia} ·{" "}
                  {nivelLabels[ex.nivel as keyof typeof nivelLabels] || ex.nivel}
                </span>
                {ex.titulo}
              </a>
            ))}
          </div>
          <a
            href={`/exercicios/${exercicio.linguagem.toLowerCase()}`}
            style={{
              fontSize: "0.875rem",
              color: "var(--accent)",
              display: "inline-block",
              marginTop: "1rem",
            }}
          >
            Ver todos os exercícios de {exercicio.linguagem} →
          </a>
        </section>
      )}
    </>
  );
}
