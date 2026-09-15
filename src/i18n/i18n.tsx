import React, { createContext, useContext, useState, useEffect } from 'react';
import es from './es.json';
import en from './en.json';
import fr from './fr.json';
import zh from './zh.json';
import de from './de.json';
import pt from './pt.json';
import ro from './ro.json';
import hr from './hr.json';
import sr from './sr.json';
import ru from './ru.json';

export type Language = 'es' | 'en' | 'fr' | 'zh' | 'de' | 'pt' | 'ro' | 'hr' | 'sr' | 'ru';

export const SUPPORTED_LANGUAGES: { code: Language; name: string; flag: string }[] = [
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ro', name: 'Română', flag: '🇷🇴' },
  { code: 'hr', name: 'Hrvatski', flag: '🇭🇷' },
  { code: 'sr', name: 'Српски', flag: '🇷🇸' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
];

export const COUNTRY_TO_LANGUAGE: Record<string, Language> = {
  // Spanish speaking (Official base)
  ES: 'es', MX: 'es', AR: 'es', CO: 'es', CL: 'es', PE: 'es', VE: 'es',
  UY: 'es', PY: 'es', EC: 'es', BO: 'es', GT: 'es', CR: 'es', PA: 'es',
  CU: 'es', DO: 'es', PR: 'es', HN: 'es', SV: 'es', NI: 'es',
  // French speaking
  FR: 'fr', BE: 'fr', CH: 'fr', CA: 'fr', SN: 'fr', CI: 'fr', BJ: 'fr',
  ML: 'fr', TG: 'fr', CM: 'fr', CD: 'fr', CG: 'fr', GA: 'fr', NE: 'fr',
  BF: 'fr', GN: 'fr', MG: 'fr', LU: 'fr', MC: 'fr',
  // English speaking
  US: 'en', GB: 'en', AU: 'en', NZ: 'en', IE: 'en', ZA: 'en', NG: 'en',
  GH: 'en', IN: 'en', PH: 'en',
  // Portuguese speaking
  BR: 'pt', PT: 'pt', AO: 'pt', MZ: 'pt',
  // German speaking
  DE: 'de', AT: 'de',
  // Romanian speaking
  RO: 'ro', MD: 'ro',
  // Croatian
  HR: 'hr', BA: 'hr',
  // Serbian
  RS: 'sr', ME: 'sr',
  // Russian
  RU: 'ru', BY: 'ru', KZ: 'ru', KG: 'ru',
  // Chinese
  CN: 'zh', TW: 'zh', HK: 'zh', SG: 'zh',
};

export const detectLanguageFromCountry = (countryCode: string): Language | null => {
  if (!countryCode) return null;
  const upper = countryCode.toUpperCase();
  return COUNTRY_TO_LANGUAGE[upper] || null;
};

const translations: Record<Language, any> = { es, en, fr, zh, de, pt, ro, hr, sr, ru };

interface LanguageContextType {
  language: Language;
  changeLanguage: (lang: Language) => void;
  changeLanguageAuto: (lang: Language) => void;
  t: (key: string) => string;
  officialLanguage: Language;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const officialLanguage: Language = 'es';

  // Determine initial language: URL path -> localStorage -> browser language -> official 'es'
  const getInitialLanguage = (): Language => {
    const validLangs: Language[] = ['es', 'en', 'fr', 'zh', 'de', 'pt', 'ro', 'hr', 'sr', 'ru'];

    // 1. Check URL hash or path
    const hash = window.location.hash;
    const pathLang = hash.split('/')[1] as Language;
    if (pathLang && validLangs.includes(pathLang)) {
      return pathLang;
    }

    // 2. Check localStorage
    const saved = localStorage.getItem('fph_lang') as Language;
    if (saved && validLangs.includes(saved)) {
      return saved;
    }

    // 3. Check browser language (e.g., 'fr-FR' -> 'fr', 'es-MX' -> 'es')
    const browserCode = (navigator.language || (navigator as any).userLanguage || '').toLowerCase();
    const primaryCode = browserCode.split('-')[0] as Language;
    if (validLangs.includes(primaryCode)) {
      return primaryCode;
    }

    // 4. Default to Official Language (Español)
    return 'es';
  };

  const [language, setLanguageState] = useState<Language>(getInitialLanguage());

  // Automatic background country detection on first visit if no explicit language was saved
  useEffect(() => {
    const userManuallySwitched = localStorage.getItem('fph_lang_manual');
    // Only auto-detect if user never manually switched language
    if (!userManuallySwitched) {
      // Non-blocking geo-lookup to detect user's country
      fetch('https://api.country.is/')
        .then((res) => res.json())
        .then((data) => {
          if (data && data.country) {
            const detected = detectLanguageFromCountry(data.country);
            if (detected && detected !== language) {
              setLanguageState(detected);
              localStorage.setItem('fph_lang', detected);
              const hash = window.location.hash;
              const parts = hash.split('/');
              const activePage = parts[2] || 'home';
              window.location.hash = `/${detected}/${activePage}`;
            }
          }
        })
        .catch(() => {
          // Fail silently — use browser language or 'es' default
        });
    }
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('fph_lang', lang);
    localStorage.setItem('fph_lang_manual', '1'); // Mark as manually chosen

    // Sync language with URL hash: e.g. #/es/donation
    const hash = window.location.hash;
    const parts = hash.split('/');
    const activePage = parts[2] || 'home';
    window.location.hash = `/${lang}/${activePage}`;
  };

  // Auto language switch (e.g. triggered by country selection — not marked as manual)
  const changeLanguageAuto = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('fph_lang', lang);
    const hash = window.location.hash;
    const parts = hash.split('/');
    const activePage = parts[2] || 'home';
    window.location.hash = `/${lang}/${activePage}`;
  };

  // Sync hash changes back to language state
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const parts = hash.split('/');
      const pathLang = parts[1] as Language;
      const validLangs: Language[] = ['es', 'en', 'fr', 'zh', 'de', 'pt', 'ro', 'hr', 'sr', 'ru'];
      if (pathLang && validLangs.includes(pathLang) && pathLang !== language) {
        setLanguageState(pathLang);
        localStorage.setItem('fph_lang', pathLang);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [language]);

  // Translate function resolving nested keys with official Spanish and English fallbacks
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && value[k] !== undefined) {
        value = value[k];
      } else {
        // Fallback to official language 'es', then 'en'
        let fallbackValue: any = translations['es'];
        for (const fk of keys) {
          if (fallbackValue && fallbackValue[fk] !== undefined) {
            fallbackValue = fallbackValue[fk];
          } else {
            fallbackValue = null;
            break;
          }
        }
        if (typeof fallbackValue === 'string') return fallbackValue;

        // Second fallback to 'en'
        let enValue: any = translations['en'];
        for (const ek of keys) {
          if (enValue && enValue[ek] !== undefined) {
            enValue = enValue[ek];
          } else {
            enValue = null;
            break;
          }
        }
        return typeof enValue === 'string' ? enValue : key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, changeLanguageAuto, t, officialLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
