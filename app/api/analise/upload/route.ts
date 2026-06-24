import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * POST /api/analise/upload
 *
 * Recebe PDFs de currículo e LinkedIn via multipart/form-data,
 * extrai o texto de cada PDF usando pdf-parse e retorna como string.
 *
 * Campos esperados no FormData:
 *   - curriculo: File (PDF)
 *   - linkedin: File (PDF)
 *
 * Retorna:
 *   { curriculo_texto: string, linkedin_texto: string }
 */
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const curriculoFile = formData.get("curriculo") as File | null;
    const linkedinFile = formData.get("linkedin") as File | null;

    if (!curriculoFile && !linkedinFile) {
      return NextResponse.json(
        { error: "Envie pelo menos um arquivo PDF (curriculo ou linkedin)" },
        { status: 400 }
      );
    }

    let curriculoTexto = "";
    let linkedinTexto = "";

    if (curriculoFile && curriculoFile.name.toLowerCase().endsWith(".pdf")) {
      const buffer = Buffer.from(await curriculoFile.arrayBuffer());
      const pdfParse = (await import("pdf-parse")).default;
      const data = await pdfParse(buffer);
      curriculoTexto = data.text;
    }

    if (linkedinFile && linkedinFile.name.toLowerCase().endsWith(".pdf")) {
      const buffer = Buffer.from(await linkedinFile.arrayBuffer());
      const pdfParse = (await import("pdf-parse")).default;
      const data = await pdfParse(buffer);
      linkedinTexto = data.text;
    }

    return NextResponse.json({
      curriculo_texto: curriculoTexto,
      linkedin_texto: linkedinTexto,
    });
  } catch (error) {
    console.error("Erro ao processar PDFs:", error);
    return NextResponse.json(
      { error: "Erro ao processar os arquivos PDF. Verifique se são válidos." },
      { status: 500 }
    );
  }
}
