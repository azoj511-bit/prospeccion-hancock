import React, { useState } from 'react';
import { useTranslation } from '../i18n/i18n';
import { Calendar, User, ArrowLeft, ArrowRight, Share2, Search } from 'lucide-react';

interface Article {
  id: number;
  title: Record<string, string>;
  category: 'education' | 'health' | 'environment' | 'culture' | 'emergency';
  country: string;
  date: string;
  author: string;
  img: string;
  summary: Record<string, string>;
  content: Record<string, string>;
}

export const Blog: React.FC = () => {
  const { t, language } = useTranslation();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Articles Database
  const articles: Article[] = [
    {
      id: 1,
      title: {
        es: 'Inauguración oficial de la Escuela Rural en Temuco, Chile',
        en: 'Official Inauguration of the Rural School in Temuco, Chile',
        fr: 'Inauguration officielle de l’école rurale à Temuco, Chili',
        zh: '智利特木科农村学校官方落成典礼举行',
        de: 'Offizielle Einweihung der Landschule in Temuco, Chile'
      },
      category: 'education',
      country: 'Chile',
      date: '2024-08-15',
      author: 'Sofía Benítez',
      img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800',
      summary: {
        es: 'La Fundación Prospección Hancock inauguró las nuevas instalaciones escolares equipadas con energía solar fotovoltaica y tecnologías digitales en Temuco.',
        en: 'The Fundación Prospección Hancock inaugurated new school facilities equipped with solar energy and digital technologies in Temuco.',
        fr: 'La Fundación Prospección Hancock a inauguré les nouvelles installations scolaires équipées d’énergie solaire et de technologies numériques à Temuco.',
        zh: '汉考克勘探基金会在特木科举行落成典礼，启用配备光伏太阳能和数字技术的新学校设施。',
        de: 'Die Fundación Prospección Hancock hat in Temuco die neuen Schuleinrichtungen eingeweiht, die mit Solarstrom und digitalen Technologien ausgestattet sind.'
      },
      content: {
        es: 'En una emotiva ceremonia que reunió a líderes locales, padres de familia y autoridades regionales, se inauguró oficialmente la Escuela Rural del Mañana. Financiado íntegramente por la Fundación Prospección Hancock, el proyecto dotó al establecimiento de aulas climatizadas mediante energías limpias, laboratorios de computación con conexión a internet y una biblioteca equipada con más de 1,000 libros escolares.\n\nLa presidenta Gina Rinehart transmitió sus felicitaciones a la comunidad a través de un comunicado: "Creemos firmemente que la educación de excelencia es la llave para el desarrollo y el progreso de las comunidades rurales. Seguiremos apoyando proyectos similares para cerrar la brecha de oportunidades en el mundo".',
        en: 'In an emotional ceremony that gathered local leaders, parents, and regional authorities, the Rural School of the Future was officially inaugurated. Entirely funded by the Fundación Prospección Hancock, the project provided the school with clean-energy climate-controlled classrooms, computer labs with internet, and a library equipped with over 1,000 textbooks.\n\nChairman Gina Rinehart shared her congratulations via a statement: "We firmly believe that excellent education is the key to the development and progress of rural communities. We will continue to support similar projects to close the opportunity gap worldwide."',
        fr: 'Lors d’une cérémonie émouvante réunissant dirigeants locaux, parents et autorités régionales, l’École Rurale du Futur a été officiellement inaugurée. Entièrement financé par la Fundación Prospección Hancock, le projet a équipé l’établissement de classes climatisées grâce à des énergies propres, de laboratoires informatiques connectés à internet et d’une bibliothèque de plus de 1 000 livres scolaires.\n\nLa présidente Gina Rinehart a transmis ses félicitations dans un communiqué : "Nous croyons fermement qu’une éducation d’excellence est la clé du développement et du progrès des communautés rurales. Nous continuerons à soutenir des projets similaires pour réduire la fracture des opportunités."',
        zh: '在一场汇集了当地领袖、家长和地区官员的感人仪式上，特木科“未来农村学校”宣布正式落成。该项目完全由汉考克勘探基金会出资，为学校配备了采用清洁能源空调的教室、联网电脑实验室以及存书超过1000册的图书馆。\n\n基金会主席吉娜·莱因哈特通过声明表达了祝贺：“我们坚信，卓越的教育是农村社区发展和进步的关键。我们将继续支持此类项目，以消除全球机会差距。”',
        de: 'In einer emotionalen Zeremonie, an der lokale Führer, Eltern und regionale Behörden teilnahmen, wurde die Landschule der Zukunft offiziell eingeweiht. Das vollständig von der Fundación Prospección Hancock finanzierte Projekt stattete die Einrichtung mit klimatisierten Klassenzimmern durch saubere Energie, Computerlabors mit Internetverbindung und einer Bibliothek mit über 1.000 Schulbüchern aus.\n\nDie Vorsitzende Gina Rinehart übermittelte ihre Glückwünsche in einer Erklärung: „Wir glauben fest daran, dass eine hervorragende Bildung der Schlüssel zur Entwicklung und zum Fortschritt ländlicher Gemeinden ist. Wir werden weiterhin ähnliche Projekte unterstützen, um die Chancenlücke weltweit zu schließen.“'
      }
    },
    {
      id: 2,
      title: {
        es: 'La Clínica Móvil Andina atiende a más de 1,500 pacientes',
        en: 'Mobile Andean Clinic treats over 1,500 patients',
        fr: 'La clinique mobile andine soigne plus de 1 500 patients',
        zh: '安第斯移动医疗车已为1500多名患者提供诊疗',
        de: 'Mobile Andenklinik versorgt über 1.500 Patienten'
      },
      category: 'health',
      country: 'Perú',
      date: '2025-02-10',
      author: 'Dr. Carlos Méndez',
      img: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800',
      summary: {
        es: 'La unidad médica móvil de Cusco presenta su balance tras seis meses de operaciones en comunidades remotas sobre los 3,800 metros de altitud.',
        en: 'The Cusco mobile medical unit shares its assessment after six months of operations in remote communities above 3,800 meters of altitude.',
        fr: 'L’unité médicale mobile de Cusco présente son bilan après six mois d’activité dans des villages isolés à plus de 3 800 mètres d’altitude.',
        zh: '库斯科移动医疗车在海拔3800米以上的偏远社区开展了六个月的诊疗工作，并公布了成效 balance。',
        de: 'Die mobile medizinische Einheit von Cusco legt ihre Bilanz nach sechs Monaten Einsatz in abgelegenen Gemeinden in über 3.800 Metern Höhe vor.'
      },
      content: {
        es: 'El programa Clínica Móvil Andina ha alcanzado un hito significativo al brindar atención médica integral y gratuita a más de 1,500 personas en comunidades marginadas de Cusco. El informe detalla que el 60% de las consultas correspondieron a niños en control de crecimiento y vacunación pediátrica.\n\n"Nuestra mayor satisfacción es ver cómo disminuyen las infecciones respiratorias severas y los casos de desnutrición gracias al diagnóstico temprano", afirmó el Dr. Méndez, director médico del programa. Para la segunda fase se planea incorporar un módulo móvil odontológico y programas de salud visual.',
        en: 'The Andean Mobile Clinic program has reached a significant milestone by providing comprehensive, free medical care to over 1,500 people in marginalized Cusco communities. The report notes that 60% of consultations involved growth monitoring and pediatric vaccinations for children.\n\n"Our greatest satisfaction is seeing the decline in severe respiratory infections and malnutrition cases thanks to early diagnosis," said Dr. Méndez, medical director of the program. The second phase plans to introduce a mobile dental unit and vision health screenings.',
        fr: 'Le programme de la clinique mobile andine a franchi une étape importante en prodiguant des soins médicaux complets et gratuits à plus de 1 500 personnes dans des zones marginalisées de Cusco. Le rapport souligne que 60% des consultations concernaient le suivi de croissance et la vaccination pédiatrique des enfants.\n\n"Notre plus grande satisfaction est de constater la diminution des infections respiratoires graves et des cas de malnutrition grâce au diagnostic précoce", a déclaré le Dr Méndez, directeur médical. La seconde phase préconise l’ajout d’un module dentaire mobile et d’examens ophtalmologiques.',
        zh: '安第斯移动医疗车项目取得了里程碑式的进展，为库斯科弱势社区的1500多人提供了全面、免费的医疗服务。报告显示，60%的就诊病例属于儿童生长发育控制和儿科疫苗接种。\n\n“我们最大的满足是看到由于早期诊断，严重呼吸道感染和营养不良病例明显减少，”项目医疗总监门德斯医生说道。第二阶段计划增设移动牙科车和视力筛查服务。',
        de: 'Das Programm der mobilen Andenklinik hat einen bedeutenden Meilenstein erreicht, indem es über 1.500 Menschen in benachteiligten Gemeinden von Cusco eine umfassende, kostenlose medizinische Versorgung geboten hat. Der Bericht zeigt, dass 60 % der Konsultationen Kinder betrafen, die zur Wachstumskontrolle und pädiatrischen Impfungen kamen.\n\n„Unsere größte Zufriedenheit ist es, zu sehen, wie schwere Atemwegsinfektionen und Fälle von Unterernährung dank der Frühdiagnose zurückgehen“, sagte Dr. Méndez, medizinischer Leiter des Programms. Für die zweite Phase ist die Integration einer mobilen zahnärztlichen Einheit und von Sehkraftprogrammen geplant.'
      }
    },
    {
      id: 3,
      title: {
        es: 'Reforestación y voluntariado ambiental en Zamora, España',
        en: 'Reforestation and environmental volunteering in Zamora, Spain',
        fr: 'Restauration forestière et bénévolat écologique à Zamora, Espagne',
        zh: '西班牙萨莫拉举行再造林与环保志愿服务',
        de: 'Wiederaufforstung und Umwelt-Freiwilligenarbeit in Zamora, Spanien'
      },
      category: 'environment',
      country: 'España',
      date: '2025-06-05',
      author: 'Han Sen',
      img: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=800',
      summary: {
        es: 'Coincidiendo con el Día Mundial del Medio Ambiente, la fundación coordinó una jornada de plantación de árboles autóctonos en zonas quemadas de Zamora.',
        en: 'Coinciding with World Environment Day, the foundation coordinated a planting day for native tree species in burned areas of Zamora.',
        fr: 'À l’occasion de la Journée mondiale de l’environnement, la fondation a coordonné une journée de plantation d’arbres indigènes dans les zones incendiées de Zamora.',
        zh: '配合世界环境日，基金会在萨莫拉受灾林区组织了本土树种栽植志愿服务活动。',
        de: 'Anlässlich des Weltumwelttags koordinierte die Stiftung eine Pflanzaktion für einheimische Bäume in den abgebrannten Gebieten von Zamora.'
      },
      content: {
        es: 'Más de 150 voluntarios, entre estudiantes de escuelas de la provincia y vecinos, plantaron robles y encinas en una de las zonas forestales más afectadas por los incendios de veranos pasados. Esta acción forma parte del compromiso medioambiental de la Fundación Prospección Hancock.\n\n"Buscamos no solo plantar árboles, sino recuperar integralmente el ecosistema local. Los árboles sembrados cuentan con protectores biodegradables contra la fauna y un sistema de control de humedad satelital para asegurar su arraigo durante los meses secos", explicó el director de la fundación.',
        en: 'More than 150 volunteers, including local school students and neighbors, planted native oaks and holm oaks in one of the forest areas hardest hit by past wildfires. This action is part of the environmental commitment of the Fundación Prospección Hancock.\n\n"We aim not only to plant trees, but to fully recover the local ecosystem. The planted trees have biodegradable protectors against herbivores and a satellite moisture monitoring system to ensure survival during dry months," explained the foundation director.',
        fr: 'Plus de 150 bénévoles, dont des écoliers de la province et des habitants locaux, ont planté des chênes et des chênes verts dans l’une des zones forestières les plus touchées par les incendies des étés passés. Cette action s’inscrit dans l’engagement environnemental de la Fundación Prospección Hancock.\n\n"Nous cherchons non seulement à planter des arbres, mais à restaurer globalement l’écosystème local. Les arbres plantés sont équipés de protections biodégradables contre la faune et d’un suivi d’humidité par satellite pour garantir leur enracinement pendant la saison sèche", a expliqué le directeur.',
        zh: '来自该省学校的150多名志愿者和当地居民在受往年山火灾害最严重的林区栽植了本土橡树和圣栎。此项行动是汉考克勘探基金会环保承诺的一部分。\n\n“我们的目标不仅是种树，而是要全面恢复当地的生态系统。所种树木均配有防止动物啃食的可降解保护套，并配有卫星湿度监测系统，以确保其在干旱季节成活，”基金会总监解释说。',
        de: 'Mehr über 150 Freiwillige, darunter Schüler aus Schulen der Provinz und Nachbarn, pflanzten Eichen und Steineichen in einem der am stärksten von Waldbränden betroffenen Gebiete. Diese Aktion ist Teil des Umweltengagements der Fundación Prospección Hancock.\n\n„Wir wollen nicht nur Bäume pflanzen, sondern das gesamte lokale Ökosystem wiederherstellen. Die gepflanzten Bäume sind mit biologisch abbaubaren Schutzhüllen gegen Wildtiere und einem Satelliten-Feuchtigkeitskontrollsystem ausgestattet, um ihr Anwachsen in den trockenen Monaten zu gewährleisten“, erklärte der Stiftungsleiter.'
      }
    }
  ];

  // Filtering Logic
  const filteredArticles = articles.filter((art) => {
    const titleText = art.title[language] || art.title['en'];
    const matchesSearch = titleText.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          art.country.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === '' || art.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const getCategoryLabel = (catValue: string): string => {
    switch (catValue) {
      case 'education': return t('causes.items.education.title');
      case 'health': return t('causes.items.health.title');
      case 'environment': return t('causes.items.environment.title');
      case 'culture': return t('causes.items.culture.title');
      case 'emergency': return t('causes.items.emergency.title');
      default: return catValue;
    }
  };

  if (selectedArticle) {
    const artTitle = selectedArticle.title[language] || selectedArticle.title['en'];
    const artContent = selectedArticle.content[language] || selectedArticle.content['en'];

    return (
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 font-sans text-brand-dark">
        {/* Back Button */}
        <button
          onClick={() => setSelectedArticle(null)}
          className="mb-8 flex items-center space-x-2 text-sm font-bold text-brand-gold hover:text-brand-gold-hover transition"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{t('blog.back')}</span>
        </button>

        {/* Article Cover */}
        <div className="aspect-[21/10] w-full rounded-2xl overflow-hidden border border-brand-gold/15 shadow mb-8">
          <img
            src={selectedArticle.img}
            alt={artTitle}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-brand-gray/70 mb-4 pb-4 border-b border-gray-100">
          <span className="bg-brand-gold/10 text-brand-gold px-2.5 py-0.5 rounded-full border border-brand-gold/25 uppercase text-[10px]">
            {getCategoryLabel(selectedArticle.category)}
          </span>
          <div className="flex items-center space-x-1">
            <Calendar className="h-3.5 w-3.5" />
            <span>{t('blog.published')} {selectedArticle.date}</span>
          </div>
          <div className="flex items-center space-x-1">
            <User className="h-3.5 w-3.5" />
            <span>{t('blog.author')}: {selectedArticle.author}</span>
          </div>
          <span>{selectedArticle.country}</span>
        </div>

        {/* Title */}
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-blue mb-6 leading-tight">
          {artTitle}
        </h1>

        {/* Content */}
        <div className="text-sm sm:text-base text-brand-dark/95 leading-relaxed font-light text-justify whitespace-pre-wrap space-y-4">
          {artContent}
        </div>

        {/* Share Button (simulation) */}
        <div className="mt-12 pt-6 border-t border-gray-100 flex justify-end">
          <button
            onClick={() => alert('Link copied!')}
            className="flex items-center space-x-1.5 rounded-full border border-brand-gold/30 hover:border-brand-gold px-4 py-2 text-xs font-semibold text-brand-blue transition hover:bg-brand-light"
          >
            <Share2 className="h-4 w-4 text-brand-gold" />
            <span>{t('blog.share')}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans text-brand-dark">
      {/* Intro Header */}
      <section className="bg-brand-blue py-16 text-brand-light text-center border-b border-brand-gold/10">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            {t('blog.title')}
          </h1>
          <p className="mt-4 text-sm sm:text-base text-brand-light/80 max-w-xl mx-auto leading-relaxed">
            {t('blog.subtitle')}
          </p>
        </div>
      </section>

      {/* Articles List with filter */}
      <section className="py-12 bg-brand-light/35 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Search bar & filter */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto bg-white p-4 rounded-xl border border-brand-gold/15 shadow-sm">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-gray/50" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('blog.search_placeholder')}
                className="w-full rounded border border-gray-200 pl-10 pr-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-brand-gold"
              />
            </div>
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full rounded border border-gray-200 px-3 py-1.5 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-brand-gold"
              >
                <option value="">{t('projects.filter_cause')}</option>
                <option value="education">{t('causes.items.education.title')}</option>
                <option value="health">{t('causes.items.health.title')}</option>
                <option value="environment">{t('causes.items.environment.title')}</option>
                <option value="culture">{t('causes.items.culture.title')}</option>
                <option value="emergency">{t('causes.items.emergency.title')}</option>
              </select>
            </div>
          </div>

          {/* Listing */}
          {filteredArticles.length === 0 ? (
            <div className="text-center py-16 bg-white border border-brand-gold/10 rounded-2xl">
              <p className="text-brand-gray/80 text-sm">{t('projects.no_results')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((art) => {
                const artTitle = art.title[language] || art.title['en'];
                const artSummary = art.summary[language] || art.summary['en'];

                return (
                  <article
                    key={art.id}
                    className="flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition duration-300 cursor-pointer"
                    onClick={() => setSelectedArticle(art)}
                  >
                    <div className="aspect-[16/10] w-full overflow-hidden bg-gray-100 relative">
                      <img
                        src={art.img}
                        alt={artTitle}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 bg-brand-blue/90 border border-brand-gold/25 text-brand-gold px-2.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider">
                        {getCategoryLabel(art.category)}
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center space-x-1 text-[10px] text-brand-gray/75 mb-1.5 font-semibold">
                          <Calendar className="h-3 w-3" />
                          <span>{art.date}</span>
                          <span className="mx-1.5">•</span>
                          <span>{art.country}</span>
                        </div>
                        <h3 className="font-serif text-base font-bold text-brand-blue line-clamp-2 hover:text-brand-gold transition duration-200">
                          {artTitle}
                        </h3>
                        <p className="text-xs text-brand-gray font-light leading-relaxed mt-2.5 line-clamp-3">
                          {artSummary}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-gray-50 flex items-center space-x-1 text-xs font-bold text-brand-gold">
                        <span>{t('blog.read_more')}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
