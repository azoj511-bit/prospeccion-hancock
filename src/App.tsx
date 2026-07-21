import React, { useState, useEffect } from 'react';
import { LanguageProvider, useTranslation } from './i18n/i18n';
import type { Language } from './i18n/i18n';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { CookieBanner } from './components/CookieBanner';

// Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Causes } from './pages/Causes';
import { Projects } from './pages/Projects';
import { Impact } from './pages/Impact';
import { Blog } from './pages/Blog';
import { Press } from './pages/Press';
import { DonationForm } from './pages/DonationForm';
import { Contact } from './pages/Contact';
import { Legal } from './pages/Legal';
import { Gallery } from './pages/Gallery';

const MainAppContent: React.FC = () => {
  const { language, changeLanguage } = useTranslation();
  const [activePage, setActivePage] = useState<string>('home');

  // URL Hash Routing Sync: e.g. #/es/about
  useEffect(() => {
    const parseUrlHash = () => {
      const hash = window.location.hash;
      if (!hash || hash === '#/') {
        // Redirect to default: Spanish Home
        window.location.hash = `/${language}/home`;
        return;
      }

      const parts = hash.split('/');
      const pathLang = parts[1] as Language;
      const pathPage = parts[2] || 'home';
      const validLangs: Language[] = ['es', 'en', 'fr', 'zh', 'de', 'pt', 'ro', 'hr', 'sr', 'ru'];

      // Validate language in URL
      if (validLangs.includes(pathLang)) {
        if (pathLang !== language) {
          changeLanguage(pathLang);
        }
      }

      // Sync active page state
      setActivePage(pathPage);
    };

    // Initial parse
    parseUrlHash();

    // Listen to hash changes
    window.addEventListener('hashchange', parseUrlHash);
    return () => window.removeEventListener('hashchange', parseUrlHash);
  }, [language, changeLanguage]);

  const handleNavigate = (pageId: string) => {
    window.location.hash = `/${language}/${pageId}`;
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Page renderer
  const renderActivePage = () => {
    switch (activePage) {
      case 'about':
        return <About />;
      case 'causes':
        return <Causes />;
      case 'projects':
        return <Projects />;
      case 'impact':
        return <Impact />;
      case 'blog':
        return <Blog />;
      case 'press':
        return <Press />;
      case 'donation':
        return <DonationForm />;
      case 'contact':
        return <Contact />;
      case 'gallery':
        return <Gallery />;
      case 'privacy':
        return <Legal pageType="privacy" />;
      case 'terms':
        return <Legal pageType="terms" />;
      case 'cookies':
        return <Legal pageType="cookies" />;
      case 'home':
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-brand-light text-brand-dark selection:bg-brand-gold selection:text-brand-blue">
      {/* Dynamic Header */}
      <Header activePage={activePage} onNavigate={handleNavigate} />
      
      {/* Main page content container */}
      <main className="flex-1 pb-10">
        {renderActivePage()}
      </main>

      {/* Floating WhatsApp contact button */}
      <WhatsAppButton activePage={activePage} />

      {/* Cookie Consent banner */}
      <CookieBanner onNavigate={handleNavigate} />

      {/* Corporate footer */}
      <Footer activePage={activePage} onNavigate={handleNavigate} />
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <MainAppContent />
    </LanguageProvider>
  );
}

export default App;
