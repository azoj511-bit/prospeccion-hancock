import React, { useState } from 'react';
import { useTranslation, SUPPORTED_LANGUAGES } from '../i18n/i18n';
import { Globe, Menu, X, Heart } from 'lucide-react';

interface HeaderProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activePage, onNavigate }) => {
  const { language, changeLanguage, t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const navItems = [
    { id: 'home', label: t('nav.home') },
    { id: 'about', label: t('nav.about') },
    { id: 'causes', label: t('nav.causes') },
    { id: 'projects', label: t('nav.projects') },
    { id: 'impact', label: t('nav.impact') },
    { id: 'blog', label: t('nav.blog') },
    { id: 'press', label: t('nav.press') },
    { id: 'gallery', label: t('nav.gallery') },
    { id: 'contact', label: t('nav.contact') },
  ];

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-gold/20 bg-brand-blue/95 text-white backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo and title */}
        <div 
          className="flex cursor-pointer items-center space-x-2.5 transition duration-200 hover:opacity-90"
          onClick={() => handleNavigate('home')}
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-brand-gold bg-white shadow-md overflow-hidden">
            <img src="/img/IMG-20260720-WA0024.jpg" alt="Logo" className="h-full w-full object-cover scale-105" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg font-semibold tracking-wide text-brand-gold">Fundación Prospección</span>
            <span className="text-xs font-light tracking-widest uppercase text-brand-light/80">Hancock</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1 font-sans text-sm font-medium">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.id)}
              className={`rounded-md px-3.5 py-2 transition-all duration-200 hover:text-brand-gold hover:bg-white/5 ${
                activePage === item.id 
                  ? 'text-brand-gold border-b-2 border-brand-gold rounded-b-none bg-white/5 font-semibold' 
                  : 'text-brand-light/90'
              }`}
            >
              {item.label}
            </button>
          ))}
          
          <button
            onClick={() => handleNavigate('donation')}
            className={`ml-2 flex items-center space-x-1.5 rounded-full bg-brand-gold px-4 py-2 font-sans text-xs font-semibold text-brand-blue uppercase tracking-wider transition-all duration-300 hover:bg-brand-gold-hover hover:scale-105 active:scale-95 shadow-md ${
              activePage === 'donation' ? 'ring-2 ring-brand-light bg-brand-gold-hover' : ''
            }`}
          >
            <Heart className="h-3.5 w-3.5 fill-current" />
            <span>{t('nav.donation')}</span>
          </button>
        </nav>

        {/* Right tools (Language selection) */}
        <div className="hidden lg:flex items-center space-x-4 relative">
          <button
            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
            onBlur={() => setTimeout(() => setLangDropdownOpen(false), 200)}
            className="flex items-center space-x-1.5 rounded-md border border-brand-gold/30 px-3 py-1.5 text-xs font-medium text-brand-light hover:bg-white/5 hover:border-brand-gold transition duration-200"
            aria-label="Select language"
            aria-haspopup="true"
            aria-expanded={langDropdownOpen}
          >
            <Globe className="h-3.5 w-3.5 text-brand-gold" />
            <span>{currentLangObj.flag} {currentLangObj.name}</span>
          </button>

          {/* Lang drop-down menu */}
          {langDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-40 rounded-lg border border-brand-gold/25 bg-brand-blue p-1.5 shadow-xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-1 duration-200">
              {SUPPORTED_LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    changeLanguage(lang.code);
                    setLangDropdownOpen(false);
                  }}
                  className={`flex w-full items-center space-x-2 rounded-md px-3 py-2 text-left text-xs transition duration-150 ${
                    language === lang.code 
                      ? 'bg-brand-gold text-brand-blue font-semibold' 
                      : 'text-brand-light/90 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Mobile controls */}
        <div className="flex items-center space-x-2 lg:hidden">
          {/* Quick language toggle icon button */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              onBlur={() => setTimeout(() => setLangDropdownOpen(false), 200)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-brand-gold/30 text-brand-light hover:bg-white/5 transition"
              aria-label="Language selector"
            >
              <span>{currentLangObj.flag}</span>
            </button>
            {langDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-36 rounded-lg border border-brand-gold/25 bg-brand-blue p-1 shadow-lg z-50">
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      changeLanguage(lang.code);
                      setLangDropdownOpen(false);
                    }}
                    className={`flex w-full items-center space-x-2 rounded px-2.5 py-1.5 text-left text-xs ${
                      language === lang.code 
                        ? 'bg-brand-gold text-brand-blue font-semibold' 
                        : 'text-brand-light/95 hover:bg-white/10'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-brand-gold/30 text-brand-light hover:bg-white/5 transition"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle main menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-brand-gold/15 bg-brand-blue/98 py-3 px-4 shadow-inner animate-in slide-in-from-top duration-300">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`flex w-full items-center rounded-md px-4 py-2.5 text-sm font-medium transition ${
                  activePage === item.id 
                    ? 'bg-white/10 text-brand-gold font-bold' 
                    : 'text-brand-light/90 hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            <div className="pt-2 border-t border-brand-gold/10 mt-2">
              <button
                onClick={() => handleNavigate('donation')}
                className={`flex w-full items-center justify-center space-x-2 rounded-full bg-brand-gold px-4 py-2.5 text-sm font-semibold text-brand-blue uppercase tracking-wider transition ${
                  activePage === 'donation' ? 'bg-brand-gold-hover' : ''
                }`}
              >
                <Heart className="h-4 w-4 fill-current" />
                <span>{t('nav.donation')}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
