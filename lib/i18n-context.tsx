import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';

type Language = 'es' | 'en';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const translations = {
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.portfolio': 'Portafolio',
    'nav.cv': 'CV',
    'nav.about': 'Acerca',
    'nav.contact': 'Contacto',
    'nav.studio': 'Estudio',
    'nav.personal': 'Personal',
    'nav.podcast': 'Podcast',
    'nav.consulting': 'Consultorías',
    
    // Hero
    'hero.claim': 'Diseño experiencias de aprendizaje escalables para comunidades globales.',
    'hero.cta': 'Ver proyectos',
    'hero.contact': 'Contactar',
    
    // Portfolio
    'portfolio.featured': 'Proyectos destacados',
    'portfolio.all': 'Todos los proyectos',
    'portfolio.filter': 'Filtrar por categoría',
    'portfolio.search': 'Buscar proyectos...',
    'portfolio.reset': 'Limpiar filtros',
    'portfolio.view': 'Ver proyecto',
    'portfolio.external': 'Enlace externo',
    
    // CV
    'cv.title': 'Currículum Vitae',
    'cv.download': 'Descargar PDF',
    'cv.print': 'Imprimir',
    'cv.profile': 'Perfil',
    'cv.skills': 'Competencias',
    'cv.tools': 'Herramientas',
    'cv.experience': 'Experiencia',
    'cv.education': 'Educación',
    'cv.certifications': 'Certificaciones',
    'cv.languages': 'Idiomas',
    'cv.keywords': 'Palabras clave',
    
    // Studio
    'studio.claim': 'Abstraemos lo esencial y lo volvemos experiencia pedagógica.',
    'studio.services': 'Servicios',
    'studio.clients': 'Clientes destacados',
    'studio.cta': 'Iniciar conversación',
    'studio.contact': 'Hablemos de tu proyecto',
    
    // About
    'about.title': 'Acerca de mí',
    'about.bio': 'Diseñadora instruccional y multimedia con más de 10 años de experiencia creando experiencias de aprendizaje para comunidades globales. Mi enfoque combina pedagogía, diseño y tecnología para crear cursos escalables, accesibles y medibles.',
    
    // Contact
    'contact.title': 'Contáctanos',
    'contact.name': 'Nombre',
    'contact.email': 'Email',
    'contact.message': 'Mensaje',
    'contact.send': 'Enviar',
    'contact.sending': 'Enviando...',
    'contact.success': 'Mensaje enviado correctamente',
    'contact.error': 'Error al enviar. Inténtalo de nuevo.',
    
    // Footer
    'footer.rights': 'Todos los derechos reservados',
    'footer.social': 'Redes sociales',
    'footer.cookieSettings': 'Preferencias de cookies',
    
    // Common
    'common.year': 'Año',
    'common.category': 'Categoría',
    'common.all': 'Todos',
    'common.loading': 'Cargando...',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.portfolio': 'Portfolio',
    'nav.cv': 'CV',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.studio': 'Studio',
    'nav.personal': 'Personal',
    'nav.podcast': 'Podcast',
    'nav.consulting': 'Consulting',
    
    // Hero
    'hero.claim': 'I design scalable learning experiences for global communities.',
    'hero.cta': 'View projects',
    'hero.contact': 'Contact',
    
    // Portfolio
    'portfolio.featured': 'Featured projects',
    'portfolio.all': 'All projects',
    'portfolio.filter': 'Filter by category',
    'portfolio.search': 'Search projects...',
    'portfolio.reset': 'Clear filters',
    'portfolio.view': 'View project',
    'portfolio.external': 'External link',
    
    // CV
    'cv.title': 'Curriculum Vitae',
    'cv.download': 'Download PDF',
    'cv.print': 'Print',
    'cv.profile': 'Profile',
    'cv.skills': 'Skills',
    'cv.tools': 'Tools',
    'cv.experience': 'Experience',
    'cv.education': 'Education',
    'cv.certifications': 'Certifications',
    'cv.languages': 'Languages',
    'cv.keywords': 'Keywords',
    
    // Studio
    'studio.claim': 'We abstract what\'s essential and turn it into pedagogical experience.',
    'studio.services': 'Services',
    'studio.clients': 'Selected clients',
    'studio.cta': 'Start a conversation',
    'studio.contact': "Let's talk about your project",
    
    // About
    'about.title': 'About me',
    'about.bio': 'Instructional designer & multimedia creator with 10+ years of experience delivering scalable learning experiences for global communities. My approach combines pedagogy, design, and technology to create courses that are scalable, accessible, and measurable.',
    
    // Contact
    'contact.title': 'Contact us',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Send',
    'contact.sending': 'Sending...',
    'contact.success': 'Message sent successfully',
    'contact.error': 'Error sending. Please try again.',
    
    // Footer
    'footer.rights': 'All rights reserved',
    'footer.social': 'Social media',
    'footer.cookieSettings': 'Cookie settings',
    
    // Common
    'common.year': 'Year',
    'common.category': 'Category',
    'common.all': 'All',
    'common.loading': 'Loading...',
  },
};

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('es');

  useEffect(() => {
    const stored = localStorage.getItem('language') as Language;
    if (stored && (stored === 'es' || stored === 'en')) {
      setLanguageState(stored);
    }
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  }, []);

  const t = useCallback((key: string): string => {
    return translations[language][key] || key;
  }, [language]);

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(() => ({ language, setLanguage, t }), [language, setLanguage, t]);

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}