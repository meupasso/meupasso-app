import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIR = path.join(__dirname, "..", "content", "guias", "python");

// Read .env.local
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

const SYSTEM_PROMPT =
  "Você é um escritor técnico especializado em Python para iniciantes brasileiros.\n" +
  "Escreva conteúdo didático em português brasileiro, tom acolhedor e direto.\n" +
  "Retorne APENAS o conteúdo MDX, sem frontmatter, sem explicações extras.\n" +
  "Use blocos ```python para exemplos de código.\n" +
  "Inclua: explicação do conceito, exemplos práticos, dicas e erros comuns.";

const topicos = [
  {
    slug: "data-tempo",
    prompt:
      "Escreva um guia completo sobre Data e Tempo em Python para iniciantes.\n" +
      "Cubra: módulo datetime, date, time, datetime.now(), timedelta, formatação com strftime(),\n" +
      "parsing com strptime(), fuso horário (introdução), exemplos práticos com datas.",
  },
  {
    slug: "poo",
    prompt:
      "Escreva um guia completo sobre Programação Orientada a Objetos em Python para iniciantes.\n" +
      "Cubra: o que é POO, classes e objetos, __init__, atributos e métodos, self,\n" +
      "herança, encapsulamento (_atributo), polimorfismo, métodos especiais (__str__, __repr__),\n" +
      "exemplos práticos progressivos.",
  },
  {
    slug: "expressoes-regulares",
    prompt:
      "Escreva um guia completo sobre Expressões Regulares em Python para iniciantes.\n" +
      "Cubra: o que são regex, módulo re, funções match(), search(), findall(), sub(),\n" +
      "metacaracteres básicos (. * + ? [] ^ $), grupos, exemplos práticos (validar email, CPF, telefone).",
  },
  {
    slug: "json",
    prompt:
      "Escreva um guia completo sobre JSON em Python para iniciantes.\n" +
      "Cubra: o que é JSON, módulo json, json.loads() e json.dumps(), json.load() e json.dump(),\n" +
      "indent para formatação, trabalhar com APIs que retornam JSON, exemplos práticos.",
  },
  {
    slug: "xml",
    prompt:
      "Escreva um guia completo sobre XML em Python para iniciantes.\n" +
      "Cubra: o que é XML, módulo xml.etree.ElementTree, parse(), find(), findall(),\n" +
      "iterar sobre elementos, criar XML, exemplos práticos simples.",
  },
  {
    slug: "iteradores",
    prompt:
      "Escreva um guia completo sobre Iteradores em Python para iniciantes.\n" +
      "Cubra: o que é um iterador, protocolo __iter__ e __next__, função iter() e next(),\n" +
      "diferença entre iterável e iterador, exemplos com listas e strings, StopIteration.",
  },
  {
    slug: "geradores",
    prompt:
      "Escreva um guia completo sobre Geradores em Python para iniciantes.\n" +
      "Cubra: o que é um gerador, yield vs return, funções geradoras, generator expressions,\n" +
      "vantagens de memória, exemplos práticos, next() com geradores.",
  },
  {
    slug: "decoradores",
    prompt:
      "Escreva um guia completo sobre Decoradores em Python para iniciantes.\n" +
      "Cubra: o que é um decorador, funções como objetos, @decorator, criar decorador simples,\n" +
      "decoradores com argumentos, @functools.wraps, exemplos práticos (timer, log).",
  },
  {
    slug: "glossario",
    prompt:
      "Escreva um glossário completo de termos de Python para iniciantes brasileiros.\n" +
      "Inclua pelo menos 25 termos essenciais em ordem alfabética.\n" +
      "Para cada termo: nome em negrito, definição clara em 2-3 linhas, exemplo de código curto.\n" +
      "Termos a incluir: variável, string, inteiro, float, boolean, lista, tupla, dicionário, set,\n" +
      "função, parâmetro, argumento, return, loop, iteração, condição, módulo, classe, objeto,\n" +
      "método, atributo, herança, exceção, indentação, comentário, f-string, lambda, gerador,\n" +
      "decorador, escopo.",
  },
  {
    slug: "erros-comuns",
    prompt:
      "Escreva um guia completo sobre os erros mais comuns em Python para iniciantes brasileiros.\n" +
      "Para cada erro inclua: nome do erro, o que significa, exemplo de código que causa o erro,\n" +
      "como corrigir, dica para evitar.\n" +
      "Erros a cobrir: SyntaxError, IndentationError, NameError, TypeError, ValueError,\n" +
      "IndexError, KeyError, AttributeError, ZeroDivisionError, ImportError,\n" +
      "FileNotFoundError, RecursionError, StopIteration.",
  },
  {
    slug: "index",
    prompt:
      "Escreva a página inicial do Guia Python do MeuPasso.\n" +
      "Inclua: boas-vindas calorosas para iniciantes, o que o aluno vai aprender neste guia,\n" +
      "lista dos tópicos cobertos, dica de como usar o guia, link de incentivo para começar\n" +
      "pelo tópico Introdução.",
  },
];

function extractFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { frontmatter: "", content: raw };
  return { frontmatter: match[1], content: match[2] || "" };
}

async function gerarTopico(slug, userPrompt) {
  const response = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      stream: false,
      max_tokens: 8192,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`HTTP ${response.status}: ${err}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

async function main() {
  // Read existing index.md for reference to get titulo mapping
  const files = fs.readdirSync(DIR).filter((f) => f.endsWith(".mdx"));
  const slugMap = {};
  for (const file of files) {
    const raw = fs.readFileSync(path.join(DIR, file), "utf-8");
    const { frontmatter } = extractFrontmatter(raw);
    const slugMatch = frontmatter.match(/slug:\s*"?(\S+?)"?\s*$/m);
    const tituloMatch = frontmatter.match(/titulo:\s*"?([^"\n]+?)"?\s*$/m);
    if (slugMatch) {
      slugMap[slugMatch[1]] = {
        titulo: tituloMatch ? tituloMatch[1] : slugMatch[1],
        frontmatter,
        file,
      };
    }
  }

  for (const topico of topicos) {
    const info = slugMap[topico.slug];
    if (!info) {
      console.log(`❌ Pulando: ${topico.slug} — arquivo não encontrado`);
      continue;
    }

    // Check if file already has content beyond frontmatter
    const raw = fs.readFileSync(path.join(DIR, info.file), "utf-8");
    const { content } = extractFrontmatter(raw);
    if (content.trim().length > 0) {
      console.log(`⏭️  Pulando: ${info.titulo} — já tem conteúdo`);
      continue;
    }

    console.log(`Gerando: ${info.titulo}...`);

    try {
      const mdxContent = await gerarTopico(topico.slug, topico.prompt);

      // Reconstruct file with frontmatter + generated content
      const finalContent = `---\n${info.frontmatter}\n---\n\n${mdxContent.trim()}\n`;
      fs.writeFileSync(path.join(DIR, info.file), finalContent, "utf-8");

      const lineCount = finalContent.split("\n").length;
      console.log(`  ✅ ${info.titulo} concluído (${lineCount} linhas)`);
    } catch (err) {
      console.log(`  ❌ ${info.titulo} — ERRO: ${err.message}`);
    }

    // Wait 2s between calls
    await new Promise((r) => setTimeout(r, 2000));
  }

  console.log("\n🎉 Geração concluída!");
}

main().catch(console.error);
