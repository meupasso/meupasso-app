import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "1rem",
        textAlign: "center",
        fontSize: "0.8125rem",
        color: "var(--text-secondary)",
        background: "var(--bg-secondary)",
      }}
    >
      © 2026 MeuPasso ·{" "}
      <Link href="/privacidade" className="footer-link">
        Privacidade
      </Link>{" "}
      ·{" "}
      <Link href="/termos" className="footer-link">
        Termos
      </Link>

      <style>{`
        .footer-link {
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 0.15s;
        }
        .footer-link:hover {
          color: var(--accent) !important;
        }
      `}</style>
    </footer>
  );
}
