import React, { useState } from 'react';
import { useTranslation, detectLanguageFromCountry } from '../i18n/i18n';
import {
  CheckCircle2,
  Copy,
  Send,
  ArrowRight,
  RefreshCw,
  Download,
  Printer,
  FileText,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { DonationPdfDocument, type DonationDocumentData } from '../components/DonationPdfDocument';
import { generatePdfFromElement } from '../utils/pdfGenerator';

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
  const { t, language, changeLanguage } = useTranslation();

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
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [showRawMessage, setShowRawMessage] = useState(false);
  const [dossierData, setDossierData] = useState<DonationDocumentData | null>(null);

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

  // Comprehensive international country list
  const countries = [
    { code: 'MX', name: 'México' },
    { code: 'ES', name: 'España' },
    { code: 'FR', name: 'France' },
    { code: 'BJ', name: 'Bénin' },
    { code: 'SN', name: 'Sénégal' },
    { code: 'CI', name: "Côte d'Ivoire" },
    { code: 'CM', name: 'Cameroun' },
    { code: 'TG', name: 'Togo' },
    { code: 'CD', name: 'Rép. Dém. du Congo' },
    { code: 'CG', name: 'Congo' },
    { code: 'GA', name: 'Gabon' },
    { code: 'ML', name: 'Mali' },
    { code: 'BF', name: 'Burkina Faso' },
    { code: 'GN', name: 'Guinée' },
    { code: 'BE', name: 'Belgique' },
    { code: 'CH', name: 'Suisse' },
    { code: 'CA', name: 'Canada' },
    { code: 'AR', name: 'Argentina' },
    { code: 'CO', name: 'Colombia' },
    { code: 'CL', name: 'Chile' },
    { code: 'PE', name: 'Perú' },
    { code: 'VE', name: 'Venezuela' },
    { code: 'EC', name: 'Ecuador' },
    { code: 'BO', name: 'Bolivia' },
    { code: 'UY', name: 'Uruguay' },
    { code: 'PY', name: 'Paraguay' },
    { code: 'CR', name: 'Costa Rica' },
    { code: 'PA', name: 'Panamá' },
    { code: 'DO', name: 'República Dominicana' },
    { code: 'US', name: 'United States' },
    { code: 'AU', name: 'Australia' },
    { code: 'DE', name: 'Deutschland' },
    { code: 'PT', name: 'Portugal' },
    { code: 'BR', name: 'Brasil' },
    { code: 'RO', name: 'România' },
    { code: 'HR', name: 'Hrvatska' },
    { code: 'RS', name: 'Srbija' },
    { code: 'RU', name: 'Россия' },
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

    // Auto-adaptation of language based on selected country
    if (name === 'country' && value) {
      const detectedLang = detectLanguageFromCountry(value);
      if (detectedLang && detectedLang !== language) {
        changeLanguage(detectedLang);
      }
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

    // ALL FIELDS ARE MANDATORY (Strict validation)
    if (!formData.firstname.trim()) newErrors.firstname = t('donation.errors.required');
    if (!formData.lastname.trim()) newErrors.lastname = t('donation.errors.required');
    if (!formData.org.trim()) newErrors.org = t('donation.errors.required');
    if (!formData.job.trim()) newErrors.job = t('donation.errors.required');
    if (!formData.salary.trim()) newErrors.salary = t('donation.errors.required');
    if (!formData.country) newErrors.country = t('donation.errors.required');
    if (!formData.city.trim()) newErrors.city = t('donation.errors.required');
    if (!formData.address.trim()) newErrors.address = t('donation.errors.required');
    if (!formData.cause) newErrors.cause = t('donation.errors.required');
    if (!formData.amount.trim()) newErrors.amount = t('donation.errors.required');
    if (!formData.beneficiaries.trim()) newErrors.beneficiaries = t('donation.errors.required');
    if (!formData.dates.trim()) newErrors.dates = t('donation.errors.required');

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

    if (Object.keys(newErrors).length > 0) {
      // Scroll to first error smoothly
      const firstErrorField = Object.keys(newErrors)[0];
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

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

  const generateWhatsAppMessage = (data: FormData, refNumber: string): string => {
    const orgPart = data.org ? ` (${data.org})` : '';
    const salaryPart = data.salary ? ` • ${t('donation.fields.salary')}: ${data.salary}` : '';
    const benefPart = data.beneficiaries ? ` • ${t('donation.fields.beneficiaries')}: ${data.beneficiaries}` : '';
    const countryName = getCountryName(data.country);
    const causeLabel = getCauseLabel(data.cause);

    const greetings: Record<string, string> = {
      es: `Estimada Fundación Hancock, soy ${data.firstname} ${data.lastname}${orgPart}. Solicitud formal [Ref: ${refNumber}]:`,
      fr: `Bonjour, je suis ${data.firstname} ${data.lastname}${orgPart}. Demande officielle [Réf: ${refNumber}]:`,
      en: `Dear Hancock Foundation, I am ${data.firstname} ${data.lastname}${orgPart}. Official Grant Application [Ref: ${refNumber}]:`,
      de: `Guten Tag, ich bin ${data.firstname} ${data.lastname}${orgPart}. Offizielle Förderungsanfrage [Ref: ${refNumber}]:`,
      pt: `Olá, sou ${data.firstname} ${data.lastname}${orgPart}. Candidatura oficial a subsídio [Ref: ${refNumber}]:`,
      ru: `Здравствуйте, я ${data.firstname} ${data.lastname}${orgPart}. Официальная заявка на грант [Ref: ${refNumber}]:`,
      ro: `Bună ziua, sunt ${data.firstname} ${data.lastname}${orgPart}. Cerere oficială de finanțare [Ref: ${refNumber}]:`,
      hr: `Pozdrav, ja sam ${data.firstname} ${data.lastname}${orgPart}. Službeni zahtjev za donaciju [Ref: ${refNumber}]:`,
      sr: `Zdravo, ja sam ${data.firstname} ${data.lastname}${orgPart}. Zvanični zahtev za donaciju [Ref: ${refNumber}]:`,
      zh: `您好，我是 ${data.firstname} ${data.lastname}${orgPart}。正式资助申请 [编号: ${refNumber}]:`,
    };
    const greeting = greetings[language] || `Bonjour, je suis ${data.firstname} ${data.lastname}${orgPart}. Demande [Réf: ${refNumber}]:`;

    return `🏛️ *${t('donation.dossier.official_header')}*
📄 *${t('donation.dossier.official_title')}*
🔢 *${t('donation.dossier.ref_label')}:* ${refNumber}

${greeting}
👤 *${t('donation.fields.job')}:* ${data.job}${salaryPart}
📧 *Email:* ${data.email} • 📱 *Tel:* ${data.phone}
🌍 *${t('donation.fields.country')}:* ${countryName} • *${t('donation.fields.city')}:* ${data.city} • *${t('donation.fields.address')}:* ${data.address}
🎯 *${t('donation.fields.cause')}:* ${causeLabel}
💰 *${t('donation.fields.amount')}:* ${data.amount}${benefPart}
🗓️ *${t('donation.fields.dates')}:* ${data.dates}
📝 *${t('donation.fields.description')}:*
${data.description}

✅ *${t('donation.fields.honor_cert')}*`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    const refNumber = `FPH-2026-DON-${randomDigits}`;

    const dateOptions: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    const submissionDateFormatted = new Intl.DateTimeFormat(language || 'es', dateOptions).format(new Date());

    const docData: DonationDocumentData = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      org: formData.org,
      job: formData.job,
      salary: formData.salary,
      email: formData.email,
      phone: formData.phone,
      country: formData.country,
      countryName: getCountryName(formData.country),
      city: formData.city,
      address: formData.address,
      cause: formData.cause,
      causeLabel: getCauseLabel(formData.cause),
      amount: formData.amount,
      description: formData.description,
      beneficiaries: formData.beneficiaries,
      dates: formData.dates,
      referenceNumber: refNumber,
      submissionDate: submissionDateFormatted,
    };

    setDossierData(docData);

    const message = generateWhatsAppMessage(formData, refNumber);
    setFormattedMessage(message);

    // Save timestamp to sessionStorage to prevent spamming
    sessionStorage.setItem('fph_last_donation_submit', Date.now().toString());

    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Open WhatsApp in a new tab automatically
    const phone = '61480801641'; // Official WhatsApp: +61 480 801 641
    const encodedText = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleDownloadPdf = async () => {
    if (!dossierData) return;
    setIsGeneratingPdf(true);
    try {
      const sanitizedName = `${dossierData.firstname}_${dossierData.lastname}`.replace(/[^a-zA-Z0-9]/g, '_');
      const filename = `Expediente_FPH_${dossierData.referenceNumber}_${sanitizedName}.pdf`;
      await generatePdfFromElement({
        elementId: 'donation-official-document',
        filename,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(formattedMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendAgain = () => {
    const phone = '61480801641';
    const encodedText = encodeURIComponent(formattedMessage);
    window.open(`https://wa.me/${phone}?text=${encodedText}`, '_blank');
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setIsSubmitted(false);
    setFormattedMessage('');
    setDossierData(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // View: Success / Structured Official Confirmation
  if (isSubmitted && dossierData) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:py-16 font-sans text-brand-dark">
        {/* Top Success Banner */}
        <div className="mb-8 rounded-2xl border border-brand-gold/30 bg-white p-6 sm:p-8 shadow-xl text-center flex flex-col items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 mb-3 ring-8 ring-emerald-50/50">
            <CheckCircle2 className="h-10 w-10 animate-bounce" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-blue mb-2">
            {t('donation.dossier.conf_banner')}
          </h2>
          <p className="text-brand-gray text-sm max-w-2xl leading-relaxed mb-6">
            {t('donation.dossier.conf_sub')}
          </p>

          {/* Action Toolbar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full max-w-3xl">
            {/* Download Official PDF */}
            <button
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="flex items-center justify-center space-x-2 rounded-xl bg-brand-gold hover:bg-brand-gold-hover text-brand-blue font-bold text-xs py-3.5 px-4 transition shadow-md hover:shadow-lg active:scale-95 disabled:opacity-60 cursor-pointer"
            >
              <Download className={`h-4 w-4 ${isGeneratingPdf ? 'animate-spin' : ''}`} />
              <span>
                {isGeneratingPdf
                  ? t('donation.dossier.generating_pdf')
                  : t('donation.dossier.download_pdf')}
              </span>
            </button>

            {/* Send via WhatsApp */}
            <button
              onClick={handleSendAgain}
              className="flex items-center justify-center space-x-2 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs py-3.5 px-4 transition shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
            >
              <Send className="h-4 w-4" />
              <span>{t('donation.dossier.send_whatsapp')}</span>
            </button>

            {/* Print Official Dossier */}
            <button
              onClick={handlePrint}
              className="flex items-center justify-center space-x-2 rounded-xl border border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white font-bold text-xs py-3.5 px-4 transition shadow-sm cursor-pointer"
            >
              <Printer className="h-4 w-4" />
              <span>{t('donation.dossier.print_dossier')}</span>
            </button>

            {/* Copy Structured Text */}
            <button
              onClick={handleCopyMessage}
              className="flex items-center justify-center space-x-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold text-xs py-3.5 px-4 transition cursor-pointer"
            >
              <Copy className="h-4 w-4 text-brand-gold" />
              <span>{copied ? t('donation.copied') : t('donation.copy_btn')}</span>
            </button>
          </div>

          <div className="mt-6 flex items-center justify-between w-full max-w-3xl pt-4 border-t border-gray-100 text-xs">
            <button
              onClick={() => setShowRawMessage(!showRawMessage)}
              className="flex items-center space-x-1 text-gray-500 hover:text-brand-blue font-medium transition cursor-pointer"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>{showRawMessage ? 'Masquer le texte brut WhatsApp' : 'Voir le message texte WhatsApp'}</span>
              {showRawMessage ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>

            <button
              onClick={handleReset}
              className="flex items-center space-x-1.5 font-semibold text-brand-gold hover:text-brand-gold-hover transition cursor-pointer"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>{t('donation.dossier.new_application')}</span>
            </button>
          </div>

          {/* Collapsible raw WhatsApp message preview */}
          {showRawMessage && (
            <div className="w-full max-w-3xl bg-gray-50 border border-gray-200 rounded-lg p-4 text-left mt-4 font-mono text-xs whitespace-pre-wrap leading-relaxed select-all">
              {formattedMessage}
            </div>
          )}
        </div>

        {/* The Official Dossier Document View (Used for preview and high-res PDF generation) */}
        <div className="rounded-2xl border border-brand-gold/20 bg-gray-100 p-3 sm:p-6 shadow-inner">
          <div className="mb-4 flex items-center justify-between px-2 text-xs text-gray-500">
            <span className="font-semibold uppercase tracking-wider text-brand-blue flex items-center space-x-1">
              <ShieldCheck className="h-4 w-4 text-brand-gold inline" />
              <span>Aperçu officiel du dossier A4 certifié</span>
            </span>
            <span>Réf : {dossierData.referenceNumber}</span>
          </div>

          <DonationPdfDocument data={dossierData} id="donation-official-document" />
        </div>
      </div>
    );
  }

  // View: Main Interactive Form
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 font-sans text-brand-dark">
      <div className="text-center mb-10">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-gold bg-brand-blue/95 px-3 py-1 rounded-full mb-3 shadow-sm">
          {t('donation.dossier.official_header')}
        </span>
        <h1 className="font-serif text-3xl font-bold tracking-tight text-brand-blue sm:text-4xl">
          {t('donation.title')}
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-brand-gray leading-relaxed">
          {t('donation.subtitle')}
        </p>
        <div className="mt-3 inline-flex items-center space-x-1 text-xs text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-md">
          <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
          <span>Tous les champs marqués d'un astérisque (<span className="text-red-500 font-bold">*</span>) sont strictement obligatoires pour la recevabilité de votre dossier.</span>
        </div>
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
                  errors.firstname ? 'border-red-400 focus:ring-red-400 bg-red-50/30' : 'border-gray-200 focus:ring-brand-gold'
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
                  errors.lastname ? 'border-red-400 focus:ring-red-400 bg-red-50/30' : 'border-gray-200 focus:ring-brand-gold'
                }`}
              />
              {errors.lastname && <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.lastname}</p>}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="org" className="block text-xs font-semibold text-brand-gray uppercase mb-1">
                {t('donation.fields.org')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="org"
                name="org"
                maxLength={120}
                value={formData.org}
                onChange={handleInputChange}
                placeholder="Ex: Association Espoir, Club de Tennis, ou 'Particulier'"
                className={`w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-1 ${
                  errors.org ? 'border-red-400 focus:ring-red-400 bg-red-50/30' : 'border-gray-200 focus:ring-brand-gold'
                }`}
              />
              {errors.org && <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.org}</p>}
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
                placeholder="Ex: Coach de tennis, Enseignant, etc."
                className={`w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-1 ${
                  errors.job ? 'border-red-400 focus:ring-red-400 bg-red-50/30' : 'border-gray-200 focus:ring-brand-gold'
                }`}
              />
              {errors.job && <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.job}</p>}
            </div>

            <div>
              <label htmlFor="salary" className="block text-xs font-semibold text-brand-gray uppercase mb-1">
                {t('donation.fields.salary')} <span className="text-red-500">*</span>
              </label>
              <select
                id="salary"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                className={`w-full rounded border px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 ${
                  errors.salary ? 'border-red-400 focus:ring-red-400 bg-red-50/30' : 'border-gray-200 focus:ring-brand-gold'
                }`}
              >
                <option value="">{t('donation.fields.salary_placeholder')}</option>
                {salaryRanges.map((range) => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
              {errors.salary && <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.salary}</p>}
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
                placeholder="votre-email@domaine.com"
                className={`w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-1 ${
                  errors.email ? 'border-red-400 focus:ring-red-400 bg-red-50/30' : 'border-gray-200 focus:ring-brand-gold'
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
                placeholder="+2290144512389 ou +34600000000"
                className={`w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-1 ${
                  errors.phone ? 'border-red-400 focus:ring-red-400 bg-red-50/30' : 'border-gray-200 focus:ring-brand-gold'
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
                  errors.country ? 'border-red-400 focus:ring-red-400 bg-red-50/30' : 'border-gray-200 focus:ring-brand-gold'
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
                placeholder="Ex: Tijuana"
                className={`w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-1 ${
                  errors.city ? 'border-red-400 focus:ring-red-400 bg-red-50/30' : 'border-gray-200 focus:ring-brand-gold'
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
                placeholder="Numéro, rue, quartier, code postal"
                className={`w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-1 ${
                  errors.address ? 'border-red-400 focus:ring-red-400 bg-red-50/30' : 'border-gray-200 focus:ring-brand-gold'
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
                  errors.cause ? 'border-red-400 focus:ring-red-400 bg-red-50/30' : 'border-gray-200 focus:ring-brand-gold'
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
                  errors.amount ? 'border-red-400 focus:ring-red-400 bg-red-50/30' : 'border-gray-200 focus:ring-brand-gold'
                }`}
              />
              {errors.amount && <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.amount}</p>}
            </div>

            <div>
              <label htmlFor="beneficiaries" className="block text-xs font-semibold text-brand-gray uppercase mb-1">
                {t('donation.fields.beneficiaries')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="beneficiaries"
                name="beneficiaries"
                placeholder={t('donation.fields.beneficiaries_placeholder')}
                value={formData.beneficiaries}
                onChange={handleInputChange}
                className={`w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-1 ${
                  errors.beneficiaries ? 'border-red-400 focus:ring-red-400 bg-red-50/30' : 'border-gray-200 focus:ring-brand-gold'
                }`}
              />
              {errors.beneficiaries && <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.beneficiaries}</p>}
            </div>

            <div>
              <label htmlFor="dates" className="block text-xs font-semibold text-brand-gray uppercase mb-1">
                {t('donation.fields.dates')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="dates"
                name="dates"
                placeholder={t('donation.fields.dates_placeholder')}
                value={formData.dates}
                onChange={handleInputChange}
                className={`w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-1 ${
                  errors.dates ? 'border-red-400 focus:ring-red-400 bg-red-50/30' : 'border-gray-200 focus:ring-brand-gold'
                }`}
              />
              {errors.dates && <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.dates}</p>}
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
                  errors.description ? 'border-red-400 focus:ring-red-400 bg-red-50/30' : 'border-gray-200 focus:ring-brand-gold'
                }`}
              />
              {errors.description && <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.description}</p>}
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
                  className="h-4 w-4 rounded border-gray-300 text-brand-gold focus:ring-brand-gold cursor-pointer"
                />
              </div>
              <div className="ml-3 text-xs leading-5">
                <label htmlFor="privacy" className="font-medium text-brand-gray cursor-pointer">
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
                  className="h-4 w-4 rounded border-gray-300 text-brand-gold focus:ring-brand-gold cursor-pointer"
                />
              </div>
              <div className="ml-3 text-xs leading-5">
                <label htmlFor="honor" className="font-medium text-brand-gray cursor-pointer">
                  {t('donation.fields.honor_cert')} <span className="text-red-500">*</span>
                </label>
                {errors.honor && <p className="text-red-500 text-[10px] mt-0.5 font-medium">{errors.honor}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-brand-gold/10">
          <button
            type="submit"
            className="w-full flex items-center justify-center space-x-2 rounded-full bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold text-sm py-4.5 transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98] border border-brand-gold/25 cursor-pointer"
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
