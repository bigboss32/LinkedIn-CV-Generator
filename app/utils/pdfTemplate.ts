export function generatePdfHtml(htmlContent: string, cssContent: string): string {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>CV Profesional</title>
  <style>
    ${cssContent}

    /* Estilos optimizados para PDF */
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: Arial, Helvetica, sans-serif;
      font-size: 11pt;
      line-height: 1.3;
      color: #000;
      background: white;
      margin: 0;
      padding: 8mm;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .cv-container { width: 100%; max-width: 194mm; margin: 0 auto; background: white; }
    h1 { font-size: 16pt; margin-bottom: 6pt; font-weight: bold; }
    h2 { font-size: 13pt; margin-bottom: 4pt; margin-top: 10pt; font-weight: bold; }
    h3 { font-size: 11pt; margin-bottom: 3pt; margin-top: 6pt; font-weight: bold; }
    p, li { font-size: 10pt; margin-bottom: 3pt; text-align: justify; }
    @media print { body { font-size: 10pt; } }
    @page { size: A4; margin: 5mm; }
  </style>
</head>
<body>
  <div class="cv-container">
    ${htmlContent}
  </div>
  <script>
    window.onload = function() {
      setTimeout(() => {
        window.print();
        window.onafterprint = () => setTimeout(() => window.close(), 500);
        setTimeout(() => { if (!window.closed) window.close(); }, 15000);
      }, 800);
    };
  </script>
</body>
</html>
`;
}
