import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const envRaw = fs.readFileSync(path.join(__dirname, "..", ".env.local"), "utf-8");
const env = {};
envRaw.split("\n").forEach((line) => {
  const t = line.trim();
  if (!t || t.startsWith("#")) return;
  const idx = t.indexOf("=");
  if (idx === -1) return;
  env[t.slice(0, idx).trim()] = t.slice(idx + 1).trim();
});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

const TITULOS_JAVA = {
  'JAB001': 'Saudação personalizada',
  'JAB002': 'Soma de dois produtos',
  'JAB003': 'Velocidade média do carro',
  'JAB004': 'Salário bruto',
  'JAB005': 'Parcela de empréstimo',
  'JAB006': 'Conta de água',
  'JAB007': 'Valor do frete',
  'JAB008': 'Conversor de moeda',
  'JAB009': 'Tinta para parede',
  'JAB010': 'Parcelamento com juros',
  'JAB011': 'Maior entre dois números',
  'JAB012': 'Situação do aluno',
  'JAB013': 'Pode votar?',
  'JAB014': 'Dias do mês',
  'JAB015': 'Vogal ou consoante',
  'JAB016': 'Calculadora com operador',
  'JAB017': 'Desconto por pagamento',
  'JAB018': 'Conversor de temperatura',
  'JAB019': 'Aumento salarial',
  'JAB020': 'Saudação por horário',
  'JAI001': 'Par ou ímpar',
  'JAI002': 'Classificação do IMC',
  'JAI003': 'Dia da semana',
  'JAI004': 'Ano bissexto',
  'JAI005': 'Semáforo com switch',
  'JAI006': 'Nota musical',
  'JAI007': 'Conversor de unidades',
  'JAI008': 'Contagem regressiva',
  'JAI009': 'Jogo de adivinhação',
  'JAI010': 'Soma dos dígitos',
  'JAI011': 'Tabuada',
  'JAI012': 'Números pares com while',
  'JAI013': 'Soma até digitar zero',
  'JAI014': 'Média dos positivos',
  'JAI015': 'Divisores de um número',
  'JAI016': 'Maior e menor da sequência',
  'JAI017': 'Contar vogais',
  'JAI018': 'Palíndromo',
  'JAT001': 'Loja de animais de Seu Creso',
  'JAT002': 'Estoque de frutas do Mix Tadeu',
  'JAT003': 'Calculadora de viagem',
  'JAT004': 'Conta de luz de Dona Cida',
  'JAT005': 'Planilha de notas escolares',
  'JAT006': 'Ingressos para o zoológico',
  'JAT007': 'Feira de descontos',
  'JAT008': 'Jogo do palpite',
  'JAT009': 'Aprovado, recuperação ou chocolate?',
  'JAT010': 'Desconto no plano da academia',
  'JAT011': 'Aniversário de Genésia',
  'JAT012': 'Loja de tintas de Seu Alfredo',
  'JAT013': 'Sequência dos ímpares',
  'JAT014': 'Quiz do conhecimento',
  'JAT015': 'Tabuada com tabela',
  'JAL001': 'Lista de nomes',
  'JAL002': 'Adicionar e remover elementos',
  'JAL003': 'Percorrer com for-each',
  'JAL004': 'Verificar elemento e posição',
  'JAL005': 'Ordenar strings alfabeticamente',
  'JAL006': 'Soma e média de números',
  'JAL007': 'Lista de compras',
  'JAL008': 'Cadastro de alunos',
  'JAL009': 'Remover duplicatas',
  'JAL010': 'Rotacionar elementos',
  'JAP001': 'Classe Pessoa',
  'JAP002': 'Método apresentar()',
  'JAP003': 'Classe Carro',
  'JAP004': 'Método acelerar()',
  'JAP005': 'Classe Produto encapsulada',
  'JAP006': 'ContaBancaria com validação',
  'JAP007': 'Funcionario com salário privado',
  'JAP008': 'Aluno com notas e média',
  'JAP009': 'Herança — Animal e Cachorro',
  'JAP010': 'Herança — Veiculo e Carro',
  'JAP011': 'Funcionario herda Pessoa',
  'JAP012': 'Classe abstrata Forma',
  'JAP013': 'Polimorfismo — Cachorro e Gato',
  'JAP014': 'Sistema de pagamento',
  'JAP015': 'Bônus — Funcionario e Gerente',
  'JAP016': 'Sistema Bancário completo',
  'JAP017': 'Sistema de Vendas de Livraria',
  'JAP018': 'Sistema de Biblioteca',
  'JAD001': 'Organizador de Biblioteca Pessoal',
};

async function main() {
  const codigos = Object.keys(TITULOS_JAVA);
  console.log(`Atualizando ${codigos.length} títulos...`);

  let atualizados = 0;
  for (const codigo of codigos) {
    const { error } = await supabase
      .from("exercicios")
      .update({ titulo: TITULOS_JAVA[codigo] })
      .eq("id_referencia", codigo)
      .eq("linguagem", "Java");

    if (error) {
      console.error(`  ❌ ${codigo}: ${error.message}`);
    } else {
      atualizados++;
    }
  }

  console.log(`\n✅ ${atualizados} títulos atualizados!`);
}

main().catch(console.error);
