declare module "pdfjs-dist/legacy/build/pdf.mjs" {
  export * from "pdfjs-dist";
}

declare module "pdfjs-dist" {
  export const GlobalWorkerOptions: {
    workerSrc: string;
    workerPort: any;
  };

  export function getDocument(
    params: {
      data?: ArrayBuffer | Uint8Array;
      url?: string;
      useWorkerFetch?: boolean;
      disableRange?: boolean;
      disableStream?: boolean;
      disableAutoFetch?: boolean;
      isEvalSupported?: boolean;
      enableXfa?: boolean;
      stopAtErrors?: boolean;
    }
  ): {
    promise: Promise<PDFDocumentProxy>;
  };

  export interface PDFDocumentProxy {
    numPages: number;
    getPage(pageNumber: number): Promise<PDFPageProxy>;
    destroy(): void;
  }

  export interface PDFPageProxy {
    getTextContent(): Promise<TextContent>;
    cleanup(): void;
  }

  export interface TextContent {
    items: Array<{ str: string }>;
  }
}
