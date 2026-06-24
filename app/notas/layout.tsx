import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notas",
  description:
    "Crie e organize suas anotações de programação — hierarquia infinita, markdown e salvamento automático.",
  openGraph: {
    title: "📝 Notas",
    description: "Crie e organize suas anotações de programação",
    url: "https://www.meupasso.com.br/notas",
    siteName: "MeuPasso",
    locale: "pt_BR",
    images: [
      {
        url: "https://www.meupasso.com.br/og-notas.svg",
        width: 1200,
        height: 630,
        alt: "Notas — MeuPasso",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "📝 Notas — MeuPasso",
    description: "Crie e organize suas anotações de programação",
    images: ["https://www.meupasso.com.br/og-notas.svg"],
  },
};

export default function NotasLayout({ children }: { children: React.ReactNode }) {
  return children;
}
