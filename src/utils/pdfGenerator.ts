import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface GeneratePdfOptions {
  filename?: string;
  elementId: string;
}

/**
 * Generates an official, high-resolution multi-page or single-page A4 PDF from a DOM element
 */
export const generatePdfFromElement = async ({
  filename = 'Expediente_Donacion_FPH.pdf',
  elementId,
}: GeneratePdfOptions): Promise<boolean> => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id "${elementId}" not found`);
    return false;
  }

  try {
    // Render the DOM node to high-DPI canvas
    const canvas = await html2canvas(element, {
      scale: 2, // High resolution for crisp printing and vector-like look
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      allowTaint: true,
      imageTimeout: 15000,
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.96);

    // Standard A4 dimensions in mm: 210 x 297
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pdfPageWidth = pdf.internal.pageSize.getWidth();
    const pdfPageHeight = pdf.internal.pageSize.getHeight();

    // Scale image to fit A4 page width
    const imgWidth = pdfPageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // Render first page
    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
    heightLeft -= pdfPageHeight;

    // Append additional pages if the dossier content spans multiple pages
    let pageNumber = 1;
    while (heightLeft > 2) { // 2mm tolerance
      position -= pdfPageHeight;
      pdf.addPage();
      pageNumber++;
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pdfPageHeight;
    }

    // Save with sanitized filename
    const cleanFilename = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;
    pdf.save(cleanFilename);
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    return false;
  }
};
