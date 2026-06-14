"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export default function EntrarPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "";
  const redirectUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?redirect=${redirect}`;

  const [aba, setAba] = useState<"entrar" | "cadastro">("entrar");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  function irPosLogin() {
    router.push(redirect || "/exercicios");
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setCarregando(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
    setCarregando(false);
    if (error) {
      setErro("Email ou senha incorretos");
      return;
    }
    irPosLogin();
  }

  async function handleCadastro(e: React.FormEvent) {
    e.preventDefault();
    if (senha.length < 6) {
      setErro("A senha deve ter no mínimo 6 caracteres");
      return;
    }
    setErro("");
    setCarregando(true);
    const { error } = await supabase.auth.signUp({
      email,
      password: senha,
      options: { data: { nome } },
    });
    setCarregando(false);
    if (error) {
      setErro(error.message);
      return;
    }
    irPosLogin();
  }

  async function handleGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: redirectUrl },
    });
    if (error) setErro(error.message);
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.75rem 1rem",
    background: "var(--code-bg)",
    color: "var(--text-primary)",
    border: "1px solid var(--border)",
    borderRadius: "0.5rem",
    fontSize: "0.9375rem",
    outline: "none",
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        background: "var(--bg-primary)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "1rem",
          padding: "2rem",
        }}
      >
        <Link
          href="/"
          style={{
            display: "block",
            textAlign: "center",
            fontSize: "1.75rem",
            fontWeight: 700,
            color: "var(--accent)",
            textDecoration: "none",
            marginBottom: "1.5rem",
          }}
        >
          MeuPasso
        </Link>

        {/* Abas */}
        <div
          style={{
            display: "flex",
            borderBottom: "1px solid var(--border)",
            marginBottom: "1.5rem",
          }}
        >
          <button
            onClick={() => { setAba("entrar"); setErro(""); }}
            style={{
              flex: 1,
              padding: "0.75rem",
              background: "none",
              border: "none",
              color: aba === "entrar" ? "var(--accent)" : "var(--text-secondary)",
              fontWeight: aba === "entrar" ? 600 : 400,
              cursor: "pointer",
              borderBottom: aba === "entrar" ? "2px solid var(--accent)" : "2px solid transparent",
              fontSize: "0.9375rem",
            }}
          >
            Entrar
          </button>
          <button
            onClick={() => { setAba("cadastro"); setErro(""); }}
            style={{
              flex: 1,
              padding: "0.75rem",
              background: "none",
              border: "none",
              color: aba === "cadastro" ? "var(--accent)" : "var(--text-secondary)",
              fontWeight: aba === "cadastro" ? 600 : 400,
              cursor: "pointer",
              borderBottom: aba === "cadastro" ? "2px solid var(--accent)" : "2px solid transparent",
              fontSize: "0.9375rem",
            }}
          >
            Criar conta
          </button>
        </div>

        {/* Formulário */}
        {aba === "entrar" ? (
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label style={labelStyle}>Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required style={inputStyle} placeholder="seu@email.com" />
            </div>
            <div>
              <label style={labelStyle}>Senha</label>
              <input value={senha} onChange={(e) => setSenha(e.target.value)} type="password" required style={inputStyle} placeholder="••••••" />
            </div>

            {erro && <p style={{ color: "#ef4444", fontSize: "0.875rem" }}>{erro}</p>}

            <button type="submit" disabled={carregando} style={buttonStyle}>
              {carregando ? "Entrando..." : "Entrar"}
            </button>

            <div style={separadorStyle}>
              <span style={separadorLinhaStyle} />
              <span style={{ color: "var(--text-secondary)", fontSize: "0.8rem", padding: "0 0.75rem" }}>ou</span>
              <span style={separadorLinhaStyle} />
            </div>

            <button type="button" onClick={handleGoogle} style={{ ...buttonStyle, background: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid var(--border)" }}>
              Entrar com Google
            </button>

            <p style={{ textAlign: "center", fontSize: "0.875rem", color: "var(--text-secondary)" }}>
              Não tem conta?{" "}
              <button type="button" onClick={() => { setAba("cadastro"); setErro(""); }} style={{ background: "none", border: "none", color: "var(--accent)", cursor: "pointer", fontSize: "0.875rem" }}>
                Criar conta
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={handleCadastro} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label style={labelStyle}>Nome</label>
              <input value={nome} onChange={(e) => setNome(e.target.value)} required style={inputStyle} placeholder="Seu nome" />
            </div>
            <div>
              <label style={labelStyle}>Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required style={inputStyle} placeholder="seu@email.com" />
            </div>
            <div>
              <label style={labelStyle}>Senha</label>
              <input value={senha} onChange={(e) => setSenha(e.target.value)} type="password" required minLength={6} style={inputStyle} placeholder="Mínimo 6 caracteres" />
            </div>

            {erro && <p style={{ color: "#ef4444", fontSize: "0.875rem" }}>{erro}</p>}

            <button type="submit" disabled={carregando} style={buttonStyle}>
              {carregando ? "Criando..." : "Criar conta"}
            </button>

            <div style={separadorStyle}>
              <span style={separadorLinhaStyle} />
              <span style={{ color: "var(--text-secondary)", fontSize: "0.8rem", padding: "0 0.75rem" }}>ou</span>
              <span style={separadorLinhaStyle} />
            </div>

            <button type="button" onClick={handleGoogle} style={{ ...buttonStyle, background: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid var(--border)" }}>
              Cadastrar com Google
            </button>

            <p style={{ textAlign: "center", fontSize: "0.875rem", color: "var(--text-secondary)" }}>
              Já tem conta?{" "}
              <button type="button" onClick={() => { setAba("entrar"); setErro(""); }} style={{ background: "none", border: "none", color: "var(--accent)", cursor: "pointer", fontSize: "0.875rem" }}>
                Entrar
              </button>
            </p>
          </form>
        )}
      </div>
    </main>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.8rem",
  fontWeight: 600,
  color: "var(--text-secondary)",
  marginBottom: "0.375rem",
};

const buttonStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem",
  background: "var(--accent)",
  color: "#ffffff",
  border: "none",
  borderRadius: "0.5rem",
  fontSize: "0.9375rem",
  fontWeight: 600,
  cursor: "pointer",
};

const separadorStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
};

const separadorLinhaStyle: React.CSSProperties = {
  flex: 1,
  height: "1px",
  background: "var(--border)",
};
