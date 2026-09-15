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
  const { t, language, changeLanguageAuto } = useTranslation();

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

  // Currency mapping per country code
  const getCurrencyForCountry = (countryCode: string): { symbol: string; name: string } => {
    const currencyMap: Record<string, { symbol: string; name: string }> = {
      // Euro zone
      ES: { symbol: '€', name: 'EUR' }, FR: { symbol: '€', name: 'EUR' },
      DE: { symbol: '€', name: 'EUR' }, BE: { symbol: '€', name: 'EUR' },
      PT: { symbol: '€', name: 'EUR' }, LU: { symbol: '€', name: 'EUR' },
      // FCFA (Franc CFA Afrique de l'Ouest)
      BJ: { symbol: 'FCFA', name: 'XOF' }, SN: { symbol: 'FCFA', name: 'XOF' },
      CI: { symbol: 'FCFA', name: 'XOF' }, ML: { symbol: 'FCFA', name: 'XOF' },
      TG: { symbol: 'FCFA', name: 'XOF' }, BF: { symbol: 'FCFA', name: 'XOF' },
      GN: { symbol: 'GNF', name: 'GNF' }, NE: { symbol: 'FCFA', name: 'XOF' },
      // FCFA Afrique Centrale
      CM: { symbol: 'FCFA', name: 'XAF' }, CD: { symbol: 'CDF', name: 'CDF' },
      CG: { symbol: 'FCFA', name: 'XAF' }, GA: { symbol: 'FCFA', name: 'XAF' },
      // Americas Spanish
      MX: { symbol: '$', name: 'MXN' }, AR: { symbol: '$', name: 'ARS' },
      CO: { symbol: '$', name: 'COP' }, CL: { symbol: '$', name: 'CLP' },
      PE: { symbol: 'S/', name: 'PEN' }, VE: { symbol: 'Bs.', name: 'VES' },
      EC: { symbol: '$', name: 'USD' }, BO: { symbol: 'Bs.', name: 'BOB' },
      UY: { symbol: '$', name: 'UYU' }, PY: { symbol: '₲', name: 'PYG' },
      CR: { symbol: '₡', name: 'CRC' }, PA: { symbol: 'B/.', name: 'PAB' },
      DO: { symbol: 'RD$', name: 'DOP' }, GT: { symbol: 'Q', name: 'GTQ' },
      HN: { symbol: 'L', name: 'HNL' }, SV: { symbol: '$', name: 'USD' },
      NI: { symbol: 'C$', name: 'NIO' }, CU: { symbol: '$', name: 'CUP' },
      // English speaking
      US: { symbol: '$', name: 'USD' }, AU: { symbol: '$', name: 'AUD' },
      GB: { symbol: '£', name: 'GBP' }, CA: { symbol: '$', name: 'CAD' },
      NZ: { symbol: '$', name: 'NZD' }, IE: { symbol: '€', name: 'EUR' },
      // Africa English
      ZA: { symbol: 'R', name: 'ZAR' }, NG: { symbol: '₦', name: 'NGN' },
      GH: { symbol: 'GH₵', name: 'GHS' },
      // Portuguese
      BR: { symbol: 'R$', name: 'BRL' }, AO: { symbol: 'Kz', name: 'AOA' },
      MZ: { symbol: 'MT', name: 'MZN' },
      // Swiss
      CH: { symbol: 'CHF', name: 'CHF' },
      // Eastern Europe
      RO: { symbol: 'lei', name: 'RON' }, MD: { symbol: 'L', name: 'MDL' },
      HR: { symbol: '€', name: 'EUR' }, RS: { symbol: 'din.', name: 'RSD' },
      ME: { symbol: '€', name: 'EUR' }, BA: { symbol: 'KM', name: 'BAM' },
      // Russian sphere
      RU: { symbol: '₽', name: 'RUB' }, BY: { symbol: 'Br', name: 'BYN' },
      KZ: { symbol: '₸', name: 'KZT' }, KG: { symbol: 'som', name: 'KGS' },
      // Asia
      CN: { symbol: '¥', name: 'CNY' }, TW: { symbol: 'NT$', name: 'TWD' },
      HK: { symbol: 'HK$', name: 'HKD' }, SG: { symbol: 'S$', name: 'SGD' },
      IN: { symbol: '₹', name: 'INR' }, PH: { symbol: '₱', name: 'PHP' },
      MG: { symbol: 'Ar', name: 'MGA' },
    };
    return currencyMap[countryCode] || { symbol: '€', name: 'EUR' };
  };

  // Country dialing codes for international autofill
  const DIAL_CODES: Record<string, string> = {
    MX: '+52', ES: '+34', FR: '+33', BJ: '+229', SN: '+221', CI: '+225', CM: '+237',
    TG: '+228', CD: '+243', CG: '+242', GA: '+241', ML: '+223', BF: '+226', GN: '+224',
    BE: '+32', CH: '+41', CA: '+1', AR: '+54', CO: '+57', CL: '+56', PE: '+51',
    VE: '+58', EC: '+593', BO: '+591', UY: '+598', PY: '+595', CR: '+506', PA: '+507',
    DO: '+1-809', US: '+1', AU: '+61', DE: '+49', PT: '+351', BR: '+55', RO: '+40',
    HR: '+385', RS: '+381', RU: '+7', CN: '+86',
  };

  // Dynamic salary ranges based on selected country
  const getSalaryRanges = (countryCode: string): string[] => {
    const fallbackCode = language === 'es' ? 'MX' : language === 'fr' ? 'FR' : 'US';
    const activeCode = countryCode || fallbackCode;
    const { symbol, name } = getCurrencyForCountry(activeCode);
    const label = `${symbol} (${name})`;
    // Scale thresholds by currency (some currencies are much weaker than EUR)
    const highInflation = ['ARS', 'COP', 'CLP', 'PYG', 'VES', 'CDF', 'GNF', 'NGN', 'AOA'];
    const midInflation = ['MXN', 'BRL', 'CRC', 'DOP', 'HNL', 'NIO', 'GTQ', 'BOB', 'PEN', 'UYU', 'INR', 'PH'];
    if (highInflation.includes(name)) {
      return [`< 500 000 ${label}`, `500 000 – 1 000 000 ${label}`, `1 000 000 – 2 000 000 ${label}`, `2 000 000 – 5 000 000 ${label}`, `5 000 000 – 10 000 000 ${label}`, `> 10 000 000 ${label}`];
    } else if (midInflation.includes(name)) {
      return [`< 5 000 ${label}`, `5 000 – 15 000 ${label}`, `15 000 – 30 000 ${label}`, `30 000 – 60 000 ${label}`, `60 000 – 120 000 ${label}`, `> 120 000 ${label}`];
    } else if (['XOF', 'XAF'].includes(name)) {
      return [`< 100 000 ${label}`, `100 000 – 250 000 ${label}`, `250 000 – 500 000 ${label}`, `500 000 – 1 000 000 ${label}`, `1 000 000 – 2 000 000 ${label}`, `> 2 000 000 ${label}`];
    } else {
      return [`< 1 000 ${label}`, `1 000 – 2 000 ${label}`, `2 000 – 3 000 ${label}`, `3 000 – 5 000 ${label}`, `5 000 – 10 000 ${label}`, `> 10 000 ${label}`];
    }
  };

  const activeCountryCode = formData.country || (language === 'es' ? 'MX' : language === 'fr' ? 'FR' : 'US');
  const salaryRanges = getSalaryRanges(formData.country || '');
  const currentCurrency = getCurrencyForCountry(activeCountryCode);

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

    // Auto-adaptation of language + currency + phone prefix based on selected country
    if (name === 'country' && value) {
      const detectedLang = detectLanguageFromCountry(value);
      if (detectedLang && detectedLang !== language) {
        changeLanguageAuto(detectedLang);
      }
      const dialCode = DIAL_CODES[value];
      setFormData((prev) => {
        let newPhone = prev.phone;
        // If phone is empty or only contains a previous dialing code, replace with new dial code
        if (!newPhone || Object.values(DIAL_CODES).some((dc) => newPhone.trim() === dc.trim())) {
          newPhone = dialCode ? `${dialCode} ` : '';
        }
        return {
          ...prev,
          country: value,
          salary: '',
          phone: newPhone,
        };
      });
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

    // Auto-append local currency code and symbol if user only entered numbers
    const activeCountry = formData.country || (language === 'es' ? 'MX' : language === 'fr' ? 'FR' : 'US');
    const { symbol: currSym, name: currCode } = getCurrencyForCountry(activeCountry);
    let finalAmount = formData.amount.trim();
    if (finalAmount && !finalAmount.includes(currCode) && !finalAmount.includes(currSym)) {
      finalAmount = `${finalAmount} ${currSym} (${currCode})`;
    }

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
      amount: finalAmount,
      description: formData.description,
      beneficiaries: formData.beneficiaries,
      dates: formData.dates,
      referenceNumber: refNumber,
      submissionDate: submissionDateFormatted,
    };

    setDossierData(docData);

    const message = generateWhatsAppMessage({ ...formData, amount: finalAmount }, refNumber);
    setFormattedMessage(message);

    // Save timestamp to sessionStorage to prevent spamming
    sessionStorage.setItem('fph_last_donation_submit', Date.now().toString());

    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Auto-download PDF after a short delay (wait for DOM to render the dossier)
    setTimeout(async () => {
      const sanitizedName = `${formData.firstname}_${formData.lastname}`.replace(/[^a-zA-Z0-9]/g, '_');
      const filename = `Expediente_FPH_${refNumber}_${sanitizedName}.pdf`;
      await generatePdfFromElement({
        elementId: 'donation-official-document',
        filename,
      });
    }, 800);
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

  const handleSendViaWhatsApp = async () => {
    // Step 1: Re-generate PDF and trigger download
    setIsGeneratingPdf(true);
    try {
      if (dossierData) {
        const sanitizedName = `${dossierData.firstname}_${dossierData.lastname}`.replace(/[^a-zA-Z0-9]/g, '_');
        const filename = `Expediente_FPH_${dossierData.referenceNumber}_${sanitizedName}.pdf`;
        await generatePdfFromElement({
          elementId: 'donation-official-document',
          filename,
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingPdf(false);
    }

    // Step 2: Open WhatsApp with a concise message asking to attach the PDF
    const phone = '61480801641';
    const ref = dossierData?.referenceNumber || '';
    const name = dossierData ? `${dossierData.firstname} ${dossierData.lastname}` : '';
    const attachMsg: Record<string, string> = {
      es: `Estimada Fundación Hancock,\n\nLe transmito en archivo adjunto mi Expediente Oficial de Donación.\n\n📌 Ref.: ${ref}\n👤 Solicitante: ${name}\n\nQuedo a su disposición para cualquier información complementaria.\n\nAtentamente.`,
      fr: `Fondation Hancock,\n\nVeuillez trouver en pièce jointe mon Dossier Officiel de Demande de Don.\n\n📌 Réf.: ${ref}\n👤 Demandeur: ${name}\n\nJe reste disponible pour tout renseignement complémentaire.\n\nCordialement.`,
      en: `Dear Hancock Foundation,\n\nPlease find attached my Official Grant Application Dossier.\n\n📌 Ref.: ${ref}\n👤 Applicant: ${name}\n\nI remain available for any further information.\n\nYours faithfully.`,
      de: `Sehr geehrte Hancock-Stiftung,\n\nIm Anhang finden Sie mein offizielles Spenden-Dossier.\n\n📌 Ref.: ${ref}\n👤 Antragsteller: ${name}\n\nFür Rückfragen stehe ich gerne zur Verfügung.\n\nMit freundlichen Grüßen.`,
      pt: `Estimada Fundação Hancock,\n\nEnvio em anexo o meu Dossiê Oficial de Pedido de Doação.\n\n📌 Ref.: ${ref}\n👤 Requerente: ${name}\n\nFico à disposição para qualquer informação adicional.\n\nCom os melhores cumprimentos.`,
      ru: `Уважаемый Фонд Хэнкок,\n\nПрилагаю официальное досье моей заявки.\n\n📌 Реф.: ${ref}\n👤 Заявитель: ${name}\n\nГотов ответить на любые вопросы.\n\nС уважением.`,
      zh: `尊敬的汉考克基金会，\n\n諻查收随信附上我的官方捐款申请档案。\n\n📌 编号: ${ref}\n👤 申请人: ${name}\n\n如有任何问题，请随时联系我。\n\n此致`,
    };
    const msg = attachMsg[language] || attachMsg['es'];
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-3xl">
            {/* Step 1: Download PDF */}
            <button
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="flex items-center justify-center space-x-2 rounded-xl bg-brand-gold hover:bg-brand-gold-hover text-brand-blue font-bold text-sm py-4 px-5 transition shadow-md hover:shadow-lg active:scale-95 disabled:opacity-60 cursor-pointer"
            >
              <Download className={`h-5 w-5 ${isGeneratingPdf ? 'animate-spin' : ''}`} />
              <div className="text-left">
                <div className="font-bold">
                  {isGeneratingPdf ? t('donation.dossier.generating_pdf') : t('donation.dossier.download_pdf')}
                </div>
                <div className="text-[10px] font-normal opacity-75">{t('donation.dossier.step1_label')}</div>
              </div>
            </button>

            {/* Step 2: Send PDF via WhatsApp */}
            <button
              onClick={handleSendViaWhatsApp}
              disabled={isGeneratingPdf}
              className="flex items-center justify-center space-x-2 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm py-4 px-5 transition shadow-md hover:shadow-lg active:scale-95 disabled:opacity-60 cursor-pointer"
            >
              <Send className="h-5 w-5" />
              <div className="text-left">
                <div className="font-bold">{t('donation.dossier.whatsapp_pdf_btn')}</div>
                <div className="text-[10px] font-normal opacity-80">{t('donation.dossier.step2_label')}</div>
              </div>
            </button>
          </div>

          {/* Secondary actions */}
          <div className="grid grid-cols-2 gap-2 w-full max-w-3xl mt-2">
            {/* Print */}
            <button
              onClick={handlePrint}
              className="flex items-center justify-center space-x-2 rounded-xl border border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white font-semibold text-xs py-3 px-4 transition cursor-pointer"
            >
              <Printer className="h-4 w-4" />
              <span>{t('donation.dossier.print_dossier')}</span>
            </button>

            {/* Copy text */}
            <button
              onClick={handleCopyMessage}
              className="flex items-center justify-center space-x-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold text-xs py-3 px-4 transition cursor-pointer"
            >
              <Copy className="h-4 w-4 text-brand-gold" />
              <span>{copied ? t('donation.copied') : t('donation.copy_btn')}</span>
            </button>
          </div>

          {/* Instruction banner: attach PDF in WhatsApp */}
          <div className="w-full max-w-3xl mt-3 rounded-xl bg-[#25D366]/10 border border-[#25D366]/40 p-3 flex items-start space-x-3">
            <span className="text-2xl flex-shrink-0">📎</span>
            <div className="text-xs text-gray-700 leading-relaxed">
              <span className="font-bold text-[#128C7E]">{t('donation.dossier.pdf_attach_tip_title')}</span>{' '}
              {t('donation.dossier.pdf_attach_tip')}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between w-full max-w-3xl pt-4 border-t border-gray-100 text-xs">
            <button
              onClick={() => setShowRawMessage(!showRawMessage)}
              className="flex items-center space-x-1 text-gray-500 hover:text-brand-blue font-medium transition cursor-pointer"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>{showRawMessage ? t('donation.dossier.summary_text') : t('donation.dossier.send_whatsapp')}</span>
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
          <span>{t('donation.fields.required_notice')} (<span className="text-red-500 font-bold">*</span>)</span>
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
                placeholder={t('donation.fields.org')}
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
                placeholder={t('donation.fields.job')}
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
                placeholder={t('donation.fields.email')}
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
                placeholder={t('donation.fields.phone')}
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
                placeholder={t('donation.fields.city')}
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
                placeholder={t('donation.fields.address')}
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
              <label htmlFor="amount" className="block text-xs font-semibold text-brand-gray uppercase mb-1 flex items-center justify-between">
                <span>{t('donation.fields.amount')} <span className="text-red-500">*</span></span>
                <span className="text-[10px] font-bold text-brand-blue bg-brand-gold/20 px-2 py-0.5 rounded">
                  {currentCurrency.name} ({currentCurrency.symbol})
                </span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="amount"
                  name="amount"
                  placeholder={`Ex: 25 000 ${currentCurrency.symbol} (${currentCurrency.name})`}
                  value={formData.amount}
                  onChange={handleInputChange}
                  className={`w-full rounded border px-3 py-2 pr-24 text-sm focus:outline-none focus:ring-1 ${
                    errors.amount ? 'border-red-400 focus:ring-red-400 bg-red-50/30' : 'border-gray-200 focus:ring-brand-gold'
                  }`}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-xs font-bold text-brand-gold">
                  {currentCurrency.name} ({currentCurrency.symbol})
                </div>
              </div>
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
