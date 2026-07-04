"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "./ThemeProvider";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

function HomeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 8.75L10 2.5l7.5 6.25v8.125a1.25 1.25 0 01-1.25 1.25h-3.75v-6.25h-5v6.25H3.75a1.25 1.25 0 01-1.25-1.25V8.75z" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.75" y="3.75" width="12.5" height="12.5" rx="1.25" />
      <path d="M7.5 7.5h5M7.5 10h5M7.5 12.5h2.5" />
    </svg>
  );
}

function NoteIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 2.5h11a1 1 0 011 1v13a1 1 0 01-1 1h-11a1 1 0 01-1-1v-13a1 1 0 011-1z" />
      <path d="M6.5 6.5h7M6.5 10h7M6.5 13.5h4" />
    </svg>
  );
}

function DiceIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2.5" y="2.5" width="15" height="15" rx="2" />
      <circle cx="7" cy="7" r="1" fill="currentColor" stroke="none" />
      <circle cx="13" cy="7" r="1" fill="currentColor" stroke="none" />
      <circle cx="10" cy="10" r="1" fill="currentColor" stroke="none" />
      <circle cx="7" cy="13" r="1" fill="currentColor" stroke="none" />
      <circle cx="13" cy="13" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 3.5h11a1 1 0 011 1v12a1 1 0 01-1 1h-11a1 1 0 01-1-1v-12a1 1 0 011-1z" />
      <path d="M9.5 3.5v10" />
      <path d="M5.5 13.5h4" />
      <path d="M5.5 16.5h4" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2.5" y="6.5" width="15" height="11" rx="1.25" />
      <rect x="7.5" y="3" width="5" height="3.5" />
      <path d="M2.5 10.5h15" />
    </svg>
  );
}

function BlogIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.5 4.5h13a1 1 0 011 1v9a1 1 0 01-1 1h-13a1 1 0 01-1-1v-9a1 1 0 011-1z" />
      <path d="M6.5 8.5h7M6.5 11.5h4" />
      <circle cx="15" cy="8" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function ReviewIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5.5 3.5h9a2 2 0 012 2v12l-3.5-2-3.5 2-3.5-2-3.5 2v-12a2 2 0 012-2z" />
      <path d="M7 8.5h6M7 11.5h4" />
    </svg>
  );
}

function PathIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2.5v3M10 14.5v3M5 7l5-3 5 3M5 13l5 3 5-3" />
      <circle cx="10" cy="5" r="1" fill="currentColor" stroke="none" />
      <circle cx="10" cy="15" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function RocketIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2.5l-2 4.5-4 1 3 3-1 5 4-3 4 3-1-5 3-3-4-1L10 2.5z" />
      <circle cx="10" cy="10" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17.5h15" />
      <path d="M4.5 14.5l3-6 4 2 4-7" />
      <circle cx="15.5" cy="3.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="10" r="3.33" />
      <path d="M10 1.67v1.66M10 16.67v1.66M1.67 10h1.66M16.67 10h1.66M4.22 4.22l1.17 1.17M14.61 14.61l1.17 1.17M4.22 15.78l1.17-1.17M14.61 5.39l1.17-1.17" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.5 11.5A7.5 7.5 0 018.5 2.5 7.5 7.5 0 1017.5 11.5z" />
    </svg>
  );
}

const linksSempreVisiveis = [
  { href: "/", label: "Início", icon: HomeIcon },
  { href: "/exercicios", label: "Exercícios", icon: ListIcon },
  { href: "/projetos", label: "Projetos", icon: RocketIcon },
  { href: "/analise", label: "Raio-X", icon: ChartIcon },
];

const linksRecolhiveis = [
  { href: "/trilhas", label: "Trilhas", icon: PathIcon },
  { href: "/revisao", label: "Revisão", icon: ReviewIcon },
  { href: "/perfil", label: "Progresso", icon: ChartIcon },
  { href: "/notas", label: "Notas", icon: NoteIcon },
  { href: "/gerador", label: "Gerador", icon: DiceIcon },
  { href: "/guias", label: "Guias", icon: BookIcon },
];

