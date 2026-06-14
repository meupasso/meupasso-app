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

const PROJETO_ID = "358b2d14-b805-4f69-b89a-95e55ce26c1e";

const etapas = [
  {
    numero: 1, titulo: "Etapa 1 — Classe Aluno",
    descricao: `Crie um arquivo escola.py com a classe Aluno:

class Aluno:
    _contador = 0  # atributo de classe para gerar matricula

    def __init__(self, nome):
        Aluno._contador += 1
        self.nome = nome
        self.matricula = f"2026{Aluno._contador:04d}"  # ex: 20260001
        self.notas = {}  # dicionario: disciplina → lista de notas

    def adicionar_nota(self, disciplina, nota):
        # Valide: nota deve ser entre 0 e 10
        # Se disciplina nao existe no dicionario, crie a lista
        # Adicione a nota na lista da disciplina

    def media_disciplina(self, disciplina):
        # Se disciplina nao existe: retorne 0
        # Se lista vazia: retorne 0
        # Retorne a media das notas

    def media_geral(self):
        # Se nao tiver nenhuma nota: retorne 0
        # Calcule a media de todas as medias por disciplina

    def __str__(self):
        return f"[{self.matricula}] {self.nome}"

Teste:
a = Aluno("Ana Silva")
a.adicionar_nota("Matematica", 8.0)
a.adicionar_nota("Matematica", 7.5)
a.adicionar_nota("Portugues", 9.0)
print(a)
print(f"Media Matematica: {a.media_disciplina('Matematica')}")
print(f"Media Geral: {a.media_geral()}")`,
    dica_tutor: 'Para criar a lista se nao existir: if disciplina not in self.notas: self.notas[disciplina] = []. Depois self.notas[disciplina].append(nota). Para media_geral: some todas as medias de disciplinas e divida pelo numero de disciplinas. Valide nota com: if not 0 <= nota <= 10: print("Nota invalida")'
  },
  {
    numero: 2, titulo: "Etapa 2 — Classe Disciplina",
    descricao: `Adicione a classe Disciplina ao escola.py:

class Disciplina:
    def __init__(self, nome, carga_horaria, professor):
        self.nome = nome
        self.carga_horaria = carga_horaria
        self.professor = professor

    def __str__(self):
        return f"{self.nome} ({self.carga_horaria}h) - Prof. {self.professor}"

Crie as disciplinas fixas:
DISCIPLINAS = [
    Disciplina("Matematica", 80, "Prof. Carlos"),
    Disciplina("Portugues", 80, "Prof. Ana"),
    Disciplina("Ciencias", 60, "Prof. Roberto"),
    Disciplina("Historia", 60, "Prof. Lucia"),
    Disciplina("Ingles", 40, "Prof. Sandra")
]

Adicione metodo em Aluno:
def disciplinas_cursadas(self):
    return list(self.notas.keys())`,
    dica_tutor: 'DISCIPLINAS e uma lista de objetos Disciplina — mantenha no escopo global. Para exibir, itere sobre a lista chamando str(d) ou d.__str__().'
  },
  {
    numero: 3, titulo: "Etapa 3 — Classe Turma",
    descricao: `Adicione a classe Turma ao escola.py:

class Turma:
    def __init__(self, nome, ano):
        self.nome = nome
        self.ano = ano
        self.alunos = []

    def matricular(self, aluno):
        # Verifique se ja matriculado (por matricula)
        # Se ja: exiba "Aluno ja matriculado."
        # Se nao: adicione em self.alunos

    def buscar_aluno(self, nome):
        # Busca case insensitive
        # Retorna o objeto Aluno ou None

    def listar_alunos(self):
        # Se vazia: "Turma sem alunos."
        # Lista todos

    def media_turma(self):
        # Media geral de todos os alunos
        # Se sem alunos: retorne 0

    def __str__(self):
        return f"Turma {self.nome} ({self.ano}) - {len(self.alunos)} aluno(s)"`,
    dica_tutor: 'Para verificar duplicata: any(a.matricula == aluno.matricula for a in self.alunos). Para busca: next((a for a in self.alunos if a.nome.lower() == nome.lower()), None). Para media: sum(a.media_geral() for a in self.alunos) / len(self.alunos).'
  },
  {
    numero: 4, titulo: "Etapa 4 — Boletim do aluno",
    descricao: `Adicione a funcao gerar_boletim(aluno) fora das classes:

def gerar_boletim(aluno):
    # Exiba o boletim formatado

Exemplo:

BOLETIM ESCOLAR
Aluno: Ana Silva
Matricula: 20260001
DISCIPLINAS:
Matematica........... Media: 7.75
Portugues............ Media: 9.00
MEDIA GERAL: 7.75
SITUACAO: Aprovado

Regras:
- Media >= 7.0: "Aprovado"
- Media >= 4.0: "Recuperacao"
- Media < 4.0: "Reprovado"

Se sem notas: "Nenhuma nota lancada."`,
    dica_tutor: 'Para alinhar use f"{disciplina:<20}". Para a media use f"{media:.2f}". Itere sobre self.notas.items(). A situacao depende da media_geral().'
  },
  {
    numero: 5, titulo: "Etapa 5 — Sistema completo com menu",
    descricao: `Una tudo em um sistema escolar completo.

Turma de demonstracao com 3 alunos pre-cadastrados.
Menu:

1. Matricular aluno
2. Lancar nota
3. Ver boletim
4. Listar alunos
5. Ranking da turma
6. Media da turma
0. Sair

Fluxo:
1 - Pedir nome → Aluno → matricular()
2 - Buscar aluno → pedir disciplina/nota → adicionar_nota()
3 - Buscar aluno → gerar_boletim()
4 - listar_alunos()
5 - Ranking por media_geral() decrescente
6 - media_turma()

Estrutura final:
escola.py
├── class Aluno
├── class Disciplina
├── class Turma
├── DISCIPLINAS
├── gerar_boletim(aluno)
└── menu (if __name__ == "__main__":)`,
    dica_tutor: 'Para ranking: sorted(turma.alunos, key=lambda a: a.media_geral(), reverse=True). Para formatar: f"{aluno.nome:<20}". Na opcao 2, mostre disciplinas disponiveis e valide antes de lancar a nota.'
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
