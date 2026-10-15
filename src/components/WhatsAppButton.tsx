import React, { useState } from 'react';
import { useTranslation } from '../i18n/i18n';
import { X, MessageSquare, ExternalLink } from 'lucide-react';

interface WhatsAppButtonProps {
  activePage: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ activePage }) => {
  const { language } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  // Do not show floating button on the donation request page as it already is focused on WhatsApp communication
  if (activePage === 'donation') {
    return null;
  }

  const phone1 = '13257187098'; // Ligne 1 : +1 (325) 718-7098
  const phone2 = '528110356311'; // Ligne 2 : +52 81 1035 6311

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
  const urlPhone1 = `https://wa.me/${phone1}?text=${message}`;
  const urlPhone2 = `https://wa.me/${phone2}?text=${message}`;

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

  const getPopupTitle = (): string => {
    switch (language) {
      case 'en': return 'Chat with our Team on WhatsApp';
      case 'fr': return 'Échangez avec notre équipe sur WhatsApp';
      case 'de': return 'Chatten Sie mit unserem Team auf WhatsApp';
      case 'es':
      default: return 'Contacta con nuestro equipo por WhatsApp';
    }
  };

  const getOnlineStatus = (): string => {
    switch (language) {
      case 'en': return 'Online • Instant reply';
      case 'fr': return 'En ligne • Réponse rapide';
      case 'de': return 'Online • Sofortige Antwort';
      case 'es':
      default: return 'En línea • Respuesta rápida';
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Popover Selection with 2 Numbers */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-88 rounded-2xl bg-white shadow-2xl border border-brand-gold/30 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200 font-sans text-brand-dark">
          {/* Header */}
          <div className="bg-brand-blue text-white px-4 py-3 flex items-center justify-between border-b border-brand-gold/20">
            <div className="flex items-center space-x-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#25D366] text-white">
                <MessageSquare className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-semibold tracking-wide text-brand-gold">WhatsApp Support</h4>
                <p className="text-[11px] text-white/80">{getPopupTitle()}</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white p-1 rounded-md hover:bg-white/10 transition"
              aria-label="Fermer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Body with both lines */}
          <div className="p-3.5 space-y-2.5 bg-gray-50/50">
            <p className="text-[11px] text-brand-gray px-1">
              Choisissez votre ligne directe pour démarrer la discussion :
            </p>

            {/* Line 1: +1 */}
            <a
              href={urlPhone1}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl bg-white border border-gray-200 hover:border-[#25D366] hover:bg-[#25D366]/5 transition shadow-sm group"
            >
              <div className="flex items-center space-x-3">
                <span className="text-xl">🇺🇸</span>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-xs font-bold text-brand-blue">Ligne 1 (USA / Int.)</span>
                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                  </div>
                  <span className="text-xs font-semibold text-gray-800 font-mono block mt-0.5">
                    +1 (325) 718-7098
                  </span>
                  <span className="text-[10px] text-green-600 block">{getOnlineStatus()}</span>
                </div>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition">
                <ExternalLink className="h-4 w-4" />
              </div>
            </a>

            {/* Line 2: +52 */}
            <a
              href={urlPhone2}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl bg-white border border-gray-200 hover:border-[#25D366] hover:bg-[#25D366]/5 transition shadow-sm group"
            >
              <div className="flex items-center space-x-3">
                <span className="text-xl">🇲🇽</span>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-xs font-bold text-brand-blue">Ligne 2 (Mexique / Latam)</span>
                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                  </div>
                  <span className="text-xs font-semibold text-gray-800 font-mono block mt-0.5">
                    +52 81 1035 6311
                  </span>
                  <span className="text-[10px] text-green-600 block">{getOnlineStatus()}</span>
                </div>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition">
                <ExternalLink className="h-4 w-4" />
              </div>
            </a>
          </div>

          {/* Footer note */}
          <div className="bg-white px-4 py-2 text-center border-t border-gray-100 text-[10px] text-gray-500">
            Fundación Hancock • Service d'assistance disponible 24/7
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl hover:bg-[#20ba5a] hover:scale-105 active:scale-95 transition-all duration-300 pulse-animation focus:outline-none focus:ring-4 focus:ring-[#25D366]/40 cursor-pointer"
        aria-label={getAriaLabel()}
        title={getAriaLabel()}
      >
        {isOpen ? (
          <X className="h-7 w-7" />
        ) : (
          <>
            {/* Official WhatsApp Vector Icon */}
            <svg
              className="h-7 w-7 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.66.986 3.292 1.503 4.883 1.504 5.308 0 9.622-4.304 9.625-9.591.002-2.561-.994-4.97-2.802-6.779-1.81-1.81-4.223-2.809-6.786-2.809-5.31 0-9.627 4.302-9.629 9.598-.001 1.705.474 3.374 1.372 4.847L1.99 21.082l4.657-1.928zm11.597-5.467c-.29-.145-1.713-.846-1.978-.941-.264-.096-.457-.145-.649.145-.192.29-.745.942-.913 1.135-.168.19-.336.213-.626.069-.29-.147-1.224-.452-2.33-1.442-.862-.77-1.443-1.72-1.612-2.012-.168-.29-.018-.448.128-.592.131-.13.29-.336.435-.505.145-.168.192-.29.29-.481.096-.193.048-.361-.024-.505-.072-.145-.649-1.564-.889-2.143-.234-.562-.472-.486-.649-.495-.166-.008-.359-.01-.552-.01-.193 0-.506.072-.77.361-.264.29-1.01 1.01-1.01 2.463 0 1.453 1.058 2.855 1.204 3.049.145.192 2.083 3.181 5.047 4.46.705.304 1.256.486 1.684.622.709.226 1.354.194 1.864.118.568-.085 1.713-.7 1.953-1.378.24-.678.24-1.258.168-1.378-.072-.12-.264-.19-.553-.336z" />
            </svg>
            {/* Number of lines badge */}
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-gold text-[10px] font-bold text-brand-blue shadow border-2 border-white">
              2
            </span>
          </>
        )}
      </button>
    </div>
  );
};
