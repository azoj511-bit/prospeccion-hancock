import React, { useState } from 'react';
import { useTranslation } from '../i18n/i18n';
import { Search, SlidersHorizontal, Eye, X, DollarSign, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  cause: 'education' | 'health' | 'environment' | 'culture' | 'emergency';
  country: string;
  city: string;
  amount: string;
  year: number;
  status: 'active' | 'completed';
  img: string;
  description: Record<string, string>;
  details: Record<string, string>;
}

export const Projects: React.FC = () => {
  const { t, language } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCause, setSelectedCause] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Projects list
  const projectsData: Project[] = [
    {
      id: 1,
      title: 'Escuela Rural del Mañana',
      cause: 'education',
      country: 'Chile',
      city: 'Temuco',
      amount: '45 000 EUR',
      year: 2024,
      status: 'completed',
      img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800',
      description: {
        es: 'Construcción y equipamiento de una escuela rural con paneles solares y conexión a internet satelital.',
        en: 'Construction and equipping of a rural school with solar panels and satellite internet connection.',
        fr: 'Construction et équipement d’une école rurale avec panneaux solaires et connexion internet par satellite.',
        zh: '在智利特木科建设并装备一所配备太阳能电池板和卫星互联网的农村学校。',
        de: 'Bau und Ausstattung einer Landschule mit Sonnenkollektoren und Satelliten-Internetverbindung.'
      },
      details: {
        es: 'Este proyecto de desarrollo integral dotó a la comunidad rural de Temuco de un centro educativo sostenible. Se instalaron 12 paneles solares fotovoltaicos, baterías de almacenamiento de litio, 20 computadoras de bajo consumo y filtros de purificación de agua. Benefició a 150 estudiantes directos y sirve como centro de capacitación tecnológica comunitaria durante los fines de semana.',
        en: 'This comprehensive development project provided the rural community of Temuco with a sustainable educational center. 12 photovoltaic solar panels, lithium storage batteries, 20 low-energy computers, and water purification filters were installed. It directly benefited 150 students and serves as a community technology training center on weekends.',
        fr: 'Ce projet de développement global a doté la communauté rurale de Temuco d’un centre éducatif durable. 12 panneaux solaires photovoltaïques, des batteries de stockage au lithium, 20 ordinateurs basse consommation et des filtres de purification de l’eau ont été installés. Il a bénéficié directement à 150 élèves et sert de centre communautaire de formation technologique le week-end.',
        zh: '该综合开发项目为特木科农村社区提供了一个可持续的教育中心。安装了12块光伏太阳能电池板、锂电池储能系统、20台低能耗电脑和水净化过滤器。直接惠及150名学生，并在周末作为社区技术培训中心使用。',
        de: 'Dieses umfassende Entwicklungsprojekt versorgte die Landgemeinde Temuco mit einem nachhaltigen Bildungszentrum. Installiert wurden 12 Photovoltaik-Solarmodule, Lithium-Speicherbatterien, 20 verbrauchsarme Computer und Wasserreinigungsfilter. Davon profitierten 150 Schüler direkt, und am Wochenende dient es als Technologie-Schulungszentrum für die Gemeinde.'
      }
    },
    {
      id: 2,
      title: 'Clínica Móvil Andina',
      cause: 'health',
      country: 'Perú',
      city: 'Cusco',
      amount: '60 000 USD',
      year: 2025,
      status: 'active',
      img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
      description: {
        es: 'Unidad médica móvil equipada para brindar atención primaria de salud y vacunas a comunidades andinas remotas.',
        en: 'Mobile medical unit equipped to provide primary health care and vaccinations to remote Andean communities.',
        fr: 'Unité médicale mobile équipée pour fournir des soins de santé primaires et des vaccins aux communautés andines isolées.',
        zh: '配备移动医疗车，为安第斯偏远社区提供基础医疗护理和疫苗接种服务。',
        de: 'Mobile medizinische Einheit zur Bereitstellung medizinischer Grundversorgung und Impfungen in abgelegenen Andengemeinden.'
      },
      details: {
        es: 'La unidad médica móvil recorre mensualmente 8 comunidades de la cordillera del Cusco, situadas a más de 3,800 metros de altitud. Cuenta con un médico general, una enfermera obstetra y equipamiento para ecografías, análisis rápidos de sangre y cadena de frío para vacunas. Proporciona chequeos gratuitos y tratamientos básicos para enfermedades respiratorias, parasitosis y control de desnutrición infantil.',
        en: 'The mobile medical unit travels monthly to 8 communities in the Cusco mountain range, located above 3,800 meters of altitude. It is staffed by a general practitioner, an obstetric nurse, and equipped for ultrasounds, rapid blood tests, and cold chain vaccine storage. It provides free checkups and basic treatments for respiratory illnesses, parasites, and child malnutrition monitoring.',
        fr: 'L’unité médicale mobile visite mensuellement 8 communautés de la cordillère de Cusco, situées à plus de 3 800 mètres d’altitude. Elle comprend un médecin généraliste, une infirmière obstétricienne et du matériel pour échographies, analyses de sang rapides et chaîne du froid pour vaccins. Elle propose des examens gratuits et des traitements de base pour les maladies respiratoires, parasitoses et le suivi de la malnutrition infantile.',
        zh: '移动医疗车每月前往库斯科山区的8个社区（海拔均在3800米以上）。配备一名全科医生、一名产科护士，并备有超声波仪、快速验血设备及疫苗冷链储藏箱。为儿童呼吸系统疾病、寄生虫感染和营养不良控制提供免费体检和基本药物治疗。',
        de: 'Die mobile medizinische Einheit fährt monatlich 8 Gemeinden in den Bergen von Cusco an, die über 3.800 Meter hoch liegen. Sie ist mit einem Allgemeinmediziner und einer Geburtshelferin besetzt und für Ultraschall, Schnellbluttests und Kühlkettenspenden ausgerüstet. Sie bietet kostenlose Kontrollen und Grundbehandlungen bei Atemwegserkrankungen, Parasiten und Kontrollen gegen kindliche Unterernährung.'
      }
    },
    {
      id: 3,
      title: 'Reforestación Biodiversa Iberia',
      cause: 'environment',
      country: 'España',
      city: 'Zamora',
      amount: '30 000 EUR',
      year: 2025,
      status: 'active',
      img: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=800',
      description: {
        es: 'Restauración ecológica de bosques quemados plantando más de 15,000 especies autóctonas.',
        en: 'Ecological restoration of burned forests by planting over 15,000 native tree species.',
        fr: 'Restauration écologique de forêts brûlées en plantant plus de 15 000 espèces d’arbres indigènes.',
        zh: '通过种植超过15000棵本土树种，对受灾森林进行生态恢复。',
        de: 'Ökologische Wiederherstellung verbrannter Wälder durch Pflanzung von über 15.000 einheimischen Baumarten.'
      },
      details: {
        es: 'Tras los devastadores incendios forestales en la provincia de Zamora, la fundación impulsó un programa de reforestación científica. En colaboración con biólogos locales, se plantan robles, encinas y arbustos autóctonos para restablecer la biodiversidad y prevenir la erosión del suelo. Se incluye un sistema de riego inteligente durante los primeros veranos y un voluntariado ambiental escolar.',
        en: 'Following devastating wildfires in the Zamora province, the foundation promoted a scientific reforestation program. In collaboration with local biologists, native oak, holm oak, and shrubs are planted to restore biodiversity and prevent soil erosion. It includes a smart irrigation system during the first summers and local school environmental volunteering.',
        fr: 'Après les incendies de forêt dévastateurs dans la province de Zamora, la fondation a lancé un programme de reboisement scientifique. En collaboration avec des biologistes locaux, des chênes, des chênes verts et des arbustes indigènes sont plantés pour restaurer la biodiversité et prévenir l’érosion du sol. Un système d’arrosage intelligent lors des premiers étés et du bénévolat scolaire sont inclus.',
        zh: '萨莫拉省发生灾难性森林火灾后，基金会启动了科学再造林计划。与当地生物学家合作，种植本土橡树、圣栎和灌木，以恢复生物多样性并防止水土流失。包括在最初的几个夏季使用智能灌溉系统，以及组织学校环保志愿服务。',
        de: 'Nach verheerenden Waldbränden in der Provinz Zamora startete die Stiftung ein wissenschaftliches Wiederaufforstungsprogramm. In Zusammenarbeit mit lokalen Biologen werden einheimische Eichen, Steineichen und Sträucher gepflanzt, um die biologische Vielfalt wiederherzustellen und Bodenerosion zu verhindern. Es beinhaltet ein intelligentes Bewässerungssystem in den ersten Sommern und Umwelt-Freiwilligenarbeit an Schulen.'
      }
    },
    {
      id: 4,
      title: 'Centro Cultural y Deportivo Chaco',
      cause: 'culture',
      country: 'Argentina',
      city: 'Resistencia',
      amount: '25 000 USD',
      year: 2023,
      status: 'completed',
      img: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=800',
      description: {
        es: 'Fomento de la inclusión social de jóvenes a través de talleres artísticos y actividades deportivas gratuitas.',
        en: 'Fostering social inclusion for youths through free art workshops and sports activities.',
        fr: 'Promotion de l’inclusion sociale des jeunes via des ateliers artistiques et des activités sportives gratuites.',
        zh: '通过免费艺术研讨会和体育活动，促进当地青少年的社会融入。',
        de: 'Förderung der sozialen Inklusion von Jugendlichen durch kostenlose Kunstworkshops und Sportaktivitäten.'
      },
      details: {
        es: 'Rehabilitación integral de un antiguo almacén abandonado en un centro comunitario multideportivo y cultural. Se habilitaron canchas de baloncesto, fútbol sala, un estudio de danza, talleres de pintura y una biblioteca pública de préstamo. El centro beneficia a más de 300 jóvenes diariamente, ofreciendo alternativas saludables de ocio y formación artística gratuita.',
        en: 'Comprehensive rehabilitation of an abandoned warehouse into a multi-sport and cultural community center. Basketball and futsal courts, a dance studio, painting workshops, and a public lending library were set up. The center benefits over 300 youngsters daily, offering healthy leisure alternatives and free artistic training.',
        fr: 'Réhabilitation complète d’un ancien entrepôt abandonné en un centre communautaire multisports et culturel. Des terrains de basket et de futsal, un studio de danse, des ateliers de peinture et une bibliothèque publique de prêt ont été créés. Le centre accueille plus de 300 jeunes quotidiennement, offrant des loisirs sains et des formations artistiques gratuites.',
        zh: '将旧仓库全面改建为多功能体育和文化社区中心。配备了篮球场、五人制足球场、舞蹈教室、绘画工作坊和公共图书馆。该中心每天惠及300多名青少年，提供健康的闲暇活动和免费艺术培训。',
        de: 'Umfassende Sanierung einer alten, verlassenen Lagerhalle zu einem Multisport- und Kulturzentrum. Basketball- und Futsalfelder, ein Tanzstudio, Malworkshops und eine Leihbibliothek wurden eingerichtet. Das Zentrum wird täglich von über 300 Jugendlichen genutzt und bietet gesunde Freizeitaktivitäten sowie kostenlose Kunstausbildung.'
      }
    },
    {
      id: 5,
      title: 'Agua Limpia Guajira',
      cause: 'environment',
      country: 'Colombia',
      city: 'Uribia',
      amount: '50 000 EUR',
      year: 2025,
      status: 'active',
      img: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800',
      description: {
        es: 'Instalación de desalinizadoras de agua solares para proporcionar agua potable a comunidades Wayúu.',
        en: 'Installation of solar water desalination systems to provide clean drinking water to Wayuu communities.',
        fr: 'Installation de systèmes solaires de dessalement de l’eau pour approvisionner en eau potable les communautés Wayúu.',
        zh: '安装太阳能水脱盐系统，向瓦尤族社区提供清洁饮用水。',
        de: 'Installation von solaren Meerwasserentsalzungsanlagen zur Versorgung von Wayuu-Gemeinden mit Trinkwasser.'
      },
      details: {
        es: 'Instalación de 3 micro-plantas desalinizadoras que funcionan de manera 100% autónoma mediante energía solar fotovoltaica. Beneficia directamente a 1,200 habitantes de la etnia Wayúu en la árida región de La Guajira, eliminando enfermedades diarreicas y facilitando el riego para pequeñas huertas comunitarias.',
        en: 'Installation of 3 water desalination micro-plants that run 100% autonomously using solar energy. Directly benefits 1,200 Wayuu people in the arid La Guajira region, preventing diarrheal illnesses and supplying water for small community gardens.',
        fr: 'Installation de 3 micro-stations de dessalement fonctionnant de manière 100% autonome grâce à l’énergie solaire. Ce projet bénéficie directement à 1 200 membres de l’ethnie Wayúu dans la région aride de La Guajira, éliminant les maladies diarrhéiques et permettant l’irrigation de petits potagers communautaires.',
        zh: '安装了3个完全依靠光伏太阳能自主运行的微型脱盐水站。直接惠及干旱拉瓜希拉地区Wayúu原住民社区的1200名居民，消除了腹泻病，并为社区微型菜园提供灌溉水。',
        de: 'Installation von 3 Entsalzungs-Mikroanlagen, die zu 100 % autonom mit Solarstrom betrieben werden. Davon profitieren direkt 1.200 Angehörige der Wayuu-Ethnie in der trockenen Region La Guajira, was Durchfallerkrankungen eliminiert und die Bewässerung kleiner Gemeinschaftsgärten ermöglicht.'
      }
    },
    {
      id: 6,
      title: 'Ayuda Emergencia Altiplano',
      cause: 'emergency',
      country: 'Bolivia',
      city: 'Oruro',
      amount: '40 000 EUR',
      year: 2024,
      status: 'completed',
      img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800',
      description: {
        es: 'Distribución de kits de refugio temporal, alimentos y mantas tras las heladas extremas del invierno.',
        en: 'Distribution of emergency shelter kits, food, and blankets following severe winter frost.',
        fr: 'Distribution de kits d’abri d’urgence, de nourriture et de couvertures suite aux gelées hivernales extrêmes.',
        zh: '在遭遇极寒冬季霜冻后，分发紧急临时避难所、粮食和毛毯。',
        de: 'Verteilung von Notunterkünften, Lebensmitteln und Decken nach extremem Winterfrost.'
      },
      details: {
        es: 'Ante las olas de frío extremo de hasta -15°C que diezmaron el altiplano de Oruro, la fundación financió asistencia de emergencia para 400 familias pastoras de alpacas. Se distribuyeron mantas térmicas de alta densidad, estufas portátiles, módulos de forraje de emergencia para animales y canastas de alimentos básicos de larga duración.',
        en: 'In response to extreme cold waves reaching -15°C that devastated the Oruro highlands, the foundation funded emergency assistance for 400 alpaca herding families. High-density thermal blankets, portable heaters, emergency fodder modules for animals, and long-lasting food baskets were distributed.',
        fr: 'Face à des vagues de froid extrêmes atteignant -15°C sur les hauts plateaux d’Oruro, la fondation a financé une assistance d’urgence pour 400 familles d’éleveurs d’alpagas. Des couvertures thermiques haute densité, des chauffages portables, du fourrage d’urgence pour les animaux et des paniers de denrées alimentaires à longue conservation ont été distribués.',
        zh: '针对奥鲁罗高原发生低至零下15摄氏度的极寒冷害，基金会出资紧急援助了400个羊驼放牧家庭。分发了高密度保暖毛毯、便携式暖炉、牲畜紧急饲料包和长效基础食品篮。',
        de: 'Als Reaktion auf extreme Kältewellen von bis zu -15 °C, die das Hochland von Oruro verwüsteten, finanzierte die Stiftung Nothilfe für 400 Alpakazüchterfamilien. Verteilt wurden hochdichte Thermodecken, tragbare Öfen, Futter-Notfallmodule für die Tiere und Körbe mit haltbaren Grundnahrungsmitteln.'
      }
    }
  ];

  const uniqueCountries = Array.from(new Set(projectsData.map((p) => p.country)));

  // Filter logic
  const filteredProjects = projectsData.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.country.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCause = selectedCause === '' || p.cause === selectedCause;
    const matchesCountry = selectedCountry === '' || p.country === selectedCountry;
    const matchesStatus = selectedStatus === '' || p.status === selectedStatus;

    return matchesSearch && matchesCause && matchesCountry && matchesStatus;
  });

  const getCauseLabel = (causeValue: string): string => {
    switch (causeValue) {
      case 'education': return t('causes.items.education.title');
      case 'health': return t('causes.items.health.title');
      case 'environment': return t('causes.items.environment.title');
      case 'culture': return t('causes.items.culture.title');
      case 'emergency': return t('causes.items.emergency.title');
      default: return causeValue;
    }
  };

  return (
    <div className="font-sans text-brand-dark">
      {/* Intro Header */}
      <section className="bg-brand-blue py-16 text-brand-light text-center border-b border-brand-gold/10">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            {t('projects.title')}
          </h1>
          <p className="mt-4 text-sm sm:text-base text-brand-light/80 max-w-xl mx-auto leading-relaxed">
            {t('projects.subtitle')}
          </p>
        </div>
      </section>

      {/* Main projects view */}
      <section className="py-12 bg-brand-light/35 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          
          {/* Advanced Filter Toolbar */}
          <div className="bg-white border border-brand-gold/15 rounded-2xl p-5 shadow-sm mb-10 space-y-4">
            <div className="flex items-center space-x-2 text-brand-blue font-serif font-bold text-base mb-2">
              <SlidersHorizontal className="h-4.5 w-4.5 text-brand-gold" />
              <span>Búsqueda y Filtros / Search & Filters</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Text Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-gray/50" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('projects.search')}
                  className="w-full rounded border border-gray-200 pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-gold bg-brand-light/20"
                />
              </div>

              {/* Cause Dropdown */}
              <div>
                <select
                  value={selectedCause}
                  onChange={(e) => setSelectedCause(e.target.value)}
                  className="w-full rounded border border-gray-200 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-brand-gold"
                >
                  <option value="">{t('projects.filter_cause')}</option>
                  <option value="education">{t('causes.items.education.title')}</option>
                  <option value="health">{t('causes.items.health.title')}</option>
                  <option value="environment">{t('causes.items.environment.title')}</option>
                  <option value="culture">{t('causes.items.culture.title')}</option>
                  <option value="emergency">{t('causes.items.emergency.title')}</option>
                </select>
              </div>

              {/* Country Dropdown */}
              <div>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full rounded border border-gray-200 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-brand-gold"
                >
                  <option value="">{t('projects.filter_country')}</option>
                  {uniqueCountries.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Status Dropdown */}
              <div>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full rounded border border-gray-200 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-brand-gold"
                >
                  <option value="">{t('projects.filter_status')}</option>
                  <option value="active">{t('projects.status_active')}</option>
                  <option value="completed">{t('projects.status_completed')}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Cards Grid */}
          {filteredProjects.length === 0 ? (
            <div className="text-center py-16 bg-white border border-brand-gold/10 rounded-2xl p-8 shadow-inner">
              <SlidersHorizontal className="h-12 w-12 text-brand-gold/45 mx-auto mb-3" />
              <p className="text-brand-gray/80 text-sm font-medium">{t('projects.no_results')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((proj) => {
                const descText = proj.description[language] || proj.description['es'];
                
                return (
                  <div
                    key={proj.id}
                    className="flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition duration-300 cursor-pointer"
                    onClick={() => setSelectedProject(proj)}
                  >
                    <div className="aspect-video w-full overflow-hidden bg-gray-100 relative">
                      <img
                        src={proj.img}
                        alt={proj.title}
                        className="h-full w-full object-cover transition duration-300"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 bg-brand-blue/90 border border-brand-gold/25 text-brand-gold px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                        {getCauseLabel(proj.cause)}
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center justify-between text-[10px] font-semibold text-brand-gray/70 mb-1">
                          <span>{proj.city}, {proj.country}</span>
                          <span>{proj.year}</span>
                        </div>
                        <h3 className="font-serif text-lg font-bold text-brand-blue leading-snug group-hover:text-brand-gold">
                          {proj.title}
                        </h3>
                        <p className="text-xs text-brand-gray leading-relaxed mt-2.5 line-clamp-3">
                          {descText}
                        </p>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                        <span className="text-xs font-bold text-brand-gold uppercase tracking-wider">
                          {proj.amount}
                        </span>
                        <button className="flex items-center space-x-1 text-xs font-bold text-brand-blue hover:text-brand-gold transition duration-200">
                          <Eye className="h-4 w-4" />
                          <span>{t('projects.details')}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Project Details Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 sm:p-6 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="relative w-full max-w-2xl rounded-2xl border border-brand-gold/30 bg-white overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col text-brand-dark"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Header */}
            <div className="aspect-[21/9] w-full overflow-hidden bg-gray-100 relative">
              <img
                src={selectedProject.img}
                alt={selectedProject.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute right-4 top-4 rounded-full bg-black/40 p-2 text-white hover:bg-black/60 transition focus:outline-none focus:ring-2 focus:ring-brand-gold"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
              
              <div className="absolute bottom-4 left-4 sm:left-6 text-white">
                <span className="text-[9px] font-bold uppercase tracking-wider text-brand-gold border border-brand-gold/40 bg-brand-blue/80 px-2 py-0.5 rounded">
                  {getCauseLabel(selectedProject.cause)}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold mt-1 text-white leading-tight">
                  {selectedProject.title}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Quick Metadata grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-brand-light/60 border border-brand-gold/15 rounded-xl text-center text-xs">
                <div className="flex flex-col items-center">
                  <MapPin className="h-4 w-4 text-brand-gold mb-1" />
                  <span className="font-semibold text-brand-blue">{selectedProject.city}, {selectedProject.country}</span>
                </div>
                <div className="flex flex-col items-center">
                  <Calendar className="h-4 w-4 text-brand-gold mb-1" />
                  <span className="font-semibold text-brand-blue">{selectedProject.year}</span>
                </div>
                <div className="flex flex-col items-center">
                  <DollarSign className="h-4 w-4 text-brand-gold mb-1" />
                  <span className="font-semibold text-brand-blue font-mono">{selectedProject.amount}</span>
                </div>
                <div className="flex flex-col items-center">
                  <CheckCircle2 className="h-4 w-4 text-brand-gold mb-1" />
                  <span className="font-semibold uppercase text-brand-blue">
                    {selectedProject.status === 'active' ? t('projects.status_active') : t('projects.status_completed')}
                  </span>
                </div>
              </div>

              {/* Rich detail content */}
              <div>
                <h4 className="font-serif text-base font-bold text-brand-blue border-b border-brand-gold/10 pb-2 mb-3">
                  Descripción del Proyecto / Project Details
                </h4>
                <p className="text-sm text-brand-gray leading-relaxed text-justify font-light">
                  {selectedProject.details[language] || selectedProject.details['es']}
                </p>
              </div>

              {/* Close Button */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="rounded-full bg-brand-blue hover:bg-brand-blue/90 border border-brand-gold/20 text-white font-bold px-6 py-2.5 text-xs uppercase tracking-wider transition active:scale-95 shadow"
                >
                  {t('projects.close')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
