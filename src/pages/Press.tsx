import React, { useState } from 'react';
import { useTranslation } from '../i18n/i18n';
import { Download, FileText, Shield, Send, CheckCircle2 } from 'lucide-react';

export const Press: React.FC = () => {
  const { t } = useTranslation();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', outlet: '', message: '' });

  const annualReports = [
    { year: 2025, title: 'Informe de Impacto y RSE 2025', size: '4.2 MB', file: 'Informe_Impacto_FPH_2025.pdf' },
    { year: 2024, title: 'Informe Financiero y Auditoría 2024', size: '3.8 MB', file: 'Informe_Financiero_FPH_2024.pdf' },
    { year: 2023, title: 'Memoria Anual de Actividades 2023', size: '5.1 MB', file: 'Memoria_Anual_FPH_2023.pdf' }
  ];

  const pressReleases = [
    { date: '2025-06-05', title: 'Fundación Prospección Hancock expande apoyo ambiental en el Día del Medio Ambiente.' },
    { date: '2025-02-10', title: 'Clínica Móvil Andina de Cusco logra hito de 1,500 familias atendidas.' },
    { date: '2024-08-15', title: 'Nueva escuela solar abre sus puertas en Temuco, Chile, impulsada por FPH.' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setFormSubmitted(true);
      setFormData({ name: '', email: '', outlet: '', message: '' });
      setTimeout(() => setFormSubmitted(false), 5000);
    }
  };

  const handleDownload = (fileName: string) => {
    // Generate fake file download triggers
    alert(`Iniciando la descarga del archivo: ${fileName}\n(Simulación de descarga en entorno local)`);
  };

  return (
    <div className="font-sans text-brand-dark">
      {/* Intro Header */}
      <section className="bg-brand-blue py-16 text-brand-light text-center border-b border-brand-gold/10">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            {t('press.title')}
          </h1>
          <p className="mt-4 text-sm sm:text-base text-brand-light/80 max-w-xl mx-auto leading-relaxed">
            {t('press.subtitle')}
          </p>
        </div>
      </section>

      {/* Main Grid: Media Kit & Reports */}
      <section className="py-16 bg-white px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Block: Media Kit & Assets */}
          <div className="space-y-8">
            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-blue border-b border-brand-gold/15 pb-2 mb-4 flex items-center space-x-2">
                <Shield className="h-5.5 w-5.5 text-brand-gold" />
                <span>{t('press.media_kit')}</span>
              </h2>
              <p className="text-sm text-brand-gray/90 leading-relaxed font-light mb-6">
                {t('press.media_kit_desc')}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => handleDownload('Kit_Logos_Vectores_FPH.zip')}
                  className="flex items-center justify-between rounded-xl border border-brand-gold/20 p-4 hover:border-brand-gold hover:bg-brand-light/20 transition duration-200 text-left font-sans shadow-sm group"
                >
                  <div>
                    <h4 className="text-sm font-bold text-brand-blue">Logos Oficiales (ZIP)</h4>
                    <span className="text-[10px] text-brand-gray/70">SVG, PNG, JPG • 2.5 MB</span>
                  </div>
                  <Download className="h-5 w-5 text-brand-gold transition duration-200 group-hover:translate-y-0.5" />
                </button>

                <button
                  onClick={() => handleDownload('Guia_Marca_Fundacion_Hancock.pdf')}
                  className="flex items-center justify-between rounded-xl border border-brand-gold/20 p-4 hover:border-brand-gold hover:bg-brand-light/20 transition duration-200 text-left font-sans shadow-sm group"
                >
                  <div>
                    <h4 className="text-sm font-bold text-brand-blue">Guía de Identidad (PDF)</h4>
                    <span className="text-[10px] text-brand-gray/70">Especificaciones de marca • 1.2 MB</span>
                  </div>
                  <Download className="h-5 w-5 text-brand-gold transition duration-200 group-hover:translate-y-0.5" />
                </button>
              </div>
            </div>

            {/* Press releases */}
            <div>
              <h2 className="font-serif text-xl font-bold text-brand-blue border-b border-brand-gold/15 pb-2 mb-4">
                Últimos Comunicados de Prensa
              </h2>
              <div className="space-y-4">
                {pressReleases.map((release, idx) => (
                  <div key={idx} className="border-l-2 border-brand-gold pl-4 py-1">
                    <span className="text-[10px] font-mono font-semibold text-brand-gray/75 block">{release.date}</span>
                    <h4 className="text-sm font-bold text-brand-blue hover:text-brand-gold cursor-pointer transition leading-snug">
                      {release.title}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Block: Reports & Financial Transparency */}
          <div className="space-y-8">
            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-blue border-b border-brand-gold/15 pb-2 mb-4 flex items-center space-x-2">
                <FileText className="h-5.5 w-5.5 text-brand-gold" />
                <span>{t('press.reports_title')}</span>
              </h2>
              <p className="text-sm text-brand-gray/90 leading-relaxed font-light mb-6">
                {t('press.reports_desc')}
              </p>
              
              <div className="space-y-3">
                {annualReports.map((report) => (
                  <div
                    key={report.year}
                    className="flex items-center justify-between rounded-xl border border-gray-100 p-4 bg-brand-light/25 shadow-sm hover:shadow transition duration-200"
                  >
                    <div className="flex items-start space-x-3.5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-brand-blue/10 text-brand-gold">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-brand-blue">{report.title}</h4>
                        <span className="text-[10px] text-brand-gray/70">{report.size} • PDF</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDownload(report.file)}
                      className="rounded-full bg-white border border-brand-gold/30 hover:border-brand-gold p-2 text-brand-blue transition hover:bg-brand-light hover:text-brand-gold shadow-sm active:scale-95"
                      aria-label={`Download report ${report.year}`}
                    >
                      <Download className="h-4.5 w-4.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Press Photo Gallery */}
      <section className="py-14 bg-brand-light/30 border-t border-brand-gold/10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-8">
            <h2 className="font-serif text-2xl font-bold text-brand-blue">
              Galería Fotográfica de Prensa
            </h2>
            <p className="mt-2 text-xs text-brand-gray/80 max-w-sm mx-auto">
              Imágenes de alta resolución disponibles para uso periodístico bajo solicitud acreditada.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { src: "/img/Brand for Gina Rinehart.jpeg", label: "Gina Rinehart – Marca Corporativa" },
              { src: "/img/Gina Rinehart takes a giant leap into space.jpeg", label: "Rinehart – Inversión Tecnológica" },
              { src: "/img/Inside Billionaire Gina Rinehart's Key Mining Investments.jpeg", label: "Inversiones Mineras Clave" },
              { src: "/img/Gina Rinehart's wealth soars as Hancock Prospecting reports $4b profit.jpeg", label: "Resultados Financieros Hancock" },
              { src: "/img/What it's like to interview Australia's richest___.jpeg", label: "Entrevista Exclusiva" },
              { src: "/img/Fresh twist in Rinehart royalties case.jpeg", label: "Caso Rinehart – Regalías" },
              { src: "/img/Commodities Crash Washes Up In Korea.jpeg", label: "Exportaciones – Corea" },
              { src: "/img/Gina Rinehart - $26_5B Real Time Net Worth….jpeg", label: "Patrimonio Neto $26.5B" },
            ].map((img, idx) => (
              <div
                key={idx}
                className="group relative aspect-video rounded-xl overflow-hidden border border-brand-gold/10 shadow-sm hover:shadow-lg transition duration-300 bg-white"
              >
                <img
                  src={img.src}
                  alt={img.label}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-brand-blue/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <span className="text-[10px] font-semibold text-white leading-tight line-clamp-2">{img.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Inquiry Contact form */}
      <section className="py-16 bg-brand-light/40 border-t border-brand-gold/10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="font-serif text-2xl font-bold text-brand-blue">
              Contacto para Periodistas e Instituciones
            </h2>
            <p className="mt-2 text-xs text-brand-gray/80 max-w-sm mx-auto leading-relaxed">
              Formule su solicitud de prensa o entrevista y nuestro equipo de comunicaciones le responderá en menos de 24 horas.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-brand-gold/15 p-6 sm:p-8 shadow-sm">
            {formSubmitted ? (
              <div className="text-center py-8 flex flex-col items-center">
                <CheckCircle2 className="h-14 w-14 text-green-500 mb-3" />
                <h3 className="font-serif text-lg font-bold text-brand-blue mb-1">¡Solicitud Enviada!</h3>
                <p className="text-xs text-brand-gray/70">Gracias por ponerse en contacto con nuestra sala de prensa.</p>
              </div>
            ) : (
              <form onSubmit={handlePressSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="press-name" className="block text-xs font-semibold text-brand-gray uppercase mb-1">
                      Nombre completo <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="press-name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full rounded border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-gold"
                    />
                  </div>
                  <div>
                    <label htmlFor="press-email" className="block text-xs font-semibold text-brand-gray uppercase mb-1">
                      Correo electrónico <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="press-email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full rounded border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-gold"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="press-outlet" className="block text-xs font-semibold text-brand-gray uppercase mb-1">
                    Medio de prensa / Agencia
                  </label>
                  <input
                    type="text"
                    id="press-outlet"
                    name="outlet"
                    value={formData.outlet}
                    onChange={handleInputChange}
                    className="w-full rounded border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-gold"
                  />
                </div>

                <div>
                  <label htmlFor="press-message" className="block text-xs font-semibold text-brand-gray uppercase mb-1">
                    Consulta <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="press-message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full rounded border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-gold resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center space-x-1.5 rounded-full bg-brand-blue hover:bg-brand-blue/90 border border-brand-gold/20 text-white font-semibold text-xs py-3.5 transition active:scale-95 shadow uppercase tracking-wider"
                  >
                    <Send className="h-4 w-4 text-brand-gold" />
                    <span>Enviar Solicitud de Prensa</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
