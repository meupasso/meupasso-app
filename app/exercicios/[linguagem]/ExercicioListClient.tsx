"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";

type Exercicio = {
  id: string;
  id_referencia: string;
  titulo: string;
  linguagem: string;
  modulo: string;
  nivel: string;
  descricao: string;
  exemplos?: string | null;
  permitidos?: string[] | null;
  proibidos?: string[] | null;
  erros_comuns?: string[] | null;
};

const ORDEM_MODULOS_PYTHON = [
  "Sintaxe", "Condicionais", "Repetição", "Listas", "Funções", "Coleções", "Arquivos", "POO",
];

const ORDEM_MODULOS_JAVA = [
  "Sintaxe", "Condicionais", "Repetição", "ArrayList", "POO",
];

const ORDEM_MODULOS_JAVASCRIPT = [
  "Sintaxe", "Condicionais", "Repetição", "Arrays", "Funções", "Objetos", "POO", "Módulos e Erros",
];

const ORDEM_NIVEIS = ["basico", "intermediario", "avancado", "desafio"];

const NIVEL_LABEL: Record<string, string> = {
  basico: "Básico",
  intermediario: "Intermediário",
  avancado: "Avançado",
  desafio: "Desafio",
};

const NIVEL_CORES: Record<string, { bg: string; text: string }> = {
  basico: { bg: "#166534", text: "#dcfce7" },
  intermediario: { bg: "#92400e", text: "#fef3c7" },
  avancado: { bg: "#7f1d1d", text: "#fee2e2" },
  desafio: { bg: "#6b21a8", text: "#f3e8ff" },
};

const ORDEM_PYTHON = [
  'PYB001','PYB002','PYB003','PYB004','PYB005','PYB006','PYB007','PYB008','PYB009','PYB010',
  'PYB011','PYB012','PYB013','PYB014','PYB015','PYB016','PYB017','PYB018','PYB019','PYB020',
  'PYB021','PYB022','PYB023','PYB024','PYB025','PYB026','PYB027','PYB028','PYB029','PYB030',
  'PYC001B','PYC002B','PYC003B','PYC004B','PYC005B','PYC006B','PYC007B','PYC008B','PYC009B','PYC010B',
  'PYC011I','PYC012I','PYC013I','PYC014I','PYC015I','PYC016I','PYC017I','PYC018I','PYC019I','PYC020I',
  'PYC021A','PYC022A','PYC023A','PYC024A','PYC025A',
  'PYC026D','PYC027D','PYC028D','PYC029D','PYC030D',
  'PYR001B','PYR002B','PYR003B','PYR004B','PYR005B','PYR006B','PYR007B','PYR008B','PYR009B','PYR010B',
  'PYR011I','PYR012I','PYR013I','PYR014I','PYR015I','PYR016I','PYR017I','PYR018I','PYR019I','PYR020I',
  'PYR021A','PYR022A','PYR023A','PYR024A','PYR025A',
  'PYR026D','PYR027D','PYR028D','PYR029D','PYR030D',
  'PYL001B','PYL002B','PYL003B','PYL004B','PYL005B','PYL006B','PYL007B','PYL008B','PYL009B','PYL010B',
  'PYL011I','PYL012I','PYL013I','PYL014I','PYL015I','PYL016I','PYL017I','PYL018I','PYL019I','PYL020I',
  'PYL021A','PYL022A','PYL023A','PYL024A','PYL025A',
  'PYL026D','PYL027D','PYL028D','PYL029D','PYL030D',
  'PYF001B','PYF002B','PYF003B','PYF004B','PYF005B','PYF006B','PYF007B','PYF008B','PYF009B','PYF010B',
  'PYF011I','PYF012I','PYF013I','PYF014I','PYF015I','PYF016I','PYF017I','PYF018I','PYF019I','PYF020I',
  'PYF021A','PYF022A','PYF023A','PYF024A','PYF025A',
  'PYF026D','PYF027D','PYF028D','PYF029D','PYF030D',
  'PYCO01B','PYCO02B','PYCO03B','PYCO04B','PYCO05B','PYCO06B','PYCO07B','PYCO08B','PYCO09B','PYCO10B',
  'PYCO11I','PYCO12I','PYCO13I','PYCO14I','PYCO15I','PYCO16I','PYCO17I','PYCO18I','PYCO19I','PYCO20I',
  'PYCO21A','PYCO22A','PYCO23A','PYCO24A','PYCO25A',
  'PYCO26D','PYCO27D','PYCO28D','PYCO29D','PYCO30D',
  'PYAR01B','PYAR02B','PYAR03B','PYAR04B','PYAR05B','PYAR06B','PYAR07B','PYAR08B','PYAR09B','PYAR10B',
  'PYAR11I','PYAR12I','PYAR13I','PYAR14I','PYAR15I','PYAR16I','PYAR17I','PYAR18I','PYAR19I','PYAR20I',
  'PYAR21A','PYAR22A','PYAR23A','PYAR24A','PYAR25A',
  'PYAR26D','PYAR27D','PYAR28D','PYAR29D','PYAR30D',
  'PYPOO1B','PYPOO2B','PYPOO3B','PYPOO4B','PYPOO5B','PYPOO6B','PYPOO7B','PYPOO8B','PYPOO9B','PYPOO0B',
  'PYPOI1I','PYPOI2I','PYPOI3I','PYPOI4I','PYPOI5I','PYPOI6I','PYPOI7I','PYPOI8I','PYPOI9I','PYPOO0I',
];

