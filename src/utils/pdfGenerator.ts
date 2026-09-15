import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface GeneratePdfOptions {
  filename?: string;
  elementId: string;
}

/**
 * Normalizes any modern CSS color (oklab, oklch, lab, lch) to standard RGB/Hex
 * using the browser's built-in canvas color parser
 */
const colorCanvas = typeof document !== 'undefined' ? document.createElement('canvas') : null;
if (colorCanvas) {
  colorCanvas.width = 1;
  colorCanvas.height = 1;
}
const colorCtx = colorCanvas ? colorCanvas.getContext('2d', { willReadFrequently: true }) : null;

const toRgbColor = (colorStr: string): string => {
  if (!colorStr) return colorStr;
  // If standard hex or rgb, no conversion needed
  if (!colorStr.includes('oklab') && !colorStr.includes('oklch') && !colorStr.includes('color(') && !colorStr.includes('lab(')) {
    return colorStr;
  }
  if (!colorCtx) return '#1a202c';
  try {
    colorCtx.fillStyle = '#000000';
    colorCtx.fillStyle = colorStr;
    return colorCtx.fillStyle; // Browser canvas getter always returns standard #rrggbb or rgba(...)
  } catch {
    return '#1a202c';
  }
};

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
    // Render the DOM node to high-DPI canvas with full oklab/oklch sanitization
    const canvas = await html2canvas(element, {
      scale: 2, // High resolution for crisp printing and vector-like look
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      allowTaint: true,
      imageTimeout: 15000,
      onclone: (clonedDoc, clonedElement) => {
        // 1. Sanitize all elements inside clonedElement to prevent unsupported color errors
        const allNodes = [clonedElement, ...Array.from(clonedElement.querySelectorAll('*'))] as HTMLElement[];
        allNodes.forEach((node) => {
          if (!node.style) return;

          // Remove box-shadows that often embed modern oklab definitions in Tailwind v4
          node.style.boxShadow = 'none';
          node.style.textShadow = 'none';

          // Sanitize computed colors
          try {
            const cs = window.getComputedStyle(node);
            if (cs.color && (cs.color.includes('oklab') || cs.color.includes('oklch'))) {
              node.style.color = toRgbColor(cs.color);
            }
            if (cs.backgroundColor && (cs.backgroundColor.includes('oklab') || cs.backgroundColor.includes('oklch'))) {
              node.style.backgroundColor = toRgbColor(cs.backgroundColor);
            }
            if (cs.borderColor && (cs.borderColor.includes('oklab') || cs.borderColor.includes('oklch'))) {
              node.style.borderColor = toRgbColor(cs.borderColor);
            }
          } catch {
            // Ignore style computation errors on individual elements
          }
        });

        // 2. Remove or sanitize any style tags containing oklab in the cloned document
        try {
          const styleTags = clonedDoc.querySelectorAll('style');
          styleTags.forEach((styleTag) => {
            if (styleTag.textContent && (styleTag.textContent.includes('oklab') || styleTag.textContent.includes('oklch'))) {
              styleTag.textContent = styleTag.textContent
                .replace(/oklab\([^)]+\)/gi, '#1a202c')
                .replace(/oklch\([^)]+\)/gi, '#1a202c');
            }
          });
        } catch {
          // Ignore style tag sanitization errors
        }
      },
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
    while (heightLeft > 2) {
      position -= pdfPageHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pdfPageHeight;
    }

    // Save with sanitized filename
    const cleanFilename = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;

    // Download using direct Blob link for 100% browser compatibility
    try {
      const blob = pdf.output('blob');
      const blobUrl = URL.createObjectURL(blob);
      const downloadLink = document.createElement('a');
      downloadLink.href = blobUrl;
      downloadLink.download = cleanFilename;
      downloadLink.style.display = 'none';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      setTimeout(() => {
        if (downloadLink.parentNode) {
          downloadLink.parentNode.removeChild(downloadLink);
        }
        URL.revokeObjectURL(blobUrl);
      }, 500);
    } catch {
      // Fallback to standard jspdf save
      pdf.save(cleanFilename);
    }

    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    return false;
  }
};
