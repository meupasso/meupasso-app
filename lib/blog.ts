import { blogRegistry, type BlogPost } from "./blog-data";

export type PostMeta = { titulo: string; slug: string; imagem: string; descricao: string; data: string; tags: string[]; };
export type PostCompleto = PostMeta & { content: string; };

export function getPosts(): PostMeta[] { return blogRegistry.map(({content, ...m}) => ({...m, imagem: ""})); }
export function getPost(slug: string): PostCompleto | null { const p = blogRegistry.find(p => p.slug === slug); return p ? { ...p, imagem: "" } : null; }
