import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  metadataBase: new URL("https://www.meupasso.com.br"),
  title: {
    default: "MeuPasso — Exercícios de Programação com Tutor IA",
    template: "%s | MeuPasso",
  },
  description:
    "Aprenda programação com exercícios práticos de Python, Java e JavaScript. Travou? O tutor IA te guia sem dar a resposta.",
  keywords: [
    "exercícios de programação",
    "aprender python",
    "exercícios python",
    "tutor programação",
    "aprender programação",
    "python para iniciantes",
    "exercícios java",
    "lógica de programação",
  ],
  authors: [{ name: "MeuPasso" }],
  creator: "MeuPasso",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://www.meupasso.com.br",
    siteName: "MeuPasso",
    title: "MeuPasso — Exercícios de Programação com Tutor IA",
    description:
      "Aprenda programação com exercícios práticos. Travou? O tutor IA te guia sem dar a resposta.",
    images: [
      { url: "/og-image.png", width: 1200, height: 630, alt: "MeuPasso" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MeuPasso — Exercícios de Programação com Tutor IA",
    description:
      "Aprenda programação com exercícios práticos. Travou? O tutor IA te guia sem dar a resposta.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "https://www.meupasso.com.br",
  },
  verification: {
    google: "r121SYiP75M6xwvtTrwXpn8pYeX8zrvs0XaplkXsHpU",
  },
  other: {
    "google-adsense-account": "ca-pub-2482487501321061",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" data-theme="dark">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
      </head>
      <body>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2482487501321061"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <ThemeProvider>
          <Sidebar />
          <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }} className="main-content">
            <main style={{ flex: 1, background: "var(--bg-primary)" }}>
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
