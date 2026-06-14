import fs from "fs";

const file = "content/guias/python/index.mdx";
let content = fs.readFileSync(file, "utf-8");

const novaTabela = `| # | Tópico | O que você vai dominar |
|---|--------|------------------------|
| 1 | Introdução | O que é Python, por que aprender, como funciona |
| 2 | Ambiente | Instalação, VS Code, primeiro "Hello World" |
| 3 | Sintaxe | Regras básicas, indentação, comentários |
| 4 | Tipos de Variáveis | Guardando informações na memória |
| 5 | Números | Inteiros, floats, operações matemáticas |
| 6 | Strings | Textos, formatação, métodos úteis |
| 7 | Operadores | Aritméticos, comparação, lógicos |
| 8 | Listas | Coleções ordenadas e mutáveis |
| 9 | Tuplas | Listas imutáveis |
| 10 | Dicionários | Pares chave-valor |
| 11 | Sets | Conjuntos sem duplicatas |
| 12 | Input de Dados | Como receber dados do usuário |
| 13 | If... Else | Tomando decisões no código |
| 14 | For Loops | Repetindo com sequências |
| 15 | While Loops | Repetindo com condições |
| 16 | Funções | Reutilizando blocos de código |
| 17 | Expressões Lambda | Funções anônimas de uma linha |
| 18 | Módulos | Organizando e importando código |
| 19 | Input & Output de Arquivos | Lendo e escrevendo arquivos |
| 20 | Erros, Exceções e Testes | Tratando erros como profissional |
| 21 | Data e Tempo | Trabalhando com datas e horas |
| 22 | POO | Programação Orientada a Objetos |
| 23 | Expressões Regulares | Buscando padrões em texto ⚠️ avançado |
| 24 | JSON | Trabalhando com dados estruturados |
| 25 | XML | Manipulando arquivos XML ⚠️ avançado |
| 26 | Iteradores | Percorrendo dados eficientemente ⚠️ avançado |
| 27 | Geradores | Sequências sob demanda ⚠️ avançado |
| 28 | Decoradores | Modificando funções elegantemente ⚠️ avançado |
| 29 | Glossário | Termos técnicos explicados |
| 30 | Erros Comuns | Os erros mais frequentes e como resolver |`;

// Replace the old table (from "| Módulo" to the end of the table rows)
const tableStart = content.indexOf("| Módulo | O que você vai dominar |");
const tableEnd = content.indexOf("\n\n", content.indexOf("| 27."));
if (tableStart !== -1) {
  const before = content.slice(0, tableStart);
  const after = content.slice(content.indexOf("\n\n", content.indexOf("27. Glossário")));
  content = before + novaTabela + "\n\n" + after.trimStart();
  fs.writeFileSync(file, content, "utf-8");
  console.log("✅ index.mdx");
} else {
  console.log("❌ Não encontrou a tabela");
}
