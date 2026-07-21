import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from '../i18n/i18n';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Project interface matching the specifications
interface Project {
  id: number;
  title: string;
  cause: 'education' | 'health' | 'environment' | 'culture' | 'emergency';
  country: string;
  city: string;
  lat: number;
  lng: number;
  amount: string;
  year: number;
  status: 'active' | 'completed';
  description: Record<string, string>; // Localized descriptions
}

export const ProjectMap: React.FC = () => {
  const { t, language } = useTranslation();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  // Filter states
  const [selectedCause, setSelectedCause] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');

  // Localized projects list
  const projectsData: Project[] = [
    {
      id: 1,
      title: 'Escuela Rural del Mañana',
      cause: 'education',
      country: 'Chile',
      city: 'Temuco',
      lat: -38.7396,
      lng: -72.5901,
      amount: '45 000 EUR',
      year: 2024,
      status: 'completed',
      description: {
        es: 'Construcción y equipamiento de una escuela rural con paneles solares y conexión a internet satelital.',
        en: 'Construction and equipping of a rural school with solar panels and satellite internet connection.',
        fr: 'Construction et équipement d’une école rurale avec panneaux solaires et connexion internet par satellite.',
        zh: '在智利特木科建设并装备一所配备太阳能电池板和卫星互联网的农村学校。',
        de: 'Bau und Ausstattung einer Landschule mit Sonnenkollektoren und Satelliten-Internetverbindung.'
      }
    },
    {
      id: 2,
      title: 'Clínica Móvil Andina',
      cause: 'health',
      country: 'Perú',
      city: 'Cusco',
      lat: -13.5320,
      lng: -71.9675,
      amount: '60 000 USD',
      year: 2025,
      status: 'active',
      description: {
        es: 'Unidad médica móvil equipada para brindar atención primaria de salud y vacunas a comunidades andinas remotas.',
        en: 'Mobile medical unit equipped to provide primary health care and vaccinations to remote Andean communities.',
        fr: 'Unité médicale mobile équipée pour fournir des soins de santé primaires et des vaccins aux communautés andines isolées.',
        zh: '配备移动医疗车，为安第斯偏远社区提供基础医疗护理和疫苗接种服务。',
        de: 'Mobile medizinische Einheit zur Bereitstellung medizinischer Grundversorgung und Impfungen in abgelegenen Andengemeinden.'
      }
    },
    {
      id: 3,
      title: 'Reforestación Biodiversa Iberia',
      cause: 'environment',
      country: 'España',
      city: 'Zamora',
      lat: 41.5063,
      lng: -5.7446,
      amount: '30 000 EUR',
      year: 2025,
      status: 'active',
      description: {
        es: 'Restauración ecológica de bosques quemados plantando más de 15,000 especies autóctonas.',
        en: 'Ecological restoration of burned forests by planting over 15,000 native tree species.',
        fr: 'Restauration écologique de forêts brûlées en plantant plus de 15 000 espèces d’arbres indigènes.',
        zh: '通过种植超过15000棵本土树种，对受灾森林进行生态恢复。',
        de: 'Ökologische Wiederherstellung verbrannter Wälder durch Pflanzung von über 15.000 einheimischen Baumarten.'
      }
    },
    {
      id: 4,
      title: 'Centro Cultural y Deportivo Chaco',
      cause: 'culture',
      country: 'Argentina',
      city: 'Resistencia',
      lat: -27.4514,
      lng: -58.9866,
      amount: '25 000 USD',
      year: 2023,
      status: 'completed',
      description: {
        es: 'Fomento de la inclusión social de jóvenes a través de talleres artísticos y actividades deportivas gratuitas.',
        en: 'Fostering social inclusion for youths through free art workshops and sports activities.',
        fr: 'Promotion de l’inclusion sociale des jeunes via des ateliers artistiques et des activités sportives gratuites.',
        zh: '通过免费艺术研讨会和体育活动，促进当地青少年的社会融入。',
        de: 'Förderung der sozialen Inklusion von Jugendlichen durch kostenlose Kunstworkshops und Sportaktivitäten.'
      }
    },
    {
      id: 5,
      title: 'Agua Limpia Guajira',
      cause: 'environment',
      country: 'Colombia',
      city: 'Uribia',
      lat: 11.7142,
      lng: -72.2647,
      amount: '50 000 EUR',
      year: 2025,
      status: 'active',
      description: {
        es: 'Instalación de desalinizadoras de agua solares para proporcionar agua potable a comunidades Wayúu.',
        en: 'Installation of solar water desalination systems to provide clean drinking water to Wayuu communities.',
        fr: 'Installation de systèmes solaires de dessalement de l’eau pour approvisionner en eau potable les communautés Wayúu.',
        zh: '安装太阳能水脱盐系统，向瓦尤族社区提供清洁饮用水。',
        de: 'Installation von solaren Meerwasserentsalzungsanlagen zur Versorgung von Wayuu-Gemeinden mit Trinkwasser.'
      }
    },
    {
      id: 6,
      title: 'Ayuda Emergencia Altiplano',
      cause: 'emergency',
      country: 'Bolivia',
      city: 'Oruro',
      lat: -17.9647,
      lng: -67.1103,
      amount: '40 000 EUR',
      year: 2024,
      status: 'completed',
      description: {
        es: 'Distribución de kits de refugio temporal, alimentos y mantas tras las heladas extremas del invierno.',
        en: 'Distribution of emergency shelter kits, food, and blankets following severe winter frost.',
        fr: 'Distribution de kits d’abri d’urgence, de nourriture et de couvertures suite aux gelées hivernales extrêmes.',
        zh: '在遭遇极寒冬季霜冻后，分发紧急临时避难所、粮食和毛毯。',
        de: 'Verteilung von Notunterkünften, Lebensmitteln und Decken nach extremem Winterfrost.'
      }
    }
  ];

  // Unique lists for filtering dropdowns
  const uniqueCountries = Array.from(new Set(projectsData.map((p) => p.country)));

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Create Leaflet map instance
    const map = L.map(mapContainerRef.current, {
      center: [5, -45], // Centered between Europe and South America
      zoom: 3,
      minZoom: 2,
      maxZoom: 10,
      scrollWheelZoom: false, // Prevent zoom on scrolling past map
    });

    mapInstanceRef.current = map;

    // Add high contrast elegant tile layer (CartoDB Positron is very clean and matches our off-white look)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
    }).addTo(map);

    // Initial marker rendering
    renderMarkers(projectsData);

    return () => {
      // Clean up map instance on unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Filter projects when criteria changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Filter projects array
    const filteredProjects = projectsData.filter((p) => {
      const matchCause = selectedCause === '' || p.cause === selectedCause;
      const matchCountry = selectedCountry === '' || p.country === selectedCountry;
      const matchStatus = selectedStatus === '' || p.status === selectedStatus;
      return matchCause && matchCountry && matchStatus;
    });

    // Clear old markers and add new ones
    clearMarkers();
    renderMarkers(filteredProjects);
  }, [selectedCause, selectedCountry, selectedStatus, language]);

  const clearMarkers = () => {
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];
  };

  const renderMarkers = (projects: Project[]) => {
    const map = mapInstanceRef.current;
    if (!map) return;

    projects.forEach((proj) => {
      // Define Cause Icon Color
      const colorMap = {
        education: '#B8860B', // Gold
        health: '#EF4444',    // Red
        environment: '#10B981', // Emerald Green
        culture: '#0B2545',   // Brand Blue
        emergency: '#F59E0B'  // Amber
      };
      
      const pinColor = colorMap[proj.cause] || '#B8860B';

      // Custom HTML Marker using L.divIcon (gorgeous CSS marker with pulse ring)
      const pulseHtml = `
        <div class="relative flex items-center justify-center h-5 w-5">
          <span class="absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping" style="background-color: ${pinColor}"></span>
          <span class="relative inline-flex rounded-full h-3.5 w-3.5 border-2 border-white shadow" style="background-color: ${pinColor}"></span>
        </div>
      `;

      const customIcon = L.divIcon({
        html: pulseHtml,
        className: 'custom-leaflet-marker',
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });

      // Localized popup markup
      const statusLabel = proj.status === 'active' ? t('projects.status_active') : t('projects.status_completed');
      const statusColor = proj.status === 'active' ? 'text-blue-600 bg-blue-50' : 'text-green-600 bg-green-50';
      const descText = proj.description[language] || proj.description['en'];

      const popupHtml = `
        <div class="p-3 max-w-[240px] font-sans text-brand-dark">
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-[9px] font-bold uppercase tracking-wider text-brand-gold">${t(`causes.items.${proj.cause}.title`)}</span>
            <span class="text-[9px] px-1.5 py-0.5 rounded font-semibold uppercase ${statusColor}">${statusLabel}</span>
          </div>
          <h4 class="font-serif text-sm font-bold text-brand-blue mb-1 leading-snug">${proj.title}</h4>
          <p class="text-[10px] text-brand-gray/65 mb-2 leading-relaxed">${proj.city}, ${proj.country} (${proj.year})</p>
          <p class="text-[11px] text-brand-dark/90 leading-relaxed mb-2.5 border-t border-gray-100 pt-1.5">${descText}</p>
          <div class="flex items-center justify-between text-[10px] font-bold border-t border-gray-100 pt-2 text-brand-blue">
            <span>Financiación:</span>
            <span class="text-brand-gold">${proj.amount}</span>
          </div>
        </div>
      `;

      const marker = L.marker([proj.lat, proj.lng], { icon: customIcon })
        .bindPopup(popupHtml, { maxWidth: 280, closeButton: false })
        .addTo(map);

      markersRef.current.push(marker);
    });

    // Auto-fit bounds if we have projects, otherwise keep default zoom/center
    if (projects.length > 0 && map) {
      const group = L.featureGroup(markersRef.current);
      // Only fit bounds if we have multiple or distant projects
      if (projects.length > 1) {
        map.fitBounds(group.getBounds().pad(0.15));
      } else {
        map.setView([projects[0].lat, projects[0].lng], 5);
      }
    }
  };

  return (
    <div className="flex flex-col space-y-4 w-full">
      {/* Map Control Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white p-4 rounded-xl border border-brand-gold/15 shadow-sm text-sm">
        {/* Filter Cause */}
        <div>
          <label htmlFor="map-cause" className="block text-xs font-semibold text-brand-gray uppercase mb-1">
            {t('nav.causes')}
          </label>
          <select
            id="map-cause"
            value={selectedCause}
            onChange={(e) => setSelectedCause(e.target.value)}
            className="w-full rounded border border-gray-200 px-3 py-1.5 bg-brand-light/50 focus:outline-none focus:ring-1 focus:ring-brand-gold"
          >
            <option value="">{t('projects.filter_cause')}</option>
            <option value="education">{t('causes.items.education.title')}</option>
            <option value="health">{t('causes.items.health.title')}</option>
            <option value="environment">{t('causes.items.environment.title')}</option>
            <option value="culture">{t('causes.items.culture.title')}</option>
            <option value="emergency">{t('causes.items.emergency.title')}</option>
          </select>
        </div>

        {/* Filter Country */}
        <div>
          <label htmlFor="map-country" className="block text-xs font-semibold text-brand-gray uppercase mb-1">
            {t('donation.fields.country')}
          </label>
          <select
            id="map-country"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="w-full rounded border border-gray-200 px-3 py-1.5 bg-brand-light/50 focus:outline-none focus:ring-1 focus:ring-brand-gold"
          >
            <option value="">{t('projects.filter_country')}</option>
            {uniqueCountries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Filter Status */}
        <div>
          <label htmlFor="map-status" className="block text-xs font-semibold text-brand-gray uppercase mb-1">
            {t('projects.filter_status')}
          </label>
          <select
            id="map-status"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full rounded border border-gray-200 px-3 py-1.5 bg-brand-light/50 focus:outline-none focus:ring-1 focus:ring-brand-gold"
          >
            <option value="">{t('projects.filter_status')}</option>
            <option value="active">{t('projects.status_active')}</option>
            <option value="completed">{t('projects.status_completed')}</option>
          </select>
        </div>
      </div>

      {/* Map DOM Target */}
      <div className="relative h-[480px] w-full rounded-xl overflow-hidden border border-brand-gold/20 shadow-md">
        <div ref={mapContainerRef} className="h-full w-full bg-brand-light/40" />
      </div>
    </div>
  );
};
