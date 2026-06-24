import type { Metadata } from "next";

type Props = {
  params: { slug: string[] };
  children: React.ReactNode;
};

const baseUrl = "https://www.meupasso.com.br";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slugCompleto = params.slug.join("/");
  const titulo = params.slug
    .map((s) => s.replace(/-/g, " "))
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" / ");

  return {
    title: `${titulo} — Notas`,
    description: `Minhas anotações sobre ${titulo}. Criado no MeuPasso — plataforma de programação para iniciantes.`,
    openGraph: {
      title: `📝 ${titulo}`,
      description: `Anotações sobre ${titulo} — criado no MeuPasso`,
      url: `${baseUrl}/notas/${slugCompleto}`,
      siteName: "MeuPasso",
      locale: "pt_BR",
      type: "article",
      images: [
        {
          url: `${baseUrl}/og-notas.svg`,
          width: 1200,
          height: 630,
          alt: `Notas sobre ${titulo} — MeuPasso`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `📝 ${titulo} — MeuPasso`,
      description: `Anotações sobre ${titulo}`,
      images: [`${baseUrl}/og-notas.svg`],
    },
  };
}

export default function NotaSlugLayout({ children }: Props) {
  return children;
}
