'use client';

import { useRef } from "react";
import { useDownloadPdf } from "../hooks/useDownloadPdf";

interface CVPreviewProps {
  cvData: {
    htmlContent: string;
    cssContent: string;
  };
}

export default function CVPreview({ cvData }: CVPreviewProps) {
  const cvRef = useRef<HTMLDivElement>(null);
  const { downloadPdf } = useDownloadPdf();

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-xl p-8 text-white">

      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-indigo-400 bg-clip-text text-transparent">
          Vista Previa del CV
        </h2>
        <button
          onClick={() => downloadPdf(cvData.htmlContent, cvData.cssContent)}
          className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-green-400 to-emerald-500 hover:opacity-90 shadow-lg flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0
              012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0
              01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Descargar PDF
        </button>
      </div>
      <div className="mb-4 p-4 bg-blue-500/20 border border-blue-400/30 rounded-lg">
        <p className="text-sm text-blue-100">
          💡 <strong>Instrucciones:</strong> Se abrirá una ventana de impresión.
          Selecciona <strong>Guardar como PDF</strong> como destino.
        </p>
      </div>
      <div
        ref={cvRef}
        className="bg-white text-black border rounded-xl shadow-lg p-8 max-h-[75vh] overflow-y-auto"
        style={{ maxWidth: "794px", margin: "0 auto" }}
      >
        <style dangerouslySetInnerHTML={{ __html: cvData.cssContent }} />
        <div dangerouslySetInnerHTML={{ __html: cvData.htmlContent }} />
      </div>
    </div>
  );
}
