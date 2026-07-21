import React from 'react';
import { useTranslation } from '../i18n/i18n';
import { BookOpen, Activity, TreePine, Palette, AlertTriangle } from 'lucide-react';

export const Causes: React.FC = () => {
  const { t } = useTranslation();

  const causesList = [
    {
      id: 'education',
      title: t('causes.items.education.title'),
      desc: t('causes.items.education.desc'),
      img: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800',
      icon: <BookOpen className="h-6 w-6 text-brand-gold" />
    },
    {
      id: 'health',
      title: t('causes.items.health.title'),
      desc: t('causes.items.health.desc'),
      img: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800',
      icon: <Activity className="h-6 w-6 text-red-500" />
    },
    {
      id: 'environment',
      title: t('causes.items.environment.title'),
      desc: t('causes.items.environment.desc'),
      img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800',
      icon: <TreePine className="h-6 w-6 text-green-500" />
    },
    {
      id: 'culture',
      title: t('causes.items.culture.title'),
      desc: t('causes.items.culture.desc'),
      img: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=800',
      icon: <Palette className="h-6 w-6 text-brand-blue" />
    },
    {
      id: 'emergency',
      title: t('causes.items.emergency.title'),
      desc: t('causes.items.emergency.desc'),
      img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800',
      icon: <AlertTriangle className="h-6 w-6 text-amber-500" />
    }
  ];

  return (
    <div className="font-sans text-brand-dark">
      {/* Intro Header */}
      <section className="bg-brand-blue py-16 text-brand-light text-center border-b border-brand-gold/10">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            {t('causes.title')}
          </h1>
          <p className="mt-4 text-sm sm:text-base text-brand-light/80 max-w-xl mx-auto leading-relaxed">
            {t('causes.subtitle')}
          </p>
        </div>
      </section>

      {/* Grid of Causes */}
      <section className="py-20 bg-white px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-16">
          {causesList.map((cause, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div 
                key={cause.id}
                className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-16 ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Image */}
                <div className="w-full lg:w-1/2 aspect-[16/10] rounded-2xl overflow-hidden shadow-md border border-brand-gold/10 group">
                  <img
                    src={cause.img}
                    alt={cause.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-103"
                  />
                </div>

                {/* Text content */}
                <div className="w-full lg:w-1/2 flex flex-col items-start space-y-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-light border border-brand-gold/15">
                    {cause.icon}
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-brand-blue leading-snug">
                    {cause.title}
                  </h2>
                  <p className="text-sm text-brand-gray/90 leading-relaxed font-light text-justify">
                    {cause.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
