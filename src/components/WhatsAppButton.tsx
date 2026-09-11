import React from 'react';
import { useTranslation } from '../i18n/i18n';

interface WhatsAppButtonProps {
  activePage: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ activePage }) => {
  const { language } = useTranslation();

  // Do not show floating button on the donation request page as it already is focused on WhatsApp communication
  if (activePage === 'donation') {
    return null;
  }

  const phone = '61480801641'; // Official WhatsApp Target: +61 480 801 641
  
  const getLocalizedMessage = (): string => {
    switch (language) {
      case 'en':
        return 'Hello, I would like to get more information about the Fundación Prospección Hancock.';
      case 'fr':
        return "Bonjour, je souhaiterais obtenir plus d'informations sur la Fundación Prospección Hancock.";
      case 'zh':
        return '您好，我想了解更多关于汉考克勘探基金会的信息。';
      case 'de':
        return 'Hallo, ich möchte gerne mehr Informationen über die Fundación Prospección Hancock erhalten.';
      case 'es':
      default:
        return 'Hola, me gustaría obtener más información sobre la Fundación Prospección Hancock.';
    }
  };

  const message = encodeURIComponent(getLocalizedMessage());
  const url = `https://wa.me/${phone}?text=${message}`;

  const getAriaLabel = (): string => {
    switch (language) {
      case 'en': return 'Contact us on WhatsApp';
      case 'fr': return 'Contactez-nous sur WhatsApp';
      case 'zh': return '在WhatsApp上联系我们';
      case 'de': return 'Kontaktieren Sie uns über WhatsApp';
      case 'es':
      default: return 'Contactar por WhatsApp';
    }
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl hover:bg-[#20ba5a] hover:scale-110 active:scale-95 transition-all duration-300 pulse-animation focus:outline-none focus:ring-4 focus:ring-[#25D366]/40 cursor-pointer"
      aria-label={getAriaLabel()}
      title={getAriaLabel()}
    >
      {/* Official WhatsApp Vector Icon */}
      <svg
        className="h-7 w-7 fill-current"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.66.986 3.292 1.503 4.883 1.504 5.308 0 9.622-4.304 9.625-9.591.002-2.561-.994-4.97-2.802-6.779-1.81-1.81-4.223-2.809-6.786-2.809-5.31 0-9.627 4.302-9.629 9.598-.001 1.705.474 3.374 1.372 4.847L1.99 21.082l4.657-1.928zm11.597-5.467c-.29-.145-1.713-.846-1.978-.941-.264-.096-.457-.145-.649.145-.192.29-.745.942-.913 1.135-.168.19-.336.213-.626.069-.29-.147-1.224-.452-2.33-1.442-.862-.77-1.443-1.72-1.612-2.012-.168-.29-.018-.448.128-.592.131-.13.29-.336.435-.505.145-.168.192-.29.29-.481.096-.193.048-.361-.024-.505-.072-.145-.649-1.564-.889-2.143-.234-.562-.472-.486-.649-.495-.166-.008-.359-.01-.552-.01-.193 0-.506.072-.77.361-.264.29-1.01 1.01-1.01 2.463 0 1.453 1.058 2.855 1.204 3.049.145.192 2.083 3.181 5.047 4.46.705.304 1.256.486 1.684.622.709.226 1.354.194 1.864.118.568-.085 1.713-.7 1.953-1.378.24-.678.24-1.258.168-1.378-.072-.12-.264-.19-.553-.336z" />
      </svg>
    </a>
  );
};
