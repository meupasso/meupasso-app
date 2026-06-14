import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Read .env.local
const envRaw = fs.readFileSync(path.join(__dirname, "..", ".env.local"), "utf-8");
const env = {};
envRaw.split("\n").forEach((line) => {
  const t = line.trim();
  if (!t || t.startsWith("#")) return;
  const idx = t.indexOf("=");
  if (idx === -1) return;
  env[t.slice(0, idx).trim()] = t.slice(idx + 1).trim();
});

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY
);

const TITULOS = {
  'PYB001': 'Saudação personalizada',
  'PYB002': 'Soma de dois produtos',
  'PYB003': 'Velocidade média em m/s',
  'PYB004': 'Salário bruto',
  'PYB005': 'Parcela de empréstimo',
  'PYB006': 'Conta de água',
  'PYB007': 'Valor do frete',
  'PYB008': 'Conversor de moeda',
  'PYB009': 'Tinta para parede',
  'PYB010': 'Parcelamento com juros',
  'PYI001': 'Par ou ímpar',
  'PYI002': 'Maior entre dois números',
  'PYI003': 'Situação do aluno',
  'PYI004': 'Pode votar?',
  'PYI005': 'Dias do mês',
  'PYI006': 'Vogal ou consoante',
  'PYI007': 'Calculadora com operador',
  'PYI009': 'Desconto por forma de pagamento',
  'PYI010': 'Conversor de temperatura',
  'PYI011': 'Aumento salarial',
  'PYI012': 'Classificação do IMC',
  'PYI013': 'Dia da semana',
  'PYI014': 'Ano bissexto',
  'PYI015': 'Saudação por horário',
  'PYI016': 'Contagem regressiva',
  'PYI017': 'Jogo de adivinhação',
  'PYI018': 'Soma dos dígitos',
  'PYI019': 'Tabuada',
  'PYI020': 'Números pares com while',
  'PYI021': 'Soma de 1 a N',
  'PYI022': 'Soma até digitar zero',
  'PYI023': 'Maior e menor da sequência',
  'PYI024': 'Contagem de pares e ímpares',
  'PYI025': 'Média dos positivos',
  'PYI026': 'Divisores de um número',
  'PYI027': 'Contar vogais no texto',
  'PYI028': 'Palíndromo',
  'PYT001': 'Loja de animais de Seu Creso',
  'PYT002': 'Estoque de frutas do Mix Tadeu',
  'PYT003': 'Calculadora de viagem da Família Silva',
  'PYT004': 'Conta de luz de Dona Cida',
  'PYT005': 'Super planilha de notas escolares',
  'PYT006': 'Ingressos para o zoológico',
  'PYT007': 'Feira de descontos do Mix Tadeu',
  'PYT008': 'Jogo do palpite',
  'PYT009': 'Aprovado, recuperação ou chocolate?',
  'PYT010': 'Desconto no plano da academia',
  'PYT011': 'Aniversário de Genésia',
  'PYT012': 'Loja de tintas de Seu Alfredo',
  'PYT013': 'Sequência dos números ímpares',
  'PYT014': 'Quizz do conhecimento',
  'PYT015': 'Multiplicação com tabela',
  'PYD001': 'Múltiplos de 3 ou 5 exclusivos',
  'PYD002': 'Pares com continue',
  'PYD003': 'Sequência crescente ou decrescente',
  'PYD004': 'Soma de múltiplos entre A e B',
  'PYD005': 'Tabuada até N com soma total',
  'PYL001': 'Lista de cores',
  'PYL002': 'Primeiro e último elemento',
  'PYL003': 'Adicionar cor ao final',
  'PYL004': 'Remover segundo elemento',
  'PYL005': 'Adicionar cores pelo usuário',
  'PYL006': 'Tamanho da lista',
  'PYL007': 'Verificar cor na lista',
  'PYL008': 'Exibir elementos com for',
  'PYL009': 'Inverter lista',
  'PYL010': 'Copiar lista',
  'PYL011': 'Números pares de 1 a 10',
  'PYT016': 'Lista de compras de Dona Cremilda',
  'PYT017': 'Biblioteca online de Seu Gumercindo',
  'PYT018': 'Músicas favoritas de Wesley',
  'PYT019': 'Cadastro de alunos',
  'PYT020': 'Top 10 filmes',
  'PYF001': 'Olá, mundo com função',
  'PYF002': 'Saudação com parâmetro',
  'PYF003': 'Soma com função',
  'PYF004': 'Retornar o maior',
  'PYF005': 'Soma de lista',
  'PYF006': 'Contar vogais',
  'PYF007': 'Fatorial com loop',
  'PYF008': 'Fatorial recursivo',
  'PYF009': 'Filtrar pares',
  'PYF010': 'Calculadora com operador',
  'PYF011': 'Nomes com maiúscula',
  'PYF012': 'Multiplicar por dois',
  'PYF013': 'Inverter string',
  'PYF014': 'Contar palavras',
  'PYF015': 'Contar elemento na lista',
  'PYF016': 'Tamanho de strings',
  'PYF017': 'Soma dos positivos',
  'PYF018': 'Índice do menor',
  'PYF019': 'Juntar strings',
  'PYF020': 'Remover vogais',
  'PYC001': 'Dicionário com idades',
  'PYC002': 'Adicionar par chave-valor',
  'PYC003': 'Remover chave',
  'PYC004': 'Verificar chave',
  'PYC005': 'Imprimir chaves',
  'PYC006': 'Iterar com items()',
  'PYC007': 'Atualizar valor',
  'PYC008': 'Copiar dicionário',
  'PYC009': 'Frequência de caracteres',
  'PYC010': 'Ordenar por valor',
  'PYC011': 'Tupla com cinco elementos',
  'PYC012': 'Tentar modificar tupla',
  'PYC013': 'Desempacotar tupla',
  'PYC014': 'Trocar valores com tupla',
  'PYC015': 'Contar elemento na tupla',
  'PYC016': 'Concatenar tuplas',
  'PYC017': 'Tupla aninhada',
  'PYC018': 'Converter lista e tupla',
  'PYC019': 'Tupla como chave de dicionário',
  'PYC020': 'Tupla de tuplas',
  'PYC021': 'Set sem duplicatas',
  'PYC022': 'Adicionar ao set',
  'PYC023': 'discard vs remove',
  'PYC024': 'União de sets',
  'PYC025': 'Interseção de sets',
  'PYC026': 'Diferença de sets',
  'PYC027': 'Subconjunto',
  'PYC028': 'Limpar set',
  'PYC029': 'Set vazio dinâmico',
  'PYC030': 'Remover duplicatas de lista',
  'PYA001': 'Criar arquivo texto',
  'PYA002': 'Ler arquivo texto',
  'PYA003': 'Append em arquivo',
  'PYA004': 'Ler linha por linha',
  'PYA005': 'Números de 1 a 10 em arquivo',
  'PYA006': 'Somar números do arquivo',
  'PYA007': 'Copiar arquivo',
  'PYA008': 'Contar linhas do arquivo',
  'PYA009': 'Contar palavra no arquivo',
  'PYA010': 'Criar arquivo CSV',
  'PYA011': 'Ler arquivo CSV',
  'PYA012': 'Salvar nomes em arquivo',
  'PYA013': 'Exibir arquivo invertido',
  'PYA014': 'Substituir palavra em arquivo',
  'PYA015': 'Contar linhas com maiúscula',
  'POO001': 'Classe Pessoa',
  'POO002': 'Método apresentar()',
  'POO003': 'Classe Carro',
  'POO004': 'Método descricao()',
  'POO005': 'Classe ContaBancaria',
  'POO006': 'Método depositar()',
  'POO007': 'Método sacar()',
  'POO008': 'Classe Retangulo',
  'POO009': 'Herança — Aluno herda Pessoa',
  'POO010': 'Método mostrar_curso()',
  'POOM01': 'Classe Circulo — area()',
  'POOM02': 'Método perimetro()',
  'POOM03': 'Classe Lampada',
  'POOM04': 'Método esta_ligada()',
  'POOM05': 'Métodos estáticos — Calculadora',
  'POOM06': 'Método de classe',
  'POOM07': 'Classe Funcionario — aumento',
  'POOM08': 'Método mostrar_dados()',
  'POOM09': 'Classe Relogio estática',
  'POOM10': 'Classe Temperatura estática',
  'POOE01': 'Encapsulamento — get/set',
  'POOE02': 'Property e setter',
  'POOE03': 'Conta sem saldo negativo',
  'POOE04': 'Propriedade somente leitura',
  'POOE05': 'Setter de salário positivo',
  'POOE06': 'Desconto sem preço negativo',
  'POOE07': 'Velocidade máxima',
  'POOE08': 'Notas e média',
  'POOE09': 'Getter/setter de idade',
  'POOE10': 'Alterar senha com validação',
  'POOH01': 'Herança — Animal e Cachorro',
  'POOH02': 'Veiculo e Carro',
  'POOH03': 'Pessoa e Estudante',
  'POOH04': 'Sobrescrever mostrar_dados()',
  'POOH05': 'Funcionario herda Pessoa',
  'POOH06': 'Cachorro e Passaro — mover()',
  'POOH07': 'super() no Gato',
  'POOH08': 'Classe abstrata Forma',
  'POOH09': 'Herança múltipla — Amphibio',
  'POOH10': 'Professor herda Pessoa',
  'POOP01': 'Polimorfismo — Cachorro e Gato',
  'POOP02': 'Função com lista de animais',
  'POOP03': 'Bônus — Funcionario e Gerente',
  'POOP04': 'Total de bônus polimórfico',
  'POOP05': 'Forma — Quadrado e Circulo',
  'POOP06': 'Função imprimir_area()',
  'POOP07': 'Passaro e Peixe — mover()',
  'POOP08': 'Interface Veiculo abstrata',
  'POOP09': 'Sistema de pagamento',
  'POOP10': 'Processar pagamentos',
  'PYCOMP01': 'Método __str__',
  'PYCOMP02': 'Método __repr__',
  'PYCOMP03': 'Método __add__ — Fracao',
  'PYCOMP04': 'Método __len__',
  'PYCOMP05': 'Método __getitem__',
  'PYCOMP06': 'Método __setitem__',
  'PYCOMP07': 'Método __eq__',
  'PYCOMP08': 'Método __call__',
  'PYCOMP09': 'Iterador com __iter__ e __next__',
  'PYCOMP10': 'Método __contains__',
  'PYCOMP11': 'Método estático somar()',
  'PYCOMP12': 'Método estático multiplicar()',
  'PYCOMP13': 'Conversor Celsius para Fahrenheit',
  'PYCOMP14': 'Conversor Fahrenheit para Celsius',
  'PYCOMP15': 'Verificar número par',
  'PYCOMP16': 'Maior entre três valores',
  'PYCOMP17': 'Contar vogais estático',
  'PYCOMP18': 'Soma dos dígitos estático',
  'PYCOMP19': 'Palíndromo estático',
  'PYCOMP20': 'Verificar número primo',
  'PYCOMP21': 'Composição — Pessoa e Endereço',
  'PYCOMP22': 'Método mostrar() no Endereço',
  'PYCOMP23': 'Composição — Carro e Motor',
  'PYCOMP24': 'Método ligar_motor()',
  'PYCOMP25': 'Empresa e Departamentos',
  'PYCOMP26': 'Método listar_departamentos()',
  'PYCOMP27': 'Computador e Processador',
  'PYCOMP28': 'Aluno com Endereço e Curso',
  'PYCOMP29': 'Mostrar informações do Aluno',
  'PYCOMP30': 'Biblioteca com lista de Livros',
};

