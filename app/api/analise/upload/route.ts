import { NextRequest, NextResponse } from "next/server";
import { fork } from "child_process";
import { writeFileSync, unlinkSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/** Caminho do script de extração (raiz do projeto) */
const SCRIPT_PATH = join(process.cwd(), "lib", "extract-pdf-text.mjs");

/**
 * Extrai texto de PDF via child_process.fork().
 * O processo filho carrega pdf-parse fora do webpack.
 */
function extractTextViaFork(buffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    const tmpPath = join(
      tmpdir(),
      `pdf_${Date.now()}_${Math.random().toString(36).slice(2)}.pdf`
    );
    writeFileSync(tmpPath, buffer);

    const child = fork(SCRIPT_PATH, [tmpPath], {
      stdio: ["pipe", "pipe", "pipe", "ipc"],
      execArgv: [],
      silent: true,
    });

    let stdout = "";
    let stderr = "";

    child.stdout?.on("data", (data: Buffer) => {
      stdout += data.toString();
    });
    child.stderr?.on("data", (data: Buffer) => {
      stderr += data.toString();
    });
    child.on("error", (err) => {
      try { unlinkSync(tmpPath); } catch {}
      reject(err);
    });
    child.on("exit", (code) => {
      try { unlinkSync(tmpPath); } catch {}
      if (code === 0 && stdout.trim()) {
        resolve(stdout.trim());
      } else {
        reject(new Error(stderr || "Falha ao extrair texto do PDF"));
      }
    });
  });
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const curriculoFile = formData.get("curriculo") as File | null;
    const linkedinFile = formData.get("linkedin") as File | null;

    if (!curriculoFile && !linkedinFile) {
      return NextResponse.json(
        { error: "Envie pelo menos um arquivo PDF" },
        { status: 400 }
      );
    }

    let curriculoTexto = "";
    let linkedinTexto = "";

    if (curriculoFile && curriculoFile.name.toLowerCase().endsWith(".pdf")) {
      const buffer = Buffer.from(await curriculoFile.arrayBuffer());
      curriculoTexto = await extractTextViaFork(buffer);
    }

    if (linkedinFile && linkedinFile.name.toLowerCase().endsWith(".pdf")) {
      const buffer = Buffer.from(await linkedinFile.arrayBuffer());
      linkedinTexto = await extractTextViaFork(buffer);
    }

    return NextResponse.json({
      curriculo_texto: curriculoTexto,
      linkedin_texto: linkedinTexto,
    });
  } catch (error: any) {
    console.error("Erro ao processar PDFs:", error?.message || error);
    return NextResponse.json(
      { error: "Erro ao processar os arquivos PDF." },
      { status: 500 }
    );
  }
}
