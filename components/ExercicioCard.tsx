import Link from "next/link";

type Exercicio = {
  id: string;
  titulo: string;
  linguagem: string;
  modulo: string;
  nivel: "basico" | "intermediario" | "avancado";
  descricao: string;
};

const coresNivel: Record<string, string> = {
  basico: "#22c55e",
  intermediario: "#eab308",
  avancado: "#ef4444",
  desafio: "#a855f7",
};

const coresLinguagem: Record<string, string> = {
  python: "#3776ab",
  java: "#f89820",
  javascript: "#f7df1e",
};

export default function ExercicioCard({ exercicio }: { exercicio: Exercicio }) {
  const corLinguagem = coresLinguagem[exercicio.linguagem.toLowerCase()] || "var(--accent)";
  const corNivel = coresNivel[exercicio.nivel] || "#6b7280";

  return (
    <Link
      href={`/exercicios/${exercicio.id}`}
      className="exercicio-card"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.625rem",
        padding: "1.5rem",
        background: "var(--bg-card)",
        borderRadius: "0.75rem",
        border: "1px solid var(--border)",
        borderTop: `3px solid ${corLinguagem}`,
        transition: "border-color 0.2s, transform 0.2s, box-shadow 0.2s",
        cursor: "pointer",
        textDecoration: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontSize: "0.75rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            padding: "0.25rem 0.75rem",
            borderRadius: "9999px",
            background: corNivel + "20",
            color: corNivel,
          }}
        >
          {exercicio.nivel}
        </span>
        <span
          style={{
            fontSize: "0.75rem",
            fontWeight: 600,
            color: corLinguagem,
            textTransform: "uppercase",
            letterSpacing: "0.03em",
          }}
        >
          {exercicio.linguagem}
        </span>
      </div>

      <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.35 }}>
        {exercicio.titulo}
      </h3>

      <p
        style={{
          fontSize: "0.875rem",
          color: "var(--text-secondary)",
          lineHeight: 1.5,
          flex: 1,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {exercicio.descricao}
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "0.25rem",
          paddingTop: "0.625rem",
          borderTop: "1px solid var(--border)",
        }}
      >
        <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 500 }}>
          {exercicio.modulo}
        </span>
        <span
          className="exercicio-card-cta"
          style={{ fontSize: "0.75rem", color: corLinguagem, fontWeight: 600, opacity: 0 }}
        >
          Praticar →
        </span>
      </div>

      <style>{`
        .exercicio-card:hover {
          border-color: var(--accent) !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.15);
        }
        .exercicio-card:hover .exercicio-card-cta {
          opacity: 1 !important;
        }
      `}</style>
    </Link>
  );
}
