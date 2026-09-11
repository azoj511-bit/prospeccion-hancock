import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from '../i18n/i18n';
import { MapPin, Phone, Mail, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import L from 'leaflet';

export const Contact: React.FC = () => {
  const { t, language } = useTranslation();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // HPPL House, 28-42 Ventnor Avenue, West Perth WA 6005
    const officeCoord: [number, number] = [-31.9515, 115.8428];

    const map = L.map(mapContainerRef.current, {
      center: officeCoord,
      zoom: 15,
      scrollWheelZoom: false,
      zoomControl: true,
    });

    mapInstanceRef.current = map;

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const goldIcon = L.divIcon({
      html: `
        <div class="relative flex items-center justify-center h-6 w-6">
          <span class="absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping bg-brand-gold"></span>
          <span class="relative inline-flex rounded-full h-4 w-4 border-2 border-white shadow bg-brand-gold"></span>
        </div>
      `,
      className: 'custom-leaflet-marker',
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });

    L.marker(officeCoord, { icon: goldIcon })
      .bindPopup(`
        <div class="p-2 font-sans text-brand-dark">
          <h4 class="font-serif font-bold text-xs text-brand-blue mb-1">HPPL Headquarters</h4>
          <p class="text-[10px] text-brand-gray/80">HPPL House<br/>28-42, Ventnor Avenue, West Perth, WA 6005</p>
        </div>
      `)
      .addTo(map)
      .openPopup();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      const subjectText = formData.subject || 'N/A';
      
      let header = `*New Contact Message (Fundación Hancock)*`;
      if (language === 'fr') header = `*Nouveau message de contact (Fundación Hancock)*`;
      if (language === 'es') header = `*Nuevo mensaje de contacto (Fundación Hancock)*`;
      if (language === 'de') header = `*Neue Kontaktnachricht (Fundación Hancock)*`;

      const text = `${header}\n\n` +
                   `*${t('contact.form_name')}:* ${formData.name}\n` +
                   `*${t('contact.form_email')}:* ${formData.email}\n` +
                   `*${t('contact.form_subject')}:* ${subjectText}\n\n` +
                   `*${t('contact.form_message')}:*\n${formData.message}`;
      const waUrl = `https://wa.me/61480801641?text=${encodeURIComponent(text)}`;
      window.open(waUrl, '_blank');
      
      setFormSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setFormSubmitted(false), 8000);
    }
  };

  return (
    <div className="font-sans text-brand-dark">
      {/* Intro Header */}
      <section className="bg-brand-blue py-16 text-brand-light text-center border-b border-brand-gold/10">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            {t('contact.title')}
          </h1>
          <p className="mt-4 text-sm sm:text-base text-brand-light/80 max-w-xl mx-auto leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="py-16 bg-white px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Block: Coordinates */}
          <div className="space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              <h2 className="font-serif text-2xl font-bold text-brand-blue border-b border-brand-gold/15 pb-2 mb-4">
                {t('contact.info_title')}
              </h2>
              
              <div className="space-y-5">
                <div className="flex items-start space-x-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-light border border-brand-gold/15 text-brand-gold">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-brand-gray uppercase tracking-wider">{t('contact.registered_office_label')}</h4>
                    <p className="text-sm font-light text-brand-blue mt-0.5 whitespace-pre-line">
                      HPPL House, 28-42, Ventnor Avenue
                      West Perth, Western Australia, 6005
                      AUSTRALIA
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-light border border-brand-gold/15 text-brand-gold">
                    <MapPin className="h-5 w-5 animate-pulse text-brand-gold/70" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-brand-gray uppercase tracking-wider">{t('contact.postal_address_label')}</h4>
                    <p className="text-sm font-light text-brand-blue mt-0.5 whitespace-pre-line">
                      Locked Bag No. 2
                      West Perth, Western Australia 6872
                      AUSTRALIA
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-light border border-brand-gold/15 text-brand-gold">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-brand-gray uppercase tracking-wider">{t('contact.general_enquiries_label')}</h4>
                    <a href="mailto:mail@hancockprospecting.com.au" className="text-sm font-light text-brand-blue hover:text-brand-gold hover:underline mt-0.5 block">mail@hancockprospecting.com.au</a>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-light border border-brand-gold/15 text-brand-gold">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-brand-gray uppercase tracking-wider">{t('contact.media_enquiries_label')}</h4>
                    <a href="mailto:media@hancockprospecting.com.au" className="text-sm font-light text-brand-blue hover:text-brand-gold hover:underline mt-0.5 block">media@hancockprospecting.com.au</a>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-light border border-brand-gold/15 text-brand-gold">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-brand-gray uppercase tracking-wider">{t('contact.phone_label')}</h4>
                    <p className="text-sm font-light text-brand-blue mt-0.5">+61 480 801 641</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366]">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-brand-gray uppercase tracking-wider">{t('contact.whatsapp_label')}</h4>
                    <a
                      href="https://wa.me/61480801641"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-light text-brand-blue hover:text-brand-gold transition mt-0.5 block hover:underline"
                    >
                      +61 480 801 641
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Micro map of headquarters */}
            <div className="h-64 w-full rounded-2xl overflow-hidden border border-brand-gold/15 shadow-sm mt-6">
              <div ref={mapContainerRef} className="h-full w-full animate-fade-in" />
            </div>
          </div>

          {/* Right Block: General Message form */}
          <div className="bg-brand-light/35 border border-brand-gold/15 rounded-2xl p-6 sm:p-8 shadow-sm">
            <h2 className="font-serif text-2xl font-bold text-brand-blue border-b border-brand-gold/15 pb-2 mb-6">
              {t('contact.form_title')}
            </h2>

            {formSubmitted ? (
              <div className="text-center py-16 flex flex-col items-center">
                <CheckCircle2 className="h-16 w-16 text-green-500 mb-4 animate-bounce" />
                <h3 className="font-serif text-xl font-bold text-brand-blue mb-1">
                  {t('contact.form_success')}
                </h3>
                <p className="text-xs text-brand-gray/80">
                  {t('contact.form_success_sub')}
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-brand-gray uppercase mb-1">
                    {t('contact.form_name')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full rounded border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-gold bg-white"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-brand-gray uppercase mb-1">
                    {t('contact.form_email')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full rounded border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-gold bg-white"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-semibold text-brand-gray uppercase mb-1">
                    {t('contact.form_subject')}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full rounded border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-gold bg-white"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-brand-gray uppercase mb-1">
                    {t('contact.form_message')} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full rounded border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-gold bg-white resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center space-x-1.5 rounded-full bg-brand-blue hover:bg-brand-blue/90 border border-brand-gold/20 text-white font-semibold text-xs py-3.5 transition active:scale-95 shadow uppercase tracking-wider"
                  >
                    <Send className="h-4 w-4 text-brand-gold" />
                    <span>{t('contact.form_submit')}</span>
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
