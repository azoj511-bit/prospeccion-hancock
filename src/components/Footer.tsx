import React, { useState } from 'react';
import { useTranslation } from '../i18n/i18n';
import { Heart, Mail, ExternalLink } from 'lucide-react';

interface FooterProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ activePage, onNavigate }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [subStatus, setSubStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      setSubStatus('success');
      setEmail('');
      setTimeout(() => setSubStatus('idle'), 5000);
    } else {
      setSubStatus('error');
      setTimeout(() => setSubStatus('idle'), 3000);
    }
  };

  const handleLegalPage = (pageId: string) => {
    onNavigate(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
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

  return (
    <footer className="w-full border-t border-brand-gold/20 bg-brand-blue text-brand-light/95 pt-12 pb-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Col 1: Brand Info */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-brand-gold bg-white shadow overflow-hidden">
              <img src="/img/IMG-20260720-WA0024.jpg" alt="Logo" className="h-full w-full object-cover scale-105" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-base font-semibold tracking-wide text-brand-gold">Fundación Prospección</span>
              <span className="text-[10px] font-light tracking-widest uppercase text-brand-light/80">Hancock</span>
            </div>
          </div>
          <p className="text-sm font-light text-brand-light/80 leading-relaxed">
            {t('footer.mission')}
          </p>
        </div>

        {/* Col 2: Quick Links */}
        <div className="flex flex-col space-y-3">
          <h3 className="font-serif text-base font-semibold text-brand-gold border-b border-brand-gold/10 pb-1.5">
            {t('footer.sitemap')}
          </h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {quickLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLegalPage(link.id)}
                className={`text-left text-brand-light/80 hover:text-brand-gold hover:underline transition-colors duration-150 py-0.5 ${
                  activePage === link.id ? 'text-brand-gold font-medium' : ''
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

        {/* Col 3: Legal & Governance Links */}
        <div className="flex flex-col space-y-3">
          <h3 className="font-serif text-base font-semibold text-brand-gold border-b border-brand-gold/10 pb-1.5">
            {t('footer.legal')}
          </h3>
          <ul className="space-y-2 text-sm text-brand-light/80">
            <li>
              <button 
                onClick={() => handleLegalPage('terms')} 
                className={`hover:text-brand-gold hover:underline transition-colors duration-150 flex items-center space-x-1 ${
                  activePage === 'terms' ? 'text-brand-gold font-medium' : ''
                }`}
              >
                <span>{t('footer.terms')}</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleLegalPage('privacy')} 
                className={`hover:text-brand-gold hover:underline transition-colors duration-150 flex items-center space-x-1 ${
                  activePage === 'privacy' ? 'text-brand-gold font-medium' : ''
                }`}
              >
                <span>{t('footer.privacy')}</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleLegalPage('cookies')} 
                className={`hover:text-brand-gold hover:underline transition-colors duration-150 flex items-center space-x-1 ${
                  activePage === 'cookies' ? 'text-brand-gold font-medium' : ''
                }`}
              >
                <span>{t('footer.cookies')}</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleLegalPage('mentions-legales')} 
                className={`hover:text-brand-gold hover:underline transition-colors duration-150 flex items-center space-x-1 ${
                  activePage === 'mentions-legales' ? 'text-brand-gold font-medium' : ''
                }`}
              >
                <span>Mentions légales</span>
              </button>
            </li>
            <li className="pt-1.5 flex items-center space-x-1 text-xs text-brand-light/60 hover:text-brand-gold transition duration-150">
              <a href="https://www.hancockprospecting.com.au" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 hover:underline">
                <span>Hancock Prospecting Group</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </li>
          </ul>
        </div>

        {/* Col 4: Newsletter */}
        <div className="flex flex-col space-y-3">
          <h3 className="font-serif text-base font-semibold text-brand-gold border-b border-brand-gold/10 pb-1.5">
            {t('footer.newsletter.title')}
          </h3>
          <form onSubmit={handleSubscribe} className="flex flex-col space-y-2.5">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-blue" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('footer.newsletter.placeholder')}
                className="w-full rounded-md bg-brand-light pl-10 pr-3 py-2 text-sm text-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-gold border-0 shadow-inner placeholder:text-brand-gray/50"
                aria-label="Email subscription input"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-brand-gold hover:bg-brand-gold-hover text-brand-blue font-semibold text-xs py-2 uppercase tracking-wider transition duration-300 shadow active:scale-95"
            >
              {t('footer.newsletter.subscribe')}
            </button>
          </form>

          {/* Feedback messages */}
          {subStatus === 'success' && (
            <p className="text-xs text-green-400 mt-1 font-medium animate-pulse">
              {t('footer.newsletter.success')}
            </p>
          )}
          {subStatus === 'error' && (
            <p className="text-xs text-red-400 mt-1 font-medium">
              {t('footer.newsletter.error')}
            </p>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-7xl border-t border-brand-gold/10 mt-10 pt-6 text-center text-xs text-brand-light/60">
        <p className="flex items-center justify-center space-x-1 leading-relaxed">
          <span>&copy; {new Date().getFullYear()}</span>
          <span>{t('footer.rights')}</span>
          <span className="flex items-center text-red-500 mx-1">
            <Heart className="h-3 w-3 fill-current" />
          </span>
        </p>
      </div>
    </footer>
  );
};
