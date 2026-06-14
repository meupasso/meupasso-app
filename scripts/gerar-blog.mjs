import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIR = path.join(__dirname, "..", "content", "blog");

const envRaw = fs.readFileSync(path.join(__dirname, "..", ".env.local"), "utf-8");
const env = {};
envRaw.split("\n").forEach((line) => {
  const t = line.trim();
  if (!t || t.startsWith("#")) return;
  const idx = t.indexOf("=");
  if (idx === -1) return;
  env[t.slice(0, idx).trim()] = t.slice(idx + 1).trim();
});
const API_KEY = env.DEEPSEEK_API_KEY;

const SYSTEM =
  "Você é um escritor de conteúdo para o MeuPasso, uma plataforma brasileira de aprendizado de programação para iniciantes.\n" +
  "Escreva em português brasileiro, tom conversacional e acolhedor — como um professor que já passou pela mesma dificuldade.\n" +
  "Sem jargão desnecessário. Sem ser condescendente. Direto ao ponto.\n" +
  "O leitor é alguém que quer migrar de área para programação mas não sabe por onde começar.\n" +
  "Retorne APENAS o conteúdo MDX sem frontmatter, sem explicações extras.\n" +
  "Use ## para seções, **negrito** para destaques, listas quando fizer sentido.\n" +
  "Tamanho ideal: 800 a 1200 palavras.";

const posts = [
  {
    file: "python-ou-java-para-iniciantes.mdx",
    prompt:
      "Escreva um post completo respondendo a pergunta: Python ou Java para quem está começando do zero em programação?\n" +
      "Cubra: diferenças práticas entre as duas linguagens, mercado de trabalho de cada uma no Brasil, qual é mais fácil para iniciantes e por quê, exemplos de código simples mostrando a diferença de sintaxe, recomendação final clara.\n" +
      "Inclua links internos para: /guias/python e /guias/java e /exercicios/python e /exercicios/java",
  },
  {
    file: "quanto-tempo-aprender-programacao.mdx",
    prompt:
      "Escreva um post completo respondendo: quanto tempo leva para aprender programação do zero até conseguir o primeiro emprego?\n" +
      "Cubra: a resposta honesta (não prometa milagres), fatores que influenciam (dedicação, área escolhida, tipo de vaga), exemplos de trilhas realistas (6 meses, 1 ano, 2 anos), o que estudar em cada fase, desmistificar o medo de não ter talento para programação.\n" +
      "Inclua links internos para: /guias/python e /exercicios",
  },
  {
    file: "como-conseguir-primeiro-emprego-ti.mdx",
    prompt:
      "Escreva um post completo sobre como conseguir o primeiro emprego em TI sem experiência.\n" +
      "Cubra: o que empresas realmente procuram em junior, importância de portfólio vs diploma, como montar um portfólio simples, onde procurar vagas no Brasil (LinkedIn, Gupy, vagas.com), dicas para o currículo de quem está migrando de área, o que estudar além de código (Git, lógica, comunicação).\n" +
      "Inclua links internos para: /exercicios e /guias",
  },
  {
    file: "erros-mais-comuns-python-iniciantes.mdx",
    prompt:
      "Escreva um post completo sobre os erros mais comuns de quem está aprendendo Python pela primeira vez — não erros de código, mas erros de aprendizado e mentalidade.\n" +
      "Cubra: tentar aprender tudo ao mesmo tempo, pular os fundamentos, não praticar, comparar progresso com outros, desistir no primeiro obstáculo, depender demais de tutoriais sem praticar, copiar código sem entender.\n" +
      "Para cada erro: o que é, por que acontece, como evitar.\n" +
      "Inclua links internos para: /exercicios/python e /guias/python",
  },
  {
    file: "melhores-formas-praticar-programacao.mdx",
    prompt:
      "Escreva um post completo sobre as melhores formas de praticar programação para quem está começando.\n" +
      "Cubra: por que praticar é mais importante que assistir aulas, exercícios práticos vs projetos pessoais, como escolher um projeto para o portfólio, comunidades para participar no Brasil, como usar o ChatGPT e IAs para aprender sem depender delas, a importância de ler código dos outros.\n" +
      "Inclua links internos para: /exercicios, /guias e /notas",
  },
];

async function gerar(userPrompt) {
  const response = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${API_KEY}` },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [{ role: "system", content: SYSTEM }, { role: "user", content: userPrompt }],
      stream: false,
      max_tokens: 8192,
      temperature: 0.7,
    }),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}: ${await response.text()}`);
  const data = await response.json();
  return data.choices[0].message.content;
}

async function main() {
  for (const post of posts) {
    const filePath = path.join(DIR, post.file);
    const raw = fs.readFileSync(filePath, "utf-8");
    const match = raw.match(/^(---\n[\s\S]*?\n---)\n?([\s\S]*)$/);
    if (!match) { console.log(`⚠️  ${post.file} — sem frontmatter`); continue; }
    if (match[2].trim().length > 0) { console.log(`⏭️  Pulando ${post.file} — já tem conteúdo`); continue; }

    console.log(`Gerando: ${post.file}...`);
    try {
      const content = await gerar(post.prompt);
      fs.writeFileSync(filePath, match[1] + "\n\n" + content.trim() + "\n");
      console.log(`  ✅ ${post.file} concluído`);
    } catch (err) {
      console.log(`  ❌ ${post.file}: ${err.message}`);
    }
    await new Promise((r) => setTimeout(r, 2000));
  }
  console.log("\n🎉 Blog gerado!");
}

main().catch(console.error);
