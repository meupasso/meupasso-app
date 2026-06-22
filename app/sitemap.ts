import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient();
  const baseUrl = "https://www.meupasso.com.br";

  // Páginas estáticas
  const estaticas: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/exercicios`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/exercicios/python`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/exercicios/java`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/exercicios/javascript`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/projetos`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/projetos/python`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/projetos/java`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/projetos/javascript`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/trilhas`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/vagas`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/guias`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.7 },
  ];

  // Exercícios — usar slug em vez de UUID
  const { data: exercicios } = await supabase
    .from("exercicios")
    .select("slug, linguagem, created_at")
    .not("slug", "is", null);

  const urlsExercicios: MetadataRoute.Sitemap = (exercicios || []).map((ex) => ({
    url: `${baseUrl}/exercicios/${ex.linguagem.toLowerCase()}/${ex.slug}`,
    lastModified: new Date(ex.created_at),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Projetos
  const { data: projetos } = await supabase
    .from("projetos")
    .select("id, linguagem, created_at");

  const urlsProjetos: MetadataRoute.Sitemap = (projetos || []).map((p) => ({
    url: `${baseUrl}/projetos/${p.linguagem.toLowerCase()}/${p.id}`,
    lastModified: new Date(p.created_at),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Trilhas
  const { data: trilhas } = await supabase
    .from("trilhas")
    .select("slug, created_at");

  const urlsTrilhas: MetadataRoute.Sitemap = (trilhas || []).map((t) => ({
    url: `${baseUrl}/trilhas/${t.slug}`,
    lastModified: new Date(t.created_at),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Guias MDX
  const guiasLinguagens = ["python", "java", "javascript"];
  const urlsGuias: MetadataRoute.Sitemap = guiasLinguagens.map((lang) => ({
    url: `${baseUrl}/guias/${lang}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Blog posts
  const { data: posts } = await supabase
    .from("blog_historico")
    .select("slug, created_at")
    .eq("status", "publicado");

  const urlsBlog: MetadataRoute.Sitemap = (posts || []).map((p) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: new Date(p.created_at),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [
    ...estaticas,
    ...urlsExercicios,
    ...urlsProjetos,
    ...urlsTrilhas,
    ...urlsGuias,
    ...urlsBlog,
  ];
}
