import React from 'react';
import { Cookie, Settings } from 'lucide-react';
import { useI18n } from '../lib/i18n-context';
import { useBrand } from '../lib/brand-context';
import { useConsent } from '../lib/consent-context';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'motion/react';

export function CookieConsentBanner() {
  const { language } = useI18n();
  const { mode } = useBrand();
  const { showBanner, acceptAll, rejectAll, openSettings } = useConsent();

  const translations = {
    es: {
      title: '🍪 Este sitio usa cookies',
      description: 'Utilizamos cookies para mejorar tu experiencia, analizar el tráfico del sitio y personalizar contenido. Puedes aceptar todas las cookies o gestionar tus preferencias.',
      acceptAll: 'Aceptar todas',
      rejectAll: 'Solo necesarias',
      customize: 'Personalizar',
      learnMore: 'Más información',
    },
    en: {
      title: '🍪 This site uses cookies',
      description: 'We use cookies to improve your experience, analyze site traffic, and personalize content. You can accept all cookies or manage your preferences.',
      acceptAll: 'Accept all',
      rejectAll: 'Only necessary',
      customize: 'Customize',
      learnMore: 'Learn more',
    },
  };

  const t = translations[language];

  if (!showBanner) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6"
        role="dialog"
        aria-labelledby="cookie-consent-title"
        aria-describedby="cookie-consent-description"
      >
        <div 
          className="max-w-6xl mx-auto rounded-2xl shadow-2xl border-2"
          style={{
            backgroundColor: mode === 'studio' ? '#F2EADF' : '#FFFFFF',
            borderColor: mode === 'studio' ? '#F2AE2E' : '#8466F2',
            boxShadow: mode === 'studio' 
              ? '0 20px 60px rgba(217, 80, 50, 0.2)' 
              : '0 20px 60px rgba(91, 68, 242, 0.2)',
          }}
        >
          <div className="p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
              {/* Icon & Content */}
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  <Cookie 
                    className="h-8 w-8 flex-shrink-0" 
                    style={{ color: mode === 'studio' ? '#D95032' : '#5B44F2' }}
                  />
                  <h2 
                    id="cookie-consent-title" 
                    className="font-bold text-xl"
                    style={{ color: mode === 'studio' ? '#121126' : '#1E1940' }}
                  >
                    {t.title}
                  </h2>
                </div>
                <p 
                  id="cookie-consent-description" 
                  className="text-sm leading-relaxed"
                  style={{ color: mode === 'studio' ? '#274259' : '#1E1940' }}
                >
                  {t.description}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 lg:flex-shrink-0">
                <Button
                  onClick={acceptAll}
                  size="lg"
                  className="whitespace-nowrap"
                  style={{
                    backgroundColor: mode === 'studio' ? '#D95032' : '#5B44F2',
                    color: mode === 'studio' ? '#F2EADF' : '#FFFFFF',
                  }}
                >
                  {t.acceptAll}
                </Button>
                <Button
                  onClick={rejectAll}
                  variant="outline"
                  size="lg"
                  className="whitespace-nowrap"
                  style={{
                    borderColor: mode === 'studio' ? '#D95032' : '#5B44F2',
                    color: mode === 'studio' ? '#D95032' : '#5B44F2',
                  }}
                >
                  {t.rejectAll}
                </Button>
                <Button
                  onClick={openSettings}
                  variant="ghost"
                  size="lg"
                  className="whitespace-nowrap"
                  style={{
                    color: mode === 'studio' ? '#274259' : '#1E1940',
                  }}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  {t.customize}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
