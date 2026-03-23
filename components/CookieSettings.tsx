import React, { useState } from 'react';
import { X, Shield, BarChart3, Target, Palette, CheckCircle2 } from 'lucide-react';
import { useI18n } from '../lib/i18n-context';
import { useBrand } from '../lib/brand-context';
import { useConsent, ConsentPreferences } from '../lib/consent-context';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'motion/react';

export function CookieSettings() {
  const { language } = useI18n();
  const { mode } = useBrand();
  const { showSettings, preferences, savePreferences, closeSettings } = useConsent();

  const [localPreferences, setLocalPreferences] = useState<ConsentPreferences>(preferences);

  const translations = {
    es: {
      title: 'Configuración de cookies',
      description: 'Personaliza qué tipos de cookies aceptas. Puedes cambiar tus preferencias en cualquier momento.',
      necessary: {
        title: 'Cookies necesarias',
        description: 'Estas cookies son esenciales para el funcionamiento del sitio web y no se pueden desactivar. Incluyen cookies de sesión, autenticación y seguridad.',
        always: 'Siempre activas',
      },
      analytics: {
        title: 'Cookies de análisis',
        description: 'Nos ayudan a entender cómo los visitantes interactúan con el sitio recopilando información de forma anónima. Utilizamos Google Analytics para mejorar nuestro contenido.',
      },
      marketing: {
        title: 'Cookies de marketing',
        description: 'Se utilizan para rastrear visitantes en sitios web y mostrar anuncios relevantes. Actualmente no utilizamos cookies de marketing.',
      },
      preferences: {
        title: 'Cookies de preferencias',
        description: 'Permiten que el sitio recuerde tus preferencias (como idioma, tema, modo de visualización) para ofrecerte una experiencia personalizada.',
      },
      savePreferences: 'Guardar preferencias',
      acceptAll: 'Aceptar todas',
      rejectAll: 'Solo necesarias',
      close: 'Cerrar',
    },
    en: {
      title: 'Cookie settings',
      description: 'Customize which types of cookies you accept. You can change your preferences at any time.',
      necessary: {
        title: 'Necessary cookies',
        description: 'These cookies are essential for the website to function and cannot be disabled. They include session, authentication, and security cookies.',
        always: 'Always active',
      },
      analytics: {
        title: 'Analytics cookies',
        description: 'Help us understand how visitors interact with the site by collecting information anonymously. We use Google Analytics to improve our content.',
      },
      marketing: {
        title: 'Marketing cookies',
        description: 'Used to track visitors across websites and display relevant ads. We currently do not use marketing cookies.',
      },
      preferences: {
        title: 'Preference cookies',
        description: 'Allow the site to remember your preferences (such as language, theme, display mode) to offer you a personalized experience.',
      },
      savePreferences: 'Save preferences',
      acceptAll: 'Accept all',
      rejectAll: 'Only necessary',
      close: 'Close',
    },
  };

  const t = translations[language];

  const cookieCategories = [
    {
      key: 'necessary' as keyof ConsentPreferences,
      icon: Shield,
      title: t.necessary.title,
      description: t.necessary.description,
      required: true,
    },
    {
      key: 'analytics' as keyof ConsentPreferences,
      icon: BarChart3,
      title: t.analytics.title,
      description: t.analytics.description,
      required: false,
    },
    {
      key: 'marketing' as keyof ConsentPreferences,
      icon: Target,
      title: t.marketing.title,
      description: t.marketing.description,
      required: false,
    },
    {
      key: 'preferences' as keyof ConsentPreferences,
      icon: Palette,
      title: t.preferences.title,
      description: t.preferences.description,
      required: false,
    },
  ];

  const handleToggle = (key: keyof ConsentPreferences) => {
    if (key === 'necessary') return; // Can't disable necessary cookies
    setLocalPreferences(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = () => {
    savePreferences(localPreferences);
  };

  const handleAcceptAll = () => {
    const allAccepted: ConsentPreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    setLocalPreferences(allAccepted);
    savePreferences(allAccepted);
  };

  const handleRejectAll = () => {
    const onlyNecessary: ConsentPreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };
    setLocalPreferences(onlyNecessary);
    savePreferences(onlyNecessary);
  };

  if (!showSettings) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={closeSettings}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl"
          style={{
            backgroundColor: mode === 'studio' ? '#F2EADF' : '#FFFFFF',
          }}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-labelledby="cookie-settings-title"
          aria-describedby="cookie-settings-description"
        >
          {/* Header */}
          <div 
            className="sticky top-0 z-10 px-6 py-4 border-b flex items-center justify-between"
            style={{
              backgroundColor: mode === 'studio' ? '#F2EADF' : '#FFFFFF',
              borderColor: mode === 'studio' ? 'rgba(242, 174, 46, 0.2)' : 'rgba(132, 102, 242, 0.2)',
            }}
          >
            <h2 
              id="cookie-settings-title"
              className="text-2xl font-bold"
              style={{ color: mode === 'studio' ? '#121126' : '#1E1940' }}
            >
              {t.title}
            </h2>
            <button
              onClick={closeSettings}
              className="p-2 rounded-full hover:bg-black/5 transition-colors"
              aria-label={t.close}
            >
              <X className="h-5 w-5" style={{ color: mode === 'studio' ? '#274259' : '#1E1940' }} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            <p 
              id="cookie-settings-description"
              className="text-sm leading-relaxed"
              style={{ color: mode === 'studio' ? '#274259' : '#1E1940' }}
            >
              {t.description}
            </p>

            {/* Cookie categories */}
            <div className="space-y-4">
              {cookieCategories.map((category) => {
                const Icon = category.icon;
                const isEnabled = localPreferences[category.key];

                return (
                  <div
                    key={category.key}
                    className="p-5 rounded-xl border-2 transition-all"
                    style={{
                      borderColor: isEnabled 
                        ? (mode === 'studio' ? '#F2AE2E' : '#8466F2')
                        : 'rgba(0, 0, 0, 0.1)',
                      backgroundColor: isEnabled
                        ? (mode === 'studio' ? 'rgba(242, 174, 46, 0.05)' : 'rgba(132, 102, 242, 0.05)')
                        : 'transparent',
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div 
                        className="p-3 rounded-full flex-shrink-0"
                        style={{
                          backgroundColor: mode === 'studio' 
                            ? 'rgba(217, 80, 50, 0.1)' 
                            : 'rgba(91, 68, 242, 0.1)',
                        }}
                      >
                        <Icon 
                          className="h-5 w-5" 
                          style={{ color: mode === 'studio' ? '#D95032' : '#5B44F2' }}
                        />
                      </div>

                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 
                            className="font-bold text-lg"
                            style={{ color: mode === 'studio' ? '#121126' : '#1E1940' }}
                          >
                            {category.title}
                          </h3>
                          
                          {category.required ? (
                            <div 
                              className="px-3 py-1 rounded-full text-xs font-medium"
                              style={{
                                backgroundColor: mode === 'studio' 
                                  ? 'rgba(217, 80, 50, 0.1)' 
                                  : 'rgba(91, 68, 242, 0.1)',
                                color: mode === 'studio' ? '#D95032' : '#5B44F2',
                              }}
                            >
                              {t.necessary.always}
                            </div>
                          ) : (
                            <button
                              onClick={() => handleToggle(category.key)}
                              className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
                              style={{
                                backgroundColor: isEnabled 
                                  ? (mode === 'studio' ? '#D95032' : '#5B44F2')
                                  : 'rgba(0, 0, 0, 0.2)',
                                focusRingColor: mode === 'studio' ? '#D95032' : '#5B44F2',
                              }}
                              role="switch"
                              aria-checked={isEnabled}
                              aria-label={`Toggle ${category.title}`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  isEnabled ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          )}
                        </div>
                        <p 
                          className="text-sm leading-relaxed"
                          style={{ color: mode === 'studio' ? '#274259' : 'rgba(30, 25, 64, 0.8)' }}
                        >
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div 
            className="sticky bottom-0 px-6 py-4 border-t flex flex-col sm:flex-row gap-3"
            style={{
              backgroundColor: mode === 'studio' ? '#F2EADF' : '#FFFFFF',
              borderColor: mode === 'studio' ? 'rgba(242, 174, 46, 0.2)' : 'rgba(132, 102, 242, 0.2)',
            }}
          >
            <Button
              onClick={handleSave}
              className="flex-1"
              style={{
                backgroundColor: mode === 'studio' ? '#D95032' : '#5B44F2',
                color: mode === 'studio' ? '#F2EADF' : '#FFFFFF',
              }}
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              {t.savePreferences}
            </Button>
            <Button
              onClick={handleAcceptAll}
              variant="outline"
              className="flex-1"
              style={{
                borderColor: mode === 'studio' ? '#D95032' : '#5B44F2',
                color: mode === 'studio' ? '#D95032' : '#5B44F2',
              }}
            >
              {t.acceptAll}
            </Button>
            <Button
              onClick={handleRejectAll}
              variant="ghost"
              className="flex-1"
              style={{
                color: mode === 'studio' ? '#274259' : '#1E1940',
              }}
            >
              {t.rejectAll}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
