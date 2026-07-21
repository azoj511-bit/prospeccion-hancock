import React, { useState } from 'react';
import { useTranslation } from '../i18n/i18n';
import { ProjectMap } from '../components/ProjectMap';
import { ChevronLeft, ChevronRight, Quote, Heart, Award, Sparkles } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  project: string;
  text: Record<string, string>;
  img: string;
}

export const Impact: React.FC = () => {
  const { t, language } = useTranslation();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'María Quispe',
      role: 'Madre de familia y artesana / Artisan & Mother',
      project: 'Clínica Móvil Andina',
      img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300',
      text: {
        es: 'La clínica móvil ha sido una bendición para nuestra comunidad. Antes, debíamos caminar 4 horas para que nuestros hijos vieran a un médico. Ahora nos atienden aquí con medicamentos gratis y mucho cariño.',
        en: 'The mobile clinic has been a blessing to our community. Before, we had to walk 4 hours for our children to see a doctor. Now we are treated here with free medicine and lots of care.',
        fr: 'La clinique mobile a été une bénédiction pour notre communauté. Avant, nous devions marcher 4 heures pour que nos enfants voient un médecin. Maintenant, nous sommes soignés ici avec des médicaments gratuits et beaucoup d’affection.',
        zh: '移动医疗车是我们社区的福星。以前，我们必须步行4个小时才能带孩子看医生。现在，我们可以在这里看病，还有免费药物和充满关怀的服务。',
        de: 'Die mobile Klinik war ein Segen für unsere Gemeinde. Früher mussten wir 4 Stunden laufen, damit unsere Kinder einen Arzt sehen konnten. Jetzt werden wir hier mit kostenlosen Medikamenten und viel Liebe versorgt.'
      }
    },
    {
      id: 2,
      name: 'Esteban Aravena',
      role: 'Estudiante de secundaria / Secondary Student',
      project: 'Escuela Rural del Mañana',
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
      text: {
        es: 'Tener internet en la escuela y computadoras cambió mi vida. Ahora puedo investigar para mis exámenes y sueño con estudiar ingeniería informática en la universidad. ¡Todo gracias a la fundación!',
        en: 'Having internet and computers at school changed my life. Now I can research for my exams and dream of studying computer engineering at university. All thanks to the foundation!',
        fr: 'Avoir internet et des ordinateurs à l’école a changé ma vie. Maintenant, je peux faire des recherches pour mes examens et je rêve d’étudier le génie informatique à l’université. Merci à la fondation !',
        zh: '学校有了互联网和电脑改变了我的生活。现在我可以为考试查找资料，并梦想着大学能学计算机工程学。这一切都归功于基金会！',
        de: 'Internet in der Schule und Computer haben mein Leben verändert. Jetzt kann ich für meine Prüfungen recherchieren und träume davon, Informatik an der Universität zu studieren. Alles dank der Stiftung!'
      }
    },
    {
      id: 3,
      name: 'Alba Martínez',
      role: 'Voluntaria ambiental / Environmental Volunteer',
      project: 'Reforestación Biodiversa Iberia',
      img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
      text: {
        es: 'Ver renacer el bosque quemado de Zamora es una emoción indescriptible. Sembrar encinas y verlas crecer nos devuelve la esperanza de un futuro verde y saludable en nuestro pueblo natal.',
        en: 'Watching the burned forest of Zamora come back to life is an indescribable emotion. Planting holm oaks and watching them grow restores our hope for a green and healthy future in our hometown.',
        fr: 'Voir renaître la forêt brûlée de Zamora est une émotion indescriptible. Planter des chênes verts et les voir grandir nous redonne l’espoir d’un avenir vert et sain dans notre village natal.',
        zh: '看到萨莫拉被烧毁的森林重焕新生，这种激动之情难以言表。种植圣栎并看它们成长，让我们重燃了家乡绿色健康未来的希望。',
        de: 'Den verbrannten Wald von Zamora wiedergeboren zu sehen, ist ein unbeschreibliches Gefühl. Steineichen zu pflanzen und sie wachsen zu sehen, gibt uns die Hoffnung auf eine grüne und gesunde Zukunft in unserem Heimatdorf zurück.'
      }
    }
  ];

  const handlePrevTestimonial = () => {
    setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNextTestimonial = () => {
    setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="font-sans text-brand-dark">
      {/* Intro Header */}
      <section className="bg-brand-blue py-16 text-brand-light text-center border-b border-brand-gold/10">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            {t('impact.title')}
          </h1>
          <p className="mt-4 text-sm sm:text-base text-brand-light/80 max-w-xl mx-auto leading-relaxed">
            {t('impact.subtitle')}
          </p>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white px-4 sm:px-6 lg:px-8 border-b border-brand-gold/10">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-10">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-blue">
              {t('impact.map_title')}
            </h2>
            <p className="mt-2 text-sm text-brand-gray/80 max-w-md mx-auto leading-relaxed">
              {t('impact.map_desc')}
            </p>
          </div>
          
          <ProjectMap />
        </div>
      </section>

      {/* Dynamic Indicators / KPIs */}
      <section className="py-20 bg-brand-light/40 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-14">
            <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest bg-brand-gold/10 px-3 py-1 rounded-full border border-brand-gold/25">
              {t('about.values_title')}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-blue mt-4 animate-fade-in">
              {t('impact.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl border border-brand-gold/10 p-7 shadow-sm text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-gold/10 mb-4">
                <Sparkles className="h-6 w-6 text-brand-gold" />
              </div>
              <span className="block font-mono text-3xl font-bold text-brand-blue mb-1">94%</span>
              <h4 className="font-serif text-sm font-semibold text-brand-blue mb-2">
                {t('impact.kpi_completion_title')}
              </h4>
              <p className="text-xs text-brand-gray leading-relaxed font-light font-sans">
                {t('impact.kpi_completion_desc')}
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-brand-gold/10 p-7 shadow-sm text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-gold/10 mb-4">
                <Heart className="h-6 w-6 text-brand-gold" />
              </div>
              <span className="block font-mono text-3xl font-bold text-brand-blue mb-1">50 000+</span>
              <h4 className="font-serif text-sm font-semibold text-brand-blue mb-2">
                {t('impact.kpi_meals_title')}
              </h4>
              <p className="text-xs text-brand-gray leading-relaxed font-light font-sans">
                {t('impact.kpi_meals_desc')}
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-brand-gold/10 p-7 shadow-sm text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-gold/10 mb-4">
                <Award className="h-6 w-6 text-brand-gold" />
              </div>
              <span className="block font-mono text-3xl font-bold text-brand-blue mb-1">2 500+</span>
              <h4 className="font-serif text-sm font-semibold text-brand-blue mb-2">
                {t('impact.kpi_scholarships_title')}
              </h4>
              <p className="text-xs text-brand-gray leading-relaxed font-light font-sans">
                {t('impact.kpi_scholarships_desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials section */}
      <section className="py-20 bg-white px-4 sm:px-6 lg:px-8 border-t border-brand-gold/10">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl font-bold text-brand-blue">
              {t('impact.testimonials_title')}
            </h2>
            <p className="mt-3 text-sm text-brand-gray">
              {t('impact.testimonials_subtitle')}
            </p>
          </div>

          {/* Testimonial card slider */}
          <div className="relative rounded-2xl border border-brand-gold/15 bg-brand-light/30 p-8 sm:p-12 shadow-md">
            <Quote className="absolute top-6 left-6 h-10 w-10 text-brand-gold/15 rotate-180" />
            
            <div className="flex flex-col items-center text-center">
              <div className="h-20 w-20 rounded-full overflow-hidden border border-brand-gold/30 shadow-md mb-4">
                <img
                  src={testimonials[activeTestimonial].img}
                  alt={testimonials[activeTestimonial].name}
                  className="h-full w-full object-cover"
                />
              </div>
              
              <span className="text-xs font-bold text-brand-gold uppercase tracking-wider mb-0.5">
                {testimonials[activeTestimonial].project}
              </span>
              <h3 className="font-serif text-lg font-bold text-brand-blue">
                {testimonials[activeTestimonial].name}
              </h3>
              <span className="text-[10px] text-brand-gray/65 italic mb-6">
                {testimonials[activeTestimonial].role}
              </span>
              
              <p className="text-sm sm:text-base text-brand-dark/90 leading-relaxed font-light max-w-2xl text-justify sm:text-center italic">
                "{testimonials[activeTestimonial].text[language] || testimonials[activeTestimonial].text['en']}"
              </p>
            </div>

            {/* Slider Controls */}
            <div className="flex justify-center space-x-4 mt-8 pt-4 border-t border-brand-gold/10">
              <button
                onClick={handlePrevTestimonial}
                className="rounded-full bg-white border border-brand-gold/25 p-2 text-brand-blue hover:bg-brand-light hover:text-brand-gold transition active:scale-95"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={handleNextTestimonial}
                className="rounded-full bg-white border border-brand-gold/25 p-2 text-brand-blue hover:bg-brand-light hover:text-brand-gold transition active:scale-95"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
