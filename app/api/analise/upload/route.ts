import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * POST /api/analise/upload
 *
 * Extrai texto de PDFs usando pdf-parse v2.4.5 (pdfjs-dist 5.x).
 * Observação: a extração principal ocorre no client-side (browser)
 * para evitar limitações de worker no serverless.
 * Esta rota é um fallback para testes e integração.
 *
 * Campos esperados no FormData:
 *   - curriculo: File (PDF)
 *   - linkedin: File (PDF)
 *
 * Retorna:
 *   { curriculo_texto: string, linkedin_texto: string }
 */

// Polyfill para Node.js 24+ (pdfjs chama Object.defineProperty em primitivos)
const _origDP = Object.defineProperty;
Object.defineProperty = function (
  obj: any,
  prop: PropertyKey,
  desc: PropertyDescriptor
) {
  if (obj == null || (typeof obj !== "object" && typeof obj !== "function"))
    return obj;
  return _origDP.call(Object, obj, prop, desc);
} as typeof Object.defineProperty;

async function extractText(buffer: Buffer): Promise<string> {
  const mod: any = await import("pdf-parse");
  const parse = new mod.PDFParse({ data: buffer, verbosity: 0 });
  await parse.load();
  const result = await parse.getText();
  return result.text || "";
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
      curriculoTexto = await extractText(buffer);
    }

    if (linkedinFile && linkedinFile.name.toLowerCase().endsWith(".pdf")) {
      const buffer = Buffer.from(await linkedinFile.arrayBuffer());
      linkedinTexto = await extractText(buffer);
    }

    return NextResponse.json({
      curriculo_texto: curriculoTexto,
      linkedin_texto: linkedinTexto,
    });
  } catch (error: any) {
    console.error("Erro ao processar PDFs:", error?.message || error);
    return NextResponse.json(
      {
        error:
          "Erro ao processar os arquivos PDF no servidor. Tente usar a extração pelo navegador.",
      },
      { status: 500 }
    );
  }
}
