import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIR = path.join(__dirname, "..", "content", "guias", "javascript");

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

const SYSTEM = "Você é um escritor técnico especializado em JavaScript para iniciantes brasileiros.\nEscreva conteúdo didático em português brasileiro, tom acolhedor e direto.\nRetorne APENAS o conteúdo MDX, sem frontmatter.\nUse blocos ```javascript para exemplos de código.\nInclua: explicação do conceito, exemplos práticos, dicas e erros comuns.";

const topicos = [
  { slug: "index", prompt: "Escreva a página inicial do Guia JavaScript do MeuPasso para iniciantes brasileiros. Inclua boas-vindas, o que o aluno vai aprender, lista dos 25 tópicos, dica de como usar o guia." },
  { slug: "introducao", prompt: "Escreva um guia completo de Introdução ao JavaScript para iniciantes brasileiros. Cubra: o que é JavaScript, onde roda (browser e Node.js), diferença de Python e Java, por que aprender JS, o que é possível construir." },
  { slug: "ambiente", prompt: "Escreva um guia completo de configuração do ambiente JavaScript para iniciantes brasileiros. Cubra: instalar Node.js, verificar com node -v e npm -v, instalar VS Code, extensões recomendadas, criar e rodar primeiro arquivo .js com node arquivo.js, o que é o terminal." },
  { slug: "sintaxe", prompt: "Escreva um guia completo de Sintaxe Básica do JavaScript para iniciantes brasileiros. Cubra: ponto e vírgula (opcional mas recomendado), chaves para blocos, indentação, comentários (// e /* */), case sensitive, console.log(), diferença de aspas simples e duplas." },
  { slug: "variaveis", prompt: "Escreva um guia completo sobre var, let e const em JavaScript para iniciantes brasileiros. Cubra: diferença entre var (evitar), let (mutável) e const (imutável), quando usar cada um, escopo de bloco, hoisting básico, boas práticas (preferir const, usar let quando precisar mudar)." },
  { slug: "tipos-dados", prompt: "Escreva um guia completo sobre Tipos de Dados em JavaScript para iniciantes brasileiros. Cubra: number (inteiro e decimal são o mesmo tipo), string, boolean, null, undefined, typeof, conversão com Number(), String(), Boolean(), parseInt(), parseFloat(), NaN e como verificar." },
  { slug: "strings", prompt: "Escreva um guia completo sobre Strings e Template Literals em JavaScript para iniciantes brasileiros. Cubra: aspas simples, duplas e backticks, template literals com ${}, métodos úteis (length, toUpperCase, toLowerCase, trim, includes, startsWith, endsWith, slice, split, replace, indexOf), concatenação com + vs template literal." },
  { slug: "operadores", prompt: "Escreva um guia completo sobre Operadores em JavaScript para iniciantes brasileiros. Cubra: aritméticos (+,-,*,/,%,**), incremento (++/--), comparação (==, ===, !=, !==, >, <), diferença crucial entre == e ===, lógicos (&&, ||, !), atribuição (=,+=,-=,*=,/=), operador ternário." },
  { slug: "input-output", prompt: "Escreva um guia completo sobre Input e Output em JavaScript com Node.js para iniciantes brasileiros. Cubra: console.log() para output, readline para input (criar interface, question, close), exemplo completo de leitura de dados, process.stdout.write(), console.error()." },
  { slug: "if-else", prompt: "Escreva um guia completo sobre If/Else e Switch em JavaScript para iniciantes brasileiros. Cubra: sintaxe do if, else if, else, operador ternário, switch/case com break e default, switch com strings, truthy e falsy values (0, '', null, undefined, NaN são falsy), exemplos práticos." },
  { slug: "for-loops", prompt: "Escreva um guia completo sobre For Loop em JavaScript para iniciantes brasileiros. Cubra: for clássico (init;condição;incremento), for...of para arrays, for...in para objetos, break e continue, loops aninhados, exemplos práticos." },
  { slug: "while-loops", prompt: "Escreva um guia completo sobre While Loop em JavaScript para iniciantes brasileiros. Cubra: while, do...while, quando usar cada um, break e continue, exemplos práticos, evitar loop infinito." },
  { slug: "arrays", prompt: "Escreva um guia completo sobre Arrays em JavaScript para iniciantes brasileiros. Cubra: criar array com [], acessar por índice, length, push, pop, shift, unshift, splice, slice, indexOf, includes, join, sort, reverse, spread operator (...), desestruturação de array." },
  { slug: "funcoes", prompt: "Escreva um guia completo sobre Funções em JavaScript para iniciantes brasileiros. Cubra: function declaration, function expression, parâmetros e argumentos, return, valores padrão de parâmetros, rest parameters (...args), escopo, hoisting de funções." },
  { slug: "arrow-functions", prompt: "Escreva um guia completo sobre Arrow Functions em JavaScript para iniciantes brasileiros. Cubra: sintaxe (=>) vs function, quando omitir chaves e return, diferença de this, quando usar arrow vs function tradicional, exemplos práticos." },
  { slug: "objetos", prompt: "Escreva um guia completo sobre Objetos em JavaScript para iniciantes brasileiros. Cubra: criar objeto com {}, propriedades e métodos, acessar com . e [], adicionar e remover propriedades, Object.keys(), Object.values(), Object.entries(), desestruturação de objeto, spread operator em objetos." },
  { slug: "metodos-array", prompt: "Escreva um guia completo sobre Métodos de Array em JavaScript para iniciantes brasileiros. Cubra: forEach, map, filter, find, findIndex, some, every, reduce (básico), flat, exemplos práticos com cada um, quando usar cada método." },
  { slug: "poo", prompt: "Escreva um guia completo sobre POO com Classes em JavaScript para iniciantes brasileiros. Cubra: class, constructor, métodos de instância, this, new, atributos privados (#), static, getter e setter, toString equivalente." },
  { slug: "heranca", prompt: "Escreva um guia completo sobre Herança em JavaScript para iniciantes brasileiros. Cubra: extends, super(), override de métodos, instanceof, polimorfismo, classe abstrata simulada, exemplo prático completo." },
  { slug: "modulos", prompt: "Escreva um guia completo sobre Módulos em JavaScript para iniciantes brasileiros. Cubra: export e import, export default vs named export, import *, require vs import (CommonJS vs ES Modules), package.json básico, como organizar código em arquivos." },
  { slug: "erros", prompt: "Escreva um guia completo sobre Tratamento de Erros em JavaScript para iniciantes brasileiros. Cubra: try/catch/finally, throw, Error e tipos de erro (TypeError, RangeError, ReferenceError), criar erro personalizado, quando usar try/catch." },
  { slug: "promises", prompt: "Escreva um guia completo sobre Promises e Async/Await em JavaScript para iniciantes brasileiros. Cubra: o que é assíncrono, Promise básico (.then, .catch), async/await, tratamento de erro com try/catch em async, exemplo prático com setTimeout simulando operação assíncrona." },
  { slug: "json", prompt: "Escreva um guia completo sobre JSON em JavaScript para iniciantes brasileiros. Cubra: o que é JSON, JSON.stringify() para converter objeto para string, JSON.parse() para converter string para objeto, JSON em arquivos com fs (Node.js), casos de uso práticos." },
  { slug: "glossario", prompt: "Escreva um glossário completo de termos JavaScript para iniciantes brasileiros. Inclua 25+ termos em ordem alfabética: array, arrow function, assíncrono, callback, const, closure, desestruturação, ES6, event loop, falsy, hoisting, JSON, let, método, módulo, Node.js, null, objeto, promise, protótipo, scope, spread, template literal, truthy, undefined, var." },
  { slug: "erros-comuns", prompt: "Escreva um guia completo dos erros mais comuns em JavaScript para iniciantes brasileiros. Para cada erro: nome, o que significa, exemplo que causa o erro, como corrigir. Inclua: TypeError (cannot read property of undefined), ReferenceError (variable is not defined), SyntaxError, usar == em vez de ===, esquecer return, problema com this em arrow function, callback hell, NaN em operações." },
];

