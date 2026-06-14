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

const PROJETO_ID = "b7517f38-c5a1-4465-9948-7d773bf5032a";

const etapas = [
  {
    numero: 1,
    titulo: "Etapa 1 — Estrutura da tarefa",
    descricao: `Crie um arquivo tarefas.py com a estrutura base:

Um contador global para IDs:
proximo_id = 1

Crie a função criar_tarefa(titulo, descricao, prioridade, categoria):
- Valide a prioridade: deve ser "alta", "media" ou "baixa" — Se inválida, use "media" como padrão
- Retorne um dicionário com os campos: id, titulo, descricao, prioridade, categoria, status, data_criacao
- Incremente proximo_id após criar (use global proximo_id)

Crie uma lista global: tarefas = []

Teste:
t1 = criar_tarefa("Estudar Python", "Fazer exercícios", "alta", "estudos")
t2 = criar_tarefa("Comprar leite", "Mercado", "baixa", "pessoal")
print(t1)
print(t2)`,
    dica_tutor: 'Para usar variável global dentro de função declare global proximo_id no início. Para a data use import datetime e datetime.date.today(). Valide prioridade com if prioridade not in ["alta","media","baixa"]: prioridade = "media"'
  },
  {
    numero: 2,
    titulo: "Etapa 2 — Operações básicas",
    descricao: `Adicione as funções principais de gerenciamento:

adicionar_tarefa(titulo, descricao, prioridade, categoria):
- Chame criar_tarefa() e adicione o resultado em tarefas[]
- Exiba: "Tarefa #[id] adicionada: [titulo]"

buscar_por_id(id):
- Percorra tarefas[] procurando tarefa["id"] == id
- Retorne a tarefa se encontrar, None se não encontrar

concluir_tarefa(id):
- Use buscar_por_id() para encontrar a tarefa
- Se não encontrar: exiba "Tarefa #[id] não encontrada."
- Se encontrar: mude tarefa["status"] para "concluida"

listar_tarefas():
- Se lista vazia: exiba "Nenhuma tarefa cadastrada."
- Para cada tarefa exiba formatado com ícone de prioridade (alta=🔴, media=🟡, baixa=🟢)`,
    dica_tutor: 'Para buscar por ID use for tarefa in tarefas: if tarefa["id"] == id: return tarefa. Dicionários são mutáveis. Para os ícones use um dicionário de mapeamento.'
  },
  {
    numero: 3,
    titulo: "Etapa 3 — Filtros e ordenação",
    descricao: `Adicione funções de filtragem:

filtrar_por_prioridade(prioridade):
- Retorne lista com tarefas onde tarefa["prioridade"] == prioridade

filtrar_por_categoria(categoria):
- Retorne lista com tarefas onde tarefa["categoria"] == categoria (case insensitive)

filtrar_por_status(status):
- Retorne lista com tarefas onde tarefa["status"] == status

ordenar_por_prioridade():
- Retorne a lista ordenada: alta → media → baixa
- Use sorted() com key personalizada

Teste:
adicionar_tarefa("Estudar Python", "Exercícios", "alta", "estudos")
adicionar_tarefa("Ler livro", "Clean Code", "media", "estudos")
adicionar_tarefa("Comprar leite", "Mercado", "baixa", "pessoal")

print("--- Prioridade alta ---")
for t in filtrar_por_prioridade("alta"):
    print(t["titulo"])`,
    dica_tutor: 'Para filtrar use [t for t in tarefas if t["prioridade"] == prioridade]. Para ordenar: sorted(tarefas, key=lambda t: {"alta":0,"media":1,"baixa":2}[t["prioridade"]])'
  },
  {
    numero: 4,
    titulo: "Etapa 4 — Estatísticas e relatório",
    descricao: `Adicione a função relatorio():

Calcule e exiba:
- Total de tarefas
- Concluídas vs pendentes
- Percentual de conclusão
- Distribuição por prioridade (alta=🔴, media=🟡, baixa=🟢)
- Distribuição por categoria

Para contar por categoria use dicionário:
categorias = {}
for tarefa in tarefas:
    cat = tarefa["categoria"]
    categorias[cat] = categorias.get(cat, 0) + 1`,
    dica_tutor: 'Para contar concluídas: len([t for t in tarefas if t["status"]=="concluida"]). Para percentual: round(concluidas/total*100) se total > 0. Use .get(chave,0) para evitar KeyError.'
  },
  {
    numero: 5,
    titulo: "Etapa 5 — Persistência e menu completo",
    descricao: `Adicione persistência e o menu final:

salvar_tarefas(arquivo="tarefas.txt"):
- Salve cada tarefa em uma linha: id|titulo|descricao|prioridade|categoria|status|data_criacao
- Salve proximo_id na primeira linha: PROXIMO_ID:[valor]

carregar_tarefas(arquivo="tarefas.txt"):
- Use try/except para FileNotFoundError
- Leia a primeira linha para restaurar proximo_id
- Para cada linha seguinte: use split("|") para reconstruir o dicionário

Menu principal:
1. Adicionar tarefa
2. Listar todas
3. Concluir tarefa
4. Filtrar tarefas
5. Ver relatório
0. Salvar e sair

Submenu de filtros (opção 4):
1. Por prioridade
2. Por categoria
3. Por status
4. Ordenar por prioridade

Estrutura final:
tarefas.py — criar_tarefa, adicionar_tarefa, buscar_por_id, concluir_tarefa, listar_tarefas, filtrar, ordenar, relatorio, salvar/carregar e menu`,
    dica_tutor: 'Use | como separador em vez de vírgula. Para salvar data use str(tarefa["data_criacao"]). Para carregar use datetime.date.fromisoformat(). Chame carregar_tarefas() antes do while True.'
  }
];

async function main() {
  let count = 0;
  for (const etapa of etapas) {
    const { error } = await supabase
      .from("etapas_projeto")
      .update({ titulo: etapa.titulo, descricao: etapa.descricao, dica_tutor: etapa.dica_tutor })
      .eq("projeto_id", PROJETO_ID)
      .eq("numero", etapa.numero);
    if (error) { console.error(`Etapa ${etapa.numero}:`, error.message); }
    else { count++; console.log(`✅ Etapa ${etapa.numero} atualizada`); }
  }
  console.log(`\n🎉 ${count}/5 etapas atualizadas`);
}
main().catch(console.error);
