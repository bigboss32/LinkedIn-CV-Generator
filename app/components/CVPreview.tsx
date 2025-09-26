'use client';

import { useRef } from 'react';

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
      
      const printWindow = window.open('', '_blank');
      
      if (!printWindow) {
        alert('Por favor, permite las ventanas emergentes para descargar el PDF');
        return;
      }

      const fullHTML = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CV Profesional</title>
    <style>
        ${cvData.cssContent}
        
        /* Estilos optimizados para PDF */
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        
        body {
            font-family: Arial, Helvetica, sans-serif !important;
            font-size: 11pt;
            line-height: 1.3;
            color: #000;
            background: white;
            margin: 0;
            padding: 8mm;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }
        
        .cv-container {
            width: 100%;
            max-width: 194mm; /* A4 width (210mm) minus small margins (8mm x 2) */
            margin: 0 auto;
            background: white;
            padding: 0;
        }
        
        /* Tipografía optimizada para ocupar más espacio */
        h1 {
            font-size: 16pt;
            margin-bottom: 6pt;
            font-weight: bold;
            page-break-after: avoid;
            color: #000;
        }
        
        h2 {
            font-size: 13pt;
            margin-bottom: 4pt;
            margin-top: 10pt;
            font-weight: bold;
            page-break-after: avoid;
            color: #333;
        }
        
        h3 {
            font-size: 11pt;
            margin-bottom: 3pt;
            margin-top: 6pt;
            font-weight: bold;
            page-break-after: avoid;
            color: #000;
        }
        
        p, li {
            font-size: 10pt;
            margin-bottom: 3pt;
            text-align: justify;
            color: #000;
        }
        
        ul, ol {
            margin-bottom: 6pt;
            padding-left: 18pt;
        }
        
        li {
            margin-bottom: 1pt;
        }
        
        /* Secciones más compactas */
        .section {
            page-break-inside: avoid;
            margin-bottom: 10pt;
        }
        
        .experience-item, .education-item {
            page-break-inside: avoid;
            margin-bottom: 8pt;
        }
        
        .job-title, .degree-title {
            font-weight: bold;
            font-size: 11pt;
            color: #000;
            margin-bottom: 2pt;
        }
        
        .company, .institution {
            font-style: italic;
            color: #333;
            font-size: 10pt;
            margin-bottom: 1pt;
        }
        
        .date-range {
            color: #666;
            font-size: 9pt;
        }
        
        /* Información de contacto más compacta */
        .contact-info {
            text-align: center;
            margin-bottom: 12pt;
            padding-bottom: 8pt;
            border-bottom: 1pt solid #ddd;
        }
        
        .contact-info h1 {
            margin-bottom: 4pt;
            font-size: 18pt;
        }
        
        .contact-details {
            font-size: 9pt;
            color: #666;
        }
        
        /* Estilos de impresión específicos */
        @media print {
            body {
                margin: 0;
                padding: 5mm;
                font-size: 10pt;
                line-height: 1.2;
            }
            
            .cv-container {
                max-width: none;
                width: 100%;
                margin: 0;
                padding: 0;
            }
            
            h1 { font-size: 14pt; margin-bottom: 4pt; }
            h2 { font-size: 12pt; margin-bottom: 3pt; margin-top: 8pt; }
            h3 { font-size: 10pt; margin-bottom: 2pt; margin-top: 4pt; }
            p, li { font-size: 9pt; margin-bottom: 2pt; }
            
            .section {
                margin-bottom: 8pt;
            }
            
            .contact-info {
                margin-bottom: 10pt;
                padding-bottom: 6pt;
            }
            
            .contact-info h1 {
                font-size: 16pt;
                margin-bottom: 3pt;
            }
            
            .experience-item, .education-item {
                margin-bottom: 6pt;
            }
            
            ul, ol {
                padding-left: 15pt;
                margin-bottom: 4pt;
            }
        }
        
        @page {
            size: A4;
            margin: 5mm;
        }
        
        /* Evitar saltos de página indeseados */
        h1, h2, h3, h4, h5, h6 {
            page-break-after: avoid;
        }
        
        p, li {
            page-break-inside: avoid;
        }
        
        .section, .experience-item, .education-item {
            page-break-inside: avoid;
        }
    </style>
