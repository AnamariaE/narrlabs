# 💾 BACKUP DE ARCHIVOS CRÍTICOS
**Estado funcional certificado - 17 Marzo 2025**

---

## 📌 USO DE ESTE BACKUP

Este archivo contiene copias completas de los archivos más críticos del sistema de routing.  
Úsalo para restaurar rápidamente si algo sale mal.

---

## 🔑 ARCHIVO 1: `/routes.tsx`

```tsx
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
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { CookieSettings } from './components/CookieSettings';
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
      { path: "*", Component: NotFound },
    ],
  },
]);
```

---

## 🔑 ARCHIVO 2: `/App.tsx`

```tsx
import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { I18nProvider } from './lib/i18n-context';
import { BrandProvider } from './lib/brand-context';
import { ConsentProvider } from './lib/consent-context';
import { router } from './routes';

export default function App() {
  useEffect(() => {
    // Set page language based on default
    document.documentElement.lang = 'es';
  }, []);

  return (
    <ConsentProvider>
      <I18nProvider>
        <BrandProvider>
          <RouterProvider router={router} />
        </BrandProvider>
      </I18nProvider>
    </ConsentProvider>
  );
}
```

---

## 🔑 PATRÓN DE PÁGINA ESTÁNDAR

**Ejemplo: Cualquier página que necesite navegación**

```tsx
import React from 'react';
import { useNavigate } from 'react-router';
import { useI18n } from '../lib/i18n-context';
import { Button } from '../components/ui/button';

export function ExamplePage() {
  const navigate = useNavigate();
  const { language, t } = useI18n();

  return (
    <div className="min-h-screen py-20 px-4">
      <h1>Example Page</h1>
      
      {/* Navegación programática */}
      <Button onClick={() => navigate('/otra-ruta')}>
        Ir a otra página
      </Button>
      
      {/* Navegación con parámetros */}
      <Button onClick={() => navigate('/project/mi-proyecto')}>
        Ver proyecto
      </Button>
      
      {/* Volver atrás */}
      <Button onClick={() => navigate(-1)}>
        Volver
      </Button>
    </div>
  );
}
```

---

## 🔑 PATRÓN DE NAVEGACIÓN EN Navigation.tsx

**Fragmento clave para links:**

```tsx
import { Link, useLocation } from 'react-router';

// Dentro del componente:
const location = useLocation();
const currentPage = getCurrentPage();

// Link interno:
<Link to="/" className="...">
  Home
</Link>

<Link to="/portfolio" className="...">
  Portfolio
</Link>

// Con active state:
<Link
  to="/cv"
  className={currentPage === 'cv' ? 'text-primary' : 'text-foreground'}
  aria-current={currentPage === 'cv' ? 'page' : undefined}
>
  CV
</Link>
```

---

## 🔑 PATRÓN CON PARÁMETROS URL

**Ejemplo: ProjectDetailPage.tsx**

```tsx
import React from 'react';
import { useNavigate, useParams } from 'react-router';

export function ProjectDetailPage() {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  
  // Usar el slug
  const project = siteData.projects.find(p => p.slug === slug);
  
  return (
    <div>
      <button onClick={() => navigate('/')}>
        Volver al inicio
      </button>
      
      <h1>{project?.title}</h1>
      
      {/* Navegación a otro proyecto */}
      <button onClick={() => navigate(`/project/${nextSlug}`)}>
        Siguiente proyecto
      </button>
    </div>
  );
}
```

---

## 📝 CHECKLIST DE VERIFICACIÓN

Después de hacer cambios, verifica:

### Imports ✅
- [ ] Todos usan `'react-router'` (NO `'react-router-dom'`)
- [ ] App.tsx tiene `import { RouterProvider } from 'react-router'`
- [ ] routes.tsx tiene `import { createBrowserRouter, Outlet, useLocation } from 'react-router'`
- [ ] Páginas tienen `import { useNavigate } from 'react-router'`

### Funciones ✅
- [ ] routes.tsx tiene `RootLayout` definido
- [ ] routes.tsx tiene `HomeWrapper` definido
- [ ] routes.tsx tiene `NotFound` definido
- [ ] router está exportado: `export const router = createBrowserRouter([...])`

### Páginas ✅
- [ ] NINGUNA página tiene prop `onNavigate`
- [ ] Todas usan `const navigate = useNavigate()`
- [ ] Navegación usa `navigate('/ruta')` NO `onNavigate('ruta')`

### Routing ✅
- [ ] App.tsx renderiza `<RouterProvider router={router} />`
- [ ] Todas las rutas están definidas en routes.tsx
- [ ] Ruta catch-all `{ path: "*", Component: NotFound }` existe

---

## 🚀 CÓMO RESTAURAR

### Opción 1: Restaurar archivo completo
1. Copia el contenido del archivo de arriba
2. Pégalo en el archivo correspondiente
3. Guarda el archivo

### Opción 2: Restaurar función específica
1. Busca la función en este documento
2. Copia solo esa función
3. Pégala en tu archivo en la posición correcta

### Opción 3: Verificar diferencias
1. Compara tu archivo con la versión de backup
2. Identifica las diferencias
3. Corrige solo lo que cambió

---

## ⚡ RESTAURACIÓN RÁPIDA

### Si solo falla routing:
```bash
1. Restaurar /routes.tsx
2. Verificar /App.tsx
3. Reiniciar servidor de desarrollo
```

### Si fallan botones de navegación:
```bash
1. Verificar imports en la página
2. Verificar que use useNavigate() hook
3. Verificar que NO tenga prop onNavigate
4. Verificar llamadas: navigate('/ruta') no onNavigate('ruta')
```

### Si falla 404:
```bash
1. Verificar que NotFound está definido en routes.tsx
2. Verificar que existe: { path: "*", Component: NotFound }
3. Verificar que NotFound está ANTES de export const router
```

---

**BACKUP CREADO**: 17 Marzo 2025  
**ESTADO**: ✅ Funcional y certificado  
**VERSIÓN**: React Router (react-router, NO react-router-dom)
