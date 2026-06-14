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
};

export default function ExercicioCard({ exercicio }: { exercicio: Exercicio }) {
  return (
    <Link
      href={`/exercicios/${exercicio.id}`}
      className="exercicio-card"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        padding: "1.5rem",
        background: "var(--bg-card)",
        borderRadius: "0.75rem",
        border: "1px solid var(--border)",
        transition: "border-color 0.2s, transform 0.2s",
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
            background: coresNivel[exercicio.nivel] + "20",
            color: coresNivel[exercicio.nivel],
          }}
        >
          {exercicio.nivel}
        </span>
        <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
          {exercicio.linguagem}
        </span>
      </div>

      <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--text-primary)" }}>
        {exercicio.titulo}
      </h3>

      <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
        {exercicio.descricao}
      </p>

      <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
        {exercicio.modulo}
      </span>

      <style>{`
        .exercicio-card:hover {
          border-color: var(--accent) !important;
          transform: translateY(-2px);
        }
      `}</style>
    </Link>
  );
}
