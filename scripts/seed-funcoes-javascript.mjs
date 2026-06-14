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
    id_referencia: "JSF001",
    titulo: "Primeira função",
    nivel: "basico",
    modulo: "Funções",
    linguagem: "JavaScript",
    descricao:
      'Crie uma função chamada saudacao() que exibe "Olá, mundo!" e chame-a.',
    objetivo: "Declarar e chamar função simples sem parâmetros",
    permitidos: ["function", "console.log", "chamada de função"],
    proibidos: ["arrow function", "parâmetros", "return", "loops", "arrays"],
    erros_comuns: ["esquecer parênteses na chamada", "esquecer chaves no corpo"],
    exemplos:
      'function saudacao() { console.log("Olá, mundo!"); }\nsaudacao(); → Olá, mundo!',
  },
  {
    id_referencia: "JSF002",
    titulo: "Função com parâmetro",
    nivel: "basico",
    modulo: "Funções",
    linguagem: "JavaScript",
    descricao:
      'Crie uma função saudar(nome) que exibe "Olá, [nome]!" usando template literal.',
    objetivo: "Declarar função com um parâmetro",
    permitidos: ["function", "console.log", "parâmetro", "template literal"],
    proibidos: ["arrow function", "return", "loops", "arrays"],
    erros_comuns: ["confundir parâmetro com variável global", "esquecer passar argumento"],
    exemplos: 'saudar("Maria") → Olá, Maria!',
  },
  {
    id_referencia: "JSF003",
    titulo: "Função que retorna",
    nivel: "basico",
    modulo: "Funções",
    linguagem: "JavaScript",
    descricao:
      "Crie uma função somar(a, b) que retorna a soma. Exiba o resultado.",
    objetivo: "Usar return para devolver valor",
    permitidos: ["function", "console.log", "return", "parâmetros", "+"],
    proibidos: ["arrow function", "loops", "arrays"],
    erros_comuns: ["usar console.log em vez de return", "não capturar o retorno"],
    exemplos: "somar(3, 5) → 8\nconsole.log(somar(10, 2)) → 12",
  },
  {
    id_referencia: "JSF004",
    titulo: "Parâmetro padrão",
    nivel: "basico",
    modulo: "Funções",
    linguagem: "JavaScript",
    descricao:
      'Crie saudar(nome, saudacao = "Olá") que usa valor padrão. Teste com e sem o segundo argumento.',
    objetivo: "Usar parâmetro com valor padrão",
    permitidos: ["function", "console.log", "parâmetro padrão", "template literal"],
    proibidos: ["arrow function", "return", "loops", "arrays"],
    erros_comuns: ["parâmetro com default antes do obrigatório", "não testar sem o argumento"],
    exemplos:
      'saudar("Ana") → Olá, Ana!\nsaudar("João", "Oi") → Oi, João!',
  },
  {
    id_referencia: "JSF005",
    titulo: "Função booleana",
    nivel: "basico",
    modulo: "Funções",
    linguagem: "JavaScript",
    descricao:
      "Crie ehPar(numero) que retorna true se par e false se ímpar.",
    objetivo: "Função que retorna boolean",
    permitidos: ["function", "return", "console.log", "%", "===", "if", "else"],
    proibidos: ["arrow function", "loops", "arrays"],
    erros_comuns: ["retornar string 'true' em vez de true", "lógica invertida"],
    exemplos: "ehPar(4) → true\nehPar(7) → false",
  },
  {
    id_referencia: "JSF006",
    titulo: "Múltiplos retornos",
    nivel: "basico",
    modulo: "Funções",
    linguagem: "JavaScript",
    descricao:
      "Crie minMax(array) que retorna objeto {min, max} com menor e maior valor.",
    objetivo: "Retornar objeto com múltiplos valores",
    permitidos: ["function", "return", "console.log", "array", "Math.min", "Math.max", "spread"],
    proibidos: ["arrow function", "loops", "reduce"],
    erros_comuns: ["retornar array em vez de objeto", "não desestruturar o retorno"],
    exemplos:
      "minMax([3,1,7,2,9]) → {min:1, max:9}\nconst {min, max} = minMax([3,1,7,2,9])",
  },
  {
    id_referencia: "JSF007",
    titulo: "Função com loop",
    nivel: "basico",
    modulo: "Funções",
    linguagem: "JavaScript",
    descricao:
      "Crie tabuada(n) que exibe a tabuada do número n de 1 a 10.",
    objetivo: "Usar loop dentro de função",
    permitidos: ["function", "console.log", "for", "let", "*", "template literal"],
    proibidos: ["arrow function", "return", "arrays", "métodos de array"],
    erros_comuns: ["retornar em vez de exibir", "range errado"],
    exemplos: "tabuada(5) → 5x1=5, 5x2=10, ..., 5x10=50",
  },
  {
    id_referencia: "JSF008",
    titulo: "Chamar função dentro de função",
    nivel: "basico",
    modulo: "Funções",
    linguagem: "JavaScript",
    descricao:
      "Crie dobro(n) que retorna n*2 e quadruplo(n) que usa dobro() para retornar n*4.",
    objetivo: "Chamar uma função dentro de outra",
    permitidos: ["function", "return", "console.log", "*"],
    proibidos: ["arrow function", "loops", "arrays"],
    erros_comuns: ["não usar dobro() dentro de quadruplo()"],
    exemplos: "dobro(5) → 10\nquadruplo(5) → 20",
  },
  {
    id_referencia: "JSF009",
    titulo: "Arrow function básica",
    nivel: "basico",
    modulo: "Funções",
    linguagem: "JavaScript",
    descricao:
      "Reescreva somar(a,b), ehPar(n) e saudar(nome) como arrow functions.",
    objetivo: "Converter function declaration para arrow function",
    permitidos: ["const", "arrow function =>", "console.log", "return implícito", "template literal", "%", "===", "+"],
    proibidos: ["function keyword", "loops", "arrays"],
    erros_comuns: ["esquecer =>", "return implícito com e sem chaves"],
    exemplos:
      "const somar = (a,b) => a+b;\nconst ehPar = n => n%2===0;\nconst saudar = nome => `Olá, ${nome}!`",
  },
  {
    id_referencia: "JSF010",
    titulo: "Função como argumento",
    nivel: "basico",
    modulo: "Funções",
    linguagem: "JavaScript",
    descricao:
      "Crie aplicar(funcao, valor) que recebe uma função e um valor e retorna o resultado.",
    objetivo: "Passar função como argumento (higher-order function)",
    permitidos: ["function", "const", "return", "console.log", "arrow function"],
    proibidos: ["loops", "arrays", "métodos de array"],
    erros_comuns: ["chamar função com () em vez de passar referência"],
    exemplos: "aplicar(dobro, 5) → 10\naplicar(n => n**2, 4) → 16",
  },

  // ========== INTERMEDIÁRIO (10) ==========
  {
    id_referencia: "JSF011",
    titulo: "Recursão — fatorial",
    nivel: "intermediario",
    modulo: "Funções",
    linguagem: "JavaScript",
    descricao: "Crie função recursiva fatorial(n) sem usar loops.",
    objetivo: "Implementar recursão com caso base",
    permitidos: ["function", "return", "console.log", "if", "*"],
    proibidos: ["arrow function", "loops", "arrays"],
    erros_comuns: ["esquecer caso base", "caso base errado"],
    exemplos: "fatorial(5) → 120\nfatorial(0) → 1",
  },
  {
    id_referencia: "JSF012",
    titulo: "Recursão — Fibonacci",
    nivel: "intermediario",
    modulo: "Funções",
    linguagem: "JavaScript",
    descricao:
      "Crie função recursiva fibonacci(n) que retorna o n-ésimo termo.",
    objetivo: "Recursão com dois casos base",
    permitidos: ["function", "return", "if", "else if", "+"],
    proibidos: ["arrow function", "loops", "arrays"],
    erros_comuns: ["casos base errados", "soma errada"],
    exemplos: "fibonacci(0) → 0\nfibonacci(7) → 13",
  },
  {
    id_referencia: "JSF013",
    titulo: "Rest parameters",
    nivel: "intermediario",
    modulo: "Funções",
    linguagem: "JavaScript",
    descricao:
      "Crie somarTudo(...numeros) que aceita qualquer quantidade de números e retorna a soma.",
    objetivo: "Usar rest parameters (...args)",
    permitidos: ["function", "return", "console.log", "...rest", "reduce", "+"],
    proibidos: ["arrow function", "loops", "arrays fixos"],
    erros_comuns: ["confundir rest com spread", "usar arguments em vez de rest"],
    exemplos: "somarTudo(1,2,3) → 6\nsomarTudo(10,20,30,40) → 100",
  },
  {
    id_referencia: "JSF014",
    titulo: "Closure",
    nivel: "intermediario",
    modulo: "Funções",
    linguagem: "JavaScript",
    descricao:
      "Crie criarContador() que retorna uma função. Cada chamada incrementa e retorna o contador.",
    objetivo: "Implementar closure com estado privado",
    permitidos: ["function", "const", "return", "let", "console.log"],
    proibidos: ["arrow function", "loops", "arrays", "variável global"],
    erros_comuns: ["usar variável global em vez de closure", "não retornar a função interna"],
    exemplos:
      "const contador = criarContador();\ncontador() → 1\ncontador() → 2\ncontador() → 3",
  },
  {
    id_referencia: "JSF015",
    titulo: "Função geradora de funções",
    nivel: "intermediario",
    modulo: "Funções",
    linguagem: "JavaScript",
    descricao:
      "Crie criarMultiplicador(n) que retorna uma função que multiplica qualquer número por n.",
    objetivo: "Função que retorna função (factory function)",
    permitidos: ["function", "const", "return", "console.log", "*"],
    proibidos: ["loops", "arrays"],
    erros_comuns: ["retornar resultado em vez de função", "chamar com () em vez de retornar"],
    exemplos:
      "const dobrar = criarMultiplicador(2);\ndobrar(5) → 10\ntriplicar(5) → 15",
  },
  {
    id_referencia: "JSF016",
    titulo: "Callback",
    nivel: "intermediario",
    modulo: "Funções",
    linguagem: "JavaScript",
    descricao:
      "Crie executarOperacao(a, b, operacao) que recebe dois números e uma função callback.",
    objetivo: "Usar callback como parâmetro de função",
    permitidos: ["function", "const", "return", "console.log", "arrow function", "+", "-", "*"],
    proibidos: ["loops", "arrays", "métodos de array"],
    erros_comuns: ["chamar callback com () em vez de passar referência"],
    exemplos:
      "executarOperacao(10, 5, (a,b) => a+b) → 15\nexecutarOperacao(10, 5, (a,b) => a*b) → 50",
  },
  {
    id_referencia: "JSF017",
    titulo: "Memoização",
    nivel: "intermediario",
    modulo: "Funções",
    linguagem: "JavaScript",
    descricao:
      "Crie memoizar(fn) que recebe uma função e retorna versão com cache.",
    objetivo: "Implementar memoização com closure",
    permitidos: ["function", "const", "return", "console.log", "objeto {}", "...rest"],
    proibidos: ["loops", "arrays", "Map"],
    erros_comuns: ["cache não persistindo", "chave do cache errada"],
    exemplos:
      'const calcMemo = memoizar(calcLento);\ncalcMemo(5) → 25\ncalcMemo(5) → "do cache!" → 25',
  },
  {
    id_referencia: "JSF018",
    titulo: "Currying",
    nivel: "intermediario",
    modulo: "Funções",
    linguagem: "JavaScript",
    descricao:
      "Crie somar(a)(b) usando currying. Crie adicionar5 = somar(5) para aplicação parcial.",
    objetivo: "Implementar currying",
    permitidos: ["function", "const", "return", "console.log", "+", "arrow function"],
    proibidos: ["loops", "arrays", "bind"],
    erros_comuns: ["retornar resultado em vez de função"],
    exemplos:
      "somar(3)(4) → 7\nconst adicionar5 = somar(5);\nadicionar5(3) → 8\nadicionar5(10) → 15",
  },
  {
    id_referencia: "JSF019",
    titulo: "Composição de funções",
    nivel: "intermediario",
    modulo: "Funções",
    linguagem: "JavaScript",
    descricao:
      "Crie compor(...fns) que aplica funções da direita para esquerda.",
    objetivo: "Implementar composição com reduce",
    permitidos: ["function", "const", "return", "console.log", "arrow function", "reduce", "...rest"],
    proibidos: ["loops", "arrays fixos"],
    erros_comuns: ["ordem errada na composição"],
    exemplos:
      "const pipeline = compor(quadrado, incrementar, dobrar);\npipeline(3) → 49",
  },
  {
    id_referencia: "JSF020",
    titulo: "IIFE",
    nivel: "intermediario",
    modulo: "Funções",
    linguagem: "JavaScript",
    descricao:
      "Crie um módulo usando IIFE que encapsula variáveis privadas e expõe métodos públicos.",
    objetivo: "Usar IIFE para encapsulamento",
    permitidos: ["function", "const", "let", "return", "console.log", "objeto {}"],
    proibidos: ["arrow function", "loops", "arrays", "class"],
    erros_comuns: ["esquecer () no final para invocar", "não retornar interface pública"],
    exemplos:
      "const modulo = (function() {\n  let privado = 0;\n  return { incrementar: () => ++privado, valor: () => privado };\n})();",
  },

  // ========== AVANÇADO (5) ==========
  {
    id_referencia: "JSF021",
    titulo: "Decorador",
    nivel: "avancado",
    modulo: "Funções",
    linguagem: "JavaScript",
    descricao:
      "Crie decorador cronometrar(fn) que mede o tempo de execução de qualquer função.",
    objetivo: "Implementar decorator pattern",
    permitidos: ["function", "const", "return", "console.log", "Date.now", "...rest", "arrow function"],
    proibidos: ["loops", "arrays", "class"],
    erros_comuns: ["não retornar resultado da função original", "não usar ...rest"],
    exemplos:
      'const calcLenta = cronometrar(calc);\ncalcLenta(1000) → "Executado em 2ms" → resultado',
  },
  {
    id_referencia: "JSF022",
    titulo: "Generator function",
    nivel: "avancado",
    modulo: "Funções",
    linguagem: "JavaScript",
    descricao:
      "Crie generator function* paresAte(n) que gera números pares de 0 até n usando yield.",
    objetivo: "Usar function* e yield",
    permitidos: ["function*", "yield", "console.log", "for...of", "let"],
    proibidos: ["return com valor", "arrays", "loops normais"],
    erros_comuns: ["usar return em vez de yield"],
    exemplos:
      "for (const n of paresAte(10))\n→ 0 2 4 6 8 10",
  },
  {
    id_referencia: "JSF023",
    titulo: "Função pura vs impura",
    nivel: "avancado",
    modulo: "Funções",
    linguagem: "JavaScript",
    descricao:
      "Demonstre a diferença entre função pura e impura. Refatore uma impura em pura.",
    objetivo: "Entender funções puras",
    permitidos: ["function", "const", "let", "return", "console.log", "array", "spread"],
    proibidos: ["loops", "class"],
    erros_comuns: ["modificar parâmetro diretamente", "depender de estado externo"],
    exemplos:
      "// Impura\nfunction addItem(arr, item) { arr.push(item); }\n// Pura\nconst addItem = (arr, item) => [...arr, item]",
  },
  {
    id_referencia: "JSF024",
    titulo: "Trampolim para recursão",
    nivel: "avancado",
    modulo: "Funções",
    linguagem: "JavaScript",
    descricao:
      "Implemente trampolim(fn) para executar recursão sem estourar a call stack.",
    objetivo: "Usar trampolining para TCO manual",
    permitidos: ["function", "const", "return", "console.log", "while", "typeof"],
    proibidos: ["arrow function", "arrays", "recursão direta"],
    erros_comuns: ["não verificar se retorno é função", "stack overflow"],
    exemplos:
      "const soma = trampolim(function s(n, acc=0) {\n  return n===0 ? acc : () => s(n-1, acc+n);\n});\nsoma(100000) → 5000050000",
  },
  {
    id_referencia: "JSF025",
    titulo: "Pipeline operator simulado",
    nivel: "avancado",
    modulo: "Funções",
    linguagem: "JavaScript",
    descricao:
      "Implemente pipe(...fns) que aplica funções da esquerda para direita. Crie pipeline de texto.",
    objetivo: "Composição funcional com pipe",
    permitidos: ["function", "const", "return", "console.log", "arrow function", "reduce", "...rest", "filter", "split"],
    proibidos: ["loops", "for", "while"],
    erros_comuns: ["confundir pipe com compose (ordem)"],
    exemplos:
      'const processar = pipe(trim, toLowerCase, splitPalavras);\nprocessar("  Olá  ") → ["olá"]',
  },

  // ========== DESAFIO (5) ==========
  {
    id_referencia: "JSF026",
    titulo: "Sistema de validação funcional",
    nivel: "desafio",
    modulo: "Funções",
    linguagem: "JavaScript",
    descricao:
      "Crie funções puras de validação: validarEmail, validarCPF, validarTelefone. Crie validarTudo que as compõe.",
    objetivo: "Compor múltiplas funções de validação",
    permitidos: ["function", "const", "return", "console.log", "arrow function", "regex básico", "objeto {}", "array"],
    proibidos: ["loops", "class", "var"],
    erros_comuns: ["não separar em funções distintas", "validação incompleta"],
    exemplos:
      'validarTudo({email:"ana@ok.com", cpf:"12345678901"}) → {valido: true, erros: []}',
  },
  {
    id_referencia: "JSF027",
    titulo: "Calculadora funcional",
    nivel: "desafio",
    modulo: "Funções",
    linguagem: "JavaScript",
    descricao:
      "Implemente calcular(op, a, b) que usa objeto para mapear string de operação para função.",
    objetivo: "Usar objeto como mapa de funções",
    permitidos: ["function", "const", "return", "console.log", "arrow function", "objeto {}"],
    proibidos: ["if", "else", "switch", "loops", "arrays"],
    erros_comuns: ["usar if/else em vez de objeto", "não tratar operação inválida"],
    exemplos:
      'calcular("soma", 5, 3) → 8\ncalcular("invalido", 1, 2) → "Operação inválida"',
  },
  {
    id_referencia: "JSF028",
    titulo: "Event emitter funcional",
    nivel: "desafio",
    modulo: "Funções",
    linguagem: "JavaScript",
    descricao:
      "Crie criarEventEmitter() com on, off e emit usando closure. Implemente Observer pattern.",
    objetivo: "Implementar Observer pattern com closures",
    permitidos: ["function", "const", "return", "console.log", "objeto {}", "array", "filter", "forEach", "arrow function"],
    proibidos: ["class", "loops for/while", "variável global"],
    erros_comuns: ["não filtrar callback em off()"],
    exemplos:
      "const ee = criarEventEmitter();\nee.on('click', handler);\nee.emit('click', {x:10}) → handler chamado",
  },
  {
    id_referencia: "JSF029",
    titulo: "Analisador de código funcional",
    nivel: "desafio",
    modulo: "Funções",
    linguagem: "JavaScript",
    descricao:
      "Analise array de funções: contar parâmetros, detectar puras, ordenar por complexidade.",
    objetivo: "Usar função.length e toString() para meta-programação",
    permitidos: ["function", "const", "return", "console.log", "arrow function", "array", "map", "filter", "sort", "toString", "length"],
    proibidos: ["class", "loops", "var"],
    erros_comuns: ["função.length conta só parâmetros obrigatórios"],
    exemplos:
      "analisar([somar, ehPar, saudar]) → [{nome:'somar',params:2},...]",
  },
  {
    id_referencia: "JSF030",
    titulo: "Mini framework reativo",
    nivel: "desafio",
    modulo: "Funções",
    linguagem: "JavaScript",
    descricao:
      "Implemente criarEstado(inicial) que retorna [obterEstado, definirEstado, inscrever]. Notifica inscritos ao mudar.",
    objetivo: "Implementar reatividade com closures e observer",
    permitidos: ["function", "const", "let", "return", "console.log", "arrow function", "array", "forEach", "filter"],
    proibidos: ["class", "loops for/while", "var", "Proxy"],
    erros_comuns: ["não notificar ao mudar estado", "não implementar unsubscribe"],
    exemplos:
      "const [get, set, sub] = criarEstado(0);\nconst unsub = sub(v => console.log(v));\nset(1) → 'novo valor: 1'",
  },
];

async function main() {
  const { error: delErr } = await supabase
    .from("exercicios")
    .delete()
    .eq("linguagem", "JavaScript")
    .eq("modulo", "Funções");

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
    .eq("modulo", "Funções");

  console.log(`📊 Verificação: ${count} exercícios no banco`);
  for (const nivel of ["basico", "intermediario", "avancado", "desafio"]) {
    const { count: n } = await supabase
      .from("exercicios")
      .select("*", { count: "exact", head: true })
      .eq("linguagem", "JavaScript")
      .eq("modulo", "Funções")
      .eq("nivel", nivel);
    console.log(`  ${nivel}: ${n}`);
  }
}

main().catch(console.error);
