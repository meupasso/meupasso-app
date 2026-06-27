import type { Metadata } from "next";

const DESCRIPTION =
  "Por que você não está sendo chamado para entrevistas? Cruzamos seu currículo, LinkedIn e GitHub e te dizemos exatamente o que está travando sua contratação.";

export const metadata: Metadata = {
  title: "Raio-X de Carreira — MeuPasso",
  description: DESCRIPTION,
  openGraph: {
    title: "Raio-X de Carreira — MeuPasso",
    description: DESCRIPTION,
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
    description: DESCRIPTION,
  },
};

export default function AnaliseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
