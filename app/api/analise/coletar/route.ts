import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const GITHUB_API = "https://api.github.com";
const SOURCE_EXTS = [".js", ".ts", ".py", ".java"];
const REPO_LIMIT = 5;
const FILES_PER_REPO = 3;
const FILE_LINE_LIMIT = 300;
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

/* ---------- helpers ---------- */

async function getGithubJson(url: string): Promise<any | null> {
  const pat = process.env.GITHUB_PAT;
  if (!pat) return null;
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${pat}`,
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "meupasso-analise",
      },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

async function getGithubFileContent(url: string): Promise<string | null> {
  const data = await getGithubJson(url);
  if (!data?.content || !data?.encoding) return null;
  return Buffer.from(data.content, "base64").toString("utf-8");
}

interface RepoFile {
  nome: string;
  conteudo: string;
}

/** Coleta README + até N arquivos-fonte da raiz ou /src. */
async function collectRepoFiles(
  username: string,
  repoName: string
): Promise<RepoFile[]> {
  const files: RepoFile[] = [];
  const baseUrl = `${GITHUB_API}/repos/${username}/${repoName}/contents`;

  // README
  const readme = await getGithubFileContent(`${baseUrl}/README.md`);
  if (readme) files.push({ nome: "README.md", conteudo: readme });

  const root = await getGithubJson(`${baseUrl}`);
  if (!root || !Array.isArray(root)) return files;

  const sourceFiles = root.filter(
    (item: any) =>
      item.type === "file" &&
      SOURCE_EXTS.some((ext) => item.name.endsWith(ext))
  );

  let collected = 0;
  for (const file of sourceFiles) {
    if (collected >= FILES_PER_REPO) break;
    const content = await getGithubFileContent(file.url);
    if (content) {
      const lines = content.split("\n");
      files.push({
        nome: file.path,
        conteudo: lines.slice(0, FILE_LINE_LIMIT).join("\n"),
      });
      collected++;
    }
  }

  if (collected < FILES_PER_REPO) {
    const hasSrc = root.some(
      (item: any) => item.type === "dir" && item.name === "src"
    );
    if (hasSrc) {
      const srcContents = await getGithubJson(`${baseUrl}/src`);
      if (Array.isArray(srcContents)) {
        const srcFiles = srcContents.filter(
          (item: any) =>
            item.type === "file" &&
            SOURCE_EXTS.some((ext) => item.name.endsWith(ext))
        );
        for (const file of srcFiles) {
          if (collected >= FILES_PER_REPO) break;
          const content = await getGithubFileContent(file.url);
          if (content) {
            const lines = content.split("\n");
            files.push({ nome: file.path, conteudo: lines.slice(0, FILE_LINE_LIMIT).join("\n") });
            collected++;
          }
        }
      }
    }
  }

  return files;
}

/* ---------- scoring ---------- */

interface RepoInfo {
  name: string;
  description: string | null;
  language: string | null;
  html_url: string;
  pushed_at: string;
  size: number;
  forks_count: number;
  stargazers_count: number;
  has_readme: boolean;
  commit_count: number;
}

/** Calcula pontuação de um repo para seleção automática. */
function scoreRepo(repo: RepoInfo, selectedLangs: Set<string>): number {
  let score = 0;
  if (repo.has_readme) score += 3;
  if (repo.pushed_at) {
    const daysSincePush = Date.now() - new Date(repo.pushed_at).getTime();
    if (daysSincePush < THIRTY_DAYS_MS) score += 2;
  }
  if (repo.commit_count > 5) score += 2;
  if (repo.language && !selectedLangs.has(repo.language)) score += 1;
  return score;
}

/** Busca informações detalhadas de um repo para scoring. */
async function getRepoInfo(
  username: string,
  repoName: string
): Promise<RepoInfo> {
  const repoData = await getGithubJson(
    `${GITHUB_API}/repos/${username}/${repoName}`
  );

  // Verificar se tem README
  const readme = await getGithubFileContent(
    `${GITHUB_API}/repos/${username}/${repoName}/contents/README.md`
  );

  // Contagem de commits (máximo 30 para não exceder rate limit)
  const commits = await getGithubJson(
    `${GITHUB_API}/repos/${username}/${repoName}/commits?per_page=1&page=1`
  );
  let commitCount = 0;
  if (commits && Array.isArray(commits)) {
    // Tentar pegar count total do header Link, fallback: assume muitos commits
    commitCount = commits.length === 1 ? 30 : commits.length;
    if (commits.length > 0) commitCount = Math.max(5, commits.length);
  }

  return {
    name: repoData?.name || repoName,
    description: repoData?.description || null,
    language: repoData?.language || null,
    html_url: repoData?.html_url || "",
    pushed_at: repoData?.pushed_at || "",
    size: repoData?.size || 0,
    forks_count: repoData?.forks_count || 0,
    stargazers_count: repoData?.stargazers_count || 0,
    has_readme: !!readme,
    commit_count: commitCount,
  };
}

/* ---------- route ---------- */

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const {
      objetivo_vaga,
      github_username,
      curriculo_texto,
      linkedin_texto,
      email_contato,
      repos_selecionados: reposEscolhidos, // opcional: nomes de repos escolhidos pelo usuário
    } = await req.json();

    if (!curriculo_texto || !linkedin_texto) {
      return NextResponse.json(
        { error: "curriculo_texto e linkedin_texto são obrigatórios." },
        { status: 400 }
      );
    }

    /* --- coleta GitHub --- */
    let jsonGithub: any[] | null = null;
    let reposAnalisados: string[] = [];

    if (github_username && typeof github_username === "string") {
      const username = github_username;

      // Buscar lista de repos
      const allRepos = await getGithubJson(
        `${GITHUB_API}/users/${encodeURIComponent(username)}/repos?per_page=100&sort=pushed&type=owner`
      );

      let reposToProcess: string[] = [];

      if (reposEscolhidos && Array.isArray(reposEscolhidos) && reposEscolhidos.length > 0) {
        // Usar repos escolhidos pelo usuário
        reposToProcess = reposEscolhidos.slice(0, REPO_LIMIT);
      } else if (allRepos && Array.isArray(allRepos)) {
        // --- SCORING AUTOMÁTICO ---
        const nonForks = allRepos.filter((r: any) => !r.fork);
        const selectedLangs = new Set<string>();

        // Buscar info detalhada de cada repo para scoring
        const scored: { name: string; score: number; pushed_at: string }[] = [];

        for (const repo of nonForks) {
          const info = await getRepoInfo(username, repo.name);
          const s = scoreRepo(info, selectedLangs);
          if (s > 0 || info.has_readme) {
            scored.push({ name: repo.name, score: s, pushed_at: repo.pushed_at || "" });
          }
          if (info.language) selectedLangs.add(info.language);
        }

        // Ordenar por score (decrescente) depois por pushed_at (mais recente)
        scored.sort((a, b) => {
          if (b.score !== a.score) return b.score - a.score;
          return (b.pushed_at || "").localeCompare(a.pushed_at || "");
        });

        reposToProcess = scored.slice(0, REPO_LIMIT).map((r) => r.name);
      }

      // Coletar dados
      if (reposToProcess.length > 0) {
        reposAnalisados = reposToProcess;

        // Buscar dados completos de cada repo
        const repoDetails = await Promise.all(
          reposToProcess.map((name) =>
            getGithubJson(`${GITHUB_API}/repos/${username}/${name}`)
          )
        );

        const githubData: any[] = [];
        for (let i = 0; i < reposToProcess.length; i++) {
          const repo = repoDetails[i];
          const files = await collectRepoFiles(username, reposToProcess[i]);
          githubData.push({
            repo: reposToProcess[i],
            descricao: repo?.description || null,
            linguagem: repo?.language || null,
            url: repo?.html_url || "",
            arquivos: files,
          });
        }

        jsonGithub = githubData;
      }
    }

    /* --- salvar no banco --- */
    const insertData: Record<string, any> = {
      user_id: user.id,
      status: "processando",
      email_contato: email_contato || null,
      objetivo_vaga: objetivo_vaga || null,
      github_username: github_username || null,
      json_curriculo: curriculo_texto ? { texto: curriculo_texto } : null,
      json_linkedin: linkedin_texto ? { texto: linkedin_texto } : null,
      json_github: jsonGithub,
    };

    if (reposAnalisados.length > 0) {
      insertData.repos_selecionados = reposAnalisados;
    }

    const { data, error } = await supabase
      .from("analises_empregabilidade")
      .insert(insertData)
      .select("id")
      .single();

    if (error) {
      console.error("Erro ao salvar análise:", error);
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
