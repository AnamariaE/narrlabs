import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { I18nProvider } from './lib/i18n-context';
import { BrandProvider } from './lib/brand-context';
import { ConsentProvider } from './lib/consent-context';
import { ErrorBoundary } from './components/ErrorBoundary';
import { router } from './routes';

export default function App() {
  return (
    <ErrorBoundary>
      <I18nProvider>
        <BrandProvider>
          <ConsentProvider>
            <RouterProvider router={router} />
          </ConsentProvider>
        </BrandProvider>
      </I18nProvider>
    </ErrorBoundary>
  );
}
