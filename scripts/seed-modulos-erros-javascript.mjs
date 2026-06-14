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
    id_referencia: "JSM001",
    titulo: "Try/catch básico",
    nivel: "basico",
    modulo: "Módulos e Erros",
    linguagem: "JavaScript",
    descricao: "Crie código que tenta converter string inválida em número e usa try/catch para tratar o erro graciosamente.",
    objetivo: "Usar try/catch para capturar erros",
    permitidos: ["try", "catch", "console.log", "console.error", "throw", "Number", "isNaN"],
    proibidos: ["loops", "funções", "class", "finally"],
    erros_comuns: ["catch sem parâmetro de erro", "não exibir mensagem útil"],
    exemplos:
      'try {\n  const n = Number("abc");\n  if (isNaN(n)) throw new Error("Número inválido");\n  console.log(n);\n} catch(e) {\n  console.error("Erro:", e.message);\n}',
  },
  {
    id_referencia: "JSM002",
    titulo: "Finally",
    nivel: "basico",
    modulo: "Módulos e Erros",
    linguagem: "JavaScript",
    descricao: "Simule abertura de conexão com banco. Use try/catch/finally onde finally sempre fecha a conexão.",
    objetivo: "Usar finally para limpeza garantida",
    permitidos: ["try", "catch", "finally", "console.log", "let", "const", "throw"],
    proibidos: ["loops", "class", "Promise", "async"],
    erros_comuns: ["não usar finally", "finally executando antes do catch"],
    exemplos:
      'let conexao = null;\ntry {\n  conexao = abrirConexao();\n} catch(e) {\n  console.error(e.message);\n} finally {\n  if (conexao) fecharConexao();\n  console.log("Conexão fechada.");\n}',
  },
  {
    id_referencia: "JSM003",
    titulo: "Tipos de erro",
    nivel: "basico",
    modulo: "Módulos e Erros",
    linguagem: "JavaScript",
    descricao: "Demonstre TypeError, ReferenceError e RangeError. Use try/catch para capturar cada um.",
    objetivo: "Conhecer tipos de erro do JavaScript",
    permitidos: ["try", "catch", "console.log", "const", "null", "undefined"],
    proibidos: ["loops", "funções", "class", "throw"],
    erros_comuns: ["confundir tipos de erro", "não usar erro.constructor.name"],
    exemplos:
      'try { null.nome } catch(e) { console.log(e.constructor.name) } → TypeError\ntry { varInexistente } catch(e) { console.log(e.constructor.name) } → ReferenceError',
  },
  {
    id_referencia: "JSM004",
    titulo: "Throw personalizado",
    nivel: "basico",
    modulo: "Módulos e Erros",
    linguagem: "JavaScript",
    descricao: "Crie função dividir(a, b) que lança erro personalizado se b for zero.",
    objetivo: "Lançar erros com throw",
    permitidos: ["function", "throw", "new Error", "try", "catch", "console.log", "if", "==="],
    proibidos: ["loops", "class", "Promise", "async"],
    erros_comuns: ["throw string em vez de Error", "não capturar onde necessário"],
    exemplos:
      'function dividir(a, b) {\n  if (b === 0) throw new Error("Divisão por zero");\n  return a / b;\n}\ntry { dividir(10, 0) } catch(e) { console.error(e.message) }',
  },
  {
    id_referencia: "JSM005",
    titulo: "Error properties",
    nivel: "basico",
    modulo: "Módulos e Erros",
    linguagem: "JavaScript",
    descricao: "Capture um erro e exiba suas propriedades: message, name, stack.",
    objetivo: "Explorar propriedades do objeto Error",
    permitidos: ["try", "catch", "console.log", "throw", "new Error", "const"],
    proibidos: ["loops", "funções", "class", "Promise"],
    erros_comuns: ["stack não disponível em todos os ambientes"],
    exemplos:
      'try {\n  throw new Error("Algo deu errado");\n} catch(e) {\n  console.log(e.name) → "Error"\n  console.log(e.message) → "Algo deu errado"\n  console.log(e.stack) → "Error:..."',
  },
  {
    id_referencia: "JSM006",
    titulo: "Export nomeado",
    nivel: "basico",
    modulo: "Módulos e Erros",
    linguagem: "JavaScript",
    descricao: "Crie módulo matematica.js com export de funções. Importe nomeadamente.",
    objetivo: "Usar export e import nomeados",
    permitidos: ["export", "import", "function", "const", "console.log", "return"],
    proibidos: ["export default", "require", "module.exports", "class"],
    erros_comuns: ["esquecer chaves no import", "caminho de importação errado"],
    exemplos:
      '// matematica.js\nexport function somar(a,b) { return a+b; }\nexport const PI = 3.14159;\n\n// index.js\nimport { somar, PI } from "./matematica.js";\nconsole.log(somar(2,3)) → 5',
  },
  {
    id_referencia: "JSM007",
    titulo: "Export default",
    nivel: "basico",
    modulo: "Módulos e Erros",
    linguagem: "JavaScript",
    descricao: "Crie módulo calculadora.js com export default. Importe com nome customizado.",
    objetivo: "Diferenciar export default de export nomeado",
    permitidos: ["export default", "import", "const", "objeto {}", "console.log", "function"],
    proibidos: ["export nomeado", "require", "class"],
    erros_comuns: ["chaves no import de default", "dois export default"],
    exemplos:
      "// calculadora.js\nexport default { somar: (a,b) => a+b, subtrair: (a,b) => a-b };\n\nimport calc from './calculadora.js';\ncalc.somar(5,3) → 8",
  },
  {
    id_referencia: "JSM008",
    titulo: "Import * as",
    nivel: "basico",
    modulo: "Módulos e Erros",
    linguagem: "JavaScript",
    descricao: "Importe todos os exports usando import * as namespace.",
    objetivo: "Usar namespace import com * as",
    permitidos: ["export", "import * as", "const", "function", "console.log"],
    proibidos: ["export default", "require", "class"],
    erros_comuns: ["tentar usar * as com export default"],
    exemplos:
      '// utils.js\nexport const versao = "1.0";\nexport function log(msg) { console.log(msg); }\n\n// index.js\nimport * as Utils from "./utils.js";\nUtils.log(Utils.versao) → "1.0"',
  },
  {
    id_referencia: "JSM009",
    titulo: "Re-export",
    nivel: "basico",
    modulo: "Módulos e Erros",
    linguagem: "JavaScript",
    descricao: "Crie arquivo index.js que re-exporta funções como barrel file.",
    objetivo: "Usar re-export para criar barrel file",
    permitidos: ["export { } from", "import", "function", "const"],
    proibidos: ["export default", "require", "class"],
    erros_comuns: ["importar e exportar em vez de re-exportar direto"],
    exemplos:
      '// index.js (barrel)\nexport { somar } from "./matematica.js";\nexport { maiusculo } from "./strings.js";',
  },
  {
    id_referencia: "JSM010",
    titulo: "Import dinâmico",
    nivel: "basico",
    modulo: "Módulos e Erros",
    linguagem: "JavaScript",
    descricao: "Use import() dinâmico para carregar módulo condicionalmente.",
    objetivo: "Usar import() dinâmico com async/await",
    permitidos: ["import()", "async", "await", "console.log", "const", "if", "try", "catch"],
    proibidos: ["import estático", "require", "class"],
    erros_comuns: ["import() sem await", "não acessar .default"],
    exemplos:
      'async function carregarModulo(tipo) {\n  if (tipo === "math") {\n    const { somar } = await import("./matematica.js");\n    return somar(2,3);\n  }\n}',
  },

  // ========== INTERMEDIÁRIO (10) ==========
  {
    id_referencia: "JSM011",
    titulo: "Classe de erro customizada",
    nivel: "intermediario",
    modulo: "Módulos e Erros",
    linguagem: "JavaScript",
    descricao: "Crie classes ValidationError, NotFoundError, NetworkError. Cada uma com código específico.",
    objetivo: "Criar hierarquia de erros personalizados",
    permitidos: ["class", "extends", "super", "constructor", "this", "new", "throw", "instanceof"],
    proibidos: ["function", "objeto literal", "loops"],
    erros_comuns: ["não chamar super(message)", "name não atualizado"],
    exemplos:
      'class ValidationError extends Error {\n  constructor(campo, msg) {\n    super(msg);\n    this.name = "ValidationError";\n    this.campo = campo;\n  }\n}',
  },
  {
    id_referencia: "JSM012",
    titulo: "Error boundary pattern",
    nivel: "intermediario",
    modulo: "Módulos e Erros",
    linguagem: "JavaScript",
    descricao: "Implemente withErrorBoundary(fn) que retorna {sucesso, dados, erro}.",
    objetivo: "Implementar error boundary como HOF",
    permitidos: ["function", "const", "try", "catch", "return", "objeto {}", "console.log", "arrow function"],
    proibidos: ["class", "loops", "throw", "Promise"],
    erros_comuns: ["não retornar objeto consistente"],
    exemplos:
      "const seguro = withErrorBoundary(dividir);\nseguro(10, 2) → {sucesso:true, dados:5, erro:null}\nseguro(10, 0) → {sucesso:false, dados:null, erro:'Divisão por zero'}",
  },
  {
    id_referencia: "JSM013",
    titulo: "Módulo de configuração",
    nivel: "intermediario",
    modulo: "Módulos e Erros",
    linguagem: "JavaScript",
    descricao: "Crie módulo config.js com export const. Crie validarConfig().",
    objetivo: "Organizar configurações em módulo dedicado",
    permitidos: ["export const", "export function", "import", "const", "throw", "if"],
    proibidos: ["export default", "require", "class", "loops"],
    erros_comuns: ["exportar objeto mutável"],
    exemplos:
      '// config.js\nexport const DB_URL = "postgresql://...";\nexport const PORT = 3000;\nexport function validarConfig() {\n  if (!DB_URL) throw new Error("DB_URL obrigatório");\n}',
  },
  {
    id_referencia: "JSM014",
    titulo: "Logger modular",
    nivel: "intermediario",
    modulo: "Módulos e Erros",
    linguagem: "JavaScript",
    descricao: "Crie módulo logger.js com info, warn, error, debug prefixados com nível e timestamp.",
    objetivo: "Criar módulo utilitário reutilizável",
    permitidos: ["export", "import", "const", "function", "console.log", "console.warn", "console.error", "Date", "template literal"],
    proibidos: ["class", "export default", "require"],
    erros_comuns: ["não incluir timestamp"],
    exemplos:
      'import { info } from "./logger.js";\ninfo("Servidor iniciado") → [INFO 2026-06-13T...] Servidor iniciado',
  },
  {
    id_referencia: "JSM015",
    titulo: "Encadeamento de erros",
    nivel: "intermediario",
    modulo: "Módulos e Erros",
    linguagem: "JavaScript",
    descricao: "Implemente busca de usuário que encadeia erros usando {cause}.",
    objetivo: "Usar Error cause para rastreamento de erros",
    permitidos: ["function", "const", "throw", "new Error", "try", "catch", "objeto {}", "{ cause }"],
    proibidos: ["class", "loops", "Promise", "async"],
    erros_comuns: ["perder contexto do erro original"],
    exemplos:
      'try { buscarUsuario(999); }\ncatch(e) { throw new Error("Falha ao processar", { cause: e }); }',
  },
  {
    id_referencia: "JSM016",
    titulo: "Módulo de validação",
    nivel: "intermediario",
    modulo: "Módulos e Erros",
    linguagem: "JavaScript",
    descricao: "Crie módulo validacoes.js com funções de validação retornando {valido, mensagem}.",
    objetivo: "Criar módulo com funções puras de validação",
    permitidos: ["export", "import", "function", "const", "return", "objeto {}", "regex", "test", "length"],
    proibidos: ["class", "export default", "throw", "try/catch"],
    erros_comuns: ["regex incorreto", "não retornar mensagem de erro"],
    exemplos:
      'export function validarEmail(email) {\n  const valido = /^[^@]+@[^@]+\\.[^@]+$/.test(email);\n  return {valido, mensagem: valido ? "" : "Email inválido"};\n}',
  },
  {
    id_referencia: "JSM017",
    titulo: "Pattern resultado",
    nivel: "intermediario",
    modulo: "Módulos e Erros",
    linguagem: "JavaScript",
    descricao: "Implemente padrão Result: funções ok() e err(). Evita throw para controle de fluxo.",
    objetivo: "Usar Result pattern como alternativa ao try/catch",
    permitidos: ["function", "const", "return", "objeto {}", "console.log", "arrow function", "if", "else"],
    proibidos: ["class", "throw", "try", "catch", "loops"],
    erros_comuns: ["não verificar isOk antes de acessar valor"],
    exemplos:
      "const ok = valor => ({isOk:true, valor, erro:null});\nconst err = msg => ({isOk:false, valor:null, erro:msg});\n\ndividir(10,2) → {isOk:true, valor:5, erro:null}",
  },
  {
    id_referencia: "JSM018",
    titulo: "Módulos circulares",
    nivel: "intermediario",
    modulo: "Módulos e Erros",
    linguagem: "JavaScript",
    descricao: "Demonstre problema de importação circular e refatore para remover.",
    objetivo: "Entender e resolver dependências circulares",
    permitidos: ["export", "import", "function", "const"],
    proibidos: ["class", "require", "loops", "try/catch"],
    erros_comuns: ["não identificar a circularidade"],
    exemplos:
      "// Problema: a.js → b.js → a.js\n// Solução: c.js com dependência compartilhada",
  },
  {
    id_referencia: "JSM019",
    titulo: "Global error handler",
    nivel: "intermediario",
    modulo: "Módulos e Erros",
    linguagem: "JavaScript",
    descricao: "Implemente handler global para erros não capturados no Node.js.",
    objetivo: "Capturar erros globais no Node.js",
    permitidos: ["process.on", "console.error", "console.log", "const", "function"],
    proibidos: ["class", "loops", "try/catch local"],
    erros_comuns: ["não fazer cleanup antes de sair"],
    exemplos:
      'process.on("uncaughtException", (err) => {\n  console.error("Erro não capturado:", err.message);\n  process.exit(1);\n});',
  },
  {
    id_referencia: "JSM020",
    titulo: "Módulo de formatação",
    nivel: "intermediario",
    modulo: "Módulos e Erros",
    linguagem: "JavaScript",
    descricao: "Crie módulo formato.js com formatarMoeda, formatarData, formatarTelefone, formatarCPF.",
    objetivo: "Criar módulo utilitário de formatação",
    permitidos: ["export", "import", "function", "const", "template literal", "toFixed", "replace", "Intl"],
    proibidos: ["class", "export default", "throw", "loops"],
    erros_comuns: ["não tratar entrada inválida"],
    exemplos:
      'formatarMoeda(1234.56, "BRL") → "R$ 1.234,56"\nformatarCPF("12345678901") → "123.456.789-01"\nformatarTelefone("81999999999") → "(81) 99999-9999"',
  },

  // ========== AVANÇADO (5) ==========
  {
    id_referencia: "JSM021",
    titulo: "Sistema de plugins com módulos",
    nivel: "avancado",
    modulo: "Módulos e Erros",
    linguagem: "JavaScript",
    descricao: "Sistema onde plugins são módulos carregados com import() dinâmico.",
    objetivo: "Usar import() dinâmico para sistema de plugins",
    permitidos: ["import()", "export", "async", "await", "const", "function", "try", "catch"],
    proibidos: ["class", "require", "loops for/while"],
    erros_comuns: ["não aguardar import()"],
    exemplos:
      'async function carregarPlugin(caminho) {\n  const plugin = await import(caminho);\n  plugin.init(app);\n}',
  },
  {
    id_referencia: "JSM022",
    titulo: "Middleware de erros",
    nivel: "avancado",
    modulo: "Módulos e Erros",
    linguagem: "JavaScript",
    descricao: "Implemente pipeline de middlewares com tratamento de erros Express-like.",
    objetivo: "Implementar middleware pattern com tratamento de erros",
    permitidos: ["function", "const", "array", "forEach", "try", "catch", "throw"],
    proibidos: ["class", "loops while", "Promise", "async"],
    erros_comuns: ["não chamar next()", "não diferenciar middleware de erro"],
    exemplos:
      "app.use(autenticar);\napp.use(validar);\napp.useError((err, req, res, next) => {\n  res.status = 500;\n  res.body = err.message;\n});",
  },
  {
    id_referencia: "JSM023",
    titulo: "Retry com backoff",
    nivel: "avancado",
    modulo: "Módulos e Erros",
    linguagem: "JavaScript",
    descricao: "Implemente retry(fn, tentativas, delayMs) com backoff exponencial.",
    objetivo: "Implementar retry pattern com backoff",
    permitidos: ["async", "await", "function", "const", "try", "catch", "throw", "Promise", "setTimeout", "for"],
    proibidos: ["class", "while"],
    erros_comuns: ["não aumentar delay exponencialmente"],
    exemplos:
      "async function retry(fn, tentativas=3, delay=1000) {\n  for (let i=0; i<tentativas; i++) {\n    try { return await fn(); }\n    catch(e) { if (i === tentativas-1) throw e; await esperar(delay * 2**i); }\n  }\n}",
  },
  {
    id_referencia: "JSM024",
    titulo: "Módulo de eventos assíncronos",
    nivel: "avancado",
    modulo: "Módulos e Erros",
    linguagem: "JavaScript",
    descricao: "Crie módulo eventBus.js com pub/sub assíncrono.",
    objetivo: "Implementar pub/sub assíncrono como módulo",
    permitidos: ["export", "import", "async", "await", "Promise", "Map", "array", "forEach", "try", "catch"],
    proibidos: ["class", "require", "loops for/while"],
    erros_comuns: ["não aguardar handlers assíncronos"],
    exemplos:
      "const handlers = new Map();\nexport async function publish(evento, dados) {\n  const fns = handlers.get(evento) || [];\n  await Promise.allSettled(fns.map(fn => fn(dados)));\n}",
  },
  {
    id_referencia: "JSM025",
    titulo: "Circuit breaker",
    nivel: "avancado",
    modulo: "Módulos e Erros",
    linguagem: "JavaScript",
    descricao: "Implemente Circuit Breaker: após N falhas, abre por X segundos.",
    objetivo: "Implementar Circuit Breaker pattern",
    permitidos: ["function", "const", "let", "throw", "Date.now", "try", "catch", "objeto {}"],
    proibidos: ["class", "loops", "Promise", "async"],
    erros_comuns: ["não rastrear tempo de abertura"],
    exemplos:
      "const cb = criarCircuitBreaker(servico, {maxFalhas:3, timeoutMs:5000});\n// após 3 falhas → 'Circuito aberto'",
  },

  // ========== DESAFIO (5) ==========
  {
    id_referencia: "JSM026",
    titulo: "Framework de testes unitários",
    nivel: "desafio",
    modulo: "Módulos e Erros",
    linguagem: "JavaScript",
    descricao: "Implemente mini framework: describe, it, expect com toBe, toEqual, toThrow.",
    objetivo: "Criar framework de testes do zero",
    permitidos: ["function", "const", "try", "catch", "throw", "console.log", "array", "JSON.stringify"],
    proibidos: ["class", "import", "Promise", "async"],
    erros_comuns: ["toEqual com referência em vez de valor"],
    exemplos:
      'describe("Calculadora", () => {\n  it("soma", () => {\n    expect(somar(2,3)).toBe(5);\n  });\n});\n// ✅ 1 teste passou',
  },
  {
    id_referencia: "JSM027",
    titulo: "Sistema de log com módulos",
    nivel: "desafio",
    modulo: "Módulos e Erros",
    linguagem: "JavaScript",
    descricao: "Sistema de log modular: core, formatters, transports. Combináveis.",
    objetivo: "Arquitetura modular com separação de responsabilidades",
    permitidos: ["export", "import", "function", "const", "objeto {}", "array", "JSON.stringify", "Date"],
    proibidos: ["class", "require dinâmico", "loops while"],
    erros_comuns: ["acoplamento entre módulos"],
    exemplos:
      'import { criarLogger } from "./core.js";\nconst log = criarLogger({formatter:formatJSON, transport:consoleTransport});\nlog.info("Servidor iniciado")',
  },
  {
    id_referencia: "JSM028",
    titulo: "Dependency injection com módulos",
    nivel: "desafio",
    modulo: "Módulos e Erros",
    linguagem: "JavaScript",
    descricao: "Implemente DI container: register(nome, factory), get(nome). Resolução automática.",
    objetivo: "Implementar DI container com módulos",
    permitidos: ["function", "const", "Map", "objeto {}", "array", "try", "catch", "throw"],
    proibidos: ["class", "require", "loops while"],
    erros_comuns: ["não resolver dependências transitivas"],
    exemplos:
      'container.register("db", () => criarDB());\ncontainer.register("userService", (userRepo) => criarUserService(userRepo));\nconst service = container.get("userService");',
  },
  {
    id_referencia: "JSM029",
    titulo: "Error monitoring",
    nivel: "desafio",
    modulo: "Módulos e Erros",
    linguagem: "JavaScript",
    descricao: "Sistema de monitoramento: capturar, categorizar, contar, alertar acima de threshold.",
    objetivo: "Sistema completo de tratamento e monitoramento de erros",
    permitidos: ["function", "const", "Map", "array", "try", "catch", "throw", "Date", "objeto {}"],
    proibidos: ["class", "require", "loops while", "Promise"],
    erros_comuns: ["threshold global em vez de por tipo"],
    exemplos:
      "monitor.capturar(erro);\nmonitor.estatisticas() → {TypeError:5, total:7}\nmonitor.onThreshold('TypeError', 3, () => alerta())",
  },
  {
    id_referencia: "JSM030",
    titulo: "SDK modular",
    nivel: "desafio",
    modulo: "Módulos e Erros",
    linguagem: "JavaScript",
    descricao: "SDK para API fictícia com autenticação, usuários, produtos. Erros customizados e retry.",
    objetivo: "Arquitetura completa de SDK com módulos",
    permitidos: ["export", "import", "async", "await", "function", "const", "try", "catch", "throw", "class extends Error", "Promise", "Map"],
    proibidos: ["require", "loops while", "variável global"],
    erros_comuns: ["não reutilizar lógica de retry"],
    exemplos:
      'const api = criarSDK({baseUrl:"https://api.exemplo.com", token:"xxx"});\nconst usuario = await api.usuarios.buscar(1);',
  },
];

async function main() {
  const { error: delErr } = await supabase
    .from("exercicios")
    .delete()
    .eq("linguagem", "JavaScript")
    .eq("modulo", "Módulos e Erros");

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
    .eq("modulo", "Módulos e Erros");

  console.log(`📊 Verificação: ${count} exercícios no banco`);
  for (const nivel of ["basico", "intermediario", "avancado", "desafio"]) {
    const { count: n } = await supabase
      .from("exercicios")
      .select("*", { count: "exact", head: true })
      .eq("linguagem", "JavaScript")
      .eq("modulo", "Módulos e Erros")
      .eq("nivel", nivel);
    console.log(`  ${nivel}: ${n}`);
  }
}

main().catch(console.error);
