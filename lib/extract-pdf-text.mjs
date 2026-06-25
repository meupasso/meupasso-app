#!/usr/bin/env node

/**
 * Script standalone para extrair texto de PDFs.
 * Executado via child_process.fork() para evitar o bundling do webpack.
 *
 * Uso: node lib/extract-pdf-text.mjs <caminho-do-pdf>
 * Saída: stdout com o texto extraído (string pura)
 */

import { readFileSync } from "fs";

// Polyfill Node.js 24+
const _dp = Object.defineProperty;
Object.defineProperty = (obj, prop, desc) => {
  if (obj == null || (typeof obj !== "object" && typeof obj !== "function"))
    return obj;
  return _dp(obj, prop, desc);
};

const filePath = process.argv[2];
if (!filePath) process.exit(1);

let buffer;
try {
  buffer = readFileSync(filePath);
} catch {
  process.exit(1);
}

import("pdf-parse")
  .then(async (mod) => {
    const parse = new mod.PDFParse({ data: buffer, verbosity: 0 });
    await parse.load();
    const result = await parse.getText();
    process.stdout.write(result.text || "");
    Object.defineProperty = _dp;
  })
  .catch(() => {
    Object.defineProperty = _dp;
    process.exit(1);
  });