const ORDEM_JAVA = [
  'JAB001','JAB002','JAB003','JAB004','JAB005','JAB006','JAB007','JAB008','JAB009','JAB010',
  'JAB011','JAB012','JAB013','JAB014','JAB015','JAB016','JAB017','JAB018','JAB019','JAB020',
  'JAB021','JAB022','JAB023','JAB024','JAB025','JAB026','JAB027','JAB028','JAB029','JAB030',
  'JAI001','JAI002','JAI003','JAI004','JAI005','JAI006','JAI007','JAI008','JAI009','JAI010',
  'JAI011','JAI012','JAI013','JAI014','JAI015','JAI016','JAI017','JAI018','JAI019','JAI020',
  'JAI021','JAI022','JAI023','JAI024','JAI025','JAI026','JAI027','JAI028','JAI029','JAI030',
  'JAR001','JAR002','JAR003','JAR004','JAR005','JAR006','JAR007','JAR008','JAR009','JAR010',
  'JAR011','JAR012','JAR013','JAR014','JAR015','JAR016','JAR017','JAR018','JAR019','JAR020',
  'JAR021','JAR022','JAR023','JAR024','JAR025','JAR026','JAR027','JAR028','JAR029','JAR030',
  'JAL001','JAL002','JAL003','JAL004','JAL005','JAL006','JAL007','JAL008','JAL009','JAL010',
  'JAL011','JAL012','JAL013','JAL014','JAL015','JAL016','JAL017','JAL018','JAL019','JAL020',
  'JAL021','JAL022','JAL023','JAL024','JAL025','JAL026','JAL027','JAL028','JAL029','JAL030',
  'JAP001','JAP002','JAP003','JAP004','JAP005','JAP006','JAP007','JAP008','JAP009','JAP010',
  'JAP011','JAP012','JAP013','JAP014','JAP015','JAP016','JAP017','JAP018','JAP019','JAP020',
];

