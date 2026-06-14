import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envRaw = fs.readFileSync(path.join(__dirname, "..", ".env.local"), "utf-8");
const env = {};
envRaw.split("\n").forEach((line) => {
  const t = line.trim(); if (!t || t.startsWith("#")) return;
  const idx = t.indexOf("="); if (idx === -1) return;
  env[t.slice(0, idx).trim()] = t.slice(idx + 1).trim();
});
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

const projetos = [
  {
    titulo: "Calculadora Financeira",
    descricao: "Construa uma calculadora financeira completa com funções para calcular juros simples, juros compostos, parcelas e desconto. Cada operação em uma função separada com menu interativo.",
    linguagem: "Python", nivel: "intermediario", ordem: 1,
    etapas: [
      { numero: 1, titulo: "Funções básicas", descricao: "Crie funções separadas para: soma(a,b), subtracao(a,b), multiplicacao(a,b) e divisao(a,b). A divisão deve tratar divisão por zero. Teste cada uma.", dica_tutor: "Comece com funções simples que retornam valores. Use return, não print dentro das funções. Para divisão por zero, use if b == 0: return 'Erro: divisão por zero'", ordem: 1 },
      { numero: 2, titulo: "Juros simples e compostos", descricao: "Crie juros_simples(capital, taxa, tempo) que retorna o montante. Crie juros_compostos(capital, taxa, tempo) usando a fórmula M = C*(1+i)^n. Exiba os dois resultados para comparação.", dica_tutor: "Lembre-se: taxa está em percentual, divida por 100. Juros simples: M = C * (1 + taxa * t). Juros compostos: M = C * (1 + taxa)**t", ordem: 2 },
      { numero: 3, titulo: "Calculadora de parcelas", descricao: "Crie calcular_parcela(valor, n_parcelas, taxa_mensal) que retorna o valor de cada parcela com juros simples. Trate casos de 0 parcelas e taxa 0.", dica_tutor: "Valor total = valor * (1 + taxa * n). Parcela = valor_total / n. Trate n == 0 antes de dividir.", ordem: 3 },
      { numero: 4, titulo: "Calculadora de desconto", descricao: "Crie calcular_desconto(preco, percentual) que retorna o preço final. Valide que o percentual está entre 0 e 100.", dica_tutor: "Desconto = preco * percentual / 100. Preço final = preco - desconto. Use if para validar 0 <= percentual <= 100.", ordem: 4 },
      { numero: 5, titulo: "Menu interativo", descricao: "Una todas as funções em um menu while com opções: 1-Juros Simples, 2-Juros Compostos, 3-Parcelas, 4-Desconto, 0-Sair.", dica_tutor: "Use while True: com if/elif para cada opção e break para sair. Peça os dados necessários dentro de cada opção.", ordem: 5 },
    ]
  },
  {
    titulo: "Sistema de Cadastro de Clientes", linguagem: "Python", nivel: "intermediario", ordem: 2,
    descricao: "Construa um sistema completo de cadastro usando listas paralelas e funções. Operações: cadastrar, buscar, listar, atualizar e remover clientes. Dados salvos em arquivo CSV.",
    etapas: [
      { numero: 1, titulo: "Estrutura de dados", descricao: "Crie três listas paralelas: nomes[], emails[] e telefones[]. Crie funções cadastrar() e listar_todos().", dica_tutor: "Listas paralelas = mesmo índice nas três listas representa o mesmo cliente. Ex: nomes[0], emails[0], telefones[0].", ordem: 1 },
      { numero: 2, titulo: "Busca e validação", descricao: "Crie buscar_por_nome(nome) que retorna índice ou -1. Crie email_valido(email).", dica_tutor: "Use um loop for com enumerate para buscar. if email.count('@') == 1 and email.count('.') >= 1.", ordem: 2 },
      { numero: 3, titulo: "Atualizar e remover", descricao: "Crie atualizar_telefone(nome, novo_tel) e remover_cliente(nome).", dica_tutor: "Use buscar_por_nome() para achar o índice. Depois atualize ou use del para remover das três listas.", ordem: 3 },
      { numero: 4, titulo: "Persistência em arquivo", descricao: "Crie salvar_csv() e carregar_csv() usando o módulo csv.", dica_tutor: "import csv. Com writerow() salve linha por linha. Com reader() carregue. Use try/except FileNotFoundError.", ordem: 4 },
      { numero: 5, titulo: "Menu completo", descricao: "Una tudo em menu while com todas as opções. Carregue ao iniciar e salve após cada operação.", dica_tutor: "Chame carregar_csv() antes do menu e salvar_csv() após cada alteração. Mantenha o menu rodando com while True.", ordem: 5 },
    ]
  },
  {
    titulo: "Jogo de Adivinhação Avançado", linguagem: "Python", nivel: "intermediario", ordem: 3,
    descricao: "Construa um jogo completo com níveis de dificuldade, sistema de pontuação, ranking dos melhores jogadores e opção de jogar novamente.",
    etapas: [
      { numero: 1, titulo: "Lógica básica do jogo", descricao: "Crie jogar_rodada(min, max, tentativas) que sorteia número, lê palpites e retorna tentativas usadas ou -1.", dica_tutor: "Use import random e random.randint(min, max). Compare o palpite com o número sorteado e diga alto/baixo.", ordem: 1 },
      { numero: 2, titulo: "Sistema de pontuação", descricao: "Crie calcular_pontos(tentativas, max, dificuldade). Fácil=1, Médio=2, Difícil=3.", dica_tutor: "Pontos = (max_tentativas - usadas + 1) * fator_dificuldade. Quanto menos tentativas, mais pontos.", ordem: 2 },
      { numero: 3, titulo: "Níveis de dificuldade", descricao: "Crie definir_dificuldade(nivel) que retorna tupla (min, max, tentativas).", dica_tutor: "Use if/elif para escolher o nível. Retorne uma tupla com os 3 valores. Fácil: 1-50, 10 tentativas.", ordem: 3 },
      { numero: 4, titulo: "Ranking de jogadores", descricao: "Crie dicionário ranking. Salve e carregue em arquivo.", dica_tutor: "ranking = {}. Para salvar: escreva nome: pontos linha por linha. Para carregar: leia e split(':').", ordem: 4 },
      { numero: 5, titulo: "Jogo completo", descricao: "Una tudo: menu, ranking persistente, jogar novamente.", dica_tutor: "Peça nome do jogador uma vez. Acumule pontos no ranking. Após cada partida pergunte se quer continuar.", ordem: 5 },
    ]
  },
  {
    titulo: "Gerenciador de Tarefas", linguagem: "Python", nivel: "avancado", ordem: 4,
    descricao: "Construa um gerenciador de tarefas com prioridades, categorias, status e filtros. Use dicionários para estruturar os dados e persistência em arquivo.",
    etapas: [
      { numero: 1, titulo: "Estrutura da tarefa", descricao: "Cada tarefa é um dicionário: id, titulo, descricao, prioridade, categoria, status, data_criacao. Crie criar_tarefa().", dica_tutor: "Use um contador global para IDs. Dicionário exemplo: {'id':1,'titulo':'...','status':'pendente'}.", ordem: 1 },
      { numero: 2, titulo: "Operações básicas", descricao: "Crie adicionar_tarefa(), listar_tarefas(), buscar_por_id() e concluir_tarefa().", dica_tutor: "buscar_por_id usa for para achar pelo id. concluir_tarefa altera o status para 'concluida'.", ordem: 2 },
      { numero: 3, titulo: "Filtros e ordenação", descricao: "Crie filtrar e ordenar funções.", dica_tutor: "Use list comprehension: [t for t in tarefas if t['prioridade']=='alta'].", ordem: 3 },
      { numero: 4, titulo: "Estatísticas", descricao: "Crie relatorio() com total, concluídas, distribuição.", dica_tutor: "Use for para contar. Um contador por status, outro por prioridade.", ordem: 4 },
      { numero: 5, titulo: "Persistência e menu", descricao: "Salve em formato próprio. Menu completo. Carregue ao iniciar.", dica_tutor: "Para persistir sem JSON, formate como string: '1;titulo;desc;alta;trabalho;pendente' e quebre em linhas.", ordem: 5 },
    ]
  },
  {
    titulo: "Sistema de Notas Escolares", linguagem: "Python", nivel: "avancado", ordem: 5,
    descricao: "Construa um sistema escolar completo com classes Aluno, Disciplina e Turma. Cadastro, notas, médias e boletim.",
    etapas: [
      { numero: 1, titulo: "Classe Aluno", descricao: "Crie classe Aluno com nome, matricula, notas (dict). Métodos: adicionar_nota(), media_disciplina(), media_geral().", dica_tutor: "Use __init__ para inicializar. notas é dict: {'Matemática':[8.0,7.5]}. média = sum(lista)/len(lista).", ordem: 1 },
      { numero: 2, titulo: "Classe Disciplina", descricao: "Crie classe Disciplina com nome, carga_horaria, professor. métodos __str__().", dica_tutor: "Crie 5 disciplinas fixas: Matemática, Português, Ciências, História, Inglês.", ordem: 2 },
      { numero: 3, titulo: "Classe Turma", descricao: "Crie Turma com lista de Alunos. Métodos: matricular(), buscar(), listar(), media_turma().", dica_tutor: "media_turma() soma media_geral() de cada aluno e divide pelo total.", ordem: 3 },
      { numero: 4, titulo: "Boletim", descricao: "Crie gerar_boletim(aluno) formatado com situação: Aprovado>=7, Recuperação>=4, Reprovado.", dica_tutor: "Use f-strings e separadores. Para cada disciplina, exiba as notas e a média. Média geral decide situação.", ordem: 4 },
      { numero: 5, titulo: "Sistema completo", descricao: "Menu completo com 3 alunos pré-cadastrados. Ranking por média.", dica_tutor: "Pré-cadastre alunos fixos no início do programa. Para ranking, use sorted(alunos, key=lambda a: a.media_geral(), reverse=True).", ordem: 5 },
    ]
  },
];

