import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';

export type ConsentPreferences = {
  necessary: boolean; // Always true
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
};

interface ConsentContextType {
  hasConsented: boolean;
  preferences: ConsentPreferences;
  showBanner: boolean;
  showSettings: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  savePreferences: (prefs: ConsentPreferences) => void;
  openSettings: () => void;
  closeSettings: () => void;
}

const ConsentContext = createContext<ConsentContextType | undefined>(undefined);

const DEFAULT_PREFERENCES: ConsentPreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  preferences: false,
};

// Google Consent Mode v2 integration
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

function updateGoogleConsent(preferences: ConsentPreferences) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('consent', 'update', {
      'analytics_storage': preferences.analytics ? 'granted' : 'denied',
      'ad_storage': preferences.marketing ? 'granted' : 'denied',
      'ad_user_data': preferences.marketing ? 'granted' : 'denied',
      'ad_personalization': preferences.marketing ? 'granted' : 'denied',
      'functionality_storage': preferences.preferences ? 'granted' : 'denied',
      'personalization_storage': preferences.preferences ? 'granted' : 'denied',
      'security_storage': 'granted', // Always granted for necessary cookies
    });
  }
}

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [hasConsented, setHasConsented] = useState<boolean | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<ConsentPreferences>(DEFAULT_PREFERENCES);

  useEffect(() => {
    // Check if user has already consented
    const stored = localStorage.getItem('cookieConsent');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setPreferences(parsed);
        setHasConsented(true);
      } catch (e) {
        setShowBanner(true);
      }
    } else {
      setShowBanner(true);
    }
  }, []);

  const acceptAll = useCallback(() => {
    const allPreferences: ConsentPreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(allPreferences);
    localStorage.setItem('cookieConsent', JSON.stringify(allPreferences));
    setHasConsented(true);
    setShowBanner(false);
  }, []);

  const rejectAll = useCallback(() => {
    setPreferences(DEFAULT_PREFERENCES);
    localStorage.setItem('cookieConsent', JSON.stringify(DEFAULT_PREFERENCES));
    setHasConsented(true);
    setShowBanner(false);
  }, []);

  const savePreferences = useCallback((prefs: ConsentPreferences) => {
    setPreferences(prefs);
    localStorage.setItem('cookieConsent', JSON.stringify(prefs));
    setHasConsented(true);
    setShowBanner(false);
    setShowSettings(false);
  }, []);

  const openSettings = useCallback(() => {
    setShowSettings(true);
  }, []);

  const closeSettings = useCallback(() => {
    setShowSettings(false);
  }, []);

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(() => ({
    hasConsented,
    showBanner,
    showSettings,
    preferences,
    acceptAll,
    rejectAll,
    savePreferences,
    openSettings,
    closeSettings,
  }), [hasConsented, showBanner, showSettings, preferences, acceptAll, rejectAll, savePreferences, openSettings, closeSettings]);

  return (
    <ConsentContext.Provider value={value}>
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent() {
  const context = useContext(ConsentContext);
  if (!context) {
    throw new Error('useConsent must be used within ConsentProvider');
  }
  return context;
}