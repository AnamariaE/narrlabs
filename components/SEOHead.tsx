import React from 'react';
import { useI18n } from '../lib/i18n-context';
import { useBrand } from '../lib/brand-context';
import { useLocation } from 'react-router';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  keywords?: string[];
  noindex?: boolean;
}

export function SEOHead({
  title,
  description,
  image,
  url,
  type = 'website',
  keywords = [],
  noindex = false,
}: SEOHeadProps) {
  const { language } = useI18n();
  const { mode } = useBrand();
  const location = useLocation();

  // Get page-specific title based on route and language
  const getPageTitle = () => {
    if (title) return title; // Use custom title if provided

    const path = location.pathname;
    
    if (mode === 'studio') {
      // Studio Mode titles - SEO optimized
      if (path === '/' || path === '/studio') {
        return language === 'es' 
          ? 'Narrlab - Diseño instruccional con identidad visual'
          : 'Narrlab - Instructional design with visual identity';
      }
      if (path === '/consulting') {
        return language === 'es'
          ? 'Consultoría de diseño instruccional - Narrlab'
          : 'Instructional design consulting - Narrlab';
      }
      if (path === '/why-narrlab') {
        return language === 'es'
          ? 'Por qué Narrlab - Diseño instruccional para ONGs'
          : 'Why Narrlab - Instructional design for NGOs';
      }
      if (path === '/portfolio') {
        return language === 'es'
          ? 'Portafolio - Cursos, branding y proyectos de impacto'
          : 'Portfolio - Courses, branding and impact projects';
      }
      // Default studio title
      return language === 'es'
        ? 'NarrLab Studio - Diseño de Experiencias Pedagógicas'
        : 'NarrLab Studio - Pedagogical Experience Design';
    } else {
      // Personal mode titles
      if (path === '/' || path === '/about') {
        return language === 'es'
          ? 'Anamaría Espinoza - Diseñadora Instruccional'
          : 'Anamaría Espinoza - Instructional Designer';
      }
      if (path === '/portfolio') {
        return language === 'es'
          ? 'Portafolio - Diseño instruccional y multimedia'
          : 'Portfolio - Instructional design and multimedia';
      }
      if (path === '/cv') {
        return language === 'es'
          ? 'CV - Anamaría Espinoza'
          : 'CV - Anamaría Espinoza';
      }
      // Default personal title
      return 'Anamaría Espinoza - Learning Experience Designer';
    }
  };

  // Default values based on brand mode
  const defaultTitle = getPageTitle();

  const defaultDescription = language === 'es'
    ? (mode === 'studio'
      ? 'Abstraemos lo esencial y lo volvemos experiencia pedagógica. Diseño instruccional, gamificación y experiencias de aprendizaje para comunidades educativas.'
      : 'Portfolio de diseño instruccional, multimedia y gamificación. Especializada en experiencias de aprendizaje, comunidades educativas y storytelling pedagógico.')
    : (mode === 'studio'
      ? 'Where pedagogy becomes design. Instructional design, gamification and learning experiences for educational communities.'
      : 'Instructional design, multimedia and gamification portfolio. Specialized in learning experiences, educational communities and pedagogical storytelling.');

  const defaultImage = 'https://narrlab.studio/img/LogoNarrlabs.png';
  const defaultUrl = 'https://narrlab.studio';

  const defaultKeywords = mode === 'studio'
    ? [
        'NarrLab',
        'diseño instruccional',
        'instructional design',
        'diseño instruccional ONG',
        'instructional designer freelance',
        'instructional design freelance',
        'diseñador instruccional freelance',
        'gamificación',
        'gamification',
        'learning experience design',
        'LXD',
        'experiencias de aprendizaje',
        'diseño pedagógico',
        'educational design',
        'e-learning',
        'cursos online',
        'online courses',
        'identidad visual cursos',
        'visual identity courses',
        'diseño instruccional España',
        'instructional design Spain',
        'comunidades de aprendizaje',
        'learning communities',
        'ONGs',
        'NGOs',
        'Zaragoza',
        'España',
      ]
    : [
        'Anamaría Espinoza',
        'diseñadora instruccional',
        'instructional designer',
        'learning experience designer',
        'portfolio diseño',
        'gamificación',
        'multimedia',
        'storytelling',
        'diseño educativo',
        'Wikimedia',
        'podcast',
        'Zaragoza',
      ];

  const finalTitle = defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalImage = image || defaultImage;
  const finalUrl = url || defaultUrl;
  const finalKeywords = [...defaultKeywords, ...keywords].join(', ');

  React.useEffect(() => {
    // Update document title
    document.title = finalTitle;

    // Update meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', finalDescription);
    updateMetaTag('keywords', finalKeywords);
    updateMetaTag('author', 'Anamaría Espinoza');
    updateMetaTag('language', language);
    
    // Robots
    if (noindex) {
      updateMetaTag('robots', 'noindex, nofollow');
    } else {
      updateMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    }

    // Open Graph (Facebook, LinkedIn, etc.)
    updateMetaTag('og:title', finalTitle, true);
    updateMetaTag('og:description', finalDescription, true);
    updateMetaTag('og:image', finalImage, true);
    updateMetaTag('og:url', finalUrl, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:locale', language === 'es' ? 'es_ES' : 'en_US', true);
    updateMetaTag('og:site_name', 'NarrLab Studio', true);

    // Twitter Card
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', finalTitle);
    updateMetaTag('twitter:description', finalDescription);
    updateMetaTag('twitter:image', finalImage);
    updateMetaTag('twitter:creator', '@anamariaespinoza');

    // Additional SEO
    updateMetaTag('theme-color', mode === 'studio' ? '#D95032' : '#5B44F2');
    updateMetaTag('apple-mobile-web-app-capable', 'yes');
    updateMetaTag('apple-mobile-web-app-status-bar-style', 'default');
    updateMetaTag('apple-mobile-web-app-title', mode === 'studio' ? 'NarrLab' : 'Anamaría');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', finalUrl);

    // Alternate language links
    let alternateLinkES = document.querySelector('link[hreflang="es"]') as HTMLLinkElement;
    if (!alternateLinkES) {
      alternateLinkES = document.createElement('link');
      alternateLinkES.setAttribute('rel', 'alternate');
      alternateLinkES.setAttribute('hreflang', 'es');
      document.head.appendChild(alternateLinkES);
    }
    alternateLinkES.setAttribute('href', `${finalUrl}?lang=es`);

    let alternateLinkEN = document.querySelector('link[hreflang="en"]') as HTMLLinkElement;
    if (!alternateLinkEN) {
      alternateLinkEN = document.createElement('link');
      alternateLinkEN.setAttribute('rel', 'alternate');
      alternateLinkEN.setAttribute('hreflang', 'en');
      document.head.appendChild(alternateLinkEN);
    }
    alternateLinkEN.setAttribute('href', `${finalUrl}?lang=en`);

    // JSON-LD Structured Data
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': mode === 'studio' ? 'Organization' : 'Person',
      'name': mode === 'studio' ? 'NarrLab Studio' : 'Anamaría Espinoza',
      'url': 'https://narrlab.studio',
      'logo': 'https://narrlab.studio/img/LogoNarrlabs.png',
      'description': finalDescription,
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Zaragoza',
        'addressCountry': 'ES',
      },
      'contactPoint': {
        '@type': 'ContactPoint',
        'email': 'aespinoza@narrlab.studio',
        'contactType': 'Customer Service',
      },
      'sameAs': [
        'https://linkedin.com/in/anamariaespinoza',
        'https://www.behance.net/anamariaespinoza',
        'https://commons.wikimedia.org/wiki/Category:User:Anamaria_Espinoza',
      ],
    };

    if (mode === 'person') {
      Object.assign(structuredData, {
        'jobTitle': 'Learning Experience & Community Education Lead',
        'alumniOf': 'University',
        'knowsLanguage': ['Spanish', 'English'],
      });
    }

    let script = document.querySelector('script[type="application/ld+json"]');
    if (!script) {
      script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);

  }, [finalTitle, finalDescription, finalImage, finalUrl, finalKeywords, language, mode, type, noindex]);

  // This component doesn't render anything
  return null;
}