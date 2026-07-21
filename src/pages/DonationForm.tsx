import React, { useState } from 'react';
import { useTranslation } from '../i18n/i18n';
import { CheckCircle2, Copy, Send, ArrowRight, RefreshCw } from 'lucide-react';

interface FormData {
  firstname: string;
  lastname: string;
  org: string;
  job: string;
  salary: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  address: string;
  cause: string;
  amount: string;
  description: string;
  beneficiaries: string;
  dates: string;
  privacy: boolean;
  honor: boolean;
  honeypot: string; // Hidden anti-spam field
}

interface FormErrors {
  [key: string]: string;
}

export const DonationForm: React.FC = () => {
  const { t, language } = useTranslation();

  const initialFormData: FormData = {
    firstname: '',
    lastname: '',
    org: '',
    job: '',
    salary: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    address: '',
    cause: '',
    amount: '',
    description: '',
    beneficiaries: '',
    dates: '',
    privacy: false,
    honor: false,
    honeypot: '',
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formattedMessage, setFormattedMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [spamError, setSpamError] = useState('');

  const salaryRanges = [
    '< 1 000 €',
    '1 000 – 2 000 €',
    '2 000 – 3 000 €',
    '3 000 – 5 000 €',
    '5 000 – 10 000 €',
    '> 10 000 €'
  ];

  const causes = [
    { value: 'education', label: t('causes.items.education.title') },
    { value: 'health', label: t('causes.items.health.title') },
    { value: 'environment', label: t('causes.items.environment.title') },
    { value: 'culture', label: t('causes.items.culture.title') },
    { value: 'emergency', label: t('causes.items.emergency.title') },
  ];

  // List of countries (brief list for selector)
  const countries = [
    { code: 'ES', name: 'España' },
    { code: 'FR', name: 'France' },
    { code: 'AU', name: 'Australia' },
    { code: 'AR', name: 'Argentina' },
    { code: 'CL', name: 'Chile' },
    { code: 'PE', name: 'Perú' },
    { code: 'MX', name: 'México' },
    { code: 'CO', name: 'Colombia' },
    { code: 'VE', name: 'Venezuela' },
    { code: 'DE', name: 'Deutschland' },
    { code: 'US', name: 'United States' },
    { code: 'CN', name: '中国' },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Clean field error on input
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate Honeypot (Anti-spam bot checker)
    if (formData.honeypot) {
      newErrors['honeypot'] = 'Spam detected';
      return false;
    }

    // Rate Limit (1 submission / 30 seconds)
    const lastSubmitTime = sessionStorage.getItem('fph_last_donation_submit');
    const now = Date.now();
    if (lastSubmitTime && now - parseInt(lastSubmitTime) < 30000) {
      setSpamError(t('donation.errors.spam'));
      return false;
    } else {
      setSpamError('');
    }

    // Required Text fields
    if (!formData.firstname.trim()) newErrors.firstname = t('donation.errors.required');
    if (!formData.lastname.trim()) newErrors.lastname = t('donation.errors.required');
    if (!formData.job.trim()) newErrors.job = t('donation.errors.required');
    if (!formData.city.trim()) newErrors.city = t('donation.errors.required');
    if (!formData.address.trim()) newErrors.address = t('donation.errors.required');
    if (!formData.amount.trim()) newErrors.amount = t('donation.errors.required');
    if (!formData.country) newErrors.country = t('donation.errors.required');
    if (!formData.cause) newErrors.cause = t('donation.errors.required');

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = t('donation.errors.required');
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = t('donation.errors.email');
    }

    // Phone validation
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    const sanitizedPhone = formData.phone.replace(/[\s-()]/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = t('donation.errors.required');
    } else if (!phoneRegex.test(sanitizedPhone)) {
      newErrors.phone = t('donation.errors.phone');
    }

    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = t('donation.errors.required');
    } else if (formData.description.length > 1000) {
      newErrors.description = t('donation.errors.max1000');
    }

    // Consent checkboxes
    if (!formData.privacy) newErrors.privacy = t('donation.errors.consent');
    if (!formData.honor) newErrors.honor = t('donation.errors.cert');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getCauseLabel = (causeValue: string): string => {
    const selected = causes.find((c) => c.value === causeValue);
    return selected ? selected.label : causeValue;
  };

  const getCountryName = (countryCode: string): string => {
    const selected = countries.find((c) => c.code === countryCode);
    return selected ? selected.name : countryCode;
  };

  const generateWhatsAppMessage = (data: FormData): string => {
    const orgPart = data.org ? ` (${data.org})` : '';
    const salaryPart = data.salary ? ` • ${t('donation.fields.salary')}: ${data.salary}` : '';
    const benefPart = data.beneficiaries ? ` • ${t('donation.fields.beneficiaries')}: ${data.beneficiaries}` : '';
    const datesPart = data.dates ? ` • ${t('donation.fields.dates')}: ${data.dates}` : '';
    const countryName = getCountryName(data.country);
    const causeLabel = getCauseLabel(data.cause);

    // Greeting changes per language
    const greetings: Record<string, string> = {
      fr: `Bonjour, je suis ${data.firstname} ${data.lastname}${orgPart}.`,
      en: `Hello, I am ${data.firstname} ${data.lastname}${orgPart}.`,
      de: `Hallo, ich bin ${data.firstname} ${data.lastname}${orgPart}.`,
      pt: `Olá, sou ${data.firstname} ${data.lastname}${orgPart}.`,
      ru: `Здравствуйте, я ${data.firstname} ${data.lastname}${orgPart}.`,
      ro: `Bună ziua, sunt ${data.firstname} ${data.lastname}${orgPart}.`,
      hr: `Pozdrav, ja sam ${data.firstname} ${data.lastname}${orgPart}.`,
      sr: `Zdravo, ja sam ${data.firstname} ${data.lastname}${orgPart}.`,
      zh: `您好，我是 ${data.firstname} ${data.lastname}${orgPart}。`,
    };
    const greeting = greetings[language] || `Hello, I am ${data.firstname} ${data.lastname}${orgPart}.`;

    return `${greeting}
${t('donation.fields.job')}: ${data.job}${salaryPart}
Email: ${data.email} • Tel: ${data.phone}
${t('donation.fields.country')}: ${countryName} • ${t('donation.fields.city')}: ${data.city} • ${t('donation.fields.address')}: ${data.address}
${t('donation.fields.cause')}: ${causeLabel} • ${t('donation.fields.amount')}: ${data.amount}${benefPart}
${t('donation.fields.description')}: ${data.description}${datesPart}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const message = generateWhatsAppMessage(formData);
    setFormattedMessage(message);

    // Save timestamp to sessionStorage to prevent spamming
    sessionStorage.setItem('fph_last_donation_submit', Date.now().toString());

    setIsSubmitted(true);

    // Redirect to WhatsApp
    const phone = '33757756283'; // Official WhatsApp: +33 7 57 75 62 83
    const encodedText = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedText}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(formattedMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendAgain = () => {
    const phone = '33757756283';
    const encodedText = encodeURIComponent(formattedMessage);
    window.open(`https://wa.me/${phone}?text=${encodedText}`, '_blank');
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setIsSubmitted(false);
    setFormattedMessage('');
  };

  if (isSubmitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:py-24 font-sans text-brand-dark">
        <div className="rounded-2xl border border-brand-gold/30 bg-white p-8 shadow-xl text-center flex flex-col items-center">
          <CheckCircle2 className="h-16 w-16 text-green-500 mb-4 animate-bounce" />
          <h2 className="font-serif text-3xl font-bold text-brand-blue mb-2">
            {t('donation.conf_title')}
          </h2>
          <p className="text-brand-gray/80 text-sm mb-8 max-w-md">
            {t('donation.conf_subtitle')}
          </p>

          <div className="w-full bg-brand-light/60 border border-brand-gold/15 rounded-lg p-5 text-left mb-8 font-mono text-xs whitespace-pre-wrap leading-relaxed select-all">
            {formattedMessage}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <button
              onClick={handleCopyMessage}
              className="flex-1 flex items-center justify-center space-x-2 rounded-full border border-brand-gold text-brand-blue font-semibold text-sm py-3 transition hover:bg-brand-light"
            >
              <Copy className="h-4 w-4 text-brand-gold" />
              <span>{copied ? t('donation.copied') : t('donation.copy_btn')}</span>
            </button>
            <button
              onClick={handleSendAgain}
              className="flex-1 flex items-center justify-center space-x-2 rounded-full bg-[#25D366] text-white font-semibold text-sm py-3 transition hover:bg-[#20ba5a] shadow"
            >
              <Send className="h-4 w-4" />
              <span>{t('donation.send_whatsapp')}</span>
            </button>
          </div>

          <button
            onClick={handleReset}
            className="mt-8 flex items-center space-x-1.5 text-xs font-semibold text-brand-gold hover:text-brand-gold-hover transition"
          >
            <RefreshCw className="h-3 w-3" />
            <span>{t('donation.new_form')}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 font-sans text-brand-dark">
      <div className="text-center mb-10">
        <h1 className="font-serif text-3xl font-bold tracking-tight text-brand-blue sm:text-4xl">
          {t('donation.title')}
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-brand-gray leading-relaxed">
          {t('donation.subtitle')}
        </p>
      </div>

      {spamError && (
        <div className="mb-6 rounded-lg bg-red-50 p-4 border border-red-200 text-sm text-red-700 font-medium">
          {spamError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="rounded-2xl border border-brand-gold/20 bg-white p-6 sm:p-10 shadow-xl space-y-8">
        {/* Anti-spam honeypot - invisible to human users */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="honeypot">Leave this empty</label>
          <input
            id="honeypot"
            name="honeypot"
            type="text"
            value={formData.honeypot}
            onChange={handleInputChange}
          />
        </div>

        {/* Section 1: Identity */}
        <div>
          <h2 className="font-serif text-lg font-bold text-brand-blue border-b border-brand-gold/15 pb-2 mb-4 flex items-center space-x-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-gold/10 text-xs font-bold text-brand-gold">1</span>
            <span>{t('donation.section_identity')}</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstname" className="block text-xs font-semibold text-brand-gray uppercase mb-1">
                {t('donation.fields.firstname')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                maxLength={60}
                value={formData.firstname}
                onChange={handleInputChange}
                className={`w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-1 ${
                  errors.firstname ? 'border-red-400 focus:ring-red-400' : 'border-gray-200 focus:ring-brand-gold'
                }`}
              />
              {errors.firstname && <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.firstname}</p>}
            </div>

            <div>
              <label htmlFor="lastname" className="block text-xs font-semibold text-brand-gray uppercase mb-1">
                {t('donation.fields.lastname')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                maxLength={60}
                value={formData.lastname}
                onChange={handleInputChange}
                className={`w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-1 ${
                  errors.lastname ? 'border-red-400 focus:ring-red-400' : 'border-gray-200 focus:ring-brand-gold'
                }`}
              />
              {errors.lastname && <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.lastname}</p>}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="org" className="block text-xs font-semibold text-brand-gray uppercase mb-1">
                {t('donation.fields.org')}
              </label>
              <input
                type="text"
                id="org"
                name="org"
                maxLength={120}
                value={formData.org}
                onChange={handleInputChange}
                className="w-full rounded border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-gold"
              />
            </div>

            <div>
              <label htmlFor="job" className="block text-xs font-semibold text-brand-gray uppercase mb-1">
                {t('donation.fields.job')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="job"
                name="job"
                maxLength={80}
                value={formData.job}
                onChange={handleInputChange}
                className={`w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-1 ${
                  errors.job ? 'border-red-400 focus:ring-red-400' : 'border-gray-200 focus:ring-brand-gold'
                }`}
              />
              {errors.job && <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.job}</p>}
            </div>

            <div>
              <label htmlFor="salary" className="block text-xs font-semibold text-brand-gray uppercase mb-1">
                {t('donation.fields.salary')}
              </label>
              <select
                id="salary"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                className="w-full rounded border border-gray-200 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-brand-gold"
              >
                <option value="">{t('donation.fields.salary_placeholder')}</option>
                {salaryRanges.map((range) => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Contact */}
        <div>
          <h2 className="font-serif text-lg font-bold text-brand-blue border-b border-brand-gold/15 pb-2 mb-4 flex items-center space-x-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-gold/10 text-xs font-bold text-brand-gold">2</span>
            <span>{t('donation.section_contact')}</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-brand-gray uppercase mb-1">
                {t('donation.fields.email')} <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-1 ${
                  errors.email ? 'border-red-400 focus:ring-red-400' : 'border-gray-200 focus:ring-brand-gold'
                }`}
              />
              {errors.email && <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-xs font-semibold text-brand-gray uppercase mb-1 flex items-center justify-between">
                <span>{t('donation.fields.phone')} <span className="text-red-500">*</span></span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+34600000000"
                className={`w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-1 ${
                  errors.phone ? 'border-red-400 focus:ring-red-400' : 'border-gray-200 focus:ring-brand-gold'
                }`}
              />
              {errors.phone && <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.phone}</p>}
            </div>

            <div>
              <label htmlFor="country" className="block text-xs font-semibold text-brand-gray uppercase mb-1">
                {t('donation.fields.country')} <span className="text-red-500">*</span>
              </label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className={`w-full rounded border px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 ${
                  errors.country ? 'border-red-400 focus:ring-red-400' : 'border-gray-200 focus:ring-brand-gold'
                }`}
              >
                <option value="">{t('donation.fields.country_placeholder')}</option>
                {countries.map((c) => (
                  <option key={c.code} value={c.code}>{c.name}</option>
                ))}
              </select>
              {errors.country && <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.country}</p>}
            </div>

            <div>
              <label htmlFor="city" className="block text-xs font-semibold text-brand-gray uppercase mb-1">
                {t('donation.fields.city')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className={`w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-1 ${
                  errors.city ? 'border-red-400 focus:ring-red-400' : 'border-gray-200 focus:ring-brand-gold'
                }`}
              />
              {errors.city && <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.city}</p>}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="address" className="block text-xs font-semibold text-brand-gray uppercase mb-1">
                {t('donation.fields.address')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={`w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-1 ${
                  errors.address ? 'border-red-400 focus:ring-red-400' : 'border-gray-200 focus:ring-brand-gold'
                }`}
              />
              {errors.address && <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.address}</p>}
            </div>
          </div>
        </div>

        {/* Section 3: Project info */}
        <div>
          <h2 className="font-serif text-lg font-bold text-brand-blue border-b border-brand-gold/15 pb-2 mb-4 flex items-center space-x-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-gold/10 text-xs font-bold text-brand-gold">3</span>
            <span>{t('donation.section_project')}</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="cause" className="block text-xs font-semibold text-brand-gray uppercase mb-1">
                {t('donation.fields.cause')} <span className="text-red-500">*</span>
              </label>
              <select
                id="cause"
                name="cause"
                value={formData.cause}
                onChange={handleInputChange}
                className={`w-full rounded border px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 ${
                  errors.cause ? 'border-red-400 focus:ring-red-400' : 'border-gray-200 focus:ring-brand-gold'
                }`}
              >
                <option value="">{t('donation.fields.cause_placeholder')}</option>
                {causes.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
              {errors.cause && <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.cause}</p>}
            </div>

            <div>
              <label htmlFor="amount" className="block text-xs font-semibold text-brand-gray uppercase mb-1">
                {t('donation.fields.amount')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="amount"
                name="amount"
                placeholder={t('donation.fields.amount_placeholder')}
                value={formData.amount}
                onChange={handleInputChange}
                className={`w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-1 ${
                  errors.amount ? 'border-red-400 focus:ring-red-400' : 'border-gray-200 focus:ring-brand-gold'
                }`}
              />
              {errors.amount && <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.amount}</p>}
            </div>

            <div className="sm:col-span-2">
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="description" className="block text-xs font-semibold text-brand-gray uppercase">
                  {t('donation.fields.description')} <span className="text-red-500">*</span>
                </label>
                <span className={`text-[10px] font-medium ${formData.description.length > 1000 ? 'text-red-500 font-bold' : 'text-brand-gray/60'}`}>
                  {formData.description.length} / 1000
                </span>
              </div>
              <textarea
                id="description"
                name="description"
                maxLength={1000}
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                placeholder={t('donation.fields.description_placeholder')}
                className={`w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-1 resize-none ${
                  errors.description ? 'border-red-400 focus:ring-red-400' : 'border-gray-200 focus:ring-brand-gold'
                }`}
              />
              {errors.description && <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.description}</p>}
            </div>

            <div>
              <label htmlFor="beneficiaries" className="block text-xs font-semibold text-brand-gray uppercase mb-1">
                {t('donation.fields.beneficiaries')}
              </label>
              <input
                type="number"
                id="beneficiaries"
                name="beneficiaries"
                min={0}
                value={formData.beneficiaries}
                onChange={handleInputChange}
                className="w-full rounded border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-gold"
              />
            </div>

            <div>
              <label htmlFor="dates" className="block text-xs font-semibold text-brand-gray uppercase mb-1">
                {t('donation.fields.dates')}
              </label>
              <input
                type="text"
                id="dates"
                name="dates"
                placeholder={t('donation.fields.dates_placeholder')}
                value={formData.dates}
                onChange={handleInputChange}
                className="w-full rounded border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-gold"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Consent */}
        <div className="pt-2">
          <h2 className="font-serif text-lg font-bold text-brand-blue border-b border-brand-gold/15 pb-2 mb-4 flex items-center space-x-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-gold/10 text-xs font-bold text-brand-gold">4</span>
            <span>{t('donation.section_consent')}</span>
          </h2>
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="privacy"
                  name="privacy"
                  type="checkbox"
                  checked={formData.privacy}
                  onChange={handleInputChange}
                  className="h-4 w-4 rounded border-gray-300 text-brand-gold focus:ring-brand-gold"
                />
              </div>
              <div className="ml-3 text-xs leading-5">
                <label htmlFor="privacy" className="font-medium text-brand-gray">
                  {t('donation.fields.privacy_consent')} <span className="text-red-500">*</span>
                </label>
                {errors.privacy && <p className="text-red-500 text-[10px] mt-0.5 font-medium">{errors.privacy}</p>}
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="honor"
                  name="honor"
                  type="checkbox"
                  checked={formData.honor}
                  onChange={handleInputChange}
                  className="h-4 w-4 rounded border-gray-300 text-brand-gold focus:ring-brand-gold"
                />
              </div>
              <div className="ml-3 text-xs leading-5">
                <label htmlFor="honor" className="font-medium text-brand-gray">
                  {t('donation.fields.honor_cert')} <span className="text-red-500">*</span>
                </label>
                {errors.honor && <p className="text-red-500 text-[10px] mt-0.5 font-medium">{errors.honor}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-brand-gold/10">
          <button
            type="submit"
            className="w-full flex items-center justify-center space-x-2 rounded-full bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold text-sm py-4.5 transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98] border border-brand-gold/25"
          >
            <Send className="h-4.5 w-4.5 text-brand-gold" />
            <span className="uppercase tracking-wider">{t('donation.fields.submit')}</span>
            <ArrowRight className="h-4 w-4 text-brand-gold" />
          </button>
        </div>
      </form>
    </div>
  );
};