// Java versions
const javaProjetos = [
  {
    titulo: "Calculadora Financeira",
    descricao: "Construa uma calculadora financeira completa com métodos para calcular juros simples, compostos, parcelas e desconto com menu interativo em Java.",
    linguagem: "Java", nivel: "intermediario", ordem: 6,
    etapas: [
      { numero: 1, titulo: "Métodos básicos", descricao: "Crie métodos estáticos: somar(a,b), subtrair(a,b), multiplicar(a,b), dividir(a,b). Dividir deve tratar divisão por zero.", dica_tutor: "Métodos static: public static double somar(double a, double b).", ordem: 1 },
      { numero: 2, titulo: "Juros simples e compostos", descricao: "Crie jurosSimples(capital, taxa, tempo) e jurosCompostos(capital, taxa, tempo) usando Math.pow.", dica_tutor: "Math.pow(1+taxa, tempo) para potência. Lembre de converter taxa percentual.", ordem: 2 },
      { numero: 3, titulo: "Calculadora de parcelas", descricao: "Crie calcularParcela(valor, n, taxa) que retorna valor da parcela com juros simples.", dica_tutor: "Trate n==0 com if. Parcela = valorTotal / n.", ordem: 3 },
      { numero: 4, titulo: "Calculadora de desconto", descricao: "Crie calcularDesconto(preco, percentual) validando 0-100%.", dica_tutor: "Use if para validar. Desconto = preco * percentual / 100.", ordem: 4 },
      { numero: 5, titulo: "Menu interativo", descricao: "Menu com switch: 1-Juros, 2-Parcelas, 3-Desconto, 0-Sair. Use Scanner.", dica_tutor: "Use do-while ou while com switch. Scanner para ler entradas.", ordem: 5 },
    ]
  },
  {
    titulo: "Sistema de Cadastro de Clientes (Java)", linguagem: "Java", nivel: "intermediario", ordem: 7,
    descricao: "Sistema de cadastro usando ArrayList de objetos Cliente. CRUD completo com persistência em arquivo CSV.",
    etapas: [
      { numero: 1, titulo: "Classe Cliente", descricao: "Crie classe Cliente com atributos privados nome, email, telefone e getters/setters.", dica_tutor: "Encapsulamento padrão Java: atributos private + getters/setters públicos.", ordem: 1 },
      { numero: 2, titulo: "ArrayList de Clientes", descricao: "Use ArrayList<Cliente>. Crie cadastrar(), listarTodos().", dica_tutor: "import java.util.ArrayList; ArrayList<Cliente> clientes = new ArrayList<>();", ordem: 2 },
      { numero: 3, titulo: "Busca e validação", descricao: "Crie buscarPorNome() e validarEmail().", dica_tutor: "Use for com if. Email: contains(\"@\") && contains(\".\").", ordem: 3 },
      { numero: 4, titulo: "Persistência em CSV", descricao: "Salve e carregue clientes em CSV com try/catch.", dica_tutor: "Use FileWriter e Scanner para ler arquivo. try/catch FileNotFoundException.", ordem: 4 },
      { numero: 5, titulo: "Menu completo", descricao: "Menu interativo com todas as opções em while.", dica_tutor: "Use switch dentro de while(true).", ordem: 5 },
    ]
  },
  {
    titulo: "Jogo de Adivinhação (Java)", linguagem: "Java", nivel: "intermediario", ordem: 8,
    descricao: "Jogo completo com dificuldades, pontuação, ranking em Java.",
    etapas: [
      { numero: 1, titulo: "Lógica do jogo", descricao: "Crie jogarRodada(min, max, tentativas) com Random.", dica_tutor: "Random rand = new Random(); int sorteado = rand.nextInt(max-min+1)+min;", ordem: 1 },
      { numero: 2, titulo: "Níveis e pontuação", descricao: "Crie níveis de dificuldade e sistema de pontos.", dica_tutor: "Use constantes para níveis. Pontos por dificuldade.", ordem: 2 },
      { numero: 3, titulo: "Ranking", descricao: "Crie HashMap<String,Integer> para ranking. Persista em arquivo.", dica_tutor: "HashMap<String,Integer> ranking = new HashMap<>();", ordem: 3 },
    ]
  },
  {
    titulo: "Sistema de Biblioteca (Java)", linguagem: "Java", nivel: "avancado", ordem: 9,
    descricao: "Sistema com classes Livro, Usuario, Emprestimo usando ArrayList e composição.",
    etapas: [
      { numero: 1, titulo: "Classes principais", descricao: "Crie classes Livro e Usuario com encapsulamento.", dica_tutor: "Composição: Biblioteca tem ArrayList de Livros.", ordem: 1 },
      { numero: 2, titulo: "Sistema de empréstimo", descricao: "Implemente emprestar e devolver livros.", dica_tutor: "Use boolean disponivel em Livro.", ordem: 2 },
      { numero: 3, titulo: "Menu e relatórios", descricao: "Menu completo com relatório de empréstimos ativos.", dica_tutor: "Listar apenas livros com disponivel == false.", ordem: 3 },
    ]
  },
  {
    titulo: "Gerenciador de Tarefas (Java)", linguagem: "Java", nivel: "avancado", ordem: 10,
    descricao: "Gerenciador de tarefas com classe Tarefa, ArrayList, filtros e relatório.",
    etapas: [
      { numero: 1, titulo: "Classe Tarefa", descricao: "Crie classe Tarefa com atributos e encapsulamento.", dica_tutor: "Use String para prioridade e status.", ordem: 1 },
      { numero: 2, titulo: "Operações", descricao: "ArrayList<Tarefa>. Adicionar, listar, concluir, buscar.", dica_tutor: "Use for each para listar, for com índice para buscar por ID.", ordem: 2 },
      { numero: 3, titulo: "Filtros e estatísticas", descricao: "Filtre por prioridade e status. Relatório completo.", dica_tutor: "Use ArrayList temporário para filtros. Contadores em for.", ordem: 3 },
    ]
  },
];

async function main() {
  await supabase.from("etapas_projeto").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("projetos").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  console.log("🗑️  Tabelas limpas.");

  const todosProjetos = [...projetos, ...javaProjetos];
  let total = 0;
  for (const p of todosProjetos) {
    const { data: proj, error: err } = await supabase.from("projetos").insert({
      titulo: p.titulo, descricao: p.descricao, linguagem: p.linguagem, nivel: p.nivel, ordem: p.ordem,
    }).select("id").single();
    if (err) { console.error("Erro projeto:", err.message); continue; }
    const { error: err2 } = await supabase.from("etapas_projeto").insert(
      p.etapas.map(e => ({ ...e, projeto_id: proj.id }))
    );
    if (err2) { console.error("Erro etapas:", err2.message); continue; }
    total++;
    console.log(`✅ ${p.linguagem}: ${p.titulo} (${p.etapas.length} etapas)`);
  }
  console.log(`\n🎉 ${total} projetos inseridos!`);

  const { data: cont } = await supabase.from("projetos").select("linguagem, count");
  console.log("\n📊 Distribuição:", JSON.stringify(cont));
}
main().catch(console.error);
