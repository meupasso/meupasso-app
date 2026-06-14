import { createClient } from "@supabase/supabase-js";
import fs from "fs";

const envRaw = fs.readFileSync(".env.local", "utf-8");
const env = {};
envRaw.split("\n").forEach((l) => {
  const t = l.trim(); if (!t || t.startsWith("#")) return;
  const i = t.indexOf("="); if (i === -1) return;
  env[t.slice(0, i).trim()] = t.slice(i + 1).trim();
});
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

const updates = {
  // Projeto 1 – Calculadora Financeira (id: 70699a44-...)
  "70699a44-4313-4233-b48e-ee7fb0447321": [
    { n: 1, t: "Etapa 1 — Métodos básicos", d: `Crie Calculadora.java com quatro métodos estáticos:

public static double somar(double a, double b)
public static double subtrair(double a, double b)
public static double multiplicar(double a, double b)
public static double dividir(double a, double b)
- Se b == 0: exiba "Erro: divisão por zero" e retorne 0

Teste no main():
System.out.printf("somar(10,5) = %.1f%n", Calculadora.somar(10,5));
System.out.printf("dividir(10,0) = %.1f%n", Calculadora.dividir(10,0));

Saída esperada:
somar(10, 5) = 15.0
subtrair(10, 5) = 5.0
multiplicar(10, 5) = 50.0
dividir(10, 5) = 2.0
dividir(10, 0) = Erro: divisão por zero`, dk: 'Use static para métodos da classe. Verifique divisão por zero com if (b == 0) antes de dividir. Use System.out.printf("%.2f%n", valor) para formatar decimais.' },
    { n: 2, t: "Etapa 2 — Juros simples e compostos", d: `Adicione dois métodos financeiros:

public static double jurosSimples(double capital, double taxa, int tempo)
- Fórmula: M = C * (1 + (taxa/100) * tempo)

public static double jurosCompostos(double capital, double taxa, int tempo)
- Fórmula: M = C * Math.pow(1 + taxa/100, tempo)

Teste com capital=1000, taxa=5%, tempo=3.

Saída esperada:
Capital: R$ 1000,00
Taxa: 5,0% | Tempo: 3 períodos
Juros Simples:   R$ 1150,00
Juros Compostos: R$ 1157,63
Diferença: R$ 7,63`, dk: 'Use Math.pow(base, expoente) para potência. taxa/100 funciona corretamente com double. Formate com printf("R$ %.2f%n", valor).' },
    { n: 3, t: "Etapa 3 — Calculadora de parcelas", d: `Adicione o método:

public static double calcularParcela(double valor, int nParcelas, double taxaMensal)
- Se nParcelas <= 0: exiba erro e retorne 0
- Se taxaMensal == 0: retorne valor / nParcelas
- Caso contrário: total = valor * (1 + (taxaMensal/100) * nParcelas)
  retorne total / nParcelas

Teste:
calcularParcela(1200, 12, 2.0) → Total: R$ 1488,00, Parcela: R$ 124,00
calcularParcela(600, 3, 0) → R$ 200,00 (sem juros)
calcularParcela(500, 0, 1) → Erro: número inválido`, dk: 'Valide nParcelas com if (nParcelas <= 0). Para taxa zero use if (taxaMensal == 0.0). Calcule total primeiro, depois divida.' },
    { n: 4, t: "Etapa 4 — Calculadora de desconto", d: `Adicione dois métodos:

public static double[] calcularDesconto(double preco, double percentual)
- Se percentual < 0 ou > 100: exiba erro e retorne null
- Retorne array double[]{valorDesconto, precoFinal}

public static double precoParceladoComDesconto(double preco, int parcelas, double taxa, double desconto)
- Use calcularDesconto() primeiro, depois calcularParcela()

Teste:
calcularDesconto(500, 15) → Desconto: R$ 75,00, Preço final: R$ 425,00
precoParceladoComDesconto(500, 6, 2, 10) → Parcela: R$ 84,00`, dk: 'Em Java retorne double[]. Valide percentual com if (percentual < 0 || percentual > 100). Para acessar: res[0] e res[1].' },
    { n: 5, t: "Etapa 5 — Menu interativo completo", d: `Una tudo em um menu com Scanner e while:

Calculadora Financeira
1. Juros Simples
2. Juros Compostos
3. Calculadora de Parcelas
4. Calcular Desconto
0. Sair

Leia opção com scanner.nextInt(). Para cada opção peça dados e chame o método correspondente. Opção 0: break.

Estrutura final:
Calculadora.java
├── somar(), subtrair(), multiplicar(), dividir()
├── jurosSimples(), jurosCompostos()
├── calcularParcela()
├── calcularDesconto(), precoParceladoComDesconto()
└── main() com menu Scanner`, dk: 'Crie o Scanner fora do while. Use switch(opcao) para o menu. Use sc.nextLine() após nextInt() para limpar buffer.' },
  ],
  // Projeto 2 – Sistema de Cadastro de Clientes
  "ce06c358-73a1-47b3-b3fb-46fd54a04be4": [
    { n: 1, t: "Etapa 1 — Estrutura de dados", d: `Crie Cadastro.java com três ArrayLists paralelos:
ArrayList<String> nomes = new ArrayList<>();
ArrayList<String> emails = new ArrayList<>();
ArrayList<String> telefones = new ArrayList<>();

Métodos:
- cadastrar(nome, email, tel): add() nos três + confirmação
- listarTodos(): se vazio avise, senão exiba formatado com índice

Teste cadastrando 3 clientes e listando.`, dk: 'ArrayLists paralelos: índice 0 de nomes corresponde ao índice 0 de emails. Para listar use for (int i = 0; i < nomes.size(); i++). Use printf para formatar.' },
    { n: 2, t: "Etapa 2 — Busca e validação", d: `Adicione:
- int buscarPorNome(String nome): retorna índice ou -1 (case insensitive)
- boolean emailValido(String email): contém "@" e "." após "@"

Atualize cadastrar() para validar email e evitar duplicatas.
Erro: já existe um cliente com o nome "Ana Silva"
Erro: email "anagmail.com" é inválido`, dk: 'Use equalsIgnoreCase() para busca. email.contains("@") e email.split("@")[1].contains(".") para validação.' },
    { n: 3, t: "Etapa 3 — Atualizar e remover", d: `Adicione:
- void atualizarTelefone(String nome, String novoTelefone)
- void removerCliente(String nome)

Use buscarPorNome() para índice. Remova dos três ArrayLists com remove(indice).
Teste: atualizar telefone e remover um cliente.`, dk: 'Remova dos três na mesma ordem. Para set: telefones.set(idx, novoValor).' },
    { n: 4, t: "Etapa 4 — Persistência em CSV", d: `Adicione salvarCSV() e carregarCSV() com FileWriter/BufferedReader.
Formato: "nome,email,telefone" por linha.
Use try-with-resources. Trate FileNotFoundException.
Teste: salve, limpe listas, carregue e confirme.`, dk: 'Use split(",") ao ler. Trate FileNotFoundException primeiro. Use .trim() nos dados lidos.' },
    { n: 5, t: "Etapa 5 — Menu completo", d: `Menu com Scanner e while:
1. Cadastrar cliente
2. Buscar cliente
3. Listar todos
4. Atualizar telefone
5. Remover cliente
0. Salvar e sair

Carregue CSV ao iniciar. Salve ao sair.`, dk: 'Use sc.nextLine() após nextInt(). Na opção 0 salve antes do break.' },
  ],
  // Projeto 3 – Jogo de Adivinhação
  "341005ca-6087-479a-afe7-930fa7e5ab29": [
    { n: 1, t: "Etapa 1 — Lógica básica do jogo", d: `Crie Jogo.java com jogarRodada(min, max, tentativasMax):
- Sorteie com Random
- Loop de palpites com Scanner
- Alto demais! / Baixo demais! / Acertou!
- Retorne tentativas usadas ou -1 se perder.`, dk: 'Random: int segredo = new Random().nextInt(max - min + 1) + min.' },
    { n: 2, t: "Etapa 2 — Sistema de pontuação", d: `calcularPontos(tentativasUsadas, tentativasMax, dificuldade):
- (tentativasMax - tentativasUsadas + 1) * 100 * fator
- fácil → *1, médio → *2, difícil → *3
- Perdeu → 0`, dk: 'Use switch(dificuldade) para fator. Separe responsabilidades.' },
    { n: 3, t: "Etapa 3 — Níveis de dificuldade", d: `definirDificuldade() retorna int[] {min, max, tentativas}:
1. Fácil (1-50, 10), 2. Médio (1-100, 7), 3. Difícil (1-200, 5)
Inválido → padrão médio.`, dk: 'Retorne new int[]{1, 100, 7}. Acesse com config[0], config[1], config[2].' },
    { n: 4, t: "Etapa 4 — Ranking", d: `Dois ArrayLists paralelos + arquivo. Formato "nome:pontos".
atualizarRanking(): carregue, some, salve.
exibirRanking(): ordenação bubble sort nos dois, exiba top 5.`, dk: 'Sort dois ArrayLists trocando em ambos. Trate FileNotFoundException.' },
    { n: 5, t: "Etapa 5 — Jogo completo com menu", d: `Menu: 1-Jogar, 2-Ranking, 0-Sair.
Opção 1: pedir nome, dificuldade, jogar, pontuar, ranking, perguntar "jogar novamente?".
Estrutura final completa com todos os métodos.`, dk: 'Use sc.next() para ler s/n. Loop interno para jogar novamente.' },
  ],
  // Projeto 4 – Sistema de Biblioteca
  "3dfd6114-48bb-4784-9630-c890abb8d288": [
    { n: 1, t: "Etapa 1 — Classe Livro", d: `Crie Livro.java com atributos privados: titulo, autor, isbn, disponivel.
Construtor define disponivel = true.
toString() mostra status: ✅ Disponível / ❌ Emprestado.
Getters e setter apenas para disponivel.`, dk: 'Use @Override para toString(). Operador ternário para status.' },
    { n: 2, t: "Etapa 2 — Classe Usuario", d: `Usuario.java com nome, cpf, ArrayList<Livro> livrosEmprestados.
Métodos: pegarEmprestado(), devolver(), listarEmprestimos().
toString() formatado com nome e quantidade.`, dk: 'ArrayList<Livro> armazena objetos. remove() compara por referência.' },
    { n: 3, t: "Etapa 3 — Classe Biblioteca", d: `Biblioteca.java com ArrayList<Livro> e ArrayList<Usuario>.
Métodos: cadastrarLivro(), cadastrarUsuario(), buscarLivro(), buscarUsuario(), listarAcervo(), listarUsuarios().`, dk: 'busca case insensitive. Inicialize ArrayLists no construtor.' },
    { n: 4, t: "Etapa 4 — Empréstimo e devolução", d: `emprestarLivro(String titulo, String cpf):
- Buscar livro e usuário, validar disponível
- setDisponivel(false), usuario.pegarEmprestado(livro)

devolverLivro(String titulo, String cpf) e listarDisponiveis().`, dk: 'Verifique null após buscar. contains() para ver se usuário tem o livro.' },
    { n: 5, t: "Etapa 5 — Sistema completo com menu", d: `Main.java com menu e 3 livros + 2 usuários pré-cadastrados.
Opções: cadastrar, emprestar, devolver, listar acervo/disponíveis/usuários.
Estrutura: Livro.java, Usuario.java, Biblioteca.java, Main.java.`, dk: 'Separe em 4 arquivos .java. Scanner como static.' },
  ],
  // Projeto 5 – Gerenciador de Tarefas (Java)
  "659fc8b5-503e-461a-9016-30a299484dd3": [
    { n: 1, t: "Etapa 1 — Classe Tarefa", d: `Tarefa.java com id, titulo, descricao, prioridade, categoria, status, dataCriacao.
static contadorId para IDs únicos.
Método validarPrioridade() — padrão "media" se inválido.
toString() com 🔴/🟡/🟢 baseado na prioridade.
Getters para todos, setter status via concluir().`, dk: 'static int contadorId funciona como variável de classe. java.time.LocalDate.now() para data.' },
    { n: 2, t: "Etapa 2 — GerenciadorTarefas", d: `GerenciadorTarefas.java com ArrayList<Tarefa>.
Métodos: adicionarTarefa(), buscarPorId(), concluirTarefa(), listarTarefas().`, dk: 'buscarPorId() reutilizado em concluirTarefa(). Evite código duplicado.' },
    { n: 3, t: "Etapa 3 — Filtros", d: `Adicione: filtrarPorPrioridade(), filtrarPorCategoria(), filtrarPorStatus(), ordenarPorPrioridade().
Crie cópia para ordenar sem modificar original.`, dk: 'Collections.sort() com lambda: (a,b) -> ordem[a.getPrioridade()] - ordem[b.getPrioridade()].' },
    { n: 4, t: "Etapa 4 — Relatório", d: `relatorio() com total, concluídas vs pendentes, %, distribuição por prioridade e categoria.
Use ArrayLists paralelas para categorias.`, dk: 'Para percentual use int para evitar casas decimais. indexOf() para buscar categoria.' },
    { n: 5, t: "Etapa 5 — Persistência e menu", d: `salvarTarefas() e carregarTarefas() em arquivo.
Formato: id|titulo|desc|prioridade|categoria|status|data
Menu completo no Main. Estrutura: Tarefa.java, GerenciadorTarefas.java, Main.java.`, dk: 'Adicione método setContador() estático em Tarefa. Use | como separador (mais seguro que vírgula).' },
  ],
};

async function main() {
  let total = 0;
  for (const [projetoId, etapas] of Object.entries(updates)) {
    for (const e of etapas) {
      const { error } = await supabase
        .from("etapas_projeto")
        .update({ titulo: e.t, descricao: e.d, dica_tutor: e.dk })
        .eq("projeto_id", projetoId)
        .eq("numero", e.n);
      if (error) console.error(`Erro ${projetoId.slice(0,8)} etapa ${e.n}:`, error.message);
      else { total++; console.log(`✅ ${projetoId.slice(0,8)} — Etapa ${e.n}`); }
    }
  }
  console.log(`\n🎉 ${total}/25 etapas atualizadas`);
}
main().catch(console.error);
