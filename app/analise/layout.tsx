import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Raio-X de Carreira — MeuPasso",
  description:
    "Descubra exatamente por que você ainda não está sendo chamado para entrevistas. Análise completa de currículo, LinkedIn e GitHub.",
  openGraph: {
    title: "Raio-X de Carreira — MeuPasso",
    description:
      "Descubra exatamente por que você ainda não está sendo chamado para entrevistas. Análise completa de currículo, LinkedIn e GitHub.",
    url: "https://www.meupasso.com.br/analise",
    siteName: "MeuPasso",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "https://www.meupasso.com.br/og-image.png",
        width: 1200,
        height: 630,
        alt: "Raio-X de Carreira — MeuPasso",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Raio-X de Carreira — MeuPasso",
    description:
      "Descubra exatamente por que você ainda não está sendo chamado para entrevistas.",
  },
};

export default function AnaliseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
