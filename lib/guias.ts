import { serialize } from "next-mdx-remote/serialize";
import { guiasRegistry } from "./guias-data";

export type TopicoMeta = {
  titulo: string;
  slug: string;
  ordem: number;
};

type TopicoData = TopicoMeta & { content: string };

const registry: Record<string, TopicoData[]> = guiasRegistry;

export function getTopicos(linguagem: string): TopicoMeta[] {
  const topicos = registry[linguagem];
  if (!topicos) return [];
  return topicos.map((t) => ({
    titulo: t.titulo,
    slug: t.slug,
    ordem: t.ordem,
  }));
}

export function getTopico(
  linguagem: string,
  slug: string
): { meta: TopicoMeta; content: string } | null {
  const topicos = registry[linguagem];
  if (!topicos) return null;
  const topico = topicos.find((t) => t.slug === slug);
  if (!topico) return null;
  return {
    meta: { titulo: topico.titulo, slug: topico.slug, ordem: topico.ordem },
    content: topico.content,
  };
}

export async function getTopicoSerialized(
  linguagem: string,
  slug: string
): Promise<{
  meta: TopicoMeta;
  serialized: any;
  topicos: TopicoMeta[];
} | null> {
  const topico = getTopico(linguagem, slug);
  if (!topico) return null;
  const serialized = await serialize(topico.content || "");
  const topicos = getTopicos(linguagem);
  return { meta: topico.meta, serialized, topicos };
}
