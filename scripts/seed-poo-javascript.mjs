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
    id_referencia: "JSP001",
    titulo: "Primeira classe",
    nivel: "basico",
    modulo: "POO",
    linguagem: "JavaScript",
    descricao:
      "Crie a classe Pessoa com constructor(nome, idade) e método apresentar() que exibe 'Olá, sou [nome] e tenho [idade] anos.'",
    objetivo: "Criar classe com constructor e método",
    permitidos: ["class", "constructor", "this", "console.log", "new", "template literal"],
    proibidos: ["function", "objeto literal", "prototype", "arrow function no método"],
    erros_comuns: ["esquecer new", "usar function em vez de class", "esquecer this"],
    exemplos:
      'const ana = new Pessoa("Ana", 25);\nana.apresentar() → "Olá, sou Ana e tenho 25 anos."',
  },
  {
    id_referencia: "JSP002",
    titulo: "Getters e setters",
    nivel: "basico",
    modulo: "POO",
    linguagem: "JavaScript",
    descricao:
      "Crie classe Circulo com #raio privado, getter area, getter perimetro e setter raio que valida valor positivo.",
    objetivo: "Usar campos privados # e get/set",
    permitidos: ["class", "constructor", "#campo privado", "get", "set", "Math.PI", "**", "throw", "new"],
    proibidos: ["function", "objeto literal", "prototype"],
    erros_comuns: ["getter chamado com ()", "campo privado sem #", "não validar no setter"],
    exemplos:
      "const c = new Circulo(5);\nc.area → 78.54\nc.perimetro → 31.42\nc.raio = -1 → throw Error",
  },
  {
    id_referencia: "JSP003",
    titulo: "Método estático",
    nivel: "basico",
    modulo: "POO",
    linguagem: "JavaScript",
    descricao:
      "Crie classe MathUtils com métodos estáticos: somar(a,b), media(...nums), ehPrimo(n).",
    objetivo: "Usar static para métodos de classe",
    permitidos: ["class", "static", "return", "console.log", "for", "Math", "reduce", "...rest"],
    proibidos: ["constructor", "new", "this", "objeto literal"],
    erros_comuns: ["tentar usar this em método static", "instanciar classe para chamar static"],
    exemplos:
      "MathUtils.somar(3,5) → 8\nMathUtils.media(1,2,3,4,5) → 3\nMathUtils.ehPrimo(7) → true",
  },
  {
    id_referencia: "JSP004",
    titulo: "toString e valueOf",
    nivel: "basico",
    modulo: "POO",
    linguagem: "JavaScript",
    descricao:
      "Crie classe Produto com nome e preco. Implemente toString() e valueOf() para exibição e comparação numérica.",
    objetivo: "Sobrescrever toString() e valueOf()",
    permitidos: ["class", "constructor", "toString", "valueOf", "this", "new", "template literal", "console.log"],
    proibidos: ["function", "objeto literal", "static"],
    erros_comuns: ["confundir toString com valueOf", "não chamar automaticamente"],
    exemplos:
      'const tv = new Produto("TV", 2000);\n`${tv}` → "TV: R$2000.00"\ntv > 1000 → true (valueOf retorna preco)',
  },
  {
    id_referencia: "JSP005",
    titulo: "Contador de instâncias",
    nivel: "basico",
    modulo: "POO",
    linguagem: "JavaScript",
    descricao:
      "Crie classe Conexao com campo estático #total. Cada instância incrementa o contador. Método estático getTotalConexoes().",
    objetivo: "Usar campo estático para compartilhar estado entre instâncias",
    permitidos: ["class", "constructor", "static", "#campo", "this", "new", "console.log"],
    proibidos: ["function", "objeto literal", "variável global"],
    erros_comuns: ["usar campo de instância em vez de estático", "não inicializar campo estático"],
    exemplos:
      "const c1 = new Conexao();\nconst c2 = new Conexao();\nConexao.getTotalConexoes() → 2",
  },
  {
    id_referencia: "JSP006",
    titulo: "Herança básica",
    nivel: "basico",
    modulo: "POO",
    linguagem: "JavaScript",
    descricao:
      "Crie classe Animal com nome e som. Crie Cachorro extends Animal com método latir(). Use super() no constructor.",
    objetivo: "Usar extends e super()",
    permitidos: ["class", "extends", "super", "constructor", "this", "new", "console.log", "template literal"],
    proibidos: ["function", "objeto literal", "prototype"],
    erros_comuns: ["esquecer super() antes de this", "chamar super() incorretamente"],
    exemplos:
      'const rex = new Cachorro("Rex");\nrex.latir() → "Rex faz: Au au!"\nrex instanceof Animal → true',
  },
  {
    id_referencia: "JSP007",
    titulo: "Override de método",
    nivel: "basico",
    modulo: "POO",
    linguagem: "JavaScript",
    descricao:
      "Crie classe Forma com area() retornando 0. Crie Retangulo e Circulo que sobrescrevem area(). Teste polimorfismo.",
    objetivo: "Sobrescrever métodos da classe pai",
    permitidos: ["class", "extends", "super", "constructor", "this", "new", "Math.PI", "**", "*", "console.log"],
    proibidos: ["function", "objeto literal", "prototype"],
    erros_comuns: ["não chamar super() no constructor", "sobrescrever errado"],
    exemplos:
      "const r = new Retangulo(4,5);\nr.area() → 20\nconst c = new Circulo(3);\nc.area() → 28.27",
  },
  {
    id_referencia: "JSP008",
    titulo: "instanceof e verificação de tipo",
    nivel: "basico",
    modulo: "POO",
    linguagem: "JavaScript",
    descricao:
      "Crie hierarquia: Veiculo → Carro e Moto. Use instanceof para verificar tipos e função polimórfica.",
    objetivo: "Usar instanceof e polimorfismo",
    permitidos: ["class", "extends", "super", "constructor", "this", "new", "instanceof", "if", "else if", "console.log"],
    proibidos: ["function", "objeto literal", "typeof"],
    erros_comuns: ["instanceof na ordem errada", "verificar tipo em vez de comportamento"],
    exemplos:
      'const c = new Carro("Toyota");\nc instanceof Carro → true\nc instanceof Veiculo → true\nc instanceof Moto → false',
  },
  {
    id_referencia: "JSP009",
    titulo: "Classe abstrata simulada",
    nivel: "basico",
    modulo: "POO",
    linguagem: "JavaScript",
    descricao:
      "Simule classe abstrata Funcionario que lança erro em calcularSalario(). Crie CLT e PJ que implementam.",
    objetivo: "Simular classe abstrata lançando erro no método base",
    permitidos: ["class", "extends", "super", "constructor", "this", "new", "throw", "Error", "console.log"],
    proibidos: ["function", "objeto literal", "interface"],
    erros_comuns: ["não lançar erro na classe base", "esquecer implementar nas filhas"],
    exemplos:
      'new Funcionario("Ana").calcularSalario() → throw\nnew CLT("Ana",3000).calcularSalario() → 2670\nnew PJ("João",5000).calcularSalario() → 5000',
  },
  {
    id_referencia: "JSP010",
    titulo: "Mixin pattern",
    nivel: "basico",
    modulo: "POO",
    linguagem: "JavaScript",
    descricao:
      "Crie mixins Nadador e Corredor. Aplique ambos em Triatleta usando Object.assign no prototype.",
    objetivo: "Usar mixin para composição de comportamentos",
    permitidos: ["class", "constructor", "this", "new", "Object.assign", "prototype", "console.log", "objeto literal"],
    proibidos: ["function", "extends", "super"],
    erros_comuns: ["confundir mixin com herança", "ordem de assign sobrescrevendo"],
    exemplos:
      'const t = new Triatleta("Ana");\nt.nadar() → "Ana está nadando"\nt.correr() → "Ana está correndo"',
  },

  // ========== INTERMEDIÁRIO (10) ==========
  {
    id_referencia: "JSP011",
    titulo: "Encapsulamento completo",
    nivel: "intermediario",
    modulo: "POO",
    linguagem: "JavaScript",
    descricao:
      "Crie ContaBancaria com #saldo privado. Métodos: depositar, sacar, transferir, extrato. Validar todos os valores.",
    objetivo: "Implementar encapsulamento com campos privados",
    permitidos: ["class", "constructor", "#campo", "get", "this", "new", "throw", "console.log", "if", "toFixed"],
    proibidos: ["function", "objeto literal", "saldo público"],
    erros_comuns: ["saldo público permitindo modificação direta", "não validar saque"],
    exemplos:
      "const c = new ContaBancaria('Ana', 1000);\nc.depositar(500);\nc.sacar(200);\nc.saldo → 1300\nc.sacar(2000) → throw",
  },
  {
    id_referencia: "JSP012",
    titulo: "Herança múltipla com mixin",
    nivel: "intermediario",
    modulo: "POO",
    linguagem: "JavaScript",
    descricao:
      "Crie mixins Serializable (toJSON, fromJSON) e Validatable (validar). Aplique em Usuario.",
    objetivo: "Compor comportamentos com múltiplos mixins",
    permitidos: ["class", "constructor", "this", "new", "Object.assign", "prototype", "JSON.stringify", "JSON.parse", "console.log"],
    proibidos: ["extends", "super", "function"],
    erros_comuns: ["mixins sobrescrevendo métodos uns dos outros"],
    exemplos:
      'const u = new Usuario("Ana", "ana@ok.com");\nu.toJSON() → \'{"nome":"Ana","email":"ana@ok.com"}\'\nu.validar() → {valido:true}',
  },
  {
    id_referencia: "JSP013",
    titulo: "Padrão Strategy",
    nivel: "intermediario",
    modulo: "POO",
    linguagem: "JavaScript",
    descricao:
      "Implemente calculadora de frete com Strategy. Classes: FreteCorreios, FreteFedEx, FreteRetirada. Pedido recebe estratégia.",
    objetivo: "Implementar Strategy pattern com classes",
    permitidos: ["class", "constructor", "this", "new", "console.log", "return", "*"],
    proibidos: ["function", "objeto literal", "if/else para tipo de frete"],
    erros_comuns: ["hardcodar tipo de frete em Pedido", "não usar interface comum"],
    exemplos:
      "const p = new Pedido(10, new FreteCorreios());\np.calcularFrete() → R$25.00\np.setEstrategia(new FreteFedEx());\np.calcularFrete() → R$45.00",
  },
  {
    id_referencia: "JSP014",
    titulo: "Padrão Singleton",
    nivel: "intermediario",
    modulo: "POO",
    linguagem: "JavaScript",
    descricao:
      "Implemente Singleton para Configuracoes com campo estático privado. Apenas uma instância.",
    objetivo: "Implementar Singleton com campo estático privado",
    permitidos: ["class", "constructor", "static", "#campo", "this", "throw", "console.log", "new"],
    proibidos: ["function", "objeto literal", "variável global"],
    erros_comuns: ["não verificar instância existente", "não usar campo estático"],
    exemplos:
      "const c1 = Configuracoes.getInstance();\nconst c2 = Configuracoes.getInstance();\nc1 === c2 → true\nnew Configuracoes() → throw",
  },
  {
    id_referencia: "JSP015",
    titulo: "Iterator personalizado",
    nivel: "intermediario",
    modulo: "POO",
    linguagem: "JavaScript",
    descricao:
      "Crie classe Intervalo com from e to. Implemente [Symbol.iterator] para iterar com for...of.",
    objetivo: "Implementar protocolo Iterator com Symbol.iterator",
    permitidos: ["class", "constructor", "this", "new", "Symbol.iterator", "for...of", "console.log", "return", "let"],
    proibidos: ["function", "objeto literal", "generator"],
    erros_comuns: ["não retornar {value, done}", "não implementar next()"],
    exemplos:
      "const r = new Intervalo(1, 5);\nfor (const n of r) console.log(n);\n→ 1 2 3 4 5\n[...r] → [1,2,3,4,5]",
  },
  {
    id_referencia: "JSP016",
    titulo: "Padrão Observer com classes",
    nivel: "intermediario",
    modulo: "POO",
    linguagem: "JavaScript",
    descricao:
      "Implemente Observer com classes: EventEmitter, PainelEstoque, AlertaEmail e AlertaSMS.",
    objetivo: "Implementar Observer com herança de classes",
    permitidos: ["class", "extends", "super", "constructor", "this", "new", "Map", "forEach", "console.log"],
    proibidos: ["function", "objeto literal", "variável global"],
    erros_comuns: ["não chamar super()", "Map vs objeto para eventos"],
    exemplos:
      'const estoque = new PainelEstoque();\nestoque.emit("baixo", {produto:"TV"}) → alertas disparados',
  },
  {
    id_referencia: "JSP017",
    titulo: "Classe genérica Stack",
    nivel: "intermediario",
    modulo: "POO",
    linguagem: "JavaScript",
    descricao:
      "Implemente classe Stack (pilha) com: push, pop, peek, isEmpty, size, toString.",
    objetivo: "Implementar estrutura de dados com classe",
    permitidos: ["class", "constructor", "#campo", "this", "new", "array", "console.log", "return", "throw"],
    proibidos: ["function", "objeto literal", "acesso direto ao array interno"],
    erros_comuns: ["pop sem verificar se vazia", "peek retornando cópia vs referência"],
    exemplos:
      "const s = new Stack();\ns.push(1); s.push(2); s.push(3);\ns.peek() → 3\ns.pop() → 3\ns.size() → 2",
  },
  {
    id_referencia: "JSP018",
    titulo: "Herança em cadeia",
    nivel: "intermediario",
    modulo: "POO",
    linguagem: "JavaScript",
    descricao:
      "Crie hierarquia: Veiculo → VeiculoMotorizado → Carro → CarroEletrico. Cada nível adiciona propriedades.",
    objetivo: "Implementar herança em múltiplos níveis",
    permitidos: ["class", "extends", "super", "constructor", "this", "new", "console.log", "template literal"],
    proibidos: ["function", "objeto literal", "mixin"],
    erros_comuns: ["super() com argumentos errados"],
    exemplos:
      'const tesla = new CarroEletrico("Tesla", 2023, "Elétrico", 400);\ntesla.descrever() → "Tesla 2023 | Motor: Elétrico | Autonomia: 400km"',
  },
  {
    id_referencia: "JSP019",
    titulo: "Padrão Decorator com classes",
    nivel: "intermediario",
    modulo: "POO",
    linguagem: "JavaScript",
    descricao:
      "Implemente sistema de café com Decorator: Cafe, ComLeite, ComAcucar, ComChantilly. Encadeáveis.",
    objetivo: "Implementar Decorator pattern com classes",
    permitidos: ["class", "extends", "constructor", "super", "this", "new", "return", "console.log", "toFixed"],
    proibidos: ["function", "objeto literal", "if/else para ingredientes"],
    erros_comuns: ["não encadear decoradores", "preço não acumulando"],
    exemplos:
      'const cafe = new ComChantilly(new ComLeite(new Cafe()));\ncafe.descricao() → "Café, Leite, Chantilly"\ncafe.preco() → R$8.50',
  },
  {
    id_referencia: "JSP020",
    titulo: "Sistema escolar com POO",
    nivel: "intermediario",
    modulo: "POO",
    linguagem: "JavaScript",
    descricao:
      "Implemente: Pessoa, Aluno (com notas, media), Professor (disciplina). Turma gerencia Alunos.",
    objetivo: "Modelar sistema real com hierarquia de classes",
    permitidos: ["class", "extends", "super", "constructor", "this", "new", "array", "reduce", "console.log", "toFixed"],
    proibidos: ["function", "objeto literal", "mixin"],
    erros_comuns: ["super() sem todos os argumentos", "médias calculadas errado"],
    exemplos:
      "const ana = new Aluno('Ana', '20260001');\nana.adicionarNota(8.5);\nana.media() → 7.75\nana.situacao() → 'Aprovada'",
  },

  // ========== AVANÇADO (5) ==========
  {
    id_referencia: "JSP021",
    titulo: "Classe LinkedList",
    nivel: "avancado",
    modulo: "POO",
    linguagem: "JavaScript",
    descricao:
      "Implemente lista encadeada com classes No e LinkedList. Métodos: append, prepend, delete, search, toArray, size.",
    objetivo: "Implementar estrutura de dados complexa com POO",
    permitidos: ["class", "constructor", "this", "new", "null", "while", "return", "console.log", "array"],
    proibidos: ["function", "objeto literal", "array JS como base"],
    erros_comuns: ["perder referência ao deletar", "não atualizar head ao deletar primeiro"],
    exemplos:
      "const list = new LinkedList();\nlist.append(1); list.append(2); list.prepend(0);\nlist.toArray() → [0,1,2]",
  },
  {
    id_referencia: "JSP022",
    titulo: "Padrão Command",
    nivel: "avancado",
    modulo: "POO",
    linguagem: "JavaScript",
    descricao:
      "Implemente Command pattern para editor de texto: Inserir, Deletar, Substituir com execute() e undo().",
    objetivo: "Implementar Command pattern com undo/redo",
    permitidos: ["class", "extends", "super", "constructor", "this", "new", "array", "push", "pop", "console.log"],
    proibidos: ["function", "objeto literal", "mixin"],
    erros_comuns: ["undo sem salvar estado anterior", "não manter histórico"],
    exemplos:
      'editor.executar(new Inserir("Olá"));\neditor.executar(new Inserir(" Mundo"));\neditor.texto → "Olá Mundo"\neditor.desfazer();\neditor.texto → "Olá"',
  },
  {
    id_referencia: "JSP023",
    titulo: "Padrão Template Method",
    nivel: "avancado",
    modulo: "POO",
    linguagem: "JavaScript",
    descricao:
      "Implemente gerador de relatórios com Template Method. RelatorioPDF e RelatorioHTML sobrescrevem partes.",
    objetivo: "Implementar Template Method pattern",
    permitidos: ["class", "extends", "super", "constructor", "this", "new", "throw", "console.log", "template literal"],
    proibidos: ["function", "objeto literal", "mixin"],
    erros_comuns: ["sobrescrever o template em vez das partes"],
    exemplos:
      "new RelatorioPDF().gerar() → cabeçalho → dados em PDF → rodapé\nnew RelatorioHTML().gerar() → <html>...</html>",
  },
  {
    id_referencia: "JSP024",
    titulo: "Herança vs Composição",
    nivel: "avancado",
    modulo: "POO",
    linguagem: "JavaScript",
    descricao:
      "Implemente sistema de personagens de jogo com herança e com composição. Compare os dois.",
    objetivo: "Comparar herança e composição na prática",
    permitidos: ["class", "extends", "super", "constructor", "this", "new", "objeto literal", "console.log"],
    proibidos: ["function", "mixin", "prototype"],
    erros_comuns: ["herança muito profunda", "composição sem interface comum"],
    exemplos:
      '// Herança\nnew Guerreiro("Thorin").atacar() → "Thorin usa espada: 50 dano"\n// Composição\nconst heroi = criarPersonagem("Aria", [habilidadeArco]);',
  },
  {
    id_referencia: "JSP025",
    titulo: "Framework mini ORM com classes",
    nivel: "avancado",
    modulo: "POO",
    linguagem: "JavaScript",
    descricao:
      "Implemente mini ORM: Model com static create, findAll, findById, update, delete. Usuario extends Model.",
    objetivo: "Implementar Active Record pattern com classes",
    permitidos: ["class", "extends", "super", "constructor", "this", "static", "new", "array", "filter", "find", "map", "console.log"],
    proibidos: ["function", "objeto literal", "banco de dados real"],
    erros_comuns: ["misturar static com instância", "não herdar repositório corretamente"],
    exemplos:
      'const ana = Usuario.create({nome:"Ana", email:"ana@ok.com"});\nUsuario.findAll() → [{id:1, nome:"Ana",...}]',
  },

  // ========== DESAFIO (5) ==========
  {
    id_referencia: "JSP026",
    titulo: "Sistema bancário completo",
    nivel: "desafio",
    modulo: "POO",
    linguagem: "JavaScript",
    descricao:
      "Implemente ContaBancaria, ContaCorrente (cheque especial), ContaPoupanca (rendimento). Banco gerencia contas.",
    objetivo: "Sistema complexo com hierarquia e regras de negócio",
    permitidos: ["class", "extends", "super", "constructor", "#campo", "this", "new", "throw", "console.log", "toFixed", "array"],
    proibidos: ["function", "objeto literal", "mixin"],
    erros_comuns: ["saldo público", "não tratar cheque especial"],
    exemplos:
      "const cc = new ContaCorrente('Ana', 1000, 500);\ncc.sacar(1200) → usa cheque especial\ncc.saldo → -200\ncc.limite → 500",
  },
  {
    id_referencia: "JSP027",
    titulo: "Game engine básico",
    nivel: "desafio",
    modulo: "POO",
    linguagem: "JavaScript",
    descricao:
      "Crie engine de jogo RPG: Entity, Player, Enemy, Item. Batalha com turnos, vida, ataque, defesa, itens e XP.",
    objetivo: "Sistema de jogo com múltiplas classes interagindo",
    permitidos: ["class", "extends", "super", "constructor", "#campo", "this", "new", "Math.random", "Math.floor", "array", "console.log"],
    proibidos: ["function", "objeto literal", "prototype"],
    erros_comuns: ["dano negativo", "não verificar se está vivo antes de atacar"],
    exemplos:
      'const player = new Player("Herói", {vida:100, ataque:20, defesa:10});\nplayer.atacar(goblin) → "Herói causou 15 de dano!"',
  },
  {
    id_referencia: "JSP028",
    titulo: "Pipeline de processamento",
    nivel: "desafio",
    modulo: "POO",
    linguagem: "JavaScript",
    descricao:
      "Implemente Pipeline de dados: Pipeline, Stage, FilterStage, TransformStage, ValidateStage. Encadeáveis com pipe().",
    objetivo: "Pipeline pattern com herança e composição",
    permitidos: ["class", "extends", "super", "constructor", "this", "new", "array", "filter", "map", "reduce", "console.log"],
    proibidos: ["function", "objeto literal", "prototype"],
    erros_comuns: ["stages não encadeando", "dados mutados entre stages"],
    exemplos:
      "const pipeline = new Pipeline()\n  .pipe(new FilterStage(x => x.ativo))\n  .pipe(new TransformStage(x => ({...x, nome: x.nome.toUpperCase()})));\npipeline.processar(dados)",
  },
  {
    id_referencia: "JSP029",
    titulo: "Sistema de plugins",
    nivel: "desafio",
    modulo: "POO",
    linguagem: "JavaScript",
    descricao:
      "Implemente sistema de plugins: App com registerPlugin, use. Plugins são classes com install(app).",
    objetivo: "Arquitetura extensível com padrão Plugin",
    permitidos: ["class", "constructor", "this", "new", "Map", "console.log", "throw", "array"],
    proibidos: ["function", "objeto literal", "prototype"],
    erros_comuns: ["plugin não tendo acesso ao app", "conflito de nomes"],
    exemplos:
      'const app = new App();\napp.registerPlugin(new LoggerPlugin());\napp.use("logger").log("iniciando") → "[LOG] iniciando"',
  },
  {
    id_referencia: "JSP030",
    titulo: "Framework reativo com classes",
    nivel: "desafio",
    modulo: "POO",
    linguagem: "JavaScript",
    descricao:
      "Implemente mini framework reativo: Observable (subscribe, next, error, complete), Subject, map e filter.",
    objetivo: "Implementar padrão RxJS básico com classes",
    permitidos: ["class", "constructor", "this", "new", "array", "forEach", "filter", "map", "console.log", "try", "catch"],
    proibidos: ["function", "objeto literal", "prototype", "Promise"],
    erros_comuns: ["não implementar complete", "map/filter não retornando Observable"],
    exemplos:
      "const obs = new Observable(sub => { sub.next(1); sub.next(2); sub.complete(); });\nobs.map(x => x*2).filter(x => x > 2).subscribe({next: console.log}) → 4",
  },
];

async function main() {
  const { error: delErr } = await supabase
    .from("exercicios")
    .delete()
    .eq("linguagem", "JavaScript")
    .eq("modulo", "POO");

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
    .eq("modulo", "POO");

  console.log(`📊 Verificação: ${count} exercícios no banco`);
  for (const nivel of ["basico", "intermediario", "avancado", "desafio"]) {
    const { count: n } = await supabase
      .from("exercicios")
      .select("*", { count: "exact", head: true })
      .eq("linguagem", "JavaScript")
      .eq("modulo", "POO")
      .eq("nivel", nivel);
    console.log(`  ${nivel}: ${n}`);
  }
}

main().catch(console.error);