const ORDEM_JAVASCRIPT = [
  'JSB001','JSB002','JSB003','JSB004','JSB005','JSB006','JSB007','JSB008','JSB009','JSB010',
  'JSB011','JSB012','JSB013','JSB014','JSB015','JSB016','JSB017','JSB018','JSB019','JSB020',
  'JSB021','JSB022','JSB023','JSB024','JSB025','JSB026','JSB027','JSB028','JSB029','JSB030',
  'JSC001','JSC002','JSC003','JSC004','JSC005','JSC006','JSC007','JSC008','JSC009','JSC010',
  'JSC011','JSC012','JSC013','JSC014','JSC015','JSC016','JSC017','JSC018','JSC019','JSC020',
  'JSC021','JSC022','JSC023','JSC024','JSC025','JSC026','JSC027','JSC028','JSC029','JSC030',
  'JSR001','JSR002','JSR003','JSR004','JSR005','JSR006','JSR007','JSR008','JSR009','JSR010',
  'JSR011','JSR012','JSR013','JSR014','JSR015','JSR016','JSR017','JSR018','JSR019','JSR020',
  'JSR021','JSR022','JSR023','JSR024','JSR025','JSR026','JSR027','JSR028','JSR029','JSR030',
  'JSA001','JSA002','JSA003','JSA004','JSA005','JSA006','JSA007','JSA008','JSA009','JSA010',
  'JSA011','JSA012','JSA013','JSA014','JSA015','JSA016','JSA017','JSA018','JSA019','JSA020',
  'JSA021','JSA022','JSA023','JSA024','JSA025','JSA026','JSA027','JSA028','JSA029','JSA030',
  'JSF001','JSF002','JSF003','JSF004','JSF005','JSF006','JSF007','JSF008','JSF009','JSF010',
  'JSF011','JSF012','JSF013','JSF014','JSF015','JSF016','JSF017','JSF018','JSF019','JSF020',
  'JSF021','JSF022','JSF023','JSF024','JSF025','JSF026','JSF027','JSF028','JSF029','JSF030',
  'JSO001','JSO002','JSO003','JSO004','JSO005','JSO006','JSO007','JSO008','JSO009','JSO010',
  'JSO011','JSO012','JSO013','JSO014','JSO015','JSO016','JSO017','JSO018','JSO019','JSO020',
  'JSO021','JSO022','JSO023','JSO024','JSO025','JSO026','JSO027','JSO028','JSO029','JSO030',
  'JSP001','JSP002','JSP003','JSP004','JSP005','JSP006','JSP007','JSP008','JSP009','JSP010',
  'JSP011','JSP012','JSP013','JSP014','JSP015','JSP016','JSP017','JSP018','JSP019','JSP020',
  'JSP021','JSP022','JSP023','JSP024','JSP025','JSP026','JSP027','JSP028','JSP029','JSP030',
  'JSM001','JSM002','JSM003','JSM004','JSM005','JSM006','JSM007','JSM008','JSM009','JSM010',
  'JSM011','JSM012','JSM013','JSM014','JSM015','JSM016','JSM017','JSM018','JSM019','JSM020',
  'JSM021','JSM022','JSM023','JSM024','JSM025','JSM026','JSM027','JSM028','JSM029','JSM030',
];

const SECOES_JAVA = [
  { label: 'Sintaxe', prefixos: ['JAB001','JAB002','JAB003','JAB004','JAB005','JAB006','JAB007','JAB008','JAB009','JAB010'] },
  { label: 'Condicionais', prefixos: ['JAI001','JAI002','JAI003','JAI004','JAI005','JAI006','JAI007','JAI008','JAI009','JAI010','JAI011','JAI012','JAI013','JAI014','JAI015','JAI016','JAI017','JAI018','JAI019','JAI020','JAI021','JAI022','JAI023','JAI024','JAI025','JAI026','JAI027','JAI028','JAI029','JAI030'] },
  { label: 'Repetição', prefixos: ['JAR001','JAR002','JAR003','JAR004','JAR005','JAR006','JAR007','JAR008','JAR009','JAR010','JAR011','JAR012','JAR013','JAR014','JAR015','JAR016','JAR017','JAR018','JAR019','JAR020','JAR021','JAR022','JAR023','JAR024','JAR025','JAR026','JAR027','JAR028','JAR029','JAR030'] },
  { label: 'ArrayList', prefixos: ['JAL001','JAL002','JAL003','JAL004','JAL005','JAL006','JAL007','JAL008','JAL009','JAL010','JAL011','JAL012','JAL013','JAL014','JAL015','JAL016','JAL017','JAL018','JAL019','JAL020','JAL021','JAL022','JAL023','JAL024','JAL025','JAL026','JAL027','JAL028','JAL029','JAL030'] },
  { label: 'POO', prefixos: ['JAP001','JAP002','JAP003','JAP004','JAP005','JAP006','JAP007','JAP008','JAP009','JAP010','JAP011','JAP012','JAP013','JAP014','JAP015','JAP016','JAP017','JAP018','JAP019','JAP020'] },
];

function getOrdem(
  id_referencia: string,
  linguagem: string
): number {
  const lista = linguagem === "java" ? ORDEM_JAVA : linguagem === "javascript" ? ORDEM_JAVASCRIPT : ORDEM_PYTHON;
  const idx = lista.indexOf(id_referencia);
  return idx === -1 ? 999 : idx;
}

