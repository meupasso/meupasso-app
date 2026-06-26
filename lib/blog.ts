import { createServiceClient } from "./supabase/service";

export type PostMeta = {
  titulo: string;
  slug: string;
  imagem: string;
  descricao: string;
  data: string;
  tags: string[];
};

export type PostCompleto = PostMeta & { content: string };

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80";

/** Mapa de imagens Unsplash baseado em tags do post */
const IMAGES_BY_TAG: Record<string, string> = {
  carreira: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
  emprego: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
  python: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&q=80",
  java: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
  javascript: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&q=80",
  iniciantes: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80",
  programação: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
  pratica: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80",
  "mercado-ti": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  padrao: DEFAULT_IMAGE,
};

/** Escolhe uma imagem baseada nas tags do post */
function imagemPorTags(tags: string[]): string {
  for (const tag of tags) {
    const img = IMAGES_BY_TAG[tag.toLowerCase()];
    if (img) return img;
  }
  return IMAGES_BY_TAG.padrao;
}

/**
 * Extrai frontmatter de conteúdo MDX.
 */
function parseFrontmatter(
  raw: string
): { meta: PostMeta; content: string } | null {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return null;

  const fm: Record<string, any> = {};
  match[1].split("\n").forEach((line) => {
    const idx = line.indexOf(":");
    if (idx === -1) return;
    let key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim();
    val = val.replace(/^"(.*)"$/, "$1").replace(/^'(.*)'$/, "$1");
    if (key === "tags") {
      try { fm[key] = JSON.parse(val.replace(/'/g, '"')); } catch { fm[key] = []; }
    } else {
      fm[key] = val;
    }
  });

  const titulo = fm.title || fm.titulo || "";
  const descricao = fm.description || fm.descricao || "";
  const data = fm.date || fm.data || "";
  const tags = fm.tags || [];
  const imagem = fm.image || fm.imagem || "";

  if (!titulo || !data) return null;
  if (isNaN(new Date(data + "T12:00:00").getTime())) return null;

  return {
    meta: { titulo, slug: "", imagem, descricao, data, tags },
    content: match[2] || "",
  };
}

function resolveImagem(imagemUrl: string | null, tags: string[]): string {
  if (imagemUrl) return imagemUrl;
  return imagemPorTags(tags);
}

export async function getPosts(): Promise<PostMeta[]> {
  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from("blog_historico")
      .select("slug, titulo, conteudo_mdx, imagem_url, created_at")
      .eq("status", "publicado")
      .order("created_at", { ascending: false });

    if (error || !data) return [];

    const posts: PostMeta[] = [];

    for (const row of data) {
      const parsed = row.conteudo_mdx ? parseFrontmatter(row.conteudo_mdx) : null;
      if (!parsed && !row.titulo) continue;

      const tags = parsed?.meta?.tags || [];
      posts.push({
        titulo: parsed?.meta?.titulo || row.titulo || "",
        slug: row.slug,
        imagem: resolveImagem(row.imagem_url, tags),
        descricao: parsed?.meta?.descricao || "",
        data: parsed?.meta?.data || row.created_at?.split("T")[0] || "",
        tags,
      });
    }

    return posts;
  } catch {
    return [];
  }
}

export async function getPost(slug: string): Promise<PostCompleto | null> {
  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from("blog_historico")
      .select("*")
      .eq("slug", slug)
      .eq("status", "publicado")
      .single();

    if (error || !data) return null;

    const rawContent = data.conteudo_mdx || "";
    const parsed = parseFrontmatter(rawContent);

    if (!parsed && !data.titulo) return null;

    const tags = parsed?.meta?.tags || [];

    return {
      titulo: parsed?.meta?.titulo || data.titulo || "",
      slug: data.slug,
      imagem: resolveImagem(data.imagem_url, tags),
      descricao: parsed?.meta?.descricao || "",
      data: parsed?.meta?.data || data.created_at?.split("T")[0] || "",
      tags,
      content: parsed?.content || rawContent,
    };
  } catch {
    return null;
  }
}
