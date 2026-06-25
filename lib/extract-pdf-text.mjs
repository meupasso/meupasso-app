#!/usr/bin/env node

/**
 * Script standalone para extrair texto de PDFs.
 * Executado via child_process.fork() para evitar completamente
 * o bundling do webpack do Next.js.
 *
 * Uso: node lib/extract-pdf-text.mjs <caminho-do-pdf>
 * Saída: stdout com o texto extraído (string pura)
 * Código de saída: 0 sucesso, 1 erro
 */

import { readFileSync } from "fs";

// Polyfill para Node.js 24+ (pdfjs chama Object.defineProperty em primitivos)
const _defineProp = Object.defineProperty;
Object.defineProperty = (obj, prop, desc) => {
  if (obj == null || (typeof obj !== "object" && typeof obj !== "function"))
    return obj;
  return _defineProp(obj, prop, desc);
};

const filePath = process.argv[2];
if (!filePath) {
  process.exit(1);
}

let buffer;
try {
  buffer = readFileSync(filePath);
} catch {
  process.exit(1);
}

import("pdf-parse")
  .then(async (mod) => {
    const PDFParse = mod.PDFParse;

    const parse = new PDFParse({
      data: buffer,
      verbosity: 0, // ERRORS only
    });

    await parse.load();
    const result = await parse.getText();
    process.stdout.write(result.text || "");
    Object.defineProperty = _defineProp;
  })
  .catch(() => {
    Object.defineProperty = _defineProp;
    process.exit(1);
  });
