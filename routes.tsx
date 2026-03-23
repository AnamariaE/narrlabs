import React, { useEffect } from 'react';
import { createBrowserRouter, Outlet, useLocation } from 'react-router';
import { HomePage } from './pages/HomePage';
import { CVPage } from './pages/CVPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { StudioPage } from './pages/StudioPage';
import { PodcastPage } from './pages/PodcastPage';
import { ConsultingPage } from './pages/ConsultingPage';
import { GamificationPage } from './pages/GamificationPage';
import { HumanidadesDigitalesPage } from './pages/HumanidadesDigitalesPage';
import { WhyNarrLabPage } from './pages/WhyNarrLabPage';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { CookieSettings } from './components/CookieSettings';
import { SEOHead } from './components/SEOHead';
import { useBrand } from './lib/brand-context';

// Layout component with navigation and footer
function RootLayout() {
  const location = useLocation();

  useEffect(() => {
    // Instant scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  useEffect(() => {
    // Add skip-to-content link for accessibility
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);

    return () => {
      if (skipLink.parentNode) {
        skipLink.parentNode.removeChild(skipLink);
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* SEO Meta Tags - updates dynamically based on page */}
      <SEOHead />
      
      <Navigation />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      
      {/* Cookie Consent UI */}
      <CookieConsentBanner />
      <CookieSettings />

      {/* Screen reader utility classes */}
      <style>{`
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
        .focus\\:not-sr-only:focus {
          position: static;
          width: auto;
          height: auto;
          padding: 0;
          margin: 0;
          overflow: visible;
          clip: auto;
          white-space: normal;
        }
      `}</style>
    </div>
  );
}

// Home page wrapper that shows different content based on brand mode
function HomeWrapper() {
  const { mode } = useBrand();
  
  // In personal mode, home shows AboutPage; in studio mode, home shows StudioPage
  return mode === 'personal' ? <AboutPage /> : <StudioPage />;
}

// 404 Not Found page
function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="text-xl text-muted-foreground">Página no encontrada / Page not found</p>
        <a href="/" className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
          Volver al inicio / Go home
        </a>
      </div>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomeWrapper },
      { path: "portfolio", Component: HomePage },
      { path: "cv", Component: CVPage },
      { path: "about", Component: AboutPage },
      { path: "contact", Component: ContactPage },
      { path: "consulting", Component: ConsultingPage },
      { path: "gamification", Component: GamificationPage },
      { path: "humanidades-digitales", Component: HumanidadesDigitalesPage },
      { path: "podcast", Component: PodcastPage },
      { path: "studio", Component: StudioPage },
      { path: "project/:slug", Component: ProjectDetailPage },
      { path: "why-narrlab", Component: WhyNarrLabPage },
      { path: "*", Component: NotFound },
    ],
  },
]);