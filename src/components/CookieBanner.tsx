import React, { useState, useEffect } from 'react';
import { useTranslation } from '../i18n/i18n';
import { ShieldCheck } from 'lucide-react';

interface CookieBannerProps {
  onNavigate: (page: string) => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ onNavigate }) => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a decision
    const consent = localStorage.getItem('fph_cookie_consent');
    if (!consent) {
      // Small delay to make it feel less aggressive
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('fph_cookie_consent', 'accepted_all');
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    localStorage.setItem('fph_cookie_consent', 'rejected_non_essential');
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-6 right-6 lg:left-8 lg:right-auto lg:max-w-md z-40 bg-brand-blue text-brand-light p-5 rounded-xl border border-brand-gold/30 shadow-2xl animate-in slide-in-from-bottom duration-300 font-sans">
      <div className="flex items-start space-x-3.5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-gold/15 text-brand-gold">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <div className="flex flex-col space-y-3">
          <h4 className="font-serif text-sm font-semibold text-brand-gold">
            {t('cookies.title')}
          </h4>
          <p className="text-xs text-brand-light/85 leading-relaxed">
            {t('cookies.text')}{' '}
            <button
              onClick={() => onNavigate('cookies')}
              className="text-brand-gold underline hover:text-brand-gold-hover transition"
            >
              {t('cookies.read_more')}
            </button>
          </p>
          <div className="flex flex-col sm:flex-row gap-2 pt-1">
            <button
              onClick={handleAcceptAll}
              className="flex-1 rounded-md bg-brand-gold hover:bg-brand-gold-hover text-brand-blue text-xs font-semibold py-2 px-3 transition shadow active:scale-95 whitespace-nowrap"
            >
              {t('cookies.accept')}
            </button>
            <button
              onClick={handleRejectAll}
              className="flex-1 rounded-md border border-brand-light/20 hover:border-brand-gold text-brand-light text-xs font-medium py-2 px-3 transition hover:bg-white/5 whitespace-nowrap"
            >
              {t('cookies.reject')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
