import { NextRequest, NextResponse } from "next/server";
import { fork } from "child_process";
import { writeFileSync, unlinkSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * Extrai texto de um buffer de PDF usando um processo filho
 * (child_process.fork) que roda pdf-parse fora do webpack.
 */
function extractTextViaChildProcess(buffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    // Salva o buffer em um arquivo temporário
    const tmpPath = join(tmpdir(), `pdf_${Date.now()}_${Math.random().toString(36).slice(2)}.pdf`);
    writeFileSync(tmpPath, buffer);

    const scriptPath = join(process.cwd(), "lib", "extract-pdf-text.mjs");
    const child = fork(scriptPath, [tmpPath], {
      stdio: ["pipe", "pipe", "pipe", "ipc"],
      execArgv: [], // sem flags especiais
    });

    let stdout = "";

    child.stdout?.on("data", (data: Buffer) => {
      stdout += data.toString();
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
        reject(new Error("Falha ao extrair texto do PDF"));
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
      curriculoTexto = await extractTextViaChildProcess(buffer);
    }

    if (linkedinFile && linkedinFile.name.toLowerCase().endsWith(".pdf")) {
      const buffer = Buffer.from(await linkedinFile.arrayBuffer());
      linkedinTexto = await extractTextViaChildProcess(buffer);
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
