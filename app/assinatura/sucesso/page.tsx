import Link from "next/link";

export default function AssinaturaSucessoPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        textAlign: "center",
        background: "var(--bg-primary)",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "var(--text-primary)" }}>
        Assinatura ativada com sucesso! 🎉
      </h1>
      <p
        style={{
          fontSize: "1.125rem",
          color: "var(--text-secondary)",
          maxWidth: "28rem",
          marginBottom: "2rem",
          lineHeight: 1.6,
        }}
      >
        Seu acesso ao tutor ilimitado já está disponível.
      </p>
      <Link
        href="/exercicios"
        style={{
          display: "inline-block",
          padding: "0.875rem 2rem",
          background: "var(--accent)",
          color: "#ffffff",
          borderRadius: "0.5rem",
          fontWeight: 600,
          fontSize: "1.125rem",
          textDecoration: "none",
        }}
      >
        Ir para os exercícios
      </Link>
    </main>
  );
}
