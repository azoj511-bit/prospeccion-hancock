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

const translations: Record<Language, any> = { es, en, fr, zh, de, pt, ro, hr, sr, ru };

interface LanguageContextType {
  language: Language;
  changeLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Try to load language from URL path, localStorage, browser preference, or default to 'es'
  const getInitialLanguage = (): Language => {
    // 1. Check URL hash or path
    const hash = window.location.hash;
    const pathLang = hash.split('/')[1] as Language;
    const validLangs: Language[] = ['es', 'en', 'fr', 'zh', 'de', 'pt', 'ro', 'hr', 'sr', 'ru'];
    if (pathLang && validLangs.includes(pathLang)) {
      return pathLang;
    }

    // 2. Check localStorage
    const saved = localStorage.getItem('fph_lang') as Language;
    if (saved && validLangs.includes(saved)) {
      return saved;
    }

    // 3. Check browser language
    const browserLang = navigator.language.split('-')[0] as Language;
    if (validLangs.includes(browserLang)) {
      return browserLang;
    }

    return 'es';
  };

  const [language, setLanguageState] = useState<Language>(getInitialLanguage());

  const changeLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('fph_lang', lang);

    // Sync language with URL hash: e.g. #/en/about
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

  // Translate function resolving nested keys like 'home.hero.title'
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && value[k] !== undefined) {
        value = value[k];
      } else {
        // Fallback to English if translation is missing in the current language
        let fallbackValue: any = translations['en'];
        for (const fk of keys) {
          if (fallbackValue && fallbackValue[fk] !== undefined) {
            fallbackValue = fallbackValue[fk];
          } else {
            fallbackValue = null;
            break;
          }
        }
        return typeof fallbackValue === 'string' ? fallbackValue : key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
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
