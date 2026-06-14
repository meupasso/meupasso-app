"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();
const MP_CHECKOUT = "https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=8652d48ca4954b059a5201fc2234973b";

const beneficios = [
  "Projetos Práticos com etapas guiadas",
  "Revisão de código por IA",
  "Sessões ilimitadas com o tutor",
  "Trilhas de empregabilidade",
];

export default function AssinaturaPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isPro, setIsPro] = useState(false);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function check() {
      const { data: { user: u } } = await supabase.auth.getUser();
      setUser(u);
      if (u) {
        const { data: perfil } = await supabase
          .from("perfis")
          .select("plano")
          .eq("id", u.id)
          .single();
        setIsPro(perfil?.plano?.toLowerCase() === "pro");
      }
      setCarregando(false);
    }
    check();
  }, []);

  return (
    <main style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      padding: "2rem", background: "var(--bg-primary)",
    }}>
      <div style={{
        width: "100%", maxWidth: "420px", background: "var(--bg-card)",
        border: "2px solid var(--accent)", borderRadius: "1rem", padding: "2.5rem",
        textAlign: "center",
      }}>
        <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>🚀</div>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
          Plano Pro
        </h1>
        <div style={{ fontSize: "2.25rem", fontWeight: 800, color: "var(--accent)", marginBottom: "1.5rem" }}>
          R$27,90<small style={{ fontSize: "1rem", fontWeight: 400, color: "var(--text-secondary)" }}>/mês</small>
        </div>
        <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", marginBottom: "1.5rem", marginTop: "-1rem" }}>
          💡 Por menos de R$1 por dia
        </p>

        {carregando ? (
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>Verificando...</p>
        ) : isPro ? (
          <>
            <p style={{ fontSize: "1.125rem", fontWeight: 600, color: "#22c55e", marginBottom: "1.5rem" }}>
              🎉 Você já é Pro!
            </p>
            <Link href="/projetos" style={{
              display: "block", padding: "0.75rem 1.5rem",
              background: "var(--accent)", color: "#fff",
              borderRadius: "0.5rem", fontWeight: 600, fontSize: "1rem",
              textDecoration: "none",
            }}>
              Ir para os Projetos
            </Link>
          </>
        ) : (
          <>
            <div style={{ textAlign: "left", marginBottom: "2rem" }}>
              {beneficios.map((b) => (
                <p key={b} style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ color: "#22c55e" }}>✅</span> {b}
                </p>
              ))}
            </div>

            {user ? (
              <a href={MP_CHECKOUT} target="_blank" rel="noopener noreferrer" style={{
                display: "block", padding: "0.875rem 1.5rem",
                background: "var(--accent)", color: "#fff",
                borderRadius: "0.5rem", fontWeight: 600, fontSize: "1rem",
                textDecoration: "none", marginBottom: "0.75rem",
              }}>
                Assinar agora
              </a>
            ) : (
              <Link href="/entrar" style={{
                display: "block", padding: "0.875rem 1.5rem",
                background: "var(--accent)", color: "#fff",
                borderRadius: "0.5rem", fontWeight: 600, fontSize: "1rem",
                textDecoration: "none", marginBottom: "0.75rem",
              }}>
                Fazer login para assinar
              </Link>
            )}

            <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", opacity: 0.6 }}>
              Pagamento processado pelo Mercado Pago. Cartão de crédito. Cancele quando quiser.
            </p>
          </>
        )}
      </div>
    </main>
  );
}