async function gerar(slug, userPrompt) {
  const response = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${API_KEY}` },
    body: JSON.stringify({ model: "deepseek-chat", messages: [{ role: "system", content: SYSTEM }, { role: "user", content: userPrompt }], stream: false, max_tokens: 8192, temperature: 0.7 }),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}: ${await response.text()}`);
  const data = await response.json();
  return data.choices[0].message.content;
}

async function main() {
  for (const topico of topicos) {
    const filePath = path.join(DIR, topico.slug + ".mdx");
    const raw = fs.readFileSync(filePath, "utf-8");
    const match = raw.match(/^(---\n[\s\S]*?\n---)\n?([\s\S]*)$/);
    if (!match) { console.log("⚠️", topico.slug, "no frontmatter"); continue; }
    if (match[2].trim().length > 0) {
      const lines = match[2].split("\n").length;
      console.log(`⏭️  Pulando ${topico.slug} — já tem conteúdo (${lines} linhas)`);
      continue;
    }
    console.log(`Gerando: ${topico.slug}...`);
    try {
      const content = await gerar(topico.slug, topico.prompt);
      fs.writeFileSync(filePath, match[1] + "\n\n" + content.trim() + "\n");
      console.log(`  ✅ ${topico.slug} concluído`);
    } catch (err) {
      console.log(`  ❌ ${topico.slug}: ${err.message}`);
    }
    await new Promise((r) => setTimeout(r, 2000));
  }
  console.log("\n🎉 Geração JavaScript concluída!");
}

main().catch(console.error);
