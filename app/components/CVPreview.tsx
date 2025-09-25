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
      const canvas = await html2canvas(cvRef.current);
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF();
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('cv.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Vista Previa del CV</h2>
        <button
          onClick={downloadPDF}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Descargar PDF
        </button>
      </div>

      <div ref={cvRef} className="border rounded">
        <style dangerouslySetInnerHTML={{ __html: cvData.cssContent }} />
        <div dangerouslySetInnerHTML={{ __html: cvData.htmlContent }} />
      </div>
    </div>
  );
}