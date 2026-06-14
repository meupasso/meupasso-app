import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.meupasso.com.br";

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/exercicios`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/exercicios/python`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/exercicios/java`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/exercicios/javascript`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/privacidade`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/termos`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/guias`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/guias/python`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/guias/java`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/guias/javascript`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/notas`, lastModified: new Date(), changeFrequency: "never", priority: 0.3 },
    { url: `${baseUrl}/gerador`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  ];

  const blogSlugs = [
    "python-ou-java-para-iniciantes", "quanto-tempo-aprender-programacao",
    "como-conseguir-primeiro-emprego-ti", "erros-mais-comuns-python-iniciantes",
    "melhores-formas-praticar-programacao",
  ];

  const pythonSlugs = [
    "introducao", "ambiente", "sintaxe", "tipos-variaveis", "numeros",
    "strings", "operadores", "listas", "tuplas", "dicionarios", "sets",
    "input", "if-else", "for-loops", "while-loops", "funcoes",
    "expressoes-lambda", "modulos", "input-output-arquivos",
    "erros-excecoes-testes", "data-tempo", "poo", "expressoes-regulares",
    "json", "xml", "iteradores", "geradores", "decoradores",
    "glossario", "erros-comuns",
  ];

  const javaSlugs = [
    "introducao", "ambiente", "sintaxe", "variaveis-tipos", "strings",
    "operadores", "scanner", "if-else", "for-loop", "while-loop", "arrays",
    "wrapper-classes", "metodos", "classes-objetos", "construtores",
    "encapsulamento", "heranca", "polimorfismo", "arraylist", "excecoes",
    "glossario", "erros-comuns",
  ];

  const javascriptSlugs = [
    "introducao", "ambiente", "sintaxe", "variaveis", "tipos-dados",
    "strings", "operadores", "input-output", "if-else", "for-loops",
    "while-loops", "arrays", "funcoes", "arrow-functions", "objetos",
    "metodos-array", "poo", "heranca", "modulos", "erros",
    "promises", "json", "glossario", "erros-comuns",
  ];

  const guiaPages: MetadataRoute.Sitemap = [
    ...pythonSlugs.map((slug) => ({
      url: `${baseUrl}/guias/python/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...javaSlugs.map((slug) => ({
      url: `${baseUrl}/guias/java/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...javascriptSlugs.map((slug) => ({
      url: `${baseUrl}/guias/javascript/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...guiaPages, ...blogPages];
}