function getSecaoJava(id_referencia: string): string {
  for (const secao of SECOES_JAVA) {
    for (const prefixo of secao.prefixos) {
      if (id_referencia.startsWith(prefixo)) return secao.label;
    }
  }
  return "Outros";
}

function ordenarExercicios(lista: Exercicio[], linguagem: string): Exercicio[] {
  return [...lista].sort((a, b) => {
    const ordemA = getOrdem(a.id_referencia, linguagem);
    const ordemB = getOrdem(b.id_referencia, linguagem);
    if (ordemA !== ordemB) return ordemA - ordemB;
    return a.id_referencia.localeCompare(b.id_referencia);
  });
}

function agruparPorModulo(lista: Exercicio[], linguagem: string) {
  if (linguagem === "java") {
    const grupos: { modulo: string; exercicios: Exercicio[] }[] = [];
    for (const secao of SECOES_JAVA) {
      const exs = lista.filter((ex) => getSecaoJava(ex.id_referencia) === secao.label);
      if (exs.length > 0) {
        grupos.push({ modulo: secao.label, exercicios: exs });
      }
    }
    return grupos;
  }

  // Python: agrupa pelo campo modulo do banco
  const grupos: { modulo: string; exercicios: Exercicio[] }[] = [];
  for (const ex of lista) {
    const ultimo = grupos[grupos.length - 1];
    if (ultimo && ultimo.modulo === ex.modulo) {
      ultimo.exercicios.push(ex);
    } else {
      grupos.push({ modulo: ex.modulo, exercicios: [ex] });
    }
  }
  return grupos;
}

function temCodigoPython(texto: string): boolean {
  const linhas = texto.split("\n");
  return linhas.some(
    (linha) =>
      linha.includes("input(") ||
      linha.includes("float(") ||
      linha.includes("int(") ||
      linha.includes("print(") ||
      linha.includes("Scanner") ||
      linha.includes("System.out") ||
      linha.includes("System.in") ||
      linha.includes("nextInt(") ||
      linha.includes("nextLine(") ||
      /^\w+ = /.test(linha.trim())
  );
}

function NivelBadge({ nivel }: { nivel: string }) {
  const cores = NIVEL_CORES[nivel] || { bg: "#374151", text: "#d1d5db" };
  return (
    <span
      style={{
        fontSize: "0.65rem",
        fontWeight: 600,
        padding: "0.125rem 0.45rem",
        borderRadius: "9999px",
        background: cores.bg,
        color: cores.text,
        textTransform: "uppercase",
        letterSpacing: "0.04em",
        whiteSpace: "nowrap",
      }}
    >
      {NIVEL_LABEL[nivel] || nivel}
    </span>
  );
}

function IdBadge({ id }: { id: string }) {
  return (
    <span
      style={{
        fontSize: "0.65rem",
        fontWeight: 500,
        color: "var(--text-secondary)",
        opacity: 0.6,
        fontFamily: "monospace",
        whiteSpace: "nowrap",
      }}
    >
      #{id}
    </span>
  );
}

function ChevronDown() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M6 8l4 4 4-4" />
    </svg>
  );
}

function ChevronUp() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M6 12l4-4 4 4" />
    </svg>
  );
}

