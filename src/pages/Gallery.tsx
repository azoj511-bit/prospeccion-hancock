import React, { useState } from 'react';
import { Lightbox } from '../components/Lightbox';
import { Image as ImageIcon, Play, SlidersHorizontal } from 'lucide-react';
import { useTranslation } from '../i18n/i18n';

interface MediaItem {
  id: number;
  url: string;
  type: 'image' | 'video';
  title: string;
  category: string;
  year: number;
}

const titleTranslations: Record<number, Record<string, string>> = {
  1: {
    en: 'Executive Leadership & Vision - Mrs. Gina Rinehart AO',
    es: 'Liderazgo Ejecutivo y Visión - Sra. Gina Rinehart AO',
    fr: 'Direction Exécutive et Vision - Mme Gina Rinehart AO',
    pt: 'Liderança Executiva e Visão - Sra. Gina Rinehart AO',
    ro: 'Conducere Executivă și Viziune - Doamna Gina Rinehart AO',
    hr: 'Izvršno vodstvo i vizija - Gđa Gina Rinehart AO',
    sr: 'Извршно вођство и визија - Гђа Џина Рајнхарт АО',
    ru: 'Исполнительное руководство и видение - Г-жа Джина Райнхарт AO'
  },
  2: {
    en: 'Hancock Prospecting Official Corporate Identity & Headquarters',
    es: 'Identidad Corporativa Oficial y Sede de Hancock Prospecting',
    fr: 'Identité Corporate Officielle et Siège de Hancock Prospecting',
    pt: 'Identidade Corporativa Oficial e Sede da Hancock Prospecting',
    ro: 'Identitatea Corporativă Oficială și Sediul Hancock Prospecting',
    hr: 'Službeni korporativni identitet i sjedište Hancock Prospectinga',
    sr: 'Званични корпоративни идентитет и седиште Ханкок Проспектинга',
    ru: 'Официальный корпоративный стиль и штаб-квартира Hancock Prospecting'
  },
  3: {
    en: 'Inauguration of the Rural School in Temuco, Chile',
    es: 'Inauguración de la Escuela Rural en Temuco, Chile',
    fr: 'Inauguration de l\'École Rurale à Temuco, Chili',
    pt: 'Inauguração da Escola Rural em Temuco, Chile',
    ro: 'Inaugurarea Școlii Rurale din Temuco, Chile',
    hr: 'Inauguracija ruralne škole u Temucu, Čile',
    sr: 'Инаугурација руралне школе у Темуку, Чиле',
    ru: 'Инаугурация сельской школы в Темуко, Чили'
  },
  4: {
    en: 'Pediatric Medical Care & Mobile Health Units in Cusco, Peru',
    es: 'Atención médica pediátrica y unidades móviles en Cusco, Perú',
    fr: 'Soins médicaux pédiatriques et unités mobiles à Cusco, Pérou',
    pt: 'Atendimento médico pediátrico e unidades móveis em Cusco, Peru',
    ro: 'Asistență medicală pediatrică și unități mobile în Cusco, Peru',
    hr: 'Pedijatrijska skrb i mobilne jedinice u Cuscu, Peru',
    sr: 'Педијатријска нега и мобилне јединице у Куску, Перу',
    ru: 'Педиатрическая помощь и мобильные блоки в Куско, Перу'
  },
  5: {
    en: 'Forest Reforestation & Land Rehabilitation in Zamora, Spain',
    es: 'Jornada de reforestación forestal y rehabilitación en Zamora, España',
    fr: 'Reforestation forestière et réhabilitation des terres à Zamora, Espagne',
    pt: 'Reflorestamento florestal e reabilitação de terras em Zamora, Espanha',
    ro: 'Reîmpădurire forestieră și reabilitare în Zamora, Spania',
    hr: 'Pošumljavanje i rehabilitacija zemljišta u Zamori, Španjolska',
    sr: 'Пошумљавање и рехабилитација земљишта у Замори, Шпанија',
    ru: 'Лесовосстановление и реабилитация земель в Саморе, Испания'
  },
  6: {
    en: 'Roy Hill Mega Iron Ore Operations in the Pilbara Region',
    es: 'Operaciones mineras de hierro en Roy Hill, región de Pilbara',
    fr: 'Opérations minières de fer à Roy Hill dans la région de Pilbara',
    pt: 'Operações de minério de ferro em Roy Hill, região de Pilbara',
    ro: 'Operațiuni miniere de fier la Roy Hill, regiunea Pilbara',
    hr: 'Rudarstvo željezne rude Roy Hill u regiji Pilbara',
    sr: 'Рударске операције гвожђа Рој Хил у региону Пилбара',
    ru: 'Добыча железной руды Roy Hill в регионе Пилбара'
  },
  7: {
    en: 'Agricultural & Pastoral Heritage - S. Kidman & Co Cattle Stations',
    es: 'Patrimonio Agrícola y Ganadero - Estaciones de S. Kidman & Co',
    fr: 'Patrimoine Agricole et Élevage - Domaines S. Kidman & Co',
    pt: 'Patrimônio Agrícola e Pecuário - Estações de S. Kidman & Co',
    ro: 'Patrimoniu Agricol și Zootehnic - Stațiile S. Kidman & Co',
    hr: 'Poljoprivredna i stočarska baština - Postaje S. Kidman & Co',
    sr: 'Пољопривредна и сточарска баштина - Станице S. Kidman & Co',
    ru: 'Сельскохозяйственное и животноводческое наследие S. Kidman & Co'
  },
  8: {
    en: 'Educational Excellence Scholarships & Digital Training Program',
    es: 'Becas de excelencia educativa y programa de formación digital',
    fr: 'Bourses d\'excellence éducative et programme de formation numérique',
    pt: 'Bolsas de excelência educativa e programa de formação digital',
    ro: 'Burse de excelență educațională și program de instruire digitală',
    hr: 'Stipendije za obrazovnu izvrsnost i program digitalne obuke',
    sr: 'Стипендије за образовну изврсност и програм дигиталне обуке',
    ru: 'Стипендии за успехи в учебе и программа цифрового обучения'
  },
  9: {
    en: 'Artistic & Cultural Heritage Preservation in Chaco, Argentina',
    es: 'Preservación del patrimonio artístico y cultural en Chaco, Argentina',
    fr: 'Préservation du patrimoine artistique et culturel à Chaco, Argentine',
    pt: 'Preservação do patrimônio artístico e cultural em Chaco, Argentina',
    ro: 'Conservarea patrimoniului artistic și cultural în Chaco, Argentina',
    hr: 'Očuvanje umjetničke i kulturne baštine u Chacu, Argentina',
    sr: 'Очување уметничке и културне баштине у Чаку, Аргентина',
    ru: 'Сохранение художественного и культурного наследия в Чако, Аргентина'
  },
  10: {
    en: 'Emergency Thermal Relief & Humanitarian Aid in Oruro, Bolivia',
    es: 'Auxilio térmico de emergencia y ayuda humanitaria en Oruro, Bolivia',
    fr: 'Aide d\'urgence thermique et secours humanitaire à Oruro, Bolivie',
    pt: 'Socorro térmico de emergência e ajuda humanitária em Oruro, Bolívia',
    ro: 'Ajutor termic de urgență și sprijin umanitar în Oruro, Bolivia',
    hr: 'Hitna pomoć s toplinskim skloništima u Oruro, Bolivija',
    sr: 'Хитна помоћ са термо склоништима у Оруру, Боливија',
    ru: 'Экстренная гуманитарная помощь и укрытия в Оруро, Боливия'
  },
  11: {
    en: 'Clean Water Infrastructure & Well Drilling in Remote Communities',
    es: 'Infraestructura de agua potable y perforación de pozos en comunidades remotas',
    fr: 'Infrastructure d\'eau potable et forages dans les communautés isolées',
    pt: 'Infraestrutura de água potável e perfuração de poços em comunidades remotas',
    ro: 'Infrastructură de apă potabilă și foraje în comunități izolate',
    hr: 'Infrastruktura pitke vode i bušenje bunara u udaljenim zajednicama',
    sr: 'Инфраструктура пијаће воде и бушење бунара у удаљеним заједницама',
    ru: 'Чистая питьевая вода и скважины в отдаленных районах'
  },
  12: {
    en: 'Olympic Swimming & Athletic Sponsorship - Supporting World Champions',
    es: 'Patrocinio a la natación olímpica y atletas - Apoyo a campeones mundiales',
    fr: 'Parrainage de la natation olympique et des athlètes - Soutien aux champions',
    pt: 'Patrocínio à natação olímpica e atletas - Apoio a campeões mundiais',
    ro: 'Sponsorizarea înotului olimpic și a sportivilor - Susținerea campionilor',
    hr: 'Sponzorstvo olimpijskog plivanja i sportaša - Podrška prvacima',
    sr: 'Спонзорство олимпијског пливања и спортиста - Подршка шампионима',
    ru: 'Спонсорство олимпийского плавания и спортсменов - Поддержка чемпионов'
  },
  13: {
    en: 'Hope Downs Mine Development & Western Australia Resource Operations',
    es: 'Desarrollo minero Hope Downs y operaciones en Australia Occidental',
    fr: 'Développement de la mine Hope Downs et opérations en Australie-Occidentale',
    pt: 'Desenvolvimento da mina Hope Downs e operações na Austrália Ocidental',
    ro: 'Dezvoltarea minei Hope Downs și operațiuni în Australia de Vest',
    hr: 'Razvoj rudnika Hope Downs i operacije u Zapadnoj Australiji',
    sr: 'Развој рудника Хоуп Даунс и операције у Западној Аустралији',
    ru: 'Разработок рудника Hope Downs в Западной Австралии'
  },
  14: {
    en: 'Hancock Prospecting Institutional Film (Video)',
    es: 'Película Institucional de Hancock Prospecting (Video)',
    fr: 'Film Institutionnel de Hancock Prospecting (Vidéo)',
    pt: 'Filme Institucional da Hancock Prospecting (Vídeo)',
    ro: 'Film Instituțional Hancock Prospecting (Video)',
    hr: 'Institucionalni film Hancock Prospectinga (Video)',
    sr: 'Институционални филм Ханкок Проспектинга (Видео)',
    ru: 'Институциональный фильм Hancock Prospecting (Видео)'
  }
};

