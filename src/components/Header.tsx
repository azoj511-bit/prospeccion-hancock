import React, { useState, useEffect } from 'react';
import { useTranslation } from '../i18n/i18n';
import { Menu, X, Heart, Globe, Phone, Mail } from 'lucide-react';

interface HeaderProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activePage, onNavigate }) => {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Initialisation réactive de Google Translate
  useEffect(() => {
    const triggerTranslateInit = () => {
      if ((window as any).googleTranslateElementInit) {
        (window as any).googleTranslateElementInit();
      } else if ((window as any).google?.translate?.TranslateElement) {
        const el = document.getElementById('google_translate_element');
        if (el && !el.hasChildNodes()) {
          new (window as any).google.translate.TranslateElement(
            {
              pageLanguage: 'es',
              layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
              autoDisplay: false,
            },
            'google_translate_element'
          );
        }
      }
    };

    triggerTranslateInit();
    const timer = setTimeout(triggerTranslateInit, 500);
    const interval = setInterval(triggerTranslateInit, 1000);
    const stopInterval = setTimeout(() => clearInterval(interval), 6000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
      clearTimeout(stopInterval);
    };
  }, []);

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

  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-gold/20 bg-brand-blue/95 text-white backdrop-blur-md transition-all duration-300">
      {/* Top Utility Bar - Contact & Google Translate */}
      <div className="w-full bg-[#06152d] border-b border-brand-gold/20 py-1.5 px-4 sm:px-6 lg:px-8 text-xs text-brand-light/90">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-2.5">
          {/* Sede y contacto rápido */}
          <div className="flex items-center space-x-3 text-[11px] sm:text-xs text-brand-light/85">
            <span className="flex items-center space-x-1.5 text-brand-gold font-medium">
              <span>🇦🇺</span>
              <span>HPPL • West Perth, Australia</span>
            </span>
            <span className="hidden md:inline-block text-white/20">|</span>
            <a href="tel:+61480801641" className="hidden md:flex items-center space-x-1 hover:text-brand-gold transition">
              <Phone className="h-3 w-3 text-brand-gold" />
              <span>+61 480 801 641</span>
            </a>
            <span className="hidden lg:inline-block text-white/20">|</span>
            <a href="mailto:mail@hancockprospecting.com.au" className="hidden lg:flex items-center space-x-1 hover:text-brand-gold transition">
              <Mail className="h-3 w-3 text-brand-gold" />
              <span>mail@hancockprospecting.com.au</span>
            </a>
          </div>

          {/* Emplacement mis en valeur pour Google Traduction */}
          <div className="flex items-center space-x-2 bg-white/10 hover:bg-white/15 px-3 py-1 rounded-full border border-brand-gold/40 shadow-sm transition">
            <Globe className="h-3.5 w-3.5 text-brand-gold shrink-0 animate-pulse" />
            <span className="font-semibold text-brand-gold text-[10px] sm:text-[11px] uppercase tracking-wider whitespace-nowrap">
              Traducir / Translate:
            </span>
            <div id="google_translate_element" className="notranslate inline-block"></div>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
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

        {/* Mobile menu button */}
        <div className="flex items-center space-x-2 lg:hidden">
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