async function main() {
  // Buscar todos os exercícios
  const { data: exercicios, error } = await supabase
    .from("exercicios")
    .select("id, id_referencia, titulo, descricao")
    .eq("linguagem", "Python");

  if (error) {
    console.error("Erro ao buscar:", error.message);
    return;
  }

  console.log(`Buscados ${exercicios.length} exercícios.`);

  let atualizados = 0;
  let ignorados = 0;

  for (const ex of exercicios) {
    const ref = ex.id_referencia;
    const novoTitulo = TITULOS[ref];
    if (!novoTitulo) {
      // Se não tem mapeamento, trunca o título existente
      if (ex.titulo.length > 60) {
        const truncado = ex.titulo.slice(0, 50) + "…";
        const { error: err } = await supabase
          .from("exercicios")
          .update({ titulo: truncado })
          .eq("id", ex.id);
        if (!err) atualizados++;
        else console.error(`  Erro ao truncar ${ref}:`, err.message);
      } else {
        ignorados++;
      }
      continue;
    }

    // Só atualiza se o título atual for diferente do novo
    if (ex.titulo !== novoTitulo) {
      const { error: err } = await supabase
        .from("exercicios")
        .update({ titulo: novoTitulo })
        .eq("id", ex.id);
      if (!err) {
        atualizados++;
        console.log(`  ✅ ${ref}: "${ex.titulo}" → "${novoTitulo}"`);
      } else {
        console.error(`  ❌ ${ref}:`, err.message);
      }
    } else {
      ignorados++;
    }
  }

  console.log(`\n🎉 Concluído! ${atualizados} atualizados, ${ignorados} já estavam corretos.`);
}

main().catch(console.error);
