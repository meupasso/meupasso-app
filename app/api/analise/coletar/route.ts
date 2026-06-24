import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const GITHUB_API = "https://api.github.com";
const SOURCE_EXTS = [".js", ".ts", ".py", ".java"];

/* ---------- helpers ---------- */

async function getGithubJson(url: string): Promise<any | null> {
  const pat = process.env.GITHUB_PAT;
  if (!pat) {
    console.error("GITHUB_PAT não configurado no .env");
    return null;
  }
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${pat}`,
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "meupasso-analise",
      },
    });
    if (!res.ok) {
      console.warn(`GitHub API ${res.status} — ${url}`);
      return null;
    }
    return res.json();
  } catch (err) {
    console.error(`Erro ao acessar GitHub API (${url}):`, err);
    return null;
  }
}

async function getGithubFileContent(url: string): Promise<string | null> {
  const data = await getGithubJson(url);
  if (!data?.content || !data?.encoding) return null;
  // GitHub Contents API returns base64-encoded content
  return Buffer.from(data.content, "base64").toString("utf-8");
}

interface RepoFile {
  nome: string;
  conteudo: string;
}

/**
 * Coleta README + até 3 arquivos-fonte da raiz ou /src de um repositório.
 * Cada arquivo é limitado a 300 linhas.
 */
async function collectRepoFiles(
  username: string,
  repoName: string
): Promise<RepoFile[]> {
  const files: RepoFile[] = [];
  const baseUrl = `${GITHUB_API}/repos/${username}/${repoName}/contents`;

  // 1. README.md
  const readme = await getGithubFileContent(`${baseUrl}/README.md`);
  if (readme) {
    files.push({ nome: "README.md", conteudo: readme });
  }

  // 2. Listar conteúdo da raiz
  const root = await getGithubJson(`${baseUrl}`);
  if (!root || !Array.isArray(root)) return files;

  // Filtrar arquivos-fonte na raiz
  const rootSourceFiles = root.filter(
    (item: any) =>
      item.type === "file" &&
      SOURCE_EXTS.some((ext) => item.name.endsWith(ext))
  );

  // 3. Ler até 3 arquivos-fonte (da raiz primeiro)
  const sourceLimit = 3;
  let collected = 0;

  for (const file of rootSourceFiles) {
    if (collected >= sourceLimit) break;
    const content = await getGithubFileContent(file.url);
    if (content) {
      const lines = content.split("\n");
      files.push({
        nome: file.path,
        conteudo: lines.slice(0, 300).join("\n"),
      });
      collected++;
    }
  }

  // 4. Se ainda faltam arquivos, tentar /src
  if (collected < sourceLimit) {
    const hasSrc =
      root.some((item: any) => item.type === "dir" && item.name === "src");
    if (hasSrc) {
      const srcContents = await getGithubJson(`${baseUrl}/src`);
      if (Array.isArray(srcContents)) {
        const srcFiles = srcContents.filter(
          (item: any) =>
            item.type === "file" &&
            SOURCE_EXTS.some((ext) => item.name.endsWith(ext))
        );
        for (const file of srcFiles) {
          if (collected >= sourceLimit) break;
          const content = await getGithubFileContent(file.url);
          if (content) {
            const lines = content.split("\n");
            files.push({
              nome: file.path,
              conteudo: lines.slice(0, 300).join("\n"),
            });
            collected++;
          }
        }
      }
    }
  }

  return files;
}

/* ---------- route ---------- */

/**
 * POST /api/analise/coletar
 *
 * Coleta dados iniciais da Análise de Empregabilidade:
 *   - Currículo e LinkedIn (texto já extraído pelo front-end ou via /upload)
 *   - Repositórios do GitHub (via API com PAT)
 *
 * Body (JSON):
 *   { objetivo_vaga, github_username, curriculo_texto, linkedin_texto }
 *
 * Retorna:
 *   { id: "uuid-da-analise-criada" }
 */
export async function POST(req: NextRequest) {
  try {
    /* --- autenticação --- */
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json(
        { error: "Não autenticado" },
        { status: 401 }
      );
    }

    /* --- body --- */
    const { objetivo_vaga, github_username, curriculo_texto, linkedin_texto } =
      await req.json();

    if (!curriculo_texto || !linkedin_texto) {
      return NextResponse.json(
        {
          error:
            "curriculo_texto e linkedin_texto são obrigatórios. Extraia-os via /api/analise/upload primeiro.",
        },
        { status: 400 }
      );
    }

    /* --- coleta GitHub --- */
    let jsonGithub: any[] | null = null;

    if (github_username && typeof github_username === "string") {
      const repos = await getGithubJson(
        `${GITHUB_API}/users/${encodeURIComponent(
          github_username
        )}/repos?sort=updated&per_page=3&type=owner`
      );

      if (repos && Array.isArray(repos) && repos.length > 0) {
        const githubData: any[] = [];

        for (const repo of repos) {
          const files = await collectRepoFiles(github_username, repo.name);

          githubData.push({
            repo: repo.name,
            descricao: repo.description,
            linguagem: repo.language,
            url: repo.html_url,
            arquivos: files,
          });
        }

        jsonGithub = githubData;
      }
    }

    /* --- salvar no banco --- */
    const { data, error } = await supabase
      .from("analises_empregabilidade")
      .insert({
        user_id: user.id,
        status: "processando",
        objetivo_vaga: objetivo_vaga || null,
        github_username: github_username || null,
        json_curriculo: curriculo_texto ? { texto: curriculo_texto } : null,
        json_linkedin: linkedin_texto ? { texto: linkedin_texto } : null,
        json_github: jsonGithub,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Erro ao salvar análise no banco:", error);
      return NextResponse.json(
        { error: "Erro ao salvar análise no banco de dados" },
        { status: 500 }
      );
    }

    return NextResponse.json({ id: data.id });
  } catch (error) {
    console.error("Erro na coleta de dados:", error);
    return NextResponse.json(
      { error: "Erro interno ao processar a solicitação" },
      { status: 500 }
    );
  }
}