export default function ExercicioListClient({
  exercicios,
  linguagem,
}: {
  exercicios: Exercicio[];
  linguagem: string;
}) {
  const isPython = linguagem === "python";
  const isJava = linguagem === "java";
  const isJavaScript = linguagem === "javascript";
  const ORDEM_MODULOS = isPython ? ORDEM_MODULOS_PYTHON : isJava ? SECOES_JAVA.map(s => s.label) : ORDEM_MODULOS_JAVASCRIPT;
  const nomeLinguagem = linguagem === "javascript" ? "JavaScript" : linguagem === "java" ? "Java" : linguagem.charAt(0).toUpperCase() + linguagem.slice(1);

  const [modulosAtivos, setModulosAtivos] = useState<Set<string>>(new Set(ORDEM_MODULOS));
  const [niveisAtivos, setNiveisAtivos] = useState<Set<string>>(new Set(ORDEM_NIVEIS));
  const [busca, setBusca] = useState("");
  const [filtrosAbertos, setFiltrosAbertos] = useState(false);
  const [expandidoId, setExpandidoId] = useState<string | null>(null);
  const [concluidos, setConcluidos] = useState<Set<string>>(new Set());

  // Carregar progresso do usuário
  useEffect(() => {
    const nomeLang = linguagem === "python" ? "Python" : linguagem === "java" ? "Java" : "JavaScript";
    fetch(`/api/progresso?tipo=exercicio&linguagem=${nomeLang}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.progresso) {
          setConcluidos(new Set(data.progresso.map((p: any) => p.referencia_id)));
        }
      })
      .catch(() => {});
  }, [linguagem]);

  function toggleModulo(m: string) {
    setModulosAtivos((prev) => {
      const next = new Set(prev);
      if (next.has(m)) next.delete(m);
      else next.add(m);
      return next;
    });
  }

  function toggleNivel(n: string) {
    setNiveisAtivos((prev) => {
      const next = new Set(prev);
      if (next.has(n)) next.delete(n);
      else next.add(n);
      return next;
    });
  }

  function limparFiltros() {
    setModulosAtivos(new Set(ORDEM_MODULOS));
    setNiveisAtivos(new Set(ORDEM_NIVEIS));
    setBusca("");
  }

  function toggleCard(id: string) {
    setExpandidoId((prev) => (prev === id ? null : id));
  }

  const ordenados = useMemo(
    () => ordenarExercicios(exercicios, linguagem),
    [exercicios, linguagem]
  );

  const filtrados = useMemo(() => {
    return ordenados.filter((ex) => {
      const modKey = isPython || isJavaScript ? ex.modulo : getSecaoJava(ex.id_referencia);
      return (
        modulosAtivos.has(modKey) &&
        niveisAtivos.has(ex.nivel) &&
        (!busca ||
          ex.titulo.toLowerCase().includes(busca.toLowerCase()) ||
          ex.descricao.toLowerCase().includes(busca.toLowerCase()))
      );
    });
  }, [ordenados, modulosAtivos, niveisAtivos, busca, linguagem]);

  const grupos = useMemo(() => agruparPorModulo(filtrados, linguagem), [filtrados, linguagem]);

  const qtdFiltros =
    modulosAtivos.size < ORDEM_MODULOS.length || niveisAtivos.size < ORDEM_NIVEIS.length
      ? (ORDEM_MODULOS.length - modulosAtivos.size) + (ORDEM_NIVEIS.length - niveisAtivos.size)
      : 0;

  const filtroBtnStyle = (ativo: boolean): React.CSSProperties => ({
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.35rem 0.5rem",
    borderRadius: "0.375rem",
    background: ativo ? "var(--bg-card)" : "transparent",
    border: "none",
    color: ativo ? "var(--text-primary)" : "var(--text-secondary)",
    cursor: "pointer",
    fontSize: "0.875rem",
    width: "100%",
    textAlign: "left",
    transition: "background 0.1s",
  });

  const usarModulo = isPython || isJavaScript;

  const contarModulo = (m: string) =>
    usarModulo
      ? ordenados.filter((e) => e.modulo === m).length
      : ordenados.filter((e) => getSecaoJava(e.id_referencia) === m).length;

  const contarConcluidosModulo = (m: string) =>
    usarModulo
      ? ordenados.filter((e) => e.modulo === m && concluidos.has(e.id_referencia)).length
      : ordenados.filter((e) => getSecaoJava(e.id_referencia) === m && concluidos.has(e.id_referencia)).length;

  const contarNivel = (n: string) => ordenados.filter((e) => e.nivel === n).length;

  const filtrosPanel = (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div>
        <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.5rem" }}>Módulo</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.125rem" }}>
          {ORDEM_MODULOS.map((m) => (
            <button key={m} onClick={() => toggleModulo(m)} style={filtroBtnStyle(modulosAtivos.has(m))}>
              <span style={{ width: "0.75rem", height: "0.75rem", borderRadius: "0.125rem", border: "1.5px solid", borderColor: modulosAtivos.has(m) ? "var(--accent)" : "var(--border)", background: modulosAtivos.has(m) ? "var(--accent)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {modulosAtivos.has(m) && <svg width="8" height="8" viewBox="0 0 10 10" fill="none" stroke="#fff" strokeWidth="2"><path d="M2 5l2 2 4-4" /></svg>}
              </span>
              <span style={{ flex: 1 }}>{m}</span>
              <span style={{ fontSize: "0.7rem", color: "var(--text-secondary)", opacity: 0.6 }}>{contarConcluidosModulo(m)}/{contarModulo(m)}</span>
            </button>
          ))}
        </div>
      </div>
      <div>
        <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.5rem" }}>Nível</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.125rem" }}>
          {ORDEM_NIVEIS.map((n) => (
            <button key={n} onClick={() => toggleNivel(n)} style={filtroBtnStyle(niveisAtivos.has(n))}>
              <span style={{ width: "0.75rem", height: "0.75rem", borderRadius: "0.125rem", border: "1.5px solid", borderColor: niveisAtivos.has(n) ? "var(--accent)" : "var(--border)", background: niveisAtivos.has(n) ? "var(--accent)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {niveisAtivos.has(n) && <svg width="8" height="8" viewBox="0 0 10 10" fill="none" stroke="#fff" strokeWidth="2"><path d="M2 5l2 2 4-4" /></svg>}
              </span>
              <span style={{ flex: 1 }}>{NIVEL_LABEL[n] || n}</span>
              <span style={{ fontSize: "0.7rem", color: "var(--text-secondary)", opacity: 0.6 }}>{contarNivel(n)}</span>
            </button>
          ))}
        </div>
      </div>
      {qtdFiltros > 0 && (
        <button onClick={limparFiltros} style={{ background: "none", border: "none", color: "var(--accent)", cursor: "pointer", fontSize: "0.8125rem", fontWeight: 500, padding: "0.25rem 0", textAlign: "left" }}>
          Limpar filtros ({qtdFiltros})
        </button>
      )}
    </div>
  );

  return (
    <main style={{ padding: "2rem" }}>
      <h1 style={{ fontSize: "1.8rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.25rem" }}>
        Exercícios de {nomeLinguagem}
      </h1>
      <p style={{ color: "var(--text-secondary)", fontSize: "0.9375rem", marginBottom: "1.5rem" }}>
        {filtrados.length} exercícios encontrados
      </p>

      <button onClick={() => setFiltrosAbertos(!filtrosAbertos)} className="mobile-filtro-btn"
        style={{ display: "none", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", background: "var(--bg-card)", color: "var(--text-primary)", border: "1px solid var(--border)", borderRadius: "0.5rem", cursor: "pointer", fontSize: "0.875rem", fontWeight: 500, marginBottom: "1rem", width: "100%" }}>
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2.5 5h15M5 10h10M7.5 15h5" /></svg>
        {qtdFiltros > 0 ? `Filtros (${qtdFiltros} ativos)` : "Filtros"} <span style={{ marginLeft: "auto" }}>{filtrosAbertos ? "▲" : "▼"}</span>
      </button>

      {filtrosAbertos && <div className="filtro-overlay" onClick={() => setFiltrosAbertos(false)} />}

      <div className={filtrosAbertos ? "filtro-panel-mobile" : undefined} style={{ display: "flex", gap: "2rem", position: "relative" }}>
        <aside style={{ width: "220px", flexShrink: 0, position: "sticky", top: "1rem", height: "fit-content", maxHeight: "calc(100vh - 2rem)", overflowY: "auto" }} className="filtro-sidebar">
          {filtrosPanel}
        </aside>

        <div style={{ flex: 1, minWidth: 0 }}>
          <input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar exercício..."
            style={{ width: "100%", padding: "0.625rem 1rem", background: "var(--bg-card)", color: "var(--text-primary)", border: "1px solid var(--border)", borderRadius: "0.5rem", fontSize: "0.875rem", outline: "none", marginBottom: "1.5rem" }} />

          {grupos.length === 0 && (
            <p style={{ color: "var(--text-secondary)", textAlign: "center", padding: "3rem 1rem", fontSize: "0.9375rem" }}>
              Nenhum exercício encontrado com esses filtros.
            </p>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {grupos.map((grupo) => (
              <div key={grupo.modulo}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "1.25rem 0 0.75rem" }}>
                  <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-primary)", textTransform: "uppercase", letterSpacing: "0.04em", whiteSpace: "nowrap" }}>{grupo.modulo}</span>
                  <span style={{ flex: 1, height: "1px", background: "var(--border)" }} />
                  <span style={{ fontSize: "0.7rem", color: "var(--text-secondary)", opacity: 0.5 }}>{grupo.exercicios.length}</span>
                </div>

                {grupo.exercicios.map((ex) => {
                  const isExpanded = expandidoId === ex.id;
                  const mostraExemplo = ex.exemplos && !temCodigoPython(ex.exemplos);

                  return (
                    <div key={ex.id}>
                      {!isExpanded && (
                        <div onClick={() => toggleCard(ex.id)}
                          style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.625rem 0.75rem", borderRadius: "0.375rem", borderBottom: "1px solid var(--border)", cursor: "pointer", transition: "all 0.15s" }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bg-card)"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                        >
                          <NivelBadge nivel={ex.nivel} />
                          <IdBadge id={ex.id_referencia} />
                          {concluidos.has(ex.id_referencia) && <span style={{ fontSize: "0.8rem" }}>✅</span>}
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: "0.875rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "100%", marginBottom: "0.125rem" }}>
                              {ex.titulo.length > 60 ? ex.titulo.slice(0, 60) + "…" : ex.titulo}
                            </p>
                            <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", opacity: 0.7, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {ex.descricao.length > 80 ? ex.descricao.slice(0, 80) + "…" : ex.descricao}
                            </p>
                          </div>
                          <span style={{ color: "var(--text-secondary)", opacity: 0.4, display: "flex", flexShrink: 0 }}>
                            <ChevronDown />
                          </span>
                        </div>
                      )}

                      {isExpanded && (
                        <div style={{
                          background: "var(--bg-secondary)",
                          border: "1px solid var(--border)",
                          borderLeft: "3px solid var(--accent)",
                          borderRadius: "0.5rem",
                          padding: "1.25rem 1.5rem",
                          marginBottom: "0.5rem",
                          marginTop: "0.5rem",
                          transition: "all 0.2s ease",
                        }}>
                          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                              <NivelBadge nivel={ex.nivel} />
                              <IdBadge id={ex.id_referencia} />
                              {concluidos.has(ex.id_referencia) && <span style={{ fontSize: "0.85rem" }}>✅</span>}
                            </div>
                            <button onClick={() => toggleCard(ex.id)}
                              style={{ background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer", display: "flex", padding: "0.25rem" }}>
                              <ChevronUp />
                            </button>
                          </div>

                          <h3 style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "1.05rem", marginBottom: "0.75rem" }}>
                            {ex.titulo}
                          </h3>

                          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: 1.6, marginBottom: "1rem" }}>
                            {ex.descricao}
                          </p>

                          {mostraExemplo && (
                            <div style={{ backgroundColor: "var(--code-bg)", border: "1px solid var(--border)", borderRadius: "0.5rem", padding: "0.75rem", marginBottom: "1rem" }}>
                              <p style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.375rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>EXEMPLO</p>
                              <pre style={{ color: "var(--text-primary)", fontSize: "0.8125rem", lineHeight: 1.5, whiteSpace: "pre-wrap", margin: 0, fontFamily: "'SF Mono', 'Fira Code', monospace" }}>
                                {ex.exemplos}
                              </pre>
                            </div>
                          )}

                          <Link href={`/exercicios/${linguagem}/${ex.id}`}
                            style={{ display: "inline-block", padding: "0.5rem 1.25rem", background: "var(--accent)", color: "#ffffff", borderRadius: "0.375rem", fontSize: "0.875rem", fontWeight: 600, textDecoration: "none" }}>
                            Resolver →
                          </Link>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1023px) {
          .filtro-sidebar { display: none !important; }
          .mobile-filtro-btn { display: flex !important; }
          .filtro-panel-mobile { position: fixed !important; top: 0 !important; left: 0 !important; width: 280px !important; height: 100vh !important; z-index: 100 !important; background: var(--bg-secondary) !important; padding: 2rem 1.5rem !important; overflow-y: auto !important; box-shadow: 4px 0 12px rgba(0,0,0,0.2) !important; animation: slideIn 0.2s ease !important; }
          .filtro-overlay { position: fixed !important; inset: 0 !important; background: rgba(0,0,0,0.5) !important; z-index: 99 !important; }
        }
        @media (min-width: 1024px) {
          .mobile-filtro-btn, .filtro-overlay { display: none !important; }
        }
      `}</style>
    </main>
  );
}
