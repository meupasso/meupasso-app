import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";

const envFile = readFileSync(".env.local", "utf-8");
const env = {};
for (const line of envFile.split("\n")) {
  const [k, ...v] = line.split("=");
  if (k && k.trim()) env[k.trim()] = v.join("=").trim();
}

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY
);

const exercicios = [
  // ========== BÁSICO (10) ==========
  {
    id_referencia: "JSA001",
    titulo: "Criar e exibir array",
    nivel: "basico",
    modulo: "Arrays",
    linguagem: "JavaScript",
    descricao: "Crie um array com 5 frutas e exiba o array completo e cada elemento pelo índice.",
    objetivo: "Criar array com [] e acessar por índice",
    permitidos: ["const", "console.log", "array", "índice"],
    proibidos: ["loops", "funções", "métodos de array"],
    erros_comuns: ["índice começa em 1 em vez de 0", "usar () em vez de []"],
    exemplos:
      'const frutas = ["maçã","banana","laranja","uva","pera"];\nfrutas[0] → maçã\nfrutas[4] → pera',
  },
  {
    id_referencia: "JSA002",
    titulo: "push e pop",
    nivel: "basico",
    modulo: "Arrays",
    linguagem: "JavaScript",
    descricao: "Crie array com 3 números. Adicione um com push() e remova o último com pop(). Exiba após cada operação.",
    objetivo: "Usar push() e pop()",
    permitidos: ["const", "console.log", "array", "push", "pop"],
    proibidos: ["loops", "funções", "outros métodos"],
    erros_comuns: ["confundir push com unshift", "pop não retorna o elemento removido"],
    exemplos: "[1,2,3] → push(4) → [1,2,3,4] → pop() → [1,2,3]",
  },
  {
    id_referencia: "JSA003",
    titulo: "length e acesso",
    nivel: "basico",
    modulo: "Arrays",
    linguagem: "JavaScript",
    descricao: "Dado array [10,20,30,40,50], exiba: tamanho, primeiro, último e elemento do meio.",
    objetivo: "Usar length e índice com length-1",
    permitidos: ["const", "console.log", "array", "length"],
    proibidos: ["loops", "funções", "métodos de array"],
    erros_comuns: ["último: array[length] em vez de array[length-1]"],
    exemplos: "Tamanho: 5\nPrimeiro: 10\nÚltimo: 50\nMeio: 30",
  },
  {
    id_referencia: "JSA004",
    titulo: "Modificar elementos",
    nivel: "basico",
    modulo: "Arrays",
    linguagem: "JavaScript",
    descricao: "Crie array com 3 cores. Substitua a segunda cor por 'amarelo'.",
    objetivo: "Modificar elemento por índice",
    permitidos: ["const", "console.log", "array", "índice", "="],
    proibidos: ["loops", "funções", "métodos de array"],
    erros_comuns: ["confundir índice 1 com segunda posição"],
    exemplos:
      '["azul","verde","vermelho"] → ["azul","amarelo","vermelho"]',
  },
  {
    id_referencia: "JSA005",
    titulo: "includes e indexOf",
    nivel: "basico",
    modulo: "Arrays",
    linguagem: "JavaScript",
    descricao: "Crie array de compras. Verifique se 'banana' existe com includes() e sua posição com indexOf().",
    objetivo: "Usar includes() e indexOf()",
    permitidos: ["const", "console.log", "array", "includes", "indexOf", "if"],
    proibidos: ["loops", "funções", "outros métodos"],
    erros_comuns: ["indexOf retorna -1 se não encontrar"],
    exemplos:
      '"banana" existe? true\nPosição: 1\n"carne" existe? false',
  },
  {
    id_referencia: "JSA006",
    titulo: "Spread operator",
    nivel: "basico",
    modulo: "Arrays",
    linguagem: "JavaScript",
    descricao: "Crie dois arrays de números. Combine-os usando spread operator (...).",
    objetivo: "Usar spread (...) para combinar arrays",
    permitidos: ["const", "console.log", "array", "...spread"],
    proibidos: ["loops", "funções", "concat", "push"],
    erros_comuns: ["esquecer os três pontos"],
    exemplos: "const a=[1,2,3], b=[4,5,6];\nconst c=[...a,...b]; → [1,2,3,4,5,6]",
  },
  {
    id_referencia: "JSA007",
    titulo: "Desestruturação",
    nivel: "basico",
    modulo: "Arrays",
    linguagem: "JavaScript",
    descricao: "Dado array [nome, idade, cidade], use desestruturação para extrair cada valor.",
    objetivo: "Usar array destructuring",
    permitidos: ["const", "console.log", "array", "desestruturação []"],
    proibidos: ["loops", "funções", "índice explícito"],
    erros_comuns: ["usar {} em vez de [] para array destructuring"],
    exemplos:
      'const [nome, idade, cidade] = ["Ana", 25, "Recife"];\nnome → Ana, idade → 25',
  },
  {
    id_referencia: "JSA008",
    titulo: "slice",
    nivel: "basico",
    modulo: "Arrays",
    linguagem: "JavaScript",
    descricao: "Dado array [1..10], use slice() para exibir: primeiros 3, últimos 3 e do índice 2 ao 5.",
    objetivo: "Usar slice() para extrair partes do array",
    permitidos: ["const", "console.log", "array", "slice"],
    proibidos: ["loops", "funções", "splice", "filter"],
    erros_comuns: ["fim não inclusivo no slice"],
    exemplos: "Primeiros 3: [1,2,3]\nÚltimos 3: [8,9,10]\nDo 2 ao 5: [3,4,5,6]",
  },
  {
    id_referencia: "JSA009",
    titulo: "sort e reverse",
    nivel: "basico",
    modulo: "Arrays",
    linguagem: "JavaScript",
    descricao: "Ordene nomes com sort() e reverse(). Mostre problemas do sort() com números.",
    objetivo: "Usar sort() e reverse() — entender limitações",
    permitidos: ["const", "console.log", "array", "sort", "reverse", "slice"],
    proibidos: ["loops", "funções", "filter"],
    erros_comuns: ["sort() modifica original", "sort() com números sem comparador"],
    exemplos:
      '["Carlos","Ana","Maria"] → ["Ana","Carlos","Maria"]\n[10,9,2,1,100] → [1,10,100,2,9] ⚠️',
  },
  {
    id_referencia: "JSA010",
    titulo: "join e split",
    nivel: "basico",
    modulo: "Arrays",
    linguagem: "JavaScript",
    descricao: "Use join() para criar string de array e split() para voltar ao array.",
    objetivo: "Converter entre array e string",
    permitidos: ["const", "console.log", "array", "join", "split"],
    proibidos: ["loops", "funções", "toString"],
    erros_comuns: ["separador errado em join/split"],
    exemplos:
      '["JavaScript","é","incrível"].join(" ") → "JavaScript é incrível"\n"a,b,c".split(",") → ["a","b","c"]',
  },

  // ========== INTERMEDIÁRIO (10) ==========
  {
    id_referencia: "JSA011",
    titulo: "forEach",
    nivel: "intermediario",
    modulo: "Arrays",
    linguagem: "JavaScript",
    descricao: "Dado array de preços, use forEach() para exibir cada preço formatado.",
    objetivo: "Usar forEach() com callback",
    permitidos: ["const", "console.log", "array", "forEach", "toFixed", "template literal"],
    proibidos: ["for", "while", "funções externas", "map"],
    erros_comuns: ["tentar retornar valor no forEach"],
    exemplos: "[8.5, 12.0, 3.99].forEach → R$8.50\nR$12.00\nR$3.99",
  },
  {
    id_referencia: "JSA012",
    titulo: "map",
    nivel: "intermediario",
    modulo: "Arrays",
    linguagem: "JavaScript",
    descricao: "Converta array de Celsius para Fahrenheit usando map().",
    objetivo: "Usar map() para transformar array",
    permitidos: ["const", "console.log", "array", "map", "toFixed"],
    proibidos: ["for", "while", "forEach", "push"],
    erros_comuns: ["modificar original em vez de criar novo", "esquecer return"],
    exemplos: "[0, 20, 100].map(c => c * 9/5 + 32) → [32, 68, 212]",
  },
  {
    id_referencia: "JSA013",
    titulo: "filter",
    nivel: "intermediario",
    modulo: "Arrays",
    linguagem: "JavaScript",
    descricao: "Filtre números pares e maiores que 10 de um array com filter().",
    objetivo: "Usar filter() para filtrar elementos",
    permitidos: ["const", "console.log", "array", "filter", "%", "===", ">"],
    proibidos: ["for", "while", "forEach", "push"],
    erros_comuns: ["retornar valor em vez de condição booleana"],
    exemplos: "[1,5,8,12,3,20].filter(n => n%2===0) → [8,12,20]",
  },
  {
    id_referencia: "JSA014",
    titulo: "find e findIndex",
    nivel: "intermediario",
    modulo: "Arrays",
    linguagem: "JavaScript",
    descricao: "Encontre primeiro aprovado (nota >= 7) com find() e sua posição com findIndex().",
    objetivo: "Usar find() e findIndex() com objetos",
    permitidos: ["const", "console.log", "array", "find", "findIndex", ">="],
    proibidos: ["for", "while", "forEach", "filter"],
    erros_comuns: ["find retorna undefined se não encontrar"],
    exemplos:
      'alunos=[{nome:"Ana",nota:8},{nome:"João",nota:5}]\nfind → {nome:"Ana",nota:8}',
  },
  {
    id_referencia: "JSA015",
    titulo: "some e every",
    nivel: "intermediario",
    modulo: "Arrays",
    linguagem: "JavaScript",
    descricao: "Verifique se algum reprovou (some) e se todos aprovaram (every).",
    objetivo: "Usar some() e every()",
    permitidos: ["const", "console.log", "array", "some", "every", "<", ">="],
    proibidos: ["for", "while", "forEach", "filter"],
    erros_comuns: ["confundir some com every"],
    exemplos: "[8,6,4,9,7]\nAlgum reprovou? true\nTodos aprovados? false",
  },
  {
    id_referencia: "JSA016",
    titulo: "reduce",
    nivel: "intermediario",
    modulo: "Arrays",
    linguagem: "JavaScript",
    descricao: "Use reduce() para somar números e encontrar o maior valor.",
    objetivo: "Usar reduce() para acumular valores",
    permitidos: ["const", "console.log", "array", "reduce", "+", "Math.max"],
    proibidos: ["for", "while", "forEach"],
    erros_comuns: ["esquecer valor inicial do acumulador"],
    exemplos:
      "[1,2,3,4,5].reduce((acc,n) => acc+n, 0) → 15\n.reduce((acc,n) => Math.max(acc,n), -Infinity) → 5",
  },
  {
    id_referencia: "JSA017",
    titulo: "Ordenar números corretamente",
    nivel: "intermediario",
    modulo: "Arrays",
    linguagem: "JavaScript",
    descricao: "Ordene números crescente e decrescente com sort() e comparador.",
    objetivo: "Usar sort() com (a,b) => a-b",
    permitidos: ["const", "console.log", "array", "sort", "slice"],
    proibidos: ["for", "while"],
    erros_comuns: ["sort() sem comparador para números"],
    exemplos:
      "[10,9,2,1,100]\nCrescente: [1,2,9,10,100]\nDecrescente: [100,10,9,2,1]",
  },
  {
    id_referencia: "JSA018",
    titulo: "flat e flatMap",
    nivel: "intermediario",
    modulo: "Arrays",
    linguagem: "JavaScript",
    descricao: "Use flat() e flatMap() em array aninhado.",
    objetivo: "Usar flat() e flatMap()",
    permitidos: ["const", "console.log", "array", "flat", "flatMap", "*"],
    proibidos: ["for", "while", "reduce"],
    erros_comuns: ["flat() não modifica original"],
    exemplos:
      "[[1,2],[3,4]].flat() → [1,2,3,4]\n.flatMap(n => [n*2]) → [2,4,6,8]",
  },
  {
    id_referencia: "JSA019",
    titulo: "Array de objetos",
    nivel: "intermediario",
    modulo: "Arrays",
    linguagem: "JavaScript",
    descricao: "Crie array de funcionários. Use map, filter e reduce para análises.",
    objetivo: "Combinar métodos com objetos",
    permitidos: ["const", "console.log", "array", "map", "filter", "reduce", ">", "+"],
    proibidos: ["for", "while", "forEach"],
    erros_comuns: ["encadear métodos sem entender cada retorno"],
    exemplos:
      'funcionarios=[{nome:"Ana",salario:4000},...]\nNomes, Acima 3k, Total',
  },
  {
    id_referencia: "JSA020",
    titulo: "Encadeamento de métodos",
    nivel: "intermediario",
    modulo: "Arrays",
    linguagem: "JavaScript",
    descricao: "Encadeie filter().map().sort()[0] para achar o mais barato dos eletrônicos.",
    objetivo: "Encadear métodos de array",
    permitidos: ["const", "console.log", "array", "filter", "map", "sort", "índice [0]", "==="],
    proibidos: ["for", "while", "forEach"],
    erros_comuns: ["sort sem comparador para números"],
    exemplos: "Mais barato eletrônico: R$800",
  },

  // ========== AVANÇADO (5) ==========
  {
    id_referencia: "JSA021",
    titulo: "Remover duplicatas",
    nivel: "avancado",
    modulo: "Arrays",
    linguagem: "JavaScript",
    descricao: "Remova duplicatas de 3 formas: Set, filter+indexOf, reduce.",
    objetivo: "Conhecer múltiplas formas de remover duplicatas",
    permitidos: ["const", "console.log", "array", "Set", "filter", "indexOf", "reduce", "includes"],
    proibidos: ["for", "while"],
    erros_comuns: ["filter+indexOf é mais lento mas didático"],
    exemplos: "[1,2,2,3,4,4,5]\nCom Set: [1,2,3,4,5]",
  },
  {
    id_referencia: "JSA022",
    titulo: "Agrupar por categoria",
    nivel: "avancado",
    modulo: "Arrays",
    linguagem: "JavaScript",
    descricao: "Use reduce() para agrupar produtos em objeto {categoria: [produtos]}.",
    objetivo: "Usar reduce() para agrupar dados",
    permitidos: ["const", "console.log", "array", "reduce"],
    proibidos: ["for", "while", "forEach", "filter"],
    erros_comuns: ["não inicializar array da categoria"],
    exemplos:
      'produtos → {grãos:["arroz","feijão"], laticínios:["leite"]}',
  },
  {
    id_referencia: "JSA023",
    titulo: "Interseção e diferença",
    nivel: "avancado",
    modulo: "Arrays",
    linguagem: "JavaScript",
    descricao: "Calcule interseção, diferença e união entre dois arrays.",
    objetivo: "Combinar filter, includes e Set",
    permitidos: ["const", "console.log", "array", "filter", "includes", "Set", "...spread"],
    proibidos: ["for", "while", "forEach"],
    erros_comuns: ["diferença simétrica vs diferença simples"],
    exemplos:
      "a=[1,2,3,4,5], b=[3,4,5,6,7]\nInterseção: [3,4,5]\nDiferença: [1,2]\nUnião: [1,2,3,4,5,6,7]",
  },
  {
    id_referencia: "JSA024",
    titulo: "Ranking top 3",
    nivel: "avancado",
    modulo: "Arrays",
    linguagem: "JavaScript",
    descricao: "Ordene alunos por média e exiba top 3.",
    objetivo: "Ordenar objetos e usar slice()",
    permitidos: ["const", "console.log", "array", "sort", "slice", "forEach", "template literal"],
    proibidos: ["for", "while", "reduce"],
    erros_comuns: ["sort comparador errado para decrescente"],
    exemplos:
      '1º Ana (9.0)\n2º Maria (8.5)\n3º João (7.0)',
  },
  {
    id_referencia: "JSA025",
    titulo: "Matriz transposta",
    nivel: "avancado",
    modulo: "Arrays",
    linguagem: "JavaScript",
    descricao: "Calcule a transposta de matriz 3x3 usando map() aninhado.",
    objetivo: "Usar map() aninhado para transpor",
    permitidos: ["const", "console.log", "array", "map"],
    proibidos: ["for", "while", "forEach", "reduce"],
    erros_comuns: ["trocar linha por coluna no acesso"],
    exemplos:
      "[[1,2,3],[4,5,6],[7,8,9]]\nTransposta: [[1,4,7],[2,5,8],[3,6,9]]",
  },

  // ========== DESAFIO (5) ==========
  {
    id_referencia: "JSA026",
    titulo: "Sistema de notas",
    nivel: "desafio",
    modulo: "Arrays",
    linguagem: "JavaScript",
    descricao: "Calcule média, filtre aprovados/reprovados e faça ranking com métodos encadeados.",
    objetivo: "Combinar métodos com objetos complexos",
    permitidos: ["const", "console.log", "array", "map", "filter", "sort", "reduce", "toFixed"],
    proibidos: ["for", "while", "forEach"],
    erros_comuns: ["reduce sem valor inicial"],
    exemplos:
      'Ana: 8.00 ✅\nJoão: 5.00 ❌\nRanking: Ana, João',
  },
  {
    id_referencia: "JSA027",
    titulo: "Carrinho de compras",
    nivel: "desafio",
    modulo: "Arrays",
    linguagem: "JavaScript",
    descricao: "Calcule subtotais, total, item mais caro e desconto de 10% se > R$200.",
    objetivo: "Análise completa com métodos encadeados",
    permitidos: ["const", "console.log", "array", "map", "reduce", "sort", "toFixed"],
    proibidos: ["for", "while", "forEach", "filter"],
    erros_comuns: ["não multiplicar preco por quantidade"],
    exemplos:
      "Total: R$1600.00, Desconto: R$160.00, Final: R$1440.00",
  },
  {
    id_referencia: "JSA028",
    titulo: "Analisador de texto",
    nivel: "desafio",
    modulo: "Arrays",
    linguagem: "JavaScript",
    descricao: "Conte palavras únicas, encontre a mais frequente e as 3 mais longas.",
    objetivo: "Combinar split, reduce, sort e slice",
    permitidos: ["const", "console.log", "string", "split", "map", "filter", "reduce", "sort", "slice", "toLowerCase"],
    proibidos: ["for", "while", "forEach", "regex"],
    erros_comuns: ["não usar toLowerCase()"],
    exemplos:
      'Palavras únicas: 6\nMais frequente: javascript (2x)\nMais longas: ["javascript","poderoso","incrível"]',
  },
  {
    id_referencia: "JSA029",
    titulo: "Recomendação colaborativa",
    nivel: "desafio",
    modulo: "Arrays",
    linguagem: "JavaScript",
    descricao: "Encontre usuários com filmes em comum e recomende filmes não vistos.",
    objetivo: "Usar filter, includes e flat para recomendação",
    permitidos: ["const", "console.log", "array", "filter", "includes", "flat", "map", "Set", "...spread"],
    proibidos: ["for", "while", "forEach", "reduce"],
    erros_comuns: ["recomendar filme que usuário já viu"],
    exemplos:
      'Recomendado para Ana: ["F4"]',
  },
  {
    id_referencia: "JSA030",
    titulo: "Pipeline de dados",
    nivel: "desafio",
    modulo: "Arrays",
    linguagem: "JavaScript",
    descricao: "Filtre vendas do mês, agrupe por vendedor, calcule total e exiba ranking.",
    objetivo: "Pipeline completo de análise com métodos encadeados",
    permitidos: ["const", "console.log", "array", "filter", "reduce", "map", "sort", "Object.entries", "toFixed"],
    proibidos: ["for", "while", "forEach"],
    erros_comuns: ["agrupamento com reduce mal inicializado"],
    exemplos:
      "Ranking junho:\n1º Ana: R$4500.00\n2º João: R$3200.00",
  },
];

async function main() {
  const { error: delErr } = await supabase
    .from("exercicios")
    .delete()
    .eq("linguagem", "JavaScript")
    .eq("modulo", "Arrays");

  if (delErr) {
    console.error("Erro ao deletar:", delErr.message);
    process.exit(1);
  }
  console.log("✅ Exercícios antigos deletados");

  const { error: insErr } = await supabase.from("exercicios").insert(exercicios);
  if (insErr) {
    console.error("Erro ao inserir:", insErr.message);
    process.exit(1);
  }
  console.log(`✅ ${exercicios.length} exercícios inseridos!`);

  const { count } = await supabase
    .from("exercicios")
    .select("*", { count: "exact", head: true })
    .eq("linguagem", "JavaScript")
    .eq("modulo", "Arrays");

  console.log(`📊 Verificação: ${count} exercícios no banco`);
  for (const nivel of ["basico", "intermediario", "avancado", "desafio"]) {
    const { count: n } = await supabase
      .from("exercicios")
      .select("*", { count: "exact", head: true })
      .eq("linguagem", "JavaScript")
      .eq("modulo", "Arrays")
      .eq("nivel", nivel);
    console.log(`  ${nivel}: ${n}`);
  }
}

main().catch(console.error);
