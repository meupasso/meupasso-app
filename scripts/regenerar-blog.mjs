import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const envRaw = fs.readFileSync(path.join(__dirname, "..", ".env.local"), "utf-8");
const env = {};
envRaw.split("\n").forEach((line) => {
  const t = line.trim();
  if (!t || t.startsWith("#")) return;
  const idx = t.indexOf("=");
  if (idx === -1) return;
  env[t.slice(0, idx).trim()] = t.slice(idx + 1).trim();
});

const SYSTEM =
  "Você é um escritor para o MeuPasso, plataforma brasileira de programação para iniciantes.\n" +
  "Escreva em português brasileiro, tom conversacional e direto.\n" +
  "IMPORTANTE: máximo 400 palavras. Sem enrolação. Sem introdução longa.\n" +
  "Comece respondendo a pergunta do título direto no primeiro parágrafo.\n" +
  "Use no máximo 3 seções com ##.\n" +
  "Termine com 1 parágrafo de conclusão e um link para o conteúdo relevante do MeuPasso.\n" +
  "Retorne APENAS o conteúdo MDX sem frontmatter.";

const posts = [
  {
    slug: "python-ou-java-para-iniciantes",
    titulo: "Python ou Java para Iniciantes: Qual Escolher em 2026?",
    imagem: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&q=80",
    tags: ["python", "java", "iniciantes"],
    descricao: "Qual linguagem escolher para começar? A resposta honesta para quem está começando do zero.",
    prompt: "Escreva um post curtissimo respondendo: Python ou Java para iniciantes? Direto ao ponto.",
  },
  {
    slug: "quanto-tempo-aprender-programacao",
    titulo: "Quanto Tempo Leva para Aprender Programação do Zero?",
    imagem: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
    tags: ["carreira", "iniciantes"],
    descricao: "Sem enrolação: quanto tempo leva para aprender programação e conseguir o primeiro emprego.",
    prompt: "Escreva um post curtissimo respondendo: quanto tempo leva para aprender programação do zero até o primeiro emprego? Seja realista.",
  },
  {
    slug: "como-conseguir-primeiro-emprego-ti",
    titulo: "Como Conseguir o Primeiro Emprego em TI sem Experiência",
    imagem: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80",
    tags: ["carreira", "emprego"],
    descricao: "O que empresas realmente procuram em um dev júnior — e como se preparar sem experiência.",
    prompt: "Escreva um post curtissimo sobre como conseguir o primeiro emprego em TI sem experiência. Seja prático e direto.",
  },
  {
    slug: "erros-mais-comuns-python-iniciantes",
    titulo: "Erros Mais Comuns de Quem Está Aprendendo Python",
    imagem: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    tags: ["python", "iniciantes", "erros"],
    descricao: "Os erros de mentalidade que travam quem está aprendendo Python — e como evitá-los.",
    prompt: "Escreva um post curtissimo sobre os erros de mentalidade que travam quem está aprendendo Python — e como evitar cada um. Máximo 300 palavras.",
  },
  {
    slug: "melhores-formas-praticar-programacao",
    titulo: "Melhores Formas de Praticar Programação (Segundo Quem Já Ensinou Centenas de Iniciantes)",
    imagem: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
    tags: ["prática", "iniciantes"],
    descricao: "Praticar é mais importante que assistir aulas. Veja como fazer isso de forma eficiente.",
    prompt: "Escreva um post curtissimo sobre as melhores formas de praticar programação para iniciantes. Prático e direto.",
  },
];

async function gerar(userPrompt) {
  const response = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${env.DEEPSEEK_API_KEY}` },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [{ role: "system", content: SYSTEM }, { role: "user", content: userPrompt }],
      stream: false,
      max_tokens: 4096,
      temperature: 0.7,
    }),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}: ${await response.text()}`);
  const data = await response.json();
  return data.choices[0].message.content;
}

async function main() {
  for (const post of posts) {
    console.log(`Gerando: ${post.slug}...`);
    try {
      const content = await gerar(post.prompt);
      const wordCount = content.split(" ").length;

      const frontmatter = `---
titulo: "${post.titulo}"
slug: "${post.slug}"
imagem: "${post.imagem}"
descricao: "${post.descricao}"
data: "2026-06-06"
tags: ${JSON.stringify(post.tags)}
---

`;

      fs.writeFileSync(
        path.join(__dirname, "..", "content", "blog", `${post.slug}.mdx`),
        frontmatter + content.trim() + "\n"
      );
      console.log(`  ✅ ${post.slug} (${wordCount} palavras)`);
    } catch (err) {
      console.log(`  ❌ ${post.slug}: ${err.message}`);
    }
    await new Promise((r) => setTimeout(r, 2500));
  }

  console.log("\n🎉 Blog regenerado!");
}

main().catch(console.error);
