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
  const imagem = fm.image || fm.imagem || DEFAULT_IMAGE;

  if (!titulo || !data) return null;
  if (isNaN(new Date(data + "T12:00:00").getTime())) return null;

  return {
    meta: { titulo, slug: "", imagem, descricao, data, tags },
    content: match[2] || "",
  };
}

export async function getPosts(): Promise<PostMeta[]> {
  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from("blog_historico")
      .select("slug, titulo, conteudo_mdx, created_at")
      .eq("status", "publicado")
      .order("created_at", { ascending: false });

    if (error || !data) return [];

    const posts: PostMeta[] = [];

    for (const row of data) {
      const parsed = row.conteudo_mdx ? parseFrontmatter(row.conteudo_mdx) : null;
      if (!parsed && !row.titulo) continue;

      posts.push({
        titulo: parsed?.meta?.titulo || row.titulo || "",
        slug: row.slug,
        imagem: parsed?.meta?.imagem || DEFAULT_IMAGE,
        descricao: parsed?.meta?.descricao || "",
        data: parsed?.meta?.data || row.created_at?.split("T")[0] || "",
        tags: parsed?.meta?.tags || [],
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

    return {
      titulo: parsed?.meta?.titulo || data.titulo || "",
      slug: data.slug,
      imagem: parsed?.meta?.imagem || DEFAULT_IMAGE,
      descricao: parsed?.meta?.descricao || "",
      data: parsed?.meta?.data || data.created_at?.split("T")[0] || "",
      tags: parsed?.meta?.tags || [],
      content: parsed?.content || rawContent,
    };
  } catch {
    return null;
  }
}
