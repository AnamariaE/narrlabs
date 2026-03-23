'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

type BrandMode = 'personal' | 'studio';

interface BrandContextType {
  mode: BrandMode;
  setMode: (mode: BrandMode) => void;
}

const BrandContext = createContext<BrandContextType | undefined>(undefined);

export function BrandProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<BrandMode>('studio');

  useEffect(() => {
    // Always start in studio mode
    const stored = localStorage.getItem('brandMode') as BrandMode;
    if (stored && (stored === 'personal' || stored === 'studio')) {
      setModeState(stored);
    } else {
      // Set default to studio if no stored preference
      setModeState('studio');
      localStorage.setItem('brandMode', 'studio');
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('studio-mode', mode === 'studio');
  }, [mode]);

  const setMode = (newMode: BrandMode) => {
    setModeState(newMode);
    localStorage.setItem('brandMode', newMode);
  };

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(() => ({ mode, setMode }), [mode]);

  return (
    <BrandContext.Provider value={value}>
      {children}
    </BrandContext.Provider>
  );
}

export function useBrand() {
  const context = useContext(BrandContext);
  if (!context) {
    throw new Error('useBrand must be used within BrandProvider');
  }
  return context;
}