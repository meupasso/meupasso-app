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
    id_referencia: "JSO001",
    titulo: "Criar objeto simples",
    nivel: "basico",
    modulo: "Objetos",
    linguagem: "JavaScript",
    descricao:
      "Crie um objeto pessoa com propriedades: nome, idade, cidade. Exiba cada propriedade com ponto e colchetes.",
    objetivo: "Criar objeto literal e acessar propriedades",
    permitidos: ["const", "console.log", "objeto {}", "ponto", "colchetes []"],
    proibidos: ["loops", "funções", "class", "métodos"],
    erros_comuns: ["usar = em vez de : no objeto", "confundir ponto com colchetes"],
    exemplos:
      'const pessoa = {nome:"Ana", idade:25, cidade:"Recife"};\npessoa.nome → Ana\npessoa["idade"] → 25',
  },
  {
    id_referencia: "JSO002",
    titulo: "Adicionar e remover propriedades",
    nivel: "basico",
    modulo: "Objetos",
    linguagem: "JavaScript",
    descricao:
      'Crie objeto carro. Adicione propriedade "cor" depois de criado. Remova "ano" com delete.',
    objetivo: "Adicionar e remover propriedades dinamicamente",
    permitidos: ["const", "console.log", "objeto {}", "ponto", "delete"],
    proibidos: ["loops", "funções", "class"],
    erros_comuns: ["usar const e tentar reatribuir objeto"],
    exemplos:
      'const carro = {marca:"Toyota", ano:2020};\ncarro.cor = "azul";\ndelete carro.ano;\n→ {marca:"Toyota", cor:"azul"}',
  },
  {
    id_referencia: "JSO003",
    titulo: "Método no objeto",
    nivel: "basico",
    modulo: "Objetos",
    linguagem: "JavaScript",
    descricao:
      "Crie objeto calculadora com métodos somar(a,b), subtrair(a,b), multiplicar(a,b).",
    objetivo: "Adicionar métodos a um objeto",
    permitidos: ["const", "console.log", "objeto {}", "function", "return"],
    proibidos: ["loops", "class", "arrow function nos métodos", "this"],
    erros_comuns: ["usar arrow function em métodos", "esquecer return"],
    exemplos:
      "calculadora.somar(5,3) → 8\ncalculadora.multiplicar(4,3) → 12",
  },
  {
    id_referencia: "JSO004",
    titulo: "this no objeto",
    nivel: "basico",
    modulo: "Objetos",
    linguagem: "JavaScript",
    descricao:
      "Crie objeto pessoa com nome, sobrenome e método nomeCompleto() que usa this.",
    objetivo: "Usar this dentro de método",
    permitidos: ["const", "console.log", "objeto {}", "function", "this", "return", "template literal"],
    proibidos: ["loops", "class", "arrow function no método"],
    erros_comuns: ["usar arrow function e perder this"],
    exemplos:
      'const pessoa = {nome:"Ana", sobrenome:"Silva", nomeCompleto() { return `${this.nome} ${this.sobrenome}` }};\npessoa.nomeCompleto() → "Ana Silva"',
  },
  {
    id_referencia: "JSO005",
    titulo: "Object.keys, values, entries",
    nivel: "basico",
    modulo: "Objetos",
    linguagem: "JavaScript",
    descricao:
      "Dado objeto produto, use Object.keys(), Object.values() e Object.entries() para listar.",
    objetivo: "Usar métodos estáticos do Object",
    permitidos: ["const", "console.log", "objeto {}", "Object.keys", "Object.values", "Object.entries", "forEach"],
    proibidos: ["loops for/in", "funções", "class"],
    erros_comuns: ["confundir keys com values"],
    exemplos:
      'Object.keys(produto) → ["nome","preco","estoque"]\nObject.values(produto) → ["TV",2000,5]',
  },
  {
    id_referencia: "JSO006",
    titulo: "Desestruturação de objeto",
    nivel: "basico",
    modulo: "Objetos",
    linguagem: "JavaScript",
    descricao:
      "Dado objeto usuario, desestruture nome e email. Use alias para cidade como local.",
    objetivo: "Usar object destructuring com alias",
    permitidos: ["const", "console.log", "objeto {}", "desestruturação {}", "alias :"],
    proibidos: ["loops", "funções", "class"],
    erros_comuns: ["usar [] em vez de {} para desestruturar objeto"],
    exemplos:
      'const {nome, email, cidade: local} = usuario;\nnome → "Ana"\nlocal → "Recife"',
  },
  {
    id_referencia: "JSO007",
    titulo: "Spread em objetos",
    nivel: "basico",
    modulo: "Objetos",
    linguagem: "JavaScript",
    descricao:
      "Use spread para copiar, combinar e sobrescrever propriedades de objetos.",
    objetivo: "Usar spread {...obj} para clonar e combinar",
    permitidos: ["const", "console.log", "objeto {}", "...spread"],
    proibidos: ["loops", "funções", "Object.assign", "class"],
    erros_comuns: ["spread faz cópia rasa (shallow)"],
    exemplos:
      "const copia = {...original};\nconst merged = {...obj1, ...obj2};\nconst atualizado = {...usuario, idade: 26}",
  },
  {
    id_referencia: "JSO008",
    titulo: "Propriedade computada",
    nivel: "basico",
    modulo: "Objetos",
    linguagem: "JavaScript",
    descricao:
      "Crie objeto com propriedade computada usando variável como chave.",
    objetivo: "Usar [variavel] como chave de objeto",
    permitidos: ["const", "let", "console.log", "objeto {}", "propriedade computada []"],
    proibidos: ["loops", "funções", "class"],
    erros_comuns: ["confundir acesso por colchete com propriedade computada"],
    exemplos:
      'const chave = "nome";\nconst obj = {[chave]: "Ana"};\nobj.nome → "Ana"',
  },
  {
    id_referencia: "JSO009",
    titulo: "Objetos aninhados",
    nivel: "basico",
    modulo: "Objetos",
    linguagem: "JavaScript",
    descricao:
      "Crie objeto empresa com objetos aninhados endereco e fundador. Acesse propriedades profundas.",
    objetivo: "Criar e acessar objetos aninhados",
    permitidos: ["const", "console.log", "objeto {}", "ponto encadeado", "desestruturação aninhada"],
    proibidos: ["loops", "funções", "class"],
    erros_comuns: ["acessar propriedade de undefined"],
    exemplos:
      'empresa.endereco.cidade → "Recife"\nconst {endereco: {cidade}} = empresa',
  },
  {
    id_referencia: "JSO010",
    titulo: "Optional chaining",
    nivel: "basico",
    modulo: "Objetos",
    linguagem: "JavaScript",
    descricao:
      "Dado objeto usuario que pode ou não ter endereço, use optional chaining (?.) para acessar cidade sem erro.",
    objetivo: "Usar ?. para acesso seguro",
    permitidos: ["const", "console.log", "objeto {}", "?.", "??", "undefined"],
    proibidos: ["loops", "funções", "class", "if para verificar null"],
    erros_comuns: ["usar . e ter TypeError", "não combinar com ?? para valor padrão"],
    exemplos:
      'usuario.endereco?.cidade → undefined\nusuario.endereco?.cidade ?? "Não informada" → "Não informada"',
  },

  // ========== INTERMEDIÁRIO (10) ==========
  {
    id_referencia: "JSO011",
    titulo: "Factory function",
    nivel: "intermediario",
    modulo: "Objetos",
    linguagem: "JavaScript",
    descricao:
      "Crie criarPessoa(nome, idade) que retorna objeto pessoa com propriedades e método apresentar().",
    objetivo: "Usar factory function para criar objetos",
    permitidos: ["function", "const", "return", "console.log", "objeto {}", "this", "template literal"],
    proibidos: ["class", "new", "loops"],
    erros_comuns: ["usar this em factory function", "não retornar o objeto"],
    exemplos:
      'const ana = criarPessoa("Ana", 25);\nana.apresentar() → "Olá! Sou Ana, 25 anos."',
  },
  {
    id_referencia: "JSO012",
    titulo: "Object.freeze e seal",
    nivel: "intermediario",
    modulo: "Objetos",
    linguagem: "JavaScript",
    descricao:
      "Demonstre Object.freeze() (imutável) e Object.seal() (sem add/delete mas pode editar).",
    objetivo: "Controlar mutabilidade com freeze e seal",
    permitidos: ["const", "console.log", "objeto {}", "Object.freeze", "Object.seal"],
    proibidos: ["loops", "funções", "class"],
    erros_comuns: ["freeze é raso (shallow)"],
    exemplos:
      'const config = Object.freeze({api:"url"});\nconfig.api = "outra"; // ignorado',
  },
  {
    id_referencia: "JSO013",
    titulo: "Clonagem profunda",
    nivel: "intermediario",
    modulo: "Objetos",
    linguagem: "JavaScript",
    descricao:
      "Demonstre problema do spread (cópia rasa) com objetos aninhados. Implemente deep copy com JSON.",
    objetivo: "Entender shallow vs deep copy",
    permitidos: ["const", "console.log", "objeto {}", "...spread", "JSON.parse", "JSON.stringify"],
    proibidos: ["loops", "funções recursivas", "class"],
    erros_comuns: ["achar que spread faz deep copy", "JSON perde funções e undefined"],
    exemplos:
      "const raso = {...original}; // raso.endereco === original.endereco!\nconst profundo = JSON.parse(JSON.stringify(original));",
  },
  {
    id_referencia: "JSO014",
    titulo: "Getters e setters",
    nivel: "intermediario",
    modulo: "Objetos",
    linguagem: "JavaScript",
    descricao:
      "Crie objeto circulo com raio, getter area e setter raio que valida valor positivo.",
    objetivo: "Usar get e set em objeto literal",
    permitidos: ["const", "console.log", "objeto {}", "get", "set", "Math.PI", "**", "if", "throw"],
    proibidos: ["class", "loops"],
    erros_comuns: ["getter com parênteses na chamada"],
    exemplos:
      "circulo.raio = 5;\ncirculo.area → 78.54\ncirculo.raio = -1 → throw Error",
  },
  {
    id_referencia: "JSO015",
    titulo: "Iterar sobre objeto",
    nivel: "intermediario",
    modulo: "Objetos",
    linguagem: "JavaScript",
    descricao:
      "Dado objeto notas, use Object.entries() com forEach para exibir cada aluno e nota com situação.",
    objetivo: "Iterar sobre objeto com Object.entries()",
    permitidos: ["const", "console.log", "objeto {}", "Object.entries", "forEach", "if", "template literal"],
    proibidos: ["for...in", "loops", "funções externas"],
    erros_comuns: ["usar for...in sem hasOwnProperty"],
    exemplos:
      'Object.entries(notas).forEach(([nome, nota]) => \n  console.log(`${nome}: ${nota>=7?"Aprovado":"Reprovado"}`)',
  },
  {
    id_referencia: "JSO016",
    titulo: "Transformar objeto em array",
    nivel: "intermediario",
    modulo: "Objetos",
    linguagem: "JavaScript",
    descricao:
      "Dado objeto estoque, use Object.entries() + map() para criar array de objetos com status.",
    objetivo: "Transformar objeto em array de objetos",
    permitidos: ["const", "console.log", "objeto {}", "Object.entries", "map", "if", "template literal"],
    proibidos: ["for", "while", "forEach"],
    erros_comuns: ["não desestruturar entradas"],
    exemplos:
      "{arroz:50, feijao:3}\n→ [{produto:'arroz',qtd:50,status:'OK'},...]",
  },
  {
    id_referencia: "JSO017",
    titulo: "Mesclar e sobrescrever",
    nivel: "intermediario",
    modulo: "Objetos",
    linguagem: "JavaScript",
    descricao:
      "Mescle objeto padrão com customizações usando spread. Customizações sobrescrevem padrões.",
    objetivo: "Merge de objetos com precedência",
    permitidos: ["const", "console.log", "objeto {}", "...spread"],
    proibidos: ["for", "while", "Object.assign", "funções"],
    erros_comuns: ["ordem errada no spread"],
    exemplos:
      "const config = {...padrao, ...custom};\n→ {tema:'escuro', idioma:'pt', notifs:false}",
  },
  {
    id_referencia: "JSO018",
    titulo: "Objeto como namespace",
    nivel: "intermediario",
    modulo: "Objetos",
    linguagem: "JavaScript",
    descricao:
      "Organize funções matemáticas dentro de MathUtils como namespace.",
    objetivo: "Usar objeto como namespace/módulo",
    permitidos: ["const", "console.log", "objeto {}", "function", "return", "for"],
    proibidos: ["class", "arrow function", "variáveis globais"],
    erros_comuns: ["chamar sem o namespace"],
    exemplos:
      "MathUtils.somar(5,3) → 8\nMathUtils.fatorial(5) → 120",
  },
  {
    id_referencia: "JSO019",
    titulo: "Validar objeto",
    nivel: "intermediario",
    modulo: "Objetos",
    linguagem: "JavaScript",
    descricao:
      "Crie validarUsuario(obj) que verifica campos obrigatórios e tipos corretos.",
    objetivo: "Validar estrutura e tipos de objeto",
    permitidos: ["function", "const", "return", "console.log", "typeof", "if", "array", "push"],
    proibidos: ["class", "loops", "regex"],
    erros_comuns: ["typeof null === 'object'"],
    exemplos:
      'validarUsuario({nome:"Ana",email:"ana@ok.com",idade:25}) → {valido:true,erros:[]}',
  },
  {
    id_referencia: "JSO020",
    titulo: "Cache com objeto",
    nivel: "intermediario",
    modulo: "Objetos",
    linguagem: "JavaScript",
    descricao:
      "Implemente cache simples usando objeto como dicionário: set, get, has, clear.",
    objetivo: "Usar objeto como estrutura chave-valor",
    permitidos: ["const", "console.log", "objeto {}", "hasOwnProperty", "delete", "return"],
    proibidos: ["class", "Map", "loops", "arrays"],
    erros_comuns: ["não verificar hasOwnProperty"],
    exemplos:
      'cache.set("user1", {nome:"Ana"});\ncache.has("user1") → true\ncache.get("user1") → {nome:"Ana"}',
  },

  // ========== AVANÇADO (5) ==========
  {
    id_referencia: "JSO021",
    titulo: "Proxy",
    nivel: "avancado",
    modulo: "Objetos",
    linguagem: "JavaScript",
    descricao:
      "Use Proxy para validação automática: idade entre 0-120, nome string não vazia.",
    objetivo: "Usar Proxy com handler set para validação",
    permitidos: ["const", "console.log", "Proxy", "handler", "set", "get", "throw", "typeof"],
    proibidos: ["class", "loops", "Object.defineProperty"],
    erros_comuns: ["não retornar true no set handler"],
    exemplos:
      "new Proxy({}, validadorHandler);\nusuario.idade = 150; // throw RangeError",
  },
  {
    id_referencia: "JSO022",
    titulo: "Symbol como chave",
    nivel: "avancado",
    modulo: "Objetos",
    linguagem: "JavaScript",
    descricao:
      "Use Symbol para propriedades privadas. Symbol não aparece em Object.keys().",
    objetivo: "Usar Symbol para propriedades únicas",
    permitidos: ["const", "console.log", "Symbol", "objeto {}", "Object.keys", "Object.getOwnPropertySymbols"],
    proibidos: ["class", "loops", "WeakMap"],
    erros_comuns: ["dois Symbol() nunca são iguais"],
    exemplos:
      'const _id = Symbol("id");\nconst obj = {nome:"Ana", [_id]: 123};\nObject.keys(obj) → ["nome"]',
  },
  {
    id_referencia: "JSO023",
    titulo: "Object.defineProperty",
    nivel: "avancado",
    modulo: "Objetos",
    linguagem: "JavaScript",
    descricao:
      "Use Object.defineProperty para criar propriedade não-enumerável e somente-leitura.",
    objetivo: "Controlar descritores de propriedade",
    permitidos: ["const", "console.log", "Object.defineProperty", "Object.getOwnPropertyDescriptor"],
    proibidos: ["class", "loops", "Proxy"],
    erros_comuns: ["confundir writable com configurable"],
    exemplos:
      'Object.defineProperty(obj, "versao", {value:"1.0", writable:false, enumerable:false});',
  },
  {
    id_referencia: "JSO024",
    titulo: "Prototype chain",
    nivel: "avancado",
    modulo: "Objetos",
    linguagem: "JavaScript",
    descricao:
      "Crie objeto animal, crie cachorro com Object.create(animal) e sobrescreva método.",
    objetivo: "Entender prototype chain com Object.create()",
    permitidos: ["const", "console.log", "Object.create", "Object.getPrototypeOf"],
    proibidos: ["class", "new", "loops"],
    erros_comuns: ["confundir __proto__ com prototype"],
    exemplos:
      'const cachorro = Object.create(animal);\ncachorro.falar = function() { return "Au au!" };',
  },
  {
    id_referencia: "JSO025",
    titulo: "Imutabilidade com spread",
    nivel: "avancado",
    modulo: "Objetos",
    linguagem: "JavaScript",
    descricao:
      "Implemente funções puras para atualizar estado aninhado sem mutação.",
    objetivo: "Atualizar estado aninhado de forma imutável",
    permitidos: ["const", "console.log", "arrow function", "...spread", "filter", "includes"],
    proibidos: ["mutação direta", "loops", "class", "push"],
    erros_comuns: ["spread raso não copia objetos aninhados"],
    exemplos:
      'const novo = atualizarEndereco(usuario, "SP");\nusuario.endereco.cidade → "Recife" // original intacto!',
  },

  // ========== DESAFIO (5) ==========
  {
    id_referencia: "JSO026",
    titulo: "ORM simples",
    nivel: "desafio",
    modulo: "Objetos",
    linguagem: "JavaScript",
    descricao:
      "Crie criarTabela() com inserir, buscar, atualizar, deletar, listarTodos.",
    objetivo: "Implementar padrão Repository com closure",
    permitidos: ["function", "const", "return", "console.log", "array", "filter", "find", "map", "objeto {}", "...spread"],
    proibidos: ["class", "var", "loops for/while"],
    erros_comuns: ["não gerar id único"],
    exemplos:
      'const usuarios = criarTabela("usuarios");\nusuarios.inserir({nome:"Ana"}) → {id:1,nome:"Ana"}',
  },
  {
    id_referencia: "JSO027",
    titulo: "Builder pattern",
    nivel: "desafio",
    modulo: "Objetos",
    linguagem: "JavaScript",
    descricao:
      "Implemente Builder para Pedido com métodos encadeáveis: setProduto, setQuantidade, build.",
    objetivo: "Implementar Builder pattern com method chaining",
    permitidos: ["function", "const", "return", "console.log", "this", "objeto {}", "throw"],
    proibidos: ["class", "loops"],
    erros_comuns: ["não retornar this nos métodos"],
    exemplos:
      "criarPedidoBuilder().setProduto('TV',2000).setQuantidade(2).build()\n→ {produto:'TV', total:3650}",
  },
  {
    id_referencia: "JSO028",
    titulo: "Observer com objetos",
    nivel: "desafio",
    modulo: "Objetos",
    linguagem: "JavaScript",
    descricao:
      "Implemente Observer com inscrever, desinscrever, notificar.",
    objetivo: "Implementar Observer pattern com objeto",
    permitidos: ["const", "console.log", "objeto {}", "array", "filter", "forEach", "function"],
    proibidos: ["class", "loops for/while", "variável global"],
    erros_comuns: ["não filtrar no desinscrever"],
    exemplos:
      "const store = criarStore();\nstore.inscrever('mudanca', handler);\nstore.notificar('mudanca', {novo:'valor'})",
  },
  {
    id_referencia: "JSO029",
    titulo: "Schema validator",
    nivel: "desafio",
    modulo: "Objetos",
    linguagem: "JavaScript",
    descricao:
      "Crie criarSchema({campo: {type, required, min, max}}). Retorne método validar(dados).",
    objetivo: "Implementar validador de schema declarativo",
    permitidos: ["function", "const", "return", "console.log", "objeto {}", "Object.entries", "array", "push", "typeof", "forEach"],
    proibidos: ["class", "loops for/while", "regex"],
    erros_comuns: ["não tratar campos opcionais"],
    exemplos:
      'schema.validar({nome:"Ana",idade:25}) → {valido:true,erros:[]}',
  },
  {
    id_referencia: "JSO030",
    titulo: "State machine",
    nivel: "desafio",
    modulo: "Objetos",
    linguagem: "JavaScript",
    descricao:
      "Implemente máquina de estados para pedido: pendente → confirmado → enviado → entregue.",
    objetivo: "Implementar State Machine com objeto de configuração",
    permitidos: ["const", "console.log", "objeto {}", "function", "return", "throw", "array", "includes"],
    proibidos: ["class", "loops", "if/else extenso"],
    erros_comuns: ["não validar transição"],
    exemplos:
      'pedido.estado → "pendente"\npedido.transicionar("confirmar") → "confirmado"',
  },
];

async function main() {
  const { error: delErr } = await supabase
    .from("exercicios")
    .delete()
    .eq("linguagem", "JavaScript")
    .eq("modulo", "Objetos");

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
    .eq("modulo", "Objetos");

  console.log(`📊 Verificação: ${count} exercícios no banco`);
  for (const nivel of ["basico", "intermediario", "avancado", "desafio"]) {
    const { count: n } = await supabase
      .from("exercicios")
      .select("*", { count: "exact", head: true })
      .eq("linguagem", "JavaScript")
      .eq("modulo", "Objetos")
      .eq("nivel", nivel);
    console.log(`  ${nivel}: ${n}`);
  }
}

main().catch(console.error);