const linksRodape = [
  { href: "/blog", label: "Blog", icon: BlogIcon },
  { href: "/vagas", label: "Vagas", icon: BriefcaseIcon },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [streakAtual, setStreakAtual] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPro, setIsPro] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const w = window.innerWidth >= 1024 ? (collapsed ? "60px" : "240px") : "0px";
    document.documentElement.style.setProperty("--sidebar-width", w);
  }, [collapsed]);

  useEffect(() => {
    const handler = () => {
      const w = window.innerWidth >= 1024 ? (collapsed ? "60px" : "240px") : "0px";
      document.documentElement.style.setProperty("--sidebar-width", w);
    };
    window.addEventListener("resize", handler);
    handler();
    return () => window.removeEventListener("resize", handler);
  }, [collapsed]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Estado expanded do localStorage
  useEffect(() => {
    const saved = localStorage.getItem("sidebar_expanded");
    if (saved === "true") setExpanded(true);
  }, []);

  function toggleExpanded() {
    setExpanded((prev) => {
      const next = !prev;
      localStorage.setItem("sidebar_expanded", String(next));
      return next;
    });
  }

  // Auth state + carregar plano
  useEffect(() => {
    async function loadUser() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        const nome = session.user.user_metadata?.nome || session.user.user_metadata?.full_name || session.user.email?.split("@")[0] || "";
        setUserName(nome);
        if (session.user.email === "caiomvital@gmail.com") setIsAdmin(true);
        carregarStreak();
        carregarNomePerfil(session.user.id);
        // Verificar se é Pro
        const { data: perfil } = await supabase
          .from("perfis")
          .select("plano, pro_expiracao")
          .eq("id", session.user.id)
          .single();
        const proValido = perfil?.plano?.toLowerCase() === "pro" && (!perfil?.pro_expiracao || new Date(perfil.pro_expiracao) >= new Date(new Date().toDateString()));
        setIsPro(!!proValido);
      }
    }
    loadUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        const nome = session.user.user_metadata?.nome || session.user.user_metadata?.full_name || session.user.email?.split("@")[0] || "";
        setUserName(nome);
        if (session.user.email === "caiomvital@gmail.com") setIsAdmin(true);
        carregarStreak();
        carregarNomePerfil(session.user.id);
      } else {
        setUser(null);
        setUserName(null);
        setStreakAtual(0);
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function carregarStreak() {
    try {
      const res = await fetch("/api/progresso?tipo=streak");
      const data = await res.json();
      if (data.streak_atual > 0) setStreakAtual(data.streak_atual);
    } catch {}
  }

  async function carregarNomePerfil(userId: string) {
    try {
      const { data } = await supabase
        .from("perfis")
        .select("nome")
        .eq("id", userId)
        .single();
      if (data?.nome) setUserName(data.nome);
    } catch {}
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        aria-label="Abrir menu"
        style={{
          position: "fixed",
          top: "0.75rem",
          left: "0.75rem",
          zIndex: 50,
          width: "2.25rem",
          height: "2.25rem",
          display: "none",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid var(--border)",
          borderRadius: "0.375rem",
          background: "var(--bg-secondary)",
          color: "var(--text-primary)",
          cursor: "pointer",
        }}
        className="mobile-hamburger"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M3.33 5h13.34M3.33 10h13.34M3.33 15h13.34" />
        </svg>
      </button>

      {mobileOpen && (
        <div className="sidebar-overlay" onClick={() => setMobileOpen(false)} />
      )}

      <aside
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: mobileOpen ? 50 : 1,
          width: collapsed ? "60px" : "240px",
          background: "var(--bg-secondary)",
          borderRight: "1px solid var(--border)",
          display: "flex",
          flexDirection: "column",
          transition: "width 0.2s ease, transform 0.2s ease",
          overflow: "hidden",
          transform: mobileOpen ? "translateX(0)" : undefined,
        }}
        className={mobileOpen ? "sidebar-mobile" : "sidebar-desktop"}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: collapsed ? "0.75rem" : "1rem",
            borderBottom: "1px solid var(--border)",
            minHeight: "3.5rem",
          }}
        >
          <Link
            href="/"
            style={{
              textDecoration: "none",
              ...(collapsed ? {} : { fontWeight: 700, fontSize: "1.25rem", color: "var(--accent)", whiteSpace: "nowrap", overflow: "hidden" }),
            }}
          >
            {collapsed ? (
              <span style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: "2rem", height: "2rem", borderRadius: "50%",
                background: "var(--accent)", color: "#fff",
                fontWeight: 700, fontSize: "0.75rem",
              }}>
                MP
              </span>
            ) : "MeuPasso"}
          </Link>

          <button
            onClick={() => setCollapsed((c) => !c)}
            aria-label={collapsed ? "Expandir" : "Recolher"}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-secondary)",
              cursor: "pointer",
              padding: "0.25rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="desktop-collapse"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ transform: collapsed ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
              <path d="M10 3L5 8l5 5" />
            </svg>
          </button>
        </div>

        <nav
          className="sidebar-nav"
          style={{
            flex: 1,
            minHeight: 0,
            padding: "0.75rem 0.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.25rem",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          {/* Itens sempre visíveis */}
          {linksSempreVisiveis.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.625rem 0.75rem",
                  borderRadius: "0.375rem",
                  color: active ? "var(--accent)" : "var(--text-secondary)",
                  background: active ? "var(--bg-card)" : "transparent",
                  fontSize: "0.9375rem",
                  fontWeight: active ? 600 : 400,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textDecoration: "none",
                  transition: "background 0.15s",
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "var(--bg-card)"; }}
                onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}
              >
                <link.icon />
                {!collapsed && (
                  <span style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                    {link.label}
                    {link.href === "/analise" && !isPro && (
                      <span style={{ fontSize: "0.6rem", fontWeight: 700, padding: "0.1rem 0.375rem", borderRadius: "0.25rem", background: "linear-gradient(135deg, #f97316, #ef4444)", color: "#fff", lineHeight: "1.2" }}>
                        ✨ Novo
                      </span>
                    )}
                  </span>
                )}
              </Link>
            );
          })}

          {/* CTA Pro (apenas usuários free) */}
          {user && !isPro && !collapsed && (
            <div style={{
              margin: "0.5rem 0 0.25rem",
              padding: "0.625rem 0.75rem",
              borderRadius: "0.5rem",
              background: "linear-gradient(135deg, rgba(86,156,214,0.08), rgba(59,130,246,0.05))",
              border: "1px solid rgba(86,156,214,0.15)",
              flexShrink: 0,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.375rem" }}>
                <span style={{ fontSize: "1rem" }}>🚀</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.2 }}>Seja Pro</div>
                  <div style={{ fontSize: "0.65rem", color: "var(--text-secondary)", lineHeight: 1.2 }}>Projetos + Tutor ilimitados</div>
                </div>
              </div>
              <a
                href="/assinatura"
                style={{
                  display: "block",
                  textAlign: "center",
                  padding: "0.375rem 0",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  background: "var(--accent)",
                  color: "#fff",
                  borderRadius: "0.375rem",
                  textDecoration: "none",
                }}
              >
                Assinar — R$ 27,90/mês
              </a>
            </div>
          )}

          {/* Separador + Ver mais / Ver menos */}
          {!collapsed && (
            <button
              onClick={toggleExpanded}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                width: "100%",
                padding: "0.5rem 0.75rem",
                borderRadius: "0.375rem",
                background: "none",
                border: "none",
                color: "var(--text-secondary)",
                fontSize: "0.8125rem",
                fontWeight: 500,
                cursor: "pointer",
                textAlign: "left",
                transition: "color 0.15s",
                marginTop: "0.125rem",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = "var(--text-primary)"}
              onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-secondary)"}
            >
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
                <path d="M5 8l5 5 5-5" />
              </svg>
              {expanded ? "Ver menos" : "Ver mais"}
            </button>
          )}

          {/* Itens recolhíveis */}
          <div style={{
            overflow: "hidden",
            maxHeight: expanded ? "400px" : "0px",
            opacity: expanded ? 1 : 0,
            transition: "max-height 0.2s ease, opacity 0.2s ease",
            flexShrink: 0,
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              {linksRecolhiveis.map((link) => {
                const active = pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      padding: "0.625rem 0.75rem",
                      borderRadius: "0.375rem",
                      color: active ? "var(--accent)" : "var(--text-secondary)",
                      background: active ? "var(--bg-card)" : "transparent",
                      fontSize: "0.9375rem",
                      fontWeight: active ? 600 : 400,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textDecoration: "none",
                      transition: "background 0.15s",
                      flexShrink: 0,
                    }}
                    onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "var(--bg-card)"; }}
                    onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}
                  >
                    <link.icon />
                    {!collapsed && <span>{link.label}</span>}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Separador */}
          <div style={{ flex: 1 }} />

          {/* Blog e Vagas (sempre no final) */}
          {linksRodape.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.625rem 0.75rem",
                  borderRadius: "0.375rem",
                  color: active ? "var(--accent)" : "var(--text-secondary)",
                  background: active ? "var(--bg-card)" : "transparent",
                  fontSize: "0.9375rem",
                  fontWeight: active ? 600 : 400,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textDecoration: "none",
                  transition: "background 0.15s",
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "var(--bg-card)"; }}
                onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}
              >
                <link.icon />
                {!collapsed && <span>{link.label}</span>}
              </Link>
            );
          })}

          {/* Admin */}
          {isAdmin && (
            <Link
              href="/admin"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.625rem 0.75rem",
                borderRadius: "0.375rem",
                color: pathname.startsWith("/admin") ? "var(--accent)" : "var(--text-secondary)",
                background: pathname.startsWith("/admin") ? "var(--bg-card)" : "transparent",
                fontSize: "0.9375rem",
                fontWeight: pathname.startsWith("/admin") ? 600 : 400,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textDecoration: "none",
                transition: "background 0.15s",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => { if (!pathname.startsWith("/admin")) e.currentTarget.style.background = "var(--bg-card)"; }}
              onMouseLeave={(e) => { if (!pathname.startsWith("/admin")) e.currentTarget.style.background = "transparent"; }}
            >
              <span style={{ fontSize: "1.1rem" }}>⚙️</span>
              {!collapsed && <span>Admin</span>}
            </Link>
          )}
        </nav>
        {/* Auth area */}
        <div
          style={{
            padding: collapsed ? "0.5rem" : "0.5rem 0.75rem",
            borderTop: "1px solid var(--border)",
          }}
        >
          {user ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              {!collapsed && (
                <span
                  style={{
                    fontSize: "0.8125rem",
                    color: "var(--text-primary)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {userName}
                </span>
              )}
              {!collapsed && streakAtual > 0 && (
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "#f59e0b",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  🔥 {streakAtual} {streakAtual === 1 ? "dia" : "dias"} seguidos
                </span>
              )}
              <button
                onClick={handleLogout}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--text-secondary)",
                  cursor: "pointer",
                  fontSize: "0.8125rem",
                  textAlign: collapsed ? "center" : "left",
                  padding: "0.25rem 0",
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = "var(--text-primary)"}
                onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-secondary)"}
              >
                {collapsed ? "←" : "Sair"}
              </button>
            </div>
          ) : (
            <Link
              href="/entrar"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: collapsed ? "center" : "flex-start",
                gap: "0.5rem",
                color: "var(--accent)",
                fontSize: "0.875rem",
                fontWeight: 500,
                textDecoration: "none",
                padding: "0.25rem 0",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M10 2.5a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5zM2.5 17.5c0-3.5 3.36-6.25 7.5-6.25s7.5 2.75 7.5 6.25" />
              </svg>
              {!collapsed && <span>Entrar</span>}
            </Link>
          )}
        </div>

        {/* Theme toggle */}
        <div
          style={{
            padding: collapsed ? "0.5rem" : "0.5rem 0.75rem",
            borderTop: "1px solid var(--border)",
          }}
        >
          <button
            onClick={toggle}
            aria-label="Alternar tema"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              background: "none",
              border: "none",
              color: "var(--text-secondary)",
              cursor: "pointer",
              padding: "0.25rem",
              borderRadius: "0.375rem",
              fontSize: "0.8125rem",
              width: "100%",
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = "var(--text-primary)"}
            onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-secondary)"}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            {!collapsed && <span>{theme === "dark" ? "Modo claro" : "Modo escuro"}</span>}
          </button>
        </div>
      </aside>

      <style>{`
        .sidebar-nav {
          scrollbar-width: thin;
          scrollbar-color: var(--border) transparent;
        }
        .sidebar-nav::-webkit-scrollbar {
          width: 6px;
        }
        .sidebar-nav::-webkit-scrollbar-track {
          background: transparent;
        }
        .sidebar-nav::-webkit-scrollbar-thumb {
          background-color: var(--border);
          border-radius: 3px;
        }
        .sidebar-nav::-webkit-scrollbar-thumb:hover {
          background-color: var(--text-secondary);
        }
        @media (max-width: 1023px) {
          .sidebar-desktop { display: none !important; }
          .sidebar-mobile { display: flex !important; animation: slideIn 0.2s ease; }
          .mobile-hamburger { display: flex !important; }
          .desktop-collapse { display: none !important; }
        }
        @media (min-width: 1024px) {
          .mobile-hamburger { display: none !important; }
          .sidebar-mobile { display: none !important; }
          .sidebar-desktop { display: flex !important; }
        }
      `}</style>
    </>
  );
}
