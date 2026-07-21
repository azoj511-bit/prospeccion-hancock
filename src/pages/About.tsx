import React from 'react';
import { useTranslation } from '../i18n/i18n';
import { ShieldCheck, Heart, Award, ArrowUpRight } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  titles: Record<string, string>;
  bios: Record<string, string>;
  img: string;
}

export const About: React.FC = () => {
  const { t, language } = useTranslation();

  const valuesList = [
    {
      id: 'integrity',
      title: t('about.values.integrity'),
      desc: t('about.values.integrity_desc'),
      icon: <ShieldCheck className="h-6 w-6 text-brand-gold" />
    },
    {
      id: 'excellence',
      title: t('about.values.excellence'),
      desc: t('about.values.excellence_desc'),
      icon: <Award className="h-6 w-6 text-brand-gold" />
    },
    {
      id: 'impact',
      title: t('about.values.impact'),
      desc: t('about.values.impact_desc'),
      icon: <Heart className="h-6 w-6 text-brand-gold" />
    }
  ];

  const execCommittee: TeamMember[] = [
    {
      id: 'rinehart',
      name: 'Mrs. Gina Rinehart AO',
      titles: {
        en: 'Executive Chairman - Hancock Prospecting, Roy Hill, S. Kidman & Co',
        es: 'Presidenta Ejecutiva - Hancock Prospecting, Roy Hill, S. Kidman & Co',
        fr: 'Présidente Exécutive - Hancock Prospecting, Roy Hill, S. Kidman & Co',
      },
      bios: {
        en: 'Gina Rinehart is a leading figure in the mining and agricultural industries in Australia. Since becoming Executive Chairman of Hancock Prospecting in 1992, she transformed it from a financially troubled group into one of the most successful private mining companies in the world.',
        fr: 'Gina Rinehart est une figure de proue des industries minières et agricoles en Australie. Depuis qu\'elle est devenue présidente exécutive de Hancock Prospecting en 1992, elle a transformé le groupe en l\'une des sociétés minières privées les plus prospères au monde.',
        es: 'Gina Rinehart es una figura líder en las industrias minera y agrícola en Australia. Desde que asumió la presidencia ejecutiva de Hancock Prospecting en 1992, transformó el grupo en una de las empresas mineras privadas más exitosas del mundo.'
      },
      img: '/img/IMG-20260720-WA0026.jpg'
    },
    {
      id: 'watroba',
      name: 'Mr. Tad Watroba',
      titles: {
        en: 'Executive Director',
        es: 'Director Ejecutivo',
        fr: 'Directeur Exécutif',
      },
      bios: {
        en: 'Fifty years’ total experience in both open cut and underground mining, encompassing mining operations, mine planning, feasibility studies, project financial evaluation, negotiations with government and non-government organizations, and joint venture participation.',
        fr: 'Cinquante ans d\'expérience dans l\'exploitation minière à ciel ouvert et souterraine, englobant les opérations minières, la planification, les études de faisabilité, l\'évaluation financière des projets et les négociations.',
        es: 'Cincuenta años de experiencia en minería a cielo abierto y subterránea, que abarcan operaciones mineras, planificación, estudios de viabilidad, evaluación financiera de proyectos y negociaciones.'
      },
      img: 'https://www.hancockprospecting.com.au/wp-content/uploads/2021/11/Tad-Watroba.jpg'
    },
    {
      id: 'newby',
      name: 'Mr. Jay Newby',
      titles: {
        en: 'Executive Director',
        es: 'Director Ejecutivo',
        fr: 'Directeur Exécutif',
      },
      bios: {
        en: 'Chartered Accountant admitted to the Institute of Chartered Accountants in Australia in 1988. Broad experience in corporate finance, accounting and tax, and mergers and acquisitions, specialising in the mining/resources and property sectors.',
        fr: 'Expert-comptable admis à l\'Institut des experts-comptables d\'Australie en 1988. Large expérience en finance d\'entreprise, comptabilité et fiscalité, fusions et acquisitions dans le secteur minier.',
        es: 'Contador público admitido en el Instituto de Contadores Públicos de Australia en 1988. Amplia experiencia en finanzas corporativas, contabilidad e impuestos, y fusiones y adquisiciones en el sector minero.'
      },
      img: 'https://www.hancockprospecting.com.au/wp-content/uploads/2021/11/Jay-Newby.jpg'
    },
    {
      id: 'korte',
      name: 'Mr. Garry Korte',
      titles: {
        en: 'Chief Executive Officer',
        es: 'Director General (CEO)',
        fr: 'Directeur Général (CEO)',
      },
      bios: {
        en: '30 years’ experience in mining and related industries. Joined Hancock subsidiary Roy Hill as CFO in 2012 responsible for leading US$7.2billion project financing to construct the project. Appointed CEO of Hancock Prospecting in 2016.',
        fr: '30 ans d\'expérience dans l\'industrie minière. A rejoint Roy Hill en tant que directeur financier en 2012, menant le financement de projet de 7,2 milliards de dollars, avant de devenir PDG du groupe en 2016.',
        es: '30 años de experiencia en la industria minera. Se incorporó a Roy Hill como director financiero en 2012, liderando el financiamiento del proyecto de 7.2 mil millones de dólares, antes de ser nombrado CEO en 2016.'
      },
      img: 'https://www.hancockprospecting.com.au/wp-content/uploads/2021/11/Garry-Korte.jpg'
    }
  ];

  const seniorManagement: TeamMember[] = [
    {
      id: 'veldsman',
      name: 'Gerhard Veldsman',
      titles: {
        en: 'CEO Operations for Hancock Prospecting',
        es: 'CEO de Operaciones',
        fr: 'CEO des Opérations',
      },
      bios: {
        en: 'Gerhard has extensive mining industry experience spanning various commodities and operations in Australia and South Africa, including more than a decade in iron ore, with responsibility for Roy Hill and Atlas Iron.',
        fr: 'Gerhard possède une vaste expérience de l\'industrie minière englobant diverses matières premières et opérations en Australie et en Afrique du Sud, avec la responsabilité de Roy Hill et d\'Atlas Iron.',
        es: 'Gerhard tiene una amplia experiencia en la industria minera que abarca diversos productos básicos y operaciones en Australia y Sudáfrica, con responsabilidad sobre Roy Hill y Atlas Iron.'
      },
      img: 'https://www.hancockprospecting.com.au/wp-content/uploads/2023/03/gerhard-veldsman.jpg'
    },
    {
      id: 'manchanda',
      name: 'Sanjiv Manchanda',
      titles: {
        en: 'CEO Projects for Hancock Prospecting',
        es: 'CEO de Proyectos',
        fr: 'CEO des Projets',
      },
      bios: {
        en: 'Sanjiv oversees all projects in the Hancock Prospecting pipeline, including significant iron ore initiatives in the Pilbara, as well as new developments and international endeavours.',
        fr: 'Sanjiv supervise tous les projets du portefeuille de Hancock Prospecting, y compris les initiatives majeures de minerai de fer dans le Pilbara, ainsi que les nouveaux développements internationaux.',
        es: 'Sanjiv supervisa todos los proyectos en la cartera de Hancock Prospecting, incluidas las importantes iniciativas de mineral de hierro en Pilbara, así como nuevos desarrollos internacionales.'
      },
      img: 'https://www.hancockprospecting.com.au/wp-content/uploads/2023/03/sanjiv-manchanda.jpg'
    },
    {
      id: 'huang',
      name: 'Jabez Huang',
      titles: {
        en: 'Chief Financial Officer',
        es: 'Director Financiero (CFO)',
        fr: 'Directeur Financier (CFO)',
      },
      bios: {
        en: 'Jabez has more than 20 years of experience in financial reporting, corporate taxation, advisory and treasury within the mining and resources industry in Australia.',
        fr: 'Jabez a plus de 20 ans d\'expérience dans le reporting financier, la fiscalité des entreprises, le conseil et la trésorerie au sein de l\'industrie minière en Australie.',
        es: 'Jabez tiene más de 20 años de experiencia en informes financieros, impuestos corporativos, asesoría y tesorería dentro de la industria minera en Australia.'
      },
      img: 'https://www.hancockprospecting.com.au/wp-content/uploads/2021/11/Jabez-Huang.jpg'
    },
    {
      id: 'johnston',
      name: 'Stuart Johnston',
      titles: {
        en: 'CEO Hancock Energy',
        es: 'CEO de Hancock Energy',
        fr: 'CEO de Hancock Energy',
      },
      bios: {
        en: 'Over 30 years’ experience in international and Australian energy and infrastructure businesses. Former CEO of Squadron Energy and Dampier to Bunbury Natural Gas Pipeline (DBP).',
        fr: 'Plus de 30 ans d\'expérience dans les entreprises d\'énergie et d\'infrastructure internationales et australiennes. Ancien PDG de Squadron Energy et du gazoduc Dampier-Bunbury (DBP).',
        es: 'Más de 30 años de experiencia en empresas de energía e infraestructura internacionales y australianas. Ex CEO de Squadron Energy y del gasoducto Dampier a Bunbury (DBP).'
      },
      img: 'https://www.hancockprospecting.com.au/wp-content/uploads/2021/11/Stuart-Johnston.jpg'
    },
    {
      id: 'giles',
      name: 'Adam Giles',
      titles: {
        en: 'CEO Hancock Agriculture',
        es: 'CEO de Hancock Agriculture',
        fr: 'CEO de Hancock Agriculture',
      },
      bios: {
        en: 'Adam Giles is the 10th Chief Minister of the Northern Territory (2013-2016). Extensive experience in public sector administration and agriculture management.',
        fr: 'Adam Giles est le 10e ministre en chef du Territoire du Nord (2013-2016). Vaste expérience dans l\'administration du secteur public et la gestion agricole.',
        es: 'Adam Giles es el décimo Ministro Principal del Territorio del Norte (2013-2016). Amplia experiencia en administración del sector público y gestión agrícola.'
      },
      img: 'https://www.hancockprospecting.com.au/wp-content/uploads/2026/06/adam-giles_2.jpg'
    }
  ];

  const getTranslation = (member: TeamMember, field: 'titles' | 'bios'): string => {
    const dict = member[field];
    return dict[language] || dict['en'] || '';
  };

  return (
    <div className="font-sans text-brand-dark">
      <section className="bg-brand-blue py-16 text-brand-light text-center border-b border-brand-gold/10">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white animate-fade-in">
            {t('about.title')}
          </h1>
          <p className="mt-4 text-sm sm:text-base text-brand-light/80 max-w-xl mx-auto leading-relaxed">
            {t('about.subtitle')}
          </p>
        </div>
      </section>

      <section className="py-20 bg-white px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-blue border-b border-brand-gold/15 pb-2">
              {t('about.history_title')}
            </h2>
            <p className="text-sm sm:text-base text-brand-gray/95 leading-relaxed font-light text-justify">
              {t('about.history_text')}
            </p>
            <div className="flex items-center space-x-2.5 text-xs text-brand-gold font-bold uppercase tracking-wider">
              <a href="https://www.hancockprospecting.com.au/about-us/" target="_blank" rel="noopener noreferrer" className="flex items-center hover:underline">
                <span>{t('about.pioneer_title')}</span>
                <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
              </a>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-brand-gold/15 bg-brand-light/50 p-2">
            <img
              src="/img/IMG-20260720-WA0026.jpg"
              alt="Gina Rinehart Spotlight"
              className="rounded-xl w-full object-cover aspect-[4/3] shadow-inner"
            />
          </div>
        </div>
      </section>

      <section className="py-20 bg-brand-light/45 px-4 sm:px-6 lg:px-8 border-y border-brand-gold/10">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
            <div className="bg-white rounded-2xl border border-brand-gold/10 p-7 shadow-sm">
              <h3 className="font-serif text-xl font-bold text-brand-blue mb-3 border-b border-brand-gold/10 pb-2">
                {t('about.mission_title')}
              </h3>
              <p className="text-sm text-brand-gray/95 leading-relaxed font-light">
                {t('about.mission_text')}
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-brand-gold/10 p-7 shadow-sm">
              <h3 className="font-serif text-xl font-bold text-brand-blue mb-3 border-b border-brand-gold/10 pb-2">
                {t('about.vision_title')}
              </h3>
              <p className="text-sm text-brand-gray/95 leading-relaxed font-light">
                {t('about.vision_text')}
              </p>
            </div>
          </div>
          <div className="text-center mb-10">
            <h3 className="font-serif text-2xl font-bold text-brand-blue">
              {t('about.values_title')}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {valuesList.map((val) => (
              <div key={val.id} className="bg-white rounded-xl border border-brand-gold/10 p-6 text-center shadow-sm">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-brand-gold/10 mb-4">
                  {val.icon}
                </div>
                <h4 className="font-serif text-base font-bold text-brand-blue mb-2">{val.title}</h4>
                <p className="text-xs text-brand-gray/90 leading-relaxed font-light">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl font-bold text-brand-blue">
              {t('about.committee_title')}
            </h2>
            <p className="mt-3 text-sm text-brand-gray max-w-xl mx-auto">
              {t('about.committee_desc')}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {execCommittee.map((member) => (
              <div key={member.id} className="flex flex-col bg-brand-light/10 border border-brand-gold/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition duration-300">
                <div className="aspect-[4/3] w-full overflow-hidden border-b border-brand-gold/10 relative bg-gray-50">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="h-full w-full object-cover object-top transition duration-500 hover:scale-103"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-serif text-base font-bold text-brand-blue">{member.name}</h3>
                    <span className="text-[9px] font-bold text-brand-gold uppercase tracking-wider block mt-1">
                      {getTranslation(member, 'titles')}
                    </span>
                  </div>
                  <p className="text-xs text-brand-gray/90 leading-relaxed font-light">
                    {getTranslation(member, 'bios')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-brand-light/35 px-4 sm:px-6 lg:px-8 border-t border-brand-gold/10">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl font-bold text-brand-blue">
              {t('about.team_title')}
            </h2>
            <p className="mt-3 text-sm text-brand-gray max-w-xl mx-auto">
              {t('about.team_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {seniorManagement.map((member) => (
              <div key={member.id} className="flex flex-col bg-white border border-brand-gold/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition duration-300">
                <div className="aspect-[4/3] w-full overflow-hidden border-b border-brand-gold/10 bg-gray-50">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="h-full w-full object-cover object-top transition duration-500 hover:scale-103"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-serif text-base font-bold text-brand-blue">{member.name}</h3>
                    <span className="text-[9px] font-bold text-brand-gold uppercase tracking-wider block mt-1">
                      {getTranslation(member, 'titles')}
                    </span>
                  </div>
                  <p className="text-xs text-brand-gray/90 leading-relaxed font-light">
                    {getTranslation(member, 'bios')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