</head>
<body>
    <div class="cv-container">
        ${cvData.htmlContent}
    </div>
    
    <script>
        // Función para imprimir automáticamente
        window.onload = function() {
            // Dar tiempo para que se carguen los estilos
            setTimeout(() => {
                window.print();
                
                // Cerrar ventana después de imprimir
                window.onafterprint = function() {
                    setTimeout(() => {
                        window.close();
                    }, 500);
                };
                
                // También cerrar si se cancela la impresión
                setTimeout(() => {
                    if (!window.closed) {
                        window.close();
                    }
                }, 15000); // 15 segundos de timeout
            }, 800);
        };
        
        // Mensaje de instrucciones
        setTimeout(() => {
            if (!window.closed) {
                console.log('En el diálogo de impresión, selecciona "Guardar como PDF" como destino');
            }
        }, 1000);
    </script>
</body>
</html>`;

      printWindow.document.write(fullHTML);
      printWindow.document.close();
      
      // Información para el usuario
      console.log('💡 Instrucción: En el diálogo de impresión que se abre, selecciona "Guardar como PDF" como destino');
      
    } catch (error) {
      console.error('Error al generar PDF:', error);
      alert('Error al generar el PDF. Por favor, inténtalo de nuevo.');
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
          className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-green-400 to-emerald-500 hover:opacity-90 shadow-lg hover:shadow-emerald-500/30 transition-all flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Descargar PDF
        </button>
      </div>

      {/* Instrucciones para el usuario */}
      <div className="mb-4 p-4 bg-blue-500/20 border border-blue-400/30 rounded-lg">
        <p className="text-sm text-blue-100">
          💡 <strong>Instrucciones:</strong> Al hacer clic en "Descargar PDF", se abrirá una ventana de impresión. 
          Selecciona <strong>"Guardar como PDF"</strong> como destino para obtener un PDF con texto seleccionable.
        </p>
      </div>

      {/* Vista previa del CV */}
      <div
        ref={cvRef}
        className="bg-white text-black border rounded-xl shadow-lg p-8 max-h-[75vh] overflow-y-auto"
        style={{
          fontFamily: 'Arial, sans-serif',
          fontSize: '13px',
          lineHeight: '1.4',
          maxWidth: '794px',
          margin: '0 auto'
        }}
      >
        <style dangerouslySetInnerHTML={{ __html: `
          ${cvData.cssContent}
          
          /* Estilos de preview consistentes con PDF */
          .cv-container h1 {
            font-size: 20px;
            margin-bottom: 8px;
            font-weight: bold;
            color: #000;
          }
          
          .cv-container h2 {
            font-size: 16px;
            margin: 12px 0 6px 0;
            font-weight: bold;
            color: #333;
          }
          
          .cv-container h3 {
            font-size: 14px;
            margin: 10px 0 4px 0;
            font-weight: bold;
            color: #000;
          }
          
          .cv-container p, .cv-container li {
            font-size: 13px;
            margin-bottom: 4px;
            line-height: 1.4;
            color: #000;
          }
          
          .cv-container .section {
            margin-bottom: 20px;
          }
          
          .cv-container .contact-info {
            text-align: center;
            margin-bottom: 25px;
            padding-bottom: 15px;
            border-bottom: 1px solid #ddd;
          }
          
          .cv-container ul, .cv-container ol {
            margin: 8px 0;
            padding-left: 20px;
          }
          
          .cv-container li {
            margin-bottom: 3px;
          }
          
          /* Asegurar que ocupe máximo espacio en preview */
          .cv-container {
            width: 100%;
            max-width: 794px;
          }
        ` }} />
        <div dangerouslySetInnerHTML={{ __html: cvData.htmlContent }} />
      </div>
    </div>
  );
}