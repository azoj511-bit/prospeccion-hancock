import React from 'react';
import { useTranslation } from '../i18n/i18n';

interface LegalProps {
  pageType: 'privacy' | 'terms' | 'cookies' | 'mentions-legales';
}

export const Legal: React.FC<LegalProps> = ({ pageType }) => {
  const { t, language } = useTranslation();

  const renderContent = () => {
    switch (pageType) {
      case 'terms':
        return renderTerms();
      case 'cookies':
        return renderCookies();
      case 'mentions-legales':
        return renderMentionsLegales();
      case 'privacy':
      default:
        return renderPrivacy();
    }
  };

  const renderTerms = () => {
    switch (language) {
      case 'en':
        return (
          <>
            <h2 className="font-serif text-xl font-bold text-brand-blue mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">By accessing and using this website, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use this site.</p>
            <h2 className="font-serif text-xl font-bold text-brand-blue mb-4">2. Intellectual Property</h2>
            <p className="mb-4">All content, brand design, logos, texts, and photos are the property of the Fundación Prospección Hancock or its content creators and are protected by international copyright laws.</p>
            <h2 className="font-serif text-xl font-bold text-brand-blue mb-4">3. Use of Website</h2>
            <p className="mb-4">You agree to use the site only for lawful purposes, especially regarding donation requests, and not to submit false information or engage in spamming actions.</p>
          </>
        );
      case 'fr':
        return (
          <>
            <h2 className="font-serif text-xl font-bold text-brand-blue mb-4">1. Acceptation des conditions</h2>
            <p className="mb-4">En accédant à ce site web et en l'utilisant, vous acceptez de vous conformer aux présentes conditions d'utilisation. Si vous ne les acceptez pas, veuillez ne pas utiliser ce site.</p>
            <h2 className="font-serif text-xl font-bold text-brand-blue mb-4">2. Propriété intellectuelle</h2>
            <p className="mb-4">Tous les contenus, chartes graphiques, logos, textes et photos sont la propriété de la Fundación Prospección Hancock ou de ses concédants de licence et sont protégés par les lois internationales sur le droit d'auteur.</p>
            <h2 className="font-serif text-xl font-bold text-brand-blue mb-4">3. Utilisation du site</h2>
            <p className="mb-4">Vous acceptez d'utiliser le site uniquement à des fins licites, notamment pour le dépôt de demandes de dons, et de ne pas transmettre d'informations erronées ou frauduleuses.</p>
          </>
        );
      case 'zh':
        return (
          <>
            <h2 className="font-serif text-xl font-bold text-brand-blue mb-4">1. 服务条款接受</h2>
            <p className="mb-4">通过访问和使用本网站，您同意遵守并受本服务条款的约束。如果您不同意这些条款，请勿使用本网站。</p>
            <h2 className="font-serif text-xl font-bold text-brand-blue mb-4">2. 知识产权声明</h2>
            <p className="mb-4">本网站上的所有内容、品牌设计、标识、文本和照片均为汉考克勘探基金会或其内容创作者的财产，受国际版权法保护。</p>
            <h2 className="font-serif text-xl font-bold text-brand-blue mb-4">3. 网站使用规范</h2>
            <p className="mb-4">您同意仅出于合法目的使用本网站，特别是针对资助申请，不得提交虚假信息或进行恶意发送行为。</p>
          </>
        );
      case 'de':
        return (
          <>
            <h2 className="font-serif text-xl font-bold text-brand-blue mb-4">1. Anerkennung der Bedingungen</h2>
            <p className="mb-4">Durch den Zugriff auf diese Website erklären Sie sich mit diesen Nutzungsbedingungen einverstanden. Wenn Sie diesen Bedingungen nicht zustimmen, nutzen Sie diese Website bitte nicht.</p>
            <h2 className="font-serif text-xl font-bold text-brand-blue mb-4">2. Geistiges Eigentum</h2>
            <p className="mb-4">Alle Inhalte, Logos, Texte und Fotos sind Eigentum der Fundación Prospección Hancock oder ihrer Lizenzgeber und sind durch internationale Urheberrechtsgesetze geschützt.</p>
            <h2 className="font-serif text-xl font-bold text-brand-blue mb-4">3. Nutzung der Website</h2>
            <p className="mb-4">Sie erklären sich damit einverstanden, die Website nur für rechtmäßige Zwecke, insbesondere für Spendenanfragen, zu nutzen und keine falschen Angaben zu machen oder Spam-Aktionen durchzuführen.</p>
          </>
        );
      case 'es':
      default:
        return (
          <>
            <h2 className="font-serif text-xl font-bold text-brand-blue mb-4">1. Aceptación de las condiciones</h2>
            <p className="mb-4">Al acceder y utilizar este sitio web, usted acepta cumplir y estar sujeto a estos Términos de servicio. Si no está de acuerdo con estos términos, no utilice este sitio.</p>
            <h2 className="font-serif text-xl font-bold text-brand-blue mb-4">2. Propiedad Intelectual</h2>
            <p className="mb-4">Todos los contenidos, diseños de marca, logotipos, textos e imágenes son propiedad de la Fundación Prospección Hancock y están protegidos por las leyes internacionales de derechos de autor.</p>
            <h2 className="font-serif text-xl font-bold text-brand-blue mb-4">3. Uso del Sitio Web</h2>
            <p className="mb-4">Usted acepta utilizar el sitio únicamente para fines lícitos, especialmente en lo que respecta a las solicitudes de donación, comprometiéndose a no enviar información falsa ni spam.</p>
          </>
        );
    }
  };

  const renderPrivacy = () => {
    switch (language) {
      case 'en':
        return (
          <>
            <h2 className="font-serif text-xl font-bold text-brand-blue mb-4">1. Data Collection</h2>
            <p className="mb-4">We do not store any personal data collected through the donation request form on our servers. The data is entirely compiled on the client side and transmitted via WhatsApp secure channel directly initiated by the user.</p>
            <h2 className="font-serif text-xl font-bold text-brand-blue mb-4">2. Purpose of Processing</h2>
            <p className="mb-4">Any data transmitted is processed solely for evaluating philanthropic donation eligibility and partnerships. We will never share or sell your contact coordinates to third parties.</p>
            <h2 className="font-serif text-xl font-bold text-brand-blue mb-4">3. User Rights</h2>
            <p className="mb-4">Under GDPR regulations, you have the right to access, rectify, or request the erasure of any personal communications sent to our official contact lines.</p>
          </>
        );
      case 'fr':
        return (
          <>
            <h2 className="font-serif text-xl font-bold text-brand-blue mb-4">1. Collecte des données</h2>
            <p className="mb-4">Nous ne stockons aucune donnée personnelle issue du formulaire de don sur nos serveurs. L'intégralité des informations est compilée côté client puis transmise via le canal sécurisé WhatsApp initié par l'utilisateur.</p>
            <h2 className="font-serif text-xl font-bold text-brand-blue mb-4">2. Finalité du traitement</h2>
            <p className="mb-4">Les données transmises sont uniquement traitées pour évaluer l'éligibilité aux dons philanthropiques et partenariats. Nous ne vendons ni ne partageons vos coordonnées avec des tiers.</p>
            <h2 className="font-serif text-xl font-bold text-brand-blue mb-4">3. Vos Droits</h2>
            <p className="mb-4">Conformément au RGPD, vous disposez d'un droit d'accès, de rectification ou de suppression des informations transmises à nos canaux de contact officiels.</p>
          </>
        );
      case 'zh':
        return (
          <>
            <h2 className="font-serif text-xl font-bold text-brand-blue mb-4">1. 数据收集说明</h2>
            <p className="mb-4">我们不在服务器上存储通过资助申请表收集的任何个人数据。数据完全在客户端生成，并通过由用户直接发起的 WhatsApp 安全通道进行传输。</p>
            <h2 className="font-serif text-xl font-bold text-brand-blue mb-4">2. 数据处理目的</h2>
            <p className="mb-4">传输的所有数据仅用于评估慈善捐赠资格和建立合作伙伴关系。我们绝不会向第三方共享或出售您的联系方式。</p>
            <h2 className="font-serif text-xl font-bold text-brand-blue mb-4">3. 用户相关权利</h2>
            <p className="mb-4">根据《通用数据保护条例》(GDPR)，您有权访问、更正或要求删除发送至我们官方联系方式的任何个人通讯信息。</p>
          </>
        );
      case 'de':
        return (
          <>
            <h2 className="font-serif text-xl font-bold text-brand-blue mb-4">1. Datenerfassung</h2>
            <p className="mb-4">Wir speichern keine personenbezogenen Daten, die über das Spendenanfrageformular erfasst werden, auf unseren Servern. Die Daten werden vollständig clientseitig zusammengestellt und über den vom Benutzer direkt initiierten sicheren WhatsApp-Kanal übertragen.</p>
            <h2 className="font-serif text-xl font-bold text-brand-blue mb-4">2. Zweck der Verarbeitung</h2>
            <p className="mb-4">Alle übertragenen Daten werden ausschließlich zur Bewertung der Berechtigung für philanthropische Spenden und Partnerschaften verarbeitet. Wir werden Ihre Kontaktdaten niemals an Dritte weitergeben oder verkaufen.</p>
            <h2 className="font-serif text-xl font-bold text-brand-blue mb-4">3. Ihre Rechte</h2>
            <p className="mb-4">Gemäß der DSGVO haben Sie das Recht, Auskunft über Ihre an uns übermittelten Daten zu erhalten, diese zu korrigieren oder deren Löschung zu verlangen.</p>
          </>
        );
      case 'es':
      default:
        return (
          <>
            <h2 className="font-serif text-xl font-bold text-brand-blue mb-4">1. Recopilación de Datos</h2>
            <p className="mb-4">No almacenamos ningún dato personal recopilado a través del formulario de solicitud de donación en nuestros servidores. La información es compilada en el cliente y transmitida a través del canal oficial cifrado de WhatsApp iniciado voluntariamente por el usuario.</p>
            <h2 className="font-serif text-xl font-bold text-brand-blue mb-4">2. Finalidad del Tratamiento</h2>
            <p className="mb-4">Los datos transmitidos son tratados únicamente para evaluar la elegibilidad de proyectos y patrocinios comunitarios. Nunca venderemos ni compartiremos sus coordenadas de contacto con terceros.</p>
            <h2 className="font-serif text-xl font-bold text-brand-blue mb-4">3. Derechos del Usuario</h2>
            <p className="mb-4">De acuerdo con el RGPD y la normativa LOPDGDD, usted tiene derecho a acceder, rectificar o solicitar la supresión de cualquier comunicación enviada a la fundación.</p>
          </>
        );
    }
  };

  const renderCookies = () => {
    switch (language) {
      case 'en':
        return (
          <>
            <h2 className="font-serif text-xl font-bold text-brand-blue mb-4">1. What are Cookies?</h2>
            <p className="mb-4">Cookies are small text files stored on your browser to optimize the site performance and analyze anonymous traffic (via Google Analytics / Plausible).</p>
            <h2 className="font-serif text-xl font-bold text-brand-blue mb-4">2. Types of Cookies Used</h2>
            <p className="mb-4">We use strictly necessary cookies to save your active language preferences and cookie banner choice. We also use third-party analysis cookies if you explicitly consent.</p>
            <h2 className="font-serif text-xl font-bold text-brand-blue mb-4">3. How to Disable</h2>
            <p className="mb-4">You can withdraw your consent at any time or refuse non-essential cookies using our cookie settings banner or directly in your browser preferences.</p>
          </>
        );
      case 'fr':
        return (
          <>
            <h2 className="font-serif text-xl font-bold text-brand-blue mb-4">1. Qu'est-ce qu'un cookie ?</h2>
            <p className="mb-4">Les cookies sont des petits fichiers texte stockés dans votre navigateur pour optimiser les performances du site et analyser les statistiques de visite anonymisées.</p>
            <h2 className="font-serif text-xl font-bold text-brand-blue mb-4">2. Cookies utilisés</h2>
            <p className="mb-4">Nous utilisons des cookies techniques nécessaires pour retenir vos préférences de langue et le consentement aux cookies. Des cookies d'analyses statistiques de visite (GA4) sont activés uniquement après accord exprès.</p>
            <h2 className="font-serif text-xl font-bold text-brand-blue mb-4">3. Gestion des cookies</h2>
            <p className="mb-4">Vous pouvez révoquer votre accord ou modifier vos choix à tout moment depuis la bannière de cookies ou en configurant votre navigateur internet.</p>
          </>
        );
      case 'zh':
        return (
          <>
            <h2 className="font-serif text-xl font-bold text-brand-blue mb-4">1. 什么是 Cookie？</h2>
            <p className="mb-4">Cookie 是保存在您浏览器中的小型文本文件，用于优化网站性能并分析匿名流量（通过 Google Analytics 等工具）。</p>
            <h2 className="font-serif text-xl font-bold text-brand-blue mb-4">2. 网站使用的 Cookie 类型</h2>
            <p className="mb-4">我们使用必要的网络技术 Cookie 来保存您的语言偏好和 Cookie 条幅选择。只有在您明确同意的情况下，我们才会使用第三方分析 Cookie。</p>
            <h2 className="font-serif text-xl font-bold text-brand-blue mb-4">3. 如何禁用 Cookie</h2>
            <p className="mb-4">您可以通过我们的 Cookie 设置条幅随时撤回您的同意或拒绝非必要的 Cookie，也可以直接在浏览器首选项中进行配置。</p>
          </>
        );
      case 'de':
        return (
          <>
            <h2 className="font-serif text-xl font-bold text-brand-blue mb-4">1. Was sind Cookies?</h2>
            <p className="mb-4">Cookies sind kleine Textdateien, die in Ihrem Browser gespeichert werden, um die Leistung der Website zu optimieren und anonymen Datenverkehr zu analysieren.</p>
            <h2 className="font-serif text-xl font-bold text-brand-blue mb-4">2. Verwendete Cookie-Typen</h2>
            <p className="mb-4">Wir verwenden unbedingt erforderliche Cookies, um Ihre aktive Sprachpräferenz und Ihre Auswahl im Cookie-Banner zu speichern. Wir verwenden Analyse-Cookies von Drittanbietern nur, wenn Sie dem ausdrücklich zustimmen.</p>
            <h2 className="font-serif text-xl font-bold text-brand-blue mb-4">3. Wie man Cookies deaktiviert</h2>
            <p className="mb-4">Sie können Ihre Einwilligung jederzeit widerrufen oder nicht essenzielle Cookies ablehnen, indem Sie unser Cookie-Banner verwenden oder dies direkt in Ihren Browsereinstellungen konfigurieren.</p>
          </>
        );
      case 'es':
      default:
        return (
          <>
            <h2 className="font-serif text-xl font-bold text-brand-blue mb-4">1. ¿Qué son las Cookies?</h2>
            <p className="mb-4">Las cookies son pequeños archivos de texto que se guardan en su navegador para optimizar el rendimiento técnico y analizar de forma anónima el tráfico estadístico del sitio web.</p>
            <h2 className="font-serif text-xl font-bold text-brand-blue mb-4">2. Tipos de Cookies que utilizamos</h2>
            <p className="mb-4">Utilizamos cookies técnicas necesarias para recordar su idioma y su decisión sobre el consentimiento. Las cookies estadísticas de análisis (GA4) solo se cargan bajo su consentimiento expreso.</p>
            <h2 className="font-serif text-xl font-bold text-brand-blue mb-4">3. Cómo Deshabilitar o Revocar</h2>
            <p className="mb-4">Puede revocar su consentimiento en cualquier momento o rechazar las cookies no esenciales a través de nuestro panel flotante de cookies o en la configuración de su navegador.</p>
          </>
        );
    }
  };

  const renderMentionsLegales = () => {
    return (
      <>
        <h2 className="font-serif text-xl font-bold text-brand-blue mb-4">Éditeur du site</h2>
        <p className="mb-2">Hancock Prospecting PTY LTD</p>
        <p className="mb-2">Forme juridique : Proprietary Limited Company (Australie)</p>
        <p className="mb-2">ACN / ABN : <strong>008676417 / 69008676417</strong></p>
        <p className="mb-2">Siège social : <strong>Western Australia (WA 6005)</strong></p>
        <p className="mb-2">Téléphone : <strong>+61 480 801 641</strong> — E-mail : <strong>prospectinghancock0@gmail.com</strong></p>
        <p className="mb-4">Directeur de la publication : <strong>Gina Rinehart, Directrice Generale executive chairman</strong></p>
        
        <h2 className="font-serif text-xl font-bold text-brand-blue mb-4">Hébergement</h2>
        <p className="mb-4"><strong>Vercel</strong></p>

        <h2 className="font-serif text-xl font-bold text-brand-blue mb-4">Propriété intellectuelle</h2>
        <p className="mb-4">L'ensemble des éléments du site (textes, photographies, logos, marques, éléments graphiques, structure, code) est protégé par le droit de la propriété intellectuelle et demeure la propriété exclusive de Hancock Prospecting PTY LTD ou de ses ayants droit. Toute reproduction, représentation, adaptation ou exploitation, totale ou partielle, sans autorisation écrite préalable est interdite.</p>
      </>
    );
  };

  const getTitle = () => {
    switch (pageType) {
      case 'terms':
        return t('footer.terms');
      case 'cookies':
        return t('footer.cookies');
      case 'mentions-legales':
        return 'Mentions légales';
      case 'privacy':
      default:
        return t('footer.privacy');
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 font-sans text-brand-dark leading-relaxed">
      <div className="text-center mb-10">
        <h1 className="font-serif text-3xl font-bold tracking-tight text-brand-blue sm:text-4xl">
          {getTitle()}
        </h1>
        <p className="mt-2 text-xs text-brand-gray/60 uppercase tracking-widest font-semibold">
          Legal Compliance • GDPR / LOPDGDD
        </p>
      </div>

      <div className="rounded-2xl border border-brand-gold/15 bg-white p-6 sm:p-10 shadow-xl text-justify font-light text-sm sm:text-base space-y-6">
        {renderContent()}
      </div>
    </div>
  );
};
