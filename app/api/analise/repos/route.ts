import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const GITHUB_API = "https://api.github.com";

async function fetchGithub(url: string): Promise<any | null> {
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

/**
 * GET /api/analise/repos?username=xxx
 *
 * Retorna repositórios públicos não-fork do usuário,
 * ordenados por último commit (mais recente primeiro).
 *
 * Resposta: [{ nome, linguagem, ultimo_commit, stars }]
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");

  if (!username || !username.trim()) {
    return NextResponse.json(
      { error: "Parâmetro username é obrigatório" },
      { status: 400 }
    );
  }

  const repos = await fetchGithub(
    `${GITHUB_API}/users/${encodeURIComponent(username)}/repos?per_page=100&sort=pushed&type=owner`
  );

  if (!repos || !Array.isArray(repos)) {
    return NextResponse.json({ repos: [] });
  }

  const items = repos
    .filter((r: any) => !r.fork) // apenas não-forks
    .map((r: any) => ({
      nome: r.name,
      linguagem: r.language || null,
      ultimo_commit: r.pushed_at,
      stars: r.stargazers_count ?? 0,
    }));

  return NextResponse.json({ repos: items });
}
