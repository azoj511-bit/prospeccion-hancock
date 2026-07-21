import React from 'react';
import { useTranslation } from '../i18n/i18n';
import { Heart, Globe, Award, Users, ArrowRight } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const { t } = useTranslation();

  const stats = [
    {
      id: 'projects',
      value: '120+',
      title: t('home.stats.projects_title'),
      icon: <Award className="h-6 w-6 text-brand-gold" />
    },
    {
      id: 'beneficiaries',
      value: '15 000+',
      title: t('home.stats.beneficiaries_title'),
      icon: <Users className="h-6 w-6 text-brand-gold" />
    },
    {
      id: 'funds',
      value: '5M+ €',
      title: t('home.stats.donated_title'),
      icon: <Heart className="h-6 w-6 text-brand-gold" />
    },
    {
      id: 'countries',
      value: '12',
      title: t('home.stats.countries_title'),
      icon: <Globe className="h-6 w-6 text-brand-gold" />
    }
  ];

  const featuredProjects = [
    {
      id: 2,
      title: 'Clínica Móvil Andina',
      cause: 'health',
      location: 'Cusco, Perú',
      img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 3,
      title: 'Reforestación Biodiversa Iberia',
      cause: 'environment',
      location: 'Zamora, España',
      img: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 1,
      title: 'Escuela Rural del Mañana',
      cause: 'education',
      location: 'Temuco, Chile',
      img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <div className="font-sans text-brand-dark">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-brand-blue py-24 sm:py-32 text-brand-light">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 opacity-15">
          <img
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=2000"
            alt="Philanthropy Background"
            className="h-full w-full object-cover"
          />
        </div>
        
        {/* Background Glow Effect */}
        <div className="absolute top-1/2 left-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-gold/10 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <span className="text-[10px] sm:text-xs font-bold tracking-widest text-brand-gold uppercase bg-brand-gold/10 border border-brand-gold/25 rounded-full px-4 py-1.5 mb-6">
            Fundación Prospección Hancock
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white max-w-3xl leading-[1.1]">
            {t('home.hero.title')}
          </h1>
          <p className="mt-6 max-w-2xl text-base sm:text-lg text-brand-light/85 leading-relaxed">
            {t('home.hero.subtitle')}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => onNavigate('donation')}
              className="rounded-full bg-brand-gold hover:bg-brand-gold-hover text-brand-blue font-bold px-8 py-3.5 shadow-lg transform transition duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95 text-sm uppercase tracking-wider"
            >
              {t('home.hero.cta_donation')}
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="rounded-full border border-brand-light/35 hover:border-brand-gold bg-white/5 hover:bg-white/10 text-white font-semibold px-8 py-3.5 transition duration-300 active:scale-95 text-sm uppercase tracking-wider"
            >
              {t('home.hero.cta_about')}
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative -mt-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 z-20">
        <div className="rounded-2xl border border-brand-gold/20 bg-white p-6 sm:p-8 shadow-xl grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col items-center text-center">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-gold/10 mb-3.5">
                {stat.icon}
              </div>
              <span className="font-mono text-2xl sm:text-3xl font-bold text-brand-blue tracking-tight">
                {stat.value}
              </span>
              <span className="mt-1 text-xs font-semibold text-brand-gray uppercase tracking-wider">
                {stat.title}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Intro Mission teaser */}
      <section className="py-20 bg-brand-light px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-brand-blue sm:text-4xl">
            {t('home.mission_section_title')}
          </h2>
          <p className="mt-6 text-base sm:text-lg text-brand-gray/90 leading-relaxed font-light font-serif italic max-w-3xl mx-auto">
            {t('home.rinehart_quote')}
          </p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-brand-gold">
            — Mrs. Gina Rinehart AO, Executive Chairman
          </p>
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => onNavigate('causes')}
              className="flex items-center space-x-2 text-sm font-bold text-brand-gold hover:text-brand-gold-hover transition"
            >
              <span>{t('nav.causes')}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Leader Spotlight Section */}
      <section className="py-20 bg-white px-4 sm:px-6 lg:px-8 border-t border-brand-gold/10">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Image Col */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="absolute -top-4 -left-4 w-2/3 h-2/3 border-t-2 border-l-2 border-brand-gold/45 rounded-tl-3xl pointer-events-none" />
              <div className="absolute -bottom-4 -right-4 w-2/3 h-2/3 border-b-2 border-r-2 border-brand-gold/45 rounded-br-3xl pointer-events-none" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] w-full max-w-md md:max-w-lg">
                <img
                  src="/img/IMG-20260720-WA0026.jpg"
                  alt="Gina Rinehart"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-103"
                />
              </div>
            </div>
            {/* Text Col */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[10px] font-bold tracking-widest text-brand-gold uppercase">
                {t('home.rinehart_section_subtitle')}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-blue tracking-tight">
                {t('home.rinehart_section_title')}
              </h2>
              <p className="text-sm sm:text-base font-light text-brand-gray leading-relaxed">
                {t('about.history_text')}
              </p>
              <div className="pt-4">
                <button
                  onClick={() => onNavigate('about')}
                  className="rounded-full bg-brand-blue hover:bg-brand-blue/90 border border-brand-gold/30 text-white font-semibold text-xs px-6 py-3 transition active:scale-95 uppercase tracking-wider shadow-md"
                >
                  {t('nav.about')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones / History Timeline Section */}
      <section className="py-20 bg-brand-light/45 px-4 sm:px-6 lg:px-8 border-t border-b border-brand-gold/10">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-blue tracking-tight">
              {t('home.history_section_title')}
            </h2>
            <p className="mt-3 text-sm text-brand-gray max-w-xl mx-auto">
              {t('home.history_section_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-brand-gold/15 shadow-sm hover:shadow-md transition duration-300 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-gold" />
              <span className="font-mono text-4xl font-bold text-brand-gold/35 block mb-4">01</span>
              <h3 className="font-serif text-lg font-bold text-brand-blue mb-2 group-hover:text-brand-gold transition duration-200">
                Roy Hill
              </h3>
              <p className="text-xs sm:text-sm text-brand-gray/90 leading-relaxed font-light">
                Le projet Roy Hill de 10 milliards de dollars US est l'une des plus grandes réussites minières au monde, utilisant des camions et des trains roses pour soutenir la lutte contre le cancer du sein.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-brand-gold/15 shadow-sm hover:shadow-md transition duration-300 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-gold" />
              <span className="font-mono text-4xl font-bold text-brand-gold/35 block mb-4">02</span>
              <h3 className="font-serif text-lg font-bold text-brand-blue mb-2 group-hover:text-brand-gold transition duration-200">
                Hope Downs
              </h3>
              <p className="text-xs sm:text-sm text-brand-gray/90 leading-relaxed font-light">
                Exploration et développement de quatre mines de fer majeures dans le Pilbara, en partenariat avec Rio Tinto, un exemple remarquable de développement industriel à grande échelle.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-brand-gold/15 shadow-sm hover:shadow-md transition duration-300 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-gold" />
              <span className="font-mono text-4xl font-bold text-brand-gold/35 block mb-4">03</span>
              <h3 className="font-serif text-lg font-bold text-brand-blue mb-2 group-hover:text-brand-gold transition duration-200">
                S. Kidman & Co
              </h3>
              <p className="text-xs sm:text-sm text-brand-gray/90 leading-relaxed font-light">
                L'acquisition de la célèbre entreprise pastorale S. Kidman & Co a permis de diversifier le portefeuille de Hancock dans l'agriculture, faisant du groupe le deuxième producteur de bétail en Australie.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 bg-white px-4 sm:px-6 lg:px-8 border-t border-brand-gold/10">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-brand-blue sm:text-4xl">
              {t('home.featured.title')}
            </h2>
            <p className="mt-3 text-sm text-brand-gray">
              {t('home.featured.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((proj) => (
              <div 
                key={proj.id} 
                className="group relative flex flex-col rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition duration-300 cursor-pointer bg-white"
                onClick={() => onNavigate('projects')}
              >
                <div className="aspect-video w-full overflow-hidden bg-gray-100 relative">
                  <img
                    src={proj.img}
                    alt={proj.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-brand-blue/90 border border-brand-gold/20 text-brand-gold px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                    {t(`causes.items.${proj.cause}.title`)}
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-brand-blue mb-1 group-hover:text-brand-gold transition duration-200">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-brand-gray/70">
                      {proj.location}
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-50 flex items-center space-x-1.5 text-xs font-bold text-brand-gold">
                    <span>{t('projects.details')}</span>
                    <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <button
              onClick={() => onNavigate('projects')}
              className="rounded-full border border-brand-blue hover:bg-brand-blue hover:text-white text-brand-blue font-bold px-8 py-3.5 transition duration-300 uppercase text-xs tracking-wider"
            >
              {t('projects.title')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