export const Gallery: React.FC = () => {
  const { t, language } = useTranslation();

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  // Media Items Database
  const mediaItems: MediaItem[] = [
    {
      id: 1,
      url: '/img/IMG-20260720-WA0026.jpg',
      type: 'image',
      title: 'Executive Leadership & Vision - Mrs. Gina Rinehart AO',
      category: 'Institucional',
      year: 2025,
    },
    {
      id: 2,
      url: '/img/IMG-20260720-WA0024.jpg',
      type: 'image',
      title: 'Hancock Prospecting Official Corporate Identity & Headquarters',
      category: 'Institucional',
      year: 2025,
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1200',
      type: 'image',
      title: 'Inauguración de la Escuela Rural en Temuco, Chile',
      category: 'Educación',
      year: 2024,
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200',
      type: 'image',
      title: 'Atención médica pediátrica en Cusco, Perú',
      category: 'Salud',
      year: 2025,
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=1200',
      type: 'image',
      title: 'Jornada de reforestación forestal en Zamora, España',
      category: 'Medio Ambiente',
      year: 2025,
    },
    {
      id: 6,
      url: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&q=80&w=1200',
      type: 'image',
      title: 'Roy Hill Mega Iron Ore Operations in the Pilbara Region',
      category: 'Institucional',
      year: 2024,
    },
    {
      id: 7,
      url: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=1200',
      type: 'image',
      title: 'Agricultural & Pastoral Heritage - S. Kidman & Co Cattle Stations',
      category: 'Institucional',
      year: 2024,
    },
    {
      id: 8,
      url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200',
      type: 'image',
      title: 'Educational Excellence Scholarships & Digital Training Program',
      category: 'Educación',
      year: 2024,
    },
    {
      id: 9,
      url: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=1200',
      type: 'image',
      title: 'Artistic & Cultural Heritage Preservation in Chaco, Argentina',
      category: 'Cultura',
      year: 2023,
    },
    {
      id: 10,
      url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1200',
      type: 'image',
      title: 'Emergency Thermal Relief & Humanitarian Aid in Oruro, Bolivia',
      category: 'Urgencia',
      year: 2024,
    },
    {
      id: 11,
      url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&q=80&w=1200',
      type: 'image',
      title: 'Clean Water Infrastructure & Well Drilling in Remote Communities',
      category: 'Medio Ambiente',
      year: 2023,
    },
    {
      id: 12,
      url: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&q=80&w=1200',
      type: 'image',
      title: 'Olympic Swimming & Athletic Sponsorship - Supporting World Champions',
      category: 'Cultura',
      year: 2025,
    },
    {
      id: 13,
      url: 'https://images.unsplash.com/photo-1618042164219-62c820f10723?auto=format&fit=crop&q=80&w=1200',
      type: 'image',
      title: 'Hope Downs Mine Development & Western Australia Resource Operations',
      category: 'Institucional',
      year: 2023,
    },
    {
      id: 14,
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      type: 'video',
      title: 'Hancock Prospecting Institutional Film (Video)',
      category: 'Institucional',
      year: 2025,
    }
  ];

  const categoryMap: Record<string, string> = {
    'Educación': t('causes.items.education.title'),
    'Salud': t('causes.items.health.title'),
    'Medio Ambiente': t('causes.items.environment.title'),
    'Cultura': t('causes.items.culture.title'),
    'Urgencia': t('causes.items.emergency.title'),
    'Institucional': t('nav.about')
  };

  const getTranslatedTitle = (item: MediaItem) => {
    return titleTranslations[item.id]?.[language] || titleTranslations[item.id]?.['en'] || item.title;
  };

  const getTranslatedCategory = (item: MediaItem) => {
    return categoryMap[item.category] || item.category;
  };

  // Lightbox States
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  // Filtering Logic
  const filteredItems = mediaItems
    .filter((item) => {
      const matchesCategory = selectedCategory === '' || item.category === selectedCategory;
      const matchesYear = selectedYear === '' || item.year.toString() === selectedYear;
      return matchesCategory && matchesYear;
    })
    .map((item) => ({
      ...item,
      title: getTranslatedTitle(item),
      category: getTranslatedCategory(item)
    }));

  const categories = Array.from(new Set(mediaItems.map((item) => item.category)));
  const years = Array.from(new Set(mediaItems.map((item) => item.year.toString()))).sort((a, b) => b.localeCompare(a));

  const handleOpenLightbox = (index: number) => {
    const originalItem = mediaItems[index];
    const filteredIndex = filteredItems.findIndex((fi) => fi.id === originalItem.id);
    if (filteredIndex !== -1) {
      setCurrentMediaIndex(filteredIndex);
      setLightboxOpen(true);
    }
  };

  const handlePrevMedia = () => {
    setCurrentMediaIndex((prev) => (prev === 0 ? filteredItems.length - 1 : prev - 1));
  };

  const handleNextMedia = () => {
    setCurrentMediaIndex((prev) => (prev === filteredItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="font-sans text-brand-dark">
      {/* Intro Header */}
      <section className="bg-brand-blue py-16 text-brand-light text-center border-b border-brand-gold/10">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white animate-fade-in">
            {t('gallery.title')}
          </h1>
          <p className="mt-4 text-sm sm:text-base text-brand-light/80 max-w-xl mx-auto leading-relaxed">
            {t('gallery.subtitle')}
          </p>
        </div>
      </section>

      {/* Gallery content */}
      <section className="py-12 bg-brand-light/35 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10 max-w-2xl mx-auto bg-white p-4 rounded-xl border border-brand-gold/15 shadow-sm text-sm">
            <div className="flex items-center space-x-2 text-brand-blue font-serif font-bold text-xs shrink-0 self-center uppercase tracking-wider">
              <SlidersHorizontal className="h-4.5 w-4.5 text-brand-gold" />
              <span>{t('gallery.filter_label')}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-3 w-full">
              {/* Category */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded border border-gray-200 px-3 py-1.5 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-brand-gold"
                aria-label="Filter by category"
              >
                <option value="">{t('gallery.all_causes')}</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{categoryMap[cat] || cat}</option>
                ))}
              </select>

              {/* Year */}
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="rounded border border-gray-200 px-3 py-1.5 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-brand-gold"
                aria-label="Filter by year"
              >
                <option value="">{t('gallery.all_years')}</option>
                {years.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Grid list */}
          {filteredItems.length === 0 ? (
            <div className="text-center py-16 bg-white border border-brand-gold/10 rounded-2xl">
              <p className="text-brand-gray/80 text-sm">{t('gallery.no_results')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mediaItems
                .map((item, idx) => ({ item, originalIdx: idx }))
                .filter(({ item }) => {
                  const matchesCategory = selectedCategory === '' || item.category === selectedCategory;
                  const matchesYear = selectedYear === '' || item.year.toString() === selectedYear;
                  return matchesCategory && matchesYear;
                })
                .map(({ item, originalIdx }) => (
                  <div
                    key={item.id}
                    className="relative group aspect-video rounded-xl overflow-hidden shadow-sm hover:shadow-lg border border-gray-100 bg-white transition duration-300 cursor-pointer"
                    onClick={() => handleOpenLightbox(originalIdx)}
                  >
                    <img
                      src={item.type === 'video' ? 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800' : item.url}
                      alt={getTranslatedTitle(item)}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-103"
                      loading="lazy"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-brand-blue/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-brand-gold border border-brand-gold/40 px-2.5 py-0.5 rounded bg-brand-blue/70">
                          {getTranslatedCategory(item)}
                        </span>
                        <span className="text-[10px] font-mono font-medium text-white/80">{item.year}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-serif font-semibold leading-tight line-clamp-2 pr-4">{getTranslatedTitle(item)}</h4>
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-gold text-brand-blue shadow">
                          {item.type === 'video' ? <Play className="h-4.5 w-4.5 fill-current ml-0.5" /> : <ImageIcon className="h-4.5 w-4.5" />}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Rendering */}
      <Lightbox
        items={filteredItems}
        currentIndex={currentMediaIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onPrev={handlePrevMedia}
        onNext={handleNextMedia}
      />
    </div>
  );
};
