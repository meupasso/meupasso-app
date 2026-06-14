import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIR = path.join(__dirname, "..", "content", "guias", "java");

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

const SYSTEM = "Você é um escritor técnico especializado em Java para iniciantes brasileiros.\nEscreva conteúdo didático em português brasileiro, tom acolhedor e direto.\nRetorne APENAS o conteúdo MDX, sem frontmatter.\nUse blocos ```java para exemplos de código.\nInclua: explicação do conceito, exemplos práticos, dicas e erros comuns.";

const topicos = [
  { slug: "index", prompt: "Escreva a página inicial do Guia Java do MeuPasso para iniciantes brasileiros. Inclua boas-vindas, o que o aluno vai aprender, lista dos 22 tópicos, dica de como usar o guia." },
  { slug: "introducao", prompt: "Escreva um guia completo de Introdução ao Java para iniciantes brasileiros. Cubra: o que é Java, história resumida, JVM/JDK/JRE explicados de forma simples, onde Java é usado hoje (Android, sistemas bancários, empresas), por que aprender Java, diferenças básicas para Python." },
  { slug: "ambiente", prompt: "Escreva um guia completo de configuração do Ambiente Java para iniciantes brasileiros. Cubra: instalar JDK (Windows/Mac/Linux), verificar instalação com java -version, instalar VS Code, extensão Extension Pack for Java, criar primeiro arquivo .java, estrutura mínima do programa, compilar e rodar com javac e java, explicar o que é o terminal." },
  { slug: "sintaxe", prompt: "Escreva um guia completo de Sintaxe Java para iniciantes brasileiros. Cubra: estrutura obrigatória (public class, public static void main), ponto e vírgula obrigatório, chaves para delimitar blocos, indentação (não obrigatória mas importante), comentários (// e /* */), case sensitive, System.out.println vs System.out.print, erros comuns (esquecer ;, esquecer chave)." },
  { slug: "variaveis-tipos", prompt: "Escreva um guia completo de Variáveis e Tipos Primitivos em Java para iniciantes brasileiros. Cubra: declaração de variável com tipo (int idade = 25), tipos primitivos (int, double, float, long, short, byte, char, boolean), diferença entre int e double, literal long com L, literal float com f, char com aspas simples, boolean true/false, constantes com final, convenção camelCase, erros comuns (esquecer tipo, misturar tipos)." },
  { slug: "strings", prompt: "Escreva um guia completo de Strings em Java para iniciantes brasileiros. Cubra: String com S maiúsculo, criar string com aspas duplas, concatenação com +, concatenação com variáveis, métodos úteis (length(), toUpperCase(), toLowerCase(), trim(), substring(), contains(), equals(), equalsIgnoreCase(), replace()), diferença entre == e equals(), String.valueOf(), conversão de número para string, erros comuns (usar == para comparar strings)." },
  { slug: "scanner", prompt: "Escreva um guia completo de Scanner (Input) em Java para iniciantes brasileiros. Cubra: importar java.util.Scanner, criar objeto Scanner com System.in, nextLine() para string, nextInt() para inteiro, nextDouble() para decimal, fechar o scanner, problema do nextLine() após nextInt(), exemplos práticos de leitura de dados, erros comuns (InputMismatchException, buffer do scanner)." },
  { slug: "operadores", prompt: "Escreva um guia completo de Operadores em Java para iniciantes brasileiros. Cubra: aritméticos (+ - * / % ++ --), divisão inteira vs decimal, operadores de comparação (== != > < >= <=), operadores lógicos (&& || !), operadores de atribuição (= += -= *= /= %=), precedência de operadores, casting (int para double e vice-versa), erros comuns (usar = em vez de ==, divisão inteira inesperada)." },
  { slug: "if-else", prompt: "Escreva um guia completo de If/Else em Java para iniciantes brasileiros. Cubra: sintaxe do if, else if, else, chaves obrigatórias vs opcionais, operador ternário, switch/case com break e default, switch com String (Java 7+), exemplos práticos (calculadora, classificação de notas, verificar maioridade), erros comuns (esquecer break no switch, usar = em vez de ==)." },
  { slug: "for-loop", prompt: "Escreva um guia completo de For Loop em Java para iniciantes brasileiros. Cubra: sintaxe do for tradicional (inicialização; condição; incremento), for com decremento, for com passo diferente de 1, for-each para arrays e coleções, break e continue, loops aninhados, exemplos práticos (tabuada, somar números, percorrer array), erros comuns (off-by-one, loop infinito)." },
  { slug: "while-loop", prompt: "Escreva um guia completo de While Loop em Java para iniciantes brasileiros. Cubra: sintaxe do while, do-while (executa pelo menos uma vez), diferença entre while e do-while, quando usar while vs for, break e continue no while, exemplos práticos (menu de opções, adivinhar número, validar entrada), erros comuns (loop infinito, esquecer atualizar variável)." },
  { slug: "arrays", prompt: "Escreva um guia completo de Arrays em Java para iniciantes brasileiros. Cubra: declarar array (tipo[] nome), inicializar com new, inicializar com valores {}, acessar elementos por índice, propriedade length, percorrer com for e for-each, array de String, arrays multidimensionais (básico), Arrays.sort(), Arrays.toString(), erros comuns (ArrayIndexOutOfBoundsException, índice começa em 0)." },
  { slug: "wrapper-classes", prompt: "Escreva um guia completo de Classes Invólucro (Wrapper Classes) em Java para iniciantes brasileiros. Cubra: por que existem (tipos primitivos não são objetos), tabela primitivo vs wrapper (int→Integer, double→Double, boolean→Boolean, char→Character), autoboxing e unboxing automático, métodos úteis (Integer.parseInt(), Double.parseDouble(), Integer.MAX_VALUE, Integer.MIN_VALUE, Integer.toBinaryString()), uso com ArrayList (não aceita primitivos), comparação com equals(), erros comuns (NullPointerException com wrapper null, confundir parseInt com valueOf)." },
  { slug: "metodos", prompt: "Escreva um guia completo de Métodos em Java para iniciantes brasileiros. Cubra: declarar método (modificador tipo nome(parâmetros)), void vs tipo de retorno, return, chamar método, parâmetros e argumentos, sobrecarga de métodos (overloading), método static vs não-static, passar primitivo vs objeto como parâmetro (por valor vs referência introdução), exemplos práticos, erros comuns (esquecer return, tipo de retorno errado)." },
  { slug: "classes-objetos", prompt: "Escreva um guia completo de Classes e Objetos em Java para iniciantes brasileiros. Cubra: o que é uma classe, o que é um objeto, declarar classe, atributos, criar objeto com new, acessar atributos com ponto, diferença entre classe e objeto, múltiplos objetos da mesma classe, this, exemplo prático completo (classe Carro, classe Pessoa), erros comuns (NullPointerException, esquecer new)." },
  { slug: "construtores", prompt: "Escreva um guia completo de Construtores em Java para iniciantes brasileiros. Cubra: o que é um construtor, construtor padrão (sem parâmetros), construtor parametrizado, this() para chamar outro construtor, múltiplos construtores (sobrecarga), quando usar construtor vs setter, exemplo prático (classe Produto com construtores), erros comuns (construtor com tipo de retorno, nome diferente da classe)." },
  { slug: "encapsulamento", prompt: "Escreva um guia completo de Encapsulamento em Java para iniciantes brasileiros. Cubra: por que encapsular, modificadores de acesso (private, public, protected, default), atributos private, getters e setters públicos, validação no setter, convenção de nomenclatura (getNome, setNome, isAtivo), exemplo prático completo (classe ContaBancaria encapsulada), erros comuns (acessar atributo private diretamente)." },
  { slug: "heranca", prompt: "Escreva um guia completo de Herança em Java para iniciantes brasileiros. Cubra: o que é herança, extends, herança de atributos e métodos, super para chamar construtor pai, super para chamar método pai, override (@Override), Object como superclasse de tudo, toString() override, herança simples (Java não tem múltipla), exemplo prático (Animal → Cachorro → Labrador), erros comuns (esquecer super() no construtor, confundir overload com override)." },
  { slug: "polimorfismo", prompt: "Escreva um guia completo de Polimorfismo em Java para iniciantes brasileiros. Cubra: o que é polimorfismo, polimorfismo de sobrescrita (runtime), polimorfismo de sobrecarga (compile-time), referência do tipo pai apontando para objeto filho, classes abstratas (abstract class, abstract method), interfaces básicas (interface, implements), exemplo prático completo, instanceof, erros comuns (tentar instanciar classe abstrata)." },
  { slug: "arraylist", prompt: "Escreva um guia completo de ArrayList em Java para iniciantes brasileiros. Cubra: importar java.util.ArrayList, declarar ArrayList com tipo genérico, add(), get(), set(), remove(), size(), contains(), clear(), percorrer com for-each e for tradicional, ArrayList de String, ArrayList de Integer (wrapper), diferença entre Array e ArrayList, Collections.sort(), exemplo prático (lista de compras, cadastro de alunos), erros comuns (usar tipo primitivo em vez de wrapper, IndexOutOfBoundsException)." },
  { slug: "excecoes", prompt: "Escreva um guia completo de Tratamento de Exceções em Java para iniciantes brasileiros. Cubra: o que é uma exceção, checked vs unchecked exceptions, try/catch, múltiplos catch, finally, throws na assinatura do método, throw para lançar exceção, exceções comuns (NullPointerException, ArrayIndexOutOfBoundsException, NumberFormatException, ArithmeticException, ClassCastException), criar exceção customizada, exemplo prático (calculadora robusta), erros comuns (catch genérico demais, silenciar exceções)." },
  { slug: "glossario", prompt: "Escreva um glossário completo de termos de Java para iniciantes brasileiros. Inclua pelo menos 25 termos essenciais em ordem alfabética. Para cada termo: nome em negrito, definição clara em 2-3 linhas, exemplo de código curto em Java. Termos: JVM, JDK, JRE, classe, objeto, instância, método, atributo, construtor, herança, polimorfismo, encapsulamento, interface, abstract, override, overload, static, void, null, NullPointerException, casting, autoboxing, ArrayList, Scanner, main." },
  { slug: "erros-comuns", prompt: "Escreva um guia completo dos erros mais comuns em Java para iniciantes brasileiros. Para cada erro inclua: nome do erro, o que significa, exemplo de código que causa o erro, como corrigir, dica para evitar. Erros: NullPointerException, ArrayIndexOutOfBoundsException, NumberFormatException, ArithmeticException (divisão por zero), ClassCastException, StackOverflowError, incompatible types, cannot find symbol, reached end of file while parsing, missing return statement, unclosed string literal, illegal start of expression." },
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
  console.log("\n🎉 Geração Java concluída!");
}

main().catch(console.error);
