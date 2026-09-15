import React from 'react';
import { useTranslation } from '../i18n/i18n';
import { Award, ShieldCheck, CheckCircle2, Globe2 } from 'lucide-react';

export interface DonationDocumentData {
  firstname: string;
  lastname: string;
  org: string;
  job: string;
  salary: string;
  email: string;
  phone: string;
  country: string;
  countryName: string;
  city: string;
  address: string;
  cause: string;
  causeLabel: string;
  amount: string;
  description: string;
  beneficiaries: string;
  dates: string;
  referenceNumber: string;
  submissionDate: string;
}

interface DonationPdfDocumentProps {
  data: DonationDocumentData;
  id?: string;
}

export const DonationPdfDocument: React.FC<DonationPdfDocumentProps> = ({
  data,
  id = 'donation-official-document',
}) => {
  const { t, language } = useTranslation();

  return (
    <div
      id={id}
      className="mx-auto w-full max-w-4xl bg-white text-[#1a202c] shadow-2xl rounded-xl border border-brand-gold/30 p-8 sm:p-12 font-sans relative overflow-hidden"
      style={{ minHeight: '1120px' }}
    >
      {/* Background Watermark */}
      <div 
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.03] select-none"
        aria-hidden="true"
      >
        <div className="text-center font-serif text-[120px] font-black tracking-widest text-[#0a192f] rotate-[-25deg]">
          HANCOCK
        </div>
      </div>

      {/* Official Document Border Accent */}
      <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-brand-blue via-brand-gold to-brand-blue" />

      {/* Header Section */}
      <div className="border-b-2 border-brand-gold/40 pb-6 mb-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-xl border-2 border-brand-gold bg-brand-blue p-2 shadow-md">
              <img
                src="/img/IMG-20260720-WA0024.jpg"
                alt="Fundación Prospección Hancock"
                className="h-full w-full object-cover rounded-lg"
              />
            </div>
            <div>
              <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-brand-gold bg-brand-blue px-2.5 py-0.5 rounded">
                {t('donation.dossier.official_header')}
              </span>
              <h1 className="text-xl sm:text-2xl font-serif font-black text-brand-blue mt-1">
                Fundación Prospección Hancock
              </h1>
              <p className="text-xs text-gray-500 font-medium">
                {t('donation.dossier.official_dept')}
              </p>
            </div>
          </div>

          <div className="text-right sm:border-l sm:border-gray-200 sm:pl-6">
            <div className="inline-flex items-center space-x-1.5 bg-emerald-50 text-emerald-800 border border-emerald-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-1">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>{t('donation.dossier.status_val')}</span>
            </div>
            <p className="text-xs text-gray-500">
              <span className="font-semibold text-gray-700">{t('donation.dossier.ref_label')}:</span>{' '}
              <span className="font-mono font-bold text-brand-blue">{data.referenceNumber}</span>
            </p>
            <p className="text-xs text-gray-500">
              <span className="font-semibold text-gray-700">{t('donation.dossier.date_label')}:</span>{' '}
              {data.submissionDate}
            </p>
          </div>
        </div>

        {/* Official Title Banner */}
        <div className="mt-6 bg-brand-light/90 border-l-4 border-brand-gold p-4 rounded-r-lg">
          <h2 className="text-base sm:text-lg font-serif font-bold uppercase tracking-wide text-brand-blue">
            {t('donation.dossier.official_title')}
          </h2>
          <p className="text-xs text-gray-600 mt-0.5">
            {t('donation.dossier.official_subtitle')}
          </p>
        </div>
      </div>

      {/* Grid Content: 2 Columns for Identity & Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Box 1: Identity */}
        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-brand-blue border-b border-gray-100 pb-2 mb-3">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-blue text-[10px] text-white font-bold">1</span>
            <span>{t('donation.dossier.applicant_title')}</span>
          </h3>
          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between border-b border-gray-50 pb-1.5">
              <span className="text-gray-500">{t('donation.fields.firstname')} & {t('donation.fields.lastname')}:</span>
              <span className="font-semibold text-gray-900 text-right">{data.firstname} {data.lastname}</span>
            </div>
            <div className="flex justify-between border-b border-gray-50 pb-1.5">
              <span className="text-gray-500">{t('donation.fields.org')}:</span>
              <span className="font-semibold text-gray-900 text-right">{data.org || '—'}</span>
            </div>
            <div className="flex justify-between border-b border-gray-50 pb-1.5">
              <span className="text-gray-500">{t('donation.fields.job')}:</span>
              <span className="font-semibold text-gray-900 text-right">{data.job}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">{t('donation.fields.salary')}:</span>
              <span className="font-semibold text-brand-blue text-right">{data.salary}</span>
            </div>
          </div>
        </div>

        {/* Box 2: Contact & Location */}
        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-brand-blue border-b border-gray-100 pb-2 mb-3">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-blue text-[10px] text-white font-bold">2</span>
            <span>{t('donation.dossier.contact_title')}</span>
          </h3>
          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between border-b border-gray-50 pb-1.5">
              <span className="text-gray-500">{t('donation.fields.email')}:</span>
              <span className="font-mono font-medium text-gray-900 text-right break-all">{data.email}</span>
            </div>
            <div className="flex justify-between border-b border-gray-50 pb-1.5">
              <span className="text-gray-500">{t('donation.fields.phone')}:</span>
              <span className="font-mono font-medium text-gray-900 text-right">{data.phone}</span>
            </div>
            <div className="flex justify-between border-b border-gray-50 pb-1.5">
              <span className="text-gray-500">{t('donation.fields.country')}:</span>
              <span className="font-semibold text-gray-900 text-right flex items-center space-x-1">
                <Globe2 className="h-3 w-3 text-brand-gold inline" />
                <span>{data.countryName}</span>
              </span>
            </div>
            <div className="flex justify-between border-b border-gray-50 pb-1.5">
              <span className="text-gray-500">{t('donation.fields.city')}:</span>
              <span className="font-medium text-gray-900 text-right">{data.city}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">{t('donation.fields.address')}:</span>
              <span className="font-medium text-gray-900 text-right max-w-[200px] truncate">{data.address}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Box 3: Project Specifications & Budget */}
      <div className="rounded-lg border border-brand-gold/40 bg-gradient-to-br from-white to-brand-light/30 p-5 shadow-sm mb-6">
        <h3 className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-brand-blue border-b border-brand-gold/20 pb-2 mb-4">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-gold text-[10px] text-brand-blue font-bold">3</span>
          <span>{t('donation.dossier.project_title')}</span>
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="rounded-md bg-white p-3 border border-gray-200">
            <span className="block text-[11px] font-semibold text-gray-500 uppercase">{t('donation.fields.cause')}</span>
            <span className="mt-1 block font-serif font-bold text-brand-blue text-sm">
              {data.causeLabel}
            </span>
          </div>

          <div className="rounded-md bg-white p-3 border border-brand-gold/40 shadow-inner">
            <span className="block text-[11px] font-semibold text-brand-gold uppercase">{t('donation.fields.amount')}</span>
            <span className="mt-1 block font-mono font-black text-brand-blue text-base">
              {data.amount}
            </span>
          </div>

          <div className="rounded-md bg-white p-3 border border-gray-200">
            <span className="block text-[11px] font-semibold text-gray-500 uppercase">{t('donation.fields.beneficiaries')}</span>
            <span className="mt-1 block font-semibold text-gray-800">
              {data.beneficiaries || '—'}
            </span>
          </div>

          <div className="rounded-md bg-white p-3 border border-gray-200">
            <span className="block text-[11px] font-semibold text-gray-500 uppercase">{t('donation.fields.dates')}</span>
            <span className="mt-1 block font-semibold text-gray-800">
              {data.dates || '—'}
            </span>
          </div>
        </div>
      </div>

      {/* Box 4: Project Description */}
      <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm mb-6">
        <h3 className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-brand-blue border-b border-gray-100 pb-2 mb-3">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-blue text-[10px] text-white font-bold">4</span>
          <span>{t('donation.dossier.description_title')}</span>
        </h3>
        <div className="rounded-md bg-gray-50/70 p-4 border border-gray-100">
          <p className="text-xs text-gray-800 whitespace-pre-wrap leading-relaxed font-sans">
            {data.description}
          </p>
        </div>
      </div>

      {/* Box 5: Legal Declarations & Sworn Statement */}
      <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm mb-8">
        <h3 className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-brand-blue border-b border-gray-100 pb-2 mb-3">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-blue text-[10px] text-white font-bold">5</span>
          <span>{t('donation.dossier.declaration_title')}</span>
        </h3>
        <p className="text-[11px] text-gray-600 leading-relaxed italic mb-3">
          "{t('donation.dossier.legal_text')}"
        </p>
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <div className="flex items-center space-x-2 text-[11px] text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-md border border-emerald-200">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
            <span>{t('donation.fields.privacy_consent')}</span>
          </div>
          <div className="flex items-center space-x-2 text-[11px] text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-md border border-emerald-200">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
            <span>{t('donation.fields.honor_cert')}</span>
          </div>
        </div>
      </div>

      {/* Dual Seal & Signatures Area */}
      <div className="border-t-2 border-gray-200 pt-6 mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-end">
          {/* Applicant Signature */}
          <div className="text-center sm:text-left">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
              {t('donation.dossier.applicant_signature')}
            </span>
            <div className="h-16 flex items-center justify-center sm:justify-start border-b border-dashed border-gray-300">
              <span className="font-serif italic text-lg text-brand-blue tracking-wide">
                {data.firstname} {data.lastname}
              </span>
            </div>
            <p className="text-[10px] text-gray-400 mt-1 font-mono">
              Certifié conforme • ID: {data.referenceNumber} • Lang: {language.toUpperCase()}
            </p>
          </div>

          {/* Foundation Official Stamp & Visa */}
          <div className="flex flex-col items-center sm:items-end text-center sm:text-right">
            <div className="relative inline-flex flex-col items-center justify-center border-2 border-brand-gold/60 rounded-xl p-3 bg-brand-light/40 shadow-sm min-w-[220px]">
              <div className="flex items-center space-x-1.5 text-brand-gold mb-1">
                <Award className="h-5 w-5 fill-current" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-brand-blue">
                  {t('donation.dossier.digital_seal')}
                </span>
              </div>
              <span className="text-[9px] text-gray-500 font-semibold uppercase">
                {t('donation.dossier.foundation_seal')}
              </span>
              <span className="text-[8px] font-mono text-gray-400 mt-0.5">
                SEC-ID: HANCOCK-PROSPECTING-{data.referenceNumber}
              </span>
            </div>
            <span className="text-[10px] text-gray-400 mt-2">
              {t('donation.dossier.official_visa')}
            </span>
          </div>
        </div>
      </div>

      {/* Footer Legal notice */}
      <div className="mt-8 pt-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center text-[10px] text-gray-400">
        <span>© {new Date().getFullYear()} Fundación Prospección Hancock. Todos los derechos reservados.</span>
        <span className="font-mono">Página 1 / 1 • Certificado Digital Oficial</span>
      </div>
    </div>
  );
};
