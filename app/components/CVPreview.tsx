'use client';

import { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface CVPreviewProps {
  cvData: {
    htmlContent: string;
    cssContent: string;
  };
}

export default function CVPreview({ cvData }: CVPreviewProps) {
  const cvRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    if (!cvRef.current) return;

    try {
      const element = cvRef.current;
      
      // Crear un contenedor temporal con estilos específicos para PDF
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'absolute';
      tempContainer.style.top = '-99999px';
      tempContainer.style.left = '-99999px';
      tempContainer.style.width = '794px'; // Ancho A4 en px (210mm)
      tempContainer.style.backgroundColor = '#ffffff';
      tempContainer.style.padding = '40px';
      tempContainer.style.fontFamily = 'Arial, sans-serif';
      tempContainer.style.fontSize = '14px';
      tempContainer.style.lineHeight = '1.4';
      tempContainer.style.color = '#000000';
      
      // Clonar el contenido
      const clonedContent = element.cloneNode(true) as HTMLElement;
      
      // Aplicar estilos al contenido clonado para PDF
      clonedContent.style.maxHeight = 'none';
      clonedContent.style.overflow = 'visible';
      clonedContent.style.height = 'auto';
      clonedContent.style.width = '100%';
      clonedContent.style.padding = '0';
      clonedContent.style.margin = '0';
      clonedContent.style.border = 'none';
      clonedContent.style.borderRadius = '0';
      clonedContent.style.boxShadow = 'none';
      clonedContent.style.backgroundColor = 'transparent';
      
      // Añadir estilos CSS específicos para PDF
      const pdfStyles = document.createElement('style');
      pdfStyles.textContent = `
        ${cvData.cssContent}
        
        /* Estilos específicos para PDF */
        * {
          box-sizing: border-box;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        
        h1, h2, h3, h4, h5, h6 {
          page-break-after: avoid;
          margin-top: 0.5em;
          margin-bottom: 0.3em;
        }
        
        p, li {
          page-break-inside: avoid;
          margin-bottom: 0.5em;
        }
        
        .section {
          page-break-inside: avoid;
          margin-bottom: 1em;
        }
        
        img {
          max-width: 100%;
          height: auto;
        }
      `;
      
      tempContainer.appendChild(pdfStyles);
      tempContainer.appendChild(clonedContent);
      document.body.appendChild(tempContainer);

      // Esperar renderizado completo
      await new Promise(resolve => setTimeout(resolve, 800));

      // Capturar con configuración optimizada
      const canvas = await html2canvas(tempContainer, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: tempContainer.offsetWidth,
        height: tempContainer.offsetHeight,
        scrollX: 0,
        scrollY: 0,
        windowWidth: tempContainer.offsetWidth,
        windowHeight: tempContainer.offsetHeight
      });

      // Limpiar el DOM
      document.body.removeChild(tempContainer);

      // Crear PDF con dimensiones A4
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
      });

      const pageWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const margin = 20;
      
      const contentWidth = pageWidth - (margin * 2);
      const contentHeight = pageHeight - (margin * 2);
      
      // Calcular escalado
      const imgRatio = canvas.height / canvas.width;
      const pdfWidth = contentWidth;
      const pdfHeight = pdfWidth * imgRatio;

      if (pdfHeight <= contentHeight) {
        // Cabe en una página
        pdf.addImage(canvas.toDataURL('image/png', 0.9), 'PNG', margin, margin, pdfWidth, pdfHeight);
      } else {
        // Múltiples páginas - dividir inteligentemente
        const pagesNeeded = Math.ceil(pdfHeight / contentHeight);
        const pageContentHeight = contentHeight;
        const canvasSliceHeight = canvas.height / pagesNeeded;
        
        for (let page = 0; page < pagesNeeded; page++) {
          if (page > 0) pdf.addPage();
          
          // Crear slice del canvas para esta página
          const sliceCanvas = document.createElement('canvas');
          const sliceCtx = sliceCanvas.getContext('2d');
          
          sliceCanvas.width = canvas.width;
          sliceCanvas.height = canvasSliceHeight;
          
          if (sliceCtx) {
            // Fondo blanco
            sliceCtx.fillStyle = '#ffffff';
            sliceCtx.fillRect(0, 0, sliceCanvas.width, sliceCanvas.height);
            
            // Copiar porción del canvas original
            sliceCtx.drawImage(
              canvas,
              0, page * canvasSliceHeight, // source x, y
              canvas.width, canvasSliceHeight, // source width, height
              0, 0, // dest x, y
              sliceCanvas.width, sliceCanvas.height // dest width, height
            );
            
            const sliceImage = sliceCanvas.toDataURL('image/png', 0.9);
            pdf.addImage(sliceImage, 'PNG', margin, margin, pdfWidth, pageContentHeight);
          }
        }
      }

      pdf.save('cv-completo.pdf');
      
    } catch (error) {
      console.error('Error al generar PDF:', error);
      alert('Error al generar el PDF. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-xl p-8 text-white transition-all hover:shadow-blue-500/20">
      {/* Header con título y botón */}
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-indigo-400 bg-clip-text text-transparent">
          Vista Previa del CV
        </h2>
        <button
          onClick={downloadPDF}
          className="px-6 py-2 rounded-xl font-semibold text-white bg-gradient-to-r from-green-400 to-emerald-500 hover:opacity-90 shadow-lg hover:shadow-emerald-500/30 transition-all"
        >
          📄 Descargar PDF
        </button>
      </div>

      {/* Hoja de CV */}
      <div
        ref={cvRef}
        className="bg-white text-black border rounded-xl shadow-lg p-6 max-h-[75vh] overflow-y-auto"
      >
        <style dangerouslySetInnerHTML={{ __html: cvData.cssContent }} />
        <div dangerouslySetInnerHTML={{ __html: cvData.htmlContent }} />
      </div>
    </div>
  );
}