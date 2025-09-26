import { generatePdfHtml } from "../utils/pdfTemplate";

export function useDownloadPdf() {
  const downloadPdf = (htmlContent: string, cssContent: string) => {
    try {
      const printWindow = window.open("", "_blank");
      if (!printWindow) {
        alert("Por favor, permite las ventanas emergentes para descargar el PDF");
        return;
      }

      const fullHTML = generatePdfHtml(htmlContent, cssContent);
      printWindow.document.write(fullHTML);
      printWindow.document.close();

      console.log("💡 Selecciona 'Guardar como PDF' en el diálogo de impresión");
    } catch (error) {
      console.error("Error al generar PDF:", error);
      alert("Error al generar el PDF. Intenta de nuevo.");
    }
  };

  return { downloadPdf };
}
